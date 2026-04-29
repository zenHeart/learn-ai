# Building Semantic Search on My Content

> 来源：[Kent C. Dodds - Building Semantic Search on My Content](https://kentcdodds.com/blog/building-semantic-search-on-my-content)

## 概述

Semantic Search（语义搜索）是一种基于向量数据库的搜索技术，能够理解查询的语义含义，而不仅仅是关键词匹配。本文介绍 Kent C. Dodds 在其个人网站上构建语义搜索的完整方案，基于 Cloudflare Workers AI 和 Vectorize 构建。

## 技术选型

作者选择了 [Vectorize](https://developers.cloudflare.com/vectorize/)（Cloudflare 的向量数据库）作为底层存储，选择原因：

- Cloudflare 提供了完整的 AI 应用平台（Workers AI + AI Gateway + Vectorize）
- 部署简单，生态完善

## 索引架构

### 核心流程

1. **内容分块（Chunk）**：将内容拆分为重叠的块
2. **生成 Hash**：为每个块生成稳定 Hash
3. **跳过未变更内容**：通过 Hash 对比实现增量索引
4. **Embedding**：调用 AI 模型生成向量
5. **Upsert**：写入 Vectorize 向量数据库

### 分块策略（Chunking）

```javascript
const chunkBodies = chunkTextRaw(source, {
    targetChars: 2500,    // 目标块大小
    overlapChars: 250,   // 重叠字符数
    maxChunkChars: 3500, // 最大块大小
})
```

**关键设计**：

- `targetChars: 2500`：尝试将每个块保持在约 2500 字符的目标大小
- `overlapChars: 250`：块之间有 250 字符重叠，保证上下文不被切断
- `maxChunkChars: 3500`：绝对上限，避免 Embedding 模型输入超限

**为什么需要分块？**

- Embedding 模型有输入 Token 限制
- 精细的分块能提高检索精度，匹配最相关的段落而非整篇文档

### 稳定 ID 与 Hash

```javascript
for (let i = 0; i < chunkBodies.length; i++) {
    const chunkBody = chunkBodies[i] ?? ''
    const vectorId = `${docId}:chunk:${i}`  // 稳定 ID
    const text = `Title: ${title}\nURL: ${url}\n\n${chunkBody}`
    const hash = sha256(text)  // 内容 Hash

    nextManifestChunks.push({ id: vectorId, hash })
}
```

- **稳定 ID**：`docId:chunk:i` 格式，使更新和删除操作具有确定性
- **Hash**：对块内容做 SHA-256 哈希，用于增量更新判断

### 增量索引：跳过未变更块

```javascript
const oldHashesById = new Map(
    (oldManifestDoc?.chunks ?? []).map((c) => [c.id, c.hash]),
)

if (oldHashesById.get(vectorId) === hash) continue  // 未变化，跳过

toEmbed.push({
    id: vectorId,
    text,
    metadata: { title, url, snippet: makeSnippet(chunkBody), chunkIndex: i },
})
```

**核心思想**：如果 Hash 没变，说明内容未修改，无需重新 Embedding，节省成本并加速索引。

### Embedding 与 Upsert

```javascript
// 调用 Workers AI 获取 Embedding 向量
const vectors = await getEmbeddings({ texts: toEmbed.map((x) => x.text) })

// 写入 Vectorize（Upsert = 插入新记录或更新已有记录）
await vectorizeUpsert({
    vectors: toEmbed.map((item, i) => ({
        id: item.id,
        values: vectors[i],
        metadata: item.metadata,
    })),
})
```

**Upsert 语义**：根据 ID 插入新向量，若已存在则更新。

## 搜索架构

### 流程概览

1. **Embedding 查询**：将用户查询转为向量
2. **向量检索**：在 Vectorize 中找最近邻
3. **合并文档级结果**：同文档多个块合并为单一结果
4. **排序返回**：按相似度得分排序

### 搜索实现

```javascript
// 安全地计算 topK，避免过少或过多
const safeTopK = Math.max(1, Math.min(15, Math.floor(topK)))
const rawTopK = Math.min(15, safeTopK * 5)  // 过fetch，多取块

// 获取查询向量
const [queryVector] = await getEmbeddings({ texts: [query] })

// 查询 Vectorize
const { matches } = await queryVectorize({
    vector: queryVector!,
    topK: rawTopK,
    returnMetadata: 'all',
})
```

**过 Fetch 策略**：取 `safeTopK * 5` 个块级结果，因为同一文档可能匹配多个块，最终合并后实际文档数会减少。

### 合并块级结果为文档级结果

```javascript
const byDocId = new Map<string, SearchResult>()

for (const m of matches) {
    const type = typeof m.metadata?.type === 'string' ? m.metadata.type : 'doc'
    const slug = typeof m.metadata?.slug === 'string' ? m.metadata.slug : m.id
    const canonicalId = `${type}:${slug}`

    const existing = byDocId.get(canonicalId)
    if (!existing || m.score > existing.score) {
        byDocId.set(canonicalId, {
            id: canonicalId,
            score: m.score,
            title: m.metadata?.title as string | undefined,
            url: m.metadata?.url as string | undefined,
            snippet: m.metadata?.snippet as string | undefined,
        })
    }
}

return [...byDocId.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, safeTopK)
```

**合并策略**：同一文档可能匹配多个块，保留得分最高的块作为该文档的代表结果。

## 核心技术要点

### 1. 内容分块（Chunking）策略

| 参数 | 值 | 说明 |
|------|-----|------|
| targetChars | 2500 | 目标块大小 |
| overlapChars | 250 | 块间重叠 |
| maxChunkChars | 3500 | 最大上限 |

重叠很重要：保证重要信息不会因恰好在块边界而被切分，导致语义丢失。

### 2. 增量索引设计

通过 **Hash 对比** 实现增量索引，避免重复 Embedding：

```
文档变化 → Hash 变化 → 重新 Embed → Upsert
文档未变 → Hash 相同 → 跳过
```

### 3. 元数据保留

每个向量都携带丰富元数据：

```json
{
    "id": "docId:chunk:0",
    "values": [0.123, -0.456, ...],
    "metadata": {
        "title": "文章标题",
        "url": "https://...",
        "snippet": "块内容摘要",
        "chunkIndex": 0
    }
}
```

### 4. 搜索结果合并

过 Fetch + 文档级合并解决了向量数据库只返回块级匹配的问题，保证用户看到的是文档级结果。

## 总结

这套方案的核心思想：

1. **Chunk + Hash**：稳定 ID 和增量更新是高效索引的关键
2. **纯向量检索**：无需维护倒排索引，自然支持语义相似度
3. **块级 → 文档级合并**：保证搜索结果粒度合理
4. **Cloudflare 生态**：Workers AI + Vectorize + AI Gateway 的组合简化了 AI 应用部署
