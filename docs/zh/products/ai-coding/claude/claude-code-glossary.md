# Claude Code 术语表 / Glossary

> 这是一份**解释型**文档——回答"这个概念是什么、为什么这样设计、什么时候该用"。和 [Claude Code Cheatsheet](./claude-code-cheatsheet) 互补：cheatsheet 回答"怎么配置、参数是什么、怎么选"，本文档回答"这是什么、为什么需要、它怎么和其他概念打交道"。
>
> **所有跨章节共享的术语**都在这里统一定义，主教程 [Claude Code](./claude-code) 和 [实战 Cookbook](./claude-code-cookbook) 引用这里，不重复解释，避免口径不一致。

## 概念关系图

```
                    ┌─────────────┐
                    │   MCP 协议   │  ← 最底层开放协议
                    │ (开放标准)   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌───┴───┐  ┌────┴────┐
         │ Hooks   │  │Skills │  │Connectors│  ← 基于 MCP 的不同封装
         │ (钩子)  │  │(技能) │  │(连接器)  │
         └────┬────┘  └───┬───┘  └──────────┘
              │           │
              └─────┬─────┘
                    │
              ┌─────┴─────┐
              │  Plugins  │  ← 打包以上能力为可安装单元
              │  (插件)   │
              └───────────┘

外部协作           ┌─────────────┐  ┌─────────────┐
                 │ Sub-agents  │  │  Memory     │
                 │ (子代理)    │  │ (记忆)      │
                 └─────────────┘  └─────────────┘
```

**核心逻辑**：MCP 是最底层的开放协议，定义了 Claude 如何与外部工具通信。Hooks、Skills、Connectors 都是基于 MCP 的不同封装层次。Plugins 把 Skills + Agents + Hooks + MCP 打包成一个可安装的单元。Sub-agents 和 Memory 平行于上述主线，是关于"多代理协作"和"跨会话记忆"的独立维度。

---

## MCP（Model Context Protocol）

**是什么**：一个开放标准协议，定义 AI 应用（如 Claude）如何与外部工具、数据库和 API 安全通信。可以理解为 AI 世界的"USB 接口"——遵循协议的工具有一个就能插一个。

**为什么重要**：没有 MCP 之前，每个 AI 工具都需要自己实现一套连接外部服务的逻辑，连接 GitHub、数据库、Slack 都要单独写。有了 MCP 后：
- **工具开发者**只需实现一次 MCP 服务器，所有支持 MCP 的 AI 都能使用
- **用户**只需配置一次连接，就可以在 Claude Code、Claude.ai、Claude Desktop 之间共享
- **生态**：GitHub、数据库、Slack、Jira 等 1000+ 工具已有 MCP 服务器实现

**在 Claude 生态中的角色**：

| 层面 | 基于 MCP 的能力 | 说明 |
|------|---------------|------|
| Claude Code CLI | `claude mcp add` 添加 MCP 服务器 | 本地进程或 HTTP 服务器 |
| Claude.ai / Desktop | Connectors 连接器 | 云端 MCP 服务器，一键 OAuth 授权 |
| Plugins | `.mcp.json` 配置 | 插件内嵌的 MCP 服务器定义 |
| Custom Tools | 自定义 MCP 服务器 | 接入内网或自建工具 |

**两种传输方式**：

| 方式 | 适用场景 | 配置示例 |
|------|---------|---------|
| **stdio** | 本地进程（数据库、命令行工具） | `claude mcp add --transport stdio db -- npx -y @bytebase/dbhub` |
| **HTTP/SSE** | 远程服务（云端 API、内网服务） | `claude mcp add --transport http github https://api.github.com/mcp/` |

