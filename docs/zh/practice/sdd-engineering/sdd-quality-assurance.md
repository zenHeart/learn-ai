---
title: SDD 使用差别与质量保证机制深度剖析
description: 深入源码与 Skill 契约，拆解 Superpowers、OpenSpec、Spec Kit 与 mattpocock/skills 在需求对齐、Spec 演化、防上下文丢失、测试验证及代码审查五个环节如何保证工程质量。
domain: practice
tags:
  - sdd
  - quality-assurance
  - tdd
  - code-review
---

# SDD 使用差别与质量保证机制深度剖析

**结论先行（BLUF）**：SDD（Spec-Driven Development，规格驱动开发）能否真正提升代码质量，不取决于「有没有写 Markdown 文档」，而取决于**是否把「Agent 提示约束」与「CI / 受保护分支硬门禁」清晰分层**。四大框架分别攻克了质量防线上的不同环节，但没有任何一个 Skill 能单靠提示词替代运行时的自动化测试与分支保护。

## 先决条件

- 已阅读 [深度对比：Superpowers vs OpenSpec vs Spec Kit vs mattpocock/skills](./tools-comparison)，了解四者的基本定位。
- 本地已安装 Node.js / `pnpm` 与 Git，熟悉基础的 TDD 与命令行操作。

## 学习目标

读完本文，你将掌握：
1. 四大框架在 SDD 全生命周期（对齐 → 规格 → 实施 → 测试 → 审查）上的具体使用差别。
2. 它们如何通过各自机制缓解上下文丢失、测试自洽作弊、虚假完工与架构腐化。
3. 如何用一条贯穿「需求 ID → 红灯 → 绿灯 → CI 门禁」的证据链，避免把静态校验误当成行为正确性证明。

---

## 理论部分：AI 研发质量的五道防线

在 AI 高速产出的研发模式下，人工 Code Review 的吞吐量远低于代码生成速度。因此，现代 SDD 体系将质量保证前置并拆解为五道防线：

1. **需求对齐门禁**（防做错东西）
2. **Spec 契约与变更演化**（防存量行为被破坏）
3. **上下文隔离与状态持久化**（防长会话压缩丢失与遗忘）
4. **测试边界与验证门禁**（防虚假测试与谎报完工）
5. **独立审查与架构熵减**（防大泥球堆积）

> **关键认知边界**：Skill 中的规则属于**Agent 提示约束**（可被确认跳过或受模型遵循度影响）；只有写进受保护分支 CI 的命令与退出码检查，才是**不可绕过的工程硬门禁**。

---

## 一、需求对齐门禁：如何阻止 AI「猜着写代码」？

| 维度 | `obra/superpowers` | `Fission-AI/OpenSpec` | `github/spec-kit` | `mattpocock/skills` |
| --- | --- | --- | --- | --- |
| **入口机制** | `brainstorming`（引导前置触发） | `explore` → `propose` | `constitution` → `specify` → `clarify` | `/grill-me` / `/grill-with-docs` |
| **核心动作** | 先读关联代码再提问；回放理解（约 200 字）请人纠正；给出方案与权衡；设计签字后才进 `writing-plans` | 探索阶段澄清问题，随后生成 `proposal.md` 锁定 **Why / What Changes / Capabilities / Impact** | 先确立不可协商的项目宪法，再生成 `spec.md`，并用 `clarify` 消解模糊点 | 沿设计树逐分支访谈，直到未决分支清零（`/grill-me` 不落盘，`/grill-with-docs` 落盘） |
| **领域/原则沉淀** | 依赖对话与 Design Doc | `openspec list --specs` 强制复用已有 `capability-path`，避免重复造词 | 仓库级 **`.specify/memory/constitution.md`**，冲突在 `analyze` 中自动标为 CRITICAL | `/grill-with-docs` 同步更新仓库 **`GLOSSARY.md`**（支持多上下文词表）与 **ADR** |

---

## 二、Spec 形态与变更演化：一次性文档 vs 活的真源

