---
title: Hello Agents（DataWhale）
description: DataWhale 开源 Agent 教程的学习笔记：Agent 基础组件、框架、工具设计与 Memory 管理策略的入门路线。
domain: tech
tags: [tech, course-notes, legacy, agent]
navOrder: 80
topicId: course-notes-hello-agents
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Hello Agents（DataWhale）

> 来源：[DataWhale Hello Agents](https://datawhalechina.github.io/hello-agents/#/)，开源 Agent 学习教程

## 简介

Hello Agents 是 DataWhale 出品的 Agent 教程，从零开始覆盖 Agent 概念、架构与实践：基础概念 → 框架学习 → 工具设计 → 项目实战。

## 核心内容模块

**1. Agent 基础**：Agent 是利用大语言模型进行推理、规划和执行动作的系统。关键组件——Planning（任务分解与规划）、Memory（记忆管理）、Tools（工具调用）、Action（执行动作）。

**2. 主流框架**：LangChain、AutoGPT、LlamaIndex 等开源框架。

**3. 工具设计**：工具是 Agent 与外部世界交互的桥梁。好的工具设计需要清晰描述、合理参数、明确返回值格式。

**4. Memory 管理**：

- 短窗口记忆：直接放入上下文
- 长期记忆：向量数据库或文件存储
- 混合策略：分层记忆管理

**5. 项目实战**：理论与实践结合。

## 学习建议

1. 先理解概念：Agent 核心是 LLM + 工具 + 规划能力
2. 多动手实践：看源码、改代码、做实验
3. 关注工具设计：工具质量直接影响 Agent 效果
4. 理解 Memory：上下文管理是 Agent 工程的关键难点

## 与主线的关系

本笔记的组件分解与 Memory 策略已展开为主线 [Agent 运行时](../../04-action/agent-runtime/)与 [Agent 状态与记忆](../../04-action/agent-runtime/state-memory)；本页保留为课程出处与入门路线索引。

> 注：本笔记基于 Hello Agents 教程大纲整理，具体内容请参考[官方教程](https://datawhalechina.github.io/hello-agents/#/)。
