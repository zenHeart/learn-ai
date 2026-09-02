---
title: Cost and Performance
description: Token cost structure and latency breakdown are computable engineering quantities — per-request cost tracking, the caching/compression/routing/batching/distillation optimization ladder, and a large-vs-small model decision table; dynamic unit prices always defer to vendor pricing pages (with verification dates), never hardcoded.
domain: tech
tags: [tech, operations, cost, performance]
navOrder: 85
topicId: cost-performance
layer: "8"
status: canonical
nodeType: capability
owner: learn-ai
externalOwners: []
prerequisites: [model-api, observability]
next: [deployment]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **Group**: Production  |  **Previous group exit**: can restrict permissions, pause/resume tasks  |  **This group exit**: can break down a request's cost and latency and pick the cost-effective lever on the optimization ladder
> **Prerequisites**: [Model API Contract](../02-inference-interface/model-api) (usage field), [Observability](observability.md) (per-request records)  |  **Next**: [Deployment and Release](deployment.md) (budget alerts and breakers)

## 1. Overview

**BLUF**: an AI application's cost and latency are not a vendor-owned black box — they are **decomposable, accountable, optimizable engineering quantities**. Cost = per-request token usage × the price structure (input / cache write / cache hit / output — four tiers); latency = TTFT (time to first token) + generation throughput + tool roundtrips. The right order is **account first, then optimize** — without [observability](observability.md)'s per-request records, all optimization is guessing. Dynamic unit prices **always defer to vendor pricing pages** (this page cites structure, not numbers; see the verified table in Principles).

### Mental model: where the money and the milliseconds go

```mermaid
flowchart LR
    subgraph Cost side
    A["input tokens<br/>(context/retrieval results)"] --> P["price structure<br/>input / cache write / cache hit / output"]
    B["output tokens<br/>(incl. invisible reasoning tokens)"] --> P
    P --> C["per-request cost"]
    end
    subgraph Latency side
    T1["queueing + prefill"] --> T2["TTFT first token"]
    T2 --> T3["generation throughput tokens/s"]
    T3 --> T4["tool roundtrips × N"]
    T4 --> T5["end-to-end latency"]
    end
```

### Decision table: big model or small model

| Scenario trait | Choose the big model | Choose the small model | Optimize first instead |
| --- | --- | --- | --- |
| Task complexity | Multi-step reasoning / strict instruction following | Classification/extraction/format conversion/routine chat | — |
| Cost of failure | One error is expensive (legal/money) | Retryable or negligible errors | — |
| Traffic shape | Long-tail few hard cases | High-volume repetitive traffic | High-volume and similar → cache first |
| Current symptom | Quality below bar | Quality surplus, bill hurts | Exploding context → compress first |

Routing (hard cases up to the big model, easy cases to the small one) gets both — provided an [evaluation](evaluation.md) threshold decides difficulty.

### When to use / when not to

- Use: any system with a recurring bill or a latency SLO; any "would switching models save money" decision.
- Do not use: personal toys with negligible monthly cost — the hours spent accounting and optimizing cost more than the bill.

Historical milestone: rewritten in 2026-09 from the legacy `engineering/cost-optimization.md` (four strategies: model routing/semantic caching/compression/self-hosting), adding latency breakdown and the optimization ladder, and converting every price claim to "cite the structure + vendor pricing page + retrievedAt".

## 2. Usage

Minimum walkthrough: 15 minutes, zero API keys — **per-request cost tracking + a budget breaker + latency-decomposition recording**. Unit prices are injected as configuration (the sample numbers are **demo config, not vendor quotes**); real projects enter them from vendor pricing pages with the date noted.

### Step 1: save `cost-tracker.mjs`

