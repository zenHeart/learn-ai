# Claude Code Glossary

> This is an **explanatory** document — answering "what is this concept, why is it designed this way, when should I use it." It complements the [Claude Code Cheatsheet](./claude-code-cheatsheet): the cheatsheet answers "how to configure, what are the parameters, how to choose," while this document answers "what is this, why is it needed, how does it relate to other concepts."
>
> **All terms shared across chapters** are defined here in one place. The main tutorial [Claude Code](./claude-code) and [Practical Cookbook](./claude-code-cookbook) reference this page, avoiding redundant explanations and inconsistent descriptions.

## Concept Map

```
                    ┌─────────────┐
                    │   MCP Protocol│  ← Lowest-level open protocol
                    │ (Open Standard)│
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌───┴───┐  ┌────┴────┐
         │ Hooks   │  │Skills │  │Connectors│  ← Different wrappers based on MCP
         │ (Hooks)  │  │(Skills)│  │(Connectors)│
         └────┬────┘  └───┬───┘  └──────────┘
              │           │
              └─────┬─────┘
                    │
              ┌─────┴─────┐
              │  Plugins  │  ← Package the above capabilities into installable units
              │  (Plugins)   │
              └───────────┘

External Collaboration      ┌─────────────┐  ┌─────────────┐
                            │ Sub-agents  │  │  Memory     │
                            │ (Sub-agents)    │ (Memory)      │
                            └─────────────┘  └─────────────┘
```

**Core Logic**: MCP is the lowest-level open protocol, defining how Claude communicates with external tools. Hooks, Skills, and Connectors are different abstraction layers built on MCP. Plugins package Skills + Agents + Hooks + MCP into an installable unit. Sub-agents and Memory run parallel to the above mainline — they are independent dimensions for "multi-agent collaboration" and "cross-conversation memory."

---

## MCP (Model Context Protocol)

**What It Is**: An open standard protocol defining how AI applications (like Claude) securely communicate with external tools, databases, and APIs. Think of it as the "USB interface" of the AI world — any tool following the protocol can plug in and work.

**Why It Matters**: Before MCP, each AI tool needed to implement its own logic for connecting to external services — connecting to GitHub, databases, and Slack all required separate implementations. With MCP:
- **Tool developers** only need to implement an MCP server once, and all MCP-supporting AIs can use it
- **Users** only need to configure connections once, then share them across Claude Code, Claude.ai, and Claude Desktop
- **Ecosystem**: Over 1000 tools including GitHub, databases, Slack, Jira already have MCP server implementations

**Role in the Claude Ecosystem**:

| Layer | MCP-Based Capability | Description |
|------|---------------------|-------------|
| Claude Code CLI | `claude mcp add` to add MCP servers | Local processes or HTTP servers |
| Claude.ai / Desktop | Connectors | Cloud MCP servers with one-click OAuth authorization |
| Plugins | `.mcp.json` configuration | MCP server definitions embedded in plugins |
| Custom Tools | Custom MCP servers | Connect to internal or self-built tools |

**Two Transport Methods**:

| Method | Use Case | Configuration Example |
|--------|----------|----------------------|
| **stdio** | Local processes (databases, CLI tools) | `claude mcp add --transport stdio db -- npx -y @bytebase/dbhub` |
| **HTTP/SSE** | Remote services (cloud APIs, internal services) | `claude mcp add --transport http github https://api.github.com/mcp/` |

