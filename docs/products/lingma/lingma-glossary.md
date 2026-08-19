---
title: Lingma glossary
description: "Why TONGYI Lingma was renamed Qoder CN, why the IDE is not the plugin, and how Ask / Edit / Agent differ. No install steps, no price table."
domain: product
tags:
  - coding-agent
role: glossary
---

# Lingma glossary

Explains names. Does not teach clicks. Tutorial: [lingma](./lingma). Map: [index](./).

## TONGYI Lingma / Qoder CN

**What it is:** Alibaba Cloud's coding assistant. Marketing: code generation, ask, multi-file edits, coding agent. Help Center: the coding-focused sub-product of the Qoder CN series (formerly "TONGYI Lingma").

**Why the rename:** official date 2026-05-20. The suite now also covers office, terminal, digital-employee, and hosted-agent products. The public-cloud coding desktop app is now **Qoder CN IDE**; the JetBrains plugin continues.

**Role:** maps to Copilot / Cursor (work inside an editor), not to a consumer chat site.

Official: [What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn), [What is the Qoder CN series](https://help.aliyun.com/zh/lingma/introduction-of-lingma).

## Qoder CN IDE / Lingma IDE

**What it is:** a standalone desktop IDE with the assistant built in. **No plugin install.** Marketing download pages still say **Lingma IDE**; Help Center and the new brand site say **Qoder CN IDE**.

**Why it exists:** official iteration is concentrated here (and on the JetBrains plugin). When the VS Code plugin slows or stops, this is the official replacement.

**Versus the plugin:** the plugin lives inside your current editor. The IDE is another client. Billing documents the upgrade as: uninstall Lingma IDE, install Qoder CN IDE.

## IDE plugins

**What they are:** extensions for JetBrains IDEs, Visual Studio Code, and Visual Studio. Marketplace / package IDs still say `TONGYI Lingma` / `tongyi-lingma`.

**What they are not:** not Qoder CN CLI, not QoderWork.

**VS Code:** Help Center still teaches install and says updates will slow; billing says evolution stopped; docs.qoder.cn says unmaintained; the EN update log says discontinued. Treat it as installable, not as the current primary surface.

## Ask / Edit / Agent

Three **modes in one chat**, not three products.

| Mode | What | Why it exists |
|------|------|----------------|
| Ask | Answers only | Understand first |
| Edit | Multi-file edits in your range; faster | You already know the files |
| Agent | Plans, tools, terminal | You only give the goal |

You can switch inside one thread. Edit is missing on Lingma IDE / JetBrains. Visual Studio is Ask-only for now. How-to: [cookbook](./lingma-cookbook).

## NES (Next Edit Suggestion)

**What it is:** predict the **next edit**, not the next line, from full-file context, recent edits, and the caret.

**What it is not:** ordinary inline completion. IDE changelogs later call the upgrade **NEXT**.

Official: [NES](https://help.aliyun.com/zh/lingma/next-edit-suggestion).

## Project awareness / memory

**Project awareness:** infer framework, stack, relevant files, and errors from the task so you do not paste the whole repo.

**Memory:** accumulate personal / project / issue memory during chat ([Memory](https://help.aliyun.com/zh/lingma/memory)).

These explain why opening related files helps. They do not mean "the model was trained on your private repo". Model internals are out of scope; see [Learn LLM](/tech/fundamentals/LLM).

## Quest / RepoWiki / Subagent / Experts

Listed on [What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn) as IDE-side upgrades:

- **Quest 2.0:** split a complex coding task into steps.
- **RepoWiki:** project-level wiki.
- **Subagent:** child agents.
- **Experts:** specialist agents for frontend, backend, database, ops, test.

Official: RepoWiki, Quest, and Subagent deduct Credits and are not turn-capped. This handbook does not split them into their own tutorials; operations live on [docs.qoder.cn](https://docs.qoder.cn/).

## Credits

**What it is:** the usage unit introduced with seats on 2026-05-20. Extra Credits are sold as add-on packs. After the full-suite account upgrade, individual Credits can be shared across IDE / JetBrains / QoderWork / CLI and other suite apps.

**What it is not:** unlimited free usage. The trial plan is explicitly limited, including a 2-week trial. Numbers: [Billing](https://help.aliyun.com/zh/lingma/billing-description).

## Not this

| Name | Actually | This site |
|------|----------|-----------|
| **Tongyi Qianwen / Qwen** | Consumer assistant ([qianwen.com](https://www.qianwen.com/)) | One map row, #83 |
| **Model Studio (Bailian)** | Model / agent platform | One map row, #85 |
| **Qoder CN CLI** | Terminal product | One map row |
| **QoderWork CN** | Office desktop agent | One map row |
| **QoderWake CN** | Digital employee | One map row |
| **Cloud Agents** | Hosted agent platform | One map row |
| **Taobao / ECS / payments** | Non-AI products | Out of scope |
| "Lingma is just Qwen's IDE skin" | False | Two products |
| "It is only a VS Code plugin" | False | Official default is IDE + JetBrains |

## Renamed or retired

| Old wording | Now |
|-------------|-----|
| AI Coding Assistant TONGYI Lingma | Qoder CN series from 2026-05-20 |
| Lingma IDE | Qoder CN IDE; uninstall then reinstall on the official path |
| TONGYI Lingma plugin display name | Help Center: Qoder CN; marketplace ID still `Alibaba-Cloud.tongyi-lingma` |
| Individual Pro limited-time free | Ended 2026-05-20 18:00; promo users moved to the community / trial tier |

Which door to open: [learning map](./).
