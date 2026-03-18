# Claude Code Plugin 开发与发布完整手册

> **目标**：为开发者、发布者和终端用户提供基于内网 npm 和 Git 的全流程指南。

本手册整合了 Claude Code 插件体系的核心概念、开发规范、企业级分发策略及故障排查指南，旨在打造一个标准化的内部 Claude Code 插件生态。

---

## 核心概念

### 综述

插件是扩展 Claude Code 能力的独立单元, 可以集成 `skills、agents、hooks` 等功能，实现跨用户复用，核心概念如下

* **plugin** 符合特定目录结构的文件夹, 可以包含 `skills、agents` 等子文件夹承载可复用的功能
* **marketplace**：如果插件是 App, marketplace 就是 App Store, 插件市场可以是 claude code 插件市场，也可以是企业内部一个记录所有插件的仓库或者一个可访问的 json 文件，记录了所有可用的插件信息，claude code 支持通过 `git、npm` 等方式配置插件来源
* **插件层级** 插件支持项目和用户层级的安装，用户层级可以跨项目服用，一般在 `~/.claude/plugins/cache/`

### [Plugin](https://code.claude.com/docs/en/plugins-reference)

插件文件夹可以包含如下内容

| 组件 | 默认位置 | 用途 |
| :--- | :--- | :--- |
| 清单文件 (Manifest) | `.claude-plugin/plugin.json` | 插件元数据和配置（可选） |
| 命令 (Commands) | `commands/` | Skill Markdown 文件（旧版；新 Skill 请使用 skills/） |
| 智能体 (Agents) | `agents/` | 子智能体 Markdown 文件 |
| 技能 (Skills) | `skills/` | 采用 `<name>/SKILL.md` 结构的技能 |
| 钩子 (Hooks) | `hooks/hooks.json` | 钩子配置 |
| MCP 服务端 | `.mcp.json` | MCP 服务端定义 |
| LSP 服务端 | `.lsp.json` | 语言服务器配置 |
| 设置 (Settings) | `settings.json` | 启用插件时应用的默认配置。目前仅支持智能体设置 |

### [Marketplace](https://code.claude.com/docs/en/plugin-marketplaces)

Marketplace 是一个 JSON 目录文件（`marketplace.json`），它是连接用户与插件的桥梁。

* **对于企业**：这是管理内部工具集的中心枢纽，支持 Git/npm 多种源。
* **对于用户**：这是“应用商店”，支持一键安装、自动更新。

marketplace 配置结构如下

```json

{
  "name": "company-marketplace", // 插件市场标识，你可以定义多个插件市场
  "owner": {
    "name": "administrator", // 维护者名称
    "email": "xx@company.com" // 维护者邮箱
  },
  "plugins": [ // 市场支持的插件
    {
      "name": "code-formatter",
      "source": "./plugins/formatter", // 插件来源本地目录
      "description": "Automatic code formatting on save",
      "version": "2.1.0",
      "author": {
        "name": "DevTools Team"
      }
    },
    {
      "name": "deployment-tools",
      "source": { // 插件来源 github
        "source": "github",
        "repo": "company/deploy-plugin"
      },
      "description": "Deployment automation tools"
    },
    {
      "name": "git-plugin",
      "source": { // 插件来源 gitlab
        "source": "url",
        "url": "https://gitlab.com/team/plugin.git"
      }
    },
    { // 插件来源私有 npm 源
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

用户启动 `claude` 后,  可以利用 `/plugin` 添加新的 `marketplace` 安装 `plugin`

```bash
# 1. 启动 claude
claude

# 2. claude 输入 
/plugin

# 终端会显示如下界面
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
  // ... 其他插件

# 用户可以通过 tab 切换到 marketplaces 挂载开源或者内部的插件市场
# 然后可以通过搜索来安装插件

```

## 开发者指南：构建插件

### 目录结构与 plugin.json

标准的插件目录结构如下：

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # [必选] 插件元数据
├── commands/             # [可选] 斜杠命令
│   └── deploy.md
├── skills/               # [可选] 智能技能
│   └── code-review/
│       └── SKILL.md
├── agents/               # [可选] 子代理
│   └── security-bot.md
├── hooks/                # [可选] 钩子配置
│   └── hooks.json
├── .mcp.json             # [可选] MCP 服务配置
├── .lsp.json             # [可选] LSP 服务配置
├── settings.json         # [可选] 设置配置
├── scripts/              # [可选] 脚本
│   ├── build.sh
│   └── security-bot.js
├── package.json          # [可选] 如果用 npm 发布插件，则需要
└── README.md             # [可选] 使用说明
└── LICENSE        # [可选] 使用说明
```

**plugin.json 完整 Schema**：

