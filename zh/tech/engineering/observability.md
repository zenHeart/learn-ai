# 可观测性 (Observability)

在传统软件中，你记录 "Request / Response"。
在 AI 软件中，你必须记录 **Prompts, Completions, Tokens, 和 Latency**。

## 需要跟踪的关键指标

| 指标 | 定义 | 目标 |
| :--- | :--- | :--- |
| **TTFT** | 首个 Token 时间 (Time To First Token) | < 1000ms |
| **总延迟** | 完整完成时间 | < 5s (取决于上下文) |
| **Tokens** | 输入 + 输出长度 | 最小化 (节省成本) |
| **成本** | 每次请求的 $$$ | 跟踪预算 |
| **错误** | 429s, 500s | < 1% |

## 追踪 (Tracing)

AI 应用是复杂的链 (RAG: Retriever -> Reranker -> Generator)。
**追踪** 可视化请求的整个瀑布流。

```
[Request] "Who is CEO of Apple?" (2s)
  ├── [Retrieve] Pinecone (0.5s)
  ├── [Rerank] Cohere (0.2s)
  └── [Generate] GPT-4o (1.3s)
```

## 工具

不要自己构建这个。使用专门的代理。

1.  **Helicone**: 开源代理。只需更改 OpenAI SDK 中的 `baseURL`。
    ```typescript
    const openai = new OpenAI({
      baseURL: "https://oai.hconeai.com/v1",
      defaultHeaders: { "Helicone-Auth": "Bearer HELICONE_KEY" }
    });
    ```
2.  **Langfuse**: 开源追踪和指标。
3.  **Sentry**: 适合错误跟踪，但 Token 成本细节较少。

## 隐私编校

**警告**: 永远不要将 PII (个人身份信息，如电子邮件或密码) 记录到这些第三方工具中。在记录*之前*实施编校层。