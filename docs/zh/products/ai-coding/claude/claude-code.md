# Claude Code

Claude Code 是 Anthropic 推出的 AI 编程代理，可读取代码库、编辑文件、运行命令，并与开发工具深度集成。它不是一个孤立的工具——**同一套引擎（CLAUDE.md、设置、MCP 服务器）在终端、IDE、桌面端和网页端之间完全共享**。

> **版本说明**：Claude Code 每周迭代发布，可运行 `/powerup` 查看最新功能交互课程。本文档基于 v2.1.x 系列（2026 年）。

## 产品概览

Claude Code 有 5 种使用界面，能力一致但各有所长：

| 界面 | 入口 | 独有能力 |
|------|------|---------|
| **终端 CLI** | `claude` 命令 | 最灵活，支持脚本化、CI/CD、无头模式 |
| **VS Code 扩展** | 扩展市场安装 | 内联 diff 审查、`@` 提及文件、多标签页 |
| **JetBrains 扩展** | JetBrains Marketplace | 交互式差异查看、快捷键 `Cmd+Esc` / `Ctrl+Esc` |
| **桌面 App** | Claude Desktop "代码"标签 | 可视化 diff、并行会话、PR 监控、Computer Use |
| **Web 版** | [claude.ai/code](https://claude.ai/code) | 无需安装、PR Auto-fix、从手机派发任务 |

**选择建议**：日常开发用 VS Code/JetBrains 扩展最方便；CI/CD 用 CLI 无头模式；需要可视化审查用桌面 App；临时用 Web 版。

---

## CLI 快速入门

### 安装

```bash
# macOS / Linux / WSL（推荐，后台自动更新）
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Homebrew（不自动更新）
brew install --cask claude-code

# WinGet
winget install Anthropic.ClaudeCode
```

> **Windows 用户**：需要先安装 [Git for Windows](https://git-scm.com/downloads/win)。

### 基础用法

```bash
# 在项目目录启动交互式 REPL
cd your-project && claude

# 运行单个查询并退出（无头模式）
claude -p 'explain this codebase'

# 继续最近会话
claude -c

# 恢复特定会话
claude -r "feature-implementation"

# 以特定模型启动
claude --model claude-sonnet-4-6

# 管道输入
git diff | claude -p "review these changes"
```

### 完整 CLI 标志参考

```bash
claude [选项]

会话控制：
  -p, --print <prompt>       无头模式：运行单个查询并退出
  -c, --continue             继续最近的会话
  -r, --resume [session]     恢复历史会话（可选指定名称）
      --model <model>        指定模型（如 claude-sonnet-4-6）
      --effort <level>       推理深度：low / medium / high / xhigh / max / ultracode
      --permission-mode <mode> 权限模式：default / acceptEdits / plan / auto / dontAsk / bypassPermissions / manual

会话隔离：
      --worktree <path>      在指定 git worktree 中运行会话
      --base-dir <path>      设置工作基础目录

输出控制：
      --output-format <fmt>  输出格式：text（默认）/ json
      --json-schema <schema> JSON 输出时的 schema 验证

工具控制：
      --allowedTools <tools> 限制可用工具（逗号分隔）
      --mcp-config <path>    MCP 配置文件路径
      --plugin-dir <path>    插件目录

运行模式：
      --background           后台运行长时间任务
      --cloud                在 Anthropic 云端运行（电脑关机也能跑）
      --chrome               启用 Chrome 浏览器自动化模式

其他：
  -d, --debug               启用调试日志
      --debug-logs <dir>    调试日志输出目录
  -v, --version             显示版本号
  -h, --help                显示帮助信息
```

> **环境变量**：`ANTHROPIC_API_KEY`（API 密钥）、`CLAUDE_CODE_DEBUG_LOGS_DIR`（调试日志目录）、`CLAUDE_CODE_SIMPLE=1`（简化输出）。

---

## 交互基础

### 快捷键

| 按键 | 功能 |
|------|------|
| `Ctrl+C` | 取消当前操作 |
| `Ctrl+D` | 退出 Claude Code |
| `Ctrl+L` | 清屏 |
| `Ctrl+O` | 打开/退出对话记录全屏模式 |
| `Ctrl+V` / `Alt+V` | 粘贴图像或文件路径 |
| `Ctrl+B` | 后台运行长时间命令 |
| `Esc Esc` | 回溯代码和对话（rewind） |
| `Shift+Tab` | 切换权限模式（default → acceptEdits → plan → auto → bypassPermissions → manual） |
| `Option+P` / `Alt+P` | 切换模型 |
| `↑ / ↓` | 导航命令历史 |
| `Ctrl+R` | 反向搜索历史 |
| `Ctrl+X Ctrl+E` | 在外部编辑器中编辑输入 |

### 多行输入

| 方法 | 快捷键 |
|------|--------|
| 快速转义换行 | `\` + `Enter` |
| macOS 默认 | `Option+Enter` |
| 设置后可用 | `Shift+Enter` |
| 控制序列 | `Ctrl+J` |

### 权限模式

用 `Shift+Tab` 循环切换 7 种官方权限模式（`default` / `acceptEdits` / `plan` / `auto` / `dontAsk` / `bypassPermissions` / `manual`），或在 `settings.json` 中设置默认值：

```json
// .claude/settings.json - 设置默认权限模式
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

> 完整的模式清单、行为说明和配置值对照表见 [术语表：权限模式](./claude-code-glossary#权限模式) 和 [Cheatsheet · 决策表](./claude-code-cheatsheet#该用哪个权限模式)。

### Plan Mode 三阶段工作流（官方推荐）

官方推荐的最佳实践是把复杂任务拆为三个阶段，避免 Claude 直接跳到编码：

```
阶段 1: Explore（探索）
┌─────────────────────────────────────┐
│ 让 Claude 只读探索代码库：          │
│ - 这是什么技术栈？                   │
│ - 相关文件有哪些？                   │
│ - 数据流是怎么走的？                 │
│ 不要写任何代码                        │
└──────────────┬──────────────────────┘
               ▼
阶段 2: Plan（规划）
┌─────────────────────────────────────┐
│ 基于探索结果，让 Claude 输出计划：    │
│ - 需要修改哪些文件                   │
│ - 每个文件的改动内容                 │
│ - 依赖关系和执行顺序                 │
│ 此时纠正成本最低（只需改方案）         │
└──────────────┬──────────────────────┘
               ▼
阶段 3: Implement（实现）
┌─────────────────────────────────────┐
│ 切换回 Auto/Normal 模式，按计划执行   │
│ 每完成一步运行验证（测试/lint/build） │
│ 偏离计划时回到 Plan 模式重新规划       │
└─────────────────────────────────────┘
```

**何时跳过 Plan**：小改动（< 2 个文件）可以直接在 Auto 模式执行。涉及 3+ 文件时务必走 Plan。

**进阶用法**：让一个 Claude 写计划，再启动新会话让另一个 Claude 以"资深工程师视角"审查计划——没有上下文偏见，能发现更多疏漏。

---

## 内置命令

### 会话管理

| 命令 | 描述 |
|------|------|
| `/clear` | 清除对话历史 |
| `/rename <name>` | 给会话起名（便于 `-r` 恢复） |
| `/resume [session]` | 恢复另一个对话 |
| `/rewind` | 回溯代码和对话 |
| `/exit` | 退出 Claude Code |

### 配置与诊断

| 命令 | 描述 |
|------|------|
| `/config` | 打开设置界面 |
| `/status` | 显示版本、模型、账户、使用量信息 |
| `/model` | 切换 AI 模型 |
| `/permissions` | 查看/更新权限，`Recent` 可手动重试被拦截的操作 |
| `/cost` | 显示 Token 使用统计 |
| `/context` | 可视化上下文使用情况 |
| `/doctor` | 检查安装健康状况 |
| `/powerup` | 交互式功能教程，带动画演示（推荐新用户运行） |

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

### 技能与自动化

| 命令 | 描述 |
|------|------|
| `/code-review` | 对当前变更自动执行代码审查 |
| `/batch` | 批量处理多个提示或文件 |
| `/debug` | 交互式调试辅助 |
| `/claude-api` | 直接调用 Claude API |
| `/run` | 执行外部脚本或命令 |
| `/verify` | 验证代码正确性 |
| `/run-skill-generator` | 生成新的自定义 Skill |

### 学习与实用

| 命令 | 描述 |
|------|------|
| `/help` | 获取使用帮助 |
| `/export [file]` | 导出对话 |
| `/schedule` | 创建定期计划任务 |
| `/loop` | 在 CLI 会话中重复执行提示（快速轮询） |
| `/desktop` | 将当前终端会话迁移到桌面 App（可视化 diff） |
| `/teleport` | 将 Web 会话拉入本地终端继续 |

---

## 项目上下文管理

### Memory 系统概述

Claude Code 有两套互补的记忆机制，分别解决"你告诉 Claude"和"Claude 自己学到"的问题：

| 机制 | 谁写 | 目的 | 存储位置 |
|------|------|------|---------|
| **CLAUDE.md** | 你手动编写 | 项目规范、技术栈、编码约定 | `.claude/CLAUDE.md`（提交到 Git） |
| **自动记忆（Auto Memory）** | Claude 自动写入 | 构建命令、调试发现、架构决策 | `~/.claude/projects/<project>/memory/` |

### CLAUDE.md 加载层级

每次会话启动时，Claude Code 按以下顺序加载上下文文件，**后加载的会覆盖先加载的**：

```
1. ~/.claude/CLAUDE.md              # 用户全局（所有项目生效）
2. 组织托管 CLAUDE.md                # 企业/团队统一规范（如有）
3. .claude/CLAUDE.md                # 项目共享（提交到 Git）
4. .claude/CLAUDE.local.md          # 个人项目覆盖（不提交到 Git）
```

**路径作用域规则**：在 `.claude/rules/` 目录下放置 `.md` 文件，可通过 `paths:` frontmatter 指定只在访问特定目录时加载：

```markdown
---
paths: ["src/api/**", "src/services/**"]
---
# API 层规范
所有 API 调用必须通过 `src/services/api-client.ts`，禁止直接使用 fetch/axios。
```

**文件导入**：在 CLAUDE.md 中使用 `@path/to/file` 语法导入其他文件：

```markdown
@./docs/API_CONVENTIONS.md
@~/.claude/global-rules.md
@AGENTS.md  # 兼容 AGENTS.md 标准
```

**管理命令**：

| 命令 | 用途 |
|------|------|
| `/memory` | 浏览和管理所有记忆文件 |
| `/context` | 可视化当前加载的上下文文件和使用量 |

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

Claude 在对话中自动学习并保存有价值的信息，**跨会话持久化**：

- **存储位置**：`~/.claude/projects/<项目路径>/memory/`
- **索引文件**：`MEMORY.md`——启动时自动加载前 200 行（约 25KB）
- **每条记忆**：独立 `.md` 文件，包含 frontmatter（名称、描述、类型、时间戳）
- **记忆类型**：用户偏好（user）、反馈（feedback）、项目知识（project）、外部参考（reference）
- **自动关联**：记忆间通过 `[[记忆名称]]` 互相链接

### .claude 目录结构

```
.claude/
├── CLAUDE.md              # 主上下文文件
├── CLAUDE.local.md        # 个人本地覆盖（.gitignore）
├── settings.json          # 项目级配置
├── settings.local.json    # 个人本地配置覆盖
├── rules/                 # 路径作用域规则
│   └── api-rules.md
├── commands/              # 自定义斜杠命令
│   └── security-review.md
├── agents/                # 自定义子代理
│   └── reviewer.md
├── skills/                # 技能文件
│   └── code-reviewer/
│       └── SKILL.md
├── hooks/                 # 钩子脚本
│   └── lint-staged.sh
└── .mcp.json              # 项目 MCP 配置
```

> 详见 [术语表：Memory](./claude-code-glossary#memory-记忆)。

---

## MCP 集成

将 Claude Code 连接到外部工具、数据库和 API。详见 [术语表：MCP](./claude-code-glossary#mcp-model-context-protocol)。

### 安装 MCP 服务器

```bash
# HTTP 服务器（REST API 类）
claude mcp add --transport http github https://api.github.com/mcp/

# Stdio 服务器（本地进程类）
claude mcp add --transport stdio database -- npx -y @bytebase/dbhub
```

### 管理 MCP

```bash
claude mcp list              # 列出已安装的服务器
claude mcp get github        # 查看详情
claude mcp remove github     # 移除
```

在会话中通过 `/mcp` 命令查看状态和切换开关。

### 安装范围

| 范围 | 位置 | 团队共享? |
|------|------|:--------:|
| Project | `.mcp.json`（提交到 Git） | ✅ |
| Local | `.mcp.json`（本地覆盖） | ❌ |
| User | `~/.claude.json` | ❌ |

### MCP 结果大小控制

工具返回大型数据时，可在服务器端声明允许的最大结果大小：

```json
{
  "name": "get_schema",
  "_meta": {
    "anthropic/maxResultSizeChars": 500000
  }
}
```

---

## Hooks 钩子

在 Claude Code 生命周期中的特定时刻自动触发脚本，实现自动化工作流。详见 [术语表：Hooks](./claude-code-glossary#hooks-钩子)。

### 工作原理

Hook 在工具调用前后自动执行，支持三种处理程序类型：

| 类型 | 说明 | 适用场景 |
|------|------|---------|
| **command** | Shell 脚本 | 最常用，运行 lint、格式化等 |
| **http** | HTTP POST 请求 | 发送到外部服务 |
| **prompt** | LLM 判断 | 让 Claude 自己判断是否拦截 |

### Hook 事件速查

| 事件 | 触发时机 | 可阻塞？ | 典型用途 |
|------|---------|:--------:|---------|
| `SessionStart` | 会话启动/恢复 | ❌ | 加载环境变量、开发上下文 |
| `Setup` | `--init-only` / `--maintenance` | ❌ | 一次性依赖安装 |
| `InstructionsLoaded` | CLAUDE.md 或 rules 加载 | ❌ | 审计日志、合规追踪 |
| `UserPromptSubmit` | 用户提交提示词 | ✅ | 验证/拦截特定 prompt |
| `UserPromptExpansion` | 斜杠命令展开为 prompt | ✅ | 拦截危险命令（如 `/deploy`） |
| `PreToolUse` | 工具调用前 | ✅ | 拦截危险操作 |
| `PostToolUse` | 工具调用后 | ❌ | 自动格式化、lint |
| `PostToolUseFailure` | 工具调用失败后 | ❌ | 错误上报 |
| `PermissionRequest` | 权限确认请求 | ✅ | 自动批准/拒绝特定权限 |
| `PermissionDenied` | 权限被拒绝时 | ❌ | 通知、审计 |
| `SubagentStart` | 子代理启动 | ❌ | 日志 |
| `SubagentStop` | 子代理停止 | ❌ | 结果处理 |
| `TaskCreated` | 创建任务 | ✅ | 工作流控制 |
| `TaskCompleted` | 完成任务 | ❌ | 通知 |
| `Stop` | Claude 完成回复时 | ✅ | 最终审查 |
| `StopFailure` | Claude 停止失败 | ❌ | 错误恢复 |
| `SessionEnd` | 会话结束 | ❌ | 清理、报告 |
| `TeammateIdle` | Agent Team 队友空闲 | ❌ | 任务分配 |

### 快速示例

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

> 脚本需要有可执行权限：`chmod +x .claude/hooks/*.sh`。Hooks 在终端、IDE 扩展、桌面 App 和 Web 版中触发的事件完全相同。

### 异步 Hooks

默认情况下 Hook 同步执行，阻塞 Claude Code 直到完成。将 `"async": true` 加入 hook 配置，可在后台运行：

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

适合运行测试、触发 CI 等不需要即时结果的场景。

### Prompt Hooks 和 Agent Hooks

**Prompt Hooks**：让 LLM 判断是否拦截操作，适用于需要语义理解的安全策略：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "prompt",
        "prompt": "判断这个 Bash 命令是否安全。如果涉及删除或修改 /etc、/usr 等系统目录，返回 block。"
      }]
    }]
  }
}
```

**Agent Hooks**：启动子代理执行更复杂的判断逻辑。

---

## Skills 技能

技能是带有结构化文档的能力包，Claude 会智能识别场景并自动加载，也可手动调用。详见 [术语表：Skills](./claude-code-glossary#skills-技能)。

### 内置 Skills（斜杠命令）

Claude Code 自带了多个内置 skill，通过斜杠命令直接调用：

| 命令 | 用途 |
|------|------|
| `/doctor` | 诊断安装和配置问题的设置检查 |
| `/code-review` | 检查 diff/PR 是否存在正确性 bug 和清理机会 |
| `/batch` | 在隔离 worktree 中编排大规模跨代码库的并行改动 |
| `/debug` | 启用调试日志并排查问题 |
| `/loop` | 按固定间隔或自定节奏重复运行某个 prompt/命令 |
| `/claude-api` | 加载 Claude API / Managed Agents 参考资料（不是直接调用 API） |
| `/verify` | 检查代码是否可以正确执行 |
| `/simplify` | 清理代码的风格和可读性问题 |

### Skill 加载优先级

当多个 skill 同名时，按以下顺序加载（高优先级覆盖低优先级）：

| 优先级 | 位置 | 适用场景 |
|:------:|------|---------|
| 1（最高） | Enterprise managed skills | 团队/企业统一规范 |
| 2 | User skills (`~/.claude/skills/`) | 个人全局技能 |
| 3 | Project skills (`.claude/skills/`) | 项目专属技能 |
| 4（最低） | Bundled skills | 内置通用技能 |

### Skills 与 Plugins 的区别

| | Skills | Plugins |
|:--|:------|:--------|
| **形式** | 单个目录（`SKILL.md` + 资源） | 多目录打包（Skills + Agents + Hooks + MCP） |
| **范围** | 单一能力 | 一整套相关能力 |
| **安装** | 直接复制到 `.claude/skills/` | 通过 `/plugin install` 安装 |
| **分发** | 通常项目内使用 | 可通过 npm / Git / Marketplace 分发 |

**社区 Skills 资源**：
- [Claude Directory](https://claudedirectory.org) — 37+ 社区 Skills 模板，覆盖开发、测试、文档等场景

> 关于第三方"一键配置"插件仓库（如 `vercel-labs/claude-code-setup`），官方文档未做背书，且该仓库 URL 在 2026-08-17 已无法访问；如需获取社区最佳实践，请直接查看 [Claude Code 官方仓库](https://github.com/anthropics/claude-code) 的 `README` 与示例。

---

## Sub-agents 子代理

拥有独立人格和权限的 AI 助手，可以并行处理不同任务。详见 [术语表：Sub-agents](./claude-code-glossary#sub-agents-子代理)。

### 内置子代理

| 代理 | 用途 |
|------|------|
| **Explore** | 快速代码库探索，找文件、理解结构 |
| **Plan** | 规划调研，制定方案 |

### 自定义子代理示例

```markdown
<!-- .claude/agents/security-reviewer.md -->
---
name: security-reviewer
description: 当需要安全审查、检查权限漏洞或 OWASP 合规时调用
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---
```

支持字段：`name`、`description`、`tools`（工具白名单）、`model`、`permissionMode`（ask/auto）、`initialPrompt`（自动提交的初始提示）。

### 关键约束

- **无子代理嵌套**：子代理不能再委托子代理
- **上下文隔离**：每个子代理有独立的上下文窗口，不会看到主代理或其他子代理的对话
- **并行执行**：多个子代理可同时运行，独立消耗各自模型的配额
- **`Task` 工具**：子代理通过 `Task` 工具被调用，支持 `subagent_type` 和内联 `prompt`

---

## Dynamic Workflows 动态工作流

通过 JavaScript 脚本编排大规模子代理工作流，将多 Agent 协作从"手动调度"升级为"脚本化流水线"。Claude 负责编写脚本，运行时负责执行。

### 核心概念

Dynamic Workflows 的核心思想是：Claude 编写一个 JavaScript 文件，在其中直接调用 `agent()` 和 `pipeline()` API 来编排子代理。整个脚本作为 workflow 被版本控制、管理和复用。

### agent() API — Fan-out 并行模式

```javascript
// workflows/code-review.js
const results = await agent({
  description: "审查各模块代码质量",
  prompt: "审查以下模块的安全漏洞和代码风格",
  agents: 5,              // 并行启动 5 个子代理
  model: "sonnet",        // 使用 Sonnet 模型
  workingDirectory: ".",
});

