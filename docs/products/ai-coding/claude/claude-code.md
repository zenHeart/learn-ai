# Claude Code

Claude Code is an AI programming agent by Anthropic that can read codebases, edit files, run commands, and deeply integrate with development tools. It is not an isolated tool—**the same engine (CLAUDE.md, settings, MCP servers) is fully shared across terminal, IDE, desktop, and web**.

> **Version Note**: Claude Code iterates with weekly releases. Run `/powerup` to see the latest feature interactive course. This document is based on v2.1.x series (2026).

## Product Overview

Claude Code has 5 interfaces with consistent capabilities but different strengths:

| Interface | Entry | Unique Capabilities |
|-----------|-------|---------------------|
| **Terminal CLI** | `claude` command | Most flexible, supports scripting, CI/CD, headless mode |
| **VS Code Extension** | Install from Extension Marketplace | Inline diff review, `@` file mentions, multiple tabs |
| **JetBrains Extension** | JetBrains Marketplace | Interactive diff viewer, keyboard shortcuts `Cmd+Esc` / `Ctrl+Esc` |
| **Desktop App** | Claude Desktop "Code" tab | Visual diff, parallel sessions, PR monitoring, Computer Use |
| **Web Version** | [claude.ai/code](https://claude.ai/code) | No installation, PR Auto-fix, dispatch tasks from mobile |

**Recommendation**: Use VS Code/JetBrains extensions for daily development; CLI headless mode for CI/CD; Desktop App for visual review; Web version for temporary use.

---

## CLI Quick Start

### Installation

```bash
# macOS / Linux / WSL (recommended, auto-update in background)
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Homebrew (no auto-update)
brew install --cask claude-code

# WinGet
winget install Anthropic.ClaudeCode
```

> **Windows Users**: [Git for Windows](https://git-scm.com/downloads/win) must be installed first.

### Basic Usage

```bash
# Start interactive REPL in project directory
cd your-project && claude

# Run single query and exit (headless mode)
claude -p 'explain this codebase'

# Continue most recent session
claude -c

# Resume specific session
claude -r "feature-implementation"

# Start with specific model
claude --model claude-sonnet-4-6

# Pipe input
git diff | claude -p "review these changes"
```

### Complete CLI Flag Reference

```bash
claude [options]

Session Control:
  -p, --print <prompt>       Headless mode: run single query and exit
  -c, --continue             Continue most recent session
  -r, --resume [session]     Resume historical session (optionally specify name)
      --model <model>        Specify model (e.g., claude-sonnet-4-6)
      --effort <level>       Reasoning depth: low / medium / high / xhigh / max / ultracode
      --permission-mode <mode>
                             Permission mode: default / acceptEdits / plan / auto
                             / dontAsk / bypassPermissions / manual

Session Isolation:
      --worktree <name>      Run session in <repo>/.claude/worktrees/<name>
                             (creates worktree if missing, otherwise reuses)
      --worktree             Auto-generate a worktree name and use it
      --sandbox              Enable sandboxed bash execution
      --setting <key=value>  Apply a single settings key override

Output Control:
      --output-format <fmt>  Output format: text (default) / json / stream-json
      --json-schema <schema> Schema validation for JSON output
      --include-partial-messages
                             Include partial streaming events in stream-json
      --replay-user-messages Replay user messages from stdin to stdout

Tool Control:
      --allowed-tools <tools>  Restrict available tools (comma-separated).
                              Alias: --allowedTools
      --tools <tools>          Restrict the tool set ("" = no tools)
      --mcp-config <path>      Load MCP servers from JSON file
      --plugin-dir <path>      Load plugins from a directory (repeatable)
      --channels <plugin:NAME@MARKETPLACE ...>
                             Channels to enable (space-separated, repeatable)

Run Mode:
      --background           Run long-running tasks in background
      --cloud                Run in Anthropic cloud (runs even when computer is off)
      --chrome               Enable Chrome browser automation mode
      --telemetry            Enable OTEL telemetry
      --dangerously-skip-permissions
                             Skip permission prompts (use with caution)

Advanced:
      --agent <name>         Run as a custom sub-agent
      --worktree-feature     Worktree sub-agent --worktree feature
      --fork-session         Fork the current session into a new branch
      --from-pr <number>     Resume a session threaded from a PR comment
      --ide                  Auto-connect to the IDE (VS Code, JetBrains)
      --strict-mcp-config    Only load MCP servers from --mcp-config

Other:
  -d, --debug               Enable debug logging
      --debug-file <path>   Write debug logs to a file (or directory)
                             (alias: --debug-logs)
      --verbose             Override verbose mode setting
      --init                Run setup commands in a fresh session
      --system-prompt <text> Override the default system prompt
      --append-system-prompt <text>
                             Append to the default system prompt
  -v, --version             Display version number
  -h, --help                Display help information
```

> **Environment Variables**: `ANTHROPIC_API_KEY` (API key), `ANTHROPIC_AUTH_TOKEN` (OAuth/token), `ANTHROPIC_BASE_URL` (API endpoint), `ANTHROPIC_MODEL` (default model), `ANTHROPIC_DEFAULT_OPUS_MODEL` / `ANTHROPIC_DEFAULT_SONNET_MODEL` / `ANTHROPIC_DEFAULT_HAIKU_MODEL` (per-tier defaults), `CLAUDE_CODE_DEBUG_FILE` (debug log file path), `CLAUDE_CODE_SIMPLE=1` (simplified output). The `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` pair is the canonical way to point Claude Code at a compatible provider.

---

## Interaction Basics

### Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear screen |
| `Ctrl+O` | Toggle conversation history fullscreen mode |
| `Ctrl+V` / `Alt+V` | Paste image or file path |
| `Ctrl+B` | Run long commands in background |
| `Esc Esc` | Rewind code and conversation |
| `Shift+Tab` | Switch permission mode (Normal → Auto → Plan → Auto-Accept) |
| `Option+P` / `Alt+P` | Switch model |
| `↑ / ↓` | Navigate command history |
| `Ctrl+R` | Reverse search history |
| `Ctrl+X Ctrl+E` | Edit input in external editor |

### Multiline Input

| Method | Shortcut |
|--------|----------|
| Quick escape newline | `\` + `Enter` |
| macOS default | `Option+Enter` |
| Available after setup | `Shift+Enter` |
| Control sequence | `Ctrl+J` |

### Permission Modes

Use `Shift+Tab` to cycle through Normal / Auto / Plan / Accept Edits / Auto-Accept modes, or set default in `settings.json`:

```json
// .claude/settings.json - Set default permission mode
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

> For complete mode list, behavior descriptions, and configuration value reference, see [Glossary: Permission Modes](./claude-code-glossary#permission-modes) and [Cheatsheet · Decision Table](./claude-code-cheatsheet#which-permission-mode-to-use).

### Plan Mode Three-Phase Workflow (Recommended)

Official best practice is to break complex tasks into three phases, avoiding jumping straight to coding:

```
Phase 1: Explore
┌─────────────────────────────────────┐
│ Let Claude read-only explore repo:  │
│ - What tech stack?                   │
│ - What related files?                │
│ - How does data flow?                │
│ Do NOT write any code                │
└──────────────┬──────────────────────┘
               ▼
Phase 2: Plan
┌─────────────────────────────────────┐
│ Based on exploration, output plan:   │
│ - Which files to modify              │
│ - What changes per file              │
│ - Dependencies and execution order    │
│ Cheapest to correct (change plan)    │
└──────────────┬──────────────────────┘
               ▼
Phase 3: Implement
┌─────────────────────────────────────┐
│ Switch back to Auto/Normal, execute  │
│ Verify after each step (test/lint)   │
│ Re-plan if deviating                │
└─────────────────────────────────────┘
```

**When to skip Plan**: Small changes (< 2 files) can run directly in Auto mode. For 3+ files, always use Plan.

**Advanced**: Have one Claude write the plan, then start a new session and have another Claude review it with "senior engineer perspective"—no context bias, finds more gaps.

---

## Built-in Commands

### Session Management

| Command | Description |
|---------|-------------|
| `/clear` | Clear conversation history |
| `/rename <name>` | Name session (for `-r` resume) |
| `/resume [session]` | Resume another conversation |
| `/rewind` | Rewind code and conversation |
| `/exit` | Exit Claude Code |

### Configuration & Diagnostics

| Command | Description |
|---------|-------------|
| `/config` | Open settings interface |
| `/status` | Show version, model, account, usage info |
| `/model` | Switch AI model |
| `/permissions` | View/update permissions, `Recent` manually retry blocked operations |
| `/cost` | Show Token usage statistics |
| `/context` | Visualize context usage |
| `/doctor` | Check installation health |
| `/powerup` | Interactive feature tutorial with animations (recommended for new users) |

### Workspace

| Command | Description |
|---------|-------------|
| `/init` | Initialize project with CLAUDE.md |
| `/memory` | Edit CLAUDE.md memory file |
| `/add-dir` | Add additional working directory |
| `/todos` | List current TODO items |

### Extensions & Integration

| Command | Description |
|---------|-------------|
| `/ide` | Connect to IDE (VS Code / JetBrains) |
| `/mcp` | Manage MCP server connections and status |
| `/hooks` | Configure event-based automation |
| `/plugin` | Manage plugins |
| `/agents` | Manage sub-agents |
| `/sandbox` | Enable sandbox bash tool |

### Skills & Automation

| Command | Description |
|---------|-------------|
| `/code-review` | Auto code review of current changes |
| `/batch` | Batch process multiple prompts or files |
| `/debug` | Interactive debugging assistance |
| `/claude-api` | Direct Claude API reference |
| `/run` | Execute external scripts or commands |
| `/verify` | Verify code correctness |
| `/run-skill-generator` | Generate new custom Skill |

### Learning & Utilities

| Command | Description |
|---------|-------------|
| `/help` | Get usage help |
| `/export [file]` | Export conversation |
| `/schedule` | Create scheduled recurring task |
| `/loop` | Repeat prompt in CLI session (quick polling) |
| `/desktop` | Migrate current terminal session to Desktop App (visual diff) |
| `/teleport` | Pull Web session into local terminal |

---

## Project Context Management

### Memory System Overview

Claude Code has two complementary memory mechanisms for "what you tell Claude" vs "what Claude learns itself":

| Mechanism | Who Writes | Purpose | Storage |
|-----------|------------|---------|---------|
| **CLAUDE.md** | You manually | Project specs, tech stack, code conventions | `.claude/CLAUDE.md` (committed to Git) |
| **Auto Memory** | Claude auto | Build commands, debug findings, architecture decisions | `~/.claude/projects/<project>/memory/` |

### CLAUDE.md Loading Hierarchy

Each session startup loads context files in the following order, **later loads override earlier**:

```
1. ~/.claude/CLAUDE.md              # User global (applies to all projects)
2. Organization hosted CLAUDE.md    # Enterprise/team unified specs (if any)
3. .claude/CLAUDE.md                # Project shared (committed to Git)
4. .claude/CLAUDE.local.md          # Personal project override (not committed)
```

**Path scope rules**: Place `.md` files in `.claude/rules/` directory, specify `paths:` frontmatter to load only when accessing specific directories:

```markdown
---
paths: ["src/api/**", "src/services/**"]
---
# API Layer Standards
All API calls must go through `src/services/api-client.ts`, direct fetch/axios forbidden.
```

**File imports**: Use `@path/to/file` syntax in CLAUDE.md to import other files:

```markdown
@./docs/API_CONVENTIONS.md
@~/.claude/global-rules.md
@AGENTS.md  # Compatible with AGENTS.md standard
```

**Management commands**:

| Command | Purpose |
|---------|---------|
| `/memory` | Browse and manage all memory files |
| `/context` | Visualize currently loaded context files and usage |

**Example content**:

```markdown
# Project Context

## Tech Stack
- Frontend: React 18 + TypeScript strict mode
- Styling: Tailwind CSS
- State: Zustand
- Testing: Vitest + Testing Library

## Code Standards
- Write functional components, no classes
- Use useEffect for side effects, no direct API calls in render
- Naming: components PascalCase, functions camelCase, constants UPPER_SNAKE_CASE

## Common Commands
- `pnpm dev` - Start dev server
- `pnpm test` - Run tests
- `pnpm build` - Build production
```

### Auto Memory

Claude automatically learns and saves valuable information during conversations, **persists across sessions**:

- **Storage**: `~/.claude/projects/<project>/memory/`
- **Index file**: `MEMORY.md`—auto-loads first 200 lines (~25KB) on startup
- **Each memory**: Independent `.md` file with frontmatter (name, description, type, timestamp)
- **Memory types**: user preferences (user), feedback, project knowledge (project), external reference (reference)
- **Auto-linking**: Memories link via `[[memory-name]]`

### .claude Directory Structure

```
.claude/
├── CLAUDE.md              # Main context file
├── CLAUDE.local.md        # Personal local override (.gitignore)
├── settings.json          # Project-level config
├── settings.local.json    # Personal local config override
├── rules/                 # Path-scoped rules
│   └── api-rules.md
├── commands/              # Custom slash commands
│   └── security-review.md
├── agents/                # Custom sub-agents
│   └── reviewer.md
├── skills/                # Skill files
│   └── code-reviewer/
│       └── SKILL.md
├── hooks/                 # Hook scripts
│   └── lint-staged.sh
└── .mcp.json              # Project MCP config
```

> See [Glossary: Memory](./claude-code-glossary#memory).

---

## MCP Integration

Connect Claude Code to external tools, databases, and APIs. See [Glossary: MCP](./claude-code-glossary#mcp-model-context-protocol).

### Installing MCP Servers

```bash
# HTTP server (REST API type)
claude mcp add --transport http github https://api.github.com/mcp/

# Stdio server (local process type)
claude mcp add --transport stdio database -- npx -y @bytebase/dbhub
```

### Managing MCP

```bash
claude mcp list              # List installed servers
claude mcp get github        # View details
claude mcp remove github     # Remove
```

View status and toggle via `/mcp` command in session.

### Installation Scope

| Scope | Location | Team Shared? |
|-------|----------|:------------:|
| Project | `.mcp.json` (committed to Git) | ✅ |
| Local | `.mcp.json` (local override) | ❌ |
| User | `~/.claude.json` | ❌ |

### MCP Result Size Control

When tools return large data, declare max result size on server side:

```json
{
  "name": "get_schema",
  "_meta": {
    "anthropic/maxResultSizeChars": 500000
  }
}
```

---

## Hooks

Automatically trigger scripts at specific moments in Claude Code lifecycle for automation workflows. See [Glossary: Hooks](./claude-code-glossary#hooks).

### How They Work

Hooks execute automatically before/after tool calls, supporting three handler types:

| Type | Description | Use Cases |
|------|-------------|-----------|
| **command** | Shell script | Most common, run lint, format, etc. |
| **http** | HTTP POST request | Send to external services |
| **prompt** | LLM judgment | Let Claude decide whether to intercept |

### Hook Event Quick Reference

| Event | Trigger Time | Blockable? | Typical Use |
|-------|-------------|:----------:|------------|
| `SessionStart` | Session start/resume | ❌ | Load env vars, dev context |
| `Setup` | `--init-only` / `--maintenance` | ❌ | One-time dependency install |
| `InstructionsLoaded` | CLAUDE.md or rules load | ❌ | Audit log, compliance tracking |
| `UserPromptSubmit` | User submits prompt | ✅ | Validate/intercept specific prompts |
| `UserPromptExpansion` | Slash command expands to prompt | ✅ | Intercept dangerous commands (e.g., `/deploy`) |
| `PreToolUse` | Before tool call | ✅ | Intercept dangerous operations |
| `PostToolUse` | After tool call | ❌ | Auto format, lint |
| `PostToolUseFailure` | After tool call fails | ❌ | Error reporting |
| `PermissionRequest` | Permission confirm request | ✅ | Auto approve/deny specific permissions |
| `PermissionDenied` | When permission denied | ❌ | Notification, audit |
| `SubagentStart` | Sub-agent starts | ❌ | Logging |
| `SubagentStop` | Sub-agent stops | ❌ | Result processing |
| `TaskCreated` | Task created | ✅ | Workflow control |
| `TaskCompleted` | Task completed | ❌ | Notification |
| `Stop` | Claude finishes response | ✅ | Final review |
| `StopFailure` | Claude stop fails | ❌ | Error recovery |
| `SessionEnd` | Session ends | ❌ | Cleanup, reporting |
| `TeammateIdle` | Agent Team teammate idle | ❌ | Task assignment |

### Quick Examples

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\""
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "block-rm.sh",
            "if": "BashSubcommand(rm) && BashGlob(*)"
          }
        ]
      }
    ]
  }
}
```

> Scripts need executable permissions: `chmod +x .claude/hooks/*.sh`. Hooks trigger identically across terminal, IDE extensions, Desktop App, and Web.

### Async Hooks

By default hooks run synchronously, blocking Claude Code until complete. Add `"async": true` to run in background:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "claude --permission-mode acceptEdits -p 'review this file' \"$CLAUDE_TOOL_INPUT_FILE_PATH\"",
        "async": true
      }]
    }]
  }
}
```

Suitable for running tests, triggering CI, etc. where immediate results aren't needed.

### Prompt Hooks and Agent Hooks

**Prompt Hooks**: Let the LLM decide whether to intercept — suitable for security policies requiring semantic understanding:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "prompt",
        "prompt": "Decide whether this Bash command is safe. If it deletes or modifies system directories such as /etc or /usr, return block."
      }]
    }]
  }
}
```

**Agent Hooks**: Launch sub-agent for more complex judgment logic.

---

## Skills

Skills are capability packages with structured documentation. Claude intelligently recognizes scenarios and auto-loads them, or can be manually invoked. See [Glossary: Skills](./claude-code-glossary#skills).

### Built-in Skills (Slash Commands)

Claude Code includes built-in skills directly invocable via slash commands:

| Command | Purpose |
|---------|---------|
| `/doctor` | Diagnostic install and config issue checks |
| `/code-review` | Check diff/PR for correctness bugs and cleanup opportunities |
| `/batch` | Orchestrate large-scale cross-codebase parallel changes in isolated worktree |
| `/debug` | Enable debug logging and troubleshoot |
| `/loop` | Repeat prompt/command at fixed intervals or custom rhythm |
| `/claude-api` | Load Claude API / Managed Agents reference (not direct API call) |
| `/verify` | Check if code executes correctly |
| `/simplify` | Clean code style and readability issues |

### Skill Loading Priority

When multiple skills share a name, load in this order (higher priority overrides lower):

| Priority | Location | Use Case |
|:--------:|----------|----------|
| 1 (highest) | Enterprise managed skills | Team/unified enterprise specs |
| 2 | User skills (`~/.claude/skills/`) | Personal global skills |
| 3 | Project skills (`.claude/skills/`) | Project-specific skills |
| 4 (lowest) | Bundled skills | Built-in general skills |

### Skills vs Plugins

| | Skills | Plugins |
|:--|:------|:--------|
| **Form** | Single directory (`SKILL.md` + resources) | Multi-directory bundle (Skills + Agents + Hooks + MCP) |
| **Scope** | Single capability | Full suite of related capabilities |
| **Install** | Copy directly to `.claude/skills/` | Install via `/plugin install` |
| **Distribution** | Usually in-project use | Distributable via npm / Git / Marketplace |

**Community Skill Resources**:
- [Claude Directory](https://claudedirectory.org) — 37+ community skill templates covering dev, test, docs, etc.

> Third-party "one-click install" plugins such as `vercel-labs/claude-code-setup` are not endorsed by the official Claude Code documentation, and that repository URL was unreachable on 2026-08-17. For community best practices, refer directly to the [official Claude Code repository](https://github.com/anthropics/claude-code) and its `README`.

---

## Sub-agents

AI assistants with independent personas and permissions, can handle different tasks in parallel. See [Glossary: Sub-agents](./claude-code-glossary#sub-agents).

### Built-in Sub-agents

| Agent | Purpose |
|-------|---------|
| **Explore** | Quick codebase exploration, find files, understand structure |
| **Plan** | Planning research, create proposals |

### Custom Sub-agent Example

```markdown
<!-- .claude/agents/security-reviewer.md -->
---
name: security-reviewer
description: Call when security review, checking permission vulnerabilities, or OWASP compliance needed
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---
```

Supported fields: `name`, `description`, `tools` (tool whitelist), `model`, `permissionMode` (ask/auto), `initialPrompt` (auto-submitted initial prompt).

### Key Constraints

- **No sub-agent nesting**: Sub-agents can't delegate further sub-agents
- **Context isolation**: Each sub-agent has independent context window, won't see main agent or other sub-agent conversations
- **Parallel execution**: Multiple sub-agents can run simultaneously, consuming their own model quotas
- **`Task` tool**: Sub-agents invoked via `Task` tool, supports `subagent_type` and inline `prompt`

---

## Dynamic Workflows

Orchestrate large-scale sub-agent workflows via JavaScript scripts, upgrading multi-agent collaboration from "manual scheduling" to "scripted pipelines". Claude writes the script, runtime executes it.

### Core Concepts

Dynamic Workflows core idea: Claude writes a JavaScript file, directly calling `agent()` and `pipeline()` APIs to orchestrate sub-agents. The entire script is version-controlled, managed, and reused as a workflow.

### agent() API — Fan-out Parallel Mode

```javascript
// workflows/code-review.js
const results = await agent({
  description: "Review code quality of each module",
  prompt: "Review the following modules for security vulnerabilities and code style",
  agents: 5,              // Launch 5 parallel sub-agents
  model: "sonnet",        // Use Sonnet model
  workingDirectory: ".",
});

// results is a Promise array
for (const result of results) {
  console.log(result.summary);
}
```

**Fan-out Mode Points**:

| Point | Description |
|-------|-------------|
| `agents` parameter | Specify parallel sub-agent count (auto if omitted) |
| Prompt Caching | Shared context auto-cached, reduces token cost |
| Resumable execution | Script interruption resumes from breakpoint, no lost results |

### pipeline() API — Serial Pipeline

```javascript
// workflows/deploy-pipeline.js
const result = await pipeline({
  description: "Build → Test → Deploy",
  steps: [
    { role: "builder",  prompt: "Run the build and fix errors" },
    { role: "tester",   prompt: "Run the tests and fix failures" },
    { role: "reviewer", prompt: "Review the changes" },
    { role: "deployer", prompt: "Deploy to staging" },
  ],
});
```

Each step's output auto-becomes next step's context, forming pipeline.

### Workflow Script Structure

```javascript
// workflows/my-workflow.js
import { agent, pipeline } from "workflow-api";

export async function main(context) {
  // context contains env info, user request, etc.

  const choice = await context.ask(
    "Choose review scope: all / src / tests"
  );

  if (choice === "all") {
    // Fan-out full parallel
    return await agent({
      description: "Full code review",
      prompt: "Review all modules",
      agents: 10,
    });
  } else {
    // Pipeline serial processing
    return await pipeline({
      description: `${choice} module review pipeline`,
      steps: [
        { role: "lint",    prompt: `Lint ${choice}` },
        { role: "review",  prompt: `Review ${choice}` },
        { role: "fix",     prompt: `Fix any issues found` },
      ],
    });
  }
}
```

### Built-in Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `/deep-research` | Slash command | Multi-round deep research, auto-generate report |
| `ultracode` | Keyword trigger | Auto-run code review + fix workflow |

### Size Limits

| Mode | Sub-agent Limit | Use Case |
|------|:--------------:|----------|
| `small` | 5 | Daily development |
| `medium` | 20 | Large-scale refactor |
| `unrestricted` | Unlimited | Enterprise batch operations |

### Usage Constraints

- **Beta Phase**: Dynamic Workflows is experimental, API may change
- **No sub-agent nesting**: Sub-agents in workflows can't delegate others
- **Limited by `maxThinkingTokens`**: `agent()` calls in workflow don't inherit main session's extended thinking config
- **Case-sensitive**: `Agent()`, `AGENT()` invalid, must use lowercase `agent()`

---

## Cross-Session Messaging

Send text messages between different Claude Code sessions for multi-session collaboration. Via `ListAgents` and `SendMessage` tools.

### Core Concepts

Each Claude Code session registers with a message routing system on startup. You can:
- **Discover** other running Claude Code sessions on current machine
- **Send** plain text messages to other sessions
- **Receive** messages from other sessions

### Basic Usage

```
User: List currently running Claude Code sessions
Claude: Use ListAgents tool
→ Returns: session-abc (~/project-a), session-def (~/project-b)

User: Tell session-def to move API key to .env file
Claude: Use SendMessage tool
→ "Move the hardcoded API key into a .env file"
```

### @mention Syntax

Use `@` prefix for quick target session:

```
@session-abc please review my PR
@~/project-a tell me the build result
```

### Message Reception Settings

Configure message reception policy in project or user settings:

```json
// .claude/settings.json
{
  "crossSessionInbound": "accept",   // accept / hold / refuse
  "isolatePeerMachines": true,       // Isolate other machines on same network
  "dialogExpiry": "2h"               // Dialog expiry time
}
```

| Setting | Value | Description |
|---------|-------|-------------|
| `crossSessionInbound` | `accept` | Accept all messages directly |
| | `hold` | Messages enter pending queue, manual confirm |
| | `refuse` | Reject all cross-session messages |
| `isolatePeerMachines` | `true` | Only allow current session communication |
| `dialogExpiry` | `2h` | Dialog validity, expires after |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_MESSAGING_SOCKET` | Custom message socket path |
| `CLAUDE_CODE_MESSAGING_TRUST_ORIGINS` | Trusted source session list |

### Security Rules

- **Plain text only**: Can't send files, images, or conversation history
- **No impersonation**: Messages only from registered sessions
- **Transparent auditable**: All cross-session messages logged
- **Available platforms**: macOS, Linux, WSL (native Windows unsupported)

---

## Agent Teams (Experimental)

Organize multiple Claude Code sessions into a team, Lead agent assigns tasks, Teammates execute in parallel, share task list for multi-session coordination.

### Core Concepts

| Role | Responsibility |
|------|---------------|
| **Lead** | Create tasks, assign tasks, approve plans, monitor progress |
| **Teammate** | Claim tasks, execute, report results |

### Enable

```bash
# Enable via environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Or enable in settings
{
  "features": {
    "experimentalAgentTeams": true
  }
}
```

### Teammate Mode

| Mode | Description |
|------|-------------|
| **In-process** | Teammates run in same terminal process, share context |
| **Split-panes** | Teammates run in separate terminals (tmux / iTerm2), fully isolated |

### Task Flow

```
Lead creates task → Teammate claims → Teammate executes → Report results → Lead approves/assigns new task
```

### Hooks Integration

| Hook Event | Trigger |
|------------|---------|
| `TaskCreated` | Lead creates new task |
| `TaskCompleted` | Teammate completes task |
| `TeammateIdle` | Teammate idle waiting for new task |

### Constraints

- **No nested teams**: Only one team per session
- **Sub-agents reusable as teammates**: `.claude/agents/` definitions can register as teammates
- **Plan approval**: Complex tasks require Lead to approve Teammate's execution plan

---

## Worktree Parallel Isolation

Use Git worktree for multiple Claude Code sessions to **work in parallel on different branches of the same project**, isolated. See [Glossary: Worktree](./claude-code-glossary#worktree).

### Why Worktree Needed

Traditional mode: one Claude Code session occupies one working directory. Parallel features require manual branch switching, frequent conflicts.

Worktree mode: Each session has independent directory and branch, true parallel development.

### Usage

```bash
# Claude Code auto-manages worktree
claude --worktree /tmp/claude-worktree-feature-a

# Can also configure default worktree in settings
```

### Isolation Checks

Claude Code validates 4 isolation conditions: working dir in repo, Git index clean, no uncommitted changes, pointing to correct remote branch.

---

## Scheduled Tasks

### Three Scheduled Task Types

| Type | Runtime | Runs when computer off? | Access local files? |
|------|---------|:----------------------:|:-------------------:|
| **Cloud Scheduled Tasks** | Anthropic cloud infrastructure | ✅ | ❌ |
| **Desktop Scheduled Tasks** | Local Claude Desktop | ❌ | ✅ |
| **/loop** | CLI current session polling | ❌ | ✅ |

