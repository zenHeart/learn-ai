---
title: Qwen learning map
description: Alibaba's official consumer assistant lives at qianwen.com. This directory covers that assistant only. Lingma / Qoder CN and Bailian each get one row.
domain: product
tags:
  - chat
role: map
---

# Qwen learning map

> **Qwen** (千问) is Alibaba's consumer AI assistant. Official home description ([qianwen.com](https://www.qianwen.com/)):
> Qwen is **Alibaba's official AI assistant** (阿里官方AI助手) and the first door to the Qwen models for work, study, and daily life.
>
> Same-page title: `千问-阿里 AI 助手`. Greeting: 「你好，我是千问」.
>
> This directory covers the **qianwen.com assistant only**. Tongyi Lingma / Qoder CN (#84) and Alibaba Cloud Model Studio / Bailian (#85) each get one row.

## Audience / non-goals

**Audience:** frontend engineers who need chat, writing, PPT, and files in a browser or desktop app. No repo required.

**Goals:** tell Qwen apart from other Alibaba AI doors, open an official client, send the first prompt.

**Non-goals:**

- Tongyi Lingma / Qoder CN install (#84)
- Bailian API / Token Plan (#85)
- Taobao / DingTalk / ECS how-tos
- Invented membership prices or a single “default model”
- Model internals (see [Learn LLM](/tech/fundamentals/LLM))

## Landscape

Tongyi Lab lists Qwen as the personal app. These are **not** one product with four skins.

```
Alibaba / Tongyi (this directory expands Qwen only)
├── Qwen — consumer assistant (qianwen.com)
│   ├── Web
│   ├── iOS / Android
│   ├── Windows / Mac desktop
│   └── Office assistant / Local PC / scheduled tasks / cloud space / AI create (in-product)
├── Tongyi Lab — gateway (Qwen · Wan)
├── Wan — visual generation family (one row)
├── Tongyi Lingma / Qoder CN — coding assistant (#84, one row)
├── Alibaba Cloud Bailian — model API platform (#85, one row)
├── Qwen Studio — international assistant at chat.qwen.ai (one row)
├── Qwen Code — international terminal coding agent (one row)
└── Open source / Research — QwenLM / qwenlm.github.io (one row)
```

| Official first-class entry | Official URL | This site |
|----------------------------|--------------|-----------|
| **Qwen** (阿里官方AI助手) | [qianwen.com](https://www.qianwen.com/) | Standalone [qwen.md](./qwen.md) |
| Desktop download / PC client | [qianwen.com/download](https://www.qianwen.com/download) | Tutorial section |
| API service (home nav) | Home button; same-vendor platform [Bailian](https://www.aliyun.com/product/bailian) | Map row (#85). <!-- TODO: verify the home-button landing URL --> |
| Tongyi Lab | [tongyi.aliyun.com](https://tongyi.aliyun.com/) | Map row: gateway; footer “个人应用” links back to Qwen |
| Wan | [landing?family=wan](https://tongyi.aliyun.com/landing?family=wan) | Map row |
| Tongyi Lingma / Qoder CN | [lingma.aliyun.com](https://lingma.aliyun.com/), [qoder.com.cn](https://qoder.com.cn/), [aliyun.com/product/lingma](https://www.aliyun.com/product/lingma) | Map row (#84, no install here) |
| Alibaba Cloud Bailian | [aliyun.com/product/bailian](https://www.aliyun.com/product/bailian) | Map row (#85, no API tutorial here) |
| Qwen Studio | [chat.qwen.ai](https://chat.qwen.ai/), [qwen.ai](https://qwen.ai/) | Map row: international site; on-page name is **Qwen Studio** |
| Qwen Code | [qwen.ai/qwencode](https://qwen.ai/qwencode) | Map row |
| Research / open source | [qwenlm.github.io](https://qwenlm.github.io/), [github.com/QwenLM](https://github.com/QwenLM) | Map row. <!-- TODO: verify Tongyi Lab “开源社区” button landing URL --> |
| Qwen IME | Home banner; Yingyongbao `com.qianwen.ime` | Map row: same-vendor IME, no handbook |
| Taobao / DingTalk / ECS | — | **Out of scope** |

**Name collisions:**

- **Qwen ≠ Tongyi Lab ≠ Wan.** Qwen is the assistant. The lab is a gateway. Wan is the visual-generation family.
- **Qwen ≠ Tongyi Lingma / Qoder CN.** Official “代码” on Qwen is generating / checking mini programs, pages, and SQL in the thread. Repo / IDE coding is not documented here.
- **Qwen ≠ Bailian.** The home **API 服务** button is not this tutorial.
- **Qwen ≠ Qwen Studio ≠ Qwen Code.** `chat.qwen.ai` names itself **Qwen Studio**, not “Qwen international edition”.
- **Office assistant / Local PC ≠ QoderWork / QwenWork.** The first two are modes on qianwen.com. The latter lives on Alibaba Cloud help and belongs next to #84.
- **Older store names 通义 / 通义千问 are not a second product.** The live consumer page says **千问**.

### Quick decision

```
What do I want?
├── Chat, write, PPT, image/video, files, or select-to-ask on a PC
│   └── → Qwen (this directory)
│       ├── Browser first? → qianwen.com
│       └── Overlay / sidebar / select-to-ask? → desktop download
├── Write code in a repo or IDE
│   └── → Tongyi Lingma / Qoder CN (#84, no tutorial here)
├── Call models from my own app / buy a Token Plan
│   └── → Bailian (#85)
├── International web chat (on-page name: Qwen Studio)
│   └── → chat.qwen.ai (no install here)
├── Open-source terminal coding agent
│   └── → Qwen Code (qwen.ai/qwencode)
└── Taobao / DingTalk / ECS themselves
    └── → Out of scope
```

Sources: [qianwen.com](https://www.qianwen.com/), [tongyi.aliyun.com](https://tongyi.aliyun.com/), [chat.qwen.ai](https://chat.qwen.ai/), [qwen.ai](https://qwen.ai/).

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Pick the door | This family table | Stay out of Lingma / Bailian / Qwen Studio |
| 2. Open a chat | [Qwen tutorial](./qwen.md) | Send the first prompt; install desktop / App if needed |
| 3. Look up links | [Cheatsheet](./qwen-cheatsheet.md) | Stores, legal, sibling doors |
| 4. Untangle names | [Glossary](./qwen-glossary.md) | Stop calling Lingma / Bailian / Studio “Qwen” |

There is no official how-to tree, so this directory has **no cookbook**. Click paths follow the live UI.

## Feature index (official pages only)

| Capability | Official source |
|------------|-----------------|
| Alibaba official AI assistant; first door to Qwen models | [Home description](https://www.qianwen.com/) |
| 「你好，我是千问」; model chip Qwen3.7-千问 | Home |
| New chat / cloud space / AI create / scheduled tasks | Home sidebar |
| Fast / office assistant / local PC | Home modes |
| PPT, video, image, code, translate, write, research, voice notes, gaokao, AV skim | Home |
| Office assistant: phone remote control, skills and connectors, multi-format delivery | Home banner |
| Select-to-ask: summarize, translate, create | Home banner |
| Voice notes that keep recording offline | Home banner |
| Qwen IME: 300 characters/min, 9 dialects, no ads | Home banner |
| Desktop sidebar: browse while chatting / summarizing / asking | [User agreement](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html) §1.2 |
| Office assistant delivers web / app / PPT / Word / Excel / images | [App Store](https://apps.apple.com/cn/app/%E5%8D%83%E9%97%AE-%E9%98%BF%E9%87%8Cai%E5%8A%A9%E6%89%8B/id6466733523) |
| 10 files per upload; 500-page docs | App Store |
| Code: mini programs / pages / mini games / SQL | App Store |
| Wan 2.7 video; Qwen-Image 2.0 generate / edit | App Store |

Plans and quotas: **no** official qianwen.com price table found on 2026-08-19. The App Store marks the app **Free · In-App Purchases**. Do not copy Bailian Token Plan prices onto this page.
