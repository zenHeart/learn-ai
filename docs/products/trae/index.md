---
title: Trae learning map
description: "TraeCode is ByteDance's AI coding IDE (IDE mode + SOLO mode). TraeWork, Doubao, Coze, and Ark are different products. This directory only covers installing TraeCode from the official download page and opening a first project."
domain: product
tags:
  - coding-agent
role: map
---

# Trae learning map

> **TraeCode** is the AI coding IDE under the TRAE brand. Official copy ([What is TraeCode?](https://docs.trae.ai/ide/what-is-trae)): a development tool deeply integrated with AI, covering coding, project understanding, debugging, and change management. You can stay in control as in a traditional IDE, or hand complex work to agents.
>
> The marketing homepage ([www.trae.ai](https://www.trae.ai/)) lists it next to **TraeWork**: **TraeCode: Your 10x AI Coding Engineer**; **TraeWork: Your Professional AI Work Assistant**. This directory expands TraeCode only.

## Audience / prerequisites

- **Who**: frontend engineers who already use a desktop IDE and want ByteDance's Cursor analogue.
- **Need**: an OS from the official [Quickstart](https://docs.trae.ai/ide/set-up-trae) / [CN getting started](https://docs.trae.cn/ide_get-started-with-trae.md) table; a TRAE account.
- **Non-goals**: no TraeWork office tutorial; no Doubao / Coze / Ark; no model internals (see Learn LLM); no invented TraeCode CLI commands (the enterprise page says **coming soon**).

## Product family

Official first-level entries first. This directory **only expands TraeCode**. Everything else is one row. Names below are copied from official pages opened 2026-08-19.

| Official name | Official URL | This site |
|---------------|--------------|-----------|
| **TraeCode** (AI coding IDE) | [www.trae.ai](https://www.trae.ai/) · [Download Center](https://www.trae.ai/download) | This directory |
| **TraeCode docs** | [docs.trae.ai · What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) · [Quickstart](https://docs.trae.ai/ide/set-up-trae) | This page · [Tutorial](./trae.md) |
| **TraeWork** | [www.trae.ai/work](https://www.trae.ai/work) · [What is TRAE Work?](https://docs.trae.ai/solo/what-is-trae-solo) | One row: office workspace, no tutorial here |
| **TraeCode Plugin** | [Enterprise](https://www.trae.ai/enterprise) (copy: VS Code, JetBrains and other mainstream editors) | One row: embed into an existing editor |
| **TRAE Enterprise** | [www.trae.ai/enterprise](https://www.trae.ai/enterprise) | One row: team sales |
| **TraeCode CLI** | Enterprise page: **coming soon** | One row: not shipped; do not invent commands |
| **TRAE Editor for Unity** | [CN tutorial](https://docs.trae.cn/ide_trae-editor-for-unity-tutorial.md) | One row: Unity plugin |
| **China site TraeCode / TraeWork** | [www.trae.cn](https://www.trae.cn/) · Quickstart links [www.trae.com.cn](https://www.trae.com.cn) · [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code) | [Tutorial · pick a surface](./trae.md#1-pick-a-surface-china-vs-international) |
| **Volcengine TRAE** | [volcengine.com/product/trae](https://www.volcengine.com/product/trae) | One row: CN cloud catalog slot |
| **Doubao** | Issue #79 | One row → forthcoming [Doubao family](/products/doubao/) |
| **Coze** | Issue #81 | One row → forthcoming [Coze family](/products/coze/) |
| **Ark (Volcengine)** | Issue #82 | One row → forthcoming [Ark family](/products/ark/) |

Sources: [www.trae.ai](https://www.trae.ai/), [docs.trae.ai header](https://docs.trae.ai/ide/what-is-trae), [Enterprise](https://www.trae.ai/enterprise), [www.trae.cn](https://www.trae.cn/), [docs.trae.cn/llms.txt](https://docs.trae.cn/llms.txt).

```
TRAE (brand)
├── TraeCode — desktop AI coding IDE (this directory)
│   ├── IDE mode (editor / terminal / debug / extensions / Git)
│   ├── SOLO mode (AI-led: plan → generate → test → preview)
│   ├── CUE / Agent / Skills / Rules / MCP
│   ├── TraeCode Plugin (VS Code / JetBrains; map row)
│   └── TraeCode CLI (official coming soon)
├── TraeWork — standalone office workspace (Web / Desktop / Mobile)
│   └── Work / Code (marketing page also lists Design)
├── TRAE Enterprise — teams
└── Same vendor, not this directory
    ├── Doubao #79
    ├── Coze #81
    └── Ark #82
```

**Names that collide:**

- **TraeCode ≠ TraeWork.** Coding IDE vs office workspace. Official: [TraeWork builds upon TraeCode's SOLO mode](https://docs.trae.ai/ide/what-is-trae).
- **SOLO mode inside TraeCode ≠ TraeWork.** SOLO is the top-left mode switch. TraeWork is a separate client (Web / Desktop / Mobile).
- **Legacy names TRAE IDE / TRAE SOLO standalone** folded into TraeCode / TraeWork. Do not install a third product.
- **CUE ≠ Cursor.** CUE is TraeCode completion / multi-line edit / next-edit prediction.
- **TraeCode Plugin ≠ the in-IDE extension marketplace.** Plugin embeds Trae into VS Code / JetBrains.
- **`trae.ai` ≠ `trae.cn` / `trae.com.cn`.** The international header has a China-site link. Login, quota, and device limits are separate.

### Quick decision: which surface?

```
What do I want to do?
├── Write / edit / debug / complete in a local repo
│   └── → TraeCode
│       ├── Fine-grained control? → IDE mode
│       ├── Natural language through to preview? → SOLO mode
│       └── Stay in VS Code / JetBrains? → TraeCode Plugin (map row)
├── Slides / docs / data / dispatch tasks across devices
│   └── → TraeWork (not this directory)
├── Team procurement, repo-index limits, SOC 2
│   └── → TRAE Enterprise
├── General chat assistant
│   └── → Doubao (#79)
├── Bots / workflows
│   └── → Coze (#81)
└── Metered model API in my own service
    └── → Ark (#82)
```

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Pick a surface | [Tutorial · China vs international](./trae.md#1-pick-a-surface-china-vs-international) | Do not mix installers or accounts |
| 2. Install and open a project | [Tutorial](./trae.md) | Official download, then a local folder or clone |
| 3. Split the two modes | [Tutorial · IDE / SOLO](./trae.md#5-switch-ide-mode-and-solo-mode) | Top-left switch; SOLO is not TraeWork |
| 4. Look up facts | [Cheatsheet](./trae-cheatsheet.md) | OS, device limit, official URLs |

## Feature lookup

Only capabilities the official docs already state.

| Capability | One line | Official page |
|------------|----------|---------------|
| IDE mode | Editor, terminal, debug, extensions, source control | [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) |
| SOLO mode | AI-led: requirements → generate → test → preview; top-left switch | [SOLO mode overview](https://docs.trae.ai/ide/solo-mode) |
| Open a project | Local folder / clone from GitHub / clone from URL | [Quickstart](https://docs.trae.ai/ide/set-up-trae) |
| CUE | Completion, chained completion, multi-line edits, next-edit prediction; smart import/rename for Py / TS / Go | [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) |
| Agents | Natural-language tasks, repo search, tools; custom agents + MCP | Same |
| Context | Files, folders, snippets, terminal, repos, doc sets, web pages | Same |
| Privacy mode | Chats / snippets / outputs not used for analysis, optimization, or training; codebase stays local | Same |
| Sandbox | Agent commands in a restricted environment | Same |
| Remote | Remote SSH, WSL | Same |
| Device limit | International **3**; China **10**. TraeWork Web does not count | [intl](https://docs.trae.ai/ide/device-limit) · [CN](https://docs.trae.cn/ide_device-limit.md) |

## Plans (official pages only)

- Current international tiers: [www.trae.ai/pricing](https://www.trae.ai/pricing) — **Lite / Pro / Pro+ / Ultra**. That page says Pro is **Free for 7 days. Then $10/month.** AI requests are billed as tokens converted to Dollar Usage against a monthly balance. Full monthly prices for Lite / Pro+ / Ultra stay on that page.
- Docs also keep [(Legacy) Plans & billing](https://docs.trae.ai/ide/billing). Do not treat the old Free/Pro request table as current.
- China-site credits: follow [docs.trae.cn](https://docs.trae.cn/llms.txt). This site does not invent CN prices.
- Enterprise: pricing page says Contact us via BytePlus; product page [Enterprise](https://www.trae.ai/enterprise).

## Next steps

1. Open the [TraeCode tutorial](./trae.md). Pick China or international, then install from the official download page.
2. OS, device limits, and URLs: [cheatsheet](./trae-cheatsheet.md).
3. Official deep-dive: [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) or [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code).
