---
title: GLM Coding Plan cookbook
description: "After the global plan is live: switch models, add plan MCP servers, and debug the wrong endpoint."
domain: product
tags:
  - coding-plan
role: cookbook
---

# GLM Coding Plan cookbook

For readers who already subscribed and can reach a listed tool. Each recipe is one job. Not wired yet? Start with the [tutorial](./glm-coding.md).

## 1. Point the tool at the current plan models

[Overview](https://docs.z.ai/devpack/overview): all plans support **GLM-5.3**, GLM-5-Turbo, and GLM-4.7. Older GLM-5.2 / GLM-5.1 calls route to GLM-5.3.

The Claude Code tool page still shows GLM-4.7 / GLM-5.2 mappings. **Do not treat that FAQ as the current default.** Prefer [latest-model](https://docs.z.ai/devpack/latest-model). The China twin of that page ([latest-model](https://docs.bigmodel.cn/cn/coding-plan/latest-model)) publishes this `settings.json` fragment for GLM-5.3:

```json
{
  "env": {
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "1000000",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3[1m]"
  }
}
```

Keep the global Anthropic base URL:

`https://api.z.ai/api/anthropic`

The `[1m]` suffix plus `CLAUDE_CODE_AUTO_COMPACT_WINDOW` is required for 1M context. If the client says the model does not exist, `claude update` first.

Open a new terminal, run `claude`, then `/status`. You want Model = `glm-5.3` or `glm-5.3[1m]`.

Cline-style OpenAI-compatible tools (China `latest-model` example; use the global base URL):

- API Provider: `OpenAI Compatible`
- Base URL: `https://api.z.ai/api/coding/paas/v4`
- Custom model: e.g. `glm-5.3`
- Uncheck Support Images
- Context Window Size: `1000000`

If the agent cannot set a custom model, the official note is: wait for later support.

## 2. Add plan MCP servers

Overview: every plan includes Vision, Web Search, Web Reader, and Zread MCP. They share plan credits.

Vision is a **local** server: `@z_ai/mcp-server` (China vision page; same package). Search / Zread are **remote** HTTP MCP. China one-liners (swap the host to `api.z.ai` only when the global MCP page shows that host; if you have not opened the global MCP page, copy the URL from [docs.z.ai/devpack/mcp](https://docs.z.ai/devpack/mcp/vision-mcp-server) instead of guessing).

China Claude Code commands that are on the official CN MCP pages:

```bash
claude mcp add -s user zai-mcp-server --env Z_AI_API_KEY=YOUR_API_KEY -- npx -y "@z_ai/mcp-server"
```

Set `Z_AI_MODE=ZAI` when the key is a global Z.AI key (`Z_AI_MODE` is `ZHIPU` or `ZAI`).

```bash
claude mcp add -s user -t http web-search-prime https://open.bigmodel.cn/api/mcp/web_search_prime/mcp --header "Authorization: Bearer YOUR_API_KEY"
claude mcp add -s user -t http zread https://open.bigmodel.cn/api/mcp/zread/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

Those two URLs are the **China** hosts from `docs.bigmodel.cn`. For a global key, open the matching [docs.z.ai MCP](https://docs.z.ai/devpack/mcp/search-mcp-server) page and copy its URL. Do not assume the path is identical.

Best practice from the vision page: put the image in the working directory and name the path. Pasting a bitmap into most clients skips this MCP.

Web Reader: follow [reader-mcp-server](https://docs.z.ai/devpack/mcp/reader-mcp-server); this page does not invent its command.

## 3. Requests bill the general API (or fail with insufficient balance)

Wrong tool or wrong base URL is the usual cause.

Global Cursor page: Coding API `https://api.z.ai/api/coding/paas/v4`, **not** General API `https://api.z.ai/api/paas/v4`.

China FAQ (same failure mode, China hosts):

| Client | Required base URL |
|--------|-------------------|
| Claude Code | `https://open.bigmodel.cn/api/anthropic` |
| Cherry Studio | `https://open.bigmodel.cn/api/coding/paas/v4/` |
| Other listed tools | `https://open.bigmodel.cn/api/coding/paas/v4` |

Global equivalents:

| Client | Required base URL |
|--------|-------------------|
| Claude Code | `https://api.z.ai/api/anthropic` |
| OpenAI-compatible tools | `https://api.z.ai/api/coding/paas/v4` |
| OpenAI Responses | `https://api.z.ai/api/v1` |

If usage still hits wallet balance after the plan quota is gone, the request is not on the coding endpoint. China Overview: exhausted plan quota waits for the next 5-hour window and does **not** keep draining other packs.

## 4. Helper will not start

From [coding-tool-helper](https://docs.z.ai/devpack/extension/coding-tool-helper):

```bash
coding-helper doctor
```

| Symptom | Official fix |
|---------|----------------|
| `Network Error` | Check the network. Node.js does **not** pick up the system proxy; set `HTTP_PROXY` and `HTTPS_PROXY` |
| Install timeout | Network / proxy |
| `EACCES: permission denied` | sudo, Administrator terminal, `npx @z_ai/coding-helper`, or nvm |
| Marketplace plugin status wrong | `claude update` to **2.0.70+** |
| Invalid API key | Re-copy the key; official text also says check account balance |

```bash
export HTTP_PROXY=http://your.proxy.server:port
export HTTPS_PROXY=http://your.proxy.server:port
```

## 5. Cursor rejects the custom model

[Cursor page](https://docs.z.ai/devpack/tool/cursor): custom models need **Cursor Pro and higher**. Model id must be uppercase (`GLM-4.7`). Base URL must be the Coding API, not `/api/paas/v4`.

## 6. Team keys

[Global Quick Start](https://docs.z.ai/devpack/quick-start): Team Plan members take the key from Team Coding Plan > My Plan. That key is not interchangeable with other Z.AI keys.

China [team](https://docs.bigmodel.cn/cn/coding-plan/team) adds (do not assume every line is mirrored on docs.z.ai): seats start at 2; no seat sharing; personal + team plans can coexist; the buyer admin does not consume a seat unless they assign one to themselves.
