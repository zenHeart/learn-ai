# Codex 生态学习导航

> Codex 是 OpenAI 的编程 Agent。它和 ChatGPT 的 Chat、Work 一起住在同一套网页 / 桌面应用里，再加 CLI、IDE 和云端。本页是全家桶地图：先看清产品树，再按「我要做什么」落到具体页。
>
> 官方文档在 `learn.chatgpt.com/docs`。旧地址 `developers.openai.com/codex/*` 会 308 过去。

## 产品全景图

OpenAI 这一侧不是「一个 CLI」，而是同一账号下的几层产品。2026-07-09 起，独立 Codex 桌面应用并入 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app)：里面同时有 Chat、Work、Codex。

```
OpenAI 编程与智能代理生态
├── ChatGPT Chat（对话智能）— 问答、写作、比方案
│   ├── 网页 chatgpt.com
│   ├── 桌面应用（macOS / Windows；Linux 预览）
│   └── 手机（含 Remote 接着本机会话）
├── ChatGPT Work（知识工作代理）— 做到可审的成品
│   ├── 云端（网页默认；关电脑也能跑）
│   ├── 本机（桌面 Work locally：本地文件 / 应用）
│   ├── 定期任务 Scheduled
│   ├── 插件 Plugins（Slack / Drive / SharePoint…）
│   └── Sites（托管网页 / 内部工具，公开测试）
├── Codex（编程代理）— 写代码、调试、提 PR
│   ├── 终端 CLI            — 最灵活，可进 CI
│   ├── IDE 扩展            — 编辑器上下文、行内 diff
│   ├── 桌面应用里的 Codex   — 可视化 diff、PR 侧栏、多仓库
│   ├── 网页 chatgpt.com/codex
│   ├── Cloud               — 隔离环境，可并行、可从 GitHub / Linear / Slack 派活
│   └── Remote              — 手机接着本机或云端任务
└── 已下线：Atlas 独立浏览器
    └── 官方于 2026-08-09 停止；浏览代理能力并入 ChatGPT / Codex
```

这是**一套配置、一个 Agent 内核**，入口不同。CLI 里学会的沙箱、审批和 `AGENTS.md`，在 IDE / 桌面 Codex / Cloud 同样生效。Work 和 Codex **共用用量额度**。

### 快速决策：我要做什么？

```
我要做什么？
├── 写代码 / 调试 / 重构 / 提 PR
│   └── → Codex
│       ├── 在终端 / CI？→ CLI（codex / codex exec）
│       ├── 在编辑器里对着当前文件？→ IDE 扩展
│       ├── 要可视化 diff / PR 侧栏？→ 桌面应用里的 Codex
│       ├── 没带电脑 / 要并行多试几次？→ Codex Cloud（chatgpt.com/codex）
│       └── 在 GitHub / Linear / Slack 里派活？→ Cloud + 官方集成
├── 问答 / 写作 / 比方案 / 把设计谈清楚
│   └── → ChatGPT Chat（网页、桌面或手机）
│       ├── 需要持久主题上下文？→ Project
│       ├── 需要语音？→ 桌面 / iOS Voice
│       └── 谈定后要落地仓库？→ 写成任务说明，交给 Codex
├── 要一份能打开的 PPT / 表 / 简报 / 定期汇报
│   └── → ChatGPT Work
│       ├── 源材料在网盘 / Slack？→ 装插件，提示词里 @它
│       ├── 要动本机文件或应用？→ 桌面 Work locally
│       ├── 关电脑也要跑？→ Cloud / 网页 Work
│       └── 要托管一个内部页？→ Sites（先 save version，再 deploy）
├── 接入外部服务
│   └── → 分清两层
│       ├── 日常 SaaS（Drive / Slack / Notion 类）→ Work / Chat 的 Plugins
│       └── 仓库、CI、自建工具 → Codex MCP（见项目集成）
└── 还在找 Atlas 浏览器？
    └── → 独立 Atlas 已停。用桌面内置浏览器、Chrome 扩展或 Work 的 Cloud Browser
```

## 核心概念速览

完整定义在 [术语表](./codex-glossary)。

| 概念 | 一句话 | 出现位置 |
| --- | --- | --- |
| **Chat / Work / Codex** | 同一应用里的三种工作方式：聊、做完、写代码 | 全局 |
| **沙箱** | 文件和网络的硬边界 | Codex |
| **审批策略** | 行动前要不要问你 | Codex |
| **`AGENTS.md`** | 每次运行自动加载的项目简报 | Codex 全入口 |
| **MCP / Plugins** | 接到仓库外的工具；Work 侧叫插件 | Codex / Work |
| **Sites** | ChatGPT 托管网页和应用（公开测试） | Work / 网页 |
| **Codex Cloud** | 在托管环境里并行跑编程任务 | Codex |
| **Atlas** | 已下线的独立浏览器，能力并入 ChatGPT / Codex | 历史 |

