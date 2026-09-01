---
title: 得物：Claude Code Spec Coding 项目实战
description: 10 天 2.5 万行代码的中后台实战：Spec 工作流、三层规范体系、MCP 工具与 AI 能力边界框架（数字归属原始来源）。
domain: tech
tags: [tech, case, ai-coding, spec-driven, claude-code]
navOrder: 75
topicId: cases-dewu-ai-implementation
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# 得物：Claude Code Spec Coding 项目实战

> 来源：[SegmentFault - AI编程能力边界探索：基于 Claude Code 的 Spec Coding 项目实战｜得物技术](https://segmentfault.com/a/1190000047648559)
> 替代来源：[CSDN - AI编程能力边界探索](https://blog.csdn.net/u013066109/article/details/159087229)
> 本文所有数字（提效、行数、调用次数）均为该来源的单案例统计，不是可外推基准。

## 概述

一名工程师基于 Claude Code 的 **Spec Coding（规格驱动编码）**，10 天完成一个标准企业级中后台（表格、表单、卡片列表、数据看板），全程在「约束 + 示范 + 视觉」三层规范体系下进行。据来源统计：净增代码 25,546 行、人工指令 217 条、工具调用 2,754 次（其中文件读取 738、代码编辑 550、终端命令 662、任务进度标记 208）、整体提效 36%。

## Spec Coding 工作流

核心思想：**写代码之前，先写规格文档**。通过 OpenSpec，每个功能变更经历：

```
Proposal → Design → Specs → Tasks
```

价值：proposal 阶段先明确 why 与 how，减少返工；tasks 分组让 AI 聚焦当前步骤；每个 Change 的决策链留档可审计。

## 开发时间线

| 阶段 | 周期 | 指令数 | 要点 |
| --- | --- | --- | --- |
| 设计 | — | — | Cursor + 设计规范 Rules 生成高保真 HTML 稿与 PRD |
| 项目搭建 | 2 天 | 20 | 问答式交互，搭基础设施与项目结构 |
| 功能开发 | 4 天 | 89 | 引入 Spec Coding，约 80% 功能代码在此完成 |
| 打磨与部署 | 4 天 | 108 | 迭代、重构与生产部署排障 |

## 三层规范体系

| 层次 | 位置 | 作用 |
| --- | --- | --- |
| 约束层 | `.claude/rules/` | 禁止什么、必须怎样（7 个规范文件：ts、命名、注释、lint、样式、页面结构、API） |
| 示范层 | `.claude/code-design/` | 标准产出长什么样（pro-table、pro-form、可编辑表格、抽屉模板） |
| 视觉层 | `.claude/ui-design/` | 页面应该长什么样（HTML 设计稿，AI 读取结构与样式） |

实际效果（来源统计）：205 个文件的接口函数统一 `fetch{Name}Api` 命名；`constants/services/hooks/components` 分层在新建页面中保持一致；CRUD 页面均参照 pro-table 模板。仍需人工干预的反例：AI 曾把代码写进单文件不分层、错用 `.less` 后缀。

## 典型案例

**AI 驱动产品设计**：在 Rules 中植入「首席产品专家」persona 让 AI 先想清楚；对话式产出高保真 HTML；再以设计稿为上下文生成精确到组件行为级的 PRD——没有产品经理与 UI 设计师参与。

**SDD 驱动功能研发**：页面功能开发人工指令 < 10 条；SDD + MCP 接口文档直连完成 39 个接口联调、零返工（累计调用 21 次）；同日额外交付两个模块。

**SDD 驱动重构**：知识问答首页重构 34 个子任务全部完成、人工干预 < 5 条指令；7 个业务/公共组件解耦；`useChat` 从 20+ 方法拆为 3 个单职责 hook；`ChatInterface` 从 17 个 props 缩到 6-8 个。重构与新功能的本质差异：新功能是「从无到有」，重构是「在活体系统上动手术」。

**复杂排障（超出 AI 边界）**：测试环境构建失败排障约 4 小时、15+ 次方案尝试、59 条指令。根因是 `.npmrc` 历史副作用、Prisma v6 境外下载沉默卡死、pnpm 跨平台 lockfile 不一致——这类跨系统历史状态问题 AI 看不到。

## AI 能力边界框架

AI 是一个「极度服从、无限耐心、但没有内部业务常识的顶级执行者」。按需求颗粒度选协作模式：

| 颗粒度 | 协作模式 | 场景 |
| --- | --- | --- |
| 小 | 对话式 | 改文案、修显隐、调 CSS |
| 中（标准化） | Rules / Skills | 标准 CRUD、简单组件 |
| 中大（复杂） | OpenSpec SDD | 核心重构、复杂模块 |

AI 失效三种模式：**规范真空**（该领域无规范 → 补规范）；**信息孤岛**（AI 只有会话快照，看不到系统外状态 → 架构阶段提前锁定依赖）；**目标模糊**（把该问人的问题当执行问题 → proposal 阶段强制先写 why）。

## 一句话总结

> AI Coding 的本质是用结构化的规范和工作流把不确定性消除在执行之前——AI 在确定性空间里高速执行，人负责维护那个确定性空间的边界。规范是杠杆，AI 是力，Spec 工作流是支点。
