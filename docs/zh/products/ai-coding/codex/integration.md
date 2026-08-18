# 项目集成

> 把 Codex 接到真实项目：指令文件、配置层、MCP、CI、团队落地。假设 CLI 已经能跑——还没装的话先看 [Codex CLI](./codex-cli)。
>
> 一次性任务配方去 [Cookbook](./codex-cookbook)。本页讲能留下来的配置。

## 先看：一个配好的项目长什么样

```
your-project/
├── AGENTS.md              # 约定和边界，提交进仓库
├── .codex/
│   └── config.toml        # 项目级设置，提交（仅信任后加载）
└── .github/workflows/
    └── codex.yml          # 如果你要自动化
```

再加一件**不要提交**的本机事项：在你自己的 `~/.codex/config.toml` 里给项目标信任。

```toml
# ~/.codex/config.toml
[projects."/absolute/path/to/your-project"]
trust_level = "trusted"     # trusted | untrusted
```

**这一步最容易漏。** 项目级 `.codex/`——配置、hooks、rules——只对已信任项目加载。`.codex/config.toml` 提交得再完整，每个开发者没在自己机器上标信任，它就等于不存在。用 `/debug-config` 看实际生效的层。

## AGENTS.md

### 它是什么

Codex 动手前会读的自然语言简报。每次运行重建指令链——没有缓存要清，改完下次调用就生效。

不想从零写，用 `/init` 生成起始文件。

### 发现与合并顺序

值得精确理解，因为它决定哪份文件赢。

**全局。** 在 Codex home（默认 `~/.codex`，或 `CODEX_HOME`）读 `AGENTS.override.md`（若存在），否则读 `AGENTS.md`。这一层只用第一份非空文件。

**项目。** 从项目根（通常是 Git 根）往下走到当前目录。每个目录依次检查 `AGENTS.override.md`、`AGENTS.md`、以及 `project_doc_fallback_filenames` 里的名字。每个目录最多一份。找不到项目根时，只检查当前目录。

**合并。** 文件从根到当前目录拼接，中间空行分隔。**离当前目录越近的越靠后，因此覆盖前面的指导。**

空文件跳过。合并体积到达 `project_doc_max_bytes`（**默认 32 KiB**）就停止追加。超出部分静默丢弃，这是「某条 AGENTS.md 规则像被无视」最常见的原因。

```toml
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

home 里的 `AGENTS.override.md` 适合临时个人覆盖，不用改真正的那份文件。

### 能用的 monorepo 布局

```
monorepo/
├── AGENTS.md                    # 处处成立的事实
├── packages/
│   ├── api/AGENTS.md            # API 专属，覆盖根
│   └── web/AGENTS.md            # web 专属，覆盖根
```

根文件只写共享事实：

```markdown
# Monorepo conventions

## Tooling
- pnpm workspaces. Never npm or yarn.
- Turborepo drives builds: `pnpm build` at the root.
- TypeScript strict mode everywhere.

## Cross-package rules
- A change to `packages/shared` requires running the full test suite, not just
  the package's own tests.
- Never import from another package's `src/` — use its public entry point.

## Verification
- Run `pnpm test && pnpm typecheck` after any change and report the output.
```

包文件只写不同的部分：

```markdown
# packages/api

## Stack
- Fastify, Prisma, PostgreSQL.

## Rules
- Every route needs a Zod schema. No untyped request bodies.
- Schema changes require a migration in `prisma/migrations/` — never edit an
  existing migration.

## Verification
- `pnpm --filter api test` must pass.
```

包文件在根文件之后加载，冲突时包文件赢。这就是表达「一般来说 X，但这个包是 Y」的方式。

### 写什么，不写什么

写：

- 工具事实：包管理器、测试命令、类型检查
- 边界：别碰的目录、生成文件
- 读一个文件看不出来的约定
- 你总希望它跑的验收步骤
- 放在 `## Code Review Rules` 下的评审规则

不写：

