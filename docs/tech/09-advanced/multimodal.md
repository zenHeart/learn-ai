---
title: Multimodal (Bridge)
description: Model-side multimodal mechanics bridge to Learn LLM; this repo keeps only the minimal application-side usage and one vision-capability case on the ZH side.
domain: tech
tags: [tech, multimodal, bridge, vision]
navOrder: 94
topicId: multimodal-bridge
layer: "9"
status: bridge
nodeType: boundary
owner: learn-ai
externalOwners:
  - site: llm
    url: https://llm.zenheart.site/
lastVerified: "2026-09-01"
listed: true
---

# Multimodal (Bridge)

> **Bridge page**: multimodal tokenization (how images become tokens), cross-modal alignment mechanics, and vision-encoder derivations live in [Learn LLM](https://llm.zenheart.site/) (multimodal chapter). This repo keeps only the minimal usage an app engineer needs.

## Minimal application-side usage

Using multimodality well in an application (vision as the example) takes four things:

1. **Message structure**: images as content blocks (base64 / URL / Files API) alongside text — see the [Model API contract](../02-inference-interface/model-api).
2. **Cost awareness**: images convert to tokens by size and enter the context budget — large images are a real cost item.
3. **Placement technique**: images perform better **before** the instruction/question; label multiple images with `Image 1:`, `Image 2:`.
4. **Capability boundaries**: spatial reasoning, precise counting, and person identification are known weak spots; high-stakes flows require human review (see [Security](../08-production/security)).

Productization note: when the same image repeats across turns, use the Files API `file_id` instead of re-sending base64 every turn.

## Pages in this section

| Page | Status | Content | Language side |
| --- | --- | --- | --- |
| [Claude Vision capabilities](/zh/tech/appendices/multimodal/claude-vision-capabilities) | case | Claude vision integration details: image sources, limits, token math, prompting tips (figures per the official docs) | ZH only |

## When to go to Learn LLM

- Want to know how images/audio are split into tokens and why size caps exist → Learn LLM, multimodal tokenization chapter
- Want to understand vision-language alignment training and where multimodal capability comes from → Learn LLM, cross-modal mechanics chapter

Vendor-side specifics (per-request image caps, file sizes, supported formats) follow the [official docs](https://platform.claude.com/docs/en/build-with-claude/vision) in real time; this repo does not maintain snapshot figures.
