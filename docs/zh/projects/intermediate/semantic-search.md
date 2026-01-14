# Project: Semantic Search Engine

**Level**: Intermediate
**Time**: 1.5 hours
**Stack**: Next.js, Supabase, OpenAI

## Overview

Build a search bar that understands intent, not just keywords.
User searches: "How to fix broken connection"
Result matches: "Troubleshooting Network Connectivity" (No shared words!)

## Difference from RAG
- **RAG**: Generates a new answer.
- **Semantic Search**: Returns existing documents.

## Step 1: The UI

```tsx
'use client';
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <div className="grid gap-4 mt-4">
        {results.map(r => (
          <div key={r.id} className="p-4 border rounded hover:bg-gray-50">
            <h3 className="font-bold">{r.title}</h3>
            <p className="text-sm text-gray-600">{r.snippet}</p>
            <div className="text-xs text-blue-500">
              Similarity: {(r.similarity * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Step 2: The Logic (Hybrid Search)

Pure vector search misses exact keywords (like ID numbers). **Hybrid Search** combines Vector + Keyword.

```typescript
// app/api/search/route.ts
import { supabase } from './db';
import { openai } from './openai';

export async function POST(req: Request) {
  const { query } = await req.json();

  // 1. Generate Embedding
  const res = await openai.embeddings.create({ input: query, model: 'text-embedding-3-small' });
  const embedding = res.data[0].embedding;

  // 2. Vector Search (Semantic)
  const { data: vectorResults } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 10,
  });

  // 3. Keyword Search (Text Search)
  const { data: keywordResults } = await supabase
    .from('documents')
    .select('*')
    .textSearch('content', query)
    .limit(10);

  // 4. Rerank / Deduplicate
  // (In production, use a Reranking API like Cohere for best results)
  const combined = [...vectorResults, ...keywordResults];
  // ... deduplication logic ...

  return Response.json(combined);
}
```

## Extension: Reranking
The gold standard is **Retrieve -> Rerank**.
Use Cohere's Rerank API to sort the `combined` list by true relevance.

```typescript
import { CohereClient } from 'cohere-ai';
const cohere = new CohereClient({ token: '...' });

const reranked = await cohere.rerank({
  documents: combined.map(d => d.content),
  query: query,
});
```
