# Zero-Shot vs Few-Shot Learning

## 概念解释

### Zero-Shot Learning（零样本学习）

直接给出任务指令，不提供任何示例。模型依靠预训练知识理解和执行任务。

**优点**: 简洁、快速，适合通用任务
**缺点**: 对复杂或特定格式要求的任务，效果可能不稳定

### Few-Shot Learning（少样本学习）

在任务指令前提供 2-5 个示例，帮助模型理解任务模式和输出格式。

**优点**: 输出更稳定、更符合预期格式
**缺点**: 增加 token 消耗

## 排序算法示例对比

### Zero-Shot 示例

```
Prompt: "写一个 JavaScript 快速排序算法"
```

模型直接输出代码，但格式、注释风格可能不符合预期。

### Few-Shot 示例

```
Prompt:
"下面是三个排序算法的实现，请学习它们的风格：

// 冒泡排序
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 选择排序
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
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

请用相同的代码风格写一个快速排序算法。"
```

通过观察示例，模型会理解：
- 使用 ES6 语法
- 交换使用解构赋值 `[a, b] = [b, a]`
- 添加注释说明
- 返回排序后的数组

## 实际代码示例

运行 `main.js` 查看两种方式的效果对比。

## 适用场景

| 场景 | 推荐方式 |
|------|----------|
| 简单通用任务 | Zero-Shot |
| 需要特定输出格式 | Few-Shot |
| 领域特定任务 | Few-Shot |
| 批量相似任务 | Few-Shot |
