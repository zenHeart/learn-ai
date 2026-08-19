---
title: Kimi Code 学习地图
description: "Kimi Code 是月之暗面面向开发者的编程助手套件（CLI + VS Code）。同厂的 Kimi 对话 / Work / Claw 不是这个产品。本目录只教你把 Kimi Code 装上、登录、对着真实仓库干活。"
domain: product
tags:
  - coding-agent
role: map
---

# Kimi Code 学习地图

> **Kimi Code** 是 Kimi 会员里专为开发者提供的智能编程服务。官方形态是 **CLI**、**VS Code 扩展**，以及把同一套模型接到第三方 Agent 的 **API Key**。
>
> 产品总览原文（[www.kimi.com/code/docs](https://www.kimi.com/code/docs/)）：
> 「通过 CLI、VS Code 扩展插件等产品形态，为开发者提供代码阅读、文件编辑、命令执行等 AI 辅助能力。」

## 写给谁 / 先决条件

- **写给谁**：已经会用终端或 VS Code 的前端工程师，想要一个国内直连的 Claude Code 对位物。
- **先决条件**：macOS / Linux / Windows；一个 Kimi 账号（会员订阅或可调用的 API Key）。CLI 脚本安装**不需要**预装 Node.js；选 npm 通道则需要 **Node.js 22.19.0+**。
- **非目标**：不教 Kimi 网页对话、Kimi Work 桌面 Agent、Kimi Claw 云端机器人；不教模型内部机制（去 Learn LLM）；不把旧版 Python `kimi-cli` 当主线。

## 产品家族

月之暗面官方一级入口必须先对账。本目录**只展开 Kimi Code**。对话 / Work / Claw 各占一行，链到将有的 [Kimi 家族页](/zh/products/kimi/)。

| 官方名称 | 官方 URL | 本站去向 |
|----------|----------|----------|
| **Kimi Code**（产品落地） | [www.kimi.com/code](https://www.kimi.com/code) | 本目录主路径 |
| **Kimi Code 文档总览** | [www.kimi.com/code/docs](https://www.kimi.com/code/docs/) | 本页 |
| **Kimi Code CLI** | [产品文档 · 开始使用](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) · [CLI 文档站](https://moonshotai.github.io/kimi-code/zh/guides/getting-started) | [教程](./kimi-code.md) |
| **Kimi Code for VS Code** | [产品文档 · 快速开始](https://www.kimi.com/code/docs/kimi-code-for-vscode/getting-started) · [Marketplace](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code) | [教程 · VS Code](./kimi-code.md#kimi-code-for-vs-code) |
| **Kimi Code 控制台** | [www.kimi.com/code/console](https://www.kimi.com/code/console) | 地图一行：额度、API Key、设备 |
| **Kimi Code API**（接到第三方工具） | 总览里的 Base URL 表 | [教程 · API](./kimi-code.md#把-kimi-code-接到第三方工具) · [速查](./kimi-code-cheatsheet.md) |
| **Kimi**（网页 / App） | [www.kimi.com](https://www.kimi.com) · [产品对照](https://www.kimi.com/zh-hans/help/others/product-comparison) | 一行 → [Kimi 家族](/zh/products/kimi/)（#70） |
| **Kimi Work** | [产品对照](https://www.kimi.com/zh-hans/help/others/product-comparison) · [下载页桌面端](https://www.kimi.com/zh-cn/products/download) | 一行 → [Kimi 家族](/zh/products/kimi/) |
| **Kimi Claw** | [产品对照](https://www.kimi.com/zh-hans/help/others/product-comparison) | 一行 → [Kimi 家族](/zh/products/kimi/) |
| **Kimi 开放平台** | [platform.moonshot.cn](https://platform.moonshot.cn/) · `platform.kimi.com` / `platform.kimi.ai` | 一行：按量 API，不是本目录 |
| 旧版 Python **kimi-cli** | [What's New 对照表](https://www.kimi.com/code/docs/kimi-code/whats-new) | [教程附录](./kimi-code.md#附录从-python-kimi-cli-迁移) |

来源：[产品对照](https://www.kimi.com/zh-hans/help/others/product-comparison)、[Kimi Code 总览](https://www.kimi.com/code/docs/)、[下载页](https://www.kimi.com/zh-cn/products/download)。

```
月之暗面 / Kimi 家族
├── Kimi（网页 / App）— 对话 + Agent + Deep Research
├── Kimi Work — 桌面本地 Agent（文件 / 跨应用 / 长任务）
├── Kimi Code — 开发者编程套件（本目录）
│   ├── CLI（命令 `kimi`）
│   ├── VS Code 扩展（moonshot-ai.kimi-code）
│   └── API Key → 第三方 Coding Agent
├── Kimi Claw — 零部署云端自动化 / 机器人
└── 开放平台 — 按量 HTTP API（不是 Coding Agent 产品）
```

**容易撞名：**

- **Kimi Code ≠ Kimi 对话 ≠ Kimi Work ≠ Kimi Claw**。对照页原文：Code 面向开发者、写代码、维护代码库；入口是 CLI 和 VS Code 扩展。
- **命令 `kimi` ≠ 产品名 Kimi Code**。装的是 Kimi Code CLI，敲下去的可执行文件叫 `kimi`。
- **`~/.kimi-code/` ≠ `~/.kimi/`**。前者是现行 Node CLI 的数据根；后者是旧 Python `kimi-cli`。
- **`api.kimi.com/coding` ≠ `api.moonshot.cn/v1`**。会员 Coding 额度 和 开放平台按量是两套账号，Key 不通用（[帮助中心 FAQ](https://www.kimi.ai/zh-hans/help/kimi-code/cli-getting-started)）。
- **`kimi acp` ≠ VS Code 扩展**。ACP 把 CLI 嵌进 Zed / JetBrains / Paseo；VS Code 另有第一方插件，且官方标明「适配中」。

### 快速决策：我该用哪个？

```
我要做什么？
├── 在真实仓库里写代码 / 修 bug / 重构 / 跑测试
│   └── → Kimi Code
│       ├── 在终端？ → CLI（`kimi`）
│       ├── 在 VS Code？ → 先读官方「仅旧版 Python CLI 用户可新装」横幅，再决定扩展还是终端
│       ├── 在 Zed / JetBrains？ → `kimi acp`（不是 VS Code 插件）
│       └── 已经在用 Claude Code / Codex / OpenCode？ → 用 Kimi Code API Key 接进去
├── 聊天 / 写作 / 搜索 / 建站 / PPT / Deep Research
│   └── → [Kimi 网页 / App](/zh/products/kimi/)
├── 读写本机文件、跨桌面应用、跑长任务
│   └── → [Kimi Work](/zh/products/kimi/)
├── 7×24 云端机器人、接飞书 / 微信
│   └── → [Kimi Claw](/zh/products/kimi/)
└── 在自己的产品里按量调模型
    └── → Kimi 开放平台（不是本目录）
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 装上能跑 | [教程 · 安装与登录](./kimi-code.md) | 15 分钟内第一次对话 |
| 2. 敢让它改代码 | [教程 · TUI 与审批](./kimi-code.md#交互审批与三种权限模式) | 分清 Plan / YOLO / Auto |
| 3. 选对入口 | [教程 · VS Code / ACP / API](./kimi-code.md#kimi-code-for-vs-code) | 不要进错门 |
| 4. 回查参数 | [速查表](./kimi-code-cheatsheet.md) | 命令、slash、模型 ID、Base URL |
| 5. 从旧 CLI 过来 | [迁移附录](./kimi-code.md#附录从-python-kimi-cli-迁移) | `kimi migrate`，不要继续维护 Python 线 |

## 功能速查

只列官方文档已经写明的能力。细节进教程或官方页。

| 能力 | 一句话 | 官方页 |
|------|--------|--------|
| 交互式 TUI | 项目目录跑 `kimi` | [开始使用](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) |
| Headless | `kimi -p "…"`，可加 `--output-format stream-json` | [kimi 命令](https://moonshotai.github.io/kimi-code/zh/reference/kimi-command) |
| Plan 模式 | `Shift-Tab` 或 `/plan`，先方案再改文件 | [交互与输入](https://moonshotai.github.io/kimi-code/zh/guides/interaction) |
| YOLO / Auto | `/yolo` 跳过普通审批；`/auto` 无人值守且不再提问 | 同上 |
| 会话 | `-c` / `--continue`，`/sessions`，`/fork`，`kimi export` | [会话](https://moonshotai.github.io/kimi-code/zh/guides/sessions) |
| ACP | `kimi acp` 给 Zed / JetBrains / Paseo | [在 IDE 中使用](https://moonshotai.github.io/kimi-code/zh/guides/ides) |
| Skills / MCP / Hooks / Plugins | 扩展点；内置 Skill 直接是 `/name` | [定制化](https://moonshotai.github.io/kimi-code/zh/customization/mcp) |
| Subagent | 内置 `coder` / `explore` / `plan` | [README](https://github.com/MoonshotAI/kimi-code) · [What's New](https://www.kimi.com/code/docs/kimi-code/whats-new) |
| Goal | `/goal` 跨轮次推进一个持久目标 | [使用目标模式](https://moonshotai.github.io/kimi-code/zh/guides/goals) |
| 视频输入 | 输入框粘贴视频（macOS/Linux `Ctrl-V`，Windows `Alt-V`） | [交互与输入](https://moonshotai.github.io/kimi-code/zh/guides/interaction) |
| 模型 | `k3` / `kimi-for-coding` / `kimi-for-coding-highspeed` | [模型配置](https://www.kimi.com/code/docs/kimi-code/models) |

## 会员与额度（只抄官方，不猜价格）

- CLI / VS Code / 第三方工具的请求**计入同一套 Kimi Code 额度**（[会员权益](https://www.kimi.com/code/docs/kimi-code/membership)）。
- 额度从订阅日起 **每 7 天刷新**，未用完不累积；另有 **每 5 小时滚动窗口**。
- 与 Kimi 会员月总额度共享：月额度打满后 Code 额度会冻结。
- 对照页补充：会员功能共用额度池；Kimi Code **另有**仅作用于 Code 的 5 小时 / 每周速率限制。
- 产品文档横幅：**新会员体系即将上线**，Code 权益将与 Kimi 会员拆分。订阅中的用户不受影响。档位与价格以 [Kimi 会员页](https://www.kimi.com/membership/pricing) 为准，本站不写死金额。

## 下一步

1. 打开 [Kimi Code 教程](./kimi-code.md)，用官方脚本装 CLI。
2. 参数和模型 ID 去 [速查表](./kimi-code-cheatsheet.md)。
3. 官方深读从 [code/docs](https://www.kimi.com/code/docs/) 和 [CLI 文档站](https://moonshotai.github.io/kimi-code/zh/) 进。
