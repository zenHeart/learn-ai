# Cursor SDK

SDK 让**你的代码**调用和 IDE、CLI、网页里同一套 Agent。本页是**选型 + 第一跑**，不是 API 全文。官方参考：[TypeScript](https://cursor.com/docs/sdk/typescript)、[Python](https://cursor.com/docs/sdk/python)、[Bridge](https://cursor.com/docs/sdk/bridge)。

> 在 Cursor 里跑 **`/sdk`** skill 就能搭脚手架。端到端样例在 [Cursor Cookbook](https://github.com/cursor/cookbook)（`sdk/quickstart`、`sdk/app-builder`、`sdk/agent-kanban`、`sdk/coding-agent-cli`）。

## 先决条件

- **用户**或**服务账号** API key。**Team Admin API key 暂不支持**
- TypeScript：**Node.js 22.13+**。Python：**3.10+**
- 这里的 “local” 指 **Agent 循环和文件在哪**，不是本地模型

## 学习目标

读完本页你能：

1. 在 TypeScript、Python、Bridge、Cloud Agents REST API 之间做选择
2. 不粘参考文档也能创建一个本地 Agent 和一个云端 Agent
3. 避开 Team Admin key 和「本地模型」这个坑
4. 知道花费出现在哪

---

## 走哪条路？

| 路径 | 包 / 二进制 | 什么时候用 |
|------|-------------|------------|
| **TypeScript SDK** | `@cursor/sdk`（`@` 不能省；npm 上没有裸的 `cursor/sdk`） | 你写 TS / JS |
| **Python SDK** | `cursor-sdk` | 你写 Python（同步 + 异步） |
| **SDK Bridge** | `cursor-sdk-bridge` | Go、Rust、Java、C# 或其他语言 — 适配器你自己维护 |
| **Cloud Agents API** | HTTP | 只要**云端** Agent，不要本地运行时 |

语言有一等 SDK 就用 TypeScript 或 Python。Bridge 给 **SDK 作者和平台组**。应用代码应依赖 `@cursor/sdk` 或 `cursor-sdk`。

## Local 和 Cloud 运行时

同一套接口。运行时看你传给 `Agent.create()` 的是 `local` 还是 `cloud`。同一把 `CURSOR_API_KEY`。

| 运行时 | 干什么 | 何时 |
|--------|--------|------|
| **Local** | Agent 循环在你的进程里；文件来自磁盘 | 对着工作树的开发脚本和 CI |
| **Cloud** | 隔离 VM；Cursor 管这些 VM | 调用方没有 checkout、要大量并行、或运行必须在断开后继续 |

**Local ≠ 本地模型。** 两种模式的推理都走 Cursor 托管模型。Local 把文件留在你机器上；Cloud 跑在 Cursor 环境里。

本地 ID 形如 `agent-<uuid>`。云端 ID 形如 `bc-<uuid>`。SDK 拉起的云端 Agent 默认列表里看不到 — 在网页 / Agents Window 用 **Filter > Source > SDK**。

## 认证、计费、隐私

```bash
export CURSOR_API_KEY="your-key"
```

- **用户 API key** — [Dashboard → API Keys](https://cursor.com/dashboard/api)。记在该用户的计划上
- **服务账号 API key** — [Team settings](https://cursor.com/dashboard/team-settings)。记在拥有该账号的团队上
- 交互式宿主可以用 `Cursor.auth.login()` 现领一把（TypeScript）

SDK 运行遵循和 IDE、Cloud Agents 同一套 **定价、请求池、Privacy Mode**。花费出现在 [usage dashboard](https://cursor.com/dashboard/usage) 的 **SDK** 标签下。

## 安装和第一跑（TypeScript）

```bash
npm install @cursor/sdk
```

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  apiKey: process.env.CURSOR_API_KEY!,
  model: { id: "composer-2.5" },
  local: { cwd: process.cwd() },
});

const run = await agent.send("Summarize what this repository does");

for await (const event of run.stream()) {
  console.log(event);
}
```

云端变体（还是 `Agent.create`，把 `local` 换成 `cloud`）：

```typescript
const agent = await Agent.create({
  apiKey: process.env.CURSOR_API_KEY!,
  model: { id: "composer-2.5" },
  cloud: {
    repos: [{ url: "https://github.com/your-org/your-repo", startingRef: "main" }],
    autoCreatePR: true,
  },
});
```

一次性助手：`Agent.prompt(...)` 创建、发送、等待、销毁。

**默认本地 Agent 会直接跑工具（shell、edit、write），不问你。** 无头模式没有人在回路里的确认。要用 [hooks](https://cursor.com/docs/sdk/typescript.md#hooks) 或 `local.sandboxOptions.enabled: true` 拦住。

Composer 2 已退役。SDK 里还传 `composer-2` / `composer-2-fast` 的请求会在鉴权时**改道到 Composer 2.5**。

## Python 一段就够

```bash
pip install cursor-sdk
```

```python
import os
from cursor_sdk import Agent, LocalAgentOptions

with Agent.create(
    model="composer-2.5",
    api_key="crsr_key",
    local=LocalAgentOptions(cwd=os.getcwd()),
) as agent:
    print(agent.send("Summarize what this repository does").text())
```

异步必须显式用 `AsyncClient` / `AsyncClient.launch_bridge(...)`。**没有**全局默认异步客户端。不要在同一条路径里混用同步和异步客户端。

## 核心概念（够你去读参考）

| 概念 | 含义 |
|------|------|
| **Agent** | 持久句柄：对话、工作区、设置。跨多次 prompt 还在 |
| **Run** | 一次 `send()`。自己的流、状态、结果、取消 |
| **SDKMessage** | 规范化的流事件；本地和云端形状一样 |

按 id 恢复：`Agent.resume("bc-…")`（前缀区分云端 / 本地）。内联 MCP **不会**跨 resume 持久化 — 再传一次，或用 `.cursor/mcp.json`。

无仓库云端 Agent（`cloud: { repos: [] }`）必须在账号 / 团队上启用。仓库范围的 API key 创建不了它们。

## Bridge（其他语言）

Bridge 是**本地服务器**，内嵌 TypeScript SDK，通过 **Connect / protobuf**（`sdk.v1`）走 **HTTP/1.1**。经典 HTTP/2 gRPC **连不上**。

钉死一个和 TS / Python SDK 版本对应的 [GitHub release](https://github.com/cursor/sdk-bridge/releases)。两把密钥：`CURSOR_API_KEY`，以及 ready-line 握手拿到的**进程级 bearer**。

官方支持：`sdk.v1` proto、独立的 `cursor-sdk-bridge` 二进制、一等 TS / Python SDK。社区适配器的版本和安全由**你**负责。

## 什么时候用

- CI 自动修、分诊工人、审查一遍、产品内嵌 Agent、编排器（官方 cookbook 列举）
- 上面已经选好 Cloud 还是 local

人在终端里就用 [Cursor CLI](./cursor-cli)。不想写宿主进程时，用 [Cloud Agents](./cloud-agents) 界面 / `@cursor`。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| `npm install cursor/sdk` | 包名是 **`@cursor/sdk`** |
| 以为 “local” 是本地 LLM | 两种模式都是托管模型 |
| Team Admin API key | 只用用户或**服务账号** |
| 把本页当 API | 打开 [TypeScript](https://cursor.com/docs/sdk/typescript) / [Python](https://cursor.com/docs/sdk/python) 参考 |
| 单文件 `bun build --compile` 还用默认入口 | 用 `@cursor/sdk/bundled`（官方） |
| Python 同步 + 异步客户端混用 | 显式 `AsyncClient` |
| 用经典 gRPC 打 Bridge | Connect + HTTP/1.1 |
| 以为 SDK 云端运行会出现在默认 Agent 列表 | 过滤 **Source > SDK** |

## 下一步

- 上面的官方 TS / Python / Bridge 页 — 完整 `send` 选项、store、Router（`auto-smart` + `optimize_for`）、artifacts、`getUsage()`
- [Cloud Agents](./cloud-agents) — `cloud` 运行时用的那台 VM
- [Cursor CLI](./cursor-cli) — 同一 Agent，没有宿主进程
- [github.com/cursor/cookbook](https://github.com/cursor/cookbook) — 可跑样例
