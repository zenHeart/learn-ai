# Next.js 集成模式

Next.js 是构建 AI 应用程序的最流行框架，因为它对 **流式传输**、**Edge 函数** 和 **Server Actions** 有强大的支持。

## 模式 1: 路由处理程序 (标准)

最常见的模式是创建一个流式传输响应的 API 端点。

```typescript
// app/api/chat/route.ts
export const runtime = 'edge'; // 使用 Edge 获得更低延迟

export async function POST(req: Request) {
  // ... 验证 auth ...
  // ... 调用 LLM ...
  // ... 返回流 ...
}
```

**优点**:
- 适用于任何客户端（React, Vue, 移动应用）。
- 标准 REST API。

## 模式 2: Server Actions

直接从你的 UI 组件调用 AI，而无需手动 `fetch`。

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

**优点**:
- 类型安全。
- 无需管理 API 路由。

## 模式 3: 生成式 UI (RSC)

从服务器流式传输 React 组件。

*详情请参阅 [Vercel AI SDK 指南](./vercel-ai-sdk.md)。*

## 部署注意事项

### 1. Edge vs. Node.js 运行时

| 运行时 | 延迟 | 特性 | 超时 |
| :--- | :--- | :--- | :--- |
| **Node.js** | 中等 | 完整 Node API | 高 (10s - 5min) |
| **Edge** | 低 | 有限 API | 低 (30s) |

**建议**: 聊天使用 **Edge** (快速 TTFT)。RAG 使用 **Node.js** (需要向量 DB 连接)。

### 2. 超时

Vercel 有严格的超时限制。
- **Hobby**: 10s (Serverless Function), 30s (Edge)。
- **Pro**: 300s (Serverless Function)。

**修复**: 始终使用流式传输。如果任务耗时 >30s（如生成长报告），使用后台任务 (Inngest/Trigger.dev)。

## 下一步

- 使用 **[部署指南](../../deployment/index.md)** 部署你的应用。