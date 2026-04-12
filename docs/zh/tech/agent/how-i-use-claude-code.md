# How I Use Claude Code

> 原文: https://boristane.com/blog/how-i-use-claude-code/

## 概述

作者 Boris Trompad 使用 Claude Code 作为主要开发工具约 9 个月，形成了一套与大多数 AI 编程工具使用者截然不同的工作流。

**核心原则**: 在你审查并批准书面计划之前，永远不要让 Claude 写代码。这种"计划与执行分离"是整个工作流中最重要的原则。

## 整体工作流

```
Research → Plan → Annotate (循环 1-6 次) → Todo List → Implement → Feedback & Iterate
```

## Phase 1: Research（研究阶段）

每个有意义的任务都从深度阅读指令开始。让 Claude 在做任何事情之前彻底理解代码库的相关部分，并且要求将发现写入持久化的 markdown 文件，而非仅在对话中口头总结。

### 典型指令示例

```
read this folder in depth, understand how it works deeply, what it does and all its specificities. when that's done, write a detailed report of your learnings and findings in research.md

study the notification system in great details, understand the intricacies of it and write a detailed research.md document with everything there is to know about how notifications work

go through the task scheduling flow, understand it deeply and look for potential bugs. there definitely are bugs in the system as it sometimes runs tasks that should have been cancelled. keep researching the flow until you find all the bugs, don't stop until all the bugs are found. when you're done, write a detailed report of your findings in research.md
```

### 关键技巧

注意 "deeply"、"in great details"、"intricacies"、"go through everything" 这些词。没有这些词，Claude 会泛读——读一个文件、看到函数签名级别的说明就跳过。你需要明确传递"不接受浅层阅读"的信号。

### 为什么 artifact（research.md）很关键

这不是让 Claude 做作业，而是**作者的审查面（review surface）**。可以阅读验证 Claude 是否真正理解了系统，在任何规划发生之前纠正误解。如果研究错了，计划就会错，实现就会错。**Garbage in, garbage out。**

这是 AI 辅助编程中最昂贵的失败模式，不是语法错误或逻辑错误，而是孤立工作但在周围系统中造成破坏的实现。

## Phase 2: Planning（规划阶段）

研究被审查后，再请求详细的实施计划，写入单独的 markdown 文件。

### 典型指令示例

```
I want to build a new feature <name and description> that extends the system to perform <business outcome>. write a detailed plan.md document outlining how to implement this. include code snippets

the list endpoint should support cursor-based pagination instead of offset. write a detailed plan.md for how to achieve this. read source files before suggesting changes, base the plan on the actual codebase
```

生成的计划总是包括：
- 方法的详细解释
- 显示实际更改的代码片段
- 将被修改的文件路径
- 考虑因素和权衡

### 使用自己的 .md 计划文件而非 Claude Code 内置的 plan mode

内置 plan mode 不够好。Markdown 文件给你完全控制权，可以在编辑器中编辑、添加内联注释，并作为真实 artifact 持久化在项目中。

### 实用技巧

对于范围明确的 feature，如果在开源仓库中见过好的实现，会把那段代码作为参考一起分享：
```
this is how they do sortable IDs, write a plan.md explaining how we can adopt a similar approach.
```
Claude 有具体参考实现时工作效果显著更好。

## The Annotation Cycle（注释循环）

这是工作流中最独特的部分，也是添加最多价值的部分。

```
Claude 写 plan.md → 在编辑器中审查 → 添加内联注释 → 发回给 Claude → Claude 更新计划
循环直到满意 → 请求 Todo List
```

### 如何注释

打开 Claude 写的计划文档，直接在内联添加注释。注释纠正错误假设、拒绝方案、添加约束或提供 Claude 没有的领域知识。

### 真实注释示例

- `"use drizzle:generate for migrations, not raw SQL"` — Claude 没有的领域知识
- `"no — this should be a PATCH, not a PUT"` — 纠正错误假设
- `"remove this section entirely, we don't need caching here"` — 拒绝提议的方案
- `"the queue consumer already handles retries, so this retry logic is redundant. remove it and just let it fail"` — 解释为什么应该改动
- `"this is wrong, the visibility field needs to be on the list itself, not on individual items"` — 重定向整个计划部分

### 关键指令

```
I added a few notes to the document, address all the notes and update the document accordingly. don't implement yet
```

这个循环重复 1-6 次。明确的 "don't implement yet" 是必不可少的——没有它，Claude 会认为计划够好时就跳到写代码。

