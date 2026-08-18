---
title: 阿里云百炼学习地图
description: 百炼是模型与应用平台，不是聊天 App，也不是 IDE。先分清「调 API / 订套餐 / 搭应用」，再进教程。
domain: product
tags:
  - model-platform
role: map
---

# 阿里云百炼学习地图

> **阿里云百炼**（Alibaba Cloud Model Studio）是一站式大模型开发与应用平台：开发者走兼容 OpenAI 的 API，业务人员在控制台搭智能体和知识库问答。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)
>
> 本页只回答「我要做什么 → 用百炼的哪一块」。操作进 [教程](./bailian)，查表进 [速查](./bailian-cheatsheet)，撞名进 [术语表](./bailian-glossary)。
>
> 模型内部机制不在这里写，见 [LLM 基础](/zh/tech/fundamentals/LLM) 与 [Learn LLM](https://llm.zenheart.site/chapters/)。

## 产品全景图

```
阿里云 AI（本站这一目录只写百炼）
├── 大模型服务平台百炼（本目录）
│   ├── 控制台 / 模型体验
│   ├── 模型 API（OpenAI 兼容 / Anthropic 兼容 / DashScope）
│   ├── Token Plan / Coding Plan
│   ├── 智能体 / 工作流 / 知识库 / MCP
│   ├── 百炼 CLI（命令 bl / bailian）
│   └── 调优 / 部署 / 评测（地图一行，不写操作）
├── 通义千问 — 对话产品，另 issue #83，本目录不写教程
├── 通义灵码 / Qoder CN（原 Lingma） — IDE，另 issue #84，本目录不写教程
└── 非本站：ECS / OSS / PAI / DashVector / 析言 GBI / 全妙
```

| 官方一级入口 | 本站去向 |
|--------------|----------|
| 产品简介、首次 API、模型体验 | [教程](./bailian) |
| 选择模型、计费、Token Plan、Coding Plan、地域 | [速查表](./bailian-cheatsheet) |
| 接入客户端/开发工具、免费额度用完即停、百炼 CLI、控制台问答 | [Cookbook](./bailian-cookbook) |
| 智能体 1.0 / 2.0、Workspace、三种协议、两套套餐 | [术语表](./bailian-glossary) |
| 调优 / 部署 / 评测 | 官方页；本站不拆教程 |
| 通义千问 | 地图一行，正文见 #83 |
| 通义灵码 / Qoder CN（原 Lingma） | 地图一行，正文见 #84 |
| ECS / OSS / PAI / 析言 GBI / 全妙 | **非本站** |

### 快速决策：我该用哪个？

```
我要做什么？
├── 在自己的前端 / Node 服务里调 Qwen 或第三方模型
│   └── → 百炼 API（OpenAI 兼容最省事）→ [教程](./bailian)
├── 在 Claude Code / Cursor / Chatbox 里用阿里云的模型额度
│   └── → Token Plan（官方推荐新订）或 Coding Plan
│       └── Key 和 Base URL 必须成对，见 [Cookbook](./bailian-cookbook)
├── 不想写代码，先做一个知识库问答 / 智能体
│   └── → 控制台应用（优先 Agent 2.0）
├── 让本机 Agent 调图像 / 视频 / 语音等原子能力
│   └── → 百炼 CLI（`bl`）
├── 只是和通义聊天，不接 API、不搭应用
│   └── → 通义千问（#83），不是百炼
├── 要一个阿里云出品的编码 IDE
│   └── → Qoder CN / 通义灵码（#84），不是百炼
└── 买云主机 / 对象存储
    └── → 非本站。本目录不写 ECS / OSS
```

三个最容易付的税：

| 容易混的 | 区别 |
|---------|------|
| **百炼** vs **千问** | 百炼是平台（API + 控制台 + 套餐）。千问是模型，也是独立对话产品。[FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio) |
| **百炼** vs **灵码 / Qoder CN** | 灵码已改名为 Qoder CN，是 IDE；可以*接入*百炼的 Key，本身不是百炼。[官方接入页](https://help.aliyun.com/zh/model-studio/lingma-agent) |
| **按量 Key** vs **套餐 Key** | 按量是 `sk-` / `sk-ws`；Coding Plan / Token Plan 专属是 `sk-sp-`。配错主机要么报 `invalid_api_key`，要么**悄悄按量扣费**。[Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) |

## 该读哪一篇

| 文档 | 类型 | 什么时候看 |
|------|------|-----------|
| [上手教程](./bailian) | Tutorial | 第一次：开通 → Key → 第一次 Node 调用 |
| [实战 Cookbook](./bailian-cookbook) | How-to | 已经会调用，要解决混用、扣费、CLI、无代码应用 |
| [Cheatsheet](./bailian-cheatsheet) | Reference | 查地域、URL、套餐对照、官方链接 |
| [术语表](./bailian-glossary) | Explanation | 名词撞了，或两份官方页口径不一致 |

## 建议学习顺序

1. **先读本页决策树**，确认你要的是平台而不是千问/灵码。
2. **跟 [教程](./bailian) 走一遍**：主账号开通、建 Key、环境变量、发一条 `qwen-plus`。
3. 要把模型接进产品，翻 [Cookbook · OpenAI 兼容](./bailian-cookbook)。要把额度接到编程工具，翻 [Cookbook · 不要混用 Key](./bailian-cookbook)。
4. 查参数只认 [速查表](./bailian-cheatsheet) 和官方模型清单。模型名过期极快，**不要在笔记里写死全表**。

## 官方资源

- [产品页](https://www.aliyun.com/product/bailian)
- [什么是阿里云百炼](https://help.aliyun.com/zh/model-studio/what-is-model-studio)
- [选择模型](https://help.aliyun.com/zh/model-studio/models)
- [国际站 Model Studio](https://www.alibabacloud.com/help/en/model-studio/)
- [控制台](https://bailian.console.aliyun.com/)
