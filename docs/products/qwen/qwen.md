---
title: Qwen tutorial
description: "Audience: frontend engineers opening qianwen.com for the first time. You will send the first prompt and know the official desktop / App doors."
domain: product
tags:
  - chat
role: tutorial
---

# Qwen tutorial

> Start at [qianwen.com](https://www.qianwen.com/) or the [PC client page](https://www.qianwen.com/download). This page only repeats entries and capabilities you can check on official pages.

## Goals and non-goals

**Audience:** frontend engineers opening Qwen for the first time. The home button says **登录**; use whatever method the page actually offers.

**You will:** send a first prompt on web or a client, and know how to get the desktop app and the official mobile apps.

**You will not:** get a Taobao / Alipay signup guide, a Lingma / Qoder install, a Bailian API walkthrough, or invented membership prices.

## Prerequisites

- You can reach `www.qianwen.com` (some resolvers map it into `198.18.0.0/15`; change DNS / disable Fake-IP before calling it down).
- OS floors come from official pages — do not merge them:
  - App Store: **iOS 14.0** or later; iPad needs **iPadOS 14.0** or later.
  - Windows / Mac / Android / HarmonyOS numeric floors were **not** readable on the download page or the agreement on 2026-08-19. <!-- TODO: verify desktop and Android OS floors -->

## Open it in 15 minutes

### 1. Pick an official door

| Surface | How | Source |
|---------|-----|--------|
| Web | Open [qianwen.com](https://www.qianwen.com/), click **登录** | Home |
| Windows / macOS | Home **下载电脑端**, or open [qianwen.com/download](https://www.qianwen.com/download); Windows also on [Microsoft Store · Qwen](https://apps.microsoft.com/detail/xp8m1sgl1lzr2f) (id `XP8M1SGL1LZR2F`) | Home, download page, Microsoft Store |
| iOS / iPad | App Store “千问 - 阿里AI助手” (id `6466733523`) | [App Store](https://apps.apple.com/cn/app/%E5%8D%83%E9%97%AE-%E9%98%BF%E9%87%8Cai%E5%8A%A9%E6%89%8B/id6466733523) |
| Android | Yingyongbao “千问”, package `com.aliyun.tongyi` | [Yingyongbao](https://sj.qq.com/appdetail/com.aliyun.tongyi) |

The terms also name **HarmonyOS**, a **browser plugin**, a **mini program**, and **H5** ([user agreement](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html) §1.1). No standalone official install page for those Qwen-assistant shapes was found on 2026-08-19. This tutorial does not invent steps. The Alibaba Cloud help article [QwenWork HarmonyOS guide](https://help.aliyun.com/zh/qwenwork/harmonyos-installation-guide) is a different product line. Do not treat it as the qianwen.com assistant install.

Login: agreement §5.1 says register with a phone number, or link a third-party account (Taobao, Alipay, Apple). That is a login method, not a Taobao tutorial.

The international site [chat.qwen.ai](https://chat.qwen.ai/) names itself **Qwen Studio**, with **Log in / Sign up**. It is not this page’s install path.

### 2. Send the first prompt

Logged-out home copy: 「你好，我是千问」. Top bar: **API 服务**, **下载电脑端**, **登录**. The model chip is **Qwen3.7-千问**.

After login, click **新建对话** and type in the box. The footer says continued use means you agree to the user agreement and privacy policy. Open those first.

Do not click top-bar **API 服务** to “start chatting”. That is the same-vendor API door. Its handbook is #85.

### 3. Desktop: select-to-ask and the sidebar

Install the desktop app only if you need an OS-level overlay. Official download-page title: `千问PC客户端 - 阿里AI助手`. Indexed download copy includes AI search, page summaries, AI PPT, image generation, PPT creation, voice notes, and select-to-ask translation.

User agreement §1.2: the Windows and Mac clients support web search and browsing, and a **Qwen sidebar** for chatting, summarizing, and asking while you browse.

Home banners also say:

| Action | Official wording |
|--------|------------------|
| Office assistant | Ships local-task capability; phone remote control, skills and connectors, multi-format delivery |
| Select-to-ask | Global efficiency tool; select on-screen text to summarize, translate, or create |
| Voice notes | Keeps recording offline; auto-organized notes |

Desktop shortcut keys: **none** were readable on a public page on 2026-08-19. <!-- TODO: verify desktop hotkeys --> Trust the client settings. Do not copy third-party blogs.

## Official capabilities (by source)

### Home

[qianwen.com](https://www.qianwen.com/) shows:

- Sidebar: **新建对话**, **云空间**, **AI创作**, **定时任务**
- Modes: **快速**, **办公助理**, **本地电脑**
- Capability chips: PPT, AI video, AI image, code, translate, write, research, voice notes, gaokao, AV skim
- Banners: office assistant, Qwen IME, voice notes, select-to-ask

**本地电脑** is a mode inside the product. It is not a prompt to install Tongyi Lingma.

### Store long description

App Store and Yingyongbao “About” matched on 2026-08-19:

- Q&A with structured answers and a research mode
- Office assistant that delivers web / app / PPT / Word / Excel / images, plus skills
- Scheduled tasks: recurring or one-shot
- Voice calls, 7×24
- Agent plaza; `@` an agent in the thread
- Life helper: takeout, hotels, restaurants, government services, shopping advice
- Writing, AI PPT, in-thread editor (PDF / WORD / PPT / EXCEL conversion)
- Docs: 10 files per upload, 500-page documents
- Code: one-shot mini programs / pages / mini games / SQL; upload code or a screenshot to review
- Live notes: offline or realtime speech-to-text
- Create: Wan 2.7 video; Qwen-Image 2.0 generate / retouch
- Study: classroom, photo homework, grading, a 500-million-item library

That is **chat and delivery**, not clone-a-repo / open-a-PR / MCP. Repo-level coding is [Tongyi Lingma / Qoder CN](https://qoder.com.cn/) (site issue #84; no tutorial here).

Yingyongbao still has a “通义介绍” block that names Tongyi APP, dance/sing toys, Tingwu, and an in-app Lingma. Treat it as stale store copy, **not** the current feature list.

### Qwen IME

Home banner: a new Qwen IME app; 300 characters per minute, 9 dialects, no ads. Yingyongbao lists vendor app `com.qianwen.ime`. This tutorial does not write IME install steps.

## Do not pick a winner on model copy

Several official wordings existed on 2026-08-19:

| Source | Wording |
|--------|---------|
| Home | Model chip **Qwen3.7-千问**; description says the strongest Qwen models |
| App Store | Latest / strongest Qwen models; create side names **Wan 2.7** and **Qwen-Image 2.0** |
| Qwen Studio (international, not this tutorial) | On-page **Qwen3.7-Plus** |
| Tongyi Lab | Model cards: Qwen3-Max / Qwen-Plus / Qwen-Flash and others |

Trust the names in your client. Do not write “the default is Qwen3.7”. Internals: [Learn LLM](/tech/fundamentals/LLM).

## Legal and data

Open these before you rely on the product:

- [Qwen user agreement](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html) (updated 2026-03-20, effective 2026-03-27)
- [Qwen privacy policy](https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20231011201849846/20231011201849846.html)
- In-app purchases also cite the [membership agreement](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20260728154300619/20260728154300619.html)

The agreement names the website, web, clients (iOS, Android, Windows, Mac, HarmonyOS), browser plugin, mini program, and H5. This page does not paraphrase grant language.

Operator in the agreement: 上海智信普惠科技有限公司. Stated use: personal study, research, enjoyment, daily life, and entertainment.

Plans: App Store marks **Free · In-App Purchases**. **No** price table was found on qianwen.com. Do not invent numbers.

## Pitfalls

- Treating Qwen as Claude Code / Cursor. There is no official Qwen CLI or IDE plugin page. The coding tool is Tongyi Lingma / Qoder CN (#84).
- Bookmarking `chat.qwen.ai` as “Qwen English”. That page’s product name is **Qwen Studio**.
- Copying Yingyongbao’s “通义介绍” dance toys / Tingwu. Live home and App Store about-text do not repeat those columns.
- Writing plugin / mini-program / HarmonyOS install steps with no official Qwen-assistant install URL.
- Copying Bailian Token Plan prices into your notes. That is #85.
- Turning a Taobao login into a Taobao tutorial. A login method is not the product scope.

## Next

- [Cheatsheet](./qwen-cheatsheet.md)
- [Glossary](./qwen-glossary.md)
- [Learning map](./index.md)
