# Claude Code Practical Workflows

> This guide compiles the most effective prompt patterns, workflows, and community best practices for day-to-day use of Claude Code. It applies to exploring codebases, debugging, refactoring, CI/CD automation, and scenarios ranging from single-session tasks to multi-session collaboration.
>
> **Supplementary reading**: [Claude Code Best Practices → Community Tips](./claude-code#best-practices) — 127+ settings tuning, 40+ prompt techniques, and Hooks Mastery patterns from the community.

## Core Philosophy

Claude Code is not a chatbot—it's an **agentic coding environment**. It can read files, run commands, make changes, and solve problems autonomously. This agency means:

- **Describe what you want, not how**: Let Claude figure out how to build it
- **Context is your most valuable resource**: When the context window fills, performance degrades
- **Give Claude ways to verify itself**: Let it run tests, lint, builds, and check results itself

---

## Part 1: Daily Development Workflows

### 1. Understanding a New Codebase

**Drill down progressively**: Start with broad questions, then narrow to specific areas.

```
Give me an overview of this codebase
Explain the main architectural patterns used here
What are the key data models?
How is authentication handled?
```

**Find relevant code**:

```
Find files that handle user authentication
How do these files work together?
Trace the login flow from frontend to database
```

**Tips**:
- Use the domain language from your project
- Ask Claude to explain coding conventions and patterns used in the project
- Install code intelligence plugins for your language to get precise symbol navigation

### 2. Fixing Bugs Efficiently

```
I see this error when running npm test: [paste error/screenshot]
Suggest several ways to fix the @ts-ignore in user.ts
Update user.ts per your suggestion, adding null checks
```

**Key principles**:
- Tell Claude the command to reproduce the issue and get a stack trace
- Mention any steps to reproduce the error
- Let Claude know if the error is intermittent or consistent
- **Don't just fix symptoms**: Ask Claude to find and fix the root cause

```
The build is failing with this error: [paste error].
Fix it and verify the build succeeds. Address the root cause, don't suppress errors.
```

### 3. Refactoring Code

```
Find deprecated API usage in the codebase
Suggest how to refactor utils.js to use modern JavaScript features
Refactor utils.js to use ES2024 features while maintaining the same behavior
Run tests on the refactored code
```

**Tip**: Refactor in small, testable increments. Run tests after each refactor.

### 4. Writing Tests

```
Find functions in NotificationsService.swift that aren't covered by tests
Add tests for the notification service
Add test cases for edge cases of the notification service
Run the new tests and fix any failures
```

Claude will examine existing test files and match the existing style, framework, and assertion patterns. Ask Claude to identify edge cases you might have missed.

### 5. Creating PRs

```
Summarize the changes I made to the authentication module
Create a PR
Enhance the PR description with more context about security improvements
```

When creating a PR with `gh pr create`, the session automatically links to that PR. Return later with `claude --from-pr 123`.

### 6. Working with Documentation

```
Find functions in the auth module that lack JSDoc comments
Add JSDoc comments to undocumented functions in auth.js
Improve the generated documentation with more context and examples
Check if docs meet our project standards
```

**Tip**: Specify documentation style (JSDoc, docstrings, etc.), request examples, and focus on public APIs, interfaces, and complex logic.

### 7. Working in Non-Code Folders

Claude Code can work in any directory. Run it in your note library, documentation folders, or any collection of markdown files to search, edit, and reorganize content just like code. The `.claude/` directory and `CLAUDE.md` exist alongside configuration directories for other tools without conflicts.

### 8. Using Image Analysis

Drag and drop images into the Claude Code window, or copy-paste (Cmd+V works in iTerm2 on Mac), or provide an image path:

```
Analyze this image: /path/to/screenshot.png
Describe the UI elements in this screenshot
What's wrong with this database schema diagram?
Generate CSS based on this design mockup
```

When Claude references an image (e.g., `[Image #1]`), `Cmd+Click` (Mac) or `Ctrl+Click` (Windows/Linux) opens it in your default viewer.

---

## Part 2: Effective Communication Patterns

### Prompt Pattern: Before / After

| Strategy | Vague | Specific |
|----------|-------|----------|
| **Scope the task** | "Add tests for foo.py" | "Write tests for foo.py covering edge cases where users are logged out. Avoid mocks." |
| **Point to sources** | "Why does ExecutionFactory have a weird API?" | "Look at ExecutionFactory's git history and summarize how its API evolved" |
| **Reference existing patterns** | "Add a calendar widget" | "Look at how existing widgets on the homepage are implemented to understand the pattern. HotDogWidget.php is a good example. Implement following that pattern." |
| **Describe symptoms** | "Fix login error" | "Users report login failures after session timeout. Check the authentication flow in src/auth/. Write a failing test that reproduces the issue, then fix it." |

### Ways to Provide Rich Context

| Method | Example |
|--------|---------|
| **@ reference files** | `Explain the logic in @src/utils/auth.js` — includes full file content |
| **@ reference directories** | `What's the structure of @src/components?` — provides file listing |
| **Paste images** | Copy/paste or drag screenshots into your prompt |
| **Provide URLs** | For documentation and API references |
| **Pipe data** | `cat error.log | claude` sends file content directly |
| **Let Claude fetch itself** | "Use Bash commands to pull context yourself" |

> **Extra benefit of @ file references**: Adds `CLAUDE.md` from the file's directory and parent directories to context. You can reference multiple files in a single message (e.g., `@file1.js and @file2.js`).

### Let Claude Interview You

For complex features, have Claude interview you first, then start implementation:

```
I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.

Ask about technical implementation, UI/UX, edge cases, concerns, and trade-offs.
Don't ask obvious questions; dig deep into challenges I might not have considered.

Keep interviewing until we've covered everything, then write the complete spec to SPEC.md.
```

Once done, start a new session to execute the spec—a clean context entirely focused on implementation.

---

## Part 3: Making Claude Self-Verify

Core principle: **Don't accept Claude's first output and stop there.** Give Claude something that can produce a "pass/fail" signal, and the loop closes automatically.

### Verification Strategy Comparison

| Strategy | Before | After |
|----------|--------|-------|
| **Provide verification criteria** | "Implement a function to validate email addresses" | "Write a validateEmail function. Test cases: user@example.com should be true, invalid should be false, user@.com should be false. After implementation, run tests" |
| **Visual verification for UI changes** | "Make the dashboard look better" | "[Paste screenshot] Implement this design. Take a screenshot of the result and compare with original design. List differences and fix them" |
| **Address root cause** | "Build failing" | "Build failing with this error: [paste error]. Fix it and verify build succeeds. Address root cause, don't suppress errors" |

### Choosing Verification Depth

| Depth | Method | When to use |
|-------|--------|-------------|
| **Lightweight** | Ask Claude to run checks and iterate in one prompt | Single-shot tasks |
| **Medium** | Set `/goal` conditions, Claude works until conditions met | Tasks spanning multiple rounds |
| **Strong constraints** | Stop hook runs check script, blocks progress until pass | Unattended automation |
| **Independent review** | Sub-agent with fresh model reviews results, tries to refute | Correctness checks |

### Adversarial Review

```
What problems might exist in your implementation? Act as a security engineer and review it
```

```
Use a sub-agent to review this change according to PLAN.md. Check that each requirement is implemented,
listed edge cases have tests, and there are no changes beyond task scope.
Report defects, not style preferences.
```

The reviewer runs as a sub-agent, and the implementation session receives defects directly, can fix and re-review without copying findings between windows.

### Verification Patterns Quick Reference

| Pattern | Flow | When to use |
|----------|------|-------------|
| **Writer → Reviewer** | One session writes code, another independently reviews | Unbiased code review needed |
| **Tests → Iterate → Pass** | Write tests first, then implement, loop until pass | Well-defined requirements |
| **Plan → Implement → Verify** | Plan first, then implement, verify with sub-agent | Complex architecture changes |

---

## Part 4: Session Management

### Lifecycle Commands

```bash
# Resume most recent session
claude --continue

# Select from list to resume
claude --resume

# Resume from PR
claude --from-pr 123

# In-session resume
/resume
```

### Direction Control

| Action | Shortcut/Command | Effect |
|--------|-----------------|--------|
| **Stop mid-stream** | `Esc` | Stop Claude, keep context, can redirect |
| **Rewind menu** | `Esc + Esc` or `/rewind` | Restore conversation and code state, or from message summary |
| **Undo changes** | "Undo that" | Have Claude revert its changes |
| **Reset context** | `/clear` | Free context window between unrelated tasks |

**When to `/clear`**:
- Between unrelated tasks
- After correcting Claude on the same problem twice+ (context polluted by failed approaches)
- Long sessions accumulated lots of unrelated context

### Context Management Strategies

| Strategy | When to use |
|----------|-------------|
| `/clear` | Complete reset between tasks |
| `/compact <instructions>` | Compress conversation but preserve key information |
| `/rewind` → summary | Compress only part of conversation |
| `/btw` | Quick question, answer doesn't enter conversation history |

### Naming Sessions

Give sessions descriptive names (e.g., `oauth-migration`) for easier finding later. Set compaction preferences in CLAUDE.md:

```
When compacting, always preserve the full list of modified files and any test commands
```

---

## Part 5: Automation and Scaling

### Non-Interactive Mode (CI / Scripts)

```bash
# One-off query
claude -p "Explain what this project does"

# Structured output
claude -p "List all API endpoints" --output-format json

# Streamed output (real-time processing)
claude -p "Analyze this log file" --output-format stream-json --verbose

# Pipe input
git log --oneline -20 | claude -p "summarize these recent commits"
```

### Parallel Sessions

| Method | Isolation level | When to use |
|--------|----------------|-------------|
| **Worktrees** | Full isolation (different git branches) | Feature A and Feature B developed in parallel |
| **Desktop App** | Visual management of multiple local sessions | Need to monitor multiple tasks simultaneously |
| **Web Version** | Cloud VM | When away from local machine |
| **Agent Teams** | Automatic coordination of multiple sessions | Complex task automatic dispatch |

### Writer/Reviewer Pattern

| Session A (Writer) | Session B (Reviewer) |
|-------------------|---------------------|
| Implement rate limiter for API endpoint | |
| | Review `src/middleware/rateLimiter.ts`. Look for edge cases, race conditions, and consistency with existing middleware patterns. |
| Fix issues per review feedback | |

Fresh context improves code review because Claude isn't biased toward code it just wrote.

### Scheduled Tasks

| Option | Runs on | Best for |
|--------|----------|----------|
| **Routines** | Anthropic-managed cloud infrastructure | Tasks that should run even when computer is off. Supports API calls and GitHub event triggers |
| **Desktop scheduled tasks** | Local machine | Tasks needing direct access to local files or uncommitted changes |
| **GitHub Actions** | CI pipeline | Tasks related to repository events (open PRs) |
| `/loop` | Current CLI session | Quick polling while session is open |

When writing prompts for scheduled tasks, explicitly state success criteria and how to handle results—tasks run autonomously and cannot ask clarification questions.

---

## Part 6: Common Failure Modes and How to Avoid Them

| Failure Mode | Symptom | Fix |
|--------------|---------|-----|
| **Kitchen sink session** | Jump from one task to another, context full of unrelated info | `/clear` between unrelated tasks |
| **Repeated corrections** | Claude does it wrong → you correct → still wrong → correct again | After two failures, `/clear` and restart with better initial prompt |
| **Overgrown CLAUDE.md** | CLAUDE.md too long, Claude ignores important rules | Prune ruthlessly; if Claude does it right without instructions, delete it |
| **Trust-verify gap** | Implementation looks reasonable but doesn't handle edge cases | Always provide verification (tests, scripts, screenshots) |
| **Infinite exploration** | "Investigate X" without scope, Claude reads hundreds of files | Scope investigations or use subagents |

---

## Part 7: CLAUDE.md Best Practices

### ✅ What to Include

- Bash commands Claude can't guess
- Code style rules different from defaults
- Test commands and preferred test runners
- Repository etiquette (branch naming, PR conventions)
- Developer environment quirks (required environment variables)
- Common pitfalls or non-obvious behaviors

### ❌ What to Exclude

- Anything Claude can figure out by reading code
- Standard language conventions (Claude already knows)
- Detailed API documentation (link to docs instead)
- Frequently changing information
- Long explanations or tutorials
- Self-evident practices (like "write clean code")

### Where CLAUDE.md Files Live

| Location | Scope |
|----------|-------|
| `~/.claude/CLAUDE.md` | All Claude sessions (personal global) |
| `./CLAUDE.md` | Project root, checked into git, shared with team |
| `./CLAUDE.local.md` | Personal project notes, add to `.gitignore` |
| `subdirectory/CLAUDE.md` | Auto-loaded when working with files in that directory |

### CLAUDE.md Maintenance Principles

- Keep it short: every line should answer "Would deleting this cause Claude to make mistakes?"
- If Claude keeps doing things you don't want, the file may be too long
- Treat it like code: review, prune regularly, test whether changes actually affect behavior
- Can import other files via `@path/to/import` syntax

---

## Part 8: Choosing the Right Extension Mechanism

Claude Code has multiple extension points—which should you use?

| Extension point | When to use | Lifecycle |
|----------------|------------|-----------|
| **CLAUDE.md** | Persistent context: code style, commands, workflow rules | Loaded every conversation |
| **Skills** | Specialized workflows loaded on demand | Loaded when Claude auto-recognizes scenario |
| **Hooks** | Scripts that must execute deterministically at specific points | Auto-triggered before/after tool calls |
| **Subagents** | Investigation/review tasks needing independent context | Main agent spawns parallel subagents |
| **Plugins** | Packaged extensions published by community/team | Installed, used on demand |
| **MCP Servers** | Connect external tools and services | Persistent connection, used during tool calls |

**Decision rules**:
- Need "rules loaded every conversation" → CLAUDE.md
- Need "workflows for specific scenarios only" → Skill
- Need "scripts that must run after file edits" → Hook
- Need "explore lots of files without polluting main context" → Sub-agent
- Need "community-packaged capabilities" → Plugin

---

## Part 9: Cross-File Parallel Processing

For large migrations or analysis, distribute work across multiple parallel Claude invocations:

```bash
# Pipe output to Claude for processing
git log --oneline -20 | claude -p "summarize these recent commits"

# Structured output for script consumption
claude -p "List all API endpoints" --output-format json | jq '.endpoints[]'
```

Use `--verbose` for debugging, disable in production.

---

## Related Pages

- [Claude Code Main Tutorial](./claude-code) — Installation, interaction, core concepts
- [Glossary](./claude-code-glossary) — Unified explanations of core concepts like MCP / Hooks / Skills / Sub-agents
- [Cheatsheet](./claude-code-cheatsheet) — Complete configuration reference + decision tables + high-quality information sources
- [Best Practices (Official)](https://code.claude.com/docs/en/best-practices) — Patterns validated internally by Anthropic
- [Common Workflows (Official)](https://code.claude.com/docs/en/common-workflows) — Step-by-step guides for everyday tasks
