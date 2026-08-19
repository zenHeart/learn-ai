---
title: Alibaba Cloud Model Studio map
description: Model Studio is the API and app platform, not the chat app and not the IDE. Decide API vs plan vs console first.
domain: product
tags:
  - model-platform
role: map
---

# Alibaba Cloud Model Studio map

> **Alibaba Cloud Model Studio** (百炼) is a one-stop model and application platform: developers call OpenAI-compatible APIs; operators build agents and knowledge-base Q&A in the console. [Product introduction](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)
>
> This page only answers "what am I doing → which slice of Model Studio". Operations live in the [tutorial](./bailian). Tables live in the [cheatsheet](./bailian-cheatsheet). Name collisions live in the [glossary](./bailian-glossary).
>
> Model internals are out of scope. See [LLM fundamentals](/tech/fundamentals/LLM) and [Learn LLM](https://llm.zenheart.site/chapters/).

## Product map

```
Alibaba Cloud AI (this directory documents Model Studio only)
├── Model Studio (this set)
│   ├── Console / playground
│   ├── Model APIs (OpenAI-compatible / Anthropic-compatible / DashScope)
│   ├── Token Plan / Coding Plan
│   ├── Agents / workflows / knowledge base / MCP
│   ├── Model Studio CLI (`bl` / `bailian`)
│   └── Fine-tune / deploy / evaluate (one line, no how-to)
├── Qwen chat — separate product, issue #83, no tutorial here
├── Tongyi Lingma / Qoder CN (formerly Lingma) — IDE, issue #84, no tutorial here
└── Not this site: ECS / OSS / PAI / DashVector / GBI / Quanmiao
```

| Official first-level entry | This site |
|----------------------------|-----------|
| Product intro, first API call, playground | [Tutorial](./bailian) |
| Model list, billing, Token Plan, Coding Plan, regions | [Cheatsheet](./bailian-cheatsheet) |
| Clients / tools, free-quota stop, CLI, no-code Q&A | [Cookbook](./bailian-cookbook) |
| Agent 1.0 / 2.0, workspace, three protocols, two plans | [Glossary](./bailian-glossary) |
| Fine-tune / deploy / evaluate | Official docs only |
| Qwen chat | One line → #83 |
| Qoder CN (formerly Lingma) | One line → #84 |
| ECS / OSS / PAI / GBI / Quanmiao | **Not this site** |

### Quick decision

```
What am I trying to do?
├── Call Qwen or a third-party model from my front end / Node service
│   └── → Model Studio API (OpenAI-compatible) → [tutorial](./bailian)
├── Feed Alibaba Cloud quota into Claude Code / Cursor / Chatbox
│   └── → Token Plan (what the official overview recommends for new buys) or Coding Plan
│       └── Key and base URL must be a pair → [Cookbook](./bailian-cookbook)
├── No code, a knowledge-base Q&A or agent
│   └── → Console apps (prefer Agent 2.0)
├── Let a local agent drive image / video / speech tools
│   └── → Model Studio CLI (`bl`)
├── Just chat with Tongyi, no API
│   └── → Qwen (#83), not Model Studio
├── An Alibaba-branded coding IDE
│   └── → Qoder CN / Lingma (#84), not Model Studio
└── A VM or object storage
    └── → Not this site. No ECS / OSS handbook here
```

Three expensive mix-ups:

| Easy to confuse | Difference |
|-----------------|------------|
| **Model Studio** vs **Qwen** | Studio is the platform. Qwen is a model family and a separate chat product. [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio) |
| **Model Studio** vs **Lingma / Qoder CN** | Qoder CN is the IDE. It can *consume* a Studio key. It is not Studio. [Official page](https://help.aliyun.com/zh/model-studio/lingma-agent) |
| **Pay-as-you-go key** vs **plan key** | PAYG is `sk-` / `sk-ws`. Coding Plan / Token Plan dedicated keys are `sk-sp-`. A mismatched host either returns `invalid_api_key` or **bills PAYG**. [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) |

## Which page

| Page | Type | When |
|------|------|------|
| [Tutorial](./bailian) | Tutorial | First time: activate → key → first Node call |
| [Cookbook](./bailian-cookbook) | How-to | You can already call; you have a concrete problem |
| [Cheatsheet](./bailian-cheatsheet) | Reference | Regions, URLs, plan table, official links |
| [Glossary](./bailian-glossary) | Explanation | Two names collided, or two official pages disagree |

## Suggested order

1. Use the tree above. Confirm you want the platform, not Qwen chat or Lingma.
2. Walk the [tutorial](./bailian): primary account, key, env var, one `qwen-plus` call.
3. Product integration → [Cookbook · OpenAI-compatible](./bailian-cookbook). Coding tools → [Cookbook · do not mix keys](./bailian-cookbook).
4. Look up IDs only on the [cheatsheet](./bailian-cheatsheet) and the official model list. Do not pin a full model table in notes.

## Official links

- [China product page](https://www.aliyun.com/product/bailian)
- [What is Model Studio (EN)](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)
- [What is Model Studio (ZH)](https://help.aliyun.com/zh/model-studio/what-is-model-studio)
- [Models](https://www.alibabacloud.com/help/en/model-studio/models)
- [Console](https://bailian.console.aliyun.com/)
