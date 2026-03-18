# Agent Hooks: Event-Driven Control for AI Assistants

**Reading Time:** 25 minutes | **Difficulty:** Intermediate | **Prerequisites:** Basic understanding of AI coding agents, command-line scripting

## What You'll Learn

By the end of this guide, you'll understand:
- What hooks are and why they're essential for production AI agent usage
- The common patterns that emerge across different implementations
- How to implement hooks in Claude Code, Cursor, and Kiro
- Security considerations and best practices
- How to choose the right hook strategy for your workflow

## Introduction: The Hook Pattern in AI Agents

**CRITICAL CONTEXT:** Hooks are **not a unified standard** but rather a **common pattern** implemented differently across AI coding tools. Think of hooks like "middleware" in web frameworks—the concept is universal, but Express.js, Django, and Rails each implement middleware differently.

When you use AI coding assistants like Claude Code, Cursor, or Kiro, you're delegating significant control to an AI. The agent can read files, execute commands, modify code, and interact with external tools. While this automation is powerful, it raises important questions:

- How do I ensure the AI follows my team's code quality standards?
- Can I prevent the agent from executing dangerous operations?
- How do I integrate the agent with my existing development workflow?
- Can I audit what the agent is doing for compliance purposes?

**Hooks provide the answer.** They are event-driven automation mechanisms that let you insert custom logic at specific points in an AI agent's lifecycle, transforming a black-box assistant into a controllable, observable, and extensible tool.

## Why Hooks Matter

### The Problem: Uncontrolled Automation

Without hooks, AI agents operate with broad permissions but limited oversight:

```
User Request → AI Processing → Tool Execution → Result
                    ↑
          (No visibility or control)
```

This creates challenges:
- **Quality Risk:** AI might write code that works but violates your style guide
- **Security Risk:** Agent could accidentally commit secrets or execute destructive commands
- **Integration Gap:** Can't connect agent actions to your existing toolchain (CI/CD, monitoring, etc.)
- **Compliance Issues:** No audit trail for regulated environments

### The Solution: Event-Driven Control Points

Hooks transform the agent lifecycle into an observable, controllable pipeline:

```
User Request → [Hook: BeforePrompt] → AI Processing → [Hook: BeforeTool] → Tool Execution → [Hook: AfterTool] → Result
                      ↑                                       ↑                                    ↑
                 Inject context                         Approve/Deny                      Format/Validate
```

This enables:
- **Quality Gates:** Auto-format code after edits, run linters before commits
- **Safety Policies:** Block dangerous commands, detect secrets in files
- **Workflow Integration:** Send Slack notifications, update task trackers
- **Observability:** Log all agent actions for debugging and compliance

### Hooks vs. Agent Instructions

It's important to understand the distinction:

| **Agent Instructions (CLAUDE.md)** | **Hooks** |
|-----------------------------------|-----------|
| Suggestions embedded in prompts | Hard-coded rules with guaranteed execution |
| AI interprets and may deviate | Deterministic, always run |
| Effective for high-level guidance | Effective for enforcement and automation |
| Example: "Follow PEP 8 style" | Example: Run `black` on every Python file edit |

**Use both together:** Instructions guide the AI's thinking; hooks enforce the rules.

## Core Concepts Across All Implementations

Despite different syntax and features, all hook implementations share these fundamental patterns:

### 1. Event-Driven Architecture

Hooks respond to specific **lifecycle events** in the agent's operation:

```
Common Event Types:
├── Session Lifecycle (start, stop)
├── User Interaction (prompt submission, feedback)
├── Tool Operations (before execution, after completion)
├── File Operations (read, edit, create, delete)
└── External Integrations (MCP calls, shell commands)
```

### 2. Hook Execution Flow

```
Event Triggered
      ↓
  Hook Exists?
  ↙        ↘
Yes        No
  ↓          ↓
Execute   Continue
Hook      Normally
  ↓
Hook Response
  ↓
Allow/Deny/Ask
```

### 3. Permission Control Model

Most implementations use a three-state permission model:

- **Allow:** Proceed with the operation
- **Deny:** Block the operation (with optional explanation)
- **Ask:** Pause and request user confirmation

### 4. Data Communication

