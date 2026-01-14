# 秘籍：健壮的错误处理

**问题**: AI API 经常失败（速率限制、过载、内容过滤）。
**解决方案**: 实现重试（Retries）、回退（Fallbacks）和优雅的 UI 降级。

## 1. 指数退避 (服务端)

如果 OpenAI 返回 "429 Too Many Requests"，等待并重试。

```typescript
async function callWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
}
```

## 2. 模型回退 (Model Fallback)

如果 GPT-4o 挂了，回退到更便宜/更可用的模型。

```typescript
try {
  return await callOpenAI('gpt-4o');
} catch (e) {
  console.warn('GPT-4o failed, falling back to 3.5');
  return await callOpenAI('gpt-3.5-turbo');
}
```

## 3. UI 错误边界 (客户端)

使用 Vercel AI SDK 中的 `onError` 回调。

```tsx
const { messages, reload } = useChat({
  onError: (error) => {
    toast.error("AI 负载过高。正在重试...");
    // 2秒后自动重试
    setTimeout(() => reload(), 2000);
  }
});
```

## 常见错误码

| 代码 | 含义 | 建议操作 |
| :--- | :--- | :--- |
| **401** | Invalid Key | 检查 `.env` 文件。 |
| **429** | Rate Limited | 指数退避重试。升级套餐。 |
| **500** | Server Error | OpenAI 挂了。检查状态页。 |
| **503** | Overloaded | 立即重试（通常是暂时的）。 |