---
title: Zhipu Qingyan / Z.ai learning map
description:" \"Audience: frontend engineers picking a Zhipu chat surface. The path here is Qingyan and Z.ai chat, not GLM Coding Plan.\""
domain: product
tags:
  - coding-agent
role: map
---

# Zhipu Qingyan / Z.ai learning map

> **Zhipu Qingyan** (智谱清言) is Zhipu's China chat assistant. Official line ([chatglm.cn](https://chatglm.cn)):
> it is based on GLM models, "not just an AI assistant, but an Agent that gets things done."
>
> **Z.ai** is the international chat surface. Official title ([chat.z.ai](https://chat.z.ai)):
> "Z.ai - Advanced AI Chatbot & Agent powered by GLM-5.2"
>
> This directory is the Claude.ai analog. It is **not** GLM Coding Plan and not ZCode / AutoClaw. The coding subscription is one row on the map.

## Goals and non-goals

**Audience:** frontend engineers who need the right official door. You need a browser or the Qingyan app, not a repo.

**Goals:** list official first-party AI surfaces and get you into Qingyan / Z.ai chat.

**Non-goals:** Coding Plan install, API quickstart, model internals (see [Learn LLM](/tech/fundamentals/LLM)), invented daily quotas or RMB prices.

## Product landscape

Zhipu (company site [zhipuai.cn](https://www.zhipuai.cn/zh)) ships more than one AI skin. They are **not** the same chat window.

```
Zhipu / Z.ai
├── Chat (this directory)
│   ├── Qingyan — chatglm.cn and the official app
│   └── Z.ai — chat.z.ai / z.ai
├── Coding subscription / desktop coding
│   ├── GLM Coding Plan — quota for Claude Code and similar tools
│   └── ZCode — official coding tool
├── Agent / office
│   ├── AutoGLM
│   └── AutoClaw (local OpenClaw client)
├── Open platform / API
│   ├── BigModel (bigmodel.cn)
│   └── docs.z.ai
└── Other official AI entries (one map row each)
    ├── Zread.ai
    ├── AMiner
    ├── Zhipu Learning Center
    ├── Zhipu AI IME
    ├── CodeGeeX
    └── Open GLM weights
```

| Product | What it is | Entry | This site |
|---------|------------|-------|-----------|
| **Qingyan** | China chat / agent assistant | [chatglm.cn](https://chatglm.cn) | [Tutorial](./zhipu-chat.md) |
| **Z.ai chat** | International chat / agent assistant | [chat.z.ai](https://chat.z.ai) | Same tutorial |
| **GLM Coding Plan** | Coding-tool subscription, not a chat install | [z.ai/subscribe](https://z.ai/subscribe), [bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding) | One map row (#75) |
| **ZCode** | Official coding tool | [zcode.z.ai/cn](https://zcode.z.ai/cn) | One map row |
| **AutoGLM / AutoClaw** | Reports / browser agent / local client | [autoglm.zhipuai.cn](https://autoglm.zhipuai.cn) | One map row |
| **BigModel / Z.ai API** | Model HTTP APIs | [bigmodel.cn](https://bigmodel.cn), [docs.z.ai](https://docs.z.ai) | One map row |
| **Zread.ai / AMiner / Learning Center / AI IME** | Named on the company product rail | [zhipuai.cn/zh](https://www.zhipuai.cn/zh) | One map row; use the company page for URLs |
| **CodeGeeX** | Coding assistant (official news) | [company news](https://www.zhipuai.cn/en/news/20) | One map row |
| **Open GLM** | Model weights | [github.com/zai-org/GLM-5](https://github.com/zai-org/GLM-5) | One map row |
| Business / IR / jobs | Not an AI handbook | Company site | **Out of scope** |

Official "try it online" copy ([GLM-5.2 research post](https://www.zhipuai.cn/zh/research/161)): **Z.ai = chat.z.ai**, **Qingyan app/web = chatglm.cn**.

**Name collisions:**

- **Qingyan ≠ Z.ai chat.** Two doors, two legal entities. No official "one login".
- **ChatGLM** is a historical model / store-copy name, not the URL you type.
- **In-chat code ≠ GLM Coding Plan.** The latter is quota for Claude Code and similar tools. See #75.
- **AutoGLM ≠ AutoClaw.** The company page lists both.

Details: [glossary](./zhipu-chat-glossary.md).

### Quick decision

```
What do you need?
├── Chat / write / read images or docs / slides or research reports
│   ├── China product surface → Qingyan (chatglm.cn or the official app)
│   └── International Z.ai surface → chat.z.ai
├── GLM quota inside Claude Code / Cline / similar
│   └── → GLM Coding Plan (not documented here)
├── Official desktop coding tool
│   └── → ZCode
├── Reports / browser automation / local OpenClaw client
│   └── → AutoGLM / AutoClaw
└── Call the model from your own software
    └── → BigModel or docs.z.ai API
```

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Pick the door | Decision tree above | Do not open Coding Plan as if it were Qingyan |
| 2. Use chat | [Qingyan / Z.ai tutorial](./zhipu-chat.md) | Sign in, send the first message, recognize the chips |
| 3. Look up URLs | [Cheatsheet](./zhipu-chat-cheatsheet.md) | Entries, decisions, sources |
| 4. Names collide | [Glossary](./zhipu-chat-glossary.md) | Qingyan / Z.ai / ChatGLM / Coding Plan |

No cookbook: there is no official how-to tree dense enough to split.

## Related pages

- [Qingyan / Z.ai tutorial](./zhipu-chat.md)
- [Cheatsheet](./zhipu-chat-cheatsheet.md)
- [Glossary](./zhipu-chat-glossary.md)
- [All products](../index.md)
