# 路径 1: 使用 AI 工具

掌握 AI 编程助手，使用 Cursor, Copilot, Claude CLI 和 Gemini CLI 将编码速度提升 2-3 倍。

## 概览

这条学习路径将把你从传统开发者转变为**AI 增强型工程师**，编码速度提升 2-3 倍。你将掌握最强大的 AI 编程助手，并学习编写生成生产级质量代码的提示词。

**你将获得**:
- ⚡️ **编码速度提升 2-3 倍**，通过 AI 自动补全和生成
- 🐛 **几分钟内调试**而不是几小时，通过 AI 辅助
- 📚 **快速学习新代码库**，通过 AI 解释
- ✨ **瞬间生成样板代码**（组件、测试、配置）

## AI 编程工具概览

在深入之前，了解 **AI 编程辅助的 5 个层级**：

| 层级 | 能力 | 示例工具 |
|-------|------------|---------------|
| **L1** | 代码级补全 | GitHub Copilot, Tabby |
| **L2** | 任务级代码生成 | Cursor, Claude CLI, Copilot Chat, Continue |
| **L3** | 项目级生成 | v0, Sweep, Pythagora |
| **L4** | PRD 到生产环境 | bolt.new, Lovable, Devin |
| **L5** | AI 开发团队 | MetaGPT, AutoDev |

**本路径专注于 L1-L2** —— 即前端工程师日常使用的工具。

<script setup>
const pathSteps = [
  {
    phase: '第 1 周',
    title: '工具设置与初次提示',
    description: '选择你的主要工具 (Cursor, Copilot, 或 Claude CLI) 并学习编写有效的代码生成提示词。',
    status: 'active',
    links: [
      { text: 'Cursor 指南', url: '/zh/products/ai-coding/cursor' },
      { text: 'Copilot 指南', url: '/zh/products/ai-coding/copilot' },
      { text: 'Claude CLI', url: '/zh/products/ai-coding/claude-cli' },
      { text: 'Gemini CLI', url: '/zh/products/ai-coding/gemini-cli' }
    ]
  },
  {
    phase: '第 1 周',
    title: '高效提示工程',
    description: '学习 CRISP 框架 (上下文、需求、输入/输出、风格、陷阱) 以生成生产级代码。',
    status: 'active',
    links: [
      { text: '提示工程', url: '/zh/tech/prompt/' },
      { text: 'Copilot 案例', url: '/zh/tech/prompt/cases/copilot' }
    ]
  },
  {
    phase: '第 2 周',
    title: '高级模式',
    description: '掌握迭代优化、上下文加载和多文件操作。生成符合你代码库风格的代码。',
    status: 'active',
    links: [
      { text: 'AI 编程工具', url: '/zh/products/ai-coding/' },
      { text: '其他工具', url: '/zh/products/ai-coding/othertools' }
    ]
  },
  {
    phase: '第 2 周',
    title: '真实项目',
    description: '将 AI 编程应用于实际开发任务：表单构建器、API 客户端和综合测试套件。',
    status: 'active',
    links: [
      { text: '下一步: 路径 2', url: '/zh/paths/integration' }
    ]
  }
]
</script>

<LearningPath
  title="路径 1: <span>使用 AI 工具</span>"
  subtitle="掌握 AI 编程助手，将编码速度提升 2-3 倍。"
  :steps="pathSteps"
/>

## 下一步

**准备好添加 AI 功能了吗？** → [路径 2: 集成](./integration.md)

**探索所有工具？** → [AI 编程工具](../products/ai-coding/)