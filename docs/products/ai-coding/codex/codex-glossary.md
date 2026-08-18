# Codex Glossary

> This is an **explanation-oriented** document. It answers "what is this concept, why was it designed this way, and when should I use it." It complements the [Codex Cheatsheet](./codex-cheatsheet): the cheatsheet tells you *how to write the command*, this page tells you *why*.
>
> **Single source of truth for definitions.** Every Codex concept used across this site is defined here. Other pages show usage and link back rather than re-defining terms.
>
> **Docs site moved.** The official Codex documentation migrated from `developers.openai.com/codex/*` to **`learn.chatgpt.com/docs`**. Old URLs return a 308 permanent redirect. Every official link on this page uses the new host.

## How the pieces fit together

```
                        ┌─────────────────────────┐
                        │   requirements.toml     │  admin-managed policy
                        │   org-wide constraints   │  (outermost limit)
                        └────────────┬────────────┘
                                     │ narrows what's selectable
                                     ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                    config.toml  layer                         │
   │   ~/.codex/config.toml (user)  >  .codex/config.toml (project) │
   │   Profiles: $CODEX_HOME/<name>.config.toml                     │
   └───────┬──────────────────────────┬───────────────────────────┘
           │                          │
           ▼                          ▼
   ┌───────────────┐          ┌──────────────────┐
   │  Permissions  │          │  Context & rules │
   │  & sandbox    │          │  ─────────────   │
   │  ───────────  │          │  AGENTS.md       │  ← project briefing
   │  approval_    │          │  Rules           │  ← structured limits
   │  policy       │          │  Memories        │  ← cross-session recall
   │  sandbox_mode │          │  Compaction      │  ← context compression
   │  trust_level  │          │                  │
   └───────┬───────┘          └────────┬─────────┘
           │                           │
           └───────────┬───────────────┘
                       ▼
           ┌───────────────────────┐
           │   Codex agent runtime │
           │   (a session)         │
           └───────────┬───────────┘
                       │ extended through
       ┌───────────────┼───────────────┬──────────────┐
       ▼               ▼               ▼              ▼
   ┌────────┐     ┌─────────┐    ┌─────────┐   ┌───────────┐
   │  MCP   │     │ Skills  │    │  Hooks  │   │ Subagents │
   │ outside│     │reusable │    │lifecycle│   │ delegated │
   │ tools  │     │workflows│    │  gates  │   │  agents   │
   └───┬────┘     └────┬────┘    └─────────┘   └───────────┘
       │               │
       └───────┬───────┘
               ▼
        ┌─────────────┐
        │   Plugins   │  packages MCP / Skills / Hooks for distribution
        └─────────────┘

   Surfaces (one config model, four entry points):
   CLI (codex) │ IDE extension │ Desktop app │ Web / Cloud
```

**The organizing idea:** the outer ring is **constraint** (managed policy → config files → permissions and sandbox), the middle ring is **context** (AGENTS.md, Rules, Memories decide what Codex *knows*), and the inner ring is **capability** (MCP, Skills, Hooks, Subagents decide what Codex *can do*). Plugins add no capability of their own; they are a distribution format for the other three.

The practical payoff: when Codex behaves unexpectedly, walk the rings outside-in — constraint, then context, then capability. That beats changing config keys at random.

---

## AGENTS.md

**What it is**

A Markdown file in your repository that tells Codex the conventions of the project in plain language: which package manager to use, what to run after changing code, which directories to leave alone. Think of it as the onboarding note you'd hand a new teammate, except the reader is an agent.

**Why it exists**

Without it you re-explain "this project uses pnpm, not npm" in every conversation. With it, those conventions become context that loads automatically on every run.

**How it works: the instruction chain**

Codex builds an **instruction chain** before doing any work — once per run, and in the TUI once per launched session. Discovery order:

1. **Global scope.** In the Codex home directory (`~/.codex` by default, overridable with `CODEX_HOME`), Codex reads `AGENTS.override.md` if present, otherwise `AGENTS.md`. Only the **first non-empty file** at this level is used.
2. **Project scope.** Starting at the project root (usually the Git root), Codex walks **down** to your current working directory. In each directory along the way it checks `AGENTS.override.md`, then `AGENTS.md`, then any name listed in `project_doc_fallback_filenames`. **At most one file per directory** is included.
3. **Merge order.** Files are concatenated root-first, joined by blank lines. **Files closer to your working directory appear later, so they override earlier guidance.**