### 1. OpenSpec 的 Artifact DAG 与 Delta Spec

在 `OpenSpec/schemas/spec-driven/schema.yaml` 中，默认工作流被建模为严格的 **Artifact DAG（产物有向无环图）**：

```text
proposal.md (Why & Capabilities)
   ├──▶ specs/<capability>/spec.md (Delta: ADDED / MODIFIED / REMOVED / RENAMED)
   └──▶ design.md (How: Decisions & Trade-offs)
          │
          ▼ (同时依赖 specs 与 design)
       tasks.md (Checklist: - [ ] X.Y) ──▶ apply ──▶ archive (合并回 openspec/specs/)
```

为了防止存量项目文档过时，OpenSpec 使用 **Delta Spec（增量规格）** 将「主规格真源（`openspec/specs/`）」与「在途变更（`openspec/changes/`）」隔离：
- **格式与解析器规则**：推荐使用 `### Requirement: <name>`（含 `SHALL`/`MUST`）与四级标题 `#### Scenario: <name>`（含 `- **WHEN**` / `- **THEN**`）。解析器也会计入其他带正文内容的四级标题，但若带 `Scenario:` 标签却缺少 `WHEN/GIVEN` 或 `THEN`，`openspec validate` 会报警告，而 `--strict` 会将警告视为失败。
- **诊断边界**：新增能力的 `## Purpose` 建议 ≥ 50 字符，主规格与 `ADDED` 中的单条需求描述建议 ≤ 500 字符；修改既有需求（`## MODIFIED Requirements`）时必须拷贝整块原需求与所有场景，**绝不能为凑字数而删减旧场景**。纯重构、工具或文档改动（不改变规格层行为）可在 `.openspec.yaml` 中声明 `skip_specs: true`。
- **CLI 校验 vs 归档边界**：`openspec validate <id> --type change --strict --no-interactive` 检查的是**结构合法性与部分合并冲突**，不能证明代码或测试正确。同样，`archive` 技能在人类确认后允许带未完成任务继续、甚至跳过规格同步；`verify`（需启用扩展工作流）会报告问题但不自动阻断归档。**真正的合并阻断必须由 CI 与分支保护承担**。

### 2. Superpowers、Spec Kit 与 mattpocock/skills 的 Spec 形态

- **`obra/superpowers`**：Spec 是服务于当前任务的 `Design Doc` + `writing-plans` 计划（按独立可测试、可审查的交付物拆分，给出签名、约束与验证命令）。任务结束后工作区清理，不维护长期系统规格库。
- **`github/spec-kit`**：采用「`.specify/memory/constitution.md` + 特性目录（`spec.md`、`plan.md`、`data-model.md`、`tasks.md`）」，并在编码前提供只读的 **`/speckit-analyze`**（人工/Agent 跨产物一致性审查，非确定性静态扫描器）以及 **`checklists/requirements.md`** 等领域检查清单（`implement` 遇到未勾选项时会询问用户是否继续）。
- **`mattpocock/skills`**：`/to-spec` 将对话合成为 Spec 发布到 Issue Tracker（内置 GitHub/GitLab 模板与本地 Markdown，支持按团队流程接入 Linear/Jira）。它允许记录模块接口与架构决策，但**禁止写入容易过时的具体文件路径与完整代码片段**（仅允许保留原型中高密度的状态机/Schema 决策片段），并强制要求写清 `Testing Decisions` 与 `Out of Scope`。

---

## 三、上下文隔离与状态持久化：如何防止长会话「失忆」？

长会话触发 **Compaction（上下文压缩）** 后，Agent 容易丢失早期状态。四者各自采用不同的持久化机制：

