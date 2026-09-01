---
title: LLM 基础
description: "LLM 是文本进、文本出的 API。本页只建立概念并接到产品。注意力和训练见 Learn LLM 第 4–8 章。"
domain: tech
tags:
  - fundamentals
llm:
  - 4
  - 7
  - 8
---

# LLM 基础

**结论**：把它当成一个 **无状态的文本 API**。你不训模型；你组消息、pin 快照、按 token 付账。

> 注意力、BPE、TinyGPT 训练见 Learn LLM [第 4–8 章](https://llm.zenheart.site/chapters/)。本页只服务「怎么接到产品」。

## 概念

| 词 | 你当什么用 |
|---|---|
| **LLM** | `messages` 进，文本出。不会自己记住上一轮，除非你把历史再发回去 |
| **Token** | 计费和窗口的单位。中文大约 1–2 字 / token，先按 `length / 2` 估，上线再用厂商计数 API |
| **推理** | 你每次 API 调用做的事。训练是厂商的事 |
| **温度** | 代码 / 抽取用低（0–0.3）；文案可以用高。不要靠调温度修提示没写清 |

## 工程上怎么接

```ts
import OpenAI from 'openai'

const client = new OpenAI()

export async function complete(user: string) {
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL!, // 在环境里 pin 快照，不要写死过期型号
    temperature: 0.2,
    messages: [
      { role: 'system', content: '你只根据用户给出的代码回答。不要编造仓库里不存在的文件。' },
      { role: 'user', content: user }
    ]
  })
  const text = response.choices[0]?.message?.content
  if (!text) throw new Error('empty completion')
  return text
}
```

1. **Pin 快照。** 生产不要追 `latest`。换代是一次发版，带着测试。
2. **历史你自己带。** 模型不记得上一轮。聊天 UI 要把 `messages` 数组存下来再发。
3. **不要把整个仓库塞进去。** 窗口有上限，见 [上下文窗口](/zh/tech/fundamentals/context)。
4. **输出要进代码** → [稳住结构 · JSON](/zh/tech/prompt/json-prompt-best-practices)。

## 常见陷阱

- 把「幻觉」当 Bug 单修。先查提示有没有成功标准和引用约束。
- 用 GPT-3.5 / GPT-4 对照表做架构决策。型号页每周都变，以厂商当天文档为准。
- 在提示里解释 Transformer。用户不关心，窗口却被占掉。

## 下一步

- 窗口怎么裁 → [上下文窗口](/zh/tech/fundamentals/context) · [上下文工程](/zh/tech/fundamentals/context-engineering)
- 怎么写提示 → [Prompt](/zh/tech/prompt/)
- 接到 React → [集成](/zh/integration/apis/)
