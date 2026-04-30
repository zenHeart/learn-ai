<script setup>
import { ref, computed } from "vue";

const TOTAL_TOKENS = 200000;
const WARNING_THRESHOLD = 0.8;

const systemTokens = ref(4000);
const userTokens = ref(3000);
const toolTokens = ref(5000);
const memoryTokens = ref(2000);

const totalUsed = computed(
  () => systemTokens.value + userTokens.value + toolTokens.value + memoryTokens.value
);
const usagePercent = computed(() => totalUsed.value / TOTAL_TOKENS);
const isWarning = computed(() => usagePercent.value >= WARNING_THRESHOLD);
const isOverflow = computed(() => usagePercent.value > 1);

const systemColor = "bg-violet-400";
const userColor = "bg-orange-400";
const toolColor = "bg-blue-400";
const memoryColor = "bg-emerald-400";

const segments = computed(() => {
  const total = totalUsed.value;
  if (total === 0) return [];

  const sys = (systemTokens.value / total) * 100;
  const usr = (userTokens.value / total) * 100;
  const tool = (toolTokens.value / total) * 100;
  const mem = (memoryTokens.value / total) * 100;

  return [
    { label: "System Prompt", color: systemColor, percent: sys, tokens: systemTokens.value },
    { label: "User Input", color: userColor, percent: usr, tokens: userTokens.value },
    { label: "Tool Results", color: toolColor, percent: tool, tokens: toolTokens.value },
    { label: "Memory", color: memoryColor, percent: mem, tokens: memoryTokens.value },
  ].filter((s) => s.percent > 0);
});

function formatTokens(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

const costEstimate = computed(() => {
  // Claude Sonnet 4.5: $3/M input
  const inputCost = (totalUsed.value / 1_000_000) * 3;
  return inputCost.toFixed(4);
});
</script>

<template>
  <div class="ctx-window-viz w-full h-full flex flex-col gap-4">
    <!-- 窗口可视化 -->
    <div class="flex-1 flex flex-col">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-bold text-slate-700 dark:text-slate-200">
          Context Window
        </span>
        <span
          class="text-xs font-mono px-2 py-0.5 rounded"
          :class="
            isOverflow
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              : isWarning
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          "
        >
          {{ formatTokens(totalUsed) }} / {{ formatTokens(TOTAL_TOKENS) }} tokens
          ({{ (usagePercent * 100).toFixed(0) }}%)
        </span>
      </div>

      <!-- 可视化条 -->
      <div
        class="h-10 rounded-lg overflow-hidden flex border border-slate-200 dark:border-slate-700"
      >
        <div
          v-for="seg in segments"
          :key="seg.label"
          :class="seg.color"
          class="transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden whitespace-nowrap"
          :style="{ width: `${seg.percent}%` }"
        >
          {{ seg.label.split(" ")[0] }}
        </div>
        <!-- 剩余空间 -->
        <div
          v-if="usagePercent < 1"
          class="flex-1 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-400"
        >
          可用空间
        </div>
        <!-- 溢出指示 -->
        <div
          v-if="isOverflow"
          class="bg-red-500 flex items-center justify-center text-[10px] font-bold text-white"
          :style="{ width: `${Math.min((usagePercent - 1) * 100, 20)}%` }"
        >
          溢出
        </div>
      </div>

      <!-- 颜色图例 -->
      <div class="flex items-center gap-4 mt-2 flex-wrap">
        <div v-for="seg in segments" :key="seg.label" class="flex items-center gap-1.5">
          <div :class="[seg.color, 'w-3 h-3 rounded-sm']"></div>
          <span class="text-[10px] text-slate-500">{{ seg.label }}</span>
          <span class="text-[10px] font-mono text-slate-400">{{ formatTokens(seg.tokens) }}</span>
        </div>
      </div>
    </div>

    <!-- 滑块控制 -->
    <div class="grid grid-cols-2 gap-4">
      <div v-for="seg in segments" :key="seg.label" class="flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-slate-600 dark:text-slate-400">{{ seg.label }}</span>
          <span class="text-[11px] font-mono text-slate-500">{{ formatTokens(seg.tokens) }}</span>
        </div>
        <input
          type="range"
          :value="seg.tokens"
          min="0"
          max="80000"
          step="500"
          class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-500"
          @input="
            (e) => {
              const val = parseInt(e.target.value);
              if (seg.label.includes('System')) systemTokens = val;
              else if (seg.label.includes('User')) userTokens = val;
              else if (seg.label.includes('Tool')) toolTokens = val;
              else memoryTokens = val;
            }
          "
        />
      </div>
    </div>

    <!-- 成本估算 -->
    <div
      class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800"
    >
      <div class="text-[11px] text-slate-500">
        估算成本（Claude Sonnet 4.5）：
        <span class="font-mono text-slate-700 dark:text-slate-300">${{ costEstimate }} / 次</span>
      </div>
      <div
        v-if="isWarning"
        class="text-[10px] px-2 py-0.5 rounded"
        :class="isOverflow ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'"
      >
        {{ isOverflow ? "⚠️ 超出窗口容量" : "⚠️ 接近容量上限" }}
      </div>
    </div>
  </div>
</template>
