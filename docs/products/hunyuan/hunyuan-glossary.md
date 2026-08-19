---
title: Tencent Hunyuan glossary
description: "No how-to. Separate Hy, TokenHub, Yuanbao, and CodeBuddy, then the two cloud doc trees and three thinking vocabularies."
domain: product
tags:
  - hunyuan
  - llm-api
role: glossary
---

# Tencent Hunyuan glossary

No procedures. If you only need a door, use the [learning map](./index.md).

## Hy / Hunyuan

**What it is:** Tencent’s current brand for the self-developed model family. [hunyuan.tencent.com](https://hunyuan.tencent.com/) and [hy.tencent.com](https://hy.tencent.com/) are the same site. International copy has said “Tencent Hy, formerly known as Tencent Hunyuan”.

**What it is not:** Yuanbao the app, a TokenHub account, or an executable.

Repos, papers, and the older cloud product still say Hunyuan. Both names must map to an official page. Do not invent a third product name like “Hunyuan 3.0” — the current flagship LM is **Hy3**.

Internals (why MoE, what MTP is) belong in [Learn LLM](https://llm.zenheart.site/chapters/).

## Hy3

**What it is:** Flagship language model shipped 2026-07-06. TokenHub slug `hy3`. Open weights at [Tencent-Hunyuan/Hy3](https://github.com/Tencent-Hunyuan/Hy3): 295B total, 21B active, 256K context, Apache-2.0.

Hosted capabilities ([model list](https://cloud.tencent.com/document/product/1823/130051)): retained thinking, structured output, function calling, cache. The product page adds Coding / long-context / Agent.

**What it is not:**

- Not `hy3-preview` (official retire date 2026-08-31).
- Not the image / video / 3D models.
- Not a button inside CodeBuddy.

## TokenHub

**What it is:** Tencent Cloud’s “LLM service platform”, product tree **1823**. Official overview: one door that **bundles Hunyuan and third-party models**. Calling Hy is one line of business.

**Why the name matters:** In 2026 the Hy3 call guide, prices, keys, and Claude Code wiring all live on this tree. Calling it “the Hunyuan console” hides the multi-vendor catalog and collides with tree 1729.

Auth is a TokenHub API key, not a random CAM SecretId/SecretKey.

## Two cloud doc trees

| Tree | ID | How to use it now |
|------|-----|-------------------|
| TokenHub | 1823 | **Primary source here.** Hy3, prices, OpenAI-compatible endpoint |
| Tencent Hunyuan LLM | 1729 | Still online. Still shows older Hunyuan-T1 / TurboS specs |

[cloud.tencent.com/product/hunyuan](https://cloud.tencent.com/product/hunyuan) still scrapes as the older lineup; [product/tclm](https://cloud.tencent.com/product/tclm) already features Hy3. When marketing pages disagree, **TokenHub docs + hunyuan.tencent.com win**, and the conflict is named in the prose.

## Why thinking has three vocabularies

Not three products — three official pages, three JSON shapes:

| Source | How it is spelled |
|--------|-------------------|
| TokenHub call guide | `thinking: { type: "enabled" }`; `reasoning_effort` (default `low` on `hy3`) |
| tclm product page | `no_think` / `think_low` / `think_high` |
| Hy3 open README | `extra_body.chat_template_kwargs.reasoning_effort = no_think \| low \| high` (default `no_think`) |

This site does not guess that TokenHub `low` equals a particular open-weight enum. Copy the fields from the page you are actually calling. With `tools` present, TokenHub maps `low` to `high` (call guide).

## Sibling products are not Hunyuan

| Name | Official positioning | Entry | This site |
|------|----------------------|-------|-----------|
| Yuanbao | “Tencent’s all-in-one AI assistant… already using the latest Hunyuan Hy3 model” | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | #76 |
| CodeBuddy | Tencent Cloud coding assistant (IDE / CLI) | [codebuddy.cn](https://www.codebuddy.cn/) | #78 |
| WorkBuddy | Office agent workbench | [workbuddy.cn](https://www.workbuddy.cn/) | Map row |
| ima | “AI knowledge steward based on a knowledge base” | [ima.qq.com](https://ima.qq.com/) | Map row |

They **consume** Hunyuan (or other models). They are not “Hunyuan open capabilities”. The Hy3 README names CodeBuddy / Cline / KiloCode as evaluation scaffolds. That does not make Hunyuan equal to CodeBuddy.

## Open-source names vs API slugs

The [Tencent-Hunyuan](https://github.com/Tencent-Hunyuan) org still uses Hunyuan* repo names (HunyuanVideo, HunyuanImage-3.0, Hunyuan3D-2.1). TokenHub call parameters prefer `hy-*` / `hy3`.

Reconcile against the page you are reading. Do not treat similar names as the same `model` field.

## Internals this handbook will not teach

MoE routing, MTP speculative decoding, quantization training, RL post-training: the README has sections; they are model internals. Use [LLM fundamentals](../../tech/fundamentals/LLM.md). This handbook only keeps official **spec numbers and serve commands**.
