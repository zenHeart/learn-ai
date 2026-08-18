# Grok Connectors

> 官方定义（[docs.x.ai/grok/connectors](https://docs.x.ai/grok/connectors)）：
> "Connectors are available to all Grok users and let Grok access your external tools and data sources directly within a conversation. Search your email, browse files in cloud storage, check your calendar, and more without leaving the chat."
>
> 对位 [Claude Connectors](../claude/connectors.md)。本页是**聊天**里的 connector 目录。不是 Grok Build 的 MCP（`grok mcp add`），也不是 Grok Bot 的 Plugins。

## 目标与非目标

**写给谁：** 想在 grok.com 对话里读邮件、Drive、日历，或接自定义 MCP 的人。

**目标：** 列出官方三种类型、内置表、Business 管理员门槛、本地隧道规则。

**非目标：** 再写一遍 MCP 协议教程、臆造目录条目，或 Grok Build 的 `[mcp_servers]` 配置（那是 [grok-cli.md](./grok-cli.md) / [cookbook](./grok-cookbook.md)）。

## 三种类型

[connectors](https://docs.x.ai/grok/connectors)：

| 类型 | 谁维护 | 怎么加 |
|------|--------|--------|
| **Built-in** | xAI，原生 OAuth | [grok.com/connectors](https://grok.com/connectors) → **New Connector** → 选服务 → OAuth |
| **Catalog** | 更多第三方服务的预配置 OAuth | 同一页浏览目录。官方文档没有冻死完整名单 |
| **Custom MCP** | 你（公网 MCP 服务器） | **New Connector** → **Custom** → MCP 服务器 URL + 认证 |

连上之后，问题跟该服务相关时，Grok 可以自动调用它的工具。本页没有写「每个对话再勾选一次」。

### 内置 connectors

官方表（[connectors](https://docs.x.ai/grok/connectors)）：

| Connector | 连什么 |
|-----------|--------|
| **Gmail & Google Calendar** | Gmail 邮件与 Google Calendar 日程 |
| **Google Drive** | Google Drive 文件、Docs、Sheets、Slides |
| **OneDrive** | Microsoft OneDrive 个人存储 |
| **Outlook Mail & Calendar** | Outlook 邮件与日历 |
| **Microsoft Teams** | Microsoft Teams 消息、频道、聊天 |
| **SharePoint** | Microsoft SharePoint 站点与文档库 |
| **Salesforce** | Salesforce CRM — 浏览对象、查询、创建与更新记录 |

### 自定义 MCP connectors

官方能力（[connectors](https://docs.x.ai/grok/connectors)）：

- 把内部 API、数据库或 SaaS 工具暴露给 Grok。
- 自定义工具的 schema 与逻辑。
- 认证和访问控制放在你自己的基础设施上。

MCP 服务器**必须能从公网访问**。`localhost` 与 RFC1918 地址（`127.0.0.1`、`10.x`、`172.16.x`、`192.168.x`）会被**拒绝**（[custom-mcp-tunneling](https://docs.x.ai/grok/connectors/custom-mcp-tunneling)）。

该页的隧道形状：

```text
Grok ──► https://your-tunnel.example.com ──► tunnel provider ──► localhost:3001
```

官方举例：**ngrok**（`ngrok http 3001`）和 **Cloudflare Tunnel**（`cloudflared tunnel --url http://localhost:3001`）。Cloudflare **quick** tunnel **不支持 SSE**——服务器走 SSE 就用 ngrok。Streamable HTTP 在 Cloudflare 上没问题。

免费档隧道 URL 多半是临时的。重启 → 新 URL → 在 Grok 里删掉旧 connector 再加新的。本地服务器要一直开着；Grok 按需调用。

## Business 与 Enterprise

[connectors](https://docs.x.ai/grok/connectors)：

> For Grok Business and Enterprise users, a team admin must first provision a connector in the [cloud console](https://docs.x.ai/grok/connector-management) before it is available to members of the organization.

管理员路径（[connector-management](https://docs.x.ai/grok/connector-management)）：[console.x.ai](https://console.x.ai) → 团队 → **Grok Business → Connectors**。增删需要 **Team Read-Write**。

1. **+ Add Connector** 从目录选，或 **Other** + MCP URL。
2. 部分 Microsoft / Salesforce 还要管理员同意。管理页指向 SharePoint、OneDrive、Salesforce 的专项指南。
3. 管理员开通之后，成员仍要在 [grok.com/connectors](https://grok.com/connectors) 连接**自己的**账号。
4. **Remove** 对全队删除；与该 connector 相关的索引数据可能被清掉。

个人（非 Business）账号没有管理员这一步。

## 不是这些 connectors

| 看起来像 | 其实是 |
|----------|--------|
| Grok 聊天 Connectors | 本页 |
| Grok Build MCP | `grok mcp add` / `~/.grok/config.toml` 的 `[mcp_servers]` — 工具名带 `<server>__<tool>` |
| Grok Bot「Plugins」 | [Grok Bot](./grok-bot.md) Settings → Plugins；`@` 挂上 |
| Voice API 的 `mcp` 工具 | `wss://api.x.ai/v1/realtime` 上的服务端 MCP（[Voice](./grok-voice.md)） |

## 常见陷阱

- 自定义 connector 填 `http://localhost:3001`。官方会拒。
- Business 成员在管理员开通之前就指望看到 Gmail。
- 把 Grok Build 的 MCP 配置抄到 grok.com。产品不同，宿主不同。
- SSE MCP 服务器走 Cloudflare quick tunnel。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [docs.x.ai/grok/connectors](https://docs.x.ai/grok/connectors) | 三种类型 + 内置表 |
| [docs.x.ai/grok/connector-management](https://docs.x.ai/grok/connector-management) | Business 管理员开通 |
| [docs.x.ai/grok/connectors/custom-mcp-tunneling](https://docs.x.ai/grok/connectors/custom-mcp-tunneling) | 公网 URL / 隧道 |
| [grok.com/connectors](https://grok.com/connectors) | 用户侧添加 / 连接 |
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | 聊天能力里的 Connectors |

## 相关页面

- [Grok 聊天](./grok-chat.md)
- [Grok Business](./grok-business.md) — 必须先由管理员开通
- [Grok Build cookbook](./grok-cookbook.md) — CLI MCP，不是这个
- [Grok Bot](./grok-bot.md)
- [Grok 学习地图](./index.md)
