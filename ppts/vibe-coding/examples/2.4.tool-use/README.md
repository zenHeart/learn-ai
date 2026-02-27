# 2.4 Tool Use (工具调用 / Function Calling)

**一句话核心**：本示例通过运行脚本演示 **Tool Use（工具调用）** 的概念，你将理解模型如何通过“输出意图 + 宿主执行”完成写文件、跑命令等操作，这是 Agent 能力的基石。

---

## 1. 概念简述

大模型本质是“文字接龙”，不会直接算数、联网或改文件。**Tool Use（Function Calling）** 让模型按约定格式输出意图（如“写文件”“执行命令”），由宿主（Cursor、Claude Code 等）在本地执行，再把结果反馈给模型。这样 AI 就能真正改代码、跑测试、查日志，成为 Vibe Coding 中“动手”的基础。

---

## 2. 前置条件

- 已安装 **Node.js 18+**，并在 `ppts/vibe-coding/examples` 根目录执行过 `npm install`。
- 若要在 Cursor/Claude 中体验 Agent 自动执行，需以 `examples` 为工作区根目录打开并启用 Agent 模式。

---

## 3. 操作步骤

### 步骤 A：运行脚本

1. 打开终端，进入：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:2.4`
3. **预期结果**：终端输出与工具调用 / 意图执行相关的演示（如模拟的“模型输出意图 → 宿主执行”流程）。

### 步骤 B：在 Cursor 中体验 Agent 工具调用（可选）

1. 用 Cursor 以 **`ppts/vibe-coding/examples`** 为工作区根目录打开。
2. 打开 **Composer**（`Cmd+I`），选择 **Agent 模式**，输入任务，例如（可直接复制）：
   ```text
   在 2.4.tool-use 目录下创建一个 hello.txt 文件，内容为 "Hello from Tool Use"
   ```
3. **预期结果**：AI 会通过工具调用创建文件或执行命令，你可在资源管理器中看到新文件或终端输出。

### 步骤 C：在 Claude Code 中（可选）

1. 在终端执行：`claude`。
2. 输入任务，例如（可直接复制）：
   ```text
   在 examples/2.4.tool-use 下创建一个 hello.txt，内容写 "Hello from Claude"
   ```
3. **预期结果**：Claude 会使用工具调用来创建文件并确认结果。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `2.4.tool-use/index.ts` | 演示脚本入口，展示 Tool Use 的意图与执行流程 |

---

## 5. 核心要点

- **模型负责“脑”**（生成意图），**宿主负责“手”**（执行写文件、跑命令等）。
- Vibe Coding 中大量代码编辑与终端操作都通过 Function Calling 交给模型调度。
- 权限与安全由宿主控制（如 Cursor/Claude 的写权限、沙箱等）。

---

## 6. 延伸阅读

- **概念延伸**：Tool Use 是 Agent 与“可执行 AI”的核心；实际产品中还会结合 MCP、Skills 等扩展工具集。
- **官方文档**：  
  - Cursor：[Agent 模式 / Composer](https://cursor.com/docs/agent/overview)  
  - Claude Code：[工具调用与自动化](https://code.claude.com/docs/en/overview)。
