---
title: Pi Agent 速查表
description: Pi 官方安装命令、模式和入口。旧 npm 包不要用。
domain: product
tags:
  - harness
role: reference
---

# Pi Agent 速查表

最后核实：2026-08-19。

## 安装（只抄官方）

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

来源：[Quickstart](https://pi.dev/docs/latest/quickstart)。

## 常用

| 动作 | 官方原文 |
|------|----------|
| 交互 | `pi` |
| 脚本 | `pi -p "query"` |
| JSON 事件 | `--mode json` |
| 切模型 | `/model` 或 `Ctrl+L` |
| 装包 | `pi install npm:@foo/pi-tools` |

## 入口

| 页 | URL |
|----|-----|
| 产品 | https://pi.dev/ |
| Docs | https://pi.dev/docs/latest |
| 新家 | https://pi.dev/news/2026/5/7/pi-has-a-new-home |
| GitHub | https://github.com/earendil-works/pi |
| 旧包（deprecated） | https://www.npmjs.com/package/@mariozechner/pi-coding-agent |
