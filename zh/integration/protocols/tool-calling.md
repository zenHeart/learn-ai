# 工具调用 (Tool Calling)

**工具调用 (Tool Calling)**（也称为函数调用）是将 LLM 从文本生成器转变为可以采取行动的智能体的机制。

## 概念

LLM 无法运行代码。它们只能输出文本。
工具调用的工作原理如下：

1.  **你**: "你可以使用这些函数: `get_weather(city)`。"
2.  **用户**: "东京的天气怎么样？"
3.  **LLM**: *生成结构化的 JSON 请求*: `{"name": "get_weather", "arguments": {"city": "Tokyo"}}`
4.  **你**: *在你的代码中运行该函数*。
5.  **你**: *将结果发送回 LLM*: "25°C, Sunny"。
6.  **LLM**: "东京的天气是 25°C 且晴朗。"

## Schema 设计最佳实践

最关键的部分是清晰地描述你的工具。

### 1. 描述性的名称和描述
不要使用 `func1`。使用 `search_knowledge_base`。
描述充当工具的“提示词”。

**坏**:
```json
{ "name": "data", "description": "获取数据" }
```

**好**:
```json
{
  "name": "search_orders",
  "description": "按 ID 或状态搜索客户订单数据库。当用户询问订单历史记录时使用此工具。"
}
```

### 2. 使用枚举进行严格控制
如果参数有一组固定的选项，请强制执行。

```json
"status": {
  "type": "string",
  "enum": ["pending", "shipped", "delivered"],
  "description": "按当前状态过滤订单"
}
```

## 错误处理

当你的工具失败时（例如 API 宕机、ID 无效），**不要崩溃**。将错误作为文本返回给 LLM。LLM 通常可以自行纠正或向用户解释错误。

```javascript
try {
  const result = await fetchOrder(id);
  return JSON.stringify(result);
} catch (error) {
  // ✅ 将错误返回给 LLM
  return JSON.stringify({ error: `Could not find order ${id}. Please ask the user to verify the ID.` });
}
```

## 多工具编排

你可以给 LLM 提供几十个工具。它将决定调用哪一个（或哪些）。

### 顺序调用
"查找用户的电子邮件，然后发送报告。"
1. 调用 `get_user_email(name)` -> 返回 `alice@example.com`
2. 调用 `send_email(to, body)`

### 并行调用
"纽约和伦敦的天气怎么样？"
GPT-4o 可以一次调用两个函数：
```json
[
  { "name": "get_weather", "args": { "city": "NY" } },
  { "name": "get_weather", "args": { "city": "London" } }
]
```

## Vercel AI SDK 示例

SDK 为你处理循环。

```typescript
import { streamText } from 'ai';
import { z } from 'zod';

const result = await streamText({
  model: openai('gpt-4o'),
  tools: {
    getWeather: {
      description: 'Get the weather',
      parameters: z.object({ city: z.string() }),
      execute: async ({ city }) => {
        return { temperature: 22, condition: 'Sunny' };
      },
    },
  },
  prompt: 'What is the weather in Paris?',
});
```

## 下一步

- 在 **[生成式 UI](../../tech/frontend/generative-ui.md)** 指南中实现它。