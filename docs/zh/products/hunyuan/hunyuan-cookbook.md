---
title: 腾讯混元 Cookbook
description: "只写能在 TokenHub 混元调用指南或 Hy3 README 里找到原文的配方。第三方模型选型不在这里。"
domain: product
tags:
  - hunyuan
  - llm-api
role: cookbook
---

# 腾讯混元 Cookbook

每节一个问题。基础开通见 [教程](./hunyuan.md)。参数表见 [速查](./hunyuan-cheatsheet.md)。

## 流式输出

来源：[混元调用指南 · 流式请求](https://cloud.tencent.com/document/product/1823/132252)。`stream: true`；要在最后一个 chunk 拿 `usage`，加 `stream_options: { include_usage: true }`。

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENHUB_API_KEY,
  baseURL: 'https://tokenhub.tencentmaas.com/v1',
})

const stream = await client.chat.completions.create({
  model: 'hy3',
  messages: [{ role: 'user', content: '你好' }],
  stream: true,
  stream_options: { include_usage: true },
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? '')
  if (chunk.usage) console.log('\nusage:', chunk.usage)
}
```

## 打开深度思考

TokenHub 给了两套旋钮，都写在 [132252](https://cloud.tencent.com/document/product/1823/132252)：

1. `thinking: { type: "enabled" }`，响应里用 `message.reasoning_content` 看思考过程。
2. `reasoning_effort`：`hy3` / `hy3-preview` **默认 `low`**。可设 `high`。

Node 官方示例把 `thinking` 放在请求顶层：

```ts
const response = await client.chat.completions.create({
  model: 'hy3',
  messages: [
    { role: 'user', content: '小明有5个苹果，给了小红2个，又买了3个，最后还剩几个？' },
  ],
  thinking: { type: 'enabled' },
})

const msg = response.choices[0].message
if (msg.reasoning_content) console.log('思考过程:', msg.reasoning_content)
console.log('最终回答:', msg.content)
```

**toolcall 特例（官方原文）**：Hy3 正式版在携带 `tools` 时具备 adaptive thinking。若此时把 `reasoning_effort` 设为 `low`，API **会把 `low` 映射为 `high`**。不要按「我设了 low」去对账单。

开源权重那条线用的是 `extra_body.chat_template_kwargs.reasoning_effort`（`no_think` / `low` / `high`），和 TokenHub 字段不是同一份 JSON。见 [术语表](./hunyuan-glossary.md)。

## Function Calling

调用指南「工具调用（Function Calling）」节要求走 OpenAI 风格的 `tools`。下面只保留官方结构，函数体换成前端常见的「查天气」占位，**工具名与参数以你自己的后端为准**；协议字段不要改。

```ts
const response = await client.chat.completions.create({
  model: 'hy3',
  messages: [{ role: 'user', content: '北京今天天气怎么样？' }],
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: '查询城市天气',
        parameters: {
          type: 'object',
          properties: {
            city: { type: 'string', description: '城市名' },
          },
          required: ['city'],
        },
      },
    },
  ],
})
```

具体 request / response 字段以 [132252](https://cloud.tencent.com/document/product/1823/132252) 当页示例为准，本页不二次发明。

## 结构化输出

同一篇调用指南把「结构化输出」列为 `hy3` 能力。JSON Schema 怎么塞进请求，以该页和 TokenHub「API 协议说明」为准。不要从别的厂商的 `response_format` 教程里猜字段名。

## 把 Hy3 接到 Claude Code

官方专项页：[在 Claude Code 中调用（Hy3 示例）](https://cloud.tencent.com/document/product/1823/131903)。快速入门还链了 Cursor、OpenClaw、Cline、Kilo Code、Roo Code、CodeBuddy Code。

本站只记三件事：

1. Base URL 是 TokenHub 的 OpenAI 或 Anthropic 兼容口，不是 `api.anthropic.com`。
2. 模型 ID 写 `hy3`，不要写 `hunyuan`。
3. Key 是 TokenHub API Key。CodeBuddy 自己怎么装，见 #78，不要混进这份配方。

逐步点击以 131903 为准——TokenHub 文档会改路径，不要在本站再抄一份会过期的 `settings.json`。

## 本机 serve 开源 Hy3（有卡再做）

来源：[Hy3 README](https://github.com/Tencent-Hunyuan/Hy3)。官方建议 8 卡、H20-3e 级。

vLLM（parser 名是 `hy_v3`）：

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

SGLang（parser 名是 `hunyuan`）：

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

两套命令不要混用 parser 名。推荐采样：`temperature=0.9`，`top_p=1.0`。

## 不要写进本页的配方

- TokenHub 上选 DeepSeek / Kimi / GLM（不是混元）。
- 元宝里切模型、CodeBuddy 装插件。
- 把 1729 老文档里的 `hunyuan-turbo` / `Hunyuan-T1` 当当前默认。
