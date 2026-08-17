# Claude Code Plugin Development and Publishing: The Complete Guide

> **Goal**: Provide a full workflow guide for developers, publishers, and end users based on internal npm and Git.

This handbook integrates the core concepts, development specifications, enterprise distribution strategies, and troubleshooting guidelines for the Claude Code plugin system, aiming to build a standardized internal Claude Code plugin ecosystem.

---

## Core Concepts

### Overview

Plugins are independent units that extend Claude Code capabilities. They can integrate `skills`, `agents`, `hooks` and other functions to enable cross-user reuse. The core concepts are as follows:

* **plugin** - A folder with a specific directory structure that can contain `skills`, `agents` and other sub-folders to carry reusable functionality
* **marketplace** - If a plugin is an App, the marketplace is the App Store. The plugin marketplace can be the Claude Code plugin marketplace, or it can be an internal repository or an accessible JSON file within an enterprise that records all available plugin information. Claude Code supports configuring plugin sources via `git`, `npm`, and other methods
* **Plugin levels** - Plugins support installation at both project and user levels. User-level plugins can be reused across projects, typically in `~/.claude/plugins/cache/`

### [Plugin](https://code.claude.com/docs/en/plugins-reference)

Plugin folders can contain the following:

| Component | Default Location | Purpose |
| :--- | :--- | :--- |
| Manifest | `.claude-plugin/plugin.json` | Plugin metadata and configuration (optional) |
| Commands | `commands/` | Skill Markdown files (legacy; new Skills should use skills/) |
| Agents | `agents/` | Sub-agent Markdown files |
| Skills | `skills/` | Skills using the `<name>/SKILL.md` structure |
| Hooks | `hooks/hooks.json` | Hook configuration |
| MCP Servers | `.mcp.json` | MCP server definitions |
| LSP Servers | `.lsp.json` | Language server configuration |
| Settings | `settings.json` | Default configuration applied when plugin is enabled. Currently supports agent settings only |

### [Marketplace](https://code.claude.com/docs/en/plugin-marketplaces)

A Marketplace is a JSON catalog file (`marketplace.json`) that serves as the bridge between users and plugins.

* **For enterprises** - This is the central hub for managing internal tool collections, supporting multiple sources including Git/npm
* **For users** - This is the "app store" that supports one-click installation and automatic updates

The marketplace configuration structure is as follows:

```json
{
  "name": "company-marketplace", // Plugin marketplace identifier, you can define multiple marketplaces
  "owner": {
    "name": "administrator", // Maintainer name
    "email": "xx@company.com" // Maintainer email
  },
  "plugins": [ // Plugins supported by the marketplace
    {
      "name": "code-formatter",
      "source": "./plugins/formatter", // Local directory plugin source
      "description": "Automatic code formatting on save",
      "version": "2.1.0",
      "author": {
        "name": "DevTools Team"
      }
    },
    {
      "name": "deployment-tools",
      "source": { // GitHub plugin source
        "source": "github",
        "repo": "company/deploy-plugin"
      },
      "description": "Deployment automation tools"
    },
    {
      "name": "git-plugin",
      "source": { // GitLab plugin source
        "source": "url",
        "url": "https://gitlab.com/team/plugin.git"
      }
    },
    { // Private npm registry plugin source
      "name": "my-npm-plugin",
      "source": {
        "source": "npm",
        "package": "@acme/claude-plugin",
        "version": "^2.0.0",
        "registry": "https://npm.example.com"
      }
    }

  ]
}
```

### [`/plugin`](https://code.claude.com/docs/en/plugins)

After users start `claude`, they can use `/plugin` to add new `marketplace` and install `plugin`

```bash
# 1. Start claude
claude

# 2. Enter in claude
/plugin

# The terminal will display the following interface
Plugins  Discover   Installed   Marketplaces   Errors  (←/→ or tab to cycle)
                                                                                                                                
  Discover plugins (1/56)                                                                                                        
  ╭───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
  │ ⌕ Search…                                                                                                                 │  
  ╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

  ❯ ◯ frontend-design · claude-plugins-official · 277.5K installs
      Create distinctive, production-grade frontend interfaces ...

    ◯ context7 · claude-plugins-official [Community Managed] · 150.7K installs
      Upstash Context7 MCP server for up-to-date documentation ...

    ◯ superpowers · claude-plugins-official · 143.1K installs
  // ... other plugins

# Users can switch to marketplaces via tab to mount open-source or internal plugin marketplaces
# Then search to install plugins

```

## Developer Guide: Building Plugins

### Directory Structure and plugin.json

