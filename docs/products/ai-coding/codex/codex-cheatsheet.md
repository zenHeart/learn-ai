# Codex Cheatsheet

> A **reference** page — look things up, don't read it end to end. Concept definitions live in the [Codex Glossary](./codex-glossary); task recipes live in the [Codex Cookbook](./codex-cookbook).
>
> All commands, flags, and config keys below are traceable to the official documentation at **`learn.chatgpt.com/docs`** (the docs moved off `developers.openai.com/codex/*`, which now 308-redirects). Anything not verifiable there is either omitted or explicitly marked.

## Decision table: which mode do I want?

| Situation | Do this | Why |
| --- | --- | --- |
| Reading or reviewing code, must not change anything | `codex --sandbox read-only` | Mechanically impossible to write |
| Everyday development | Default `workspace-write` | Writes limited to the workspace |
| Running in CI, nobody to answer prompts | `codex --ask-for-approval never exec "..."` | Never blocks on approval |
| Working in a subdirectory of a monorepo | `codex --cd services/api` | Keeps attention scoped |
| Need a directory outside the workspace | `codex --add-dir ../shared-lib` | Repeatable flag |
| Need genuinely fresh web information | `codex --search` | Live fetch instead of the cached index |
| Task result is nondeterministic | `codex cloud exec --env <ID> --attempts 3` | Run several times, pick the best |
| Two separate identities / CI isolation | `CODEX_HOME=/path codex ...` | Isolates config, sessions, and logs |
| Switching between two config setups | `codex --profile work` | Switches config only |
| Reviewing before a release | `/review` in the TUI | Diff against the base branch |
| Config seems to have no effect | `/debug-config` | Prints the layers actually in effect |

## Glossary index

One line per term. Full definitions are in the [Glossary](./codex-glossary) — this table is a lookup aid, not a second definition list.