Empty files are skipped, and Codex stops adding files once the combined size reaches `project_doc_max_bytes` (**32 KiB by default**).

**Details worth knowing**

| Detail | Notes |
| --- | --- |
| Override, not merge | When `AGENTS.override.md` exists, the sibling `AGENTS.md` is ignored |
| Walks down, never up | Root → cwd only; directories past cwd are not considered |
| Custom filenames | `project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]` |
| Raise the ceiling | `project_doc_max_bytes = 65536` |
| Review rules | Add a `## Code Review Rules` section to the `AGENTS.md` nearest the code it governs |
| Temporary global override | Drop in `~/.codex/AGENTS.override.md`; delete it to restore the base file |

**AGENTS.md vs. Rules**

| Dimension | AGENTS.md | Rules |
| --- | --- | --- |
| Form | Natural-language Markdown | Structured rule configuration |
| Purpose | Convey conventions and background | Declare constraints and checks |
| Scoping | Inherits and overrides per directory | Matches per rule entry |

**Official docs:** [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

---

## Rules

**What it is**

A more structured constraint mechanism than AGENTS.md, used to declare what must or must not happen under given conditions. Project-level Rules live in the `.codex/` project layer and are therefore gated by project trust.

**Why it exists**

AGENTS.md is prose, and prose can be misread. Rules give constraints a more explicit form, which also makes them easier to distribute across a team and to audit. `/debug-config` shows which rules are actually in effect.

**Official docs:** [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules)

---

## Sandbox

**What it is**

The isolation layer that decides which files Codex can read or write and whether it can reach the network. It is the **mechanism** dimension — what is technically possible — and it is independent from approval policy, which decides whether Codex asks you first.

**The three modes**

| `sandbox_mode` | Meaning | Typical use |
| --- | --- | --- |
| `read-only` | Cannot modify files | Code review, architecture analysis |
| `workspace-write` | Can write within the workspace | Everyday development |
| `danger-full-access` | No sandbox restrictions | Only when you accept the risk knowingly |

`workspace-write` can be tuned further:

| Key | Effect |
| --- | --- |
| `sandbox_workspace_write.writable_roots` | Add writable roots |
| `sandbox_workspace_write.network_access` | Allow network access |
| `sandbox_workspace_write.exclude_slash_tmp` | Remove `/tmp` from the writable set |
| `sandbox_workspace_write.exclude_tmpdir_env_var` | Remove `$TMPDIR` from the writable set |

**Why sandbox and approval are separate concerns**

They are two independent lines of defense. The sandbox is a **hard boundary** that cannot be crossed; approval is a **human gate** you pass through deliberately. Approval without a sandbox means one careless "yes" can do damage. A sandbox without approval means Codex acts freely inside the boundary while you have no visibility. You want both.

**Official docs:** [Sandboxing](https://learn.chatgpt.com/docs/sandboxing)

---

## Approval policy and permissions

**What it is**

The policy that decides whether Codex asks before acting. Note that the config layer and the UI layer use **two different vocabularies** — this is the single most common source of confusion.

**Config layer: `approval_policy`**

| Value | Meaning |
| --- | --- |
| `untrusted` | Auto-runs only operations considered safe; asks about everything else |
| `on-request` | The model requests approval when it judges it necessary |
| `never` | Never asks |
| `{ granular = { ... } }` | Fine-grained control over `sandbox_approval`, `rules`, `mcp_elicitations`, `request_permissions`, and `skill_approval` |

> The legacy value `on-failure` is deprecated. On the command line, `--ask-for-approval <policy>` sets this for a single run.

**UI layer: TUI permission modes**

Inside the TUI, `/permissions` switches between three presets: **Auto** (default), **Read-only**, and **Full Access**.

**Why two vocabularies**

The config layer describes *how approval requests are generated*. The UI layer describes *practical presets* — Read-only and Full Access adjust both the sandbox and the approval dimension at once. When writing docs or debugging with a teammate, always say which layer you mean, or the conversation will go sideways.

**Official docs:** [Permissions](https://learn.chatgpt.com/docs/permissions)

---

## Project trust and config layering

**What it is**

Whether Codex trusts a given project directory, configured as `projects.<path>.trust_level` with the values `"trusted"` or `"untrusted"`.

**Why it exists**

The `.codex/` directory is **content anyone can commit to a repository**. If cloning an unfamiliar repo automatically loaded its config, hooks, and rules, you would be handing execution to whoever wrote it. Trust gating is the defense: **untrusted projects skip every project-level `.codex/` layer** — config, hooks, and rules are all ignored.

**Precedence**

Official [config basics](https://learn.chatgpt.com/docs/config-file/config-basic) resolve values in this order (highest first):

1. CLI flags and `-c` / `--config` overrides
2. Project `.codex/config.toml` files, root → cwd, closest wins — **trusted projects only**
3. Profile file selected with `--profile` (`$CODEX_HOME/<name>.config.toml`)
4. User config: `~/.codex/config.toml`
5. System config, if present: `/etc/codex/config.toml` on Unix
6. Built-in defaults

A trusted project's config **does** override the matching keys in your user config. That is the official order. What project config *cannot* do is a separate rule: a short list of machine-local keys is **ignored** at project scope.

`openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel`

The intent is blunt and correct: **a repository must not be able to silently reroute your model requests to another endpoint.**

**Official docs:** [Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## Profiles

**What it is**

A named bundle of configuration for switching between contexts — a work setup versus a personal sandbox, say.

**How it works**

Profile files sit next to `config.toml` as `$CODEX_HOME/<profile-name>.config.toml`, selected with `--profile <profile-name>`.

**Profiles vs. `CODEX_HOME`**

| Dimension | Profile | `CODEX_HOME` |
| --- | --- | --- |
| What switches | One config inside the same home | The entire Codex home directory |
| Isolation | Config only | Config, sessions, and logs |
| Typical use | Two model/permission setups | A separate automation identity in CI |

**Official docs:** [Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference), [Environment Variables](https://learn.chatgpt.com/docs/config-file/environment-variables)

---

## MCP (Model Context Protocol)

**What it is**

An open protocol that lets Codex connect to external tools and data sources. The useful analogy is a USB port: once the protocol is standard, any service that implements it works with Codex, and Codex does not need bespoke integration code per service.

**Why it matters**

Without MCP, an agent can only read local files and run commands. With it, the same agent can query a database, call an internal API, or read design files — and the providers of those capabilities stay decoupled from Codex itself.

**Configuration shape (correcting a common error)**

`mcp_servers` is a **table keyed by server id**, not an array of tables:

```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
```

Common keys:

| Key | Notes |
| --- | --- |
| `command` / `args` / `cwd` / `env` | Launch a local process over STDIO |
| `url` / `http_headers` / `bearer_token_env_var` | Connect to a remote server over streaming HTTP |
| `enabled` / `required` | Whether the server is on, and whether it's mandatory |
| `enabled_tools` / `disabled_tools` | Per-tool allow/deny lists |
| `default_tools_approval_mode` | `auto` / `prompt` / `approve` |
| `startup_timeout_sec` | Startup timeout, default 10 |
| `tool_timeout_sec` | Per-call timeout, default 60 |

**Codex plays both roles**

Codex can act as an MCP **client** consuming other services, and as an MCP **server** that other agents call (see `codex mcp` and the MCP Server docs).

**Official docs:** [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [MCP Server](https://learn.chatgpt.com/docs/mcp-server)

---

## Skills

**What it is**

A reusable workflow packaged so Codex can invoke it at the right moment. `/skills` lists what's available.

**Skills vs. MCP**

| Dimension | Skills | MCP |
| --- | --- | --- |
| Essence | Packaged **process / know-how** | Connected **tools / data** |
| Who executes | Codex follows the process | An external service runs and returns |
| Typical content | "Our release process has seven steps" | "Query the production database" |

Quick test: needing to **reach an external system** means MCP; needing to **codify a way of working** means Skills.

**Official docs:** [Skills](https://learn.chatgpt.com/docs/build-skills)

---

## Hooks

**What it is**

Commands that fire automatically at specific points in the Codex lifecycle, used for enforced checks or automation. They can be declared inline in `config.toml`.

**Supported events**

`PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`

**Current limitation:** only command hooks execute. Prompt and agent hook types are parsed but skipped. For platform differences, `commandWindows` (written as `command_windows` in TOML) supplies a Windows-specific command.

**Hooks vs. AGENTS.md**

AGENTS.md is **advice** — the model may not follow it. Hooks are **enforcement** — the script always runs. Requirements like "code must be formatted after every change" belong in Hooks, not in prose.

**Official docs:** [Hooks](https://learn.chatgpt.com/docs/hooks)

---

## Plugins

**What it is**

A packaging format that bundles MCP servers, Skills, and Hooks into one distributable unit. Managed with `/plugins`.

**Why it exists**

Asking every teammate to configure MCP plus Skills plus Hooks by hand does not scale and invites drift. Plugins turn "a working Codex environment" into something you install once.

**Ecosystem role:** Plugins are a **distribution layer** and introduce no new capability. Configuration can override the enablement and tool approval modes of the MCP servers they bundle, via `plugins.<plugin>.mcp_servers.<server>.*`.

**Official docs:** [Plugins](https://learn.chatgpt.com/docs/plugins)

---

## Subagents

**What it is**

Independent agents spawned by the main agent, used for parallelism or context isolation. Managed with `/agent` and declared in the `[agents]` config section.

**Key behavior:** subagents are **spawned only when you explicitly ask** — never automatically.

**Related configuration**

| Key | Default | Notes |
| --- | --- | --- |
| `agents.max_depth` | 1 | Maximum nesting depth |
| `agents.max_threads` | 6 | Maximum concurrent threads |
| `agents.job_max_runtime_seconds` | 1800 | Per-job runtime cap |
| `agents.<name>.config_file` | — | Config file the subagent uses |
| `agents.<name>.description` | — | Description; influences when it is selected |

With `features.multi_agent` enabled, the available tools are `spawn_agent`, `send_input`, `resume_agent`, `wait_agent`, and `close_agent`.

**When to reach for them**

When you need **context isolation** — for example a subagent dedicated to adversarial review, so it isn't anchored by the main thread's reasoning — or genuine **parallelism** across independent tasks. Tightly coupled work is usually faster done serially.

**Official docs:** [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

---

## Memories

**What it is**

Information retained across sessions so Codex remembers your preferences and project background without being told again. Managed with `/memories`.

**Memories vs. AGENTS.md**

| Dimension | Memories | AGENTS.md |
| --- | --- | --- |
| Origin | Codex extracts, you confirm | You write it |
| Stored | On the Codex side | In the repo — committable, reviewable |
| Suits | Personal habits, accumulated experience | Team conventions everyone must share |

The test is simple: **should the whole team share this?** If yes, write it into AGENTS.md and commit it. If it's just how you like to work, leave it to Memories.

**Related configuration:** `features.memories` (off by default); details under `memories.*`, including `use_memories`, `generate_memories`, `max_unused_days`, and `max_rollout_age_days`.

**Official docs:** [Memories](https://learn.chatgpt.com/docs/customization/memories?surface=app)

---

## Sessions and compaction

**What it is**

A continuous conversation and the context it accumulates. Session records live in `~/.codex/sessions/`.

**Session operations**

| Operation | Command |
| --- | --- |
| Resume via picker | `codex resume` |
| Resume the latest | `codex resume --last` |
| Resume a specific session | `codex resume <SESSION_ID>` |
| List all | `codex resume --all` |
| Fork from current state | `/fork` |
| Archive / unarchive | `/archive`, `codex unarchive <SESSION>` |

Session IDs come from the picker, from `/status`, or from the `~/.codex/sessions/` directory.

**Compaction**

When context approaches its limit, earlier conversation is compressed into a summary to free space. `/compact` triggers it manually; the automatic threshold is `model_auto_compact_token_limit`. The `PreCompact` and `PostCompact` hook events let you act around the boundary.

**Why you should manage it yourself**

Compaction is lossy — summaries drop detail. Rather than waiting for it, `/clear` or start a fresh session when you switch tasks. One session per task is far more reliable than one session for ten tasks followed by forced compression.

**Official docs:** [Slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

---

## Web search modes

**What it is**

How Codex reaches external web information. There are four documented values — and importantly, this is an **enum string**, not a boolean toggle.

| `web_search` | Meaning |
| --- | --- |
| `disabled` | Off |
| `cached` | **Default.** Queries an OpenAI-maintained index rather than fetching live |
| `indexed` | External web access only when the search index gates the request |
| `live` | Fetches live; becomes the default under `--yolo` / full-access mode |

On the command line, a **bare `--search`** (no argument) enables live search. Results appear as `web_search` items in the transcript and in `codex exec --json` output.

> The legacy toggles `features.web_search`, `features.web_search_cached`, and `features.web_search_request` are deprecated.

**Why cached is the default**

The cached index is faster and cheaper, and it is sufficient for the vast majority of "how does this API work" questions. `live` earns its cost only when you need genuinely fresh information, such as a release published this week.

**Official docs:** [Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## Non-interactive mode (`codex exec`)

**What it is**

A run mode that skips the TUI, completes one task, and exits. Built for scripts and CI.

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize recent changes"
codex exec resume --last "now add tests for the new function"
```

**Why it's a separate subcommand**

CI has no terminal to interact with, and should never block on a human approval prompt. `codex exec` states plainly that this is a one-shot unattended run: logging defaults to `RUST_LOG=error` and output is easy for a script to consume.

**Official docs:** [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode)

---

## Surfaces: CLI, IDE, app, cloud

**What it is**

Four entry points to the same Codex agent. They share one configuration model — `config.toml`, AGENTS.md, MCP, Skills — and differ in interaction style and where the work runs.

| Surface | Entry point | Character |
| --- | --- | --- |
| CLI | `codex` | Terminal TUI; strongest scripting story |
| IDE extension | Inside your editor | Tied into editor context |
| Desktop app | Standalone application | GUI, multi-thread session management |
| Web / Cloud | `codex cloud` | Runs in a cloud environment; tasks can retry in parallel |

**Cloud commands**

```bash
codex cloud                                          # open the cloud UI (Ctrl+O reveals environment IDs)
codex cloud exec --env <ENV_ID> "..."                # run in a named cloud environment
codex cloud exec --env <ENV_ID> --attempts 3 "..."   # retry the same task (1-4 attempts)
```

**Remote control:** start a server with `codex app-server --listen ws://127.0.0.1:4500` and connect with `codex --remote ws://127.0.0.1:4500`. `--remote` accepts `ws://`, `wss://`, and `unix://`. Anything crossing a network must use `wss://` with authentication configured.

**Official docs:** [CLI](https://learn.chatgpt.com/docs/codex/cli), [IDE Extension](https://learn.chatgpt.com/docs/codex/ide), [App Server](https://learn.chatgpt.com/docs/app-server)

---

## requirements.toml (managed policy)

**What it is**

A policy file distributed by administrators to **narrow** what users may select. It is not "another config file" — it is the upper bound on configuration.

**What it can constrain**

| Key | Effect |
| --- | --- |
| `allowed_approval_policies` | Permitted approval policies (e.g. `untrusted`, `on-request`, `never`, `granular`) |
| `allowed_sandbox_modes` | Permitted sandbox modes |
| `allowed_web_search_modes` | Permitted search modes; `disabled` is always allowed, and an empty list means only `disabled` |
| `allowed_permission_profiles` | Permitted permission profiles; **requires Codex 0.138.0+** |
| `default_permissions` | Default permission profile; must appear in the allowed list |
| `allow_managed_hooks_only` | Run managed hooks only, skipping user/project/session/plugin hooks |
| `features.*` | Pin feature flags using the same key names as `config.toml` |
| `mcp_servers` allowlist | Requires both an id and an `identity` (`identity.command` or `identity.url`) |
| `marketplaces.*` | Restrict plugin sources (`git` / `host_pattern` / `local`) |
| `enforce_residency` | Data residency; currently only `us` is supported |

> **Version note:** Codex 0.137.0 and earlier ignore `allowed_permission_profiles` and managed `default_permissions`. If you rely on those for enforcement, confirm clients are on 0.138.0 or newer first.

**Official docs:** [Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## Models and reasoning effort

**What it is**

The model Codex uses, and how long it is allowed to think.

| Key | Values | Notes |
| --- | --- | --- |
| `model` | string | The official config-basics example is `gpt-5.6`; names change — check [Models](https://learn.chatgpt.com/docs/models) |
| `model_reasoning_effort` | `minimal` / `low` / `medium` / `high` / `xhigh` | Responses API only |
| `model_reasoning_summary` | `auto` / `concise` / `detailed` / `none` | Verbosity of reasoning summaries |
| `model_verbosity` | `low` / `medium` / `high` | Verbosity of output |

`--model <name>` overrides for one run; `/model` switches mid-session.

**Choosing an effort level**

Changing a config line or adding a log statement — `low` is plenty. Designing module boundaries or chasing a concurrency bug — `high` or `xhigh` is worth the wait. The `medium` default fits most daily work. Running everything at `xhigh` only makes easy tasks slow and burns through limits faster.

**Official docs:** [Models](https://learn.chatgpt.com/docs/models)

---

## Related pages

- [Codex Cheatsheet](./codex-cheatsheet) — commands, config keys, common errors
- [Codex Cookbook](./codex-cookbook) — task-oriented recipes
- [Codex CLI](./codex-cli) — installation through core features
- [Project Integration](./integration) — wiring Codex into a real project
- [Learning Map](./) — the full path
