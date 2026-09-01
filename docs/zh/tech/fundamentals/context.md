---
title: 上下文窗口
description: "窗口是这一轮能看见的 token 上限。本页只写怎么估、怎么裁。记忆四模式见 Learn LLM 第 15 章。"
domain: tech
tags:
  - fundamentals
llm:
  - 15
---

# 上下文窗口

**结论**：窗口是 **这一轮的预算**（输入 + 输出一起算）。超了就 400 或被静默截断；多塞就多花钱、变慢。

> 截断、摘要、记忆 RAG、画像见 Learn LLM [第 15 章 A5](https://llm.zenheart.site/chapters/15-prompt-memory)。具体型号的窗口大小以厂商型号页为准，本页不维护对照表。

## 概念

一次请求里模型能看见的东西：system、工具定义、历史、检索片段、本轮 user、以及它即将写出的 token。这些抢同一份预算。

粗估：英文约 4 字符 / token，中文约 1–2 字 / token。上线用厂商的 token counting，不要拿估算去对账。

## 工程上怎么管

```ts
export function estimateTokens(text: string): number {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) ?? []).length
  const rest = text.length - cjk
  return Math.ceil(cjk / 1.5 + rest / 4)
}

export function assertFits(messages: { content: string }[], budget: number) {
  const used = messages.reduce((n, m) => n + estimateTokens(m.content), 0)
  if (used > budget * 0.8) {
    throw new Error(`context ~${used} tokens, budget ${budget}. Trim before send.`)
  }
}
```

1. **发之前估。** 聊天每轮累加历史，先 `assertFits` 再请求。
2. **裁的时候保住 tool 配对。** `messages.slice(-20)` 会切断 tool call / result，下一轮直接 400。实现回第 15 章。
3. **稳定前缀放前面。** 系统提示和工具 schema 少改，才能吃 cache。见 [上下文工程](/zh/tech/fundamentals/context-engineering)。
4. **文档问答不要整本塞。** 先检索再生成，见 [RAG](/zh/tech/patterns/RAG)。

## 常见陷阱

- 把「窗口 200k」理解成「可以把整个仓贴进去」。有效信息密度比上限更重要。
- 超窗只在前端 toast 一下，服务端继续重试。应在组 messages 时失败。
- 用过期的 GPT-3.5 / 16k 表做容量规划。去打开你正在用的那个型号页。

## 下一步

- 往窗口里塞什么 → [上下文工程](/zh/tech/fundamentals/context-engineering)
- 助手反复说的规矩 → [AGENTS.md](/zh/tech/prompt/agents-doc)
