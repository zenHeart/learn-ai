<script setup>
import { ref, computed, watch } from "vue";
import { useNav } from "@slidev/client";

// 这个组件配合 Slidev 的 `clicks` 属性（鼠标点击或键盘方向键推进）来驱动内部状态。

const props = defineProps({
  // 当从外部传入激活步骤时使用，通常为空
  activeStepId: {
    type: String,
    default: null,
  },
});

const currentStepIndex = ref(0);

// 获取 Slidev 当前页面的导航状态，用来绑定页面的 clicks 进度
let slidevNav;
try {
  slidevNav = useNav();
} catch (e) {
  // 降级处理，允许在非 slidev 环境运行
}

// 模拟的底层流程步骤数据结构
const steps = [
  { id: "step1", title: "1. 语境输入", desc: "获取用户提示词与上下文" },
  { id: "step2", title: "2. LLM 推理", desc: "大模型思考并下发具体代码修改点" },
  { id: "step3", title: "3. 沙盒执行", desc: "在安全环境中写入代码并运行验证" },
  { id: "step4", title: "4. 分析回流", desc: "若有报错则回流至第一步；通过则进入下一步" },
  { id: "step5", title: "5. 最终交付", desc: "代码无误，提示完成" },
];

const currentStep = computed(() => steps[currentStepIndex.value]);

// 监听 Slidev 的 clicks 值，实时同步动画进度
watch(
  () => slidevNav?.clicks?.value,
  (newVal) => {
    if (newVal !== undefined) {
      currentStepIndex.value = Math.min(Math.max(newVal, 0), steps.length - 1);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="h-full w-full bg-[#0b0d11] text-slate-200 flex flex-col p-8 font-sans">
    
    <!-- 头部信息框 -->
    <div class="mb-8 border-b border-slate-800 pb-4">
      <h2 class="text-2xl font-bold flex items-center gap-2">
        <span class="text-blue-500">❖</span> Minimal Workflow Demo
      </h2>
      <p class="text-sm text-slate-500 mt-2">使用键盘左右键 (Slidev Clicks: {{ currentStepIndex }}) 控制以下流程驱动。</p>
    </div>

    <!-- 核心互动区域 -->
    <div class="flex-1 flex items-center justify-center relative border border-slate-800 rounded-xl bg-[#161b22] overflow-hidden">
      
      <!-- 测试动画节点展示容器: 用状态机对应步骤渲染高亮 -->
      <div class="flex gap-4 z-10">
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="w-40 h-32 p-4 rounded-lg flex flex-col justify-center border transition-all duration-500 shadow-xl"
          :class="currentStepIndex === index ? 'bg-blue-900/50 border-blue-400 scale-110' : 'bg-[#1c2128] border-slate-700 opacity-50 grayscale'"
        >
          <div class="text-xs font-mono text-blue-400 mb-2">{{ step.id }}</div>
          <h3 class="font-bold text-sm mb-1 leading-tight">{{ step.title }}</h3>
          <p class="text-[10px] text-slate-400 leading-tight">{{ step.desc }}</p>
        </div>
      </div>

    </div>

    <!-- 底部状态与操作说明 -->
    <div class="mt-8 bg-blue-900/20 border border-blue-900/50 p-4 rounded-lg flex items-start gap-4">
      <div class="bg-blue-500 p-2 rounded-full">
        <!-- Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      </div>
      <div>
        <p class="text-sm font-bold text-blue-400">当前执行节点：{{ currentStep.title }}</p>
        <p class="text-xs text-slate-400 mt-1">{{ currentStep.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可在这里补充复杂的动画样式，这里依靠 Vue 的响应式 class 和 Tailwind 完成基础动效 */
</style>
