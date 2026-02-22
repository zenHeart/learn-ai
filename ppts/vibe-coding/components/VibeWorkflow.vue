<script setup>
  import { ref, computed, watch } from "vue";
  import { useNav } from "@slidev/client";
  import ContextWindow from "./ContextWindow.vue";

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
  const isPlaying = ref(false);

  // Slidev 上下文集成
  let slidevNav;
  try {
    slidevNav = useNav();
  } catch (e) {
    // 允许在无 slidev 上下文时降级
  }

  // --- 剧本定义 ---
  const steps = [
    {
      id: "start",
      title: "1. User Prompt (意图注入)",
      description:
        "用户通过自然语言描述需求。不仅是文本、语音输入、图片、文件(@file、@folder) 等，除了显示输入，工具还会捕获光标位置的代码片段等作为隐式输入。",
      tags: ["Input", "Intent"],
      activeNode: "start",
      line: null,
    },
    {
      id: "gather",
      title: "2. Gather Context (语境收集)",
      description:
        "AI Coding 工具的 Agent (后续统称客户端 Agent)，通过 RAG 或文件树读取相关文件，调用读取文件搜索网络等相关工具(工具调用也叫做 Tool Calling), 结合用户输入，规整为统一输入",
      tags: ["Tool: Read", "Context"],
      activeNode: "gather",
      line: "start-gather",
    },
    {
      id: "llm",
      title: "3. LLM Reasoning (推理规划)",
      description:
        "调用 API 将所有输入通常以 JSON 对象方式，传递给大模型，大模型按照一定的规则进行推理，并返回结果。",
      tags: ["Reasoning", "Planning", "Code Gen"],
      activeNode: "llm",
      line: "gather-llm",
    },
    {
      id: "action",
      title: "4. Take Action (执行行动)",
      description:
        '客户端 Agent 拿到 LLM 的结果，执行文件变更或运行命令。在这个阶段，也会调用 "Write File" 等工具。',
      tags: ["Tool: Write", "Execution"],
      activeNode: "action",
      line: "llm-action",
    },
    {
      id: "verify",
      title: "5. Verify Results (自动验证)",
      description:
        "代码写入后，客户端 Agent 会主动运行 Linter 或编译器来检查刚才的修改是否破坏了代码。",
      tags: ["Tool: Terminal", "Validation"],
      activeNode: "verify",
      result: "fail",
      line: "action-verify",
    },
    {
      id: "loop_back",
      title: "6. Feedback Loop (错误回流)",
      description:
        "检测到报错！客户端 Agent 捕获错误信息，将其作为新的 Context，自动回到收集/思考阶段。",
      tags: ["Self-Correction", "Loop"],
      activeNode: "gather",
      line: "verify-gather",
    },
    {
      id: "steer",
      title: "7. User Steering (人类介入)",
      description:
        "（可选）用户发现 AI 理解错误，点击 Interrupt 并补充新的信息",
      tags: ["Human-in-Loop", "Steer"],
      activeNode: "llm",
      line: "steer-llm",
    },
    {
      id: "action_fix",
      title: "8. Take Action (修正执行)",
      description: "结合错误信息 + 用户修正， LLM 重新生成并执行代码。",
      tags: ["Retry", "Fix"],
      activeNode: "action",
      line: "llm-action",
    },
    {
      id: "verify_pass",
      title: "9. Verify Results (通过)",
      description:
        "客户端 Agent 再次验证，Lint 通过, 验证无问题。Agent 确认任务完成。",
      tags: ["Success", "Green"],
      activeNode: "verify",
      result: "pass",
      line: "action-verify",
    },
    {
      id: "done",
      title: "10. Done (任务完成)",
      description: "任务结束。客户端 Agent 会生成总结和变更告知用户。",
      tags: ["Commit", "Finish"],
      activeNode: "done",
      line: "verify-done",
    },
  ];

  const currentStep = computed(() => {
    if (props.mini && props.activeStepId) {
      return steps.find((s) => s.id === props.activeStepId) || steps[0];
    }
    return steps[currentStepIndex.value];
  });

  // 监听 Slidev 点击状态并同步组件内部步骤
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

  // --- 样式辅助函数 ---
  const getNodeClass = (nodeName) => {
    const active = currentStep.value.activeNode;
    if (active === nodeName) {
      return "node-active border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-slate-800";
    }
    return "opacity-60 grayscale border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900";
  };

  const getLineClass = (from, to, isCurve = false) => {
    const currentLine = currentStep.value.line;
    const targetLine = `${from}-${to}`;
    if (currentLine === targetLine) {
      return isCurve
        ? "stroke-green-500 opacity-100 flow-line"
        : "stroke-blue-500 opacity-100 flow-line";
    }
    return "stroke-slate-700 opacity-30";
  };

  const getMarker = (from, to, isCurve = false) => {
    const currentLine = currentStep.value.line;
    const targetLine = `${from}-${to}`;
    if (currentLine === targetLine) {
      return isCurve ? "url(#arrow-green)" : "url(#arrow-blue)";
    }
    return "url(#arrow-gray)";
  };
