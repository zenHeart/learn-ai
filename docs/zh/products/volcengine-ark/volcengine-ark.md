---
title: 火山方舟教程
description: 打开方舟控制台拿 API Key，按官方文档完成第一次调用，或安装官方 CLI。不编造 Base URL。
domain: product
tags:
  - api
role: tutorial
---

# 火山方舟教程

> 产品页：[volcengine.com/product/ark](https://www.volcengine.com/product/ark)。第一次 HTTP 调用以官方 [快速入门](https://www.volcengine.com/docs/82379/1399008) 为准。本页不编造 endpoint 或模型 ID。

## 目标与非目标

**写给谁：** 要接豆包大模型的前端 / Node 工程师。

**你会完成：** 打开 API Key 页；知道文档树在哪；能装官方 CLI。

**不会做：** 把豆包 App 当控制台、把 Trae 当方舟、抄一份过期的模型全表。

## 先决条件

- 一个火山引擎账号。
- 需要 CLI 时：本机有 npm。

## 15 分钟内打开

### 1. 拿 API Key

打开官方入口 [获取 API KEY](https://ark.volcengine.com/region:cn-beijing/apiKey)（火山引擎首页「通过火山方舟开启一站式大模型服务」旁）。

Key 的创建步骤、项目空间切换，以文档中心「获取 API Key 并配置」为准。本页不复述 SPA 里看不见的点击路径。

### 2. 第一次调用走官方页

打开 [快速入门](https://www.volcengine.com/docs/82379/1399008)（最近更新 2026.01.30）。选模型打开 [模型列表](https://www.volcengine.com/docs/82379) 侧栏「模型列表」，不要从本站抄 ID。

<!-- TODO: 待核实 --> 无 JS 环境下快速入门正文为空。不要用第三方博客里的 `base_url` 填这里。

### 3. 可选：装方舟 CLI

火山引擎首页原文：

```bash
npm i @volcengine/ark-cli@latest -g
```

产品页原文：「通过火山方舟官方命令行工具，一行命令完成认证、模型调用与资源管理」「方舟 CLI 上线，支持 Claude Code、Cursor、TRAE 等」。

CLI 子命令以官方「使用指南」为准，本页不编 `ark login` 之类未核对的 flag。

## 官方能力（按出处分组）

文档侧栏（2026-08-19 打开产品简介 / 快速入门页）可见这些一级分组：

| 分组 | 里面有什么（侧栏原文） | 本站 |
|------|------------------------|------|
| 开始使用 | 产品简介、快速入门、模型列表、模型价格、豆包大模型1.8 | 本页链出去 |
| 模型调用 | 文本生成、多模态理解、图片生成、视频生成、领域模型、工具调用 | 官方页 |
| 进阶使用 | 接入三方工具、使用 Responses API | [Cookbook](./volcengine-ark-cookbook.md) |
| 部署方式 | 常规 / 低延迟在线推理、模型单元、批量推理 | 地图一行 |
| 高级能力 | 模型精调及最佳实践 | 地图一行 |
| Coding Plan | 套餐概览、快速开始、接入 AI 编程工具 | Cookbook |

产品页另有安全能力（链路全加密、数据高保密、环境强隔离、操作可审计）。不当营销句展开。

## 下一步

- 接到 Claude Code / Cursor / Trae：[Cookbook](./volcengine-ark-cookbook.md)
- 回查 URL 与套餐原文：[速查](./volcengine-ark-cheatsheet.md)
- 模型内部：[Learn LLM](/zh/tech/fundamentals/LLM)
