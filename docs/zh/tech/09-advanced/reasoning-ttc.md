---
title: 推理模型与 Test-Time Compute（桥接）
description: 「让模型多想一会儿」是与模型规模并列的性能轴——本页给应用工程师位置感：思考与行动是两种消耗（何时用推理模型、何时用 agent 循环）、延迟结构、计费与停止条件；训练侧原理桥接 Learn LLM。
domain: tech
tags: [tech, reasoning, test-time-compute, bridge]
navOrder: 92
topicId: reasoning-ttc
layer: "9"
status: bridge
nodeType: boundary
owner: learn-ai
externalOwners:
  - site: llm
    url: https://llm.zenheart.site/
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 推理模型与 Test-Time Compute（桥接）

> **桥接页**：推理模型（o1/R1 一系）的训练方法——长思维链 RL、GRPO、可验证奖励——的推导在 [Learn LLM](https://llm.zenheart.site/)（第 10 章 · 后训练；推理侧预算见第 9 章）。本仓只保留应用侧的位置感：**它是一种新的消耗品，你要决定何时买、买多少、怎么停。**

## 1. 概述

**解决什么问题**：传统缩放把钱花在训练侧（更大模型）；test-time compute 把钱花在推理侧——重复采样、搜索、更长的思考链——换取单次请求更高的质量。推理模型把这条轴产品化：同一个模型，想得越久（推理 token 越多），平均质量越高。

**为什么应用工程师要有位置感**：这不是「换个更强的模型」，而是多了一个**运行时可调的预算参数**。它直接改变三件事：模型选型的权衡空间（小模型多想 vs 大模型直答）、单位成本结构（按思考量计费）、产品交互契约（延迟与停止条件）。

## 2. 使用

### 思考与行动是两种消耗

推理模型的「思考」（模型内部延长推理）与 agent 的「行动循环」（调用工具、观测、再决策）是**两种不同的质量提升手段**，都花推理预算，但不可互换：

| 手段 | 花在哪 | 擅长 | 不擅长 |
| --- | --- | --- | --- |
| 思考（reasoning / TTC） | 单次调用内的推理 token | 可在「脑内」完成的问题：数学、规划、代码逻辑、多约束权衡 | 需要新事实（→检索）或需要改变外部状态（→工具） |
| 行动循环（agent loop） | 多次调用 + 工具执行 | 需要与外部世界交互：查数据、改系统、长流程 | 纯封闭推理题上比思考更贵更慢 |

选型顺序：**能一次想清楚的不起循环；需要新信息或副作用的循环不能被思考替代**。两者也可组合（每步行动前短思考），但每层都要有独立预算与停止条件。

### 对产品的三个直接影响

1. **延迟结构**：思考时间随难度波动且可能很长——首字时间（TTFT）不再可控。交互设计要么改为「思考中」的显式状态，要么给思考设上限。
2. **计费**：推理 token 是真实成本项，且用量由模型自己决定——成本从「按请求计」变成「按请求 × 思考量计」，预算熔断（→[成本与性能](../08-production/cost-performance)）从可选变必选。
3. **停止条件**：何时切断思考是产品决策——超时、token 上限、或预算强制（budget forcing）类机制。没有停止条件的思考型调用在异常输入上会失控烧钱。

## 3. 原理

（本段刻意极简：训练与缩放律推导归 Learn LLM。）

一句话路线：重复采样可提升覆盖率（采样越多、命中的问题越多，但有验证器才兑现）→ 按难度分配推理预算优于均匀分配 → RL 训练出「内化了的长思考」（o1/R1 一系）→ 思考长度成为可外部干预的控制量。深水区：Learn LLM 第 10 章（后训练/RL）、第 9 章（推理与预算）。

## 4. 开发

**症状 → 去哪**：

- 「延迟方差大、偶发超长响应」→ 本区立场：给思考设停止条件；工程落点在[成本与性能](../08-production/cost-performance)的熔断与预算。
- 「模型单步老出错，想让它多想」→ 先确认错误类型：封闭推理题用推理模型/高思考预算；缺事实去 [04-grounding](../04-grounding/)；要执行去 [05-action](../05-action/tool-calling)。
- 「agent 每步都开最大思考，成本爆炸」→ 分层预算：规划步高预算、执行步低预算——落点在 [06-agent-systems](../06-agent-systems/agent-runtime) 的运行时配置。
- 想懂 RL 怎么造出推理行为 → Learn LLM 第 10 章。

## 5. 资料库

一手源（只引编号，不复述内容）：

| 名称 | 来源 | 标识 |
| --- | --- | --- |
| Large Language Monkeys（重复采样缩放） | Stanford / Google DeepMind | arXiv:2407.21787 |
| Scaling LLM Test-Time Compute Optimally | UC Berkeley / Google DeepMind | arXiv:2408.03314 |
| DeepSeek-R1（纯 RL 激发推理） | DeepSeek-AI | arXiv:2501.12948 |
| s1: Simple test-time scaling（budget forcing） | Stanford / UW 等 | arXiv:2501.19393 |

（retrievedAt 2026-09-01；各厂商推理模型的当前参数与定价以其官方文档实时为准。）

### learn-ai 到此为止 / 继续去哪

- 长思维链 RL、GRPO、推理缩放律：[Learn LLM](https://llm.zenheart.site/) 第 10 章（后训练）。
- 推理预算与延迟的工程收口：[成本与性能](../08-production/cost-performance)、[部署与发布](../08-production/deployment)。
