# Rate Limiting & Quotas

Protect your wallet. A single viral user can cost you thousands.

## 1. The Token Bucket Algorithm

Imagine a bucket that fills with 10 tokens per minute. Every request takes 1 token. If empty, reject.

## 2. Implementation (Upstash Ratelimit)

The easiest way in serverless.

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10s
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
}
```

## 3. Tiered Quotas

Differentiate by User Plan.

| Plan | Limit | Model |
| :--- | :--- | :--- |
| **Anonymous** | 5 / day | GPT-3.5 |
| **Free User** | 50 / day | GPT-4o-mini |
| **Pro User** | 500 / day | GPT-4o |

```typescript
const limit = user.isPro ? 500 : 50;
const ratelimit = Ratelimit.slidingWindow(limit, "1 d");
```

## 4. Cost Controls (Hard Limits)

Rate limiting protects against *speed*. **Quotas** protect against *volume*.
Track total token usage per month in your database and block users who exceed it.

```typescript
if (user.monthlyTokenUsage > 1_000_000) {
  throw new Error("Monthly limit exceeded. Upgrade to Enterprise.");
}
```
