---
title: 上下文工程
description: "回答「这一轮应该让模型看到什么」：来源分类与优先级、按需检索（JIT）、压缩与笔记、稳定前缀在前；上下文腐烂时先换来源再换模型。"
domain: tech
tags: [context, context-engineering, curation]
navOrder: 33
topicId: context
layer: "3"
status: canonical
nodeType: pattern
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/15-prompt-memory"
prerequisites: [prompt, context-window]
next: [session-state, repo-context]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 上下文工程

> **在哪一组**：Context 组 ｜ **上一组出口**：能算清一轮请求的 token 预算并保配对裁剪 ｜ **本页出口**：能设计多来源的上下文组装——来源有优先级、挤出必须可见、压缩与防腐有章法
> **前置**：[提示词工程](prompt.md)、[上下文窗口](context-window.md) ｜ **下一步**：[会话与状态](session-memory.md)、[仓库上下文](repo-context.md)

## 1. 概述

**结论**：预算算清之后质量还差，多数是窗口里**装错了东西**。上下文工程（Context Engineering）回答的不是「怎么表达指令」（那是 [prompt](prompt.md)），也不是「装得下多少」（那是 [context-window](context-window.md)），而是**「这一轮推理应该让模型看到什么」**。Anthropic 的定义（检索 2026-09-01）：上下文是采样时包含的全部 token 集合，工程问题是「在这些 token 的固有约束下最大化其效用」。

核心元原则：**找到最小的、高信号的 token 集合，以最大化期望结果的概率**。注意「最小」不等于「短」——必要信息一个都不能少；高信号也不等于「多塞点总是没错」。

### 心智模型：来源 → 组装器 → 窗口

```text
system（规则）──┐                        ┌─ 稳定段在前（缓存友好）
memory（画像）──┤  组装器                 │
history（近轮）─┤  ：按优先级装填          ├─ 动态段在后（本轮变化）
retrieval（检索）┤  ：预算内挤出（可见）    │
task（本单）────┘  ：超预算先裁低优先级    └─ Σ ≤ window（见 context-window）
```

组装器的两个硬规则继承自 [context-window](context-window.md)：总量过预算守卫（I1）、裁历史保 tool 配对（I2）；本页加上第三条：**I3 稳定前缀在前**——system、工具 schema、示例少改，动态内容（检索、本轮输入）放尾部，这是 prompt cache（提示缓存，复用前缀计算降低成本与延迟）的生效前提。

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 写多轮对话产品、编码助手工作流、Agent 循环的工程师 |
| **何时用** | 任何超过一两轮、或注入外部内容（文件 / 检索 / 工具结果 / 记忆）的场景 |
| **何时不用** | 单轮、短提示、无外部数据——单一来源无需组装策略 |
| **不是本页** | 窗口上限与 token 计量 → [context-window](context-window.md)；跨轮历史存哪与并发防护 → [session-memory](session-memory.md)；仓库级约定（AGENTS.md）→ [repo-context](repo-context.md)；检索索引怎么建 → [embeddings-retrieval](../04-grounding/embeddings-retrieval.md) / [RAG](../04-grounding/rag.md)；记忆实现四模式 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) |

### 决策表：context 从哪来

| 来源 | 方向 | 生命周期 | 信任域 | 最低复杂度 | 失效模式 |
|---|---|---|---|---|---|
| system / developer | 注入（固定） | 版本化，长期 | 代码仓 | 最低 | 与提示重复、被静默丢弃 |
| 本轮 user 数据 | 注入（每轮） | 一次请求 | 调用方 | 最低 | 与规则揉在一起 |
| 消息历史 | 累积 | 会话内 | 会话状态 | 中（要裁剪） | 超窗、tool 配对被切断 |
| 检索（RAG / @文件） | 按需拉取 | 每次检索 | 数据源新鲜度 | 中高 | 索引陈旧、top-k 噪声 |
| 记忆（画像 / 笔记） | 读入 | 跨会话 | 记忆存储 | 中 | 过期画像误导当轮 |
| 仓库 AGENTS.md | 注入（会话首） | 随仓库演进 | 仓库 | 低 | 命令是假的、写成第二份 README（→ [repo-context](repo-context.md)） |

