# Codex 速查表

> 这是一份**参考页**——用来查，不要从头读到尾。概念定义在 [Codex 术语表](./codex-glossary)；任务配方在 [Codex Cookbook](./codex-cookbook)。
>
> 下面所有命令、flag、配置键都能在 **`learn.chatgpt.com/docs`** 找到原文（文档已从 `developers.openai.com/codex/*` 迁走，旧地址 308）。核实不了的条目要么删掉，要么显式标注。

## 决策表：我该用哪种模式？

| 场景 | 这样做 | 为什么 |
| --- | --- | --- |
| 读或评审代码，绝不能改 | `codex --sandbox read-only` | 机制上写不了 |
| 日常开发 | 默认 `workspace-write` | 写入限制在工作区 |
| CI 里跑，没人回答审批 | `codex --ask-for-approval never exec "..."` | 不会卡在审批上 |
| 在 monorepo 子目录干活 | `codex --cd services/api` | 把注意力锁在范围内 |
| 需要工作区外的目录 | `codex --add-dir ../shared-lib` | 可重复的 flag |
| 需要真正新鲜的网页信息 | `codex --search` | 实时抓取，而不是缓存索引 |
| 任务结果本身不确定 | `codex cloud exec --env <ID> --attempts 3` | 跑几次，挑最好的 |
| 两套身份 / CI 隔离 | `CODEX_HOME=/path codex ...` | 隔离配置、会话、日志 |
| 在两套配置之间切 | `codex --profile work` | 只切换配置 |
| 发版前评审 | TUI 里 `/review` | 相对 base 分支做 diff |
| 配置看起来没生效 | `/debug-config` | 打印实际生效的层 |

## 术语索引

一行一个词。完整定义在 [术语表](./codex-glossary)——这张表是查找入口，不是第二份定义。

