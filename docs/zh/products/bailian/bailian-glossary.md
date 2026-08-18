---
title: 阿里云百炼术语表
description: 百炼、千问、灵码不是同一个东西。三种协议、两套套餐、两套 CLI 也不是。
domain: product
tags:
  - model-platform
role: glossary
---

# 阿里云百炼术语表

不教操作。只把容易撞车的名字拆开。选哪条路见 [学习地图](./index)。

## 百炼 / Model Studio

**是什么**：阿里云的大模型服务与应用开发平台。英文名 Alibaba Cloud Model Studio。提供模型调用、可视化应用、订阅套餐。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

**不是什么**：不是通义聊天窗口，不是通义灵码 IDE，不是 ECS / OSS。

**为什么单独成页**：前端把 Qwen 接进自己的站点，走的是这个平台的 API 和计费，不是聊天站。

## 千问 Qwen

**是什么**：阿里的模型系列，也是独立的对话产品。FAQ 原句：百炼是大模型服务平台，提供包括千问系列在内的多种大模型。[FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

**本目录**：只把它当「百炼上可调用的模型」。对话产品正文见 #83。

## 灵码 / Qoder CN

**是什么**：阿里云智能编码助手 / 独立 IDE。官方现名 **Qoder CN（原 Lingma）**。[接入页](https://help.aliyun.com/zh/model-studio/lingma-agent)

**和百炼的关系**：可以填百炼的 Token Plan / Coding Plan / 按量 Key。企业版官方写不支持接入百炼。

**本目录**：一行。完整教程见 #84。

## DashScope

**是什么**：旧的模型接口品牌。环境变量仍叫 `DASHSCOPE_API_KEY`，美国主机仍出现 `dashscope-us.aliyuncs.com`，Coding Plan 页仍出现 `dashscope.aliyuncs.com`。

**不是什么**：不是另一个要单独开通的「DashScope 产品教程」。对本站读者，它是百炼 API 的历史名字。

## 业务空间 Workspace

**是什么**：隔离项目 / 团队资源和权限的容器。新 MaaS Base URL 里的 `{WorkspaceId}` 就是它。[首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen)、[获取 API Key](https://help.aliyun.com/zh/model-studio/get-api-key)

**权限规则（官方）**：

- 同一空间内的 API Key 权限相同，不必按文生文 / 文生图拆 Key。
- 默认空间：可调标准模型 + 该空间应用。
- 子空间：只能调已授权的标准模型 + 该空间应用。
- 调优后的模型：只用它所在空间的 Key。

主账号能看所有空间的 Key；子账号只能看已加入的空间。

## 三种调用协议

同一模型在清单页常同时给出三条主机：

| 协议 | 路径特征 | 什么时候用 |
|------|----------|------------|
| OpenAI 兼容 | `/compatible-mode/v1` | 已有 `openai` SDK、多数桌面客户端 |
| Anthropic 兼容 | `/apps/anthropic` | Claude Code 等走 Messages 的工具 |
| DashScope | `/api/v1` | 官方 DashScope SDK、部分多模态生成 |

来源：[选择模型](https://help.aliyun.com/zh/model-studio/models)。三条主机**不能**互换；Coding Plan / Token Plan 还有第四套专属主机。

## Token Plan vs Coding Plan

都是百炼卖的订阅，**不能互相迁移或升级**。[Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)

| | Token Plan | Coding Plan |
|--|------------|-------------|
| 计量 | Credits | 请求次数 |
| 官方态度（2026-08） | 推荐新订，模型与 Harness 更多 | Lite 已停；Pro 限量 |
| 个人 vs 团队 | 个人版有 7 天窗口；团队版按座席包月、承诺不训练 | 页上以 Pro 为主 |
| 数据 | 个人版用于改进；团队版承诺不用 | 输入和输出都用于改进 |
| 合法用法 | 兼容 OpenAI / Anthropic 的工具 | **仅限**编程工具，禁止当后端 API |

FAQ / 国际站简介里「绝不会用你的数据训练」是简化口径。以产品简介「重要」框和两份套餐页为准。

## Agent 1.0 vs 2.0

| | 1.0 | 2.0 |
|--|-----|-----|
| 调度 | 先检索知识库，再决定是否调 MCP | 知识库和 MCP 都是工具，由模型规划顺序 |
| 过程 | 只给最终结果 | 展示规划-执行-反思 |
| 迁移 | — | **不能**从 1.0 升级，只能新建 |

来源：[新版智能体](https://help.aliyun.com/zh/model-studio/new-single-agent-application)。无旧依赖时官方推荐 2.0。

工作流是另一类可视化应用（固定节点图），不是 Agent 2.0 的别名。[工作流](https://help.aliyun.com/zh/model-studio/workflow-application/)

## 知识库 RAG

把私有文档检索后喂给模型。和「直接调模型」是两个计费项：知识库按规格时长 + 调用计费，不吃节省计划 / 资源包。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

降低幻觉的官方手段之一，见 FAQ「模型幻觉」。原理见 [LLM 基础](/zh/tech/fundamentals/LLM)，不要在本页展开注意力。

## MCP

模型上下文协议。百炼的智能体 / 工作流可挂官方 MCP 或自定义 MCP。[MCP 简介](https://help.aliyun.com/zh/model-studio/mcp-introduction)

部分官方 MCP（文生图、文生视频、语音、联网搜索）会单独计费。自定义 MCP 有基础 / 极速两种时长计费。部署费用是否仍「限时免费」以该页为准。

## 百炼 CLI vs 阿里云 CLI

| | 百炼 CLI | 阿里云 CLI 插件 |
|--|----------|-----------------|
| 包 / 命令 | npm `bailian-cli`，命令 `bl` / `bailian` | `aliyun bailian ...` |
| 用途 | 给本机 Agent 调模型与多模态原子能力 | 管类目、文件、连接器等 OpenAPI |
| 文档 | [install.md](https://bailian.aliyun.com/cli/install.md) | [OpenAPI CLI 中心](https://next.api.aliyun.com/api-tools/cli/bailian/2023-12-29) |

装错的典型症状：能 `aliyun bailian list-file`，却没有 `bl text chat`。

## 高代码应用

把 Python 项目部署成带运维和日志的后端服务。官方入口：[高代码应用](https://help.aliyun.com/zh/model-studio/rich-code-application/)。轴 B 偏后端平台，本站不写教程。
