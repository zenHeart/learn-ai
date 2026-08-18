---
title: MiniMax Agent 学习地图
description: "MiniMax Agent 是通用 Agent 工作台，不是 MiniMax Code。本目录只写网页工作台；Code / Hailuo / 星野只在家族图占一行。"
domain: product
tags:
  - coding-agent
role: map
---

# MiniMax Agent 学习地图

> **MiniMax Agent** 是 MiniMax 的通用智能体工作台。官方定义（[靠谱](https://www.minimaxi.com/news/minimax-agent)）：
> 「一个能完成长程（Long Horizon）复杂任务的通用智能体，也就是能多步规划出专家级解决方案、能灵活拆解任务需求、并能执行多个子任务从而交付最终结果。」
>
> 国内入口：[agent.minimaxi.com](https://agent.minimaxi.com/)。海外入口：[agent.minimax.io](https://agent.minimax.io/)。
>
> **本目录不写 MiniMax Code 主教程。** 桌面端编程 Agent 见官方 [Code 欢迎页](https://agent.minimaxi.com/docs/code/welcome)，本站另 issue #72。

## 产品全景

MiniMax 官网、Agent 站和文档站用了好几套名字。它们**不是**同一个产品的四张皮。本目录的**主学习路径**是 **MiniMax Agent**（网页通用工作台）。

```
MiniMax 家族
├── MiniMax Agent — 通用 Agent 工作台（本目录）
│   ├── 网页：agent.minimaxi.com / agent.minimax.io
│   ├── Lightning / Pro 两种模式
│   ├── 技能市场 /skills
│   └── 站内入口：MaxHermes、MaxClaw
├── MiniMax Code — 桌面端 Coding Agent（#72，不在本目录展开）
├── MiniMax Design / Hub — 多模态创作画布
├── Hailuo / 海螺视频 — 视频生成
├── MiniMax Audio — 语音与音乐
├── 星野 / Talkie — 沉浸式角色社区
└── 开放平台 / Token Plan — API 与计费
```

| 官方一级入口 | 是什么 | 官方 URL | 本站去向 |
|--------------|--------|----------|----------|
| **MiniMax Agent** | 通用长程智能体工作台 | [agent.minimaxi.com](https://agent.minimaxi.com/) | 独立页：本目录 |
| MiniMax Code | 桌面端 AI Agent，面向本地项目 / 终端 / 浏览器 | [Code 欢迎页](https://agent.minimaxi.com/docs/code/welcome) | 地图一行。主教程另 #72 |
| MiniMax Design / Hub | 多模态创作平台。英文 About 仍写 Hub；`hub.minimaxi.com` 当前加载 Design | [design.minimaxi.com](https://design.minimaxi.com/)、[hub.minimaxi.com](https://hub.minimaxi.com/) | 地图一行 |
| Hailuo / 海螺视频 | 文/图生视频 | [hailuoai.com](https://hailuoai.com/) | 地图一行 |
| MiniMax Audio | 语音合成与音乐 | [minimaxi.com/audio](https://www.minimaxi.com/audio) | 地图一行 |
| 星野 | 沉浸式 AI 内容社区 | [xingyeai.com](https://www.xingyeai.com/) | 地图一行 |
| Talkie | 星野海外对应 | [talkie-ai.com](https://www.talkie-ai.com/) | 地图一行 |
| 开放平台 / API | 模型 HTTP API | [platform.minimaxi.com](https://platform.minimaxi.com/) | 地图一行 |
| Token Plan | 订阅与额度 | 厂商站 Product nav「Token Plan」 | 地图一行 |
| About / News / IR | 公司栏目 | [minimaxi.com](https://www.minimaxi.com/) | 非本站 |

来源：[www.minimaxi.com](https://www.minimaxi.com/) 关于我们、[www.minimaxi.com/en](https://www.minimaxi.com/en) Product / About、[agent.minimaxi.com](https://agent.minimaxi.com/)、[docs/llms.txt](https://agent.minimaxi.com/docs/llms.txt)。2026-08-19 打开。

**容易撞名的几条：**

- **MiniMax Agent ≠ MiniMax Code。** Agent 是通用工作台。Code 是桌面端应用。changelog [v3.0.33](https://agent.minimaxi.com/docs/changelog) 原文：「桌面端正式更名为 MiniMax Code」。
- **MiniMax Hub ≠ MiniMax Agent。** 英文 About 把 Hub 和 Code / Audio / Talkie 并列。当前 `hub.minimaxi.com` 打开后写的是 MiniMax Design。
- **Mini-Agent ≠ MiniMax Agent。** `MiniMax-AI/Mini-Agent` 是开放平台上的示例项目，不是这款产品。
- **MaxHermes / MaxClaw** 出现在 Agent 首页，不是厂商一级产品。见 [术语表](./minimax-agent-glossary.md)。

模型内部（MSA、注意力、训练）见 [Learn LLM](https://llm.zenheart.site/chapters/)。本目录不写机制。

### 快速决策：我该用哪个？

```
我要做什么？
├── 在网页里把一个长任务做完（研究、PPT、报告、网页、多模态交付）
│   └── → MiniMax Agent（本目录）
│       ├── 问答 / 轻搜索 / 轻代码 → Lightning
│       └── 长程研究 / 全栈 / PPT / 报告 / 网页 → Pro；复杂拆解开 Agent Team
├── 对着本机仓库写代码、看 diff、跑终端
│   └── → MiniMax Code（官方桌面端文档；本站 #72）
├── 只做视频
│   └── → Hailuo / 海螺视频
├── 只做语音 / 音乐
│   └── → MiniMax Audio
├── 角色扮演 / 沉浸社区
│   └── → 星野（国内）/ Talkie（海外）
├── 短剧 / 分镜 / 成片画布
│   └── → MiniMax Design（域名仍可能显示 Hub）
└── 在自己的程序里调模型
    └── → 开放平台 API
```

## 什么时候值得试 MiniMax Agent

**什么情况下值得试？**

- 你要的是**网页里可交付的长程任务**：深度研究、PPT、报告、网页，而不是终端里改仓库。
- 你已经在用 Claude.ai / Cowork 一类工作台，想对照国内入口。
- 任务需要多模态输出（图 / 音 / 视频）或 MCP 扩展。官方 [靠谱](https://www.minimaxi.com/news/minimax-agent) 把编程、多模态、MCP 列为设计标准。

**什么情况下先别急？**

- 你要的是本机项目、终端、Git 工作区 —— 那是 **MiniMax Code**，不要在这套网页教程里找 CLI。
- 你只要出一条视频 —— 走 Hailuo，不要绕 Agent。
- 你要角色陪伴 —— 走 星野 / Talkie。
- 你需要把命令、权限模式、flag 写成可复制手册 —— 官方没有给 Agent 网页单独的 Commands 页。本站只写能打开的官方原文。

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 打开能用 | [MiniMax Agent 教程](./minimax-agent.md) | 登录网页，发出第一个任务 |
| 2. 选对模式 | 教程里的 Lightning / Pro，[Cookbook](./minimax-agent-cookbook.md) | 短问答不走 Pro，长程不走 Lightning |
| 3. 用技能和 Team | Cookbook + 官方 [技能市场](https://agent.minimaxi.com/skills) | 知道何时装 Skill、何时开 Team |
| 4. 回查入口 | [速查表](./minimax-agent-cheatsheet.md) | 域名、模式、数据源 |
| 5. 理清名字 | [术语表](./minimax-agent-glossary.md) | Agent / Code / Hub / Design / Mini-Agent |

## 功能速查表

下表只列能在官方页找到原文的能力。

| 能力 | 一句话 | 官方原文 |
|------|--------|----------|
| 长程任务 | 多步规划、拆解、交付最终结果 | [靠谱](https://www.minimaxi.com/news/minimax-agent) |
| Lightning | 对话问答 / 轻量级搜索 / 轻量级代码，极速输出 | [M2 新闻](https://www.minimaxi.com/news/minimax-m2) |
| Pro | 深度研究 / 全栈开发 / PPT / 报告 / 网页制作 | [M2 新闻](https://www.minimaxi.com/news/minimax-m2) |
| Agent Team | 主 Agent 拆任务；Leader / Worker / Verifier | [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) |
| 技能市场 | 浏览、安装、自定义或从 GitHub 导入技能 | [skills](https://agent.minimaxi.com/skills) |
| 编程 | 复杂跳转、模拟用户操作做测试、重视界面 | [靠谱](https://www.minimaxi.com/news/minimax-agent) |
| 多模态 | 理解长文本 / 视频 / 音频 / 图片；内置生图、音频、视频 | [靠谱](https://www.minimaxi.com/news/minimax-agent) |
| MCP | 内置 MiniMax MCP；官方还写了 GitHub / GitLab / Slack / Figma 等集成 | [靠谱](https://www.minimaxi.com/news/minimax-agent) |
| 写作 / 语音 / 图像 / 文档 / 翻译 | 功能页列出的消费向能力 | [features](https://agent.minimax.io/features/zh.html) |

驱动模型会随产品改版。2026-08-19 首页可见「尝试全新 M3」。模型原理见 [Learn LLM](https://llm.zenheart.site/chapters/)。

## 资源链接

- 产品：<https://agent.minimaxi.com/>
- 海外：<https://agent.minimax.io/>
- 厂商：<https://www.minimaxi.com/>
- 文档索引：<https://agent.minimaxi.com/docs/llms.txt>
- 完整信息源见 [速查表](./minimax-agent-cheatsheet.md#高质量信息源)

## 相关页面

- [MiniMax Agent 教程](./minimax-agent.md)
- [实战 Cookbook](./minimax-agent-cookbook.md)
- [速查表](./minimax-agent-cheatsheet.md)
- [术语表](./minimax-agent-glossary.md)
- [AI 编程工具总览](../index.md)
