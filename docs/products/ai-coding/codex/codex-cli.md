# Codex CLI

> A **tutorial** — read it in order, once. It takes you from nothing installed to a configured, sandboxed Codex you trust with a real repository.
>
> Once you are past that, the [Cookbook](./codex-cookbook) has task recipes, the [Cheatsheet](./codex-cheatsheet) is for looking up a flag, and the [Glossary](./codex-glossary) explains why the design is the way it is.
>
> Everything below is traceable to the official documentation at `learn.chatgpt.com/docs`. The older `developers.openai.com/codex/*` URLs now 308-redirect there.

## What you are installing

Codex is an agent, not an autocomplete. You give it a task in natural language; it reads files, runs commands, edits code, and reports back. The three things that make it usable in a real repository — and the three things this page sets up — are:

1. **A sandbox** that mechanically limits what it can write to.
2. **An approval policy** that decides when it stops to ask you.
3. **An `AGENTS.md`** that tells it your project's rules so you stop repeating yourself.

Skip any of the three and Codex will still work, but you will either not trust it or spend your day answering prompts.

## Prerequisites

| Item | Requirement |
| --- | --- |
| macOS | 12 or later |
| Linux | Ubuntu 20.04+ / Debian 10+ |
| Windows | Windows 11 via WSL2 |
| Git | 2.23 or later (optional) |
| RAM | 4 GB minimum, 8 GB recommended |

Source: [`openai/codex` docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md)

Windows is worth a note: the supported path is WSL2, not native PowerShell. The sandbox implementation relies on OS-level primitives, and WSL2 is where the Linux ones are available.

## Step 1 — Install

The npm package is the cross-platform route:

```bash
npm install -g @openai/codex
codex --version
```

On macOS, the Homebrew cask is `codex` (not `openai-codex`, and not a custom tap):

```bash
brew install --cask codex
codex --version
```

Verified against the current Homebrew cask (`homebrew/homebrew-cask` `Casks/c/codex.rb`), which ships CLI 0.147.0. Official install documentation still leads with npm; use whichever channel you already trust.

## Step 2 — Sign in

Codex is included with ChatGPT Plus, Pro, Business, Edu, and Enterprise plans. You do not buy it separately, and you do not need to provision an API key for normal CLI use.

```bash
codex login           # opens a browser, signs in with your ChatGPT account
codex login status    # exits 0 when saved credentials are present
codex doctor          # local diagnostic report (install, auth, config, runtime)
codex logout
```

`codex login status` is the documented auth check. For the account, model, and configuration of the *current session*, use the `/status` slash command inside the TUI.

> There is no `codex status` subcommand in the official CLI reference. Older guides that print `codex status` or `codex auth status` are naming commands that are not in [developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli).

Details on plans and quotas live in [ChatGPT Plans and Codex Access](./chatgpt-plus). This tutorial quotes no numbers, because they change.

## Step 3 — Your first session

Start in a repository you already know. Reading beats writing for a first run.

```bash
cd ~/code/some-project
codex --sandbox read-only "explain how this project is structured, and where the entry points are"
```

`--sandbox read-only` makes writes mechanically impossible, so the first thing you see is Codex reasoning about your code rather than changing it. When you are comfortable, drop the flag: `workspace-write` is the default.

```bash
codex                                        # interactive session, default sandbox
codex "add a test for the date parser"       # interactive, with a starting prompt
codex --model gpt-5.6 "..."                  # pick the model for this run
codex --cd services/payments "..."           # scope to a subdirectory of a monorepo
codex --add-dir ../shared-lib "..."          # grant one more directory (repeatable)
```

`--cd` is the flag that makes monorepos tolerable. Pointing Codex at `services/api` instead of the repository root keeps its attention — and its writes — where the task is.

## Step 4 — Working in the TUI

The interactive session is where most of the work happens. These are the keys that change how it feels:

| Key | Action |
| --- | --- |
| `@` | Fuzzy file search across the workspace root |
| `!` prefix | Run a shell command under the current approval/sandbox settings |
| `$app-slug` | Mention a connector app |
| `Tab` | Queue a follow-up message while Codex is still working |
| `Esc` `Esc` | On an empty composer, edit your previous message (`Enter` forks from there) |
| `Up` / `Down` | Draft history |
| `Ctrl+R` | Search prompt history |
| `Ctrl+G` | Open `$VISUAL` / `$EDITOR` |
| `Ctrl+L` | Clear the screen |
| `Ctrl+O` | Copy the last output (same as `/copy`) |
| `Ctrl+C` | Interrupt / exit |

Two of these are worth internalizing early. `@` is how you point at a file precisely instead of describing it — `@src/auth/session.ts` beats "the session file." And `Esc` `Esc` is the recovery move when a prompt came out wrong: edit it and fork, rather than piling a correction on top of a bad turn.

## Step 5 — Slash commands

Slash commands control the session itself. The full list is in the [official reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli); these are the ones you will reach for constantly:

