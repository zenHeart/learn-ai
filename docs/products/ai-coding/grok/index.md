# Grok Learning Map

> **Grok Build** is xAI's first-party terminal coding agent. The executable is named `grok`, and the source is open at [xai-org/grok-build](https://github.com/xai-org/grok-build).
>
> Official definition ([docs.x.ai/build/overview](https://docs.x.ai/build/overview)):
> "**Grok Build** is a powerful and extensible coding agent. Use it via an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps."

## Product landscape

Several xAI products share the word "Grok" or "Build". They are **not** one product with four skins. The set of pages under this directory is about **Grok Build** (the terminal coding agent). The other official surfaces belong in the decision tree so you do not pick the wrong door.

```
xAI / Grok family
├── Grok (chat) — grok.com, iOS, Android, and X
│   ├── Chat / search / voice / file upload
│   ├── Imagine — images and video (also grok.com/imagine)
│   └── Build Mode — chat-native sites / apps / games, publish to grok.me
├── Grok Build — terminal coding agent (the `grok` command)
│   ├── Interactive TUI
│   ├── Headless (`grok -p`)
│   └── ACP (`grok agent stdio`)
├── Grok Bot — named teammates on a persistent cloud computer
└── xAI API — model HTTP API, including the Imagine API
```

| Product | What it is | Entry point | Analog in the Claude family |
|---------|-----------|-------------|-----------------------------|
| **Grok Build** | Terminal coding agent for a real repo | the `grok` command | Claude Code CLI |
| Grok (chat) | General-purpose assistant | [grok.com](https://grok.com), Grok apps, X | Claude.ai |
| Imagine | Image and video generation / editing | [grok.com/imagine](https://grok.com/imagine), or the [Imagine API](https://docs.x.ai/developers/model-capabilities/imagine) | Claude Design (creative surface, not a coding agent) |
| Build Mode | Chat-native builder; publish a live link | Mode switcher **Build** on grok.com / Grok apps | Claude.ai Artifacts-style creation, **not** Claude Code |
| Grok Bot | Always-on teammates on a shared cloud VM | [x.ai/bot](https://x.ai/bot) desktop + iOS apps | Cowork (task agent, not a repo CLI) |
| xAI API | Model / Imagine / Voice HTTP API | [docs.x.ai/developers/quickstart](https://docs.x.ai/developers/quickstart) | Anthropic API |

**Names that collide:**

- **Grok Build** ≠ **Build Mode**. Grok Build is the terminal agent (`docs.x.ai/build/*`). Build Mode is a grok.com chat mode that writes a working preview in the conversation and publishes it ([x.ai/news/grok-build-mode](https://x.ai/news/grok-build-mode)).
- **grok.me** is the **publish host** for Build Mode ("Publish to a grok.me link or a custom domain you own"). It is not a separate product and not the Grok Build CLI.
- **Grok Bot** ≠ Grok Build headless "bots". Grok Bot is a desktop / iOS product with its own docs tree at [docs.x.ai/grok-bot](https://docs.x.ai/grok-bot/overview).
- There is **no official IDE plugin**. Editor use of Grok Build is ACP (`grok agent stdio`). [terminal-support](https://docs.x.ai/build/cli/terminal-support) only documents key-binding differences inside VS Code / Cursor / Windsurf / Zed terminals.

Accounts are **not** one pool. Grok Build accepts a SuperGrok / X Premium Plus login or `XAI_API_KEY`. Grok Bot authenticates with a **Cursor** account and is gated to SuperGrok Heavy, Cursor Ultra, and Cursor Teams Premium ([get-started](https://docs.x.ai/grok-bot/get-started)). Build Mode's Early Beta is SuperGrok Heavy only.

### Quick decision: which surface?

```
What do I want to do?
├── Write / debug / refactor / open a PR in a real repository
│   └── → Grok Build (`grok`)
│       ├── In the terminal? → TUI (`grok`)
│       ├── In CI / scripts? → headless (`grok -p`)
│       └── Inside an editor? → ACP (`grok agent stdio`) — no official VS Code plugin
├── Chat / write / research / voice / upload files
│   └── → grok.com or the Grok iOS / Android apps
├── Generate or edit images / video
│   └── → Imagine
│       ├── In the product? → grok.com/imagine (also inside grok.com chat)
│       └── From my own app? → Imagine API
├── Build a website / app / game in chat and share a link
│   └── → Build Mode (grok.com mode switcher → Build)
│       └── SuperGrok Heavy Early Beta; publish to grok.me or a custom domain
├── Hand real work to a teammate that keeps going when the laptop is closed
│   └── → Grok Bot (desktop + iOS)
│       └── SuperGrok Heavy / Cursor Ultra / Cursor Teams Premium
└── Call models from my own software
    └── → xAI API
```

Sources: [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview), [docs.x.ai/build/overview](https://docs.x.ai/build/overview), [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview), [x.ai/grok](https://x.ai/grok), [x.ai/grok/build-mode](https://x.ai/grok/build-mode), [x.ai/news/grok-build-mode](https://x.ai/news/grok-build-mode), [docs.x.ai/developers/model-capabilities/imagine](https://docs.x.ai/developers/model-capabilities/imagine), [x.ai/bot](https://x.ai/bot).

## Three Grok Build surfaces

| Surface | Entry point | Where it fits |
|---------|-------------|---------------|
| Interactive TUI | `grok` | Day-to-day development, full-screen terminal UI |
| Headless | `grok -p "<prompt>"` | Scripts, CI, batch jobs |
| ACP | `grok agent stdio` | Embedded by editors or your own orchestrator (JSON-RPC over stdin/stdout) |

Sources: [docs.x.ai/build/overview](https://docs.x.ai/build/overview), [docs.x.ai/build/cli/reference](https://docs.x.ai/build/cli/reference)

## When Grok Build is worth trying

**Try it when**

- You already use Claude Code and want a cheap side-by-side comparison. xAI explicitly claims zero-configuration compatibility (it reads `CLAUDE.md` and `.claude/settings.json`, accepts Claude Code flag aliases, and `grok import` pulls in Claude Code sessions), so migration cost is close to zero.
- You need long-running orchestration in the terminal: background tasks, scheduled loops, parallel subagents, and worktree isolation are all built in.
- You already subscribe to SuperGrok or X Premium Plus (the [launch announcement](https://x.ai/news/grok-build-cli) says: Available now to all SuperGrok and X Premium Plus subscribers), or you have an `XAI_API_KEY`.

**Hold off when**

- You want inline IDE completion — Grok Build is a terminal agent with no completion feature and no official IDE plugin.
- You need a teammate that keeps working after you close the laptop — that is [Grok Bot](./grok-bot.md), not Grok Build.
- You want a no-install chat builder that publishes a `*.grok.me` link — that is Build Mode on grok.com, SuperGrok Heavy Early Beta.
- You need a stable long-term surface — Grok Build is still beta. npm `@xai-official/grok` moved `latest` from 1.0.3 (2026-08-12) to 1.0.5 (2026-08-16); commands and config keys are still moving. Check `grok version` and the [changelog](https://x.ai/build/changelog) before pinning anything.

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
- [Grok Bot](./grok-bot.md) — cloud-computer teammates (not the CLI)
- [AI coding tools overview](../index.md)