### 为什么注释循环效果这么好

Markdown 文件充当你和 Claude 之间的**共享可变状态**。可以按自己的节奏思考、准确标注问题所在、重新投入而不丢失上下文。不需要试图在聊天消息中解释一切——只需指向文档中问题的确切位置并在那里写上修正。

## The Todo List（任务清单）

在实施开始前，总是请求细粒度的任务分解：

```
add a detailed todo list to the plan, with all the phases and individual tasks necessary to complete the plan - don't implement yet
```

这创建了一个清单，在实施过程中作为进度追踪器。Claude 逐项标记为完成，随时可以看计划文件了解进度。

## Phase 3: Implementation（实施阶段）

计划就绪后，发出实施命令：

```
implement it all. when you're done with a task or phase, mark it as completed in the plan document. do not stop until all tasks and phases are completed. do not add unnecessary comments or jsdocs, do not use any or unknown types. continuously run typecheck to make sure you're not introducing new issues.
```

这个单一 prompt 编码了所有重要事项：

| 指令 | 含义 |
|------|------|
| `implement it all` | 执行计划中的一切，不要挑着做 |
| `mark it as completed in the plan document` | 计划是进度的真实来源 |
| `do not stop until all tasks and phases are completed` | 不要在流程中间暂停等确认 |
| `do not add unnecessary comments or jsdocs` | 保持代码整洁 |
| `do not use any or unknown types` | 保持严格类型 |
| `continuously run typecheck` | 及早发现问题，不要等到最后 |

当说 "implement it all" 时，所有决策都已做出并验证过。实施变成机械的而非创造性的。**实施应该是无聊的。创造性工作发生在注释循环中。**

## 实施过程中的反馈

Claude 执行计划时，角色从架构师转为监督者。Prompt 变得简短得多。

规划阶段的注释可能是一段，实施阶段的修正通常只是一句话：
- `"You didn't implement the deduplicateByTitle function."`
- `"You built the settings page in the main app when it should be in the admin app, move it."`

### 前端工作的特殊性

前端工作迭代最多。在浏览器中测试，然后快速修正：
- `"wider"`
- `"still cropped"`
- `"there's a 2px gap"`

对于视觉问题，有时附上截图。截图比描述更快传达问题。

### 参考现有代码

```
this table should look exactly like the users table, same header, same pagination, same row density.
```

指向参考比从头描述设计精确得多。大多数成熟代码库中的 feature 都是现有模式的变体。

### 回退和重新 scoping

当某事走向错误方向时，不试图打补丁，而是回退：
```
I reverted everything. Now all I want is to make the list view more minimal — nothing else.
```

回退后缩小范围几乎总是比逐步修复糟糕的方案产生更好的结果。

## 保持主动控制

即使把实施委托给 Claude，也从不给它对构建内容的完全自主权。绝大多数主动 steering 在 plan.md 文档中完成。

### 对提案的评估

```
Claude 提议变更 → 逐项评估
- 接受原样
- 修改方法
- 跳过/删除
- 覆盖技术选择
```

**Cherry-picking 提案**: "第一个用 Promise.all，不要过度复杂；第三个提取为独立函数；忽略第四和第五个，它们不值得那么复杂。"

**修剪范围**: 当计划包含 nice-to-have 时，主动削减。

**保护现有接口**: "这三个函数的签名不应该变，调用者应该适应，不是库。"

**覆盖技术选择**: "用这个模型而不是那个。"

## Single Long Sessions（单一长会话）

研究、规划和实施都在一个单一长会话中运行，而非分成多个会话。一个会话可能从深度阅读文件夹开始，经历三轮计划注释，然后运行完整实施，全部在一个连续对话中。

在 50% 上下文窗口后没有看到大家谈论的性能下降。实际上，当说 "implement it all" 时，Claude 已经花了整个会话来构建理解。

当上下文窗口满了，Claude 的自动压缩维持足够上下文继续运行。而计划文档作为持久化 artifact 以完整保真度存活。

## 一句话总结

> Read deeply, write a plan, annotate the plan until it's right, then let Claude execute the whole thing without stopping, checking types along the way.

没有魔法 prompt，没有复杂的系统指令，没有花哨的 hack。只有一条纪律严明的管道，把思考和打字分开。

## 补充资源

- [Nominal.dev](https://nominal.dev) — 作者正在做的项目
