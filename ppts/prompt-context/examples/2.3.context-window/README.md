# Context Window 与 Token 计算

## 什么是 Context Window

Context Window（上下文窗口）是指 LLM 一次性能够处理的最大 token 数量。超过这个限制的内容会被截断或无法正确理解。

## Token 计算规则

不同语言和内容类型的 token 消耗不同：

| 类型 | 示例 | Token 估算 |
|------|------|------------|
| 中文汉字 | 你好世界 | 每个字 ≈ 2 tokens |
| 英文单词 | hello world | 每个词 ≈ 1.3 tokens |
| 代码 | `function(){}` | 通常比英文更密集 |
| 数字 | 12345 | 每个数字 ≈ 1 token |

## 实际计算示例

假设我们有一份混合文档：

```
Claude 是一款强大的 AI 助手。
It can help with writing, coding, and analysis.
Our team met on April 15th to discuss the project roadmap.
会议将于 5 月 20 日在北京举行。
```

### Token 计算

- 中文字符：32 个 × 2 = 64 tokens
- 英文字符（单词）：21 个 × 1.3 ≈ 27 tokens
- 数字和标点：约 15 tokens
- **总计约 106 tokens**

## 成本计算示例

以 Claude Sonnet 4.5 为例：
- 输入成本：**$3 / 1M tokens**
- 输出成本：**$15 / 1M tokens**

```
输入成本 = 106 tokens ÷ 1,000,000 × $3 = $0.000318
```

### 不同文档规模的成本估算

| 文档类型 | Token 数 | 输入成本 | 输出成本（估算） |
|----------|----------|----------|------------------|
| 短邮件 | ~500 | $0.0015 | $0.0075 |
| 技术文档 | ~5,000 | $0.015 | $0.075 |
| 长报告 | ~50,000 | $0.15 | $0.75 |
| 全书 | ~500,000 | $1.50 | $7.50 |

## 运行示例

```bash
node main.js
```

查看 `main.js` 获取完整的 token 计算和成本估算代码。
