# Claude Code 速查表

> 这是一份**查资料用**的参考文档，不是教程——想学怎么用 Claude Code，看 [主教程](./claude-code)；想知道某个术语的完整定义，看 [Glossary 术语表](./claude-code-glossary)。这里回答的是"该怎么配、该选哪个选项、有哪些信源可以深挖"。四个部分：决策表（不知道选哪个先看这）、术语速查索引（一句话 + 跳转 Glossary）、配置速查（`settings.json` 怎么写）、高质量信息源（持续学习去哪找）。

## 目录

- [决策表](#决策表)
- [术语速查索引](#术语速查索引)
- [配置速查](#配置速查)
- [高质量信息源](#高质量信息源)

---

## 决策表

### 该用哪个 Claude 产品/界面

| 场景 | 推荐 | 为什么 |
|------|------|--------|
| 终端里写代码，需要精细控制文件/命令权限 | **Claude Code CLI** | 功能最全，权限/Hook/Skill/Sub-agent 全部可用 |
| 想快速问答、不碰代码库 | **Claude.ai** | 零安装，浏览器直接用 |
| 想要可视化 diff、多会话并行管理 | **Claude Code Desktop App** | GUI 包了 CLI 的全部能力 |
| 在 VS Code / JetBrains 里边写边问，不想切窗口 | **编辑器扩展** | 内嵌集成 |
| 想让 Claude 自动跑设计到部署的完整流程，面向非工程师 | **Cowork** | 面向自动化/非工程师场景 |
| 临时任务，不想在本地开终端 | **Claude Code Web 版** | 浏览器里跑，无需安装 |
| 手机上想远程看一眼本地会话进度 | **Remote Control** | 手机/浏览器接管本地会话，见[术语速查索引](#术语速查索引) |

### 该用哪个权限模式

| 场景 | 推荐模式 | 为什么 |
|------|---------|--------|
| 刚开始用，还不了解 Claude 的判断力 | **Normal** | 每步都问，先建立信任 |
| 日常开发，想少被打断但保留安全边界 | **Auto**（推荐默认） | AI 分类器拦危险操作，其余自动过 |
| 只想看方案/代码分析，不想动文件 | **Plan** | 只读，不执行任何更改 |
| 只想放开文件编辑，命令还想手动确认 | **Accept Edits** | 编辑自动过，Bash 等命令仍询问 |
| 完全信任、CI/无人值守自动化场景 | **Auto-Accept**（`bypassPermissions`） | 全自动，注意安全边界，别在生产敏感目录用 |

### 该用哪种多 Agent 协作方式

Claude Code 有四种"多个 AI 一起干活"的机制，容易选错，按复杂度从低到高：

| 场景 | 推荐 | 为什么 |
|------|------|--------|
| 只是想让另一个已经开着的会话帮个忙 | **Cross-Session Messaging** | 最轻量，纯文本通信，不用编排 |
| 任务能拆成几个独立子任务，跑完汇总给主会话 | **Sub-agents**（内置或自定义） | 主会话直接调度，配置简单 |
| 需要脚本化编排大规模并行/流水线任务 | **Dynamic Workflows**（`agent()`/`pipeline()`） | 比手动调度 sub-agent 更适合规模化、可复用 |
| 需要多人协作式的任务分配和进度追踪 | **Agent Teams**（实验性） | Lead/Teammate 角色 + 共享任务列表 |

### 该用 Skill / Plugin / MCP / Hook 中的哪个来扩展能力

| 场景 | 推荐 | 为什么 |
|------|------|--------|
| 想让 Claude 连接外部工具/数据库/API | **MCP** | 底层开放协议，标准化连接方式 |
| 想封装一套可复用的多步骤流程/专业指令 | **Skill** | 描述触发时机，自动识别或手动 `/name` 调用 |
| 想把 Skills+Agents+Hooks+MCP 打包发布，团队共享 | **Plugin** | 一个可安装单元，走 marketplace 分发 |
| 只是想在特定事件（保存文件、提交前）自动跑个脚本 | **Hook** | 不需要封装成技能，直接在 `settings.json` 配置 |

---

## 术语速查索引

> 完整定义（是什么 / 为什么需要 / 在生态中的角色 / 工作机制）统一维护在 [Glossary 术语表](./claude-code-glossary)，避免和这里的定义各改各的、逐渐口径不一致。这里只放"一句话认知 + 跳转链接"，供已经大致了解概念、只想确认一下或者跳转查详情时用。

| 概念 | 一句话 | 详情 |
|------|--------|------|
| **MCP** | AI 连接外部工具/数据/API 的开放协议，Connectors 和插件都基于它 | [Glossary → MCP](./claude-code-glossary#mcp-model-context-protocol) |
| **Skills** | 可复用的多步骤工作流文件夹，Claude 按场景自动加载 | [Glossary → Skills](./claude-code-glossary#skills-技能) |
| **Hooks** | 工具调用前后自动触发的脚本 | [Glossary → Hooks](./claude-code-glossary#hooks-钩子) |
| **Plugins** | Skills+Agents+Hooks+MCP 打包成可安装单元 | [Glossary → Plugins](./claude-code-glossary#plugins-插件) |
| **Sub-agents** | 独立人格/权限的 AI 助手，可并行处理任务 | [Glossary → Sub-agents](./claude-code-glossary#sub-agents-子代理) |
| **Memory** | 跨对话记住偏好和背景（CLAUDE.md + 自动记忆） | [Glossary → Memory](./claude-code-glossary#memory-记忆) |
| **Dynamic Workflows** | 脚本化编排大规模子代理并行/流水线任务 | [Glossary → Dynamic Workflows](./claude-code-glossary#dynamic-workflows-动态工作流) |
| **Cross-Session Messaging** | 不同会话间发纯文本消息协作 | [Glossary → Cross-Session Messaging](./claude-code-glossary#cross-session-messaging-跨会话消息) |
| **Agent Teams** | 多会话组队，Lead 分配任务、Teammates 并行执行（实验性） | [Glossary → Agent Teams](./claude-code-glossary#agent-teams-多-agent-团队-实验性) |
| **Remote Control** | 手机/网页/Slack 远程接管本地会话 | [Glossary → Remote Control](./claude-code-glossary#remote-control-远程控制) |
| **Channels** | 外部消息源（Telegram/Discord/iMessage）触发会话（Research Preview） | [Glossary → Channels](./claude-code-glossary#channels-频道) |
| **Worktree** | 基于 `git worktree` 的多会话并行分支隔离 | [Glossary → Worktree](./claude-code-glossary#worktree-工作树) |
| **权限模式** | 控制 Claude 执行操作前要不要问你，五种模式 | [Glossary → 权限模式](./claude-code-glossary#权限模式)・[决策表](#该用哪个权限模式)・[配置速查](#权限配置) |
| **Settings Scope** | 配置分层系统，Managed > CLI 参数 > Local > Project > User | [配置速查 · 配置作用域](#配置作用域速查) |

---

## 配置速查

> 本节是 `settings.json` 官方文档的精选重组织版本，面向实际配置场景设计。完整文档见 [Settings](https://code.claude.com/docs/zh-CN/settings)。

### 配置作用域速查

Settings Scope 是 Claude Code 最核心也最容易混淆的概念。配置生效前，先确认你编辑的是哪个作用域的文件。

**五层优先级（从高到低，这是全站唯一权威版本，其余页面引用这里，不要另抄一份）**：

| 优先级 | 作用域 | 配置文件 | 共享方式 | 谁能覆盖谁 |
|--------|--------|---------|---------|-----------|
| 1（最高） | **Managed** | IT 部署 / `managed-settings.json` | 组织内所有成员 | 谁都不能覆盖它（极少数安全敏感 key 除外） |
| 2 | **CLI 参数** | `--permission-mode` 等启动参数 | 仅当前会话 | 临时覆盖所有设置 |
| 3 | **Local** | `.claude/settings.local.json` | 仅你自己（gitignored） | 覆盖 Project 和 User |
| 4 | **Project** | `.claude/settings.json` | 整个团队（提交到 Git） | 覆盖 User |
| 5（最低） | **User** | `~/.claude/settings.json` | 仅你自己 | 被所有上层覆盖 |

**各作用域适用场景**：

| 作用域 | 放什么 | 示例 |
|--------|--------|------|
| **User** | 个人全局偏好 | 主题、编辑器、API key、全局 MCP |
| **Project** | 团队共享规则 | permissions allow/deny、hooks、共享 MCP |
| **Local** | 个人项目覆盖 | 调试用的权限放开、实验性配置 |
| **Managed** | 企业安全策略 | 强制 deny 规则、禁用 bypass、限制域名 |

**各功能对应的配置位置**：

| 功能 | User 位置 | Project 位置 | Local 位置 |
|------|----------|-------------|-----------|
| Settings | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| Subagents | `~/.claude/agents/` | `.claude/agents/` | 无 |
| MCP servers | `~/.claude.json` | `.mcp.json` | `~/.claude.json`（per-project） |
| Plugins | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| CLAUDE.md | `~/.claude/CLAUDE.md` | `CLAUDE.md` 或 `.claude/CLAUDE.md` | `CLAUDE.local.md` |

**关键规则**：
1. **Managed 不可覆盖**：管理员设置的 `managed` 键（如 `allowedPlugins`、`knownMarketplaces`）对用户和项目隐藏且不可修改
2. **安全例外**：`apiKey`、`oauthToken`、`sandbox` 等安全相关键允许 Local 覆盖 Managed，防止凭据泄露
3. **权限规则跨作用域合并**（不是覆盖），高优先级条目优先匹配
4. **插件配置**遵循相同的优先级合并规则
5. Managed 设置中的无效条目会被自动删除并记录警告（v2.1.169+），单个拼写错误不会禁用其余策略
6. 项目设置中设 `auto` 模式会被忽略（v2.1.142+），防止仓库授予自己自动权限

**常见陷阱**：

| 陷阱 | 表现 | 解决 |
|------|------|------|
| 项目 settings 不生效 | 修改 `.claude/settings.json` 后无变化 | 检查是否有 Local 文件覆盖 |
| 权限规则冲突 | allow 和 deny 同时匹配时行为不确定 | deny 优先匹配 |
| Managed 设置被忽略 | 企业策略不生效 | 确认管理员是否正确设置了 `managed` 键 |

**配置文件结构**：

```jsonc
// .claude/settings.json（项目级，提交到 Git）
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(git:*)", "Read"],
    "deny": ["Bash(rm -rf:*)"]
  },
  "hooks": { "PostToolUse": [ /* ... */ ] },
  "mcpServers": { "github": { /* ... */ } }
}
```

### 核心配置参考

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": { "...": "..." },
  "hooks": { "...": "..." },
  "env": { "...": "..." },
  "enabledPlugins": { "...": "..." },
  "pluginConfigs": { "...": "..." },
  "extraKnownMarketplaces": { "...": "..." },
  "outputStyle": "concise",
  "companyAnnouncements": [ "..." ]
}
```

`$schema` 行指向官方 JSON Schema，添加到 settings.json 可在 VS Code 等编辑器中启用自动完成。

### 权限配置

**五种权限模式**（配置值优先，展示名对照见 [Glossary · 权限模式](./claude-code-glossary#权限模式)）：

| 配置值（`defaultMode`） | 展示名 | 行为 | 推荐场景 |
|------|------|------|---------|
| `default` | Normal | 每次执行前询问确认 | 最谨慎 |
| `auto` | Auto | AI 分类器自动决策：安全操作自动通过，危险操作拦截 | **推荐日常使用** |
| `plan` | Plan | 只读分析，不执行任何更改 | 先规划再行动 |
| `acceptEdits` | Accept Edits | 自动批准编辑类操作，其他询问 | 只编辑不执行命令 |
| `bypassPermissions` | Auto-Accept | 自动批准所有操作 | 完全信任时 |

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(git:*)", "Read"],
    "deny": ["Bash(rm -rf:*)", "Read(.env*)"]
  }
}
```

**权限规则语法**：规则格式 `ToolName` 或 `ToolName(pattern)`，评估顺序 **deny → ask → allow**，第一个匹配的规则决定结果（不按特异性）。

| 规则 | 匹配范围 |
|------|---------|
| `Bash` | 所有 Bash 命令 |
| `Bash(npm run *)` | 以 `npm run` 开头的命令 |
| `Read(./.env)` | 读取 `.env` 文件 |
| `WebFetch(domain:example.com)` | 对 example.com 的抓取 |
| `mcp__github__get_*` | GitHub MCP 的 get 系列工具 |
| `*` | 匹配所有工具（仅用于 deny） |

Bash 权限安全限制：`*` 匹配整个命令而不仅是参数；`**` 匹配路径中多个目录层级；用 `Bash(git:*)` 而非 `Bash(git *)` 避免参数注入。

### 模型和响应设置

```json
{
  "model": "claude-sonnet-4-6",
  "outputStyle": "concise",
  "maxThinkingTokens": 10000
}
```

| 键 | 说明 |
|----|------|
| `model` | 默认模型，会话中可用 `/model` 切换。启动时读取，不热重载 |
| `outputStyle` | 输出风格（`concise`/`explanation`/`none`），系统提示的一部分，`/clear` 时重建 |
| `maxThinkingTokens` | Extended Thinking 预算上限 |

### Hook 配置

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write", "hooks": [
        { "type": "command", "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\"" }
      ]}
    ]
  }
}
```

| 事件 | 触发时机 | 最常用场景 |
|------|---------|-----------|
| `PreToolUse` | 工具调用前 | 拦截危险命令、修改参数 |
| `PostToolUse` | 工具调用后 | 格式化、lint、测试 |
| `SessionStart` | 会话开始 | 加载环境变量、初始化 |
| `SessionEnd` | 会话结束 | 清理、报告 |
| `UserPromptSubmit` | 用户提交消息 | 日志、验证 |
| `Notification` | 长时间运行操作的通知 | 进度提示 |
| `ConfigChange` | 设置文件变更时 | 重载自定义配置 |

三种 Hook 类型：`command`（shell 命令）、`prompt`（注入额外 prompt）、`mcp_tool`（调用 MCP 服务器）。

Hook 安全设置（settings 级别）：

```json
{
  "allowedHttpHookUrls": ["https://hooks.example.com/*"],
  "httpHookAllowedEnvVars": ["MY_TOKEN", "HOOK_SECRET"]
}
```

> 当 `allowManagedHooksOnly` 为 `true`（仅 Managed 设置）时，只加载 Managed hooks 和插件市场强制启用的插件 hooks，用户 hooks 和项目 hooks 被阻止。

### Subagent 配置

自定义子代理是 `agents/` 目录下的 Markdown 文件（YAML frontmatter + 指令）：`~/.claude/agents/<name>.md`（用户级）/ `.claude/agents/<name>.md`（项目级，团队共享）。

```yaml
---
name: security-reviewer
description: 安全审查、权限检查、OWASP 合规时调用
tools: Read, Grep, Glob
model: claude-opus-4-6
permissionMode: ask
---
```

| 字段 | 必填 | 说明 |
|------|:----:|------|
| `name` | ✅ | 代理标识符（字母、数字、连字符） |
| `description` | ✅ | Claude 何时调用此代理 |
| `tools` | ❌ | 允许使用的工具列表，不写则继承全部 |
| `model` | ❌ | 指定模型（`sonnet`/`opus`/`haiku`） |
| `permissionMode` | ❌ | 覆盖全局权限模式 |
| `color` | ❌ | UI 中显示的颜色 |

内置子代理：`Explore`（代码库探索，只读）、`Plan`（规划调研）。

### 插件配置

```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "analyzer@security-plugins": false
  }
}
```

格式：`"plugin-name@marketplace-name": true/false`，无显式条目回退到 `defaultEnabled`。作用域规则：项目设置 > 用户设置；本地禁用项目插件在 `.claude/settings.local.json` 设 `false`；Managed 强制启用的插件无法本地禁用。

```json
{
  "pluginConfigs": {
    "deployer@acme-tools": { "options": { "api_endpoint": "https://api.example.com" } }
  }
}
```

`pluginConfigs` 仅从用户设置、`--settings` 标志和 Managed 设置读取，项目 `settings.json`/`settings.local.json` 中的条目被忽略。

```json
{
  "extraKnownMarketplaces": {
    "acme-tools": { "source": { "source": "github", "repo": "acme-corp/claude-plugins" } }
  }
}
```

在项目级声明，团队成员信任仓库时会被提示安装该市场。

**插件安装安全**：从外部源（GitHub/npm）在项目的 `.claude/settings.json` 中启用插件不会自动为其他人安装，每个用户都需要先运行 `claude plugin install` 安装并信任插件后才能使用。

### 环境变量

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "ANTHROPIC_BASE_URL": "https://your-proxy.example.com"
  }
}
```

也可以在 Shell 里直接 export，或命令前临时指定：`ANTHROPIC_BASE_URL=https://proxy.claude.com claude`

| 变量 | 用途 |
|------|------|
| `ANTHROPIC_API_KEY` | API 密钥（不登录时使用） |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | 遥测数据上报（`1` 启用） |
| `CLAUDE_CODE_DISABLE_UPDATE_CHECK` | 禁用更新检查（CI 环境有用） |
| `OTEL_METRICS_EXPORTER` | OpenTelemetry 指标导出 |
| `CLAUDE_CONFIG_DIR` | 指定配置目录（用于隔离调试） |

### Sandbox 设置要点

Sandbox 将 Bash 命令与文件系统和网络隔离，适合在不信任的环境中运行 Claude Code。

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker *"],
    "allowUnsandboxedCommands": false
  }
}
```

文件系统规则：

```json
{ "sandbox": { "filesystem": {
  "allowWrite": ["/tmp/build", "~/.kube"],
  "denyWrite": ["/etc", "/usr/local/bin"],
  "denyRead": ["~/.aws/credentials"],
  "allowRead": ["."]
}}}
```

网络规则：

```json
{ "sandbox": { "network": {
  "allowedDomains": ["github.com", "*.npmjs.org"],
  "deniedDomains": ["sensitive.cloud.example.com"],
  "allowUnixSockets": ["~/.ssh/agent-socket"],
  "allowLocalBinding": true
}}}
```

凭证保护：

```json
{ "sandbox": { "credentials": {
  "files": [{ "path": "~/.aws/credentials", "mode": "deny" }],
  "envVars": [
    { "name": "GITHUB_TOKEN", "mode": "deny" },
    { "name": "AWS_SECRET_ACCESS_KEY", "mode": "mask", "injectHosts": ["api.github.com"] }
  ]
}}}
```

> **安全提示**：`allowManagedReadPathsOnly`（仅 Managed 设置）可限制 sandbox 只认 Managed 作用域的 `allowRead` 规则，防止项目设置放宽文件访问。

路径前缀：`/` 绝对路径 · `~/` 主目录 · `./` 或无前缀（项目根目录，Managed 设置下是 `~/.claude`）。

### 配置生效时机

大多数设置**立即生效**（热重载）：`permissions`、`hooks`、`apiKeyHelper`、`env`；用户/项目/本地/Managed 设置的变更都会触发 `ConfigChange` hook。

**启动时读取一次**（修改后需重启或用命令切换）：

| 键 | 替代切换方式 |
|----|------------|
| `model` | 会话中用 `/model` 切换 |
| `outputStyle` | `/clear` 或重启后重建 |

### 验证配置生效

遇到配置不生效，按顺序排查：

```bash
/doctor                              # 1. 全面诊断
/context                             # 2. 检查上下文窗口
/hooks                               # 3. 检查 hooks 状态
/mcp                                 # 4. 检查 MCP 服务器
claude --safe-mode                   # 5. 安全模式隔离问题
CLAUDE_CONFIG_DIR=/tmp/claude-test claude   # 6. 独立配置目录排除干扰
```

| 症状 | 原因 | 解决 |
|------|------|------|
| `auto` 模式不生效 | 项目设置中 `auto` 被忽略（v2.1.142+） | 移到 `~/.claude/settings.json` |
| Hook 不触发 | matcher 格式错误或路径不对 | 用 `/hooks` 检查注册状态 |
| MCP 服务器连不上 | 路径或环境变量不对 | 用 `/mcp` 查看日志 |
| 权限规则不生效 | 规则顺序错误 | deny → ask → allow，第一个匹配生效 |
| Sandbox 启动失败 | 缺少依赖或不支持平台 | 设置 `failIfUnavailable: false` |
| 插件在团队中不生效 | 队友未安装 | 每个用户需运行 `claude plugin install` |

### 常见配置模板

**前端团队项目模板**：

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": [
      "Bash(git:*)", "Bash(npm run *)", "Bash(npx *)", "Bash(pnpm *)",
      "Read", "Edit", "Write", "Grep", "Glob",
      "WebFetch(domain:github.com)", "WebFetch(domain:stackoverflow.com)"
    ],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)", "Bash(curl *)"]
  },
  "hooks": {
    "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [
      { "type": "command", "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true" }
    ]}]
  },
  "env": { "CLAUDE_CODE_ENABLE_TELEMETRY": "1" }
}
```

**个人全局偏好模板**：

```json
{
  "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(git:*)", "Bash(npm run *)", "Bash(pnpm *)", "Read", "Edit", "Write", "Grep", "Glob"],
    "deny": ["Read(.*.key)", "Read(.*.pem)", "Bash(rm -rf:*)"]
  },
  "env": { "CLAUDE_CODE_ENABLE_TELEMETRY": "1" }
}
```

**企业安全策略模板（Managed）**：

```json
{
  "permissions": {
    "defaultMode": "default",
    "disableBypassPermissionsMode": "disable",
    "deny": ["Bash(curl *)", "Bash(wget *)", "Read(*.env)", "Read(*.pem)"]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowManagedDomainsOnly": true,
      "allowedDomains": ["github.com", "*.npmjs.org", "registry.npmjs.org"]
    },
    "credentials": { "envVars": [
      { "name": "GITHUB_TOKEN", "mode": "deny" },
      { "name": "AWS_SECRET_ACCESS_KEY", "mode": "deny" }
    ]}
  }
}
```

---

## 高质量信息源

> 官方文档/Cookbook/Blog、社交账号（按公司/产品/负责人/核心开发者四层分级）、GitHub 高质量仓库、Awesome List、三方 Blog 的完整核实清单——不只是给读者的参考资料，也是驱动本教程持续更新的数据基础。整理方法（如何系统发现数据源、社交账号身份怎么核实）见仓库内 [`.claude/skills/doc-research/references/sources/_template.md`](https://github.com/zenHeart/learn-ai/blob/claude/.claude/skills/doc-research/references/sources/_template.md)。

最后一次系统性核实：2026-08-17。

### 官方文档

Claude Code 实际横跨两个不同定位的官方文档站，容易混淆：

- **[Claude Code 文档（中文）](https://code.claude.com/docs/zh-CN/)** — CLI 工具本身的使用文档：安装、命令、配置、Hooks、Skills 等
  - 关键子页：[Commands 参考](https://code.claude.com/docs/en/commands)（内置命令 + bundled skills 完整清单，写命令相关内容前必查，本站教程曾因未核对这页写出过不存在的命令）、[What's New](https://code.claude.com/docs/en/whats-new/index)（每周更新，日常追踪主入口）、[Settings](https://code.claude.com/docs/zh-CN/settings)、[CLI Reference](https://code.claude.com/docs/zh-CN/cli-reference)、[Best Practices](https://code.claude.com/docs/zh-CN/best-practices)、[Troubleshooting](https://code.claude.com/docs/zh-CN/troubleshooting)
- **[Claude Developer Platform 文档](https://platform.claude.com/docs/en/home)** — Claude **API**（Messages / Managed Agents / Agent SDK）的开发者文档，不是 Claude Code CLI 的文档；两者共享底层模型能力，但受众和内容完全不同，别搞混
  - 关键子页：[API Reference](https://platform.claude.com/docs/en/api/overview)、[Release Notes](https://platform.claude.com/docs/en/release-notes/overview)（API 侧的更新日志，和 Claude Code 的 What's New 是两条独立的更新线）

### 官方 Cookbook / 示例仓库 / 其他官方资源

- **[Claude Cookbook](https://platform.claude.com/cookbook/)** — 官方 Cookbook 网站，覆盖 Agent Patterns、Tools、Claude Agent SDK、Managed Agents、RAG、Multimodal、Evals 等 11 大类代码示例。**主要面向 Claude API / Agent SDK 开发者，不是 Claude Code CLI 使用技巧集合**，但其中 "Claude Agent SDK" 分类和 Claude Code 底层技术强相关
  - 对应 GitHub 仓库：[anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks)（4万+ star，同一套内容的可运行 notebook 版本）
- **[Courses](https://anthropic.skilljar.com/)** — 官方互动课程
- **[Quickstarts](https://github.com/anthropics/anthropic-quickstarts)** — 官方可部署的启动模板仓库

### 官方 / 核心团队社交账号

按"对 Claude Code **工具使用**的信息密度"分级，不是按粉丝数——权重依次是：①是否一手信息（在写代码/定产品/改功能）②是否讲真实用法（worktree/CLAUDE.md/skill/hook 而不是"100 个 tips"拼图）③更新是否跟得上版本（现在几乎每周一个小版本）④推销课/卖自动化的比例（越高越减分）。

> 下面的分级与评语整理自 [Grok 深度搜索](https://x.com) 结果（检索范围约 2026-07 至 2026-08-16），是 Grok 综合近期互动数据和内容质量的判断，不是本站逐条独立核实过的事实——账号本身的存在性和官方身份用了交叉引用核实，但排名和评语请按需自行复核。粉丝数/浏览量这类数字会很快过时，这里只保留长期成立的定性判断。

**S 级（一手信息源，几乎唯一真相源）**

| 账号 | 身份 | 为什么排这里 |
|------|------|-------------|
| **[@bcherny](https://x.com/bcherny)** | Claude Code 作者/负责人 | 没有比他更上游的信源。"多 worktree 并行、先 Plan、改完写进 CLAUDE.md、重复动作做成 skill"这套团队方法论就是他发出来的，会公开讨论 worktree 清理、auto mode 这类还在演进中的功能 |
| **[@trq212](https://x.com/trq212)** | Claude Code 工程师（Thariq Shihipar，Anthropic technical staff，此前任职 YC W20/South Park Commons/MIT Media Lab） | 比负责人账号更偏"怎么用"：讲 auto mode 怎么锁死危险操作、什么时候该让它 keep going。提出过被广泛采用的"9 类技能"框架 |
| **[@_catwu](https://x.com/_catwu)** | Claude Code + Cowork 产品负责人（Cat Wu，身份经 TechCrunch、Lenny's Newsletter 等多家媒体独立确认） | 看产品往哪走：桌面内嵌浏览器、多人协作、从单人 CLI 到团队常驻 agent 的路线 |
| **[@ClaudeDevs](https://x.com/ClaudeDevs)** | 官方开发者账号 | 功能上线的第一落点，适合当"版本雷达"。身份经 [@trq212 亲自发文宣布](https://x.com/trq212/status/2044893583308918787)"这是 Claude Code 和 Claude 平台所有更新的官方渠道"交叉确认 |
| **[@adocomplete](https://x.com/adocomplete)** | Anthropic Community / Claude Code | 官方里最会教具体操作的账号，比官方通稿更接近"打开终端怎么按" |

**A 级（高频有用，互补信源）**

| 账号 | 身份 | 适合谁 |
|------|------|--------|
| **[@amorriscode](https://x.com/amorriscode)** | Claude Code @ Anthropic，前 Stripe | 专攻 Desktop 端用法，CLI 主力可略看，用桌面端必跟 |
| **[@The_Whole_Daisy](https://x.com/The_Whole_Daisy)** | Claude Code 工程师，跨 session/SendMessage 相关 | 发得少但都是实现细节，适合已经在跑多 Claude session 的人 |
| **[@ClaudeCodeLog](https://x.com/ClaudeCodeLog)** | 非官方 changelog bot（bio 自称 unofficial but tolerated） | 按版本拆 CLI/feature flag/prompt 变化，是低成本的"每天扫一眼有没有新 flag"方案 |
| **[@oikon48](https://x.com/oikon48)** | 日籍工程师，《Claude Code 实践入门》作者 | 中日用户里信噪比最高的实践号，把 changelog 精读成可操作条目，不是卖课号 |
| **[@simonw](https://x.com/simonw)** | Datasette / Django 共同作者 | 独立、爱挑刺，用来对冲官方乐观叙事 |
| **[@alexalbert__](https://x.com/alexalbert__)** | Anthropic Research | 偶尔放内部用法数据，不是命令速查号 |
| **[@claudeai](https://x.com/claudeai)** | 官方产品账号 | Security plugin、限额、桌面改版这类大功能会在这里首发 |

**B 级（有料但要过滤包装）**

| 账号 | 适合谁 | 备注 |
|------|--------|------|
| **[@dexhorthy](https://x.com/dexhorthy)** | 已经在跑多 agent 工作流的人 | 偏 harness 对比，不是入门内容 |
| **[@svpino](https://x.com/svpino)** | 想快速收齐快捷键 | 实操向合集，当速查表用 |
| **[@claude_code](https://x.com/claude_code)** | 想刷社区项目动态 | 社区号，非官方，质量不均 |

**不建议当主力关注**：按"Claude Code"搜账号时排名靠前的很多是培训/获客号（日文增长号尤其多，常见话术是"XX万曝光/纯利XX/研讨会导流"）——判断标准很简单：讲不讲具体的版本号/flag/命令，还是只讲"效率提升 10 倍"这类空泛话术。

### 核心维护者 / 团队 Blog

- **[Claude Blog](https://claude.com/blog)** — 官方产品新闻与最佳实践 Blog（和下面的 Engineering Blog 是两个不同定位的站点）。近期 Claude Code 相关文章：[Maximizing the value of your Claude Code sessions](https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions)（2026-08-14）、[Auto mode is now the default](https://claude.com/blog/auto-mode-default-in-claude-code)（2026-08-07）、[Running auto mode in production](https://claude.com/blog/auto-mode-in-production)（2026-08-07）、[Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)（2026-06-18）
- **[Anthropic Engineering Blog](https://www.anthropic.com/engineering)** — 官方工程博客，偏技术深度：[How Claude Code works in large codebases](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start)、[Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)、[Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### GitHub 高质量仓库

- **[anthropics/claude-code](https://github.com/anthropics/claude-code)**（官方，14万+ star）— **注意：不是完整源码仓库**，公开内容是 CLI 二进制分发 + 插件（`plugins/`、`examples/`）+ 文档/issue 追踪，核心 Agent 实现未开源。适合看 CHANGELOG、Issues、官方插件示例
- **[anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)**（官方）— GitHub Actions 集成，`@claude` 触发 CI 内 Claude Code 的官方实现

### Awesome List / 资源聚合

- **[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)**（5.2万+ star，1500+ 次提交）— 收录范围最广、维护最活跃的社区精选集合
- **[subinium/awesome-claude-code](https://github.com/subinium/awesome-claude-code)** — 只收录 1000+ star 的仓库，质量门槛更高但覆盖面更窄（自身仅 100+ star）

> ⚠️ 同名/近似仓库很多（如 `jqueryscript/awesome-claude-code`、`rohitg00/awesome-claude-code-toolkit`），引用时务必带上 owner，不要只写仓库名。

### 三方高质量 Blog / 社区

英文：[Codingscape: How Anthropic engineering teams use Claude Code every day](https://codingscape.com/blog/how-anthropic-engineering-teams-use-claude-code-every-day) — 基于官方工程博客的深度解读

中文：[Claude Code 最佳实践中文版（知乎）](https://zhuanlan.zhihu.com/p/1973059671540663242) — 官方最佳实践的中文翻译；[最强 Coding Agent：Claude Code 权威实践指南（知乎）](https://zhuanlan.zhihu.com/p/1920263182062163086) — 基于官方工程博客的解读整理

> 中文内容以知乎/CSDN 为主的搜索结果里翻译/搬运和原创混杂，引用前先看是否标注了原文出处。

### 待核实

- **ClaudeLog（claudelog.com）**：疑似专门的资源站，但访问返回 403（反爬），无法确认内容质量和运营方身份
- CSDN 上多篇标题显示为实用踩坑合集的文章，只记录过标题、没有确认具体 URL 和原创性，用之前需要重新搜索定位并核实

---

## 相关页面

- [Claude Code 主教程](./claude-code) — 安装、交互、核心功能怎么用
- [实战工作流 Cookbook](./claude-code-cookbook) — 9 大日常开发场景的提示模式
- [Glossary 术语表](./claude-code-glossary) — 每个概念的完整定义、为什么需要、工作机制
