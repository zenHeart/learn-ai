---
title: Agent 系统组导览
description: 从单次动作到自治闭环：心智模型、设计模式、状态与恢复、控制面与规模化的十页导航。
domain: tech
tags: [tech, agent-systems, navigation]
navOrder: 59
topicId: agent-systems-guide
layer: "6"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: [tool-execution]
next: [agent-runtime, workflow, recovery-hitl]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Agent 系统组导览

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
