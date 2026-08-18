<script setup>
import { ref, computed, watch } from "vue";
import { useNav } from "@slidev/client";

const currentStepIndex = ref(0);
let slidevNav;
try { slidevNav = useNav(); } catch (e) {}

// ── 核心部件（按三层拓扑摆放：人机界面 / 编排层 / 工具后端）──
const nodes = {
  user:   { label: "用户",       sub: "You",         icon: "👤", x: 500, y: 42,  perceivable: true },
  host:   { label: "Host",       sub: "Claude Code", icon: "🖥️", x: 500, y: 160, perceivable: true },
  llm:    { label: "LLM",        sub: "推理决策",     icon: "🧠", x: 150, y: 160, perceivable: false },
  client: { label: "MCP Client", sub: "SDK·一对一",   icon: "🔌", x: 290, y: 288, perceivable: false },
  server: { label: "MCP Server", sub: "工具提供方",   icon: "⚙️", x: 560, y: 288, perceivable: false },
  ext:    { label: "外部系统",   sub: "DB·API·FS",   icon: "🗄️", x: 838, y: 288, perceivable: false },
};

// ── 静态接线（永远可见的“地图”）──
const edges = {
  E1: { x1: 500, y1: 73,  x2: 500, y2: 129 },  // user ↔ host
  E2: { x1: 429, y1: 160, x2: 223, y2: 160 },  // host ↔ llm
  E3: { x1: 470, y1: 191, x2: 305, y2: 257 },  // host ↔ client
  E4: { x1: 361, y1: 288, x2: 489, y2: 288 },  // client ↔ server
  E5: { x1: 631, y1: 288, x2: 767, y2: 288 },  // server ↔ ext
};

// ── 三层背景带 ──
const bands = [
  { label: "人机界面", y: 6,   h: 70,  color: "#eef2ff" },
  { label: "编排层",   y: 116, h: 88,  color: "#f5f3ff" },
  { label: "工具后端", y: 244, h: 88,  color: "#f0fdf4" },
];

// ── 11 步：① 初始化加载（用户无感）→ ② 运行时一次问答（用户有感，含循环）──
const steps = [
  { phase: 1, title: "① 读取配置", desc: "Host 启动时读 .mcp.json，确定本次会话要连哪些 MCP Server",
    nodes: ["host"], flows: [], label: "读 .mcp.json", labelAt: { x: 640, y: 150 }, perceive: false },
  { phase: 1, title: "② 建连接 + 握手", desc: "Host 为每个 Server 拉起一个 Client；initialize 协商协议版本与能力，建立长连接",
    nodes: ["host", "client", "server"], flows: [["E3","fwd"],["E4","fwd"]], label: "initialize", labelAt: { x: 388, y: 250 }, perceive: false },
  { phase: 1, title: "③ 拉取工具清单", desc: "tools/list：Server 返回每个工具的 name + description + 入参 schema",
    nodes: ["server", "client", "host"], flows: [["E4","rev"],["E3","rev"]], label: "tools/list ↩ 清单", labelAt: { x: 388, y: 250 }, perceive: false },
  { phase: 1, title: "④ 包装进工具池", desc: "Host 把每个工具包装成 mcp__server__tool 放进「工具池」；随请求作为可用工具清单交给模型（工具多时可按需曝光）",
    nodes: ["host"], flows: [], label: "🧰 工具池 mcp__server__tool", labelAt: { x: 660, y: 150 }, perceive: false },
  { phase: 2, title: "⑤ 用户提问", desc: "用户输入一句 prompt，例如「帮我查下 PROJ-1024 这单」",
    nodes: ["user", "host"], flows: [["E1","fwd"]], label: "prompt", labelAt: { x: 565, y: 101 }, perceive: true },
  { phase: 2, title: "⑥ LLM 自主决策", desc: "Host 把可用工具清单连同上下文交给 LLM；LLM 自己决定调哪个工具、传什么参数（tool_call）",
    nodes: ["host", "llm"], flows: [["E2","fwd"]], label: "上下文+工具 → tool_call", labelAt: { x: 326, y: 142 }, perceive: false },
  { phase: 2, title: "⑦ 权限检查 + 确认", desc: "Host 检查权限与 deny 规则；必要时弹确认「AI 想调用 get_jira_issue」，用户可批准 / 拒绝",
    nodes: ["host", "user"], flows: [["E1","rev"]], label: "确认 ?", labelAt: { x: 565, y: 101 }, perceive: true },
  { phase: 2, title: "⑧ 发起调用", desc: "Client 把请求封装成 JSON-RPC tools/call，经 stdio / HTTP 发给 Server",
    nodes: ["host", "client", "server"], flows: [["E3","fwd"],["E4","fwd"]], label: "tools/call", labelAt: { x: 388, y: 250 }, perceive: false },
  { phase: 2, title: "⑨ 执行真实能力", desc: "Server 调用 DB / API / 文件系统 —— 密钥只在 Server 端，模型拿不到",
    nodes: ["server", "ext"], flows: [["E5","fwd"]], label: "查询 / 写入", labelAt: { x: 699, y: 270 }, perceive: false },
  { phase: 2, title: "⑩ 结果回灌（可循环）", desc: "结果沿原路回到 LLM 上下文；LLM 据此继续 —— 可能再调工具（回到⑥），或给出答案",
    nodes: ["ext", "server", "client", "host", "llm"], flows: [["E5","rev"],["E4","rev"],["E3","rev"],["E2","fwd"]], label: "result ↩ 回灌", labelAt: { x: 388, y: 250 }, loop: true, perceive: false },
  { phase: 2, title: "⑪ 回答用户", desc: "LLM 生成带真实数据的最终回答，呈现给用户",
    nodes: ["host", "user"], flows: [["E1","rev"]], label: "最终答案", labelAt: { x: 565, y: 101 }, perceive: true },
];

