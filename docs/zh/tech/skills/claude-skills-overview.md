# Claude Skills 介绍

> 学习来源：https://claude.com/blog/skills

## 什么是 Skills

Skills 是包含指令、脚本和资源的文件夹，Claude 能够**动态发现并在相关任务中加载**它们。可以将 Skills 理解为给 Claude 的专业化培训手册，使其在特定领域获得专业知识——从处理 Excel 电子表格到遵循组织的品牌规范。

## Skills 的工作原理

### 渐进式加载（Progressive Disclosure）

当 Claude 遇到任务时，它会扫描可用的 Skills 以找到相关匹配。Skills 使用渐进式加载：

1. **元数据加载**（~100 tokens）：首先加载名称和描述，提供足够信息让 Claude 知道何时激活该 Skill
2. **完整指令加载**（<5k tokens）：当 Skill 匹配时，加载完整指令
3. **文件/脚本按需加载**：绑定的文件或脚本仅在需要时加载

这种架构意味着即使有很多 Skills 可用，也不会压垮 Claude 的上下文窗口——Claude 只在需要时获取所需内容。

## 何时使用 Skills

当需要 Claude **一致且高效地执行专业化任务**时，Skills 是理想选择：

### 适用场景

- **组织工作流**：品牌规范、合规流程、文档模板
- **领域专业知识**：Excel 公式、PDF 操作、数据分析
- **个人偏好**：笔记系统、编码模式、研究方法
- **标准化输出**：确保每次都按相同标准执行

### Skills vs 提示词

| 维度 | 提示词（Prompts） | Skills |
|------|-----------------|--------|
| 性质 | 临时、对话式 | 持久化、可复用 |
| 生命周期 | 单次对话 | 跨对话持久 |
| 加载时机 | 每次对话手动提供 | 动态自动加载 |
| 适用场景 | 一次性请求 | 重复性任务 |

**经验法则**：如果在多个对话中反复输入相同的提示词，那就是时候创建一个 Skill 了。

## Skills 的核心价值

### 1. 编码组织知识
将团队的工作标准、编码规范、专业流程封装成 Skills，确保所有成员都遵循一致的标准。

### 2. 减少重复解释
一次创建，长期使用。无需每次都向 Claude 解释如何执行特定任务。

### 3. 确保执行一致性
标准化的指令确保每次输出都符合预期质量。

### 4. 上下文高效利用
渐进式加载确保 Claude 的上下文窗口专注于当前任务。

## 与其他 Agent 构建块的对比

### Skills vs Projects

- **Projects**：提供背景知识，Claude 在项目中工作时始终加载
- **Skills**：提供程序性知识，仅在相关时动态加载

> Projects 回答"我需要知道什么"。Skills 回答"如何做事情"。

### Skills vs MCP

- **MCP**：连接 Claude 与数据（数据库、文件、API）
- **Skills**：教 Claude 如何处理这些数据

两者配合使用：MCP 提供连接，Skills 提供流程知识。

### Skills vs Subagents

- **Subagents**：为特定目的构建的完整独立 agent，有自己的上下文和工具权限
- **Skills**：任何 Claude 实例都可以加载使用的可移植能力

## 示例

### 品牌规范 Skill

创建包含公司颜色、字体规范、布局规范的 brand-guidelines Skill。当 Claude 创建演示文稿或文档时，自动应用这些标准，无需每次解释。

### PDF 处理 Skill

包含 PDF 操作流程：文本提取、表格识别、表单填写。当需要处理 PDF 时自动激活。

## 快速开始

### Claude.ai 用户
1. 在 Settings → Features 中启用 Skills
2. 在 claude.ai/projects 创建第一个项目
3. 将项目知识与 Skills 结合使用

### API 开发者
- 在[官方文档](https://docs.anthropic.com)中探索 Skills API
- 参考 [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)

### Claude Code 用户
- 通过[插件市场](https://code.claude.com/docs/en/plugin-marketplaces)安装 Skills
- 参考 [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)

## 参考资源

- [Skills 官方文档](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Anthropic Skills 库](https://github.com/anthropics/skills)
