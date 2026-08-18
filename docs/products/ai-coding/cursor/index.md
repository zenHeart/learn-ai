# Cursor ecosystem learning map

> **Cursor is Anysphere's coding-agent family**: a local editor, a terminal CLI, cloud sandbox agents, a git forge, security review, visual UI direction, and an SDK. The fastest first hour is still Tab + Agent in the editor. This page is a map. It does not walk you through clicks.

## Who this is for

- Front-end / full-stack engineers moving from autocomplete to “let the agent edit the repo”
- People who already know VS Code and are installing Cursor for the first time
- Tech leads choosing among **editor / CLI / Cloud / Bugbot / Origin / Security / Design / SDK**

**Not this page:** enterprise contracts, per-token price grids, or Anysphere internals.

## Product landscape

Official docs treat these as **product surfaces**, not another Rules recap.

```
Cursor family
├── Cursor editor (VS Code fork) — the local default
│   ├── Tab          — multi-line complete, cross-file jumps, auto-import
│   ├── Inline Edit  — Cmd+K / Ctrl+K on the current selection
│   ├── Chat / Agent — Cmd+I / Ctrl+I; one agent, four constraints
│   │   ├── Agent    — edit files, run commands
│   │   ├── Ask      — read-only Q&A
│   │   ├── Plan     — editable plan, then implement
│   │   └── Debug    — hypotheses → logs → you reproduce → evidence
│   └── Design Mode  — Agents Window browser: click / draw / voice (Cmd+Shift+D)
├── Cursor CLI (`agent`) — interactive terminal, or `agent -p` headless / CI
├── Cloud Agents (formerly Background Agents)
│   └── Isolated VMs: clone, branch, test, open PRs
│       Start from: editor Cloud dropdown, cursor.com/agents, mobile / PWA,
│       Slack / GitHub `@cursor`, or prefix a CLI message with `&`
├── Bugbot — automated PR review (bugs / security / quality)
│   └── Autofix spawns a Cloud Agent. Official name is Autofix, not a product called “Fixer”
├── Origin — Cursor's git forge (early beta). Host / mirror / PR / browse
├── Security Agents — Security Reviewer (PR) + Vulnerability Scanner (cron)
├── PR Routing & Approval — assign reviewers; approve low-risk PRs
└── Cursor SDK — `@cursor/sdk` / `cursor-sdk` / Bridge. Same agent, in your process
```

Also on the official nav (one line here, official pages — no extra Tutorial):

