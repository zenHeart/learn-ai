---
title: Agent Systems Group Guide
description: "From single actions to autonomous loops: mental model, patterns, state and recovery, control plane, and scale — a ten-page navigation."
domain: tech
tags: [tech, agent-systems, navigation]
navOrder: 59
topicId: agent-systems-guide
layer: "6"
status: canonical
nodeType: problem
owner: learn-ai
externalOwners: []
prerequisites: [tool-execution]
next: [agent-runtime, workflow, recovery-hitl]
specVersion: ""
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Agent Systems Group Guide

> **Group**: Agent Systems | **Previous group exit**: define and safely execute one controlled action | **This group exit**: build a stateful, recoverable, permission-bounded autonomous loop

## 1. Overview

**BLUF**: this group upgrades a *single action* into a *sustained loop*: the model observes, decides, and acts until a stop condition fires. Autonomy brings new failure modes — state bloat, runaway loops, error propagation, unsupervised side effects. Ten pages run from mental model, through patterns, to control plane and scale.

| Order | Page | Question it answers |
| --- | --- | --- |
| Front door | [Mental model & runtime](./agent-runtime) | What composes the loop? When is an agent worth it? |
| Patterns | [Design patterns](./design-patterns) | ReAct, routing, planner-executor, reflection — which and when? |
| State | [State & memory](./state-memory) | Where do cross-step / cross-turn data live, and how to recover? |
| Control plane | [Hooks](./hooks) | Lifecycle interception and automated policy gates |
| Control plane | [Recovery & HITL](./recovery-hitl) | Which state do you return to? When must a human decide? |
| Environment fit | [Computer use](./computer-use) | observe→act→verify when only a visual UI exists |
| Deterministic alternative | [Workflow patterns](./workflow) | When **not** to use an agent |
| Capability packaging | [Skills](./skills) · [Plugins](./plugins) | Distributing procedural knowledge and capability packages |
| Scale | [Subagent / multi-agent](./multi-agent) | Delegation and orchestration within one trust domain |

**Boundary**: delegation across processes, organizations, or trust domains is not here — go through [Interoperability](../07-interoperability/) (A2A et al.) first.

## 2. Usage

- First contact with agents: read top-down starting from [Mental model & runtime](./agent-runtime).
- Already running agents in production: jump to [Recovery & HITL](./recovery-hitl) and [Hooks](./hooks).
- Unsure an agent is warranted: read the reverse decision in [Workflow patterns](./workflow) first.

## 3. Principles

Three loop invariants: **stop conditions must be explicit** (steps / tokens / wall-clock budget), **state must be checkpointable**, **side effects must pass Action-group execution discipline**. Missing any one, autonomy only amplifies failure.

## 4. Development

Pages share one debugging grammar: symptom → evidence (trace / checkpoint) → fix → done criteria. The multi-agent debug unit is the delegation; the single-agent unit is the loop step.

## 5. Resource Library

Each topic page carries its own four-tier route; group-level entries are Anthropic's *Building Effective Agents* and the OpenAI Agents guide (see agent-runtime resource tables).
