# AI State Management

Managing state in AI apps is unique because:
1.  **Streaming**: Data arrives over time, not all at once.
2.  **Optimistic UI**: We show the user's message before the server confirms it.
3.  **Persistence**: Chat history needs to be saved/restored.

## The Vercel AI SDK Approach

The SDK (specifically RSC) introduces two concepts:

1.  **AI State**: The serializable JSON representation of the chat history. (What the DB sees).
2.  **UI State**: The React components to render on the client. (What the User sees).

### 1. Defining State

```typescript
// actions.tsx
import { createAI } from 'ai/rsc';

export const AI = createAI({
  actions: { submitUserMessage },
  // AI State = Array of JSON messages
  initialAIState: [] as { role: 'user' | 'assistant'; content: string }[],
  // UI State = Array of React Nodes
  initialUIState: [] as React.ReactNode[],
});
```

### 2. Updating State (Server)

When a message is sent, you update both states.

```typescript
export async function submitUserMessage(content: string) {
  'use server';
  
  const aiState = getMutableAIState<typeof AI>();
  
  // 1. Update AI State (for history)
  aiState.update([...aiState.get(), { role: 'user', content }]);

  const ui = await streamUI({ ... }); // Generate response

  // 2. Update AI State (with response)
  aiState.done([...aiState.get(), { role: 'assistant', content: ui.value }]);

  return ui;
}
```

## Client-Side State (Hooks)

If not using RSC, use `useChat` which manages state internally in an array.

### Sharing State (Context)

To share `messages` across components (e.g., a Sidebar and a Chat Window), lift the `useChat` hook to a Context Provider.

```tsx
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const chat = useChat();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}
```

## Zustand / Jotai

For complex apps, you might want to sync the AI stream into a global store.

```typescript
// Zustand Store
const useStore = create((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

// Sync Hook
const { messages } = useChat({
  onFinish: (message) => useStore.getState().addMessage(message),
});
```

## Persistence

Don't lose history on refresh!
1.  **Database**: Save `onFinish`.
2.  **LocalStorage**: Use `useChat({ id, initialMessages })` to hydrate.

## Next Steps

- Check out **[Cookbook Recipes](../../cookbook/index.md)** for more patterns.
