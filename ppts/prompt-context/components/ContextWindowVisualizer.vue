<script setup lang="ts">
interface ContextLayer {
  id: string;
  label: string;
  role: string;
  source: string;
  method: string;
  position: string;
}

interface SourceEntry {
  label: string;
  hint: string;
}

interface AssemblyTip {
  label: string;
  text: string;
}

const sourceEntries: SourceEntry[] = [
  { label: "Rules / Memory", hint: "AGENTS · CLAUDE · .cursor" },
  { label: "@ References", hint: "file · folder · docs · symbols" },
  { label: "Tools / MCP", hint: "terminal · browser · API" },
  { label: "History / Compact", hint: "session · summary · handoff" },
];

const contextLayers: ContextLayer[] = [
  {
    id: "system",
    label: "System Prompt",
    role: "全局规则、角色、安全边界",
    source: "AGENTS.md / CLAUDE.md",
    method: "固定注入，放在窗口最前",
    position: "开头高权重",
  },
  {
    id: "memory",
    label: "Memory / Project Rules",
    role: "项目约定、偏好、长期记忆",
    source: ".cursor/rules / 项目规范 / 用户偏好",
    method: "按项目和任务选择性注入",
    position: "稳定背景",
  },
  {
    id: "retrieval",
    label: "RAG / Referenced Files",
    role: "当前任务需要的代码、文档、事实",
    source: "@file / @folder / read/search 结果",
    method: "按相关性排序，只保留最小有效集",
    position: "动态证据",
  },
  {
    id: "history",
    label: "Conversation History",
    role: "多轮对话状态、已做决策、临时约束",
    source: "历史消息 / 摘要 / compact / 当前记录",
    method: "滚动保留，按任务压缩和清理",
    position: "易漂移区",
  },
  {
    id: "tools",
    label: "Tool Results",
    role: "真实世界观察：命令输出、测试结果、网页内容",
    source: "MCP / Terminal / Browser / API",
    method: "结构化回填，标明来源与时效",
    position: "实时 grounding",
  },
  {
    id: "user",
    label: "Current User Prompt",
    role: "本轮目标、边界、输出要求",
    source: "用户当前输入",
    method: "放在窗口末尾，明确验收标准",
    position: "结尾高权重",
  },
];

const assemblyTips: AssemblyTip[] = [
  { label: "规则前置", text: "System / Rules 稳定行为边界" },
  { label: "证据精选", text: "@ 引用 + Tools 保留最小有效集" },
  { label: "任务后置", text: "当前目标 / Done 标准放结尾" },
];
</script>

<template>
  <div class="context-window">
    <div class="window-header">
      <div>
        <p class="window-kicker">Runtime-Assembled Input</p>
        <h3 class="window-title">LLM 本轮真正看见的 Context Window</h3>
      </div>
      <div class="window-budget">有限窗口 · 位置敏感 · 动态组装</div>
    </div>

    <div class="window-body">
      <aside class="source-rail">
        <div class="rail-title">用户可控入口</div>
        <div
          v-for="entry in sourceEntries"
          :key="entry.label"
          class="rail-item"
        >
          <strong>{{ entry.label }}</strong>
          <span>{{ entry.hint }}</span>
        </div>
        <div class="rail-arrow">筛选 → 注入</div>
      </aside>

      <main class="layer-stack">
        <div
          v-for="(layer, index) in contextLayers"
          :key="layer.id"
          v-click="index + 1"
          class="context-layer"
          :class="`layer-${layer.id}`"
        >
          <div class="layer-main">
            <div class="layer-index">{{ index + 1 }}</div>
            <div>
              <h4 class="layer-label">{{ layer.label }}</h4>
              <p class="layer-role">{{ layer.role }}</p>
            </div>
          </div>

          <div class="layer-meta">
            <span>{{ layer.source }}</span>
            <strong>{{ layer.method }}</strong>
          </div>

          <div class="layer-position">{{ layer.position }}</div>
        </div>
      </main>

      <aside class="model-rail">
        <div class="model-node">LLM</div>
        <p>只基于本轮窗口推理</p>
        <div v-click="7" class="model-rule">
          <div class="rule-title">组装技巧</div>
          <div
            v-for="tip in assemblyTips"
            :key="tip.label"
            class="rule-item"
          >
            <strong>{{ tip.label }}</strong>
            <span>{{ tip.text }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.context-window {
  width: 100%;
  margin-top: 0.35rem;
  color: #0f172a;
}

.window-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.38rem;
}

