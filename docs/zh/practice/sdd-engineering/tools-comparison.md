---
title: 深度对比：Superpowers vs OpenSpec vs Spec Kit vs mattpocock/skills
description: 基于源码与 Skill 契约，全景对比 obra/superpowers、Fission-AI/OpenSpec、github/spec-kit 与 mattpocock/skills 的设计哲学、SDD 工作流、触发机制与适用边界。
domain: practice
tags:
  - sdd
  - superpowers
  - openspec
  - spec-kit
  - mattpocock-skills
---

# 深度对比：Superpowers vs OpenSpec vs Spec Kit vs mattpocock/skills

**结论先行（BLUF）**：四者虽然都以「规格 + Skill/指令」为载体、试图解决 AI 编程失控问题，但本质上处于四个不同的抽象层级——**`obra/superpowers` 是「Agent 行为操作系统」，`Fission-AI/OpenSpec` 是「增量规格契约编译器与真源库」，`github/spec-kit` 是「宪法治理的组织级 SDD 平台」，`mattpocock/skills` 是「资深工程师的战术工具箱」**。

## 受众与非目标

- **写给谁看**：正在为研发团队做 AI 编码工作流选型的架构师、Tech Lead 与工程效能负责人。
- **非目标**：本文不比较模型本身的代码生成智商，也不替代各工具的官方安装文档。

## 先决条件

- 了解基本的 AI Coding Agent（如 Claude Code、Codex CLI、Cursor、Antigravity 等）工作方式。
- 熟悉 Git 分支、Worktree 与基础自动化测试概念。

## 学习目标

读完本文，你将能够：
1. 准确区分四大框架在「流程控制权」与「Spec 生命周期」上的根本分歧。
2. 理解四者如何通过不同机制（`SessionStart` 引导、CLI Schema、宪法与扩展 Hook、显式/隐式 Skill 分层）驱动 Agent。
3. 通过同一业务需求的产物对比，做出符合团队现状的理性选型。

---

## 理论部分：四大框架的底层设计哲学

### 1. `obra/superpowers`：强制行为纪律的自动化流水线

`obra/superpowers`（由 Jesse Vincent 创建）的核心假设是：**Agent 天生倾向于走捷径，必须通过前置引导与行为铁律（Iron Laws）将其约束在工程规范内**。

- **定位**：完整的软件开发方法论（Methodology），通过 `SessionStart` Hook 或插件扩展向会话注入 `using-superpowers` 引导指令，促使 Agent 在处理非平凡任务时优先触发对应 Skill（而非用硬编码程序化状态机锁死运行时）。
- **核心流转**：`brainstorming`（设计对齐；对「把图标改成矢车菊蓝」这类完全明确的简单任务允许直接执行）→ `using-git-worktrees`（隔离工作区）→ `writing-plans`（按独立可测试、可审查的交付物拆分任务；通常给出签名、约束与验证命令，不预写完整函数体）→ `subagent-driven-development` / `executing-plans` → `test-driven-development`（红绿重构）→ `requesting-code-review` → `verification-before-completion`（证据门禁）→ `finishing-a-development-branch`。
- **典型特征**：**Agent 主导连续推进**。在 `subagent-driven-development` 中，明确要求「Rulings, not stalls（裁决而非停滞）」，遇到非破坏性歧义时由主控 Agent 做出裁决并记入账本继续推进，避免频繁打断人类。

### 2. `Fission-AI/OpenSpec`：面向存量项目的增量契约引擎

`Fission-AI/OpenSpec` 的哲学非常明确：**`fluid not rigid`（流畅而非僵化）、`iterative not waterfall`（迭代而非瀑布）、`built for brownfield not just greenfield`（专为存量项目而非仅新建项目打造）**。

- **定位**：轻量级 SDD 命令行工具（`@fission-ai/openspec`）+ 跨平台 Skill 集。它不试图接管 Agent 的编码手艺（例如不强制 TDD），而是专注于**管理「系统当前真实行为」与「本次变更增量（Delta）」之间的一致性**。
- **核心流转与 Profile**：
  - 默认 `core` Profile 包含 `propose / explore / apply / update / sync / archive`；其中 `verify`、`bulk-archive` 等命令需启用扩展工作流后才可用。
  - **宿主调用语法因工具而异**（非终端命令）：例如在 Claude Code 中为 `/opsx:propose`，在 Cursor 中为 `/opsx-propose`，在 Codex 中为 `$openspec-propose`。
- **典型特征**：**确定性 CLI 结构校验与持久化真源**。所有规格文件采用可读的 Markdown + `SHALL/MUST` + `#### Scenario`（WHEN/THEN）格式，由 TypeScript + Zod 编写的 `openspec validate <id> --type change --strict --no-interactive` 进行结构化静态校验，并通过 **Stores（beta）** 为多仓团队提供只读上游规格上下文。

