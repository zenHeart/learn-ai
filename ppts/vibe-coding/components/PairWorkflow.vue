<script setup>
  import { ref, computed, watch } from "vue";
  import { useNav } from "@slidev/client";

  const props = defineProps({
    activeStepId: {
      type: String,
      default: null,
    },
  });

  const currentStepIndex = ref(0);
  const instanceId = Math.random().toString(36).substring(2, 7);

  // Slidev 上下文集成
  let slidevNav;
  try {
    slidevNav = useNav();
  } catch (e) {}

  // --- 剧本定义 (严格遵循 pairV2.mermaid 逻辑) ---
  const steps = [
    {
      id: "input",
      title: "1. Input (泛化输入)",
      description:
        "输入原始意图或上游产物（如脑暴想法、PRD、设计稿）。这是 PAIR 引擎的起点。",
      tags: ["Context", "Intent"],
      activeNode: "input",
      line: null,
      in: ["原始意图", "上游物料"],
      out: ["标准化上下文"],
      principle: "意图决定质量：高质量的原始输入是 AI 规划的前提，需减少歧义。",
    },
    {
      id: "plan",
      title: "2. Plan (规划与拆解)",
      description:
        "核心环节：将模糊意图转化为结构化约束。产出 Blueprint (蓝图草案) 和 Todo (分步计划)。",
      tags: ["Blueprint", "Todo"],
      activeNode: "plan",
      line: "input-plan",
      in: ["标准化上下文"],
      out: ["Blueprint 草案", "Todo 队列"],
      principle: "分而治之：将复杂任务拆解为原子化、可验证的 Todo 节点。",
    },
    {
      id: "assess",
      title: "3. Assess (对齐与评估)",
      description:
        "人机认知对齐 (HITL)。人类或上游系统对产生的 Blueprint 进行审查、批注和修正。",
      tags: ["HITL", "Review"],
      activeNode: "assess",
      line: "plan-assess",
      in: ["Blueprint 草案"],
      out: ["批注反馈"],
      principle: "认知对齐：在执行前确保人类意图与 AI 计划达成 100% 共识。",
    },
    {
      id: "assess_loop",
      title: "4. Cognitive Loop (认知回流)",
      description:
        "发现偏差！触发人机协作，基于批注回流至 Plan 阶段补充约束，精细化蓝图。",
      tags: ["Refine", "Iterate"],
      activeNode: "plan",
      line: "assess-plan",
      result: "warn",
      in: ["人工批注", "修正意见"],
      out: ["精细化约束"],
      principle: "自洽迭代：允许在执行前通过多次评估循环来消除潜在的架构风险。",
    },
    {
      id: "assess_pass",
      title: "5. Lock Baseline (锁定基线)",
      description: "认知完全对齐。锁定执行基线，将蓝图转化为可被执行的指令集。",
      tags: ["Aligned", "Lock"],
      activeNode: "assess",
      line: "assess-implement",
      result: "pass",
      in: ["对齐后蓝图", "Todo 队列"],
      out: ["执行基线"],
      principle: "基线锁定：一旦对齐，后续执行将严格遵循此蓝图，减少漂移。",
    },
    {
      id: "implement",
      title: "6. Implement (原子化执行)",
      description:
        "聚焦单一任务上下文，消耗一个 Todo 节点，由 Agent 生成中间态产物 (Draft)。",
      tags: ["Execute", "Draft"],
      activeNode: "implement",
      line: "implement-review",
      in: ["执行基线", "当前 Todo"],
      out: ["中间态 Draft"],
      principle: "专注原子：一次只处理一个 Todo，确保上下文窗口高度专注。",
    },
    {
      id: "review",
      title: "7. Review (检查点评审)",
      description:
        "核心卡点：对产出的 Draft 进行单步验证与质量收敛，通过工具运行/Lint/测试进行校验。",
      tags: ["Validate", "收敛"],
      activeNode: "review",
      line: "implement-review",
      in: ["中间态 Draft"],
      out: ["验证结果"],
      principle: "质量收敛：每一个原子步骤都必须通过验证，防止错误累计。",
    },
    {
      id: "review_pass",
      title: "8. Execution Loop (单步通过)",
      description:
        "单步验证通过。循环回到 Implement，继续消耗队列中的下一个 Todo 节点。",
      tags: ["Next", "Passed"],
      activeNode: "implement",
      line: "review-implement",
      result: "pass",
      in: ["验证成功"],
      out: ["下一个 Todo"],
      principle: "稳健推进：基于成功的上一小步，继续执行下一原子任务。",
    },
    {
      id: "review_fail",
      title: "9. Backtrack (全局回溯)",
      description:
        "验证失败或偏离基线。触发全局回溯，将错误信息反馈给 Plan 阶段，修正 Blueprint。",
      tags: ["Failed", "Retry"],
      activeNode: "plan",
      line: "review-plan",
      result: "fail",
      in: ["报错信息", "偏离原因"],
      out: ["重构后的计划"],
      principle:
        "快速失败：一旦发现无法通过局部修正解决的问题，立即回滚重构规划。",
    },
    {
      id: "done",
      title: "10. Done (最终交付)",
      description:
        "Todo 队列清空，全局验证通过。输出最终交付物（代码、文档或其它产物）。",
      tags: ["Finish", "Success"],
      activeNode: "done",
      line: "review-done",
      result: "pass",
      in: ["队列清空", "全量通过"],
      out: ["最终交付物"],
      principle:
        "闭环交付：从模糊意图到可验证的实体产物，完成端到端的 AI 开发循环。",
    },
  ];

  const currentStep = computed(() => {
    return steps[currentStepIndex.value];
  });

  watch(
    () => slidevNav?.clicks?.value,
    (newVal) => {
      if (newVal !== undefined) {
        currentStepIndex.value = Math.min(
          Math.max(newVal, 0),
          steps.length - 1,
        );
      }
    },
    { immediate: true },
  );

  const nextStep = () => {
    if (slidevNav) slidevNav.next();
    else if (currentStepIndex.value < steps.length - 1)
      currentStepIndex.value++;
  };

  const prevStep = () => {
    if (slidevNav) slidevNav.prev();
    else if (currentStepIndex.value > 0) currentStepIndex.value--;
  };

  const reset = () => {
    if (slidevNav?.clicks) slidevNav.clicks.value = 0;
    else currentStepIndex.value = 0;
  };

  // --- 样式辅助函数 ---
  const getNodeClass = (nodeName) => {
    const active = currentStep.value.activeNode;
    if (active === nodeName) {
      return "node-active border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-slate-800 scale-110 z-30 shadow-2xl";
    }
    return "opacity-60 grayscale border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 z-10";
  };

  const getLineClass = (from, to, type = "default") => {
    const currentLine = currentStep.value.line;
    const targetLine = `${from}-${to}`;
    if (currentLine === targetLine) {
      if (type === "warn")
        return "stroke-purple-500 opacity-100 flow-line drop-shadow-md";
      if (type === "fail")
        return "stroke-red-500 opacity-100 flow-line drop-shadow-md";
      if (type === "pass")
        return "stroke-green-500 opacity-100 flow-line drop-shadow-md";
      return "stroke-blue-500 opacity-100 flow-line drop-shadow-md";
    }
    return "stroke-slate-300 dark:stroke-slate-800 opacity-30";
  };

  const getMarker = (from, to, type = "default") => {
    const currentLine = currentStep.value.line;
    const targetLine = `${from}-${to}`;
    if (currentLine === targetLine) {
      if (type === "warn") return `url(#pair-arrow-purple-${instanceId})`;
      if (type === "fail") return `url(#pair-arrow-red-${instanceId})`;
      if (type === "pass") return `url(#pair-arrow-green-${instanceId})`;
      return `url(#pair-arrow-blue-${instanceId})`;
    }
    return `url(#pair-arrow-gray-${instanceId})`;
  };
