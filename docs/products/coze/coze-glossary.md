---
title: Coze glossary
description: "Align Coze, Coze Programming, agent, workflow, skill, plugin, Studio, and Loop. Spell out what each is not, including Doubao, Trae, and vendor CLIs."
domain: product
tags:
  - agent-builder
role: glossary
---

# Coze glossary

What each name **is** and **is not**. Clicks: [tutorial](./coze.md), [cookbook](./coze-cookbook.md). Parameters: [cheatsheet](./coze-cheatsheet.md).

## Map

```
                    ByteDance AI
          ┌────────────┼────────────┐
       Doubao #79    Coze family       Trae #80
                         │             Ark #82
        ┌────────────────┼────────────────┐
        │                │                │
     Coze workspace  Coze Programming   Coze Loop
      (coze.cn)       (code.coze.cn)   prompt/eval/trace
        │                │                │
   Coze/cloud/local    low-code | AI      commercial
      agents           agents/workflows   Coze Loop OSS
                         │
                    Coze Studio OSS
```

Plans sit above: personal / team / enterprise decide credits and collab. Building happens in Programming. Consumption happens in Coze. Eval happens in Loop.

---

## Coze

**What**: Official definition — “a next-generation AI team collaboration platform for the Agent era” ([what_is_coze](https://docs.coze.cn/what_is_coze)). Web, macOS / Windows desktop, mobile.

**Not**: the low-code canvas, Doubao, or Trae. In-chat AI programming only wraps web / app / mini program / import.

**Why it exists**: humans and several agents need a shared project, files, calendar, mailbox, and cloud devices. That is not “ship a support bot.”

---

## Coze Programming

**What**: an AI-driven app platform for agents, workflows, skills, web, apps, and mini programs ([guides_welcome](https://docs.coze.cn/guides_welcome)). Host: `code.coze.cn`.

**Not**: Trae. Not self-hostable (use Studio). The visual “low-code project” is an earlier surface, but new low-code agents still start here.

---

## Low-code agent

**What**: a conversational AI project. The model follows a persona and may call plugins / workflows / knowledge. Older docs say **Bot**.

**Not**: a full-code AI-programming project, and not a template “Coze Agent” on the consumer workspace.

**Typical jobs**: support, companion, assistant, tutor ([about-low-code-project](https://docs.coze.cn/about-low-code-project)).

---

## Full-code agent

**What**: a deployable project generated from the **Agent** tab on the Programming home ([guides_vibe_coding_agent](https://docs.coze.cn/guides_vibe_coding_agent)).

**Not**: the drag-and-drop arrange page. Publish leans toward API hosting, not the same channel table as “WeChat customer service.”

---

## Workflow / chatflow

**What**: executable node graphs. Workflows serve functions and data. Chatflows serve chatbots ([guides_workflow](https://docs.coze.cn/guides_workflow)).

**Not**: a skill (skills do not lock the path) or a plugin (a plugin is one node type).

---

## Plugin

**What**: a set of same-domain API tools ([guides_plugin](https://docs.coze.cn/guides_plugin)).

**Not**: a skill. A skill also says *when* and *how* to use the tools.

---

## Skill

**What**: `SKILL.md` plus optional scripts / references / assets. Loaded progressively ([guides_skill_overview](https://docs.coze.cn/guides_skill_overview)).

**Not**: the always-on system prompt, a fixed workflow, or MCP itself.

---

## Knowledge

**What**: a developer-owned static retrieval store. Two products: Coze knowledge and Volcengine knowledge.

**Not**: memory. Memory is per-user dynamic data and does not travel across agents.

---

## Coze Agent / cloud Agent / local Agent

Consumer-side runtimes ([cozespace_agent_overview](https://docs.coze.cn/cozespace_agent_overview)):

| Type | Runs on | Use when |
|------|---------|----------|
| Coze Agent | Native workspace | Office, creation, industry templates |
| Cloud Agent | Coze cloud computer | Claude Code / Codex / OpenClaw / Hermes frameworks without local ops |
| Local Agent | Your machine | Local files and toolchain |

Cloud frameworks are **not** the Anthropic or OpenAI apps. You cannot sign in to those accounts. Models come from Coze.

---

## Coze CLI

**What**: npm `@coze/cli`, binary `coze`. Turns Programming create / develop / deploy into commands for humans and agents.

**Not**: part of Trae, and not the Coze desktop app. Trae is only an example Skill install target.

---

## Coze Loop

**What**: developer platform for prompts, evaluation, and traces ([what is Loop](https://docs.coze.cn/cozeloop_what-is-cozeloop)). Same subscription logic as Programming.

**Not**: a builder canvas. OSS counterpart is Coze Loop; commercial Loop adds metrics and org controls.

---

## Coze Studio

**What**: open-source “all-in-one AI agent development tool,” Apache-2.0. Visual create / debug / deploy for agents, apps, and workflows.

**Not**: commercial Programming. Studio is a single-node core without workspaces, enterprise orgs, or multi-user collab ([FAQ](https://docs.coze.cn/guides_FAQ)).

---

## Coze Pro / Enterprise

**What**: the Volcengine product page [coze-pro](https://www.volcengine.com/product/coze-pro) plus the enterprise plan rows (standard / flagship). Hybrid: subscription + usage.

**Not**: a third canvas beside Programming. SSO / VPC follow [guides_edition](https://docs.coze.cn/guides_edition).

---

## Doubao / Trae / Ark

**What**: other ByteDance AI products. Doubao is chat. Trae is an IDE. Ark is a model API.

**Not**: this handbook’s build tutorial. A Doubao *model* in the persona is not the Doubao *product*. The Doubao *publish channel* is gone.

---

## Retired or renamed

| Phrase | Now |
|--------|-----|
| Bot | Low-code agent |
| Publish to Doubao | Entry closed 2026-07-01 |
| Douyin avatar | Removed 2025-09-03 |
| Workflow / image-flow store | Removed |
| Self-host Programming | Unsupported; use Studio |
| Clone a store agent’s full config | Store listings are private; use the template store |
