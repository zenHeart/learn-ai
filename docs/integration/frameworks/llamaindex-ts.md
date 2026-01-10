# LlamaIndex.TS Guide

LlamaIndex is the best framework for **RAG (Retrieval Augmented Generation)**. It specializes in connecting LLMs to your private data.

## Core Concepts

1.  **Loading**: Getting data from files (PDF, API, Notion) into documents.
2.  **Indexing**: Splitting documents into chunks and storing them as vectors.
3.  **Querying**: Finding relevant chunks and asking the LLM to answer based on them.

## Basic RAG Pipeline

Here is how to build a "Chat with your Data" script in Node.js.

```typescript
import { Document, VectorStoreIndex, OpenAI } from "llamaindex";

async function main() {
  // 1. Create a Document
  const document = new Document({ text: "Learn-AI is a platform for frontend engineers." });

  // 2. Create an Index (chunking + embedding happens here)
  const index = await VectorStoreIndex.fromDocuments([document]);

  // 3. Create a Query Engine
  const queryEngine = index.asQueryEngine();

  // 4. Ask a question
  const response = await queryEngine.query({
    query: "What is Learn-AI?",
  });

  console.log(response.toString());
}
```

## Production RAG: Vector Stores

For production, you can't re-index every time. Use a Vector Database like Pinecone or Supabase (pgvector).

```typescript
import { PineconeVectorStore } from "llamaindex/vector-store/PineconeVectorStore";

// Connect to Pinecone
const vectorStore = new PineconeVectorStore();

// Create index from existing store
const index = await VectorStoreIndex.fromVectorStore(vectorStore);
```

## Data Loaders (LlamaHub)

LlamaIndex has hundreds of loaders.

```typescript
import { PDFReader } from "llamaindex/readers/PDFReader";

const reader = new PDFReader();
const docs = await reader.loadData("path/to/my-manual.pdf");
```

## Advanced Querying

- **Sub-Question Query Engine**: Breaks a complex question into smaller ones.
- **Hybrid Search**: Combines keyword search with vector search.

## Integration with Next.js

Like LangChain, you can stream the output to the frontend.

```typescript
// app/api/chat/route.ts
import { LlamaIndexAdapter } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  const index = await getMyIndex(); // Your logic to get index
  const queryEngine = index.asQueryEngine();

  const stream = await queryEngine.query({
    query: lastMessage.content,
    stream: true,
  });

  return LlamaIndexAdapter.toDataStreamResponse(stream);
}
```

## Next Steps

- Build a **[RAG Search Project](../../projects/intermediate/rag-search.md)**.
