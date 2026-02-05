# Claude Code CLI

## Basic Usage

1. Install Claude Code following [official docs](https://code.claude.com/docs/get-started/installation), see detailed platform-specific guides
2. Authenticate with one of three methods (see [authentication](https://code.claude.com/docs/get-started/authentication))

### Daily Usage

```bash
# Interactive REPL mode
claude

# Run single query and exit
claude -p 'explain this codebase'

# Continue most recent conversation
claude -c

# Resume specific session
claude -r "feature-implementation"

# Start with specific model
claude --model opus

# Process piped input
git diff | claude -p "review these changes"

# Background execution for long tasks
claude # then press Ctrl+B during command execution
```

### Keyboard Shortcuts

| Keys | Function |
|------|----------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear screen |
| `Ctrl+O` | Toggle verbose output |
| `Ctrl+V` (Mac) / `Alt+V` (Win) | Paste image or file path |
| `Ctrl+B` | Background long-running bash command |
| `Esc` `Esc` | Rewind code/conversation |
| `Shift+Tab` | Toggle permission modes |
| `Option+P` (Mac) / `Alt+P` (Win) | Switch model |
| `Up/Down` | Navigate command history |
| `Ctrl+R` | Reverse search history |
| `Ctrl+Y` | enable yolo mode|

### Multiline Input

| Method | Shortcut |
|--------|----------|
| Quick escape | `\` + `Enter` |
| macOS default | `Option+Enter` |
| After setup | `Shift+Enter` |
| Control sequence | `Ctrl+J` |

Setup multiline for your terminal:

```bash
claude
> /terminal-setup
```

## Commands

Claude supports slash commands. Type `/` to see all available commands.

### Built-in Commands

#### Session Management

| Command | Description |
|---------|-------------|
| `/clear` | Clear conversation history |
| `/rename <name>` | Give session a memorable name |
| `/resume [session]` | Resume another conversation |
| `/rewind` | Rewind code and/or conversation |
| `/exit` | Exit Claude Code |

#### Configuration

| Command | Description |
|---------|-------------|
| `/config` | Open settings interface |
| `/status` | Show version, model, account info |
| `/model` | Select or change AI model |
| `/agents` | Manage custom subagents |
| `/permissions` | View/update permission settings |
| `/sandbox` | Enable sandboxed bash tool |

#### Workspace

| Command | Description |
|---------|-------------|
| `/init` | Initialize project with CLAUDE.md |
| `/memory` | Edit CLAUDE.md memory files |
| `/add-dir` | Add additional working directories |
| `/todos` | List current TODO items |

#### Integration

| Command | Description |
|---------|-------------|
| `/ide` | Connect to IDE (VS Code, JetBrains) |
| `/mcp` | Manage MCP server connections |
| `/hooks` | Configure event-based automation |
| `/plugin` | Manage plugins |

#### Utilities

| Command | Description |
|---------|-------------|
| `/help` | Get usage help |
| `/doctor` | Check installation health |
| `/cost` | Show token usage statistics |
| `/stats` | View usage analytics |
| `/context` | Visualize context usage |
| `/export [file]` | Export conversation |
| `/bashes` | List background tasks |

### Custom Commands

Create reusable prompts saved in markdown files.

**Project-specific** (shared with team):

```bash
mkdir -p .claude/commands
echo "Review this code for security vulnerabilities:" > .claude/commands/security-review.md
```

Usage:

```
> /security-review
```

**Personal** (available in all projects):

```bash
mkdir -p ~/.claude/commands
echo "Optimize this code for performance:" > ~/.claude/commands/optimize.md
```

**With arguments:**

```markdown
<!-- .claude/commands/fix-issue.md -->
---
argument-hint: [issue-number]
description: Fix a GitHub issue by number
---

Fix issue #$1 by:
1. Finding the issue details
2. Locating relevant code
3. Implementing the solution
4. Running tests
5. Creating a PR
```

Usage:

```
> /fix-issue 123
```

**With bash execution:**

```markdown
<!-- .claude/commands/commit.md -->
---
allowed-tools: Bash(git:*)
---

Current status: !`git status`
Staged changes: !`git diff --staged`

Create a meaningful commit message based on the above.
```

## Session Management

### Understanding Sessions

Sessions store conversation history and can be resumed anytime.

```bash
# Start new session
claude

# Continue most recent
claude -c

# Resume by name
claude -r "auth-refactor"

# Interactive picker
claude -r
```

### Session Picker Shortcuts

| Key | Action |
|-----|--------|
| `↑/↓` | Navigate sessions |
| `→/←` | Expand/collapse groups |
| `Enter` | Select and resume |
| `P` | Preview session |
| `R` | Rename session |
| `/` | Search sessions |
| `A` | Toggle current dir vs all projects |
| `B` | Filter by git branch |
| `Esc` | Exit picker |

### Session Storage

- Location: `~/.claude/sessions/`
- Format: JSONL with full message history
- Cleanup: Auto-deleted after 30 days idle (configurable)

### Git Worktrees for Parallel Work

Work on multiple features with complete isolation:

```bash
# Create worktree for feature
git worktree add ../project-feature-a -b feature-a

# Run Claude in isolated environment
cd ../project-feature-a
claude

# List worktrees
git worktree list

# Clean up
git worktree remove ../project-feature-a
```

## Configuration

### Configuration Files

Hierarchical settings with priority order:

| Location | Purpose | Priority |
|----------|---------|----------|
| Managed settings (system) | Enterprise policies | Highest |
| `.claude/settings.json` | Project shared | High |
| `.claude/settings.local.json` | Personal project overrides | Medium |
| `~/.claude/settings.json` | User global | Low |

### CLAUDE.md Memory Files

Store project context and instructions:

```bash
.claude/CLAUDE.md          # Project-specific
~/.claude/CLAUDE.md        # Personal global
.claude/CLAUDE.local.md    # Personal project overrides
```

**Example CLAUDE.md:**

```markdown
# Project Context

## Architecture
- Frontend: React with TypeScript
- Backend: Node.js/Express
- Database: PostgreSQL

## Coding Standards
- Use TypeScript strict mode
- Write tests for all features
- Follow ESLint rules
- Format with Prettier

## Key Files
- Auth: src/services/auth.ts
- Database: src/db/schema.ts
- API: src/api/routes.ts

## Common Commands
- `npm run dev` - Start dev server
- `npm test` - Run tests
- `npm run build` - Production build
```

### Settings Configuration

Example `~/.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(git:*)",
      "Read"
    ],
    "deny": [
      "Bash(curl:*)",
      "Read(.env*)",
      "Read(secrets/**)"
    ]
  },
  "env": {
    "NODE_ENV": "development"
  },
  "model": "claude-sonnet-4-5-20250929"
}
```

### Key Settings

| Setting | Purpose | Example |
|---------|---------|---------|
| `permissions.allow` | Pre-approve tools | `["Bash(git:*)", "Read"]` |
| `permissions.deny` | Block tools | `["WebFetch"]` |
| `env` | Environment variables | `{"KEY": "value"}` |
| `model` | Default AI model | `"claude-sonnet-4-5-20250929"` |
| `outputStyle` | Response style | `"Concise"` |
| `alwaysThinkingEnabled` | Extended thinking | `true` |

### File Exclusion

Protect sensitive files:

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(./secrets/**)",
      "Read(.aws/**)"
    ]
  }
}
```

