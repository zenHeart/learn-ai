---
title: MiniMax Code 术语表
description: 不教操作。先分清 Code / Agent / Hailuo / 星野，再分清桌面、CLI 和两种模式。
domain: product
tags:
  - coding-agent
role: glossary
---

# MiniMax Code 术语表

不教操作，只解释这些名字为什么容易撞车。选哪张门看 [学习地图](./index.md)。

## 都叫 MiniMax 的东西

| 名字 | 是什么 | 在哪 |
|------|--------|------|
| **MiniMax Code** | 第一方 Coding Agent。桌面应用 + CLI `mcode` | [welcome](https://agent.minimaxi.com/docs/code/welcome)、[download](https://agent.minimaxi.com/download)、[CLI](https://agent.minimaxi.com/docs/cli/quick-start) |
| MiniMax Agent | 网页通用 Agent。changelog 里桌面端已更名为 Code，网页产品仍叫 Agent | [agent.minimaxi.com](https://agent.minimaxi.com/)，本站 #73 |
| MiniMax Design | 商业内容生产 Agent 平台 | [design.minimax.io](https://design.minimax.io/) |
| MiniMax Hub | 中文 About 一级导航仍用的名字 | [about](https://www.minimaxi.com/about)。与 Design 对账，不另开教程 |
| MiniMax Audio | 语音与音乐产品 | [minimax.io/audio](https://www.minimax.io/audio) |
| Hailuo / 海螺 / MiniMax H3 | 视频生成品牌与模型 | [hailuoai.video](https://hailuoai.video/) |
| 星野 | 国内角色互动应用 | [xingyeai.com](https://www.xingyeai.com/) |
| Talkie | 国际站 Product 一级里的角色产品 | [minimax.io](https://www.minimax.io/) |
| MiniMax M3 | Coding / Agentic 模型，1M 上下文 | [models-intro](https://platform.minimax.io/docs/guides/models-intro) |
| Token Plan | 开放平台订阅 | [platform](https://platform.minimax.io/) |
| 通过 AI 编程工具接入 | 把 M3 接到 Claude Code / Cursor 等 | [text-ai-coding-tools](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools) |

**不要当事实写：**

- 把 MiniMax Code 写成「只是 M3 的 API 包装」。
- 把 `minimax` 当成 CLI 主命令。官方 CLI 命令是 `mcode`。changelog v3.0.33 的「minimax 命令行快捷方式」没有独立 flag 页。
- 官方 npm 包名。2026-08-19 找不到原文。
- Mini-Agent（`MiniMax-AI/Mini-Agent`）等于 MiniMax Code。
- 官方 VS Code 插件。编辑器集成官方只给了 ACP + Zed 示例。

## 一个产品，两张脸

官方：「MiniMax Code CLI 是 MiniMax Code 面向开发者工作流的终端入口。它与桌面客户端互为补充。」

| 脸 | 入口 | 典型用途 |
|----|------|----------|
| 桌面 | 下载页安装包 | 图形任务、浏览器、定时任务、Remote Control |
| CLI TUI | `mcode` | 人在终端里改仓库 |
| CLI Headless | `mcode exec` | CI、脚本 |
| CLI ACP | `mcode acp` | 嵌进编辑器 |

CLI **不依赖**桌面 Electron / IPC。桌面有的 Browser / Computer Use，不能假定 CLI 里一定有。

## 模式是两套正交开关

桌面 **Coding / Work**：同一套 Agent，开发工具露多少不同。改仓库用 Coding。

CLI **Plan Mode**：下一条消息先规划还是直接做。`Shift+Tab` / `/plan`。

CLI **权限模式**：工具要不要问你。`Alt+M` / `/permission` → Ask / Auto / Full access。

`mcode exec --permission` 用 `ask` / `smart` / `full` / `off`。和 TUI 档名不是同一张枚举，不要合并成一列。

## Agent Team

官方：按任务复杂度引入多个专家 Agent；你只描述目标，产品负责拆解、分配、跟踪、汇总。

它是 MiniMax Code 里的能力，不是独立产品，也不是网页 MiniMax Agent。

## 工作区、技能、记忆

- **工作区**：本地项目目录。Agent 在该目录内读文件、跑命令、汇报变更。
- **技能**：可复用工作流。输入框可用 `/` 调用（桌面第一次任务页）。
- **记忆**：沉淀偏好、项目约定、长期经验（桌面文档树有独立页）。
- **`AGENTS.md`**：`mcode init` 会生成或更新的项目指导。

## 账号与额度

MiniMax 账号登录桌面或 `mcode login`。自备 MiniMax API Key 走产品内设置或 `mcode provider`。

Token Plan 是开放平台订阅；M3 博文写 Code 可以用 Token Plan。下载页 Plus / Max / Ultra 与 Token Plan 美元档不要当成同一价目。用量页：「具体计费和额度规则以产品内展示为准。」
