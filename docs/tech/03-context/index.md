---
title: "Context Group: What the Model Sees This Turn"
description: "The next question after the prompt: content. Five topics cover every engineering aspect of what a model sees in a single turn — the hard window budget, assembly strategy, cross-turn sessions, repo conventions. Entry is prompt; exit is a budget you can compute, sources you can assemble, rot you can counter."
domain: tech
tags: [context, index, navigation]
navOrder: 30
topicId: context-index
layer: "3"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: [structured-output]
next: [prompt, context-window, context, session-state, repo-context]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Context Group: What the Model Sees This Turn

> **Group**: Context group ｜ **Before this group**: can write and validate input/output schemas ([structured-output](../02-inference-interface/structured-output.md)) ｜ **Group exit**: the full chain of "what the model sees this turn" — a budget you can compute, sources you can assemble, rot you can counter
> **Prerequisites**: [structured-output](../02-inference-interface/structured-output.md) ｜ **Next**: [Embeddings and Retrieval](../04-grounding/embeddings-retrieval.md), [Tool Calling Contract](../05-action/tool-calling.md)

## 1. Overview

**Bottom line**: however well the prompt is written, it controls only "how to say"; the other half of quality and cost lies in "**what the model sees**". The Context group splits that question into five orthogonal sub-questions, one page each: how to express (prompt), how much fits (context-window), what to load (context-engineering), where cross-turn history lives (session-memory), how to declare repo conventions (repo-context).

Why a whole group: context is a **finite resource with diminishing returns** — the more tokens in the window, the worse the model's accurate recall (context rot, present across models); meanwhile every resent token is billed. Do input-side curation badly and every layer above (grounded retrieval, tool execution, operations reconciliation) pays for noise.

### Mental model: the transformation chain from intent to window

```text
human intent
   │ ① prompt              how to express (task/constraints/examples/output format)
   ▼
controlled instruction ── ② context-window      how much fits (token budget, pairs, output reserve)
   │
   │ ③ context-engineering  what to load (sources, priorities, compaction, staleness)
   ▼
assembled window ── ④ session-memory     where history lives (storage, trimming, recovery, concurrency)
   │
   ▼ ⑤ repo-context        how conventions are declared (AGENTS.md, nearest-wins, host injection)
what the model actually sees this turn
```

### Symptom routing: which page takes which problem

```text
Unstable answers, off-target replies (expression)          → prompt
400 over-window, linear cost growth, truncated output      → context-window
Retrieval stuffed in yet still wrong, stale citations      → context-engineering
History lost on refresh, growing amnesia, concurrent bugs  → session-memory
Wrong deps / test commands after switching assistants      → repo-context
```

### Topic navigation table

| Topic | What question it answers | Exit | Link |
|---|---|---|---|
| Prompt Engineering | How to turn intent into an executable instruction? | Write four-element prompts managed as code | [prompt](prompt.md) |
| Context Window | How much fits this turn? | Compute four-block budgets, spot overflow, trim with pairs intact | [context-window](context-window.md) |
| Context Engineering | What should be loaded this turn? | Design multi-source assembly: priorities, visible eviction, compaction and staleness | [context-engineering](context-engineering.md) |
| Session and State | Where does cross-turn history live? | Build sessions: budget trimming, persistent recovery, concurrency guards | [session-memory](session-memory.md) |
| Repo Context | How are repo conventions declared? | Land an AGENTS.md with real commands and correct layering | [repo-context](repo-context.md) |

### When to enter this group / when not

| | |
|---|---|
| **Audience** | Frontend / full-stack engineers wiring models into products or workflows who start caring about quality and cost |
| **Enter** | The prompt is clear, but any of these appear: multiple turns, external content (files / retrieval / tool results), coding assistants |
| **Do not enter** | Answers still unstable or unparseable — close the contract loop first at [structured-output](../02-inference-interface/structured-output.md); model internals → Learn LLM |
| **Not this group** | Building the retrieval index → [grounding group](../04-grounding/index.md); executing actions safely → [tool-calling](../05-action/tool-calling.md) |

### Decision table: how the five topics divide the work

