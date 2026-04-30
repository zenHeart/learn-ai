<script setup>
import { ref } from 'vue'

const rows = [
  {
    task: '查 Jira 工单详情',
    mcp: 'must',
    skill: 'no',
    combo: 'na',
    reason: '需要访问内网系统 → 必须 MCP 提供能力',
  },
  {
    task: '统一 commit message 风格',
    mcp: 'no',
    skill: 'must',
    combo: 'na',
    reason: '纯流程约束，无需访问外部',
  },
  {
    task: '看工单 → 改 bug → 提 MR',
    mcp: 'half',
    skill: 'half',
    combo: 'must',
    reason: '跨能力 + 跨工序 → 必须组合',
  },
  {
    task: '团队 Code Review SOP',
    mcp: 'no',
    skill: 'must',
    combo: 'opt',
    reason: '流程为主，可选拉 GitHub MCP 取 PR diff',
  },
  {
    task: '跨设备代码沙箱执行',
    mcp: 'must',
    skill: 'no',
    combo: 'na',
    reason: '需要执行环境 → 必须 MCP（如 mcp-run-python）',
  },
  {
    task: '发版前的全量检查',
    mcp: 'no',
    skill: 'must',
    combo: 'opt',
    reason: '工序为主，可调多个 MCP 拉数据',
  },
  {
    task: '自动整理本周线上事故',
    mcp: 'half',
    skill: 'half',
    combo: 'must',
    reason: 'Skill 编排顺序 + Sentry / DataDog MCP 拉数据',
  },
]

const active = ref(null)

function fmt(v) {
  if (v === 'must') return { text: '✅', cls: 'is-yes' }
  if (v === 'no') return { text: '❌', cls: 'is-no' }
  if (v === 'half') return { text: '半', cls: 'is-half' }
  if (v === 'opt') return { text: '✅ 可选', cls: 'is-opt' }
  if (v === 'na') return { text: '—', cls: 'is-na' }
  return { text: v, cls: '' }
}
</script>

<template>
  <div class="dm-container">
    <table class="dm-table">
      <thead>
        <tr>
          <th class="dm-task">任务</th>
          <th class="dm-cell-head dm-mcp">仅 MCP</th>
          <th class="dm-cell-head dm-skill">仅 Skill</th>
          <th class="dm-cell-head dm-combo">MCP + Skill</th>
          <th class="dm-reason">决策依据</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          class="dm-row"
          :class="{ 'is-active': active === i }"
          @mouseenter="active = i"
          @mouseleave="active = null"
        >
          <td class="dm-task">{{ row.task }}</td>
          <td class="dm-cell" :class="fmt(row.mcp).cls">{{ fmt(row.mcp).text }}</td>
          <td class="dm-cell" :class="fmt(row.skill).cls">{{ fmt(row.skill).text }}</td>
          <td class="dm-cell" :class="fmt(row.combo).cls">{{ fmt(row.combo).text }}</td>
          <td class="dm-reason">{{ row.reason }}</td>
        </tr>
      </tbody>
    </table>

    <div class="dm-legend">
      <span class="dm-tag is-yes">✅ 必须</span>
      <span class="dm-tag is-opt">✅ 可选</span>
      <span class="dm-tag is-half">半 半自动</span>
      <span class="dm-tag is-no">❌ 不需</span>
      <span class="dm-tag is-na">— 不适用</span>
    </div>

    <div class="dm-mantra">
      🧭 <strong>口诀</strong>：需要伸手到外部 → MCP；需要按规范走流程 → Skill；都要 → 组合。
    </div>
  </div>
</template>

<style scoped>
.dm-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.dm-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
}

.dm-table th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
  text-align: left;
  padding: 0.55rem 0.75rem;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.78rem;
}

.dm-table th.dm-mcp { color: #2563eb; text-align: center; }
.dm-table th.dm-skill { color: #a855f7; text-align: center; }
.dm-table th.dm-combo { color: #f97316; text-align: center; }

.dm-row {
  transition: background 0.15s ease;
  cursor: default;
}

.dm-row.is-active {
  background: #fffbeb;
}

.dm-row td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.dm-task {
  color: #0f172a;
  font-weight: 500;
}

.dm-cell {
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
}

.dm-cell.is-yes { color: #16a34a; }
.dm-cell.is-no { color: #94a3b8; }
.dm-cell.is-half { color: #f59e0b; font-size: 0.8rem; }
.dm-cell.is-opt { color: #16a34a; font-size: 0.75rem; }
.dm-cell.is-na { color: #cbd5e1; }

.dm-reason {
  color: #475569;
  font-size: 0.78rem;
  line-height: 1.5;
}

.dm-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.72rem;
  justify-content: center;
}

.dm-tag {
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: #f1f5f9;
  color: #475569;
  font-weight: 500;
}

.dm-tag.is-yes { background: #dcfce7; color: #15803d; }
.dm-tag.is-opt { background: #d1fae5; color: #047857; }
.dm-tag.is-half { background: #fef3c7; color: #b45309; }
.dm-tag.is-no { background: #fee2e2; color: #b91c1c; }
.dm-tag.is-na { background: #f1f5f9; color: #94a3b8; }

.dm-mantra {
  text-align: center;
  background: #fff7ed;
  border-left: 4px solid #f97316;
  padding: 0.55rem 0.85rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #7c2d12;
}
</style>
