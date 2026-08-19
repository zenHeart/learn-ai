---
title: Tencent Hunyuan tutorial
description: "Pick the right door, then complete one hy3 call on TokenHub. Open weights have official serve commands; this page only gives the entry."
domain: product
tags:
  - hunyuan
  - llm-api
role: tutorial
---

# Tencent Hunyuan tutorial

> Path: identify the product → optional playground → first TokenHub call → find the open checkpoint. Parameters live in the [cheatsheet](./hunyuan-cheatsheet.md). Recipes live in the [cookbook](./hunyuan-cookbook.md). Names live in the [glossary](./hunyuan-glossary.md).
>
> Model internals (MoE, MTP, attention) are out of scope. See [LLM fundamentals](../../tech/fundamentals/LLM.md) and [Learn LLM](https://llm.zenheart.site/chapters/).

## 1. Confirm the door

| What you think you opened | What it actually is | Next |
|---------------------------|---------------------|------|
| “Tencent’s AI” in a browser | Usually [Yuanbao](https://yuanbao.tencent.com/) | Leave. Issue #76 |
| IDE completion / repo agent | [CodeBuddy](https://www.codebuddy.cn/) | Leave. Issue #78 |
| Your service needs `chat/completions` | **TokenHub + `hy3`** | Keep reading |
| Download weights and serve | [Tencent-Hunyuan/Hy3](https://github.com/Tencent-Hunyuan/Hy3) | Jump to [Open weights](#open-weights) |

The official site is [hunyuan.tencent.com](https://hunyuan.tencent.com/) (same site: [hy.tencent.com](https://hy.tencent.com/)). Marketing has moved from Hunyuan to **Hy**; APIs and repos still use both names.

## 2. Optional playground

**Hy AI Studio**: [aistudio.tencent.com](https://aistudio.tencent.com/). The site header “试用 Hy” / “Try Hy” lands here. Use it to hear the model, not as a production endpoint.

## 3. TokenHub: first `hy3` call in 15 minutes

Sources: [Quick start](https://cloud.tencent.com/document/product/1823/130058), [Hy call guide](https://cloud.tencent.com/document/product/1823/132252).

### 3.1 Enable the service

1. [Register for Tencent Cloud](https://cloud.tencent.com/register) and finish real-name verification (quick start “准备工作”).
2. Open the [TokenHub console](https://console.cloud.tencent.com/tokenhub) and enable the product.
3. In **Model Square**, claim the new-user free pack. Quotas follow the console and the official free-pack page — do not treat the marketing “1 million tokens” line as a fixed quota for every model.
4. **API Key management** → pick a region → **Create API Key**. Scope “all” or include `hy3`. Copy the key immediately.

TokenHub is not a Hunyuan-only gateway. It also lists DeepSeek / Kimi / GLM. This tutorial only sets `model` to `hy3`.

### 3.2 One TypeScript call

Endpoint: `https://tokenhub.tencentmaas.com/v1`. Auth: `Authorization: Bearer <API Key>`. `hy3` speaks OpenAI Chat Completions (plus Responses and Anthropic Messages per the call guide).

Official Node sample, `model` set to `hy3`, `temperature: 0.9` as in the call guide:

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENHUB_API_KEY,
  baseURL: 'https://tokenhub.tencentmaas.com/v1',
})

const response = await client.chat.completions.create({
  model: 'hy3',
  messages: [{ role: 'user', content: 'Hello. Briefly introduce yourself.' }],
  temperature: 0.9,
})

console.log(response.choices[0].message.content)
```

curl from [132252](https://cloud.tencent.com/document/product/1823/132252):

```bash
curl -X POST 'https://tokenhub.tencentmaas.com/v1/chat/completions' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${TOKENHUB_API_KEY}" \
  -d '{
    "model": "hy3",
    "messages": [{"role": "user", "content": "Hello. Briefly introduce yourself."}],
    "stream": false,
    "temperature": 0.9
  }'
```

A good response has `model: "hy3"` and text in `choices[0].message.content`. Do not commit the key.

### 3.3 Hosted specs

Sources: [model list](https://cloud.tencent.com/document/product/1823/130051), [pricing](https://cloud.tencent.com/document/product/1823/130055).

| Field | Official value |
|-------|----------------|
| `model` | `hy3` |
| Context | 256k |
| Max in / out | 192k / 128k |
| Capabilities | retained thinking, structured output, function calling, cache |
| Pay-as-you-go | input 1 / output 4 / cache hit 0.25 **CNY per million tokens** |

`hy3-preview` is similar and is marked **retired on 2026-08-31**. Do not start new work on the preview slug.

Thinking, streaming, and tools: [cookbook](./hunyuan-cookbook.md).

## 4. Point an existing coding agent at Hy3

TokenHub quick start lists Claude Code, Cursor, OpenClaw, CodeBuddy Code, Cline, Kilo Code, Roo Code. The Hy3-specific Claude Code page is [1823/131903](https://cloud.tencent.com/document/product/1823/131903).

This page does not re-teach those IDEs. Point the compatible base URL at `https://tokenhub.tencentmaas.com/v1`, set the model to `hy3`, and use a TokenHub key. How to install CodeBuddy is #78.

## 5. Open weights

Flagship open model: **Hy3** — [GitHub](https://github.com/Tencent-Hunyuan/Hy3), [Hugging Face `tencent/Hy3`](https://huggingface.co/tencent/Hy3). Apache-2.0. Contact from the README: `hunyuan_opensource@tencent.com`.

Official numbers: 295B MoE, 21B active, 3.8B MTP, 256K context, 192 experts top-8. README: full serve wants **8 GPUs**, H20-3e or larger memory. This is not an `ollama run` laptop path.

After the server is up (README Quickstart):

```python
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:8000/v1", api_key="EMPTY")

response = client.chat.completions.create(
    model="hy3",
    messages=[{"role": "user", "content": "Hello! Can you briefly introduce yourself?"}],
    temperature=0.9,
    top_p=1.0,
    extra_body={"chat_template_kwargs": {"reasoning_effort": "no_think"}},
)
print(response.choices[0].message.content)
```

Copy launch flags from the README. Parser names differ on purpose:

- vLLM: `--tool-call-parser hy_v3`, `--reasoning-parser hy_v3`
- SGLang: `--tool-call-parser hunyuan`, `--reasoning-parser hunyuan`

The same org also publishes HunyuanVideo, HunyuanImage-3.0, Hunyuan3D-2.1, HunyuanOCR. Pick the repo for the modality. Do not assume every checkpoint answers to the `hy3` slug.

## 6. Common failures

| Symptom | Check first |
|---------|-------------|
| 401 | Missing key, or a CAM SecretId instead of a TokenHub API key |
| Unknown model | `hunyuan` / `Hy3` / retiring `hy3-preview` |
| Thinking field ignored | TokenHub uses `thinking` / `reasoning_effort`; local README uses `chat_template_kwargs` |
| Looking for a CLI | There is no first-party Hunyuan CLI. The terminal agent is CodeBuddy |

Next: [cookbook](./hunyuan-cookbook.md) or [cheatsheet](./hunyuan-cheatsheet.md).
