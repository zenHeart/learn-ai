# GitHub Copilot Learning Map

> GitHub Copilot is a family of AI coding products that share one subscription, but differ in entry point, autonomy, and side-effect radius. This page is the landscape and decision tree — **name the surface first, then decide what to learn**.

## Product landscape

Official feature list: [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features). Assistive tools work **with you**; agentic tools can work **without you watching**.

```
GitHub Copilot
├── IDE — VS Code / Visual Studio / JetBrains / Xcode / Eclipse
│   ├── Inline suggestions (ghost text; next-edit suggestions in VS Code / Xcode / Eclipse)
│   └── Chat: Ask / Edit / Agent mode (Agent mode runs locally)
├── github.com — Web (maps to Claude's Web)
│   ├── Copilot Chat (https://github.com/copilot, or any repo / Issue / PR)
│   ├── Cloud agent — research / plan / branch / optional PR (paid plans)
│   ├── Code review
│   └── Pull request summaries
├── Copilot CLI — Terminal (maps to Claude's CLI)
│   ├── Interactive session (`copilot`)
│   └── Programmatic (`copilot -p "..."`)
├── Copilot app — Desktop (maps to Claude's Desktop)
│   └── Parallel agent sessions, Issues / PRs / scheduled automations
├── GitHub Mobile
└── GitHub Desktop — commit messages only
```

**Do not start these.** They are sunset or closing:

| Product | Status | What replaced it |
|---------|--------|------------------|
| **Copilot Workspace** | Sunset **2025-05-30** | Cloud agent |
| **GitHub App Copilot Extensions** | Sunset **2025-11-10** | MCP |
| **`gh copilot`** | Officially **retired** | Standalone `copilot` CLI |
| **GitHub Spark** | No new users / no new apps from **2026-08-04**; export existing apps by **2026-08-31** | Build in the IDE, CLI, or Copilot app |

Spark was a natural-language micro-app builder. Density is too low — and it is closing — so it is **not** a standalone page. If you already have a Spark, export the repo from the workbench (`…` → **Create repository**) before 2026-08-31. Official: [Spark deprecation](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/).

### Quick decision: which surface?

```
What am I doing right now?
├── Writing / completing / refactoring in an editor
│   └── → IDE
│       ├── Next line / boilerplate          → Code completion (Tab)
│       ├── I only want to understand        → Chat Ask
│       ├── I know which files               → Chat Edit
│       └── I give the goal, you own the process → Chat Agent (local, has side effects)
├── The work lives on the command line (scripts, git, build failures, no IDE)
│   └── → Copilot CLI
│       ├── Multi-turn                       → `copilot`
│       └── One-shot in a script             → `copilot -p "..."`
├── I am already on github.com (this repo / this Issue / this PR)
│   └── → github.com
│       ├── Ask about this repo              → Copilot Chat
│       ├── Well-scoped and slow, I will not watch → Cloud agent
│       └── Review this PR                   → Code review
└── Direct several agents in parallel and stay out of the IDE
    └── → Copilot app (desktop)
```

Three mix-ups to lock in now:

| Easy to confuse | Difference |
|-----------------|------------|
| Chat **Agent mode** vs **Cloud agent** | Agent mode runs on your machine. Cloud agent runs on GitHub (Actions-powered environment) and produces a branch / PR. [Official contrast](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent). |
| Standalone **`copilot` CLI** vs **`gh copilot`** | The former is a full agent and is **generally available**. The latter is **retired** (explain / suggest only). |
| **Copilot app** vs **IDE Chat** | The app is a desktop shell on top of Copilot CLI: parallel sessions, Issues / PRs, automations. IDE Chat stays inside the editor. |

More look-alikes live in the [Glossary](./copilot-glossary).

The mechanism that drives every later optimization: Copilot is **not** "we trained a model on your repo." It **retrieves and injects context on every request**. "Huge repo ⇒ Copilot knows it" is false. "Open the relevant files, then ask" is what works.

## Core concepts at a glance

See the [Glossary](./copilot-glossary) for full definitions.

| Concept | One-line explanation | Where it appears |
|---------|----------------------|------------------|
| **Four daily doors** | Completion, IDE Chat, CLI, Cloud agent | Every page |
| **Ask / Edit / Agent** | Three autonomy levels **inside IDE Chat** | IDE |
| **Cloud agent** | Background agent on GitHub; paid plans; admin must enable it on Business / Enterprise | github.com / Issue / VS Code |
| **Copilot CLI** | Terminal agent (`copilot`). Not `gh copilot` | Terminal |
| **Copilot app** | Desktop app for parallel agent sessions | Desktop |
| **Custom instructions** | Auto-attached project constraints | All surfaces |
| **Prompt files** | `/name` reusable tasks | IDE Chat |
| **MCP** | Open protocol to external tools. Replaced GitHub App Extensions | All agentic surfaces |
| **Plugins / Skills** | Installable packs of agents, skills, hooks | CLI / Chat / app |
| **Spaces** | Named context pack (repos + files + notes) | github.com / Chat |
| **AI credits** | Usage unit for Chat, CLI, agents, review | Billing |

## Which page to open

