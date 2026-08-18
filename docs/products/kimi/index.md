---
title: Kimi learning map
description: Moonshot ships several surfaces named Kimi. This directory covers kimi.com chat and Agent only. Kimi Code is one family-table row.
domain: product
tags:
  - chat
role: map
---

# Kimi learning map

> **Kimi** is Moonshot AI's all-in-one workspace. Official product-page copy ([kimi.com/zh-cn/products](https://www.kimi.com/zh-cn/products/)):
> a one-stop AI workspace with built-in Agent capabilities for deep research, slides, sheets, documents, and websites.
>
> English product nav: "**Kimi** — All-in-one agentic AI workspace."
>
> This directory is the Claude.ai / Grok Chat analog. It is **not** Kimi Code. The terminal / IDE coding agent is [Kimi Code](/products/kimi-code/).

## Product family

Every official first-class AI entry must appear here. Thin official density stays a single row.

| Official first-class entry | Official URL | This site |
|----------------------------|--------------|-----------|
| **Kimi** (workspace / chat) | [kimi.com](https://www.kimi.com/), [zh-cn/products](https://www.kimi.com/zh-cn/products/) | Standalone [kimi.md](./kimi.md) |
| **Kimi Agent** | [kimi.com/agent](https://www.kimi.com/agent), [Agent overview](https://www.kimi.com/help/agent/agent-overview) | Same tutorial |
| **Agent Swarm** | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm), [Agent Swarm](https://www.kimi.com/help/agent/agent-swarm) | Tutorial + [Cookbook](./kimi-cookbook.md) |
| **Kimi Claw** | [kimi.com/bot](https://www.kimi.com/bot), [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) | Tutorial + Cookbook (cloud OpenClaw on the chat side) |
| **Goal** | Membership "Goal Mode"; project chats can use Goal ([Projects](https://www.kimi.com/help/features/project)) | One map row + a tutorial section. **Not** Kimi Code `/goal` |
| Slides / Docs / Sheets / Deep Research / Websites / Design | Home sidebar ([kimi.com](https://www.kimi.com/)) | One row: workspace capabilities, no extra pages |
| Plugins / Scheduled Tasks / Skills / Projects / Memory | [Help → Features](https://www.kimi.com/help/features) | Tutorial / Cookbook / [cheatsheet](./kimi-cheatsheet.md) |
| **Kimi Code** | Products page "Kimi Code" | **One row:** [Kimi Code](/products/kimi-code/) (issue #71; no install here) |
| **Kimi Work** | [kimi.com/products/kimi-work](https://www.kimi.com/products/kimi-work) | One row: Mac/Windows desktop knowledge-work agent |
| **Kimi WebBridge** | Products page "Kimi WebBridge" | One row: browser extension for agents |
| **Kimi Platform / API** | [platform.moonshot.cn](https://platform.moonshot.cn/) | One row: HTTP API |
| **Kimi Business** | [Help Center](https://www.kimi.com/help) "Kimi Business" | One row: enterprise |
| Research / doodles / careers | [moonshot.cn](https://www.moonshot.cn/) | Out of scope |

```
Moonshot / Kimi family
├── Kimi (kimi.com workspace) ← this directory
│   ├── Chat (official: K2.6 is free in Chat and does not consume credits)
│   ├── Agent (kimi.com/agent; App → K3)
│   ├── Agent Swarm (kimi.com/agent-swarm; App → K3 Swarm)
│   ├── Goal / Projects / Skills / Plugins / scheduled tasks / memory
│   └── Kimi Claw (kimi.com/bot; cloud OpenClaw)
├── Kimi Code — terminal and IDE coding agent → /products/kimi-code/
├── Kimi Work — desktop local agent
├── Kimi WebBridge — browser extension
├── Kimi Platform — model API
└── Kimi Business — enterprise
```

**Name collisions:**

- **Kimi ≠ Kimi Code ≠ Kimi Work ≠ Kimi Claw**.
- **Agent ≠ Agent Swarm ≠ Claw group chat**.
- **Goal (workspace) ≠ Kimi Code `/goal`**.
- **kimi.com Projects ≠ Kimi Work Projects** — official: not connected and don't share data ([Projects](https://www.kimi.com/help/features/project)).

### Decision tree

```
What do you need?
├── Browser Q&A / docs / slides / sheets / deep research / site preview
│   └── → [Kimi chat and Agent](./kimi.md)
│       ├── Everyday Q&A → kimi.com (official: K2.6 is free, no credit burn)
│       ├── End-to-end site / Office / report → kimi.com/agent, or App → K3
│       ├── Large parallel collection / long writing → kimi.com/agent-swarm, or K3 Swarm
│       ├── Same files across many turns → sidebar Projects
│       ├── Same job every day → sidebar Scheduled Tasks
│       └── 24/7 cloud assistant on Feishu / WeCom → kimi.com/bot (Claw)
├── Edit a real repo / tests / PRs
│   └── → [Kimi Code](/products/kimi-code/) (install is not in this directory)
├── Local files / desktop cron
│   └── → Kimi Work (kimi.com/products/kimi-work)
├── Agent clicks the browser like a person
│   └── → Kimi WebBridge, or WebBridge inside Kimi Work
└── Call models from your own software
    └── → Kimi Platform (platform.moonshot.cn)
```

Sources: [products](https://www.kimi.com/zh-cn/products/), [kimi.com](https://www.kimi.com/), [Agent overview](https://www.kimi.com/help/agent/agent-overview), [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview), [Kimi Work overview](https://www.kimi.com/help/kimi-work/overview), [moonshot.cn](https://www.moonshot.cn/).

## Learning path

| Stage | Read | Outcome |
|-------|------|---------|
| 1. Pick the door | This family table | Do not walk into Code / Work by accident |
| 2. First session | [Tutorial](./kimi.md) | Web chat + first Agent run |
| 3. Recipes | [Cookbook](./kimi-cookbook.md) | Swarm / Claw / projects / schedules |
| 4. Look up | [Cheatsheet](./kimi-cheatsheet.md) | Official entries and tables only |
| 5. Names | [Glossary](./kimi-glossary.md) | Collisions and non-goals |

## Out of scope here

- Kimi Code CLI / VS Code install, slash commands, `AGENTS.md`.
- Kimi Work desktop install steps.
- API `base_url` / `MOONSHOT_API_KEY` samples (Platform).
- Model internals. See [Learn LLM](/tech/fundamentals/LLM).

## Related pages

- [Kimi chat and Agent](./kimi.md)
- [Cookbook](./kimi-cookbook.md)
- [Cheatsheet](./kimi-cheatsheet.md)
- [Glossary](./kimi-glossary.md)
- [Kimi Code](/products/kimi-code/)
- [Products index](../index.md)