**版本里程碑**：厂商正在把压缩能力产品化（如 Anthropic 已将 tool result clearing 产品化，检索 2026-09-01）；具体字段与行为以官方文档为准，本页不维护厂商时间线。

## 2. 使用

### 最小实战：上下文组装器（零 key）

15 分钟，Node 22 LTS。演示三件事：多来源按**优先级**装填、预算内**低优先级被挤出且可见**（不是静默消失）、**稳定来源排前缀**（I3）。负例演示「先来先占 + 超了从头丢」如何把 system 规则无声扔掉。

**setup**：存为 `context-engineering.ts`，运行 `npx tsx@4 context-engineering.ts`。

```ts
// fixture: 上下文组装器——多来源、优先级、预算内裁剪（低优先级被挤出，且挤出可见）
type SourceKind = 'system' | 'memory' | 'history' | 'retrieval' | 'task'

interface Source {
  kind: SourceKind
  priority: number // 数值越大越重要；system/task 受保护，永不挤出
  stable: boolean // true = 稳定来源，排进前缀（吃缓存）；false = 动态来源，排尾部
  text: string
}

// 估算启发式：中文约 1-2 字/token、英文约 4 字符/token；对账用厂商 token 计数 API
function estimateTokens(text: string): number {
  const cjk = (text.match(/[一-鿿]/g) ?? []).length
  const rest = text.length - cjk
  return Math.ceil(cjk / 1.5 + rest / 4)
}

const cost = (s: Source): number => estimateTokens(s.text)
const total = (list: Source[]): number => list.reduce((sum, s) => sum + cost(s), 0)

interface AssemblyResult {
  window: Source[] // 最终进入窗口的顺序：稳定在前缀、动态在尾部
  evicted: Source[] // 被预算挤出的来源——必须显式报告，不允许静默消失
  used: number
}

function assemble(sources: Source[], budget: number): AssemblyResult {
  const protectedKinds = new Set<SourceKind>(['system', 'task'])
  const kept = [...sources]
  const evicted: Source[] = []

  // 挤出顺序：未受保护的来源里 priority 最低的先出；同分按到达顺序从先到后
  const evictOrder = sources
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => !protectedKinds.has(s.kind))
    .sort((a, b) => a.s.priority - b.s.priority || a.i - b.i)
  for (const { s } of evictOrder) {
    if (total(kept) <= budget) break
    kept.splice(kept.indexOf(s), 1)
    evicted.push(s)
  }
  if (total(kept) > budget) {
    throw new Error(`protected sources alone cost ${total(kept)} > budget ${budget} — raise the budget, do not drop rules`)
  }

  // I3 稳定前缀在前：稳定来源按原顺序排前，动态来源按 priority 降序排尾
  const stable = kept.filter((s) => s.stable)
  const dynamic = kept.filter((s) => !s.stable).sort((a, b) => b.priority - a.priority)
  return { window: [...stable, ...dynamic], evicted, used: total(kept) }
}

const show = (label: string, r: AssemblyResult): void => {
  console.log(`[${label}] used ${r.used} tokens`)
  console.log('  window :', r.window.map((s) => `${s.kind}(${s.priority}${s.stable ? ',stable' : ''})`).join(' -> '))
  console.log('  evicted:', r.evicted.length === 0 ? '[]' : r.evicted.map((s) => `${s.kind}(${s.priority})`).join(', '))
}

// 演示数据：一次工单定级任务的六个来源
const sources: Source[] = [
  { kind: 'system', priority: 100, stable: true, text: '定级规则：按影响面与是否有绕过路径定 P0/P1/P2；输出必须带定级理由。' },
  { kind: 'task', priority: 90, stable: false, text: '本单：企业客户报错 E42，问如何绕过。' },
  { kind: 'history', priority: 70, stable: false, text: '上一轮：已确认复现步骤与影响版本。' },
  { kind: 'memory', priority: 60, stable: true, text: '客户画像：企业版，SLA 黄金级，历史上 P0 都要求 1 小时响应。' },
  { kind: 'retrieval', priority: 50, stable: false, text: '[doc-47] 错误码 E42：认证 token 过期，重新登录可恢复。' },
  { kind: 'retrieval', priority: 30, stable: false, text: '[doc-12] 升级指南 2024 版：E42 在 2024.3 已修复，含迁移步骤与回滚说明。' },
]

console.log('--- 正例：预算充足，全部进入，稳定来源在前缀 ---')
show('budget=120', assemble(sources, 120))

console.log('\n--- 预算收紧：最低优先级的检索片段被挤出（且可见） ---')
show('budget=80', assemble(sources, 80))

console.log('\n--- 负例：按到达顺序拼、超了从头丢 —— system 规则被静默丢弃 ---')
function naiveFit(list: Source[], budget: number): Source[] {
  const kept = [...list]
  while (total(kept) > budget && kept.length > 0) kept.shift() // 从头丢，不看角色与优先级
  return kept
}
const naive = naiveFit(sources, 80)
console.log('[naive budget=80] used', total(naive), 'tokens')
console.log('  window :', naive.map((s) => `${s.kind}(${s.priority})`).join(' -> '))
console.log('  dropped: 定级规则消失，没有任何报告；本单数据靠后差点被丢')
```

