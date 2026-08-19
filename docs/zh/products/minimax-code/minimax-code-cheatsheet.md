---
title: MiniMax Code 速查表
description: 只查不学。命令以官方页和 mcode --help 为准。没有官方原文的包名不写。
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# MiniMax Code 速查表

只查不学。CLI 完整参数以 `mcode --help` 和 `mcode <command> --help` 为准。

## 安装

### 桌面端

来源：[下载与安装](https://agent.minimaxi.com/docs/code/get-started/download)

| 项 | 值 |
|----|----|
| 国内下载 | [agent.minimaxi.com/download](https://agent.minimaxi.com/download) |
| 海外下载 | [agent.minimax.io/download](https://agent.minimax.io/download) |
| macOS | 11 Big Sur 及以上；`.dmg` 拖进 Applications；Apple 芯片 arm64，Intel x64 |
| Windows | 10 及以上；运行安装程序 |
| 登录 | MiniMax 账号 |

### CLI

来源：[quick-start](https://agent.minimaxi.com/docs/cli/quick-start)

```bash
curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash
```

```powershell
irm https://filecdn.minimax.chat/public/install.ps1 | iex
```

```bash
mcode --version
mcode --help
mcode update
```

<!-- TODO: 待核实 —— 官方未公布 npm 包名。 -->

## CLI 命令

来源：[功能介绍](https://agent.minimaxi.com/docs/cli/features)

| 命令 | 用途 |
|------|------|
| `mcode [prompt]` | 交互式 TUI，可直接提交第一条任务 |
| `mcode init [directory]` | 分析仓库，生成或更新 `AGENTS.md` |
| `mcode exec [prompt]` | 一次 Headless 任务 |
| `mcode acp` | ACP stdio server |
| `mcode login` / `mcode logout` | 登录 / 登出 |
| `mcode login --region global` | Global 账号 |
| `mcode provider` | Provider 与 API Key |
| `mcode plugin` | Agent Plugin |
| `mcode update` | 按当前安装来源更新 |
| `mcode --continue` | 继续当前工作区最近 Session |
| `mcode --session` | Session 管理器 |

`mcode exec` 常用 flag 见 [Cookbook](./minimax-code-cookbook.md)。

## CLI 键位与 slash

来源：[quick-start](https://agent.minimaxi.com/docs/cli/quick-start)

| 键 | 作用 |
|----|------|
| `Enter` | 发送；运行中再发进队列 |
| `Shift+Enter` | 换行 |
| `@` | 引用文件或目录 |
| `Ctrl+V` | 粘贴剪贴板图片或视频文件 |
| `Shift+Tab` | Default ↔ Plan Mode |
| `Alt+M` | Ask / Auto / Full access |
| `Ctrl+O` | 展开或收起 Thinking、工具输出、Diff |
| `Ctrl+T` | 展开或收起 Todo |
| `PgUp` / `PgDn` / `End` | 浏览历史 / 回到最新 |
| `Esc` | 关面板或中断任务 |

| slash | 用途 |
|-------|------|
| `/help` | 命令与快捷键 |
| `/status` | 账号、模型、运行状态 |
| `/model` | 选模型 |
| `/sessions [query]` | Session |
| `/context` | 上下文预算和来源 |
| `/compact` | 压缩当前对话 |
| `/new` | 当前项目新建 Session |
| `/init` | 生成或更新项目指导 |
| `/quit` | 退出 |
| `/plan` | 切换 Plan Mode（[FAQ](https://agent.minimaxi.com/docs/cli/faq)） |
| `/permission` | 切换权限模式（FAQ） |
| `/goal <目标>` | 可暂停、可恢复的目标（[features](https://agent.minimaxi.com/docs/cli/features)） |
| `/update` | 更新 |

## 决策表

| 场景 | 选 |
|------|----|
| 改本地仓库、要看 diff / 终端 / 浏览器 | 桌面 Coding 模式 |
| 只要结果，不看实现细节 | 桌面 Work 模式 |
| 终端里持续改仓库 | `mcode` |
| CI / 脚本 | `mcode exec` |
| Zed 等 ACP 宿主 | `mcode acp` |
| 复杂、要拆解校验 | Agent Team |
| 只要在 Claude Code 里用 M3 | 开放平台接入，不是本产品 |
| 网页通用 Agent | MiniMax Agent（#73） |

## 权限档

桌面：关键操作前确认。官方建议对删除 / 覆盖 / 上传 / 发消息保留人工确认（[permissions](https://agent.minimaxi.com/docs/code/workflows/permissions)）。

CLI TUI：`Ask` / `Auto` / `Full access`（`Alt+M`）。与 Plan Mode 独立。

`mcode exec --permission`：`ask` / `smart` / `full` / `off`。

## 用量（只抄能打开的数字）

来源：[usage](https://agent.minimaxi.com/docs/code/account/usage)（2026-08-19）

| 项 | 官方原文 |
|----|----------|
| 每日签到 | 400 积分 |
| 连续第 4、第 7 天 | 单日 1000 积分 |
| 一周签满 | 累计 4000 积分 |
| 有效期 | 到账起 30 天 |

2026-08-19 国内[下载页](https://agent.minimaxi.com/download)展示过 Plus ¥49 / Max ¥119 / Ultra ¥469（每月）。[M3 博文](https://www.minimax.io/blog/minimax-m3) Token Plan 是 Plus $20 / Max $50 / Ultra $120。两套不要合成一张价目表。

<!-- TODO: 待核实 —— 下载页套餐与 Token Plan 的额度换算、是否共享积分池；官方没有给出对照表。 -->

## 术语索引

一行钩子，定义在 [术语表](./minimax-code-glossary.md)。

| 术语 | 钩子 |
|------|------|
| MiniMax Code | 第一方 Coding Agent，桌面 + `mcode` |
| MiniMax Agent | 网页通用 Agent，不是本产品 |
| `mcode` | CLI 可执行文件名 |
| Coding / Work | 桌面两种模式 |
| Plan Mode | CLI：先规划还是直接做 |
| Ask / Auto / Full access | CLI 权限档 |
| Agent Team | 多专家拆任务 |
| Token Plan | 开放平台订阅，可与 Code 共用 |

## 高质量信息源

整理方法见仓库 [`sources/_template.md`](https://github.com/zenHeart/learn-ai/blob/master/.claude/skills/doc-research/references/sources/_template.md)。最后系统核对：2026-08-19。

### 官方文档

| URL | 用途 |
|-----|------|
| [agent.minimaxi.com/docs/code/welcome](https://agent.minimaxi.com/docs/code/welcome) | 桌面定义 |
| [agent.minimaxi.com/docs/code/get-started/download](https://agent.minimaxi.com/docs/code/get-started/download) | 桌面安装 |
| [agent.minimaxi.com/docs/code/get-started/first-task](https://agent.minimaxi.com/docs/code/get-started/first-task) | 第一次任务 |
| [agent.minimaxi.com/docs/code/workflows/modes](https://agent.minimaxi.com/docs/code/workflows/modes) | Coding / Work |
| [agent.minimaxi.com/docs/code/workflows/workspace](https://agent.minimaxi.com/docs/code/workflows/workspace) | 工作区 |
| [agent.minimaxi.com/docs/code/workflows/permissions](https://agent.minimaxi.com/docs/code/workflows/permissions) | 桌面权限 |
| [agent.minimaxi.com/docs/code/agents/team](https://agent.minimaxi.com/docs/code/agents/team) | Agent Team |
| [agent.minimaxi.com/docs/code/account/usage](https://agent.minimaxi.com/docs/code/account/usage) | 用量与签到 |
| [agent.minimaxi.com/docs/code/account/minimax-api](https://agent.minimaxi.com/docs/code/account/minimax-api) | 自备 MiniMax Key |
| [agent.minimaxi.com/docs/cli/quick-start](https://agent.minimaxi.com/docs/cli/quick-start) | CLI 安装与第一跑 |
| [agent.minimaxi.com/docs/cli/features](https://agent.minimaxi.com/docs/cli/features) | TUI / exec / acp |
| [agent.minimaxi.com/docs/cli/faq](https://agent.minimaxi.com/docs/cli/faq) | CLI 排障 |
| [agent.minimaxi.com/docs/changelog](https://agent.minimaxi.com/docs/changelog) | 桌面更新（含更名） |
| [agent.minimaxi.com/docs/llms.txt](https://agent.minimaxi.com/docs/llms.txt) | 桌面文档树（2026-08-19 **不含** CLI） |
| [platform.minimax.io/docs/guides/models-intro](https://platform.minimax.io/docs/guides/models-intro) | 模型目录 |
| [platform.minimaxi.com/docs/guides/text-ai-coding-tools](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools) | 第三方工具接 M3 |

英文镜像把主机换成 `agent.minimax.io` / `platform.minimax.io`。

### 官网与产品入口

| URL | 用途 |
|-----|------|
| [minimaxi.com](https://www.minimaxi.com/) | 中文官网；Code 定位句 |
| [minimax.io](https://www.minimax.io/) | 国际站一级产品 |
| [minimaxi.com/about](https://www.minimaxi.com/about) | 中文家族表述（仍写 Hub / 星野） |
| [agent.minimaxi.com/download](https://agent.minimaxi.com/download) | 桌面下载（国内） |
| [design.minimax.io](https://design.minimax.io/) | MiniMax Design |
| [hailuoai.video](https://hailuoai.video/) | Hailuo |
| [xingyeai.com](https://www.xingyeai.com/) | 星野 |
| [minimax.io/blog/minimax-m3](https://www.minimax.io/blog/minimax-m3) | Code 与 Token Plan 产品声明 |

### 效率技巧

| 技巧 | 说明 |
|------|------|
| 同路径加 `.md` | Mintlify 文档可抓 Markdown 镜像 |
| `agent.*/docs/llms.txt` | 只覆盖桌面树，CLI 要另开 `/docs/cli/quick-start` |
| `/status` 与 `mcode --version` | 查本机账号和二进制，不要死记教程版本号 |

## 相关页面

- [学习地图](./index.md)
- [教程](./minimax-code.md)
- [Cookbook](./minimax-code-cookbook.md)
- [术语表](./minimax-code-glossary.md)
