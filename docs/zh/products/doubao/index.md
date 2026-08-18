---
title: 豆包学习地图
description: 豆包是字节跳动的消费级 AI 助手。本目录只写豆包 App / 网页。Trae、扣子、火山方舟各占一行。
domain: product
tags:
  - chat
role: map
---

# 豆包学习地图

> **豆包**是字节跳动的消费级 AI 助手。官方收录 description（[doubao.com](https://www.doubao.com/)）：
>
> 「豆包 是你的AI 聊天智能对话问答助手，写作文案翻译编程工具。」
>
> 本目录对位 Claude.ai / 元宝。它**不是** Trae，也**不是**火山方舟上的豆包大模型 API。

## 写给谁 / 不写什么

**写给谁：** 需要一个国内网页或桌面助手写文案、翻译、做 PPT / 表、偶尔问代码的前端工程师。

**非目标：**

- Trae 编程 IDE 安装（#80）
- 扣子 / Coze 搭 Agent（#81）
- 火山方舟 API / CLI（#82）
- 抖音 / 飞书 / 今日头条操作
- 臆造会员价、默认模型 slug
- 模型内部机制（去 [Learn LLM](/zh/tech/fundamentals/LLM)）

## 产品全景

```
字节跳动 AI（本目录只展开豆包助手）
├── 豆包 — 消费级助手（本目录）
│   ├── 网页 doubao.com
│   ├── Windows / macOS 桌面客户端
│   └── 手机 App
├── 豆包手机助手 — o.doubao.com（硬件 / 系统助手，一行）
├── ByteDance Seed — 研究品牌（一行）
├── Trae — 编程 IDE（#80，一行）
├── 扣子 / Coze — Agent 搭建（#81，一行）
└── 火山方舟 — 模型 API（#82，一行）
```

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **豆包**（网页 / 客户端） | [doubao.com](https://www.doubao.com/) | 独立页 [doubao.md](./doubao.md) |
| 下载中心 / 桌面版 | [download](https://www.doubao.com/download/)、[download/desktop](https://www.doubao.com/download/desktop) | Tutorial |
| 豆包手机助手 | [o.doubao.com](https://o.doubao.com/) | 地图一行 |
| ByteDance Seed | [seed.bytedance.com/zh](https://seed.bytedance.com/zh/) | 地图一行 |
| Dola | 首页区域限制提示 | 地图一行 |
| Trae | [trae.ai](https://www.trae.ai/)、[trae.cn](https://www.trae.cn/) | **一行** → #80 |
| 扣子 / Coze | [coze.cn](https://www.coze.cn/) | **一行** → #81 |
| 火山方舟 | [volcengine.com/product/ark](https://www.volcengine.com/product/ark) | **一行** → #82 |
| 抖音 / 飞书 / 头条 | — | **非本站** |

**容易撞名：**

- **豆包 ≠ Trae。** 豆包是聊天助手。Trae 是编程 IDE。
- **豆包 App ≠ 豆包大模型 API。** 后者走火山方舟。
- **豆包 ≠ 扣子。** 扣子是搭 Agent 的平台。
- **豆包 ≠ 豆包手机助手。** `o.doubao.com` 是另一条硬件 / 系统助手线。
- **首页 Seedance 2.0 ≠ 桌面页 Seedance 2.5。** 两份官方文案并列，本站不选边。

### 快速决策：我该用哪个？

```
我要做什么？
├── 浏览器或桌面里聊天、写作、翻译、PPT、Excel、生图 / 生视频
│   └── → 豆包（本目录）
├── 对着真实仓库改代码
│   └── → Trae（#80）
├── 搭一个可发布的 Agent / 工作流
│   └── → 扣子（#81）
├── 在自己的前端或 Node 服务里调豆包模型
│   └── → 火山方舟（#82）
└── 刷抖音 / 用飞书本身
    └── → 非本站
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 打开能聊 | [豆包教程](./doubao.md) | 网页或客户端发出第一句 |
| 2. 回查链接 | [速查表](./doubao-cheatsheet.md) | 下载、商店、同厂入口 |
| 3. 名字分清 | [术语表](./doubao-glossary.md) | 不再把 Trae / 方舟叫成豆包 |

官方没有 How-to 文档树，本目录**不设 cookbook**。

## 功能速查（只抄官方页）

| 能力 | 官方原文出处 |
|------|----------------|
| AI 聊天、写作、文案、翻译、编程工具 | [首页 description](https://www.doubao.com/) |
| Seedance 2.0 视频生成已接入，登录即可免费使用 | 首页 / 下载页 meta |
| 写作翻译、一键生成 PPT、智能处理 Excel | [桌面落地页](https://www.doubao.com/download/desktop) |
| 专业版 Seedream 5.0 生图、专业版 Seedance 2.5 生视频 | 桌面落地页 |
| 内置自主规划执行的 Agent 智能体 | 桌面落地页 |

套餐与额度：2026-08-19 **没有**找到豆包官方价目表。不要把第三方次数写进正文。
