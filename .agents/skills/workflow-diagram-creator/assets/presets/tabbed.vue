<!--
  Preset: tabbed
  特征：顶部 Tab 切换，每 Tab 内一个迷你流程
  适用：多概念并列对照（如 MCP 三大原语）/ 多角色视角
  Tab 数：2-4
  必填数据：tabs[]（含 controller / methods / examples / flow）
  灵感来源：MCPPrimitivesMatrix.vue
  使用方式：完整拷贝此文件 → 替换占位 → 重命名组件
-->

<script setup>
import { ref, computed, watch } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try { slidevNav = useNav() } catch (e) { /* 降级 */ }

const active = ref('tab-a')

// ============================================================
// REPLACE: Tab 定义
// ============================================================
const tabs = [
  {
    id: 'tab-a',
    name: 'Tab A',
    controller: '控制者 A',
    sub: '副标题 A',
    color: '#3b82f6',
    accent: '#dbeafe',
    methods: ['method/list', 'method/call'],
    examples: ['场景 1', '场景 2', '场景 3'],
    note: '关键点说明，1-2 句话。',
    flow: [
      { from: 'X', to: 'Y', label: '步骤 1' },
      { from: 'Y', to: 'Z', label: '步骤 2' },
      { from: 'Z', to: 'X', label: '步骤 3' },
    ],
  },
  {
    id: 'tab-b',
    name: 'Tab B',
    controller: '控制者 B',
    sub: '副标题 B',
    color: '#a855f7',
    accent: '#f3e8ff',
    methods: ['method2/list', 'method2/get'],
    examples: ['场景 A', '场景 B'],
    note: '关键点说明。',
    flow: [
      { from: 'X', to: 'Y', label: '步骤 1' },
      { from: 'Y', to: 'Z', label: '步骤 2' },
    ],
  },
  {
    id: 'tab-c',
    name: 'Tab C',
    controller: '控制者 C',
    sub: '副标题 C',
    color: '#10b981',
    accent: '#d1fae5',
    methods: ['method3/list'],
    examples: ['示例 1'],
    note: '关键点说明。',
    flow: [
      { from: 'X', to: 'Y', label: '步骤 1' },
    ],
  },
]

watch(
  () => slidevNav?.clicks?.value,
  (newVal) => {
    if (newVal === undefined) return
    const idx = Math.min(Math.max(newVal, 0), tabs.length - 1)
    active.value = tabs[idx].id
  },
  { immediate: true },
)

const current = computed(() => tabs.find((t) => t.id === active.value) || tabs[0])
</script>

<template>
  <div class="tabbed-container">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ 'is-active': active === tab.id }"
        :style="active === tab.id ? { '--tab-color': tab.color, '--tab-bg': tab.accent } : {}"
        @click="active = tab.id"
      >
        <span class="tab-name">{{ tab.name }}</span>
        <span class="tab-ctrl">{{ tab.controller }}</span>
      </button>
    </div>

    <div class="panel" :style="{ '--panel-color': current.color, '--panel-bg': current.accent }">
      <div class="panel-head">
        <div>
          <div class="panel-title">{{ current.name }}</div>
          <div class="panel-sub">{{ current.sub }}</div>
        </div>
        <div class="panel-methods">
          <code v-for="m in current.methods" :key="m" class="method">{{ m }}</code>
        </div>
      </div>

      <div class="panel-body">
        <div class="section">
          <div class="section-title">典型场景</div>
          <div class="tags">
            <span v-for="ex in current.examples" :key="ex" class="tag">{{ ex }}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">流程</div>
          <div class="flow">
            <div v-for="(step, i) in current.flow" :key="i" class="step">
              <span class="step-from">{{ step.from }}</span>
              <span class="step-arrow">→</span>
              <span class="step-to">{{ step.to }}</span>
              <code class="step-label">{{ step.label }}</code>
            </div>
          </div>
        </div>

        <div class="note">{{ current.note }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabbed-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}
.tab {
  --tab-color: #94a3b8;
  --tab-bg: #f1f5f9;
  border: 1.5px solid transparent;
  background: white;
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tab:hover { background: #f8fafc; }
.tab.is-active {
  background: var(--tab-bg);
  border-color: var(--tab-color);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}
.tab-name { font-weight: 700; font-size: 0.95rem; color: var(--tab-color); }
.tab.is-active .tab-name { color: var(--tab-color); }
.tab-ctrl {
  font-size: 0.7rem;
  color: #64748b;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}

.panel {
  --panel-color: #3b82f6;
  --panel-bg: #dbeafe;
  background: white;
  border: 1px solid #e2e8f0;
  border-left: 4px solid var(--panel-color);
  border-radius: 8px;
  padding: 0.85rem 1rem;
}
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.7rem;
  padding-bottom: 0.55rem;
  border-bottom: 1px dashed #e2e8f0;
}
.panel-title { font-weight: 700; font-size: 1.15rem; color: var(--panel-color); }
.panel-sub { font-size: 0.78rem; color: #64748b; margin-top: 0.1rem; }
.panel-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: flex-end;
}
.method {
  font-size: 0.7rem;
  background: var(--panel-bg);
  color: var(--panel-color);
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
.panel-body { display: flex; flex-direction: column; gap: 0.55rem; }
.section-title {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.3rem;
  letter-spacing: 0.04em;
}
.tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.tag {
  font-size: 0.78rem;
  background: var(--panel-bg);
  color: #1e293b;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}
.flow { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.78rem; }
.step {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 0.4rem;
  align-items: center;
  padding: 0.25rem 0;
}
.step-from, .step-to { font-weight: 600; color: #334155; font-size: 0.74rem; }
.step-arrow { color: var(--panel-color); font-weight: 700; }
.step-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  color: #475569;
  background: #f8fafc;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}
.note {
  margin-top: 0.4rem;
  padding: 0.55rem 0.7rem;
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
  font-size: 0.78rem;
  color: #78350f;
  line-height: 1.55;
}
</style>
