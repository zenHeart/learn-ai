# 秘籍：安全 API 代理

**问题**: 你不能在客户端代码 (React/Vue) 中使用 OpenAI API Key，因为任何人都可以在“网络”选项卡中窃取它。

**解决方案**: 创建一个后端代理 (API Route) 来持有密钥并转发请求。

## 代码实现 (Next.js App Router)

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 1. 强制动态渲染 (仅服务端)
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // 2. 身份验证检查 (可选但推荐)
  // const session = await auth();
  // if (!session) return new Response('Unauthorized', { status: 401 });

  const { messages } = await req.json();

  // 3. 自定义速率限制 (简单的内存实现)
  // 生产环境请使用 Redis (Upstash)
  if (isRateLimited(req)) {
     return new Response('Too many requests', { status: 429 });
  }

  // 4. 调用 OpenAI (密钥会自动从 process.env.OPENAI_API_KEY 读取)
  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
  });

  // 5. 返回流
  return result.toDataStreamResponse();
}

// 简单的速率限制辅助函数
const rateMap = new Map();
function isRateLimited(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'ip';
  const lastTime = rateMap.get(ip) || 0;
  if (Date.now() - lastTime < 1000) return true; // 最大 1 请求/秒
  rateMap.set(ip, Date.now());
  return false;
}
```

## 安全检查清单

1.  **环境变量**: `OPENAI_API_KEY` 应该在 `.env.local` 中，永远不要提交到代码库。
2.  **用量限制**: 在 OpenAI 控制台设置“硬限制”（例如 $10/月），以免 bug 导致破产。
3.  **身份验证**: 仅允许已登录用户调用你的 API。
4.  **机器人防护**: 使用 Cloudflare Turnstile 或 Vercel Firewall 等工具。