<script setup>
  import { ref, computed } from "vue";

  const props = defineProps({
    step: {
      type: Number,
      default: 0,
    },
  });

  const steps = [
    { id: 0, title: "用户提问", desc: "用户输入自然语言问题" },
    { id: 1, title: "向量化", desc: "将问题转换为向量" },
    { id: 2, title: "向量检索", desc: "在向量数据库中搜索相似内容" },
    { id: 3, title: "构建上下文", desc: "将检索结果注入上下文" },
    { id: 4, title: "LLM 生成", desc: "基于增强上下文生成答案" },
  ];

  const currentStep = computed(() => Math.min(props.step, steps.length - 1));
</script>

<template>
  <div class="rag-workflow bg-white dark:bg-slate-900 rounded-lg p-4 shadow-lg">
    <!-- 流程步骤 -->
    <div class="flex items-center justify-between mb-4">
      <div
        v-for="(s, i) in steps"
        :key="s.id"
        class="flex items-center"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
          :class="{
            'bg-blue-500 text-white': i === currentStep,
            'bg-slate-200 dark:bg-slate-700 text-slate-500': i < currentStep,
            'bg-slate-100 dark:bg-slate-800 text-slate-400': i > currentStep,
          }"
        >
          <span v-if="i < currentStep">✓</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <div
          v-if="i < steps.length - 1"
          class="w-8 h-0.5 mx-1"
          :class="i < currentStep ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'"
        ></div>
      </div>
    </div>

    <!-- 当前步骤详情 -->
    <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
      <h4 class="font-bold text-sm text-blue-600 dark:text-blue-400 mb-1">
        {{ steps[currentStep].title }}
      </h4>
      <p class="text-xs text-slate-600 dark:text-slate-300">
        {{ steps[currentStep].desc }}
      </p>
    </div>

    <!-- 简化示意图 -->
    <div class="mt-4 flex items-center justify-center gap-2 text-xs">
      <div class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded text-orange-700 dark:text-orange-300">
        用户问题
      </div>
      <span class="text-slate-400">→</span>
      <div class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-700 dark:text-purple-300">
        向量化
      </div>
      <span class="text-slate-400">→</span>
      <div class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-700 dark:text-blue-300">
        检索
      </div>
      <span class="text-slate-400">→</span>
      <div class="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300">
        LLM 生成
      </div>
    </div>
  </div>
</template>

<style scoped>
.rag-workflow {
  font-size: 12px;
}
</style>
