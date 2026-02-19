<script setup>
  import { computed } from "vue";

  const props = defineProps({
    stepId: {
      type: String,
      default: "start",
    },
  });

  // 色块类型定义
  const blockTypes = {
    system: {
      label: "System",
      color: "bg-slate-300 dark:bg-slate-600",
      text: "text-slate-700 dark:text-slate-200",
    },
    user: {
      label: "User Prompt",
      color: "bg-orange-300 dark:bg-orange-700",
      text: "text-orange-800 dark:text-orange-100",
    },
    file: {
      label: "File Context",
      color: "bg-blue-300 dark:bg-blue-700",
      text: "text-blue-800 dark:text-blue-100",
    },
    plan: {
      label: "Plan/Code",
      color: "bg-purple-300 dark:bg-purple-700",
      text: "text-purple-800 dark:text-purple-100",
    },
    diff: {
      label: "Code Diff",
      color: "bg-indigo-300 dark:bg-indigo-700",
      text: "text-indigo-800 dark:text-indigo-100",
    },
    lint: {
      label: "Lint Result",
      color: "bg-yellow-300 dark:bg-yellow-700",
      text: "text-yellow-800 dark:text-yellow-100",
    },
    error: {
      label: "Error",
      color: "bg-red-300 dark:bg-red-700",
      text: "text-red-800 dark:text-red-100",
    },
    userfix: {
      label: "User Fix",
      color: "bg-amber-300 dark:bg-amber-700",
      text: "text-amber-800 dark:text-amber-100",
    },
    fixed: {
      label: "Fixed Code",
      color: "bg-emerald-300 dark:bg-emerald-700",
      text: "text-emerald-800 dark:text-emerald-100",
    },
    summary: {
      label: "Summary",
      color: "bg-green-300 dark:bg-green-700",
      text: "text-green-800 dark:text-green-100",
    },
  };

  // 每个步骤的上下文窗口配置
  const stepContextMap = {
    start: {
      input: ["system", "user"],
      output: [],
    },
    gather: {
      input: ["system", "user", "file"],
      output: [],
    },
    llm: {
      input: ["system", "user", "file"],
      output: ["plan"],
    },
    action: {
      input: ["system", "user", "file", "plan"],
      output: ["diff"],
    },
    verify: {
      input: ["system", "user", "file", "diff"],
      output: ["lint"],
    },
    loop_back: {
      input: ["system", "user", "file", "diff", "error"],
      output: [],
    },
    steer: {
      input: ["system", "user", "file", "error", "userfix"],
      output: [],
    },
    action_fix: {
      input: ["system", "user", "file", "error", "userfix"],
      output: ["fixed"],
    },
    verify_pass: {
      input: ["system", "user", "file", "fixed"],
      output: ["summary"],
    },
    done: {
      input: ["system", "user", "file", "fixed", "summary"],
      output: [],
    },
  };

  const contextData = computed(() => {
    return stepContextMap[props.stepId] || stepContextMap.start;
  });

  const inputBlocks = computed(() => {
    return contextData.value.input.map((key) => blockTypes[key]);
  });

  const outputBlocks = computed(() => {
    return contextData.value.output.map((key) => blockTypes[key]);
  });
</script>

<template>
  <div
    class="context-window flex items-stretch gap-1.5"
    style="font-size: 8px !important"
  >
    <!-- Input 组 -->
    <div class="flex items-stretch gap-0.5">
      <div class="flex items-center">
        <span
          class="context-label text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider"
          style="
            font-size: 7px;
            writing-mode: vertical-lr;
            transform: rotate(180deg);
          "
          >Input</span
        >
      </div>
      <div class="flex items-center">
        <svg
          class="text-slate-300 dark:text-slate-600"
          width="6"
          :height="inputBlocks.length * 18 + 4"
          viewBox="0 0 6 40"
          preserveAspectRatio="none"
        >
          <path
            d="M 5 0 Q 0 0 0 5 L 0 35 Q 0 40 5 40"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
      </div>
      <div class="flex flex-col gap-0.5 justify-center">
        <div
          v-for="(block, i) in inputBlocks"
          :key="'in-' + i"
          class="context-block rounded-sm px-1.5 py-0.5 font-mono whitespace-nowrap transition-all duration-300"
          :class="[block.color, block.text]"
          style="font-size: 7px !important; line-height: 1.4"
        >
          {{ block.label }}
        </div>
      </div>
    </div>

    <!-- Output 组 -->
    <div v-if="outputBlocks.length > 0" class="flex items-stretch gap-0.5">
      <div class="flex items-center">
        <span
          class="context-label text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider"
          style="
            font-size: 7px;
            writing-mode: vertical-lr;
            transform: rotate(180deg);
          "
          >Output</span
        >
      </div>
      <div class="flex items-center">
        <svg
          class="text-slate-300 dark:text-slate-600"
          width="6"
          :height="outputBlocks.length * 18 + 4"
          viewBox="0 0 6 40"
          preserveAspectRatio="none"
        >
          <path
            d="M 5 0 Q 0 0 0 5 L 0 35 Q 0 40 5 40"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
      </div>
      <div class="flex flex-col gap-0.5 justify-center">
        <div
          v-for="(block, i) in outputBlocks"
          :key="'out-' + i"
          class="context-block rounded-sm px-1.5 py-0.5 font-mono whitespace-nowrap transition-all duration-300"
          :class="[block.color, block.text]"
          style="font-size: 7px !important; line-height: 1.4"
        >
          {{ block.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .context-block {
    min-width: 50px;
    text-align: center;
  }
</style>
