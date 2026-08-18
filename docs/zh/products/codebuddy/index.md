---
title: CodeBuddy 学习地图
description: "腾讯云 CodeBuddy 是一套共享账号额度、但入口完全不同的 AI 编程产品族：独立 IDE、编辑器插件、终端 CLI。本页是家族图和决策树——先分清形态，再决定学什么。"
domain: product
tags:
  - coding-agent
role: map
---

# CodeBuddy 学习地图

> 腾讯云代码助手 **CodeBuddy** 同时提供 **IDE、插件、CLI** 三种编程形态。官方原文（[文档总览](https://www.codebuddy.cn/docs/)、[腾讯云产品概述](https://cloud.tencent.com/document/product/1831/134343)）：
>
> 「产品支持 IDE、插件和 CLI 三种形态，覆盖从专业开发者到零基础用户的全场景需求。」

本页是全景图和决策树——**先分清形态，再决定学什么**。安装步骤见 [上手教程](./codebuddy)。

## 产品家族

文档站顶栏一级入口（2026-08-18 打开 [codebuddy.cn/docs](https://www.codebuddy.cn/docs/)）：

```
腾讯云 / CodeBuddy 家族
├── CodeBuddy IDE — 独立编辑器，「对话即编程」
├── CodeBuddy 插件 — VS Code / JetBrains 等宿主里的扩展
├── CodeBuddy Code（CLI）— 终端 agent，命令 `codebuddy`
├── WorkBuddy — 办公工作台（本目录不写教程）
│   ├── WorkBuddy 小程序
│   └── WorkBuddy 移动端
└── 企业版 — SaaS 旗舰 / 专享版（本目录不写教程）
同厂其它 AI（本目录不写教程）
├── 元宝 — 通用助手
└── 混元 — 模型，不是编码产品
```

| 官方一级入口 | 是什么 | 官方 URL | 本站去向 |
|--------------|--------|----------|----------|
| **CodeBuddy IDE** | 产设研一体工作台，主打「对话即编程」 | [文档总览](https://www.codebuddy.cn/docs/) · [安装](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation) · [下载](https://www.codebuddy.cn/ide/) | [教程](./codebuddy#安装-ide) |
| **CodeBuddy 插件** | 装进已有编辑器的 AI 辅助 | [插件文档](https://www.codebuddy.cn/docs/plugin/) | [教程](./codebuddy#安装-插件) |
| **CodeBuddy Code（CLI）** | 终端里用自然语言驱动开发 | [CLI 文档](https://www.codebuddy.cn/docs/cli/) · [安装](https://www.codebuddy.cn/docs/cli/installation) | [教程](./codebuddy#安装-cli) |
| **WorkBuddy** | 「全场景 AI 办公工作台。说出要求、开始执行任务、交付完整成果。」 | [WorkBuddy 简介](https://www.codebuddy.cn/docs/workbuddy/) · [官网 /work](https://www.codebuddy.cn/work/) | **地图一行**，不拆教程 |
| **WorkBuddy 小程序** | WorkBuddy 的移动端入口之一 | [小程序简介](https://www.codebuddy.cn/docs/workbuddymini/) | **地图一行**，不拆教程 |
| **WorkBuddy 移动端** | 桌面 WorkBuddy 的配套 App | [移动端简介](https://www.codebuddy.cn/docs/workbuddyapp/) | **地图一行**，不拆教程 |
| **企业版** | SaaS 企业版（旗舰版）/ 专有云专享版 | [购买流程](https://www.codebuddy.cn/docs/ide/Codebuddy-enterprise-edition/Codebuddy-enterprise-purchase) · [云文档概述](https://cloud.tencent.com/document/product/1831/134343) | **地图一行**，不拆教程 |
| **元宝** | 腾讯通用 AI 助手 | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | **地图一行**（另 #76） |
| **混元** | 腾讯自研大模型；CodeBuddy 可切换的模型之一 | [hunyuan.tencent.com](https://hunyuan.tencent.com/) · [云产品 tclm](https://cloud.tencent.com/product/tclm) | **地图一行**（另 #77） |

**不是本站范围**：微信、QQ、云主机、支付。Retrieve 时若官方 nav 冒出这些，标「非本站」即可。

官方形态对照（[产品概述](https://cloud.tencent.com/document/product/1831/134343)）：

| | **CodeBuddy 插件** | **CodeBuddy IDE** | **CodeBuddy Code** |
|---|-------------------|-------------------|---------------------|
| 需求用户 | 日常编码开发者 / 特定 IDE 使用者 | 产品 / 设计师 / 全栈开发 / 编程初学者 | DevOps / 运维 / SRE / 资深开发者 |
| 核心优势 | 即插即用，零成本学习；融入现有工作流 | 产设研一体；CloudBase / EdgeOne Pages / CloudStudio | Shell / 文件 / 网络；无头环境；任务编排 / Sub Agent |
| 使用指引 | 插件市场搜索 **腾讯云代码助手** | 国际版 [codebuddy.ai](https://www.codebuddy.ai/) · 国内版 [copilot.tencent.com/ide](https://copilot.tencent.com/ide) | `npm install -g @tencent-ai/codebuddy-code` |

三种形态 **共享同一账号的资源配额**（[故障排查 · 额度共享](https://www.codebuddy.cn/docs/cli/troubleshooting)）。

### 快速决策：我该用哪个？

```
我现在要干什么？
├── 已经有 VS Code / JetBrains / Visual Studio，只想要补全和对话
│   └── → 插件（市场搜「腾讯云代码助手」）
├── 要从一句话需求走到原型 / 设计稿 / 可部署应用
│   └── → IDE（对话即编程）
├── 工作在终端：脚本、CI、批量重构、无头自动化
│   └── → CodeBuddy Code（`codebuddy` / `codebuddy -p`）
├── 办公文档 / PPT / 本地文件批处理，不是对着仓库写代码
│   └── → WorkBuddy（本目录不教；去官方）
└── 通用聊天 / 搜索，不是编码产品
    └── → 元宝（本目录不教）
```

三个最容易混的名字，先记住：

| 容易混的 | 区别 |
|---------|------|
| **CodeBuddy** vs **WorkBuddy** | 前者写代码；后者是办公工作台 |
| **编辑器插件** vs **CLI `plugin`** | 前者装进 VS Code；后者是 `codebuddy plugin install` |
| **混元** vs **CodeBuddy** | 混元是模型；CodeBuddy 是产品，官方还写支持 DeepSeek 等 |

更多辨析见 [术语表](./codebuddy-glossary)。

## 该读哪一篇

本组文档按 [Diataxis](https://diataxis.fr/) 拆分：

| 文档 | 类型 | 什么时候看 |
|------|------|-----------|
| [上手教程](./codebuddy) | Tutorial | 第一次用：装 IDE / 插件 / CLI → 登录 → 第一次对话 |
| [实战 Cookbook](./codebuddy-cookbook) | How-to | 已经能跑，要抄 `/init`、print 模式、自定义命令、MCP、迁移 |
| [Cheatsheet](./codebuddy-cheatsheet) | Reference | 查安装原文、CLI 命令、斜杠命令、键位 |
| [术语表](./codebuddy-glossary) | Explanation | 形态、权限模式、`CODEBUDDY.md`、国内站 / 国际站 |

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 选对形态并装上 | [教程](./codebuddy) | 15 分钟内在一种形态里完成登录 |
| 2. 跑通第一次任务 | [教程](./codebuddy) 的第一次对话；CLI 先 `/init` | 敢让它读仓库或改一小处 |
| 3. 接到日常工作流 | [Cookbook](./codebuddy-cookbook) | print 模式、斜杠命令、MCP |
| 4. 回查参数 | [速查表](./codebuddy-cheatsheet) | 命令、flag、安装原文 |
| 5. 理清概念 | [术语表](./codebuddy-glossary) | 不再把 WorkBuddy / 混元 / CLI plugin 当同一个东西 |

## 功能速查

| 功能 | 在哪 | 官方出处 |
|------|------|----------|
| 行内补全、技术对话、`@workspace` / `#Codebase` | 插件 | [产品概述](https://cloud.tencent.com/document/product/1831/134343) |
| 自然语言 → PRD / 设计稿 / 代码 / 一键部署 | IDE | 同上 |
| 交互式 REPL、`codebuddy -p`、斜杠命令、MCP | CLI | [快速开始](https://www.codebuddy.cn/docs/cli/quickstart) · [CLI 参考](https://www.codebuddy.cn/docs/cli/cli-reference) |
| Skills / Hooks / 子代理 / Daemon | CLI（高级） | [CLI 文档树](https://www.codebuddy.cn/docs/cli/) |

## 目标与非目标

**目标**：让前端工程师分清 CodeBuddy 的三种编程形态，并按官方步骤装上、登录、跑通第一次任务。

**非目标**：

- 不写元宝、混元、WorkBuddy 的完整教程
- 不写微信 / QQ 产品
- 不写模型内部机制
- 不把官网营销百分比当成实测结论

## 资源

- [国内文档站](https://www.codebuddy.cn/docs/)
- [国际文档站](https://www.codebuddy.ai/docs/) · [中文镜像](https://www.codebuddy.ai/docs/zh/)
- [腾讯云产品页 acc](https://cloud.tencent.com/product/acc)
- [定价](https://www.codebuddy.cn/pricing/) — 页面是前端渲染；不要在本站抄未核过的套餐数字
- [Cheatsheet · 高质量信息源](./codebuddy-cheatsheet#高质量信息源)
