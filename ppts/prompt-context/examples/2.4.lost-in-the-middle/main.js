/**
 * Lost in the Middle 模拟
 *
 * 模拟 LLM 对上下文中不同位置信息的注意力权重
 * 展示 U 型曲线：开头和结尾高，中间低
 */

// 模拟 50 条事实
const TOTAL_FACTS = 50;

// 关键信息
const KEY_INFO = '会议在 305 房间';

/**
 * 模拟注意力权重（U 型曲线）
 * 基于 Liu et al. 2023 的发现
 */
function simulateAttentionWeights(keyPosition, totalPositions) {
  // 归一化位置 (0 到 1)
  const normalizedPos = keyPosition / (totalPositions - 1);

  // U 型曲线公式：两端的注意力更高，中间低
  // Math.abs(pos - 0.5): 两端最大(0.5)，中间最小(0)
  // 乘以 2 后: 两端=1，中间=0
  // 不用 1 -，直接用这个值：两端高，中间低
  const uShapeRaw = 2 * Math.abs(normalizedPos - 0.5);

  // 缩放到 [0.3, 1.0] 范围
  const scaledValue = 0.3 + 0.7 * uShapeRaw;

  // 添加一些随机性模拟真实情况
  const noise = (Math.random() - 0.5) * 0.1;
  return Math.max(0, Math.min(1, scaledValue + noise));
}

/**
 * 模拟召回准确率（基于注意力权重）
 */
function simulateRecallAccuracy(attentionWeight) {
  // 注意力权重越高，召回准确率越高
  const baseAccuracy = 0.2; // 即使注意力很低，也有基础准确率
  return Math.min(0.95, baseAccuracy + attentionWeight * 0.75);
}

/**
 * 生成 ASCII 图形
 */
function generateAttentionGraph(weights) {
  const graph = [];
  const height = 20;

  for (let row = height; row >= 0; row--) {
    let line = '';
    const threshold = row / height;

    for (let i = 0; i < weights.length; i++) {
      if (weights[i] >= threshold) {
        line += '█';
      } else {
        line += ' ';
      }
    }
    graph.push(line);
  }

  return graph;
}

/**
 * 生成位置标签
 */
function generatePositionLabels() {
  return Array.from({ length: TOTAL_FACTS }, (_, i) => {
    if (i === 0) return '开';
    if (i === TOTAL_FACTS - 1) return '尾';
    if (i === Math.floor(TOTAL_FACTS / 2)) return '中';
    return ' ';
  }).join('');
}

// 主程序
console.log('='.repeat(60));
console.log('Lost in the Middle 模拟');
console.log('='.repeat(60));

console.log('\n📋 实验设置：');
console.log(`   - 总事实数量: ${TOTAL_FACTS}`);
console.log(`   - 关键信息: "${KEY_INFO}"`);
console.log(`   - 实验：将其放在不同位置，观察召回准确率`);

console.log('\n' + '-'.repeat(60));
console.log('\n🎯 实验 1: 关键信息在开头');
console.log('-'.repeat(60));

const positionStart = 0;
const weightStart = simulateAttentionWeights(positionStart, TOTAL_FACTS);
const accuracyStart = simulateRecallAccuracy(weightStart);

console.log(`   位置: ${positionStart + 1} / ${TOTAL_FACTS}`);
console.log(`   注意力权重: ${(weightStart * 100).toFixed(1)}%`);
console.log(`   召回准确率: ${(accuracyStart * 100).toFixed(1)}%`);
console.log(`   结果: ${accuracyStart > 0.7 ? '✅' : '⚠️ '} 表现${accuracyStart > 0.7 ? '良好' : '一般'}`);

console.log('\n' + '-'.repeat(60));
console.log('\n🎯 实验 2: 关键信息在中间');
console.log('-'.repeat(60));

const positionMiddle = Math.floor(TOTAL_FACTS / 2);
const weightMiddle = simulateAttentionWeights(positionMiddle, TOTAL_FACTS);
const accuracyMiddle = simulateRecallAccuracy(weightMiddle);