This set follows [Diataxis](https://diataxis.fr/). **Do not read the cheatsheet as a tutorial:**

| Page | Quadrant | Open it when |
|------|----------|--------------|
| [Getting started](./copilot) | Tutorial | First time: install → sign in → four daily doors → persist project conventions |
| [Cookbook](./copilot-cookbook) | How-to | You already know the basics and want a copy-paste recipe |
| [Cheatsheet](./copilot-cheatsheet) | Reference | Look up a keybinding, slash command, setting, CLI flag, or plan quota |
| [Glossary](./copilot-glossary) | Explanation | You hit an unknown term, or you suspect a blog post is stale |

## Learning path

### Stage 1: Make it work

**Goal**: install, sign in, and understand retrieval-based context.

| Step | Content | Link |
|------|---------|------|
| 1 | Pick a plan — there is a free tier | [Tutorial · Step 0](./copilot) |
| 2 | Install the IDE extension and sign in; install the CLI only if you need the terminal agent | [Tutorial · Step 1](./copilot) |
| 3 | Learn retrieval-based context injection — every later optimization depends on it | [Tutorial · Step 2](./copilot) |

### Stage 2: Pick the right door

**Goal**: stop paying the "wrong surface" tax.

| Step | Content | Link |
|------|---------|------|
| 4 | IDE vs github.com vs CLI vs cloud vs desktop | Decision tree above; [Tutorial · Step 3](./copilot) |
| 5 | Build muscle memory for Ask / Edit / Agent | [Glossary · three modes](./copilot-glossary) |
| 6 | Feed context with `@` and `#` | [Cheatsheet · chat participants](./copilot-cheatsheet) |

### Stage 3: Stop repeating yourself

**Goal**: write conventions once.

| Step | Content | Link |
|------|---------|------|
| 7 | Write `.github/copilot-instructions.md` | [Cookbook · project conventions](./copilot-cookbook) |
| 8 | Reuse prompt files for shaped tasks | [Cookbook · prompt files](./copilot-cookbook) |
| 9 | Attach MCP servers for databases and internal APIs | [Glossary · MCP](./copilot-glossary) |

### Stage 4: Scale and stay safe

**Goal**: delegate, then review.

| Step | Content | Link |
|------|---------|------|
| 10 | Delegate to Cloud agent; write a task description with hard edges | [Cookbook · Delegating to the cloud](./copilot-cookbook) |
| 11 | Review anything that touches auth, SQL string building, crypto, or payments | [Tutorial · Step 6](./copilot) |

## Feature quick reference

### Assistive (you stay in the loop)

| Feature | Purpose | Doc |
|---------|---------|-----|
| Inline suggestions | Next line / boilerplate; Tab to accept | [Tutorial](./copilot) |
| IDE Chat · Ask | Explain, compare, plan — never edits | [Glossary](./copilot-glossary) |
| IDE Chat · Edit | Diffs on files you name | [Cookbook](./copilot-cookbook) |
| Copilot Chat on github.com | Ask about a repo / Issue / PR without opening an IDE | [Ask questions in GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github) |
| PR summaries | AI summary of a pull request | [Create a PR summary](https://docs.github.com/en/copilot/how-tos/copilot-on-github/copilot-for-github-tasks/create-a-pr-summary) |
| GitHub Desktop | Commit message from the diff | [Features](https://docs.github.com/en/copilot/get-started/features) |

### Agentic (it can run without you watching)

| Feature | Purpose | Doc |
|---------|---------|-----|
| IDE Agent mode | Local multi-step edits + commands you approve | [Cookbook](./copilot-cookbook) |
| Copilot CLI | Terminal agent; interactive or `copilot -p` | [Cheatsheet · CLI](./copilot-cheatsheet) · [About CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) |
| Cloud agent | Research / plan / branch / optional PR on GitHub | [Cookbook](./copilot-cookbook) · [About cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) |
| Copilot app | Desktop: parallel sessions, Issues / PRs, automations | [About the Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) |
| Code review | AI review comments on a PR | [Code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) |

### Customization (cuts across every door)

| Feature | Purpose | Doc |
|---------|---------|-----|
| Custom instructions | Write once, attach every turn | [Cheatsheet](./copilot-cheatsheet) |
| Prompt files | `/name` reusable tasks | [Cookbook](./copilot-cookbook) |
| MCP | External tools and data | [Glossary](./copilot-glossary) |
| Skills / Plugins | Specialized packs | [Glossary](./copilot-glossary) |
| Spaces | Named context pack | [Glossary](./copilot-glossary) |

## Currency warnings

Copilot moves fast. Old tutorials (including our previous single file) are full of dead syntax:

- **Copilot Workspace** (GitHub Next technical preview) **sunset on 2025-05-30**. "Issue → plan → PR" now lives on **Cloud agent**.
- **GitHub App Copilot Extensions sunset on 2025-11-10**. Official replacement: MCP. VS Code **client-side** Chat extensions are unaffected.
- **GitHub Spark** no longer accepts new users or new apps (**2026-08-04**). Existing users can export until **2026-08-31**. Deployed apps keep running. Do not write new Spark tutorials.
- `@workspace`, `#editor`, `#git`, `#vscodeAPI` are **off the official list**. Codebase retrieval is a tool; Agent mode calls it.
- What used to be called **"coding agent" is now cloud agent**.
- **`gh copilot` (the GitHub CLI extension) is officially retired.** Use standalone `copilot`.
- Copilot CLI is **generally available** (since [2026-02-25](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/)). Pages that still say "public preview" are stale.
- Copilot is **not available on GitHub Enterprise Server**.
- Enterprise needs **GitHub Enterprise Cloud**. Business and Enterprise differ mainly in AI-credit pool and admin controls — numbers are in [Cheatsheet · Plan comparison](./copilot-cheatsheet).

The full retired / renamed list is in [Glossary · Retired or renamed concepts](./copilot-glossary).

## Links

- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features)
- [VS Code Copilot documentation](https://code.visualstudio.com/docs/copilot/overview)
- [Cheatsheet · High-quality sources](./copilot-cheatsheet) — sources ranked by trust; also the evidence base for this set

> **Evidence rule**: the Chinese `docs.github.com` tree is incomplete and lags. Paths like `docs.github.com/zh/enterprise-cloud@latest/...` are widely dead. Verify facts on `docs.github.com/en/copilot/...`.
