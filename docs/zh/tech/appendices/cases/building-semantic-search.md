---
title: Building Semantic Search on My Content
description: Kent C. Dodds 在个人站点落地语义搜索的完整方案：分块策略、Hash 增量索引、过 fetch 检索与文档级合并（基于 Cloudflare Vectorize）。
domain: tech
tags: [tech, case, semantic-search, rag, vectorize]
navOrder: 76
topicId: cases-building-semantic-search
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Building Semantic Search on My Content

> 来源：[Kent C. Dodds - Building Semantic Search on My Content](https://kentcdodds.com/blog/building-semantic-search-on-my-content)

## 概述

在个人内容站上构建语义搜索（Semantic Search）：理解查询语义而非关键词匹配。技术选型 [Cloudflare Vectorize](https://developers.cloudflare.com/vectorize/)（配合 Workers AI 生成 embedding）——选它因为 Cloudflare 提供完整的 AI 应用平台（Workers AI + AI Gateway + Vectorize），部署简单、生态完善。

主线概念（embedding、检索、RAG）见[嵌入与检索](/zh/tech/04-grounding/embeddings-retrieval)与 [RAG](/zh/tech/04-grounding/rag)；本页只保留工程实现的关键决策。

## 索引架构

核心流程：

1. **分块（Chunk）**：内容拆为重叠的块
2. **生成 Hash**：为每块生成稳定 SHA-256
3. **跳过未变更**：Hash 对比实现增量索引
4. **Embedding**：调模型生成向量
5. **Upsert**：写入 Vectorize

### 分块策略

```javascript
const chunkBodies = chunkTextRaw(source, {
    targetChars: 2500,    // 目标块大小
    overlapChars: 250,   // 块间重叠
    maxChunkChars: 3500, // 绝对上限（避免超过 embedding 模型输入限制）
})
```

为什么分块：embedding 模型有输入 token 限制；精细分块让检索命中「最相关的段落」而非整篇文档。为什么重叠：重要信息恰好落在块边界时不被切断。

### 稳定 ID 与增量索引

```javascript
const vectorId = `${docId}:chunk:${i}`  // 稳定 ID：更新/删除具有确定性
const text = `Title: ${title}\nURL: ${url}\n\n${chunkBody}`
const hash = sha256(text)               // 内容 Hash

if (oldHashesById.get(vectorId) === hash) continue  // 未变化，跳过 embedding
```

核心思想：**Hash 没变 → 不重新 embedding**，节省成本并加速索引。更新语义：文档变化 → Hash 变化 → 重新 embed → upsert；未变 → 跳过。

## 搜索架构

```
查询 embedding → Vectorize 最近邻（过 fetch）→ 合并块级结果为文档级 → 按得分排序返回
```

**过 fetch 策略**：取 `safeTopK * 5` 个块级结果，因为同一文档可能命中多个块，合并后文档数会减少：

```javascript
const safeTopK = Math.max(1, Math.min(15, Math.floor(topK)))
const rawTopK = Math.min(15, safeTopK * 5)  // 多取块，合并后裁剪
```

**文档级合并**：按 `type:slug` 聚合同一文档的多个块命中，保留得分最高的块作为该文档的代表结果，最后裁剪到 `safeTopK`。

## 关键要点

1. **Chunk + Hash**：稳定 ID 与内容 Hash 是高效增量索引的关键。
2. **纯向量检索**：无需维护倒排索引，自然支持语义相似度。
3. **块级 → 文档级合并**：解决向量库只返回块级匹配的问题，保证用户看到文档级结果。
4. **元数据随向量走**：每条向量携带 title/url/snippet，检索结果可直接渲染。
