---
title: Kimi chat and Agent
description:" \"Audience: frontend engineers picking a Moonshot surface. You need a browser or the Kimi app, not a repo checkout.\""
domain: product
tags:
  - chat
role: tutorial
---

# Kimi chat and Agent

> **Kimi** is Moonshot AI's all-in-one workspace. Official product copy ([zh-cn/products](https://www.kimi.com/zh-cn/products/)):
> built-in Agent capabilities for deep research, slides, sheets, documents, and websites.
>
> **Kimi Agent** official definition ([Agent overview](https://www.kimi.com/help/agent/agent-overview)):
> "Kimi Agent is an autonomous AI assistant that handles complex tasks end-to-end. Powered by Kimi K3, it uses 20+ tools to build websites, generate documents, analyze data, and more."
>
> This page maps kimi.com, the products page, and the help center. It is **not** Kimi Code — that is [Kimi Code](/products/kimi-code/).

## Goals and non-goals

**Audience:** frontend engineers choosing a Kimi surface. Browser or Kimi app. No checkout.

**Goals:** open kimi.com, tell Chat / Agent / Swarm / Claw apart, finish one Agent task, know which official table holds credits.

**Non-goals:** Kimi Code install; invented CNY prices; treating Moderato as Go; model internals. Mechanisms: [Learn LLM](/tech/fundamentals/LLM).

## What it is

One workspace, several official clients:

| Client | Official entry |
|--------|----------------|
| Web | [kimi.com](https://www.kimi.com/) |
| Agent | [kimi.com/agent](https://www.kimi.com/agent) |
| Agent Swarm | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm) |
| Kimi Claw | [kimi.com/bot](https://www.kimi.com/bot) |
| App | [moonshot.cn](https://www.moonshot.cn/) footer "Scan to download Kimi App" |

Home sidebar labels copied from [kimi.com](https://www.kimi.com/): **Plugins, Scheduled Tasks, Slides, Swarm, Deep Research, Docs, Websites, Sheets, Design**, plus **Kimi Work / Kimi Code / Kimi Claw**. New chat shortcut on the homepage: **⌘K**.

Agent capabilities ([Agent overview](https://www.kimi.com/help/agent/agent-overview)):

| Capability | Official description |
|------------|----------------------|
| Websites | Generate and deploy responsive web apps |
| Docs | Word, PDF, Markdown |
| Sheets | Excel / CSV; official text: up to 1,000-row Excel |
| Slides | Automated PPT |
| Deep Research | 10,000+ word reports |
| Agent Swarm | Up to 300 sub-agents; 4,000+ tool calls |
| Kimi Claw | Cloud automation; help center cites 5,000+ ClawHub skills |

How it works (same page): task planning → tool invocation (20+ tools) → autonomous execution → error handling → deliverables.

## First session: chat

1. Open [kimi.com](https://www.kimi.com/) and sign in. Signed-out sidebar: "Log in to sync chat history".
2. Type in the box. Homepage: "Ask anything, or task an agent..."
3. Chat credits: official membership page — "In Chat, K2.6 is free for all users and does not consume credits" ([membership overview](https://www.kimi.com/help/membership/membership-overview)).

For durable context, create a **Project** instead of re-uploading the same files. Next section.

## First Agent task

Official entries ([Agent overview](https://www.kimi.com/help/agent/agent-overview)):

- **Web:** [https://www.kimi.com/agent](https://www.kimi.com/agent)
- **Mobile / tablet:** Kimi app → model switch → **K3** or **K3 Swarm**

Official steps:

1. Describe the task clearly. Official examples include creating voting-site code and analyzing a market.
2. Watch planning, tools, visited URLs, intermediate code.
3. Download or share: code project, folder, analysis, Word / PDF / PPT.

Official use cases: website development, multimedia content, document comparison / translation, data analysis, slides, format conversion.

## Agent Swarm

Official definition ([Agent Swarm](https://www.kimi.com/help/agent/agent-swarm) / [zh-hans](https://www.kimi.com/zh-hans/help/agent/agent-swarm)): scale-out architecture, up to **300** sub-agents, no preset roles or hand-built workflows. Official claims: about **4.5×** faster than a single Agent; more than **4,000** tool calls per task. Currently powered by **Kimi K3 (K3 Swarm)**.

**Entries:**

- Web: <https://www.kimi.com/agent-swarm>
- Mobile: Kimi app model switch → **K3 Swarm**

**Access:** **Moderato, Allegretto, Allegro, and Vivace**. Official: these tasks consume noticeably more credits than standard Agent. **[Beta]** means early, limited rollout.

Official steps: describe the task → watch sub-agents → take deliverables → later turns auto-route between chat and Agent.

Good for: large retrieval, batch download, 100+ documents, long writing, complex coding, Office automation. Bad for one-shot chit-chat.

## Kimi Claw

Official positioning ([Claw overview](https://www.kimi.com/en/help/kimi-claw/overview)): talk to **OpenClaw** inside Kimi. OpenClaw is "an AI assistant with a distinct personality and long-term memory."

**One-click cloud deploy:**

1. Sign in at [kimi.com/bot](https://www.kimi.com/bot)
2. Click **Create** Kimi Claw
3. Wait for automatic setup (official: usually a few minutes)
4. Set a nickname; **Settings → Chat channels** for WeChat / Feishu / WeCom and others

Official limits: one-click deploy is **Allegretto and higher**. Default model **Kimi K2.6**, billed against **membership credits**, with Kimi Web Search configured. Can deploy to Feishu, WeCom, Weibo, and other platforms.

**Link an existing OpenClaw:** **Link existing OpenClaw**, then install the Kimi plugin on the machine that already runs OpenClaw.

**Claw group chat** ([group-chat](https://www.kimi.com/help/kimi-claw/group-chat)): sidebar **+** → **Start Group Chat**, required Group Name and Group Goal, pick linked Claws. Kimi assigns a **Conductor**. Send `/stop` in the main chat to force-interrupt. Set group rules in plain language. Allegretto+; membership table lists 10 group chats.

Switching Claw's default model to K3 is documented on the Claw overview as edits to `/root/.openclaw/openclaw.json` (or your real install path). That is **OpenClaw config**, not a kimi.com chat command. Copy the official snippet, and back up first.

## Projects, memory, Skills, plugins, scheduled tasks

Cross-cutting Features: [help/features](https://www.kimi.com/help/features).

### Projects

[Projects](https://www.kimi.com/help/features/project): keep files, chats, and instructions together. Sidebar **+** next to Projects, or **+ New project**. Name: 1–50 characters.

- Project chats can use **project files, project instructions, plugins, Skills, and Goal**, and can switch models.
- Each file ≤ **100 MB**, up to **50** files; read on demand, not fully preloaded every turn.
- Deleting a project **permanently** removes its chats, files, and instructions.
- Injected context: system prompt + global main memory + project instructions + on-demand files.
- **Kimi Work Projects are not connected and do not share data.**

### Memory

[Memory space](https://www.kimi.com/help/features/memory-space): preferences across chats. Official: will not memorize unauthorized private information (health, passwords, addresses) unless you ask. Manage at **Settings → Personalization → Memory Space**. Say "Remember… / Forget… / What do you currently remember about me?". Official: not used for training; can be turned off or cleared.

### Skills

[What are Skills?](https://www.kimi.com/help/features/what-are-skills): reusable knowledge packages. Type **`/`** or let Kimi trigger them. **`/skill-creator`** builds one in dialogue. Official examples: `docx`, `deep-research`; recommended: `sop-writer`, `event-etf-study`.

### Plugins

[Plugins](https://www.kimi.com/help/features/plugins): connect external tools. Available when the model is **K3** or **K3 Swarm**, and in Deep Research, Websites, and PPT. **Not yet supported in Kimi Claw or Kimi Plus conversations.** Entries: sidebar **Plugins**, input **+**, or **`/`**. Some need OAuth. Signed-out users cannot install. Some plugins consume membership credits on actual calls.

### Scheduled tasks

[Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks): available in **Kimi** and **Kimi Work**. Sidebar "Create scheduled task", or describe the schedule in chat. Cadence: daily / weekly / monthly / one-time. Cloud tasks do not need a client open. **Local** Kimi Work tasks require the desktop app; missed triggers while closed are not backfilled. After a run you can switch models in the result chat and type `/` for plugins and Skills.

Official template: At [time], do [task], output as [format], and follow [constraints].

## Goal

Where Goal appears officially:

- Membership table **Goal Mode**: — on Moderato; ✅ on **Allegretto / Allegro / Vivace** ([membership overview](https://www.kimi.com/help/membership/membership-overview)).
- Project chats "use plugins, Skills, and Goal" ([Projects](https://www.kimi.com/help/features/project)).

There is no standalone kimi.com Goal product page. Kimi Work has its own Goal Mode ([Work overview](https://www.kimi.com/help/kimi-work/overview)). Kimi Code `/goal` is CLI — **do not** type it as a kimi.com command.

## Membership and credits

[Membership overview](https://www.kimi.com/help/membership/membership-overview) (opened 2026-08-19):

- Four tiers: **Moderato $19/mo, Allegretto $39/mo, Allegro $99/mo, Vivace $199/mo**.
- **One credit pool** for membership features (website deploy, Deep Research, Slides, Kimi Code, Kimi Work, Kimi Claw, K3, K3 Swarm), metered by tokens.
- In Chat, **K2.6 is free and does not consume credits**.
- Credits reset each billing cycle. Annual billing: official "save up to **$480/year**".
- Kimi Code also has a **5-hour / weekly** rate limit that does not affect other features.

The same page's second table covers Agent concurrency, K3 extra-long chat (Allegro / Vivace, up to 1M tokens), scheduled tasks, projects, Swarm subtasks, Goal, Claw, and Claw group chats. Full numbers: [cheatsheet](./kimi-cheatsheet.md).

**Two official plan-name systems:** Projects / Scheduled Tasks pages use **Free / Go / Pro / Max / Ultra**, and the numbers are not identical to the membership overview. This page **does not invent a mapping**. Prices and membership benefits: membership overview. Project / schedule caps: the feature page; if they disagree, keep both citations.

This page does **not** invent CNY prices. Use the membership / usage UI on your account.

## Common pitfalls

- Treating a generated site as a patched local git checkout. Use [Kimi Code](/products/kimi-code/) for the repo.
- Opening Swarm or one-click Claw on a plan that the membership table does not unlock (Swarm: Moderato+; one-click Claw: Allegretto+).
- Assuming Kimi Work desktop projects sync with kimi.com Projects.
- Typing Kimi Code `/goal` into the web box.
- Merging Moderato and Go into one unofficial table.
- Looking for web plugins inside Claw / Kimi Plus chats — officially unsupported.
- Expecting local Kimi Work schedules to backfill while the app is closed.

## Official docs

| Page | Use it for |
|------|------------|
| [kimi.com](https://www.kimi.com/) | The product |
| [zh-cn/products](https://www.kimi.com/zh-cn/products/) | First-class family |
| [Agent overview](https://www.kimi.com/help/agent/agent-overview) | Agent entry and steps |
| [Agent Swarm](https://www.kimi.com/help/agent/agent-swarm) | Swarm entry and limits |
| [Membership overview](https://www.kimi.com/help/membership/membership-overview) | Plans and credit pool |
| [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) | One-click / link existing OpenClaw |
| [Claw group chat](https://www.kimi.com/help/kimi-claw/group-chat) | Conductor, threads, `/stop` |
| [Help Center](https://www.kimi.com/help) | Category index |
| [moonshot.cn](https://www.moonshot.cn/) | Company site, app download |

## Related pages

- [Learning map](./index.md)
- [Cookbook](./kimi-cookbook.md)
- [Cheatsheet](./kimi-cheatsheet.md)
- [Glossary](./kimi-glossary.md)
- [Kimi Code](/products/kimi-code/)
