---
title: MiniMax Code cookbook
description: "Official recipes only: Agent Team, your own API key, headless exec, ACP, check-in credits."
domain: product
tags:
  - coding-agent
role: cookbook
---

# MiniMax Code cookbook

Skip around. Install and the first conversation live in the [tutorial](./minimax-code.md). This page is "I need to do X".

## 1. Use Agent Team on a complex task

Source: [Agent Team](https://agent.minimax.io/docs/code/agents/team).

Official text: Agent Team "introduces multiple specialist Agents based on task complexity. You still only describe the goal"; MiniMax Code handles decomposition, assignment, progress, and the summary.

Use it when the work:

- Mixes code, design, docs, and tests
- Must run for a long time
- Needs split execution plus verification
- Needs parallel exploration

Write a clear goal, acceptance bar, and constraints. You can add instructions mid-flight; the official page says Agent Team folds them into later steps.

The M3 post describes a Producer + Verifier loop and multi-day unattended runs ([minimax-m3](https://www.minimax.io/blog/minimax-m3)). Treat that as product language, not an SLA. Queue limits stay on the [team](https://agent.minimax.io/docs/code/agents/team) page and in the app.

Skip Team for a one-file edit.

## 2. Use your own MiniMax API key

Source: [MiniMax API Key](https://agent.minimax.io/docs/code/account/minimax-api).

1. Open usage / model settings.
2. Choose MiniMax API, paste the key, save.
3. Run the connection test.

Official warning: do not put the key in chat, a repo, or a public doc. Use the in-product field only.

On the CLI, run `mcode provider` or `mcode provider --help` ([CLI FAQ](https://agent.minimax.io/docs/cli/faq)).

Custom providers (base URL, API format, model name) use [BYOK](https://agent.minimax.io/docs/code/account/byok). Do not merge that flow with the official MiniMax key.

## 3. Run one headless CLI task

Source: [Features](https://agent.minimax.io/docs/cli/features).

`mcode exec` does not start the TUI.

```bash
mcode exec "Fix the failing tests"

mcode exec \
  --cwd ./repo \
  --file error.log \
  --output-format json \
  "Analyze the error log, fix the issue, and run the related tests"
```

Official flags:

| Flag | Purpose |
|------|---------|
| `--cwd` | Workspace directory |
| `--file` | Attachment; repeatable |
| `--model` | Model for this run only |
| `--session` / `--continue` | Existing session |
| `--permission` | `ask`, `smart`, `full`, or `off` |
| `--timeout` | e.g. `30s`, `2m` |
| `--max-steps` | Cap assistant steps |
| `--output-format` | `text`, `json`, or `stream-json` |
| `--output-schema` | JSON Schema for the final JSON |

Task output goes to `stdout`. Diagnostics go to `stderr`. stdin is read only with explicit `--input -`, so CI does not hang.

## 4. Attach `mcode` to Zed (ACP)

Source: [Features](https://agent.minimax.io/docs/cli/features).

`mcode acp` runs as an ACP v1 agent server over stdin/stdout NDJSON. Official text: no extra HTTP server, and the editor does not need a MiniMax-only plugin.

Zed External Agents example (official):

```json
{
  "agent_servers": {
    "minimax-code": {
      "type": "custom",
      "command": "mcode",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

If the editor cannot find the binary, set `command` to the absolute path of `mcode`. Official constraint: `stdout` is protocol-only. Do not type natural language into that stream. Do not let a wrapper log to `stdout`.

Do not invent an official VS Code plugin.

## 5. Usage and check-in credits

Source: [Token Plan and Credits](https://agent.minimax.io/docs/code/account/usage).

The usage page shows plan status, Token Plan validity, credit balance, quotas, and the subscribe / top-up / invoice / check-in entries.

Official check-in numbers on that page:

- Daily check-in: **400** credits
- Day 4 and day 7 streaks: **1000** credits that day
- Full week: **4000** credits total
- Credits expire **30 days** after they land

Same page: "Follow the in-product display for specific billing and quota rules." (CN twin: 「具体计费和额度规则以产品内展示为准。」)

Desktop Plus / Max / Ultra list prices and Open Platform Token Plan USD tiers are **not** one table. See the [cheatsheet](./minimax-code-cheatsheet.md).

## 6. A scheduled task did not run

Source: [desktop FAQ](https://agent.minimax.io/docs/code/help/faq).

Confirm the machine is awake, MiniMax Code is running, and the task is enabled.

The CLI does not host the desktop scheduler. Official FAQ: Browser and Computer Use appear only when the current host actually provides them. Do not assume the CLI has every desktop capability.

## 7. Install failures

| Symptom | Official fix |
|---------|--------------|
| `mcode: command not found` | Reopen the terminal; check `PATH`; fully quit VS Code ([CLI FAQ](https://agent.minimax.io/docs/cli/faq)) |
| Installer fails | Reach the MiniMax file CDN, Node.js.org, and the npm registry; native deps may also hit GitHub. Set `HTTP_PROXY` / `HTTPS_PROXY` / `ALL_PROXY` / `NO_PROXY` first |
| Alpine / musl | Not supported |
| Windows desktop will not install | OS version, install-path permissions, corporate proxy ([download](https://agent.minimax.io/docs/code/get-started/download)) |
| Custom model will not connect | Base URL, API key, model name, network, API format ([desktop FAQ](https://agent.minimax.io/docs/code/help/faq)) |

Steps for pointing MiniMax-M3 at Claude Code / Cursor live on [text-ai-coding-tools](https://platform.minimax.io/docs/guides/text-ai-coding-tools). They are not MiniMax Code recipes.