// results 是一个 Promise 数组
for (const result of results) {
  console.log(result.summary);
}
```

**Fan-out 模式要点：**

| 要点 | 说明 |
|------|------|
| `agents` 参数 | 指定并行子代理数量（不填则自动） |
| Prompt Caching | 共享上下文自动缓存，降低 token 成本 |
| 可恢复执行 | 脚本中断后可从断点继续，不丢失已完成结果 |

### pipeline() API — 串行流水线

```javascript
// workflows/deploy-pipeline.js
const result = await pipeline({
  description: "构建 → 测试 → 部署",
  steps: [
    { role: "builder",  prompt: "运行构建并修复错误" },
    { role: "tester",   prompt: "运行测试并修复失败" },
    { role: "reviewer", prompt: "审查变更" },
    { role: "deployer", prompt: "部署到 staging" },
  ],
});
```

每个 step 的输出自动成为下一个 step 的上下文，形成流水线。

### 工作流脚本结构

```javascript
// workflows/my-workflow.js
import { agent, pipeline } from "workflow-api";

export async function main(context) {
  // context 包含环境信息、用户请求等

  const choice = await context.ask(
    "选择审查范围：all / src / tests"
  );

  if (choice === "all") {
    // Fan-out 全量并行
    return await agent({
      description: "全量代码审查",
      prompt: "审查所有模块",
      agents: 10,
    });
  } else {
    // Pipeline 串行处理
    return await pipeline({
      description: `${choice} 模块审查流水线`,
      steps: [
        { role: "lint",    prompt: `Lint ${choice}` },
        { role: "review",  prompt: `Review ${choice}` },
        { role: "fix",     prompt: `修复发现的问题` },
      ],
    });
  }
}
```

### 内置工作流

| 工作流 | 触发方式 | 用途 |
|--------|---------|------|
| `/deep-research` | 斜杠命令 | 多轮深度调研，自动生成报告 |
| `ultracode` | 关键词触发 | 自动运行代码审查 + 修复流程 |

### Size 限制

| 模式 | 子代理数量上限 | 适用场景 |
|------|:------------:|---------|
| `small` | 5 | 日常开发 |
| `medium` | 20 | 大规模重构 |
| `unrestricted` | 无限制 | 企业级批量操作 |

### 使用限制

- **Beta 阶段**：Dynamic Workflows 处于实验阶段，API 可能变化
- **不支持子代理嵌套**：工作流中的子代理不能再委托其他子代理
- **受 `maxThinkingTokens` 限制**：Workflow 中 `agent()` 调用不继承主会话的 extended thinking 配置
- **大小写敏感**：`Agent()`、`AGENT()` 无效，必须使用小写 `agent()`

---

## Cross-Session Messaging 跨会话消息

在不同 Claude Code 会话之间发送文本消息，实现多会话协作。通过 `ListAgents` 和 `SendMessage` 工具完成。

### 核心概念

每个 Claude Code 会话在启动时注册到一个消息路由系统。你可以：
- **发现**当前机器上运行的其他 Claude Code 会话
- **发送**纯文本消息给其他会话
- **接收**来自其他会话的消息

### 基本用法

```
User: 列出当前运行的 Claude Code 会话
Claude: 使用 ListAgents 工具
→ 返回：session-abc (~/project-a), session-def (~/project-b)

