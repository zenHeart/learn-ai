---
title: CodeBuddy Learning Map
description: "Tencent Cloud CodeBuddy is a family of AI coding surfaces that share one account quota: a standalone IDE, editor plugins, and a terminal CLI. This page is the family map and decision tree."
domain: product
tags:
  - coding-agent
role: map
---

# CodeBuddy Learning Map

> Tencent Cloud Code Assistant **CodeBuddy** ships **IDE, plugin, and CLI** forms. Official wording ([docs overview](https://www.codebuddy.cn/docs/), [Tencent Cloud product overview](https://cloud.tencent.com/document/product/1831/134343)):
>
> The product supports IDE, plugin, and CLI forms, covering full-scenario needs from professional developers to zero-foundation users.

This page is the landscape and decision tree — **name the surface first, then decide what to learn**. Install steps live in the [tutorial](./codebuddy).

## Product family

Top-level entries on the docs site (opened 2026-08-18 at [codebuddy.cn/docs](https://www.codebuddy.cn/docs/)):

```
Tencent Cloud / CodeBuddy family
├── CodeBuddy IDE — standalone editor, "conversation is programming"
├── CodeBuddy Plugin — extension inside VS Code / JetBrains / …
├── CodeBuddy Code (CLI) — terminal agent, command `codebuddy`
├── WorkBuddy — office workbench (no tutorial in this directory)
│   ├── WorkBuddy mini program
│   └── WorkBuddy mobile
└── Enterprise — SaaS flagship / dedicated edition (no tutorial here)
Same-vendor AI (no tutorial in this directory)
├── Yuanbao — general assistant
└── Hunyuan — model, not a coding product
```

| Official first-level entry | What it is | Official URL | This site |
|----------------------------|------------|--------------|-----------|
| **CodeBuddy IDE** | Product-design-dev workbench; "conversation is programming" | [Docs overview](https://www.codebuddy.cn/docs/) · [Install](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation) · [Download](https://www.codebuddy.cn/ide/) | [Tutorial](./codebuddy#install-the-ide) |
| **CodeBuddy Plugin** | AI assist inside an existing editor | [Plugin docs](https://www.codebuddy.cn/docs/plugin/) | [Tutorial](./codebuddy#install-the-plugin) |
| **CodeBuddy Code (CLI)** | Natural-language driven development in the terminal | [CLI docs](https://www.codebuddy.cn/docs/cli/) · [Install](https://www.codebuddy.cn/docs/cli/installation) | [Tutorial](./codebuddy#install-the-cli) |
| **WorkBuddy** | "Tencent's all-scenario AI office workbench." | [WorkBuddy intro](https://www.codebuddy.cn/docs/workbuddy/) · [Site /work](https://www.codebuddy.cn/work/) | **One map row**, no tutorial |
| **WorkBuddy mini program** | One mobile entry for WorkBuddy | [Mini program intro](https://www.codebuddy.cn/docs/workbuddymini/) | **One map row**, no tutorial |
| **WorkBuddy mobile** | Companion app for desktop WorkBuddy | [Mobile intro](https://www.codebuddy.cn/docs/workbuddyapp/) | **One map row**, no tutorial |
| **Enterprise** | SaaS flagship / dedicated private-cloud edition | [Purchase flow](https://www.codebuddy.cn/docs/ide/Codebuddy-enterprise-edition/Codebuddy-enterprise-purchase) · [Cloud overview](https://cloud.tencent.com/document/product/1831/134343) | **One map row**, no tutorial |
| **Yuanbao** | Tencent general AI assistant | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | **One map row** (issue #76) |
| **Hunyuan** | Tencent model; one of the engines CodeBuddy can switch to | [hunyuan.tencent.com](https://hunyuan.tencent.com/) · [Cloud tclm](https://cloud.tencent.com/product/tclm) | **One map row** (issue #77) |

**Out of scope**: WeChat, QQ, CVM, payments. If those appear in a vendor nav, mark them "not this site".

Official form comparison ([product overview](https://cloud.tencent.com/document/product/1831/134343)):

| | **CodeBuddy Plugin** | **CodeBuddy IDE** | **CodeBuddy Code** |
|---|---------------------|-------------------|---------------------|
| Audience | Everyday coders / people locked to one IDE | PMs / designers / full-stack / beginners | DevOps / SRE / senior engineers |
| Strength | Plug in, stay in the current workflow | Product-design-dev; CloudBase / EdgeOne Pages / CloudStudio | Shell / files / network; headless; task orchestration / Sub Agent |
| How to start | Search **腾讯云代码助手** in the marketplace | Intl [codebuddy.ai](https://www.codebuddy.ai/) · CN [copilot.tencent.com/ide](https://copilot.tencent.com/ide) | `npm install -g @tencent-ai/codebuddy-code` |

The three coding forms **share one account quota** ([troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)).

### Quick decision: which surface?

```
What am I doing?
├── I already live in VS Code / JetBrains / Visual Studio
│   └── → Plugin (marketplace search 腾讯云代码助手)
├── I want one sentence → prototype / mock / deployable app
│   └── → IDE
├── The work is in a terminal: scripts, CI, bulk refactors, headless
│   └── → CodeBuddy Code (`codebuddy` / `codebuddy -p`)
├── Office docs / PPT / local file batching, not a git repo
│   └── → WorkBuddy (not taught here)
└── General chat / search, not a coding product
    └── → Yuanbao (not taught here)
```

Three name collisions to lock in:

| Easy to confuse | Difference |
|-----------------|------------|
| **CodeBuddy** vs **WorkBuddy** | Coding family vs office workbench |
| **Editor plugin** vs **CLI `plugin`** | VS Code extension vs `codebuddy plugin install` |
| **Hunyuan** vs **CodeBuddy** | Model vs product; official docs also mention DeepSeek |

More look-alikes live in the [Glossary](./codebuddy-glossary).

## Which page to read

This set follows [Diataxis](https://diataxis.fr/):

| Page | Type | When |
|------|------|------|
| [Tutorial](./codebuddy) | Tutorial | First time: install IDE / plugin / CLI → sign in → first chat |
| [Cookbook](./codebuddy-cookbook) | How-to | Already running; copy `/init`, print mode, custom commands, MCP, migration |
| [Cheatsheet](./codebuddy-cheatsheet) | Reference | Install text, CLI commands, slash commands, keys |
| [Glossary](./codebuddy-glossary) | Explanation | Forms, permission modes, `CODEBUDDY.md`, CN vs intl sites |

## Learning path

| Stage | Read | Goal |
|-------|------|------|
| 1. Pick a form and install it | [Tutorial](./codebuddy) | Sign in on one surface in 15 minutes |
| 2. First real task | Tutorial first chat; CLI starts with `/init` | Let it read the repo or make a small edit |
| 3. Daily workflow | [Cookbook](./codebuddy-cookbook) | Print mode, slash commands, MCP |
| 4. Look up flags | [Cheatsheet](./codebuddy-cheatsheet) | Commands and official install text |
| 5. Untangle names | [Glossary](./codebuddy-glossary) | WorkBuddy / Hunyuan / CLI plugin stay distinct |

## Feature snapshot

| Capability | Where | Official source |
|------------|-------|-----------------|
| Inline completion, chat, `@workspace` / `#Codebase` | Plugin | [Product overview](https://cloud.tencent.com/document/product/1831/134343) |
| Natural language → PRD / design / code / one-click deploy | IDE | Same |
| Interactive REPL, `codebuddy -p`, slash commands, MCP | CLI | [Quick start](https://www.codebuddy.cn/docs/cli/quickstart) · [CLI reference](https://www.codebuddy.cn/docs/cli/cli-reference) |
| Skills / Hooks / subagents / Daemon | CLI (advanced) | [CLI tree](https://www.codebuddy.cn/docs/cli/) |

## Goals and non-goals

**Goal**: Help a front-end engineer tell the three CodeBuddy coding surfaces apart, then install, sign in, and finish a first task from official steps.

**Non-goals**:

- No full tutorials for Yuanbao, Hunyuan, or WorkBuddy
- No WeChat / QQ product pages
- No model internals
- No recycling of marketing percentages as measured results

## Resources

- [CN docs](https://www.codebuddy.cn/docs/)
- [Intl docs](https://www.codebuddy.ai/docs/) · [ZH mirror](https://www.codebuddy.ai/docs/zh/)
- [Tencent Cloud product acc](https://cloud.tencent.com/product/acc)
- [Pricing](https://www.codebuddy.cn/pricing/) — client-rendered; do not invent plan numbers here
- [Cheatsheet · sources](./codebuddy-cheatsheet#high-quality-sources)
