#!/usr/bin/env node
/**
 * Scope v6 migration: move existing v5 pages into the report-aligned group
 * structure (user decision, 2026-09-01). New layout:
 *
 *   00-map / 01-model-lifecycle / 02-inference-interface / 03-context /
 *   04-grounding / 05-action / 06-agent-systems / 07-interoperability /
 *   08-production / 09-advanced / appendices(-)
 *
 * - git mv both locales
 * - rewrite frontmatter layer/navOrder
 * - rewrite in-page relative links per prefix map
 * - emit redirect stubs for old paths + merge into public/redirects.json
 *
 * Run once: node _phase0/v6-migrate.mjs
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { execSync } from 'node:child_process'

// old docs-relative path (no locale) -> [new path, newLayer, navOrder]
const MOVES = {
  // 00-map
  'tech/00-orientation/complexity-ladder.md': ['tech/00-map/complexity-ladder.md', '0', 1],
  'tech/00-orientation/site-boundaries.md': ['tech/00-map/site-boundaries.md', '0', 2],
  // 01-model-lifecycle
  'tech/00-orientation/model-lifecycle-bridge.md': ['tech/01-model-lifecycle/index.md', '1', 10],
  'tech/appendices/model-lifecycle/index.md': ['tech/01-model-lifecycle/post-training/index.md', '1', 14],
  'tech/appendices/model-lifecycle/sft.md': ['tech/01-model-lifecycle/post-training/sft.md', '1', 141],
  'tech/appendices/model-lifecycle/rlhf.md': ['tech/01-model-lifecycle/post-training/rlhf.md', '1', 142],
  'tech/appendices/model-lifecycle/peft.md': ['tech/01-model-lifecycle/post-training/peft.md', '1', 143],
  // 02-inference-interface
  'tech/02-integration/index.md': ['tech/02-inference-interface/index.md', '2', 20],
  'tech/02-integration/model-api.md': ['tech/02-inference-interface/model-api.md', '2', 22],
  'tech/01-contracts/structured-output.md': ['tech/02-inference-interface/structured-output.md', '2', 23],
  'tech/02-integration/streaming.md': ['tech/02-inference-interface/streaming.md', '2', 24],
  'tech/02-integration/browser-edge.md': ['tech/02-inference-interface/browser-edge.md', '2', 25],
  'tech/02-integration/ui.md': ['tech/02-inference-interface/ui.md', '2', 26],
  // 03-context
  'tech/01-contracts/index.md': ['tech/03-context/index.md', '3', 30],
  'tech/01-contracts/prompt.md': ['tech/03-context/prompt.md', '3', 31],
  'tech/02-integration/session-state.md': ['tech/03-context/session-memory.md', '3', 33],
  // 04-grounding
  'tech/03-grounding/index.md': ['tech/04-grounding/index.md', '4', 40],
  'tech/03-grounding/embeddings-retrieval.md': ['tech/04-grounding/embeddings-retrieval.md', '4', 41],
  'tech/03-grounding/rag.md': ['tech/04-grounding/rag.md', '4', 42],
  'tech/03-grounding/advanced-retrieval.md': ['tech/04-grounding/advanced-retrieval.md', '4', 43],
  // 05-action
  'tech/01-contracts/tool-calling.md': ['tech/05-action/tool-calling.md', '5', 50],
  'tech/04-action/tool-execution.md': ['tech/05-action/tool-execution.md', '5', 51],
  // 06-agent-systems (flattened)
  'tech/04-action/agent-runtime/index.md': ['tech/06-agent-systems/agent-runtime.md', '6', 60],
  'tech/04-action/agent-runtime/design-patterns.md': ['tech/06-agent-systems/design-patterns.md', '6', 61],
  'tech/04-action/agent-runtime/state-memory.md': ['tech/06-agent-systems/state-memory.md', '6', 62],
  'tech/04-action/agent-runtime/recovery-hitl.md': ['tech/06-agent-systems/recovery-hitl.md', '6', 64],
  'tech/04-action/agent-runtime/computer-use.md': ['tech/06-agent-systems/computer-use.md', '6', 65],
  'tech/04-action/workflow.md': ['tech/06-agent-systems/workflow.md', '6', 66],
  'tech/04-action/skills.md': ['tech/06-agent-systems/skills.md', '6', 67],
  'tech/04-action/plugins.md': ['tech/06-agent-systems/plugins.md', '6', 68],
  'tech/04-action/multi-agent.md': ['tech/06-agent-systems/multi-agent.md', '6', 69],
  // 07-interoperability (flattened)
  'tech/04-action/protocols/index.md': ['tech/07-interoperability/index.md', '7', 70],
  'tech/04-action/protocols/mcp.md': ['tech/07-interoperability/mcp.md', '7', 71],
  'tech/04-action/protocols/ag-ui.md': ['tech/07-interoperability/ag-ui.md', '7', 72],
  'tech/04-action/protocols/a2ui-mcp-apps.md': ['tech/07-interoperability/a2ui-mcp-apps.md', '7', 73],
  'tech/04-action/protocols/acp-agent-client.md': ['tech/07-interoperability/acp-agent-client.md', '7', 74],
  'tech/04-action/protocols/a2a.md': ['tech/07-interoperability/a2a.md', '7', 75],
  'tech/04-action/protocols/watchlist.md': ['tech/07-interoperability/watchlist.md', '7', 76],
  // 08-production
  'tech/05-operations/index.md': ['tech/08-production/index.md', '8', 80],
  'tech/05-operations/testing.md': ['tech/08-production/testing.md', '8', 81],
  'tech/05-operations/evaluation.md': ['tech/08-production/evaluation.md', '8', 82],
  'tech/05-operations/observability.md': ['tech/08-production/observability.md', '8', 83],
  'tech/05-operations/security.md': ['tech/08-production/security.md', '8', 84],
  'tech/05-operations/cost-performance.md': ['tech/08-production/cost-performance.md', '8', 85],
  'tech/05-operations/deployment.md': ['tech/08-production/deployment.md', '8', 86],
  // 09-advanced
  'tech/appendices/multimodal/index.md': ['tech/09-advanced/multimodal.md', '9', 94],
  'tech/appendices/multimodal/claude-vision-capabilities.md': ['tech/09-advanced/multimodal-vision-case.md', '9', 95]
}

// old group prefix -> new group prefix for in-page ../ links (depth-1 sources)
const PREFIX_MAP = [
  ['../00-orientation/complexity-ladder', '../00-map/complexity-ladder'],
  ['../00-orientation/site-boundaries', '../00-map/site-boundaries'],
  ['../00-orientation/model-lifecycle-bridge', '../01-model-lifecycle/'],
  ['../00-orientation/index.md', '../index.md'],
  ['../01-contracts/prompt', '../03-context/prompt'],
  ['../01-contracts/context', '../03-context/context-engineering'],
  ['../01-contracts/structured-output', '../02-inference-interface/structured-output'],
  ['../01-contracts/tool-calling', '../05-action/tool-calling'],
  ['../01-contracts/', '../03-context/'],
  ['../02-integration/model-api', '../02-inference-interface/model-api'],
  ['../02-integration/streaming', '../02-inference-interface/streaming'],
  ['../02-integration/session-state', '../03-context/session-memory'],
  ['../02-integration/ui', '../02-inference-interface/ui'],
  ['../02-integration/browser-edge', '../02-inference-interface/browser-edge'],
  ['../02-integration/', '../02-inference-interface/'],
  ['../03-grounding/', '../04-grounding/'],
  ['../04-action/tool-execution', '../05-action/tool-execution'],
  ['../04-action/workflow', '../06-agent-systems/workflow'],
  ['../04-action/skills', '../06-agent-systems/skills'],
  ['../04-action/plugins', '../06-agent-systems/plugins'],
  ['../04-action/multi-agent', '../06-agent-systems/multi-agent'],
  ['../04-action/agent-runtime/design-patterns', '../06-agent-systems/design-patterns'],
  ['../04-action/agent-runtime/state-memory', '../06-agent-systems/state-memory'],
  ['../04-action/agent-runtime/recovery-hitl', '../06-agent-systems/recovery-hitl'],
  ['../04-action/agent-runtime/computer-use', '../06-agent-systems/computer-use'],
  ['../04-action/agent-runtime/', '../06-agent-systems/'],
  ['../04-action/agent-runtime', '../06-agent-systems/agent-runtime'],
  ['../04-action/protocols/mcp', '../07-interoperability/mcp'],
  ['../04-action/protocols/ag-ui', '../07-interoperability/ag-ui'],
  ['../04-action/protocols/a2ui-mcp-apps', '../07-interoperability/a2ui-mcp-apps'],
  ['../04-action/protocols/acp-agent-client', '../07-interoperability/acp-agent-client'],
  ['../04-action/protocols/a2a', '../07-interoperability/a2a'],
  ['../04-action/protocols/watchlist', '../07-interoperability/watchlist'],
  ['../04-action/protocols/', '../07-interoperability/'],
  ['../04-action/protocols', '../07-interoperability'],
  ['../04-action/', '../06-agent-systems/'],
  ['../04-action', '../06-agent-systems'],
  ['../05-operations/', '../08-production/'],
  ['../appendices/model-lifecycle/', '../01-model-lifecycle/post-training/'],
  ['../appendices/multimodal/', '../09-advanced/'],
  ['../appendices/multimodal/claude-vision-capabilities', '../09-advanced/multimodal-vision-case'],
  ['../appendices/multimodal', '../09-advanced/multimodal'],
  // depth-2 sources (were protocols/, agent-runtime/) link ../.. into groups
  ['../../01-contracts/prompt', '../../03-context/prompt'],
  ['../../01-contracts/context', '../../03-context/context-engineering'],
  ['../../01-contracts/structured-output', '../../02-inference-interface/structured-output'],
  ['../../01-contracts/tool-calling', '../../05-action/tool-calling'],
  ['../../02-integration/', '../../02-inference-interface/'],
  ['../../03-grounding/', '../../04-grounding/'],
  ['../../04-action/tool-execution', '../../05-action/tool-execution'],
  ['../../04-action/workflow', '../../06-agent-systems/workflow'],
  ['../../04-action/skills', '../../06-agent-systems/skills'],
  ['../../04-action/multi-agent', '../../06-agent-systems/multi-agent'],
  ['../../04-action/', '../../06-agent-systems/'],
  ['../../05-operations/', '../../08-production/'],
  ['../../00-orientation/complexity-ladder', '../../00-map/complexity-ladder'],
  ['../../00-orientation/site-boundaries', '../../00-map/site-boundaries'],
  ['../../00-orientation/model-lifecycle-bridge', '../../01-model-lifecycle/']
]

function rewriteLinks(text) {
  for (const [from, to] of PREFIX_MAP) text = text.split(from).join(to)
  return text
}

function rewriteFm(text, layer, navOrder) {
  return text
    .replace(/^layer:\s*.*$/m, `layer: "${layer}"`)
    .replace(/^navOrder:\s*.*$/m, `navOrder: ${navOrder}`)
}

const locales = ['zh/', '']
let moved = 0, stubs = 0
const redirectsJson = JSON.parse(readFileSync('docs/public/redirects.json', 'utf8'))

for (const [oldRel, [newRel, layer, navOrder]] of Object.entries(MOVES)) {
  for (const loc of locales) {
    const oldP = 'docs/' + loc + oldRel
    const newP = 'docs/' + loc + newRel
    if (!existsSync(oldP)) { console.log('skip missing:', loc + oldRel); continue }
    mkdirSync(dirname(newP), { recursive: true })
    let text = readFileSync(oldP, 'utf8')
    text = rewriteFm(rewriteLinks(text), layer, navOrder)
    writeFileSync(oldP, text)
    execSync(`git mv "${oldP}" "${newP}"`)
    moved++
    // redirect stub at old path
    const to = '/' + loc + newRel.replace(/\.md$/, '')
    const zh = loc === 'zh/'
    writeFileSync(oldP, `---
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
`)
    stubs++
    redirectsJson[loc + oldRel.replace(/\.md$/, '')] = to
  }
}
writeFileSync('docs/public/redirects.json', JSON.stringify(redirectsJson, null, 2))
console.log(`moved ${moved} pages, wrote ${stubs} redirect stubs`)
