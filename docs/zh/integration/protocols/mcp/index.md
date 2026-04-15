# 模型上下文协议 (MCP) 入门指南

**模型上下文协议 (MCP)** 是将 AI 模型连接到外部工具和数据的开放标准。

> **类比**: MCP 就像 AI 应用的 **USB-C 接口** —— 正如 USB-C 提供了连接电子设备的标准化方式，MCP 提供了将 AI 应用连接到外部系统的标准化方式。

## MCP 能做什么？

| 场景 | 示例 |
|------|------|
| **个人助手** | AI 可以访问你的 Google Calendar 和 Notion，成为更个性化的助手 |
| **开发提效** | Claude Code 可以根据 Figma 设计稿生成整个 Web 应用 |
| **企业数据** | AI 聊天机器人可以连接企业多个数据库，用户用自然语言分析数据 |
| **创意工具** | AI 模型可以在 Blender 中创建 3D 设计并打印 |

## MCP 生态支持

MCP 是一个开放协议，支持广泛的客户端和服务端：

- **AI 助手**: Claude, ChatGPT
- **开发工具**: VS Code, Cursor, JetBrains, Zed
- **更多客户端**: [查看完整列表](https://modelcontextprotocol.io/clients.md)

## 核心概念

MCP 服务器可以提供三种类型的能力：

| 能力类型 | 说明 | AI 控制权 |
|----------|------|-----------|
| **Tools (工具)** | AI 可以主动调用的函数 | 模型控制 |
| **Resources (资源)** | 只读数据，如文件内容、数据库 schema | 应用控制 |
| **Prompts (提示)** | 预置的指令模板 | 用户控制 |

```
┌─────────────────────────────────────────────────────┐
│                    MCP Host (AI 应用)                │
│  ┌──────────────────────────────────────────────┐  │
│  │  MCP Client                                   │  │
│  │  • 管理与 Server 的连接                      │  │
│  │  • 将 Tools/Resources/Prompts 提供给 AI      │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
    ┌────────────┐ ┌────────────┐ ┌────────────┐
    │   Tools    │ │ Resources  │ │  Prompts   │
    │ (工具)     │ │ (资源)     │ │ (提示模板) │
    └────────────┘ └────────────┘ └────────────┘
           │              │              │
           ▼              ▼              ▼
    AI 可调用     AI 可读取       AI 可加载
    (需用户确认)  (只读)         预置模板
```

## 通信流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant Host as MCP Host<br/>(Claude Desktop / Cursor)
    participant Client as MCP Client<br/>(Host 内置)
    participant Server as MCP Server<br/>(Node.js / Python)

    User->>+Host: 输入自然语言 Prompt
    Host->>+Client: 启动并连接 Server
    Client->>+Server: initialize (JSON-RPC)
    Server-->>-Client: 返回 capabilities
    Client->>+Server: tools/list
    Server-->>-Client: 返回工具列表 (JSON Schema)
    Client->>+Server: resources/list
    Server-->>-Client: 返回资源列表 (URI templates)

    Host->>+Client: 将 system prompt + 工具定义 + 用户输入发给 LLM
    LLM-->>-Host: 返回回复 + 可选的工具调用意图
    Host->>+Client: 构建 tools/call 请求
    Client->>+Server: CallToolRequest (JSON-RPC over Stdio)
    Server-->>-Client: CallToolResult (JSON-RPC over Stdout)
    Client->>+Host: 注入结果到 LLM 上下文
    Host->>+User: 生成并展示最终回复
```

## 分步实现

### 1. 服务器设置

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// 初始化 MCP Server
const server = new Server(
  {
    name: "my-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // 我们提供工具能力
    },
  }
);
```

### 2. 定义工具

你需要定义 **Schema**（AI 看到什么）和 **Handler**（运行什么代码）。

```typescript
// 定义可用的工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "calculate_sum",
        description: "将两个数字相加",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number", description: "第一个数字" },
            b: { type: "number", description: "第二个数字" },
          },
          required: ["a", "b"],
        },
      },
    ],
  };
});
```

### 3. 处理工具调用

```typescript
// 当 AI 调用工具时执行逻辑
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "calculate_sum") {
    // 使用 Zod 验证输入
    const schema = z.object({ a: z.number(), b: z.number() });
    const { a, b } = schema.parse(args);

    return {
      content: [
        {
          type: "text",
          text: `结果是 ${a + b}`,
        },
      ],
    };
  }

  throw new Error(`未知工具: ${name}`);
});
```

### 4. 连接传输

MCP 通常通过 **Stdio**（标准输入/输出）用于本地应用，或 **SSE**（服务器发送事件）用于远程应用。

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // 注意: 写入 stderr，不要写入 stdout！
  console.error("MCP Server running on Stdio");
}

main();
```

## ⚠️ Stdio 日志最佳实践

> **绝对不要**向 `stdout` 写入日志！`stdout` 用于 JSON-RPC 消息，写入会破坏协议。

```typescript
// ❌ 错误 (stdio 模式下)
console.log("Processing request");  // 会破坏 JSON-RPC 消息！

// ✅ 正确 (写入 stderr)
console.error("Processing request");  // 安全，写入错误流

// ✅ 正确 (使用日志库)
import pino from "pino";
const logger = pino({ level: "info" });
logger.info("Processing request");  // 默认写入 stderr
```

## 客户端集成模式

### 选项 A: Claude Desktop（最简单）

将此添加到你的 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "my-lab-server": {
      "command": "node",
      "args": ["/absolute/path/to/learn-ai/examples/mcp-lab/src/index.js"]
    }
  }
}
```

### 选项 B: 自定义客户端（高级）

如果你正在构建自己的 AI 应用（例如使用 LangChain），你可以充当 MCP 客户端。

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["./my-server.js"],
});

const client = new Client(
  { name: "my-client", version: "1.0.0" },
  { capabilities: {} }
);

await client.connect(transport);

// 列出可用工具
const { tools } = await client.listTools();

// 调用工具
const result = await client.callTool({
  name: "calculate_sum",
  arguments: { a: 10, b: 20 },
});
```

## 安全最佳实践

1. **输入验证**: 始终使用 Zod 验证参数。AI 可能会产生类型幻觉。
2. **路径遍历**: 如果创建文件系统工具，确保用户无法访问 `../../etc/passwd`。
3. **只读默认值**: 在允许写入/删除操作之前，先从只读工具开始。

## 下一步

- **[深入理解 MCP 架构](./architecture.md)**: 协议分层、Proxy 模式、完整时序图分析。
- **[MCP Lab 示例](../../../examples/mcp-lab/)**: 在本地运行完整代码。
- **[官方构建服务器指南](https://modelcontextprotocol.io/docs/develop/build-server)**: Python/Node.js 实战教程。
