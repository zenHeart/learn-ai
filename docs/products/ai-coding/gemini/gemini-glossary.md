# Gemini Family Glossary

> This document explains the **concepts** in the Gemini family: what each one is, why it exists, what role it plays in the ecosystem, and how it differs from the concept next to it.
>
> For commands, config keys and subscription numbers see the [cheatsheet](./gemini-cheatsheet); for copy-paste recipes see the [cookbook](./gemini-cookbook).

## How the concepts relate

```
                        ┌─────────────────────────────┐
                        │    The agent-first premise   │
                        │  AI acts; it does not just   │
                        │        complete code         │
                        └──────────────┬──────────────┘
                                       │ realised as
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
 ┌──────▼──────┐               ┌───────▼───────┐              ┌───────▼───────┐
 │  Gemini CLI │               │  Antigravity  │              │     Jules     │
 │ local shell │               │ local, multi- │              │   cloud VM    │
 │             │               │   surface     │              │               │
 └──────┬──────┘               └───────┬───────┘              └───────┬───────┘
        │                              │                              │
 constraints + memory        constraints + capability        constraints + output
        │                              │                              │
 ┌──────▼──────────┐    ┌──────────────▼──────────────┐    ┌──────────▼────────┐
 │ GEMINI.md       │    │ Rules (global + workspace)   │    │ AGENTS.md         │
 │ system.md       │    │ Skills (dir + SKILL.md)      │    │ Pull request      │
 │ Extensions      │    │ Workflows (/name)            │    └───────────────────┘
 └──────┬──────────┘    │ Subagents (concurrent)       │
        │               │ Artifacts (reviewable)       │
        │               └──────────────┬──────────────┘
        │                              │
        └───────────┬──────────────────┘
                    │ all reach out through
            ┌───────▼────────┐
            │      MCP       │  external tools (GitHub / browser / database)
            └────────────────┘

  Cross-cutting safety and recovery:
  Trusted Folder (project config loads only when trusted) · Checkpoint (snapshot before edits)
  Session (list and resume a whole conversation) · Headless Mode (one-shot, pipeline-friendly)
```

One-line reading: **the paradigm (agent-first) decides the product shapes (CLI / Antigravity / Jules), the product shape decides which file you use to constrain it (GEMINI.md / Rules / AGENTS.md), and MCP decides how much of the world it can touch.**

## Agent-first

**What it is**: a product design premise — assume the AI is an actor that can plan on its own, call tools and execute multi-step work, rather than an engine that waits for you to type half a line and finishes the rest.

**Why the concept matters**: it explains why Antigravity is not "another editor with AI bolted on". A completion tool's unit of interaction is one keystroke; an agent-first tool's unit is one task. That changes what you have to feed it: completion needs a cursor position, an agent needs a goal, constraints and acceptance criteria.

**Ecosystem role**: this is the shared premise of the whole Gemini coding family. Gemini CLI expresses it in the terminal, Antigravity on the desktop, Jules in the cloud.