.window-kicker {
  margin: 0 0 0.08rem;
  color: #94a3b8;
  font-size: 0.54rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.window-title {
  margin: 0;
  color: #e5e7eb;
  font-size: 0.82rem;
  font-weight: 800;
}

.window-budget {
  padding: 0.2rem 0.45rem;
  border: 1px solid #334155;
  border-radius: 6px;
  background: #0f172a;
  color: #cbd5e1;
  font-size: 0.54rem;
  font-weight: 700;
  white-space: nowrap;
}

.window-body {
  display: grid;
  grid-template-columns: 7.2rem minmax(0, 1fr) 7.8rem;
  gap: 0.52rem;
  align-items: stretch;
}

.source-rail,
.model-rail {
  border: 1px solid #334155;
  border-radius: 8px;
  background: #111827;
  color: #cbd5e1;
  padding: 0.5rem;
}

.source-rail {
  display: grid;
  gap: 0.34rem;
  align-content: center;
}

.rail-title {
  color: #f8fafc;
  font-size: 0.6rem;
  font-weight: 800;
}

.rail-item {
  display: grid;
  gap: 0.06rem;
  border: 1px solid #475569;
  border-radius: 6px;
  padding: 0.28rem 0.34rem;
  background: #1f2937;
  text-align: center;
}

.rail-item strong {
  color: #f8fafc;
  font-size: 0.52rem;
  font-weight: 850;
  line-height: 1.2;
}

.rail-item span {
  color: #94a3b8;
  font-size: 0.42rem;
  font-weight: 650;
  line-height: 1.2;
}

.rail-arrow {
  color: #93c5fd;
  font-size: 0.56rem;
  font-weight: 800;
  text-align: center;
}

.layer-stack {
  display: grid;
  gap: 0.24rem;
  padding: 0.38rem;
  border: 2px solid #64748b;
  border-radius: 10px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
}

.context-layer {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.05fr) 5.2rem;
  gap: 0.42rem;
  align-items: center;
  min-height: 2.45rem;
  padding: 0.34rem 0.5rem;
  border: 1px solid var(--layer-border);
  border-left: 5px solid var(--layer-accent);
  border-radius: 8px;
  background: var(--layer-bg);
}

.layer-system {
  --layer-bg: #eef2ff;
  --layer-border: #c7d2fe;
  --layer-accent: #6366f1;
}

.layer-memory {
  --layer-bg: #eff6ff;
  --layer-border: #bfdbfe;
  --layer-accent: #2563eb;
}

.layer-retrieval {
  --layer-bg: #ecfdf5;
  --layer-border: #bbf7d0;
  --layer-accent: #16a34a;
}

.layer-history {
  --layer-bg: #fffbeb;
  --layer-border: #fde68a;
  --layer-accent: #d97706;
}

.layer-tools {
  --layer-bg: #f0fdfa;
  --layer-border: #99f6e4;
  --layer-accent: #0f766e;
}

.layer-user {
  --layer-bg: #fff1f2;
  --layer-border: #fecdd3;
  --layer-accent: #e11d48;
}

.layer-main {
  display: flex;
  align-items: center;
  gap: 0.42rem;
}

.layer-index {
  width: 1.1rem;
  height: 1.1rem;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 999px;
  background: var(--layer-accent);
  color: #ffffff;
  font-size: 0.56rem;
  font-weight: 900;
}

.layer-label {
  margin: 0 0 0.04rem;
  color: #0f172a;
  font-size: 0.66rem;
  font-weight: 850;
}

.layer-role {
  margin: 0;
  color: #475569;
  font-size: 0.5rem;
  font-weight: 650;
  line-height: 1.25;
}

.layer-meta {
  display: grid;
  gap: 0.06rem;
  color: #475569;
  font-size: 0.49rem;
  line-height: 1.22;
}

.layer-meta strong {
  color: #111827;
  font-weight: 800;
}

.layer-position {
  justify-self: end;
  padding: 0.18rem 0.34rem;
  border-radius: 999px;
  background: #ffffffcc;
  color: #334155;
  font-size: 0.48rem;
  font-weight: 800;
  white-space: nowrap;
}

.model-rail {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 0.4rem;
  text-align: center;
}

.model-node {
  width: 3.7rem;
  height: 3.7rem;
  display: grid;
  place-items: center;
  border: 2px solid #93c5fd;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 0.86rem;
  font-weight: 900;
}

.model-rail p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.54rem;
  font-weight: 700;
  line-height: 1.45;
}

.model-rule {
  width: 100%;
  display: grid;
  gap: 0.24rem;
  padding: 0.38rem;
  border: 1px solid #fbbf24;
  border-radius: 7px;
  background: #fffbeb;
  color: #92400e;
}

.rule-title {
  color: #78350f;
  font-size: 0.6rem;
  font-weight: 900;
}

.rule-item {
  display: grid;
  gap: 0.05rem;
  padding-top: 0.18rem;
  border-top: 1px solid #fde68a;
  text-align: left;
}

.rule-item strong {
  color: #92400e;
  font-size: 0.5rem;
  font-weight: 900;
  line-height: 1.15;
}

.rule-item span {
  color: #78350f;
  font-size: 0.43rem;
  font-weight: 700;
  line-height: 1.22;
}
</style>
