---
title: Tech
description: Speak first, retrieve second, let the model act third. Start from LLM / prompt / context.
domain: tech
tags:
  - tech
listed: false
outline: [2, 3]
pageClass: catalog-page
---

# Tech

**Lead with the answer**: a frontend engineer does not start by training a model. The order is—

1. Talk to the model (prompt + context)  
2. Wire it into your app (API / streaming UI)  
3. Let it read *your* files (RAG)  
4. Let it act (tools / agents / skills / MCP)  
5. Only then: eval, cost, and fine-tuning  

Same pattern as a product map: panorama first, then tasks. The sidebar follows this order.

**Not this section**: click-by-click product tutorials ([Products](/products/)) or Transformer internals ([Learn LLM](https://llm.zenheart.site/)).

## Where are you stuck?

```
What do I need?
├── What the model sees and remembers     → Fundamentals
├── Unclear prompts, shaky output         → Prompt
├── Put a model in React / Vue            → Integrate
├── Answers must come from our docs       → RAG
├── Multi-step work, tools, repo edits    → Agent
└── Ship, test, cap the bill              → Engineering
```

## 1. Fundamentals

| Idea | Use it as | Page |
|---|---|---|
| LLM | A text-in, text-out API | [LLM basics](/tech/fundamentals/LLM) |
| Context window | Token budget for this turn | [Context](/tech/fundamentals/context) |
| Embeddings | Comparable sentence vectors | [Embeddings](/tech/fundamentals/embeddings) |

## 2. Prompt

This section is a path, not a pile. Mechanisms stay on Learn LLM [chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).

1. [How to write (map)](/tech/prompt/) — assistant prompt you can send today, then product prompt-as-code
2. [Be clear](/tech/prompt/claude-prompt-best-practices) → [AGENTS.md](/tech/prompt/agents-doc)
3. System prompts are an appendix. Read them after the path, not instead of it.

## 3. Integrate

- [API comparison](/integration/apis/)  
- [Vercel AI SDK](/integration/frameworks/vercel-ai-sdk)  
- [Streaming](/integration/apis/streaming)

## 4. RAG

- [RAG](/tech/patterns/RAG)

## 5. Agent

- [Agents](/tech/patterns/agent/)  
- [Design patterns](/tech/agent-design-patterns)

## 6. Engineering

- [Testing](/tech/engineering/testing) · [Evals](/tech/engineering/evals) · [Cost](/tech/engineering/cost-optimization)