```jsonc
{
  // ── 必填字段 ──────────────────────────────────────────
  "name": "company-tools",       // 命名空间，决定命令前缀 /company-tools:cmd
  
  // ── 元数据（推荐） ────────────────────────────────────
  "version": "1.0.0",       // 语义化版本 SemVer
  "description": "企业内部研发工具集",
  "author": { "name": "AI Team" },
  "homepage": "https://internal.example.com/plugins/company-tools",
  "license": "MIT",

  // ── 组件路径（可选，默认会自动扫描标准目录） ─────────
  "commands": ["./commands/deploy.md"],  // 补充加载
  "agents": "./custom-agents/",
  "hooks": "./hooks/hooks.json",
  "mcpServers": "./.mcp.json",
  
  // ── 默认设置 ─────────────────────────────────────────
  "settings": {
    "defaultModel": "claude-sonnet-4-6"
  }
}
```

### 1.2 五大核心组件详解 (The Big 5)

#### A. Commands (斜杠命令)

Markdown 文件，文件名即命令名。

* **位置**: `commands/hello.md` -> `/namespace:hello`
* **Frontmatter**:

    ```markdown
    ---
    description: 向用户打招呼
    allowed-tools: Bash, Read  # 权限控制
    ---
    # Hello World
    打印一句问候语：Hello $ARGUMENTS
    ```

    *注：`$ARGUMENTS` 占位符用于接收用户输入。*

#### B. Skills (智能技能)

AI 的工具箱，最核心的能力扩展方式。

* **位置**: `skills/git-commit/SKILL.md`
* **关键点**: `description` 必须精准，Claude 靠它决定是否调用此技能。

    ```markdown
    ---
    name: git-commit
    description: 当用户想要提交代码或生成 commit message 时使用。
    tools: Bash, Git
    ---
    # Git Commit 流程
    1. 运行 git status...
    ```

#### C. Agents (子代理)

拥有独立人格和权限的 AI 助手。

* **位置**: `agents/qa-bot.md`
* **Frontmatter 字段**:

    | 字段 | 说明 |
    | :--- | :--- |
    | `name` | 唯一标识符 |
    | `description` | 触发时机描述 |
    | `tools` | 允许使用的工具列表 |
    | `model` | 指定模型 (e.g. `claude-opus-4-6`) |
    | `permissionMode` | `ask` (询问) / `auto` (自动) |

#### D. Hooks (生命周期钩子)

自动化脚本触发器。

* **位置**: `hooks/hooks.json`
* **支持事件**: `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit` 等。

    ```json
    {
      "hooks": {
        "PostToolUse": [
          {
            "matcher": "Write", // 当写入文件后
            "hooks": [{ 
              "type": "command", 
              "command": "${CLAUDE_PLUGIN_ROOT}/scripts/lint.sh" 
            }]
          }
        ]
      }
    }
    ```

    *注意：脚本需有执行权限 `chmod +x`。*

#### E. MCP Servers (连接器)

连接外部世界（数据库、API）。

* **位置**: `.mcp.json`
* **配置示例**:

    ```json
    {
      "mcpServers": {
        // stdio 方式 (推荐)
        "jira": {
          "command": "node",
          "args": ["${CLAUDE_PLUGIN_ROOT}/servers/jira.js"],
          "env": {
            "API_TOKEN": "${JIRA_TOKEN}" // 引用用户环境变量
          }
        },
        // npx 方式
        "company-api": {
          "command": "npx",
          "args": ["@company/mcp-server"]
        }
      }
    }
    ```

### 1.3 本地调试与验证

在发布前，务必在本地进行充分测试。

1. **验证结构**:

    ```bash
    claude plugin validate .
    ```

2. **本地加载运行 (推荐)**:

    ```bash
    # 无需安装，直接加载当前目录，修改代码重启生效
    claude --plugin-dir .
    ```

3. **Marketplace 模拟安装 (本地仿真)**:
    如果你想测试 `/plugin install` 流程，可以将当前目录模拟为本地 Marketplace。

    * **前提**: 在根目录创建 `marketplace.json` 指向自身。
    * **操作**:

        ```bash
        # 1. 添加当前目录为 Marketplace 源
        /plugin marketplace add .
        
        # 2. 从本地 Marketplace 安装插件
        /plugin install company-tools
        ```

4. **调试命令**:
    * `/plugin list`: 查看已加载插件。
    * `/mcp`: 查看 MCP 服务状态。
    * `/agents`: 查看已注册的 Agent。

---

## 2 · 发布指南：私有 npm 与 Marketplace

### 2.1 发布到私有 npm Registry

1. **配置 package.json**:

    ```json
    {
      "name": "@company/ai-kit",
      "version": "1.0.0",
      "publishConfig": {
        "registry": "http://npm.example.com/"
      },
      "files": [ // ⚠️ 必须包含所有插件文件
        ".claude-plugin", "commands", "skills", "agents", "hooks", ".mcp.json", "README.md", "scripts", "servers"
      ]
    }
    ```

