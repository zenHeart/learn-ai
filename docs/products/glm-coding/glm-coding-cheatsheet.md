---
title: GLM Coding Plan cheatsheet
description: Global endpoints, credits, supported-tool list, and the official npx @z_ai/coding-helper commands.
domain: product
tags:
  - coding-plan
role: cheatsheet
---

# GLM Coding Plan cheatsheet

Look up, do not study. Default region: **global** (`api.z.ai`). China hosts live in the Chinese handbook under `docs/zh/products/glm-coding/`.

Last verified: 2026-08-19.

## Endpoints

Source: [Quick Start](https://docs.z.ai/devpack/quick-start), [Tool Integration](https://docs.z.ai/devpack/tool/others).

| Protocol | Base URL |
|----------|----------|
| Anthropic Messages | `https://api.z.ai/api/anthropic` |
| OpenAI Chat Completions | `https://api.z.ai/api/coding/paas/v4` |
| OpenAI Responses | `https://api.z.ai/api/v1` |
| General API (not the plan) | `https://api.z.ai/api/paas/v4` |

Wrong host → plan quota does not apply.

## Individual credits

Source: [Overview](https://docs.z.ai/devpack/overview).

| Plan | 5-hour credits | Weekly credits |
|------|----------------|----------------|
| Lite | 2,000 | 10,000 |
| Pro | 12,000 | 60,000 |
| Max | 28,000 | 140,000 |

- 5-hour credits reset 5 hours after consumption.
- Weekly credits reset every 7 days from subscribe time.
- Model credits = (input × input multiplier + cached input × cached multiplier + output × output multiplier) / 10,000
- MCP credits = calls × output multiplier
- Off-peak model usage is **50%** of the standard credit rate. Peak: Monday–Friday 14:00–18:00 Singapore Time (UTC+8).

| Product | Input | Cached input | Output |
|---------|-------|--------------|--------|
| GLM-5.3 | 6.9 | 1.7 | 24 |
| GLM-5-Turbo | 5.7 | 1.5 | 21 |
| GLM-4.7 | 4.6 | 1.2 | 16 |
| GLM-4.6V (Vision MCP) | 1.2 | 0.3 | 2.7 |
| Web Search / Web Reader / Zread MCP | — | — | 1.2 |

Estimated weekly tokens on GLM-5.3 at 90.9% cache hit: Lite 43–87M; Pro 263–526M; Max 613–1226M.

Overview list price quote: “Starting at just 18 USD per month”. Current SKUs: [z.ai/subscribe](https://z.ai/subscribe).

## Supported tools (global)

Source: [tool/others](https://docs.z.ai/devpack/tool/others), 2026-08-19.

**Coding Agent:** ZCode, Claude Code, Claude for IDE, Codex, OpenCode, Pi, Cursor, Cline, TRAE, Qoder, Droid, Kilo Code, Roo Code, Crush, Goose, Eigent.

**General-purpose (best-effort):** OpenClaw, Hermes Agent, SillyTavern.

This list is **not** identical to the China allow-list (China has Lingma / CodeBuddy / Cherry Studio / MonkeyCode; global has Codex / Pi / Eigent / SillyTavern).

Helper auto-load only: Claude Code, OpenCode, Crush, Factory Droid.

## Coding Tool Helper

Package: [`@z_ai/coding-helper`](https://www.npmjs.com/package/@z_ai/coding-helper). Node.js >= v18.0.0. Bins: `coding-helper`, `chelper`.

```bash
npx @z_ai/coding-helper
npm install -g @z_ai/coding-helper
coding-helper
coding-helper init
coding-helper lang show
coding-helper lang set en_US
coding-helper auth
coding-helper auth glm_coding_plan_global <token>
coding-helper auth revoke
coding-helper auth reload claude
coding-helper doctor
coding-helper --help
coding-helper --version
```

China auth flag is `glm_coding_plan_china` (do not use it on a global key).

## Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude --version
claude
claude update
curl -O "https://cdn.bigmodel.cn/install/claude_code_zai_env.sh" && bash ./claude_code_zai_env.sh
```

The curl installer is **macOS / Linux only** on the China twin page; the global Claude page publishes the same script URL.

`settings.json` env from [tool/claude](https://docs.z.ai/devpack/tool/claude): `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic`, `API_TIMEOUT_MS=3000000`.

## Cursor

| Item | Global official text |
|------|----------------------|
| Eligibility | Cursor Pro and higher |
| Protocol | OpenAI |
| Base URL | `https://api.z.ai/api/coding/paas/v4` (not `/api/paas/v4`) |
| Model name | Uppercase; examples `GLM-4.7`, `GLM-4.5-air` |

## Glossary index

| Term | Hook |
|------|------|
| [GLM Coding Plan](./glm-coding-glossary.md#glm-coding-plan) | Subscription, not a chat product |
| [Supported tools](./glm-coding-glossary.md#supported-tools) | Off-list calls do not use plan quota |
| [Coding endpoint](./glm-coding-glossary.md#coding-endpoint) | Not the general `/api/paas/v4` |
| [Credits](./glm-coding-glossary.md#credits) | 5-hour + weekly caps |
| [Best-effort / secondary scheduling](./glm-coding-glossary.md#best-effort-agents) | OpenClaw-class tools |
| [Team Plan key](./glm-coding-glossary.md#team-plan-key) | Not interchangeable |
| [Coding Tool Helper](./glm-coding-glossary.md#coding-tool-helper) | Loader, not an agent |

## High-quality sources

Last verified: 2026-08-19.

| Source | Why |
|--------|-----|
| [docs.z.ai/devpack/overview](https://docs.z.ai/devpack/overview) | Models, credits, price quote |
| [docs.z.ai/devpack/quick-start](https://docs.z.ai/devpack/quick-start) | Subscribe + keys |
| [docs.z.ai/devpack/tool/others](https://docs.z.ai/devpack/tool/others) | Allow-list + endpoints |
| [docs.z.ai/devpack/tool/claude](https://docs.z.ai/devpack/tool/claude) | Claude Code env |
| [docs.z.ai/devpack/tool/cursor](https://docs.z.ai/devpack/tool/cursor) | Cursor custom model |
| [docs.z.ai/devpack/extension/coding-tool-helper](https://docs.z.ai/devpack/extension/coding-tool-helper) | Helper commands |
| [docs.z.ai/devpack/usage-policy](https://docs.z.ai/devpack/usage-policy) | Account rules |
| [docs.z.ai/llms.txt](https://docs.z.ai/llms.txt) | Full docs index |
| [npm @z_ai/coding-helper](https://www.npmjs.com/package/@z_ai/coding-helper) | Package name + bins |
| [China overview](https://docs.bigmodel.cn/cn/coding-plan/overview) | CN credits + designated tools |
| [z.ai/subscribe](https://z.ai/subscribe) | Live SKUs |

## Related pages

- [Learning map](./index.md)
- [Tutorial](./glm-coding.md)
- [Cookbook](./glm-coding-cookbook.md)
- [Glossary](./glm-coding-glossary.md)
