---
title: Volcengine Ark learning map
description: Ark is Volcengine's model API and model square. This directory does not cover the Doubao app, Trae, or Coze.
domain: product
tags:
  - api
role: map
---

# Volcengine Ark learning map

> **Volcengine Ark** is the one-stop large-model platform on Volcengine. Official product page ([volcengine.com/product/ark](https://www.volcengine.com/product/ark)):
>
> Ark provides training, inference, evaluation, and fine-tuning, and supports the model ecosystem.
>
> This directory is the Alibaba Model Studio counterpart. It is **not** the Doubao chat app and **not** Trae.

## Audience / non-goals

**Audience:** engineers who want Doubao models in a frontend or Node service, or who want Ark quota inside Claude Code / Cursor / Trae.

**Non-goals:**

- Doubao app how-to (#79)
- Trae install (#80)
- Coze orchestration (#81)
- ECS / TOS / CDN
- Invented base URLs, model IDs, or a full price table
- Model internals (see [Learn LLM](/tech/fundamentals/LLM))

Docs (product id **82379**) are a SPA. A no-JS fetch on 2026-08-19 does not show the quick-start body. **This site does not invent the missing steps.** First HTTP call: official [quick start](https://www.volcengine.com/docs/82379/1399008).

## Landscape

```
Volcengine / ByteDance AI (this directory expands Ark only)
├── Ark — API / square / fine-tune / eval (this directory)
│   ├── Console + API Key
│   ├── Online / batch / model unit
│   ├── Ark CLI (`npm i @volcengine/ark-cli@latest -g`)
│   ├── Coding Plan / Agent Plan
│   └── Fine-tune / eval (map row)
├── Doubao app — chat (#79)
├── Trae — coding IDE (#80)
└── Coze — agent builder (#81)
```

| Official first-level door | Official URL | This site |
|---------------------------|--------------|-----------|
| **Ark** product page | [product/ark](https://www.volcengine.com/product/ark) | [Tutorial](./volcengine-ark.md) |
| Docs 82379 | [docs/82379](https://www.volcengine.com/docs/82379) | Cheatsheet |
| Intro | [1099455](https://www.volcengine.com/docs/82379/1099455) | Tutorial link |
| Quick start | [1399008](https://www.volcengine.com/docs/82379/1399008) | Main tutorial link |
| Model list / prices | Sidebar; prices [1544106](https://www.volcengine.com/docs/82379/1544106) | Cheatsheet; no full copy |
| Doubao 1.8 | Docs sidebar | Map row |
| Coding Plan | Docs sidebar | [Cookbook](./volcengine-ark-cookbook.md) |
| Third-party tools | Docs sidebar | Cookbook |
| Ark CLI | Homepage npm command | Tutorial + cheatsheet |
| API Key | [ark.volcengine.com/.../apiKey](https://ark.volcengine.com/region:cn-beijing/apiKey) | Tutorial |
| Doubao app | [doubao.com](https://www.doubao.com/) | One row → #79 |
| Trae | [trae.ai](https://www.trae.ai/) | One row → #80 |
| Coze | [coze.cn](https://www.coze.cn/) | One row → #81 |
| ECS / TOS / CDN | Other Volcengine products | **Out of scope** |

**Easy collisions:** Ark ≠ Doubao app; Ark CLI ≠ Trae; Coding Plan ≠ Agent Plan; Doubao 1.8 ≠ Doubao chat.

## Path

| Stage | Read | Goal |
|-------|------|------|
| 1. Key + CLI | [Tutorial](./volcengine-ark.md) | Open console; run the official npm command |
| 2. Third-party tools | [Cookbook](./volcengine-ark-cookbook.md) | Know which official page to open |
| 3. Lookup | [Cheatsheet](./volcengine-ark-cheatsheet.md) | URLs and quoted prices |
| 4. Names | [Glossary](./volcengine-ark-glossary.md) | Stop calling Ark “Doubao” |
