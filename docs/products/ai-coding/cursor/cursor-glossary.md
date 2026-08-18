# Cursor glossary

Explanation: what a concept is, why it exists, and what it is easy to confuse with. How to configure it: [cheatsheet](./cursor-cheatsheet). How to click it: [tutorial](./cursor).

## Map

```
                    ┌──────────────┐
                    │  model+tools │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌───┴────┐  ┌────┴────┐
         │  Rules  │  │ Skills │  │   MCP   │
         │ AGENTS  │  │Commands│  │ (ext.)  │
         └────┬────┘  └───┬────┘  └────┬────┘
              │           │            │
              └─────┬─────┴──────┬─────┘
                    │            │
              ┌─────┴─────┐ ┌────┴────┐
              │   Agent   │ │  Hooks  │
              │ Ask/Plan/ │ └─────────┘
              │ Debug/Tab │
              └─────┬─────┘
                    │
         ┌──────────┼──────────┐
         │                     │
   ┌─────┴─────┐        ┌──────┴──────┐
   │ Subagents │        │ Cloud/Bugbot│
   │  / CLI    │        │             │
   └───────────┘        └─────────────┘
```

Rules / `AGENTS.md` are the standing brief. Skills / Commands are on-demand workflows. MCP turns external systems into tools. Hooks sit on the loop and do not rely on the model remembering. The Agent picks tools inside those constraints. Subagents move noisy work into another window. Bugbot and Cloud sit on the repo / PR axis.

---

## Rules

**What:** Persistent instructions prepended to model context. Official wording: models do not keep memory across completions; rules supply reusable prompt-level context.

**Why:** Without them you restate “use pnpm” every thread. With them the team commits the convention.

