# Vector Databases & Embeddings

## What Are Embeddings?

**Embeddings** are numerical representations of text (or other data) that capture semantic meaning in high-dimensional space. They're the foundation of semantic search, recommendation systems, and RAG applications.

**Think of it like**: Converting text into coordinates in a multi-dimensional space where similar concepts are close together.

```javascript
// Text → Embedding (simplified visualization)
"cat" → [0.2, 0.8, 0.1, 0.9, ...]  // 1536 dimensions
"dog" → [0.3, 0.7, 0.2, 0.8, ...]  // Close to "cat"
"car" → [0.9, 0.1, 0.8, 0.2, ...]  // Far from "cat"
```

**Why embeddings matter**:
- Enable semantic search (meaning-based, not keyword-based)
- Power RAG systems with relevant context retrieval
- Essential for similarity matching and clustering
- Much cheaper than running LLMs for every search

## How Embeddings Work

### Creating Embeddings

```javascript
import { OpenAI } from 'openai';

const openai = new OpenAI();

async function createEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',  // or text-embedding-3-large
    input: text,
  });

  return response.data[0].embedding; // Array of 1536 numbers
}

// Example
const embedding = await createEmbedding('How do I reset my password?');
console.log(embedding.length); // 1536
```

### Measuring Similarity

**Cosine Similarity**: Measure how similar two embeddings are (0 = unrelated, 1 = identical)

```javascript
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return dotProduct / (magnitudeA * magnitudeB);
}

// Example
const query = await createEmbedding('password reset');
const doc1 = await createEmbedding('To reset your password, go to settings');
const doc2 = await createEmbedding('The weather is sunny today');

console.log(cosineSimilarity(query, doc1)); // ~0.85 (very similar)
console.log(cosineSimilarity(query, doc2)); // ~0.12 (unrelated)
```

## Vector Databases

**Vector databases** store embeddings and enable fast similarity search at scale. They're optimized for high-dimensional vectors, unlike traditional databases.

### Why Not Use Traditional Databases?

| Traditional DB (Postgres) | Vector DB (Pinecone) |
|---------------------------|----------------------|
| Fast for exact matches | Fast for similarity search |
| Keyword search | Semantic search |
| Scales to millions of rows | Scales to billions of vectors |
| Not optimized for high-dimensional data | Built for embeddings |

### Popular Vector Databases

#### 1. Pinecone (Managed Cloud)

**Best for**: Production apps, hassle-free scaling

```javascript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index('my-index');

// Upsert vectors
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

// Search similar vectors
const queryEmbedding = await createEmbedding('password help');
const results = await index.query({
  vector: queryEmbedding,
  topK: 3,
  includeMetadata: true
});

console.log(results.matches);
// [{ id: 'doc-1', score: 0.92, metadata: {...} }, ...]
```

#### 2. Chroma (Open Source, Embeddable)

**Best for**: Local development, prototyping

```javascript
import { ChromaClient } from 'chromadb';

const client = new ChromaClient();

// Create collection
const collection = await client.createCollection({
  name: 'my_docs',
  metadata: { description: 'Documentation embeddings' }
});

// Add documents (Chroma auto-generates embeddings with default model)
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

// Query
const results = await collection.query({
  queryTexts: ['password help'],
  nResults: 2
});

console.log(results);
```

#### 3. pgvector (Postgres Extension)

**Best for**: Existing Postgres users, unified database

```sql
-- Enable extension
CREATE EXTENSION vector;

-- Create table with vector column
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- 1536 dimensions for OpenAI embeddings
);

-- Create index for fast similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);

-- Insert documents
INSERT INTO documents (content, embedding)
VALUES ('How to reset password', '[0.1, 0.2, ...]');

-- Search similar documents
SELECT content, 1 - (embedding <=> '[query_embedding]') AS similarity
FROM documents
ORDER BY embedding <=> '[query_embedding]'
LIMIT 5;
```

**JavaScript client**:

```javascript
import { Pool } from 'pg';
import pgvector from 'pgvector/pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Register pgvector types
await pool.query('CREATE EXTENSION IF NOT EXISTS vector');

// Insert embedding
const embedding = await createEmbedding('password reset');
await pool.query(
  'INSERT INTO documents (content, embedding) VALUES ($1, $2)',
  ['How to reset password', pgvector.toSql(embedding)]
);

// Search
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

#### 4. Weaviate (Open Source, Hybrid Search)

**Best for**: Advanced features, hybrid keyword + semantic search

```javascript
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

// Create schema
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

// Add documents
await client.data
  .creator()
  .withClassName('Document')
  .withProperties({
    content: 'How to reset your password',
    category: 'support'
  })
  .do();

// Search
const result = await client.graphql
  .get()
  .withClassName('Document')
  .withNearText({ concepts: ['password help'] })
  .withLimit(3)
  .withFields('content category _additional { distance }')
  .do();

