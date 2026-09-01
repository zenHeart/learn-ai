#!/usr/bin/env node
/**
 * Phase 4 helper (Issue #116): replace merged-away legacy pages with meta-refresh
 * redirect stubs and publish the machine-readable map to docs/public/redirects.json.
 *
 * Run AFTER the corresponding new canonical page exists. Idempotent: skips paths
 * whose new target file is missing (so it can be re-run in batches).
 *
 *   node scripts/generate-redirects.mjs [--dry]
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(root, 'docs')
const dry = process.argv.includes('--dry')

const slugMap = JSON.parse(readFileSync(join(root, '_phase0/slug-map.json'), 'utf8'))

/** old docs-relative md path (no locale normalization) -> new site path */
const moves = []

function addTarget(topic, locales) {
  const layer = slugMap.layers[topic.layer]
  const base = topic.slug === '../resources' ? 'resources' : `tech/${layer ? layer.dir + '/' : ''}${topic.slug}`
  for (const loc of locales) {
    const prefix = loc === 'zh' ? 'zh/' : ''
    moves.push({ from: null, to: `/${prefix}${base}` , locales: [loc] })
  }
}

// 1. mergeSources -> new canonical path (zh sources -> /zh/..., en sources -> /...)
for (const topic of slugMap.topics) {
  const zhSources = topic.mergeSources.filter((s) => s.startsWith('zh/'))
  const enSources = topic.mergeSources.filter((s) => !s.startsWith('zh/'))
  const layer = slugMap.layers[topic.layer]
  const base = topic.slug === '../resources' ? 'resources' : `tech/${layer ? layer.dir + '/' : ''}${topic.slug}`
  for (const s of zhSources) moves.push({ from: s, to: `/zh/${base}` })
  for (const s of enSources) moves.push({ from: s, to: `/${base}` })
}

// 2. productsMoves
for (const mv of slugMap.productsMoves) {
  const to = mv.to.startsWith('products/') ? `/${mv.to}` : `/zh/${mv.to}`
  for (const from of mv.from) moves.push({ from, to: from.startsWith('zh/') ? `/zh/${mv.to}` : `/${mv.to}` })
}

const stubs = []
for (const mv of moves) {
  if (!mv.from) continue
  const oldAbs = join(docsRoot, mv.from)
  if (!existsSync(oldAbs)) continue
  const toAbs = join(docsRoot, mv.to.replace(/^\//, '').replace(/\/$/, '') + '.md')
    .replace(/\.md\.md$/, '.md')
  const toIndex = join(docsRoot, mv.to.replace(/^\//, '').replace(/\/$/, ''), 'index.md')
  if (!existsSync(toAbs) && !existsSync(toIndex)) {
    console.log(`SKIP (target missing): ${mv.from} -> ${mv.to}`)
    continue
  }
  const loc = mv.from.startsWith('zh/') ? 'zh' : 'en'
  const stub = `---
title: "${loc === 'zh' ? '已迁移' : 'Moved'}"
description: "${loc === 'zh' ? '本页内容已并入新结构。' : 'This page has been merged into the new structure.'}"
domain: tech
tags: [redirect]
listed: false
status: redirect
head:
  - - meta
    - http-equiv: refresh
    - content: '0; url=${mv.to}'
  - - link
    - rel: canonical
    - href: ${mv.to}
---

${loc === 'zh' ? '本页已迁移到' : 'This page has moved to'} [${mv.to}](${mv.to}).
`
  stubs.push({ from: mv.from, body: stub, to: mv.to })
}

const jsonMap = Object.fromEntries(stubs.map((s) => [s.from.replace(/\.md$/, ''), s.to]))
mkdirSync(join(docsRoot, 'public'), { recursive: true })

if (dry) {
  console.log(`would write ${stubs.length} stubs + redirects.json`)
  for (const s of stubs) console.log(`  ${s.from} -> ${s.to}`)
  process.exit(0)
}

for (const s of stubs) {
  mkdirSync(dirname(join(docsRoot, s.from)), { recursive: true })
  writeFileSync(join(docsRoot, s.from), s.body)
}
writeFileSync(join(docsRoot, 'public/redirects.json'), JSON.stringify(jsonMap, null, 2))
console.log(`wrote ${stubs.length} redirect stubs + public/redirects.json`)
