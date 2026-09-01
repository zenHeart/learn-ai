---
title: 技术
description: 先会说话，再会查资料，再会让模型动手。从 LLM / 提示 / 上下文拆下去。
domain: tech
tags:
  - tech
listed: false
outline: [2, 3]
pageClass: catalog-page
---

# 技术

**结论先讲**：前端工程师用 AI，不是先训模型。顺序是——

1. 会跟模型说话（提示 + 上下文）  
2. 会把模型接到自己的应用（API / 流式 UI）  
3. 会让它查你的资料（RAG）  
4. 会让它动手（工具 / Agent / Skill / MCP）  
5. 最后才谈评估、成本和要不要微调  

这和 [Cursor 学习导航](/zh/products/cursor/) 同一套：先全景，再按任务拆。左侧侧栏按这个顺序排。

**不是**：某个产品的逐步点击（去 [产品](/zh/products/)），也不是 Transformer 内部推导（去 [Learn LLM](https://llm.zenheart.site/)）。

## 一张图：你现在卡在哪

```
我要解决什么？
├── 模型到底吃什么、记住什么          → 基础（LLM / 上下文 / Embeddings）
├── 提示写不清楚、输出不稳            → Prompt
├── 要在 React / Vue 里接上模型        → 集成（API / SDK / 流式）
├── 回答必须基于我们自己的文档        → RAG
├── 要它改文件、调工具、走多步        → Agent / Skills / MCP
└── 要上线、要测、要控账单            → 工程与评估
```

## 1. 基础：模型看见什么

先建立三块词汇，后面所有页都用它们。

| 概念 | 你当什么用 | 页 |
|---|---|---|
| LLM | 一个吃文本、吐文本的 API | [LLM 基础](/zh/tech/fundamentals/LLM) |
| 上下文窗口 | 这一轮它能看见的字数上限 | [上下文窗口](/zh/tech/fundamentals/context) |
| Embeddings | 把句子变成可比较的向量 | [Embeddings](/zh/tech/fundamentals/embeddings) |
| 上下文工程 | 往窗口里塞什么、丢掉什么 | [上下文工程](/zh/tech/fundamentals/context-engineering) |

机制（注意力、训练、记忆）见 Learn LLM；本栏只建立概念，然后接到工程和工具。

## 2. 怎么写：Prompt

会用工具之后，质量差几乎都是提示和上下文没写清。这一栏是一条路径，不是合集。

1. [地图 · 怎么写](/zh/tech/prompt/)：20 分钟主课（任务 / 约束 / 输出 / 示例）  
2. [说清楚](/tech/prompt/claude-prompt-best-practices) → [稳住结构](/zh/tech/prompt/json-prompt-best-practices) → [写给仓库](/zh/tech/prompt/agents-doc)  
3. 换了新模型再读 [换模型时改什么](/zh/tech/prompt/official-guide-2026)；System Prompts 只当附录查阅

## 3. 怎么接到产品：集成

有手感了，再把模型嵌进自己的应用。

- [API 对比](/zh/integration/apis/) → OpenAI / Anthropic / 流式  
- [框架](/zh/integration/frameworks/)：Vercel AI SDK、LangChain.js、Next.js  
- [工具调用](/zh/integration/protocols/tool-calling)  
- 前端本地跑小模型：[Transformers.js](/zh/integration/frontend-ml/transformersjs)

## 4. 怎么查资料：RAG

文档、工单、代码库不能靠模型「背下来」。先检索，再生成。

- [RAG](/zh/tech/patterns/RAG)  
- 语义搜索实践：[构建语义搜索](/zh/tech/ai-application/building-semantic-search)

微调（SFT / RLHF）比 RAG 贵一个数量级，默认别上。见 [SFT](/zh/tech/training/SFT)。

## 5. 怎么让它做事：Agent

多步、要调工具、要改仓库时，才需要 Agent。先读选用，再读模式。

- [Agent 概览](/zh/tech/patterns/agent/)  
- [设计模式](/zh/tech/agent/agent-design-patterns)  
- [Skills](/zh/tech/skills/) · [MCP](/zh/tech/mcp/) · [工具调用](/zh/integration/protocols/tool-calling)

## 6. 怎么验和控

功能能跑之后：测、看、限流、算钱。

- [测试](/zh/tech/engineering/testing) · [评估](/zh/tech/engineering/evals)  
- [可观测性](/zh/tech/engineering/observability) · [安全](/zh/tech/engineering/security) · [成本](/zh/tech/engineering/cost-optimization)

## 建议阅读顺序

路径 1 的人：基础 → Prompt。  
路径 2 的人：集成 → RAG。  
路径 3 的人：工程与评估；Agent 按需。

不要从侧栏最底下的「更多」倒着读。