</script>

<template>
  <div
    class="pair-workflow-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 rounded-none overflow-hidden flex flex-col h-full w-full font-sans"
  >
    <!-- 顶部标题区 -->
    <div
      class="flex-shrink-0 flex justify-between items-center p-3 md:p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b22]"
    >
      <h2
        class="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white"
      >
        AI 协作流程 (PAIR SOP)
      </h2>

      <!-- 控制器 -->
      <div
        class="flex items-center gap-2 bg-slate-100 dark:bg-[#0d1117] p-1 border border-slate-200 dark:border-slate-700/50"
      >
        <button
          @click="prevStep"
          :disabled="currentStepIndex === 0"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
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
          class="px-2 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[80px] text-center tracking-widest"
        >
          STEP {{ currentStepIndex + 1 }}/{{ steps.length }}
        </div>
        <button
          @click="nextStep"
          :disabled="currentStepIndex === steps.length - 1"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
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
          class="px-2 py-1 text-[10px] font-medium hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
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
      class="flex-1 relative bg-[#f8fafc] dark:bg-[#0d1117] overflow-hidden flex items-center justify-center transition-all duration-500"
    >
      <!-- 背景网格 -->
      <div
        class="absolute inset-0 opacity-[0.05]"
        style="
          background-image:
            linear-gradient(#94a3b8 1px, transparent 1px),
            linear-gradient(90deg, #94a3b8 1px, transparent 1px);
          background-size: 32px 32px;
        "
      ></div>

      <!-- 画布内容 -->
      <div
        class="diagram-viewport relative w-full h-full overflow-hidden max-w-[1000px] max-h-[450px]"
      >
        <div
          class="diagram-scaler absolute inset-0 flex items-center justify-center"
        >
          <div class="relative w-[1000px] h-[400px]">
            <!-- SVG 连接层 -->
            <svg
              class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-slate-300 dark:text-slate-700"
            >
              <defs>
                <marker
                  :id="'pair-arrow-gray-' + instanceId"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                </marker>
                <marker
                  :id="'pair-arrow-blue-' + instanceId"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
                </marker>
                <marker
                  :id="'pair-arrow-purple-' + instanceId"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#a855f7" />
                </marker>
                <marker
                  :id="'pair-arrow-green-' + instanceId"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
                </marker>
                <marker
                  :id="'pair-arrow-red-' + instanceId"
                  markerWidth="6"
                  markerHeight="6"
                  refX="16"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- 主流程线 -->
              <line
                x1="130"
                y1="180"
                x2="170"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('input', 'plan')"
                :marker-end="getMarker('input', 'plan')"
              />
              <line
                x1="290"
                y1="180"
                x2="330"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('plan', 'assess')"
                :marker-end="getMarker('plan', 'assess')"
              />
              <line
                x1="450"
                y1="180"
                x2="520"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('assess', 'implement')"
                :marker-end="getMarker('assess', 'implement')"
              />
              <line
                x1="640"
                y1="180"
                x2="680"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('implement', 'review')"
                :marker-end="getMarker('implement', 'review')"
              />
              <line
                x1="800"
                y1="180"
                x2="860"
                y2="180"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass('review', 'done')"
                :marker-end="getMarker('review', 'done')"
              />

              <!-- 认知回流 (Assess -> Plan) - 圆角正交路径 -->
              <path
                d="M 390 235 L 390 280 Q 390 290 380 290 L 240 290 Q 230 290 230 280 L 230 235"
                fill="none"
                stroke-width="2"
                stroke-dasharray="6,4"
                class="transition-all"
                :class="getLineClass('assess', 'plan', 'warn')"
                :marker-end="getMarker('assess', 'plan', 'warn')"
              />

              <!-- 执行回流 (Review -> Implement) - 圆角正交路径 -->
              <path
                d="M 740 125 L 740 80 Q 740 70 730 70 L 590 70 Q 580 70 580 80 L 580 125"
                fill="none"
                stroke-width="2"
                stroke-dasharray="6,4"
                class="transition-all"
                :class="getLineClass('review', 'implement', 'pass')"
                :marker-end="getMarker('review', 'implement', 'pass')"
              />

              <!-- 全局回溯 (Review -> Plan) - 圆角正交路径 -->
              <path
                d="M 740 235 L 740 340 Q 740 350 730 350 L 240 350 Q 230 350 230 340 L 230 235"
                fill="none"
                stroke-width="2"
                stroke-dasharray="8,4"
                class="transition-all"
                :class="getLineClass('review', 'plan', 'fail')"
                :marker-end="getMarker('review', 'plan', 'fail')"
              />
            </svg>

            <!-- 循环背景标注框 -->
            <div
              class="absolute top-[50px] left-[155px] w-[310px] h-[260px] border border-dashed border-purple-200 dark:border-purple-800/50 bg-purple-50/5 dark:bg-purple-900/5 pointer-events-none rounded-lg"
            >
              <div
                class="absolute -top-3 left-4 bg-[#f8fafc] dark:bg-[#0d1117] px-2 text-[9px] font-black text-purple-400 uppercase tracking-[0.2em]"
              >
                Alignment Loop
              </div>
            </div>
            <div
              class="absolute top-[50px] left-[505px] w-[310px] h-[260px] border border-dashed border-amber-200 dark:border-amber-800/50 bg-amber-50/5 dark:bg-amber-900/5 pointer-events-none rounded-lg"
            >
              <div
                class="absolute -top-3 left-4 bg-[#f8fafc] dark:bg-[#0d1117] px-2 text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]"
              >
                Execution Loop
              </div>
            </div>

            <!-- 节点层 -->
            <!-- 1. Input -->
            <div
              class="absolute top-[130px] left-[10px] w-[120px] h-[105px] node-float"
              :class="getNodeClass('input')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow"
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
                  class="text-slate-400 dark:text-slate-500"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
                </svg>
                <span class="font-bold text-xs tracking-tight"
                  >Intent Input</span
                >
                <span class="text-[9px] text-slate-400 uppercase font-black"
                  >意图注入</span
                >
              </div>
            </div>

            <!-- 2. Plan -->
            <div
              class="absolute top-[130px] left-[170px] w-[120px] h-[105px] node-float"
              :class="getNodeClass('plan')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow"
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
                  class="text-blue-500"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                  <path d="M9 10h6" />
                </svg>
                <span class="font-bold text-xs tracking-tight">Planning</span>
                <span class="text-[9px] text-slate-400 uppercase font-black"
                  >蓝图与 Todo</span
                >
              </div>
            </div>

            <!-- 3. Assess -->
            <div
              class="absolute top-[130px] left-[330px] w-[120px] h-[105px] node-float"
              :class="getNodeClass('assess')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow relative"
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
                  class="text-purple-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <polyline points="16 11 18 13 22 9" />
                </svg>
                <span class="font-bold text-xs tracking-tight"
                  >Assess / HITL</span
                >
                <span class="text-[9px] text-slate-400 uppercase font-black"
                  >人机对齐</span
                >
                <div
                  v-if="currentStep.id === 'assess_pass'"
                  class="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black shadow-lg animate-bounce-short"
                >
                  ALIGNED
                </div>
                <div
                  v-if="currentStep.id === 'assess_loop'"
                  class="absolute -top-2 -right-2 bg-purple-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black shadow-lg"
                >
                  REVISE
                </div>
              </div>
            </div>

            <!-- 4. Implement -->
            <div
              class="absolute top-[130px] left-[520px] w-[120px] h-[105px] node-float"
              :class="getNodeClass('implement')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow"
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
                  class="text-green-500"
                >
                  <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
                </svg>
                <span class="font-bold text-xs tracking-tight">Implement</span>
                <span class="text-[9px] text-slate-400 uppercase font-black"
                  >执行行动</span
                >
              </div>
            </div>

            <!-- 5. Review -->
            <div
              class="absolute top-[130px] left-[680px] w-[120px] h-[105px] node-float"
              :class="getNodeClass('review')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow relative"
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
                  :class="
                    currentStep.result === 'fail'
                      ? 'text-red-500'
                      : 'text-amber-500'
                  "
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span class="font-bold text-xs tracking-tight">Review</span>
                <span class="text-[9px] text-slate-400 uppercase font-black"
                  >验证与收敛</span
                >
                <div
                  v-if="currentStep.id === 'review_fail'"
                  class="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black shadow-lg animate-pulse"
                >
                  FAIL
                </div>
                <div
                  v-if="currentStep.id === 'review_pass'"
                  class="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black shadow-lg animate-bounce-short"
                >
                  PASS
                </div>
              </div>
            </div>

            <!-- 6. Done -->
            <div
              class="absolute top-[140px] left-[860px] w-[100px] h-[85px] node-float"
              :class="getNodeClass('done')"
            >
              <div
                class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-700 p-2 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span class="font-bold text-xs uppercase tracking-widest"
                  >Done</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部状态看板 (带原则框) -->
    <div
      class="flex-shrink-0 bg-slate-50 dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 flex gap-2 items-start shadow-inner overflow-hidden"
      style="height: 105px !important; padding: 8px !important"
    >
      <!-- 左侧：描述与 Tag -->
      <div class="flex-1 max-w-[42%] flex gap-2 items-start">
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
              v-if="
                currentStep.result !== 'fail' && currentStep.result !== 'pass'
              "
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
              v-else-if="currentStep.result === 'pass'"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-green-600 dark:text-green-400"
            >
              <polyline points="20 6 9 17 4 12" />
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
        <div class="flex flex-col gap-0.5 overflow-hidden">
          <h3
            class="font-bold mb-0.5 font-mono uppercase flex items-center gap-2 text-slate-900 dark:text-white"
            style="font-size: 10px !important"
          >
            {{ currentStep.title }}
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
              class="px-1 py-0 bg-slate-200 dark:bg-slate-800 rounded-none border border-slate-300 dark:border-slate-700 font-mono text-slate-500 dark:text-slate-400"
              style="font-size: 8px !important"
              >#{{ tag }}</span
            >
          </div>
        </div>
      </div>

      <!-- 中间：I/O 数据流转 -->
      <div
        class="flex-shrink-0 flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 p-1.5 px-3 rounded mx-2"
      >
        <div class="flex flex-col items-end min-w-[80px]">
          <span
            class="text-[7px] font-black text-slate-400 tracking-tighter uppercase mb-0.5"
            >Input Context</span
          >
          <div class="flex flex-col gap-0.5 items-end">
            <span
              v-for="i in currentStep.in"
              :key="i"
              class="text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap"
              >{{ i }}</span
            >
          </div>
        </div>
        <div class="text-slate-300 dark:text-slate-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <div class="flex flex-col items-start min-w-[80px]">
          <span
            class="text-[7px] font-black text-blue-400/80 tracking-tighter uppercase mb-0.5"
            >Output Artifact</span
          >
          <div class="flex flex-col gap-0.5 items-start">
            <span
              v-for="o in currentStep.out"
              :key="o"
              class="text-[9px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0 rounded border border-blue-100 dark:border-blue-800 font-bold whitespace-nowrap"
              >{{ o }}</span
            >
          </div>
        </div>
      </div>

      <!-- 右侧：核心原则提示框 (黄色) -->
      <div
        class="flex-shrink-0 w-[210px] bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded p-2 relative overflow-hidden group"
      >
        <div
          class="text-[9px] font-black text-amber-700 dark:text-amber-500 mb-1 flex items-center gap-1 uppercase tracking-wider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
          >
            <path d="M12 2v10" />
            <path d="M16 17l-4 4-4-4" />
            <path d="M12 21V12" />
          </svg>
          Principle · 核心原则
        </div>
        <p
          class="text-[9px] text-amber-900/80 dark:text-amber-200/80 leading-snug font-medium italic"
        >
          "{{ currentStep.principle }}"
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .pair-workflow-container {
    container-type: size;
  }
  .diagram-viewport {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .diagram-scaler {
    transform-origin: center center;
    transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 480)));
  }
  @container (max-height: 400px) {
    .diagram-scaler {
      transform: scale(min(0.85, calc(100cqh / 450)));
    }
  }

  .flow-line {
    stroke-dasharray: 8;
    animation: flow 1.5s linear infinite;
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
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: default;
  }
  .node-active {
    box-shadow: 0 20px 50px rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.5) !important;
  }
  .dark .node-active {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .animate-bounce-short {
    animation: bounce-short 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  @keyframes bounce-short {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
</style>
