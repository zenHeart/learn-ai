# 速率限制与配额

保护你的钱包。单个病毒式传播的用户可能会让你损失数千美元。

## 1. 令牌桶算法 (Token Bucket)

想象一个桶，每分钟填充 10 个令牌。每个请求消耗 1 个令牌。如果桶空了，拒绝请求。

## 2. 实现 (Upstash Ratelimit)

Serverless 中最简单的方法。

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 每 10 秒 10 个请求
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
}
```

## 3. 分层配额

按用户计划区分。

| 计划 | 限制 | 模型 |
| :--- | :--- | :--- |
| **匿名** | 5 / 天 | GPT-3.5 |
| **免费用户** | 50 / 天 | GPT-4o-mini |
| **专业用户** | 500 / 天 | GPT-4o |

```typescript
const limit = user.isPro ? 500 : 50;
const ratelimit = Ratelimit.slidingWindow(limit, "1 d");
```

## 4. 成本控制 (硬限制)

速率限制防止*速度*过快。**配额**防止*总量*过大。
在数据库中跟踪每月的总 Token 使用量，并阻止超出的用户。

```typescript
if (user.monthlyTokenUsage > 1_000_000) {
  throw new Error("Monthly limit exceeded. Upgrade to Enterprise.");
}
```