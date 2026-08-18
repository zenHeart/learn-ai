# Copilot Cookbook

> This is a **task-oriented** page — each section solves one problem; skip to the one you need. Concepts: [Glossary](./copilot-glossary). Parameters: [Cheatsheet](./copilot-cheatsheet). From zero: [Tutorial](./copilot).
>
> Prerequisite: Copilot is installed and you are signed in. See the [tutorial](./copilot).

## Prompting principles

Read these two PE primers first, then the Copilot-specific notes below:

- [A Beginner's Guide to Prompt Engineering with GitHub Copilot](https://dev.to/github/a-beginners-guide-to-prompt-engineering-with-github-copilot-3ibp) — if you have never used Copilot or prompt engineering
- [ChatGPT Prompt Engineering for Developers](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction) — Andrew Ng with OpenAI engineers

### Simple tasks: the 3S rule

**Simple, Specific, Short.**

| ❌ bad | ✅ good |
|--------|--------|
| write a function that handles the data | Write a function that takes `User[]`, sorts by `createdAt` descending, and returns the first 10 |
| optimize this | Rewrite this `for` loop as `reduce` and keep the behavior identical |
| add some tests | Write Jest tests for `calculateTotal` covering empty array, one element, and negative numbers |

The left column is not "too short." It has **no verifiable done-state**, so Copilot has to guess.

### Complex tasks: background first, then one step at a time

Dump a large job in one shot and Copilot will decide things you did not expect. Align context, then walk:

```
Turn 1: This repo is Next.js 15 App Router + Drizzle ORM on Postgres.
        I need a user-export-to-CSV feature.
        Do not write code yet. Tell me which files you would change
        and which endpoints you would add.

Turn 2: (after you accept the plan) Implement the server action only. No UI.

Turn 3: Add the trigger button. Use the existing <Button> component.
```

The value of three turns is that **you can verify at the end of each one**. One giant dump hides which judgment failed.

### Context injection: highest leverage move

Cheapest first:

1. **Open the relevant files** — open editor tabs enter the context. Open module B before you change A.
2. **Cite explicitly** — `#file:path` beats "go find it."
3. **Select, then ask** — the selection becomes the focus.
4. **Write custom instructions** — pay once, every later turn benefits. See [Cheatsheet · Custom instructions](./copilot-cheatsheet).

> Cheap test for "is there enough context?": **make it restate first.** "Before you edit, summarize the current implementation in three sentences." If the restatement is wrong, do not let it touch code.

### Safety

- **Always review generated code**, especially auth checks, SQL string building, cryptography, and payments.
- **Use automated tests as a guardrail**: have Copilot write tests, confirm the tests are right, then let it change the implementation. The reverse is letting it grade its own exam.
- **Public-code match**: when you need to know whether a suggestion closely matches a public repo, use the [official matching log](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code).

---

## Writing code in the editor (completion + inline Chat)

When completion is the right tool:

| Scenario | What to do |
|----------|------------|
| Help generate code | Write a signature or a one-line comment of intent, wait for ghost text, `Tab` |
| Refactor or fix | Select → `⌘I` inline Chat → say the target state |
| Explain | Select → `/explain` in Chat |
| Add comments | Select → `/doc` |
| Generate tests | Select → `/tests`, optionally `/tests using the Jest framework` |

**Comment-driven completion:**

```ts
// ❌ bad: vague intent, Copilot can only guess
// handle users

// ✅ good: inputs, outputs, and edges are stated
// Filter users active within the last 30 days with a verified email,
// return an array sorted by lastActiveAt descending
```

---

## Working in the terminal

Two paths, pick by "do I need multiple turns?":

**One-shot command help** — `⌘I` inline Chat in the terminal, or `@terminal`:

```
@terminal find the largest file in the src directory
```

To debug the last failed command, pull it in with `#read` (`/terminalLastCommand`).

**Multi-turn terminal work** — use [Copilot CLI](./copilot-cheatsheet):

```bash
copilot            # start an interactive session
```

Inside a session: `@ filename` to cite a file, `! command` to run a shell command, `Shift+Tab` to cycle standard / plan / autopilot.

**Only want to understand one command** (no agent): do not install `gh copilot` — it is [officially retired](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli) and replaced by the standalone `copilot` CLI. The old `explain` / `suggest` commands are kept for reference in [Cheatsheet · Retired `gh copilot`](./copilot-cheatsheet#retired-gh-copilot).

---

## Multi-file changes with Chat

Pick the mode by how sure you are (table: [Cheatsheet · Mode selection](./copilot-cheatsheet)):

**Edit mode, standard flow:**

1. Put the files in context (drag them in, or `#file:`)
2. State the goal **and** the fence: "Split `calculateTotal` into three pure functions. **Do not change its exported signature.**"
3. Review every diff. Accept or discard.

**Agent mode, standard flow:**

1. Ask for a plan first: `/plan`, or "do not edit yet; list the steps"
2. Confirm the plan, then let it run
3. Approve commands one by one (never approve a command you do not understand)
4. Run tests when it finishes

> Recurring pitfall: in Agent mode, "and tidy the formatting while you are at it" produces a diff that is 90% noise. **One job per turn.**

---

## Reusing prompt files

Save a task you keep re-describing as `.prompt.md`, then invoke it with a slash command.

**Where they live** (full table: [Cheatsheet · Prompt files](./copilot-cheatsheet)):

- Shared with the team: `.github/prompts/*.prompt.md` (commit it)
- Personal, cross-repo: `.prompt.md` in a VS Code [profile](https://code.visualstudio.com/docs/configure/profiles), syncable

**Shape**: frontmatter + Markdown body.

```markdown
---
mode: 'agent'
tools: ['githubRepo', 'codebase']
description: 'Generate a new React form component'
---
Your goal is to generate a new React form component based on the templates in #githubRepo contoso/react-templates.

Ask for the form name and fields if not provided.

Requirements for the form:
* Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
* Use `react-hook-form` for form state management
* Always define TypeScript types for your form data
* Prefer *uncontrolled* components using register
* Use `defaultValues` to prevent unnecessary rerenders
* Use `yup` for validation:
  * Create reusable validation schemas in separate files
  * Use TypeScript types to ensure type safety
  * Customize UX-friendly validation rules
```

Frontmatter fields:

- `mode` — `ask` / `edit` / `agent` (concepts: [Glossary](./copilot-glossary))
- `tools` — allowed tools; list in [Cheatsheet · Tool sets](./copilot-cheatsheet)
- `description` — one-liner shown in the slash-command list

**Body**: Markdown, relative file links, `#` tool refs, and includes from other prompt files.

**Invoke** in Chat with `/filename`, optionally with args:

```
/create-react-form: formName=MyForm
```

**Debug**: open the prompt file and hit the play button in the editor toolbar. Faster than trial-and-error in Chat.

**Migrating from Cursor**: if you already have Cursor rules, point `chat.promptFilesLocations` at that directory instead of moving files.

---

## Capturing project conventions (custom instructions)

Rule of thumb: **if you have written the same sentence in a prompt more than three times, it belongs in custom instructions.**

Start with one file, `.github/copilot-instructions.md`:

```markdown
# Project conventions

- TypeScript strict mode, `any` is not allowed (`unknown` + type guards)
- Function components + hooks only, never class components
- State with Zustand, do not introduce Redux
- Tests with Vitest; assert objects with `expect().toEqual()`, not `toBe`
- Conventional Commits for messages
```

Authoring:

- Write **"don't" and "which one"**, not "write good code" — the latter does not constrain the model.
- **One verifiable sentence per line.** "Be elegant" is useless. "Split functions longer than 40 lines" is useful.
- **Path-scoped** rules go in `.github/instructions/**/*.instructions.md` with a glob in the frontmatter (for example, only `**/*.test.ts`).

The five official scopes: [Cheatsheet · Custom instructions](./copilot-cheatsheet).

---

## Delegating to the cloud (Cloud agent)

Use it for work that is **well-scoped, time-consuming, and does not need you watching**. Typical path: describe the task on a GitHub Issue, assign Cloud agent; it opens a branch, edits, and (when you want) a PR.

It cannot see the constraints in your head. Write them down.

```
❌ bad: replace all the old API calls

✅ good:
Replace every `fetchLegacy(` call under src/ with `apiClient.request(`.
Argument mapping: first argument `url` stays; in the second argument
`options`, rename `body` to `data`.
Do not touch tests/. When you are done, `pnpm test` must pass.
```

As of the [2026-04-01 changelog](https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/), Cloud agent is no longer "always open a PR":

- Ask it to **research** the repo before it writes code.
- Ask it to produce an **implementation plan** and wait for your approval.
- Let it work on a **branch without opening a PR**, review the diff, then click Create pull request — or say in the prompt that you want a PR at the end.

On Copilot Business / Enterprise an admin must enable Cloud agent. Concepts and the local-Agent contrast: [Glossary · Cloud agent](./copilot-glossary).

---

## GitHub Spark (do not start new apps)

Spark was a natural-language micro-app builder on github.com. **Do not start a new one.**

From [2026-08-04](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/):

- No new users, no new apps.
- Existing users can open the Spark workbench, choose `…` → **Create repository**, and export before **2026-08-31**.
- Apps you already deployed keep running. If the app calls `llm()`, that API died with GitHub Models on 2026-07-30 — replace it with your own provider.

If you want a small web app today, use the IDE, Copilot CLI, or the Copilot app. Spark is an index node only; it does not get its own page.

---

## Connecting external tools (MCP)

When Copilot needs your database, an internal API, or a third-party service, attach an MCP server. Its tools then show up in the `#` list and behave like built-in tools.

**Currency**: GitHub App **Copilot Extensions sunset on 2025-11-10**. MCP is the official replacement. Old tutorials that say "invoke the extension with `@extension-name`" are dead. See [retired concepts](./copilot-glossary).

VS Code **client-side** Chat extensions (participants / tools via the VS Code extension API) **are still supported**. Dev guide: [Chat extensions](https://code.visualstudio.com/api/extension-guides/chat).

Do not confuse MCP / the new **Plugins** pack (agents + skills + hooks) with the sunset GitHub App Extensions. [Glossary · Plugins](./copilot-glossary).

---

## When "Copilot is bad"

Walk this list. Most problems die in the first two steps:

1. **Is there enough context?** Relevant files open? `#file:` used? Custom instructions written?
2. **Is the prompt checkable?** Verifiable done-state? Explicit "do not touch X"?
3. **Is the mode right?** Complaining that Ask mode "won't edit files" is this bucket.
4. **Is the model right?** Available models differ by plan. Retry a hard task on another model.
5. **Only then is it a product bug** — [Cheatsheet · Troubleshooting](./copilot-cheatsheet).

---

## Related pages

- [Copilot tutorial](./copilot) — what to install, how to start
- [Copilot Cheatsheet](./copilot-cheatsheet) — keys / commands / config / plans
- [Glossary](./copilot-glossary) — concepts and the retired list
