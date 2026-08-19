---
title: Kimi 学习地图
description: 月之暗面有多张都叫 Kimi 的产品面。本目录只写 kimi.com 对话与 Agent。Kimi Code 只在家族表占一行。
domain: product
tags:
  - chat
role: map
---

# Kimi 学习地图

> **Kimi** 是月之暗面（Moonshot AI）的一站式 AI 工作台。官方产品页原文（[kimi.com/zh-cn/products](https://www.kimi.com/zh-cn/products/)）：
> 「一站式 AI 工作台。从深度研究、幻灯片到表格、文档与网站，Kimi 内置强大的 Agent 能力，轻松应对复杂任务。」
>
> 英文产品 nav：「**Kimi** — All-in-one agentic AI workspace。」
>
> 本目录对位 Claude.ai / Grok 聊天。它**不是** Kimi Code。仓库里的终端 / IDE 编程助手见 [Kimi Code](/zh/products/kimi-code/)。

## 产品家族

下表对账官方一级入口。缺项是 P0。官方密度不够独立教程的，只占一行。

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **Kimi**（一站式工作台 / 对话） | [kimi.com](https://www.kimi.com/)、[zh-cn/products](https://www.kimi.com/zh-cn/products/) | 独立页 [kimi.md](./kimi.md) |
| **Kimi Agent** | [kimi.com/agent](https://www.kimi.com/agent)、[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview) | 同上 Tutorial |
| **Agent Swarm** | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm)、[Agent Swarm](https://www.kimi.com/zh-hans/help/agent/agent-swarm) | Tutorial + [Cookbook](./kimi-cookbook.md) |
| **Kimi Claw** | [kimi.com/bot](https://www.kimi.com/bot)、[Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) | Tutorial + Cookbook（对话侧云端 OpenClaw） |
| **Goal** | 会员表「目标模式」；项目对话可 use Goal（[Projects](https://www.kimi.com/help/features/project)） | 地图一行 + Tutorial 一节。**不是** Kimi Code `/goal` |
| Slides / Docs / Sheets / Deep Research / Websites / Design | 首页侧栏（[kimi.com](https://www.kimi.com/)） | 地图一行：工作台能力，不拆页 |
| Plugins / Scheduled Tasks / Skills / Projects / Memory | [帮助中心 Features](https://www.kimi.com/help/features) | Tutorial / Cookbook / [速查](./kimi-cheatsheet.md) |
| **Kimi Code** | 产品页「Kimi Code」 | **一行**：[Kimi Code](/zh/products/kimi-code/)（#71，本目录不写安装） |
| **Kimi Work** | [kimi.com/products/kimi-work](https://www.kimi.com/products/kimi-work) | 地图一行：Mac/Windows 桌面知识工作 Agent |
| **Kimi WebBridge** | 产品页「Kimi WebBridge」 | 地图一行：给 Agent 用的浏览器插件 |
| **Kimi Platform / API** | [platform.moonshot.cn](https://platform.moonshot.cn/) | 地图一行：HTTP API |
| **Kimi Business** | [帮助中心](https://www.kimi.com/help)「Kimi Business」 | 地图一行：企业方案 |
| 研究 / Doodle / 加入我们 | [moonshot.cn](https://www.moonshot.cn/) | 非本站 |

```
月之暗面 / Kimi 家族
├── Kimi（kimi.com 工作台）← 本目录主路径
│   ├── 对话（聊天里 K2.6 免费、不耗会员额度）
│   ├── Agent（kimi.com/agent；App 切 K3）
│   ├── Agent Swarm（kimi.com/agent-swarm；App 切 K3 Swarm）
│   ├── Goal / Projects / Skills / Plugins / 定时任务 / 记忆
│   └── Kimi Claw（kimi.com/bot；云端 OpenClaw）
├── Kimi Code — 终端与 IDE 编程助手 → /zh/products/kimi-code/
├── Kimi Work — 桌面端本地 Agent
├── Kimi WebBridge — 浏览器插件
├── Kimi Platform — 模型 API
└── Kimi Business — 企业方案
```

**容易撞名：**

- **Kimi ≠ Kimi Code ≠ Kimi Work ≠ Kimi Claw**。四个入口，四份数据与权限。
- **Agent ≠ Agent Swarm ≠ Claw 群聊**。单 Agent、并行子 Agent、多只 Claw 被 Conductor 调度，不是同一个开关。
- **Goal（工作台）≠ Kimi Code `/goal`**。后者是 CLI 斜杠命令，本目录不教。
- **kimi.com Projects ≠ Kimi Work Projects**。官方原文：the two are not connected and don't share data（[Projects](https://www.kimi.com/help/features/project)）。

### 快速决策：我该用哪个？

```
我要做什么？
├── 浏览器里问问题 / 写文档 / 出 PPT / 出表 / 深度研究 / 建站预览
│   └── → [Kimi 对话与 Agent](./kimi.md)
│       ├── 普通问答 → 打开 kimi.com，聊天（官方：K2.6 免费且不耗额度）
│       ├── 端到端出网站 / Office / 报告 → kimi.com/agent，或 App 切 K3
│       ├── 大规模并行搜集 / 长文 → kimi.com/agent-swarm，或 App 切 K3 Swarm
│       ├── 同一批文件反复用 → 侧栏 Projects
│       ├── 每天固定跑一遍 → 侧栏 Scheduled Tasks
│       └── 24/7 云端助手、接到飞书/企微 → kimi.com/bot（Claw）
├── 对着真实仓库改代码 / 跑测试 / 提 PR
│   └── → [Kimi Code](/zh/products/kimi-code/)（本目录不写安装）
├── 在自己电脑上操作本地文件 / 桌面定时任务
│   └── → Kimi Work（kimi.com/products/kimi-work）
├── 让 Agent 像人一样点浏览器
│   └── → Kimi WebBridge（产品页）或 Kimi Work 内置 WebBridge
└── 在自己的程序里调模型
    └── → Kimi Platform（platform.moonshot.cn）
```

来源：[products](https://www.kimi.com/zh-cn/products/)、[kimi.com](https://www.kimi.com/)、[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview)、[Claw overview](https://www.kimi.com/en/help/kimi-claw/overview)、[Kimi Work overview](https://www.kimi.com/help/kimi-work/overview)、[moonshot.cn](https://www.moonshot.cn/)。

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 分清门 | 本页家族表 | 不要走进 Kimi Code / Work |
| 2. 打开能用 | [Kimi 教程](./kimi.md) | 网页对话 + 第一次 Agent |
| 3. 按场景做 | [Cookbook](./kimi-cookbook.md) | Swarm / Claw / 项目 / 定时任务 |
| 4. 回查入口与额度 | [速查表](./kimi-cheatsheet.md) | 只抄官方表 |
| 5. 名字拧清 | [术语表](./kimi-glossary.md) | 撞名与「不是什么」 |

## 本目录不写什么

- Kimi Code CLI / VS Code 安装、斜杠命令、`AGENTS.md`。
- Kimi Work 桌面安装步骤。
- API `base_url` / `MOONSHOT_API_KEY` 示例（那是 Platform）。
- 模型内部训练细节。机制见 [Learn LLM](/zh/tech/fundamentals/LLM)。

## 相关页面

- [Kimi 对话与 Agent](./kimi.md)
- [实战 Cookbook](./kimi-cookbook.md)
- [速查表](./kimi-cheatsheet.md)
- [术语表](./kimi-glossary.md)
- [Kimi Code](/zh/products/kimi-code/)
- [产品总览](../index.md)
