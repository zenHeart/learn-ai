<script setup>
/**
 * Interactive symptom → group router (tech-map companion widget).
 * Self-contained bilingual data; click a symptom to see the landing group,
 * the first page to open, and why. SSR-safe (no browser APIs at setup).
 */
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const zh = computed(() => lang.value?.startsWith('zh') ?? false)

const routes = [
  {
    id: 'unstable',
    zh: { symptom: '回答不稳定 / 输出无法解析', group: '上下文', why: '先约束输入与输出契约', page: '/zh/tech/03-context/prompt', pageName: '提示词工程' },
    en: { symptom: 'Unstable answers / unparseable output', group: 'Context', why: 'Constrain input & output contracts first', page: '/tech/03-context/prompt', pageName: 'Prompt Engineering' }
  },
  {
    id: 'not-in-product',
    zh: { symptom: '回答稳定，但还没接入产品', group: '推理与接口', why: 'API 适配、流式、会话状态', page: '/zh/tech/02-inference-interface/model-api', pageName: '模型 API 契约' },
    en: { symptom: 'Stable answers, not in a product yet', group: 'Inference & Interface', why: 'API adaptation, streaming, session state', page: '/tech/02-inference-interface/model-api', pageName: 'Model API contract' }
  },
  {
    id: 'missing-facts',
    zh: { symptom: '缺少私有事实 / 知识过时', group: '知识接地', why: '检索与引用链路', page: '/zh/tech/04-grounding/rag', pageName: 'RAG' },
    en: { symptom: 'Missing private facts / stale knowledge', group: 'Grounding', why: 'Retrieval and citation chains', page: '/tech/04-grounding/rag', pageName: 'RAG' }
  },
  {
    id: 'need-action',
    zh: { symptom: '需要调用系统 / 执行动作', group: '行动', why: '受控执行：幂等、超时、权限', page: '/zh/tech/05-action/tool-calling', pageName: '工具调用契约' },
    en: { symptom: 'Need to call systems / perform actions', group: 'Action', why: 'Controlled execution: idempotency, timeouts, permissions', page: '/tech/05-action/tool-calling', pageName: 'Tool calling contract' }
  },
  {
    id: 'autonomy',
    zh: { symptom: '需要多步自治循环', group: 'Agent 系统', why: '闭环运行时与停止条件', page: '/zh/tech/06-agent-systems/agent-runtime', pageName: '心智模型与运行时' },
    en: { symptom: 'Need a multi-step autonomous loop', group: 'Agent Systems', why: 'Loop runtime and stop conditions', page: '/tech/06-agent-systems/agent-runtime', pageName: 'Mental model & runtime' }
  },
  {
    id: 'cross-boundary',
    zh: { symptom: '跨进程 / 组织 / Agent 边界', group: '互操作', why: '按连接方向选协议', page: '/zh/tech/07-interoperability/', pageName: '协议地图' },
    en: { symptom: 'Cross-process / org / agent boundary', group: 'Interoperability', why: 'Pick protocols by connection direction', page: '/tech/07-interoperability/', pageName: 'Protocol map' }
  },
  {
    id: 'not-operable',
    zh: { symptom: '功能已跑，但不可证明 / 不可运营', group: '生产', why: '测试、评估门与版本化', page: '/zh/tech/08-production/', pageName: 'Production 组导览' },
    en: { symptom: 'It runs, but cannot be proven / operated', group: 'Production', why: 'Tests, evaluation gates, versioning', page: '/tech/08-production/', pageName: 'Production group guide' }
  }
]

const t = computed(() => zh.value
  ? { title: '症状路由：点一个症状，直达入口页', hint: '两次导航内落到正确页面', landing: '落点', first: '先读', why: '为什么' }
  : { title: 'Symptom router: pick a symptom, land on the entry page', hint: 'Lands on the right page within two clicks', landing: 'Landing group', first: 'Read first', why: 'Why' })

const active = ref(null)
const current = computed(() => routes.find((r) => r.id === active.value) ?? null)
</script>

<template>
  <div class="symptom-router" role="group" :aria-label="t.title">
    <p class="sr-title">{{ t.title }}</p>
    <p class="sr-hint">{{ t.hint }}</p>
    <div class="sr-chips">
      <button
        v-for="r in routes"
        :key="r.id"
        class="sr-chip"
        :class="{ active: active === r.id }"
        type="button"
        @click="active = active === r.id ? null : r.id"
      >
        {{ zh ? r.zh.symptom : r.en.symptom }}
      </button>
    </div>
    <Transition name="sr-fade">
      <div v-if="current" class="sr-panel">
        <div class="sr-row"><span class="sr-label">{{ t.landing }}</span><span class="sr-group">{{ zh ? current.zh.group : current.en.group }}</span></div>
        <div class="sr-row"><span class="sr-label">{{ t.first }}</span><a :href="current.page">{{ zh ? current.zh.pageName : current.en.pageName }} →</a></div>
        <div class="sr-row"><span class="sr-label">{{ t.why }}</span><span>{{ zh ? current.zh.why : current.en.why }}</span></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.symptom-router { margin: 1.5rem 0; padding: 1.25rem 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.sr-title { margin: 0 0 .25rem; font-weight: 600; }
.sr-hint { margin: 0 0 1rem; font-size: .85rem; color: var(--vp-c-text-3); }
.sr-chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.sr-chip { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); border-radius: 999px; padding: .4rem .9rem; font-size: .85rem; cursor: pointer; transition: all .2s ease; }
.sr-chip:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.sr-chip.active { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: var(--vp-c-white); }
.sr-panel { margin-top: 1rem; padding: 1rem 1.25rem; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-brand-soft, var(--vp-c-divider)); display: grid; gap: .5rem; }
.sr-row { display: flex; gap: .75rem; align-items: baseline; font-size: .92rem; }
.sr-label { flex: 0 0 5.5em; font-size: .8rem; color: var(--vp-c-text-3); }
.sr-group { font-weight: 600; color: var(--vp-c-brand); }
.sr-fade-enter-active, .sr-fade-leave-active { transition: opacity .18s ease, transform .18s ease; }
.sr-fade-enter-from, .sr-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
