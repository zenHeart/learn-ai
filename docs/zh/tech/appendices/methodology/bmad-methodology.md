---
title: BMAD Method
description: AI 驱动的敏捷开发框架：Analysis → Planning → Solutioning → Implementation 四阶段、三种规划路径与专用 Agent 工作流速查。
domain: tech
tags: [tech, methodology, legacy, bmad, agile]
navOrder: 86
topicId: methodology-bmad
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# BMAD Method

> 原文: https://github.com/bmad-code-org/BMAD-METHOD ｜ 文档: https://docs.bmad-method.org ｜ MIT 开源

## 概述

**BMad Method** 是一个 AI 驱动的敏捷开发框架：从创意构思、规划到 Agent 实现，覆盖整个软件开发流程。核心理念：传统 AI 工具替你思考、产生平均水平的成果；BMad agents 与引导式工作流扮演**专家协作者**，引导你通过结构化流程发挥最佳思维。

## 核心特性

| 特性 | 说明 |
|------|------|
| Scale-Domain-Adaptive | 根据项目复杂度自动调整规划深度 |
| Structured Workflows | 基于敏捷最佳实践的分析/规划/架构/实现工作流 |
| Specialized Agents | 12+ 领域专家（PM、架构师、开发者、UX 等） |
| Party Mode | 多个 agent 角色同堂协作讨论 |
| Complete Lifecycle | 头脑风暴到部署全生命周期 |

## 四阶段流程与三种规划路径

| 阶段 | 名称 | 内容 |
|------|------|------|
| 1 | Analysis | 头脑风暴、研究、产品简报或 PRFAQ（可选） |
| 2 | Planning | 创建需求文档（PRD 或 spec） |
| 3 | Solutioning | 设计架构（BMad Method/Enterprise 专用） |
| 4 | Implementation | 按 epic 逐个构建，story 逐个实施 |

| 路径 | 适用场景 | 产出文档 |
|------|----------|----------|
| **Quick Flow** | Bug 修复、简单 feature、明确范围（1-15 stories） | 仅 Tech-spec |
| **BMad Method** | 产品、平台、复杂 feature（10-50+ stories） | PRD + Architecture + UX |
| **Enterprise** | 合规、多租户系统（30+ stories） | + Security + DevOps |

## 快速开始

```bash
npx bmad-method install
```

环境要求 Node.js v20+ / Python 3.10+ / uv。安装后创建 `_bmad/`（agents、工作流、任务、配置）与 `_bmad-output/`（产出物：PRD.md、architecture.md、epics/、sprint-status.yaml）。可与 Claude Code、Cursor、Codex CLI 等任何支持自定义系统提示的 AI 编码助手集成。

**BMad-Help** 是最快上手方式：在 AI IDE 中调用 `bmad-help`（可带问题），它会检查项目现状、展示选项、推荐下一步。

## 实施循环

每个 story 重复（每次新 chat）：DEV agent 运行 `bmad-create-story` → `bmad-dev-story` 实施 → `bmad-code-review` 质量验证。完成后 `bmad-retrospective` 复盘。

常用工作流：`bmad-create-prd`（PRD）、`bmad-create-architecture`（架构）、`bmad-create-epics-and-stories`（拆分）、`bmad-check-implementation-readiness`（就绪检查）、`bmad-sprint-planning`（冲刺）。

官方模块：BMM 核心框架（34+ 工作流）、BMad Builder（自定义 agents）、Test Architect（基于风险的测试）、Game Dev Studio、Creative Intelligence Suite。

## 与主线的关系

BMAD 的「结构化规划 → 按 story 实施 → 代码评审门」与主线 [恢复与人工批准](/zh/tech/06-agent-systems/recovery-hitl)（审批点）、[测试](/zh/tech/08-production/testing)（质量门）同构；其 Agent 角色分工可对照 [多 Agent 系统](/zh/tech/06-agent-systems/multi-agent) 阅读。作为框架选型时注意：它解决的是「流程结构化」，你的工程判断仍是决定性变量。
