# Claude Code CLI

## 基础用法

1. 按照[官方文档](https://code.claude.com/docs/get-started/installation)安装 Claude Code，查看详细的平台特定指南。
2. 使用三种方法之一进行身份验证（参见[身份验证](https://code.claude.com/docs/get-started/authentication)）。

### 日常使用

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

# 后台执行长时间任务
claude # 然后在命令执行期间按 Ctrl+B
```

### 快捷键

| 按键 | 功能 |
|------|----------|
| `Ctrl+C` | 取消当前操作 |
| `Ctrl+D` | 退出 Claude Code |
| `Ctrl+L` | 清屏 |
| `Ctrl+O` | 切换详细输出 |
| `Ctrl+V` (Mac) / `Alt+V` (Win) | 粘贴图像或文件路径 |
| `Ctrl+B` | 后台运行长时间的 bash 命令 |
| `Esc` `Esc` | 倒带代码/对话 |
| `Shift+Tab` | 切换权限模式 |
| `Option+P` (Mac) / `Alt+P` (Win) | 切换模型 |
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

为终端设置多行输入：
```bash
claude
> /terminal-setup
```

## 命令

Claude 支持斜杠命令。输入 `/` 查看所有可用命令。

### 内置命令

#### 会话管理

| 命令 | 描述 |
|---------|-------------|
| `/clear` | 清除对话历史 |
| `/rename <name>` | 给会话起个好记的名字 |
| `/resume [session]` | 恢复另一个对话 |
| `/rewind` | 倒带代码和/或对话 |
| `/exit` | 退出 Claude Code |

#### 配置

| 命令 | 描述 |
|---------|-------------|
| `/config` | 打开设置界面 |
| `/status` | 显示版本、模型、账户信息 |
| `/model` | 选择或更改 AI 模型 |
| `/agents` | 管理自定义子智能体 |
| `/permissions` | 查看/更新权限设置 |
| `/sandbox` | 启用沙盒 bash 工具 |

#### 工作区

| 命令 | 描述 |
|---------|-------------|
| `/init` | 使用 CLAUDE.md 初始化项目 |
| `/memory` | 编辑 CLAUDE.md 记忆文件 |
| `/add-dir` | 添加额外的工作目录 |
| `/todos` | 列出当前 TODO 项目 |

#### 集成

| 命令 | 描述 |
|---------|-------------|
| `/ide` | 连接到 IDE (VS Code, JetBrains) |
| `/mcp` | 管理 MCP 服务器连接 |
| `/hooks` | 配置基于事件的自动化 |
| `/plugin` | 管理插件 |

#### 实用工具

| 命令 | 描述 |
|---------|-------------|
| `/help` | 获取使用帮助 |
| `/doctor` | 检查安装健康状况 |
| `/cost` | 显示 Token 使用统计 |
| `/stats` | 查看使用分析 |
| `/context` | 可视化上下文使用情况 |
| `/export [file]` | 导出对话 |
| `/bashes` | 列出后台任务 |

### 自定义命令

创建保存在 Markdown 文件中的可复用提示词。

**项目特定** (与团队共享):
```bash
mkdir -p .claude/commands
echo "Review this code for security vulnerabilities:" > .claude/commands/security-review.md
```

用法:
```
> /security-review
```

**个人使用** (在所有项目中可用):
```bash
mkdir -p ~/.claude/commands
echo "Optimize this code for performance:" > ~/.claude/commands/optimize.md
```

**带参数:**
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

用法:
```
> /fix-issue 123
```

**带 Bash 执行:**
```markdown
<!-- .claude/commands/commit.md -->
---
allowed-tools: Bash(git:*)
---

Current status: !`git status`
Staged changes: !`git diff --staged`

Create a meaningful commit message based on the above.
```

## 会话管理

### 理解会话

会话存储对话历史记录，并可以随时恢复。

```bash
# 开启新会话
claude

# 继续最近的会话
claude -c

# 按名称恢复
claude -r "auth-refactor"

# 交互式选择器
claude -r
```

### 会话选择器快捷键

| 按键 | 动作 |
|-----|--------|
| `↑/↓` | 导航会话 |
| `→/←` | 展开/折叠组 |
| `Enter` | 选择并恢复 |
| `P` | 预览会话 |
| `R` | 重命名会话 |
| `/` | 搜索会话 |
| `A` | 切换当前目录 vs 所有项目 |
| `B` | 按 Git 分支过滤 |
| `Esc` | 退出选择器 |

### 会话存储

- 位置: `~/.claude/sessions/`
- 格式: 包含完整消息历史的 JSONL
- 清理: 空闲 30 天后自动删除（可配置）

### 并行工作的 Git Worktrees

使用完全隔离的环境处理多个功能：

```bash
# 为功能创建 worktree
git worktree add ../project-feature-a -b feature-a

# 在隔离环境中运行 Claude
cd ../project-feature-a
claude

# 列出 worktrees
git worktree list

# 清理
git worktree remove ../project-feature-a
```

## 配置

### 配置文件

分层设置，优先级顺序如下：

| 位置 | 用途 | 优先级 |
|----------|---------|----------|
| 托管设置 (系统) | 企业策略 | 最高 |
| `.claude/settings.json` | 项目共享 | 高 |
| `.claude/settings.local.json` | 个人项目覆盖 | 中 |
| `~/.claude/settings.json` | 用户全局 | 低 |

### CLAUDE.md 记忆文件

存储项目上下文和指令：

```bash
.claude/CLAUDE.md          # 项目特定
~/.claude/CLAUDE.md        # 个人全局
.claude/CLAUDE.local.md    # 个人项目覆盖
```

**CLAUDE.md 示例:**
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

### 设置配置

`~/.claude/settings.json` 示例:

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

### 关键设置

| 设置 | 用途 | 示例 |
|---------|---------|---------|
| `permissions.allow` | 预批准工具 | `["Bash(git:*)", "Read"]` |
| `permissions.deny` | 阻止工具 | `["WebFetch"]` |
| `env` | 环境变量 | `{"KEY": "value"}` |
| `model` | 默认 AI 模型 | `"claude-sonnet-4-5-20250929"` |
| `outputStyle` | 响应风格 | `"Concise"` |
| `alwaysThinkingEnabled` | 扩展思考 | `true` |

### 文件排除

保护敏感文件：

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

## MCP (模型上下文协议)

将 Claude Code 连接到外部工具、数据库和 API。

### 你可以做什么

- 实现 GitHub Issues
- 查询数据库
- 监控 Sentry 错误
- 访问 Slack 消息
- 管理云基础设施
- 查询分析数据

### 安装 MCP 服务器

**HTTP 服务器 (推荐):**
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 带认证
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer TOKEN"
```

**SSE 服务器:**
```bash
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

**Stdio 服务器 (本地):**
```bash
# 本地 stdio 服务器
claude mcp add --transport stdio database -- npx -y @example/database-mcp

# 带环境变量
claude mcp add --transport stdio airtable --env AIRTABLE_API_KEY=KEY \
  -- npx -y airtable-mcp-server
```

### 管理 MCP 服务器

```bash
claude mcp list              # 列出已配置的服务器
claude mcp get github        # 获取特定服务器详情
claude mcp remove github     # 移除服务器
```

在交互模式下:
```
> /mcp
```

### 安装范围

| 范围 | 位置 | 共享? |
|-------|----------|--------|
| **Local** | `.mcp.json` | 否 |
| **Project** | `.mcp.json` (committed) | 是 |
| **User** | `~/.claude.json` | 否 |

```bash
# 项目范围 (与团队共享)
claude mcp add --transport http --scope project github https://...

# 用户范围 (所有项目)
claude mcp add --transport http --scope user database https://...
```

### 热门 MCP 服务器

- **GitHub** - Issues, PRs, 仓库
- **Sentry** - 错误监控
- **PostgreSQL** - 数据库查询
- **Slack** - 消息, 频道
- **Google Calendar** - 日程管理
- **Notion** - 工作区知识库
- **Stripe** - 支付管理

### 实践示例

**监控 Sentry 错误:**
```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
> /mcp  # 认证

# 然后使用:
> What are the top 5 errors this week?
```

**查询 PostgreSQL:**
```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://user:pass@host:5432/db"

> What's our total revenue this month?
```

**从 Claude Desktop 导入:**
```bash
claude mcp add-from-claude-desktop
```

## IDE 集成

### VS Code 扩展

**安装:**
1. 打开扩展 (`Cmd+Shift+X`)
2. 搜索 "Claude Code"
3. 安装并重启

**快速开始:**
- 点击编辑器工具栏中的 ✱
- 点击状态栏中的 "✱ Claude Code"
- 命令面板: "Claude Code"

**特性:**
- 内联差异审查
- 带行号的 @提及 (`Alt+K`)
- 编辑前计划审查
- 自动接受模式
- 多对话标签页
- 终端模式

**快捷键:**

| 快捷键 | 动作 |
|----------|--------|
| `Cmd+Esc` / `Ctrl+Esc` | 切换焦点 |
| `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | 新标签页 |
| `Alt+K` | 插入文件引用 |

### JetBrains IDEs

支持: IntelliJ, PyCharm, WebStorm, GoLand, PhpStorm, Android Studio

**安装:**
1. Settings → Plugins
2. 搜索 "Claude Code"
3. 安装并重启

**特性:**
- 快速启动: `Cmd+Esc` / `Ctrl+Esc`
- IDE 差异查看器
- 选择上下文共享
- 文件引用: `Cmd+Option+K` / `Alt+Ctrl+K`
- 诊断集成

**从终端连接:**
```bash
claude
> /ide
```

## 无头模式 (自动化)

以非交互方式运行 Claude Code，用于脚本和 CI/CD。

### 基础用法

```bash
# 简单查询
claude -p "analyze this code"

# JSON 输出
claude -p "find bugs" --output-format json

# 继续对话
claude -p "what else?" --continue

# 恢复特定会话
claude -p "continue" --resume session-name
```

### 常见模式

**创建提交信息:**
```bash
claude -p "Create commit for staged changes" \
  --allowedTools "Bash(git:*)"
```

**代码审查:**
```bash
gh pr diff "$1" | claude -p "Review for security issues" \
  --output-format json
```

**CI/CD 集成:**
```json
{
  "scripts": {
    "lint:claude": "claude -p 'Report issues in staged changes' --output-format json"
  }
}
```

**通过 Claude 管道传输:**
```bash
cat error.log | claude -p "explain this error" > analysis.txt
cat code.py | claude -p "find bugs" --output-format json | jq .
```

### 输出格式

**Text (默认):**
```bash
claude -p "query"
```

**JSON:**
```bash
claude -p "query" --output-format json
# 返回: {"result": "...", "session_id": "...", "usage": {...}}
```

**Streaming JSON:**
```bash
claude -p "query" --output-format stream-json
# 实时换行 JSON
```

## 工具

Claude Code 为处理代码提供了强大的工具。

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
| `NotebookEdit` | 修改 Jupyter notebooks | 是 |
| `Task` | 委托给子智能体 | 否 |
| `TodoWrite` | 创建任务列表 | 否 |

### 工具权限

控制 Claude 可以使用哪些工具：

```json
{
  "permissions": {
    "allow": ["Bash(npm run test)", "Read", "Glob"],
    "deny": ["WebFetch", "Bash(curl:*)"]
  }
}
```

### 权限模式

用 `Shift+Tab` 切换：

| 模式 | 行为 | 何时使用 |
|------|----------|-------------|
| **Normal** | 行动前询问 | 默认，最谨慎 |
| **Auto-Accept** | 自动批准更改 | 当你信任 Claude 时 |
| **Plan** | 只读分析 | 做出更改之前 |

## 技能 (高级命令)

技能是跨多个文件组织的综合能力。

### 创建你的第一个技能

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

Claude 在解释代码时会自动使用此技能。

### 带支持文件的技能

```
my-skill/
├── SKILL.md           # 概览
├── reference.md       # 详细文档
├── examples.md        # 用法示例
└── scripts/
    └── helper.py      # 实用脚本
```

### 技能 vs 命令

| 方面 | 命令 | 技能 |
|--------|----------|--------|
| 调用 | 手动: `/command` | 自动 |
| 结构 | 单个 .md 文件 | 带资源的目录 |
| 复杂度 | 简单提示词 | 多步骤工作流 |

## 最佳实践

### 工作流：理解代码库

```bash
claude
> overview of this codebase
> what's the architecture?
> where is authentication handled?
> explain key patterns
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
> What about backward compatibility?

# 执行
Shift+Tab  # 退出计划模式
> Implement first step
```

### 工作流：代码审查

```bash
> review my recent changes
> run linter
> suggest performance improvements
> security issues?
> add missing tests
```

### 工作流：创建 PR

```bash
> summarize changes
> create pull request
> add testing details
```

### 日常效率技巧

1. **命名会话**: `/rename feature-name`
2. **快速查询**: `claude -p "quick question"`
3. **继续工作**: `claude -c`
4. **自定义命令**: 构建 `.claude/commands/`
5. **一次配置**: 设置 `.claude/settings.json`
6. **引用文件**: 使用 `@file.js`
7. **扩展思考**: 输入 `ultrathink:` 处理复杂问题
8. **后台任务**: `Ctrl+B` 用于长时间命令
9. **监控上下文**: `Ctrl+O` 查看 Token 使用
10. **MCP 集成**: 连接日常工具

## 高级特性

### 扩展思考 (Extended Thinking)

为复杂问题启用深度推理：

```bash
# 在配置中启用
/config  # 切换 alwaysThinkingEnabled

# 单次请求
> ultrathink: design a caching layer

# 设置 Token 预算
export MAX_THINKING_TOKENS=8000
```

### 子智能体 (Subagents)

委托专门任务：

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

### Hooks (钩子)

围绕工具执行自动化操作：

```bash
/hooks
```

**示例：编辑后自动格式化:**
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

### 环境变量

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

### 沙盒 (Sandboxing)

在隔离环境中运行 Bash：

```bash
/sandbox  # 启用沙盒
# 命令在文件系统/网络隔离中运行
```

## 故障排除

### 常见问题

**Claude 无响应:**
- 检查网络连接
- 开启新对话
- 尝试 `-p` 模式
- 运行 `claude doctor`

**IDE 无法工作:**
- 重启 IDE/重新加载窗口
- 确保在项目目录中
- 检查 `/ide` 输出

**权限问题:**
- 检查设置
- 清除缓存: `rm -rf ~/.claude.json`
- 运行 `claude doctor`

**MCP 服务器失败:**
- 验证 URL/地址
- 检查环境变量
- 认证: `/mcp`

### 卸载

**原生安装:**
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

**清除所有配置:**
```bash
rm -rf ~/.claude
rm ~/.claude.json
rm -rf .claude
rm .mcp.json
```

## 资源

- **官方文档**: https://code.claude.com/docs
- **GitHub**: https://github.com/anthropics/claude-code
- **MCP Registry**: https://api.anthropic.com/mcp-registry
- **Agent SDK**: https://platform.claude.com/docs/agent-sdk

## 总结

Claude Code 是一个强大的 AI 编程助手，具有：

1. **交互式开发** - 自然对话
2. **IDE 集成** - VS Code 和 JetBrains
3. **可扩展性** - MCP, 技能, 自定义命令
4. **团队协作** - 共享设置, 技能
5. **自动化** - 无头模式, CI/CD
6. **上下文管理** - 会话, 记忆, CLAUDE.md

**从基础开始:**
- `/config` 进行配置
- `-c` 恢复工作
- `@file` 引用代码
- `/rename` 组织会话
- 自定义命令用于工作流

**进阶:**
- MCP 服务器用于集成
- 自定义技能用于专门工作流
- Hooks 用于自动化
- 子智能体用于复杂任务
- 无头模式用于 CI/CD

祝你使用 Claude 编程愉快！