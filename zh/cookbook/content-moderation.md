# 秘籍：内容审查

**问题**: 用户可能会尝试让你的机器人说出攻击性的话（越狱）或生成有害内容。
**解决方案**: 使用审查 API (Moderation API) 过滤输入和输出。

## 1. 使用 OpenAI 审查 API

OpenAI 提供了一个**免费**的端点来检查仇恨、暴力和自残内容。

```typescript
import OpenAI from 'openai';

const openai = new OpenAI();

async function checkSafety(input: string) {
  const moderation = await openai.moderations.create({ input });
  const result = moderation.results[0];

  if (result.flagged) {
    const categories = Object.keys(result.categories)
      .filter(key => result.categories[key])
      .join(', ');
      
    throw new Error(`内容违反政策: ${categories}`);
  }
  
  return true;
}
```

## 2. 在 API 路由中实现

在调用 LLM *之前* 运行检查。

```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // 1. 检查输入
  try {
    await checkSafety(lastMessage.content);
  } catch (e) {
    return new Response(e.message, { status: 400 });
  }

  // 2. 生成响应
  const result = await streamText({ ... });
  
  return result.toDataStreamResponse();
}
```

## 3. 结构化验证 (Zod)

防止试图破坏 JSON 结构的“提示注入”攻击。

```typescript
import { z } from 'zod';

// 定义严格的模式
const UserProfileSchema = z.object({
  username: z.string().min(3).max(20),
  bio: z.string().max(100).refine(val => !val.includes('ignore previous instructions')),
});
```

## 检查清单

- [ ] 使用审查 API 检查用户输入。
- [ ] 检查 AI 输出（可选，会增加延迟）。
- [ ] 限制输入长度（最大字符数）以防止 Token 耗尽攻击。