- 每个任务都变的要求——那属于提示词
- 长篇架构散文——吃预算，很少改变行为
- linter 已经在强制的规则
- 密钥、token、内部主机名

### 代码评审规则

Codex 从离被评审代码最近的 `AGENTS.md` 读取 `## Code Review Rules`。官方文档的形状是：

```markdown
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

有效的是这个形状：具体错误，然后安全替代。空泛的「做实验要小心」什么都改变不了。

### 核对到底加载了什么

```bash
codex --ask-for-approval never "Summarize the current instructions."
codex --cd packages/api --ask-for-approval never "List the instruction sources you loaded."
```

或者看日志：

```bash
codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

也可以检查 sessions 目录里最新的 `session-*.jsonl`。

## 配置层

官方 [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) 的解析顺序（高优先在前）：

```
-c key=value / CLI flag              ← 只对这一次运行
        ↑
<project>/.codex/config.toml         ← 项目层，仅信任时加载
        ↑
$CODEX_HOME/<name>.config.toml       ← --profile 选中的 profile
        ↑
~/.codex/config.toml                 ← 用户层，始终加载
        ↑
/etc/codex/config.toml               ← 系统层（若存在）
        ↑
内置默认值
```

被信任的项目配置**会**覆盖用户配置里的同名键。

### 项目层做不到的事

这些键出现在项目的 `.codex/config.toml` 时会被 **忽略**：

`openai_base_url`、`chatgpt_base_url`、`apps_mcp_product_sku`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`、`experimental_realtime_ws_base_url`、`otel`

仓库不能改道你的 API 流量、不能替你选 profile、不能改遥测。这些只能写在 `~/.codex/config.toml`。

> 整体优先级和「忽略键列表」是两件事。官方顺序是信任项目高于用户；忽略键是即使项目被信任也不会从项目层生效的那一小撮。未信任项目会跳过整个项目 `.codex/` 层。

### 一份合理的项目 config.toml

```toml
# <project>/.codex/config.toml
model_reasoning_effort = "medium"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[sandbox_workspace_write]
network_access = false
writable_roots = ["/tmp/build-cache"]
```

`network_access = false` 值得作为默认。多数开发任务不需要它，关掉能消掉一类意外。

### Profile

Profile 和 `config.toml` 同级，名为 `$CODEX_HOME/<name>.config.toml`：

```toml
# ~/.codex/review.config.toml
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "never"
```

```bash
codex --profile review "review the uncommitted changes and list only real defects"
```

这就是 Writer/Reviewer 模式的机制：评审 profile 从机制上不能改文件。

## MCP 服务器

MCP 把 Codex 接到仓库外面的系统。服务器配成**以 id 为键的 table**。

### STDIO

```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
startup_timeout_sec = 10
tool_timeout_sec = 60
```

### Streaming HTTP

```toml
[mcp_servers.internal-api]
url = "https://mcp.example.com/sse"
bearer_token_env_var = "INTERNAL_API_TOKEN"
enabled = true
default_tools_approval_mode = "prompt"    # auto | prompt | approve
enabled_tools = ["search", "read"]
```

> **语法重要。** 是 `[mcp_servers.<id>]`，以 id 为键的 table——不是 `[[mcp_servers]]`。没有 `name` 键，也没有 `type` 键；头里的 id 就是名字，有 `command` 还是 `url` 决定传输方式。

永远不要把凭证写进文件。`bearer_token_env_var` 指向环境变量；`env_http_headers` 把头名映射到环境变量。两者都让密钥离开可能被提交的文件。

### 控制服务器能做什么

| 键 | 作用 |
| --- | --- |
| `enabled` | 关掉服务器但不删配置 |
| `required` | 服务器不可用则启动失败 |
| `enabled_tools` | 白名单——只暴露这些工具 |
| `disabled_tools` | 黑名单 |
| `default_tools_approval_mode` | 整个服务器的 `auto` / `prompt` / `approve` |
| `tools.<tool>.approval_mode` | 覆盖单个工具 |
| `startup_timeout_sec` | 默认 10 |
| `tool_timeout_sec` | 默认 60 |

对能写的服务器：服务器默认 `prompt`，再给信任的只读工具单独 `auto`。

Codex 也能**作为** MCP 服务器跑——见 [MCP Server](https://learn.chatgpt.com/docs/mcp-server)。

用 `codex mcp` 管理；会话里用 `/mcp` 或 `/mcp verbose` 检查。

## Hooks

Hooks 回答的是「这件事必须发生，不能只是被请求」。

```toml
[[hooks.PostToolUse]]
[[hooks.PostToolUse.hooks]]
type = "command"
command = ["pnpm", "lint", "--fix"]
command_windows = ["pnpm.cmd", "lint", "--fix"]
```

事件：`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`。

目前只有 command hook 会执行。prompt / agent hook 会被解析但跳过。

注意 `command_windows`——团队有 Windows 的话，没有它 hook 会在 Windows 上失败。

项目 `.codex/` 里的 hooks 同样只对已信任项目加载。

## Subagents

```toml
[agents]
max_depth = 1
max_threads = 6
job_max_runtime_seconds = 1800

