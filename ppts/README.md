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
| 1 | Vibe Coding | 2026-03-16 | 周一 | 程乐 | 45min | 掌握 AI 辅助编程基本方法，能够利用 AI 完成常见开发任务。 | 待分享 |
| 2 | Prompt + Context Engineering | 2026-03-23 | 周一 | 程乐 | 45min | 掌握 Prompt 与 Context 设计方法，构建稳定可复用的 AI 工作流。 | 待完善初稿 |
| 3 | MCP + SKILL | 2026-03-30 | 周一 | 程乐 | 45min | 具备开发 MCP 与 Skill 的能力，使 AI 能够对接内部系统，将工作流自动化 | 待完善初稿 |

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

### 第二期：Prompt + Context Engineering

**文件位置**: `./prompt-context/`

**核心目标**：掌握 Prompt 与 Context 设计方法，构建稳定可复用的 AI 工作流。

**章节结构**:

- `01.overview.md` - **概述**：为什么懂了 Vibe Coding 还不够？(揭示从“单次对话”走向“工程化控制”的痛点：遗忘、幻觉、无序)
- `02.principle.md` - **核心原理**：
  - Prompt 进阶：从 Zero-shot 到 Few-shot，再到 Chain-of-Thought (CoT)。
  - Context 运作机制：LLM 的注意力机制 (Attention)、Token 上限与“大海捞针”困境。
- `03.features.md` - **最佳实践与设计模式**（基于 Anthropic & PromptingGuide 规范）：
  - 提示词高阶框架：ICIO 框架 (Instruction, Context, Input, Output)。
  - 上下文工程 (Context Engineering)：如何精准投喂 (避免垃圾进垃圾出)、利用 `.cursorrules` / `.claudeprompt` 进行全局约束。
- `04.practice.md` - **实战演练**：
  - 场景一：利用结构化 Prompt 结合高质量 Context，一次性生成符合团队规范的复杂 Vue3 组件。
  - 场景二：深水区查 Bug。切取 `nn-client-all` 极其微小的核心链路栈抛给 AI，避免给整个工程导致的推理瘫痪。
- `05.QA.md` - **问答**：关于模型“变笨”、Token 消耗过快等常见疑问解答。

---

### 第三期：MCP + SKILL

**文件位置**: `./mcp/` （原 `mcp` 和 `skill` 目录合并内容）

**核心目标**：具备开发 MCP 与 Skill 的能力，使 AI 能够对接内部系统，将工作流自动化。

**章节结构**:

- `01.overview.md` - **概述**：突破大模型的信息孤岛（只拥有训练数据和本地文件读取权限不够，需要连上“内网”长出“手脚”）。
- `02.principle.md` - **核心原理**：
  - Model Context Protocol (MCP) 架构：如何标准地向 AI 暴露本地资源 (Resources)、提示 (Prompts) 与工具 (Tools)。
  - Tools Calling 与 Skill 执行流：AI 是如何决策并安全地触发本地系统脚本的？
- `03.features.md` - **生态与集成机制**：
  - MCP 的标准实现与生态系统（基于官方指南）：如何将内部日志平台、GitLab、API 平台一键接入。
  - AgentSkill 生态规范：如何编写健壮的 Node.js/Python 脚本供 AI 调用。
- `04.practice.md` - **实战演练**：
  - MCP 实战：现场手写 50 行 Node.js，开发一个“错误日志 MCP 插件”。让 AI 通过对话直接拉取线上的 Trace 堆栈并分析本地错误。
  - Skill 实战：封装自动化日常流。编写打包/上传/压缩组件，通过自然语言触发，解决研发全生命周期的枯燥体力活。
- `05.QA.md` - **问答**：鉴权漏洞防范、破坏性脚本隔离机制探讨。

**核心资料**

- [Model Context Protocol (MCP) 官方指南](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Agent Skills 最佳实践](https://agentskills.io/home) / [The Complete Guide to Building Skill for Claude.pdf](../_docs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)

**核心资料**

- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [MCP 官方文档](https://modelcontextprotocol.io)
- [Claude Code 官方文档与 Skill 扩展](https://code.claude.com/docs/en/overview)
- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) (了解工具调用背后的核心底座理念)
