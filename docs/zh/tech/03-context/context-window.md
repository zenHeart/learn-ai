---
title: 上下文窗口
description: "单次调用的硬约束：token 是计量单位，输入输出共享一份窗口预算；四块配比先算后发、超窗保配对裁剪——更大的窗口不是解法。"
domain: tech
tags: [context, context-window, budget]
navOrder: 32
topicId: context-window
layer: "3"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/15-prompt-memory"
prerequisites: [prompt]
next: [context]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 上下文窗口

> **在哪一组**：Context 组 ｜ **上一组出口**：能把意图写成四要素提示并当代码管理 ｜ **本页出口**：能为一轮请求算清 token 预算（四块配比 + 输出预留）、识别超窗症状、按保配对规则裁剪
> **前置**：[提示词工程](prompt.md) ｜ **下一步**：[上下文工程](context-engineering.md)、[结构化输出](../02-inference-interface/structured-output.md)

## 1. 概述

**结论**：提示写清之后质量还差、或多轮之后越聊越贵，第一件要查的是**窗口预算**。上下文窗口（context window）是单次调用的硬约束：这一轮发给模型的全部内容加起来不能超过模型上限，而且**输入与输出共享同一份预算**（Anthropic 文档，检索 2026-09-01）。超限只有两种结局：显式报错（400），或静默截断——后者更危险，因为没人知道丢了什么。

token 一句话讲清：tokenizer 把文本切成的最小单元，是窗口计量与计费的单位；同一段文字在不同模型的 tokenizer 下 token 数不同，所以预算必须按目标模型核对。

### 心智模型：一轮请求的四块预算

```text
┌──────────────────── context window（这一轮的硬预算）────────────────────┐
│ system + 工具 schema   稳定前缀：每轮几乎不变                            │
│ 消息历史               随轮次增长，超预算先裁这里（保 tool 配对）          │
│ 检索片段 / 文件         按需注入，不整库预塞                              │
│ 输出预留               模型即将写出的 token 占同一份预算                   │
└─────────────────────────────────────────────────────────────────────────┘
不变量：Σ(四块) ≤ window；超过 80% 就该动手裁；多塞不只是贵——还会更笨（context rot）
```

「这一轮装什么、按什么优先级装」是策略问题，去 [上下文工程](context-engineering.md)；本页只管**装得下**这一硬约束。

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 写多轮对话产品、编码助手工作流、Agent 循环的工程师 |
| **何时用** | 任何超过一两轮、或注入外部内容（文件 / 检索 / 工具结果）的场景 |
| **何时不用** | 单轮、短提示、无外部数据——预算管理是纯开销 |
| **不是本页** | 装什么的来源与优先级 → [context-engineering](context-engineering.md)；跨轮历史存哪 → [session-memory](session-memory.md)；KV cache 与 n² 注意力的数学 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) 与 [架构桥接页](../01-model-lifecycle/architecture.md) |

### 决策表：超预算时动哪一块

| 动哪块 | 方向 | 控制权 | 状态 | 信任域 | 最低复杂度 |
|---|---|---|---|---|---|
| 裁消息历史 | 丢最旧轮次 | 全在你（组装层） | 会话内生效 | 丢的是旧信息 | 最低：保配对裁剪（本页） |
| 清深层工具结果 | 成对清除已执行完的 tool 调用 | 全在你 | 一次性 | 低损（结果早已消费） | 低（本页 R2） |
| 压检索注入 | 降 top-k / 截断片段 | 全在你 | 每轮重组 | 摘要有损 | 中（→ [context-engineering](context-engineering.md)） |
| 换更大窗口模型 | 提高上限 | 交给厂商 | 模型代际 | 计费与延迟上升 | 采购决策，且不解决 rot |

**版本里程碑**：未验证（各模型窗口上限持续变化，本页不维护数字清单，以各家官方文档当天页面为准）。

## 2. 使用

### 最小实战：token 预算分配器（零 key）

15 分钟，Node 22 LTS。演示四块配比 → 溢出告警 → 裁剪策略的完整链路：**预算先算后发**（I1）、**裁剪保 tool 配对**（I2）。负例演示裸 `slice` 如何切断配对。

**setup**：存为 `context-window.ts`，运行 `npx tsx@4 context-window.ts`。

