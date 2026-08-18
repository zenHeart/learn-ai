# Cursor SDK

The SDK lets **your code** call the same agent that runs in the IDE, CLI, and web app. This page is a **decision + first run**, not an API dump. Official references: [TypeScript](https://cursor.com/docs/sdk/typescript), [Python](https://cursor.com/docs/sdk/python), [Bridge](https://cursor.com/docs/sdk/bridge).

> In Cursor, run the **`/sdk`** skill to scaffold. End-to-end samples live in the [Cursor Cookbook](https://github.com/cursor/cookbook) (`sdk/quickstart`, `sdk/app-builder`, `sdk/agent-kanban`, `sdk/coding-agent-cli`).

## Prerequisites

- A **user** or **service-account** API key. **Team Admin API keys are not yet supported**
- TypeScript: **Node.js 22.13+**. Python: **3.10+**
- You understand “local” here means **where the agent loop and files live**, not a local model

## Learning objectives

After this page you can:

1. Pick TypeScript vs Python vs Bridge vs the Cloud Agents REST API
2. Create one local agent and one cloud agent without pasting the reference
3. Avoid the Team Admin key and the “local model” trap
4. Know where spend shows up

---

## Which surface?

| Path | Package / binary | Use when |
|------|------------------|----------|
| **TypeScript SDK** | `@cursor/sdk` (the `@` is required; bare `cursor/sdk` is not on npm) | You write TS / JS |
| **Python SDK** | `cursor-sdk` | You write Python (sync + async) |
| **SDK Bridge** | `cursor-sdk-bridge` | Go, Rust, Java, C#, or anything else — you own the adapter |
| **Cloud Agents API** | HTTP | You only need **cloud** agents, no local runtime |

Lead with TypeScript or Python unless those packages do not cover the language. The bridge is for **SDK authors and platform teams**. Application code should depend on `@cursor/sdk` or `cursor-sdk`.

## Local vs Cloud runtime

One interface. Runtime is whichever key you pass into `Agent.create()` (`local` or `cloud`). Same `CURSOR_API_KEY`.

| Runtime | What it does | When |
|---------|--------------|------|
| **Local** | Agent loop inline in your process; files from disk | Dev scripts and CI against a working tree |
| **Cloud** | Isolated VM; Cursor runs the VMs | Caller has no checkout, many parallel runs, or the run must survive disconnect |

**Local ≠ local model.** All inference goes through Cursor's hosted models in both modes. Local keeps files on your machine; Cloud runs in a Cursor environment.

Local IDs look like `agent-<uuid>`. Cloud IDs look like `bc-<uuid>`. SDK-started cloud agents are hidden from the default list — filter **Source > SDK** in the web / Agents Window.

## Auth, billing, privacy

```bash
export CURSOR_API_KEY="your-key"
```

- **User API key** — [Dashboard → API Keys](https://cursor.com/dashboard/api). Bills that user's plan
- **Service account API key** — [Team settings](https://cursor.com/dashboard/team-settings). Bills the team that owns the account
- Interactive hosts can mint a key with `Cursor.auth.login()` (TypeScript)

SDK runs follow the same **pricing, request pools, and Privacy Mode** rules as the IDE and Cloud Agents. Spend appears on the [usage dashboard](https://cursor.com/dashboard/usage) under the **SDK** tag.

## Install and first run (TypeScript)

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

Cloud variant (same `Agent.create`, `cloud` instead of `local`):

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

One-shot helper: `Agent.prompt(...)` creates, sends, waits, disposes.

**Default local agents run tool calls (shell, edit, write) without asking.** There is no human-in-the-loop prompt in headless mode. Gate them with [hooks](https://cursor.com/docs/sdk/typescript.md#hooks) or `local.sandboxOptions.enabled: true`.

Composer 2 is retired. SDK requests that still pass `composer-2` / `composer-2-fast` are **rerouted to Composer 2.5**.

## Python in one paragraph

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

Async work needs an explicit `AsyncClient` / `AsyncClient.launch_bridge(...)`. There is **no** global async default client. Do not mix sync and async clients in the same path.

## Core concepts (enough to read the reference)

| Concept | Meaning |
|---------|---------|
| **Agent** | Durable handle: conversation, workspace, settings. Survives multiple prompts |
| **Run** | One `send()`. Own stream, status, result, cancel |
| **SDKMessage** | Normalized stream events; same shape on local and cloud |

Resume by id: `Agent.resume("bc-…")` (prefix detects cloud vs local). Inline MCP is **not** persisted across resume — pass it again, or use `.cursor/mcp.json`.

No-repo cloud agents (`cloud: { repos: [] }`) must be enabled for the account / team. Repository-scoped API keys cannot create them.

## Bridge (other languages)

The Bridge is a **local server** that embeds the TypeScript SDK and speaks **Connect / protobuf** (`sdk.v1`) over **HTTP/1.1**. Classic gRPC over HTTP/2 will **not** connect.

Pin a [GitHub release](https://github.com/cursor/sdk-bridge/releases) that matches the TS / Python SDK version. Two secrets: `CURSOR_API_KEY`, plus the **per-process bearer** from the ready-line handshake.

Official support: `sdk.v1` protos, standalone `cursor-sdk-bridge` binaries, first-party TS / Python SDKs. **You** own versioning and security for community adapters.

## When to use it

- CI auto-fix, triage workers, review passes, in-product agents, orchestrators (official cookbook list)
- You already picked Cloud vs local above

Stay on [Cursor CLI](./cursor-cli) for a human in a terminal. Stay on the [Cloud Agents](./cloud-agents) UI / `@cursor` when you do not want to write a host.

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| `npm install cursor/sdk` | Package is **`@cursor/sdk`** |
| Think “local” means a local LLM | Hosted models either way |
| Team Admin API key | User or **service account** only |
| Copy this page as the API | Open the [TypeScript](https://cursor.com/docs/sdk/typescript) / [Python](https://cursor.com/docs/sdk/python) reference |
| Single-file `bun build --compile` on the default entry | Use `@cursor/sdk/bundled` (official) |
| Mix Python sync + async clients | Explicit `AsyncClient` |
| Classic gRPC to the Bridge | Connect over HTTP/1.1 |
| Expect SDK cloud runs in the default agent list | Filter **Source > SDK** |

## Next steps

- Official TS / Python / Bridge pages above — full `send` options, stores, Router (`auto-smart` + `optimize_for`), artifacts, `getUsage()`
- [Cloud Agents](./cloud-agents) — the VM the `cloud` runtime uses
- [Cursor CLI](./cursor-cli) — same agent, no host process
- [github.com/cursor/cookbook](https://github.com/cursor/cookbook) — runnable samples
