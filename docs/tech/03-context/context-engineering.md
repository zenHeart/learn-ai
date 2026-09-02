---
title: Context Engineering
description: "Answers 'what should the model see this turn': source taxonomy and priorities, just-in-time retrieval, compaction and note-taking, stable prefix first; when context rots, change the sources before the model."
domain: tech
tags: [context, context-engineering, curation]
navOrder: 33
topicId: context
layer: "3"
status: canonical
nodeType: pattern
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/15-prompt-memory"
prerequisites: [prompt, context-window]
next: [session-state, repo-context]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Context Engineering

> **Group**: Context group  |  **Previous group exit**: compute a request's token budget and trim without breaking pairs  |  **This topic exit**: design multi-source context assembly — sources have priorities, eviction is visible, compaction and staleness have a method
> **Prerequisites**: [Prompt Engineering](prompt.md), [Context Window](context-window.md)  |  **Next**: [Session and State](session-memory.md), [Repo Context](repo-context.md)

## 1. Overview

**Bottom line**: when a clear budget still yields poor quality, the window usually holds the **wrong things**. Context engineering answers not "how to express instructions" (that is [prompt](prompt.md)), nor "how much fits" (that is [context-window](context-window.md)), but **"what should the model see for this turn of inference"**. Anthropic's definition (retrieved 2026-09-01): context is the set of tokens included when sampling; the engineering problem is optimizing the utility of those tokens against the model's inherent constraints.

The meta-principle: **find the smallest possible set of high-signal tokens that maximizes the likelihood of the desired outcome**. "Smallest" does not mean "short" — not one necessary piece of information may be missing; "high-signal" also does not mean "a bit more never hurts".

### Mental model: sources → assembler → window

```text
system (rules) ───┐                       ┌─ stable segment first (cache-friendly)
memory (profile) ─┤  assembler            │
history (recent) ─┤  : fill by priority   ├─ dynamic segment last (per-turn changes)
retrieval ────────┤  : evict visibly      │
task (this one) ──┘  : over budget, cut lowest priority first  └─ Σ ≤ window (see context-window)
```

Two hard rules carry over from [context-window](context-window.md): the total passes the budget guard (I1) and history trimming keeps tool pairs (I2). This page adds the third: **I3 stable prefix first** — system, tool schemas, and examples rarely change; dynamic content (retrieval, this turn's input) goes last. That is the precondition for prompt caching (reusing prefix computation to cut cost and latency).

### When to use / when not to

| | |
|---|---|
| **Audience** | Engineers building multi-turn conversation products, coding-assistant workflows, agent loops |
| **When to use** | Any scenario beyond one or two turns, or that injects external content (files / retrieval / tool results / memory) |
| **When not to use** | Single-turn, short prompt, no external data — a single source needs no assembly strategy |
| **Not this page** | Window ceiling and token measurement → [context-window](context-window.md); where cross-turn history lives and concurrency guards → [session-memory](session-memory.md); repo-level conventions (AGENTS.md) → [repo-context](repo-context.md); how to build the retrieval index → [embeddings-retrieval](../04-grounding/embeddings-retrieval.md) / [RAG](../04-grounding/rag.md); the four memory patterns → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) |

### Decision table: where context comes from

| Source | Direction | Lifecycle | Trust domain | Min complexity | Failure mode |
|---|---|---|---|---|---|
| system / developer | Injected (fixed) | Versioned, long-lived | Code repo | Lowest | Duplicated with prompts, silently dropped |
| This turn's user data | Injected (per turn) | One request | Caller | Lowest | Blends into the rules |
| Message history | Accumulated | Within session | Session state | Medium (needs trimming) | Over-window, tool pairs severed |
| Retrieval (RAG / @file) | Pulled on demand | Per retrieval | Source freshness | Medium-high | Stale index, top-k noise |
| Memory (profile / notes) | Read in | Cross-session | Memory store | Medium | An outdated profile misleads the turn |
| Repo AGENTS.md | Injected (session start) | Evolves with repo | Repository | Low | Fake commands, becomes a second README (→ [repo-context](repo-context.md)) |