</script>

<template>
  <div
    class="vibe-workflow-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 rounded-none overflow-hidden flex flex-col h-full w-full"
    :class="{
      'mini-mode border-none bg-transparent dark:bg-transparent': mini,
    }"
  >
    <!-- 顶部标题区 -->
    <div
      v-if="!mini"
      class="flex-shrink-0 flex justify-between items-center p-3 md:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#161b22]/50"
    >
      <div>
        <h2
          class="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white"
        >
          2. 原理
        </h2>
      </div>

      <!-- 控制器 -->
      <div
        class="flex items-center gap-2 bg-slate-100 dark:bg-[#0d1117] p-1 rounded-none border border-slate-200 dark:border-slate-700/50"
      >
        <button
          @click="prevStep"
          :disabled="currentStepIndex === 0"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-none disabled:opacity-30 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div
          class="px-2 font-mono text-[10px] md:text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[70px] md:min-w-[80px] text-center"
        >
          STEP {{ currentStepIndex + 1 }}/{{ steps.length }}
        </div>
        <button
          @click="nextStep"
          :disabled="currentStepIndex === steps.length - 1"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-none disabled:opacity-30 transition-colors"
        >
          <svg
            v-if="currentStepIndex < steps.length - 1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-green-500"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
        <div class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
        <button
          @click="reset"
          class="flex items-center gap-1 px-2 py-1 text-[9px] md:text-[10px] font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded-none text-slate-600 dark:text-slate-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          重置
        </button>
      </div>
    </div>

    <!-- 可视化区域 -->
    <div
      class="flex-1 relative bg-white dark:bg-[#0d1117] overflow-hidden flex items-center justify-center transition-all duration-500"
      :class="{ 'bg-transparent dark:bg-transparent': mini }"
    >
      <!-- 背景网格 -->
      <div
        v-if="!mini"
        class="absolute inset-0 opacity-[0.03]"
        style="
          background-image:
            linear-gradient(#94a3b8 1px, transparent 1px),
            linear-gradient(90deg, #94a3b8 1px, transparent 1px);
          background-size: 40px 40px;
        "
      ></div>

      <!-- 画布内容 - 响应式缩放容器 -->
      <div
        class="diagram-viewport relative w-full h-full overflow-hidden"
        :class="mini ? '' : 'max-w-[1000px] max-h-[450px]'"
      >
        <div
          :class="
            mini
              ? 'mini-scaler'
              : 'diagram-scaler absolute inset-0 flex items-center justify-center'
          "
        >
          <div class="relative w-[1000px] h-[400px]">
            <!-- SVG 连接层 -->
            <svg
              class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-slate-300 dark:text-slate-700"
            >
              <defs>
                <marker
                  id="arrow-gray"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                </marker>
                <marker
                  id="arrow-blue"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
                </marker>
                <marker
                  id="arrow-orange"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#f97316" />
                </marker>
                <marker
                  id="arrow-green"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
                </marker>
              </defs>

              <line
                x1="130"
                y1="180"
                x2="170"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('start', 'gather')"
                :marker-end="getMarker('start', 'gather')"
              />
              <line
                x1="290"
                y1="180"
                x2="340"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('gather', 'llm')"
                :marker-end="getMarker('gather', 'llm')"
              />
              <line
                x1="460"
                y1="180"
                x2="510"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('llm', 'action')"
                :marker-end="getMarker('llm', 'action')"
              />
              <line
                x1="630"
                y1="180"
                x2="680"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('action', 'verify')"
                :marker-end="getMarker('action', 'verify')"
              />
              <line
                x1="800"
                y1="180"
                x2="860"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('verify', 'done')"
                :marker-end="getMarker('verify', 'done')"
              />

              <path
                d="M 740 235 L 740 270 L 230 270 L 230 235"
                fill="none"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('verify', 'gather', true)"
                :marker-end="getMarker('verify', 'gather', true)"
              />
              <path
                d="M 330 360 Q 400 360 400 235"
                fill="none"
                stroke-width="2"
                stroke-dasharray="6,4"
                class="transition-all"
                :class="
                  currentStep.id === 'steer'
                    ? 'stroke-orange-500 opacity-100'
                    : 'stroke-orange-200 dark:stroke-orange-900/30 opacity-30'
                "
                :marker-end="
                  currentStep.id === 'steer' ? 'url(#arrow-orange)' : ''
                "
              />
            </svg>

            <!-- Agentic Loop 虚线框 -->
            <div
              class="absolute top-[80px] left-[160px] w-[660px] h-[220px] rounded-none border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/10 dark:bg-slate-800/10 pointer-events-none flex flex-col items-center"
            >
              <div
                class="mt-[-14px] bg-white dark:bg-[#0d1117] px-4 py-1 flex items-center gap-2 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm text-[10px] font-bold uppercase tracking-widest"
              >
                <span class="text-purple-400">●</span> AGENTIC LOOP (LLM DRIVER)
              </div>
            </div>

            <!-- 节点层 -->
            <!-- Start -->
            <div
              class="absolute top-[130px] left-[10px] w-[120px] h-[100px] z-10 node-float"
              :class="getNodeClass('start')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-none p-3 flex flex-col items-center justify-center gap-1 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-slate-400 dark:text-slate-300"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
                </svg>
                <span
                  class="font-bold text-xs text-slate-800 dark:text-slate-200"
                  >User Prompt</span
                >
                <span class="text-[9px] text-slate-500">用户提示词</span>
              </div>
            </div>

            <!-- Gather -->
            <div
              class="absolute top-[130px] left-[170px] w-[120px] h-[100px] z-10 node-float"
              :class="getNodeClass('gather')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-none p-3 flex flex-col items-center justify-center gap-0.5 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-blue-500 dark:text-blue-400"
                >
                  <path
                    d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4"
                  />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m21 21-1.5-1.5" />
                </svg>
                <span class="font-bold text-xs text-slate-800 dark:text-white"
                  >Gather Context</span
                >
                <span class="text-[9px] text-slate-500 dark:text-slate-400"
                  >收集上下文</span
                >
                <span class="text-[9px] text-slate-500 font-mono"
                  >RAG / Read</span
                >
              </div>
            </div>

            <!-- LLM -->
            <div
              class="absolute top-[130px] left-[340px] w-[120px] h-[100px] z-10 node-float"
              :class="getNodeClass('llm')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-none p-3 flex flex-col items-center justify-center gap-0.5 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-purple-600 dark:text-purple-400"
                >
                  <path
                    d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
                  />
                  <path
                    d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
                  />
                </svg>
                <span class="font-bold text-xs text-slate-800 dark:text-white"
                  >LLM Reasoning</span
                >
                <span class="text-[9px] text-slate-500 dark:text-slate-400"
                  >推理与规划</span
                >
                <span class="text-[9px] text-slate-500 font-mono"
                  >Plan / Code</span
                >
              </div>
              <div
                class="absolute -top-3 -right-2 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
                v-if="
                  ['llm', 'action', 'steer', 'action_fix'].includes(
                    currentStep.id,
                  )
                "
              >
                LLM 推理
              </div>
            </div>

            <!-- Action -->
            <div
              class="absolute top-[130px] left-[510px] w-[120px] h-[100px] z-10 node-float"
              :class="getNodeClass('action')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-none p-3 flex flex-col items-center justify-center gap-0.5 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-indigo-600 dark:text-indigo-400"
                >
                  <path
                    d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <path
                    d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"
                  />
                </svg>
                <span class="font-bold text-xs text-slate-800 dark:text-white"
                  >Take Action</span
                >
                <span class="text-[9px] text-slate-500 dark:text-slate-400"
                  >执行操作</span
                >
                <span class="text-[9px] text-slate-500 font-mono"
                  >Write / Diff</span
                >
              </div>
            </div>

            <!-- Verify -->
            <div
              class="absolute top-[130px] left-[680px] w-[120px] h-[100px] z-10 node-float"
              :class="getNodeClass('verify')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-none p-3 flex flex-col items-center justify-center gap-0.5 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-yellow-600 dark:text-yellow-400"
                >
                  <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                  />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span class="font-bold text-xs text-slate-800 dark:text-white"
                  >Verify Results</span
                >
                <span class="text-[9px] text-slate-500 dark:text-slate-400"
                  >验证结果</span
                >
                <span class="text-[9px] text-slate-500 font-mono"
                  >Lint / Test</span
                >
              </div>
              <div
                v-if="currentStep.result === 'fail'"
                class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-bounce"
              >
                FAILED
              </div>
              <div
                v-if="currentStep.result === 'pass'"
                class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg"
              >
                PASSED
              </div>
            </div>

            <!-- Done -->
            <div
              class="absolute top-[140px] left-[860px] w-[80px] h-[80px] z-10 node-float"
              :class="getNodeClass('done')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 rounded-none p-2 flex flex-col items-center justify-center gap-0.5 shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-green-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span
                  class="font-bold text-[10px] text-slate-800 dark:text-slate-200"
                  >Done</span
                >
                <span class="text-[9px] text-slate-500">完成</span>
              </div>
            </div>

            <!-- User Steer Box -->
            <div
              class="absolute top-[290px] left-[100px] w-[220px] z-20 transition-all duration-300"
              :class="
                currentStep.id === 'steer'
                  ? 'opacity-100 scale-105'
                  : 'opacity-40 grayscale'
              "
            >
              <div
                class="bg-orange-50 dark:bg-[#2d1b15] border border-orange-200 dark:border-orange-900 rounded-none p-3 shadow-lg relative"
              >
                <div
                  class="absolute -top-1.5 left-3 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-[7px] font-bold px-1 py-0.5 rounded-none border border-orange-200 dark:border-orange-700/50 uppercase tracking-wider"
                >
                  Human In The Loop · 人机协作
                </div>
                <div class="flex items-start gap-2 mt-1">
                  <div
                    class="bg-orange-100 dark:bg-orange-900/30 p-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-orange-600 dark:text-orange-400"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p
                      class="text-orange-900 dark:text-orange-100 text-[10px] font-bold"
                      style="margin: 0 !important"
                    >
                      Interrupt & Steer · 打断与修正
                    </p>
                    <p
                      class="text-orange-700 dark:text-orange-400/70 text-[8px] leading-tight"
                      style="margin: 0 !important"
                    >
                      用户打断并注入新上下文，修正 AI 方向。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部状态区 -->
    <div
      v-if="!mini"
      class="flex-shrink-0 bg-slate-50 dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 flex gap-2 items-start shadow-inner overflow-hidden"
      style="height: 100px !important; padding: 8px !important"
    >
      <div class="flex-shrink-0 mt-0.5">
        <div
          class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700 transition-all duration-300"
          :class="{
            'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800':
              currentStep.result !== 'fail',
            'bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800':
              currentStep.result === 'fail',
          }"
        >
          <svg
            v-if="currentStep.result !== 'fail'"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-blue-600 dark:text-blue-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-red-600 dark:text-red-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
      </div>
      <div class="flex-1">
        <h3
          class="font-bold mb-0.5 font-mono uppercase flex items-center gap-2"
          style="font-size: 10px !important"
          :class="
            currentStep.result === 'fail'
              ? 'text-red-600 dark:text-red-400'
              : 'text-blue-600 dark:text-blue-400'
          "
        >
          {{ currentStep.title }}
          <span
            v-if="isPlaying"
            class="inline-block w-1 h-1 bg-current rounded-full animate-pulse"
          ></span>
        </h3>
        <p
          class="text-slate-600 dark:text-slate-300 leading-tight"
          style="font-size: 9px !important; margin: 0 !important"
        >
          {{ currentStep.description }}
        </p>
        <div class="mt-1 flex flex-wrap gap-1 opacity-60">
          <span
            v-for="tag in currentStep.tags"
            :key="tag"
            class="px-1 py-0 bg-slate-200 dark:bg-slate-800 rounded-none border border-slate-300 dark:border-slate-700 font-mono"
            style="font-size: 8px !important"
            >#{{ tag }}</span
          >
        </div>
      </div>

      <!-- 右侧：上下文窗口色块图 -->
      <div class="flex-shrink-0">
        <ContextWindow :stepId="currentStep.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .vibe-workflow-container {
    container-type: size;
  }

  .diagram-viewport {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 缩放核心逻辑 */
  .diagram-scaler {
    transform-origin: center center;
    /* 同时考虑宽度和高度的自适应缩放，确保内容在垂直空间不足时也能完整显示 */
    transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 480)));
  }

  @container (max-height: 400px) {
    .diagram-scaler {
      transform: scale(min(0.8, calc(100cqh / 450)));
    }
  }

  .flow-line {
    stroke-dasharray: 8;
    animation: flow 1s linear infinite;
  }

  @keyframes flow {
    from {
      stroke-dashoffset: 16;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .node-float {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .node-active {
    transform: scale(1.08);
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.25);
    z-index: 20;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  /* Mini Mode Specifics */
  .vibe-workflow-container.mini-mode {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .mini-scaler {
    /* 关键：保持原始内容尺寸，从左上角等比缩放 */
    position: absolute;
    top: 0;
    left: 0;
    width: 1000px;
    height: 400px;
    transform-origin: top left;
    transform: scale(var(--mini-scale, 0.22));
  }

  .mini-mode .node-float {
    animation: none !important;
    transition: none !important;
    box-shadow: none !important;
  }

  .mini-mode .node-float > div {
    padding: 2px !important; /* 深度减小内边距 */
    border-radius: 2px !important;
  }

  .mini-mode .node-active {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
    z-index: 100;
    transform: scale(1.3); /* 进一步显著放大当前激活点 */
    border-width: 2px !important;
  }
</style>
