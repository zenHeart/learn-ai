# Codex 术语表

> 这是一份**解释型**文档——回答「这个概念是什么、为什么这样设计、什么时候该用」。和 [Codex 速查表](./cheatsheet) 互补：速查表回答「命令怎么写」，本文回答「为什么要这么写」。
>
> **概念定义的唯一真相来源**：本项目所有 Codex 文档中出现的概念，以本页的定义为准。其它页面只做「怎么用」的示范，不重复定义。
>
> **文档站点变更提示**：Codex 官方文档已从 `developers.openai.com/codex/*` 迁移至 **`learn.chatgpt.com/docs`**，旧地址会 308 永久重定向到新地址。本页所有官方链接均使用新地址。

## 概念关系图

```
                        ┌─────────────────────────┐
                        │   requirements.toml     │  管理员托管策略（最高约束）
                        │   企业/团队统一下发       │
                        └────────────┬────────────┘
                                     │ 收窄可选范围
                                     ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                    config.toml  配置层                        │
   │   ~/.codex/config.toml（用户级） > .codex/config.toml（项目级） │
   │   Profile 配置档：$CODEX_HOME/<name>.config.toml               │
   └───────┬──────────────────────────┬───────────────────────────┘
           │                          │
           ▼                          ▼
   ┌───────────────┐          ┌──────────────────┐
   │  权限与沙箱     │          │  上下文与指令       │
   │  ─────────    │          │  ──────────      │
   │  approval_    │          │  AGENTS.md       │  ← 项目说明书
   │  policy       │          │  Rules           │  ← 结构化约束
   │  sandbox_mode │          │  Memories        │  ← 跨会话记忆
   │  trust_level  │          │  Compaction      │  ← 上下文压缩
   └───────┬───────┘          └────────┬─────────┘
           │                           │
           └───────────┬───────────────┘
                       ▼
           ┌───────────────────────┐
           │   Codex Agent 运行时   │
           │   会话 / Session       │
           └───────────┬───────────┘
                       │ 通过以下机制扩展能力
       ┌───────────────┼───────────────┬──────────────┐
       ▼               ▼               ▼              ▼
   ┌────────┐     ┌─────────┐    ┌─────────┐   ┌───────────┐
   │  MCP   │     │ Skills  │    │  Hooks  │   │ Subagents │
   │ 外部工具│     │ 可复用   │    │ 生命周期 │   │  子代理    │
   │        │     │ 流程     │    │ 拦截    │   │           │
   └───┬────┘     └────┬────┘    └─────────┘   └───────────┘
       │               │
       └───────┬───────┘
               ▼
        ┌─────────────┐
        │   Plugins   │  把 MCP / Skills / Hooks 打包分发
        └─────────────┘

   运行形态（同一套配置，四种入口）：
   CLI (codex) │ IDE 扩展 │ 桌面 App │ Web / Cloud
```

**核心逻辑**：最外层是**约束**（管理员托管 → 配置文件 → 权限沙箱），中间是**上下文**（AGENTS.md / Rules / Memories 决定 Codex 知道什么），最内层是**能力扩展**（MCP / Skills / Hooks / Subagents 决定 Codex 能做什么）。Plugins 不是新能力，只是前三者的打包分发格式。

理解这张图的实用价值：当 Codex 行为不符合预期时，按「约束 → 上下文 → 能力」的顺序自上而下排查，比随机改配置高效得多。

---

## AGENTS.md

**是什么**

放在仓库里的 Markdown 文件，用自然语言告诉 Codex 这个项目的约定：用什么包管理器、改完代码要跑什么命令、哪些目录不要碰。可以类比新人入职时那份「团队约定文档」——只不过读者是 Agent。

**为什么需要**

不写 AGENTS.md，你就得在每次对话里重复交代「这个项目用 pnpm 不用 npm」。写了之后，这些约定变成每次任务自动加载的前置上下文。

**工作机制（指令链）**

Codex 启动时构建一条**指令链**（每次运行构建一次；在 TUI 中通常是每启动一个会话构建一次），发现顺序为：