```ts
// fixture: token 预算分配器——四块配比、溢出告警、保配对裁剪
// 与厂商 messages 数组同构的最小子集
type Message =
  | { role: 'system'; content: string }
  | { role: 'assistant'; content: string; toolCalls?: { id: string; name: string }[] }
  | { role: 'user'; content: string; toolResultFor?: string }

// 估算启发式：中文约 1-2 字/token、英文约 4 字符/token；对账必须用厂商 token 计数 API
function estimateTokens(text: string): number {
  const cjk = (text.match(/[一-鿿]/g) ?? []).length
  const rest = text.length - cjk
  return Math.ceil(cjk / 1.5 + rest / 4)
}

function messageTokens(m: Message): number {
  let total = estimateTokens(m.content)
  for (const call of m.toolCalls ?? []) total += estimateTokens(`${call.name} ${call.id}`)
  return total
}

const historyTokens = (messages: Message[]): number =>
  messages.reduce((sum, m) => sum + messageTokens(m), 0)

// 四块预算：system 稳定前缀 / history 会话历史 / retrieval 检索注入 / output 输出预留
interface BudgetReport {
  blocks: { system: number; history: number; retrieval: number; output: number }
  used: number
  ratio: number
  fits: boolean
}

function planBudget(
  window: number,
  parts: { system: Message[]; history: Message[]; retrieval: string[]; outputReserve: number }
): BudgetReport {
  const blocks = {
    system: historyTokens(parts.system),
    history: historyTokens(parts.history),
    retrieval: parts.retrieval.reduce((sum, r) => sum + estimateTokens(r), 0),
    output: parts.outputReserve,
  }
  const used = blocks.system + blocks.history + blocks.retrieval + blocks.output
  return { blocks, used, ratio: used / window, fits: used <= window * 0.8 }
}

// I1 预算先算后发：超过窗口 80% 即拒发
function assertFits(report: BudgetReport, window: number, label: string): void {
  const b = report.blocks
  console.log(
    `[${label}] system ${b.system} + history ${b.history} + retrieval ${b.retrieval} + output ${b.output} = ${report.used} / ${window} (${report.ratio.toFixed(2)})`
  )
  if (!report.fits) {
    throw new Error(`context plan ${report.used} tokens exceeds 80% of window ${window} — trim before sending, not after`)
  }
}

// I2 裁剪保配对：tool_use 与 tool_result 是配对结构
function findBrokenToolPairs(messages: Message[]): string[] {
  const problems: string[] = []
  const openToolIds = new Set<string>()
  const answeredToolIds = new Set<string>()
  for (const m of messages) {
    for (const call of m.toolCalls ?? []) openToolIds.add(call.id)
    if (m.role === 'user' && m.toolResultFor) answeredToolIds.add(m.toolResultFor)
  }
  for (const id of openToolIds) {
    if (!answeredToolIds.has(id)) problems.push(`tool_use ${id} has no tool_result`)
  }
  for (const id of answeredToolIds) {
    if (!openToolIds.has(id)) problems.push(`tool_result ${id} has no tool_use`)
  }
  return problems
}

// 裁剪策略：system 永远保留；从队首移除旧消息，但绝不切断 tool 配对
function trimHistory(messages: Message[], keepFrom: number): Message[] {
  const hasSystemHead = messages[0]?.role === 'system'
  const bodyStart = hasSystemHead ? 1 : 0
  const keptHead: Message[] = hasSystemHead ? [messages[0]] : []
  const keptBody = messages.slice(Math.max(keepFrom, bodyStart))
  const first = keptBody[0]
  if (first && first.role === 'user' && first.toolResultFor) {
    const pairIndex = messages.findIndex(
      (m) => m.role === 'assistant' && m.toolCalls?.some((c) => c.id === first.toolResultFor)
    )
    if (pairIndex >= bodyStart && pairIndex < keepFrom) {
      return [...keptHead, ...messages.slice(pairIndex)]
    }
  }
  return [...keptHead, ...keptBody]
}

// 演示数据：一次带两轮工具调用的客服会话
const system: Message = {
  role: 'system',
  content: '你是订单客服助手。回答必须基于工具返回的数据，不得编造订单号。'
}
const history: Message[] = [
  { role: 'user', content: '帮我查一下 Alice 最近的三笔订单。' },
  { role: 'assistant', content: '我来查询订单。', toolCalls: [{ id: 'toolu_01', name: 'search_orders' }] },
  { role: 'user', content: '{"matched":3,"orders":["ORD-101","ORD-102","ORD-109"]}', toolResultFor: 'toolu_01' },
  { role: 'assistant', content: 'Alice 最近三笔订单为 ORD-101、ORD-102、ORD-109。' },
  { role: 'user', content: 'ORD-102 是什么时候发货的？' },
  { role: 'assistant', content: '我查一下发货时间。', toolCalls: [{ id: 'toolu_02', name: 'get_order' }] },
  { role: 'user', content: '{"orderId":"ORD-102","shippedAt":"2026-08-14"}', toolResultFor: 'toolu_02' },
  { role: 'assistant', content: 'ORD-102 于 2026-08-14 发货。' },
  { role: 'user', content: '把它退款到原支付方式。' }
]
const retrieval = ['[policy] 退款政策 v3：原路退回，1-3 个工作日到账。']

const WINDOW = 145 // 故意设小，触发溢出告警

console.log('--- 正例：完整会话预算规划 ---')
console.log('broken pairs:', findBrokenToolPairs([system, ...history]))
const full = planBudget(WINDOW, { system: [system], history, retrieval, outputReserve: 30 })
try {
  assertFits(full, WINDOW, 'full')
} catch (error) {
  console.error(`guard fired: ${(error as Error).message}`)
}

console.log('\n--- 裁剪：保 system + 保配对，预算回到安全线 ---')
const trimmedHistory = trimHistory(history, 4)
const trimmed = planBudget(WINDOW, {
  system: [system],
  history: trimmedHistory,
  retrieval,
  outputReserve: 30,
})
console.log('kept roles:', ['system', ...trimmedHistory.map((m) => m.role)].join(' -> '))
console.log('broken pairs after trim:', findBrokenToolPairs([system, ...trimmedHistory]))
assertFits(trimmed, WINDOW, 'trimmed')

console.log('\n--- 负例：裸 slice(-3) 切断 tool 配对 ---')
const naive = history.slice(-3)
console.log('kept roles:', ['system', ...naive.map((m) => m.role)].join(' -> '))
console.log('broken pairs after naive slice:', findBrokenToolPairs([system, ...naive]))
```

