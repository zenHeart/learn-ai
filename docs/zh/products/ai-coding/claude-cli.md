# Claude Code CLI

Claude Code 是一个强大的 AI 编程助手，支持终端、IDE、桌面端和网页端使用。

## 核心特性总览

| 特性类别 | 功能 | 说明 |
|---------|------|------|
| **上下文管理** | CLAUDE.md | 项目级上下文文件 |
| | Rules | 模块化规则系统 (`.claude/rules/`) |
| **任务执行** | /architect | 系统架构设计 |
| | /todo | 任务规划和进度追踪 |
| | /test | 生成测试用例 |
| **代码操作** | Edit | 编辑文件 |
| | Write | 写入/创建文件 |
| | Bash | 执行终端命令 |
| **会话管理** | /resume | 恢复历史会话 |
| | /rewind | 回溯代码/对话 |
| | --continue (-c) | 继续最近会话 |
| **配置与定制** | MCP 服务器 | 扩展工具能力 |
| | Slop | 自然语言命令 |
| **开发辅助** | Git 集成 | 智能提交和分支管理 |
| | Debug | 调试辅助 |

---

## 第一部分：快速入门

### 安装

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

### 基础用法

```bash
# 交互式 REPL 模式
claude

# 运行单个查询并退出
claude -p 'explain this codebase'

# 继续最近的对话
claude -c

# 恢复特定会话
claude -r "feature-implementation"

# 以特定模型启动
claude --model opus

# 处理管道输入
git diff | claude -p "review these changes"
```

---

## 第二部分：交互基础

### 快捷键

| 按键 | 功能 |
|------|----------|
| `Ctrl+C` | 取消当前操作 |
| `Ctrl+D` | 退出 Claude Code |
| `Ctrl+L` | 清屏 |
| `Ctrl+O` | 切换详细输出 |
| `Ctrl+V` / `Alt+V` | 粘贴图像或文件路径 |
| `Ctrl+B` | 后台运行长时间命令 |
| `Esc` `Esc` | 倒带代码/对话 |
| `Shift+Tab` | 切换权限模式 |
| `Option+P` / `Alt+P` | 切换模型 |
| `Up/Down` | 导航命令历史 |
| `Ctrl+R` | 反向搜索历史 |
| `Ctrl+Y` | 启用 yolo 模式 |

### 多行输入

| 方法 | 快捷键 |
|--------|----------|
| 快速转义 | `\` + `Enter` |
| macOS 默认 | `Option+Enter` |
| 设置后 | `Shift+Enter` |
| 控制序列 | `Ctrl+J` |

```bash
claude
> /terminal-setup
```

### 权限模式

用 `Shift+Tab` 切换：

| 模式 | 行为 | 何时使用 |
|------|----------|-------------|
| **Normal** | 行动前询问 | 默认，最谨慎 |
| **Auto-Accept** | 自动批准更改 | 当你信任 Claude 时 |
| **Plan** | 只读分析 | 做出更改之前 |

---

## 第三部分：内置命令

### 会话管理

| 命令 | 描述 |
|---------|-------------|
| `/clear` | 清除对话历史 |
| `/rename <name>` | 给会话起个好记的名字 |
| `/resume [session]` | 恢复另一个对话 |
| `/rewind` | 倒带代码和/或对话 |
| `/exit` | 退出 Claude Code |

### 配置

| 命令 | 描述 |
|---------|-------------|
| `/config` | 打开设置界面 |
| `/status` | 显示版本、模型、账户信息 |
| `/model` | 选择或更改 AI 模型 |
| `/agents` | 管理自定义子智能体 |
| `/permissions` | 查看/更新权限设置 |
| `/sandbox` | 启用沙盒 bash 工具 |

### 工作区

| 命令 | 描述 |
|---------|-------------|
| `/init` | 使用 CLAUDE.md 初始化项目 |
| `/memory` | 编辑 CLAUDE.md 记忆文件 |
| `/add-dir` | 添加额外的工作目录 |
| `/todos` | 列出当前 TODO 项目 |

### 集成

| 命令 | 描述 |
|---------|-------------|
| `/ide` | 连接到 IDE (VS Code, JetBrains) |
| `/mcp` | 管理 MCP 服务器连接 |
| `/hooks` | 配置基于事件的自动化 |
| `/plugin` | 管理插件 |

### 实用工具

| 命令 | 描述 |
|---------|-------------|
| `/help` | 获取使用帮助 |
| `/doctor` | 检查安装健康状况 |
| `/cost` | 显示 Token 使用统计 |
| `/stats` | 查看使用分析 |
| `/context` | 可视化上下文使用情况 |
| `/export [file]` | 导出对话 |
| `/bashes` | 列出后台任务 |

---

## 第四部分：项目上下文管理

### CLAUDE.md

项目上下文文件：

```bash
.claude/CLAUDE.md          # 项目特定
~/.claude/CLAUDE.md        # 个人全局
.claude/CLAUDE.local.md    # 个人项目覆盖
```

**示例:**
```markdown
# Project Context

