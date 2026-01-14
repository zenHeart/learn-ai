# RAG (检索增强生成)

## 什么是 RAG？

**RAG** 解决了在不重新训练模型的情况下让 LLM 访问**外部知识**的问题。这是构建需要最新或特定领域信息的 AI 应用程序的最实用和最具成本效益的方法。

**核心思想**: 我们不希望 LLM 知道答案，而是：
1. 从知识库中检索相关信息
2. 将其注入到提示词中
3. 让 LLM 基于该信息生成答案

**为什么 RAG 对前端工程师很重要**:
- 为你的产品文档构建聊天机器人
- 创建 AI 驱动的搜索
- 为你的应用添加问答功能
- 无需重新训练即可保持知识更新

## RAG vs 其他方法

| 方法 | 成本 | 速度 | 准确性 | 更新 | 最适合 |
|----------|------|-------|----------|---------|----------|
| **无 RAG** | 最低 | 最快 | 差 (幻觉) | N/A | 通用知识 |
| **RAG** | 低 | 中 | 高 | 实时 | 动态知识 |
| **微调 (Fine-tuning)** | 非常高 | 快 | 中-高 | 需要重新训练 | 专业领域 |
| **长上下文** | 中-高 | 慢 | 中 | N/A | 单个大文档 |

**前端开发者建议**: 对于任何特定于知识的功能，从 RAG 开始。

## RAG 的三个阶段

### 阶段 1: 准备 (构建知识库)

将你的数据转换为可搜索的向量：

```
文档 → 分割成块 → 生成 Embeddings → 存储在向量 DB 中
```

**实现**:

```javascript
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. 加载文档
const documents = [
  { id: 1, content: 'React is a JavaScript library for building UIs...' },
  { id: 2, content: 'Vue.js is a progressive framework...' },
  { id: 3, content: 'Next.js is a React framework...' }
];

// 2. 分割成块 (如果需要)
function splitIntoChunks(text, chunkSize = 500) {
  const words = text.split(' ');
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  return chunks;
}

// 3. 生成 Embeddings
async function generateEmbeddings(documents) {
  const embeddings = [];

  for (const doc of documents) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: doc.content
    });

    embeddings.push({
      id: doc.id,
      content: doc.content,
      embedding: response.data[0].embedding
    });
  }

  return embeddings;
}

// 4. 存储在向量数据库中
async function storeEmbeddings(embeddings) {
  for (const item of embeddings) {
    await supabase
      .from('documents')
      .insert({
        id: item.id,
        content: item.content,
        embedding: item.embedding
      });
  }
}

// 运行准备
const embeddings = await generateEmbeddings(documents);
await storeEmbeddings(embeddings);
```

### 阶段 2: 检索 (查找相关内容)

当用户提问时，查找最相关的文档：

```
用户查询 → 生成 Embedding → 搜索向量 DB → 返回前 K 个结果
```

**实现**:

```javascript
async function retrieveRelevantDocs(query, topK = 3) {
  // 1. 生成查询 Embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query
  });

  // 2. 搜索向量数据库 (在 Supabase 中使用 pgvector)
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding.data[0].embedding,
    match_threshold: 0.7, // 相似度阈值
    match_count: topK
  });

  if (error) throw error;

  return data; // 相关文档数组
}

// 用法示例
const query = 'How do I use React hooks?';
const relevantDocs = await retrieveRelevantDocs(query);

console.log(relevantDocs);
// [
//   { id: 1, content: 'React hooks allow...', similarity: 0.92 },
//   { id: 5, content: 'useState is a hook...', similarity: 0.88 },
//   { id: 12, content: 'useEffect handles...', similarity: 0.85 }
// ]
```

**向量数据库设置 (Supabase with pgvector)**:

```sql
-- 启用 pgvector 扩展
CREATE EXTENSION vector;

-- 创建文档表
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1536) -- OpenAI embeddings 是 1536 维
);

-- 创建索引以进行快速相似度搜索
CREATE INDEX ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 创建相似度搜索函数
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content,
    1 - (embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
```

### 阶段 3: 生成 (使用上下文创建答案)

结合检索到的文档和用户查询，生成答案：

```
相关文档 + 用户查询 → 构建提示词 → 调用 LLM → 返回答案
```

**实现**:

```javascript
async function generateAnswer(query, relevantDocs) {
  // 从相关文档构建上下文
  const context = relevantDocs
    .map((doc, i) => `Document ${i + 1}:\n${doc.content}`)
    .join('\n\n');

  // 创建带上下文的提示词
  const prompt = `You are a helpful assistant. Answer the question based on the provided documents.

Documents:
${context}

Question: ${query}

Instructions:
- Only use information from the provided documents
- If the documents don't contain the answer, say