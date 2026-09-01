#!/usr/bin/env node
/**
 * Phase 0 inventory for the tech pyramid restructure (Issue #116).
 *
 * Walks every shipped docs page and emits _phase0/inventory.json with facts
 * only (no dispositions — those live in _phase0/slug-map.json):
 *   - locale, path, frontmatter keys
 *   - first-level (##) headings, five-part contract coverage
 *   - rough zh/en twin detection by mirrored relative path
 *
 * Run: node scripts/pyramid-inventory.mjs
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))
const docsRoot = join(repoRoot, 'docs')
const outDir = join(repoRoot, '_phase0')
const skipDir = new Set(['.vitepress', 'node_modules', 'public', 'cache', 'dist'])

const FIVE_PART_ZH = ['概述', '使用', '原理', '开发', '资料库']
const FIVE_PART_EN = ['overview', 'usage', 'principles', 'development', 'resource']

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (name.startsWith('.') || (statSync(full).isDirectory() && skipDir.has(name))) continue
    if (statSync(full).isDirectory()) walk(full, out)
    else if (name.endsWith('.md')) out.push(full)
  }
  return out
}

function parseFrontmatter(text) {
  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) return {}
  const end = text.indexOf('\n---', 3)
  if (end < 0) return {}
  const block = text.slice(text.indexOf('\n') + 1, end)
  const fm = {}
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/)
    if (m) fm[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
  return fm
}

function h2Headings(text) {
  return [...text.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim())
}

const files = walk(docsRoot)
const pages = []
for (const full of files) {
  const rel = relative(docsRoot, full).split('\\').join('/')
  const text = readFileSync(full, 'utf8')
  const fm = parseFrontmatter(text)
  const h2 = h2Headings(text)
  const isZh = rel.startsWith('zh/')
  const relNoLocale = isZh ? rel.slice(3) : rel
  const twin = isZh ? (exists(join(docsRoot, relNoLocale)) ? relNoLocale : null)
    : (exists(join(docsRoot, 'zh/' + rel)) ? 'zh/' + rel : null)
  const fiveZh = FIVE_PART_ZH.filter((k) => h2.some((h) => h.includes(k)))
  const fiveEn = FIVE_PART_EN.filter((k) => h2.some((h) => h.toLowerCase().includes(k)))
  pages.push({
    path: rel,
    locale: isZh ? 'zh' : 'en',
    twin,
    title: fm.title || '',
    hasFrontmatter: Object.keys(fm).length > 0,
    fmKeys: Object.keys(fm),
    topicId: fm.topicId || '',
    listed: fm.listed !== false,
    h2Count: h2.length,
    fivePart: (isZh ? fiveZh : fiveEn).length,
    bytes: Buffer.byteLength(text)
  })
}

function exists(p) {
  try { return statSync(p).isFile() } catch { return false }
}

mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, 'inventory.json'), JSON.stringify({
  generatedAt: new Date().toISOString().slice(0, 10),
  total: pages.length,
  zh: pages.filter((p) => p.locale === 'zh').length,
  en: pages.filter((p) => p.locale === 'en').length,
  withTwin: pages.filter((p) => p.twin).length / 2,
  fivePartComplete: pages.filter((p) => p.fivePart >= 5).length,
  pages
}, null, 2))

console.log(`inventory: ${pages.length} pages (zh ${pages.filter((p) => p.locale === 'zh').length}, en ${pages.filter((p) => p.locale === 'en').length}), five-part complete: ${pages.filter((p) => p.fivePart >= 5).length}`)