| 术语 | 一句话 | 定义 |
| --- | --- | --- |
| AGENTS.md | 自然语言项目简报，每次运行自动加载 | [→](./codex-glossary#agents-md) |
| Rules | 结构化约束，受信任门控 | [→](./codex-glossary#rules) |
| 沙箱 | 文件和网络访问的硬边界 | [→](./codex-glossary#sandbox) |
| 审批策略 | 行动前要不要问你 | [→](./codex-glossary#approval-policy-and-permissions) |
| 信任级别 | 项目级 `.codex/` 会不会加载 | [→](./codex-glossary#project-trust-and-config-layering) |
| Profile | 用 `--profile` 选中的命名配置包 | [→](./codex-glossary#profiles) |
| MCP | 连接外部工具和数据的协议 | [→](./codex-glossary#mcp-model-context-protocol) |
| Skills | 打包好的可复用工作流 | [→](./codex-glossary#skills) |
| Hooks | 生命周期事件上强制跑的命令 | [→](./codex-glossary#hooks) |
| Plugins | 打包 MCP / Skills / Hooks 的分发格式 | [→](./codex-glossary#plugins) |
| Subagents | 只在你要求时才生成的委派 Agent | [→](./codex-glossary#subagents) |
| Memories | 跨会话回忆偏好 | [→](./codex-glossary#memories) |
| Compaction | 对旧上下文做有损压缩 | [→](./codex-glossary#sessions-and-compaction) |
| Web 搜索模式 | `disabled` / `cached` / `indexed` / `live` 枚举 | [→](./codex-glossary#web-search-modes) |
| `codex exec` | 一次性非交互运行 | [→](./codex-glossary#non-interactive-mode-codex-exec) |
| requirements.toml | 收窄可选范围的管理员策略 | [→](./codex-glossary#requirementstoml-managed-policy) |
| Chat / Work / Codex | 同一应用里的三种工作方式 | [→](./codex-glossary#chat-work-codex) |
| ChatGPT Work | 做到可审成品的知识工作代理 | [→](./codex-glossary#chatgpt-work) |
| Sites | ChatGPT 托管网页和应用（公开测试） | [→](./codex-glossary#sites) |
| Codex Cloud | 托管环境里的并行编程任务 / 托管评审 | [→](./codex-glossary#codex-cloud) |
| Atlas | 已于 2026-08-09 停止的独立浏览器 | [→](./codex-glossary#atlas) |

## 命令参考

### 启动与运行

```bash
codex                                   # 开始交互会话
codex "explain this codebase to me"     # 带初始提示启动
codex --model gpt-5.6 "..."             # 这次运行指定模型
codex --cd services/payments "..."      # 设置工作目录
codex --add-dir ../shared-lib "..."     # 再开放一个目录（可重复）
codex --sandbox read-only "..."         # 只分析，不写
codex --ask-for-approval never "..."    # 从不询问审批
codex --approve-for-me "..."            # 自动审核审批（0.147.0+）
codex --search "..."                    # 实时网页搜索（裸 flag，不带参数）
codex --yolo "..."                      # 完全访问；同时把搜索切到 live
codex --profile work "..."              # 使用命名 profile
codex -c model_reasoning_effort=high    # 覆盖单个配置键
```

### 非交互 / 自动化

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize recent changes"
codex exec resume --last "now add tests for that function"
codex --ask-for-approval never exec "update the changelog"
CODEX_HOME=$(pwd)/.codex codex exec "list active instruction sources"
```

`codex exec` 日志默认 `RUST_LOG=error`。不要用已删除的 `--full-auto`。

### 会话

```bash
codex resume                  # 从列表里选
codex resume --last           # 恢复最近一次
codex resume <SESSION_ID>     # 恢复指定会话
codex resume --all            # 列出全部会话
codex unarchive <SESSION>     # 恢复已归档会话
codex fork                    # 分叉会话
```

会话记录：`~/.codex/sessions/`。ID 来自选择器、`/status`，或这个目录。

### 认证与诊断

```bash
codex login
codex login status            # 已保存凭证时退出码为 0
codex doctor                  # 本地诊断报告
codex logout
```

官方 CLI 参考里没有 `codex status` 子命令。当前会话用 TUI 里的 `/status`。

### 图片

```bash
codex -i screenshot.png "why does this layout break?"
codex --image img1.png,img2.jpg "these two shots show the same bug"
```

支持 PNG 和 JPEG。

### MCP

```bash
codex mcp                     # 从 CLI 管理 MCP 服务器
```

Codex 也能作为 MCP 服务器跑——见 [MCP Server](https://learn.chatgpt.com/docs/mcp-server)。

### Feature flags

```bash
codex features list
codex features enable <flag>
codex features disable <flag>
```

写入 `$CODEX_HOME/config.toml`，**不接受** `--profile`。

### 远程与云端

```bash
codex app-server --listen ws://127.0.0.1:4500     # 在代码所在机器上提供服务
codex --remote ws://127.0.0.1:4500                 # 从别处连入
codex remote-control
codex cloud                                        # 云端 UI（Ctrl+O 露出环境 ID）
codex cloud exec --env <ENV_ID> "..."
codex cloud exec --env <ENV_ID> --attempts 3 "..."  # 1–4 次尝试
```

`--remote` 接受 `ws://`、`wss://`、`unix://`。Bearer token 只在 `wss://` 或仅本机的 `ws://` 上发送。

### Shell 补全

```bash
codex completion bash
codex completion zsh
codex completion fish
```

zsh 报 `command not found: compdef` 时，在 source 补全之前于 `.zshrc` 加 `autoload -Uz compinit && compinit`。

### 调试日志

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

设置 `log_dir` 同时打开明文 `codex-tui.log`。追踪遵守 `RUST_LOG`。

## 斜杠命令

按用途分组。完整清单在[官方参考](https://learn.chatgpt.com/docs/developer-commands?surface=cli)。

| 分组 | 命令 |
| --- | --- |
| 权限与沙箱 | `/permissions`、`/approve`、`/sandbox-add-read-dir`（仅 Windows 原生） |
| 会话生命周期 | `/new`、`/clear`、`/compact`、`/fork`、`/resume`、`/archive`、`/delete`、`/stop`（别名 `/clean`）、`/exit`、`/quit` |
| 检查 | `/status`、`/usage`、`/diff`、`/debug-config`、`/ps`（需要 `unified_exec`）、`/mcp`（`/mcp verbose`） |
| 模型与行为 | `/model`、`/fast`、`/plan`、`/goal`（最多 4000 字符）、`/personality`、`/raw` |
| 扩展 | `/agent`、`/apps`、`/plugins`、`/hooks`、`/skills`、`/memories` |
| 编辑与评审 | `/review`、`/init`、`/import`、`/mention`、`/copy` |
| 外观 | `/theme`、`/statusline`、`/title`、`/keymap`、`/vim`、`/ide` |
| 其他 | `/feedback`、`/logout`、`/experimental` |

`/usage` 接受 `daily`、`weekly`、`cumulative`。`/import` 迁移 Claude Code 或 Cursor 配置，只在本地 TUI 可用。Personality：`friendly`、`pragmatic`、`none`。

## 键盘参考（TUI）

| 键 | 作用 |
| --- | --- |
| `@` | 在工作区根做模糊文件搜索 |
| `!` 前缀 | 在当前审批/沙箱设置下跑一条 shell |
| `$app-slug` | 提及 connector 应用 |
| `Tab` | 排队下一条消息 |
| `Esc` `Esc` | 输入框为空时编辑上一条（`Enter` 从那里 fork） |
| `Up` / `Down` | 草稿历史 |
| `Ctrl+R` | 搜索提示历史 |
| `Ctrl+G` | 打开 `$VISUAL` / `$EDITOR` |
| `Ctrl+L` | 清屏 |
| `Ctrl+O` | 复制最近一次输出（等同 `/copy`） |
| `Ctrl+C` | 中断 / 退出 |

## 配置速查

配置在 `~/.codex/config.toml`（用户层）。Profile 是 `$CODEX_HOME/<name>.config.toml`。

### 权限与沙箱

```toml
approval_policy = "on-request"     # untrusted | on-request | never | { granular = { ... } }
sandbox_mode = "workspace-write"   # read-only | workspace-write | danger-full-access

[sandbox_workspace_write]
writable_roots = ["/tmp/build"]
network_access = false
exclude_slash_tmp = false
exclude_tmpdir_env_var = false

[projects."/path/to/repo"]
trust_level = "trusted"            # trusted | untrusted
```

> `approval_policy = "on-failure"` 已废弃。granular 形态：`{ granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval } }`。

### 模型

```toml
model = "gpt-5.6"
model_reasoning_effort = "medium"   # minimal | low | medium | high | xhigh（仅 Responses API）
model_reasoning_summary = "auto"    # auto | concise | detailed | none
model_verbosity = "medium"          # low | medium | high
model_context_window = 200000
model_auto_compact_token_limit = 150000
review_model = "gpt-5.6"
```

### 网页搜索

```toml
web_search = "cached"     # disabled | cached | indexed | live  （默认 "cached"）
```

`indexed` 仅当搜索索引放行时才允许外部网页访问。裸 `--search` 等同 `live`。`--yolo` / 完全访问默认把搜索切到 live。

旧 feature flag `features.web_search`、`features.web_search_cached`、`features.web_search_request` 已废弃——用顶层 `web_search` 枚举。

### MCP 服务器

```toml
# STDIO
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
startup_timeout_sec = 10
tool_timeout_sec = 60

# Streaming HTTP
[mcp_servers.internal-api]
url = "https://mcp.example.com/sse"
bearer_token_env_var = "INTERNAL_API_TOKEN"
enabled = true
default_tools_approval_mode = "prompt"   # auto | prompt | approve
enabled_tools = ["search", "read"]
```

> `mcp_servers` 是**以 id 为键的 table**。没有 `name` 键，也没有 `type` 键，也不是 array-of-tables。

### 上下文与指令文件

```toml
project_doc_max_bytes = 65536                                # 默认 32 KiB
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

### 传给子进程的环境变量

```toml
[shell_environment_policy]
inherit = "core"            # all | core | none
include_only = ["PATH", "HOME", "LANG"]
exclude = ["AWS_*", "*_SECRET"]
set = { CI = "1" }
ignore_default_excludes = false
```

### Subagents

```toml
[agents]
max_depth = 1
max_threads = 6
job_max_runtime_seconds = 1800

[agents.reviewer]
description = "read-only adversarial reviewer"
config_file = "reviewer.config.toml"
```

### Hooks

```toml
[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = ["pnpm", "lint", "--fix"]
command_windows = ["pnpm.cmd", "lint", "--fix"]
```

事件：`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`。目前只有 command hook 会执行。

### Feature flags 与杂项

```toml
[features]
memories = false        # 默认关
multi_agent = true
hooks = true
fast_mode = true
undo = false

personality = "pragmatic"      # none | friendly | pragmatic
commit_attribution = "Codex <noreply@openai.com>"
hide_agent_reasoning = false
log_dir = "~/.codex/log"

[history]
persistence = "save-all"       # save-all | none

[tui]
vim_mode_default = false
theme = "dark"
```

### Profile

```toml
# ~/.codex/work.config.toml
model = "gpt-5.6"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
```

```bash
codex --profile work
```

### 项目层覆盖不了的键

出现在 `.codex/config.toml` 时会被 **忽略**：

`openai_base_url`、`chatgpt_base_url`、`apps_mcp_product_sku`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`、`experimental_realtime_ws_base_url`、`otel`

## 系统要求

| 项 | 要求 |
| --- | --- |
| macOS | 12 或更高 |
| Linux | Ubuntu 20.04+ / Debian 10+ |
| Windows | Windows 11 + WSL2 |
| Git | 2.23+（可选） |
| RAM | 最低 4 GB，建议 8 GB |

来源：[`openai/codex` docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md)

## 常见问题

| 现象 | 常见原因 | 怎么办 |
| --- | --- | --- |
| `.codex/config.toml` 没作用 | 项目未被信任，或该键不能在项目层设 | 设 `projects.<path>.trust_level = "trusted"`；核对接忽略键；跑 `/debug-config` |
| provider / base-URL 被忽略 | 项目层覆盖不了机器本地 provider 键 | 挪到 `~/.codex/config.toml` |
| AGENTS.md 被无视 | 合并体积撞上 32 KiB，或被 `AGENTS.override.md` 盖住 | 删短或提高上限；检查 override |
| 不停停下来问 | `approval_policy` 对当前场景太严 | 自动化用 `--ask-for-approval never`，TUI 里 `/permissions` |
| 评审时改了文件 | 沙箱允许写入 | `--sandbox read-only` |
| 网页结果像过期的 | `web_search` 默认 `cached` | 裸 `--search`，或设 `web_search = "live"` |
| 会话中后段质量下滑 | 上下文饱和或被压缩 | 新任务 `/clear`，或 `/compact` 后再继续 |
| `[[mcp_servers]]` 解析失败 | TOML 形状错了 | 用 `[mcp_servers.<id>]` |
| zsh 报 `compdef: command not found` | 没加载 `compinit` | 加 `autoload -Uz compinit && compinit` |
| 托管 permission profile 没生效 | 客户端 ≤ 0.137.0 | 升到 0.138.0+ |
| 想看加载了哪些指令 | — | `codex --ask-for-approval never "Summarize the current instructions."` 或打开 `log_dir` |

## 模板

### 最小 AGENTS.md

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

## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

### 日常 config.toml

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

### 只读评审 profile

```toml
# ~/.codex/review.config.toml
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "never"
```

```bash
codex --profile review "review the uncommitted changes and list only real defects"
```

### CI 调用

```bash
codex --ask-for-approval never exec --json \
  "run the test suite; if anything fails, fix it and re-run until green"
```

## 高质量信息源

本教程对照下面这些来源维护。这里和它们不一致时，以它们为准。

### 官方文档

| 来源 | 用来查什么 |
| --- | --- |
| [Codex 文档根](https://learn.chatgpt.com/docs) | 下面所有页面的入口 |
| [Quickstart](https://learn.chatgpt.com/docs/quickstart) | 从安装到第一次运行 |
| [Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference) | **每个配置键的权威**，含 `requirements.toml` |
| [Environment Variables](https://learn.chatgpt.com/docs/config-file/environment-variables) | `CODEX_HOME` 等 |
| [Permissions](https://learn.chatgpt.com/docs/permissions) | 审批策略与 permission profile |
| [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) | 沙箱模式 |
| [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | 指令链发现与合并顺序 |
| [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) | 结构化约束 |
| [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) | `[agents]` 段 |
| [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) | 接外部工具 |
| [MCP Server](https://learn.chatgpt.com/docs/mcp-server) | Codex 作为 MCP 服务器 |
| [Hooks](https://learn.chatgpt.com/docs/hooks) | 生命周期事件 |
| [Plugins](https://learn.chatgpt.com/docs/plugins) | 打包与分发 |
| [Skills](https://learn.chatgpt.com/docs/build-skills) | 编写 skill |
| [Slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | 命令权威清单 |
| [CLI](https://learn.chatgpt.com/docs/codex/cli) | CLI 入口 |
| [IDE Extension](https://learn.chatgpt.com/docs/codex/ide) | 编辑器入口 |
| [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode) | `codex exec` |
| [App Server](https://learn.chatgpt.com/docs/app-server) | 远程控制 |
| [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk) | 程序化调用 |
| [GitHub Action](https://learn.chatgpt.com/docs/github-action) | CI 集成 |
| [Models](https://learn.chatgpt.com/docs/models) | 模型列表与推理强度 |
| [Prompting](https://learn.chatgpt.com/docs/prompting) | 提示词指导 |
| [Memories](https://learn.chatgpt.com/docs/customization/memories?surface=app) | 跨会话记忆 |
| [Pricing](https://learn.chatgpt.com/docs/pricing) | **套餐和配额的唯一来源**——数字会变，去那里看 |
| [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) | Chat / Work / Codex 怎么选 |
| [Get started with Work](https://learn.chatgpt.com/docs/get-started-with-work) | ChatGPT Work |
| [Codex cloud](https://learn.chatgpt.com/docs/cloud) | 托管编程环境 |
| [What's new](https://learn.chatgpt.com/docs/whats-new) | 周报级能力变化（含 Sol 托管评审） |
| [Evolving Atlas](https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work) | Atlas 官方下线说明 |
| [Sites](https://learn.chatgpt.com/docs/sites) | 发布站点 |
| [Glossary](https://learn.chatgpt.com/docs/glossary) | 官方术语 |
| [Best practices](https://learn.chatgpt.com/guides/best-practices) | 官方最佳实践 |
| [Import](https://learn.chatgpt.com/docs/import) | 从 Claude Code / Cursor 迁入 |

> 文档页带 `?surface=cli|app|ide` 选择器。页面看起来像在讲另一个产品时，先看当前 surface。

### 发版追踪

| 来源 | 用来查什么 |
| --- | --- |
| [Changelog](https://learn.chatgpt.com/docs/changelog) | 发了什么 |
| [Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity) | 哪些功能是实验性的 |
| [openai/codex releases](https://github.com/openai/codex/releases) | 版本号和二进制 |
| [openai/codex issues](https://github.com/openai/codex/issues) | 已知 bug 和规避 |
| [docs/install.md](https://github.com/openai/codex/blob/main/docs/install.md) | 系统要求与源码构建 |

稳定版大约每周一个 minor（`0.145.0` → `0.146.0` → `0.147.0`），每天有 `0.x.0-alpha.N` 预发布。版本敏感声明至少每两周核对一次。

```bash
gh release list --repo openai/codex --exclude-pre-releases --limit 5
```

### GitHub 高质量仓库

| 仓库 | 用途 |
| --- | --- |
| [openai/codex](https://github.com/openai/codex) | CLI 源码、Issues、Releases |
| [openai/codex-action](https://github.com/openai/codex-action) | 官方 GitHub Action |

### 待核实

<!-- TODO: 待核实 --> 社区账号、Awesome List、中文三方 Blog 条目未放入主表。只收录本轮能直接打开并核对过的官方页面与仓库。

## 相关页面

- [Codex 术语表](./codex-glossary) — 概念是什么、为什么
- [Codex Cookbook](./codex-cookbook) — 面向任务的配方
- [Codex CLI](./codex-cli) — 从安装到核心功能
- [项目集成](./integration) — 接到真实项目
- [学习地图](./) — 完整路径
