# AI Coding 演讲目录

## 背景

会话旨在帮助团队理解并实践如何在日常开发中有效使用 AI 工具，提升工程效率，并建立稳定的 AI 辅助开发工作流。

### 演讲 对象

- 公司内部研发涉及
  - 前端/后端
  - Android/iOS
  - C++
- 产品/测试（可旁听）

### 演讲安排

| 序号 | 主题 | 日期 | 星期 | 讲师 | 预计时长 |核心目标 | 状态 |
|---|---|---|---|---|----|---|---|
| 1 | Vibe Coding | 2026-04-01 | 周三 | 程乐 | 45min | 掌握 AI 辅助编程基本方法，能够利用 AI 完成常见开发任务。 | 待分享 |
| 2 | Prompt + Context + Harness | 2026-05-08 | 周一 | 程乐 | 45min | 掌握三层工程协同方法，构建稳定可复用的 AI 工作流。 | 待完善初稿 |
| 3 | 从提效到复利：AI Agent 工作模式 | — | — | 程乐 | — | 范式迁移 + 工作流沉淀 + nn-ai 放大个人与组织效能 | 迭代中 |
| 4 | MCP + Skill | — | — | 程乐 | 45min | 协议与实现：让 AI 长出手脚、形成肌肉记忆 | 迭代中 |
| 5 | Agent | — | — | 程乐 | — | Agent Loop / 框架与编排边界 | 迭代中 |

## 各系列详情

### 第一期：Vibe Coding（启蒙与破冰）

**文件位置**: `./vibe-coding/`

**核心目标**：统一全员 AI 认知，掌握 AI 辅助编程核心理念与核心链路。

**章节结构**:

- `01.overview.md` - Vibe Coding 概述
- `02.principle.md` - 核心原理（解释为何不是简单的对话）
- `03.features.md` - 功能特性（解析 Cursor/Claude Code 等工具杀手锏）
- `04.practice.md` - 实战演练（快速破冰体验）
- `05.QA.md` - 问答

---

### 第二期：Prompt + Context + Harness（三层工程）

**文件位置**: `./prompt-context/`

**核心目标**：掌握 Prompt · Context · Harness 三层工程协同方法，构建可持续演化的 AI 工作流。

**章节结构**（Pattern B：三主题强制收敛）:

- `01.overview.md` - **概述**：为什么懂了 Vibe Coding 还不够？（遗忘、幻觉、无序的根因）
- `02.1.prompt-engineering.md` - **Prompt 层**：Zero-Shot → Few-Shot (Brown et al. 2020) → CoT (Wei et al. 2022) + ICIO 框架
- `02.2.context-engineering.md` - **Context 层**：首尾定律（Liu et al. 2023）+ 精准投喂 + RAG vs 长上下文决策树
- `02.3.harness-engineering.md` - **Harness 层**：Tool + Memory + Loop 三件套 + Ralph Loop + 仓库即记录系统
- `03.integration.md` - **三层协同**：化学反应公式 + 三层各层检查清单（强制收敛）
- `04.practice.md` - **实战演练**：写邮件 · 分析问题（通用场景）
- `05.QA.md` - **问答**：模型变笨 / Prompt 竞争力 / Harness vs Vibe Coding / 代码安全

---

### 第三期：从提效到复利：AI Agent 工作模式

**文件位置**: `./ai-native-work/`

**核心目标**：理解 Agent 时代工作范式迁移；掌握工作流识别与沉淀；用 nn-ai 放大个人与组织效能。

**章节结构**（理念 → 方法 → 实操）:

- `01.overview.md` - **概述**：目标（对齐 vibe-coding）、报销引子、与前两期衔接
- `02.1.paradigm.md` - **理念**：成本变化、分工、适应原则
- `02.2.capability-workflow.md` - **方法**：能力面、工作流形态、识别四问
- `03.playbook.md` - **资产**：飞轮、Skill 四步、nn-ai 地图
- `04.practice.md` - **实操**：报销沉淀 + 研发闭环 + 本周行动
- `05.QA.md` - **总结与 QA**

### 第四期：MCP + Skill

**文件位置**: `./skill-mcp/`

**核心目标**：把第三期工作流里的 Skill / MCP 讲透——怎么用、怎么造。

**章节结构**:

- `01.overview.md` - 五期承接 · 资产全景
- `02.principle.md` - Skill / MCP 核心原理
- `03.workflow.md` - 研发工作流 × 资产
- `04.build.md` - 如何开发
- `05.practice.md` - 从 0 实战
- `06.QA.md` - 问答
- `07.appendix.md` - 官方规范入口

---

### 第五期：Agent

**文件位置**: `./agent/`

**核心目标**：Agent Loop、框架与编排边界。

**章节结构**:

- `01.overview.md` - Agent 概述
- `02.principle.md` - 核心原理（Agent Loop）
- `03.features.md` - 框架与能力
- `04.practice.md` - 实战
- `05.QA.md` - 问答

---

**核心资料**

- [Model Context Protocol (MCP) 官方指南](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Agent Skills 最佳实践](https://agentskills.io/home)
- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents)
- 公司 nn-ai / `@nn/ai-kit` 文档
