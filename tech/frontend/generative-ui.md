# Generative UI (GenUI)

**Generative UI** is the next evolution of Chatbots. Instead of just replying with text, the AI replies with **Interactive UI Components**.

## The Problem with Text
- User: "Show me the weather."
- Text AI: "It is 20 degrees and sunny." (Boring, hard to read quickly)
- GenUI AI: *Renders a Weather Card with icons and a slider.*

## How it Works

1.  **Tool Definition**: You tell the AI "I have a `WeatherCard` component that takes `city` and `temp`."
2.  **Tool Call**: The AI decides to use that tool.
3.  **Server Action**: The server executes the logic and returns a **React Component** (via React Server Components) instead of just JSON.
4.  **Client Render**: The client displays the component in the chat stream.

## Vercel AI SDK (RSC) Implementation

This requires Next.js App Router and Server Actions.

```tsx
// actions.tsx
'use server';

import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { WeatherCard } from './components/weather-card';
import { StockChart } from './components/stock-chart';

export async function submitUserMessage(input: string) {
  'use server';

  const uiStream = await streamUI({
    model: openai('gpt-4o'),
    prompt: input,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      get_weather: {
        description: 'Get weather for a location',
        parameters: z.object({ city: z.string() }),
        generate: async function* ({ city }) {
          yield <div>Loading weather for {city}...</div>;
          const data = await fetchWeather(city);
          return <WeatherCard data={data} />;
        },
      },
      get_stock: {
        description: 'Get stock price',
        parameters: z.object({ symbol: z.string() }),
        generate: async ({ symbol }) => {
          const data = await fetchStock(symbol);
          return <StockChart data={data} />;
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: uiStream.value,
  };
}
```

## Client-Side Implementation

The client simply renders the `display` node returned by the server.

```tsx
// page.tsx
'use client';
import { useActions, useUIState } from 'ai/rsc';

export default function Chat() {
  const { submitUserMessage } = useActions();
  const [messages, setMessages] = useUIState();

  const handleSubmit = async (input) => {
    const response = await submitUserMessage(input);
    setMessages(current => [...current, response]);
  };

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          {msg.display} {/* Renders text OR components */}
        </div>
      ))}
    </div>
  );
}
```

## Best Practices

1.  **Loading States**: Use generators (`yield`) to show a skeleton immediately while data fetches.
2.  **Component Design**: Components should be self-contained and look good inside a chat bubble.
3.  **Fallback**: Always provide a text fallback description for accessibility.

## Next Steps

- Explore **[State Management](./state-management.md)** to handle data flow between these components.
