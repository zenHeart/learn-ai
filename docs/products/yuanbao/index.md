# Yuanbao learning map

> **Yuanbao** is Tencent's consumer all-in-one AI assistant. Official page title ([yuanbao.tencent.com](https://yuanbao.tencent.com/)):
> **Yuanbao–Tencent's All-in-One AI Assistant**
>
> Same-page description: Yuanbao is Tencent's all-in-one AI assistant and is connected to the latest Hunyuan **Hy3** model.
>
> This directory covers **Yuanbao only**. Hunyuan and CodeBuddy each get one row. Their handbooks are other issues.

## Audience / non-goals

**Audience:** frontend engineers who need chat, search, files, and writing in a browser or desktop app. No repo required.

**Goals:** tell Yuanbao apart from other Tencent AI doors, open an official client, and see what the desktop app adds.

**Non-goals:**

- Hunyuan models / APIs / open weights (#77)
- A CodeBuddy coding tutorial (#78)
- WeChat / QQ / Tencent Meeting how-tos
- Invented subscription prices, a single "default model", or the unpublished list of 36 file suffixes
- Model internals (see [Learn LLM](/tech/fundamentals/LLM))

## Landscape

The Hunyuan site footer lists Yuanbao next to other AI products. They are **not** one product with four skins.

```
Tencent AI (this directory expands Yuanbao only)
├── Yuanbao — consumer assistant
│   ├── Web yuanbao.tencent.com
│   ├── iOS / Android
│   ├── Windows / macOS desktop
│   └── Yuanbao Pai (store copy: public beta)
├── Tencent Hunyuan — model family and research (#77, one row)
├── CodeBuddy — cloud coding assistant (#78, one row)
├── WorkBuddy — AI office workbench (footer, one row)
├── ima — AI knowledge steward (footer, one row)
└── Hy AI Studio — model playground on the Hunyuan footer (one row)
```

| Door | What it is | Official URL | This site |
|------|------------|--------------|-----------|
| **Yuanbao** | Chat / write / search / files / multimodal assistant | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | [Tutorial](./yuanbao.md) |
| Tencent Hunyuan | Models, research, open source, Co-design | [hunyuan.tencent.com](https://hunyuan.tencent.com/) | Map row (#77) |
| CodeBuddy | Tencent Cloud coding assistant | [codebuddy.cn](https://www.codebuddy.cn/) | Map row (#78) |
| WorkBuddy | "All-scenario AI office workbench" | [workbuddy.cn](https://www.workbuddy.cn/) | Map row |
| ima | "AI knowledge steward built on a knowledge base" | [ima.qq.com](https://ima.qq.com/) | Map row |
| Hy AI Studio | Footer item on Hunyuan `/solutions` | [hunyuan.tencent.com](https://hunyuan.tencent.com/) | Map row |
| WeChat / QQ / Meeting | Not this site | — | **Out of scope** |

Footer sources (2026-08-19): [hunyuan.tencent.com](https://hunyuan.tencent.com/) lists WorkBuddy, Yuanbao, ima. [hunyuan.tencent.com/solutions](https://hunyuan.tencent.com/solutions) lists Hy AI Studio, Yuanbao, WorkBuddy. The table is the union.

**Name collisions:**

- **Yuanbao ≠ Hunyuan.** Yuanbao is the assistant. Hunyuan is the model / research brand.
- **Yuanbao ≠ CodeBuddy.** Official "AI coding" on Yuanbao is running Python / C++ in the thread ([desktop page](https://yuanbao.tencent.com/evt/dl)). Repo / IDE coding is not documented here.
- **Yuanbao ≠ WorkBuddy ≠ ima.** The last two appear only on the Hunyuan footer.
- **`hunyuan.tencent.com/bot/chat` is not a second product.** Its canonical URL is `yuanbao.tencent.com`.
- **Yuanbao Pai is not a separate app.** App Store / Play list it under Yuanbao features and mark it as a public beta.

### Quick decision

```
What do I want?
├── Chat, write, search, read files, vision, or select-to-ask on a PC
│   └── → Yuanbao (this directory)
│       ├── Browser first? → yuanbao.tencent.com
│       └── Overlay / select-to-ask? → desktop app (evt/dl)
├── Write code in a repo or IDE
│   └── → CodeBuddy (codebuddy.cn; #78, no tutorial here)
├── Call Hunyuan models / read papers / download weights
│   └── → Tencent Hunyuan (hunyuan.tencent.com; #77)
├── Hand an office job to an agent
│   └── → WorkBuddy (workbuddy.cn, not documented here)
├── Search / read / write against a knowledge base
│   └── → ima (ima.qq.com, not documented here)
└── WeChat / QQ / Meeting themselves
    └── → Out of scope
```

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Open a chat | [Yuanbao tutorial](./yuanbao.md) entry table | Send the first prompt |
| 2. Desktop extras | Same page, desktop section | Overlay shortcut, in-app Python / C++ |
| 3. Look up links | [Cheatsheet](./yuanbao-cheatsheet.md) | Stores, legal, support email |
| 4. Untangle names | [Glossary](./yuanbao-glossary.md) | Stop calling Hunyuan / CodeBuddy "Yuanbao" |

There is no official how-to tree, so this directory has **no cookbook**. Click paths follow the live UI.

## Feature index (official pages only)

| Capability | Official source |
|------------|-----------------|
| All-in-one assistant on Hunyuan Hy3 | [Home description](https://yuanbao.tencent.com/) |
| Chat, writing, search | Home tagline |
| Drag-and-drop files | Home |
| AI writing / coding / vision / select-to-ask | [Desktop page](https://yuanbao.tencent.com/evt/dl) |
| Run Python and C++ without a local deploy | Desktop page |
| 36 file kinds (code, logs, technical docs) | Desktop page; **no suffix list** |
| Option+Space (mac) / Alt+Space (window) mini chat | Desktop page (they wrote `window`) |
| Temporary chats stay out of history | Desktop page |
| Homework solver, voice notes, Yuanbao Pai beta, voice calls, video… | [App Store](https://apps.apple.com/cn/app/%E5%85%83%E5%AE%9D-%E8%85%BE%E8%AE%AF%E5%85%A8%E8%83%BDai%E5%8A%A9%E6%89%8B/id6480446430) / [Play](https://play.google.com/store/apps/details?id=com.tencent.hunyuan.app.chat) |
| AI-generated content, for reference only | Home, download center |

Plans and quotas: **no** official Yuanbao price table found on 2026-08-19. The App Store marks the app **Free**. Do not copy third-party "unlimited free" claims.
