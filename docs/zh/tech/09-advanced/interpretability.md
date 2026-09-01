---
title: 可解释性（桥接）
description: 模型内部为什么这样输出——机制可解释性（superposition、特征、归因图）全部桥接 Learn LLM；本仓只保留应用工程师的位置感：它影响信任边界、审计承诺与「为什么这么说」的排障预期。
domain: tech
tags: [tech, interpretability, bridge, safety]
navOrder: 91
topicId: interpretability
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

# 可解释性（桥接）

> **桥接页**：机制可解释性（mechanistic interpretability）——superposition、稀疏自编码器、特征分解、归因图——的推导与实验在 [Learn LLM](https://llm.zenheart.site/)（第 7 章 · Transformer 的内部机制部分）。本仓只回答应用工程师的问题：**它改变我的哪个决策，以及什么时候我需要的其实不是它。**

## 1. 概述

**解决什么问题**：模型是黑箱——你能观测输入与输出，但「它为什么这么说」藏在中间层。可解释性研究把中间层打开：把激活分解为可读的「特征」（features），再追踪特征之间的因果链（归因图），试图把「为什么」变成可检查的证据。

**为什么应用工程师要有位置感**：你不是要去拆模型，而是要管理三类由黑箱引起的工程责任：

- **信任边界**：多深的行为保证你敢对外承诺？「我们说不清它为什么拒绝/不拒绝」在高风险场景是合规缺口，不是学术问题。
- **排障预期**：应用层手段（评估、trace、消融）只能回答「行为变了没有」；「模型内部为什么这样」超出应用层工具箱——知道这条边界，就不会在错误的层上浪费时间。
- **叙事校准**：归因图展示的「规划」「隐藏目标」是研究工具的产物；对外沟通时把它当证据框架而不是「模型有意识」的证明。

## 2. 使用

它影响的决策（不涉及代码，涉及立场）：

| 决策 | 可解释性给的位置感 |
| --- | --- |
| 高风险场景的模型选型 | 黑箱深度是选型成本之一：越说不清行为来源，越需要外部护栏（评估门、人工复核）补位 |
| 对客户/监管的审计承诺 | 只承诺应用层可证明的东西（trace、评估记录）；「内部机制可解释」目前是研究前沿，不是可交付物 |
| 「为什么输出这个」的排障 | 先走应用层：trace 与上下文对账（→[可观测性](../08-production/observability)）、输入消融、评估集对比；全部指向「模型就是这样」时才是本区 |
| 产品文案与心智模型 | 「特征」「回路」是研究词汇；产品语境用行为合同（schema、验收）说话 |

## 3. 原理

（本段刻意极简：推导与实验归 Learn LLM 第 7 章。）

一句话链路：神经元同时编码多个概念（superposition，叠加）→ 用字典学习/稀疏自编码器把激活分解为单义「特征」→ 追踪特征间因果得到归因图。这是研究路线，不是应用 API——**应用工程师没有可直接调用的「explain()」**。

## 4. 开发

**症状 → 去哪**：

- 「输出不稳定」→ 不是本区，去 [03-context](../03-context/)（契约收敛自由度）。
- 「这次回答为什么错」→ 先 [可观测性](../08-production/observability)（trace 还原上下文）与 [评估](../08-production/evaluation)（行为边界），多数「为什么」其实是上下文问题。
- 「我们要向监管证明模型安全」→ [08-production](../08-production/) 的证据链；可解释性作为研究背景了解，不作为承诺。
- 确实想读懂内部机制 → Learn LLM 第 7 章（Transformer 内部机制）。

## 5. 资料库

### 本区页面

| 页面 | 主题 |
| --- | --- |
| [推理模型与 TTC](reasoning-ttc.md) | 思考型输出的预算、延迟与停止条件 |
| [MoE 与前沿架构](moe-frontier.md) | 定价/速度/上下文上限的架构解释 |
| [多模态](multimodal.md) | 视觉等跨模态能力的最小用法与边界 |

一手源（研究方原发表，不复述内容）：

| 名称 | 来源 | 标识 |
| --- | --- | --- |
| Toy Models of Superposition | Anthropic（Transformer Circuits） | arXiv:2209.10652 |
| Sparse Autoencoders Find Highly Interpretable Model Directions | Cunningham et al. | arXiv:2309.08600 |
| Towards Monosemanticity | Anthropic（Transformer Circuits） | https://transformer-circuits.pub/2023/monosemantic-features/index.html |
| On the Biology of a Large Language Model（归因图） | Anthropic（Transformer Circuits，2025-03） | https://transformer-circuits.pub/2025/attribution-graphs/biology.html |

（retrievedAt 2026-09-01；后续进展以 Transformer Circuits 与各实验室发表为准，本仓不维护快照。）

### learn-ai 到此为止 / 继续去哪

- 特征分解、归因图方法与实验：[Learn LLM](https://llm.zenheart.site/) 第 7 章（Transformer 内部机制）。
- 应用侧真正可落地的「为什么」工具：trace 与评估（[08-production](../08-production/)）。