const currentStep = computed(() => steps[currentStepIndex.value] || steps[0]);
const phaseColor = computed(() => (currentStep.value.phase === 1 ? "amber" : "blue"));
const strokeColor = computed(() => (currentStep.value.phase === 1 ? "#f59e0b" : "#3b82f6"));

watch(() => slidevNav?.clicks?.value, (v) => {
  if (v !== undefined) currentStepIndex.value = Math.min(Math.max(v, 0), steps.length - 1);
}, { immediate: true });

const isActive = (id) => currentStep.value.nodes.includes(id);
const activeFlows = computed(() =>
  currentStep.value.flows.map(([k, dir]) => ({ ...edges[k], dir }))
);

const next = () => { if (slidevNav) slidevNav.next(); else if (currentStepIndex.value < steps.length - 1) currentStepIndex.value++; };
const prev = () => { if (slidevNav) slidevNav.prev(); else if (currentStepIndex.value > 0) currentStepIndex.value--; };
const reset = () => { if (slidevNav && slidevNav.clicks) slidevNav.clicks.value = 0; else currentStepIndex.value = 0; };
</script>

<template>
  <div class="mcpflow">
    <!-- 头部：阶段 + 控制 -->
    <div class="head">
      <div class="phase-bar">
        <div class="pill amber" :class="{ on: currentStep.phase === 1 }">
          <b>①</b> 初始化加载 <span>一次性·用户无感</span>
        </div>
        <span class="sep">→</span>
        <div class="pill blue" :class="{ on: currentStep.phase === 2 }">
          <b>②</b> 运行时 <span>每次 prompt·用户有感</span>
        </div>
      </div>
      <div class="ctrl">
        <button @click="prev" :disabled="currentStepIndex === 0">←</button>
        <span class="no">{{ currentStepIndex + 1 }} / {{ steps.length }}</span>
        <button @click="next" :disabled="currentStepIndex === steps.length - 1">→</button>
        <i></i><button class="reset" @click="reset">重置</button>
      </div>
    </div>

    <!-- 拓扑图 -->
    <div class="stage">
      <svg viewBox="0 0 1000 340" preserveAspectRatio="xMidYMid meet" class="diagram">
        <defs>
          <marker id="arw-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
          </marker>
          <marker id="arw-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
          </marker>
        </defs>

        <!-- 三层背景带 -->
        <g>
          <rect v-for="b in bands" :key="b.label" :x="10" :y="b.y" :width="980" :height="b.h" :rx="14" :fill="b.color" />
          <text v-for="b in bands" :key="b.label + 't'" :x="26" :y="b.y + 20" class="band-label">{{ b.label }}</text>
        </g>

        <!-- 静态接线（地图） -->
        <g>
          <line v-for="(e, k) in edges" :key="k" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
                stroke="#cbd5e1" stroke-width="2" stroke-dasharray="2 4" opacity="0.7" />
        </g>

        <!-- 当前步骤的流动 -->
        <g>
          <line v-for="(f, i) in activeFlows" :key="i" :x1="f.x1" :y1="f.y1" :x2="f.x2" :y2="f.y2"
                :stroke="strokeColor" stroke-width="3.5" stroke-linecap="round"
                class="flow" :class="f.dir === 'fwd' ? 'fwd' : 'rev'"
                :marker-end="f.dir === 'fwd' ? `url(#arw-${phaseColor})` : null"
                :marker-start="f.dir === 'rev' ? `url(#arw-${phaseColor})` : null" />
        </g>

        <!-- 部件节点 -->
        <g v-for="(n, id) in nodes" :key="id" :transform="`translate(${n.x},${n.y})`"
           class="node" :class="[phaseColor, isActive(id) ? 'on' : 'off']">
          <rect x="-71" y="-31" width="142" height="62" rx="13" class="node-box" />
          <text x="-46" y="4" class="n-icon">{{ n.icon }}</text>
          <text x="6" y="-3" class="n-label">{{ n.label }}</text>
          <text x="6" y="16" class="n-sub">{{ n.sub }}</text>
        </g>

        <!-- 载荷标签（数据流内容） -->
        <g v-if="currentStep.label" :transform="`translate(${currentStep.labelAt.x},${currentStep.labelAt.y})`" class="chip" :class="phaseColor">
          <rect :x="-currentStep.label.length * 4.6 - 10" y="-13" :width="currentStep.label.length * 9.2 + 20" height="26" rx="13" />
          <text x="0" y="5" class="chip-text">{{ currentStep.label }}</text>
        </g>

        <!-- 循环徽标 -->
        <g v-if="currentStep.loop" transform="translate(310,120)" class="loop-badge">
          <rect x="-58" y="-13" width="116" height="26" rx="13" />
          <text x="0" y="5">↻ 可循环回 ⑥</text>
        </g>
      </svg>
    </div>

    <!-- 底部：感知提示 + 步骤详情 -->
    <div class="status" :class="phaseColor">
      <div class="s-top">
        <div class="s-title">{{ currentStep.title }}</div>
        <span class="s-eye" :class="{ on: currentStep.perceive }">{{ currentStep.perceive ? "👁 用户能看到" : "幕后·用户无感" }}</span>
      </div>
      <div class="s-desc">{{ currentStep.desc }}</div>
    </div>
  </div>
