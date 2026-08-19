---
title: GLM Coding Plan learning map
description: GLM Coding Plan is Zhipu / Z.AI’s subscription for designated coding tools. It is not Z.ai chat and not another chatbot tutorial.
domain: product
tags:
  - coding-plan
role: map
---

# GLM Coding Plan learning map

> **GLM Coding Plan** is a **subscription**. It sells quota so you can call GLM from officially listed tools such as Claude Code and Cursor. It is **not** a chat app and **not** Z.AI’s own terminal agent.
>
> Official definition ([Overview](https://docs.z.ai/devpack/overview)):
> “The GLM Coding Plan is a subscription package designed specifically for AI-powered coding.”

This English handbook follows the **global** docs (`docs.z.ai/devpack`, endpoints on `api.z.ai`). China uses `docs.bigmodel.cn` and `open.bigmodel.cn` — see the Chinese pages.

## Product landscape

Zhipu ships chat products, a metered API platform, and this “fuel for the coding assistant you already use” plan. **This directory only covers GLM Coding Plan.** ChatGLM / Z.ai chat belong in [#74](https://github.com/zenHeart/learn-ai/issues/74).

```
Zhipu / Z.AI
├── ChatGLM (Qingyan) — chatglm.cn (chat / Agent, #74)
├── Z.ai — z.ai (global chat / Agent, #74)
├── BigModel / Z.AI Model API — metered standard API
├── GLM Coding Plan — coding subscription inside listed tools (this directory)
│   ├── Individual: Lite / Pro / Max
│   ├── Team: Standard / Premium (China team docs; global Team Plan)
│   └── Loader: npx @z_ai/coding-helper (subset of CLIs only)
└── Other first-party surfaces — AutoGLM / AutoClaw / ZCode / Zread.ai …
```

| Official entry | What it is | Official URL | This site |
|----------------|------------|--------------|-----------|
| **GLM Coding Plan** | Subscription quota for listed coding tools | [z.ai/subscribe](https://z.ai/subscribe), [Overview](https://docs.z.ai/devpack/overview) | This directory |
| ChatGLM (Qingyan) | Consumer chat / Agent | [chatglm.cn](https://chatglm.cn/) | One map row; [#74](https://github.com/zenHeart/learn-ai/issues/74) |
| Z.ai | Global chat / Agent and API door | [z.ai](https://z.ai/) | One map row; [#74](https://github.com/zenHeart/learn-ai/issues/74) |
| Z.AI / BigModel API | Metered model API | [z.ai/model-api](https://z.ai/model-api), [bigmodel.cn](https://bigmodel.cn/) | One map row; not this plan’s quota |
| ZCode | First-party tool that can consume the plan | [devpack/tool/zcode](https://docs.z.ai/devpack/tool/zcode) | One map row; no agent tutorial here |
| AutoGLM | Same-vendor Agent | [zhipuai.cn](https://www.zhipuai.cn/) | One map row |
| AutoClaw | Local OpenClaw client | [autoglm.zhipuai.cn/autoclaw](https://autoglm.zhipuai.cn/autoclaw) | One map row |
| Zread.ai | Open-source repo reader | [zread.ai](https://zread.ai) | One map row; plan side is Zread MCP only |
| AMiner | Academic search | [zhipuai.cn](https://www.zhipuai.cn/) | Out of scope |
| Zhipu Learning Center | Education | [zhipuai.cn](https://www.zhipuai.cn/) | Out of scope |
| Zhipu IME | Input method | [zhipuai.cn](https://www.zhipuai.cn/) | Out of scope |

Sources: [zhipuai.cn](https://www.zhipuai.cn/) product nav / footer; [docs.z.ai/devpack/overview](https://docs.z.ai/devpack/overview).

**Names that collide:**

- **Plan ≠ Z.ai / ChatGLM chat.** Chat is the assistant. The plan is GLM quota inside Claude Code / Cursor.
- **Plan key ≠ other platform API keys.** Team Plan keys are not interchangeable ([Quick Start](https://docs.z.ai/devpack/quick-start)).
- **`/api/coding/paas/v4` ≠ `/api/paas/v4`.** The global Cursor page says you must use the dedicated Coding API, not the General API.
- **Coding Tool Helper ≠ a coding agent.** `npx @z_ai/coding-helper` only installs tools and loads the plan.
- **Helper’s 4 tools ≠ the full allow-list.** Helper currently covers Claude Code, OpenCode, Crush, and Factory Droid ([Helper](https://docs.z.ai/devpack/extension/coding-tool-helper)). Cursor is configured by hand.

### Decision tree

```
What do you need?
├── Put GLM into Claude Code / Cursor / Cline you already use
│   └── → this directory
├── Chat / writing / a general assistant
│   └── → Z.ai / ChatGLM (#74), not this plan
├── GLM inside your own app / site / bot / SaaS
│   └── → standard Model API (China FAQ: the coding plan does not apply)
├── Team seats, billing, org controls
│   └── → Team Plan
└── A first-party Z.AI IDE
    └── → ZCode is a listed tool; follow official tool/zcode, not this handbook
```

## Plan boundary

| Item | Official wording (global Overview unless noted) |
|------|--------------------------------------------------|
| Models | All plans: **GLM-5.3**, GLM-5-Turbo, GLM-4.7. GLM-5.2 / GLM-5.1 requests route to GLM-5.3 |
| Where it works | Only [supported tools](https://docs.z.ai/devpack/tool/others#step-1-supported-tools) |
| Anthropic | `https://api.z.ai/api/anthropic` |
| OpenAI Chat Completions | `https://api.z.ai/api/coding/paas/v4` |
| OpenAI Responses | `https://api.z.ai/api/v1` |
| Individual credits | Lite 2,000 / 10,000; Pro 12,000 / 60,000; Max 28,000 / 140,000 (5-hour / weekly) |
| Peak hours | Monday–Friday 14:00–18:00 Singapore Time (UTC+8); off-peak model usage at **50%** credits |
| General-purpose agents | Best-effort; may rate-limit under load |
| List price | Overview: “Starting at just 18 USD per month”. Current SKUs: [z.ai/subscribe](https://z.ai/subscribe) |

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Pick the door | This map | Do not open Z.ai chat or the general API |
| 2. Subscribe and wire a tool | [Tutorial](./glm-coding.md) | Helper or manual Claude Code / Cursor |
| 3. Switch models, MCP, errors | [Cookbook](./glm-coding-cookbook.md) | GLM-5.3, vision / search MCP |
| 4. Look up numbers | [Cheatsheet](./glm-coding-cheatsheet.md) | Endpoints, credits, commands |
| 5. Untangle names | [Glossary](./glm-coding-glossary.md) | Plan vs API vs chat |

## Feature index

| Capability | One line | Official page |
|------------|----------|---------------|
| Overview | Models, credits, scope | [overview](https://docs.z.ai/devpack/overview) |
| Quick Start | Subscribe, key, pick a tool | [quick-start](https://docs.z.ai/devpack/quick-start) |
| Coding Tool Helper | `npx @z_ai/coding-helper` | [coding-tool-helper](https://docs.z.ai/devpack/extension/coding-tool-helper) |
| Supported tools | Coding Agent + general-purpose lists | [tool/others](https://docs.z.ai/devpack/tool/others) |
| Vision / Search / Reader / Zread MCP | Plan-only MCP servers | [vision](https://docs.z.ai/devpack/mcp/vision-mcp-server) |
| Usage policy | Account rules, refunds | [usage-policy](https://docs.z.ai/devpack/usage-policy) |
| FAQ | Subscription and usage | [faq](https://docs.z.ai/devpack/faq) |
