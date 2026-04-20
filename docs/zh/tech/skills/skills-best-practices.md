# 构建 Skills 最佳实践

> 学习来源：https://claude.com/blog/how-to-create-skills-key-steps-limitations-and-examples

## 核心原则

### 1. 从真实用例出发

**不要凭空构建 Skills**。只有当有真实、重复的任务时才创建。

**自问清单**：
- 我至少做过 5 次这个任务了吗？
- 我还会再做至少 10 次吗？
- 这个任务有可衡量的成功标准吗？

### 2. 定义成功标准

告诉 Claude 好的输出是什么样的：
- 必需包含哪些部分？
- 格式化标准是什么？
- 需要哪些验证检查？
- 质量阈值是多少？

将这些标准包含在指令中，让 Claude 可以自我检查。

### 3. 使用 Skill-Creator Skill

[skill-creator Skill](https://github.com/anthropics/skills/tree/main/skill-creator) 会引导你创建结构良好的 Skills：
- 提出澄清问题
- 建议描述改进
- 帮助正确格式化指令

---

## 触发机制最佳实践

### 编写有效描述

描述是 Skill 激活的关键。从 Claude 的视角编写，聚焦于**触发条件、能力和用例**。

**四要素描述法**：

1. **具体能力**：用动词描述（extract、create、merge、analyze）
2. **明确触发**：什么情况下应激活？
3. **相关上下文**：涉及什么类型的数据、工具、格式？
4. **清晰边界**：不适合做什么？

**示例对比**：

❌ 泛化描述：
```
This skill helps with PDFs.
```

✅ 具体描述：
```
Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale. Use for document workflows and batch operations. Not for simple PDF viewing or basic conversions.
```

### 粒度控制

**太泛化**：→ "Content marketing helper"（不知道能做什么）
**太细化**：→ "Add meta descriptions to blog posts"（复用性差）
**适中**：→ "SEO optimization for blog posts"（明确且可复用）

### 语义触发 vs 关键词匹配

Claude 通过**语义理解**评估请求与 Skill 描述的相关性，不是简单的关键词匹配。这意味着：
- 描述应该捕捉意图和场景
- 同义词和表达变体都能被理解
- 模糊描述会降低准确性

---

## 渐进式加载最佳实践

### "菜单"方式

不要把所有内容塞进一个 SKILL.md。使用"菜单"方式：

```
my-skill/
├── SKILL.md          # 描述可用内容和入口
├── workflows/
│   ├── basic-workflow.md
│   └── advanced-workflow.md
├── templates/
│   └── report-template.md
└── scripts/
    └── processor.py
```

SKILL.md 描述整体框架，详细内容在独立文件中。Claude 只在需要时读取相关文件。

### 文件大小控制

- 避免用不必要的内容撑满上下文窗口
- 每次加载的信息应该是当时所需的最小集
- 使用引用（相对路径）而非内联所有内容

---

## 指令编写最佳实践

### 结构化指令

```
## Overview（概览）
## Prerequisites（前置条件）
## Execution Steps（执行步骤）
## Examples（示例）
## Error Handling（错误处理）
## Limitations（限制）
```

### 可执行代码规范

Skill 中包含的代码应该：
- **简洁**：避免冗余变量和操作
- **有示例**：展示正确用法
- **有边界检查**：处理异常输入
- **有错误处理**：失败时有清晰的错误信息

### 包含反例

展示什么是**错误**的做法：

```python
# BAD - Replaces entire sentence
'<w:del>...</w:del><w:ins>...</w:ins>'

# GOOD - Only marks what changed
'<w:r>...</w:r><w:del>...</w:del><w:ins>...</w:ins>'
```

---

## 测试最佳实践

### 测试矩阵

| 场景类型 | 测试内容 | 示例 |
|----------|----------|------|
| 正常操作 | Skill 应完美处理的典型请求 | "用财务数据包分析这家公司" |
| 边缘情况 | 不完整或意外的输入 | 数据缺失、格式异常 |
| 越界请求 | 看起来相关但不应触发的任务 | NDA Skill 收到租约分析请求 |

### 触发测试

- **正向测试**：
  - 显式请求："使用财务数据包分析这家公司"（应触发）
  - 自然请求："帮我理解这家公司的财务状况"（应触发）
- **负向测试**：
  - 相似的邻近请求能保持沉默吗？
  - 边界是否清晰？

### 功能测试

- **输出一致性**：相同输入多次运行结果相似吗？
- **可用性**：不熟悉该领域的人能成功使用吗？
- **文档准确性**：示例与实际行为匹配吗？

---

## 组织内共享最佳实践

### 小团队

创建共享文档仓库，包含：
- Skill 规范模板（名称、描述、指令、版本）
- 所有 Skill 的集中索引
- 使用示例和常见问题

### 中大型团队

建立 Skills 治理流程：
- **指定 Skill 负责人**：每个领域（财务、法务、市场）有负责人
- **维护中心知识库**：作为 Skill 库
- **使用指南和排错**：每个 Skill 附带
- **版本控制和变更日志**：追踪变更历史
- **季度评审**：更新或淘汰过时 Skills

### 所有团队规模通用

- 记录每个 Skill 的业务目的
- 指定明确的维护和更新负责人
- 创建新人 onboarding 材料
- 追踪哪些 Skills 最有价值以优先维护
- 使用一致的命名约定便于搜索

---

## 常见陷阱与避免

### 陷阱 1：过度工程化
**问题**：为从未遇到的场景构建复杂的边缘处理
**解决**：从实际遇到的用例出发，逐步迭代

### 陷阱 2：描述过于宽泛
**问题**："This skill helps with code" 这样的描述无法有效触发
**解决**：具体说明能力、触发条件和边界

### 陷阱 3：把所有内容塞进一个文件
**问题**：大文件污染上下文窗口
**解决**：使用渐进式加载，SKILL.md 只做索引

### 陷阱 4：忽略越界场景
**问题**：Skill 对不该处理的任务也激活
**解决**：在描述中明确边界，测试越界场景

### 陷阱 5：不做测试
**问题**：部署后发现行为不符合预期
**解决**：构建测试矩阵，覆盖正常、边缘和越界场景

---

## 迭代与改进

Skill 发布后的生命周期：

1. **监控**：观察 Skill 在真实使用中的表现
2. **收集反馈**：用户是否遇到问题？哪里不清楚？
3. **迭代描述**：如果触发不一致 → 改进描述
4. **迭代指令**：如果输出不稳定 → 添加具体性和验证步骤
5. **扩展能力**：根据需要添加新功能

**原则**：最好的 Skills 是通过实践迭代演进的。不要期望第一版就完美。

---

## 参考资源

- [Anthropic Skills 仓库](https://github.com/anthropics/skills)
- [Skill-Creator 模板](https://github.com/anthropics/skills/tree/main/skill-creator)
- [Skills 官方文档](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)
