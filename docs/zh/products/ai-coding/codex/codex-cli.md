# Codex CLI

> 这是一份**教程**——按顺序读一遍。目标是：从零安装，到一套你敢交给真实仓库的沙箱配置。
>
> 读完之后，具体任务去 [Cookbook](./codex-cookbook)，查 flag 去 [速查表](./codex-cheatsheet)，问「为什么这样设计」去 [术语表](./codex-glossary)。
>
> 下面所有命令、flag、配置键都能在 `learn.chatgpt.com/docs` 找到原文。旧地址 `developers.openai.com/codex/*` 会 308 过去。

## 你在装什么

Codex 是 Agent，不是补全。你用自然语言下任务；它读文件、跑命令、改代码、再回报。让它在真实仓库里可用的三件事——也是本页要配齐的三件事：

1. **沙箱**：从机制上限制它能写到哪里。
2. **审批策略**：决定什么时候停下来问你。
3. **`AGENTS.md`**：把项目规则写下来，避免每个会话重复解释。

少任何一件，Codex 仍能跑，但你会要么不敢用，要么整天点确认。

## 先决条件

| 项 | 要求 |
| --- | --- |
| macOS | 12 或更高 |
| Linux | Ubuntu 20.04+ / Debian 10+ |
| Windows | Windows 11 + WSL2 |
| Git | 2.23+（可选） |
| RAM | 最低 4 GB，建议 8 GB |

来源：[`openai/codex` docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md)

Windows 注意：官方支持路径是 WSL2，不是原生 PowerShell。沙箱依赖操作系统原语，Linux 那套在 WSL2 里才有。

## 第 1 步 — 安装

跨平台走 npm：

```bash
npm install -g @openai/codex
codex --version
```

macOS 的 Homebrew **cask 名是 `codex`**（不是 `openai-codex`，也不需要自定义 tap）：

```bash
brew install --cask codex
codex --version
```

已对照当前 Homebrew cask（`homebrew/homebrew-cask` 的 `Casks/c/codex.rb`），发布的是 CLI 0.147.0。官方安装文档仍以 npm 为首选；选你信任的渠道即可。

## 第 2 步 — 登录

官方产品落地页写明：ChatGPT Plus、Pro、Business、Edu、Enterprise 包含 Codex。不用单独买，日常 CLI 也不用先配 API Key。

```bash
codex login           # 打开浏览器，用 ChatGPT 账号登录
codex login status    # 已保存凭证时退出码为 0
codex doctor          # 本地诊断（安装、认证、配置、运行时）
codex logout
```

`codex login status` 是文档里的认证检查。当前会话的账号、模型、配置，用 TUI 里的 `/status`。

> 官方 CLI 参考里没有 `codex status` 子命令。更老的教程写的 `codex status` / `codex auth status` 不在 [developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) 里。

套餐和配额见 [ChatGPT 套餐与 Codex 访问](./chatgpt-plus)。本教程不写数字，因为会变。

## 第 3 步 — 第一次会话

挑一个你已经熟悉的仓库。第一次以读为主。

```bash
cd ~/code/some-project
codex --sandbox read-only "explain how this project is structured, and where the entry points are"
```

`--sandbox read-only` 从机制上禁止写入，所以你先看到的是推理，不是改文件。适应之后去掉这个 flag：默认是 `workspace-write`。

```bash
codex                                        # 交互会话，默认沙箱
codex "add a test for the date parser"       # 带初始提示的交互会话
codex --model gpt-5.6 "..."                  # 这次运行指定模型
codex --cd services/payments "..."           # 把工作目录锁到 monorepo 子目录
codex --add-dir ../shared-lib "..."          # 再开放一个目录（可重复）
```

`--cd` 是 monorepo 能用的关键。指到 `services/api` 而不是仓库根，注意力和写入都会留在任务所在处。

## 第 4 步 — 在 TUI 里工作

交互会话是日常主场。这些快捷键会改变手感：