## Architecture
- Frontend: React with TypeScript
- Backend: Node.js/Express

## Coding Standards
- Use TypeScript strict mode
- Write tests for all features

## Common Commands
- `npm run dev` - Start dev server
- `npm test` - Run tests
```

### Rules (模块化规则系统)

```
.claude/
├── rules/
│   ├── coding-standards.md
│   ├── security.md
│   └── testing.md
├── CLAUDE.md
└── settings.json
```

**规则文件格式:**
```markdown
---
name: coding-standards
description: 项目编码规范
priority: high
---

## TypeScript 规范
- 启用 strict 模式
```

### Memory (记忆系统)

```bash
/memory           # 编辑当前记忆文件
/recall <topic>  # 检索特定记忆
/forget <topic>  # 删除特定记忆
```

---

## 第五部分：自定义能力

### 自定义命令

项目特定命令：
```bash
mkdir -p .claude/commands
echo "Review for security vulnerabilities:" > .claude/commands/security-review.md
```
用法: `/security-review`

**带参数:**
```markdown
<!-- .claude/commands/fix-issue.md -->
---
argument-hint: [issue-number]
description: Fix a GitHub issue
---

Fix issue #$1 by:
1. Finding the issue details
```

### 技能 (Skills)

技能是跨多个文件组织的综合能力：

```bash
mkdir -p ~/.claude/skills/code-explainer
```

```
my-skill/
├── SKILL.md           # 概览
├── reference.md       # 详细文档
└── scripts/
    └── helper.py
```

**技能 vs 命令:**

| 方面 | 命令 | 技能 |
|--------|----------|--------|
| 调用 | 手动: `/command` | 自动 |
| 结构 | 单个 .md 文件 | 带资源的目录 |
| 复杂度 | 简单提示词 | 多步骤工作流 |

---

## 第六部分：MCP 集成

将 Claude Code 连接到外部工具、数据库和 API。

### 安装 MCP 服务器

**HTTP 服务器:**
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

**Stdio 服务器:**
```bash
claude mcp add --transport stdio database -- npx -y @bytebase/dbhub
```

### 管理 MCP

```bash
claude mcp list              # 列出
claude mcp get github        # 获取详情
claude mcp remove github     # 移除
```

### 安装范围

| 范围 | 位置 | 共享? |
|-------|----------|--------|
| Local | `.mcp.json` | 否 |
| Project | `.mcp.json` | 是 |
| User | `~/.claude.json` | 否 |

### 热门 MCP 服务器

- **GitHub** - Issues, PRs, 仓库
- **Sentry** - 错误监控
- **PostgreSQL** - 数据库查询
- **Slack** - 消息, 频道
- **Notion** - 工作区知识库

---

## 第七部分：钩子自动化

### Hooks

围绕工具执行自动化操作：

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

**SessionStart hook:**
```json
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