User: 告诉 session-def 把 API 密钥移到 .env 文件
Claude: 使用 SendMessage 工具
→ "请把硬编码的 API 密钥移动到 .env 文件"
```

### @mention 语法

使用 `@` 前缀快速定位目标会话：

```
@session-abc 请审查我的 PR
@~/project-a 把构建结果告诉我
```

### 消息接收设置

在项目或用户设置中配置消息接收策略：

```json
// .claude/settings.json
{
  "crossSessionInbound": "accept",   // accept / hold / refuse
  "isolatePeerMachines": true,       // 隔离同网络的其他机器
  "dialogExpiry": "2h"               // 对话过期时间
}
```

| 设置 | 值 | 说明 |
|------|---|------|
| `crossSessionInbound` | `accept` | 直接接收所有消息 |
| | `hold` | 消息进入待处理队列，需手动确认 |
| | `refuse` | 拒绝所有跨会话消息 |
| `isolatePeerMachines` | `true` | 仅允许本机会话通信 |
| `dialogExpiry` | `2h` | 对话有效期，过期后自动结束 |

### 环境变量

| 变量 | 说明 |
|------|------|
| `CLAUDE_CODE_MESSAGING_SOCKET` | 自定义消息 socket 路径 |
| `CLAUDE_CODE_MESSAGING_TRUST_ORIGINS` | 信任的来源会话列表 |

### 安全规则

- **仅纯文本**：不能发送文件、图片或对话历史
- **不能冒充**：消息只能来自已注册的会话
- **透明可审计**：所有跨会话消息都有日志记录
- **可用平台**：macOS、Linux、WSL（原生 Windows 不支持）

---

## Agent Teams 多 Agent 团队（实验性）

将多个 Claude Code 会话组织成团队，由 Lead 代理分配任务、Teammates 并行执行，共享任务列表实现多会话协调。

### 核心概念

| 角色 | 职责 |
|------|------|
| **Lead** | 创建任务、分配任务、审批计划、监控进度 |
| **Teammate** | 领取任务、执行、报告结果 |

### 启用方式

```bash
# 设置环境变量启用
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# 或在设置中启用
{
  "features": {
    "experimentalAgentTeams": true
  }
}
```

### Teammate 模式

| 模式 | 说明 |
|------|------|
| **In-process** |  teammates 在同一终端进程内运行，共享上下文 |
| **Split-panes** |  teammates 在独立终端（tmux / iTerm2）运行，完全隔离 |

### 任务流

```
Lead 创建任务 → Teammate 领取 → Teammate 执行 → 报告结果 → Lead 审批/分配新任务
```

### Hooks 集成

| Hook 事件 | 触发时机 |
|----------|---------|
| `TaskCreated` | Lead 创建新任务时 |
| `TaskCompleted` | Teammate 完成任务时 |
| `TeammateIdle` | Teammate 空闲等待新任务时 |

### 约束

- **无嵌套团队**：一个会话中只能有一个团队
- **子代理可复用为队友**：`.claude/agents/` 中定义的子代理可直接注册为 teammate
- **Plan approval**：复杂任务需要 Lead 审批 Teammate 的执行方案

---

## Worktree 并行隔离

利用 Git worktree 让多个 Claude Code 会话**并行工作在同一个项目的不同分支**上，互不干扰。详见 [术语表：Worktree](./claude-code-glossary#worktree-工作树)。

### 为什么需要 Worktree

传统模式下，一个 Claude Code 会话占用一个工作目录。如果你想并行做两个 feature，需要手动切分支，频繁冲突。

Worktree 模式：每个会话有独立的目录和分支，真正的并行开发。

### 使用方式

```bash
# Claude Code 会自动管理 worktree
claude --worktree /tmp/claude-worktree-feature-a

