---
title: GLM Coding Plan 术语表
description: 解释套餐、指定工具、Coding 端点、积分和次级调度。不教逐步配置。
domain: product
tags:
  - coding-plan
role: glossary
---

# GLM Coding Plan 术语表

不教操作。把容易撞车的名字分开后，速查表里的端点和积分才有位置。选哪扇门看 [学习地图](./index.md)。

## 概念关系

```
智谱清言 / Z.ai     聊天产品（#74）
        │
BigModel 标准 API    /api/paas/v4 按量，自建应用走这里
        │
GLM Coding Plan      订阅：只给指定编程工具供 GLM
        ├── Coding Agent（Claude Code、Cursor …）优先调度
        ├── 通用 Agent（OpenClaw …）次级调度
        └── Coding Tool Helper     装载器，不是 Agent
```

## GLM Coding Plan

**是什么：** 智谱面向 AI 编码场景的订阅套餐。官方原文：「专为 AI 编码打造的订阅套餐」（[overview](https://docs.bigmodel.cn/cn/coding-plan/overview)）。

**为什么需要：** 在 Claude Code / Cursor 等现成助手里用 GLM，按套餐积分走，而不是按标准 API 逐 Token 付。

**不是什么：** 不是清言，不是 Z.ai 聊天，不是智谱第一方终端 Agent，也不是开放平台资源包。

## 指定工具

**是什么：** 官方列出的 Coding Agent 与通用 Agent 名单（[tool/others](https://docs.bigmodel.cn/cn/coding-plan/tool/others)）。名单外调用 API，不可享用套餐额度。

**为什么需要：** 编码 Agent 消耗高。平台用名单 + 专用端点，把套餐容量留在编程场景。

**不是什么：** 不是「任何能填 Base URL 的客户端」。官网体验中心也不算。

## Coding 端点

**是什么：** 套餐专用的 Anthropic / OpenAI Compatible URL。国内分别是 `https://open.bigmodel.cn/api/anthropic` 与 `https://open.bigmodel.cn/api/coding/paas/v4`。

**为什么需要：** 同一把 Key 打到 `/api/paas/v4` 会走标准计费或报余额不足，看起来像「套餐没生效」。

**不是什么：** 不是海外 `api.z.ai` 的同一主机。国内 / 海外两套站点，不要混。

## 积分

**是什么：** 套餐同时设每 5 小时和每周上限。模型按 Token × 抵扣系数 / 10000 扣；MCP 按次数 × Output 系数扣。

**为什么需要：** 用积分而不是裸 Token，才能在高峰 / 非高峰、不同模型和 MCP 之间做同一套账。

**不是什么：** 不是账户现金余额，也不是开放平台资源包。额度耗尽后等刷新，官方写明不会改扣其它余额。

## 次级调度

**是什么：** OpenClaw 等通用 Agent 的资源策略。overview 原文：采用**次级调度**与尽力交付；Coding Agent 任务享有资源抢占优先权；高负载下触发动态排队、限流等公平使用策略。

**为什么需要：** 大部分用户在 Coding Agent 场景；通用 Agent 分享同一池子时，编程请求优先。

**不是什么：** 不是「官方不支持 OpenClaw」。支持，但保障级别低于 Claude Code。

## 团队套餐 Key

**是什么：** 团队版每位成员在「团队编程套餐」里拿到的专用调用凭证。与平台其他 API Key 相互独立（[team](https://docs.bigmodel.cn/cn/coding-plan/team)）。

**为什么需要：** 席位、账单、超额按量按组织结算。混用个人 Key 会打到错误的额度池。

**不是什么：** 不是主管理员账号自带的那把平台 Key。主管理员默认不占席位，要用额度得给自己分配席位。

## Coding Tool Helper

**是什么：** 命令行助手，npm 包 `@z_ai/coding-helper`，二进制 `coding-helper` / `chelper`。把套餐装进 Claude Code、OpenCode、Crush、Factory Droid。

**为什么需要：** 免手改 `settings.json` 和 MCP。

**不是什么：** 不是编码 Agent，也不覆盖 Cursor 等其余指定工具。

## 服务端模型映射

**是什么：** Claude Code 配好套餐后，界面仍可能显示 Claude 的 Opus / Sonnet / Haiku 名称，实际由服务端映射到 GLM（[tool/claude](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)）。

**为什么需要：** 让现有 Claude Code 工作流少改界面。硬编码映射会在套餐默认模型升级时掉队。

**不是什么：** 不是你真的在调 Anthropic。`/status` 里应能看到 `glm-*`。

## 国内站 vs 海外站

**是什么：** 国内 `docs.bigmodel.cn` + `open.bigmodel.cn`；海外 `docs.z.ai/devpack` + `api.z.ai`。Helper 的套餐标识分别是 `glm_coding_plan_china` 与 `glm_coding_plan_global`。

**为什么需要：** Key、端点、适用工具名单都不完全相同。

**不是什么：** 不是同一控制台的两个皮肤。清言 / Z.ai 也不是这两个编码控制台。
