#!/usr/bin/env node
/** Review-fix batch B: v5 layer coordinate system -> v6 group names. */
import { readFileSync, writeFileSync } from 'node:fs'

const counts = {}
function rep(files, pairs, key) {
  let n = 0
  for (const p of files) {
    let t = readFileSync(p, 'utf8')
    const before = t
    for (const [a, b] of pairs) t = t.split(a).join(b)
    if (t !== before) { writeFileSync(p, t); n++ }
  }
  counts[key] = n
}

const zhLadder = 'docs/zh/tech/00-map/complexity-ladder.md'
const enLadder = 'docs/tech/00-map/complexity-ladder.md'

rep([zhLadder], [
  ['> **在哪一层**：层 0 · 方向与边界', '> **所在组**：Map · 总览'],
  ['准备进入层 1 的先读', '准备进入 Context 组的先读'],
  ['层 4 与层 5 的各章会反复回到这张清单', '行动、Agent 系统与生产各组的章节会反复回到这张清单'],
  ['结构化输出（层 1）、模型 API（层 2）、RAG（层 3）、工具执行与协议（层 4）', '结构化输出与模型 API（推理与接口组）、RAG（知识接地组）、工具执行（行动组）、协议（互操作组）'],
  ['进 [层 1 · 交互契约](../03-context/)', '进 [Context 组](../03-context/)'],
  ['进 [层 4](../06-agent-systems/agent-runtime.md) 与 [层 5](../08-production/)', '进 [Agent 系统组](../06-agent-systems/agent-runtime.md) 与 [Production 组](../08-production/)'],
  ['本仓[层 3](../04-grounding/)', '本仓[知识接地组](../04-grounding/)'],
  ['在层 4 协议地图落地', '在互操作组协议地图落地'],
  ['本仓层 1–5 对应章节', '本仓各组对应章节']
], 'zh-ladder')

rep([enLadder], [
  ['to enter layer 1 now', 'to enter the Context group now'],
  ['structured output (layer 1), model API (layer 2), RAG (layer 3), tool execution and protocols (layer 4)', 'structured output and model API (Inference & Interface), RAG (Grounding), tool execution (Action), protocols (Interoperability)'],
  ['enter [Layer 1 · Interaction Contract](../03-context/)', 'enter the [Context group](../03-context/)'],
  ['enter [Layer 4](../06-agent-systems/agent-runtime.md) and [Layer 5](../08-production/)', 'enter the [Agent Systems group](../06-agent-systems/agent-runtime.md) and the [Production group](../08-production/)'],
  ["This repo's [Layer 3](../04-grounding/)", "This repo's [Grounding group](../04-grounding/)"],
  ["this repo's layer 1–5 chapters", "this repo's group chapters"]
], 'en-ladder')

// ladder header line en (check actual): replace generic Layer 0 header if present
rep([enLadder], [
  ['**Where you are**: Layer 0', '**Group**: Map'],
  ['**Layer**: 0', '**Group**: Map']
], 'en-ladder-header')

// cases index layer labels (zh; en twin checked generically below)
rep(['docs/zh/tech/appendices/cases/index.md'], [
  ['层 1 · 层 4', 'Context 组 · Agent 系统组'],
  ['层 4 · 层 5', 'Agent 系统组 · Production 组'],
  ['层 3', '知识接地组'],
  ['层 4', 'Agent 系统组'],
  ['层 5', 'Production 组'],
  ['按你所在的层过滤', '按你所在的组过滤']
], 'zh-cases')

rep(['docs/tech/appendices/cases/index.md'], [
  ['Layer 1 · Layer 4', 'Context · Agent Systems'],
  ['Layer 4 · Layer 5', 'Agent Systems · Production'],
  ['Layer 3', 'Grounding'],
  ['Layer 4', 'Agent Systems'],
  ['Layer 5', 'Production'],
  ['filter by your layer', 'filter by your group']
], 'en-cases')

// appendices guide: v6 narrative + real subregions (zh + en)
for (const [p, zh] of [['docs/zh/tech/appendices/index.md', true], ['docs/tech/appendices/index.md', false]]) {
  let t = readFileSync(p, 'utf8')
  // remove moved-to-mainline rows
  t = t.split('\n').filter((l) => !/model-lifecycle\/\)|\.\/model-lifecycle|多模态（桥接）|\[Multimodal \(bridge\)\]|multimodal\/\)/.test(l) || l.trim().startsWith('| 子区') || l.includes('| ---')).join('\n')
  // collapse duplicated table separator rows that survived filtering
  t = t.replace(/(\| --- \| --- \| --- \| --- \|\n)(\| --- \| --- \| --- \| --- \|\n)+/g, '$1')
  if (zh) {
    t = t.replace('主线从 [技术地图](../) 沿层 0→5 展开', '主线从 [技术地图](../) 沿 00-map → 09-advanced 十个知识组展开')
    t = t.replace('它们回答的是「还有什么可读」', '模型生命周期与多模态的桥接页已升入主线（01 / 09 组）；本区回答的是「还有什么可读」')
    t = t.replace('按症状驱动决策树找层', '按症状驱动决策树找组')
    t = t.replace('训练类桥接页、真实案例', '真实案例')
  } else {
    t = t.replace(/expand along layers? 0[–-]5|layer 0[–-]5 mainline/i, 'mainline runs from the tech map through groups 00-map – 09-advanced')
    t = t.replace(/find (?:the )?layer,/, 'find the group,')
  }
  writeFileSync(p, t)
}
counts['appendices-guide'] = 2

// tech-map: point group table links for 05/06/09 at group roots (guides being added)
rep(['docs/zh/tech/index.md', 'docs/tech/index.md'], [
  ['](05-action/tool-calling)', '](05-action/)'],
  ['](06-agent-systems/agent-runtime)', '](06-agent-systems/)'],
  ['](09-advanced/interpretability)', '](09-advanced/)']
], 'techmap-group-links')

console.log(JSON.stringify(counts, null, 2))
