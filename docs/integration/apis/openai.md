# OpenAI API Integration

The **OpenAI API** is the industry standard for Generative AI. It powers GPT-4o, DALL-E 3, and Whisper.

## Setup

First, install the official Node.js library:

```bash
npm install openai
```

Get your API key from the [OpenAI Dashboard](https://platform.openai.com/api-keys).

## Basic Usage (Chat Completion)

The core primitive is "Chat Completion". You send a list of messages, and the model completes the conversation.

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
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

## Streaming Responses

For a better user experience, stream the response so it appears chunk by chunk (like ChatGPT).

```typescript
async function streamChat() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Write a haiku about recursion' }],
    stream: true, // Enable streaming
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}
```

## Function Calling (Tool Use)

GPT-4o is excellent at deciding when to call functions. This allows you to connect the AI to your own code/data.

### 1. Define the Tool
Describe the function to the model using JSON Schema.

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

### 2. Call the Model with Tools

```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: messages,
  tools: tools,
  tool_choice: "auto", // Let the model decide
});
```

### 3. Handle the Tool Call

```typescript
const toolCall = response.choices[0].message.tool_calls?.[0];

if (toolCall) {
  const args = JSON.parse(toolCall.function.arguments);
  console.log(`Function to call: ${toolCall.function.name}`);
  console.log(`Arguments:`, args);
  
  // Execute your actual code here...
  // const weatherData = fetchWeather(args.location);
}
```

## Error Handling

Wrap API calls in `try/catch` blocks to handle common issues.

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
    // Non-API error
    console.log(error);
  }
}
```

## Rate Limits & Best Practices

1.  **Use `gpt-4o-mini` for simple tasks**: It's significantly faster and cheaper.
2.  **Set a `max_tokens` limit**: Prevent the model from rambling and spending your budget.
3.  **Handle 429 Errors**: Implement exponential backoff (wait 1s, 2s, 4s) if you hit rate limits.
4.  **Secure your Key**: Never use the API key in client-side code (React/Vue). Always call OpenAI from your backend (Node.js/Next.js API Routes).

## JSON Mode

If you need guaranteed JSON output, use `response_format`.

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

## Next Steps

- Learn about **[Anthropic API](./anthropic.md)** for a strong alternative.
- Build a **[Chatbot](../../projects/beginner/ai-chatbot.md)** using these concepts.