# 也可以在设置中配置默认使用 worktree
```

### 隔离检查

Claude Code 会验证 4 个隔离条件：工作目录在仓库内、Git 索引干净、无未提交变更、指向正确的远程分支。

---

## 计划任务

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

## 无头模式（Headless）

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

---

## Git 集成

### 自动提交

```
> 为这次更改创建一个提交，使用 Conventional Commits 格式
```

Claude 会：暂存文件 → 生成提交消息 → 执行提交。

### PR 创建

```
> 创建一个 Pull Request，描述这次功能的改动和测试结果
```

### PR Auto-fix（Web 版）

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

## 界面变体

### 桌面 App

Claude Desktop 的"代码"标签页，在 GUI 中使用 Claude Code：

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

### VS Code 扩展

1. 打开扩展市场（`Cmd+Shift+X`），搜索 "Claude Code" 安装
2. 或点击：[直接安装](vscode:extension/anthropic.claude-code)（支持 Cursor）
3. 打开命令面板 `Cmd+Shift+P`，输入 "Claude Code" → 在新标签页中打开

**VS Code 专属能力**：
- 内联差异审查（编辑前可预览）
- `@` 提及文件（`Alt+K`）
- Plan 模式：先审查计划再允许执行
- 多对话标签页
- 限速提示横幅

### JetBrains 扩展

从 [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) 安装，重启 IDE。

- 快捷启动：`Cmd+Esc` / `Ctrl+Esc`
- 交互式差异查看
- 选择上下文共享

### Web 版

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

### 跨端无缝切换

Claude Code 的每个界面连接同一个底层引擎，CLAUDE.md、设置、MCP 服务器全平台共享。

#### 远程控制（Remote Control）

将 claude.ai 网页、Claude 移动 App 或 Slack 连接到本地 Claude Code 会话，实现远程交互。

**三种连接模式：**

| 模式 | 命令/操作 | 说明 |
|------|----------|------|
| **Server 模式** | `claude --remote-control` | 启动持续监听远程连接的服务器 |
| **Interactive 模式** | `/remote-control` 或 `/rc` | 临时接受一次远程连接 |
| **SSH 转发** | SSH 隧道 | 远程机器通过 SSH 暴露本地端口 |

**使用流程：**

```bash
# 本地启动远程控制
claude --remote-control
# → 生成一个会话 URL（如 https://claude.ai/remote/abc123）

