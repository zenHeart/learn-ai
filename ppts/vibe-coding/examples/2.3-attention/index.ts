/**
 * 这个文件通过一个极简版的“玩具模型”演示了 Transformer 架构中最核心的注意力机制 (Self-Attention)。
 */

// 1. 假设有一句话："猫 坐 在 毯子 上"
// 为了演示，我们把这些词映射为简化的二维特征向量
const words = ["猫", "坐", "毯子"];
const embeddings = [
  [1.0, 0.1], // "猫" (名词/动物特征强)
  [0.1, 0.8], // "坐" (动词特征强)
  [0.9, 0.0], // "毯子" (名词特征强，与猫有一定关联)
];

// 2. Transformer 的三个核心概念: Query (Q, 提问者), Key (K, 回答者), Value (V, 实际内容)
// 在生产级大模型中，这些向量是通过特征提取出来的。这里为了演示，假设我们直接使用 embeddings。
const Q = embeddings;
const K = embeddings;
const V = embeddings;

console.log("🧠 自注意力机制 (Self-Attention) 演示\n");

// 3. 开始计算注意力分数
console.log("===============================");
console.log("步骤 1: Q(提问者) 与 K(回答者) 点积计算相似度");
const scores: number[][] = [];
for (let i = 0; i < words.length; i++) {
  const wordScores: number[] = [];
  for (let j = 0; j < words.length; j++) {
    // Dot product between Q[i] and K[j]
    const score = Q[i][0] * K[j][0] + Q[i][1] * K[j][1];
    wordScores.push(score);
  }
  scores.push(wordScores);
}

// 打印原始注意力分数
words.forEach((word, i) => {
  console.log(
    `[${word}] 关注 -> ` +
      words.map((w, j) => `${w}: ${scores[i][j].toFixed(2)}`).join(" | "),
  );
});

// 4. Softmax 归一化（将分数值缩小到 0-1 之间，使其变成概率）
console.log("\n===============================");
console.log("步骤 2: Softmax 处理 (将分数变成百分比概率)");
const attentionWeights: number[][] = [];
for (let i = 0; i < scores.length; i++) {
  const expScores = scores[i].map(Math.exp);
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  const weights = expScores.map((e) => e / sumExp);
  attentionWeights.push(weights);
}

// 打印注意力权重
words.forEach((word, i) => {
  console.log(
    `[${word}] 分配注意力 -> ` +
      words
        .map((w, j) => `${w}: ${(attentionWeights[i][j] * 100).toFixed(1)}%`)
        .join(" | "),
  );
});

// 5. 将注意力权重应用到 Value 上（得出融合了上下文信息的最终向量表示）
console.log("\n===============================");
console.log("步骤 3: 结合 V 计算最终的语义特征 (包含上下文)");
const outputVectors: number[][] = [];
for (let i = 0; i < words.length; i++) {
  const outVec = [0, 0];
  for (let j = 0; j < words.length; j++) {
    outVec[0] += attentionWeights[i][j] * V[j][0];
    outVec[1] += attentionWeights[i][j] * V[j][1];
  }
  outputVectors.push(outVec);
}

words.forEach((word, i) => {
  const rawSum = (embeddings[i][0] + embeddings[i][1]).toFixed(2);
  const outSum = (outputVectors[i][0] + outputVectors[i][1]).toFixed(2);
  console.log(
    `[${word}] 特征融合结果: 原始总和 [${rawSum}] -> 融合后 [${outSum}] (吸收了周围词的信息)`,
  );
});

console.log(
  "\n📌 结论: 注意力机制帮助大模型在阅读 '毯子' 这个词时，能动态将目光转移并聚合 '猫' 的特征，形成关联！",
);
