---
title: Context Engineering
description: "Answers 'what should the model see this turn': the window is a budget and attention is finite; count before sending, trim without breaking tool pairs, keep stable prefixes first."
domain: tech
tags: [contracts, context, context-window]
navOrder: 12
topicId: context
layer: "1"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/15-prompt-memory"
prerequisites: [prompt]
next: [structured-output]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Context Engineering

> **Layer**: 1 · Interaction Contracts ｜ **Previous layer exit**: locate your problem domain, audience, and next entry point ｜ **This topic exit**: compute a request's context budget, trim with "stable prefix first + tool pairs intact", and recognize the signals of context rot
> **Prerequisites**: [prompt](prompt.md) ｜ **Next**: [structured-output](structured-output.md)

## 1. Overview

**Bottom line**: when a clear prompt still yields poor quality, the window usually holds the wrong things. Context engineering answers not "how to express instructions" (that is [prompt](prompt.md)) but **"what should the model see for this turn of inference"**. Anthropic's definition (retrieved 2026-09-01): context is the set of tokens included when sampling; the engineering problem is optimizing the utility of those tokens against the model's inherent constraints.

Core fact: **context is a finite resource with diminishing marginal returns**. Bigger windows do not fix this — retrieval accuracy degrades as token count grows (context rot), and this emerges across all models.

### Mental model: the budget composition of one request

```text
┌──────────────────── context window (this turn's budget) ────────────────┐
│ system prompt    ─┐                                                     │
│ tool schemas     ─┤ stable prefix (rarely changed → cache-friendly)     │
│ few-shot example ─┘                                                     │
│ message history   ← grows per turn; trim here first (keep tool pairs)   │
│ retrieved chunks  ← injected just-in-time, never whole-corpus           │
│ this turn's user  ← changes each turn, goes last                        │
│ output reserve    ← the tokens the model is about to write share budget │
└─────────────────────────────────────────────────────────────────────────┘
Invariant: Σ(all of the above) ≤ window; exceed → 400 or silent truncation; overstuff → costlier, slower, dumber
```

### When to use / when not to

| | |
|---|---|
| **Audience** | Engineers building multi-turn conversation products, coding-assistant workflows, agent loops |
| **When to use** | Any scenario beyond one or two turns, or that injects external content (files / retrieval / tool results) |
| **When not to use** | Single-turn, short prompt, no external data — budget management is pure overhead |
| **Not this page** | The math of why KV cache and n² attention bound the budget → Learn LLM (bridge); how to build retrieval → [embeddings-retrieval](../03-grounding/embeddings-retrieval.md) / [RAG](../03-grounding/rag.md); the four memory patterns → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) |

### Decision table: where context comes from

| Source | Direction | Lifecycle | Trust domain | Min complexity | Failure mode |
|---|---|---|---|---|---|
| system / developer | Injected (fixed) | Versioned, long-lived | Code repo | Lowest | Duplicated with prompts, silently dropped |
| This turn's user data | Injected (per turn) | One request | Caller | Lowest | Kneaded into the rules |
| Message history | Accumulated | Within session | Session state | Medium (needs trimming) | Over-window, tool pairs severed |
| Retrieval (RAG / @file) | Pulled on demand | Per retrieval | Source freshness | Medium-high | Stale index, top-k noise |
| Repo AGENTS.md | Injected (session start) | Evolves with repo | Repository | Low | Fake commands, becomes a second README |

