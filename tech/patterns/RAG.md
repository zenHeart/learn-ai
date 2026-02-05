# RAG (Retrieval-Augmented Generation)

## What is RAG?

**RAG** solves the problem of giving LLMs access to **external knowledge** without retraining the model. It's the most practical and cost-effective way to build AI applications that need up-to-date or domain-specific information.

**The Core Idea**: Instead of hoping the LLM knows the answer, we:
1. Retrieve relevant information from a knowledge base
2. Inject it into the prompt
3. Let the LLM generate an answer based on that information

**Why RAG Matters for Frontend Engineers**:
- Build chatbots for your product docs
- Create AI-powered search
- Add Q&A features to your apps
- Keep knowledge up-to-date without retraining

## RAG vs Other Approaches

| Approach | Cost | Speed | Accuracy | Updates | Best For |
|----------|------|-------|----------|---------|----------|
| **No RAG** | Lowest | Fastest | Poor (hallucinations) | N/A | General knowledge |
| **RAG** | Low | Medium | High | Real-time | Dynamic knowledge |
| **Fine-tuning** | Very High | Fast | Medium-High | Requires retraining | Specialized domains |
| **Long Context** | Medium-High | Slow | Medium | N/A | Single large documents |

**Frontend Developer Recommendation**: Start with RAG for any knowledge-specific feature.

## The Three Stages of RAG

### Stage 1: Preparation (Build Knowledge Base)

Transform your data into searchable vectors:

```
Documents → Split into chunks → Generate embeddings → Store in vector DB
```

**Implementation**:

```javascript
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. Load documents
const documents = [
  { id: 1, content: 'React is a JavaScript library for building UIs...' },
  { id: 2, content: 'Vue.js is a progressive framework...' },
  { id: 3, content: 'Next.js is a React framework...' }
];

// 2. Split into chunks (if needed)
function splitIntoChunks(text, chunkSize = 500) {
  const words = text.split(' ');
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  return chunks;
}

// 3. Generate embeddings
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

// 4. Store in vector database
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

// Run preparation
const embeddings = await generateEmbeddings(documents);
await storeEmbeddings(embeddings);
```

### Stage 2: Retrieval (Find Relevant Content)

When user asks a question, find the most relevant documents:

```
User query → Generate embedding → Search vector DB → Return top K results
```

**Implementation**:

```javascript
async function retrieveRelevantDocs(query, topK = 3) {
  // 1. Generate query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query
  });

  // 2. Search vector database (using pgvector in Supabase)
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding.data[0].embedding,
    match_threshold: 0.7, // Similarity threshold
    match_count: topK
  });

  if (error) throw error;

  return data; // Array of relevant documents
}

// Example usage
const query = 'How do I use React hooks?';
const relevantDocs = await retrieveRelevantDocs(query);

console.log(relevantDocs);
// [
//   { id: 1, content: 'React hooks allow...', similarity: 0.92 },
//   { id: 5, content: 'useState is a hook...', similarity: 0.88 },
//   { id: 12, content: 'useEffect handles...', similarity: 0.85 }
// ]
```

**Vector Database Setup (Supabase with pgvector)**:

```sql
-- Enable pgvector extension
CREATE EXTENSION vector;

-- Create documents table
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1536) -- OpenAI embeddings are 1536 dimensions
);

-- Create index for fast similarity search
CREATE INDEX ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create similarity search function
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

### Stage 3: Generation (Create Answer with Context)

Combine retrieved documents with user query and generate answer:

```
Relevant docs + User query → Build prompt → Call LLM → Return answer
```

**Implementation**:

```javascript
async function generateAnswer(query, relevantDocs) {
  // Build context from relevant documents
  const context = relevantDocs
    .map((doc, i) => `Document ${i + 1}:\n${doc.content}`)
    .join('\n\n');

  // Create prompt with context
  const prompt = `You are a helpful assistant. Answer the question based on the provided documents.

Documents:
${context}

Question: ${query}

Instructions:
- Only use information from the provided documents
- If the documents don't contain the answer, say "I don't have enough information"
- Be concise and accurate
- Cite which document you're using (e.g., "According to Document 2...")

Answer:`;

  // Generate answer
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: prompt }
    ],
    temperature: 0.3 // Lower temperature for factual answers
  });

  return response.choices[0].message.content;
}

