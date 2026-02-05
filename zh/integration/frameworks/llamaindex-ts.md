# LlamaIndex.TS 指南

LlamaIndex 是 **RAG (检索增强生成)** 的最佳框架。它专注于将 LLM 连接到你的私有数据。

## 核心概念

1.  **加载 (Loading)**: 将数据从文件（PDF、API、Notion）获取到文档中。
2.  **索引 (Indexing)**: 将文档分割成块并将其存储为向量。
3.  **查询 (Querying)**: 查找相关块并要求 LLM 基于这些块进行回答。

## 基础 RAG 管道

这是如何在 Node.js 中构建“与你的数据对话”脚本。

```typescript
import { Document, VectorStoreIndex, OpenAI } from "llamaindex";

async function main() {
  // 1. 创建文档
  const document = new Document({ text: "Learn-AI is a platform for frontend engineers." });

  // 2. 创建索引 (分块 + 嵌入在这里发生)
  const index = await VectorStoreIndex.fromDocuments([document]);

  // 3. 创建查询引擎
  const queryEngine = index.asQueryEngine();

  // 4. 提问
  const response = await queryEngine.query({
    query: "What is Learn-AI?",
  });

  console.log(response.toString());
}
```

## 生产级 RAG: 向量存储

对于生产环境，你不能每次都重新索引。使用像 Pinecone 或 Supabase (pgvector) 这样的向量数据库。

```typescript
import { PineconeVectorStore } from "llamaindex/vector-store/PineconeVectorStore";

// 连接到 Pinecone
const vectorStore = new PineconeVectorStore();

// 从现有存储创建索引
const index = await VectorStoreIndex.fromVectorStore(vectorStore);
```

## 数据加载器 (LlamaHub)

LlamaIndex 有数百个加载器。

```typescript
import { PDFReader } from "llamaindex/readers/PDFReader";

const reader = new PDFReader();
const docs = await reader.loadData("path/to/my-manual.pdf");
```

## 高级查询

- **子问题查询引擎**: 将复杂问题分解为更小的问题。
- **混合搜索**: 结合关键词搜索和向量搜索。

## 与 Next.js 集成

像 LangChain 一样，你可以将输出流式传输到前端。

```typescript
// app/api/chat/route.ts
import { LlamaIndexAdapter } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  const index = await getMyIndex(); // 获取索引的逻辑
  const queryEngine = index.asQueryEngine();

  const stream = await queryEngine.query({
    query: lastMessage.content,
    stream: true,
  });

  return LlamaIndexAdapter.toDataStreamResponse(stream);
}
```

## 下一步

- 构建一个 **[RAG 搜索项目](../../projects/intermediate/rag-search.md)**。