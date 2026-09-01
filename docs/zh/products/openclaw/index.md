---
title: OpenClaw 学习地图
description: OpenClaw 是自托管的多通道 Agent 网关。本目录只写 OpenClaw。Pi 是它的 harness，另页。
domain: product
tags:
  - agent-runtime
  - self-host
role: map
---

# OpenClaw 学习地图

> **OpenClaw** 是跑在任意 OS 上的多通道 AI agent 网关。官方 Getting started（[docs](https://docs.openclaw.ai/start/getting-started)）：
> 约 5 分钟装好、做完 onboarding、发出第一句。结束时有运行中的 Gateway、配好的 auth、可用的会话。
>
> 产品站：[openclaw.ai](https://openclaw.ai/)。本目录**不是** Pi CLI，也**不是**飞书 / 微信教程。

## 写给谁 / 不写什么

**写给谁：** 想把助手接到 Telegram / 飞书 / WhatsApp，数据留在自己机器上的前端工程师。

**非目标：** Pi 安装主教程（#103）；把通道页写成飞书/微信产品手册；删已有源码章。

## 产品全景

```
OpenClaw
├── Gateway（本机进程，默认 18789）
├── Control UI / dashboard
├── 通道：Telegram、飞书、微信、企微、Discord、WhatsApp…
├── 工具 / skills / plugins
└── 相关：Pi SDK（#103）
```

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **OpenClaw** 产品 | [openclaw.ai](https://openclaw.ai/) | [教程](./openclaw.md) |
| Docs 根 | [docs.openclaw.ai](https://docs.openclaw.ai/) | 本页 |
| Install | [install](https://docs.openclaw.ai/install) | Tutorial |
| Getting started | [getting-started](https://docs.openclaw.ai/start/getting-started) | Tutorial |
| GitHub | [openclaw/openclaw](https://github.com/openclaw/openclaw) | 速查 |
| 飞书通道 | 本仓已有 | [飞书](./feishu) |
| 微信通道 | 本仓已有 | [微信](./wechat) |
| 企微通道 | 本仓已有 | [企微](./wecom) |
| CLI / 部署 / 安全 / Skills | 本仓已有 | [CLI](./cli) · [部署](./deployment) · [安全](./security) · [Skills](./skills) |
| 源码轨道 | 本仓已有 | [源码](./source-code/) |
| Pi | [pi.dev](https://pi.dev/) | **一行** → [Pi](/zh/products/pi-agent/) |
| 飞书 / 微信 / 企微产品本身 | — | **非本站产品**（只当通道） |

**容易撞名：** OpenClaw ≠ Pi；`openclaw` 命令 ≠ 某个聊天 App；通道名 ≠ 那些 IM 的官方产品手册。

### 快速决策

```
我要做什么？
├── 5 分钟装上网关、浏览器里聊一句
│   └── → [教程](./openclaw.md)
├── 接到飞书 / 微信 / 企微
│   └── → 已有通道页（不是那些 IM 的产品教程）
├── 只在终端对着仓库改代码
│   └── → Pi（#103）
└── 读源码复刻
    └── → [源码轨道](./source-code/)
```

## 学习路径

| 阶段 | 读什么 |
|------|--------|
| 装上 | [教程](./openclaw.md) |
| 通道 | 飞书 / 微信 / 企微页 |
| 查命令 | [速查](./openclaw-cheatsheet.md) |
| 名字 | [术语](./openclaw-glossary.md) |
| 源码 | [source-code](./source-code/) |

官方 How-to 在 docs.openclaw.ai。本目录不新开 cookbook 去复述整站。
