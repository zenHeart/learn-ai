---
title: "Layer 1 · Interaction Contracts: Making Input and Output Controllable"
description: "Enter this layer when answers are unstable or outputs cannot be parsed: four contracts — prompt, context, structured output, tool calling. Exit able to write and validate input/output schemas and know how failures are accepted."
domain: tech
tags: [contracts, index]
navOrder: 30
topicId: contracts-index
layer: "3"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: []
next: [prompt, context, structured-output, tool-calling]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Layer 1 · Interaction Contracts: Making Input and Output Controllable

> **Layer**: 1 · Interaction Contracts ｜ **Previous layer exit**: locate your problem domain, audience, and next entry point ｜ **This layer exit**: write and validate input/output schemas, know how failures are accepted, know when to escalate to Layer 2
> **Prerequisites**: none (first layer; if you are unsure how this site splits duties with neighboring knowledge sites, start at [tech-map](../index.md)) ｜ **Next**: [model-api](../02-inference-interface/model-api.md)

## 1. Overview

**Bottom line**: Layer 1 is the foundation of the pyramid. Everything above it — product interaction, grounded retrieval, safe execution, reliable operations — rests on two premises: **controllable input** (you decide what the model sees and how the intent is expressed) and **verifiable output** (output shape is contractual and failures are testable). When these premises do not hold, every layer you stack on top adds more undecidable behavior.

Why contracts come before everything else: model output is probabilistic sampling, not a function return value. The engineering path is not to eliminate uncertainty but to **use contracts to collapse degrees of freedom into a verifiable subset** — instructions have four elements, input has budget invariants, output has a schema, actions have a whitelist. Each contract turns a class of "occasionally wrong" into "detectably wrong".

### Symptom routing: which problems enter this layer

```text
Answers unstable / output cannot be parsed        → Layer 1 Interaction Contracts (you are here)
Answers stable, but not yet in a product          → Layer 2 Application Integration
Answers lack private or fresh facts               → Layer 3 Knowledge Grounding
Needs to call systems or perform actions          → Layer 4 Action and Collaboration
Feature works, but cannot prove ship-readiness    → Layer 5 Reliable Operations
```

### Mental model: the first stop on the capability chain

```text
Human intent
   │  ① prompt           — how to express the instruction (task/constraints/examples/output format)
   ▼
Controllable input ── ② context — what the model sees this turn (budget/sources/rot)
   │
 MODEL
   │  ③ structured-output — what shape the output has (schema contract + validation layer)
   ▼  ④ tool-calling — what action it wants to take (request/execution separation)
Verifiable result → Layer 2 (product interaction) → Layer 3 (grounding) → Layer 4 (action) → Layer 5 (operations)
```

### Topic navigation table

| Topic | What question it answers | Exit | Link |
|---|---|---|---|
| Prompt Engineering | How to turn intent into executable instructions? | Write four-element prompts, manage them as code | [prompt](prompt.md) |
| Context Engineering | What should the model see this turn? | Manage budget, trim without breaking pairs, spot rot | [context](context-engineering.md) |
| Structured Output | How does output shape become contractual? | Write schema + validation layer + failure retry | [structured-output](../02-inference-interface/structured-output.md) |
| Tool Calling Contract | What is agreed when the model wants to act? | Define schemas, pass gates, return results | [tool-calling](../05-action/tool-calling.md) |

### When to use / when not to

| | |
|---|---|
| **Audience** | Frontend / full-stack engineers starting to wire LLMs into products or workflows |
| **Prerequisites** | None — this is the first layer. Being able to call a model API or use any coding assistant is enough |
| **Not this layer** | Model internals (attention / sampling math) → Learn LLM; evaluation methodology → evals; vendor product usage → Products |
| **When to escalate to Layer 2** | The single-request contract loop has been accepted, and you need multi-turn, streaming, cancellable product interaction |

### Decision table: how the four contracts divide the work

| | prompt | context | structured-output | tool-calling |
|---|---|---|---|---|
| **What it controls** | Expression of instructions | Content and budget of input | Shape of output | Shape of action requests |
| **Direction** | Human → model (intent) | System → window (curation) | Model → code (contract) | Model → system (request) |
| **Control** | Text, fully yours | Assembly, fully yours | Schema + decoder | Schema + your gates |
| **State** | Versioned text | Rebuilt each turn | Contract per generation | Multi-step loop |
| **Trust domain** | Diffable | Data freshness governed | Shape trusted, semantics still validated | Trusted request ≠ reasonable execution |
| **Minimum complexity** | Lowest | Low (single turn) to medium (multi-turn) | Low | Medium |

