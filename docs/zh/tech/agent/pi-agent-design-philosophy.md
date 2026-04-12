# Pi Agent 设计哲学

> 源码：[mariozechner/pi-mono](https://github.com/badlogic/pi-mono)，来自 @badlogic 的博客文章

## 核心观点

构建 Agent 的核心理念：**"如果我不需要它，它就不会被构建。"**

Pi 是一个极简的代码 Agent，专注于控制感和可观测性，而非功能堆砌。

---

## pi-ai：统一 LLM API

### 四大 API 搞定一切

本质上只需要对接 4 个 API：

- OpenAI Chat API
- OpenAI Responses API
- Anthropic Messages API
- Google Generative AI API

### Context Handoff（跨模型上下文迁移）

Pi-ai 从一开始就是为跨 Provider 上下文迁移设计的。例如从 Anthropic 切换到 OpenAI 时，Anthropic 的 thinking traces 会转换为 `<thinking></thinking>` 标签包裹的文本。

### Structured Split Tool Results

Tool 返回结果分为两部分：
- **LLM 部分**：纯文本或 JSON
- **UI 部分**：结构化数据 + 附件（图片等）

这种分离让 UI 渲染和 LLM 上下文各取所需，避免用文本解析来构建 UI。

### 极简 Agent Loop

Agent Loop 不提供 `max steps` 这类参数——只管循环直到模型输出非 Tool Call 的响应。`pi-agent-core` 在此基础上提供：状态管理、事件订阅、消息队列、附件处理。

---

## pi-coding-agent：极简代码 Agent

### 极简 System Prompt

```
You are an expert coding assistant. You help users with coding tasks by reading files, executing commands, editing code, and writing new files.

Available tools:
- read: Read file contents
- bash: Execute bash commands
- edit: Make surgical edits to files
- write: Create or overwrite files

Guidelines:
- Use bash for file operations like ls, grep, find
- Use read to examine files before editing
- Use edit for precise changes (old text must match exactly)
- Use write only for new files or complete rewrites
- Be concise in your responses
- Show file paths clearly when working with files
```

整个 System Prompt + Tools 不到 1000 tokens。

### 极简 Toolset（四个工具）

| 工具 | 用途 |
|------|------|
| `read` | 读取文件内容 |
| `write` | 创建/覆盖文件 |
| `edit` | 精确替换（oldText 必须完全匹配） |
| `bash` | 执行命令行 |

**结论：4 个工具足以构建一个高效的代码 Agent。**

### YOLO by Default

Pi 默认运行在完全 YOLO 模式：无权限检查、无安全护栏、无预检查命令。

作者认为：一旦 Agent 能写代码并执行代码，"安全护栏"基本是安全 theater。真正的保护只有通过网络隔离实现，而这会让 Agent 变得无用。所以默认 YOLO，用容器来隔离。

### 不做这些（Opinionated No）

| 不做的功能 | 原因 |
|-----------|------|
| 内置 To-Do | To-Do 增加模型需要跟踪的状态，引入了更多出错机会 |
| Plan Mode | 协作式思考用自然语言就够了，持久规划写文件 |
| MCP 支持 | MCP Server 太大（21 工具 / 13.7k tokens），改用 CLI 工具 + README 按需加载 |
| 后台 Bash | 用 tmux 代替，tmux 本身就能管理后台进程 |
| Sub-Agent | 需要时用 `bash` 启动新的 pi session，不内置 |

### 替代方案

- **To-Do**：用 `TODO.md` 文件代替
- **Plan**：用 `PLAN.md` 文件代替
- **MCP**：构建带 README 的 CLI 工具，Agent 按需读取（渐进式加载 token）
- **后台进程**：用 tmux 管理
- **Sub-Agent**：用 bash 启动新的 pi session + tmux

---

## pi-tui：保留模式 UI

### 两种 TUI 模式

| 模式 | 特点 | 代表 |
|------|------|------|
| 全屏模式 | 接管整个终端视口，像像素缓冲区一样处理 | Amp、opencode |
| 追加模式 | 像普通 CLI 一样追加内容，只在需要更新时回写 | Claude Code、Codex、pi |

Pi 选择追加模式，复用终端原生的滚动和搜索功能。

### 差分渲染（Differential Rendering）

渲染算法：
1. 首次渲染：直接输出所有行
2. 宽度改变：清屏重绘
3. 正常更新：找到第一行差异处，光标移到那行，从那里重绘到最后

用 ANSI 同步输出序列（CSI ?2026h/l）防止闪烁。

---

## 性能基准

Terminal-Bench 2.0 结果：Pi + Claude Opus 4.5 排名靠前，与内置 Agent 原生提示的模型竞争。

---

## 关键设计原则

1. **控制 > 功能**：保持对所有交互的完全可观测性
2. **极简 > 堆砌**：不加不需要的功能
3. **Token 效率**：渐进式上下文加载，避免 context rot
4. **YOLO 信任**：默认完全信任用户，用容器做隔离
5. **工具即 CLI**：不用 MCP，用带 README 的命令行工具按需加载
