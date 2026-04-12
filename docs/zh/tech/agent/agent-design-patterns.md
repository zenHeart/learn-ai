# Agent Design Patterns（Claude Code 实战）

> 来源：@trq212 (Thariq) 的 Twitter/X 长文 "Lessons from building and shipping an agent to 30k+ developers"，关于 Claude Code 的设计经验

## 核心洞察：像 Agent 一样观察

设计 Agent 工具的关键框架：**把模型想象成一个人。**

如果给一个人一道难题，它会需要什么工具？
- 纸笔是最少的，但受限于手动计算
- 计算器更好，但需要知道高级功能怎么用
- 最快最强的是电脑，但要会用它写代码执行

**工具要适配模型自身的能力。** 而了解模型能力的唯一方法是：仔细观察它的输出，多做实验，学会像 Agent 一样看问题。

---

## Pattern 1: 改进 Elicitation — AskUserQuestion 工具

### 问题背景

想让 Claude 更好地提问（elicitation）。虽然 Claude 可以直接用文本提问，但用户体验摩擦大，沟通带宽低。

### 迭代过程

**尝试 #1：给 ExitPlanTool 加参数**

在 ExitPlanTool 加一个 questions 数组参数。最容易实现，但让 Claude 困惑——同时问计划和关于计划的问题，用户回答可能和计划冲突。

**尝试 #2：改输出格式**

让 Claude 用稍微修改过的 Markdown 格式输出问题，比如带选项的列表。然后解析并格式化成 UI。

问题是：Claude 不保证格式。可能附加额外句子、遗漏选项或用不同格式。

**尝试 #3：AskUserQuestion 工具（成功）**

Claude 可以随时调用这个工具，在 Plan Mode 特别有效。触发时显示模态框展示问题，阻塞 Agent loop 直到用户回答。

优势：
- 结构化输出有保证
- 多个选项供用户选择
- 用户可以组合使用（在 Agent SDK 中调用或 Skill 中引用）
- Claude 愿意调用这个工具

**关键教训**：即使最好的工具设计，如果 Claude 不理解怎么调用它，也不起作用。

---

## Pattern 2: 随模型能力进化 — TodoWrite → Task 工具

### 问题背景

Claude Code 最初发布时发现模型需要一个 Todo 列表来保持跟踪。给了 TodoWrite 工具，但经常看到 Claude 忘记要做什么。

### 适应过程

早期：每 5 轮插入系统提醒，让 Claude 记得目标。

后来：随着模型改进，Claude 不仅不需要提醒，反而觉得 Todo 列表是限制。提醒反而让 Claude 认为必须遵守列表而不敢修改。

同时发现 Opus 4.5 的 Sub-agent 能力大幅提升，但 Sub-agent 如何在共享 Todo 上协调？

### 解决方案

用 **Task 工具**替换 TodoWrite：
- **Todo**：让模型保持跟踪
- **Task**：帮助 Agent 之间互相通信

Task 可以包含依赖关系、在 Sub-agent 间共享更新，模型可以修改和删除任务。

**关键教训**：随着模型能力提升，模型曾经需要的工具可能反过来限制它们。要不断重新审视之前的假设。这也就是为什么保持较小的模型集合（能力profile相似的）很有价值。

---

## Pattern 3: 设计搜索接口 — RAG → Grep → Progressive Disclosure

### 演进路径

**最初**：用 RAG 向量数据库给 Claude 提供上下文。RAG 快且强大，但需要索引和设置，在不同环境中脆弱。更重要的是：上下文是"给"Claude 的，而不是 Claude 自己"找到"的。

**转变**：既然 Claude 能 Web 搜索，为什么不能搜索代码库？给 Claude 一个 Grep 工具，让它自己搜索文件构建上下文。

**新模式**：随着 Claude 变智能，它越来越擅长用正确工具自己构建上下文。

### Progressive Disclosure（渐进式披露）

引入 Agent Skills 后，正式确立了渐进式披露的思想：允许 Agent 通过探索逐步发现相关上下文。

工作原理：
- Claude 可以读取 Skill 文件
- Skill 文件可以引用其他文件，模型递归读取
- 常见用法：给 Claude 添加更多搜索能力，比如如何使用 API 或查询数据库

**成果**：一年时间里，Claude 从基本不能构建自己的上下文，发展到能跨多层文件嵌套搜索找到精确需要的上下文。

渐进式披露现在已是向 Agent 添加新功能的常用技术——**不需要添加工具就能扩展功能**。

---

## Pattern 4: 用 Subagent 实现渐进式披露 — Claude Code Guide Agent

### 问题

Claude Code 有约 20 个工具，但我们不断问自己：这些工具都需要吗？添加新工具的门槛很高，因为每多一个工具，模型就要多考虑一个选项。

### 具体例子

发现 Claude 对 Claude Code 本身了解不够——问它怎么添加 MCP 或 slash 命令是什么，它答不上来。

### 解决方案演进

**方案 A**：把所有信息塞进 System Prompt → 但用户很少问这些，会造成 Context Rot，干扰 Claude Code 的主要工作：写代码。

**方案 B**：给 Claude 一个文档链接让它自己加载 → Claude 加载太多结果到上下文去找答案。

**最终方案**：构建 **Claude Code Guide Subagent**

- 当用户问关于 Claude Code 本身的问题时，Claude 被提示调用这个 Subagent
- Subagent 有详细的搜索指令，知道怎么搜文档以及返回什么

效果：Claude 仍然可能在某些自我设置问题上有困惑，但比以前好很多！

**关键**：在 Claude 的 Action Space 中添加了东西，而没有增加工具。

---

## 核心设计原则总结

| 原则 | 说明 |
|------|------|
| **工具适配模型能力** | 观察模型输出，了解它擅长什么，据此设计工具 |
| **不盲从前置决策** | 随模型改进重新评估旧假设，工具可能从需要变成限制 |
| **渐进式披露** | 不需要的上下文不要预加载，按需获取 |
| **小工具集** | 添加工具门槛高，优先考虑不需要新工具的方案 |
| **Subagent 按需调用** | 比内建 Subagent 机制更灵活 |
| **这既是艺术也是科学** | 没有硬性规则，取决于模型、目标和环境 |

---

## 关键语录

> "Designing the tools for your models is as much an art as it is a science. It depends heavily on the model you're using, the goal of the agent and the environment it's operating in."
>
> "Experiment often, read your outputs, try new things. **See like an agent.**"