**正常输出**（超限被守卫拦下，裁剪后回到安全线）：

```text
--- 正例：完整会话预算规划 ---
broken pairs: []
[full] system 20 + history 94 + retrieval 15 + output 30 = 159 / 145 (1.10)
guard fired: context plan 159 tokens exceeds 80% of window 145 — trim before sending, not after

--- 裁剪：保 system + 保配对，预算回到安全线 ---
kept roles: system -> user -> assistant -> user -> assistant -> user
broken pairs after trim: []
[trimmed] system 20 + history 46 + retrieval 15 + output 30 = 111 / 145 (0.77)
```

**负例输出**（裸 slice 切断配对，下一轮请求会直接 400）：

```text
--- 负例：裸 slice(-3) 切断 tool 配对 ---
kept roles: system -> user -> assistant -> user
broken pairs after naive slice: [ 'tool_result toolu_02 has no tool_use' ]
```

**验收命令**：

```bash
npx tsx@4 context-window.ts && echo BUDGET-OK
```

**清理**：删除临时文件。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：发前预算规划 | 本轮四块内容 | `planBudget` + `assertFits` | 通过 / 拒发 | 所有多轮产品 | 单轮短请求 |
| 常见：超窗裁剪 | 超预算会话 | `trimHistory`（保 system + 保配对） | 合法且过审的消息序列 | 长会话 | 需要完整历史审计的场景（存日志，不进窗口） |
| 组合：预算护栏进回归 | 本页 fixture | 断言 ratio 与配对检查进 CI | 漂移即红 | 换模型 / 改提示后 | 一次性脚本 |

## 3. 原理

### 为什么窗口有限：注意力、KV cache 与训练分布（决策影响层）

