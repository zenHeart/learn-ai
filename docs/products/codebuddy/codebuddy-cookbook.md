---
title: CodeBuddy Cookbook
description:" \"For readers who can already sign in. Each recipe copies official steps: goal, commands, then the pitfall. No install walkthrough.\""
domain: product
tags:
  - coding-agent
role: cookbook
---

# CodeBuddy Cookbook

For people who can already sign in. Each recipe is one job: goal, official commands, then the pitfall.

If you cannot install yet, read the [tutorial](./codebuddy). Command lookup is the [cheatsheet](./codebuddy-cheatsheet).

## Run `/init` before you edit a repo

**Goal**: build project context in the CLI before a large change.

Source: [Quick start](https://www.codebuddy.cn/docs/cli/quickstart)

```bash
cd /path/to/your-project
codebuddy
```

```
> /init
```

The official page marks `/init` as "strongly recommended": it builds a knowledge graph so later turns scan less. After a large structural change:

```
> /clear
> /init
```

**Pitfall**: skipping `/init` and throwing a cross-file task at a cold session. Official copy says that is slower and more error-prone. "The repo is huge so it must know" is not a substitute.

## One-shot review in print mode

**Goal**: run once from a script or pipe, no REPL.

Sources: [Quick start](https://www.codebuddy.cn/docs/cli/quickstart), [CLI reference](https://www.codebuddy.cn/docs/cli/cli-reference)

```bash
codebuddy -p "Optimize this SQL query"
cat error.log | codebuddy -p "Analyze these error logs"
codebuddy -p "Review code quality of src/utils.js" -y
```

Official wording: with `-p/--print`, operations that need file access or command execution must add `-y` (or `--dangerously-skip-permissions`). You may also use `--permission-mode auto` / `dontAsk`, or pre-set `permissions.allow`.

**Pitfall**: `-p` alone blocks turns that need confirmation. `-y` skips prompts; official text says use it carefully.

## Add a custom slash command

**Goal**: turn a repeated task into `/name`.

Source: [Slash commands · custom](https://www.codebuddy.cn/docs/cli/slash-commands)

- Project: `.codebuddy/commands/`
- User: `~/.codebuddy/commands/`

`test.md` registers `/test`. Nested dirs use colons: `commands/frontend/build.md` → `/frontend:build`.

Official review example:

```markdown
---
description: "Review the given files"
argument-hint: "[file-paths...]"
allowed-tools: Read
---

Please review the following files for quality, maintainability, and security:

@$ARGUMENTS
```

Commands that run shell lines need `Bash` in frontmatter or the official page says they will not run.

**Pitfall**: custom slash commands are user-triggered. Official Skills are "templates the AI recognizes and invokes". Do not write them as one system.

## Add an MCP server

**Goal**: let the CLI call an external tool.

Source: [MCP](https://www.codebuddy.cn/docs/cli/mcp)

```bash
codebuddy mcp add --scope user my-tool -- /path/to/tool arg1 arg2
codebuddy mcp add --scope project python-tool -- python /path/to/script.py
codebuddy mcp add --scope user --transport sse sse-server https://example.com/mcp/sse
codebuddy mcp add --scope project --transport http http-server https://example.com/mcp/http
```

CloudBase's own docs say IDE users authorize **Tencent CloudBase** in Settings / Integrations instead of writing MCP by hand. That is CloudBase's wording; trust the settings page on your machine.

## Migrate from Claude Code

**Goal**: reuse Claude Code agents / commands / skills / instruction files.

Source: [Troubleshooting · migrate from Claude Code](https://www.codebuddy.cn/docs/cli/troubleshooting)

Official mapping:

| Path | Role |
|------|------|
| `agents/` | Custom agents |
| `commands/` | Slash commands |
| `skills/` | Skills |
| `CLAUDE.md` → `CODEBUDDY.md` | AI instructions and memory |

Option 1 (official recommended, symlinks):

```bash
cd ~/.codebuddy
ln -s ~/.claude/agents agents
ln -s ~/.claude/commands commands
ln -s ~/.claude/skills skills
ln -s ~/.claude/CLAUDE.md CODEBUDDY.md
```

Option 2 (copy, independent configs):

```bash
cp -r ~/.claude/agents ~/.codebuddy/agents
cp -r ~/.claude/commands ~/.codebuddy/commands
cp -r ~/.claude/skills ~/.codebuddy/skills
cp ~/.claude/CLAUDE.md ~/.codebuddy/CODEBUDDY.md
```

Verify:

```bash
codebuddy
```

```
> /skills
> /config
```

Official note: Skills from Claude Code plugins can be installed in one click and load automatically.

**Pitfall**: this copies config. It does not make Claude Code and CodeBuddy the same product. Permission modes, login domains, and quota stay on the CodeBuddy account.

## Control tokens: new task, new session

**Goal**: do not stuff ten unrelated jobs into one chat.

Source: [Troubleshooting · cost](https://www.codebuddy.cn/docs/cli/troubleshooting)

Official rules:

- `/clear` for a new task
- `/compact` on a long chat
- `@filename` instead of pasting code

Official comparison (their numbers, not this site's measurements):

| Approach | Input tokens | Relative cost |
|----------|--------------|---------------|
| 10 tasks in one session | ~50,000 | High |
| New session per task | ~15,000 | Low |
| Periodic `/compact` | ~25,000 | Medium |

Official advice: `/compact` every 20–30 turns.

## Ask the plugin about the whole repo

**Goal**: question the project, not just the current file.

Source: [Product overview](https://cloud.tencent.com/document/product/1831/134343)

Official mentions: `@workspace` and `#Codebase` for structure, class relationships, dependencies, and business flow.

**Pitfall**: this is plugin / IDE repo Q&A. It is not the same switch as CLI `/init`.

## IDE: one sentence to a previewable artifact

**Goal**: use the standalone IDE for 0-to-1, not a one-line patch in an old repo.

Sources: [Product overview](https://cloud.tencent.com/document/product/1831/134343), [IDE landing](https://www.codebuddy.cn/ide/)

Official chain: natural-language idea → structured PRD → prototype / mock (or sketch / component library) → design-to-code (built-in Figma) → CloudBase / Supabase → CloudStudio / EdgeOne Pages.

**Pitfall**: this is the IDE's home field. The plugin does not become the same product-design-dev pipeline. Do not invent console paths for deploy or BaaS; use the IDE settings page.

## Guardrails

- Every command in a recipe must exist on a linked official page. No "usually you can".
- Do not teach WorkBuddy, Yuanbao, WeChat, or QQ here.
- Do not install a CLI `plugin` and an editor extension as if they were one step.
