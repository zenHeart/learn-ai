# 2.2 Embedding (词嵌入与向量相似度)

## 概念解析
计算机擅长处理数字和向量。为了能让计算机懂得“语义关联”，AI 领域使用 **[Embedding](https://developers.google.com/mace-learning/crash-course/embeddings/embedding-space?hl=zh-cn)**（嵌入）将任何非结构化数据（文本、图片、代码等）映射到一个高维的数学空间中（比如 OpenAI 的 `text-embedding-ada-002` 拥有 1536 维度的浮点数）。

如果两句话在语义上是非常相关的，它们在这个高维空间里的“距离”应该非常短。我们常常通过**余弦相似度 (Cosine Similarity)** 或者**欧几里得距离**进行数学上的比较。这种基于语义相似度而非单纯字面检索的方法，是 RAG（检索增强生成）、代码库 AI 搜索等现代应用最底层的引擎。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:2.2
```

## 核心要点
* Embedding 把任何内容变成了特定维度的高维坐标。
* 余弦相似度越接近 1 代表含义越近似点。
