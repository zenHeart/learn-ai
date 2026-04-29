# Claude Skills 深度解析

> 学习来源: [Introducing Agent Skills](https://claude.com/blog/skills)

## 概述

Skills 是 Claude 的能力扩展机制，通过文件夹（包含指令、脚本和资源）让 Claude 在特定任务上表现得更加专业。

## 核心概念

### 什么是 Skills

Skills 本质上是**定制化的 onboarding 材料**，将专业知识打包，使 Claude 成为特定领域的专家。

```
传统方式: 每次对话都要重复背景信息
Skills 方式: 一次打包，持续复用
```

### Skills 的四大特性

| 特性 | 说明 | 价值 |
|------|------|------|
| **Composable** | 可组合 | 多个 Skills 可自动协同，Claude 自动识别需要哪些 |
| **Portable** | 可移植 | 一次构建，多端使用（Claude Apps / Claude Code / API） |
| **Efficient** | 高效 | 按需加载，只获取任务所需的最小信息 |
| **Powerful** | 强大 | 可包含可执行代码，处理传统编程更可靠的任务 |

## 工作原理

### 自动匹配机制

```
用户任务 → Claude 扫描可用 Skills → 匹配合适的 → 加载必要信息 → 执行
```

**关键点**：
- Claude 会自动判断任务与哪些 Skills 相关
- 匹配后只加载**最小必要信息**，保持速度
- Skills 会出现在 Claude 的 chain of thought 中

### 与传统 Plugin 的区别

| 维度 | 传统 Plugin | Skills |
|------|------------|--------|
| 加载方式 | 手动选择 | 自动匹配合 |
| 信息量 | 全部加载 | 按需最小加载 |
| 可组合性 | 有限 | 自动协调多个 Skills |
| 代码执行 | 依赖外部 | 内置代码执行环境 |

## 应用场景

### 1. Claude Apps

- Pro / Max / Team / Enterprise 用户可用
- 内置常见任务 Skills（文档创建、示例）
- 自动调用，无需手动选择
- skill-creator Skill 可交互式引导创建

### 2. Claude Developer Platform (API)

- 通过 `/v1/skills` 端点编程控制
- 需要 Code Execution Tool beta
- 支持版本管理和自定义

**内置 Skills**：
- Excel 专业表格（带公式）
- PowerPoint 演示文稿
- Word 文档
- 可填写 PDF

### 3. Claude Code

- 通过 anthropics/skills 市场插件安装
- 自动加载相关 Skills
- 通过版本控制共享团队 Skills
- 手动安装到 `~/.claude/skills`

## 工程实践

### Skills 格式

```
skill-folder/
├── SKILL.md          # 核心定义文件
├── instructions/     # 指令文件
├── scripts/         # 可执行脚本
└── resources/       # 资源文件
```

### 创建流程

1. 使用 skill-creator Skill（交互式引导）
2. Claude 询问工作流程
3. 自动生成文件夹结构
4. 格式化 SKILL.md
5. 打包所需资源

### 安全考量

> ⚠️ Skills 可执行代码，只使用可信来源的 Skills

- Code Execution Tool 提供安全执行环境
- 企业用户需管理员启用
- 个人用户可在设置中启用

## 企业级特性

### 组织范围管理

- Organization-wide Skills 部署
- 管理员控制可用 Skills
- 团队级别的一致性

### 合作伙伴生态

- Canva: 定制设计 Agents
- Notion: 简化工作流
- Box: 企业内容处理

## 与 Agentic Engineering 的关系

Skills 是 Agentic Engineering 的重要组成部分：

```
Agentic Engineering = Tools + Loop + Goal + Skills
                                         ↑
                              专业化能力扩展
```

Skills 让我们能够：
- **封装专业知识**：将领域专家的工作方式代码化
- **保持一致性**：团队成员共享相同的处理方式
- **持续演进**：Skills 可版本控制和升级

## 参考资源

- [官方文档](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview)
- [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)
- [GitHub 示例](https://github.com/anthropics/skills)
- [工程博客](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

## 更新日志

- 2026-04-12: 初始化文档
