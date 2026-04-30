<script setup>
import { ref, computed, watch } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 无 slidev 上下文降级
}

const tabs = [
  {
    id: 'tools',
    name: 'Tools',
    controller: 'Model-controlled',
    sub: 'AI 自主决定何时调用',
    color: '#3b82f6',
    accent: '#dbeafe',
    methods: ['tools/list', 'tools/call'],
    examples: ['查 Jira 工单', '写文件', '调内部 API', '跑 SQL'],
    note: 'AI 看上下文 + Tool description 自动决定。description 必须含「做什么 + 何时用 + 返回什么」。',
    flow: [
      { from: 'Client', to: 'Server', label: 'tools/list' },
      { from: 'Server', to: 'Client', label: '[ {name, description, inputSchema} ]' },
      { from: 'LLM', to: 'Client', label: '决定调用 weather_current("SF")' },
      { from: 'Client', to: 'Server', label: 'tools/call { name, arguments }' },
      { from: 'Server', to: 'Client', label: '{ content, isError }' },
    ],
  },
  {
    id: 'resources',
    name: 'Resources',
    controller: 'Application-driven',
    sub: '应用决定何时纳入 Context',
    color: '#a855f7',
    accent: '#f3e8ff',
    methods: ['resources/list', 'resources/read', 'resources/templates/list', 'resources/subscribe'],
    examples: ['文件内容', 'DB schema', 'API 响应快照', 'Wiki 文档'],
    note: 'URI 是身份证：file:// / git:// / https:// / postgres:// / 自定义。可订阅变更通知。',
    flow: [
      { from: 'Client', to: 'Server', label: 'resources/list' },
      { from: 'Server', to: 'Client', label: '[ {uri, name, mimeType, annotations} ]' },
      { from: 'Host', to: 'Client', label: '决定纳入 file:///main.rs' },
      { from: 'Client', to: 'Server', label: 'resources/read { uri }' },
      { from: 'Server', to: 'Client', label: '{ contents: [{ uri, text }] }' },
    ],
  },
  {
    id: 'prompts',
    name: 'Prompts',
    controller: 'User-controlled',
    sub: '用户主动选择（slash command）',
    color: '#10b981',
    accent: '#d1fae5',
    methods: ['prompts/list', 'prompts/get'],
    examples: ['/code_review', '/jira_summarize', '/explain_diff'],
    note: 'Prompt 是模板化的对话起手式。用户在 UI 上点选或敲 slash command 触发，不是 AI 自主激活。',
    flow: [
      { from: 'Client', to: 'Server', label: 'prompts/list' },
      { from: 'Server', to: 'Client', label: '[ {name, description, arguments} ]' },
      { from: 'User', to: 'Client', label: '点选 /code_review { code }' },
      { from: 'Client', to: 'Server', label: 'prompts/get { name, arguments }' },
      { from: 'Server', to: 'Client', label: '{ messages: [...] }' },
    ],
  },
]

const active = ref('tools')

watch(
  () => slidevNav?.clicks?.value,
  (newVal) => {
    if (newVal === undefined) return
    if (newVal >= 2) active.value = 'prompts'
    else if (newVal >= 1) active.value = 'resources'
    else active.value = 'tools'
  },
  { immediate: true },
)

const current = computed(() => tabs.find((t) => t.id === active.value) || tabs[0])
</script>

<template>
  <div class="pm-container">
    <div class="pm-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="pm-tab"
        :class="{ 'is-active': active === tab.id }"
        :style="active === tab.id ? { '--tab-color': tab.color, '--tab-bg': tab.accent } : {}"
        @click="active = tab.id"
      >
        <span class="pm-tab-name">{{ tab.name }}</span>
        <span class="pm-tab-ctrl">{{ tab.controller }}</span>
      </button>
    </div>

    <div class="pm-panel" :style="{ '--panel-color': current.color, '--panel-bg': current.accent }">
      <div class="pm-panel-head">
        <div>
          <div class="pm-panel-title">{{ current.name }}</div>
          <div class="pm-panel-sub">{{ current.sub }}</div>
        </div>
        <div class="pm-panel-methods">
          <code v-for="m in current.methods" :key="m" class="pm-method">{{ m }}</code>
        </div>
      </div>

      <div class="pm-panel-body">
        <div class="pm-section">
          <div class="pm-section-title">典型场景</div>
          <div class="pm-tags">
            <span v-for="ex in current.examples" :key="ex" class="pm-tag">{{ ex }}</span>
          </div>
        </div>

        <div class="pm-section">
          <div class="pm-section-title">JSON-RPC 流程</div>
          <div class="pm-flow">
            <div v-for="(step, i) in current.flow" :key="i" class="pm-step">
              <span class="pm-step-from">{{ step.from }}</span>
              <span class="pm-step-arrow">→</span>
              <span class="pm-step-to">{{ step.to }}</span>
              <code class="pm-step-label">{{ step.label }}</code>
            </div>
          </div>
        </div>

        <div class="pm-note">{{ current.note }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pm-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.pm-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
}

.pm-tab {
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

.pm-tab:hover { background: #f8fafc; }

.pm-tab.is-active {
  background: var(--tab-bg);
  border-color: var(--tab-color);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.pm-tab-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--tab-color);
}

.pm-tab.is-active .pm-tab-name { color: var(--tab-color); }

.pm-tab-ctrl {
  font-size: 0.7rem;
  color: #64748b;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}

.pm-panel {
  --panel-color: #3b82f6;
  --panel-bg: #dbeafe;
  background: white;
  border: 1px solid #e2e8f0;
  border-left: 4px solid var(--panel-color);
  border-radius: 8px;
  padding: 0.85rem 1rem;
}

.pm-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.7rem;
  padding-bottom: 0.55rem;
  border-bottom: 1px dashed #e2e8f0;
}

.pm-panel-title {
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--panel-color);
}

.pm-panel-sub {
  font-size: 0.78rem;
  color: #64748b;
  margin-top: 0.1rem;
}

.pm-panel-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: flex-end;
}

.pm-method {
  font-size: 0.7rem;
  background: var(--panel-bg);
  color: var(--panel-color);
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}

.pm-panel-body {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.pm-section-title {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.3rem;
  letter-spacing: 0.04em;
}

.pm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.pm-tag {
  font-size: 0.78rem;
  background: var(--panel-bg);
  color: #1e293b;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.pm-flow {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.78rem;
}

.pm-step {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 0.4rem;
  align-items: center;
  padding: 0.25rem 0;
}

.pm-step-from, .pm-step-to {
  font-weight: 600;
  color: #334155;
  font-size: 0.74rem;
}

.pm-step-arrow {
  color: var(--panel-color);
  font-weight: 700;
}

.pm-step-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  color: #475569;
  background: #f8fafc;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

.pm-note {
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
