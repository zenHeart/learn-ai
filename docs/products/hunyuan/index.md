---
title: Tencent Hunyuan learning map
description: "Hunyuan (Tencent Hy) is Tencent's model and open-capability line. It is not Yuanbao and not CodeBuddy. This directory covers models, TokenHub, and open weights only."
domain: product
tags:
  - hunyuan
  - llm-api
role: map
---

# Tencent Hunyuan learning map

> **Hunyuan / Tencent Hy** is Tencent's self-developed model family and the channels that open those models to developers. The research site is [hunyuan.tencent.com](https://hunyuan.tencent.com/). Hosted inference goes through [TokenHub](https://cloud.tencent.com/document/product/1823).
>
> This directory covers **models and open capabilities only**. Yuanbao, CodeBuddy, WorkBuddy, and ima are sibling products. They get one row on the family map.

## Product landscape

Several Tencent doors share the words Hunyuan or Hy. They are **not** one product with four skins.

```
Tencent AI (Hunyuan-related official surfaces)
├── Hunyuan / Hy — models, research, open weights (this handbook)
│   ├── Hy models (Hy3, Hy-MT2, image / video / 3D / vision / ASR)
│   ├── Research (Hy3 note, Hyra, …)
│   ├── Co-design / International (site chrome, not a call surface)
│   ├── Try Hy (Hy AI Studio)
│   └── Open weights (GitHub Tencent-Hunyuan / Hugging Face tencent/Hy3)
├── TokenHub — cloud model gateway (serves Hy and third-party models)
├── Tencent Hunyuan LLM (cloud product 1729, older API tree)
├── Yuanbao — consumer assistant (runs Hy3)     → issue #76
├── CodeBuddy — coding IDE / CLI                → issue #78
├── WorkBuddy — office agent
└── ima — knowledge steward
```

