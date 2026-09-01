---
title: 怎么把模型接到产品
description: "先定任务再挑一家 API，先会流式再上框架。型号与价格以官方当天页为准。"
domain: tech
tags:
  - api
llm:
  - 14
  - 17
prev: false
next:
  text: 流式
  link: /zh/integration/apis/streaming
---

# 怎么把模型接到产品

**结论**：先定「这个功能要编码、长上下文，还是便宜聊天」，再挑 **一家** API。先会 `fetch` + 流式，再上 SDK。

> 消息结构、function calling 往返、SSE 见 Learn LLM [第 14、17 章](https://llm.zenheart.site/chapters/14-llm-api)。本页只排前端怎么接。

## 这一栏怎么读

```
本页（挑一家 + 最小请求）
  → 1. OpenAI / Anthropic 其中一家的指南
  → 2. 流式（用户先看到字）
  → 3. Vercel AI SDK（React / Next 默认）
  → 4. 工具调用（要动手时）
  → 附录：LangChain / Next / HuggingFace
```

| 你卡在哪 | 读什么 |
|---|---|
| 还没发过第一条请求 | 下面的最小例子 + [OpenAI](/zh/integration/apis/openai) 或 [Anthropic](/zh/integration/apis/anthropic) |
| 接口通了，UI 要等整段才出 | [流式](/zh/integration/apis/streaming) |
| 要在 React 里接聊天 | [Vercel AI SDK](/zh/integration/frameworks/vercel-ai-sdk) |
| 模型要查天气 / 改库存 | [工具调用](/zh/integration/protocols/tool-calling) |
| 工作流已经绕、要换模型 | [LangChain.js](/zh/integration/frameworks/langchain-js) |

## 怎么挑（不要背价格表）

价格和窗口每天都变。打开厂商定价页，按任务选：

| 任务 | 先看哪一家 | 不要一上来就 |
|---|---|---|
| 编码、按指令办事 | Anthropic | 为「更聪明」同时接三家 |
| 结构化 JSON、工具多 | OpenAI 兼容端点 | 用提示硬拧 JSON，见 [稳住结构](/zh/tech/prompt/json-prompt-best-practices) |
| 超长文档 / 视频 | Gemini 官方型号页 | 把整本 PDF 当默认架构 |
| 只要便宜聊天 | 各家 mini / flash | 旗舰模型跑摘要 |

选好一家就 pin 快照。换代是发版，不是改一行 env 完事。

## 最小请求

```ts
export async function chatOnce(input: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL,
      stream: false,
      messages: [{ role: 'user', content: input }]
    })
  })
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)
  const json = await response.json()
  return json.choices[0].message.content as string
}
```

密钥只放服务端。浏览器直连厂商会把 key 漏出去，见 [安全](/zh/tech/engineering/security)。

## 常见陷阱

- 先注册三家再想功能。
- 把 2024/2025 的 GPT-4o / Claude 3.5 对照表写进架构文档当永久事实。
- 不会流式就上 LangChain。多数前端项目 [Vercel AI SDK](/zh/integration/frameworks/vercel-ai-sdk) 够用。
- 429 不退避。见本页后的厂商指南和 [成本](/zh/tech/engineering/cost-optimization)。

## 下一步

1. [OpenAI](/zh/integration/apis/openai) 或 [Anthropic](/zh/integration/apis/anthropic)
2. [流式](/zh/integration/apis/streaming) → [Vercel AI SDK](/zh/integration/frameworks/vercel-ai-sdk)
3. 文档必须进回答 → [RAG](/zh/tech/patterns/RAG)