1. **全局作用域**：在 Codex home 目录（默认 `~/.codex`，可用 `CODEX_HOME` 改）读取 `AGENTS.override.md`，不存在则读 `AGENTS.md`。这一层**只取第一个非空文件**。
2. **项目作用域**：从项目根（通常是 Git 根）**向下走到当前工作目录**。每经过一个目录，依次检查 `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` 里列出的备用文件名。**每个目录最多取一个文件**。
3. **合并顺序**：从根往下拼接，用空行连接。**离当前目录越近的文件出现在越后面，因此会覆盖前面的指导**。

Codex 会跳过空文件，并在合并后体积达到 `project_doc_max_bytes`（默认 32 KiB）时停止追加。

**关键细节**

| 细节 | 说明 |
| --- | --- |
| 覆盖而非替换 | `AGENTS.override.md` 存在时，同目录的 `AGENTS.md` 被忽略 |
| 只向下不向上 | 从项目根走到 cwd，走过头的目录不看 |
| 自定义文件名 | `project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]` |
| 提高上限 | `project_doc_max_bytes = 65536` |
| 代码评审规则 | 在最靠近被约束代码的 `AGENTS.md` 里加 `## Code Review Rules` 小节 |
| 临时全局覆盖 | 用 `~/.codex/AGENTS.override.md`，用完删掉即可恢复 |

**与 Rules 的区别**

| 维度 | AGENTS.md | Rules |
| --- | --- | --- |
| 形态 | 自然语言 Markdown | 结构化规则配置 |
| 用途 | 传达项目约定和背景 | 声明式约束与检查 |
| 覆盖粒度 | 按目录层级继承覆盖 | 按规则条目匹配 |

