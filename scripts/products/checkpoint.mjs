#!/usr/bin/env node
/**
 * checkpoint.mjs — ingest-products 技能的增量窗口状态工具。
 *
 * 「上次扫到哪」的唯一事实来源是账本本身（data/products/products/ 下最大的
 * released），检查点文件只补一件账本推不出来的事：上次扫描发生在何时。
 *
 * 用法（在仓库根目录运行）:
 *   node scripts/products/checkpoint.mjs status
 *     → 打印本次应使用的增量窗口（JSON）
 *   node scripts/products/checkpoint.mjs commit --max-release-date YYYY-MM-DD
 *     → 本批入库与门禁全部通过后记录检查点
 *
 * 设计约束：
 *   - 零依赖、纯 Node 标准库（与 scripts/ 下其他审计脚本一致）。
 *   - 窗口起点恒定回退 OVERLAP_DAYS 天：官网补印日期、搜索索引滞后、
 *     厂商在窗口边界补发新产品——重叠保证不漏。
 *   - commit 拒绝大于账本现有最大 released 的日期：检查点必须能在账本中兑现，
 *     防止「拿今天冒充发布日期」或凭空推进锚点。
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const PRODUCTS_DIR = join(root, 'data/products/products')
const CHECKPOINT = join(root, 'data/products/generated/ingest-checkpoint.json')

const OVERLAP_DAYS = 14
const FIRST_RUN_FALLBACK_DAYS = 365
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const today = () => new Date().toISOString().slice(0, 10)

function daysAgo(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString().slice(0, 10)
}

/** 账本中全部 released（跳过坏文件，不阻断 status） */
function ledgerDates() {
  const out = []
  if (!existsSync(PRODUCTS_DIR)) return out
  for (const name of readdirSync(PRODUCTS_DIR)) {
    if (!name.endsWith('.json')) continue
    try {
      const r = JSON.parse(readFileSync(join(PRODUCTS_DIR, name), 'utf8'))
      if (typeof r.released === 'string' && ISO_DATE.test(r.released)) out.push(r.released)
    } catch {
      /* validate-products.mjs 负责报错 */
    }
  }
  return out
}

function ledgerCount() {
  return existsSync(PRODUCTS_DIR)
    ? readdirSync(PRODUCTS_DIR).filter((n) => n.endsWith('.json')).length
    : 0
}

function readCheckpoint() {
  if (!existsSync(CHECKPOINT)) return null
  try {
    return JSON.parse(readFileSync(CHECKPOINT, 'utf8'))
  } catch {
    return null
  }
}

function status() {
  const dates = ledgerDates().sort()
  const ledgerMax = dates.pop() ?? null
  const cp = readCheckpoint()
  const anchor =
    cp?.last_max_release_date && ISO_DATE.test(cp.last_max_release_date)
      ? cp.last_max_release_date
      : ledgerMax
  const firstRun = !anchor
  const windowSince = firstRun
    ? daysAgo(today(), FIRST_RUN_FALLBACK_DAYS)
    : daysAgo(anchor, OVERLAP_DAYS)
  console.log(
    JSON.stringify(
      {
        today: today(),
        last_scan_at: cp?.last_scan_at ?? null,
        ledger_max_released: ledgerMax,
        ledger_product_count: ledgerCount(),
        window_since: windowSince,
        window_until: today(),
        overlap_days: OVERLAP_DAYS,
        first_run: firstRun,
        note: firstRun
          ? `账本与检查点均无日期锚点——首次运行按近 ${FIRST_RUN_FALLBACK_DAYS} 天窗口扫描`
          : `窗口 = 检查点锚点 ${anchor} 回退 ${OVERLAP_DAYS} 天重叠`,
      },
      null,
      2
    )
  )
}

function commit(args) {
  const flag = args.indexOf('--max-release-date')
  const value = flag >= 0 ? args[flag + 1] : null
  if (!value || !ISO_DATE.test(value)) {
    console.error('用法: checkpoint.mjs commit --max-release-date YYYY-MM-DD')
    console.error('--max-release-date = 本批入库中见到的最大发布日期（不是今天）。')
    process.exit(1)
  }
  const ledgerMax = ledgerDates().sort().pop() ?? null
  if (ledgerMax && value > ledgerMax) {
    console.error(`拒绝：传入日期 ${value} 大于账本现有最大 released ${ledgerMax}。`)
    console.error('检查点锚点必须能在账本中兑现；请传本批实际入库的最大发布日期。')
    process.exit(1)
  }
  const prev = readCheckpoint() ?? {}
  const anchor = [value, prev.last_max_release_date].filter(Boolean).sort().pop()
  writeFileSync(
    CHECKPOINT,
    JSON.stringify(
      {
        last_scan_at: today(),
        last_max_release_date: anchor,
        _comment:
          'ingest-products 技能的扫描检查点：last_max_release_date 是下次增量窗口的锚点（自动回退重叠天数）。由 checkpoint.mjs commit 维护，勿手改。',
      },
      null,
      2
    ) + '\n',
    'utf8'
  )
  console.log(`[checkpoint] 已记录：last_scan_at=${today()} last_max_release_date=${anchor}`)
}

const [, , cmd, ...args] = process.argv
if (cmd === 'status') status()
else if (cmd === 'commit') commit(args)
else {
  console.error('用法: checkpoint.mjs <status|commit --max-release-date YYYY-MM-DD>')
  process.exit(1)
}
