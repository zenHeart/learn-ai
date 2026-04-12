# Skills 机制详解：与其他工具的对比

> 学习来源: [Skills explained](https://claude.com/blog/skills-explained)

## 概述

Claude 的 Agentic 生态由多个构建块组成，每个都有其独特用途。理解它们的区别和组合方式是构建有效工作流的关键。

## 五大构建块对比

| 构建块 | 提供什么 | 持久性 | 包含 | 加载时机 |
|--------|---------|--------|------|---------|
| **Skills** | 程序性知识 | 跨会话 | 指令+代码+资源 | 按需动态 |
| **Prompts** | 即时指令 | 单会话 | 自然语言 | 每轮 |
| **Projects** | 背景知识 | 项目内 | 文档+上下文 | 项目内始终 |
| **Subagents** | 任务委托 | 跨会话 | 完整代理逻辑 | 调用时 |
| **MCP** | 工具连接 | 持续连接 | 工具定义 | 始终可用 |

## Skills vs Prompts

### Prompts 的特点

```
Prompts = 你在对话中提供的自然语言指令
- 临时性：每次对话都要重新输入
- 反应性：被动等待你提供上下文
- 即时性：适合一次性请求
```

**适合用 Prompts 的场景**：
- 一次性请求："总结这篇文章"
- 对话式改进："让语气更专业"
- 即时上下文："分析这个数据"
- 临时指令："格式化为列表"

### Skills 的优势

```
Skills = 跨会话复用的专业能力
- 持久性：一次创建，永久使用
- 主动性：Claude 自动识别何时使用
- 包含代码：可执行复杂工作流
```

**应该创建 Skill 当**：
- 发现自己在多个对话中输入相同的指令
- 需要标准化执行流程
- 需要包含可执行代码

### 组合使用

```
Prompts + Skills = 即时上下文 + 专业能力
Prompts 提供具体任务上下文
Skills 提供专业知识和标准化流程
```

## Skills vs Projects

### Projects 的定位

```
Projects = 特定工作的自包含工作空间
- 200K 上下文窗口
- 上传文档作为背景知识
- RAG 模式可扩展到 10x
```

**适合用 Projects 的场景**：
- 需要持续上下文：背景知识贯穿所有对话
- 工作空间组织：不同项目隔离
- 团队协作：共享知识和对话历史
- 自定义指令：项目特定的语气或方法

### Skills 与 Projects 的区别

| 维度 | Projects | Skills |
|------|----------|--------|
| **本质** | "这是你需要知道的" | "这是怎么做" |
| **内容** | 背景知识库 | 程序性知识 |
| **加载** | 始终在项目中 | 按需动态 |
| **格式** | 文档+上下文 | 指令+代码+资源 |

### 关键区别

```
Projects → 静态参考材料（知识库）
Skills → 动态专业知识（能力）
```

**组合示例**：
- Project: "Q4 产品发布" → 包含市场研究、竞品分析、产品规格
- Skill: "写作标准" → 教 Claude 团队的写作规范

## Skills vs Subagents

### Subagents 的特点

```
Subagents = 独立执行的专用 AI 助手
- 独立上下文窗口
- 自定义系统提示
- 特定工具权限
```

**适合用 Subagents 的场景**：
- 任务专业化：代码审查、测试生成、安全审计
- 上下文管理：主对话保持专注
- 并行处理：多个 subagents 同时工作
- 工具限制：限制特定 subagent 的操作权限

### Skills vs Subagents

| 维度 | Skills | Subagents |
|------|---------|------------|
| **本质** | 训练材料 | 专用员工 |
| **范围** | 可移植复用 | 特定目的 |
| **执行** | 被主代理调用 | 独立执行 |
| **工具** | 可包含工具 | 完全控制 |

### 组合使用

```
Subagent + Skills = 独立性 + 专业能力
Subagent 获得 Skills 提供的专业知识
同时保持独立执行和工具权限控制
```

**示例**：
```yaml
code-reviewer subagent:
  name: code-reviewer
  description: 代码质量和安全审查
  tools: [Read, Grep, Glob]  # 没有 Write/Edit
  # 可以使用 security-best-practices Skill
```

## Skills vs MCP

### MCP 的定位

```
MCP = AI 应用与外部工具/数据的通用连接层
Model Context Protocol = 连接 AI 到数据所在之处
```

**MCP 连接类型**：
- 内容仓库：Google Drive、Slack、GitHub
- 业务工具：CRM、项目管理平台
- 数据库
- 开发环境

### Skills vs MCP

| 维度 | MCP | Skills |
|------|-----|--------|
| **本质** | 连接数据 | 教授如何使用数据 |
| **作用** | 提供访问能力 | 提供处理流程 |
| **关系** | 数据源 | 数据处理方法 |

### 组合使用

```
MCP + Skills = 连接能力 + 处理知识
MCP 提供数据访问
Skills 提供处理流程和最佳实践
```

**示例**：
- MCP: 连接数据库或 Excel 文件
- Skill: "查询数据库时总是先过滤日期范围" 或 "用特定公式格式化 Excel 报告"

## 渐进式披露 (Progressive Disclosure)

Skills 使用渐进式披露保持效率：

```
1. 元数据加载 (~100 tokens)
   - 描述和摘要
   - Claude 判断 Skill 是否相关

2. 完整指令 (<5k tokens)
   - 相关时才加载

3. 代码/资源文件
   - 按需加载，不是全部
```

**优势**：
- 不压爆上下文窗口
- Claude 按需获取exactly what it needs

## 实战：研究 Agent 工作流

### 完整架构

```
用户请求
    ↓
Project (背景知识)
    ↓
MCP (数据连接: GDrive, GitHub, Web)
    ↓
Skills (分析框架)
    ↓
Subagents (并行执行)
    ↓
Prompts (对话精炼)
```

### 具体配置

**Step 1: Project**
- 上传：行业报告、竞品文档、客户反馈
- 指令：分析视角、差异化机会

**Step 2: MCP**
- Google Drive (内部研究)
- GitHub (竞品开源仓库)
- Web Search (实时市场信息)

**Step 3: Skills**
```yaml
competitive-analysis skill:
  描述: 竞品分析方法论
  包含:
    - 分析框架
    - 数据源优先级
    - 报告格式
```

**Step 4: Subagents**
```yaml
market-researcher:
  tools: [Read, Grep, Web-search]
  专长: 市场趋势、行业报告

technical-analyst:
  tools: [Read, Bash, Grep]
  专长: 技术架构、工程决策
```

### 执行流程

```
用户: "分析三大竞品的新 AI 功能定位，找出我们可以利用的差距"

1. Project context loads
   → Claude 访问上传的研究文档

2. MCP connections activate
   → 搜索 GDrive 竞品简报
   → 拉取 GitHub 技术数据

3. Skills engage
   → competitive-analysis Skill 提供分析框架

4. Subagents execute
   → market-researcher 收集行业数据
   → technical-analyst 审查技术实现

5. Prompts refine
   → 用户: "特别关注医疗健康企业客户"
```

## 常见问题

### Skills 如何决定何时触发？

```
不是关键词匹配！
Claude 理解语义关系
描述越精确，触发越准确
```

### 何时用 Subagent 而非 Skill？

| 场景 | 选择 |
|------|------|
| 任何 Claude 实例都需要的能力 | Skills |
| 独立执行+特定工具权限 | Subagents |
| 专业化+复用 | Subagent + Skills |

### Skills 可以被 Subagent 使用吗？

**可以！**

在 Claude Code 和 Agent SDK 中，Subagent 可以像主代理一样访问和使用 Skills。

## 参考资源

- [Skills 官方介绍](https://claude.com/blog/skills)
- [Skills 详解](https://claude.com/blog/skills-explained)
- [创建 Skills 指南](https://claude.com/blog/how-to-create-skills-key-steps-limitations-and-examples)
- [GitHub Skills 库](https://github.com/anthropics/skills)

## 更新日志

- 2026-04-12: 初始化文档
