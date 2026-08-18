---
title: CodeBuddy Glossary
description: "No how-to. Name collisions in the CodeBuddy family: three coding surfaces, WorkBuddy, Hunyuan, CN vs intl sites, CODEBUDDY.md."
domain: product
tags:
  - coding-agent
role: glossary
---

# CodeBuddy Glossary

No how-to. This page answers "what is it / what is it not". Pick a surface on the [map](./).

## Concept map

```
Tencent AI (the slice this directory cares about)
├── CodeBuddy — coding family
│   ├── IDE
│   ├── Plugin (VS Code / JetBrains / …)
│   └── CodeBuddy Code (CLI, command codebuddy)
│       ├── Interactive REPL
│       ├── Print (-p)
│       └── CLI-native plugin / Skills / MCP
├── WorkBuddy — office workbench (not the coding path)
├── Yuanbao — general assistant
└── Hunyuan — model (one engine CodeBuddy can switch to)
```

## CodeBuddy

**What it is**: Tencent Cloud's AI coding assistant. Official definition ([docs overview](https://www.codebuddy.cn/docs/), [product overview](https://cloud.tencent.com/document/product/1831/134343)): **IDE, plugin, and CLI**.

**What it is not**: not Hunyuan itself, not Yuanbao, not WorkBuddy. Marketing copy says it is based on Hunyuan code models; the same official docs also mention DeepSeek and other chat models.

The three coding forms share one account quota ([troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)).

## CodeBuddy IDE

**What it is**: a standalone editor. Official pitch: a product-design-dev workbench; "conversation is programming". Audience: PMs / designers / full-stack / beginners.

**Why it exists**: the plugin assists inside an IDE you already have; the IDE keeps requirements, design, code, and deploy in one product.

**What it is not**: not a reskin of the VS Code extension. Requirements: macOS 11+ / Windows 10+ ([install](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation)).

## CodeBuddy Plugin

**What it is**: an extension for an existing editor. Official marketplace name: **腾讯云代码助手**. Hosts include VS Code, Visual Studio, JetBrains family, Android Studio, and WeChat DevTools ([plugin page](https://www.codebuddy.cn/docs/plugin/)).

**Why it exists**: you already have an editor and a workflow; you want completion, chat, and repo Q&A.

**What it is not**:

- not `codebuddy plugin` on the CLI
- listing WeChat DevTools as a host is not a WeChat or QQ product tutorial

## CodeBuddy Code

**What it is**: an AI CLI for professional engineers. Binary `codebuddy`, npm package `@tencent-ai/codebuddy-code`. Official audience: DevOps / SRE / senior engineers.

**Three faces** (one product):

| Face | Entry |
|------|-------|
| Interactive REPL | `codebuddy` |
| Print / headless | `codebuddy -p "..."` |
| Hosted extras | `codebuddy --serve`, `daemon`, `--bg` |

**What it is not**: not a retired "Tencent Copilot" product name. The CN login host is `copilot.tencent.com`; that is an auth site, not a second product.

## WorkBuddy

**What it is**: official wording ([WorkBuddy intro](https://www.codebuddy.cn/docs/workbuddy/)) — "WorkBuddy is Tencent's all-scenario AI office workbench." The docs nav lists it next to CodeBuddy IDE / plugin / CLI.

**Why it is on this table**: family completeness forbids dropping a first-level entry. Issue #78 only ships the three coding forms, so WorkBuddy stays one row.

**What it is not**: not "CodeBuddy IDE on a phone". The mini program and the App belong to WorkBuddy.

## Yuanbao

**What it is**: Tencent's general AI assistant. [yuanbao.tencent.com](https://yuanbao.tencent.com/).

**What it is not**: not CodeBuddy. No tutorial here (issue #76).

## Hunyuan

**What it is**: Tencent's model family. [hunyuan.tencent.com](https://hunyuan.tencent.com/), [cloud tclm](https://cloud.tencent.com/product/tclm). CodeBuddy official copy: Hunyuan, DeepSeek, and other chat models.

**What it is not**: not a coding IDE, and not something you `npm install`. No Hunyuan API tutorial here (issue #77).

## CN vs intl sites

**What they are**: two sites and two login domains.

| | China | International |
|--|-------|----------------|
| Docs / marketing | codebuddy.cn | codebuddy.ai |
| CLI login option | Chinese Site → copilot.tencent.com | International Site → codebuddy.ai |
| IDE download (official table) | [copilot.tencent.com/ide](https://copilot.tencent.com/ide) | [codebuddy.ai](https://www.codebuddy.ai/) |

**Why it matters**: model lists and auth domains differ. The official quick start says the China site supports mainstream CN models and the intl site supports mainstream overseas models.

**What they are not**: not "one site is stale". Both update. If an English overview omits the plugin form, follow the ZH overview and Tencent Cloud 1831 docs.

## Enterprise

**What it is**: SaaS flagship and dedicated private-cloud editions. Sign-in goes through Tencent Unified Identity or an address from your admin.

**What it is not**: not a reskin of the personal plan. Purchase is out of this tutorial.

## `CODEBUDDY.md`

**What it is**: the official counterpart of `CLAUDE.md` when migrating from Claude Code — "AI instructions and memory". The user-level path in the sample is `~/.codebuddy/CODEBUDDY.md`.

**Why it exists**: standing rules should not be retyped every session.

**What it is not**: not the CLI plugin list, and not the Skills directory. Skills live in `~/.codebuddy/skills/`; custom slash commands live in `.codebuddy/commands/`.

Whether a repo-root `CODEBUDDY.md` is auto-read is not a hard sentence on the troubleshooting page. Check `/config` and the official memory doc.

<!-- TODO: 待核实 — auto-injection scope of a repo-root CODEBUDDY.md -->

## Permission modes

**What they are**: CLI knobs for "ask me before this tool call". Official `--permission-mode` values: `default`, `acceptEdits`, `auto`, `dontAsk`, `plan`, `bypassPermissions`. The `Shift+Tab` cycle is written `default → bypass → accept → plan`.

**Why two namings**: the key hint uses short names; scripts should use the flag names.

**What they are not**: not the sandbox. `--sandbox` (official Beta) limits filesystem / network after a call is approved.

## CLI plugin vs editor plugin

| | Editor plugin | CLI plugin |
|--|---------------|------------|
| Lives in | VS Code / JetBrains… | `codebuddy plugin install` |
| Docs tree | `/docs/plugin/` | `/docs/cli/` plugin system / marketplace |
| Job | Completion and chat in an existing IDE | Package Skills / hooks / tools for the terminal agent |

Same English word, two installs.

## Do not write these as facts

- "CodeBuddy is only a plugin" — official first-level nav has three coding forms
- "CodeBuddy is the Hunyuan IDE" — Hunyuan is a model
- A `gh`-style Tencent Copilot extension as the current CLI — the shipping package is `@tencent-ai/codebuddy-code`
- WorkBuddy as a CodeBuddy mode
