---
title: "层 1 · 交互契约：让输入输出可控"
description: "回答不稳定、输出无法解析时进本层：提示、上下文、结构化输出、工具调用四个契约，出口是能写并验证输入输出 schema、知道失败验收。"
domain: tech
tags: [contracts, index]
navOrder: 10
topicId: contracts-index
layer: "1"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: []
next: [prompt, context, structured-output, tool-calling]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 层 1 · 交互契约：让输入输出可控

> **在哪一层**：层 1 · 交互契约 ｜ **上一层出口**：能定位问题域、受众和下一入口 ｜ **本层出口**：能写并验证输入/输出 schema，知道失败验收，知道何时升级到层 2
> **前置**：无（第一层；若还不确定本仓与相邻知识站的分工，先回 [tech-map](../00-orientation/index.md)） ｜ **下一步**：[model-api](../02-integration/model-api.md)

## 1. 概述

**结论**：层 1 是金字塔的地基。上层的一切——产品交互、检索接地、安全执行、可靠运营——都建立在两个前提上：**输入可控**（你决定模型看到什么、以什么形式表达意图）与**输出可验证**（输出形状有合同、失败有验收）。这两个前提不成立时，上层做得越多，不可判定的行为越多。

为什么契约先于一切：模型的输出是概率采样，不是函数返回值。工程化的路径不是消除不确定性，而是**用契约把自由度收敛到可验证的子集**——指令有四要素、输入有预算不变量、输出有 schema、动作有白名单。每个契约都把一类「偶尔坏」变成「可检测地坏」。

### 症状路由：什么问题进本层

```text
回答不稳定 / 输出无法解析            → 层 1 交互契约（你在这里）
回答稳定，但还没接进产品              → 层 2 应用接入
回答缺少私有或新鲜事实                → 层 3 知识接地
需要调用系统或执行动作                → 层 4 行动与协作
功能已跑，但无法证明可上线 / 不可运营  → 层 5 可靠运营
```

### 心智模型：能力变换链上的第一站

```text
人的意图
   │  ① prompt    —— 怎么表达指令（任务/约束/示例/输出格式）
   ▼
可控的输入 ── ② context —— 这一轮让模型看到什么（预算/来源/腐烂）
   │
 模 型
   │  ③ structured-output —— 输出什么形状（schema 合同 + 验证层）
   ▼  ④ tool-calling —— 想做什么动作（请求与执行分离）
可验证的结果 → 层 2（产品交互）→ 层 3（接地）→ 层 4（执行）→ 层 5（运营）
```

### 主题导航表

| 主题 | 回答什么问题 | 出口 | 链接 |
|---|---|---|---|
| 提示词工程 | 怎么把意图写成模型可执行的指令？ | 能写四要素提示并当代码管理 | [prompt](prompt.md) |
| 上下文工程 | 这一轮推理让模型看到什么？ | 能管预算、保配对裁剪、识腐烂 | [context](context.md) |
| 结构化输出 | 输出形状怎么才有合同？ | 能写 schema + 验证层 + 失败重试 | [structured-output](structured-output.md) |
| 工具调用契约 | 模型想执行动作时约定什么？ | 能定义 schema、过闸门、回传结果 | [tool-calling](tool-calling.md) |

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 开始把 LLM 接进产品或工作流的前端 / 全栈工程师 |
| **前置** | 无——这是第一层。会打开模型 API 或任意编码助手即可 |
| **不是本层** | 模型内部机制（注意力 / 采样数学）→ Learn LLM；评估方法学 → evals；厂商产品用法 → Products |
| **何时升级到层 2** | 单次请求的契约闭环已验收，要做多轮、流式、可取消的产品交互时 |

### 决策表：四个契约怎么分工

| | prompt | context | structured-output | tool-calling |
|---|---|---|---|---|
| **控制什么** | 指令的表达 | 输入的内容与预算 | 输出的形状 | 动作请求的形状 |
| **方向** | 人 → 模型（意图） | 系统 → 窗口（策展） | 模型 → 代码（合同） | 模型 → 系统（请求） |
| **控制权** | 文本，全在你 | 组装，全在你 | schema + 解码器 | schema + 你的闸门 |
| **状态** | 版本化文本 | 每轮重组 | 每次生成的合同 | 多步循环 |
| **信任域** | 可 diff | 数据新鲜度要治理 | 形状可信、语义仍校验 | 请求可信 ≠ 执行合理 |
| **最低复杂度** | 最低 | 低（单轮）到中（多轮） | 低 | 中 |

