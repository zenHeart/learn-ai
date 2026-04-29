# Context Engineering & Agentic Engineering

> 本文档整理自 Inbox 学习任务，来源包括 Anthropic 官方工程指南、Simon Willison 的 Agentic Engineering Patterns 等。

## 1. Context Engineering 导论

### 1.1 什么是 Context Engineering

Context Engineering 是 Prompt Engineering 的自然进化。核心区别：

| | Prompt Engineering | Context Engineering |
|---|---|---|
| **焦点** | 写什么 prompt | 管理整个 context window 的 tokens |
| **范围** | 一次性指令 | 跨多轮推理的上下文迭代管理 |
| **时机** | 写好 prompt 就固定 | 每次推理时动态决策 |

**核心公式**：

```
Context = System Instructions + Tools + MCP + External Data + Message History + ...
```

Context Engineering 的本质：**从不断演化的信息宇宙中，精选最有可能引导 LLM 达成目标的 token 集合**。

### 1.2 为什么 Attention 是有限资源

LLM 基于 Transformer 架构，每个 token 可以 attend 到上下文中的所有其他 token，形成 n² 配对关系。上下文越长，模型准确 recall 信息的能力越弱（Context Rot）。

**关键原则**：上下文必须被视为有限资源，具有边际效益递减。LLM 和人类一样，有"注意力预算"。

缓解措施：
- **Position Encoding Interpolation**：让模型适应更长序列
- **Context Compression**：摘要、提取、重写
- **Semantic Chunking**：智能分块，避免语义失真

### 1.3 Context Engineering 的四大支柱

1. **检索（Retrieval）**：精确检索最相关的上下文
2. **增强（Augmentation）**：RAG、MCP 工具
3. **压缩（Compression）**：Context 压缩技术
4. **缓存（Caching）**：减少重复计算

---

## 2. 构建有效的 Agents

> 来源：[Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)

### 2.1 Agent 的定义

**Workflows**：通过预定义代码路径编排 LLM 和工具
**Agents**：LLM 动态指导自己的流程和工具使用，保持对任务完成方式的控制

### 2.2 何时（不）使用 Agents

**推荐做法**：先用最简单的方案，只有在复杂度必须增加时才增加。
- 优化单次 LLM 调用 + retrieval + in-context examples 通常足够
- Agents 往往以延迟和成本换取更好的任务性能

**选择 Workflow 还是 Agent**：
- 任务定义清晰、需要可预测性 → Workflow
- 需要灵活性和模型驱动决策 → Agent

### 2.3 框架选择

主流框架：Claude Agent SDK、Strands Agents SDK (AWS)、Rivet (GUI)、Vellum (GUI)

**建议**：先用 LLM API 直接实现，很多模式几行代码就能实现。如果用框架，确保理解底层代码。

### 2.4 Agentic 系统模式

#### Building Block: Augmented LLM

LLM 增强版 = LLM + Retrieval + Tools + Memory

推荐聚焦两个关键实现维度：
1. 针对特定用例定制化
2. 提供易于使用的文档化接口

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) 是标准化工具集成的方案。

#### Pattern 1: Prompt Chaining

将任务分解为序列步骤，每个 LLM 调用处理前一个的输出。

**适用场景**：任务可清晰分解为固定子任务，目标是牺牲延迟换取更高准确率。

#### Pattern 2: Routing

分类输入并引导到专用后续任务。

**适用场景**：复杂任务有明确分类，不同类别需不同处理流程/提示/工具。

#### Pattern 3: Parallelization

两种变体：
- **Sectioning**：拆分为独立子任务并行运行
- **Voting**：同一任务运行多次获得多样化输出

**适用场景**：子任务可并行加速，或需要多视角/多次尝试以获得更高置信度结果。

#### Pattern 4: Orchestrator-Workers

动态分配任务给不同 worker 的编排器。

#### Pattern 5: Evaluator-Optimizer

迭代优化：Evaluator 判断输出质量，Optimizer 根据反馈改进。

### 2.5 安全考虑

Agents 可能执行超出预期的操作：
- 最小权限原则
- 工具权限分层
- 关键操作人工确认
- 操作日志审计

---

## 3. Agentic Engineering（Simon Willison）

