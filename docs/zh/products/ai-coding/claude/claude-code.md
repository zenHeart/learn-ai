# Claude Code CLI

Claude Code 是一个强大的 AI 编程代理，可读取你的代码库、编辑文件、运行命令，并与你的开发工具深度集成。支持终端、IDE、桌面端和网页端。

> **版本说明**：本文档基于 Claude Code v2.1.x（2026 年 4 月）。Claude Code 每周迭代发布，可运行 `/powerup` 查看最新功能交互课程。

## 核心特性总览

| 特性类别 | 功能 | 说明 |
|---------|------|------|
| **上下文管理** | CLAUDE.md | 项目级上下文文件，每次会话自动读取 |
| | 自动记忆 | 跨会话保存构建命令、调试偏好等 |
| **代码操作** | Edit / Write / Read | 精准编辑、创建、读取文件 |
| | Bash / PowerShell | 执行终端命令（Windows 支持原生 PowerShell） |
| | Glob / Grep | 文件搜索和内容搜索 |
| **会话管理** | /resume (-r) | 恢复历史会话 |
| | Esc Esc / /rewind | 回溯代码和对话 |
| | -c / --continue | 继续最近会话 |
| | 检查点 | 保存和恢复文件状态 |
| **权限模式** | Normal / Auto-Accept / Plan / Auto | 四种权限模式，Shift+Tab 切换 |
| **扩展能力** | MCP 服务器 | 连接外部工具、数据库、API |
| | Skills（技能） | 自定义可复用工作流 |
| | Hooks（钩子） | 工具调用前后的自动化触发 |
| | Sub-agents | 多代理并行处理 |
| | Plugins | 插件扩展体系 |
| **多端支持** | CLI / VS Code / JetBrains / Desktop / Web | 全平台统一体验 |
| **自动化** | 云端计划任务 | 在 Anthropic 云上运行，电脑关机也能跑 |
| | 桌面计划任务 | 在本机运行的定期任务 |
| | 无头模式 | CI/CD 脚本调用 |
| **协作** | GitHub Actions / GitLab CI | 自动 PR 审查和问题分类 |
| | Slack 集成 | @Claude 触发任务 |
| | Channels | 从 Telegram/Discord/webhook 推送事件 |
| | 远程控制 | 从手机或任意浏览器继续本地会话 |

---

## 第一部分：快速入门

### 安装

```bash
# macOS / Linux / WSL（推荐，后台自动更新）
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Windows CMD
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd

# Homebrew（不自动更新，需手动 brew upgrade）
brew install --cask claude-code

# WinGet
winget install Anthropic.ClaudeCode
```

