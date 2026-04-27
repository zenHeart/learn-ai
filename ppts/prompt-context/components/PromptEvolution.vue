<script setup>
import { ref, computed } from "vue";

const currentFrame = ref(0);

const frames = [
  {
    version: "v1",
    label: "裸问",
    prompt: "帮我写一个排序函数",
    output: "以下是冒泡排序的实现...\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n```\n\n这个算法时间复杂度 O(n²)...",
    newDimension: null,
    issues: ["语言未知", "类型未知", "无复杂度要求", "无格式约束"],
  },
  {
    version: "v2",
    label: "加角色",
    prompt: "你是一个 TypeScript 工程师，帮我写一个排序函数",
    output: "好的，这是 TypeScript 实现：\n\n```typescript\nfunction bubbleSort(arr: number[]): number[] {\n  const n = arr.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}\n```",
    newDimension: "角色定义",
    issues: ["无算法复杂度约束", "无数据类型细化", "无输出格式要求"],
  },
  {
    version: "v3",
    label: "加约束",
    prompt: `你是一个 TypeScript 工程师。
要求：
- 时间复杂度 O(n log n)
- 输入 number[]，输出 number[]
- TypeScript strict mode
- 每行必须有类型标注`,
    output: "明白，以下是满足约束的实现：\n\n```typescript\ntype Numeric = number;\n\nfunction quickSort(arr: Numeric[]): Numeric[] {\n  if (arr.length <= 1) return arr;\n\n  const pivot: Numeric = arr[Math.floor(arr.length / 2)];\n  const left: Numeric[]  = arr.filter(x => x < pivot);\n  const middle: Numeric[] = arr.filter(x => x === pivot);\n  const right: Numeric[]  = arr.filter(x => x > pivot);\n\n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}\n```",
    newDimension: "约束条件",
    issues: ["无输出格式约束", "无示例参照"],
  },
  {
    version: "v4",
    label: "加示例+格式",
    prompt: `你是一个 TypeScript 工程师。

[约束]
- 时间复杂度 O(n log n)
- 输入 number[]，输出 number[]
- TypeScript strict mode

[示例]
输入: [3, 1, 4, 1, 5]
输出: [1, 1, 3, 4, 5]

[输出格式]
```json
{ "code": "...", "complexity": "...", "explanation": "..." }
````,
    output: `\`\`\`json\n{\n  "code": "function quickSort(arr: number[]): number[] {\\n  if (arr.length <= 1) return arr;\\n  const pivot = arr[Math.floor(arr.length / 2)];\\n  return [...quickSort(arr.filter(x => x < pivot)),\\n           ...arr.filter(x => x === pivot),\\n           ...quickSort(arr.filter(x => x > pivot))];\\n}",\n  "complexity": "O(n log n) 平均，O(n²) 最坏",\n  "explanation": "使用快速排序分治策略，稳定排序"\n}\n\`\`\``,
    newDimension: "示例 + 输出格式",
    issues: [],
  },
];

const frame = computed(() => frames[currentFrame.value]);
const hasPrev = computed(() => currentFrame.value > 0);
const hasNext = computed(() => currentFrame.value < frames.length - 1);

function prev() {
  if (hasPrev.value) currentFrame.value--;
}
function next() {
  if (hasNext.value) currentFrame.value++;
}
</script>

<template>
  <div class="prompt-evolution w-full h-full flex flex-col gap-4">
    <!-- 版本指示器 -->
    <div class="flex items-center justify-center gap-4 mb-2">
      <button
        v-for="(f, idx) in frames"
        :key="f.version"
        class="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all"
        :class="[
          idx === currentFrame
            ? 'bg-blue-500 text-white shadow-lg scale-105'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700',
        ]"
        @click="currentFrame = idx"
      >
        <span class="text-xs font-bold">{{ f.version }}</span>
        <span class="text-xs opacity-75">{{ f.label }}</span>
      </button>
    </div>

    <!-- 主内容区 -->
    <div class="flex-1 grid grid-cols-2 gap-6 min-h-0">
      <!-- 左侧：Prompt -->
      <div class="flex flex-col min-h-0">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="text-xs font-bold px-2 py-0.5 rounded"
            :class="
              currentFrame === 0
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            "
          >
            Prompt
          </span>
          <span v-if="frame.newDimension" class="text-xs text-amber-600 dark:text-amber-400">
            +{{ frame.newDimension }}
          </span>
        </div>
        <div
          class="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-auto border border-slate-200 dark:border-slate-700"
        >
          <pre
            v-for="(line, i) in frame.prompt.split('\n')"
            :key="i"
            class="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed"
            >{{ line }}</pre
          >
        </div>
      </div>

      <!-- 右侧：Output -->
      <div class="flex flex-col min-h-0">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          >
            AI Output
          </span>
          <span v-if="frame.issues.length > 0" class="text-xs text-red-500">
            {{ frame.issues.length }} 个问题
          </span>
        </div>
        <div
          class="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-auto border border-slate-200 dark:border-slate-700"
        >
          <pre
            v-for="(line, i) in frame.output.split('\n')"
            :key="i"
            class="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed"
            >{{ line }}</pre
          >
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="flex items-center justify-between">
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        :class="
          hasPrev
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
        "
        :disabled="!hasPrev"
        @click="prev"
      >
        ← prev
      </button>

      <span class="text-sm text-slate-500">
        {{ currentFrame + 1 }} / {{ frames.length }}
      </span>

      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        :class="
          hasNext
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
        "
        :disabled="!hasNext"
        @click="next"
      >
        next →
      </button>
    </div>
  </div>
</template>

<style scoped>
pre {
  margin: 0;
  padding: 0;
}
</style>