| Surface | Pick it when | Official |
|---------|--------------|----------|
| **Mobile / iOS / PWA** | Start or review Cloud Agents from a phone | [Mobile](https://cursor.com/docs/cloud-agent/mobile) |
| **JetBrains** | Stay in IntelliJ / PyCharm / WebStorm via ACP | [JetBrains](https://cursor.com/docs/integrations/jetbrains) |
| **Xcode** | Xcode 26.3+ built-in MCP | [Xcode](https://cursor.com/docs/integrations/xcode) |
| **Plugins** | Bundle rules / skills / MCP / hooks | [Plugins](https://cursor.com/docs/plugins) |
| **Automations** | Cloud Agents on a schedule or event. Hosts Bugbot, Security Agents, PR Routing | [Automations](https://cursor.com/docs/cloud-agent/automations) |

Closest cousins on this site: Cloud Agents ≈ Claude remote / Dispatch and Gemini Jules; Design Mode ≈ [Claude Design](../claude/claude-design) (in-app overlay vs standalone canvas); CLI ≈ Claude Code / Codex in a terminal; Origin ≈ “hosted code”, not Rules.

### Quick decision: which should I use?

```
What do you want?
├── Finish the line / next edit / this selection
│   ├── Next edit → Tab (do not start an Agent turn)
│   └── This selection / function → Inline Edit (Cmd+K / Ctrl+K)
├── Ask, edit, plan, or debug in the local repo
│   └── Editor Agent (Cmd+I; Cmd+. for the mode menu)
│       ├── Understand first, do not touch files → Ask
│       ├── Clear multi-file work / tests → Agent
│       ├── Large or fuzzy change → Plan (Shift+Tab in the input)
│       ├── Reproducible bug, unknown cause → Debug
│       └── Point at the running UI → Design Mode (Cmd+Shift+D)
├── You are in a terminal, or a script / CI needs headless
│   └── Cursor CLI (`agent`)
│       ├── Interactive → `agent`
│       ├── Read-only → `agent --mode=ask`
│       ├── Plan first → `agent --mode=plan` / `--plan`
│       └── Script / CI → `agent -p`; add `--force` to apply edits
├── You are away, need parallelism, or want an isolated VM + PR
│   └── Cloud Agents
│       ├── Editor / web / iOS / Android PWA
│       ├── Slack, GitHub, Linear: `@cursor`
│       └── In a CLI session, prefix the message with `&`
├── Host the code itself (not just review a GitHub PR)
│   └── Origin (Pro / Teams / Enterprise; claim a codebase name)
├── Security scan or PR security gate
│   └── Security Agents (`/review-security`; Automations)
├── Route reviewers / auto-approve low-risk PRs
│   └── PR Routing & Approval (`APPROVAL_POLICY.md`)
├── Call the same agent from your TypeScript / Python / other runtime
│   └── Cursor SDK (`@cursor/sdk` / `cursor-sdk` / Bridge)
└── The PR is already pushed (or you want a diff review first)
    └── Bugbot
        ├── Hosted auto-review / comment `cursor review`
        ├── Local `/review-bugbot` before you push
        └── Machine should also patch → Autofix (Cloud Agent), not Debug Mode
```

| You care about | Pick | Next |
|----------------|------|------|
| IDE with Tab + Agent + rules | **Cursor editor** | [Tutorial](./cursor) |
| Click / draw / voice on the running UI | **Design Mode** | [Design Mode](./design-mode) |
| Terminal or headless CI, same Cursor rules / MCP | **Cursor CLI** | [CLI](./cursor-cli) |
| Away / parallel / isolated VM + PR | **Cloud Agents** | [Cloud Agents](./cloud-agents) |
| Machine reviews the PR first | **Bugbot** | [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) |
| Host / mirror / browse the repo | **Origin** | [Origin](./origin) |
| Security bugs on PRs or on a cron | **Security Agents** | [Security Agents](./security-agents) |
| Assign reviewers / approve low-risk PRs | **PR Routing** | [PR Routing](./pr-routing) |
| Same agent inside your process | **SDK** | [Cursor SDK](./cursor-sdk) |
| Phone | **iOS app / Android PWA** | [Mobile](https://cursor.com/docs/cloud-agent/mobile) |
| JetBrains / Xcode | **ACP / Xcode MCP** | [JetBrains](https://cursor.com/docs/integrations/jetbrains) · [Xcode](https://cursor.com/docs/integrations/xcode) |
| Package skills + MCP | **Plugins** | [Plugins](https://cursor.com/docs/plugins) |
| Schedule or event-driven Cloud runs | **Automations** | [Automations](https://cursor.com/docs/cloud-agent/automations) |
| Terminal, fine-grained permissions, Anthropic stack | [Claude Code](../claude/claude-code) | Claude map |
| Stay inside stock VS Code + GitHub | [GitHub Copilot](../copilot) | Copilot page |

The full capability matrix, shortcuts, and config templates live on the [cheatsheet](./cursor-cheatsheet). This overview does not repeat that table.

## Concepts in one line

Full “what / why” lives in the [glossary](./cursor-glossary).

| Concept | One line | Where |
|---------|----------|-------|
| **Tab** | Completion model; accept / reject trains the next suggestion | Editor |
| **Modes** | Agent / Ask / Plan / Debug — constraints, not four products | Editor / CLI |
| **Design Mode** | Visual prompts in the Agents Window browser | Editor |
| **Rules / AGENTS.md** | Persistent instructions in model context | Editor / CLI / Cloud |
| **Skills / Commands** | On-demand workflows; `/` to run | Editor / Cloud |
| **MCP / Hooks / Subagents** | External tools, lifecycle scripts, isolated children | Editor / CLI / Cloud (different limits) |
| **Cloud Agents** | Agents on isolated VMs; formerly Background Agents | Cloud |
| **Bugbot** | PR reviewer; Autofix then spawns a Cloud Agent | PR / `/review-bugbot` |
| **CLI `agent`** | Official terminal entry; `-p` for headless | Terminal / CI |
| **Origin** | Cursor git forge; binary `origin` | Hosted code |
| **Security Agents** | PR reviewer + cron scanner on Automations | Cloud / `/review-security` |
| **PR Routing** | Assign reviewers; maybe auto-approve | Automations |
| **SDK** | Same agent from `@cursor/sdk` / `cursor-sdk` / Bridge | Your process |

## Feature quick reference

### Editor

| Feature | Purpose | Doc |
|---------|---------|-----|
| Tab | Cheap completions, no agent turn | [Tutorial · Tab](./cursor#tab-and-inline-edit) |
| Inline Edit | `Cmd+K` on a selection | same |
| Agent / Ask / Plan / Debug | Four constraints on one local agent | [Tutorial · Modes](./cursor#four-modes) |
| Design Mode | Click / draw / voice in the Agents Window browser | [Design Mode](./design-mode) |
| Rules / `AGENTS.md` | Persist package manager and folder conventions | [Tutorial · Project context](./cursor#project-context) |

### CLI / Cloud / review / host / SDK

| Feature | Purpose | Doc |
|---------|---------|-----|
| `agent` | Same agent in a terminal | [CLI](./cursor-cli) |
| `agent -p` / `--force` | Scripts and CI; `--force` to write files | same |
| Cloud Agents | Remote VM work and PRs | [Cloud Agents](./cloud-agents) |
| Bugbot | Reviews a PR diff; default check is `neutral` | [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) |
| Autofix | Bugbot starts a Cloud Agent on findings | same |
| Origin | Host, mirror, browse, PR | [Origin](./origin) |
| Security Agents | PR + cron security | [Security Agents](./security-agents) |
| PR Routing | Route / approve | [PR Routing](./pr-routing) |
| SDK | In-process agent | [Cursor SDK](./cursor-sdk) |

## Learning path

### Stage 1 — First useful change in five minutes

| Step | What | Link |
|------|------|------|
| 1 | Install, sign in, open a folder | [Tutorial · Install](./cursor#install-and-sign-in) |
| 2 | `Cmd+I`: explain this repo | [Tutorial · First example](./cursor#five-minute-first-example) |
| 3 | One low-risk edit, review the diff, run existing checks | same |
| 4 | Tell Tab / Inline Edit / Ask / Agent / Plan / Debug apart | [Tutorial · Modes](./cursor#four-modes) |

### Stage 2 — Teach the project

| Step | What | Link |
|------|------|------|
| 1 | Root `AGENTS.md` | [Tutorial · Project context](./cursor#project-context) |
| 2 | Split `.cursor/rules/*.mdc` by glob | [Cookbook · Rules](./cursor-cookbook#write-rules-that-stick) |
| 3 | `.cursorignore` for secrets | [Cheatsheet · Ignore](./cursor-cheatsheet#ignore-files) |

### Stage 3 — Real workflows

| Step | What | Link |
|------|------|------|
| 1 | Bugs / Debug Mode | [Cookbook · Bugs](./cursor-cookbook#fix-bugs) |
| 2 | Plan → implement → verify | [Cookbook · Features](./cursor-cookbook#ship-a-multi-file-feature) |
| 3 | Bugbot on PRs | [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) |
| 4 | MCP / Hooks / parallel agents | [Cookbook](./cursor-cookbook) |
| 5 | Visual UI edits | [Design Mode](./design-mode) |
| 6 | Lookup | [Cheatsheet](./cursor-cheatsheet) |
| 7 | Definitions | [Glossary](./cursor-glossary) |

### Stage 4 — Leave the local window

| Step | What | Link |
|------|------|------|
| 1 | Install `agent`, run one interactive turn | [CLI](./cursor-cli) |
| 2 | Dispatch one Cloud task | [Cloud Agents](./cloud-agents) |
| 3 | Cloud ≠ Bugbot ≠ Debug | [Glossary · Cloud](./cursor-glossary#cloud-agents) · [Bugbot](./cursor-glossary#bugbot) |
| 4 | Host code on Origin, or scan / route PRs | [Origin](./origin) · [Security Agents](./security-agents) · [PR Routing](./pr-routing) |
| 5 | Embed the agent | [SDK](./cursor-sdk) |

## Related pages

- [Cursor tutorial](./cursor)
- [Cookbook](./cursor-cookbook)
- [Design Mode](./design-mode)
- [Cloud Agents](./cloud-agents)
- [Cursor CLI](./cursor-cli)
- [Origin](./origin)
- [Security Agents](./security-agents)
- [PR Routing](./pr-routing)
- [Cursor SDK](./cursor-sdk)
- [Cheatsheet](./cursor-cheatsheet)
- [Glossary](./cursor-glossary)
- [AI coding tools overview](../)