## MCP (Model Context Protocol)

Connect Claude Code to external tools, databases, and APIs.

### What You Can Do

- Implement GitHub issues
- Query databases
- Monitor Sentry errors
- Access Slack messages
- Manage cloud infrastructure
- Query analytics

### Installing MCP Servers

**HTTP Server (Recommended):**

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# With authentication
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer TOKEN"
```

**SSE Server:**

```bash
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

**Stdio Server (Local):**

```bash
# Local stdio server
claude mcp add --transport stdio database -- npx -y @example/database-mcp

# With environment variables
claude mcp add --transport stdio airtable --env AIRTABLE_API_KEY=KEY \
  -- npx -y airtable-mcp-server
```

### Managing MCP Servers

```bash
claude mcp list              # List configured servers
claude mcp get github        # Details for specific server
claude mcp remove github     # Remove server
```

In interactive mode:

```
> /mcp
```

### Installation Scopes

| Scope | Location | Share? |
|-------|----------|--------|
| **Local** | `.mcp.json` | No |
| **Project** | `.mcp.json` (committed) | Yes |
| **User** | `~/.claude.json` | No |

```bash
# Project scope (shared with team)
claude mcp add --transport http --scope project github https://...

# User scope (all your projects)
claude mcp add --transport http --scope user database https://...
```

### Popular MCP Servers

- **GitHub** - Issues, PRs, repositories
- **Sentry** - Error monitoring
- **PostgreSQL** - Database queries
- **Slack** - Messages, channels
- **Google Calendar** - Schedule management
- **Notion** - Workspace knowledge
- **Stripe** - Payment management

### Practical Examples

**Monitor Sentry errors:**

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
> /mcp  # Authenticate

# Then use:
> What are the top 5 errors this week?
```

**Query PostgreSQL:**

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://user:pass@host:5432/db"

> What's our total revenue this month?
```

**Import from Claude Desktop:**

```bash
claude mcp add-from-claude-desktop
```

## IDE Integration

### VS Code Extension

**Installation:**

1. Open Extensions (`Cmd+Shift+X`)
2. Search "Claude Code"
3. Install and restart

**Quick Start:**

