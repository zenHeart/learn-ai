# 生成式 UI (Generative UI)

**生成式 UI (GenUI)** 是聊天机器人的下一次进化。AI 不再仅仅用文本回复，而是回复**交互式 UI 组件**。

## 文本的问题
- 用户: "给我看看天气。"
- 文本 AI: "20 度，晴天。" (无聊，难以快速阅读)
- GenUI AI: *渲染一个带有图标和滑块的天气卡片。*

## 工作原理

1.  **工具定义**: 你告诉 AI "我有一个 `WeatherCard` 组件，它接受 `city` 和 `temp`。"
2.  **工具调用**: AI 决定使用该工具。
3.  **Server Action**: 服务器执行逻辑并返回一个 **React 组件** (通过 React Server Components)，而不仅仅是 JSON。
4.  **客户端渲染**: 客户端在聊天流中显示该组件。

## Vercel AI SDK (RSC) 实现

这需要 Next.js App Router 和 Server Actions。

```tsx
// actions.tsx
'use server';

import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { WeatherCard } from './components/weather-card';
import { StockChart } from './components/stock-chart';

export async function submitUserMessage(input: string) {
  'use server';

  const uiStream = await streamUI({
    model: openai('gpt-4o'),
    prompt: input,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      get_weather: {
        description: '获取某地的天气',
        parameters: z.object({ city: z.string() }),
        generate: async function* ({ city }) {
          yield <div>正在加载 {city} 的天气...</div>;
          const data = await fetchWeather(city);
          return <WeatherCard data={data} />;
        },
      },
      get_stock: {
        description: '获取股票价格',
        parameters: z.object({ symbol: z.string() }),
        generate: async ({ symbol }) => {
          const data = await fetchStock(symbol);
          return <StockChart data={data} />;
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: uiStream.value,
  };
}
```

## 客户端实现

客户端只需渲染服务器返回的 `display` 节点。

```tsx
// page.tsx
'use client';
import { useActions, useUIState } from 'ai/rsc';

export default function Chat() {
  const { submitUserMessage } = useActions();
  const [messages, setMessages] = useUIState();

  const handleSubmit = async (input) => {
    const response = await submitUserMessage(input);
    setMessages(current => [...current, response]);
  };

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          {msg.display} {/* 渲染文本 或 组件 */}
        </div>
      ))}
    </div>
  );
}
```

## 最佳实践

1.  **加载状态**: 使用生成器 (`yield`) 在数据获取时立即显示骨架屏。
2.  **组件设计**: 组件应该是独立的，并且在聊天气泡中看起来不错。
3.  **回退**: 始终提供文本回退描述以用于无障碍访问。

## 下一步

- 探索 **[状态管理](./state-management.md)** 以处理这些组件之间的数据流。