---
title: 部署
description: 先选能撑住流式请求的平台，再谈缓存、限流和账单。
domain: deploy
tags:
  - deploy
listed: false
outline: false
pageClass: catalog-page
---

# 部署

**结论**：AI 接口和普通 CRUD 不一样——响应要流很久，超时和账单是第一风险。先选平台，再补缓存和限流。

## 先选平台

| 你的情况 | 先看 |
|---|---|
| Next.js 应用 | [Vercel Edge](./vercel-edge.md) |
| 要全球边缘、能接受 Workers 运行时 | [Cloudflare Workers](./cloudflare-workers.md) |

## 再补生产清单

1. [缓存](./caching.md) — 别对同一句话重复打模型  
2. [限流](./rate-limiting.md) — 防止一把刷爆额度  
3. [监控](./monitoring.md) — 延迟、失败率、token  
4. [成本计算器](./cost-calculator.md) — 上线前先算一笔账  

评估和安全的概念页在 [技术 · 工程](/zh/tech/engineering/evals)。