Hooks receive **event data** (context about what's happening) and return **response data** (decisions and modifications):

```json
// Input: Event data sent to hook
{
  "event": "beforeFileEdit",
  "file_path": "/src/utils.py",
  "content": "def hello():\n  print('world')",
  "metadata": { "user": "alice@example.com" }
}

// Output: Hook response
{
  "permission": "allow",
  "modified_content": "def hello():\n    print('world')",
  "message": "Auto-formatted with Black"
}
```

### 5. Configuration as Code

All implementations store hooks in version-controlled files, enabling:
- Team-wide consistency
- Auditable changes
- Environment-specific configurations

## Implementation Comparison

Here's how the three major implementations differ:

| Feature | Claude Code | Cursor | Kiro |
|---------|-------------|--------|------|
| **Configuration Location** | `.claude/settings.json` | `.cursor/hooks.json` | `.kiro/hooks/` (directory) |
| **Configuration Format** | JSON with command/prompt modes | JSON with process spawning | JSON with natural language |
| **Execution Model** | Shell commands or LLM prompts | Bidirectional JSON over stdio | AI-interpreted prompts |
| **Event Granularity** | 7 lifecycle events | 12+ events (agent + tab) | 4 trigger types |
| **Enterprise Distribution** | Manual deployment | MDM + cloud sync | Version control only |
| **Key Strength** | LLM-based decision-making | Comprehensive event coverage | Natural language simplicity |
| **Best For** | Context-aware workflows | Enterprise security policies | Developer-friendly automation |

### When to Choose Each Implementation

**Choose Claude Code hooks when:**
- You need context-aware decisions (using LLM prompts)
- Working primarily with Claude as your agent
- You want simple command execution without complex protocols

**Choose Cursor hooks when:**
- Enterprise security/compliance is critical
- You need fine-grained control over multiple event types
- You want centralized policy management across teams
- Integration with security partners (Semgrep, Snyk, etc.)

**Choose Kiro hooks when:**
- You prefer natural language over scripting
- Working with Kiro's context-aware AI features
- You want minimal configuration complexity

## Detailed Implementation Guide: Claude Code

### Configuration Structure

Claude Code stores hooks in `.claude/settings.json` at two levels:

```
~/.claude/settings.json        # User-level (applies to all projects)
/project/.claude/settings.json # Project-level (overrides user settings)
```

### Lifecycle Events

Claude Code provides seven hook points:

| Event | When It Fires | Common Use Cases |
|-------|---------------|------------------|
| `UserPromptSubmit` | Before AI processes user input | Inject context, log requests |
| `PreToolUse` | Before tool execution | Block dangerous operations, validate parameters |
| `PostToolUse` | After tool completes successfully | Format code, run tests, send notifications |
| `Notification` | When system generates notifications | Forward to Slack/email |
| `Stop` | Main session halts | Save session logs, cleanup |
| `SubagentStop` | Subagent completes task | Track subagent performance |
| `SessionStart` | New session begins | Load environment, check dependencies |

### Two Hook Modes

#### Command Mode: Fast and Predictable

Executes shell scripts directly. Best for deterministic operations like linting or formatting.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/local/bin/prettier --write {{file_path}}"
          }
        ]
      }
    ]
  }
}
```

**How it works:**
1. Event fires (e.g., file edited)
2. JSON event data sent to script via stdin
3. Script processes data, executes action
4. Script outputs response to stdout

#### Prompt Mode: Context-Aware Decisions

Uses the LLM to make intelligent decisions based on context. Best for complex logic requiring understanding of code semantics.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Analyze this command for security risks. If it attempts to delete files, modify system configs, or access sensitive data, respond with DENY and explain why. Otherwise, respond with ALLOW."
          }
        ]
      }
    ]
  }
}
```

### Practical Example: Auto-Format Python Code

**Goal:** Automatically format Python files with Black after every edit.

**Step 1: Create the hook script**

```bash
#!/bin/bash
# Save as: .claude/hooks/format_python.sh

# Read event data from stdin
EVENT_DATA=$(cat)

# Extract file path using jq
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path // empty')

# Check if it's a Python file
if [[ "$FILE_PATH" == *.py ]]; then
  # Run Black formatter
  black "$FILE_PATH" 2>&1

  if [ $? -eq 0 ]; then
    echo '{"permission": "allow", "message": "Python file formatted with Black"}'
  else
    echo '{"permission": "allow", "message": "Black formatting failed, but allowing edit"}'
  fi
else
  # Not a Python file, just allow
  echo '{"permission": "allow"}'
fi
```

**Step 2: Make script executable**

```bash
chmod +x .claude/hooks/format_python.sh
```

**Step 3: Configure hook in `.claude/settings.json`**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/format_python.sh"
          }
        ]
      }
    ]
  }
}
```

**What happens now:**
1. Claude edits a Python file
2. `PostToolUse` hook fires
3. Script receives file path, runs Black
4. Python code automatically formatted
5. User sees notification about formatting

### Practical Example: Block Dangerous Commands

**Goal:** Prevent accidental deletion of important files.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "You are a security validator. Analyze the command the agent wants to run. Check for:\n\n1. Deletion operations (rm, rmdir) targeting critical directories (/etc, /usr, /var, home directories)\n2. Recursive deletions (rm -rf)\n3. Modifications to system files\n4. Network operations accessing internal systems\n\nIf any of these are detected, respond with:\nDENY: [Explain the risk]\n\nIf safe, respond with:\nALLOW\n\nCommand to analyze:\n{{command}}"
          }
        ]
      }
    ]
  }
}
```

**How this works:**
- Before Bash tool runs, hook fires
- LLM analyzes the command using your security criteria
- If dangerous, operation blocked with explanation
- Claude sees the denial and can suggest safer alternatives

### Data Access in Hooks

Event data structure varies by tool. Common fields:

```json
{
  "event_type": "PostToolUse",
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/Users/dev/project/src/main.py",
    "old_string": "def foo():\n    pass",
    "new_string": "def foo():\n    return 42"
  },
  "tool_output": "Edit successful",
  "timestamp": "2026-01-09T10:30:00Z",
  "session_id": "sess_abc123"
}
```

