#!/usr/bin/env node
/** Review-fix batch D: create group guides for 05-action, 06-agent-systems, 09-advanced (zh+en). */
import { writeFileSync } from 'node:fs'

const LAST = '2026-09-01'

function fm(o) {
  return `---
title: ${o.title}
description: ${o.desc}
domain: tech
tags: [${o.tags}]
navOrder: ${o.navOrder}
topicId: ${o.topicId}
layer: "${o.layer}"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: [${o.prereq}]
next: [${o.next}]
specVersion: ""
lastVerified: "${LAST}"
bilingualParity: exact
listed: true
---

`
}

const pages = []

// ---------- 05-action ----------
pages.push({
  path: 'docs/zh/tech/05-action/index.md',
  body: fm({
    title: '行动组导览',
    desc: '从「读世界」跨到「写世界」的原语层：工具调用契约与工具执行工程——动作如何被描述、被校验、被安全地执行。'
      , tags: 'tech, action, navigation', navOrder: 49, topicId: 'action-guide', layer: '5',
    prereq: '', next: 'tool-calling, tool-execution'
  }) + `# 行动组导览

> **所在组**：行动（Action · 写世界） ｜ **上一组出口**：能让结果有据可查、可追溯 ｜ **本组出口**：能定义一次受控执行的动作，并让它具备幂等、超时、取消与权限边界

## 1. 概述

**结论先讲**：Grounding 组的系统最坏的失败是「给出没有依据的答案」；本组开始，系统会**改变外部世界**——写文件、发消息、下单。最坏的失败从「答错」升级为「做错」，且往往不可逆。因此本组只有两页，共同回答一个问题：**如何让一次动作受控**。

| 页面 | 回答的问题 | 读完你能 |
| --- | --- | --- |
| [工具调用契约](./tool-calling) | 模型如何「想调用」一个动作？schema、选择、参数验证 | 定义可靠的工具接口契约 |
| [工具执行工程](./tool-execution) | 「实际执行」如何安全？幂等、超时、取消、副作用分级、权限 | 落地一个受控执行器 |

**边界**：本组是单次动作的原语层。多步编排、状态与恢复进入 [Agent 系统组](../06-agent-systems/)；跨边界协议进入 [互操作组](../07-interoperability/)。

## 2. 使用

- 想知道模型调工具的**契约**长什么样 → 从 [工具调用契约](./tool-calling) 进入。
- 已经在调工具，但担心**重复执行、卡死、越权** → 直接读 [工具执行工程](./tool-execution)。
- 两页各自自带零密钥可运行 fixture；先跑通再回到正文对照。

## 3. 原理

「想调用」与「实际执行」的分离是本组的组织原则，也是安全边界的基础：模型输出只是**意图**（一段结构化参数），执行权完全在你的代码手里。所有安全手段——参数校验、allowlist、幂等键、审批门——都挂在执行侧。

## 4. 开发

常见误区：把工具 schema 写得过于宽泛（参数全可选、描述含糊），导致模型侧「想调用」的质量差；以及在执行侧缺少副作用分级，把不可逆操作当成普通调用。两页的开发段各给出对应 runbook。

## 5. 资料库

- Beginner：[工具调用契约](./tool-calling) 概述与决策表。
- Builder：[工具执行工程](./tool-execution) 的执行循环 fixture。
- Operator：执行工程的 runbook（超时、取消、审批）。
- Researcher：Anthropic / OpenAI 官方 tool use 指南（见两页资料库表）。
`
})
pages.push({
  path: 'docs/tech/05-action/index.md',
  body: fm({
    title: 'Action Group Guide',
    desc: 'Crossing from reading the world to writing it: tool-calling contract and tool-execution engineering — how actions are described, validated, and executed safely.'
      , tags: 'tech, action, navigation', navOrder: 49, topicId: 'action-guide', layer: '5',
    prereq: '', next: 'tool-calling, tool-execution'
  }) + `# Action Group Guide

> **Group**: Action (writing the world) | **Previous group exit**: answers grounded in traceable evidence | **This group exit**: define one controlled action with idempotency, timeout, cancellation, and permission boundaries

## 1. Overview

**BLUF**: systems up to the Grounding group at worst give an unsupported answer. Starting here, systems **change the external world** — writing files, sending messages, placing orders. The worst failure upgrades from "wrong answer" to "wrong action", often irreversible. This group is two pages answering one question: **how to keep an action under control**.

| Page | Question it answers | You leave able to |
| --- | --- | --- |
| [Tool calling contract](./tool-calling) | How does the model *intend* an action? Schema, selection, argument validation | Define reliable tool interface contracts |
| [Tool execution engineering](./tool-execution) | How is *actual execution* safe? Idempotency, timeouts, cancellation, side-effect classes, permissions | Ship a controlled executor |

**Boundary**: this group is the single-action primitive layer. Multi-step orchestration and state move to [Agent Systems](../06-agent-systems/); cross-boundary protocols to [Interoperability](../07-interoperability/).

## 2. Usage

- Want the **contract** shape for model tool calls → start at [Tool calling contract](./tool-calling).
- Already calling tools but worried about **duplicate runs, hangs, privilege escape** → read [Tool execution engineering](./tool-execution) directly.
- Both pages ship a zero-key runnable fixture; run it first, then read.

## 3. Principles

The intent/execution split organizes this group and is its security foundation: model output is only **intent** (structured arguments); execution authority stays entirely in your code. Every safeguard — validation, allowlists, idempotency keys, approval gates — lives on the execution side.

## 4. Development

Common pitfalls: overly permissive tool schemas (all-optional arguments, vague descriptions) degrade intent quality; missing side-effect classification treats irreversible operations like ordinary calls. Each page's Development section carries the matching runbooks.

## 5. Resource Library

- Beginner: [Tool calling contract](./tool-calling) overview and decision table.
- Builder: the execution-loop fixture in [Tool execution engineering](./tool-execution).
- Operator: execution runbooks (timeout, cancellation, approval).
- Researcher: Anthropic / OpenAI official tool-use guides (see each page's resource tables).
`
})

