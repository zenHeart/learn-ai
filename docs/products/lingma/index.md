---
title: Lingma learning map
description: "TONGYI Lingma is Alibaba Cloud's coding assistant, renamed Qoder CN on 2026-05-20. This directory covers the plugin and standalone IDE only; Qwen, Model Studio, CLI, and office agents stay on one family-map row."
domain: product
tags:
  - coding-agent
role: map
---

# Lingma learning map

> **TONGYI Lingma** (Lingma) is Alibaba Cloud's intelligent coding assistant: code generation, ask, multi-file edits, and a coding agent. It maps to Copilot / Cursor, not to a consumer chat app.
>
> On **2026-05-20** the official suite name became **Qoder CN**. Help Center: "The Qoder CN series was formerly named 'AI Coding Assistant TONGYI Lingma' (Lingma) and was officially renamed on May 20, 2026. If you see references to TONGYI Lingma elsewhere, they refer to the same product." ([What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn), [EN quick start](https://www.alibabacloud.com/help/en/lingma/getting-started/individual-edition-quick-start))
>
> This directory documents **only the coding sub-product**: the standalone IDE and the IDE plugins. Other Alibaba AI products get one row on the family table.

## Product family

Primary official entries come from [What is the Qoder CN series](https://help.aliyun.com/zh/lingma/introduction-of-lingma) and [docs.qoder.cn](https://docs.qoder.cn/product-overview/introduction-of-qodercn). The marketing site [lingma.aliyun.com](https://lingma.aliyun.com/) still uses the old brand.

```
Alibaba Cloud AI (this handbook expands the coding assistant only)
├── TONGYI Lingma / Qoder CN (coding) — this directory
│   ├── Qoder CN IDE (marketing pages still say Lingma IDE)
│   ├── JetBrains plugin (current iteration surface)
│   ├── Visual Studio Code plugin (officially slowed / discontinued)
│   └── Visual Studio plugin
├── Qoder CN CLI — terminal, one map row
├── QoderWork CN — office desktop agent, one map row
├── QoderWake CN — digital employee, one map row
├── Qoder Cloud Agents — hosted agents, one map row
├── Qoder CN Mobile — mobile, one map row
├── Tongyi Qianwen / Qwen — consumer chat, one map row (#83)
└── Alibaba Cloud Model Studio (Bailian) — model platform, one map row (#85)
```

| Official first-level entry | Official URL | This site |
|----------------------------|--------------|-----------|
| **TONGYI Lingma / Qoder CN** (IDE + plugins) | [lingma.aliyun.com](https://lingma.aliyun.com/) · [qoder.com.cn](https://qoder.com.cn/) | **Standalone pages** (this directory) |
| Qoder CN CLI | [qoder.com.cn/cli](https://qoder.com.cn/cli) | One map row. Terminal product, not the plugin |
| QoderWork CN | [What is QoderWork CN](https://help.aliyun.com/zh/lingma/what-is-qoderwork-cn) | One map row. Office assistant, not a coding IDE |
| QoderWake CN | [qoder.com.cn/qoderwake](https://qoder.com.cn/qoderwake) | One map row. Digital employee |
| Qoder Cloud Agents | [qoder.com.cn/cloud-agents](https://qoder.com.cn/cloud-agents) | One map row. Hosted agent platform |
| Qoder CN Mobile | [qoder.com.cn/mobile](https://qoder.com.cn/mobile) | One map row. Mobile control surface |
| **Tongyi Qianwen / Qwen** | [qianwen.com](https://www.qianwen.com/) | One map row. Consumer chat; issue #83 |
| **Model Studio (Bailian)** | [Product page](https://www.aliyun.com/product/bailian) | One map row. Model / agent platform; issue #85 |
| Taobao / ECS / payments | — | **Out of scope.** Non-AI Alibaba products |

**Do not collapse these names:**

| Easy to mix | Difference |
|-------------|------------|
| Lingma vs **Qwen** | Coding assistant vs consumer chat |
| Lingma vs **Model Studio** | IDE / plugin vs model platform |
| **Lingma IDE / Qoder CN IDE** vs plugin | Standalone editor vs extension in your existing IDE |
| Chat **Agent mode** vs **Qoder CN CLI** vs **Cloud Agents** | Local IDE agent vs terminal product vs hosted platform |
| Marketplace search **TONGYI Lingma** vs Help Center **Qoder CN** | Old and new display names for the same plugin |

### Decision tree

```
What are you doing?
├── Already in a JetBrains IDE
│   └── → JetBrains plugin (current official iteration surface)
├── Want an AI-native IDE, no extra plugin
│   └── → Qoder CN IDE (marketing: Lingma IDE)
├── Still in VS Code
│   └── → Plugin is still installable; official docs say updates slowed / discontinued
│       └── If it breaks, official advice is to switch to Qoder CN IDE
├── In Visual Studio
│   └── → Visual Studio plugin (chat currently Ask-only)
├── Terminal only, no IDE
│   └── → Qoder CN CLI (not covered here)
├── Docs / files / office automation
│   └── → QoderWork CN (not covered here)
└── Chat with a model, or call an API
    └── → Qwen / Model Studio (not covered here)
```

## Which page to read

| Page | Type | When |
|------|------|------|
| [Tutorial](./lingma) | Tutorial | First run: install → sign in → complete → three chat modes |
| [Cookbook](./lingma-cookbook) | How-to | Mode choice, prompts, agent, MCP |
| [Cheatsheet](./lingma-cheatsheet) | Reference | Install URLs, compatibility, shortcuts, plans, sources |
| [Glossary](./lingma-glossary) | Explanation | Rename, surfaces, modes, "not this" |

## Learning path

| Stage | Goal | Link |
|-------|------|------|
| 1. Name the product | Lingma = today's Qoder CN coding sub-product | Family table; [glossary](./lingma-glossary) |
| 2. Install and sign in | IDE or plugin; Alibaba Cloud account | [Tutorial · install](./lingma#step-1-install) |
| 3. Completion + chat | Inline complete; Ask / Edit / Agent | [Tutorial · steps 3–4](./lingma#step-3-inline-completion) |
| 4. Let it work | Agent, terminal confirm, MCP | [Cookbook](./lingma-cookbook) |
| 5. Look up | Shortcuts, plans, official pages | [Cheatsheet](./lingma-cheatsheet) |

## Feature snapshot

From [What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn) and [Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat). Marketplace English names: Code Completion, Ask, Multi-file Edits, Code Agent.

| Capability | One line | Docs |
|------------|----------|------|
| Inline completion | Line / function suggestions from current + cross-file context | [Tutorial](./lingma) |
| Next Edit Suggestion (NES) | Predict the next edit; Tab to accept | [Cookbook](./lingma-cookbook) |
| Ask | Answers only; does not edit the repo | [Glossary](./lingma-glossary) |
| Edit | Multi-file edits in the range you give; **not on Lingma IDE / JetBrains** | [Official Edit](https://help.aliyun.com/zh/lingma/edit) |
| Agent | Plans, edits, terminal, optional MCP | [Cookbook](./lingma-cookbook) |
| Project awareness | Infers framework, stack, files, errors from the task | [lingma.aliyun.com](https://lingma.aliyun.com/) |
| Memory | Builds personal / project / issue memory during chat | [Official memory](https://help.aliyun.com/zh/lingma/memory) |
| MCP | Agent can call configured MCP servers | [Cookbook](./lingma-cookbook) |
| Model picker / Experts / Quest / RepoWiki | IDE-side upgrades, billed in Credits | [Glossary](./lingma-glossary) |

## Freshness

- **Brand:** suite name is Qoder CN from 2026-05-20. Older "TONGYI Lingma" pages still mean this product.
- **VS Code plugin:** Help Center still documents install and says updates will slow; billing says evolution stopped; docs.qoder.cn says unmaintained; EN update log says discontinued. Do not treat it as the current primary surface.
- **Edit mode:** official text excludes Lingma IDE and the JetBrains plugin. Visual Studio chat is Ask-only for now.
- **Plans:** Credits started 2026-05-20. Individual Pro free promo ended. Copy numbers only from [Billing](https://help.aliyun.com/zh/lingma/billing-description).
- **Docs host:** Help Center points newer content at [docs.qoder.cn](https://docs.qoder.cn/).

## Links

- [Lingma marketing site](https://lingma.aliyun.com/)
- [Qoder CN](https://qoder.com.cn/)
- [docs.qoder.cn](https://docs.qoder.cn/)
- [Help Center](https://help.aliyun.com/zh/lingma/)
- [EN Help Center](https://www.alibabacloud.com/help/en/lingma/)
- [Cheatsheet · sources](./lingma-cheatsheet#high-quality-sources)
