# Cursor cheatsheet

Lookup, not a tutorial. How-to: [tutorial](./cursor). Definitions: [glossary](./cursor-glossary).

## Contents

- [Decision tables](#decision-tables)
- [Capability matrix](#capability-matrix)
- [Term index](#term-index)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Config](#config)
- [Common errors](#common-errors)
- [Templates](#templates)
- [Sources](#sources)

---

## Decision tables

### Which surface

| Job | Use | Why |
|-----|-----|-----|
| Finish the line / next edit | **Tab** | Cheap, no agent turn |
| This selection or function | **Inline Edit `Cmd+K`** | Selection is the context |
| Questions only | **Ask** | Harder to clobber files |
| Multi-file work, commands | **Agent** | Tool loop |
| Fuzzy, many files | **Plan** | Align first |
| Reproducible, cause unknown | **Debug** | Runtime evidence |
| PR review | **Bugbot** | Diff, not your running app |
| Away / parallel / isolated VM + PR | **Cloud Agents** | Formerly Background Agents |
| Terminal or headless CI | **CLI `agent`** | Binary is `agent`, not `cursor` |
| Point / draw / voice on the running UI | **Design Mode** | Agents Window browser; `Cmd+Shift+D` |
| Host / mirror / browse the repo | **Origin** | Git forge; binary `origin` |
| PR security gate or cron scan | **Security Agents** | `/review-security`; team usage pool |
| Assign reviewers / approve low-risk PRs | **PR Routing** | Exact file `APPROVAL_POLICY.md` |
| Same agent inside your process | **SDK** | `@cursor/sdk` / `cursor-sdk` / Bridge |

### Rules vs Skills vs Commands vs Hooks vs MCP vs Subagents

| Job | Pick | Why |
|-----|------|-----|
| Short constraint on every turn | **Rules** | In the system prompt |
| Human-readable brief for several agents | **AGENTS.md** | No frontmatter |
| On-demand multi-step workflow | **Skills** | Not always in context |
| Prompt you type every day | **Commands** | Explicit `/name` |
| Script before/after a tool | **Hooks** | Not the model's memory |
| External system | **MCP** | Tools protocol |
| Isolated context or parallel work | **Subagents** | Own window |

### New chat vs continue

| Situation | Pick |
|-----------|------|
| New feature / module | New chat |
| Agent looping on the same mistake | New chat + `@Chats` |
| Next iteration of the same feature | Continue |
| Debugging what it just wrote | Continue |

---

## Capability matrix

Moved from the Chinese overview (`docs/zh/products/ai-coding/index.md`). URLs updated to pages that resolved in August 2026. Bugbot's description is corrected to match official docs.

| Feature | What it is | Official docs |
|---------|------------|---------------|
| [AGENTS.md](https://cursor.com/docs/rules) | Plain-markdown project instructions | [Rules · AGENTS.md](https://cursor.com/docs/rules) |
| [Rules (`.cursor/rules`)](https://cursor.com/docs/rules) | `.mdc` + glob / intelligent / manual / Always | [Rules](https://cursor.com/docs/rules) |
| [Commands](https://cursor.com/docs/context/commands) | `.cursor/commands/*.md`, `/` trigger | [Commands](https://cursor.com/docs/context/commands) |
| [Skills](https://cursor.com/docs/skills) | `SKILL.md` packs; `/migrate-to-skills` | [Skills](https://cursor.com/docs/skills) |
| [MCP](https://cursor.com/docs/mcp) | External tools and data | [MCP](https://cursor.com/docs/mcp) |
| [Hooks](https://cursor.com/docs/hooks) | Agent / Tab / workspace lifecycle scripts | [Hooks](https://cursor.com/docs/hooks) |
| [Sub-agents](https://cursor.com/docs/subagents) | Isolated delegates; built-in Explore / Bash / Browser | [Subagents](https://cursor.com/docs/subagents) |
| [Bugbot](https://cursor.com/docs/bugbot) | **PR review** (bugs / security / quality); Autofix spawns Cloud | [Bugbot](https://cursor.com/docs/bugbot) |
| [Cloud Agents](https://cursor.com/docs/cloud-agent) | Isolated VMs, PRs; formerly Background Agents | [Cloud Agent](https://cursor.com/docs/cloud-agent) |
| [Cursor CLI](https://cursor.com/docs/cli/overview) | Terminal `agent`; headless `agent -p` | [CLI](https://cursor.com/docs/cli/overview) · [Installation](https://cursor.com/docs/cli/installation) |
| [Design Mode](https://cursor.com/docs/agent/design-mode) | Visual prompts in the Agents Window browser | [Design Mode](https://cursor.com/docs/agent/design-mode) |
| [Origin](https://cursor.com/docs/origin) | Cursor git forge (early beta); Pro / Teams / Enterprise | [Origin](https://cursor.com/docs/origin) |
| [Security Agents](https://cursor.com/docs/security-agents) | Security Reviewer (PR) + Vulnerability Scanner (cron) | [Security Agents](https://cursor.com/docs/security-agents) |
| [PR Routing & Approval](https://cursor.com/docs/approval-agents) | Route reviewers; approve low-risk PRs | [Approval](https://cursor.com/docs/approval-agents) |
| [TypeScript SDK](https://cursor.com/docs/sdk/typescript) | `@cursor/sdk`; local or cloud runtime | [TS](https://cursor.com/docs/sdk/typescript) · [Python](https://cursor.com/docs/sdk/python) · [Bridge](https://cursor.com/docs/sdk/bridge) |
| [Modes](https://cursor.com/docs/agent/overview) | Agent / Ask / Plan / Debug. `Cmd+.`; Plan via `Shift+Tab` | [Overview](https://cursor.com/docs/agent/overview) · [Plan](https://cursor.com/docs/agent/plan-mode) · [Debug](https://cursor.com/docs/agent/debug-mode) |
| [Tab](https://cursor.com/docs/tab/overview) | Multi-line complete, jumps, TS/Python auto-import | [Tab](https://cursor.com/docs/tab/overview) |
| [Chat](https://cursor.com/docs/agent/prompting) | Agent thread; `@` attaches context | [Prompting](https://cursor.com/docs/agent/prompting) |
| [Codebase Indexing](https://cursor.com/docs/context/semantic-search) | Vector index; semantic search after ~80% | [Semantic search](https://cursor.com/docs/context/semantic-search) |
| [@ Symbols](https://cursor.com/docs/agent/prompting) | `@` files / folders / terminals / chats / git / browser | [Prompting](https://cursor.com/docs/agent/prompting) |
| [Notepad](https://cursor.com/docs/context/mentions) | Legacy matrix row. Not listed on the 2026-08 Prompting page. Status unverified | [old mentions URL](https://cursor.com/docs/context/mentions) |
| [Docs Integration](https://cursor.com/docs/agent/prompting) | Custom docs in context (legacy mentions capability) | [Prompting](https://cursor.com/docs/agent/prompting) |
| [Privacy Mode](https://cursor.com/docs/enterprise/privacy-and-data-governance) | Code is not used for training | [Privacy](https://cursor.com/docs/enterprise/privacy-and-data-governance) |
| [Model Selection](https://cursor.com/docs/models-and-pricing) | Cursor Models pool vs third-party pool | [Models & Pricing](https://cursor.com/docs/models-and-pricing) |
| [Integrations](https://cursor.com/docs/integrations/github) | GitHub / GitLab / Linear / Slack | [GitHub](https://cursor.com/docs/integrations/github) |
| [Inline Edit](https://cursor.com/docs/inline-edit/overview) | `Cmd+K` on a selection | [Inline Edit](https://cursor.com/docs/inline-edit/overview) |
| [Reuse Existing Code](https://cursor.com/docs/reuse-existing-code) | Legacy matrix row. Not in the 2026-08 nav. Status unverified | [reuse-existing-code](https://cursor.com/docs/reuse-existing-code) |
| [Long-running Agents](https://cursor.com/blog/long-running-agents) | Official essay | [Blog](https://cursor.com/blog/long-running-agents) |
| [Self-driving Codebases](https://cursor.com/blog/self-driving-codebases) | Official essay | [Blog](https://cursor.com/blog/self-driving-codebases) |

Used daily, not in the original matrix:

| Feature | What it is | Official docs |
|---------|------------|---------------|
| `.cursorignore` | Blocks index, Tab, Agent, Inline Edit, `@` | [Ignore files](https://cursor.com/docs/context/ignore-files) |
| `.cursorindexingignore` | Index only; tools can still read | same |
| Keyboard shortcuts | Full table | [Keyboard Shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts) |

---

## Term index

One sentence each. Longer definitions: [glossary](./cursor-glossary).

| Term | One line | More |
|------|----------|------|
| **Rules** | Persistent instructions at the start of context | [Glossary](./cursor-glossary#rules) |
| **AGENTS.md** | Project brief without metadata | [Glossary](./cursor-glossary#agents-md) |
| **Skills** | On-demand `SKILL.md` packs | [Glossary](./cursor-glossary#skills) |
| **Commands** | `/` markdown workflows | [Glossary](./cursor-glossary#commands) |
| **MCP** | External tools protocol | [Glossary](./cursor-glossary#mcp) |
| **Hooks** | Lifecycle scripts | [Glossary](./cursor-glossary#hooks) |
| **Subagents** | Child agents, own context | [Glossary](./cursor-glossary#subagents) |
| **Modes** | Agent / Ask / Plan / Debug | [Glossary](./cursor-glossary#modes) |
| **Tab** | Completion model | [Glossary](./cursor-glossary#tab) |
| **Bugbot** | PR review | [Glossary](./cursor-glossary#bugbot) |
| **Checkpoints** | Snapshots before big edits | [Glossary](./cursor-glossary#checkpoints) |
| **Codebase Index** | Vectors for semantic search | [Glossary](./cursor-glossary#codebase-indexing) |
| **Privacy Mode** | No training on your code | [Glossary](./cursor-glossary#privacy-mode) |
| **Cloud Agents** | Agents on remote VMs; formerly Background Agents | [Glossary](./cursor-glossary#cloud-agents) |
| **CLI `agent`** | Official terminal entry; `-p` for headless | [Glossary](./cursor-glossary#cursor-cli) |
| **Design Mode** | Click / draw / voice in the Agents Window browser | [Glossary](./cursor-glossary#design-mode) |
| **Origin** | Cursor git forge; claim a codebase name | [Glossary](./cursor-glossary#origin) |
| **Security Agents** | PR reviewer + cron scanner; team pool | [Glossary](./cursor-glossary#security-agents) |
| **PR Routing** | Assign reviewers; maybe auto-approve | [Glossary](./cursor-glossary#pr-routing--approval) |
| **SDK** | Same agent from `@cursor/sdk` / `cursor-sdk` | [Glossary](./cursor-glossary#cursor-sdk) |

---

## Keyboard shortcuts

From the [official table](https://cursor.com/docs/reference/keyboard-shortcuts). Full list: `Cmd+R` then `Cmd+S` (Windows/Linux: `Ctrl+R` then `Ctrl+S`), or Command Palette → Keyboard Shortcuts. Everything is remappable.

### General

| macOS / Windows·Linux | Action |
|-----------------------|--------|
| `Cmd+I` / `Ctrl+I` | Toggle sidepanel (unless bound to a mode) |
| `Cmd+L` / `Ctrl+L` | Toggle sidepanel; selection → new chat |
| `Cmd+E` / `Ctrl+E` | Toggle Agent layout |
| `Cmd+.` / `Ctrl+.` | Mode menu |
| `Cmd+/` / `Ctrl+/` | Cycle models |
| `Cmd+Shift+J` / `Ctrl+Shift+J` | Cursor settings |
| `Cmd+Shift+Space` / `Ctrl+Shift+Space` | Voice |
| `Cmd+,` / `Ctrl+,` | General settings |
| `Cmd+Shift+P` / `Ctrl+Shift+P` | Command palette |

### Chat / Agent

| Shortcut | Action |
|----------|--------|
| `Enter` | Default nudge; queues while Agent is working |
| `Ctrl+Enter` | Queue |
| `Cmd+Enter` / `Ctrl+Enter` while typing | Force send / inject now |
| `Cmd+Shift+Backspace` | Cancel |
| `Shift+Tab` in the input | Rotate Agent modes (including Plan) |
| `Cmd+N` / `Cmd+R` | New chat |
| `Cmd+T` | New chat tab |
| `Cmd+[` / `Cmd+]` | Prev / next chat |
| `Esc` | Unfocus |

### Inline Edit / Tab / terminal

| Shortcut | Action |
|----------|--------|
| `Cmd+K` / `Ctrl+K` | Inline Edit |
| `Opt+Enter` / `Alt+Enter` | Quick Question |
| `Tab` | Accept Tab suggestion |
| `Cmd+→` / `Ctrl+→` | Accept next word |
| `Cmd+K` in the terminal | Terminal prompt bar |

The old stub called `Cmd+Shift+K` “inline chat” and treated `Cmd+L` only as “open AI chat”. This table wins.

---

## Config

### Where files live

| Purpose | Project (git) | User |
|---------|---------------|------|
| Rules | `.cursor/rules/*.mdc` | Customize → Rules |
| AGENTS.md | Root or subdirectory | — |
| Commands | `.cursor/commands/*.md` | `~/.cursor/commands/` |
| Skills | `.cursor/skills/<name>/SKILL.md` or `.agents/skills/` | `~/.cursor/skills/`, `~/.agents/skills/` |
| Subagents | `.cursor/agents/` | `~/.cursor/agents/` |
| MCP | `.cursor/mcp.json` | Customize / user MCP |
| Hooks | `.cursor/hooks.json` | `~/.cursor/hooks.json` |
| Bugbot notes | `.cursor/BUGBOT.md` | Dashboard team rules |
| Ignore | `.cursorignore`, `.cursorindexingignore` | Global ignore in settings |
| Plans (saved to workspace) | `.cursor/plans/` | Home directory by default |
| Cloud environment | `.cursor/environment.json` | Dashboard Environments / Secrets |
| CLI config | `.cursor/cli.json` | `~/.cursor/cli-config.json` |

Skills / subagents also load `.claude/` and `.codex/` trees. `.cursor/` wins on name clash.

### Rules frontmatter

| `alwaysApply` | `description` | `globs` | Behavior |
|---------------|---------------|---------|----------|
| `true` | — | — | Every session. Ignores the other two |
| `false` | — | set | Auto-attach when a matching file is in context |
| `false` | set | omitted | Agent decides from the description |
| `false` | omitted | omitted | Only when `@`-mentioned |

Precedence: **Team → Project → User**. Merged; earlier source wins conflicts.

### Ignore files

`.cursorignore` uses gitignore syntax. It blocks semantic search, Tab / Agent / Inline Edit reads, and `@` mentions.

Official caveat: the terminal and MCP are **not** bound by `.cursorignore`. Ignore is not a crypto guarantee.

```gitignore
.env
.env.*
**/*.pem
**/secrets.json
dist/
```

Index-only exclusion: `.cursorindexingignore`.

### MCP stdio fields

| Field | Required | Meaning |
|-------|----------|---------|
| `type` | yes | `"stdio"` |
| `command` | yes | On `PATH` or an absolute path |
| `args` | no | Argument array |
| `env` | no | Environment |
| `envFile` | no | Extra env file |

Interpolation: `${env:NAME}`, `${userHome}`, `${workspaceFolder}`, `${workspaceFolderBasename}`, `${pathSeparator}` / `${/}`.

Remote: `url` plus optional `auth` (`CLIENT_ID` / `CLIENT_SECRET` / `scopes`). Desktop redirect `http://localhost:8787/callback`. Web / Cloud Agents: `https://www.cursor.com/agents/mcp/oauth/callback`.

### Hooks

Priority: **Enterprise → Team → Project → User**. All matching hooks run; conflicts merge toward the higher source.

Agent events: `sessionStart` / `sessionEnd`, `preToolUse` / `postToolUse` / `postToolUseFailure`, `subagentStart` / `subagentStop`, `beforeShellExecution` / `afterShellExecution`, `beforeMCPExecution` / `afterMCPExecution`, `beforeReadFile` / `afterFileEdit`, `beforeSubmitPrompt`, `preCompact`, `stop`, `afterAgentResponse` / `afterAgentThought`.

Tab: `beforeTabFileRead` / `afterTabFileEdit`. App: `workspaceOpen`.

Exit codes: `0` ok; `2` block (`permission: "deny"`); anything else fail-open unless `failClosed: true`.

Cloud agents: command-based **project** hooks only.

### Skills frontmatter

| Field | Required | Meaning |
|-------|----------|---------|
| `name` | yes | `[a-z0-9-]+`, must match the parent folder |
| `description` | yes | Relevance hint |
| `paths` | no | Globs that gate surfacing |
| `disable-model-invocation` | no | `true` → `/name` only |
| `metadata` | no | Arbitrary map |

### CLI `agent`

Sources: [Installation](https://cursor.com/docs/cli/installation), [Overview](https://cursor.com/docs/cli/overview), [Headless](https://cursor.com/docs/cli/headless), [Using](https://cursor.com/docs/cli/using).

| Command | Meaning |
|---------|---------|
| `curl https://cursor.com/install -fsS \| bash` | macOS / Linux / WSL install |
| `irm 'https://cursor.com/install?win32=true' \| iex` | Windows PowerShell install |
| `agent --version` | Verify |
| `agent` / `agent "…"` | Interactive |
| `agent --mode=ask` | Read-only |
| `agent --mode=plan` / `--plan` | Plan |
| `agent -p "…"` | Headless; does not write files by default |
| `agent -p --force "…"` | Headless and apply edits (`--yolo` alias) |
| `& …` in a session | Hand off to a Cloud Agent |
| `agent ls` / `agent resume` / `agent --continue` | Resume |
| `agent update` | Manual update |
| `agent --worktree "…"` | Edit in a separate git worktree |

Script auth: `CURSOR_API_KEY`. Config: global `~/.cursor/cli-config.json`, project `.cursor/cli.json` ([Configuration](https://cursor.com/docs/cli/reference/configuration)).

### Models and plans (summary)

Authoritative numbers: [Models & Pricing](https://cursor.com/docs/models-and-pricing) (dynamic table).

- Two pools: **Cursor Models** (Grok 4.6 / 4.5, Composer 2.5) and **Other Models** (third-party API rates)
- Individual (pre-tax unless noted): Start (India only, ₹649/mo), Pro $20, Pro Plus $60, Ultra $200
- Bugbot and Cloud Agents: Pro and up (Start **excludes** Bugbot)
- Teams: Standard $40 / user / mo, Premium $120 / user / mo

Per-million token cells were not recoverable from the rendered docs page.

---

## Common errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| `.cursor/rules/foo.md` does nothing | Rules ignore `.md` without frontmatter | Rename to `.mdc` or use `AGENTS.md` |
| Always rules blow the window | Too long / too many | Split; keep each under 500 lines; prefer globs |
| Cannot `@` a file | `.cursorignore` / `.gitignore` | `git check-ignore -v` |
| Empty semantic search | Index below ~80% | Settings → Indexing; check network |
| Plan still writes code | Reported in the forum | Stop → Restore → “no edits until APPROVE” |
| Bugbot check is green, comments remain | Default `neutral` | Read comments; enable fail-on-unresolved to block |
| Autofix missing | No on-demand usage or Legacy Privacy Mode | Official requirements |
| Hook missing in Cloud | User-level or `type: prompt` | Project `.cursor/hooks.json`, command hook |
| `agent: command not found` | `~/.local/bin` not on PATH | Official Installation PATH step |
| `agent -p` did not edit files | Headless proposes only | Add `--force` / `--yolo` |
| Cloud run never starts | SCM not connected or free plan | Admin connects SCM; official Troubleshooting |
| MCP will not start | `command` not on PATH / missing env | Customize logs; interpolate secrets |
| Tab pollutes markdown | Extension not disabled | Status bar → disable for that extension |

---

## Templates

### Project `AGENTS.md`

```markdown
# Agent notes

- Package manager: pnpm. Never npm / yarn.
- Checks: `pnpm typecheck`, `pnpm test`.
- Canonical component: `src/components/Button.tsx`.
```

### `hooks.json` (official stop-loop skeleton)

```json
{
  "version": 1,
  "hooks": {
    "stop": [
      { "command": "bun run .cursor/hooks/grind.ts" }
    ]
  }
}
```

`grind.ts` reads JSON from stdin and writes JSON to stdout. Official blog fields: `conversation_id`, `status` (`completed` | `aborted` | `error`), `loop_count`. Return `{ "followup_message": "..." }` to continue. Default `loop_limit` is 5.

### `.cursor/BUGBOT.md`

```markdown
# Bugbot

- Amounts are integer cents.
- Copy issues are not bugs unless they change control flow.
```

---

## Sources

Last systematic check: 2026-08-18. Discovery method: repo `sources/_template.md`.

### Official docs

- **[Cursor Docs](https://cursor.com/docs)** — main tree. Child pages listed in [references/cursor.md](https://github.com/zenHeart/learn-ai/blob/master/.claude/skills/doc-research/references/cursor.md)
  - How to read: web-reader, one URL at a time
  - Last verified: 2026-08-18
- **[Cloud Agents](https://cursor.com/docs/cloud-agent)**, **[CLI](https://cursor.com/docs/cli/overview)**, **[Bugbot](https://cursor.com/docs/bugbot)** — three first-class surfaces
  - Last verified: 2026-08-18
- **[Changelog](https://cursor.com/changelog)** — editor releases
  - Last verified: 2026-08-18
- **[Downloads](https://cursor.com/downloads)**
  - Last verified: 2026-08-18

Chinese locale: prefix `/cn/`, e.g. [cn/docs/rules](https://cursor.com/cn/docs/rules).

### Official long-form

- **[Best practices for coding with agents](https://cursor.com/blog/agent-best-practices)**
  - Last verified: 2026-08-18
- **[Long-running agents](https://cursor.com/blog/long-running-agents)**, **[Self-driving codebases](https://cursor.com/blog/self-driving-codebases)**
  - Last verified: 2026-08-18
- No official cookbook repo analogous to `anthropics/claude-cookbooks`. Examples live in docs + blog.

### Official / core social

- **[@cursor_ai](https://x.com/cursor_ai)** — product account (footer on cursor.com → X)
  - Layer: product
  - Last verified: 2026-08-18

Company / founder personal accounts are not listed until an official page or staff post names them.

### Team blog

- **[cursor.com/blog](https://cursor.com/blog)** — Last verified: 2026-08-18

### GitHub

- There is **no** official public source repo for the Cursor IDE. Do not label third-party mirrors as official.
- **[GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)** — community Figma MCP cited by the old stub. Install from that README.
  - Last verified: 2026-08-18 (repo exists)

### Aggregators

- **[cursor.directory](https://cursor.directory)** — community rules / MCP. Not Anysphere.
  - Last verified: 2026-08-18

### Third-party / community

- **[forum.cursor.com](https://forum.cursor.com/)** — official forum
  - Last verified: 2026-08-18
- **[WorkOS on Bugbot](https://workos.com/blog/cursor-bugbot-autoreview-claude-code-prs)**
  - Last verified: 2026-08-18

### Unverified

- Whether Notepad is still a first-class feature
- Whether `https://cursor.com/docs/reuse-existing-code` still resolves
- Founder / engineer X accounts with first-party proof
- Whether `@modelcontextprotocol/server-filesystem` is still the example package to name in docs (JSON above is a field demo)
