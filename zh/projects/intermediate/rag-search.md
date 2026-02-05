# Project: Semantic Search (RAG)

**Level**: Intermediate
**Time**: 2 hours
**Stack**: Next.js, Supabase (pgvector), OpenAI

## Overview

Build a "Chat with your PDF" application.
1.  **Ingest**: Upload text, chunk it, embed it, store in DB.
2.  **Retrieve**: When user asks question, find relevant chunks.
3.  **Generate**: Send chunks + question to LLM.

## Step 1: Database Setup (Supabase)

Enable the vector extension in SQL Editor:

```sql
create extension vector;

create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536) -- OpenAI embedding size
);
```

## Step 2: Ingestion Script

```typescript
import { openai } from './openai';
import { supabase } from './supabase';

async function ingest(text: string) {
  // 1. Chunking (Simple)
  const chunks = text.match(/.{1,1000}/g); 

  for (const chunk of chunks) {
    // 2. Embedding
    const res = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk,
    });
    const embedding = res.data[0].embedding;

    // 3. Store
    await supabase.from('documents').insert({
      content: chunk,
      embedding,
    });
  }
}
```

## Step 3: Retrieval Function (Postgres)

Create a Postgres function to search by similarity.

```sql
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

## Step 4: Chat Route (RAG)

```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { messages } = await req.json();
  const query = messages[messages.length - 1].content;

  // 1. Embed Query
  const res = await openai.embeddings.create({ input: query, model: 'text-embedding-3-small' });
  const embedding = res.data[0].embedding;

  // 2. Retrieve Context
  const { data: documents } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 5,
  });

  const context = documents.map(d => d.content).join('\n---\n');

  // 3. Augment Prompt
  const prompt = `
    Context:
    ${context}
    
    Question: ${query}
    
    Answer the question based ONLY on the context above.
  `;

  // 4. Generate
  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [{ role: 'user', content: prompt }],
  });

  return result.toDataStreamResponse();
}
```

## Next Steps

- Add **Source Citations** (show which document chunk was used).
- Use **LlamaIndex** to handle PDF parsing better.
