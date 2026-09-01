---
title: MCP
description: "MCP 用来接外部系统。先接一个会用的服务器，再谈协议细节。"
domain: tech
tags:
  - mcp
listed: false
outline: [2, 3]
pageClass: catalog-page
llm:
  - 13
---

# MCP

**结论**：MCP 是给助手接 **外部系统** 的协议（浏览器、文档、工单）。先接一个你每周都用的服务器，再读协议课。

> 工具 schema、权限、HITL 见 Learn LLM [第 13 章](https://llm.zenheart.site/chapters/13-agent-tools)。本栏只排怎么接到日常工具。

## 这一栏怎么读

```
本页
  → 1. Chrome DevTools MCP     先有一个能摸的服务器
  → 2. MCP 课程笔记            协议、传输、鉴权
  → 附录 · MCP Apps            做应用时再读
```

不要一次挂五个服务器。工具定义会先把窗口吃光，见 [上下文工程](/zh/tech/fundamentals/context-engineering)。

## 和 Skills 的差别

- **MCP**：连出去（数据、浏览器、工单）。
- **Skill**：教助手「连上之后按什么步骤做」。

两者常一起用，不要互相替代。

## 下一步

[Chrome DevTools MCP](/zh/tech/mcp/chrome-devtools-mcp) → [MCP 课程](/zh/tech/mcp/mcp-course-notes)。协议对照也可看 [集成 · MCP](/zh/integration/protocols/mcp/)。