# 在手机/浏览器打开 URL
# → 扫描 QR 码或直接点击链接

# 连接成功后，远程端可以发送消息和查看输出
```

**Trusted Devices（可信设备）：**

首次连接需要生物识别验证（指纹/面容 ID），后续 18 小时内免验证。超时或手动登出后需重新验证。

| 安全特性 | 说明 |
|---------|------|
| 生物识别步骤 | 首次连接必须通过指纹/面容 ID |
| 18 小时刷新 | 信任有效期 18 小时 |
| 手动登出 | `/remote-control logout` 立即撤销信任 |
| 设备列表 | 在 claude.ai 设置中查看已信任设备 |

**移动推送通知：**

远程连接断开或 Claude 需要确认时，手机收到推送通知。即使 App 在后台也能及时响应。

**Presence Heartbeats：**

会话 URL 自动生成描述性标题（如"Review auth PR"），方便在多设备间识别当前工作。

#### 会话迁移

| 功能 | 命令 | 用途 |
|------|------|------|
| `/teleport` | 将 Web/移动会话迁移回本地终端 | 云端任务需要本地文件时 |
| `/desktop` | 在桌面 App 中可视化 diff | 终端中做了大量改动，需要视觉审查 |
| Dispatch | 从手机发送任务到桌面 | 不在电脑旁时派发工作 |

#### Channels

将外部消息源（Telegram、Discord、iMessage）的事件推入 Claude Code 会话：

| 频道 | 类型 | 说明 |
|------|------|------|
| Telegram | MCP 插件 | 从 Telegram 对话触发 Claude 任务 |
| Discord | MCP 插件 | 从 Discord channel 接收指令 |
| iMessage | MCP 插件 (Bun) | 从 iMessage 对话触发任务 |

使用 `--channels` 标志启用，支持 permission relay（频道消息自动走权限流程）和 sender allowlist（限制可发送者）。

> Channels 处于 Research Preview 阶段，使用 `--dangerously-load-development-channels` 加载自定义频道。

#### Slack 集成

在 Slack workspace 中 @Claude 即可触发 Claude Code 任务。Claude 会读取 Slack 消息上下文，在后台执行任务并将结果回复到同一 thread。

#### 快速决策表

| 我想做什么 | 方案 |
|---------|------|
| 从手机/浏览器继续本地会话 | `claude --remote-control` + 打开会话 URL |
| 把终端会话移到桌面 App 可视化 diff | 运行 `/desktop` |
| 把 Web 会话拉入终端 | 运行 `/teleport` |
| 从手机派发任务到桌面 App | 使用 Dispatch 功能 |
| 在 Slack 中触发 Claude 任务 | @Claude 集成 |
| 从 Telegram/Discord/iMessage 推入事件 | `--channels` 标志 |

---

## 安全与权限

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

五层优先级（Managed / CLI 参数 / Local / Project / User）详见 [Cheatsheet · 配置作用域速查](./claude-code-cheatsheet#配置作用域速查)，配置项速查见 [Cheatsheet 全文](./claude-code-cheatsheet)。

### 沙盒模式

```
> /sandbox
```

在隔离环境中运行 Bash 命令，防止意外修改文件系统。

### Auto 权限模式

AI 分类器自动决策：常规编辑和读取自动通过，危险命令（如删除）被拦截。这是 Normal（询问一切）和 Auto-Accept（接受一切）之间的平衡点。

被拦截后通过 `/permissions → Recent` 可手动复审。

---

## 工具参考

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

## 最佳实践

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
Shift+Tab

> 设计一个 OAuth2 登录流程的实现方案，包括文件结构和接口设计

Shift+Tab  # 切换回 Auto 或 Normal
> 按照刚才的方案实现第一步
```

