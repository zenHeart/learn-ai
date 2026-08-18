# Grok Build Cheatsheet

Lookup only, no teaching. Every entry comes from xAI's official documentation, with the source page linked next to each section heading. The authoritative full command set is always `grok --help` / `grok <subcommand> --help`.

Covers npm `@xai-official/grok` `1.0.5` (`dist-tags.latest` and `alpha` as of 2026-08-16). The [changelog](https://x.ai/build/changelog) header still showed v1.0.3 / Aug 12, 2026 when re-checked on 2026-08-18. If something does not match, run `grok version` and check the changelog.

## Install and update

| Scenario | Command |
| --- | --- |
| macOS / Linux | `curl -fsSL https://x.ai/cli/install.sh \| bash` |
| Windows PowerShell | `irm https://x.ai/cli/install.ps1 \| iex` |
| npm channel | `npm install -g @xai-official/grok` |
| Check for updates | `grok update --check` |
| Install a specific version | `grok update --version <V>` |
| Switch channel | `grok update --alpha` / `grok update --stable` |
| Show version | `grok version` |

The npm package requires `node >= 20`; the binary is named `grok`.

## Subcommands

Source: [CLI Reference](https://docs.x.ai/build/cli/reference)

| Command | Purpose |
| --- | --- |
| `grok` | No arguments starts the interactive TUI |
| `grok login` | Log in; `--device-auth` uses the device-code flow (no browser) |
| `grok logout` | Log out and clear cached credentials |
| `grok inspect [--json]` | Show what was discovered in this directory: rules, skills, plugins, hooks, MCP servers |
| `grok models` | List available models |
| `grok mcp <list\|add\|remove\|doctor>` | Manage MCP servers |
| `grok plugin <list\|install\|uninstall\|update\|enable\|disable\|details\|validate>` | Manage plugins |
| `grok plugin marketplace <list\|add\|remove\|update>` | Manage marketplace sources |
| `grok sessions <list\|search\|delete>` | List, search, delete sessions |
| `grok export <session-id> [output]` | Export a session as Markdown |
| `grok import [targets...]` | Import sessions from Claude Code |
| `grok memory clear [--workspace\|--global\|--all]` | Clear cross-session memory files |
| `grok worktree <list\|show\|rm\|gc>` | Manage git worktrees created by sessions |
| `grok dashboard` | Open the Agent Dashboard |
| `grok agent stdio` | Run as an ACP agent over stdin/stdout |
| `grok wrap <command...>` | Run a command in a local PTY, forwarding OSC 52 clipboard writes |
| `grok update` | Check for or install updates |
| `grok version` | Print version information |
| `grok completions <shell>` | Generate a shell completion script |
| `grok setup` | Fetch and install managed configuration |

## Common flags

| Flag | Purpose |
| --- | --- |
| `--cwd <PATH>` | Working directory |
| `-r, --resume [<ID>]` | Resume a session; omit the ID for the most recent |
| `-c, --continue` | Continue the most recent session in this directory |
| `-s, --session-id <UUID>` | Assign a UUID to a **new** session (not a resume) |
| `--fork-session` | Fork into a new session ID when resuming |
| `-w, --worktree [<NAME>]` | Start the session in a new git worktree |
| `--ref <REF>` | Branch / tag / commit the worktree is based on |
| `-m, --model <MODEL>` | Model ID |
| `--effort <LEVEL>` | Reasoning effort |
| `--always-approve` | Auto-approve all tool calls (alias `--yolo`) |
| `--allow <RULE>` / `--deny <RULE>` | Permission rules |
| `--sandbox <PROFILE>` | Sandbox profile |
| `--rules <TEXT>` | Extra rules appended to the system prompt |
| `--system-prompt-override <TEXT>` | Replace the system prompt entirely |
| `--tools <LIST>` / `--disallowed-tools <LIST>` | Expose or remove built-in tools |
| `--max-turns <N>` | Maximum agent turns |
| `--no-plan` / `--no-subagents` / `--no-memory` / `--disable-web-search` | Disable a feature for this session |
| `--experimental-memory` | Enable cross-session memory |
| `--oauth` | Use OAuth on the welcome-screen auth flow |
| `--trust` | Trust project-level hooks / MCP / LSP at startup |
| `--plugin-dir <PATH>` | Additional plugin directory |

Claude Code flag names are accepted as aliases: `--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt`, `--dangerously-skip-permissions`.

### Headless-specific

| Flag | Purpose |
| --- | --- |
| `-p <PROMPT>` | Run one prompt non-interactively |
| `--output-format plain\|json\|streaming-json` | Output format, default `plain` |
| `--permission-mode dontAsk\|acceptEdits` | Permission mode for CI |
| `--no-alt-screen` | Do not use the alternate screen buffer |
| `--no-auto-update` | Skip auto-update for this run |

## Permissions and modes

Sources: [Permissions](https://docs.x.ai/build/features/permissions), [Modes and Commands](https://docs.x.ai/build/modes-and-commands)

| Mode | Behavior | How to enter |
| --- | --- | --- |
| Ask (default) | Anything not allowed prompts | Default |
| Auto | A classifier auto-approves safe tools; dangerous ones may still prompt | `/auto`, `Shift+Tab` (when enabled) |
| Always-approve | Auto-approves tool calls (`deny` rules and `PreToolUse` hooks still apply) | `/always-approve`, `Ctrl+O`, `Shift+Tab`, `grok --always-approve` |
| Plan | Only the session plan file is editable until you approve | `/plan [description]`, `Shift+Tab` |
| `dontAsk` | Silently denies anything without an explicit allow (headless / CI) | `--permission-mode dontAsk` |
| `acceptEdits` | Auto-approves file edits, still asks for shell commands | `--permission-mode acceptEdits` |

`Shift+Tab` cycles: Normal → Plan → Auto (when available) → Always-approve.

Rule syntax (`deny` always beats `allow`):

```toml
[permission]
rules = [
  { action = "allow", tool = "bash", pattern = "git *" },
  { action = "allow", tool = "read" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
]
```

Supported filters: `Bash`, `Edit`, `Read`, `Grep`, `MCPTool`, `WebFetch`, `WebSearch`.

`[ui] permission_mode` only takes effect in **user** configuration (`~/.grok/config.toml`, or managed / requirements files); setting it in a project `.grok/config.toml` does nothing. The legacy keys `approval_mode` and `yolo = true` still work; when both are set, `permission_mode` wins.

## Sandbox profiles

Source: [Sandbox](https://docs.x.ai/build/features/sandbox)

Off by default. Landlock on Linux, Seatbelt on macOS.

| Profile | Read | Write | Network | Positioning |
| --- | --- | --- | --- | --- |
| `off` | Unrestricted | Unrestricted | Allowed | No sandbox (default) |
| `workspace` | Anywhere | CWD, `~/.grok/`, temp dirs | Allowed | Normal development |
| `devbox` | Anywhere | Top-level dirs except `/data` | Allowed | Cloud dev machine |
| `read-only` | Anywhere | Only `~/.grok/` and temp dirs | Blocked | Code review, audit |
| `strict` | CWD and system paths | CWD, `~/.grok/`, temp dirs | Blocked | Untrusted repos |

Three limitations: subprocess network restrictions **only apply on Linux** (on macOS the blocking in `read-only` / `strict` is a no-op); built-in profiles do **not** permanently protect paths like `~/.ssh`, so write your own `deny` list; `~/.grok/` stays writable under every profile. The model API and web tools are unaffected by subprocess network settings.

Custom profiles go in `~/.grok/sandbox.toml` or `.grok/sandbox.toml`; built-in names cannot be redefined:

```toml
[profiles.my-profile]
extends = "workspace"
restrict_network = true
deny = ["/secrets", "**/.env", "**/*.pem"]
```

## Slash commands

Source: [Modes and Commands](https://docs.x.ai/build/modes-and-commands)

### Session

| Command | Purpose |
| --- | --- |
| `/quit` (alias `/exit`) | Quit |
| `/help` | Browse commands and key bindings |
| `/home` | Back to the welcome screen |
| `/new` (alias `/clear`) | New session |
| `/resume` | Resume a past session |
| `/sessions` | Switch, rename, close active sessions |
| `/fork` | Fork the current session into a peer agent |
| `/rename <title>` (alias `/title`) | Rename the current session |
| `/share` | Share the current session as a URL |
| `/session-info` | Session information |
| `/context` | Context usage |
| `/compact [context]` | Compact conversation history |
| `/rewind` | Roll back to an earlier turn |
| `/export` | Export the conversation to a file or the clipboard |
| `/copy [N]` | Copy the last (or Nth-from-last) response |
| `/find` | Search the scrollback |
| `/transcript` | View the full transcript with `$PAGER` |

### Models and modes

| Command | Purpose |
| --- | --- |
| `/model <name>` (alias `/m`) | Switch model |
| `/effort` | Set reasoning effort for the current model |
| `/always-approve` | Toggle always-approve |
| `/auto` | Toggle auto mode |
| `/plan [description]` | Enter plan mode |
| `/view-plan` | View the current plan |

### Tasks and orchestration

| Command | Purpose |
| --- | --- |
| `/btw <question>` | Ask a side question without derailing the main thread |
| `/loop [interval] <prompt>` | Repeat a prompt on an interval |
| `/tasks` | List background tasks, subagents, scheduled jobs |
| `/queue` | List prompts queued behind the current turn |
| `/create-workflow [description]` | Write and save a new workflow |
| `/workflow <name> [args]` | Start a workflow, or `pause` / `resume` / `stop` / `save` |
| `/workflows` | Full-screen workflow run board |
| `/deep-research <query>` | Run the built-in research workflow |
| `/dashboard` | Open the Agent Dashboard |
| `/imagine <prompt>` | Text to image |
| `/imagine-video <prompt>` | Text to video |

### Extensions and configuration

| Command | Purpose |
| --- | --- |
| `/hooks` / `/plugins` / `/marketplace` / `/skills` / `/mcps` | Different tabs of the same extensions dialog |
| `/config-agents` (alias `/agents`) | Manage agent definitions |
| `/personas` | Manage personas |
| `/settings` (alias `/config`) | Settings dialog |
| `/theme [name]` (alias `/t`) | Switch theme |
| `/compact-mode` | More compact UI |
| `/multiline` (alias `/ml`) | Toggle multiline input |
| `/vim-mode` | Toggle vim-style scrollback keys |
| `/timestamps` | Toggle message timestamps |
| `/terminal-setup` | Check terminal and clipboard configuration |
| `/hooks-trust` | Trust the current project's hooks |
| `/import-claude` | Open the Claude settings-import dialog |

### Account and memory

| Command | Purpose |
| --- | --- |
| `/login` / `/logout` | Log in / out |
| `/usage` | View quota usage or manage billing |
| `/privacy` | View or change privacy and data-retention status |
| `/feedback [text]` | Send feedback about the current session |
| `/release-notes` (alias `/changelog`) | Release notes for the current version |
| `/remember <note>` | Store a memory |
| `/flush` | Write conversation memory to disk now |
| `/memory` (alias `/mem`) | Browse and manage memories |
| `/dream` | Run memory consolidation |

`/flush`, `/memory`, and `/dream` are provided by the shell and only appear when cross-session memory is enabled. User-invocable skills also become `/<skill-name>`; on a name collision use the qualified form such as `/local:commit`.

## Key bindings

Source: [Keyboard Shortcuts](https://docs.x.ai/build/keyboard-shortcuts). Press `Ctrl+.` in the TUI for the full list (`Ctrl+X` on Windows or terminals without Kitty keyboard protocol support).

### Essential

| Key | Action |
| --- | --- |
| `Enter` | Send |
| `Tab` | Move focus between the input box and the scrollback |
| `Esc` | Cancel the running turn |
| `Esc Esc` | Clear the input box; opens rewind when the input is empty |
| `Ctrl+C` | Cancel the turn |
| `Shift+Tab` | Cycle modes |
| `Ctrl+P` or `?` | Command palette |
| `F2` or `Ctrl+,` | Settings |
| `Ctrl+Q` / `Ctrl+D` | Quit (press twice) |

### Input

| Key | Action |
| --- | --- |
| `Ctrl+Enter` or `Ctrl+I` | Interject during a running turn |
| `Shift+Enter` | Newline; sends in multiline mode (use `Alt+Enter` where unsupported) |
| `Ctrl+M` | Toggle multiline input |
| `Ctrl+R` | Search prompt history |
| `!` | Enter shell mode from an empty input box |

### Panels and sessions

| Key | Action |
| --- | --- |
| `Ctrl+T` | Toggle the todo panel |
| `Ctrl+B` | Send the running command to the background |
| `Ctrl+;` or `Ctrl+'` | Toggle the prompt-queue panel |
| `Ctrl+S` | Open the session list |
| `Ctrl+L` | Open the extensions dialog |
| `Ctrl+G` | Toggle the task panel |
| `Ctrl+O` | Toggle always-approve |
| `Ctrl+N` | New session (press twice) |
| `Ctrl+M` | Pick a model when the input box is not focused |
| `Ctrl+\` | Open the Agent Dashboard |

### Terminal differences (important)

- VS Code-family terminals (VS Code, Cursor, Windsurf, Zed): quit is `Ctrl+D` only, interject is `Ctrl+L`, half-page scroll is `Shift+D`, `Ctrl+L` does **not** open the extensions dialog (use `/plugins`), newline is `Alt+Enter`
- Apple Terminal: `Ctrl+O` also interjects
- WezTerm: needs `enable_kitty_keyboard = true` for `Ctrl+Enter` and `Shift+Enter`

Letter keys in the scrollback (`j`/`k`/`g`/`e`/`y`/`/` and friends) require vim mode (`/vim-mode` or `[ui] vim_mode = true`); the arrow-key equivalents always work.

## Configuration files

| Path | Purpose |
| --- | --- |
| `~/.grok/config.toml` | User configuration (Windows: `%USERPROFILE%\.grok\config.toml`) |
| `<project>/.grok/config.toml` | Project configuration; **only** `[mcp_servers]`, `[plugins]`, `[permission]` are read |
| `~/.grok/sandbox.toml` / `.grok/sandbox.toml` | Custom sandbox profiles |
| `~/.grok/hooks/*.json` / `<project>/.grok/hooks/*.json` | Hook definitions |
| `~/.grok/skills/` / `./.grok/skills/` | Skill directories |
| `~/.grok/plugins/` / `./.grok/plugins/` | Plugin directories |
| `~/.grok/agents/` / `.grok/agents/` | Custom subagent types |
| `~/.grok/personas/*.toml` / `.grok/personas/*.toml` | Persona definitions |
| `~/.grok/workflows/*.rhai` / `.grok/workflows/*.rhai` | Workflows |
| `~/.grok/sessions/` | Session history (indexed by working directory) |
| `~/.grok/worktrees/<repo>/<name>` | Session worktrees |
| `~/.grok/mcp_credentials.json` | MCP OAuth tokens |
| `~/.grok/trusted_folders.toml` | Trusted project directories |
| `~/.grok/logs/mcp/<server>.stderr.log` | stderr of MCP stdio servers |
| `/etc/grok/requirements.toml` | System-level managed policy (the tamper lock is honored only from root-owned sources) |

Instruction files: the `AGENTS.md` family (`AGENTS.md` / `Agents.md` / `AGENT.md`) and the Claude family (`CLAUDE.md` / `Claude.md` / `CLAUDE.local.md` / `.claude/rules/`) are read from the cwd upward to the repository root.

## Common configuration keys

Source: [Settings Reference](https://docs.x.ai/build/settings/reference)

| Section | Key | Notes |
| --- | --- | --- |
| `[models]` | `default` | Model used by new sessions |
| `[models]` | `allowed_models` / `hidden_models` / `disabled_models` | Restrict selectable models (glob list / ID list) |
| `[model.<id>]` | `model` / `base_url` / `name` / `env_key` / `api_backend` | Custom or BYOK model |
| `[model.<id>]` | `context_window` | Context window size; affects when auto-compaction kicks in |
| `[tools]` | `respect_gitignore` | Default `false`; when `true`, search/read tools skip gitignored files |
| `[toolset]` | `file_toolset` | `standard` (default) or `hashline` |
| `[toolset.bash]` | `timeout_secs` / `output_byte_limit` / `max_timeout_secs` | Defaults `120` s / `20000` bytes / `36000` s |
| `[toolset.bash]` | `auto_background_on_timeout` | Default `true`; moves to background on timeout |
| `[toolset.web_fetch]` | `allowed_domains` / `proxy_endpoint` | Domain allowlist and egress proxy for `web_fetch` |
| `[sandbox]` | `profile` / `auto_allow_bash` | Sandbox profile; skip bash prompts while the sandbox is active |
| `[permission]` | `rules` | allow / deny rules |
| `[ui]` | `permission_mode` | `"ask"` / `"auto"` / `"always-approve"`; user config only |
| `[ui]` | `disable_bypass_permissions_mode` | Globally lock out always-approve (root-owned sources only) |
| `[ui]` | `vim_mode` | vim keys in the scrollback |
| `[features]` | `web_fetch` / `lsp_tools` / `write_file` / `tool_search` | `lsp_tools` off by default; `write_file` / `tool_search` on |
| `[subagents]` | `enabled` / `toggle` / `models` | Master switch / per-type switch / per-type model routing |
| `[memory]` | `enabled` | Cross-session memory master switch, **off by default** |
| `[skills]` / `[plugins]` | `paths` / `disabled` / `enabled` | Extra directories / discovered but inactive / explicitly enabled |
| `[compat.claude]` / `[compat.cursor]` | `skills` / `rules` / `agents` / `mcps` / `hooks` | Whether to scan those directories; all default `true` |
| `[dashboard]` | `enabled` | Agent Dashboard master switch |
| `[workflows]` | `enabled` | Workflow master switch |
| `[mcp_servers.<name>]` | `startup_timeout_sec` / `tool_timeout_sec` | Defaults `30` / `6000` seconds |

## Environment variables

| Variable | Default | Notes |
| --- | --- | --- |
| `GROK_HOME` | `~/.grok` | Home for configuration, auth, sessions, skills, plugins, logs |
| `XAI_API_KEY` | — | API key when not using browser login (CI / headless) |
| `GROK_DEFAULT_MODEL` | directory / config | Default model for sessions |
| `GROK_XAI_API_BASE_URL` | `https://api.x.ai/v1` | xAI API base when authenticating with an API key |
| `GROK_MODELS_BASE_URL` | — | Custom inference base URL |
| `GROK_DISABLE_AUTOUPDATER` | unset | Set to disable auto-update (CI / containers) |
| `GROK_SANDBOX` | `off` | Sandbox profile, equivalent to `--sandbox` |
| `GROK_SANDBOX_AUTO_ALLOW_BASH` | `0` | Auto-allow bash while the sandbox is active |
| `GROK_RESPECT_GITIGNORE` | follows config | Force search/read filtering by gitignore |
| `GROK_WEB_FETCH` | `0` | Enable the `web_fetch` tool, **off by default (security)** |
| `GROK_WEB_FETCH_PROXY` | — | Egress proxy for `web_fetch` |
| `GROK_MEMORY` | `0` | Cross-session memory |
| `GROK_SUBAGENTS` | `0` | Enable subagents / the task tool (`1`/`0`). The [subagents](https://docs.x.ai/build/features/subagents) page also says they are "Enabled by default when the setting is unset." Those two official sentences disagree — do not guess which wins; check `grok inspect` on your machine. |
| `GROK_WRITE_FILE` | `1` | Set `0` to disable the `write` tool (read-only sessions) |
| `GROK_TOOL_SEARCH` | `1` | On-demand MCP tool discovery for large tool sets |
| `GROK_LSP_TOOLS` | `0` | LSP code-intelligence tools |
| `GROK_AGENT` | `grok-build` | Built-in agent name, profile, or absolute path to an agent definition |
| `GROK_AGENT_DASHBOARD` | — | Set `0` to disable the Agent Dashboard |
| `GROK_WORKFLOWS` | — | Set `0` to disable workflows |
| `GROK_THEME` | built-in | Color theme |
| `GROK_MCP_STARTUP_TIMEOUT_SECS` | `30` | Global MCP startup handshake timeout, in **seconds** |
| `MCP_TIMEOUT` | same setting | Claude-compatible MCP startup timeout, in **milliseconds**; checked before the one above |
| `GROK_LOG_FILE` | — | Write logs to this path |
| `RUST_LOG` | — | Log filter (e.g. `debug`) |
| `GROK_CRASH_HANDLER` | `0` | Write panic reports to `$GROK_HOME/crash/` |
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | system | Standard proxy variables |

The compatibility-scanner switches all default to on: `GROK_CURSOR_{SKILLS,RULES,AGENTS,MCPS,HOOKS}_ENABLED`, `GROK_CLAUDE_{SKILLS,RULES,AGENTS,MCPS,HOOKS}_ENABLED`.

Additional UI variables include `GROK_SHOW_THINKING_BLOCKS`, `GROK_GROUP_TOOL_VERBS`, `GROK_COLLAPSED_EDIT_BLOCKS`, `GROK_PROMPT_SUGGESTIONS`, `GROK_SCROLL_SPEED`, `GROK_SCROLL_MODE`, `GROK_SCROLL_LINES`, `GROK_INVERT_SCROLL`, `GROK_DEFAULT_SELECTED_PERMISSION`, `GROK_REMEMBER_TOOL_APPROVALS`, `GROK_MOUSE_REPORTING_TOGGLE`, `GROK_DISPLAY_REFRESH_AUTO_CADENCE`; full defaults are in the official [Settings Reference](https://docs.x.ai/build/settings/reference).

## Hook events

| Event | When it fires |
| --- | --- |
| `SessionStart` / `SessionEnd` | Session starts / ends |
| `UserPromptSubmit` | You submit a prompt |
| `PreToolUse` | A tool is about to run — **the only blocking event** |
| `PostToolUse` / `PostToolUseFailure` | Tool finished / failed |
| `PermissionDenied` | The permission system denied a call |
| `Stop` / `StopFailure` | Turn ended / ended due to an API error |
| `Notification` | The agent emits a notification |
| `SubagentStart` / `SubagentStop` | Subagent starts / stops |
| `PreCompact` / `PostCompact` | Before / after conversation compaction |

Exit code 0 allows, exit code 2 blocks, and everything else (timeout, crash, malformed output) **fails open**.

## Models and pricing

Source: [Models](https://docs.x.ai/developers/models). Prices are US dollars per million tokens.

| Model | Context | Input | Cached input | Output |
| --- | --- | --- | --- | --- |
| `grok-4.6` (prompt < 200k) | 500k | $2.00 | $0.50 | $6.00 |
| `grok-4.6` (prompt ≥ 200k) | 500k | $4.00 | $1.00 | $12.00 |
| `grok-build-0.1` (prompt < 200k) | 256k | $1.00 | $0.20 | $2.00 |
| `grok-build-0.1` (prompt ≥ 200k) | 256k | $2.00 | $0.40 | $4.00 |

Long-context billing rule: **once a prompt reaches the threshold, every token in that request is billed at the higher tier** — it is not just the excess that costs more.

Official model-selection advice:

> For everything else, including code, use Grok 4.6. It is the most intelligent and fastest model we've built.

`grok-4.6` has a knowledge cutoff of 2026-02-01. Alias rules: `<modelname>` points at the latest stable release, `<modelname>-latest` at the latest release, and `<modelname>-<date>` pins a specific one.

Prices for other models (`grok-4.5`, `grok-4.3`, the `grok-4.20-*` series, Imagine image/video, Voice) are on the official page.

## High-quality sources

Last verified 2026-08-18. Ordered by reliability and freshness. **The changelog can list commands before [CLI Reference](https://docs.x.ai/build/cli/reference) does** (the research note recorded `grok du` and `grok trace` appearing on the changelog first) — check it first for behavior the docs do not mention.

### First-party official

| Source | Use |
| --- | --- |
| [docs.x.ai/build/overview](https://docs.x.ai/build/overview) | Grok Build documentation entry point |
| [docs.x.ai/build/cli/reference](https://docs.x.ai/build/cli/reference) | Subcommands and flags |
| [docs.x.ai/build/cli/headless-scripting](https://docs.x.ai/build/cli/headless-scripting) | Headless and ACP |
| [docs.x.ai/build/cli/terminal-support](https://docs.x.ai/build/cli/terminal-support) | Terminal compatibility and diagnostics |
| [docs.x.ai/build/modes-and-commands](https://docs.x.ai/build/modes-and-commands) | Full mode and slash-command tables |
| [docs.x.ai/build/keyboard-shortcuts](https://docs.x.ai/build/keyboard-shortcuts) | Full key-binding table |
| [docs.x.ai/build/settings](https://docs.x.ai/build/settings) | Config layers and precedence |
| [docs.x.ai/build/settings/reference](https://docs.x.ai/build/settings/reference) | Full env var and TOML key tables |
| [docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise) | Managed config, SSO, ZDR, CI permission modes |
| [docs.x.ai/build/features/permissions](https://docs.x.ai/build/features/permissions) | Permission model |
| [docs.x.ai/build/features/sandbox](https://docs.x.ai/build/features/sandbox) | Sandbox profiles |
| [docs.x.ai/build/features/hooks](https://docs.x.ai/build/features/hooks) | Hook events and the script contract |
| [docs.x.ai/build/features/mcp-servers](https://docs.x.ai/build/features/mcp-servers) | MCP configuration |
| [docs.x.ai/build/features/skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) | Skills / plugins / marketplaces |
| [docs.x.ai/build/features/sessions](https://docs.x.ai/build/features/sessions) | Sessions, fork, rewind, compact |
| [docs.x.ai/build/features/worktrees](https://docs.x.ai/build/features/worktrees) | Worktrees |
| [docs.x.ai/build/features/subagents](https://docs.x.ai/build/features/subagents) | Subagents and personas |
| [docs.x.ai/build/features/background-tasks](https://docs.x.ai/build/features/background-tasks) | Background tasks, `/loop`, monitors |
| [docs.x.ai/build/features/dashboard](https://docs.x.ai/build/features/dashboard) | Agent Dashboard |
| [docs.x.ai/developers/models](https://docs.x.ai/developers/models) | Model list and pricing |

### Efficiency tricks

| Trick | Notes |
| --- | --- |
| [docs.x.ai/llms.txt](https://docs.x.ai/llms.txt) | Single-file full-text mirror of the whole docs site; good for local grep or feeding a model (it is large — do not commit it to a repo). Last verified 2026-08-18, HTTP 200. |
| `https://docs.x.ai/api/mcp` | Official docs MCP endpoint (Streamable HTTP, stateless); tools `list_doc_pages` / `get_doc_page`. Browser GET/HEAD is not a docs page — 2026-08-18: HEAD 405, GET/POST 406, OPTIONS 204. Use an MCP client, not a browser. |
| `grok inspect --json` | Fastest way to answer "what is actually loaded on this machine" |

### Versions and source

| Source | Use |
| --- | --- |
| [x.ai/build/changelog](https://x.ai/build/changelog) | Changelog; updated faster than the docs site |
| [x.ai/news/grok-build-cli](https://x.ai/news/grok-build-cli) | Launch announcement (2026-05-25, early beta) |
| [x.ai/news/grok-4-6](https://x.ai/news/grok-4-6) | Grok 4.6 announcement (mentions time-boxed 2x included usage in Grok Build; no standing quota number) |
| [github.com/xai-org/grok-build](https://github.com/xai-org/grok-build) | Source (Rust, Apache-2.0); **external PRs are not accepted**, feedback goes through `/feedback` |
| [github.com/xai-org/plugin-marketplace](https://github.com/xai-org/plugin-marketplace) | Official plugin marketplace catalog |
| [npmjs.com/package/@xai-official/grok](https://www.npmjs.com/package/@xai-official/grok) | Release cadence and version history |

**Access note** (re-checked 2026-08-18): `x.ai/build` and `x.ai/build/changelog` return 403 to command-line `curl` (Cloudflare). `x.ai/news/grok-build-cli` and `x.ai/cli/install.sh` returned 200. `docs.x.ai` pages above returned 200. npmjs.com HTML returned 403; the registry JSON at `https://registry.npmjs.org/@xai-official/grok` is readable.

## Related pages

- [Grok learning map](./index.md)
- [Grok Build tutorial](./grok-cli.md)
- [Grok Build cookbook](./grok-cookbook.md)
- [Grok Build glossary](./grok-glossary.md)
