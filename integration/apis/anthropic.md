# Anthropic API Integration (Claude)

Anthropic's **Claude 3.5 Sonnet** is widely considered the best model for coding and complex reasoning.

## Setup

Install the official SDK:

```bash
npm install @anthropic-ai/sdk
```

Get your API key from the [Anthropic Console](https://console.anthropic.com/).

## Basic Usage

Unlike OpenAI, Anthropic's API requires `max_tokens` to be set, and the `system` prompt is a top-level parameter (not part of the messages array).

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

## Streaming Responses

Anthropic provides a helper method `.stream()` that simplifies consuming streams.

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

## Tool Use

Claude's tool use (function calling) is very robust.

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

## Key Differences vs OpenAI

| Feature | OpenAI | Anthropic |
| :--- | :--- | :--- |
| **System Prompt** | Inside `messages` array | Top-level `system` param |
| **Max Tokens** | Optional | **Required** |
| **Messages Role** | `system`, `user`, `assistant`, `tool` | `user`, `assistant` |
| **Pricing** | Input/Output tokens | Input/Output tokens |
| **Context** | 128k | 200k |

## Best Practices for Claude

1.  **Use XML Tags**: Claude is trained to pay special attention to structure like `<document>...</document>` or `<instructions>...</instructions>` within prompts.
2.  **"Put words in Claude's mouth"**: You can pre-fill the assistant's response to guide the output.
    ```typescript
    messages: [
      { role: "user", content: "Write a JSON object." },
      { role: "assistant", content: "{" } // Forces JSON start
    ]
    ```
3.  **Prompt Caching**: Anthropic supports caching long prefixes (like huge docs) to save up to 90% on costs.

## Next Steps

- Explore the **[Vercel AI SDK](../frameworks/vercel-ai-sdk.md)** to use Claude and OpenAI interchangeably.