**Historical milestones**: vendors are productizing compaction (e.g. Anthropic has productized tool result clearing, retrieved 2026-09-01); exact fields and behavior follow the official docs — this page maintains no vendor timeline.

## 2. Usage

### Minimal hands-on: a context assembler (zero key)

15 minutes, Node 22 LTS. Demonstrates three things: multi-source **priority-based** filling, **low-priority eviction that is visible** (not silent disappearance) within budget, and **stable sources in the prefix** (I3). The negative case shows how "arrival-order concat + drop from head" silently throws away the system rules.

**Setup**: save as `context-engineering.ts`, run `npx tsx@4 context-engineering.ts`.

```ts
// fixture: context assembler — multi-source, priorities, in-budget trimming
// (the lowest priority gets evicted, and the eviction is visible)
type SourceKind = 'system' | 'memory' | 'history' | 'retrieval' | 'task'

interface Source {
  kind: SourceKind
  priority: number // higher = more important; system/task are protected, never evicted
  stable: boolean // true = stable source, goes into the prefix (cache-friendly); false = dynamic, goes last
  text: string
}

// Estimation heuristic: ~1-2 chars per token for CJK, ~4 chars for English;
// reconciliation uses the provider's token-counting API
function estimateTokens(text: string): number {
  const cjk = (text.match(/[一-鿿]/g) ?? []).length
  const rest = text.length - cjk
  return Math.ceil(cjk / 1.5 + rest / 4)
}

const cost = (s: Source): number => estimateTokens(s.text)
const total = (list: Source[]): number => list.reduce((sum, s) => sum + cost(s), 0)

interface AssemblyResult {
  window: Source[] // final order entering the window: stable in the prefix, dynamic at the tail
  evicted: Source[] // sources pushed out by budget — must be reported, never vanish silently
  used: number
}

function assemble(sources: Source[], budget: number): AssemblyResult {
  const protectedKinds = new Set<SourceKind>(['system', 'task'])
  const kept = [...sources]
  const evicted: Source[] = []

  // Eviction order: lowest priority among unprotected sources first; ties by arrival order
  const evictOrder = sources
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => !protectedKinds.has(s.kind))
    .sort((a, b) => a.s.priority - b.s.priority || a.i - b.i)
  for (const { s } of evictOrder) {
    if (total(kept) <= budget) break
    kept.splice(kept.indexOf(s), 1)
    evicted.push(s)
  }
  if (total(kept) > budget) {
    throw new Error(`protected sources alone cost ${total(kept)} > budget ${budget} — raise the budget, do not drop rules`)
  }

  // I3 stable prefix first: stable sources in original order, dynamic by priority descending
  const stable = kept.filter((s) => s.stable)
  const dynamic = kept.filter((s) => !s.stable).sort((a, b) => b.priority - a.priority)
  return { window: [...stable, ...dynamic], evicted, used: total(kept) }
}

const show = (label: string, r: AssemblyResult): void => {
  console.log(`[${label}] used ${r.used} tokens`)
  console.log('  window :', r.window.map((s) => `${s.kind}(${s.priority}${s.stable ? ',stable' : ''})`).join(' -> '))
  console.log('  evicted:', r.evicted.length === 0 ? '[]' : r.evicted.map((s) => `${s.kind}(${s.priority})`).join(', '))
}

// Demo data: six sources for one ticket-triage turn
const sources: Source[] = [
  { kind: 'system', priority: 100, stable: true, text: 'Triage rules: classify as P0/P1/P2 by blast radius and workaround availability; the output must state the reasoning.' },
  { kind: 'task', priority: 90, stable: false, text: 'This ticket: enterprise customer hits error E42 and asks for a workaround.' },
  { kind: 'history', priority: 70, stable: false, text: 'Previous turn: reproduction steps and affected versions confirmed.' },
  { kind: 'memory', priority: 60, stable: true, text: 'Customer profile: enterprise plan, gold SLA, historically expects 1-hour response on P0.' },
  { kind: 'retrieval', priority: 50, stable: false, text: '[doc-47] Error E42: auth token expired; logging in again restores access.' },
  { kind: 'retrieval', priority: 30, stable: false, text: '[doc-12] Upgrade guide 2024: E42 fixed in 2024.3, with migration steps and rollback notes.' },
]

console.log('--- Positive: ample budget, everything enters, stable sources in the prefix ---')
show('budget=130', assemble(sources, 130))

console.log('\n--- Tighter budget: the lowest-priority chunk is evicted (visibly) ---')
show('budget=110', assemble(sources, 110))

console.log('\n--- Negative: arrival-order concat + drop-from-head silently discards the system rules ---')
function naiveFit(list: Source[], budget: number): Source[] {
  const kept = [...list]
  while (total(kept) > budget && kept.length > 0) kept.shift() // drop from head, ignoring role and priority
  return kept
}
const naive = naiveFit(sources, 110)
console.log('[naive budget=110] used', total(naive), 'tokens')
console.log('  window :', naive.map((s) => `${s.kind}(${s.priority})`).join(' -> '))
console.log('  dropped: the triage rules vanish with no report; the task data nearly followed')
```

