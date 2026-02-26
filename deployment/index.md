# Deployment Guide

Deploying AI apps is harder than standard web apps because of **Long-running requests (Streaming)** and **High Compute Needs (if hosting models)**.

## Deployment Options

| Platform | Best For | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Vercel** | **Next.js Apps** | Easiest, Edge Network, AI SDK integration. | Timeouts on Hobby plan (10s/60s). |
| **Cloudflare** | **Global Latency** | Workers AI (Free Llama 3!), Cheapest. | Non-Node.js runtime (Edge only). |
| **AWS / GCP** | **Enterprise** | Infinite scale, Custom VPCs. | Complex setup (Terraform, IAM). |
| **Railway / Render** | **Docker Apps** | Simple, Long timeouts allowed. | No edge network by default. |

## Decision Matrix

```mermaid
graph TD
    A[Start] --> B{Using Next.js?}
    B -- Yes --> C[Vercel (Recommended)]
    B -- No --> D{Need to run Python/Custom Models?}
    D -- Yes --> E[Railway / AWS EC2]
    D -- No --> F{Want cheapest/fastest?}
    F -- Yes --> G[Cloudflare Workers]
```

## The Timeout Problem

Standard serverless functions often timeout after 10-60 seconds. GPT-4 can take 30+ seconds to generate a long report.

**Solutions**:
1.  **Streaming**: Keep the connection alive (Vercel supports this).
2.  **Background Jobs**: Use Inngest or Trigger.dev to run the AI task in the background, then push the result.
3.  **Dedicated Servers**: Docker containers (Railway) don't have hard timeouts.

## Next Steps

- **[Vercel / Edge Guide](./vercel-edge.md)**
- **[Cloudflare Workers Guide](./cloudflare-workers.md)**
