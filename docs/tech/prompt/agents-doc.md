---
title: Write AGENTS.md for the repo
description: "AGENTS.md is a README for coding agents. Put install, test, and conventions in the repo instead of repeating them in chat."
domain: tech
tags:
  - prompt
navOrder: 30
llm:
  - 15
prev:
  text: How to write prompts
  link: /tech/prompt/
next:
  text: Agent engineering
  link: /tech/prompt/agent-engineering-practices
---

# Write AGENTS.md for the repo

**Bottom line:** rules you repeat in every chat belong in `AGENTS.md` at the repo root. It is a README for coding agents, not a second human contributing guide.

The format is defined at [agents.md](https://agents.md/), now stewarded by the Agentic AI Foundation under the Linux Foundation. Cursor, Codex, GitHub Copilot, Gemini CLI, Claude Code, and others read it.

## Audience and non-goals

| | |
|---|---|
| **Prerequisites** | You can already write a task / constraints / output prompt from [How to write prompts](/tech/prompt/) |
| **You will be able to** | Land an `AGENTS.md` that an assistant will actually execute |
| **Not this page** | A full product tour → [Products](/products/). Multi-agent orchestration → [Agents](/tech/patterns/agent/) |

## What problem it solves

`README.md` is for humans: what the project is, how to run it, how to contribute.

`AGENTS.md` is for assistants: which package manager, how to test, which directories are off-limits, which checks must be green. That text makes a README too long. Leaving it unwritten makes every assistant guess.

There are no required fields. It is ordinary Markdown. On conflict: **the nearest `AGENTS.md` to the file being edited wins**. The current user chat overrides everything.

## Minimal template

Copy this to the repo root and replace the commands. This site itself uses the same rule: `pnpm` at the root, never `npm install` there.

```md
# AGENTS.md

## Setup commands

- Install: `pnpm install` (repo root only)
- Do not run `npm install` at the root
- Docs: `pnpm docs:dev`
- Build: `pnpm docs:build`

## Code style

- ES modules only (`import` / `export`)
- The root package has `"type": "module"`

## Testing instructions

- Run `pnpm docs:build` before you commit
- Also run `pnpm ppt:build` if you touched slides
- Do not claim the site is fine after editing one page: sidebar links must resolve to real `.md` files

## Security

- Do not write tokens, local MCP config, or home-directory paths into docs
- Mark unverified command names, flags, and URLs instead of inventing them
```

The official site recommends covering how to run, how to test, style, and security. Add commit / PR / deploy notes when the team actually needs them.

## Working rules

1. **Commands must be real.** Run `pnpm docs:build` once before you write it down. Agents will execute the checks you list.
2. **Write actions, not a persona.** "You are a world-class engineer" adds almost nothing. The package manager and the forbidden commands do.
3. **Nest files in a monorepo.** Official example: the main OpenAI repo had 88 `AGENTS.md` files at the time of writing. Closest file wins.
4. **Do not duplicate the README.** Keep the human quick start in README. Put the long assistant contract here.
5. **Migrate old names** with `mv AGENT.md AGENTS.md && ln -s AGENTS.md AGENT.md`.

Gemini CLI can pin the filename in `.gemini/settings.json`:

```json
{ "context": { "fileName": "AGENTS.md" } }
```

Aider uses `read: AGENTS.md` in `.aider.conf.yml`. Newer tools look at the root file by default.

## How tools read it

| Tool | Default file | Also see |
|---|---|---|
| Cursor | Root / nested `AGENTS.md` | `.cursor/rules`, [Cursor](/products/cursor/) |
| Claude Code | `AGENTS.md` + `CLAUDE.md` | [Claude Code](/products/claude/claude-code) |
| Codex | `AGENTS.md` | [Codex](/products/codex/) |
| Copilot Coding Agent | `AGENTS.md` | [Copilot](/products/copilot/) |

This repo's own sample is the root `AGENTS.md` plus `Claude.md`. Open those instead of inventing a persona.

## Bad vs good

**Bad:** a long persona and a fake command (`npm test` at this repo root).

**Good:** real commands and bans (`pnpm` only, `pnpm docs:build`, no tokens in docs).

## Common pitfalls

- **A second README** that restates the pitch and skips install / test commands.
- **Fake commands**, such as `npm test` in a `pnpm` repo.
- **Replacing the product page.** Cursor rules and `CLAUDE.md` still live in those products. `AGENTS.md` is the cross-tool minimum.
- **Expecting it to replace the current task.** "Fix the contrast on Settings" still belongs in the chat.

## Next

- [Agent engineering practices](/tech/prompt/agent-engineering-practices)
- [Context for agents](/tech/prompt/context-agent-engineering)
- [Skills](/tech/patterns/agent/skills)

## Go deeper

- Format and examples: [agents.md](https://agents.md/)
- Search GitHub for `filename:AGENTS.md` (the official site cites 60k+ projects)
- This repo's root `AGENTS.md` / `Claude.md` as a live sample
