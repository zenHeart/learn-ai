<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 无 slidev 上下文降级
}

const clicks = computed(() => slidevNav?.clicks?.value ?? 4)

const steps = [
  { id: 1, title: '识别', desc: '高频 · 可验收 · 值得沉淀' },
  { id: 2, title: '补齐', desc: '缺手脚 / 工序 / 验收' },
  { id: 3, title: 'MVP', desc: '最短路径 + 一条口令' },
  { id: 4, title: '迭代复用', desc: '失败写回 · 下次直接用 · 指标' },
]

const active = computed(() => Math.min(Math.max(clicks.value, 0), steps.length))
</script>

<template>
  <div class="grid grid-cols-4 gap-3 mt-4 text-sm">
    <div
      v-for="step in steps"
      :key="step.id"
      class="rounded-lg border p-3 transition-all duration-300"
      :class="active >= step.id
        ? 'border-orange-400 bg-orange-50 shadow-sm'
        : 'border-slate-200 bg-white opacity-50'"
    >
      <div class="text-xs text-orange-600 font-semibold mb-1">0{{ step.id }}</div>
      <div class="font-semibold text-slate-800">{{ step.title }}</div>
      <div class="text-xs text-slate-500 mt-1 leading-snug">{{ step.desc }}</div>
    </div>
  </div>
</template>