| | prompt | context-window | context-engineering | session-memory | repo-context |
|---|---|---|---|---|---|
| **Controls** | Expression of instructions | Capacity of input | Content selection of input | Cross-turn history I/O | Repo-level conventions |
| **Direction** | Human → model (intent) | System → window (budget) | Sources → window (curation) | Session → store → window | Repo → host → window |
| **Control** | Text, fully yours | Assembly layer, fully yours | Assembly layer, fully yours | Store implementation, yours | Repo file + host reading |
| **State** | Versioned text | Recomputed per turn | Reassembled per turn | Persistent across requests | Evolves with the repo |
| **Trust domain** | Diffable | Estimate vs exact counting | Source freshness | Storage and concurrency | Command truthfulness |
| **Min complexity** | Lowest, always try first | Low (single turn) to medium (multi-turn) | Medium | Medium (+ persistence) | Low (one text file) |

Read in navOrder: prompt → context-window → context-engineering → session-memory → repo-context.

**Version milestones**: unverified (vendor-capability timelines live on each topic page; this page repeats none).

## 2. Usage

This page is navigation and has no standalone fixture — the group's unified hands-on exit is [context-window](context-window.md)'s zero-key budget allocator (15 minutes: four-block planning → overflow alarm → pair-preserving trim, negative case included). It is the group's meeting point: the prompt occupies the system block, history the history block, retrieval the retrieval block, output the output reserve — five topics converge on one budget sheet.

**15-minute self-check** (after running the fixture):

1. Why must the output reserve count toward the budget? (A: input and output share the window; without a reserve, `stop_reason: max_tokens` truncates)
2. Which two kinds of messages must trimming never sever? (A: the system head; `tool_use` / `tool_result` pairs)
3. What is the first action when over budget? (A: evict the lowest-priority source visibly — not silently, and not by switching to a bigger-window model)

Answer all three and the front half of the group's exit is met; then run [context-engineering](context-engineering.md)'s assembler to add "sources have priorities, eviction is visible".

**Acceptance command** (the deterministic acceptance of context-window):

```bash
npx tsx@4 context-window.ts && echo BUDGET-OK
```

**Cleanup**: delete temporary files.

## 3. Principles

### Why "context" deserves its own group

The naive view of a model API is "prompt in, text out" — apparently one knob: the prompt. Once engineered, "what is seen this turn" splits into at least five sub-problems, each with its own invariants: tokens have budget invariants, sources have priorities and invalidation conditions, history has storage and concurrency, repo conventions have nearest-wins and command truthfulness. **Each sub-problem is independently acceptance-testable** — that is the reason to split them.

### Group-level invariants (expanded per page; the synopsis here)

1. **Count before sending**: any assembled request can be judged for overflow before it ships (→ [context-window](context-window.md) I1).
2. **Trimming must not break structure**: system kept, tool pairs intact, eviction visible (→ I2 and [context-engineering](context-engineering.md)).
3. **Every source has a priority and an invalidation condition**: assembly without priorities is arrival-order by another name (→ context-engineering).
4. **Commands must be real**: assistants execute what AGENTS.md lists (→ [repo-context](repo-context.md)).

### Two universal "stop here" lines

- Attention math, KV cache, the four memory patterns → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) (this group takes only the engineering implications).
- Vendor window numbers, caching prices, token-counting endpoint fields → each vendor's docs on the day (this group maintains no number lists).

## 4. Development

### Group exit criteria

- [ ] Rewrite a vague request into a four-element prompt that enters version control (prompt)
- [ ] Compute a four-block token budget for a request; trim without severing tool pairs (context-window)
- [ ] Assign priorities to multiple sources with reported eviction and stable sources in the prefix (context-engineering)
- [ ] Build sessions for multi-turn chat: budget trimming, persistent recovery, concurrency guards (session-memory)
- [ ] Land an AGENTS.md with real commands and correct layering for your repo (repo-context)

### Debug runbooks (group-level symptoms)

#### R1 "Routed to the wrong layer; editing prompts instead of trimming the window"

