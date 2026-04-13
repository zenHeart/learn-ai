# Pi Agent

## 简介

Pi Agent 是一个极简主义的 coding agent harness，由开发者 [mariozechner](https://github.com/badlogic)（曾开发 Sitegeist 等项目）历时三年打造。

作者在深度使用 Claude Code、Cursor 等工具后，发现这些工具功能日益臃肿、系统 prompt 和工具频繁变更、行为不可预测。因此他决定打造一个完全透明、**固执己见**（opinionated）且可预测的替代品——如果不需要，就不 built。

## 核心设计理念

### Minimalist Philosophy
> "If I don't need it, it won't be built."

不做不需要的功能。80% 不常用的功能宁可删掉。

### Context Engineering is Paramount
**上下文工程至关重要**。精确控制进入模型 context 的内容，才能得到更好的输出，尤其在写代码场景。现有 harness 在背后注入内容，且在 UI 中完全不 surface——这是不可接受的。

### Full Transparency
完全透明可溯。开发者需要能够检查与模型交互的每个环节，包括 session 格式（可后处理）、替代 UI 构建能力等。

### Opinionated & Predictable
固执且可预测。不做 backwards compatibility 的包袱，API 从一开始就是干净的设计。

## 技术架构

Pi Agent 由 4 个核心包组成，均在 [pi-mono](https://github.com/badlogic/pi-mono) 仓库中维护：

### pi-ai — 统一 LLM API
跨 provider 的统一接口，仅需对接 **4 种 API** 即可覆盖几乎所有 LLM provider：
- OpenAI Completions API
- OpenAI Responses API
- Anthropic Messages API
- Google Generative AI API

**关键特性**：
- 跨 provider context handoff：可在 Anthropic / OpenAI / Google 模型之间无缝切换，thinking traces 会以 `<thinking></thinking>` 标签形式传递
- Token 和成本追踪（best-effort）
- 完整的测试套件，覆盖所有 provider 和热门模型
- 支持自托管（ollama、vLLM、LM Studio 等）
- 同样可在浏览器中运行（感谢 Anthropic 和 xAI 的 CORS 支持）

### pi-agent-core — Agent 循环
处理完整的 agent 编排：处理用户消息、执行 tool calls、反馈结果给 LLM、循环直到模型不再调用 tool。

提供实用的 Agent 类：状态管理、简化的事件订阅、attachment 处理（图片、文档）、transport 抽象（支持直接运行或通过 proxy）。

**故意不做的事**：
- 没有 max steps 限制——循环直到 agent 说完成
- 没有 plan mode
- 没有 MCP support
- 没有 background bash
- 没有 sub-agents
- **YOLO by default**

### pi-tui — 终端 UI 框架
采用**保留模式 UI**（retained mode），区别于 Claude Code/Codex/Droid 的追加写入模式。

**差异化设计**：
- 完整保留终端 scrollback buffer（用户可以使用原生搜索、滚动）
- **微差分渲染**（Differential rendering）：只重绘变化的行
- 使用 ANSI escape sequence `CSI ?2026h/l` 实现同步输出，防止闪烁
- 支持 markdown 渲染和代码高亮

### pi-coding-agent — CLI
整合所有组件，提供完整的 coding agent 体验：

- 多 provider 支持，支持 session 中切换模型
- Session 管理（continue / resume / branching）
- 项目级上下文文件（AGENTS.md），支持从全局到项目级的层级加载
- Slash commands 和自定义模板
- OAuth 认证支持（Claude Pro/Max）

**刻意省略的设计决策**：

| 不做 | 原因 |
|------|------|
| 内置 to-dos | 外部工具更适合 |
| Plan mode | 预测行为不可靠 |
| MCP support | 增加复杂性和不确定性 |
| Background bash | 透明性优先 |
| Sub-agents | 增加不可预测性 |
| YOLO by default | 不做假设，让用户控制 |

## 与现有工具的差异化定位

| 维度 | Claude Code | Cursor | Pi Agent |
|------|-----------|--------|---------|
| 哲学 | 功能丰富 | All-in-one IDE | 极简、可预测 |
| 透明性 | 注入内容不 surface | 中等 | 完全可检查 |
| API 稳定性 | 系统 prompt 频繁变更 | 商业闭源 | 固执设计 |
| 自托管 | 一般 | 不支持 | 良好支持 |
| Context 控制 | 困难 | 困难 | **精确控制** |
| UI 模式 | 追加写入 | GUI | 差分渲染 + scrollback |

## 开发者友好的设计要点

1. **Clean API**：相比 Vercel AI SDK 的"有机演进"式 API，pi-mono 从一开始就是干净设计，没有 backwards compatibility 包袱
2. **Context engineering first**：这是核心洞察——精确控制 context 内容比增加更多 tool 更重要
3. **Structured split tool results**：tool 可以返回 LLM 内容和 UI 显示内容的分离，避免解析文本再重构
4. **Partial JSON parsing**：tool call arguments 流式解析时渐进展示 partial results
5. **Abort 支持**：完整的请求中止支持，包括 tool call 层面
6. **Session 可序列化**：context 可 JSON 序列化/反序列化，支持存储、传输、后续继续
7. **无 max steps 限制**：agent 自己决定何时完成，而不是被步数限制强制中断

## Links

- [GitHub: badlogic/pi-mono](https://github.com/badlogic/pi-mono)
- [pi-coding-agent](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent)
- [pi-ai](https://github.com/badlogic/pi-mono/tree/main/packages/ai)
- [pi-agent-core](https://github.com/badlogic/pi-mono/tree/main/packages/agent)
- [pi-tui](https://github.com/badlogic/pi-mono/tree/main/packages/tui)
- [原文博客](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
