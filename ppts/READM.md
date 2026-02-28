# AI Coding 演讲目录

## 背景

会话旨在帮助团队理解并实践如何在日常开发中有效使用 AI 工具，提升工程效率，并建立稳定的 AI 辅助开发工作流。

### 演讲 对象

- 公司内部研发涉及
  - 前端
  - 后端
  - Android/iOS
  - C++
- 产品/测试（可旁听）

### 演讲安排

| 序号 | 主题 | 日期 | 星期 | 讲师 | 预计时长 | 能力等级 | 核心目标 | 状态 |
|------|------|------|------|------|---------|---------|---------|------|
| 1 | Vibe Coding | 2026-03-16 | 周一 | 程乐 | 45min | L3 | 掌握 AI 辅助编程核心理念与协作方式 | 待进行 |
| 2 | Prompt + Context Engineering | 2026-03-23 | 周一 | 程乐 | 45min | L3 | 掌握提示词工程与上下文工程核心框架 | 待进行 |
| 3 | MCP | 2026-03-30 | 周一 | 程乐 | 45min | L5 | 深入理解 MCP 协议架构，能够开发生产级 MCP Server | 待进行 |
| 4 | SKILL | 2026-04-06 | 周一 | 程乐 | 45min | L5 | 掌握 Skill 开发与工作流编排，具备实操能力 | 待进行 |
| 5 | AGENT | 2026-04-13 | 周一 | 程乐 | 45min | L6 | 基于 Agent Loop 原理，具备搭建生产级 Agent 能力 | 待进行 |

**能力等级补充说明**