Read [prompt](prompt.md) (expression) first, then [context](context-engineering.md) (content), then [structured-output](../02-inference-interface/structured-output.md) (output contract), finally [tool-calling](../05-action/tool-calling.md) (action contract).

**Version milestones**: unverified (per-topic vendor capability timelines live in each topic page; this page repeats no claims).

## 2. Usage

This page is the navigation layer and ships no standalone fixture — the hands-on exit for the whole layer is the zero-key validation loop in [structured-output](../02-inference-interface/structured-output.md) (15 minutes: schema → mock model → validate → retry-on-failure, with three negative cases). It is the confluence of all four contracts: the prompt states behavior, context manages retry turns, the schema fixes shape, failure is decidable.

**15-minute self-check** (after running the fixture):

1. Which component rejected the three negative cases (missing field / extra field / wrong type)? (Answer: the caller-side validation layer, not the prompt)
2. Where did the error information go on retry? (Answer: appended to the retry feedback sent back to the model)
3. What does provider constrained decoding guarantee, and what does it not? (Answer: shape; not semantics, and it does not remove the refusal / truncation failure classes)

If you can answer all three, the Layer 1 exit is met.

**Acceptance command** (the deterministic acceptance from structured-output):

```bash
npx tsx@4 structured-output.ts > run1.txt && npx tsx@4 structured-output.ts > run2.txt && diff run1.txt run2.txt && echo DETERMINISTIC
```

**Cleanup**: delete run1.txt / run2.txt.

## 3. Principles

### Why "contract" is the right first abstraction

The naive view of a model API is "text in, text out". Under that view nothing is acceptable: two calls with the same input produce different results, and you cannot say which one is "right". The contract view splits the interaction into four separately verifiable interfaces:

1. **Instruction contract** (prompt): the minimal source of behavior. Lintable, versionable.
2. **Input contract** (context): budget invariant + pairing invariant. Countable, assertable.
3. **Shape contract** (structured-output): schema + independent validation layer. Rejectable, retryable.
4. **Action contract** (tool-calling): whitelist + parameter validation. Rejectable, error-returnable.

The shared structure: **agree on a machine-decidable predicate and make failure explicit**. That is the engineering definition of "controllable" — not "never fails", but "when it fails, you know, and you know which class it belongs to".

### Two universal failure exits

Every contract in Layer 1 eventually meets two failure classes that contracts alone do not govern (most visible in structured-output; both providers document them, retrieved 2026-09-01):

- **Refusal**: the model declines for safety reasons. Anthropic returns HTTP 200, bills normally, sets `stop_reason: 'refusal'`; OpenAI offers programmatically detectable refusals. Retrying the same content is pointless.
- **Truncation (max_tokens)**: the output budget ran out mid-generation. Raise the budget or split the output.

Knowing these two failure classes exist — and how to accept them — is itself part of the Layer 1 exit.

### Key invariants

1. Any output that enters code must carry a machine-verifiable schema ("please output JSON" in a prompt does not count).
2. Any output that triggers actions (tool calls) must pass a whitelist and parameter validation before execution.
3. Every failure path must be explicit (retry / escalate / terminate — pick one); silent swallowing is forbidden.

### Where learn-ai stops / where to continue (principles)

Sampling, attention, few-shot mechanisms → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory); how contract quality becomes release evidence → evals ([evaluation](../08-production/evaluation.md) bridge).

## 4. Development

### Layer exit criteria

- [ ] Can rewrite a vague request into a four-element prompt and keep the prompt in version control
- [ ] Can compute context budget for a request and trim without breaking tool pairs
- [ ] Can write a JSON Schema, add a caller-side validation layer, implement failure retry (three negative cases rejected)
- [ ] Can define a tool schema, pass whitelist + parameter validation before execution, return errors per contract
- [ ] Knows the refusal / truncation failure classes exist and how to accept them
- [ ] Knows when to escalate to Layer 2: single-request contract loop accepted, product-grade interaction needed

### Debug runbooks (common layer-level symptoms)

#### R1 "The model is inconsistently good; we cannot ship"