**代码审查**：
```bash
git diff | claude -p "对这些变更做安全和性能审查，JSON 格式输出问题列表"
```

**重构大型模块**：
```
> 分析 src/auth/ 目录的依赖关系
> 提出一个逐步重构方案，保持向后兼容
> 从最简单的模块开始，逐个重构
```

**写测试**：
```
> 为 src/utils/validation.ts 写单元测试
> 覆盖正常路径、边界条件和错误输入
> 运行测试确保全部通过
```

**调试复杂问题**：
```
> 这个请求返回 500 错误，帮我追踪完整的调用链
> 在每个关键节点添加日志
> 分析日志找出根本原因
```

### 效率技巧

1. **命名会话**：`/rename feature-name` - 便于用 `-r` 快速恢复
2. **快速查询**：`claude -p "quick question"` - 不进入交互模式
3. **先规划再执行**：复杂任务先用 Plan 模式，看清楚再执行
4. **用 Auto 模式**：比 Normal 省时间，比 Auto-Accept 更安全
5. **善用 /powerup**：每次大版本升级后运行，不错过新功能
6. **子代理并行**：大任务拆分给多个子代理并行处理
7. **Hook 自动化**：保存后自动格式化、提交前自动 lint
8. **CLAUDE.md 模板化**：项目模板中预置 CLAUDE.md，新成员立即可用
9. **斜杠命令速记**：`/` 然后输入前几个字母快速匹配命令
10. **对话导出**：`/export` 将复杂问题的解决过程保存为文档
11. **定期修剪 CLAUDE.md**：随着项目演进，删除过时或不再相关的上下文，避免上下文窗口被无效内容膨胀
12. **验证优先**：让 Claude 先写测试再实现，或完成后主动审查自己的代码（见下方"验证模式"）

### 让 Claude 自我验证

> **核心原则（官方文档强调）**：给 Claude 一个能"自我验证"的方式，是提升输出质量 2-3 倍的最高杠杆操作。没有验证闭环，你就是唯一的反馈信号——每个错误都要等你去发现。

Claude 最有效的使用模式不是"让它完成"，而是"让它完成并验证"：

**关键思维转变**：
- ❌ "修复这个 Bug" → Claude 做完就停，你还需要手动验证
- ✅ "修复这个 Bug，运行 `npm test` 确认修复有效，如果失败继续修复" → Claude 自我迭代直到通过

**验证深度选择**：

| 深度 | 方法 | 适用场景 |
|------|------|---------|
| **轻量** | 一个 prompt 中要求 Claude 运行检查并迭代 | 单次任务 |
| **中等** | 设置 `/goal` 条件，Claude 持续工作直到条件成立 | 跨多轮的任务 |
| **强约束** | Stop hook 运行检查脚本，阻止结束直到通过 | 无人值守自动化 |
| **独立审查** | 子代理用新鲜模型审查结果，尝试反驳 | 正确性要求高的场景 |

**测试驱动**：
```
> 先为这个功能写测试用例，然后实现功能，确保测试全部通过
```

**对抗性审查**：
```
> 你刚才的实现可能存在什么问题？扮演安全工程师审查一遍
```

**模式对比**：

| 模式 | 流程 | 适用场景 |
|------|------|---------|
| **Writer → Reviewer** | Claude 先写代码，再让另一个 Claude 会话审查 | PR 审查、安全敏感代码 |
| **Tests → Iterate → Pass** | 先写测试 → 实现 → 运行 → 修复失败 → 重复 | 新功能开发 |
| **Plan → Implement → Verify** | 先出方案 → 实现 → 自检 | 中等复杂度任务 |

> **核心原则**：不要接受 Claude 的第一次输出就结束。让它展示验证过程，或者 yourself 运行测试来确认。

### 提示词技巧

| 技巧 | 示例 | 效果 |
|------|------|------|
| **指定角色** | "你是一位资深安全工程师，请审查..." | 提升专业深度 |
| **分步引导** | "第一步：分析现状。第二步：提出方案..." | 避免跳跃式执行 |
| **提供上下文** | "这是项目的 tech stack: ..." | 减少猜测 |
| **要求输出格式** | "以 Markdown 表格形式列出..." | 结构化输出 |
| **设定期望** | "先给我 3 个方案，然后推荐最优..." | 获得选项而非单一答案 |
| **追问深入** | "为什么选方案 A？有什么风险？" | 获取深层推理 |

### 社区技巧精选

以下技巧来自社区深度用户的实战总结，覆盖官方文档未充分强调的用法：

**Settings 调优**（源自社区 127+ settings 整理）：
- 用 `"defaultMode": "auto"` 替代 Normal 模式，减少 80% 的确认弹窗
- 对高频安全命令单独 `allow`（如 `Bash(git:*)`、`Bash(npm run *)`），对危险命令精确 `deny`（如 `Bash(rm -rf:*)`）
- 项目级 `settings.json` 放团队共享规则，本地 `settings.local.json` 放个人调试用规则
- 企业用户用 Managed 设置强制安全策略，防止本地覆盖

**提示词模式**（源自 40+ tips 社区整理）：
- **渐进式细化**：先问"有哪些方法"，再问"推荐哪种"，最后"实现它" — 避免 Claude 跳跃到不理想的方案
- **反面提示**："不要用正则，用字符串方法" — 明确排除不想要的方案比描述想要的方案更有效
- **角色叠加**："你是资深安全工程师 + 前端性能专家" — 多角色组合覆盖交叉领域
- **输出约束**："只列出 3 个，不要更多" — 控制输出长度，减少阅读成本
- **让 Claude 提问**："在我给出更多细节之前，先告诉我你还想知道什么" — 先澄清再执行

**Hooks Mastery**（源自 hooks 深度实践）：
- **保存即格式化**：`PostToolUse[Edit|Write]` → `prettier --write "$CLAUDE_TOOL_INPUT_FILE_PATH"`
- **提交前校验**：`PreToolUse[Bash(git commit:*)]` → 运行 `npm run lint && npm test`，失败则阻止提交
- **自定义 Hook 脚本**：将 Hook 脚本放在 `.claude/hooks/` 目录，使用 shebang `#!/bin/bash` 确保可执行
- **Hook 调试**：在 Hook 脚本开头加 `echo "HOOK TRIGGERED: $CLAUDE_TOOL_NAME" >> /tmp/hook-debug.log`

