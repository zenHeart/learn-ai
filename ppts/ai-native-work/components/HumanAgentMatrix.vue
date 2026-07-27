<script setup>
const rows = [
  {
    label: '擅长',
    human: '定目标和规则 · 拿不准时拍板 · 担责任 · 走线下',
    agent: '批量处理信息 · 按规则重复做 · 连内部系统 · 按标准自检',
  },
  {
    label: '扩展',
    human: '把经验写清楚（规则、验收） · 用工具/清单带人 · 复盘失败改标准',
    agent: '更强模型/读图能力 · 加手脚（MCP） · 加工序（Skill）',
  },
]

const collab = [
  {
    label: '聊天',
    cc: '默认交互，来回问答',
    codex: '默认交互，来回问答',
  },
  {
    label: '目标管理',
    cc: '<code>/goal</code> 定条件 · <code>/loop 5m</code> 定周期',
    codex: '<code>exec --full-auto</code> 跑到底 · App 内配计划任务',
  },
  {
    label: '工作流',
    cc: '<code>/workflows</code> 脚本编排，分支并行',
    codex: '<code>/agent</code> 并行子代理，主线程汇总',
  },
]
</script>

<template>
  <div class="mt-3 text-sm">
    <div class="grid grid-cols-[3.5rem_1fr_1fr] gap-2 mb-1.5">
      <div />
      <div class="text-center text-xs font-semibold text-slate-500">人</div>
      <div class="text-center text-xs font-semibold text-slate-500">Agent</div>
    </div>

    <div
      v-for="row in rows"
      :key="row.label"
      class="grid grid-cols-[3.5rem_1fr_1fr] gap-2 mb-1.5"
    >
      <div class="flex items-center justify-center text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg">
        {{ row.label }}
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs leading-snug flex items-center">
        {{ row.human }}
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs leading-snug flex items-center">
        {{ row.agent }}
      </div>
    </div>

    <div class="text-xs text-center font-semibold text-slate-500 mt-3 mb-1.5">协作 · 配合方式</div>
    <div class="grid grid-cols-[3.5rem_1fr_1fr] gap-2 mb-1.5">
      <div />
      <div class="text-center text-xs font-semibold text-slate-500">Claude Code</div>
      <div class="text-center text-xs font-semibold text-slate-500">Codex</div>
    </div>

    <div
      v-for="c in collab"
      :key="c.label"
      class="grid grid-cols-[3.5rem_1fr_1fr] gap-2 mb-1.5"
    >
      <div class="flex items-center justify-center text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
        {{ c.label }}
      </div>
      <div
        class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs leading-snug flex items-center [&_code]:font-mono [&_code]:text-[10px] [&_code]:bg-white [&_code]:border [&_code]:border-slate-300 [&_code]:rounded [&_code]:px-1"
        v-html="c.cc"
      />
      <div
        class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs leading-snug flex items-center [&_code]:font-mono [&_code]:text-[10px] [&_code]:bg-white [&_code]:border [&_code]:border-slate-300 [&_code]:rounded [&_code]:px-1"
        v-html="c.codex"
      />
    </div>
  </div>
</template>
