<script setup>
/**
 * Interactive complexity-ladder stepper: six rungs, click to inspect
 * need / minimal solution / upgrade trigger / downgrade counterexample.
 * Bilingual self-contained; SSR-safe.
 */
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const zh = computed(() => lang.value?.startsWith('zh') ?? false)

const rungs = [
  { id: 1, zh: { need: '固定输入 → 固定输出', min: '提示词 + 结构化输出', up: '需要外部事实或动作', down: '答案能写进 prompt 时不要建检索管线', page: '/zh/tech/03-context/prompt' }, en: { need: 'Fixed input → fixed output', min: 'Prompt + structured output', up: 'External facts or actions needed', down: "No retrieval pipeline when the answer fits the prompt", page: '/tech/03-context/prompt' } },
  { id: 2, zh: { need: '需要外部事实', min: '检索 / RAG', up: '数据源多、权限 / 更新 / 延迟成为问题', down: '知识量小且稳定时放进上下文更便宜', page: '/zh/tech/04-grounding/rag' }, en: { need: 'External facts needed', min: 'Retrieval / RAG', up: 'Many sources; permissions / freshness / latency bite', down: 'Small stable knowledge is cheaper inlined in context', page: '/tech/04-grounding/rag' } },
  { id: 3, zh: { need: '需要一次受控动作', min: '工具调用（tool calling）', up: '多步、可恢复、需审批 → 梯级 4', down: '单步操作不需要 agent 循环', page: '/zh/tech/05-action/tool-calling' }, en: { need: 'One controlled action', min: 'Tool calling', up: 'Multi-step, resumable, approval → rung 4', down: 'A single step needs no agent loop', page: '/tech/05-action/tool-calling' } },
  { id: 4, zh: { need: '需要多步决策', min: '工作流 / 同域子任务', up: '自治循环 + 明确停止条件 → 梯级 5', down: '步骤能静态枚举时自治只增加风险', page: '/zh/tech/06-agent-systems/workflow' }, en: { need: 'Multi-step decisions', min: 'Workflow / in-domain subtasks', up: 'Autonomous loop + explicit stop conditions → rung 5', down: 'Statically enumerable steps: autonomy only adds risk', page: '/tech/06-agent-systems/workflow' } },
  { id: 5, zh: { need: '需要自治循环', min: 'Agent（运行时 + 停止条件 + 权限边界）', up: '跨信任域、异步、能力发现 → 梯级 6', down: '同进程内可完成的任务不要跨边界', page: '/zh/tech/06-agent-systems/agent-runtime' }, en: { need: 'An autonomous loop', min: 'Agent (runtime + stop conditions + permission bounds)', up: 'Trust domains, async, capability discovery → rung 6', down: 'Same-process tasks need no boundary crossing', page: '/tech/06-agent-systems/agent-runtime' } },
  { id: 6, zh: { need: '跨进程 / 组织 / 信任域', min: '按连接方向选协议（MCP / AG-UI / ACP / A2A）', up: '—（本阶梯顶）', down: '同 host 内直接函数 / HTTP 即可', page: '/zh/tech/07-interoperability/' }, en: { need: 'Cross-process / org / trust domain', min: 'Protocol by connection direction (MCP / AG-UI / ACP / A2A)', up: '— (top of the ladder)', down: 'In-host needs only functions / HTTP', page: '/tech/07-interoperability/' } }
]

const t = computed(() => zh.value
  ? { title: '阶梯步进器：点梯级看详情', need: '需求', min: '最低复杂度方案', up: '升级触发条件', down: '降级反例', open: '查看详情', read: '去读' }
  : { title: 'Ladder stepper: click a rung for details', need: 'Need', min: 'Minimal solution', up: 'Upgrade trigger', down: 'Downgrade counterexample', open: 'Details', read: 'Read' })

const active = ref(1)
const current = computed(() => rungs.find((r) => r.id === active.value))
</script>

<template>
  <div class="ladder-stepper">
    <p class="ls-title">{{ t.title }}</p>
    <ol class="ls-rungs">
      <li v-for="r in rungs" :key="r.id">
        <button
          type="button"
          class="ls-rung"
          :class="{ active: active === r.id }"
          :aria-expanded="active === r.id"
          @click="active = r.id"
        >
          <span class="ls-num">{{ r.id }}</span>
          <span class="ls-need">{{ zh ? r.zh.need : r.en.need }}</span>
        </button>
      </li>
    </ol>
    <div class="ls-detail" role="region">
      <div class="ls-row"><span class="ls-label">{{ t.need }}</span><span>{{ zh ? current.zh.need : current.en.need }}</span></div>
      <div class="ls-row"><span class="ls-label">{{ t.min }}</span><strong>{{ zh ? current.zh.min : current.en.min }}</strong></div>
      <div class="ls-row"><span class="ls-label">{{ t.up }}</span><span class="ls-up">{{ zh ? current.zh.up : current.en.up }}</span></div>
      <div class="ls-row"><span class="ls-label">{{ t.down }}</span><span class="ls-down">{{ zh ? current.zh.down : current.en.down }}</span></div>
      <a class="ls-go" :href="current.page">{{ t.read }} →</a>
    </div>
  </div>
</template>

<style scoped>
.ladder-stepper { margin: 1.5rem 0; padding: 1.25rem 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.ls-title { margin: 0 0 1rem; font-weight: 600; }
.ls-rungs { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; margin: 0 0 1rem; padding: 0; }
.ls-rung { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); border-radius: 8px; padding: .45rem .8rem; font-size: .85rem; cursor: pointer; transition: all .2s ease; }
.ls-rung:hover { border-color: var(--vp-c-brand); }
.ls-rung.active { border-color: var(--vp-c-brand); box-shadow: inset 0 0 0 1px var(--vp-c-brand); }
.ls-num { display: inline-grid; place-items: center; width: 1.5em; height: 1.5em; border-radius: 50%; background: var(--vp-c-brand-soft, var(--vp-c-divider)); font-size: .8rem; font-weight: 700; }
.ls-rung.active .ls-num { background: var(--vp-c-brand); color: var(--vp-c-white); }
.ls-detail { padding: 1rem 1.25rem; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); display: grid; gap: .5rem; font-size: .92rem; }
.ls-row { display: flex; gap: .75rem; align-items: baseline; }
.ls-label { flex: 0 0 8em; font-size: .8rem; color: var(--vp-c-text-3); }
.ls-up { color: var(--vp-c-brand); }
.ls-down { color: var(--vp-c-text-2); }
.ls-go { justify-self: end; font-weight: 600; }
</style>
