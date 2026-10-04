#!/usr/bin/env node
/**
 * coverage-audit.mjs — 把「不要漏掉主流产品」变成可执行的检查。
 *
 * validate-products 管「已入库的数据对不对」；本脚本管「该有的有没有」。
 * 两件事都会漏数据，但漏法不同：前者会报错，后者只会安静地少一格。
 *
 * 用法：
 *   node scripts/products/coverage-audit.mjs          # 人读的报告
 *   node scripts/products/coverage-audit.mjs --strict # 低于最低条数则退出码 1（可挂 CI）
 *
 * 它只报告，不自动修。矩阵见
 * .claude/skills/ingest-products/references/discovery-channels.md
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const dataDir = join(root, 'data/products')
const strict = process.argv.includes('--strict')

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const products = readdirSync(join(dataDir, 'products'))
  .filter((n) => n.endsWith('.json'))
  .map((f) => readJson(join(dataDir, 'products', f)))
const vendors = readJson(join(dataDir, 'vendors.json')).vendors

// ---- 品类下限 ----
const CATEGORY_FLOOR = {
  'chat-assistant': 10,
  'coding-agent': 20,
  'agent-platform': 15,
  'model-platform': 8,
  'developer-sdk': 4,
  'enterprise-api': 8,
  search: 6,
  'multimodal-creation': 15,
  'local-runner': 5,
  'eval-observability': 5,
}

// ---- 厂商产品线覆盖矩阵：vendor_id -> 至少应有的产品数 ----
// 一家大厂只有一条产品记录，通常意味着它把整条线漏在账本外了。
const VENDOR_FLOOR = {
  openai: 3, anthropic: 4, google: 5, xai: 2, meta: 2, microsoft: 3,
  amazon: 2, 'mistral-ai': 2, cohere: 2, nvidia: 1,
  alibaba: 3, bytedance: 4, tencent: 3, 'tencent-cloud': 1, baidu: 2,
  moonshot: 2, zhipu: 2, minimax: 3, deepseek: 1,
  huawei: 1, xiaomi: 1, iflytek: 1, sensetime: 1, kunlun: 1,
  '360': 1, stepfun: 1, '01ai': 1, openbmb: 1, metaso: 1,
}

const byCategory = new Map()
const byVendor = new Map()
for (const p of products) {
  byCategory.set(p.category, (byCategory.get(p.category) || 0) + 1)
  byVendor.set(p.vendor_id, (byVendor.get(p.vendor_id) || 0) + 1)
}

const gaps = []

// ---- 品类缺口 ----
console.log('## 品类覆盖')
for (const [cat, floor] of Object.entries(CATEGORY_FLOOR)) {
  const n = byCategory.get(cat) || 0
  const ok = n >= floor
  if (!ok) gaps.push(`品类 ${cat}: ${n} 条，低于下限 ${floor}`)
  console.log(`  ${ok ? 'OK  ' : 'LOW '} ${cat.padEnd(20)} ${String(n).padStart(4)} / 下限 ${floor}`)
}

// ---- 厂商产品线缺口 ----
console.log('\n## 大厂产品线覆盖')
for (const [vid, floor] of Object.entries(VENDOR_FLOOR)) {
  const n = byVendor.get(vid) || 0
  const vendor = vendors.find((v) => v.id === vid)
  const label = vendor ? vendor.display_name : vid
  const ok = n >= floor
  if (!ok) gaps.push(`厂商 ${label}(${vid}): ${n} 条产品，低于下限 ${floor}——多半整条产品线没进账本`)
  console.log(`  ${ok ? 'OK  ' : 'LOW '} ${label.padEnd(14)} ${String(n).padStart(3)} / 下限 ${floor}`)
}

// ---- 僵尸厂商：在册但一条产品都没有 ----
const zombies = vendors.filter((v) => v.active !== false && !byVendor.has(v.id))
if (zombies.length) {
  console.log(`\n## 在册但零产品的厂商 (${zombies.length})`)
  for (const v of zombies) console.log(`  ${v.display_name} (${v.id})`)
  gaps.push(`${zombies.length} 个在册厂商没有任何产品记录`)
}

// ---- 场景缺口 ----
const useCases = readdirSync(join(dataDir, 'use-cases'))
  .filter((n) => n.endsWith('.json'))
  .map((f) => readJson(join(dataDir, 'use-cases', f)))
const byUseCase = new Map()
for (const p of products) {
  for (const uc of p.use_cases ?? []) {
    byUseCase.set(uc, (byUseCase.get(uc) || 0) + 1)
  }
}
console.log('\n## 场景覆盖')
for (const uc of useCases) {
  const n = byUseCase.get(uc.id) || 0
  const ok = n >= 3
  if (!ok) gaps.push(`场景 ${uc.id}: ${n} 个产品，选型页价值不足`)
  console.log(`  ${ok ? 'OK  ' : 'LOW '} ${uc.id.padEnd(20)} ${String(n).padStart(4)}`)
}

console.log(`\n合计 ${products.length} 产品 / ${vendors.length} 厂商`)

if (gaps.length) {
  console.log(`\ncoverage-audit 发现 ${gaps.length} 处缺口：`)
  for (const g of gaps) console.log(`  - ${g}`)
  if (strict) process.exit(1)
} else {
  console.log('\ncoverage-audit PASS：品类、大厂产品线与场景均达到下限')
}
