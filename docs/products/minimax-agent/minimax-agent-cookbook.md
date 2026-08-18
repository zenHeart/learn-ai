---
title: MiniMax Agent cookbook
description: "Read this after you can sign in. Each recipe solves one job and only uses steps that exist on an official page."
domain: product
tags:
  - coding-agent
role: cookbook
---

# MiniMax Agent cookbook

For readers who already have [agent.minimax.io](https://agent.minimax.io/) open. Each recipe: goal, steps, pitfall.

Setup and mode choice live in the [tutorial](./minimax-agent.md). This page does not repeat them.

## 1. A sourced research report

**Goal:** Markdown / PDF a coworker can reuse, not a chat log.

**When:** Pro. Turn on Agent Team if sources must be checked in parallel.

**Steps:**

1. Switch to Pro.
2. Put scope, banned sources, and output format in the first sentence.
3. Require an official URL after every claim.
4. If you also need HTML / slides, ask for both in that same message.

```
Using 2026 official pages only, document what MiniMax Agent can and cannot do.
Allowed hosts: minimaxi.com, minimax.io, agent.minimaxi.com, agent.minimax.io.
Banned: review blogs, social screenshots, scrapers.
Deliver a Markdown report. Every claim needs a source URL.
```

**Pitfall:** A single agent often stops halfway to "report progress." The [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) article calls this context anxiety. Write "do not stop before the acceptance checks pass," or turn Team on.

## 2. Slides, a report, or a site — not just prose

**Goal:** A downloadable deck, document, or openable page.

**Sources:** The [M2 post](https://www.minimaxi.com/en/news/minimax-m2) lists PPT, reports, and web development under Pro. The [launch post](https://www.minimaxi.com/news/minimax-agent) showed audio tutorials and front-end animation pages.

**Steps:**

1. Pro.
2. Name page count, audience, and format (HTML / PDF / PPTX / DOCX).
3. Ask for an outline first. The Team article splits office docs into Planner → Writer → Formatter → Evaluator.
4. For a fixed layout, check the [skill marketplace](https://agent.minimaxi.com/skills) for a deck / DOCX / PowerPoint skill.

```
Write an 8-slide product intro for frontend engineers.
They already use Cursor and have never opened MiniMax Agent.
Give an outline first. After I confirm, generate HTML slides and a PDF export.
Do not include MiniMax Code install steps.
```

**Pitfall:** Do not run this in Lightning. Official copy puts it on Pro.

## 3. Decide whether Agent Team is worth it

**Goal:** Skip a wasted "the single agent finished writing but nothing is shippable" loop.

| Signal | Action |
|--------|--------|
| You want one answer | No Team. Lightning is enough |
| Multi-source research + verify + synthesize | Team on |
| IM task, humans will not wait for the final file | Team on. Officially the lead replies immediately |
| Typo / one sentence | Off. Officially cheaper as a single agent |

**Steps:** Turn on **Agent Team** on the home page, then send one goal. Do not pack three unrelated epics into one message.

**Pitfall:** Team has handoff cost. The official article names handoff, sharing, and aggregation as new costs. A vague goal makes Worker and Verifier spin.

## 4. Install a skill before repeating the same job

**Goal:** The second similar deliverable should not start from a blank prompt.

**Steps:**

1. Open [skills](https://agent.minimaxi.com/skills).
2. Search by job type (deck, research report, Excel, landing page).
3. Install, then refer to that skill in the next task.
4. If the market has nothing, but you have already run the flow twice, create a skill or import from GitHub. Both are in the official marketplace copy.

**Pitfalls:**

- The catalog and use counts move. Do not treat a screenshot in this repo as the index.
- The Code plugin marketplace (finance data, company lookup, Office, Notion, …) is documented in desktop release notes, not in this recipe.

## 5. Switch products instead of forcing the web Agent

| You actually want | Go here | Do not |
|-------------------|---------|--------|
| Local repo, terminal, diffs, git | [MiniMax Code](https://agent.minimaxi.com/docs/code/welcome) | Pretend the web Agent has a workspace panel |
| One video | [Hailuo](https://hailuoai.com/) | Detour through Agent "because it can generate video" |
| Voice / music | [Audio](https://www.minimaxi.com/audio) | Treat Audio as an Agent mode |
| Roleplay | [Xingye](https://www.xingyeai.com/) / [Talkie](https://www.talkie-ai.com/) | Write a companion app up as a workbench |
| Storyboard-to-film canvas | [Design](https://design.minimaxi.com/) | Treat the old Hub name as Agent |

## Related pages

- [Learning map](./index.md)
- [Tutorial](./minimax-agent.md)
- [Cheatsheet](./minimax-agent-cheatsheet.md)
- [Glossary](./minimax-agent-glossary.md)