先读 [prompt](prompt.md)（表达），再 [context](context.md)（内容），然后 [structured-output](structured-output.md)（输出合同），最后 [tool-calling](tool-calling.md)（动作合同）。

**版本里程碑**：未验证（本层四契约各自的厂商能力时间线见各主题页，本页不重复断言）。

## 2. 使用

本页是导航层，不设独立 fixture——层 1 的统一动手出口是 [structured-output](structured-output.md) 的零 key 验证循环（15 分钟：schema → mock 模型 → 验证 → 失败重试，含三类负例）。它是四个契约的交汇点：提示写行为、上下文管重试轮次、schema 定形状、失败可判定。

**15 分钟自检**（跑完 fixture 后回答）：

1. 三类负例（缺字段 / 多字段 / 类型错）分别是被谁拒收的？（答：调用方验证层，不是提示）
2. 重试时错误信息去了哪里？（答：拼进重试反馈回传给模型）
3. 厂商约束解码保证什么、不保证什么？（答：保证形状；不保证语义，也不免除 refusal / 截断两类失败）

三题都答得出，层 1 出口已达成。

**验收命令**（即 structured-output 的确定性验收）：

```bash
npx tsx@4 structured-output.ts > run1.txt && npx tsx@4 structured-output.ts > run2.txt && diff run1.txt run2.txt && echo DETERMINISTIC
```

**清理**：删除 run1.txt / run2.txt。

## 3. 原理

### 为什么「契约」是正确的第一抽象

模型 API 的朴素视图是「文本进、文本出」。这个视图下没有可验收的东西：同一个输入两次调用结果不同，你无法说哪次「对」。契约视图把交互拆成四个可分别验证的界面：

1. **指令契约**（prompt）：行为的最小来源。可 lint、可版本化。
2. **输入契约**（context）：预算不变量 + 配对不变量。可计数、可断言。
3. **形状契约**（structured-output）：schema + 独立验证层。可拒绝、可重试。
4. **动作契约**（tool-calling）：白名单 + 参数校验。可拒绝、可回传错误。

四者的共同结构：**约定一个机器可判定的谓词，让失败显式**。这是「可控」的工程定义——不是「不失败」，而是「失败时你知道，且知道属于哪一类」。

### 失败的两条通用出口

层 1 的每个契约最终都会遇到两类不归契约管的失败（以 structured-output 为最典型，两家官方文档均明示，检索 2026-09-01）：

- **拒答（refusal）**：安全原因的拒绝。Anthropic 返回 200、照常计费、`stop_reason: 'refusal'`；OpenAI 提供可编程检测的 refusal。重试同样内容无意义。
- **截断（max_tokens）**：输出预算不足导致不完整。提高预算或拆小输出。

知道这两类失败的存在与验收方式，本身就是层 1 出口的一部分。

### 关键不变量

1. 凡是要进代码的输出，必须有机器可校验的 schema（提示里的「请输出 JSON」不算）。
2. 凡是会影响动作的输出（工具调用），必须过白名单与参数校验后才执行。
3. 凡是失败路径，必须显式（重试 / 升级 / 终止三选一），禁止静默吞掉。

### learn-ai 到此为止 / 继续去哪（原理侧）

采样、注意力、few-shot 机制 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)；契约质量如何变成发布证据 → evals（[evaluation](../05-operations/evaluation.md) 桥接）。

## 4. 开发

### 层级验收清单（Exit criteria）

- [ ] 能把一条模糊需求改写成四要素提示，并让提示进版本库
- [ ] 能为一轮请求算 context budget，裁剪不切断 tool 配对
- [ ] 能写 JSON Schema、加调用方验证层、实现失败重试（三类负例被拒）
- [ ] 能定义 tool schema，执行前过白名单 + 参数校验，错误按契约回传
- [ ] 知道 refusal / 截断两类失败的存在与验收方式
- [ ] 知道何时升级到层 2：单请求契约闭环已验收，要做产品化交互

### 调试 runbook（层级常见症状）

#### R1 「模型时好时坏，没法上线」

