#!/usr/bin/env node
/** Review-fix batch A: mistranslations, fullwidth bars, homepage/resources links, mermaid, legend. */
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (n.endsWith('.md')) out.push(p)
  }
  return out
}
const all = [...walk('docs/tech'), ...walk('docs/zh')]
let counts = {}

function rep(files, from, to, key, limitToFirstBlock = false) {
  let n = 0
  for (const p of files) {
    let t = readFileSync(p, 'utf8')
    if (!t.includes(from)) continue
    t = t.split(from).join(to)
    writeFileSync(p, t)
    n++
  }
  counts[key] = (counts[key] || 0) + n
}

// 1. EN fullwidth vertical bars -> ASCII (en side only)
rep(all.filter((p) => !p.includes('\\zh\\') && !p.includes('/zh/')), '｜', ' | ', 'fullwidth-bar')
// zh side untouched.

// 2. "this chapter" -> "this page" (en)
rep(all.filter((p) => !p.includes('/zh/')), 'this chapter', 'this page', 'this-chapter')
rep(all.filter((p) => !p.includes('/zh/')), 'This chapter', 'This page', 'this-chapter-2')

// 3. Milestone heading unify (en)
rep(all.filter((p) => !p.includes('/zh/')), 'History milestones', 'Historical milestones', 'milestones')
rep(all.filter((p) => !p.includes('/zh/')), 'Version milestones', 'Historical milestones', 'milestones-2')

// 4. watchlist residual hanzi
rep(['docs/tech/07-interoperability/watchlist.md'],
  'a路线 contest with', 'a competing-architecture contest with', 'watchlist-hanzi')

// 5. recovery-hitl "site" mistranslation
rep(['docs/tech/06-agent-systems/recovery-hitl.md'],
  "save and restore an agent's site with checkpoints",
  "save and restore the agent's execution state with checkpoints", 'hitl-site')

// 6. multi-agent description direction fix (en)
rep(['docs/tech/06-agent-systems/multi-agent.md'],
  'description: Multi-agent trades coordination for capacity that a single agent cannot reach — the price is coordination cost, error propagation, and roughly 15x token consumption. This page covers',
  'description: "Multi-agent buys capacity a single agent cannot reach via context isolation and parallelism — at the price of coordination overhead, error propagation, and roughly 15x token consumption. This page covers', 'multi-desc')
rep(['docs/tech/06-agent-systems/multi-agent.md'],
  'when you do not need multi-agent at all.\ntitle:',
  'when you do not need multi-agent at all."\ntitle:', 'multi-desc-close')

// 7. fall-back-left direct translation
rep(['docs/tech/06-agent-systems/agent-runtime.md'],
  'Reverse criterion (when to fall back left)',
  'Fallback trigger (when to drop back to the option on its left)', 'fallback-left')

// 8. kneaded into the rules
rep(['docs/tech/03-context/context-engineering.md'],
  'Kneaded into the rules', 'Blends into the rules', 'kneaded')

// 9. on the day
rep(['docs/tech/02-inference-interface/index.md'],
  'specific fields follow the official docs on the day',
  'specific fields defer to the official docs at the time of reading', 'on-the-day')

// 10. homepage links -> v6 canonical
rep(['docs/index.md', 'docs/zh/index.md'],
  '/tech/04-action/protocols/mcp', '/tech/07-interoperability/mcp', 'home-mcp')
rep(['docs/index.md', 'docs/zh/index.md'],
  '/zh/tech/04-action/protocols/mcp', '/zh/tech/07-interoperability/mcp', 'home-mcp-zh')
rep(['docs/index.md', 'docs/zh/index.md'],
  '/tech/02-integration/browser-edge', '/tech/02-inference-interface/browser-edge', 'home-edge')
rep(['docs/index.md', 'docs/zh/index.md'],
  '/zh/tech/02-integration/browser-edge', '/zh/tech/02-inference-interface/browser-edge', 'home-edge-zh')

// 11. resources.md stub-dir links -> canonical 00-map
rep(['docs/resources.md'],
  '/tech/00-orientation/complexity-ladder', '/tech/00-map/complexity-ladder', 'res-ladder')
rep(['docs/resources.md'],
  '/tech/00-orientation/site-boundaries', '/tech/00-map/site-boundaries', 'res-bound')
rep(['docs/zh/resources.md'],
  '/zh/tech/00-orientation/complexity-ladder', '/zh/tech/00-map/complexity-ladder', 'res-ladder-zh')
