---
title: Pi Agent 设计哲学
description: 极简代码 Agent 的「不做什么」清单：四个 API、四个工具、不到 1000 token 的系统提示，以及用文件与 CLI 替代内置功能的取舍。
domain: tech
tags: [tech, course-notes, legacy, agent, minimalism]
navOrder: 81
topicId: course-notes-pi-agent
layer: appendix
status: legacy
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Pi Agent 设计哲学

> 源码：[badlogic/pi-mono](https://github.com/badlogic/pi-mono)，来自 @badlogic 的博客文章。文中数字（token 数、工具数、基准名次）归属原文。

## 核心观点

构建 Agent 的核心理念：**"如果我不需要它，它就不会被构建。"** Pi 是一个极简代码 Agent，专注控制感与可观测性，而非功能堆砌。

## pi-ai：统一 LLM API

- **四大 API 搞定一切**：OpenAI Chat / OpenAI Responses / Anthropic Messages / Google Generative AI
- **Context Handoff**：为跨 Provider 上下文迁移设计（如 Anthropic 的 thinking traces 迁移到 OpenAI 时转为 `<thinking>` 文本标签）
- **Structured Split Tool Results**：Tool 返回拆为 LLM 部分（纯文本/JSON）与 UI 部分（结构化数据 + 附件），UI 渲染与 LLM 上下文各取所需
- **极简 Agent Loop**：不提供 max steps 参数，循环直到模型输出非 Tool Call 响应

## pi-coding-agent：极简代码 Agent

**极简 System Prompt + 四个工具**（整个 System Prompt + Tools 不到 1000 tokens）：

| 工具 | 用途 |
| --- | --- |
| `read` | 读取文件内容 |
| `write` | 创建/覆盖文件 |
| `edit` | 精确替换（oldText 必须完全匹配） |
| `bash` | 执行命令行 |

**YOLO by Default**：默认无权限检查、无安全护栏。作者观点：一旦 Agent 能写代码并执行代码，「安全护栏」基本是安全 theater；真正的保护是网络/容器隔离。

**不做这些（Opinionated No）**：

| 不做的功能 | 原因与替代 |
| --- | --- |
| 内置 To-Do | 增加模型需跟踪的状态 → 用 `TODO.md` 文件 |
| Plan Mode | 自然语言协作够了 → 持久规划写 `PLAN.md` |
| MCP 支持 | MCP Server 太大（原文举例：21 工具 / 13.7k tokens）→ 用带 README 的 CLI 工具按需加载 |
| 后台 Bash | → 用 tmux |
| Sub-Agent | → 用 bash 启动新 pi session |

## pi-tui：追加模式 UI

两种 TUI 模式：全屏模式（接管终端视口，代表 Amp、opencode）vs 追加模式（像普通 CLI 追加内容，代表 Claude Code、Codex、pi）。Pi 选追加模式，复用终端原生滚动与搜索；差分渲染（找到第一行差异处从那里重绘）+ ANSI 同步输出序列防闪烁。

## 关键设计原则

1. **控制 > 功能**：保持对所有交互的完全可观测性
2. **极简 > 堆砌**：不加不需要的功能
3. **Token 效率**：渐进式上下文加载，避免 context rot
4. **YOLO 信任**：默认信任用户，用容器做隔离
5. **工具即 CLI**：不用 MCP，用带 README 的命令行工具按需加载

## 与主线的关系

「极简工具集够用」「上下文渐进加载」的观点与主线 [Agent 运行时](../../04-action/agent-runtime/)、[上下文工程](../../01-contracts/context)互为印证；其 MCP 取舍是单作者立场，与主线 [MCP](../../04-action/protocols/mcp) 的协议视角对照阅读更有价值。
