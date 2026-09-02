---
title: "Reasoning Models and Test-Time Compute (Bridge)"
description: "Letting the model think longer' is a performance axis alongside model scale — this page gives app engineers positional sense: thinking and acting are two kinds of spend (when to use a reasoning model vs an agent loop), latency structure, billing, and stop conditions; training-side mechanics bridge to Learn LLM."
domain: tech
tags: [tech, reasoning, test-time-compute, bridge]
navOrder: 92
topicId: reasoning-ttc
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

# Reasoning Models and Test-Time Compute (Bridge)

> **Bridge page**: the training mechanics of reasoning models (the o1/R1 line) — long chain-of-thought RL, GRPO, verifiable rewards — are derived in [Learn LLM](https://llm.zenheart.site/) (Chapter 10 · Post-training; inference-side budgets in Chapter 9). This repo keeps only the application-side positional sense: **it is a new consumable, and you decide when to buy it, how much, and how to stop.**

## 1. Overview

**What problem it solves**: traditional scaling spends money at training time (bigger models); test-time compute spends it at inference — repeated sampling, search, longer thinking — buying higher per-request quality. Reasoning models productize this axis: the same model, the longer it thinks (more reasoning tokens), the higher the average quality.

**Why app engineers need positional sense**: this is not "switch to a stronger model" — it adds a **runtime-tunable budget parameter**. It directly changes three things: the trade space of model selection (small model thinking longer vs large model answering directly), the unit cost structure (billed by amount of thinking), and the product interaction contract (latency and stop conditions).

## 2. Usage

### Thinking and acting are two kinds of spend

A reasoning model's "thinking" (extended inference inside the model) and an agent's "action loop" (calling tools, observing, deciding again) are **two different quality levers** — both spend inference budget, but they are not interchangeable:

| Lever | Where it spends | Good at | Not good at |
| --- | --- | --- | --- |
| Thinking (reasoning / TTC) | reasoning tokens within one call | problems solvable "in its head": math, planning, code logic, multi-constraint trade-offs | needs new facts (→ retrieval) or needs to change external state (→ tools) |
| Action loop (agent loop) | multiple calls + tool execution | interacting with the external world: querying data, mutating systems, long flows | closed-form reasoning problems — costlier and slower than thinking |

Selection order: **if it can be thought through in one pass, do not start a loop; loops that need new information or side effects cannot be replaced by thinking.** They can compose (short thinking before each action step), but each layer needs its own budget and stop condition.

### Three direct product impacts

1. **Latency structure**: thinking time varies with difficulty and can be very long — time-to-first-token is no longer controllable. Either surface an explicit "thinking" state in the interaction, or cap the thinking.
2. **Billing**: reasoning tokens are a real cost item, and the model decides the amount — cost shifts from "per request" to "per request × amount of thinking"; budget circuit breakers (→ [Cost and Performance](../08-production/cost-performance)) go from optional to mandatory.
3. **Stop conditions**: when to cut off thinking is a product decision — timeout, token cap, or budget-forcing-style mechanisms. A thinking call without a stop condition will burn money unboundedly on pathological inputs.

## 3. Principles

(Deliberately minimal: training and scaling-law derivations belong to Learn LLM.)

One-line route: repeated sampling raises coverage (more samples solve more problems, but a verifier is needed to cash in) → allocating inference budget by difficulty beats uniform allocation → RL trains "internalized long thinking" (the o1/R1 line) → thinking length becomes an externally controllable knob. Deep water: Learn LLM Chapter 10 (post-training/RL), Chapter 9 (inference and budgets).

## 4. Development

**Symptom → where to go**:

- "Latency variance is wild, occasional runaway responses" → this section's stance: set stop conditions on thinking; the engineering landing point is circuit breakers and budgets in [Cost and Performance](../08-production/cost-performance).
- "The model keeps making single-step mistakes; want it to think more" → classify the error first: closed-form reasoning → reasoning model / higher thinking budget; missing facts → [04-grounding](../04-grounding/); needs execution → [05-action](../05-action/tool-calling).
- "The agent maxes out thinking at every step and costs explode" → tiered budgets: high for planning steps, low for execution steps — landing in [06-agent-systems](../06-agent-systems/agent-runtime) runtime config.
- Want to understand how RL produces reasoning behavior → Learn LLM Chapter 10.

## 5. Resource Library

Primary sources (identifiers only; no content re-narrated):

| Name | Origin | Identifier |
| --- | --- | --- |
| Large Language Monkeys (repeated-sampling scaling) | Stanford / Google DeepMind | arXiv:2407.21787 |
| Scaling LLM Test-Time Compute Optimally | UC Berkeley / Google DeepMind | arXiv:2408.03314 |
| DeepSeek-R1 (reasoning via pure RL) | DeepSeek-AI | arXiv:2501.12948 |
| s1: Simple test-time scaling (budget forcing) | Stanford / UW et al. | arXiv:2501.19393 |

(retrievedAt 2026-09-01; current parameters and pricing of each vendor's reasoning models follow their official docs in real time.)

### Where learn-ai stops / where to go next

- Long-CoT RL, GRPO, inference scaling laws: [Learn LLM](https://llm.zenheart.site/) Chapter 10 (Post-training).
- Engineering closure for inference budgets and latency: [Cost and Performance](../08-production/cost-performance), [Deployment and Release](../08-production/deployment).