- Click ✱ in editor toolbar
- Click "✱ Claude Code" in status bar
- Command Palette: "Claude Code"

**Features:**

- Inline diffs for review
- @-mentions with line numbers (`Alt+K`)
- Plan review before edits
- Auto-accept mode
- Multiple conversation tabs
- Terminal mode

**Shortcuts:**

| Shortcut | Action |
|----------|--------|
| `Cmd+Esc` / `Ctrl+Esc` | Toggle focus |
| `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | New tab |
| `Alt+K` | Insert file reference |

### JetBrains IDEs

Supports: IntelliJ, PyCharm, WebStorm, GoLand, PhpStorm, Android Studio

**Installation:**

1. Settings → Plugins
2. Search "Claude Code"
3. Install and restart

**Features:**

- Quick launch: `Cmd+Esc` / `Ctrl+Esc`
- IDE diff viewer
- Selection context sharing
- File references: `Cmd+Option+K` / `Alt+Ctrl+K`
- Diagnostics integration

**Connect from terminal:**

```bash
claude
> /ide
```

## Headless Mode (Automation)

Run Claude Code non-interactively for scripts and CI/CD.

### Basic Usage

```bash
# Simple query
claude -p "analyze this code"

# With JSON output
claude -p "find bugs" --output-format json

# Continue conversation
claude -p "what else?" --continue

# Resume specific session
claude -p "continue" --resume session-name
```

### Common Patterns

**Create commit messages:**

```bash
claude -p "Create commit for staged changes" \
  --allowedTools "Bash(git:*)"
```

**Code review:**

```bash
gh pr diff "$1" | claude -p "Review for security issues" \
  --output-format json
```

**CI/CD integration:**

```json
{
  "scripts": {
    "lint:claude": "claude -p 'Report issues in staged changes' --output-format json"
  }
}
```

**Pipe through Claude:**

```bash
cat error.log | claude -p "explain this error" > analysis.txt
cat code.py | claude -p "find bugs" --output-format json | jq .
```

### Output Formats

**Text (default):**

```bash
claude -p "query"
```

**JSON:**

```bash
claude -p "query" --output-format json
# Returns: {"result": "...", "session_id": "...", "usage": {...}}
```

**Streaming JSON:**

```bash
claude -p "query" --output-format stream-json
# Newline-delimited JSON in real-time
```

## Tools

Claude Code provides powerful tools for working with code.

### Available Tools

| Tool | Purpose | Permission |
|------|---------|------------|
| `Read` | Read files | No |
| `Write` | Create/overwrite files | Yes |
| `Edit` | Targeted edits | Yes |
| `Bash` | Execute shell commands | Yes |
| `Glob` | Find files by pattern | No |
| `Grep` | Search file contents | No |
| `WebFetch` | Fetch web content | Yes |
| `WebSearch` | Search web | Yes |
| `NotebookEdit` | Modify Jupyter notebooks | Yes |
| `Task` | Delegate to subagent | No |
| `TodoWrite` | Create task lists | No |

### Tool Permissions

Control which tools Claude can use:

```json
{
  "permissions": {
    "allow": ["Bash(npm run test)", "Read", "Glob"],
    "deny": ["WebFetch", "Bash(curl:*)"]
  }
}
```

### Permission Modes

Toggle with `Shift+Tab`:

| Mode | Behavior | When to Use |
|------|----------|-------------|
| **Normal** | Ask before actions | Default, most careful |
| **Auto-Accept** | Auto-approve changes | When you trust Claude |
| **Plan** | Read-only analysis | Before making changes |

## [Skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

Skills are comprehensive capabilities organized across multiple files.

### Create Your First Skill

```bash
mkdir -p ~/.claude/skills/code-explainer

cat > ~/.claude/skills/code-explainer/SKILL.md << 'EOF'
---
name: code-explainer
description: Explains code with diagrams and analogies
---

When explaining code:
1. Start with an analogy
2. Draw ASCII diagram
3. Walk through step-by-step
4. Highlight common mistakes
EOF
```

Claude automatically uses this skill when explaining code.

### Skills with Supporting Files

```
my-skill/
├── SKILL.md           # Overview
├── reference.md       # Detailed docs
├── examples.md        # Usage examples
└── scripts/
    └── helper.py      # Utility script
```

### Skills vs Commands

| Aspect | Commands | Skills |
|--------|----------|--------|
| Invocation | Manual: `/command` | Automatic |
| Structure | Single .md file | Directory with resources |
| Complexity | Simple prompts | Multi-step workflows |

more difference read [compare skills](https://support.claude.com/en/articles/12512176-what-are-skills#h_0f5f83e7da)

## plugin

you can organize your ability into plugins

### daily use

read  [create a plugin](https://code.claude.com/docs/en/plugins) to know more

```bash
# create a local plugins
mkdir -p ~/plugins/my-plugin

