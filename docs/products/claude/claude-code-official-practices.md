---
title: Claude Code Official Practices
description: "What the official Claude Code docs say about context files, subagents, hooks, permissions, sandbox defaults and review loops, with three team-level takeaways."
domain: product
tags:
  - coding-agent
role: reference
---

# Claude Code Official Practices

**Bottom line**: The official docs separate deterministic mechanisms from probabilistic ones. Put what must always happen into hooks and startup-loaded instruction files. Move side work that would pollute the main conversation into subagents with their own context. Treat AI code review as triage with a built-in self-check, not as a gate that can sign off for a human.

> **Audience**: engineers and tech leads adopting Claude Code in a team.
> **Prerequisites**: basic Claude Code usage. See [Claude Code CLI](./claude-code) and the [Cookbook](./claude-code-cookbook).
> **Non-goal**: this page is not a feature reference. It covers only claims backed by quoted official text.

Sources were fetched on 2026-10-21; the page list is at the end. Where the fetched text did not support a value, this page says so instead of guessing.

## Context files

| Item | What the docs say |
| --- | --- |
| Name and location | The project file is `CLAUDE.md`, at `./CLAUDE.md` or `./.claude/CLAUDE.md`. Either location works. |
| Local variant | `CLAUDE.local.md` sits at the same level and loads together with `CLAUDE.md`. |
| Loading | Files at and above the working directory load at startup, so their cost is paid every session. |
| Guidance | More specific and concise instructions are followed more reliably. |

Not established by the fetched text: a per-file line limit, when subdirectory files load, and capacity thresholds for rules or auto memory.

## Subagents and task decomposition

- Each subagent runs in its own context window, with its own system prompt, restricted tool access and independent permissions.
- Delegation is matched on the subagent's `description`. Writing the description is writing the routing condition.
- Parallelism is not free: running several sessions or subagents multiplies token usage. Weigh that cost when deciding how many to run.

Not established: where subagent files live, their precedence, and the allowed values of fields such as `model`.

## Hooks and automation

- Hooks are user-defined shell commands that run at fixed points in the Claude Code lifecycle. They give deterministic control: an action always happens instead of depending on the model.
- Documented uses: enforcing project rules, automating repetitive tasks and integrating existing tools.
- When a hook blocks an edit, Claude receives an explanation of why and adjusts. Write the block message with the same care as the block itself.

Not established: the full event list, JSON input and output shapes, and exit-code semantics per event.

## Permissions and sandbox defaults

- Interactive terminal and VS Code sessions start in Auto mode by default.
- Manual mode starts read-only.
- The built-in Bash sandbox is **off** by default.

Read together: the default mode leans automatic, and the sandbox is not on by default. A team that wants a stricter baseline has to configure it explicitly.

## Review and verification loops

- Code Review evaluates changes, then runs a separate verification step that checks each candidate finding against the code before reporting it. Findings appear as inline comments.
- The docs state that the AI reviewer can miss bugs and security issues. Use it to route attention, not as a correctness guarantee before merge.

## Three practices to adopt

1. **Keep repository knowledge in the context file, and keep it specific.** Put build, test and layout conventions in `./CLAUDE.md` or `./.claude/CLAUDE.md`. Delete slogan-style lines such as "write clean code". Basis: the location rule and the specificity guidance above.
2. **Send exploratory work to subagents.** Anything that dumps search results, logs or file contents into the main thread and is not read again belongs in a subagent. Put the trigger in its `description`, and size concurrency against the token multiplier. Basis: isolated context, description matching, parallel cost.
3. **Put "must happen every time" in hooks, not in instructions.** Formatting and blocking out-of-scope edits are deterministic jobs. Instruction compliance is probabilistic; hook execution is not. Basis: deterministic control, rule enforcement, block feedback.

## Common pitfalls

- Assuming the sandbox is on. It is off by default.
- Treating a long `CLAUDE.md` as free. It loads every session.
- Treating a passing AI review as approval.

## Next steps

- Compare these defaults with your team's actual `settings.json` in the [Cheatsheet](./claude-code-cheatsheet).
- Apply the verify-yourself pattern in [Practical Workflows](./claude-code-cookbook).

## Sources

Fetched 2026-10-21:

- <https://code.claude.com/docs/en/memory>
- <https://code.claude.com/docs/en/sub-agents>
- <https://code.claude.com/docs/en/agents>
- <https://code.claude.com/docs/en/hooks-guide>
- <https://code.claude.com/docs/en/security>
- <https://code.claude.com/docs/en/sandboxing>
- <https://code.claude.com/docs/en/code-review>

Not used: an `anthropic.com/engineering` context-engineering article returned HTTP 404 on fetch.
