# LangChain：Agent Harness 的解剖学

> 来源：[The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)，作者 Vivek Trivedi

## 核心定义

```
Agent = Model + Harness
如果你不是模型，那你就是 Harness
```

**Harness** 是模型以外的所有代码、配置和执行逻辑。Raw 模型不是 Agent，只有通过 Harness 赋予状态、工具执行、反馈循环和可执行约束后，它才成为 Agent。

---

## 为什么需要 Harness（从模型视角）

模型本身只能接收数据（文本、图片、音频、视频）并输出文本，无法：
- 跨交互维护持久状态
- 执行代码
- 访问实时知识
- 搭建环境完成工作

这些都是 Harness 层要解决的问题。

---

## Harness 核心组件

### 1. 文件系统：持久化存储和上下文管理

模型只能操作上下文窗口内的知识。Harness 通过文件系统抽象解决这个问题：

- **工作区**：Agent 读取数据、代码、文档
- **状态持久化**：存储中间结果，跨 session 保持状态
- **协作接口**：多个 Agent 和人类通过共享文件协调

Git 为文件系统增加了版本控制，支持跟踪工作、回滚错误、分支实验。

### 2. Bash + Code 作为通用工具

更好的方案：给 Agent 一个通用工具如 `bash`，让它自主解决问题，而不是为每个操作预配置工具。

Bash + 代码执行 ≈ 给模型一台电脑，让它自己想办法。这让 Agent 可以动态设计自己的工具，而不是被固定工具集约束。

### 3. 沙箱：执行和验证工作

本地执行 Agent 生成的代码有风险，单一环境也无法scale。

Harness 应连接到沙箱来运行代码、检查文件、安装依赖。沙箱还解锁了 scale：环境按需创建，分配到多个任务，完成后销毁。

好的环境还预装语言运行时、CLI 工具（git、测试框架）、浏览器等。

### 4. 内存与搜索：持续学习

**Filesystem 再次成为核心原语**。Harness 支持 `AGENTS.md` 内存文件标准，在 Agent 启动时注入上下文。Agent 可以编辑这个文件，下个 session 继续使用。

对于知识截止日期后的新信息，用 Web Search 和 MCP 工具（如 Context7）来获取最新库版本或实时数据。

### 5. 对抗 Context Rot

[Context Rot](https://research.trychroma.com/context-rot) 描述模型在上下文窗口填满后性能下降的现象。

| 问题 | Harness 解决方案 |
|------|----------------|
| 上下文快满 | **Compaction**：智能卸载和摘要上下文 |
| 大 Tool 输出 | **Tool Call Offloading**：保留首尾 token，中间存文件系统 |
| 太多工具/MCP 塞满上下文 | **Skills**：渐进式披露，需要时才加载 |

### 6. 长期自主执行

Long-horizon 工作需要：持久状态、规划、观察、验证。

- **Filesystem + Git**：跨 session 跟踪工作
- **Ralph Loops**：拦截模型的退出尝试，重新注入原提示，迫使其继续工作
- **Planning + Self-verification**：模型分解目标，完成每步后自我验证

---

## Model Training 和 Harness Design 的耦合

今天的 Agent 产品（如 Claude Code、Codex）在训练时就把模型和 Harness 放在循环里。这创造了反馈循环：发现有用的原语 → 加入 Harness → 训练下一代模型时使用。

但这也带来泛化问题。**改变工具逻辑会导致模型性能下降**。比如 Codex-5.3 的 `apply_patch` 工具逻辑变更。

这也意味着：**针对特定任务优化的 Harness 可能比模型原生的 Harness 效果更好**。Terminal Bench 2.0 上，同一模型 Opus 4.6 在不同 Harness 中排名差异巨大。

---

## Harness Engineering 的未来方向

1. 协调数百个 Agent 并行工作于共享代码库
2. Agent 分析自己的 traces 来识别和修复 Harness 级别的失败模式
3. Harness 动态组装正确的工具和上下文（JIT），而不是预配置

---

## 总结

> **模型包含智能，Harness 是让智能变得有用的系统。**

Harness Engineering 是一个非常活跃的研究领域。它不仅仅是在修补模型缺陷，而是围绕模型智能构建系统，使其更有效。无论基础模型智能如何，配置良好的环境、正确的工具、持久状态和验证循环都能让任何模型更高效。