**症状**：演示效果不错，试用时输出偶尔完全不能用。
**证据**：收集失败样本，分类——格式坏（围栏 / 缺字段）→ 缺事实 → 缺动作能力。分类结果决定修哪一层。
**处理**：格式坏 → [structured-output](structured-output.md)；表达歧义 → [prompt](prompt.md)；缺事实 → 层 3；缺动作 → [tool-calling](tool-calling.md)。
**完成标准**：失败样本归入已知类别，每类有对应契约与回归。

#### R2 「接进产品后 parse 报警」

**症状**：对话里好好的，进代码就 `JSON.parse` 失败。
**证据**：报警样本的原始输出体（带围栏？缺字段？截断？）。
**处理**：按 [structured-output](structured-output.md) R1 的三类根因处理（围栏 → strict schema；refusal → 业务处置；截断 → 加预算）。
**完成标准**：parse 失败率归零或归因明确；CI 有坏输出必拒的 fixture。

#### R3 「工具一上就出事故」

**症状**：模型调了不该调的工具 / 参数离谱，产生真实副作用。
**证据**：执行日志——是否清单外工具名（幻觉）、参数是否过校验。
**处理**：按 [tool-calling](tool-calling.md) R1 补闸门；副作用工具接权限与人工批准（层 4）。
**完成标准**：未授权执行次数为 0；闸门拒绝计数可观测。

### 反模式清单（层级）

- 跳过契约直接堆编排：Agent 框架叠三层，底层输出还是不可解析。
- 把「测试一次通过」当验收：采样运气不是合同；确定性 fixture + CI 才是。
- 用更长提示修一切：该上 schema 的上 schema，该裁上下文的裁上下文。
- 失败静默吞掉：错误不可见 ≠ 系统稳定。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [Anthropic 提示工程总览](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) ｜ [OpenAI 提示工程指南](https://developers.openai.com/api/docs/guides/prompt-engineering) | 两家官方第一入口，覆盖层 1 的表达与角色层级 |
| Builder | 本层四个主题页按序读完 + [structured-output fixture](structured-output.md) 跑通 ｜ [Anthropic 交互式教程](https://github.com/anthropics/prompt-eng-interactive-tutorial) | 手上有一套可回归的契约循环后再扩展 |
| Operator | [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) ｜ [Anthropic Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) ｜ [Anthropic Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | 上线前逐家核对支持子集与失败语义 |
| Researcher | [Anthropic：Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) | 契约背后的机制与心智模型 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| 本层四主题页 | L1 | [prompt](prompt.md) · [context](context.md) · [structured-output](structured-output.md) · [tool-calling](tool-calling.md) | 契约主路径 | — | 按序读 |
| OpenAI / Anthropic 提示指南 | L1 | 见上表 Beginner 行 | 官方表达技巧 | 角色层级 / prompt-as-code | 下钻各主题 |
| OpenAI Structured Outputs | L1 | https://developers.openai.com/api/docs/guides/structured-outputs | 输出合同官方口径 | strict 三档 / refusal / 支持子集 | 接真 API |
| Anthropic Structured outputs | L1 | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | 同上（Anthropic 口径） | output_format / strict 工具 / beta 头 | 同上 |
| Anthropic Tool use | L1 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | 动作合同官方口径 | 五步流 / 配对 / stop_reason | 同上 |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 输入策展心智模型 | 注意力预算 / JIT / compaction | 读原文 |
| Learn LLM 第 15 章 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | 机制层桥接 | 四段式 / JSON 三档 / 记忆 | 要「为什么」时读 |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- 本层结论建立在 2026-09-01 检索的两家官方文档上；厂商支持子集（如 OpenAI 对 `pattern` 的支持）持续漂移，复核周期建议 ≤ 6 个月。
- 「四契约」是本仓的教学切分，厂商文档按功能页组织（如 Anthropic 把 JSON outputs 与 strict tool use 合称 structured outputs）——切分服务于验收，不是行业标准。
- 未决：约束解码对输出质量（不仅是形状）的影响方向，公开证据不足，不下结论。

### learn-ai 到此为止 / 继续去哪

- 单请求契约闭环已验收，要做流式 / 可取消 / 多轮产品交互 → [model-api](../02-integration/model-api.md)（层 2）。
- 输出需要私有或新鲜事实支撑 → [rag](../03-grounding/rag.md)（层 3）。
- 动作要安全执行、跨边界协作 → [tool-execution](../04-action/tool-execution.md)（层 4）。
- 契约质量要变成发布证据 → [evaluation](../05-operations/evaluation.md)（层 5，桥接 evals.zenheart.site）。
