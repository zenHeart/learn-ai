---
title: How I Use Claude Code
description: Boris Tane 的纪律化工作流：research.md → plan.md → 注释循环 → todo → 一次性实施——把思考和打字分开。
domain: tech
tags: [tech, course-notes, legacy, claude-code, workflow]
navOrder: 82
topicId: course-notes-how-i-use-claude-code
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# How I Use Claude Code

> 原文: https://boristane.com/blog/how-i-use-claude-code/ （作者 Boris Tane，约 9 个月的主用经验）

## 概述

**核心原则**：在你审查并批准书面计划之前，永远不要让 Claude 写代码。「计划与执行分离」是整个工作流最重要的原则。

```
Research → Plan → Annotate（循环 1-6 次）→ Todo List → Implement → Feedback & Iterate
```

## Phase 1: Research（研究）

每个有意义的任务从深度阅读开始：让 Claude 彻底理解代码库相关部分，并把发现写入**持久化的 research.md**，而非对话中口头总结。

- 指令要用 "deeply"、"in great details"、"go through everything" 这类词——没有它们 Claude 会泛读
- **research.md 是作者的审查面**：在任何规划发生之前阅读验证、纠正误解。研究错了 → 计划错 → 实现错。AI 辅助编程最昂贵的失败模式不是语法错误，而是孤立工作但在周围系统中造成破坏的实现

## Phase 2: Planning（规划）

研究被审查后，请求详细实施计划写入 **plan.md**（解释方法、代码片段、将修改的文件路径、权衡）。用自建 .md 文件而非内置 plan mode——完全控制权、可内联注释、作为 artifact 持久化。

实用技巧：见过好的开源实现就把那段代码作为参考分享，Claude 有具体参照时效果显著更好。

## 注释循环（Annotation Cycle）

工作流中最独特、增值最大的部分：

```
Claude 写 plan.md → 编辑器中审查 → 添加内联注释 → 发回 Claude 更新计划 → 循环直到满意 → 请求 Todo List
```

真实注释示例：纠正错误假设（"no — this should be a PATCH, not a PUT"）、补充领域知识（"use drizzle:generate for migrations, not raw SQL"）、拒绝方案（"remove this section entirely"）。关键指令是明确的 **"don't implement yet"**——没有它 Claude 会自认为计划够好就跳去写代码。

Markdown 文件是人与 Claude 之间的**共享可变状态**：按自己的节奏思考、精确标注问题位置、重新投入不丢上下文。

## Todo List 与实施

实施前请求细粒度任务分解（同样 "don't implement yet"），形成进度追踪器。然后一次性实施：

```
implement it all. when you're done with a task or phase, mark it as completed in the plan document.
do not stop until all tasks and phases are completed. do not add unnecessary comments or jsdocs,
do not use any or unknown types. continuously run typecheck.
```

**实施应该是无聊的**——所有决策已在注释循环中做出，创造性工作发生在计划阶段，实施是机械的。

## 实施中的反馈

角色从架构师转为监督者，修正通常一句话（"You didn't implement the deduplicateByTitle function."）。前端视觉问题用截图比描述快；指向参考（"this table should look exactly like the users table"）比从头描述精确。走向错误时不打补丁，直接回退并缩小范围——几乎总比修糟糕方案的结果好。

## 单一长会话

研究、规划、实施在一个连续长会话中完成。作者报告未观察到 50% 上下文后的性能下降；上下文满时自动压缩足够，而计划文档作为持久化 artifact 以完整保真度存活。

## 一句话总结

> Read deeply, write a plan, annotate the plan until it's right, then let Claude execute the whole thing without stopping, checking types along the way.

没有魔法 prompt，只有一条纪律严明的管道，把思考和打字分开。

## 与主线的关系

「计划/执行分离」「持久化 artifact 作为共享状态」与主线 [恢复与人工批准](../../04-action/agent-runtime/recovery-hitl)（HITL 审批点设计）和 [上下文工程](../../01-contracts/context)（外部化记忆）直接对应。
