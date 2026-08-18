# Gemini 全家族速查表

> 这是一份**查资料用**的参考文档，不是教程。想学怎么用某个工具，去 [学习地图](./index)；想理解概念，去 [术语表](./gemini-glossary)；想照着场景抄配方，去 [Cookbook](./gemini-cookbook)。
>
> 本页是 Gemini 全家族决策表、配置键、模型现状、订阅层级的**全站唯一权威版本**。其他页面引用这里，不要另抄一份。

## 目录

- [选哪个工具](#选哪个工具)
- [模型现状](#模型现状)
- [订阅层级](#订阅层级)
- [术语速查索引](#术语速查索引)
- [配置速查](#配置速查)
- [高质量信息源](#高质量信息源)
- [相关页面](#相关页面)

## 选哪个工具

> **2026-06-18 起**：个人 / Google AI Pro / Ultra 通过 Login with Google 访问 Gemini CLI 与 Code Assist IDE 扩展已停服，这两行按 **Standard / Enterprise 或付费 API key** 理解；个人开发者的对应入口是 [Antigravity](./antigravity)。[官方弃用说明](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals)。

### 按任务选

| 我要做的事 | 用这个 | 为什么 |
|---|---|---|
| 在终端里问代码、跑脚本、串管道 | [Gemini CLI](./gemini-cli)（企业 / API key）或 [Antigravity](./antigravity) CLI（个人） | CLI 零前置，支持 `-p` 无头模式和 `--output-format json`；个人账号日常走 Antigravity |
| 让智能体自主规划并改一批文件 | [Antigravity](./antigravity) | 桌面端 + CLI + SDK 共享同一 harness，支持异步子智能体与可视化构件 |
| 把任务丢到云端，回来收 PR | [Jules](./jules) | 在云端 VM 里克隆仓库执行，先出计划待人工批准，再产出 PR |
| 在 IDE 里补全、改单文件、局部重构 | [Code Assist](./code-assist) | VS Code / JetBrains / Android Studio 插件，含本地代码库感知 |
| 在对话里直接看到能点的原型 | [Canvas](./canvas) | 对话内工作区，无需搭建本地工程 |
| 落地页 / 宣传片 / 产品演示要出视频 | [Google Flow](./flow) | Veo 3.1 / Nano Banana / Gemini Omni；对位 Claude Design，不做 DOM |
| 调模型参数、测系统提示词、走 API | [AI Studio](./ai-studio) | 直接控制模型与参数，是 API 集成的起点 |
| 决定订哪一档、怎么控预算 | [订阅与配额](./google-pro) | 4 档订阅的额度差异与 Google Cloud 额度 |

### Antigravity vs Code Assist vs Jules

三者最容易混淆，按"跑在哪、谁发起、改多少"区分：

| 维度 | Antigravity | Code Assist | Jules |
|---|---|---|---|
| 运行位置 | 本地（桌面端 / CLI / IDE / SDK） | 本地 IDE 内 | 云端 VM |
| 谁发起 | 你实时对话 | 你在编辑器里触发 | 你在 Web 或 CLI 建任务，之后离开 |
| 交付物 | 工作区里的改动 + 构件 | 编辑器里的补全与改动 | 一个 Pull Request |
| 并发 | 支持异步子智能体 | 单会话 | 多任务并行（并发上限随订阅档位变化） |
| 版本形态 | 单一产品 | Standard / Enterprise（个人 free 档已于 2026-06-18 停服） | 单一产品，额度随订阅档位变化 |
| 典型场景 | 跨模块重构、需要边看边验证 | 单文件补全、局部多文件重构 | 依赖升级、技术债清理、边界清晰的独立任务 |

<!-- TODO: 待核实 —— Antigravity 是否有官方文档明确的"并发子智能体上限"，目前官方只描述了 Asynchronous Subagents 能力，未找到官方说明给出数量上限 -->

### 按上下文规模选

| 输入规模 | 建议 |
|---|---|
| 单文件、一段报错 | Gemini CLI 管道：`... 2>&1 \| gemini -p "分析这个报错"` |
| 一个模块、几十个文件 | Antigravity 工作区，让它自己读 |
| 整个仓库审计 | [AI Studio](./ai-studio)，官方订阅对比表标注 Pro 及以上为 100 万令牌扩展上下文 |

## 模型现状

以 [官方模型清单](https://ai.google.dev/gemini-api/docs/models)（页面标注 Last updated 2026-08-14）为准。**这张表过期极快，引用模型名前请回官方页面复核。**

### 当前稳定模型（节选）

| 模型 | 定位（官方描述要点） |
|---|---|
| Gemini 3.7 Flash | 官方描述为最新、最强的 Flash 模型，面向复杂编码、智能体工作流与可靠的多步执行 |
| Gemini 3.6 Flash（`gemini-3.6-flash`） | 上一代 Flash 稳定版 |
| Gemini 3.5 Flash | 稳定版；官方文档标注它驱动 Antigravity 的全部本地智能体 |
| Gemini 3.5 Flash-Lite / 3.1 Flash-Lite | 成本敏感场景 |
| `gemini-2.5-pro` / `gemini-2.5-flash` / `gemini-2.5-flash-lite` | 2.5 代仍在列 |
| `antigravity-preview-05-2026` | 官方描述为通用托管智能体，在隔离的 Linux 沙盒里自主规划、执行代码、管理文件、浏览网页 |

### 已停用（不要再写进文档或示例）

`gemini-3-pro-preview`、`gemini-3.1-flash-lite-preview`、`gemini-2.0-flash`、`gemini-2.0-flash-lite` 均已在官方 Previous models 表中标记为 Shut down。

### 版本后缀含义

| 后缀 | 含义 |
|---|---|
| stable | 稳定版，不会破坏性变更 |
| preview | 预览版，官方会提前至少两周通知弃用 |
| latest（如 `gemini-flash-latest`） | 指向最新版本，会被热替换；破坏性变更前有两周邮件通知 |
| experimental | 实验版，可能随时消失 |

> ⚠️ 上下文窗口：官方模型清单页**不逐个模型列出上下文窗口**。当前唯一可引用的数字来自订阅对比表——Pro 及以上为 100 万令牌扩展上下文。
> <!-- TODO: 待核实 —— 各模型各自的上下文窗口上限。未在官方模型清单页找到官方说明，历史文档里的"200 万令牌"没有出处，已移除 -->

## 订阅层级

来自 [Google AI plans 官方对比页](https://one.google.com/about/google-ai-plans/)。

| 维度 | AI Plus | AI Pro | AI Ultra 5x | AI Ultra 20x |
|---|---|---|---|---|
| 存储 | 400 GB | 5 TB | 20 TB | 30 TB |
| 模型访问倍率（官方表述） | 2x | 4x | 5x | 20x |
| 扩展上下文窗口 | 未列出 | 100 万令牌 | 100 万令牌 | 100 万令牌 |
| Google Cloud 月度额度（来自 Google Developer Program） | 未列出 | US$10 | US$40 | US$100 |
| Antigravity 智能体请求额度 | 有限 | 扩展 | 更高 | 最高 |
| Jules 任务数 / 并发任务数 | 逐档提升（官方仅定性描述） | | | |
| Flow 额度 | 200 / 月 | 1,000 / 月 | 10,000 / 月 | 25,000 / 月 |
| Deep Think、Project Genie | ❌ | ❌ | ✅ | ✅ |

要点：

- **Antigravity 与 Jules 的额度在官方表里只有定性描述，没有任何具体数字**。不要引用"每日 N 次"这类数字。
- **Flow 积分有数字**：无订阅每天 50（试用，当日不结转）；付费档按上表按月发放，未用完不结转。日 / 月规则与单次消耗见 [Flow](./flow#额度)，本表不另抄。
- Pro 档编码相关权益（[14534406](https://support.google.com/googleone/answer/14534406)）：更高的 AI Studio / Antigravity / Jules 额度、Android Studio、Developer Program 的 US$10 Cloud 额度，以及 Flow / Spark / Notebook / Gemini app / Chrome auto browse。清单在 [订阅页](./google-pro)，不要在这里再抄一份。
- 拿到 Google Cloud 额度后**先设预算上限**：GCP 控制台 → 计费 → 预算和警报 → 按额度金额建预算并开启告警。

<!-- TODO: 待核实 —— 四档订阅各自的订阅价格（美元/月）。官方对比页在抓取时返回本地化版本并且吞掉了货币金额，未找到官方说明，历史文档里的"AI Pro $20/月"没有出处，已移除 -->

## 术语速查索引

一行一个概念，**完整定义只在 [术语表](./gemini-glossary) 里有一份**，这里只做跳转。

| 概念 | 一句话 | 详情 |
|---|---|---|
| Agent-first | 假设 AI 是能自主规划执行的行动者，而不是补全工具 | [详情](./gemini-glossary#agent-first) |
| Surface（表面） | Antigravity 的多个入口共享同一套智能体 harness | [详情](./gemini-glossary#surface-表面) |
| Rules（规则） | 长期生效的行为约束文件，分全局与工作区两级 | [详情](./gemini-glossary#rules-规则) |
| Skill（技能） | 一个含 `SKILL.md` 的目录，按需加载的专项能力 | [详情](./gemini-glossary#skill-技能) |
| Workflow（工作流） | 可用 `/名字` 显式调用的多步流程 | [详情](./gemini-glossary#workflow-工作流) |
| Subagent（子智能体） | 主智能体派出去并行干活的下级智能体 | [详情](./gemini-glossary#subagent-子智能体) |
| Artifact（构件） | 智能体产出的可审查中间产物 | [详情](./gemini-glossary#artifact-构件) |
| Checkpoint（检查点） | Gemini CLI 每次改动前存档，可 `/restore` 回滚 | [详情](./gemini-glossary#checkpoint-检查点) |
| Session（会话） | 一次对话的完整记录，可列出与恢复 | [详情](./gemini-glossary#session-会话) |
| Headless Mode（无头模式） | 用 `-p` 一次性执行，便于进管道 | [详情](./gemini-glossary#headless-mode-无头模式) |
| Trusted Folder（信任文件夹） | 未信任的目录里项目配置与自定义命令不生效 | [详情](./gemini-glossary#trusted-folder-信任文件夹) |
| MCP | 让智能体接外部工具的开放协议 | [详情](./gemini-glossary#mcp) |
| Extension（扩展） | Gemini CLI 的安装单元，常用来装 MCP 服务器 | [详情](./gemini-glossary#extension-扩展) |
| AGENTS.md | Jules 在仓库根目录自动读取的指令文件 | [详情](./gemini-glossary#agents-md) |
| Google Flow | AI 创意工作室，出视频不出代码 | [详情](./gemini-glossary#google-flow) |

## 配置速查

### Gemini CLI 配置层级

优先级由低到高：

| 层级 | 位置 |
|---|---|
| 系统默认 | `GEMINI_CLI_SYSTEM_DEFAULTS_PATH`，缺省为 Linux `/etc/gemini-cli/system-defaults.json`、Windows `C:\ProgramData\gemini-cli\system-defaults.json`、macOS `/Library/Application Support/GeminiCli/system-defaults.json` |
| 用户 | `~/.gemini/settings.json` |
| 项目 | `.gemini/settings.json` |
| 系统覆盖（最高） | `GEMINI_CLI_SYSTEM_SETTINGS_PATH`，缺省为 Linux `/etc/gemini-cli/settings.json`、Windows `C:\ProgramData\gemini-cli\settings.json`、macOS `/Library/Application Support/GeminiCli/settings.json` |

配置文件里可以用 `$VAR_NAME` 或 `${VAR_NAME}` 引用环境变量。完整可用键以 [settings.schema.json](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json) 为唯一真相源。

### 常用配置键

| 键 | 作用 |
|---|---|
| `general.checkpointing.enabled` | 开启检查点，之后可用 `/restore` 回滚（默认关闭） |
| `general.sessionRetention.enabled` | 开启会话自动清理（默认关闭） |
| `general.sessionRetention.maxAge` | 会话最长保留时间，如 `"30d"` |
| `general.sessionRetention.maxCount` | 最多保留的会话数 |
| `general.sessionRetention.minRetention` | 最短保留期限，默认 `"1d"` |
| `model.maxSessionTurns` | 单会话最大轮次，默认 `-1` 不限制 |
| `security.folderTrust.enabled` | 开启文件夹信任，信任列表落在 `~/.gemini/trustedFolders.json` |

> ⚠️ 历史版本文档里出现过 `security.allowedCommands`、`security.deniedCommands`、`security.sandboxMode`、`requireBranch`、`allowedBranchPattern`、`codeAssist.agentMode` 等配置键，**在官方 Schema 与官方文档中都不存在**，已全部移除。要做命令白名单请查 [策略引擎](https://geminicli.com/docs/core/policy-engine/)。

### 环境变量与提示词文件

| 项 | 作用 |
|---|---|
| `GEMINI_SYSTEM_MD=true`（或 `1`） | 启用自定义系统提示词，读取 `.gemini/system.md`；也可直接给绝对路径。生效时界面显示 `\|⌐■_■\|` 指示器 |
| `.gemini/.env` | 持久化环境变量 |
| `GEMINI_CLI=1` | 在 shell 模式里判断自己跑在 CLI 沙盒中 |

`system.md` 放不可协商的操作规则（安全、工具使用协议、批准机制）；`GEMINI.md` 放角色、目标、方法论与项目上下文。

### Antigravity 规则与技能路径

| 项 | 位置 | 说明 |
|---|---|---|
| 全局规则 | `~/.gemini/GEMINI.md` | 跨全部工作区生效 |
| 工作区规则 | `.agents/rules` 目录 | 随仓库走 |
| 规则长度上限 | 各 12,000 字符 | 官方明确上限 |
| 规则激活模式 | Manual / Always On / Model Decision / Glob | Glob 按文件模式匹配触发 |
| 技能 | `.agents/skills/<folder>/SKILL.md` 或 `~/.gemini/config/skills/<folder>/SKILL.md` | **技能是目录，不是单个 md 文件**；`.agent/skills` 仅为向后兼容保留 |
| 技能 frontmatter | `description` 必填，`name` 可选 | |
| 工作流调用 | `/<workflow-name>` | |
| 规则内交叉引用 | `@filename` | |

### Jules

| 项 | 值 |
|---|---|
| 安装 | `npm install -g @google/jules`（可执行文件名 `jules`） |
| 仓库指令文件 | 仓库根目录 `AGENTS.md`，Jules 自动读取 |
| 认证 | 需要浏览器完成 Google 账号授权 |

常用命令：

```bash
jules                                   # 打开交互式 TUI 看板（含并排 diff）
jules help
jules version
jules remote --help
jules remote list --repo                # 列出仓库
jules remote list --session             # 列出会话
jules remote new --repo <owner/repo> --session "<任务描述>"
jules remote new --parallel <number>    # 并行开多个任务
jules remote pull --session <id>        # 把结果拉到本地
jules completion bash                   # 生成 shell 补全
jules --theme dark                      # 全局选项：dark / light
```

> ⚠️ npm 包名是 `@google/jules`。历史版本文档里的 `@google/jules-tools`、`jules status`、`jules task list`、`jules pr apply`、`jules remote new "<desc>"`（缺 `--repo` / `--session`）、`--issue=` 均无官方出处，已移除。

## 高质量信息源

**最后一次系统性核实：2026-08-18。** 分级是本文档维护者按"是否官方 + 是否会随版本同步更新"排的，仅供参考。

### S 级：官方唯一真相源

| 来源 | 用途 |
|---|---|
| [Gemini CLI 文档](https://geminicli.com/docs/) | Gemini CLI 全部命令、配置、无头模式、会话、检查点 |
| [settings.schema.json](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json) | 配置键的唯一真相源，比文档更新更快 |
| [模型清单与停用清单](https://ai.google.dev/gemini-api/docs/models) | 当前可用模型、已停用模型、版本后缀语义 |
| [Antigravity 文档](https://antigravity.google/docs/home) | 表面、规则、技能、子智能体 |
| [Antigravity Rules/Workflows](https://antigravity.google/docs/rules-workflows) | 规则文件位置、字符上限、激活模式 |
| [Antigravity Skills](https://antigravity.google/docs/skills) | 技能目录结构与 frontmatter |
| [Jules CLI 命令参考](https://jules.google/docs/cli/reference/) | Jules 全部 CLI 命令与选项 |
| [Jules 文档](https://jules.google/docs/) | 云端工作流、`AGENTS.md`、环境配置脚本 |
| [Code Assist 概览](https://developers.google.com/gemini-code-assist/docs/overview) | 版本差异、支持的 IDE、智能体模式、企业能力 |
| [消费者账号弃用](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) | 2026-06-18 个人 / Pro / Ultra Login with Google 停服范围 |
| [Gemini CLI → Antigravity CLI 过渡](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli) | 消费者迁移时间线与企业不受影响的说明 |
| [Google AI plans](https://one.google.com/about/google-ai-plans/) | 四档订阅的额度对比 |
| [Google AI Pro 权益](https://support.google.com/googleone/answer/14534406) | Pro 档编码相关权益清单（Flow / Spark / Notebook / Jules / Antigravity） |
| [Flow 额度](https://support.google.com/flow/answer/16526234) | Flow 日 / 月积分与单次消耗 |

### A 级：官方但更新较慢或偏营销

| 来源 | 用途 |
|---|---|
| [gemini-cli 仓库](https://github.com/google-gemini/gemini-cli) | Issue 里能找到文档没写的行为 |
| [Gemini CLI 发布通道](https://geminicli.com/docs/changelogs/) | nightly / preview / stable 差异 |
| [Gemini CLI 扩展市场](https://geminicli.com/extensions/) | 可用扩展清单 |
| [Canvas 概览](https://gemini.google/overview/canvas/) | Canvas 唯一官方页面，偏产品介绍 |
| [Google Flow 落地页](https://labs.google/fx/tools/flow) | 模型、模式、Tools、Sessions、档位积分 |
| [Flow 帮助中心](https://support.google.com/flow) | 创建视频、Scenebuilder、地区可用性 |
| [Gemini API 计费](https://ai.google.dev/gemini-api/docs/billing) | API 计费口径 |
| [长上下文文档](https://ai.google.dev/gemini-api/docs/long-context) | 长上下文使用建议 |

### B 级：需交叉验证

社区教程、第三方博客、视频。Gemini 家族命令名变动频繁，**社区内容过期率极高**，只用来找思路，不要用来抄命令。

> 注意区分官方与非官方域名：`geminicli.com` 是官方文档站（由 `github.com/google-gemini/gemini-cli` 指向）；其他形似域名不是。

## 相关页面

- [学习地图](./index) — 从哪开始、按什么顺序学
- [Cookbook](./gemini-cookbook) — 场景化配方
- [术语表](./gemini-glossary) — 概念定义与关系
- [Gemini CLI](./gemini-cli) — 主教程
