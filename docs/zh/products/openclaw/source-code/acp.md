# ACP Agent Communication Protocol 详解

> **前置知识**：本章节面向具备 TypeScript/Node.js 基础、了解智能体架构的开发者。  
> **目标读者**：需要构建多智能体系统、实现智能体间通信与协作的开发者。  
> **维护状态**：本文档基于 OpenClaw v2026.4+ 编写，ACP 是较新的协议仍在演进中。

---

## 1. ACP 概述

### 1.1 什么是 ACP

ACP (Agent Communication Protocol) 是 OpenClaw 内部的多智能体通信协议，设计用于：

- **多智能体间通信**：多个 OpenClaw 智能体之间的消息路由
- **会话映射**：跨智能体的会话状态同步
- **持久化绑定**：建立智能体之间的稳定通信链路
- **访问策略控制**：细粒度的权限管理

### 1.2 ACP 与其他协议的关系

```mermaid
graph TD
    subgraph 协议栈
        A["ACP\nAgent Communication Protocol"]
        B["MCP\nModel Context Protocol"]
        C["WebSocket\n实时通信"]
        D["HTTP\nAPI 调用"]
    end
    
    A --> C
    B --> C
    B --> D
    
    A -->|"多智能体通信"| E["Agent A ↔ Agent B"]
    B -->|"工具调用"| F["Agent → 外部工具"]
```

| 协议 | 层级 | 用途 |
|------|------|------|
| **ACP** | 应用层 | 多智能体之间的消息传递和协作 |
| **MCP** | 工具层 | AI 模型与外部工具/服务的标准化交互 |
| **WebSocket** | 传输层 | 实时双向通信 |
| **HTTP** | 传输层 | RESTful API 调用 |

---

## 2. ACP 源码结构

### 2.1 核心文件

| 文件 | 职责 |
|------|------|
| `acp/server.ts` | ACP 服务端，处理连接和管理 |
| `acp/client.ts` | ACP 客户端，发起请求 |
| `acp/session.ts` | 会话生命周期管理 |
| `acp/session-mapper.ts` | 会话 ID 映射和路由 |
| `acp/translator.ts` | 消息格式翻译 |
| `acp/policy.ts` | 访问策略引擎 |
| `acp/persistent-bindings.ts` | 持久化绑定存储 |

### 2.2 架构图

```mermaid
graph TD
    subgraph src/acp/
        A["server.ts\n服务端入口"] --> B["client.ts\n客户端"]
        A --> C["session-mapper.ts\n会话映射"]
        A --> D["translator.ts\n消息翻译"]
        A --> E["policy.ts\n策略引擎"]
        A --> F["persistent-bindings.ts\n持久化绑定"]
    end
    
    subgraph 外部调用
        G["Agent A"] -->|"发送消息"| A
        H["Agent B"] -->|"接收消息"| A
    end
```

---

## 3. ACP 工作流程

### 3.1 消息路由流程

```mermaid
sequenceDiagram
    participant A as Agent A
    participant S as ACP Server
    participant M as Session Mapper
    participant P as Policy Engine
    participant B as Agent B
    
    A->>S: ACP 消息<br/>(目标: agent-b, 会话: session-x)
    S->>M: 解析目标会话
    M-->>S: 目标会话信息
    
    S->>P: 验证访问策略
    P-->>S: 允许/拒绝
    
    alt 策略允许
        S->>B: 路由消息到目标 Agent
        B-->>S: 响应消息
        S-->>A: 返回结果
    else 策略拒绝
        S-->>A: 策略拒绝错误
    end
```

### 3.2 会话映射流程

```mermaid
flowchart TD
    A["源 Agent\n(Agent A)"] --> B["解析会话键"]
    B --> C["查询映射表"]
    C --> D{"目标存在?"}
    D -->|"存在"| E["直接路由消息"]
    D -->|"不存在"| F["创建新映射"]
    F --> E
    
    E --> G["目标 Agent\n(Agent B)"]
    G --> H["响应"]
    H --> I["映射表更新"]
```

---

## 4. 实际使用场景

### 4.1 场景一：专家会诊模式

当用户提出复杂问题时，主智能体可以将子任务分发给专业领域的智能体：

```mermaid
flowchart TB
    User["用户"] --> Main["主智能体\n(tars)"]
    
    Main -->|"代码审查"| Coding["代码专家\n(coding-agent)"]
    Main -->|"安全审计"| Security["安全专家\n(security-agent)"]
    Main -->|"性能分析"| Perf["性能专家\n(perf-agent)"]
    
    Coding -->|"审查报告"| Main
    Security -->|"审计报告"| Main
    Perf -->|"分析报告"| Main
    
    Main -->|"综合报告"| User
```

