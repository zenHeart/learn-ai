# Grok Chat

> **Grok** is xAI's assistant. Official definition ([docs.x.ai/grok/overview](https://docs.x.ai/grok/overview)):
> "Grok is xAI's assistant, available on the web at [grok.com](https://grok.com) and in the iOS and Android apps. Sign in once and your conversations, settings, and subscription stay in sync across every platform."
>
> This page is a product map sourced only from [docs.x.ai/grok](https://docs.x.ai/grok/overview), [x.ai/grok](https://x.ai/grok), and [grok.com](https://grok.com). It is the Claude.ai analog. It is **not** Grok Build — that is [grok-cli.md](./grok-cli.md).

## Goals and non-goals

**Audience:** frontend engineers picking a Grok surface. You need a browser or the Grok app, not a repo checkout.

**Goals:** list what grok.com / iOS / Android actually do, how accounts sync, and where files / Voice / Imagine / Connectors live.

**Non-goals:** a Grok Build tutorial, invented SuperGrok prices, third-party Arena Mode / 8-parallel claims, or treating Grok 4.3 as the current flagship. Coding models stay on [developers/models](https://docs.x.ai/developers/models): `grok-4.6` and `grok-build-0.1`.

## What it is

One assistant, three official clients ([overview](https://docs.x.ai/grok/overview), [x.ai/grok](https://x.ai/grok)):

| Client | Official entry |
|--------|----------------|
| Web | [grok.com](https://grok.com) — the [FAQ](https://docs.x.ai/grok/faq) says use this address in Chrome/Chromium; `grok.x.ai` can miss features such as Projects |
| iOS | Grok on the App Store ([x.ai/grok](https://x.ai/grok)) |
| Android | Grok on Google Play ([x.ai/grok](https://x.ai/grok)) |
| Inside X | Grok inside X.com / X apps (the [FAQ](https://docs.x.ai/grok/faq) sends X-product issues to X Help, not xAI) |

There is **no official Grok desktop chat app** on these pages. The desktop + iOS product with a cloud computer is [Grok Bot](./grok-bot.md).

Official "what you can do" list ([overview](https://docs.x.ai/grok/overview)):

- **Chat** — ask questions, brainstorm, write, and work through problems in a natural back-and-forth.
- **Create images and video** with Grok Imagine. Product page: [grok-imagine.md](./grok-imagine.md).
- **Talk to Grok** hands-free with voice. Product + API map: [grok-voice.md](./grok-voice.md).
- **Upload files** — PDFs, images, spreadsheets, code, audio, and more — for analysis, extraction, and summarization.
- **Connect your tools** so Grok can reach your email, files, and calendar inside a chat. See [Connectors](./grok-connectors.md).

[x.ai/grok](https://x.ai/grok) adds live web + 𝕏 search, deep reasoning, multi-agent mode on SuperGrok, code generation **in the thread**, memory across chats, canvas for long-form writing, custom instructions, and shareable conversation links. That is still chat, not a repo agent.

## Accounts and subscription sync

Sign in once. Conversations, settings, and the subscription stay in sync across web and the apps ([overview](https://docs.x.ai/grok/overview)).

The [FAQ](https://docs.x.ai/grok/faq) is explicit about common account traps:

- The subscription is tied to the **account you bought it with**. A web SuperGrok that does not appear in the iOS/Android app is usually a different login, not a double charge. X Premium+ only applies to the account linked to that X account.
- Link X at **Settings → Account → Connect your X Account** on grok.com. Manage sign-in methods at [accounts.x.ai](https://accounts.x.ai).
- Apple "Hide My Email" subscriptions must be signed in **with Apple**, not the relay address via Google/email.
- Delete the xAI account at [accounts.x.ai/account](https://accounts.x.ai/account). Restorable for 30 days. API access on the same account is removed too.

Billing location depends on where you subscribed ([FAQ](https://docs.x.ai/grok/faq)):

| Where you bought it | Where you manage it |
|---------------------|---------------------|
| Web (grok.com) | [grok.com/?_s=billing](https://grok.com/?_s=billing) or Settings → Billing |
| Apple App Store | Apple subscription / refund pages |
| Google Play | Google Play cancel; refunds via the [xAI refund form](https://accounts.x.ai/refund) |
| X Premium | X, not xAI ([X Help](https://help.x.com/using-x/x-premium)) |

**API credits are not refundable** ([FAQ](https://docs.x.ai/grok/faq)).

## Plans and the weekly usage pool

[overview](https://docs.x.ai/grok/overview): Grok is **free to start**. Paid SuperGrok plans raise limits and unlock more across every product, from **one weekly usage allowance** you can spend however you like.

The [FAQ](https://docs.x.ai/grok/faq) (rolling out June 2026) replaces per-product daily caps:

- One weekly pool for Chat, Imagine, Voice, Build, and related products.
- Different products cost different amounts of the pool. A chat message uses little compute; a high-quality video or a long coding task uses more.
- Check **Settings → Usage** (web and mobile): percent used, breakdown by product (API, Build, Chat, Imagine, Voice), weekly reset time, Extra Usage Credits.
- Hitting the weekly cap pauses **paid** features. Free-tier Chat and Voice limits remain and reset on their own schedule.
- Extra Usage Credits can currently be bought **on the web only**, from $5, expire one year after purchase unless otherwise stated, and cost more per action than included weekly usage.
- Auto Top Up is a web setting (amount + monthly cap).

This page does **not** invent a SuperGrok dollar price or a token quota. Trust the Usage tab.

Team / Enterprise workspaces are a different product surface: [Grok Business](./grok-business.md).

## File uploads

Official path ([FAQ](https://docs.x.ai/grok/faq)): in any chat, click or tap **+** next to the input (or drag-and-drop on the web). Multiple files per message. Grok confirms a successful upload before it answers.

| Limit | Official number |
|-------|-----------------|
| How many at once | Web: up to ~100. Android: up to 20. iOS: multiple files |
| Size | Most files (documents, images, code, audio): **150 MB** per file |
| Documents | PDF, DOCX, TXT, CSV, XLSX, PPTX, HTML, XML, JSON, MD, LaTeX, ODT, RTF, code (`.py`, `.cpp`, `.java`, `.html`, `.css`) |
| Images | JPEG/JPG, PNG, WebP, HEIC, BMP. GIF and SVG vary by platform |
| Audio | MP3, WAV, M4A, OGG, FLAC, AAC |
| Video | MP4, MOV |

What Grok does with files ([FAQ](https://docs.x.ai/grok/faq)): synthesis across files, transformation (summarize / rewrite), extraction (tables, quotes), analysis (charts, code, audio/video), multimodal reasoning.

Official caveats:

- Very long files may be summarized or handled in sections.
- Embedded images inside **non-PDF** files may not be processed visually.
- Audio/video transcription quality varies.
- Manage stored assets at [grok.com/files](https://grok.com/files). Data controls: **Profile → Settings → Data Controls**.

## Nearby surfaces (do not mix them)

| Surface | What it is | Page |
|---------|------------|------|
| **Grok Chat** | This page. Conversation, search, files, Voice, Imagine in-thread | grok.com / apps |
| **Imagine** | Dedicated image/video studio + Imagine API | [grok-imagine.md](./grok-imagine.md) |
| **Voice** | Hands-free talk in the app + Voice API | [grok-voice.md](./grok-voice.md) |
| **Connectors** | Email / files / calendar / MCP inside chat | [grok-connectors.md](./grok-connectors.md) |
| **Build Mode** | Chat mode that builds a live preview and publishes to grok.me. SuperGrok Heavy Early Beta | [x.ai/grok/build-mode](https://x.ai/grok/build-mode) — not Grok Build |
| **Grok Build** | Terminal coding agent (`grok`) | [grok-cli.md](./grok-cli.md) |
| **Grok Bot** | Named teammates on a persistent cloud computer | [grok-bot.md](./grok-bot.md) |
| **Grok Business** | Team workspaces and licenses | [grok-business.md](./grok-business.md) |

[FAQ](https://docs.x.ai/grok/faq) product notes worth keeping:

- **Grok Studio is no longer supported.** Use **Grok Build** instead.
- **Companions** are iOS-only. Official text: no plans to bring them to web or Android.

## Common pitfalls

- Signing in with a different Google / Apple / X identity on the phone than on the web, then assuming the subscription is missing.
- Using `grok.x.ai` and wondering why Projects disappeared — official address is **grok.com**.
- Treating in-chat code generation as a repo agent. For a real checkout, use [Grok Build](./grok-cli.md).
- Pasting the same files every turn instead of using [Connectors](./grok-connectors.md) for mail / Drive / calendar.
- Writing third-party "Grok 4.3 / 2M context" as the chat flagship. Official coding guidance on [developers/models](https://docs.x.ai/developers/models): **Grok 4.6**.

## Official docs

| Page | Use |
|------|-----|
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | What Grok is, platforms, next links |
| [docs.x.ai/grok/faq](https://docs.x.ai/grok/faq) | Billing, weekly usage, files, Imagine, accounts |
| [docs.x.ai/grok/connectors](https://docs.x.ai/grok/connectors) | Link apps inside chat |
| [docs.x.ai/grok/user-guide](https://docs.x.ai/grok/user-guide) | Business & Enterprise workspaces |
| [x.ai/grok](https://x.ai/grok) | Marketing + store links |
| [grok.com](https://grok.com) | The product |

## Related pages

- [Grok learning map](./index.md) — family decision tree
- [Imagine](./grok-imagine.md) — images and video
- [Voice](./grok-voice.md) — product Voice + Voice API
- [Connectors](./grok-connectors.md)
- [Grok Business](./grok-business.md)
- [Grok Build tutorial](./grok-cli.md)
- [Glossary](./grok-glossary.md)
