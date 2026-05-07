<script setup lang="ts">
// Prompt Engineering
const promptFocus = "问的对";

// Context Engineering - 本轮输入窗口
const contextItems = [
  "System / Rules",
  "Memory / RAG",
  "Tool Results",
  "Current Prompt",
];

const contextFocus = "给的准";

// Harness Engineering - 运行时闭环
const harnessItems = [
  { label: "Memory", desc: "跨轮状态保持" },
  { label: "Tools", desc: "执行外部操作" },
  { label: "Loop", desc: "多轮一致性保障" },
];

const harnessFocus = "管的住";
</script>

<template>
  <div class="engineering-diagram">
    <section class="harness-layer">
      <div class="layer-header">
        <div>
          <p class="layer-kicker">Harness Engineering</p>
          <h3>{{ harnessFocus }}</h3>
        </div>
        <p class="layer-problem">保障：多轮一致 · 状态连续 · 结果可验证</p>
      </div>

      <div class="harness-body">
        <div class="harness-tools">
          <div v-for="item in harnessItems" :key="item.label" class="tool-chip">
            <strong>{{ item.label }}</strong>
            <span>{{ item.desc }}</span>
          </div>
        </div>

        <div class="context-layer">
          <div class="context-header">
            <div>
              <p class="layer-kicker">Context Engineering</p>
              <h3>{{ contextFocus }}</h3>
            </div>
            <p class="layer-problem">决定：哪些信息进入本轮</p>
          </div>

          <div class="context-grid">
            <div v-for="item in contextItems" :key="item" class="context-item">
              {{ item }}
            </div>
          </div>

          <div class="prompt-layer">
            <div>
              <p class="layer-kicker">Prompt Engineering</p>
              <h3>{{ promptFocus }}</h3>
            </div>
            <p class="prompt-problem">定义做什么 · 约束输出格式</p>
          </div>
        </div>

        <div class="runtime-flow">
          <div class="arrow-label">装配 Context</div>
          <div class="flow-arrow">→</div>
          <div class="llm-node">
            <strong>LLM</strong>
            <span>本轮推理</span>
          </div>
          <div class="flow-arrow return">↺</div>
          <div class="arrow-label">更新 Harness</div>
        </div>
      </div>
    </section>

    <p class="diagram-summary">
      问的对 → 给的准 → 管的住：三层协同，确保 LLM 输出稳定可靠。
    </p>
  </div>
</template>

<style scoped>
.engineering-diagram {
  width: 100%;
  margin-top: 1rem;
  color: #0f172a;
}

.harness-layer {
  border: 2px solid #fbbf24;
  background: #fffbeb;
  border-radius: 8px;
  padding: 1rem;
}

.layer-header,
.context-header,
.prompt-layer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.layer-kicker {
  margin: 0 0 0.1rem;
  color: #64748b;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.layer-header h3,
.context-header h3,
.prompt-layer h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
}

.layer-problem,
.prompt-problem {
  margin: 0;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 650;
}

.harness-body {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr) 8.2rem;
  gap: 0.8rem;
  align-items: stretch;
  margin-top: 0.8rem;
}

.harness-tools {
  display: grid;
  gap: 0.5rem;
}

.tool-chip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 3.2rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #fcd34d;
  background: #fff7ed;
  border-radius: 6px;
}

.tool-chip strong {
  font-size: 0.86rem;
}

.tool-chip span {
  margin-top: 0.1rem;
  color: #64748b;
  font-size: 0.68rem;
}

.context-layer {
  border: 2px solid #86efac;
  background: #f0fdf4;
  border-radius: 8px;
  padding: 0.85rem;
}

.context-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
  margin-top: 0.65rem;
}

.context-item {
  min-height: 2.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bbf7d0;
  background: #ffffff;
  border-radius: 6px;
  color: #166534;
  font-size: 0.68rem;
  font-weight: 750;
  text-align: center;
}

.prompt-layer {
  margin-top: 0.75rem;
  border: 2px solid #93c5fd;
  background: #eff6ff;
  border-radius: 8px;
  padding: 0.75rem 0.85rem;
}

.runtime-flow {
  display: grid;
  grid-template-rows: auto auto auto auto auto;
  align-content: center;
  justify-items: center;
  gap: 0.25rem;
  color: #475569;
}

.arrow-label {
  font-size: 0.66rem;
  font-weight: 700;
  text-align: center;
}

.flow-arrow {
  color: #2563eb;
  font-size: 1.55rem;
  line-height: 1;
}

.flow-arrow.return {
  color: #d97706;
}

.llm-node {
  width: 100%;
  min-height: 3.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #cbd5e1;
  background: #ffffff;
  border-radius: 8px;
}

.llm-node strong {
  font-size: 1.05rem;
}

.llm-node span {
  margin-top: 0.15rem;
  color: #64748b;
  font-size: 0.68rem;
}

.diagram-summary {
  margin: 0.7rem 0 0;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 650;
  text-align: center;
}
</style>