</template>

<style scoped>
.mcpflow { width: 100%; display: flex; flex-direction: column; gap: 0.45rem; font-family: "Inter", system-ui, sans-serif; }

.head { display: flex; justify-content: space-between; align-items: center; }
.phase-bar { display: flex; align-items: center; gap: 0.5rem; }
.pill { display: flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.75rem; border-radius: 999px; font-weight: 700; font-size: 0.85rem; border: 1.5px solid #e2e8f0; background: #f8fafc; color: #94a3b8; opacity: 0.7; transition: all .3s; }
.pill span { font-size: 0.68rem; font-weight: 500; }
.pill.on.amber { background: #fffbeb; border-color: #f59e0b; color: #b45309; opacity: 1; }
.pill.on.blue { background: #eff6ff; border-color: #3b82f6; color: #1d4ed8; opacity: 1; }
.sep { color: #cbd5e1; font-weight: 700; }
.ctrl { display: flex; align-items: center; gap: 0.35rem; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 0.55rem; padding: 0.15rem 0.35rem; }
.ctrl button { width: 1.6rem; height: 1.6rem; border-radius: 0.35rem; font-weight: 700; color: #475569; }
.ctrl button:hover { background: #e2e8f0; }
.ctrl button:disabled { opacity: 0.3; }
.ctrl .no { font-family: "JetBrains Mono", monospace; font-size: 0.78rem; font-weight: 700; color: #3b82f6; min-width: 3.2rem; text-align: center; }
.ctrl i { width: 1px; height: 1rem; background: #cbd5e1; }
.ctrl .reset { width: auto; padding: 0 0.5rem; font-size: 0.72rem; }

.stage { width: 100%; }
.diagram { width: 100%; aspect-ratio: 1000 / 340; display: block; }

.band-label { font-size: 11px; font-weight: 700; fill: #94a3b8; }

.node-box { fill: #fff; stroke: #e2e8f0; stroke-width: 1.5; transition: all .3s; }
.node .n-icon { font-size: 22px; text-anchor: middle; }
.node .n-label { font-size: 14px; font-weight: 700; fill: #334155; text-anchor: middle; }
.node .n-sub { font-size: 9.5px; fill: #94a3b8; text-anchor: middle; }
.node.off { opacity: 0.45; }
.node.on .node-box { stroke-width: 2.5; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12)); }
.node.on.amber .node-box { stroke: #f59e0b; fill: #fffbeb; }
.node.on.blue .node-box { stroke: #3b82f6; fill: #eff6ff; }

.flow { stroke-dasharray: 7 6; }
.flow.fwd { animation: dash 0.6s linear infinite; }
.flow.rev { animation: dash 0.6s linear infinite reverse; }
@keyframes dash { to { stroke-dashoffset: -13; } }

.chip rect { fill: #fff; stroke-width: 1.5; }
.chip.amber rect { stroke: #f59e0b; }
.chip.blue rect { stroke: #3b82f6; }
.chip-text { font-size: 12px; font-weight: 700; text-anchor: middle; font-family: "JetBrains Mono", monospace; }
.chip.amber .chip-text { fill: #b45309; }
.chip.blue .chip-text { fill: #1d4ed8; }

.loop-badge rect { fill: #eef2ff; stroke: #6366f1; stroke-width: 1.5; }
.loop-badge text { font-size: 12px; font-weight: 700; fill: #4338ca; text-anchor: middle; }

.status { border-radius: 0.6rem; padding: 0.55rem 0.9rem; border-left: 4px solid #cbd5e1; background: #f8fafc; }
.status.amber { border-left-color: #f59e0b; background: #fffbeb; }
.status.blue { border-left-color: #3b82f6; background: #eff6ff; }
.s-top { display: flex; align-items: center; justify-content: space-between; }
.s-title { font-weight: 700; font-size: 0.98rem; }
.status.amber .s-title { color: #b45309; }
.status.blue .s-title { color: #1d4ed8; }
.s-eye { font-size: 0.72rem; font-weight: 600; padding: 0.1rem 0.55rem; border-radius: 999px; background: #f1f5f9; color: #94a3b8; border: 1px dashed #cbd5e1; }
.s-eye.on { background: #ecfdf5; color: #047857; border: 1px solid #10b981; }
.s-desc { font-size: 0.82rem; color: #475569; line-height: 1.5; margin-top: 0.2rem; }

:global(.dark) .node-box { fill: #1c2128; }
:global(.dark) .status, :global(.dark) .ctrl { background: #161b22; border-color: #334155; }
:global(.dark) .chip rect { fill: #1c2128; }
</style>
