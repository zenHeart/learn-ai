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

### Autofix

Spawns a Cloud Agent. Prefer **Create New Branch**. Committing onto the PR branch is capped at 3 attempts. Needs on-demand usage and Storage enabled (not Legacy Privacy Mode).

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

### Cloud Agents

Good for todo-list work: drive-by bugs, tests on old code, docs. Start from [cursor.com/agents](https://cursor.com/agents), the editor, mobile, or Slack `@Cursor` (admin must connect Slack first). Cloud MCP comes from the team config, not your laptop `mcp.json`.

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

---

## Next steps

- [Tutorial](./cursor) for the basics
- [Cheatsheet](./cursor-cheatsheet) for copy-paste config
- [Glossary](./cursor-glossary) for why the pieces are split
