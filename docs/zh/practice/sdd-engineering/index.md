---
title: SDD 与 AI 代码开发最佳实践（专题导读）
description: 深度拆解 obra/superpowers、Fission-AI/OpenSpec、github/spec-kit 与 mattpocock/skills 四大主流 AI 工程框架，对比 Spec-Driven Development（SDD）机制差异、质量保证体系与企业研发落地蓝图。
domain: practice
tags:
  - sdd
  - engineering
  - best-practices
---

# SDD 与 AI 代码开发最佳实践（专题导读）

**结论先行（BLUF）**：AI 编码进入深水区后，团队瓶颈已从「代码写得不够快」转向「需求对齐失真、长会话上下文丢失与架构熵增」。单一工具无法覆盖所有工程环节——**`obra/superpowers` 擅长强制执行纪律，`Fission-AI/OpenSpec` 擅长维护持久化增量契约，`github/spec-kit` 擅长宪法驱动的组织级 SDD 治理，`mattpocock/skills` 擅长人类主导的架构深度与轻量组合**。企业落地的可行路径，是将四者沉淀为分层、可验证的 **SDD（Spec-Driven Development，规格驱动开发）+ Harness Engineering（确定性工程护栏）**。

> **定位说明**：本页为专题导读与选型导航；各篇的先决条件、理论拆解、可运行示例与常见陷阱详见下表对应正文。

## 为什么 Vibe Coding 会在企业场景撞墙？

> **Vibe Coding（氛围编程）**：指开发者仅通过自然语言对话让 AI 直接生成代码，跳过前置规格定义、测试契约与架构审查的开发方式。

在原型验证或个人脚本阶段，Vibe Coding 能明显缩短编码时间；但在多人协作、长期演进的企业级存量代码库（Brownfield）中，它会触发四类系统性故障：

1. **需求对齐失真（Misalignment）**：AI 倾向于「猜测并直接开工」，用默认假设填补模糊需求，导致交付物偏离真实业务意图。
2. **上下文压缩丢失（Compaction Loss）**：长会话经过多轮上下文压缩（Compaction，对早期对话做摘要裁剪）后，AI 容易遗忘早期约定、重复执行已完成任务，甚至推翻既有架构决策。
3. **测试失效与虚假完工（Tautological Tests & Fake Claims）**：缺少外部真源约束时，AI 容易写出「按实现逻辑反推预期值」的同义反复测试，或在未运行完整验证命令的情况下声称「已修复」。
4. **架构熵增（Software Entropy）**：AI 生成代码的速度远超人类评审吞吐量，若缺乏模块边界（Seam，公共测试与交互接缝）与代码坏味道约束，代码库会迅速退化为高耦合、难修改的泥潭。

## 目标与非目标（Goals & Non-Goals）

- **本专题的目标**：
  - 基于 `obra/superpowers`、`Fission-AI/OpenSpec`、`github/spec-kit`、`mattpocock/skills` 源码与 Skill/模板定义，还原四者真实的工作流与质量门禁边界。
  - 深入对比四者在 SDD 落地形态、防上下文丢失、测试边界控制与代码审查上的本质差异。
  - 给出一套区分「Agent 提示约束」与「CI/分支硬门禁」的企业级研发最佳实践与分层落地路线图。
- **本专题的非目标**：
  - **不是**某个 IDE 或 CLI 工具的安装入门手册（工具使用请查阅 [产品](/zh/products/)）。
  - **不是** Prompt 编写技巧大全（提示词工程请查阅 [Prompt](/zh/tech/prompt/)）。
  - **不推荐**盲目照搬单一框架的全部重型流程；所有规则必须服务于可验证的交付质量。

## 专题阅读导航

| 篇章 | 核心议题 | 适合谁先读 |
| --- | --- | --- |
| [深度对比：Superpowers vs OpenSpec vs Spec Kit vs mattpocock/skills](./tools-comparison) | 四大框架的设计哲学、触发机制、Spec 形态与核心能力全景对比 | 正在为团队做 AI 研发工作流选型的架构师 / Tech Lead |
| [SDD 使用差别与质量保证机制](./sdd-quality-assurance) | 拆解需求门禁、Delta Spec（增量规格）、宪法与收敛门禁、TDD 边界与双轴审查的底层机制 | 负责工程质量、测试规范与 Code Review 体系的研发骨干 |
| [企业代码开发最佳实践与落地蓝图](./enterprise-best-practices) | 提炼 6 大工程支柱、按风险与协作形态分层的落地路线与可运行单仓试点流水线 | 准备在公司或业务线全面推行 AI 规范化研发的负责人 |

## 一句话选型速查

| 你的核心痛点 | 首选借鉴框架 | 核心抓手 |
| --- | --- | --- |
| Agent 总是跳过思考直接写代码、测试走过场、谎报完成 | `obra/superpowers` | 行为铁律（Iron Laws）+ 独立子代理 + 磁盘账本 `progress.md` + 完工前新鲜验证门禁 |
| 存量项目（Brownfield）多人协作，文档与代码脱节，跨仓对齐难 | `Fission-AI/OpenSpec` | Delta Spec（`ADDED/MODIFIED/REMOVED`）+ `openspec validate --strict` + 跨仓 Stores（beta） |
| 大型组织需要统一合规/架构红线、离线私有源与多阶段收敛检查 | `github/spec-kit` | `.specify/memory/constitution.md`（最高宪法）+ `analyze` + `converge` + Preset/Catalog |
| 流程太重会卡死研发节奏，希望保留开发者控制权与高内聚架构 | `mattpocock/skills` | `/grill-with-docs` 建 `GLOSSARY.md`/ADR + 垂直切片任务图 + 双轴并行 `code-review` |

## 下一步

如果你需要从零评估四大工具的架构差异，请直接进入 [深度对比：Superpowers vs OpenSpec vs Spec Kit vs mattpocock/skills](./tools-comparison)。
