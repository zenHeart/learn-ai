---
title: LLM 心智模型（桥接）
description: LLM 是参数化条件概率模型、逐 token 预测下一个词——这一个心智模型决定 prompt 的真实作用、context 为何是硬约束、temperature 为何不是创造力旋钮；推导与实现归 Learn LLM。
domain: tech
tags: [tech, model-lifecycle, bridge, mental-model]
navOrder: 11
topicId: llm-mental-model
layer: "1"
status: bridge
nodeType: concept
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/04-probabilistic-lm"
prerequisites: [model-lifecycle-bridge]
next: [architecture]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **在哪一组**：组 01 · 模型生命周期（桥接组）｜ **上一组出口**：能判断知识归属、并为需求选出最低复杂度方案（00-map 组） ｜ **本页出口**：能用「参数化条件概率模型」解释 prompt、context 与 temperature 的真实作用，并对幻觉建立正确预期
> **前置**：[模型生命周期（组导览）](./index) ｜ **下一步**：[模型架构（桥接）](architecture.md)

## 1. 概述

**结论先讲**：大语言模型（LLM）是一个**参数化条件概率模型**——用海量文本训练出一组权重，给定前文 token 序列，输出下一个 token 的概率分布，采样后循环生成。这个定义不是学术装饰：你对 prompt 策略、上下文预算、幻觉与模型选型的每一个工程判断，都是这个定义的推论。本页只建立这个心智模型并说明它影响哪些决策；概率语言模型的手写实现与损失函数推导归 [Learn LLM 第 4 章](https://llm.zenheart.site/chapters/04-probabilistic-lm)。

### 三个直接推论

1. **Prompt 是调用能力，不是注入知识**。模型的能力在训练时固化进权重；prompt 决定激活哪些能力、以什么格式输出。想让模型「知道」训练数据里没有的事实，唯一可靠通道是把事实放进上下文（[03-context 组](../03-context/)）或检索（[RAG](../04-grounding/rag.md)），而不是在指令里反复强调。
2. **Context window 是硬约束**。模型只能条件于当前上下文内的 token；超出窗口的内容不存在「被记住」，会话历史必须由你显式携带并为此付费。上下文工程因此是一门取舍学科，不是「尽量塞满」。
3. **Temperature 是采样参数，不是创造力旋钮**。它调整下一个 token 采样分布的平坦程度：低温偏向高概率 token（更稳定），高温更随机（更多样）。它改变输出的分布形状，不能让模型产出超出权重能力的正确答案——用它修不了能力问题。

### 三个常见误解勘误

| 误解 | 更正 |
| --- | --- |
| LLM = ChatGPT | ChatGPT 是产品：LLM + 后训练 + 系统提示 + 工具与界面包装；同一模型在不同产品里行为不同 |
| LLM = RAG | RAG 是应用层的检索模式，模型本身不检索；两者常组合但相互正交 |
| LLM = Agent | Agent 是调用模型的编排循环（规划-行动-观察）；模型只是循环里的推理部件 |

这三条的分界线详见[站点边界](../00-map/site-boundaries.md)；Agent 编排归 06-agent-systems 组。

## 2. 何时跳转

本页无可运行产物；替代动作是按下表把症状路由到正确的 owner：

| 症状 / 问题 | 该读哪 | 为什么 |
| --- | --- | --- |
| 想理解「预测下一个词」的数学、loss 是什么 | Learn LLM [第 4 章](https://llm.zenheart.site/chapters/04-probabilistic-lm) | 条件概率语言模型的 canonical 推导 |
| token 是什么、为什么按 token 计费 | Learn LLM [第 5 章](https://llm.zenheart.site/chapters/05-bpe) | BPE 分词的从零实现 |
| temperature / top-p 怎么调 | 本仓 [提示词工程](../03-context/prompt.md) | 应用层参数策略归本仓 |
| 模型不肯稳定输出 JSON | 本仓 [结构化输出](../02-inference-interface/structured-output.md) | 是接口契约问题，不是模型理解问题 |
| 模型「不知道」训练后新出现的事实 | 本仓 [RAG](../04-grounding/rag.md) | 知识缺失走检索，不走 prompt |

## 3. 原理

一段定位：LLM 的训练目标是最大化训练语料上下一 token 的似然；能力是从数据分布与规模中涌现的统计规律，而不是被逐条写入的规则。工程师视角所需的全部原理到此为止——交叉熵、采样策略、从 Bigram 到 Transformer 的演进链，Learn LLM 第 4–5 章有从零手写的完整推导（retrievedAt 2026-09-01），本仓不复制第二份。

## 4. 工程决策影响

| 工程决策 | 由心智模型推出的判断 | 错误预期会付出的代价 |
| --- | --- | --- |
| 模型选型 | 能力固化在权重里；同家族不同规格 = 能力-成本曲线上不同的点，按任务分级选型 | 用最大模型做全部任务，账单失控 |
| Prompt 策略 | 指令用于调用与格式化已有能力；事实进上下文 | 把知识写进长指令：不稳定、不可更新、按 token 重复计费 |
| 上下文预算 | 上下文是唯一输入通道且计费；历史要裁剪与摘要 | 无脑拼接会话历史，成本与延迟随之恶化 |
| 幻觉预期 | 概率模型可能生成流畅但不为真的续写；这是机制的产物，只能管控、不能「提示掉」 | 指望一句「请不要编造」替代 grounding 与评估 |
| 输出稳定性 | temperature 影响分布形状，不影响能力上限 | 调温修格式问题（正确解：结构化输出或改 prompt） |

维护规则（替代 runbook）：Learn LLM 第 4/5 章结构调整时重验本页 deep-link 并更新 `lastVerified`；本仓侧新增应用决策主题时只在上表加一行，不扩写原理。

## 5. 资料库

四级阅读路线：

| 级 | 读什么 | 为什么是这个顺序 |
| --- | --- | --- |
| Beginner | 本页 + [组导览](./index) | 先建立两条链与一个心智模型 |
| Builder | 本仓 [提示词工程](../03-context/prompt.md) + [结构化输出](../02-inference-interface/structured-output.md) | 把心智模型落成接口契约 |
| Operator | [RAG](../04-grounding/rag.md) + [评估](../08-production/evaluation.md) | 用 grounding 与评估管控幻觉 |
| Researcher | Learn LLM 第 4–5 章 + GPT-3 论文 | 下沉到概率模型与 in-context learning 的原始论述 |

### 资源表

| 名称 | 层级 | canonical URL | 支持的断言 | 下一步 |
| --- | --- | --- | --- | --- |
| Learn LLM 第 4 章 · 字符语言模型 | E | https://llm.zenheart.site/chapters/04-probabilistic-lm | 条件概率与采样是 LLM 的核心机制 | 手写 Bigram → MLP |
| Learn LLM 第 5 章 · BPE | E | https://llm.zenheart.site/chapters/05-bpe | token 是计费与上下文的计量单位 | 理解 token 成本结构 |
| Learn LLM 第 15 章 · Prompt 与记忆 | E | https://llm.zenheart.site/chapters/15-prompt-memory | 应用侧 prompt 策略的系统论述 | 对照本仓 03-context 组 |
| GPT-3 论文（Language Models are Few-Shot Learners） | L4 | https://arxiv.org/abs/2005.14165 | prompt 调用预训练能力的原始证据（in-context learning） | 读 few-shot 各节 |

（Learn LLM 章节经其章节目录核验、arXiv 链接为稳定 abs 地址，retrievedAt 均为 2026-09-01。）

### 主动证伪与未决问题

- 证伪入口：如果你发现某工程判断必须依赖采样数学或损失函数细节（如自实现约束解码），它属于 Learn LLM 或本仓 02-inference-interface 组，不是本页——请把断言下沉到正确 owner，不要在此扩写。
- 未决：「ChatGPT 产品构成」勘误中的系统提示与工具包装细节随厂商迭代漂移，未逐项核验；只作方向性勘误使用。

### learn-ai 到此为止 / 继续去哪

- 概率语言模型的推导与实现：Learn LLM [第 4 章](https://llm.zenheart.site/chapters/04-probabilistic-lm)——本仓到此为止。
- 用这个心智模型造接口：本仓 [02-inference-interface 组](../02-inference-interface/)。
- 组内下一页：[模型架构（桥接）](architecture.md)。