---

## 第八部分：代理系统

### Sub-agents

```bash
/agents  # 管理子智能体
```

**内置:**
- **Explore** - 快速代码库探索
- **Plan** - 规划研究
- **General** - 多步骤任务

**创建自定义:**
```markdown
# .claude/agents/reviewer.md
---
name: code-reviewer
description: Security and quality reviewer
tools: Read, Grep, Glob
---

You are a senior code reviewer...
```

### Agent Teams

多代理协同工作：

```json
// .claude/teams/my-team.json
{
  "name": "feature-team",
  "members": [
    {"name": "frontend-dev", "agent": "custom:code-reviewer"},
    {"name": "backend-dev", "agent": "custom:api-builder"},
    {"name": "qa", "agent": "Explore"}
  ]
}
```

**协作模式:**

| 模式 | 说明 |
|------|------|
| **顺序** | 代理按顺序执行 |
| **并行** | 多个代理同时工作 |
| **层级** | 主代理协调子代理 |

---

## 第九部分：会话管理

### 理解会话

```bash
claude                 # 新会话
claude -c              # 继续最近会话
claude -r "auth-refactor"  # 按名称恢复
claude -r              # 交互式选择器
```

### 会话存储

- 位置: `~/.claude/sessions/`
- 格式: JSONL
- 清理: 空闲 30 天后自动删除

### 分支会话

```bash
claude --branch-aware  # 自动隔离分支
```

```json
{
  "sessions": {
    "branchIsolation": true,
    "autoCreate": true
  }
}
```

### Git Worktrees

```bash
git worktree add ../project-feature-a -b feature-a
cd ../project-feature-a
claude
```

### Checkpointing

```bash
> save checkpoint before refactoring
> restore checkpoint auth-implementation
```

```json
{
  "checkpointing": {
    "enabled": true,
    "autoSave": true,
    "interval": 300
  }
}
```

---

## 第十部分：Git 集成

### 自动提交

```bash
> create a commit for the changes
> commit with a meaningful message
```

### PR 创建

```bash
> create a pull request
> summarize changes and create a pull request with test details
```

### 分支管理

```bash
> create a new branch called feature/auth
> switch to main branch
> merge feature/auth into main
```

### 提交规范

支持 Conventional Commits：

```bash
> commit with conventional commit format
# 生成: feat(auth): add OAuth2 login
```

---

## 第十一部分：无头模式

以非交互方式运行，用于脚本和 CI/CD。

### 基础用法

```bash
claude -p "analyze this code"
claude -p "find bugs" --output-format json
claude -p "what else?" --continue
```

### 常见模式

**创建提交:**
```bash
claude -p "Create commit" --allowedTools "Bash(git:*)"
```

**代码审查:**
```bash
gh pr diff "$1" | claude -p "Review for security issues" --output-format json
```

**CI/CD 集成:**
```json
{
  "scripts": {
    "lint:claude": "claude -p 'Report issues' --output-format json"
  }
}
```

---

## 第十二部分：高级特性

### Extended Thinking

```bash
# 启用
/config  # 切换 alwaysThinkingEnabled

# 单次请求
> ultrathink: design a caching layer
```

### Image Analysis

快捷键粘贴:
- Mac: `Ctrl+V`
- Windows: `Alt+V`

**文件路径引用:**
```bash
> 分析这个设计稿 @/path/to/design.png
```

**应用场景:**

- UI/UX 审查
- 错误分析
- 设计稿转代码
- 视觉回归对比

---

## 第十三部分：IDE 集成

### VS Code

1. 打开扩展 (`Cmd+Shift+X`)
2. 搜索 "Claude Code"
3. 安装并重启

**特性:**
- 内联差异审查
- @提及 (`Alt+K`)
- 编辑前计划审查
- 多对话标签页

### JetBrains

支持: IntelliJ, PyCharm, WebStorm, GoLand 等

