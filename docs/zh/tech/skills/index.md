---
title: Skills
description: "Skill 是需要时再加载的说明书。反复出现的流程再写成 Skill，不要加长系统提示。"
domain: tech
tags:
  - skill
listed: false
outline: [2, 3]
pageClass: catalog-page
---

# Skills

**结论**：同一段说明你贴了第三遍，就应该做成 Skill。它是 **按需加载的专业说明书**，不是更长的 system prompt。

> 循环、工具、HITL 仍是 Agent，见 [Agent](/zh/tech/patterns/agent/) 和 Learn LLM 第 13 章。本栏只教「怎么把流程写成可复用说明书」。

## 这一栏怎么读

```
本页
  → 1. 概览          Skill 解决什么
  → 2. 怎么写        文件夹、SKILL.md、何时触发
  → 3. 最佳实践      短、可测、不要人格
  → 附录             机制详解（想知道加载顺序时再读）
```

| 你卡在哪 | 读什么 |
|---|---|
| 不知道 Skill 和提示、MCP 差在哪 | [Claude Skills 概览](/zh/tech/skills/claude-skills-overview) |
| 要下手写一份 | [怎么写 Skill](/zh/tech/skills/how-to-create-skills) |
| 写了但助手乱触发 | [Skills 最佳实践](/zh/tech/skills/skills-best-practices) |
| 想看渐进式加载 | [Skills 机制](/zh/tech/skills/skills-mechanics-explained)（查阅，不是入门） |

## 和旁边几栏的分工

| | 放什么 |
|---|---|
| [Prompt](/zh/tech/prompt/) | 这一次任务怎么说清 |
| [AGENTS.md](/zh/tech/prompt/agents-doc) | 对这个仓库永远成立的命令 |
| **Skill** | 某一类任务的步骤、模板、脚本 |
| [MCP](/zh/tech/mcp/) | 接到外部系统的能力 |
| Agent | 要不要循环、怎么停 |

## 下一步

从 [概览](/zh/tech/skills/claude-skills-overview) 进，写一份你自己仓库里已经重复了三遍的流程。
