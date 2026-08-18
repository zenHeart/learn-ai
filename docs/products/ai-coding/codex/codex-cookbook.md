# Codex Cookbook

> A **task-oriented** page: each section answers "how do I get X done." It assumes Codex is already installed and you are logged in.
>
> Supporting reading: [Codex Glossary](./codex-glossary) for what the concepts mean, [Codex Cheatsheet](./codex-cheatsheet) for looking up a flag or key, [Codex CLI](./codex-cli) for installation and the basics.

## Three principles

Everything below is an application of the same three ideas.

**Give context before you give instructions.** A prompt that names the files, the constraints, and the definition of done gets a usable answer on the first try. A prompt that says "fix the bug" starts a guessing game.

**Make it verify its own work.** Codex can run your tests, your type checker, and your linter. If you don't tell it to, it will hand you code it never executed.

**One session, one job.** Context is finite and compaction is lossy. A session that drifted from "add a feature" through "fix CI" into "refactor the build" produces worse output than three clean sessions.

## Part 1: Everyday development

### 1. Understand an unfamiliar codebase

Start read-only so nothing can change while you're still orienting yourself.

```bash
codex --sandbox read-only
```

```
Give me a map of this repository: the entry points, the main modules and what each
is responsible for, how data flows between them, and anything that looks unusual
or surprising. Don't propose changes yet.
```

Then drill down:

```
Trace what happens when a request hits POST /api/orders — every file and function
it passes through, in order.
```

```
Where is authentication enforced? List every place a request can bypass it.
```

**Tips**

- Ask for a map before asking about a specific file. The map tells you which file to ask about.
- Ask "what looks unusual" — that question surfaces the tribal knowledge no README contains.
- Use `--cd` in a monorepo so it isn't reading twelve unrelated services.

### 2. Fix a bug efficiently

Weak prompt:

```
The login page is broken, fix it.
```

Strong prompt:

```
Users with a "+" in their email address can't log in. The request reaches
src/auth/login.ts and returns 401. Reproduce it with:
  pnpm test src/auth/login.test.ts -t "plus addressing"
Find the root cause, fix it, and make that test pass. Don't change the
public signature of authenticate().
```

The difference is four things: the symptom, where it surfaces, how to reproduce it, and what you're not allowed to break.

**Key principle:** give it a reproduction command. A bug it can trigger is a bug it can confirm it fixed.

### 3. Refactor

Refactoring goes wrong when the target state is vague. Anchor it to a rule and a verification step.

```
src/services/ has four files that each build their own HTTP client with duplicated
retry logic. Extract one shared client into src/lib/http.ts and migrate all four
call sites.

Constraints:
- No behavior change. Same retry counts, same timeouts, same error types.
- Run `pnpm test && pnpm typecheck` when you're done and show me the output.
- If a call site's behavior can't be preserved by the shared client, stop and tell
  me instead of changing the behavior.
```

That last line matters. Without it, an agent facing an awkward call site will quietly "improve" it.

### 4. Write tests

```
src/lib/pricing.ts has no tests. Write them.

Cover: the normal path, zero-quantity, negative discounts, currency rounding at
0.005, and the two error branches. Use the existing test style in
src/lib/*.test.ts. Run the suite and show me the result.
```

To find gaps instead of writing tests:

```
Read src/lib/pricing.ts and its test file. List the behaviors that are NOT covered,
ordered by how likely each is to cause a production incident. Don't write any code.
```

### 5. Create a pull request

```
Commit the current changes and open a PR.

- Conventional commit message, scope `pricing`
- PR body: what changed, why, and how I can verify it locally
- Link issue #412
```

**Tip:** ask for a `git diff` review first — `/diff` in the TUI — before letting it commit. It is much easier to correct a diff than to unwind a commit.

### 6. Work on documentation

```
The README install section is out of date: it still says npm, but this project
uses pnpm and now requires Node 20. Update it. Don't touch anything else in the
README, and don't add sections that weren't there.
```

Docs tasks fail in a specific way: the agent helpfully rewrites the whole file. "Don't touch anything else" is not redundant.

### 7. Work in a non-code directory

Codex is not limited to repositories.

```bash
codex --cd ~/notes/research
```

```
These 40 markdown files are meeting notes from the last quarter. Build me an
index.md that groups them by project, with a one-line summary of each and the
open action items pulled out into a single list at the top.
```

