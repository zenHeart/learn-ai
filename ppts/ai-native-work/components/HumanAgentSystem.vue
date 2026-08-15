<script setup>
const sections = {
  base: { id: '01', title: '协作基础：能力边界 + 协作协议' },
  modes: { id: '02', title: '四种模式：按任务特征选择，可组合使用' },
}

const modesNote = '不是越靠右越先进；按不确定性、频率、风险与可分解性选择。'

const parties = [
  {
    title: '人 | 定方向 · 设边界 · 做验收',
    desc: '提出目标、补齐背景、校准结果质量',
    card: 'border-orange-200 bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    items: ['价值判断', '目标取舍', '上下文补齐', '例外校准'],
    expand: '放大方式：经验 → 原则/规则 · 判断 → 清单/Eval · 偏差 → 标准',
  },
  {
    title: 'Agent | 推理 · 行动 · 反馈',
    desc: '在授权范围内处理信息、调用工具、汇总证据',
    card: 'border-blue-200 bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    items: ['检索综合', '计划与工具调用', '执行观察', '自检汇总'],
    expand: '放大方式：模型 + 记忆 + 工具 + Skill/Workflow + 子 Agent',
  },
]

const contract = {
  title: '协作协议 | 把任务变成可执行接口',
  desc: '说明结果、输入、约束、权限、证据与停止条件',
  items: [
    { name: 'Outcome', label: '目标结果' },
    { name: 'Context', label: '必要上下文' },
    { name: 'Constraints', label: '边界约束' },
    { name: 'Authority', label: '工具权限' },
    { name: 'Evidence', label: '验收证据' },
    { name: 'Stop/Escalate', label: '停止 / 升级' },
  ],
}

const stages = [
  {
    id: 1,
    title: '对话式协作',
    desc: '目标未清，需要澄清',
    human: '补上下文，看方向',
    agentLabel: 'Agent',
    agent: '回答、起草、局部执行',
    tag: 'Chat',
    cls: 'border-blue-100 bg-blue-50/40',
  },
  {
    id: 2,
    title: '目标式委派',
    desc: '结果明确，路径探索',
    human: '给目标、约束、验收',
    agentLabel: 'Agent',
    agent: '计划 → 行动 → 观察 → 校验',
    tag: 'Goal · Loop · Exit Criteria',
    cls: 'border-blue-200 bg-blue-50/60',
  },
  {
    id: 3,
    title: '流程式编排',
    desc: '高频稳定，路径复用',
    human: '设计步骤、分支、关卡',
    agentLabel: '系统/Agent',
    agent: '规则流转，处理非确定点',
    tag: 'Skill · Hook · Workflow',
    cls: 'border-blue-300 bg-blue-50/80',
  },
  {
    id: 4,
    title: '多 Agent 编排',
    desc: '可分解，需并行',
    human: '给分工、标准、汇总口径',
    agentLabel: '多 Agent',
    agent: '并行执行、校验、汇总',
    tag: 'Handoff · Subagents · Isolation',
    cls: 'border-blue-400 bg-blue-100',
  },
]

const roleShift = {
  human: '人：逐步操作 → 定目标、看例外、验输出',
  agent: 'Agent：单步响应 → 持续、复用、并行',
}

const closure = {
  label: '复利闭环',
  flow: '执行留痕 → Eval 评测 → 定位偏差 → 复盘确认 → 写回规则 / Eval / Skill / Workflow → 再执行',
  detail: '只有反馈被写回资产，下一次执行才会更稳、更快、更可复用，减少重复干预。',
}

const oneLiner = '一句话：人定义输入与验收输出，Agent 扩展执行过程；协作质量取决于协议是否清楚、反馈是否沉淀。'
</script>

