# Semantic Search Case Study: Kent C. Dodds

> 来源: [Building Semantic Search on My Content](https://kentcdodds.com/blog/building-semantic-search-on-my-content) by Kent C. Dodds
> 学习日期: 2026-04-12

## 概述

Kent C. Dodds 分享了如何在自己的博客上构建语义搜索系统的完整方案。使用 Cloudflare Workers AI + Vectorize 实现。

---

## 核心架构

```
内容源(MDX/YAML/Transcript)
        ↓
GitHub Actions (定时/触发)
        ↓
分块(chunk) + Hash 增量索引
        ↓
Cloudflare Workers AI Embedding
        ↓
Vectorize (向量数据库)
        ↓
搜索查询 → 向量检索 → 结果聚合 → 展示
```

---

## 关键实现细节

### 1. 分块策略 (Chunking)

```javascript
const chunkBodies = chunkTextRaw(source, {
  targetChars: 2500,    // 目标块大小
  overlapChars: 250,    // 重叠保持上下文
  maxChunkChars: 3500,  // 最大块限制
})
```

**重叠策略**: 每块之间保留 250 字符重叠，避免边界处重要信息被切断。

### 2. 增量索引 (Incremental Indexing)

通过 SHA256 哈希检测内容变化，只重新嵌入变更的块：

```javascript
const hash = sha256(text)

// 对比旧 manifest，跳过未变化的内容
if (oldHashesById.get(vectorId) === hash) continue
// 只有变化的内容才调用 embedding API
```

**优势**: 大幅节省成本 + 加快索引速度

### 3. 搜索结果聚合

```javascript
// 结果按文档 ID 聚合，保留最高分 chunk
const byDocId = new Map<string, SearchResult>()

for (const m of matches) {
  const canonicalId = `${type}:${slug}`
  const existing = byDocId.get(canonicalId)
  if (!existing || m.score > existing.score) {
    byDocId.set(canonicalId, { ... })
  }
}
```

**过检索**: `safeTopK * 5` → 同一文档多个 chunk 结果，最终取最高分。

### 4. 元数据设计

```javascript
{
  id: "docSlug:chunk:0",
  text: "Title: xxx\nURL: xxx\n\n{chunkBody}",
  metadata: {
    title, url, snippet, chunkIndex, type, slug
  }
}
```

---

## 技术栈选择

| 组件 | 选择 | 原因 |
|------|------|------|
| **向量数据库** | Cloudflare Vectorize | 与 Workers AI 集成紧密 |
| **Embedding** | Cloudflare Workers AI | 托管服务，无需自建 |
| **网关** | AI Gateway | 请求路由、缓存、限流 |
| **索引触发** | GitHub Actions | 自动化 + 免费额度 |

---

## 关键洞察

1. **分块是精度关键**: 2500 字符目标 + 250 字符重叠，在粒度和上下文间取得平衡
2. **哈希实现增量索引**: 不变化就不收费，是成本控制的核心技巧
3. **Chunk-level 检索 → Doc-level 聚合**: 先过检索再合并，避免单一高分 chunk 遮蔽同文档其他相关内容
4. **元数据嵌入检索文本**: 将 title/url 作为前缀，提升检索相关性

---

## 与现有文档的关系

- [RAG 模式](./RAG.md) - RAG 基础理论
- [Local Embedding](../cookbook/local-embedding.md) - 本地 embedding 方案
