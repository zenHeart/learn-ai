---
title: Model Lifecycle Bridges
description: "Navigation for the SFT, RLHF and PEFT engineering-decision bridges: where the two chains converge at inference, and when prompt and RAG are not enough."
domain: tech
tags: [tech, training, bridge, model-lifecycle]
navOrder: 14
topicId: appendices-model-lifecycle
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

# Model Lifecycle Bridges

**What this is**: navigation and overview for the three training bridge pages (SFT / RLHF / PEFT). This repo keeps **only the engineering-decision view** of training — when moving weights is justified and what it costs. The canonical treatment of training objectives and math lives in [Learn LLM](https://llm.zenheart.site/).

**The two chains converge at inference** (full discussion: [Model lifecycle bridge](../../01-model-lifecycle/)):

```mermaid
flowchart LR
    subgraph Pretraining chain
        Data[Data engineering] --> Pre[Pretraining] --> Base[Base model]
    end
    subgraph Post-training chain
        Base --> SFT[SFT]
        SFT --> Align[Alignment<br/>RLHF / DPO]
        SFT --> PEFT[PEFT<br/>LoRA / QLoRA]
    end
    Align --> Inf[Inference & serving<br/>your app connects here]
    PEFT --> Inf
```

Your application work happens at the right edge of this graph: **consuming trained models through APIs**. The internals of both chains belong to Learn LLM; the three bridge pages here only answer "when does an engineer need to cross that line".

## The three bridges

| Bridge | Question it answers | One-line verdict |
| --- | --- | --- |
| [SFT (bridge)](sft.md) | When to teach the model new knowledge/formats with labeled data | Exhaust prompt and RAG first; SFT is an option only with real data and budget |
| [RLHF (bridge)](rlhf.md) | Where model behavior and "personality" come from | App engineers never implement RLHF; understanding it explains refusals, verbosity, style |
| [PEFT (bridge)](peft.md) | How to customize a model at lower cost | LoRA/QLoRA drop the cost by an order of magnitude; the default starting point when weights must move |

## Connection to the mainline

- For external knowledge, the mainline answer is always [RAG](../../04-grounding/rag) first (layer 3).
- For output-format control, the mainline answer is [structured output](../../02-inference-interface/structured-output) (layer 1), not fine-tuning.
- Only when both layers produce evidence of "not enough", take the decision tables here to an ML engineer.
