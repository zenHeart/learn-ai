# Streaming & SSE Patterns

LLMs are slow. Waiting 10 seconds for a full answer is bad UX. **Streaming** allows you to show the answer chunk-by-chunk as it generates.

## How it Works: Server-Sent Events (SSE)

Unlike WebSockets (bidirectional), SSE is a standard HTTP connection where the server keeps the connection open and pushes text chunks.

**The Protocol**:
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream

data: Hello
data:  world
data: !
```

## Backend: Creating a Stream (Node.js)

Here is how to create a raw stream without any frameworks.

```typescript
// app/api/stream/route.ts
export async function POST(req: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Simulate an LLM stream
      const text = "This is a streamed response from the server.";
      const chunks = text.split(" ");

      for (const chunk of chunks) {
        // Add delay to simulate processing
        await new Promise(r => setTimeout(r, 100));
        
        // Enqueue the chunk
        controller.enqueue(encoder.encode(chunk + " "));
      }
      
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

## Frontend: Consuming a Stream

### Method 1: The Raw Way (fetch + ReadableStream)

```typescript
async function fetchStream() {
  const response = await fetch('/api/stream', { method: 'POST' });
  
  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    
    const chunkValue = decoder.decode(value);
    console.log(chunkValue);
    // Update your UI state here
    // setMessages(prev => prev + chunkValue)
  }
}
```

### Method 2: The Easy Way (Vercel AI SDK)

The **Vercel AI SDK** wraps all this logic (parsing, decoding, state updates) into a single hook.

```typescript
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  // 'messages' updates automatically as chunks arrive
}
```

## UI Patterns for Streaming

1.  **Optimistic Updates**: Show the user's message immediately before the request sends.
2.  **Auto-Scroll**: Detect if the user is at the bottom of the chat and scroll as new content arrives.
3.  **Stop Button**: Allow users to abort the stream using an `AbortController`.
    ```typescript
    const controller = new AbortController();
    fetch('/api/chat', { signal: controller.signal });
    // later...
    controller.abort();
    ```

## Common Pitfalls

- **Buffering**: Some server platforms (like AWS Lambda behind API Gateway) might buffer responses, breaking the stream. Ensure your infrastructure supports streaming.
- **JSON Parsing**: Don't try to parse incomplete JSON chunks. Accumulate the full string first.
- **Timeout**: Browsers and servers often have 30-60s timeouts. Keep connections alive or configure higher limits.

## Next Steps

- Implement robust streaming with **[Vercel AI SDK](../frameworks/vercel-ai-sdk.md)**.
