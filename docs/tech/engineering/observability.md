# Observability

In traditional software, you log "Request / Response".
In AI software, you must log **Prompts, Completions, Tokens, and Latency**.

## Key Metrics to Track

| Metric | Definition | Goal |
| :--- | :--- | :--- |
| **TTFT** | Time To First Token | < 1000ms |
| **Total Latency** | Time to full completion | < 5s (context dependent) |
| **Tokens** | Input + Output length | Minimize (Cost saving) |
| **Cost** | $$$ per request | Track budget |
| **Errors** | 429s, 500s | < 1% |

## Tracing

AI Apps are complex chains (RAG: Retriever -> Reranker -> Generator).
**Tracing** visualizes the entire waterfall of a request.

```
[Request] "Who is CEO of Apple?" (2s)
  ├── [Retrieve] Pinecone (0.5s)
  ├── [Rerank] Cohere (0.2s)
  └── [Generate] GPT-4o (1.3s)
```

## Tools

Don't build this yourself. Use a specialized proxy.

1.  **Helicone**: Open-source proxy. Just change the `baseURL` in OpenAI SDK.
    ```typescript
    const openai = new OpenAI({
      baseURL: "https://oai.hconeai.com/v1",
      defaultHeaders: { "Helicone-Auth": "Bearer HELICONE_KEY" }
    });
    ```
2.  **Langfuse**: Open-source tracing and metrics.
3.  **Sentry**: Good for error tracking, but less detailed for token costs.

## Privacy Redaction

**Warning**: Never log PII (Personally Identifiable Information) like emails or passwords to these 3rd party tools. Implement a redaction layer *before* logging.
