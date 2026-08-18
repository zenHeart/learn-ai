---
title: GLM Coding Plan glossary
description: What the plan is and is not: subscription vs chat vs metered API, credits, and the coding endpoint.
domain: product
tags:
  - coding-plan
role: glossary
---

# GLM Coding Plan glossary

No steps. Split the colliding names, then the cheatsheet rows make sense. Which door to open: [learning map](./index.md).

## How the pieces sit

```
Z.ai / ChatGLM          chat products (#74)
        │
Standard Model API      /api/paas/v4, your own apps
        │
GLM Coding Plan         subscription: GLM only inside listed tools
        ├── Coding agents (Claude Code, Cursor, …)
        ├── General-purpose agents (OpenClaw, …) best-effort
        └── Coding Tool Helper     loader, not an agent
```

## GLM Coding Plan

**What it is:** “A subscription package designed specifically for AI-powered coding” ([Overview](https://docs.z.ai/devpack/overview)).

**Why it exists:** Use GLM inside Claude Code / Cursor / other listed agents under a credit cap, instead of paying the general API per token.

**What it is not:** Z.ai chat, ChatGLM, a first-party terminal agent, or a general-purpose API pack.

## Supported tools

**What it is:** The official Coding Agent and general-purpose lists on [tool/others](https://docs.z.ai/devpack/tool/others). Off-list use does not get plan benefits.

**Why it exists:** Coding agents are expensive. The vendor keeps plan capacity on named clients plus dedicated endpoints.

**What it is not:** “Any client that accepts a Base URL.” The China and global lists differ. Do not copy one onto the other.

## Coding endpoint

**What it is:** Plan-only Anthropic / OpenAI URLs on `api.z.ai` (`/api/anthropic`, `/api/coding/paas/v4`, `/api/v1`).

**Why it exists:** The same key aimed at `/api/paas/v4` is the general API. The Cursor page calls that out explicitly.

**What it is not:** `open.bigmodel.cn`. That is the China twin. Keys and hosts stay in their region.

## Credits

**What it is:** A 5-hour cap and a weekly cap. Models burn credits from tokens × multipliers / 10,000. MCP burns credits per call.

**Why it exists:** One ledger across peak / off-peak, several models, and MCP.

**What it is not:** Wallet cash. China Overview: when plan credits run out, wait for the next 5-hour window; other packs / balance are not drained.

## Best-effort agents

**What it is:** General-purpose tools (OpenClaw, Hermes Agent, SillyTavern on the global list). Official: served on a best-effort basis; high load may rate-limit. China Overview names this **secondary scheduling** and gives Coding Agent preemption.

**Why it exists:** Most plan traffic is coding. Shared capacity prefers coding agents.

**What it is not:** “OpenClaw is unsupported.” It is listed; it is not first-class.

## Team Plan key

**What it is:** The credential Team members copy from Team Coding Plan > My Plan. “Not interchangeable with other Z.AI's API Keys” ([Quick Start](https://docs.z.ai/devpack/quick-start)).

**Why it exists:** Seats and org billing must not mix with a personal key.

**What it is not:** The platform key the admin already had before buying seats.

## Coding Tool Helper

**What it is:** CLI `@z_ai/coding-helper` (`coding-helper` / `chelper`). Loads the plan into Claude Code, OpenCode, Crush, and Factory Droid.

**Why it exists:** Avoid hand-editing `settings.json` and MCP.

**What it is not:** A coding agent. It does not auto-wire Cursor.

## Server-side model mapping

**What it is:** After Claude Code is pointed at the plan, the UI may still show Opus / Sonnet / Haiku while the server maps them to GLM (China Claude page; global page documents the env mapping).

**Why it exists:** Keep the Claude Code UI. Hard-coded mappings go stale when the plan default model changes.

**What it is not:** Anthropic inference. `/status` should show `glm-*`.

## Global site vs China site

**What it is:** Global = `docs.z.ai/devpack` + `api.z.ai` + `glm_coding_plan_global`. China = `docs.bigmodel.cn/cn/coding-plan` + `open.bigmodel.cn` + `glm_coding_plan_china`.

**Why it exists:** Different keys, hosts, and allow-lists.

**What it is not:** Two skins of Z.ai chat.
