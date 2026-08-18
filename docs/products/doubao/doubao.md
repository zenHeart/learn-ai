---
title: Doubao tutorial
description: Open Doubao on the web or desktop and send the first message. Only official doors and copy.
domain: product
tags:
  - chat
role: tutorial
---

# Doubao tutorial

> Start at [doubao.com](https://www.doubao.com/) or the [desktop landing](https://www.doubao.com/download/desktop). This page only repeats doors you can check on official pages.

## Goals and non-goals

**Audience:** a frontend engineer opening Doubao for the first time.

**You will:** send a first message on web or desktop, and see what the desktop page adds.

**You will not:** install Trae, call the Ark API, build a Coze agent, or invent prices.

## Prerequisites

- You can open `doubao.com`. Some networks resolve it into `198.18.0.0/15`. Change DNS / disable Fake-IP before you decide the site is down.
- Some regions ask you to sign in first, or suggest **Dola**. Dola is not this tutorial.

## Open it in 15 minutes

### 1. Pick an official door

| Surface | How | Source |
|---------|-----|--------|
| Web | Open [doubao.com](https://www.doubao.com/), sign in, ask | Homepage |
| Web from desktop landing | [download/desktop](https://www.doubao.com/download/desktop) → **使用网页版** | Desktop page |
| Windows / macOS | [download](https://www.doubao.com/download/) or **下载豆包桌面版** | Official download |
| Microsoft Store | App id `XPDDTBMM6TZ365` | [Store](https://apps.microsoft.com/detail/xpddtbmm6tz365) |
| Android | Yingyongbao package `com.larus.nova` (Beijing Chuntian Zhiyun Technology Co., Ltd.) | [Yingyongbao](https://sj.qq.com/appdetail/com.larus.nova) |

Minimum OS versions were **not** visible in the no-JS scrape on 2026-08-19. <!-- TODO: 待核实 --> Use the installer page.

### 2. Send the first message

After login, type in the box. Official copy positions Doubao as chat, writing, copy, translation, and a coding helper. Treat it as a conversation assistant. Do not expect it to clone a repo or open a PR.

### 3. What the desktop page adds

Install the desktop client only if you need local productivity. Official desktop copy:

- Writing, translation, one-click PPT, Excel
- Seedream 5.0 image and Seedance 2.5 video (Pro)
- A built-in planning Agent

There is no official click-path tree. This page does not invent one.

## Official capabilities

### Homepage / download meta

Seedance **2.0** is on Doubao and free after login. Doubao is described as a chat assistant for writing, copy, translation, and coding help.

### Desktop landing

[download/desktop](https://www.doubao.com/download/desktop) names **Seedream 5.0**, **Seedance 2.5**, and an **Agent**.

**The two official Seedance version strings disagree.** This site quotes both.

### Coding boundary

Repo-level coding is [Trae](https://www.trae.ai/) (#80). Calling Doubao models from your service is [Volcengine Ark](https://www.volcengine.com/product/ark) (#82).

## Next

- [Cheatsheet](./doubao-cheatsheet.md)
- [Glossary](./doubao-glossary.md)
- [Learn LLM](/tech/fundamentals/LLM)
