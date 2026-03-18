# AI 缓存策略

LLM 请求**慢**且**贵**。缓存是解决这两点的最佳方案。

## 1. 标准 API 缓存 (Vercel Data Cache)

如果提示词是静态的（例如，“生成每日星座运势”），缓存响应。

```typescript
// Next.js App Router
export const revalidate = 3600; // 缓存 1 小时

export async function GET() {
  const completion = await openai.chat.completions.create({ ... });
  return Response.json(completion);
}
```

## 2. 语义缓存 (圣杯)

用户很少输入完全相同的内容。
- 用户 A: "Who is Elon Musk?"
- 用户 B: "Tell me about Elon Musk"

标准缓存未命中。**语义缓存**命中。

**工作原理**:
1.  嵌入传入的提示词。
2.  在向量数据库 (Redis/Pinecone) 中搜索相似的历史提示词 (阈值 > 0.95)。
3.  如果找到，返回存储的答案。

**库**:
- **GPTCache**: Python 库。
- **Upstash Semantic Cache**: Serverless 解决方案。

## 3. 边缘缓存 (CDN)

对于 AI 生成的资产（图像、音频），始终在边缘 (CDN) 缓存它们。
不要从数据库提供生成的图像；将它们上传到 S3/R2 并通过 Cloudflare/Vercel Edge 提供。

## 缓存失效

AI 模型会变化（OpenAI 的更新）。
- **基于时间**: 每周过期一次缓存。
- **基于模型**: 当你从 `gpt-3.5` 升级到 `gpt-4o` 时，使所有缓存失效。