### 8. Use an image as input

```bash
codex -i screenshot.png "This is what the settings page renders as. The spacing between the toggle rows is wrong. Find the CSS responsible and fix it."
```

```bash
codex --image before.png,after.png "The left shot is the design, the right is the current build. List every difference you can see, then fix the ones that are CSS-only."
```

PNG and JPEG are supported.

## Part 2: Communicating effectively

### Vague versus specific

| Aspect | Vague | Specific |
| --- | --- | --- |
| Target | "fix the tests" | "make `pnpm test src/auth` pass" |
| Scope | "clean up this file" | "extract the duplicated validation in lines 40-120 into one function" |
| Constraint | "don't break anything" | "the public signature of `authenticate()` must not change" |
| Done | "make it better" | "typecheck passes and the two new tests pass" |
| Style | "use good patterns" | "follow the pattern already used in `src/services/orders.ts`" |

### Ways to supply context

| Method | Good for | Notes |
| --- | --- | --- |
| `@` file search | Pointing at specific files | Fuzzy search over the workspace root |
| `AGENTS.md` | Facts that are true every session | Loaded automatically, every run |
| `--add-dir` | Code outside the workspace | Repeatable |
| `-i` / `--image` | Visual bugs, designs, error screenshots | PNG / JPEG |
| `!` prefix | Showing it real command output | Runs under the current sandbox |
| `/mention` | Referencing a connector app | `$app-slug` syntax |

### Let Codex interview you

For a task where you know the goal but not the design:

```
I want to add rate limiting to the public API. Before you write anything,
interview me about the requirements. Ask at most three questions at a time,
and wait for my answers before asking more.
```

The three-question cap is what makes this work. Without it you get a twenty-question wall of text that is impossible to answer usefully.

## Part 3: Making Codex verify itself

### Verification strategies

| Strategy | How | When |
| --- | --- | --- |
| Run the tests | "run `pnpm test` and show the output" | Anything touching logic |
| Type check | "run `pnpm typecheck`" | Anything touching types |
| Write the test first | "write a failing test, then make it pass" | Bug fixes |
| Second opinion | Separate read-only session reviews the diff | High-risk changes |
| Structured review | `/review` | Before a release |

### Match depth to risk

| Risk | Verification |
| --- | --- |
| Low — docs, comments, formatting | Read the diff yourself |
| Medium — a feature in one module | Tests plus type check, in the same session |
| High — auth, payments, data migration | Failing test first, then a separate read-only review session |
| Unfamiliar code | Read-only exploration session first, then a separate session to change anything |

### Adversarial review

Start a second session in read-only mode:

```bash
codex --sandbox read-only --profile review
```

```
Review the uncommitted changes in this repository as a hostile reviewer. Look for
real defects: incorrect logic, unhandled errors, race conditions, security issues,
broken edge cases.

Do not invent minor suggestions to fill out a list. If the change is fine, say so.
```

The last line is the important one. Ask an agent to review code and it will find something to say; tell it that "no issues" is an acceptable answer and the findings you do get are worth reading.

### Structured review with `/review`

In the TUI, `/review` offers four presets:

- Diff against the merge base of the base branch
- Uncommitted changes only
- A specific commit SHA
- Custom instructions

Use the base-branch diff before opening a PR, and uncommitted changes as a pre-commit gate.

### Verification patterns

| Pattern | Shape | Good for |
| --- | --- | --- |
| Writer → Reviewer | One session writes, a second read-only session critiques | High-risk changes |
| Test → Iterate → Pass | Failing test first, loop until green | Bug fixes |
| Plan → Implement → Verify | `/plan`, then implement, then run checks | Multi-file features |

## Part 4: Managing sessions

### Lifecycle

```bash
codex                         # new session
codex resume --last           # pick up where you left off
codex resume                  # choose from a list
codex resume <SESSION_ID>     # a specific one
codex resume --all            # see everything
```

Session IDs come from the picker, from `/status`, or from `~/.codex/sessions/`.

### In-session commands

| Command | Effect |
| --- | --- |
| `/clear` | Start clean, same directory |
| `/compact` | Compress the older context and keep going |
| `/new` | New session |
| `/fork` | Branch from the current state |
| `/diff` | Show what changed on disk |
| `/status` | Session and config state |
| `/usage` | Consumption (`daily`, `weekly`, `cumulative`) |
| `/plan` | Plan before acting |
| `/goal` | Set a persistent objective (max 4,000 chars) |

