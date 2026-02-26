# Recipe: Robust Error Handling

**Problem**: AI APIs fail often (Rate limits, Overloaded, Content Filters).
**Solution**: Implement Retries, Fallbacks, and graceful UI degradation.

## 1. Exponential Backoff (Server-Side)

If OpenAI says "429 Too Many Requests", wait and try again.

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

## 2. Model Fallback

If GPT-4o is down, fall back to a cheaper/more available model.

```typescript
try {
  return await callOpenAI('gpt-4o');
} catch (e) {
  console.warn('GPT-4o failed, falling back to 3.5');
  return await callOpenAI('gpt-3.5-turbo');
}
```

## 3. UI Error Boundaries (Client-Side)

Use the `onError` callback in Vercel AI SDK.

```tsx
const { messages, reload } = useChat({
  onError: (error) => {
    toast.error("AI is overloaded. Retrying...");
    // Auto-retry after 2 seconds
    setTimeout(() => reload(), 2000);
  }
});
```

## Common Error Codes

| Code | Meaning | Action |
| :--- | :--- | :--- |
| **401** | Invalid Key | Check `.env` files. |
| **429** | Rate Limited | Retry with backoff. Upgrade tier. |
| **500** | Server Error | OpenAI is down. Check status page. |
| **503** | Overloaded | Retry immediately (often transient). |