| 键 | 作用 |
| --- | --- |
| `@` | 在工作区根做模糊文件搜索 |
| `!` 前缀 | 在当前审批/沙箱设置下跑一条 shell |
| `$app-slug` | 提及一个 connector 应用 |
| `Tab` | Codex 还在干活时排队下一条消息 |
| `Esc` `Esc` | 输入框为空时编辑上一条消息（`Enter` 从那里 fork） |
| `Up` / `Down` | 草稿历史 |
| `Ctrl+R` | 搜索提示历史 |
| `Ctrl+G` | 打开 `$VISUAL` / `$EDITOR` |
| `Ctrl+L` | 清屏 |
| `Ctrl+O` | 复制最近一次输出（等同 `/copy`） |
| `Ctrl+C` | 中断 / 退出 |

尽早内化两个：`@` 用来精确点文件，`@src/auth/session.ts` 比「那个 session 文件」准得多；`Esc` `Esc` 是提示写砸时的恢复动作——改完 fork，不要在坏回合上再叠一句纠正。

## 第 5 步 — 斜杠命令

斜杠命令控制会话本身。完整清单在[官方参考](https://learn.chatgpt.com/docs/developer-commands?surface=cli)；日常会反复用的是这些：

| 分组 | 命令 |
| --- | --- |
| 权限与沙箱 | `/permissions`、`/approve`、`/sandbox-add-read-dir`（仅 Windows 原生） |
| 会话生命周期 | `/new`、`/clear`、`/compact`、`/fork`、`/resume`、`/archive`、`/delete`、`/stop`（别名 `/clean`）、`/exit`、`/quit` |
| 检查 | `/status`、`/usage`、`/diff`、`/debug-config`、`/ps`（需要 `unified_exec`）、`/mcp` |
| 模型与行为 | `/model`、`/fast`、`/plan`、`/goal`（最多 4000 字符）、`/personality`、`/raw` |
| 扩展 | `/agent`、`/apps`、`/plugins`、`/hooks`、`/skills`、`/memories` |
| 编辑与评审 | `/review`、`/init`、`/import`、`/mention`、`/copy` |
| 外观 | `/theme`、`/statusline`、`/title`、`/keymap`、`/vim`、`/ide` |
| 其他 | `/feedback`、`/logout`、`/experimental` |

三个杠杆最大：

- **`/init`** 根据仓库推断生成一份起始 `AGENTS.md`。从这里开始，不要从空白文件开始。
- **`/review`** 相对 base 分支做 diff 并评审。值得养成推代码前的习惯。
- **`/debug-config`** 打印实际生效的配置层。所有「为什么我的配置没生效」最后都走到这里。

`/usage` 接受 `daily`、`weekly`、`cumulative`。`/import` 迁移 Claude Code 或 Cursor 的配置，只在本地 TUI 可用（桌面应用还能导入 Claude Cowork）。Personality 取值是 `friendly`、`pragmatic`、`none`。

## 第 6 步 — 配置

配置在 `~/.codex/config.toml`。一份能日常用的起点：

```toml
model = "gpt-5.6"
model_reasoning_effort = "medium"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"

[sandbox_workspace_write]
network_access = false

[projects."/Users/you/work/my-repo"]
trust_level = "trusted"
```

把这段读成四个决定：

**`sandbox_mode`** — `read-only`、`workspace-write` 或 `danger-full-access`。这是硬边界，不是建议。日常默认用 `workspace-write`；评审用 `read-only`。

**`approval_policy`** — `untrusted`、`on-request`、`never`，或 granular 表。交互默认 `on-request`。没人值守的自动化用 `never`。（`on-failure` 已废弃。）

**`web_search`** — `disabled`、`cached`（默认）、`indexed` 或 `live`。缓存结果来自 OpenAI 维护的索引，不是实时抓取。查变动很快的库时，加裸 `--search` 或改成 `live`。

**`trust_level`** — 静默失效通常出在这里。项目自己的 `.codex/config.toml` 在项目被信任之前**完全不加载**。项目配置看起来没作用，先查这个。

### 推理强度

```toml
model_reasoning_effort = "medium"   # minimal | low | medium | high | xhigh
```

`xhigh` 需要 Responses API。强度要匹配任务：一行重命名开 `high` 是浪费，隐蔽并发 bug 开 `low` 是假节约。

### Profile

Profile 是命名配置包，文件是 `$CODEX_HOME/<name>.config.toml`：

```toml
# ~/.codex/review.config.toml
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "never"
```

```bash
codex --profile review "review the uncommitted changes and list only real defects"
```

只读 + 从不询问，是要记住的组合：改不了文件，也不会打断你，可以放心对着不信任的代码。

### 哪些环境变量会传给子进程

```toml
[shell_environment_policy]
inherit = "core"            # all | core | none
include_only = ["PATH", "HOME", "LANG"]
exclude = ["AWS_*", "*_SECRET"]
set = { CI = "1" }
```

这是防止凭证漏进子进程的机制。shell 里有密钥时，要刻意配，不要全盘继承。

### 项目层覆盖不了的键

出现在项目级 `.codex/config.toml` 时会被**忽略**：

`openai_base_url`、`chatgpt_base_url`、`apps_mcp_product_sku`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`、`experimental_realtime_ws_base_url`、`otel`

用意很直接：clone 来的仓库不能把你的 Agent 改道到别人的端点。这些键放 `~/.codex/config.toml`。

## 第 7 步 — 写 AGENTS.md

`AGENTS.md` 是每次运行都会加载的自然语言简报。它的工作是让你不用每个会话重复解释同一三件事。

```markdown
# Project conventions

## Tooling
- Package manager: pnpm. Do not use npm or yarn.
- Tests: `pnpm test`. Type check: `pnpm typecheck`.

## Boundaries
- Do not modify `legacy/` — it is being decommissioned.
- Schema changes must also update `types/db.ts`.

## Verification
- Run `pnpm test` and `pnpm typecheck` after any change and report the output.
```

值得写进去的：只有团队才知道的命令、目录树上看不出来的边界、你希望它不问就跑的验收步骤。不该写的：linter 已经在强制的规则，或一篇代码质量散文。

合并后的指令文件受 `project_doc_max_bytes` 限制——默认 32 KiB。超出部分会被丢掉，这是「Codex 没理我的 AGENTS.md」最常见的原因。

```toml
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

嵌套目录的发现和合并顺序见[官方 AGENTS.md 参考](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。

## 第 8 步 — 非交互模式

`codex exec` 是同一个 Agent，没有 TUI——跑一次就退出。脚本和 CI 用这个。

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize recent changes"
codex exec resume --last "now add tests for that function"
codex --ask-for-approval never exec "update the changelog"
```

CI 里 `--ask-for-approval never` 是必须的：没有人会回答审批，否则最后一定挂死。`exec` 的日志默认 `RUST_LOG=error`。

不要用 `--full-auto`。0.147.0 changelog 已删除废弃的 `codex exec --full-auto`；新脚本应显式写 `--sandbox workspace-write`（再加审批 flag）。官方非交互文档里若仍提到 `--full-auto`，只是兼容残留并会打印警告。

```bash
codex --ask-for-approval never exec --json \
  "run the test suite; if anything fails, fix it and re-run until green"
```

完整工作流见 [项目集成](./integration)。

## 第 9 步 — 会话

会话会持久化，关终端也不会丢长任务。

```bash
codex resume                  # 从列表里选
codex resume --last           # 恢复最近一次
codex resume <SESSION_ID>
codex resume --all            # 列出全部会话
codex fork                    # 从会话分叉
codex unarchive <SESSION>
```

会话记录在 `~/.codex/sessions/`。ID 来自选择器、`/status`，或这个目录。

会话变长后，旧上下文会被 compaction（有损压缩）。这就是长对话后半段质量下滑的原因。不相关的任务用 `/clear` 开干净的，比扛着死上下文更便宜、也更好。

## 第 10 步 — 扩展

基础稳了之后，四个扩展点值得知道。细节在各自页面；这里只让你知道它们存在。

**MCP 服务器** 把 Codex 接到外部工具和数据。

```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
startup_timeout_sec = 10
tool_timeout_sec = 60

[mcp_servers.internal-api]
url = "https://mcp.example.com/sse"
bearer_token_env_var = "INTERNAL_API_TOKEN"
enabled = true
```

> `mcp_servers` 是**以 id 为键的 table**。不是 array-of-tables——`[[mcp_servers]]` 会解析失败——也没有 `name` 或 `type` 键。

用 `codex mcp` 管理。Codex 也能**作为** MCP 服务器跑，让别的 Agent 调用它。

**Hooks** 在生命周期事件上强制跑命令：

```toml
[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = ["pnpm", "lint", "--fix"]
command_windows = ["pnpm.cmd", "lint", "--fix"]
```

事件：`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`。目前只有 command hook 会执行。

**Subagents** 把工作委派给另一份配置的独立 Agent，只有你明确要求时才生成：

```toml
[agents]
max_depth = 1
max_threads = 6
job_max_runtime_seconds = 1800

[agents.reviewer]
description = "read-only adversarial reviewer"
config_file = "reviewer.config.toml"
```

**Feature flags** 开关默认关闭的能力：

```bash
codex features list
codex features enable <flag>
codex features disable <flag>
```

这些写入 `$CODEX_HOME/config.toml`，**不接受** `--profile`。`memories` 默认关闭。

## 出问题时

| 现象 | 常见原因 | 怎么办 |
| --- | --- | --- |
| `.codex/config.toml` 没作用 | 项目未被信任，或该键不能在项目层设 | 设 `projects.<path>.trust_level = "trusted"`；核对接忽略键列表；跑 `/debug-config` |
| `AGENTS.md` 被无视 | 合并体积撞上 `project_doc_max_bytes`，或被 `AGENTS.override.md` 盖住 | 删短或提高上限；检查 override 文件 |
| 不停停下来问 | `approval_policy` 对当前场景太严 | 自动化用 `--ask-for-approval never`，TUI 里用 `/permissions` |
| 评审时改了文件 | 沙箱允许写入 | `--sandbox read-only` |
| 网页结果像过期的 | `web_search` 默认 `cached` | 裸 `--search`，或设 `web_search = "live"` |
| 会话中后段质量下滑 | 上下文饱和或被压缩 | 新任务 `/clear`，或 `/compact` 后再继续 |
| `[[mcp_servers]]` 解析失败 | TOML 形状错了 | 用 `[mcp_servers.<id>]` |
| zsh 报 `compdef: command not found` | 没加载 `compinit` | 在 `.zshrc` 里加 `autoload -Uz compinit && compinit` |
| 托管 permission profile 没生效 | 客户端 ≤ 0.137.0 | 升到 0.138.0+ |

需要看它实际在干什么时，打开文件日志：

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

设置 `log_dir` 同时会打开明文 `codex-tui.log`。追踪遵守 `RUST_LOG`。

顺手装上补全：

```bash
codex completion zsh     # 还有 bash、fish
```

## 接下来去哪

现在 Codex 已安装、已登录、有沙箱、有配置、也有项目简报。自然下一步：

- [Codex Cookbook](./codex-cookbook) — 具体任务配方
- [项目集成](./integration) — 真实仓库里的 `AGENTS.md`、MCP、CI
- [Codex 术语表](./codex-glossary) — flag 背后的概念
- [Codex 速查表](./codex-cheatsheet) — 一页纸查询
- [Codex 产品线](./codex-ai) — IDE、应用、云端
- [学习地图](./) — 完整路径

## 官方来源

- [Quickstart](https://learn.chatgpt.com/docs/quickstart) — 从安装到第一次运行
- [CLI](https://learn.chatgpt.com/docs/codex/cli) — CLI 入口
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) — 每个配置键
- [Permissions](https://learn.chatgpt.com/docs/permissions) 与 [Sandboxing](https://learn.chatgpt.com/docs/sandboxing)
- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- [docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md) — 系统要求与源码构建