console.log(`   位置: ${positionMiddle + 1} / ${TOTAL_FACTS}`);
console.log(`   注意力权重: ${(weightMiddle * 100).toFixed(1)}%`);
console.log(`   召回准确率: ${(accuracyMiddle * 100).toFixed(1)}%`);
console.log(`   结果: ${accuracyMiddle > 0.7 ? '✅' : '❌ '} 表现${accuracyMiddle > 0.7 ? '良好' : '较差 - 容易被忽略！'}`);

console.log('\n' + '-'.repeat(60));
console.log('\n🎯 实验 3: 关键信息在结尾');
console.log('-'.repeat(60));

const positionEnd = TOTAL_FACTS - 1;
const weightEnd = simulateAttentionWeights(positionEnd, TOTAL_FACTS);
const accuracyEnd = simulateRecallAccuracy(weightEnd);

console.log(`   位置: ${positionEnd + 1} / ${TOTAL_FACTS}`);
console.log(`   注意力权重: ${(weightEnd * 100).toFixed(1)}%`);
console.log(`   召回准确率: ${(accuracyEnd * 100).toFixed(1)}%`);
console.log(`   结果: ${accuracyEnd > 0.7 ? '✅' : '⚠️ '} 表现${accuracyEnd > 0.7 ? '良好' : '一般'}`);

// 生成注意力曲线图
console.log('\n' + '='.repeat(60));
console.log('\n📊 Attention U 型曲线');
console.log('='.repeat(60));

const weights = Array.from({ length: TOTAL_FACTS }, (_, i) =>
  simulateAttentionWeights(i, TOTAL_FACTS)
);

const graph = generateAttentionGraph(weights);
graph.forEach(line => console.log('   ' + line));

console.log('   ' + generatePositionLabels());
console.log('   ' + '-'.repeat(TOTAL_FACTS));
console.log('   位置:  开头                              结尾');

// 对比表格
console.log('\n' + '='.repeat(60));
console.log('\n📈 召回准确率对比');
console.log('='.repeat(60));

const results = [
  { position: '开头', index: positionStart, weight: weightStart, accuracy: accuracyStart },
  { position: '中间', index: positionMiddle, weight: weightMiddle, accuracy: accuracyMiddle },
  { position: '结尾', index: positionEnd, weight: weightEnd, accuracy: accuracyEnd }
];

console.log('\n   位置    | 实际位置  | 注意力权重 | 召回准确率');
console.log('   ' + '-'.repeat(50));
results.forEach(r => {
  console.log(`   ${r.position.padEnd(6)} | ${String(r.index + 1).padStart(4)} / ${TOTAL_FACTS} | ${(r.weight * 100).toFixed(1).padStart(6)}%    | ${(r.accuracy * 100).toFixed(1)}%`.padEnd(50));
});

// 结论
console.log('\n' + '='.repeat(60));
console.log('\n💡 结论');
console.log('='.repeat(60));

const improvement = ((accuracyEnd + accuracyStart) / 2 - accuracyMiddle) * 100;

console.log(`
   研究发现（Liu et al. 2023）：

   1. LLM 对开头和结尾的信息召回效果最好
   2. 中间位置的信息容易被"遗忘"

   本模拟结果：
   - 开头召回率: ${(accuracyStart * 100).toFixed(1)}%
   - 中间召回率: ${(accuracyMiddle * 100).toFixed(1)}%
   - 结尾召回率: ${(accuracyEnd * 100).toFixed(1)}%
   - 中间相比平均损失: ${improvement.toFixed(1)}%

   实际建议：
   ✅ 将关键信息放在开头或结尾
   ✅ 重要信息可以重复（前后都放）
   ✅ 使用 <key> 等标记强调关键内容
`);

console.log('='.repeat(60));
console.log('\n✅ 模拟运行成功！\n');