### Steering mid-run

| Key | Effect |
| --- | --- |
| `Esc` `Esc` | On an empty composer, edit your previous message; `Enter` forks from there |
| `Tab` | Queue a follow-up instead of interrupting |
| `Ctrl+C` | Stop |
| `Ctrl+R` | Search prompt history |
| `Ctrl+G` | Compose in `$EDITOR` |

### Context strategy

| Situation | Do |
| --- | --- |
| New, unrelated task | `/clear` or `/new` |
| Same task, long history | `/compact` |
| Want to try two approaches | `/fork` |
| Answers getting vaguer | Context is saturated — clear or compact |
| Need to know what's loaded | `/status`, or `/debug-config` for config layers |

## Part 5: Automation and extension

### Non-interactive runs

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize the changes since main"
codex --ask-for-approval never exec "regenerate the API client from openapi.yaml"
codex exec resume --last "now add tests for the function you just changed"
```

`--json` gives you structured events, which is what you want when something downstream parses the output. Web search results appear as `web_search` items in that stream.

Need a typed final payload for a script? Official non-interactive docs support `--output-schema`. Keep the schema in the repo next to the caller:

```ts
// schema.ts — source of truth for the JSON Schema you pass to --output-schema
export interface ProjectMetadata {
  project_name: string
  programming_languages: string[]
}

