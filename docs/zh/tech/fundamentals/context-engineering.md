---
title: 上下文工程（怎么往窗口里塞）
description: "窗口是预算。本页只写往里塞什么、丢掉什么。机制见 Learn LLM 第 15 章。"
domain: tech
tags:
  - fundamentals
llm:
  - 15
  - 11
---

# 上下文工程（怎么往窗口里塞）

**结论**：提示写清之后，质量差往往是窗口里塞错了东西。系统提示、工具定义、检索片段、聊天记录抢同一份 token。

> **概念。** Prompt 是规则怎么写；上下文工程是这一轮窗口里留什么。记忆四模式、按 tool-unit 截断见 Learn LLM [第 15 章 A5](https://llm.zenheart.site/chapters/15-prompt-memory)。完整「预算 / 压缩 / 多轮状态」实验见 [learn-llm#1](https://github.com/zenHeart/learn-llm/issues/1)。
>
> 官方工程笔记：[Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)。

## 工程上你要做的三件事

1. **稳定前缀放前面。** 系统提示、工具 schema、few-shot 尽量不改，才能吃到 prompt cache。每轮变化的用户输入和检索结果放后面。
2. **不要一次挂上所有 MCP 工具。** 五个服务器的工具定义就能吃掉数万 token。只开这一任务用得上的；其余按需发现。
3. **超窗先裁工具配对，再裁旧闲聊。** 直接 `messages.slice(-N)` 会切断 tool call / tool result，下一轮请求直接 400。实现细节回第 15 章。

## 编码助手里

| 要做 | 不要做 |
|---|---|
| `@` 点名文件，而不是「看看整个仓库」 | 把整份设计文档贴进每一轮 |
| 长文放上面，问题放下面；先引用再改 | 把 AGENTS.md 写成第二份百科 |
| 用检索 / grep，而不是把日志全贴进去 | 同时开十个 MCP 服务器「以备不时之需」 |

## 产品里

| 要做 | 不要做 |
|---|---|
| 检索只回 top-k，并带来源 | 把向量库全表拼进 prompt |
| 系统提示当代码版本化 | 把用户原文和规则揉在一段 |
| 超窗用明确策略（裁 / 摘要 / 记忆检索） | 静默丢最前面的系统提示 |

接到检索 → [RAG](/zh/tech/patterns/RAG)。接到助手规矩 → [AGENTS.md](/zh/tech/prompt/agents-doc)。
