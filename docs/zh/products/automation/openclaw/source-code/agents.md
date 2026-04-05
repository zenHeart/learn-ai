# Agents 智能体引擎详解

> 本章详解 OpenClaw 的智能体核心——如何接收消息、调用模型、执行工具、返回结果。

---

## 1. Agent 循环概述

### 1.1 完整生命周期

```mermaid
flowchart TD
    A["接收消息"] --> B["参数验证"]
    B --> C["会话解析"]
    C --> D["技能加载"]
    D --> E["上下文组装"]
    E --> F["系统提示构建"]
    F --> G["模型推理"]
    G --> H{"需要工具?"}
    H -->|"是"| I["工具执行"]
    I --> G
    H -->|"否"| J["生成回复"]
    J --> K["流式输出"]
    K --> L["持久化"]
    L --> M["返回结果"]
```

### 1.2 源码文件对应

| 阶段 | 主要文件 | 关键函数 |
|------|----------|----------|
| 入口 | `pi-embedded-runner/run.ts` | `runEmbeddedPiAgent()` |
| 模型 | `pi-embedded-runner/model.ts` | `resolveModelAsync()` |
| 上下文 | `pi-embedded-runner/compaction-*.ts` | 上下文压缩 |
| 工具 | `pi-embedded-runner/run/attempt.ts` | `runEmbeddedAttempt()` |
| 输出 | `pi-embedded-runner/stream-*.ts` | 流式处理 |

---

## 2. 上下文组装

### 2.1 上下文组成

```mermaid
graph TD
    A["模型输入"] --> B["系统提示"]
    A --> C["对话历史"]
    A --> D["技能定义"]
    A --> E["记忆上下文"]
    A --> F["工具模式"]
    A --> G["用户消息"]
    
    B --> H["AGENTS.md"]
    B --> I["SOUL.md"]
    B --> J["USER.md"]
```

### 2.2 系统提示构建流程

```mermaid
sequenceDiagram
    participant A as Agent
    participant F as 文件系统
    participant M as 模型
    
    A->>F: 读取 AGENTS.md
    A->>F: 读取 SOUL.md
    A->>F: 读取 USER.md
    A->>F: 加载 skills/*.md
    A->>F: 读取记忆
    
    A->>A: 组装系统提示
    A->>M: 发送请求
```

---

## 3. 模型选择

### 3.1 多模型配置

```mermaid
graph TD
    A["请求"] --> B{"主模型可用?"}
    B -->|是| C["使用主模型"]
    B -->|否| D["尝试备用1"]
    D -->|失败| E["尝试备用2"]
    D -->|成功| F["使用备用1"]
    E -->|成功| G["使用备用2"]
    E -->|失败| H["返回错误"]
```

### 3.2 模型配置示例

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: [
          "openai/gpt-4",
          "anthropic/claude-haiku"
        ]
      }
    }
  }
}
```

### 3.3 提供商配置

```json5
{
  models: {
    providers: {
      anthropic: {
        apiKey: "${ANTHROPIC_API_KEY}",
        baseUrl: "https://api.anthropic.com"
      },
      openai: {
        apiKey: "${OPENAI_API_KEY}"
      }
    }
  }
}
```

---

## 4. 工具执行

### 4.1 工具调用流程

```mermaid
flowchart TD
    A["模型决定调用工具"] --> B["解析工具参数"]
    B --> C["验证工具权限"]
    C --> D{"安全检查"}
    D -->|"通过"| E["执行工具"]
    D -->|"拒绝"| F["返回错误"]
    E --> G["收集结果"]
    G --> H["返回模型"]
```

### 4.2 内置工具

| 工具 | 文件 | 功能 |
|------|------|------|
| `exec` | `tools/exec.ts` | 执行系统命令 |
| `browser` | `tools/browser.ts` | 网页浏览 |
| `file_read` | `tools/file-*.ts` | 文件读取 |
| `file_write` | `tools/file-*.ts` | 文件写入 |
| `search` | `web-search-*.ts` | 网页搜索 |

### 4.3 exec 工具安全

```mermaid
graph TD
    A["exec 调用"] --> B{"security 模式?"}
    
    B -->|"allowlist"| C["检查白名单"]
    C -->|"在列表中"| D["执行"]
    C -->|"不在列表中"| E{"ask?"}
    E -->|"on-miss"| F["请求用户批准"]
    E -->|"never"| G["拒绝执行"]
    
    B -->|"deny"| H["直接拒绝"]
    
    D --> I["结果返回"]
    F --> I
    G --> J["权限错误"]
