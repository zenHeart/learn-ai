---
title: Advanced Group Guide
description: "Four bridge cards on the frontier: interpretability, reasoning & test-time compute, MoE and new architectures, multimodal — positioning and decision impact only; derivations live in Learn LLM."
domain: tech
tags: [tech, advanced, bridge, navigation]
navOrder: 90
topicId: advanced-guide
layer: "9"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: []
next: [interpretability, reasoning-ttc, moe-frontier, multimodal]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---
> **Group**: Advanced (bridge) | **Previous group exit**: run long-term with release gates and versioning | **This page exit**: know which engineering decision this topic affects, and when to go to Learn LLM

# Advanced Group Guide

> **Group**: Advanced (bridge group) | **Previous group exit**: run long-term with release gates and versioning discipline | **This group exit**: know which engineering decision each frontier topic affects, and when to jump to Learn LLM

## 1. Overview

**BLUF**: none of these four topics ask you to master derivations; they ask for *positional sense* — they decide which model you pick, what latency structure to expect, why some outputs "think" for a long time. Every page is a bridge card: what problem it solves / which decision it affects / when to jump to [Learn LLM](https://llm.zenheart.site/).

| Card | One-line positioning | Mostly affects |
| --- | --- | --- |
| [Interpretability](./interpretability) | Why the model produced this output | Debugging expectations, compliance narratives |
| [Reasoning · test-time compute](./reasoning-ttc) | "Thinking longer" is a performance axis | Latency structure, billing, stop conditions |
| [MoE / frontier architectures](./moe-frontier) | Sparsity and long-context architectures | Model choice and cost curves |
| [Multimodal](./multimodal) | Cross-modal inputs and outputs | Ingest pipeline and product shape |

**Admission rule**: this group only accepts *bridge cards to Learn LLM's deep end*, each with an explicit engineering decision impact; pure research content stays out, so the group cannot decay into a catch-all.

## 2. Usage

Unsure whether a frontier term matters to you → find a row above, read the card (each ≤130 lines), then decide whether to descend into Learn LLM. A real-world vision case pairs with the multimodal card (zh-only: [/zh/tech/09-advanced/multimodal-vision-case (zh)](/zh/tech/09-advanced/multimodal-vision-case)).

## 3. Principles

This group carries no derivation body; Learn LLM is the canonical owner. Any mechanism name inside a card gets one positioning sentence, nothing more.

## 4. Development

"Development" here means the decision-impact table: each card lists *what you change when the mechanism shifts* (model choice / budget / stop conditions / data pipeline).

## 5. Resource Library

Each card's library lists primary sources (arXiv IDs, official statements) and the Learn LLM chapter direction; the evidence-level legend lives in [Site boundaries](../00-map/site-boundaries).
