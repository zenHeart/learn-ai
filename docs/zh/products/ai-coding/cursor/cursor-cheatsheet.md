# Cursor 速查表

查资料用，不是教程。用法看 [主教程](./cursor)，概念看 [术语表](./cursor-glossary)。

## 目录

- [决策表](#决策表)
- [功能矩阵](#功能矩阵)
- [术语速查索引](#术语速查索引)
- [快捷键](#快捷键)
- [配置速查](#配置速查)
- [常见错误](#常见错误)
- [模板](#模板)
- [高质量信息源](#高质量信息源)

---

## 决策表

### 该用哪个入口

| 场景 | 用 | 为什么 |
|------|----|--------|
| 补全当前行 / 下一处编辑 | **Tab** | 延迟低，不占 Agent 配额 |
| 改当前选区或当前函数 | **Inline Edit `Cmd+K`** | 上下文就是选区 |
| 只问不改 | **Ask** | 降低误改 |
| 跨文件实现、跑命令 | **Agent** | 有工具循环 |
| 需求糊、跨很多文件 | **Plan** | 先对齐再写 |
| 能复现、找不到根因 | **Debug** | 用运行时证据 |
| PR 审查 | **Bugbot** | 看 diff，不是跑你的 app |
| 人不在 / 要并行 / 隔离 VM 开 PR | **Cloud Agents** | 曾用名 Background Agents |
| 终端交互或无头 CI | **CLI `agent`** | 二进制是 `agent`，不是 `cursor` |

### 该用 Rules / AGENTS.md / Skills / Commands / Hooks / MCP / Subagents

| 场景 | 选 | 为什么 |
|------|----|--------|
| 每次对话都要遵守的短约束 | **Rules**（Always 或 glob） | 进系统上下文 |
| 给人类和多种 Agent 看的说明书 | **AGENTS.md** | 无 frontmatter，跨工具 |
| 按需加载的多步工作流 | **Skills** | 不占常驻上下文 |
| 一天要用很多次的固定提示 | **Commands**（`/name`） | 显式触发 |
| 工具调用前后跑脚本 / 拦截 | **Hooks** | 不经过模型自觉 |
| 接外部系统 | **MCP** | 标准工具协议 |
| 要隔离上下文或并行 | **Subagents** | 独立窗口 |

### 该开新 Chat 还是继续

| 场景 | 选 |
|------|----|
| 换功能 / 换模块 | 新 Chat |
| Agent 开始循环犯错 | 新 Chat + `@Chats` |
| 同一功能的下一轮迭代 | 继续 |
| 调试它刚写的代码 | 继续 |

---

## 功能矩阵

从 `docs/zh/products/ai-coding/index.md` 迁出的 Cursor 能力表。链接改到 2026-08 仍有效的官方页；旧路径若仍 301，以本表为准。描述按官方文档校正（尤其是 Bugbot）。

| Feature | 描述 | 官方文档 |
|---------|------|----------|
| [AGENTS.md](https://cursor.com/docs/rules) | 纯 Markdown 项目指令，根目录或子目录 | [Rules · AGENTS.md](https://cursor.com/docs/rules) |
| [Rules (`.cursor/rules`)](https://cursor.com/docs/rules) | `.mdc` + glob / 智能 / 手动 / Always | [Rules](https://cursor.com/docs/rules) |
| [Commands](https://cursor.com/docs/context/commands) | `.cursor/commands/*.md`，`/` 触发 | [Commands](https://cursor.com/docs/context/commands) |
| [Skills](https://cursor.com/docs/skills) | `SKILL.md` 工作流包；可用 `/migrate-to-skills` | [Skills](https://cursor.com/docs/skills) |
| [MCP](https://cursor.com/docs/mcp) | 外部工具 / 数据源 | [MCP](https://cursor.com/docs/mcp) |
| [Hooks](https://cursor.com/docs/hooks) | Agent / Tab / 工作区生命周期脚本 | [Hooks](https://cursor.com/docs/hooks) |
| [Sub-agents](https://cursor.com/docs/subagents) | 独立上下文的委派；内置 Explore / Bash / Browser | [Subagents](https://cursor.com/docs/subagents) |
| [Bugbot](https://cursor.com/docs/bugbot) | **PR 审查**（bug / 安全 / 质量），可 Autofix（再拉 Cloud Agent） | [Bugbot](https://cursor.com/docs/bugbot) |
| [Cloud Agents](https://cursor.com/docs/cloud-agent) | 隔离 VM 克隆仓库、开 PR；曾用名 Background Agents | [Cloud Agent](https://cursor.com/docs/cloud-agent) |
| [Cursor CLI](https://cursor.com/docs/cli/overview) | 终端 `agent`；无头 `agent -p` | [CLI](https://cursor.com/docs/cli/overview) · [Installation](https://cursor.com/docs/cli/installation) |
| [Modes](https://cursor.com/docs/agent/overview) | Agent / Ask / Plan / Debug。`Cmd+.`；Plan 用 `Shift+Tab` | [Overview](https://cursor.com/docs/agent/overview) · [Plan](https://cursor.com/docs/agent/plan-mode) · [Debug](https://cursor.com/docs/agent/debug-mode) |
| [Tab](https://cursor.com/docs/tab/overview) | 多行补全、跨文件跳转、TS/Python auto-import | [Tab](https://cursor.com/docs/tab/overview) |
| [Chat](https://cursor.com/docs/agent/prompting) | Agent 对话；用 `@` 附加上下文 | [Prompting](https://cursor.com/docs/agent/prompting) |
| [Codebase Indexing](https://cursor.com/docs/context/semantic-search) | 向量索引；约 80% 完成后语义搜索可用 | [Semantic search](https://cursor.com/docs/context/semantic-search) |
| [@ Symbols](https://cursor.com/docs/agent/prompting) | `@` 文件 / 文件夹 / 终端 / Chats / Git / Browser | [Prompting](https://cursor.com/docs/agent/prompting) |
| [Notepad](https://cursor.com/docs/context/mentions) | 旧矩阵条目。2026-08 Prompting 页未列出独立 Notepad。待核实是否仍为独立功能 | [mentions 旧路径](https://cursor.com/docs/context/mentions) |
| [Docs Integration](https://cursor.com/docs/agent/prompting) | 自定义文档进上下文（旧 mentions 页能力） | [Prompting](https://cursor.com/docs/agent/prompting) |
| [Privacy Mode](https://cursor.com/docs/enterprise/privacy-and-data-governance) | 开启后 Cursor 与模型提供方不用你的代码训练 | [Privacy](https://cursor.com/docs/enterprise/privacy-and-data-governance) |
| [Model Selection](https://cursor.com/docs/models-and-pricing) | Cursor Models 池与第三方模型池 | [Models & Pricing](https://cursor.com/docs/models-and-pricing) |
| [Integrations](https://cursor.com/docs/integrations/github) | GitHub / GitLab / Linear / Slack 等 | [GitHub](https://cursor.com/docs/integrations/github) |
| [Inline Edit](https://cursor.com/docs/inline-edit/overview) | `Cmd+K` 改选区 | [Inline Edit](https://cursor.com/docs/inline-edit/overview) |
| [Reuse Existing Code](https://cursor.com/docs/reuse-existing-code) | 旧矩阵条目。2026-08 主导航未见此页，待核实 | [reuse-existing-code](https://cursor.com/docs/reuse-existing-code) |
| [Long-running Agents](https://cursor.com/blog/long-running-agents) | 官方长文：长时 Agent | [Blog](https://cursor.com/blog/long-running-agents) |
| [Self-driving Codebases](https://cursor.com/blog/self-driving-codebases) | 官方长文：更自主的仓库 | [Blog](https://cursor.com/blog/self-driving-codebases) |

索引与忽略相关、矩阵未单独成行但天天用：

| Feature | 描述 | 官方文档 |
|---------|------|----------|
| `.cursorignore` | 挡住索引、Tab、Agent、Inline Edit、`@` | [Ignore files](https://cursor.com/docs/context/ignore-files) |
| `.cursorindexingignore` | 只排除索引，AI 功能仍可读 | 同上 |
| Keyboard shortcuts | 全表 | [Keyboard Shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts) |

---

## 术语速查索引

一行一个概念。超过一句话的解释只在 [术语表](./cursor-glossary)。

| 概念 | 一句话 | 详情 |
|------|--------|------|
| **Rules** | 注入上下文开头的持久指令 | [Glossary](./cursor-glossary#rules) |
| **AGENTS.md** | 无 metadata 的项目说明书 | [Glossary](./cursor-glossary#agents-md) |
| **Skills** | 按需加载的 `SKILL.md` 包 | [Glossary](./cursor-glossary#skills) |
| **Commands** | `/` 触发的 Markdown 工作流 | [Glossary](./cursor-glossary#commands) |
| **MCP** | 连外部工具的协议 | [Glossary](./cursor-glossary#mcp) |
| **Hooks** | 生命周期脚本 | [Glossary](./cursor-glossary#hooks) |
| **Subagents** | 独立上下文的子代理 | [Glossary](./cursor-glossary#subagents) |
| **Modes** | Agent / Ask / Plan / Debug | [Glossary](./cursor-glossary#modes) |
| **Tab** | 补全模型 | [Glossary](./cursor-glossary#tab) |
| **Bugbot** | PR 审查 | [Glossary](./cursor-glossary#bugbot) |
| **Checkpoints** | Agent 大改前的快照 | [Glossary](./cursor-glossary#checkpoints) |
| **Codebase Index** | 语义搜索用的向量索引 | [Glossary](./cursor-glossary#codebase-indexing) |
| **Privacy Mode** | 代码不用于训练 | [Glossary](./cursor-glossary#privacy-mode) |
| **Cloud Agents** | 远程 VM 上的 Agent；曾用名 Background Agents | [Glossary](./cursor-glossary#cloud-agents) |
| **CLI `agent`** | 官方终端入口；无头用 `-p` | [Glossary](./cursor-glossary#cursor-cli) |

---

## 快捷键

摘自 [官方 Keyboard Shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts)。完整列表：`Cmd+R` 然后 `Cmd+S`（Windows / Linux：`Ctrl+R` 然后 `Ctrl+S`），或命令面板搜 `Keyboard Shortcuts`。可全部重映射。

### 通用

| 快捷键（macOS / Windows·Linux） | 作用 |
|--------------------------------|------|
| `Cmd+I` / `Ctrl+I` | 切换侧栏（未绑到模式时） |
| `Cmd+L` / `Ctrl+L` | 切换侧栏（未绑到模式时）；选区送到新 Chat |
| `Cmd+E` / `Ctrl+E` | 切换 Agent 布局 |
| `Cmd+.` / `Ctrl+.` | 模式菜单 |
| `Cmd+/` / `Ctrl+/` | 循环模型 |
| `Cmd+Shift+J` / `Ctrl+Shift+J` | Cursor 设置 |
| `Cmd+Shift+Space` / `Ctrl+Shift+Space` | 语音 |
| `Cmd+,` / `Ctrl+,` | 通用设置 |
| `Cmd+Shift+P` / `Ctrl+Shift+P` | 命令面板 |

### Chat / Agent

| 快捷键 | 作用 |
|--------|------|
| `Enter` | 默认 nudge；Agent 工作时入队（与 Overview 页「Enter 入队」一致） |
| `Ctrl+Enter` | 入队 |
| `Cmd+Enter` / `Ctrl+Enter`（输入中） | 强制发送 / 立刻插入当前轮 |
| `Cmd+Shift+Backspace` | 取消生成 |
| `Shift+Tab`（在输入框） | 轮换 Agent 模式（含 Plan） |
| `Cmd+N` / `Cmd+R` | 新 Chat |
| `Cmd+T` | 新 Chat 标签 |
| `Cmd+[` / `Cmd+]` | 上 / 下一条 Chat |
| `Esc` | 取消输入焦点 |

### Inline Edit / Tab / 终端

| 快捷键 | 作用 |
|--------|------|
| `Cmd+K` / `Ctrl+K` | 打开 Inline Edit |
| `Opt+Enter` / `Alt+Enter` | Inline Edit 里 Quick Question |
| `Tab` | 接受 Tab 建议 |
| `Cmd+→` / `Ctrl+→` | 按词接受 |
| 终端里 `Cmd+K` | 终端提示条 |

旧 stub 把 `Cmd+Shift+K` 写成 Inline Chat、把 `Cmd+L` 只写成「打开 AI Chat」。以本表和官方页为准。

---

## 配置速查

### 文件放哪

| 用途 | 项目（可进 git） | 用户 |
|------|------------------|------|
| Rules | `.cursor/rules/*.mdc` | Customize → Rules |
| AGENTS.md | 仓库根或子目录 `AGENTS.md` | — |
| Commands | `.cursor/commands/*.md` | `~/.cursor/commands/` |
| Skills | `.cursor/skills/<name>/SKILL.md` 或 `.agents/skills/` | `~/.cursor/skills/`、`~/.agents/skills/` |
| Subagents | `.cursor/agents/` | `~/.cursor/agents/` |
| MCP | `.cursor/mcp.json` | Customize / 用户 MCP |
| Hooks | `.cursor/hooks.json` | `~/.cursor/hooks.json` |
| Bugbot 项目说明 | `.cursor/BUGBOT.md` | Dashboard Team rules |
| 忽略 | `.cursorignore`、`.cursorindexingignore` | 用户设置里的全局 ignore |
| 计划（保存到工作区后） | `.cursor/plans/` | 默认在用户主目录 |
| Cloud 环境 | `.cursor/environment.json` | Dashboard Environments / Secrets |
| CLI 配置 | `.cursor/cli.json` | `~/.cursor/cli-config.json` |

兼容：Skills / Subagents 也会扫 `.claude/`、`.codex/` 对应目录。同名时 `.cursor/` 优先。

### Rules frontmatter

| `alwaysApply` | `description` | `globs` | 行为 |
|---------------|---------------|---------|------|
| `true` | — | — | 每次都进。忽略 glob 和 description |
| `false` | — | 有 | 匹配文件在上下文里时自动附上 |
| `false` | 有 | 无 | Agent 按 description 决定 |
| `false` | 无 | 无 | 只有 `@规则名` |

优先级：**Team → Project → User**。全部合并，冲突时更早的源优先。

### 忽略文件

`.cursorignore` 用 gitignore 语法。挡住：语义搜索、Tab / Agent / Inline Edit 可读的代码、`@` 引用。

官方提醒：终端和 MCP **不受** `.cursorignore` 限制。忽略不是密码学保证。

```gitignore
.env
.env.*
**/*.pem
**/secrets.json
dist/
```

只想缩小索引、仍允许 Agent 打开文件：用 `.cursorindexingignore`。

### MCP 字段（stdio）

官方表：

| 字段 | 必需 | 含义 |
|------|------|------|
| `type` | 是 | `"stdio"` |
| `command` | 是 | 可执行文件，需在 PATH 或写绝对路径 |
| `args` | 否 | 参数数组 |
| `env` | 否 | 环境变量 |
| `envFile` | 否 | 再加载的 env 文件 |

插值：`${env:NAME}`、`${userHome}`、`${workspaceFolder}`、`${workspaceFolderBasename}`、`${pathSeparator}` / `${/}`。

远程：`url` + 可选 `auth`（`CLIENT_ID` / `CLIENT_SECRET` / `scopes`）。桌面回调 `http://localhost:8787/callback`；Web / Cloud Agents 回调 `https://www.cursor.com/agents/mcp/oauth/callback`。

### Hooks

配置层优先级：**Enterprise → Team → Project → User**。全部匹配的钩子都跑，冲突按更高层合并。

Agent 钩子（`Cmd+K` / Agent Chat）：`sessionStart` / `sessionEnd`、`preToolUse` / `postToolUse` / `postToolUseFailure`、`subagentStart` / `subagentStop`、`beforeShellExecution` / `afterShellExecution`、`beforeMCPExecution` / `afterMCPExecution`、`beforeReadFile` / `afterFileEdit`、`beforeSubmitPrompt`、`preCompact`、`stop`、`afterAgentResponse` / `afterAgentThought`。

Tab：`beforeTabFileRead` / `afterTabFileEdit`。

应用：`workspaceOpen`。

退出码：`0` 成功；`2` 拦截（等同 `permission: "deny"`）；其他默认 fail-open。安全关键钩子设 `failClosed: true`。

Cloud Agent：只跑仓库里的 command-based hooks；不跑用户级 hooks、不跑 prompt-based hooks。

### Skills frontmatter

| 字段 | 必需 | 含义 |
|------|------|------|
| `name` | 是 | 小写 + 数字 + 连字符，必须等于父目录名 |
| `description` | 是 | Agent 用来判断是否相关 |
| `paths` | 否 | glob，限制何时露出 |
| `disable-model-invocation` | 否 | `true` 时只有 `/name` 才加载 |
| `metadata` | 否 | 任意键值 |

发现路径见上表。也兼容 `.claude/skills/`、`.codex/skills/`。

### CLI `agent`

来源：[Installation](https://cursor.com/docs/cli/installation)、[Overview](https://cursor.com/docs/cli/overview)、[Headless](https://cursor.com/docs/cli/headless)、[Using](https://cursor.com/docs/cli/using)。

| 命令 | 作用 |
|------|------|
| `curl https://cursor.com/install -fsS \| bash` | macOS / Linux / WSL 安装 |
| `irm 'https://cursor.com/install?win32=true' \| iex` | Windows PowerShell 安装 |
| `agent --version` | 验证 |
| `agent` / `agent "…"` | 交互 |
| `agent --mode=ask` | 只读 |
| `agent --mode=plan` / `--plan` | Plan |
| `agent -p "…"` | 无头；默认不落盘 |
| `agent -p --force "…"` | 无头并写文件（`--yolo` 同义） |
| 会话里 `& …` | 交给 Cloud Agent |
| `agent ls` / `agent resume` / `agent --continue` | 恢复会话 |
| `agent update` | 手动更新 |
| `agent --worktree "…"` | 在独立 git worktree 里改 |

脚本鉴权：`CURSOR_API_KEY`。配置路径：全局 `~/.cursor/cli-config.json`，项目 `.cursor/cli.json`（官方 [Configuration](https://cursor.com/docs/cli/reference/configuration)）。

### 模型与套餐（摘要）

细节和单元格价格以 [Models & Pricing](https://cursor.com/docs/models-and-pricing) 为准（页面是动态表）。

- 两个用量池： **Cursor Models**（Grok 4.6 / 4.5、Composer 2.5）和 **Other Models**（第三方，按 API 价）
- 个人档（官方表，税前除非注明）：Start（仅印度，₹649/月）、Pro $20、Pro Plus $60、Ultra $200
- Bugbot、Cloud Agents：Pro 及以上（Start **不含** Bugbot）
- Teams：Standard $40 / 人 / 月，Premium $120 / 人 / 月

<!-- TODO: 待核实 —— 各第三方模型每百万 token 的精确数字；官方页是动态组件，抓取不到单元格 -->

---

## 常见错误

| 症状 | 原因 | 处理 |
|------|------|------|
| `.cursor/rules/foo.md` 不生效 | 规则系统忽略无 frontmatter 的 `.md` | 改成 `.mdc` 或改用 `AGENTS.md` |
| Always 规则把上下文撑满 | 规则太长 / 太多 | 拆开，单条 < 500 行；能 glob 就不要 Always |
| `@` 不到某文件 | `.cursorignore` / `.gitignore` | 查 ignore；官方建议 `git check-ignore -v` |
| 语义搜索空 | 索引未到 80% | Settings → Indexing；检查网络 |
| Plan 仍在写代码 | 社区有报告 | Stop → Restore → 计划里写死「未批准不改文件」 |
| Bugbot check 绿了但还有评论 | 默认 `neutral` | 看评论；要挡合并需 fail-on-unresolved |
| Autofix 不可用 | 无 on-demand 或 Legacy Privacy Mode | 官方 Requirements |
| Cloud 上 hook 不跑 | 写在 `~/.cursor/hooks.json` 或 `type: prompt` | 改成仓库 `.cursor/hooks.json` 的 command hook |
| `agent: command not found` | `~/.local/bin` 不在 PATH | 官方 Installation 的 PATH 步骤 |
| `agent -p` 没改文件 | 无头默认只提出改动 | 加 `--force` / `--yolo` |
| Cloud 任务起不来 | 没接仓库或不是付费计划 | 管理员接 SCM；官方 Troubleshooting |
| MCP 连不上 | command 不在 PATH / 缺 env | Customize 里看服务器日志；用插值不要写死密钥 |
| Tab 乱补 markdown | 该扩展名未禁用 | 状态栏按扩展名 Disable |

---

## 模板

### 项目 `AGENTS.md`

```markdown
# Agent notes

- 包管理器：pnpm。禁止 npm / yarn。
- 检查：`pnpm typecheck`、`pnpm test`。
- 规范组件：`src/components/Button.tsx`。
```

### `hooks.json`（官方 blog 的 stop 循环骨架）

```json
{
  "version": 1,
  "hooks": {
    "stop": [
      {
        "command": "bun run .cursor/hooks/grind.ts"
      }
    ]
  }
}
```

`grind.ts` 从 **stdin 读 JSON**，向 stdout 写 JSON。官方 blog 字段：`conversation_id`、`status`（`completed` | `aborted` | `error`）、`loop_count`。未完成时返回 `{ "followup_message": "..." }` 让 Agent 继续。默认 `loop_limit` 为 5。

### `.cursor/BUGBOT.md`

```markdown
# Bugbot

- 金额用整数分。
- 不要把文案问题报成 bug，除非改变控制流。
```

---

## 高质量信息源

> 写入门槛：打开链接确认存在。整理方法见仓库 [sources/_template.md](https://github.com/zenHeart/learn-ai/blob/master/.claude/skills/doc-research/references/sources/_template.md)。

最后一次系统性核实：2026-08-18。

### 官方文档

- **[Cursor Docs](https://cursor.com/docs)** — 主文档。关键子页见维护参考 [`.claude/skills/doc-research/references/cursor.md`](https://github.com/zenHeart/learn-ai/blob/master/.claude/skills/doc-research/references/cursor.md)
  - 建议访问方式：web-reader 逐页
  - 最后核实：2026-08-18
- **[Cloud Agents](https://cursor.com/docs/cloud-agent)**、**[CLI](https://cursor.com/docs/cli/overview)**、**[Bugbot](https://cursor.com/docs/bugbot)** — 三个独立产品形态
  - 最后核实：2026-08-18
- **[Changelog](https://cursor.com/changelog)** — 编辑器发版
  - 建议访问方式：web-reader / 浏览器
  - 最后核实：2026-08-18
- **[Downloads](https://cursor.com/downloads)** — 安装包
  - 建议访问方式：浏览器
  - 最后核实：2026-08-18

中文镜像：同一路径加 `/cn/`，例如 [cn/docs/rules](https://cursor.com/cn/docs/rules)。

### 官方 Cookbook / 示例 / 其他官方资源

- **[Best practices for coding with agents](https://cursor.com/blog/agent-best-practices)** — 官方怎么用 Plan / Rules / Skills / TDD / Bugbot / 并行
  - 建议访问方式：web-reader
  - 最后核实：2026-08-18
- **[Long-running agents](https://cursor.com/blog/long-running-agents)**、**[Self-driving codebases](https://cursor.com/blog/self-driving-codebases)** — 官方产品长文
  - 建议访问方式：web-reader
  - 最后核实：2026-08-18
- 未发现类似 anthropics/claude-cookbooks 的官方「Cursor Cookbook」仓库。场景示例分散在 docs + blog。

### 官方 / 核心团队社交账号

- **[@cursor_ai](https://x.com/cursor_ai)** — 产品账号。身份：cursor.com 页脚「X」链到此号；发版公告也走这里
  - 层级：产品账号
  - 建议访问方式：Grok CLI / 人工浏览
  - 最后核实：2026-08-18

<!-- TODO: 待核实 —— Anysphere 公司账号、创始人/核心工程师个人账号的官方交叉证明（页脚或员工宣布） -->

### 核心维护者 / 团队 Blog

- **[cursor.com/blog](https://cursor.com/blog)** — 产品与工程
  - 建议访问方式：web-reader
  - 最后核实：2026-08-18

### GitHub 高质量仓库

- Cursor IDE **没有**官方完整源码仓库。不要把第三方 mirror 标成官方。
- **[GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)** — 社区 Figma MCP，旧教程已引用；用前读该仓库当前 README
  - 建议访问方式：zread / 浏览器
  - 最后核实：2026-08-18（仓库存在；安装命令以 README 为准）

### Awesome List / 资源聚合

- **[cursor.directory](https://cursor.directory)** — 社区规则 / MCP 聚合，**不是** Anysphere 官方
  - 建议访问方式：浏览器
  - 最后核实：2026-08-18

### 三方高质量 Blog / 社区

- **[forum.cursor.com](https://forum.cursor.com/)** — 官方论坛，踩坑与功能请求
  - 建议访问方式：浏览器
  - 最后核实：2026-08-18
- **[WorkOS · Bugbot + Claude Code PR](https://workos.com/blog/cursor-bugbot-autoreview-claude-code-prs)** — 启用步骤写得清楚
  - 建议访问方式：web-reader
  - 最后核实：2026-08-18

### 待核实

- Notepad 是否仍为独立产品功能（旧矩阵链 `/docs/context/mentions`）
- `https://cursor.com/docs/reuse-existing-code` 是否还活着
- 创始人 / 核心工程师 X 账号的官方背书链接
- `@modelcontextprotocol/server-filesystem` 是否仍是官方推荐的示例包名（Cookbook 里的 JSON 只演示字段，不锁定包）
