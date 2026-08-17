# Project Integration

> How to wire Codex into a real project: instruction files, configuration layers, MCP servers, CI, and team rollout. Assumes you have the CLI installed and working — see [Codex CLI](./codex-cli) if not.
>
> For one-off task recipes, use the [Cookbook](./codex-cookbook). This page is about durable setup.

## Start here: what a well-configured project has

```
your-project/
├── AGENTS.md              # conventions and boundaries, committed
├── .codex/
│   └── config.toml        # project-scoped settings, committed (loads only if trusted)
└── .github/workflows/
    └── codex.yml          # automation, if you want it
```

Plus one machine-local thing that is *not* committed: a `projects` entry in your own `~/.codex/config.toml` marking the project trusted.

```toml
# ~/.codex/config.toml
[projects."/absolute/path/to/your-project"]
trust_level = "trusted"     # trusted | untrusted
```

**This is the step people miss.** Project-scoped `.codex/` layers — config, hooks, rules — are only loaded for trusted projects. Commit `.codex/config.toml` all you like; until each developer marks the project trusted on their own machine, it does nothing. Run `/debug-config` to see the layers actually in effect.

## AGENTS.md

### What it is

A natural-language briefing that Codex reads before doing any work. It rebuilds the instruction chain on every run — there is no cache to clear, so edits take effect on the next invocation.

`/init` generates a starting file if you'd rather not write one from scratch.

### Discovery and merge order

This is worth understanding precisely, because it determines which file wins.

**Global scope.** In your Codex home (`~/.codex` by default, or `CODEX_HOME`), Codex reads `AGENTS.override.md` if it exists, otherwise `AGENTS.md`. Only the first non-empty file at this level is used.

**Project scope.** Starting at the project root — usually the Git root — Codex walks *down* to your current directory. In each directory it checks `AGENTS.override.md`, then `AGENTS.md`, then any name listed in `project_doc_fallback_filenames`. At most one file per directory. If no project root is found, only the current directory is checked.

**Merge.** Files are concatenated root-first, joined with blank lines. **Files closer to your current directory appear later, so they override earlier guidance.**

Empty files are skipped. Codex stops adding files once the combined size reaches `project_doc_max_bytes` — **32 KiB by default**. Guidance past that limit is silently dropped, which is the single most common reason an `AGENTS.md` rule appears to be ignored.

```toml
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

`AGENTS.override.md` in your Codex home is the clean way to apply a temporary personal override without editing the real file.

### A monorepo layout that works

```
monorepo/
├── AGENTS.md                    # facts true everywhere
├── packages/
│   ├── api/AGENTS.md            # API-specific, overrides the root
│   └── web/AGENTS.md            # web-specific, overrides the root
```

Root file — shared truth only:

```markdown
# Monorepo conventions

## Tooling
- pnpm workspaces. Never npm or yarn.
- Turborepo drives builds: `pnpm build` at the root.
- TypeScript strict mode everywhere.

## Cross-package rules
- A change to `packages/shared` requires running the full test suite, not just
  the package's own tests.
- Never import from another package's `src/` — use its public entry point.

## Verification
- Run `pnpm test && pnpm typecheck` after any change and report the output.
```

Package file — only what differs:

```markdown
# packages/api

## Stack
- Fastify, Prisma, PostgreSQL.

## Rules
- Every route needs a Zod schema. No untyped request bodies.
- Schema changes require a migration in `prisma/migrations/` — never edit an
  existing migration.

## Verification
- `pnpm --filter api test` must pass.
```

Because the package file loads *after* the root file, its rules take precedence where they conflict. That is the intended way to express "generally X, but in this package Y."

### What to include, and what to leave out

Include:

- Tooling facts: package manager, test command, type checker
- Boundaries: directories not to touch, generated files
- Conventions not obvious from reading one file
- Verification steps you always want run
- Code review rules under a `## Code Review Rules` heading

Leave out:

- Anything that changes per task — that belongs in the prompt
- Long architectural prose — it costs budget and rarely changes behavior
- Rules your linter already enforces
- Secrets, tokens, internal hostnames

### Code review rules

Codex reads a `## Code Review Rules` section from the `AGENTS.md` closest to the code it governs. From the official documentation:

```markdown
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

The shape is what makes it effective: a specific mistake, then the safe alternative. Vague exhortations ("be careful with experiments") change nothing.

### Verifying what loaded

```bash
codex --ask-for-approval never "Summarize the current instructions."
codex --cd packages/api --ask-for-approval never "List the instruction sources you loaded."
```

Or through logs:

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

You can also inspect the newest `session-*.jsonl` in your sessions directory.

## Configuration layers

```
~/.codex/config.toml                     ← user level, always applies
        ↓
$CODEX_HOME/<name>.config.toml           ← profile, selected with --profile
        ↓
<project>/.codex/config.toml             ← project level, ONLY if trusted
        ↓
