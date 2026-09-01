---
title: "Efficient Serving: Making Tokens Cheaper"
description: The four serving-side cost levers — quantization, paged KV, prefix caching, speculative decoding — and how they map onto vendor billing fields: why cached input is cheaper, why cache writes carry a premium, and what decides your hit rate.
domain: tech
tags: [serving, cost, quantization, prefix-caching, paged-attention]
navOrder: 21
topicId: efficient-serving
layer: "2"
status: canonical
nodeType: capability
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/09-inference-cache"
prerequisites: [inference-fundamentals]
next: [model-api, cost-performance]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Efficient Serving: Making Tokens Cheaper

> **Group**: 2 · Inference & Interface ｜ **Previous group exit**: can decompose one latency into queue / prefill / decode / network ｜ **This group exit**: can read where the cached input / cache write / cache read fields on the bill come from, and restructure prompts and sessions into cache-friendly shapes
> **Prerequisites**: [Inference Fundamentals](inference-fundamentals.md) ｜ **Next**: [Model API Contract](model-api.md), [Cost and Performance](../08-production/cost-performance)

## 1. Overview

[Inference Fundamentals](inference-fundamentals.md) gave the structure: prefill decides TTFT, decode is memory-bound, and the KV cache eats memory linearly with context. This page answers the most practical engineering step: **what makes tokens cheaper on the serving side, and how those mechanisms show up on your bill**. Read this mapping and you can explain "why cached input has one price and regular input another" — and do the math when choosing between hosted and self-hosted.

Four levers, one sentence each:

- **Quantization**: compress weights from 16-bit to INT8/INT4 and similar low precisions — less memory and memory traffic, lower cost and latency; accuracy is the trade.
- **Paged KV**: slice the KV cache into small blocks allocated on demand (the PagedAttention idea in vLLM), eliminating the fragmentation of "pre-allocate max context per request" — more concurrent sequences fit the same memory, throughput rises.
- **Prefix caching**: reuse the KV of repeated prefixes (system prompts, tool definitions, few-shot examples) and skip prefill — the physical basis for vendors discounting cached input.
- **Speculative decoding**: a small model drafts, the large model verifies in parallel, advancing multiple tokens per step — decode latency drops without changing the output distribution.

```mermaid
flowchart LR
    A[Stable prefix: system prompt + tool definitions] -->|first request| B[Prefill computes KV<br/>writes cache (may carry a write premium)]
    B --> C[Cache entry<br/>valid within TTL]
    C -->|later request with the same prefix| D[Hit: prefill skipped<br/>billed as cached input]
    A -->|prefix changed / below minimum length / TTL expired| E[Miss: full-price prefill again]
```

### When to use / when not to

