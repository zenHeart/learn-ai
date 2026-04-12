# Agent Design Patterns 学习笔记

> 来源: [Agentic Design Patterns 中文翻译项目](https://adp.xindoo.xyz/) by xindoo
> 学习日期: 2026-04-12

## 概述

《Agentic Design Patterns》系统介绍了 AI Agent 系统的 21 个核心设计模式，涵盖从基础到高级的完整体系。

---

## 21 个核心模式速览

### 基础模式 (1-3)

| # | 模式 | 核心思想 |
|---|------|----------|
| 1 | **Prompt Chaining** | 将复杂任务分解为顺序步骤，每步输出作为下一步输入 |
| 2 | **Routing** | 根据输入特征/意图动态选择不同处理路径 |
| 3 | **Parallelization** | 并行处理独立子任务以提升吞吐量 |

### 进阶模式 (4-7)

| # | 模式 | 核心思想 |
|---|------|----------|
| 4 | **Reflection** | Agent 自我审视输出质量，自我修正 |
| 5 | **Tool Use** | LLM 调用外部工具扩展能力 |
| 6 | **Planning** | 主动分解目标并规划执行步骤 |
| 7 | **Multi-Agent Collaboration** | 多 Agent 协作分工 |

### 高级模式 (8-13)

| # | 模式 | 核心思想 |
|---|------|----------|
| 8 | **Memory Management** | 短期/长期记忆的存储与检索策略 |
| 9 | **Learning and Adaptation** | 从交互中持续学习和适应 |
| 10 | **Model Context Protocol (MCP)** | 标准化的上下文协议 |
| 11 | **Goal Setting and Monitoring** | 目标设定与执行监控 |
| 12 | **Exception Handling and Recovery** | 异常检测与恢复机制 |
| 13 | **Human-in-the-Loop** | 人类介入的关键节点设计 |

### 应用与安全模式 (14-21)

| # | 模式 | 核心思想 |
|---|------|----------|
| 14 | **Knowledge Retrieval (RAG)** | 知识检索增强生成 |
| 15 | **Inter-Agent Communication (A2A)** | Agent 间通信协议 |
| 16 | **Resource-Aware Optimization** | 资源感知的成本优化 |
| 17 | **Reasoning Techniques** | 推理技术（CoT/ToT 等） |
| 18 | **Guardrails/Safety Patterns** | 安全防护与内容过滤 |
| 19 | **Evaluation and Monitoring** | Agent 系统评估与监控 |
| 20 | **Prioritization** | 任务优先级排序 |
| 21 | **Exploration and Discovery** | 探索与发现新模式 |

---

## 核心模式详解

### 1. Prompt Chaining（提示词链）

**适用场景**: 复杂多步骤任务，单一 Prompt 容易出现指令忽略、上下文偏离、错误传播

**典型流程**:
```
用户查询 → 分析(LLM) → 检索(工具) → 综合(LLM) → 输出
```

**代码框架**: LangChain、LangGraph、Crew AI

**关键技巧**: 使用结构化输出（JSON/XML）确保步骤间数据完整性

### 2. Routing（路由）

**路由机制**:

| 类型 | 特点 | 适用场景 |
|------|------|----------|
| **LLM-based** | 灵活，可处理模糊输入 | 意图分类、复杂决策 |
| **Embedding-based** | 语义匹配 | 知识库路由、相似度检索 |
| **Rule-based** | 快速、确定性 | 关键词匹配、结构化数据 |
| **ML-based** | 专业分类器 | 高精度特定场景 |

**示例**:
```
用户: "我想查下订单" → LLM分类 → "订单状态" → 路由到订单处理Agent
用户: "这个功能怎么用" → LLM分类 → "产品信息" → 路由到搜索Agent
```

### 3. Parallelization（并行化）

**核心思想**: 独立子任务并行执行，减少总延迟

**模式**:
- **Map-Reduce**: 并行处理 → 结果聚合
- **分叉-合并**: 多分支并行 → 汇合综合

### 4. Reflection（反思）

**Agent 自我修正循环**:
```
生成输出 → 自我评估 → 发现问题 → 修正 → 再次评估
```

**关键**: 给 Agent 提供评估标准和批评提示

### 5. Tool Use（工具调用）

**工具类型**:
- **信息获取**: 搜索、数据库查询、RAG
- **计算**: 数学计算、代码执行
- **操作**: 发送消息、创建工单、文件操作
- **API集成**: 第三方服务调用

### 6. Planning（规划）

**规划策略**:
- **任务分解 (Task Decomposition)**: 目标 → 子目标树
- **链式规划 (Chain of Thought)**: 逐步推理
- **树形规划 (Tree of Thought)**: 多路径探索

### 7. Multi-Agent Collaboration（多智能体协作）

**协作模式**:

| 模式 | 说明 |
|------|------|
| **合作** | 多个 Agent 协同完成共同目标 |
| **对抗** | Agent 间博弈（如代码评审） |
| **层次** | 协调者 Agent + 专司机 Agent |

**框架**: LangGraph（状态图）、Microsoft Autogen、Google ADK

---

## 与现有文档的关系

本文档是 Agent 设计模式的体系化概览。建议结合以下文档深入学习：

- [Agent 模式索引](./index.md) - ReAct/Plan-Execute 等工程模式
- [Agent Course 学习笔记](./agent-course.md) - Agent 核心理论框架
- [Workflow Patterns](./workflow-patterns.md) - 工作流模式实践

---

## 相关资源

- [Agentic Design Patterns 原书](https://adp.xindoo.xyz/) - 中文翻译 by xindoo
- [LangGraph](https://langchain-ai.github.io/langgraph/) - 状态化 Agent 框架
- [Microsoft Autogen](https://microsoft.github.io/autogen/) - 多 Agent 协作框架
- [Google ADK](https://google.github.io/adk-docs/) - Google Agent 开发工具包