2. **认证与发布**:

    ```bash
    # 登录私有仓库
    npm login --registry=http://npm.example.com/
    # 发布
    npm publish
    ```

### 2.2 配置企业级 Marketplace

创建一个 Git 仓库（如 `company-marketplace`），在其中创建 `.claude-plugin/marketplace.json`。支持多种 Source 类型：

```jsonc
{
  "name": "company-internal",
  "owner": { "name": "Company AI Team" },
  "plugins": [
    {
      // ── 方式 A：npm 包 (推荐) ────────────────────────
      "name": "ai-kit",
      "description": "企业研发效能工具箱",
      "source": {
        "source": "npm",
        "package": "@company/ai-kit",
        "registry": "http://npm.example.com/"
      }
    },
    {
      // ── 方式 B：Git 仓库 (稳定) ──────────────────────
      "name": "security-scanners",
      "source": {
        "source": "git",
        "url": "https://git.example.com/security-scanners.git"
      }
    }
  ]
}
```

*将此文件推送到 Git 仓库。*

### 2.3 版本管理与发布 Checklist

1. **更新版本号**:
    * `.claude-plugin/plugin.json` 中的 `version`
    * `package.json` 中的 `version`
    * （推荐使用 `npm version patch` 同步）
2. **验证**: 运行 `claude plugin validate .`
3. **打包检查**: 运行 `npm pack --dry-run` 确保文件完整。
4. **发布**: `npm publish`。
5. **更新 Marketplace**: 如果是新插件，需更新 `marketplace.json`。

---

## 3 · 用户指南：安装与使用

### 3.1 安装插件（两种模式）

#### 模式 A：企业级标准安装 (推荐)

通过 Marketplace 安装，支持自动更新。

1. **添加 Marketplace**:

    ```bash
    # 只需执行一次
    /plugin marketplace add https://git.example.com/company/marketplace.git
    ```

2. **安装插件**:

    ```bash
    /plugin install ai-kit
    ```

#### 模式 B：开发者/调试安装

直接从 npm 全局安装并加载。

1. **全局安装包**:

    ```bash
    npm install -g @company/ai-kit --registry=http://npm.example.com/
    ```

2. **启动加载**:

    ```bash
    claude --plugin-dir $(npm root -g)/@company/ai-kit
    ```

### 3.2 常用命令与管理

* **管理**:
  * `/plugin`: 打开交互式面板。
  * `/plugin update`: 更新所有插件。
  * `/plugin remove <name>`: 卸载插件。
* **使用**:
  * `/help`: 查看所有可用命令。
  * `/namespace:command`: 执行特定命令。

### 3.3 进阶配置 (Scope & Auto-Update)

* **安装范围 (Scope)**:
  * `--scope user` (默认): 用户级，所有项目生效。
  * `--scope project`: 仅当前项目生效（写入 `.claude/settings.json`）。
* **自动更新**:
  * 官方 Marketplace 默认开启。
  * 私有 Marketplace 默认关闭，需手动开启或配置环境变量 `FORCE_AUTOUPDATE_PLUGINS=true`。

---

## 4 · 企业级部署与最佳实践

### 4.1 自动推送 Marketplace

在项目 `.claude/settings.json` 中配置，团队成员 clone 项目后会自动提示添加 Marketplace。

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

### 4.2 安全策略 (Allowlist/Denylist)

管理员可控制允许使用的 MCP Server。

```json
{
  "mcpServers": {
    "allowedMcpServers": ["jira", "confluence"], // 白名单
    "deniedMcpServers": ["*"]
  }
}
```

### 4.3 故障排查 (Troubleshooting)

| 现象 | 可能原因 | 解决方案 |
| :--- | :--- | :--- |
| **插件未加载** | `plugin.json` 语法错误 | 运行 `claude plugin validate .` |
| **命令找不到** | 目录结构错误 | 确保 `commands/` 在插件根目录，而非 `.claude-plugin/` 内 |
| **Hooks 不触发** | 脚本无执行权限 | `chmod +x scripts/*.sh` |
| **MCP 连接失败** | 路径引用错误 | 使用 `${CLAUDE_PLUGIN_ROOT}` 引用内部文件 |
| **npm 安装 404** | 未配置 Registry | 检查 `.npmrc` 或安装命令是否带 `--registry` |

## 延伸阅读

* [Basic](https://code.claude.com/docs/en/plugins)
* [Install](https://code.claude.com/docs/en/discover-plugins)
* [Market place](https://code.claude.com/docs/en/plugin-marketplaces#create-the-marketplace-file)
* [Reference](https://code.claude.com/docs/en/plugins-reference)
