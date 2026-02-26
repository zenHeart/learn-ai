# 3.4 Model Context Protocol (MCP)

**一句话核心**：本示例通过「运行脚本 + 配置 MCP Server」演示 **MCP（模型上下文协议）** 如何让 AI 通过标准接口连接数据库、API 等外部数据源，实现即插即用扩展。

---

## 1. 概念简述

若所有“双手”都要 IDE 硬编码（如教 Cursor 怎么查库、查 Jira），工作量无限。[MCP（Model Context Protocol）](https://modelcontextprotocol.io/) 定义了**标准 JSON-RPC**：任何人可编写 MCP Server（如连内网数据库、Jira 的脚本），在支持 MCP 的宿主（Cursor、Claude Code）中配置地址即可。宿主发送 `Initialize`、`ListTools`，服务端把工具元数据交给 AI，从而实现无限的数据源扩展。

---

## 2. 前置条件

- 已安装 **Cursor** 或 **Claude Code**，以及 **Node.js 18+**（用于 `npx` 运行 MCP Server）。
- 本示例运行 `npm run demo:3.4` 可看脚本演示；若要真实调用 MCP，需按下面步骤配置并确保有可用 MCP Server（如 Postgres 需本地有 Postgres 或 mock）。

---

## 3. 操作步骤

### 步骤 A：运行脚本（可选）

1. 打开终端，进入：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:3.4`
3. **预期结果**：终端输出与 MCP 协议或工具列表相关的演示说明。

### 步骤 B：在 Cursor 中配置 MCP Server（可选）

1. 打开 Cursor，进入 **Settings > Features > MCP**。
2. 点击 **Add new MCP server**，按需填写，例如：
   - **Name**：`postgres`
   - **Type**：`command`
   - **Command**：`npx -y @modelcontextprotocol/server-postgres`（需本地有 Postgres 或使用官方示例 Server）
3. 保存后，在 Chat 中可通过 `@postgres` 调用该 Server 提供的工具。
4. **预期结果**：输入 `@postgres` 后能看到该 Server 暴露的工具列表，并可发起查询（若 Server 与数据源已就绪）。
5. **项目级配置**：Cursor 也支持在项目根目录创建 **`.cursor/mcp.json`** 配置 MCP Server，便于随仓库版本化管理；具体格式见 [Cursor MCP 文档](https://cursor.com/docs/context/mcp)。

### 步骤 C：在 Claude Code 中配置 MCP（可选）

1. 创建或编辑 `~/.claude/settings.json`，在 `mcpServers` 中增加配置，例如（可直接复制）：
   ```json
   {
     "mcpServers": {
       "postgres": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-postgres"]
       }
     }
   }
   ```
2. 重启 Claude Code。
3. 在对话中使用 MCP 工具进行数据库等操作。
4. **预期结果**：Claude 能列出并调用已配置的 MCP Server 工具。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `3.4.mcp-protocol/index.ts` | 演示脚本入口 |

---

## 5. 核心要点

- MCP 提供**标准化**的跨组件通信接口，解决 AI 时代的数据孤岛问题。
- 一次编写 MCP Server，可在 Cursor、Claude Code、Windsurf 等宿主中复用。
- 配置方式：Cursor 可在 **Settings > MCP** 中配置，或在项目根创建 **`.cursor/mcp.json`**（见官方文档）；Claude 在 `settings.json` 的 `mcpServers` 或项目 `.claude/mcp.json` 中配置。

---

## 6. 延伸阅读

- **概念延伸**：MCP 可与 Skills、Rules 组合使用，例如“分析 /docs 设计稿 + 查 Jira PRD”这类跨数据源任务。
- **官方文档**：  
  - [MCP 标准指南](https://modelcontextprotocol.io/docs/getting-started/intro)  
  - Cursor：[MCP](https://cursor.com/docs/context/mcp)  
  - Claude Code：[Configure MCP Servers](https://code.claude.com/docs/en/build-with-claude-code/configure-mcp-servers)
- **本课程材料**：可结合 `ppts/vibe-coding/tool-feature.md` 中「MCP」与各工具 Feature Matrix 做扩展阅读。
