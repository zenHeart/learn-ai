#!/usr/bin/env node
/**
 * v6 link normalizer: for every moved page, re-resolve each relative link
 * against its OLD location, map the old target to its NEW location, and
 * re-relativize from the NEW location. Handles bare slugs, .md links, and
 * dir links. Targets that only Wave A will create are left untouched.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, normalize, posix } from 'node:path'

// old tech-relative -> new tech-relative (from v6-migrate MOVES + splits)
const MAP = {
  'tech/00-orientation/complexity-ladder.md': 'tech/00-map/complexity-ladder.md',
  'tech/00-orientation/site-boundaries.md': 'tech/00-map/site-boundaries.md',
  'tech/00-orientation/model-lifecycle-bridge.md': 'tech/01-model-lifecycle/index.md',
  'tech/01-contracts/index.md': 'tech/03-context/index.md',
  'tech/01-contracts/prompt.md': 'tech/03-context/prompt.md',
  'tech/01-contracts/context.md': 'tech/03-context/context-engineering.md',
  'tech/01-contracts/structured-output.md': 'tech/02-inference-interface/structured-output.md',
  'tech/01-contracts/tool-calling.md': 'tech/05-action/tool-calling.md',
  'tech/02-integration/index.md': 'tech/02-inference-interface/index.md',
  'tech/02-integration/model-api.md': 'tech/02-inference-interface/model-api.md',
  'tech/02-integration/streaming.md': 'tech/02-inference-interface/streaming.md',
  'tech/02-integration/session-state.md': 'tech/03-context/session-memory.md',
  'tech/02-integration/ui.md': 'tech/02-inference-interface/ui.md',
  'tech/02-integration/browser-edge.md': 'tech/02-inference-interface/browser-edge.md',
  'tech/03-grounding/index.md': 'tech/04-grounding/index.md',
  'tech/03-grounding/embeddings-retrieval.md': 'tech/04-grounding/embeddings-retrieval.md',
  'tech/03-grounding/rag.md': 'tech/04-grounding/rag.md',
  'tech/03-grounding/advanced-retrieval.md': 'tech/04-grounding/advanced-retrieval.md',
  'tech/04-action/index.md': 'tech/06-agent-systems/agent-runtime.md',
  'tech/04-action/tool-execution.md': 'tech/05-action/tool-execution.md',
  'tech/04-action/workflow.md': 'tech/06-agent-systems/workflow.md',
  'tech/04-action/skills.md': 'tech/06-agent-systems/skills.md',
  'tech/04-action/plugins.md': 'tech/06-agent-systems/plugins.md',
  'tech/04-action/multi-agent.md': 'tech/06-agent-systems/multi-agent.md',
  'tech/04-action/agent-runtime/index.md': 'tech/06-agent-systems/agent-runtime.md',
  'tech/04-action/agent-runtime/design-patterns.md': 'tech/06-agent-systems/design-patterns.md',
  'tech/04-action/agent-runtime/state-memory.md': 'tech/06-agent-systems/state-memory.md',
  'tech/04-action/agent-runtime/recovery-hitl.md': 'tech/06-agent-systems/recovery-hitl.md',
  'tech/04-action/agent-runtime/computer-use.md': 'tech/06-agent-systems/computer-use.md',
  'tech/04-action/protocols/index.md': 'tech/07-interoperability/index.md',
  'tech/04-action/protocols/mcp.md': 'tech/07-interoperability/mcp.md',
  'tech/04-action/protocols/ag-ui.md': 'tech/07-interoperability/ag-ui.md',
  'tech/04-action/protocols/a2ui-mcp-apps.md': 'tech/07-interoperability/a2ui-mcp-apps.md',
  'tech/04-action/protocols/acp-agent-client.md': 'tech/07-interoperability/acp-agent-client.md',
  'tech/04-action/protocols/a2a.md': 'tech/07-interoperability/a2a.md',
  'tech/04-action/protocols/watchlist.md': 'tech/07-interoperability/watchlist.md',
  'tech/05-operations/index.md': 'tech/08-production/index.md',
  'tech/05-operations/testing.md': 'tech/08-production/testing.md',
  'tech/05-operations/evaluation.md': 'tech/08-production/evaluation.md',
  'tech/05-operations/observability.md': 'tech/08-production/observability.md',
  'tech/05-operations/security.md': 'tech/08-production/security.md',
  'tech/05-operations/cost-performance.md': 'tech/08-production/cost-performance.md',
  'tech/05-operations/deployment.md': 'tech/08-production/deployment.md',
  'tech/appendices/model-lifecycle/index.md': 'tech/01-model-lifecycle/post-training/index.md',
  'tech/appendices/model-lifecycle/sft.md': 'tech/01-model-lifecycle/post-training/sft.md',
  'tech/appendices/model-lifecycle/rlhf.md': 'tech/01-model-lifecycle/post-training/rlhf.md',
  'tech/appendices/model-lifecycle/peft.md': 'tech/01-model-lifecycle/post-training/peft.md',
  'tech/appendices/multimodal/index.md': 'tech/09-advanced/multimodal.md',
  'tech/appendices/multimodal/claude-vision-capabilities.md': 'tech/09-advanced/multimodal-vision-case.md'
}

// dir targets without an index page -> alias page
const DIR_ALIAS = {
  'tech/06-agent-systems/': 'tech/06-agent-systems/agent-runtime.md',
  'tech/05-action/': 'tech/05-action/tool-calling.md',
  'tech/09-advanced/': 'tech/09-advanced/interpretability.md',
  'tech/00-orientation/': 'tech/index.md'
}

// moved files (locale-stripped old -> new) — inverse sanity set
const MOVED = Object.entries(MAP)

function lookup(oldTarget) {
  // exact file
  if (MAP[oldTarget]) return MAP[oldTarget]
  // with .md
  if (MAP[oldTarget + '.md']) return MAP[oldTarget + '.md']
  // dir index
  if (MAP[oldTarget + '/index.md']) return MAP[oldTarget + '/index.md']
  if (DIR_ALIAS[oldTarget + '/']) return DIR_ALIAS[oldTarget + '/']
  if (DIR_ALIAS[oldTarget]) return DIR_ALIAS[oldTarget]
  return null
}

function relativize(fromFile, toTechRel) {
  const fromDir = posix.dirname(fromFile)
  let rel = posix.relative(fromDir, toTechRel)
  if (!rel.startsWith('.')) rel = rel.replace(/^\.\//, '')
  return rel || posix.basename(toTechRel)
}

let fixedFiles = 0, fixedLinks = 0
for (const [oldRel, newRel] of MOVED) {
  for (const loc of ['zh/', '']) {
    const p = 'docs/' + loc + newRel
    if (!existsSync(p)) continue
    let text = readFileSync(p, 'utf8')
    const oldDir = posix.dirname(oldRel)
    let changed = false
    text = text.replace(/\]\(([^)\s]+)\)/g, (full, href) => {
      const clean = href.split('#')[0]
      const anchor = href.includes('#') ? '#' + href.split('#').slice(1).join('#') : ''
      if (!clean || /^(https?:|mailto:|\/)/.test(clean)) return full
      // resolve against OLD location, strip locale
      const resolvedOld = posix.normalize(posix.join(oldDir, clean))
      const mapped = lookup(resolvedOld)
      if (mapped) {
        const newHref = relativize(loc + newRel, loc + mapped)
        fixedLinks++
        changed = true
        return `](${newHref}${anchor})`
      }
      return full
    })
    if (changed) { writeFileSync(p, text); fixedFiles++ }
  }
}
console.log(`normalized ${fixedLinks} links across ${fixedFiles} files`)
