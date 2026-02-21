<script setup>
  import { computed } from "vue";

  const traditionalSteps = [
    { id: 1, name: "需求与规划", time: "几天 - 几周" },
    { id: 2, name: "系统设计", time: "几周" },
    { id: 3, name: "实现与编码", time: "几周 - 几个月" },
    { id: 4, name: "测试与 QA", time: "几天 - 几周" },
    { id: 5, name: "代码审查", time: "几天" },
    { id: 6, name: "部署与发布", time: "几天" },
    { id: 7, name: "监控与观测", time: "持续" },
    { id: 8, name: "反馈与迭代", time: "持续" },
  ];

  const agenticSteps = [
    { id: 1, name: "表达意图", time: "几分钟" },
    { id: 2, name: "Agent 理解", time: "几秒钟" },
    { id: 3, name: "Agent 实现", time: "几分钟" },
    { id: 4, name: "Agent 测试+文档", time: "几分钟" },
    { id: 5, name: "人工核查", time: "几分钟 - 几小时" },
    { id: 6, name: "部署与发布", time: "几分钟" },
    { id: 7, name: "监控与观测", time: "持续" },
    { id: 8, name: "学习与迭代", time: "持续" },
  ];

  // 预计算 8 个节点在圆上的位置
  // 新中心点 Y = 240
  const getPosition = (index, total = 8, radius = 150, cx = 250, cy = 240) => {
    const angle = (index * (360 / total) - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // 绘制有缝隙的线段，以免箭头被外框遮挡，间隙控制在 14 度
  const getArcPath = (cx, cy, r, idx) => {
    const startDeg = idx * 45 - 90 + 14;
    const endDeg = (idx + 1) * 45 - 90 - 14;
    const startRad = startDeg * (Math.PI / 180);
    const endRad = endDeg * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  const keyDifferences = [
    { trad: "串行按阶段交接", agentic: "流式的 Agent 循环" },
    { trad: "人类手写所有代码", agentic: "人类指导，Agent 执行" },
    { trad: "把写文档当成马后炮", agentic: "文档由 AI 内联实时生成" },
    { trad: "人工响应故障排查", agentic: "Agent 辅助自动诊断与修复" },
  ];
</script>

<template>
  <div
    class="sdlc-vs-adlc-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 rounded-none overflow-hidden flex flex-col h-full w-full"
  >
    <!-- 顶部独立标题区 (脱离缩放引擎，保证永远不发生顶部重叠) -->
    <div
      class="flex-shrink-0 flex justify-center items-center pt-6 pb-2 px-4 z-30"
    >
      <h2
        class="text-[22px] md:text-[28px] leading-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 m-0 tracking-tight text-center"
      >
        软件开发生命周期 (SDLC)：Agent 编程工具前后的对比
      </h2>
    </div>

    <!-- 全屏自适应容器 -->
    <div
      class="flex-1 relative bg-white dark:bg-[#0d1117] overflow-hidden flex items-center justify-center transition-all duration-500"
    >
      <!-- 背景网格 -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="
          background-image:
            linear-gradient(#94a3b8 1px, transparent 1px),
            linear-gradient(90deg, #94a3b8 1px, transparent 1px);
          background-size: 40px 40px;
        "
      ></div>

      <!-- 画布缩放核心，支持自适应比例 -->
      <div class="diagram-viewport relative w-full h-full overflow-hidden">
        <div
          class="diagram-scaler absolute inset-0 flex items-center justify-center"
        >
          <div class="relative w-[1000px] h-[600px]">
            <!-- SVG 连接层 (纯线条，绝不包含文字) -->
            <svg
              class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-slate-300 dark:text-slate-700"
            >
              <defs>
                <marker
                  id="arrow-red"
                  markerWidth="5"
                  markerHeight="5"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <path d="M0,0 L0,4 L4,2 z" fill="#ef4444" opacity="0.6" />
                </marker>
                <marker
                  id="arrow-green"
                  markerWidth="5"
                  markerHeight="5"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <path d="M0,0 L0,4 L4,2 z" fill="#10b981" opacity="0.6" />
                </marker>
                <marker
                  id="arrow-gray"
                  markerWidth="5"
                  markerHeight="5"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <path
                    d="M0,0 L0,4 L4,2 z"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </marker>
              </defs>

              <!-- Traditional Circle Arcs (Left, center: 250, 240, r=150) -->
              <g v-for="i in 8" :key="'t-arc-' + i">
                <path
                  :d="getArcPath(250, 240, 150, i - 1)"
                  fill="none"
                  class="stroke-red-400 dark:stroke-red-800/60 transition-all"
                  stroke-width="2"
                  marker-end="url(#arrow-red)"
                />
              </g>

              <!-- Agentic Circle Arcs (Right, center: 750, 240, r=150) -->
              <g v-for="i in 8" :key="'a-arc-' + i">
                <path
                  :d="getArcPath(750, 240, 150, i - 1)"
                  fill="none"
                  class="stroke-green-400 dark:stroke-green-800/60 transition-all"
                  stroke-width="2"
                  marker-end="url(#arrow-green)"
                />
              </g>

              <!-- Inter-cycle Connecting Lines -->
              <!-- bugs -->
              <path
                d="M 330 300 Q 430 270 380 240"
                fill="none"
                class="stroke-slate-400 dark:stroke-slate-600"
                stroke-dasharray="4,4"
                marker-end="url(#arrow-gray)"
              />

              <!-- changes -->
              <path
                d="M 230 340 Q 320 240 370 260"
                fill="none"
                class="stroke-slate-400 dark:stroke-slate-600"
                stroke-dasharray="4,4"
                marker-end="url(#arrow-gray)"
              />

              <!-- incidents -->
              <path
                d="M 200 170 Q 250 250 360 250"
                fill="none"
                class="stroke-slate-400 dark:stroke-slate-600"
                stroke-dasharray="4,4"
                marker-end="url(#arrow-gray)"
              />

              <!-- auto fix -->
              <path
                d="M 640 220 Q 730 180 780 140"
                fill="none"
                class="stroke-slate-400 dark:stroke-slate-600"
                stroke-dasharray="4,4"
                marker-end="url(#arrow-gray)"
              />

              <!-- quick refine -->
              <path
                d="M 660 340 Q 700 240 850 240"
                fill="none"
                class="stroke-slate-400 dark:stroke-slate-600"
                stroke-dasharray="4,4"
                marker-end="url(#arrow-gray)"
              />

              <!-- Transformation Centered Arrow -->
              <g transform="translate(420, 240)">
                <line
                  x1="0"
                  y1="0"
                  x2="160"
                  y2="0"
                  stroke="currentColor"
                  stroke-width="2"
                  class="opacity-60"
                  marker-end="url(#arrow-gray)"
                />
              </g>
            </svg>

            <!-- DOM 文字层 (替代绝对不可控的 SVG Text) -->
            <div
              class="absolute text-[11px] font-mono text-slate-500 dark:text-slate-400 opacity-60 z-10 pointer-events-none"
              style="left: 310px; top: 275px"
            >
              bugs
            </div>
            <div
              class="absolute text-[11px] font-mono text-slate-500 dark:text-slate-400 opacity-60 z-10 pointer-events-none"
              style="left: 260px; top: 300px"
            >
              changes
            </div>
            <div
              class="absolute text-[11px] font-mono text-slate-500 dark:text-slate-400 opacity-60 z-10 pointer-events-none"
              style="left: 210px; top: 220px"
            >
              incidents
            </div>
            <div
              class="absolute text-[11px] font-mono text-slate-500 dark:text-slate-400 opacity-60 z-10 pointer-events-none"
              style="left: 680px; top: 165px"
            >
              auto fix
            </div>
            <div
              class="absolute text-[11px] font-mono text-slate-500 dark:text-slate-400 opacity-60 z-10 pointer-events-none"
              style="left: 760px; top: 300px"
            >
              quick refine
            </div>
            <div
              class="absolute text-[15px] font-bold text-slate-700 dark:text-slate-300 opacity-80 z-10 pointer-events-none text-center w-[160px]"
              style="left: 420px; top: 218px"
            >
              范式转变 Transformation
            </div>

            <!-- Traditional Center Setup -->
            <div
              class="absolute left-[160px] top-[200px] text-center w-[180px] pointer-events-none z-0"
            >
              <h3
                class="font-bold text-xl text-slate-800 dark:text-slate-200 m-0"
              >
                传统 SDLC
              </h3>
              <p class="text-[11px] text-slate-500 font-mono mt-1 m-0">
                每个周期：几周-几个月
              </p>
            </div>

            <!-- Traditional Nodes -->
            <div
              v-for="(step, idx) in traditionalSteps"
              :key="'trad-' + step.id"
              class="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-[110px]"
              :style="{
                left: getPosition(idx, 8, 150, 250, 240).x + 'px',
                top: getPosition(idx, 8, 150, 250, 240).y + 'px',
              }"
            >
              <div
                class="bg-red-50/90 dark:bg-red-950/90 backdrop-blur-sm border border-red-200 dark:border-red-900 shadow-sm rounded-md p-2 text-center transition-transform hover:scale-105"
              >
                <div
                  class="text-[11px] font-bold text-red-900 dark:text-red-100 leading-tight tracking-wide"
                >
                  {{ step.id }}. {{ step.name }}
                </div>
                <div
                  class="text-[9px] text-red-700/80 dark:text-red-300/80 mt-1 font-mono"
                >
                  ({{ step.time }})
                </div>
              </div>
            </div>

            <!-- Agentic Center Setup -->
            <div
              class="absolute left-[660px] top-[200px] text-center w-[180px] pointer-events-none z-0"
            >
              <h3
                class="font-bold text-xl text-emerald-700 dark:text-emerald-400 m-0"
              >
                Agentic SDLC
              </h3>
              <p
                class="text-[11px] text-emerald-600/70 dark:text-emerald-500/70 font-mono mt-1 m-0"
              >
                每个周期：几小时-几天
              </p>
            </div>

            <!-- Agentic Nodes -->
            <div
              v-for="(step, idx) in agenticSteps"
              :key="'agent-' + step.id"
              class="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-[110px]"
              :style="{
                left: getPosition(idx, 8, 150, 750, 240).x + 'px',
                top: getPosition(idx, 8, 150, 750, 240).y + 'px',
              }"
            >
              <div
                class="bg-green-50/90 dark:bg-green-950/90 backdrop-blur-sm border border-green-200 dark:border-green-800 shadow-sm rounded-lg p-2 text-center transition-transform hover:scale-105"
              >
                <div
                  class="text-[11px] font-bold text-green-900 dark:text-green-100 leading-tight tracking-wide"
                >
                  {{ step.id }}. {{ step.name }}
                </div>
                <div
                  class="text-[9px] text-green-700/80 dark:text-green-300/80 mt-1 font-mono"
                >
                  ({{ step.time }})
                </div>
              </div>
            </div>

            <!-- Differences Panel at Bottom -->
            <div
              class="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[640px] border-2 border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-[#161b22]/95 backdrop-blur shadow-xl rounded-2xl z-20 pb-4 pt-3 px-6"
            >
              <div
                class="text-center font-bold text-slate-700 dark:text-slate-300 mb-3 text-sm tracking-widest hidden md:block"
              >
                核心差异 (Key Differences)
              </div>
              <div class="flex flex-col gap-2">
                <div
                  v-for="(diff, idx) in keyDifferences"
                  :key="idx"
                  class="flex items-center justify-between text-[11px] md:text-[13px]"
                >
                  <div
                    class="flex-1 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-200 px-3 py-1.5 rounded-lg text-center font-medium"
                  >
                    {{ diff.trad }}
                  </div>
                  <div class="w-16 flex justify-center text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                  <div
                    class="flex-1 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-800 dark:text-green-200 px-3 py-1.5 rounded-lg text-center font-bold shadow-sm"
                  >
                    {{ diff.agentic }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sdlc-vs-adlc-container {
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,
      sans-serif;
  }

  /* Ensure maximum flexibility of internal content when scaling */
  .diagram-viewport {
    container-type: size;
  }

  /* 动态自适应缩放机制 */
  .diagram-scaler {
    transform-origin: center center;
    /* 支持极端情况下的宽高比压缩。基础画板大小 1000x600 */
    transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 620)));
  }

  /* 提供额外断点以支持较矮的屏幕（典型宽屏投影仪） */
  @container (max-height: 550px) {
    .diagram-scaler {
      transform: scale(min(0.85, calc(100cqh / 600)));
    }
  }
</style>