**Versus "AI completion"**: completion lives inside your edit loop; an agent owns an edit loop of its own. When completion goes wrong you see it immediately; when an agent goes wrong it may only surface twenty files later — which is exactly why [Checkpoint](#checkpoint) and [Artifact](#artifact) exist.

**Official docs**: [Antigravity docs home](https://antigravity.google/docs/home)

## Surface

**What it is**: Antigravity's multiple entry points. The official docs describe the desktop app, the CLI (terminal UI), the SDK (Python) and IDE integration as different surfaces built on **the same agent harness**.

**Why the concept matters**: it answers a very common confusion — "do the rules I configured on the desktop still apply in the CLI?" Because they share one harness, constraints like rules and skills are cross-surface. You pick the entry point that fits how you are working right now, without learning a second mental model.

**How it works**: the surface owns the interaction shape (GUI / terminal / programmatic API); the harness owns the agent's planning, tool calling and execution.

**Versus "multiple clients"**: multiple clients are usually different shells over one backend API, and their capabilities are often unequal. Surfaces share the agent runtime itself.

**When to use which**: desktop for interactive exploration, CLI to slot into existing scripts, SDK to embed the agent in your own automation.

**Official docs**: [Antigravity docs home](https://antigravity.google/docs/home)

## Rules

**What it is**: long-lived behavioural constraint files. Antigravity has two levels — global rules in `~/.gemini/GEMINI.md`, workspace rules in the `.agents/rules` directory. The docs state a hard limit of 12,000 characters per rule file.

**Why it matters**: making an agent re-derive your preferences from scratch on every task is expensive and unstable. Rules pin down invariants like "we use pnpm, never npm" or "every component must be typed" so you never restate them.

**How it works**: four activation modes are documented — Manual (referenced by hand), Always On (always loaded), Model Decision (the model judges whether it is needed), and Glob (triggered by file patterns). Rules can cross-reference each other with `@filename`.

**Versus [Skill](#skill)**: a rule says "you must always do this" (a constraint); a skill says "when you hit this kind of work, follow this procedure" (a capability). Constraints are always present; capabilities load on demand.

**Versus Gemini CLI's `GEMINI.md`**: the purpose is the same (supply long-lived context) but the location and layering differ — do not mix the two sets of paths.

**When to use**: coding conventions, stack constraints, prohibitions, review checklists.

**Official docs**: [Rules & Workflows](https://antigravity.google/docs/rules-workflows)

## Skill

**What it is**: a **directory** containing a `SKILL.md`. It lives at `.agents/skills/<folder>/SKILL.md` (travels with the repo) or `~/.gemini/config/skills/<folder>/SKILL.md` (global). In the frontmatter, `description` is required and `name` is optional.

**Why it matters**: it turns a specialised procedure ("how we cut a release here", "how we write these E2E tests") from a one-off prompt into a reusable asset you can commit and share with the team.

**How it works**: `description` is what the model uses to judge whether the skill is relevant right now, so write it like a trigger condition, not like a title. Because a skill is a directory, you can ship scripts, templates and sample data alongside it and have `SKILL.md` reference them.

**Common misconception**: a skill is **not** a flat `.md` file. The `.agents/skills/xxx.md` form seen in older docs is wrong. `.agent/skills` (singular) is kept only for backward compatibility; use `.agents/skills` for anything new.

**When to use**: release procedures, migration playbooks, domain-specific debugging steps.

**Official docs**: [Skills](https://antigravity.google/docs/skills)

## Workflow

**What it is**: a multi-step procedure you invoke explicitly as `/<workflow-name>`.

**Why it matters**: some procedures should start **when a human says so**, not when the model decides. Skills are matched passively through their description; workflows are triggered actively through a slash command.

**Versus [Skill](#skill)**: who holds the trigger. The model decides whether to use a skill; you decide when to run a workflow.

**When to use**: pre-release checks, weekly report generation, a fixed-format code review.

**Official docs**: [Rules & Workflows](https://antigravity.google/docs/rules-workflows)

## Subagent

**What it is**: a subordinate agent the main agent dispatches to do work. The official Antigravity docs call these Asynchronous Subagents.

**Why it matters**: a single agent's context window is a finite resource. Sending subagents to read one module each and return conclusions — so the main agent consumes conclusions rather than raw files — lets the same window cover a much larger task.

**How it works**: subagents run independently and return asynchronously, so the main agent can keep pushing other branches forward while it waits.

**The cost**: concurrency means changes arrive from several directions at once, raising the risk of conflicts and of two subagents editing the same file. That is precisely why [Artifact](#artifact) is valuable — you need to be able to review what each one intends to do.

<!-- TODO: needs verification — whether the official docs specify a cap on subagent concurrency. The scraped official docs describe the capability but no official statement gives a number. -->

**Official docs**: [Antigravity docs home](https://antigravity.google/docs/home)

## Artifact

**What it is**: a reviewable intermediate product the agent emits while working — a plan, a task list, a verification record.

**Why it matters**: the more autonomous the agent, the less obvious "what is it actually about to do" becomes. Artifacts convert that black-box middle state into something you can read and veto. They are the brake that comes with the autonomy, not decoration.

**Ecosystem role**: this is the same design motive as Jules producing a plan for human approval before it starts — **give a human a veto point before anything is touched**.

**When to use**: read the plan before a cross-module refactor; use the verification record afterwards to decide how much to trust the result.

**Official docs**: [Antigravity docs home](https://antigravity.google/docs/home)

## Checkpoint

**What it is**: Gemini CLI snapshots automatically before every file modification, and `/restore` rolls back. It is **off** by default; set `general.checkpointing.enabled` to `true`.

**Why it matters**: one agent task can change a dozen files in a row. By the time you realise the direction was wrong, `git checkout` would also throw away the edits you made by hand. A checkpoint gives you the finer granularity of "back to the moment before the agent touched anything".

**Versus Git**: Git records the history you **want to keep**; checkpoints record automated changes you **might want to undo**. They complement each other — checkpoints do not replace commits.

**When to use**: turn it on before letting an agent do a broad refactor.

**Official docs**: [Gemini CLI docs](https://geminicli.com/docs/)

## Session

**What it is**: the complete record of one conversation, which can be listed and resumed.

**Why it matters**: real work gets interrupted. Sessions mean "yesterday's context" does not depend on you pasting it all back in.

**How it works**: sessions are kept indefinitely by default, and can be cleaned up by configuration — `general.sessionRetention.enabled` turns cleanup on, `maxAge` (e.g. `"30d"`) bounds it by time, `maxCount` by number, and `minRetention` (default `"1d"`) sets the floor.

**Versus [Checkpoint](#checkpoint)**: a session saves the **conversation**, a checkpoint saves the **files**. Resuming a session does not revert code.

**Official docs**: [Gemini CLI docs](https://geminicli.com/docs/)

## Headless Mode

**What it is**: one-shot execution with the `-p` (prompt) flag, returning the result directly instead of entering the interactive UI. Pair it with `--output-format json` for structured output.

**Why it matters**: this is the interface that lets AI enter an existing engineering pipeline. An interactive UI is friendly to humans and hostile to scripts; headless mode makes `gemini` an ordinary Unix command that pipes, CI jobs and Git hooks can call.

**How it works**: stdin in, stdout out — which is what makes `npm run build 2>&1 | gemini -p "analyse this error"` work.

**When to use**: build-failure analysis, batch generation, CI checks.

**Official docs**: [Gemini CLI docs](https://geminicli.com/docs/)

## Trusted Folder

**What it is**: a security boundary. With `security.folderTrust.enabled` turned on, only trusted directories load project-level configuration; the trust list lives in `~/.gemini/trustedFolders.json`.

**Why it matters**: `.gemini/settings.json` and custom commands travel with the repository. If you clone an unfamiliar repo and start an agent inside it, the repo's own configuration gets a chance to influence agent behaviour. Trust makes "I have read and accepted this repo's configuration" an explicit act.

**How it works**: in an untrusted directory, project settings and custom commands do not take effect.

**Versus a sandbox**: trust controls **whose configuration is loaded**; a sandbox controls **what execution can reach**. Different problems.

**Official docs**: [Gemini CLI docs](https://geminicli.com/docs/)

## MCP

**What it is**: the Model Context Protocol, an open protocol for connecting agents to external tools and data sources.

**Why it matters**: without MCP an agent can only read and write local files and run local commands. With it, the agent can query GitHub issues, drive a browser, read a database — the capability boundary widens from "this machine" to "these services".

**Ecosystem role**: it is the common plug between the Gemini family and the outside world, supported by Gemini CLI, Antigravity and Code Assist alike.

**How it works**: an MCP server exposes a set of tools and the agent calls them when needed. In Gemini CLI, MCP servers are usually installed through an [Extension](#extension).

**Security note**: MCP servers often need credentials (a GitHub token, say). Put credentials in environment variables or `.gemini/.env`. **Do not put them in configuration files that get committed, and do not type them on the command line** — the command line lands in shell history.

**Official docs**: [Gemini CLI docs](https://geminicli.com/docs/)

## Extension

**What it is**: Gemini CLI's unit of installation; the most common use is installing an MCP server. Install with `gemini extensions install <git-url>`.

**Why it matters**: it turns "configure an MCP server" from hand-written JSON into one command.

**How it works**: installs from a Git repository URL. The URL must include the organisation name — the official GitHub MCP server is `https://github.com/github/github-mcp-server`. Older docs contained `https://github.com/github-mcp-server` (organisation missing), which cannot install.

**When to use**: wiring up GitHub, browser automation, internal services. See the [official extension gallery](https://geminicli.com/extensions/).

**Official docs**: [Gemini CLI extensions](https://geminicli.com/extensions/)

## AGENTS.md

**What it is**: an instruction file in the **repository root** that Jules reads automatically.

**Why it matters**: Jules works alone in a cloud VM with you nowhere nearby. It needs to know in advance how this repo installs dependencies, how it runs tests and what is off limits — otherwise it can only guess.

**Versus [Rules](#rules) and `GEMINI.md`**: all three are long-lived instructions for an agent, but they belong to different products and live in different places. Jules reads `AGENTS.md` at the repo root; Antigravity reads `~/.gemini/GEMINI.md` and `.agents/rules`; Gemini CLI reads `GEMINI.md` and `.gemini/system.md`. **Do not assume one file serves the whole family.**

**When to use**: spell out the install command, the test command, the code style and the directories nothing may touch.

**Official docs**: [Jules docs](https://jules.google/docs/)

## Related pages

- [Cheatsheet](./gemini-cheatsheet) — commands, config keys, subscription tiers
- [Cookbook](./gemini-cookbook) — recipes by scenario
- [Learning map](./index) — what to learn in what order