> **Windows 用户**：需要先安装 [Git for Windows](https://git-scm.com/downloads/win)。

### 基础用法

```bash
# 在项目目录启动交互式 REPL
cd your-project
claude

# 运行单个查询并退出（无头模式）
claude -p 'explain this codebase'

# 继续最近的对话
claude -c

# 恢复特定会话（按名称）
claude -r "feature-implementation"

# 交互式选择要恢复的会话
claude -r

# 以特定模型启动
claude --model claude-opus-4-6

# 管道输入
git diff | claude -p "review these changes"
```

### 首次使用

启动后系统会提示登录。运行 `/powerup` 查看内置交互式功能教程——这是了解最新特性的最快方式。

```
> /powerup
```

---

## 第二部分：交互基础

### 快捷键

| 按键 | 功能 |
|------|------|
| `Ctrl+C` | 取消当前操作 |
| `Ctrl+D` | 退出 Claude Code |
| `Ctrl+L` | 清屏 |
| `Ctrl+O` | 打开/退出对话记录全屏模式 |
| `Ctrl+V` / `Alt+V` | 粘贴图像或文件路径 |
| `Ctrl+B` | 后台运行长时间命令 |
| `Esc` `Esc` | 回溯代码/对话（rewind） |
| `Shift+Tab` | 切换权限模式（循环：Normal → Auto → Plan → Auto-Accept） |
| `Option+P` / `Alt+P` | 切换模型 |
| `↑ / ↓` | 导航命令历史 |
| `Ctrl+R` | 反向搜索历史 |
| `Ctrl+X Ctrl+E` | 在外部编辑器中编辑输入 |
| `/` (记录全屏中) | 搜索对话记录（`n`/`N` 翻找） |

### 多行输入

| 方法 | 快捷键 |
|------|------|
| 快速转义换行 | `\` + `Enter` |
| macOS 默认 | `Option+Enter` |
| 设置后可用 | `Shift+Enter` |
| 控制序列 | `Ctrl+J` |

```bash
# 运行后执行，配置 Shift+Enter 换行
> /terminal-setup
```

### 权限模式（四种）

用 `Shift+Tab` 循环切换，或在 `settings.json` 中设置默认值：

| 模式 | 行为 | 何时使用 |
|------|------|---------|
| **Normal** | 执行前询问确认 | 默认，最谨慎 |
| **Auto** | AI 分类器自动决策：安全操作自动通过，危险操作拦截 | **推荐**：无需频繁确认，又保留安全边界 |
| **Plan** | 只读分析，不执行任何更改 | 先规划再行动 |
| **Auto-Accept** | 自动批准所有操作 | 完全信任 Claude 时 |

```json
// .claude/settings.json - 设置默认权限模式
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

---

## 第三部分：内置命令

### 会话管理

| 命令 | 描述 |
|------|------|
| `/clear` | 清除对话历史 |
| `/rename <name>` | 给会话起名（便于 -r 恢复） |
| `/resume [session]` | 恢复另一个对话 |
| `/rewind` | 回溯代码和对话 |
| `/exit` | 退出 Claude Code |

### 配置与诊断

| 命令 | 描述 |
|------|------|
| `/config` | 打开设置界面 |
| `/status` | 显示版本、模型、账户、使用量信息（运行中也可用） |
| `/model` | 切换 AI 模型 |
| `/permissions` | 查看/更新权限，`Recent` 可手动重试被拦截的操作 |
| `/cost` | 显示 Token 使用统计 |
| `/context` | 可视化上下文使用情况 |
| `/doctor` | 检查安装健康状况 |

### 工作区

| 命令 | 描述 |
|------|------|
| `/init` | 用 CLAUDE.md 初始化项目 |
| `/memory` | 编辑 CLAUDE.md 记忆文件 |
| `/add-dir` | 添加额外的工作目录 |
| `/todos` | 列出当前 TODO 项 |

### 扩展与集成

| 命令 | 描述 |
|------|------|
| `/ide` | 连接到 IDE（VS Code / JetBrains） |
| `/mcp` | 管理 MCP 服务器连接和状态 |
| `/hooks` | 配置基于事件的自动化 |
| `/plugin` | 管理插件 |
| `/agents` | 管理子代理 |
| `/sandbox` | 启用沙盒 bash 工具 |

### 学习与实用

| 命令 | 描述 |
|------|------|
| `/powerup` | 交互式功能教程，带动画演示（推荐新用户运行） |
| `/help` | 获取使用帮助 |
| `/export [file]` | 导出对话 |
| `/schedule` | 创建定期计划任务 |
| `/loop` | 在 CLI 会话中重复执行提示（快速轮询） |
| `/desktop` | 将当前终端会话迁移到桌面 App（可视化 diff） |
| `/teleport` | 将 Web 会话拉入本地终端继续 |

---

## 第四部分：项目上下文管理

### CLAUDE.md

项目上下文文件，每次会话开始时自动读取：

```
.claude/CLAUDE.md          # 项目共享（提交到 Git）
~/.claude/CLAUDE.md        # 个人全局（所有项目生效）
.claude/CLAUDE.local.md    # 个人项目覆盖（不提交到 Git）
```

**示例内容**：
```markdown
# Project Context

## Tech Stack
- Frontend: React 18 + TypeScript strict mode
- Styling: Tailwind CSS
- State: Zustand
- Testing: Vitest + Testing Library

## Code Standards
- 所有组件写函数式，不用 class
- 副作用统一用 useEffect，禁止直接在渲染中调用 API
- 命名：组件 PascalCase，函数 camelCase，常量 UPPER_SNAKE_CASE

## Common Commands
- `pnpm dev` - 启动开发服务器
- `pnpm test` - 运行测试
- `pnpm build` - 构建生产版本
```

### 自动记忆（Auto Memory）

Claude 在工作中自动学习并保存构建命令、调试发现、架构决策等，跨会话复用，无需手动写入。

存储位置：`~/.claude/` 下的项目特定记忆文件。

### .claude 目录结构

```
.claude/
├── CLAUDE.md              # 主上下文文件
├── CLAUDE.local.md        # 个人本地覆盖（.gitignore）
├── settings.json          # 项目级配置
├── settings.local.json    # 个人本地配置覆盖
├── commands/              # 自定义斜杠命令
│   └── security-review.md
├── agents/                # 自定义子代理
│   └── reviewer.md
└── skills/                # 技能文件（如需本地定义）
```

---

## 第五部分：自定义能力

### 自定义命令（Slash Commands）

在 `.claude/commands/` 中创建 Markdown 文件即可注册新命令：

```bash
mkdir -p .claude/commands
```

```markdown
<!-- .claude/commands/security-review.md -->
---
description: 对当前代码进行安全漏洞审查
allowed-tools: Read, Grep, Glob
---

请检查以下安全问题：
1. XSS 注入风险
2. 未验证的用户输入
3. 硬编码的密钥或 token
4. 不安全的依赖版本

$ARGUMENTS（如提供则聚焦此路径）
```

用法：`/security-review src/api`

**带参数的命令示例**：
```markdown
<!-- .claude/commands/fix-issue.md -->
---
argument-hint: [issue-number]
description: 修复指定的 GitHub issue
---

请修复 issue #$ARGUMENTS：
1. 读取 issue 详情和相关代码
2. 实现修复方案
3. 写测试覆盖这个场景
4. 创建提交
```

### Skills（技能）

技能是带有结构化文档的能力包，Claude 会智能识别场景并自动加载，也可手动调用：

```
~/.claude/skills/
└── code-reviewer/
    ├── SKILL.md         # 技能入口和指令
    └── reference.md    # 详细参考文档
```

```markdown
<!-- SKILL.md -->
---
name: code-reviewer
description: 当用户要求代码审查、PR 审查、或检查代码质量时使用
tools: Read, Grep, Glob
---

你是一位资深代码审查专家...
```

**技能 vs 命令的区别**：

| | 命令 | 技能 |
|--|:--:|:--:|
| 触发方式 | 手动 `/command` | 自动识别 + 手动 |
| 结构 | 单个 .md 文件 | 带资源的目录 |
| 复杂度 | 简单提示词 | 多文件、多步骤 |

---

## 第六部分：MCP 集成

将 Claude Code 连接到外部工具、数据库和 API。

### 安装 MCP 服务器

```bash
# HTTP 服务器（REST API 类）
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Stdio 服务器（本地进程类）
claude mcp add --transport stdio database -- npx -y @bytebase/dbhub
```

### 管理 MCP

```bash
claude mcp list              # 列出已安装的服务器
claude mcp get github        # 查看详情
claude mcp remove github     # 移除
```

在会话中通过 `/mcp` 命令查看状态和切换开关（包括 computer-use、各类连接器）。

### 安装范围

| 范围 | 位置 | 团队共享? |
|------|------|:-------:|
| Project | `.mcp.json`（提交到 Git） | ✅ |
| Local | `.mcp.json`（本地覆盖） | ❌ |
| User | `~/.claude.json` | ❌ |

### 热门 MCP 服务器

- **GitHub** - Issues、PRs、仓库操作
- **PostgreSQL / MySQL** - 数据库查询
- **Slack** - 消息读写
- **Jira / Linear** - 工单管理
- **Google Drive / Docs** - 文档读取
- **Sentry** - 错误监控
- **Notion** - 知识库

### MCP 结果大小控制（v2.1.91 新增）

工具返回大型数据（如完整数据库 schema）时，可在服务器端声明允许的最大结果大小：

```json
{
  "name": "get_schema",
  "_meta": {
    "anthropic/maxResultSizeChars": 500000
  }
}
```

---

## 第七部分：钩子自动化

### 什么是 Hooks

在 Claude Code 工具调用前后自动触发 shell 命令，实现：保存后自动格式化、提交前 lint、变更后测试等。

### 触发事件

| 事件 | 触发时机 |
|------|---------|
| `PreToolUse` | 工具调用前 |
| `PostToolUse` | 工具调用后 |
| `SessionStart` | 会话开始 |
| `SessionEnd` | 会话结束 |
| `UserPromptSubmit` | 用户提交消息 |
| `CwdChanged` | 工作目录变更（新） |
| `FileChanged` | 文件变更（新） |

### 配置示例

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
        "hooks": [
          {
            "if": "Bash(git commit *)",
            "type": "command",
            "command": ".claude/hooks/lint-staged.sh"
          }
        ]
      }
    ]
  }
}
```

> **`if` 字段（v2.1.85 新增）**：条件触发，只在特定工具调用模式下激活钩子，减少无关开销。

**注意**：脚本文件需要有可执行权限：`chmod +x .claude/hooks/*.sh`

---

## 第八部分：Sub-agents 多代理系统

### 内置子代理

| 代理 | 用途 |
|------|------|
| **Explore** | 快速代码库探索，找文件、理解结构 |
| **Plan** | 规划调研，制定方案 |
| **General** | 多步骤任务执行 |

### 创建自定义子代理

```markdown
<!-- .claude/agents/security-reviewer.md -->
---
name: security-reviewer
description: 当需要安全审查、检查权限漏洞或 OWASP 合规时调用
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---

你是一位专注于 Web 安全的代码审查专家，擅长识别 OWASP Top 10 漏洞...
```

支持字段：`name`、`description`、`tools`（工具白名单）、`model`、`permissionMode`（ask/auto）、`initialPrompt`（自动提交的初始提示）

### 多代理并行执行

主代理可以生成多个子代理同时处理不同部分，适合大型任务拆分：

```
> 请创建 5 个代理，分别审查 auth、api、database、frontend、tests 模块，并行执行后合并报告
```

---

## 第九部分：会话管理与跨端协作

### 会话命名与恢复

```bash
claude                    # 新会话
claude -c                 # 继续最近会话
claude -r "auth-refactor" # 按名称恢复
claude -r                 # 交互式选择器
```

在会话中给当前会话命名：
```
> /rename feature/oauth-integration
```

### 检查点（Checkpointing）

Claude Code 自动在关键操作前保存文件状态检查点，使用 `Esc Esc`（或 `/rewind`）回溯到之前的状态。

### 跨端无缝切换

Claude Code 的每个界面连接同一个底层引擎，CLAUDE.md、设置、MCP 服务器全平台共享：

| 我想做什么 | 方案 |
|---------|------|
| 从手机/浏览器继续本地会话 | [远程控制](https://code.claude.com/docs/zh-CN/remote-control) |
| 把终端会话移到桌面 App 可视化 diff | 运行 `/desktop` |
| 把 Web 会话拉入终端 | 运行 `/teleport` |
| 从手机派发任务到桌面 App | 使用 Dispatch 功能 |
| 在 Slack 中触发 Claude 任务 | [@Claude 集成](https://code.claude.com/docs/zh-CN/slack) |
| 从 Telegram/Discord/webhook 推入事件 | [Channels](https://code.claude.com/docs/zh-CN/channels) |

### Dispatch（从手机派发任务）

在 Claude iOS App 或任意浏览器中发送任务，Claude Desktop 自动创建新会话执行。适用于在外想到一个任务、不需要立即开电脑处理的场景。

---

## 第十部分：Git 集成

### 自动提交

```
> 为这次更改创建一个提交，使用 Conventional Commits 格式
```

Claude 会：暂存文件 → 生成提交消息 → 执行提交。

### PR 创建

```
> 创建一个 Pull Request，描述这次功能的改动和测试结果
```

### PR Auto-fix（Web 版，2026 年 3 月新增）

在 Claude Code Web 界面创建 PR 后，开启 **Auto fix** 开关，Claude 会自动监控 CI 状态、修复 lint 错误、处理代码审查建议，持续推送直到 CI 通过。

### GitHub Actions / GitLab CI

```yaml
# .github/workflows/claude-review.yml
- name: Claude Code Review
  uses: anthropic/claude-code-action@v1
  with:
    claude_api_key: ${{ secrets.CLAUDE_API_KEY }}
```

---

## 第十一部分：计划任务

### 三种计划任务类型

| 类型 | 运行环境 | 电脑关机能跑？ | 访问本地文件？ |
|------|---------|:-----------:|:-----------:|
| **云端计划任务** | Anthropic 云基础设施 | ✅ | ❌ |
| **桌面计划任务** | 本机 Claude Desktop | ❌ | ✅ |
| **/loop** | CLI 当前会话轮询 | ❌ | ✅ |

