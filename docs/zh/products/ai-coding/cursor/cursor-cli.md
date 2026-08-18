# Cursor CLI

Cursor CLI 是同一套编程 Agent 的**终端形态**：交互会话，或给脚本 / CI 的 print 模式。二进制是 **`agent`**，不是 `cursor`，也不是 Origin CLI 的 `origin`。

> 官方：[CLI overview](https://cursor.com/docs/cli/overview)、[Installation](https://cursor.com/docs/cli/installation)、[Using](https://cursor.com/docs/cli/using)、[Headless](https://cursor.com/docs/cli/headless)。
>
> CI 复制粘贴配方留在 [Cookbook](./cursor-cookbook#终端和-ci-里用-cursor-cli)。

## 先决条件

- macOS、Linux、WSL 或 Windows PowerShell
- 一个你愿意让它改的 git checkout
- 脚本 / CI：Dashboard 里的 `CURSOR_API_KEY`

## 学习目标

读完本页你能：

1. 装好 `agent`，交互跑一轮
2. 和编辑器一样切换 Agent / Plan / Ask
3. 无头用 `-p`，真正要写盘再加 `--force`
4. 用 `&` 交给 Cloud，并且不把 `agent` 和 `origin` 搞混

---

## 安装

```bash
# macOS, Linux, WSL
curl https://cursor.com/install -fsS | bash

# Windows PowerShell
irm 'https://cursor.com/install?win32=true' | iex

agent --version
```

找不到 `agent` 就把 `~/.local/bin` 加进 `PATH`（bash：`~/.bashrc`；zsh：`~/.zshrc`）。更新：`agent update`（默认会自动更新）。

## 交互模式

```bash
agent
agent "refactor the auth module to use JWT tokens"
```

Agent 可以写、审、改代码。命令过来时你批准。

### 模式

和编辑器同一套。用斜杠命令、`Shift+Tab` 或 `--mode` 切换。

| 模式 | 干什么 | 怎么开 |
|------|--------|--------|
| **Agent** | 完整工具，做编码任务 | 默认 |
| **Plan** | 先设计；会问澄清问题 | `Shift+Tab`、`/plan`、`--plan`、`--mode=plan` |
| **Ask** | 只读探索 | `/ask`、`--mode=ask` |

Debug Mode 是**编辑器**约束。不要编一个 CLI `--mode=debug`。

### 会话附加能力（官方）

| 动作 | 怎么做 |
|------|--------|
| 交给 Cloud | 消息前加 `&` |
| 以前的对话 | `agent ls` |
| 最近一次 | `agent resume` 或 `agent --continue` |
| 指定 id | `agent --resume="chat-id-here"` |
| 审 diff | `Ctrl+R`（再按 `i` 跟进） |
| 换行 | `Shift+Enter`（tmux 里用 `Ctrl+J`） |
| 退出 | `Ctrl+D` 两次 |
| `@` 文件 / 文件夹 | 和编辑器同一思路 |
| 压缩上下文 | `/summarize`（`/compress` 是别名） |
| Worktree | `agent --worktree "…"`（名字可选；在 `~/.cursor/worktrees/` 下） |

```bash
# 会话中途 → Cloud Agent
& refactor the auth module and add comprehensive tests
```

之后在 [cursor.com/agents](https://cursor.com/agents) 或手机上接着看。

沙箱：`/sandbox` 或 `--sandbox <mode>`（`enabled` / `disabled`）。设置会保留。Sudo：CLI 弹出遮罩密码框；**模型看不到**密码。

## 非交互 / CI

脚本和 CI 用 **print 模式**（`-p` / `--print`）。

```bash
export CURSOR_API_KEY=your_api_key_here

agent -p "find and fix performance issues" --model "gpt-5"
agent -p "review these changes for security issues" --output-format text
```

### `-p` 会不会写文件？

脚本契约以专门的 [Headless](https://cursor.com/docs/cli/headless) 页为准：

```bash
# 只提议 — 不改文件
agent -p "Add JSDoc comments to this file"

# 不确认，直接落盘
agent -p --force "Refactor this code to use modern ES6+ syntax"
```

`--force` 才是写开关。HTML 版 Headless 还写了别名 **`--yolo`**。该页的 `.md` 快照只点名 `--force`。

`cli/using.md` 仍写 “Cursor has full write access in non-interactive mode.” CI 请跟 Headless，**要改磁盘就加 `--force`**。

脚本用 `CURSOR_API_KEY` 认证。输出：`--output-format text`（`-p` 默认）、`json` 或 `stream-json`。

```bash
agent -p --force --output-format text \
  "Review recent changes and write feedback to review.txt"
```

## Rules、MCP、ACP

CLI 从 `.cursor/rules` 加载和编辑器同一套 [rules](https://cursor.com/docs/rules)。也会读根目录 **`AGENTS.md`** 和 **`CLAUDE.md`**。

MCP 来自项目的 **`mcp.json`**（和编辑器同一批 server）。Cloud Agents 用 cursor.com/agents 上的**团队** MCP 列表 — 来源不同。

ACP：`agent acp` 把 Cursor CLI 当成 ACP server，走 `stdio`（JSON-RPC）。JetBrains 也走 ACP — [JetBrains](https://cursor.com/docs/integrations/jetbrains)。

## `agent` 和 `origin`

| 二进制 | 产品 | 教程 |
|--------|------|------|
| **`agent`** | 编程 Agent（本页） | 你在这里 |
| **`origin`** | git forge CLI | [Origin](./origin) |

不要跑完 `curl https://cursor.com/install` 还指望得到 git 托管。那次安装是 **`agent`**。

## 什么时候用

- 人已经在 tmux / SSH / CI 任务里
- 想要同一套 Rules / `AGENTS.md`，不想开 GUI
- 需要 worktree（`--worktree`），别让 Agent 改当前 checkout

Tab、Inline Edit、Debug Mode 留在编辑器。[Cloud Agents](./cloud-agents) 适合笔记本该睡觉的时候。调用方是**你自己的** TypeScript / Python 进程时用 [SDK](./cursor-sdk)。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 终端里敲 `cursor` | 二进制是 **`agent`** |
| CI 里 `agent -p` 文件没变 | 加 **`--force`**（Headless 页） |
| 只信 `using.md` 的 “full write access” | 跟 **Headless** + `--force` |
| 指望 Debug Mode | 只有编辑器有 |
| 和 Origin CLI 搞混 | forge 是 `origin` |
| 交给 Cloud 却忘了 `&` | `& refactor …` |
| 以为用的是 Cloud 团队 MCP | CLI 读的是**项目 `mcp.json`** |

## 下一步

- [Cookbook · CLI](./cursor-cookbook#终端和-ci-里用-cursor-cli) — CI 片段
- [Cloud Agents](./cloud-agents) — `&` 的落点
- [Cursor SDK](./cursor-sdk) — 同一 Agent，进进程
- 官方：[Overview](https://cursor.com/docs/cli/overview)、[Installation](https://cursor.com/docs/cli/installation)、[Using](https://cursor.com/docs/cli/using)、[Headless](https://cursor.com/docs/cli/headless)