Anthropic 工程文章（检索 2026-09-01）给出三个事实：Transformer 里 n 个 token 产生 n² 个成对注意力关系，上下文越长每个关系被摊得越薄；训练数据里短序列远多于长序列，模型对长程依赖经验不足；推理时的 KV cache 显存随 token 数增长，窗口越大服务成本越高。工程结论只有一句：**把窗口当预算做规划，而不是当仓库做堆放**。

n² 复杂度、位置编码插值、KV cache 的数学推导 → 本仓停止，去 Learn LLM（[第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)）与 [模型架构桥接页](../01-model-lifecycle/architecture.md)。

### 为什么更大的窗口不是解法：context rot

needle-in-a-haystack 类基准揭示 **context rot（上下文腐烂）**：窗口内 token 越多，准确回忆能力越差，且这一特征跨模型存在（Chroma 研究给了系统实证，检索 2026-09-01）。所以「换 200k 窗口模型」解决的是 400 报错，解决不了「塞进去但模型看不见」。**信息密度比窗口上限重要**。

### 超窗的两类表现（症状表）

| 表现 | 你看到什么 | 根因 | 第一动作 |
|---|---|---|---|
| 显式拒绝 | `400`，错误信息指向 context length | 输入侧超上限 | 把 `assertFits` 挪到组装层（I1） |
| 静默截断 | 回答突然「失忆」、不守规则；或输出中途断掉（`stop_reason: max_tokens`） | 框架/厂商静默裁剪；输出预留不足 | 查预算报告四块占比；查 `stop_reason` |

### token 计量的三层

| 层 | 工具 | 用途 |
|---|---|---|
| 启发式估算 | 字符近似（本页 `estimateTokens`） | 发前守卫、本地断言 |
| 厂商计数 API | OpenAI / Anthropic 的 count tokens 接口 | 计费对账、容量规划 |
| tokenizer 本地复算 | 厂商 tokenizer 库 | 机制理解（→ Learn LLM） |

### 规范要求 vs 本地实测

| 官方/规范断言 | 本仓 fixture / 实践 |
|---|---|
| 输入与输出共享窗口预算 | fixture 的 `output` 块即输出预留 30 token，计入 `used` |
| 超限应先算后发 | `planBudget` + 80% 阈值拒发，负例可见告警 |
| 裁剪不得切断 tool 配对 | `findBrokenToolPairs` 检出裸 slice 的断裂 |
| 中文 1-2 字 / 英文 4 字符 ≈ 1 token | 启发式仅做守卫；计费对账用厂商 token API |

### 关键不变量

1. **I1 预算先算后发**：组 messages 时检查，不发到厂商那里才发现 400。
2. **I2 裁剪保配对**：`tool_use` 与 `tool_result` 是配对结构；切断后轻则下一轮 400，重则模型重复执行副作用工具。
3. **输出预留计入预算**：`max_tokens` 不是免费额度，它占的是同一份窗口。
4. **信息密度比上限重要**：「窗口 200k」不等于「可以把整个仓贴进去」。

## 4. 开发

### 集成要点

1. **预算检查进组装层**：在「组 messages 的函数」里调用 `assertFits`，而不是在 HTTP 客户端里事后补救。
2. **`max_tokens` 与输出预留对齐**：输出预留不足 → `stop_reason: max_tokens` 截断；预算规划时给输出块留足空间。
3. **token 对账用厂商 API**：估算只做守卫；计费与容量规划用 OpenAI / Anthropic 的 token counting 接口。
4. **窗口数字随模型走**：换模型即重核对窗口上限与 tokenizer 差异，模型本身要 pin（见 [模型 API 契约](../02-inference-interface/model-api.md)）。

### 调试 runbook

#### R1 长会话越聊越差、成本线性涨

**症状**：同一会话第 N 轮后回答质量下降、延迟与费用持续上升。
**证据**：逐轮 token 计数曲线（`planBudget` 的 `used`）；确认输入 token 随轮次单调增长。
**处理**：上保配对裁剪或清深层工具结果；检索内容从「每轮全量」改为按需注入（→ [context-engineering](context-engineering.md)）。
**完成标准**：token 曲线回到锯齿稳态；预算守卫连续 N 轮不再触发。

#### R2 裁剪后下一轮 400