**Symptom**: multi-turn quality drops; the team ships three prompt revisions with no improvement.
**Evidence**: the per-turn token curve still rises monotonically — the problem is not expression but budget.
**Action**: return to [context-window](context-window.md) R1 per the symptom routing table; expression symptoms (instability, off-target) belong in [prompt](prompt.md).
**Done when**: failure samples are attributed (expression / budget / content / history / conventions) before action; the attribution is recorded in the PR.

#### R2 The "gets dumber as it goes" localization chain

**Symptom**: answer quality clearly declines in the second half of long sessions.
**Evidence**: check in order — is the token curve near the window (budget) → are retrieval chunks stale (content) → were key turns trimmed (history).
**Action**: budget full → trim or compact; content stale → switch to JIT; history lost → adjust retention (see [context-window](context-window.md), [context-engineering](context-engineering.md), [session-memory](session-memory.md) respectively).
**Done when**: similar sessions stop degrading monotonically with turns; the chain is written into the team's troubleshooting doc.

#### R3 "Behavior changes with every assistant"

**Symptom**: correct in Cursor, wrong deps in Claude Code; every newcomer steps on the same rake.
**Evidence**: no AGENTS.md at the repo root, or commands that do not match reality.
**Action**: land the file per [repo-context](repo-context.md) R1; monorepo exceptions use nested files.
**Done when**: fresh sessions use the right commands on turn one; behavior is consistent across tools and teammates.

### Anti-patterns (group level)

- Skipping the budget and piling on retrieval: more content, worse quality — rot does not vanish with a bigger window.
- Fixing content problems with longer prompts: trim what should be trimmed; change sources that should be changed.
- Assembly logic scattered in many places: concatenation that bypasses priorities and guards is a second source of truth.
- Failures swallowed silently: eviction, trimming, and expiry must all be reported, or none of it is debuggable.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | [Anthropic prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) ｜ [OpenAI guide, context window section](https://developers.openai.com/api/docs/guides/prompt-engineering) | "Expression" and "budget" intuition first |
| Builder | The group's five pages in order + the [context-window fixture](context-window.md) | A regression-checkable budget and assembly loop in hand |
| Operator | Both providers' prompt caching and token counting docs ｜ [agents.md](https://agents.md/) | Post-launch reconciliation, hit rates, and team conventions |
| Researcher | [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ [Chroma: Context Rot](https://research.trychroma.com/context-rot) ｜ Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) | Mental model, empirical decay, and the mechanism layer |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| The group's five topic pages | L1 | [prompt](prompt.md) · [context-window](context-window.md) · [context-engineering](context-engineering.md) · [session-memory](session-memory.md) · [repo-context](repo-context.md) | Main path | — | Read in order |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Mental model overview | Meta-principle / JIT / compaction / rot | Read the original |
| OpenAI prompt engineering | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | Official budget view | Windows measured in tokens | Read their Structured Outputs |
| Anthropic Context windows | L1 | https://platform.claude.com/docs/en/build-with-claude/context-windows | Window and billing basis | Input and output share the budget | Pair with token counting |
| agents.md | L1 | https://agents.md/ | Repo-level context convention | Format, nearest-wins, tool support | Land one for your repo |
| Chroma Context Rot | L4 | https://research.trychroma.com/context-rot | Empirical decay | Long-context retrieval degradation | Read before designing long-document tasks |
| Learn LLM Chapter 15 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | Mechanism bridge | Attention / KV cache / four memory patterns | When you need the "why" |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- This group's conclusions rest on the two vendors' docs and Anthropic's engineering article as retrieved 2026-09-01; window numbers and caching prices drift — recheck within ≤ 6 months.
- The five-topic split is this repo's pedagogical organization, serving each page's acceptance-testable exit; it is not an industry-standard taxonomy.
- Open: no general formula for the context-rot knee (→ [context-window](context-window.md)); no public benchmark for compaction retention (→ [context-engineering](context-engineering.md)).

### Where learn-ai stops / where to continue

- With the input side closed, how to build retrieval grounding → [Embeddings and Retrieval](../04-grounding/embeddings-retrieval.md), [RAG](../04-grounding/rag.md).
- Executing actions → [Tool Calling Contract](../05-action/tool-calling.md).
- Budget and cost as operational metrics → [Cost and Performance](../08-production/cost-performance.md).
- Attention and memory mechanisms → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).
