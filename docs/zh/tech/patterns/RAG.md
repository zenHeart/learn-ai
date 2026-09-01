---
title: RAG
description: "回答必须基于我们自己的文档时，先检索再生成。不要一上来微调。机制见 Learn LLM 第 11–12 章。"
domain: tech
tags:
  - rag
llm:
  - 11
  - 12
prev: false
next:
  text: 构建语义搜索
  link: /zh/tech/ai-application/building-semantic-search
---

# RAG

**结论**：模型背不住你们的文档、工单和代码。先 **检索出几段带出处的原文**，再让它基于这些段落回答。答不上就拒答。

> 切块、召回、ACL、引用正确率见 Learn LLM [第 11–12 章](https://llm.zenheart.site/chapters/11-rag)。本页只写前端何时上、怎么验收。

## 概念

```
文档 → 切块 + embedding → 存（原文+来源+权限）
用户问题 → embedding → 取 top-k → 拼进提示 → 生成（必须引用）
```

| | RAG | 把全文塞进窗口 | 微调 |
|---|---|---|---|
| 知识会变 | 重建索引 | 每次重贴 | 重训 |
| 成本 | 检索 + 少量 token | 窗口费很快爆炸 | 高一个数量级 |
| 默认 | **先走这条** | 只适合单份短文档 | 默认不要 |

Embedding 概念见 [Embeddings](/zh/tech/fundamentals/embeddings)。

## 这一栏怎么读

1. 读完本页，确认你的问题真的是「必须引用我们的资料」。
2. 跟一篇可跑的：[构建语义搜索](/zh/tech/ai-application/building-semantic-search)。
3. 权限、拒答、评测不够再回 Learn LLM 第 11–12 章，不要在应用站再写一遍原理。

## 工程验收（少了就不算做成）

1. 每条回答带 **来源路径或标题**。编不出来就说「文档里没有」。
2. 索引和查询 **同一 embedding 模型**。
3. 块不要太大。按标题 / 段落切，不按「一篇文章一块」。
4. 有权限的文档不能被没权限的人检索到。元数据里带 ACL，过滤发生在召回时，不是生成后再藏。
5. 用 20 条真实问题当 fixture：该命中的命中，该拒答的拒答。不要只看「感觉通顺」。

## 常见陷阱

- 检索到就当事实。相似度高只表示「像」。
- 报错码、函数名走向量搜。先关键词 / grep。
- 用微调代替更新文档。知识变了重建索引即可。
- 把整仓当一块 embedding。助手场景用 [上下文工程](/zh/tech/fundamentals/context-engineering)，产品问答才上 RAG。

## 下一步

- 动手：[构建语义搜索](/zh/tech/ai-application/building-semantic-search)
- 接到聊天 UI：[流式](/zh/integration/apis/streaming)
- 默认别微调：[SFT](/zh/tech/training/SFT)
