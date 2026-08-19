---
title: Pi Agent learning map
description: Pi is a minimal terminal coding-agent harness. This directory covers Pi only. OpenClaw uses its SDK; that handbook is separate.
domain: product
tags:
  - harness
  - coding-agent
role: map
---

# Pi Agent learning map

> **Pi** is a terminal coding agent. Official site ([pi.dev](https://pi.dev/)):
> **Pi Coding Agent** — “A terminal-based coding agent”.
>
> Same page: Pi is a **minimal agent harness**. It skips sub-agents and plan mode by default. Add them with extensions, skills, or packages.
>
> This directory is the slim harness counterpart to Claude Code / Kimi Code. It is not a chat app and not OpenClaw.

## Audience / non-goals

**Audience:** frontend engineers who live in a terminal and want to own the harness.

**Non-goals:** OpenClaw install (#104); using deprecated `@mariozechner/pi-coding-agent` as the main path; inventing an official MCP toggle; model internals ([Learn LLM](/tech/fundamentals/LLM)).

## Landscape

| Official first-level door | Official URL | This site |
|---------------------------|--------------|-----------|
| **Pi Coding Agent** | [pi.dev](https://pi.dev/) | [Tutorial](./pi-agent.md) |
| Docs / Quickstart | [quickstart](https://pi.dev/docs/latest/quickstart) | Tutorial |
| GitHub | [earendil-works/pi](https://github.com/earendil-works/pi) | Cheatsheet |
| Packages | [pi.dev/packages](https://pi.dev/packages) | Map row |
| New home (2026-05-07) | [news](https://pi.dev/news/2026/5/7/pi-has-a-new-home) | Tutorial |
| pi-chat | `earendil-works/pi-chat` | Map row |
| OpenClaw | [openclaw.ai](https://openclaw.ai/) | One row → [OpenClaw](/products/openclaw/) |

**Collisions:** Pi ≠ OpenClaw; command `pi` ≠ a math library; current package ≠ `@mariozechner/pi-coding-agent`; no built-in MCP ≠ never MCP.

## Path

| Stage | Read | Goal |
|-------|------|------|
| 1. Install | [Tutorial](./pi-agent.md) | First `pi` session |
| 2. Lookup | [Cheatsheet](./pi-agent-cheatsheet.md) | Commands and doors |
| 3. Names | [Glossary](./pi-agent-glossary.md) | Stop calling OpenClaw “Pi” |