// Example: Complete RAG pipeline
async function ragQuery(userQuery) {
  const relevantDocs = await retrieveRelevantDocs(userQuery, 3);
  const answer = await generateAnswer(userQuery, relevantDocs);

  return {
    answer,
    sources: relevantDocs // Return sources for transparency
  };
}

// Usage
const result = await ragQuery('How do I use React hooks?');
console.log('Answer:', result.answer);
console.log('Sources:', result.sources);
```

## Production-Ready RAG System

### Complete Next.js API Route

```javascript
// app/api/rag/route.js
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return Response.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // 1. Generate query embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query
    });

    // 2. Search for relevant documents
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: embeddingResponse.data[0].embedding,
      match_threshold: 0.7,
      match_count: 3
    });

    if (error) throw error;

    if (documents.length === 0) {
      return Response.json({
        answer: "I couldn't find relevant information to answer your question.",
        sources: []
      });
    }

    // 3. Build context
    const context = documents
      .map((doc, i) => `[${i + 1}] ${doc.content}`)
      .join('\n\n');

    // 4. Generate answer
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Answer based only on the provided context. Cite sources using [1], [2], etc.'
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${query}`
        }
      ],
      temperature: 0.3
    });

    return Response.json({
      answer: completion.choices[0].message.content,
      sources: documents.map(doc => ({
        id: doc.id,
        content: doc.content,
        similarity: doc.similarity
      }))
    });

  } catch (error) {
    console.error('RAG error:', error);
    return Response.json(
      { error: 'Failed to process query' },
      { status: 500 }
    );
  }
}
```

### React Component

```typescript
// components/RAGChat.tsx
'use client';

import { useState } from 'react';

interface Source {
  id: number;
  content: string;
  similarity: number;
}

export function RAGChat() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (error) {
      console.error('Error:', error);
      setAnswer('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Searching...' : 'Ask'}
        </button>
      </form>

      {answer && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Answer:</h3>
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">Sources:</h3>
          {sources.map((source, i) => (
            <div key={source.id} className="mb-2 p-2 bg-gray-100 rounded">
              <span className="font-semibold">[{i + 1}]</span>
              <span className="ml-2 text-sm text-gray-600">
                (Similarity: {(source.similarity * 100).toFixed(1)}%)
              </span>
              <p className="mt-1 text-sm">{source.content.substring(0, 200)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Advanced RAG Patterns

### 1. Hybrid Search (Keyword + Vector)

Combine traditional keyword search with vector similarity:

```javascript
async function hybridSearch(query, topK = 5) {
  // Vector search
  const vectorResults = await retrieveRelevantDocs(query, topK);

  // Keyword search (full-text search)
  const { data: keywordResults } = await supabase
    .from('documents')
    .select()
    .textSearch('content', query)
    .limit(topK);

  // Merge and deduplicate results
  const allResults = [...vectorResults, ...keywordResults];
  const uniqueResults = Array.from(
    new Map(allResults.map(item => [item.id, item])).values()
  );

  // Re-rank by combined score
  return uniqueResults
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
    .slice(0, topK);
}
```

### 2. Reranking

Improve relevance by reranking retrieved documents:

```javascript
import Anthropic from '@anthropic-ai/sdk';

