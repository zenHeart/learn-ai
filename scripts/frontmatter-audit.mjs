#!/usr/bin/env node
/**
 * Reads shipped docs Markdown (not a reimplemented catalog) and checks
 * VitePress 1.6 title/description + custom domain/tags, and that product
 * pages no longer live under category folders.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = fileURLToPath(new URL('../docs', import.meta.url))
const skipDir = new Set(['.vitepress', 'node_modules', 'public', 'cache'])
const forbidden = [
  'products/ai-coding/',
  'products/tools/',
  'products/automation/',
  'zh/products/ai-coding/',
  'zh/products/tools/',
  'zh/products/automation/'
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const rel = relative(docsRoot, full).split('\\').join('/')
    const st = statSync(full)
    if (st.isDirectory()) {
      if (skipDir.has(name) || name.startsWith('.')) continue
      walk(full, out)
    } else if (name.endsWith('.md')) {
      out.push({ full, rel })
    }
  }
  return out
}

function parseFrontmatter(text) {
  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) return null
  const end = text.indexOf('\n---', 3)
  if (end < 0) return null
  return text.slice(text.indexOf('\n') + 1, end + 1)
}

function hasKey(block, key) {
  return new RegExp(`^${key}\\s*:`, 'm').test(block)
}

function scalar(block, key) {
  const m = block.match(new RegExp(`^${key}\\s*:\\s*(.*)$`, 'm'))
  if (!m) return ''
  return m[1].trim().replace(/^["']|["']$/g, '')
}

const pages = walk(docsRoot)
const failures = []
let ok = 0

for (const { full, rel } of pages) {
  if (forbidden.some((prefix) => rel.startsWith(prefix))) {
    failures.push(`${rel}: live page still under forbidden product category folder`)
    continue
  }
  const text = readFileSync(full, 'utf8')
  const block = parseFrontmatter(text)
  if (!block) {
    failures.push(`${rel}: missing YAML frontmatter`)
    continue
  }
  const title = scalar(block, 'title')
  const description = scalar(block, 'description')
  const domain = scalar(block, 'domain')
  if (!title) failures.push(`${rel}: empty official title`)
  if (!description) failures.push(`${rel}: empty official description`)
  if (!domain) failures.push(`${rel}: empty custom domain`)
  if (!hasKey(block, 'tags')) failures.push(`${rel}: missing custom tags`)
  if (title && description && domain && hasKey(block, 'tags')) ok += 1
}

if (failures.length) {
  console.error(`frontmatter-audit FAIL: ${failures.length} issues, ${ok} ok / ${pages.length} pages`)
  for (const line of failures) console.error('  ' + line)
  process.exit(1)
}

console.log(`frontmatter-audit PASS: ${ok} reader-facing pages`)
console.log('forbidden product category folders: none')
console.log(`scanned ${pages.length} markdown files under docs/`)
