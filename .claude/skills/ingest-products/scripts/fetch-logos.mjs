#!/usr/bin/env node
/**
 * fetch-logos.mjs — 抓厂商/产品图标，存进 docs/public/assets/logos/。
 *
 * 卡片左边的方块不该是首字母。首字母占位符让 251 张卡片看起来像同一套模板，
 * 而真实图标一眼就能认出是谁——读者扫视时省的是力气。
 *
 * 做法对齐 evals 仓的 scripts/vendor-logos.mjs：抓官网的 favicon /
 * apple-touch-icon，落盘到 public，构建时随站点发布。
 *
 * 用法：
 *   node .claude/skills/ingest-products/scripts/fetch-logos.mjs            # 抓缺失的
 *   node .claude/skills/ingest-products/scripts/fetch-logos.mjs --force    # 全部重抓
 *   node .claude/skills/ingest-products/scripts/fetch-logos.mjs --vendor openai,meta
 *
 * 产物：docs/public/assets/logos/<vendor_id>.<ext> + <vendor_id>.json（记录来源与抓取时间）
 *
 * 已知边界：多数站点对非浏览器 UA 返回 403。抓不到就跳过并如实记录，
 * **绝不能拿首字母或自造图形凑数**——那正是这套图标要消灭的东西。
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '../../../..')
const outDir = join(root, 'docs/public/assets/logos')
const vendorsPath = join(root, 'data/products/vendors.json')

const force = process.argv.includes('--force')
const onlyArg = process.argv.indexOf('--vendor')
const only = onlyArg >= 0 ? process.argv[onlyArg + 1].split(',').map((s) => s.trim()) : null

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'

/** 站点常见的图标尺寸，从大到小挑。 */
const PREFERRED = [
  '/apple-touch-icon.png',
  '/apple-touch-icon-precomposed.png',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/favicon.ico',
  '/favicon.png',
]

async function head(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: 'image/*,*/*' },
      signal: AbortSignal.timeout(15000),
    })
    return res
  } catch {
    return null
  }
}

async function fetchIcon(domain) {
  for (const path of PREFERRED) {
    const res = await head(`https://${domain}${path}`)
    if (!res || !res.ok) continue
    const type = res.headers.get('content-type') || ''
    if (!type.startsWith('image/')) continue
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 120) continue // 1x1 tracking pixel or an error page
    const ext = type.includes('svg')
      ? 'svg'
      : type.includes('ico')
        ? 'ico'
        : extname(path).replace('.', '') || 'png'
    return { buf, ext, from: `https://${domain}${path}` }
  }
  // Last resort: the search engine's favicon cache, at a legible size. It
  // still returns the site's own favicon — it is a fetch-time source, so the
  // site itself never depends on a third party at runtime.
  const res = await head(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
  if (res && res.ok) {
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length > 300) {
      return { buf, ext: 'png', from: `favicon-cache:${domain}` }
    }
  }
  return null
}

const main = async () => {
  const { vendors } = JSON.parse(readFileSync(vendorsPath, 'utf8'))
  mkdirSync(outDir, { recursive: true })

  const have = new Set(
    existsSync(outDir)
      ? readdirSync(outDir)
          .filter((f) => /\.(png|jpg|jpeg|svg|ico|webp)$/.test(f))
          .map((f) => f.replace(/\.[^.]+$/, ''))
      : []
  )

  const targets = vendors.filter((v) => {
    if (only && !only.includes(v.id)) return false
    if (!v.official_domains?.length) return false
    return force || !have.has(v.id)
  })

  if (targets.length === 0) {
    console.log(`[logos] 无需抓取：${have.size} 个已存在，或没有可用的 official_domains`)
    return
  }

  let ok = 0
  const failed = []
  for (const v of targets) {
    let got = null
    for (const domain of v.official_domains) {
      got = await fetchIcon(domain)
      if (got) break
    }
    if (!got) {
      failed.push(`${v.id} (${v.official_domains.join(', ')})`)
      continue
    }
    const base = join(outDir, v.id)
    writeFileSync(base + '.' + got.ext, got.buf)
    writeFileSync(
      base + '.json',
      JSON.stringify(
        { vendor_id: v.id, file: `${v.id}.${got.ext}`, source: got.from, bytes: got.buf.length },
        null,
        2
      ) + '\n'
    )
    ok++
    process.stdout.write(`[logos] ${v.id} -> ${got.ext} (${got.buf.length}B)\n`)
  }

  console.log(`\n[logos] 成功 ${ok} / 失败 ${failed.length}`)
  if (failed.length) {
    console.log('[logos] 失败清单（不要用占位图填补，如实留给下游处理）：')
    for (const f of failed) console.log('   ' + f)
  }
}

main()
