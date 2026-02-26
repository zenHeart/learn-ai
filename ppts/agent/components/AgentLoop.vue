<script setup>
  import { ref, computed, watch } from "vue";
  import { useNav } from "@slidev/client";

  const props = defineProps({
    mini: {
      type: Boolean,
      default: false,
    },
    activeStepId: {
      type: String,
      default: null,
    },
  });

  const currentStepIndex = ref(0);

  let slidevNav;
  try {
    slidevNav = useNav();
  } catch (e) {
    // 允许在无 slidev 上下文时降级
  }

  // Agent Loop 步骤定义
  const steps = [
    {
      id: "receive",
      title: "1. 接收任务",
      description: "Agent 接收用户输入的任务描述，理解任务目标",
      tags: ["Input", "Task"],
      activeNode: "receive",
      line: null,
    },
    {
      id: "plan",
      title: "2. 规划分解",
      description: "将复杂任务分解为可执行的子任务，制定执行计划",
      tags: ["Planning", "Decompose"],
      activeNode: "planner",
      line: "receive-plan",
    },
    {
      id: "execute",
      title: "3. 执行工具",
      description: "根据计划选择合适的工具，生成参数并执行",
      tags: ["Tool", "Execute"],
      activeNode: "executor",
      line: "plan-execute",
    },
    {
      id: "evaluate",
      title: "4. 评估结果",
      description: "验证工具返回结果，检查是否达到目标",
      tags: ["Evaluation", "Check"],
      activeNode: "evaluator",
      line: "execute-evaluate",
    },
    {
      id: "decision",
      title: "5. 决策判断",
      description: "根据评估结果判断：成功则完成，失败则反思",
      tags: ["Decision", "Branch"],
      activeNode: "decision",
      line: "evaluate-decide",
    },
    {
      id: "reflect",
      title: "6. 反思调整",
      description: "分析失败原因，调整策略重新规划",
      tags: ["Reflection", "Retry"],
      activeNode: "reflect",
      line: "decide-reflect",
      isLoop: true,
    },
    {
      id: "done",
      title: "7. 任务完成",
      description: "任务成功完成，返回结果给用户",
      tags: ["Complete", "Result"],
      activeNode: "done",
      line: "decide-done",
    },
  ];

  const currentStep = computed(() => {
    if (props.mini && props.activeStepId) {
      return steps.find((s) => s.id === props.activeStepId) || steps[0];
    }
    return steps[currentStepIndex.value];
  });

  watch(
    () => slidevNav?.clicks?.value,
    (newVal) => {
      if (newVal !== undefined && !props.mini) {
        currentStepIndex.value = Math.min(
          Math.max(newVal, 0),
          steps.length - 1,
        );
      }
    },
    { immediate: true },
  );

  const nextStep = () => {
    if (!props.mini && slidevNav) {
      slidevNav.next();
    } else if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value++;
    }
  };

  const prevStep = () => {
    if (!props.mini && slidevNav) {
      slidevNav.prev();
    } else if (currentStepIndex.value > 0) {
      currentStepIndex.value--;
    }
  };

  const reset = () => {
    if (!props.mini && slidevNav && slidevNav.clicks) {
      slidevNav.clicks.value = 0;
    } else {
      currentStepIndex.value = 0;
    }
  };

  const getNodeClass = (nodeName) => {
    const active = currentStep.value.activeNode;
    if (active === nodeName) {
      return "node-active border-purple-500 bg-purple-50 dark:bg-purple-900/20";
    }
    return "opacity-50 grayscale border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900";
  };

  const getLineClass = (from, to, isLoop = false) => {
    const currentLine = currentStep.value.line;
    const targetLine = `${from}-${to}`;
    if (currentLine === targetLine) {
      return isLoop
        ? "stroke-orange-500 opacity-100 flow-line"
        : "stroke-purple-500 opacity-100 flow-line";
    }
    return "stroke-slate-700 opacity-30";
  };
</script>

