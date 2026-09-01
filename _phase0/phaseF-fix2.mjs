#!/usr/bin/env node
/** Phase F fix batch 2: stub leftover v5 action-index group guide, clean registry. */
import { readFileSync, writeFileSync } from 'node:fs'

for (const [loc, zh] of [['zh/', true], ['', false]]) {
  const p = 'docs/' + loc + 'tech/04-action/index.md'
  const to = '/' + loc + 'tech/06-agent-systems/agent-runtime'
  writeFileSync(p, `---
title: "${zh ? '已迁移' : 'Moved'}"
description: "${zh ? 'v6 中行动原语见 Action 组（工具调用/工具执行），闭环运行时见 Agent 系统组。' : 'In v6, action primitives live in the Action group; the loop runtime lives in Agent Systems.'}"
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

${zh ? 'v6 结构调整：行动原语（工具调用 / 工具执行）见 [Action 组](/tech/05-action/tool-calling)；有状态闭环见 [Agent 系统组](/tech/06-agent-systems/agent-runtime)。' : 'v6 change: action primitives (tool calling / tool execution) live in the [Action group](/tech/05-action/tool-calling); the stateful loop lives in [Agent Systems](/tech/06-agent-systems/agent-runtime).'}
`)
  const r = JSON.parse(readFileSync('docs/public/redirects.json', 'utf8'))
  r[loc + 'tech/04-action/index'] = to
  writeFileSync('docs/public/redirects.json', JSON.stringify(r, null, 2))
  console.log('stubbed:', p)
}

const m = JSON.parse(readFileSync('_phase0/slug-map.json', 'utf8'))
const before = m.topics.length
m.topics = m.topics.filter((t) => t.topicId !== 'action-index')
writeFileSync('_phase0/slug-map.json', JSON.stringify(m, null, 2))
console.log('slug-map topics:', before, '->', m.topics.length)