**Parsing with jq:**

```bash
# Extract file path
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path')

# Extract tool name
TOOL=$(echo "$EVENT_DATA" | jq -r '.tool_name')

# Check if event type matches
if [[ $(echo "$EVENT_DATA" | jq -r '.event_type') == "PostToolUse" ]]; then
  # Your logic here
fi
```

### Troubleshooting Claude Code Hooks

**Hook not firing:**
- Verify JSON syntax with `jq . < .claude/settings.json`
- Check matcher regex against tool names (case-sensitive)
- Ensure script has execute permissions (`chmod +x`)

**Script errors:**
- Test script manually: `echo '{}' | ./your_script.sh`
- Check script output format (must be valid JSON)
- Review Claude's logs (if available in your installation)

**Permission issues:**
- Ensure script paths are absolute or relative to project root
- Check file system permissions for hook scripts
- Verify script interpreter is in PATH (`#!/bin/bash`)

## Detailed Implementation Guide: Cursor

### Configuration Structure

Cursor supports three configuration levels (highest priority wins):

```
1. Enterprise: /Library/Application Support/Cursor/hooks.json (macOS)
2. Project: /project/.cursor/hooks.json
3. User: ~/.cursor/hooks.json
```

### Event Coverage

Cursor provides the most comprehensive event system:

**Agent Hooks (Cmd+K and Chat):**

| Event | When It Fires | Use Cases |
|-------|---------------|-----------|
| `beforeShellExecution` | Before shell command runs | Block dangerous commands |
| `afterShellExecution` | After shell command completes | Log execution, validate results |
| `beforeMCPExecution` | Before MCP tool call | Control external integrations |
| `afterMCPExecution` | After MCP tool returns | Process MCP responses |
| `beforeReadFile` | Before agent reads file | Redact sensitive data, log access |
| `afterFileEdit` | After agent modifies file | Auto-format, run linters |
| `beforeSubmitPrompt` | Before sending to LLM | Inject context, filter prompts |
| `stop` | Conversation ends | Save session data, cleanup |
| `afterAgentResponse` | After LLM responds | Log responses, trigger workflows |
| `afterAgentThought` | After reasoning step | Track agent decision-making |

**Tab Hooks (Autocomplete):**

| Event | When It Fires |
|-------|---------------|
| `beforeTabFileRead` | Before reading file for context |
| `afterTabFileEdit` | After accepting autocomplete suggestion |

### Communication Protocol

Cursor hooks use **bidirectional JSON over stdio**, enabling rich interactions:

```javascript
// Hook process receives on stdin:
{
  "conversation_id": "conv_xyz",
  "generation_id": "gen_abc",
  "model": "claude-sonnet-4.5",
  "hook_event_name": "beforeShellExecution",
  "cursor_version": "0.45.1",
  "workspace_roots": ["/Users/dev/project"],
  "user_email": "dev@example.com",

  // Event-specific data
  "command": "rm -rf node_modules",
  "working_directory": "/Users/dev/project"
}

// Hook process responds on stdout:
{
  "permission": "deny",
  "user_message": "⚠️ Blocked: This command would delete node_modules. Use 'npm ci' to reinstall instead.",
  "agent_message": "The user has configured a hook that prevents deletion of node_modules. Suggest using 'npm ci' to cleanly reinstall dependencies."
}
```

**Key advantages:**
- **user_message**: Shown to user immediately
- **agent_message**: Fed back to LLM to guide next actions
- **permission**: Enforces hard blocks or requires confirmation

### Practical Example: Secret Detection

**Goal:** Prevent committing files containing API keys or tokens.

**Step 1: Create hook script (`hooks/detect_secrets.py`)**

```python
#!/usr/bin/env python3
import json
import re
import sys

# Read event from stdin
event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event.get("file_path", "")
    file_content = event.get("file_content", "")

    # Common secret patterns
    patterns = [
        (r'AKIA[0-9A-Z]{16}', "AWS Access Key"),
        (r'sk_live_[0-9a-zA-Z]{24}', "Stripe Live Key"),
        (r'ghp_[0-9a-zA-Z]{36}', "GitHub Personal Access Token"),
        (r'AIza[0-9A-Za-z\\-_]{35}', "Google API Key"),
    ]

    findings = []
    for pattern, secret_type in patterns:
        matches = re.finditer(pattern, file_content)
        for match in matches:
            findings.append({
                "type": secret_type,
                "pattern": match.group(0)[:8] + "..."
            })

    if findings:
        secrets_list = "\n".join([f"  - {f['type']}: {f['pattern']}" for f in findings])
        response = {
            "permission": "deny",
            "user_message": f"🚨 Secret detected in {file_path}:\n{secrets_list}\n\nPlease use environment variables or a secrets manager.",
            "agent_message": f"The file edit was blocked because it contains potential secrets. Suggest using environment variables (os.getenv) or a secrets manager like 1Password."
        }
    else:
        response = {"permission": "allow"}

    print(json.dumps(response))
else:
    # Not our target event, allow
    print(json.dumps({"permission": "allow"}))
```