-c key=value on the command line         ← this run only
```

### What project-scoped config cannot do

Codex **ignores** these keys when they appear in a project's `.codex/config.toml`:

`openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel`

The reasoning is sound: a cloned repository should not be able to redirect your API traffic, select your profile, or reconfigure your telemetry. If one of these needs setting, it goes in `~/.codex/config.toml`.

> Some older guides state that project-level config has *higher* priority than user-level config. That is not what the current reference describes: project config is a trust-gated layer that cannot override machine-local provider, auth, notification, profile-selection, or telemetry keys.

### A reasonable project config.toml

```toml
# <project>/.codex/config.toml
model_reasoning_effort = "medium"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[sandbox_workspace_write]
network_access = false
writable_roots = ["/tmp/build-cache"]
```

`network_access = false` is worth defaulting to. Most development tasks do not need it, and turning it off eliminates a class of surprise.

### Profiles

Profiles live next to `config.toml` as `$CODEX_HOME/<name>.config.toml`:

```toml
# ~/.codex/review.config.toml
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "never"
```

```bash
codex --profile review "review the uncommitted changes and list only real defects"
```

This is the mechanism behind the Writer/Reviewer pattern: the reviewer profile is mechanically incapable of editing files.

## MCP servers

MCP connects Codex to systems outside your repository. Servers are configured as a **table keyed by server id**.

### STDIO server

```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
startup_timeout_sec = 10
tool_timeout_sec = 60
```

### Streaming HTTP server

```toml
[mcp_servers.internal-api]
url = "https://mcp.example.com/sse"
bearer_token_env_var = "INTERNAL_API_TOKEN"
enabled = true
default_tools_approval_mode = "prompt"    # auto | prompt | approve
enabled_tools = ["search", "read"]
```

> **Syntax matters.** It is `[mcp_servers.<id>]`, a table keyed by id — not `[[mcp_servers]]`. There is no `name` key and no `type` key; the id in the header *is* the name, and the presence of `command` versus `url` determines the transport.

Never inline a credential. `bearer_token_env_var` names an environment variable; `env_http_headers` maps header names to environment variables. Both keep the secret out of a file you might commit.

### Controlling what a server can do

| Key | Effect |
| --- | --- |
| `enabled` | Turn the server off without deleting the config |
| `required` | Fail startup if the server is unavailable |
| `enabled_tools` | Allowlist — only these tools are exposed |
| `disabled_tools` | Denylist |
| `default_tools_approval_mode` | `auto`, `prompt`, or `approve` for the whole server |
| `tools.<tool>.approval_mode` | Override for one tool |
| `startup_timeout_sec` | Default 10 |
| `tool_timeout_sec` | Default 60 |

A useful pattern for a write-capable server: `default_tools_approval_mode = "prompt"` for the server, then `auto` for the specific read-only tools you trust.

Codex can also run *as* an MCP server, letting another agent call it — see [MCP Server](https://learn.chatgpt.com/docs/mcp-server).

Manage servers from the CLI with `codex mcp`; inspect them in-session with `/mcp` or `/mcp verbose`.

## Hooks

Hooks are the answer to "this must happen, not just be requested."

```toml
[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = ["pnpm", "lint", "--fix"]
command_windows = ["pnpm.cmd", "lint", "--fix"]
```

Events: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`.

Only command hooks execute today. Prompt and agent hooks are parsed but skipped.

Note `command_windows` — if your team is mixed-platform, a hook without it will fail on Windows.

Hooks configured in a project's `.codex/` only load for trusted projects, same as everything else at that level.

## Subagents

```toml
[agents]
max_depth = 1
max_threads = 6
job_max_runtime_seconds = 1800

[agents.reviewer]
description = "Read-only adversarial reviewer"
config_file = "reviewer.config.toml"
```

Subagents are spawned only when you explicitly ask for one — they do not fire automatically. The `config_file` reference is what makes them useful: a reviewer subagent can run under a read-only sandbox while the main session writes.

Manage them in-session with `/agent`.

## CI integration

### Non-interactive execution

The foundation of any CI use is `codex exec`, which never waits for a human:

```bash
codex --ask-for-approval never exec "run the test suite; if anything fails, fix it and re-run until green"
codex exec --json "summarize the changes since main"
```

`--json` emits structured events, which is what you want when something downstream parses the output. `codex exec` defaults to `RUST_LOG=error`.

### Isolating CI state

```bash
CODEX_HOME=$(pwd)/.codex-ci codex exec "..."
```

This gives the run its own config, sessions, and logs rather than inheriting whatever is on the runner.

### GitHub Actions

There is an official action — see [GitHub Action](https://learn.chatgpt.com/docs/github-action) for the current inputs and authentication setup rather than copying a workflow from a tutorial, since the interface is versioned and authentication details matter.

Three things to get right regardless of how you wire it up:

**Authentication is a secret.** Use the repository's secret store. Never a literal token in the workflow file.

**Bound the sandbox.** CI is exactly where `danger-full-access` is tempting and wrong. `workspace-write` with `network_access = false` covers most jobs.

**Decide what happens on failure.** An agent that "fixes" a failing test by deleting it has technically made CI green. If the job can commit, the commit should be reviewable — a PR, not a push to the default branch.

### Codex SDK

For programmatic use beyond shelling out to the CLI, there is an SDK — see [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk).

## Team rollout

### What to commit

| File | Commit? | Why |
| --- | --- | --- |
| `AGENTS.md` | Yes | Shared conventions |
| `.codex/config.toml` | Yes | Shared defaults |
| `.codex/` hooks and rules | Yes | Shared enforcement |
| `~/.codex/config.toml` | No | Machine-local, contains trust entries and possibly provider settings |
| Anything with a token | No | Use `bearer_token_env_var` |

Add a line to your onboarding docs telling new developers to mark the project trusted. Without it, none of the committed `.codex/` configuration applies to them.

### Enforcing rather than suggesting

Committed config is a default any developer can override. When something must hold across a team, that is what `requirements.toml` is for:

| Key | Effect |
| --- | --- |
| `allowed_approval_policies` | Restrict selectable approval policies |
| `allowed_sandbox_modes` | Restrict selectable sandbox modes |
| `allowed_web_search_modes` | Restrict web search (`disabled` is always allowed; an empty list means only `disabled`) |
| `allowed_permission_profiles` | Restrict permission profiles |
| `mcp_servers` | Allowlist servers by id **and** `identity` (exact command or a matcher, or a URL) |
| `hooks.managed_dir` | Hooks the organization controls |
| `marketplaces.restrict_to_allowed_sources` | Where plugins may come from |
| `enforce_residency` | Data residency (currently `us` only) |
| `[features]` | Pin feature flags |

**Version gate:** managed permission-profile allowlists require **Codex 0.138.0 or later**. Clients on 0.137.0 and earlier ignore `allowed_permission_profiles` and managed `default_permissions` entirely. A rollout that assumes enforcement without checking client versions is not enforcing anything.

The `mcp_servers` allowlist requires both an id and an `identity` block, so an approved id cannot be pointed at a different binary or endpoint. Full syntax is in the [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `.codex/config.toml` has no effect | Project not trusted | Add a `projects.<path>.trust_level = "trusted"` entry; run `/debug-config` |
| One key in project config ignored | It's on the machine-local list | Move it to `~/.codex/config.toml` |
| `AGENTS.md` rule ignored | Combined size hit `project_doc_max_bytes`, or an `AGENTS.override.md` shadowed it | Trim, raise the limit, or check for override files |
| Package-level rule loses to the root rule | Wrong direction assumed | Files closer to cwd load later and win — verify the file is where you think |
| MCP server won't start | `[[mcp_servers]]` used instead of `[mcp_servers.<id>]`, or startup exceeded `startup_timeout_sec` | Fix the TOML shape; raise the timeout |
| Hook fails on Windows only | No `command_windows` | Add it |
| CI run hangs | Waiting for an approval nobody will give | `--ask-for-approval never` |
| Managed policy not enforced | Client older than 0.138.0 | Upgrade |
| Can't tell what's in effect | — | `/debug-config` prints layer order plus `allowed_approval_policies`, `allowed_sandbox_modes`, `mcp_servers`, `rules`, `enforce_residency`, `experimental_network` |

## Checklist

Setting up a new project:

- [ ] `AGENTS.md` at the root with tooling, boundaries, and a verification command
- [ ] Per-package `AGENTS.md` where conventions genuinely differ
- [ ] `.codex/config.toml` with sandbox and approval defaults, committed
- [ ] Trust entry in your own `~/.codex/config.toml`
- [ ] Onboarding docs mention the trust step
- [ ] MCP servers use `bearer_token_env_var`, never inline secrets
- [ ] Hooks have `command_windows` if anyone is on Windows
- [ ] CI uses `codex exec` with `--ask-for-approval never` and a bounded sandbox
- [ ] `codex --ask-for-approval never "Summarize the current instructions."` shows what you expect

## Related pages

- [Codex CLI](./codex-cli) — installation and core features
- [Codex Cookbook](./codex-cookbook) — task recipes
- [Codex Glossary](./codex-glossary) — concept definitions
- [Codex Cheatsheet](./codex-cheatsheet) — config keys and commands
- [Learning Map](./) — the full path

## Official sources

- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) · [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) · [Environment Variables](https://learn.chatgpt.com/docs/config-file/environment-variables)
- [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) · [MCP Server](https://learn.chatgpt.com/docs/mcp-server) · [Hooks](https://learn.chatgpt.com/docs/hooks) · [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [GitHub Action](https://learn.chatgpt.com/docs/github-action) · [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)
- [Permissions](https://learn.chatgpt.com/docs/permissions) · [Sandboxing](https://learn.chatgpt.com/docs/sandboxing)
