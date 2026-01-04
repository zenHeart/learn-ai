# MCP (Model Context Protocol) 全场景实战指南

欢迎来到 **MCP 实验室**！本指南旨在帮助初学者从零开始，全面掌握 **Model Context Protocol (MCP)** 的核心概念、开发逻辑及日常应用场景。

---

## 1. 什么是 MCP？它解决了什么问题？

### 核心定义
**Model Context Protocol (MCP)** 是由 Anthropic 推出的一种开放标准，它像是一个“通用插座”，允许 AI 模型（如 Claude, GPT）安全、标准地访问外部数据源和工具。

### 解决的问题：碎片化集成
在 MCP 出现之前，如果你想让 AI 访问你的 GitHub、数据库或本地文件，你需要为每个 AI 客户端（Cursor, Claude Desktop, IDE 插件）重复编写集成代码。
- **过去**：N 个 AI 客户端 × M 个数据源 = N*M 个集成工作。
- **现在 (MCP)**：1 个标准协议。你只需编写一个 MCP Server，所有支持 MCP 的客户端都能立即使用它。

---

## 2. MCP 的原理与结构

MCP 采用 **“客户端-服务器” (Client-Server)** 架构：

### 三大核心支柱
1.  **Resources (资源)**：Server 暴露的**只读数据**（如日志文件、数据库记录、API 响应）。AI 可以像读取文件一样读取它们。
2.  **Tools (工具)**：Server 暴露的**可执行函数**（如创建 GitHub Issue、运行一段代码、发送邮件）。AI 可以主动调用它们来改变外部世界。
3.  **Prompts (提示词)**：Server 预定义的**模板**。帮助 AI 更好地理解如何处理特定任务（如“代码审查模板”）。

### 传输层 (Transport)
-   **Stdio (标准输入输出)**：最常用的方式。Server 作为子进程运行，Host 通过 `stdin/stdout` 与其通信。**适合本地工具**。
-   **SSE (Server-Sent Events)**：基于 HTTP。**适合远程或云端服务**。

---

## 3. 日常使用场景详解

### 场景 A：接入现有的 MCP Server
你不需要总是自己写代码。社区已经有很多现成的 Server（如 GitHub, Google Drive, Slack）。
-   **Claude Desktop 接入**：修改 `claude_desktop_config.json`，添加 server 配置即可。
-   **Cursor 接入**：在设置中添加 MCP Server 的运行命令。

### 场景 B：编写你的第一个 MCP Server
本项目提供了一个基于 Node.js 的示例。
1.  **初始化**：使用 `@modelcontextprotocol/sdk`。
2.  **定义工具**：在 `src/index.js` 中定义 `inputSchema`（使用 JSON Schema 或 Zod）。
3.  **实现逻辑**：编写 `CallToolRequestSchema` 的处理器。
4.  **启动传输**：使用 `StdioServerTransport`。

### 场景 C：开发 MCP Server 适配不同 IDE/客户端
MCP 的魅力在于**一次编写，到处运行**。
-   **Gemini CLI**：通过 `gemini-extension.json` 配置文件快速安装。
-   **Claude Desktop**：通过配置文件指定 `node` 运行路径。
-   **VS Code / Cursor**：通常通过插件或设置项直接配置运行命令。

### 场景 D：调试与定位 (Debugging)
这是开发者最常遇到的坑：
1.  **不要使用 `console.log`**：在 Stdio 模式下，`stdout` 被协议占用。使用 `console.log` 会破坏 JSON 协议格式，导致客户端连接失败。
2.  **使用 `console.error`**：这是安全的调试通道。日志会出现在客户端的日志窗口中。
3.  **使用 MCP Inspector**：官方提供的 `mcp-inspector` 工具可以让你在不启动 AI 客户端的情况下，直接在终端测试 Server 的工具和资源。
    -   运行：`npx @modelcontextprotocol/inspector node src/index.js`

---

## 4. 快速上手实验

### 1. 安装依赖
```bash
cd examples/mcp-lab
pnpm install
```

### 2. 运行示例 Server
你可以使用 Inspector 来测试：
```bash
npx @modelcontextprotocol/inspector node src/index.js
```

### 3. 核心代码解析 (`src/index.js`)
-   **Server 实例**：定义名称和版本。
-   **ListTools**：告诉 AI 你有哪些能力。
-   **CallTool**：执行具体的加法或获取时间逻辑。

---

## 5. 进阶：如何让你的 Server 更强大？
-   **错误处理**：使用 `McpError` 返回标准错误码。
-   **输入校验**：使用 `zod` 确保 AI 传入的参数符合预期。
-   **异步操作**：在 Tool 处理器中可以自由使用 `fetch` 或数据库查询。

---

> **练习建议**：尝试在 `src/index.js` 中添加一个 `fetch_joke` 工具，调用一个公开的笑话 API，并在 Claude Desktop 中测试它！
