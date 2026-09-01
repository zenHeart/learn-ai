---
title: "MoE and Frontier Architectures (Bridge)"
description: "MoE decouples parameter count from compute, MLA compresses the KV cache, long context changes retrieval economics — this page gives app engineers positional sense: these architectures explain the \"why\" behind API pricing, speed, and context strategy in your selection table; derivations bridge to Learn LLM Chapters 9/20."
domain: tech
tags: [tech, moe, architecture, bridge, long-context]
navOrder: 93
topicId: moe-frontier
layer: "9"
status: bridge
nodeType: boundary
owner: learn-ai
externalOwners:
  - site: llm
    url: https://llm.zenheart.site/
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# MoE and Frontier Architectures (Bridge)

> **Bridge page**: MoE routing, load balancing, MLA attention derivations, and long-context position encodings live in [Learn LLM](https://llm.zenheart.site/) (Chapter 9 · Inference and Quantization; Chapter 20 · DeepSeek topic). This repo keeps only the application-side positional sense: **these architectures explain the "why" behind the price, speed, and context caps in your selection table.**

## 1. Overview

**What problem it solves**: three frontier directions each break an old equation:

- **MoE** (Mixture-of-Experts) breaks "more parameters = more compute per token": total parameters can be huge while each token activates only a small set of experts — capacity and per-call cost decouple.
- **MLA** (Multi-head Latent Attention) breaks "long context = linear KV-cache explosion": compressing KV into a low-dimensional latent space flattens the inference-cost curve for long contexts.
- **Long context** breaks "the model can only see a small window at once": but "fits in the window" does not mean "used well" — utilization of information in the middle of long inputs has a known degradation shape.

**Why app engineers need positional sense**: you do not need to derive MLA, but the answers to "why is this vendor cheap", "why is that one fast", and "how full should I pack the context" all come from these three lines. Without them, selection degenerates into memorizing a price list.

## 2. Usage

| Decision | The positional sense the architecture gives |
| --- | --- |
| API selection (price/speed) | an MoE model's per-token cost is set by **activated parameters**, not total parameters — "huge total parameter count" is not a reason it's expensive, "large activated parameters" is; hosted APIs have already folded this into pricing |
| Hosted vs self-hosted | MoE saves compute, not memory: all expert weights must stay resident. The self-hosting gate for MoE is memory and communication, not FLOPs — one source of the "hosted is cheap, self-hosted is expensive" paradox |
| Context strategy | long context is not a free RAG replacement: a full window costs real money and mid-window utilization degrades. The doctrine stands — "what retrieval should do, leave to retrieval" (→ [04-grounding](../04-grounding/)); use long windows for what **must be present in full** (entire contracts, long code files) |
| KV-cache-related costs | cache hits and prefix reuse (prompt caching) vary by architecture; for long-context multi-turn workloads, keeping prefixes stable is an engineering money-saver (→ [Cost and Performance](../08-production/cost-performance)) |

## 3. Principles

(Deliberately minimal: derivations belong to Learn LLM.)

- **MoE** in one line: a router picks a few experts per token — capacity grows, per-call compute doesn't; the price is load balancing and routing stability.
- **MLA** in one line: compress KV into a low-dimensional latent representation and restore on demand — an extension of the MQA/GQA compression line.
- **Long context** in one line: windows can grow, but mid-window utilization degrades (the lost-in-the-middle phenomenon) — where you place information inside the context remains an engineering variable.

Deep water: Learn LLM Chapter 9 (KV cache, MQA/GQA), Chapter 20 (DeepSeek topic: MLA/MoE/GRPO).

## 4. Development

**Symptom → where to go**:

- "Switched to a supposedly stronger model and the bill changed" → recompute unit cost through the activated-parameter lens (→ [Cost and Performance](../08-production/cost-performance)).
- "Do we still need RAG with million-token models" → yes. Grounding for private/fresh facts does not vanish with bigger windows (→ [04-grounding](../04-grounding/)); long windows change what is feasible for "present in full" scenarios.
- "Key information in the middle of long documents keeps getting missed" → placement strategy: critical facts at the head or tail, or structured chunking plus retrieval — do not count on uniform attention across a full window.
- Want the routing/MLA derivations → Learn LLM Chapters 9 and 20.

## 5. Resource Library

Primary sources (identifiers only; no content re-narrated):

| Name | Origin | Identifier |
| --- | --- | --- |
| Outrageously Large Neural Networks (sparse MoE origin) | Shazeer et al. | arXiv:1701.06538 |
| Switch Transformers (Top-1 routing) | Fedus / Zoph / Shazeer | arXiv:2101.03961 |
| Mixtral of Experts (open MoE representative) | Mistral AI | arXiv:2401.04088 |
| DeepSeek-V2 (introduces MLA) | DeepSeek-AI | arXiv:2405.04434 |
| DeepSeek-V3 Technical Report | DeepSeek-AI | arXiv:2412.19437 |
| Lost in the Middle (long-context position effects) | Liu et al. | arXiv:2307.03172 |

(retrievedAt 2026-09-01; current architectural details of each model follow its technical report and official docs.)

### Where learn-ai stops / where to go next

- MoE/MLA/GRPO derivations and toy reproductions: [Learn LLM](https://llm.zenheart.site/) Chapter 20 (DeepSeek topic), prerequisite Chapter 9 (Inference and Quantization).
- Context-engineering landing points: [03-context](../03-context/); cost closure: [08-production](../08-production/).
