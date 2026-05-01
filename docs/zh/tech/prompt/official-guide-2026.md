# 官方提示工程指南深度解读（2026.05）

> 基于 OpenAI GPT-5.5 和 Anthropic Claude 最新官方文档整理
> 来源：[Claude Prompting Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | [OpenAI Prompt Guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) | [Using GPT-5.5](https://developers.openai.com/api/docs/guides/latest-model)

---

## 核心观点：不是模型变笨了，是模型变聪明了

> "并不是模型变笨了，是它们终于聪明到，不再容忍人类懒" — 阿缭 AYi

**关键洞察**：OpenAI 和 Anthropic 同时发布了官方提示工程指南，且两个模型的进化方向**完全相反**：

| 模型 | 进化方向 | 核心特征 |
|------|---------|---------|
| **Claude Opus 4.7** | 越来越**字面** | 严格遵循指令，不会自动泛化 |
| **GPT-5.5** | 越来越**高效** | 直接追求结果，选择最优路径 |

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

### 1.6 输出格式控制

**默认风格**：简洁、直接、任务导向

**调整方法**：
- `text.verbosity = low`：更简洁
- `text.verbosity = medium`：默认
- 显式定义格式要求

**避免过度格式化**：
```
❌ 不要：频繁使用标题、加粗、列表
✅ 应该：段落为主，必要时才用格式
```

---

## 二、Anthropic Claude 提示工程最佳实践

### 2.1 Claude Opus 4.7 特性

#### 响应长度自动校准

Claude Opus 4.7 根据任务复杂度自动调整响应长度：
- 简单查询 → 简短回答
- 开放分析 → 详细回答

**控制方法**：
```markdown
Provide concise, focused responses. Skip non-essential context, 
and keep examples minimal.
```

#### 努力程度（Effort）校准

| 级别 | 适用场景 | 说明 |
|------|---------|------|
| **max** | 极复杂任务 | 可能过度思考 |
| **xhigh** | 编码和代理任务 | **推荐** |
| **high** | 智能敏感任务 | 平衡点 |
| **medium** | 成本敏感任务 | 省 token |
| **low** | 短任务、延迟敏感 | 可能欠思考 |

**关键变化**：Opus 4.7 严格遵守 effort 级别，低级别不会"超额完成"

**遇到浅推理时**：
```markdown
❌ 不要：写更多提示绕过
✅ 应该：提高 effort 到 high 或 xhigh
```

#### 工具使用触发

Opus 4.7 倾向于**少用工具多推理**（通常更好）。

**需要更多工具使用时**：
- 提高 effort 级别（high/xhigh）
- 显式指示何时使用工具

```markdown
If you find that the model is not using your web search tools, 
clearly describe why and how it should.
```

#### 更字面的指令跟随

> "Claude Opus 4.7 interprets prompts more literally and explicitly than Claude Opus 4.6"

**影响**：
- ✅ 精确、可预测
- ❌ 不会自动泛化指令

**需要泛化时**：
```markdown
Apply this formatting to every section, not just the first one.
```

#### 语气和写作风格

Opus 4.7 更**直接、主观**，比 4.6 更少验证性措辞和表情符号。

**需要更温暖时**：
```markdown
Use a warm, collaborative tone. Acknowledge the user's framing 
before answering.
```

#### 子代理生成控制

默认生成**更少子代理**。

**控制方法**：
```markdown
Do not spawn a subagent for work you can complete directly 
in a single response (e.g. refactoring a function you can already see).

Spawn multiple subagents in the same turn when fanning out 
across items or reading multiple files.
```

#### 设计和前端默认值

Opus 4.7 有固定的**house style**：
- 温暖奶油色背景（~#F4F1EA）
- 衬线字体（Georgia, Fraunces, Playfair）
- 赤土/琥珀色强调色

**打破默认**：
1. **指定具体替代方案**
2. **让模型先提议选项**

```markdown
Before building, propose 4 distinct visual directions 
tailored to this brief (each as: bg hex / accent hex / typeface — 
one-line rationale). Ask the user to pick one, then implement 
only that direction.
```

#### 代码审查工具

Opus 4.7 找 bug 能力**显著提升**（recall +11pp），但可能更严格遵循"只报告高严重性"的指令。

**推荐提示**：
```markdown
Report every issue you find, including ones you are uncertain about 
or consider low-severity. Do not filter for importance or confidence 
at this stage - a separate verification step will do that. Your goal 
here is coverage: it is better to surface a finding that later gets 
filtered out than to silently drop a real bug.
```

### 2.2 通用提示原则

#### 原则 1：清晰直接

> "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."

**黄金法则**：把 prompt 给一个没有背景的同事看，如果他们会困惑，Claude 也会。

**示例**：
```
❌ Create an analytics dashboard
✅ Create an analytics dashboard. Include as many relevant features 
   and interactions as possible. Go beyond the basics to create a 
   fully-featured implementation.
```

#### 原则 2：添加上下文

解释**为什么**要这样做，Claude 会更好地理解和泛化。

**示例**：
```
❌ NEVER use ellipses
✅ Your response will be read aloud by a text-to-speech engine, 
   so never use ellipses since the text-to-speech engine will not 
   know how to pronounce them.
```

#### 原则 3：有效使用示例

**示例要求**：
- **相关**：紧密镜像实际用例
- **多样**：覆盖边缘情况
- **结构化**：用 `<example>` 标签包裹

**数量**：3-5 个示例效果最佳

#### 原则 4：XML 标签结构化

XML 标签帮助 Claude 无歧义地解析复杂 prompt。

**最佳实践**：
```markdown
<instructions>
  [指令内容]
</instructions>

<context>
  [上下文内容]
</context>

<example>
  [示例内容]
</example>
```

**嵌套标签**：
```markdown
<documents>
  <document index="1">
    <source>file1.pdf</source>
    <content>...</content>
  </document>
  <document index="2">
    <source>file2.pdf</source>
    <content>...</content>
  </document>
</documents>
```

#### 原则 5：角色设定

在系统提示中设置角色，聚焦行为和语气。

```markdown
You are a helpful coding assistant specializing in Python.
```

### 2.3 长上下文处理

当处理 20k+ token 的文档时：

1. **长文档放在顶部**：查询放在最后（提高响应质量 30%）
2. **用 XML 结构化**：`<document>` 标签包裹每个文档
3. **引用原文**：让 Claude 先引用相关部分再回答

**示例**：
```markdown
<documents>
  <document index="1">
    <source>annual_report.pdf</source>
    <document_content>{{CONTENT}}</document_content>
  </document>
</documents>

Find quotes relevant to the topic. Place these in <quotes> tags. 
Then answer based on these quotes.
```

### 2.4 输出格式控制

**控制方法**：
1. **告诉 Claude 要做什么**（而非不要做什么）
2. **用 XML 格式指示器**
3. **匹配 prompt 风格与期望输出**

**避免过度列表**：
```markdown
<avoid_excessive_markdown>
Write in clear, flowing prose using complete paragraphs. 
Reserve markdown primarily for inline code and code blocks.
DO NOT use lists unless presenting truly discrete items.
</avoid_excessive_markdown>
```

### 2.5 工具使用

**显式指示**：
```
❌ Can you suggest some changes to improve this function?
✅ Change this function to improve its performance.
```

**默认行为控制**：
```markdown
<default_to_action>
By default, implement changes rather than only suggesting them.
</default_to_action>
```

### 2.6 思维链控制

**减少思考**：
```markdown
Thinking adds latency and should only be used when it will 
meaningfully improve answer quality — typically for problems 
that require multi-step reasoning. When in doubt, respond directly.
```

**增加思考**：
```markdown
This task involves multi-step reasoning. Think carefully through 
the problem before responding.
```

---

## 三、两模型对比

### 3.1 进化方向对比

| 维度 | GPT-5.5 | Claude Opus 4.7 |
|------|---------|-----------------|
| **默认风格** | 高效、直接、任务导向 | 字面、严格遵循指令 |
| **prompt 长度** | 可以更短、更结果导向 | 可能需要更精确的指令 |
| **人格** | 需要显式定义 | 需要显式定义 |
| **工具使用** | 更精确的工具选择 | 需要明确的工具描述 |
| **推理能力** | 可调节（low→xhigh）| 可调节（low→max）|
| **指令跟随** | 结果优先 | 字面遵循 |
| **设计风格** | 无固定默认 | 有固定 house style |

### 3.2 努力程度对比

| GPT-5.5 | Claude Opus 4.7 |
|---------|-----------------|
| `reasoning.effort` | `effort` |
| low → medium → high → xhigh | low → medium → high → xhigh → max |
| 默认 medium | 无默认，需显式设置 |

### 3.3 选择建议

| 场景 | 推荐 |
|------|------|
| 复杂编码、工具密集型 | GPT-5.5 |
| 需要严格遵循指令 | Claude |
| 面向用户的产品 | 两者都需要人格定义 |
| 长上下文检索 | GPT-5.5 |
| 代码审查 | Claude Opus 4.7 |
| 设计密集型 | Claude（但需打破默认）|

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

**GPT-5.5**：
- [ ] 状态期望结果和成功标准
- [ ] 减少或删除详细的步骤指导
- [ ] 从 prompt 中移除输出 schema 定义
- [ ] 优化缓存：静态内容在前，动态内容在后
- [ ] 删除当前日期（模型已知道）
- [ ] 添加明确的停止条件
- [ ] 定义缺失证据时的行为

**Claude Opus 4.7**：
- [ ] 设置合适的 effort 级别
- [ ] 显式指示工具使用时机
- [ ] 用 XML 标签结构化 prompt
- [ ] 提供 3-5 个示例
- [ ] 长文档放在顶部，查询放在最后
- [ ] 让模型先引用再回答
- [ ] 显式定义输出格式

### 4.3 性能调优

**GPT-5.5 参数**：

| 参数 | 建议 |
|------|------|
| `reasoning.effort` | medium（默认）→ low（延迟敏感）→ high（复杂任务）|
| `text.verbosity` | medium（默认）→ low（简洁响应）|

**Claude Opus 4.7 参数**：

| 参数 | 建议 |
|------|------|
| `effort` | high（默认）→ xhigh（编码/代理）→ low（短任务）|
| `max_tokens` | 64k+（复杂任务）|

**注意**：更高的推理努力不一定更好，可能导致过度思考。

---

## 五、关键引用

### OpenAI

> "GPT-5.5 works best when prompts define the outcome and leave room for the model to choose an efficient solution path."

> "After each result, ask: 'Can I answer the user's core request now with useful evidence?' If yes, answer."

> "Higher reasoning effort isn't automatically better."

### Anthropic

> "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."

> "Claude Opus 4.7 interprets prompts more literally and explicitly than Claude Opus 4.6"

> "Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too."

---

## 六、学习资源

### OpenAI 官方文档
- [GPT-5.5 Prompting Guide](https://developers.openai.com/api/docs/guides/prompt-guidance) - 结果优先原则、停止条件、人格定义
- [Using GPT-5.5](https://developers.openai.com/api/docs/guides/latest-model) - 模型特性、API 参数、迁移指南
- [OpenAI Skills Repository](https://github.com/openai/skills) - 自动化迁移工具

### Anthropic 官方文档
- [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) - 概览和前置条件
- [Prompting Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) - **最全面的参考**，覆盖所有技术
- [Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) - 9 章交互式教程
- [Google Sheets Tutorial](https://docs.google.com/spreadsheets/d/19jzLgRruG9kjUQNKtCg1ZjdD6l6weA6qRXG5zLIAhC8) - 轻量级电子表格版本

### 教程章节（Anthropic Interactive Tutorial）
1. 基本提示结构
2. 清晰直接
3. 角色分配
4. 分离数据和指令
5. 输出格式化 & 代替 Claude 说话
6. 逐步思考（Thinking Step by Step）
7. 使用示例
8. 避免幻觉
9. 构建复杂提示（行业用例）

---

*本文整理于 2026-05-01，基于 OpenAI 和 Anthropic 最新官方文档。*
