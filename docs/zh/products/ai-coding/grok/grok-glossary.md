# Grok Build 术语表与设计解读

不教操作，只解释"为什么长这样"。理解了这些，速查表里那些看着零散的键和 flag 就会各归其位。

## 五个都叫 Grok 的东西

第一次接触 xAI 的东西，最容易在名字上翻车。

| 名字 | 是什么 | 在哪用 |
| --- | --- | --- |
| Grok | 面向消费者的聊天产品 | grok.com、X 客户端 |
| **Grok Build** | 编码 agent，命令行工具，二进制名 `grok` | 你的终端 |
| `grok-4.6` | 通用旗舰模型，也是 Grok Build 的默认驱动 | Grok Build 和 xAI API 都能用 |
| `grok-build-0.1` | 专为编码 agent 场景训练的模型 | 同上 |
| xAI API | `https://api.x.ai/v1`，模型的 HTTP 接口 | 你自己的程序 |

本站这套文档讲的是**中间那个**。这也是为什么官方文档站分成两棵树：`docs.x.ai/build/*` 讲 CLI，`docs.x.ai/developers/*` 讲 API，两边的术语和配置互不通用。

顺带说一个常见笔误：官方从来没有"Grok Code"或"Grok CLI"这两个产品名，产品名是 Grok Build，`grok` 只是它的可执行文件名。

## 一个 agent，三张脸

官方对自己的定义是一句话：

> Grok Build is a powerful and extensible coding agent. Use it via an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps.

三种"面"不是三个产品，是同一个 agent 的三个入口：

| 面 | 入口 | 典型用途 |
| --- | --- | --- |
| TUI | `grok` | 人在终端里交互 |
| Headless | `grok -p "..."` | CI、脚本、机器人 |
| ACP | `grok agent stdio` | 嵌进编辑器或自建编排器 |

理解这点有实际收益：会话持久化、权限规则、hook、MCP、skill 在三种面下**行为一致**。你在 TUI 里调好的权限规则，headless 跑 CI 时照样生效；TUI 里开的会话，可以用 `grok --resume <id>` 在脚本里接着跑。所以这些能力只需要学一遍。

## 权限和沙箱是两个正交的轴

这是 Grok Build 最容易被误解的设计。官方那句区分值得逐字记住：

> Permissions decide which tool calls may run. The sandbox is separate: it limits what an approved call can do on the filesystem and network.

两个轴的分工：

- **权限**回答"这次调用要不要问我"。它在**调用发起前**起作用，产物是允许 / 拒绝 / 询问。
- **沙箱**回答"批准之后它最多能干到哪"。它是**操作系统级别**的强制（Linux Landlock、macOS Seatbelt），不依赖模型或 agent 的自觉。

为什么必须分开？因为二者的失效模式不同。权限是策略层，可以被"我点了 always allow"绕过；沙箱是执行层，即使 agent 完全失控、即使你开了 always-approve，它写不出 profile 允许的范围。真正需要安全兜底的场景（跑不可信仓库、审查陌生 PR）应该开沙箱，而不是指望自己每次都认真看权限提示。

反过来也成立：沙箱不是权限的替代品。`read-only` 能拦住写文件，但拦不住一次昂贵的、你并不想跑的只读操作。

顺着这个思路就能理解一个细节：always-approve 模式下，`deny` 规则和 `PreToolUse` hook **仍然生效**。因为 always-approve 只是把"询问"变成"自动批准"，并没有拆掉策略层本身。

## 五层配置：为什么最高优先级在 `/etc`

配置的合并顺序是从低到高五层：

| 优先级 | 来源 | 用途 |
| --- | --- | --- |
| 1（最低） | `/etc/grok/managed_config.toml` | 系统级托管配置 |
| 2 | `~/.grok/managed_config.toml` | 用户级托管配置 |
| 3 | `~/.grok/config.toml` | 用户偏好 |
| 4 | `~/.grok/requirements.toml` | 用户级钉死设置 |
| 5（最高） | `/etc/grok/requirements.toml` | 系统级钉死设置 |

注意这个顺序有点反直觉的地方：`managed_config.toml` 在**最低**两层，`requirements.toml` 在**最高**两层。同一个 `/etc/grok/` 目录下的两个文件，一个垫底一个封顶。

拆开看就合理了，两类文件的语义完全不同：