参考 [vibe-coding/01.overview.md](./vibe-coding/01.overview.md#L90) 中的 L1-L8 能力模型：

- **L1-L2**: 基础使用 - 会用 AI 工具进行简单对话
- **L3**: Prompt/Context 工程 - 能够优化提示词提升输出质量，管理上下文
- **L4**: 集成应用 - 能够在开发流程中有效使用 AI 工具
- **L5**: 能力扩展 - 能够通过 MCP/Skill 扩展 AI 能力
- **L6**: 任务编排 - 能够构建 Agent 处理复杂任务
- **L7-L8**: 系统架构 - 能够设计 AI 辅助开发体系

## 各系列详情

### 第一期：Vibe Coding

**文件位置**: `./vibe-coding/`

**章节结构**:

- `01.overview.md` - Vibe Coding 概述
- `02.principle.md` - 核心原理
- `03.features.md` - 功能特性
- `04.practice.md` - 实战演练
- `05.QA.md` - 问答

---

### 第二期：Prompt + Context Engineering

**文件位置**: `./prompt/`

**章节结构**:

- `01.intro.md` - LLM 核心概念（Token、Context Window、Transformer）
- `02.prompt.md` - Prompt 工程（ICIO、Zero-shot、Few-shot、CoT）
- `03.context.md` - Context 工程（RAG、记忆机制）
- `04.tool-calling.md` - 工具调用最佳实践
- `05.case.md` - 实战案例
- `06.QA.md` - 问答

**核心资料**

- [Prompt Engineering Guide](https://www.promptingguide.ai/zh) (最全面的 Prompt 指南)
- [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) (构建顶级智能体 Manus 的真实上下文工程经验总结，极具启发性)
- [Prompt Design Pattern (arXiv:2406.06608)](https://arxiv.org/abs/2406.06608) (学术界对 Prompt 模式的系统化梳理与提炼)
- [DeepLearning.AI: Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) (吴恩达出品，体系化极强)
- [Anthropic Courses](https://github.com/anthropics/courses) (高质量的 Prompt 教程)
- [OpenAI Prompt Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google: Prompt design strategies (Gemini Docs)](https://ai.google.dev/gemini-api/docs/prompting-strategies) (多模态与超长上下文的最佳实践)
- [LlamaIndex 官方文档](https://docs.llamaindex.ai/en/stable/) (RAG 与 Context Engineering 最权威框架)

### 第三期：MCP

**文件位置**: `./mcp/`

**章节结构**:

- `01.intro.md` - MCP 概述
- `02.architecture.md` - 架构设计
- `03.protocol.md` - 协议详解
- `04.server-ts.md` - Server 开发 TypeScript
- `05.server-python.md` - Server 开发 Python
- `06.tool.md` - 工具集成
- `07.practice.md` - 实战案例
- `08.QA.md` - 问答

**核心资料**

- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) (官方首发博客，理解 MCP 架构初衷的最佳读物)
- [MCP 官方文档](https://modelcontextprotocol.io)
- [MCP SPEC](https://spec.modelcontextprotocol.io)
- [@modelcontextprotocol/sdk (TS/Python 官方源码)](https://github.com/modelcontextprotocol/typescript-sdk) (底层实现，包含 stdio/SSE 设计模式)
- [Cursor MCP 集成指南](https://cursor.com/docs/context/mcp) (IDE 落地实践)
- [Microsoft MCP for Beginners](https://github.com/microsoft/mcp-for-beginners)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)

### 第四期：SKILL

**文件位置**: `./skill/`

**章节结构**:

- `01.intro.md` - SKILL 概述
- `02.builtin.md` - 内置技能
- `03.custom.md` - 自定义 Skill
- `04.ecosystem.md` - 技能生态（GitHub 900+ Skills）
- `05.practice.md` - 实战案例
- `06.QA.md` - 问答

**核心资料**

- [Anthropic: Tool Use (Function Calling) Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) (底层原理，高质量 Skill 的内功)
- [Claude Code 官方文档](https://code.claude.com/docs/en/overview)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Cursor Directory (.cursorrules)](https://cursor.directory/) (全球顶级开发者沉淀的项目规则，Skill 的灵感库)
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)

### 第五期：AGENT

**文件位置**: `./agent/`

**章节结构**:

- `01.intro.md` - AGENT 概述
- `02.loop.md` - Agent Loop（核心）
- `03.architecture.md` - 架构设计
- `04.framework.md` - 框架对比
- `05.practice.md` - 实战案例
- `06.QA.md` - 问答

**核心资料**

- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) (顶级架构理论，工作流模式重塑认知)
- [吴恩达: Agentic Design Patterns](https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/) (反思、工具使用、规划、多智能体四大基础模式)
- [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) (前端/Node.js 生态最强大的 AI 工程化框架)
- [OpenAI Swarm](https://github.com/openai/swarm) / [HuggingFace smolagents](https://github.com/huggingface/smolagents) (轻量级/代码驱动的最新 Agent 趋势代表)
- [Magentic-One (微软多智能体系统)](https://www.microsoft.com/en-us/research/project/magentic-one/) / [Mono-PI (单体规划者-多重验证者)](https://arxiv.org/abs/2402.11450) (前沿多智能体协同与复杂任务验证架构)
- [Claude Code Agent 文档](https://code.claude.com/docs/en/sub-agents)
- [Anthropic Agent SDK](https://docs.anthropic.com/en/docs/agents-sdk/overview)
- [LangChain](https://github.com/langchain-ai/langchain)
- [AutoGen](https://github.com/microsoft/autogen)
- [CrewAI](https://github.com/crewAIInc/crewAI)

## PPT 内容组织逻辑

基于 `vibe-coding` PPT 的成功实践，总结出一套可复用的 PPT 内容组织逻辑，帮助演讲者真正让听众理解并落地。

---

### 1. 模块化架构

**核心原则**：单一入口 + 分片导入

- **单入口设计**：`slides.md` 作为主入口，通过 `--- src: ./xxx.md ---` 导入各章节
- **章节独立文件**：按顺序命名（`01.overview.md`, `02.principle.md`, ...），每个文件职责单一
- **优势**：可并行编辑、易维护、逻辑清晰

```markdown
# slides.md
---
src: ./01.overview.md
---
src: ./02.principle.md
---
src: ./03.features.md
---
```

---

### 2. 论述结构：金字塔模式

**核心原则**：全貌先现 → 拆解深化 → 总结强化

#### 2.1 全貌先现（总）
开篇先给整体图景，让听众建立宏观认知：
- 交互式工作流图（如 `VibeWorkflow`）展示完整链路
- 架构全景图展示系统全貌
- 使用 `<VibeWorkflow />` 等组件实现可交互演示

#### 2.2 拆解深化（分）
分步骤详细讲解每个环节：
- 使用 `v-click` 控制单点出现
- 使用 `v-clicks` 实现逐项展示
- 每个步骤配合代码示例或效果演示

#### 2.3 总结强化（总）
章节末尾提供：
- 核心维度对比卡片
- 总结框（`<Box>` 组件）
- 方法论模型（如 L1-L8 能力模型、PAIR 工作流）

---

### 3. 双轨并行：概念 + 实践

**核心原则**：幻灯片讲概念，Examples 做实践，两轨并行

#### 轨道一：幻灯片（概念）
- 原理阐述、架构讲解
- 使用 `<VibeExample id=”X.Y” />` 桥接到实践

#### 轨道二：Examples（实践）
- 可运行演示、最小路径示例
- 示例子目录命名：`X.Y.slug`（如 `2.1.tokenizer`）

#### 桥接组件
```markdown
<VibeExample id=”1.2” />
```

**示例 README 规范**：
```markdown
# 示例名称

## 概念简述
说明该示例演示的概念

## 前置条件
环境和路径要求

## 操作步骤
1. 步骤一：xxx
2. 步骤二：xxx

## 预期结果
展示效果说明

## 延伸阅读
官方文档链接
```

---

### 4. 节奏控制

**核心原则**：渐进式动画 + 演讲备注

#### 4.1 动画控制
- `v-click`：单点依次出现
- `v-clicks`：列表逐项展示
- `v-motion`：元素动态效果

#### 4.2 Speaker Notes
每页末尾使用 HTML 注释记录：

```markdown
<!--
Speaker Notes:
- 强调 xxx 概念
- 可提问：xxx

时间预算：2min
-->
```

#### 4.3 时间分配建议
| 环节 | 占比 | 说明 |
|------|------|------|
| 开场/全貌 | 10% | 吸引注意力，建立预期 |
| 原理讲解 | 40% | 核心内容，细讲 |
| 案例演示 | 30% | 演示 + 互动 |
| 总结/Q&A | 20% | 强化记忆 |

---

### 5. 认知建立

**核心原则**：对比矩阵 + 方法论封装

#### 5.1 对比矩阵
使用左右双栏或表格进行对比：

```markdown
| 维度 | 传统方式 | AI 辅助 |
|------|----------|---------|
| 开发模式 | 手动编码 | 人机协作 |
| 调试方式 | print 大法 | AI 分析 |
| 文档维护 | 独立工作 | 实时同步 |
```

#### 5.2 方法论封装
把复杂流程包装成易记模型：

- **L1-L8 能力模型**：AI 辅助开发能力成长路径
- **PAIR 工作流**：Plan → Assess → Implement → Review
- **ICIO 框架**：Instruction → Context → Input → Output

> 听众可能记不住代码，但一定能记住模型。

---

### 6. 场景驱动 + 预判性 QA

**核心原则**：挂靠真实场景 + 预判质疑

#### 6.1 场景化驱动
实战按完整生命周期拆解，挂靠程序员日常场景：

- **新项目冷启动**：从 0 到 1 的 AI 辅助规划
- **Feature 开发**：需求分析 → 代码生成 → 测试验证
- **Bug 修复 (Crash to PR)**：日志分析 → 根因定位 → 修复验证

#### 6.2 预判性 QA
提前预判听众的质疑，用真实数据解答：

| 常见质疑 | 解答策略 |
|----------|----------|
| 数据安全问题 | 引用 Anthropic/Google 官方安全方案 |
| AI 幻觉 | 展示多智能体验证架构 |
| 程序员被替代 | 展示人机协作效率提升数据 |
| 落地困难 | 提供完整的 PAIR 实战路径 |

> 用顶级公司的官方报告或真实团队的成功案例进行”硬背书”。

---

### 验证清单

修改完成后，检查 PPT 是否满足：

- [ ] **模块化**：是否使用单入口 + 分片导入？
- [ ] **金字塔**：是否先给全貌再拆解？章节末尾是否有总结？
- [ ] **双轨并行**：是否有对应的可运行示例？
- [ ] **节奏控制**：是否有动画控制 + Speaker Notes？
- [ ] **认知建立**：是否有对比矩阵和方法论模型？
- [ ] **场景 + QA**：是否挂靠真实场景？是否预判了听众质疑？
