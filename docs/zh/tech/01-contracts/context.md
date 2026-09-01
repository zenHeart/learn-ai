---
title: 上下文工程
description: "回答「这一轮推理应该让模型看到什么」：窗口是预算、注意力是有限资源；预算先算后发、裁剪保 tool 配对、稳定前缀在前。"
domain: tech
tags: [contracts, context, context-window]
navOrder: 12
topicId: context
layer: "1"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/15-prompt-memory"
prerequisites: [prompt]
next: [structured-output]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 上下文工程

> **在哪一层**：层 1 · 交互契约 ｜ **上一层出口**：能定位问题域、受众和下一入口 ｜ **本层出口**：能算清一轮请求的 context budget、按「稳定前缀在前 + tool 配对完整」裁剪，并知道 context 腐烂的信号
> **前置**：[prompt](prompt.md) ｜ **下一步**：[structured-output](structured-output.md)

## 1. 概述

**结论**：提示写清之后质量还差，多数是窗口里塞错了东西。上下文工程（Context Engineering）回答的不是「怎么表达指令」（那是 [prompt](prompt.md)），而是**「这一轮推理应该让模型看到什么」**。Anthropic 的定义（检索 2026-09-01）：上下文是采样时包含的全部 token 集合，工程问题是「在这些 token 的固有约束下最大化其效用」。

核心事实：**上下文是有限资源，边际收益递减**。窗口变大不解决——检索准确率随 token 数增加而下降（context rot，上下文腐烂），这在所有模型上都出现。

### 心智模型：一轮请求的预算构成

```text
┌──────────────────── context window（这一轮的预算）────────────────────┐
│ system 提示      ─┐                                                    │
│ 工具 schema      ─┤ 稳定前缀（少改 → 吃缓存）                           │
│ few-shot 示例    ─┘                                                    │
│ 消息历史          ← 随轮次增长，超预算先裁这里（保 tool 配对）            │
│ 检索片段 / 文件   ← 按需注入（JIT），不整库预塞                          │
│ 本轮 user         ← 每轮变化，放尾部                                    │
│ 输出预留          ← 模型即将写出的 token 也占同一份预算                   │
└──────────────────────────────────────────────────────────────────────┘
不变量：Σ(以上全部) ≤ window；超了 → 400 或静默截断，多塞 → 更贵、更慢、更笨
```

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 写多轮对话产品、编码助手工作流、Agent 循环的工程师 |
| **何时用** | 任何超过一两轮、或注入外部内容（文件 / 检索 / 工具结果）的场景 |
| **何时不用** | 单轮、短提示、无外部数据——预算管理是纯开销 |
| **不是本页** | KV cache 与 n² 注意力为何限制预算的数学 → Learn LLM（桥接）；检索怎么建 → [embeddings-retrieval](../03-grounding/embeddings-retrieval.md) / [RAG](../03-grounding/rag.md)；记忆实现四模式 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) |

### 决策表：context 从哪来

| 来源 | 方向 | 生命周期 | 信任域 | 最低复杂度 | 失效模式 |
|---|---|---|---|---|---|
| system / developer | 注入（固定） | 版本化，长期 | 代码仓 | 最低 | 与提示重复、被静默丢弃 |
| 本轮 user 数据 | 注入（每轮） | 一次请求 | 调用方 | 最低 | 与规则揉在一起 |
| 消息历史 | 累积 | 会话内 | 会话状态 | 中（要裁剪） | 超窗、tool 配对被切断 |
| 检索（RAG / @文件） | 按需拉取 | 每次检索 | 数据源新鲜度 | 中高 | 索引陈旧、top-k 噪声 |
| 仓库 AGENTS.md | 注入（会话首） | 随仓库演进 | 仓库 | 低 | 命令是假的、写成第二份 README |