| Term | One-liner | Definition |
| --- | --- | --- |
| AGENTS.md | Natural-language project briefing, auto-loaded each run | [→](./codex-glossary#agents-md) |
| Rules | Structured constraints, trust-gated | [→](./codex-glossary#rules) |
| Sandbox | Hard boundary on file and network access | [→](./codex-glossary#sandbox) |
| Approval policy | Whether Codex asks before acting | [→](./codex-glossary#approval-policy-and-permissions) |
| Trust level | Whether project-level `.codex/` loads at all | [→](./codex-glossary#project-trust-and-config-layering) |
| Profile | Named config bundle, selected with `--profile` | [→](./codex-glossary#profiles) |
| MCP | Protocol for connecting external tools and data | [→](./codex-glossary#mcp-model-context-protocol) |
| Skills | Packaged reusable workflows | [→](./codex-glossary#skills) |
| Hooks | Commands forced to run at lifecycle events | [→](./codex-glossary#hooks) |
| Plugins | Distribution format bundling MCP / Skills / Hooks | [→](./codex-glossary#plugins) |
| Subagents | Delegated agents, spawned only on request | [→](./codex-glossary#subagents) |
| Memories | Cross-session recall of preferences | [→](./codex-glossary#memories) |
| Compaction | Lossy compression of older context | [→](./codex-glossary#sessions-and-compaction) |
| Web search mode | `disabled` / `cached` / `indexed` / `live` enum | [→](./codex-glossary#web-search-modes) |
| `codex exec` | One-shot non-interactive run | [→](./codex-glossary#non-interactive-mode-codex-exec) |
| requirements.toml | Admin policy that narrows what's selectable | [→](./codex-glossary#requirementstoml-managed-policy) |

## Command reference

### Starting and running

```bash
codex                                   # start an interactive session
codex "explain this codebase to me"     # start with an initial prompt
codex --model gpt-5.6 "..."             # pick the model for this run
codex --cd services/payments "..."      # set the working directory
codex --add-dir ../shared-lib "..."     # add another directory (repeatable)
codex --sandbox read-only "..."         # analysis only, no writes
codex --ask-for-approval never "..."    # never ask for approval
codex --approve-for-me "..."            # auto-reviewed approvals (0.147.0+)
codex --search "..."                    # live web search (bare flag, no argument)
codex --yolo "..."                      # full access; also flips search to live
codex --profile work "..."              # use a named profile
codex -c model_reasoning_effort=high    # override a single config key
```

### Non-interactive / automation

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize recent changes"
codex exec resume --last "now add tests for that function"
codex --ask-for-approval never exec "update the changelog"
CODEX_HOME=$(pwd)/.codex codex exec "list active instruction sources"
```

`codex exec` logging defaults to `RUST_LOG=error`.

### Sessions

```bash
codex resume                  # pick from a session list
codex resume --last           # resume the most recent
codex resume <SESSION_ID>     # resume a specific session
codex resume --all            # list all sessions
codex unarchive <SESSION>     # restore an archived session
codex fork                    # fork a session
```

Session records: `~/.codex/sessions/`. Session IDs come from the picker, `/status`, or that directory.

### Auth and status

```bash
codex login
codex login status            # exits 0 when saved credentials are present
codex doctor                  # local diagnostic report
codex logout
```

There is no `codex status` subcommand in the official CLI reference. Use `/status` inside the TUI for the current session.

### Images

```bash
codex -i screenshot.png "why does this layout break?"
codex --image img1.png,img2.jpg "these two shots show the same bug"
```

PNG and JPEG are supported.

### MCP

```bash
codex mcp                     # manage MCP servers from the CLI
```

Codex can also run as an MCP server — see [MCP Server](https://learn.chatgpt.com/docs/mcp-server).

### Feature flags

```bash
codex features list
codex features enable <flag>
codex features disable <flag>
```

These write to `$CODEX_HOME/config.toml` and do **not** accept `--profile`.

### Remote and cloud

```bash
codex app-server --listen ws://127.0.0.1:4500     # serve on the machine holding the code
codex --remote ws://127.0.0.1:4500                 # connect from elsewhere
codex remote-control
codex cloud                                        # cloud UI (Ctrl+O reveals environment IDs)
codex cloud exec --env <ENV_ID> "..."
codex cloud exec --env <ENV_ID> --attempts 3 "..."  # 1-4 attempts
```

`--remote` accepts `ws://`, `wss://`, and `unix://`. Bearer tokens are only sent over `wss://` or local-only `ws://`. Auth options: `--ws-auth capability-token` with `--ws-token-file` / `--ws-token-sha256`, or `--ws-auth signed-bearer-token` with `--ws-shared-secret-file` (plus optional `--ws-issuer`, `--ws-audience`, `--ws-max-clock-skew-seconds`). The client side can read a token from `--remote-auth-token-env CODEX_REMOTE_TOKEN`.

### Shell completion

```bash
codex completion bash
codex completion zsh
codex completion fish
```

If zsh reports `command not found: compdef`, add `autoload -Uz compinit && compinit` to your `.zshrc` before sourcing completions.

### Debug logging

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

Setting `log_dir` also enables the plaintext `codex-tui.log`. Tracing honors `RUST_LOG`.

## Slash commands

Grouped by purpose. The full list is in the [official reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli).

| Group | Commands |
| --- | --- |
| Permissions & sandbox | `/permissions`, `/approve`, `/sandbox-add-read-dir` (Windows-native only) |
| Session lifecycle | `/new`, `/clear`, `/compact`, `/fork`, `/resume`, `/archive`, `/delete`, `/stop` (alias `/clean`), `/exit`, `/quit` |
| Inspect | `/status`, `/usage`, `/diff`, `/debug-config`, `/ps` (needs `unified_exec`), `/mcp` (`/mcp verbose`) |
| Model & behavior | `/model`, `/fast`, `/plan`, `/goal` (max 4,000 chars), `/personality`, `/raw` |
| Extensions | `/agent`, `/apps`, `/plugins`, `/hooks`, `/skills`, `/memories` |
| Editing & review | `/review`, `/init`, `/import`, `/mention`, `/copy` |
| Appearance | `/theme`, `/statusline`, `/title`, `/keymap`, `/vim`, `/ide` |
| Misc | `/feedback`, `/logout`, `/experimental` |

`/usage` accepts `daily`, `weekly`, and `cumulative`. `/debug-config` prints the config layer order plus `allowed_approval_policies`, `allowed_sandbox_modes`, `mcp_servers`, `rules`, `enforce_residency`, and `experimental_network`. `/import` migrates a Claude Code or Cursor setup and works in the local TUI only. Personalities are `friendly`, `pragmatic`, and `none`.

## Keyboard reference (TUI)

| Key | Action |
| --- | --- |
| `@` | Fuzzy file search across the workspace root |
| `!` prefix | Run a shell command under the current approval/sandbox settings |
| `$app-slug` | Mention a connector app |
| `Tab` | Queue a follow-up message |
| `Esc` `Esc` | On an empty composer, edit the previous message (`Enter` forks from there) |
| `Up` / `Down` | Draft history |
| `Ctrl+R` | Search prompt history |
| `Ctrl+G` | Open `$VISUAL` / `$EDITOR` |
| `Ctrl+L` | Clear the screen |
| `Ctrl+O` | Copy the last output (same as `/copy`) |
| `Ctrl+C` | Interrupt / exit |

## Config quick reference

Config lives at `~/.codex/config.toml` (user level). Profiles are `$CODEX_HOME/<name>.config.toml`.

### Permissions and sandbox

```toml
approval_policy = "on-request"     # untrusted | on-request | never | { granular = { ... } }
sandbox_mode = "workspace-write"   # read-only | workspace-write | danger-full-access

[sandbox_workspace_write]
writable_roots = ["/tmp/build"]
network_access = false
exclude_slash_tmp = false
exclude_tmpdir_env_var = false

[projects."/path/to/repo"]
trust_level = "trusted"            # trusted | untrusted
```

> `approval_policy = "on-failure"` is deprecated. Granular form: `{ granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval } }`.

### Model

```toml
model = "gpt-5.6"
model_reasoning_effort = "medium"   # minimal | low | medium | high | xhigh (Responses API only)
model_reasoning_summary = "auto"    # auto | concise | detailed | none
model_verbosity = "medium"          # low | medium | high
model_context_window = 200000
model_auto_compact_token_limit = 150000
review_model = "gpt-5.6"
```

### Web search

```toml
web_search = "cached"     # disabled | cached | indexed | live  (default "cached")
```

`indexed` permits external web access only when the search index gates the request. `--search` (bare flag) is the same as `live`. `--yolo` / full-access defaults search to live.

The legacy feature flags `features.web_search`, `features.web_search_cached`, and `features.web_search_request` are deprecated — use the top-level `web_search` enum.

### MCP servers

```toml
# STDIO
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
startup_timeout_sec = 10
tool_timeout_sec = 60

# Streaming HTTP
[mcp_servers.internal-api]
url = "https://mcp.example.com/sse"
bearer_token_env_var = "INTERNAL_API_TOKEN"
enabled = true
default_tools_approval_mode = "prompt"   # auto | prompt | approve
enabled_tools = ["search", "read"]
```

> `mcp_servers` is a **table keyed by server id**. There is no `name` key and no `type` key, and it is not an array of tables.

### Context and instruction files

```toml
project_doc_max_bytes = 65536                                # default 32 KiB
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

### Environment variables passed to commands

```toml
[shell_environment_policy]
inherit = "core"            # all | core | none
include_only = ["PATH", "HOME", "LANG"]
exclude = ["AWS_*", "*_SECRET"]
set = { CI = "1" }
ignore_default_excludes = false
```

> This is the mechanism for controlling which environment variables reach spawned commands.

### Subagents

```toml
[agents]
max_depth = 1
max_threads = 6
job_max_runtime_seconds = 1800

[agents.reviewer]
description = "read-only adversarial reviewer"
config_file = "reviewer.config.toml"
```

### Hooks

```toml
[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = ["pnpm", "lint", "--fix"]
command_windows = ["pnpm.cmd", "lint", "--fix"]
```

Events: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`. Only command hooks execute today.

### Feature flags and misc

```toml
[features]
memories = false        # off by default
multi_agent = true
hooks = true
fast_mode = true
undo = false

personality = "pragmatic"      # none | friendly | pragmatic
commit_attribution = "Codex <noreply@openai.com>"
hide_agent_reasoning = false
log_dir = "~/.codex/log"

[history]
persistence = "save-all"       # save-all | none

[tui]
vim_mode_default = false
theme = "dark"
```

### Profiles

```toml
# ~/.codex/work.config.toml
model = "gpt-5.6"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
```

```bash
codex --profile work
```

### Keys that project-level config cannot override

When these appear in `.codex/config.toml`, they are **ignored**:

`openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel`

## System requirements

| Item | Requirement |
| --- | --- |
| macOS | 12 or later |
| Linux | Ubuntu 20.04+ / Debian 10+ |
| Windows | Windows 11 via WSL2 |
| Git | 2.23 or later (optional) |
| RAM | 4 GB minimum, 8 GB recommended |

Source: [`openai/codex` docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md)

## Common problems

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| `.codex/config.toml` has no effect | Project not trusted, or the key can't be set at project scope | Set `projects.<path>.trust_level = "trusted"`; check the ignored-keys list; run `/debug-config` |
| Provider or base-URL setting ignored | Project scope can't override machine-local provider keys | Move it to `~/.codex/config.toml` |
| AGENTS.md guidance ignored | Combined size hit `project_doc_max_bytes` (32 KiB), or an `AGENTS.override.md` shadowed it | Trim the file or raise the limit; check for override files |
| Codex keeps stopping to ask | `approval_policy` too strict for the context | `--ask-for-approval never` for automation, or `/permissions` in the TUI |
| Codex modifies files during a review | Sandbox allows writes | `--sandbox read-only` |
| Web results feel stale | `web_search` defaults to `cached` | Use bare `--search`, or set `web_search = "live"` |
| Output quality degrades mid-session | Context is saturated or was compacted | `/clear` for a new task, or `/compact` then continue |
| `[[mcp_servers]]` fails to parse | Wrong TOML shape | Use `[mcp_servers.<id>]` |
| `compdef: command not found` in zsh | `compinit` not loaded | Add `autoload -Uz compinit && compinit` |
| Managed permission profiles not enforced | Client on 0.137.0 or earlier | Upgrade to 0.138.0+ |
| Need to see what instructions loaded | — | `codex --ask-for-approval never "Summarize the current instructions."` or enable `log_dir` |

## Templates

### Minimal AGENTS.md

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

## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

### Everyday config.toml

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

### Read-only reviewer profile

```toml
# ~/.codex/review.config.toml
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "never"
```

```bash
codex --profile review "review the uncommitted changes and list only real defects"
```

### CI invocation

```bash
codex --ask-for-approval never exec --json \
  "run the test suite; if anything fails, fix it and re-run until green"
```

## Quality sources

The links below are what this tutorial is maintained against. When something here disagrees with them, they win.

### Official documentation

| Source | Use it for |
| --- | --- |
| [Codex docs root](https://learn.chatgpt.com/docs) | Entry point for everything below |
| [Quickstart](https://learn.chatgpt.com/docs/quickstart) | Install through first run |
| [Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference) | **The authority on every config key**, plus `requirements.toml` |
| [Environment Variables](https://learn.chatgpt.com/docs/config-file/environment-variables) | `CODEX_HOME` and friends |
| [Permissions](https://learn.chatgpt.com/docs/permissions) | Approval policy and permission profiles |
| [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) | Sandbox modes |
| [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Instruction-chain discovery and merge order |
| [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) | Structured constraints |
| [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) | The `[agents]` section |
| [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) | Connecting external tools |
| [MCP Server](https://learn.chatgpt.com/docs/mcp-server) | Codex as an MCP server |
| [Hooks](https://learn.chatgpt.com/docs/hooks) | Lifecycle events |
| [Plugins](https://learn.chatgpt.com/docs/plugins) | Packaging and distribution |
| [Skills](https://learn.chatgpt.com/docs/build-skills) | Authoring skills |
| [Slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | The authoritative command list |
| [CLI](https://learn.chatgpt.com/docs/codex/cli) | CLI surface |
| [IDE Extension](https://learn.chatgpt.com/docs/codex/ide) | Editor surface |
| [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode) | `codex exec` |
| [App Server](https://learn.chatgpt.com/docs/app-server) | Remote control |
| [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk) | Programmatic use |
| [GitHub Action](https://learn.chatgpt.com/docs/github-action) | CI integration |
| [Models](https://learn.chatgpt.com/docs/models) | Model list and reasoning effort |
| [Prompting](https://learn.chatgpt.com/docs/prompting) | Prompting guidance |
| [Memories](https://learn.chatgpt.com/docs/customization/memories?surface=app) | Cross-session memory |
| [Pricing](https://learn.chatgpt.com/docs/pricing) | **The only source for plans and quotas** — figures change, so read it there |
| [Best practices](https://learn.chatgpt.com/guides/best-practices) | Official prompting and workflow guidance |
| [Import](https://learn.chatgpt.com/docs/import) | Migrate from Claude Code or Cursor |
| [Sites](https://learn.chatgpt.com/docs/sites) | Publishing sites |
| [Glossary](https://learn.chatgpt.com/docs/glossary) | Official term list |

> The docs use a `?surface=cli|app|ide` selector. If a page looks like it's describing a different product, check which surface is active.

### Release tracking

| Source | Use it for |
| --- | --- |
| [Changelog](https://learn.chatgpt.com/docs/changelog) | What shipped |
| [Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity) | Which features are experimental |
| [openai/codex releases](https://github.com/openai/codex/releases) | Version numbers and binaries |
| [openai/codex issues](https://github.com/openai/codex/issues) | Known bugs and workarounds |
| [docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md) | System requirements and building from source |

Stable releases land roughly weekly (`0.145.0` → `0.146.0` → `0.147.0`), with daily `0.x.0-alpha.N` prereleases. Re-verify version-sensitive claims at least every two weeks.

```bash
gh release list --repo openai/codex --exclude-pre-releases --limit 5
```

## Related pages

- [Codex Glossary](./codex-glossary) — what the concepts mean and why
- [Codex Cookbook](./codex-cookbook) — task-oriented recipes
- [Codex CLI](./codex-cli) — installation through core features
- [Project Integration](./integration) — wiring Codex into a real project
- [Learning Map](./) — the full path
