---
title: MiniMax Agent 实战手册
description: "已经能登录网页后再看。每个配方只解决一个问题，步骤必须能在官方页找到依据。"
domain: product
tags:
  - coding-agent
role: cookbook
---

# MiniMax Agent 实战手册

面向已经打开 [agent.minimaxi.com](https://agent.minimaxi.com/) 的读者。每个配方先写目标，再写步骤，最后写坑。

基础安装与模式说明在 [教程](./minimax-agent.md)。本页不重复。

## 1. 写一份带出处的调研报告

**目标：** 得到一份能转给同事的 Markdown / PDF，而不是聊天记录。

**何时用：** Pro。资料要并行核验时再开 Agent Team。

**步骤：**

1. 切到 Pro。
2. 第一句写清范围、禁用源、交付格式。
3. 要求列出每条结论对应的官方 URL。
4. 如果任务同时要 HTML / PPT 第二份交付，在同一条消息里写完，避免中途改需求污染上下文。

```
基于 2026 年官方页面，整理 MiniMax Agent 能做什么、不能做什么。
允许来源：minimaxi.com、agent.minimaxi.com、agent.minimax.io。
禁止：转载站、评测博客、社交截图。
交付 Markdown 报告，每条论断后面跟原文链接。
```

**坑：** 单 Agent 会在完成一半时停下来汇报。官方 [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) 把这写成上下文焦虑。要完整交付就写「未完成验收条件不许结束」，或开 Team。

## 2. 做 PPT / 报告 / 网页，而不是只要正文

**目标：** 拿到可下载的幻灯片、文档或可打开的页面。

**依据：** [M2 新闻](https://www.minimaxi.com/news/minimax-m2) 把 PPT、报告撰写、网页制作列为 Pro 场景。[靠谱](https://www.minimaxi.com/news/minimax-agent) 展示过带音频的教程和前端动画页面。

**步骤：**

1. Pro。
2. 指定页数、受众、格式（HTML / PDF / PPTX / DOCX）。
3. 先要大纲，确认后再出成片。Agent Team 文把办公文档拆成 Planner → Writer → Formatter → Evaluator。
4. 需要固定版式时，先到 [技能市场](https://agent.minimaxi.com/skills) 看有没有演示文稿 / DOCX / PowerPoint 技能。

```
给前端工程师写一份 8 页产品介绍。
受众：已经会用 Cursor，第一次听说 MiniMax Agent。
先给大纲，我确认后再生成 HTML 幻灯片，并提供 PDF 导出。
不要写 MiniMax Code 的安装步骤。
```

**坑：** 不要在 Lightning 里做这件事。官方把这类任务放在 Pro。

## 3. 判断要不要开 Agent Team

**目标：** 少浪费一轮「单 Agent 写完但交不了货」。

| 信号 | 动作 |
|------|------|
| 只要一段回答 | 不开 Team，Lightning 即可 |
| 要多源研究 + 核验 + 合成 | 开 Team |
| IM 里发任务、人等不及最终结果 | 开 Team。官方写主 Agent 先秒回，后台跑 |
| 改错别字、换一句文案 | 不开。官方说这类更便宜走单 Agent |

**步骤：** 首页打开 **Agent 团队**，再发任务。不要同时塞三个互不相关的大目标。

**坑：** Team 有交接成本。官方技术文把交接、共享、聚合写成新成本。目标含糊会让 Worker 和 Verifier 空转。

## 4. 先装技能，再开始重复劳动

**目标：** 第二次做同类交付时不要从零描述流程。

**步骤：**

1. 打开 [skills](https://agent.minimaxi.com/skills)。
2. 用任务类型搜（演示文稿、研究报告、Excel、网页）。
3. 安装后再在对话里引用该技能。
4. 市场没有、但你已经跑通两次的流程，再考虑自定义或从 GitHub 导入。官方市场文案支持这两条。

**坑：**

- 技能名单和「uses」计数每天都可能变，不要把本页截图当目录。
- Code 插件市场（金融数据、企查查、Office、Notion 等）写在桌面端更新说明里，不是本配方的安装步骤。

## 5. 网页 Agent 做不了时，换门，不要硬凑

| 你真正要的 | 去哪 | 不要做什么 |
|------------|------|------------|
| 本机仓库、终端、diff、Git | [MiniMax Code](https://agent.minimaxi.com/docs/code/welcome) | 不要在网页 Agent 里假装有工作区面板 |
| 一条视频 | [Hailuo](https://hailuoai.com/) | 不要为了「也能生视频」强行走 Agent |
| 配音 / 音乐 | [Audio](https://www.minimaxi.com/audio) | 不要把 Audio 当 Agent 模式 |
| 角色扮演 | [星野](https://www.xingyeai.com/) / [Talkie](https://www.talkie-ai.com/) | 不要把陪伴产品写成工作台 |
| 分镜成片画布 | [Design](https://design.minimaxi.com/) | 不要把 Hub 旧名当成 Agent |

## 相关页面

- [学习地图](./index.md)
- [教程](./minimax-agent.md)
- [速查表](./minimax-agent-cheatsheet.md)
- [术语表](./minimax-agent-glossary.md)
