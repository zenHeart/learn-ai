---
title: MiniMax Code 学习地图
description: MiniMax Code 是最适配 MiniMax 模型的第一方 Coding Agent。本目录只写 Code。Agent / Hailuo / 星野只在家族表占一行。
domain: product
tags:
  - coding-agent
role: map
---

# MiniMax Code 学习地图

> **MiniMax Code** 是 MiniMax 的第一方 Coding Agent。官网原文：「最适配 MiniMax 模型的 Coding Agent」（[minimaxi.com](https://www.minimaxi.com/)）。产品文档原文：「MiniMax Code 是一款桌面端 AI Agent 应用。它把对话、项目工作区、文件操作、终端、浏览器、技能、记忆和自动化任务放在同一个本地工作环境里」（[欢迎使用](https://agent.minimaxi.com/docs/code/welcome)）。
>
> 同一产品还有终端入口 **MiniMax Code CLI**，命令是 `mcode`（[CLI 快速开始](https://agent.minimaxi.com/docs/cli/quick-start)）。它不是另一个产品。

## 产品家族（Retrieve）

先对官方一级入口，再决定本站写哪一页。表里每一行都来自 2026-08-19 打开的官网顶栏、About、页脚或文档站，不是搜索摘要。

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **MiniMax Code** | [欢迎使用](https://agent.minimaxi.com/docs/code/welcome)、[下载](https://agent.minimaxi.com/download)、[CLI](https://agent.minimaxi.com/docs/cli/quick-start) | **独立页**（本目录） |
| MiniMax Agent | [agent.minimaxi.com](https://agent.minimaxi.com/) | 地图一行。网页通用 Agent，正文归 [#73](https://github.com/zenHeart/learn-ai/issues/73) |
| MiniMax Design | [design.minimax.io](https://design.minimax.io/) | 地图一行。商业内容生产，不是编程 Agent |
| MiniMax Hub | 中文 About 一级导航仍用此名（[about](https://www.minimaxi.com/about)） | 地图一行。与 Design 撞名，不写第二份教程 |
| MiniMax Audio / 语音 | [minimax.io/audio](https://www.minimax.io/audio) | 地图一行。语音与音乐 |
| Hailuo / 海螺 / MiniMax H3 | [hailuoai.video](https://hailuoai.video/)、[模型介绍](https://platform.minimax.io/docs/guides/models-intro) | 地图一行。视频生成，不是编程 Agent |
| 星野 | [xingyeai.com](https://www.xingyeai.com/) | 地图一行。角色互动社区 |
| Talkie | 国际站 Product 一级（[minimax.io](https://www.minimax.io/)） | 地图一行。星野的国际名 |
| MiniMax M3 等模型 | [models-intro](https://platform.minimax.io/docs/guides/models-intro) | 地图一行。模型不是产品教程 |
| Token Plan / API | [platform.minimaxi.com](https://platform.minimaxi.com/)、[platform.minimax.io](https://platform.minimax.io/) | 地图一行。开发者平台 |
| 通过 AI 编程工具接入 | [text-ai-coding-tools](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools) | 地图一行。把 M3 接到 Claude Code / Cursor 等，**不是** MiniMax Code |

来源：[minimaxi.com](https://www.minimaxi.com/)、[minimaxi.com/about](https://www.minimaxi.com/about)、[minimax.io](https://www.minimax.io/)、[agent.minimaxi.com/docs/llms.txt](https://agent.minimaxi.com/docs/llms.txt)、[models-intro](https://platform.minimax.io/docs/guides/models-intro)。

**本目录目标：** 只写 MiniMax Code。同厂其它 AI 产品不在这里展开。

**容易撞名：**

- **MiniMax Code ≠ MiniMax Agent。** 桌面端在 changelog v3.0.33 正式更名为 MiniMax Code；网页 Agent 仍在 `agent.minimaxi.com`。文档站品牌仍写「MiniMax Agent 文档」。
- **`mcode` ≠ changelog 里的 `minimax` 快捷方式。** CLI 官方命令是 `mcode`。
- **在 Claude Code 里配 MiniMax-M3 ≠ 安装 MiniMax Code。** 前者是开放平台接入指南。
- **Coding / Work 是桌面模式，不是两个产品。**

细节见 [术语表](./minimax-code-glossary.md)。

### 快速决策：我该用哪个？

```
我要做什么？
├── 对着本地仓库写代码 / 改 bug / 看 diff / 跑命令
│   └── → MiniMax Code
│       ├── 要图形界面、浏览器预览、定时任务、手机遥控？
│       │     → 桌面端（下载页）
│       ├── 要终端 TUI / 脚本 / CI / 编辑器 ACP？
│       │     → CLI（命令 mcode）
│       └── 任务要拆给多个专家 Agent？
│             → 同一产品里的 Agent Team
├── 在浏览器里做通用长任务，不一定绑本地仓库
│   └── → MiniMax Agent（#73，本目录不写）
├── 只要把 MiniMax-M3 接到已经在用的 Claude Code / Cursor
│   └── → 开放平台「通过 AI 编程工具接入」，不是本产品
├── 生视频 / 改视频
│   └── → Hailuo / MiniMax H3 / MiniMax Design
├── 语音 / 音乐
│   └── → MiniMax Audio
└── 角色扮演 / 陪伴
    └── → 星野（国内）或 Talkie（国际）
```

## MiniMax Code 的两张使用面

官方 CLI 文档原文：「客户端适合图形化任务管理和结果查看，CLI 更贴近代码仓库、终端、脚本、CI 与编辑器。」（[功能介绍](https://agent.minimaxi.com/docs/cli/features)）

| 使用面 | 入口 | 用在哪 |
|--------|------|--------|
| 桌面端 | [国内下载](https://agent.minimaxi.com/download) / [海外下载](https://agent.minimax.io/download) | 任务、工作区、浏览器、定时任务、Remote Control |
| CLI · TUI | `mcode` | 终端里对着仓库持续对话 |
| CLI · Headless | `mcode exec` | 脚本、CI |
| CLI · ACP | `mcode acp` | 被 Zed 等 ACP 宿主嵌入 |

桌面端另有 Coding / Work 两种**模式**（同一套 Agent 能力，界面暴露不同）。见 [教程](./minimax-code.md)。

## 什么时候值得试

**值得试**

- 你要第一方 Agent，而不是只在别的工具里换一个 MiniMax 模型。
- 你需要桌面端把仓库、终端、浏览器、技能、记忆放在同一工作区。
- 你需要终端里的 `mcode`：TUI、`exec`、ACP。
- 你已经有 MiniMax 账号或 Token Plan。M3 博文原文：「MiniMax Code can be used with MiniMax Token Plans。」

**先别急**

- 你只要在已有 Claude Code / Cursor 里调用 M3 —— 走 [开放平台接入](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools)，不要装本产品。
- 你要的是网页通用 Agent —— 那是 MiniMax Agent（#73）。
- 你要生视频或角色陪伴 —— Hailuo / 星野，不是 Code。
- 你需要 Linux 桌面客户端 —— 官方桌面文档只写 macOS 和 Windows。CLI 支持 macOS、Windows、常见 Linux 和 WSL，暂不支持 Alpine / musl。

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 装上能跑 | [教程](./minimax-code.md) 的桌面或 CLI 安装 | 登录后发出第一条任务 |
| 2. 会选模式和工作区 | [教程](./minimax-code.md) 的 Coding / Work、工作区、权限 | 敢让它改本地代码 |
| 3. 接进工作流 | [Cookbook](./minimax-code-cookbook.md) | Agent Team、`mcode exec`、ACP |
| 4. 回查参数 | [速查表](./minimax-code-cheatsheet.md) | 命令、slash、权限档、官方链接 |
| 5. 理清名字 | [术语表](./minimax-code-glossary.md) | Code vs Agent、桌面 vs CLI、模式正交 |

## 功能速查

下表只列官方文档页里出现的能力。

| 能力 | 一句话 | 官方文档 |
|------|--------|----------|
| Coding / Work | 同一套 Agent，开发工具暴露程度不同 | [modes](https://agent.minimaxi.com/docs/code/workflows/modes) |
| 工作区 | 选本地项目目录，再读文件、跑命令 | [workspace](https://agent.minimaxi.com/docs/code/workflows/workspace) |
| 权限确认 | 改文件、跑命令、外部工具前先问你 | [permissions](https://agent.minimaxi.com/docs/code/workflows/permissions) |
| Agent Team | 按复杂度拆给多个专家 Agent | [team](https://agent.minimaxi.com/docs/code/agents/team) |
| 技能 / 记忆 / 自定义 Agent | 复用流程，沉淀偏好 | [llms.txt 桌面树](https://agent.minimaxi.com/docs/llms.txt) |
| 定时任务 / Remote Control / IM | 计划执行、手机遥控、微信飞书 Telegram | 桌面 `/docs/code/automation/*` |
| CLI TUI / exec / acp | 终端、脚本、编辑器 | [features](https://agent.minimaxi.com/docs/cli/features) |
| Token Plan 与签到积分 | 产品内查看；签到数字见用量页 | [usage](https://agent.minimaxi.com/docs/code/account/usage) |

模型机制（MSA、训练、benchmark）不在本目录展开，见 [Learn LLM](/zh/tech/fundamentals/LLM) 和 [M3 博文](https://www.minimax.io/blog/minimax-m3)。
