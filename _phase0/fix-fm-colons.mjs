#!/usr/bin/env node
/** Quote frontmatter title/description values that contain a bare ": " (YAML mapping break). */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const docsRoot = 'docs'
const skip = new Set(['.vitepress', 'node_modules', 'public', 'dist', 'cache'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (name.startsWith('.') || (statSync(full).isDirectory() && skip.has(name))) continue
    if (statSync(full).isDirectory()) walk(full, out)
    else if (name.endsWith('.md')) out.push(full)
  }
  return out
}

const fixed = []
for (const p of walk(docsRoot)) {
  const t = readFileSync(p, 'utf8')
  if (!t.startsWith('---\n')) continue
  const end = t.indexOf('\n---', 3)
  if (end < 0) continue
  const block = t.slice(0, end)
  const lines = block.split('\n')
  let changed = false
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(title|description):\s?(.*)$/)
    if (!m) continue
    let val = m[2]
    if (val.startsWith('"') || val.startsWith("'")) continue
    // bare colon followed by space (or CJK fullwidth colon is safe; ASCII colon breaks YAML)
    if (/:\s/.test(val) || /:\s*$/.test(val) || val.endsWith(':')) {
      lines[i] = `${m[1]}: "${val.replace(/"/g, "'")}"`
      changed = true
    }
  }
  if (changed) {
    writeFileSync(p, lines.join('\n') + t.slice(end))
    fixed.push(p)
  }
}
console.log(`quoted values in ${fixed.length} files`)
for (const p of fixed) console.log('  ' + p)
