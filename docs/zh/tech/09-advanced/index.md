---
title: 进阶组导览
description: 前沿边界的四张桥接卡：可解释性、推理与测试时计算、MoE 与新架构、多模态——只讲定位与决策影响，推导全部外包给 Learn LLM。
domain: tech
tags: [tech, advanced, bridge, navigation]
navOrder: 90
topicId: advanced-guide
layer: "9"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: []
next: [interpretability, reasoning-ttc, moe-frontier, multimodal]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 进阶组导览

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
