#!/usr/bin/env node
/**
 * Asserts product gallery + sidebar links resolve, and #70–#85 slugs have ZH+EN maps.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(root, 'docs')
const failures = []

const REQUIRED_SLUGS = [
  'kimi',
  'kimi-code',
  'minimax-code',
  'minimax-agent',
  'zhipu-chat',
  'glm-coding',
  'yuanbao',
  'hunyuan',
  'codebuddy',
  'doubao',
  'trae',
  'coze',
  'volcengine-ark',
  'qwen',
  'lingma',
  'bailian'
]

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

function mdExists(urlPath) {
  const rel = urlPath.split('#')[0].replace(/^\//, '').replace(/\/$/, '')
  return [
    join(docsRoot, `${rel}.md`),
    join(docsRoot, rel, 'index.md')
  ].some((p) => existsSync(p))
}

function collectLinks(src) {
  const out = new Set()
  for (const m of src.matchAll(/['"`](\/(?:zh\/)?products\/[^'"`#?\s]+)['"`]/g)) {
    out.add(m[1].split('#')[0])
  }
  return [...out]
}

{
  const srcs = [
    'docs/.vitepress/theme/data/products-gallery.js',
    'docs/.vitepress/sidebars/ai-coding.mjs'
  ]
  for (const rel of srcs) {
    const links = collectLinks(read(rel))
    for (const link of links) {
      if (!mdExists(link)) failures.push(`${rel} dead product link: ${link}`)
    }
  }
}

for (const slug of REQUIRED_SLUGS) {
  for (const prefix of ['products', 'zh/products']) {
    const link = `/${prefix}/${slug}/`
    if (!mdExists(link)) failures.push(`missing map page: ${link}`)
  }
  const zhMap = join(docsRoot, 'zh/products', slug, 'index.md')
  if (existsSync(zhMap)) {
    const body = readFileSync(zhMap, 'utf8')
    if (!/https?:\/\//.test(body) || !/官方/.test(body)) {
      failures.push(`zh/products/${slug}/index.md: missing official family table (需要官方 URL + 本站去向)`)
    }
  }
}

if (failures.length) {
  console.error(`product-docs-audit FAIL (${failures.length})`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}

console.log('product-docs-audit PASS')
console.log(`checked ${REQUIRED_SLUGS.length} slugs + gallery/sidebar product links`)