```javascript
// cost-tracker.mjs — per-request cost accounting + budget breaker + latency breakdown
// (unit prices are demo config, not vendor quotes)
import assert from 'node:assert/strict';

// Price structure: real projects enter this from the vendor pricing page (per 1M tokens)
// and record retrievedAt. The structure itself is the industry-common form:
// input / cache write (~1.25x) / cache hit (~0.1x) / output — four tiers
// (isomorphic across OpenAI and Anthropic, verified 2026-09-01).
const PRICES = {
  'model-large':  { input: 5.0, cacheWrite: 6.25, cacheRead: 0.5, output: 25.0, retrievedAt: 'fixture' },
  'model-small':  { input: 0.5, cacheWrite: 0.625, cacheRead: 0.05, output: 2.0, retrievedAt: 'fixture' },
};

function requestCost(model, usage) {
  const p = PRICES[model];
  if (!p) throw new Error(`unknown model: ${model}`);
  const m = (n) => n / 1e6; // tokens -> per-million units
  const write = usage.cacheWriteTokens ?? 0; // prefix written to cache this request
  const read = usage.cacheReadTokens ?? 0;   // prefix served from cache
  return p.input * m(usage.inputTokens - write - read)
       + p.cacheWrite * m(write)
       + p.cacheRead * m(read)
       + p.output * m(usage.outputTokens);
}

// ---- Budget breaker: refuse new requests once the period total exceeds the limit
// (stops runaway loops from burning money) ----
function createBudgetGuard(monthlyLimitUsd) {
  let spent = 0;
  return {
    check: () => { if (spent >= monthlyLimitUsd) throw new Error('budget_exhausted'); },
    record: (usd) => { spent += usd; return spent; },
    spent: () => spent,
  };
}

// ---- Latency breakdown: segment records of one request ----
function latencyProfile(segments) {
  const total = segments.reduce((a, s) => a + s.ms, 0);
  const gen = segments.find((s) => s.name === 'generate');
  return {
    totalMs: total,
    ttftMs: gen?.ttftMs ?? null,
    tokensPerSec: gen ? gen.outputTokens / (gen.ms / 1000) : null,
    toolRoundtrips: segments.filter((s) => s.name === 'tool').length,
  };
}

// ---- Demo (deterministic): "first write" vs "replay read" of the same prefix ----
const guard = createBudgetGuard(1.0); // demo budget of 1 USD
const r1 = requestCost('model-small', { inputTokens: 2000, outputTokens: 200 });
assert.ok(Math.abs(r1 - (0.5 * 0.002 + 2.0 * 0.0002)) < 1e-9);
guard.record(r1);

// First request: a 40k-token prefix is billed at the cache-write tier (25% above plain input)
const r2 = requestCost('model-large',
  { inputTokens: 50000, cacheWriteTokens: 40000, outputTokens: 1500 });
assert.ok(Math.abs(r2 - (5.0 * 0.01 + 6.25 * 0.04 + 25.0 * 0.0015)) < 1e-9);
guard.record(r2);

// Replay: the same prefix hits the cache and is billed at the hit tier (~1/10 of input)
const r2b = requestCost('model-large',
  { inputTokens: 50000, cacheReadTokens: 40000, outputTokens: 1500 });
assert.ok(Math.abs(r2b - (5.0 * 0.01 + 0.5 * 0.04 + 25.0 * 0.0015)) < 1e-9);
guard.record(r2b);

const profile = latencyProfile([
  { name: 'retrieve', ms: 120 },
  { name: 'generate', ms: 1800, ttftMs: 350, outputTokens: 1500 },
  { name: 'tool', ms: 400 }, { name: 'tool', ms: 300 },
]);
assert.equal(profile.toolRoundtrips, 2);
assert.ok(profile.tokensPerSec > 0 && profile.tokensPerSec < 2000);

console.log('small-model request:', r1.toFixed(6), 'USD');
console.log('big model, first cache write:', r2.toFixed(6), 'USD');
console.log('big model, same-prefix replay:', r2b.toFixed(6), 'USD');
console.log('cumulative:', guard.spent().toFixed(6), 'USD / limit 1');
console.log('latency breakdown:', JSON.stringify(profile));

guard.record(0.9); // simulate continued traffic
assert.throws(() => guard.check(), /budget_exhausted/); // negative: the breaker works
console.log('budget breaker: budget_exhausted thrown as expected');
```

### Step 2: run

```bash
node cost-tracker.mjs
```

### Step 3: expected output

```text
small-model request: 0.001400 USD
big model, first cache write: 0.337500 USD
big model, same-prefix replay: 0.107500 USD
cumulative: 0.446400 USD / limit 1
latency breakdown: {"totalMs":2620,"ttftMs":350,"tokensPerSec":833.3333333333333,"toolRoundtrips":2}
budget breaker: budget_exhausted thrown as expected
```

How to read it: the first cache write (0.3375) costs **25% more** than not caching and billing the whole prefix as plain input (0.2875) — the write is a prepayment; the second same-prefix request (0.1075) moves the 40k tokens from the input tier to the 0.1x hit tier, and the prepayment pays for itself.

### Step 4: negative observation

Set the replay case's `cacheReadTokens` to 0 (cache fully missed — the 40k tokens fall back to the plain input tier) — the cost rises from 0.1075 to 0.2875, showing cache hit rate as the direct cost lever. Lower `monthlyLimitUsd` to 0.05 and the breaker trips after the second large record.

