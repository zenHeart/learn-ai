---
title: "路径 2: 添加 AI 功能"
description: 使用 JavaScript/TypeScript 将 AI 能力集成到你的应用中。
domain: path
tags:
  - path
navOrder: 20
prev:
  text: 路径 1 生产力
  link: /zh/paths/productivity
next:
  text: 路径 3 精通
  link: /zh/paths/mastery
---

# 路径 2: 添加 AI 功能

使用 JavaScript/TypeScript 将 AI 能力集成到你的应用中。

## 选择你的学习风格

- **🎯 边做边学**: 从 [AI 聊天机器人项目](../projects/beginner/ai-chatbot.md) 开始 → 需要时查阅指南

- **📚 系统学习**: 先阅读 [API 集成指南](../integration/apis/index.md) → 然后构建项目

## 开始之前

**AI/LLM 新手？** 先复习这些概念：
- [LLM 基础](../tech/fundamentals/LLM.md) - 理解大语言模型
- [API 对比](../integration/apis/index.md) - 选择合适的 API 提供商

**预设知识**: HTTP, REST APIs, JSON, 基础 Node.js/npm, React/Next.js 基础

<script setup>
const pathSteps = [
  {
    phase: '第 1 周',
    title: 'API 基础',
    description: '了解如何通过 API 与大语言模型 (LLM) 通信。学习身份验证、模型和基于 Token 的定价。',
    status: 'active',
    links: [
      { text: 'API 对比', url: '/zh/integration/apis/' },
      { text: 'OpenAI', url: '/zh/integration/apis/openai' },
      { text: 'Anthropic', url: '/zh/integration/apis/anthropic' },
      { text: 'LLM 基础', url: '/zh/tech/fundamentals/LLM' }
    ]
  },
  {
    phase: '第 1 周',
    title: '流式 UI (Streaming UI)',
    description: '用户期望 AI 能“打字”出答案。学习使用 Vercel AI SDK 和 Server Sent Events 实现流式传输。',
    status: 'active',
    links: [
      { text: '流式指南', url: '/zh/tech/frontend/streaming' },
      { text: 'Vercel AI SDK', url: '/zh/integration/frameworks/vercel-ai-sdk' },
      { text: '聊天 UI 组件', url: '/zh/cookbook/chat-ui' },
      { text: 'AI 聊天机器人项目', url: '/zh/projects/beginner/ai-chatbot' }
    ]
  },
  {
    phase: '第 2 周',
    title: 'RAG 模式',
    description: '教 AI 了解你的数据。实现检索增强生成 (RAG)，使 AI 的回答基于你的文档。',
    status: 'active',
    links: [
      { text: 'RAG 模式', url: '/zh/tech/patterns/RAG' },
      { text: 'Embeddings', url: '/zh/tech/fundamentals/embeddings' },
      { text: 'LlamaIndex TS', url: '/zh/integration/frameworks/llamaindex-ts' },
      { text: 'RAG 搜索项目', url: '/zh/projects/intermediate/rag-search' }
    ]
  },
  {
    phase: '第 2 周',
    title: '工具调用与智能体',
    description: '将 AI 从聊天机器人转变为执行操作的智能体。实现函数调用和工具使用模式。',
    status: 'active',
    links: [
      { text: '工具调用', url: '/zh/integration/protocols/tool-calling' },
      { text: 'MCP 协议', url: '/zh/integration/protocols/mcp' },
      { text: '生成式 UI', url: '/zh/tech/frontend/generative-ui' },
      { text: '智能体模式', url: '/zh/tech/patterns/agent/' }
    ]
  },
  {
    phase: '第 3 周',
    title: '生产级功能',
    description: '将所有内容组合成完善的功能：智能表单自动补全、文档问答机器人和错误处理。',
    status: 'active',
    links: [
      { text: '表单构建器', url: '/zh/projects/intermediate/ai-form-builder' },
      { text: '表单自动补全', url: '/zh/cookbook/form-autocomplete' },
      { text: '错误处理', url: '/zh/cookbook/error-handling' },
      { text: 'API 代理', url: '/zh/cookbook/api-proxy' }
    ]
  }
]
</script>

<LearningPath
  title="路径 2: <span>添加 AI 功能</span>"
  subtitle="使用 JavaScript/TypeScript 将 AI 能力集成到你的应用中。"
  :steps="pathSteps"
/>

## 下一步

**准备好进入路径 3？** → [路径 3: 精通](./mastery.md)

**需要故障排除？** → [错误处理秘籍](../cookbook/error-handling.md)