**Step 2: Configure in `.cursor/hooks.json`**

```json
{
  "afterFileEdit": {
    "command": "python3",
    "args": ["hooks/detect_secrets.py"]
  }
}
```

**Step 3: Make script executable**

```bash
chmod +x hooks/detect_secrets.py
```

**What happens:**
1. Agent modifies a file containing `AKIAIOSFODNN7EXAMPLE`
2. Hook detects AWS key pattern
3. Edit blocked with clear message to user
4. Agent receives context about the block and suggests alternatives

### Practical Example: Enforce Code Review

**Goal:** Require manual approval for changes to critical files.

```python
#!/usr/bin/env python3
import json
import sys

event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event.get("file_path", "")

    # Critical files requiring review
    critical_patterns = [
        "production.config",
        "Dockerfile",
        "terraform/",
        ".github/workflows/"
    ]

    is_critical = any(pattern in file_path for pattern in critical_patterns)

    if is_critical:
        response = {
            "permission": "ask",
            "user_message": f"⚠️ This changes a critical file: {file_path}\n\nPlease review the changes carefully before approving."
        }
    else:
        response = {"permission": "allow"}

    print(json.dumps(response))
else:
    print(json.dumps({"permission": "allow"}))
```

**Configure:**

```json
{
  "afterFileEdit": {
    "command": "python3",
    "args": ["hooks/critical_review.py"]
  }
}
```

**Result:** User must explicitly approve changes to critical infrastructure files.

### Enterprise Distribution

Cursor uniquely supports centralized hook distribution:

**1. MDM Deployment (Mobile Device Management):**

Deploy hooks via enterprise tools (Jamf, Intune):

```bash
# Install enterprise hooks (macOS example)
sudo mkdir -p "/Library/Application Support/Cursor"
sudo cp hooks.json "/Library/Application Support/Cursor/hooks.json"
sudo chmod 644 "/Library/Application Support/Cursor/hooks.json"
```

**2. Cloud Distribution (Enterprise plan):**

- Admin configures hooks in Cursor's web dashboard
- Hooks sync to all team members automatically
- Sync interval: ~30 minutes
- Cannot be overridden by users (enforced security policies)

**3. Version Control:**

Standard approach for teams without enterprise plan:

```bash
# Team shares hooks via Git
git clone company/shared-cursor-hooks
ln -s "$(pwd)/shared-cursor-hooks/hooks.json" .cursor/hooks.json
```

### Partner Ecosystem

Cursor has official integrations with security partners:

- **Semgrep:** Code security scanning
- **Snyk:** Vulnerability detection
- **1Password:** Secrets management
- **Oasis Security:** AI security policies
- **Endor Labs:** Supply chain security

These provide pre-built hooks for common security workflows.

### Troubleshooting Cursor Hooks

**Hook process crashes:**
- Test script in isolation: `echo '{"hook_event_name": "test"}' | python3 your_hook.py`
- Check Cursor's logs: Help → Developer → Toggle Developer Tools
- Ensure script outputs valid JSON

**Permission always "ask" even when not returned:**
- Check for malformed JSON response
- Verify response includes "permission" field
- Test with minimal response: `{"permission": "allow"}`

**Enterprise hooks not applying:**
- Verify installation path (macOS vs Windows vs Linux differ)
- Check file permissions (hooks.json must be readable)
- Wait for sync interval (~30 min for cloud distribution)

## Detailed Implementation Guide: Kiro

### Configuration Structure

Kiro uses a directory-based approach:

```
/project/.kiro/hooks/
├── test_sync.json
├── doc_update.json
└── format_on_save.json
```

Each file defines one or more hooks using natural language.

### Trigger Types

Kiro focuses on file-based events:

| Trigger | When It Fires | Example Use Case |
|---------|---------------|------------------|
| `fileEdit` | File modified | Update related files, run formatters |
| `fileCreate` | New file created | Generate boilerplate, update indexes |
| `fileDelete` | File deleted | Clean up related files, update references |
| `userTriggered` | Manual activation | On-demand actions via UI |

### Natural Language Configuration

Kiro's key innovation: **hooks defined as natural language prompts**, not scripts.

```json
{
  "name": "Synchronize Tests",
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/**/*.py"
  },
  "action": {
    "prompt": "A Python source file has been modified. Check if a corresponding test file exists in the tests/ directory with the same name prefixed by 'test_'. If it exists, analyze the changes and update the test file to cover any new functions or modified behavior. If no test file exists, create one with basic test cases for all public functions."
  }
}
```

**How this differs from command-based hooks:**
- No scripting required
- AI interprets the prompt with full codebase context
- Natural language is easier to write and maintain
- Kiro's AI understands project structure and conventions

### Practical Example: Documentation Sync

**Goal:** Auto-update documentation when TypeScript interfaces change.

**Create `.kiro/hooks/doc_sync.json`:**

