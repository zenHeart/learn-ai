---
title: Kimi chat and Agent cookbook
description: "You can already open kimi.com. One recipe per job: goal, official entry, steps, pitfall."
domain: product
tags:
  - chat
role: cookbook
---

# Kimi chat and Agent cookbook

You can already open [kimi.com](https://www.kimi.com/). One recipe per job. Kimi Code install is not here — see [Kimi Code](/products/kimi-code/).

## 1. Get a downloadable Agent deliverable

**Goal:** a site, deck, sheet, or report — not a chat paragraph.

**Entry:** [kimi.com/agent](https://www.kimi.com/agent); app model switch → **K3** ([Agent overview](https://www.kimi.com/help/agent/agent-overview)).

1. Use a task-shaped prompt (official style: build voting-site code).
2. Let planning / tools / delivery finish.
3. Download the project or Office file, or open the deploy link.

**Pitfall:** this Agent does not edit a git checkout on disk.

## 2. Use Swarm for large collection

**Goal:** hundreds of sources, multi-perspective review, or a very long document.

**Entry:** [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm); app → **K3 Swarm** ([Agent Swarm](https://www.kimi.com/help/agent/agent-swarm)).

Official examples you can adapt:

- collect 200+ Paul Graham essays
- top 3 creators in 100 YouTube niches
- a 100-page literature review from 40 PDFs

**Pitfall:** Moderato and above only; burns more credits than standard Agent; **[Beta]** may be limited.

## 3. Create a Project for long-running work

**Goal:** the same style guide / PDF set across many turns.

**Entry:** **+** next to Projects, or **+ New project** ([Projects](https://www.kimi.com/help/features/project)).

1. Name 1–50 characters; optional instructions (official example: "You are a senior product manager. Reply in Chinese and output in Markdown.").
2. Upload files: ≤ 100 MB each, up to 50.
3. Start a separate in-project chat per distinct output.
4. Project chats can use plugins, Skills, and Goal, and can switch models.

**Pitfall:** delete is permanent. Kimi Work Projects **do not** share this data.

## 4. Schedule a daily job

**Goal:** a briefing that runs without you clicking.

**Entry:** sidebar **Create scheduled task**, or natural language in chat ([Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks)).

Official copy-paste prompt:

> Every day at 9:00, summarize the latest market news as 3 key points plus 1 risk note, in Chinese, within 200 words.

1. Dry-run in a normal chat or use "Run once now".
2. If it depends on a Skill, install and test the Skill first.
3. Tasks created on kimi.com run in the cloud; the client need not stay open.

**Pitfall:** default expiry Daily +7 days, Weekly +1 month, Monthly +3 months. Local Kimi Work tasks do not backfill while the app is closed. Over the active cap, new tasks save as inactive.

## 5. Pin an output format with a Skill

**Goal:** weekly reports / SOPs / research structure without re-explaining.

**Entry:** [What are Skills?](https://www.kimi.com/help/features/what-are-skills)

1. Browse official / recommended skills; click **+**.
2. Type `/` to invoke, or let Kimi trigger.
3. Missing skill: upload a document, or `/skill-creator`.

Official names: `docx`, `deep-research`; recommended `sop-writer`, `event-etf-study`.

**Pitfall:** skills load only when relevant. Creating a skill consumes credits (Creating skills FAQ).

## 6. Attach plugins to Agent

**Goal:** company registry / GitHub / Notion instead of search-only.

**Entry:** sidebar **Plugins**, or **+** / `/` ([Plugins](https://www.kimi.com/help/features/plugins)).

1. Switch the model to **K3** or **K3 Swarm** (Deep Research / Websites / PPT also work).
2. Sign in, install, complete OAuth if asked.
3. You can invoke multiple plugins at once.

**Pitfall:** not supported in Claw or Kimi Plus chats. Signed-out users cannot install. Catalog varies by region and enterprise. Some plugins bill membership credits.

## 7. One-click deploy a Claw

**Goal:** a 24/7 cloud assistant on Feishu / WeCom without buying a server.

**Entry:** [kimi.com/bot](https://www.kimi.com/bot) ([Claw overview](https://www.kimi.com/en/help/kimi-claw/overview)).

1. Confirm **Allegretto or higher**.
2. **Create** Kimi Claw and wait.
3. **Settings → Chat channels**.

Existing OpenClaw: **Link existing OpenClaw**, install the Kimi plugin on that host.

**Pitfall:** default model is **K2.6**, billed to membership credits. Switching to K3 edits OpenClaw config, not a web slash command.

## 8. Start a Claw group chat

**Goal:** several Claws under Kimi Conductor.

**Entry:** Claw sidebar **+** → **Start Group Chat** ([group-chat](https://www.kimi.com/help/kimi-claw/group-chat)).

1. Required **Group Name** and **Group Goal**.
2. Select linked Claws, Create.
3. Set group rules in natural language.
4. Preview files in **Workspace**.
5. A Claw that will not stop: send **`/stop`** in the main chat.

**Pitfall:** group chat is Allegretto+, 10 groups on the membership table. If @-mention is silent, check the Claw's private chat first. Third-party OpenClaw version bounds are on the group-chat help page.

## Related pages

- [Learning map](./index.md)
- [Tutorial](./kimi.md)
- [Cheatsheet](./kimi-cheatsheet.md)
- [Glossary](./kimi-glossary.md)
