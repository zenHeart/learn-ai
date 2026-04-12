# Skills 机制详解：Skills、Prompts、Projects、Subagents 与 MCP 的对比

> 学习来源：https://claude.com/blog/skills-explained

## 概述

自引入 Skills 以来，大家对 Claude Agent 生态系统中的各个组件如何协同工作很感兴趣。无论是在 Claude Code 中构建复杂工作流、使用 API 创建企业解决方案，还是在 Claude.ai 上提高生产力，了解何时使用什么工具，可以改变你与 Claude 协作的方式。

本文将详细解析每个构建块，说明何时使用、如何组合它们以构建强大的 Agent 工作流。

---

## Skills 详解

### 什么是 Skills

Skills 是包含指令、脚本和资源的文件夹，Claude 能够**动态发现并在相关任务中加载**。可以理解为给 Claude 的专业化培训手册。

### 工作原理：渐进式加载

Skills 使用渐进式加载优化上下文使用：

1. **元数据加载**（~100 tokens）：名称和描述首先加载，提供足够信息让 Claude 知道何时激活
2. **完整指令加载**（<5k tokens）：Skill 匹配时加载
3. **文件按需加载**：脚本或资源仅在需要时加载

### 何时使用 Skills

- 组织工作流：品牌规范、合规流程、文档模板
- 领域专业知识：Excel 公式、PDF 操作、数据分析
- 个人偏好：编码模式、研究方法
- 需要跨对话持久一致的任务执行

**示例**：创建 brand-guidelines Skill 包含公司的颜色、字体规范和布局规范。当 Claude 创建文档时，自动应用这些标准。

---

## Prompts 详解

### 什么是 Prompts

Prompts 是对话中用自然语言向 Claude 提供的指令，是**临时的、对话式的、反应式的**——你在当下提供上下文和方向。

### 何时使用 Prompts

- **一次性请求**："总结这篇文章"
- **对话式优化**："让语气更专业"
- **即时上下文**："分析这些数据并识别趋势"
- **临时指令**："格式化为项目符号列表"

### 何时从 Prompts 升级到 Skills

如果在多个对话中反复输入相同的提示词，就是时候创建 Skill 了。

**经验法则**：重复超过 5 次 → 考虑 Skill

---

## Projects 详解

### 什么是 Projects

Projects 是自包含的工作空间，有自己的聊天历史和知识库。每个项目包含 200K 上下文窗口，可以上传文档、提供上下文和设置自定义指令，这些指令在该项目内的所有对话中适用。

### Projects vs Skills

| 维度 | Projects | Skills |
|------|----------|--------|
| 提供内容 | 背景知识 | 程序性知识 |
| 加载方式 | 项目中始终加载 | 仅相关时动态加载 |
| 内容形式 | 文档 + 上下文 | 指令 + 代码 + 资源 |
| 生命周期 | 在项目内持久 | 跨对话持久 |

**核心区别**：
- Projects 说"这是你需要知道的"
- Skills 说"这是如何做事情"

**何时使用 Projects**：
- 需要在每次对话中了解的背景知识
- 不同项目需要隔离的上下文
- 团队协作时共享知识和对话历史
- 设置项目特定的语气、视角或方法

**何时组合使用**：需要持久上下文和专业能力时。例如"产品开发"项目包含产品规格和用户研究，结合用于创建技术文档和分析用户反馈的 Skills。

---

## Subagents 详解

### 什么是 Subagents

Subagents 是专业化 AI 助手，有自己的上下文窗口、自定义系统提示和特定工具权限。在 Claude Code 和 Claude Agent SDK 中可用，独立处理离散任务并将结果返回主 agent。

### Subagents vs Skills

| 维度 | Subagents | Skills |
|------|-----------|--------|
| 本质 | 完整独立 agent | 可移植的专业能力 |
| 上下文 | 有自己的完整上下文 | 任何 agent 可加载使用 |
| 工具权限 | 可单独配置 | 通过加载它的 agent 获得 |
| 典型用途 | 独立任务执行 | 跨 agent 共享专业知识 |

**何时使用 Subagents**：
- 任务专业化：代码审查、测试生成、安全审计
- 上下文管理：保持主对话专注，将专业工作委托
- 并行处理：多个 subagents 同时处理不同方面
- 工具限制：限制特定 subagents 仅执行安全操作（如只读访问）

**何时使用 Skills**：
- 多个 agents 或对话需要相同专业知识
- 需要跨 agent 可移植的专业能力

**组合使用**：让 subagents 加载 Skills，获得两者的优势。例如 python-developer subagent 可以使用 pandas-analysis Skill 执行遵循团队约定的数据转换。

---

## MCP 详解

### 什么是 MCP