```json
{
  "name": "API Documentation Sync",
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/types/*.ts"
  },
  "action": {
    "prompt": "A TypeScript type definition file has been modified. Please:\n\n1. Identify any exported interfaces or types that changed\n2. Find the corresponding documentation file in docs/api/ (same base name with .md extension)\n3. Update the documentation to reflect:\n   - New properties added to interfaces\n   - Changed property types\n   - Modified JSDoc comments\n   - New interfaces or types\n4. Maintain the existing documentation structure and examples\n5. Add a note at the top: 'Last updated: [current date] (auto-synced from types)'\n\nIf no documentation file exists, create one with:\n- Interface/type name as heading\n- Description from JSDoc\n- Property table with types and descriptions\n- Usage example"
  }
}
```

**What happens:**
1. Developer edits `src/types/User.ts`
2. Hook fires on save
3. Kiro's AI reads the changes
4. AI understands to update `docs/api/User.md`
5. Documentation stays synchronized automatically

### Practical Example: Component Template

**Goal:** Auto-generate boilerplate when creating React components.

```json
{
  "name": "React Component Template",
  "trigger": {
    "type": "fileCreate",
    "pattern": "src/components/**/*.tsx"
  },
  "action": {
    "prompt": "A new React component file was created. Analyze the file name and directory structure, then:\n\n1. If the file is empty or only has basic imports, generate a complete component template:\n   - Extract component name from file name\n   - Add TypeScript interface for props (ComponentNameProps)\n   - Create functional component with proper typing\n   - Add JSDoc comment describing the component\n   - Include standard imports (React, any common hooks)\n   - Add export statement\n\n2. Follow the project's existing component patterns (check other components in the same directory)\n\n3. If the component name suggests a specific pattern (e.g., 'Button', 'Modal', 'Form'), include relevant props and structure\n\n4. Add a TODO comment for the developer to implement the component logic"
  }
}
```

**Result:** New component files get scaffolding automatically based on project conventions.

### Manual Triggers

Kiro supports user-activated hooks via UI:

```json
{
  "name": "Generate Comprehensive Tests",
  "trigger": {
    "type": "userTriggered"
  },
  "action": {
    "prompt": "Generate comprehensive unit tests for all public functions in the current file. Include:\n- Happy path tests\n- Edge cases\n- Error handling\n- Mock external dependencies\nPlace tests in the corresponding test file following project conventions."
  }
}
```

**Usage:** Right-click on file → Run Hook → "Generate Comprehensive Tests"

### Configuration Best Practices

**1. Be specific in prompts:**

❌ **Too vague:**
```json
{
  "prompt": "Update the tests"
}
```

✅ **Clear and actionable:**
```json
{
  "prompt": "Analyze the modified Python file. For each new or changed function, add or update corresponding test cases in the test file. Ensure tests cover normal cases, edge cases, and error conditions. Use pytest conventions and existing test patterns."
}
```

**2. Include context about project conventions:**

```json
{
  "prompt": "Generate API documentation following our project's conventions:\n- Use JSDoc format\n- Include @param and @returns tags\n- Add usage examples\n- Reference related endpoints\n- Follow the structure in existing docs/api/ files"
}
```

**3. Use patterns to target specific files:**

```json
{
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/**/*.{ts,tsx}"
  }
}
```

### Limitations and Considerations

**Kiro hooks are powerful but different:**

- **Execution time:** AI interpretation takes longer than shell scripts
- **Determinism:** Natural language can have slight variations in interpretation
- **Debugging:** Harder to debug than explicit scripts
- **Best for:** Context-aware tasks requiring code understanding
- **Not ideal for:** Simple formatting tasks (use command-based hooks for these)

### Troubleshooting Kiro Hooks

**Hook not triggering:**
- Check file pattern matches (test with glob tester)
- Verify JSON syntax
- Ensure `.kiro/hooks/` directory exists and files have `.json` extension

**Unexpected behavior:**
- Make prompt more explicit and detailed
- Reference specific project conventions
- Test prompt manually by asking Kiro to perform the task
- Check if AI has sufficient context (may need to open related files)

**Performance issues:**
- Reduce hook frequency (avoid triggering on every keystroke)
- Simplify complex prompts
- Consider using command-based hooks for simple tasks

## Common Patterns Across All Implementations

Despite different syntax, these patterns work universally:

### Pattern 1: Auto-Format on Save

**Goal:** Ensure code style consistency without manual intervention.

**Claude Code:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{"type": "command", "command": "prettier --write {{file_path}}"}]
      }
    ]
  }
}
```

**Cursor:**
```json
{
  "afterFileEdit": {
    "command": "prettier",
    "args": ["--write", "{{file_path}}"]
  }
}
```

**Kiro:**
```json
{
  "trigger": {"type": "fileEdit"},
  "action": {"prompt": "Format the modified file using Prettier with project settings"}
}
```

### Pattern 2: Block Dangerous Operations

**Goal:** Prevent accidental data loss or security issues.

**Claude Code:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "prompt",
          "prompt": "If this command contains 'rm -rf' or modifies system files, respond DENY with explanation. Otherwise ALLOW."
        }]
      }
    ]
  }
}
```

