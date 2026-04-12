# Claude Prompt Engineering 最佳实践

> 学习来源: [Anthropic 官方文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices)

## 概述

Anthropic 官方 Prompt Engineering 指南，涵盖清晰表达、示例、XML 结构化、思维链和 Agent 系统。

## 核心原则

### 1. 清晰直接 (Be Clear and Direct)

Claude 响应清晰明确的指令。需要具体说明期望的输出格式。

**黄金法则：** 把你的 Prompt 给一个几乎没有任务背景的同事看，让他们按照执行。如果他们会困惑，Claude 也会。

```text
# 不推荐
Create an analytics dashboard

# 推荐
Create an analytics dashboard. Include as many relevant features and interactions as possible.
```

### 2. 提供上下文

提供上下文或动机可以帮助 Claude 更好地理解目标。

```text
# 不推荐
NEVER use ellipses

# 推荐
Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.
```

### 3. 高效使用示例

示例是引导 Claude 输出格式最可靠的方式之一。few-shot prompting 可以显著提高准确性和一致性。

示例要点：
- **相关性**：紧密反映实际用例
- **多样性**：覆盖边缘情况
- **结构化**：用 `<example>` 标签包裹

### 4. XML 标签结构化 Prompt

XML 标签帮助 Claude 无歧义地解析复杂 Prompt。

```xml
<instructions>
  按步骤分析文档
</instructions>
<context>
  相关背景信息
</context>
<input>
  需要处理的内容
</input>
```

### 5. 赋予角色

在系统 Prompt 中设置角色可以聚焦 Claude 的行为和语气。

```python
system="You are a helpful coding assistant specializing in Python."
```

## 长上下文提示

- **长文档放在前面**：放在 Query 和示例上方
- **用 XML 结构化文档内容**：每个文档用 `<document>` 标签
- **先引用后分析**：让 Claude 先引用相关段落，再执行任务

```xml
<documents>
  <document index="1">
    <source>report.pdf</source>
    <document_content>
      {{CONTENT}}
    </document_content>
  </document>
</documents>
```

## 输出控制

### 告诉 Claude 做什么，而不是不做什么

```text
# 不推荐
Do not use markdown in your response

# 推荐
Your response should be composed of smoothly flowing prose paragraphs.
```

### 匹配 Prompt 风格

Prompt 中的格式风格可能影响响应风格。减少 Prompt 中的 markdown 可以减少输出中的 markdown。

## 工具使用

### 明确指示行动

```text
# 不推荐 (Claude 只会建议)
Can you suggest some changes to improve this function?

# 推荐 (Claude 会执行)
Change this function to improve its performance.
```

### 并行工具调用优化

Claude 最新模型擅长并行工具执行。可以通过 Prompt 控制：

```text
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel.
```

## 思维链 (Thinking)

### 自适应思维 (Adaptive Thinking)

Claude Opus 4.6 和 Sonnet 4.6 使用自适应思维，动态决定何时思考。

```python
thinking={"type": "adaptive"}
```

### 引导思维行为

```text
After receiving tool results, carefully reflect on their quality and determine optimal next steps before proceeding.
```

### 避免过度思考

如果 Claude 思考过多，可以：
- 使用更 targeted 的指令
- 移除过度 prompt
- 降低 `effort` 设置

## Agent 系统

### 长时推理和状态追踪

Claude 擅长长时推理任务，可以用于复杂的多步骤工作流。

## 最佳实践总结

| 场景 | 最佳实践 |
|------|---------|
| 指令 | 清晰具体，避免歧义 |
| 上下文 | 提供动机和背景 |
| 示例 | 3-5 个相关多样的示例 |
| 格式 | 使用 XML 标签结构化 |
| 输出 | 告诉做什么，而非不做什么 |
| 工具 | 明确指示行动 |
| 思维 | 自适应思维，按需启用 |

## 参考

- [官方文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [GitHub Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)

## 更新日志

- 2026-04-12: 初始化文档
