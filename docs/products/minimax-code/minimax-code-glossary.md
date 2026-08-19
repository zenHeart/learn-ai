---
title: MiniMax Code glossary
description: No procedures. Separate Code, Agent, Hailuo, and Talkie, then desktop, CLI, and the two mode axes.
domain: product
tags:
  - coding-agent
role: glossary
---

# MiniMax Code glossary

No procedures. These names collide. Pick a door on the [learning map](./index.md).

## Everything named MiniMax

| Name | What it is | Where |
|------|------------|-------|
| **MiniMax Code** | First-party coding agent. Desktop app + CLI `mcode` | [welcome](https://agent.minimax.io/docs/code/welcome), [download](https://agent.minimax.io/download), [CLI](https://agent.minimax.io/docs/cli/quick-start) |
| MiniMax Agent | Web general agent. Desktop was renamed to Code; the web product is still Agent | [agent.minimax.io](https://agent.minimax.io/), site issue #73 |
| MiniMax Design | Commercial content agent platform | [design.minimax.io](https://design.minimax.io/) |
| MiniMax Hub | Name still used on the CN About nav | [about](https://www.minimaxi.com/about). Same family as Design; no second tutorial |
| MiniMax Audio | Speech and music | [minimax.io/audio](https://www.minimax.io/audio) |
| Hailuo / MiniMax H3 | Video brand and model | [hailuoai.video](https://hailuoai.video/) |
| Talkie | International character product on the Product nav | [minimax.io](https://www.minimax.io/) |
| 星野 (Xingye) | CN character community | [xingyeai.com](https://www.xingyeai.com/) |
| MiniMax M3 | Coding / agentic model, 1M context | [models-intro](https://platform.minimax.io/docs/guides/models-intro) |
| Token Plan | Open Platform subscription | [platform](https://platform.minimax.io/) |
| AI coding tools guide | Point M3 at Claude Code / Cursor | [text-ai-coding-tools](https://platform.minimax.io/docs/guides/text-ai-coding-tools) |

**Do not write as fact:**

- MiniMax Code is "just the M3 API wrapper".
- The CLI command is `minimax`. Official CLI command is `mcode`. Changelog v3.0.33's "minimax CLI shortcut" has no standalone flag page.
- An official npm package name. None found on 2026-08-19.
- GitHub `MiniMax-AI/Mini-Agent` is MiniMax Code.
- An official VS Code plugin. Official editor integration is ACP plus a Zed example.

## One product, two faces

Official: "MiniMax Code CLI is the terminal entry for MiniMax Code developer workflows. It complements the desktop client."

| Face | Entry | Typical use |
|------|-------|-------------|
| Desktop | Downloadable installer | Graphical tasks, browser, schedules, Remote Control |
| CLI TUI | `mcode` | Humans editing a repo in a terminal |
| CLI Headless | `mcode exec` | CI and scripts |
| CLI ACP | `mcode acp` | Embed in an editor |

The CLI does **not** depend on desktop Electron / IPC. Do not assume Browser or Computer Use exist in the CLI.

## Two orthogonal mode axes

Desktop **Coding / Work**: same agent, different tool exposure. Use Coding to change a repo.

CLI **Plan Mode**: plan the next message or act now. `Shift+Tab` / `/plan`.

CLI **permission mode**: whether tools ask you. `Alt+M` / `/permission` → Ask / Auto / Full access.

`mcode exec --permission` uses `ask` / `smart` / `full` / `off`. That is not the same enum as the TUI labels.

## Agent Team

Official: extra specialist agents appear when the task is complex. You describe the goal; the product splits, assigns, tracks, and summarizes.

This is a MiniMax Code capability, not a separate product, and not the web MiniMax Agent.

## Workspace, skills, memory

- **Workspace**: a local project directory. The agent reads, runs commands, and reports changes there.
- **Skills**: reusable workflows. The first-task page says you can invoke them with `/`.
- **Memory**: preferences, project conventions, long-term patterns (standalone desktop docs page).
- **`AGENTS.md`**: project instructions that `mcode init` creates or updates.

## Accounts and quotas

Sign in with a MiniMax account on the desktop or via `mcode login`. Your own MiniMax API key goes through in-product settings or `mcode provider`.

Token Plan is an Open Platform subscription. The M3 post says Code can use Token Plan. Do not treat desktop Plus / Max / Ultra list prices and Token Plan USD tiers as one price list. Usage page: follow the in-product display.
