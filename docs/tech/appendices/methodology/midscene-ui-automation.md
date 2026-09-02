---
title: Midscene：视觉驱动的 UI 自动化
description: 工具笔记：自然语言控制 Web/PC/Mobile 多端 UI 自动化，视觉建模突破 DOM 限制，可作 MCP Server 暴露设备操作。
domain: tech
tags: [tech, methodology, legacy, midscene, ui-automation, testing]
navOrder: 90
topicId: methodology-midscene
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Midscene：视觉驱动的 UI 自动化

> 来源：https://midscenejs.com/zh/  |  开源项目：https://github.com/web-infra-dev/midscene

## 核心要点

1. **多端支持**：Web（Playwright/Puppeteer）、PC（macOS/Windows/Linux）、Mobile（Android/iOS/HarmonyOS）统一 API
2. **视觉模型 + 多模型组合**：豆包 Seed、Qwen-VL、Gemini-3-Pro 可选，通过多模型协同提升任务完成率
3. **自然语言控制**：无需写代码，用自然语言描述即可操作任意界面，降低自动化门槛
4. **MCP Server 支持**：可作为 MCP Server 暴露设备操作，与多种模型协作使用
5. **任意界面视觉建模**：突破传统 DOM 限制，支持无结构界面的自动化控制
6. **报告与 Playground**：可视化回溯自动化流程，方便调试和结果分析

主线关联：UI 自动化在测试体系中的位置见[测试](/tech/08-production/testing)（确定性测试优先）；MCP Server 的契约与安全边界见 [MCP](/tech/07-interoperability/mcp)。
