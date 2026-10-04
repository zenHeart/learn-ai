#!/usr/bin/env node
/**
 * build-hub.mjs — 产品账本 → 站点消费的投影。
 *
 * 输入（SSOT，人工维护）:
 *   data/products/taxonomy.json
 *   data/products/vendors.json
 *   data/products/use-cases/*.json
 *   data/products/products/*.json
 * 输出（生成物，禁止手改）:
 *   docs/.vitepress/theme/data/product-hub.js
 *
 * 用法:
 *   node scripts/products/build-hub.mjs           # 写入投影
 *   node scripts/products/build-hub.mjs --check   # 只比对，投影陈旧则退出码 1
 *
 * 输出必须逐字节确定，否则 --check 会在无意义的改动上报红。
 * 排序全部显式指定，不依赖 readdir 顺序。
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const dataDir = join(root, 'data/products')
const outPath = join(root, 'docs/.vitepress/theme/data/product-hub.js')
const checkOnly = process.argv.includes('--check')

/** Locale-independent string ordering (UTF-16 code units). */
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const listJson = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).filter((n) => n.endsWith('.json')).sort()
    : []

const taxonomy = readJson(join(dataDir, 'taxonomy.json'))
const vendors = readJson(join(dataDir, 'vendors.json'))
const vendorById = new Map(vendors.vendors.map((v) => [v.id, v]))

const products = listJson(join(dataDir, 'products')).map((f) =>
  readJson(join(dataDir, 'products', f))
)

const useCases = listJson(join(dataDir, 'use-cases')).map((f) =>
  readJson(join(dataDir, 'use-cases', f))
)

// Categories carry their live count so the UI never has to recompute it.
const categories = taxonomy.categories
  .map((c) => ({
    id: c.id,
    name: c.name,
    nameZh: c.name_zh,
    color: c.color,
    icon: c.icon,
    count: products.filter((p) => p.category === c.id).length,
  }))
  .sort((a, b) => b.count - a.count || cmp(a.id, b.id))

const byId = new Map(products.map((p) => [p.id, p]))

const projectProducts = products
  .map((p) => {
    const v = vendorById.get(p.vendor_id)
    return {
      id: p.id,
      name: p.name,
      nameZh: p.name_zh,
      vendor: v?.display_name ?? p.vendor_id,
      vendorZh: v?.display_name_zh ?? p.vendor_id,
      region: p.region,
      category: p.category,
      useCases: p.use_cases ?? [],
      form: p.form,
      surface: p.surface ?? 'standalone',
      solves: p.solves ?? '',
      solvesZh: p.solves_zh ?? '',
      bestFor: p.best_for ?? '',
      bestForZh: p.best_for_zh ?? '',
      released: p.released,
      datePrecision: p.date_precision ?? 'day',
      homepage: p.homepage,
      desc: p.desc,
      descZh: p.desc_zh,
      tags: p.tags ?? [],
      status: p.status ?? 'active',
      supersededBy: p.superseded_by ?? null,
      successorName:
        (p.superseded_by && byId.get(p.superseded_by)?.name_zh) ||
        (p.superseded_by && byId.get(p.superseded_by)?.name) ||
        '',
      handbook: p.handbook ?? { status: 'none' },
      lastVerifiedAt: p.last_verified_at ?? null,
      glyph: (() => {
        const c = (p.name || '').trim()[0] ?? '◆'
        return c.toUpperCase()
      })(),
    }
  })
  // NB: plain code-unit comparison, never localeCompare. ICU locale data
  // differs between platforms, so localeCompare sorts CJK names differently on
  // Windows and Linux — which would make this projection non-reproducible and
  // fail the --check gate on CI while passing locally.
  .sort((a, b) =>
    a.released === b.released
      ? cmp(a.name, b.name)
      : a.released < b.released
        ? 1
        : -1
  )

// Use-case membership is derived from the product ledger, never duplicated in
// the use-case file. Products are the side agents own during parallel
// ingestion, so making them the single source keeps ingestion conflict-free.
// A dimension narrows within the use-case by matching its keywords against a
// product's tags and description.
const matchDimension = (product, dim) => {
  const hay = [product.name, product.name_zh, product.desc, product.desc_zh, ...(product.tags ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return (dim.keywords ?? []).some((k) => hay.includes(String(k).toLowerCase()))
}

const projectUseCases = useCases
  .map((u) => {
    const members = products
      .filter((p) => (p.use_cases ?? []).includes(u.id))
      .map((p) => p.id)
      .sort()
    const dimensions = u.dimensions
      .slice()
      .sort((a, b) => b.weight - a.weight || cmp(a.id, b.id))
      .map((d) => {
        const productIds = members.filter((id) => {
          const p = byId.get(id)
          return p ? matchDimension(p, d) : false
        })
        return {
          id: d.id,
          label: d.label,
          labelZh: d.label_zh ?? d.label,
          weight: d.weight,
          productIds,
          productCount: productIds.length,
        }
      })
      // A dimension that matches nothing is noise in the UI.
      .filter((d) => d.productCount > 0)

    return {
      id: u.id,
      title: u.title,
      titleZh: u.title_zh,
      description: u.description,
      descriptionZh: u.description_zh,
      products: members,
      productCount: members.length,
      dimensions,
    }
  })
  .sort((a, b) => b.productCount - a.productCount || cmp(a.id, b.id))

const j = (v) => JSON.stringify(v, null, 2)

const body = `/**
 * GENERATED FILE — 由 scripts/products/build-hub.mjs 从 data/products/ 账本生成。
 * 禁止手改：改账本后重新运行该脚本，否则 \`docs:build\` 的 --check 闸门会失败。
 *
 * 账本是唯一事实来源：
 *   data/products/products/*.json   一品一档
 *   data/products/taxonomy.json     类别本体
 *   data/products/vendors.json      厂商注册表
 *   data/products/use-cases/*.json  场景选型
 *
 * products ${projectProducts.length} 条 · categories ${categories.length} 个 · use-cases ${projectUseCases.length} 个
 *
 * 本文件不含生成时间戳：否则每次运行都会产生差异，--check 闸门将永远报红。
 * 什么时候改的由 git 记录。
 */

export const productHub = {
  categories: ${j(categories)},
  useCases: ${j(projectUseCases)},
  products: ${j(projectProducts)}
}

export default productHub
`

if (checkOnly) {
  if (!existsSync(outPath)) {
    console.error('build-hub --check FAIL：投影文件不存在，请运行 node scripts/products/build-hub.mjs')
    process.exit(1)
  }
  // Compare with line endings normalised: a Windows checkout with
  // core.autocrlf=true rewrites the working copy to CRLF, and a byte
  // comparison would then fail on a perfectly fresh projection.
  const norm = (t) => t.replace(/\r\n/g, '\n')
  const current = norm(readFileSync(outPath, 'utf8'))
  if (current !== body) {
    console.error('build-hub --check FAIL：投影与账本不一致（投影已陈旧）。')
    console.error('  账本 →', `data/products/ (${projectProducts.length} products)`)
    console.error('  修复 →', 'node scripts/products/build-hub.mjs')
    process.exit(1)
  }
  console.log(
    `build-hub --check PASS：投影最新（${projectProducts.length} products · ${projectUseCases.length} use-cases）`
  )
} else {
  writeFileSync(outPath, body, 'utf8')
  console.log(
    `build-hub：已写入 ${projectProducts.length} products · ${categories.length} categories · ${projectUseCases.length} use-cases`
  )
}
