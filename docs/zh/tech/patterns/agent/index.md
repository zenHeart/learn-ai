---
title: 什么时候上 Agent
description: "Agent 是「工具 + 循环 + 停止条件」。先会工具调用，再谈模式。机制见 Learn LLM 第 13、16、21 章。"
domain: tech
tags:
  - agent
listed: false
outline: [2, 3]
pageClass: catalog-page
llm:
  - 13
  - 16
  - 21
---

# 什么时候上 Agent

**结论**：只有需要 **多步、调工具、改仓库** 时才上 Agent。单轮问答用提示；查自家文档用 RAG。

> 手写 loop、typed tools、HITL、LangGraph、多 Agent 见 Learn LLM [第 13](https://llm.zenheart.site/chapters/13-agent-tools)、[16](https://llm.zenheart.site/chapters/16-langgraph)、[21 章](https://llm.zenheart.site/chapters/21-multi-agent)。本页只帮你决定上不上、上了读哪。

## 概念

Agent = 模型在一个循环里 **选工具 → 看结果 → 再决定**，直到成功标准或停止条件。

| | 聊天 | RAG | Agent |
|---|---|---|---|
| 做什么 | 说话 | 按资料回答 | **做事** |
| 你要写的 | 提示 | 检索 + 引用 | 工具 schema + 停止条件 |
| 何时用 | 解释、草稿 | 必须基于文档 | 改文件、下单、开 issue |

不是「更聪明的聊天」。循环会花钱、会做错。没有停止条件就不要上。

## 这一栏怎么读

```
本页（先决定上不上）
  → 1. 工具调用          模型怎么提出「请执行」
  → 2. 设计模式          单工具 / 工作流 / 编排
  → 3. 工作流            固定步骤不要装成自主 Agent
  → 4. 工程模式          Willison：loop + 验证
  → 附录                 Hooks、高级工具、多 Agent、课程
```

| 你卡在哪 | 读什么 |
|---|---|
| 还不会让模型调一个函数 | [工具调用](/zh/integration/protocols/tool-calling) |
| 不知道选工作流还是 Agent | [设计模式](/zh/tech/agent/agent-design-patterns) |
| 步骤其实是固定的 | [工作流](/zh/tech/patterns/agent/workflow-patterns) |
| 已经在跑编码助手，要工程纪律 | [Willison 工程模式](/zh/tech/prompt/agentic-engineering-patterns) |
| 工具定义把窗口吃光 | [高级工具使用](/zh/tech/prompt/advanced-tool-use) |
| 要可复用说明书，不是循环 | [Skills](/zh/tech/skills/) |
| 要接外部系统 | [MCP](/zh/tech/mcp/) |

## 工程上最小的循环

```ts
type Tool = { name: string; run: (args: unknown) => Promise<string> }

export async function runAgent(
  complete: (messages: unknown[]) => Promise<{ tool?: { name: string; args: unknown }; text?: string }>,
  tools: Record<string, Tool>,
  goal: string,
  maxSteps = 8
) {
  const messages: unknown[] = [{ role: 'user', content: goal }]
  for (let i = 0; i < maxSteps; i++) {
    const turn = await complete(messages)
    if (turn.text && !turn.tool) return turn.text
    if (!turn.tool || !tools[turn.tool.name]) {
      throw new Error(`unknown or missing tool: ${turn.tool?.name}`)
    }
    const result = await tools[turn.tool.name].run(turn.tool.args)
    messages.push(turn, { role: 'tool', name: turn.tool.name, content: result })
  }
  throw new Error(`stopped after ${maxSteps} steps`)
}
```

成功标准写进提示；步数上限写进代码。两样都没有就不要上线。

## 常见陷阱

- 把 RAG 叫 Agent。检索不是循环。
- 没有停止条件，模型为了「更全面」一直搜。
- 步骤固定却上自主 Agent。用工作流。
- 一上来多 Agent。先让一个循环 + 两个工具跑绿。

## 下一步

[工具调用](/zh/integration/protocols/tool-calling) → [设计模式](/zh/tech/agent/agent-design-patterns)。要说明书不循环 → [Skills](/zh/tech/skills/)。
