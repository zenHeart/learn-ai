# 向量数据库与 Embeddings

## 什么是 Embeddings？

**Embeddings** 是文本（或其他数据）的数值表示，捕捉了高维空间中的语义。它们是语义搜索、推荐系统和 RAG 应用程序的基础。

**可以这样想**：将文本转换为多维空间中的坐标，其中相似的概念靠得很近。

```javascript
// 文本 → Embedding (简化可视化)
"cat" → [0.2, 0.8, 0.1, 0.9, ...]  // 1536 维
"dog" → [0.3, 0.7, 0.2, 0.8, ...]  // 靠近 "cat"
"car" → [0.9, 0.1, 0.8, 0.2, ...]  // 远离 "cat"
```

**为什么 Embeddings 很重要**:
- 启用语义搜索（基于含义，而非关键词）
- 为 RAG 系统提供相关上下文检索
- 对于相似度匹配和聚类至关重要
- 比每次搜索都运行 LLM 便宜得多

## Embeddings 如何工作

### 创建 Embeddings

```javascript
import { OpenAI } from 'openai';

const openai = new OpenAI();

async function createEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',  // 或 text-embedding-3-large
    input: text,
  });

  return response.data[0].embedding; // 1536 个数字的数组
}

// 示例
const embedding = await createEmbedding('How do I reset my password?');
console.log(embedding.length); // 1536
```

### 测量相似度

**余弦相似度 (Cosine Similarity)**: 测量两个 Embedding 的相似程度（0 = 不相关，1 = 完全相同）

```javascript
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return dotProduct / (magnitudeA * magnitudeB);
}

// 示例
const query = await createEmbedding('password reset');
const doc1 = await createEmbedding('To reset your password, go to settings');
const doc2 = await createEmbedding('The weather is sunny today');

console.log(cosineSimilarity(query, doc1)); // ~0.85 (非常相似)
console.log(cosineSimilarity(query, doc2)); // ~0.12 (不相关)
```

## 向量数据库

**向量数据库** 存储 Embeddings 并实现大规模快速相似度搜索。与传统数据库不同，它们针对高维向量进行了优化。

### 为什么不使用传统数据库？

| 传统 DB (Postgres) | 向量 DB (Pinecone) |
|---------------------------|----------------------|
| 精确匹配快 | 相似度搜索快 |
| 关键词搜索 | 语义搜索 |
| 扩展到数百万行 | 扩展到数十亿向量 |
| 未针对高维数据优化 | 专为 Embeddings 构建 |

### 流行向量数据库

#### 1. Pinecone (托管云)

**最适合**: 生产级应用，无忧扩展

```javascript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index('my-index');

// Upsert (更新/插入) 向量
await index.upsert([
  {
    id: 'doc-1',
    values: embedding1,
    metadata: { text: 'How to reset password', category: 'support' }
  },
  {
    id: 'doc-2',
    values: embedding2,
    metadata: { text: 'Weather forecast', category: 'news' }
  }
]);

// 搜索相似向量
const queryEmbedding = await createEmbedding('password help');
const results = await index.query({
  vector: queryEmbedding,
  topK: 3,
  includeMetadata: true
});

console.log(results.matches);
// [{ id: 'doc-1', score: 0.92, metadata: {...} }, ...]
```

#### 2. Chroma (开源，可嵌入)

**最适合**: 本地开发，原型设计

```javascript
import { ChromaClient } from 'chromadb';

const client = new ChromaClient();

// 创建集合
const collection = await client.createCollection({
  name: 'my_docs',
  metadata: { description: 'Documentation embeddings' }
});

// 添加文档 (Chroma 使用默认模型自动生成 embeddings)
await collection.add({
  ids: ['doc1', 'doc2', 'doc3'],
  documents: [
    'How to reset your password',
    'Account security best practices',
    'Weather forecast for today'
  ],
  metadatas: [
    { category: 'support' },
    { category: 'security' },
    { category: 'news' }
  ]
});

// 查询
const results = await collection.query({
  queryTexts: ['password help'],
  nResults: 2
});

console.log(results);
```

#### 3. pgvector (Postgres 扩展)

**最适合**: 现有 Postgres 用户，统一数据库

