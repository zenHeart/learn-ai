---
title: "Coze Programming: build a low-code agent"
description: "Official path: sign in to Coze Programming, create a low-code agent, write a persona, debug, then publish. Not Doubao chat. Not Trae."
domain: product
tags:
  - agent-builder
role: tutorial
---

# Coze Programming: build a low-code agent

> This is a **tutorial**. Finish it and you have a conversational low-code agent you can publish.
>
> Plans and channels: [Cheatsheet](./coze-cheatsheet.md). Workflows / knowledge / CLI: [Cookbook](./coze-cookbook.md). Words: [Glossary](./coze-glossary.md).

Goal: go from “I heard Coze can build bots” to “I published one.”

## Prerequisites

- Open [code.coze.cn](https://code.coze.cn/) (China). International is [coze.com](https://www.coze.com/). Do not mix accounts or channels.
- A phone number or Douyin account ([sign-up](https://docs.coze.cn/guides_sign_up)).
- No coding required. The official quick start says so.
- Team / enterprise members must use their plan’s login entry.

## Learning objectives

- Tell Coze the workspace from Coze Programming the builder.
- Create a low-code agent the official way.
- Write a persona that actually constrains the model.
- Reference plugins in the persona, or they may never run.
- Preview before you publish.

## Step 0: open the right site

| You think you are… | Open | Do not open |
|--------------------|------|-------------|
| Building an agent / workflow | [code.coze.cn](https://code.coze.cn/) | Doubao, Trae |
| Working with ready-made agents | [coze.cn](https://www.coze.cn/) | Not this tutorial |
| Reading docs | [docs.coze.cn](https://docs.coze.cn/) | Random 2024 Bot blogs |

Official docs still call the visual builder “an earlier version of Coze Programming,” but **new low-code agents still start in Coze Programming** ([about-low-code-project](https://docs.coze.cn/about-low-code-project), [guides_quickstart](https://docs.coze.cn/guides_quickstart)).

Free personal plan is enough to try. Paid tiers: [Cheatsheet · plans](./coze-cheatsheet.md#plans-and-credits). Do not memorize prices.

## Step 1: create a low-code agent

These clicks match the official “build an AI assistant” (praise-bot) page:

1. Sign in to **Coze Programming**.
2. Pick a workspace at the top. Click **New project**.
3. Under **Low-code**, click **Agent development**.
4. Name it and describe it. Use **Generate** next to the icon, or switch to **AI create**.
5. Confirm. The arrange page has:
   - Left: **Persona & reply logic**
   - Center: **Skills** (plugins, workflows, knowledge)
   - Right: **Preview & debug**

Source: [guides_quickstart](https://docs.coze.cn/guides_quickstart).

## Step 2: write a persona, not just a name

The persona applies to every session. Official advice: role, tone, and what it must refuse.

Official praise-bot sample:

```md
# Role
You are a high-energy praise-and-encourage bot. Use warm language so people leave more confident.

## Skills
### Skill 1: praise strengths
1. When the user mentions a trait or action, find the strength and praise it.
2. If they mention nothing, ask a question first, then praise.

### Skill 2: encourage through difficulty
1. When they mention a hard problem, encourage and give a concrete next step.
2. If they seem low without saying why, ask, then encourage.

### Skill 3: factual questions
If you cannot answer, call Search.

## Limits
- Only praise and encourage. No negative judgment.
- Stay inside the requested format.
```

Use **auto-optimize prompt**, then read the result. Do not assume the rewrite is your intent.

Models, single vs multi-agent, Temperature: [overview](https://docs.coze.cn/guides_agent_overview), [set the model](https://docs.coze.cn/guides_llm). Personal free / plus can use Doubao, DeepSeek, and similar. Enterprise can also use other Ark models. Copy names from the live console, not from old screenshots.

## Step 3: add skills only when the model is not enough

Official rule: if the model can do the job, stop at the persona. Add skills for search, PPT, or private manuals.

Official “Toutiao Search” steps for the praise bot:

1. In Skills, click **+** next to **Plugin**.
2. Search **头条搜索** / Toutiao Search and **Add**.
3. In the persona, type `{` and **reference** the plugin. Without the reference, the agent may never call it.

Opening lines, suggested questions, background images, and voice are UX, not capability. Knowledge and workflows live in the [Cookbook](./coze-cookbook.md).

## Step 4: preview, then publish

Chat in **Preview & debug** first.

Check:

- The model does not introduce itself as Doubao / DeepSeek if you named it something else.
- Plugin questions actually hit the tool.
- Refused topics stay refused.

The debug pane shows the run. If production is slow or silent, look there before blaming the model.

## Step 5: publish

Official steps:

1. **Publish** at the top right.
2. Write a release note and pick channels.
3. **Publish** again.

Default channels include the Coze store / community, Feishu, WeChat (customer service / service account / subscription), Juejin, Douyin / WeChat mini programs, API, and Chat SDK. Full table: [publish overview](https://docs.coze.cn/guides_publish_overview) and the [cheatsheet](./coze-cheatsheet.md#publish-channels).

**Do not look for the Doubao channel.** That low-code entry closed on **2026-07-01**. Already published agents stay up ([FAQ](https://docs.coze.cn/guides_FAQ)).

Publish packs the project, runs a Coze review, then a channel review. Failures go back to the on-screen hint and the [content rules](https://docs.coze.cn/guides_content_principles).

Store and debug chats time out at **10 minutes** (“run aborted”). Shorten the workflow.

## Alternate path: full-code agent

To say one sentence and let the platform write the agent:

1. Open [code.coze.cn](https://code.coze.cn/).
2. Open the **Agent** tab.
3. Describe features, logic, and constraints. Submit.
4. Wait for the project and unit tests, then preview.

This burns programming-task credits, built-in integrations, and hosting after deploy. Details: [develop an agent](https://docs.coze.cn/guides_vibe_coding_agent) and the [Cookbook](./coze-cookbook.md#generate-a-full-code-agent-with-ai-programming).

AI programming inside Coze (coze.cn) **cannot** replace this for agents and workflows.

## Pitfalls

| Symptom | Cause | Fix |
|---------|-------|-----|
| Agent calls itself Doubao / DeepSeek | Persona never overrode the default identity | Name the role in the persona |
| Plugin never runs | No `{` reference | Reference the tool |
| No Doubao channel | Closed 2026-07-01 | Feishu / WeChat / API |
| “Run aborted” in debug | 10-minute timeout | Shorten the workflow |
| Want to self-host Programming | Commercial cloud cannot | Use [Coze Studio](https://github.com/coze-dev/coze-studio) |
| Landed in Doubao or Trae | Wrong product | Back to the [map](./index.md) |

## Next

- Knowledge or workflows: [Cookbook](./coze-cookbook.md)
- Plans, CLI, channels: [Cheatsheet](./coze-cheatsheet.md)
- Skill / plugin / workflow: [Glossary](./coze-glossary.md)
