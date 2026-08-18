---
title: MiniMax Code cheatsheet
description: Lookup only. Commands come from official pages and mcode --help. No unofficial package names.
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# MiniMax Code cheatsheet

Lookup only. Treat `mcode --help` and `mcode <command> --help` as the live CLI contract.

## Install

### Desktop

Source: [Download and Install](https://agent.minimax.io/docs/code/get-started/download)

| Item | Value |
|------|-------|
| International | [agent.minimax.io/download](https://agent.minimax.io/download) |
| Mainland China | [agent.minimaxi.com/download](https://agent.minimaxi.com/download) |
| macOS | 11 Big Sur or later; `.dmg` → Applications; Apple silicon arm64, Intel x64 |
| Windows | 10 or later; run the installer |
| Auth | MiniMax account |

### CLI

Source: [quick-start](https://agent.minimax.io/docs/cli/quick-start)

```bash
curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash
```

```powershell
irm https://filecdn.minimax.chat/public/install.ps1 | iex
```

```bash
mcode --version
mcode --help
mcode update
```

<!-- TODO: 待核实 —— no official npm package name. -->

## CLI commands

Source: [Features](https://agent.minimax.io/docs/cli/features)

| Command | Purpose |
|---------|---------|
| `mcode [prompt]` | Interactive TUI; optional first task |
| `mcode init [directory]` | Analyze the repo; create or update `AGENTS.md` |
| `mcode exec [prompt]` | One headless run |
| `mcode acp` | ACP stdio server |
| `mcode login` / `mcode logout` | Auth |
| `mcode login --region global` | Global account |
| `mcode provider` | Providers and API keys |
| `mcode plugin` | Agent plugins |
| `mcode update` | Update from the current install source |
| `mcode --continue` | Resume the latest session in this workspace |
| `mcode --session` | Session manager |

`mcode exec` flags: [cookbook](./minimax-code-cookbook.md).

## CLI keys and slash commands

Source: [quick-start](https://agent.minimax.io/docs/cli/quick-start)

| Key | Action |
|-----|--------|
| `Enter` | Send; extra messages queue |
| `Shift+Enter` | New line |
| `@` | Reference a file or directory |
| `Ctrl+V` | Paste an image or video file |
| `Shift+Tab` | Default ↔ Plan Mode |
| `Alt+M` | Ask / Auto / Full access |
| `Ctrl+O` | Expand or collapse Thinking, tool output, diffs |
| `Ctrl+T` | Expand or collapse the todo list |
| `PgUp` / `PgDn` / `End` | History / jump to latest |
| `Esc` | Close a panel or interrupt |

| Slash | Purpose |
|-------|---------|
| `/help` | Commands and shortcuts |
| `/status` | Account, model, runtime |
| `/model` | Pick a model |
| `/sessions [query]` | Sessions |
| `/context` | Context budget and sources |
| `/compact` | Compact the current thread |
| `/new` | New session in this project |
| `/init` | Create or update project instructions |
| `/quit` | Exit |
| `/plan` | Plan Mode ([FAQ](https://agent.minimax.io/docs/cli/faq)) |
| `/permission` | Permission mode (FAQ) |
| `/goal <goal>` | Pausable goal ([features](https://agent.minimax.io/docs/cli/features)) |
| `/update` | Update |

## Decision table

| Situation | Choose |
|-----------|--------|
| Edit a local repo; need diffs / terminal / browser | Desktop Coding mode |
| Care about the result, not the implementation | Desktop Work mode |
| Stay in the terminal | `mcode` |
| CI / scripts | `mcode exec` |
| ACP host such as Zed | `mcode acp` |
| Complex split-and-verify work | Agent Team |
| Only want M3 inside Claude Code | Open Platform guide, not this product |
| Web general agent | MiniMax Agent (#73) |

## Permission tiers

Desktop: confirm before risky actions. Keep a human on delete / overwrite / upload / send ([permissions](https://agent.minimax.io/docs/code/workflows/permissions)).

CLI TUI: `Ask` / `Auto` / `Full access` (`Alt+M`). Independent from Plan Mode.

`mcode exec --permission`: `ask` / `smart` / `full` / `off`.

## Usage (only numbers on an official page)

Source: [usage](https://agent.minimax.io/docs/code/account/usage) (checked 2026-08-19)

| Item | Official text |
|------|----------------|
| Daily check-in | 400 credits |
| Streak day 4 and day 7 | 1000 credits that day |
| Full week | 4000 credits total |
| Validity | 30 days after credit |

On 2026-08-19 the CN [download page](https://agent.minimaxi.com/download) showed Plus ¥49 / Max ¥119 / Ultra ¥469 per month. The [M3 post](https://www.minimax.io/blog/minimax-m3) Token Plan is Plus $20 / Max $50 / Ultra $120. Do not merge those tables.

<!-- TODO: 待核实 —— no official conversion between desktop plans and Token Plan quotas. -->

## Glossary index

One-line hooks. Definitions: [glossary](./minimax-code-glossary.md).

| Term | Hook |
|------|------|
| MiniMax Code | First-party coding agent; desktop + `mcode` |
| MiniMax Agent | Web general agent; not this product |
| `mcode` | CLI executable |
| Coding / Work | Desktop modes |
| Plan Mode | CLI: plan first or act now |
| Ask / Auto / Full access | CLI permission tiers |
| Agent Team | Multi-agent split |
| Token Plan | Open Platform subscription; usable with Code |

## Sources

Method: repo [`sources/_template.md`](https://github.com/zenHeart/learn-ai/blob/master/.claude/skills/doc-research/references/sources/_template.md). Last systematic check: 2026-08-19.

### Official docs

| URL | Use |
|-----|-----|
| [agent.minimax.io/docs/code/welcome](https://agent.minimax.io/docs/code/welcome) | Desktop definition |
| [agent.minimax.io/docs/code/get-started/download](https://agent.minimax.io/docs/code/get-started/download) | Desktop install |
| [agent.minimax.io/docs/code/get-started/first-task](https://agent.minimax.io/docs/code/get-started/first-task) | First task |
| [agent.minimax.io/docs/code/workflows/modes](https://agent.minimax.io/docs/code/workflows/modes) | Coding / Work |
| [agent.minimax.io/docs/code/workflows/workspace](https://agent.minimax.io/docs/code/workflows/workspace) | Workspace |
| [agent.minimax.io/docs/code/workflows/permissions](https://agent.minimax.io/docs/code/workflows/permissions) | Desktop permissions |
| [agent.minimax.io/docs/code/agents/team](https://agent.minimax.io/docs/code/agents/team) | Agent Team |
| [agent.minimax.io/docs/code/account/usage](https://agent.minimax.io/docs/code/account/usage) | Usage and check-in |
| [agent.minimax.io/docs/code/account/minimax-api](https://agent.minimax.io/docs/code/account/minimax-api) | Your MiniMax key |
| [agent.minimax.io/docs/cli/quick-start](https://agent.minimax.io/docs/cli/quick-start) | CLI install |
| [agent.minimax.io/docs/cli/features](https://agent.minimax.io/docs/cli/features) | TUI / exec / acp |
| [agent.minimax.io/docs/cli/faq](https://agent.minimax.io/docs/cli/faq) | CLI troubleshooting |
| [agent.minimax.io/docs/changelog](https://agent.minimax.io/docs/changelog) | Desktop changelog (includes rename) |
| [agent.minimax.io/docs/llms.txt](https://agent.minimax.io/docs/llms.txt) | Desktop tree (2026-08-19 **omits** CLI) |
| [platform.minimax.io/docs/guides/models-intro](https://platform.minimax.io/docs/guides/models-intro) | Models |
| [platform.minimax.io/docs/guides/text-ai-coding-tools](https://platform.minimax.io/docs/guides/text-ai-coding-tools) | Third-party tools + M3 |

CN hosts: `agent.minimaxi.com`, `platform.minimaxi.com`.

### Product homes

| URL | Use |
|-----|-----|
| [minimax.io](https://www.minimax.io/) | International first-level products |
| [minimaxi.com](https://www.minimaxi.com/) | CN homepage |
| [minimaxi.com/about](https://www.minimaxi.com/about) | CN family wording (still Hub / 星野) |
| [agent.minimax.io/download](https://agent.minimax.io/download) | Desktop download |
| [design.minimax.io](https://design.minimax.io/) | MiniMax Design |
| [hailuoai.video](https://hailuoai.video/) | Hailuo |
| [xingyeai.com](https://www.xingyeai.com/) | 星野 |
| [minimax.io/blog/minimax-m3](https://www.minimax.io/blog/minimax-m3) | Code + Token Plan claims |

### Shortcuts for maintainers

| Trick | Note |
|-------|------|
| Append `.md` | Mintlify markdown mirrors |
| `docs/llms.txt` | Desktop only; also open `/docs/cli/quick-start` |
| `/status` and `mcode --version` | Trust the machine, not a pinned tutorial version |

## Related pages

- [Learning map](./index.md)
- [Tutorial](./minimax-code.md)
- [Cookbook](./minimax-code-cookbook.md)
- [Glossary](./minimax-code-glossary.md)