> **更多实战工作流示例**（含完整代码和场景分解）：见 [实战工作流 cookbook](./claude-code-cookbook)

> **社区资源**：
> - [Claude Directory](https://claudedirectory.org) — 社区维护的 Skills/Hooks/CLAUDE.md 模板库（100+ CLAUDE.md 模板、37+ Skills、22+ Hooks），快速上手最佳参考
> - [Reddit r/ClaudeCode](https://reddit.com/r/ClaudeCode) — 日常技巧和问题讨论
> - [GitHub Discussions](https://github.com/anthropics/claude-code/discussions) — 官方社区
> - [Twitter/X: #ClaudeCode](https://x.com/search?q=ClaudeCode) — 实时技巧分享
>
> 备注：`vercel-labs/claude-code-setup` 等第三方"一键安装"仓库不在官方背书范围内，其仓库 URL 在 2026-08-17 已无法访问，故未列入本资源列表；如需官方示例与最佳实践，请直接参考 [Claude Code 官方仓库](https://github.com/anthropics/claude-code)。

---

## 故障排除

### 诊断工具

Claude Code 内置了完整的诊断工具链，遇到问题时从以下命令开始：

| 命令 | 用途 | 何时使用 |
|------|------|---------|
| `/context` | 查看上下文窗口使用情况 | 怀疑上下文不够、回答质量下降时 |
| `/doctor` | 全面配置诊断（安装、权限、hooks、MCP） | 安装/配置问题排查 |
| `/hooks` | 检查 hooks 配置和最近执行记录 | hooks 不触发或行为异常时 |
| `/mcp` | 查看 MCP 服务器状态和日志 | MCP 服务器连接失败时 |
| `--safe-mode` | 以最小配置启动（禁用插件/hooks/MCP） | 隔离是否是配置/插件导致的问题 |
| `CLAUDE_CONFIG_DIR` | 使用指定目录作为配置根 | 排除当前配置文件的干扰 |

**快速诊断流程**：
```
1. /doctor          → 检查整体配置健康度
2. /context         → 确认上下文窗口是否爆满
3. /hooks           → 确认 hooks 是否正常注册和触发
4. /mcp             → 确认 MCP 服务器是否在线
5. claude --safe-mode  → 如果以上都异常，用安全模式排除法定位
```

### 常见问题

**Claude 无响应或卡住**：
- `Ctrl+C` 取消当前操作
- 运行 `claude doctor` 检查安装
- 重启：退出后重新启动
- 检查 API 配额是否用完

**MCP 服务器失败**：
- `/mcp` 查看服务器状态
- 检查 URL/地址和认证配置
- 查看服务器日志
- 确认服务器进程仍在运行

**权限被拦截**：
- `/permissions → Recent` 手动复审
- 在 `.claude/settings.json` 中添加 `allow` 规则

**上下文窗口不足**：
- `/clear` 清除对话历史
- `/context` 查看上下文使用情况
- 拆分复杂任务为多个子任务
- 使用 CLAUDE.md 减少重复上下文

**子代理未触发**：
- 检查 `description` 是否足够具体
- 确认 `.claude/agents/` 目录存在且文件格式正确
- 子代理不能嵌套，确认没有子代理调用子代理

**Hook 不执行**：
- 确认脚本有可执行权限：`chmod +x .claude/hooks/*.sh`
- 检查 `matcher` 是否正确匹配工具名
- 查看 hook 输出日志

**安装/更新问题**：
```bash
# macOS/Linux - 手动重装
curl -fsSL https://claude.ai/install.sh | bash

# 检查版本
claude --version

# Homebrew 用户
brew upgrade claude-code
```

**Windows 特定问题**：
- 需要先安装 [Git for Windows](https://git-scm.com/downloads/win)
- 确保 Git Bash 在 PATH 中
- WSL 中运行可获得更好的体验

**Web 版问题**：
- 会话超时：Web 版有 inactivity timeout，长时间不操作会断开
- 文件访问受限：Web 版不能访问本地文件系统
- PR Auto-fix 需要授权 GitHub 访问

### 场景化诊断

以下是最常见的实际排错场景，按发生频率排序：

#### Context 窗口爆满 — 回答质量突然下降

**征兆**：Claude 开始"遗忘"早期指令、重复已修复的错误、输出质量明显下降。

**排查步骤**：
1. 运行 `/context` — 确认使用率是否超过 80%
2. 运行 `/clear` — 不相关任务之间必须重置 context
3. 如果任务确实需要长上下文，运行 `/compact <指令>` 压缩对话（如 `/compact 保留所有已修改的文件列表和测试命令`）
4. 在 CLAUDE.md 中添加压缩偏好：`When compacting, always preserve the full list of modified files and any test commands`

**根本原因**：Context window 填满后 LLM 性能下降。单次调试会话可能消耗数万 token。

> **预防**：频繁 `/clear`，在任务边界处主动重置。对同一问题改正两次以上后必须 `/clear` 重新开始——context 已被失败方法污染。Pro/Max 计划用量每 5 小时重置一次，`/usage` 可随时查看剩余额度。

#### MCP 服务器连接失败

**征兆**：`/mcp` 显示服务器 disconnected 或 timeout，Claude 说"无法连接到 XX 服务"。

**排查步骤**：
1. `/mcp` — 查看服务器状态和最后错误信息
2. 检查 `claude mcp get <name>` 返回的配置 — URL、端口、认证是否正确
3. 如果是远程 MCP（HTTP/SSE）：确认服务器 URL 可访问（`curl <url>`）
4. 如果是本地 MCP（stdio）：确认服务器进程仍在运行
5. 查看服务器日志获取详细错误

**常见原因**：
- 远程 MCP：服务器地址变更、OAuth token 过期、防火墙拦截
- 本地 MCP：进程崩溃、依赖未安装、端口冲突

#### Hook 定义了但不执行

**征兆**：编辑文件后没有自动格式化、提交前没有 lint 校验——Hook 像是被忽略了。

**排查步骤**：
1. `/hooks` — 检查 Hook 是否在配置中正确注册
2. 确认脚本有可执行权限：`chmod +x .claude/hooks/*.sh`
3. 检查 `matcher` 字段 — 工具名必须精确匹配（`Edit|Write` 而非 `edit`）
4. 在 Hook 脚本开头加调试输出：`echo "HOOK: $CLAUDE_TOOL_NAME" >> /tmp/hook-debug.log`
5. 确认 `$CLAUDE_TOOL_INPUT_FILE_PATH` 等环境变量在当前 Hook 类型中可用（`SessionStart` 没有工具输入路径）

**常见原因**：matcher 大小写错误、脚本无执行权限、Hook 类型和所需环境变量不匹配。

#### 权限模式导致效率低下

**征兆**：每次操作都要手动确认、或 dangerous-skip-permissions 导致误删文件。

**排查步骤**：
1. `/permissions` — 查看当前权限规则和最近确认记录
2. Normal 模式太繁琐？切换到 Auto 模式（`/permission-mode auto`）— AI 分类器自动决策
3. 对已知安全的命令添加 `allow` 规则（如 `Bash(git:*)`、`Bash(npm run *)`）
4. 对危险命令精确 `deny`（如 `Bash(rm -rf:*)`、`Read(.env*)`）
5. 如果配置 messed up，用 `claude --safe-mode` 以最小配置启动排查

**常见原因**：权限规则粒度过粗（allow 太多或 deny 太少）、没有利用工具前缀匹配。

#### 认证反复失败 — 登录后仍提示未授权

**征兆**：完成 OAuth 登录后 Claude Code 仍提示 "Not authenticated"，或每次启动都需要重新登录。

**排查步骤**：
1. 运行 `/logout` 彻底退出登录
2. 关闭 Claude Code，重新启动 `claude` 并完成认证
3. 如果浏览器没有自动打开，按 `c` 复制 OAuth URL 手动粘贴到浏览器
4. 如果问题持续，删除缓存的认证文件：`rm -rf ~/.config/claude-code/auth.json`，然后重启

**常见原因**：缓存的认证令牌已损坏或过期，简单的重登无法清除残留状态。

#### API key 与订阅冲突 — 被意外扣费

**征兆**：明明订阅了 Pro/Max 计划，但 Claude Code 提示 API 用量耗尽或被扣费。

**排查步骤**：
1. 检查是否有 `ANTHROPIC_API_KEY` 环境变量：`echo $ANTHROPIC_API_KEY`
2. 如果有值，Claude Code 会使用 API 密钥而非订阅额度：`unset ANTHROPIC_API_KEY`
3. 永久修复：编辑 `~/.zshrc` 或 `~/.bashrc`，删除设置该变量的行
4. 用 `/usage` 确认当前额度显示恢复正常

**根本原因**：环境变量 `ANTHROPIC_API_KEY` 的优先级高于订阅认证。设置后所有请求走按量计费。

#### 会话恢复失败

**征兆**：`claude -c` 提示 "No conversation found"，或 `/resume` 列表为空。

**排查步骤**：
1. 确认 `~/.claude/` 目录存在且有写权限
2. 检查磁盘空间：会话持久化需要写入磁盘
3. 如果用 `--no-session-persistence` 启动，对话不会被保存
4. 检查 CLAUDE_CODE_SESSION_DIR 环境变量是否指向了有效路径
5. 确认没有清理工具（如 `~/Library/Caches` 清理脚本）误删会话数据

**常见原因**：无头模式 `-p` 默认不保存会话（除非显式加 `--continue`）、清理脚本误删。

### 获取帮助

- 运行 `/help` 查看所有可用命令
- `/usage` — 查看当前 API 用量和额度剩余
- `/bug` — 在 Claude Code 内直接上报 bug，自动附加上 `/doctor` 的诊断输出
- 查看 [故障排除官方页面](https://code.claude.com/docs/zh-CN/troubleshooting)
- [GitHub Discussions](https://github.com/anthropics/claude-code/discussions) 社区求助
- [What's New](https://code.claude.com/docs/en/whats-new/index) 查看最新功能

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

## 如何持续追踪最新变化

Claude Code 更新频率极高（几乎每周都有新版本），保持追踪的方式：

1. **[What's New 页面](https://code.claude.com/docs/en/whats-new/index)**：每周更新日志，涵盖新功能、改进和修复。从 v2.1.83（2026 年 3 月）开始持续更新，每周一个版本。
2. **`/powerup` 命令**：大版本升级后运行，自动发现新功能和快捷指令。
3. **`claude --version`**：随时检查当前版本号。
4. **[GitHub Releases](https://github.com/anthropics/claude-code/releases)**：完整版本发布说明和迁移指南。
5. **社区动态**：关注 [GitHub Discussions](https://github.com/anthropics/claude-code/discussions) 了解社区讨论和常见问题。

> **提示**：将 What's New 页面加入 RSS 阅读器，或在日历中设置每周提醒查看。

### 本文涉及的版本变更点

正文不再把版本号写进小标题（避免每次迭代都要逐节排查更新），改为集中记录在这里：

| 功能 | 引入版本 | 说明 |
|------|---------|------|
| MCP 结果大小控制 | v2.1.91+ | 见 [MCP 集成](#mcp-结果大小控制) |
| Auto 权限模式 | v2.1.83+ | 见 [Auto 权限模式](#auto-权限模式) |
| Managed 设置无效条目自动清理 | v2.1.169+ | 详见[Cheatsheet · 配置作用域速查](./claude-code-cheatsheet#配置作用域速查) |
| 项目设置中 `auto` 模式被忽略 | v2.1.142+ | 详见[Cheatsheet · 配置作用域速查](./claude-code-cheatsheet#配置作用域速查) |
| 插件安装安全校验 | v2.1.195+ | 见[Cheatsheet · 插件配置](./claude-code-cheatsheet#插件配置) |

---

## 进阶阅读

- **[术语表 Glossary](./claude-code-glossary)** — MCP / Hooks / Skills / Sub-agents 等 14 个核心概念的统一解释
- **[Cheatsheet 速查表](./claude-code-cheatsheet)** — Settings Scope 五层优先级、权限规则语法、Hook/Subagent/插件配置、Sandbox 设置、决策表、数据源
- **[实战工作流 cookbook](./claude-code-cookbook)** — 9 大日常开发场景的提示模式、Writer/Reviewer 并行模式、CLAUDE.md 维护原则、扩展点选型决策

## 资源

- [官方文档](https://code.claude.com/docs/zh-CN/overview)
- [What's New（每周更新日志）](https://code.claude.com/docs/en/whats-new/index)
- [CLI 参考](https://code.claude.com/docs/zh-CN/cli-reference)
- [常见工作流](https://code.claude.com/docs/zh-CN/common-workflows)
- [最佳实践](https://code.claude.com/docs/zh-CN/best-practices)
- [Settings 参考](https://code.claude.com/docs/zh-CN/settings)
- [Hooks 开发指南](https://code.claude.com/docs/zh-CN/hooks-guide)
- [Sub-agents 指南](https://code.claude.com/docs/zh-CN/sub-agents)
- [Plugins 参考](https://code.claude.com/docs/zh-CN/plugins-reference)
- [故障排除](https://code.claude.com/docs/zh-CN/troubleshooting)
