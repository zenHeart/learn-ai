---
title: 火山方舟学习地图
description: 火山方舟是火山引擎的大模型 API 与模型广场。本目录不写豆包 App、Trae、扣子。
domain: product
tags:
  - api
role: map
---

# 火山方舟学习地图

> **火山方舟**是火山引擎的一站式大模型服务平台。官方产品页（[volcengine.com/product/ark](https://www.volcengine.com/product/ark)）：
>
> 「火山方舟提供模型训练、推理、评测、精调等全方位功能与服务，并重点支撑大模型生态。」
>
> 本目录对位阿里云百炼。它**不是**豆包聊天 App，也**不是** Trae。

## 写给谁 / 不写什么

**写给谁：** 要在前端或 Node 服务里调豆包大模型，或把方舟额度接到 Claude Code / Cursor / Trae 的工程师。

**非目标：**

- 豆包 App 操作（#79）
- Trae 安装主教程（#80）
- 扣子编排（#81）
- ECS / TOS / CDN 等非 AI 云产品
- 编造 Base URL、模型 ID、完整价表
- 模型内部机制（去 [Learn LLM](/zh/tech/fundamentals/LLM)）

文档中心（产品 ID **82379**）是 SPA。2026-08-19 无 JS 抓取看不到快速入门正文。**本站不补步骤。** 第一次 HTTP 调用跟官方 [快速入门](https://www.volcengine.com/docs/82379/1399008)。

## 产品全景

```
火山引擎 / 字节 AI（本目录只展开方舟）
├── 火山方舟 — 模型 API / 广场 / 精调 / 评测（本目录）
│   ├── 控制台 + API Key
│   ├── 在线推理 / 批量 / 模型单元
│   ├── 方舟 CLI（npm @volcengine/ark-cli）
│   ├── Coding Plan / Agent Plan
│   └── 精调 / 评测（地图一行，不写操作）
├── 豆包 App — 聊天助手（#79，一行）
├── Trae — 编程 IDE（#80，一行）
└── 扣子 — Agent 搭建（#81，一行）
```

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **火山方舟**产品页 | [product/ark](https://www.volcengine.com/product/ark) | 独立页 [volcengine-ark.md](./volcengine-ark.md) |
| 文档中心 82379 | [docs/82379](https://www.volcengine.com/docs/82379) | 速查 |
| 产品简介 | [1099455](https://www.volcengine.com/docs/82379/1099455) | Tutorial 链 |
| 快速入门 | [1399008](https://www.volcengine.com/docs/82379/1399008) | Tutorial 主链 |
| 模型列表 / 模型价格 | 文档侧栏；价格 [1544106](https://www.volcengine.com/docs/82379/1544106) | 速查链，不抄全表 |
| 豆包大模型 1.8 | 文档侧栏 | 地图一行 |
| Coding Plan | 文档侧栏 | [Cookbook](./volcengine-ark-cookbook.md) |
| 接入三方工具 | 文档侧栏 | Cookbook |
| 方舟 CLI | 首页 `npm i @volcengine/ark-cli@latest -g` | Tutorial + 速查 |
| API Key | [ark.volcengine.com/.../apiKey](https://ark.volcengine.com/region:cn-beijing/apiKey) | Tutorial |
| 豆包 App | [doubao.com](https://www.doubao.com/) | **一行** → #79 |
| Trae | [trae.ai](https://www.trae.ai/) | **一行** → #80 |
| 扣子 | [coze.cn](https://www.coze.cn/) | **一行** → #81 |
| ECS / TOS / CDN | 火山引擎其它产品 | **非本站** |

**容易撞名：**

- **方舟 ≠ 豆包 App。** 方舟是平台。豆包是聊天产品。
- **方舟 CLI ≠ Trae。** CLI 把方舟接到已有 Agent；Trae 是 IDE。
- **Coding Plan ≠ Agent Plan。** 文档侧栏有 Coding Plan；产品页另有「方舟 Agent Plan……限时 9.9 元起」。
- **豆包大模型 1.8 ≠ 豆包聊天。** 前者是文档侧栏的模型代际。

### 快速决策

```
我要做什么？
├── 在自己的前端 / Node 里调豆包或其它方舟模型
│   └── → 控制台拿 Key → 官方快速入门（本站不编 HTTP）
├── 在终端里认证、调模型、管资源
│   └── → 方舟 CLI（官方 npm 命令）
├── 把额度接到 Claude Code / Cursor / Trae
│   └── → 官方「接入三方工具」+ 产品页「方舟 CLI 支持……」
├── 只是和豆包聊天
│   └── → 豆包 App（#79）
├── 要一个编程 IDE
│   └── → Trae（#80）
└── 买云主机
    └── → 非本站
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 拿 Key、装 CLI | [教程](./volcengine-ark.md) | 打开控制台；会敲官方 npm 命令 |
| 2. 接到第三方工具 | [Cookbook](./volcengine-ark-cookbook.md) | 知道去哪张官方页 |
| 3. 回查 | [速查](./volcengine-ark-cheatsheet.md) | URL、套餐原文、文档树 |
| 4. 名字 | [术语表](./volcengine-ark-glossary.md) | 不再把方舟叫成豆包 |

## 功能速查（只抄官方页）

| 能力 | 出处 |
|------|------|
| 训练、推理、评测、精调 | 产品页 description |
| 方舟 CLI，支持 Claude Code、Cursor、TRAE | 产品页 |
| `npm i @volcengine/ark-cli@latest -g` | 火山引擎首页 |
| Agent Plan 限时 9.9 元起 | 产品页 |
| 在线推理 6 元起 / 百万输入、30 元起 / 百万输出 | 产品页 |
| 协作奖励：每日单模型最高 500 万 Tokens | 产品页 |
| 联网插件、内容插件、知识库、扣子专业版 | 产品页「模型能力扩展」 |