| Group | Commands |
| --- | --- |
| Permissions & sandbox | `/permissions`, `/approve`, `/sandbox-add-read-dir` (Windows-native only) |
| Session lifecycle | `/new`, `/clear`, `/compact`, `/fork`, `/resume`, `/archive`, `/delete`, `/stop` (alias `/clean`), `/exit`, `/quit` |
| Inspect | `/status`, `/usage`, `/diff`, `/debug-config`, `/ps` (needs `unified_exec`), `/mcp` |
| Model & behavior | `/model`, `/fast`, `/plan`, `/goal` (max 4,000 chars), `/personality`, `/raw` |
| Extensions | `/agent`, `/apps`, `/plugins`, `/hooks`, `/skills`, `/memories` |
| Editing & review | `/review`, `/init`, `/import`, `/mention`, `/copy` |
| Appearance | `/theme`, `/statusline`, `/title`, `/keymap`, `/vim`, `/ide` |
| Misc | `/feedback`, `/logout`, `/experimental` |

Three of them do disproportionate work:

- **`/init`** generates a starting `AGENTS.md` from what Codex can infer about your project. Start here rather than from a blank file.
- **`/review`** diffs against the base branch and reviews it. This is the pre-push habit worth forming.
- **`/debug-config`** prints the configuration layers actually in effect. Every "why is my config being ignored" question ends here.

`/usage` accepts `daily`, `weekly`, and `cumulative`. `/import` migrates a Claude Code or Cursor setup and works in the local TUI only (the desktop app also imports Claude Cowork). Personalities are `friendly`, `pragmatic`, and `none`.

## Step 6 — Configure it

Configuration lives at `~/.codex/config.toml`. A reasonable everyday starting point:

```toml
model = "gpt-5.6"
model_reasoning_effort = "medium"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"

[sandbox_workspace_write]
network_access = false

[projects."/Users/you/work/my-repo"]
trust_level = "trusted"
```

Read that block as four decisions:

**`sandbox_mode`** — `read-only`, `workspace-write`, or `danger-full-access`. This is a hard boundary, not a suggestion. `workspace-write` is the right default; `read-only` is for review work.

**`approval_policy`** — `untrusted`, `on-request`, `never`, or a granular table. `on-request` is the interactive default. `never` is for automation where nobody is present to answer. (`on-failure` is deprecated.)

**`web_search`** — `disabled`, `cached` (default), `indexed`, or `live`. Cached results come from an OpenAI-maintained index, not a live fetch. If Codex tells you something stale about a fast-moving library, pass the bare `--search` flag or set `live`.

**`trust_level`** — this is the one that silently breaks things. A project's own `.codex/config.toml` is not loaded at all until the project is trusted. If project config appears to do nothing, check this first.

### Reasoning effort

```toml
model_reasoning_effort = "medium"   # minimal | low | medium | high | xhigh
```

`xhigh` requires the Responses API. Match effort to the task: `high` on a one-line rename is waste, and `low` on a subtle concurrency bug is false economy.

### Profiles

A profile is a named config bundle, stored as `$CODEX_HOME/<name>.config.toml`:

```toml
# ~/.codex/review.config.toml
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "never"
```

```bash
codex --profile review "review the uncommitted changes and list only real defects"
```

That combination — read-only plus never-ask — is the one to remember. It cannot modify anything and it will not interrupt you, so it is safe to point at code you do not trust.

### Which environment variables reach spawned commands

```toml
[shell_environment_policy]
inherit = "core"            # all | core | none
include_only = ["PATH", "HOME", "LANG"]
exclude = ["AWS_*", "*_SECRET"]
set = { CI = "1" }
```

This is the mechanism for keeping credentials out of subprocesses. If you have secrets in your shell environment, configure it deliberately rather than inheriting everything.

### Keys a project cannot override

When these appear in a project-level `.codex/config.toml`, they are **ignored**:

`openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel`

This is deliberate: a repository you clone should not be able to redirect your agent at someone else's endpoint. Put these in `~/.codex/config.toml` instead.

## Step 7 — Write an AGENTS.md

`AGENTS.md` is a natural-language briefing loaded on every run. Its job is to stop you re-explaining the same three things in every session.

```markdown
# Project conventions

## Tooling
- Package manager: pnpm. Do not use npm or yarn.
- Tests: `pnpm test`. Type check: `pnpm typecheck`.

## Boundaries
- Do not modify `legacy/` — it is being decommissioned.
- Schema changes must also update `types/db.ts`.

## Verification
- Run `pnpm test` and `pnpm typecheck` after any change and report the output.
```

What earns its place: commands only someone on the team would know, boundaries that are not obvious from the tree, and the verification step you want run without asking. What does not: restating what a linter already enforces, or a general essay on code quality.

Combined instruction files are capped by `project_doc_max_bytes` — 32 KiB by default. Past that limit, content is dropped, which is the usual explanation for "Codex ignored my AGENTS.md."

```toml
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

See the [official AGENTS.md reference](https://learn.chatgpt.com/docs/agent-configuration/agents-md) for discovery and merge order across nested directories.

## Step 8 — Non-interactive mode

`codex exec` is the same agent with no TUI — one shot, then exit. This is what you use in scripts and CI.

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize recent changes"
codex exec resume --last "now add tests for that function"
codex --ask-for-approval never exec "update the changelog"
```