```

### 4.4 工具权限配置

```json5
{
  tools: {
    exec: {
      enabled: true,
      security: "allowlist",
      ask: "on-miss",
      allowlist: ["ls", "cat", "grep", "git"],
      safeBins: ["jq", "sed"]
    }
  }
}
```

---

## 5. 上下文压缩

### 5.1 压缩触发条件

```mermaid
graph TD
    A["对话进行"] --> B{"上下文大小?"}
    B -->|"< 50% 窗口"| C["继续"]
    B -->|"50% - 80%"| D["警告"]
    B -->|"> 80%"| E["触发压缩"]
```

### 5.2 压缩流程

```mermaid
sequenceDiagram
    participant A as Agent
    participant M as 模型
    participant F as 文件系统
    
    Note over A: 上下文超限
    A->>M: 请求压缩
    M-->>A: 压缩指令
    A->>F: 写入重要信息到 MEMORY.md
    A->>A: 精简历史
    A->>A: 继续对话
```

### 5.3 手动压缩

```
/compact Focus on decisions and open questions
```

---

## 6. 子智能体

### 6.1 子智能体架构

```mermaid
graph TD
    subgraph 父 Agent
        A["主任务"]
    end
    
    subgraph 子 Agent
        B["子任务1"]
        C["子任务2"]
        D["子任务3"]
    end
    
    A --> B
    A --> C
    A --> D
    B --> A
    C --> A
    D --> A
```

### 6.2 配置示例

```json5
{
  agents: {
    defaults: {
      subagents: {
        enabled: true,
        maxDepth: 3,
        timeoutMs: 60000
      }
    }
  }
}
```

---

## 7. 会话管理

### 7.1 会话状态

```mermaid
graph TD
    A["新消息"] --> B{"会话存在?"}
    B -->|"是"| C["加载上下文"]
    B -->|"否"| D["创建会话"]
    C --> E["继续对话"]
    D --> E
    
    E --> F["处理消息"]
    F --> G["保存状态"]
```

### 7.2 会话范围

| 值 | 隔离级别 | 场景 |
|------|----------|------|
| `main` | 所有 DM 共享 | 单用户默认 |
| `per-peer` | 按发送者 | 多用户 |
| `per-channel-peer` | 通道+发送者 | **推荐多用户** |
| `per-account-channel-peer` | 账户+通道+发送者 | 多账户 |

---

## 8. 流式输出

### 8.1 流式处理流程

```mermaid
sequenceDiagram
    participant A as Agent
    participant M as 模型
    participant G as Gateway
    participant C as Channel
    participant U as 用户
    
    A->>M: 发送请求
    M-->>A: 流式响应
    A-->>G: 转发流
    G-->>C: 实时推送
    C-->>U: 逐字显示
```

### 8.2 渲染模式

```json5
{
  channels: {
    feishu: {
      renderMode: "raw"  // 默认纯文本
    }
  }
}
```

> ⚠️ 注意：飞书建议使用 `raw` 模式，避免流式输出导致协议不匹配。

---

## 9. 错误处理与重试

### 9.1 重试策略

```mermaid
graph TD
    A["请求失败"] --> B{"错误类型?"}
    
    B -->|"限流"| C["等待后重试"]
    B -->|"认证"| D["切换模型"]
    B -->|"上下文超限"| E["压缩重试"]
    B -->|"网络"| F["指数退避"]
```

### 9.2 错误类型

| 类型 | 处理方式 |
|------|----------|
| `rate_limit` | 等待后重试 |
| `auth_error` | 切换认证文件 |
| `context_overflow` | 触发压缩 |
| `network_error` | 指数退避 |

---

## 10. 调试与监控

### 10.1 查看运行日志

```bash
# 实时查看 Agent 日志
openclaw gateway --verbose

# 查看特定会话
openclaw sessions view <session-id>
```

### 10.2 关键指标

| 指标 | 说明 |
|------|------|
| 模型延迟 | 请求到响应的时间 |
| 工具调用次数 | 解决问题的工具数 |
| 上下文大小 | 消耗的 token 数 |
| 压缩次数 | 触发压缩的次数 |

---

## 11. 延伸阅读

- [Gateway 架构](./architecture.md#3-agents智能体引擎)
- [会话管理](./sessions.md)
- [工具系统](../index.md#7-工具tools)
- [安全配置](../index.md#87-安全实践)