## 学习路径

### 第一阶段：分清 Chat、Work、Codex

先建立「同一账号、三种工作方式」的心智模型，再碰终端。

**目标**：会切 Chat / Work / Codex，知道套餐含什么、数字去哪查。

| 步骤 | 内容 | 链接 |
| --- | --- | --- |
| 1 | 产品线：四个 Codex 入口 + 桌面合并 | [Codex 产品线](./codex-ai) |
| 2 | 套餐、登录、Chat 和 Codex 怎么配对 | [ChatGPT 套餐与访问](./chatgpt-plus) |
| 3 | Work：可审成品、本地 vs 云端、插件、Sites | [ChatGPT Work](./chatgpt-work) |

### 第二阶段：上手 Codex CLI

面向前端工程师的主路径。

**目标**：能在熟悉的仓库里只读跑一次，配好沙箱和 `AGENTS.md`。

| 步骤 | 内容 | 链接 |
| --- | --- | --- |
| 1 | 安装 + 登录 + 第一次只读会话 | [Codex CLI](./codex-cli) 第 1–3 步 |
| 2 | TUI 快捷键和斜杠命令 | [→ 交互基础](./codex-cli#第-4-步--在-tui-里工作) |
| 3 | `sandbox_mode` 与 `approval_policy` | [→ 配置](./codex-cli#第-6-步--配置) |
| 4 | `/init` 写出 `AGENTS.md` | [→ CLI](./codex-cli) 第 7 步 |
| 5 | 日常任务配方 | [Cookbook](./codex-cookbook) |
| 6 | flag / 配置键随手查 | [Cheatsheet](./codex-cheatsheet) |
| 7 | 概念记混了查定义 | [术语表](./codex-glossary) |

只读两页：先 [CLI](./codex-cli)，再钉住 [速查表](./codex-cheatsheet)。

### 第三阶段：接到真实项目和 CI

**目标**：提交一份有效的 `AGENTS.md` 和 `.codex/config.toml`，CI 里用 `codex exec`。

| 步骤 | 内容 | 链接 |
| --- | --- | --- |
| 1 | 指令链、信任、项目配置 | [项目集成](./integration) |
| 2 | MCP、Hooks、Subagents | [→ 集成](./integration#mcp-服务器) |
| 3 | `codex exec` + GitHub Action | [→ CI](./integration#ci-集成) |

### 第四阶段：云端、托管评审、远程

**目标**：会为仓库建 Cloud 环境；知道托管评审用哪颗模型。

| 步骤 | 内容 | 链接 |
| --- | --- | --- |
| 1 | 何时用 Cloud、`codex cloud exec` | [产品线 · Cloud](./codex-ai#cloud-网页与托管评审) |
| 2 | 从 GitHub / Linear / Slack 派任务 | [Codex cloud](https://learn.chatgpt.com/docs/cloud) |
| 3 | 本机 `/review` vs 托管 code review | [Code review](https://learn.chatgpt.com/docs/code-review) |

### 第五阶段：Work 自动化（知识工作）

轴 B：Work 更靠近非编程日常，排在 Codex 主路径之后。前端仍然会用它写周报、出 Sites、盯 Slack。

| 步骤 | 内容 | 链接 |
| --- | --- | --- |
| 1 | Work 定位与三个官方起步任务 | [ChatGPT Work](./chatgpt-work) |
| 2 | 本地 vs 云端、定期任务 | [→ Work](./chatgpt-work#2-选本地还是云端) |
| 3 | 插件与 Sites 边界 | [→ Work](./chatgpt-work#插件接到你真正在用的工具) |

## 功能速查表

### ChatGPT Chat

| 功能 | 用途 | 去哪读 |
| --- | --- | --- |
| Chat | 问答、草稿、把设计谈清楚 | [套餐与访问](./chatgpt-plus#chatgpt-chat-对话智能) |
| Projects | 同一主题下的会话、文件、指令 | [Projects](https://learn.chatgpt.com/docs/projects) |
| Voice | 桌面 / iOS 语音，可对着文件和 Project | [Voice](https://learn.chatgpt.com/docs/features/voice) |
| Library | 已保存文件再次引用 | [套餐与访问](./chatgpt-plus) |

### ChatGPT Work

| 功能 | 用途 | 文档 |
| --- | --- | --- |
| 可审成品 | PPT / 表 / 文档 / PDF | [ChatGPT Work](./chatgpt-work) |
| 本地 / 云端 | 本机文件 vs 关电脑续跑 | [ChatGPT Work](./chatgpt-work#2-选本地还是云端) |
| 插件 | Drive / Slack / SharePoint… | [ChatGPT Work](./chatgpt-work#插件接到你真正在用的工具) |
| Sites | 托管网页和应用（公开测试） | [ChatGPT Work](./chatgpt-work#sites需要托管页面时) |
| 定期任务 | 重复调研、议程、监控 | [ChatGPT Work](./chatgpt-work#做定期更新) |

### Codex 核心功能

| 功能 | 用途 | 文档 |
| --- | --- | --- |
| 终端 CLI | 项目目录里交互；CI 用 `codex exec` | [CLI](./codex-cli) |
| IDE 扩展 | 当前文件 / 选区 | [产品线](./codex-ai) |
| 桌面 Codex | diff、PR 侧栏、多仓库、Computer Use | [产品线](./codex-ai) |
| Web / Cloud | 托管环境、并行、`--attempts` | [产品线](./codex-ai#cloud-网页与托管评审) |
| 托管评审 | Cloud 上的 code review / QA；合格客户用 GPT-5.6 Sol | [产品线](./codex-ai#cloud-网页与托管评审) |
| `AGENTS.md` | 项目简报 | [集成](./integration) |
| MCP / Hooks / Skills / Plugins | 扩展面 | [术语表](./codex-glossary) |
| 实战配方 | 重构、测试、排错 | [Cookbook](./codex-cookbook) |
| 配置速查 | flag、键、决策表 | [Cheatsheet](./codex-cheatsheet) |

## 模型参考

截至 2026 年 8 月，官方推荐的 5.6 家族是 **Sol / Terra / Luna**。默认 **Power** 使用中等推理的 Sol。名称会变，以 [Models](https://learn.chatgpt.com/docs/models) 为准。

| 模型 | 官方定位 | 本教程怎么用 |
| --- | --- | --- |
| GPT-5.6 Sol | 旗舰：复杂编程、Computer Use、研究、安全 | Cloud 托管评审 / QA 对合格客户自动用 Sol |
| GPT-5.6 Terra | 能力与成本折中 | 日常本地 / 网页任务 |
| GPT-5.6 Luna | 最快、最便宜 | 小改动、子代理、高通量 |
| GPT-5.3-Codex-Spark | ChatGPT Pro 研究预览 | 仅 Pro；见定价页 |

`config.toml` 示例仍写 `model = "gpt-5.6"`。Chat 里的 Sol 滑块**不**改变 Work / Codex 的模型行为。GPT-5.4 / 5.4 mini 将于 2026-08-31 从 ChatGPT 登录的 Codex 下线。

## 诚实的限制

- **一定要看 diff 和成品文件。** 看起来对 ≠ 正确。
- **`danger-full-access` 名副其实。** 没读过的仓库不要开。
- **搜索默认走缓存。** 查变动很快的库时加裸 `--search`。
- **Sites 的部署 URL 就是生产。** 先 save version。
- **版本会漂。** 稳定版大约每周一个 minor。和 `learn.chatgpt.com/docs` 冲突时以官方为准。

## 和同类工具比

| 如果你要 | 考虑 |
| --- | --- |
| OpenAI 套餐上的终端 / 云端 Agent | **Codex** |
| 同一套餐上的知识工作代理 | [ChatGPT Work](./chatgpt-work) |
| Anthropic 套餐上的对应全家桶 | [Claude Code 生态](../claude/) |
| 围绕 AI 做的编辑器 | [Cursor](../cursor) |
| 现有编辑器里的行内补全 | [GitHub Copilot](../copilot) |

## 官方来源

| 来源 | 用来查什么 |
| --- | --- |
| [Codex 文档根](https://learn.chatgpt.com/docs) | 一切 |
| [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) | Chat / Work / Codex 怎么选 |
| [Get started with Work](https://learn.chatgpt.com/docs/get-started-with-work) | Work |
| [Codex cloud](https://learn.chatgpt.com/docs/cloud) | 托管编程环境 |
| [What's new](https://learn.chatgpt.com/docs/whats-new) | 周报级能力变化 |
| [Pricing](https://learn.chatgpt.com/docs/pricing) | 套餐和配额的唯一权威 |
| [Atlas 演进说明](https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work) | Atlas 下线（官方） |
| [openai/codex](https://github.com/openai/codex) | 源码与发行版 |

> 文档页带 `?surface=cli|app|ide`。页面像在讲另一个产品时，先看当前 surface。
