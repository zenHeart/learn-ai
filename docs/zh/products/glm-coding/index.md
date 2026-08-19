---
title: GLM Coding Plan 学习地图
description: GLM Coding Plan 是智谱给指定编程工具用的订阅套餐，不是清言，也不是再做一个聊天产品。本目录只写套餐边界和怎么接到 Claude Code / Cursor 等。
domain: product
tags:
  - coding-plan
role: map
---

# GLM Coding Plan 学习地图

> **GLM Coding Plan** 是专为 AI 编码打造的**订阅套餐**。它把额度卖给你，让你在官方指定的 Claude Code、Cursor 等工具里调用 GLM。它**不是**聊天窗口，也**不是**智谱自己的终端 Agent。
>
> 官方定义（[套餐概览](https://docs.bigmodel.cn/cn/coding-plan/overview)）：
> 「GLM Coding Plan 是专为 AI 编码打造的订阅套餐，仅需少量投入，即可覆盖需求理解、代码生成、调试修复、代码库问答与自动化任务处理等开发全流程。」

## 产品全景

智谱同时卖聊天、开放平台 API、以及这套「给现有编程助手加油」的订阅。本目录的**主学习路径**只有 **GLM Coding Plan**。清言 / Z.ai 正文见 [#74](https://github.com/zenHeart/learn-ai/issues/74)，这里只占一行。

```
智谱 / Zhipu
├── 智谱清言 — chatglm.cn（聊天 / Agent，#74）
├── Z.ai — z.ai（海外聊天 / Agent，#74）
├── BigModel 开放平台 — bigmodel.cn（标准按量 API）
├── GLM Coding Plan — 指定工具里的编码订阅（本目录）
│   ├── 个人：Lite / Pro / Max
│   ├── 团队：标准版 / 高级版
│   └── 装载：npx @z_ai/coding-helper（只覆盖部分 CLI）
└── 其它一级产品 — AutoGLM / AutoClaw / ZCode / Zread.ai …
```

| 官方一级入口 | 是什么 | 官方 URL | 本站去向 |
|--------------|--------|----------|----------|
| **GLM Coding Plan** | 指定编程工具里的订阅额度 | [bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding)、[套餐概览](https://docs.bigmodel.cn/cn/coding-plan/overview) | 本目录独立页 |
| 智谱清言 | 面向消费者的聊天 / Agent | [chatglm.cn](https://chatglm.cn/) | 地图一行，正文 [#74](https://github.com/zenHeart/learn-ai/issues/74) |
| Z.ai | 海外聊天 / Agent 与 API 入口 | [z.ai](https://z.ai/) | 地图一行，正文 [#74](https://github.com/zenHeart/learn-ai/issues/74) |
| BigModel 开放平台 | 标准按量模型 API | [bigmodel.cn](https://bigmodel.cn/)、[平台介绍](https://docs.bigmodel.cn/cn/guide/start/introduction) | 地图一行；和本套餐不是同一口额度 |
| ZCode | 可用本套餐的第一方编码工具 | [tool/zcode](https://docs.bigmodel.cn/cn/coding-plan/tool/zcode) | 地图一行；本目录不写 Agent 教程 |
| AutoGLM | 同厂 Agent 产品 | [zhipuai.cn](https://www.zhipuai.cn/) | 地图一行 |
| AutoClaw | 本地 OpenClaw 客户端 | [autoglm.zhipuai.cn/autoclaw](https://autoglm.zhipuai.cn/autoclaw) | 地图一行 |
| Zread.ai | 开源仓库阅读产品 | [zread.ai](https://zread.ai) | 地图一行；套餐侧只写 [Zread MCP](https://docs.bigmodel.cn/cn/coding-plan/mcp/zread-mcp-server) |
| AMiner | 学术检索 | [zhipuai.cn](https://www.zhipuai.cn/) | 非本站 |
| 智谱学习中心 | 教育 | [zhipuai.cn](https://www.zhipuai.cn/) | 非本站 |
| 智谱AI输入法 | 输入法 | [zhipuai.cn](https://www.zhipuai.cn/) | 非本站 |

来源：[zhipuai.cn](https://www.zhipuai.cn/) 顶栏 / 页脚「产品」、[docs.bigmodel.cn 编码套餐](https://docs.bigmodel.cn/cn/coding-plan/overview)。

**容易撞名：**

- **套餐 ≠ 清言 / Z.ai**。清言是聊天。套餐是给你已经在用的 Claude Code / Cursor 供 GLM。
- **套餐 Key ≠ 平台其它 API Key**。团队套餐 Key 不通用（[快速开始](https://docs.bigmodel.cn/cn/coding-plan/quick-start)、[团队版](https://docs.bigmodel.cn/cn/coding-plan/team)）。
- **`/api/coding/paas/v4` ≠ `/api/paas/v4`**。配错端点会报 `1113 余额不足` 或扣账户余额（[FAQ](https://docs.bigmodel.cn/cn/coding-plan/faq)）。
- **Coding Tool Helper ≠ 编码 Agent**。`npx @z_ai/coding-helper` 只负责装工具、灌套餐。
- **Helper 支持的 4 个工具 ≠ 适用工具全集**。Helper 当前只有 Claude Code / OpenCode / Crush / Factory Droid（[一键安装助手](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper)）。Cursor 要按 [Cursor 页](https://docs.bigmodel.cn/cn/coding-plan/tool/cursor) 手配。

### 快速决策：我该走哪扇门？

```
我要做什么？
├── 在已经在用的 Claude Code / Cursor / Cline 里换 GLM、吃订阅额度
│   └── → 本目录（先 Tutorial，再按工具页配置）
├── 聊天、写作、通用助手
│   └── → 智谱清言 / Z.ai（#74），不是本套餐
├── 自建应用 / 网站 / 机器人 / SaaS 里调 GLM
│   └── → BigModel 标准 API（FAQ 原文：不可享用 Coding 套餐额度）
├── 团队统一席位、账单、IP 白名单
│   └── → 团队版（标准版 / 高级版）
└── 只要一个「智谱自己的 IDE」
    └── → ZCode 是指定工具之一，教程看官方 tool/zcode，本目录不展开
```

国内与海外是两套域名。本中文手册默认 **国内**（`open.bigmodel.cn`）。海外端点见 [docs.z.ai/devpack](https://docs.z.ai/devpack/overview) 与英文目录。

## 套餐边界（先看这个再订阅）

| 项 | 官方口径 |
|----|----------|
| 可用模型 | 所有套餐：**GLM-5.3**、GLM-5-Turbo、GLM-4.7。调用 GLM-5.2 / GLM-5.1 自动切到 GLM-5.3 |
| 能用在哪 | 仅限 [指定工具](https://docs.bigmodel.cn/cn/coding-plan/tool/others#%E4%B8%80%E3%80%81%E9%80%82%E7%94%A8%E5%B7%A5%E5%85%B7) |
| 额度耗尽 | 等下一个 5 小时周期；**不**继续扣资源包 / 账户余额 |
| 国内 Anthropic 端点 | `https://open.bigmodel.cn/api/anthropic` |
| 国内 OpenAI Compatible 端点 | `https://open.bigmodel.cn/api/coding/paas/v4` |
| 个人积分 | Lite 2,000 / 10,000；Pro 12,000 / 60,000；Max 28,000 / 140,000（5 小时 / 每周） |
| 高峰 | 周一至周五 14:00–18:00（UTC+8）；非高峰模型调用按基础积分 **50%** 抵扣 |
| OpenClaw 等通用 Agent | **次级调度** + 尽力交付；Coding Agent 任务优先 |

刊例价以 [订阅页](https://bigmodel.cn/glm-coding) 当时展示为准。文档站 overview 不写人民币价，本页不回填。

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 分清门 | 本页家族表 | 不要进清言，也不要把套餐当标准 API |
| 2. 订上并接到工具 | [Tutorial](./glm-coding.md) | 15 分钟内用 Helper 或手配跑通 Claude Code / Cursor |
| 3. 切模型、MCP、排错 | [Cookbook](./glm-coding-cookbook.md) | GLM-5.3、视觉 / 搜索 MCP、`1113` |
| 4. 回查数字 | [速查表](./glm-coding-cheatsheet.md) | 端点、积分、命令、指定工具名单 |
| 5. 理清概念 | [术语表](./glm-coding-glossary.md) | 套餐 vs API vs 聊天、积分、次级调度 |

## 功能速查

只列官方编码套餐文档里有独立页的能力。

| 能力 | 一句话 | 官方文档 |
|------|--------|----------|
| 套餐概览 | 模型、积分、指定工具 | [overview](https://docs.bigmodel.cn/cn/coding-plan/overview) |
| 快速开始 | 注册、订阅、取 Key、选工具 | [quick-start](https://docs.bigmodel.cn/cn/coding-plan/quick-start) |
| 一键安装助手 | `npx @z_ai/coding-helper` | [coding-tool-helper](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper) |
| 指定工具 | 适用 Coding Agent / 通用 Agent 名单 | [tool/others](https://docs.bigmodel.cn/cn/coding-plan/tool/others) |
| 切换模型 | Claude Code `settings.json` / 其它自定义模型 | [latest-model](https://docs.bigmodel.cn/cn/coding-plan/latest-model) |
| 团队版 | 席位、团队 Key、超额按量 | [team](https://docs.bigmodel.cn/cn/coding-plan/team) |
| 视觉 MCP | 本地 `@z_ai/mcp-server`，模型 GLM-4.6V | [vision](https://docs.bigmodel.cn/cn/coding-plan/mcp/vision-mcp-server) |
| 联网搜索 MCP | Remote `web_search_prime` | [search](https://docs.bigmodel.cn/cn/coding-plan/mcp/search-mcp-server) |
| 网页读取 MCP | Remote Reader | [reader](https://docs.bigmodel.cn/cn/coding-plan/mcp/reader-mcp-server) |
| 开源仓库 MCP | Remote Zread | [zread](https://docs.bigmodel.cn/cn/coding-plan/mcp/zread-mcp-server) |
| GLM in Excel (Beta) | 套餐权益，不是编程 Agent | [glm-in-excel](https://docs.bigmodel.cn/cn/coding-plan/extension/glm-in-excel) |
