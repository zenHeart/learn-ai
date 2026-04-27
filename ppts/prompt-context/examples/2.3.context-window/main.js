/**
 * Token Calculator - Context Window 示例
 *
 * 规则：
 * - 中文：每个字符 ≈ 2 tokens
 * - 英文：每个单词 ≈ 1.3 tokens
 * - 数字/标点：每个 ≈ 1 token
 */

// 模型定价（以 Claude Sonnet 4.5 为例）
const MODEL_PRICING = {
  inputPerMillion: 3,    // $3 / 1M tokens
  outputPerMillion: 15  // $15 / 1M tokens
};

// 示例文档
const sampleDocument = `Claude is a powerful AI assistant developed by Anthropic.
它可以帮助完成写作、编码、分析等多种任务。
Our team held a meeting on April 15th to review the quarterly results.
会议讨论了产品路线图和技术架构的优化方案。
The next quarterly planning session will be held in Shanghai.`;

const sampleDocument2 = `The quick brown fox jumps over the lazy dog.
这是一只敏捷的棕色狐狸跳过了一只懒狗。
1234567890
!@#$%^&*()`;

/**
 * 估算文本的 token 数量
 */
function estimateTokens(text) {
  let tokens = 0;

  for (const char of text) {
    const code = char.charCodeAt(0);

    // 中文范围（包括中文标点）
    if (code >= 0x4E00 && code <= 0x9FFF) {
      tokens += 2;
    }
    // 日文、韩文等 CJK 扩展
    else if (code >= 0x3000 && code <= 0x303F) {
      tokens += 2; // CJK 标点
    }
    // 拉丁字母 (英文等)
    else if ((code >= 0x0041 && code <= 0x007A) || (code >= 0x0061 && code <= 0x007A)) {
      tokens += 0.25; // 平均每字符（英文单词中）
    }
    // 数字
    else if (code >= 0x0030 && code <= 0x0039) {
      tokens += 1;
    }
    // 常见标点符号
    else if ('.,!?;:\'"()-_'.includes(char)) {
      tokens += 0.5;
    }
    // 空格
    else if (char === ' ' || char === '\n' || char === '\t') {
      tokens += 0.1;
    }
    // 其他字符
    else {
      tokens += 1;
    }
  }

  // 英文单词估算调整（基于空格数量）
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  const englishWordBonus = wordCount * 1.0; // 每个英文单词额外 +1 token

  // 更精确的计算：中文按字符，英文按单词
  let chineseChars = 0;
  let englishWords = 0;
  let currentWord = '';

  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0x4E00 && code <= 0x9FFF) {
      if (currentWord.length > 0) {
        englishWords++;
        currentWord = '';
      }
      chineseChars++;
    } else if (char === ' ' || char === '\n' || char === '\t') {
      if (currentWord.length > 0) {
        englishWords++;
        currentWord = '';
      }
    } else {
      currentWord += char;
    }
  }
  if (currentWord.length > 0) englishWords++;

  // 计算 tokens
  const chineseTokens = chineseChars * 2; // 中文每个字 2 tokens
  const englishTokens = englishWords * 1.3; // 英文每个词 1.3 tokens

  return Math.ceil(chineseTokens + englishTokens);
}

/**
 * 计算成本
 */
function calculateCost(tokens, isInput = true) {
  const price = isInput ? MODEL_PRICING.inputPerMillion : MODEL_PRICING.outputPerMillion;
  return (tokens / 1_000_000) * price;
}

/**
 * 格式化成本显示
 */
function formatCost(cost) {
  if (cost < 0.001) {
    return `$${(cost * 1000).toFixed(4)} (千分之一美元)`;
  } else if (cost < 1) {
    return `$${cost.toFixed(4)}`;
  } else {
    return `$${cost.toFixed(2)}`;
  }
}

// 主程序
console.log('='.repeat(60));
console.log('Token 计算与 Context Window 示例');
console.log('='.repeat(60));

// 示例 1
console.log('\n📄 示例文档 1:\n');
console.log(sampleDocument);
const tokens1 = estimateTokens(sampleDocument);
console.log(`\n📊 Token 估算: ${tokens1} tokens`);
console.log(`💰 输入成本: ${formatCost(calculateCost(tokens1, true))}`);
console.log(`💰 输出成本: ${formatCost(calculateCost(tokens1, false))}`);

// 示例 2
console.log('\n' + '-'.repeat(60));
console.log('\n📄 示例文档 2:\n');
console.log(sampleDocument2);
const tokens2 = estimateTokens(sampleDocument2);
console.log(`\n📊 Token 估算: ${tokens2} tokens`);
console.log(`💰 输入成本: ${formatCost(calculateCost(tokens2, true))}`);
console.log(`💰 输出成本: ${formatCost(calculateCost(tokens2, false))}`);

// Context Window 比较
console.log('\n' + '='.repeat(60));
console.log('\n📏 Context Window 比较（不同模型）');
console.log('='.repeat(60));

const models = [
  { name: 'Claude 3.5 Haiku', context: 200_000 },
  { name: 'Claude 3.5 Sonnet', context: 200_000 },
  { name: 'Claude 3 Opus', context: 200_000 },
  { name: 'GPT-4 Turbo', context: 128_000 },
  { name: 'Gemini 1.5 Pro', context: 1_000_000 }
];

models.forEach(model => {
  const usagePercent = (tokens1 / model.context * 100).toFixed(6);
  console.log(`\n${model.name} (${model.context.toLocaleString()} tokens):`);
  console.log(`  示例文档 1 占比: ${usagePercent}%`);
  console.log(`  剩余空间: ${(model.context - tokens1).toLocaleString()} tokens`);
});

console.log('\n' + '='.repeat(60));
console.log('\n✅ 运行成功！');
