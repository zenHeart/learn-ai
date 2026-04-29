# Agent Harness 剖析

> 原文：[The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) — Vivek Trivedy

## 核心公式

```
Agent = Model + Harness
```

如果不是在设计模型，那就在设计 Harness。

**Harness** 是将模型转化为工作引擎的所有代码、配置和执行逻辑。模型提供智能，Harness 让智能变得有用。

## 模型做不到的事

模型（大多数）只能输入文本/图像/音频/视频，输出文本。天生无法：

- 在交互间维持持久状态
- 执行代码
- 访问实时知识
- 搭建环境来完成任务

这些全部是 Harness 层解决的。

## 核心组件

### 1. 文件系统（持久存储 & 上下文管理）

模型只能操作上下文窗口内的知识。Harness 提供文件系统抽象，让 Agent：

- 拥有工作空间，读取数据、代码、文档
- 将中间结果存储到磁盘而非全部塞进上下文
- 跨 session 保持状态
- 多 Agent / 人类通过共享文件协作

**Git** 为文件系统增加了版本控制，Agent 可追踪工作、回滚错误、分支实验。

### 2. Bash + 代码（通用工具）

Harness 提供 Bash 工具，让模型能自主编写和执行代码来解决问题，而不需要预定义的每一个工具。

ReAct Loop：`推理 → 行动 → 观察 → 重复`

代码执行是实现自主问题求解的默认通用策略。

### 3. 沙箱 & 验证工具

模型无法自己配置执行环境。Harness 负责：

- **沙箱**：隔离、安全的代码执行环境，按需创建/销毁
- **预装工具**：语言运行时、Git、测试框架、浏览器
- **自验证循环**：Agent 写代码 → 运行测试 → 检查日志 → 修复错误

### 4. 记忆 & 搜索（持续学习）

模型的知识截止于训练数据。Harness 通过文件系统实现**持续学习**：

- `AGENTS.md` 等记忆文件在 Agent 启动时注入上下文
- Web Search / MCP (如 Context7) 获取训练后产生的新知识

### 5. 对抗 Context Rot

Context Rot：上下文窗口填充后，模型推理和完成任务的能力下降。

Harness 的主要工作就是**传递好的上下文工程**。

| 策略 | 说明 |
|------|------|
| **压缩 (Compaction)** | 上下文快满时，智能卸载和摘要已有内容 |
| **工具输出卸载** | 大工具输出只保留首尾 token，完整内容存文件系统 |
| **Skills** | 渐进式加载工具，避免启动时上下文过载 |

### 6. 长期自主执行

复杂任务需要跨越多个上下文窗口的规划、观察和验证。

- **Ralph Loop**：拦截模型的退出尝试，在干净上下文中重新注入原始 Prompt，强迫 Agent 继续工作
- **规划**：将目标分解为步骤，通过 Prompt 和文件系统中的计划文件引导
- **自验证**：Agent 完成后自行检查正确性，或通过测试套件创建反馈循环

## 模型训练 & Harness 设计的耦合

Claude Code、Codex 等产品采用 **post-training**：模型和 Harness 在循环中共同训练。

这创造了反馈循环：发现有用原语 → 加入 Harness → 用于训练下一代模型。

**有趣的副作用**：改变工具逻辑会导致模型性能下降——这是 Harness 层面的过拟合。

> 但这不意味着模型预训练用的 Harness 就是最优的。Terminal Bench 2.0 上，Opus 4.6 在 Claude Code 中得分远低于在其他 Harness 中——纯粹改变 Harness 就能让一个 Agent 从 Top 30 提升到 Top 5。

## Harness 的未来

随着模型能力增强，部分 Harness 功能会被吸收进模型本身。但：

> 正如 Prompt Engineering 今天仍然有价值，Harness Engineering 仍将是构建好 Agent 的关键。

Harness 不只是补丁模型缺陷的工具，更是**围绕模型智能构建系统**的工程化手段。

## 对前端 AI 学习的启发

| Harness 组件 | 前端场景 |
|---|---|
| 文件系统 | 工作区管理、跨项目上下文 |
| 沙箱 | 本地开发环境、Docker 隔离 |
| 自验证 | 自动化测试、Playwright E2E |
| Context 管理 | Cursor Rules、上下文注入策略 |
| Skills | VitePress 插件、浏览器扩展 |

## 相关文章

- [Agent 设计模式](./agent-design-patterns.md)
- [MCP 协议](../protocols/mcp.md)
- [Skills 机制](./skills.md)
- [Hooks 模式](./hooks.md)
