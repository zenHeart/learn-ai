---
title: Kimi 对话与 Agent 速查表
description: 只查不学。入口、斜杠、额度只抄能打开的官方页。两套套餐名不合并。
domain: product
tags:
  - chat
role: cheatsheet
---

# Kimi 对话与 Agent 速查表

只查不学。数字以链出的官方页为准。最后核实：2026-08-19。

本表**不含** Kimi Code CLI。编码命令见 [Kimi Code](/zh/products/kimi-code/)。

## 官方入口

| 面 | 入口 |
|----|------|
| 工作台 / 对话 | [kimi.com](https://www.kimi.com/) |
| 产品家族 | [kimi.com/zh-cn/products](https://www.kimi.com/zh-cn/products/) |
| Agent | [kimi.com/agent](https://www.kimi.com/agent) |
| Agent Swarm | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm) |
| Kimi Claw | [kimi.com/bot](https://www.kimi.com/bot) |
| Kimi Work（另产品） | [kimi.com/products/kimi-work](https://www.kimi.com/products/kimi-work) |
| Kimi Code（另产品） | [Kimi Code](/zh/products/kimi-code/) |
| API（另产品） | [platform.moonshot.cn](https://platform.moonshot.cn/) |
| 帮助中心 | [zh-hans/help](https://www.kimi.com/zh-hans/help)、[help](https://www.kimi.com/help) |
| 公司站 / App | [moonshot.cn](https://www.moonshot.cn/) |

首页侧栏原文：[kimi.com](https://www.kimi.com/) — Plugins、Scheduled Tasks、Slides、Swarm、Deep Research、Docs、Websites、Sheets、Design；Kimi Work、Kimi Code、Kimi Claw。新对话：**⌘K**。

App 切模型（[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview)）：**K3** 或 **K3 集群 / K3 Swarm**。

## 网页里能抄的命令 / 入口

这些出现在官方帮助，**不是** Kimi Code TUI。

| 输入或按钮 | 作用 | 来源 |
|------------|------|------|
| `/` | 调 Skills / 插件 | Skills、Plugins、Scheduled Tasks |
| `+` | 插件 / 上传 / 新项目 | Plugins、Projects |
| `/skill-creator` | 对话创建 Skill | [Skills](https://www.kimi.com/help/features/what-are-skills) |
| `/stop` | Claw 群聊强制打断 | [group-chat](https://www.kimi.com/help/kimi-claw/group-chat) |
| Create scheduled task | 侧栏建定时任务 | [Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks) |
| Create（Claw） | 一键云端 OpenClaw | [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) |
| Link existing OpenClaw | 接入自建实例 | 同上 |
| Start Group Chat | Claw 群聊 | group-chat |
| Settings → Personalization → Memory Space | 管理记忆 | [Memory](https://www.kimi.com/help/features/memory-space) |
| Settings → Chat channels | Claw 渠道 | Claw overview |

官方技能名例子：`docx`、`deep-research`、`sop-writer`、`event-etf-study`。

## 会员概览（乐理名 + 美元）

来源：[membership-overview](https://www.kimi.com/zh-hans/help/membership/membership-overview)。聊天 **K2.6 免费、不耗额度**。会员功能共用水池。

第一张表：

| 功能 | Moderato $19/月 | Allegretto $39/月 | Allegro $99/月 | Vivace $199/月 |
|------|-----------------|-------------------|----------------|----------------|
| Agent 额度* | 60 | 150 | 360 | 720 |
| Agent 并发任务数 | 2 | 2 | 4 | 4 |
| Agent 速度优先级 | 4× | 4× | 4× | 4× |
| 专业数据库 | 2,000 次 | 5,000 次 | 12,000 次 | 24,000 次 |
| Kimi Code | 可调用 | 可调用 | 可调用 | 可调用 |

\* 官方脚注：按典型任务 token 估算的近似值，仅供参考。

第二张表（同页，摘与对话 / Agent 相关的行）：

| 功能 | Moderato | Allegretto | Allegro | Vivace |
|------|----------|------------|---------|--------|
| K3 超长对话（最高 100 万 tokens） | — | — | ✅ | ✅ |
| 定时任务 | 10 | 15 | 20 | 25 |
| 小组件任务 | 10 | 15 | 20 | 25 |
| 项目数 | 20 | 20 | 100 | 100 |
| 项目存储 | 20GB | 20GB | 50GB | 50GB |
| 插件 | 15+ 种 | 15+ 种 | 15+ 种 | 15+ 种 |
| Agent Swarm | ✅ | ✅ | ✅ | ✅ |
| Swarm 并发子任务 | 2 | 4 | 8 | 8 |
| 目标模式 | — | ✅ | ✅ | ✅ |
| Kimi Claw（网页 / 安卓 / PC） | — | ✅ | ✅ | ✅ |
| Claw 群聊 | — | 10 | 10 | 10 |

年付：官方写每年最多可省 **$480**。Kimi Code 另有 **5 小时 / 每周** 速率限制。

## 功能页上的另一套档位名

[Projects](https://www.kimi.com/help/features/project) 与 [Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks) 使用 **Free / Go / Pro / Max / Ultra**。官方**没有**把它们逐档等于 Moderato…。不要自己对齐。

Projects：

| | Free | Go | Pro | Max | Ultra |
|--|------|----|-----|-----|-------|
| 项目数 | 2 | 20 | 20 | 100 | 100 |
| 项目存储 | 500MB | 20GB | 20GB | 50GB | 50GB |

Scheduled Tasks（**同时处于 active 的数量**，创建总数不限）：

| | Free | Go | Pro | Max | Ultra |
|--|------|----|-----|-----|-------|
| 定时任务 | 2 | 6 | 15 | 20 | 25 |

项目文件：每文件 ≤ **100 MB**，最多 **50** 个。

定时任务默认过期：Daily +7 天；Weekly +1 月；Monthly +3 月。

## 其它硬数字（均有出处）

| 数字 | 出处 |
|------|------|
| Agent 20+ 工具 | Agent 概览 |
| Swarm 最多 300 子 Agent、>4000 次工具调用、约 4.5× | Agent Swarm |
| Deep Research 万字 / 10,000+ word | Agent 概览 |
| Sheets 最多 1,000 行 Excel | Agent 概览 |
| ClawHub 5,000+ 技能 | Agent 概览 / Claw 介绍 |
| K3：2.8T 参数、1M token、原生视觉 | Agent 概览（2026-07-16） |
| 一键 Claw：Allegretto+；默认 K2.6 | Claw overview |
| 插件：K3 / K3 Swarm / Deep Research / Websites / PPT；Claw 与 Plus 不行 | Plugins |

## 高质量信息源

最后核实：2026-08-19。只收亲自打开过的官方页。

### 一手官方

| 来源 | 用途 |
|------|------|
| [kimi.com](https://www.kimi.com/) | 工作台本体 |
| [zh-cn/products](https://www.kimi.com/zh-cn/products/) | 一级产品 |
| [zh-hans/help](https://www.kimi.com/zh-hans/help) | 中文帮助总目 |
| [help](https://www.kimi.com/help) | 英文帮助总目 |
| [Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview) | Agent 步骤 |
| [Agent Swarm](https://www.kimi.com/zh-hans/help/agent/agent-swarm) | Swarm |
| [会员概览](https://www.kimi.com/zh-hans/help/membership/membership-overview) | 套餐与水池 |
| [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) | 部署 |
| [Claw 群聊](https://www.kimi.com/help/kimi-claw/group-chat) | Conductor / `/stop` |
| [Projects](https://www.kimi.com/help/features/project) | 项目 |
| [Skills](https://www.kimi.com/help/features/what-are-skills) | 技能 |
| [Plugins](https://www.kimi.com/help/features/plugins) | 插件 |
| [Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks) | 定时任务 |
| [Memory](https://www.kimi.com/help/features/memory-space) | 记忆 |
| [Kimi Work overview](https://www.kimi.com/help/kimi-work/overview) | 桌面端（本目录不展开） |
| [moonshot.cn](https://www.moonshot.cn/) | 公司 / App |
| [platform.moonshot.cn](https://platform.moonshot.cn/) | API |

### 访问提示

`www.kimi.com` 对部分自动化抓取会落到 198.18.x，命令行 GET 可能失败。帮助中心乱猜 slug 会进空搜索页。先打开分类页再抄链接。

## 相关页面

- [学习地图](./index.md)
- [教程](./kimi.md)
- [Cookbook](./kimi-cookbook.md)
- [术语表](./kimi-glossary.md)
