#!/usr/bin/env node
/**
 * Relative-link resolver for the pyramid tree (Issue #116 Phase 4/5 gate).
 * VitePress runs with ignoreDeadLinks:true, so nothing else catches these.
 * Resolves every relative .md-ish link inside the NEW tree and fails on
 * targets that do not exist on disk.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, normalize, sep } from 'node:path'

const roots = ['docs/zh/tech', 'docs/tech', 'docs/zh/resources.md', 'docs/resources.md']
const skipDirs = new Set(['node_modules', '.vitepress'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) { if (!skipDirs.has(name)) walk(full, out) }
    else if (name.endsWith('.md')) out.push(full)
  }
  return out
}

const files = []
for (const r of roots) {
  if (!existsSync(r)) continue
  if (statSync(r).isFile()) files.push(r)
  else walk(r, files)
}

function targetExists(from, href) {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean || /^https?:|^mailto:|^\//.test(clean)) return true
  const base = clean.endsWith('/') ? clean + 'index.md' : clean
  const abs = normalize(join(dirname(from), base)).split(sep).join('/')
  const asMd = abs.endsWith('.md') ? abs : abs + '.md'
  if (existsSync(asMd)) return true
  return existsSync(abs.replace(/\.md$/, '/index.md').replace(/\/index\.md$/, '/index.md')) &&
    existsSync(abs.replace(/\.md$/, '/index.md'))
}

const bad = []
for (const f of files) {
  const text = readFileSync(f, 'utf8')
  if (/^status:\s*redirect/m.test(text.slice(0, 400))) continue
  for (const m of text.matchAll(/\]\(([^)]+)\)/g)) {
    const href = m[1].trim()
    // Only treat as page links: URLs, anchored paths, or pure slugs. Code
    // fragments that happen to match ](...) — regex literals, computed
    // members like exec[call.name](call.input) — are skipped.
    const isLinkLike = /^[a-z0-9._/-]+$/i.test(href) && !/\./.test(href.replace(/\.md$/,'').split('/').pop() || '')
      ? true // pure slug or path of slugs
      : href.includes('/') || href.endsWith('.md')
    if (!isLinkLike) continue
    if (!targetExists(f, href)) bad.push(`${f.replace(/\\\\/g, '/')}: ${href}`)
  }
}
if (bad.length) {
  console.log(`link-resolve FAIL (${bad.length})`)
  for (const b of [...new Set(bad)]) console.log('  ' + b)
  process.exit(1)
}
console.log(`link-resolve PASS (${files.length} new-tree files checked)`)