**配置示例**：

```json5
{
  agents: {
    defaults: {
      model: { primary: "anthropic/claude-sonnet-4-5" }
    },
    agents: {
      "coding-agent": {
        workspace: "~/.openclaw/workspaces/coding",
        model: { primary: "anthropic/claude-opus-4-6" }
      },
      "security-agent": {
        workspace: "~/.openclaw/workspaces/security",
        model: { primary: "anthropic/claude-opus-4-6" }
      }
    }
  },
  acp: {
    // 专家智能体配置
    agents: {
      "coding-agent": {
        endpoint: "http://localhost:18789"
      },
      "security-agent": {
        endpoint: "http://localhost:18790"
      }
    }
  }
}
```

### 4.2 场景二：流水线处理

多智能体组成处理流水线，每个智能体负责特定阶段：

```mermaid
flowchart LR
    A["用户输入"] --> B["预处理 Agent"]
    B --> C["分析 Agent"]
    C --> D{"复杂度判断"}
    D -->|"简单"| E["直接回复"]
    D -->|"复杂"| F["深度 Agent"]
    F --> E
    E --> G["用户"]
```

### 4.3 场景三：多通道协调

不同通道的智能体协同工作：

```mermaid
flowchart TB
    subgraph 飞书通道
        F["飞书 Bot\n(feishu-bot)"]
    end
    
    subgraph Telegram 通道
        T["Telegram Bot\n(telegram-bot)"]
    end
    
    subgraph 协调层
        M["协调 Agent\n(coordinator)"]
    end
    
    F -->|"任务上报"| M
    T -->|"任务上报"| M
    M -->|"指令下发"| F
    M -->|"指令下发"| T
```

---

## 5. 会话映射

### 5.1 会话映射类型

| 类型 | 说明 | 使用场景 |
|------|------|----------|
| `session-mapper` | 会话 ID 到目标的映射 | 消息路由 |
| `persistent-bindings` | 持久化绑定关系 | 长期协作关系 |
| `policy` | 访问控制策略 | 权限管理 |

### 5.2 会话键格式

```
# 标准 ACP 会话
acp:<agent-id>:<session-id>

# 跨 Agent 会话
acp:<agent-a>:<session-x>@<agent-b>

# 带通道信息的会话
acp:<agent-id>:<channel>:<peer-id>
```

### 5.3 会话映射配置

```json5
{
  acp: {
    sessionMapping: {
      // 启用会话映射
      enabled: true,
      
      // 映射存储方式
      store: "memory", // 或 "file", "redis"
      
      // 映射过期时间
      ttl: "24h"
    }
  }
}
```

---

## 6. 策略引擎

### 6.1 策略类型

```mermaid
graph TD
    A["访问请求"] --> B["策略引擎"]
    B --> C["allow<br/>允许"]
    B --> D["deny<br/>拒绝"]
    B --> E["prompt<br/>询问"]
    
    C --> F["立即执行"]
    D --> G["返回拒绝错误"]
    E --> H["等待用户确认"]
    H -->|"确认"| F
    H -->|"拒绝"| G
```

### 6.2 策略配置

```json5
{
  acp: {
    policy: {
      // 默认策略
      default: "prompt",
      
      // 按操作类型配置策略
      operations: {
        // 高风险操作：拒绝
        "exec:*": "deny",
        "file:write:*": "deny",
        
        // 中风险操作：询问
        "browser:*": "prompt",
        
        // 低风险操作：允许
        "session:read": "allow",
        "memory:search": "allow"
      },
      
      // 按调用者配置
      callers: {
        "untrusted-agent": {
          default: "deny",
          exceptions: ["memory:read", "session:read"]
        }
      }
    }
  }
}
```

---

## 7. 持久化绑定

### 7.1 绑定类型

| 类型 | 说明 | 生命周期 |
|------|------|----------|
| `lifecycle` | 绑定到智能体生命周期 | 智能体运行期间 |
| `resolve` | 动态解析的绑定 | 每次请求时解析 |
| `persistent` | 持久化存储的绑定 | 跨会话持久化 |

### 7.2 绑定管理

```mermaid
flowchart TD
    A["创建绑定请求"] --> B["策略验证"]
    B --> C{"通过?"}
    C -->|"是"| D["存储绑定"]
    C -->|"否"| E["拒绝"]
    D --> F["返回绑定 ID"]
    F --> G["使用绑定通信"]
```

