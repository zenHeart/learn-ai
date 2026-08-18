# Cursor learning map

> **Cursor is an AI editor and coding agent.** Tab, inline edit, and a repo-aware Agent live in one VS Code-based window. This page is a map. It does not walk you through clicks.

## Who this is for

- Front-end / full-stack engineers moving from autocomplete to “let the agent edit the repo”
- People who already know VS Code and are installing Cursor for the first time
- Tech leads picking Rules / Skills / Bugbot for a team

**Not this page:** enterprise contracts, per-token price grids, or Anysphere internals.

## Product landscape

```
Cursor
├── Editor (VS Code fork)
│   ├── Tab          — multi-line complete, cross-file jumps, auto-import
│   ├── Inline Edit  — Cmd+K / Ctrl+K on the current selection
│   └── Chat / Agent — Cmd+I / Ctrl+I: search, edit, run commands
├── Project context
│   ├── AGENTS.md / .cursor/rules
│   ├── Skills / Commands
│   ├── MCP / Hooks / Subagents
│   └── Codebase index (semantic search)
└── Cloud and review
    ├── Cloud Agents — isolated VMs, PRs
    └── Bugbot       — PR review (not a runtime debugger)
```

### Quick decision

```
What do you want?
├── Finish the current line / next edit
│   └── Tab
├── Change this selection or function
│   └── Inline Edit (Cmd+K / Ctrl+K)
├── Explain first, do not touch files
│   └── Ask (Cmd+. mode menu)
├── Multi-file work, tests, cleanup
│   └── Agent (Cmd+I)
├── Large or fuzzy change
│   └── Plan Mode (Shift+Tab in the agent box)
├── Reproducible bug, unknown cause
│   └── Debug Mode
└── PR already pushed
    └── Bugbot (Dashboard Automations)
```

| You care about | Pick | Next |
|----------------|------|------|
| IDE with Tab + Agent + rules | **Cursor** | [Tutorial](./cursor) |
| Terminal, fine-grained permissions, headless CI | [Claude Code](../claude/claude-code) | Claude map |
| Stay inside stock VS Code + GitHub | [GitHub Copilot](../copilot) | Copilot page |

The full capability matrix, shortcuts, and config templates live on the [cheatsheet](./cursor-cheatsheet). This overview does not repeat that table.

## Concepts in one line

Full “what / why” lives in the [glossary](./cursor-glossary).

| Concept | One line |
|---------|----------|
| **Rules** | Persistent instructions prepended to model context |
| **AGENTS.md** | Plain-markdown project brief, portable across tools |
| **Skills** | On-demand `SKILL.md` workflows; also `/name` |
| **Commands** | `/` prompts from `.cursor/commands/*.md` |
| **MCP** | Protocol for external tools and data |
| **Hooks** | Scripts on the Agent / Tab lifecycle |
| **Subagents** | Child agents with their own context windows |
| **Bugbot** | PR reviewer, not Debug Mode |
| **Modes** | Agent / Ask / Plan / Debug |
| **Tab** | Completion model; accept / reject trains the next suggestion |

## Learning path

### Stage 1 — First useful change in five minutes

| Step | What | Link |
|------|------|------|
| 1 | Install, sign in, open a folder | [Tutorial · Install](./cursor#install-and-sign-in) |
| 2 | `Cmd+I`: explain this repo | [Tutorial · First example](./cursor#five-minute-first-example) |
| 3 | One low-risk edit, review the diff, run existing checks | same |
| 4 | Switch to Plan for bigger work | [Tutorial · Modes](./cursor#four-modes) |

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

## Related pages

- [Cursor tutorial](./cursor)
- [Cookbook](./cursor-cookbook)
- [Cheatsheet](./cursor-cheatsheet)
- [Glossary](./cursor-glossary)
- [AI coding tools overview](../)
