# GitHub Copilot Learning Map

> "Copilot" is not one thing. It can mean gray ghost-text in the editor, the Chat sidebar, a terminal agent, or a cloud job on github.com that opens a PR for you. **Name the surface first, then decide what to learn** — that is the first job of this page.

## What it actually is

One sentence: GitHub Copilot is a **family of AI coding products** that share one subscription, but differ in entry point, autonomy, and side-effect radius.

The mechanism that drives every later optimization: Copilot is **not** "we trained a model on your repo." It **retrieves and injects context on every request** — the current file, open tabs, files you mention, tool results. "Huge repo ⇒ Copilot knows it" is false. "Open the relevant files, then ask" is what works.

## Which of the four surfaces?

```
What am I doing right now?
├── Complete the next line / fill in boilerplate
│   └── → Code completion (in the editor, Tab to accept)
├── Explain a snippet / refactor / change several files
│   └── → Chat (sidebar or inline)
│       ├── I only want to understand, do not touch code  → Ask
│       ├── I know which files, I do not want to type     → Edit
│       └── I give the goal, you own the process          → Agent (runs locally, has side effects)
├── The work lives on the command line (scripts, git, build failures)
│   └── → Copilot CLI (terminal agent; it really runs commands)
└── The task is well-scoped and slow, I do not want to watch it
    └── → Cloud agent (github.com / an Issue; the output is a PR)
```

Two mix-ups to lock in now:

| Easy to confuse | Difference |
|-----------------|------------|
| Chat **Agent mode** vs **Cloud agent** | Agent mode runs on your machine. Cloud agent runs on GitHub and produces a PR. Not the same product. |
| Standalone **Copilot CLI** vs the older **`gh copilot` extension** | The former is a full agent (`copilot`). The latter is **officially retired** (explain / suggest only). |

More look-alikes (including renamed and retired terms) live in the [Glossary](./copilot-glossary).

## Which page to open

This set follows [Diataxis](https://diataxis.fr/). **Do not read the cheatsheet as a tutorial:**

| Page | Quadrant | Open it when |
|------|----------|--------------|
| [Getting started](./copilot) | Tutorial | First time: install → sign in → four surfaces → persist project conventions |
| [Cookbook](./copilot-cookbook) | How-to | You already know the basics and want a copy-paste recipe |
| [Cheatsheet](./copilot-cheatsheet) | Reference | Look up a keybinding, slash command, setting, CLI flag, or plan quota |
| [Glossary](./copilot-glossary) | Explanation | You hit an unknown term, or you suspect a blog post is stale |

## Suggested path

**Stage 1: Make it work**

1. Pick a plan — there is a free tier; start there ([Tutorial · Step 0](./copilot))
2. Install the extension and sign in; install the CLI only if you need the terminal agent ([Tutorial · Step 1](./copilot))
3. Learn retrieval-based context injection — every later optimization depends on it ([Tutorial · Step 2](./copilot))

**Stage 2: Pick the right door**

4. Each of the four surfaces owns a different job; the wrong door is the biggest beginner tax ([Tutorial · Step 3](./copilot))
5. Build muscle memory for Ask / Edit / Agent ([Glossary · three modes](./copilot-glossary))
6. Feed context with `@` and `#` ([Cheatsheet · chat participants](./copilot-cheatsheet))

**Stage 3: Stop repeating yourself**

7. Write `.github/copilot-instructions.md`. If you have typed the same sentence three times, it belongs in a file ([Cookbook · project conventions](./copilot-cookbook))
8. Reuse prompt files for shaped tasks ([Cookbook · prompt files](./copilot-cookbook))
9. Attach MCP servers for databases and internal APIs ([Glossary · MCP](./copilot-glossary))

**Stage 4: Scale and stay safe**

10. Delegate to Cloud agent; write a task description with hard edges ([Cookbook](./copilot-cookbook))
11. Review anything that touches auth, SQL string building, crypto, or payments ([Tutorial · Step 6](./copilot))

## Currency warnings

Copilot moves fast. Old tutorials (including our previous single file) are full of dead syntax:

- **Copilot Workspace** (GitHub Next technical preview) **sunset on 2025-05-30**. "Issue → plan → PR" now lives on **Cloud agent**.
- **GitHub App Copilot Extensions sunset on 2025-11-10**. Official replacement: MCP. VS Code **client-side** Chat extensions are unaffected.
- `@workspace`, `#editor`, `#git`, `#vscodeAPI` are **off the official list**. Codebase retrieval is a tool; Agent mode calls it.
- What used to be called **"coding agent" is now cloud agent**.
- **`gh copilot` (the GitHub CLI extension) is officially retired.** Use standalone `copilot`.
- Copilot is **not available on GitHub Enterprise Server**.
- Enterprise needs **GitHub Enterprise Cloud**. Business and Enterprise differ mainly in AI-credit pool and admin controls — numbers are in [Cheatsheet · Plan comparison](./copilot-cheatsheet).

The full retired / renamed list is in [Glossary · Retired or renamed concepts](./copilot-glossary).

## Links

- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot documentation](https://code.visualstudio.com/docs/copilot/overview)
- [Cheatsheet · High-quality sources](./copilot-cheatsheet) — sources ranked by trust; also the evidence base for this set

> **Evidence rule**: the Chinese `docs.github.com` tree is incomplete and lags. Paths like `docs.github.com/zh/enterprise-cloud@latest/...` are widely dead. Verify facts on `docs.github.com/en/copilot/...`.
