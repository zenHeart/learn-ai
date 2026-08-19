---
title: OpenClaw 教程
description: 用官方 install.sh 或 npm 装上 OpenClaw，完成 onboarding，打开 dashboard 发出第一句。
domain: product
tags:
  - agent-runtime
role: tutorial
---

# OpenClaw 教程

> 官方：[Getting started](https://docs.openclaw.ai/start/getting-started)、[Install](https://docs.openclaw.ai/install)。

## 先决条件

官方 Getting started：

- Node.js **22.22.3+、24.15+ 或 25.9+**（推荐 Node 26）
- 一个模型供应商 API key（Anthropic / OpenAI / Google 等；onboarding 会问）

## 15 分钟内打开

### 1. 安装

[Install](https://docs.openclaw.ai/install) / Getting started 原文：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Windows PowerShell：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

已有 Node 时（[GitHub README](https://github.com/openclaw/openclaw)）：

```bash
npm install -g openclaw@latest --allow-scripts=openclaw
```

该命令适用于 npm 12 或 npm 11.16+。npm 11.15 及更早**去掉** `--allow-scripts=openclaw`。

可选：`openclaw onboard --install-daemon`（docs 首页 Quick start）。

### 2. 确认 Gateway

```bash
openclaw gateway status
```

官方：应看到 Gateway 监听端口 **18789**。

### 3. 打开 Control UI

```bash
openclaw dashboard
```

在浏览器 Control UI 里发第一句。手机上最快的通道官方写的是 **Telegram**（一个 bot token）。其它通道见官方 Channels，本仓飞书/微信/企微见侧栏已有页。

跳过可选步骤之后可用 `openclaw configure` 回来补。

## 下一步

通道：[飞书](./feishu) · [微信](./wechat) · [企微](./wecom)。命令：[CLI](./cli)。[速查](./openclaw-cheatsheet.md)。
