---
title: "Context 组：模型这一轮看到什么"
description: "提示之上的下一问：内容。五个主题回答模型单轮可见内容的全部工程问题——窗口硬预算、组装策略、跨轮会话、仓库约定；入口是 prompt，出口是算得清预算、组得对来源、防得住腐烂。"
domain: tech
tags: [context, index, navigation]
navOrder: 30
topicId: context-index
layer: "3"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: [structured-output]
next: [prompt, context-window, context, session-state, repo-context]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---
> **所在组**：Context 组（本组导览） ｜ **上一组出口**：接口契约与推理形态 ｜ **本组出口**：能按预算组装单轮上下文并管理跨轮记忆

# Context 组：模型这一轮看到什么

> **在哪一组**：Context 组 ｜ **进入本组前**：能写并验证输入/输出 schema（[structured-output](../02-inference-interface/structured-output.md)） ｜ **本组出口**：能回答「模型这一轮看到什么」的全链路——算得清预算、组得对来源、防得住腐烂
> **前置**：[structured-output](../02-inference-interface/structured-output.md) ｜ **下一步**：[嵌入与检索](../04-grounding/embeddings-retrieval.md)、[工具调用契约](../05-action/tool-calling.md)

## 1. 概述

**结论**：提示写得再好，也只能控制「怎么说」；质量与成本的另一半在「**给模型看什么**」。Context 组把这个问题拆成五个正交的小问题，每页管一个：怎么表达（prompt）、能装多少（context-window）、装什么（context-engineering）、跨轮历史放哪（session-memory）、仓库约定怎么声明（repo-context）。

为什么值得一个组：上下文是**有限资源且边际收益递减**——窗口内 token 越多，模型准确回忆越差（context rot，跨模型存在）；同时每一轮重发的内容都在计费。输入侧的策展做不好，上层（检索接地、工具执行、运营对账）都在为噪声付钱。

### 心智模型：从意图到窗口的变换链

```text
人的意图
   │ ① prompt           怎么表达（任务/约束/示例/输出格式）
   ▼
可控的指令 ── ② context-window    装得下多少（token 预算、配对、输出预留）
   │
   │ ③ context-engineering 装什么（来源、优先级、压缩、防腐）
   ▼
组装好的窗口 ── ④ session-memory  跨轮历史放哪（存储、裁剪、恢复、并发）
   │
   ▼ ⑤ repo-context      仓库约定怎么声明（AGENTS.md、就近优先、宿主注入）
模型这一轮真正看到的内容
```

### 症状路由：什么问题进哪页

```text
输出不稳定、答非所问（表达问题）        → prompt
请求报 400 超窗、成本线性涨、输出截断    → context-window
塞了检索还是答不对、答案引用旧内容      → context-engineering
刷新丢历史、越聊越失忆、并发写坏会话    → session-memory
换助手就装错依赖、跑错测试命令          → repo-context
```

### 主题导航表

| 主题 | 回答什么问题 | 出口 | 链接 |
|---|---|---|---|
| 提示词工程 | 怎么把意图写成模型可执行的指令？ | 能写四要素提示并当代码管理 | [prompt](prompt.md) |
| 上下文窗口 | 这一轮装得下多少？ | 能算四块预算、识别超窗症状、保配对裁剪 | [context-window](context-window.md) |
| 上下文工程 | 这一轮该装什么？ | 能设计多来源组装：优先级、可见挤出、压缩防腐 | [context-engineering](context-engineering.md) |
| 会话与状态 | 跨轮历史放哪？ | 能建会话：预算裁剪、持久化恢复、并发防护 | [session-memory](session-memory.md) |
| 仓库上下文 | 仓库约定怎么声明？ | 能落一份命令真实、分层正确的 AGENTS.md | [repo-context](repo-context.md) |

### 何时进本组 / 何时不进

| | |
|---|---|
| **写给谁** | 把模型接进产品或工作流、开始关心质量与成本的前端 / 全栈工程师 |
| **进** | 提示已能写清，但多轮、外部内容（文件 / 检索 / 工具结果）、编码助手任一出现 |
| **不进** | 回答本身还不稳定、无法解析——先回 [structured-output](../02-inference-interface/structured-output.md) 把契约闭环；模型内部机制 → Learn LLM |
| **不是本组** | 检索索引怎么建 → [接地组](../04-grounding/index.md)；动作怎么安全执行 → [tool-calling](../05-action/tool-calling.md) |

