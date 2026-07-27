<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 无 slidev 上下文降级
}

const clicks = computed(() => slidevNav?.clicks?.value ?? 7)

const stages = [
  { id: 1, name: '人工驱动', current: false },
  { id: 2, name: '线上化', current: false },
  { id: 3, name: '流程化', current: false },
  { id: 4, name: '标准化', current: false },
  { id: 5, name: '自动化', current: true, note: '报销 / 大部分 nn-ai 场景在这里' },
  { id: 6, name: '智能化', current: false, note: 'insight / monitor 开始摸到边' },
  { id: 7, name: '自治化', current: false, future: true, note: '今天不吹，还早' },
]

const active = computed(() => Math.min(Math.max(clicks.value, 0), stages.length))
</script>

<template>
  <div class="flex gap-2 mt-4 text-sm">
    <div
      v-for="stage in stages"
      :key="stage.id"
      class="flex-1 rounded-lg border p-2 text-center transition-all duration-300"
      :class="[
        stage.future ? 'border-dashed' : 'border-solid',
        stage.current
          ? 'border-orange-400 bg-orange-50 shadow-sm scale-[1.03]'
          : (stage.future ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50'),
        active >= stage.id ? 'opacity-100' : 'opacity-30',
      ]"
    >
      <div class="text-xs text-slate-400 mb-0.5">0{{ stage.id }}</div>
      <div class="font-semibold" :class="stage.current ? 'text-orange-700' : 'text-slate-700'">
        {{ stage.name }}
      </div>
      <div v-if="stage.note" class="text-xs text-slate-500 mt-1 leading-snug">
        {{ stage.note }}
      </div>
    </div>
  </div>
</template>
