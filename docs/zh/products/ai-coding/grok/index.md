# Grok 学习地图

> **Grok Build** 是 xAI 的第一方终端编程 Agent。可执行文件名是 `grok`，源码开放在 [xai-org/grok-build](https://github.com/xai-org/grok-build)。
>
> 官方定义（[docs.x.ai/build/overview](https://docs.x.ai/build/overview)）：
> "**Grok Build** is a powerful and extensible coding agent. Use it via an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps."

## 产品全景

好几个 xAI 产品都带 "Grok" 或 "Build" 这两个词。它们**不是**同一个产品的四张皮。本目录这套页面讲的是 **Grok Build**（终端编程 Agent）。其余官方形态必须先画进决策树，否则会进错门。

```
xAI / Grok 家族
├── Grok（聊天）— grok.com、iOS、Android、X
│   ├── 对话 / 搜索 / 语音 / 上传文件
│   ├── Imagine — 生图与视频（也在 grok.com/imagine）
│   └── Build Mode — 对话里做网站 / 应用 / 游戏，发布到 grok.me
├── Grok Build — 终端编程 Agent（命令 `grok`）
│   ├── 交互式 TUI
│   ├── Headless（`grok -p`）
│   └── ACP（`grok agent stdio`）
├── Grok Bot — 跑在持久云电脑上的具名同事
└── xAI API — 模型 HTTP API，含 Imagine API
```

| 产品 | 是什么 | 入口 | 对位 Claude 家族 |
|------|--------|------|------------------|
| **Grok Build** | 对着真实仓库干活的终端编程 Agent | 命令 `grok` | Claude Code CLI |
| Grok（聊天） | 通用助手 | [grok.com](https://grok.com)、Grok App、X | Claude.ai |
| Imagine | 生图 / 生视频 / 编辑 | [grok.com/imagine](https://grok.com/imagine)，或 [Imagine API](https://docs.x.ai/developers/model-capabilities/imagine) | Claude Design（创作面，不是编程 Agent） |
| Build Mode | 聊天里出可运行预览并发布链接 | grok.com / Grok App 的模式切换选 **Build** | 更接近 Claude.ai Artifacts，**不是** Claude Code |
| Grok Bot | 共享云 VM 上的常驻同事 | [x.ai/bot](https://x.ai/bot) 桌面 + iOS | Cowork（任务 Agent，不是仓库 CLI） |
| xAI API | 模型 / Imagine / Voice 的 HTTP API | [docs.x.ai/developers/quickstart](https://docs.x.ai/developers/quickstart) | Anthropic API |

**容易撞名的几条：**

- **Grok Build ≠ Build Mode**。Grok Build 是终端 Agent（`docs.x.ai/build/*`）。Build Mode 是 grok.com 的聊天模式：在对话里写出可运行预览并发布（[x.ai/news/grok-build-mode](https://x.ai/news/grok-build-mode)）。
- **grok.me** 是 Build Mode 的**发布域名**（官方原文："Publish to a grok.me link or a custom domain you own"）。它不是独立产品，也不是 Grok Build CLI。
- **Grok Bot ≠ Grok Build 的 headless "bots"**。Grok Bot 是桌面 / iOS 产品，自己的文档树在 [docs.x.ai/grok-bot](https://docs.x.ai/grok-bot/overview)。
- **没有官方 IDE 插件**。要在编辑器里用 Grok Build，走 ACP（`grok agent stdio`）。[terminal-support](https://docs.x.ai/build/cli/terminal-support) 只记录 VS Code / Cursor / Windsurf / Zed 内置终端的按键差异。

账号也**不是**同一口池子。Grok Build 接受 SuperGrok / X Premium Plus 登录或 `XAI_API_KEY`。Grok Bot 用 **Cursor** 账号认证，资格是 SuperGrok Heavy、Cursor Ultra、Cursor Teams Premium（[get-started](https://docs.x.ai/grok-bot/get-started)）。Build Mode 的 Early Beta 仅 SuperGrok Heavy。

### 快速决策：我该用哪个？

```
我要做什么？
├── 在真实仓库里写代码 / 调试 / 重构 / 提 PR
│   └── → Grok Build（`grok`）
│       ├── 在终端？→ TUI（`grok`）
│       ├── 在 CI / 脚本？→ headless（`grok -p`）
│       └── 在编辑器里？→ ACP（`grok agent stdio`）——没有官方 VS Code 插件
├── 聊天 / 写作 / 调研 / 语音 / 上传文件
│   └── → grok.com 或 Grok iOS / Android App
├── 生图 / 生视频 / 改图改视频
│   └── → Imagine
│       ├── 在产品里？→ grok.com/imagine（grok.com 对话里也能用）
│       └── 在自己的程序里？→ Imagine API
├── 在聊天里做网站 / 应用 / 游戏并分享链接
│   └── → Build Mode（grok.com 模式切换 → Build）
│       └── SuperGrok Heavy Early Beta；发布到 grok.me 或自定义域名
├── 把活交给同事，合上笔记本也继续跑
│   └── → Grok Bot（桌面 + iOS）
│       └── SuperGrok Heavy / Cursor Ultra / Cursor Teams Premium
└── 在自己的软件里调模型
    └── → xAI API
```

来源：[docs.x.ai/grok/overview](https://docs.x.ai/grok/overview)、[docs.x.ai/build/overview](https://docs.x.ai/build/overview)、[docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview)、[x.ai/grok](https://x.ai/grok)、[x.ai/grok/build-mode](https://x.ai/grok/build-mode)、[x.ai/news/grok-build-mode](https://x.ai/news/grok-build-mode)、[docs.x.ai/developers/model-capabilities/imagine](https://docs.x.ai/developers/model-capabilities/imagine)、[x.ai/bot](https://x.ai/bot)。

## Grok Build 的三种使用面

| 使用面 | 入口 | 用在哪 |
|--------|------|--------|
| 交互式 TUI | `grok` | 日常开发，全屏终端界面 |
| Headless | `grok -p "<提示词>"` | 脚本、CI、批处理 |
| ACP | `grok agent stdio` | 被编辑器 / 自建编排器嵌入（JSON-RPC over stdin/stdout） |

来源：[docs.x.ai/build/overview](https://docs.x.ai/build/overview)、[docs.x.ai/build/cli/reference](https://docs.x.ai/build/cli/reference)

## 什么时候值得试 Grok Build

**什么情况下值得试？**

- 你已经在用 Claude Code，想低成本横向对比。官方明确宣称零配置兼容（读 `CLAUDE.md`、`.claude/settings.json`，接受 Claude Code 的 flag 别名，`grok import` 可导入 Claude Code 会话）——迁移成本几乎为零。
- 你需要终端里的长任务编排：后台任务、定时循环、subagent 并行、worktree 隔离都是内置能力。
- 你已经是 SuperGrok 或 X Premium Plus 订阅者（[发布公告](https://x.ai/news/grok-build-cli) 原文：Available now to all SuperGrok and X Premium Plus subscribers），或者手上有 `XAI_API_KEY`。

**什么情况下先别急？**

- 你要的是 IDE 内联补全 —— Grok Build 是终端 Agent，没有补全能力，也没有官方 IDE 插件。
- 你要的是合上笔记本还继续干活的同事 —— 那是 [Grok Bot](./grok-bot.md)，不是 Grok Build。
- 你要的是不用安装、聊天里出预览并发布 `*.grok.me` 链接 —— 那是 grok.com 上的 Build Mode，SuperGrok Heavy Early Beta。
- 你需要长期稳定的产品面 —— Grok Build 仍处于 beta。npm `@xai-official/grok` 的 `latest` 在 2026-08-12 还是 1.0.3，2026-08-16 已是 1.0.5；命令与配置键仍在变动。绑定任何东西之前先跑 `grok version` 并对 [changelog](https://x.ai/build/changelog)。

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 装上能跑 | [Grok Build 教程](./grok-cli.md) 的安装与认证 | 15 分钟内跑通第一次对话 |
| 2. 会用核心能力 | [Grok Build 教程](./grok-cli.md) 的 TUI / 计划模式 / 权限 | 敢让它改代码 |
| 3. 接进工作流 | [实战 Cookbook](./grok-cookbook.md) | headless、CI、hooks、MCP、subagent |
| 4. 回查参数 | [速查表](./grok-cheatsheet.md) | 命令、flag、配置键、环境变量、价格 |
| 5. 理清概念 | [术语表](./grok-glossary.md) | 权限模式 vs 沙箱、skill vs plugin、memory vs session |

## 功能速查表

下表只列 Grok Build 已有官方文档页的能力，每项都指向官方原文。

| 能力 | 一句话 | 官方文档 |
|------|--------|----------|
| 计划模式 Plan Mode | 先出计划、审批后再动手 | [plan-mode](https://docs.x.ai/build/features/plan-mode) |
| 权限规则 | `allow` / `ask` / `deny` 规则匹配工具调用 | [permissions](https://docs.x.ai/build/features/permissions) |
| 沙箱 Sandbox | Landlock / Seatbelt 系统级隔离，5 档 profile | [sandbox](https://docs.x.ai/build/features/sandbox) |
| 项目规则 | 读 `AGENTS.md`，也读 `CLAUDE.md` / `.cursor/rules` | [project-rules](https://docs.x.ai/build/features/project-rules) |
| Skills | `SKILL.md` 定义可复用能力，可作 `/<name>` 调用 | [skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) |
| Plugins / Marketplace | 打包 skills+commands+agents+hooks+MCP 分发 | [skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) |
| Hooks | 生命周期事件触发外部命令，可拦截工具调用 | [hooks](https://docs.x.ai/build/features/hooks) |
| MCP | `grok mcp add`，工具名空间为 `<server>__<tool>` | [mcp-servers](https://docs.x.ai/build/features/mcp-servers) |
| Subagents / Personas | 内置 `general-purpose` / `explore` / `plan`，可自定义 | [subagents](https://docs.x.ai/build/features/subagents) |
| Sessions | 按工作目录归档，可 resume / fork / rewind / compact | [sessions](https://docs.x.ai/build/features/sessions) |
| Worktrees | 在 `~/.grok/worktrees/` 里开隔离分支干活 | [worktrees](https://docs.x.ai/build/features/worktrees) |
| 后台任务 | 任务面板 + `/loop` 定时循环 | [background-tasks](https://docs.x.ai/build/features/background-tasks) |
| Dashboard | 多会话状态总览 | [dashboard](https://docs.x.ai/build/features/dashboard) |
| Headless | `-p` 单次提示，`--output-format` 可出 JSON | [headless-scripting](https://docs.x.ai/build/cli/headless-scripting) |
| ACP | `grok agent stdio` 作为 ACP agent 被宿主调用 | [headless-scripting](https://docs.x.ai/build/cli/headless-scripting) |
| 企业策略 | 五层配置、OIDC、MDM 托管策略 | [enterprise](https://docs.x.ai/build/enterprise) |
| 主题 | 内置 GrokNight / GrokDay 等，支持跟随系统 | [theming](https://docs.x.ai/build/features/theming) |

## 模型参考

| 模型 slug | 定位（官方原文） | 上下文 |
|-----------|------------------|--------|
| `grok-4.6` | "For everything else, including code, use Grok 4.6. It is the most intelligent and fastest model we've built." | 500k |
| `grok-build-0.1` | "xAI's coding model, trained specifically for agentic coding workflows." | 256k |

[x.ai/build](https://x.ai/build) 当前横幅写的是 "Meet Grok 4.6 • Now powering Grok Build"，即默认驱动模型为 `grok-4.6`。价格与限流见 [速查表](./grok-cheatsheet.md#模型与计费)。

来源：[developers/models](https://docs.x.ai/developers/models)、[developers/release-notes](https://docs.x.ai/developers/release-notes)

## 资源链接

- 官方 CLI 文档：<https://docs.x.ai/build/overview>
- 官方 API 文档：<https://docs.x.ai/developers/quickstart>
- CLI 变更日志：<https://x.ai/build/changelog>
- 源码仓库：<https://github.com/xai-org/grok-build>
- 官方插件市场：<https://github.com/xai-org/plugin-marketplace>
- 更完整的信息源清单（含访问方式与核实日期）见 [速查表的「高质量信息源」章节](./grok-cheatsheet.md#高质量信息源)

## 相关页面

- [Grok Build 教程](./grok-cli.md) — 安装、认证、TUI、headless、ACP
- [实战 Cookbook](./grok-cookbook.md) — 场景化配方
- [速查表](./grok-cheatsheet.md) — 命令 / 配置 / 环境变量 / 价格 / 信息源
- [术语表](./grok-glossary.md) — 概念是什么、为什么
- [Grok Bot](./grok-bot.md) — 云电脑同事（不是 CLI）
- [AI 编程工具总览](../index.md)