### 决策表：五个主题怎么分工

| | prompt | context-window | context-engineering | session-memory | repo-context |
|---|---|---|---|---|---|
| **控制什么** | 指令的表达 | 输入的容量 | 输入的内容选择 | 跨轮历史的存取 | 仓库级约定 |
| **方向** | 人 → 模型（意图） | 系统 → 窗口（预算） | 来源 → 窗口（策展） | 会话 → 存储 → 窗口 | 仓库 → 宿主 → 窗口 |
| **控制权** | 文本，全在你 | 组装层，全在你 | 组装层，全在你 | store 实现，全在你 | 仓库文件 + 宿主读取 |
| **状态** | 版本化文本 | 每轮重算 | 每轮重组 | 跨请求持久 | 随仓库演进 |
| **信任域** | 可 diff | 估算 vs 精算 | 来源新鲜度 | 存储与并发 | 命令真实性 |
| **最低复杂度** | 最低，永远先试 | 低（单轮）到中（多轮） | 中 | 中（+持久化） | 低（一个文本文件） |

建议按 navOrder 顺序读：prompt → context-window → context-engineering → session-memory → repo-context。

**版本里程碑**：未验证（各主题涉及的厂商能力时间线见各自主题页，本页不重复断言）。

## 2. 使用

本页是导航层，不设独立 fixture——本组统一的动手出口是 [context-window](context-window.md) 的零 key 预算分配器（15 分钟：四块配比 → 溢出告警 → 保配对裁剪，含负例）。它是整组的交汇点：提示占 system 块、历史占 history 块、检索占 retrieval 块、输出留 output 块——五个主题在一张预算表上会合。

**15 分钟自检**（跑完 fixture 后回答）：

1. 输出预留为什么必须计入预算？（答：输入输出共享窗口；不留则 `stop_reason: max_tokens` 截断）
2. 裁历史时哪两类消息绝对不能切断？（答：system 头；`tool_use` / `tool_result` 配对）
3. 预算超了第一动作是什么？（答：先裁低优先级来源且挤出可见，不是静默丢、也不是换更大窗口模型）

三题都答得出，本组前半程出口已达成；再跑 [context-engineering](context-engineering.md) 的组装器，把「来源有优先级、挤出必须可见」补齐。

**验收命令**（即 context-window 的确定性验收）：

```bash
npx tsx@4 context-window.ts && echo BUDGET-OK
```

**清理**：删除临时文件。

## 3. 原理

### 为什么「上下文」值得单独一个组

模型 API 的朴素视图是「提示进、文本出」，看起来只有 prompt 一个旋钮。工程化之后，「这一轮看到什么」至少裂成五个各有不变量的问题：token 有预算不变量、来源有优先级与失效条件、历史有存储与并发、仓库约定有就近覆盖与命令真实性。**每个子问题都可以独立验收**——这是把它们拆开的理由。

### 组级不变量（各页展开，此处总纲）

1. **预算先算后发**：任何一轮请求组装完即可判定会不会超窗（→ [context-window](context-window.md) I1）。
2. **裁剪不破坏结构**：system 保留、tool 配对完整、挤出可见（→ I2 与 [context-engineering](context-engineering.md)）。
3. **每个来源有优先级与失效条件**：没有优先级的组装等于先来先占（→ context-engineering）。
4. **命令必须真实**：写进 AGENTS.md 的命令助手会照单执行（→ [repo-context](repo-context.md)）。

### 两条通用的「到此为止」

- 注意力数学、KV cache、记忆实现四模式 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)（本组只取其工程含义）。
- 厂商窗口数字、缓存价格、token 计数接口字段 → 各家官方文档当天页面（本组不维护数字清单）。

## 4. 开发

### 组级验收清单（Exit criteria）

- [ ] 能把一条模糊需求改写成四要素提示，并让提示进版本库（prompt）
- [ ] 能为一轮请求算四块 token 预算，裁剪不切断 tool 配对（context-window）
- [ ] 能给多来源定优先级，挤出有报告，稳定来源在前缀（context-engineering）
- [ ] 能给多轮对话建会话：预算裁剪、持久化恢复、并发防护（session-memory）
- [ ] 能给自己的仓库落一份命令真实、分层正确的 AGENTS.md（repo-context）

### 调试 runbook（组级症状）

#### R1 「症状路由错了层，改提示不裁窗」