- `managed_config.toml` 是**默认值分发**——公司帮你预设好，但你想改就能改。所以它必须在用户配置下面。
- `requirements.toml` 是**策略钉死**（官方叫 fail-closed pin）——它的值不能被用户 `config.toml`、环境变量、远端设置或任何更低层覆盖。所以它必须在最上面。

于是 `/etc/grok/requirements.toml` 成了合规策略的唯一权威来源，也是 MDM 推送的落点。同理可以解释另一条看似奇怪的规定：`[ui] disable_bypass_permissions_mode` 只在 **root 拥有的来源**里生效。如果用户自己写在 `~/.grok/requirements.toml` 里也算，那"锁掉 always-approve"这个策略就等于没锁——用户能加就能删。防篡改必须靠文件所有权，不能靠配置层级。

项目级 `.grok/config.toml` 的限制也出自同一逻辑：它只贡献 `[mcp_servers]`、`[plugins]`、`[permission]`。因为项目配置来自你 clone 的仓库，**是别人写的**。让一个仓库改你的模型、主题、沙箱默认值太危险；但共享 MCP 配置和权限规则是团队协作的合理需求，所以这三段开了口子。

## 认证：四条路和一个解析顺序

| 方式 | 触发 | 可刷新 | 适合 |
| --- | --- | --- | --- |
| 浏览器 OIDC | `grok login`（默认） | 是 | 有浏览器的交互终端 |
| 设备码 | `grok login --device-auth` | 是 | SSH、容器、无头主机 |
| 外部 auth provider | 配置里 `auth_provider_command` | 是 | 企业 IdP、自建 token broker |
| API key | `XAI_API_KEY` 或配置里 `model.api_key` | 否 | 脚本、CI/CD、无头自动化 |

多种凭证同时存在时，Grok **按模型**逐个解析，顺序是：`model.api_key` > `model.env_key` > 当前会话 token > `XAI_API_KEY`。

这个顺序解释了一个实际现象：你明明 `grok login` 登录过了，某个自定义模型却还在用 API key——因为 `[model.<id>]` 里配的 key 优先级高于会话 token。BYOK 模型和官方模型可以在同一个会话里走不同凭证，这是设计如此。

配置里请用 `env_key` 而不是 `api_key`，把密钥留在环境变量里，别落进会被 commit 的文件。

## AGENTS.md：为什么越深的文件越优先

项目规则的加载顺序是：先 `~/.grok/` 的全局规则，然后从仓库根一路向下读到当前工作目录，**冲突时更深的文件胜出**。

这个"深者优先"是为 monorepo 设计的。仓库根的 `AGENTS.md` 写全局约定，`packages/frontend/AGENTS.md` 写"用 React，优先 CSS modules"，`packages/backend/AGENTS.md` 写"用 Express，遵循 REST"。你在哪个包里工作，就自动拿到那个包的约定，不需要在 prompt 里重复说。

两个连带的设计：

- `.gitignore` 命中的规则文件会被跳过。所以 `CLAUDE.local.md` 这种个人覆盖不会污染团队共享上下文——它本来就该被 ignore。
- 规则文件**全量加载，没有大小上限**。听起来很爽，但官方紧接着提醒："短而具体的指令比长的更容易被遵守。" 规则文件不是文档，是给模型的约束，写长了等于没写。

## Plan 模式门的是编辑，不是 shell

计划模式下只有会话计划文件能被编辑，其他编辑工具会被拒绝——**即使在 auto 或 always-approve 下也一样**。

但有一条必须知道的边界：

> Plan mode gates edit tools, not the shell — bash can still write via redirection.

也就是说 plan 模式挡的是 `write` / `edit` 这类工具，不挡 bash。模型完全可以用 `echo ... > file` 绕过去。所以 plan 模式的定位是**协作机制**（让你在动手前先看到方案），不是**安全机制**。要真正防写，用沙箱。

同理，subagent 不受父会话 plan 模式的编辑门限制（但会继承权限模式）。

## 会话是可分支的状态，不是一条聊天记录

Grok Build 的会话默认全量落盘在 `~/.grok/sessions/`，按工作目录索引，prompt、响应、工具调用、文件快照都在里面。理解成"带快照的状态机"比理解成"聊天记录"更准确，因为它支持的操作是状态操作：

| 操作 | 语义 |
| --- | --- |
| `--resume` / `-c` | 加载状态继续 |
| `/fork` | 从当前状态分叉出一个对等 agent |
| `/rewind` | 把状态**连同磁盘文件**回退到某个 turn |
| `/compact` | 压缩历史，腾出上下文预算 |

