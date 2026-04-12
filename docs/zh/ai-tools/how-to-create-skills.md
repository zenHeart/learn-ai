# How to Create Skills 深度实践指南

> 学习来源: [How to create Skills](https://claude.com/blog/how-to-create-skills-key-steps-limitations-and-examples)

## 概述

Skills 是将 Claude 从通用助手转变为特定领域专家的关键机制。通过 SKILL.md 文件，我们可以编码机构知识、标准化输出、处理复杂多步骤工作流。

## 五步创建流程

### Step 1: 理解核心需求

**关键问题**：
- 这个 Skill 解决什么具体问题？
- 什么触发条件应该激活它？
- 成功的标准是什么？
- 边界情况和限制是什么？

**好的例子**：
```
✅ "Extract financial data from PDFs and format as CSV"
❌ "Help with my finance stuff"
```

### Step 2: 编写名称

Skill 需要三个核心组件：

| 组件 | 要求 |
|------|------|
| name | 清晰标识符，小写 + 连字符 |
| description | 何时激活的描述 |
| instructions | 如何执行 |

**格式示例**：`pdf-editor`, `brand-guidelines`

### Step 3: 编写描述（最关键）

描述决定了 Skill 何时激活，是最关键的组件。

**写作要点**：
- 从 Claude 的视角写
- 关注触发条件、能力、使用场景
- 明确边界

**弱描述**：
```
This skill helps with PDFs and documents.
```

**强描述**：
```
Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale. Use for document workflows and batch operations. Not for simple PDF viewing or basic conversions.
```

### Step 4: 编写主指令

结构化、可扫描、可执行：

```
├── Overview（概述）
├── Prerequisites（前置条件）
├── Execution steps（执行步骤）
├── Examples（示例）
├── Error handling（错误处理）
└── Limitations（限制）
```

**最佳实践**：
- 包含具体示例
- 说明 Skill 不能做什么
- 引用额外文件提供更多指导

### Step 5: 上传 Skill

根据不同平台：

**Claude.ai (Apps)**：
```
Settings → Add custom skill
```

**Claude Code**：
```bash
my-project/
├── skills/
│   └── my-skill/
│       └── SKILL.md
```

**Claude Developer Platform (API)**：
```bash
curl -X POST "https://api.anthropic.com/v1/skills" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: skills-2025-10-02" \
  -F "display_title=My Skill Name" \
  -F "files[]=@my-skill/SKILL.md;filename=my-skill/SKILL.md"
```

## 测试与验证

### 测试矩阵

| 场景类型 | 说明 | 示例 |
|---------|------|------|
| 正常操作 | 典型请求应完美处理 | "分析微软最新财报" |
| 边界情况 | 不完整或异常输入 | 数据缺失、格式异常 |
| 范围外 | 不应触发的相关任务 | NDA review skill 收到租赁协议 |

### 触发测试

- 显式请求：`"use the financial datapack skill"`
- 自然请求：`"help me understand this company's financials"`
- 验证边界：类似但不相关的请求不应触发

### 功能测试

- **输出一致性**：相同输入多次运行结果相似？
- **可用性**：领域外的人能成功使用吗？
- **文档准确性**：示例与实际行为匹配吗？

## 最佳实践

### 从用例出发

**不要** speculation 构建 Skill。

**构建前问自己**：
- 这个任务我至少做过 5 次了吗？
- 我还会再做至少 10 次吗？

如果都是 yes，Skill 才有意义。

### 定义成功标准

告诉 Claude 好的输出是什么样的：
- 必需的部分
- 格式化标准
- 验证检查
- 质量阈值

### 使用 Skill-Creator Skill

[science-creator skill](https://github.com/anthropics/skills/tree/main/skill-creator) 提供交互式引导，帮助构建良好结构的 Skills。

## SKILL.md 格式详解

### 基础结构

```markdown
#---
name: docx
description: "Comprehensive document manipulation toolkit..."
license: Proprietary
---

# DOCX creation, editing, and analysis

## Overview
...

## Workflow Decision Tree
### Reading/Analyzing Content
### Creating New Document
### Editing Existing Document
...
```

### 文件大小控制

**菜单式方法**：
- SKILL.md 作为索引
- 详细内容放在单独文件中
- Claude 按需读取

```markdown
# SKILL.md
## Available Processes
- [Process A](process-a.md)
- [Process B](process-b.md)

# process-a.md
详细指令...
```

## 真实案例分析

### Docx Skill

**特点**：
- 清晰的决策树，路由到正确工作流
- 渐进式披露，主文件保持精简
- 具体的好/坏示例

**决策树示例**：
```
Reading/Analyzing → Text extraction 或 Raw XML access
Creating New → docx-js
Editing Existing → Basic OOXML 或 Redlining workflow
```

### Brand Guidelines Skill

**特点**：
- 提供 Claude 本身不具有的精确信息
- 明确的触发描述
- 精确的颜色值、字体名称、尺寸阈值

### Frontend Design Skill

**特点**：
- 避免"AI 垃圾审美"
- 创意能力 + 明确边界
- 版权保护内置
- 技术脚手架

## 限制与考量

### 触发机制

- **不是关键词匹配**：Claude 理解语义关系
- **模糊描述降低准确性**：精准 > 模糊
- **多 Skill 可同时激活**：处理复杂任务的不同方面

### 文件大小

避免：
- 不必要的内容撑爆上下文窗口
- 每次加载都加载所有内容

使用：
- 菜单式引用
- 条件加载

## 参考资源

- [官方博客](https://claude.com/blog/how-to-create-skills-key-steps-limitations-and-examples)
- [Skills GitHub 仓库](https://github.com/anthropics/skills)
- [Skill Creator](https://github.com/anthropics/skills/tree/main/skill-creator)

## 更新日志

- 2026-04-12: 初始化文档
