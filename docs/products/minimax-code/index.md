---
title: MiniMax Code learning map
description: MiniMax Code is MiniMax's first-party coding agent. This directory covers Code only. Agent, Hailuo, and Talkie stay as one-line map entries.
domain: product
tags:
  - coding-agent
role: map
---

# MiniMax Code learning map

> **MiniMax Code** is MiniMax's first-party coding agent. The international homepage calls it "The coding harness built for MiniMax models" ([minimax.io](https://www.minimax.io/)). The product docs say: "MiniMax Code is a desktop AI Agent app that brings chat, project context, file operations, terminal sessions, browser previews, skills, memory, and automation into one local workspace" ([Welcome](https://agent.minimax.io/docs/code/welcome)).
>
> The same product also ships as **MiniMax Code CLI**. The executable is `mcode` ([CLI Quick Start](https://agent.minimax.io/docs/cli/quick-start)). That is not a second product.

## Product family (Retrieve)

List official first-level entries first, then decide what this site writes. Every row comes from the homepage nav, About, footer, or docs index opened on 2026-08-19.

| Official first-level entry | Official URL | This site |
|----------------------------|--------------|-----------|
| **MiniMax Code** | [Welcome](https://agent.minimax.io/docs/code/welcome), [Download](https://agent.minimax.io/download), [CLI](https://agent.minimax.io/docs/cli/quick-start) | **Standalone pages** (this directory) |
| MiniMax Agent | [agent.minimax.io](https://agent.minimax.io/) / [agent.minimaxi.com](https://agent.minimaxi.com/) | One map line. Web general agent; full write-up is [#73](https://github.com/zenHeart/learn-ai/issues/73) |
| MiniMax Design | [design.minimax.io](https://design.minimax.io/) | One map line. Commercial content, not a coding agent |
| MiniMax Hub | Still used on the CN About nav ([about](https://www.minimaxi.com/about)) | One map line. Name collision with Design; no second tutorial |
| MiniMax Audio | [minimax.io/audio](https://www.minimax.io/audio) | One map line. Speech and music |
| Hailuo / MiniMax H3 | [hailuoai.video](https://hailuoai.video/), [models intro](https://platform.minimax.io/docs/guides/models-intro) | One map line. Video generation |
| Talkie | International Product nav ([minimax.io](https://www.minimax.io/)) | One map line. Character / companion app |
| 星野 (Xingye) | [xingyeai.com](https://www.xingyeai.com/) | One map line. CN counterpart of Talkie |
| MiniMax M3 and other models | [models-intro](https://platform.minimax.io/docs/guides/models-intro) | One map line. Models are not a product tutorial |
| Token Plan / API | [platform.minimax.io](https://platform.minimax.io/) | One map line. Developer platform |
| Use MiniMax in AI coding tools | [text-ai-coding-tools](https://platform.minimax.io/docs/guides/text-ai-coding-tools) (CN twin: [minimaxi.com](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools)) | One map line. Point M3 at Claude Code / Cursor. **Not** MiniMax Code |

Sources: [minimax.io](https://www.minimax.io/), [minimaxi.com](https://www.minimaxi.com/), [minimaxi.com/about](https://www.minimaxi.com/about), [agent.minimax.io/docs/llms.txt](https://agent.minimax.io/docs/llms.txt), [models-intro](https://platform.minimax.io/docs/guides/models-intro).

**This directory's job:** MiniMax Code only. Other MiniMax AI products do not get full tutorials here.

**Names that collide:**

- **MiniMax Code ≠ MiniMax Agent.** Changelog v3.0.33 renamed the desktop app to MiniMax Code. The web product is still Agent. The docs site is still branded "MiniMax Agent Docs".
- **`mcode` ≠ the `minimax` shortcut in that changelog.** The official CLI command is `mcode`.
- **Putting MiniMax-M3 inside Claude Code ≠ installing MiniMax Code.**
- **Coding / Work are desktop modes, not products.**

See the [glossary](./minimax-code-glossary.md).

### Decision tree

```
What do you need?
├── Edit a local repo / fix bugs / inspect diffs / run commands
│   └── → MiniMax Code
│       ├── GUI, browser preview, schedules, phone remote?
│       │     → Desktop app (download page)
│       ├── Terminal TUI / scripts / CI / editor ACP?
│       │     → CLI (`mcode`)
│       └── Split work across specialist agents?
│             → Agent Team inside the same product
├── Long-horizon work in the browser, not necessarily a local repo
│   └── → MiniMax Agent (#73; not this directory)
├── Keep Claude Code / Cursor and only swap in MiniMax-M3
│   └── → Open Platform "AI coding tools" guide, not this product
├── Video
│   └── → Hailuo / MiniMax H3 / MiniMax Design
├── Speech / music
│   └── → MiniMax Audio
└── Character chat
    └── → Talkie (intl) or 星野 (CN)
```

## Two surfaces

Official CLI docs: the desktop client is for "graphical task management and result review"; the CLI is closer to "repositories, the terminal, scripts, CI, and editors" ([Features](https://agent.minimax.io/docs/cli/features)).

| Surface | Entry | Use when |
|---------|-------|----------|
| Desktop | [International download](https://agent.minimax.io/download) / [CN download](https://agent.minimaxi.com/download) | Tasks, workspace, browser, schedules, Remote Control |
| CLI · TUI | `mcode` | Ongoing repo work in a terminal |
| CLI · Headless | `mcode exec` | Scripts and CI |
| CLI · ACP | `mcode acp` | Embed in an ACP host such as Zed |

The desktop app also has Coding / Work **modes** (same agent, different tool exposure). See the [tutorial](./minimax-code.md).

## When it is worth trying

**Try it if**

- You want a first-party agent, not just another model plugged into a third-party tool.
- You want one desktop workspace for the repo, terminal, browser, skills, and memory.
- You want `mcode` in the terminal: TUI, `exec`, ACP.
- You already have a MiniMax account or a Token Plan. The M3 post says: "MiniMax Code can be used with MiniMax Token Plans."

**Wait if**

- You only want MiniMax-M3 inside Claude Code / Cursor — use the [Open Platform guide](https://platform.minimax.io/docs/guides/text-ai-coding-tools).
- You want the web general agent — that is MiniMax Agent (#73).
- You want video or character chat — Hailuo / Talkie, not Code.
- You need a Linux desktop client — official desktop docs list macOS and Windows only. The CLI supports macOS, Windows, common Linux distros, and WSL. Alpine / musl is not supported.

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Install | [Tutorial](./minimax-code.md) desktop or CLI install | Send the first task after sign-in |
| 2. Modes and workspace | Tutorial: Coding / Work, workspace, permissions | Let it edit local code |
| 3. Workflows | [Cookbook](./minimax-code-cookbook.md) | Agent Team, `mcode exec`, ACP |
| 4. Look up | [Cheatsheet](./minimax-code-cheatsheet.md) | Commands, slash, permission tiers, official links |
| 5. Names | [Glossary](./minimax-code-glossary.md) | Code vs Agent, desktop vs CLI, orthogonal modes |

## Feature index

Only capabilities that have official doc pages.

| Capability | One line | Official page |
|------------|----------|---------------|
| Coding / Work | Same agent, different tool exposure | [modes](https://agent.minimax.io/docs/code/workflows/modes) |
| Workspace | Attach a local project directory | [workspace](https://agent.minimax.io/docs/code/workflows/workspace) |
| Permissions | Confirm file, command, and external actions | [permissions](https://agent.minimax.io/docs/code/workflows/permissions) |
| Agent Team | Split complex work across specialist agents | [team](https://agent.minimax.io/docs/code/agents/team) |
| Skills / memory / custom agents | Reuse workflows and keep preferences | [llms.txt desktop tree](https://agent.minimax.io/docs/llms.txt) |
| Schedules / Remote Control / IM | Recurring jobs, phone remote, chat apps | Desktop `/docs/code/automation/*` |
| CLI TUI / exec / acp | Terminal, scripts, editors | [features](https://agent.minimax.io/docs/cli/features) |
| Token Plan and check-in credits | See in-product usage | [usage](https://agent.minimax.io/docs/code/account/usage) |

Model internals (MSA, training, benchmarks) stay out of this directory. See [Learn LLM](/tech/fundamentals/LLM) and the [M3 post](https://www.minimax.io/blog/minimax-m3).