`/rewind` 会改磁盘文件这件事必须单独强调一遍：它不是"撤销对话"，是"撤销这段时间发生的一切"，没提交 git 的改动会没。

`--fork-session` 和 `/fork` 存在的理由是"探索性分叉"：同一个上下文起点，试两种方案互不干扰。配合 worktree（`grok -w`）就变成文件层面也隔离的并行开发——多个 agent 同时改同一个仓库而不互相覆盖。

worktree 不会自动清理，这也是有意的：agent 跑出来的东西你可能还没看过就删了太危险，所以 `gc` 只在手动调用时才跑。代价是你得自己记得 `grok worktree gc`。

## 五种扩展机制的分工

这五个概念最容易糊成一团，因为它们都能"给 agent 加东西"。区别在于加的是什么：

| 机制 | 加的是 | 边界 |
| --- | --- | --- |
| **Skill** | 知识和流程（markdown + 脚本 + 资源） | 不改变可用工具集 |
| **MCP server** | 工具（外部系统的能力） | 通过协议接入，工具名带 `<server>__` 前缀 |
| **Plugin** | 打包分发的组合（skills + agents + hooks + MCP + LSP） | 是容器，不是新能力类型 |
| **Subagent** | 独立上下文的执行单元 | 结束时把摘要交回父会话 |
| **Workflow** | 编排（扇出、验证、汇总一组 subagent） | `.rhai` 脚本，跑在后台 |
| **Persona** | 行为叠加层（语气、关注点、契约） | **只改行为，不改能力** |

两个高频误解值得点名：

1. **`allowed-tools` 不是权限控制**。它在 `SKILL.md` frontmatter 里，名字听着像白名单，但官方明确说它既不授予也不限制工具。想控制工具，用 `[permission]` 规则或 `--tools` / `--disallowed-tools`。
2. **Persona 不是 subagent 类型**。换 persona 只换说话方式和关注点，不换它能调什么工具。

Subagent 存在的根本理由是**上下文经济**：探索一个大仓库会产生大量中间输出，这些东西留在主会话里就是纯浪费。所以 `explore` 类型只读、无 shell、不改文件，它的职责是把一堆搜索结果压成一段结论交回来。同理 `plan` 类型也不动文件。

## 为什么它主动兼容 Claude Code

Grok Build 明确承诺零配置兼容 Claude Code：自动读 Claude 的 marketplace、plugin、skill、MCP、agent、hook 和指令文件，CLI flag 也保留 Claude 的别名。

这是一个迁移成本策略：AI 编码工具的切换成本主要不在"学新命令"，而在"重建那一整套配置"——你攒了半年的 skill、调好的 MCP、写熟的 `CLAUDE.md`。把这些东西直接读进来，切换成本就从"重建"降到"跑一次试试"。

但兼容有一条**故意的例外**：Claude 的 `managed-settings.json` 里 `disableBypassPermissionsMode: "disable"` 不会作用到 Grok 的 always-approve。官方给的理由是不让 Grok 继承宿主机的 Claude Code 封锁策略。这个例外本身很能说明兼容层的定位——它兼容的是**你的资产**，不是**别人对你的限制**。要在 Grok 侧锁，就在 Grok 自己的 `requirements.toml` 里写。

## 为什么这份文档一定会过期

Grok Build 目前是 early beta，2026 年 5 月 25 日发布，npm 上的发布节奏是一到三天一个版本。这意味着：

- 看到本站和你机器上的行为不一致，**先信你的机器**，然后按 `grok --version` 去对 [changelog](https://x.ai/build/changelog)。
- changelog 通常比文档站更新更快。文档里查不到的新行为，去 changelog 找。
- 上游仓库 [xai-org/grok-build](https://github.com/xai-org/grok-build) 是 Apache-2.0 开源的，但**不接受外部 PR**，反馈渠道是 TUI 里的 `/feedback`。所以不要指望社区 fork 能反哺主线，社区信息的权重要比官方低一档。

判断一条信息还有效的最快手段是 `grok inspect`——它直接告诉你这台机器上实际加载了什么配置、规则、skill、plugin、hook 和 MCP server。文档讲的是应该怎样，`grok inspect` 讲的是实际怎样。

## 相关页面

- [Grok Build 学习地图](./index.md)
- [Grok Build 教程](./grok-cli.md) — 从零跑起来
- [Grok Build 实战手册](./grok-cookbook.md) — 具体任务怎么做
- [Grok Build 速查表](./grok-cheatsheet.md) — 命令、配置键、环境变量
