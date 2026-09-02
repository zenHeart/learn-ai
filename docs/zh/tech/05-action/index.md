---
title: 行动组导览
description: 从「读世界」跨到「写世界」的原语层：工具调用契约与工具执行工程——动作如何被描述、被校验、被安全地执行。
domain: tech
tags: [tech, action, navigation]
navOrder: 49
topicId: action-guide
layer: "5"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: []
next: [tool-calling, tool-execution]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 行动组导览

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