### Cloud Scheduled Tasks (Recommended)

Run on Anthropic-managed servers, executes even when computer is off. Create via:
- Web UI: [claude.ai/code](https://claude.ai/code)
- Desktop App: Scheduled Tasks panel
- CLI: Run `/schedule`

Suitable for: Morning PR review summary, nightly CI failure analysis, weekly dependency audit.

### Desktop Scheduled Tasks

Run locally, direct access to local files. Create: Claude Desktop → Scheduled Tasks → New.

Suitable for: Regular tasks reading local directories, processing local files.

### /loop Command (CLI Quick Polling)

```
> /loop Check build success every 30 seconds
```

Continuously repeat in current CLI session, suitable for quick monitoring during development.

---

## Headless Mode

Run non-interactively for scripts and CI/CD.

### Basic Usage

```bash
# Single query
claude -p "analyze this code"

# JSON output (for program parsing)
claude -p "find bugs" --output-format json

# Continue last session
claude -p "what else?" --continue

# Restrict allowed tools
claude -p "Create commit" --allowedTools "Bash(git:*)"
```

### Pipeline Combinations

```bash
# Analyze log anomalies
tail -200 app.log | claude -p "Find anomaly patterns and send a Slack notification"

# Automated CI translation
claude -p "Translate the newly added i18n strings to French and create a PR"

# Batch security review
git diff main --name-only | claude -p "Run a security review on these changed files"
```

---

## Git Integration

### Auto Commit

```
> Create a commit for these changes, use Conventional Commits format
```

Claude will: stage files → generate commit message → execute commit.

### PR Creation

```
> Create a Pull Request, describe this feature's changes and test results
```

### PR Auto-fix (Web Version)

After creating PR in Claude Code Web UI, enable **Auto fix** toggle, Claude auto-monitors CI status, fixes lint errors, handles code review suggestions, pushes until CI passes.

### GitHub Actions / GitLab CI

```yaml
# .github/workflows/claude-review.yml
- name: Claude Code Review
  uses: anthropic/claude-code-action@v1
  with:
    claude_api_key: ${{ secrets.CLAUDE_API_KEY }}
```

---

## Interface Variants

### Desktop App

Claude Desktop "Code" tab, use Claude Code in GUI:

| Feature | Description |
|---------|-------------|
| **Visual Diff Review** | Inline comments, visually inspect file changes |
| **App Live Preview** | Start dev server and preview effects |
| **Computer Use** | Claude controls mouse/keyboard, operates any GUI app |
| **PR Monitoring** | Monitor PR CI status, supports auto-fix and auto-merge |
| **Parallel Sessions** | Multiple sessions run simultaneously, auto Git worktree isolation |
| **Dispatch** | Receive tasks from mobile, create session on desktop to execute |
| **Scheduled Tasks** | Scheduled Claude tasks running locally |
| **Connectors** | Connect GitHub, Slack, Linear, etc. |
| **SSH Session** | Connect to remote server Claude Code |
| **Cloud Session** | Launch long tasks running on Anthropic cloud |

### VS Code Extension

1. Open Extension Marketplace (`Cmd+Shift+X`), search "Claude Code" install
2. Or click: [Install directly](vscode:extension/anthropic.claude-code) (supports Cursor)
3. Open Command Palette `Cmd+Shift+P`, type "Claude Code" → Open in new tab

**VS Code Exclusive**:
- Inline diff review (preview before editing)
- `@` file mentions (`Alt+K`)
- Plan mode: review plan before allowing execution
- Multi-conversation tabs
- Rate limit banner

### JetBrains Extension

Install from [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-), restart IDE.

- Quick launch: `Cmd+Esc` / `Ctrl+Esc`
- Interactive diff viewer
- Selective context sharing

### Web Version

Run Claude Code in browser, no local install: [claude.ai/code](https://claude.ai/code)

**Use Cases**:
- Handle repos not available locally
- Launch long tasks on mobile
- Temporary use on machines without dev environment
- Run multiple tasks in parallel

**Web Exclusive Features**:
- **PR Auto-fix**: Enable to auto-handle CI failures and code review feedback
- **Cloud Scheduled Tasks**: Create and manage tasks running on Anthropic cloud
- `/teleport` migrate session to local terminal

### Seamless Cross-Device Switching

Each Claude Code interface connects to the same underlying engine—CLAUDE.md, settings, MCP servers all shared across platforms.

#### Remote Control

Connect claude.ai website, Claude mobile app, or Slack to local Claude Code session for remote interaction.

**Three Connection Modes**:

| Mode | Command/Operation | Description |
|------|------------------|-------------|
| **Server Mode** | `claude --remote-control` | Start server continuously listening for remote connections |
| **Interactive Mode** | `/remote-control` or `/rc` | Temporarily accept one remote connection |
| **SSH Forwarding** | SSH tunnel | Remote machine exposes local port via SSH |

**Usage Flow**:

```bash
# Start remote control locally
claude --remote-control
# → Generates session URL (e.g., https://claude.ai/remote/abc123)

# Open URL on mobile/browser
# → Scan QR code or click link

# After connection, remote end can send messages and view output
```

**Trusted Devices**:

First connection requires biometric auth (fingerprint/Face ID), then 18-hour auth waiver. Re-auth after timeout or manual logout.

| Security Feature | Description |
|-----------------|-------------|
| Biometric step | First connection requires fingerprint/Face ID |
| 18-hour refresh | Trust validity 18 hours |
| Manual logout | `/remote-control logout` immediately revokes trust |
| Device list | View trusted devices in claude.ai settings |

**Mobile Push Notifications**:

Mobile receives push notification when remote connection disconnects or Claude needs confirmation. App responds even in background.

**Presence Heartbeats**:

Session URL auto-generates descriptive title (e.g., "Review auth PR"), easy to identify current work across devices.

#### Session Migration

| Feature | Command | Purpose |
|---------|---------|---------|
| `/teleport` | Migrate Web/mobile session back to local terminal | Cloud task needs local files |
| `/desktop` | Visualize diff in Desktop App | Large changes in terminal, need visual review |
| Dispatch | Send task from mobile to desktop | Dispatch work when away from computer |

#### Channels

Push external message source events (Telegram, Discord, iMessage) into Claude Code session:

| Channel | Type | Description |
|---------|------|-------------|
| Telegram | MCP plugin | Trigger Claude task from Telegram conversation |
| Discord | MCP plugin | Receive commands from Discord channel |
| iMessage | MCP plugin (Bun) | Trigger task from iMessage conversation |

Enable via `--channels` flag, supports permission relay (channel messages auto-follow permission flow) and sender allowlist (restrict senders).

> Channels is in Research Preview, use `--dangerously-load-development-channels` for custom channels.

#### Slack Integration

@Claude in Slack workspace triggers Claude Code tasks. Claude reads Slack message context, executes task in background, replies to same thread.

#### Quick Decision Table

| I want to | Solution |
|-----------|----------|
| Continue local session from mobile/browser | `claude --remote-control` + open session URL |
| Move terminal session to Desktop App for visual diff | Run `/desktop` |
| Pull Web session into terminal | Run `/teleport` |
| Dispatch task from mobile to Desktop App | Use Dispatch |
| Trigger Claude task in Slack | @Claude integration |
| Push events from Telegram/Discord/iMessage | `--channels` flag |

---

## Security and Permissions

### Permission Rules Configuration

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(git:*)",
      "Bash(npm test:*)",
      "Read",
      "Edit",
      "Write"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Read(.env*)",
      "Read(./secrets/**)"
    ],
    "defaultMode": "auto"
  }
}
```

### Config File Priority

Five-layer priority (Managed / CLI args / Local / Project / User), see [Cheatsheet · Configuration Scopes](./claude-code-cheatsheet#configuration-scopes), config items quick ref in [Cheatsheet full text](./claude-code-cheatsheet).

### Sandbox Mode

```
> /sandbox
```

Run Bash commands in isolated environment, prevent accidental file system modifications.

### Auto Permission Mode

AI classifier auto-decides: normal edits/reads auto-approved, dangerous commands (e.g., delete) blocked. Balance between Normal (ask everything) and Auto-Accept (accept everything).

Blocked operations can be manually reviewed via `/permissions → Recent`.

---

## Tool Reference

| Tool | Purpose | Permission Required? |
|------|---------|:--------------------:|
| `Read` | Read file contents | ❌ |
| `Write` | Create/overwrite file | ✅ |
| `Edit` | Precise string replacement | ✅ |
| `Bash` | Execute Shell commands | ✅ |
| `PowerShell` | Windows native PowerShell (preview) | ✅ |
| `Glob` | Match file paths by pattern | ❌ |
| `Grep` | Search file contents | ❌ |
| `WebFetch` | Fetch web content | ✅ |
| `WebSearch` | Search web | ✅ |
| `Task` | Delegate to sub-agent | ❌ |
| `TodoWrite` | Create/update task list | ❌ |
| `computer-use` | Screenshot and control mouse/keyboard (enable via /mcp) | ✅ |

---

## Best Practices

### Efficient Workflows

**Understand new codebase**:
```
> Give me an overview of this codebase, including tech stack, directory structure, and core modules
> Where is authentication logic handled?
> Describe this function's purpose in one sentence: [paste code]
```

**Fix bugs**:
```
> I encountered this error: [paste error]
> Can you help trace root cause?
> Implement fix, then run tests to verify
```

**Implement features (Plan mode recommended)**:
```bash
# First switch to Plan mode (read-only analysis)
Shift+Tab

