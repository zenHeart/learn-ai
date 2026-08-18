# Cursor CLI

Cursor CLI is the **same coding agent** in a terminal: interactive session, or print mode for scripts and CI. The binary is **`agent`**, not `cursor`, and not the Origin CLI `origin`.

> Official: [CLI overview](https://cursor.com/docs/cli/overview), [Installation](https://cursor.com/docs/cli/installation), [Using](https://cursor.com/docs/cli/using), [Headless](https://cursor.com/docs/cli/headless).
>
> Recipes for CI copy-paste stay in the [cookbook](./cursor-cookbook#use-cursor-cli-in-the-terminal-or-ci).

## Prerequisites

- A shell on macOS, Linux, WSL, or Windows PowerShell
- A git checkout you are willing to edit
- For scripts / CI: a `CURSOR_API_KEY` from the dashboard

## Learning objectives

After this page you can:

1. Install `agent` and run one interactive turn
2. Switch Agent / Plan / Ask the same way the editor does
3. Use `-p` for headless, and `--force` when you actually want writes
4. Hand a session to Cloud with `&`, without confusing `agent` and `origin`

---

## Install

```bash
# macOS, Linux, WSL
curl https://cursor.com/install -fsS | bash

# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex

agent --version
```

If the shell cannot find `agent`, add `~/.local/bin` to `PATH` (bash: `~/.bashrc`; zsh: `~/.zshrc`). Update: `agent update` (auto-update is on by default).

## Interactive mode

```bash
agent
agent "refactor the auth module to use JWT tokens"
```

The agent can write, review, and modify code. Approve commands as they come.

### Modes

Same modes as the editor. Switch with slash commands, `Shift+Tab`, or `--mode`.

| Mode | What it does | How |
|------|--------------|-----|
| **Agent** | Full tools for coding tasks | Default |
| **Plan** | Design first; clarifying questions | `Shift+Tab`, `/plan`, `--plan`, `--mode=plan` |
| **Ask** | Read-only exploration | `/ask`, `--mode=ask` |

Debug Mode is an **editor** constraint. Do not invent a CLI `--mode=debug`.

### Session extras (official)

| Action | How |
|--------|-----|
| Cloud handoff | Prefix a message with `&` |
| Previous chats | `agent ls` |
| Latest conversation | `agent resume` or `agent --continue` |
| Specific id | `agent --resume="chat-id-here"` |
| Review diff | `Ctrl+R` (then `i` for follow-up) |
| Newline | `Shift+Enter` (or `Ctrl+J` in tmux) |
| Exit | `Ctrl+D` twice |
| `@` files / folders | Same idea as the editor |
| Shrink context | `/summarize` (`/compress` is an alias) |
| Worktree | `agent --worktree "…"` (optional name; lives under `~/.cursor/worktrees/`) |

```bash
# Mid-conversation → Cloud Agent
& refactor the auth module and add comprehensive tests
```

Pick that run up at [cursor.com/agents](https://cursor.com/agents) or on mobile.

Sandbox: `/sandbox` or `--sandbox <mode>` (`enabled` / `disabled`). Settings persist. Sudo: the CLI shows a masked password prompt; the **model never sees** the password.

## Non-interactive / CI

Use **print mode** (`-p` / `--print`) for scripts and CI.

```bash
export CURSOR_API_KEY=your_api_key_here

agent -p "find and fix performance issues" --model "gpt-5"
agent -p "review these changes for security issues" --output-format text
```

### Does `-p` write files?

Treat the dedicated [Headless](https://cursor.com/docs/cli/headless) page as the script contract:

```bash
# Propose only — will not modify files
agent -p "Add JSDoc comments to this file"

# Apply edits without confirmation
agent -p --force "Refactor this code to use modern ES6+ syntax"
```

`--force` is the write switch. HTML headless also documents the alias **`--yolo`**. The `.md` snapshot of that page names `--force` only.

`cli/using.md` still says “Cursor has full write access in non-interactive mode.” Prefer Headless for CI, and **pass `--force` when you want disk changes**.

Authenticate scripts with `CURSOR_API_KEY`. Output: `--output-format text` (default for `-p`), `json`, or `stream-json`.

```bash
agent -p --force --output-format text \
  "Review recent changes and write feedback to review.txt"
```

## Rules, MCP, ACP

The CLI loads the same [rules](https://cursor.com/docs/rules) as the editor from `.cursor/rules`. It also reads root **`AGENTS.md`** and **`CLAUDE.md`**.

MCP comes from the project's **`mcp.json`** (the same servers as the editor). Cloud Agents use the **team** MCP list on cursor.com/agents — different source.

ACP: `agent acp` runs Cursor CLI as an ACP server over `stdio` (JSON-RPC). JetBrains talks ACP too — [JetBrains](https://cursor.com/docs/integrations/jetbrains).

## `agent` vs `origin`

| Binary | Product | Tutorial |
|--------|---------|----------|
| **`agent`** | Coding agent (this page) | you are here |
| **`origin`** | Git forge CLI | [Origin](./origin) |

Do not run `curl https://cursor.com/install` and expect a git host. That install is **`agent`**.

## When to use it

- You are already in tmux / SSH / a CI job
- You want the same Rules / `AGENTS.md` without opening the GUI
- You need a worktree (`--worktree`) so the agent does not edit your current checkout

Stay in the editor for Tab, Inline Edit, and Debug Mode. Use [Cloud Agents](./cloud-agents) when the laptop should sleep. Use [SDK](./cursor-sdk) when the caller is **your** TypeScript / Python process.

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| Type `cursor` in the terminal | Binary is **`agent`** |
| `agent -p` in CI, no file changes | Add **`--force`** (Headless page) |
| Trust `using.md` “full write access” alone | Follow **Headless** + `--force` |
| Expect Debug Mode | Editor only |
| Confuse with Origin CLI | `origin` is the forge |
| Prefix Cloud handoff without `&` | `& refactor …` |
| Assume Cloud team MCP | CLI reads **project `mcp.json`** |

## Next steps

- [Cookbook · CLI](./cursor-cookbook#use-cursor-cli-in-the-terminal-or-ci) — CI snippets
- [Cloud Agents](./cloud-agents) — `&` landing zone
- [Cursor SDK](./cursor-sdk) — same agent, in-process
- Official: [Overview](https://cursor.com/docs/cli/overview), [Installation](https://cursor.com/docs/cli/installation), [Using](https://cursor.com/docs/cli/using), [Headless](https://cursor.com/docs/cli/headless)
