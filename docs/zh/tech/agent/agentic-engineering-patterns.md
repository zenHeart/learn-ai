# Agentic Engineering Patterns（Simon Willison）

> 来源：Simon Willison 的 [Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/) 系列指南

## 什么是 Agentic Engineering

用 LLMs + 系统化提示词 + 工具集成来解决问题的工程实践。

关键认识：**AI 工具让写代码变得几乎免费，但交付好代码仍然很贵。**

---

## 原则

### 1. 代码现在很便宜，但好代码仍然有成本

写新代码的成本急剧下降——但交付"好代码"仍然贵得多。

好代码的定义：
- 代码能正常工作
- 我们知道代码能工作（有测试验证）
- 解决了正确的问题
- 处理错误情况，不只是 Happy Path
- 简洁最小，只做需要的事
- 有测试保护
- 有适当的文档且反映当前状态
- 设计有利于未来变更

Coding Agent 能帮助实现大部分，但开发者仍要负责确保产出是好代码。

### 2. 建立新习惯

每次本能反应说"不值得做这个"时，用异步 Agent session 试试——最坏情况是十分钟后发现确实不值得。

### 3. 积累你知道怎么做的事

软件开发的关键技能之一是知道什么可能、什么不可能，以及怎么做。

最佳实践是**积累解决方案的运行示例**，而不是只知道理论上的可能性。

积累方式：
- 博客、TIL 文章
- GitHub 仓库（大量小 PoC）
- HTML tools（单文件页面解决特定问题）
- Research repo（用 Agent 研究问题并产出工作代码+报告）

**关键**：Coding Agent 让这个积累习惯更有价值——如果一个技巧被记录在带工作代码示例的地方，Agent 可以查阅并在未来类似项目中复用。

### 4. 从 Hoard 中重组

最喜欢的提示模式之一：让 Agent 通过组合两个或多个现有工作示例来构建新东西。

---

## Coding Agent 工作原理

### 核心组成

```
Coding Agent = LLM + System Prompt + Tools（循环）
```

### LLM 的本质

LLM 是**token 补全机器**。输入文本（转为整数 token），输出下一个 token。

Token 很重要：因为 LLM 提供商按 token 收费，且上下文窗口有 token 数量限制。

### Chat 模板

LLM 是无状态的，每次执行 prompt 都是从零开始。Chat 只是通过在每次用户输入时**回放整个对话历史**来模拟对话。

这意味着：对话越长，每次输入 prompt 的成本越高。

### Token 缓存

大多数提供商对缓存的 token 有折扣。Coding Agent 尽量避免修改早期对话内容，以保证缓存被高效利用。

### 调用工具

工具是 Agent Harness 暴露给 LLM 的函数。机制：

```
System: 如果需要天气，结束本轮时输出 <tool>get_weather(city_name)</tool>
User: 旧金山的天气如何？
Assistant: <tool>get_weather("San Francisco")</tool>

→ Harness 执行工具，返回结果

User: <tool-result>61°, 多云</tool-result>
Assistant: [根据结果回答]
```

大多数 Coding Agent 定义十多个工具。最强大的是代码执行工具：`Bash()` 或 `Python()`。

### 推理（Reasoning）

2025 年的大进步：推理能力被引入前沿模型。模型在回答前先生成"思考"文本，花更多时间和 token 来解决问题。

推理对调试特别有用：让模型有机会追踪复杂代码路径，混合工具调用并用推理阶段追溯问题根源。

### System Prompt

System Prompt 告诉模型它应该如何行为，可以有几百行。比如 [OpenAI Codex 的 System Prompt](https://github.com/openai/codex/blob/rust-v0.114.0/codex-rs/core/templates/model_instructions/gpt-5.2-codex_instructions_template.md)。

---

## 使用 Git

### 核心原则

- **每次改一行**：小提交更容易追溯和理解
- **commit message 描述意图**：不只是描述改了什么，还要说为什么
- **atom commit**：把相关的变更放一起

### Agent 友好的 commit

Agent 适合用结构化的 commit message：
```
<type>: <short description>

<body with details>
```

Agent 能生成高质量 commit message，前提是给清楚的结构指引。

---

## Subagents

### 为什么需要 Subagent

LLM 受上下文限制（通常 100k-1M tokens，实际最佳效果在 200k 以下）。Subagent 提供了一种处理更大任务的方式，避免消耗主 Agent 宝贵的上下文。

当 Coding Agent 使用 Subagent 时，它有效地派遣自己的一个新副本带着全新的上下文窗口去完成指定目标。

### 三种 Subagent 类型

| 类型 | 用途 |
|------|------|
| **Explore Subagent** | 主 Agent 暂停，Subagent 探索代码库后返回发现 |
| **Parallel Subagent** | 主 Agent 同时运行多个 Subagent（可选择更小更快的模型） |
| **Specialist Subagent** | 定制 System Prompt 或工具，比如 Code Reviewer、Test Runner、Debugger |

### Specialist 例子

- **Code Reviewer**：专门审查代码找 bug 和设计问题
- **Test Runner**：隐藏完整测试输出，只报告失败详情
- **Debugger**：专门调试，用 token 推理代码库并运行代码片断来隔离问题

### 注意事项

Subagent 不需要滥用。最有价值的地方是保留主上下文并管理 token 密集操作。Root Agent 完全有能力调试或审查自己的输出——前提是有足够 token。

---

## 测试与 QA

### 红绿 TDD

"使用红/绿 TDD" 是一个简洁有效的获得更好 Agent 结果的方法。

**Red/Green TDD**：
- **Red**：先写测试，确认测试失败
- **Green**：实现代码让测试通过

这对 Agent 特别有价值：测试先行的开发方式防止 Agent 写出不工作或不必要的代码，同时建立回归测试套件保护未来变更。

### Agentic 手动测试

Coding Agent 可以做自动化测试，但无法取代真实的手动测试。用 Agent 做手动测试：

1. 让 Agent 写测试脚本
2. 让 Agent 做探索性测试
3. 让 Agent 捕获截图和日志

---

## 理解代码

### Linear Walkthroughs

让 Agent 一行一行遍历代码，在每个关键决策点停下来解释。

工具如 [Showboat](https://github.com/simonw/showboat) 可以让 Agent 在代码中导航时做笔记。

### Interactive Explanations

用对话方式理解代码，让 Agent 回答关于代码库的问题。

---

## Annotated Prompts

### 渐进式改进

好的做法是：
1. 先用简单提示启动 Agent
2. 看它怎么失败
3. 针对性改进提示
4. 重复

示例：GIF 优化工具的提示迭代过程，展示了如何通过后续提示逐步改进。

---

## 总结

Agentic Engineering 的关键在于：
1. **接受代码便宜、好代码贵**的现实
2. **积累可复用的工作示例**
3. **理解 Agent 机制**（LLM + System Prompt + Tools 循环）
4. **善用 Subagent** 保持上下文干净
5. **红/绿 TDD** 保护代码质量
6. **持续迭代提示** 而非一次性完美
