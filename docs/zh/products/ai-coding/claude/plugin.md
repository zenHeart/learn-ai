# Claude Code Plugin 开发与发布完整手册

> **版本**：Claude Code v2.0+ (2025-03)  
> **目标**：为开发者、发布者和终端用户提供基于内网 npm 和 Git 的全流程指南。

本手册整合了 Claude Code 插件体系的核心概念、开发规范、企业级分发策略及故障排查指南，旨在打造一个标准化的内部工具生态。

---

## 0 · 核心概念速览

### 0.1 什么是 Plugin？
插件是扩展 Claude Code 能力的独立单元，它可以包含以下五种组件。
**重要概念澄清**：
*   **内容包**：插件本质上是一个符合特定目录结构的文件夹。
*   **分发载体**：虽然我们使用 npm 包（或 Git 仓库）来传输它，但 Claude Code 是通过下载并解析这个包的内容来加载功能的，而不是像普通 Node.js 依赖那样运行它。
*   **缓存机制**：插件安装后会被缓存到 `~/.claude/plugins/cache/`。

### 0.2 五大组件 (The Big 5)

| 组件 | 目录/文件 | 作用 | 触发方式 |
| :--- | :--- | :--- | :--- |
| **Commands** | `commands/*.md` | 自定义斜杠命令 | 用户手动输入 `/name:cmd` |
| **Skills** | `skills/*/SKILL.md` | 给 AI 的新能力 | AI 根据上下文**自动调用** |
| **Agents** | `agents/*.md` | 专用子代理 | 用户 `/agents` 选择或 AI 委派 |
| **Hooks** | `hooks/hooks.json` | 生命周期钩子 | 事件触发（如启动时、保存后） |
| **MCP Servers** | `.mcp.json` | 连接外部工具/数据 | 插件启用时自动启动后台服务 |

### 0.3 什么是 Marketplace？
Marketplace 是一个 JSON 目录文件（`marketplace.json`），它是连接用户与插件的桥梁。
*   **对于企业**：这是管理内部工具集的中心枢纽，支持 Git/npm 多种源。
*   **对于用户**：这是“应用商店”，支持一键安装、自动更新。

---

## 1 · 开发者指南：构建插件

### 1.1 目录结构与 plugin.json

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
├── package.json          # [必选] npm 发布配置
└── README.md             # [必选] 使用说明
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
*   **位置**: `commands/hello.md` -> `/namespace:hello`
*   **Frontmatter**:
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
*   **位置**: `skills/git-commit/SKILL.md`
*   **关键点**: `description` 必须精准，Claude 靠它决定是否调用此技能。
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
*   **位置**: `agents/qa-bot.md`
*   **Frontmatter 字段**:
    | 字段 | 说明 |
    | :--- | :--- |
    | `name` | 唯一标识符 |
    | `description` | 触发时机描述 |
    | `tools` | 允许使用的工具列表 |
    | `model` | 指定模型 (e.g. `claude-opus-4-6`) |
    | `permissionMode` | `ask` (询问) / `auto` (自动) |

#### D. Hooks (生命周期钩子)
自动化脚本触发器。
*   **位置**: `hooks/hooks.json`
*   **支持事件**: `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit` 等。
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
*   **位置**: `.mcp.json`
*   **配置示例**:
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

1.  **验证结构**:
    ```bash
    claude plugin validate .
    ```
2.  **本地加载运行 (推荐)**:
    ```bash
    # 无需安装，直接加载当前目录，修改代码重启生效
    claude --plugin-dir .
    ```
3.  **Marketplace 模拟安装 (本地仿真)**:
    如果你想测试 `/plugin install` 流程，可以将当前目录模拟为本地 Marketplace。

    *   **前提**: 在根目录创建 `marketplace.json` 指向自身。
    *   **操作**:
        ```bash
        # 1. 添加当前目录为 Marketplace 源
        /plugin marketplace add .
        
        # 2. 从本地 Marketplace 安装插件
        /plugin install company-tools
        ```
4.  **调试命令**:
    *   `/plugin list`: 查看已加载插件。
    *   `/mcp`: 查看 MCP 服务状态。
    *   `/agents`: 查看已注册的 Agent。

---

## 2 · 发布指南：私有 npm 与 Marketplace

### 2.1 发布到私有 npm Registry

1.  **配置 package.json**:
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
2.  **认证与发布**:
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

1.  **更新版本号**:
    *   `.claude-plugin/plugin.json` 中的 `version`
    *   `package.json` 中的 `version`
    *   （推荐使用 `npm version patch` 同步）
2.  **验证**: 运行 `claude plugin validate .`
3.  **打包检查**: 运行 `npm pack --dry-run` 确保文件完整。
4.  **发布**: `npm publish`。
5.  **更新 Marketplace**: 如果是新插件，需更新 `marketplace.json`。

---

## 3 · 用户指南：安装与使用

### 3.1 安装插件（两种模式）

#### 模式 A：企业级标准安装 (推荐)
通过 Marketplace 安装，支持自动更新。

1.  **添加 Marketplace**:
    ```bash
    # 只需执行一次
    /plugin marketplace add https://git.example.com/company/marketplace.git
    ```
2.  **安装插件**:
    ```bash
    /plugin install ai-kit
    ```

#### 模式 B：开发者/调试安装
直接从 npm 全局安装并加载。

1.  **全局安装包**:
    ```bash
    npm install -g @company/ai-kit --registry=http://npm.example.com/
    ```
2.  **启动加载**:
    ```bash
    claude --plugin-dir $(npm root -g)/@company/ai-kit
    ```

### 3.2 常用命令与管理

*   **管理**:
    *   `/plugin`: 打开交互式面板。
    *   `/plugin update`: 更新所有插件。
    *   `/plugin remove <name>`: 卸载插件。
*   **使用**:
    *   `/help`: 查看所有可用命令。
    *   `/namespace:command`: 执行特定命令。

### 3.3 进阶配置 (Scope & Auto-Update)

*   **安装范围 (Scope)**:
    *   `--scope user` (默认): 用户级，所有项目生效。
    *   `--scope project`: 仅当前项目生效（写入 `.claude/settings.json`）。
*   **自动更新**:
    *   官方 Marketplace 默认开启。
    *   私有 Marketplace 默认关闭，需手动开启或配置环境变量 `FORCE_AUTOUPDATE_PLUGINS=true`。

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
