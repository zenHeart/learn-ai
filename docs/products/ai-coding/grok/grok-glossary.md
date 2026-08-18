# Grok Build Glossary

Concepts, not commands. Read this when something in Grok Build seems arbitrary — usually there is a reason, and it is usually about safety boundaries or context economy.

## Things called Grok

The name collides constantly. Sorting it out first saves a lot of confusion:

| Name | What it actually is |
| --- | --- |
| **Grok Build** | The terminal coding agent — the subject of these docs. Executable `grok`. Docs live under `docs.x.ai/build/*`. |
| Grok (the chat product) | The general-purpose assistant on [grok.com](https://grok.com), the Grok apps, and inside X. Chat, search, voice, files. |
| Imagine | Image and video generation / editing. Consumer entry: [grok.com/imagine](https://grok.com/imagine). Programmatic entry: the [Imagine API](https://docs.x.ai/developers/model-capabilities/imagine). |
| Build Mode | A grok.com / Grok-app **chat mode** (mode switcher → **Build**). Early Beta for SuperGrok Heavy. Builds a working preview in the conversation and publishes it. **Not** Grok Build. |
| grok.me | The **publish host** for Build Mode ("Publish to a grok.me link or a custom domain you own"). Not a product, not the CLI. |
| Grok Bot | Named AI teammates on one persistent cloud computer. Desktop + iOS. Docs: [docs.x.ai/grok-bot](https://docs.x.ai/grok-bot/overview). **Not** Grok Build headless. |
| `grok-4.6` | A model. The one currently driving Grok Build. |
| `grok-build-0.1` | A different model, trained specifically for agentic coding. Cheaper, smaller context. |
| xAI API | The model API at `api.x.ai`. Grok Build is a *client* of it, not the same thing. |

**Not official names or products (do not write them as facts):**

- "Grok Code" and "Grok CLI" — the official product name is Grok Build; the binary is `grok`; the repo is [xai-org/grok-build](https://github.com/xai-org/grok-build).
- An official VS Code / JetBrains plugin — editor integration is ACP (`grok agent stdio`).
- grok.me as a separate "Build product" — it is only the publish URL for Build Mode.
- Third-party posts about "Grok 4.3", "2 million token context", "Arena Mode", or "8 parallel agents" as product specs — this set only records slugs and limits that appear on [docs.x.ai](https://docs.x.ai/developers/models) or [x.ai](https://x.ai).

The decision tree for picking a surface is on the [learning map](./index.md). Grok Bot has its own page: [Grok Bot](./grok-bot.md).

## One agent, three faces

Grok Build is a single agent exposed through three surfaces, not three products:

- **TUI** (`grok`) — a full-screen terminal UI. Human in the loop.
- **Headless** (`grok -p "..."`) — one prompt, structured output, exit. No human.
- **ACP** (`grok agent stdio`) — JSON-RPC over stdin/stdout so a host application drives it.

They share sessions, configuration, permission rules, hooks, and MCP servers. A session started in the TUI can be resumed headlessly and vice versa, because sessions are stored on disk under `~/.grok/sessions/`, keyed by working directory.

The practical consequence: there is no "IDE version" to learn. Editor integration means an editor speaking ACP to the same binary.

## Permissions and the sandbox are two orthogonal axes

The single most common misunderstanding. xAI states it plainly:

> Permissions decide which tool calls may run. The sandbox is separate: it limits what an approved call can do on the filesystem and network.

Think of it as two gates in series:

1. **Permission gate** — may this tool call happen at all? Answered by `allow` / `ask` / `deny` rules and the current permission mode.
2. **Sandbox** — now that it is running, what can it reach? Answered by the OS (Landlock on Linux, Seatbelt on macOS).

Always-approve mode opens the first gate wide. It does **not** touch the second. That is why `grok --always-approve --sandbox read-only` is a coherent combination and a genuinely useful one: let the agent work uninterrupted, but make it physically unable to write.

Conversely, a permissive sandbox with strict `deny` rules is the opposite trade: the agent asks less often about safe things but is hard-blocked on the patterns you named.

The sandbox is off by default, so out of the box you only have the first gate.

## Five config layers: why the highest priority lives in /etc

Configuration precedence runs, from lowest to highest:

| Layer | Path | Who controls it |
| --- | --- | --- |
| 1 | `/etc/grok/managed_config.toml` | Admin — **defaults** |
| 2 | `~/.grok/managed_config.toml` | MDM-delivered user defaults |
| 3 | `~/.grok/config.toml` | The user |
| 4 | `~/.grok/requirements.toml` | User-level hard requirements |
| 5 | `/etc/grok/requirements.toml` | Admin — **mandates** |

Note the shape: the admin appears twice, at the bottom *and* the top. `managed_config.toml` sets defaults the user may override; `requirements.toml` sets constraints the user may not. That is why "managed" and "required" are separate files rather than one file with a priority flag — they express different intents.

One detail that turns this from theory into practice: the tamper-resistance lock is honored **only when the source file is root-owned**. Writing `disable_bypass_permissions_mode = true` into a user-writable `~/.grok/requirements.toml` is not a lock, because whoever wrote it can also delete it.

A project-level `.grok/config.toml` is deliberately not in this ladder. It only supports `[mcp_servers]`, `[plugins]`, and `[permission]`. A repository you clone cannot change your default permission mode, your model, or your sandbox profile. That restriction is the security property, not an oversight.

## Authentication: four paths and one resolution order

Four ways in — browser OIDC, device code, API key, external auth provider — but only one order of resolution:

`model.api_key` > `model.env_key` > active session token > `XAI_API_KEY`

Read it as "most specific wins". A per-model key beats an environment variable, which is what you want when one model in your config points at a third-party endpoint: that model's key should not be shadowed by the global `XAI_API_KEY`.

The order also explains a confusing symptom. If you `grok login` and *also* export `XAI_API_KEY`, the session token wins, and usage lands on your subscription rather than your API credit. Which is usually right, and occasionally surprising.

## AGENTS.md: why deeper files win

Rules load global-first, then from the repository root downward to the current directory. Later files take precedence, so the deepest `AGENTS.md` wins.

This is the inverse of how CSS specificity feels but the same as how you'd reason about it in person: repository-wide conventions are the backdrop, and the conventions of the specific package you are standing in are the foreground. `packages/legacy-widget/AGENTS.md` saying "this directory is CommonJS, do not convert it" must beat the root file saying "we use ESM".

Grok Build also reads the Claude family (`CLAUDE.md`, `CLAUDE.local.md`, `.claude/rules/`) and Cursor's `.cursor/rules/` in the same walk. Gitignored files are skipped — so a personal `CLAUDE.local.md` that you gitignored is *not* loaded, which is worth knowing before you spend an hour wondering why your rule has no effect. `grok inspect` prints exactly which rules files loaded, with token counts.

## Plan mode gates edits, not the shell

In plan mode only the session plan file is editable. It sounds like a read-only mode. It is not.

xAI is explicit that bash can still write through shell redirection. `echo x > file.txt` is a bash call, not an edit call, and the plan-mode gate is on the edit tools. So plan mode prevents *accidental* edits and preserves the review step; it is not an isolation boundary.

If you want an actual boundary, that is what the sandbox is for. This is the same distinction as the two gates above, showing up in a different place.

Plan mode is also independent of permission mode: always-approve does not skip the plan review screen. The two systems compose rather than override.

## A session is branchable state, not a chat log

Four operations make sense only if you stop thinking of a session as a transcript:

- **fork** (`/fork`) — branch the conversation. Optionally `--worktree`, which branches the *files* too. Two agents, two states, from a shared prefix.
- **rewind** (`/rewind`, or `Esc Esc` on an empty input) — roll back to an earlier turn. **This reverts files on disk as well.** It is not "delete the last message"; uncommitted work disappears. Commit first.
- **compact** (`/compact [focus]`) — rewrite history into a summary to reclaim context. Also happens automatically.
- **resume** (`grok -c`, `grok -r <id>`) — pick a stored state back up, from any of the three surfaces.

Once files are part of the state, fork plus worktree becomes the natural way to try two approaches to the same problem, and the Agent Dashboard (`Ctrl+\`) becomes necessary rather than decorative — you now have several live states to watch.

Worktree cleanup (`grok worktree gc`) never runs automatically. Automatic cleanup would eventually delete agent output nobody has reviewed yet, which is a worse failure than leaving stale directories on disk.

## Five extension mechanisms and their division of labor

They overlap enough to be confusing, so here is what each one actually changes:

| Mechanism | Changes | Lives in |
| --- | --- | --- |
| **Skill** | Knowledge and procedure — *how* to do a thing | `~/.grok/skills/`, `./.grok/skills/` |
| **MCP server** | The tool set — *what* the agent can call | `[mcp_servers]` in config |
| **Plugin** | Distribution — packages skills, commands, agents, hooks, MCP, LSP together | `~/.grok/plugins/`, `./.grok/plugins/` |
| **Subagent** | Execution — a separate context window that reports a summary back | `~/.grok/agents/`, `.grok/agents/` |
| **Workflow** | Orchestration — `.rhai` scripts that fan out and aggregate | `~/.grok/workflows/*.rhai` |
| **Persona** | Behavior — tone, focus, output contract | `~/.grok/personas/*.toml` |

Two misconceptions worth naming:

**`allowed-tools` in a skill's frontmatter is not permission control.** xAI states that it neither grants nor restricts tools. It is a hint. Real control is `[permission]` rules, `--tools`, and `--disallowed-tools`. Treating a skill's frontmatter as a security boundary is a mistake with real consequences.

**A persona is not a kind of subagent.** A persona changes how the agent writes; a subagent changes where the work runs and whose context window pays for it. You can apply a persona to a subagent, which is exactly why they are separate concepts.

Subagents exist for **context economy**. Exploring a large repository produces a lot of intermediate output — file listings, search hits, dead ends — that is pure noise in the main conversation. The `explore` subagent burns its own context window on that and hands back a conclusion. It is read-only, cannot run shell commands, and cannot edit files, which is what makes it safe to run without supervision.

## Why it goes out of its way to be Claude Code compatible

Grok Build reads `CLAUDE.md`, `.claude/settings.json` hooks, Claude skills and agents and MCP configs, accepts Claude Code's CLI flag names as aliases, and ships `grok import` for Claude Code sessions. The README's phrasing: "Grok is fully compatible with Claude Code with zero configuration needed."

The strategic reading is obvious — it removes the switching cost for the incumbent's users. The practical reading matters more to you: **a repository configured for Claude Code is already configured for Grok Build**, which makes a genuine side-by-side comparison cheap. Run both on the same task, same rules, same tools.

There is one deliberate gap in the compatibility, and it is instructive. Claude's `disableBypassPermissionsMode: "disable"` is *not* applied to Grok's always-approve mode, and Grok's own `/etc/grok/requirements.toml` always takes precedence over Claude's `managed-settings.json`. Compatibility extends to convenience, not to security policy — Grok will not let another vendor's config file decide its safety boundaries.

## Why this document will go out of date

Grok Build entered early beta on 2026-05-25. npm `@xai-official/grok` `latest` moved 1.0.3 → 1.0.5 between 2026-08-12 and 2026-08-16. External pull requests are not accepted; feedback goes through `/feedback`.

So treat every table here as a snapshot, and prefer these habits over memorizing values:

- `grok --help` and `grok <subcommand> --help` are the authoritative command surface.
- `grok inspect --json` answers "what is actually loaded on this machine" better than any document can.
- [x.ai/build/changelog](https://x.ai/build/changelog) can list commands before [CLI Reference](https://docs.x.ai/build/cli/reference) does. When behavior does not match documentation, check the changelog first.

## Related pages

- [Grok learning map](./index.md)
- [Grok Build tutorial](./grok-cli.md)
- [Grok Build cookbook](./grok-cookbook.md)
- [Grok Build cheatsheet](./grok-cheatsheet.md)
- [Grok Bot](./grok-bot.md)