<template>
  <div class="mt-2 text-xs leading-snug">
    <!-- 01 协作基础 -->
    <div class="flex items-center gap-2 mb-1.5">
      <div class="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-semibold">
        {{ sections.base.id }}
      </div>
      <div class="text-xs font-semibold text-slate-600">{{ sections.base.title }}</div>
    </div>

    <div class="grid grid-cols-[1fr_auto_1.15fr_auto_1fr] gap-2 items-stretch mb-3">
      <div class="rounded-lg border p-2" :class="parties[0].card">
        <div class="font-semibold text-xs" :class="parties[0].text">{{ parties[0].title }}</div>
        <div class="text-[10px] text-slate-500 mb-1">{{ parties[0].desc }}</div>
        <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-slate-600">
          <div v-for="item in parties[0].items" :key="item">· {{ item }}</div>
        </div>
        <div class="mt-1.5 pt-1.5 border-t text-[10px]" :class="[parties[0].border, parties[0].text]">
          {{ parties[0].expand }}
        </div>
      </div>

      <div class="flex items-center text-slate-300">→</div>

      <div class="rounded-lg border border-violet-200 bg-violet-50 p-2">
        <div class="font-semibold text-violet-700 text-xs">{{ contract.title }}</div>
        <div class="text-[10px] text-slate-500 mb-1">{{ contract.desc }}</div>
        <div class="grid grid-cols-2 gap-1">
          <div
            v-for="c in contract.items"
            :key="c.name"
            class="rounded border border-violet-200 bg-white px-1.5 py-0.5 text-[10px] text-violet-700"
          >
            <span class="font-semibold">{{ c.name }}</span> {{ c.label }}
          </div>
        </div>
      </div>

      <div class="flex items-center text-slate-300">→</div>

      <div class="rounded-lg border p-2" :class="parties[1].card">
        <div class="font-semibold text-xs" :class="parties[1].text">{{ parties[1].title }}</div>
        <div class="text-[10px] text-slate-500 mb-1">{{ parties[1].desc }}</div>
        <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-slate-600">
          <div v-for="item in parties[1].items" :key="item">· {{ item }}</div>
        </div>
        <div class="mt-1.5 pt-1.5 border-t text-[10px]" :class="[parties[1].border, parties[1].text]">
          {{ parties[1].expand }}
        </div>
      </div>
    </div>

    <!-- 02 四种模式 -->
    <div class="flex items-center justify-between mb-1.5">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-semibold">
          {{ sections.modes.id }}
        </div>
        <div class="text-xs font-semibold text-slate-600">{{ sections.modes.title }}</div>
      </div>
      <div class="text-[10px] text-slate-400">{{ modesNote }}</div>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div
        v-for="stage in stages"
        :key="stage.id"
        class="rounded-lg border p-2"
        :class="stage.cls"
      >
        <div class="flex items-center gap-1.5 mb-0.5">
          <div class="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-semibold">
            {{ stage.id }}
          </div>
          <div class="font-semibold text-slate-800 text-xs">{{ stage.title }}</div>
        </div>
        <div class="text-[10px] text-slate-500 mb-1.5">{{ stage.desc }}</div>
        <div class="text-[10px] text-slate-600 mb-0.5"><span class="text-orange-600">人</span> {{ stage.human }}</div>
        <div class="text-[10px] text-slate-600 mb-1.5"><span class="text-blue-600">{{ stage.agentLabel }}</span> {{ stage.agent }}</div>
        <div class="rounded bg-white border border-blue-200 px-1.5 py-0.5 text-[9px] font-mono text-blue-700 text-center">
          {{ stage.tag }}
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-1.5 text-[10px]">
      <span class="text-orange-600">{{ roleShift.human }}</span>
      <span class="text-blue-600">{{ roleShift.agent }}</span>
    </div>

    <!-- 复利闭环 -->
    <div class="mt-2.5 rounded-lg border border-emerald-200 bg-emerald-50 p-2">
      <div class="flex items-center gap-3">
        <div class="text-[10px] font-semibold text-emerald-700 bg-white border border-emerald-300 rounded-full px-2 py-0.5 shrink-0">
          {{ closure.label }}
        </div>
        <div class="text-[10px] text-emerald-800 leading-snug">{{ closure.flow }}</div>
      </div>
      <div class="text-[10px] text-emerald-700/80 mt-1">{{ closure.detail }}</div>
    </div>

    <div class="mt-1.5 text-[10px] text-slate-400">{{ oneLiner }}</div>
  </div>
</template>