**正常输出**：

```text
--- 正例：预算充足，全部进入，稳定来源在前缀 ---
[budget=120] used 98 tokens
  window : system(100,stable) -> memory(60,stable) -> task(90) -> history(70) -> retrieval(50) -> retrieval(30)
  evicted: []

--- 预算收紧：最低优先级的检索片段被挤出（且可见） ---
[budget=80] used 77 tokens
  window : system(100,stable) -> memory(60,stable) -> task(90) -> history(70) -> retrieval(50)
  evicted: retrieval(30)
```

**负例输出**（先来先占 + 从头丢：规则没了、且没有报告）：

```text
--- 负例：按到达顺序拼、超了从头丢 —— system 规则被静默丢弃 ---
[naive budget=80] used 77 tokens
  window : task(90) -> history(70) -> memory(60) -> retrieval(50) -> retrieval(30)
  dropped: 定级规则消失，没有任何报告；本单数据靠后差点被丢
```

**验收命令**：

```bash
npx tsx@4 context-engineering.ts && echo ASSEMBLER-OK
```

**清理**：删除临时文件。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：单来源 + 本单 | system + task | 组装 + 预算守卫 | 合法请求 | 所有调用 | — |
| 常见：多来源组装 | + 检索 / 记忆 / 历史 | 按优先级装填 | 带挤出报告的窗口 | RAG 类产品 | 来源唯一的简单调用 |
| 组合：预算收紧 | 超预算的多来源 | 低优先级先出 | 可见的裁剪决策 | 长会话 + 检索并存 | 需要全量审计（存日志不进窗） |

## 3. 原理

### 与 prompt、与同组各页的分工

| 问题 | 归属 |
|---|---|
| 怎么**表达**意图（任务/约束/示例/输出格式） | [prompt](prompt.md) |
| **装得下**多少（token 预算、配对、输出预留） | [context-window](context-window.md) |
| **装什么**、按什么优先级装（本页） | context-engineering |
| 跨轮历史**存哪**、怎么恢复、并发怎么防 | [session-memory](session-memory.md) |
| 仓库级**约定**怎么声明与注入 | [repo-context](repo-context.md) |

### 检索策略：预推理 vs JIT vs 混合

| 策略 | 做法 | 优势 | 代价 |
|---|---|---|---|
| 预推理检索 | 推理前把相关数据全准备好塞进窗口 | 快 | 易带入不相关内容（上下文污染） |
| Just-in-Time（JIT） | 只维护轻量标识符（文件路径、查询、链接），运行时用工具按需加载 | 上下文精准、免陈旧索引 | 运行时探索更慢 |
| 混合 | 部分 prefill + 按需探索 | 兼顾速度与精准 | 两套都要维护 |

Anthropic 给出的混合案例即 Claude Code：`CLAUDE.md` 预先放进上下文，`glob` / `grep` 原语运行时按需检索——「有效绕开索引陈旧问题」（检索 2026-09-01）。元数据（路径、命名、时间戳）本身就是信号：`tests/` 下的 `test_utils.py` 与 `src/core_logic/` 下的同名文件传达不同用途。仓库侧的完整约定见 [repo-context](repo-context.md)。

