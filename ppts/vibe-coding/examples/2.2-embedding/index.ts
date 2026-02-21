/**
 * 这个文件演示了如何计算文本向量的相似度（Embedding 核心原理）
 */

// 我们模拟大模型生成的 3 维特征向量（真实中通常是 1536 维等）
// 假设三个维度代表: [水果属性, 科技属性, 交通工具属性]
const embeddings: Record<string, number[]> = {
  apple: [0.9, 0.1, 0.0],
  orange: [0.8, 0.0, 0.0],
  computer: [0.0, 0.9, 0.1],
  car: [0.0, 0.1, 0.9],
};

// 计算两个向量的余弦相似度 (Cosine Similarity)
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

console.log("🌌 向量相似度 (Embedding) 演示实验\n");
console.log(
  "在这个实验中，我们预定义了一些词的特征向量，用来模拟大模型的 Embedding 结果。",
);

const comparisons = [
  { word1: "apple", word2: "orange", desc: "苹果 vs 橘子 (同类)" },
  { word1: "apple", word2: "computer", desc: "苹果 vs 电脑 (非同类)" },
  { word1: "car", word2: "computer", desc: "汽车 vs 电脑" },
];

comparisons.forEach(({ word1, word2, desc }) => {
  const vec1 = embeddings[word1];
  const vec2 = embeddings[word2];
  const similarity = cosineSimilarity(vec1, vec2);

  console.log(`【${desc}】`);
  console.log(`  ${word1} 向量: [${vec1.join(", ")}]`);
  console.log(`  ${word2} 向量: [${vec2.join(", ")}]`);
  console.log(`  💡 余弦相似度: ${(similarity * 100).toFixed(2)}%\n`);
});

console.log(
  "📌 结论: Semantic 相似的意思在多维空间中总是更靠近彼此。这也是基于向量的 RAG 检索的核心基础！",
);
