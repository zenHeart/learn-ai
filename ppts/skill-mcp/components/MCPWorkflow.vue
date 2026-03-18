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

  // MCP 工作流步骤定义
  const steps = [
    {
      id: "start",
      title: "1. Host 发起请求",
      description: "Claude Code (Host) 作为客户端，发起工具调用请求",
      tags: ["Request", "Host"],
      activeNode: "start",
      line: null,
    },
    {
      id: "tool_call",
      title: "2. MCP Client 接收",
      description: "MCP Client 接收请求，解析工具名称和参数",
      tags: ["Parse", "MCP Client"],
      activeNode: "mcp-client",
      line: "start-mcp",
    },
    {
      id: "stdin",
      title: "3. JSON-RPC 通信",
      description: "通过 stdin/stdout 使用 JSON-RPC 2.0 协议传输",
      tags: ["JSON-RPC", "Protocol"],
      activeNode: "mcp-server",
      line: "mcp-stdin",
    },
    {
      id: "execute",
      title: "4. Server 执行工具",
      description: "MCP Server 调用本地工具（如文件系统、Git）",
      tags: ["Execute", "Local"],
      activeNode: "mcp-server",
      line: "mcp-execute",
    },
    {
      id: "response",
      title: "5. 返回结果",
      description: "Server 执行完成后，返回结构化结果给 Client",
      tags: ["Response", "Result"],
      activeNode: "mcp-client",
      line: "execute-client",
    },
    {
      id: "llm",
      title: "6. LLM 处理结果",
      description: "MCP Client 将结果返回给 LLM 进行下一步推理",
      tags: ["LLM", "Reasoning"],
      activeNode: "llm",
      line: "client-llm",
    },
    {
      id: "done",
      title: "7. 完成",
      description: "任务完成，Host 显示最终结果给用户",
      tags: ["Complete", "UI"],
      activeNode: "done",
      line: "llm-done",
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
      return "node-active border-blue-500 bg-blue-50 dark:bg-slate-800";
    }
    return "opacity-50 grayscale border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900";
  };

  const getLineClass = (from, to) => {
    const currentLine = currentStep.value.line;
    const targetLine = `${from}-${to}`;
    if (currentLine === targetLine) {
      return "stroke-blue-500 opacity-100 flow-line";
    }
    return "stroke-slate-700 opacity-30";
  };
</script>

<template>
  <div
    class="mcp-workflow-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 rounded-lg overflow-hidden flex flex-col h-full w-full"
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
          MCP 工作流
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
        <div class="px-2 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[60px] text-center">
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
      <div class="relative w-[900px] h-[350px]">
        <!-- SVG 连接线 -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="mcp-arrow-gray" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
            </marker>
            <marker id="mcp-arrow-blue" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
            </marker>
          </defs>
          <line x1="100" y1="160" x2="180" y2="160" stroke-width="2" :class="getLineClass('start', 'mcp')" marker-end="url(#mcp-arrow-gray)" />
          <line x1="280" y1="160" x2="360" y2="160" stroke-width="2" :class="getLineClass('mcp', 'stdin')" marker-end="url(#mcp-arrow-gray)" />
          <line x1="460" y1="160" x2="540" y2="160" stroke-width="2" :class="getLineClass('stdin', 'execute')" marker-end="url(#mcp-arrow-gray)" />
          <line x1="640" y1="160" x2="720" y2="160" stroke-width="2" :class="getLineClass('execute', 'response')" marker-end="url(#mcp-arrow-gray)" />
          <line x1="820" y1="160" x2="860" y2="160" stroke-width="2" :class="getLineClass('response', 'llm')" marker-end="url(#mcp-arrow-gray)" />
        </svg>

        <!-- Host -->
        <div class="absolute top-[110px] left-[10px] w-[90px] h-[100px]" :class="getNodeClass('start')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-slate-600">
              <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
            </svg>
            <span class="font-bold text-xs">Claude Code</span>
            <span class="text-[9px] text-slate-500">Host</span>
          </div>
        </div>

        <!-- MCP Client -->
        <div class="absolute top-[110px] left-[180px] w-[100px] h-[100px]" :class="getNodeClass('mcp-client')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-blue-500">
              <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 12l8-8" /><circle cx="12" cy="12" r="3" />
            </svg>
            <span class="font-bold text-xs">MCP Client</span>
            <span class="text-[9px] text-slate-500">SDK</span>
          </div>
        </div>

        <!-- MCP Server -->
        <div class="absolute top-[110px] left-[360px] w-[100px] h-[100px]" :class="getNodeClass('mcp-server')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-green-500">
              <rect width="4" height="16" x="10" y="4" rx="2" /><rect width="4" height="16" x="4" y="4" rx="2" /><rect width="4" height="16" x="16" y="4" rx="2" />
            </svg>
            <span class="font-bold text-xs">MCP Server</span>
            <span class="text-[9px] text-slate-500">Tool Provider</span>
          </div>
        </div>

        <!-- Local Tools -->
        <div class="absolute top-[110px] left-[540px] w-[100px] h-[100px]" :class="getNodeClass('execute')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-purple-500">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span class="font-bold text-xs">Local Tools</span>
            <span class="text-[9px] text-slate-500">FS/Git/API</span>
          </div>
        </div>

        <!-- LLM -->
        <div class="absolute top-[110px] left-[720px] w-[80px] h-[100px]" :class="getNodeClass('llm')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-purple-600">
              <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 .74-.4 1.39-1 1.73v.77a2.5 2.5 0 0 1-5 0v-.77c-.6-.34-1-.99-1-1.73A2.5 2.5 0 0 1 12 2z" /><path d="M12 8.5v3" /><path d="M12 14.5a2.5 2.5 0 0 0 2.5 2.5c.74 0 1.39-.4 1.73-1" /><path d="M12 14.5a2.5 2.5 0 0 1-2.5 2.5c-.74 0-1.39-.4-1.73-1" />
            </svg>
            <span class="font-bold text-xs">LLM</span>
            <span class="text-[9px] text-slate-500">推理</span>
          </div>
        </div>

        <!-- Done -->
        <div class="absolute top-[120px] left-[860px] w-[30px] h-[80px]" :class="getNodeClass('done')">
          <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-full p-2 flex flex-col items-center justify-center shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-500">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <!-- Protocol Badge -->
        <div class="absolute top-[270px] left-[250px] bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 px-3 py-1 rounded-full text-xs font-mono text-yellow-800 dark:text-yellow-200">
          JSON-RPC 2.0 via stdin/stdout
        </div>
      </div>
    </div>

    <!-- 底部状态区 -->
    <div
      v-if="!mini"
      class="flex-shrink-0 bg-slate-50 dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 p-3"
    >
      <h3 class="font-bold text-sm text-blue-600 dark:text-blue-400 mb-1">
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
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  z-index: 10;
}

.mini-mode .node-active {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.mini-mode {
  background: transparent !important;
  border: none !important;
}
</style>