### 3. `github/spec-kit`：宪法治理与可扩展的组织级 SDD 平台

`github/spec-kit`（由 GitHub 官方维护，配套 `specify-cli`）代表了**组织级合规与平台化 SDD 思路**。除核心 SDD 流程外，它还随仓提供需显式安装的 **`bug`（Bug 修复）** 与 **`assess`（想法评估）** 扩展（`specify extension add bug` / `assess`），并支持企业通过 **Preset / Extension / Workflow / Bundle / 私有 Catalog（含离线气隙环境）** 进行深度定制。

- **定位**：可组装的 SDD 工具链与组织级治理框架（Python 3.11+ / `uv`）。
- **核心流转**：`/speckit-constitution`（或按宿主语法 `/speckit.*`、`$speckit-*`，确立仓库级 `.specify/memory/constitution.md`）→ `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-checklist` → `/speckit-tasks` → `/speckit-analyze`（只读跨产物一致性分析）→ `/speckit-implement` → `/speckit-converge`（只追加任务直至收敛）。
- **典型特征**：**宪法权威（Constitution Authority）与独立恢复**。`.specify/memory/constitution.md` 被定义为不可协商的最高原则，与它冲突会被 `analyze` 自动标为 CRITICAL；特性目录通过 `SPECIFY_FEATURE_DIRECTORY` 或 `.specify/feature.json` 定位（与 Git 分支 Hook 解耦）；此外还提供独立于斜杠命令的 `specify workflow resume` 与磁盘检查点恢复能力。

### 4. `mattpocock/skills`：以人为本的可组合工程原语

`mattpocock/skills`（副标题 *Skills for Real Engineers*）在 README 中直接批评了接管全流程的框架：**"while doing so, they take away your control and make bugs in the process hard to resolve"**。

- **定位**：小而美、可自由裁剪和组合的工程原语库，强调**人类工程师始终掌握架构与设计控制权**。
- **核心架构**：区分 **User-invoked（用户显式调用，负责编排）** 与 **Model-invoked（模型可隐式触发、也可由用户显式调用，承载工程纪律）** 两类技能。
- **典型特征**：**深度关注软件设计本身**。引入了《领域驱动设计》通用语言（`GLOSSARY.md` 与 ADR，由 `/grill-with-docs` 落盘，支持多上下文词表）、John Ousterhout 的深模块理论（`codebase-design`、`improve-codebase-architecture`）、示踪弹垂直切片（`to-tickets`）以及 Issue Tracker 集成（内置 GitHub/GitLab 模板与本地 Markdown，支持按团队流程接入 Linear/Jira）。

---

## 全景维度对比矩阵

| 对比维度 | `obra/superpowers` | `Fission-AI/OpenSpec` | `github/spec-kit` | `mattpocock/skills` |
| --- | --- | --- | --- | --- |
| **核心隐喻** | Agent 行为操作系统 | 增量规格契约编译器与真源库 | 宪法治理的 SDD 工具链平台 | 工程师战术工具箱 |
| **流程控制权** | **提示与纪律强引导**：`SessionStart` 注入引导，Agent 按约定流转 | **契约图驱动**：Artifact DAG 约束产物依赖，人工触发斜杠命令 | **宪法与阶段命令驱动**：支持 `.specify/extensions.yml` Hook | **人类强掌控**：按需显式调用 `/grill-me`、`/to-spec` 等原语 |
| **触发机制** | `SessionStart` Hook / 插件注入 `using-superpowers` | CLI 生成各宿主命令（如 `/opsx:propose`、`$openspec-propose`） | `specify init` 生成 `/speckit-*` / `$speckit-*` 命令与脚本 | 区分 User-invoked（编排）与 Model-invoked（纪律原语） |
| **Spec 形态** | 对话产出的 `Design Doc` + `writing-plans` 任务计划 | `openspec/changes/<id>/` 下的 `proposal.md` + `specs/`（Delta）+ `design.md` + `tasks.md` | `.specify/memory/constitution.md` + 特性目录 `spec.md` / `plan.md` / `tasks.md` | `to-spec` 发布到 Issue Tracker（含 User Stories、Seam、模块接口决策） |
| **Spec 生命周期** | 随任务结束清理工作区，不维护长期系统规格库 | **完整闭环**：`propose` → `apply` → `archive`（Delta 合并入 `openspec/specs/`） | **写前分析 + 写后收敛**：`analyze` → `implement` ↔ `converge` | 沉淀在 Issue Tracker + 仓库 `GLOSSARY.md` 与 `ADRs` |
| **任务拆解粒度** | 按独立可测试、可审查的交付物拆分（含签名、约束、验证命令） | 按模块分组的 `- [ ] X.Y` 复选框，要求每组自包含测试与文档 | 按阶段组织的 `tasks.md`，`converge` 在底部追加 `## Phase N: Convergence` | **示踪弹垂直切片（Tracer-bullet）**：每个 Ticket 贯穿全栈且可独立验证 |
| **并发与隔离** | `using-git-worktrees` + `subagent-driven-development`（串行任务队列 + 独立子代理） | 独立 Change 目录隔离并发变更（`bulk-archive` 需启用扩展流） | 通过 `SPECIFY_FEATURE_DIRECTORY` / `.specify/feature.json` 隔离特性目录 | `implement-spec` 基于任务依赖图（DAG）对 **Ready Frontier** 并发派发 Worktree 子代理 |
| **跨仓与存量适配** | 偏单仓会话级执行 | **强**：专为 Brownfield 设计，`--json --no-scenarios` 省 Token；**Stores（beta）**提供只读跨仓上下文 | 通过 **Preset / Bundle / Private Catalog** 适配组织级规范与离线环境 | 依赖 `setup-matt-pocock-skills` 绑定 Issue Tracker，跨仓靠 Tracker 协调 |
| **质量校验手段** | 行为铁律（TDD、完工证据门禁）+ 单任务 Reviewer 查 Spec 与质量 | **确定性 CLI 结构校验**（`openspec validate --strict`）+ 可选 `verify` | `analyze` 只读一致性审查 + `converge` 现状补漏 + `checklist` + 扩展 Hook | 预确认测试边界（Seam）+ 双轴并行 `code-review` + `improve-codebase-architecture` |