**症状**：加历史裁剪后，偶发 `400`，错误信息指向消息结构。
**证据**：dump 出错请求的完整 messages；对 tool_use / tool_result 做配对检查（`findBrokenToolPairs`）。
**处理**：换成保配对裁剪；或最轻手段先成对清除深层工具结果（两侧一起删，不是单边）。
**完成标准**：连续无 400；配对检查入 CI fixture。

#### R3 输出总在中途断掉

**症状**：回答说到一半停住，JSON 不完整无法 parse。
**证据**：响应的 `stop_reason` / `finish_reason` 为 `max_tokens`；预算报告里 `output` 块为 0 或过小。
**处理**：给输出预留加预算并同步调大 `max_tokens`；输出过长则拆任务（一次要一件事）。
**完成标准**：`stop_reason` 回到正常结束；schema 验证不再因截断失败。

#### R4 守卫误报：估算与厂商计数差太多

**症状**：本地算着没超窗，厂商却报 400；或反过来守卫频繁误拦。
**证据**：对比 `usage.prompt_tokens` 与 `estimateTokens` 的偏差率；中英混排与代码片段偏差最大。
**处理**：用厂商 count tokens 接口校准启发式系数；对账场景直接换厂商计数。
**完成标准**：偏差进入可接受区间（如 ±10%）；守卫阈值不再频繁误触发。

### 反模式清单

- **整本塞**：把整份设计文档 / 整库代码贴进每一轮；检索 top-k 带来源即可。
- **裸 `messages.slice(-N)`**：切断 tool 配对，下一轮 400。
- **静默丢 system**：超窗时丢最前面的系统提示——规则全没了，且没人知道。
- **输出不留预留**：`max_tokens` 拉满输入，输出必然截断。
- **拿估算 token 对账计费**：启发式只配做守卫。
- **「窗口大就不管预算」**：rot 不因窗口变大而消失，成本曲线也不会。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | OpenAI 指南 [context window 节](https://developers.openai.com/api/docs/guides/prompt-engineering) ｜ Anthropic [Context windows 文档](https://platform.claude.com/docs/en/build-with-claude/context-windows) | 先建立「预算」与 token 的直觉 |
| Builder | 本页 fixture 跑通 ｜ [Anthropic：Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 手上有守卫，再读官方心智模型 |
| Operator | 两家 token counting 文档 ｜ [Anthropic Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)（计费口径） | I1 的对账工具与预算口径 |
| Researcher | [Chroma：Context Rot 研究](https://research.trychroma.com/context-rot) ｜ Learn LLM [第 15 章 A5](https://llm.zenheart.site/chapters/15-prompt-memory) | 衰减实证与 KV cache / 注意力数学 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| OpenAI prompt engineering（context window 节） | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | 官方预算视角 | 窗口以 token 计、RAG 定义 | 读其 Structured Outputs |
| Anthropic Context windows | L1 | https://platform.claude.com/docs/en/build-with-claude/context-windows | 窗口与计费口径 | 输入输出共享预算 | 配 token counting 用 |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 心智模型总纲 | 注意力预算 / context rot | 组装策略 → [context-engineering](context-engineering.md) |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | 衰减实证 | 长 ctx 检索退化的实验证据 | 设计长文任务前读 |
| Learn LLM 第 15 章 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | 机制层 | KV cache / 注意力数学 / 截断实现 | 要「为什么」时读 |
| 本页 fixture | E | context-window.ts（正文内联） | 零 key 验证 | 四块配比 / 配对裁剪行为 | 换成厂商计数 API |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- 估算启发式（中文 1.5 字 / token）未经厂商 tokenizer 逐字核对，只用于守卫阈值，差 20% 不影响「先算后发」的结论。
- 未决：context rot 的量化临界点（多少 token 开始显著衰减）无通用公式，逐模型实测是唯一可靠来源。
- 各模型窗口上限与 tokenizer 持续变化，本页不维护数字清单；依赖前查官方当天文档。

### learn-ai 到此为止 / 继续去哪

- 预算之内的**装什么、按什么优先级装** → [context-engineering](context-engineering.md)。
- 跨轮历史存哪、怎么恢复 → [session-memory](session-memory.md)。
- 预算与成本进运营口径 → [cost-performance](../08-production/cost-performance.md)。
- KV cache / 注意力数学 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) 与 [架构桥接页](../01-model-lifecycle/architecture.md)。