The standard plugin directory structure is as follows:

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # [Required] Plugin metadata
├── commands/             # [Optional] Slash commands
│   └── deploy.md
├── skills/               # [Optional] Smart skills
│   └── code-review/
│       └── SKILL.md
├── agents/               # [Optional] Sub-agents
│   └── security-bot.md
├── hooks/                # [Optional] Hook configuration
│   └── hooks.json
├── .mcp.json             # [Optional] MCP service configuration
├── .lsp.json             # [Optional] LSP service configuration
├── settings.json         # [Optional] Settings configuration
├── scripts/              # [Optional] Scripts
│   ├── build.sh
│   └── security-bot.js
├── package.json          # [Optional] Required if publishing via npm
└── README.md             # [Optional] Usage instructions
└── LICENSE               # [Optional] License
```

**Complete plugin.json Schema**:

```jsonc
{
  // ── Required fields ──────────────────────────────────────────
  "name": "company-tools",       // Namespace, determines command prefix /company-tools:cmd
  
  // ── Metadata (recommended) ────────────────────────────────────
  "version": "1.0.0",       // Semantic versioning SemVer
  "description": "Enterprise internal R&D toolkit",
  "author": { "name": "AI Team" },
  "homepage": "https://internal.example.com/plugins/company-tools",
  "license": "MIT",

  // ── Component paths (optional, defaults to auto-scanning standard directories) ─────────
  "commands": ["./commands/deploy.md"],  // Additional loading
  "agents": "./custom-agents/",
  "hooks": "./hooks/hooks.json",
  "mcpServers": "./.mcp.json",
  
  // ── Default settings ─────────────────────────────────────────
  "settings": {
    "defaultModel": "claude-sonnet-4-6"
  }
}
```

### 1.2 The Big 5 Core Components

#### A. Commands (Slash Commands)

Markdown files where the filename becomes the command name.

* **Location**: `commands/hello.md` -> `/namespace:hello`
* **Frontmatter**:

    ```markdown
    ---
    description: Greet the user
    allowed-tools: Bash, Read  # Permission control
    ---
    # Hello World
    Print a greeting: Hello $ARGUMENTS
    ```

    *Note: The `$ARGUMENTS` placeholder is used to receive user input.*

#### B. Skills (Smart Skills)

The AI's toolbox, the most core capability extension method.

* **Location**: `skills/git-commit/SKILL.md`
* **Key point**: `description` must be precise; Claude relies on it to decide whether to invoke this skill.

    ```markdown
    ---
    name: git-commit
    description: Use when the user wants to commit code or generate a commit message.
    tools: Bash, Git
    ---
    # Git Commit Workflow
    1. Run git status...
    ```

#### C. Agents (Sub-agents)

AI assistants with independent personas and permissions.

* **Location**: `agents/qa-bot.md`
* **Frontmatter fields**:

    | Field | Description |
    | :--- | :--- |
    | `name` | Unique identifier |
    | `description` | Description of when to trigger |
    | `tools` | List of allowed tools |
    | `model` | Specify model (e.g. `claude-opus-4-6`) |
    | `permissionMode` | `ask` (prompt) / `auto` (automatic) |

#### D. Hooks (Lifecycle Hooks)

Automated script triggers.

* **Location**: `hooks/hooks.json`
* **Supported events**: `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, etc.

    ```json
    {
      "hooks": {
        "PostToolUse": [
          {
            "matcher": "Write", // After writing files
            "hooks": [{ 
              "type": "command", 
              "command": "${CLAUDE_PLUGIN_ROOT}/scripts/lint.sh" 
            }]
          }
        ]
      }
    }
    ```

    *Note: Scripts need execute permissions `chmod +x`.*

#### E. MCP Servers (Connectors)

Connect to the external world (databases, APIs).

* **Location**: `.mcp.json`
* **Configuration example**:

    ```json
    {
      "mcpServers": {
        // stdio mode (recommended)
        "jira": {
          "command": "node",
          "args": ["${CLAUDE_PLUGIN_ROOT}/servers/jira.js"],
          "env": {
            "API_TOKEN": "${JIRA_TOKEN}" // Reference user environment variable
          }
        },
        // npx mode
        "company-api": {
          "command": "npx",
          "args": ["@company/mcp-server"]
        }
      }
    }
    ```

### 1.3 Local Debugging and Verification

Before publishing, be sure to perform thorough testing locally.

1. **Validate structure**:

    ```bash
    claude plugin validate .
    ```

2. **Local loading and run (recommended)**:

    ```bash
    # No installation needed, directly load current directory, code changes take effect after restart
    claude --plugin-dir .
    ```

3. **Marketplace simulation installation (local emulation)**:
    If you want to test the `/plugin install` workflow, you can simulate the current directory as a local Marketplace.

    * **Prerequisite**: Create `marketplace.json` in the root directory pointing to itself.
    * **Operations**:

        ```bash
        # 1. Add current directory as Marketplace source
        /plugin marketplace add .
        
        # 2. Install plugin from local Marketplace
        /plugin install company-tools
        ```

4. **Debugging commands**:
    * `/plugin list`: View loaded plugins.
    * `/mcp`: Check MCP service status.
    * `/agents`: View registered agents.

---

## 2 · Publishing Guide: Private npm and Marketplaces

### 2.1 Publishing to a Private npm Registry

