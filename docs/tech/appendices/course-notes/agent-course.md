---
title: Agent Course 学习笔记
description: awesome-generative-ai-guide 课程笔记：Brain/Perception/Action 三组件模型、多 Agent 交互类型与评估基准清单（实现机制见 Learn LLM 第 13 章）。
domain: tech
tags: [tech, course-notes, legacy, agent]
navOrder: 83
topicId: course-notes-agent-course
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Agent Course (Free) 学习笔记

> 来源: [awesome-generative-ai-guide](https://github.com/aishwaryanr/awesome-generative-ai-guide) - Applied LLMs Mastery & Agents 101
> 学习日期: 2026-04-12  |  实现机制见 [Learn LLM](https://llm.zenheart.site/) 第 13 章（Agent）

## 一、Agent 核心理论框架

### Agent 三组件模型

```
┌─────────────────────────────────────────┐
│                  Agent                   │
├─────────────┬──────────────┬────────────┤
│   Brain    │  Perception  │   Action   │
│ (大脑)     │   (感知)      │   (行动)   │
└─────────────┴──────────────┴────────────┘
```

| 组件 | 职责 | 说明 |
|------|------|------|
| **Brain** | 中央控制器 | 存储信息、处理思考、做出决策 |
| **Perception** | 感知模块 | 解析外部环境的各种感官输入 |
| **Action** | 行动模块 | 使用工具执行任务并影响周围环境 |

### 实用四组件模型

| 组件 | 职责 | 示例 |
|------|------|------|
| **Agent Core** | 核心决策 | 目标定义、工具指令、行为模式 |
| **Memory Module** | 记忆存储 | 短期记忆（当前对话）+ 长期记忆（历史积累） |
| **Tools** | 工具调用 | RAG、代码解释器、搜索 API |
| **Planning Module** | 规划 | 任务分解（Task Decomposition）、反思批判（Reflection） |

Memory 检索机制：语义相似性（embedding 向量检索）、重要性加权、时序性（最近优先）、领域自定义指标。

## 二、单 Agent 与多 Agent

单 Agent 孤立运行，缺乏协作、社会学习与多轮反馈能力。多智能体系统（MAS）的优势：分工协作、集体决策、任务分解。交互类型：

| 类型 | 特点 | 适用场景 |
|------|------|----------|
| **Cooperative（合作）** | Agent 协同追求共同目标 | 任务分解流水线 |
| **Adversarial（对抗）** | Agent 通过博弈优化 | 代码评审、质量把控 |

## 三、Agent 评估基准

| 基准 | 用途 | 链接 |
|------|------|------|
| AgentBench | 综合评估 | [THUDM/AgentBench](https://github.com/THUDM/AgentBench) |
| ToolBench | 工具调用能力 | [Paper](https://arxiv.org/abs/2305.16504) |
| ClemBench | 多样化任务 | [Paper](https://arxiv.org/abs/2305.13455) |

评估方法学的 canonical 在 [evals.zenheart.site](https://evals.zenheart.site/)。

## 四、推荐学习路径（5-Day Roadmap）

- **Day 1-2 基础概念**: [LLM Agents Glossary](https://deepchecks.com/glossary/llm-agents/)  |  [Intro to LLM Agents - Nvidia](https://developer.nvidia.com/blog/introduction-to-llm-agents/)
- **Day 3-4 核心框架**: [Agents 101 Guide](https://github.com/aishwaryanr/awesome-generative-ai-guide/blob/main/resources/agents_101_guide.md)  |  [LLM Powered Autonomous Agents - Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent/)
- **Day 5 实战构建**: [AI Agents in LangGraph - Deeplearning.AI](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/)

## 五、与主线文档的关系

本笔记的三组件/四组件框架与多 Agent 交互模式已展开为主线 [Agent 运行时](/tech/06-agent-systems/agent-runtime)、[Agent 设计模式](/tech/06-agent-systems/design-patterns)与[多 Agent 系统](/tech/06-agent-systems/multi-agent)；本页保留为课程出处与外部资源索引。

## 相关资源

- [awesome-llm-powered-agent](https://github.com/hyp1231/awesome-llm-powered-agent) - Agent 研究汇总
- [awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) - AI Agent 工具列表
- [Applied LLMs Mastery 2024](https://github.com/aishwaryanr/awesome-generative-ai-guide/blob/main/free_courses/Applied_LLMs_Mastery_2024) - 完整课程
