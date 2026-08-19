---
title: Volcengine Ark tutorial
description: Open the Ark console for an API Key, follow official docs for the first call, or install the official CLI. No invented base URL.
domain: product
tags:
  - api
role: tutorial
---

# Volcengine Ark tutorial

> Product page: [volcengine.com/product/ark](https://www.volcengine.com/product/ark). First HTTP call: official [quick start](https://www.volcengine.com/docs/82379/1399008). This page does not invent endpoints or model IDs.

## Goals and non-goals

**Audience:** frontend / Node engineers wiring Doubao models.

**You will:** open the API Key page, know where the docs tree lives, and be able to install the official CLI.

**You will not:** treat the Doubao app as the console, treat Trae as Ark, or paste a stale model table.

## Prerequisites

- A Volcengine account.
- npm, if you want the CLI.

## Open it in 15 minutes

### 1. Get an API Key

Open [Get API KEY](https://ark.volcengine.com/region:cn-beijing/apiKey) (linked from the Volcengine homepage next to Ark).

Create-key clicks and project switching follow the official “get and configure API Key” doc. This page does not invent a SPA click path.

### 2. First call = official page

Open [quick start](https://www.volcengine.com/docs/82379/1399008) (updated 2026-01-30). Pick models from the official **模型列表** sidebar. Do not copy IDs from this site.

<!-- TODO: 待核实 --> The no-JS scrape of quick start is empty. Do not fill `base_url` from a third-party blog.

### 3. Optional: Ark CLI

Volcengine homepage, verbatim:

```bash
npm i @volcengine/ark-cli@latest -g
```

Product page: the official CLI does auth, model calls, and resource management; it supports Claude Code, Cursor, and TRAE.

Subcommands follow the official guide. This page does not invent flags.

## Official surface (docs sidebar, 2026-08-19)

| Group | Sidebar items | This site |
|-------|---------------|-----------|
| Start | Intro, quick start, model list, prices, Doubao 1.8 | Links out |
| Invoke | Text, multimodal, image, video, domain, tools | Official pages |
| Advanced | Third-party tools, Responses API | [Cookbook](./volcengine-ark-cookbook.md) |
| Deploy | Online / low-latency / unit / batch | Map row |
| Advanced capability | Fine-tune | Map row |
| Coding Plan | Overview, quick start, coding tools | Cookbook |

## Next

- [Cookbook](./volcengine-ark-cookbook.md)
- [Cheatsheet](./volcengine-ark-cheatsheet.md)
- [Learn LLM](/tech/fundamentals/LLM)
