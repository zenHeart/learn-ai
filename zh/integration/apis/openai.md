# OpenAI API 集成

**OpenAI API** 是生成式 AI 的行业标准。它驱动着 GPT-4o、DALL-E 3 和 Whisper。

## 设置

首先，安装官方 Node.js 库：

```bash
npm install openai
```

从 [OpenAI Dashboard](https://platform.openai.com/api-keys) 获取你的 API Key。

## 基础用法 (聊天补全)

核心原语是“聊天补全 (Chat Completion)”。你发送一系列消息，模型补全对话。

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 这是默认值，可以省略
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-4o',
  });

  console.log(completion.choices[0].message.content);
}

main();
```

## 流式响应

为了获得更好的用户体验，流式传输响应，使其像 ChatGPT 一样逐块显示。

```typescript
async function streamChat() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Write a haiku about recursion' }],
    stream: true, // 启用流式传输
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}
```

## 函数调用 (工具使用)

GPT-4o 非常擅长决定何时调用函数。这允许你将 AI 连接到你自己的代码/数据。

### 1. 定义工具
使用 JSON Schema 向模型描述函数。

```typescript
const tools = [
  {
    type: "function",
    function: {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
        required: ["location"],
      },
    },
  },
];
```

### 2. 带工具调用模型

```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: messages,
  tools: tools,
  tool_choice: "auto", // 让模型决定
});
```

### 3. 处理工具调用

```typescript
const toolCall = response.choices[0].message.tool_calls?.[0];

if (toolCall) {
  const args = JSON.parse(toolCall.function.arguments);
  console.log(`Function to call: ${toolCall.function.name}`);
  console.log(`Arguments:`, args);
  
  // 在这里执行你的实际代码...
  // const weatherData = fetchWeather(args.location);
}
```

## 错误处理

将 API 调用包装在 `try/catch` 块中以处理常见问题。

```typescript
import { APIError } from 'openai';

try {
  const completion = await openai.chat.completions.create({ ... });
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    console.error(error.status);  // e.g. 401
    console.error(error.message); // e.g. The Model `gpt-4o` does not exist
    console.error(error.code);    // e.g. model_not_found
    console.error(error.type);    // e.g. invalid_request_error
  } else {
    // 非 API 错误
    console.log(error);
  }
}
```

## 速率限制与最佳实践

1.  **简单任务使用 `gpt-4o-mini`**: 它明显更快更便宜。
2.  **设置 `max_tokens` 限制**: 防止模型喋喋不休并消耗你的预算。
3.  **处理 429 错误**: 如果遇到速率限制，实施指数退避（等待 1s, 2s, 4s）。
4.  **保护你的 Key**: 永远不要在客户端代码 (React/Vue) 中使用 API Key。始终从后端 (Node.js/Next.js API Routes) 调用 OpenAI。

## JSON 模式

如果你需要保证 JSON 输出，使用 `response_format`。

```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant designed to output JSON." },
    { role: "user", content: "List 3 colors in JSON format" }
  ],
  response_format: { type: "json_object" },
});
```

## 下一步

- 了解 **[Anthropic API](./anthropic.md)** 作为强大的替代方案。
- 使用这些概念构建一个 **[聊天机器人](../../projects/beginner/ai-chatbot.md)**。
