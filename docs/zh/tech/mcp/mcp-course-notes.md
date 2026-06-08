# MCP 课程笔记：Model Context Protocol 全面指南

> 学习来源：Model Context Protocol 官方文档 https://modelcontextprotocol.io
> 注：原链接 https://claude.com/blog/mcp-course 返回 404，本文档基于官方 MCP 文档整理

## 目录

- [什么是 MCP](#什么是-mcp)
- [核心概念](#核心概念)
- [MCP 架构](#mcp-架构)
- [构建 MCP 服务器](#构建-mcp-服务器)
- [连接客户端](#连接客户端)
- [MCP 的优势](#mcp-的优势)

---

## 什么是 MCP

MCP（Model Context Protocol，模型上下文协议）是一个**开源标准**，用于将 AI 应用连接到外部系统。

通过 MCP，AI 应用（如 Claude 或 ChatGPT）可以连接到：
- **数据源**：本地文件、数据库
- **工具**：搜索引擎、计算器
- **工作流**：专业提示词模板

将 MCP 想象成 AI 应用的 **USB-C 接口**：就像 USB-C 提供了连接电子设备的标准化方式一样，MCP 提供了将 AI 应用连接到外部系统的标准化方式。

### MCP 能做什么？

- AI 助手访问 Google Calendar 和 Notion，成为更个性化的 AI 助理
- Claude Code 根据 Figma 设计稿生成整个 Web 应用
- 企业聊天机器人连接组织内的多个数据库，用户通过聊天分析数据
- AI 模型在 Blender 上创建 3D 设计并通过 3D 打印机打印

---

## 核心概念

### 参与者

MCP 采用**客户端-服务器架构**：

| 角色 | 说明 |
|------|------|
| **MCP Host** | AI 应用（如 Claude Code、Claude Desktop），协调和管理多个 MCP 客户端 |
| **MCP Client** | 维护与 MCP 服务器连接，为 MCP Host 获取上下文 |
| **MCP Server** | 向 MCP 客户端提供上下文的服务程序 |

### 三层架构

MCP 由两层组成：

1. **数据层（Data Layer）**：基于 JSON-RPC 2.0 的交换协议
   - 生命周期管理
   - 服务器功能：工具（Tools）、资源（Resources）、提示（Prompts）
   - 客户端功能：采样（Sampling）、 elicitation（请求用户输入）、日志
   - 通知（Notifications）

2. **传输层（Transport Layer）**：通信机制
   - **Stdio 传输**：使用标准输入/输出流进行本地进程通信，性能最优
   - **Streamable HTTP 传输**：支持远程服务器通信，支持 OAuth 认证

### 核心原语（Primitives）

MCP 服务器可以暴露三种核心原语：

#### Tools（工具）
可执行的函数，AI 应用可以调用以执行操作（文件操作、API 调用、数据库查询等）。

```json
{
  "name": "weather_current",
  "title": "Weather Information",
  "description": "获取全球任意位置的当前天气信息",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "城市名、地址或坐标"
      }
    },
    "required": ["location"]
  }
}
```

#### Resources（资源）
为 AI 应用提供上下文信息的数据源（文件内容、数据库记录、API 响应）。

#### Prompts（提示）
帮助构建与语言模型交互的可复用模板（系统提示、少样本示例）。

---

## MCP 架构

### 架构图

```
┌─────────────────────────────────────┐
│        MCP Host (AI 应用)           │
│  ┌─────────┐ ┌─────────┐          │
│  │ Client1│ │ Client2│  ...      │
│  └───┬────┘ └───┬────┘            │
└──────┼─────────┼──────────────────┘
       │         │
   专用连接    专用连接
       │         │
 ┌─────┴────┐ ┌─┴──────────┐
 │ Server A  │ │ Server B   │
 │ (本地)    │ │ (远程)     │
 │ 文件系统   │ │ Sentry     │
 └──────────┘ └───────────┘
```

### 生命周期管理

MCP 是有状态的协议，需要生命周期管理。目的是协商客户端和服务器都支持的**能力（Capabilities）**。

**初始化握手流程**：

1. 客户端发送 `initialize` 请求，声明支持的协议版本和能力
2. 服务器响应，确认协议版本和服务器能力
3. 客户端发送 `notifications/initialized` 通知表示准备就绪

```json
// 初始化请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-06-18",
    "capabilities": { "elicitation": {} },
    "clientInfo": { "name": "example-client", "version": "1.0.0" }
  }
}
```

### 工具调用流程

1. **发现阶段**：客户端发送 `tools/list` 请求获取可用工具
2. **执行阶段**：客户端通过 `tools/call` 调用特定工具
3. **响应阶段**：服务器返回执行结果

```json
// 工具调用请求
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "weather_current",
    "arguments": { "location": "San Francisco", "units": "imperial" }
  }
}
```

### 通知机制

MCP 支持实时通知，服务器可以在工具列表变化时主动通知客户端。

---

## 构建 MCP 服务器

### 环境准备

**Python 示例**：

```bash
# 安装 uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 创建项目
uv init weather && cd weather
uv venv && source .venv/bin/activate
uv add "mcp[cli]" httpx
```

### Python 服务器示例

```python
from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather")
NWS_API_BASE = "https://api.weather.gov"

async def make_nws_request(url: str) -> dict[str, Any] | None:
    headers = {"User-Agent": "weather-app/1.0", "Accept": "application/geo+json"}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None

@mcp.tool()
async def get_alerts(state: str) -> str:
    """获取美国各州的天气预警"""
    url = f"{NWS_API_BASE}/alerts/active/area/{state}"
    data = await make_nws_request(url)
    if not data or "features" not in data:
        return "无法获取预警"
    return "\n".join([format_alert(f) for f in data["features"]])

@mcp.tool()
async def get_forecast(latitude: float, longitude: float) -> str:
    """获取指定位置的天气预报"""
    points_url = f"{NWS_API_BASE}/points/{latitude},{longitude}"
    points_data = await make_nws_request(points_url)
    if not points_data:
        return "无法获取该位置的预报数据"
    forecast_url = points_data["properties"]["forecast"]
    forecast_data = await make_nws_request(forecast_url)
    if not forecast_data:
        return "无法获取详细预报"
    periods = forecast_data["properties"]["periods"][:5]
    return "\n".join([f"{p['name']}: {p['temperature']}°{p['temperatureUnit']}" for p in periods])

def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()
```

### 日志注意事项

⚠️ **STDIO 传输的服务器**：**禁止**向 stdout 写入日志，会破坏 JSON-RPC 消息！
- Python：使用 `print("...", file=sys.stderr)` 或日志库
- TypeScript：使用 `console.error()` 或日志库

---

## 连接客户端

### Claude Desktop 配置

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`：

**Python 服务器配置**：

```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["--directory", "/ABSOLUTE/PATH/TO/weather", "run", "weather.py"]
    }
  }
}
```

### 支持的客户端

MCP 是开放协议，支持：
- **AI 助手**：Claude、ChatGPT
- **开发工具**：VS Code、Cursor、MCPJam
- 参考：[MCP Clients](https://modelcontextprotocol.io/clients)

---

## MCP 的优势

| 角色 | 价值 |
|------|------|
| 开发者 | 减少开发时间和复杂性，一次构建到处集成 |
| AI 应用 | 访问数据源、工具和应用生态系统 |
| 终端用户 | 获得更强大、更能访问数据的 AI 应用 |

---

## 相关资源

- [MCP 官方文档](https://modelcontextprotocol.io)
- [MCP 规范](https://modelcontextprotocol.io/specification/latest)
- [MCP SDK（多语言）](https://modelcontextprotocol.io/docs/sdk)
- [MCP 服务器参考实现](https://github.com/modelcontextprotocol/servers)