### 长时域：压缩、笔记、子代理

任务跨数十分钟到数小时、token 超窗时，三条官方路线（检索 2026-09-01）：

| 技术 | 机制 | 适用 |
|---|---|---|
| 压缩（compaction） | 临近超窗的对话总结后重开新窗口；保留架构决策与未决 bug，丢弃冗余工具输出 | 大量来回对话 |
| 结构化笔记（note-taking） | 定期把进度写进窗口外持久存储（TODO、`NOTES.md`），需要时拉回 | 有清晰里程碑的迭代开发 |
| 子代理（sub-agents） | 专注任务交给干净窗口的子代理，只回传 1000-2000 token 蒸馏摘要 | 并行探索有回报的研究分析 |

最安全的轻压缩：**成对清除深层历史里的工具调用与结果**——工具早已执行完，原始结果无需反复可见（裁剪细节与配对规则见 [context-window](context-window.md) 的 R2）。

### 腐烂与失效：两类 rot

| 类别 | 是什么 | 信号 | 处理 |
|---|---|---|---|
| 注意力腐烂（context rot） | 窗口内 token 越多回忆越差 | 长会话后半段开始「看不见」早前内容 | 减 token（裁剪/压缩）；机制见 [context-window](context-window.md) |
| 内容失效（staleness） | 进了窗口的内容本身过期：检索索引陈旧、注入文件已改、缓存前缀对应旧版规则 | 答案引用已删除的 API / 旧版本号；文件内容与实际不符 | 换 JIT 按需加载；给来源加版本与时间戳；前缀变更即失效重建 |

防腐的总原则：**每个来源都要有失效条件**——什么时候它不再可信、失效后谁负责刷新。

### 检索结果如何进上下文（与 RAG 的接口）

- **带来源**：片段附 doc id / 路径，答案可追溯（→ [rag](../04-grounding/rag.md) 的引用忠实度）。
- **top-k 有预算意识**：k 不是越大越好——多塞的每一段都在摊薄注意力。
- **无命中走显式路径**：检索为空时明确告诉模型「没有依据」，而不是塞满噪声。
- 检索链本身的构建 → [embeddings-retrieval](../04-grounding/embeddings-retrieval.md)。

### 规范要求 vs 本地实测

| 官方/规范断言 | 本仓 fixture / 实践 |
|---|---|
| 最小高信号 token 集 | 组装器按优先级装填，低优先级被挤出且可见 |
| 稳定前缀在前利于缓存 | `assemble` 稳定段严格在前；未接真实缓存计量（见未决问题） |
| 挤出不得静默 | `evicted` 显式返回；负例可见先来先占把 system 丢掉 |
| JIT 绕开陈旧索引 | 本仓自身即样本：`CLAUDE.md` 预置 + glob/grep 按需 |

### 关键不变量

1. **每个来源有优先级与失效条件**；没有优先级的组装等于先来先占。
2. **system 与本轮任务受保护**：预算再紧也不拿规则换空间。
3. **挤出必须可见**：被裁的内容要有报告，静默消失即不可调试。
4. **稳定在前、动态在后**：I3 是 prompt cache 的生效前提。

## 4. 开发

### 集成要点

1. **组装器单一入口**：全仓只有一个「组 messages / 来源装填」的函数；散落的拼装会绕过优先级与守卫。
2. **工具清单按任务开**：五个 MCP 服务器的工具定义能吃掉数万 token；只挂本任务用得上的，其余按需发现（→ [MCP](../07-interoperability/mcp.md)）。
3. **检索内容带来源与时间戳**：既是可追溯性，也是失效判断的依据。
4. **压缩提示词进版本库**：compaction「保留什么丢什么」是行为契约，要 review 与回归，不是运行时手写。

### 调试 runbook

#### R1 缓存命中率低、p50 延迟高

**症状**：费用与延迟高于预期，前缀明明稳定。
**证据**：usage 里的缓存命中计量；diff 逐轮请求的前缀——若 system / 工具定义每轮有微小变化即命中失败。
**处理**：重排来源让稳定段严格在前；把每轮变化的内容（时间戳、随机 id、检索结果）移到尾部。
**完成标准**：缓存命中率恢复；「前缀 diff 为空」成为断言。

