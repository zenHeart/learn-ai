#!/usr/bin/env node
/** Review-fix batch C: collapse double-hop redirect chains.
 *  1. every stub's meta-refresh/canonical/body link -> final (non-stub) target
 *  2. every in-tree md link whose resolved target is a stub -> final absolute target
 *  3. redirects.json values -> final targets
 *  Skips fenced code blocks when rewriting links. */
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, normalize, sep } from 'node:path'

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (n.endsWith('.md')) out.push(p)
  }
  return out
}

const isStub = {}
const refreshTarget = {}
for (const p of [...walk('docs/zh'), ...walk('docs')]) {
  const t = readFileSync(p, 'utf8')
  const head = t.slice(0, 500)
  const m = head.match(/status:\s*redirect/)
  if (!m) continue
  isStub[p.split(sep).join('/')] = true
  const r = head.match(/0; url=([^\n']+)/)
  if (r) refreshTarget[p.split(sep).join('/')] = r[1].trim()
}

function finalTarget(sitePath, depth = 0) {
  if (depth > 5) return sitePath
  // sitePath like /zh/tech/03-grounding/rag or /tech/...
  const rel = sitePath.replace(/^\//, '')
  const candidates = [
    join('docs', rel + '.md'),
    join('docs', rel, 'index.md')
  ].map((p) => p.split(sep).join('/'))
  const hit = candidates.find((c) => existsSync(c))
  if (!hit) return sitePath
  if (isStub[hit] && refreshTarget[hit]) return finalTarget(refreshTarget[hit], depth + 1)
  return sitePath
}

// pass 1: rewrite each stub to point at its final target
let stubsFixed = 0
for (const p of Object.keys(isStub)) {
  const t = readFileSync(p, 'utf8')
  const head = t.slice(0, 500)
  const r = head.match(/0; url=([^\n']+)/)
  if (!r) continue
  const cur = r[1].trim()
  const fin = finalTarget(cur)
  if (fin === cur) continue
  let nt = t.replace(/(content: '0; url=)[^\n']+/, `$1${fin}`)
  nt = nt.replace(/(- href: )[^\n']+/, `$1${fin}`)
  nt = nt.replace(/\]\((\/[^\)]+)\)/, `](${fin})`)
  writeFileSync(p, nt)
  stubsFixed++
}

// pass 2: rewrite in-tree links whose target is a stub
function resolve(fromFile, href) {
  const clean = href.split('#')[0]
  if (!clean) return null
  let abs
  if (clean.startsWith('/')) {
    const rel = clean.replace(/^\//, '')
    const base = rel.endsWith('/') ? rel + 'index.md' : rel
    const c1 = join('docs', base.endsWith('.md') ? base : base + '.md')
    const c2 = join('docs', rel, 'index.md')
    abs = [c1, c2].map((x) => x.split(sep).join('/')).find((x) => existsSync(x))
  } else {
    const base = normalize(join(dirname(fromFile), clean.endsWith('/') ? clean + 'index.md' : clean)).split(sep).join('/')
    const asMd = base.endsWith('.md') ? base : base + '.md'
    abs = [asMd, join(base, 'index.md').split(sep).join('/')].find((x) => existsSync(x))
  }
  return abs || null
}

let filesChanged = 0, linksChanged = 0
for (const p of [...walk('docs/zh/tech'), ...walk('docs/tech'), ...walk('docs/zh/paths'), ...walk('docs/paths'), ...['docs/zh/index.md', 'docs/index.md', 'docs/zh/resources.md', 'docs/resources.md']]) {
  if (!existsSync(p) || isStub[p]) continue
  let t = readFileSync(p, 'utf8')
  const lines = t.split('\n')
  let inFence = false
  let changed = false
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) { inFence = !inFence; continue }
    if (inFence) continue
    lines[i] = lines[i].replace(/\]\(([^)\s]+)\)/g, (full, href) => {
      if (/^(https?:|mailto:|#)/.test(href)) return full
      const abs = resolve(p, href)
      if (!abs || !isStub[abs] || !refreshTarget[abs]) return full
      const fin = finalTarget(refreshTarget[abs])
      const anchor = href.includes('#') ? '#' + href.split('#').slice(1).join('#') : ''
      linksChanged++
      changed = true
      return `](${fin}${anchor})`
    })
  }
  if (changed) { writeFileSync(p, lines.join('\n')); filesChanged++ }
}

// pass 3: redirects.json values -> final
const rj = 'docs/public/redirects.json'
const rmap = JSON.parse(readFileSync(rj, 'utf8'))
let rFixed = 0
for (const [k, v] of Object.entries(rmap)) {
  const rel = v.replace(/^\//, '')
  const base = rel.endsWith('/') ? rel + 'index.md' : rel
  const c1 = join('docs', base.endsWith('.md') ? base : base + '.md').split(sep).join('/')
  const c2 = join('docs', rel, 'index.md').split(sep).join('/')
  const hit = [c1, c2].find((x) => existsSync(x))
  if (hit && isStub[hit] && refreshTarget[hit]) { rmap[k] = finalTarget(refreshTarget[hit]); rFixed++ }
}
writeFileSync(rj, JSON.stringify(rmap, null, 2))

console.log(JSON.stringify({ stubsFixed, filesChanged, linksChanged, rFixed }, null, 2))
