# Recipe: Local Semantic Search (Embeddings)

**Problem**: You want to search through a list of items by *meaning* (Semantic Search), not just keywords, but you don't want to pay for a vector database or API calls.

**Solution**: Generate embeddings locally in the browser using Transformers.js.

## The Code

```typescript
import { pipeline } from '@xenova/transformers';

// 1. Singleton Pipeline (Load once)
class EmbeddingPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2'; // Small, fast model
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model);
    }
    return this.instance;
  }
}

// 2. Cosine Similarity Function
function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 3. Main Search Function
export async function search(query: string, documents: string[]) {
  const pipe = await EmbeddingPipeline.getInstance();

  // Embed query
  const queryEmbedding = await pipe(query, { pooling: 'mean', normalize: true });
  
  // Embed documents (In real app, pre-calculate these!)
  const results = [];
  for (const doc of documents) {
    const docEmbedding = await pipe(doc, { pooling: 'mean', normalize: true });
    
    const score = cosineSimilarity(
      Array.from(queryEmbedding.data), 
      Array.from(docEmbedding.data)
    );
    
    results.push({ doc, score });
  }

  // Sort by score (Highest first)
  return results.sort((a, b) => b.score - a.score);
}
```

## Performance Tips

1.  **Pre-calculate**: Don't embed your documents on every search. Generate them once (at build time or page load) and store them.
2.  **Web Workers**: Run this logic in a Web Worker to keep the UI smooth.
3.  **Model Size**: `all-MiniLM-L6-v2` is ~20MB (quantized). It loads fast even on 4G.
