---
title: Doubao learning map
description: Doubao is ByteDance's consumer AI assistant. This directory covers the Doubao app and web UI only. Trae, Coze, and Volcengine Ark each get one row.
domain: product
tags:
  - chat
role: map
---

# Doubao learning map

> **Doubao** is ByteDance's consumer AI assistant. Official listing description ([doubao.com](https://www.doubao.com/)):
>
> Doubao is your AI chat assistant for writing, copy, translation, and coding help.
>
> This directory is the Claude.ai / Yuanbao counterpart. It is **not** Trae and **not** the Doubao model API on Volcengine Ark.

## Audience / non-goals

**Audience:** frontend engineers who want a China-region web or desktop assistant for writing, translation, PPT / sheets, and light coding questions.

**Non-goals:**

- Trae IDE install (#80)
- Coze agent building (#81)
- Volcengine Ark API / CLI (#82)
- Douyin / Feishu / Toutiao how-tos
- Invented subscription prices or a default model slug
- Model internals (see [Learn LLM](/tech/fundamentals/LLM))

## Landscape

```
ByteDance AI (this directory expands Doubao only)
├── Doubao — consumer assistant (this directory)
│   ├── Web doubao.com
│   ├── Windows / macOS desktop
│   └── Mobile app
├── Doubao phone assistant — o.doubao.com (one row)
├── ByteDance Seed — research brand (one row)
├── Trae — coding IDE (#80, one row)
├── Coze — agent builder (#81, one row)
└── Volcengine Ark — model API (#82, one row)
```

| Official first-level door | Official URL | This site |
|---------------------------|--------------|-----------|
| **Doubao** (web / clients) | [doubao.com](https://www.doubao.com/) | [Tutorial](./doubao.md) |
| Download / desktop | [download](https://www.doubao.com/download/), [download/desktop](https://www.doubao.com/download/desktop) | Tutorial |
| Doubao phone assistant | [o.doubao.com](https://o.doubao.com/) | Map row |
| ByteDance Seed | [seed.bytedance.com/zh](https://seed.bytedance.com/zh/) | Map row |
| Dola | Geo-restriction prompt on the homepage | Map row |
| Trae | [trae.ai](https://www.trae.ai/), [trae.cn](https://www.trae.cn/) | One row → #80 |
| Coze | [coze.cn](https://www.coze.cn/) | One row → #81 |
| Volcengine Ark | [volcengine.com/product/ark](https://www.volcengine.com/product/ark) | One row → #82 |
| Douyin / Feishu / Toutiao | — | **Out of scope** |

**Easy collisions:**

- **Doubao ≠ Trae.** Doubao is a chat assistant. Trae is a coding IDE.
- **Doubao app ≠ Doubao model API.** The API lives on Volcengine Ark.
- **Doubao ≠ Coze.** Coze is the agent-building platform.
- **Doubao ≠ Doubao phone assistant.** `o.doubao.com` is a hardware / system-assistant line.
- **Homepage Seedance 2.0 ≠ desktop Seedance 2.5.** Quote both official strings. Do not pick a winner.

### Quick decision

```
What do you need?
├── Chat, write, translate, PPT, Excel, image / video in a browser or desktop app
│   └── → Doubao (this directory)
├── Edit a real repo
│   └── → Trae (#80)
├── Ship an agent / workflow
│   └── → Coze (#81)
├── Call Doubao models from your own frontend or Node service
│   └── → Volcengine Ark (#82)
└── Douyin / Feishu itself
    └── → Out of scope
```

## Path

| Stage | Read | Goal |
|-------|------|------|
| 1. Open and chat | [Tutorial](./doubao.md) | First message on web or desktop |
| 2. Look up URLs | [Cheatsheet](./doubao-cheatsheet.md) | Downloads, stores, sibling doors |
| 3. Names | [Glossary](./doubao-glossary.md) | Stop calling Trae / Ark “Doubao” |

There is no official how-to tree. **No cookbook.**

## Capability table (official pages only)

| Capability | Official source |
|------------|-----------------|
| Chat, writing, copy, translation, coding helper | [Homepage description](https://www.doubao.com/) |
| Seedance 2.0 video generation, free after login | Homepage / download meta |
| Writing, translation, one-click PPT, Excel | [Desktop landing](https://www.doubao.com/download/desktop) |
| Seedream 5.0 / Seedance 2.5 (Pro) | Desktop landing |
| Built-in planning Agent | Desktop landing |

Pricing: no official Doubao price table found on 2026-08-19. Do not copy third-party quota numbers.
