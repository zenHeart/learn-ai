# Multi-Agent Coordination Patterns

> 原文: https://claude.com/blog/multi-agent-coordination-patterns
>
> 注：原文链接 `https://www.anthropic.com/engineering/multi-agent-orchestration` 已失效，当前内容取自 Claude 官方博客发布的 "Multi-agent coordination patterns: Five approaches and when to use them"（2026年4月10日）

## 概述

多智能体系统的核心决策不仅在于何时使用多智能体，更在于选择哪种**协调模式**来适配你的问题。

本文介绍五种多智能体协调模式、它们的权衡取舍，以及何时应该从一种模式演进到另一种。

## 五种协调模式

| 模式 | 适用场景 |
|------|----------|
| **Generator-Verifier** | 质量关键型输出，有明确评估标准 |
| **Orchestrator-Subagent** | 清晰的任务分解，有界的子任务 |
| **Agent Teams** | 并行、独立、长时间运行的子任务 |
| **Message Bus** | 事件驱动的管道，日益增长的 agent 生态 |
| **Shared State** | 协作性工作，agents 互相构建彼此的发现 |

## 模式一：Generator-Verifier

这是最简单也是部署最广泛的多智能体模式。生成器接收任务产生初始输出，验证器评估输出是否符合要求标准。如果不符合，将反馈路由回生成器，生成器根据反馈生成修订版本。循环持续直到验证器接受输出或达到最大迭代次数。

### 适用场景

- 需要基于知识库检查准确性的客服邮件生成
- 代码生成（一个 agent 写代码，另一个写测试并运行）
- 事实核查、基于评分标准的评分、合规验证
- 任何错误输出比额外生成周期成本更高的领域

### 局限性

- 验证器质量取决于其标准定义是否清晰
- 如果评估和生成一样困难，验证器可能无法可靠地捕捉问题
- 可能陷入振荡而不收敛，需要设置最大迭代限制和 fallback 策略

## 模式二：Orchestrator-Subagent

层级定义了这个模式。一个 agent 作为团队领导，计划工作、分配任务、综合结果。Subagents 处理特定职责并回报结果。

Claude Code 使用此模式：主 agent 自己写代码、编辑文件和运行命令，在需要搜索大型代码库或调查独立问题时将 subagents 分派到后台，工作继续的同时结果流回。每个 subagent 在自己的上下文窗口中运行并返回提炼的发现。

### 适用场景

- 自动化代码审查系统：需要检查安全漏洞、验证测试覆盖率、评估代码风格、评估架构一致性
- 任务分解清晰且子任务相互依赖最小

### 局限性

- Orchestrator 成为信息瓶颈。Subagent 发现与另一个 subagent 工作相关的内容时，信息必须通过 orchestrator 路由
- 顺序执行限制吞吐量，除非显式并行化

## 模式三：Agent Teams

当工作分解为可以长时间独立运行的并行子任务时，Orchestrator-Subagent 可能变得过于约束。

协调器将多个 worker agents 作为独立进程生成。Teammates 从共享队列认领任务，跨多步自主工作，并发出完成信号。

与 Orchestrator-Subagent 的区别在于 **worker 持久性**：Orchestrator 为一个有限子任务生成 subagent，subagent 返回结果后终止。Teammates 在多次任务中保持存活，积累上下文和领域专业化，随时间推移性能提升。

### 适用场景

- 将大型代码库从一个框架迁移到另一个框架
- 每个 teammate 可以独立处理自己的服务，带有依赖、测试套件和部署配置
- 子任务独立且受益于持续的多步工作

### 局限性

- 独立性是关键要求。Teammates 无法轻松共享中间发现
- 完成检测更难：协调器必须处理部分完成的情况
- 共享资源（如同一代码库、数据库）可能导致冲突

## 模式四：Message Bus

随着 agent 数量增加和交互模式变得复杂，直接协调变得难以管理。Message Bus 引入共享通信层，agents 在其中发布和订阅事件。

