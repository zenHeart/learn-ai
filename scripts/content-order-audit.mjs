#!/usr/bin/env node
/**
 * Reads shipped landing + sidebar sources (not a reimplemented catalog).
 * Fails unless zh paths read 1→2→3 and zh tech lists fundamentals before agent/RAG.
 */
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

function firstIndex(hay, needles) {
  return needles.map((n) => {
    const i = hay.indexOf(n)
    return { n, i }
  })
}

// Paths landing: editorial 1 then 2 then 3 (ignore mermaid / later recap)
{
  const src = read('docs/zh/paths/index.md')
  const body = src.split('## 三条路')[1] || src
  const chunk = body.split('## 怎么选')[0] || body
  const marks = firstIndex(chunk, ['路径 1', '路径 2', '路径 3'])
  if (marks.some((m) => m.i < 0)) {
    failures.push('zh/paths/index.md: missing 路径 1/2/3 in the ordered section')
  } else if (!(marks[0].i < marks[1].i && marks[1].i < marks[2].i)) {
    failures.push(
      `zh/paths/index.md: visible order is ${marks.map((m) => `${m.n}@${m.i}`).join(', ')}`
    )
  }
}

// Path leaf navOrder
{
  const expected = [
    ['docs/zh/paths/productivity.md', '10'],
    ['docs/zh/paths/integration.md', '20'],
    ['docs/zh/paths/mastery.md', '30']
  ]
  for (const [file, order] of expected) {
    const src = read(file)
    if (!new RegExp(`^navOrder:\\s*${order}\\s*$`, 'm').test(src)) {
      failures.push(`${file}: expected navOrder ${order}`)
    }
  }
}

// Tech landing: six pyramid layers must appear in order (Issue #116 mainline)
const PYRAMID_LAYERS = [
  '00-orientation',
  '01-contracts',
  '02-integration',
  '03-grounding',
  '04-action',
  '05-operations'
]

function layerOrder(hay, label) {
  const pos = PYRAMID_LAYERS.map((l) => hay.indexOf(l))
  if (pos.some((p) => p < 0)) {
    failures.push(`${label}: missing pyramid layer links ${JSON.stringify(pos)}`)
  } else if (!pos.every((p, i) => i === 0 || pos[i - 1] < p)) {
    failures.push(`${label}: pyramid layer order broken ${JSON.stringify(pos)}`)
  }
}

{
  layerOrder(read('docs/zh/tech/index.md'), 'zh/tech/index.md')
}

// Tech sidebar source: layer groups in mainline order (zh + en)
{
  const src = read('docs/.vitepress/sidebars/tech.mjs')
  layerOrder(src.split('export const zhTechSidebar')[1] || '', 'tech.mjs zhTechSidebar')
  layerOrder(src.split('export const enTechSidebar')[1] || '', 'tech.mjs enTechSidebar')
}

// Shipped sidebar links must resolve to a real markdown file
{
  const src = read('docs/.vitepress/sidebars/tech.mjs')
  const links = [...src.matchAll(/link:\s*'([^']+)'/g)].map((m) => m[1])
  const docsRoot = join(root, 'docs')
  for (const link of links) {
    const pathOnly = link.split('#')[0]
    if (!pathOnly.startsWith('/')) continue
    const rel = pathOnly.replace(/^\//, '').replace(/\/$/, '')
    const candidates = [
      join(docsRoot, `${rel}.md`),
      join(docsRoot, rel, 'index.md')
    ]
    if (!candidates.some((p) => existsSync(p))) {
      failures.push(`tech.mjs dead sidebar link: ${link}`)
    }
  }
}

if (failures.length) {
  console.error(`content-order-audit FAIL (${failures.length})`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}

console.log('content-order-audit PASS')
console.log('zh paths: 1 → 2 → 3 in landing + navOrder 10/20/30')
console.log('zh tech: pyramid layers 0-5 in order (index + sidebar)')