| Surface | What it is | Official URL | This site |
|---------|------------|--------------|-----------|
| **Hy models / Hunyuan site** | Model and research home | [hunyuan.tencent.com](https://hunyuan.tencent.com/) | This page + [tutorial](./hunyuan.md) |
| **TokenHub** | Unified LLM API (Hy + third parties) | [Product](https://cloud.tencent.com/product/tokenhub) / [docs 1823](https://cloud.tencent.com/document/product/1823) | [Tutorial](./hunyuan.md) / [Cookbook](./hunyuan-cookbook.md) / [Cheatsheet](./hunyuan-cheatsheet.md) |
| Try Hy (AI Studio) | Browser playground | [aistudio.tencent.com](https://aistudio.tencent.com/) | One tutorial section |
| Open weights | Apache-2.0 checkpoints | [Tencent-Hunyuan](https://github.com/Tencent-Hunyuan) / [tencent/Hy3](https://huggingface.co/tencent/Hy3) | Tutorial section + cheatsheet |
| Research | Tech notes | [research](https://hunyuan.tencent.com/research) / [Hy3](https://hy.tencent.com/research/hy3) | Map row |
| Co-design / International | First-level site nav | [hunyuan.tencent.com](https://hunyuan.tencent.com/) header | Map row; not a new product |
| Hunyuan cloud product (1729) | Older dedicated API tree | [product/hunyuan](https://cloud.tencent.com/product/hunyuan) / [docs 1729](https://cloud.tencent.com/document/product/1729) | Map row. Hy3 prose lives on TokenHub |
| Yuanbao | All-in-one assistant that already uses Hy3 | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | Map row → #76 |
| CodeBuddy | Tencent Cloud coding assistant | [codebuddy.cn](https://www.codebuddy.cn/) | Map row → #78 |
| WorkBuddy | Office agent workbench | [workbuddy.cn](https://www.workbuddy.cn/) / [cloud product](https://cloud.tencent.com/product/workbuddy) | Map row |
| ima | Knowledge-base steward | [ima.qq.com](https://ima.qq.com/) | Map row |
| Jobs / face ID / CVM / SMS | Non-topic nav items | — | **Out of scope** |

**Name collisions** (full write-up in the [glossary](./hunyuan-glossary.md)):

- **Hunyuan / Hy ≠ Yuanbao.** The model family is not the consumer chat app.
- **Hy3 ≠ TokenHub ≠ AI Studio.** Model, gateway, playground.
- **There is no first-party `hunyuan` CLI.** The coding agent product is CodeBuddy.
- **Open-source repo names ≠ TokenHub `model` slugs.**

### Quick decision

```
What do I want?
├── Try Hy3 / translation / multimodal in a browser
│   └── → Hy AI Studio (aistudio.tencent.com)
├── Call Hunyuan from my own front end / Node service
│   └── → TokenHub, model = hy3 (this handbook)
├── Point Claude Code / Cursor at Hy3
│   └── → TokenHub “connect AI tools”; Hy3 walkthrough is official 1823/131903
│       └── CodeBuddy itself is #78, not this directory
├── Serve open weights
│   └── → github.com/Tencent-Hunyuan/Hy3 (official: 8-GPU class)
├── Chat / search / write, no code
│   └── → Yuanbao (#76)
├── IDE completion / repo agent
│   └── → CodeBuddy (#78)
└── CVM / COS / SMS
    └── → Out of scope
```

Sources: [hunyuan.tencent.com](https://hunyuan.tencent.com/), [TokenHub docs](https://cloud.tencent.com/document/product/1823), [Hy call guide](https://cloud.tencent.com/document/product/1823/132252).

## When this handbook is worth it

**Read it when**

- You want an OpenAI-compatible domestic model from TypeScript, and the official door is TokenHub `hy3`.
- You already use Claude Code / Cursor and want Hy3 on the same harness (official connect pages exist).
- You need to compare hosted `hy3` with the open checkpoint.

**Skip it when**

- You want Yuanbao the chat app → #76.
- You want CodeBuddy the coding product → #78.
- You want MoE / MTP / attention internals → [LLM fundamentals](../../tech/fundamentals/LLM.md) and [Learn LLM](https://llm.zenheart.site/chapters/).

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Pick a door | This map | Stop mixing Yuanbao / TokenHub / Hy3 |
| 2. First call | [Tutorial](./hunyuan.md) | A `hy3` completion in 15 minutes |
| 3. Wire it in | [Cookbook](./hunyuan-cookbook.md) | Streaming, thinking, tools, Claude Code |
| 4. Look up | [Cheatsheet](./hunyuan-cheatsheet.md) | Slugs, prices, endpoints |
| 5. Names | [Glossary](./hunyuan-glossary.md) | Which official tree wins |

## Model snapshot (Hy-family slugs only)

Canonical table: [TokenHub model list](https://cloud.tencent.com/document/product/1823/130051). Prices: [pricing](https://cloud.tencent.com/document/product/1823/130055) (2026-08-14).

| Official name | `model` | Window (in / out) | Official one-liner |
|---------------|---------|-------------------|--------------------|
| Hy3 | `hy3` | 192k / 128k (256k context) | Real-world Coding / long-context / Agent |
| Hy3 preview | `hy3-preview` | same | **Retires 2026-08-31** |
| Hy-MT2-Pro / Plus / Lite | `hy-mt2-*` | 4k / 4k | Translation |
| Hy-Role / Latest | `hy-role` / `hunyuan-role-latest` | 28k / 4k | Role-play |
| HY-Image-V3.0 | `hy-image-v3.0` | — | T2I / I2I |
| HY-3D-3.1 | `hy-3d-3.1` | — | T23D / I23D |

Hosted Hy3: **1 / 4 / 0.25** CNY per million tokens (input / output / cache hit). Open weights are a separate path: [tutorial](./hunyuan.md#open-weights).

## Out of scope

- Full Yuanbao / CodeBuddy / WorkBuddy / ima tutorials.
- Picking DeepSeek / Kimi / GLM on TokenHub.
- Non-AI Tencent Cloud (CVM, COS, SMS, domains).
- Model internals.

## Related

- [Tutorial](./hunyuan.md)
- [Cookbook](./hunyuan-cookbook.md)
- [Cheatsheet](./hunyuan-cheatsheet.md)
- [Glossary](./hunyuan-glossary.md)
- [LLM fundamentals](../../tech/fundamentals/LLM.md)
- [All products](../ai-coding/)