#### R2 答案引用了已删除的 API / 旧版本

**症状**：模型言之凿凿，但引用的接口在当前代码里不存在。
**证据**：检索片段的 doc id 与时间戳 vs 当前 HEAD；注入文件内容 vs 实际文件。
**处理**：该来源改 JIT 按需加载（用的时候现查）；索引加更新管道；给来源标注版本。
**完成标准**：答案引用与当前版本一致；陈旧来源有失效告警。

#### R3 长任务跑着跑着「失忆」

**症状**：数十分钟后的回答忘记早前的架构决策，反复问已确认的问题。
**证据**：token 曲线逼近窗口；早前决策轮次已被裁掉或淹没在工具输出里。
**处理**：上 compaction（总结重开窗口，保留决策与未决问题）或结构化笔记（进度写窗口外，需要时拉回）；并行子任务交子代理（→ [multi-agent](../06-agent-systems/multi-agent.md)）。
**完成标准**：决策在压缩后仍被遵守；token 曲线回到稳态。

### 反模式清单

- **整本塞**：把整份设计文档贴进每一轮；检索 top-k 带来源即可。
- **一次挂全部工具**：「以备不时之需」的五个 MCP 服务器吃掉数万 token 还让选择变模糊。
- **先来先占**：组装顺序由代码到达顺序决定，规则性来源可能被排在最后甚至挤出。
- **静默挤出**：裁剪不报告，出了问题无从归因。
- **把 AGENTS.md 写成第二份 README**：重复项目简介却不写安装 / 测试命令（→ [repo-context](repo-context.md)）。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ OpenAI 指南 [context window 节](https://developers.openai.com/api/docs/guides/prompt-engineering) | 官方心智模型与预算直觉 |
| Builder | 本页组装器 fixture ｜ [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | 手上有多来源装填，再看 I3 的收益 |
| Operator | 两家 prompt caching 文档（[Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)）｜ 本页 R1-R3 runbook | 上线后命中率、陈旧、压缩三类运维 |
| Researcher | [Chroma：Context Rot 研究](https://research.trychroma.com/context-rot) ｜ Learn LLM [第 15 章 A5](https://llm.zenheart.site/chapters/15-prompt-memory) | 衰减实证与记忆实现四模式 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 心智模型与策略总纲 | 元原则 / JIT / compaction / 子代理 | 通读后对照自己的会话 |
| Anthropic prompt caching | L1 | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | I3 的收益与机制 | 前缀复用降本 | 配合稳定前缀改造 |
| OpenAI prompt engineering（context window 节） | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | 官方预算视角 | 窗口以 token 计 | 读其 Structured Outputs |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | 衰减实证 | 长 ctx 检索退化 | 设计长文任务前读 |
| Learn LLM 第 15 章 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | 机制层 | 记忆四模式 / 截断实现 | 要「为什么」时读 |
| 本页 fixture | E | context-engineering.ts（正文内联） | 零 key 验证 | 优先级装填 / 可见挤出 | 接真实检索来源 |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- compaction「保留什么丢什么」的最优提示没有公开基准；Anthropic 建议先最大化召回再迭代精度，属指导非定理。
- JIT vs 预推理没有通用最优解，取决于任务结构（探索深度 vs 响应时延）；本页只给决策维度。
- fixture 的稳定前缀排序未接真实缓存计量，「前缀稳定 → 命中率提升」的量化收益需按厂商计量验证。
- 未决：context rot 的量化临界点无通用公式（→ [context-window](context-window.md) 未决问题）。

### learn-ai 到此为止 / 继续去哪

- 检索片段如何来、如何可追溯 → [embeddings-retrieval](../04-grounding/embeddings-retrieval.md)、[rag](../04-grounding/rag.md)。
- 跨轮历史的存储、恢复与并发 → [session-memory](session-memory.md)。
- 仓库级约定的声明与注入 → [repo-context](repo-context.md)。
- 记忆实现四模式 / KV cache 数学 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。