- **Use**: multi-turn session costs spiraling, a long fixed system prompt, understanding or negotiating serving costs, estimating the upside of self-hosting.
- **Do not use**: the math of quantization (how INT8/INT4 compress, how to measure accuracy loss) → [Learn LLM chapter 9](https://llm.zenheart.site/chapters/09-inference-cache); API fields and error semantics → [Model API Contract](model-api.md); overall cost governance and budgets → [Cost and Performance](../08-production/cost-performance).

### Decision table: the four levers compared

| Lever | Acts on | Who can do it | Where it pays off | Your integration action | Cost / boundary |
| --- | --- | --- | --- | --- | --- |
| Quantization | Weight precision | Vendors already do it; self-hosting picks the level | Cost, latency, memory | Pick a vendor quantization tier or a smaller model; pick a precision level when self-hosting | Accuracy loss needs an eval set |
| Paged KV | KV memory fragmentation | Inside the serving engine | Throughput (cheaper unit price, indirectly) | Pick a modern engine when self-hosting; nothing when hosted | No direct single-request latency gain |
| Prefix caching | Repeated prefix computation | Vendor side (automatic or explicit); self-hosting can enable it | Cost, TTFT | Reorder the prompt to "stable first, dynamic last" | Hits need byte-identical prefixes + minimum length + TTL |
| Speculative decoding | Decode serialization | A vendor-side switch; configurable in self-hosted engines | Latency | Choose models/endpoints that support it | Output unchanged; not available for every model |

### Historical milestones

- PagedAttention shipped with vLLM (its docs homepage indexes the "vLLM announcing blog post (intro to PagedAttention)" and the SOSP 2023 paper). retrievedAt 2026-09-01.
- FlashAttention (arXiv 2205.14135, 2022-05): IO-aware attention kernels, a bottom-layer component of the serving stack. retrievedAt 2026-09-01.
- Vendor prefix-caching launch timelines are **unverified**; we do not fabricate them.

## 2. Usage

### Minimal hands-on: a zero-key prefix cache cost calculator (≤ 15 minutes)

No API key, no dependencies, pure deterministic arithmetic. Simulate a multi-turn chat: the system prompt is the cacheable prefix, and every turn resends the whole history (the API is stateless). The price table **mirrors the structure of vendor billing** — two input prices, cached and uncached — with fictional round numbers; the structure is the point.

Environment: Node ≥ 23.6 (runs .mts directly). Save as `prefix-cache-cost.mts`:

```ts
// fixture: zero-key, zero-dependency prefix cache cost calculator. Mirrors vendor billing STRUCTURE; numbers are fictional.
interface PriceTable {
  inputPerMTok: number;        // uncached input price (per 1M tokens, fictional units)
  cachedInputPerMTok: number;  // cache-hit input price
}

// Structure mirrors: the "Cached input" column of OpenAI's pricing table (automatic prefix caching, >=1024 tokens)
// and Anthropic's cache_read_input_tokens (explicit cache_control breakpoints)
const PRICE: PriceTable = { inputPerMTok: 3, cachedInputPerMTok: 0.3 }; // hit price = 10% of base, mirroring the cache-read tier

interface TurnBill { turn: number; cacheHit: boolean; uncachedTokens: number; cachedTokens: number; cost: number }
interface SessionBill { turns: TurnBill[]; totalCost: number; cacheHitRatio: number }

function costOf(uncached: number, cached: number, p: PriceTable): number {
  return (uncached / 1e6) * p.inputPerMTok + (cached / 1e6) * p.cachedInputPerMTok;
}

// A multi-turn chat: the system prompt prefix is cacheable; every turn resends (full history + new message) as input,
// matching the fact that a stateless messages array is resent in full every turn.
function simulateSession(opts: {
  systemTokens: number; userTokensPerTurn: number; assistantTokensPerTurn: number;
  turns: number; prefixCaching: boolean; minCacheable: number; // vendor minimum cacheable prefix (e.g. 1024)
}): SessionBill {
  const { systemTokens, userTokensPerTurn, assistantTokensPerTurn, turns, prefixCaching, minCacheable } = opts;
  const bills: TurnBill[] = [];
  let historyTokens = 0;
  for (let turn = 1; turn <= turns; turn++) {
    const newTokens = userTokensPerTurn;
    const totalInput = systemTokens + historyTokens + newTokens;
    // the cache only covers the stable prefix (system prompt) and only above the minimum cacheable length
    const prefixCacheable = prefixCaching && systemTokens >= minCacheable;
    const cachedTokens = prefixCacheable ? systemTokens : 0;
    const uncachedTokens = totalInput - cachedTokens;
    bills.push({ turn, cacheHit: cachedTokens > 0, uncachedTokens, cachedTokens, cost: costOf(uncachedTokens, cachedTokens, PRICE) });
    historyTokens += newTokens + assistantTokensPerTurn;
  }
  const totalCost = bills.reduce((s, b) => s + b.cost, 0);
  const allInput = bills.reduce((s, b) => s + b.uncachedTokens + b.cachedTokens, 0);
  const allCached = bills.reduce((s, b) => s + b.cachedTokens, 0);
  return { turns: bills, totalCost, cacheHitRatio: allCached / allInput };
}

const SESSION = { systemTokens: 20_000, userTokensPerTurn: 500, assistantTokensPerTurn: 500, turns: 6, minCacheable: 1024 };

const withCache = simulateSession({ ...SESSION, prefixCaching: true });
const noCache = simulateSession({ ...SESSION, prefixCaching: false });
// negative case: system prompt below the minimum cacheable length -> the structure silently degrades
const tooShort = simulateSession({ ...SESSION, systemTokens: 800, prefixCaching: true });

const fmtCost = (c: number) => `$${c.toFixed(4)}`;
for (const [label, bill] of [['prefix caching ON', withCache], ['prefix caching OFF', noCache], ['ON but system prompt < 1024 tokens (negative)', tooShort]] as const) {
  console.log(`--- ${label} ---`);
  for (const t of bill.turns) {
    console.log(`turn ${t.turn}: input ${fmtCost(t.cost)} (uncached ${t.uncachedTokens.toLocaleString()} + cached ${t.cachedTokens.toLocaleString()})`);
  }
  console.log(`session total: ${fmtCost(bill.totalCost)}; cache hit ratio: ${(bill.cacheHitRatio * 100).toFixed(1)}% of input tokens\n`);
}
console.log(`savings from prefix caching: ${fmtCost(noCache.totalCost - withCache.totalCost)} (${(((1 - withCache.totalCost / noCache.totalCost)) * 100).toFixed(1)}%)`);
```

Run and expected output:

```text
$ node prefix-cache-cost.mts
--- prefix caching ON ---
turn 1: input $0.0075 (uncached 500 + cached 20,000)
turn 2: input $0.0105 (uncached 1,500 + cached 20,000)
turn 3: input $0.0135 (uncached 2,500 + cached 20,000)
turn 4: input $0.0165 (uncached 3,500 + cached 20,000)
turn 5: input $0.0195 (uncached 4,500 + cached 20,000)
turn 6: input $0.0225 (uncached 5,500 + cached 20,000)
session total: $0.0900; cache hit ratio: 87.0% of input tokens

--- prefix caching OFF ---
turn 1: input $0.0615 (uncached 20,500 + cached 0)
...
turn 6: input $0.0765 (uncached 25,500 + cached 0)
session total: $0.4140; cache hit ratio: 0.0% of input tokens

--- ON but system prompt < 1024 tokens (negative) ---
turn 1: input $0.0039 (uncached 1,300 + cached 0)
...
turn 6: input $0.0189 (uncached 5,300 + cached 0)
session total: $0.0684; cache hit ratio: 0.0% of input tokens

savings from prefix caching: $0.3240 (78.3%)
```

(Full output is 18 lines; middle turns elided here.)

Read the negative case this way: in the third section **the cache switch is ON but the hit ratio is 0%** — the system prompt is below the minimum cacheable length, and the requests still succeed without an error. **"Caching is enabled" is not "caching is working"**; the only trustworthy evidence is the hit field in the response usage.

Acceptance: the three hit ratios read 87.0% / 0.0% / 0.0%, savings 78.3%. Cleanup: delete the file.

### Scenario matrix

| Scenario | Input | Action | Output | Fits | Does not fit |
| --- | --- | --- | --- | --- | --- |
| Basic: session cost accounting | system prompt + turn count | Run ON and OFF | Session-level savings ratio | Cost estimation for multi-turn products | Single one-shot calls |
| Common: prompt reorder payoff | Dynamic content mixed into the front | Restructure and re-run | Hit ratio change | Prompt revision reviews | Output-length problems (decode-side) |
| Combined: tier change estimate | Change the two-price ratio or minimum length | Re-run and compare | Cost under the new tier | Re-checking after a vendor pricing change | Negotiating discounts (talk to sales) |

## 3. Principles

### The physics behind the four levers

**Quantization**. The bulk of inference cost is the bandwidth of "moving weights from memory into compute cores", not floating-point arithmetic itself. Compressing weights from FP16 to INT8/INT4 halves and halves the bytes moved — smaller model replicas, denser batches, cheaper unit prices. The trade is accuracy: whether quantization error is acceptable must be answered by your eval set, not by a vendor's "near-lossless" marketing line. Math and implementation → [Learn LLM chapter 9](https://llm.zenheart.site/chapters/09-inference-cache).

**Paged KV**. If the KV cache is pre-allocated contiguously per request at "maximum context", fragmentation and reservation gut memory utilization. PagedAttention slices KV into fixed blocks mapped on demand (the operating-system paging idea); memory waste shrinks and one card holds more concurrent sequences — throughput rises, per-request cost falls. vLLM homepage features: "Continuous batching of incoming requests, chunked prefill, prefix caching" (retrievedAt 2026-09-01).

**Prefix caching**. When the same prefix appears a second time, prefill has already been computed and the KV is already in memory — skipping recomputation is "reusing an existing result". OpenAI's documentation states the mechanism plainly: requests are routed to machines that "recently processed the same prompt", and what is cached is "the key/value tensors from the model's attention layers produced during **prefill**" (retrievedAt 2026-09-01). **The compute the vendor saves is passed back as a discount — that is the causal chain behind cheaper cached input**. It lowers TTFT (prefill skipped) and cost at once.

**Speculative decoding**. Decode serialization is the root of the latency floor; let a small model draft several tokens and the large model verify them in one parallel pass, accepting the legal prefix — several tokens per step. The output distribution is unchanged while latency drops (vLLM supports n-gram, EAGLE, and other variants, retrievedAt 2026-09-01).

### Mechanism → billing field mapping (core deliverable)

| Mechanism | OpenAI side | Anthropic side | Your lever |
| --- | --- | --- | --- |
| Prefix caching (hit) | The `Cached input` pricing column; usage `prompt_tokens_details.cached_tokens` | `cache_read_input_tokens`; the `Cache Hits & Refreshes` pricing column | Stable prefix first, dynamic last; keep turn gaps inside the TTL |
| Prefix caching (write) | No extra fee (automatic caching, retrievedAt 2026-09-01) | `cache_creation_input_tokens`; 5m writes at +25%, 1h writes at 2× (retrievedAt 2026-09-01) | High-frequency sessions use the short TTL; consider 1h only when gaps exceed 5 minutes |
| Quantization / paged KV / speculative decoding | Not exposed line-by-line; folded into unit prices and tiers | Same | Pick tiers and models; configure the engine directly when self-hosting |
| Batch discount | Batch API discount (pricing page notes it suits non-time-sensitive work) | Batch API at 50% off input and output | Route non-realtime tasks through the batch channel |

Key differences between the two caching models (structure comparison, retrievedAt 2026-09-01):

| Dimension | OpenAI | Anthropic |
| --- | --- | --- |
| Trigger | Automatic (prefixes ≥1024 tokens) | Explicit `cache_control` breakpoints (minimum 1024; 2048 for Haiku lines) |
| Write fee | No extra fee | 5m write at 1.25×, 1h write at 2× base price |
| Hit fee | The Cached input column price | 10% of base price |
| Invalidation | Prefix mismatch; eviction after 5–10 minutes idle (up to 1 hour; extended retention up to 24 hours) | Prefix mismatch (tools→system→messages hierarchy invalidates downstream); TTL expiry (a hit refreshes for free) |

### Spec claims vs local measurement

| Claim | Source | Local fixture measurement (above) |
| --- | --- | --- |
| Input tokens have two prices: cached cheaper than uncached | Both pricing pages' structure (L0) | Measured: under the two-price table, ON saves 78.3% vs OFF |
| Hits need a matching prefix above the minimum length | Both caching docs (L0) | Measured: `systemTokens < minCacheable` gives a 0% hit ratio with no request error |
| A stateless API resends the whole history every turn | [Model API Contract](model-api.md) | Measured: turn N's uncached tokens grow linearly with turns |
| Anthropic writes carry a premium; hits within the 5m TTL refresh free | Anthropic caching docs (L0) | Not modeled: the fixture ignores the write premium (see open questions) |
| A hit lowers TTFT and cost together | Corollary of skipping prefill | Not covered: the fixture bills money, not latency |

### Boundary with Learn LLM

Coding details of quantization formats (GPTQ/AWQ/GGUF etc.), methods for measuring accuracy loss, and block-management implementations of the KV cache → [Learn LLM chapter 9](https://llm.zenheart.site/chapters/09-inference-cache). This page keeps only decision depth: "which lever moves which cost line".

## 4. Development

### Cache-friendly engineering checklist

- Freeze the prompt structure: system prompt, tool definitions, and few-shot examples at the very front; user data, timestamps, and other dynamic content at the end.
- Instrument the hit rate: log `cached_tokens` / `cache_read_input_tokens` per request — it is the sentinel metric for both cost and TTFT.
- Session cadence: keep consecutive turn gaps inside the TTL (Anthropic: within 5 minutes, refreshed on hit); sessions that resume much later accept misses or evaluate a longer TTL.
- Keep the prefix byte-identical: toggles on tools, image parameters, or `tool_choice` changes invalidate the prefix (the invalidation table in Anthropic's docs, retrievedAt 2026-09-01).

### Debug runbooks

### Symptom → Evidence → Action → Done when
**Symptom**: the bill did not drop even though "caching is already enabled".
**Evidence**: usage hit fields: `cached_tokens` / `cache_read_input_tokens` stuck at 0 or suddenly fallen.
**Action**: check in order — ① is the prefix broken (dynamic content moved forward, a template version string baked into the system prompt); ② is the prefix below the minimum cacheable length; ③ do request gaps exceed the TTL; ④ do tool definitions or image parameters change every turn.
**Done when**: the hit ratio returns to baseline and the cost curve visibly falls.

### Symptom → Evidence → Action → Done when
**Symptom**: unexpected "write" charges appear on the Anthropic bill.
**Evidence**: a high `cache_creation_input_tokens` share; a write/read ratio out of balance.
**Action**: check the TTL tier (for frequent hits the 5m write is cheaper; use 1h only when gaps exceed 5 minutes); reduce unnecessary breakpoint churn; move low-frequency tasks to the Batch API.
**Done when**: the write/read ratio matches request cadence; per-session unit cost falls.

### Symptom → Evidence → Action → Done when
**Symptom**: after switching to a "quantized / small" model, it got cheaper but answer quality slipped.
**Evidence**: fixed-eval-set scores comparing the quantized tier against the original (not gut feel).
**Action**: roll back the precision tier; or hybrid routing — simple requests to quantized/small models, complex ones to full precision (the routing threshold goes through eval).
**Done when**: eval scores return inside the gate; the savings survive and are documented.

### Anti-patterns

- Treating "the cache switch is on" as the success bar — the only evidence is the usage hit field.
- Baking timestamps or random IDs into the front of the system prompt — every request is a miss.
- Substituting a vendor's "near-lossless" line for your own eval-set verification of a quantization tier.
- Watching unit prices while ignoring structure: a write premium, minimum length, or TTL can each turn a "discount" into "more expensive".
- "Looks successful but the evidence is missing": cost fell but cannot be attributed to a field — it may be a traffic shift, not the optimization.

## 5. Resource Library

### Four-level reading route

- **Beginner** (2): run this page's fixture; read the latency decomposition table in [Inference Fundamentals](inference-fundamentals.md).
- **Builder** (2): the [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching) (automatic caching and prompt structure); the [Anthropic prompt caching docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) (explicit breakpoints and the invalidation table).
- **Operator** (2): both pricing pages (the cached-input column structure, batch discounts); [Cost and Performance](../08-production/cost-performance) (budgets and governance).
- **Researcher** (2): the vLLM docs (feature pages for PagedAttention / automatic prefix caching / speculative decoding); [Learn LLM chapter 9](https://llm.zenheart.site/chapters/09-inference-cache) (quantization math).

### Resource table

| Name | Level | canonical URL | Purpose | Supported claim | Next |
| --- | --- | --- | --- | --- | --- |
| OpenAI Prompt Caching guide | L0 | https://platform.openai.com/docs/guides/prompt-caching | Automatic caching engineering | automatic caching ≥1024 tokens; the `cached_tokens` field; prefill-produced KV tensors are what get cached; no extra write fee | Reorder your prompt |
| Anthropic Prompt Caching docs | L0 | https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching | Explicit caching engineering | `cache_control`; 5m/1h TTLs; writes 1.25×/2×, reads 10%; minimum 1024/2048 | Design breakpoint placement |
| OpenAI pricing page | L0 | https://platform.openai.com/docs/pricing | Billing structure | Input / Cached input / Output column structure; batch discount; reasoning tokens billed as output | Build a cost model |
| Anthropic pricing page | L0 | https://docs.anthropic.com/en/docs/about-claude/pricing | Billing structure | Base Input / 5m Write / 1h Write / Cache Hit / Output column structure | Compare write/read premiums |
| vLLM docs homepage | L1 | https://docs.vllm.ai/en/latest/ | Self-hosted engine features | feature list: continuous batching / chunked prefill / prefix caching / INT8, INT4 quantization / speculative decoding | Dig into feature pages |
| Learn LLM ch. 9 · Inference & Quantization | E | https://llm.zenheart.site/chapters/09-inference-cache | Theory derivations | Quantization and KV cache math live in Learn LLM | Hand-write a quantization experiment |
| This page's fixture | E | prefix-cache-cost.mts (inline above) | Zero-key verification | The two-price billing structure; minimum length causing silent misses | Plug in your project's real prices |

retrievedAt: all web resources 2026-09-01.

### Active falsification and open questions

- The fixture ignores Anthropic's write premium and OpenAI's routing details: turn 1 may be billed at a "write price" rather than full price on a real vendor, so amounts differ slightly; the structural conclusions (two prices, minimum length, hit ratio) stand.
- Unit prices are fictional round numbers: this verifies understanding of the billing **structure**; real amounts follow the vendor pricing page on the day (this repo does not copy unit prices).
- "Hits lower TTFT too" comes from the skipped-prefill corollary and OpenAI's official "reduce latency by up to 80%" framing (retrievedAt 2026-09-01), not local measurement.
- The acceptable threshold for quantization accuracy loss is task-dependent; this repo gives no universal number.

### Where learn-ai stops / where to go next

This page owns "the mapping from mechanisms to the bill". Turn this knowledge into calling code → [Model API Contract](model-api.md); overall cost governance and budgets → [Cost and Performance](../08-production/cost-performance); quantization and block-management math → [Learn LLM chapter 9](https://llm.zenheart.site/chapters/09-inference-cache); quantization practice on-device → [Browser and Edge Inference](browser-edge.md).