### Acceptance and cleanup

- Acceptance: all assertions pass; you can answer "which tier a cache hit saves money on, and why a cache write costs more".
- Cleanup: delete the file.

## 3. Principles

### Token cost structure (verified 2026-09-01; unit prices defer to vendor pricing pages)

| Structure item | OpenAI (developers.openai.com/api/docs/pricing) | Anthropic (platform.claude.com/docs/en/build-with-claude/prompt-caching) |
| --- | --- | --- |
| Billing tiers | Input / **cache hit** / **cache write** / output, per 1M tokens (separate short/long-context prices) | Base input / **cache writes** (5-minute and 1-hour tiers) / **cache reads** / output |
| Cache-tier prices | Hit at 10% of input; cache write at 1.25x (verified on the gpt-5.6 family) | Cache read at 0.1x input; cache write at 1.25x (5m) / 2x (1h) |
| Batching | Batch and Flex tiers at 50% off (non-time-sensitive, within 24h) | Batch API at 50% off both input and output (within 24h) |
| Invisible reasoning tokens | Billed as output tokens (occupy context but are invisible) | Reasoning billed as output (billing is independent of thinking display) |

Three engineering corollaries: **a cache hit costs roughly a tenth of the input price** (consistent across both vendors) — caching is the first lever for high-repetition-prefix workloads; **the first cache-write tier is 1.25x at both vendors** — the write costs 25% extra up front, pays for itself on the second same-prefix request, and collects rent on every hit after; **invisible reasoning tokens are billed as output** — "the output looks short" does not mean cheap.

### The engineering premise of caching (prefix match)

