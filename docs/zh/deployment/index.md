# 部署指南

部署 AI 应用比标准 Web 应用更难，因为**长时间运行的请求 (流式传输)** 和 **高计算需求 (如果托管模型)**。

## 部署选项

| 平台 | 最适合 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- |
| **Vercel** | **Next.js 应用** | 最简单，边缘网络，AI SDK 集成。 | Hobby 计划的超时限制 (10s/60s)。 |
| **Cloudflare** | **全球低延迟** | Workers AI (免费 Llama 3!), 最便宜。 | 非 Node.js 运行时 (仅 Edge)。 |
| **AWS / GCP** | **企业级** | 无限扩展，自定义 VPC。 | 设置复杂 (Terraform, IAM)。 |
| **Railway / Render** | **Docker 应用** | 简单，允许长超时。 | 默认没有边缘网络。 |

## 决策矩阵

```mermaid
graph TD
    A[开始] --> B{使用 Next.js?}
    B -- 是 --> C[Vercel (推荐)]
    B -- 否 --> D{需要运行 Python/自定义模型?}
    D -- 是 --> E[Railway / AWS EC2]
    D -- 否 --> F{想要最便宜/最快?}
    F -- 是 --> G[Cloudflare Workers]
```

## 超时问题

标准 Serverless 函数通常在 10-60 秒后超时。GPT-4 生成长报告可能需要 30 秒以上。

**解决方案**:
1.  **流式传输 (Streaming)**: 保持连接活跃 (Vercel 支持此功能)。
2.  **后台任务 (Background Jobs)**: 使用 Inngest or Trigger.dev 在后台运行 AI 任务，然后推送结果。
3.  **专用服务器 (Dedicated Servers)**: Docker 容器 (Railway) 没有硬性超时限制。

## 下一步

- **[Vercel / Edge 指南](./vercel-edge.md)**
- **[Cloudflare Workers 指南](./cloudflare-workers.md)**