1. **`obra/superpowers`**：`subagent-driven-development/SKILL.md` 指出，对话记忆无法在上下文压缩后幸存，控制器一旦丢失进度就可能重复派发已完成的任务序列。因此它通过 `scripts/sdd-workspace` 创建隔离目录，由执行流程维护 `.superpowers/sdd/<plan>/progress.md` 磁盘账本，并记录 `Ruling: <决策> — <原因> — <误判代价>`；同时每个任务派发全新上下文窗口的 Implementer 子代理。
2. **`Fission-AI/OpenSpec`**：通过 `openspec list --specs` 与 `openspec show "<spec-id>" --type spec --json --no-scenarios` 实现**渐进式按需加载**，避免把无关 Spec 全量塞入上下文；`tasks.md` 严格约定仅 `- [x]`（不区分大小写）视为完成，中断后可准确续跑。
3. **`github/spec-kit`**：除依赖 `tasks.md` 与 `converge` 的追加阶段外，还提供独立于斜杠命令的 **`specify workflow resume`** 与磁盘检查点恢复机制，以及关键阶段后的人工审批停顿点。
4. **`mattpocock/skills`**：`/implement-spec` 要求子代理之间通过**稀疏上下文指针（Sparse Pointers）**通信（只传 Spec、Ticket、调研笔记与 Commit 引用，不重复粘贴正文）；超大跨度工程则用 `/wayfinder` 在 Issue Tracker 上维护可逐步消解的决策地图。

---

## 四、测试边界与验证门禁：从「提示约束」到「可检验的证据链」

四者在测试与验证上的侧重点各不相同：

| 工具 | 需求/规格侧检查 | 运行与测试侧验证机制 |
| --- | --- | --- |
| `obra/superpowers` | 任务级 Reviewer 核对 Spec 覆盖 | **`test-driven-development`**：先写实现再补测试则删除重写；要求红灯失败在**预期行为**（而非语法错误），强调真实行为而非 Mock。**`verification-before-completion`**：同条回复内无新鲜命令输出与退出码 `0` 禁止宣称完成。 |
| `Fission-AI/OpenSpec` | `openspec validate ... --strict --no-interactive` 结构与 Delta 校验 | 核心不绑定具体测试框架；可选扩展工作流中的 `verify` 用于核对实现与规格/任务的一致性。 |
| `github/spec-kit` | `analyze` 只读一致性审查 + `checklists/requirements.md`（未勾选时询问用户） | `tasks-template.md` 按需生成测试任务；`converge` 对照当前代码库与宪法找出 `missing / partial / contradicts / unrequested` 并只追加任务（**不直接修代码，也不替代自动化测试**）。 |
| `mattpocock/skills` | `code-review` 的 Spec 轴核对需求漏项与范围蔓延 | **`tdd`**：**Pre-agreed Seams（写测试前必须先让人类确认公共接口边界）**；禁止耦合内部实现、禁止水平切片，并明确反对用被测代码逻辑重算预期值的**同义反复测试（Tautological Tests）**。 |

> **最佳实践建议**：不要宣称单一 Skill 能「彻底防作弊」，而应构建一条**可检验的证据链**：
> `需求/场景 ID` → `独立预期值（来自 Spec 或人工构造字面量）` → `预期原因的红灯记录` → `绿灯与全量回归输出` → `同一 Commit SHA 上的 CI 门禁通过`。

---

## 五、代码审查与架构熵减：如何避免「大泥球」？

- **`obra/superpowers`**：在子代理模式中，**同一个任务 Reviewer** 在每个任务完成后同时审查 Spec Compliance 与 Code Quality（发现缺口或 Critical/Important 问题则进入修复循环，达到上限可带裁决挂起）；全部分支完成后再做一次整分支终审。
- **`mattpocock/skills`**：
  - **双轴并行 `code-review`**：同时启动两个互不污染的子代理——**Standards 轴**（仓库规范 + Martin Fowler 12 种 Code Smells 基线，如 Feature Envy、Shotgun Surgery、Speculative Generality）和 **Spec 轴**（漏项、Scope Creep、错误实现）。**刻意禁止合并或重排两条轴的结果**，避免「代码很整洁」掩盖「需求没做对」。
  - **架构巡检与环境复盘**：`improve-codebase-architecture` 依据 John Ousterhout《软件设计哲学》的**深模块（Deep Modules）**原则扫描仓库、生成 HTML 报告并与用户讨论深化候选；`retro` 在会话后提出导航、检查与规范改进建议（由人决定是否写入仓库，不自动改写规范）。

