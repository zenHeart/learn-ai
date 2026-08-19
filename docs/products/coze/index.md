---
title: Coze learning map
description: "Coze, Coze Programming, and Coze Loop are not one product. This handbook is about building and publishing agents on Coze Programming. Doubao and Trae are out of scope."
domain: product
tags:
  - agent-builder
role: map
---

# Coze learning map

> **Coze Programming** is the build path in this directory. Official wording ([What is Coze Programming](https://docs.coze.cn/guides_welcome)):
>
> Coze Programming is an AI-driven application platform. Describe the need clearly and it can produce production agents, workflows, skills, mobile apps, web apps, or mini programs.
>
> **Coze** itself is a different door. Official wording ([What is Coze](https://docs.coze.cn/what_is_coze)): "a next-generation AI team collaboration platform for the Agent era." You dispatch agents there. You do not draw the low-code canvas there.

## Product landscape

ByteDance ships several AI products. Even the ones branded Coze are not the same surface. This directory covers **agent building only**.

```
ByteDance AI (this directory expands the Coze family only)
├── Coze (coze.cn) — team workspace for humans + agents
│   ├── Coze Agent / cloud Agent / local Agent
│   ├── projects, skill store, cloud phone / cloud computer
│   └── in-chat AI programming (web / app / mini program; a subset of Coze Programming)
├── Coze Programming (code.coze.cn) — build agents / workflows / apps  ← main path
│   ├── Low-code: visual agents, workflows, plugins, knowledge
│   ├── AI programming: full-code agents / workflows / web / app / mini program / skills
│   └── Coze CLI (npm @coze/cli)
├── Coze Loop (commercial name: 扣子罗盘) — prompts / eval / traces
├── Open-source cores
│   ├── Coze Studio (self-host the builder)
│   └── Coze Loop OSS
└── Same vendor, not documented here
    ├── Doubao — chat (#79)
    ├── Trae — coding IDE (#80)
    └── Volcengine Ark — model API (#82)
```

| Product | What it is | Entry | This site |
|---------|------------|-------|-----------|
| **Coze Programming** | Build, debug, and publish agents in the browser | [code.coze.cn](https://code.coze.cn/) | [Tutorial](./coze.md) |
| Coze | Consumer AI team workspace (web / desktop / app) | [coze.cn](https://www.coze.cn/) | One map row; [official start](https://docs.coze.cn/what_is_coze) |
| Coze Loop | Prompt, evaluation, traces | [What is Coze Loop](https://docs.coze.cn/cozeloop_what-is-cozeloop) | One map row |
| Coze Studio | Open-source single-node engine | [github.com/coze-dev/coze-studio](https://github.com/coze-dev/coze-studio) | One map row; commercial cloud is not self-hosted |
| Coze Loop OSS | Open core of Loop | [github.com/coze-dev/coze-loop](https://github.com/coze-dev/coze-loop) | One map row |
| Coze.com | International site | [coze.com](https://www.coze.com/), [docs.coze.com](https://docs.coze.com/) | One map row; accounts and channels differ |
| Coze Pro / Enterprise | Enterprise plan on Volcengine | [volcengine.com/product/coze-pro](https://www.volcengine.com/product/coze-pro) | One map row; [plans](https://docs.coze.cn/guides_edition) |
| Doubao | Same-vendor chat | [doubao.com](https://www.doubao.com/) | **No tutorial** → #79 |
| Trae | Same-vendor IDE | [trae.cn](https://www.trae.cn/), [trae.ai](https://www.trae.ai/) | **No tutorial** → #80 |
| Ark | Same-vendor model API | [volcengine.com/product/ark](https://www.volcengine.com/product/ark) | **No tutorial** → #82 |
| Feishu / WeChat / Douyin | Publish channels, not Coze products | [Publish overview](https://docs.coze.cn/guides_publish_overview) | Not this site |

**Names that collide**

- **Coze ≠ Coze Programming.** Workspace vs builder.
- **Coze ≠ Doubao.** Doubao is chat. The low-code “publish to Doubao” channel closed on **2026-07-01** ([FAQ](https://docs.coze.cn/guides_FAQ)).
- **Coze Programming ≠ Trae.** Trae is an IDE.
- **Low-code agent ≠ full-code agent.** Visual canvas vs AI-programming chat.
- **Cloud “Claude Code / Codex CLI” ≠ vendor CLIs.** Those frameworks run on a Coze cloud computer. You cannot sign in to Anthropic or OpenAI there ([consumer FAQ](https://docs.coze.cn/cozespace_coze_app_faq)).
- **Coze Studio ≠ Coze Programming.** Studio is the open single-node core. Commercial Coze Programming does not offer private deployment.
- Older **Bot** = today’s low-code agent.

### Decision tree

```
What do you need?
├── Zero-code conversational agent, then Feishu / WeChat / API
│   └── Coze Programming · low-code agent (start with the tutorial)
├── Fixed pipeline (report, batch, multi-step tools)
│   └── Coze Programming · low-code workflow (Cookbook)
├── One sentence → full-code agent / web / app / mini program
│   └── Coze Programming · AI programming (Cookbook)
├── Drive Coze from a terminal or another agent
│   └── Coze CLI
├── Work with several agents, PPT / video, local files
│   └── Coze (coze.cn) — not a step-by-step tutorial here
├── Prompt eval and traces
│   └── Coze Loop
├── Data must stay on your machines
│   └── Coze Studio (Programming itself cannot be self-hosted)
├── Chat / copywriting only
│   └── Doubao (#79)
└── Repo IDE
    └── Trae (#80), or Claude Code / Cursor / Grok Build on this site
```

Sources: [what_is_coze](https://docs.coze.cn/what_is_coze), [guides_welcome](https://docs.coze.cn/guides_welcome), [about-low-code-project](https://docs.coze.cn/about-low-code-project), [guides_FAQ](https://docs.coze.cn/guides_FAQ), [cozespace_coze_app_faq](https://docs.coze.cn/cozespace_coze_app_faq).

## Goals and non-goals

**Goals**

- Pick the right Coze door.
- Follow the official path to a published low-code agent.
- Jump to a recipe when you need workflows, knowledge, plugins, skills, or the CLI.

**Non-goals**

- No full Doubao, Trae, or Ark tutorials.
- No PPT / short-video / cloud-phone office manual.
- No model internals (see [Learn LLM](/tech/fundamentals/LLM)).
- No private-cloud implementation guide for Studio.

## Which page

| Page | Type | When |
|------|------|------|
| [Tutorial](./coze.md) | Tutorial | First time: sign up → low-code agent → debug → publish |
| [Cookbook](./coze-cookbook.md) | How-to | You can click the UI; you have one job |
| [Cheatsheet](./coze-cheatsheet.md) | Reference | Plans, channels, CLI, limits, sources |
| [Glossary](./coze-glossary.md) | Explanation | Colliding names, or an old Bot tutorial |

## Learning path

| Stage | Read | Outcome |
|-------|------|---------|
| 1. Pick a door | This map | Do not open Doubao or Trae by mistake |
| 2. Ship one agent | [Tutorial](./coze.md) | Official “praise bot” path |
| 3. Add capability | [Cookbook](./coze-cookbook.md) | Plugin / knowledge / workflow / publish / CLI |
| 4. Look up | [Cheatsheet](./coze-cheatsheet.md) | Plans and commands |
| 5. Align words | [Glossary](./coze-glossary.md) | Skill vs plugin vs workflow |

## Feature index (builder surface)

| Capability | One line | Official |
|------------|----------|----------|
| Low-code agent | Persona + model + skills panel | [Overview](https://docs.coze.cn/guides_agent_overview), [Quick start](https://docs.coze.cn/guides_quickstart) |
| Full-code agent | Chat produces a deployable project | [Develop an agent](https://docs.coze.cn/guides_vibe_coding_agent) |
| Workflow / chatflow | Drag nodes; chatflow is for chatbots | [Low-code workflow](https://docs.coze.cn/guides_workflow) |
| Plugin | One plugin, many API tools | [Plugins](https://docs.coze.cn/guides_plugin) |
| Knowledge | Documents / tables / images; plus Volcengine knowledge | [Knowledge](https://docs.coze.cn/guides_knowledge) |
| Memory | Variables, database, long-term memory | [Overview · memory](https://docs.coze.cn/guides_agent_overview) |
| Skill | `SKILL.md` folder, loaded on demand | [Skills](https://docs.coze.cn/guides_skill_overview) |
| Publish | Store, Feishu, WeChat, mini programs, API, Chat SDK | [Publish](https://docs.coze.cn/guides_publish_overview) |
| Coze CLI | `npm i -g @coze/cli`, binary `coze` | [Coze CLI](https://docs.coze.cn/developer_guides_coze_cli) |

## Freshness

- **Coze 3.0**: official date **2026-05-29** for multi-agent collaboration ([consumer FAQ](https://docs.coze.cn/cozespace_coze_app_faq)).
- **Doubao publish channel** for low-code agents: closed **2026-07-01**.
- **Douyin avatar**: removed 2025-09-03.
- **Workflow / image-flow store**: taken down.
- Ignore 2024 blogs that still say “Bot + one-click Discord / Doubao”.

## Related

- [Tutorial](./coze.md)
- [Cookbook](./coze-cookbook.md)
- [Cheatsheet](./coze-cheatsheet.md)
- [Glossary](./coze-glossary.md)
- [Products](../index.md)
