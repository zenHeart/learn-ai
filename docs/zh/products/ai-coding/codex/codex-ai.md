# Codex 产品线

> Codex 不是一个程序。它是同一个 Agent，从四个入口进入，共用一套配置。本页画产品形状，决定某个任务该落在哪之前先读它。
>
> 概念定义在 [术语表](./codex-glossary)；本页讲产品形态。

## Codex 是什么

官方文档原文：

> Codex is OpenAI's coding agent for software development.

关键词是 *agent*。补全工具建议下一行；Agent 读你的文件、跑你的命令、对着结果迭代。沙箱、审批策略、信任模型之所以存在，都是因为 Codex 会动手，而不是只建议。

文档写明的能力有五项：

| 能力 | 实际意味着 |
| --- | --- |
| **写代码** | 按你的意图生成，并贴合现有项目结构和约定 |
| **读陌生代码库** | 读并解释它从没见过的代码 |
| **评审代码** | 找潜在 bug、逻辑错误、未处理的边界 |
| **调试和修复** | 顺着失败追根因，做针对性修改 |
| **自动化开发任务** | 重构、测试、迁移、项目搭建 |

## 四个入口，一套配置

```
                    ┌──────────────────────────────┐
                    │   ~/.codex/config.toml       │
                    │   AGENTS.md · Rules          │
                    │   MCP · Skills · Hooks       │
                    └───────────┬──────────────────┘
                                │  同一套配置
        ┌───────────────┬───────┴───────┬───────────────┐
        │               │               │               │
   ┌────▼────┐    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
   │   CLI   │    │    IDE    │   │  Desktop  │   │   Cloud   │
   │ `codex` │    │   扩展    │   │    应用   │   │  / Web    │
   └─────────┘    └───────────┘   └───────────┘   └───────────┘
   终端、可脚本     编辑器上下文     GUI、本地浏览     远程、可并行
```

共用配置才是重点。给 CLI 写的 `AGENTS.md` 对 IDE 扩展同样生效。你设的沙箱模式到处适用。模型学一次就够。

### CLI

终端入口，也是本教程的中心。它是唯一能完整脚本化的入口，所以也是自动化入口。

```bash
codex                                    # 交互
codex exec "run the tests and fix failures"    # 一次性、非交互
```

任务能脚本化、人已经在终端里、或者必须进 CI 时，选 CLI。