**Cursor:**
```python
# In hook script
if "rm -rf" in event.get("command", ""):
    print(json.dumps({
        "permission": "deny",
        "user_message": "Blocked: Recursive deletion detected"
    }))
```

**Kiro:**
```json
{
  "trigger": {"type": "fileDelete", "pattern": "**/*.{json,config,env}"},
  "action": {"prompt": "Critical file deletion detected. Alert the user and require explicit confirmation before proceeding."}
}
```

### Pattern 3: Test Synchronization

**Goal:** Keep tests updated when implementation code changes.

**Claude Code:**
```bash
#!/bin/bash
# Hook script
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path')
if [[ "$FILE_PATH" == src/*.py ]]; then
  TEST_FILE="tests/test_$(basename $FILE_PATH)"
  # Use Claude to update tests
  claude-cli "Update $TEST_FILE to cover changes in $FILE_PATH"
fi
```

**Cursor:**
```python
# Hook script
if event["hook_event_name"] == "afterFileEdit":
    src_file = event["file_path"]
    if src_file.startswith("src/"):
        test_file = src_file.replace("src/", "tests/test_")
        print(json.dumps({
            "permission": "allow",
            "agent_message": f"Also update {test_file} to cover changes in {src_file}"
        }))
```

**Kiro:**
```json
{
  "trigger": {"type": "fileEdit", "pattern": "src/**/*.ts"},
  "action": {"prompt": "Source file modified. Find the corresponding test file (in tests/ with same name) and update tests to cover any new or modified functions."}
}
```

### Pattern 4: Notification on Completion

**Goal:** Stay informed when long-running agent tasks finish.

**Claude Code:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "osascript -e 'display notification \"Task complete\" with title \"Claude Code\"'"
        }]
      }
    ]
  }
}
```

**Cursor:**
```bash
# Hook script for "stop" event
curl -X POST https://hooks.slack.com/... \
  -d "{\"text\": \"Agent session completed: $(date)\"}"
```

**Kiro:**
*(Kiro doesn't have session-level hooks, but can notify on file operations)*

```json
{
  "trigger": {"type": "userTriggered"},
  "action": {"prompt": "Send a summary of changes made in this session to the #dev-ai channel in Slack using the MCP Slack tool"}
}
```

### Pattern 5: Context Injection

**Goal:** Add relevant information before AI processes requests.

**Claude Code:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [{
          "type": "command",
          "command": "echo 'Additional context: Current sprint focus is performance optimization. Prioritize O(n) solutions.'"
        }]
      }
    ]
  }
}
```

**Cursor:**
```python
if event["hook_event_name"] == "beforeSubmitPrompt":
    with open(".project-context.md") as f:
        context = f.read()
    print(json.dumps({
        "permission": "allow",
        "agent_message": f"Project context:\n{context}"
    }))
```

