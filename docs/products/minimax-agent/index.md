---
title: MiniMax Agent learning map
description: "MiniMax Agent is the general-purpose agent workbench, not MiniMax Code. This directory covers the web workbench only. Code / Hailuo / Talkie stay one row on the family map."
domain: product
tags:
  - coding-agent
role: map
---

# MiniMax Agent learning map

> **MiniMax Agent** is MiniMax's general-purpose agent workbench. The official launch post ([Agent](https://www.minimaxi.com/news/minimax-agent)) calls it a general agent that can finish **long-horizon** tasks: plan an expert solution, break the work down, run sub-tasks, and deliver a result.
>
> China entry: [agent.minimaxi.com](https://agent.minimaxi.com/). International entry: [agent.minimax.io](https://agent.minimax.io/).
>
> **This directory is not a MiniMax Code tutorial.** The desktop coding agent lives at the official [Code welcome page](https://agent.minimaxi.com/docs/code/welcome). This site tracks Code in issue #72.

## Product landscape

The company site, the Agent site, and the docs site reuse several names. They are **not** one product with four skins. The **core path** here is **MiniMax Agent** (the web workbench).

```
MiniMax family
├── MiniMax Agent — general-purpose workbench (this directory)
│   ├── Web: agent.minimaxi.com / agent.minimax.io
│   ├── Lightning / Pro modes
│   ├── Skill marketplace /skills
│   └── On-site entries: MaxHermes, MaxClaw
├── MiniMax Code — desktop coding agent (#72, not expanded here)
├── MiniMax Design / Hub — multimodal creation canvas
├── Hailuo — video generation
├── MiniMax Audio — speech and music
├── Xingye / Talkie — character / community apps
└── Open Platform / Token Plan — API and billing
```

| Official first-level entry | What it is | Official URL | This site |
|----------------------------|------------|--------------|-----------|
| **MiniMax Agent** | Long-horizon general agent workbench | [agent.minimaxi.com](https://agent.minimaxi.com/) | Standalone pages in this directory |
| MiniMax Code | Desktop AI agent for a local project / terminal / browser | [Code welcome](https://agent.minimaxi.com/docs/code/welcome) | One row. Main tutorial is #72 |
| MiniMax Design / Hub | Multimodal creation studio. EN About still says Hub; `hub.minimaxi.com` now loads Design | [design.minimaxi.com](https://design.minimaxi.com/), [hub.minimaxi.com](https://hub.minimaxi.com/) | One row |
| Hailuo | Text / image to video | [hailuoai.com](https://hailuoai.com/) | One row |
| MiniMax Audio | Speech and music | [minimaxi.com/audio](https://www.minimaxi.com/audio) | One row |
| Xingye (星野) | Immersive agent community (China) | [xingyeai.com](https://www.xingyeai.com/) | One row |
| Talkie | Xingye's overseas counterpart | [talkie-ai.com](https://www.talkie-ai.com/) | One row |
| Open Platform / API | Model HTTP API | [platform.minimaxi.com](https://platform.minimaxi.com/) | One row |
| Token Plan | Subscription and quota | Product nav on the company site | One row |
| About / News / IR | Company pages | [minimaxi.com](https://www.minimaxi.com/) | Out of scope |

Sources: [www.minimaxi.com](https://www.minimaxi.com/) About, [www.minimaxi.com/en](https://www.minimaxi.com/en) Product / About, [agent.minimaxi.com](https://agent.minimaxi.com/), [docs/llms.txt](https://agent.minimaxi.com/docs/llms.txt). Opened 2026-08-19.

**Names that collide:**

- **MiniMax Agent ≠ MiniMax Code.** Agent is the general workbench. Code is the desktop app. Changelog [v3.0.33](https://agent.minimaxi.com/docs/changelog): "Desktop app officially renamed to MiniMax Code."
- **MiniMax Hub ≠ MiniMax Agent.** EN About lists Hub next to Code / Audio / Talkie. Opening `hub.minimaxi.com` currently loads MiniMax Design.
- **Mini-Agent ≠ MiniMax Agent.** `MiniMax-AI/Mini-Agent` is an open-platform sample, not this product.
- **MaxHermes / MaxClaw** appear on the Agent home page. They are not company first-level products. See the [glossary](./minimax-agent-glossary.md).

Model internals (MSA, attention, training) belong in [Learn LLM](https://llm.zenheart.site/chapters/). This directory does not explain them.

### Quick decision: which surface?

```
What do I want to do?
├── Finish a long task in the browser (research, PPT, report, site, multimodal deliverable)
│   └── → MiniMax Agent (this directory)
│       ├── Q&A / light search / light code → Lightning
│       └── Long research / full-stack / PPT / report / site → Pro; turn on Agent Team when the work must split
├── Edit a local repo, inspect diffs, run a terminal
│   └── → MiniMax Code (official desktop docs; this site #72)
├── Only generate video
│   └── → Hailuo
├── Only speech / music
│   └── → MiniMax Audio
├── Character roleplay / community
│   └── → Xingye (China) / Talkie (overseas)
├── Storyboard-to-film canvas
│   └── → MiniMax Design (the domain may still say Hub)
└── Call models from my own software
    └── → Open Platform API
```

## When MiniMax Agent is worth a try

**Try it when:**

- You want a **browser deliverable**: research, slides, a report, a site — not a terminal session over a repo.
- You already use a Claude.ai / Cowork-style workbench and want the China / MiniMax entry.
- The job needs multimodal output or MCP. The [launch post](https://www.minimaxi.com/news/minimax-agent) lists programming, multimodality, and MCP as design bars.

**Wait when:**

- You need a local project, a terminal, and a git workspace — that is **MiniMax Code**.
- You only need one video — use Hailuo.
- You want a companion character — use Xingye / Talkie.
- You need a copy-paste command / flag manual — there is no official Commands page for the Agent web workbench. This site only records wording we can open.

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Open it | [MiniMax Agent tutorial](./minimax-agent.md) | Sign in and send the first task |
| 2. Pick a mode | Lightning / Pro in the tutorial, then the [Cookbook](./minimax-agent-cookbook.md) | Short Q&A stays off Pro |
| 3. Skills and Team | Cookbook + [skill marketplace](https://agent.minimaxi.com/skills) | When to install a skill; when to open Team |
| 4. Look up entries | [Cheatsheet](./minimax-agent-cheatsheet.md) | Domains, modes, sources |
| 5. Untangle names | [Glossary](./minimax-agent-glossary.md) | Agent / Code / Hub / Design / Mini-Agent |

## Feature snapshot

Only capabilities with official wording.

| Capability | One line | Official source |
|------------|----------|-----------------|
| Long-horizon tasks | Plan, split, deliver a final result | [Launch post](https://www.minimaxi.com/news/minimax-agent) |
| Lightning | Fast Q&A / light search / light code | [M2 post](https://www.minimaxi.com/news/minimax-m2) |
| Pro | Deep research / full-stack / PPT / reports / websites | [M2 post](https://www.minimaxi.com/news/minimax-m2) |
| Agent Team | Lead agent splits work; Leader / Worker / Verifier | [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) |
| Skill marketplace | Browse, install, create, or import from GitHub | [skills](https://agent.minimaxi.com/skills) |
| Programming | Complex flows, simulated user tests, UI quality | [Launch post](https://www.minimaxi.com/news/minimax-agent) |
| Multimodal | Long text / video / audio / image; built-in generation | [Launch post](https://www.minimaxi.com/news/minimax-agent) |
| MCP | Built-in MiniMax MCP; also lists GitHub / GitLab / Slack / Figma | [Launch post](https://www.minimaxi.com/news/minimax-agent) |
| Writing / voice / image / docs / translate | Consumer feature page | [features](https://agent.minimax.io/features/en.html) |

The driving model changes. The home page on 2026-08-19 showed MiniMax-M3. Internals: [Learn LLM](https://llm.zenheart.site/chapters/).

## Resources

- Product: <https://agent.minimaxi.com/>
- International: <https://agent.minimax.io/>
- Company: <https://www.minimaxi.com/>
- Docs index: <https://agent.minimaxi.com/docs/llms.txt>
- Full source list: [cheatsheet](./minimax-agent-cheatsheet.md#high-quality-sources)

## Related pages

- [MiniMax Agent tutorial](./minimax-agent.md)
- [Cookbook](./minimax-agent-cookbook.md)
- [Cheatsheet](./minimax-agent-cheatsheet.md)
- [Glossary](./minimax-agent-glossary.md)
- [All products](../index.md)