### 7.3 绑定配置

```json5
{
  acp: {
    persistentBindings: {
      enabled: true,
      
      // 绑定存储
      store: {
        type: "file",      // 或 "memory", "redis"
        path: "~/.openclaw/acp-bindings.json"
      },
      
      // 绑定类型
      types: {
        "lifecycle": {
          autoCleanup: true   // 智能体结束时自动清理
        },
        "persistent": {
          autoCleanup: false   // 需要手动清理
        }
      }
    }
  }
}
```

---

## 8. 消息翻译器

### 8.1 翻译器功能

| 功能 | 说明 |
|------|------|
| `prompt-prefix` | 为跨智能体消息添加上下文前缀 |
| `session-rate-limit` | 跨智能体消息的速率限制 |
| `stop-reason` | 翻译停止原因 |
| `tool-result` | 工具结果的格式转换 |

### 8.2 翻译流程

```mermaid
sequenceDiagram
    participant A as Agent A
    participant T as Translator
    participant B as Agent B
    
    A->>T: 原始消息
    Note over T: 添加上下文前缀<br/>转换格式
    T->>B: 格式化后的消息
    B->>T: 响应消息
    Note over T: 转换响应格式
    T->>A: 格式化后的响应
```

---

## 9. 安全配置

### 9.1 安全机制

```mermaid
graph TD
    A["ACP 请求"] --> B["认证检查"]
    B --> C["策略验证"]
    C --> D["权限检查"]
    D --> E{"全部通过?"}
    E -->|"是"| F["执行"]
    E -->|"否"| G["拒绝"]
```

### 9.2 安全配置

```json5
{
  acp: {
    security: {
      // 认证方式
      auth: {
        type: "token",          // token / mTLS / none
        token: "${ACP_AUTH_TOKEN}"
      },
      
      // 加密传输
      encryption: true,
      
      // 审计日志
      audit: {
        enabled: true,
        destination: "~/.openclaw/logs/acp-audit.jsonl"
      },
      
      // 速率限制
      rateLimit: {
        enabled: true,
        maxRequests: 100,
        windowMs: 60000
      }
    }
  }
}
```

---

## 10. 多 Agent 通信拓扑图

### 10.1 星型拓扑（推荐）

中心 Agent 协调所有通信：

```mermaid
graph TB
    C["协调 Agent\n(Coordinator)"]
    
    A1["飞书 Agent"]
    A2["Telegram Agent"]
    A3["WhatsApp Agent"]
    A4["内部专家 Agent"]
    
    C --> A1
    C --> A2
    C --> A3
    C --> A4
    
    A1 --> C
    A2 --> C
    A3 --> C
    A4 --> C
```

### 10.2 网状拓扑

智能体之间直接通信：

```mermaid
graph TB
    A["Agent A"]
    B["Agent B"]
    C["Agent C"]
    D["Agent D"]
    
    A <--> B
    A <--> C
    B <--> D
    C <--> D
    B <--> C
```

### 10.3 分层拓扑

分层级的智能体结构：

```mermaid
graph TB
    M["管理 Agent\n(Manager)"]
    
    S1["专家 Agent 1"]
    S2["专家 Agent 2"]
    S3["专家 Agent 3"]
    
    W1["工作 Agent 1a"]
    W2["工作 Agent 1b"]
    W3["工作 Agent 2a"]
    W4["工作 Agent 3a"]
    
    M --> S1
    M --> S2
    M --> S3
    
    S1 --> W1
    S1 --> W2
    S2 --> W3
    S3 --> W4
```

---

## 11. 调试 ACP

### 11.1 查看 ACP 状态

```bash
# 查看 ACP 连接
openclaw acp status

# 查看会话映射
openclaw acp sessions list

# 查看策略
openclaw acp policy list

# 查看绑定
openclaw acp bindings list
```

### 11.2 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 消息路由失败 | 会话不存在 | 创建会话映射 `openclaw acp session create` |
| 策略拒绝 | 权限不足 | 更新策略配置 `openclaw acp policy set` |
| 连接超时 | 网络问题或目标 Agent 宕机 | 检查网络配置，确认目标 Agent 正在运行 |
| 绑定丢失 | 存储后端不可用 | 检查存储配置，尝试重建绑定 |

---

## 12. 延伸阅读

- [Gateway 架构](./architecture.md#2-gateway消息中枢)
- [智能体引擎](./agents.md)
- [会话管理](./sessions.md)
- [插件系统](./plugins.md)
- [钩子机制](./hooks.md)
