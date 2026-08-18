# Grok Build Cookbook

Task-oriented recipes. Concepts are in the [glossary](./grok-glossary.md); parameter lists are in the [cheatsheet](./grok-cheatsheet.md).

## 1. Migrating from Claude Code

Grok Build advertises zero-config compatibility, so the fastest path is: install, then just run it in an existing Claude Code project.

What it picks up automatically:

- Instruction files: `CLAUDE.md`, `Claude.md`, `CLAUDE.local.md`, `.claude/rules/*.md`
- Skills, agents, MCP configs, hooks from `.claude/` (including `.claude/settings.json` hook definitions)
- Marketplaces and plugins registered for Claude Code
- Claude Code CLI flag aliases: `--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt`, `--dangerously-skip-permissions`

Two migration commands:

```bash
grok import              # import Claude Code sessions
```

Inside the TUI, `/import-claude` opens the settings-import dialog.

Verify what actually loaded:

```bash
grok inspect
```

Turn compatibility scanning off per source if you do not want it ([settings/reference](https://docs.x.ai/build/settings/reference)):

```toml
[compat.claude]
skills = false
rules  = false
agents = false
mcps   = false
hooks  = false
```

The same shape exists for `[compat.cursor]` (Cursor's `.cursor/rules`, `.cursor/hooks.json`, including its camelCase event names).

**One deliberate exception**: Claude's `managed-settings.json` key `disableBypassPermissionsMode: "disable"` does **not** apply to Grok's always-approve mode. If you need that lock on the Grok side, write it in Grok's own `requirements.toml` (see recipe 4).

## 2. Adding external tools with MCP

Three transports, from [mcp-servers](https://docs.x.ai/build/features/mcp-servers):

```bash
# Local stdio server; everything after -- is the server command
grok mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir

# Remote HTTP server (OAuth handled automatically)
grok mcp add --transport http linear https://mcp.linear.app/mcp

# Remote + static auth header (--header is repeatable)
grok mcp add --transport http api https://mcp.example.com/mcp --header "Authorization: Bearer ${API_TOKEN}"

grok mcp list
grok mcp doctor            # diagnose all servers
grok mcp doctor <name>     # diagnose one
grok mcp remove <name>
```

`list` and `doctor` take `--json`. Pass `--scope project` to write the server into the repo `.grok/config.toml`.

Or configure it in TOML — this is one of the three sections a **project-level** `.grok/config.toml` supports, so it can be committed for the team ([mcp-servers](https://docs.x.ai/build/features/mcp-servers)):

```toml
[mcp_servers.my-server]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
startup_timeout_sec = 30
tool_timeout_sec = 6000
```

Four things to know:

1. **Tool names are namespaced** as `<server>__<tool>` (double underscore). Permission rules and `--tools` lists must use the namespaced name.
2. Timeouts: `startup_timeout_sec` defaults to 30 and `tool_timeout_sec` to 6000 (both in **seconds**). The Claude-compatible `MCP_TIMEOUT` env var is in **milliseconds** and is checked *before* `GROK_MCP_STARTUP_TIMEOUT_SECS`.
3. stdio server stderr goes to `~/.grok/logs/mcp/<server>.stderr.log` — the first place to look when a server will not start.
4. Project-level MCP servers require trust: `--trust` at launch or `/hooks-trust` in the TUI; trusted directories are recorded in `~/.grok/trusted_folders.toml`.

OAuth-based MCP servers store their tokens in `~/.grok/mcp_credentials.json`.

## 3. Blocking dangerous commands with hooks

Hooks are **JSON** files (not TOML). Personal hooks live in `~/.grok/hooks/*.json`, project hooks in `<project>/.grok/hooks/*.json` ([hooks](https://docs.x.ai/build/features/hooks)).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bin/safety-check.sh", "timeout": 10 }]
      }
    ]
  }
}
```

`matcher` is a regular expression on the tool name (Claude names such as `Bash` / `Read` / `Edit` are mapped automatically); omit it to match everything. `type` is `"command"` or `"http"` (the latter needs `url`; the event is POSTed). `timeout` is seconds, default 5.

`PreToolUse` is the **only blocking event**. The contract:

- exit code `0` → allow
- exit code `2` → block
- anything else (timeout, crash, malformed output) → **fail-open**, i.e. the call proceeds

That last rule matters: hooks are a guardrail, not a security boundary. If a hook must not be bypassable, pair it with the sandbox.

Available events: `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionDenied`, `Stop`, `StopFailure`, `Notification`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`.

Manage them from the TUI with `/hooks`. Project hooks also require trust (`--trust` or `/hooks-trust`).

## 4. Tightening permissions

Start from the rule that matters most: **`deny` beats `ask` beats `allow`** — it is a precedence ladder, not last-one-wins.

Team-shareable, in a project `.grok/config.toml`:

```toml
[permission]
rules = [
  { action = "allow", tool = "read" },
  { action = "allow", tool = "bash", pattern = "git status" },
  { action = "allow", tool = "bash", pattern = "npm test" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
  { action = "deny",  tool = "bash", pattern = "git push *" },
]
```

Filters: `Bash`, `Edit`, `Read`, `Grep`, `MCPTool`, `WebFetch`, `WebSearch`.

Note the asymmetry: `[permission]` rules work at project level, but `[ui] permission_mode` (the default mode) **only** takes effect in user-level config. A repo you cloned cannot silently switch you into always-approve.

To lock always-approve off org-wide, put it in a root-owned source ([enterprise](https://docs.x.ai/build/enterprise)):

```toml
# /etc/grok/requirements.toml  — must be root-owned to be honored
[ui]
disable_bypass_permissions_mode = true
```

Writing the same key into a user-writable `~/.grok/requirements.toml` does **not** create a tamper-resistant lock: a user who can add it can remove it.

## 5. Running headless in CI and scripts

```bash
grok -p "Review the diff and list any risks" \
  --output-format json \
  --permission-mode dontAsk \
  --no-auto-update
```

CI-specific choices worth making deliberately:

| Concern | What to do |
|---------|-----------|
| Auth | `export XAI_API_KEY=...` (a secret in your CI settings, never committed) |
| Permissions | `--permission-mode dontAsk` silently denies anything not explicitly allowed; `acceptEdits` auto-approves edits but still asks for shell |
| Auto-update | `--no-auto-update`, or `GROK_DISABLE_AUTOUPDATER`, or `[cli] auto_update = false` |
| Output parsing | `--output-format json` for one final object, `streaming-json` for line-delimited events |
| Runaway loops | `--max-turns <N>` |
| Network egress | Allow `cli-chat-proxy.grok.com` and `auth.x.ai` |
| Isolation | Add `--sandbox read-only` for review-only jobs |

Extract the session ID so a later step can continue the same session:

```bash
SESSION=$(grok -p "Start the audit" --output-format json | jq -r '.sessionId')
grok -r "$SESSION" -p "Now write the findings to REPORT.md"
```

## 6. Parallel development: worktrees plus the Dashboard

```bash
grok -w
grok --worktree=feat "refactor module X"   # = keeps the prompt out of the name
grok -w --ref main "fix the flaky test"    # clean checkout of the ref
grok -w -r <session-id>                    # resume in a fresh worktree
```

Worktrees live under `~/.grok/worktrees/<repo>/<name>`, start from current HEAD **including uncommitted changes**, and require a git repository ([worktrees](https://docs.x.ai/build/features/worktrees)). Inside a session, `/fork --worktree` branches the conversation *and* isolates the files.

Management:

```bash
grok worktree list
grok worktree show <id>
grok worktree rm <ids...>          # --dry-run to preview
grok worktree gc                   # cleanup is manual, by design
grok worktree gc --max-age 7d      # also expire idle worktrees
```

`gc` never runs automatically — deleting work an agent produced before you have looked at it would be worse than leaving stale directories around. So remember to run it.

Watch several sessions at once with the Agent Dashboard: `grok dashboard`, `/dashboard`, or `Ctrl+\`. Disable it with `[dashboard] enabled = false` or `GROK_AGENT_DASHBOARD=0`.

## 7. Subagents, personas, and workflows

Three different things that are easy to confuse ([subagents](https://docs.x.ai/build/features/subagents)):

- **Subagent** — a unit of execution with its own context window that hands a summary back to the parent. Built-in types: `general-purpose`, `explore`, `plan`. `explore` is read-only with no shell and cannot edit files; `plan` also does not touch files. Custom types go in `~/.grok/agents/` or `.grok/agents/`, managed with `/config-agents` (alias `/agents`). [subagents](https://docs.x.ai/build/features/subagents) says they are "Enabled by default when the setting is unset." [settings/reference](https://docs.x.ai/build/settings/reference) lists `GROK_SUBAGENTS` default `0`. Those two official sentences disagree — do not guess which wins; check `grok inspect`.

<!-- TODO: 待核实 —— `[subagents] enabled` / `GROK_SUBAGENTS` when unset: feature page vs env-var table contradict each other -->
- **Persona** — a behavioral overlay (tone, focus, contract). It changes **how** the agent talks, not **what tools** it can call. Defined in `~/.grok/personas/*.toml` or `.grok/personas/*.toml`, managed with `/personas`.
- **Workflow** — orchestration written in `.rhai`, living in `~/.grok/workflows/*.rhai` or `.grok/workflows/*.rhai`. It fans out to subagents, validates, and aggregates; it runs in the background.

```text
/create-workflow [description]
/workflow <name> [args]      # also pause / resume / stop / save
/workflows                   # full-screen run board
/deep-research <query>       # built-in research workflow
```

Routing and switches:

```toml
[subagents]
enabled = true
# per-type toggle and per-type model routing
# toggle = { explore = true, plan = false }
# models = { explore = "grok-build-0.1" }
```

The point of subagents is **context economy**: exploring a large repo generates a lot of intermediate output that is pure waste in the main session. Let `explore` compress a pile of search results into one conclusion.

Subagents inherit the parent's permission mode but are **not** bound by the parent's plan-mode edit gate.

## 8. Background tasks and scheduled checks

```text
/loop 5m Check if the test suite passes and report any failures
/tasks                        # background tasks, subagents, scheduled jobs
/btw <question>               # ask a side question without derailing the main thread
/queue                        # prompts queued behind the current turn
```

The interval accepts `Ns` (minimum 60), `Nm`, `Nh`, and `Nd`. The prompt **fires immediately**, then repeats; each firing is a new agent turn. Hard limits from [background-tasks](https://docs.x.ai/build/features/background-tasks): loops expire after 7 days, and at most 50 scheduled tasks can be active at once.

`Ctrl+B` pushes a running command into the background; `Ctrl+G` toggles the task panel. For a real-time event stream rather than a periodic check, let the agent attach a monitor to a script — **every output line becomes a notification and interrupts the conversation**.

Long-running bash is handled for you: `[toolset.bash] timeout_secs` defaults to 120, and `auto_background_on_timeout` defaults to `true`, so a command that exceeds the timeout moves to the background instead of dying. Raise the ceiling with `max_timeout_secs` (default 36000) and the output cap with `output_byte_limit` (default 20000 bytes).

See [background-tasks](https://docs.x.ai/build/features/background-tasks).

## 9. Sessions and cross-session memory

Session operations are covered in the [tutorial](./grok-cli.md#_8-session-management). Two habits worth forming:

- `/context` before a long task, to see how much budget is left; `/compact [focus]` to reclaim it while keeping what matters.
- `/rewind` (or `Esc Esc` on an empty input) rolls back **both the conversation and the files on disk**. It is not "undo the last message" — uncommitted changes will be gone. Commit before you rewind.

Cross-session memory is **off by default**:

```bash
grok --experimental-memory
# or
export GROK_MEMORY=1
```

```toml
[memory]
enabled = true
```

Once enabled, extra commands appear: `/remember <note>`, `/memory` (alias `/mem`), `/flush` (write memory to disk now), `/dream` (run memory consolidation). Clear it with:

```bash
grok memory clear --workspace   # this workspace only
grok memory clear --global
grok memory clear --all
```

## 10. Skills and plugins

A **skill** adds knowledge and procedure; it does not change the tool set. A **plugin** is a distribution container that can bundle skills, commands, agents, hooks, MCP servers, and LSP config ([skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)).

Locations: `~/.grok/skills/` and `./.grok/skills/`; `~/.grok/plugins/` and `./.grok/plugins/`.

```bash
grok plugin list
grok plugin install <name>
grok plugin uninstall <name>
grok plugin update <name>
grok plugin enable <name>
grok plugin disable <name>
grok plugin details <name>
grok plugin validate <path>

grok plugin marketplace list
grok plugin marketplace add <source>
grok plugin marketplace remove <name>
grok plugin marketplace update
```

The official catalog is [xai-org/plugin-marketplace](https://github.com/xai-org/plugin-marketplace). TUI tabs: `/skills`, `/plugins`, `/marketplace`, `/mcps`, `/hooks` (all the same dialog).

**A trap worth naming**: `allowed-tools` in a `SKILL.md` frontmatter sounds like an allowlist, but xAI states explicitly that it neither grants nor restricts tools. To actually control tools, use `[permission]` rules or `--tools` / `--disallowed-tools`.

A user-invocable skill also becomes a slash command `/<skill-name>`. When names collide, use the qualified form such as `/local:commit`.

Extra discovery paths and opt-outs:

```toml
[skills]
paths = ["/path/to/extra/skills"]
disabled = ["noisy-skill"]

[plugins]
paths = ["/path/to/extra/plugins"]
```

## Related pages

- [Grok learning map](./index.md)
- [Grok Build tutorial](./grok-cli.md) — install, auth, TUI, permissions, sandbox
- [Cheatsheet](./grok-cheatsheet.md) — full commands / flags / config keys / env vars
- [Glossary](./grok-glossary.md) — why the design looks like this
- [Grok Bot](./grok-bot.md) — cloud-computer teammates, not this CLI
