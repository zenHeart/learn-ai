---
title: PEFT（桥接）
description: 参数高效微调（LoRA/QLoRA）的工程决策桥：如何把「必须动权重」的成本降一个量级，适配器架构对部署形态的影响。
domain: tech
tags: [tech, training, bridge, peft, lora]
navOrder: 143
topicId: model-lifecycle-peft
layer: "1"
status: bridge
nodeType: boundary
owner: learn-ai
externalOwners:
  - site: llm
    url: https://llm.zenheart.site/
lastVerified: "2026-09-01"
listed: true
---

# PEFT（桥接）

> **桥接页**：本页只回答工程决策问题。LoRA 的低秩分解数学、QLoRA 的量化组合推导在 [Learn LLM](https://llm.zenheart.site/)（LoRA 对应章节）。

## 解决什么问题

**参数高效微调（Parameter-Efficient Fine-Tuning, PEFT）**是一族技术：冻结预训练模型的全量参数，只在旁边加一小块可训练参数（最流行的是 **LoRA，Low-Rank Adaptation**——把「对权重的修改」分解成两个低秩矩阵来学）。效果是把 SFT 的成本结构改变一个量级：

- **硬件门槛降低**：消费级/单卡 GPU 可跑（对比全量微调的集群需求）。
- **产物变小**：训练产出是 MB 级「适配器」文件，而不是 GB 级的完整模型副本。
- **一底座多适配器**：服务端可共享同一个基础模型，按请求热切换不同任务的适配器——多租户定制的标准形态。

一个便于记忆的类比（非严格）：全量微调是重写整本书；LoRA 是把修改写在便利贴上贴到对应页面，阅读时「原文 + 便利贴」一起生效。

## 何时进入本页

PEFT 不是独立决策，它是 [SFT（桥接）](sft.md) 决策的**降成本执行方式**。触发条件与 SFT 相同（prompt 与 RAG 已穷尽、有标注数据、有预算），额外多两类典型场景：

1. **需要 many-variants**：同一底座要出多个定制版本（按客户、按任务），全量微调每个变体的成本不可接受。
2. **本地/隐私部署**：在自有硬件上跑微调后的开源模型（Llama、Mistral 等），数据不出域。

## 决策影响表

| 维度 | 全量 SFT | PEFT（LoRA/QLoRA） |
| --- | --- | --- |
| **数据量要求** | 同等量级的标注对（数据成本不变，未验证具体阈值） | 同左——PEFT 省的是算力，不是数据 |
| **成本结构** | 每次训练产出完整模型副本，存储与分发贵 | 训练算力与存储显著降低（量级对比是社区共识，具体倍数未验证） |
| **推理延迟** | 与原模型同级 | 底座 + 适配器合并后基本同级；注意部分托管 API 不支持外挂适配器 |
| **维护负担** | 每个定制版一个完整模型，版本矩阵大 | 底座版本 + 适配器矩阵；底座升级需回归每个适配器 |
| **效果上限** | 理论上限最高 | 绝大多数定制任务够用；极端领域迁移仍可能需要全量 |

## 与本地推理的连接

如果你用 Ollama、LM Studio 等工具在本地跑模型，你已经在消费这条链路的产物——「量化模型」与「LoRA 适配器」是本地能跑大模型的两个关键前提。端侧/浏览器侧推理的展开见主线 [浏览器与端侧推理](../../02-inference-interface/browser-edge)；量化数学归 Learn LLM。

## LoRA 的工程选择项

决定「用 LoRA」之后还有三个工程选择，它们的推导都在 Learn LLM，此处只列决策含义：

- **秩（rank）**：控制「便利贴」的表达能力。秩越高能力越强、成本越高；常见做法是从小秩起步，用评估集决定是否上调（具体推荐值未验证，以实验为准）。
- **挂载层**：只挂在注意力层还是全连接层也挂，影响效果与成本的平衡。
- **QLoRA**：先量化底座再做 LoRA 的组合拳——显存需求进一步下降，代价是训练与推理多一层量化误差。显存不够时的默认升级路径，不是效果更优的选择。

这三个选择的共同点：**都应由评估集驱动**，而不是照抄别人的配置——「别人的秩」是在别人的数据与任务上调出来的。

## 深层推导与实现

- LoRA 低秩分解的数学、秩选择、QLoRA 的量化组合 → [Learn LLM](https://llm.zenheart.site/) 的 LoRA 章节。
- 原始论文：[LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)；实现库：[HuggingFace PEFT](https://github.com/huggingface/peft)。
