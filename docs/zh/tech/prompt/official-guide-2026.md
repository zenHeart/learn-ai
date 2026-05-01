# 官方提示工程指南深度解读（2026.05）

> 基于 OpenAI GPT-5.5 和 Anthropic Claude 最新官方文档整理
> 来源：[Claude Prompting Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | [OpenAI Prompt Guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) | [Using GPT-5.5](https://developers.openai.com/api/docs/guides/latest-model)

---

## 核心观点：不是模型变笨了，是模型变聪明了

> "并不是模型变笨了，是它们终于聪明到，不再容忍人类懒" — 阿缭 AYi

**关键洞察**：OpenAI 和 Anthropic 同时发布了官方提示工程指南，且两个模型的进化方向**完全相反**：

| 模型 | 进化方向 |
|------|---------|
| **Claude Opus 4.7** | 越来越**字面**，严格遵循指令 |
| **GPT-5.5** | 越来越**高效**，直接追求结果 |

---

## 一、OpenAI GPT-5.5 提示指南精华

### 1.1 核心原则：Outcome-First（结果优先）

> "GPT-5.5 works best when prompts define the outcome and leave room for the model to choose an efficient solution path."

**旧思维 vs 新思维**：

| 旧思维（GPT-4 时代） | 新思维（GPT-5.5 时代） |
|---------------------|---------------------|
| 详细规定每一步 | 描述期望结果 |
| 过度指定流程 | 让模型选择路径 |
| 用 ALWAYS/NEVER 控制 | 用决策规则引导 |
| 长而复杂的 prompt | 短而精确的 prompt |

**示例对比**：

```
❌ 旧风格（过度指定）：
First inspect A, then inspect B, then compare every field, 
then think through all possible exceptions, then decide which 
tool to call, then call the tool, then explain the entire process.

✅ 新风格（结果优先）：
Resolve the customer's issue end to end.
Success means:
- the eligibility decision is made from the available policy and account data
- any allowed action is completed before responding
- the final answer includes completed_actions, customer_message, and blockers
```

### 1.2 停止条件（Stopping Conditions）

> "After each result, ask: 'Can I answer the user's core request now with useful evidence?' If yes, answer."

**关键规则**：
```markdown
在每次工具调用后问自己：
1. 我现在能回答用户的核心问题吗？
2. 有足够的证据支持吗？
3. 如果有，立即回答，不要再搜索
```

**检索预算（Retrieval Budget）**：

只有在以下情况才再次搜索：
- 顶部结果没有回答核心问题
- 缺少必要事实（参数、负责人、日期、ID、来源）
- 用户要求穷尽覆盖、对比或完整列表
- 必须读取特定文档/URL/邮件/记录

**不要**再次搜索来：
- 改善措辞
- 添加示例
- 引用非必要细节

### 1.3 人格定义（Personality）

GPT-5.5 默认风格是**高效、直接、任务导向**。对于面向用户的产品，需要明确定义人格。

**两种人格模板**：

**稳重任务型**：
```markdown
# Personality
You are a capable collaborator: approachable, steady, and direct. 
Assume the user is competent and acting in good faith, and respond 
with patience, respect, and practical helpfulness.

Prefer making progress over stopping for clarification when the request 
is already clear enough to attempt.
```

**表达协作型**：
```markdown
# Personality
Adopt a vivid conversational presence: intelligent, curious, playful 
when appropriate, and attentive to the user's thinking.

Be warm, collaborative, and polished. Conversation should feel easy 
and alive, but not chatty for its own sake.
```

### 1.4 Prompt 结构模板

```markdown
Role: [1-2 句话定义模型功能、上下文和任务]

# Personality
[语气、风度、协作风格]

# Goal
[用户可见的结果]

# Success criteria
[最终答案前必须满足的条件]

# Constraints
[策略、安全、业务、证据和副作用限制]

# Output
[章节、长度、语气]

# Stop rules
[何时重试、降级、放弃、询问或停止]
```

### 1.5 避免的错误

| 错误 | 正确做法 |
|------|---------|
| 使用 ALWAYS/NEVER 细节控制 | 用决策规则替代 |
| 过度详细的过程指导 | 描述结果，让模型选择路径 |
| 在 prompt 中描述输出 schema | 用 Structured Outputs |
| 添加当前日期 | 模型已知道 UTC 日期 |
| 静态内容放后面 | 静态内容放前面（利于缓存） |

---

## 二、Anthropic Claude 提示工程概览

### 2.1 前置条件

在开始提示工程之前，必须建立：

1. **明确的成功标准** - 你的用例什么算成功
2. **可测试的评估方法** - 如何量化测试
3. **初版 prompt** - 你要改进的起点

### 2.2 何时需要提示工程

**不是所有问题都能用提示工程解决**：

| 可以用提示工程 | 应该用其他方法 |
|--------------|--------------|
| 输出质量 | 延迟 |
| 准确性 | 成本（可能换模型更有效） |
| 格式控制 | - |

### 2.3 Claude 特有技术

虽然概览页面没有详细展开，但 Claude 支持：

- **XML 标签** - 用 `<instructions>`、`<example>` 等结构化 prompt
- **Role Prompting** - 角色扮演
- **Thinking** - 让模型展示思考过程
- **Prompt Chaining** - 链式 prompt

---

## 三、两个模型的对比

### 3.1 进化方向对比

| 维度 | GPT-5.5 | Claude Opus 4.7 |
|------|---------|-----------------|
| **默认风格** | 高效、直接、任务导向 | 字面、严格遵循指令 |
| **prompt 长度** | 可以更短、更结果导向 | 可能需要更精确的指令 |
| **人格** | 需要显式定义 | 需要显式定义 |
| **工具使用** | 更精确的工具选择 | 需要明确的工具描述 |
| **推理能力** | 默认 medium，可调节 | 内置思考过程 |

### 3.2 选择建议

| 场景 | 推荐 |
|------|------|
| 复杂编码、工具密集型 | GPT-5.5 |
| 需要严格遵循指令 | Claude |
| 面向用户的产品 | 两者都需要人格定义 |
| 长上下文检索 | GPT-5.5 |

---

## 四、实践要点

### 4.1 迁移到新模型

> "Begin migration with a fresh baseline instead of carrying over every instruction from an older prompt stack."

**迁移步骤**：
1. 不要照搬旧 prompt
2. 从最小 prompt 开始
3. 逐步添加需要的约束
4. 用评估验证效果

### 4.2 优化清单

- [ ] 状态期望结果和成功标准
- [ ] 减少或删除详细的步骤指导
- [ ] 从 prompt 中移除输出 schema 定义
- [ ] 优化缓存：静态内容在前，动态内容在后
- [ ] 删除当前日期（模型已知道）
- [ ] 添加明确的停止条件
- [ ] 定义缺失证据时的行为

### 4.3 性能调优

**GPT-5.5 参数**：

| 参数 | 建议 |
|------|------|
| `reasoning.effort` | medium（默认）→ low（延迟敏感）→ high（复杂任务）|
| `text.verbosity` | medium（默认）→ low（简洁响应）|

**注意**：更高的推理努力不一定更好，可能导致过度思考或不必要的搜索。

---

## 五、关键引用

### OpenAI

> "GPT-5.5 works best when prompts define the outcome and leave room for the model to choose an efficient solution path."

> "After each result, ask: 'Can I answer the user's core request now with useful evidence?' If yes, answer."

> "Higher reasoning effort isn't automatically better."

### Anthropic

> "Not every success criteria or failing eval is best solved by prompt engineering."

---

## 六、学习资源

### OpenAI
- [GPT-5.5 Prompting Guide](https://developers.openai.com/api/docs/guides/prompt-guidance)
- [Using GPT-5.5](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI Skills Repository](https://github.com/openai/skills)

### Anthropic
- [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Prompting Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Interactive Tutorial (GitHub)](https://github.com/anthropics/prompt-eng-interactive-tutorial)

---

*本文整理于 2026-05-01，基于 OpenAI 和 Anthropic 最新官方文档。*
