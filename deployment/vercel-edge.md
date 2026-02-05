# Deploying to Vercel Edge

The "Edge" means running your code on thousands of servers globally, close to the user.
For AI, this reduces latency and (often) increases timeout limits for streaming.

## Configuration

In Next.js App Router, simply add this export:

```typescript
// app/api/chat/route.ts
export const runtime = 'edge'; // <--- The Magic Line

export async function POST(req: Request) {
  // ...
}
```

## Limitations of Edge

Edge environments are NOT Node.js.
- ❌ No `fs` (FileSystem) access.
- ❌ No native modules (like some `sharp` image resizing tools).
- ❌ Limited database connections (Need connection pooling or HTTP-based drivers like Neon/Supabase).

## Streaming Response

Vercel Edge is optimized for `Response` objects with streams.

```typescript
import { OpenAIStream, StreamingTextResponse } from 'ai';

// ... call openai ...
const stream = OpenAIStream(response);
return new StreamingTextResponse(stream);
```

## Environment Variables

1.  Go to Vercel Dashboard -> Settings -> Environment Variables.
2.  Add `OPENAI_API_KEY`.
3.  Ensure it is available in **Production** and **Preview**.

## Troubleshooting

**Error: "The edge function crashed"**
- Did you try to use `fs.readFileSync`?
- Did you import a huge library? (Edge functions have size limits, usually < 1MB).

**Solution**: If you need heavy libraries, switch back to `runtime = 'nodejs'`.
