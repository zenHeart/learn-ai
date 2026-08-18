---
title: Tencent Hunyuan cookbook
description: "Recipes that exist on the TokenHub Hy call guide or the Hy3 README. Third-party model shopping is out of scope."
domain: product
tags:
  - hunyuan
  - llm-api
role: cookbook
---

# Tencent Hunyuan cookbook

One problem per section. Enablement is in the [tutorial](./hunyuan.md). Tables are in the [cheatsheet](./hunyuan-cheatsheet.md).

## Streaming

Source: [Hy call guide · streaming](https://cloud.tencent.com/document/product/1823/132252). Set `stream: true`. To receive `usage` on the last chunk, add `stream_options: { include_usage: true }`.

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENHUB_API_KEY,
  baseURL: 'https://tokenhub.tencentmaas.com/v1',
})

const stream = await client.chat.completions.create({
  model: 'hy3',
  messages: [{ role: 'user', content: 'Hello' }],
  stream: true,
  stream_options: { include_usage: true },
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? '')
  if (chunk.usage) console.log('\nusage:', chunk.usage)
}
```

## Turn thinking on

TokenHub documents two knobs on [132252](https://cloud.tencent.com/document/product/1823/132252):

1. `thinking: { type: "enabled" }` — read `message.reasoning_content`.
2. `reasoning_effort` — `hy3` / `hy3-preview` **default to `low`**. You may set `high`.

Official Node sample puts `thinking` at the top level:

```ts
const response = await client.chat.completions.create({
  model: 'hy3',
  messages: [
    { role: 'user', content: 'A has 5 apples, gives 2 to B, then buys 3. How many remain?' },
  ],
  thinking: { type: 'enabled' },
})

const msg = response.choices[0].message
if (msg.reasoning_content) console.log('reasoning:', msg.reasoning_content)
console.log('answer:', msg.content)
```

**Tool-call exception (official wording):** on Hy3 GA, sending `tools` enables adaptive thinking. If you still send `reasoning_effort: "low"`, the API **maps `low` to `high`**. Do not reconcile invoices against the value you typed.

Open-weight serving uses `extra_body.chat_template_kwargs.reasoning_effort` (`no_think` / `low` / `high`). That is not the same JSON as TokenHub. See the [glossary](./hunyuan-glossary.md).

## Function calling

The call guide’s Function Calling section uses OpenAI-style `tools`. Keep the protocol fields; swap the function body for your backend.

```ts
const response = await client.chat.completions.create({
  model: 'hy3',
  messages: [{ role: 'user', content: 'What is the weather in Beijing today?' }],
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Look up weather by city',
        parameters: {
          type: 'object',
          properties: {
            city: { type: 'string', description: 'City name' },
          },
          required: ['city'],
        },
      },
    },
  ],
})
```

Copy request/response field names from [132252](https://cloud.tencent.com/document/product/1823/132252). This page does not invent a second schema.

## Structured output

The same call guide lists structured output as a `hy3` capability. How JSON Schema is attached is defined there and in TokenHub’s API protocol page. Do not guess field names from another vendor’s `response_format` tutorial.

## Claude Code

Official page: [Call from Claude Code (Hy3)](https://cloud.tencent.com/document/product/1823/131903). Quick start also links Cursor, OpenClaw, Cline, Kilo Code, Roo Code, and CodeBuddy Code.

Remember three facts:

1. The base URL is TokenHub’s OpenAI or Anthropic-compatible host, not `api.anthropic.com`.
2. The model id is `hy3`, not `hunyuan`.
3. The key is a TokenHub API key. CodeBuddy install steps belong in #78.

Do not fork a `settings.json` onto this site; 131903 will move.

## Serve open Hy3 (only if you have the GPUs)

Source: [Hy3 README](https://github.com/Tencent-Hunyuan/Hy3). Official suggestion: 8 GPUs, H20-3e class.

vLLM (parser name `hy_v3`):

```bash
export VLLM_FLASHINFER_ALLREDUCE_BACKEND=trtllm
vllm serve tencent/Hy3 \
  --tensor-parallel-size 8 \
  --speculative-config.method mtp \
  --speculative-config.num_speculative_tokens 2 \
  --tool-call-parser hy_v3 \
  --reasoning-parser hy_v3 \
  --enable-auto-tool-choice \
  --port 8000 \
  --served-model-name hy3
```

SGLang (parser name `hunyuan`):

```bash
python3 -m sglang.launch_server \
  --model tencent/Hy3 \
  --tp-size 8 \
  --tool-call-parser hunyuan \
  --reasoning-parser hunyuan \
  --speculative-num-steps 2 \
  --speculative-eagle-topk 1 \
  --speculative-num-draft-tokens 3 \
  --speculative-algorithm EAGLE \
  --port 8000 \
  --served-model-name hy3
```

Do not mix parser names. Recommended sampling from the README: `temperature=0.9`, `top_p=1.0`.

## Recipes that do not belong here

- Choosing DeepSeek / Kimi / GLM on TokenHub.
- Yuanbao model switcher or CodeBuddy plugins.
- Treating 1729-era `hunyuan-turbo` / `Hunyuan-T1` as the current default.