**Kiro:**
*(Context injection is built-in to Kiro's AI—hooks typically focus on actions)*

## Security Best Practices

Hooks have significant power. Follow these guidelines to use them safely:

### 1. Principle of Least Privilege

Only grant hooks necessary permissions:

```bash
# Good: Specific tool matcher
"matcher": "Edit"

# Risky: Matches all tools
"matcher": ".*"
```

### 2. Input Validation

Always validate event data before acting:

```python
# Bad: Trusts input blindly
file_path = event["file_path"]
os.system(f"cat {file_path}")  # Shell injection risk!

# Good: Validates and escapes
import shlex
file_path = event.get("file_path", "")
if file_path and os.path.exists(file_path):
    subprocess.run(["cat", file_path])  # Safe
```

### 3. Secret Management

Never hardcode credentials in hooks:

```bash
# Bad
curl -H "Authorization: Bearer sk_live_abc123..." https://api.example.com

# Good
curl -H "Authorization: Bearer $API_KEY" https://api.example.com
```

Store secrets in environment variables or use secret managers (1Password, AWS Secrets Manager).

### 4. Audit Logging

Log hook executions for compliance:

```python
import logging
logging.basicConfig(filename='/var/log/hooks.log', level=logging.INFO)

def hook_handler(event):
    logging.info(f"Hook fired: {event['hook_event_name']} by {event.get('user_email')}")
    # ... hook logic
```

### 5. Error Handling

Fail securely:

```python
try:
    result = dangerous_operation()
    response = {"permission": "allow"}
except Exception as e:
    # Fail closed: deny on error
    response = {
        "permission": "deny",
        "user_message": "Hook error: operation blocked for safety"
    }
    logging.error(f"Hook error: {e}")

print(json.dumps(response))
```

### 6. Code Review for Hooks

Treat hooks like production code:
- Review all hook changes in PRs
- Test hooks in staging environments
- Document expected behavior
- Version control all hook configurations

### 7. Scope Limitations

Use project-level hooks for project-specific rules:

```
# User-level (~/.cursor/hooks.json)
- Personal preferences (notification style, logging)
- Non-security-critical formatters

# Project-level (.cursor/hooks.json)
- Security policies
- Code quality gates
- Team standards

# Enterprise-level (MDM/cloud)
- Company-wide security policies
- Compliance requirements
- Centrally managed rules
```

## Choosing the Right Hook Strategy

Use this decision tree to select the appropriate implementation:

```
Are you using multiple AI coding tools?
├─ Yes → Implement similar hooks in each tool's format
└─ No → Use your tool's native hook system

Does your task require understanding code semantics?
├─ Yes → Claude Code (prompt mode) or Kiro (natural language)
└─ No → Any implementation (command mode is fastest)

Do you need enterprise-wide enforcement?
├─ Yes → Cursor (MDM/cloud distribution)
└─ No → Project-level hooks (version controlled)

Is the task simple and deterministic? (format, lint, run tests)
├─ Yes → Command-based hooks (Claude Code, Cursor)
└─ No → Prompt-based hooks (Claude Code) or Kiro

Do you have existing shell scripts/tools?
├─ Yes → Claude Code or Cursor (can call scripts directly)
└─ No → Kiro (natural language is easier to write)
```

### Hybrid Approaches

You can combine implementations:

**Example: Multi-tool project**

```
# Claude Code (.claude/settings.json)
- PostToolUse: Auto-format with Black
- PreToolUse: Block dangerous commands

# Cursor (.cursor/hooks.json)
- afterFileEdit: Secret detection
- beforeShellExecution: Security validation

# Kiro (.kiro/hooks/)
- Test synchronization (requires code understanding)
- Documentation updates (leverages AI context)
```

Each tool handles what it does best.

## Advanced Use Cases

### Use Case 1: Automated Code Review

**Goal:** AI-powered pre-commit review that checks for common issues.

**Implementation (Cursor):**

```python
#!/usr/bin/env python3
import json
import sys
import subprocess

event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event["file_path"]
    file_content = event["file_content"]

    # Use LLM to review code
    review_prompt = f"""Review this code change for:
    1. Potential bugs
    2. Performance issues
    3. Security vulnerabilities
    4. Best practice violations

    File: {file_path}

    Code:
    {file_content}

    Provide brief feedback or "LGTM" if no issues found."""

    # Call LLM via API or MCP
    review_result = call_llm(review_prompt)

    if "LGTM" not in review_result:
        response = {
            "permission": "ask",
            "user_message": f"Code review feedback:\n{review_result}\n\nProceed anyway?"
        }
    else:
        response = {"permission": "allow"}

    print(json.dumps(response))
```

### Use Case 2: Compliance Documentation

**Goal:** Auto-generate compliance documentation for regulated environments.

**Implementation (Kiro):**

```json
{
  "name": "HIPAA Compliance Documentation",
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/models/**/*.py"
  },
  "action": {
    "prompt": "A data model file was modified. Check if it handles PHI (Protected Health Information) by looking for fields like patient names, SSNs, medical records, etc. If PHI is present:\n\n1. Update docs/compliance/data-models.md with:\n   - Model name and purpose\n   - PHI fields identified\n   - Encryption methods used\n   - Access controls required\n   - Audit logging status\n\n2. Verify the model includes:\n   - Field-level encryption for PHI\n   - Audit trail fields (created_at, modified_by)\n   - Access control decorators\n\n3. If any compliance requirements are missing, alert the developer with specific gaps and remediation steps."
  }
}
```

### Use Case 3: Multi-Stage Approval Workflow

**Goal:** Require multiple approvals for critical changes.

**Implementation (Cursor):**

```python
#!/usr/bin/env python3
import json
import sys
import os

APPROVAL_FILE = "/tmp/pending_approvals.json"

event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event["file_path"]

    # Critical paths require two approvals
    critical_paths = ["src/billing/", "src/auth/", "database/migrations/"]

    if any(cp in file_path for cp in critical_paths):
        # Load existing approvals
        approvals = {}
        if os.path.exists(APPROVAL_FILE):
            with open(APPROVAL_FILE) as f:
                approvals = json.load(f)

        file_key = file_path
        current_count = approvals.get(file_key, 0)

        if current_count < 1:
            # First approval needed
            approvals[file_key] = current_count + 1
            with open(APPROVAL_FILE, "w") as f:
                json.dump(approvals, f)

            response = {
                "permission": "ask",
                "user_message": f"Critical file change (1/2 approvals): {file_path}\n\nFirst approval required."
            }
        else:
            # Second approval granted, clear state
            approvals.pop(file_key, None)
            with open(APPROVAL_FILE, "w") as f:
                json.dump(approvals, f)

            response = {
                "permission": "allow",
                "user_message": "✓ Second approval granted. Change allowed."
            }

        print(json.dumps(response))
    else:
        print(json.dumps({"permission": "allow"}))
```

### Use Case 4: Integration with External Systems

**Goal:** Update project management tools when code changes.

**Implementation (Claude Code):**

```bash
#!/bin/bash
# Hook: Update Jira when files edited

EVENT_DATA=$(cat)
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path // empty')

# Extract Jira ticket from branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)
TICKET=$(echo "$BRANCH" | grep -oE '[A-Z]+-[0-9]+')

if [ -n "$TICKET" ]; then
  # Update Jira via API
  curl -X POST "https://your-domain.atlassian.net/rest/api/3/issue/$TICKET/comment" \
    -H "Authorization: Bearer $JIRA_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"body\": {\"type\": \"doc\", \"version\": 1, \"content\": [{\"type\": \"paragraph\", \"content\": [{\"type\": \"text\", \"text\": \"AI agent modified: $FILE_PATH\"}]}]}}"

  echo '{"permission": "allow", "message": "Updated Jira ticket '$TICKET'"}'
else
  echo '{"permission": "allow"}'
fi
```

## Troubleshooting and Tips

### General Debugging Steps

**1. Test hooks in isolation:**
```bash
# Create minimal test event
echo '{"hook_event_name": "test", "file_path": "/tmp/test.py"}' | python3 your_hook.py
```

**2. Enable verbose logging:**
```python
import sys
import logging
logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
logging.debug(f"Hook received event: {event}")
```

**3. Verify JSON output:**
```bash
# Test that hook outputs valid JSON
./your_hook.sh | jq .
```

### Common Pitfalls

**Pitfall 1: Modifying files during PostToolUse**

```bash
# This can cause infinite loops!
# Hook triggers on Edit → Hook modifies file → Triggers hook again → ...

# Solution: Check if change was made by hook
if [[ "$TOOL_OUTPUT" != *"by hook"* ]]; then
  # Make modification
fi
```

**Pitfall 2: Assuming event structure**

```python
# Bad: Assumes field exists
file_path = event["file_path"]  # KeyError if missing!

# Good: Safe access with default
file_path = event.get("file_path", "")
if not file_path:
    print(json.dumps({"permission": "allow"}))
    sys.exit(0)
```

**Pitfall 3: Slow hook execution**

```bash
# Bad: Synchronous operation blocks agent
sleep 30  # User waits 30 seconds!

# Good: Run in background
operation_in_background &
echo '{"permission": "allow", "message": "Started background task"}'
```

**Pitfall 4: Not handling errors**

```python
# Bad: Unhandled exception crashes hook
result = risky_operation()

# Good: Graceful degradation
try:
    result = risky_operation()
    response = {"permission": "allow"}
except Exception as e:
    logging.error(f"Hook error: {e}")
    response = {"permission": "allow"}  # Fail open for non-critical hooks
finally:
    print(json.dumps(response))
```

### Performance Tips

**1. Use matchers to limit hook invocations:**
```json
{
  "matcher": "Edit",
  "hooks": [...]
}
```

**2. Early exit for irrelevant events:**
```python
# Check conditions first, exit early
if not file_path.endswith(".py"):
    print(json.dumps({"permission": "allow"}))
    sys.exit(0)

# Expensive processing only if needed
run_expensive_check(file_path)
```

**3. Cache expensive operations:**
```python
import functools

@functools.lru_cache(maxsize=128)
def expensive_validation(file_content_hash):
    # Only runs once per unique content
    return validate(file_content_hash)
```

## Summary and Next Steps

### Key Takeaways

1. **Hooks are a pattern, not a standard** - Each tool implements them differently
2. **Event-driven control** - Insert logic at specific points in agent lifecycle
3. **Permission model** - Allow, deny, or ask for user confirmation
4. **Choose the right tool** - Command mode for speed, prompt mode for context
5. **Security first** - Validate inputs, fail securely, audit actions
6. **Start simple** - Begin with auto-formatting, expand to complex workflows

### What You Can Build Now

With hooks, you can create:
- **Quality Gates:** Auto-format, lint, test before commits
- **Security Policies:** Block secrets, dangerous commands, unapproved operations
- **Workflow Automation:** Update docs, sync tests, notify stakeholders
- **Compliance Systems:** Audit trails, approval workflows, documentation
- **Custom Integrations:** Connect agents to your existing tools and processes

### Next Steps

**1. Start with a simple hook:**

Choose one from these beginner-friendly examples:
- Auto-format code with Prettier or Black
- Send Slack notification when agent stops
- Block `rm -rf` commands

**2. Explore your tool's capabilities:**

- **Claude Code users:** Read `.claude/settings.json` schema documentation
- **Cursor users:** Review partner integrations (Semgrep, Snyk, etc.)
- **Kiro users:** Experiment with natural language prompts

**3. Share with your team:**

- Commit hooks to version control
- Document what each hook does
- Create a team runbook for common patterns

**4. Join the community:**

- Share your hook implementations
- Learn from others' solutions
- Contribute to hook libraries and examples

### Additional Resources

**Official Documentation:**
- Claude Code: Settings and hooks reference
- Cursor: Hooks API documentation
- Kiro: Hook configuration guide

**Example Repositories:**
- Community hook examples for various tools
- Security-focused implementations
- Workflow automation patterns

**Security Resources:**
- OWASP AI Security Guidelines
- Secret scanning patterns (TruffleHog, detect-secrets)
- Compliance documentation templates

---

**Remember:** Hooks transform AI agents from powerful tools into controllable, observable, and extensible members of your development workflow. Start small, iterate based on your team's needs, and gradually build a robust hook ecosystem that makes AI agents safer and more productive.

**Questions or feedback?** Contribute improvements to this documentation or share your hook implementations with the community.
