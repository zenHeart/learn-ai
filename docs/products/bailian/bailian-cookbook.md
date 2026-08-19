---
title: Model Studio cookbook
description: Recipes for key mix-ups, quota stop, no-code Q&A, and the Model Studio CLI. No full Lingma or Qwen chat tutorial.
domain: product
tags:
  - model-platform
role: cookbook
---

# Model Studio cookbook

> You can already send one request. These are problem-shaped. Activation is in the [tutorial](./bailian).

## Move existing OpenAI code

Official rule: change the **API key, base URL, and model name**. [Intro](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)

1. Read `process.env.DASHSCOPE_API_KEY`.
2. Point `baseURL` at that region's OpenAI-compatible host and fill `{WorkspaceId}` (Beijing / Singapore / Tokyo / Frankfurt). US Virginia follows the [model list](https://help.aliyun.com/zh/model-studio/models).
3. Use an ID from the list. `gpt-4o` will not resolve.
4. Streaming and tools exist only if that model lists them. Compatible ≠ feature-parity.

Copy Node / Python / curl from [First API call](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen).

## Do not mix the three credential pairs

This is the usual source of `invalid_api_key` and surprise invoices. [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan), [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)

| Billing | Key looks like | Where the base URL comes from |
|---------|----------------|-------------------------------|
| Pay-as-you-go | `sk-` or `sk-ws` | [First API call](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) / [Models](https://help.aliyun.com/zh/model-studio/models) |
| Coding Plan | `sk-sp-` from the plan page | OpenAI `https://coding.dashscope.aliyuncs.com/v1`; Anthropic `https://coding.dashscope.aliyuncs.com/apps/anthropic` |
| Token Plan | Dedicated key (official prefix `sk-sp-`) | **Whatever the Token Plan console shows that day** — not the Coding Plan host |

Official failure modes:

- PAYG key + plan host → `invalid_api_key`.
- PAYG key + PAYG host → **no plan credit, PAYG bill**.
- You bought Coding Plan and still see arrears: the tool still has `sk-` and `dashscope.aliyuncs.com`.

Coding Plan is **coding tools only** (official examples: Claude Code, Qoder, Qoder CN, OpenClaw). Using the plan key as your app backend or for batch jobs is a policy violation.

Token Plan requires a real OpenAI or Anthropic protocol. A look-alike UI that does not speak those APIs cannot burn plan credits — use a PAYG `sk-` / `sk-ws` key instead.

When filling a client, open the official page for that client. Do not reconstruct screenshots here:

- Index: [Clients and developer tools](https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/)
- Examples: [Claude Code](https://help.aliyun.com/zh/model-studio/claude-code), [Chatbox](https://help.aliyun.com/zh/model-studio/chatbox)

The full Qoder CN / Lingma IDE tutorial is #84. One official fact belongs here: personal Community / Pro can attach Model Studio; **Enterprise cannot**. [Qoder CN](https://help.aliyun.com/zh/model-studio/lingma-agent)

## Stop PAYG after the new-user quota

China-site [free quota](https://help.aliyun.com/zh/model-studio/new-free-quota):

1. **Beijing only**. Valid **90 days** from the later of activation, model launch, or approval.
2. Realtime inference only. Not Batch, fine-tune, deploy, or custom models.
3. Each model (including dated snapshots) has its own pool. The page says a model is "usually" 1 million tokens — believe the console row, not the marketing "70 million+" headline.
4. Verified accounts: turn on **Free quota only**. Exhaustion returns `AllocationQuota.FreeTierOnly`.
5. Unverified accounts already have that switch forced on.
6. An overdue account cannot call *any* model, even one that still has free tokens.

The official page advises against Free-quota-only in production (the service just stops). Use spend alerts and key deletion there.

Token Plan / Coding Plan dedicated keys **do not** consume this free-tier pool.

## No-code knowledge-base Q&A

1. Open the console and confirm the region.
2. Follow [Build a Q&A app without code](https://help.aliyun.com/zh/model-studio/build-knowledge-base-qa-assistant-without-coding/).
3. Prefer [Agent 2.0](https://help.aliyun.com/zh/model-studio/new-single-agent-application) when you have no 1.0 dependency. **No in-place upgrade** from 1.0.
4. Publish before you call the app API or channels.
5. Knowledge base billing is **separate** from model inference and does not use savings plans or resource packs. [Intro](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

Fine-tune and dedicated deploy stay on the official pages: [training](https://help.aliyun.com/zh/model-studio/model-training-overview), [deploy](https://help.aliyun.com/zh/model-studio/model-deployment-introduction).

## Install the Model Studio CLI

This is Model Studio's own CLI (multimodal tools for local agents), not the Alibaba Cloud OpenAPI plugin `aliyun bailian`.

Official install: [bailian.aliyun.com/cli/install.md](https://bailian.aliyun.com/cli/install.md)

```bash
# Node.js ≥ 22.12.0 — npm only
npm install -g bailian-cli
bl --version

# Browser login (preferred)
bl auth login --console

# Smoke test
bl auth status --output json
bl text chat --message "ping" --non-interactive --output json
```

Commands are `bl` and `bailian`. Official skills install: `npx skills add modelstudioai/cli --all -g`.

Headless / SSH: `bl auth login --api-key <pasted-key>`. Do not write the key into the repo or the chat log.

Region flag: `--region cn|us|intl`, default `cn`.
