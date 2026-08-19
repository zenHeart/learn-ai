---
title: MiniMax Agent glossary
description: "No how-to. Separate Agent / Code / Hub / Design / Mini-Agent, then Lightning, Pro, and Agent Team."
domain: product
tags:
  - coding-agent
role: glossary
---

# MiniMax Agent glossary

No procedures. This page explains why the names collide. Which surface to open: [learning map](./index.md).

## Concept map

```
Vendor MiniMax
├── General workbench MiniMax Agent (web)
│   ├── Modes: Lightning / Pro
│   ├── Collaboration: Agent Team (Leader / Worker / Verifier)
│   ├── Extension: Skill
│   └── On-site entries: MaxHermes / MaxClaw
├── Desktop coding MiniMax Code        ← not this directory
├── Creation MiniMax Design (EN About still says Hub)
├── Video Hailuo / speech Audio / characters Xingye·Talkie
└── Open Platform API + Token Plan
```

## Everything named MiniMax or Agent

| Name | What it is | Where |
|------|------------|-------|
| **MiniMax Agent** | General long-horizon workbench | agent.minimaxi.com / agent.minimax.io |
| MiniMax Code | Desktop AI agent app | [welcome](https://agent.minimaxi.com/docs/code/welcome) |
| MiniMax Hub | First-level name in EN About | `hub.minimaxi.com` currently loads Design |
| MiniMax Design | Multimodal creation studio / canvas | design.minimaxi.com |
| Hailuo | Video product | hailuoai.com |
| MiniMax Audio | Speech and music | minimaxi.com/audio |
| Xingye | Immersive agent community | xingyeai.com |
| Talkie | Xingye overseas | talkie-ai.com |
| Mini-Agent | Open-platform sample | GitHub MiniMax-AI/Mini-Agent |
| MaxHermes | On-site "cloud assistant" entry | changelog 2026-04-16 |
| MaxClaw | On-site settings / channels / persona entry | changelog 2026-04-11 |
| Token Plan | Subscription and quota | Company Product nav |
| MiniMax M2 / M3 | Driving models, not product surfaces | News and home; internals in [Learn LLM](https://llm.zenheart.site/chapters/) |

**Not official product names. Do not write them as facts:**

- "MiniMax Agent is just the web skin of Code" — desktop was renamed to Code on its own.
- "Hub equals Agent" — Hub aligns with Design, not Agent.
- Treating the Mini-Agent sample repo as the product download.

## What MiniMax Agent is / why it exists

**What it is:** A browser agent that takes a goal, splits work, and hands back files or pages. Official contrast: a reliable coworker, not an autocomplete box.

**Why it exists:** A chat assistant stops at Q&A. An agent has to plan, call tools, test, and return something you can open. The [launch post](https://www.minimaxi.com/news/minimax-agent) frames this as "Code is cheap, show me the requirement."

**What it is not:** Not a local IDE, not a Hailuo reskin, not Xingye.

## Lightning and Pro

**What they are:** Two modes of one product, not two products.

**Why they exist:** The [M2 post](https://www.minimaxi.com/en/news/minimax-m2) described contemporary agent products as expensive or slow. Lightning keeps short tasks fast. Pro keeps long tasks capable.

**Difference:**

| | Lightning | Pro |
|--|-----------|-----|
| Official jobs | Q&A, light search, light code | Research, full-stack, PPT, reports, sites |
| Cost | Weak on long deliverables | Heavy for a one-line question |

## Agent Team

**What it is:** A multi-agent system led by one agent. Official roles: Leader, Worker, Verifier. The user still sends one message.

**Why it exists:** A single agent is both player and referee. Long jobs stop early, drift, or go silent on IM. Team turns split, parallel, and review into system behavior.

**What it is not:** Not "open three chat tabs." Not every sub-agent toggle in the Code docs.

The official article also names Team Engine states: `producing` / `verifying` / `done`. That is design language, not a command you type.

## Skill

**What it is:** An installable, reusable domain flow. Market: [skills](https://agent.minimaxi.com/skills).

**Why it exists:** Role-play is not role split. The Team article lists tools, context, memory, and Skill as four dimensions of division of labor. Without a skill you re-teach the flow every time.

**Versus plugins:** The skill marketplace is a page the Agent web app opens. The plugin marketplace launch is in MiniMax Code release notes. Do not merge the two tables.

## Hub and Design

**What they are:** Creation products: canvas, storyboard, finished film, local assets.

**Why this entry exists:** EN About still lists **MiniMax Hub** as a first-level product. CN About lists **MiniMax Design**. Opening `hub.minimaxi.com` loads Design. When two official pages disagree, this site quotes both and treats the live landing page as Design.

**What they are not:** Not another name for MiniMax Agent.

## Related pages

- [Learning map](./index.md)
- [Tutorial](./minimax-agent.md)
- [Cookbook](./minimax-agent-cookbook.md)
- [Cheatsheet](./minimax-agent-cheatsheet.md)
