/**
 * Zero-Shot vs Few-Shot Learning 示例
 *
 * 本脚本演示两种不同的提示方式：
 * 1. Zero-Shot: 直接提问，不提供示例
 * 2. Few-Shot: 提供几个示例，帮助模型理解任务模式
 */

// ============================================
// 模拟的模型响应（实际使用时需要接入 LLM API）
// ============================================

/**
 * 模拟 Zero-Shot 响应
 * 直接要求写快排，模型依靠预训练知识
 */
function zeroShotResponse() {
  return `function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}`;
}

/**
 * 模拟 Few-Shot 响应
 * 给出了三个排序示例后，模型按照相同风格输出快排
 */
function fewShotResponse() {
  return `// 快速排序
function quickSort(arr) {
  // 基线条件：数组为空或只有一个元素直接返回
  if (arr.length <= 1) {
    return arr;
  }

  // 选择中间元素作为基准值
  const pivot = arr[Math.floor(arr.length / 2)];

  // 划分：小于基准的放左边，大于的放右边
  const left = [];
  const middle = [];
  const right = [];

  for (const item of arr) {
    if (item < pivot) {
      left.push(item);
    } else if (item > pivot) {
      right.push(item);
    } else {
      middle.push(item);
    }
  }

  // 递归排序并合并结果
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`;
}

// ============================================
// 演示代码
// ============================================

console.log("=".repeat(60));
console.log("Zero-Shot vs Few-Shot Learning 对比");
console.log("=".repeat(60));

console.log("\n--- Zero-Shot 示例 ---\n");
console.log("Prompt: 写一个 JavaScript 快速排序算法\n");
console.log("Response:");
console.log(zeroShotResponse());

console.log("\n" + "-".repeat(60));
console.log("\n--- Few-Shot 示例 ---\n");

const fewShotPrompt = `Prompt: 下面是三个排序算法的实现风格：

// 冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 选择排序
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

// 插入排序
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }
  return arr;
}

请用相同的代码风格写一个快速排序算法。`;

console.log(fewShotPrompt);
console.log("\nResponse:");
console.log(fewShotResponse());

console.log("\n" + "=".repeat(60));
console.log("对比分析:");
console.log("=".repeat(60));
console.log(`
| 特性         | Zero-Shot              | Few-Shot                    |
|-------------|------------------------|-----------------------------|
| 代码风格     | 随机/简洁              | 与示例一致                   |
| 注释         | 可能没有               | 有（与示例相同风格）          |
| 边界处理     | 可能忽略               | 通常会处理                   |
| Token 消耗  | 较少                   | 较多（需要包含示例）          |
| 输出一致性   | 不稳定                 | 稳定                         |
`);

// ============================================
// 测试代码实际运行效果
// ============================================

console.log("\n--- 实际运行 Few-Shot 生成的快排 ---\n");

// 直接使用 Few-Shot 生成的代码
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];

  const left = [];
  const middle = [];
  const right = [];

  for (const item of arr) {
    if (item < pivot) {
      left.push(item);
    } else if (item > pivot) {
      right.push(item);
    } else {
      middle.push(item);
    }
  }

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

const testArray = [64, 34, 25, 12, 22, 11, 90, 5];
console.log(`原始数组: [${testArray.join(", ")}]`);
console.log(`排序后:   [${quickSort(testArray).join(", ")}]`);