MCP（Model Context Protocol）创建了 AI 应用与外部工具和数据源之间的**通用连接层**。

### MCP vs Skills

| 维度 | MCP | Skills |
|------|-----|--------|
| 本质 | 连接协议 | 程序性知识 |
| 功能 | 连接数据 | 教 Claude 做什么 |
| 典型用途 | 访问数据库、文件、API | 流程规范、数据处理方法 |
| 持久性 | 持续连接 | 动态加载 |

**何时使用 MCP**：
- 访问外部数据：Google Drive、Slack、GitHub、数据库
- 连接业务工具：CRM、项目管理平台
- 连接开发环境：本地文件、IDE、版本控制
- 集成自定义系统

**何时使用 Skills**：
- 解释如何使用工具："查询数据库时，先按日期范围过滤"
- 说明流程规范："用这些特定公式格式化 Excel 报告"

**组合使用**：MCP 处理连接，Skills 处理流程知识。

---

## 综合对比

| 特性 | Skills | Prompts | Projects | Subagents | MCP |
|------|--------|---------|----------|-----------|-----|
| 提供内容 | 程序性知识 | 即时指令 | 背景知识 | 任务委托 | 工具连接 |
| 持久性 | 跨对话 | 单次对话 | 项目内 | 跨会话 | 持续连接 |
| 包含内容 | 指令+代码+资源 | 自然语言 | 文档+上下文 | 完整 agent 逻辑 | 工具定义 |
| 加载时机 | 按需动态 | 每轮 | 项目中始终 | 调用时 | 始终可用 |
| 可含代码 | 是 | 否 | 否 | 是 | 是 |
| 最佳用途 | 专业化能力 | 快速请求 | 集中上下文 | 专业化任务 | 数据访问 |

---

## 组合使用示例：研究 Agent 工作流

### 场景：竞争情报分析 Agent

**步骤 1：设置 Project**
创建"竞争情报"项目，上传：
- 行业报告和市场分析
- 竞品产品规格文档
- CRM 中的客户反馈
- 之前的研究摘要

添加项目指令：
> "通过我们产品战略的视角分析竞品。关注差异化和新兴市场趋势。用具体证据和可操作建议呈现发现。"

**步骤 2：通过 MCP 连接数据源**
启用 MCP 服务器：
- Google Drive（访问共享研究文档）
- GitHub（审查竞品开源仓库）
- Web 搜索（实时市场信息）

**步骤 3：创建专业 Skills**
创建 competitive-analysis Skill：
- 公司 Google Drive 导航策略
- 竞品分析框架
- 数据可视化和呈现标准

**步骤 4：配置 Subagents**
- **market-researcher**：使用 Read、Grep、Web-search 工具，研究市场趋势和竞品数据
- **technical-analyst**：使用 Read、Bash、Grep 工具，分析技术架构和工程决策

**步骤 5：激活工作流**

当你说："分析我们三大竞品如何定位其新 AI 功能，识别我们可以利用的差距"

工作流自动：
- Project 上下文加载
- MCP 连接激活，Claude 搜索 Google Drive 最新竞品简报并拉取 GitHub 数据
- competitive-analysis Skill 提供分析框架
- Subagents 并行执行
- 你通过 Prompts 提供进一步指导："尤其关注医疗健康企业客户"

---

## 常见问题

### Skills vs Subagents：何时用哪个？

- **Skills**：想让任何 Claude 实例都能加载和使用的通用能力
- **Subagents**：需要完整、自包含的 agent 处理独立工作流时
- **组合**：需要既有 subagent 独立性又有专业知识的场景

### Skills vs Prompts：何时用哪个？

- **Prompts**：一次性指令、即时上下文、对话式往返
- **Skills**：需要反复使用的程序或专业知识
- **组合**：Prompts 提供基础专业知识，Prompts 提供具体上下文和细化

### Skills vs Projects：何时用哪个？

- **Projects**：需要影响所有对话的背景知识和上下文
- **Skills**：需要程序性知识和按需激活的可执行代码
- **组合**：既有持久上下文又有专业能力

### Subagents 能使用 Skills 吗？

能。在 Claude Code 和 Agent SDK 中，subagents 可以像主 agent 一样访问和使用 Skills。

### 如何开始？

**Claude.ai 用户**：
1. Settings → Features 启用 Skills
2. claude.ai/projects 创建第一个项目
3. 尝试将项目知识与 Skills 结合

**API 开发者**：
- 探索 [Skills API 文档](https://docs.anthropic.com)
- 查看 [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)

**Claude Code 用户**：
- 通过[插件市场](https://code.claude.com/docs/en/plugin-marketplaces)安装 Skills
- 查看 [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)