**快速启动:** `Cmd+Esc` / `Ctrl+Esc`

---

## 第十四部分：安全与沙盒

### Sandboxing

```bash
/sandbox  # 启用沙盒模式
```

```json
{
  "sandbox": {
    "enabled": true,
    "allowedPaths": ["./**", "/tmp/**"],
    "deniedPaths": ["~/.ssh/**", "/etc/**"],
    "network": "deny",
    "timeout": 300
  }
}
```

---

## 第十五部分：配置

### 配置文件优先级

| 位置 | 用途 | 优先级 |
|----------|---------|----------|
| 托管设置 (系统) | 企业策略 | 最高 |
| `.claude/settings.json` | 项目共享 | 高 |
| `.claude/settings.local.json` | 个人覆盖 | 中 |
| `~/.claude/settings.json` | 用户全局 | 低 |

### 关键设置

| 设置 | 用途 | 示例 |
|---------|---------|---------|
| `permissions.allow` | 预批准工具 | `["Bash(git:*)", "Read"]` |
| `permissions.deny` | 阻止工具 | `["WebFetch"]` |
| `model` | 默认模型 | `"claude-sonnet-4-5-20250929"` |
| `alwaysThinkingEnabled` | 扩展思考 | `true` |

### 文件排除

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

---

## 第十六部分：工具参考

### 可用工具

| 工具 | 用途 | 权限 |
|------|---------|------------|
| `Read` | 读取文件 | 否 |
| `Write` | 创建/覆盖文件 | 是 |
| `Edit` | 针对性编辑 | 是 |
| `Bash` | 执行 Shell 命令 | 是 |
| `Glob` | 按模式查找文件 | 否 |
| `Grep` | 搜索文件内容 | 否 |
| `WebFetch` | 获取网页内容 | 是 |
| `WebSearch` | 搜索网络 | 是 |
| `Task` | 委托给子智能体 | 否 |
| `TodoWrite` | 创建任务列表 | 否 |

---

## 第十七部分：最佳实践

### 工作流：理解代码库

```bash
> overview of this codebase
> what's the architecture?
> where is authentication handled?
```

### 工作流：修复 Bug

```bash
> I'm seeing error: [paste error]
> can you reproduce this?
> suggest fixes
> apply the best fix
> run tests
```

### 工作流：实现功能

```bash
# 使用计划模式
claude --permission-mode plan
> Create plan for OAuth2 authentication
Shift+Tab  # 退出计划模式
> Implement first step
```

### 工作流：代码审查

```bash
> review my recent changes
> run linter
> suggest performance improvements
```

### 效率技巧

1. **命名会话**: `/rename feature-name`
2. **快速查询**: `claude -p "quick question"`
3. **继续工作**: `claude -c`
4. **自定义命令**: 构建 `.claude/commands/`
5. **引用文件**: 使用 `@file.js`
6. **扩展思考**: `ultrathink:` 处理复杂问题
7. **后台任务**: `Ctrl+B` 用于长时间命令

---

## 第十八部分：故障排除

### 常见问题

**Claude 无响应:**
- 检查网络连接
- 开启新对话
- 尝试 `-p` 模式
- 运行 `claude doctor`

**IDE 无法工作:**
- 重启 IDE
- 确保在项目目录中

**权限问题:**
- 清除缓存: `rm -rf ~/.claude.json`
- 运行 `claude doctor`

**MCP 服务器失败:**
- 验证 URL/地址
- 认证: `/mcp`

### 卸载

```bash
# 原生安装
rm -f ~/.local/bin/claude
rm -rf ~/.claude-code

# Homebrew
brew uninstall --cask claude-code
```

---

## 资源

- **官方文档**: https://code.claude.com/docs
- **GitHub**: https://github.com/anthropics/claude-code
- **MCP Registry**: https://api.anthropic.com/mcp-registry
- **Agent SDK**: https://platform.claude.com/docs/agent-sdk
