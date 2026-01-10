# API Integration Guide

**Prerequisite Knowledge**: [LLM Fundamentals](../../tech/fundamentals/LLM.md)

## Overview

Integrating AI into your application starts with choosing the right Model Provider. While there are dozens of options, 95% of production applications today build on top of three core providers: **OpenAI**, **Anthropic**, and **Google**.

This section guides you through connecting these powerful models to your frontend applications.

## Provider Comparison Matrix

| Feature | OpenAI (GPT-4o) | Anthropic (Claude 3.5 Sonnet) | Google (Gemini 1.5 Pro) |
| :--- | :--- | :--- | :--- |
| **Best For** | General Purpose, Function Calling, Structured Data | Coding, Reasoning, Creative Writing | Long Context (2M tokens), Multimodal (Video) |
| **Speed** | ⚡️⚡️⚡️⚡️ (Fast) | ⚡️⚡️⚡️ (Moderate) | ⚡️⚡️⚡️ (Moderate) |
| **Cost** | 💰💰 (Moderate) | 💰💰 (Moderate) | 💰 (Low) |
| **Context Window** | 128k Tokens | 200k Tokens | 2M Tokens |
| **Tool Use** | Excellent | Excellent | Good |
| **Ecosystem** | Massive (Assistants API, Realtime API) | Strong (Artifacts, Computer Use) | Growing (Deep Google Integration) |

---

## Decision Tree: Which API Should I Use?

```mermaid
graph TD
    A[Start] --> B{Need to analyze video or <br>massive docs?}
    B -- Yes --> C[Google Gemini 1.5 Pro]
    B -- No --> D{Complex coding or <br>nuanced writing?}
    D -- Yes --> E[Anthropic Claude 3.5 Sonnet]
    D -- No --> F{Need structured JSON <br>or robust tools?}
    F -- Yes --> G[OpenAI GPT-4o]
    F -- No --> H[OpenAI GPT-4o-mini <br>(Cheapest/Fastest)]
```

---

## Cost Comparison (Estimates)

Prices are per 1 Million Tokens (approx. 750,000 words).
*Prices subject to change. Last updated: Jan 2026.*

| Model | Input Cost | Output Cost | Total for ~1000 requests |
| :--- | :--- | :--- | :--- |
| **GPT-4o** | $2.50 | $10.00 | ~$5.00 |
| **Claude 3.5 Sonnet** | $3.00 | $15.00 | ~$6.00 |
| **Gemini 1.5 Pro** | $1.25 | $5.00 | ~$2.50 |
| **GPT-4o-mini** | $0.15 | $0.60 | ~$0.30 |

> **Takeaway**: For simple tasks (summarization, simple chat), use **GPT-4o-mini**. It is 20x cheaper than the flagship models.

---

## Detailed Integration Guides

Ready to write code? Follow these specific guides:

- [**OpenAI Guide**](./openai.md): The industry standard. Covers setup, streaming, and tool calling.
- [**Anthropic Guide**](./anthropic.md): Best for "smart" tasks. Covers the Anthropic SDK.
- [**HuggingFace Guide**](./huggingface.md): For open-source models and free inference APIs.

---

## Rate Limits & Quotas

When moving to production, you will hit limits.

**Common Limits**:
1.  **RPM (Requests Per Minute)**: How many API calls you can make.
2.  **TPM (Tokens Per Minute)**: How much text you can send/receive.

**Handling Limits**:
- **Exponential Backoff**: If you get a `429 Too Many Requests`, wait 1s, then 2s, then 4s...
- **Tier Upgrades**: Most providers increase limits as you spend more (e.g., OpenAI Usage Tiers).
- **Load Balancing**: Advanced users rotate keys or providers.

---

## Next Steps

1.  **Get an API Key** from your chosen provider.
2.  **Install the SDK** (`npm install openai` or `npm install @anthropic-ai/sdk`).
3.  **Make your first call** following our [OpenAI Guide](./openai.md).