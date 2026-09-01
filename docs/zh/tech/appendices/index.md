---
title: 附录区导览
description: 非主线但必须有位置的内容：训练桥接、案例研究、课程笔记、方法论存档、多模态与 AI 编码工具案例的入口、语言侧标注与边界声明。
domain: tech
tags: [tech, appendices, navigation]
navOrder: 0
topicId: appendices
layer: appendix
status: canonical
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# 附录区导览

**这是什么**：附录区收纳「不属于金字塔论证主线、但仍然必须有位置」的内容——训练类桥接页、真实案例、课程笔记、历史方法论存档。它们回答的是「还有什么可读」，不回答「下一步该学什么」。

**边界声明**：**附录不参与金字塔论证顺序**。主线从 [技术地图](../) 沿层 0→5 展开；附录页可以在任何时刻阅读，但不会被主线章节作为前置依赖。附录中的桥接页（bridge）负责把深层原理外包给 [Learn LLM](https://llm.zenheart.site/)，案例页（case）负责提供真实世界的证据，存档页（legacy）负责保留有历史价值但已被主线吸收或取代的内容。

## 子区一览

| 子区 | 一句话说明 | 状态 | 语言侧 |
| --- | --- | --- | --- |
| [模型生命周期桥接](./model-lifecycle/) | SFT / RLHF / PEFT 三页工程决策桥：何时 prompt 与 RAG 不够、需要动权重 | bridge | 中英 |
| [案例研究](./cases/) | 得物 Spec Coding、语义搜索、阿里故障复盘 Agent、AIOps 探索等真实业务案例 | case | 部分仅一侧，见表内标注 |
| [课程笔记](./course-notes/) | Hello Agents、Pi Agent 设计哲学、How I Use Claude Code 等外部课程与文章笔记 | legacy | 部分仅一侧，见表内标注 |
| [方法论存档](./methodology/) | Vibe Coding、BMAD 等历史方法论与工作流自动化存档 | legacy | 部分仅一侧，见表内标注 |
| [多模态（桥接）](./multimodal/) | 视觉等多模态能力的模型侧原理桥接 Learn LLM，应用侧最小用法 | bridge | 中英 |
| [AI 编码工具案例](./ai-coding/) | Cursor 架构与 Rules、Copilot 系统提示摘录等产品案例 | case | 正文在中文侧 |

## 阅读建议

- **想解决当前问题**：回到 [技术地图](../)，按症状驱动决策树找层，不要从附录开始。
- **想理解训练、对齐、多模态的模型侧原理**：直接去 [Learn LLM](https://llm.zenheart.site/)，本仓只保留工程决策视角的桥接页。
- **想看别人怎么做**：进 [案例研究](./cases/)，按你所在的层过滤。
- **想追溯本仓内容的来源**：课程笔记与方法论存档保留了原始出处的链接。
