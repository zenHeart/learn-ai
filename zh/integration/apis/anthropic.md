# Anthropic API 集成 (Claude)

Anthropic 的 **Claude 3.5 Sonnet** 被广泛认为是目前最适合编码和复杂推理的模型。

## 设置

安装官方 SDK：

```bash
npm install @anthropic-ai/sdk
```

从 [Anthropic Console](https://console.anthropic.com/) 获取你的 API Key。

## 基础用法

与 OpenAI 不同，Anthropic 的 API 需要设置 `max_tokens`，并且 `system` 提示词是一个顶级参数（不是 messages 数组的一部分）。

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: "You are a concise assistant.",
    messages: [
      { role: "user", content: "Explain quantum computing in one sentence." }
    ],
  });

  console.log(message.content[0].text);
}

main();
```

## 流式响应

Anthropic 提供了一个辅助方法 `.stream()`，简化了流的消费。

```typescript
const stream = await anthropic.messages.stream({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Write a short story.' }],
})
.on('text', (text) => {
  console.log(text);
});

const finalMessage = await stream.finalMessage();
console.log("Stream complete");
```

## 工具使用

Claude 的工具使用（函数调用）非常稳健。

```typescript
const msg = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  tools: [
    {
      name: "get_weather",
      description: "Get the current weather in a given location",
      input_schema: {
        type: "object",
        properties: {
          location: { type: "string" }
        },
        required: ["location"]
      }
    }
  ],
  messages: [{ role: "user", content: "What is the weather in London?" }],
});

if (msg.stop_reason === "tool_use") {
  const toolBlock = msg.content.find(block => block.type === "tool_use");
  console.log("Tool Name:", toolBlock.name);
  console.log("Inputs:", toolBlock.input);
}
```

## 与 OpenAI 的主要区别

| 特性 | OpenAI | Anthropic |
| :--- | :--- | :--- |
| **System Prompt** | 在 `messages` 数组内 | 顶级 `system` 参数 |
| **Max Tokens** | 可选 | **必填** |
| **Messages Role** | `system`, `user`, `assistant`, `tool` | `user`, `assistant` |
| **定价** | 输入/输出 tokens | 输入/输出 tokens |
| **上下文** | 128k | 200k |

## Claude 最佳实践

1.  **使用 XML 标签**: Claude 被训练为特别关注结构，如 prompt 中的 `<document>...</document>` 或 `<instructions>...</instructions>`。
2.  **"把话放进 Claude 嘴里"**: 你可以预填充助手的回复来引导输出。
    ```typescript
    messages: [
      { role: "user", content: "Write a JSON object." },
      { role: "assistant", content: "{" } // 强制 JSON 开始
    ]
    ```
3.  **Prompt 缓存**: Anthropic 支持缓存长前缀（如巨型文档），可节省高达 90% 的成本。

## 下一步

- 探索 **[Vercel AI SDK](../frameworks/vercel-ai-sdk.md)**，以便互换使用 Claude 和 OpenAI。
