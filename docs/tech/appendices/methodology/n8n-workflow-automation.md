---
title: n8n 工作流自动化
description: 工具笔记：开源工作流自动化平台，可视化编排 AI 逻辑、内置 LLM/Embedding 节点、支持自托管。
domain: tech
tags: [tech, methodology, legacy, n8n, workflow]
navOrder: 89
topicId: methodology-n8n
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# n8n 工作流自动化

> 来源：https://ce101.ifuryst.com/（上下文工程指南提及）

## 核心要点

1. **n8n 定位**：开源的工作流自动化工具，支持可视化编排 AI 逻辑，低代码接入多种服务
2. **AI 集成能力**：内置 LLM 节点、Embedding 节点，支持自定义 Tool 调用，实现复杂 AI 工作流编排
3. **Webhook + 触发器**：多种触发方式（定时、手动、Webhook）使 AI 工作流可被外部系统调用
4. **代码节点**：支持 JavaScript/Python 自定义逻辑，兼顾低代码和灵活性
5. **自托管优势**：可部署在本地，数据不离开企业，适合对数据安全有要求的企业场景

主线关联：何时用可视化工作流、何时写代码编排，见[工作流模式](../../04-action/workflow)的复杂度决策；工具本身的接入细节以[厂商文档](https://docs.n8n.io/)为准（归 Products 关心的范围）。
