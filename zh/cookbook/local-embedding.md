# 秘籍：本地语义搜索 (Embeddings)

**问题**: 你想通过**含义**（语义搜索）而不仅仅是关键词来搜索列表项，但你不想为向量数据库或 API 调用付费。

**解决方案**: 使用 Transformers.js 在浏览器中本地生成 Embeddings。

## 代码实现

```typescript
import { pipeline } from '@xenova/transformers';

// 1. 单例 Pipeline (只加载一次)
class EmbeddingPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2'; // 小而快的模型
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model);
    }
    return this.instance;
  }
}

// 2. 余弦相似度函数
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

// 3. 主搜索函数
export async function search(query: string, documents: string[]) {
  const pipe = await EmbeddingPipeline.getInstance();

  // 嵌入查询
  const queryEmbedding = await pipe(query, { pooling: 'mean', normalize: true });
  
  // 嵌入文档 (在真实应用中，请预先计算这些！)
  const results = [];
  for (const doc of documents) {
    const docEmbedding = await pipe(doc, { pooling: 'mean', normalize: true });
    
    const score = cosineSimilarity(
      Array.from(queryEmbedding.data), 
      Array.from(docEmbedding.data)
    );
    
    results.push({ doc, score });
  }

  // 按分数排序 (最高分在前)
  return results.sort((a, b) => b.score - a.score);
}
```

## 性能提示

1.  **预计算**: 不要每次搜索都嵌入文档。生成一次（在构建时或页面加载时）并存储它们。
2.  **Web Workers**: 在 Web Worker 中运行此逻辑以保持 UI 流畅。
3.  **模型大小**: `all-MiniLM-L6-v2` 只有约 20MB (量化后)。即使在 4G 网络下加载也很快。