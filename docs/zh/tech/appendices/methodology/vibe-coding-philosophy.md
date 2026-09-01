---
title: Vibe Coding 理念
description: 2025 年提出的 AI 原生构建方式：自然语言描述目标、AI 实现迭代、人负责方向判断与验收——及其与传统编程的对照。
domain: tech
tags: [tech, methodology, legacy, vibe-coding]
navOrder: 85
topicId: methodology-vibe-coding
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Vibe Coding 理念

> 学习来源：[Vibe Vibe](https://www.vibevibe.cn/) ｜ 原文引用于 Andrej Karpathy (2025)

## 什么是 Vibe Coding

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."
> — **Andrej Karpathy**, 2025

Vibe Coding 是 2025 年提出的代表性 **AI 原生构建方式**，也是 Collins 词典年度词汇。核心特征：

1. **用自然语言描述目标与需求**，而不是所有步骤亲手完成
2. **让 AI 参与实现、组织和迭代**，你负责验收、判断和调整
3. **更快把想法变成真实成果**——做出东西往往比空想和完美规划更能推动学习

简单说：**你负责方向、判断和审美，AI 帮你把作品做出来。**

## 核心理念

- **零基础友好**：从想法开始，不需要编程经验
- **AI 创造工作流**：用 AI 梳理想法、搭原型、补内容、改交互、推上线——而不只是把 AI 当写代码的工具
- **MVP 思维**：最少时间验证想法，避免功能蔓延，先完成再完美
- **安全底线意识**：从第一天学会保护用户数据、避免常见漏洞
- **渐进式学习**：基础篇完成作品 → 进阶篇完善成产品

## Vibe Coding vs 传统编程

| 维度 | 传统编程 | Vibe Coding |
|------|----------|--------------|
| 输入 | 代码指令 | 自然语言描述目标 |
| 迭代方式 | 手动写代码调试 | AI 生成 + 人工验收调整 |
| 关注点 | 实现细节 | 方向、判断、审美 |
| 效率 | 取决于编码速度 | 取决于需求描述和判断能力 |
| 适用场景 | 需要精确控制的底层实现 | 快速验证想法、MVP 构建 |

## 思维转变

```
传统模式：想法 → 写代码（苦力活）→ 调试 → 产出
Vibe Coding：想法 → 描述给 AI → AI 生成 → 验收判断 → 调整 → 产出
```

核心转变：**执行者 → 验收者**；写代码 → 说清楚要什么；自己实现 → 让 AI 实现、自己把控方向。

## 适合谁

| 人群 | 推荐路径 | 理由 |
|------|----------|------|
| 设计师 / 产品经理 | 基础篇 | 零代码基础做出可运行原型 |
| 文科生 / 跨专业 | 基础篇 | 从最基础概念循序渐进 |
| 前端开发者 | 进阶篇 | 扩展后端能力成为全栈 |
| 创业者 / 独立开发者 | 两者皆可 | 快速搭建 MVP |

## 边界与主线的关系

Vibe Coding 的定位是**把想法变成真实作品**，不是把人训练成资深工程师——不会因此突然精通算法或框架源码。它的「描述需求 + 验收判断」内核正是主线 [提示词工程](../../01-contracts/prompt)与[结构化输出](../../01-contracts/structured-output)的工程化版本；而生产级系统的安全与验证要求见层 5（[测试](../../05-operations/testing)、[安全](../../05-operations/security)）——那是 vibe 之外必须补上的部分。

**项目资源**：[datawhalechina/vibe-vibe](https://github.com/datawhalechina/vibe-vibe)
