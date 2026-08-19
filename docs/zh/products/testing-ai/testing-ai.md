---
title: Testing AI 教程（Midscene）
description: 按 Midscene 官方文档把视觉 UI 测试接到 Playwright。不编造 npm 包名以外的 API。
domain: product
tags:
  - testing
role: tutorial
---

# Testing AI 教程（Midscene）

> 本页主路径是 **Midscene**。官方：[Introduction](https://midscenejs.com/introduction)、[Integrate with Playwright](https://midscenejs.com/integrate-with-playwright)、[GitHub](https://github.com/web-infra-dev/midscene)。

## 目标与非目标

**你会完成：** 知道 Midscene 和 DOM 选择器方案差在哪，打开官方 Playwright 集成页做第一次接入。

**不会做：** 把仓库旧文里的 ZeroStep `ai()` 示例当现行官方 API；给 Qodo 写安装。

## Midscene 是什么（官方原文）

Introduction：

- 开源 SDK，视觉驱动 UI 测试与自动化。
- **只靠截图**，用多模态模型；用自然语言写目标和断言。
- **两种用法：** 加进现有 Playwright / Vitest，或让 Agent 通过 Skills 自主测。
- 方法名在官方 API 里：`aiAct`、`aiQuery`、`aiAssert` 等（以 [API reference](https://midscenejs.com/introduction) 链出去的 reference 为准）。

不要把旧摘抄里的 `await ai('Navigate to booking page')` 写成 Midscene 现行 API。

## 接到 Playwright

逐步命令、fixture 名以官方 [Integrate with Playwright](https://midscenejs.com/integrate-with-playwright) 为准。该页还链示例仓库 `web-infra-dev/midscene-example`。

<!-- TODO: 待核实 --> 本页不抄一份可能过期的 `npm i` 包名表；打开上面官方页复制。

示例项目（官方页原文）：

- 直接集成：https://github.com/web-infra-dev/midscene-example/blob/main/playwright-demo
- Playwright test：https://github.com/web-infra-dev/midscene-example/blob/main/playwright-testing-demo

## 目录里其它工具

- **Qodo**：原 Codium。官网定位已是 AI code review 平台，不是「只写单测的插件」。去 [qodo.ai](https://www.qodo.ai/)。
- **ZeroStep / Reflect**：地图一行。2026-08-19 未把它们的安装命令核进本 Tutorial。

## 下一步

[速查](./testing-ai-cheatsheet.md) · 本站技术笔记 [Midscene UI 自动化](/zh/tech/testing/midscene-ui-automation)