export const projectMetadataSchema = {
  type: 'object',
  properties: {
    project_name: { type: 'string' },
    programming_languages: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['project_name', 'programming_languages'],
  additionalProperties: false,
} as const
```

```bash
codex exec "Extract project metadata" \
  --output-schema ./schema.json \
  -o ./project-metadata.json
```

Write `schema.json` from the object above; do not invent extra fields. See [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### Isolate with a separate Codex home

```bash
CODEX_HOME=$(pwd)/.codex codex exec "list active instruction sources"
```

This gives the run its own config, sessions, and logs. Useful for CI, and for keeping a work identity separate from a personal one.

### Parallel sessions

Multiple sessions in the same repository are fine as long as they touch different files. Give each one an explicit scope:

```bash
codex --cd packages/api "..."     # terminal 1
codex --cd packages/web "..."     # terminal 2
```

### Writer / Reviewer pair

| Role | Invocation | Job |
| --- | --- | --- |
| Writer | `codex` (default `workspace-write`) | Implement |
| Reviewer | `codex --sandbox read-only` | Critique the diff, change nothing |

The read-only sandbox is what makes this trustworthy: the reviewer cannot "helpfully" apply its own suggestions.

### Remote use

Run the server where the code lives:

```bash
codex app-server --listen ws://127.0.0.1:4500
```

Connect from elsewhere:

```bash
codex --remote ws://127.0.0.1:4500
```

`--remote` accepts `ws://`, `wss://`, and `unix://`. Bearer tokens are only sent over `wss://` or local-only `ws://` — see the [Cheatsheet](./codex-cheatsheet#remote-and-cloud) for the auth flags.

### Cloud execution

```bash
codex cloud                                          # browse environments; Ctrl+O reveals IDs
codex cloud exec --env <ENV_ID> "run the migration dry run"
codex cloud exec --env <ENV_ID> --attempts 3 "..."   # 1-4 attempts
```

`--attempts` runs the task several times so you can compare results — worth it when the outcome is nondeterministic.

## Part 6: Failure modes and how to avoid them

**The kitchen-sink session.** One session that started as a bug fix and is now also refactoring the build and updating docs. Context is saturated, earlier detail has been compacted away, output quality drops. → One session, one job. `/clear` between tasks.

**The correction loop.** You've told it three times to stop doing the same thing. It keeps doing it because your correction is buried in a long history. → `/clear`, then restate the task with the constraint in the opening prompt. If the constraint is permanent, it belongs in `AGENTS.md`.

**AGENTS.md bloat.** The file grew to cover every rule anyone ever thought of, and now guidance gets silently dropped when the combined size hits `project_doc_max_bytes` (32 KiB by default). → Keep it to facts that change behavior. Move situational guidance into prompts.

**The trust-and-verify gap.** You accepted a change because it looked right, and it broke in CI. → Never accept a logic change without a verification command. "Run the tests and show me the output" costs one line.

**Endless exploration.** It's been reading files for five minutes and hasn't done anything. → Give it a starting point and a boundary: "start from `src/api/routes.ts`, don't read outside `src/api/`."

**Forgetting that project config needs trust.** You wrote `.codex/config.toml` and nothing happened. → Project-scoped config only loads for trusted projects, and some keys can't be set at project scope at all. Run `/debug-config` to see the layers actually in effect.

## Part 7: AGENTS.md in practice

### What belongs in it

- Tooling facts: which package manager, which test command, which type checker
- Boundaries: directories not to touch, files that are generated
- Conventions the code follows that aren't obvious from reading one file
- Verification steps you always want run
- Code review rules under a `## Code Review Rules` heading

### What doesn't

- Anything that changes per task — put that in the prompt
- Long prose explanations of your architecture — it costs budget and rarely changes behavior
- Rules the linter already enforces
- Secrets, tokens, or internal hostnames

### Discovery and merge order

Codex builds the instruction chain before doing any work, and rebuilds it on every run — there is no cache to clear.

| Level | Where | Which file |
| --- | --- | --- |
| Global | Codex home (`~/.codex`, or `CODEX_HOME`) | `AGENTS.override.md` if present, otherwise `AGENTS.md` — only the first non-empty file at this level |
| Project | From the project root (usually the Git root) walking down to the current directory | In each directory: `AGENTS.override.md`, then `AGENTS.md`, then any name in `project_doc_fallback_filenames` — at most one file per directory |

Files are concatenated root-first, joined with blank lines. **Files closer to your current directory come later, so they override earlier guidance.** Empty files are skipped, and Codex stops adding once the combined size reaches `project_doc_max_bytes` (32 KiB default).

```toml
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
project_doc_max_bytes = 65536
```

`AGENTS.override.md` in your Codex home is the clean way to apply a temporary global override without editing your real `AGENTS.md`.

### Audit what actually loaded

```bash
codex --ask-for-approval never "Summarize the current instructions."
codex --cd services/payments --ask-for-approval never "List the instruction sources you loaded."
```

Or read the logs:

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

You can also inspect the newest `session-*.jsonl` in your sessions directory.

### Code review rules

Put a `## Code Review Rules` section in the `AGENTS.md` closest to the code it governs. From the official documentation:

```markdown
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

Note the shape: a specific mistake, then the safe alternative. "Be careful with experiments" would do nothing.

## Part 8: Choosing an extension point

| Extension point | Use it when | Takes effect |
| --- | --- | --- |
| `AGENTS.md` | You want to state facts and conventions in prose | Read at the start of every run |
| Rules | You want a structured, enforceable constraint | Loaded from trusted project config |
| Skills | You have a repeatable workflow worth packaging | Invoked when relevant |
| MCP | You need data or actions from an external system | Tools available during the session |
| Hooks | A command must run at a lifecycle point regardless of what the model decides | Fires on the event |
| Subagents | A sub-task deserves its own context and config | Only when you ask for it |
| Plugins | You want to distribute the above to a team | Installs the bundle |

Four rules of thumb:

1. If prose can express it, use `AGENTS.md` — it's the cheapest thing to change.
2. If it must happen deterministically, use a hook. Instructions are advice; hooks are mechanism.
3. If it needs to reach outside the machine, use MCP.
4. If more than one person needs it, package it as a plugin.

## Part 9: Batch and cross-file work

For a mechanical change across many files, state the rule and the verification, not the file list:

```
Every file in src/handlers/ imports the logger as `import log from '../log'`.
We've moved it to '@/lib/log'. Update every import. Don't change anything else.
Run `pnpm typecheck` afterwards and show the output.
```

For a change that is mechanical in shape but needs judgment per file, do it in passes:

```
Pass 1: list every file in src/ that catches an error and swallows it without
logging. Just the list, with line numbers. Don't change anything.
```

Then review the list and hand back the subset you actually want changed. This is faster than reviewing a 40-file diff you didn't scope.

## Related pages

- [Codex Glossary](./codex-glossary) — the concepts behind these recipes
- [Codex Cheatsheet](./codex-cheatsheet) — commands, config keys, quality sources
- [Codex CLI](./codex-cli) — installation and core features
- [Project Integration](./integration) — wiring Codex into a real project
- [Learning Map](./) — the full path