> Design OAuth2 login flow implementation, including file structure and interface design

Shift+Tab  # Switch back to Auto or Normal
> Implement first step per plan
```

**Code review**:
```bash
git diff | claude -p "Do security and performance review of these changes, output issue list in JSON format"
```

**Refactor large modules**:
```
> Analyze dependencies in src/auth/ directory
> Propose gradual refactor plan, maintain backward compatibility
> Start with simplest module, refactor one by one
```

**Write tests**:
```
> Write unit tests for src/utils/validation.ts
> Cover happy path, edge cases, and error inputs
> Run tests ensure all pass
```

**Debug complex issues**:
```
> This request returns 500 error, help trace full call chain
> Add logs at each key node
> Analyze logs to find root cause
```

### Efficiency Tips

1. **Name sessions**: `/rename feature-name` — for quick `-r` resume
2. **Quick queries**: `claude -p "quick question"` — no interactive mode
3. **Plan first, execute later**: Use Plan mode for complex tasks, see clearly before executing
4. **Use Auto mode**: Saves time vs Normal, safer than Auto-Accept
5. **Leverage /powerup**: Run after major version upgrade, don't miss new features
6. **Sub-agent parallelism**: Split large tasks to multiple sub-agents for parallel processing
7. **Hook automation**: Auto-format on save, auto-lint before commit
8. **CLAUDE.md templates**: Pre-set CLAUDE.md in project templates, new members ready immediately
9. **Slash command shortcuts**: `/` then type first letters for quick command match
10. **Conversation export**: `/export` save complex problem-solving process as doc
11. **Regular CLAUDE.md pruning**: As project evolves, delete stale or irrelevant context, avoid context window bloat
12. **Verify first**: Let Claude write tests before implementing, or self-review code after completion (see "Verification Mode" below)

### Let Claude Self-Verify

> **Core Principle (emphasized in official docs)**: Giving Claude a way to "self-verify" is the highest-leverage action to improve output quality 2-3x. Without verification loop, you're the only feedback signal—every error awaits your discovery.

Claude's most effective usage isn't "have it complete", but "have it complete and verify":

**Key Mindset Shift**:
- ❌ "Fix this bug" → Claude stops after completion, you still need to manually verify
- ✅ "Fix this bug, run `npm test` to confirm fix effective, if failed continue fixing" → Claude self-iterate until passes

**Verification Depth Selection**:

| Depth | Method | Use Case |
|-------|--------|----------|
| **Light** | Require Claude run checks and iterate in one prompt | Single-shot tasks |
| **Medium** | Set `/goal` condition, Claude works until condition met | Multi-round tasks |
| **Strong Constraint** | Stop hook runs check script, blocks completion until pass | Unattended automation |
| **Independent Review** | Sub-agent with fresh model reviews results, tries to refute | High correctness requirements |

**Test-driven**:
```
> First write test cases for this feature, then implement feature, ensure all tests pass
```

**Adversarial Review**:
```
> What problems might your implementation have? Role-play as security engineer and review
```

**Pattern Comparison**:

| Pattern | Flow | Use Case |
|---------|------|----------|
| **Writer → Reviewer** | Claude writes code, another Claude session reviews | PR review, security-sensitive code |
| **Tests → Iterate → Pass** | Write tests → implement → run → fix failures → repeat | New feature development |
| **Plan → Implement → Verify** | Plan first → implement → self-check | Medium complexity tasks |

> **Core Principle**: Don't accept Claude's first output as final. Have it show verification process, or run tests yourself to confirm.

### Prompting Tips

| Tip | Example | Effect |
|-----|---------|--------|
| **Specify role** | "You are a senior security engineer, please review..." | Increase professional depth |
| **Step-by-step guide** | "First: analyze current state. Second: propose solution..." | Avoid jump-style execution |
| **Provide context** | "This is the project's tech stack: ..." | Reduce guessing |
| **Request output format** | "List as Markdown table..." | Structured output |
| **Set expectations** | "First give me 3 options, then recommend best..." | Get options rather than single answer |
| **Ask follow-up** | "Why choose option A? What are the risks?" | Get deep reasoning |

### Community Tips

The following tips come from community power users' real-world practice, covering usage not fully emphasized in official docs:

**Settings Tuning** (from 127+ community settings curation):
- Use `"defaultMode": "auto"` instead of Normal mode, reduce 80% confirmation popups
- `allow` high-frequency safe commands individually (e.g., `Bash(git:*)`, `Bash(npm run *)`), `deny` dangerous commands precisely (e.g., `Bash(rm -rf:*)`)
- Put team shared rules in project-level `settings.json`, personal debug rules in local `settings.local.json`
- Enterprise users use Managed settings to enforce security policies, prevent local override

**Prompting Patterns** (from 40+ tips community curation):
- **Progressive refinement**: First ask "what methods", then "which recommended", finally "implement it" — avoid Claude jumping to suboptimal plan
- **Negative prompting**: "Don't use regex, use string methods" — explicitly excluding unwanted options more effective than describing wanted options
- **Role stacking**: "You are senior security engineer + frontend performance expert" — multi-role combo covers cross-domains
- **Output constraints**: "List only 3, no more" — control output length, reduce reading cost
- **Let Claude ask**: "Before I give more details, tell me what else you want to know" — clarify first then execute

**Hooks Mastery** (from hooks depth practice):
- **Format on save**: `PostToolUse[Edit|Write]` → `prettier --write "$CLAUDE_TOOL_INPUT_FILE_PATH"`
- **Pre-commit validation**: `PreToolUse[Bash(git commit:*)]` → run `npm run lint && npm test`, block commit on failure
- **Custom Hook scripts**: Place Hook scripts in `.claude/hooks/`, use shebang `#!/bin/bash` ensure executable
- **Hook debugging**: Add `echo "HOOK TRIGGERED: $CLAUDE_TOOL_NAME" >> /tmp/hook-debug.log` at Hook script start