**Version milestones**: the AGENTS.md format is defined by [agents.md](https://agents.md/) (hosted by the Agentic AI Foundation / Linux Foundation) and read by Cursor, Codex, GitHub Copilot, Gemini CLI, Claude Code, and others (retrieved 2026-09-01, site returned 200). Each tool's precedence rules follow its own product docs.

## 2. Usage

### Minimal hands-on: a context budget guard (zero key)

15 minutes, Node 22 LTS. Demonstrates three invariants: **count before sending** (I1), **trim without breaking tool pairs** (I2), **stable prefix first** (I3). A negative case shows how a naive `slice` severs a pair.

**Setup**: save as `context.ts`, run `npx tsx@4 context.ts`.

```ts
// fixture: budget guard + pair-preserving trim; minimal subset isomorphic to provider message arrays
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

function totalTokens(messages: Message[]): number {
  return messages.reduce((sum, m) => sum + messageTokens(m), 0)
}

// Invariant I2: tool_use and tool_result must stay paired
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

// Invariant I1: estimate before sending; refuse above 80% of budget
function assertFits(messages: Message[], budget: number, label: string): void {
  const used = totalTokens(messages)
  const ratio = (used / budget).toFixed(2)
  console.log(`[${label}] context ~${used} tokens / budget ${budget} (${ratio})`)
  if (used > budget * 0.8) {
    throw new Error(`context ~${used} tokens exceeds 80% of budget ${budget} — trim before sending, not after`)
  }
}

// Invariants I2 + I3: system always kept; drop old messages from the head, never sever tool pairs
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
const conversation: Message[] = [
  system,
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

const BUDGET = 120 // deliberately small to trip the guard

console.log('--- Positive: full message flow, budget guard fires ---')
console.log('broken pairs:', findBrokenToolPairs(conversation))
try {
  assertFits(conversation, BUDGET, 'before trim')
} catch (error) {
  console.error(`guard fired: ${(error as Error).message}`)
}

console.log('\n--- Fix: pair-preserving trim (system stable prefix kept) ---')
const trimmed = trimHistory(conversation, 4)
console.log('kept roles:', trimmed.map((m) => m.role).join(' → '))
console.log('broken pairs after trim:', findBrokenToolPairs(trimmed))
assertFits(trimmed, BUDGET, 'after trim')

console.log('\n--- Negative: a naive slice(-3) severs a tool pair ---')
const naive = conversation.slice(-3)
console.log('kept roles:', naive.map((m) => m.role).join(' → '))
console.log('broken pairs after naive slice:', findBrokenToolPairs(naive))
```

**Normal output**:

```text
--- Positive: full message flow, budget guard fires ---
broken pairs: []
[before trim] context ~125 tokens / budget 120 (1.04)
guard fired: context ~125 tokens exceeds 80% of budget 120 — trim before sending, not after

--- Fix: pair-preserving trim (system stable prefix kept) ---
kept roles: system → assistant → user → assistant → user → assistant → user
broken pairs after trim: []
[after trim] context ~90 tokens / budget 120 (0.75)
```

**Negative output** (the naive slice severs the pair; the next request would 400):

```text
--- Negative: a naive slice(-3) severs a tool pair ---
kept roles: user → assistant → user
broken pairs after naive slice: [ 'tool_result toolu_02 has no tool_use' ]
```

**Acceptance command**:

```bash
npx tsx@4 context.ts && echo BUDGET-OK
```

**Cleanup**: delete temporary files.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: pre-send budget check | this turn's messages | `assertFits` | pass / refuse to send | All multi-turn products | Single short request |
| Common: history trimming | over-budget session | `trimHistory` (keep system + keep pairs) | legal message sequence | Long sessions | Scenarios needing full history audit (log it, don't window it) |
| Combined: repo-level injection | repo-root `AGENTS.md` | tools auto-read it | stable prefix every session | Cross-tool consistency for coding assistants | Per-task details (put those in chat) |

## 3. Principles

### Why the budget is finite: attention and rot (decision-impact level)

Anthropic's engineering article (retrieved 2026-09-01) gives three facts: in a Transformer, n tokens produce n² pairwise attention relationships, stretched thinner as context grows; training data contains far more short than long sequences, so models are less practiced at long-range dependencies; needle-in-a-haystack benchmarks reveal **context rot** — the more tokens in the window, the worse the accurate recall, across all models. Engineering conclusion: **treat context as a finite budget to curate, not a warehouse to pile into**.

The n² math, positional-encoding interpolation, and KV cache mechanics → this repo stops here; continue at Learn LLM ([bridge](https://llm.zenheart.site/chapters/15-prompt-memory)).

### The meta-principle and three invariants

Anthropic's meta-principle: **find the smallest possible set of high-signal tokens that maximize the likelihood of the desired outcome**. Note "smallest" does not mean "short" — not one necessary piece of information may be missing. In engineering terms:

1. **I1 count before sending**: check while assembling messages, not after the provider 400s.
2. **I2 trim without breaking pairs**: `tool_use` and `tool_result` form a pair; severing yields a 400 at best, repeated execution of side-effecting tools at worst.
3. **I3 stable prefix first**: system, tool schemas, and examples rarely change; dynamic content (retrieval, this turn's input) goes last — the precondition for prompt cache (reusing prefix computation to cut cost and latency).

### Retrieval strategies: pre-inference vs JIT vs hybrid

| Strategy | Approach | Advantage | Cost |
|---|---|---|---|
| Pre-inference retrieval | Prepare and stuff all possibly relevant data before inference | Fast | Easily pulls in irrelevant content (context pollution) |
| Just-in-Time (JIT) | Keep only lightweight identifiers (file paths, queries, links); load at runtime via tools | Precise context, no stale index | Runtime exploration is slower |
| Hybrid | Some prefill + on-demand exploration | Speed and precision | Two systems to maintain |

Anthropic's hybrid example is Claude Code: `CLAUDE.md` is dropped into context up front, while `glob` / `grep` primitives retrieve just-in-time — "effectively bypassing the issues of stale indexing". Metadata (paths, naming, timestamps) is itself signal: a `test_utils.py` under `tests/` conveys a different purpose than the same name under `src/core_logic/`.

### Long horizons: compaction, note-taking, sub-agents

When tasks span tens of minutes to hours and tokens exceed the window, three official routes (retrieved 2026-09-01):

| Technique | Mechanism | Fits |
|---|---|---|
| Compaction | Summarize a near-limit conversation and reinitiate a fresh window; keep architectural decisions and unresolved bugs, discard redundant tool outputs | Heavy back-and-forth |
| Structured note-taking | Periodically persist progress outside the window (TODOs, `NOTES.md`), pull back when needed | Iterative work with clear milestones |
| Sub-agents | Focused tasks go to sub-agents with clean windows; they return 1,000-2,000-token distilled summaries | Research and analysis where parallel exploration pays |

The safest light compaction: **clear tool calls and results from deep history** — the tool already ran; the raw result does not need to stay visible. Anthropic has productized tool result clearing.

### Repo context: AGENTS.md

`AGENTS.md` is the README for coding assistants: which package manager installs, how tests run, which directories are off-limits. It divides labor with README — README for humans, AGENTS.md for assistants. Key points: no required fields (it is plain Markdown); on conflict, **the AGENTS.md nearest the file being edited wins**, and the user's in-chat instruction overrides everything; commands must actually run (assistants execute the checks you list); large monorepos use nested files. This repo's root `AGENTS.md` / `CLAUDE.md` is the live sample.

### Spec claims vs local measurement

| Official / spec claim | Our fixture / practice |
|---|---|
| Context is finite; context rot exists | The fixture's budget guard is the minimal "count before sending" |
| Trimming must not sever tool pairs | `findBrokenToolPairs` + pair-preserving `trimHistory`; the negative case catches the naive slice |
| Stable-prefix-first aids caching | `trimHistory` always keeps the system head; no real cache metering wired |
| ~1-2 CJK chars / ~4 English chars ≈ 1 token | Heuristic for guarding only; billing reconciliation uses the provider API |

### Key invariants

See I1-I3 above. A fourth: **information density beats window ceiling** — "200k window" does not mean "paste the whole repo in".

## 4. Development

### Integration points

1. **Budget checks live in the assembly layer**: call `assertFits` in the function that assembles messages, not as an afterthought in the HTTP client.
2. **Open tools per task**: five MCP servers' tool definitions can consume tens of thousands of tokens; mount only what this task needs, discover the rest on demand.
3. **Reconcile tokens with the provider API**: heuristics guard; billing and capacity planning use OpenAI / Anthropic token-counting endpoints.
4. **Run every AGENTS.md command first**: execute each command you write down; assistants will run false commands faithfully.

### Debug runbooks

#### R1 Long sessions degrade; cost grows linearly

**Symptom**: after turn N in the same session, answer quality drops while latency and cost keep rising.
**Evidence**: per-turn token-count curve (the `totalTokens` idea); confirm input tokens grow monotonically with turns.
**Action**: add trimming (pair-preserving) or compaction (summarize and reinitiate); switch retrieval from "full payload every turn" to JIT.
**Done when**: the token curve returns to a sawtooth steady state; the budget guard stops firing for N consecutive turns.

#### R2 400 on the next turn after trimming

**Symptom**: after adding history trimming, occasional `400`s pointing at message structure.
**Evidence**: dump the failing request's full messages; run a tool_use / tool_result pairing check (`findBrokenToolPairs`).
**Action**: switch to pair-preserving trimming; or as the lightest fix, clear deep tool results (both sides of the pair, never one).
**Done when**: no 400s; the pairing check runs in a CI fixture.

#### R3 Low cache hit rate, high p50 latency

**Symptom**: cost and latency above expectations although the prefix looks stable.
**Evidence**: cache-hit metrics in usage; diff the prefix across turns — tiny per-turn changes in system / tool definitions break hits.
**Action**: reorder so the stable segment is strictly first; move per-turn changing content (timestamps, random ids, retrieval results) to the tail.
**Done when**: cache hit rate recovers; "prefix diff is empty" becomes an assertion.

#### R4 The assistant guesses project conventions wrong in every tool

**Symptom**: switch coding assistants and dependencies get mis-installed, test commands mis-run again.
**Evidence**: no AGENTS.md at the repo root, or its commands do not match reality (running `npm install` in this repo is exactly this failure).
**Action**: land an AGENTS.md with real commands and clear no-go zones; long human-oriented content stays in README.
**Done when**: a fresh session uses the right package manager and test command on the first turn; behavior is consistent across tools.

### Anti-patterns

- **Stuffing whole documents**: pasting the entire design doc / whole repo into every turn; retrieval top-k with sources is enough.
- **Mounting every tool at once**: five MCP servers "just in case" eat tens of thousands of tokens and blur tool choice.
- **Naked `messages.slice(-N)`**: severs tool pairs; next turn 400s.
- **Silently dropping system**: dropping the leading system prompt on overflow — all rules vanish, and nobody knows.
- **Writing AGENTS.md as a second README**: repeating the project intro while omitting install / test commands.
- **Reconciling billing with estimated tokens**: heuristics are guards, not ledgers.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | OpenAI guide's [context window section](https://developers.openai.com/api/docs/guides/prompt-engineering) ｜ Anthropic [Context windows docs](https://platform.claude.com/docs/en/build-with-claude/context-windows) | Build the "budget and tokens" intuition first |
| Builder | [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ [agents.md](https://agents.md/) ｜ this page's fixture | The official mental model + repo-level grounding |
| Operator | Both providers' prompt caching docs ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)) ｜ token counting docs | The payoff of I3 and the ledger for I1 |
| Researcher | [Chroma: Context Rot research](https://research.trychroma.com/context-rot) ｜ Learn LLM [Chapter 15 A5](https://llm.zenheart.site/chapters/15-prompt-memory) | Empirical decay and the KV cache / attention math |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Mental model and strategy overview | Attention budget / context rot / JIT / compaction / sub-agents | Read, then audit your own sessions |
| agents.md | L1 | https://agents.md/ | Repo-level context convention | Format, nearest-file precedence, tool support | Land one for your repo |
| OpenAI prompt engineering (context window) | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | Official budget view | Windows measured in tokens, RAG definition | Read their Structured Outputs |
| Anthropic Context windows | L1 | https://platform.claude.com/docs/en/build-with-claude/context-windows | Window and billing basis | Input and output share the budget | Pair with token counting |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | Empirical decay | Experimental evidence of long-context retrieval degradation | Read before designing long-document tasks |
| Learn LLM Chapter 15 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | Mechanism layer | Four memory patterns / truncation implementation | When you need the "why" |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- The estimation heuristic (~1.5 CJK chars / token) has not been verified token-by-token against a provider tokenizer; it guards thresholds only, and ±20% does not change the "count first" conclusion.
- The optimal "keep vs discard" prompt for compaction has no public benchmark; Anthropic advises maximizing recall first, then iterating on precision — guidance, not theorem.
- Open: no general formula for the context-rot knee (how many tokens before significant decay); per-model measurement is the only reliable source.

### Where learn-ai stops / where to continue

- The input side ("what to show") is solved; the output side ("what shape") → [structured-output](structured-output.md).
- Where retrieved chunks come from and how they stay traceable → [embeddings-retrieval](../03-grounding/embeddings-retrieval.md), [RAG](../03-grounding/rag.md).
- KV cache / attention math / memory implementation → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).
- Budget and cost as an operational metric → [cost-performance](../05-operations/cost-performance.md).