1. **Configure package.json**:

    ```json
    {
      "name": "@company/ai-kit",
      "version": "1.0.0",
      "publishConfig": {
        "registry": "http://npm.example.com/"
      },
      "files": [ // ⚠️ Must include all plugin files
        ".claude-plugin", "commands", "skills", "agents", "hooks", ".mcp.json", "README.md", "scripts", "servers"
      ]
    }
    ```

2. **Authentication and publishing**:

    ```bash
    # Login to private registry
    npm login --registry=http://npm.example.com/
    # Publish
    npm publish
    ```

### 2.2 Configuring an Enterprise Marketplace

Create a Git repository (such as `company-marketplace`) and create `.claude-plugin/marketplace.json` within it. Supports multiple Source types:

```jsonc
{
  "name": "company-internal",
  "owner": { "name": "Company AI Team" },
  "plugins": [
    {
      // ── Method A: npm package (recommended) ────────────────────────
      "name": "ai-kit",
      "description": "Enterprise R&D efficiency toolkit",
      "source": {
        "source": "npm",
        "package": "@company/ai-kit",
        "registry": "http://npm.example.com/"
      }
    },
    {
      // ── Method B: Git repository (stable) ───────────────────────────
      "name": "security-scanners",
      "source": {
        "source": "git",
        "url": "https://git.example.com/security-scanners.git"
      }
    }
  ]
}
```

*Push this file to a Git repository.*

### 2.3 Versioning and Release Checklist

1. **Update version numbers**:
    * `version` in `.claude-plugin/plugin.json`
    * `version` in `package.json`
    * (Recommended to use `npm version patch` to sync)
2. **Validate**: Run `claude plugin validate .`
3. **Package check**: Run `npm pack --dry-run` to ensure files are complete.
4. **Publish**: `npm publish`.
5. **Update Marketplace**: For new plugins, update `marketplace.json`.

---

## 3 · User Guide: Installing and Using

### 3.1 Installing Plugins (Two Modes)

#### Mode A: Enterprise Standard Installation (Recommended)

Install via Marketplace, supports automatic updates.

1. **Add Marketplace**:

    ```bash
    # Only needs to be executed once
    /plugin marketplace add https://git.example.com/company/marketplace.git
    ```

2. **Install plugin**:

    ```bash
    /plugin install ai-kit
    ```

#### Mode B: Developer/Debug Installation

Direct global installation and loading from npm.

1. **Global package installation**:

    ```bash
    npm install -g @company/ai-kit --registry=http://npm.example.com/
    ```

2. **Start and load**:

    ```bash
    claude --plugin-dir $(npm root -g)/@company/ai-kit
    ```

### 3.2 Common Commands and Management

* **Management**:
  * `/plugin`: Open interactive panel.
  * `/plugin update`: Update all plugins.
  * `/plugin remove <name>`: Uninstall a plugin.
* **Usage**:
  * `/help`: View all available commands.
  * `/namespace:command`: Execute a specific command.

### 3.3 Advanced Configuration (Scope & Auto-Update)

* **Installation Scope**:
  * `--scope user` (default): User-level, effective for all projects.
  * `--scope project`: Effective for current project only (writes to `.claude/settings.json`).
* **Auto-update**:
  * Official Marketplace enabled by default.
  * Private Marketplace disabled by default, needs to be manually enabled or configure environment variable `FORCE_AUTOUPDATE_PLUGINS=true`.

---

## 4 · Enterprise Deployment and Best Practices

### 4.1 Auto-Pushing to a Marketplace

Configure in the project's `.claude/settings.json`. Team members will be prompted to add the Marketplace after cloning the project.

```json
{
  "extraKnownMarketplaces": {
    "company-internal": {
      "source": {
        "source": "git",
        "url": "https://git.example.com/company/marketplace.git"
      }
    }
  }
}
```

### 4.2 Security Policies (Allowlist/Denylist)

Administrators can control which MCP Servers are allowed.

```json
{
  "mcpServers": {
    "allowedMcpServers": ["jira", "confluence"], // Allowlist
    "deniedMcpServers": ["*"]
  }
}
```

### 4.3 Troubleshooting

| Symptom | Possible Cause | Solution |
| :--- | :--- | :--- |
| **Plugin not loaded** | `plugin.json` syntax error | Run `claude plugin validate .` |
| **Command not found** | Incorrect directory structure | Ensure `commands/` is in plugin root, not inside `.claude-plugin/` |
| **Hooks not triggering** | Script lacks execute permissions | `chmod +x scripts/*.sh` |
| **MCP connection failed** | Path reference error | Use `${CLAUDE_PLUGIN_ROOT}` to reference internal files |
| **npm install 404** | Registry not configured | Check `.npmrc` or if install command includes `--registry` |

## Further Reading

* [Basic](https://code.claude.com/docs/en/plugins)
* [Install](https://code.claude.com/docs/en/discover-plugins)
* [Marketplace](https://code.claude.com/docs/en/plugin-marketplaces#create-the-marketplace-file)
* [Reference](https://code.claude.com/docs/en/plugins-reference)
