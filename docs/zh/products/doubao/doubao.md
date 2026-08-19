---
title: 豆包教程
description: 打开豆包网页或桌面客户端，发出第一句。只复述能在官方页核对的入口和能力。
domain: product
tags:
  - chat
role: tutorial
---

# 豆包教程

> 先打开 [doubao.com](https://www.doubao.com/) 或 [桌面下载页](https://www.doubao.com/download/desktop)。本页只复述能在官方页核对的入口。

## 目标与非目标

**写给谁：** 第一次用豆包的前端工程师。

**你会完成：** 在网页或客户端里发出第一句；知道桌面页比首页多写了什么。

**不会做：** Trae 安装、方舟 API、扣子编排、编造会员价。

## 先决条件

- 能打开 `doubao.com`。部分网络会把该域名解析到 `198.18.0.0/15`，先换 DNS / 关 Fake-IP 再判断「打不开」。
- 部分区域首页会提示先登录，或改用 **Dola**。Dola 不是本教程对象。

## 15 分钟内打开

### 1. 选一个官方入口

| 端 | 怎么走 | 来源 |
|----|--------|------|
| 网页 | 打开 [doubao.com](https://www.doubao.com/)，登录后提问 | 首页 |
| 网页（桌面落地页） | [download/desktop](https://www.doubao.com/download/desktop) 点 **使用网页版** | 桌面页 |
| Windows / macOS | [download](https://www.doubao.com/download/) 或桌面页 **下载豆包桌面版** | 官方下载 |
| Windows 商店 | Microsoft Store 应用「豆包」，id `XPDDTBMM6TZ365` | [商店页](https://apps.microsoft.com/detail/xpddtbmm6tz365) |
| Android | 应用宝包名 `com.larus.nova`（开发者：北京春田知韵科技有限公司） | [应用宝](https://sj.qq.com/appdetail/com.larus.nova) |

系统最低版本官方下载页 2026-08-19 **没有**在无 JS 抓取里给出数字。<!-- TODO: 待核实 --> 以安装包页为准。

### 2. 发出第一句

登录后在输入框提问。首页把豆包定位成聊天、写作、文案、翻译、编程工具。把它当对话助手用，不要期待它克隆仓库、开 PR。

### 3. 桌面版多写了什么

只在需要本地生产力时装客户端。官方桌面页原文：

- 「日常工作可高效写作翻译、一键生成PPT、智能处理Excel 数据」
- 「创意创作依托专业版Seedream 5.0 生图，专业版Seedance 2.5 生视频核心模型」
- 「内置自主规划执行的 Agent 智能体，自动统筹多类任务」

逐步点击路径官方没有文档树，本页不编。

## 官方能力（按出处分组）

### 首页 / 下载页 meta 在说什么

> Seedance 2.0 视频生成模型现已全面接入 豆包 ，现在登录即可免费使用！

> 豆包 是你的 AI 聊天智能对话问答助手，写作文案翻译编程工具。

### 桌面落地页在说什么

[download/desktop](https://www.doubao.com/download/desktop) 把同一产品写成「全链路 AI 生产力」，并点名 **Seedream 5.0**、**Seedance 2.5**、**Agent 智能体**。

**两份官方页的视频模型版本号不一致。** 本站并列引用，不宣布哪一个「才算现行」。

### 和编程相关的边界

官方把「编程」写在助手能力里。仓库级、带 diff / 终端的编码去 [Trae](https://www.trae.ai/)（本站 #80）。在自己的服务里调豆包模型去 [火山方舟](https://www.volcengine.com/product/ark)（本站 #82）。

## 下一步

- 回查入口：[速查表](./doubao-cheatsheet.md)
- 分清同厂名字：[术语表](./doubao-glossary.md)
- 模型内部：[Learn LLM](/zh/tech/fundamentals/LLM)