console.log(result.data.Get.Document);
```

## Embedding Models Comparison

| Model | Dimensions | Cost | Performance | Use Case |
|-------|------------|------|-------------|----------|
| **OpenAI text-embedding-3-small** | 1536 | $0.02/1M tokens | Good | Most applications |
| **OpenAI text-embedding-3-large** | 3072 | $0.13/1M tokens | Best | High accuracy needs |
| **Cohere embed-v3** | 1024 | $0.10/1M tokens | Excellent | Multilingual |
| **Sentence Transformers (local)** | 384-768 | Free (self-hosted) | Good | Privacy-sensitive |

## RAG with Vector Databases

Complete implementation combining embeddings + vector DB + LLM:

```javascript
import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI();
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index('knowledge-base');

// Step 1: Index your documents
async function indexDocuments(documents) {
  for (const doc of documents) {
    // Create embedding
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: doc.content,
    });

    // Store in vector DB
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

// Step 2: Retrieve relevant context
async function retrieveContext(query, topK = 3) {
  // Embed the query
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  // Search vector DB
  const results = await index.query({
    vector: queryEmbedding.data[0].embedding,
    topK,
    includeMetadata: true
  });

  // Extract relevant documents
  return results.matches.map(match => ({
    content: match.metadata.content,
    title: match.metadata.title,
    score: match.score
  }));
}

// Step 3: Generate answer with RAG
async function answerQuestion(question) {
  // Retrieve relevant documents
  const context = await retrieveContext(question);

  // Build prompt with context
  const systemPrompt = `You are a helpful assistant. Answer questions based on the provided context.

Context:
${context.map((doc, i) => `[${i + 1}] ${doc.title}\n${doc.content}`).join('\n\n')}

If the context doesn't contain the answer, say "I don't have enough information to answer that."`;

  // Generate answer
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

// Usage
const result = await answerQuestion('How do I reset my password?');
console.log(result.answer);
console.log('Sources:', result.sources);
```

## Advanced Techniques

### 1. Hybrid Search (Keyword + Semantic)

Combine traditional keyword search with vector similarity for best results:

```javascript
async function hybridSearch(query, topK = 5) {
  // Vector search
  const vectorResults = await vectorSearch(query, topK * 2);

  // Keyword search
  const keywordResults = await keywordSearch(query, topK * 2);

  // Merge and re-rank (Reciprocal Rank Fusion)
  const merged = mergeResults(vectorResults, keywordResults);

  return merged.slice(0, topK);
}
```

### 2. Chunking Strategies

Break large documents into optimal chunks for embedding:

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
    start = end - overlap; // Overlap for context continuity
  }

  return chunks;
}
```

### 3. Re-ranking

Improve retrieval accuracy by re-ranking initial results:

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

## Best Practices

1. **Chunk Size**: 200-500 tokens is optimal for most use cases
2. **Overlap**: Use 10-20% overlap between chunks for continuity
3. **Metadata**: Store rich metadata (title, tags, timestamps) for filtering
4. **Batch Processing**: Embed documents in batches to reduce API calls
5. **Caching**: Cache embeddings to avoid re-computing
6. **Monitoring**: Track embedding costs and vector DB query performance
7. **Filtering**: Use metadata filters before vector search to narrow scope
8. **Freshness**: Regularly update your vector database as content changes

## Common Pitfalls

1. **Wrong Chunk Size**: Too large → loses specificity, too small → loses context
2. **No Metadata**: Can't filter results by category, date, etc.
3. **Stale Embeddings**: Forgetting to update when documents change
4. **Single Search Strategy**: Not combining keyword + semantic search
5. **Ignoring Costs**: Embedding millions of documents can get expensive

## Cost Optimization

```javascript
// Bad: Embedding entire documents repeatedly
for (const doc of documents) {
  const embedding = await createEmbedding(doc.fullText); // Expensive!
}

// Good: Chunk + batch + cache
const chunks = documents.flatMap(doc => chunkDocument(doc.fullText));
const batchSize = 100;

for (let i = 0; i < chunks.length; i += batchSize) {
  const batch = chunks.slice(i, i + batchSize);

  const embeddings = await openai.embeddings.create({
    model: 'text-embedding-3-small', // Cheaper model
    input: batch.map(c => c.text)
  });

  // Store embeddings with cache
  await cacheEmbeddings(batch, embeddings.data);
}
```

## Vector DB Comparison

| Feature | Pinecone | Chroma | pgvector | Weaviate |
|---------|----------|--------|----------|----------|
| **Hosting** | Cloud only | Self-hosted | Postgres ext | Both |
| **Setup** | Easy | Very easy | Medium | Medium |
| **Scalability** | Excellent | Good | Good | Excellent |
| **Cost** | Starts $70/mo | Free | Postgres costs | Free (OSS) |
| **Best For** | Production | Prototyping | Existing Postgres | Advanced features |

## Next Steps

- **Start Simple**: Use Chroma for local prototyping
- **Production**: Choose Pinecone for managed or Weaviate for self-hosted
- **Implement RAG**: Combine with [RAG Guide](/tech/patterns/RAG) for complete system
- **Optimize**: Profile performance and costs before scaling

Vector databases and embeddings are the backbone of modern AI applications. Master them to build powerful semantic search, RAG systems, and recommendation engines!
