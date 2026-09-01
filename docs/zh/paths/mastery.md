---
title: "路径 3: 构建 AI 产品"
description: 设计、构建并部署生产级 AI 应用。
domain: path
tags:
  - path
navOrder: 30
prev:
  text: 路径 2 集成
  link: /zh/paths/integration
next: false
---

# 路径 3: 构建 AI 产品

设计、构建并部署生产级 AI 应用。

## 路径 2 完成清单

在开始路径 3 之前，请确保你理解：
- ✅ 构建带错误处理的流式聊天机器人
- ✅ 使用 Embeddings 实现 RAG 搜索
- ✅ 使用工具调用创建交互式智能体
- ✅ 将 AI 功能部署到生产环境

**需要复习？** → [路径 2: 集成](./integration.md)

## 选择你的学习风格

- **🎯 边做边学**: 从 [全栈 SaaS 项目](../projects/advanced/full-stack-saas.md) 开始 → 参考指南
- **📚 系统学习**: 先阅读 [高级 RAG 模式](../tech/patterns/RAG.md) → 然后构建

<script setup>
const pathSteps = [
  {
    phase: '第 1 周',
    title: '高级 RAG',
    description: '为企业知识库实现生产级 RAG，包括混合搜索、重排序和元数据过滤。',
    status: 'active',
    links: [
      { text: 'RAG 模式', url: '/zh/tech/patterns/RAG' },
      { text: 'RAG 搜索项目', url: '/zh/projects/intermediate/rag-search' },
      { text: '本地 Embeddings', url: '/zh/cookbook/local-embedding' }
    ]
  },
  {
    phase: '第 2 周',
    title: 'AI 工程化',
    description: '像对待代码一样对待提示词。实施评估 (Evals)、监控和反馈循环，以系统地提高 AI 质量。',
    status: 'active',
    links: [
      { text: '测试', url: '/zh/tech/engineering/testing' },
      { text: '可观测性', url: '/zh/tech/engineering/observability' },
      { text: '评估 (Evals)', url: '/zh/tech/engineering/evals' },
      { text: '安全', url: '/zh/tech/engineering/security' }
    ]
  },
  {
    phase: '第 3 周',
    title: '部署与优化',
    description: '部署到 Edge/Workers 以实现低延迟，实施缓存策略、速率限制和成本优化。',
    status: 'active',
    links: [
      { text: 'Vercel Edge', url: '/zh/deployment/vercel-edge' },
      { text: 'Cloudflare Workers', url: '/zh/deployment/cloudflare-workers' },
      { text: '缓存', url: '/zh/deployment/caching' },
      { text: '成本优化', url: '/zh/tech/engineering/cost-optimization' }
    ]
  },
  {
    phase: '第 4 周',
    title: '多智能体系统',
    description: '构建具有多个专用智能体、微调策略和本地 LLM 部署的复杂自主工作流。',
    status: 'active',
    links: [
      { text: '多智能体应用', url: '/zh/projects/advanced/multi-agent-app' },
      { text: '智能体模式', url: '/zh/tech/patterns/agent/' },
      { text: '训练概览', url: '/zh/tech/training/' },
      { text: '浏览器 AI', url: '/zh/tech/frontend/browser-ai' }
    ]
  }
]
</script>

<LearningPath
  title="路径 3: <span>构建 AI 产品</span>"
  subtitle="设计、构建并部署生产级 AI 应用。"
  :steps="pathSteps"
/>

## 下一步

**准备好构建了吗？** → [项目部分](../projects/)

**复习概念？** → [技术基础](../tech/fundamentals/LLM.md)