参考：[CLI 文档](https://learn.chatgpt.com/docs/codex/cli)

### IDE 扩展

跑在编辑器里，带着编辑器对「当前文件、当前选区」的理解。

任务钉在你正在读的代码上时选它——编辑器已经知道你本来要口述的上下文。

参考：[IDE 扩展文档](https://learn.chatgpt.com/docs/codex/ide) · 本教程 [IDE](./codex-ide)

### 桌面应用

2026-07-09 起，独立 Codex 应用并入 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app)。更新旧 Codex 应用后，同一窗口里是 Chat、Work、Codex。可以继续把 Codex 设为默认视图、继续用 Codex 图标。

图形入口有终端没有的能力：应用内浏览器、worktree、本地环境、PR 侧栏、多仓库项目、Computer Use。需要浏览器参与，或想同时看见多个任务时，选桌面 Codex——不要和 [ChatGPT Work](./chatgpt-work) 搞混：Work 默认藏起 Git / shell，也没有 PR 面板。

### Cloud、网页与托管评审 {#cloud-网页与托管评审}

Agent 跑在 OpenAI 的基础设施上，对着配置好的环境，而不是你的笔记本。产品入口是 [chatgpt.com/codex](https://chatgpt.com/codex)，文档是 [Codex cloud](https://learn.chatgpt.com/docs/cloud)。教程：[Codex Cloud](./codex-cloud)。手机遥控**本机**主机是 [Remote](./codex-remote)，不是 Cloud。

```bash
codex cloud                                            # 浏览环境（Ctrl+O 露出 ID）
codex cloud exec --env <ENV_ID> "run the migration dry run"
codex cloud exec --env <ENV_ID> --attempts 3 "..."     # 1–4 次尝试
```

官方建议在这些时候用 Cloud：

- 长任务要在后台跑，不占本机
- 要并行多试几次再挑
- 活是从 **GitHub / Linear / Slack** 派出来的
- 人不在开发机旁，只带着网页或 CLI

起步：登录 → 连接 GitHub → 在 [environment settings](https://chatgpt.com/codex/settings/environments) 配依赖和密钥 → 丢任务 → 审 summary / diff → 需要时开 PR。环境细节见 [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)。

**托管评审不是第四个产品。** 它是 Cloud / 网页上的评审面：

| 面 | 做什么 | 出处 |
| --- | --- | --- |
| 本机 `/review` | 相对 base 分支或未提交改动，不改工作树 | CLI / IDE / 桌面 |
| Codex cloud code review / QA | 托管环境里的评审和质检 | [What's new](https://learn.chatgpt.com/docs/whats-new)（2026-07-27 周）：合格客户由 **GPT-5.6 Sol** 驱动；Cloud **自动选模型**，Terra / Luna 仍在本地和网页 |
| Codex Security Review | 结合仓库上下文和威胁模型看 PR；可在 PR 打开时自动跑，或 `@codex security review` | 研究预览；Enterprise / Business / Edu / Pro；**没有 Plus** |

不要为「hosted review」单独立页：它是 Cloud 的一种用法，配置和配额仍走套餐与 Cloud 环境。

> 文档页带 `?surface=cli|app|ide` 选择器。页面描述的功能你没有时，先看当前选的是哪个 surface。

## 一次运行实际怎么走

搞清顺序，大部分「奇怪行为」就解释了。

```
1. 组装指令链
   全局 AGENTS.md → 项目 AGENTS.md 链（根 → 当前目录）
   每次运行重建。没有缓存。
        │
2. 加载配置层
   ~/.codex/config.toml → profile → 已信任项目的 .codex/ → CLI flag
        │
3. 读提示，做计划
        │
4. 行动：读文件、跑命令、调 MCP
   每一步都经过：sandbox_mode → approval_policy → hooks
        │
5. 汇报；验收失败就再迭代
```

三条后果值得内化：

- **指令文件每次运行重读**，改 `AGENTS.md` 下次调用就生效，没有缓存要清。
- **项目配置只对已信任项目加载。** `.codex/config.toml` 看起来没作用，先查这个。
- **先查沙箱，再查审批。** 只读沙箱不可能被「说动」去写文件，审批策略再松也没用。

## 在编程工具谱系里的位置

| | 补全工具 | IDE 内 Agent | 终端 Agent |
| --- | --- | --- | --- |
| **工作单元** | 接下来几行 | 一个文件或选区 | 跨文件的一项任务 |
| **跑命令** | 否 | 有时 | 是 |
| **可脚本 / CI** | 否 | 很少 | 是 |
| **你审的是** | 每条建议 | 每次编辑 | 最终 diff |
| **例子** | Copilot 补全 | Cursor、Copilot Agent | **Codex CLI**、Claude Code |

Codex 跨了不止一列——IDE 扩展在中间，CLI 在右边——但真正有辨识度的能力在 CLI：非交互执行、沙箱模式、subagent、云端卸载。

实用选择：

- **自己打字，只想更快** → 补全工具
- **改正在读的代码** → IDE 扩展
- **一句话说清、跨好几个文件的任务** → Codex CLI
- **必须没人值守也能跑** → `codex exec`
- **已经在 OpenAI 生态里** → Codex，访问权含在 ChatGPT 套餐里

## 扩展面

Codex 在几个不同的点上扩展。知道该伸手去哪个，是大部分技能。

| 点 | 性质 | 什么时候用 |
| --- | --- | --- |
| **AGENTS.md** | 自然语言简报 | 能用散文说清 |
| **Rules** | 结构化约束 | 必须可强制，不能只是建议 |
| **MCP** | 外部工具和数据 | Agent 需要摸到机器外面 |
| **Skills** | 打包好的工作流 | 流程会重复，值得起名 |
| **Hooks** | 生命周期上的命令 | 必须确定发生 |
| **Subagents** | 被委派的 Agent | 子任务值得自己的上下文 |
| **Plugins** | 分发打包 | 不止一个人需要上面这些 |

承重区分：**`AGENTS.md` 是模型可以和其他指令权衡的建议；hook 是不管怎么权衡都会跑的机制。** 某一步不能被跳过，它就是 hook。

Hook 事件：`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`。目前只有 command hook 会执行——prompt / agent hook 会被解析但跳过。

决策规则见 [Cookbook 扩展选型](./codex-cookbook)。

## 安全模型

三层，按顺序检查，第一层是机制而不是建议。

**沙箱** — `read-only`、`workspace-write` 或 `danger-full-access`。文件和网络访问的硬边界。日常默认 `workspace-write`；只读让对抗性评审可信。

**审批策略** — `untrusted`、`on-request`、`never`，或 granular 表。控制行动前要不要停下来问。TUI 里通过 `/permissions` 看到的是 `Auto`、`Read-only`、`Full Access`。

**项目信任** — `projects.<path>.trust_level`。未信任项目的 `.codex/` 层完全不加载：没有项目配置、没有项目 hooks、没有项目 rules。这是 clone 一个还没读过的仓库时保护你的那一层。

> `--yolo` 打开完全访问，同时把网页搜索切到 live。这是真实存在的 flag，也有存在的理由，但它拆掉了本来能拦住错误的那一层。先试 `--ask-for-approval never` 配普通沙箱——停掉询问，但不拆边界。

## 模型

```toml
model = "gpt-5.6"
model_reasoning_effort = "medium"    # minimal | low | medium | high | xhigh
model_reasoning_summary = "auto"     # auto | concise | detailed | none
model_verbosity = "medium"           # low | medium | high
review_model = "gpt-5.6"
```

`gpt-5.6` 是当前 [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) 示例里的模型名。定价页上的 5.6 家族是 Sol / Terra / Luna。ChatGPT Pro 另有研究预览 `GPT-5.3-Codex-Spark`。`model_reasoning_effort` 作用于 Responses API。模型名会变；以 [Models](https://learn.chatgpt.com/docs/models) 为准，包括本页。

`review_model` 让评审运行用和写作不同的模型——需要更强模型做批评时有用。

权威列表是 [Models](https://learn.chatgpt.com/docs/models)。

## 能力与边界

**靠得住的：** 读陌生代码、机械的多文件改动、按给定契约写测试、从复现命令追失败、在约定之间翻译。

**需要人盯的：** 有长期后果的架构决策、「对不对」取决于仓库里没有的业务上下文、需要真实测量的性能工作、安全敏感改动。

**结构上做不到的：** 知道仓库和指令文件里没有的事、验证它跑不了的东西、在没有测试证明的情况下确信改动安全。

最后一条最实用。几乎每次失望的 Codex 会话，都能追溯到接受了一份从没被执行过的改动。修法是提示词里加一句：*run the tests and show me the output.*

## 相关页面

- [学习地图](./) — 全家桶与决策树
- [Codex CLI](./codex-cli) — 安装与核心功能
- [ChatGPT Work](./chatgpt-work) — 知识工作代理（不是 Codex）
- [ChatGPT 套餐与 Codex 访问](./chatgpt-plus) — 访问权怎么来
- [项目集成](./integration) — 接到真实项目
- [Codex Cookbook](./codex-cookbook) — 任务配方
- [Codex 术语表](./codex-glossary) — 概念定义
- [Codex 速查表](./codex-cheatsheet) — 查询

## 官方来源

- [Codex 文档](https://learn.chatgpt.com/docs)
- [CLI](https://learn.chatgpt.com/docs/codex/cli) · [IDE](https://learn.chatgpt.com/docs/codex/ide) · [App](https://learn.chatgpt.com/docs/app)
- [Codex cloud](https://learn.chatgpt.com/docs/cloud) · [Code review](https://learn.chatgpt.com/docs/code-review)
- [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) · [Permissions](https://learn.chatgpt.com/docs/permissions)
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Models](https://learn.chatgpt.com/docs/models) · [Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity)
- [What's new](https://learn.chatgpt.com/docs/whats-new)
