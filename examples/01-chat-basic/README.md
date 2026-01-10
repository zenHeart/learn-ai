# Example 01: Basic Streaming Chat

A minimal implementation of a streaming chatbot using Next.js App Router and Vercel AI SDK.

## Features

- ⚡️ Real-time streaming (Server-Sent Events)
- 🎨 Optimistic UI updates
- 💬 Chat history state management
- 🌑 Markdown rendering support

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Copy `.env.example` to `.env.local` and add your OpenAI Key:
    ```
    OPENAI_API_KEY=sk-...
    ```

3.  Run the server:
    ```bash
    npm run dev
    ```

## Code Highlights

### API Route (`app/api/chat/route.ts`)
```typescript
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

### Client Component (`app/page.tsx`)
```tsx
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // ... render logic
}
```