agents 通过两个原语交互：**publish** 和 **subscribe**。Agents 订阅它们关心的话题，路由器传递匹配的消息。新 agent 具备新能力，无需重新连接即可开始接收相关工作。

### 适用场景

- 安全运营自动化系统：告警从多个来源到达，分类 agent 按严重性和类型分类，高严重性网络告警路由到网络调查 agent，凭证相关告警路由到身份分析 agent
- 工作流由事件涌现而非预定序列的事件驱动管道
- agent 生态系统可能增长

### 局限性

- 事件驱动的灵活性使追踪更困难
- 路由准确性至关重要：路由器误分类或丢弃事件时，系统会静默失败

## 模式五：Shared State

前面模式中的 Orchestrator、team leads 和 message routers 都集中管理信息流。Shared State 通过让 agents 通过持久化存储直接协调来移除中间人。

Agents 自主运行，从共享数据库、文件系统或文档读写。没有中心协调器。Agents 检查存储中的相关信息、基于发现采取行动、将发现写回。

### 适用场景

- 研究综合系统：多个 agents 调查复杂问题的不同方面
  - 一个探索学术文献
  - 另一个分析行业报告
  - 第三个检查专利
  - 第四个监控新闻
  每个 agent 的发现可能影响其他人的调查

- Shared State 还消除了协调器作为单点故障

### 局限性

- 没有显式协调，agents 可能重复工作或追求矛盾方法
- 更难的失败模式是**反应性循环**：Agent A 写发现 → Agent B 读取并写跟进 → Agent A 看到跟进并响应 → 系统无限制燃烧 token
- 需要一等一的终止条件：时间预算、收敛阈值（ N 个周期无新发现）或指定负责判断存储是否包含足够答案的 agent

## 模式选择与演进

### Orchestrator-Subagent vs. Agent Teams

两者都涉及协调器向其他 agents 分派工作。问题是 **workers 需要保持上下文多久**：
- 任务短、聚焦、产出清晰 → **Orchestrator-Subagent**
- 子任务受益于持续多步工作，agents 需要跨调用保留状态 → **Agent Teams**

### Orchestrator-Subagent vs. Message Bus

两者都可以处理多步工作流。问题是 **工作流结构是否可预测**：
- 步骤顺序已知 → **Orchestrator-Subagent**
- 工作流由事件涌现，可能因发现而变化 → **Message Bus**

### Agent Teams vs. Shared State

两者都涉及 agents 自主工作。问题是 **agents 是否需要彼此的发现**：
- 工作在独立分区不交互 → **Agent Teams**
- 工作是协作性的，发现应实时流动 → **Shared State**

### Message Bus vs. Shared State

两者都支持复杂多智能体协调。问题是 **工作是作为离散事件流动还是累积到共享知识库**：
- Agents 响应管道中的事件 → **Message Bus**
- Agents 基于累积发现持续构建 → **Shared State**
- 如果 message bus 系统中的 agents 发布事件来共享发现而非触发动作，Shared State 更适合

## 总结表格

| 情况 | 模式 |
|------|------|
| 质量关键型输出，有明确评估标准 | Generator-Verifier |
| 清晰的任务分解，有界的子任务 | Orchestrator-Subagent |
| 并行工作负载，独立长时间运行的子任务 | Agent Teams |
| 事件驱动管道，日趋增长的 agent 生态 | Message Bus |
| 协作研究，agents 共享发现 | Shared State |
| 需要消除单点故障 | Shared State |

## 入门建议

生产系统通常组合模式。常见混合：
- 用 **Orchestrator-Subagent** 处理整体工作流，用 **Shared State** 处理协作密集型子任务
- 用 **Message Bus** 处理事件路由，用 **Agent Teams** 风格的 workers 处理每种事件类型

大多数用例建议从 **Orchestrator-Subagent** 开始。它以最少的协调开销处理最广泛的问题范围。观察它在哪里挣扎，然后在特定需求明确时向其他模式演进。

> 参见前文 [Building multi-agent systems: when and how to use them](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them) 了解多智能体系统是否值得投资。
