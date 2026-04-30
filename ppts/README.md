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
| 3 | MCP + SKILL | 2026-05-15 | 周一 | 程乐 | 45min | 具备开发 MCP 与 Skill 的能力，使 AI 能够对接内部系统，将工作流自动化 | 待完善初稿 |

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
- `04.practice.md` - **实战演练**：Vue3 组件生成 + nn-client-all Bug 调试
- `05.QA.md` - **问答**：模型变笨 / Prompt 竞争力 / Harness vs Vibe Coding / 代码安全

---

### 第三期：MCP + SKILL

**文件位置**: `./skill-mcp/` （原 `mcp` 和 `skill` 目录合并内容）

**核心目标**：具备开发 MCP 与 Skill 的能力，使 AI 能够对接内部系统，将工作流自动化。

**章节结构** (模式 B: 多子主题微结构):

- `01.overview.md` - **概述**：突破大模型的信息孤岛（只拥有训练数据和本地文件读取权限不够，需要连上”内网”长出”手脚”）。
- `02.1.mcp-core.md` - **MCP 核心**：架构、协议 (JSON-RPC 2.0)、三大件 (Tools/Resources/Prompts)、传输层、安全模型。
- `02.2.skill-core.md` - **Skill 核心**：本质演进、构建三要素 (边界/Schema/容错)、生态 (.cursorrules)。
- `03.integration.md` - **组合集成** (必选!): MCP + Skill 如何组合产生 1+1>2 效应。
- `04.practice.md` - **实战演练**：端到端综合实战。
- `05.QA.md` - **问答**：优缺点、折衷、进阶阅读。

**核心资料**

- [Model Context Protocol (MCP) 官方指南](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Agent Skills 最佳实践](https://agentskills.io/home) / [The Complete Guide to Building Skill for Claude.pdf](../_docs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)

**核心资料**

- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [MCP 官方文档](https://modelcontextprotocol.io)
- [Claude Code 官方文档与 Skill 扩展](https://code.claude.com/docs/en/overview)
- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) (了解工具调用背后的核心底座理念)