// ---------- 06-agent-systems ----------
const zh06 = `# Agent 系统组导览

> **所在组**：Agent 系统 ｜ **上一组出口**：能定义并安全执行一次受控动作 ｜ **本组出口**：能搭建一个有状态、可恢复、权限受限的自治循环

## 1. 概述

**结论先讲**：本组把「单次动作」升级为「持续闭环」：模型在一个循环里观察、决策、行动，直到触发停止条件。闭环带来自治，也带来新的失败维度——状态膨胀、死循环、错误传播、无人监督的副作用。组内十页按「先心智模型、再模式、再控制面、最后规模化」排列。

| 顺序 | 页面 | 回答的问题 |
| --- | --- | --- |
| 前门 | [心智模型与运行时](./agent-runtime) | 闭环由什么组成？何时值得上 agent？ |
| 模式 | [设计模式](./design-patterns) | ReAct、路由、规划-执行、反思如何选？ |
| 状态 | [状态与记忆](./state-memory) | 跨步/跨轮的数据放哪、怎么恢复？ |
| 控制面 | [Hooks](./hooks) | 生命周期拦截与自动化策略门 |
| 控制面 | [恢复与人工批准](./recovery-hitl) | 失败后回到哪个状态？何时必须等人？ |
| 环境适配 | [Computer Use](./computer-use) | 只有视觉 UI 可用时如何 observe→act→verify |
| 确定性替代 | [工作流模式](./workflow) | 什么时候**不要**用 agent |
| 能力包装 | [Skills](./skills) · [Plugins](./plugins) | 程序性知识与能力包的分发 |
| 规模化 | [子代理 / 多 Agent](./multi-agent) | 同信任域内的委派与编排 |

**边界**：跨进程 / 组织 / 信任域的委派不属于本组——先过 [互操作组](../07-interoperability/)（A2A 等）。

## 2. 使用

- 第一次接触 agent：按上表从 [心智模型与运行时](./agent-runtime) 顺序读。
- 已在生产跑 agent：直接跳 [恢复与人工批准](./recovery-hitl) 与 [Hooks](./hooks)。
- 不确定该不该用 agent：先读 [工作流模式](./workflow) 的反向决策。

## 3. 原理

闭环的三个不变量：**停止条件必须显式**（步数 / token / 时间三轴预算）、**状态必须可检查点**、**副作用必须经过行动组的执行纪律**。缺任何一条，自治只会放大失败。

## 4. 开发

各组员的开发段共用同一套调试口径：症状 → 证据（trace/checkpoint）→ 处理 → 完成标准。多 agent 的调试单位是委派；单 agent 的调试单位是循环步。

## 5. 资料库

各主题页自带四级阅读路线；组级入口推荐 Anthropic《Building Effective Agents》与 OpenAI Agents 指南（见 agent-runtime 资料库表）。
`
const en06 = `# Agent Systems Group Guide

> **Group**: Agent Systems | **Previous group exit**: define and safely execute one controlled action | **This group exit**: build a stateful, recoverable, permission-bounded autonomous loop

## 1. Overview

**BLUF**: this group upgrades a *single action* into a *sustained loop*: the model observes, decides, and acts until a stop condition fires. Autonomy brings new failure modes — state bloat, runaway loops, error propagation, unsupervised side effects. Ten pages run from mental model, through patterns, to control plane and scale.

| Order | Page | Question it answers |
| --- | --- | --- |
| Front door | [Mental model & runtime](./agent-runtime) | What composes the loop? When is an agent worth it? |
| Patterns | [Design patterns](./design-patterns) | ReAct, routing, planner-executor, reflection — which and when? |
| State | [State & memory](./state-memory) | Where do cross-step / cross-turn data live, and how to recover? |
| Control plane | [Hooks](./hooks) | Lifecycle interception and automated policy gates |
| Control plane | [Recovery & HITL](./recovery-hitl) | Which state do you return to? When must a human decide? |
| Environment fit | [Computer use](./computer-use) | observe→act→verify when only a visual UI exists |
| Deterministic alternative | [Workflow patterns](./workflow) | When **not** to use an agent |
| Capability packaging | [Skills](./skills) · [Plugins](./plugins) | Distributing procedural knowledge and capability packages |
| Scale | [Subagent / multi-agent](./multi-agent) | Delegation and orchestration within one trust domain |

**Boundary**: delegation across processes, organizations, or trust domains is not here — go through [Interoperability](../07-interoperability/) (A2A et al.) first.

## 2. Usage

- First contact with agents: read top-down starting from [Mental model & runtime](./agent-runtime).
- Already running agents in production: jump to [Recovery & HITL](./recovery-hitl) and [Hooks](./hooks).
- Unsure an agent is warranted: read the reverse decision in [Workflow patterns](./workflow) first.

## 3. Principles

Three loop invariants: **stop conditions must be explicit** (steps / tokens / wall-clock budget), **state must be checkpointable**, **side effects must pass Action-group execution discipline**. Missing any one, autonomy only amplifies failure.

## 4. Development

Pages share one debugging grammar: symptom → evidence (trace / checkpoint) → fix → done criteria. The multi-agent debug unit is the delegation; the single-agent unit is the loop step.

## 5. Resource Library

Each topic page carries its own four-tier route; group-level entries are Anthropic's *Building Effective Agents* and the OpenAI Agents guide (see agent-runtime resource tables).
`
pages.push({ path: 'docs/zh/tech/06-agent-systems/index.md', body: fm({ title: 'Agent 系统组导览', desc: '从单次动作到自治闭环：心智模型、设计模式、状态与恢复、控制面与规模化的十页导航。', tags: 'tech, agent-systems, navigation', navOrder: 59, topicId: 'agent-systems-guide', layer: '6', prereq: 'tool-execution', next: 'agent-runtime, workflow, recovery-hitl' }) + zh06 })
pages.push({ path: 'docs/tech/06-agent-systems/index.md', body: fm({ title: 'Agent Systems Group Guide', desc: 'From single actions to autonomous loops: mental model, patterns, state and recovery, control plane, and scale — a ten-page navigation.', tags: 'tech, agent-systems, navigation', navOrder: 59, topicId: 'agent-systems-guide', layer: '6', prereq: 'tool-execution', next: 'agent-runtime, workflow, recovery-hitl' }) + en06 })