<template>
  <div
    class="agent-loop-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 rounded-lg overflow-hidden flex flex-col h-full w-full"
    :class="{
      'mini-mode border-none bg-transparent': mini,
    }"
  >
    <!-- 顶部标题区 -->
    <div
      v-if="!mini"
      class="flex-shrink-0 flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#161b22]/50"
    >
      <div>
        <h2 class="text-lg font-bold flex items-center gap-2">
          Agent Loop 工作流
        </h2>
      </div>
      <div class="flex items-center gap-2 bg-slate-100 dark:bg-[#0d1117] p-1 rounded-lg border border-slate-200 dark:border-slate-700/50">
        <button
          @click="prevStep"
          :disabled="currentStepIndex === 0"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div class="px-2 font-mono text-xs text-purple-600 dark:text-purple-400 font-bold min-w-[60px] text-center">
          {{ currentStepIndex + 1 }}/{{ steps.length }}
        </div>
        <button
          @click="nextStep"
          :disabled="currentStepIndex === steps.length - 1"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
        <div class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
        <button @click="reset" class="px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
          重置
        </button>
      </div>
    </div>

    <!-- 可视化区域 -->
    <div class="flex-1 relative bg-white dark:bg-[#0d1117] overflow-hidden flex items-center justify-center">
      <div class="relative w-[850px] h-[320px]">
        <!-- SVG 连接线 -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="agent-arrow-gray" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
            </marker>
            <marker id="agent-arrow-purple" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#a855f7" />
            </marker>
            <marker id="agent-arrow-orange" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#f97316" />
            </marker>
          </defs>
          <!-- 主流程 -->
          <line x1="90" y1="150" x2="160" y2="150" stroke-width="2" :class="getLineClass('receive', 'plan')" marker-end="url(#agent-arrow-gray)" />
          <line x1="240" y1="150" x2="310" y2="150" stroke-width="2" :class="getLineClass('plan', 'execute')" marker-end="url(#agent-arrow-gray)" />
          <line x1="390" y1="150" x2="460" y2="150" stroke-width="2" :class="getLineClass('execute', 'evaluate')" marker-end="url(#agent-arrow-gray)" />
          <line x1="540" y1="150" x2="610" y2="150" stroke-width="2" :class="getLineClass('evaluate', 'decision')" marker-end="url(#agent-arrow-gray)" />
          <!-- 循环路径 -->
          <path d="M 680 195 L 680 260 L 160 260 L 160 195" fill="none" stroke-width="2" :class="getLineClass('decide', 'reflect', true)" marker-end="url(#agent-arrow-orange)" />
          <!-- 完成路径 -->
          <line x1="680" y1="150" x2="760" y2="150" stroke-width="2" :class="getLineClass('decide', 'done')" marker-end="url(#agent-arrow-gray)" />
        </svg>

        <!-- Agentic Loop 虚线框 -->
        <div class="absolute top-[50px] left-[140px] w-[580px] h-[160px] rounded-xl border-2 border-dashed border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-900/10 pointer-events-none">
          <div class="mt-[-12px] ml-4 bg-white dark:bg-[#0d1117] px-3 py-1 flex items-center gap-2 text-purple-500 text-xs font-bold uppercase tracking-widest">
            <span class="text-purple-400">●</span> Agent Loop
          </div>
        </div>

        <!-- Receive -->
        <div class="absolute top-[100px] left-[10px] w-[80px] h-[100px]" :class="getNodeClass('receive')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-slate-500">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span class="font-bold text-[10px]">接收任务</span>
            <span class="text-[8px] text-slate-500">Input</span>
          </div>
        </div>

        <!-- Planner -->
        <div class="absolute top-[100px] left-[160px] w-[80px] h-[100px]" :class="getNodeClass('planner')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-blue-500">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
            <span class="font-bold text-[10px]">规划分解</span>
            <span class="text-[8px] text-slate-500">Plan</span>
          </div>
        </div>

        <!-- Executor -->
        <div class="absolute top-[100px] left-[310px] w-[80px] h-[100px]" :class="getNodeClass('executor')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-green-500">
              <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <span class="font-bold text-[10px]">执行工具</span>
            <span class="text-[8px] text-slate-500">Execute</span>
          </div>
        </div>

        <!-- Evaluator -->
        <div class="absolute top-[100px] left=[460px] left-[460px]" :class="getNodeClass('evaluator')">
          <div class="w-[80px] h-[100px] bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-yellow-500">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" />
            </svg>
            <span class="font-bold text-[10px]">评估结果</span>
            <span class="text-[8px] text-slate-500">Evaluate</span>
          </div>
        </div>

        <!-- Decision -->
        <div class="absolute top-[100px] left-[610px] w-[70px] h-[100px]" :class="getNodeClass('decision')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-orange-500">
              <path d="M6 3v12" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            <span class="font-bold text-[10px]">决策</span>
            <span class="text-[8px] text-slate-500">Branch</span>
          </div>
        </div>

        <!-- Done -->
        <div class="absolute top-[100px] left-[760px] w-[60px] h-[100px]" :class="getNodeClass('done')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-green-500">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span class="font-bold text-[10px]">完成</span>
            <span class="text-[8px] text-slate-500">Done</span>
          </div>
        </div>

        <!-- Success Badge -->
        <div v-if="currentStep.id === 'done'" class="absolute top-[210px] left-[750px] bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 px-3 py-1 rounded-full text-xs font-bold text-green-700 dark:text-green-400">
          ✓ 成功
        </div>

        <!-- Retry Badge -->
        <div v-if="currentStep.isLoop" class="absolute top-[210px] left-[350px] bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 px-3 py-1 rounded-full text-xs font-bold text-orange-700 dark:text-orange-400 animate-pulse">
          ↻ 反思重试
        </div>
      </div>
    </div>

    <!-- 底部状态区 -->
    <div
      v-if="!mini"
      class="flex-shrink-0 bg-slate-50 dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 p-3"
    >
      <h3 class="font-bold text-sm text-purple-600 dark:text-purple-400 mb-1">
        {{ currentStep.title }}
      </h3>
      <p class="text-slate-600 dark:text-slate-300 text-xs mb-2">
        {{ currentStep.description }}
      </p>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in currentStep.tags"
          :key="tag"
          class="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-mono"
        >#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-line {
  stroke-dasharray: 8;
  animation: flow 1s linear infinite;
}

@keyframes flow {
  from { stroke-dashoffset: 16; }
  to { stroke-dashoffset: 0; }
}

.node-active {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  z-index: 10;
}

.mini-mode .node-active {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
}

.mini-mode {
  background: transparent !important;
  border: none !important;
}
</style>
