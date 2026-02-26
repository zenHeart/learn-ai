# Tool Calling (Function Calling)

**Tool Calling** is the mechanism that turns LLMs from text generators into agents that can take action.

## The Concept

LLMs cannot run code. They can only output text.
Tool calling works like this:

1.  **You**: "Here are the functions you can use: `get_weather(city)`."
2.  **User**: "What's the weather in Tokyo?"
3.  **LLM**: *Generates a structured JSON request*: `{"name": "get_weather", "arguments": {"city": "Tokyo"}}`
4.  **You**: *Run the function in your code*.
5.  **You**: *Send the result back to the LLM*: "25°C, Sunny".
6.  **LLM**: "The weather in Tokyo is 25°C and sunny."

## Schema Design Best Practices

The most critical part is describing your tools clearly.

### 1. Descriptive Names and Descriptions
Don't use `func1`. Use `search_knowledge_base`.
The description acts as the "prompt" for the tool.

**Bad**:
```json
{ "name": "data", "description": "Gets data" }
```

**Good**:
```json
{
  "name": "search_orders",
  "description": "Searches the customer order database by ID or status. Use this when the user asks about order history."
}
```

### 2. Use Enums for Strict Control
If a parameter has a fixed set of options, enforce it.

```json
"status": {
  "type": "string",
  "enum": ["pending", "shipped", "delivered"],
  "description": "Filter orders by current status"
}
```

## Error Handling

When your tool fails (e.g., API down, invalid ID), **don't crash**. Return the error as text to the LLM. The LLM can often correct itself or explain the error to the user.

```javascript
try {
  const result = await fetchOrder(id);
  return JSON.stringify(result);
} catch (error) {
  // ✅ Return error to LLM
  return JSON.stringify({ error: `Could not find order ${id}. Please ask the user to verify the ID.` });
}
```

## Multi-Tool Orchestration

You can give an LLM dozens of tools. It will decide which one(s) to call.

### Sequential Calling
"Find the user's email, then send them a report."
1. Call `get_user_email(name)` -> returns `alice@example.com`
2. Call `send_email(to, body)`

### Parallel Calling
"What's the weather in NY and London?"
GPT-4o can call both functions at once:
```json
[
  { "name": "get_weather", "args": { "city": "NY" } },
  { "name": "get_weather", "args": { "city": "London" } }
]
```

## Vercel AI SDK Example

The SDK handles the loop for you.

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

## Next Steps

- Implement this in the **[Generative UI](../../tech/frontend/generative-ui.md)** guide.
