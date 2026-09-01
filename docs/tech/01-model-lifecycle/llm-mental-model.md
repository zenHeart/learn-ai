---
title: "The LLM Mental Model (Bridge)"
description: An LLM is a parametrized conditional probability model predicting one token at a time — this single mental model determines what prompts really do, why the context window is a hard constraint, and why temperature is not a creativity knob; derivations and implementations belong to Learn LLM.
domain: tech
tags: [tech, model-lifecycle, bridge, mental-model]
navOrder: 11
topicId: llm-mental-model
layer: "1"
status: bridge
nodeType: concept
owner: learn-ai
externalOwners:
  - site: llm
    url: "https://llm.zenheart.site/chapters/04-probabilistic-lm"
prerequisites: [model-lifecycle-bridge]
next: [architecture]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **Group**: 01 · Model Lifecycle (bridge group) ｜ **Exit of the group above**: you can decide knowledge ownership and pick the lowest-complexity option for a need (00-map group) ｜ **Exit of this page**: you can explain what prompts, context, and temperature really do using "parametrized conditional probability model", and you hold a correct expectation of hallucination
> **Prerequisites**: [Model Lifecycle (group guide)](./index) ｜ **Next**: [Model Architecture (Bridge)](architecture.md)

## 1. Overview

**Lead with the answer**: a large language model (LLM) is a **parametrized conditional probability model** — a set of weights trained on massive text that, given a prefix of tokens, outputs a probability distribution over the next token, samples from it, and loops. This definition is not academic decoration: every engineering judgment you make about prompt strategy, context budget, hallucination, and model selection is a corollary of it. This page only builds that mental model and maps which decisions it touches; the from-scratch implementation and loss-function derivations belong to [Learn LLM chapter 4](https://llm.zenheart.site/chapters/04-probabilistic-lm).

### Three direct corollaries

1. **A prompt invokes capability; it does not inject knowledge.** Capability is fixed into the weights during training; a prompt selects which capabilities activate and in what format. The only reliable channel for making the model "know" a fact absent from its training data is putting the fact into context ([03-context group](../03-context/)) or retrieval ([RAG](../04-grounding/rag.md)) — not repeating it insistently in instructions.
2. **The context window is a hard constraint.** The model conditions only on tokens inside the current context; anything beyond it is not "remembered", and you must carry session history explicitly and pay for it. Context engineering is therefore a discipline of trade-offs, not "fill it up".
3. **Temperature is a sampling parameter, not a creativity knob.** It flattens or sharpens the next-token sampling distribution: low temperature favors high-probability tokens (more stable), high temperature is more random (more diverse). It reshapes the output distribution; it cannot make the model produce correct answers beyond what the weights support — it does not fix capability problems.

### Correcting three common misconceptions

| Misconception | Correction |
| --- | --- |
| LLM = ChatGPT | ChatGPT is a product: LLM + post-training + system prompt + tooling and UI wrapping; the same model behaves differently in different products |
| LLM = RAG | RAG is an application-layer retrieval pattern; the model itself does not retrieve — the two combine often but are orthogonal |
| LLM = Agent | An agent is an orchestration loop (plan-act-observe) that calls a model; the model is only the reasoning part of the loop |

The dividing lines are detailed in [Site Boundaries](../00-map/site-boundaries.md); agent orchestration belongs to the 06-agent-systems group.

## 2. When to Hop

This page has no runnable artifact; the substitute action is routing your symptom to the right owner via this table:

| Symptom / question | Where to go | Why |
| --- | --- | --- |
| Want the math of "predicting the next token", what loss is | Learn LLM [chapter 4](https://llm.zenheart.site/chapters/04-probabilistic-lm) | The canonical derivation of conditional-probability language models |
| What tokens are, why billing is per token | Learn LLM [chapter 5](https://llm.zenheart.site/chapters/05-bpe) | BPE tokenization from scratch |
| How to tune temperature / top-p | This repo's [Prompt Engineering](../03-context/prompt.md) | Application-layer parameter strategy lives here |
| The model won't reliably emit JSON | This repo's [Structured Output](../02-inference-interface/structured-output.md) | It is an interface-contract problem, not a comprehension problem |
| The model "doesn't know" a fact that appeared after training | This repo's [RAG](../04-grounding/rag.md) | Missing knowledge goes through retrieval, not prompts |

## 3. Principles

One-paragraph positioning: the training objective of an LLM maximizes the likelihood of the next token over the training corpus; capability is a statistical regularity that emerges from the data distribution and scale, not rules written one by one. That is all the principles an engineer needs — cross-entropy, sampling strategy, and the Bigram-to-Transformer progression have complete from-scratch derivations in Learn LLM chapters 4–5 (retrievedAt 2026-09-01); this repo does not keep a second copy.

## 4. Engineering Decision Impact

| Engineering decision | Judgment derived from the mental model | Cost of the wrong expectation |
| --- | --- | --- |
| Model selection | Capability is fixed in the weights; sizes within a family are points on a capability-cost curve — select per task tier | Running every task on the largest model; the bill runs away |
| Prompt strategy | Instructions invoke and format existing capability; facts go into context | Baking knowledge into long instructions: unstable, non-updatable, re-billed per token |
| Context budget | Context is the only input channel and it is billed; history needs pruning and summarization | Concatenating session history wholesale; cost and latency degrade with it |
| Hallucination expectation | A probability model can generate fluent continuations that are not true; it is a product of the mechanism — managed, not "prompted away" | Expecting one "do not fabricate" line to replace grounding and evaluation |
| Output stability | Temperature reshapes the distribution, not the capability ceiling | Fixing format problems with temperature (correct fix: structured output or a better prompt) |

Maintenance rule (in place of runbooks): when Learn LLM chapters 4/5 change structure, re-verify this page's deep links and update `lastVerified`; when a new application-decision topic lands in this repo, add one row to the table above instead of expanding the principles.

## 5. Resource Library

Four-level reading route:

| Level | What to read | Why this order |
| --- | --- | --- |
| Beginner | This page + the [group guide](./index) | Build the two chains and one mental model first |
| Builder | This repo's [Prompt Engineering](../03-context/prompt.md) + [Structured Output](../02-inference-interface/structured-output.md) | Turn the mental model into interface contracts |
| Operator | [RAG](../04-grounding/rag.md) + [Evaluation](../08-production/evaluation.md) | Manage hallucination with grounding and evaluation |
| Researcher | Learn LLM chapters 4–5 + the GPT-3 paper | Descend to the original account of probabilistic models and in-context learning |

### Resource table

| Name | Level | Canonical URL | Supported claim | Next |
| --- | --- | --- | --- | --- |
| Learn LLM ch. 4 · Character language model | E | https://llm.zenheart.site/chapters/04-probabilistic-lm | Conditional probability and sampling are the core mechanism of LLMs | Hand-write Bigram → MLP |
| Learn LLM ch. 5 · BPE | E | https://llm.zenheart.site/chapters/05-bpe | The token is the unit of billing and context | Understand token cost structure |
| Learn LLM ch. 15 · Prompt and memory | E | https://llm.zenheart.site/chapters/15-prompt-memory | A systematic treatment of application-side prompt strategy | Compare with this repo's 03-context group |
| GPT-3 paper (Language Models are Few-Shot Learners) | L4 | https://arxiv.org/abs/2005.14165 | The original evidence that prompts invoke pretrained capability (in-context learning) | Read the few-shot sections |

(Learn LLM chapters verified via its chapter index; arXiv links are stable abs URLs; retrievedAt 2026-09-01.)

### Active falsification and open questions

- Falsification entry: if an engineering judgment truly requires sampling math or loss-function detail (e.g. implementing constrained decoding yourself), it belongs to Learn LLM or this repo's 02-inference-interface group, not this page — sink the claim to the right owner instead of expanding here.
- Open: the system-prompt and tooling-wrap details in the "ChatGPT product" correction drift with vendor iterations and are not item-verified; treat it as a directional correction only.

### Where learn-ai stops / where to continue

- Derivations and implementation of probabilistic language models: Learn LLM [chapter 4](https://llm.zenheart.site/chapters/04-probabilistic-lm) — this repo stops here.
- Build interfaces with this mental model: this repo's [02-inference-interface group](../02-inference-interface/).
- Next page in this group: [Model Architecture (Bridge)](architecture.md).
