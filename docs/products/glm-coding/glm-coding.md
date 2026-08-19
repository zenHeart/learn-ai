---
title: GLM Coding Plan tutorial
description: Subscribe to the global GLM Coding Plan and load it into Claude Code or Cursor with the official npx @z_ai/coding-helper command.
domain: product
tags:
  - coding-plan
role: tutorial
---

# GLM Coding Plan tutorial

This page takes you from subscribe → first working turn in **Claude Code** or **Cursor**. Numbers and allow-lists live on the [cheatsheet](./glm-coding-cheatsheet.md). Model switch / MCP / errors live in the [cookbook](./glm-coding-cookbook.md).

Official path: [Quick Start](https://docs.z.ai/devpack/quick-start). Endpoints here are **global** (`api.z.ai`). China uses `open.bigmodel.cn` — see the Chinese tutorial.

## 1. Confirm you bought the right thing

You bought **quota for listed coding tools**, not Z.ai chat and not a general API pack.

- The plan is limited to [supported tools and products](https://docs.z.ai/devpack/tool/others#step-1-supported-tools).
- China FAQ (same vendor rule): calling the model from a self-built app, site, bot, or SaaS uses the standard API and does **not** consume Coding Plan quota.

## 2. Subscribe and get a plan key

1. Open [Z.AI Open Platform](https://z.ai/model-api) and sign in.
2. Pick a plan on [GLM Coding Plan](https://z.ai/subscribe).
3. Get a key ([Quick Start](https://docs.z.ai/devpack/quick-start)):
   - **Individual:** [Individual Coding Plan > Plan Overview](https://z.ai/manage-apikey/apikey-list)
   - **Team:** [Team Coding Plan > My Plan](https://z.ai/manage-apikey/coding-plan/team/my-plan)

> **The Team Plan key is not interchangeable with other Z.AI API keys.** Use the Team Plan key if you want Team quota.

Do not commit the key.

## 3. Preferred path: Coding Tool Helper

Official page: [Coding Tool Helper](https://docs.z.ai/devpack/extension/coding-tool-helper). Prerequisite: **Node.js >= v18.0.0**.

Helper currently auto-manages only:

- Claude Code
- OpenCode
- Crush
- Factory Droid

Cursor, Cline, TRAE, and the rest of the allow-list are **not** on that list. Skip to section 5 for Cursor.

### Method 1 (official recommended: npx)

```bash
npx @z_ai/coding-helper
```

### Method 2: global install

```bash
npm install -g @z_ai/coding-helper
coding-helper
```

The binary is also `chelper`. If `npm install` hits `permission denied`, the official example is `sudo npm install -g @z_ai/coding-helper`, or go back to npx.

Wizard order (official): UI language → coding plan → API key → tools to manage → auto-install if needed → tool menu → load plan → optional MCP → launch.

Non-interactive commands are on the [cheatsheet](./glm-coding-cheatsheet.md). Global auth:

```bash
coding-helper auth glm_coding_plan_global <token>
```

If anything fails:

```bash
coding-helper doctor
```

## 4. Wire Claude Code

Official page: [devpack/tool/claude](https://docs.z.ai/devpack/tool/claude).

Prerequisites: Node.js 18+. Windows also needs [Git for Windows](https://git-scm.com/download/win). macOS: prefer nvm.

```bash
npm install -g @anthropic-ai/claude-code
cd your-awesome-project
```

Do not treat a bare `claude` launch as “done” until the plan env is set.

### 4.1 Helper (preferred)

```bash
npx @z_ai/coding-helper
```

Choose Claude Code and load the plan.

### 4.2 Install script (macOS / Linux only)

```bash
curl -O "https://cdn.bigmodel.cn/install/claude_code_zai_env.sh" && bash ./claude_code_zai_env.sh
```

The script writes `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zai_api_key",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000"
  }
}
```

### 4.3 Manual `settings.json` (macOS / Linux / Windows)

Official global example (includes model mapping — this page still shows GLM-5.2; current plan-wide default is GLM-5.3 on [Overview](https://docs.z.ai/devpack/overview). Prefer [latest-model](https://docs.z.ai/devpack/latest-model) when you switch):

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zai_api_key",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.2[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.2[1m]",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "1000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "API_TIMEOUT_MS": "3000000"
  }
}
```

Open a **new** terminal:

```bash
cd your-project-directory
claude
```

If asked “Do you want to use this API key,” choose Yes. Official note: they verified Claude Code **2.0.14** and similar. Upgrade with `claude --version` and `claude update`.

The tool page still documents default Opus/Sonnet/Haiku → GLM-4.7. Overview says all plans now serve **GLM-5.3**. Do not invent a third mapping. To switch, copy [latest-model](https://docs.z.ai/devpack/latest-model) (China mirror of the same guide: [latest-model](https://docs.bigmodel.cn/cn/coding-plan/latest-model) uses `glm-5.3[1m]`).

## 5. Wire Cursor

Official page: [devpack/tool/cursor](https://docs.z.ai/devpack/tool/cursor). **Helper does not configure Cursor.**

> Custom configuration is only supported in **Cursor Pro and higher**.

You must use the dedicated Coding API `https://api.z.ai/api/coding/paas/v4`, **not** the General API `https://api.z.ai/api/paas/v4`.

1. Install Cursor from the Cursor site.
2. **Models** → **Add Custom Model**.
3. Select the **OpenAI Protocol**.
4. Paste your Z.AI plan key.
5. **Override OpenAI Base URL** → `https://api.z.ai/api/coding/paas/v4`.
6. Enter the model in **uppercase**. The Cursor page examples are `GLM-4.7` and `GLM-4.5-air`. “The model name must be entered in uppercase, such as `GLM-4.7`.”

This handbook does not invent a `GLM-5.3` Cursor spelling. Overview lists GLM-5.3 as the current plan model; the Cursor page examples lag. Use the string that page shows, or the uppercase form of a model the Overview still lists.

Save, then pick the new provider on the home screen.

## 6. First prompts

From [Quick Start](https://docs.z.ai/devpack/quick-start):

```text
Please create a React component containing a user login form
```

```text
My API request returns a 404 error. Please help me check the code.
```

```text
This function performs poorly. Please optimize it for me.
```

Next: model switch, MCP, and failures → [cookbook](./glm-coding-cookbook.md).
