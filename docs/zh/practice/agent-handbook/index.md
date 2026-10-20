---
title: 企业 Agent 工程实践卡（阿里云 AI Agent Handbook）
description: 从阿里云《AI Agent Handbook》提炼的可执行实践卡：构建、运行、调优与研发效能案例，标注可复现做法与厂商主张，并给出一人/小团队的降级做法。
---

# 企业 Agent 工程实践卡

来源：[aliyun/ai-agent-handbook](https://github.com/aliyun/ai-agent-handbook)。每张卡包含问题、做法、前置条件、适用边界、失败模式、可验证指标、原文短引用与降级做法，并区分「可复现」与「阿里云主张」。

| 篇章 | 覆盖章节 | 适合谁先读 |
| --- | --- | --- |
| [构建：Harness、任务、信息与行动](./build) | 第 3–6 章 | 正在搭 Agent 编排与上下文的工程师 |
| [运行：异步任务、沙箱、状态、协作与网关](./run) | 第 7–12 章 | 要把 Agent 跑进生产的技术负责人 |
| [调优：轨迹数据、黄金集、Badcase 与受控自进化](./optimization) | 第 17–24 章 | 负责效果评估与持续优化的团队 |
| [案例：领域专用 Code Review Agent](./case-code-review) | 第 25 章 Kitta | 想把 AI 代码审查落到团队流程的研发 |
| [案例：补丁与迁移交付闭环](./case-patch-delivery) | 第 25 章 PatchPilot / ABACI | 内核或大型仓库的补丁、迁移类任务 |
| [案例：从报警到自动修复的 Loop 工程](./case-loop-auto-repair) | 第 25 章 PolarDB-X | 运维与可靠性团队 |
| [案例：人机协作端到端交付流水线](./case-human-ai-pipeline) | 第 25 章 云通信 | 想把编码提效延伸到交付的团队 |
| [案例：评测驱动与受控自主](./case-eval-driven) | 第 25 章 安全产品研发 | 需要评测门禁的 Agent 研发团队 |
