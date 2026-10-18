<!--
  Preset: progressive
  特征：层级渐进展开，无 SVG 连线
  适用：Progressive Disclosure / 架构层揭示 / 概念递进
  节点数：3-5 Tier
  必填数据：tiers[]（替代 nodes[]）
  灵感来源：SkillProgressiveDisclosure.vue / SkillMcpRelationDiagram.vue
  使用方式：完整拷贝此文件 → 替换占位 → 重命名组件
-->

<script setup>
import { ref, computed, watch } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try { slidevNav = useNav() } catch (e) { /* 降级 */ }

const activeStep = ref(0)

watch(
  () => slidevNav?.clicks?.value,
  (newVal) => {
    if (newVal !== undefined) {
      activeStep.value = Math.min(Math.max(newVal, 0), tiers.length)
    }
  },
  { immediate: true },
)

// ============================================================
// REPLACE: 各 Tier 定义
// 每个 tier 含：id / title / badge / when / what / detail / color
// ============================================================
const tiers = [
  {
    id: 1,
    title: 'Tier 1 — XXX',
    badge: '~XXX 单位',
    when: '什么时候加载',
    what: '加载什么内容',
    detail: '更详细的说明（一句话）',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Tier 2 — YYY',
    badge: '~YYY 单位',
    when: '...',
    what: '...',
    detail: '...',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Tier 3 — ZZZ',
    badge: '按需',
    when: '...',
    what: '...',
    detail: '...',
    color: 'amber',
  },
]

// ============================================================
// REPLACE: 最终一步显示的总结句（可选）
// ============================================================
const summary = {
  show: true,
  text: '核心收益：分层呼出而非一次塞满',
  accent: '逐步揭示更可控',
}

const colorMap = {
  blue:   { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
  purple: { bg: '#faf5ff', border: '#a855f7', text: '#7e22ce' },
  amber:  { bg: '#fffbeb', border: '#f59e0b', text: '#b45309' },
  green:  { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
}

const tierStates = computed(() =>
  tiers.map((tier, idx) => ({
    ...tier,
    active: activeStep.value > idx,
    highlight: activeStep.value === idx + 1,
  })),
)

const showSummary = computed(() => summary.show && activeStep.value > tiers.length)
</script>

<template>
  <div class="progressive-container">
    <div
      v-for="tier in tierStates"
      :key="tier.id"
      class="tier"
      :class="{ 'is-active': tier.active, 'is-highlight': tier.highlight }"
      :style="{
        '--tier-bg': colorMap[tier.color].bg,
        '--tier-border': colorMap[tier.color].border,
        '--tier-text': colorMap[tier.color].text,
      }"
    >
      <div class="tier-header">
        <div class="tier-title">
          <span class="tier-num">{{ tier.id }}</span>
          <span>{{ tier.title }}</span>
        </div>
        <span class="tier-badge">{{ tier.badge }}</span>
      </div>
      <div class="tier-body">
        <div class="row"><span class="label">何时</span><span>{{ tier.when }}</span></div>
        <div class="row"><span class="label">加载</span><span>{{ tier.what }}</span></div>
        <div class="row row-detail">{{ tier.detail }}</div>
      </div>
    </div>

    <div v-if="showSummary" class="summary">
      <strong>{{ summary.text }}</strong>
      <span class="accent">{{ summary.accent }}</span>
    </div>
  </div>
</template>

<style scoped>
.progressive-container {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
}

.tier {
  background: var(--tier-bg);
  border-left: 4px solid var(--tier-border);
  border-radius: 8px;
  padding: 0.9rem 1.2rem;
  opacity: 0.35;
  transform: translateX(-8px);
  transition: all 0.4s ease;
}
.tier.is-active { opacity: 1; transform: translateX(0); }
.tier.is-highlight {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
  transform: translateX(0) scale(1.01);
}

.tier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.tier-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--tier-text);
}
.tier-num {
  display: inline-flex;
  width: 1.6rem; height: 1.6rem;
  border-radius: 999px;
  background: var(--tier-border);
  color: white;
  align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 700;
}
.tier-badge {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  background: white;
  border: 1px solid var(--tier-border);
  color: var(--tier-text);
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
}
.tier-body {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.55;
}
.row { display: flex; gap: 0.6rem; margin-bottom: 0.2rem; }
.row-detail {
  margin-top: 0.3rem;
  color: #475569;
  font-size: 0.78rem;
  font-style: italic;
}
.label {
  display: inline-block;
  min-width: 2.6rem;
  color: var(--tier-text);
  font-weight: 600;
}

.summary {
  margin-top: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  font-size: 0.85rem;
  color: #1e293b;
}
.accent {
  color: #7e22ce;
  font-weight: 600;
  display: inline-block;
  margin-left: 0.4rem;
}
</style>