**Four triggers:** Always / glob / description (“apply intelligently”) / `@` only. Truth table: [cheatsheet](./cursor-cheatsheet#rules-frontmatter).

**Versus AGENTS.md:**

| | Rules (`.mdc`) | AGENTS.md |
|--|----------------|-----------|
| Format | YAML frontmatter + Markdown | Plain Markdown |
| Trigger | Four modes | Present as project instructions |
| Best for | Path-scoped, needs metadata | Simple, portable, human-readable |

A plain `.md` under `.cursor/rules` is **ignored**. Official advice: use `AGENTS.md` if you want plain markdown.

**Precedence:** Team → Project → User. Merged; earlier source wins.

**Docs:** [Rules](https://cursor.com/docs/rules)

---

## AGENTS.md

**What:** A normal Markdown file at the repo root (or a subdirectory) written for agents. No `description` / `globs` / `alwaysApply`.

**Why:** One file can serve Cursor, Claude Code, Codex, and anything else that reads `AGENTS.md`. Rules globs are stronger but Cursor-specific.

**Role:** Small repos can stop here. Larger ones: root `AGENTS.md` for globals, `.cursor/rules/*.mdc` per language or folder.

**Docs:** [Rules · AGENTS.md](https://cursor.com/docs/rules)

---

## Skills

**What:** An Agent Skills directory: `SKILL.md` plus optional `scripts/`, `references/`, `assets/`. Discovered at startup. The agent uses `description` to decide relevance; you can also type `/skill-name`.

**Why:** Always-on rules consume the window every turn. Long runbooks should load on demand.

**Versus Commands:** Commands run when you type `/`. Skills may auto-apply unless `disable-model-invocation: true`. Cursor 2.4 ships `/migrate-to-skills` for dynamic rules and slash commands.

**Built-ins** (official table, not a product inventory): `/create-rule`, `/create-skill`, `/create-subagent`, `/review-bugbot`, `/babysit`, and others. Recheck [Skills](https://cursor.com/docs/skills) before documenting a slash name.

**Docs:** [Skills](https://cursor.com/docs/skills)

---

## Commands

**What:** Markdown in `.cursor/commands/`, `~/.cursor/commands/`, or Dashboard Team Commands. Listed when you type `/`.

**Why:** Prompts you run many times a day with a fixed script (open a PR, apply an issue template) without packing a Skill.

**Status:** Official page still says beta. Do not declare them removed.

**Docs:** [Commands](https://cursor.com/docs/context/commands)

---

## MCP

**What:** Model Context Protocol. Transports: `stdio`, `SSE`, `Streamable HTTP`.

**Why:** Without it you paste Figma JSON and Sentry traces into chat. With it the agent pulls live systems.

**Versus Hooks:** MCP is a tool the agent can call. A hook is *your* script around a call. They stack: a hook can audit or block an MCP tool.

**Safety:** Servers run code and call APIs as you. Official notes: trusted sources, least-privilege keys, read the source for anything important.

**Docs:** [MCP](https://cursor.com/docs/mcp)

---

## Hooks

**What:** Processes spawned on Agent / Tab / workspace events. JSON over stdin/stdout. They can observe, block, or change behavior.

**Why:** Models will not reliably “always run prettier” or “never `DELETE` production.” Hooks keep policy outside the prompt.

**Three families:** Agent hooks, Tab hooks, `workspaceOpen`. Cloud agents run command-based **project** hooks only (no home-dir hooks, no prompt-based hooks). Reasons are in the official Hooks page (read-only early turns, no IDE session boundary, etc.).

**Docs:** [Hooks](https://cursor.com/docs/hooks)

---

## Subagents

**What:** Specialists the parent can spawn. Own context window. Foreground (blocking) or background (parallel).

**Why:** Official built-ins came from conversations that blew the window:

| Subagent | Job | Why isolated |
|----------|-----|--------------|
| Explore | Search and analyze | Huge intermediate output; faster model; many parallel searches |
| Bash | Shell series | Noisy logs |
| Browser | Browser MCP | DOM / screenshots |

**Versus Skills** (official table): isolation, parallelism, multi-step expertise → subagent. One-shot repeatable action → skill.

**Cost:** Each subagent burns its own tokens. Simple work is often faster on the parent.

**Docs:** [Subagents](https://cursor.com/docs/subagents)

---

## Modes

**What:** Constraints on one agent, not four products.

| Mode | Constraint |
|------|------------|
| Agent | May edit and run commands |
| Ask | Read-only (changelog: search tools included; `@Codebase` tool gone) |
| Plan | Research, questions, editable plan; code after approval |
| Debug | Hypotheses → instrumentation → you reproduce → evidence |

**Why:** Default Agent wants to write code. Plan separates *what* from *how*. Debug stops unmotivated edits. Ask keeps an orientation thread from touching files.

**Docs:** [Overview](https://cursor.com/docs/agent/overview), [Plan](https://cursor.com/docs/agent/plan-mode), [Debug](https://cursor.com/docs/agent/debug-mode)

---

## Tab

**What:** A completion model. Accept (`Tab`) and reject (`Esc`) become signal for later suggestions.

**Why:** A full agent turn is the wrong tool for “change the next three lines.” Tab uses recent edits, lints, and accepted suggestions.

**Not Chat.** No tool loop. It does not treat your Rules folder as a task brief.

**Docs:** [Tab](https://cursor.com/docs/tab/overview)

---

## Bugbot

**What:** A service that reviews a PR diff (or the local diff `/review-bugbot` sees). It looks for bugs, security issues, and quality problems, then comments with fix ideas.

**Why:** Humans fatigue on large AI diffs. Bugbot reruns on each push and can follow `.cursor/BUGBOT.md` / team rules.

**Not Debug Mode.** Debug instruments your workspace. Bugbot reads a diff; it does not boot your app. The old overview matrix called Bugbot a “runtime debugger.” That was wrong.

**Autofix:** Official feature name. It spawns a Cloud Agent to patch findings. There is no separate 2026 product page titled Fixer.

**Docs:** [Bugbot](https://cursor.com/docs/bugbot)

---

## Checkpoints

**What:** Automatic snapshots of files the agent is about to change. Preview and Restore from the timeline.

**Why:** Exploration and large refactors need an undo that is not “one more prompt.” Checkpoints are not git commits and not Plan files.

**Docs:** [Agent Overview · Checkpoints](https://cursor.com/docs/agent/overview)

---

## Codebase Indexing

**What:** The repo is chunked at function/class granularity, embedded, and searched by meaning. “Where is the top nav?” can hit `header.tsx`.

**Why:** grep misses synonyms. Official claim: embeddings are computed at index time, so agent search is faster and cheaper.

**Privacy (official):** paths encrypted; source not stored in plaintext long-term; processed in memory while indexing. Defaults exclude `.gitignore` / `.cursorignore`. Semantic search is available around **80%** index completion. Idle indexes are deleted after about six weeks.

**Docs:** [Semantic search](https://cursor.com/docs/context/semantic-search)

---

## Privacy Mode

**What:** A governance switch. When on, Cursor and model providers **do not train on your code**. On by default for Enterprise teams.

**Why:** Two exits exist: LLM requests, and (optional) encrypted repo copies for Cloud Agents. Privacy Mode is about training / retention promises. It is **not** “code never leaves the machine.”

**Cloud Agents:** Officially the only feature that requires Cursor to store code. If policy forbids storage, leave Cloud Agents off. Everything else still works.

**Docs:** [Privacy and Data Governance](https://cursor.com/docs/enterprise/privacy-and-data-governance)

---

## Cloud Agents

**What:** Agents on isolated VMs. They clone, branch, work, and open PRs. Start from the editor Cloud dropdown, [cursor.com/agents](https://cursor.com/agents), [mobile](https://cursor.com/docs/cloud-agent/mobile), Slack / GitHub / Linear `@cursor`, or a CLI message prefixed with `&`.

**Former name:** Background Agents (official Naming History). Do not document them as two products.

**Why:** Work that should not occupy the local window: drive-by bugs, tests, docs, many parallel runs. Cousins: Claude remote / Dispatch, Gemini Jules.

**Versus local subagents:** Local children use your machine and local MCP. Cloud uses team MCP and the cloud environment.

**Versus Bugbot:** Cloud *edits* a repo. Bugbot *reviews* a PR diff. Autofix is the bridge.

**Docs:** [Cloud Agent](https://cursor.com/docs/cloud-agent), [Setup](https://cursor.com/docs/cloud-agent/setup), [agent-best-practices](https://cursor.com/blog/agent-best-practices)

---

## Cursor CLI

**What:** Official terminal entry. The binary is **`agent`**. Interactive session or `agent -p` for headless / CI. Same Agent / Ask / Plan modes. Loads `.cursor/rules`, `AGENTS.md`, and `CLAUDE.md`.

**Why:** You are already in SSH / tmux / CI and should not open a GUI just to reuse the same rules. This is another surface of the same agent, not a third model.

**Versus editor / Cloud:** The editor has Tab and Inline Edit; the CLI does not. Cloud runs on an isolated VM; the CLI edits the current working tree unless you pass `--worktree`. Prefix a message with `&` to hand off to Cloud.

**Docs:** [CLI Overview](https://cursor.com/docs/cli/overview), [Installation](https://cursor.com/docs/cli/installation), [Headless](https://cursor.com/docs/cli/headless)
