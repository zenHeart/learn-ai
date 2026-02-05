# Vercel AI SDK 指南

**Vercel AI SDK** 是用于在 React, Next.js, Vue 和 Svelte 中构建 AI 驱动的用户界面的标准库。它抽象了流解析和状态管理的复杂性。

## 核心概念

SDK 分为两部分：
1.  **AI SDK Core**: 用于生成文本/对象的服务端库 (`ai`)。
2.  **AI SDK UI**: 用于构建界面的客户端 Hooks (`ai/react`)。

## 1. 服务端：`streamText`

在你的 API 路由 (Next.js App Router) 中，使用 `streamText` 调用 LLM 并返回流。

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

## 2. 客户端：`useChat`

`useChat` hook 是构建类似 ChatGPT 界面的最简单方法。

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

### `useChat` 的主要特性：
- **自动状态管理**: 追加用户消息，然后随着 AI 块的到达追加 AI 消息。
- **乐观 UI**: 立即显示用户消息。
- **流解析**: 自动处理 SSE 连接。

## 3. 客户端：`useCompletion`

在非聊天循环的“自动补全”或“生成文本”场景中使用此 hook。

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

## 4. 生成式 UI (RSC)

AI SDK 支持 **React Server Components (RSC)** 来流式传输 UI 组件，而不仅仅是文本。

*注意：这需要 Next.js App Router。*

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

## 最佳实践

1.  **错误处理**: 将 `onError` 传递给 `useChat` 以在 API 失败时显示 Toasts。
    ```tsx
    useChat({
      onError: (error) => toast.error(error.message)
    })
    ```
2.  **初始消息**: 从数据库预填充聊天历史。
    ```tsx
    useChat({ initialMessages: dbMessages })
    ```
3.  **Body 数据**: 向服务器发送额外数据（如用户 ID）。
    ```tsx
    handleSubmit(e, { body: { userId: '123' } })
    ```

## 下一步

- 构建一个 **[聊天机器人](../../projects/beginner/ai-chatbot.md)**。
- 学习如何使用 SDK 进行 **[工具调用](../protocols/tool-calling.md)**。