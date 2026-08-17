# Grok 学习地图

> **Grok Build** 是 xAI 的第一方终端编程 Agent。可执行文件名是 `grok`，源码开放在 [xai-org/grok-build](https://github.com/xai-org/grok-build)。
>
> 官方定义（[docs.x.ai/build/overview](https://docs.x.ai/build/overview)）：
> "**Grok Build** is a powerful and extensible coding agent. Use it via an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps."

## 一分钟认清产品形态

很多人会把 Grok 的几个产品混在一起，先分清：

| 产品 | 是什么 | 入口 |
|------|--------|------|
| **Grok Build** | 终端编程 Agent（本文档的主题） | 命令 `grok` |
| Grok（聊天） | 通用对话产品 | [grok.com](https://grok.com)、X 内置 |
| xAI API | 模型 API（`grok-4.6` 等） | [api.x.ai](https://docs.x.ai/developers/quickstart) |

三者共用同一套账号与模型，但**只有 Grok Build 是编程工具**。它没有官方 IDE 插件——需要在编辑器里用时走 ACP 协议（见下文）。

## 三种使用面

| 使用面 | 入口 | 用在哪 |
|--------|------|--------|
| 交互式 TUI | `grok` | 日常开发，全屏终端界面 |
| Headless | `grok -p "<提示词>"` | 脚本、CI、批处理 |
| ACP | `grok agent stdio` | 被编辑器 / 自建编排器嵌入（JSON-RPC over stdin/stdout） |

来源：[docs.x.ai/build/overview](https://docs.x.ai/build/overview)、[docs.x.ai/build/cli/reference](https://docs.x.ai/build/cli/reference)

## 快速决策

**什么情况下值得试？**

- 你已经在用 Claude Code，想低成本横向对比。官方明确宣称零配置兼容（读 `CLAUDE.md`、`.claude/settings.json`，接受 Claude Code 的 flag 别名，`grok import` 可导入 Claude Code 会话）——迁移成本几乎为零。
- 你需要终端里的长任务编排：后台任务、定时循环、subagent 并行、worktree 隔离都是内置能力。
- 你已经是 SuperGrok 或 X Premium Plus 订阅者（[发布公告](https://x.ai/news/grok-build-cli) 原文：Available now to all SuperGrok and X Premium Plus subscribers），或者手上有 `XAI_API_KEY`。

**什么情况下先别急？**

- 你要的是 IDE 内联补全 —— Grok Build 是终端 Agent，没有补全能力，也没有官方 IDE 插件。
- 你需要长期稳定的 API 面 —— 它仍处于 beta，npm 上从 2025-10-22 至今已发布 552 个版本（近期基本 1-3 天一版），命令与配置键仍在变动。

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
- [AI 编程工具总览](../index.md)
