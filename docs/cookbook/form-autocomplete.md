# Recipe: AI Form Autocomplete

**Problem**: Filling out long forms is tedious.
**Solution**: Let users type a short sentence, and use AI to map it to the form fields.

## The Code (useCompletion + JSON Mode)

We use `useCompletion` because this is a one-off generation task, not a chat.

### 1. The Hook (Client)

```tsx
'use client';
import { useCompletion } from 'ai/react';

export function useMagicForm() {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/fill-form',
  });

  return { 
    fillForm: complete, 
    data: completion ? JSON.parse(completion) : null,
    isLoading 
  };
}
```

### 2. The API Route (Server)

```typescript
// app/api/fill-form/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    prompt: `Extract flight details from: "${prompt}"`,
    // Force JSON structure
    system: "You are an API that outputs JSON only.",
    tools: {
      fill_flight: {
        description: 'Fill flight form',
        parameters: z.object({
          origin: z.string(),
          destination: z.string(),
          date: z.string().describe('YYYY-MM-DD'),
          passengers: z.number(),
        }),
      },
    },
    toolChoice: 'required', // Force it to use the tool
  });

  return result.toDataStreamResponse();
}
```

## UX Best Practices

1.  **Button Placement**: Put a "✨ Auto-fill with AI" button near the top of the form.
2.  **Confirmation**: Don't auto-submit. Fill the fields and let the user review.
3.  **Visual Cues**: Highlight fields that were modified by AI (e.g., a subtle purple glow).

```tsx
<button onClick={() => fillForm("Flight to Paris next friday for 2 people")}>
  ✨ Magic Fill
</button>
```