**Normal output**:

```text
--- Positive: ample budget, everything enters, stable sources in the prefix ---
[budget=130] used 129 tokens
  window : system(100,stable) -> memory(60,stable) -> task(90) -> history(70) -> retrieval(50) -> retrieval(30)
  evicted: []

--- Tighter budget: the lowest-priority chunk is evicted (visibly) ---
[budget=110] used 106 tokens
  window : system(100,stable) -> memory(60,stable) -> task(90) -> history(70) -> retrieval(50)
  evicted: retrieval(30)
```

**Negative output** (arrival-order + drop-from-head: the rules are gone, with no report):

```text
--- Negative: arrival-order concat + drop-from-head silently discards the system rules ---
[naive budget=110] used 100 tokens
  window : task(90) -> history(70) -> memory(60) -> retrieval(50) -> retrieval(30)
  dropped: the triage rules vanish with no report; the task data nearly followed
```

**Acceptance command**:

```bash
npx tsx@4 context-engineering.ts && echo ASSEMBLER-OK
```

**Cleanup**: delete temporary files.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: single source + task | system + task | assemble + budget guard | a legal request | All calls | — |
| Common: multi-source assembly | + retrieval / memory / history | fill by priority | a window with an eviction report | RAG-style products | Simple calls with one source |
| Combined: tightened budget | over-budget multi-source | lowest priority out first | visible trimming decisions | Long sessions with retrieval | Full-audit needs (log, don't window) |

## 3. Principles

### Division of labor: prompt and the sibling pages

| Question | Owner |
|---|---|
| How to **express** intent (task/constraints/examples/output format) | [prompt](prompt.md) |
| How much **fits** (token budget, pairs, output reserve) | [context-window](context-window.md) |
| **What** to load, by which priority (this page) | context-engineering |
| Where cross-turn history **lives**, recovery, concurrency | [session-memory](session-memory.md) |
| How to declare repo-level **conventions** and inject them | [repo-context](repo-context.md) |

### Retrieval strategies: pre-inference vs JIT vs hybrid

| Strategy | Approach | Advantage | Cost |
|---|---|---|---|
| Pre-inference retrieval | Prepare and stuff all possibly relevant data before inference | Fast | Easily pulls in irrelevant content (context pollution) |
| Just-in-Time (JIT) | Keep only lightweight identifiers (file paths, queries, links); load at runtime via tools | Precise context, no stale index | Runtime exploration is slower |
| Hybrid | Some prefill + on-demand exploration | Speed and precision | Two systems to maintain |

Anthropic's hybrid example is Claude Code: `CLAUDE.md` is dropped into context up front, while `glob` / `grep` primitives retrieve just-in-time — "effectively bypassing the issues of stale indexing" (retrieved 2026-09-01). Metadata (paths, naming, timestamps) is itself signal: a `test_utils.py` under `tests/` conveys a different purpose than the same name under `src/core_logic/`. The full repo-side convention is covered in [repo-context](repo-context.md).

### Long horizons: compaction, note-taking, sub-agents

When tasks span tens of minutes to hours and tokens exceed the window, three official routes (retrieved 2026-09-01):

| Technique | Mechanism | Fits |
|---|---|---|
| Compaction | Summarize a near-limit conversation and reinitiate a fresh window; keep architectural decisions and unresolved bugs, discard redundant tool outputs | Heavy back-and-forth |
| Structured note-taking | Periodically persist progress outside the window (TODOs, `NOTES.md`), pull back when needed | Iterative work with clear milestones |
| Sub-agents | Focused tasks go to sub-agents with clean windows; they return 1,000-2,000-token distilled summaries | Research and analysis where parallel exploration pays |

The safest light compaction: **clear tool calls and results from deep history in pairs** — the tool already ran; the raw result does not need to stay visible (trimming details and pair rules: [context-window](context-window.md) R2).

### Rot and staleness: two kinds of rot

| Kind | What it is | Signal | Handling |
|---|---|---|---|
| Attention rot (context rot) | The more tokens in the window, the worse the recall | Late in long sessions, early content "becomes invisible" | Reduce tokens (trim / compact); mechanism in [context-window](context-window.md) |
| Staleness | The content itself expires: stale retrieval index, changed injected files, cached prefix tied to old rules | Answers cite deleted APIs / old versions; file content mismatches reality | Switch to JIT loading; version and timestamp sources; invalidate and rebuild on prefix change |

The general anti-staleness rule: **every source has an invalidation condition** — when it stops being trustworthy, and who refreshes it.

### How retrieved chunks enter the context (the RAG interface)

- **Carry sources**: chunks carry doc ids / paths so answers stay traceable (→ [rag](../04-grounding/rag.md) on citation faithfulness).
- **top-k with budget awareness**: bigger k is not better — every extra segment dilutes attention.
- **Explicit no-hit path**: when retrieval is empty, tell the model "no grounds" instead of stuffing noise.
- Building the retrieval chain itself → [embeddings-retrieval](../04-grounding/embeddings-retrieval.md).

### Spec claims vs local measurement

| Official / spec claim | Our fixture / practice |
|---|---|
| Smallest high-signal token set | The assembler fills by priority; the lowest priority is evicted visibly |
| Stable prefix first aids caching | `assemble` keeps the stable segment strictly first; no real cache metering wired (see open questions) |
| Eviction must not be silent | `evicted` is returned explicitly; the negative case shows arrival-order dropping system |
| JIT bypasses stale indexes | This repo is itself the sample: `CLAUDE.md` prefetched + glob/grep on demand |

### Key invariants

1. **Every source has a priority and an invalidation condition**; assembly without priorities is arrival-order by another name.
2. **System and this turn's task are protected**: never trade rules for space, however tight the budget.
3. **Eviction must be visible**: trimmed content is reported; silent disappearance is undebuggable.
4. **Stable first, dynamic last**: I3 is the precondition for prompt caching.

## 4. Development

### Integration points

1. **One assembler entry point**: a single "assemble messages / fill sources" function repo-wide; scattered assembly bypasses priorities and guards.
2. **Open tools per task**: five MCP servers' tool definitions can consume tens of thousands of tokens; mount only what this task needs, discover the rest on demand (→ [MCP](../07-interoperability/mcp.md)).
3. **Retrieved content carries sources and timestamps**: both traceability and invalidation input.
4. **Compaction prompts live in version control**: "keep vs discard" is a behavioral contract — reviewed and regression-tested, not hand-written at runtime.

### Debug runbooks

#### R1 Low cache hit rate, high p50 latency

**Symptom**: cost and latency above expectations although the prefix looks stable.
**Evidence**: cache-hit metrics in usage; diff the prefix across turns — tiny per-turn changes in system / tool definitions break hits.
**Action**: reorder sources so the stable segment is strictly first; move per-turn changing content (timestamps, random ids, retrieval results) to the tail.
**Done when**: the cache hit rate recovers; "prefix diff is empty" becomes an assertion.

#### R2 Answers cite deleted APIs / old versions

**Symptom**: the model speaks confidently, but the cited interface does not exist in the current code.
**Evidence**: the retrieval chunk's doc id and timestamp vs current HEAD; injected file content vs the actual file.
**Action**: switch that source to JIT (fetch when used); add an update pipeline to the index; stamp sources with versions.
**Done when**: citations match the current version; stale sources raise invalidation alarms.

#### R3 Long tasks "lose memory" mid-run

**Symptom**: tens of minutes in, answers forget earlier architectural decisions and re-ask settled questions.
**Evidence**: the token curve near the window; early decision turns already trimmed or drowned in tool output.
**Action**: add compaction (summarize and reinitiate, keeping decisions and open questions) or structured note-taking (persist progress outside the window, pull back when needed); hand parallel subtasks to sub-agents (→ [multi-agent](../06-agent-systems/multi-agent.md)).
**Done when**: decisions survive compaction; the token curve returns to steady state.

### Anti-patterns

- **Stuffing whole documents**: pasting the entire design doc into every turn; retrieval top-k with sources is enough.
- **Mounting every tool at once**: five MCP servers "just in case" eat tens of thousands of tokens and blur tool choice.
- **Arrival-order assembly**: assembly order decided by code arrival order; rule sources can end up last or evicted.
- **Silent eviction**: trimming without reports — no way to attribute failures.
- **Writing AGENTS.md as a second README**: repeating the project intro while omitting install / test commands (→ [repo-context](repo-context.md)).

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)  |  OpenAI guide's [context window section](https://developers.openai.com/api/docs/guides/prompt-engineering) | The official mental model and budget intuition |
| Builder | This page's assembler fixture  |  [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Multi-source filling in hand, then the payoff of I3 |
| Operator | Both providers' prompt caching docs ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching))  |  this page's R1-R3 runbooks | Post-launch operations: hit rate, staleness, compaction |
| Researcher | [Chroma: Context Rot research](https://research.trychroma.com/context-rot)  |  Learn LLM [Chapter 15 A5](https://llm.zenheart.site/chapters/15-prompt-memory) | Empirical decay and the four memory patterns |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Mental model and strategy overview | Meta-principle / JIT / compaction / sub-agents | Read, then audit your own sessions |
| Anthropic prompt caching | L1 | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | The payoff and mechanism of I3 | Prefix reuse cuts cost | Pair with stable-prefix refactors |
| OpenAI prompt engineering (context window) | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | Official budget view | Windows measured in tokens | Read their Structured Outputs |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | Empirical decay | Long-context retrieval degradation | Read before designing long-document tasks |
| Learn LLM Chapter 15 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | Mechanism layer | Four memory patterns / truncation | When you need the "why" |
| This page's fixture | E | context-engineering.ts (inline) | Zero-key verification | Priority filling / visible eviction | Wire in real retrieval sources |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- The optimal "keep vs discard" prompt for compaction has no public benchmark; Anthropic advises maximizing recall first, then iterating on precision — guidance, not theorem.
- JIT vs pre-inference has no universal optimum; it depends on task structure (exploration depth vs response latency). This page gives only the decision dimensions.
- The fixture's stable-prefix ordering has no real cache metering wired; the quantified gain of "stable prefix → hit rate" must be verified against provider metrics.
- Open: no general formula for the context-rot knee (→ [context-window](context-window.md) open questions).

### Where learn-ai stops / where to continue

- Where retrieved chunks come from, how they stay traceable → [embeddings-retrieval](../04-grounding/embeddings-retrieval.md), [rag](../04-grounding/rag.md).
- Cross-turn history storage, recovery, concurrency → [session-memory](session-memory.md).
- Declaring and injecting repo-level conventions → [repo-context](repo-context.md).
- Four memory patterns / KV cache math → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).
