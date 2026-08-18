# Copilot Glossary

> This is an **explanation** page — "what is this, why does it exist, how does it relate?" It pairs with the [Cheatsheet](./copilot-cheatsheet): that page answers "how do I configure it / what is the flag?" This page answers "what is it / why do I need it / how does it talk to the other concepts?"
>
> Shared terms are defined **once here**. The [tutorial](./copilot) and [Cookbook](./copilot-cookbook) link here instead of restating.
>
> Copilot retires names quickly. The last section, [Retired or renamed concepts](#retired-or-renamed-concepts), is the parking lot for "you saw this in an old tutorial, including our old single file, and it is gone."

## Concept map

```
                    ┌────────────────────────┐
                    │     GitHub Copilot     │  ← subscription layer:
                    │     plan / quota       │     which surfaces and models
                    └───────────┬────────────┘
                                │
        ┌──────────────┬────────┴───────┬─────────────────┐
        │              │                │                 │
   ┌────┴─────┐  ┌────┴─────┐    ┌────┴─────┐     ┌─────┴──────┐
   │ Completion│  │   Chat   │    │   CLI    │     │ Cloud agent │  ← surface layer
   │ (inline) │  │ (in IDE)  │    │ (terminal)│     │ (on GitHub) │
   └──────────┘  └────┬─────┘    └────┬─────┘     └──────┬─────┘
                      │               │                  │
                      └───────┬───────┴──────────────────┘
                              │
              ┌───────────────┴────────────────┐
              │     Context & customization    │  ← what you write, what it sees
              ├────────────────────────────────┤
              │ Instructions  Prompt files     │
              │ Custom agents  Skills  Plugins │
              │ MCP   Spaces                   │
              └────────────────────────────────┘
```

**The logic**: the **subscription layer** decides quota and models. The **surface layer** is four doors — completion while you type, Chat in the IDE, CLI in the terminal, Cloud agent in the background on GitHub. **Context & customization** cuts across every door and decides what Copilot actually "knows." Ninety percent of leverage is on the third layer. Switching surfaces is a posture change; feeding context is a skill change.

---

## GitHub Copilot

**What it is**: GitHub's AI coding assistant. Editor extensions, a CLI, and github.com all sit on large language models to help you write, explain, and run development work.

**It is not "ChatGPT plus your repository."** That is the most common misconception — and the sentence our old single file used. Copilot is not bound to one model. The [plans page](https://docs.github.com/en/copilot/get-started/plans) lists different model catalogs per subscription; paid plans can switch vendors, Free is auto-selection only. "It knows your project" is **retrieval-based context injection**, not "we trained on your repo": the editor packs the current file, open tabs, files you cite, and tool results into each request. That is why "open the relevant files" and "write custom instructions" improve output immediately, and why "our repo is huge so Copilot must understand it" is wrong.

**Why learn it as a system**: Tab-complete is the easiest surface and the fastest ceiling. The real gap is controlling context, picking a surface, and turning repeated demands into files. That is why this set is four Diataxis pages, not one.

**Official**:
- [Copilot docs home](https://docs.github.com/en/copilot)
- [Plans](https://docs.github.com/en/copilot/get-started/plans)
- [How GitHub Copilot is getting better at understanding your code](https://github.blog/ai-and-ml/github-copilot/how-github-copilot-is-getting-better-at-understanding-your-code/)

---

## Prompt / Prompt Engineering / Context

**What they are**:

- **Prompt**: the input you send the model.
- **Prompt Engineering**: how you organize that input so the model does what you meant.
- **Context**: extra information you attach so the model can understand the question.

**In Copilot specifically**:

| Role | Prompt is | Prompt Engineering is | Context is |
|------|-----------|----------------------|------------|
| Developer | A code block, an inline comment, or a Chat question | Improving comments and questions so suggestions get better | Extra information injected via participants (`@`), tools (`#`), or explicit file cites |

> Table adapted from [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/#whats-a-prompt-and-what-is-prompt-engineering).

**Why split the three**: beginners blame the model when Copilot "doesn't get it." About eight times out of ten the context is missing — files closed, nothing cited, no instructions. Split the terms and the debug path is: context first, then prompt clarity, then the model.

**How to write them**: [Cookbook · Prompting principles](./copilot-cookbook).

**Further reading**:
- [A Beginner's Guide to Prompt Engineering with GitHub Copilot](https://dev.to/github/a-beginners-guide-to-prompt-engineering-with-github-copilot-3ibp)
- [ChatGPT Prompt Engineering for Developers](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction)

---

## Four surfaces

**What they are**: Copilot is four classes of entry point, not one UI. Picking the wrong one is the common efficiency loss.

| Surface | Where | Interaction | Typical job |
|---------|-------|-------------|-------------|
| **Code completion (inline)** | Wherever you type | Type → ghost text → `Tab` | Next line, boilerplate |
| **Chat** | Sidebar / inline / terminal | Conversation | Explain, refactor, multi-file edits |
| **CLI** | Terminal | Interactive agent session | Shell work, scripts, cross-repo tasks |
| **Cloud agent** | github.com / an Issue | Delegate; it runs in the background | A well-defined standalone job |

**Why four instead of "one Copilot"**: three axes differ — **who starts** (you type / you ask / you delegate), **where it runs** (local / GitHub cloud), **what the artifact is** (ghost text / editor diff / Pull Request). Mismatch hurts: completion for a refactor (cannot touch many files), Chat for a 20-minute migration (you have to watch).

**How to choose**: [Cheatsheet · Surface selection](./copilot-cheatsheet).

---

## Ask / Edit / Agent

**What they are**: three autonomy levels inside Chat.

| Mode | Copilot may | Your control | Use when |
|------|-------------|--------------|----------|
| **Ask** | Answer only; never edit | Full — it only talks | Concepts, explanations, plans |
| **Edit** | Change the files you name | You pick files, preview diffs, accept or discard | Controlled edits to known files |
| **Agent** | Choose files, propose and run commands, iterate | You approve tool calls and the final result | Multi-step work that needs tests or installs |

**Example prompts**:

- Ask: "What is the difference between let, const, and var in JavaScript?" / "Explain this function."
- Edit: "Refactor `calculateTotal` for readability." / "`login` is broken; debug it."
- Agent: "Split this logic into several functions." / "Run all tests and the linter for payment-processing."

**Why three levels, not one autopilot**: autonomy trades off against control. Agent mode is cheap in attention and expensive in surprise diffs when you do not know the code yet. Ask is safest and slowest. **The test is "can I see that it is wrong at a glance?"** Yes → Agent. No → Edit or Ask.

**Mode name ≠ product name**: Agent **mode** is a Chat setting (local). Cloud **agent** is a separate cloud product. Easy to mix.

**Official**: [Copilot best practices](https://docs.github.com/en/copilot/get-started/best-practices) · [About Copilot Chat](https://docs.github.com/en/copilot/concepts/chat)

<!-- TODO: unverified — the three deep anchors from the old file (/using-github-copilot/guides-on-using-github-copilot/choosing-the-right-ai-tool-for-your-task#using-copilot-chat-in-*-mode) now redirect. No maintained equivalent anchors found; only the parent page is linked. -->

---

## Chat participant

**What it is**: an `@`-prefixed "specialist" in Chat. It pins the question to a domain and injects that domain's context.

**Current VS Code built-ins**:

| Participant | Context it injects | Example |
|-------------|-------------------|---------|
| `@github` | GitHub (repos, Issues, PRs) | `@github which open bug issues landed this week` |
| `@terminal` | Integrated terminal and its contents | `@terminal find the largest file in the src directory` |
| `@vscode` | VS Code commands and features | `@vscode how do I change my colors` |

Extensions can add more. Full list: [Cheatsheet · Chat participants](./copilot-cheatsheet).

**Why the list shrank**: early Copilot used participants as capability switches (`@workspace` = "search the codebase"). Those capabilities sank into **tools**. Agent mode decides whether to search. Participants are now a few domains you still have to name explicitly. That is why `@workspace` disappeared (see [retired concepts](#retired-or-renamed-concepts)).

**Official**: [VS Code Copilot feature reference](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

---

## Tools / tool sets

**What they are**: callable capabilities in Chat, cited with `#`. Related tools are packed into a **tool set** — `#read` allows `/readFile`, `/problems`, `/terminalLastCommand`, …

**Common sets**:

| Set | Covers |
|-----|--------|
| `#read` | Files, diagnostics, last terminal command, terminal selection |
| `#edit` | Create dirs/files, edit files and notebooks |
| `#execute` | Tasks, terminal commands, notebook cells, test failures |
| `#search` | Semantic codebase search, file search, text search, usages, SCM changes |
| `#vscode` | Install extensions, run VS Code commands, VS Code API |
| `#web` | Fetch a page |

Full list: [Cheatsheet · Tool sets](./copilot-cheatsheet).

**Why "chat variables" became "tool sets"**: `#file` and `#selection` were **static** — paste a blob into the prompt once. Tools are **actions** — Copilot decides whether to call them, how often, and what to do with the result. That shift is agentification: static variables cannot explore; tools can.

**Relationship to MCP**: MCP servers show up as tools in the same `#` list. `#` is the single tool door.

**Official**: [VS Code Copilot feature reference](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

---

## Customization

**What it is**: turn "I have to say this every time" into a file or setting Copilot attaches for you.

**Three mechanisms, by scope × trigger**:

| Mechanism | Scope | Trigger | Solves |
|-----------|-------|---------|--------|
| **Custom instructions** | Project- or path-level; every conversation | Automatic | Constant constraints ("TypeScript strict", "no class components") |
| **Prompt files** | One task | You type `/name` | A reusable whole job ("generate a React form from the template") |
| **Custom agents** | A whole conversation | You switch to that agent | A role switch ("you are a security reviewer") |

**Why three**: different **lifecycles**. Instructions are the project constitution. Prompt files are on-demand scripts. Custom agents are a persona for the whole thread. Put a constant constraint in a prompt file and you must remember to invoke it. Put a one-off task in instructions and you pollute every unrelated chat.

**Where the files go**: [Cheatsheet · Custom instructions](./copilot-cheatsheet) and [Cookbook · Prompt files](./copilot-cookbook).

**Official**:
- [Custom instructions support](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [VS Code Copilot customization](https://code.visualstudio.com/docs/copilot/customization/overview)

---

## Custom instructions

**What they are**: Markdown that says "in this project / this class of files, obey these rules." Copilot attaches them to every request.

**Five official scopes**:

| Type | Scope |
|------|-------|
| 👤 **Personal** | All of your projects |
| 📦 **Repository-wide** | Every conversation in one repo |
| 📂 **Path-specific** | Files matching a glob |
| 🤖 **Agent** | Cross-tool agent files (`AGENTS.md`, …) |
| 🏢 **Organization** | Every repo in the org |

Paths and per-IDE support: [Cheatsheet · Custom instructions](./copilot-cheatsheet).

**Why this is the highest-ROI habit**: it is the only "write once, every later turn benefits" mechanism. Ten precise project constraints beat restating the stack in every prompt.

**Versus `AGENTS.md`**: `.github/copilot-instructions.md` is Copilot-specific. `AGENTS.md` is a cross-tool convention file that Copilot also reads. Write `AGENTS.md` when several AI tools should share the same constitution. Write `copilot-instructions.md` when you need Copilot-only syntax.

**Official**: [Custom instructions support](https://docs.github.com/en/copilot/reference/custom-instructions-support)

---

## Prompt files

**What they are**: `.prompt.md` files that store a complete reusable task. Invoke them in Chat as a slash command, with arguments.

**Versus custom instructions**:

| Axis | Custom instructions | Prompt files |
|------|---------------------|--------------|
| Trigger | Automatic, every turn | Manual, `/name` |
| Content | Constraints ("no `any`") | A task ("generate a validated form component") |
| Analogy | Project ESLint config | A snippet / script |

**Why they exist**: every team has a handful of "we re-describe this every time" jobs — scaffold a component, write a migration, format a changelog. Prompt files make those Git-committable, shared, parameterized assets.

**Shape and authoring**: [Cookbook · Prompt files](./copilot-cookbook).

**Official**: [VS Code Copilot customization](https://code.visualstudio.com/docs/copilot/customization/overview)

---

## Agent Skills

**What they are**: a directory that packs the knowledge for one specialty (instructions, scripts, references). Copilot loads it when it recognizes a matching task.

**Versus prompt files**: a prompt file is **one Markdown file** you invoke. A Skill is a **directory with assets** that can load automatically and can hold multi-file workflows plus helper scripts. Upgrade to a Skill when one file is not enough or you need accompanying scripts.

**Official**: [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

---

## Plugins

**What they are**: installable packages that extend Copilot with reusable agents, skills, hooks, and integrations. Managed from Copilot CLI (`copilot plugin` / `copilot plugins …`) and from Chat (`/plugins`).

**What they are not**: the **GitHub App Copilot Extensions** that sunset on 2025-11-10. Those were `@extension-name` Chat add-ons. Plugins are a later packaging format. If a 2024 blog says "build a Copilot Extension," it is talking about the dead product.

**Official**: [About GitHub Copilot plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins)

---

## MCP (Model Context Protocol)

**What it is**: an open protocol for how AI apps talk to external tools and data. Build the server once; every MCP-capable host can use it.

**Why Copilot bet on it**: not a guess — the official [Extensions sunset notice](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps/) says Extensions only worked inside Copilot Chat, so tool authors had to rebuild for every other assistant. MCP is "build once, reuse across hosts."

**How it shows up**: MCP capabilities appear as **tools**, cited with `#`, indistinguishable from built-ins in daily use. Orgs can enable / disable / allowlist servers.

**Official**: [About MCP](https://docs.github.com/en/copilot/concepts/context/mcp)

---

## Cloud agent

**What it is**: a Copilot agent that runs in GitHub's cloud. You assign a task from an Issue or the web UI; it opens a branch, edits, optionally verifies, and can open a Pull Request.

**Versus Chat Agent mode**:

| Axis | Chat Agent mode | Cloud agent |
|------|-----------------|-------------|
| Where it runs | Your local editor | GitHub cloud |
| Do you watch? | Yes (you approve tool calls) | No; you get notified |
| Artifact | Working-tree edits | Usually a Pull Request |
| Fit | Exploratory work you want to steer | A job you can state in one paragraph |

**Why it exists**: a local agent occupies your editor and attention. "Replace the old API in these 30 files" is well-scoped and slow — cheaper to run in the cloud and review a PR.

**2026-04-01 expansion** ([changelog](https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/)): it is no longer limited to "always open a PR." It can research the repo, produce a plan for approval, and work on a branch until you click Create pull request. Paid plans; Business / Enterprise need an admin to enable it.

**It used to be called "coding agent."** Old "Copilot coding agent" pages mean this product.

**Official**: [Copilot docs · Agents](https://docs.github.com/en/copilot)

---

## Copilot Spaces

**What it is**: a named pack of related context (repos, files, free text, attachments). Questions asked against that Space always carry the pack.

**Why it exists**: custom instructions solve "constant project rules." Spaces solve "the knowledge pack for one topic" — e.g. "payments domain" = three repos + an architecture note + a glossary. That pack should not live in global instructions (irrelevant to other work) and is too heavy to cite by hand every time.

**Official**: [About Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces)

---

## Copilot CLI

**What it is**: Copilot as a terminal agent. **Two different products share the nickname — do not mix them:**

| | Old: `gh copilot` | New: `copilot` |
|---|---|---|
| Shape | A `gh` CLI extension | A standalone binary |
| Install | `gh extension install github/gh-copilot` | `npm install -g @github/copilot` (and others) |
| Capability | `explain` / `suggest` only | Full interactive agent: files, commands, MCP, plugins |
| Interaction | One question, one answer | A session with permission modes, slash commands, resume |

**Why two**: `gh copilot` was a light "help me remember the command" experiment. Standalone `copilot` is the full agent moved into the terminal. GitHub has marked the former **retired**. "Copilot CLI" today means only the latter.

**Permission modes**: the CLI really runs commands and really edits files, so it has graded authorization (ask by default / assisted / allow all) plus allow/deny rules by command and path. That is the difference from a chat box: it has side effects.

**Commands, flags, keys**: [Cheatsheet · Copilot CLI](./copilot-cheatsheet).

**Official**:
- [Install Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli)
- [CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference)

---

## AI credits and quotas

**What they are**: Copilot's usage unit. Each paid plan includes a pool of GitHub AI credits. High-cost features (Chat, CLI, agents, code review) spend credits. Basic completions have their own rules per plan (Free: 2,000 / month).

**Why you should care**: this is what decides "can I leave Agent mode on all day?" Completion is almost free; agent work is metered. "Prefer completion when it is enough" is a cost rule, not only a UX rule.

**The billing model moved**: the plans page marks request-count "premium requests" as legacy. Current language is AI credits. "X premium requests per month" in old tutorials is stale.

**Business vs Enterprise pools** (official enterprise-plan page): Business **1,900** credits / user, Enterprise **3,900**, pooled across the org. See [Cheatsheet · Plan comparison](./copilot-cheatsheet).

**Official**: [Copilot plans](https://docs.github.com/en/copilot/get-started/plans)

---

## Retired or renamed concepts

Copilot moves fast. You will meet these names in old tutorials (including this site's previous single file). **They do not apply today:**

| Old name | Status | Replacement |
|----------|--------|-------------|
| **Copilot Workspace** (GitHub Next technical preview) | Sunset **2025-05-30**, official note on [GitHub Next](https://githubnext.com/projects/copilot-workspace/) and the [sunset notice](https://gh.io/copilot-workspace-sunset) | Cloud agent carries "describe an Issue, get a PR" |
| **Copilot Extensions** (GitHub App form) | Fully sunset **2025-11-10**, [announcement](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps/) | MCP servers. **VS Code client-side Chat extensions remain supported** — the announcement excludes them |
| **`@workspace`** | Off the VS Code participant list | Codebase search is a tool; Agent mode calls it. To force it, `#search` (includes `/codebase`) |
| **`@regex`** | Not on the official list; likely an early community participant | Just ask in Ask mode |
| **`#editor` / `#git` / `#vscodeAPI`** | No longer standalone variables | `#read` (editor contents), `#search` (`/changes`), `#vscode` (`/VSCodeAPI`) |
| **`/new-from`** | Not on any official list; **the old file invented this row** | `/new` for a project, `/newNotebook` for a notebook |
| **`/runCommand` as a slash command** | Not a top-level slash command | `#vscode` tool `/runCommand` |
| **Custom chat modes** | Renamed | Custom agents |
| **Copilot coding agent** | Renamed | Cloud agent |
| **"`gh copilot` is Copilot's CLI"** | [Officially retired](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli) | Standalone `copilot` CLI |
| **Premium requests (count-based quota)** | Marked legacy on the plans page | AI credits |
| **`docs.github.com/zh/enterprise-cloud@latest/...`** | Widely 404 / redirect | `docs.github.com/en/copilot/...` |

<!-- TODO: unverified — the old keybinding table listed "Shift Tab accept line", "⌘→ accept word", "⌃Enter show all suggestions", "⌥] / ⌥[ cycle suggestions". They are not on the current VS Code Copilot feature-reference key list, so they were removed from the cheatsheet rather than kept as facts. -->

---

## Related pages

- [Copilot tutorial](./copilot) — install, first run, four surfaces
- [Copilot Cheatsheet](./copilot-cheatsheet) — keys / commands / config / plans / sources
- [Cookbook](./copilot-cookbook) — scenario recipes
