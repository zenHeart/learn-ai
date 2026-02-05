# 秘籍：AI 表单自动补全

**问题**: 填写长表单非常枯燥。
**解决方案**: 让用户输入一句话，然后用 AI 将其映射到表单字段中。

## 代码实现 (useCompletion + JSON 模式)

我们使用 `useCompletion`，因为这是一个一次性的生成任务，而不是对话。

### 1. Hook (客户端)

```tsx
'use client';
import { useCompletion } from 'ai/react';

export function useMagicForm() {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/fill-form',
  });

  return { 
    fillForm: complete, 
    data: completion ? JSON.parse(completion) : null,
    isLoading 
  };
}
```

### 2. API 路由 (服务端)

```typescript
// app/api/fill-form/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    prompt: `Extract flight details from: "${prompt}"`,
    // 强制 JSON 结构
    system: "You are an API that outputs JSON only.",
    tools: {
      fill_flight: {
        description: 'Fill flight form',
        parameters: z.object({
          origin: z.string(),
          destination: z.string(),
          date: z.string().describe('YYYY-MM-DD'),
          passengers: z.number(),
        }),
      },
    },
    toolChoice: 'required', // 强制使用工具
  });

  return result.toDataStreamResponse();
}
```

## UX 最佳实践

1.  **按钮位置**: 在表单顶部放一个 "✨ AI 自动填充" 按钮。
2.  **确认机制**: 不要自动提交。填充字段后让用户检查。
3.  **视觉提示**: 高亮显示 AI 修改过的字段（例如：淡淡的紫色光晕）。

```tsx
<button onClick={() => fillForm("下周五去巴黎的航班，两个人")}>
  ✨ 魔法填充
</button>
```