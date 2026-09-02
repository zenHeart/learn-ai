#!/usr/bin/env node
/** Update _phase0/slug-map.json to v6 group structure + register Wave A pending topics. */
import { readFileSync, writeFileSync } from 'node:fs'

const map = JSON.parse(readFileSync('_phase0/slug-map.json', 'utf8'))

const GROUPS = {
  '0': { dir: '00-map', q: '我在哪？谁拥有什么？' },
  '1': { dir: '01-model-lifecycle', q: '模型能力从哪来？（桥接组）' },
  '2': { dir: '02-inference-interface', q: '推理与接口：参数如何变成在线服务与契约？' },
  '3': { dir: '03-context', q: '模型这一轮看到什么？' },
  '4': { dir: '04-grounding', q: '如何引入参数之外的知识？（读世界）' },
  '5': { dir: '05-action', q: '如何受控地影响外部世界？（写世界）' },
  '6': { dir: '06-agent-systems', q: '如何形成有状态闭环？' },
  '7': { dir: '07-interoperability', q: '跨边界如何通信？（按连接方向）' },
  '8': { dir: '08-production', q: '如何可靠上线？' },
  '9': { dir: '09-advanced', q: '如何理解与扩展边界？（桥接组）' }
}

const T = {
  'tech-map': ['index', '0'],
  'complexity-ladder': ['complexity-ladder', '0'],
  'site-boundaries': ['site-boundaries', '0'],
  'model-lifecycle-bridge': ['index', '1'],
  'llm-mental-model': ['llm-mental-model', '1'],
  'architecture': ['architecture', '1'],
  'data-pretraining-scaling': ['data-pretraining-scaling', '1'],
  'model-lifecycle-sft': ['post-training/sft', '1'],
  'model-lifecycle-rlhf': ['post-training/rlhf', '1'],
  'model-lifecycle-peft': ['post-training/peft', '1'],
  'integration': ['index', '2'],
  'inference-fundamentals': ['inference-fundamentals', '2'],
  'efficient-serving': ['efficient-serving', '2'],
  'model-api': ['model-api', '2'],
  'structured-output': ['structured-output', '2'],
  'streaming': ['streaming', '2'],
  'generative-ui': ['ui', '2'],
  'browser-edge': ['browser-edge', '2'],
  'contracts-index': ['index', '3'],
  'prompt': ['prompt', '3'],
  'context-window': ['context-window', '3'],
  'context': ['context-engineering', '3'],
  'session-memory': ['session-memory', '3'],
  'repo-context': ['repo-context', '3'],
  'grounding': ['index', '4'],
  'embeddings-retrieval': ['embeddings-retrieval', '4'],
  'rag': ['rag', '4'],
  'advanced-retrieval': ['advanced-retrieval', '4'],
  'tool-calling': ['tool-calling', '5'],
  'tool-execution': ['tool-execution', '5'],
  'agent-runtime': ['agent-runtime', '6'],
  'agent-design-patterns': ['design-patterns', '6'],
  'agent-state-memory': ['state-memory', '6'],
  'hooks': ['hooks', '6'],
  'agent-recovery-hitl': ['recovery-hitl', '6'],
  'computer-use': ['computer-use', '6'],
  'workflow': ['workflow', '6'],
  'skills': ['skills', '6'],
  'plugins': ['plugins', '6'],
  'multi-agent': ['multi-agent', '6'],
  'protocol-map': ['index', '7'],
  'mcp': ['mcp', '7'],
  'ag-ui': ['ag-ui', '7'],
  'a2ui-mcp-apps': ['a2ui-mcp-apps', '7'],
  'acp-agent-client': ['acp-agent-client', '7'],
  'a2a': ['a2a', '7'],
  'protocol-watchlist': ['watchlist', '7'],
  'operations-index': ['index', '8'],
  'testing': ['testing', '8'],
  'evaluation': ['evaluation', '8'],
  'observability': ['observability', '8'],
  'security': ['security', '8'],
  'cost-performance': ['cost-performance', '8'],
  'deployment': ['deployment', '8'],
  'agentops': ['agentops', '8'],
  'interpretability': ['interpretability', '9'],
  'reasoning-ttc': ['reasoning-ttc', '9'],
  'moe-frontier': ['moe-frontier', '9'],
  'multimodal-bridge': ['multimodal', '9']
}

const PENDING = new Set(['llm-mental-model', 'architecture', 'data-pretraining-scaling', 'inference-fundamentals', 'efficient-serving', 'context-window', 'repo-context', 'hooks', 'agentops', 'interpretability', 'reasoning-ttc', 'moe-frontier'])
// session-state renamed to session-memory topicId
const RENAME = { session: 'session-memory' }

for (const t of map.topics) {
  const tid = RENAME[t.topicId] || t.topicId
  const hit = T[tid]
  if (hit) { t.slug = hit[0]; t.layer = hit[1] }
  if (PENDING.has(tid)) t.pending = true
  if (tid !== t.topicId) t.topicId = tid
}
// register pending topics not yet present
for (const tid of PENDING) {
  if (!map.topics.some((t) => t.topicId === tid)) {
    map.topics.push({ topicId: tid, layer: T[tid][1], slug: T[tid][0], status: 'canonical', title: {}, mergeSources: [], notes: 'Wave A v6 新页', pending: true })
  }
}
map.layers = Object.fromEntries(Object.entries(GROUPS).map(([k, v]) => [k, { dir: v.dir, question: v.q }]))
map.scope = 'v6 (user decision 2026-09-01): report-aligned groups'
writeFileSync('_phase0/slug-map.json', JSON.stringify(map, null, 2))
console.log('slug-map updated to v6;', map.topics.length, 'topics')
