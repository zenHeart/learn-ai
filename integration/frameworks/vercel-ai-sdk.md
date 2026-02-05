# Vercel AI SDK Guide

The **Vercel AI SDK** is the standard library for building AI-powered user interfaces in React, Next.js, Vue, and Svelte. It abstracts away the complexity of stream parsing and state management.

## Core Concepts

The SDK is split into two parts:
1.  **AI SDK Core**: Server-side library for generating text/objects (`ai`).
2.  **AI SDK UI**: Client-side hooks for building interfaces (`ai/react`).

## 1. Server-Side: `streamText`

In your API route (Next.js App Router), use `streamText` to call an LLM and return a stream.

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

## 2. Client-Side: `useChat`

The `useChat` hook is the easiest way to build a ChatGPT-like interface.

```tsx
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}
```

### Key Features of `useChat`:
- **Automatic State Management**: Appends user message, then appends AI chunks as they arrive.
- **Optimistic UI**: Shows user message immediately.
- **Stream Parsing**: Handles the SSE connection automatically.

## 3. Client-Side: `useCompletion`

Use this for "Autocomplete" or "Generate Text" scenarios where you aren't in a chat loop.

```tsx
'use client';
import { useCompletion } from 'ai/react';

export default function SloganGenerator() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: '/api/generate-slogan',
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} placeholder="Enter your company name..." />
      </form>
      
      {completion && <div className="result">{completion}</div>}
    </div>
  );
}
```

## 4. Generative UI (RSC)

The AI SDK supports **React Server Components (RSC)** to stream UI components, not just text.

*Note: This requires the Next.js App Router.*

```tsx
// Server Action
export async function streamUI(input: string) {
  'use server';
  
  const result = await streamUI({
    model: openai('gpt-4o'),
    prompt: input,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getWeather: {
        parameters: z.object({ city: z.string() }),
        generate: async ({ city }) => <WeatherCard city={city} />,
      },
    },
  });

  return result.value;
}
```

## Best Practices

1.  **Error Handling**: Pass `onError` to `useChat` to show toasts when the API fails.
    ```tsx
    useChat({
      onError: (error) => toast.error(error.message)
    })
    ```
2.  **Initial Messages**: Pre-populate chat history from a database.
    ```tsx
    useChat({ initialMessages: dbMessages })
    ```
3.  **Body Data**: Send extra data (like User ID) to the server.
    ```tsx
    handleSubmit(e, { body: { userId: '123' } })
    ```

## Next Steps

- Build a **[Chatbot](../../projects/beginner/ai-chatbot.md)**.
- Learn about **[Tool Calling](../protocols/tool-calling.md)** with the SDK.
