# Recipe: Secure API Proxy

**Problem**: You cannot use your OpenAI API key in client-side code (React/Vue) because anyone can steal it from the "Network" tab.

**Solution**: Create a backend proxy (API Route) that holds the key and forwards requests.

## The Code (Next.js App Router)

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 1. Force dynamic (server-side only)
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // 2. Authentication Check (Optional but recommended)
  // const session = await auth();
  // if (!session) return new Response('Unauthorized', { status: 401 });

  const { messages } = await req.json();

  // 3. Custom Rate Limiting (Simple In-Memory)
  // In production, use Redis (Upstash)
  if (isRateLimited(req)) {
     return new Response('Too many requests', { status: 429 });
  }

  // 4. Call OpenAI (Key is automatically loaded from process.env.OPENAI_API_KEY)
  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
  });

  // 5. Return the stream
  return result.toDataStreamResponse();
}

// Simple Rate Limiter helper
const rateMap = new Map();
function isRateLimited(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'ip';
  const lastTime = rateMap.get(ip) || 0;
  if (Date.now() - lastTime < 1000) return true; // Max 1 req/sec
  rateMap.set(ip, Date.now());
  return false;
}
```

## Security Checklist

1.  **Environment Variables**: `OPENAI_API_KEY` should be in `.env.local` and never committed.
2.  **Usage Limits**: Set a "Hard Limit" in your OpenAI dashboard (e.g., $10/month) so a bug doesn't bankrupt you.
3.  **Authentication**: Only allow logged-in users to call your API.
4.  **Bot Protection**: Use tools like Cloudflare Turnstile or Vercel Firewall.
