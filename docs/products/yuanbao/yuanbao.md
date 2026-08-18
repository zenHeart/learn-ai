# Yuanbao tutorial

> Start at [yuanbao.tencent.com](https://yuanbao.tencent.com/) or the [download center](https://yuanbao.tencent.com/download). This page only repeats entries and capabilities you can check on official pages.

## Goals and non-goals

**Audience:** frontend engineers opening Yuanbao for the first time. The home button says **Log In**; use whatever method the page actually offers.

**You will:** send a first prompt on web or a client, and know the desktop shortcut plus the official capability boundary.

**You will not:** get a WeChat/QQ signup guide, a CodeBuddy install, invented model-switch steps, or a fabricated list of 36 suffixes.

## Prerequisites

- You can reach `yuanbao.tencent.com` (some resolvers map it into `198.18.0.0/15`; change DNS / disable Fake-IP before calling it down).
- OS floors come from two official places — do not merge them:
  - Download center: **macOS 11.3+**, **Windows 10+**.
  - App Store: **iOS / iPadOS 15.0** or later.

## Open it in 15 minutes

### 1. Pick an official door

| Surface | How | Source |
|---------|-----|--------|
| Web | Open [yuanbao.tencent.com](https://yuanbao.tencent.com/), click **Log In** | Home |
| Web (from the desktop landing page) | [evt/dl](https://yuanbao.tencent.com/evt/dl) → **使用网页版** | Desktop page |
| iOS | QR on the download center, or App Store “元宝-腾讯全能AI助手” (id `6480446430`) | [download](https://yuanbao.tencent.com/download), [App Store](https://apps.apple.com/cn/app/%E5%85%83%E5%AE%9D-%E8%85%BE%E8%AE%AF%E5%85%A8%E8%83%BDai%E5%8A%A9%E6%89%8B/id6480446430) |
| Android | QR on the download center, or Play package `com.tencent.hunyuan.app.chat` | [download](https://yuanbao.tencent.com/download), [Play](https://play.google.com/store/apps/details?id=com.tencent.hunyuan.app.chat) |
| Windows / macOS | Download center, or **下载电脑版** on the desktop page; Windows also on [Tencent Software Center](https://pc.qq.com/detail/1/detail_36661.html) | [download](https://yuanbao.tencent.com/download), [evt/dl](https://yuanbao.tencent.com/evt/dl) |

The terms also name a **mini program** and a **browser plugin** ([user agreement](https://rule.tencent.com/rule/202403110001)). No standalone official install page for either was found on 2026-08-19. This tutorial does not invent steps.

The old URL `https://hunyuan.tencent.com/bot/chat` already canonicalizes to the Yuanbao site. Do not bookmark it as “Hunyuan chat”.

### 2. Send the first prompt

Logged-out home copy: “Hi, 我是元宝” and “聊天、写作、搜索都在行，助你灵感无限”. After login, type in the box or drag a file (home: **Drag the file here to upload**).

The footer says AI-generated content is for reference only. Treat that as a product statement.

### 3. Desktop: select-to-ask and the mini window

Install the desktop app only if you need an OS-level overlay. The official desktop page ([evt/dl](https://yuanbao.tencent.com/evt/dl)) says:

| Action | Official wording |
|--------|------------------|
| Mini chat | Option+Space (mac) or Alt+Space (window) opens the mini window |
| Select-to-ask | Select-to-search and translate; ask Yuanbao anything |
| Vision | Screenshot upload, then search |
| Temporary chat | Temporary chats do not appear in history |
| Save | One-tap save for a good answer |

Tencent Software Center also lists global select-to-ask (translate / search / read aloud), grouped custom instructions, and import/export with Tencent Docs.

## Official capabilities (by source)

### Home

[yuanbao.tencent.com](https://yuanbao.tencent.com/) describes an all-in-one assistant on Hunyuan Hy3, with stronger file handling, writing styles, companion chat, search, image understanding, image edit, and homework Q&A.

Visible nav also includes **Search**, **All Collections**, and **Download Center**. There is no separate official doc for Collections / Group, so this page does not invent rules.

### Desktop landing page

[evt/dl](https://yuanbao.tencent.com/evt/dl) columns: **混元 Hy3**, **AI 写作**, **AI 编程**, **AI 识图**, **AI 划词**.

The only official coding sentences:

- AI coding without a local deploy, instant check
- Python and C++ run in the product, no deploy required

That is **code in the thread**, not clone-a-repo / open-a-PR / MCP. Repo-level coding is [CodeBuddy](https://www.codebuddy.cn/) (site issue #78; no tutorial here).

Files: “36 kinds” including code, logs, and technical docs. **No** official suffix table.

### Store long description

App Store and Play feature lists matched on 2026-08-19: image edit, homework solver, **Yuanbao Pai (public beta, including raising lobsters)**, unlimited-time voice-note transcription/translation, fast reports / copy / code, AI tutor, image-to-video, voice calls, snap-to-search, snap-to-translate, QQ Music, image generation, links to WeChat / Tencent Docs / Tencent News / Weixin Reading, official-account and Channels sources, 36 file types, and trending search.

“Links with WeChat” is one store bullet. It is **not** a WeChat integration tutorial.

Treat Yuanbao Pai as an in-app public beta, not its own handbook.

## Do not pick a winner on model copy

Three official wordings existed on 2026-08-19:

| Source | Wording |
|--------|---------|
| Home / desktop page | Hunyuan **Hy3** |
| App Store release notes | 2.66–2.67 “Hy3 preview”; 2.76–2.78 “Hy3 generally available” |
| Play “About this app” | Hunyuan T1 and DeepSeek R1 dual reasoning models |

Trust the names in your client. Do not write “DeepSeek is the default” or “T1 has been removed”. Internals: [Learn LLM](/tech/fundamentals/LLM).

## Legal and support

- [Yuanbao user agreement](https://rule.tencent.com/rule/202403110001)
- [Yuanbao privacy policy](https://privacy.qq.com/document/preview/eb9be56572ab4886b6ca124e72abf413)

The agreement names web, PC client, mini program, and browser plugin. The rule center needs JavaScript. This page does not paraphrase grant language.

Play support email: `yuanbao@tencent.com`.

## Pitfalls

- Treating Yuanbao as Claude Code / Cursor. There is no official Yuanbao CLI or IDE plugin page.
- Copying 2025 “four-model” blog matrices. Home now says Hy3; Play still mentions T1 + R1.
- Inventing the 36 suffixes.
- Writing mini-program / plugin install steps with no official install URL.
- Saving `hunyuan.tencent.com/bot/chat` as a Hunyuan chat product.

## Next

- [Cheatsheet](./yuanbao-cheatsheet.md)
- [Glossary](./yuanbao-glossary.md)
- [Learning map](./index.md)
