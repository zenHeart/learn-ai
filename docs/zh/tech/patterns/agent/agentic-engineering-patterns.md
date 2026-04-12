# Agentic Engineering Patterns

> 原文：[Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/) — Simon Willison

## 什么是 Agentic Engineering

**Agentic engineering**：在编码 Agent（如 Claude Code、OpenAI Codex、Gemini CLI）辅助下开发软件的技术。

### Agent 的定义

> Agents run tools in a loop to achieve a goal.

Agent 是软件，它调用 LLM，传入 Prompt 和工具定义，LLM 请求什么工具就执行什么工具，然后把结果反馈给 LLM。对于编码 Agent，那些工具包含**执行代码的能力**。

**代码执行是让 Agentic Engineering 成为可能的关键能力。** 没有直接运行代码的能力，LLM 输出的任何东西价值都有限。有了代码执行，Agent 才能开始迭代，直到产出能工作的软件。

## 核心概念

### LLM = 大语言模型

- 输入是 **Prompt**，输出是 **Completion/Response**
- 工作在 **Token** 层面（文本转为整数序列），按 Token 计费
- 多模态：可以接受图像作为输入，图像也会转为 Token 整数处理

### Chat 模板 Prompt

LLM 本质是无状态的，每次执行 Prompt 都是从空白 slate 开始。需要聊天软件自己维护状态，重放整个对话历史。

### Token 缓存

模型提供商对缓存的输入 Token 提供更便宜的费率。编码 Agent 设计时会避免修改早期对话内容，以最大化缓存效率。

### 工具调用

Agent 调用工具时，Prompt 里会包含工具定义，LLM 输出类似 `<tool>get_weather("San Francisco")</tool>` 的文本，Harness 用正则提取并执行工具。

编码 Agent 通常定义十几个工具，最强大的是允许代码执行的工具：Bash() 执行终端命令、Python() 运行 Python 代码。

### System Prompt

编码 Agent 在每次对话开始时都会注入 System Prompt，告诉模型如何行为。这些 Prompt 可能长达数百行。OpenAI Codex 的 System Prompt 是很好的参考例子。

### 推理（Reasoning）

2025 年的大突破：推理能力。模型在正式回复前，先生成"思考"文本来展开问题和解法。推理对调试特别有用，让模型有机会混合工具调用和函数追踪。

## 核心模式

### 1. Red/Green TDD

先写测试再写代码。Agent 可以自动化这个循环。

### 2. First Run the Tests

让 Agent 先运行测试，理解现有代码行为。

### 3. Agentic Manual Testing

Agent 做人工测试时，可以用浏览器自动化测试 Web UI，或者用 Showboat 做笔记。

### 4. Subagents

Claude Code 的 Explore 子 Agent、并行子 Agent、专家型子 Agent。

### 5. Linear Walkthroughs

线性通读代码，配合 Showboat 和 Present 使用。

### 6. Interactive Explanations

交互式解释，理解词云等可视化内容。

## 反模式（Anti-patterns）

### 不要做：Inflicting unreviewed code on collaborators

未经审查的代码会给协作者带来麻烦。Agentic engineering 应该产出经过验证的、达到生产标准的代码，而不仅仅是"能跑"的代码。

## 与 Vibe Coding 的区别

**Vibe coding**（Andrej Karpathy 2025年2月提出）：prompt LLM 写代码时"忘记代码的存在"。

Agentic engineering 不是 vibe coding。区别在于：
- Vibe coding：未经审查、原型质量的 LLM 生成代码
- Agentic engineering：需要验证和迭代，确保产出可靠

## 关键洞见

1. **写代码现在很便宜** — 难点在于搞清楚写什么代码
2. **需要建立新习惯** — 积累自己的"工具箱"并学会重组
3. **AI 应该帮助我们产出更好的代码** — 而不只是更多代码
4. **拥抱复合工程循环** — 不断迭代改进

## 对前端 AI 学习的启发

| 模式 | 前端场景 |
|---|---|
| Red/Green TDD | Vitest + Playwright E2E |
| Subagents | Cursor 多 Agent 协作 |
| Token 缓存优化 | 控制 Prompt 长度 |
| System Prompt 工程 | Cursor Rules 编写 |
| Reasoning 调优 | Claude Code 思考深度配置 |