**官方文档**：[Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

---

## Rules

**是什么**

比 AGENTS.md 更结构化的约束机制，用来声明「什么情况下必须/禁止做什么」。项目级 Rules 属于 `.codex/` 项目层，因此同样受项目信任（trust level）的门控。

**为什么需要**

AGENTS.md 是自然语言，模型可能「理解偏了」。Rules 提供更明确的约束表达，也便于团队统一下发和审计。你可以用 `/debug-config` 查看当前生效的 rules。

**官方文档**：[Rules](https://learn.chatgpt.com/docs/agent-configuration/rules)

---

## 沙箱（Sandbox）

**是什么**

限制 Codex 能读写哪些文件、能否访问网络的隔离层。它是**机制层**——决定「技术上能不能做」，与审批策略（决定「做之前要不要问你」）是两个独立的维度。

**三种模式**

| `sandbox_mode` | 含义 | 典型场景 |
| --- | --- | --- |
| `read-only` | 只读，不能改文件 | 代码审查、架构分析 |
| `workspace-write` | 可写工作区 | 日常开发（常用默认） |
| `danger-full-access` | 无沙箱限制 | 明确知道风险时才用 |

`workspace-write` 下可进一步微调：

| 配置键 | 作用 |
| --- | --- |
| `sandbox_workspace_write.writable_roots` | 追加可写根目录 |
| `sandbox_workspace_write.network_access` | 是否允许网络访问 |
| `sandbox_workspace_write.exclude_slash_tmp` | 把 `/tmp` 排除出可写范围 |
| `sandbox_workspace_write.exclude_tmpdir_env_var` | 把 `$TMPDIR` 排除出可写范围 |

**为什么沙箱和审批要分开**

因为「安全」有两条独立的防线：沙箱是**硬边界**（越不过去），审批是**人工闸门**（越过去之前先问你）。只有审批没有沙箱，一次误点「同意」就可能造成破坏；只有沙箱没有审批，Codex 会在边界内自由行动而你毫不知情。两者组合才能既高效又可控。

**官方文档**：[Sandboxing](https://learn.chatgpt.com/docs/sandboxing)

---

## 审批策略（Approval policy）与权限

**是什么**

决定 Codex 执行动作前是否需要你确认的策略。注意配置层和界面层用了**两套命名**，这是初学者最容易混淆的地方。

**配置层：`approval_policy`**

| 取值 | 含义 |
| --- | --- |
| `untrusted` | 只自动执行被认为安全的操作，其余都要问 |
| `on-request` | 由模型按需请求审批 |
| `never` | 从不询问 |
| `{ granular = { ... } }` | 细粒度控制，可分别设置 `sandbox_approval`、`rules`、`mcp_elicitations`、`request_permissions`、`skill_approval` |

> 旧取值 `on-failure` 已废弃。命令行上可用 `--ask-for-approval <policy>` 临时指定。

**界面层：TUI 权限模式**

在 TUI 里用 `/permissions` 切换，显示为三个档位：**Auto**（默认）、**Read-only**、**Full Access**。

**为什么有两套名字**

配置层描述的是「审批请求如何产生」，界面层描述的是「组合出的实用档位」——Read-only 和 Full Access 实际上同时调整了沙箱和审批两个维度。写文档或排查问题时必须说清自己在讲哪一层，否则沟通必然错位。

**官方文档**：[Permissions](https://learn.chatgpt.com/docs/permissions)

---

## 项目信任（Trust level）与配置层级

**是什么**

Codex 是否信任某个项目目录的开关，配置在 `projects.<path>.trust_level`，取值 `"trusted"` 或 `"untrusted"`。

**为什么需要**

因为项目里的 `.codex/` 目录是**别人可以往仓库里提交的内容**。如果 clone 一个陌生仓库就自动加载它的配置、hooks 和 rules，等于把执行权交给了仓库作者。信任门控就是这道防线：**未信任的项目会跳过所有项目级 `.codex/` 层**（配置、hooks、rules 都不加载）。

**配置优先级（重要纠错点）**

很多人误以为「项目配置覆盖用户配置」。实际相反：

```
~/.codex/config.toml        用户级——优先级更高
.codex/config.toml          项目级——优先级更低，且仅在项目被信任时才加载
```

而且项目级配置**不能**覆盖机器本地的关键项。以下键出现在项目级配置里会被 **忽略**：

`openai_base_url`、`chatgpt_base_url`、`apps_mcp_product_sku`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`、`experimental_realtime_ws_base_url`、`otel`

这个设计的用意很直接：**仓库不能悄悄把你的模型请求改道到别的服务端**。

**官方文档**：[Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## Profile（配置档）

**是什么**

一组命名的配置集合，用于在不同场景间切换（例如工作项目 vs 个人实验）。

**工作机制**

Profile 文件与 `config.toml` 同级存放，命名为 `$CODEX_HOME/<profile-name>.config.toml`，用 `--profile <profile-name>` 选中。

**与 `CODEX_HOME` 的区别**

| 维度 | Profile | `CODEX_HOME` |
| --- | --- | --- |
| 切换的是 | 同一个 home 里的一份配置 | 整个 Codex home 目录 |
| 隔离程度 | 只隔离配置 | 配置、会话、日志全部隔离 |
| 典型用途 | 工作/个人两套模型与权限 | CI 里用独立的自动化身份 |

**官方文档**：[Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)、[Environment Variables](https://learn.chatgpt.com/docs/config-file/environment-variables)

---

## MCP（Model Context Protocol）

**是什么**

让 Codex 连接外部工具和数据源的开放协议。可以理解成 AI 世界的「USB 接口」——协议统一之后，任何实现了 MCP 的服务都能被 Codex 直接使用，不需要 Codex 为每个服务单独适配。

**为什么重要**

没有 MCP，Agent 只能读写本地文件和跑命令。有了 MCP，同一个 Agent 可以查数据库、调内部 API、访问设计稿——而且这些能力的提供方和 Codex 是解耦的。

**配置形态（重要纠错点）**

`mcp_servers` 是**以 id 为键的表（table）**，不是数组表：

```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "."]
```

常用键：

| 键 | 说明 |
| --- | --- |
| `command` / `args` / `cwd` / `env` | STDIO 方式启动本地进程 |
| `url` / `http_headers` / `bearer_token_env_var` | 流式 HTTP 方式连接远端 |
| `enabled` / `required` | 是否启用、是否必需 |
| `enabled_tools` / `disabled_tools` | 工具级白/黑名单 |
| `default_tools_approval_mode` | `auto` / `prompt` / `approve` |
| `startup_timeout_sec` | 启动超时，默认 10 |
| `tool_timeout_sec` | 单次调用超时，默认 60 |

**双向角色**

Codex 既可以作为 MCP **客户端**消费别人的服务，也可以作为 MCP **服务端**被别的 Agent 调用（见 `codex mcp` 与 MCP Server 文档）。

**官方文档**：[MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)、[MCP Server](https://learn.chatgpt.com/docs/mcp-server)

---

## Skills

**是什么**

把一段可复用的工作流程封装成「技能」，让 Codex 在合适的时机自动调用。你可以用 `/skills` 查看当前可用技能。

**与 MCP 的区别**

| 维度 | Skills | MCP |
| --- | --- | --- |
| 本质 | 打包的**流程/知识** | 接入的**工具/数据** |
| 谁执行 | Codex 自己按流程做 | 外部服务执行后返回结果 |
| 典型内容 | 「发布流程分七步」 | 「查询生产数据库」 |

简单判断：需要**接一个外部系统**用 MCP；需要**固化一套做法**用 Skills。

**官方文档**：[Skills](https://learn.chatgpt.com/docs/build-skills)

---

## Hooks

**是什么**

在 Codex 生命周期的特定节点自动触发的命令，用于做强制检查或自动化动作。可以内联写在 `config.toml` 里。

**支持的事件**

`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`

**当前限制**：只支持 command 类型的 hook（prompt / agent 类型会被解析但跳过执行）。Windows 上可用 `commandWindows`（TOML 中写作 `command_windows`）指定平台差异命令。

**与 AGENTS.md 的区别**

AGENTS.md 是**建议**——模型可能不照做；Hooks 是**强制**——脚本一定会跑。要求「每次改完代码必须格式化」这类硬约束，写 Hooks 而不是写 AGENTS.md。

**官方文档**：[Hooks](https://learn.chatgpt.com/docs/hooks)

---

## Plugins

**是什么**

把 MCP 服务、Skills、Hooks 打包成一个可分发单元的格式。用 `/plugins` 管理。

**为什么需要**

团队里每个人手动配一遍 MCP + Skills + Hooks 不现实，也容易配错。Plugins 让「一套 Codex 工作环境」变成可以一次安装的东西。

**生态角色**：Plugins 是**分发层**，不引入新能力。配置上它可以覆盖所打包的 MCP 服务的启用状态与工具审批模式（`plugins.<plugin>.mcp_servers.<server>.*`）。

**官方文档**：[Plugins](https://learn.chatgpt.com/docs/plugins)

---

## Subagents（子代理）

**是什么**

主 Agent 派生出的独立 Agent，用于并行处理或隔离上下文。用 `/agent` 管理，在 `[agents]` 配置段声明。

**关键行为**：**只有你明确要求时才会派生子代理**——不会自动发生。

**相关配置**

| 键 | 默认值 | 说明 |
| --- | --- | --- |
| `agents.max_depth` | 1 | 嵌套深度上限 |
| `agents.max_threads` | 6 | 并发线程上限 |
| `agents.job_max_runtime_seconds` | 1800 | 单任务运行时长上限 |
| `agents.<name>.config_file` | — | 子代理使用的配置文件 |
| `agents.<name>.description` | — | 描述，影响何时被选用 |

启用 `features.multi_agent` 后可用的工具：`spawn_agent`、`send_input`、`resume_agent`、`wait_agent`、`close_agent`。

**什么时候该用**

需要**上下文隔离**时（比如让一个子代理专门做对抗性审查，避免它被主线的思路带偏），或需要**并行**处理互不依赖的任务时。任务之间有强依赖的，串行做反而更快。

**官方文档**：[Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

---

## Memories（记忆）

**是什么**

跨会话保留的信息，让 Codex 记住你的偏好和项目背景，不必每次重新交代。用 `/memories` 管理。

**与 AGENTS.md 的区别**

| 维度 | Memories | AGENTS.md |
| --- | --- | --- |
| 来源 | Codex 自动提炼 + 你确认 | 你手写 |
| 存放 | Codex 侧 | 仓库里，可提交、可评审 |
| 适合 | 个人习惯、渐进积累的经验 | 团队约定，需要所有人一致 |

判断标准很简单：**这条信息该让团队所有人共享吗**？该，就写进 AGENTS.md 提交上去；只是你个人习惯，交给 Memories。

**相关配置**：`features.memories`（默认关闭）；细项在 `memories.*`，如 `use_memories`、`generate_memories`、`max_unused_days`、`max_rollout_age_days` 等。

**官方文档**：[Memories](https://learn.chatgpt.com/docs/customization/memories?surface=app)

---

## 会话（Session）与上下文压缩（Compaction）

**是什么**

一次连续对话及其累积的上下文。会话记录存放在 `~/.codex/sessions/`。

**会话操作**

| 操作 | 命令 |
| --- | --- |
| 恢复会话（选择器） | `codex resume` |
| 恢复最近一次 | `codex resume --last` |
| 恢复指定会话 | `codex resume <SESSION_ID>` |
| 列出全部 | `codex resume --all` |
| 从当前状态分叉 | `/fork` |
| 归档 / 取消归档 | `/archive`、`codex unarchive <SESSION>` |

会话 ID 可以从会话选择器、`/status` 或 `~/.codex/sessions/` 目录取得。

**上下文压缩（Compaction）**

上下文接近上限时，把早期对话压缩成摘要以腾出空间。手动触发用 `/compact`；自动触发阈值由 `model_auto_compact_token_limit` 控制。`PreCompact` / `PostCompact` 两个 hook 事件可以在压缩前后插入动作。

**为什么要主动管理**

压缩是有损的——摘要会丢细节。与其等它自动压缩，不如在任务切换时主动 `/clear` 或开新会话。一个会话只做一件事，比一个会话做十件事然后被迫压缩要可靠得多。

**官方文档**：[Slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

---

## Web 搜索模式

**是什么**

Codex 获取外部网页信息的能力，有三档（重要纠错点：这是**枚举字符串**，不是布尔开关）。

| `web_search` | 含义 |
| --- | --- |
| `disabled` | 关闭 |
| `cached` | **默认值**，查询 OpenAI 维护的索引，不实时抓取 |
| `live` | 实时抓取；在 `--yolo` / 全权限模式下默认变为此值 |

命令行上用**裸 `--search`**（不带参数）开启实时搜索。搜索结果会以 `web_search` 条目出现在对话记录和 `codex exec --json` 输出里。

> 旧的开关式配置 `features.web_search`、`features.web_search_cached`、`features.web_search_request` 已废弃。

**为什么默认是 cached 而不是 live**

缓存索引更快、更省，而且对绝大多数「这个 API 怎么用」的问题足够。只有在查非常新的信息（比如刚发布的版本）时才需要 `live`。

**官方文档**：[Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## 非交互模式（`codex exec`）

**是什么**

不进 TUI、直接跑完一个任务就退出的运行方式，用于脚本和 CI。

```bash
codex exec "run the test suite and fix any failures"
codex exec --json "summarize recent changes"
codex exec resume --last "now add tests for the new function"
```

**为什么需要独立的子命令**

因为 CI 里没有终端交互，也不该有人工审批等待。`codex exec` 明确表达「这是一次性的、无人值守的运行」，日志默认级别是 `RUST_LOG=error`，输出便于机器解析。

**官方文档**：[Non-interactive Mode](https://learn.chatgpt.com/docs/non-interactive-mode)

---

## 运行形态：CLI / IDE / App / Cloud

**是什么**

同一个 Codex Agent 的四种入口。它们共享同一套配置模型（`config.toml`、AGENTS.md、MCP、Skills），差异在交互方式和运行位置。

| 形态 | 入口 | 特点 |
| --- | --- | --- |
| CLI | `codex` | 终端 TUI，脚本化能力最强 |
| IDE 扩展 | 编辑器内 | 与编辑器上下文结合 |
| 桌面 App | 独立应用 | 图形界面、多线程会话管理 |
| Web / Cloud | `codex cloud` | 在云端环境里跑，任务可并行多次尝试 |

**云端相关命令**

```bash
codex cloud                              # 打开云端界面（Ctrl+O 可查看环境 ID）
codex cloud exec --env <ENV_ID> "..."    # 在指定云环境执行
codex cloud exec --env <ENV_ID> --attempts 3 "..."   # 同一任务尝试多次（1-4）
```

**远程控制**：`codex app-server --listen ws://127.0.0.1:4500` 起服务，`codex --remote ws://127.0.0.1:4500` 连接。`--remote` 支持 `ws://`、`wss://`、`unix://`。跨网络使用时必须走 `wss://` 并配置鉴权。

**官方文档**：[CLI](https://learn.chatgpt.com/docs/codex/cli)、[IDE Extension](https://learn.chatgpt.com/docs/codex/ide)、[App Server](https://learn.chatgpt.com/docs/app-server)

---

## requirements.toml（托管策略）

**是什么**

管理员下发的策略文件，用于在组织范围内**收窄**可选项——它不是「又一份配置」，而是配置的上界。

**能约束什么**

| 键 | 作用 |
| --- | --- |
| `allowed_approval_policies` | 允许的审批策略集合（如 `untrusted`、`on-request`、`never`、`granular`） |
| `allowed_sandbox_modes` | 允许的沙箱模式集合 |
| `allowed_web_search_modes` | 允许的搜索模式；`disabled` 总是允许，空列表等于只允许 `disabled` |
| `allowed_permission_profiles` | 允许的权限档位；**需要 Codex 0.138.0+** |
| `default_permissions` | 默认权限档，必须在允许列表内 |
| `allow_managed_hooks_only` | 只执行托管 hooks，跳过用户/项目/会话/插件 hooks |
| `features.*` | 用与 `config.toml` 相同的键名锁定特性开关 |
| `mcp_servers` 白名单 | 需同时指定 id 与 `identity`（`identity.command` 或 `identity.url`） |
| `marketplaces.*` | 限制插件来源（`git` / `host_pattern` / `local`） |
| `enforce_residency` | 数据驻留，当前仅支持 `us` |

> **版本注意**：0.137.0 及更早版本会忽略 `allowed_permission_profiles` 与托管的 `default_permissions`。要靠这两项做强制约束，必须先确保客户端版本 ≥ 0.138.0。

**官方文档**：[Config Reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## 模型与推理强度

**是什么**

Codex 使用的模型，以及模型「想多久」的档位。

| 配置键 | 取值 | 说明 |
| --- | --- | --- |
| `model` | 字符串 | 官方文档示例为 `gpt-5.5` |
| `model_reasoning_effort` | `minimal` / `low` / `medium` / `high` / `xhigh` | 仅 Responses API 支持 |
| `model_reasoning_summary` | `auto` / `concise` / `detailed` / `none` | 推理摘要详细程度 |
| `model_verbosity` | `low` / `medium` / `high` | 输出详细程度 |

命令行上可用 `--model <name>` 临时切换，或 `/model` 在会话中切换。

**怎么选推理强度**

改一行配置、加个日志——`low` 够了。设计模块边界、排查复杂并发 bug——`high` 或 `xhigh` 值得多等。默认 `medium` 适用于大多数日常任务。盲目全开 `xhigh` 只会让简单任务变慢，还更快耗尽额度。

**官方文档**：[Models](https://learn.chatgpt.com/docs/models)

---

## 相关页面

- [Codex 速查表](./cheatsheet) — 命令、配置、错误速查
- [Codex Cookbook](./codex-cookbook) — 按任务组织的实操配方
- [Codex CLI 教程](./codex-cli) — 从安装到核心功能
- [项目集成](./integration) — 把 Codex 接入真实项目
- [学习地图](./) — 完整学习路径
