# 部署到 Vercel Edge

"Edge" 意味着在全球成千上万台服务器上运行你的代码，靠近用户。
对于 AI 而言，这降低了延迟，并（通常）增加了流式传输的超时限制。

## 配置

在 Next.js App Router 中，只需添加此导出：

```typescript
// app/api/chat/route.ts
export const runtime = 'edge'; // <--- 魔法代码

export async function POST(req: Request) {
  // ...
}
```

## Edge 的局限性

Edge 环境**不是** Node.js。
- ❌ 没有 `fs` (文件系统) 访问权限。
- ❌ 没有原生模块 (如某些 `sharp` 图像调整工具)。
- ❌ 数据库连接有限 (需要连接池或基于 HTTP 的驱动程序，如 Neon/Supabase)。

## 流式响应

Vercel Edge 针对带有流的 `Response` 对象进行了优化。

```typescript
import { OpenAIStream, StreamingTextResponse } from 'ai';

// ... 调用 openai ...
const stream = OpenAIStream(response);
return new StreamingTextResponse(stream);
```

## 环境变量

1.  进入 Vercel Dashboard -> Settings -> Environment Variables。
2.  添加 `OPENAI_API_KEY`。
3.  确保它在 **Production** 和 **Preview** 中可用。

## 故障排除

**错误: "The edge function crashed"**
- 你是否尝试使用 `fs.readFileSync`？
- 你是否导入了一个巨大的库？(Edge 函数有大小限制，通常 < 1MB)。

**解决方案**: 如果你需要重型库，请切换回 `runtime = 'nodejs'`。