rep(['docs/zh/resources.md'],
  '/zh/tech/00-orientation/site-boundaries', '/zh/tech/00-map/site-boundaries', 'res-bound-zh')

// 12. sidebar session label converge to page title
rep(['docs/.vitepress/sidebars/tech.mjs'],
  "{ text: 'Session memory', link: '/tech/03-context/session-memory' }",
  "{ text: 'Session and State', link: '/tech/03-context/session-memory' }", 'sb-session')
rep(['docs/.vitepress/sidebars/tech.mjs'],
  "{ text: '会话记忆', link: '/zh/tech/03-context/session-memory' }",
  "{ text: '会话与状态', link: '/zh/tech/03-context/session-memory' }", 'sb-session-zh')

// 13. security mermaid redraw (zh + en): first mermaid block in file
function replaceFirstMermaid(p, newBody) {
  let t = readFileSync(p, 'utf8')
  const i = t.indexOf('```mermaid')
  if (i < 0) return false
  const end = t.indexOf('```', i + 10)
  t = t.slice(0, i) + '```mermaid\n' + newBody + '\n' + t.slice(end)
  writeFileSync(p, t)
  return true
}
replaceFirstMermaid('docs/zh/tech/08-production/security.md', `flowchart TB
    subgraph GOV["治理层：版本 · 审计 · 人工批准 · 租户隔离（包裹整条请求路径）"]
        U["用户 / 外部内容"] --> C1["输入过滤<br/>应用安全 · 防线 1"]
        C1 --> M["模型<br/>对齐倾向 → 桥接 Learn LLM"]
        M --> C2["工具执行边界<br/>allowlist · SSRF 防护 · 超时 · 防线 2"]
        C2 --> C3["输出扫描<br/>应用安全 · 防线 3"]
        C3 --> OUT["结果 / 副作用"]
    end`)
replaceFirstMermaid('docs/tech/08-production/security.md', `flowchart TB
    subgraph GOV["Governance: versioning · audit · human approval · tenant isolation (wraps the whole request path)"]
        U["User / external content"] --> C1["Input filtering<br/>app security · line 1"]
        C1 --> M["Model<br/>alignment tendencies → bridge to Learn LLM"]
        M --> C2["Tool execution boundary<br/>allowlist · SSRF guards · timeouts · line 2"]
        C2 --> C3["Output scanning<br/>app security · line 3"]
        C3 --> OUT["Outcome / side effects"]
    end`)
counts['security-mermaid'] = 2

// 14. evidence-level legend appended to site-boundaries (both locales)
const zhLegend = `
## 资料库证据层级（全树 legend）

各页资料库的「层级」列使用统一字母，定义如下（个别历史页的标注存在 ±1 漂移，以本表为准）：

| 层级 | 含义 | 典型来源 |
| --- | --- | --- |
| E | 本地实证 | 本仓可运行的 fixture 实测输出 |
| L0 | 官方规范 / 一手实现 | 协议规范、SDK 源码、CHANGELOG |
| L1 | 官方维护者叙述 | 官方文档、官方工程博客 |
| L2 | 权威二次加工 | 知名工程书、系统综述 |
| L4 | 背景线索 | 社区讨论、未署名文章（仅作线索） |
| sibling | 姊妹站 canonical | Learn LLM / evals / sites-epub |
`
const enLegend = `
## Resource evidence levels (tree-wide legend)

The "level" column in each page's resource library uses these letters (a few
historical pages drift by ±1; this table is authoritative):

| Level | Meaning | Typical source |
| --- | --- | --- |
| E | Local empirical evidence | measurable output of this repo's fixtures |
| L0 | Official spec / first-party implementation | protocol specs, SDK source, changelogs |
| L1 | Official maintainer narrative | official docs, official engineering blogs |
| L2 | Authoritative secondary | well-known engineering books, surveys |
| L4 | Background signal | community threads, unattributed posts (leads only) |
| sibling | Sibling-site canonical | Learn LLM / evals / sites-epub |
`
for (const [p, leg] of [['docs/zh/tech/00-map/site-boundaries.md', zhLegend], ['docs/tech/00-map/site-boundaries.md', enLegend]]) {
  let t = readFileSync(p, 'utf8')
  if (!t.includes('tree-wide legend') && !t.includes('全树 legend')) { t = t.trimEnd() + '\n' + leg; writeFileSync(p, t) }
}
counts['legend'] = 2

console.log(JSON.stringify(counts, null, 2))
