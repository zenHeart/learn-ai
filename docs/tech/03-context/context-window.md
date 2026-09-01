---
title: Context Window
description: "The hard constraint of a single call: tokens are the unit of measure, input and output share one window budget; plan the four blocks before sending, trim without breaking tool pairs — a bigger window is not the fix."
domain: tech
tags: [context, context-window, budget]
navOrder: 32
topicId: context-window
layer: "3"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/15-prompt-memory"
prerequisites: [prompt]
next: [context]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Context Window

> **Group**: Context group ｜ **Previous group exit**: turn intent into a four-element prompt managed as code ｜ **This topic exit**: compute a request's token budget (four blocks + output reserve), recognize over-window symptoms, and trim without breaking tool pairs
> **Prerequisites**: [Prompt Engineering](prompt.md) ｜ **Next**: [Context Engineering](context-engineering.md), [Structured Output](../02-inference-interface/structured-output.md)

## 1. Overview

**Bottom line**: when a clear prompt still yields poor quality, or a multi-turn session keeps getting more expensive, the first thing to check is the **window budget**. The context window is the hard constraint of a single call: everything you send the model this turn, summed, must fit under the model's ceiling — and **input and output share the same budget** (Anthropic docs, retrieved 2026-09-01). Exceeding it has exactly two outcomes: an explicit error (400), or silent truncation — the latter is worse, because nobody knows what was lost.

Tokens in one sentence: the minimal units a tokenizer splits text into; they are the unit of window measurement and billing. The same text yields different token counts under different models' tokenizers, so budgets must be checked against the target model.

### Mental model: the four-block budget of one request

```text
┌──────────────────── context window (this turn's hard budget) ────────────┐
│ system + tool schemas   stable prefix: barely changes turn to turn      │
│ message history         grows per turn; trim here first (keep pairs)    │
│ retrieved chunks / files injected on demand, never whole-corpus         │
│ output reserve          the tokens the model is about to write share it │
└──────────────────────────────────────────────────────────────────────────┘
Invariant: Σ(four blocks) ≤ window; act at 80%; overstuffing is not just costly — it also degrades recall (context rot)
```

"What to load this turn, and by which priority" is a strategy question — that is [context-engineering](context-engineering.md). This page owns only the hard constraint: **it must fit**.

### When to use / when not to

| | |
|---|---|
| **Audience** | Engineers building multi-turn conversation products, coding-assistant workflows, agent loops |
| **When to use** | Any scenario beyond one or two turns, or that injects external content (files / retrieval / tool results) |
| **When not to use** | Single-turn, short prompt, no external data — budget management is pure overhead |
| **Not this page** | Which sources to load and by which priority → [context-engineering](context-engineering.md); where cross-turn history lives → [session-memory](session-memory.md); the math of KV cache and n² attention → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) and the [architecture bridge page](../01-model-lifecycle/architecture.md) |

### Decision table: which block to cut when over budget

| Cut which | Direction | Control | State | Trust domain | Min complexity |
|---|---|---|---|---|---|
| Message history | Drop oldest turns | Fully yours (assembly layer) | In-session | Loses old information | Lowest: pair-preserving trim (this page) |
| Deep tool results | Clear executed tool calls in pairs | Fully yours | One-off | Low loss (results already consumed) | Low (this page, R2) |
| Retrieval injection | Lower top-k / truncate chunks | Fully yours | Rebuilt per turn | Summaries are lossy | Medium (→ [context-engineering](context-engineering.md)) |
| Bigger-window model | Raise the ceiling | Handed to the vendor | Model generation | Cost and latency rise | A purchasing decision — and it does not fix rot |

