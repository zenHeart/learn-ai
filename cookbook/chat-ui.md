# Recipe: Reusable Chat UI

**Problem**: You need a clean, auto-scrolling chat interface that handles streaming.
**Solution**: A generic React component wrapping `useChat`.

## The Code

Copy this into `components/Chat.tsx`.

```tsx
'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-white shadow-sm">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            👋 Say hello to your AI assistant!
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className="font-bold text-xs mb-1 opacity-70">
                {m.role === 'user' ? 'You' : 'AI'}
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-sm text-gray-400 animate-pulse p-2">
            AI is typing...
          </div>
        )}
        
        {error && (
          <div className="text-red-500 p-2 text-sm bg-red-50 rounded">
            Error: {error.message}
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 flex gap-2">
        <input
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button 
          type="submit"
          disabled={isLoading || !input}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

## Dependencies

- `ai` (Vercel AI SDK)
- Tailwind CSS (for styling)

## Usage

```tsx
import { Chat } from './components/Chat';

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
      <Chat />
    </div>
  );
}
```
