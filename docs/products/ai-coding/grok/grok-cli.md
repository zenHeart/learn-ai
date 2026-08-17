# Grok Build Tutorial

> This page covers Grok Build (executable `grok`) from installation through daily use. Parameter lists are in the [cheatsheet](./grok-cheatsheet.md), concept distinctions in the [glossary](./grok-glossary.md), and task recipes in the [cookbook](./grok-cookbook.md).
>
> Grok Build is in beta and ships very fast (recently roughly one npm release every one to three days), so this page deliberately avoids pinning version numbers. If a command or config key does not match your machine's actual behavior, check [x.ai/build/changelog](https://x.ai/build/changelog) first.

## 1. Install

There are three official installation channels.

::: code-group

```bash [macOS / Linux]
curl -fsSL https://x.ai/cli/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://x.ai/cli/install.ps1 | iex
```

```bash [npm (cross-platform)]
npm install -g @xai-official/grok
```

:::

- The first two come from [docs.x.ai/build/overview](https://docs.x.ai/build/overview) and the [repository README](https://github.com/xai-org/grok-build).
- The npm channel is documented in [docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise), which lists it as the alternative when a network policy forbids `curl | bash`. The npm package requires Node.js `>= 20` and supports x64 and arm64 on macOS / Linux / Windows.

Verify the install:

```bash
grok --version
```

> **Naming note**: a binary you build from source is called `xai-grok-pager`; official installs ship it as `grok` (the [README](https://github.com/xai-org/grok-build) says: "The binary artifact is named `xai-grok-pager`; official installs ship it as `grok`.").

## 2. Authenticate

Four methods, from [docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise):

| Method | How | When to use |
|--------|-----|-------------|
| Browser OIDC | `grok login` (the first launch opens a browser automatically) | Local development |
| Device code | `grok login --device-auth` (RFC 8628) | SSH / remote hosts / no browser |
| API key | `export XAI_API_KEY="xai-..."`, then run `grok` | CI, containers |
| External auth provider | Configure `auth_provider_command` | Enterprise SSO |

Credential resolution order (highest to lowest): `model.api_key` > `model.env_key` > active session token > `XAI_API_KEY`.

Subscription requirements: the [launch announcement](https://x.ai/news/grok-build-cli) (2026-05-25) says "Available now to all SuperGrok and X Premium Plus subscribers.", while the marketing page [x.ai/build](https://x.ai/build) currently says "Available to try for Free". The two disagree — trust the quota you actually see after logging in. xAI publishes no concrete figure for the free tier.

<!-- TODO: 待核实 —— 免费额度的具体数值、SuperGrok/X Premium Plus 与 Grok Build 用量的换算关系，官方文档与营销页均未给出说明 -->

Log out with `grok logout`.

## 3. First run

```bash
cd your-project
grok
```

Launching with no arguments enters the interactive TUI ([cli/reference](https://docs.x.ai/build/cli/reference): "Running `grok` with no arguments starts the interactive TUI.").

The first prompts xAI suggests ([overview](https://docs.x.ai/build/overview)):

```text
Explain this repo.
@src/main.rs Walk me through this file.
```

`@` references a file. **Run `grok inspect` right after installing** — it prints everything Grok discovered in the current directory: config sources, instruction files (with token counts), skills, plugins, hooks, and MCP servers. It is the first diagnostic to reach for whenever configuration seems to have no effect.

```bash
grok inspect
grok inspect --json
```

## 4. Essential TUI keys

The full key table is available inside the TUI with `Ctrl+.` (`Ctrl+X` on Windows or terminals without Kitty keyboard protocol support). The subset below is enough to get started, from [keyboard-shortcuts](https://docs.x.ai/build/keyboard-shortcuts):

| Key | Action |
|-----|--------|
| `Enter` | Send |
| `Shift+Enter` | Newline (not recognized by the built-in terminals in VS Code / Cursor / Windsurf / Zed — use `Alt+Enter` there) |
| `Shift+Tab` | Cycle Normal → Plan → Auto → Always-approve |
| `Esc` | Interrupt the current action |
| `Esc Esc` | Trigger `/rewind` (roll the session back) |
| `Ctrl+Enter` / `Ctrl+I` | Interject (`Ctrl+L` in VS Code-family terminals) |
| `Ctrl+P` or `?` | Command palette |
| `Ctrl+T` | Todo panel |
| `Ctrl+B` | Background task panel |
| `Ctrl+G` | Task panel |
| `Ctrl+S` | Session panel |
| `Ctrl+M` | Model picker |
| `Ctrl+\` | Dashboard |
| `Ctrl+O` | Switch to always-approve |
| `F2` / `Ctrl+,` | Settings |
| `Ctrl+Q` / `Ctrl+D` | Quit (only `Ctrl+D` works in VS Code-family terminals) |

When the terminal misbehaves (copy-paste broken, keys mis-read), run `/terminal-setup` inside the TUI for a self-check; see [terminal-support](https://docs.x.ai/build/cli/terminal-support).

## 5. Permissions: understand that these are two separate things

This is the easiest part of Grok Build to get wrong. From the official [permissions](https://docs.x.ai/build/features/permissions) page:

> "Permissions decide which tool calls may run. The sandbox is separate: it limits what an approved call can do on the filesystem and network."

**Permissions decide whether a tool call may run at all; the sandbox decides what it can touch once it does.** The two are orthogonal and can be used together.

Three permission modes:

| Mode | Behavior | How to enter |
|------|----------|--------------|
| Ask (default) | Anything not covered by an allow rule prompts for confirmation | — |
| Auto | A classifier auto-approves safe tools; dangerous ones may still prompt (`deny` rules and hooks still apply) | `/auto`, `Shift+Tab` (when the feature is enabled) |
| Always-approve | Tool calls are auto-approved (`deny` rules and `PreToolUse` hooks still apply) | `/always-approve`, `Ctrl+O`, `Shift+Tab`, `grok --always-approve` |

The default mode can only be set in the **user-level** `~/.grok/config.toml` (a project-level `.grok/config.toml` has no effect):

```toml
[ui]
permission_mode = "auto"  # or "ask" | "always-approve"
```

Rule syntax (`--allow` / `--deny` accept the same patterns):

```toml
[permission]
rules = [
  { action = "allow", tool = "bash", pattern = "git *" },
  { action = "allow", tool = "read" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
]
```

Three rules worth memorizing:

1. **`deny` always beats `allow`.** The full precedence is deny > ask > allow ([settings/reference](https://docs.x.ai/build/settings/reference)) — it is not "last one wins".
2. Supported filters: `Bash`, `Edit`, `Read`, `Grep`, `MCPTool`, `WebFetch`, `WebSearch`.
3. Clicking "always allow" interactively still re-prompts for dangerous patterns like `rm` or `git push`. Only explicit allow rules in config or on the CLI truly auto-approve.

## 6. Sandbox: off by default

Per [sandbox](https://docs.x.ai/build/features/sandbox): Landlock on Linux, Seatbelt on macOS, and **`off` by default**.

| Profile | Read | Write | Subprocess network | Use case |
|---------|------|-------|--------------------|----------|
| `off` | Unrestricted | Unrestricted | Allowed | Default, no sandbox |
| `workspace` | Everywhere | CWD, `~/.grok/`, temp dirs | Allowed | Normal development |
| `devbox` | Everywhere | Top-level dirs except `/data` | Allowed | Cloud devbox |
| `read-only` | Everywhere | Only `~/.grok/` and temp dirs | Blocked | Code review, audit |
| `strict` | CWD and system paths | CWD, `~/.grok/`, temp dirs | Blocked | Untrusted repos |

Three ways to turn it on: `grok --sandbox workspace`, `[sandbox] profile = "workspace"`, or `GROK_SANDBOX=workspace`.

Two limitations you must know (both stated explicitly by xAI):

- **Subprocess network restrictions only apply on Linux.** On macOS, the network blocking in `read-only` / `strict` is a no-op.
- Built-in profiles do **not** permanently protect sensitive paths such as `~/.ssh`; write your own deny list:

```toml
# ~/.grok/sandbox.toml
[profiles.my-profile]
extends = "workspace"
restrict_network = true
deny = ["/secrets", "**/.env", "**/*.pem"]
```

On Linux, "readable but with certain paths denied" requires `bubblewrap` installed on the system.

## 7. Plan mode

Enter with `/plan [description]`; view with `/view-plan` (aliases `/show-plan`, `/plan-view`). Keys on the plan review screen: `a` approve, `s` request changes, `c` comment, `q` quit, `Tab` switch focus.

Two things to know ([plan-mode](https://docs.x.ai/build/features/plan-mode)):

- Plan mode and permission mode are **independent**: even under auto or always-approve, the plan review screen is not skipped.
- In plan mode only the session plan file is editable, but **bash can still write through redirection** — it is not hard isolation. If you need hard isolation, configure the sandbox.

## 8. Session management

Sessions are stored under `~/.grok/sessions/`, indexed by working directory ([sessions](https://docs.x.ai/build/features/sessions)).

| Goal | How |
|------|-----|
| Resume the last session | `grok -c` (or `--continue`) |
| Pick a session to resume | `grok --resume` (lists candidates when no ID is given) |
| Resume a specific session | `grok --resume <id>` |
| Resume from inside the TUI | `/resume` |
| Fork the current session | `/fork [directive]`, optionally `--worktree` / `--no-worktree` |
| Roll back history | `/rewind` or `Esc Esc` |
| Compact the context | `/compact [focus]`; also happens automatically |
| Check context usage | `/context`, `/session-info` |
| List / search / delete | `grok sessions list` / `search` / `delete` |
| Export | `grok export <session-id> [output]`, `--clipboard` for the clipboard |
| Rename | `/rename` (alias `/title`) |

Grabbing the session ID from headless mode:

```bash
grok -p "Start the refactor" --output-format json | jq -r '.sessionId'
```

## 9. Project rules: AGENTS.md

Grok Build's primary project-rules file is `AGENTS.md`. Loading starts with the global rules in `~/.grok/`, then walks from the repository root down to the current directory ([project-rules](https://docs.x.ai/build/features/project-rules)).

Files it reads:

- `AGENTS.md`, `Agents.md`, `AGENT.md`
- `CLAUDE.md`, `Claude.md`, `CLAUDE.local.md`
- Every `*.md` under `.grok/rules/`, plus `.claude/rules/` and `.cursor/rules/`

Gitignored files are skipped. For a one-off addition use `--rules <TEXT>`; to replace the whole system prompt use `--system-prompt-override <TEXT>`. `grok inspect` lists which rules files were actually loaded and each one's token count — start there when rules seem to be ignored.

## 10. Switching models

```bash
grok -m grok-build-0.1 -p "Refactor this module"
```

Inside the TUI use `/model` (alias `/m`) or `Ctrl+M`. Reasoning effort is set with `/effort` or `--effort <LEVEL>`.

Pointing at a self-hosted or third-party OpenAI-compatible endpoint ([overview](https://docs.x.ai/build/overview)):

```toml
# ~/.grok/config.toml (Windows: %USERPROFILE%\.grok\config.toml)
[model.my-model]
model = "model-id"
base_url = "https://api.example.com/v1"
name = "Display Name"
env_key = "API_KEY"

[models]
default = "my-model"
```

After editing, confirm it was picked up with `grok inspect`, then verify with `grok -p "Hello" -m my-model`.

## 11. Headless mode

```bash
grok -p "Explain this codebase"
grok -p "Explain the architecture" --output-format streaming-json
```

Common parameters ([headless-scripting](https://docs.x.ai/build/cli/headless-scripting)):

| Parameter | Purpose |
|-----------|---------|
| `-p, --single <PROMPT>` | Send a single prompt |
| `-s, --session-id <ID>` | Create or reuse a named headless session |
| `-r, --resume <ID>` / `-c, --continue` | Resume a session |
| `--cwd <PATH>` | Set the working directory |
| `--output-format <FMT>` | `plain` (human) / `json` (one object at the end) / `streaming-json` (line-delimited JSON events) |
| `--always-approve` | Skip confirmations |
| `--no-alt-screen` | Inline output instead of taking over the screen |

Headless sessions live in `~/.grok/sessions` too.

**Always disable auto-update in CI**: pass `--no-auto-update`, or persist it in `~/.grok/config.toml`:

```toml
[cli]
auto_update = false
```

## 12. ACP: embed in an editor or your own orchestrator

```bash
grok agent stdio
```

This runs Grok as an ACP (Agent Client Protocol) agent, speaking JSON-RPC over stdin/stdout. The handshake order in the official example ([headless-scripting](https://docs.x.ai/build/cli/headless-scripting)):

1. `initialize`, passing `protocolVersion: 1` and `clientCapabilities` (`fs.readTextFile` / `fs.writeTextFile` / `terminal`)
2. `authenticate`: choose `xai.api_key` if `XAI_API_KEY` is set, otherwise `cached_token` (with neither, the official error text is "Run `grok login` first, or set XAI_API_KEY.")
3. `session/new`, passing `{ cwd, mcpServers: [] }`
4. `session/prompt`, passing `prompt: [{ type: "text", text: "..." }]`

One critical detail: **the return value of `session/prompt` is only completion metadata. The assistant's actual text arrives as a stream of `agent_message_chunk` events via `session/update`** — reading only the return value makes it look like nothing was produced.

## 13. Updating and troubleshooting

```bash
grok update --check        # check only
grok update                # update
grok update --version <V>  # install a specific version
grok update --alpha        # switch to the alpha channel
grok update --stable       # switch back to stable
```

| Symptom | Check first |
|---------|-------------|
| Config / rules / MCP not taking effect | `grok inspect` (see what was actually loaded) |
| A project-level config key has no effect | A project `.grok/config.toml` **only supports `[mcp_servers]`, `[plugins]`, and `[permission]`**; every other key must go in `~/.grok/config.toml` |
| MCP server will not start | `grok mcp doctor [name]`; logs are at `~/.grok/logs/mcp/<server>.stderr.log` |
| Copy-paste or keys behaving oddly | `/terminal-setup` |
| Web fetch tool does nothing | `GROK_WEB_FETCH` defaults to `0` (off for security); enable it explicitly |
| Cannot connect from a corporate network | `cli-chat-proxy.grok.com` and `auth.x.ai` must be allowed ([enterprise](https://docs.x.ai/build/enterprise)) |

Feedback goes through `/feedback` in the TUI. **Do not open PRs against [xai-org/grok-build](https://github.com/xai-org/grok-build)** — the README states "External contributions are not accepted."

## Related pages

- [Grok learning map](./index.md)
- [Cookbook](./grok-cookbook.md) — hooks, MCP, skills, subagents, CI recipes
- [Cheatsheet](./grok-cheatsheet.md) — full commands / flags / config keys / env vars
- [Glossary](./grok-glossary.md) — permissions vs. sandbox, skill vs. plugin, and other distinctions
