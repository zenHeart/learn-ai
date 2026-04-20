# Token Counting & Cost Optimization

> 来源: [Claude Token Counting 官方文档](https://platform.claude.com/docs/en/build-with-claude/token-counting)
> 学习日期: 2026-04-12

## 概述

Token Counting 让你在发送请求前预先计算 token 数量，帮助：
- 主动管理速率限制和成本
- 智能路由模型决策
- 优化 prompt 到特定长度

> 注意：Token 计数为**估算值**，实际用量可能略有差异。系统自动添加的 token 不计入账单。

---

## API 端点

```
POST https://api.anthropic.com/v1/messages/count_tokens
```

支持所有 active models。

---

## 基本用法

### Python

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.count_tokens(
    model="claude-opus-4-6",
    system="You are a scientist",
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
print(response.json())
# {"input_tokens": 14}
```

### TypeScript

```typescript
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();

const response = await client.messages.countTokens({
  model: "claude-opus-4-6",
  system: "You are a scientist",
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(response);
```

### CLI

```bash
ant messages count-tokens \
  --model claude-opus-4-6 \
  --system "You are a scientist" \
  --message '{role: user, content: "Hello, Claude"}'
```

---

## 工具调用场景

计算含 Tool Use 的 token 时，schema 定义也会消耗 token。

```python
response = client.messages.count_tokens(
    model="claude-opus-4-6",
    tools=[{
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "The city and state"}
            },
            "required": ["location"]
        }
    }],
    messages=[{"role": "user", "content": "What's the weather like in San Francisco?"}],
)
```

---

## 成本优化策略

### 1. 预先计算预算

```python
MAX_TOKENS = 100000  # $0.015/opus-4-6 per 1K tokens

def estimate_cost(prompt_tokens, model="claude-opus-4-6"):
    RATES = {
        "claude-opus-4-6": {"input": 0.015, "output": 0.075},
        "claude-sonnet-4-6": {"input": 0.003, "output": 0.015},
    }
    # ... calculate
```

### 2. 智能路由

| 短 prompt (< 4K tokens) | 长 prompt (> 4K tokens) |
|--------------------------|--------------------------|
| Claude Sonnet (便宜 5x) | Claude Opus (更强能力) |

### 3. Prompt 压缩

- 移除冗余示例
- 使用系统 prompt 复用通用指令
- 截断历史消息（保留最近 N 轮）

---

## 与现有文档的关系

- [Cost Optimization](../tech/engineering/cost-optimization.md) - 成本优化进阶指南
- [Local Embedding](./local-embedding.md) - 本地 embedding 减少 API 成本
