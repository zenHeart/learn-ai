# Grok Learning Map

> **Grok Build** is xAI's first-party terminal coding agent. The executable is named `grok`, and the source is open at [xai-org/grok-build](https://github.com/xai-org/grok-build).
>
> Official definition ([docs.x.ai/build/overview](https://docs.x.ai/build/overview)):
> "**Grok Build** is a powerful and extensible coding agent. Use it via an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps."

## Tell the products apart in one minute

Several xAI products share the "Grok" name. Sort them out first:

| Product | What it is | Entry point |
|---------|-----------|-------------|
| **Grok Build** | Terminal coding agent (the subject of these docs) | the `grok` command |
| Grok (chat) | General-purpose conversational product | [grok.com](https://grok.com), built into X |
| xAI API | Model API (`grok-4.6` and others) | [api.x.ai](https://docs.x.ai/developers/quickstart) |

All three share the same account and models, but **only Grok Build is a coding tool**. There is no official IDE plugin — to use it inside an editor you go through the ACP protocol (see below).

## Three surfaces

| Surface | Entry point | Where it fits |
|---------|-------------|---------------|
| Interactive TUI | `grok` | Day-to-day development, full-screen terminal UI |
| Headless | `grok -p "<prompt>"` | Scripts, CI, batch jobs |
| ACP | `grok agent stdio` | Embedded by editors or your own orchestrator (JSON-RPC over stdin/stdout) |

Sources: [docs.x.ai/build/overview](https://docs.x.ai/build/overview), [docs.x.ai/build/cli/reference](https://docs.x.ai/build/cli/reference)

## Quick decision

**When it is worth trying**

- You already use Claude Code and want a cheap side-by-side comparison. xAI explicitly claims zero-configuration compatibility (it reads `CLAUDE.md` and `.claude/settings.json`, accepts Claude Code flag aliases, and `grok import` pulls in Claude Code sessions), so migration cost is close to zero.
- You need long-running orchestration in the terminal: background tasks, scheduled loops, parallel subagents, and worktree isolation are all built in.
- You already subscribe to SuperGrok or X Premium Plus (the [launch announcement](https://x.ai/news/grok-build-cli) says: Available now to all SuperGrok and X Premium Plus subscribers), or you have an `XAI_API_KEY`.

**When to hold off**

- You want inline IDE completion — Grok Build is a terminal agent with no completion feature and no official IDE plugin.
- You need a stable long-term surface — it is still beta. npm `@xai-official/grok` moved `latest` from 1.0.3 (2026-08-12) to 1.0.5 (2026-08-16); commands and config keys are still moving. Check `grok version` and the [changelog](https://x.ai/build/changelog) before pinning anything.

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Get it running | Install and auth in the [Grok Build tutorial](./grok-cli.md) | First conversation within 15 minutes |
| 2. Learn the core | TUI / plan mode / permissions in the [tutorial](./grok-cli.md) | Confident enough to let it edit code |
| 3. Wire it into your workflow | [Cookbook](./grok-cookbook.md) | headless, CI, hooks, MCP, subagents |
| 4. Look up parameters | [Cheatsheet](./grok-cheatsheet.md) | Commands, flags, config keys, env vars, pricing |
| 5. Understand the concepts | [Glossary](./grok-glossary.md) | Permission mode vs. sandbox, skill vs. plugin, memory vs. session |

## Feature index

Only capabilities that have an official documentation page are listed. Each row links to the primary source.

| Capability | In one line | Official docs |
|------------|-------------|---------------|
| Plan mode | Draft a plan, get approval, then act | [plan-mode](https://docs.x.ai/build/features/plan-mode) |
| Permission rules | `allow` / `ask` / `deny` rules matched against tool calls | [permissions](https://docs.x.ai/build/features/permissions) |
| Sandbox | OS-level isolation via Landlock / Seatbelt, five profiles | [sandbox](https://docs.x.ai/build/features/sandbox) |
| Project rules | Reads `AGENTS.md`, and also `CLAUDE.md` / `.cursor/rules` | [project-rules](https://docs.x.ai/build/features/project-rules) |
| Skills | `SKILL.md` defines reusable capability, callable as `/<name>` | [skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) |
| Plugins / Marketplace | Package skills + commands + agents + hooks + MCP for distribution | [skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) |
| Hooks | Lifecycle events trigger external commands; can block tool calls | [hooks](https://docs.x.ai/build/features/hooks) |
| MCP | `grok mcp add`; tools are namespaced as `<server>__<tool>` | [mcp-servers](https://docs.x.ai/build/features/mcp-servers) |
| Subagents / Personas | Built-in `general-purpose` / `explore` / `plan`, plus custom types | [subagents](https://docs.x.ai/build/features/subagents) |
| Sessions | Indexed by working directory; resume / fork / rewind / compact | [sessions](https://docs.x.ai/build/features/sessions) |
| Worktrees | Work in an isolated checkout under `~/.grok/worktrees/` | [worktrees](https://docs.x.ai/build/features/worktrees) |
| Background tasks | Task panel plus `/loop` scheduled repeats | [background-tasks](https://docs.x.ai/build/features/background-tasks) |
| Dashboard | Multi-session status overview | [dashboard](https://docs.x.ai/build/features/dashboard) |
| Headless | `-p` for one-shot prompts, `--output-format` for JSON | [headless-scripting](https://docs.x.ai/build/cli/headless-scripting) |
| ACP | `grok agent stdio` runs as an ACP agent for a host app | [headless-scripting](https://docs.x.ai/build/cli/headless-scripting) |
| Enterprise policy | Five config layers, OIDC, MDM-managed policy | [enterprise](https://docs.x.ai/build/enterprise) |
| Theming | Built-in GrokNight / GrokDay and others, can follow the system | [theming](https://docs.x.ai/build/features/theming) |

## Model reference

| Model slug | Positioning (official wording) | Context |
|------------|-------------------------------|---------|
| `grok-4.6` | "For everything else, including code, use Grok 4.6. It is the most intelligent and fastest model we've built." | 500k |
| `grok-build-0.1` | "xAI's coding model, trained specifically for agentic coding workflows." | 256k |

The current banner on [x.ai/build](https://x.ai/build) reads "Meet Grok 4.6 • Now powering Grok Build", so the default driving model is `grok-4.6`. Pricing and limits are in the [cheatsheet](./grok-cheatsheet.md#models-and-pricing).

Sources: [developers/models](https://docs.x.ai/developers/models), [developers/release-notes](https://docs.x.ai/developers/release-notes)

## Resources

- Official CLI docs: <https://docs.x.ai/build/overview>
- Official API docs: <https://docs.x.ai/developers/quickstart>
- CLI changelog: <https://x.ai/build/changelog>
- Source repository: <https://github.com/xai-org/grok-build>
- Official plugin marketplace: <https://github.com/xai-org/plugin-marketplace>
- A fuller source list (with access notes) lives in the [cheatsheet's "High-quality sources" section](./grok-cheatsheet.md#high-quality-sources)

## Related pages

- [Grok Build tutorial](./grok-cli.md) — install, auth, TUI, headless, ACP
- [Cookbook](./grok-cookbook.md) — task-oriented recipes
- [Cheatsheet](./grok-cheatsheet.md) — commands / config / env vars / pricing / sources
- [Glossary](./grok-glossary.md) — what the concepts are and why
- [AI coding tools overview](../index.md)
