# Claude Code Cheatsheet

> This is a **reference document for looking up information**, not a tutorial — to learn how to use Claude Code, see the [main tutorial](./claude-code); to find the complete definition of a term, see the [Glossary](./claude-code-glossary). This document answers "how to configure, which option to choose, what information sources are available for deep exploration." Four sections: decision tables (start here if unsure), glossary quick index (one-liner + link to Glossary), configuration quick reference (how to write `settings.json`), and high-quality information sources (where to go for continued learning).

## Table of Contents

- [Decision Tables](#decision-tables)
- [Glossary Quick Index](#glossary-quick-index)
- [Configuration Quick Reference](#configuration-quick-reference)
- [High-Quality Information Sources](#high-quality-information-sources)

---

## Decision Tables

### Which Claude Product/Interface to Use

| Scenario | Recommendation | Why |
|----------|----------------|-----|
| Writing code in terminal, need fine-grained control over file/command permissions | **Claude Code CLI** | Most complete feature set, all permissions/Hooks/Skills/Sub-agents available |
| Quick Q&A without touching codebase | **Claude.ai** | Zero installation, use directly in browser |
| Want visual diff and parallel session management | **Claude Code Desktop App** | GUI wraps all CLI capabilities |
| Write and ask within VS Code/JetBrains without switching windows | **Editor Extensions** | Embedded integration |
| Want Claude to automate complete workflow from design to deployment, for non-engineers | **Cowork** | For automation/non-engineer scenarios |
| Temporary tasks, don't want to open local terminal | **Claude Code Web Version** | Runs in browser, no installation |
| On mobile, want to remotely check local session progress | **Remote Control** | Mobile/browser takes over local session, see [Glossary Quick Index](#glossary-quick-index) |

### Which Permission Mode to Use

| Scenario | Recommended Mode | Why |
|----------|-----------------|-----|
| New user, unfamiliar with Claude's judgment | **Normal** | Asks each step, build trust first |
| Daily development, want fewer interruptions but keep safety boundaries | **Auto** (recommended default) | AI classifier blocks dangerous ops, others auto-approve |
| Only want plans/code analysis, don't want to modify files | **Plan** | Read-only, no changes executed |
| Only want auto file edits, still confirm commands manually | **Accept Edits** | Edits auto-approve, Bash and other commands still ask |
| Complete trust, CI/unattended automation | **Auto-Accept** (`bypassPermissions`) | Fully automatic, watch security boundaries, avoid in production-sensitive directories |

### Which Multi-Agent Collaboration Approach

Claude Code has four mechanisms for "multiple AIs working together," easy to choose wrong, ordered by complexity from low to high:

| Scenario | Recommendation | Why |
|----------|----------------|-----|
| Just want another open session to help | **Cross-Session Messaging** | Lightest, pure text communication, no orchestration |
| Task can be split into independent sub-tasks, results aggregated to main session | **Sub-agents** (built-in or custom) | Main session dispatches directly, simple configuration |
| Need scripted orchestration of large-scale parallel/pipeline tasks | **Dynamic Workflows** (`agent()`/`pipeline()`) | Better for scaling and reusability than manual sub-agent dispatch |
| Need multi-person collaboration-style task assignment and progress tracking | **Agent Teams** (Experimental) | Lead/Teammate roles + shared task list |

### Skill / Plugin / MCP / Hook: Which Extension Mechanism

| Scenario | Recommendation | Why |
|----------|----------------|-----|
| Want Claude to connect to external tools/databases/APIs | **MCP** | Open protocol for standardized connections |
| Want to package reusable multi-step workflows/specialized instructions | **Skill** | Describe trigger conditions, auto-recognize or manual `/name` invocation |
| Want to package Skills+Agents+Hooks+MCP for team distribution | **Plugin** | Installable unit, distributed via marketplace |
| Just want auto-run script on specific events (save file, pre-commit) | **Hook** | No need to package as skill, configure directly in `settings.json` |

---

## Glossary Quick Index

> Complete definitions (what it is / why needed / role in ecosystem / how it works) are maintained in [Glossary](./claude-code-glossary), avoiding divergence from definitions here. This section only contains "one-liner + link," for those already familiar with concepts who want quick confirmation or to jump for details.

| Concept | One-Liner | Details |
|---------|-----------|---------|
| **MCP** | Open protocol for AI to connect to external tools/data/APIs, basis of Connectors and plugins | [Glossary → MCP](./claude-code-glossary#mcp-model-context-protocol) |
| **Skills** | Reusable multi-step workflow folders, Claude loads by scenario | [Glossary → Skills](./claude-code-glossary#skills) |
| **Hooks** | Scripts auto-triggered before/after tool calls | [Glossary → Hooks](./claude-code-glossary#hooks) |
| **Plugins** | Skills+Agents+Hooks+MCP packaged as installable unit | [Glossary → Plugins](./claude-code-glossary#plugins) |
| **Sub-agents** | AI assistants with independent persona/permissions, process tasks in parallel | [Glossary → Sub-agents](./claude-code-glossary#sub-agents) |
| **Memory** | Cross-conversation preference and context retention (CLAUDE.md + auto-memory) | [Glossary → Memory](./claude-code-glossary#memory) |
| **Dynamic Workflows** | Scripted orchestration of large-scale sub-agent parallel/pipeline tasks | [Glossary → Dynamic Workflows](./claude-code-glossary#dynamic-workflows) |
| **Cross-Session Messaging** | Pure text messaging between different sessions for collaboration | [Glossary → Cross-Session Messaging](./claude-code-glossary#cross-session-messaging) |
| **Agent Teams** | Multi-session teaming, Lead assigns tasks, Teammates execute in parallel (Experimental) | [Glossary → Agent Teams](./claude-code-glossary#agent-teams-experimental) |
| **Remote Control** | Mobile/web/Slack remote takeover of local session | [Glossary → Remote Control](./claude-code-glossary#remote-control) |
| **Channels** | External message sources (Telegram/Discord/iMessage) trigger sessions (Research Preview) | [Glossary → Channels](./claude-code-glossary#channels) |
| **Worktree** | Multi-session parallel branch isolation based on `git worktree` | [Glossary → Worktree](./claude-code-glossary#worktree) |
| **Permission Modes** | Controls whether Claude asks before executing operations, five modes | [Glossary → Permission Modes](./claude-code-glossary#permission-modes) · [Decision Tables](#which-permission-mode-to-use) · [Configuration Quick Reference](#permission-configuration) |
| **Settings Scope** | Configuration hierarchy system: Managed > CLI args > Local > Project > User | [Configuration Quick Reference · Configuration Scopes](#configuration-scopes) |

---

## Configuration Quick Reference

> This section is a curated reorganization of the official `settings.json` documentation, designed for actual configuration scenarios. For complete documentation, see [Settings](https://code.claude.com/docs/en/settings).

### Configuration Scopes

Settings Scope is the most core yet most confusing concept in Claude Code. Before configuration takes effect, confirm which scope's file you're editing.

**Five priority levels (from high to low, this is the single authoritative version, other pages reference here, don't copy separately)**:

| Priority | Scope | Config File | Shared By | Override Rules |
|----------|-------|-------------|-----------|----------------|
| 1 (Highest) | **Managed** | IT deployment / `managed-settings.json` | All org members | Cannot be overridden (except few security-sensitive keys) |
| 2 | **CLI Args** | `--permission-mode` etc. startup params | Current session only | Temporarily overrides all settings |
| 3 | **Local** | `.claude/settings.local.json` | You only (gitignored) | Overrides Project and User |
| 4 | **Project** | `.claude/settings.json` | Whole team (committed to Git) | Overrides User |
| 5 (Lowest) | **User** | `~/.claude/settings.json` | You only | Overridden by all higher layers |

**Applicable scenarios for each scope**:

| Scope | What to Put | Examples |
|-------|-------------|----------|
| **User** | Personal global preferences | Theme, editor, API keys, global MCP |
| **Project** | Team-shared rules | permissions allow/deny, hooks, shared MCP |
| **Local** | Personal project overrides | Debugging permission relaxations, experimental configs |
| **Managed** | Enterprise security policies | Mandatory deny rules, disable bypass, domain restrictions |

**Configuration locations for each feature**:

| Feature | User Location | Project Location | Local Location |
|---------|---------------|------------------|----------------|
| Settings | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| Subagents | `~/.claude/agents/` | `.claude/agents/` | None |
| MCP servers | `~/.claude.json` | `.mcp.json` | `~/.claude.json` (per-project) |
| Plugins | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| CLAUDE.md | `~/.claude/CLAUDE.md` | `CLAUDE.md` or `.claude/CLAUDE.md` | `CLAUDE.local.md` |

**Key rules**:
1. **Managed cannot be overridden**: Admin-set `managed` keys (like `allowedPlugins`, `knownMarketplaces`) are hidden from users and projects and cannot be modified
2. **Security exception**: Security-related keys like `apiKey`, `oauthToken`, `sandbox` allow Local override of Managed, preventing credential leaks
3. **Permission rules merge across scopes** (not override), higher priority entries match first
4. **Plugin configuration** follows the same priority merge rules
5. Invalid entries in Managed settings are auto-deleted with warnings logged (v2.1.169+), single typos won't disable remaining policies
6. Setting `auto` mode in project settings is ignored (v2.1.142+), preventing repos from granting themselves auto permissions

**Common pitfalls**:

| Pitfall | Symptom | Solution |
|---------|----------|----------|
| Project settings not taking effect | No change after modifying `.claude/settings.json` | Check if Local file overrides |
| Permission rule conflicts | Uncertain behavior when both allow and deny match | deny matches first |
| Managed settings ignored | Enterprise policies not effective | Confirm admin correctly set `managed` keys |

**Configuration file structure**:

```jsonc
// .claude/settings.json (project-level, committed to Git)
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(git:*)", "Read"],
    "deny": ["Bash(rm -rf:*)"]
  },
  "hooks": { "PostToolUse": [ /* ... */ ] },
  "mcpServers": { "github": { /* ... */ } }
}
```

### Core Settings Reference

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": { "...": "..." },
  "hooks": { "...": "..." },
  "env": { "...": "..." },
  "enabledPlugins": { "...": "..." },
  "pluginConfigs": { "...": "..." },
  "extraKnownMarketplaces": { "...": "..." },
  "outputStyle": "concise",
  "companyAnnouncements": [ "..." ]
}
```

The `$schema` line points to the official JSON Schema; add to settings.json to enable autocomplete in VS Code and other editors.

### Permission Configuration

**Five permission modes** (config value takes priority, display name mapping in [Glossary · Permission Modes](./claude-code-glossary#permission-modes)):

| Config Value (`defaultMode`) | Display Name | Behavior | Recommended Scenario |
|------------------------------|--------------|----------|----------------------|
| `default` | Normal | Ask confirmation before each execution | Most cautious |
| `auto` | Auto | AI classifier auto-decides: safe ops auto-approve, dangerous ops blocked | **Recommended for daily use** |
| `plan` | Plan | Read-only analysis, no changes executed | Plan before acting |
| `acceptEdits` | Accept Edits | Auto-approve edit operations, others ask | Edit without executing commands |
| `bypassPermissions` | Auto-Accept | Auto-approve all operations | When fully trusted |

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(git:*)", "Read"],
    "deny": ["Bash(rm -rf:*)", "Read(.env*)"]
  }
}
```

**Permission rule syntax**: Rule format `ToolName` or `ToolName(pattern)`, evaluation order **deny → ask → allow**, first matching rule decides result (not by specificity).

| Rule | Match Scope |
|------|-------------|
| `Bash` | All Bash commands |
| `Bash(npm run *)` | Commands starting with `npm run` |
| `Read(./.env)` | Reading `.env` file |
| `WebFetch(domain:example.com)` | Fetches to example.com |
| `mcp__github__get_*` | GitHub MCP get-series tools |
| `*` | Match all tools (deny only) |

Bash permission security constraints: `*` matches entire command not just arguments; `**` matches multiple directory levels in paths; use `Bash(git:*)` not `Bash(git *)` to avoid argument injection.

### Model and Response Settings

```json
{
  "model": "claude-sonnet-4-6",
  "outputStyle": "concise",
  "maxThinkingTokens": 10000
}
```

| Key | Description |
|-----|-------------|
| `model` | Default model, switch in-session with `/model`. Read at startup, no hot reload |
| `outputStyle` | Output style (`concise`/`explanation`/`none`), part of system prompt, rebuilt on `/clear` |
| `maxThinkingTokens` | Extended Thinking budget ceiling |

### Hook Configuration

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write", "hooks": [
        { "type": "command", "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\"" }
      ]}
    ]
  }
}
```

| Event | Trigger Time | Most Common Use |
|-------|--------------|------------------|
| `PreToolUse` | Before tool call | Intercept dangerous commands, modify params |
| `PostToolUse` | After tool call | Format, lint, test |
| `SessionStart` | Session start | Load env vars, initialize |
| `SessionEnd` | Session end | Cleanup, report |
| `UserPromptSubmit` | User submits message | Log, verify |
| `Notification` | Long-running operation notifications | Progress hints |
| `ConfigChange` | Settings file changed | Reload custom config |

Three Hook types: `command` (shell command), `prompt` (inject extra prompt), `mcp_tool` (call MCP server).

Hook security settings (settings level):

```json
{
  "allowedHttpHookUrls": ["https://hooks.example.com/*"],
  "httpHookAllowedEnvVars": ["MY_TOKEN", "HOOK_SECRET"]
}
```

> When `allowManagedHooksOnly` is `true` (Managed settings only), only Managed hooks and marketplace force-enabled plugin hooks are loaded, user and project hooks are blocked.

### Subagent Configuration

Custom subagents are Markdown files in `agents/` directory (YAML frontmatter + instructions): `~/.claude/agents/<name>.md` (user-level) / `.claude/agents/<name>.md` (project-level, team-shared).

```yaml
---
name: security-reviewer
description: Call for security review, permission check, OWASP compliance
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---
```

| Field | Required | Description |
|-------|:--------:|-------------|
| `name` | ✅ | Agent identifier (letters, numbers, hyphens) |
| `description` | ✅ | When Claude calls this agent |
| `tools` | ❌ | Allowed tool list, inherits all if omitted |
| `model` | ❌ | Specify model (`sonnet`/`opus`/`haiku`) |
| `permissionMode` | ❌ | Override global permission mode |
| `color` | ❌ | Display color in UI |

Built-in subagents: `Explore` (codebase exploration, read-only), `Plan` (planning research).

### Plugin Configuration

```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "analyzer@security-plugins": false
  }
}
```

Format: `"plugin-name@marketplace-name": true/false`, no explicit entry falls back to `defaultEnabled`. Scope rules: project settings > user settings; locally disable project plugin in `.claude/settings.local.json` set `false`; Managed force-enabled plugins cannot be locally disabled.

```json
{
  "pluginConfigs": {
    "deployer@acme-tools": { "options": { "api_endpoint": "https://api.example.com" } }
  }
}
```

`pluginConfigs` only read from user settings, `--settings` flag, and Managed settings; entries in project `settings.json`/`settings.local.json` are ignored.

```json
{
  "extraKnownMarketplaces": {
    "acme-tools": { "source": { "source": "github", "repo": "acme-corp/claude-plugins" } }
  }
}
```

Declare at project level, team members prompted to install marketplace when trusting repo.

**Plugin installation security**: Enabling plugins from external sources (GitHub/npm) in project's `.claude/settings.json` doesn't auto-install for others; each user must run `claude plugin install` to install and trust plugin before use.

### Environment Variables

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "ANTHROPIC_BASE_URL": "https://your-proxy.example.com"
  }
}
```

Can also export directly in Shell, or specify temporarily before command: `ANTHROPIC_BASE_URL=https://proxy.claude.com claude`

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | API key (used when not logged in) |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | Telemetry reporting (`1` to enable) |
| `CLAUDE_CODE_DISABLE_UPDATE_CHECK` | Disable update check (useful in CI) |
| `OTEL_METRICS_EXPORTER` | OpenTelemetry metrics export |
| `CLAUDE_CONFIG_DIR` | Specify config directory (for isolated debugging) |

### Sandbox Settings Essentials

Sandbox isolates Bash commands from filesystem and network, suitable for running Claude Code in untrusted environments.

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker *"],
    "allowUnsandboxedCommands": false
  }
}
```

Filesystem rules:

```json
{ "sandbox": { "filesystem": {
  "allowWrite": ["/tmp/build", "~/.kube"],
  "denyWrite": ["/etc", "/usr/local/bin"],
  "denyRead": ["~/.aws/credentials"],
  "allowRead": ["."]
}}}
```

Network rules:

```json
{ "sandbox": { "network": {
  "allowedDomains": ["github.com", "*.npmjs.org"],
  "deniedDomains": ["sensitive.cloud.example.com"],
  "allowUnixSockets": ["~/.ssh/agent-socket"],
  "allowLocalBinding": true
}}}
```

Credential protection:

```json
{ "sandbox": { "credentials": {
  "files": [{ "path": "~/.aws/credentials", "mode": "deny" }],
  "envVars": [
    { "name": "GITHUB_TOKEN", "mode": "deny" },
    { "name": "AWS_SECRET_ACCESS_KEY", "mode": "mask", "injectHosts": ["api.github.com"] }
  ]
}}}
```

> **Security note**: `allowManagedReadPathsOnly` (Managed settings only) can restrict sandbox to only recognize Managed scope `allowRead` rules, preventing project settings from relaxing file access.

Path prefixes: `/` absolute path · `~/` home directory · `./` or no prefix (project root, or `~/.claude` under Managed settings).

### When Configuration Takes Effect

Most settings **take effect immediately** (hot reload): `permissions`, `hooks`, `apiKeyHelper`, `env`; changes to user/project/local/Managed settings all trigger `ConfigChange` hook.

**Read once at startup** (restart or use command to switch after modifying):

| Key | Alternative Switch Method |
|----|---------------------------|
| `model` | Switch in-session with `/model` |
| `outputStyle` | `/clear` or rebuilt after restart |

### Verifying Your Configuration

When configuration doesn't take effect, troubleshoot in order:

```bash
/doctor                              # 1. Comprehensive diagnosis
/context                             # 2. Check context window
/hooks                               # 3. Check hooks status
/mcp                                 # 4. Check MCP servers
claude --safe-mode                   # 5. Safe mode isolate issues
CLAUDE_CONFIG_DIR=/tmp/claude-test claude   # 6. Isolated config directory to exclude interference
```

| Symptom | Cause | Solution |
|---------|-------|----------|
| `auto` mode not effective | `auto` ignored in project settings (v2.1.142+) | Move to `~/.claude/settings.json` |
| Hook not triggering | Matcher format error or wrong path | Use `/hooks` check registration status |
| MCP server won't connect | Wrong path or env var | Use `/mcp` view logs |
| Permission rules not effective | Wrong rule order | deny → ask → allow, first match applies |
| Sandbox fails to start | Missing dependency or unsupported platform | Set `failIfUnavailable: false` |
| Plugin not effective in team | Teammate not installed | Each user must run `claude plugin install` |

### Common Configuration Templates

**Frontend team project template**:

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": [
      "Bash(git:*)", "Bash(npm run *)", "Bash(npx *)", "Bash(pnpm *)",
      "Read", "Edit", "Write", "Grep", "Glob",
      "WebFetch(domain:github.com)", "WebFetch(domain:stackoverflow.com)"
    ],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)", "Bash(curl *)"]
  },
  "hooks": {
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [
      { "type": "command", "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true" }
    ]}]
  },
  "env": { "CLAUDE_CODE_ENABLE_TELEMETRY": "1" }
}
```

**Personal global preference template**:

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(git:*)", "Bash(npm run *)", "Bash(pnpm *)", "Read", "Edit", "Write", "Grep", "Glob"],
    "deny": ["Read(.*.key)", "Read(.*.pem)", "Bash(rm -rf:*)"]
  },
  "env": { "CLAUDE_CODE_ENABLE_TELEMETRY": "1" }
}
```

**Enterprise security policy template (Managed)**:

```json
{
  "permissions": {
    "defaultMode": "default",
    "disableBypassPermissionsMode": "disable",
    "deny": ["Bash(curl *)", "Bash(wget *)", "Read(*.env)", "Read(*.pem)"]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowManagedDomainsOnly": true,
      "allowedDomains": ["github.com", "*.npmjs.org", "registry.npmjs.org"]
    },
    "credentials": { "envVars": [
      { "name": "GITHUB_TOKEN", "mode": "deny" },
      { "name": "AWS_SECRET_ACCESS_KEY", "mode": "deny" }
    ]}
  }
}
```

---

## High-Quality Information Sources

> Complete verification checklist for official docs/Cookbook/blogs, social accounts (four-tier: by company/product/lead/core dev), high-quality GitHub repos, awesome lists, third-party blogs — not just reader references, but data foundation driving this tutorial's continuous updates. Organization method (how to systematically discover sources, verify social account identities) in repo [`.claude/skills/doc-research/references/sources/_template.md`](https://github.com/zenHeart/learn-ai/blob/claude/.claude/skills/doc-research/references/sources/_template.md).

Last systematic verification: 2026-08-17.

### Official Documentation

Claude Code actually spans two different official documentation sites, easy to confuse:

- **[Claude Code Documentation (English)](https://code.claude.com/docs/en/)** — CLI tool usage documentation: installation, commands, configuration, Hooks, Skills, etc.
  - Key sub-pages: [Commands Reference](https://code.claude.com/docs/en/commands) (built-in commands + bundled skills complete list, must-check before writing command-related content, this site's tutorial once wrote non-existent commands from not checking this page), [What's New](https://code.claude.com/docs/en/whats-new/index) (weekly updates, main tracking entry), [Settings](https://code.claude.com/docs/en/settings), [CLI Reference](https://code.claude.com/docs/en/cli-reference), [Best Practices](https://code.claude.com/docs/en/best-practices), [Troubleshooting](https://code.claude.com/docs/en/troubleshooting)
- **[Claude Developer Platform Documentation](https://platform.claude.com/docs/en/home)** — Developer documentation for Claude **API** (Messages / Managed Agents / Agent SDK), NOT Claude Code CLI documentation; they share underlying model capabilities but serve different audiences and content, don't confuse
  - Key sub-pages: [API Reference](https://platform.claude.com/docs/en/api/overview), [Release Notes](https://platform.claude.com/docs/en/release-notes/overview) (API-side changelog, separate update line from Claude Code's What's New)

### Official Cookbooks, Example Repos, and Other Official Resources

- **[Claude Cookbook](https://platform.claude.com/cookbook/)** — Official Cookbook site, covering 11 categories of code examples including Agent Patterns, Tools, Claude Agent SDK, Managed Agents, RAG, Multimodal, Evals, etc. **Mainly for Claude API / Agent SDK developers, not Claude Code CLI usage tips collection**, but "Claude Agent SDK" category is strongly related to Claude Code's underlying technology
  - Corresponding GitHub repo: [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) (40k+ star, runnable notebook version of same content)
  - **[Courses](https://anthropic.skilljar.com/)** — Official interactive courses
  - **[Quickstarts](https://github.com/anthropics/anthropic-quickstarts)** — Official deployable template repo

### Official and Core Team Social Accounts

Tiered by "information density for Claude Code **tool usage**," not by follower count — weighting: ① whether first-hand info (writing code/defining product/modifying features) ② whether teaching real usage (worktree/CLAUDE.md/skill/hook not "100 tips" collage) ③ whether updates keep up with versions (now almost weekly small version) ④ ratio of promoting courses/selling automation (higher subtracts points).

> The following tiering and commentary are compiled from [Grok deep search](https://x.com) results (search scope approx 2026-07 to 2026-08-16), Grok's judgment based on recent interaction data and content quality, not facts independently verified by this site — account existence and official identity cross-reference verified, but rankings and commentary please re-verify as needed. Follower counts/view counts quickly become outdated, only long-standing qualitative judgments retained here.

**S-tier (first-hand sources, nearly single source of truth)**

| Account | Identity | Why Ranked Here |
|---------|----------|------------------|
| **[@bcherny](https://x.com/bcherny)** | Claude Code author/lead | No more upstream source. The team methodology "multi-worktree parallel, Plan first, write to CLAUDE.md after changes, package repeated actions as skill" came from him, publicly discusses worktree cleanup, auto mode and other evolving features |
| **[@trq212](https://x.com/trq212)** | Claude Code engineer (Thariq Shihipar, Anthropic technical staff, formerly YC W20/South Park Commons/MIT Media Lab) | More "how-to" than lead account: how auto mode locks dangerous ops, when to let it keep going. Proposed widely adopted "9 skill categories" framework |
| **[@_catwu](https://x.com/_catwu)** | Claude Code + Cowork product lead (Cat Wu, identity independently confirmed by TechCrunch, Lenny's Newsletter etc.) | See where product is going: embedded desktop browser, multi-person collaboration, route from individual CLI to team-resident agent |
| **[@ClaudeDevs](https://x.com/ClaudeDevs)** | Official developer account | First landing point for feature launches, suitable as "version radar." Identity cross-confirmed by [@trq212 announcement post](https://x.com/trq212/status/2044893583308918787) "this is official channel for all Claude Code and Claude platform updates" |
| **[@adocomplete](https://x.com/adocomplete)** | Anthropic Community / Claude Code | Most operation-focused among official accounts, closer than official press releases to "open terminal how to press" |

**A-tier (high-frequency useful, complementary sources)**

| Account | Identity | For Whom |
|---------|----------|----------|
| **[@amorriscode](https://x.com/amorriscode)** | Claude Code @ Anthropic, formerly Stripe | Specializes in Desktop usage, CLI users can skim, must-follow for desktop users |
| **[@The_Whole_Daisy](https://x.com/The_Whole_Daisy)** | Claude Code engineer, cross session/SendMessage related | Posts few but all implementation details, for those already running multi Claude sessions |
| **[@ClaudeCodeLog](https://x.com/ClaudeCodeLog)** | Unofficial changelog bot (bio claims unofficial but tolerated) | Splits CLI/feature flag/prompt changes by version, low-cost "daily scan for new flags" solution |
| **[@oikon48](https://x.com/oikon48)** | Japanese engineer, author of "Claude Code Practical Introduction" | Highest signal-to-noise practice account among Chinese/Japanese users, distills changelog into actionable items, not selling courses |
| **[@simonw](https://x.com/simonw)** | Datasette / Django co-author | Independent, critical thinking, counterbalance to official optimistic narrative |
| **[@alexalbert__](https://x.com/alexalbert__)** | Anthropic Research | Occasionally drops internal usage data, not command cheat sheet account |
| **[@claudeai](https://x.com/claudeai)** | Official product account | Security plugin, limits, desktop redesign and such major features debut here |

**B-tier (useful but filter packaging)**

| Account | For Whom | Notes |
|---------|----------|-------|
| **[@dexhorthy](https://x.com/dexhorthy)** | Already running multi-agent workflows | Harness-focused, not introductory content |
| **[@svpino](https://x.com/svpino)** | Want quick keyboard shortcut collection | Practice-oriented collection, use as cheat sheet |
| **[@claude_code](https://x.com/claude_code)** | Browse community project dynamics | Community account, unofficial, uneven quality |

**Not recommended as primary follows**: Many top-ranked accounts when searching "Claude Code" are training/acquisition accounts (Japanese growth accounts especially common, common pitch like "XX million exposure/pure profit XX/seminar traffic diversion") — judgment criterion simple: whether they mention specific version numbers/flags/commands, or only generic rhetoric like "10x efficiency."

### Core Maintainer and Team Blogs

- **[Claude Blog](https://claude.com/blog)** — Official product news and best practices blog (different site from Engineering Blog below). Recent Claude Code articles: [Maximizing the value of your Claude Code sessions](https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions) (2026-08-14), [Auto mode is now the default](https://claude.com/blog/auto-mode-default-in-claude-code) (2026-08-07), [Running auto mode in production](https://claude.com/blog/auto-mode-in-production) (2026-08-07), [Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code) (2026-06-18)
- **[Anthropic Engineering Blog](https://www.anthropic.com/engineering)** — Official engineering blog, more technical depth: [How Claude Code works in large codebases](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start), [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk), [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### High-Quality GitHub Repos

- **[anthropics/claude-code](https://github.com/anthropics/claude-code)** (official, 140k+ star) — **Note: not complete source repo**, public content is CLI binary distribution + plugins (`plugins/`, `examples/`) + docs/issue tracking, core Agent implementation not open source. Suitable for viewing CHANGELOG, Issues, official plugin examples
- **[anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)** (official) — GitHub Actions integration, official implementation of `@claude` triggering Claude Code in CI

### Awesome Lists and Resource Aggregators

- **[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)** (52k+ star, 1500+ commits) — Broadest coverage, most actively maintained community curated collection
- **[subinium/awesome-claude-code](https://github.com/subinium/awesome-claude-code)** — Only repos with 1000+ star, higher quality threshold but narrower coverage (100+ star itself)

> ⚠️ Many similarly named repos (like `jqueryscript/awesome-claude-code`, `rohitg00/awesome-claude-code-toolkit`), always include owner when referencing, don't just write repo name.

### High-Quality Third-Party Blogs and Communities

English: [Codingscape: How Anthropic engineering teams use Claude Code every day](https://codingscape.com/blog/how-anthropic-engineering-teams-use-claude-code-every-day) — Deep dive based on official engineering blog

Chinese: [Claude Code Best Practices Chinese Edition (Zhihu)](https://zhuanlan.zhihu.com/p/1973059671540663242) — Chinese translation of official best practices; [Strongest Coding Agent: Claude Code Authoritative Practice Guide (Zhihu)](https://zhuanlan.zhihu.com/p/1920263182062163086) — Interpretation and organization based on official engineering blog

> Chinese content in search results dominated by Zhihu/CSDN mix translation/reposting and original, check if original source is credited before citing.

### To Be Verified

- **ClaudeLog (claudelog.com)**: Suspected dedicated resource site, but access returns 403 (anti-scraping), cannot confirm content quality and operator identity
- Multiple CSDN articles with titles indicating practical pitfall collections, only titles recorded, specific URLs and originality not confirmed, need re-search to locate and verify before use

---

## Related Pages

- [Claude Code Main Tutorial](./claude-code) — Installation, interaction, how to use core features
- [Practical Workflows Cookbook](./claude-code-cookbook) — Prompt patterns for 9 daily development scenarios
- [Glossary](./claude-code-glossary) — Complete definition of each concept, why needed, how it works
