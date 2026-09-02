#!/usr/bin/env node
/** v6 link fix pass 3: multimodal depth + tech-map repoint leftovers. */
import { readFileSync, writeFileSync } from 'node:fs'

function sub(p, pairs) {
  let t = readFileSync(p, 'utf8')
  for (const [a, b] of pairs) t = t.split(a).join(b)
  writeFileSync(p, t)
}

for (const loc of ['zh/', '']) {
  sub('docs/' + loc + 'tech/09-advanced/multimodal.md', [
    ['](../../02-inference-interface/', '](../02-inference-interface/'],
    ['](../../08-production/', '](../08-production/'],
    ['](../../03-context/', '](../03-context/'],
    ['](../../04-grounding/', '](../04-grounding/'],
    ['](../../00-map/', '](../00-map/']
  ])
  const p = 'docs/' + loc + 'tech/index.md'
  sub(p, [
    ['](06-agent-systems/protocols)', '](07-interoperability)'],
    ['](06-agent-systems/protocols/', '](07-interoperability/'],
    ['](03-context/structured-output)', '](02-inference-interface/structured-output)'],
    ['](06-agent-systems/tool-execution)', '](05-action/tool-execution)'],
    ['](06-agent-systems/)', '](06-agent-systems/agent-runtime)']
  ])
}
console.log('pass3 done')