Prompt caching is a **strict prefix match**: any byte change in the prefix invalidates everything after it. Put stable content first (frozen system prompt, deterministically ordered tool lists) and volatile content last (timestamps, request IDs, the user's question). Verification: read the usage field's cache tokens (Anthropic: `cache_creation_input_tokens` and `cache_read_input_tokens`); persistently zero across repeated requests indicates a **silent invalidator** (a timestamp in the system prompt, unsorted JSON serialization, a varying tool set). A second silent failure is a **prefix that is too short** — Claude models have a minimum cacheable length of 512–4,096 tokens; below the threshold the request skips caching outright (both cache fields 0, no error), so rule this out first when debugging hit rate (Anthropic prompt-caching docs, retrievedAt 2026-09-01). Cache-failure triage shares the same usage records as [observability](observability.md).

### Latency breakdown

| Component | Definition | Lever |
| --- | --- | --- |
| TTFT | Request sent to first token | Prefill volume (context length), cache hits (hit segments skip recomputation) |
| Generation throughput | Output tokens per second after the first | Model tier, output-length constraints |
| Tool roundtrips | Serial wait per tool call | Parallel tool calls, tool timeout caps, fewer loop steps |
| End-to-end | The sum above (multiplied by turns in loops) | Architecture: change retrieval, change the prompt, change routing |

Interactive products are TTFT-sensitive (perceived speed); batch work is throughput- and price-sensitive — classify the optimization target before acting.

### The optimization ladder (ordered by ROI, low to high)

1. **Caching**: stable prefix + hit verification. Smallest change, direct return (above).
2. **Prompt compression**: cut redundant instructions, summarize retrieval results, trim history — input tokens drop directly.
3. **Model routing**: easy cases to the small model, hard cases up to the big one; route on [evaluation](evaluation.md) thresholds, not intuition.
4. **Batching**: non-time-sensitive tasks on the batch tier (both vendors have discount structures).
5. **Distillation/fine-tuning**: cement high-frequency big-model behavior into a small model — high investment, requiring [Learn LLM](https://llm.zenheart.site/) training knowledge plus this repo's [evaluation](evaluation.md) quality gate.
6. **Architecture**: change retrieval to reduce injection volume, change the agent loop to reduce steps — redesigning back in the grounding and action groups.

**Account before climbing the ladder**: every rung must validate its return with per-request cost data, or the optimization itself becomes the new cost.

### Spec vs local measurement

No protocol spec to implement here; the "spec" side is the structural claims of the two vendor pricing pages (table above, retrievedAt 2026-09-01), and the "measured" side is this page's tracker computing over the three-tier structure (assertion-verified). Price digits are deliberately absent from the prose — **cite the structure, not the price**.

## 4. Development

### Symptom → Evidence → Action → Done when

**Symptom**: the monthly bill doubles sequentially; no one knows where the growth came from.
**Evidence**: per-request usage records aggregated by "feature × model × tier" (→[observability](observability.md)); find the dimension contributing the delta.
**Action**: input up → investigate context bloat and cache hit rate; output up → check reasoning-model usage and loop steps; request volume up → check for retry storms.
**Done when**: the main growth item is named with its matching ladder action; the same dimension reconciles downward next cycle.

### Symptom → Evidence → Action → Done when

**Symptom**: cache hit rate stays at zero; caching is decorative.
**Evidence**: the usage field's cache-hit tokens remain 0 across repeated requests, and the prefix already exceeds the model's minimum cacheable threshold (ruling out a too-short prefix); diff the serialized prefixes of two requests.
**Action**: remove the churn in the prefix — move timestamps/request IDs to the tail, fix JSON key ordering, freeze the tool list order.
**Done when**: the cache-hit field is positive and stable for repeated same-prefix requests; hit rate joins the routine dashboard.

### Symptom → Evidence → Action → Done when

**Symptom**: P95 latency degrades; users complain it got slow.
**Evidence**: the latency-breakdown dashboard pins the component — TTFT up (context grew/cache missed), throughput down (output lengthened), tool roundtrips up (more loop steps).
**Action**: treat by component: compress context, cap output length, parallelize tools, set tool timeout caps.
**Done when**: the degraded component returns to its baseline band; the latency breakdown becomes a pre/post-release reconciliation item (→[Deployment and Release](deployment.md)).

### Anti-patterns

- **Optimize before accounting**: no bill breakdown before fine-tuning or model swaps — returns are unattributable.
- **Total price only, tiers ignored**: the cache-hit and reasoning-token tiers have completely different levers.
- **Propagating demo prices as fact**: prose hardcoding vendor prices always rots — structure + pricing page + retrievedAt is the only compliant form.
- **No budget breaker**: a runaway loop burns the budget overnight (OWASP 2026 raised Unbounded Consumption to LLM06).

## 5. Resource Library

Four-level reading route:

- **Beginner**: run this page's tracker; understand the three price tiers and TTFT/throughput/roundtrips.
- **Builder**: wire per-request usage accounting and a budget breaker into your system; verify prefix stability for caching.
- **Operator**: build the "feature × model × tier" cost dashboard and the latency-breakdown dashboard; validate ladder rungs one at a time.
- **Researcher**: read both vendors' pricing and caching docs in full; cross-check inference-engine performance mechanics (→ Learn LLM).

### Resource table

| Name | Evidence level | Canonical URL | Purpose | Supported claim | Next |
| --- | --- | --- | --- | --- | --- |
| OpenAI API pricing page | L0 (vendor official) | https://developers.openai.com/api/docs/pricing | Unit prices and tier structure | Input/cache-hit/cache-write/output tiers; Batch and Flex at 50%; reasoning tokens billed as output (retrievedAt 2026-09-01) | Enter current prices into config |
| Anthropic pricing and caching docs | L0 (vendor official) | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | Unit prices and cache structure | Cache write 1.25x (5m)/2x (1h), read 0.1x; minimum cacheable length 512–4,096 tokens; batch at 50% (retrievedAt 2026-09-01) | Read its batch-processing docs |
| OpenTelemetry GenAI semantic conventions | L0 (official spec) | https://github.com/open-telemetry/semantic-conventions-genai | Unified naming for token/latency attributes | `gen_ai.usage.*` and TTFT-class metrics (Development level, retrievedAt 2026-09-01) | [Observability](observability.md) |
| OWASP GenAI LLM Top 10 2026 | L0 (official list) | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ | Unbounded-consumption risk | LLM06 Unbounded Consumption (retrievedAt 2026-09-01) | [Security](security.md) |

### Falsification and open questions

- Falsification entry: if your traffic has almost no repeated prefixes (fresh context every time), skip the caching rung — the ladder is tailored to traffic shape, not a checklist.
- Open: the router (easy/hard split) itself adds cost and error rate; when "routing doesn't pay" needs case-by-case eval data, and this repo has no quantified threshold yet.

### learn-ai stops here / where to go next

- Training-side knowledge of distillation/fine-tuning: [Learn LLM](https://llm.zenheart.site/).
- Difficulty thresholds for routing: [Evaluation (Bridge)](evaluation.md) and [evals](https://evals.zenheart.site/).
- Landing points for budget alerts and pre/post-release reconciliation: [Deployment and Release](deployment.md).
