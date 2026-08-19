---
title: Pi Agent 教程
description: 用官方 npm 或 install.sh 装上 Pi，在仓库里发出第一句。旧包不要当主路径。
domain: product
tags:
  - harness
  - coding-agent
role: tutorial
---

# Pi Agent 教程

> 官方文档：[Quickstart](https://pi.dev/docs/latest/quickstart)。本页只抄能打开的安装命令。

## 目标与非目标

**你会完成：** 装上现行包，跑 `pi`，知道四种模式和「默认没有什么」。

**不会做：** 把 deprecated 包当主安装；把 OpenClaw 通道写进来。

## 先决条件

- Node.js（Quickstart 走 npm）。packages 页有的扩展写 **Node >= 22.19.0**，本页不合成一个全站最低版本。<!-- TODO: 待核实 --> 以你打开的那页为准。
- 一个模型供应商的 API key 或 OAuth（pi.dev：Authenticate via API keys or OAuth）。

## 15 分钟内打开

### 1. 装现行包

[Quickstart](https://pi.dev/docs/latest/quickstart) 原文：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

`--ignore-scripts`：官方写明安装时关掉依赖生命周期脚本；Pi 正常 npm 安装不需要这些脚本。

Linux / macOS 还可：

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

[2026-05-07 公告](https://pi.dev/news/2026/5/7/pi-has-a-new-home)：主安装包改为 `@earendil-works/pi-coding-agent`，仓库从 `badlogic/pi-mono` 迁到 `earendil-works/pi`。不要再 `npm i -g @mariozechner/pi-coding-agent`。

### 2. 发出第一句

在真实仓库目录里：

```bash
pi
```

进入 interactive TUI。脚本场景用官方的 print 模式：`pi -p "query"`；事件流加 `--mode json`（[pi.dev](https://pi.dev/)）。

切模型：官网写 `/model` 或 `Ctrl+L`；收藏夹 `Ctrl+P`。

### 3. 项目说明放哪

官网 Context engineering：

- **`AGENTS.md`**：启动时从 `~/.pi/agent/`、父目录、当前目录加载。
- **`SYSTEM.md`**：按项目替换或追加默认系统提示。

需要别人写好的能力：`pi install npm:@foo/pi-tools` 或 `pi install git:github.com/badlogic/pi-doom`（pi.dev 示例，原样抄）。

## 默认没有什么

来自 [pi.dev](https://pi.dev/) 与 [README](https://github.com/earendil-works/pi)：

- 没有内置 sub-agents、plan mode。
- 没有内置 MCP（可用 skill / extension）。
- 没有内置权限系统；要隔离去官方 containerization 文档。

这些是设计，不是漏写的开关。

## 下一步

- [速查](./pi-agent-cheatsheet.md)
- [术语](./pi-agent-glossary.md)
- 接到聊天通道 → [OpenClaw](/zh/products/openclaw/)
