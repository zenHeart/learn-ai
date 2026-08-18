---
title: Kimi Code tutorial
description: "Install Kimi Code CLI with the official script, finish /login, and complete a first conversation. Then choose the VS Code extension, ACP, or the third-party API. Legacy Python kimi-cli lives only in the appendix."
domain: product
tags:
  - coding-agent
role: tutorial
---

# Kimi Code tutorial

> This page gets **Kimi Code** installed and editing a repo. Commands and package names are copied from [Getting started](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) and the [MoonshotAI/kimi-code README](https://github.com/MoonshotAI/kimi-code). Full flags: [cheatsheet](./kimi-code-cheatsheet.md). Family boundaries: [learning map](./index.md).

## Goals and non-goals

**Goals**

- Install the `kimi` binary with the official script or npm
- Attach a Kimi Code membership or an Open Platform key via `/login`
- Finish one read-only survey and one confirmed small edit
- Know when to use the VS Code extension, `kimi acp`, or the third-party API

**Non-goals**

- No Kimi chat / Work / Claw tutorial
- No Python `kimi-cli` as the primary install path
- No invented plan prices, no "the VS Code extension should just work"

## Prerequisites

Official [Getting started](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) and [Help Center](https://www.kimi.ai/help/kimi-code/cli-getting-started):

- OS: macOS, Linux, or Windows (PowerShell)
- Account: an active **Kimi membership**, or a callable API key
- TUI: a true-color + ligature terminal (official examples: Kitty, Ghostty)
- Windows: **install [Git for Windows](https://gitforwindows.org/) first**. The CLI uses its Git Bash as the shell. If Git Bash is not in the default path, set `KIMI_SHELL_PATH` to the absolute path of `bash.exe`
- npm channel extra: **Node.js 22.19.0 or later**

## 1. Install the CLI

Two official options. The **install script is recommended** (no preinstalled Node.js).

::: code-group

```bash [macOS / Linux]
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://code.kimi.com/kimi-code/install.ps1 | iex
```

```bash [npm]
node --version
npm install -g @moonshot-ai/kimi-code
```

```bash [pnpm]
pnpm add -g @moonshot-ai/kimi-code
```

:::

Sources: [Getting started](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started), [repo README](https://github.com/MoonshotAI/kimi-code). The script downloads the latest build, verifies the checksum, and puts `kimi` on your `PATH`.

Verify:

```bash
kimi --version
```

Command not found: reopen the terminal, or `source ~/.bashrc` / `source ~/.zshrc`. Help Center also says check whether `~/.local/bin` is on `PATH`.

macOS first launch can be slow under Gatekeeper. Help Center: add the terminal app to **System Settings → Privacy & Security → Developer Tools**.

**Upgrade**: `kimi upgrade` (alias `kimi update`), then `Install update now`; or `npm install -g @moonshot-ai/kimi-code@latest`. What's New also mentions `brew upgrade kimi-code` for Homebrew installs. Getting Started has **no** `brew install` text, so this page does not invent one.

**Uninstall**: delete the `kimi` binary after a script install; `npm uninstall -g @moonshot-ai/kimi-code` after npm.

> **Do not copy the old script.** Some Help Center pages still show `curl -LsSf https://code.kimi.com/install.sh | bash` or `uv tool install --python 3.13 kimi-cli`. That is Python `kimi-cli`. The current official path includes `/kimi-code/`; the package is `@moonshot-ai/kimi-code`.

## 2. Sign in

Start the TUI in a project:

```bash
cd your-project
kimi
```

On first launch, in the input box:

```text
/login
```

The platform picker has two options ([Getting started](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started)):

| Option | Official description |
|--------|----------------------|
| **Kimi Code (OAuth)** | Device-code flow: open the link on any device, sign in, enter the code |
| **Kimi Platform API key** | A key from `platform.kimi.com` or `platform.kimi.ai` |

Without a TUI: `kimi login` (RFC 8628 device-code; verification URL and user code go to stderr).

Sign out: `/logout`.

Other providers (Anthropic / OpenAI / Google, …) require **editing** `~/.kimi-code/config.toml`. See [Providers and models](https://moonshotai.github.io/kimi-code/en/configuration/providers.md).

> **`export KIMI_API_KEY=…` does nothing.** [Environment variables](https://moonshotai.github.io/kimi-code/en/configuration/env-vars): `KIMI_API_KEY`, `ANTHROPIC_API_KEY`, and `OPENAI_API_KEY` are **not** read from the shell. Put them in `config.toml` under `[providers.<name>]` or `[providers.<name>.env]`. The exception is the temporary `KIMI_MODEL_*` channel.

## 3. First conversation

Official first prompt:

```text
Take a look at this project's directory structure and briefly describe what each directory is for.
```

Read-only tools run automatically. File writes and shell commands **ask first** by default.

A more concrete official example:

```text
Add a function in src/utils that converts any string to kebab-case, and add a unit test for it.
```

Project rules: run `/init` in the repo to generate `AGENTS.md` ([Help Center](https://www.kimi.ai/help/kimi-code/cli-getting-started)).

One-shot, no TUI:

```bash
kimi -p "Take a look at this project's directory structure"
```

Resume the **most recent session in this directory**:

```bash
kimi -c
```

That is the short form of `--continue` from the [kimi command](https://moonshotai.github.io/kimi-code/en/reference/kimi-command) and Getting Started. Some Help Center pages write `-C`. Trust the CLI reference.

Leave the TUI: `/exit`, `Ctrl-C` twice while idle, or `Ctrl-D` on an empty input box.

## 4. Interaction, approvals, and three permission modes

Source: [Interaction and input](https://moonshotai.github.io/kimi-code/en/guides/interaction).

| Action | How |
|--------|-----|
| Send | `Enter` |
| Newline | `Shift-Enter` or `Ctrl-J` |
| File mention | `@` path complete |
| Slash command | `/` |
| Paste image / video | macOS / Linux `Ctrl-V`; Windows `Alt-V` |
| Interject while streaming | `Ctrl-S` |
| Interrupt | `Esc` or `Ctrl-C` |
| Collapse tool output | `Ctrl-O` |
| External editor | `Ctrl-G` |
| Toggle Plan | `Shift-Tab` or `/plan` |
| Shell mode | type `!` on an empty input |

Do not mix the three modes:

| Mode | How | Official behavior |
|------|-----|-------------------|
| **Plan** | `Shift-Tab` / `/plan` / `kimi --plan` | Plan first, then edit. Leaving Plan still needs confirmation; **YOLO does not skip that** |
| **YOLO** | `/yolo` / `kimi --yolo` | Auto-approve ordinary tools (writes, shell). Sensitive files (`.env`, SSH keys) and leaving Plan still ask |
| **Auto** | `/auto` / `kimi --auto` | Every approval is automatic and the **agent will not ask you questions** |

`-p` always uses `auto` permission and cannot be combined with `--yolo` / `--auto` / `--plan`.

## 5. Slash commands you need first

From Getting Started. Full list: [slash commands](https://moonshotai.github.io/kimi-code/en/reference/slash-commands) and the [cheatsheet](./kimi-code-cheatsheet.md).

| Command | What it does |
|---------|--------------|
| `/help` | Command and shortcut panel |
| `/login` / `/logout` | Sign in / clear credentials |
| `/model` | Switch model |
| `/new` | New session |
| `/sessions` | Resume history |
| `/compact` | Compress context |
| `/fork` | Fork a copy (you stay on the current session) |
| `/init` | Generate `AGENTS.md` |
| `/usage` | Usage and quota |
| `/yolo` `/auto` `/plan` | Permission / plan modes |
| `/goal` | Drive a persistent objective across turns |
| `/mcp-config` | Configure MCP conversationally |

## 6. Kimi Code for VS Code

Official page: [Quick start](https://www.kimi.com/code/docs/kimi-code-for-vscode/getting-started). Marketplace: [moonshot-ai.kimi-code](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code).

### Read this eligibility banner first

Product-docs banner (translated from the official Chinese page):

> Kimi Code for VS Code currently allows **new installs only for legacy Python CLI users**. Existing extension users can keep using it after upgrading to the new CLI. Other TypeScript CLI users cannot install it yet.

The Help Center says the same. **Do not assume a fresh Node CLI install can add the Marketplace extension.** Prefer `kimi acp` below, or run `kimi` inside the VS Code integrated terminal.

The Marketplace page (0.7.0 observed 2026-08-19) describes a newer implementation that **coexists** with that banner:

- VS Code **1.100.0** or later
- The extension runs the **Kimi Code Node SDK** in the Extension Host
- When the extension and the terminal app resolve the same `KIMI_CODE_HOME`, they share `config.toml`, MCP, login, and sessions
- **Do not** open the same session in both apps (cross-process locking is not guaranteed)

When the two official pages disagree, **eligibility follows the product-docs banner**; shared home / version requirements follow the Marketplace. Do not guess which one is obsolete.

### Install and sign-in (official steps)

1. Prerequisite: a Kimi membership or API key
2. Search the VS Code Marketplace for **Kimi Code**, publisher **moonshot-ai**
3. If the icon is missing: reload, or run `Developer: Reload Window` (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
4. Click the Kimi icon in the Activity Bar
5. Auth (gear switches modes):
   - **Kimi account**: browser OAuth
   - **API key**: skip login if a key is already configured

### Typical workflows

Four official recipes:

| Scene | What to do |
|-------|------------|
| Read code | `@` a file / folder, ask for the flow, then follow up |
| Refactor | e.g. `@src/feature/`, review the diff, approve selectively, roll back if needed |
| Debug | Paste the error or stack, mention related files, approve the fix |
| Overview | e.g. `@src/services/`, ask for a module map or architecture summary |

### Shortcuts

From the product docs (one extra setting vs Help Center):

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+K` / `Cmd+Shift+K` | Focus the Kimi input |
| `Alt+K` | Insert a reference to the current file |
| `Ctrl+N` / `Cmd+N` | New conversation (requires `kimi.enableNewConversationShortcut`; steals the default New File binding) |
| `↑` / `↓` | Input history |

Command Palette → `Kimi Code` opens the panel in a tab or sidebar and manages sessions.

## 7. Other IDEs via ACP

There is no first-party JetBrains / Zed plugin. The CLI exposes `kimi acp`; the IDE spawns it as a JSON-RPC child. Finish `/login` in a terminal first. macOS GUI children often **do not** inherit your shell `PATH` — set `command` to the absolute path from `which kimi`.

Zed, in `~/.config/zed/settings.json` ([Using in IDEs](https://moonshotai.github.io/kimi-code/en/guides/ides)):

```json
{
  "agent_servers": {
    "Kimi Code CLI": {
      "type": "custom",
      "command": "kimi",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

JetBrains (IntelliJ / PyCharm / WebStorm, …) configures ACP in AI Chat; `command` **must be an absolute path**. Paseo: pick the built-in provider or add `["kimi", "acp"]` in `~/.paseo/config.json`.

Self-check: run `kimi acp` in a terminal. If it blocks on stdin, the CLI is fine and the IDE config is wrong. An immediate error is usually a missing login.

## 8. Use Kimi Code from third-party tools

Product hub: members can create up to **5** API keys in the [console](https://www.kimi.com/code/console) (**shown only at creation time**).

| Protocol | Base URL | Common endpoint |
|----------|----------|-----------------|
| OpenAI-compatible | `https://api.kimi.com/coding/v1` | `https://api.kimi.com/coding/v1/chat/completions` |
| Anthropic-compatible | `https://api.kimi.com/coding/` | `https://api.kimi.com/coding/v1/messages` |

Some tools want only the Base URL (the hub names Claude Code). Some want the full endpoint (the hub names Trae).

Officially named consumers: Claude Code, OpenCode, Codex, Roo Code, plus generic frameworks such as OpenClaw and Hermes ([membership-guide](https://www.kimi.com/zh-cn/help/kimi-code/membership-guide)). Per-tool env var names live in those tools' docs — this page does not invent them.

> Hub original: keep the tool's real client identity. Tampering with the User-Agent is a violation and can suspend membership benefits.

This is not the Open Platform:

| | Kimi Code platform | Kimi Open Platform |
|--|--------------------|--------------------|
| Base URL | table above | `https://api.moonshot.cn/v1` |
| Billing | membership + rate limits | pay-as-you-go |
| Fit | terminal / IDE agents | product integration |

Keys **do not** mix.

## 9. Which model

Trust [Models](https://www.kimi.com/code/docs/kimi-code/models) as of 2026-08-19. That page says there are **3** model IDs.

| Model ID | Model | Context | Who |
|----------|-------|---------|-----|
| `k3` | Kimi K3 | Moderato up to 256k; Allegretto+ up to 1M | Moderato+. Andante: not supported yet |
| `kimi-for-coding` | Kimi K2.7 Code | 256k | All members |
| `kimi-for-coding-highspeed` | Same K2.7 Code, high speed | 256k | Allegretto+ |

Official: high-speed coding ability matches the standard ID. Product docs: output about **5–6×**, quota about **3×**. The models table says "6× speed, 3× consumption." A wrong high-speed ID **does not error**; it falls back to `kimi-for-coding`. Insufficient plan → **401**.

CLI: `/model`. VS Code: the input dropdown; restart or reinstall if the target is missing. Switching models busts the cache — official advice is a **new session**.

<!-- TODO: 待核实 —— on 2026-08-19 the product hub also listed a fourth ID `k3-256k`; the same day's models page lists three. This page follows models. -->

## 10. Where data lives / how to check quota

- Default home: `~/.kimi-code/` (config, sessions, logs, update cache)
- Move it: `KIMI_CODE_HOME`
- Do not hand-edit files under `sessions/`
- Usage: TUI `/usage`; web **Settings → Subscription and invoices → My quota**; console after Extra Usage is on

Quota rules copied from [membership](https://www.kimi.com/code/docs/kimi-code/membership): 7-day refresh, 5-hour window, devices and API keys share one pool, idle devices unbind after 30 days, monthly cap freezes Code. A new membership system will split Code from Kimi membership — amounts stay on the official pricing page.

## Common pitfalls

1. **Old install URL or package name.** Current: `code.kimi.com/kimi-code/install.sh` and `@moonshot-ai/kimi-code`.
2. **`export KIMI_API_KEY` as login.** Write `config.toml` or use `/login`.
3. **A Coding key against `api.moonshot.cn`, or the reverse.** Two account systems.
4. **YOLO and Auto as synonyms.** Auto also stops questions; YOLO still asks about sensitive files and leaving Plan.
5. **Assuming the VS Code extension installs for a new Node CLI user.** Product docs restrict new installs to legacy Python CLI users.
6. **`kimi: command not found` inside an IDE.** GUI children lack PATH — use an absolute path.
7. **Windows without Git for Windows.** Official shell is Git Bash. What's New: the CLI errors before launch if Git Bash is missing.
8. **Help Center `-C` for continue.** CLI reference is `-c` / `--continue`.

## Appendix: migrate from Python kimi-cli

The old line is no longer maintained. It is not the main tutorial.

[What's New](https://www.kimi.com/code/docs/kimi-code/whats-new):

| | Old kimi-cli | New Kimi Code CLI |
|--|--------------|-------------------|
| Runtime | Python + uv | Node.js |
| Install | `uv tool install` | curl / npm in §1 |
| Config | `~/.kimi/config.toml` | `~/.kimi-code/config.toml` (**incompatible**) |
| UI | Basic text | Full TUI |
| Subagents | No | Built-in `coder` / `explore` / `plan` |

[Migration guide](https://www.kimi.com/code/docs/kimi-code-cli/guides/migration):

1. Install the new CLI from this page.
2. The first `kimi` run prompts if it finds `~/.kimi/`.
3. Or run `kimi migrate` any time.
4. Choose **Config only** or **Config + N sessions**.

Migrated: `config.toml`, MCP config, input history, selected sessions.

**Not** migrated: OAuth tokens, MCP grants, old plugins. Sign in again with `/login` and re-authorize MCP.

Migration **does not delete** `~/.kimi/`. It is idempotent. Imported sessions are tagged `[imported]`.

## Next

- Flags, models, Base URLs → [cheatsheet](./kimi-code-cheatsheet.md)
- Official recipes → [use cases](https://moonshotai.github.io/kimi-code/en/guides/use-cases)
- Skills / MCP / Hooks → [customization](https://moonshotai.github.io/kimi-code/en/customization/mcp)
- Bugs → [GitHub Issues](https://github.com/MoonshotAI/kimi-code/issues)
