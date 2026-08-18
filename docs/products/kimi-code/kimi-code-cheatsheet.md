---
title: Kimi Code cheatsheet
description: "Lookup only. Commands, flags, slash commands, model IDs, and Base URLs are copied from official docs. The full set is always kimi --help plus moonshotai.github.io/kimi-code."
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# Kimi Code cheatsheet

Lookup only. CLI: [kimi command](https://moonshotai.github.io/kimi-code/en/reference/kimi-command) and `kimi --help`. Models / membership: [models](https://www.kimi.com/code/docs/kimi-code/models) and [membership](https://www.kimi.com/code/docs/kimi-code/membership).

Covers official pages opened on 2026-08-19. npm `@moonshot-ai/kimi-code` `latest` that day was `0.37.1`. Run `kimi --version` and check the [changelog](https://moonshotai.github.io/kimi-code/en/release-notes/changelog).

## Install

| Case | Command |
|------|---------|
| macOS / Linux (recommended) | `curl -fsSL https://code.kimi.com/kimi-code/install.sh \| bash` |
| Windows PowerShell | `irm https://code.kimi.com/kimi-code/install.ps1 \| iex` |
| npm (Node **≥ 22.19.0**) | `npm install -g @moonshot-ai/kimi-code` |
| pnpm | `pnpm add -g @moonshot-ai/kimi-code` |
| Version | `kimi --version` (`-V`) |
| Upgrade | `kimi upgrade` (alias `kimi update`) |
| npm upgrade | `npm install -g @moonshot-ai/kimi-code@latest` |
| Homebrew upgrade | `brew upgrade kimi-code` (What's New; Getting Started has no install text) |
| npm uninstall | `npm uninstall -g @moonshot-ai/kimi-code` |

Windows: install Git for Windows first; custom Git Bash path → `KIMI_SHELL_PATH`.

Old `https://code.kimi.com/install.sh` (no `kimi-code/`) and `uv tool install … kimi-cli` are the Python line. Do not use them.

## Main flags

Source: [kimi command](https://moonshotai.github.io/kimi-code/en/reference/kimi-command)

| Flag | Short | Meaning |
|------|-------|---------|
| `--version` | `-V` | Print version |
| `--help` | `-h` | Help |
| `--session [id]` | `-S` | Resume; omit ID for a picker. Hidden alias `-r` / `--resume` |
| `--continue` | `-c` | Resume latest session in this directory |
| `--model <model>` | `-m` | Model alias for this launch |
| `--prompt <prompt>` | `-p` | One-shot, no TUI |
| `--output-format <format>` | | `text` or `stream-json`; only with `-p` |
| `--yolo` | `-y` | Auto-approve ordinary tools. Hidden aliases `--yes`, `--auto-approve` |
| `--auto` | | Auto permission; no questions |
| `--plan` | | Start in Plan mode |
| `--skills-dir <dir>` | | Replace auto-discovered Skills dirs; repeatable |
| `--agent <name>` | | Main agent (not with `--session`/`--continue`) |
| `--agent-file <path>` | | Load an agent from Markdown |
| `--add-dir <dir>` | | Extra workdir; repeatable |

Conflicts: `--continue` × `--session`; `--yolo` × `--auto`; `-p` cannot combine with `--yolo` / `--auto` / `--plan`. `-p` is locked to `auto` permission.

## Subcommands

| Command | Role |
|---------|------|
| `kimi` | No args: new TUI session here |
| `kimi login` | Non-interactive OAuth device-code |
| `kimi acp` | ACP stdio for IDEs |
| `kimi web` | Foreground REST/WS + web UI. Default port `58627` |
| `kimi doctor` | Validate `config.toml` / `tui.toml` |
| `kimi export [sessionId]` | Zip a session |
| `kimi migrate` | Import old `kimi-cli` data |
| `kimi upgrade` | Check and install updates |
| `kimi vis [sessionId]` | Visualize a session in the browser |
| `kimi provider …` | Non-interactive provider admin |

`kimi server …` is deprecated (exit 1). Use `kimi web`. Exception: `kimi server kill` only stops pre-0.28.0 background servers.

## Slash commands (starter set)

Full list: [slash-commands](https://moonshotai.github.io/kimi-code/en/reference/slash-commands)

| Command | Alias | Role |
|---------|-------|------|
| `/login` | | OAuth or Platform key |
| `/logout` | | Clear current credentials |
| `/model` | | Switch model |
| `/provider` | | Provider manager |
| `/new` | `/clear` | New session |
| `/sessions` | `/resume` | Resume history |
| `/fork` | | Fork a copy |
| `/compact [hint]` | | Compress context |
| `/init` | | Write `AGENTS.md` |
| `/usage` | | Usage / quota |
| `/status` | | Runtime status |
| `/yolo [on\|off]` | `/yes` | YOLO |
| `/auto [on\|off]` | | Auto |
| `/plan [on\|off]` | | Plan |
| `/goal …` | | Goal mode |
| `/swarm <task>` | | Multi-agent parallel |
| `/btw [question]` | | Side-channel subagent |
| `/mcp` | | MCP status |
| `/mcp-config` | | Configure MCP (built-in skill) |
| `/help` | `/h` `/?` | Help |
| `/exit` | `/quit` `/q` | Quit |

## Keys

| Key | Action |
|-----|--------|
| `Enter` | Send |
| `Shift-Enter` / `Ctrl-J` | Newline |
| `Esc` | Interrupt / close popup |
| `Ctrl-C` | Interrupt; twice while idle exits |
| `Ctrl-D` | Exit when the input is empty |
| `Shift-Tab` | Toggle Plan |
| `Ctrl-S` | Interject while streaming |
| `Ctrl-O` | Collapse tool output |
| `Ctrl-G` | External editor |
| `!` (empty input) | Shell mode |
| `@` | File mention |
| `/` | Slash command |

Paste media: `Ctrl-V` on macOS/Linux, `Alt-V` on Windows.

## VS Code extension

| Item | Value |
|------|-------|
| Marketplace | [moonshot-ai.kimi-code](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code) |
| Search | `Kimi Code`, publisher `moonshot-ai` |
| Eligibility | Product docs: new installs only for legacy Python CLI users |
| VS Code version (Marketplace) | `>= 1.100.0` |
| Focus input | `Ctrl+Shift+K` / `Cmd+Shift+K` |
| Insert current file | `Alt+K` |
| New conversation | `Ctrl+N` / `Cmd+N` (needs `kimi.enableNewConversationShortcut`) |

## Model IDs

Source: [Models](https://www.kimi.com/code/docs/kimi-code/models) (3 IDs)

| Model ID | Model | Context | Plan |
|----------|-------|---------|------|
| `k3` | Kimi K3 | Moderato 256k; Allegretto+ up to 1M | Moderato+ (Andante not yet) |
| `kimi-for-coding` | K2.7 Code | 256k | All members |
| `kimi-for-coding-highspeed` | Same, high speed | 256k | Allegretto+ |

A wrong high-speed ID silently falls back to the standard ID. Unauthorized → `401`. Third-party 1M windows: set context to `1048576`.

## API

| | Kimi Code | Open Platform |
|--|-----------|---------------|
| OpenAI Base URL | `https://api.kimi.com/coding/v1` | `https://api.moonshot.cn/v1` |
| Anthropic Base URL | `https://api.kimi.com/coding/` | — |
| Billing | membership + rate limits | metered |
| Create key | [console](https://www.kimi.com/code/console) (max 5, shown once) | Open Platform console |

Keys do not mix. Do not rewrite the User-Agent.

## Paths and env

| Key / path | Role |
|------------|------|
| `~/.kimi-code/` | Current data root |
| `~/.kimi-code/config.toml` | Agent / permissions / providers |
| `~/.kimi-code/tui.toml` | Theme, editor, notifications, auto-update |
| `~/.kimi/` | **Legacy** Python CLI |
| `KIMI_CODE_HOME` | Override data root |
| `KIMI_SHELL_PATH` | Windows `bash.exe` |
| `KIMI_DISABLE_TELEMETRY=1` | Disable anonymous telemetry (`true`/`yes`/`y` also work) |

`KIMI_API_KEY` is **not** read from the shell.

## Permission modes

| Mode | CLI | TUI | Behavior |
|------|-----|-----|----------|
| Default manual | (no flag) | | Writes / shell ask first |
| Plan | `--plan` | `Shift-Tab` `/plan` | Plan first; leaving Plan still asks (even under YOLO) |
| YOLO | `--yolo` `-y` | `/yolo` | Auto-approve ordinary tools |
| Auto | `--auto` | `/auto` | Fully automatic, no questions |
| `-p` | locked to auto | — | Cannot stack yolo/auto/plan |

## High-quality sources

- **[Kimi Code landing](https://www.kimi.com/code)** — current curl install bar
  - Last verified: 2026-08-19
- **[Product docs hub](https://www.kimi.com/code/docs/)** — membership, VS Code, API, models
  - Last verified: 2026-08-19
- **[CLI docs (EN)](https://moonshotai.github.io/kimi-code/en/)** / **[ZH](https://moonshotai.github.io/kimi-code/zh/)** — Guides + Reference
  - Last verified: 2026-08-19
- **[Models](https://www.kimi.com/code/docs/kimi-code/models)** — three Model IDs and plan gates
  - Last verified: 2026-08-19
- **[Membership](https://www.kimi.com/code/docs/kimi-code/membership)** — 7-day / 5-hour, Extra Usage
  - Last verified: 2026-08-19
- **[What's New](https://www.kimi.com/code/docs/kimi-code/whats-new)** — rewrite table, feature drops
  - Last verified: 2026-08-19
- **[Product comparison](https://www.kimi.com/zh-hans/help/others/product-comparison)** — Kimi / Work / Code / Claw
  - Last verified: 2026-08-19
- **[GitHub MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code)** — README, source, Issues
  - Last verified: 2026-08-19
- **[npm @moonshot-ai/kimi-code](https://www.npmjs.com/package/@moonshot-ai/kimi-code)** — version and `engines`
  - Last verified: 2026-08-19
- **[VS Marketplace moonshot-ai.kimi-code](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code)** — extension implementation notes
  - Last verified: 2026-08-19
- **[Console](https://www.kimi.com/code/console)** — keys and quota
  - Last verified: 2026-08-19
- **[Open Platform](https://platform.moonshot.cn/)** — metered API, not the Code pool
  - Last verified: 2026-08-19

### Unverified

- Whether the product hub still shows a fourth model ID `k3-256k` (conflicted with the models page on 2026-08-19)
- Official `brew install` text (only `brew upgrade kimi-code` is documented)
- A dedicated Kimi Claw landing URL (the comparison page names the product, not a separate host)
