<script setup>
import { ref, computed, watch } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 无 slidev 上下文时降级
}

const activeStep = ref(0)

watch(
  () => slidevNav?.clicks?.value,
  (newVal) => {
    if (newVal !== undefined) {
      activeStep.value = Math.min(Math.max(newVal, 0), 3)
    }
  },
  { immediate: true },
)

const tiers = [
  {
    id: 1,
    title: 'Tier 1 — Metadata',
    badge: '~100 tokens',
    when: '所有 Skill 启动时全量加载',
    what: '只读 frontmatter：name + description',
    detail: 'Agent 用 description 做语义匹配，决定是否进入 Tier 2',
    color: 'blue',
    active: computed(() => activeStep.value >= 0),
    highlight: computed(() => activeStep.value === 0),
  },
  {
    id: 2,
    title: 'Tier 2 — Instructions',
    badge: '< 5000 tokens',
    when: 'Skill 被激活后才加载',
    what: 'SKILL.md 正文（Markdown）',
    detail: '建议含 Step-by-step / Examples / Common edge cases，控制在 500 行以内',
    color: 'purple',
    active: computed(() => activeStep.value >= 1),
    highlight: computed(() => activeStep.value === 1),
  },
  {
    id: 3,
    title: 'Tier 3 — Resources',
    badge: '按需',
    when: '正文中显式引用时',
    what: 'scripts/ + references/ + assets/',
    detail: 'Agent 根据 Tier 2 的指引，在需要时主动 Read 详细文档/脚本/模板',
    color: 'amber',
    active: computed(() => activeStep.value >= 2),
    highlight: computed(() => activeStep.value === 2),
  },
]

const colorMap = {
  blue: { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
  purple: { bg: '#faf5ff', border: '#a855f7', text: '#7e22ce' },
  amber: { bg: '#fffbeb', border: '#f59e0b', text: '#b45309' },
}
</script>

<template>
  <div class="pd-container">
    <div
      v-for="tier in tiers"
      :key="tier.id"
      class="pd-tier"
      :class="{ 'is-active': tier.active.value, 'is-highlight': tier.highlight.value }"
      :style="{
        '--tier-bg': colorMap[tier.color].bg,
        '--tier-border': colorMap[tier.color].border,
        '--tier-text': colorMap[tier.color].text,
      }"
    >
      <div class="pd-tier-header">
        <div class="pd-tier-title">
          <span class="pd-tier-num">{{ tier.id }}</span>
          <span>{{ tier.title }}</span>
        </div>
        <span class="pd-tier-badge">{{ tier.badge }}</span>
      </div>
      <div class="pd-tier-body">
        <div class="pd-row"><span class="pd-label">何时</span><span>{{ tier.when }}</span></div>
        <div class="pd-row"><span class="pd-label">加载</span><span>{{ tier.what }}</span></div>
        <div class="pd-row pd-row-detail">{{ tier.detail }}</div>
      </div>
    </div>

    <div class="pd-summary" v-if="activeStep >= 3">
      <strong>核心收益</strong>：100 tokens 决定是否激活 → 5000 tokens 给完整指令 → 详细资料按需呼出。
      <span class="pd-accent">Skill 不是把知识塞满 Context，是分层呼出。</span>
    </div>
  </div>
</template>

<style scoped>
.pd-container {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
}

.pd-tier {
  background: var(--tier-bg);
  border-left: 4px solid var(--tier-border);
  border-radius: 8px;
  padding: 0.9rem 1.2rem;
  opacity: 0.35;
  transform: translateX(-8px);
  transition: all 0.4s ease;
}

.pd-tier.is-active {
  opacity: 1;
  transform: translateX(0);
}

.pd-tier.is-highlight {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
  transform: translateX(0) scale(1.01);
}

.pd-tier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.pd-tier-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--tier-text);
}

.pd-tier-num {
  display: inline-flex;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  background: var(--tier-border);
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
}

.pd-tier-badge {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  background: white;
  border: 1px solid var(--tier-border);
  color: var(--tier-text);
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
}

.pd-tier-body {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.55;
}

.pd-row {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
}

.pd-row-detail {
  margin-top: 0.3rem;
  color: #475569;
  font-size: 0.78rem;
  font-style: italic;
}

.pd-label {
  display: inline-block;
  min-width: 2.6rem;
  color: var(--tier-text);
  font-weight: 600;
}

.pd-summary {
  margin-top: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  font-size: 0.85rem;
  color: #1e293b;
}

.pd-accent {
  color: #7e22ce;
  font-weight: 600;
  display: inline-block;
  margin-left: 0.4rem;
}
</style>
