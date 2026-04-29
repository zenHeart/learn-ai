# Agent Course (Free) 学习笔记

> 来源: [awesome-generative-ai-guide](https://github.com/aishwaryanr/awesome-generative-ai-guide) - Applied LLMs Mastery & Agents 101
> 学习日期: 2026-04-12

## 一、Agent 核心理论框架

### Agent 三组件模型

LLM Agent 基于"大语言模型+工具"构建，核心由三个组件构成：

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

更常用的工程化框架：

| 组件 | 职责 | 示例 |
|------|------|------|
| **Agent Core** | 核心决策 | 目标定义、工具指令、行为模式 |
| **Memory Module** | 记忆存储 | 短期记忆（当前对话）+ 长期记忆（历史积累） |
| **Tools** | 工具调用 | RAG、代码解释器、搜索 API、天气查询 |
| **Planning Module** | 规划模块 | 任务分解（Task Decomposition）、反思批判（Reflection） |

### Memory 检索机制

- **语义相似性**: 基于 embedding 的向量检索
- **重要性**: 关键信息加权
- **时序性**: 最近交互优先
- **应用特定指标**: 领域相关的自定义权重

---

## 二、单 Agent 与多 Agent

### 单 Agent 局限

LLM Agent 通常孤立运行，缺乏：
- 与其他 Agent 协作的能力
- 从社会交互中学习的能力
- 多轮反馈和协作处理复杂场景

### 多智能体系统 (Multi-Agent System, MAS)

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Agent A  │ ←→  │ Agent B  │ ←→  │ Agent C  │
│ (专业领域) │     │ (协调器)  │     │ (执行器)  │
└──────────┘     └──────────┘     └──────────┘
```

**优势**:
- **分工协作**: 专业化 Agent 处理特定任务
- **集体决策**: 多角度分析提升质量
- **任务分解**: 复杂任务拆解为多个子任务

### 多 Agent 交互类型

| 类型 | 特点 | 适用场景 |
|------|------|----------|
| **Cooperative（合作）** | Agent 协同追求共同目标 | 任务分解流水线 |
| **Adversarial（对抗）** | Agent 通过博弈优化 | 代码评审、质量把控 |

---

## 三、Agent 评估基准

| 基准 | 用途 | 链接 |
|------|------|------|
| AgentBench | 综合评估 | [THUDM/AgentBench](https://github.com/THUDM/AgentBench) |
| IGLU | 目标导向对话 | [IGLU](https://arxiv.org/abs/2304.10750) |
| ToolBench | 工具调用能力 | [ToolBench](https://arxiv.org/abs/2305.16504) |
| ClemBench | 多样化任务 | [ClemBench](https://arxiv.org/abs/2305.13455) |

---

## 四、推荐学习路径 (5-Day Agent Roadmap)

### Day 1-2: 基础概念

- [LLM Agents Glossary - Deepchecks](https://deepchecks.com/glossary/llm-agents/)
- [Navigating LLM Agents: A Beginner's Guide](https://towardsdatascience.com/navigating-the-world-of-llm-agents-a-beginners-guide-3b8d499db7a9)
- [Intro to LLM Agents - Nvidia](https://developer.nvidia.com/blog/introduction-to-llm-agents/)

### Day 3-4: 核心框架

- [Agents 101 Guide](https://github.com/aishwaryanr/awesome-generative-ai-guide/blob/main/resources/agents_101_guide.md)
- [LLM Powered Autonomous Agents - Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent/)
- [LLM Agents - Prompt Engineering Guide](https://www.promptingguide.ai/research/llm-agents)

### Day 5: 实战构建

- [LangChain Agents Tutorial](https://www.youtube.com/watch?v=WVUITosaG-g)
- [AI Agents in LangGraph - Deeplearning.AI](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/)
- [Multi-Agent on Microsoft Autogen](https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat/)

---

## 五、实战案例

| 项目 | 说明 | 链接 |
|------|------|------|
| ChemCrow | 化学领域的工具增强 Agent | [Paper](https://arxiv.org/abs/2304.05376) |
| BabyAGI | 轻量级任务驱动的 Agent | [GitHub](https://github.com/yoheinakajima/babyagi) |
| OS-Copilot | 通用计算机操作 Agent | [Paper](https://arxiv.org/abs/2402.07456) |

---

## 六、与现有文档的关系

本文档补充以下内容：

- **理论框架**: Brain/Perception/Action 三组件模型（现有文档侧重 ReAct/Plan-Execute 等工程模式）
- **多 Agent 系统**: 合作与对抗交互模式（现有文档尚未覆盖）
- **评估基准**: AgentBench 等标准化评估方法

建议与 [Agent 模式索引](./index.md) 配合阅读。

---

## 相关资源

- [awesome-llm-powered-agent](https://github.com/hyp1231/awesome-llm-powered-agent) - Agent 研究汇总
- [awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) - AI Agent 工具列表
- [Applied LLMs Mastery 2024](https://github.com/aishwaryanr/awesome-generative-ai-guide/blob/main/free_courses/Applied_LLMs_Mastery_2024) - 完整课程