In CI, `--ask-for-approval never` is mandatory: there is no human to answer a prompt, so anything else eventually hangs. `exec` logging defaults to `RUST_LOG=error`.

Do not use `--full-auto`. The 0.147.0 changelog removed the deprecated `codex exec --full-auto` flag; new scripts should set `--sandbox workspace-write` (and an approval flag) explicitly. Official non-interactive docs still mention `--full-auto` only as a compatibility leftover that prints a warning.

```bash
codex --ask-for-approval never exec --json \
  "run the test suite; if anything fails, fix it and re-run until green"
```

For a full workflow, see [Project Integration](./integration).

## Step 9 — Sessions

Sessions persist, so a long task can survive a closed terminal.

```bash
codex resume                  # pick from a list
codex resume --last           # resume the most recent
codex resume <SESSION_ID>
codex resume --all            # list all sessions
codex fork                    # branch a session
codex unarchive <SESSION>
```

Session records live in `~/.codex/sessions/`. IDs come from the picker, from `/status`, or from that directory.

Older context gets compacted — lossily compressed — as a session grows. That is why quality sometimes degrades late in a long conversation. For an unrelated task, `/clear` and start clean; that is cheaper and better than carrying dead context.

## Step 10 — Extending it

Once the basics are solid, four extension points are worth knowing about. All of them are documented in depth on their own pages; the summary here is so you know what exists.

**MCP servers** connect Codex to external tools and data.

```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
startup_timeout_sec = 10
tool_timeout_sec = 60

[mcp_servers.internal-api]
url = "https://mcp.example.com/sse"
bearer_token_env_var = "INTERNAL_API_TOKEN"
enabled = true
```

> `mcp_servers` is a **table keyed by server id**. It is not an array of tables — `[[mcp_servers]]` will fail to parse — and there is no `name` or `type` key.

Manage them from the CLI with `codex mcp`. Codex can also run *as* an MCP server, so another agent can drive it.

**Hooks** force a command to run at a lifecycle event:

```toml
[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = ["pnpm", "lint", "--fix"]
command_windows = ["pnpm.cmd", "lint", "--fix"]
```

Events: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`. Only command hooks execute today.

**Subagents** delegate work to a separate agent with its own config, spawned only when asked:

```toml
[agents]
max_depth = 1
max_threads = 6
job_max_runtime_seconds = 1800

[agents.reviewer]
description = "read-only adversarial reviewer"
config_file = "reviewer.config.toml"
```

**Feature flags** gate features that are off by default:

```bash
codex features list
codex features enable <flag>
codex features disable <flag>
```

These write to `$CODEX_HOME/config.toml` and do **not** accept `--profile`. `memories` is off by default.

## When something goes wrong

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| `.codex/config.toml` has no effect | Project not trusted, or the key can't be set at project scope | Set `projects.<path>.trust_level = "trusted"`; check the ignored-keys list; run `/debug-config` |
| `AGENTS.md` guidance ignored | Combined size hit `project_doc_max_bytes`, or an `AGENTS.override.md` shadowed it | Trim the file or raise the limit; check for override files |
| Codex keeps stopping to ask | `approval_policy` too strict for the context | `--ask-for-approval never` for automation, or `/permissions` in the TUI |
| Codex edited files during a review | Sandbox allows writes | `--sandbox read-only` |
| Web results feel stale | `web_search` defaults to `cached` | Bare `--search`, or set `web_search = "live"` |
| Quality degrades mid-session | Context saturated or compacted | `/clear` for a new task, or `/compact` then continue |
| `[[mcp_servers]]` fails to parse | Wrong TOML shape | Use `[mcp_servers.<id>]` |
| `compdef: command not found` in zsh | `compinit` not loaded | Add `autoload -Uz compinit && compinit` to `.zshrc` |
| Managed permission profiles not enforced | Client on 0.137.0 or earlier | Upgrade to 0.138.0+ |

When you need to see what is actually happening, turn on file logging:

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

Setting `log_dir` also enables the plaintext `codex-tui.log`. Tracing honors `RUST_LOG`.

Shell completion, while you are here:

```bash
codex completion zsh     # also: bash, fish
```

## Where to go next

You now have Codex installed, signed in, sandboxed, configured, and briefed on your project. The natural next steps:

- [Codex Cookbook](./codex-cookbook) — recipes for specific tasks
- [Project Integration](./integration) — `AGENTS.md`, MCP, and CI in a real repository
- [Codex Glossary](./codex-glossary) — the concepts behind the flags
- [Codex Cheatsheet](./codex-cheatsheet) — one-page lookup
- [Codex Product Line](./codex-ai) — the IDE, app, and cloud surfaces
- [Learning Map](./) — the full path

## Official sources

- [Quickstart](https://learn.chatgpt.com/docs/quickstart) — install through first run
- [CLI](https://learn.chatgpt.com/docs/codex/cli) — the CLI surface
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) — every config key
- [Permissions](https://learn.chatgpt.com/docs/permissions) and [Sandboxing](https://learn.chatgpt.com/docs/sandboxing)
- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- [docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md) — system requirements and building from source
