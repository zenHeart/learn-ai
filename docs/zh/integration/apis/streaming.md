# 流式传输与 SSE 模式

LLM 很慢。等待 10 秒才能看到完整答案是糟糕的用户体验。**流式传输 (Streaming)** 允许你在答案生成时逐块显示。

## 工作原理：服务器发送事件 (SSE)

与 WebSocket（双向）不同，SSE 是一种标准 HTTP 连接，服务器保持连接打开并推送文本块。

**协议**:
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream

data: Hello
data:  world
data: !
```

## 后端：创建流 (Node.js)

这是如何在没有任何框架的情况下创建原始流。

```typescript
// app/api/stream/route.ts
export async function POST(req: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // 模拟 LLM 流
      const text = "This is a streamed response from the server.";
      const chunks = text.split(" ");

      for (const chunk of chunks) {
        // 添加延迟以模拟处理
        await new Promise(r => setTimeout(r, 100));
        
        // 入队块
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

## 前端：消费流

### 方法 1: 原始方式 (fetch + ReadableStream)

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
    // 在这里更新你的 UI 状态
    // setMessages(prev => prev + chunkValue)
  }
}
```

### 方法 2: 简单方式 (Vercel AI SDK)

**Vercel AI SDK** 将所有这些逻辑（解析、解码、状态更新）封装到一个 hook 中。

```typescript
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  // 'messages' 随着块的到达自动更新
}
```

## 流式传输的 UI 模式

1.  **乐观更新**: 在请求发送之前立即显示用户的消息。
2.  **自动滚动**: 检测用户是否在聊天底部，并随着新内容的到来滚动。
3.  **停止按钮**: 允许用户使用 `AbortController` 中止流。
    ```typescript
    const controller = new AbortController();
    fetch('/api/chat', { signal: controller.signal });
    // 稍后...
    controller.abort();
    ```

## 常见陷阱

- **缓冲**: 某些服务器平台（如 API Gateway 后面的 AWS Lambda）可能会缓冲响应，破坏流。确保你的基础设施支持流式传输。
- **JSON 解析**: 不要尝试解析不完整的 JSON 块。先累积完整的字符串。
- **超时**: 浏览器和服务器通常有 30-60 秒的超时限制。保持连接活跃或配置更高的限制。

## 下一步

- 使用 **[Vercel AI SDK](../frameworks/vercel-ai-sdk.md)** 实现稳健的流式传输。