---
title: Model Studio glossary
description: Model Studio, Qwen, and Lingma are not the same product. Neither are the three protocols, two plans, or two CLIs.
domain: product
tags:
  - model-platform
role: glossary
---

# Model Studio glossary

No procedures. Just the collisions. Paths live on the [map](./index).

## Model Studio

**What**: Alibaba Cloud's model-service and application platform. Chinese name 百炼. APIs, console apps, subscription plans. [Intro](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)

**Not**: the Tongyi chat window, the Lingma IDE, or ECS / OSS.

**Why this handbook exists**: a front-end that calls Qwen talks to this platform's API and billing, not to the chat site.

## Qwen

**What**: Alibaba's model family, and a separate chat product. FAQ: Model Studio is a platform that *includes* the Qwen series. [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

**Here**: only "a model you can call on Studio". Chat-product prose is #83.

## Lingma / Qoder CN

**What**: Alibaba Cloud's coding assistant / standalone IDE. Current official name **Qoder CN (formerly Lingma)**. [Attach page](https://help.aliyun.com/zh/model-studio/lingma-agent)

**Relation**: can take a Studio Token Plan / Coding Plan / PAYG key. Official: Enterprise cannot attach Studio.

**Here**: one line. Full tutorial is #84.

## DashScope

**What**: the old API brand. The env var is still `DASHSCOPE_API_KEY`. US hosts still say `dashscope-us.aliyuncs.com`. Coding Plan still mentions `dashscope.aliyuncs.com`.

**Not**: a second product you activate beside Model Studio.

## Workspace

**What**: a container that isolates project / team resources and ACL. `{WorkspaceId}` in the new MaaS URLs is this ID. [First API call](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen), [Get an API key](https://help.aliyun.com/zh/model-studio/get-api-key)

**Official ACL**:

- Keys in the same workspace share the same rights. You do not split keys by text vs image.
- Default workspace: all standard models + apps in that workspace.
- Child workspace: only authorized standard models + its own apps.
- Fine-tuned models: only the workspace they live in.

Primary accounts see every workspace's keys. RAM users see only workspaces they joined.

## Three call protocols

The model list often prints three hosts for one ID:

| Protocol | Path | When |
|----------|------|------|
| OpenAI-compatible | `/compatible-mode/v1` | Existing `openai` SDK, most desktop clients |
| Anthropic-compatible | `/apps/anthropic` | Tools that speak Messages (Claude Code, …) |
| DashScope | `/api/v1` | Official DashScope SDK, some multimodal generate APIs |

Source: [Models](https://help.aliyun.com/zh/model-studio/models). The three hosts are **not** interchangeable. Plans add a fourth dedicated host.

## Token Plan vs Coding Plan

Two Studio subscriptions. **No migrate / upgrade path between them.** [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)

| | Token Plan | Coding Plan |
|--|------------|-------------|
| Meter | Credits | Request counts |
| Official stance (2026-08) | Preferred for new buys | Lite stopped; Pro limited |
| Personal vs team | Personal has a 7-day window; Team is per-seat and commits not to train | Page is Pro-centric |
| Data | Personal used to improve the service; Team commits not to | Inputs and outputs used to improve the service |
| Allowed use | Tools that speak OpenAI / Anthropic | **Coding tools only**, not your backend API |

"We never train on your data" in the FAQ / international intro is the short version. The intro's **Important** box and the two plan pages win.

## Agent 1.0 vs 2.0

| | 1.0 | 2.0 |
|--|-----|-----|
| Scheduling | Retrieve the knowledge base, then maybe MCP | Knowledge base and MCP are tools; the model orders them |
| Trace | Final answer only | Plan → act → reflect |
| Migration | — | **Cannot** upgrade 1.0; create a new app |

Source: [Agent 2.0](https://help.aliyun.com/zh/model-studio/new-single-agent-application). Official default when you have no 1.0 dependency.

A workflow is a different console app type (a fixed graph), not another name for Agent 2.0. [Workflow](https://help.aliyun.com/zh/model-studio/workflow-application/)

## Knowledge base (RAG)

Retrieve private documents, then generate. Billed separately from model inference; no savings plan or resource pack. [Intro](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

One official anti-hallucination tool (FAQ). Mechanism lives in [LLM fundamentals](/tech/fundamentals/LLM).

## MCP

Model Context Protocol. Studio agents and workflows can attach official or custom MCP servers. [MCP intro](https://help.aliyun.com/zh/model-studio/mcp-introduction)

Some official MCPs (image, video, speech, web search) bill on their own. Custom MCP has basic / turbo time-based prices. Whether deploy is still "temporarily free" is that page's job.

## Model Studio CLI vs Alibaba Cloud CLI

| | Model Studio CLI | Alibaba Cloud CLI plugin |
|--|------------------|--------------------------|
| Package / command | npm `bailian-cli`; `bl` / `bailian` | `aliyun bailian …` |
| Job | Local agent calls to models and multimodal tools | OpenAPI: categories, files, connectors |
| Docs | [install.md](https://bailian.aliyun.com/cli/install.md) | [OpenAPI CLI](https://next.api.aliyun.com/api-tools/cli/bailian/2023-12-29) |

Wrong binary: `aliyun bailian list-file` works, `bl text chat` does not exist.

## High-code apps

Deploy a Python project as a managed backend. Official: [high-code apps](https://help.aliyun.com/zh/model-studio/rich-code-application/). Axis B — no tutorial here.
