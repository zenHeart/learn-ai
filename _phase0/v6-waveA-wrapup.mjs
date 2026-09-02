#!/usr/bin/env node
/** Wave A wrap-up: stub old context page, clear pending flags, update redirects.json. */
import { readFileSync, writeFileSync } from 'node:fs'

function stub(p, to, zh) {
  const body = `---
title: "${zh ? '已迁移' : 'Moved'}"
description: "${zh ? '本页已拆分为上下文窗口 / 上下文工程 / 仓库上下文三页。' : 'Split into context-window / context-engineering / repo-context.'}"
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

${zh ? '本页已拆分，主入口' : 'This page was split; main entry'} [${to}](${to}).
`
  writeFileSync(p, body)
}

stub('docs/zh/tech/01-contracts/context.md', '/zh/tech/03-context/context-engineering', true)
stub('docs/tech/01-contracts/context.md', '/tech/03-context/context-engineering', false)

const m = JSON.parse(readFileSync('_phase0/slug-map.json', 'utf8'))
for (const t of m.topics) delete t.pending
writeFileSync('_phase0/slug-map.json', JSON.stringify(m, null, 2))

const r = JSON.parse(readFileSync('docs/public/redirects.json', 'utf8'))
r['zh/tech/01-contracts/context'] = '/zh/tech/03-context/context-engineering'
r['tech/01-contracts/context'] = '/tech/03-context/context-engineering'
writeFileSync('docs/public/redirects.json', JSON.stringify(r, null, 2))
console.log('waveA wrapup done')
