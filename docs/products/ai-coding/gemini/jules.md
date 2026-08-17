# Jules

> An asynchronous cloud coding agent. You create a task locally and walk away; it clones the repo in a cloud VM, executes, and produces a pull request.

## What it is for

The essential difference between Jules and the rest of the family is that **you are not there**.

That single fact explains its whole design: because nobody is supervising, it produces a plan for your approval first; because the output needs review, it delivers a PR instead of editing your workspace; because the environment is not your machine, it needs `AGENTS.md` to learn how to install dependencies and run tests.

| Dimension | Jules |
|---|---|
| Where it runs | cloud VM |
| Who starts it | you create a task on the web or CLI, then leave |
| Deliverable | a pull request |
| Human checkpoint | plan approval before execution |
| Suits | clearly bounded, mechanical, time-consuming work |

Quota rises with the Google AI subscription tier, but the official comparison table is **qualitative only** — task count and concurrent task count increase per tier, with no specific numbers given. See [subscription tiers in the cheatsheet](./gemini-cheatsheet#subscription-tiers).

## Step one: write AGENTS.md

**Do not skip this.** Jules automatically reads `AGENTS.md` from the repository root. Without it, Jules can only guess how your project runs, and output quality drops noticeably.

```markdown
# AGENTS.md

## Environment
- Node 22, pnpm as the package manager
- Install: pnpm install --frozen-lockfile

## Verification
- Type check: pnpm typecheck
- Tests: pnpm test
- Both must pass before opening a PR

## Off limits
- src/legacy/ is read-only
- Do not touch any lock file other than pnpm-lock.yaml
- Do not modify .github/workflows/
```

Writing tip: **give commands, not descriptions**. "Install dependencies with pnpm" is far less useful than `pnpm install --frozen-lockfile`.

## Install and use

```bash
npm install -g @google/jules
```

The first run requires authorising your Google account in a browser.

### Interactive board

Run `jules` with no arguments for the interactive TUI, which shows task status and side-by-side diffs:

```bash
jules
```

### Common commands

```bash
jules help
jules version

jules remote --help
jules remote list --repo                 # list repositories
jules remote list --session              # list sessions

# create a task
jules remote new --repo <owner/repo> --session "upgrade React to 19 and fix the breaking changes"

# run several tasks in parallel
jules remote new --parallel <number>

# pull the result locally
jules remote pull --session <id>

# shell completion
jules completion bash

# global options
jules --theme dark                       # dark / light
```

> ⚠️ The npm package is `@google/jules`. The `@google/jules-tools` package and the `jules status`, `jules task list`, `jules pr apply`, `jules remote new "<description>"` (missing `--repo` / `--session`) and `--issue=` forms found in older docs do not exist. Do not copy them.

## What to hand to Jules

The test is **whether the boundary is clear**, not how big the task is.

| Good fit | Why |
|---|---|
| Dependency / framework upgrades | clear goal, clear verification (do the tests pass) |
| Tech-debt cleanup (adding types, deleting dead code) | mechanical, time-consuming, needs no architectural judgement |
| Bulk renames and formatting alignment | the rules can be stated exhaustively |
| Filling in tests | there is an explicit coverage target |

| Poor fit | Why |
|---|---|
| Refactors that need architectural decisions | unsupervised, it must pick a direction on its own, and you will probably reject it afterwards |
| Exploratory work ("see if performance can be improved") | no acceptance criteria, so the output cannot be judged |
| UI work that needs tweaking as you look at it | the feedback loop is broken; use [Antigravity](./antigravity) |

## The parallelism trap

`--parallel` is tempting, but **tasks that touch the same files collide**.

Split along **directory or module** boundaries:

```
✅ Task A: add types in src/features/auth/
   Task B: add types in src/features/billing/

❌ Task A: add types across the whole project
   Task B: delete dead code across the whole project   ← guaranteed conflict
```

**Do not split by "these feel convenient together".** If two tasks could touch the same file, run them serially.

## Common problems

**The PR heads in the wrong direction**: go back to the plan-approval step. A minute spent reading the plan is much cheaper than redoing a PR afterwards.

**It cannot install dependencies, or tests will not run**: the commands in `AGENTS.md` are incomplete or stale. This is the most common failure cause.

**Several PRs conflict with each other**: the parallel task boundaries were not clean. See the section above.

## Choosing between this and the others

The full comparison table is in the [cheatsheet](./gemini-cheatsheet#antigravity-vs-code-assist-vs-jules).

The one-line version: **work you can write acceptance criteria for and are willing to wait on goes to Jules, work you need to verify as it happens stays with [Antigravity](./antigravity), small in-editor changes go to [Code Assist](./code-assist).**

## Official resources

- [Jules docs](https://jules.google/docs/)
- [Jules CLI command reference](https://jules.google/docs/cli/reference/)

## Related pages

- [Cheatsheet](./gemini-cheatsheet#jules) — CLI command quick reference
- [Glossary](./gemini-glossary#agents-md) — how `AGENTS.md` differs from the other instruction files
- [Cookbook](./gemini-cookbook#_10-dependency-upgrades-slow-and-mechanical) — the dependency upgrade recipe
