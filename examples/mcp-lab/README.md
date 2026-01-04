# Model Context Protocol (MCP) 入门实战指南

本指南旨在帮助开发者从零开始掌握 **Model Context Protocol (MCP)**。通过本教程，你将理解 MCP 的核心价值，并具备构建、调试及部署 MCP Server 的工程能力。

---

## 1. 概览

### 什么是 MCP？
**Model Context Protocol (MCP)** 是由 Anthropic 推出的开放标准，旨在解决 AI 模型与外部工具/数据源集成时的碎片化问题。

### 为什么需要它？
在 MCP 出现之前，将 AI 集成到不同环境（如 GitHub、本地文件系统）需要为每个客户端（Claude Desktop, Cursor 等）重复编写代码。
- **痛点**：N 个客户端 × M 个数据源 = N*M 次集成。
- **方案**：**一次编写，到处运行**。只需构建一个 MCP Server，即可适配所有支持 MCP 的客户端。

---

## 2. 核心概念

理解以下三个支柱是掌握 MCP 的关键：

| 概念 | 类型 | 说明 | 典型场景 |
| :--- | :--- | :--- | :--- |
| **Resources** | 只读数据 | 类似文件的只读上下文 | 读取日志、API 文档、数据库记录 |
| **Tools** | 可执行函数 | AI 可调用的功能逻辑 | 创建 Issue、执行代码、发送消息 |
| **Prompts** | 交互模板 | 预定义的提示词结构 | 代码审查助手、SQL 生成专家 |

### 传输机制 (Transport)
- **Stdio**：Server 作为子进程运行，通过标准输入输出通信。**最适合本地开发**。
- **SSE (Server-Sent Events)**：基于 HTTP，适用于远程或云端部署。

---

## 3. 快速上手：构建你的第一个 MCP Server

本仓库提供了一个基于 Node.js 的示例项目。请按照以下步骤操作：

### 3.1 环境准备
确保已安装 Node.js (v18+) 和 pnpm。
```bash
cd examples/mcp-lab
pnpm install
```

### 3.2 核心代码解析 (`src/index.js`)
一个标准的 MCP Server 包含以下逻辑：
1. **初始化**：使用 `@modelcontextprotocol/sdk` 创建 Server 实例。
2. **声明能力**：在 `listTools` 回调中定义工具的名称、描述及参数 Schema。
3. **实现逻辑**：在 `callTool` 回调中根据工具名称执行具体代码。

### 3.3 运行与测试
使用官方提供的 **MCP Inspector** 进行交互式测试，无需启动 IDE：
```bash
npx @modelcontextprotocol/inspector node src/index.js
```
*运行后，在浏览器打开显示的 URL，即可手动触发工具调用并查看响应。*

---

## 4. 工程实践：接入与调试

### 4.1 接入主流客户端
#### Claude Desktop
修改配置文件（macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`）：
```json
{
  "mcpServers": {
    "my-lab-server": {
      "command": "node",
      "args": ["/绝对路径/to/learn-ai/examples/mcp-lab/src/index.js"]
    }
  }
}
```

#### Cursor
在 `Settings -> Models -> MCP` 中点击 `+ Add New MCP Server`：
- **Name**: `mcp-lab`
- **Type**: `command`
- **Command**: `node /绝对路径/to/src/index.js`

### 4.2 调试技巧 (Critical)
- **禁用 `console.log`**：在 Stdio 模式下，`stdout` 用于传输协议数据。任何额外的输出都会导致连接崩溃。
- **使用 `console.error`**：这是安全的日志通道，输出内容会显示在客户端的日志窗口中。
- **参数校验**：始终使用 `zod` 或 JSON Schema 校验 AI 传入的参数，防止执行异常。

---

## 5. 进阶探索

### 5.1 协议高级特性
- **Sampling**：允许 Server 请求 Client 调用 LLM（实现 Agent 嵌套）。
- **Roots**：Client 告知 Server 当前工作目录，用于权限隔离。
- **Lifecycle**：理解 `initialize` -> `initialized` 的握手过程。

### 5.2 延伸阅读
- [MCP 官方文档](https://modelcontextprotocol.io/)：协议规范与 SDK 参考。
- [MCP Server 仓库](https://github.com/modelcontextprotocol/servers)：学习官方实现的 GitHub、Postgres 等 Server。
- [Smithery.ai](https://smithery.ai/)：发现社区优秀的 MCP 工具。

---

## 6. 实验任务
1. 运行示例代码并成功调用 `add` 工具。
2. 修改 `src/index.js`，添加一个 `get_weather` 工具（可返回模拟数据）。
3. 在 Claude Desktop 中观察 AI 如何自动选择并调用你新写的工具。
