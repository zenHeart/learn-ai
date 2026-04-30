<script setup>
import { ref, computed } from "vue";

const isPlaying = ref(false);
const currentHighlight = ref(-1); // -1 = all neutral

// 50 段文档，key info 藏在第 25 位
const segments = Array.from({ length: 50 }, (_, i) => {
  const isKey = i === 24; // 0-indexed, so segment 25
  return {
    id: i,
    text: isKey
      ? "会议在 305 室"
      : `这是第 ${i + 1} 段常规文档内容。`,
    isKey,
    isHighlighted: false,
  };
});

// Attention weights: high at ends, low in middle
function getAttentionWeight(idx) {
  const position = idx / 49; // 0 to 1
  // U-shape: high at both ends, low in middle
  const weight = 1 - Math.pow(2 * position - 1, 2);
  return Math.max(0.1, weight);
}

function getColor(weight) {
  // Red (high attention) to blue (low attention)
  const r = Math.round(255 * (1 - weight));
  const g = Math.round(100 * weight);
  const b = Math.round(255 * weight);
  return `rgb(${r}, ${g}, ${b})`;
}

const segmentStyles = computed(() =>
  segments.map((seg) => {
    const weight = getAttentionWeight(seg.id);
    const isMiddle = seg.id >= 10 && seg.id <= 39;
    return {
      backgroundColor: isMiddle ? getColor(weight * 0.5) : getColor(weight),
      opacity:
        isPlaying.value && isMiddle && !segments[seg.id].isKey
          ? 0.3
          : 1,
      transition: "all 0.3s ease",
    };
  })
);

const aiAnswer = ref("");

function play() {
  isPlaying.value = true;
  currentHighlight.value = -1;

  // Simulate AI retrieval attempt
  setTimeout(() => {
    aiAnswer.value = "";
  }, 500);

  // Animate through segments
  let i = 0;
  const interval = setInterval(() => {
    if (i < segments.length) {
      currentHighlight.value = i;
      i++;
    } else {
      clearInterval(interval);
      // Show AI's answer (wrong because it can't find the key info)
      setTimeout(() => {
        aiAnswer.value =
          "抱歉，我没有在文档中找到关于会议地点的信息。";
      }, 300);
    }
  }, 80);
}

function reset() {
  isPlaying.value = false;
  currentHighlight.value = -1;
  aiAnswer.value = "";
}
</script>

<template>
  <div class="litm-demo w-full h-full flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-slate-700 dark:text-slate-200">
          Lost in the Middle
        </h3>
        <p class="text-xs text-slate-500 mt-1">
          50 段文档，关键信息藏在第 25 段。AI 注意力首尾高、中间低。
        </p>
      </div>
      <div class="flex gap-2">
        <button
          class="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition"
          @click="play"
          :disabled="isPlaying"
        >
          {{ isPlaying ? "播放中..." : "▶ 播放" }}
        </button>
        <button
          class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          @click="reset"
        >
          重置
        </button>
      </div>
    </div>

    <!-- Attention heatmap -->
    <div
      class="flex-1 bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 overflow-auto"
    >
      <div class="flex flex-wrap gap-1">
        <div
          v-for="(seg, idx) in segments"
          :key="seg.id"
          class="flex flex-col items-center"
        >
          <div
            class="w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold transition-all duration-200"
            :style="segmentStyles[idx]"
            :class="
              seg.isKey
                ? 'ring-2 ring-yellow-400 ring-offset-1'
                : currentHighlight === idx
                  ? 'ring-2 ring-white scale-110'
                  : ''
            "
          >
            {{ seg.id + 1 }}
          </div>
          <span
            v-if="seg.isKey"
            class="text-[7px] text-yellow-600 dark:text-yellow-400 mt-0.5"
          >
            🔑
          </span>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-1.5">
          <div class="w-4 h-3 rounded" style="background-color: rgb(255, 100, 100)"></div>
          <span class="text-[9px] text-slate-500">高注意力（首/尾）</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-4 h-3 rounded" style="background-color: rgb(100, 200, 255)"></div>
          <span class="text-[9px] text-slate-500">低注意力（中间）</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-4 h-3 rounded ring-1 ring-yellow-400"></div>
          <span class="text-[9px] text-slate-500">关键信息（305 室）</span>
        </div>
      </div>
    </div>

    <!-- AI Answer -->
    <div
      v-if="aiAnswer"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
    >
      <div class="flex items-start gap-2">
        <span class="text-red-500 text-sm">🤖</span>
        <div>
          <div class="text-xs font-bold text-red-700 dark:text-red-400 mb-1">
            AI 检索结果
          </div>
          <div class="text-sm text-slate-700 dark:text-slate-300">
            {{ aiAnswer }}
          </div>
          <div class="text-xs text-slate-500 mt-2">
            原因：关键信息被淹没在低注意力的中间区域
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
