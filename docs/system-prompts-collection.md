# System Prompts 集合学习

> 学习来源: [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)

## 概述

这是一个收集主流 AI 编程工具系统提示词(System Prompts)和内部工具定义的仓库，目前在 GitHub 上获得了大量关注。

## 收录的工具分类

### 编程助手 (Coding Assistants)
| 工具 | 说明 |
|------|------|
| Cursor | AI 代码编辑器 |
| Claude Code | Anthropic 官方 CLI 编程工具 |
| Augment Code | 代码增强工具 |
| CodeBuddy | Facebook 代码助手 |
| Devin AI | AI 软件工程师 |
| Junie | JetBrains AI 编程助手 |
| Kiro | AI 编程工具 |
| Replit | 在线编程平台 |
| Windsurf | AI 代码编辑器 |
| VSCode Agent | VS Code 代理 |
| Z.ai Code | 中文 AI 编程 |
| Xcode | Apple IDE |
| Trae | AI IDE |

### Agent 平台
| 工具 | 说明 |
|------|------|
| Manus | 多用途 AI Agent |
| Lovable | AI 应用构建平台 |
| Same.dev | AI 编程助手 |
| Amp | AI 助手 |
| Cluely | AI 工具 |
| Comet Assistant | Perplexity 编程助手 |
| Emergent | AI Agent |
| Orchids.app | AI 应用 |
| Poke | AI 工具 |
| Qoder | AI 编程 |
| Traycer AI | AI 工具 |

### AI 服务商
| 工具 | 说明 |
|------|------|
| Anthropic | Claude 系列模型 |
| Perplexity | AI 搜索 |
| Google | Gemini 等 |
| Kilo Code | 开源 AI 编程 Agent |

### 文档与笔记
| 工具 | 说明 |
|------|------|
| NotionAI | Notion 智能助手 |
| Dia | 文档 AI |
| v0 | Vercel AI |

### 终端与工具
| 工具 | 说明 |
|------|------|
| Warp.dev | AI 终端 |

## 核心概念

### System Prompt (系统提示词)
定义 AI 角色、行为规范、边界和禁区的文本。每次对话开始前就已存在，决定 AI 的行为逻辑。

### 常见模式

1. **角色定义** - 设定 AI 的身份和专业领域
2. **行为规范** - 定义回复风格、格式要求
3. **边界设定** - 明确禁区、能力边界
4. **工具调用** - 定义可用工具和调用方式

## 学习要点

### 1. Prompt 工程实践
- 清晰指令优于模糊描述
- 角色定义帮助模型理解上下文
- Few-shot 示例提升输出稳定性

### 2. 安全考量
- System Prompt 会被逆向工程获取
- 敏感信息不应放在 System Prompt 中
- 需要防护 Prompt Injection 攻击

### 3. 隐私风险
- 公开的 System Prompt 可能泄露产品策略
- 需注意数据安全和知识产权

## 参考资源

- [GitHub 仓库](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)
- [CSDN 介绍文章](https://blog.csdn.net/2601_95638047/article/details/159641663)

## 更新日志

- 2026-04-12: 初始化文档