**症状**：多轮会话质量下降，团队连续改了三版提示词没有改善。
**证据**：逐轮 token 计数曲线仍单调上涨——问题不在表达，在预算。
**处理**：按症状路由表回 [context-window](context-window.md) R1；表达类症状（不稳定、答非所问）才进 [prompt](prompt.md)。
**完成标准**：失败样本先归因（表达 / 预算 / 内容 / 历史 / 约定）再动手，归因记录进 PR。

#### R2 「越聊越笨」的定位链

**症状**：长会话后半段回答质量明显下滑。
**证据**：依次检查——token 曲线是否逼近窗口（预算）→ 检索片段是否陈旧（内容）→ 关键轮次是否被裁（历史）。
**处理**：预算满 → 裁剪或压缩；内容旧 → 换 JIT；历史丢 → 调整保留策略（分别见 [context-window](context-window.md)、[context-engineering](context-engineering.md)、[session-memory](session-memory.md)）。
**完成标准**：同类会话不再随轮次单调劣化；定位链写进团队排障文档。

#### R3 「换助手行为就不一致」

**症状**：Cursor 里对的，Claude Code 里装错依赖；新人开局总要踩一遍坑。
**证据**：仓库根没有 AGENTS.md，或命令与实际不符。
**处理**：按 [repo-context](repo-context.md) R1 落文件；monorepo 子包例外用嵌套文件。
**完成标准**：新会话首轮用对命令；跨工具、跨成员行为一致。

### 反模式清单（组级）

- 跳过预算直接堆检索：内容越塞越多，质量反而下降——rot 不因窗口变大而消失。
- 用更长提示修内容问题：该裁的裁、该换来源的换来源。
- 组装逻辑散落多处：绕过优先级与守卫的拼装是第二套真相。
- 失败静默吞掉：挤出、裁剪、过期都必须有报告，否则不可调试。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [Anthropic 提示工程总览](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) ｜ [OpenAI 指南 context window 节](https://developers.openai.com/api/docs/guides/prompt-engineering) | 先有「表达」与「预算」的直觉 |
| Builder | 本组五页按序读完 + [context-window fixture](context-window.md) 跑通 | 手上有一套可回归的预算与组装循环 |
| Operator | 两家 prompt caching 与 token counting 文档 ｜ [agents.md](https://agents.md/) | 上线后的对账、命中率与团队约定 |
| Researcher | [Anthropic：Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ [Chroma：Context Rot](https://research.trychroma.com/context-rot) ｜ Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) | 心智模型、衰减实证与机制层 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| 本组五主题页 | L1 | [prompt](prompt.md) · [context-window](context-window.md) · [context-engineering](context-engineering.md) · [session-memory](session-memory.md) · [repo-context](repo-context.md) | 主路径 | — | 按序读 |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 心智模型总纲 | 元原则 / JIT / compaction / rot | 读原文 |
| OpenAI prompt engineering | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | 官方预算视角 | 窗口以 token 计 | 读其 Structured Outputs |
| Anthropic Context windows | L1 | https://platform.claude.com/docs/en/build-with-claude/context-windows | 窗口与计费口径 | 输入输出共享预算 | 配 token counting 用 |
| agents.md | L1 | https://agents.md/ | 仓库级上下文约定 | 格式、就近优先、工具支持面 | 给仓库落一份 |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | 衰减实证 | 长 ctx 检索退化 | 设计长文任务前读 |
| Learn LLM 第 15 章 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | 机制层桥接 | 注意力 / KV cache / 记忆四模式 | 要「为什么」时读 |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- 本组结论建立在 2026-09-01 检索的两家官方文档与 Anthropic 工程文章上；厂商窗口数字、缓存价格持续漂移，复核周期建议 ≤ 6 个月。
- 五主题切分是本仓的教学组织，服务于各自可验收的出口，不是行业标准分类。
- 未决：context rot 的量化临界点无通用公式（→ [context-window](context-window.md)）；compaction 保留策略无公开基准（→ [context-engineering](context-engineering.md)）。

### learn-ai 到此为止 / 继续去哪

- 输入侧闭环后，检索依据怎么建 → [嵌入与检索](../04-grounding/embeddings-retrieval.md)、[RAG](../04-grounding/rag.md)。
- 要执行动作 → [工具调用契约](../05-action/tool-calling.md)。
- 预算与成本进运营口径 → [成本与性能](../08-production/cost-performance.md)。
- 注意力与记忆机制 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。