// ---------- 09-advanced ----------
pages.push({
  path: 'docs/zh/tech/09-advanced/index.md',
  body: fm({
    title: '进阶组导览',
    desc: '前沿边界的四张桥接卡：可解释性、推理与测试时计算、MoE 与新架构、多模态——只讲定位与决策影响，推导全部外包给 Learn LLM。'
      , tags: 'tech, advanced, bridge, navigation', navOrder: 90, topicId: 'advanced-guide', layer: '9',
    prereq: '', next: 'interpretability, reasoning-ttc, moe-frontier, multimodal'
  }) + `# 进阶组导览

> **所在组**：进阶（Advanced · 桥接组） ｜ **上一组出口**：能用发布门与版本化纪律长期运行 ｜ **本组出口**：知道每个前沿主题影响哪个工程决策、何时跳转 Learn LLM

## 1. 概述

**结论先讲**：本组四个主题都不是「要学会推导」的内容，而是「要有位置感」的内容——它们决定你选什么模型、预期什么延迟结构、为什么某类输出「思考」很久。每页都是桥接卡：解决什么问题 / 影响什么决策 / 何时跳转 [Learn LLM](https://llm.zenheart.site/)。

| 卡片 | 一句话定位 | 最影响你的 |
| --- | --- | --- |
| [可解释性](./interpretability) | 模型为什么这样输出 | 调试预期、合规叙事 |
| [推理 · 测试时计算](./reasoning-ttc) | 「想更久」是一种性能轴 | 延迟结构、计费、停止条件 |
| [MoE / 前沿架构](./moe-frontier) | 稀疏与长上下文架构 | 模型选型与成本曲线 |
| [多模态](./multimodal) | 跨模态输入输出 | 输入管道与产品形态 |

**纳入门槛**：本组只收「Learn LLM 深水区的桥接卡」，每卡必须有明确的工程决策影响；纯研究向内容不进本组，防止其垃圾桶化。

## 2. 使用

不确定某个前沿词该不该关心 → 在上表找一行，读对应卡（每张 ≤130 行），再决定是否去 Learn LLM 深挖。附录侧的 [视觉能力案例](./multimodal-vision-case) 是多模态卡的真实案例配对。

## 3. 原理

本组不承担原理正文；所有推导以 Learn LLM 为 canonical owner。卡片内出现的任何机制名词只给一句定位。

## 4. 开发

桥接卡的「开发」语义 = 决策影响表：每张卡明确列出「这个机制变化时，你要改什么」（模型选型 / 预算 / 停止条件 / 数据管道）。

## 5. 资料库

各卡资料库列一手源（论文 arXiv 号、官方说明）与 Learn LLM 对应章节方向；证据层级 legend 见 [站点边界](../00-map/site-boundaries)。
`
})
pages.push({
  path: 'docs/tech/09-advanced/index.md',
  body: fm({
    title: 'Advanced Group Guide',
    desc: 'Four bridge cards on the frontier: interpretability, reasoning & test-time compute, MoE and new architectures, multimodal — positioning and decision impact only; derivations live in Learn LLM.'
      , tags: 'tech, advanced, bridge, navigation', navOrder: 90, topicId: 'advanced-guide', layer: '9',
    prereq: '', next: 'interpretability, reasoning-ttc, moe-frontier, multimodal'
  }) + `# Advanced Group Guide

> **Group**: Advanced (bridge group) | **Previous group exit**: run long-term with release gates and versioning discipline | **This group exit**: know which engineering decision each frontier topic affects, and when to jump to Learn LLM

## 1. Overview

**BLUF**: none of these four topics ask you to master derivations; they ask for *positional sense* — they decide which model you pick, what latency structure to expect, why some outputs "think" for a long time. Every page is a bridge card: what problem it solves / which decision it affects / when to jump to [Learn LLM](https://llm.zenheart.site/).

| Card | One-line positioning | Mostly affects |
| --- | --- | --- |
| [Interpretability](./interpretability) | Why the model produced this output | Debugging expectations, compliance narratives |
| [Reasoning · test-time compute](./reasoning-ttc) | "Thinking longer" is a performance axis | Latency structure, billing, stop conditions |
| [MoE / frontier architectures](./moe-frontier) | Sparsity and long-context architectures | Model choice and cost curves |
| [Multimodal](./multimodal) | Cross-modal inputs and outputs | Ingest pipeline and product shape |

**Admission rule**: this group only accepts *bridge cards to Learn LLM's deep end*, each with an explicit engineering decision impact; pure research content stays out, so the group cannot decay into a catch-all.

## 2. Usage

Unsure whether a frontier term matters to you → find a row above, read the card (each ≤130 lines), then decide whether to descend into Learn LLM. The appendix-side [vision case](./multimodal-vision-case) pairs with the multimodal card as real-world evidence.

## 3. Principles

This group carries no derivation body; Learn LLM is the canonical owner. Any mechanism name inside a card gets one positioning sentence, nothing more.

## 4. Development

"Development" here means the decision-impact table: each card lists *what you change when the mechanism shifts* (model choice / budget / stop conditions / data pipeline).

## 5. Resource Library

Each card's library lists primary sources (arXiv IDs, official statements) and the Learn LLM chapter direction; the evidence-level legend lives in [Site boundaries](../00-map/site-boundaries).
`
})

for (const p of pages) writeFileSync(p.path, p.body)
console.log('wrote', pages.length, 'group guides')
