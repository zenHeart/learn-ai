---
title: Embeddings
description: "句子变成可比较的向量，用来做语义搜索。本页只写怎么调 API。实现与评测见 Learn LLM 第 11–12 章。"
domain: tech
tags:
  - fundamentals
llm:
  - 11
  - 12
---

# Embeddings

**结论**：Embedding 把一段文本变成一组数，**意思近的句子距离近**。用来搜文档，不是用来生成回答。

> 切块、召回、ACL、引用正确率见 Learn LLM [第 11–12 章](https://llm.zenheart.site/chapters/11-rag)。本页只写前端怎么调用、什么时候不该用。

## 概念

| 词 | 你当什么用 |
|---|---|
| **Embedding** | 文本 → 向量。同一套模型才能比距离 |
| **相似度** | 常用余弦相似度。近 ≠ 答案对，只表示「像」 |
| **向量库** | 存向量 + 原文 + 元数据，供检索。不是第二套 LLM |

生成回答仍然走聊天 API。Embedding 只负责「先找出哪几段该看」。

## 工程上怎么调

```ts
import OpenAI from 'openai'

const client = new OpenAI()

export async function embed(texts: string[]) {
  const response = await client.embeddings.create({
    model: process.env.EMBEDDING_MODEL!,
    input: texts
  })
  return response.data.map((row) => row.embedding)
}

export function cosine(a: number[], b: number[]) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}
```

1. **问答走 RAG，不要每次把全文塞进 prompt。** 见 [RAG](/zh/tech/patterns/RAG)。
2. **索引和查询必须同一 embedding 模型。** 换模型要重建索引。
3. **元数据一起存。** 至少：来源路径、标题、权限。检索后才能引用和做 ACL。
4. **精确关键词（报错码、函数名）先 grep / 全文检索。** Embedding 擅长「意思像」，不擅长「字符串必须命中」。

## 常见陷阱

- 用聊天模型的输出当 embedding。要走 embedding 端点。
- 一块切 5 千字。检索粒度太大，引用对不上。
- 召回了就当事实。必须带来源；没检索到就拒答。

## 下一步

- 整条检索生成链路 → [RAG](/zh/tech/patterns/RAG)
- 一篇可跑的语义搜索 → [构建语义搜索](/zh/tech/ai-application/building-semantic-search)
