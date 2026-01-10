# Project: Smart Text Summarizer

**Level**: Beginner
**Time**: 1 hour
**Stack**: Next.js, Vercel AI SDK

## Overview

Build a tool where users can paste a long article or report, and get a concise bullet-point summary.

**Key Concepts**:
- **Prompt Engineering**: How to ask for specific formats.
- **Token Limits**: Handling text that is too long.
- **UI States**: Loading vs. Streaming.

## Step 1: The UI

Create a simple two-column layout: Input (Textarea) and Output (Markdown).

```tsx
// app/page.tsx
'use client';
import { useCompletion } from 'ai/react';

export default function Summarizer() {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/summarize',
  });

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      <textarea
        className="p-4 border rounded"
        placeholder="Paste long text here..."
        onChange={(e) => complete(e.target.value)}
      />
      <div className="p-4 bg-gray-50 rounded prose">
        {isLoading && !completion ? 'Summarizing...' : completion}
      </div>
    </div>
  );
}
```

## Step 2: The API Route

We use a specific prompt to enforce structure.

```typescript
// app/api/summarize/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Basic Token Check (Approx 1 char = 0.25 tokens)
  if (prompt.length > 50000) {
    return new Response('Text too long', { status: 400 });
  }

  const result = await streamText({
    model: openai('gpt-4o-mini'), // Use cheap model for summarization
    system: "You are a professional editor.",
    prompt: `
      Summarize the following text.
      Format:
      1. One sentence high-level summary.
      2. Bullet points for key details.
      3. A "Conclusion" section.
      
      Text:
      ${prompt}
    `,
  });

  return result.toDataStreamResponse();
}
```

## Advanced: Handling Long Text (Chunking)

If text exceeds the context window (128k tokens for GPT-4o), you must split it.

**Strategy**:
1. Split text into 10k chunks.
2. Summarize each chunk individually.
3. Summarize the summaries together.

## Extensions

- **URL Input**: Use a library like `cheerio` to fetch and parse a URL before summarizing.
- **Export**: Add a "Download PDF" button.
