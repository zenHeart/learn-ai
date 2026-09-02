---
title: AI 编码工具案例
description: 产品级案例：Cursor IDE 架构剖析、Cursor Rules 实践与 GitHub Copilot 系统提示摘录——工程通用部分已并入主线 canonical。
domain: tech
tags: [tech, ai-coding, case, index]
navOrder: 93
topicId: ai-coding-legacy
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# AI 编码工具案例

**本区是什么**：AI 编码工具的产品案例。拆解「一个 AI IDE / 编码助手内部是怎么工作的」，用于理解产品设计选择；工程通用部分（上下文注入、跨工具上下文共享、规则即资产）已并入主线 canonical，本区只保留产品叙事。

## 案例

| 案例 | 回答的问题 | 已合入主线 |
| --- | --- | --- |
| [Cursor IDE 工作原理](./cursor-ide-architecture) | AI IDE 的内部机制：从补全到代理、系统提示设计、优化技巧 | [上下文工程](/zh/tech/03-context/context-engineering)、[工具执行工程](/zh/tech/05-action/tool-execution) |
| [Cursor Rules 实践](./cursor-rules) | 项目级 AI 行为规范：Rule Type、内容结构、渐进完善 | [上下文工程](/zh/tech/03-context/context-engineering)（AGENTS.md/规则注入）、[Agent Skills](/zh/tech/06-agent-systems/skills) |
| [Copilot 系统提示摘录](./copilot) | 一个生产级编码助手的系统提示长什么样（查阅页） | [提示词工程](/zh/tech/03-context/prompt) |

语言侧说明：三个案例正文均在中文侧（ZH only）；英文侧本表为占位导航。

## 阅读姿势

- 把案例当「产品怎么用主线机制」的证据读：Cursor 的 `@file` 注入是上下文工程的产品化，Rules 是规则资产的产品化。
- 具体产品的命令、参数、套餐以厂商文档为准（归 Products 区），本区不维护。
