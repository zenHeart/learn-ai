---
title: MiniMax Agent tutorial
description: "Open agent.minimax.io, pick Lightning or Pro, and send the first long-horizon task. This is not the MiniMax Code desktop tutorial."
domain: product
tags:
  - coding-agent
role: tutorial
---

# MiniMax Agent tutorial

> Goal: finish one deliverable in the web workbench in about 15 minutes.
>
> Non-goals: install MiniMax Code, configure a workspace / terminal / permission mode, or explain model internals. Desktop: [Code welcome](https://agent.minimaxi.com/docs/code/welcome). Internals: [Learn LLM](https://llm.zenheart.site/chapters/).

## Prerequisites

- You can open [agent.minimax.io](https://agent.minimax.io/) or [agent.minimaxi.com](https://agent.minimaxi.com/).
- A MiniMax account. The button on the product page is **Sign in** / **登录**.
- No local repo. No CLI.

## Learning objectives

1. Tell Agent (web) apart from Code (desktop).
2. Pick Lightning or Pro from task length.
3. Send a task that names a deliverable, and know when to add Agent Team or a skill.

## What it is

MiniMax Agent is a general-purpose agent in the browser. The [launch post](https://www.minimaxi.com/news/minimax-agent) designs it as a "reliable person" and lists three bars:

| Bar | Official wording |
|-----|------------------|
| Programming | More components and complex jumps; simulate user actions for tests; care about UI |
| Multimodal | Understand long text, video, audio, images; built-in image / audio / video generation |
| MCP | Built-in MiniMax MCP; also lists GitHub / GitLab / Slack / Figma |

The home page currently says "MiniMax makes your work easier" and exposes an **Agent Team** control plus a model picker (MiniMax-M3 was visible on 2026-08-19).

It is **not**:

- MiniMax Code (desktop; [welcome](https://agent.minimaxi.com/docs/code/welcome): conversation, project workspace, files, terminal, browser, skills, memory, and automation in one local environment)
- MiniMax Design / Hub (creation canvas)
- Hailuo, Xingye / Talkie, or Audio (see the [map](./index.md))

## Step 1: Open the workbench

1. Open [agent.minimax.io](https://agent.minimax.io/) (international) or [agent.minimaxi.com](https://agent.minimaxi.com/) (China).
2. Click **Sign in**.
3. Describe the goal in the home input. On 2026-08-19 the international home showed shortcuts such as **Video generation**, **Document**, **Website**, **Image Generation**.
4. If you need the desktop app, the home page has **Download desktop**. The [download page](https://agent.minimaxi.com/download) is currently titled **MiniMax Code**. That is the desktop brand, not the next step of this tutorial.

## Step 2: Pick Lightning or Pro

From the [M2 post](https://www.minimaxi.com/news/minimax-m2) (EN: [M2 & Agent](https://www.minimaxi.com/en/news/minimax-m2)):

| Mode | Official positioning | Official examples |
|------|----------------------|-------------------|
| **Lightning** | High-efficiency, high-speed agent | Conversational Q&A, lightweight search, simple coding |
| **Pro** | Professional agent quality on complex, long-running tasks | In-depth research, full-stack development, PPTs / reports, web development |

How to choose:

- One question, one lookup, a small code tweak → Lightning.
- A sourced report, a slide deck, a working page, a full-stack handoff → Pro.
- Unsure → Lightning first. Switch to Pro if the deliverable is thin. Do not default every task to Pro.

These names come from the official product post. The exact toggle label is whatever you see after sign-in. This page does not invent a click path.

## Step 3: Send the first task

The official line is to show the requirement. Put the **deliverable** in the first message.

```
Research the official difference between MiniMax Agent and MiniMax Code.
Use only pages on minimaxi.com, minimax.io, agent.minimaxi.com, and agent.minimax.io.
Deliver:
1. A Markdown comparison table (product, entry, fit, not-fit)
2. An 8-slide HTML outline for frontend engineers
Do not describe model internals.
```

Watch three things:

1. Does the agent confirm the goal before dumping text?
2. Are citations stable official URLs? The [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) note says formal sources should use stable URLs; search caches are clues only.
3. Can you open or download the file? A chat transcript is not the deliverable.

Use **Pro** for this first task. It is long-horizon research with two outputs.

## Step 4: Turn on Agent Team only for work that must split

The [Agent Team article](https://agent.minimaxi.com/docs/techblog/agent-team.md): the user still sends one message; the system decides whether to split, which roles can run in parallel, and which results must be verified.

Official roles:

- **Leader** — turn the goal into a task structure.
- **Worker** — run a sub-task; tools / context / output contract can differ.
- **Verifier** — turn "done" into "shippable". Officially adversarial to the Worker.

Turn Team on when:

- You need parallel research, cross-checks, then a synthesis.
- A document must go from "generated" to "shippable" (official office pipeline: Planner / Writer / Formatter / Evaluator).
- You are on IM and cannot stare at a spinner. Officially the lead agent replies first and runs the rest in the background.

Leave Team off when:

- You are fixing a typo, checking one fact, or making one image. The official article says a single agent is cheaper there.
- You have not written an acceptance bar. Team amplifies a vague goal.

The home page has an **Agent Team** control. A `/team` mention appears in the desktop changelog. On the web, use the control you can see. Do not copy Code slash commands into this tutorial as required steps.

## Step 5: Extend with the skill marketplace

Open [agent.minimaxi.com/skills](https://agent.minimaxi.com/skills) (also on the `.io` host). Official copy: explore, install, and use capabilities built by developers and the community. Custom creation and GitHub import are listed.

On 2026-08-19 the marketplace showed first-party skills for decks, industry research, DOCX, long-form posts, image prompts, equity analysis, Excel, and PowerPoint. **The catalog changes.** Trust the live page.

How to use it:

1. Search for an existing skill before starting a long task.
2. After you have run the same flow twice, consider saving it as a skill. The Team article treats memory and Skill as the long-term value of a run.
3. Do not merge this page with the Code plugin marketplace. Plugin launch notes live in the Code changelog.

## Billing: quote both official lines

| Source | Wording | How to read it |
|--------|---------|----------------|
| [M2 post](https://www.minimaxi.com/en/news/minimax-m2) | MiniMax Agent is offered free "until our servers can't keep up" | A time-boxed launch policy, not an SLA |
| [Skill marketplace](https://agent.minimaxi.com/skills) | Unified billing through Token Plan | Quota is whatever the signed-in plan page shows |
| [Download page](https://agent.minimaxi.com/download) | Plus ¥49 / Max ¥119 / Ultra ¥469 | The page brand is MiniMax Code. Do not treat those prices as Agent-web-only |

Use **See Plan and pricing** after sign-in. This page does not invent token-pack sizes.

## Common pitfalls

| Pitfall | Do this instead |
|---------|-----------------|
| Turning this tutorial into a Code CLI guide | Stop at the browser. Workspace / terminal / Coding mode belong in #72 |
| Pro or Team on every prompt | Lightning for short Q&A |
| Citing a reseller blog | Official stable URLs only |
| Writing "always free" | Link the live plan page |
| Treating Hub as another name for Agent | Hub currently lands on Design |
| Explaining MSA / attention | [Learn LLM](https://llm.zenheart.site/chapters/) |

## Next steps

- Recipes: [Cookbook](./minimax-agent-cookbook.md)
- Entries and sources: [Cheatsheet](./minimax-agent-cheatsheet.md)
- Names: [Glossary](./minimax-agent-glossary.md)
- Local repo: [Code welcome](https://agent.minimaxi.com/docs/code/welcome)
