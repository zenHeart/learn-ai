---
title: 火山方舟 Cookbook
description: 接到第三方编程工具、查套餐。只指向官方页，不编造命令。
domain: product
tags:
  - api
role: how-to
---

# 火山方舟 Cookbook

官方 How-to 在文档中心。这里只告诉你去哪一页。最后核实：2026-08-19。

## 把方舟接到 Claude Code / Cursor / Trae

产品页原文：「方舟 CLI 上线，支持 Claude Code、Cursor、TRAE 等」。

操作跟文档侧栏 **进阶使用 → 接入三方工具**，以及 **Coding Plan → 接入 AI 编程工具**。本页不编各工具的环境变量名。

CLI 安装只抄首页：

```bash
npm i @volcengine/ark-cli@latest -g
```

## 选套餐时先分清两块牌子

| 官方名称 | 出现位置 | 本站怎么处理 |
|----------|----------|----------------|
| Coding Plan | 文档侧栏独立分组 | 打开官方「套餐概览 / 快速开始」 |
| Agent Plan | 产品页「限时 9.9 元起」 | 链产品页，不扩写权益 |
| 在线推理按量 | 产品页「6元起/百万输入tokens」 | 完整单价看 [模型价格](https://www.volcengine.com/docs/82379/1544106) |
| 协作奖励计划 | 产品页「每日……最高500万Tokens」 | 链产品页「立即参与」 |

不要把第三方截图里的折扣写进仓库。

## 在应用里用知识库 / 扣子专业版

产品页「模型能力扩展」提到联网插件、内容插件、知识库和**扣子专业版**。扣子正文在 #81。本目录不写编排步骤。

## 精调 / 批量推理

文档侧栏有完整分组。本站不写操作。打开 [文档根](https://www.volcengine.com/docs/82379) 对应章节。
