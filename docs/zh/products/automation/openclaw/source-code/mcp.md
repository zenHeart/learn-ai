# MCP Model Context Protocol 详解

> 本章详解 OpenClaw 对 MCP (Model Context Protocol) 协议的支持与实现。

---

## 1. MCP 概述

### 1.1 什么是 MCP

MCP (Model Context Protocol) 是一种标准化协议，允许 AI 模型与外部工具和服务进行交互。

```mermaid
graph LR
    A["MCP Client"] --> B["MCP Server"]
    B --> C["本地工具"]
    B --> D["远程服务"]
    
    subgraph OpenClaw
        E["MCP 集成"] --> B
    end
```

### 1.2 MCP 在 OpenClaw 中的位置

```mermaid
graph TD
    subgraph OpenClaw
        A["Gateway"] --> B["MCP 集成层"]
        B --> C["MCP Server"]
    end
    
    subgraph 外部
        D["Claude Desktop"] -.-> C
        E["其他 MCP Client"] -.-> C
    end
    
    C --> F["工具服务"]
    F --> G["exec"]
    F --> H["browser"]
    F --> I["文件操作"]
```

---

## 2. MCP 源码结构

### 2.1 核心文件

| 文件 | 职责 |
|------|------|
| `mcp/channel-server.ts` | MCP 服务端 |
| `mcp/channel-bridge.ts` | 通道桥接 |
| `mcp/channel-tools.ts` | MCP 工具 |
| `mcp/plugin-tools-serve.ts` | 插件工具服务 |

### 2.2 架构图

```mermaid
graph TD
    subgraph mcp/
        A["channel-server.ts"] --> B["channel-bridge.ts"]
        B --> C["channel-tools.ts"]
        C --> D["plugin-tools-serve.ts"]
    end
```

---

## 3. MCP 工作流程

### 3.1 消息流程

```mermaid
sequenceDiagram
    participant C as MCP Client
    participant S as MCP Server
    participant P as Plugin Tools
    participant OC as OpenClaw
    
    C->>S: 初始化连接
    S-->>C: 连接确认
    
    C->>S: 请求工具列表
    S->>P: 获取工具
    P-->>S: 工具列表
    S-->>C: 工具列表
    
    C->>S: 调用工具
    S->>OC: 路由请求
    OC->>OC: 执行工具
    OC-->>S: 结果
    S-->>C: 工具结果
```

### 3.2 工具调用流程

```mermaid
flowchart TD
    A["MCP 请求"] --> B["解析请求"]
    B --> C["验证参数"]
    C --> D{"工具存在?"}
    D -->|"是"| E["执行工具"]
    D -->|"否"| F["返回错误"]
    E --> G["收集结果"]
    G --> H["返回响应"]
```

---

## 4. MCP 配置

### 4.1 启用 MCP

```json5
{
  mcp: {
    enabled: true,
    port: 18790,  // MCP 服务端口
    host: "127.0.0.1"
  }
}
```

### 4.2 MCP 服务器配置

```json5
{
  mcp: {
    servers: {
      "my-server": {
        command: "npx",
        args: ["-y", "@my/mcp-server"],
        env: {
          "API_KEY": "xxx"
        }
      }
    }
  }
}
```

---

## 5. MCP 工具

### 5.1 内置 MCP 工具

| 工具 | 说明 |
|------|------|
| `mcp__file__read` | 读取文件 |
| `mcp__file__write` | 写入文件 |
| `mcp__exec__run` | 执行命令 |
| `mcp__browser__navigate` | 浏览器导航 |

### 5.2 工具注册

```mermaid
graph TD
    A["插件注册工具"] --> B["MCP 工具注册"]
    B --> C["工具清单"]
    C --> D["MCP Client 查询"]
```

---

## 6. MCP 安全

### 6.1 安全机制

```mermaid
graph TD
    A["MCP 请求"] --> B{"来源验证?"}
    B -->|"合法"| C["权限检查"]
    B -->|"非法"| D["拒绝"]
    
    C --> E{"工具权限?"}
    E -->|"有权限"| F["执行"]
    E -->|"无权限"| G["拒绝"]
```

### 6.2 安全配置

```json5
{
  mcp: {
    security: {
      // 允许的来源
      allowedOrigins: ["https://claude.ai"],
      
      // 工具权限
      toolPermissions: {
        "file:*": ["read"],
        "exec:*": []
      }
    }
  }
}
```

---

## 7. MCP 与工具系统的关系

### 7.1 对比

| 特性 | MCP | OpenClaw Tools |
|------|-----|----------------|
| 协议 | 标准化 MCP | 内部协议 |
| 用途 | 外部集成 | 内部执行 |
| 客户端 | Claude Desktop | OpenClaw |
| 服务端 | OpenClaw | 各提供商 |

### 7.2 集成架构

```mermaid
graph LR
    A["Claude Desktop"] -->|"MCP"| B["OpenClaw"]
    B -->|"内部"| C["Tools"]
    
    D["其他 MCP Client"] -->|"MCP"| B
```

---

## 8. 调试 MCP

### 8.1 查看 MCP 状态

```bash
# 查看 MCP 连接状态
openclaw mcp status

# 列出可用 MCP 工具
openclaw mcp tools list
```

### 8.2 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接失败 | 端口被占用 | 更改 MCP 端口 |
| 工具不可用 | 未注册 | 检查插件状态 |
| 权限错误 | 权限配置 | 更新安全配置 |

---

## 9. 延伸阅读

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [OpenClaw MCP 支持](https://docs.openclaw.ai/mcp)
- [工具系统](./agents.md#4-工具执行)