```sql
-- 启用扩展
CREATE EXTENSION vector;

-- 创建带向量列的表
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- OpenAI embeddings 为 1536 维
);

-- 创建索引以进行快速相似度搜索
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);

-- 插入文档
INSERT INTO documents (content, embedding)
VALUES ('How to reset password', '[0.1, 0.2, ...]');

-- 搜索相似文档
SELECT content, 1 - (embedding <=> '[query_embedding]') AS similarity
FROM documents
ORDER BY embedding <=> '[query_embedding]'
LIMIT 5;
```

**JavaScript 客户端**:

```javascript
import { Pool } from 'pg';
import pgvector from 'pgvector/pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 注册 pgvector 类型
await pool.query('CREATE EXTENSION IF NOT EXISTS vector');

// 插入 embedding
const embedding = await createEmbedding('password reset');
await pool.query(
  'INSERT INTO documents (content, embedding) VALUES ($1, $2)',
  ['How to reset password', pgvector.toSql(embedding)]
);

// 搜索
const queryEmbedding = await createEmbedding('password help');
const result = await pool.query(
  `SELECT content, 1 - (embedding <=> $1) AS similarity
   FROM documents
   ORDER BY embedding <=> $1
   LIMIT 3`,
  [pgvector.toSql(queryEmbedding)]
);

console.log(result.rows);
```

#### 4. Weaviate (开源，混合搜索)

**最适合**: 高级功能，混合关键词+语义搜索

```javascript
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

// 创建 schema
await client.schema
  .classCreator()
  .withClass({
    class: 'Document',
    vectorizer: 'text2vec-openai',
    properties: [
      { name: 'content', dataType: ['text'] },
      { name: 'category', dataType: ['string'] }
    ]
  })
  .do();

// 添加文档
await client.data
  .creator()
  .withClassName('Document')
  .withProperties({
    content: 'How to reset your password',
    category: 'support'
  })
  .do();

// 搜索
const result = await client.graphql
  .get()
  .withClassName('Document')
  .withNearText({ concepts: ['password help'] })
  .withLimit(3)
  .withFields('content category _additional { distance }')
  .do();

console.log(result.data.Get.Document);
```

## Embedding 模型对比

| 模型 | 维度 | 成本 | 性能 | 用途 |
|-------|------------|------|-------------|----------|
| **OpenAI text-embedding-3-small** | 1536 | $0.02/1M tokens | 好 | 大多数应用 |
| **OpenAI text-embedding-3-large** | 3072 | $0.13/1M tokens | 最佳 | 高精度需求 |
| **Cohere embed-v3** | 1024 | $0.10/1M tokens | 优秀 | 多语言 |
| **Sentence Transformers (local)** | 384-768 | 免费 (自托管) | 好 | 隐私敏感 |

## 使用向量数据库的 RAG

结合 embeddings + 向量 DB + LLM 的完整实现：

```javascript
import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI();
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index('knowledge-base');

// 步骤 1: 索引文档
async function indexDocuments(documents) {
  for (const doc of documents) {
    // 创建 embedding
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: doc.content,
    });

    // 存储到向量 DB
    await index.upsert([{
      id: doc.id,
      values: embedding.data[0].embedding,
      metadata: {
        content: doc.content,
        title: doc.title,
        url: doc.url
      }
    }]);
  }
}

// 步骤 2: 检索相关上下文
async function retrieveContext(query, topK = 3) {
  // 嵌入查询
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  // 搜索向量 DB
  const results = await index.query({
    vector: queryEmbedding.data[0].embedding,
    topK,
    includeMetadata: true
  });

  // 提取相关文档
  return results.matches.map(match => ({
    content: match.metadata.content,
    title: match.metadata.title,
    score: match.score
  }));
}

// 步骤 3: 使用 RAG 生成答案
async function answerQuestion(question) {
  // 检索相关文档
  const context = await retrieveContext(question);

  // 构建带上下文的提示词
  const systemPrompt = `You are a helpful assistant. Answer questions based on the provided context.

Context:
${context.map((doc, i) => `[${i + 1}] ${doc.title}\n${doc.content}`).join('\n\n')}

If the context doesn't contain the answer, say "I don't have enough information to answer that."`;

  // 生成答案
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ]
  });

  return {
    answer: response.choices[0].message.content,
    sources: context.map(doc => doc.title)
  };
}

