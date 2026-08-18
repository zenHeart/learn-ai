# Grok Connectors

> Official definition ([docs.x.ai/grok/connectors](https://docs.x.ai/grok/connectors)):
> "Connectors are available to all Grok users and let Grok access your external tools and data sources directly within a conversation. Search your email, browse files in cloud storage, check your calendar, and more without leaving the chat."
>
> Analog: [Claude Connectors](../claude/connectors.md). This page is the **chat** connector catalog. It is not Grok Build MCP (`grok mcp add`) and not Grok Bot plugins.

## Goals and non-goals

**Audience:** people who want Grok to read mail, Drive, calendar, or a custom MCP server **inside grok.com chat**.

**Goals:** list the three official kinds, the built-in table, the Business admin gate, and the local-tunnel rule.

**Non-goals:** a second MCP protocol tutorial, invented catalog entries, or Grok Build `[mcp_servers]` config (that is [grok-cli.md](./grok-cli.md) / [cookbook](./grok-cookbook.md)).

## Three kinds

[connectors](https://docs.x.ai/grok/connectors):

| Kind | Who maintains it | How you add it |
|------|------------------|----------------|
| **Built-in** | xAI, native OAuth | [grok.com/connectors](https://grok.com/connectors) → **New Connector** → pick the service → OAuth |
| **Catalog** | Pre-configured OAuth for more third-party services | Same page; browse the catalog. Official docs do not freeze a full name list |
| **Custom MCP** | You (public MCP server) | **New Connector** → **Custom** → MCP server URL + auth |

Once connected, Grok can use the connector's tools automatically when the question relates to that service. No extra per-chat toggle is documented on this page.

### Built-in connectors

Official table ([connectors](https://docs.x.ai/grok/connectors)):

| Connector | What it connects |
|-----------|------------------|
| **Gmail & Google Calendar** | Gmail messages and Google Calendar events |
| **Google Drive** | Google Drive files, Docs, Sheets, and Slides |
| **OneDrive** | Microsoft OneDrive personal storage |
| **Outlook Mail & Calendar** | Outlook email and calendar events |
| **Microsoft Teams** | Microsoft Teams messages, channels, and chats |
| **SharePoint** | Microsoft SharePoint sites and document libraries |
| **Salesforce** | Salesforce CRM — explore objects, query records, create and update |

### Custom MCP connectors

Official capabilities ([connectors](https://docs.x.ai/grok/connectors)):

- Expose any internal API, database, or SaaS tool to Grok.
- Define your own tools with custom schemas and logic.
- Control authentication and access on your own infrastructure.

The MCP server **must be reachable over the public internet**. `localhost` and RFC1918 addresses (`127.0.0.1`, `10.x`, `172.16.x`, `192.168.x`) are **rejected** ([custom-mcp-tunneling](https://docs.x.ai/grok/connectors/custom-mcp-tunneling)).

Tunnel pattern from that page:

```text
Grok ──► https://your-tunnel.example.com ──► tunnel provider ──► localhost:3001
```

Official examples: **ngrok** (`ngrok http 3001`) and **Cloudflare Tunnel** (`cloudflared tunnel --url http://localhost:3001`). Cloudflare **quick** tunnels do **not** support SSE — if your server uses SSE, use ngrok. Streamable HTTP is fine on Cloudflare.

Tunnels are temporary on free tiers. Restart → new URL → remove the old connector and add the new one. Keep the local server running; Grok calls it on demand.

## Business and Enterprise

[connectors](https://docs.x.ai/grok/connectors):

> For Grok Business and Enterprise users, a team admin must first provision a connector in the [cloud console](https://docs.x.ai/grok/connector-management) before it is available to members of the organization.

Admin path ([connector-management](https://docs.x.ai/grok/connector-management)): [console.x.ai](https://console.x.ai) → team → **Grok Business → Connectors**. Adding/removing needs **Team Read-Write**.

1. **+ Add Connector** from the catalog, or **Other** + MCP URL.
2. Some Microsoft / Salesforce connectors need extra admin consent. The management page points at service-specific guides for SharePoint, OneDrive, and Salesforce.
3. After the admin provisions it, members still connect **their own** accounts on [grok.com/connectors](https://grok.com/connectors).
4. **Remove** deletes it for the team; indexed data associated with the connector may be removed.

Personal (non-Business) accounts skip the admin step.

## Not these connectors

| Looks similar | Actually is |
|---------------|-------------|
| Grok chat Connectors | This page |
| Grok Build MCP | `grok mcp add` / `[mcp_servers]` in `~/.grok/config.toml` — tools namespaced `<server>__<tool>` |
| Grok Bot "Plugins" | [Grok Bot](./grok-bot.md) Settings → Plugins; `@` to attach |
| Voice API `mcp` tool | Server-side MCP on `wss://api.x.ai/v1/realtime` ([Voice](./grok-voice.md)) |

## Common pitfalls

- Pointing a custom connector at `http://localhost:3001`. Officially rejected.
- Expecting a Business member to see Gmail before an admin provisions it.
- Copying Grok Build MCP config into grok.com. Different product, different host.
- Using Cloudflare quick tunnels with an SSE MCP server.

## Official docs

| Page | Use |
|------|-----|
| [docs.x.ai/grok/connectors](https://docs.x.ai/grok/connectors) | Three kinds + built-in table |
| [docs.x.ai/grok/connector-management](https://docs.x.ai/grok/connector-management) | Business admin provision |
| [docs.x.ai/grok/connectors/custom-mcp-tunneling](https://docs.x.ai/grok/connectors/custom-mcp-tunneling) | Public URL / tunnels |
| [grok.com/connectors](https://grok.com/connectors) | User-facing add/connect UI |
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | Connectors as a chat capability |

## Related pages

- [Grok Chat](./grok-chat.md)
- [Grok Business](./grok-business.md) — admin must provision first
- [Grok Build cookbook](./grok-cookbook.md) — CLI MCP, not this
- [Grok Bot](./grok-bot.md)
- [Grok learning map](./index.md)
