/**
 * Chain-of-Thought 与扩展思考示例
 *
 * 本脚本演示：
 * 1. 不使用 CoT 的回答（直接给出答案）
 * 2. 使用 CoT 的回答（展示推理过程）
 * 3. 扩展思考的回答（更详细的验证步骤）
 */

// ============================================
// 问题定义
// ============================================

const problem = {
  question: `一个水池有进水管和出水管。
进水管每分钟注水 15 升，出水管每分钟出水 9 升。
最初水池有 100 升水。
同时打开两个水管，30 分钟后水池有多少水？`,
  answer: 280  // 正确答案是 280 升
};

// ============================================
// 模拟不同的回答方式
// ============================================

/**
 * 不使用 CoT：直接给出答案
 * 常见错误：估算错误、计算失误
 */
function answerWithoutCoT() {
  // 模拟模型直接猜测（可能出错）
  const guess = 100 + (15 - 9) * 30; // 正确
  // 但也可能是: 100 + 15 * 30 - 9 * 30 = 280 同样正确
  // 或者更复杂的错误: 100 + 15 - 9 * 30 = ... 等

  return {
    type: "直接回答",
    answer: guess,
    reasoning: null
  };
}

/**
 * 使用 Chain-of-Thought：展示逐步推理
 */
function answerWithCoT() {
  // 第一步：计算净流量
  const netFlow = 15 - 9; // 6 升/分钟

  // 第二步：计算 30 分钟净增加
  const totalNetIncrease = netFlow * 30; // 180 升

  // 第三步：计算最终水量
  const finalWater = 100 + totalNetIncrease; // 280 升

  return {
    type: "Chain-of-Thought",
    answer: finalWater,
    reasoning: `第一步：计算净流量 = 15 - 9 = ${netFlow} 升/分钟
第二步：30 分钟净增加 = ${netFlow} × 30 = ${totalNetIncrease} 升
第三步：最终水量 = 100 + ${totalNetIncrease} = ${finalWater} 升
答案: ${finalWater} 升`
  };
}

/**
 * 扩展思考：更详细的验证步骤
 */
function answerWithExtendedThinking() {
  const steps = [];

  // 步骤 1：理解问题
  steps.push({
    title: "理解问题",
    content: `已知条件：
  - 进水管: 15 升/分钟
  - 出水管: 9 升/分钟
  - 初始水量: 100 升
  - 时间: 30 分钟
  目标: 计算 30 分钟后的水量`
  });

  // 步骤 2：计算净流量
  const netFlow = 15 - 9;
  steps.push({
    title: "计算净流量",
    content: `净流量 = 进水 - 出水 = 15 - 9 = ${netFlow} 升/分钟
这意味着每分钟水池净增加 ${netFlow} 升水`
  });

  // 步骤 3：计算总变化
  const totalNetIncrease = netFlow * 30;
  steps.push({
    title: "计算总变化",
    content: `30 分钟净增加 = ${netFlow} × 30 = ${totalNetIncrease} 升`
  });

  // 步骤 4：验证（扩展思考的关键）
  const totalIn = 15 * 30;
  const totalOut = 9 * 30;
  steps.push({
    title: "验证答案",
    content: `进水量 = 15 × 30 = ${totalIn} 升
出水量 = 9 × 30 = ${totalOut} 升
净增加 = ${totalIn} - ${totalOut} = ${totalNetIncrease} 升 ✓`
  });

  // 步骤 5：最终计算
  const finalWater = 100 + totalNetIncrease;
  steps.push({
    title: "计算最终结果",
    content: `最终水量 = 初始水量 + 净增加
           = 100 + ${totalNetIncrease}
           = ${finalWater} 升`
  });

  return {
    type: "扩展思考",
    answer: finalWater,
    reasoning: steps
  };
}

// ============================================
// 演示输出
// ============================================

console.log("=".repeat(60));
console.log("Chain-of-Thought 与扩展思考对比");
console.log("=".repeat(60));

console.log("\n【问题】\n");
console.log(problem.question);

console.log("\n" + "=".repeat(60));
console.log("方式 1: 不使用 CoT（直接回答）");
console.log("=".repeat(60));

const noCoT = answerWithoutCoT();
console.log(`\n回答: ${noCoT.answer} 升\n`);
console.log("问题: 缺少推理过程，无法验证答案是否正确");

console.log("\n" + "=".repeat(60));
console.log("方式 2: 使用 Chain-of-Thought");
console.log("=".repeat(60));

const cot = answerWithCoT();
console.log(`\n${cot.reasoning}\n`);
console.log(`最终答案: ${cot.answer} 升`);

console.log("\n" + "=".repeat(60));
console.log("方式 3: 扩展思考");
console.log("=".repeat(60));

const extended = answerWithExtendedThinking();
console.log("\n【详细的思考过程】\n");

extended.reasoning.forEach((step, index) => {
  console.log(`${index + 1}. ${step.title}`);
  console.log(`   ${step.content.replace(/\n/g, "\n   ")}`);
  console.log();
});

console.log("=".repeat(60));
console.log("最终答案");
console.log("=".repeat(60));
console.log(`\n${extended.answer} 升\n`);

// ============================================
// 验证三种方式的正确性
// ============================================

console.log("=".repeat(60));
console.log("答案验证");
console.log("=".repeat(60));

console.log(`
┌─────────────────┬────────┬─────────────┐
│ 方式            │ 答案   │ 正确性      │
├─────────────────┼────────┼─────────────┤
│ 无 CoT          │ ${noCoT.answer.toString().padEnd(6)} │ ${noCoT.answer === problem.answer ? "✓" : "✗"}           │
│ Chain-of-Thought │ ${cot.answer.toString().padEnd(6)} │ ${cot.answer === problem.answer ? "✓" : "✗"}           │
│ 扩展思考        │ ${extended.answer.toString().padEnd(6)} │ ${extended.answer === problem.answer ? "✓" : "✗"}           │
└─────────────────┴────────┴─────────────┘
`);

// ============================================
// CoT 失效的场景示例
// ============================================

console.log("=".repeat(60));
console.log("CoT 可能失效的场景");
console.log("=".repeat(60));

const complexProblem = "计算: 237 × 89 + 156 ÷ 12 - 34²";

console.log(`\n问题: ${complexProblem}\n`);

console.log("标准 CoT:");
console.log("  237 × 89 = 21093");
console.log("  156 ÷ 12 = 13");
console.log("  34² = 1156");
console.log("  21093 + 13 - 1156 = 19950");
console.log("\n扩展思考（带验证）:");
console.log("  237 × 89 = ? 让我验算...");
console.log("  200×89 = 17800, 37×89 = 3293");
console.log("  17800 + 3293 = 21093 ✓");
console.log("  156 ÷ 12 = 13 ✓");
console.log("  34² = 34 × 34 = 1156 ✓");
console.log("  21093 + 13 = 21106");
console.log("  21106 - 1156 = 19950 ✓");
console.log("\n两者都能得到正确答案 19950，但在更复杂的问题中，");
console.log("扩展思考的自我验证能 catch 更多错误。");
