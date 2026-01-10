# Production Monitoring

**Observability** tracks *what* the AI said.
**Monitoring** tracks *if* the server is running.

## Key System Metrics

| Metric | Warning Threshold | Critical Threshold |
| :--- | :--- | :--- |
| **API Latency (p99)** | > 2s | > 10s |
| **Error Rate (5xx)** | > 1% | > 5% |
| **Memory Usage** | > 70% | > 90% |
| **Edge Function Duration** | > 20s | > 25s (Timeout risk) |

## Tools

### 1. Vercel Analytics
Good for frontend speed (Core Web Vitals) and serverless function logs.

### 2. Datadog / New Relic
Standard for enterprise.
- Set up alerts for `429 Too Many Requests` (means your OpenAI account is throttled).
- Monitor `504 Gateway Timeout` (means your AI is taking too long).

## Alerting Strategy

Don't wake up for everything.

- **P1 (Wake up)**:
    - OpenAI API is returning 500s for > 5 minutes.
    - Site is down.
- **P2 (Check in morning)**:
    - Latency increased by 20%.
    - Error rate is 0.5%.
- **P3 (Log only)**:
    - A single user hit their rate limit.
