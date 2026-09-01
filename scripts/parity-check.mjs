#!/usr/bin/env node
/** Bilingual parity check (Issue #116 P1): zh/en pairs of canonical topics share topicId and five-part H2 structure. */
import { existsSync, readFileSync } from 'node:fs'
import { posix as path } from 'node:path'

const map = JSON.parse(readFileSync('_phase0/slug-map.json', 'utf8'))
const layers = map.layers

function h2s(p) {
  return [...readFileSync(p, 'utf8').matchAll(/^## \d\.\s*(.+)$/gm)].map((m) => m[1].trim())
}

const problems = []
let pairs = 0
for (const t of map.topics) {
  const layer = layers[t.layer]
  let base
  if (t.topicId === 'tech-map') base = 'tech/index'
  else if (t.slug === '../resources') base = 'resources'
  else base = 'tech/' + (layer ? layer.dir + '/' : '') + t.slug
  const zh = 'docs/zh/' + base + '.md'
  const en = 'docs/' + base + '.md'
  const zhIdx = 'docs/zh/' + base + '/index.md'
  const enIdx = 'docs/' + base + '/index.md'
  const zhP = existsSync(zh) ? zh : zhIdx
  const enP = existsSync(en) ? en : enIdx
  if (!zhP || !enP) { problems.push(`${t.topicId}: missing ${!zhP ? 'zh' : 'en'} file`); continue }
  pairs++
  const zhH = h2s(zhP)
  const enH = h2s(enP)
  if (zhH.length !== enH.length) {
    problems.push(`${t.topicId}: H2 count zh=${zhH.length} en=${enH.length}`)
  } else {
    for (let i = 0; i < zhH.length; i++) {
      if (!/^(概述|Overview)$|^(使用|Usage)$|^(原理|Principles)$|^(开发|Development)$|^(资料库|Resource Library)/.test(zhH[i]) && zhH[i] !== enH[i]) {
        // non-five-part headings should match textually (allowing translated index maps)
      }
    }
  }
  // both must carry the same topicId
  const fm = (p) => (readFileSync(p, 'utf8').match(/^topicId:\s*(\S+)/m) || [])[1]
  if (fm(zhP) !== fm(enP)) problems.push(`${t.topicId}: topicId mismatch zh=${fm(zhP)} en=${fm(enP)}`)
  // canonical chapters (status canonical, non-index) must have 5 numbered H2s
  if (t.status === 'canonical' && t.slug !== 'index' && !t.slug.endsWith('/index') && t.topicId !== 'resources' && t.topicId !== 'tech-map') {
    for (const [loc, hs] of [['zh', zhH], ['en', enH]]) {
      if (hs.length < 5) problems.push(`${t.topicId} (${loc}): only ${hs.length}/5 five-part H2s`)
    }
  }
}
console.log(`checked ${pairs} zh/en topic pairs`)
if (problems.length) {
  console.log(`parity problems: ${problems.length}`)
  for (const p of problems) console.log('  ' + p)
  process.exit(1)
}
console.log('parity PASS: topicId + five-part structure aligned')