// 用法
const result = await answerQuestion('How do I reset my password?');
console.log(result.answer);
console.log('Sources:', result.sources);
```

## 高级技术

### 1. 混合搜索 (关键词 + 语义)

结合传统关键词搜索和向量相似度以获得最佳结果：

```javascript
async function hybridSearch(query, topK = 5) {
  // 向量搜索
  const vectorResults = await vectorSearch(query, topK * 2);

  // 关键词搜索
  const keywordResults = await keywordSearch(query, topK * 2);

  // 合并和重排序 (Reciprocal Rank Fusion)
  const merged = mergeResults(vectorResults, keywordResults);

  return merged.slice(0, topK);
}
```

### 2. 分块策略 (Chunking Strategies)

将大型文档分解为最佳的 Embedding 块：

```javascript
function chunkDocument(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push({
      text: text.slice(start, end),
      start,
      end
    });
    start = end - overlap; // 重叠以保持上下文连续性
  }

  return chunks;
}
```

### 3. 重排序 (Re-ranking)

通过对初始结果进行重排序来提高检索准确性：

```javascript
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

async function rerank(query, documents) {
  const response = await cohere.rerank({
    model: 'rerank-english-v3.0',
    query,
    documents: documents.map(d => d.content),
    topN: 3
  });

  return response.results.map(r => documents[r.index]);
}
```

## 最佳实践

1. **块大小**: 200-500 tokens 对于大多数用例是最佳的
2. **重叠**: 使用 10-20% 的块间重叠以保持连续性
3. **元数据**: 存储丰富的元数据（标题、标签、时间戳）以进行过滤
4. **批处理**: 批量嵌入文档以减少 API 调用
5. **缓存**: 缓存 Embeddings 以避免重新计算
6. **监控**: 跟踪 Embedding 成本和向量 DB 查询性能
7. **过滤**: 在向量搜索前使用元数据过滤器缩小范围
8. **新鲜度**: 随着内容变化定期更新向量数据库

## 常见陷阱

1. **错误的块大小**: 太大 → 失去特异性，太小 → 失去上下文
2. **无元数据**: 无法按类别、日期等过滤结果
3. **过时的 Embeddings**: 文档更改时忘记更新
4. **单一搜索策略**: 没有结合关键词 + 语义搜索
5. **忽视成本**: 嵌入数百万文档可能会很昂贵

## 成本优化

```javascript
// 坏: 重复嵌入整个文档
for (const doc of documents) {
  const embedding = await createEmbedding(doc.fullText); // 昂贵!
}

// 好: 分块 + 批处理 + 缓存
const chunks = documents.flatMap(doc => chunkDocument(doc.fullText));
const batchSize = 100;

for (let i = 0; i < chunks.length; i += batchSize) {
  const batch = chunks.slice(i, i + batchSize);

  const embeddings = await openai.embeddings.create({
    model: 'text-embedding-3-small', // 更便宜的模型
    input: batch.map(c => c.text)
  });

  // 缓存 Embeddings
  await cacheEmbeddings(batch, embeddings.data);
}
```

## 向量 DB 对比

| 特性 | Pinecone | Chroma | pgvector | Weaviate |
|---------|----------|--------|----------|----------|
| **托管** | 仅云端 | 自托管 | Postgres 扩展 | 两者皆可 |
| **设置** | 简单 | 非常简单 | 中等 | 中等 |
| **可扩展性** | 优秀 | 好 | 好 | 优秀 |
| **成本** | $70/月起 | 免费 | Postgres 成本 | 免费 (OSS) |
| **最适合** | 生产环境 | 原型设计 | 现有 Postgres | 高级功能 |

## 下一步

- **简单开始**: 使用 Chroma 进行本地原型设计
- **生产环境**: 选择 Pinecone 进行托管，或 Weaviate 进行自托管
- **实现 RAG**: 结合 [RAG 指南](/zh/tech/patterns/RAG) 构建完整系统
- **优化**: 在扩展前分析性能和成本

向量数据库和 Embeddings 是现代 AI 应用的骨干。掌握它们以构建强大的语义搜索、RAG 系统和推荐引擎！