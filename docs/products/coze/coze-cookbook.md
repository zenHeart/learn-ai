---
title: Coze Programming cookbook
description: "Jump to a job: workflows, plugins, knowledge, skills, publish, Coze CLI. Every recipe links to an official page. No Doubao or Trae tutorials."
domain: product
tags:
  - agent-builder
role: cookbook
---

# Coze Programming cookbook

You can already create a low-code agent. These are **recipes**. Clicks for the first agent stay in the [tutorial](./coze.md).

## Build the workflow first, then hang it on the agent

Do not stuff a fixed pipeline into the persona. Officially a workflow is “a set of executable instructions” on a canvas.

Two types ([low-code workflow](https://docs.coze.cn/guides_workflow)):

| Type | For | Examples |
|------|-----|----------|
| Workflow | Sequential functions / data | Research report, poster, picture book |
| Chatflow | Conversational logic | Support, personal assistant |

Every workflow has **Start** and **End**. Wire outputs by reference. Nodes accept `String`, `Integer`, `Number`, `Boolean`, `Object`, `File`, `Array`.

A paid node that **succeeds still bills** if the whole workflow later fails.

Space members can create / view / copy / import by default. Edit and publish need the owner to turn on collaboration. Follow the official permission table.

Natural-language full-code workflows: [develop a workflow](https://docs.coze.cn/guides_ai_powered_workflow_development).

## Attach APIs: plugins

A plugin is a toolset. Each tool is one API. Tools in one plugin must share a domain ([plugins](https://docs.coze.cn/guides_plugin)).

| Kind | Who maintains it | Billing |
|------|------------------|---------|
| Library plugin | You, this account only | Whatever the API costs |
| Official plugin | Coze Programming | Per call, credits allowed |
| Third-party plugin | Other developers | Paid usage hits **cash balance**, not credits |

Custom plugins: API form, IDE, JSON/YAML import, or code.

Official limits:

- 1000 plugins per space; 30 IDE plugins per account.
- 100 tools per plugin.
- Custom plugin QPS cap 50.
- Dependency bundle ≤ 250 MB.
- **A low-code agent or app that includes a paid third-party plugin cannot publish to Feishu Bitable, Juejin, Doubao, or some public channels.**

In an agent, `{`-reference the plugin or it may never run. In a workflow, drop it as a node.

## Ground facts with knowledge

Static, shared, developer-owned content belongs in knowledge, not memory ([knowledge](https://docs.coze.cn/guides_knowledge)).

| | Knowledge | Memory |
|--|-----------|--------|
| Who edits | Developer | End user, during chat |
| Visibility | Shareable in the space; users cannot edit | Per user; not reusable across agents |
| Rental example | Listings, compounds, policy PDFs | Preferences, watch list |

Two products:

- **Coze knowledge**: text / table / image. Free quota. Good for a trial.
- **Volcengine knowledge**: enterprise scale. Upload starts billing on Volcengine. **Coze credits do not apply.** Deleting documents does not stop compute. Unbind and delete the collection in the Volcengine console.

Flow: create or bind → attach to the agent or workflow → tune retrieval → debug.

## Pack an SOP as a skill

A skill is a folder with `SKILL.md`, loaded on demand, not a always-on persona ([skills](https://docs.coze.cn/guides_skill_overview)).

```text
my-skill/
├── SKILL.md          # required
├── scripts/          # optional
├── references/       # optional
└── assets/           # optional
```

One-liners:

- **Prompt**: global persona, every turn.
- **Skill**: SOP for a class of tasks.
- **Workflow**: fixed path.
- **Plugin**: call an API.
- **MCP**: capability interface; a skill can say when to use it.
- **Knowledge**: retrieve documents, not an operations manual.

On the Coze Programming home, open the **Skill** tab, generate with language, preview, then **deploy** before Coze chat can use it. Enterprise flagship can publish to an internal skill store.

## Generate a full-code agent with AI programming

When the canvas is too small:

1. [code.coze.cn](https://code.coze.cn/) → **Agent** tab.
2. Describe features, logic, constraints. Optionally attach files, pick Q&A vs Agent mode, add skills, pick a coding model.
3. Submit and wait for the project and unit tests.
4. Preview on the right. Paste errors back, or use one-click fix.
5. Deploy as an API: [develop an agent](https://docs.coze.cn/guides_vibe_coding_agent).

This spends programming-task credits, built-in integrations, and hosting after go-live. Quotas: [limits](https://docs.coze.cn/guides_vibe_coding_limit).

If a team/enterprise member cannot see the tab, ask the super admin about feature access control.

## Publish where people already are

Three channel classes ([publish overview](https://docs.coze.cn/guides_publish_overview)):

1. **Official defaults**: store, Feishu, WeChat, Juejin, mini programs, API, Chat SDK.
2. **Team custom**: hardware / app-store tenants, team-only. Agents must publish to **API and team custom channels**.
3. **Public channels**: only enterprise flagship can make a channel public.

Flow: pack → Coze review → channel review.

Do not:

- Hunt for the Doubao channel (closed 2026-07-01).
- Expect to clone another store agent’s full config (store listings are private; copy structure from the [template store](https://www.coze.cn/template)).
- Re-list workflows or image flows in the community (removed).

## Let another agent drive Coze: CLI

Official package **`@coze/cli`**, binary **`coze`**. npm `latest` on 2026-08-19 was `0.3.10`. Flags: `coze --help` and the [npm page](https://www.npmjs.com/package/@coze/cli).

Coze chat already embeds the CLI. In Trae / Claude Code / a terminal:

```bash
npm install -g @coze/cli --foreground-scripts
coze self skill install
# scripts: coze self skill install --target trae
coze auth login --oauth
```

Official first task:

```text
Use Coze CLI to create a web app that explains Coze CLI.
Send me the preview link when it is ready.
```

The CLI shares Coze Programming accounts and workspaces. Installing a Skill does not grant CLI permission; it teaches the host agent when to call it.

## When you must self-host

Coze Programming **does not** offer private deployment ([FAQ](https://docs.coze.cn/guides_FAQ)). Open-source path:

```bash
git clone https://github.com/coze-dev/coze-studio.git
cd coze-studio
# macOS / Linux
make web
```

Minimum 2 cores / 4 GB and Docker. Register at `http://localhost:8888/sign`, then add a model at `/admin/#model-management`. Read the README security warning before a public bind.

Studio is a single-node core: no commercial workspaces, org management, or multi-user collab. Eval/observability OSS is [Coze Loop](https://github.com/coze-dev/coze-loop).
