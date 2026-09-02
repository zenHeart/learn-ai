#!/usr/bin/env node
/** Phase 4 leftovers: EN mirrors + zh stragglers -> redirect stubs. */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const stubs = [
  // EN mirrors of already-stubbed zh topics
  ['tech/engineering/cost-optimization.md', '/tech/05-operations/cost-performance'],
  ['tech/engineering/evals.md', '/tech/05-operations/evaluation'],
  ['tech/engineering/observability.md', '/tech/05-operations/observability'],
  ['tech/engineering/security.md', '/tech/05-operations/security'],
  ['tech/engineering/testing.md', '/tech/05-operations/testing'],
  ['tech/engineering/index.md', '/tech/05-operations/'],
  ['tech/frontend/browser-ai.md', '/tech/02-integration/browser-edge'],
  ['tech/frontend/generative-ui.md', '/tech/02-integration/ui'],
  ['tech/frontend/state-management.md', '/tech/02-integration/session-state'],
  ['tech/frontend/streaming.md', '/tech/02-integration/streaming'],
  ['tech/frontend/index.md', '/tech/02-integration/'],
  ['tech/fundamentals/LLM.md', '/tech/00-orientation/model-lifecycle-bridge'],
  ['tech/fundamentals/context.md', '/tech/01-contracts/context'],
  ['tech/fundamentals/index.md', '/tech/'],
  ['tech/generative-benchmarking.md', '/tech/appendices/cases/'],
  ['tech/training/index.md', '/tech/appendices/model-lifecycle/'],
  ['tech/training/PEFT.md', '/tech/appendices/model-lifecycle/peft'],
  ['tech/training/RLHF.md', '/tech/appendices/model-lifecycle/rlhf'],
  ['tech/training/SFT.md', '/tech/appendices/model-lifecycle/sft'],
  ['tech/patterns/agent/2026-04-12-langchain-agent-harness.md', '/tech/04-action/agent-runtime/'],
  ['tech/patterns/agent/hooks.md', '/tech/04-action/agent-runtime/'],
  ['tech/patterns/agent/index.md', '/tech/04-action/agent-runtime/'],
  ['tech/patterns/agent/skills.md', '/tech/04-action/skills'],
  ['tech/patterns/index.md', '/tech/04-action/'],
  ['tech/patterns/RAG-semantic-search-case-study.md', '/tech/appendices/cases/'],
  ['tech/prompt/cases/copilot.md', '/tech/appendices/ai-coding/'],
  ['tech/prompt/cases/index.md', '/tech/01-contracts/prompt'],
  // zh extras
  ['zh/tech/agent/agentic-engineering-patterns.md', '/zh/tech/04-action/agent-runtime/'],
  ['zh/tech/ai-coding/ai-coding-engineering.md', '/zh/tech/appendices/ai-coding/'],
  ['zh/tech/engineering/index.md', '/zh/tech/05-operations/'],
  ['zh/tech/evaluation/ai-testing.md', '/zh/tech/05-operations/testing'],
  ['zh/tech/frontend/browser-ai.md', '/zh/tech/02-integration/browser-edge'],
  ['zh/tech/fundamentals/LLM.md', '/zh/tech/00-orientation/model-lifecycle-bridge'],
  ['zh/tech/patterns/agent/hello-agents.md', '/zh/tech/appendices/course-notes/'],
  ['zh/tech/patterns/agent/hooks.md', '/zh/tech/04-action/agent-runtime/'],
  ['zh/tech/patterns/index.md', '/zh/tech/04-action/'],
  ['zh/tech/skills/index.md', '/zh/tech/04-action/skills']
]

const jsonPath = 'docs/public/redirects.json'
const json = JSON.parse(readFileSync(jsonPath, 'utf8'))
let n = 0
for (const [from, to] of stubs) {
  const p = 'docs/' + from
  if (!existsSync(p)) { console.log('missing:', from); continue }
  const loc = from.startsWith('zh/') ? 'zh' : 'en'
  const zh = loc === 'zh'
  const body = `---
title: "${zh ? '已迁移' : 'Moved'}"
description: "${zh ? '本页内容已并入新结构。' : 'This page has been merged into the new structure.'}"
domain: tech
tags: [redirect]
listed: false
status: redirect
head:
  - - meta
    - http-equiv: refresh
    - content: '0; url=${to}'
  - - link
    - rel: canonical
    - href: ${to}
---

${zh ? '本页已迁移到' : 'This page has moved to'} [${to}](${to}).
`
  writeFileSync(p, body)
  json[from.replace(/\.md$/, '')] = to
  n++
}
writeFileSync(jsonPath, JSON.stringify(json, null, 2))
console.log(`wrote ${n} extra stubs; redirects.json now ${Object.keys(json).length} entries`)