**版本里程碑**：AGENTS.md 格式由 [agents.md](https://agents.md/)（Agentic AI Foundation / Linux Foundation 托管）定义，Cursor、Codex、GitHub Copilot、Gemini CLI、Claude Code 等均读取（检索 2026-09-01，站点 200）。具体某工具的读取优先级以其产品文档为准。

## 2. 使用

### 最小实战：context budget 守卫（零 key）

15 分钟，Node 22 LTS。演示三条不变量：**预算先算后发**（I1）、**裁剪保 tool 配对**（I2）、**稳定前缀在前**（I3）。负例演示裸 `slice` 如何切断配对。

**setup**：存为 `context.ts`，运行 `npx tsx@4 context.ts`。

```ts
// fixture: 预算守卫 + 成对裁剪；与厂商 messages 数组同构的最小子集
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

function totalTokens(messages: Message[]): number {
  return messages.reduce((sum, m) => sum + messageTokens(m), 0)
}

// 不变量 I2：tool_use 与 tool_result 必须成对
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

// 不变量 I1：发之前估，超 80% 就拒绝发送
function assertFits(messages: Message[], budget: number, label: string): void {
  const used = totalTokens(messages)
  const ratio = (used / budget).toFixed(2)
  console.log(`[${label}] context ~${used} tokens / budget ${budget} (${ratio})`)
  if (used > budget * 0.8) {
    throw new Error(`context ~${used} tokens exceeds 80% of budget ${budget} — trim before sending, not after`)
  }
}

// 不变量 I2 + I3：system 永远保留；从队首移除旧消息但绝不切断 tool 配对
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
const conversation: Message[] = [
  system,
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

const BUDGET = 120 // 故意设小，触发预算告警

console.log('--- 正例：完整消息流，预算守卫触发 ---')
console.log('broken pairs:', findBrokenToolPairs(conversation))
try {
  assertFits(conversation, BUDGET, 'before trim')
} catch (error) {
  console.error(`guard fired: ${(error as Error).message}`)
}

console.log('\n--- 修复：成对裁剪（保留 system 稳定前缀） ---')
const trimmed = trimHistory(conversation, 4)
console.log('kept roles:', trimmed.map((m) => m.role).join(' → '))
console.log('broken pairs after trim:', findBrokenToolPairs(trimmed))
assertFits(trimmed, BUDGET, 'after trim')

console.log('\n--- 负例：裸 slice(-3) 会切断 tool 配对 ---')
const naive = conversation.slice(-3)
console.log('kept roles:', naive.map((m) => m.role).join(' → '))
console.log('broken pairs after naive slice:', findBrokenToolPairs(naive))
```

**正常输出**：

```text
--- 正例：完整消息流，预算守卫触发 ---
broken pairs: []
[before trim] context ~114 tokens / budget 120 (0.95)
guard fired: context ~114 tokens exceeds 80% of budget 120 — trim before sending, not after

--- 修复：成对裁剪（保留 system 稳定前缀） ---
kept roles: system → assistant → user → assistant → user → assistant → user
broken pairs after trim: []
[after trim] context ~79 tokens / budget 120 (0.66)
```

**负例输出**（裸 slice 切断配对，下一轮请求会直接 400）：

```text
--- 负例：裸 slice(-3) 会切断 tool 配对 ---
kept roles: user → assistant → user
broken pairs after naive slice: [ 'tool_result toolu_02 has no tool_use' ]
```

**验收命令**：

```bash
npx tsx@4 context.ts && echo BUDGET-OK
```

**清理**：删除临时文件。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：发前预算检查 | 本轮 messages | `assertFits` | 通过 / 拒发 | 所有多轮产品 | 单轮短请求 |
| 常见：历史裁剪 | 超预算会话 | `trimHistory`（保 system + 保配对） | 合法消息序列 | 长会话 | 需要完整历史审计的场景（存日志，不进窗口） |
| 组合：仓库级注入 | 仓库根 `AGENTS.md` | 工具自动读取 | 每次会话稳定前缀 | 编码助手跨工具一致 | 当次任务细节（写对话里） |

## 3. 原理

### 为什么预算有限：注意力与腐烂（决策影响层）

Anthropic 工程文章（检索 2026-09-01）给出三个事实：Transformer 里 n 个 token 有 n² 个成对注意力关系，上下文越长关系被摊得越薄；训练数据里短序列远多于长序列，模型对长程依赖经验不足；needle-in-a-haystack 类基准揭示 **context rot**——窗口内 token 越多，准确回忆能力越差，且这一特征跨模型存在。工程结论：**把上下文当有限预算做策展（curation），而不是当仓库做堆放**。

n² 复杂度、位置编码插值、KV cache 的数学 → 本仓停止，去 Learn LLM（[bridge](https://llm.zenheart.site/chapters/15-prompt-memory)）。

### 元原则与三条不变量

Anthropic 的元原则：**找到最小的、高信号的 token 集合，以最大化期望结果的概率**。注意「最小」不等于「短」——必要信息一个都不能少。落到工程：

1. **I1 预算先算后发**：组 messages 时检查，不发到厂商那里才发现 400。
2. **I2 裁剪保配对**：`tool_use` 与 `tool_result` 是配对结构；切断后轻则下一轮 400，重则模型重复执行副作用工具。
3. **I3 稳定前缀在前**：system、工具 schema、示例少改，动态内容（检索、本轮输入）放尾部——这是 prompt cache（提示缓存，复用前缀计算降低成本与延迟）的生效前提。

### 检索策略：预推理 vs JIT vs 混合

| 策略 | 做法 | 优势 | 代价 |
|---|---|---|---|
| 预推理检索 | 推理前把相关数据全准备好塞进窗口 | 快 | 易带入不相关内容（上下文污染） |
| Just-in-Time（JIT） | 只维护轻量标识符（文件路径、查询、链接），运行时用工具按需加载 | 上下文精准、免陈旧索引 | 运行时探索更慢 |
| 混合 | 部分 prefill + 按需探索 | 兼顾速度与精准 | 两套都要维护 |

Anthropic 给出的混合案例即 Claude Code：`CLAUDE.md` 预先放进上下文，`glob` / `grep` 原语运行时按需检索——「有效绕开索引陈旧问题」。元数据（路径、命名、时间戳）本身就是信号：`tests/` 下的 `test_utils.py` 与 `src/core_logic/` 下的同名文件传达不同用途。

### 长时域：压缩、笔记、子代理

任务跨数十分钟到数小时、token 超窗时，三条官方路线（检索 2026-09-01）：

| 技术 | 机制 | 适用 |
|---|---|---|
| 压缩（compaction） | 临近超窗的对话总结后重开新窗口；保留架构决策与未决 bug，丢弃冗余工具输出 | 大量来回对话 |
| 结构化笔记（note-taking） | 定期把进度写进窗口外持久存储（TODO、`NOTES.md`），需要时拉回 | 有清晰里程碑的迭代开发 |
| 子代理（sub-agents） | 专注任务交给干净窗口的子代理，只回传 1000-2000 token 蒸馏摘要 | 并行探索有回报的研究分析 |

最安全的轻压缩：**清除深层历史里的工具调用与结果**——工具早已执行完，原始结果无需反复可见。Anthropic 已将 tool result clearing 产品化。

### 仓库上下文：AGENTS.md

`AGENTS.md` 是给编码助手的 README：安装用哪个包管理器、测试怎么跑、哪些目录不能动。与 README 分工——README 给人，AGENTS.md 给助手。要点：无必填字段（就是 Markdown）；冲突时**离正在改的文件最近的 AGENTS.md 优先**，用户当次对话覆盖一切；命令必须是真能跑的（助手会执行你列出的检查）；大 monorepo 用嵌套文件。本仓根目录的 `AGENTS.md` / `CLAUDE.md` 即实地样本。

### 规范要求 vs 本地实测

| 官方/规范断言 | 本仓 fixture / 实践 |
|---|---|
| 上下文是有限资源、存在 context rot | fixture 的预算守卫即「先算后发」的最小落地 |
| 裁剪不得切断 tool 配对 | `findBrokenToolPairs` + `trimHistory` 成对裁剪，负例可见裸 slice 被检出 |
| 稳定前缀在前利于缓存 | `trimHistory` 永远保留 system 头；会话数据未接真实缓存计量 |
| 中文 1-2 字 / 英文 4 字符 ≈ 1 token | 启发式，仅用于发前预算；计费对账用厂商 token API |

### 关键不变量

见上 I1-I3。第四条：**信息密度比窗口上限重要**——「窗口 200k」不等于「可以把整个仓贴进去」。

## 4. 开发

### 集成要点

1. **预算检查进组装层**：在「组 messages 的函数」里调用 `assertFits`，而不是在 HTTP 客户端里事后补救。
2. **工具清单按任务开**：五个 MCP 服务器的工具定义能吃掉数万 token；只挂本任务用得上的，其余按需发现。
3. **token 对账用厂商 API**：估算只做守卫；计费与容量规划用 OpenAI / Anthropic 的 token counting 接口。
4. **AGENTS.md 命令先跑一遍**：写进去的每条命令亲自执行过；假命令会被助手如实执行。

### 调试 runbook

#### R1 长会话越聊越差、成本线性涨

**症状**：同一会话第 N 轮后回答质量下降、延迟与费用持续上升。
**证据**：逐轮 token 计数曲线（`totalTokens` 思路）；确认输入 token 随轮次单调增长。
**处理**：上裁剪（保配对）或压缩（总结重开窗口）；检索内容从「每轮全量」改为 JIT 按需。
**完成标准**：token 曲线回到锯齿稳态；预算守卫连续 N 轮不再触发。

#### R2 裁剪后下一轮 400

**症状**：加历史裁剪后，偶发 `400`，错误信息指向消息结构。
**证据**：dump 出错请求的完整 messages；对 tool_use / tool_result 做配对检查（`findBrokenToolPairs`）。
**处理**：换成保配对裁剪；或最轻手段先清除深层工具结果（成对清除，不是单边删）。
**完成标准**：连续无 400；配对检查入 CI fixture。

#### R3 缓存命中率低、p50 延迟高

**症状**：费用与延迟高于预期，前缀明明稳定。
**证据**：usage 里的缓存命中计量；diff 逐轮请求的前缀——若 system / 工具定义每轮有微小变化即命中失败。
**处理**：重排消息让稳定段严格在前；把每轮变化的内容（时间戳、随机 id、检索结果）移到尾部。
**完成标准**：缓存命中率恢复；前缀 diff 为空成为断言。

#### R4 助手在每个工具里都猜错项目约定

**症状**：换一个编码助手，又装错依赖、跑错测试命令。
**证据**：仓库根目录没有 AGENTS.md，或其中的命令与实际不符（在本仓跑 `npm install` 就是这类错误）。
**处理**：落一份命令真实、禁区明确的 AGENTS.md；人看的长内容留 README。
**完成标准**：新会话首轮即用对包管理器与测试命令；跨工具行为一致。

### 反模式清单

- **整本塞**：把整份设计文档 / 整库代码贴进每一轮；检索 top-k 带来源即可。
- **一次挂全部工具**：「以备不时之需」的五个 MCP 服务器吃掉数万 token 还让选择变模糊。
- **裸 `messages.slice(-N)`**：切断 tool 配对，下一轮 400。
- **静默丢 system**：超窗时丢最前面的系统提示——规则全没了，且没人知道。
- **把 AGENTS.md 写成第二份 README**：重复项目简介却不写安装 / 测试命令。
- **拿估算 token 去对账计费**：启发式只配做守卫。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | OpenAI 指南 [context window 节](https://developers.openai.com/api/docs/guides/prompt-engineering) ｜ Anthropic [Context windows 文档](https://platform.claude.com/docs/en/build-with-claude/context-windows) | 先建立「预算」与 token 的直觉 |
| Builder | [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ [agents.md](https://agents.md/) ｜ 本页 fixture | 官方心智模型 + 仓库级落地 |
| Operator | 两家 prompt caching 文档（[Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)）｜ token counting 文档 | I3 的收益与 I1 的对账工具 |
| Researcher | [Chroma：Context Rot 研究](https://research.trychroma.com/context-rot) ｜ Learn LLM [第 15 章 A5](https://llm.zenheart.site/chapters/15-prompt-memory) | 衰减实证与 KV cache / 注意力数学 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 心智模型与策略总纲 | 注意力预算 / context rot / JIT / compaction / 子代理 | 通读后对照自己的会话 |
| agents.md | L1 | https://agents.md/ | 仓库级上下文约定 | 格式、就近优先、工具支持面 | 给自己的仓库落一份 |
| OpenAI prompt engineering（context window 节） | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | 官方预算视角 | 窗口以 token 计、RAG 定义 | 读其 Structured Outputs |
| Anthropic Context windows | L1 | https://platform.claude.com/docs/en/build-with-claude/context-windows | 窗口与计费口径 | 输入输出共享预算 | 配 token counting 用 |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | 衰减实证 | 长 ctx 检索退化的实验证据 | 设计长文任务前读 |
| Learn LLM 第 15 章 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | 机制层 | 记忆四模式 / 截断实现 | 要「为什么」时读 |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- 估算启发式（中文 1.5 字 / token）未经厂商 tokenizer 逐字核对，只用于守卫阈值，差 20% 不影响「先算后发」的结论。
- compaction「保留什么丢什么」的最优提示没有公开基准；Anthropic 建议先最大化召回再迭代精度，属指导非定理。
- 未决：context rot 的量化临界点（多少 token 开始显著衰减）无通用公式，逐模型实测是唯一可靠来源。

### learn-ai 到此为止 / 继续去哪

- 输入侧的「给什么」解决了；输出侧「什么形状」→ [structured-output](structured-output.md)。
- 检索片段如何来、如何可追溯 → [embeddings-retrieval](../03-grounding/embeddings-retrieval.md)、[RAG](../03-grounding/rag.md)。
- KV cache / 注意力数学 / 记忆实现 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。
- 预算与成本进运营口径 → [cost-performance](../05-operations/cost-performance.md)。
