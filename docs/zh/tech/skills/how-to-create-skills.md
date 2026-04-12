# 如何创建 Skills：关键步骤、限制与示例

> 学习来源：https://claude.com/blog/how-to-create-skills-key-steps-limitations-and-examples

## 创建流程概览（5 步法）

### 第 1 步：理解核心需求

在写任何内容之前，先明确你的 Skill 要解决什么问题。强大的 Skills 应：
- 解决具体需求，有可衡量的成果
- 指定输入格式、操作内容、期望输出

**提问清单**：
- 这个 Skill 要完成什么具体任务？
- 什么触发条件应该激活它？
- 成功是什么样的？
- 有什么边缘情况或限制？

### 第 2 步：编写名称

Skill 需要三个核心组件：**名称**、**描述**、**指令**。名称和描述是唯一影响触发（triggering）的部分。

- 使用小写字母和连字符：如 `pdf-editor`、`brand-guidelines`
- 保持简短清晰

### 第 3 步：编写描述（最关键）

描述决定了 Skill 何时激活，是最关键的组件。从 Claude 的视角编写，聚焦于触发条件、能力和用例。

**强描述 vs 弱描述**：

❌ 弱：
```
This skill helps with PDFs and documents.
```

✅ 强：
```
Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale. Use for document workflows and batch operations. Not for simple PDF viewing or basic conversions.
```

**描述要素**：
- 具体的行动动词（extract、create、merge）
- 具体的用例（表单填写、批量操作）
- 清晰的边界（不适合做什么）

### 第 4 步：编写主要指令

指令应**结构清晰、可扫描、可操作**：

- 使用 Markdown 标题建立清晰层级
- 用项目符号列出选项
- 用代码块展示示例

**推荐结构**：
1. Overview（概览）
2. Prerequisites（前置条件）
3. Execution steps（执行步骤）
4. Examples（示例）
5. Error handling（错误处理）
6. Limitations（限制）

**渐进式内容**：
使用"菜单"方式——SKILL.md 描述可用内容，用相对路径引用独立文件。Claude 只读取与用户任务相关的文件。

### 第 5 步：上传你的 Skill

根据不同平台：

**Claude.ai**：
- Settings → Features 中添加自定义 Skill
- 需要 Pro、Max、Team 或 Enterprise 计划（需启用代码执行）
- Skills 仅对个人用户可见，不共享给组织

**Claude Code**：
- 在插件或项目根目录创建 `skills/` 目录
- 添加包含 SKILL.md 的 skill 文件夹
- Claude 会自动发现并使用它们

```
my-project/
├── skills/
│   └── my-skill/
│       └── SKILL.md
```

**Claude Developer Platform（API）**：
```bash
curl -X POST "https://api.anthropic.com/v1/skills" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: skills-2025-10-02" \
  -F "display_title=My Skill Name" \
  -F "files[]=@my-skill/SKILL.md;filename=my-skill/SKILL.md"
```

---

## 测试与验证

### 测试矩阵（三种场景）

#### 1. 正常操作测试
测试 Skill 应该完美处理的标准请求。例如财务分析 Skill：
- "分析微软最新财报"
- "从这份 10-K 文件构建数据包"

#### 2. 边缘情况测试
- 数据缺失时
- 文件格式意外时
- 用户指令模糊时

#### 3. 越界请求测试
测试看起来相关但不应触发 Skill 的请求。例如 NDA 审查 Skill：
- "审查这份雇佣合同"（不应触发）
- "分析这份租约"（不应触发）

### 深层验证测试

- **触发测试**：显式请求和自然请求都能正确触发吗？无关请求能保持沉默吗？
- **功能测试**：输出一致性、可用性、文档准确性

---

## 创建 Skills 的最佳实践

### 1. 从实际用例出发
不要凭空构建 Skills。在有真实、重复任务时创建。

**自问**：
- 我至少做过 5 次这个任务了吗？
- 我还会再做至少 10 次吗？

### 2. 定义成功标准并包含在 Skill 中
告诉 Claude 好的输出是什么样的。包括：
- 必需的部分
- 格式化标准
- 验证检查
- 质量阈值

### 3. 使用 Skill-Creator Skill
[skill-creator Skill](https://github.com/anthropics/skills/tree/main/skill-creator) 会引导你创建结构良好的 Skills。它会提出澄清问题、建议描述改进、帮助正确格式化指令。

---

## Skill 的限制与注意事项

### 触发机制
Claude 通过**语义理解**评估 Skill 描述与请求的相关性，不是关键词匹配。模糊的描述会降低触发准确性。

- 多个 Skills 可以同时激活（处理复杂任务的不同方面）
- 过于泛化的描述导致错误激活
- 缺少用例导致无法激活

### 文件大小
避免用不必要的内容撑满上下文窗口：
- 考虑每条信息是每次都加载还是仅在特定条件下加载
- 使用"菜单"方式：主文件描述可用内容，详细内容在独立文件中
- Claude 按需读取相关文件

---

## 真实 Skills 示例

### 示例 1：DOCX 创建 Skill

完整示例参考：[docx skill](https://github.com/anthropics/skills/tree/main/document-skills/docx)

**特点**：
- 清晰的决策树，根据任务类型路由到正确工作流
- 渐进式加载，主文件精简，详细内容在独立文件
- 包含具体的好/坏代码示例，展示如何实现复杂模式（如 tracked changes）

### 示例 2：品牌规范 Skill

**SKILL.md 结构**：
```markdown
# name: brand-guidelines
# description: Applies Anthropic's official brand colors and typography...
# license: Complete terms in LICENSE.txt

# Anthropic Brand Styling

## Overview
...

## Brand Guidelines
### Colors
- Dark: `#141413`
- Light: `#fafaf5`
...

## Typography
- Headings: Poppins (with Arial fallback)
- Body Text: Lora (with Georgia fallback)
```

**特点**：
- 提供 Claude 本身没有的精确信息（精确色值、字体名、大小阈值）
- 清晰的描述告诉 Claude 做什么、何时触发

### 示例 3：前端设计 Skill

**特点**：
- 创意能力 + 清晰边界
- 内置版权保护
- 为非设计师提供技术脚手架
- 质量标准明确

---

## 常见问题

### 如何写出能真正触发的描述？

聚焦于能力和场景，而非泛化关键词。包含：
- 动词（extract、create、merge）
- 特定文件类型
- 清晰用例

### Claude 如何决定调用哪些 Skills？

Claude 使用语义理解评估请求与 Skill 描述的相关性，不是关键词匹配。多个 Skills 可以同时激活。

### 描述粒度多少合适？

目标**单一用途**的 Skills。"SEO optimization for blog posts" 足够聚焦且可复用。

太泛化 → "Content marketing helper"
太细化 → "Add meta descriptions"

### 如何在组织内共享 Skills？

目前 Claude.ai 中 Skills 仅对个人用户可见。可以：
- 创建共享文档仓库存储 Skill 规范
- 建立 Skills 治理流程：指定各领域负责人、维护中心知识库、版本控制

---

## 快速开始

**Claude.ai 用户**：
1. Settings → Features 启用 Skills
2. claude.ai/projects 创建第一个项目
3. 结合项目知识与 Skills

**API 开发者**：
- 探索 [Skills 文档](https://docs.anthropic.com)
- 查看 [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)

**Claude Code 用户**：
- 通过[插件市场](https://code.claude.com/docs/en/plugin-marketplaces)安装
- 查看 [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)
