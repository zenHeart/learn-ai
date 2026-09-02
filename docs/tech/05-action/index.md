---
title: Action Group Guide
description: Crossing from reading the world to writing it: tool-calling contract and tool-execution engineering — how actions are described, validated, and executed safely.
domain: tech
tags: [tech, action, navigation]
navOrder: 49
topicId: action-guide
layer: "5"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: []
next: [tool-calling, tool-execution]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Action Group Guide

> **Group**: Action (writing the world) | **Previous group exit**: answers grounded in traceable evidence | **This group exit**: define one controlled action with idempotency, timeout, cancellation, and permission boundaries

## 1. Overview

**BLUF**: systems up to the Grounding group at worst give an unsupported answer. Starting here, systems **change the external world** — writing files, sending messages, placing orders. The worst failure upgrades from "wrong answer" to "wrong action", often irreversible. This group is two pages answering one question: **how to keep an action under control**.

| Page | Question it answers | You leave able to |
| --- | --- | --- |
| [Tool calling contract](./tool-calling) | How does the model *intend* an action? Schema, selection, argument validation | Define reliable tool interface contracts |
| [Tool execution engineering](./tool-execution) | How is *actual execution* safe? Idempotency, timeouts, cancellation, side-effect classes, permissions | Ship a controlled executor |

**Boundary**: this group is the single-action primitive layer. Multi-step orchestration and state move to [Agent Systems](../06-agent-systems/); cross-boundary protocols to [Interoperability](../07-interoperability/).

## 2. Usage

- Want the **contract** shape for model tool calls → start at [Tool calling contract](./tool-calling).
- Already calling tools but worried about **duplicate runs, hangs, privilege escape** → read [Tool execution engineering](./tool-execution) directly.
- Both pages ship a zero-key runnable fixture; run it first, then read.

## 3. Principles

The intent/execution split organizes this group and is its security foundation: model output is only **intent** (structured arguments); execution authority stays entirely in your code. Every safeguard — validation, allowlists, idempotency keys, approval gates — lives on the execution side.

## 4. Development

Common pitfalls: overly permissive tool schemas (all-optional arguments, vague descriptions) degrade intent quality; missing side-effect classification treats irreversible operations like ordinary calls. Each page's Development section carries the matching runbooks.

## 5. Resource Library

- Beginner: [Tool calling contract](./tool-calling) overview and decision table.
- Builder: the execution-loop fixture in [Tool execution engineering](./tool-execution).
- Operator: execution runbooks (timeout, cancellation, approval).
- Researcher: Anthropic / OpenAI official tool-use guides (see each page's resource tables).
