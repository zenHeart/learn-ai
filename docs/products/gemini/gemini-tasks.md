---
title: Gemini Tasks
description: "Google's free personal agent in the Gemini app (2026-11-17): Chat→Task switch, phone calls to US businesses, Google Pay checkout via AP2, SMS and email task intake — and where it stands against ChatGPT Work, Claude computer use, and Grok Bot."
domain: product
tags:
  - agent
role: tutorial
---

# Gemini Tasks

> Google's personal agent inside the Gemini app, launched 2026-11-17. Switch the home-screen toggle from Chat to Task and Gemini runs multi-step tasks in the background, then notifies you. Runs on Gemini 4 Hydrogen.
>
> Sources (first-hand, read in full 2026-11-27): [official announcement](https://blog.google/innovation-and-ai/products/gemini-app/tasks-in-gemini-free-new-features/), [release notes 2026.11.17](https://gemini.google/gp/release-notes/?hl=en), [help center](https://support.google.com/gemini/answer/17094507), [phone-calls help](https://support.google.com/gemini/answer/18961634?hl=en-301). Community reactions were collected from X via grok CLI on 2026-11-27; no route in our fleet could do a live hands-on test, so nothing here claims first-hand use.

## What it is — and is not

- **Free in six countries**: US, Japan, Korea, Canada, Australia, India. Outside the six, a Google AI Pro or Ultra subscription is required; the EEA, Nigeria, Switzerland, and the UK cannot use it at all, even subscribed.
- **Not in mainland China**: no official timeline has been published.
- **Predecessor**: Spark, in beta for subscribers since May 2026, renamed Task.
- **Limits**: 18+, personal Google account (work/school accounts not supported), History on; at most 15 tasks running at once; daily caps on phone calls (exact number unpublished); still experimental — Google says tasks can fail or miss the mark.

## What it can do

| Capability | How it works | Scope |
|---|---|---|
| Call US businesses | Calls several at once, waits on hold, books by your Calendar availability; discloses it is AI, merchants can opt out; no 911, no payments or sensitive info on the call | US only; Louisiana, Indiana, Minnesota, Montana excluded; Nebraska limited Sun/holidays 13:00–21:00 |
| Shop with Google Pay | Sets a product + price cap, stages checkout with an itemised summary, buys only after your 1-tap + device approval, via a one-time virtual card; uses the Agent Payments Protocol (AP2) | US only, English, 18+, personal account; Mastercard/Visa live, Amex coming soon |
| Text intake | SMS/RCS via Google Messages or iMessage; mid-task steering by reply | US only; verified US number, eligible carrier |
| Email intake | Forward mail to gemini@google.com; replies 1:1 only, never Reply-All | US only; Gmail/Apple Mail/Outlook |
| Cross-app + files | 60+ connected apps (Gmail, Calendar, Drive, Docs, Sheets, Wallet, Maps, YouTube…); generates docs, sheets, decks, code, web pages; scheduled routines | Six free countries |

UCP (Universal Commerce Protocol) integration is "up next" — **not** live at launch. Tasks run in Google Cloud's Agent Compute Engine: a hardware-isolated VM per account, plus prompt-injection filters and Safe Browsing. The help center warns explicitly that these defences **cannot guarantee** prompt-injection risks away; sensitive tasks should not be scheduled, and login/payment details must never be typed into a task thread.

## How it compares

| Dimension | Gemini Tasks | ChatGPT Work | Claude computer use | Grok Bot |
|---|---|---|---|---|
| Price | Free in six countries | Subscription (Plus ~$20/mo) | API token pricing | Inside X subscriptions |
| Native phone calls | Yes — parallel calls, hold music, transcript | No native calls | No native calls (devs wire Twilio etc.) | No native calls reported |
| Native shopping | Yes — Google Pay + AP2 + spending cap + pre-purchase approval | Cloud-browser shopping; ChatGPT Wallet added 2026-11-13 (tokenised card, biometric approval each purchase) | No native shopping; computer use can operate stores or APIs | No native shopping loop reported |
| Openness | Devs apply to the Connected Apps Platform; no equivalent of MCP/API agent framework published | Plugins, Actions, 1,400+ plugins; Work shares limits with Codex | MCP + API path is the most explicit of the four | Connectors/MCP on a persistent cloud computer |
| Shape | Personal-life tasks: bookings, bills, shopping, family schedules | Longer knowledge-work outcomes (briefs, decks, sheets) | Desktop-grade generic operation + dev workflows | Named persistent teammate on a shared cloud computer |

**Takeaway: Gemini Tasks differentiates on "free + real phone calls + payments loop". Its weak side is openness** — Claude and ChatGPT publish clearer developer paths (API, MCP, plugins), while Gemini only offers Connected Apps Platform applications so far. ChatGPT and Claude have no native "call and wait on hold" or AP2 payments loop.

Notes on lineage (verified 2026-11-27 against public sources): ChatGPT Atlas was a real product — an OpenAI browser launched 2025-10-21, retired 2026-08-09, folded into the ChatGPT desktop app; its agent capability now lives in ChatGPT Work (launched 2026-07-09). Operator (2025-01-23) was retired 2025-08-31 and folded into ChatGPT agent mode. See [ChatGPT Work](./../codex/chatgpt-work.md) and [Grok Bot](./../grok/grok-bot.md).

## Community reality check, 10 days in (2026-11-27)

- **Only screenshot-backed success found**: a call to Trader Joe's (Redmond) confirming butternut squash in stock, 2026-11-22 ([AGI Hunt](https://agihunt.info/en/p/1a20472bd22261343a13a4495f2)). A pet-grooming booking reached voicemail on the second attempt after the first failed ([ED Times, via r/GeminiAI](https://edtimes.in/ai-can-now-make-calls-and-buy-things-for-you-will-you-let-it/)).
- **Failures reported on X** (grok search summaries, not individually re-opened): tasks stalling mid-way until nudged; a paying Pro + Workspace user cut off overnight (ticket #77990451, unrecovered); refusal to connect to a private P2P chat app while OpenAI Dots, Grok Bot, Muse, and Nous Hermes connected; uncontrollable reasoning depth.
- **Geography dominates complaints**: UK/German/EU users asking for an ETA; no mainland-China complaints found.
- **Zero found**: shopping-checkout success stories, email/SMS intake walkthroughs, restaurant/hotel booking successes.
- **Name collision**: the product shares its name with Google Tasks, the 2018 to-do app — journalist Joanna Stern asked about it publicly on 2026-11-18; Google has not responded.

## Open questions (not facts)

Email/SMS channel fine print; language coverage in the six free countries; Windows-app support; Pro/Ultra prices and quotas; the Nebraska blog-footnote wording (help center says limited hours, some secondary reports say fully excluded); any "Gemini Bots" rumour (unconfirmed, non-official logo — do not cite as fact).

*Companion tutorial (Chinese, X Article draft, awaiting human publish authorisation): `content-home/workflows/x-article-operations/projects/x-article-2026-11-27-gemini-tasks/`.*
