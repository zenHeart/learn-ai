---
title: Pi Agent 学习地图
description: Pi 是极简终端 coding-agent harness。本目录只写 Pi。OpenClaw 用它的 SDK，正文在另页。
domain: product
tags:
  - harness
  - coding-agent
role: map
---

# Pi Agent 学习地图

> **Pi** 是终端里的 coding agent。官方站（[pi.dev](https://pi.dev/)）title：
> **Pi Coding Agent**。description：「A terminal-based coding agent」。
>
> 同页原文：Pi is a **minimal agent harness**。默认跳过 sub-agents 和 plan mode。需要就自己用 extension / skill / package 加。
>
> 本目录对位 Claude Code / Kimi Code 的**极简 harness**，不是聊天 App，也不是 OpenClaw。

## 写给谁 / 不写什么

**写给谁：** 会用终端、想自己掌控 harness 的前端工程师。

**非目标：**

- OpenClaw 安装（#104）
- 旧 npm `@mariozechner/pi-coding-agent` 当主安装路径
- 编造 MCP / plan mode 官方开关
- 模型内部机制（去 [Learn LLM](/zh/tech/fundamentals/LLM)）

## 产品全景

```
Pi / Earendil（本目录只展开 Pi CLI）
├── @earendil-works/pi-coding-agent — 命令 `pi`（本目录）
├── pi-agent-core / pi-ai / pi-tui / pi-telemetry — 同仓库
├── Pi packages — pi.dev/packages
├── pi-chat — Slack/chat 自动化（一行）
└── OpenClaw — 用 Pi SDK 的自托管网关（#104）
```

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **Pi Coding Agent** | [pi.dev](https://pi.dev/) | 独立页 [pi-agent.md](./pi-agent.md) |
| Docs / Quickstart | [docs/latest/quickstart](https://pi.dev/docs/latest/quickstart) | Tutorial |
| GitHub | [earendil-works/pi](https://github.com/earendil-works/pi) | 速查 |
| Packages | [pi.dev/packages](https://pi.dev/packages) | 地图一行 |
| 新家公告 | [2026-05-07](https://pi.dev/news/2026/5/7/pi-has-a-new-home) | Tutorial 一节 |
| pi-chat | GitHub `earendil-works/pi-chat` | 地图一行 |
| OpenClaw | [openclaw.ai](https://openclaw.ai/) | **一行** → [OpenClaw](/zh/products/openclaw/) |

**容易撞名：**

- **Pi ≠ OpenClaw。** Pi 是终端 harness。OpenClaw 是多通道网关，官方把 OpenClaw 写成 Pi SDK 的真实集成。
- **`pi` ≠ 圆周率库。** 装的是 `@earendil-works/pi-coding-agent`。
- **现行包 ≠ `@mariozechner/pi-coding-agent`。** 后者 npm 已写 deprecated。
- **默认无 MCP ≠ 永远不能 MCP。** 官网：用 skill / extension 自己加。

### 快速决策

```
我要做什么？
├── 在仓库终端里改代码、自己扩展 harness
│   └── → Pi（本目录）
├── 把助手接到 Telegram / 飞书 / WhatsApp
│   └── → OpenClaw（#104）
└── 要开箱即用的 IDE Agent
    └── → Cursor / Claude Code / Trae（其它手册）
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 装上并跑起来 | [教程](./pi-agent.md) | `pi --version`，发出第一句 |
| 2. 回查命令 | [速查](./pi-agent-cheatsheet.md) | 安装、模式、官方链接 |
| 3. 分清名字 | [术语表](./pi-agent-glossary.md) | 不再把 OpenClaw 叫成 Pi |

官方 How-to 树在 pi.dev/docs。本目录**不硬凑 cookbook**。

## 功能速查（只抄官方页）

| 能力 | 出处 |
|------|------|
| 终端 coding agent / minimal harness | [pi.dev](https://pi.dev/) |
| 四种模式：interactive、print/JSON、RPC、SDK | pi.dev |
| 15+ providers | pi.dev |
| `__AGENTS.md` / `SYSTEM.md` / Skills / 模板 | pi.dev |
| `pi install npm:@foo/pi-tools` | pi.dev |
| 无内置权限系统，需容器化 | [README](https://github.com/earendil-works/pi) |
