---
title: SFT (Bridge)
description: "Engineering-decision bridge for supervised fine-tuning: when prompt and RAG are not enough and labeled data must move weights, with a data/cost/latency/maintenance impact table."
domain: tech
tags: [tech, training, bridge, sft]
navOrder: 141
topicId: model-lifecycle-sft
layer: "1"
status: bridge
nodeType: boundary
owner: learn-ai
externalOwners:
  - site: llm
    url: https://llm.zenheart.site/
lastVerified: "2026-09-01"
listed: true
---
> **Group**: Model Lifecycle (bridge) | **Previous group exit**: inference fundamentals and interface contracts | **This page exit**: know when to change weights instead of prompts or retrieval

# SFT (Bridge)

> **Bridge page**: this page answers only the engineering-decision question. Training objectives, loss functions and data recipes are derived in [Learn LLM](https://llm.zenheart.site/) (SFT chapter).

## What problem it solves

**Supervised Fine-Tuning (SFT)**: take an existing pretrained model and continue training it on your `input → expected output` labeled pairs, making it specialized for a domain, format, or style. It changes **model weights** — a different road from prompt engineering (changeable per call, zero training cost) and RAG (external knowledge base, model untouched).

What SFT is good at:

- **Domain language**: terminology-dense fields such as medicine and law.
- **Stable output format**: always producing the same JSON shape or code skeleton, more reliably than prompt constraints.
- **Style and tone**: brand writing style, a consistent response personality.
- **Smaller model, lower cost**: distill general-model capability into a smaller, faster, cheaper specialized model.

What SFT is bad at (use mainline solutions):

- **Frequently changing knowledge** (catalogs, news) → [RAG](../../04-grounding/rag); update the index, take effect immediately.
- **One-off format constraints** → [structured output](../../02-inference-interface/structured-output) + prompt; live in minutes.
- **Prototype stage** → any training investment here is premature optimization.

## When prompt and RAG are not enough

Put SFT on the agenda only when all of the following hold (any miss sends you back to the mainline):

1. **Prompt and few-shot exhausted**: format instability and style drift cannot be fixed at the prompt layer.
2. **RAG optimized**: hybrid retrieval, reranking, and chunk tuning done; accuracy still short, and the bottleneck is confirmed as "the model cannot express this domain" rather than "retrieval misses".
3. **A meaningful volume of high-quality labeled data**: hundreds to tens of thousands of real input/output pairs (order of magnitude, **unverified** — thresholds vary enormously by task and model; run small experiments first).
4. **Budget and ML expertise**: training, evaluation, and regression testing form a continuous pipeline, not a one-off action.

## Decision impact table

| Dimension | Prompt | RAG | SFT |
| --- | --- | --- | --- |
| **Data requirement** | None (write the prompt) | Unstructured docs suffice | High-quality labeled pairs at scale (unverified) |
| **Cost structure** | Inference only | Inference + retrieval infra | Training compute + labeling + eval pipeline (vendor pricing applies; this repo cites no specific figures) |
| **Time to effect** | Immediate | Immediate (re-index) | Requires retraining to update |
| **Inference latency** | Unchanged | Adds retrieval overhead | No retrieval overhead after training; a smaller model can cut latency |
| **Maintenance burden** | Low | Medium (data freshness) | High (data versions, model versions, regression evals) |
| **Debuggability** | High (read the prompt) | High (inspect retrieval hits) | Low (weights are unreadable; eval sets speak) |

## Managed fine-tuning services

If SFT is confirmed, prefer managed services over a self-built GPU pipeline: OpenAI Fine-Tuning, Azure OpenAI, Together AI, Anyscale and others offer fine-tuning APIs. **Note**: even with managed services, data preparation, effect evaluation, and knowing when to stop training still require ML judgment; an app engineer's role is to collaborate with ML engineers and consume the trained artifact through APIs.

## Pre-upgrade checklist

Before proposing "let's do SFT", tick every item; any unticked item sends you back to its layer first:

- [ ] Format problems already attacked with schema validation + few-shot (L1 [structured output](../../02-inference-interface/structured-output))
- [ ] Knowledge problems already attacked with hybrid retrieval + reranking + chunk tuning (L3 [advanced retrieval](../../04-grounding/advanced-retrieval))
- [ ] At least two or three models compared, ruling out the cheaper explanation of "wrong model chosen" (L5 [cost & performance](../../08-production/cost-performance))
- [ ] Labeled data actually exists with inspectable quality — not "theoretically we could have people label"
- [ ] A rollback path exists if post-training quality drops (back to the prompt + RAG version)
- [ ] An ML engineer or managed service owns training and evaluation — not a frontend engineer self-teaching on production

## Common anti-patterns

- **"Fine-tune it and see"**: treating the most expensive lever as the experimental one. The correct order is cheapest first — each higher layer's debugging cost is an order of magnitude lower.
- **Chasing knowledge with SFT**: pouring catalogs and FAQs into the training set. Knowledge changes force retraining; this is the textbook RAG scenario.
- **Vibes over evaluation**: "feels smoother after training" is not evidence. Pre/post comparison must run through eval sets ([Evaluation (bridge)](../../08-production/evaluation)).
- **Padding data with generation**: generating training data with the model itself amplifies existing biases; human verification cannot be skipped.

## Deep derivations and implementation

- Training objectives, data recipes, hyperparameter choices → the SFT chapter of [Learn LLM](https://llm.zenheart.site/).
- Mainline next steps: return to [RAG](../../04-grounding/rag) and [Evaluation (bridge)](../../08-production/evaluation) — "SFT works better" must be backed by evaluation evidence, not vibes.