---

## 可运行示例：同一需求在四者中的产物与校验对比

假设需求为：**「允许管理员按起始日期导出项目审计日志为 CSV」**。四者产出的核心工件差异如下：

| 框架 | 核心产物路径 / 形态 | 关键检查点 / 可复现校验命令 |
| --- | --- | --- |
| `superpowers` | 对话确认的 Design Doc + `writing-plans` 任务列表（每步含测试命令与预期输出） | 执行 `tdd` 看红灯，完工前运行测试与构建命令并核对退出码 `0` |
| `OpenSpec` | `openspec/changes/export-audit-csv/` 下的 `proposal.md`、`specs/audit-export/spec.md`、`design.md`、`tasks.md` | `openspec validate export-audit-csv --type change --strict --no-interactive`（结构/格式门禁） |
| `spec-kit` | `.specify/memory/constitution.md` + 特性目录下的 `spec.md`、`plan.md`、`tasks.md` | 运行 `/speckit-analyze`（只读查矛盾）与 `/speckit-converge`（补齐未实现任务） |
| `mattpocock/skills` | `GLOSSARY.md`（定义 `AuditLog`）+ Tracker Spec（锁定 HTTP 边界 Seam）+ 垂直切片 Ticket | 在预确认 Seam 写垂直切片测试；提交后运行双轴 `code-review` |

---

## 实际用例与适用边界

- **优先选 `obra/superpowers`**：团队成员对 AI 工程纪律不熟练，Agent 常跳过测试直接改代码或谎报完成。**边界**：多子代理与逐步审查消耗较高 Token，对简单一次性改色/文案属于过度设计。
- **优先选 `Fission-AI/OpenSpec`**：多人协作的存量项目（Brownfield），需要防止并发需求改乱系统既有行为。**边界**：它管住「系统行为契约」，不约束代码内部模块深浅与单测写法。
- **优先选 `github/spec-kit`**：强合规、离线/私有化（Air-gapped）或大中型组织，需要统一 `.specify/memory/constitution.md` 与可编排工作流引擎。**边界**：多阶段命令链较重，且缺少 OpenSpec 的 Delta 自动合并归档模型。
- **优先选 `mattpocock/skills`**：资深工程师或已有成熟 Issue Tracker 的团队，最关注领域语言、测试 Seam 与长期架构熵减。**边界**：高度依赖使用者的工程判断力，缺少独立的静态 Schema 校验 CLI。

## 常见陷阱

- **陷阱 1：把四个工具当成互斥的「四选一」**。它们分别覆盖「行为纪律 / 规格真源 / 组织宪法 / 架构设计」，完全可以按需组合。
- **陷阱 2：把宿主斜杠命令当成终端 CLI 命令**。`/opsx:propose`、`/speckit-specify`、`/grill-me` 均是在 Agent 对话框中调用的 Skill/Command，只有 `openspec validate`、`specify init` 才是终端命令。
- **陷阱 3：只装 Skill 文件而不配置仓库上下文**。不建 `.specify/memory/constitution.md`、`GLOSSARY.md` 或不跑 `/setup-matt-pocock-skills`，会让审查与规格工具失去锚点。

## 下一步

选型只是第一步，真正决定 AI 产出下限的是「质量如何被系统性核验」。请继续阅读 [SDD 使用差别与质量保证机制](./sdd-quality-assurance)。
