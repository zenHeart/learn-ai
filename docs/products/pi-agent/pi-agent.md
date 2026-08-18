---
title: Pi Agent tutorial
description: Install Pi from the official npm package or install.sh and send the first prompt. Do not use the deprecated package as the main path.
domain: product
tags:
  - harness
  - coding-agent
role: tutorial
---

# Pi Agent tutorial

> Official steps: [Quickstart](https://pi.dev/docs/latest/quickstart).

## Install

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

Linux / macOS also:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

[2026-05-07](https://pi.dev/news/2026/5/7/pi-has-a-new-home): primary package is `@earendil-works/pi-coding-agent`. Do not install `@mariozechner/pi-coding-agent`.

## First prompt

```bash
pi
```

Print mode: `pi -p "query"`. Event stream: `--mode json`. Model switch: `/model` or `Ctrl+L`.

Project files from pi.dev: `AGENTS.md` (loaded from `~/.pi/agent/`, parents, cwd) and `SYSTEM.md`. Packages: `pi install npm:@foo/pi-tools`.

Defaults (pi.dev + README): no built-in sub-agents, plan mode, MCP, or permission system.

## Next

[Cheatsheet](./pi-agent-cheatsheet.md) · [Glossary](./pi-agent-glossary.md) · [OpenClaw](/products/openclaw/)
