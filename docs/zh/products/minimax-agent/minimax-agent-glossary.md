---
title: MiniMax Agent 术语表
description: "不教操作。先分清 Agent / Code / Hub / Design / Mini-Agent，再理解 Lightning、Pro 和 Agent Team。"
domain: product
tags:
  - coding-agent
role: glossary
---

# MiniMax Agent 术语表

不教操作，只解释「为什么这些名字会撞」。选哪个产品面看 [学习地图](./index.md)。

## 概念关系

```
厂商 MiniMax
├── 通用工作台 MiniMax Agent（网页）
│   ├── 模式：Lightning / Pro
│   ├── 协作：Agent Team（Leader / Worker / Verifier）
│   ├── 扩展：Skill
│   └── 站内入口：MaxHermes / MaxClaw
├── 桌面编程 MiniMax Code        ← 不是本目录
├── 创作 MiniMax Design（英文 About 仍写 Hub）
├── 视频 Hailuo / 语音 Audio / 角色 星野·Talkie
└── 开放平台 API + Token Plan
```

## 都叫 MiniMax / Agent 的东西

| 名字 | 是什么 | 在哪用 |
|------|--------|--------|
| **MiniMax Agent** | 通用长程智能体工作台 | agent.minimaxi.com / agent.minimax.io |
| MiniMax Code | 桌面端 AI Agent 应用 | [welcome](https://agent.minimaxi.com/docs/code/welcome) |
| MiniMax Hub | 英文 About 里的一级产品名 | 当前 `hub.minimaxi.com` 加载 Design |
| MiniMax Design | 多模态创作平台 / 画布 | design.minimaxi.com |
| Hailuo / 海螺视频 | 视频生成产品 | hailuoai.com |
| MiniMax Audio | 语音与音乐 | minimaxi.com/audio |
| 星野 | 沉浸式智能体社区 | xingyeai.com |
| Talkie | 星野海外对应 | talkie-ai.com |
| Mini-Agent | 开放平台示例项目 | GitHub MiniMax-AI/Mini-Agent |
| MaxHermes | Agent 站内「云端助手」入口 | changelog 2026-04-16 |
| MaxClaw | Agent 站内设置 / 渠道 / 人设入口 | changelog 2026-04-11 |
| Token Plan | 订阅与额度 | 厂商站 Product nav |
| MiniMax M2 / M3 | 驱动模型，不是产品面 | 新闻与首页；机制见 [Learn LLM](https://llm.zenheart.site/chapters/) |

**不是官方产品名，正文不要当事实写：**

- 「MiniMax Agent 就是 Code 的网页版」——官方把桌面端单独更名为 Code。
- 「Hub 等于 Agent」——Hub 与 Design 对齐，不与 Agent 对齐。
- 把 Mini-Agent 示例仓写成产品下载地址。

## MiniMax Agent 是什么 / 为什么需要

**是什么：** 网页上的通用智能体，接收目标，拆步骤，交付文件或页面。官方对照的是「靠谱的人」，不是补全框。

**为什么需要：** 对话助手停在问答。Agent 要在长程任务里规划、调用工具、做测试、给出可打开的结果。[靠谱](https://www.minimaxi.com/news/minimax-agent) 把「Code is cheap，show me the requirement」写成生产关系变化。

**不是什么：** 不是本机 IDE，不是 Hailuo 的套皮，不是星野。

## Lightning 和 Pro

**是什么：** 同一产品上的两种模式，不是两个产品。

**为什么需要：** [M2 新闻](https://www.minimaxi.com/news/minimax-m2) 把「又贵又慢」写成当时 Agent 产品的普遍问题。Lightning 保短任务速度，Pro 保长程质量。

**区别：**

| | Lightning | Pro |
|--|-----------|-----|
| 官方场景 | 问答、轻搜索、轻代码 | 研究、全栈、PPT、报告、网页 |
| 代价 | 长程交付容易不够 | 短任务可能过重 |

## Agent Team

**是什么：** 主 Agent 牵头的多 Agent 系统。官方角色是 Leader、Worker、Verifier。用户仍只发一条消息。

**为什么需要：** 单 Agent 既当选手又当裁判；长任务会提前停、会越做越偏、在 IM 里无法秒回。Team 把拆分、并行、验收变成系统行为。

**不是什么：** 不是「多开几个聊天窗口」。也不是 Code 文档里的每一个子 Agent 开关都自动等于网页 Team。

官方还写了 Team Engine 状态：`producing` / `verifying` / `done`。这是设计描述，不是你要输入的命令。

## Skill

**是什么：** 可安装、可复用的领域流程。市场在 [skills](https://agent.minimaxi.com/skills)。

**为什么需要：** 角色扮演不等于角色分工。官方 Team 文把工具、上下文、记忆、Skill 列为分工的四个维度。没有 Skill，每次都要从头教流程。

**与插件的区别：** 技能市场是 Agent 网页可打开的页面。插件市场首发说明写在 MiniMax Code 更新里。两套扩展不要抄成一张表。

## Hub 和 Design

**是什么：** 创作向产品。画布、分镜、成片、本地素材。

**为什么单独写：** 英文 About 仍把 **MiniMax Hub** 列为一级产品；中文 About 写 **MiniMax Design**；`hub.minimaxi.com` 打开后是 Design。两份官方页打架时，本站同时引用，落地页以 Design 为准。

**不是什么：** 不是 MiniMax Agent 的别名。

## 相关页面

- [学习地图](./index.md)
- [教程](./minimax-agent.md)
- [Cookbook](./minimax-agent-cookbook.md)
- [速查表](./minimax-agent-cheatsheet.md)
