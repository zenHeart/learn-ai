# Codex Learning Guide

> Codex is OpenAI's coding agent. It runs in your terminal, in your editor, in the ChatGPT app, and in the cloud — all four surfaces reading the same configuration. This page is the map: what each page here is for, and the order that gets you productive fastest.
>
> Documentation lives at `learn.chatgpt.com/docs`. The older `developers.openai.com/codex/*` URLs now 308-redirect there, so bookmarks from earlier guides will still land in the right place.

## The four surfaces

```
Codex
├── CLI            — terminal, most flexible, the surface this guide centers on
├── IDE extension  — editor-embedded, inline diffs
├── ChatGPT app    — conversational, delegate a task and come back
└── Cloud          — runs in a hosted environment, several attempts in parallel
```

They are one product with one configuration model, not four tools that happen to share a name. What you learn about sandboxing, approval policy, and `AGENTS.md` in the CLI carries over.

## Which page do I want?

This guide is organized by what you are trying to do, not by feature area:

| You want to | Read | Type |
| --- | --- | --- |
| Install it and get a first task done | [Codex CLI](./codex-cli) | Tutorial |
| Understand the whole product line first | [Codex Product Line](./codex-ai) | Explanation |
| Know what your plan includes | [ChatGPT Plans and Codex Access](./chatgpt-plus) | Reference |
| Solve one specific task now | [Codex Cookbook](./codex-cookbook) | How-to |
| Wire Codex into a real project or CI | [Project Integration](./integration) | How-to |
| Understand *why* a concept exists | [Codex Glossary](./codex-glossary) | Explanation |
| Look up a flag or config key | [Codex Cheatsheet](./codex-cheatsheet) | Reference |

If you only read two, read [Codex CLI](./codex-cli) then bookmark the [Cheatsheet](./codex-cheatsheet).

## Learning path

### Stage 1 — Install and run something read-only

Install, sign in, and point Codex at a repository you already know with writes disabled. You get a feel for how it reasons before it can change anything.

```bash
npm install -g @openai/codex
codex login
codex --sandbox read-only "explain how this project is structured"
```

→ [Codex CLI](./codex-cli), steps 1-3

### Stage 2 — Get the permission model right

This is the stage people skip, and it is the reason Codex either gets abandoned as too intrusive or turned loose as too dangerous. Two settings decide everything:

- **`sandbox_mode`** — `read-only`, `workspace-write`, or `danger-full-access`. A hard boundary on what can be written.
- **`approval_policy`** — `untrusted`, `on-request`, `never`, or a granular table. When Codex stops to ask.

They are independent. "Never asks" and "cannot write outside the workspace" is a perfectly sensible combination, and it is the one that makes automated review work.

→ [Codex Glossary](./codex-glossary) for the model, [Codex CLI](./codex-cli) step 6 for the config

### Stage 3 — Write an AGENTS.md

`AGENTS.md` is a natural-language project briefing loaded on every run. Start with `/init` to generate a draft, then cut it down to the things only your team would know: the package manager, the verification command, the directory nobody should touch.

The failure mode to know about: combined instruction files are capped by `project_doc_max_bytes` (32 KiB default), and content past the cap is dropped silently.

→ [Codex CLI](./codex-cli) step 7, [Project Integration](./integration)

### Stage 4 — Work task-by-task

At this point stop reading linearly and use the [Cookbook](./codex-cookbook) as a lookup — refactors, test writing, code review, debugging, each as a recipe with the flags that make it behave.

### Stage 5 — Automate

`codex exec` is the same agent without a TUI: one shot, then exit. In CI, pair it with `--ask-for-approval never`, because there is nobody present to answer a prompt.

```bash
codex --ask-for-approval never exec --json \
  "run the test suite; if anything fails, fix it and re-run until green"
```

→ [Project Integration](./integration)

### Stage 6 — Extend it

MCP servers, hooks, skills, plugins, and subagents. Reach for these when you have a repeated workflow worth packaging — not before. Premature extension is a common way to end up with a configuration nobody understands.

→ [Codex Glossary](./codex-glossary), [Codex Cheatsheet](./codex-cheatsheet)

## Concepts you need early

| Concept | One line | Why it matters |
| --- | --- | --- |
| Sandbox | Hard boundary on file and network access | The difference between trusting the agent and supervising it |
| Approval policy | Whether Codex asks before acting | Wrong setting makes it unusable in either direction |
| Trust level | Whether project-level `.codex/` loads at all | Untrusted projects silently ignore their own config |
| `AGENTS.md` | Auto-loaded project briefing | Stops you re-explaining your conventions every session |
| Profile | Named config bundle, `--profile <name>` | One command to switch between review mode and build mode |
| `codex exec` | One-shot non-interactive run | The CI entry point |
| Compaction | Lossy compression of older context | Explains why long sessions degrade |

Full definitions are in the [Glossary](./codex-glossary).

## Codex among the alternatives

| If you want | Consider |
| --- | --- |
| A terminal agent inside the OpenAI ecosystem, on a ChatGPT plan | **Codex** |
| A terminal agent on an Anthropic plan | [Claude Code](../claude/) |
| An editor built around AI, with tab completion | [Cursor](../cursor) |
| Inline completion in an existing editor | [GitHub Copilot](../copilot) |

Codex is the natural pick if you already pay for ChatGPT Plus or above — access is included with the plan rather than purchased separately.

## Honest limits

- **Review the diff.** Codex is good at plausible code, which is not the same as correct code. Read the changes.
- **`danger-full-access` is named accurately.** Do not use it on code you have not read.
- **Search is cached by default.** For a fast-moving library, pass `--search` or you will get stale answers stated confidently.
- **Version-sensitive details drift.** Stable releases land roughly weekly. When this guide disagrees with `learn.chatgpt.com/docs`, the docs win.

## Official sources

| Source | Use it for |
| --- | --- |
| [Codex docs root](https://learn.chatgpt.com/docs) | Everything |
| [Quickstart](https://learn.chatgpt.com/docs/quickstart) | Install through first run |
| [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) | Every config key |
| [Pricing](https://learn.chatgpt.com/docs/pricing) | The only authority on plans and quotas |
| [Changelog](https://learn.chatgpt.com/docs/changelog) | What shipped |
| [openai/codex](https://github.com/openai/codex) | Source, releases, issues |

> The docs use a `?surface=cli|app|ide` selector. If a page seems to describe a different product, check which surface is active.
