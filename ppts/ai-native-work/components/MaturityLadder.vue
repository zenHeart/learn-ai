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
  { id: 1, name: '人工驱动', note: '全靠人工' },
  { id: 2, name: '线上化', note: '搬上系统' },
  { id: 3, name: '流程化', note: '步骤定了' },
  { id: 4, name: '标准化', note: '规则统一' },
  { id: 5, name: '自动化', note: '不用人盯着做', current: true },
  { id: 6, name: '智能化', note: '洞察和辅助' },
  { id: 7, name: '自治化', note: '判断和决策', future: true },
]

const layers = [
  { name: '数字化', desc: '把活干对、干快', stages: stages.slice(0, 5) },
  { name: '智能化', desc: '把判断也接过来', stages: stages.slice(5) },
]

const active = computed(() => Math.min(Math.max(clicks.value, 0), stages.length))
</script>

<template>
  <div class="flex gap-3 mt-4 text-sm">
    <div
      v-for="layer in layers"
      :key="layer.name"
      class="rounded-xl border border-dashed border-slate-300 p-2 pt-1.5"
      :style="{ flex: layer.stages.length }"
    >
      <div class="text-xs text-slate-400 mb-1.5 text-center">
        <span class="font-semibold text-slate-500">{{ layer.name }}</span>
        <span class="ml-1">· {{ layer.desc }}</span>
      </div>
      <div class="flex gap-2">
        <div
          v-for="stage in layer.stages"
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
    </div>
  </div>
</template>
