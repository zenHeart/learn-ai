#!/usr/bin/env node
/** Phase F fix batch 1: EN YAML breaks, agentops header, 08 index next list. */
import { readFileSync, writeFileSync } from 'node:fs'

// 1. Quote EN descriptions with bare colons (js-yaml plain-scalar breaks)
const yamlFixes = [
  'docs/tech/02-inference-interface/efficient-serving.md',
  'docs/tech/09-advanced/interpretability.md',
  'docs/tech/09-advanced/reasoning-ttc.md'
]
for (const p of yamlFixes) {
  const t = readFileSync(p, 'utf8')
  const end = t.indexOf('\n---', 3)
  const block = t.slice(0, end)
  const lines = block.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(title|description):\s?(.*)$/)
    if (!m) continue
    const val = m[2]
    if (val.startsWith('"') || val.startsWith("'")) continue
    if (/:\s/.test(val) || /:\s*$/.test(val) || val.endsWith(':')) {
      // escape any inner double quotes, then wrap
      lines[i] = `${m[1]}: "${val.replace(/"/g, "'")}"`
    }
  }
  writeFileSync(p, lines.join('\n') + t.slice(end))
  console.log('yaml fixed:', p)
}

// 2. agentops header: v5 layer language -> Production group
for (const loc of ['zh/', '']) {
  const p = 'docs/' + loc + 'tech/08-production/agentops.md'
  let t = readFileSync(p, 'utf8')
  const before = t
  t = t
    .replace(/在哪一层[：:]?\s*层 5\s*·\s*可靠运营/g, '所在组：Production')
    .replace(/Layer:\s*5\s*·\s*Reliable Operations/gi, 'Group: Production')
    .replace(/Where you are:\s*Layer 5[^｜]*·/gi, 'Group: Production ｜')
    .replace(/层 5/g, 'Production 组')
    .replace(/Layer 5/g, 'the Production group')
  if (t !== before) { writeFileSync(p, t); console.log('header fixed:', p) }
  else console.log('header already clean:', p)
}

// 3. 08-production/index.md: add agentops to next list
for (const loc of ['zh/', '']) {
  const p = 'docs/' + loc + 'tech/08-production/index.md'
  let t = readFileSync(p, 'utf8')
  const before = t
  t = t.replace(/next:\s*\[([^\]]*deployment[^\]]*)\]/i, (full, list) => {
    if (list.includes('agentops')) return full
    return `next: [${list}, agentops]`
  })
  if (t !== before) { writeFileSync(p, t); console.log('next list updated:', p) }
  else console.log('next list already ok or no deployment ref:', p)
}
console.log('fix batch 1 done')