# install local plugins
# in claude
/plugin marketplace add ~/plugins
/plugin install  my-plugin@plugins

# after install you can use plugin skill or command


# update plugin
# in claude
/plugin update my-plugin@plugins
```

### Create a Plugin

## Best Practices

### Workflow: Understand Codebase

```bash
claude
> overview of this codebase
> what's the architecture?
> where is authentication handled?
> explain key patterns
```

### Workflow: Fix Bugs

```bash
> I'm seeing error: [paste error]
> can you reproduce this?
> suggest fixes
> apply the best fix
> run tests
```

### Workflow: Implement Features

```bash
# Use Plan Mode
claude --permission-mode plan
> Create plan for OAuth2 authentication
> What about backward compatibility?

# Execute
Shift+Tab  # Exit plan mode
> Implement first step
```

### Workflow: Code Review

```bash
> review my recent changes
> run linter
> suggest performance improvements
> security issues?
> add missing tests
```

### Workflow: Create PR

```bash
> summarize changes
> create pull request
> add testing details
```

### Daily Efficiency Tips

1. **Name sessions**: `/rename feature-name`
2. **Quick queries**: `claude -p "quick question"`
3. **Continue work**: `claude -c`
4. **Custom commands**: Build `.claude/commands/`
5. **Configure once**: Set up `.claude/settings.json`
6. **Reference files**: Use `@file.js`
7. **Extended thinking**: Type `ultrathink:` for complex problems
8. **Background tasks**: `Ctrl+B` for long commands
9. **Monitor context**: `Ctrl+O` for token usage
10. **MCP integration**: Connect daily tools

## Advanced Features

### Extended Thinking

Enable deep reasoning for complex problems:

```bash
# Enable in config
/config  # Toggle alwaysThinkingEnabled

# Single request
> ultrathink: design a caching layer

# Set token budget
export MAX_THINKING_TOKENS=8000
```

### Subagents

Delegate specialized tasks:

```bash
/agents  # Manage subagents
```

**Built-in:**

- **Explore** - Fast codebase exploration
- **Plan** - Research for planning
- **General** - Multi-step tasks

**Create custom:**

```markdown
# .claude/agents/reviewer.md
---
name: code-reviewer
description: Security and quality reviewer
tools: Read, Grep, Glob
---

You are a senior code reviewer...
```

### Hooks

Automate actions around tool execution:

```bash
/hooks
```

**Example: Auto-format after edit:**

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write \"$file_path\""
      }]
    }]
  }
}
```

### Environment Variables

```bash
# SessionStart hook
# .claude/settings.json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "source ~/.env > \"$CLAUDE_ENV_FILE\""
      }]
    }]
  }
}
```

### Sandboxing

Run bash in isolated environment:

```bash
/sandbox  # Enable sandboxing
# Commands run with filesystem/network isolation
```

## Troubleshooting

### Common Issues

**Claude not responding:**

- Check internet connection
- Start new conversation
- Try `-p` mode
- Run `claude doctor`

**IDE not working:**

- Restart IDE/reload window
- Ensure in project directory
- Check `/ide` output

**Permission issues:**

- Review settings
- Clear cache: `rm -rf ~/.claude.json`
- Run `claude doctor`

**MCP servers failing:**

- Verify URL/address
- Check environment variables
- Authenticate: `/mcp`

### Uninstall

**Native installation:**

```bash
rm -f ~/.local/bin/claude
rm -rf ~/.claude-code
```

**Homebrew:**

```bash
brew uninstall --cask claude-code
```

**NPM:**

```bash
npm uninstall -g @anthropic-ai/claude-code
```

**Clean all config:**

```bash
rm -rf ~/.claude
rm ~/.claude.json
rm -rf .claude
rm .mcp.json
```

## Resources

- **Official Docs**: <https://code.claude.com/docs>
- **GitHub**: <https://github.com/anthropics/claude-code>
- **MCP Registry**: <https://api.anthropic.com/mcp-registry>
- **Agent SDK**: <https://platform.claude.com/docs/agent-sdk>

## Summary

Claude Code is a powerful AI coding assistant with:

1. **Interactive development** - Natural conversation
2. **IDE integration** - VS Code and JetBrains
3. **Extensibility** - MCP, skills, custom commands
4. **Team collaboration** - Shared settings, skills
5. **Automation** - Headless mode, CI/CD
6. **Context management** - Sessions, memory, CLAUDE.md

**Start with basics:**

- `/config` for configuration
- `-c` to resume work
- `@file` to reference code
- `/rename` to organize sessions
- Custom commands for workflows

**Grow into advanced:**

- MCP servers for integrations
- Custom skills for specialized workflows
- Hooks for automation
- Subagents for complex tasks
- Headless mode for CI/CD

Happy coding with Claude!
