# MCP (Model Context Protocol) 全场景实战指南

欢迎来到 **MCP 实验室**！本指南旨在帮助初学者从零开始，全面掌握 **Model Context Protocol (MCP)** 的核心概念、协议规范、开发逻辑及日常应用场景。

---

## 1. 什么是 MCP？它解决了什么问题？

### 核心定义
**Model Context Protocol (MCP)** 是由 Anthropic 推出的一种开放标准，它为 AI 模型（如 Claude, GPT）与外部数据源及工具之间的交互提供了统一的“通用插座”。

### 核心价值：消除集成碎片化
在 MCP 出现之前，将 AI 集成到特定环境（如 GitHub、本地文件系统、数据库）面临“N×M”问题：
- **过去**：每个 AI 客户端（Cursor, Claude Desktop, IDE）都需要为每个数据源编写特定的集成代码。
- **现在 (MCP)**：你只需编写一个 **MCP Server**，任何支持 MCP 的 **MCP Client**（如 Claude Desktop, Cursor, Zed）都能立即无缝接入。

---

## 2. MCP 核心架构与协议规范

MCP 采用 **“客户端-服务器” (Client-Server)** 架构，其交互逻辑基于 JSON-RPC 2.0。

### 2.1 三大核心支柱 (Core Primitives)
1.  **Resources (资源)**：Server 暴露的**只读数据**。
    -   **场景**：读取日志、查看 API 文档、检索数据库记录。
    -   **特性**：支持 URI 模板，支持订阅（Subscription）以实时获取更新。
2.  **Tools (工具)**：Server 暴露的**可执行函数**。
    -   **场景**：创建 GitHub Issue、执行 Shell 命令、发送 Slack 消息。
    -   **特性**：AI 可以主动调用并获取执行结果，是实现“Agentic Workflow”的关键。
3.  **Prompts (提示词)**：Server 预定义的**交互模板**。
    -   **场景**：代码审查助手、SQL 生成专家。
    -   **特性**：简化复杂任务的上下文构建。

### 2.2 传输层 (Transport)
-   **Stdio (标准输入输出)**：最常用的本地连接方式。Server 作为子进程运行，通过 `stdin/stdout` 通信。
-   **SSE (Server-Sent Events)**：基于 HTTP 的长连接方式，适用于远程或云端服务。

### 2.3 协议生命周期 (Lifecycle)
一个标准的 MCP 连接包含三个阶段：
1.  **初始化 (Initialization)**：
    -   客户端发送 `initialize` 请求，协商协议版本（如 `2024-11-05`）并交换 **Capabilities**（能力集）。
    -   服务器响应其支持的功能（如是否支持工具、资源订阅等）。
    -   客户端发送 `notifications/initialized` 确认连接建立。
2.  **操作 (Operation)**：正常的数据交换与工具调用。
3.  **关闭 (Shutdown)**：优雅地终止连接。

---

## 3. 进阶核心概念

### 3.1 采样 (Sampling)
**Sampling** 允许 Server 反向请求 Client 调用 LLM。
-   **意义**：使 Server 具备“代理能力”（Agentic Behavior）。例如，一个 Server 可以请求 AI 总结它刚刚读取的长文档。
-   **安全**：协议建议在采样过程中引入 **Human-in-the-loop**（人工确认），确保 AI 生成的内容符合预期。

### 3.2 根目录 (Roots)
**Roots** 允许 Client 告知 Server 当前的工作上下文（如项目根目录）。
-   **作用**：帮助 Server 限制操作范围，增强安全性。

### 3.3 安全模型 (Security)
-   **权限控制**：Server 只能访问用户明确授权的资源。
-   **Stdio 安全**：Server 作为子进程运行，继承用户的权限，但无法直接访问 Client 的私有内存。
-   **最佳实践**：始终对 AI 传入的参数进行校验（使用 JSON Schema 或 Zod）。

---

## 4. 日常开发与实战场景

### 场景 A：接入现有的 MCP Server
-   **Claude Desktop**：修改 `%AppData%\Anthropic\Claude\claude_desktop_config.json` (Windows) 或 `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)。
-   **Cursor**：在 `Settings -> Models -> MCP` 中添加新的 Server，指定运行命令（如 `node /path/to/server.js`）。

### 场景 B：编写 MCP Server (Node.js 示例)
本项目 `src/index.js` 展示了标准编写流程：
1.  **SDK 初始化**：使用 `@modelcontextprotocol/sdk/server`。
2.  **定义能力**：在 `listTools` 中声明工具名称及参数 Schema。
3.  **实现逻辑**：在 `callTool` 中处理具体业务。
4.  **错误处理**：使用 `McpError` 返回标准错误码（如 `InvalidParams`, `InternalError`）。

### 场景 C：调试与定位 (Debugging)
-   **禁忌**：**绝对不要在 Stdio 模式下使用 `console.log`**！它会破坏 JSON-RPC 协议流。
-   **正确做法**：使用 `console.error` 输出调试信息，或使用 SDK 提供的日志功能。
-   **神器：MCP Inspector**：
    ```bash
    npx @modelcontextprotocol/inspector node src/index.js
    ```
    它提供了一个 Web 界面，让你在不启动 IDE 的情况下直接测试 Server 的所有功能。

---

## 5. 延伸阅读与深度学习

如果你希望进一步深入 MCP 的底层细节，建议阅读以下资源：

### 官方资源
-   [MCP 官方文档首页](https://modelcontextprotocol.io/)：最权威的入门起点。
-   [MCP 协议规范 (Specification)](https://modelcontextprotocol.io/docs/specification/)：深入了解 JSON-RPC 结构、传输细节及版本演进。
-   [MCP GitHub 仓库](https://github.com/modelcontextprotocol/modelcontextprotocol)：查看 SDK 源码、示例 Server 以及最新的 SEP (Standard Enhancement Proposals)。

### 社区与生态
-   [MCP 官方示例库](https://github.com/modelcontextprotocol/servers)：包含 GitHub, Google Drive, Postgres 等数十个高质量 Server 实现。
-   [Smithery.ai](https://smithery.ai/)：MCP Server 的第三方注册表，方便发现和安装社区工具。
-   [Pulse (MCP Registry)](https://mcp-registry.org/)：另一个优秀的 MCP 生态索引。

### 开发者工具
-   [FastMCP (Python)](https://github.com/jlowin/fastmcp)：如果你更喜欢 Python，这是目前最快构建 MCP Server 的框架。
-   [MCP SDK (Java)](https://github.com/modelcontextprotocol/mcp-sdk-java)：企业级应用的 Java 实现。

---

> **实验建议**：阅读完本指南后，请尝试运行 `examples/mcp-lab` 中的代码，并尝试修改 `src/index.js` 以接入一个新的外部 API。实践是掌握 MCP 的唯一捷径！
