---
title: Kimi Code learning map
description: "Kimi Code is Moonshot's developer coding suite (CLI + VS Code). Kimi chat / Work / Claw are different products. This directory only covers installing Kimi Code and pointing it at a real repo."
domain: product
tags:
  - coding-agent
role: map
---

# Kimi Code learning map

> **Kimi Code** is the developer programming benefit inside a Kimi membership. Official surfaces are the **CLI**, the **VS Code extension**, and an **API key** that plugs the same models into third-party agents.
>
> Product docs ([www.kimi.com/code/docs](https://www.kimi.com/code/docs/)):
> Kimi Code provides "code reading, file editing, command execution and other AI-assisted capabilities" through "CLI, VS Code extension plugins and other product forms."

## Audience / prerequisites

- **Who**: frontend engineers who already use a terminal or VS Code and want a Claude Code analogue that works on a mainland-China network.
- **Need**: macOS / Linux / Windows; a Kimi account (membership or a callable API key). The install script does **not** require Node.js. The npm channel needs **Node.js 22.19.0+**.
- **Non-goals**: Kimi web chat, Kimi Work, Kimi Claw; model internals (see Learn LLM); treating the old Python `kimi-cli` as the main path.

## Product family

Official first-level entries first. This directory **only expands Kimi Code**. Chat / Work / Claw each get one row pointing at the forthcoming [Kimi family page](/products/kimi/).

| Official name | Official URL | This site |
|---------------|--------------|-----------|
| **Kimi Code** (landing) | [www.kimi.com/code](https://www.kimi.com/code) | This directory |
| **Kimi Code docs hub** | [www.kimi.com/code/docs](https://www.kimi.com/code/docs/) | This page |
| **Kimi Code CLI** | [Product docs · Getting started](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) · [CLI docs](https://moonshotai.github.io/kimi-code/en/guides/getting-started) | [Tutorial](./kimi-code.md) |
| **Kimi Code for VS Code** | [Product docs · Quick start](https://www.kimi.com/code/docs/kimi-code-for-vscode/getting-started) · [Marketplace](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code) | [Tutorial · VS Code](./kimi-code.md#kimi-code-for-vs-code) |
| **Kimi Code console** | [www.kimi.com/code/console](https://www.kimi.com/code/console) | Map row: quota, API keys, devices |
| **Kimi Code API** (third-party tools) | Base URL table on the hub | [Tutorial · API](./kimi-code.md#use-kimi-code-from-third-party-tools) · [Cheatsheet](./kimi-code-cheatsheet.md) |
| **Kimi** (web / app) | [www.kimi.com](https://www.kimi.com) · [comparison](https://www.kimi.com/zh-hans/help/others/product-comparison) | One row → [Kimi family](/products/kimi/) (#70) |
| **Kimi Work** | [comparison](https://www.kimi.com/zh-hans/help/others/product-comparison) · [downloads](https://www.kimi.com/zh-cn/products/download) | One row → [Kimi family](/products/kimi/) |
| **Kimi Claw** | [comparison](https://www.kimi.com/zh-hans/help/others/product-comparison) | One row → [Kimi family](/products/kimi/) |
| **Kimi Open Platform** | [platform.moonshot.cn](https://platform.moonshot.cn/) · `platform.kimi.com` / `platform.kimi.ai` | One row: metered API, not this directory |
| Legacy Python **kimi-cli** | [What's New table](https://www.kimi.com/code/docs/kimi-code/whats-new) | [Tutorial appendix](./kimi-code.md#appendix-migrate-from-python-kimi-cli) |

Sources: [product comparison](https://www.kimi.com/zh-hans/help/others/product-comparison), [Kimi Code hub](https://www.kimi.com/code/docs/), [downloads](https://www.kimi.com/zh-cn/products/download).

```
Moonshot / Kimi family
├── Kimi (web / app) — chat + Agent + Deep Research
├── Kimi Work — desktop local Agent (files / cross-app / long jobs)
├── Kimi Code — developer coding suite (this directory)
│   ├── CLI (`kimi`)
│   ├── VS Code extension (moonshot-ai.kimi-code)
│   └── API key → third-party coding agents
├── Kimi Claw — zero-deploy cloud automation / bots
└── Open Platform — metered HTTP API (not a coding-agent product)
```

**Names that collide:**

- **Kimi Code ≠ Kimi chat ≠ Kimi Work ≠ Kimi Claw.** The comparison page: Code is for developers, writing and maintaining repos, via CLI and the VS Code extension.
- **The `kimi` binary ≠ the product name Kimi Code.**
- **`~/.kimi-code/` ≠ `~/.kimi/`.** Current Node CLI vs old Python `kimi-cli`.
- **`api.kimi.com/coding` ≠ `api.moonshot.cn/v1`.** Membership coding quota vs metered Open Platform. Keys are not interchangeable ([help FAQ](https://www.kimi.ai/help/kimi-code/cli-getting-started)).
- **`kimi acp` ≠ the VS Code extension.** ACP embeds the CLI in Zed / JetBrains / Paseo. VS Code has a first-party extension marked "adapting."

### Quick decision: which surface?

```
What do I want to do?
├── Write / fix / refactor / test in a real repo
│   └── → Kimi Code
│       ├── Terminal? → CLI (`kimi`)
│       ├── VS Code? → read the official "new installs only for legacy Python CLI users" banner first
│       ├── Zed / JetBrains? → `kimi acp` (not the VS Code extension)
│       └── Already on Claude Code / Codex / OpenCode? → plug in a Kimi Code API key
├── Chat / write / search / sites / PPT / Deep Research
│   └── → [Kimi web / app](/products/kimi/)
├── Local files, cross-desktop apps, long-running jobs
│   └── → [Kimi Work](/products/kimi/)
├── 24/7 cloud bot, Feishu / WeChat
│   └── → [Kimi Claw](/products/kimi/)
└── Metered model calls inside my own product
    └── → Kimi Open Platform (not this directory)
```

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Install and talk | [Tutorial · install and login](./kimi-code.md) | First conversation in 15 minutes |
| 2. Let it edit | [Tutorial · TUI and approvals](./kimi-code.md#interaction-approvals-and-three-permission-modes) | Plan / YOLO / Auto |
| 3. Pick the door | [Tutorial · VS Code / ACP / API](./kimi-code.md#kimi-code-for-vs-code) | Do not enter the wrong product |
| 4. Look up flags | [Cheatsheet](./kimi-code-cheatsheet.md) | Commands, slash, model IDs, Base URLs |
| 5. Coming from the old CLI | [Migration appendix](./kimi-code.md#appendix-migrate-from-python-kimi-cli) | `kimi migrate` |

## Feature cheat sheet

Only capabilities that have an official page.

| Capability | One line | Official page |
|------------|----------|---------------|
| Interactive TUI | `kimi` in a project directory | [Getting started](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) |
| Headless | `kimi -p "…"`; `--output-format stream-json` | [kimi command](https://moonshotai.github.io/kimi-code/en/reference/kimi-command) |
| Plan mode | `Shift-Tab` or `/plan` | [Interaction](https://moonshotai.github.io/kimi-code/en/guides/interaction) |
| YOLO / Auto | `/yolo` skips ordinary approvals; `/auto` is unattended and does not ask | same |
| Sessions | `-c` / `--continue`, `/sessions`, `/fork`, `kimi export` | [Sessions](https://moonshotai.github.io/kimi-code/en/guides/sessions) |
| ACP | `kimi acp` for Zed / JetBrains / Paseo | [IDEs](https://moonshotai.github.io/kimi-code/en/guides/ides) |
| Skills / MCP / Hooks / Plugins | Built-in skills appear as `/name` | [Customization](https://moonshotai.github.io/kimi-code/en/customization/mcp) |
| Subagents | Built-in `coder` / `explore` / `plan` | [README](https://github.com/MoonshotAI/kimi-code) · [What's New](https://www.kimi.com/code/docs/kimi-code/whats-new) |
| Goal | `/goal` works a persistent objective across turns | [Goals](https://moonshotai.github.io/kimi-code/en/guides/goals) |
| Video input | Paste video (`Ctrl-V` on macOS/Linux, `Alt-V` on Windows) | [Interaction](https://moonshotai.github.io/kimi-code/en/guides/interaction) |
| Models | `k3` / `kimi-for-coding` / `kimi-for-coding-highspeed` | [Models](https://www.kimi.com/code/docs/kimi-code/models) |

## Membership and quota (official text only)

- CLI / VS Code / third-party requests **share one Kimi Code quota** ([membership](https://www.kimi.com/code/docs/kimi-code/membership)).
- Quota **refreshes every 7 days** from the subscription date; unused quota does not roll over. There is also a **rolling 5-hour rate window**.
- Shared with the Kimi membership monthly cap: hitting the monthly cap freezes Code quota.
- Comparison page: membership features share one pool; Kimi Code **also** has Code-only 5-hour / weekly rate limits.
- Product-docs banner: a **new membership system is coming**, splitting Code benefits from Kimi membership. Current subscribers are unaffected. Prices live on the [Kimi membership page](https://www.kimi.com/membership/pricing). This site does not invent amounts.

## Next

1. Open the [Kimi Code tutorial](./kimi-code.md) and install the CLI with the official script.
2. Flags and model IDs: [cheatsheet](./kimi-code-cheatsheet.md).
3. Official deep-dive: [code/docs](https://www.kimi.com/code/docs/) and the [CLI docs](https://moonshotai.github.io/kimi-code/en/).
