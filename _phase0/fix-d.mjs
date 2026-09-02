#!/usr/bin/env node
/** Review-fix batch D: cross-locale link markers, position blocks for pages missing them. */
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

// 1. en 09 guide: fix dead vision-case link -> zh marker
{
  const p = 'docs/tech/09-advanced/index.md'
  let t = readFileSync(p, 'utf8')
  t = t.replace(
    /The appendix-side \[vision case\]\(\.\/multimodal-vision-case\) pairs with the multimodal card as real-world evidence\./,
    'A real-world vision case pairs with the multimodal card (zh-only: [/zh/tech/09-advanced/multimodal-vision-case](/zh/tech/09-advanced/multimodal-vision-case)).'
  )
  writeFileSync(p, t)
}

// 2. mark zh-only links in en pages with "(zh)"
let marked = 0
for (const p of walk('docs/tech')) {
  let t = readFileSync(p, 'utf8')
  const before = t
  t = t.replace(/\[([^\]]+)\]\((\/zh\/[^)]+)\)/g, (full, text, href) => {
    if (text.includes('(zh)')) return full
    marked++
    return `[${text} (zh)](${href})`
  })
  if (t !== before) writeFileSync(p, t)
}
console.log('zh-links marked:', marked)

// 3. position blocks for pages missing the header quote
const GROUP_ZH = {
  '01-model-lifecycle/post-training': '模型生命周期（桥接）',
  '09-advanced': '进阶（桥接）',
  '03-context': 'Context 组'
}
const BLOCK = {
  zh: {
    '01-model-lifecycle/post-training': '> **所在组**：模型生命周期（桥接） ｜ **上一组出口**：理解推理基础与接口契约 ｜ **本页出口**：知道何时该动权重而不是改 Prompt 或上检索',
    '09-advanced': '> **所在组**：进阶（桥接） ｜ **上一组出口**：能用发布门与版本化纪律长期运行 ｜ **本页出口**：知道该主题影响哪个工程决策、何时去 Learn LLM',
    '03-context': '> **所在组**：Context 组（本组导览） ｜ **上一组出口**：接口契约与推理形态 ｜ **本组出口**：能按预算组装单轮上下文并管理跨轮记忆'
  },
  en: {
    '01-model-lifecycle/post-training': '> **Group**: Model Lifecycle (bridge) | **Previous group exit**: inference fundamentals and interface contracts | **This page exit**: know when to change weights instead of prompts or retrieval',
    '09-advanced': '> **Group**: Advanced (bridge) | **Previous group exit**: run long-term with release gates and versioning | **This page exit**: know which engineering decision this topic affects, and when to go to Learn LLM',
    '03-context': '> **Group**: Context (group guide) | **Previous group exit**: interface contracts and serving shapes | **This group exit**: assemble a single-turn context within budget and manage cross-turn memory'
  }
}

let inserted = 0
for (const loc of ['zh', 'en']) {
  const root = loc === 'zh' ? 'docs/zh/tech' : 'docs/tech'
  for (const p of walk(root)) {
    const t = readFileSync(p, 'utf8')
    const head = t.slice(0, 600)
    if (/所在组|在哪一层|\*\*Group\*\*|Where you are/.test(head)) continue
    if (/^status:\s*redirect/m.test(head)) continue
    const rel = p.split('\\').join('/').replace(`docs/${loc === 'zh' ? 'zh/' : ''}tech/`, '')
    let key = null
    if (rel.startsWith('01-model-lifecycle/post-training')) key = '01-model-lifecycle/post-training'
    else if (rel.startsWith('09-advanced')) key = '09-advanced'
    else if (rel === '03-context/index.md') key = '03-context'
    if (!key) continue
    const block = BLOCK[loc][key]
    // insert after frontmatter closing --- and following blank line
    const fmEnd = t.indexOf('\n---', 3)
    const after = t.slice(fmEnd + 4)
    const nl = after.startsWith('\n') ? '' : '\n'
    writeFileSync(p, t.slice(0, fmEnd + 4) + nl + '\n' + block + '\n' + after.replace(/^\n/, ''))
    inserted++
  }
}
console.log('position blocks inserted:', inserted)
