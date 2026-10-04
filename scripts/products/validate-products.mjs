#!/usr/bin/env node
/**
 * validate-products.mjs — 产品账本的数据层门禁。
 *
 * 覆盖：schema、枚举、id 唯一、日期合法、官网为 https、本站手册路由真实存在、
 * 外键（category / vendor_id / use_cases / use-case 里的 product 引用）可解析。
 *
 * 与 build-hub.mjs --check 的分工：这里管「数据本身对不对」，那里管
 * 「投影是不是最新的」。两者都绿才允许发布。
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const dataDir = join(root, 'data/products')
const productsDir = join(dataDir, 'products')
const useCasesDir = join(dataDir, 'use-cases')
const docsRoot = join(root, 'docs')

const FORMS = new Set(['cli', 'ide', 'web', 'desktop', 'api', 'self-hosted'])
const HANDBOOK_STATUS = new Set(['none', 'candidate', 'written'])
const PRODUCT_STATUS = new Set(['active', 'renamed', 'merged', 'discontinued'])
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

const failures = []
const fail = (msg) => failures.push(msg)

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

/** 本站路由 → 磁盘文件。目录页是 index.md，单文件页是 xxx.html。 */
function routeToFile(route) {
  const clean = route.split('#')[0].replace(/^\//, '')
  if (clean.endsWith('.html')) return join(docsRoot, clean.slice(0, -5) + '.md')
  return join(docsRoot, clean.replace(/\/$/, ''), 'index.md')
}

// ---- 本体与注册表 ----
const taxonomy = readJson(join(dataDir, 'taxonomy.json'))
const categoryIds = new Set()
for (const c of taxonomy.categories ?? []) {
  if (!c.id || !KEBAB.test(c.id)) fail(`taxonomy: 非法 category id: ${c.id}`)
  if (categoryIds.has(c.id)) fail(`taxonomy: 重复 category id: ${c.id}`)
  categoryIds.add(c.id)
  for (const f of ['name', 'name_zh', 'color', 'icon']) {
    if (!c[f]) fail(`taxonomy: ${c.id} 缺少字段 ${f}`)
  }
}

const vendors = readJson(join(dataDir, 'vendors.json'))
const vendorIds = new Set()
for (const v of vendors.vendors ?? []) {
  if (!v.id || !KEBAB.test(v.id)) fail(`vendors: 非法 vendor id: ${v.id}`)
  // A pure disambiguator ("x", "x-7") means the original name slugified to
  // nothing — that is a CJK name that needs a real id, not a numbered stub.
  if (/^x(-\d+)?$/.test(v.id)) {
    fail(`vendors: id "${v.id}"（${v.display_name}）是 slug 退化产物，请给一个有意义的 id`)
  }
  if (vendorIds.has(v.id)) fail(`vendors: 重复 vendor id: ${v.id}`)
  vendorIds.add(v.id)
  if (!v.display_name) fail(`vendors: ${v.id} 缺少 display_name`)
}

// ---- 产品档 ----
const productFiles = existsSync(productsDir)
  ? readdirSync(productsDir).filter((n) => n.endsWith('.json')).sort()
  : []
if (productFiles.length === 0) fail('账本为空：data/products/products/ 下没有产品档')

const productIds = new Set()
const seenNameVendor = new Set()
const today = new Date().toISOString().slice(0, 10)
let writtenHandbooks = 0

for (const file of productFiles) {
  const p = join(productsDir, file)
  let r
  try {
    r = readJson(p)
  } catch (e) {
    fail(`${file}: JSON 解析失败 — ${e.message}`)
    continue
  }
  const where = `${file}`
  const expectId = file.replace(/\.json$/, '')

  if (r.id !== expectId) fail(`${where}: id(${r.id}) 与文件名(${expectId}) 不一致`)
  // A disambiguated stub ("product", "ai-3", "x-2") means the name slugified
  // to nothing or to something meaningless. Non-Latin product names need a
  // hand-written id that a human can read.
  if (r.id === 'product' || r.id.startsWith('product-') || /^[a-z]{1,2}-\d+$/.test(r.id)) {
    fail(`${where}: id "${r.id}"（${r.name}）是 slug 退化产物，请给一个有意义的 id`)
  }
  if (productIds.has(r.id)) fail(`${where}: 重复 id ${r.id}`)
  productIds.add(r.id)

  for (const f of ['name', 'name_zh', 'vendor_id', 'region', 'category', 'form', 'released', 'homepage', 'desc', 'desc_zh']) {
    if (typeof r[f] !== 'string' || !r[f].trim()) fail(`${where}: 缺少/为空字段 ${f}`)
  }

  if (r.region && !['intl', 'cn'].includes(r.region)) fail(`${where}: region 非法 "${r.region}"`)
  if (r.category && !categoryIds.has(r.category)) fail(`${where}: category "${r.category}" 不在 taxonomy 中`)
  if (r.vendor_id && !vendorIds.has(r.vendor_id)) fail(`${where}: vendor_id "${r.vendor_id}" 不在 vendors.json 中`)
  if (r.form && !FORMS.has(r.form)) fail(`${where}: form 非法 "${r.form}"`)
  if (r.status && !PRODUCT_STATUS.has(r.status)) fail(`${where}: status 非法 "${r.status}"`)

  if (r.released && !ISO_DATE.test(r.released)) fail(`${where}: released 不是 ISO 日期 "${r.released}"`)
  else if (r.released > today) fail(`${where}: released ${r.released} 晚于今天（${today}），疑似拿抓取日冒充发布日期`)

  if (r.homepage && !r.homepage.startsWith('https://')) fail(`${where}: homepage 必须是 https — "${r.homepage}"`)

  for (const t of r.tags ?? []) {
    if (!KEBAB.test(t)) fail(`${where}: tag 不是 kebab-case "${t}"`)
  }

  const dupKey = `${(r.name || '').toLowerCase()}|${(r.vendor_id || '').toLowerCase()}`
  if (seenNameVendor.has(dupKey)) fail(`${where}: 与既有档案同名同厂商（${dupKey}）——合并或改名，不要各写一份`)
  seenNameVendor.add(dupKey)

  const hb = r.handbook
  if (!hb) fail(`${where}: 缺少 handbook 字段`)
  else {
    if (!HANDBOOK_STATUS.has(hb.status)) fail(`${where}: handbook.status 非法 "${hb.status}"`)
    if (hb.status === 'written') {
      writtenHandbooks++
      if (!hb.route) fail(`${where}: handbook.status=written 但没有 route`)
      else {
        for (const [lang, route] of Object.entries(hb.route)) {
          const f = routeToFile(route)
          if (!existsSync(f)) fail(`${where}: handbook.${lang} 路由在仓库中不存在 — ${route} (期望 ${f})`)
        }
      }
    } else if (hb.route) {
      fail(`${where}: handbook.status=${hb.status} 不应带 route（写了 route 却被当成未完成）`)
    }
  }

  if (r.superseded_by && !productIds.has(r.superseded_by)) {
    // 指向本批尚未读到的档案是可能的，留到全部读完后统一再查一次。
  }
}

// ---- 场景选型 ----
const useCaseFiles = existsSync(useCasesDir)
  ? readdirSync(useCasesDir).filter((n) => n.endsWith('.json')).sort()
  : []
const useCaseIds = new Set()
for (const file of useCaseFiles) {
  const p = join(useCasesDir, file)
  let r
  try {
    r = readJson(p)
  } catch (e) {
    fail(`use-cases/${file}: JSON 解析失败 — ${e.message}`)
    continue
  }
  if (r.id !== file.replace(/\.json$/, '')) fail(`use-cases/${file}: id 与文件名不一致`)
  useCaseIds.add(r.id)
  if (!r.title) fail(`use-cases/${file}: 缺少 title`)
  if (!r.description) fail(`use-cases/${file}: 缺少 description`)
  if (!Array.isArray(r.dimensions) || r.dimensions.length === 0) {
    fail(`use-cases/${file}: dimensions 为空——场景必须有可浏览的维度`)
  } else {
    const seenDim = new Set()
    for (const d of r.dimensions) {
      if (!d.id || !d.label) fail(`use-cases/${file}: dimension 缺少 id/label`)
      if (seenDim.has(d.id)) fail(`use-cases/${file}: dimension id 重复 "${d.id}"`)
      seenDim.add(d.id)
      if (typeof d.weight !== 'number' || d.weight < 1 || d.weight > 3) {
        fail(`use-cases/${file}: dimension ${d.id} weight 必须是 1-3 的整数`)
      }
      if (!Array.isArray(d.keywords) || d.keywords.length === 0) {
        fail(`use-cases/${file}: dimension ${d.id} 缺少 keywords`)
      } else {
        for (const k of d.keywords) {
          if (typeof k !== 'string' || !k.trim()) {
            fail(`use-cases/${file}: dimension ${d.id} 存在空 keyword`)
          }
        }
      }
    }
  }
}

// 产品的 use_cases 外键（场景文件读完后统一校验）
const useCaseUsage = new Map()
for (const file of productFiles) {
  try {
    const r = readJson(join(productsDir, file))
    const ucs = r.use_cases ?? []
    // A product with no scenario is invisible in the selection view, which is
    // one of the three ways this page can be read. Catch it here.
    if (ucs.length === 0) {
      fail(`${file}: 没有声明任何 use_cases —— 该产品在「按需求选型」里不会出现`)
    } else if (ucs.length > 3) {
      fail(`${file}: use_cases 有 ${ucs.length} 个，超过 3 个会让选型失去意义`)
    }
    for (const uc of ucs) {
      if (!useCaseIds.has(uc)) {
        fail(`${file}: use_cases 引用了不存在的场景 "${uc}"`)
      } else {
        useCaseUsage.set(uc, (useCaseUsage.get(uc) || 0) + 1)
      }
    }
  } catch {
    /* 上面已报过 */
  }
}

// 一个没有任何产品的场景就是一张空页面——宁可没有，也不要挂出来。
for (const file of useCaseFiles) {
  const id = file.replace(/\.json$/, '')
  const used = useCaseUsage.get(id) || 0
  if (used === 0) {
    fail(`use-cases/${file}: 没有任何产品声明了这个场景（选型页会是空的）`)
  } else if (used < 3) {
    fail(`use-cases/${file}: 只有 ${used} 个产品挂在这个场景下，选型价值太低`)
  }
}

// ---- superseded_by 外键 ----
for (const file of productFiles) {
  try {
    const r = readJson(join(productsDir, file))
    if (r.superseded_by && !productIds.has(r.superseded_by)) {
      fail(`${file}: superseded_by 指向不存在的产品档 "${r.superseded_by}"`)
    }
  } catch {
    /* 已报过 */
  }
}

if (failures.length) {
  console.error(`validate-products FAIL (${failures.length})`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}

console.log('validate-products PASS')
console.log(
  `  ${productFiles.length} products · ${vendors.vendors.length} vendors · ` +
    `${taxonomy.categories.length} categories · ${useCaseFiles.length} use-cases · ` +
    `${writtenHandbooks} handbooks linked`
)
