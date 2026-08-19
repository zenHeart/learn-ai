---
title: CodeBuddy Cheatsheet
description: "Lookup only. Install commands, CLI subcommands, slash commands, and keys are copied from the codebuddy.cn docs. Treat codebuddy --help and the official pages as the full set."
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# CodeBuddy Cheatsheet

Lookup only. Install commands, CLI subcommands, slash commands, and keys are copied from official pages. The full set is `codebuddy --help` plus the links below.

Verified **2026-08-18**.

## Install and update

Sources: [Install guide](https://www.codebuddy.cn/docs/cli/installation), [Quick start](https://www.codebuddy.cn/docs/cli/quickstart), [Troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)

| Case | Command / action | Source |
|------|------------------|--------|
| npm | `npm install -g @tencent-ai/codebuddy-code` | Install |
| pnpm | `pnpm add -g @tencent-ai/codebuddy-code` | Install |
| yarn | `yarn global add @tencent-ai/codebuddy-code` | Install |
| bun | `bun install -g @tencent-ai/codebuddy-code` | Install |
| Homebrew | `brew tap Tencent-CodeBuddy/tap` then `brew install codebuddy-code` | Install |
| Native fresh (install page) | `curl -fsSL https://www.codebuddy.cn/cli/install.sh \| bash` | Install |
| Native Windows (install page) | `irm https://www.codebuddy.cn/cli/install.ps1 \| iex` | Install |
| Native fresh (quick start) | `curl -fsSL https://copilot.tencent.com/cli/install.sh \| bash` | Quick start |
| Native Windows (quick start) | `irm https://copilot.tencent.com/cli/install.ps1 \| iex` | Quick start |
| npm → native | `codebuddy install` | Install |
| Verify | `codebuddy --version` | Install |
| Update | `codebuddy update` | Install / troubleshooting |
| npm update fallback | `npm install -g @tencent-ai/codebuddy-code@latest` | Troubleshooting |
| npm latest | `npm view @tencent-ai/codebuddy-code version` | Troubleshooting |
| Disable auto-update | `export DISABLE_AUTOUPDATER=1` | Install |
| Uninstall Homebrew | `brew uninstall codebuddy-code` | Install |
| Uninstall npm | `npm uninstall -g @tencent-ai/codebuddy-code` | Install |
| Remove native binary | `rm -f ~/.local/bin/codebuddy` | Install |

Node.js: **18.20+** (install + troubleshooting). The overview has said 18.0+. Do not mix the two.

Native PATH: `~/.local/bin`; Windows `%USERPROFILE%\AppData\Local\codebuddy\bin`.

Config dir: `~/.codebuddy` / `%USERPROFILE%\.codebuddy`. Override: `CODEBUDDY_CONFIG_DIR`.

IDE download: [codebuddy.cn/ide](https://www.codebuddy.cn/ide/) · CN [copilot.tencent.com/ide](https://copilot.tencent.com/ide) · intl [codebuddy.ai](https://www.codebuddy.ai/). Requirements: [IDE install](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation).

Plugin: marketplace search **腾讯云代码助手**. [Plugin page](https://www.codebuddy.cn/docs/plugin/).

## CLI commands

Source: [CLI reference](https://www.codebuddy.cn/docs/cli/cli-reference)

| Command | What it does | Example |
|---------|--------------|---------|
| `codebuddy` | Interactive REPL | `codebuddy` |
| `codebuddy "query"` | REPL with an opening prompt | `codebuddy "Explain this project"` |
| `codebuddy -p "query"` | Print and exit | `codebuddy -p "Explain this function"` |
| `cat file \| codebuddy -p "query"` | Pipe | `cat logs.txt \| codebuddy -p "Analyze the log"` |
| `codebuddy -c` | Continue the latest chat | `codebuddy -c` |
| `codebuddy -c -p "query"` | Continue in print mode | `codebuddy -c -p "Check type errors"` |
| `codebuddy -r "<id>" "query"` | Resume by id | `codebuddy -r "abc123" "Finish this MR"` |
| `codebuddy update` | Update | `codebuddy update` |
| `codebuddy mcp` | Configure MCP | See [MCP](https://www.codebuddy.cn/docs/cli/mcp) |
| `codebuddy daemon start` | Start daemon | `codebuddy daemon start --port 8080` |
| `codebuddy daemon stop` / `status` / `restart` | Stop / inspect / restart | |
| `codebuddy daemon install` / `uninstall` | Register or remove a system service | `codebuddy daemon install --port 8080` |
| `codebuddy auto-mode defaults` / `config` / `critique` | Inspect auto-mode rules | |
| `codebuddy ps` | List workers | `codebuddy ps` |
| `codebuddy logs <name>` | Worker logs | `codebuddy logs feature-x` |
| `codebuddy attach <name>` | Attach to a worker | `codebuddy attach feature-x` |
| `codebuddy kill <name>` | Kill a worker | `codebuddy kill feature-x` |
| `codebuddy plugin install <plugin>` | Install a CLI plugin | See [plugin reference](https://www.codebuddy.ai/docs/cli/plugins-reference) |

## Common flags

Source: [CLI reference](https://www.codebuddy.cn/docs/cli/cli-reference). Daily subset, not the full page.

| Flag | Meaning |
|------|---------|
| `--print`, `-p` | Print and exit |
| `-y` / `--dangerously-skip-permissions` | Skip permission prompts |
| `--permission-mode` | `default` / `acceptEdits` / `auto` / `dontAsk` / `plan` / `bypassPermissions` |
| `--continue` / `-c` | Latest chat in this directory |
| `--resume` | Resume by id |
| `--model` | Model for this session |
| `--ide` | Connect to an IDE on start |
| `--add-dir` | Extra work directory |
| `--sandbox` | Sandbox (Beta) |
| `--worktree [name]` | Isolated git worktree |
| `--tmux` | With `--worktree` |
| `--bg` / `--name` | Background session |
| `--serve` | HTTP server |
| `--plugin-dir` | Load plugins from local dirs |
| `--output-format` | `text` / `json` / `stream-json` (print mode) |
| `--max-turns` | Max non-interactive turns |
| `--verbose` / `--debug` | Verbose / debug |
| `--system-prompt` / `--append-system-prompt` | Replace or append the system prompt |
| `--mcp-config` | Load MCP JSON |

Official note: `-p` plus file / shell / network work needs an explicit permission policy (`-y`, `--permission-mode auto` / `dontAsk`, pre-set `permissions.allow`, or a permission-prompt MCP tool).

## Slash commands

Source: [Slash commands](https://www.codebuddy.cn/docs/cli/slash-commands). High-frequency subset; full table is on the official page.

| Command | Role |
|---------|------|
| `/help` | Help |
| `/clear` | New conversation |
| `/login` / `/logout` | Sign in / out |
| `/init` | Initialize repo context |
| `/config` | Local settings |
| `/model` | Switch or list models |
| `/status` / `/doctor` | Session / environment |
| `/mcp` | MCP |
| `/skills` | Loaded Skills |
| `/plugin` | CLI plugins and marketplaces |
| `/compact` | Compact context |
| `/cost` / `/stats` | Token / usage |
| `/resume` / `/rewind` | Resume / rewind checkpoint |
| `/permissions` | Tool and directory permissions |
| `/plan` | Preview the plan file |
| `/ide` | IDE connection |
| `/sandbox` | Bash sandbox |
| `/memory` | Long-term memory |
| `/upgrade` | Open the upgrade page |

Custom commands: project `.codebuddy/commands/*.md`, user `~/.codebuddy/commands/*.md`. `test.md` → `/test`. Nested dirs use colons: `frontend/build.md` → `/frontend:build`.

## Keys

Source: [Quick start · shortcuts](https://www.codebuddy.cn/docs/cli/quickstart)

| Key | Action |
|-----|--------|
| `↑/↓` | History; `↓` lists background tasks when any are running |
| `Tab` | Complete |
| `Esc` | Clear input (twice) / go up |
| `Ctrl+C` / `Ctrl+D` | Quit (`Ctrl+D` needs an empty input, twice) |
| `Shift+Tab` (Windows also `Alt+M`) | Permission cycle `default → bypass → accept → plan` |
| `Enter` | Send |
| `Shift+Enter` / `\Enter` / `Ctrl+J` | Newline |
| `Ctrl+G` | Edit the prompt in an external editor |
| `Ctrl+R` | Expand / collapse detail |
| `Ctrl+O` | Thinking panel |

JetBrains terminal: ESC may not work — use `Ctrl+ESC` or `Shift+ESC` ([troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)).

## MCP add (excerpt)

Source: [MCP](https://www.codebuddy.cn/docs/cli/mcp)

```bash
codebuddy mcp add --scope user my-tool -- /path/to/tool arg1 arg2
codebuddy mcp add --scope project python-tool -- python /path/to/script.py
codebuddy mcp add --scope user --transport sse sse-server https://example.com/mcp/sse
codebuddy mcp add --scope project --transport http http-server https://example.com/mcp/http
```

## Decision table

| Situation | Pick |
|-----------|------|
| Already in VS Code / JetBrains | Plugin |
| One sentence → prototype / design / deploy | IDE |
| Terminal / CI / headless | CLI |
| Office docs / PPT, not a repo | WorkBuddy (not taught here) |
| General chat | Yuanbao (not taught here) |
| China account | CLI Chinese Site |
| Overseas account | CLI International Site |

## Glossary index

One-line hooks. Definitions live in the [Glossary](./codebuddy-glossary).

| Term | Hook | More |
|------|------|------|
| CodeBuddy IDE | Standalone editor | [Glossary](./codebuddy-glossary#codebuddy-ide) |
| CodeBuddy Plugin | Extension in an existing IDE | [Glossary](./codebuddy-glossary#codebuddy-plugin) |
| CodeBuddy Code | Terminal agent, `codebuddy` | [Glossary](./codebuddy-glossary#codebuddy-code) |
| WorkBuddy | Office workbench, not the coding path | [Glossary](./codebuddy-glossary#workbuddy) |
| CN / intl sites | Two docs and login domains | [Glossary](./codebuddy-glossary#cn-vs-intl-sites) |
| `CODEBUDDY.md` | Migratable instruction file | [Glossary](./codebuddy-glossary#codebuddymd) |

## Common errors

| Symptom | Official handling |
|---------|-------------------|
| `codebuddy: command not found` | PATH missing the install dir; `source ~/.zshrc` |
| Windows "not recognized" | `npm config get prefix`, add the global npm dir to PATH |
| npm succeeded, binary still old | Multiple binaries (npm + Homebrew / nvm) |
| Native binary missing | `export PATH="$HOME/.local/bin:$PATH"` |
| `-p` cannot touch files | Add `-y` or another permission policy |
| LAN `--serve` empty response | Listens on `127.0.0.1`; use `--host 0.0.0.0` |

## Agent SDK (optional)

Source: [Agent SDK](https://www.codebuddy.cn/docs/cli/sdk). Docs target SDK v0.1.0+.

```bash
npm install @tencent-ai/agent-sdk
```

```bash
pip install codebuddy-agent-sdk
```

TypeScript/JavaScript needs Node.js >= 18.20. This site does not treat the SDK as the main path.

## High-quality sources

Last verified: 2026-08-18. Only pages opened during research.

### First-party

| Source | Use |
|--------|-----|
| [codebuddy.cn](https://www.codebuddy.cn/) | CN marketing site |
| [codebuddy.cn/docs](https://www.codebuddy.cn/docs/) | ZH overview (three forms) |
| [IDE install](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation) | IDE requirements and login |
| [Plugin docs](https://www.codebuddy.cn/docs/plugin/) | Host versions and install |
| [CLI overview](https://www.codebuddy.cn/docs/cli/) | CLI entry |
| [CLI install](https://www.codebuddy.cn/docs/cli/installation) | Package managers / native / uninstall |
| [CLI quick start](https://www.codebuddy.cn/docs/cli/quickstart) | Login, `/init`, keys, `-p` |
| [CLI reference](https://www.codebuddy.cn/docs/cli/cli-reference) | Subcommands and flags |
| [Slash commands](https://www.codebuddy.cn/docs/cli/slash-commands) | Full `/` table |
| [Troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting) | Node, Windows, migration, quota |
| [MCP](https://www.codebuddy.cn/docs/cli/mcp) | `codebuddy mcp add` |
| [SDK](https://www.codebuddy.cn/docs/cli/sdk) | Agent SDK |
| [Pricing](https://www.codebuddy.cn/pricing/) | Plan entry (client-rendered) |
| [Tencent Cloud acc](https://cloud.tencent.com/product/acc) | Cloud product page |
| [Overview 1831](https://cloud.tencent.com/document/product/1831/134343) | Three-form comparison |
| [codebuddy.ai/docs](https://www.codebuddy.ai/docs/) | Intl docs |
| [codebuddy.ai/docs/zh](https://www.codebuddy.ai/docs/zh/) | Intl ZH mirror |
| [WorkBuddy intro](https://www.codebuddy.cn/docs/workbuddy/) | Map-row source |
| [WorkBuddy mini program](https://www.codebuddy.cn/docs/workbuddymini/) | Map row |
| [WorkBuddy mobile](https://www.codebuddy.cn/docs/workbuddyapp/) | Map row |
| [Yuanbao](https://yuanbao.tencent.com/) | Same-vendor assistant |
| [Hunyuan](https://hunyuan.tencent.com/) | Same-vendor model |

### Unverified

- Concrete pricing numbers (page is client-rendered; 2026-08-18 reader did not extract a tariff table)
- Whether a repo-root `CODEBUDDY.md` is auto-injected the same way as `~/.codebuddy/CODEBUDDY.md` (troubleshooting only names the migration file)