**Version milestones**: unverified (per-model window ceilings keep changing; this page maintains no number list — check each vendor's docs on the day).

## 2. Usage

### Minimal hands-on: a token budget allocator (zero key)

15 minutes, Node 22 LTS. Demonstrates the full chain of four-block planning → overflow alarm → trim strategy: **count before sending** (I1), **trim without breaking tool pairs** (I2). A negative case shows how a naive `slice` severs a pair.

**Setup**: save as `context-window.ts`, run `npx tsx@4 context-window.ts`.

```ts
// fixture: token budget allocator — four-block planning, overflow alarm, pair-preserving trim
// Minimal subset isomorphic to provider message arrays
type Message =
  | { role: 'system'; content: string }
  | { role: 'assistant'; content: string; toolCalls?: { id: string; name: string }[] }
  | { role: 'user'; content: string; toolResultFor?: string }

// Estimation heuristic: ~1-2 chars per token for CJK, ~4 chars for English;
// reconciliation must use the provider's token-counting API
function estimateTokens(text: string): number {
  const cjk = (text.match(/[一-鿿]/g) ?? []).length
  const rest = text.length - cjk
  return Math.ceil(cjk / 1.5 + rest / 4)
}

function messageTokens(m: Message): number {
  let total = estimateTokens(m.content)
  for (const call of m.toolCalls ?? []) total += estimateTokens(`${call.name} ${call.id}`)
  return total
}

const historyTokens = (messages: Message[]): number =>
  messages.reduce((sum, m) => sum + messageTokens(m), 0)

// Four budget blocks: system stable prefix / history / retrieval / output reserve
interface BudgetReport {
  blocks: { system: number; history: number; retrieval: number; output: number }
  used: number
  ratio: number
  fits: boolean
}

function planBudget(
  window: number,
  parts: { system: Message[]; history: Message[]; retrieval: string[]; outputReserve: number }
): BudgetReport {
  const blocks = {
    system: historyTokens(parts.system),
    history: historyTokens(parts.history),
    retrieval: parts.retrieval.reduce((sum, r) => sum + estimateTokens(r), 0),
    output: parts.outputReserve,
  }
  const used = blocks.system + blocks.history + blocks.retrieval + blocks.output
  return { blocks, used, ratio: used / window, fits: used <= window * 0.8 }
}

// I1 count before sending: refuse above 80% of the window
function assertFits(report: BudgetReport, window: number, label: string): void {
  const b = report.blocks
  console.log(
    `[${label}] system ${b.system} + history ${b.history} + retrieval ${b.retrieval} + output ${b.output} = ${report.used} / ${window} (${report.ratio.toFixed(2)})`
  )
  if (!report.fits) {
    throw new Error(`context plan ${report.used} tokens exceeds 80% of window ${window} — trim before sending, not after`)
  }
}

// I2 trim without breaking pairs: tool_use and tool_result form a pair
function findBrokenToolPairs(messages: Message[]): string[] {
  const problems: string[] = []
  const openToolIds = new Set<string>()
  const answeredToolIds = new Set<string>()
  for (const m of messages) {
    for (const call of m.toolCalls ?? []) openToolIds.add(call.id)
    if (m.role === 'user' && m.toolResultFor) answeredToolIds.add(m.toolResultFor)
  }
  for (const id of openToolIds) {
    if (!answeredToolIds.has(id)) problems.push(`tool_use ${id} has no tool_result`)
  }
  for (const id of answeredToolIds) {
    if (!openToolIds.has(id)) problems.push(`tool_result ${id} has no tool_use`)
  }
  return problems
}

// Trim strategy: system always kept; drop old messages from the head, never sever tool pairs
function trimHistory(messages: Message[], keepFrom: number): Message[] {
  const hasSystemHead = messages[0]?.role === 'system'
  const bodyStart = hasSystemHead ? 1 : 0
  const keptHead: Message[] = hasSystemHead ? [messages[0]] : []
  const keptBody = messages.slice(Math.max(keepFrom, bodyStart))
  const first = keptBody[0]
  if (first && first.role === 'user' && first.toolResultFor) {
    const pairIndex = messages.findIndex(
      (m) => m.role === 'assistant' && m.toolCalls?.some((c) => c.id === first.toolResultFor)
    )
    if (pairIndex >= bodyStart && pairIndex < keepFrom) {
      return [...keptHead, ...messages.slice(pairIndex)]
    }
  }
  return [...keptHead, ...keptBody]
}

// Demo data: a support conversation with two tool-call rounds
const system: Message = {
  role: 'system',
  content: 'You are an order-support assistant. Answers must be based on tool-returned data; never invent order IDs.'
}
const history: Message[] = [
  { role: 'user', content: "Look up Alice's three most recent orders." },
  { role: 'assistant', content: 'Querying orders.', toolCalls: [{ id: 'toolu_01', name: 'search_orders' }] },
  { role: 'user', content: '{"matched":3,"orders":["ORD-101","ORD-102","ORD-109"]}', toolResultFor: 'toolu_01' },
  { role: 'assistant', content: "Alice's three most recent orders are ORD-101, ORD-102, ORD-109." },
  { role: 'user', content: 'When did ORD-102 ship?' },
  { role: 'assistant', content: 'Checking the ship time.', toolCalls: [{ id: 'toolu_02', name: 'get_order' }] },
  { role: 'user', content: '{"orderId":"ORD-102","shippedAt":"2026-08-14"}', toolResultFor: 'toolu_02' },
  { role: 'assistant', content: 'ORD-102 shipped on 2026-08-14.' },
  { role: 'user', content: 'Refund it to the original payment method.' }
]
const retrieval = ['[policy] Refund policy v3: refunded to the original method within 1-3 business days.']

const WINDOW = 165 // deliberately small to trip the alarm

console.log('--- Positive: budget plan for the full conversation ---')
console.log('broken pairs:', findBrokenToolPairs([system, ...history]))
const full = planBudget(WINDOW, { system: [system], history, retrieval, outputReserve: 30 })
try {
  assertFits(full, WINDOW, 'full')
} catch (error) {
  console.error(`guard fired: ${(error as Error).message}`)
}

console.log('\n--- Trim: keep system + keep pairs, back under the safety line ---')
const trimmedHistory = trimHistory(history, 4)
const trimmed = planBudget(WINDOW, {
  system: [system],
  history: trimmedHistory,
  retrieval,
  outputReserve: 30,
})
console.log('kept roles:', ['system', ...trimmedHistory.map((m) => m.role)].join(' -> '))
console.log('broken pairs after trim:', findBrokenToolPairs([system, ...trimmedHistory]))
assertFits(trimmed, WINDOW, 'trimmed')

console.log('\n--- Negative: a naive slice(-3) severs a tool pair ---')
const naive = history.slice(-3)
console.log('kept roles:', ['system', ...naive.map((m) => m.role)].join(' -> '))
console.log('broken pairs after naive slice:', findBrokenToolPairs([system, ...naive]))
```

**Normal output** (over-limit caught by the guard; after trimming, back under the line):

```text
--- Positive: budget plan for the full conversation ---
broken pairs: []
[full] system 26 + history 99 + retrieval 21 + output 30 = 176 / 165 (1.07)
guard fired: context plan 176 tokens exceeds 80% of window 165 — trim before sending, not after

--- Trim: keep system + keep pairs, back under the safety line ---
kept roles: system -> user -> assistant -> user -> assistant -> user
broken pairs after trim: []
[trimmed] system 26 + history 48 + retrieval 21 + output 30 = 125 / 165 (0.76)
```

**Negative output** (the naive slice severs the pair; the next request would 400):

```text
--- Negative: a naive slice(-3) severs a tool pair ---
kept roles: system -> user -> assistant -> user
broken pairs after naive slice: [ 'tool_result toolu_02 has no tool_use' ]
```

**Acceptance command**:

```bash
npx tsx@4 context-window.ts && echo BUDGET-OK
```

**Cleanup**: delete temporary files.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: pre-send budget plan | this turn's four blocks | `planBudget` + `assertFits` | pass / refuse to send | All multi-turn products | Single short request |
| Common: over-window trim | over-budget session | `trimHistory` (keep system + keep pairs) | a legal sequence that passes review | Long sessions | Scenarios needing full history audit (log it, don't window it) |
| Combined: budget guard in regression | this page's fixture | assert ratio and pairing in CI | red on drift | After model or prompt changes | One-off scripts |

## 3. Principles

### Why the window is finite: attention, KV cache, training distribution (decision-impact level)

Anthropic's engineering article (retrieved 2026-09-01) gives three facts: in a Transformer, n tokens produce n² pairwise attention relationships, stretched thinner as context grows; training data contains far more short than long sequences, so models are less practiced at long-range dependencies; at inference, KV cache memory grows with token count, so bigger windows cost more to serve. The engineering conclusion is one sentence: **treat the window as a budget to plan, not a warehouse to pile into**.

The n² math, positional-encoding interpolation, and KV cache derivations → this repo stops here; continue at Learn LLM ([Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory)) and the [model architecture bridge page](../01-model-lifecycle/architecture.md).

### Why a bigger window is not the fix: context rot

Needle-in-a-haystack benchmarks reveal **context rot**: the more tokens in the window, the worse the accurate recall, across all models (Chroma's research provides systematic evidence, retrieved 2026-09-01). Switching to a 200k-window model fixes the 400 error, not "it's in the window but the model can't see it". **Information density beats the ceiling**.

### The two faces of overflow (symptom table)

| Face | What you see | Root cause | First action |
|---|---|---|---|
| Explicit refusal | `400` pointing at context length | Input over the ceiling | Move `assertFits` into the assembly layer (I1) |
| Silent truncation | Answers suddenly "amnesiac", rule-breaking; or output stops mid-way (`stop_reason: max_tokens`) | Framework/provider silently trims; output reserve exhausted | Check the four-block budget report; check `stop_reason` |

### Three tiers of token measurement

| Tier | Tool | Use |
|---|---|---|
| Heuristic estimate | Character approximation (this page's `estimateTokens`) | Pre-send guard, local assertions |
| Provider counting API | OpenAI / Anthropic count-tokens endpoints | Billing reconciliation, capacity planning |
| Local tokenizer rerun | Vendor tokenizer libraries | Mechanism understanding (→ Learn LLM) |

### Spec claims vs local measurement

| Official / spec claim | Our fixture / practice |
|---|---|
| Input and output share the window budget | The fixture's `output` block is a 30-token output reserve, counted in `used` |
| Over-limit should be caught before sending | `planBudget` + 80% threshold refusal; the negative case shows the alarm |
| Trimming must not sever tool pairs | `findBrokenToolPairs` catches the naive slice's break |
| ~1-2 CJK chars / ~4 English chars ≈ 1 token | Heuristic guards only; billing reconciliation uses the provider API |

### Key invariants

1. **I1 count before sending**: check while assembling messages, not after the provider 400s.
2. **I2 trim without breaking pairs**: `tool_use` and `tool_result` form a pair; severing yields a 400 at best, repeated execution of side-effecting tools at worst.
3. **The output reserve is part of the budget**: `max_tokens` is not free allowance — it draws on the same window.
4. **Information density beats the ceiling**: "200k window" does not mean "paste the whole repo in".

## 4. Development

### Integration points

1. **Budget checks live in the assembly layer**: call `assertFits` in the function that assembles messages, not as an afterthought in the HTTP client.
2. **Align `max_tokens` with the output reserve**: an exhausted reserve → `stop_reason: max_tokens` truncation; leave room for the output block when planning.
3. **Reconcile tokens with the provider API**: heuristics guard; billing and capacity planning use OpenAI / Anthropic token-counting endpoints.
4. **Window numbers follow the model**: re-check the ceiling and tokenizer differences whenever the model changes, and pin the model (see [Model API Contract](../02-inference-interface/model-api.md)).

### Debug runbooks

#### R1 Long sessions degrade; cost grows linearly

**Symptom**: after turn N in the same session, answer quality drops while latency and cost keep rising.
**Evidence**: per-turn token-count curve (`planBudget`'s `used`); confirm input tokens grow monotonically with turns.
**Action**: add pair-preserving trimming or clear deep tool results; switch retrieval from "full payload every turn" to on-demand injection (→ [context-engineering](context-engineering.md)).
**Done when**: the token curve returns to a sawtooth steady state; the budget guard stops firing for N consecutive turns.

#### R2 400 on the next turn after trimming

**Symptom**: after adding history trimming, occasional `400`s pointing at message structure.
**Evidence**: dump the failing request's full messages; run a tool_use / tool_result pairing check (`findBrokenToolPairs`).
**Action**: switch to pair-preserving trimming; or as the lightest fix, clear deep tool results in pairs (both sides, never one).
**Done when**: no 400s; the pairing check runs in a CI fixture.

#### R3 Output keeps stopping mid-way

**Symptom**: answers halt halfway; JSON is incomplete and unparseable.
**Evidence**: `stop_reason` / `finish_reason` is `max_tokens`; the budget report shows the `output` block at zero or too small.
**Action**: budget for output and raise `max_tokens` accordingly; if outputs are long, split the task (one ask per turn).
**Done when**: `stop_reason` returns to normal completion; schema validation no longer fails on truncation.

#### R4 Guard misfires: estimates drift from provider counts

**Symptom**: locally it fits, but the provider 400s; or the guard keeps blocking spuriously.
**Evidence**: compare `usage.prompt_tokens` against `estimateTokens`; CJK-English mixed text and code snippets drift most.
**Action**: calibrate the heuristic coefficients with the provider's count-tokens endpoint; switch reconciliation cases to provider counting outright.
**Done when**: drift enters an acceptable band (e.g. ±10%); the guard threshold stops misfiring.

### Anti-patterns

- **Stuffing whole documents**: pasting the entire design doc into every turn; retrieval top-k with sources is enough.
- **Naked `messages.slice(-N)`**: severs tool pairs; next turn 400s.
- **Silently dropping system**: dropping the leading system prompt on overflow — all rules vanish, and nobody knows.
- **No output reserve**: spending the window on input; output is guaranteed to truncate.
- **Reconciling billing with estimated tokens**: heuristics are guards, not ledgers.
- **"Big window, no budgeting needed"**: rot does not disappear with a bigger window, and neither does the cost curve.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | OpenAI guide's [context window section](https://developers.openai.com/api/docs/guides/prompt-engineering) ｜ Anthropic [Context windows docs](https://platform.claude.com/docs/en/build-with-claude/context-windows) | Build the "budget and tokens" intuition first |
| Builder | This page's fixture ｜ [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | A guard in hand, then the official mental model |
| Operator | Both providers' token counting docs ｜ [Anthropic Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (billing basis) | The ledger for I1 and the budget basis |
| Researcher | [Chroma: Context Rot research](https://research.trychroma.com/context-rot) ｜ Learn LLM [Chapter 15 A5](https://llm.zenheart.site/chapters/15-prompt-memory) | Empirical decay and the KV cache / attention math |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| OpenAI prompt engineering (context window) | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | Official budget view | Windows measured in tokens, RAG definition | Read their Structured Outputs |
| Anthropic Context windows | L1 | https://platform.claude.com/docs/en/build-with-claude/context-windows | Window and billing basis | Input and output share the budget | Pair with token counting |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Mental model overview | Attention budget / context rot | Assembly strategy → [context-engineering](context-engineering.md) |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | Empirical decay | Experimental evidence of long-context degradation | Read before designing long-document tasks |
| Learn LLM Chapter 15 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | Mechanism layer | KV cache / attention math / truncation | When you need the "why" |
| This page's fixture | E | context-window.ts (inline) | Zero-key verification | Four-block planning / pair-preserving trim | Swap in a provider counting API |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- The estimation heuristic (~1.5 CJK chars / token) has not been verified token-by-token against a provider tokenizer; it guards thresholds only, and ±20% does not change the "count first" conclusion.
- Open: no general formula for the context-rot knee (how many tokens before significant decay); per-model measurement is the only reliable source.
- Window ceilings and tokenizers keep changing; this page maintains no number list — check the vendor's docs on the day before relying on one.

### Where learn-ai stops / where to continue

- **What** to load within the budget, and by which priority → [context-engineering](context-engineering.md).
- Where cross-turn history lives, how to recover → [session-memory](session-memory.md).
- Budget and cost as operational metrics → [cost-performance](../08-production/cost-performance.md).
- KV cache / attention math → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) and the [architecture bridge page](../01-model-lifecycle/architecture.md).
