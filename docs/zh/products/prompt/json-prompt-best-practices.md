---
title: 稳住结构 · JSON
description: "产品里要解析模型输出时，用 Structured Outputs / Schema。JSON mode 只保证括号配对，已被官方标成旧路径。"
domain: tech
tags:
  - prompt
navOrder: 20
llm:
  - 15
prev:
  text: 说清楚 · Claude 官方
  link: /tech/prompt/claude-prompt-best-practices
next:
  text: 写给仓库 · AGENTS.md
  link: /zh/tech/prompt/agents-doc
---

# 稳住结构 · JSON

**结论**：输出要进 TypeScript，就走 **Structured Outputs / Schema**。不要在提示里吼「必须是合法 JSON」。

> **路径位置**：主路径第 2 步。四块骨架先在 [怎么写 Prompt](/zh/tech/prompt/) 写清。
>
> 三档保证差异（自由文本 / JSON mode / strict schema）见 Learn LLM [第 15 章 A3](https://llm.zenheart.site/chapters/15-prompt-memory)。本页只写前端怎么接。

## 概念：三档里你该站哪一档

| 档 | API 在做什么 | 工程上能不能当合同 |
|---|---|---|
| 提示里写「请输出 JSON」 | 无 | 不能。常包 \`\`\`json、缺逗号、多客套话 |
| `response_format: { type: 'json_object' }` | 只保证能 `JSON.parse` | **不能当字段合同**。官方已标 legacy |
| `json_schema` + `strict: true` | 解码时按 schema 采样 | **产品默认档**。字段、类型、必填有保证 |

`minimum` / `pattern` 等约束，OpenAI 会收下但不强制。数值范围仍要在解析后自己校验。详见第 15 章，这里不展开。

## 工程做法：TypeScript + Schema

把上一页的工单收口成可 parse 的对象。模型名 **pin 快照**，以你账号里当前可用的官方型号为准。

```ts
import OpenAI from 'openai'

const ticketSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    severity: { type: 'string', enum: ['low', 'medium', 'high'] },
    area: { type: 'string', enum: ['ui', 'api', 'auth', 'other'] },
    summary: { type: 'string' },
    nextAction: { type: 'string' }
  },
  required: ['severity', 'area', 'summary', 'nextAction']
} as const

export async function extractTicket(feedback: string) {
  const client = new OpenAI()

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL!, // 在环境里 pin 快照，不要写死过期型号
    messages: [
      {
        role: 'system',
        content: `你把用户反馈收成工单。只根据原文判断。
复现不足时，nextAction 必须以「向用户要：」开头。`
      },
      { role: 'user', content: `<input>${feedback}</input>` }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'ticket',
        strict: true,
        schema: ticketSchema
      }
    }
  })

  const raw = response.choices[0]?.message?.content
  if (!raw) throw new Error('empty model output')
  return JSON.parse(raw) as {
    severity: 'low' | 'medium' | 'high'
    area: 'ui' | 'api' | 'auth' | 'other'
    summary: string
    nextAction: string
  }
}
```

Gemini 走 [structured output](https://ai.google.dev/gemini-api/docs/structured-output)，同样把 schema 交给 API，不要只靠自然语言。Claude 用 tool / output 约束，不要用 assistant prefill 卡 `{`——4.6 之后 prefill 会 400。

## 工具怎么选

| 你在做 | 用什么 |
|---|---|
| Next / Node 产品，OpenAI 兼容端点 | 上面的 `json_schema` |
| Vercel AI SDK | 框架的 `generateObject` / schema（见 [Vercel AI SDK](/zh/integration/frameworks/vercel-ai-sdk)） |
| 只要助手在仓库里吐一段 JSON 给你看 | 对话里写字段即可，不必上 API |
| 还在用 `json_object` 旧代码 | 当过渡；新代码不要再加 |

## 实战验收

1. 用上一节函数跑两条：一条信息齐全，一条缺复现。缺复现时 `nextAction` 必须以「向用户要：」开头。
2. 故意把 schema 里的 `severity` 改成只允许 `'low'`，确认模型不再发明 `'critical'`。
3. 解析后再做一次本地校验（枚举、字符串非空）。不要把 `pattern` 寄托在厂商 schema 上。
4. 把 `extractTicket` 和一条 fixture 推进 CI。提示改了字段名，测试要红。

## 常见陷阱

- **把 JSON mode 当 Schema**。能 parse ≠ 有 `area` 字段。
- **提示里再画一遍 schema**。合同以 API 字段为准；提示只写行为（「缺信息就去要」）。
- **用 tool calling 硬拧结构，却忘了这是工具而不是最终回复**。要对用户展示的 JSON，走 `response_format`。
- **正文里的 `gpt-4-turbo` + `json_object` 示例**是旧路径。本页不再推荐。

## 下一步

- 仓库级规矩 → [AGENTS.md](/zh/tech/prompt/agents-doc)
- 接到流式 UI → [流式](/zh/integration/apis/streaming)
- 机制对照 → Learn LLM [第 15 章 A3](https://llm.zenheart.site/chapters/15-prompt-memory)
