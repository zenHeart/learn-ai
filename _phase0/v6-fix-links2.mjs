#!/usr/bin/env node
/** v6 link fix pass 2: depth corrections after flattening + cross-group bare links. */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (n.endsWith('.md')) out.push(p)
  }
  return out
}

const RULES = {
  'tech/06-agent-systems': [
    ['](../../05-action/', '](../05-action/'],
    ['](../../08-production/', '](../08-production/'],
    ['](../../00-map/', '](../00-map/'],
    ['](../../03-context/', '](../03-context/'],
    ['](../../04-grounding/', '](../04-grounding/'],
    ['](../../02-inference-interface/', '](../02-inference-interface/'],
    ['](../../01-model-lifecycle/', '](../01-model-lifecycle/'],
    ['](../../07-interoperability/', '](../07-interoperability/'],
    ['](agent-runtime/)', '](agent-runtime)'],
    ['](../agent-runtime/design-patterns)', '](design-patterns)'],
    ['](../agent-runtime/state-memory)', '](state-memory)'],
    ['](../agent-runtime/recovery-hitl)', '](recovery-hitl)'],
    ['](../agent-runtime/computer-use)', '](computer-use)'],
    ['](../agent-runtime)', '](agent-runtime)'],
    ['](protocols/)', '](../07-interoperability/)'],
    ['](../protocols/)', '](../07-interoperability/)'],
    ['](../protocols/mcp)', '](../07-interoperability/mcp)'],
    ['](../protocols/a2a)', '](../07-interoperability/a2a)'],
    ['](../protocols)', '](../07-interoperability)'],
    ['](../tool-execution)', '](../05-action/tool-execution)'],
    ['](../workflow)', '](workflow)'],
    ['](../multi-agent)', '](multi-agent)'],
    ['](../skills)', '](skills)'],
    ['](../plugins)', '](plugins)']
  ],
  'tech/05-action': [
    ['](agent-runtime/)', '](../06-agent-systems/agent-runtime)'],
    ['](agent-runtime/recovery-hitl)', '](../06-agent-systems/recovery-hitl)'],
    ['](agent-runtime)', '](../06-agent-systems/agent-runtime)'],
    ['](protocols/)', '](../07-interoperability/)'],
    ['](protocols/mcp)', '](../07-interoperability/mcp)'],
    ['](protocols)', '](../07-interoperability)'],
    ['](workflow)', '](../06-agent-systems/workflow)'],
    ['](multi-agent)', '](../06-agent-systems/multi-agent)'],
    ['](skills)', '](../06-agent-systems/skills)'],
    ['](agent-runtime/index)', '](../06-agent-systems/agent-runtime)']
  ],
  'tech/03-context': [
    ['](../03-context/', '](']
  ],
  'tech/00-map': [
    ['](model-lifecycle-bridge)', '](../01-model-lifecycle/)'],
    ['](../06-agent-systems/)', '](../06-agent-systems/agent-runtime)']
  ],
  'tech/02-inference-interface': [
    ['](session-state)', '](../03-context/session-memory)'],
    ['](session-state.md)', '](../03-context/session-memory)']
  ],
  'tech/07-interoperability': [
    ['](../../05-action/', '](../05-action/'],
    ['](../../08-production/', '](../08-production/'],
    ['](../../00-map/', '](../00-map/'],
    ['](../../03-context/', '](../03-context/'],
    ['](../../04-grounding/', '](../04-grounding/'],
    ['](../../02-inference-interface/', '](../02-inference-interface/'],
    ['](../../06-agent-systems/', '](../06-agent-systems/'],
    ['](../tool-execution)', '](../05-action/tool-execution)'],
    ['](../workflow)', '](../06-agent-systems/workflow)'],
    ['](../skills)', '](../06-agent-systems/skills)'],
    ['](../multi-agent)', '](../06-agent-systems/multi-agent)'],
    ['](../agent-runtime)', '](../06-agent-systems/agent-runtime)'],
    ['](../agent-runtime/)', '](../06-agent-systems/agent-runtime)']
  ],
  'tech/01-model-lifecycle/post-training': [
    ['](../cases/)', '](../../appendices/cases/)'],
    ['](../ai-coding/)', '](../../appendices/ai-coding/)'],
    ['](../index.md)', '](../index.md)']
  ]
}

let n = 0
for (const [groupDir, rules] of Object.entries(RULES)) {
  for (const loc of ['zh/', '']) {
    const dir = 'docs/' + loc + groupDir
    let files = []
    try { files = walk(dir) } catch { continue }
    for (const p of files) {
      let t = readFileSync(p, 'utf8')
      const before = t
      for (const [a, b] of rules) t = t.split(a).join(b)
      if (t !== before) { writeFileSync(p, t); n++ }
    }
  }
}
console.log(`pass2 fixed ${n} files`)