async function rerankDocuments(query, documents) {
  const anthropic = new Anthropic();

  const rankedDocs = [];

  for (const doc of documents) {
    const prompt = `On a scale of 0-10, how relevant is this document to the query?

Query: ${query}

Document: ${doc.content}

Respond with only a number 0-10:`;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      messages: [{ role: 'user', content: prompt }]
    });

    const score = parseFloat(response.content[0].text);
    rankedDocs.push({ ...doc, relevanceScore: score });
  }

  return rankedDocs
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .filter(doc => doc.relevanceScore >= 5); // Only keep relevant docs
}
```

### 3. Multi-Query RAG

Generate multiple variations of the query for better retrieval:

```javascript
async function multiQueryRAG(userQuery) {
  // Generate query variations
  const variations = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Generate 3 variations of the user query for better search results. Return as JSON array.'
      },
      {
        role: 'user',
        content: userQuery
      }
    ],
    response_format: { type: 'json_object' }
  });

  const queries = JSON.parse(variations.choices[0].message.content).queries;

  // Search with all queries
  const allResults = await Promise.all(
    queries.map(q => retrieveRelevantDocs(q, 2))
  );

  // Merge and deduplicate
  const flatResults = allResults.flat();
  const uniqueDocs = Array.from(
    new Map(flatResults.map(doc => [doc.id, doc])).values()
  );

  // Generate answer using all unique documents
  return await generateAnswer(userQuery, uniqueDocs);
}
```

### 4. Parent Document Retrieval

Store small chunks for retrieval, but use larger parent documents for context:

```javascript
// Store both chunks and full documents
async function storeWithParents(documents) {
  for (const doc of documents) {
    // Split into small chunks for better retrieval
    const chunks = splitIntoChunks(doc.content, 200);

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunks[i]
      });

      await supabase.from('chunks').insert({
        content: chunks[i],
        parent_id: doc.id,
        chunk_index: i,
        embedding: embedding.data[0].embedding
      });
    }

    // Store full document
    await supabase.from('documents').insert({
      id: doc.id,
      content: doc.content
    });
  }
}

// Retrieve chunks, but return parent documents
async function retrieveParentDocs(query) {
  const relevantChunks = await retrieveRelevantDocs(query);

  // Get parent IDs
  const parentIds = [...new Set(relevantChunks.map(c => c.parent_id))];

  // Fetch full parent documents
  const { data: parentDocs } = await supabase
    .from('documents')
    .select()
    .in('id', parentIds);

  return parentDocs;
}
```

## Vector Database Options

| Database | Type | Best For | Pricing |
|----------|------|----------|---------|
| **Pinecone** | Managed | Production, scale | Paid (free tier) |
| **Weaviate** | Self-hosted / Cloud | Open source, flexible | Free / Paid cloud |
| **pgvector** | Postgres extension | Existing Postgres apps | Free (hosting costs) |
| **Chroma** | Embedded | Local dev, prototyping | Free |
| **Qdrant** | Self-hosted / Cloud | High performance | Free / Paid cloud |
| **Milvus** | Self-hosted | Enterprise, billions of vectors | Free |

**Recommendation for Frontend Devs**:
- **Prototyping**: Chroma (easiest)
- **Production**: Supabase with pgvector (if using Postgres) or Pinecone (managed)
- **Scale**: Pinecone or Weaviate

## Common Challenges & Solutions

### Challenge 1: Poor Retrieval Quality

**Problem**: Retrieving irrelevant documents

**Solutions**:
- Increase embedding quality (use better models)
- Improve chunking strategy (overlap chunks)
- Use hybrid search (keyword + vector)
- Implement reranking
- Tune similarity threshold

### Challenge 2: Context Window Overflow

**Problem**: Too many retrieved documents exceed context limit

**Solutions**:
- Retrieve fewer documents (topK = 3 instead of 10)
- Summarize retrieved documents before injection
- Use models with larger context windows
- Implement chunk selection logic

### Challenge 3: Stale Data

**Problem**: Knowledge base not up-to-date

**Solutions**:
- Implement incremental updates
- Set up automated pipelines
- Add timestamps and filter old data
- Use webhooks to trigger updates

### Challenge 4: Cost

**Problem**: Embedding generation is expensive at scale

**Solutions**:
- Cache embeddings (don't regenerate)
- Use cheaper embedding models
- Batch embedding requests
- Only embed changed documents

## Best Practices

1. **Chunk Size**: 200-500 words for most use cases
2. **Overlap**: 20-50 words between chunks to preserve context
3. **TopK**: Start with 3-5 documents, tune based on results
4. **Temperature**: Use 0.2-0.4 for factual RAG responses
5. **Citations**: Always return sources for transparency
6. **Fallback**: Handle cases where no relevant docs are found
7. **Monitoring**: Track retrieval quality and user feedback
8. **Versioning**: Version your embeddings when changing models

## Next Steps

- **Implement basic RAG** with your product docs
- **Try the MCP Lab example** for tool integration
- **Explore Agent patterns** for multi-step RAG workflows
- **Optimize** with hybrid search and reranking

RAG is your gateway to building intelligent, knowledge-grounded AI applications. Master it to ship features that users love!
