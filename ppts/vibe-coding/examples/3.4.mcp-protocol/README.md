# 3.4 Model Context Protocol (MCP)

## 概念解析
如果大模型是“大脑”，前面的 `Tool Use` 教会了它如何使用“双手”。但如果所有的手都需要 IDE 去硬编码（比如教 Cursor 怎么查数据库、怎么查 Jira、怎么看 Github PR），那工作量是无限的。

**[MCP (模型上下文协议)](https://modelcontextprotocol.io/)** 是 Anthropic 提出并开源的终极杀器：
- 它定义了**标准的 JSON-RPC 发报格式**。
- 所有企业和开发者都可以编写自己的 `MCP Server`（可能是个 Python 脚本连着内网数据库，也可能是个 Node 服务连着 Jira）。
- 然后在任何支持 MCP 的宿主（如 Cursor、Claude Code、Windsurf）中，把这个 Server 的地址配进去。
- 宿主应用会发送 `Initialize` 和 `ListTools` 的标准报文，服务端就把自己的所有工具元数据喂给 AI。

这样，代码助手就实现了无限的本地和网络数据源扩展。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:3.4
```

## 核心要点
* MCP 提供了一种标准化的跨组件通信接口，彻底解决 AI 时代的数据孤岛问题。
