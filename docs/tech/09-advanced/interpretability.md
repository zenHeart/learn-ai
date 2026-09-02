---
title: Interpretability (Bridge)
description: "Why the model produced this output — mechanistic interpretability (superposition, features, attribution graphs) bridges entirely to Learn LLM; this repo keeps only the app engineer's positional sense: it shapes trust boundaries, audit promises, and expectations when debugging 'why did it say that'."
domain: tech
tags: [tech, interpretability, bridge, safety]
navOrder: 91
topicId: interpretability
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
> **Group**: Advanced (bridge) | **Previous group exit**: run long-term with release gates and versioning | **This page exit**: know which engineering decision this topic affects, and when to go to Learn LLM

# Interpretability (Bridge)

> **Bridge page**: mechanistic interpretability — superposition, sparse autoencoders, feature decomposition, attribution graphs — with derivations and experiments lives in [Learn LLM](https://llm.zenheart.site/) (Chapter 7 · Transformer internals). This repo answers only the app engineer's question: **which of my decisions it changes, and when what you need is actually something else.**

## 1. Overview

**What problem it solves**: the model is a black box — you observe inputs and outputs, but "why it said that" hides in the middle layers. Interpretability research opens those layers: decomposing activations into readable "features", then tracing causal chains between features (attribution graphs), turning "why" into inspectable evidence.

**Why app engineers need positional sense**: you are not going to dissect the model; you are managing three engineering responsibilities created by the black box:

- **Trust boundary**: how deep a behavioral guarantee can you make externally? "We cannot explain why it refuses or doesn't" is a compliance gap in high-stakes settings, not an academic one.
- **Debugging expectations**: application-layer tools (evals, traces, ablations) answer only "did behavior change"; "why inside the model" is beyond the application toolbox — knowing this boundary keeps you from wasting time at the wrong layer.
- **Narrative calibration**: "planning" or "hidden goals" shown by attribution graphs are products of research tooling; treat them as an evidence framework in communication, not proof that "the model is conscious".

## 2. Usage

The decisions it shapes (positions, not code):

| Decision | The positional sense interpretability gives |
| --- | --- |
| Model selection for high-stakes flows | Black-box depth is a selection cost: the less explainable the behavior's origin, the more external guardrails (eval gates, human review) must compensate |
| Audit promises to customers/regulators | Promise only what the application layer can prove (traces, eval records); "internally explainable" is currently a research frontier, not a deliverable |
| Debugging "why this output" | Application layer first: trace and context reconciliation (→ [Observability](../08-production/observability)), input ablation, eval-set comparison; only when all point to "that's just the model" does this section apply |
| Product copy and mental models | "Features" and "circuits" are research vocabulary; speak in behavioral contracts (schemas, acceptance) in product contexts |

## 3. Principles

(Deliberately minimal: derivations and experiments belong to Learn LLM Chapter 7.)

One-line chain: neurons encode multiple concepts at once (superposition) → dictionary learning / sparse autoencoders decompose activations into monosemantic "features" → causal tracing between features yields attribution graphs. This is a research line, not an application API — **app engineers have no callable `explain()`**.

## 4. Development

**Symptom → where to go**:

- "Output is unstable" → not this section; go to [03-context](../03-context/) (contracts that narrow the degrees of freedom).
- "Why was this answer wrong" → first [Observability](../08-production/observability) (trace reconstructs the context) and [Evaluation](../08-production/evaluation) (behavioral boundaries); most "why" turns out to be a context problem.
- "We must prove model safety to a regulator" → the evidence chain in [08-production](../08-production/); interpretability as research background, not as a promise.
- Genuinely want to read the internals → Learn LLM Chapter 7 (Transformer internals).

## 5. Resource Library

### Pages in this section

| Page | Topic |
| --- | --- |
| [Reasoning Models & TTC](reasoning-ttc.md) | budgets, latency, and stop conditions for thinking-style output |
| [MoE & Frontier Architectures](moe-frontier.md) | the architectural explanations behind price/speed/context caps |
| [Multimodal](multimodal.md) | minimal usage and boundaries of vision and other cross-modal abilities |

Primary sources (as published by the researchers; no content re-narrated):

| Name | Origin | Identifier |
| --- | --- | --- |
| Toy Models of Superposition | Anthropic (Transformer Circuits) | arXiv:2209.10652 |
| Sparse Autoencoders Find Highly Interpretable Model Directions | Cunningham et al. | arXiv:2309.08600 |
| Towards Monosemanticity | Anthropic (Transformer Circuits) | https://transformer-circuits.pub/2023/monosemantic-features/index.html |
| On the Biology of a Large Language Model (attribution graphs) | Anthropic (Transformer Circuits, 2025-03) | https://transformer-circuits.pub/2025/attribution-graphs/biology.html |

(retrievedAt 2026-09-01; follow Transformer Circuits and lab publications for progress — this repo maintains no snapshots.)

### Where learn-ai stops / where to go next

- Feature decomposition, attribution-graph methods and experiments: [Learn LLM](https://llm.zenheart.site/) Chapter 7 (Transformer internals).
- The "why" tools that actually land for applications: traces and evals ([08-production](../08-production/)).
