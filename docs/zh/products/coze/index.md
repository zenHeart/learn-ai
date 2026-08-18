---
title: 扣子 / Coze 学习地图
description: "扣子、扣子编程、扣子罗盘不是同一张皮。本目录主线是在扣子编程里搭建并发布 Agent。豆包和 Trae 不在这里展开。"
domain: product
tags:
  - agent-builder
role: map
---

# 扣子 / Coze 学习地图

> **扣子编程**才是本目录的搭建主线。官方定义（[什么是扣子编程](https://docs.coze.cn/guides_welcome)）：
>
> 「扣子编程是一个 AI 驱动的应用开发平台……只需清晰描述你的需求，扣子编程就能帮助你打造可用于生产环境的智能体、工作流、技能、移动应用、网页应用或小程序。」
>
> **扣子**本身是另一扇门：官方定义（[什么是扣子](https://docs.coze.cn/what_is_coze)）是「面向 Agent 时代的新一代 AI 团队协作平台」。它用来调度 Agent，不是低代码画布。

## 产品全景

字节跳动有多款 AI 产品。带「扣子 / Coze」的也不是同一个东西。本目录**只写 Agent 搭建**。

```
字节跳动 AI（本目录只展开扣子家族）
├── 扣子（coze.cn）— 人和 Agent 一起干活的工作台
│   ├── 扣子 Agent / 云端 Agent / 本地 Agent
│   ├── 项目协作、技能商店、云电脑 / 云手机
│   └── 对话里的 AI 编程（网页 / App / 小程序，能力是扣子编程的子集）
├── 扣子编程（code.coze.cn）— 搭智能体 / 工作流 / 应用  ← 本目录主线
│   ├── 低代码：可视化编排智能体、工作流、插件、知识库
│   ├── AI 编程：一句话生成全代码智能体 / 工作流 / 网页 / App / 小程序 / 技能
│   └── Coze CLI（npm @coze/cli）
├── 扣子罗盘 — Prompt / 评测 / Trace
├── 开源核
│   ├── Coze Studio（私有化搭 Agent）
│   └── Coze Loop（罗盘开源核）
└── 同厂但不在本目录写正文
    ├── 豆包 — 聊天助手（#79）
    ├── Trae — 编程 IDE（#80）
    └── 火山方舟 — 模型 API（#82）
```

| 产品 | 是什么 | 入口 | 本站去向 |
|------|--------|------|----------|
| **扣子编程** | 在浏览器里搭建、调试、发布智能体和应用 | [code.coze.cn](https://code.coze.cn/) | [教程](./coze.md) |
| 扣子 | 消费端 AI 团队工作台（网页 / 桌面 / App） | [coze.cn](https://www.coze.cn/) | 地图一行；操作见[官方开始使用](https://docs.coze.cn/what_is_coze) |
| 扣子罗盘 | Prompt 开发、评测、全链路观测 | [什么是扣子罗盘](https://docs.coze.cn/cozeloop_what-is-cozeloop) | 地图一行 |
| Coze Studio | 扣子编程的开源单机引擎 | [github.com/coze-dev/coze-studio](https://github.com/coze-dev/coze-studio) | 地图一行；商业版不支持私有化 |
| Coze Loop | 罗盘的开源核 | [github.com/coze-dev/coze-loop](https://github.com/coze-dev/coze-loop) | 地图一行 |
| Coze.com | 国际站 | [coze.com](https://www.coze.com/)、[docs.coze.com](https://docs.coze.com/) | 地图一行；账号和渠道与国内不同 |
| Coze Pro / 企业版 | 火山引擎上的企业套餐入口 | [volcengine.com/product/coze-pro](https://www.volcengine.com/product/coze-pro) | 地图一行；权益见[套餐](https://docs.coze.cn/guides_edition) |
| 豆包 | 同厂通用聊天 | [doubao.com](https://www.doubao.com/) | **不写教程** → issue #79 |
| Trae | 同厂编程 IDE | [trae.cn](https://www.trae.cn/)、[trae.ai](https://www.trae.ai/) | **不写教程** → issue #80 |
| 火山方舟 | 同厂模型 API | [volcengine.com/product/ark](https://www.volcengine.com/product/ark) | **不写教程** → issue #82 |
| 飞书 / 微信 / 抖音 | 发布渠道，不是扣子产品 | [发布概览](https://docs.coze.cn/guides_publish_overview) | 非本站产品 |

**容易撞名的几条：**

- **扣子 ≠ 扣子编程**。前者是工作台，后者是开发平台。对话里快速做网页可以留在扣子；要搭智能体、工作流、完整配置，去扣子编程。
- **扣子 ≠ 豆包**。豆包是聊天助手。低代码智能体曾能发到豆包渠道，该入口已于 **2026-07-01** 下线（[FAQ](https://docs.coze.cn/guides_FAQ)）。
- **扣子编程 ≠ Trae**。Trae 是 IDE。扣子编程是云端搭 Agent / 应用的平台。
- **低代码智能体 ≠ 全代码智能体**。低代码走可视化编排；全代码走 AI 编程对话。
- **云端「Claude Code / Codex CLI」≠ 官方 Claude Code / Codex**。那是框架跑在扣子云电脑，模型由扣子提供，不能登录 Anthropic / OpenAI 账号（[消费端 FAQ](https://docs.coze.cn/cozespace_coze_app_faq)）。
- **Coze Studio ≠ 扣子编程**。Studio 是开源单机核；扣子编程是云端商业版，官方写明暂不支持私有化。
- 旧文案里的 **Bot** 就是现在的低代码智能体。

### 快速决策：我该进哪扇门？

```
我要做什么？
├── 零代码搭一个对话智能体，再发到飞书 / 微信 / API
│   └── → 扣子编程 · 低代码智能体（先读教程）
├── 流程固定：报告、批处理、多步工具调用
│   └── → 扣子编程 · 低代码工作流（Cookbook）
├── 一句话生成全代码智能体 / 网页 / App / 小程序
│   └── → 扣子编程 · AI 编程（Cookbook）
├── 在终端或 Claude Code / Trae 里让 Agent 操作扣子
│   └── → Coze CLI（Cookbook / Cheatsheet）
├── 和多个 Agent 一起办公、做 PPT / 视频、授权本机文件
│   └── → 扣子（coze.cn），本目录不展开逐步教程
├── 评 Prompt、跑实验、看 Trace
│   └── → 扣子罗盘
├── 数据必须留在自己的机器
│   └── → Coze Studio 开源版（扣子编程本身不能私有化）
├── 只是聊天 / 写文案
│   └── → 豆包（#79），不是扣子
└── 要在仓库里写代码的 IDE
    └── → Trae（#80），或本站 Claude Code / Cursor / Grok Build
```

来源：[what_is_coze](https://docs.coze.cn/what_is_coze)、[guides_welcome](https://docs.coze.cn/guides_welcome)、[about-low-code-project](https://docs.coze.cn/about-low-code-project)、[guides_FAQ](https://docs.coze.cn/guides_FAQ)、[cozespace_coze_app_faq](https://docs.coze.cn/cozespace_coze_app_faq)。

## 目标与非目标

**目标**

- 分清扣子家族的门。
- 跟着官方步骤搭出一个低代码智能体并知道怎么发布。
- 需要工作流、知识库、插件、技能、CLI 时能跳到对应配方。

**非目标**

- 不写豆包、Trae、火山方舟的完整教程。
- 不写 PPT / 短视频 / 云手机的办公手册。
- 不解释模型内部机制（去 [Learn LLM](/zh/tech/fundamentals/LLM)）。
- 不把开源 Studio 写成私有化实施全书。

## 该读哪一篇

| 文档 | 类型 | 什么时候看 |
|------|------|-----------|
| [上手教程](./coze.md) | Tutorial | 第一次：注册 → 低代码智能体 → 调试 → 发布 |
| [实战 Cookbook](./coze-cookbook.md) | How-to | 已经会点界面，要解决一个具体问题 |
| [速查表](./coze-cheatsheet.md) | Reference | 查套餐、渠道、CLI、限制、信息源 |
| [术语表](./coze-glossary.md) | Explanation | 词撞车了，或旧教程里的 Bot / 豆包渠道对不上 |

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 分清门 | 本页决策树 | 不要进豆包或 Trae |
| 2. 搭出一个智能体 | [教程](./coze.md) | 走完官方「夸夸机器人」路径 |
| 3. 补能力 | [Cookbook](./coze-cookbook.md) | 插件 / 知识库 / 工作流 / 发布 / CLI |
| 4. 回查 | [速查表](./coze-cheatsheet.md) | 套餐、渠道、命令 |
| 5. 对齐口径 | [术语表](./coze-glossary.md) | 技能 vs 插件 vs 工作流 |

## 功能速查（扣子编程 · 搭建面）

只列官方有专题页的能力。

| 能力 | 一句话 | 官方文档 |
|------|--------|----------|
| 低代码智能体 | 人设 + 模型 + 技能面板，可视化编排 | [功能概述](https://docs.coze.cn/guides_agent_overview)、[快速开始](https://docs.coze.cn/guides_quickstart) |
| 全代码智能体 | 对话生成可部署的智能体项目 | [开发智能体](https://docs.coze.cn/guides_vibe_coding_agent) |
| 工作流 / 对话流 | 拖拽节点；对话流面向 Chatbot | [低代码工作流](https://docs.coze.cn/guides_workflow) |
| 插件 | 一个插件里多个 API 工具 | [插件介绍](https://docs.coze.cn/guides_plugin) |
| 知识库 | 文档 / 表格 / 图片；另有火山知识库 | [知识库概述](https://docs.coze.cn/guides_knowledge) |
| 记忆 | 变量、数据库、长期记忆 | [功能概述 · 记忆](https://docs.coze.cn/guides_agent_overview) |
| 技能 Skill | `SKILL.md` 文件夹，按需加载 SOP | [技能概述](https://docs.coze.cn/guides_skill_overview) |
| 发布 | 商店、飞书、微信、小程序、API、Chat SDK | [发布概览](https://docs.coze.cn/guides_publish_overview) |
| Coze CLI | `npm i -g @coze/cli`，命令名 `coze` | [Coze CLI](https://docs.coze.cn/developer_guides_coze_cli) |

## 时效性提醒

- **扣子 3.0**：官方写明 **2026-05-29** 发布多人多 Agent 协作（[消费端 FAQ](https://docs.coze.cn/cozespace_coze_app_faq)）。
- **豆包发布渠道**：低代码智能体入口 **2026-07-01** 下线。
- **抖音分身**：2025-09-03 下架。
- **工作流 / 图像流商店**：已下架，不能再往作品社区上架这两类资源。
- 旧博客里的「Bot + 一键发豆包 / Discord」不要当现行步骤。

## 相关页面

- [上手教程](./coze.md)
- [实战 Cookbook](./coze-cookbook.md)
- [速查表](./coze-cheatsheet.md)
- [术语表](./coze-glossary.md)
- [产品目录](../index.md)
