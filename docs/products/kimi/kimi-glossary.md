---
title: Kimi chat and Agent glossary
description: No how-to. Split the things that share the words Kimi, Agent, Goal, and Project.
domain: product
tags:
  - chat
role: glossary
---

# Kimi chat and Agent glossary

No how-to. What the official pages mean — and what they are not. Product choice: [learning map](./index.md). Internals: [Learn LLM](/tech/fundamentals/LLM).

## Things named Kimi

| Name | What it is | Where |
|------|------------|-------|
| **Kimi** | All-in-one agentic AI workspace | [kimi.com](https://www.kimi.com/) |
| **Kimi Agent** | End-to-end autonomous assistant, K3 + 20+ tools | [kimi.com/agent](https://www.kimi.com/agent) |
| **Agent Swarm** | Up to 300 sub-agents in parallel | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm) |
| **Kimi Claw** | One-click cloud OpenClaw, optional chat channels | [kimi.com/bot](https://www.kimi.com/bot) |
| **Kimi Code** | Terminal and IDE coding agent | [Kimi Code](/products/kimi-code/) |
| **Kimi Work** | Mac/Windows desktop knowledge-work agent (Work / Chat modes) | [products/kimi-work](https://www.kimi.com/products/kimi-work) |
| **Kimi WebBridge** | Browser extension for agents | Products page |
| **Kimi Platform** | Official model API | [platform.moonshot.cn](https://platform.moonshot.cn/) |
| **Kimi Business** | Enterprise | Help Center |
| **Kimi Plus** | Named on the plugins page as a chat surface without plugins yet | [Plugins](https://www.kimi.com/help/features/plugins) |
| **K2.6 / K3 / K3 Swarm** | Model / mode switch in the workspace | Model switch above the input |
| **Moonshot AI** | The company | [moonshot.cn](https://www.moonshot.cn/) |

## Three Agent scheduling surfaces

| | Single Agent | Agent Swarm | Claw group chat |
|--|--------------|-------------|-----------------|
| **What** | One assistant plans and calls tools | One orchestrator, up to 300 sub-agents | Several Claws + Kimi Conductor |
| **Entry** | `kimi.com/agent` or App **K3** | `kimi.com/agent-swarm` or **K3 Swarm** | `kimi.com/bot` → Start Group Chat |
| **Official emphasis** | 20+ tools, Office / site deliverables | Scale out, no hand-written workflow | Cross-person, device, permission boundary |
| **Not** | Not Kimi Code | Not "300 Claws" | Not another name for Swarm |

**OpenClaw ≠ Kimi Claw.** OpenClaw is the assistant you can self-host. Kimi Claw is Moonshot's deploy-or-link surface. A group chat can also invite someone else's OpenClaw as a Worker.

**OK Computer** is the 2025-09-26 Agent-mode name on the official timeline. Current help leads with Kimi Agent / K3.

## Goal collisions

| Phrase | Where official | Not |
|--------|----------------|-----|
| Goal / Goal Mode | Membership table (Allegretto+); project chats can use Goal | Not a free global toggle |
| Kimi Work Goal Mode | Work help | Not the same page as web chat |
| Kimi Code `/goal` | Code CLI | **Not** a kimi.com chat command |

There is no first-class "Goal product" URL. The family table keeps one row.

## Two Projects

Official ([Projects](https://www.kimi.com/help/features/project)): the Kimi Work desktop app also has "Projects"; they are **not connected and don't share data**.

| | kimi.com Projects | Kimi Work Projects |
|--|-------------------|--------------------|
| **Job** | Persistent web workspace | Desktop task space |
| **This directory** | Tutorial / Cookbook | Map row only |

## Credits, memory, Skills, plugins

**Credit pool:** membership features share one token-metered pool. Chat K2.6 is free. Kimi Code has a separate 5-hour / weekly rate limit. "Agent credits 60" is an official *approximate* typical-task conversion, not "60 chat turns".

**Two plan-name systems:** membership page Moderato / Allegretto / Allegro / Vivace (USD). Projects / Scheduled Tasks pages Free / Go / Pro / Max / Ultra. Cite each page. Do not merge.

**Memory:** cross-chat preferences. Official: not used for training; no unauthorized private data by default. Project context injects global main memory; project instructions stay inside that project.

**Skills:** on-demand knowledge packages. Official / recommended / open-source / custom. Type `/`.

**Plugins:** third-party connectors. K3 / K3 Swarm and some scenarios; not Claw or Plus chats. Not the Kimi Code plugin config.

**Scheduled tasks:** cloud on kimi.com; optional local on Kimi Work (app must be open).

## Do not write as fact

- "Kimi is Kimi Code"
- "Typing `/goal` on the web equals CLI Goal"
- "Moderato is Go"
- "Claw group chat = Agent Swarm"
- Code install scripts as this directory's quickstart
- CNY prices (this research did not treat a separate CN price page as SSOT)

## Related pages

- [Learning map](./index.md)
- [Tutorial](./kimi.md)
- [Cookbook](./kimi-cookbook.md)
- [Cheatsheet](./kimi-cheatsheet.md)