---

## 代码示例：可复现的 OpenSpec 正反校验演示

以下示例基于 `@fission-ai/openspec`（`Fission-AI/OpenSpec@f1cd852` 契约）构造，展示如何用确定性 CLI 拦截不合规的 Spec Delta，再通过合法结构（**注意：本例仅验证规格结构，业务行为仍需后端单测覆盖**）。

**1. 准备目录与变更骨架**：
```text
openspec/
  changes/
    export-audit-csv/
      proposal.md
      specs/
        audit-export/
          spec.md
```

**2. 反例（会触发 `--strict` 失败的 `spec.md`）**：
- 问题：`Purpose` 不足 50 字符，且 `Scenario:` 缺少 `THEN` 结果断言。
```markdown
# Spec Delta

## Purpose

Export audit logs.

## ADDED Requirements

### Requirement: Admin can export project audit logs as CSV
The system SHALL allow project administrators to export audit logs in CSV format.

#### Scenario: Missing outcome
- **WHEN** an administrator requests `/api/v1/projects/p1/audit-logs/export?from=2026-11-01`
```
执行校验（非交互模式明确指定变更 ID）：
```bash
openspec validate export-audit-csv --type change --strict --no-interactive
# 预期结果：退出码非 0（报 Purpose 过短及 Scenario 缺少 THEN 的错误/警告）
```

**3. 正例（修复后可通过 `--strict` 校验的 `spec.md`）**：
- `Purpose` 与需求描述均明确限定「仅项目管理员」及「项目租户与日期边界」：
```markdown
# Spec Delta

## Purpose

Allows project administrators to export their own project's audit logs in RFC 4180 CSV format for compliance review.

## ADDED Requirements

### Requirement: Project administrator can export scoped audit logs as CSV
The system SHALL allow authenticated project administrators to export audit logs strictly scoped to their own project from the requested UTC date inclusive in RFC 4180 CSV format.

#### Scenario: Successful export with inclusive UTC date filter
- **WHEN** an authenticated administrator of project `p1` requests `/api/v1/projects/p1/audit-logs/export?from=2026-11-01`
- **THEN** the system responds with HTTP 200, `Content-Type: text/csv`, and only `p1` records with timestamp >= `2026-11-01T00:00:00Z`

#### Scenario: Non-admin or cross-project member attempts export
- **WHEN** a non-admin member or user outside project `p1` requests `/api/v1/projects/p1/audit-logs/export`
- **THEN** the system responds with HTTP 403 and discloses no log records
```
再次执行校验：
```bash
openspec validate export-audit-csv --type change --strict --no-interactive
# 预期结果：退出码 0（结构校验通过；随后仍需针对上述两个 Scenario 编写集成测试并跑通 CI）
```

## 常见陷阱

- **陷阱 1：把 `openspec validate` 通过当成「功能已测通」**。静态校验只检查结构与合并冲突，不运行一行业务代码。
- **陷阱 2：在未提交变更时运行 `mattpocock/skills` 的 `code-review`**。该 Skill 默认使用 `git diff <fixed-point>...HEAD` 比对已提交历史，未暂存/未提交的本地修改不会被纳入审查；且若未找到 Spec，Spec 轴会直接跳过，**跳过不等于通过**。
- **陷阱 3：把 `Spec Kit` 的 `optional: false` Hook 当成服务端硬门禁**。模板在 `.specify/extensions.yml` 解析失败时会报错并继续；真正的强制拦截必须在 CI 中执行。

## 下一步

理解了质量机制的边界与校验方法后，请继续阅读 [企业代码开发最佳实践与落地蓝图](./enterprise-best-practices)，获取按风险分级与可运行单仓试点流水线。
