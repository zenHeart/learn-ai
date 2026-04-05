# OpenClaw 源码分析

> 本目录深入解析 OpenClaw 源码架构，帮助读者从内部视角理解系统运作原理。

---

## 目录结构

```
source-code/
├── README.md           # 本文件 - 索引
├── architecture.md     # 核心架构总览
├── channels.md        # 通道接入详解
├── agents.md         # 智能体引擎详解
├── sessions.md       # 会话管理详解
├── plugins.md        # 插件系统详解
├── hooks.md          # 钩子系统详解
├── mcp.md           # MCP 协议详解
└── acp.md           # ACP 协议详解
```

---

## 阅读路径建议

### 入门路径

```
1. architecture.md    → 理解整体架构
2. channels.md       → 理解消息如何接入
3. agents.md         → 理解 AI 如何处理
4. sessions.md       → 理解上下文如何管理
```

### 进阶路径

```
1. 先阅读使用文档 ../index.md
2. 再深入源码分析
3. 对照源码 src/ 目录实践
```

### 扩展路径

```
1. plugins.md        → 插件系统
2. hooks.md          → 钩子机制
3. mcp.md            → MCP 协议
4. acp.md            → ACP 协议
```

---

## 核心概念映射

| 文档概念 | 源码目录 | 关键文件 |
|----------|----------|----------|
| Gateway | `src/gateway/` | `server.impl.ts`, `boot.ts` |
| Agent | `src/agents/pi-embedded-runner/` | `run.ts` |
| Session | `src/sessions/` | `session-id.ts`, `session-key-utils.ts` |
| Channel | `src/channels/` | `plugins/index.ts`, `bundled.ts` |
| Skills | `src/agents/skills/` | `skills-runtime.ts`, `loader.ts` |
| Memory | `src/memory-host-sdk/` | `memory-runtime.ts` |
| Cron | `src/cron/` | `service.ts`, `store.ts` |
| Tools | `src/agents/` | `bash-tools.exec.ts`, `bash-tools.ts` |
| Browser Tools | `src/agents/tools/` | `web-tools.ts`, `web-fetch.ts` |
| Config | `src/config/` | `config.ts`, `load.ts` |
| Plugins | `src/plugins/` | `registry.ts`, `runtime.ts` |
| Hooks | `src/hooks/` | `hooks.ts`, `loader.ts` |
| MCP | `src/mcp/` | `channel-server.ts` |
| ACP | `src/acp/` | `client.ts`, `server.ts` |

---

## 源码调试技巧

### 1. 查看 Gateway 日志

```bash
openclaw gateway --verbose
```

### 2. 诊断配置

```bash
openclaw doctor
```

### 3. 查看会话

```bash
openclaw sessions list
openclaw sessions view <session-key>
```

### 4. 测试工具

```bash
openclaw tools test exec -- command "ls"
```

---

## 贡献指南

如果你发现文档与源码不符或有改进建议：

1. 对照源码 `src/` 目录验证
2. 更新对应 Markdown 文件
3. 提交 PR 到 `zenHeart/learn-ai`

---

## 相关链接

- [OpenClaw 官方文档](https://docs.openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [飞书接入指南](../feishu.md)
- [使用手册](../index.md)