[agents.reviewer]
description = "Read-only adversarial reviewer"
config_file = "reviewer.config.toml"
```

Subagent 只有你明确要求时才生成，不会自动开火。`config_file` 让它们有用：评审 subagent 可以在只读沙箱里跑，主会话继续写。

会话里用 `/agent` 管理。

## CI 集成

### 非交互执行

任何 CI 用法的基础都是 `codex exec`，它不会等人：

```bash
codex --ask-for-approval never exec "run the test suite; if anything fails, fix it and re-run until green"
codex exec --json "summarize the changes since main"
```

`--json` 输出结构化事件，下游要解析时用这个。`codex exec` 默认 `RUST_LOG=error`。

不要用 `--full-auto`。0.147.0 已从 `codex exec` 删除该 flag。新脚本写 `--sandbox workspace-write` 加审批 flag。

### 隔离 CI 状态

```bash
CODEX_HOME=$(pwd)/.codex-ci codex exec "..."
```

这次运行会有自己的配置、会话和日志，而不是继承 runner 上已有的东西。

### GitHub Actions

有官方 action——当前 inputs 和认证方式看 [GitHub Action](https://learn.chatgpt.com/docs/github-action)，不要从教程里抄一份工作流，接口会变，认证细节也重要。

无论怎么接线，三件事必须做对：

**认证是密钥。** 走仓库的 secret store。工作流文件里不要出现字面 token。

**收紧沙箱。** CI 正好是 `danger-full-access` 最诱人、也最错的地方。`workspace-write` 加 `network_access = false` 覆盖大多数任务。

**先决定失败怎么办。** Agent 靠删测试让 CI 变绿，技术上确实绿了。如果任务能提交，提交必须可审——开 PR，不要直接推默认分支。

### Codex SDK

除了在 shell 里调 CLI，还有 SDK——见 [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)。

## 团队落地

### 什么该提交

| 文件 | 提交？ | 为什么 |
| --- | --- | --- |
| `AGENTS.md` | 是 | 共享约定 |
| `.codex/config.toml` | 是 | 共享默认值 |
| `.codex/` 里的 hooks 和 rules | 是 | 共享强制 |
| `~/.codex/config.toml` | 否 | 本机的，含信任条目，可能还有 provider |
| 任何带 token 的东西 | 否 | 用 `bearer_token_env_var` |

入职文档里加一句：新同事要把项目标成 trusted。没有这一步，提交进去的 `.codex/` 配置对他们全部无效。

### 强制，而不是建议

提交进去的配置只是默认值，开发者可以覆盖。必须在全队成立的事，才是 `requirements.toml` 的工作：

| 键 | 作用 |
| --- | --- |
| `allowed_approval_policies` | 限制可选审批策略 |
| `allowed_sandbox_modes` | 限制可选沙箱模式 |
| `allowed_web_search_modes` | 限制网页搜索（`disabled` 始终允许；空列表等于只允许 `disabled`） |
| `allowed_permission_profiles` | 限制 permission profile |
| `mcp_servers` | 按 id **和** `identity` 白名单（精确 command、matcher 或 URL） |
| `hooks.managed_dir` | 组织控制的 hooks |
| `marketplaces.restrict_to_allowed_sources` | 插件允许从哪来 |
| `enforce_residency` | 数据驻留（目前只有 `us`） |
| `[features]` | 钉死 feature flag |

**版本门槛：** 托管 permission-profile 白名单需要 **Codex 0.138.0 或更高**。0.137.0 及更早会完全忽略 `allowed_permission_profiles` 和托管 `default_permissions`。没核对客户端版本的「强制」等于没强制。

`mcp_servers` 白名单必须同时有 id 和 `identity` 块，避免批准的 id 被指到另一个二进制或端点。完整语法见 [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference)。

## 故障排除

| 现象 | 原因 | 修法 |
| --- | --- | --- |
| `.codex/config.toml` 没作用 | 项目未被信任 | 加 `projects.<path>.trust_level = "trusted"`；跑 `/debug-config` |
| 项目配置里某个键被忽略 | 它在机器本地忽略列表上 | 挪到 `~/.codex/config.toml` |
| `AGENTS.md` 规则被无视 | 合并体积撞上上限，或被 `AGENTS.override.md` 盖住 | 删短、提高上限、或检查 override |
| 包级规则输给根规则 | 搞反了覆盖方向 | 离 cwd 越近越后加载、因此会赢——确认文件在你以为的位置 |
| MCP 起不来 | 用了 `[[mcp_servers]]`，或启动超过 `startup_timeout_sec` | 改 TOML 形状；加大超时 |
| hook 只在 Windows 失败 | 没有 `command_windows` | 补上 |
| CI 挂死 | 在等一个没人会给的审批 | `--ask-for-approval never` |
| 托管策略没生效 | 客户端低于 0.138.0 | 升级 |
| 说不清现在生效的是什么 | — | `/debug-config` 打印层顺序以及 `allowed_approval_policies`、`allowed_sandbox_modes`、`mcp_servers`、`rules`、`enforce_residency`、`experimental_network` |

## 清单

新项目：

- [ ] 根目录 `AGENTS.md`：工具、边界、验收命令
- [ ] 约定真的不同的包再写包级 `AGENTS.md`
- [ ] 提交 `.codex/config.toml`，带沙箱和审批默认值
- [ ] 自己的 `~/.codex/config.toml` 里有信任条目
- [ ] 入职文档提到信任这一步
- [ ] MCP 用 `bearer_token_env_var`，从不内联密钥
- [ ] 有人用 Windows 的话 hook 带 `command_windows`
- [ ] CI 用 `codex exec` + `--ask-for-approval never` + 收紧的沙箱
- [ ] `codex --ask-for-approval never "Summarize the current instructions."` 看到的是你预期的内容

## 相关页面

- [Codex CLI](./codex-cli) — 安装与核心功能
- [Codex Cookbook](./codex-cookbook) — 任务配方
- [Codex 术语表](./codex-glossary) — 概念定义
- [Codex 速查表](./codex-cheatsheet) — 配置键和命令
- [学习地图](./) — 完整路径

## 官方来源

- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) · [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) · [Environment Variables](https://learn.chatgpt.com/docs/config-file/environment-variables)
- [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) · [MCP Server](https://learn.chatgpt.com/docs/mcp-server) · [Hooks](https://learn.chatgpt.com/docs/hooks) · [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [GitHub Action](https://learn.chatgpt.com/docs/github-action) · [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)
- [Permissions](https://learn.chatgpt.com/docs/permissions) · [Sandboxing](https://learn.chatgpt.com/docs/sandboxing)
