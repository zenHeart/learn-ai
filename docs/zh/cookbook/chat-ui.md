---
title: 秘籍：可复用的聊天 UI
description: "问题: 你需要一个整洁、自动滚动且能处理流式传输的聊天界面。 解决方案: 一个封装了 useChat 的通用 React 组件。"
domain: recipe
tags:
  - cookbook
---

# 秘籍：可复用的聊天 UI

**问题**: 你需要一个整洁、自动滚动且能处理流式传输的聊天界面。
**解决方案**: 一个封装了 `useChat` 的通用 React 组件。

## 代码实现

将此代码复制到 `components/Chat.tsx`。

```tsx
'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-white shadow-sm">
      
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            👋 向你的 AI 助手打个招呼吧！
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
                {m.role === 'user' ? '你' : 'AI'}
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-sm text-gray-400 animate-pulse p-2">
            AI 正在输入...
          </div>
        )}
        
        {error && (
          <div className="text-red-500 p-2 text-sm bg-red-50 rounded">
            错误: {error.message}
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 flex gap-2">
        <input
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          placeholder="输入消息..."
        />
        <button 
          type="submit"
          disabled={isLoading || !input}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          发送
        </button>
      </form>
    </div>
  );
}
```

## 依赖项

- `ai` (Vercel AI SDK)
- Tailwind CSS (用于样式)

## 用法

```tsx
import { Chat } from './components/Chat';

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">AI 助手</h1>
      <Chat />
    </div>
  );
}
```