**官方文档**：
- [MCP 开发指南](https://code.claude.com/docs/zh-CN/build-with-claude/mcp)
- [MCP 注册表](https://api.anthropic.com/mcp-registry)
- [Claude Code MCP 参考](https://code.claude.com/docs/zh-CN/cli-reference#mcp)

---

## Skills（技能）

**是什么**：包含指令、脚本和资源的文件夹，Claude 动态加载来提升专项任务的稳定性。简单说：技能让 Claude 在特定任务上更专业、更稳定。

**两种 Skills**：

| 类型 | 位置 | 说明 |
|------|------|------|
| **Project Skills** | `.claude/skills/<name>/SKILL.md` | 项目共享，提交到 Git |
| **User Skills** | `~/.claude/skills/<name>/SKILL.md` | 个人全局，所有项目生效 |

**核心机制**：
1. Claude 在对话中分析当前任务
2. 匹配 Skills 目录中的 `description` 字段
3. 命中后自动加载对应的 `SKILL.md` 指令
4. 也可以手动用 `/skill-name` 调用

**与 Commands 的区别**：

| 维度 | Commands（命令） | Skills（技能） |
|------|---------------|--------------|
| 触发方式 | 手动 `/command` | 自动识别 + 手动 |
| 结构 | 单个 `.md` 文件 | 带资源的目录（`SKILL.md` + 脚本） |
| 复杂度 | 简单提示词 | 多文件、多步骤工作流 |

**SKILL.md 示例**：

```markdown
---
name: code-reviewer
description: 当用户要求代码审查、PR 审查、或检查代码质量时使用
tools: Read, Grep, Glob
---

你是一位资深代码审查专家。请检查以下方面：
1. 安全漏洞（OWASP Top 10）
2. 性能问题
3. 代码风格一致性
4. 测试覆盖率
```

**官方文档**：
- [Skills 开发指南](https://code.claude.com/docs/zh-CN/skills)
- [Claude.ai Skills](https://support.claude.com/zh-CN/articles/12512198)

---

## Hooks（钩子）

**是什么**：在 Claude Code 工具调用前后**自动触发**的脚本，用于实现自动化工作流。比如：保存文件后自动格式化、提交前跑 lint、会话开始时加载环境变量。

**为什么需要 Hook**：Skills 是 Claude 根据场景**判断**要不要加载（语义匹配），Hooks 是在特定事件**必定**触发（确定性，比如"每次保存都跑格式"），两者互补。

**常见触发事件**：

| 事件 | 触发时机 | 典型用途 |
|------|---------|---------|
| `PreToolUse` | 工具调用前 | 拦截危险操作、修改参数 |
| `PostToolUse` | 工具调用后 | 自动格式化、lint、测试 |
| `SessionStart` | 会话开始 | 加载环境变量、初始化 |
| `SessionEnd` | 会话结束 | 清理、报告 |
| `UserPromptSubmit` | 用户提交消息 | 日志、验证 |
| `ConfigChange` | 配置文件变更 | 重载自定义配置 |

> 完整事件清单和 `if` 条件语法，见 [Hooks 参考](https://code.claude.com/docs/zh-CN/hooks-reference) 和 [cheatsheet · Hook 配置](./claude-code-cheatsheet#hook-配置)。

**三种 Hook 类型**：

| 类型 | 说明 | 适用场景 |
|------|------|---------|
| `command` | 执行 shell 命令 | 格式化、lint、测试 |
| `prompt` | 注入额外的 prompt 给 Claude | 动态注入上下文 |
| `mcp_tool` | 调用 MCP 服务器 | 复杂外部集成 |

**官方文档**：
- [Hooks 开发指南](https://code.claude.com/docs/zh-CN/hooks-guide)
- [Hooks 参考](https://code.claude.com/docs/zh-CN/hooks-reference)

---

## Plugins（插件）

**是什么**：扩展 Claude Code 能力的**独立单元**，可以打包 Skills、Agents、Hooks、MCP 服务器等功能，实现跨项目复用和团队共享。一个插件本质上是一个**目录**，里面包含若干组件。

**插件与组件的关系**：

```
Plugin（插件）
├── skills/        ← Skills 技能
├── agents/        ← Sub-agents 子代理
├── hooks/         ← Hooks 钩子
├── .mcp.json      ← MCP 服务器
├── .lsp.json      ← LSP 服务器
└── settings.json  ← 默认配置
```

**插件 vs 技能**：插件是"打包好的能力包"，技能是其中的一个组件。你可以只用技能（直接复制到 `.claude/skills/`），也可以把多个技能打包成插件发布（npm / Git / Marketplace）。

**两种安装范围**：

| 范围 | 存储位置 | 说明 |
|------|---------|------|
| `--scope user` | `~/.claude/plugins/cache/` | 用户级，所有项目生效（默认） |
| `--scope project` | `.claude/` | 仅当前项目生效（提交到 Git 可团队共享） |

**插件来源**：

| 来源 | 说明 |
|------|------|
| **npm** | `claude plugin install @company/ai-kit` |
| **Git** | 从 GitHub/GitLab 仓库安装 |
| **本地目录** | `claude --plugin-dir ./my-plugin` |

**官方文档**：
- [Plugins 参考](https://code.claude.com/docs/zh-CN/plugins-reference)
- [Marketplace](https://code.claude.com/docs/zh-CN/plugin-marketplaces)
- [Claude Code Plugins](https://code.claude.com/docs/zh-CN/plugins)

---

## Sub-agents（子代理）

**是什么**：拥有**独立人格、权限和工具集**的 AI 助手。主代理可以生成多个子代理并行处理不同任务，然后合并结果。

**为什么需要**：复杂任务里，一个 Agent 处理会"上下文污染"——长对话里既有探索、又有实现、又有审查，思路互相干扰。Sub-agents 给每个子任务一个**独立干净的上下文窗口**。

**两种子代理**：

| 类型 | 说明 | 配置位置 |
|------|------|---------|
| **内置** | Explore（代码库探索）、Plan（规划调研） | 系统内置，无需配置 |
| **自定义** | 你定义的专项代理 | `.claude/agents/<name>.md` |

**自定义子代理示例**：

```markdown
<!-- .claude/agents/security-reviewer.md -->
---
name: security-reviewer
description: 当需要安全审查、检查权限漏洞或 OWASP 合规时调用
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---

你是一位专注于 Web 安全的代码审查专家，擅长识别 OWASP Top 10 漏洞。
```

**适用场景**：
- 大型任务拆分：让多个代理并行审查不同模块
- 专业化分工：安全审查、性能分析、测试生成各用一个代理
- 模型选择：简单任务用 Sonnet，复杂任务用 Opus
- **上下文隔离**：避免长任务污染主对话上下文

**关键约束**：
- **无子代理嵌套**：子代理不能再委托子代理
- **上下文隔离**：每个子代理有独立的上下文窗口，不会看到主代理或其他子代理的对话
- **并行执行**：多个子代理可同时运行，独立消耗各自模型的配额

**官方文档**：[Sub-agents 指南](https://code.claude.com/docs/zh-CN/sub-agents)

---

## Memory（记忆）

**是什么**：让 Claude 能**跨对话记住**你的偏好、背景信息和工作习惯，不再每次都要重新介绍自己。

**两种互补记忆**：

| 机制 | 谁写 | 目的 | 存储位置 |
|------|------|------|---------|
| **CLAUDE.md** | 你手动编写 | 项目规范、技术栈、编码约定 | `.claude/CLAUDE.md`（提交到 Git） |
| **自动记忆（Auto Memory）** | Claude 自动写入 | 构建命令、调试发现、架构决策 | `~/.claude/projects/<project>/memory/` |

**为什么需要两套**：CLAUDE.md 解决"你告诉 Claude"的稳定规则（团队/项目规范）；自动记忆解决"Claude 自己学到"的动态知识（"昨天调试发现这个 API 在测试环境返回 500"）。前者是规范，后者是个人笔记。

**CLAUDE.md 加载层级**（具体规则与作用域全表见 [cheatsheet · Settings Scope](./claude-code-cheatsheet#配置作用域速查)）：

```
Managed policy（企业/系统，最高优先级）
    └── ~/.claude/CLAUDE.md（用户全局）
        └── .claude/CLAUDE.md（项目共享，提交到 Git）
            └── .claude/CLAUDE.local.md（个人本地覆盖，不提交）
```

**自动记忆的索引机制**：
- **索引文件**：`MEMORY.md`——启动时自动加载前 200 行（约 25KB）
- **每条记忆**：独立 `.md` 文件，包含 frontmatter（名称、描述、类型、时间戳）
- **记忆类型**：用户偏好（user）、反馈（feedback）、项目知识（project）、外部参考（reference）
- **自动关联**：记忆间通过 `[[记忆名称]]` 互相链接

**官方文档**：[Memory 系统](https://code.claude.com/docs/zh-CN/memory)

---

## Dynamic Workflows（动态工作流）

**是什么**：通过 JavaScript 脚本编排大规模子代理工作流的能力。Claude 负责编写脚本，运行时负责执行——将多 Agent 协作从"手动调度"升级为"脚本化流水线"。

**为什么需要**：Sub-agents 适合"主代理手动调起几个子代理"的中等场景；如果要做**大规模并行**（如同时审查 100 个 PR）或**可复用流水线**（构建→测试→部署），用脚本编排比逐个手动调度更可维护。

**核心 API**：

| API | 用途 | 模式 |
|-----|------|------|
| `agent()` | 并行启动多个子代理 | Fan-out |
| `pipeline()` | 串行执行多步流水线 | Sequential |

**内置工作流**：

| 工作流 | 触发 | 用途 |
|--------|------|------|
| `/deep-research` | 斜杠命令 | 多轮深度调研，自动生成报告 |
| `ultracode` | 关键词 | 自动代码审查 + 修复流程 |

**使用限制**：
- Beta 阶段，API 可能变化
- 不支持子代理嵌套
- 受 `maxThinkingTokens` 限制
- 大小写敏感：`Agent()`、`AGENT()` 无效

**官方文档**：[Dynamic Workflows](https://code.claude.com/docs/en/workflows)

---

## Cross-Session Messaging（跨会话消息）

**是什么**：在不同 Claude Code 会话之间发送纯文本消息，实现多会话协作。**纯文本**意味着不能传文件、不能传完整对话历史——这是内置的安全边界。

**为什么需要**：多会话并行工作时（一个做后端、一个做前端），会话之间需要同步"我做完了，可以接着做了"这类信号，而不是要用户手动复制。

**核心工具**：

| 工具 | 用途 |
|------|------|
| `ListAgents` | 列出当前可用的 Claude Code 会话 |
| `SendMessage` | 向指定会话发送文本消息 |

**@mention 语法**：
- `@session-abc` — 按会话 ID 提及
- `@~/project-name` — 按项目路径提及

**接收设置**（完整配置参数见 [cheatsheet · 权限配置](./claude-code-cheatsheet#权限配置)）：

| 设置 | 可选值 | 说明 |
|------|--------|------|
| `crossSessionInbound` | accept / hold / refuse | 消息接收策略 |
| `isolatePeerMachines` | true / false | 是否隔离同网络其他机器 |
| `dialogExpiry` | 时间字符串 | 对话过期时间 |

**安全规则**：
- 仅纯文本，不能发送文件或对话历史
- 消息只能来自已注册的会话
- 所有跨会话消息可审计

**官方文档**：[Cross-Session Messaging](https://code.claude.com/docs/en/cross-session-messaging)

---

## Agent Teams（多 Agent 团队，实验性）

**是什么**：实验性功能，将多个 Claude Code 会话组织成团队，由 Lead 分配任务，Teammates 并行执行，共享任务列表。

**和 Sub-agents 的区别**：

| 维度 | Sub-agents | Agent Teams |
|------|------------|------------|
| 隔离级别 | 同终端进程内 | 独立会话（可 split-pane） |
| 上下文 | 共享主代理上下文 | **完全隔离**的独立上下文 |
| 协调方式 | 主代理手动调起 | 共享任务列表 + Lead 分配 |
| 适用规模 | 几个并行子任务 | 多角色分工的复杂协作 |

**角色**：

| 角色 | 职责 |
|------|------|
| **Lead** | 创建任务、分配任务、审批方案、监控进度 |
| **Teammate** | 领取任务、执行、报告结果 |

**队友模式**：

| 模式 | 说明 |
|------|------|
| **In-process** | 同一终端进程内运行，共享上下文 |
| **Split-panes** | 独立终端（tmux/iTerm2），完全隔离 |

**约束**：
- 无嵌套团队（一个会话一个团队）
- 子代理可注册为 teammate
- 使用 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 启用

**官方文档**：[Agent Teams](https://code.claude.com/docs/en/agent-teams)

---

## Remote Control（远程控制）

**是什么**：将 claude.ai 网页、Claude 移动 App 或 Slack 连接到本地 Claude Code 会话，实现远程交互。

**为什么需要**：本地跑着一个长任务（编译、测试、部署），想从手机上看一眼进度、或者临时加个新指令。Remote Control 把这种"远程 append"做成了官方支持的能力。

**三种连接模式**：

| 模式 | 标志/命令 | 说明 |
|------|----------|------|
| **Server** | `claude --remote-control` | 持续监听远程连接 |
| **Interactive** | `/remote-control` 或 `/rc` | 临时接受一次连接 |
| **SSH 转发** | SSH 隧道 | 远程机器通过 SSH 暴露本地端口 |

**安全机制 — Trusted Devices**：

- 首次连接需生物识别验证（指纹/面容 ID）
- 信任有效期 18 小时
- `/remote-control logout` 立即撤销
- 移动端推送通知 + Presence Heartbeats（心跳检测连接活性）

**官方文档**：[Remote Control](https://code.claude.com/docs/en/remote-control)

---

## Channels（频道）

**是什么**：将外部消息源（Telegram、Discord、iMessage）的事件推入 Claude Code 会话，实现非 Claude 界面的任务触发。

**为什么需要**：Remote Control 是"从 Claude 界面反向控制本地会话"，Channels 相反——"从外部消息源（你已经在用的 Telegram/Discord/iMessage）反向触发 Claude 任务"。后者更适合"不是 Claude 用户但需要 Claude 帮忙"的协作场景。

**已支持频道**：

| 频道 | 类型 | 说明 |
|------|------|------|
| Telegram | MCP 插件 | 从 Telegram 对话触发任务 |
| Discord | MCP 插件 | 从 Discord channel 接收指令 |
| iMessage | MCP 插件 (Bun) | 从 iMessage 对话触发任务 |

**关键特性**：
- `--channels` 标志启用
- Permission relay：频道消息自动走权限流程
- Sender allowlist：限制可发送者
- 状态：Research Preview 阶段

**官方文档**：[Channels](https://code.claude.com/docs/en/channels)

---

## Worktree（工作树）

**是什么**：利用 Git 的 `git worktree` 功能，让多个 Claude Code 会话**并行工作在同一个项目的不同分支**上，互不干扰。

**为什么需要**：传统模式下，一个 Claude Code 会话占用一个工作目录。要并行做两个 feature，需要手动切分支，频繁冲突。Worktree 让每个会话有独立的目录和分支，真正并行。

**核心价值**：
- **并行开发**：一个会话做 feature A，另一个做 feature B
- **会话隔离**：每个会话有独立的工作目录和 Git 状态
- **自动管理**：Claude Code 会自动创建和清理 worktree

**CLI 标志**：

```bash
claude --worktree /tmp/claude-worktree-<name>
```

**隔离检查**（Claude Code 启动会话前会自动验证 4 个条件）：
1. 工作目录是否在原始仓库内
2. Git 索引是否干净
3. 是否有未提交的变更
4. 是否指向正确的远程分支

**官方文档**：[Worktree 详解](https://code.claude.com/docs/zh-CN/worktrees)

---

## 权限模式

**是什么**：控制 Claude 执行操作前要不要问你。是日常使用最高频的"决策参数"——选错模式，要么被确认弹窗淹没、要么失去安全边界。

**五种模式**（完整对照表与决策指南见 [cheatsheet · 该用哪个权限模式](./claude-code-cheatsheet#该用哪个权限模式)）：

| 展示名 | 配置值 | 行为 | 何时使用 |
|--------|--------|------|---------|
| **Normal** | `default` | 执行前询问确认 | 默认，最谨慎 |
| **Auto** | `auto` | AI 分类器自动决策：安全操作自动通过，危险操作拦截 | 推荐：无需频繁确认，又保留安全边界 |
| **Plan** | `plan` | 只读分析，不执行任何更改 | 先规划再行动 |
| **Accept Edits** | `acceptEdits` | 自动批准编辑类操作，命令执行等其他操作仍询问 | 只想放开文件编辑，命令仍需确认 |
| **Auto-Accept**（Bypass） | `bypassPermissions` | 自动批准所有操作 | 完全信任 Claude 时 |

**配置值与展示名的区别**：`Shift+Tab` 循环切换的是展示名；`settings.json` 里 `defaultMode` 用的是配置值。两者一一对应，但格式不同（驼峰 vs 小写连字符）。

**演变趋势**：从 2026 年 8 月起，Auto 模式已成为 Pro/Max/Team 计划的新默认——官方发现 AI 分类器对危险命令的识别率足够高，Normal 模式被弹窗干扰的代价比偶尔拦截低价值操作的代价高。

**官方文档**：[权限参考](https://code.claude.com/docs/zh-CN/permissions)

---

## 相关页面

- [Claude Code 主教程](./claude-code) — 安装、交互、核心功能怎么用
- [Claude Code Cheatsheet](./claude-code-cheatsheet) — 配置/决策表/数据源速查
- [实战工作流 Cookbook](./claude-code-cookbook) — 9 大日常开发场景的提示模式
