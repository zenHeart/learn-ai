# Getting Started with GitHub Copilot

> This is a **tutorial**. Read it in order and you will go from "Copilot installed" to "I know what each of the four surfaces is for, and how to feed my project conventions to it."
>
> Hit an unfamiliar term? See the [Glossary](./copilot-glossary). Need a keybinding or a flag? See the [Cheatsheet](./copilot-cheatsheet). Want a ready-made recipe for a specific scenario? See the [Cookbook](./copilot-cookbook).

Goal of this guide: move Copilot from "autocomplete my line" to "do the work with me."

## Step 0: Pick a plan

Copilot has a free tier — start there:

- **Copilot Free** is free, with 2,000 code completions per month, and model selection limited to automatic.
- **Students, teachers, and open source maintainers** get it free after eligibility verification.
- Upgrade when the quota bites. Plan prices and limits are in [Cheatsheet · Plan comparison](./copilot-cheatsheet).

One prerequisite fact: Copilot is **not available on GitHub Enterprise Server**. If your company runs self-hosted GHES, confirm this first.

## Step 1: Install and sign in

Taking VS Code as the example: install the GitHub Copilot extension, sign in with your GitHub account, and you are ready once the Copilot icon appears in the status bar.

For terminal use, install the CLI separately (**note there are two different CLIs — do not install the wrong one**; the difference is explained in the [Glossary](./copilot-glossary)):

```bash
# Standalone Copilot CLI (full agent, requires Node.js 22+)
npm install -g @github/copilot
```

Other install methods are in [Cheatsheet · Copilot CLI · Install](./copilot-cheatsheet).

## Step 2: Understand how it "knows" your project

First, correct the most common misconception: **Copilot is not "ChatGPT plus your repository."**

It is not tied to a single model (the available model set differs by subscription), and it has not trained a model on your repository. It works through **retrieval-based context injection** — the editor assembles the current file, your open tabs, files you explicitly reference, and results retrieved by tools into every single request.

This mechanism dictates every optimization you can make:

| What you do | Why it helps |
|-------------|--------------|
| Open the relevant files before asking | Open tabs enter the context |
| Reference explicitly with `#file:` | More reliable than letting it search |
| Write custom instructions | Attached automatically to every request — invest once, benefit long term |

Conversely, "our repo is huge so Copilot must understand it" is wrong. Detailed explanation in [Glossary · GitHub Copilot](./copilot-glossary).

## Step 3: Four surfaces, each with its own job

Copilot is not one interface; it is four classes of entry point. **Picking the wrong entry point is the single biggest efficiency loss for beginners.**

| Surface | Where | How you use it | Typical task |
|---------|-------|----------------|--------------|
| **Code completion** | Wherever your cursor is in the editor | Type → ghost text appears → `Tab` | Complete the next line, fill in boilerplate |
| **Chat** | Sidebar / inline / terminal | Conversation | Explain, refactor, multi-file changes |
| **CLI** | Terminal | Interactive agent session | Command line tasks, scripts |
| **Cloud agent** | GitHub web / Issue | Delegate, it runs in the background, produces a PR | Well-scoped, time-consuming tasks |

### 3.1 Code completion

The simplest surface, and the one you plateau on fastest: type, ghost text appears, `Tab` to accept, `Escape` to dismiss.

To make completions sharper, write your intent into a comment:

```ts
// Filter users active within the last 30 days with a verified email,
// return an array sorted by lastActiveAt descending
```

Far more useful than writing "handle users" — the reasoning and patterns are in [Cookbook · Writing code in the editor](./copilot-cookbook).

### 3.2 Chat: learn to pick the mode first

`⌃⌘I` opens the Chat view; `⌘I` opens inline Chat in the editor or terminal.

Chat has three levels of autonomy. **This is the one choice in this whole document you should build muscle memory for:**

| Mode | What it can do | Signal to pick it |
|------|----------------|-------------------|
| **Ask** | Answers only, never touches code | I need to understand this first |
| **Edit** | Edits the files you specify, you review each diff | I know where to change, I just don't want to type it |
| **Agent** | Decides which files to change, runs commands, iterates over multiple turns | I know the goal, I don't want to manage the process |

The rule of thumb: **can you tell at a glance that it got it wrong?** Yes → move toward Agent. No → fall back to Edit, or even Ask.

Deeper explanation in [Glossary · Ask / Edit / Agent](./copilot-glossary); the standard workflow is in [Cookbook · Multi-file changes with Chat](./copilot-cookbook).

### 3.3 Adding context to Chat: `@` and `#`

Two prefixes, two different jobs:

