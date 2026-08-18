# Cursor tutorial

Cursor is a VS Code-based AI editor: Tab completions, `Cmd+K` on a selection, and `Cmd+I` for an agent that reads the repo, edits files, and runs commands.

> Parameters, shortcut tables, and the capability matrix: [cheatsheet](./cursor-cheatsheet). Definitions: [glossary](./cursor-glossary). Task recipes: [cookbook](./cursor-cookbook).
>
> Docs track the 2026-08 tree at [cursor.com/docs](https://cursor.com/docs). This page does not pin a patch version in headings.

## Prerequisites

- You can open a folder in VS Code, read a diff, and use the terminal
- A machine that can sign in at [cursor.com](https://cursor.com)
- A **git** repo to practice on — agent edits hit disk immediately

## Learning objectives

After this page you can:

1. Finish “explain the repo → one small edit → review the diff” in five minutes
2. Tell Tab, Inline Edit, Agent, Plan, and Debug apart
3. Persist package-manager and folder conventions in `AGENTS.md` or one `.mdc` rule
4. Use `@` when you know the file, and skip it when you do not

---

## Install and sign in

1. Install from [Downloads](https://cursor.com/downloads).
2. Open the app and sign in.
3. **File → Open Folder** on a git repo. Do not start in an empty window.

Official path: [Quickstart](https://cursor.com/docs/get-started/quickstart).

| Want | Shortcut |
|------|----------|
| Cursor settings (models, Tab, indexing) | `Cmd+Shift+J` / `Ctrl+Shift+J` |
| VS Code settings | `Cmd+,` / `Ctrl+,` |
| Command palette | `Cmd+Shift+P` / `Ctrl+Shift+P` |

Source: [Keyboard Shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts).

---

## Five-minute first example

Goal: prove the agent can read the repo and that you can review its diff. Steps follow the official Quickstart.

### 1. Open Agent

`Cmd+I` / `Ctrl+I`. Both Quickstart and Agent Overview use this key.

### 2. Ask for an explanation first

```text
Explain this codebase: stack, how directories are split, which files I should read first.
Do not modify any files.
```

Cursor searches, reads, and summarizes. Official docs call this the fastest way into an unfamiliar repo.

### 3. Make one low-risk change

Official first tasks: copy, small UI, comments. State the outcome.

```text
Add one sentence to the Getting Started section of README.md:
This repo uses pnpm at the root. Do not run npm install.
Touch only README.md. Summarize the diff when done.
```

TypeScript-only alternative:

```text
Add formatISODate(date: Date): string to src/utils/formatDate.ts.
Return date.toISOString().slice(0, 10) (YYYY-MM-DD).
Export it. Do not touch other files. Tell me how to verify by hand.
```

### 4. Review the diff and run checks you already have

1. Confirm the diff is only the file you allowed
2. Ask it to run **existing** checks — do not invent script names:

```text
Run the typecheck and lint this project already uses. Do not add config files.
```

3. Run the same command yourself (`pnpm typecheck`, etc.)

### 5. Use Plan Mode for bigger work

`Shift+Tab` in the agent input. Official sequence:

1. Research the repo
2. Ask clarifying questions
3. Write an editable plan
4. **Wait for approval before coding**

Plans default to your home directory. **Save to workspace** stores them in the repo (the official blog names `.cursor/plans/`).

---

## Four modes

Same agent, different constraints. `Cmd+.` / `Ctrl+.` opens the mode menu. `Shift+Tab` also rotates Plan.

| Mode | Does | Use when |
|------|------|----------|
| **Agent** | Search, edit, terminal | Clear implementation work |
| **Ask** | Read-only Q&A (changelog: Ask has search tools; the `@Codebase` tool was removed) | Understand first |
| **Plan** | Research, questions, editable plan | Many files or fuzzy requirements |
| **Debug** | Hypotheses → logs → you reproduce → evidence-based fix | Reproducible, cause unknown |

Pages: [Overview](https://cursor.com/docs/agent/overview), [Plan Mode](https://cursor.com/docs/agent/plan-mode), [Debug Mode](https://cursor.com/docs/agent/debug-mode). Ask appears in the [changelog](https://cursor.com/changelog); there is no standalone Modes page in the 2026-08 nav.

### Three Agent habits

1. **Checkpoints** — snapshots before big edits. Restore instead of hand-undoing.
2. **Queue** — `Enter` queues while the agent works; `Cmd+Enter` / `Ctrl+Enter` injects into the current turn.
3. **New chat** — new task, repeated mistakes, or a finished unit of work. Pull old context with `@Chats`.

Sources: [Overview](https://cursor.com/docs/agent/overview), [Prompting](https://cursor.com/docs/agent/prompting), [agent-best-practices](https://cursor.com/blog/agent-best-practices).

---

## Tab and Inline Edit

### Tab

[Tab](https://cursor.com/docs/tab/overview) is a completion model, not the agent.

- New text: ghost text. Edits: a diff popup
- `Tab` accept, `Esc` reject, `Cmd+→` / `Ctrl+→` word-by-word
- After an accept, `Tab` can jump to the next predicted location
- TypeScript / Python can auto-import
- Status bar: snooze, disable globally, or disable by extension

Do **not** start an Agent turn to change three lines under the caret.

### Inline Edit

[Inline Edit](https://cursor.com/docs/inline-edit/overview): `Cmd+K` / `Ctrl+K`.

- With a selection: edit that range
- Without: generate at the cursor, using surrounding code
- `Opt+Enter` / `Alt+Enter`: Quick Question; say `do it` to apply
- Multi-file: send the selection to Chat with `Cmd+L` / `Ctrl+L`

---

## Project context

Models do not remember preferences across completions. Persist them with Rules / `AGENTS.md`. Mechanism: [glossary · Rules](./cursor-glossary#rules).

### Minimal `AGENTS.md`

Official position: a simple alternative without metadata. Subdirectories may add their own.

```markdown
# Agent notes

- Package manager is pnpm. Never `npm install` or yarn.
- Source lives in `src/`. Tests are `src/**/*.test.ts`.
- After edits run `pnpm typecheck` and `pnpm test`.
- UI components: follow `src/components/Button.tsx`. Do not paste that file into rules.
```

### One file-scoped rule

Files under `.cursor/rules` must be **`.mdc`**. A plain `.md` is ignored.

```markdown
---
description: TypeScript module conventions
globs: "**/*.ts,**/*.tsx"
alwaysApply: false
---

- ES modules only (`import` / `export`). No `require`.
- Prefer named exports.
- Canonical structure: `src/components/Button.tsx`.
```

Trigger table: [cheatsheet · Rules](./cursor-cheatsheet#rules-frontmatter). Create with `/create-rule`.

Official limit: **under 500 lines** per rule. Split large ones. Put style in the linter, not in a pasted style guide.

---

## How to give context

Source: [Prompting](https://cursor.com/docs/agent/prompting).

| Mention | Meaning |
|---------|---------|
| `@auth.ts` / `@src/components/` | File or folder. Type `/` after a folder to go deeper |
| `@Terminals` | Terminal output |
| `@Chats` | A previous conversation |
| `@Commit (Diff of Working State)` | Uncommitted diff |
| `@Branch (Diff with Main)` | Diff against main |
| `@Browser` | Built-in browser |

**Tag a file when you know it. Otherwise let the agent search.** Irrelevant `@` files dilute the prompt.

Images: drag in, or paste with `Cmd+V` / `Ctrl+V`.

Models: picker on the input, or `Cmd+/` / `Ctrl+/`. You can switch mid-thread. Catalog: [Models & Pricing](https://cursor.com/docs/models-and-pricing).

---

## Default workflow

```
Open the repo
  → New chat: “how does this repo work”
  → Write AGENTS.md / one rule (only what you already corrected twice)
  → Small edit: Tab or Cmd+K
  → Medium: Agent with an explicit check command and a do-not-touch list
  → Large: Plan → edit the plan → approve → implement → existing checks
  → Wrong turn: Restore Checkpoint, or refine the plan and rerun
  → PR: Bugbot or /review-bugbot
  → Away / parallel: Cloud Agents. Terminal / CI: `agent`
```

Be specific. Official contrast: “add tests for auth.ts” vs “write the logout edge case for `auth.ts` using patterns in `__tests__/`, no mocks.”

---

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| First prompt is “refactor the directory” | Explain, then one file, then Plan |
| Agent for three local lines | Tab or `Cmd+K` |
| Single `.cursorrules` as the only source of truth | `.cursor/rules/*.mdc` or `AGENTS.md` |
| Paste a whole component into a rule | Point at `src/components/Button.tsx` |
| Treat Bugbot as a runtime debugger | Debug Mode locally; Bugbot on the PR |
| Continue a long chat after changing topics | New chat + `@Chats` |
| Trust “tests passed” in the transcript | Re-run the command yourself |
| Agent in a folder with no git | `git init` or open a real repo |

Community signal (not an official guarantee): some users report Plan still writing code ([thread](https://forum.cursor.com/t/plan-mode-is-not-respected-by-the-agent/151802)). If that happens: Stop, Restore, and write “do not edit files until I reply APPROVE” into the plan.

---

## Next steps

1. [Cookbook](./cursor-cookbook) — bugs, features, Rules, Bugbot, Cloud, CLI, MCP
2. [Cheatsheet](./cursor-cheatsheet)
3. [Glossary](./cursor-glossary)
4. [Learning map](./) — Tab vs Agent vs Cloud vs Bugbot vs CLI
5. Official: [Quickstart](https://cursor.com/docs/get-started/quickstart), [Agent best practices](https://cursor.com/blog/agent-best-practices)
