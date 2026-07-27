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

const nodes = [
  { id: 1, date: '2026-02', title: 'cf2md', desc: '打通 Confluence，起点' },
  { id: 2, date: '2026-03', title: '禅道 MCP', desc: '接入 zentao' },
  { id: 3, date: '2026-05', title: 'GitLab + Insight', desc: '/cr 上线；接入 ES/Kibana' },
  { id: 4, date: '2026-06', title: 'monitor', desc: '看飞轮转没转' },
  { id: 5, date: '2026-07', title: 'wecom + /wiki', desc: '企微文档接入' },
  { id: 6, date: '07-27 今天', title: '/bugfix', desc: 'nn-client-all 自建，状态机上线', today: true },
  { id: 7, date: '规划中', title: 'autonomous-loop', desc: 'issue webhook 自动触发，还没做', future: true },
]

const active = computed(() => Math.min(Math.max(clicks.value, 0), nodes.length))
</script>

<template>
  <div class="flex gap-2 mt-4">
    <div
      v-for="node in nodes"
      :key="node.id"
      class="flex-1 rounded-lg border p-2 text-center transition-all duration-300"
      :class="[
        node.future ? 'border-dashed border-slate-300 bg-white' : 'border-solid',
        node.today && !node.future ? 'border-orange-400 bg-orange-50 shadow-sm scale-[1.03]' : '',
        !node.today && !node.future ? 'border-emerald-200 bg-emerald-50' : '',
        active >= node.id ? 'opacity-100' : 'opacity-30',
      ]"
    >
      <div class="text-xs font-mono" :class="node.today ? 'text-orange-600' : 'text-slate-400'">
        {{ node.date }}
      </div>
      <div class="font-semibold text-sm mt-0.5" :class="node.today ? 'text-orange-700' : 'text-slate-800'">
        {{ node.title }}
      </div>
      <div class="text-xs text-slate-500 mt-1 leading-snug">
        {{ node.desc }}
      </div>
    </div>
  </div>
</template>