**Symptom**: demos look fine; in trials the output occasionally becomes unusable.
**Evidence**: collect failure samples and classify — broken format (fences / missing fields) → missing facts → missing action capability. The class decides which layer to fix.
**Action**: broken format → [structured-output](../02-inference-interface/structured-output.md); ambiguous expression → [prompt](prompt.md); missing facts → Layer 3; missing actions → [tool-calling](../05-action/tool-calling.md).
**Done when**: failure samples fall into known classes; each class has a matching contract and regression.

#### R2 "Parse alerts after integrating into the product"

**Symptom**: fine in chat, `JSON.parse` failures once wired into code.
**Evidence**: raw output bodies of alerting samples (fenced? missing fields? truncated?).
**Action**: follow the three root causes in [structured-output](../02-inference-interface/structured-output.md) R1 (fences → strict schema; refusal → business handling; truncation → raise budget).
**Done when**: parse failure rate drops to zero or is fully attributed; CI has a bad-output-must-be-rejected fixture.

#### R3 "Accidents as soon as tools go live"

**Symptom**: the model called a tool it should not have / with absurd parameters, causing real side effects.
**Evidence**: execution logs — was the tool name outside the list (hallucination)? did parameters pass validation?
**Action**: add gates per [tool-calling](../05-action/tool-calling.md) R1; attach permission and human approval to side-effecting tools (Layer 4).
**Done when**: unauthorized executions equal zero; gate rejection counts are observable.

### Anti-patterns (layer level)

- Skipping contracts and stacking orchestration: three layers of agent framework while the underlying output still fails to parse.
- Treating "passed once" as acceptance: sampling luck is not a contract; deterministic fixtures + CI are.
- Fixing everything with longer prompts: use a schema where a schema belongs; trim context where context belongs.
- Silently swallowing failures: invisible errors ≠ stable system.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | [Anthropic prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) ｜ [OpenAI prompt engineering guide](https://developers.openai.com/api/docs/guides/prompt-engineering) | The two official first entries covering Layer 1 expression and role hierarchy |
| Builder | The four topic pages in order + run the [structured-output fixture](../02-inference-interface/structured-output.md) ｜ [Anthropic interactive tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | Build one regressable contract loop before expanding |
| Operator | [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) ｜ [Anthropic Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) ｜ [Anthropic Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | Verify supported subsets and failure semantics per provider before launch |
| Researcher | [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) ｜ Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) | Mechanisms and mental models behind the contracts |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| This layer's four topic pages | L1 | [prompt](prompt.md) · [context](context-engineering.md) · [structured-output](../02-inference-interface/structured-output.md) · [tool-calling](../05-action/tool-calling.md) | Contract main path | — | Read in order |
| OpenAI / Anthropic prompt guides | L1 | see Beginner row above | Official expression tactics | Role hierarchy / prompt-as-code | Drill into topics |
| OpenAI Structured Outputs | L1 | https://developers.openai.com/api/docs/guides/structured-outputs | Official output-contract canon | strict tiers / refusal / supported subset | Wire a real API |
| Anthropic Structured outputs | L1 | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | Same (Anthropic canon) | output_format / strict tools / beta header | Same |
| Anthropic Tool use | L1 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | Official action-contract canon | Five-step flow / pairing / stop_reason | Same |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Input-curation mental model | Attention budget / JIT / compaction | Read the original |
| Learn LLM Chapter 15 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | Mechanism-layer bridge | Four-part structure / JSON tiers / memory | When you need the "why" |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- Layer conclusions rest on the two providers' official docs retrieved 2026-09-01; provider subsets (e.g. OpenAI's `pattern` support) keep drifting — re-verify at most every 6 months.
- The "four contracts" split is this site's teaching cut; providers organize by feature pages (Anthropic groups JSON outputs and strict tool use under structured outputs) — the cut serves acceptance, not an industry standard.
- Open: whether constrained decoding helps output quality (not just shape) lacks public evidence; no conclusion drawn.

### Where learn-ai stops / where to continue

- Single-request contract loop accepted, need streaming / cancellable / multi-turn product interaction → [model-api](../02-inference-interface/model-api.md) (Layer 2).
- Output needs private or fresh facts → [rag](../04-grounding/rag.md) (Layer 3).
- Actions need safe execution and cross-boundary collaboration → [tool-execution](../05-action/tool-execution.md) (Layer 4).
- Contract quality must become release evidence → [evaluation](../08-production/evaluation.md) (Layer 5, bridges to evals.zenheart.site).
