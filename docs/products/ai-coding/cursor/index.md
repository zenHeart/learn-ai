# Cursor ecosystem learning map

> **Cursor is Anysphere's coding-agent family**: a local editor, a terminal CLI, cloud sandbox agents, and PR review. The fastest first hour is still Tab + Agent in the editor. This page is a map. It does not walk you through clicks.

## Who this is for

- Front-end / full-stack engineers moving from autocomplete to “let the agent edit the repo”
- People who already know VS Code and are installing Cursor for the first time
- Tech leads choosing among **editor / CLI / Cloud / Bugbot**

**Not this page:** enterprise contracts, per-token price grids, Anysphere internals, or standalone tutorials for Origin / SDK / Security Agents.

## Product landscape

Official docs treat these as **product surfaces**, not another Rules recap. This site covers the four you will actually pick between:

```
Cursor family
├── Cursor editor (VS Code fork) — the local default
│   ├── Tab          — multi-line complete, cross-file jumps, auto-import
│   ├── Inline Edit  — Cmd+K / Ctrl+K on the current selection
│   └── Chat / Agent — Cmd+I / Ctrl+I; one agent, four constraints
│       ├── Agent    — edit files, run commands
│       ├── Ask      — read-only Q&A
│       ├── Plan     — editable plan, then implement
│       └── Debug    — hypotheses → logs → you reproduce → evidence
├── Cursor CLI (`agent`) — interactive terminal, or `agent -p` headless / CI
├── Cloud Agents (formerly Background Agents)
│   └── Isolated VMs: clone, branch, test, open PRs
│       Start from: editor Cloud dropdown, cursor.com/agents, mobile,
│       Slack / GitHub `@cursor`, or prefix a CLI message with `&`
└── Bugbot — automated PR review (bugs / security / quality)
    └── Autofix spawns a Cloud Agent. Official name is Autofix, not a product called “Fixer”
```

**Not split into pages here** (official docs exist; not enough everyday density for a sixth Tutorial): Origin, SDK, Security Agents, PR Routing & Approval, Design Mode, iOS / PWA.

Closest cousins on this site: Cloud Agents ≈ Claude remote / Dispatch and Gemini Jules; Bugbot ≈ “machine reviews the PR first”; CLI ≈ Claude Code / Codex in a terminal.

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
│       └── Reproducible bug, unknown cause → Debug
├── You are in a terminal, or a script / CI needs headless
│   └── Cursor CLI
│       ├── Interactive → `agent`
│       ├── Read-only → `agent --mode=ask`
│       ├── Plan first → `agent --mode=plan` / `--plan`
│       └── Script / CI → `agent -p`; add `--force` to apply edits
├── You are away, need parallelism, or want an isolated VM + PR
│   └── Cloud Agents
│       ├── Editor / web / mobile
│       ├── Slack, GitHub, Linear: `@cursor`
│       └── In a CLI session, prefix the message with `&`
└── The PR is already pushed (or you want a diff review first)
    └── Bugbot
        ├── Hosted auto-review / comment `cursor review`
        ├── Local `/review-bugbot` before you push
        └── Machine should also patch → Autofix (Cloud Agent), not Debug Mode
```

| You care about | Pick | Next |
|----------------|------|------|
| IDE with Tab + Agent + rules | **Cursor editor** | [Tutorial](./cursor) |
| Terminal or headless CI, same Cursor rules / MCP | **Cursor CLI** | [Cookbook · CLI](./cursor-cookbook#use-cursor-cli-in-the-terminal-or-ci) |
| Away / parallel / isolated VM + PR | **Cloud Agents** | [Cookbook · Cloud](./cursor-cookbook#run-work-on-cloud-agents) |
| Machine reviews the PR first | **Bugbot** | [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) |
| Terminal, fine-grained permissions, Anthropic stack | [Claude Code](../claude/claude-code) | Claude map |
| Stay inside stock VS Code + GitHub | [GitHub Copilot](../copilot) | Copilot page |

The full capability matrix, shortcuts, and config templates live on the [cheatsheet](./cursor-cheatsheet). This overview does not repeat that table.

## Concepts in one line

Full “what / why” lives in the [glossary](./cursor-glossary).

| Concept | One line | Where |
|---------|----------|-------|
| **Tab** | Completion model; accept / reject trains the next suggestion | Editor |
| **Modes** | Agent / Ask / Plan / Debug — constraints, not four products | Editor / CLI |
| **Rules / AGENTS.md** | Persistent instructions in model context | Editor / CLI / Cloud |
| **Skills / Commands** | On-demand workflows; `/` to run | Editor / Cloud |
| **MCP / Hooks / Subagents** | External tools, lifecycle scripts, isolated children | Editor / CLI / Cloud (different limits) |
| **Cloud Agents** | Agents on isolated VMs; formerly Background Agents | Cloud |
| **Bugbot** | PR reviewer; Autofix then spawns a Cloud Agent | PR / `/review-bugbot` |
| **CLI `agent`** | Official terminal entry; `-p` for headless | Terminal / CI |

## Feature quick reference

### Editor

| Feature | Purpose | Doc |
|---------|---------|-----|
| Tab | Cheap completions, no agent turn | [Tutorial · Tab](./cursor#tab-and-inline-edit) |
| Inline Edit | `Cmd+K` on a selection | same |
| Agent / Ask / Plan / Debug | Four constraints on one local agent | [Tutorial · Modes](./cursor#four-modes) |
| Rules / `AGENTS.md` | Persist package manager and folder conventions | [Tutorial · Project context](./cursor#project-context) |

### CLI / Cloud / Bugbot

| Feature | Purpose | Doc |
|---------|---------|-----|
| `agent` | Same agent in a terminal | [Cookbook · CLI](./cursor-cookbook#use-cursor-cli-in-the-terminal-or-ci) |
| `agent -p` / `--force` | Scripts and CI; `--force` to write files | same |
| Cloud Agents | Remote VM work and PRs | [Cookbook · Cloud](./cursor-cookbook#run-work-on-cloud-agents) |
| Bugbot | Reviews a PR diff; default check is `neutral` | [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) |
| Autofix | Bugbot starts a Cloud Agent on findings | same |

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
| 5 | Lookup | [Cheatsheet](./cursor-cheatsheet) |
| 6 | Definitions | [Glossary](./cursor-glossary) |

### Stage 4 — Leave the local window

| Step | What | Link |
|------|------|------|
| 1 | Install `agent`, run one interactive turn | [Cookbook · CLI](./cursor-cookbook#use-cursor-cli-in-the-terminal-or-ci) |
| 2 | Dispatch one Cloud task | [Cookbook · Cloud](./cursor-cookbook#run-work-on-cloud-agents) |
| 3 | Cloud ≠ Bugbot ≠ Debug | [Glossary · Cloud](./cursor-glossary#cloud-agents) · [Bugbot](./cursor-glossary#bugbot) |

## Related pages

- [Cursor tutorial](./cursor)
- [Cookbook](./cursor-cookbook)
- [Cheatsheet](./cursor-cheatsheet)
- [Glossary](./cursor-glossary)
- [AI coding tools overview](../)