- **`@` is a participant** — it scopes your question to a domain and injects that domain's context. Today only `@github`, `@terminal`, and `@vscode` exist (plus whatever extensions contribute).
- **`#` is tools and file references** — `#file:path` references a file; `#search`, `#read`, `#execute` and friends are tool sets. Tools provided by MCP servers show up in this same list.

```
@terminal find the largest file in the src directory
#file:gameReducer.js #file:gameInit.js how are these files related
```

> `@workspace`, `#editor`, `#git`, and `#vscodeAPI` — all common in older tutorials — **are no longer on the official list**. Codebase retrieval moved down into tools, which Agent mode invokes on its own. The full retirement list is in the [Glossary](./copilot-glossary).

The complete list of participants, tool sets, and slash commands is in the [Cheatsheet](./copilot-cheatsheet).

### 3.4 Terminal: the CLI

```bash
copilot            # start an interactive session
```

Inside a session, `@ filename` references a file, `! command` runs a shell command, and `Shift+Tab` cycles between standard / plan / autopilot.

The fundamental difference from Chat: **it has side effects** — it really edits files and really runs commands, which is why it has tiered permissions (ask by default / assisted / allow all). For your first sessions, keep the default and read every command it wants to run.

### 3.5 Cloud: the Cloud agent

Delegate a task from a GitHub Issue or the web UI; it opens a branch, changes code, and opens a PR. Suited to work that is "well-scoped, time-consuming, and doesn't need you watching." How to write the task description is in [Cookbook · Delegating to the cloud](./copilot-cookbook).

> Note it used to be called "coding agent"; GitHub has renamed it to cloud agent. Also, **Agent mode** in Chat runs on your local machine — that is not the same thing as the Cloud agent.

Two extra official doors, not part of the day-one drill: **Copilot Chat on github.com** (`https://github.com/copilot`) and the **Copilot app** (desktop, parallel sessions). When to pick them is on the [learning map](./). **GitHub Spark** is closing — do not start a new app; see [Cookbook · Spark](./copilot-cookbook).

## Step 4: Make repeated requirements permanent

At this point you can use all four surfaces. **The step that actually separates people is this one** — stop re-describing your project conventions every time, and write them into files that Copilot picks up automatically.

Three mechanisms with different lifecycles:

| Mechanism | Trigger | What it solves |
|-----------|---------|----------------|
| **Custom instructions** | Automatic, attached to every conversation | Constant constraints ("we use TypeScript strict") |
| **Prompt files** | Manual, invoked with `/name` | Reusable complete tasks ("generate a form from our template") |
| **Custom agents** | Switch to that agent | Role switching ("you are now a code reviewer") |

**Starting with one file is enough** — create `.github/copilot-instructions.md` at the repository root:

```markdown
# Project conventions

- TypeScript strict mode, `any` is not allowed
- Components are function components with hooks, never class components
- Tests use Vitest
```

The test to apply: **if you have written the same sentence in a prompt more than three times, it belongs in custom instructions.**

Authoring details and advanced usage (path-scoped instructions, `AGENTS.md`, prompt file frontmatter) are in [Cookbook · Capturing project conventions](./copilot-cookbook) and [Cheatsheet · Custom instructions](./copilot-cheatsheet).

## Step 5: Connect external tools (MCP)

When Copilot needs to reach a database, an internal API, or a third-party service, connect an MCP server. Once connected, the tools it provides appear in the `#` list and are used exactly like built-in tools.

> **Important currency warning**: the GitHub App form of **Copilot Extensions was sunset on 2025-11-10**, and the official replacement is MCP. The old "invoke an extension with `@extension-name`" pattern no longer works. VS Code client-side Chat extensions are **unaffected and still supported**. Details in [Glossary · MCP](./copilot-glossary).

## Step 6: Build safety habits

- **Always review generated code**, especially anything touching permission checks, SQL string building, cryptography, or payments.
- **Use automated tests as a guardrail** — confirm the tests are correct first, then let it change the implementation.
- When you need to check whether a suggestion closely matches public code, use the [official matching log](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code).
- Agent mode and the CLI execute commands. **Do not approve a command you are unsure about.**

## What's next

- Feels like "it never understands me" → [Cookbook · Prompting principles](./copilot-cookbook)
- Looking up a keybinding / command / config key → [Cheatsheet](./copilot-cheatsheet)
- Hit an unfamiliar term, or suspect something you read is out of date → [Glossary](./copilot-glossary), especially the retired concepts section

## References

- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot documentation](https://code.visualstudio.com/docs/copilot/overview)
- [VS Code Copilot feature reference](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)
- [GitHub Copilot video series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt)

A fuller list of sources, ordered by reliability, is in [Cheatsheet · High-quality sources](./copilot-cheatsheet).