**Official Docs**:
- [MCP Development Guide](https://code.claude.com/docs/en/mcp)
- [MCP Registry](https://modelcontextprotocol.io/servers)
- [Claude Code MCP Reference](https://code.claude.com/docs/en/cli-reference#mcp)

---

## Skills

**What It Is**: A folder containing instructions, scripts, and resources that Claude dynamically loads to improve stability on specialized tasks. Simply put: skills make Claude more professional and stable for specific tasks.

**Two Types of Skills**:

| Type | Location | Description |
|------|----------|-------------|
| **Project Skills** | `.claude/skills/<name>/SKILL.md` | Project-shared, committed to Git |
| **User Skills** | `~/.claude/skills/<name>/SKILL.md` | Personal global, applies to all projects |

**Core Mechanism**:
1. Claude analyzes the current task during conversation
2. Matches against the `description` field in the Skills directory
3. Automatically loads the corresponding `SKILL.md` instructions when matched
4. Can also be manually invoked with `/skill-name`

**Difference from Commands**:

| Dimension | Commands | Skills |
|------|---------------|--------------|
| Trigger | Manual `/command` | Auto-recognition + manual |
| Structure | Single `.md` file | Directory with resources (`SKILL.md` + scripts) |
| Complexity | Simple prompts | Multi-file, multi-step workflows |

**SKILL.md Example**:

```markdown
---
name: code-reviewer
description: Use when user requests code review, PR review, or code quality checks
tools: Read, Grep, Glob
---

You are a senior code review expert. Please check the following aspects:
1. Security vulnerabilities (OWASP Top 10)
2. Performance issues
3. Code style consistency
4. Test coverage
```

**Official Docs**:
- [Skills Development Guide](https://code.claude.com/docs/en/skills)
- [Claude.ai Skills](https://support.claude.com/en/articles/12512198)

---

## Hooks

**What It Is**: Scripts that **automatically trigger** before or after Claude Code tool calls, enabling automated workflows. For example: auto-format after saving files, run lint before commits, load environment variables at session start.

**Why Hooks Are Needed**: Skills are loaded by Claude based on **judgment** of whether they match the scenario (semantic matching), while Hooks **always** trigger on specific events (deterministic, like "run format on every save"). They complement each other.

**Common Trigger Events**:

| Event | Trigger Timing | Typical Use |
|------|---------------|-------------|
| `PreToolUse` | Before tool call | Intercept dangerous operations, modify parameters |
| `PostToolUse` | After tool call | Auto-format, lint, test |
| `SessionStart` | Session start | Load environment variables, initialize |
| `SessionEnd` | Session end | Cleanup, reporting |
| `UserPromptSubmit` | User submits message | Logging, validation |
| `ConfigChange` | Config file changes | Reload custom config |

> For complete event list and `if` condition syntax, see [Hooks Reference](https://code.claude.com/docs/en/hooks-guide) and [cheatsheet · Hook Configuration](./claude-code-cheatsheet#hook-configuration).

**Three Hook Types**:

| Type | Description | Use Case |
|------|-------------|----------|
| `command` | Execute shell commands | Format, lint, test |
| `prompt` | Inject additional prompt to Claude | Dynamically inject context |
| `mcp_tool` | Call MCP server | Complex external integrations |

**Official Docs**:
- [Hooks Development Guide](https://code.claude.com/docs/en/hooks-guide)
- [Hooks Reference](https://code.claude.com/docs/en/hooks-guide)

---

## Plugins

**What It Is**: An **independent unit** that extends Claude Code capabilities, capable of packaging Skills, Agents, Hooks, MCP servers, and other features for cross-project reuse and team sharing. A plugin is essentially a **directory** containing several components.

**Plugin-Component Relationship**:

```
Plugin (Plugin)
├── skills/        ← Skills
├── agents/        ← Sub-agents
├── hooks/         ← Hooks
├── .mcp.json      ← MCP servers
├── .lsp.json      ← LSP servers
└── settings.json  ← Default configuration
```

**Plugins vs Skills**: A plugin is a "packaged capability bundle," while a skill is just one component. You can use skills alone (copy directly to `.claude/skills/`), or package multiple skills into a plugin for distribution (npm / Git / Marketplace).

**Two Installation Scopes**:

| Scope | Storage Location | Description |
|-------|------------------|-------------|
| `--scope user` | `~/.claude/plugins/cache/` | User-level, applies to all projects (default) |
| `--scope project` | `.claude/` | Current project only (commit to Git for team sharing) |

**Plugin Sources**:

| Source | Description |
|--------|-------------|
| **npm** | `claude plugin install @company/ai-kit` |
| **Git** | Install from GitHub/GitLab repositories |
| **Local directory** | `claude --plugin-dir ./my-plugin` |

**Official Docs**:
- [Plugins Reference](https://code.claude.com/docs/en/plugins-reference)
- [Marketplace](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins)

---

## Sub-agents

**What It Is**: AI assistants with **independent persona, permissions, and toolsets**. The main agent can spawn multiple sub-agents to handle different tasks in parallel, then merge the results.

**Why Needed**: In complex tasks, a single agent processing everything causes "context pollution" — long conversations mix exploration, implementation, and review, interfering with each other's thinking. Sub-agents give each subtask its own **clean, independent context window**.

**Two Types of Sub-agents**:

| Type | Description | Configuration Location |
|------|-------------|------------------------|
| **Built-in** | Explore (codebase exploration), Plan (planning and research) | System-built, no configuration needed |
| **Custom** | Specialized agents you define | `.claude/agents/<name>.md` |

**Custom Sub-agent Example**:

```markdown
<!-- .claude/agents/security-reviewer.md -->
---
name: security-reviewer
description: Invoke when security review, permission vulnerability checks, or OWASP compliance is needed
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---

You are a code review expert focused on web security, skilled at identifying OWASP Top 10 vulnerabilities.
```

**Use Cases**:
- Large task decomposition: Have multiple agents review different modules in parallel
- Specialized division of labor: Separate agents for security review, performance analysis, test generation
- Model selection: Use Sonnet for simple tasks, Opus for complex tasks
- **Context isolation**: Avoid long tasks polluting the main conversation context

**Key Constraints**:
- **No nested sub-agents**: Sub-agents cannot delegate to sub-agents
- **Context isolation**: Each sub-agent has an independent context window, seeing neither the main agent's nor other sub-agents' conversations
- **Parallel execution**: Multiple sub-agents can run simultaneously, each consuming their respective model's quota

**Official Docs**: [Sub-agents Guide](https://code.claude.com/docs/en/sub-agents)

---

## Memory

**What It Is**: Enables Claude to **remember across conversations** your preferences, background information, and work habits, so you don't need to reintroduce yourself each time.

**Two Complementary Memory Types**:

| Mechanism | Who Writes | Purpose | Storage Location |
|-----------|------------|---------|------------------|
| **CLAUDE.md** | You manually write | Project specs, tech stack, coding conventions | `.claude/CLAUDE.md` (committed to Git) |
| **Auto Memory** | Claude automatically writes | Build commands, debugging findings, architecture decisions | `~/.claude/projects/<project>/memory/` |

**Why Two Systems**: CLAUDE.md addresses stable rules that "you tell Claude" (team/project specifications); Auto Memory addresses dynamic knowledge that "Claude learns itself" ("yesterday's debugging found this API returns 500 in test environment"). The former is specification, the latter is personal notes.

**CLAUDE.md Loading Hierarchy** (for complete rules and scope table, see [cheatsheet · Settings Scope](./claude-code-cheatsheet#configuration-scopes)):

```
Managed policy (enterprise/system, highest priority)
    └── ~/.claude/CLAUDE.md (user global)
        └── .claude/CLAUDE.md (project-shared, committed to Git)
            └── .claude/CLAUDE.local.md (personal local override, not committed)
```

**Auto Memory Indexing Mechanism**:
- **Index file**: `MEMORY.md` — automatically loads first 200 lines (~25KB) at startup
- **Each memory**: Independent `.md` file with frontmatter (name, description, type, timestamp)
- **Memory types**: User preferences (user), feedback (feedback), project knowledge (project), external references (reference)
- **Auto-linking**: Memories link to each other via `[[memory-name]]`

**Official Docs**: [Memory System](https://code.claude.com/docs/en/memory)

---

## Dynamic Workflows

**What It Is**: The capability to orchestrate large-scale sub-agent workflows via JavaScript scripts. Claude writes the scripts, and the runtime executes them — elevating multi-agent collaboration from "manual scheduling" to "scripted pipelines."

**Why Needed**: Sub-agents suit medium-scale scenarios where "the main agent manually spawns a few sub-agents." For **massive parallelism** (like reviewing 100 PRs simultaneously) or **reusable pipelines** (build → test → deploy), script orchestration is more maintainable than manual scheduling.

**Core APIs**:

| API | Purpose | Pattern |
|-----|---------|---------|
| `agent()` | Launch multiple sub-agents in parallel | Fan-out |
| `pipeline()` | Execute multi-step pipelines sequentially | Sequential |

**Built-in Workflows**:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `/deep-research` | Slash command | Multi-round deep research with auto-generated reports |
| `ultracode` | Keyword | Auto code review + fix workflow |

**Usage Limitations**:
- Beta phase, APIs may change
- No nested sub-agents
- Subject to `maxThinkingTokens` limit
- Case-sensitive: `Agent()` and `AGENT()` are invalid

**Official Docs**: [Dynamic Workflows](https://code.claude.com/docs/en/workflows)

---

## Cross-Session Messaging

**What It Is**: Send plain text messages between different Claude Code sessions, enabling multi-session collaboration. **Plain text** means no files, no full conversation history can be transferred — this is a built-in security boundary.

**Why Needed**: When working in parallel across multiple sessions (one on backend, one on frontend), sessions need to synchronize signals like "I'm done, you can continue," rather than requiring users to manually copy.

**Core Tools**:

| Tool | Purpose |
|------|---------|
| `ListAgents` | List currently available Claude Code sessions |
| `SendMessage` | Send text messages to specified sessions |

**@mention Syntax**:
- `@session-abc` — Mention by session ID
- `@~/project-name` — Mention by project path

**Receiving Settings** (for complete configuration parameters, see [cheatsheet · Permission Configuration](./claude-code-cheatsheet#permission-configuration)):

| Setting | Optional Values | Description |
|---------|-----------------|-------------|
| `crossSessionInbound` | accept / hold / refuse | Message receiving policy |
| `isolatePeerMachines` | true / false | Whether to isolate other machines on the same network |
| `dialogExpiry` | Time string | Dialog expiration time |

**Security Rules**:
- Plain text only, cannot send files or conversation history
- Messages can only come from registered sessions
- All cross-session messages are auditable

**Official Docs**: [Cross-Session Messaging](https://code.claude.com/docs/en/cross-session-messaging)

---

## Agent Teams (Experimental)

**What It Is**: An experimental feature that organizes multiple Claude Code sessions into a team, with a Lead assigning tasks, Teammates executing in parallel, and sharing a task list.

**Difference from Sub-agents**:

| Dimension | Sub-agents | Agent Teams |
|------|------------|------------|
| Isolation Level | Same terminal process | Independent sessions (can use split-pane) |
| Context | Shares main agent context | **Completely isolated** independent contexts |
| Coordination | Main agent manually spawns | Shared task list + Lead assignment |
| Scale | A few parallel sub-tasks | Complex collaboration with role-based division |

**Roles**:

| Role | Responsibility |
|------|----------------|
| **Lead** | Create tasks, assign tasks, approve proposals, monitor progress |
| **Teammate** | Claim tasks, execute, report results |

**Teammate Modes**:

| Mode | Description |
|------|-------------|
| **In-process** | Runs within same terminal process, shares context |
| **Split-panes** | Independent terminals (tmux/iTerm2), fully isolated |

**Constraints**:
- No nested teams (one session, one team)
- Sub-agents can register as teammates
- Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

**Official Docs**: [Agent Teams](https://code.claude.com/docs/en/agent-teams)

---

## Remote Control

**What It Is**: Connect claude.ai web, Claude mobile app, or Slack to your local Claude Code session for remote interaction.

**Why Needed**: A long task runs locally (build, test, deploy), and you want to check progress from your phone or add a new instruction temporarily. Remote Control makes this "remote append" an officially supported capability.

**Three Connection Modes**:

| Mode | Flag/Command | Description |
|------|-------------|-------------|
| **Server** | `claude --remote-control` | Continuously listen for remote connections |
| **Interactive** | `/remote-control` or `/rc` | Accept one-time connection |
| **SSH Forwarding** | SSH tunnel | Remote machine exposes local port via SSH |

**Security Mechanism — Trusted Devices**:

- First connection requires biometric authentication (fingerprint / Face ID)
- Trust validity: 18 hours
- `/remote-control logout` immediately revokes
- Mobile push notifications + Presence Heartbeats (heartbeat detects connection activity)

**Official Docs**: [Remote Control](https://code.claude.com/docs/en/remote-control)

---

## Channels

**What It Is**: Push events from external messaging sources (Telegram, Discord, iMessage) into Claude Code sessions, enabling task triggering from non-Claude interfaces.

**Why Needed**: Remote Control is "controlling local sessions from Claude interfaces"; Channels is the reverse — "triggering Claude tasks from external messaging sources you already use (Telegram/Discord/iMessage)." The latter better suits collaboration scenarios where "non-Claude users need Claude's help."

**Supported Channels**:

| Channel | Type | Description |
|---------|------|-------------|
| Telegram | MCP plugin | Trigger tasks from Telegram conversations |
| Discord | MCP plugin | Receive commands from Discord channels |
| iMessage | MCP plugin (Bun) | Trigger tasks from iMessage conversations |

**Key Features**:
- Enable with `--channels` flag
- Permission relay: Channel messages automatically go through permission flow
- Sender allowlist: Restrict who can send
- Status: Research Preview phase

**Official Docs**: [Channels](https://code.claude.com/docs/en/channels)

---

## Worktree

**What It Is**: Uses Git's `git worktree` feature to let multiple Claude Code sessions **work in parallel on different branches of the same project**, without interference.

**Why Needed**: In traditional mode, one Claude Code session occupies one working directory. To work on two features in parallel, you manually switch branches, causing frequent conflicts. Worktree gives each session an independent directory and branch for true parallelism.

**Core Value**:
- **Parallel development**: One session works on feature A, another on feature B
- **Session isolation**: Each session has independent working directory and Git state
- **Automatic management**: Claude Code automatically creates and cleans worktrees

**CLI Flag**:

```bash
claude --worktree /tmp/claude-worktree-<name>
```

**Isolation Checks** (Claude Code automatically verifies 4 conditions before starting a session):
1. Whether working directory is within original repository
2. Whether Git index is clean
3. Whether there are uncommitted changes
4. Whether pointing to correct remote branch

**Official Docs**: [Worktree Deep Dive](https://code.claude.com/docs/en/worktrees)

---

## Permission Modes

**What It Is**: Controls whether Claude asks you before executing operations. It's the most frequently used "decision parameter" in daily use — choosing the wrong mode either floods you with confirmation popups or removes safety boundaries.

**Five Modes** (for complete comparison table and decision guide, see [cheatsheet · Which Permission Mode to Use](./claude-code-cheatsheet#which-permission-mode-to-use)):

| Display Name | Configuration Value | Behavior | When to Use |
|-------------|---------------------|----------|-------------|
| **Normal** | `default` | Ask for confirmation before execution | Default, most cautious |
| **Auto** | `auto` | AI classifier auto-decides: safe operations auto-approve, dangerous operations blocked | Recommended: no frequent confirmations, retains safety boundaries |
| **Plan** | `plan` | Read-only analysis, no changes | Plan first, act later |
| **Accept Edits** | `acceptEdits` | Auto-approve edit operations, other operations like command execution still ask | When you only want to allow file editing, commands still need confirmation |
| **Auto-Accept** (Bypass) | `bypassPermissions` | Auto-approve all operations | When you fully trust Claude |

**Difference Between Configuration Value and Display Name**: `Shift+Tab` cycles through display names; `settings.json` `defaultMode` uses configuration values. They correspond one-to-one, but format differs (camelCase vs. lowercase-with-hyphens).

**Evolution Trend**: From August 2026, Auto mode became the new default for Pro/Max/Team plans — officially finding that the AI classifier's recognition rate for dangerous commands is sufficiently high, and the cost of Normal mode being flooded by popups outweighs the cost of occasionally blocking low-value operations.

**Official Docs**: [Permission Reference](https://code.claude.com/docs/en/permissions)

---

## Related Pages

- [Claude Code Main Tutorial](./claude-code) — Installation, interaction, how to use core features
- [Claude Code Cheatsheet](./claude-code-cheatsheet) — Configuration/decision tables/data source quick reference
- [Practical Workflow Cookbook](./claude-code-cookbook) — Prompt patterns for 9 daily development scenarios
