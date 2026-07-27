<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 无 slidev 上下文降级
}

const clicks = computed(() => slidevNav?.clicks?.value ?? 5)

const layers = [
  {
    id: 1,
    name: '① 任务定义',
    detail: 'I/O · 验收 · 权限边界（人先写清）',
    cls: 'from-slate-50 to-slate-100 border-slate-300',
  },
  {
    id: 2,
    name: '② 能力面',
    detail: '记忆 · 手脚 · 工序 · 护栏 · 并行 · 分发',
    cls: 'from-blue-50 to-blue-100 border-blue-300',
  },
  {
    id: 3,
    name: '③ 协作形态',
    detail: 'Loop · 链式 · 评审 · 多 Agent（按需升级）',
    cls: 'from-purple-50 to-purple-100 border-purple-300',
  },
  {
    id: 4,
    name: '④ 工作流资产',
    detail: 'Skill / 记忆文件 / 口令 / nn-ai kit',
    cls: 'from-orange-50 to-orange-100 border-orange-300',
  },
  {
    id: 5,
    name: '⑤ 迭代与指标',
    detail: '失败写回 · 复用率 · 人工介入次数',
    cls: 'from-emerald-50 to-emerald-100 border-emerald-300',
  },
]

const active = computed(() => Math.min(Math.max(clicks.value, 0), layers.length))
</script>

<template>
  <div class="space-y-2 mt-2">
    <div
      v-for="layer in layers"
      :key="layer.id"
      class="rounded-xl border px-3 py-2 bg-gradient-to-r transition-all duration-300"
      :class="[
        layer.cls,
        active >= layer.id ? 'opacity-100 scale-[1.01]' : 'opacity-40',
      ]"
    >
      <div class="font-semibold text-slate-800 text-sm">{{ layer.name }}</div>
      <div class="text-xs text-slate-600 mt-0.5">{{ layer.detail }}</div>
    </div>
  </div>
</template>
