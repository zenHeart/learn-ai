---
title: Cursor and GitHub Copilot Official Practices
description: "What the official Cursor and GitHub Copilot docs say about context rules, subagents and custom agents, hooks, network defaults and code review, with two team-level takeaways."
domain: product
tags:
  - coding-agent
role: reference
---

# Cursor and GitHub Copilot Official Practices

**Bottom line**: Both products use files you can commit to the repository as the main way to carry team conventions, but they cover different surfaces and have different network defaults. Treat each default as a starting point to verify in your own setup, not as a guarantee.

> **Audience**: engineers and tech leads comparing or adopting Cursor and GitHub Copilot in a team.
> **Prerequisites**: basic use of either product. See [Cursor](./cursor) and the [Cursor Cheatsheet](./cursor-cheatsheet).
> **Non-goal**: this is not a feature reference. It covers only claims backed by quoted official text.

Sources were fetched on 2026-10-21; the page list is at the end. Where the fetched text did not support a value, this page says so instead of guessing. The Copilot pages cover different surfaces (VS Code, cloud agent, CLI), so each row names its scope.

## Cursor

| Topic | What the docs say |
| --- | --- |
| Context rules | Project rules must use the `.mdc` extension. "Keep rules under 500 lines" is listed as a best practice, so it is a recommendation, not a validated limit. The fetched text does not establish the rules directory. |
| Subagents | Each subagent runs in its own context window, handles one type of work and returns the result to the parent. It starts with a clean context. |
| Hooks | Hooks use custom scripts to observe, control and extend the agent loop. They are spawned processes that talk JSON over stdio. The fetched text does not list all events. |
| Network sandbox | In the sandbox network policy, deny always wins over allow. In the documented "allow only listed domains" example, traffic is denied by default. That default belongs to the example, not to every project. |
| Code review | Bugbot reviews pull requests for bugs, security issues and code quality, and comments with explanations and fix suggestions. |

## GitHub Copilot

| Topic | Scope | What the docs say |
| --- | --- | --- |
| Context rules | Repository instructions (VS Code page) | Repository-wide instructions apply to all requests made in the context of that repository. With `AGENTS.md`, the nearest file in the directory tree takes precedence. |
| Custom agents | Cloud agent | An agent profile is a Markdown file with YAML frontmatter declaring name, description, tools and MCP servers. The prompt of one profile is limited to 30,000 characters; this is a per-profile limit, not a budget for repository context files. |
| Hooks | CLI and cloud agent | Hooks run custom shell commands at key points of an agent workflow, such as session start or end, prompt submission and tool calls. The page states its examples target the CLI and the cloud agent. |
| Network | Cloud agent | Internet access is restricted by a firewall by default, and the firewall applies only to processes the agent starts through its Bash tool. The fetched pages do not describe local sandboxing. |
| Code review | Code review | Feedback includes suggested changes that can be applied in a few clicks where possible. Review comments behave like human review comments. |

## Side by side

| Capability | Cursor | GitHub Copilot |
| --- | --- | --- |
| Context rules | `.mdc` project rules; under 500 lines recommended | Repository instructions; nearest `AGENTS.md` wins |
| Subagents / custom agents | Isolated context window, clean start | Markdown profile with YAML frontmatter; 30,000-character prompt cap |
| Hooks | Scripts over stdio JSON | Shell commands at lifecycle points (CLI, cloud agent) |
| Network posture | Deny beats allow; example config denies by default | Firewall limits internet access by default (Bash-launched processes only) |
| Review | Bugbot comments with fix suggestions | Applicable suggestions; comments like human comments |

## Two practices to adopt

1. **Split team conventions into small topic files.** Cursor recommends keeping a rule under 500 lines, and Copilot gives the nearest `AGENTS.md` precedence in a directory tree. Put shared conventions at the root and package-specific ones next to the code. Basis: the Cursor line recommendation and the Copilot nearest-file rule above.
2. **Start network access from deny, then allow per dependency.** Cursor's sandbox policy has deny over allow, and Copilot's cloud agent restricts internet access by default. Keep those defaults and open only the domains your build needs. Basis: the network rows above; the Cursor default applies to the documented example configuration only.

## Common pitfalls

- Reading the 500-line figure as an enforced limit. It is a recommendation.
- Reading the 30,000-character figure as a limit on repository instructions. It applies to one agent profile.
- Assuming the Copilot firewall covers every process. It covers processes the agent starts through Bash.
- Assuming a Copilot setting applies on every surface. Check the scope column.

## Next steps

- Compare these defaults with your team's actual configuration in the [Cursor Cheatsheet](./cursor-cheatsheet).
- For the Claude Code counterpart, see [Claude Code Official Practices](../claude/claude-code-official-practices).

## Not established

- Cursor: the permission and allowlist page, and the rules directory.
- Copilot: local sandboxing, and a hook failure-blocking switch.

## Sources

Fetched 2026-10-21:

- <https://cursor.com/docs/rules>
- <https://cursor.com/docs/subagents>
- <https://cursor.com/docs/hooks>
- <https://cursor.com/docs/reference/sandbox>
- <https://cursor.com/docs/bugbot>
- <https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide>
- <https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents>
- <https://docs.github.com/en/copilot/concepts/customizations/hooks>
- <https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall>
- <https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review>
