---
title: MiniMax Agent cheatsheet
description: "Look up, do not study. Entries, modes, name collisions, and sources. No official Commands page, so there is no invented command table."
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# MiniMax Agent cheatsheet

Look up, do not study. Coverage: official pages opened 2026-08-19. Commands, flags, and check-in points that exist only in the Code changelog stay out of this table.

## Entries

| Use | URL |
|-----|-----|
| China workbench | https://agent.minimaxi.com/ |
| International workbench | https://agent.minimax.io/ |
| Skill marketplace | https://agent.minimaxi.com/skills |
| Docs index | https://agent.minimaxi.com/docs/llms.txt |
| Changelog | https://agent.minimaxi.com/docs/changelog |
| Desktop download (currently branded Code) | https://agent.minimaxi.com/download |
| Company site | https://www.minimaxi.com/ |
| International company site | https://www.minimax.io/ |

## Modes

Source: [M2 post](https://www.minimaxi.com/en/news/minimax-m2)

| Mode | Official wording | Use it for |
|------|------------------|------------|
| Lightning | Q&A, lightweight search, simple coding; instant output | Short tasks |
| Pro | Complex long-running work; research, full-stack, PPT, reports, websites | Long tasks with a file |

## Decision: Agent or another door

| Job | Pick |
|-----|------|
| Finish research / PPT / report / site in the browser | Agent |
| Local repo + terminal | Code |
| Video only | Hailuo |
| Speech / music only | Audio |
| Character community | Xingye / Talkie |
| Creation canvas | Design (Hub is the EN About / old host) |
| Call models from my app | Open Platform |

Term index (one line; detail in the [glossary](./minimax-agent-glossary.md)):

| Term | Hook |
|------|------|
| MiniMax Agent | General web workbench |
| MiniMax Code | Desktop app; not this tutorial |
| Hub / Design | Creation product; two official names, trust the landing page |
| Mini-Agent | GitHub sample, not the product |
| Lightning / Pro | Two official modes |
| Agent Team | Leader / Worker / Verifier |
| MaxHermes / MaxClaw | On-site Agent entries, not first-level products |
| Token Plan | Billing, not a product |

## Billing (quote, do not merge)

| Claim | Source |
|-------|--------|
| Free until the servers cannot keep up | [M2 post](https://www.minimaxi.com/en/news/minimax-m2) |
| Unified billing via Token Plan | [Skill marketplace](https://agent.minimaxi.com/skills) |
| Plus ¥49 / Max ¥119 / Ultra ¥469 | [Download page](https://agent.minimaxi.com/download) (title: MiniMax Code) |

Trust the signed-in plan page.

## Common errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| Looking for a `minimax` CLI / workspace here | That is Code | [Code welcome](https://agent.minimaxi.com/docs/code/welcome) |
| Short Q&A is slow | Pro / Team is on | Switch to Lightning |
| Long report stops at 50% | Single agent reports early | Write acceptance checks, or Team |
| Writing Hub and Agent as one tutorial | EN About still says Hub | Hub currently is Design |
| Citing a mirror site's numbers | No official wording | Delete or mark unverified |

## High-quality sources

Last verified: 2026-08-19. Only pages we opened.

### First-party official

| Source | Use |
|--------|-----|
| [agent.minimaxi.com](https://agent.minimaxi.com/) | China product entry |
| [agent.minimax.io](https://agent.minimax.io/) | International product entry |
| [skills](https://agent.minimaxi.com/skills) | Skill marketplace |
| [features/en.html](https://agent.minimax.io/features/en.html) | Consumer feature copy |
| [faq/en.html](https://agent.minimax.io/faq/en.html) | Consumer FAQ, not an engineering reference |
| [changelog](https://agent.minimax.io/docs/changelog) | Release notes; later entries are Code |
| [llms.txt](https://agent.minimaxi.com/docs/llms.txt) | Docs tree index |
| [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) | Team design and when to use it |
| [Launch post](https://www.minimaxi.com/news/minimax-agent) | Product positioning (2025-06-19) |
| [M2 & Agent](https://www.minimaxi.com/en/news/minimax-m2) | Lightning / Pro and the free-trial wording |
| [Code welcome](https://agent.minimaxi.com/docs/code/welcome) | Boundary only, not this tutorial |
| [design.minimaxi.com](https://design.minimaxi.com/) | Current Design landing page |
| [hub.minimaxi.com](https://hub.minimaxi.com/) | Loads Design |
| [hailuoai.com](https://hailuoai.com/) | Hailuo |
| [minimaxi.com/audio](https://www.minimaxi.com/audio) | Audio |
| [xingyeai.com](https://www.xingyeai.com/) | Xingye |
| [talkie-ai.com](https://www.talkie-ai.com/) | Talkie |
| [platform.minimaxi.com](https://platform.minimaxi.com/) | Open Platform |

### Unverified

| Item | URL | Why it is unsure |
|------|-----|------------------|
| Whether the Agent web app is still free | In-app plan page (sign-in) | Launch "free until servers fail" and Token Plan now coexist |
| Whether the plugin marketplace is on the web Agent | Changelog / home modal | Launch notes name MiniMax Code |

**Fetch notes** (2026-08-19): some clients resolve `minimaxi.com` / `agent.minimaxi.com` through a 198.18 proxy or get blocked. Use a browser or a page reader. `docs/llms.txt` is readable.

## Related pages

- [Learning map](./index.md)
- [Tutorial](./minimax-agent.md)
- [Cookbook](./minimax-agent-cookbook.md)
- [Glossary](./minimax-agent-glossary.md)
