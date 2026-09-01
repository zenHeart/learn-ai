---
title: PEFT (Bridge)
description: "Engineering-decision bridge for parameter-efficient fine-tuning (LoRA/QLoRA): cutting the cost of 'weights must move' by an order of magnitude, and how the adapter architecture changes deployment shape."
domain: tech
tags: [tech, training, bridge, peft, lora]
navOrder: 143
topicId: model-lifecycle-peft
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

# PEFT (Bridge)

> **Bridge page**: this page answers only the engineering-decision question. The low-rank math of LoRA and the quantization combination of QLoRA are derived in [Learn LLM](https://llm.zenheart.site/) (LoRA chapter).

## What problem it solves

**Parameter-Efficient Fine-Tuning (PEFT)** is a family of techniques: freeze the full weights of the pretrained model and train only a small set of added parameters — the most popular being **LoRA (Low-Rank Adaptation)**, which learns "the modification to the weights" as two low-rank matrices. The effect is to shift SFT's cost structure down by an order of magnitude:

- **Lower hardware bar**: consumer/single-GPU setups become viable (versus cluster-scale full fine-tuning).
- **Tiny artifacts**: training produces MB-scale "adapter" files instead of GB-scale full model copies.
- **One base, many adapters**: the serving side can share one base model and hot-swap adapters per request — the standard shape for multi-tenant customization.

A memorable (non-strict) analogy: full fine-tuning rewrites the whole book; LoRA writes edits on sticky notes attached to the relevant pages, and reading applies "original + sticky notes" together.

## When you arrive at this page

PEFT is not an independent decision — it is the **cost-reduced execution mode** of the [SFT (bridge)](sft.md) decision. Trigger conditions are the same as SFT (prompt and RAG exhausted, labeled data available, budget available), plus two typical scenarios:

1. **Many variants needed**: one base model must yield multiple custom versions (per customer, per task); full fine-tuning per variant is unaffordable.
2. **Local/privacy deployment**: run a fine-tuned open-source model (Llama, Mistral, ...) on your own hardware so data never leaves the domain.

## Decision impact table

| Dimension | Full SFT | PEFT (LoRA/QLoRA) |
| --- | --- | --- |
| **Data requirement** | Same volume of labeled pairs (data cost unchanged; specific thresholds unverified) | Same — PEFT saves compute, not data |
| **Cost structure** | Every run yields a full model copy; storage and distribution are expensive | Training compute and storage drop significantly (the order-of-magnitude comparison is community consensus; exact multiples unverified) |
| **Inference latency** | Same class as the original model | Near-parity after adapter merging; note some hosted APIs do not accept external adapters |
| **Maintenance burden** | One full model per custom version; a large version matrix | Base version + adapter matrix; every adapter needs regression when the base is upgraded |
| **Effect ceiling** | Highest theoretical ceiling | Enough for most customization tasks; extreme domain shifts may still need full fine-tuning |

## Connection to local inference

If you run models locally with Ollama, LM Studio and the like, you already consume this chain — "quantized models" and "LoRA adapters" are two key prerequisites for running large models locally. Browser/edge inference is expanded in the mainline [Browser and edge inference](../../02-inference-interface/browser-edge); quantization math belongs to Learn LLM.

## LoRA's engineering choices

After deciding "use LoRA", three engineering choices remain; their derivations live in Learn LLM — only the decision meaning is listed here:

- **Rank**: controls the expressive power of the "sticky notes". Higher rank = more capability at more cost; the common practice is starting small and letting eval sets decide whether to go up (recommended values unverified; experiment).
- **Target layers**: attention-only vs also the feed-forward layers — a capability/cost trade-off.
- **QLoRA**: quantize the base first, then LoRA — memory demand drops further at the cost of an extra layer of quantization error in training and inference. The default upgrade path when memory runs out, not a quality-improving choice.

The common thread: **all three should be eval-set-driven**, not copied from someone else's config — "their rank" was tuned on their data and task.

## Deep derivations and implementation

- LoRA low-rank math, rank selection, QLoRA quantization combinations → the LoRA chapter of [Learn LLM](https://llm.zenheart.site/).
- Original paper: [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685); implementation library: [HuggingFace PEFT](https://github.com/huggingface/peft).