> **More real-world workflow examples** (with complete code and scenario breakdown): See [Practical Workflows Cookbook](./claude-code-cookbook)

> **Community Resources**:
> - [Claude Directory](https://claudedirectory.org) — Community-maintained Skills/Hooks/CLAUDE.md template library (100+ CLAUDE.md templates, 37+ Skills, 22+ Hooks), quick start best reference
> - [Reddit r/ClaudeCode](https://reddit.com/r/ClaudeCode) — Daily tips and discussion
> - [GitHub Discussions](https://github.com/anthropics/claude-code#discussions) — Official community
> - [Twitter/X: #ClaudeCode](https://x.com/search?q=ClaudeCode) — Real-time tips sharing
>
> Note: Third-party "one-click install" plugins such as `vercel-labs/claude-code-setup` are not endorsed by the official Claude Code documentation, and that repository URL was unreachable on 2026-08-17; they are intentionally omitted from this list. For community best practices, refer to the [official Claude Code repository](https://github.com/anthropics/claude-code).

---

## Troubleshooting

### Diagnostic Tools

Claude Code has complete diagnostic toolchain. Start with these commands when encountering issues:

| Command | Purpose | When to Use |
|---------|---------|--------------|
| `/context` | View context window usage | Suspect insufficient context, declining answer quality |
| `/doctor` | Comprehensive config diagnosis (install, permissions, hooks, MCP) | Install/config troubleshooting |
| `/hooks` | Check hooks config and recent execution | Hooks not triggering or abnormal behavior |
| `/mcp` | View MCP server status and logs | MCP server connection failure |
| `--safe-mode` | Start with minimal config (disable plugins/hooks/MCP) | Isolate if config/plugin causing issue |
| `CLAUDE_CONFIG_DIR` | Use specified directory as config root | Exclude current config file interference |

**Quick Diagnosis Flow**:
```
1. /doctor          → Check overall config health
2. /context         → Confirm context window not full
3. /hooks           → Confirm hooks properly registered and triggering
4. /mcp             → Confirm MCP servers online
5. claude --safe-mode  → If above all abnormal, use safe mode elimination to locate
```

### Common Issues

**Claude unresponsive or stuck**:
- `Ctrl+C` cancel current operation
- Run `claude doctor` check installation
- Restart: exit then restart
- Check API quota exhausted

**MCP server failure**:
- `/mcp` view server status
- Check URL/address and auth config
- View server logs
- Confirm server process still running

**Permission blocked**:
- `/permissions → Recent` manual review
- Add `allow` rules in `.claude/settings.json`

**Context window insufficient**:
- `/clear` clear conversation history
- `/context` view context usage
- Split complex tasks into sub-tasks
- Use CLAUDE.md reduce repetitive context

**Sub-agent not triggered**:
- Check if `description` specific enough
- Confirm `.claude/agents/` directory exists and file format correct
- Sub-agents can't nest, confirm no sub-agent calling sub-agent

**Hook not executing**:
- Confirm script has executable permissions: `chmod +x .claude/hooks/*.sh`
- Check if `matcher` correctly matches tool name
- View hook output logs

**Install/update issues**:
```bash
# macOS/Linux - manual reinstall
curl -fsSL https://claude.ai/install.sh | bash

# Check version
claude --version

# Homebrew users
brew upgrade claude-code
```

**Windows-specific issues**:
- Need to install [Git for Windows](https://git-scm.com/downloads/win) first
- Ensure Git Bash in PATH
- Better experience in WSL

**Web version issues**:
- Session timeout: Web version has inactivity timeout, disconnects after long inactivity
- File access limited: Web version can't access local filesystem
- PR Auto-fix needs GitHub access authorization

### Scenario-based Diagnosis

Below are the most common real-world troubleshooting scenarios, sorted by frequency:

#### Context Window Full — Answer Quality Suddenly Drops

**Symptoms**: Claude starts "forgetting" early instructions, repeating already-fixed errors, output quality noticeably drops.

**Troubleshooting**:
1. Run `/context` — confirm if usage exceeds 80%
2. Run `/clear` — must reset context between unrelated tasks
3. If task truly needs long context, run `/compact <instruction>` compress conversation (e.g., `/compact Keep the list of all modified files and test commands`)
4. Add compression preference in CLAUDE.md: `When compacting, always preserve the full list of modified files and any test commands`

**Root Cause**: LLM performance drops when context window fills. Single debugging session may consume tens of thousands of tokens.

> **Prevention**: Frequent `/clear`, actively reset at task boundaries. After correcting same problem twice+, must `/clear` restart—context polluted by failed methods. Pro/Max plan usage resets every 5 hours, `/usage` check remaining quota anytime.

#### MCP Server Connection Failure

**Symptoms**: `/mcp` shows server disconnected or timeout, Claude says "unable to connect to XX service".

**Troubleshooting**:
1. `/mcp` — view server status and last error
2. Check `claude mcp get <name>` returned config — URL, port, auth correct
3. If remote MCP (HTTP/SSE): confirm server URL accessible (`curl <url>`)
4. If local MCP (stdio): confirm server process still running
5. View server logs for detailed errors

**Common causes**:
- Remote MCP: server address changed, OAuth token expired, firewall blocked
- Local MCP: process crashed, dependencies not installed, port conflict

#### Hook Defined But Not Executing

**Symptoms**: No auto-format after editing files, no lint validation before commit—Hook seems ignored.

**Troubleshooting**:
1. `/hooks` — check if Hook correctly registered in config
2. Confirm script has executable permissions: `chmod +x .claude/hooks/*.sh`
3. Check `matcher` field — tool name must exactly match (`Edit|Write` not `edit`)
4. Add debug output at Hook script start: `echo "HOOK: $CLAUDE_TOOL_NAME" >> /tmp/hook-debug.log`
5. Confirm `$CLAUDE_TOOL_INPUT_FILE_PATH` etc env vars available in current Hook type (`SessionStart` has no tool input path)

**Common causes**: matcher case error, script no execute permission, Hook type and required env vars mismatch.

#### Permission Mode Causing Low Efficiency

**Symptoms**: Every operation requires manual confirmation, or dangerous-skip-permissions causes accidental file deletion.

**Troubleshooting**:
1. `/permissions` — view current permission rules and recent confirmation records
2. Normal mode too cumbersome? Switch to Auto mode (`/permission-mode auto`) — AI classifier auto-decides
3. Add `allow` rules for known safe commands (e.g., `Bash(git:*)`, `Bash(npm run *)`)
4. Precisely `deny` dangerous commands (e.g., `Bash(rm -rf:*)`, `Read(.env*)`)
5. If config messed up, use `claude --safe-mode` start with minimal config for troubleshooting

**Common causes**: Permission rules too coarse (allow too much or deny too little), not leveraging tool prefix matching.

#### Auth Repeatedly Fails — Still Prompt Unauthenticated After Login

**Symptoms**: After completing OAuth login, Claude Code still prompts "Not authenticated", or requires re-login every startup.

**Troubleshooting**:
1. Run `/logout` completely logout
2. Close Claude Code, restart `claude` and complete auth
3. If browser doesn't auto-open, press `c` copy OAuth URL manually paste to browser
4. If issue persists, delete cached auth file: `rm -rf ~/.config/claude-code/auth.json`, then restart

**Common causes**: Cached auth token corrupted or expired, simple re-login can't clear residual state.

#### API Key vs Subscription Conflict — Unexpected Charges

**Symptoms**: Clearly subscribed to Pro/Max plan, but Claude Code prompts API usage exhausted or gets charged.

**Troubleshooting**:
1. Check if `ANTHROPIC_API_KEY` env var exists: `echo $ANTHROPIC_API_KEY`
2. If has value, Claude Code uses API key not subscription quota: `unset ANTHROPIC_API_KEY`
3. Permanent fix: edit `~/.zshrc` or `~/.bashrc`, remove line setting that var
4. Use `/usage` confirm current quota display back to normal

**Root Cause**: Environment variable `ANTHROPIC_API_KEY` has higher priority than subscription auth. Once set, all requests go pay-as-you-go.

#### Session Resume Failure

**Symptoms**: `claude -c` prompts "No conversation found", or `/resume` list empty.

**Troubleshooting**:
1. Confirm `~/.claude/` directory exists and has write permissions
2. Check disk space: session persistence needs disk write
3. If started with `--no-session-persistence`, conversation won't be saved
4. Check `CLAUDE_CODE_SESSION_DIR` env var points to valid path
5. Confirm no cleanup tools (like `~/Library/Caches` cleanup scripts) accidentally delete session data

**Common causes**: Headless mode `-p` defaults to no session save (unless explicitly `--continue`), cleanup scripts accidental deletion.

### Getting Help

- Run `/help` view all available commands
- `/usage` — view current API usage and remaining quota
- `/bug` — Report bug directly in Claude Code, auto-attach `/doctor` diagnostic output
- View [troubleshooting official page](https://code.claude.com/docs/en/troubleshooting)
- [GitHub Discussions](https://github.com/anthropics/claude-code#discussions) community help
- [What's New](https://code.claude.com/docs/en/whats-new/index) view latest features

### Uninstall

```bash
# Native install
rm -f ~/.local/bin/claude
rm -rf ~/.claude-code

# Homebrew
brew uninstall --cask claude-code

# WinGet
winget uninstall Anthropic.ClaudeCode
```

---

## How to Track the Latest Changes

Claude Code updates extremely frequently (almost weekly new versions), ways to keep track:

1. **[What's New page](https://code.claude.com/docs/en/whats-new/index)**: Weekly changelog, covers new features, improvements, fixes. Continuously updated from v2.1.83 (March 2026), one version per week.
2. **`/powerup` command**: Run after major version upgrade, auto-discover new features and shortcuts.
3. **`claude --version`**: Check current version anytime.
4. **[GitHub Releases](https://github.com/anthropics/claude-code/releases)**: Complete version release notes and migration guides.
5. **Community dynamics**: Follow [GitHub Discussions](https://github.com/anthropics/claude-code#discussions) for community discussions and FAQs.

> **Tip**: Add What's New page to RSS reader, or set weekly reminder in calendar to view.

### Version Changes Covered in This Doc

Body no longer writes version numbers in subheadings (avoid checking each section for updates every iteration), instead centralized here:

| Feature | Introduced Version | Description |
|---------|-------------------|-------------|
| MCP result size control | v2.1.91+ | See [MCP Integration](#mcp-result-size-control) |
| Auto permission mode | v2.1.83+ | See [Auto Permission Mode](#auto-permission-mode) |
| Managed settings invalid entries auto cleanup | v2.1.169+ | See [Cheatsheet · Configuration Scopes](./claude-code-cheatsheet#configuration-scopes) |
| Project settings `auto` mode ignored | v2.1.142+ | See [Cheatsheet · Configuration Scopes](./claude-code-cheatsheet#configuration-scopes) |
| Plugin install security validation | v2.1.195+ | See [Cheatsheet · Plugin Configuration](./claude-code-cheatsheet#plugin-configuration) |

---

## Further Reading

- **[Glossary](./claude-code-glossary)** — Unified explanation of 14 core concepts: MCP / Hooks / Skills / Sub-agents, etc.
- **[Cheatsheet](./claude-code-cheatsheet)** — Settings Scope five-layer priority, permission rule syntax, Hook/sub-agent/plugin config, Sandbox settings, decision tables, data sources
- **[Practical Workflows Cookbook](./claude-code-cookbook)** — Prompt patterns for 9 daily dev scenarios, Writer/Reviewer parallel mode, CLAUDE.md maintenance principles, extension mechanism selection decisions

## Resources

- [Official Documentation](https://code.claude.com/docs/en/overview)
- [What's New (weekly changelog)](https://code.claude.com/docs/en/whats-new/index)
- [CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Common Workflows](https://code.claude.com/docs/en/common-workflows)
- [Best Practices](https://code.claude.com/docs/en/best-practices)
- [Settings Reference](https://code.claude.com/docs/en/settings)
- [Hooks Development Guide](https://code.claude.com/docs/en/hooks-guide)
- [Sub-agents Guide](https://code.claude.com/docs/en/sub-agents)
- [Plugins Reference](https://code.claude.com/docs/en/plugins-reference)
- [Troubleshooting](https://code.claude.com/docs/en/troubleshooting)
