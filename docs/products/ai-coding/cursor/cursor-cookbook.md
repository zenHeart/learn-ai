# Cursor cookbook

Jump in by task. Install and the first edit are in the [tutorial](./cursor#five-minute-first-example). Definitions: [glossary](./cursor-glossary). Knobs: [cheatsheet](./cursor-cheatsheet).

From [Best practices for coding with agents](https://cursor.com/blog/agent-best-practices):

- Say **what** you want; let the agent figure out **how**
- Context is scarce
- Give it a command it can use to check itself

---

## Learn a new repo

```text
How does this repo work? Stack, how to start it, core directories.
I will change user login next. List the files I should read first and the
front-end-to-back-end call chain. Do not modify files.
```

Then:

```text
How do login errors surface in the UI?
Quote existing code. Do not propose a rewrite.
```

Use the project's own words. Do not `@` all of `src/`. Tag a file when you know it. Use `@Commit` / `@Branch` only when the uncommitted or branch diff matters.

---

## Fix bugs

### Ordinary regressions

Paste the **full** error and the command that produced it:

```text
`pnpm test src/auth/session.test.ts` prints the error below.
Reproduce it, find the root cause, then fix it.
Do not silence the test to make it green.

<paste terminal output>
```

Official blog: say how to reproduce, say whether it is intermittent, and say “fix the cause, do not swallow the error.”

### Reproducible but unexplained → Debug Mode

Official Debug Mode ([docs](https://cursor.com/docs/agent/debug-mode), [blog](https://cursor.com/blog/agent-best-practices)):

1. Multiple hypotheses
2. Log instrumentation
3. You reproduce while it collects runtime data
4. It pins the cause from actual behavior
5. A small fix

Use it for races, timing, leaks, and “it used to work.” Vague “sometimes it hangs” wastes the mode.

---

## Ship a multi-file feature

1. `Shift+Tab` into Plan Mode.
2. Describe the result:

```text
Add an “Export current theme as JSON” button on the settings page.
Constraints:
- Settings-related files only
- Reuse the existing Button and download helper
- Export must round-trip through import; write the failing test first
Plan only. Do not edit code until I approve.
```

3. Edit the plan markdown.
4. Approve. If it drifts: **revert, tighten the plan, rerun**. Official wording: often faster than repairing a half-finished agent.
5. **Save to workspace** so another session can resume.

Skip Plan for a one- or two-file change you have done many times.

---

## Write rules that stick

Add a rule after you have corrected the same thing **twice**. Do not dump twenty Always rules on day one.

### Recipe: commands and checks

```markdown
# Commands

- Install: `pnpm install` (never npm / yarn)
- Types: `pnpm typecheck`
- Tests: `pnpm test` (prefer a single file)

# Workflow

- Typecheck after a batch of edits
- API routes live under `app/api/` like the existing files
```

### Recipe: split by directory

```text
.cursor/rules/
  project-commands.mdc    # Always
  ts-modules.mdc          # globs: **/*.{ts,tsx}
  tests.mdc               # globs: **/*.{test,spec}.ts
```

```markdown
---
globs: "**/*.ts,**/*.tsx"
alwaysApply: false
---

Follow `src/components/Button.tsx`.
Do not paste that file into this rule.
```

Anti-patterns: Always rules hundreds of lines long (official cap is 500); pasting ESLint; Always rules for a yearly release ritual — that belongs in a Command or Skill.

Commit rules. On GitHub you can `@cursor` and ask the agent to update them. Team / Enterprise Team Rules outrank project rules.

---

## TDD loop

Official five steps:

1. Write tests. Say you are doing TDD and **not** to mock missing implementations.
2. Run them and confirm they fail. No implementation yet.
3. Commit the tests.
4. Implement only. Do not edit tests. Iterate until green.
5. Commit the implementation.

```text
Write tests for addCents(a: number, b: number): number in src/lib/money.ts.
We are doing TDD: no implementation, no mocks that pretend it exists.
Match the existing __tests__/ layout. Run the tests and confirm they fail.
```

---

## Git / PR commands

Commands are `.cursor/commands/*.md`. Type `/` to run them. Official page: [Commands](https://cursor.com/docs/context/commands). Long workflows that need isolation should be Skills.

`.cursor/commands/pr.md` (adapted from the official `/pr` example):

```markdown
Open a pull request for the current changes.

1. Inspect staged and unstaged changes with `git diff`
2. Write a commit message from the diff
3. Commit and push the current branch
4. Open a PR with `gh pr create`
5. Return only the PR URL
```

The filename becomes the `/name`. Do not collide with built-in `/review` or `/review-bugbot`.

---

## Review PRs with Bugbot

Bugbot **reviews a PR diff** for bugs, security issues, and quality. It is **not** Debug Mode. Official: [Bugbot](https://cursor.com/docs/bugbot).

### On the hosted PR

1. Connect GitHub / GitLab / Bitbucket / Azure DevOps in the dashboard
2. Enable Bugbot per repo under Automations
3. It runs on each PR update; or comment `cursor review` / `bugbot run`
4. Debug a run with `cursor review verbose=true`

Root `.cursor/BUGBOT.md` (no secrets):

```markdown
# Bugbot

- Money is integer cents. Never floating-point dollars.
- Do not suggest committing `.env`.
- Copy nits are not bugs unless they change control flow.
```

### Before you push

`/review-bugbot` in Agent. Default: all committed + uncommitted changes versus the default base branch. If the base is not `main`, say so.

The same patch ID is skipped on the remote PR with a comment that it was already reviewed.

### Autofix (official name, not a product called Fixer)

Official [Bugbot · Autofix](https://cursor.com/docs/bugbot) spawns a [Cloud Agent](https://cursor.com/docs/cloud-agent) to patch findings. The 2026 docs name is **Autofix**. There is no separate product page titled Fixer.

- Prefer **Create New Branch**
- **Commit to Existing Branch** is capped at 3 attempts per PR
- Needs on-demand usage and Storage enabled (not Legacy Privacy Mode)
- Billed as Cloud Agent usage
- Personal settings override the team default. If Autofix is off, use **Fix in Cursor** / **Fix in Web** on the comment

### CI trap

The GitHub check is `Cursor Bugbot`. Findings default to **`neutral`**. Requiring the check does **not** block merge on findings unless the org enables fail-on-unresolved-issues.

---

## Connect MCP

Official: [MCP](https://cursor.com/docs/mcp). Prefer Marketplace one-click. Hand-written config lives at `.cursor/mcp.json` (`${workspaceFolder}` is the folder that contains that file).

```json
{
  "mcpServers": {
    "filesystem-notes": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}/notes"],
      "envFile": "${workspaceFolder}/.env"
    }
  }
}
```

Field names are from the official MCP page. Pin a community package only from that package's README.

Official security notes: trusted sources, least-privilege keys, `${env:NAME}` not literals, read the source for critical servers. Tools ask for approval by default.

---

## Keep the agent looping (Hooks)

Official blog skeleton: a **stop** hook that reads **JSON on stdin**.

```json
{
  "version": 1,
  "hooks": {
    "stop": [
      { "command": "bun run .cursor/hooks/grind.ts" }
    ]
  }
}
```

```typescript
// .cursor/hooks/grind.ts — fields from https://cursor.com/blog/agent-best-practices
import { readFileSync, existsSync } from "fs";

interface StopHookInput {
  conversation_id: string;
  status: "completed" | "aborted" | "error";
  loop_count: number;
}

const input: StopHookInput = await Bun.stdin.json();
const MAX_ITERATIONS = 5;

if (input.status !== "completed" || input.loop_count >= MAX_ITERATIONS) {
  console.log(JSON.stringify({}));
  process.exit(0);
}

const scratchpad = existsSync(".cursor/scratchpad.md")
  ? readFileSync(".cursor/scratchpad.md", "utf-8")
  : "";

if (scratchpad.includes("DONE")) {
  console.log(JSON.stringify({}));
} else {
  console.log(
    JSON.stringify({
      followup_message: `[Iteration ${input.loop_count + 1}/${MAX_ITERATIONS}] Continue working. Update .cursor/scratchpad.md with DONE when complete.`,
    }),
  );
}
```

Cloud agents run **command-based** project hooks only — not `~/.cursor/hooks.json`, not prompt-based hooks. Event names: [cheatsheet · Hooks](./cursor-cheatsheet#hooks).

Do not assume `afterFileEdit` puts the path in `argv[1]`; read the current Hooks schema.

---

## Parallel agents and Cloud

### Local worktrees

Official blog: pick worktree in the agent dropdown. Apply merges back. You can also run the same prompt on several models and pick one — expensive, save it for hard problems.

---

## Run work on Cloud Agents

Use this when you are away, need several agents at once, or the job should clone, test, and open a PR on an isolated VM. Cousins on this site: Claude remote / Dispatch, Gemini Jules. Official: [Cloud Agents](https://cursor.com/docs/cloud-agent). **Former name: Background Agents** (official Naming History).

Do not send “three lines under the caret” to Cloud — that is Tab. Do not use Cloud as a PR reviewer — that is Bugbot.

### When to dispatch

| Cloud | Stay local |
|-------|------------|
| Drive-by bugs, tests, docs, overnight work | You need to watch the diff, edit a plan, or use Debug Mode |
| Many parallel runs; the laptop can sleep | Secrets or services that never left your machine |
| Coordinated edits across repos, one PR each | One repo you already have checked out |

Official prerequisites: a paid plan; an account admin must connect GitHub / GitLab / Bitbucket / Azure DevOps. Privacy Mode can stay on, but Cloud is officially the only feature that requires Cursor to store code. If policy forbids storage, leave it off.

### Where to start one

1. Editor agent input → **Cloud**
2. [cursor.com/agents](https://cursor.com/agents) on any device
3. [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile); Android: install the PWA
4. Slack / Linear `@cursor` (admin installs the app first)
5. `@cursor` on a GitHub / Bitbucket issue or PR
6. Prefix a CLI message with `&` (next section)

### Give it a machine first

Official wording: skipping environment setup is like not giving engineers a computer. Prefer agent-led setup in the dashboard so it installs dependencies and produces the first Build. To commit config, use `.cursor/environment.json` (fields from [Setup](https://cursor.com/docs/cloud-agent/setup)):

```json
{
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".."
  },
  "install": "pnpm install"
}
```

`install` must be idempotent and only do work that lands on disk. Put Docker / databases / dev servers in `start` or `terminals`. Put secrets in the dashboard **Secrets** tab, not in git.

Add a **Cursor Cloud specific instructions** section to `AGENTS.md` (official suggested heading) for how to run tests in the VM.

### How Cloud differs from local (official limits)

- MCP comes from the team config on [cursor.com/agents](https://cursor.com/agents), not your laptop `mcp.json`
- Hooks: command-based **project** hooks only — not `~/.cursor/hooks.json`, not prompt-based hooks
- Artifacts (screenshots, videos, logs) and remote-desktop takeover
- Multi-repo environments can open a PR per repo; official: long-running is not available for multi-repo yet

---

## Use Cursor CLI in the terminal or CI

Use this when you are already in tmux / SSH / CI, or you want the same Rules from a script. Official: [CLI Overview](https://cursor.com/docs/cli/overview), [Installation](https://cursor.com/docs/cli/installation), [Headless](https://cursor.com/docs/cli/headless).

The binary is **`agent`**, not `cursor`.

```bash
# macOS / Linux / WSL
curl https://cursor.com/install -fsS | bash

# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex

agent --version
# If the shell cannot find it, add ~/.local/bin to PATH
```

### Interactive

```bash
agent
agent "refactor the auth module to use JWT tokens"
agent --mode=ask
agent --mode=plan    # or --plan
```

In a session: `Shift+Tab` rotates Agent / Plan / Ask; prefix a message with `&` to hand off to a Cloud Agent; `agent ls` / `agent resume` / `agent --continue` restore history.

### Headless / CI

Official Headless page: `-p` / `--print` proposes edits; add `--force` (alias `--yolo`) to write files. Scripts authenticate with `CURSOR_API_KEY`.

```bash
export CURSOR_API_KEY=your_api_key_here

# Ask only
agent -p "What does this codebase do?"

# Write files
agent -p --force "Add JSDoc to src/lib/money.ts. Do not touch other files."
```

The CLI loads the same `.cursor/rules`, plus root `AGENTS.md` and `CLAUDE.md`. MCP comes from the project's `mcp.json` (not the Cloud team MCP list). Isolated checkout: `agent --worktree "upgrade the test runner"`.

---

## Pitfalls

| Situation | Avoid | Do |
|-----------|-------|----|
| Feature drifted | Fifteen “just fix it” turns | Restore + tighter plan |
| Rule ignored | `.cursor/rules/notes.md` | `.mdc` + frontmatter, or `AGENTS.md` |
| Flaky bug | “It sometimes fails” | Debug Mode + repro steps |
| Large PR | Assuming the default check blocks merge | Enable fail-on-unresolved, or read comments |
| Secrets | Tokens in Always rules | `.cursorignore` + `${env:NAME}` |
| Parallel edits | Two agents, one worktree | Worktree or Cloud |
| Three-line edit in Cloud | Spin a VM for caret work | Tab or `Cmd+K` |
| Cloud as PR review | Wait for the VM to comment | Bugbot / `/review-bugbot` |
| `agent -p` in CI, no file changes | Missing `--force` | `agent -p --force` (Headless page) |

---

## Next steps

- [Tutorial](./cursor) for the basics
- [Cheatsheet](./cursor-cheatsheet) for copy-paste config (includes CLI / Cloud)
- [Glossary](./cursor-glossary) for why Cloud, CLI, and modes are split
- [Learning map](./) for Tab vs Agent vs Cloud vs Bugbot vs CLI
