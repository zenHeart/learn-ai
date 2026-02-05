# AI 状态管理

在 AI 应用中管理状态是独特的，因为：
1.  **流式传输**: 数据随时间到达，而不是一次性到达。
2.  **乐观 UI**: 我们在服务器确认之前显示用户的消息。
3.  **持久化**: 聊天历史需要保存/恢复。

## Vercel AI SDK 方法

SDK (特别是 RSC) 引入了两个概念：

1.  **AI State**: 聊天历史的可序列化 JSON 表示。(数据库看到的)。
2.  **UI State**: 在客户端渲染的 React 组件。(用户看到的)。

### 1. 定义状态

```typescript
// actions.tsx
import { createAI } from 'ai/rsc';

export const AI = createAI({
  actions: { submitUserMessage },
  // AI State = JSON 消息数组
  initialAIState: [] as { role: 'user' | 'assistant'; content: string }[],
  // UI State = React 节点数组
  initialUIState: [] as React.ReactNode[],
});
```

### 2. 更新状态 (服务端)

当发送消息时，你需要更新这两个状态。

```typescript
export async function submitUserMessage(content: string) {
  'use server';
  
  const aiState = getMutableAIState<typeof AI>();
  
  // 1. 更新 AI State (用于历史记录)
  aiState.update([...aiState.get(), { role: 'user', content }]);

  const ui = await streamUI({ ... }); // 生成响应

  // 2. 更新 AI State (带响应)
  aiState.done([...aiState.get(), { role: 'assistant', content: ui.value }]);

  return ui;
}
```

## 客户端状态 (Hooks)

如果不使用 RSC，使用 `useChat`，它在内部数组中管理状态。

### 共享状态 (Context)

要在组件之间（例如侧边栏和聊天窗口）共享 `messages`，请将 `useChat` hook 提升到 Context Provider。

```tsx
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const chat = useChat();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}
```

## Zustand / Jotai

对于复杂的应用，你可能希望将 AI 流同步到全局存储中。

```typescript
// Zustand Store
const useStore = create((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

// 同步 Hook
const { messages } = useChat({
  onFinish: (message) => useStore.getState().addMessage(message),
});
```

## 持久化

刷新时不要丢失历史记录！
1.  **数据库**: 保存 `onFinish`。
2.  **LocalStorage**: 使用 `useChat({ id, initialMessages })` 进行回填 (hydrate)。

## 下一步

- 查看 **[实战手册](../../cookbook/index.md)** 了解更多模式。