### 云端计划任务（推荐）

在 Anthropic 管理的服务器上运行，电脑关机也能执行。创建方式三选一：
- Web 界面：[claude.ai/code](https://claude.ai/code)
- 桌面 App：计划任务面板
- CLI：运行 `/schedule`

适合：早晨 PR 审查摘要、夜间 CI 失败分析、每周依赖审计。

### 桌面计划任务

在本机运行，可直接访问本地文件。创建：Claude Desktop → 计划任务 → 新建。

适合：读取本地目录、处理本机文件的定期任务。

### /loop 命令（CLI 快速轮询）

```
> /loop 每 30 秒检查一次 build 是否成功
```

在当前 CLI 会话中持续重复执行，适合开发时的快速监控。

---

## 第十二部分：无头模式（Headless）

以非交互方式运行，用于脚本和 CI/CD。

### 基础用法

```bash
# 单次查询
claude -p "analyze this code"

# JSON 格式输出（便于程序解析）
claude -p "find bugs" --output-format json

# 继续上一次会话
claude -p "what else?" --continue

# 限制允许的工具
claude -p "Create commit" --allowedTools "Bash(git:*)"
```

### 管道组合

```bash
# 分析日志异常
tail -200 app.log | claude -p "找出异常模式并发 Slack 通知"

# 自动化 CI 翻译
claude -p "把新增的 i18n 字符串翻译成法语并创建 PR"

# 批量安全审查
git diff main --name-only | claude -p "对这些变更文件做安全审查"
```

### Python / TypeScript SDK 调用

```python
from claude_code_sdk import ClaudeCode

async with ClaudeCode() as client:
    result = await client.run("review auth module for security issues")
    print(result.output)
```

---

## 第十三部分：桌面 App

Claude Desktop 的"代码"标签页，在 GUI 中使用 Claude Code，提供 CLI 之外的额外能力：

| 功能 | 说明 |
|------|------|
| **可视化 Diff 审查** | 内联注释，直观查看文件变更 |
| **App 实时预览** | 启动开发服务器并预览效果 |
| **Computer Use** | Claude 控制鼠标键盘，操作任意 GUI 应用 |
| **PR 监控** | 监控 PR 的 CI 状态，支持 auto-fix 和 auto-merge |
| **并行会话** | 多会话同时运行，自动 Git worktree 隔离 |
| **Dispatch** | 从手机接收任务，在桌面创建会话执行 |
| **定期任务** | 在本机运行的定时 Claude 任务 |
| **Connectors** | 连接 GitHub、Slack、Linear 等服务 |
| **SSH 会话** | 连接远程服务器上的 Claude Code |
| **云会话** | 启动运行在 Anthropic 云上的长任务 |

### Computer Use（2026 年 3 月正式发布）

让 Claude 能操控真实桌面——打开应用、点击界面、截图验证，适用于没有 API 的工具。

```
启用路径：Claude Desktop → 设置 → Computer use → 开启
```

开启后 Claude 在访问每个应用前单独请求权限，默认关闭。

2026 年 4 月更新：Computer Use 现已支持 **CLI 模式**（通过 `/mcp` 启用 computer-use 工具）。

---

## 第十四部分：VS Code 和 JetBrains 集成

### VS Code

1. 打开扩展市场（`Cmd+Shift+X`），搜索 "Claude Code" 安装
2. 或点击：[直接安装](vscode:extension/anthropic.claude-code)（支持 Cursor）
3. 打开命令面板 `Cmd+Shift+P`，输入 "Claude Code" → 在新标签页中打开

**VS Code 专属能力**：
- 内联差异审查（编辑前可预览）
- `@` 提及文件（`Alt+K`）
- Plan 模式：先审查计划再允许执行
- 多对话标签页
- 限速提示横幅

### JetBrains（IntelliJ / PyCharm / WebStorm / GoLand 等）

从 [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) 安装，重启 IDE。

- 快捷启动：`Cmd+Esc` / `Ctrl+Esc`
- 交互式差异查看
- 选择上下文共享

---

## 第十五部分：Claude Code Web

在浏览器中运行 Claude Code，无需本地安装：[claude.ai/code](https://claude.ai/code)

**适用场景**：
- 处理你本地没有的仓库
- 在移动设备上启动长时间任务
- 在没有安装开发环境的电脑上临时使用
- 并行运行多个任务

**Web 专属功能**：
- **PR Auto-fix**：开启后 Claude 自动处理 CI 失败和代码审查意见
- **云端计划任务**：创建和管理在 Anthropic 云上运行的任务
- `/teleport` 将会话迁移到本地终端

---

## 第十六部分：安全与权限

### 权限规则配置

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

### 配置文件优先级

| 位置 | 用途 | 优先级 |
|------|------|:------:|
| 托管设置（企业/系统） | 组织策略，不可覆盖 | 最高 |
| `.claude/settings.json` | 项目共享配置 | 高 |
| `.claude/settings.local.json` | 个人本地覆盖 | 中 |
| `~/.claude/settings.json` | 用户全局配置 | 低 |

### 沙盒模式

```
> /sandbox
```

在隔离环境中运行 Bash 命令，防止意外修改文件系统。

### Auto 权限模式（v2.1.83 新增）

AI 分类器自动决策：常规编辑和读取自动通过，危险命令（如删除）被拦截。这是 Normal（询问一切）和 Auto-Accept（接受一切）之间的平衡点。

被拦截后通过 `/permissions → Recent` 可手动复审。

---

## 第十七部分：工具参考

| 工具 | 用途 | 需要权限? |
|------|------|:--------:|
| `Read` | 读取文件内容 | ❌ |
| `Write` | 创建/覆盖文件 | ✅ |
| `Edit` | 精准字符串替换 | ✅ |
| `Bash` | 执行 Shell 命令 | ✅ |
| `PowerShell` | Windows 原生 PowerShell（预览） | ✅ |
| `Glob` | 按模式匹配文件路径 | ❌ |
| `Grep` | 搜索文件内容 | ❌ |
| `WebFetch` | 获取网页内容 | ✅ |
| `WebSearch` | 搜索网络 | ✅ |
| `Task` | 委托给子代理 | ❌ |
| `TodoWrite` | 创建/更新任务清单 | ❌ |
| `computer-use` | 截图和控制鼠标键盘（通过 /mcp 启用） | ✅ |

---

## 第十八部分：最佳实践

### 高效工作流

**理解新代码库**：
```
> 给我这个代码库的概览，包括技术栈、目录结构和核心模块
> 认证逻辑在哪里处理的？
> 用一句话描述这个函数的作用：[粘贴代码]
```

**修复 Bug**：
```
> 我遇到了这个错误：[粘贴错误]
> 能帮我追踪根本原因吗？
> 实现修复方案，然后运行测试验证
```

**实现功能（Plan 模式推荐）**：
```bash
# 先切换到 Plan 模式（只读分析）
Shift+Tab  # 切换到 Plan

> 设计一个 OAuth2 登录流程的实现方案，包括文件结构和接口设计

Shift+Tab  # 切换回 Auto 或 Normal
> 按照刚才的方案实现第一步
```

**代码审查**：
```
git diff | claude -p "对这些变更做安全和性能审查，JSON 格式输出问题列表"
```

### 效率技巧

1. **命名会话**：`/rename feature-name` - 便于用 `-r` 快速恢复
2. **快速查询**：`claude -p "quick question"` - 不进入交互模式
3. **先规划再执行**：复杂任务先用 Plan 模式，看清楚再执行
4. **用 Auto 模式**：比 Normal 省时间，比 Auto-Accept 更安全
5. **引用文件**：在对话中用 `@filename.js` 快速引用
6. **后台长任务**：`Ctrl+B` 把耗时命令扔到后台
7. **Ctrl+V 粘贴图片**：可以直接粘贴截图让 Claude 分析
8. **善用 /powerup**：每次大版本升级后运行，不错过新功能

---

## 第十九部分：故障排除

### 常见问题

**Claude 无响应**：
- `Ctrl+C` 取消当前操作
- 运行 `claude doctor` 检查安装
- 重启：退出后重新启动

**MCP 服务器失败**：
- `/mcp` 查看服务器状态
- 检查 URL/地址和认证配置
- 查看服务器日志

**权限被拦截**：
- `/permissions` → `Recent` 手动复审
- 调整 `settings.json` 中的 `allow` 规则

**上下文窗口不够**：
- `/clear` 清除历史后继续
- 拆分为多个子任务
- `/context` 查看使用情况

### 卸载

```bash
# 原生安装
rm -f ~/.local/bin/claude
rm -rf ~/.claude-code

# Homebrew
brew uninstall --cask claude-code

# WinGet
winget uninstall Anthropic.ClaudeCode
```

---

## 资源

- [官方文档](https://code.claude.com/docs/zh-CN/overview)
- [What's New（每周更新日志）](https://code.claude.com/docs/en/whats-new/index)
- [CLI 参考](https://code.claude.com/docs/zh-CN/cli-reference)
- [常见工作流](https://code.claude.com/docs/zh-CN/common-workflows)
- [最佳实践](https://code.claude.com/docs/zh-CN/best-practices)
- [故障排除](https://code.claude.com/docs/zh-CN/troubleshooting)
