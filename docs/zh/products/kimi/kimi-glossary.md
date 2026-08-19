---
title: Kimi 对话与 Agent 术语表
description: 不教操作。把都叫 Kimi / Agent / Goal / Project 的东西拆开。
domain: product
tags:
  - chat
role: glossary
---

# Kimi 对话与 Agent 术语表

不教操作。只回答「这个词在官方页上是什么、不是什么」。选产品面回 [学习地图](./index.md)。模型内部见 [Learn LLM](/zh/tech/fundamentals/LLM)。

## 都叫 Kimi 的东西

| 名字 | 是什么 | 在哪 |
|------|--------|------|
| **Kimi** | 一站式 AI 工作台 / All-in-one agentic AI workspace | [kimi.com](https://www.kimi.com/) |
| **Kimi Agent** | 端到端自主助手，K3 + 20+ 工具 | [kimi.com/agent](https://www.kimi.com/agent) |
| **Agent Swarm** | 最多 300 个子 Agent 并行 | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm) |
| **Kimi Claw** | 一键云端 OpenClaw，可接即时通讯渠道 | [kimi.com/bot](https://www.kimi.com/bot) |
| **Kimi Code** | 终端与 IDE 编程助手 | [Kimi Code](/zh/products/kimi-code/) |
| **Kimi Work** | Mac/Windows 桌面知识工作 Agent（Work / Chat 双模式） | [products/kimi-work](https://www.kimi.com/products/kimi-work) |
| **Kimi WebBridge** | 给 Agent 用的浏览器插件 | 产品页 |
| **Kimi Platform** | 官方模型 API | [platform.moonshot.cn](https://platform.moonshot.cn/) |
| **Kimi Business** | 企业方案 | 帮助中心 |
| **Kimi Plus** | 插件页点名「Kimi Plus 对话」暂不支持插件 | [Plugins](https://www.kimi.com/help/features/plugins) |
| **K2.6 / K3 / K3 Swarm** | 工作台里的模型 / 模式开关 | 输入框上方模型切换 |
| **Moonshot AI / 月之暗面** | 公司 | [moonshot.cn](https://www.moonshot.cn/) |

## Agent 家族：三个调度面

| | 单 Agent | Agent Swarm | Claw 群聊 |
|--|----------|-------------|-----------|
| **是什么** | 一只助手拆任务、调工具 | 一只 orchestrator 拉最多 300 个子 Agent | 多只 Claw + Kimi Conductor |
| **入口** | `kimi.com/agent` 或 App 的 K3 | `kimi.com/agent-swarm` 或 K3 Swarm | `kimi.com/bot` 里 Start Group Chat |
| **官方强调** | 20+ 工具、Office / 网站交付 | 横向扩展、不必手写工作流 | 跨人、跨设备、跨权限边界 |
| **不是** | 不是 Kimi Code | 不是「把 Claw 开 300 个」 | 不是 Swarm 的另一个名字 |

**OpenClaw ≠ Kimi Claw。** OpenClaw 是可自建的助手；Kimi Claw 是 Kimi 帮你部署或链上它的产品面。群聊里还可以带自己的 OpenClaw 当 Worker。

**OK Computer** 是 2025-09-26 上线的早期 Agent 模式名称（Agent 时间线）。现在帮助中心主推 Kimi Agent / K3。

## Goal 容易踩的坑

| 说法 | 官方出现位置 | 不是 |
|------|--------------|------|
| Goal / 目标模式 | 会员表（Allegretto+）；项目对话可 use Goal | 不是全站免费开关 |
| Kimi Work Goal Mode | Work 帮助 | 不是网页聊天的同一份文档 |
| Kimi Code `/goal` | Code CLI | **不是** kimi.com 输入框命令 |

没有独立的「Goal 产品」一级入口。家族图里只占一行。

## 两份 Projects

官方原文（[Projects](https://www.kimi.com/help/features/project)）：Kimi Work desktop app 也有 Projects，**与 Kimi (Chat) projects 不相连、不共享数据**。

| | kimi.com Projects | Kimi Work Projects |
|--|-------------------|--------------------|
| **干什么** | 网页工作台的持久工作区 | 桌面端任务空间 |
| **本目录** | Tutorial / Cookbook | 地图一行，不写步骤 |

## 额度、记忆、Skills、插件

**额度池：** 会员功能共用水池，按 token 计。聊天 K2.6 单独免费。Kimi Code 另有 5 小时 / 每周速率限制。不要把「Agent 额度 60」理解成「只能聊 60 句」——官方脚注写那是按典型任务折算的近似值。

**两套套餐名：** 会员页 Moderato / Allegretto / Allegro / Vivace（美元）。Projects / Scheduled Tasks 页 Free / Go / Pro / Max / Ultra。以各自页面为准，禁止合并成一张「应该是」。

**记忆：** 跨会话偏好。官方：不用于训练；不主动记未授权隐私。项目上下文会注入「全局主记忆」，但项目指令只在该项目生效。

**Skills：** 按需加载的知识包。官方 / 推荐 / 开源 / 自定义。键入 `/`。

**插件：** 接第三方。K3 / K3 Swarm 和部分场景可用；Claw、Plus 对话不行。和 Kimi Code 的插件系统不是同一套配置。

**定时任务：** kimi.com 云端跑；Kimi Work 还可本地跑（应用得开着）。

## 禁止写进正文的说法

- 「Kimi 就是 Kimi Code」
- 「网页输入 `/goal` 等于 CLI Goal」
- 「Moderato 就是 Go」
- 「Claw 群聊 = Agent Swarm」
- 把 Code 安装脚本当本目录 Quickstart
- 人民币价（本调研未打开独立中文标价页当唯一真源）

## 相关页面

- [学习地图](./index.md)
- [教程](./kimi.md)
- [Cookbook](./kimi-cookbook.md)
- [速查表](./kimi-cheatsheet.md)
