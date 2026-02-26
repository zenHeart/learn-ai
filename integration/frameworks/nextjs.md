# Next.js Integration Patterns

Next.js is the most popular framework for building AI applications due to its strong support for **streaming**, **Edge functions**, and **Server Actions**.

## Pattern 1: Route Handlers (Standard)

The most common pattern is creating an API endpoint that streams the response.

```typescript
// app/api/chat/route.ts
export const runtime = 'edge'; // Use Edge for lower latency

export async function POST(req: Request) {
  // ... verify auth ...
  // ... call LLM ...
  // ... return stream ...
}
```

**Pros**:
- Works with any client (React, Vue, mobile apps).
- Standard REST API.

## Pattern 2: Server Actions

Call AI directly from your UI components without manually `fetch`-ing.

```tsx
// app/actions.ts
'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';

export async function generateDescription(topic: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o'),
      prompt: `Describe ${topic}`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
```

**Pros**:
- Type safety.
- No need to manage API routes.

## Pattern 3: Generative UI (RSC)

Stream React components from the server.

*See [Vercel AI SDK Guide](./vercel-ai-sdk.md) for details.*

## Deployment Considerations

### 1. Edge vs. Node.js Runtime

| Runtime | Latency | Features | Timeout |
| :--- | :--- | :--- | :--- |
| **Node.js** | Moderate | Full Node API | High (10s - 5min) |
| **Edge** | Low | Limited API | Low (30s) |

**Recommendation**: Use **Edge** for chat (fast TTFT). Use **Node.js** for RAG (needs vector DB connections).

### 2. Timeouts

Vercel has strict timeouts.
- **Hobby**: 10s (Serverless Function), 30s (Edge).
- **Pro**: 300s (Serverless Function).

**Fix**: Always use streaming. If a task takes >30s (like generating a long report), use background jobs (Inngest/Trigger.dev).

## Next Steps

- Deploy your app using the **[Deployment Guide](../../deployment/index.md)**.
