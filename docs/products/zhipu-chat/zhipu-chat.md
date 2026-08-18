---
title: Qingyan / Z.ai chat
description:" \"Audience: frontend engineers using Zhipu's assistant in a browser or the official app. No repo required.\""
domain: product
tags:
  - coding-agent
role: tutorial
---

# Qingyan / Z.ai chat

> This page is a product map from official product pages, the paid-service agreement, store listings, and model posts. Claude.ai analog.
>
> It is **not** GLM Coding Plan and not ZCode. The coding subscription is one row on the [learning map](./index.md).

## Goals and non-goals

**Audience:** frontend engineers. You need a browser or the Qingyan app.

**Goals:** say what the two official chat doors are, what they claim to do, and where accounts / billing stop.

**Non-goals:** Coding Plan install, API SDKs, invented daily caps / token limits / current membership prices, model internals (see [Learn LLM](/tech/fundamentals/LLM)).

## Prerequisites

- You can open [chatglm.cn](https://chatglm.cn) or [chat.z.ai](https://chat.z.ai)
- China surface: whatever sign-in Qingyan shows (phone / WeChat, etc.). International surface: whatever Z.ai shows
- No git checkout. No API key

## Learning objectives

- Pick Qingyan vs Z.ai
- Send the first message and recognize official chips
- Know which account holds membership, and why open-platform credit is not Qingyan membership

## What it is

One chat job, two official doors. Official "try it online" wording ([GLM-5.2 research post](https://www.zhipuai.cn/zh/research/161)):

| Door | Official label | URL |
|------|----------------|-----|
| China | Qingyan app / web | [chatglm.cn](https://chatglm.cn) |
| International | Z.ai | [chat.z.ai](https://chat.z.ai) |

Clients (only what official pages name):

| Client | Source |
|--------|--------|
| Web | [chatglm.cn](https://chatglm.cn), [chat.z.ai](https://chat.z.ai) |
| Official app | [chatglm.cn/download](https://chatglm.cn/download); App Store [Qingyan](https://apps.apple.com/cn/app/id6450893458) |
| Browser extension | Chrome Web Store "智谱清言：ChatGLM & AutoGLM" |

There is **no** official "install Qingyan as a repo CLI" path on these pages. Code in the thread is still chat, not a checkout agent.

## Qingyan: open and talk

1. Open [chatglm.cn](https://chatglm.cn).
2. Sign in. The paid-service agreement scopes the service to the **chatglm.cn website and the Qingyan app** ([agreement](https://chatglm.cn/pay/policy/vipservice) §1.5).
3. Ask in the box. The footer points at the [user agreement](https://chatglm.cn/agreement) and [privacy policy](https://chatglm.cn/privacypolicy).

Chips visible on the homepage on 2026-08-19:

| Chip | What the official page actually shows |
|------|----------------------------------------|
| **Agent** | Homepage positioning is an Agent that delivers results |
| **研究报告** (research report) | Homepage entry |
| **PPT制作** (slides) | Homepage entry |
| **数据分析** (data analysis) | Homepage entry |
| **GLM-5.2 / GLM-5.2快速** | Model names on the page; trust what your account can actually select |

The download page adds ([chatglm.cn/download](https://chatglm.cn/download)): chat, writing, programming, understanding images and documents; "chat, or call tools for complex tasks."

Paid-agreement **kinds** of benefits (§1.6, §4.1 — not quota numbers):

- Model-related benefits
- Agent benefits
- Qingying video generation
- Video calls
- Larger cloud knowledge-base space
- More AI image-generation features

**Counts, credits, and whether the SKU is still called VIP/SVIP live on the in-product membership page.** The agreement says Zhipu may change benefits and prices; read the live service page.

The App Store listing also groups Q&A, writing, study, workplace, programming, and role-play. That is store copy, not a command list.

### Browser extension

Official name: **智谱清言：ChatGLM & AutoGLM** (Chrome Web Store, publisher zhipuextension). Store copy: sidebar Q&A, page summary, page chat, selection explain/summarize/translate, writing helper, checked-text summary, on-site advanced search. Plugin policy: [chatglm.cn/advanced-authpolicy](https://chatglm.cn/advanced-authpolicy).

## Z.ai: international chat

1. Open [chat.z.ai](https://chat.z.ai) or [z.ai](https://z.ai) (top nav **Chat**).
2. Sign in as the page asks. The z.ai top nav also has **Chat / API / Coding Plan / Contact / Docs** ([z.ai/company](https://z.ai/company)). **Chat** is this page. **Coding Plan** and **Docs** are not the Qingyan tutorial.

Official description:

> Meet Z.ai, the AI assistant powered by GLM-5.2. Build websites, write code, handle long-horizon tasks, and get instant answers.

Chips visible on 2026-08-19: **Magic Design**, **Full-Stack**, **Write Code**.

Official blog lines that survive a source check:

- [glm-4.5](https://z.ai/blog/glm-4.5): pick the model on Z.ai to chat; the platform supports artifacts, presentation slides, and full-stack development.
- [glm-5.2](https://z.ai/blog/glm-5.2): "Chat with GLM-5.2 on Z.ai". The same post puts Coding Plan / ZCode on a different path.

Legal text: [Terms of Use](https://docs.z.ai/legal-agreement/terms-of-use) (JINGSHENG HENGXING TECHNOLOGY PTE.LTD). That document covers the platform / API. **Do not** read China Qingyan membership rules out of it.

## Accounts and paid features (agreement text only)

Traps that matter, from the Qingyan paid-service agreement (effective 2026-05-21):

| Rule | Official point |
|------|----------------|
| Benefits follow the account | If you have several Qingyan accounts, benefits go to the **account you were signed into when you paid**. Records do **not** move across accounts (§3.1, §3.2.2) |
| Not the same as the open platform | Qingyan membership and other Zhipu paid products ("including but not limited to the Zhipu AI open platform") are **independent**. Overlap can stack; **no refund** for the overlap (§4.4) |
| Price is on the page | Fees, discounts, and payment methods can change; trust the service page (§4.7) |
| Default: no refund | Paid services are not returnable / cashable. Duplicate charges or official technical failure: support appeal (§4.5, §4.8.1) |
| Devices differ | App version, device, and OS can change which benefits you actually see (§4.6) |

The App Store has listed IAPs (auto-renew month, month card, Qingying agent, etc.). **SKUs move.** Do not treat one day's screenshot as the price list. Check the [App Store page](https://apps.apple.com/cn/app/id6450893458) or the in-product membership page.

**Do not assume** Qingyan membership = Z.ai login = Coding Plan quota. Official pages do not say that.

## Nearby surfaces (do not mix them)

| Surface | What it is | Where |
|---------|------------|-------|
| **Qingyan / Z.ai chat** | This page | chatglm.cn / chat.z.ai |
| **GLM Coding Plan** | Subscription for coding tools | [z.ai/subscribe](https://z.ai/subscribe) — no install steps here |
| **ZCode** | Official coding tool | [zcode.z.ai/cn](https://zcode.z.ai/cn) |
| **AutoGLM / AutoClaw** | Report assistant / local client | [autoglm.zhipuai.cn](https://autoglm.zhipuai.cn) |
| **API** | Model HTTP APIs | [docs.z.ai](https://docs.z.ai), [docs.bigmodel.cn](https://docs.bigmodel.cn) |

## Common pitfalls

- Opening [z.ai/subscribe](https://z.ai/subscribe) or [bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding) and thinking you configured Qingyan web.
- Buying on account A, signing into the web as B, then assuming the subscription vanished. The agreement says benefits do not migrate.
- Treating open-platform / Coding Plan balance as Qingyan turns. The agreement says the paid products are independent.
- Treating HTML or a script in the thread as a commit in your repo.
- Copying third-party "50 turns / day" or a blog RMB price as official spec.

## Official docs

| Page | Use |
|------|-----|
| [chatglm.cn](https://chatglm.cn) | Qingyan product |
| [chatglm.cn/download](https://chatglm.cn/download) | App / client entry |
| [Paid-service agreement](https://chatglm.cn/pay/policy/vipservice) | Membership, credits, account rules |
| [chat.z.ai](https://chat.z.ai) | Z.ai chat |
| [z.ai](https://z.ai) | International top nav (Chat / API / Coding Plan) |
| [zhipuai.cn/zh](https://www.zhipuai.cn/zh) | First-party product rail |
| [GLM-5.2 research post](https://www.zhipuai.cn/zh/research/161) | Official pair of "try it online" URLs |
| [docs.z.ai](https://docs.z.ai) | API, not a Qingyan how-to |

## Related pages

- [Learning map](./index.md)
- [Cheatsheet](./zhipu-chat-cheatsheet.md)
- [Glossary](./zhipu-chat-glossary.md)