> 来源：[Simon Willison - Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

### 3.1 定义

**Agentic Engineering**：使用编码代理（coding agents）辅助软件开发。

**Coding Agent** = 能写又能执行代码的代理。代表：Claude Code、OpenAI Codex、Gemini CLI。

**Agent 核心定义**：Agents run tools in a loop to achieve a goal。

### 3.2 Agentic Engineering 的核心要素

LLM 不会从过去的错误中学习，但 coding agents 可以——前提是我们有意识地更新指令和工具 harness。

1. **提供工具**：给 coding agent 解决问题的工具
2. **详细说明**：以正确的细节级别指定问题
3. **验证迭代**：验证结果并迭代直到确信解决了问题

### 3.3 Agentic Engineering vs Vibe Coding

**Vibe Coding**（由 Andrej Karpathy 提出）："让 LLM 写代码，同时你忘记代码的存在"。

关键区别：
- Vibe coding = 未审查的原型质量代码
- Agentic engineering = 精心设计的、可验证的工程实践

---

## 4. Prompt Engineering 最佳实践

> 来源：[Claude - Best Practices for Prompt Engineering](https://claude.com/blog/best-practices-for-prompt-engineering)

### 4.1 核心技巧

#### 明确且清晰（Be Explicit and Clear）

现代 AI 模型对清晰明确的指令响应极好。用简单语言直接说明你想要什么。

**原则**：告诉模型确切想看到什么。如果要全面输出，直接要求。

#### 提供上下文和动机（Provide Context and Motivation）

解释为什么某事重要，帮助模型更好理解目标，从而提供更有针对性的响应。

**何时提供上下文**：
- 解释输出的目的或受众
- 澄清约束存在的原因
- 描述输出如何使用
- 表明要解决什么问题

#### 具体化（Be Specific）

具体化 = 用明确指导和需求构建指令。越具体，结果越好。

**包含要素**：
- 明确约束（字数、格式、时间线）
- 相关上下文（受众是谁、目标是什么）
- 期望的输出结构（表格、列表、段落）
- 任何要求或限制

#### 使用示例（Use Examples）

One-shot（一个示例）或 Few-shot（几个示例），展示比描述更容易。

**何时用示例**：
- 期望格式更容易展示而非描述
- 需要特定语气或风格
- 任务涉及微妙模式或惯例

#### 允许表达不确定性（Express Uncertainty）

显式允许 AI 表达不确定性而非猜测，减少幻觉。

示例：`"Analyze this data and identify trends. If the data is insufficient, say so rather than speculating."`

### 4.2 高级技巧

#### Prefill AI's Response

预填充 AI 的响应，引导格式、语气或结构。对于强制输出 JSON 等结构化格式特别有用。

#### XML Tagging

使用 XML 标签（如 `<context>`、`<instructions>`）组织 prompt 的不同部分，虽然模型越来越强大后重要性在降低。

#### Chain of Thought

对于复杂推理，在给出最终答案前引导模型"思考"。`Let me think through this step by step` 可以显著改善数学和逻辑任务。

#### Role Prompting

定义角色（如"你是一位资深 SRE 工程师"），让模型以该角色的视角响应。

---

## 5. Agent SDK 对比

### 5.1 Claude Agent SDK

**核心概念**：Tools、Memory、Conversation

**优势**：
- 与 Claude 模型深度集成
- 支持复杂多步骤 agent
- 内置 streaming 和 async 支持

**适用场景**：需要 Claude 特有能力的 agent 应用

**官方文档**：https://claude.com/blog/building-agents-with-the-claude-agent-sdk

### 5.2 OpenAI Agents Python SDK

**核心概念**：Handoffs、Guardrails、Persistence

**优势**：
- 多 agent 协作（Handoff 模式）
- Guardrails 输入输出安全过滤
- Conversation persistence 内置
- 需 Python 3.10+

**适用场景**：复杂多 agent 系统，需要输入安全过滤

**官方文档**：https://github.com/openai/openai-agents-python

### 5.3 其他框架

| 框架 | 特点 | 适用场景 |
|---|---|---|
| LangChain | 生态最全面 | 快速原型 |
| LangGraph | 图结构编排 | 复杂工作流 |
| LlamaIndex | 知识检索增强 | RAG 应用 |
| AutoGen | 多 agent 协作 | 复杂多角色场景 |

---

## 6. Agent 评估方法

### 6.1 SWE-Bench Pro

**来源**：[Scale AI - Agentic Rubrics](https://labs.scale.com/blog/agentic-rubrics)

SWE-Bench Pro 是评估 coding agent 能力的基准测试，核心评估维度：
- **准确性**：agent 的解决方案是否正确
- **效率**：消耗多少 token 和时间
- **鲁棒性**：对边缘 case 的处理能力

### 6.2 评估设计原则

1. **定义清晰的成功标准**：可量化的指标
2. **构建评估集**：代表性的 test cases
3. **自动化 + 人工结合**：自动跑 case，人工评估质量
4. **追踪关键指标**：准确率、召回率、token 消耗、延迟

### 6.3 常见坑

- 评估标准与实际用户体验存在 gap
- 自动化评估难以覆盖所有边缘 case
- 游戏/前端等视觉类任务需要人工判断

---

## 7. 相关资源

- [Claude Prompt Engineering 官方文档](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Anthropic Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Simon Willison - Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)
- [Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)
- [OpenAI Agents Python SDK](https://github.com/openai/openai-agents-python)
- [Model Context Protocol](https://modelcontextprotocol.io/)
