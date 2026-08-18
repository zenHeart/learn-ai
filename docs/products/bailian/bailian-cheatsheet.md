---
title: Model Studio cheatsheet
description: Regions, keys, base URLs, plan comparison. Full model tables and unit prices stay on official pages.
domain: product
tags:
  - model-platform
role: cheatsheet
---

# Model Studio cheatsheet

> Lookup only. Learn on the [map](./index) and [tutorial](./bailian). Concepts in the [glossary](./bailian-glossary).

**Last verified: 2026-08-19.** Trust the official page you have open for IDs, prices, and hosts.

## Which path

| Job | Use | Official page |
|-----|-----|----------------|
| Call models from your service | PAYG API, OpenAI-compatible | [First API call](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) |
| Monthly quota inside coding tools | Token Plan (recommended for new buys) or Coding Plan | [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview), [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) |
| No-code Q&A / agent | Console app, prefer Agent 2.0 | [Agent 2.0](https://help.aliyun.com/zh/model-studio/new-single-agent-application) |
| Local agent, multimodal tools | CLI `bl` | [Install](https://bailian.aliyun.com/cli/install.md) |
| Chat only | Qwen (#83) | Not Model Studio |
| Alibaba coding IDE | Qoder CN / Lingma (#84) | [Attach page](https://help.aliyun.com/zh/model-studio/lingma-agent) |

## Regions

China-site intro (2026-08-19): China (Beijing), US (Virginia), Singapore, Germany (Frankfurt), Japan (Tokyo).

| Fact | Source |
|------|--------|
| Keys, endpoints, models, features, prices are per region | [Intro](https://help.aliyun.com/zh/model-studio/what-is-model-studio) |
| China-site new-user quota is Beijing only | [Free quota](https://help.aliyun.com/zh/model-studio/new-free-quota) |
| International intro puts free quota in Singapore | [What is Model Studio](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) |
| Token Plan is Beijing only | [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview) |
| International sidebar also lists China (Hong Kong) | International intro; absent from the China-site intro. Use the site you are on |

You cannot turn the service off after activation. Stop calls by deleting keys. [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

## API keys

| Item | Official value |
|------|----------------|
| Env var | `DASHSCOPE_API_KEY` |
| PAYG after the security upgrade | `sk-ws…`, shown once |
| PAYG from before the upgrade | `sk-…`, still valid |
| Coding Plan / Token Plan dedicated | `sk-sp-` |
| Beijing / Singapore / Tokyo / Frankfurt | 50 keys per primary account per region |
| US (Virginia) | 20 per owning account; no disable/reset |
| Expiry | None; delete to revoke |
| RAM user deleted | That user's keys die |

Source: [Get an API key](https://help.aliyun.com/zh/model-studio/get-api-key).

## Base URL

Replace `{WorkspaceId}` with the workspace ID from the console.

| Region | OpenAI-compatible (model list / first call) | Anthropic-compatible (model list) |
|--------|---------------------------------------------|-----------------------------------|
| China (Beijing) | `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/apps/anthropic` |
| Singapore | `https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/apps/anthropic` |
| Japan (Tokyo) | `https://{WorkspaceId}.ap-northeast-1.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.ap-northeast-1.maas.aliyuncs.com/apps/anthropic` |
| Germany (Frankfurt) | `https://{WorkspaceId}.eu-central-1.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.eu-central-1.maas.aliyuncs.com/apps/anthropic` |
| US (Virginia) | `https://dashscope-us.aliyuncs.com/compatible-mode/v1` ([model list](https://help.aliyun.com/zh/model-studio/models)) | `https://dashscope-us.aliyuncs.com/apps/anthropic` |

DashScope native hosts use `/api/v1` on the same model-list page.

**Official pages disagree — this table picks a winner:**

- The intro sample still shows `{WorkspaceId}.us-east-1.maas.aliyuncs.com` for Virginia. The US row follows the **model list**.
- Coding Plan still lists PAYG OpenAI as `https://dashscope.aliyuncs.com/compatible-mode/v1`. New code follows **first call / model list**.

Coding Plan dedicated:

- OpenAI: `https://coding.dashscope.aliyuncs.com/v1`
- Anthropic: `https://coding.dashscope.aliyuncs.com/apps/anthropic`

Token Plan dedicated hosts come from the Token Plan console. Do not reuse the Coding Plan row.

## How to look up models

Do not maintain a full catalog here.

- [Models (ZH)](https://help.aliyun.com/zh/model-studio/models) / [Models (EN)](https://www.alibabacloud.com/help/en/model-studio/models)
- [Pricing](https://help.aliyun.com/zh/model-studio/model-pricing)

Intro tiers: Max = strongest; Plus = default recommendation; Flash = low latency. The 2026-08 intro names `qwen3.8-max`. The first-call sample uses `qwen-plus`.

FAQ: `qwen-plus-latest` is Qwen3, **not** an alias of Qwen3.5 / Qwen3.7. Those are sibling series.

## Plan comparison (numbers move; checkout wins)

From [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview) and [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) as opened 2026-08-19:

| | Token Plan Personal | Token Plan Team | Coding Plan Pro |
|--|---------------------|-----------------|-----------------|
| Meter | Credits, 7-day window | Credits / seat / month | Request counts (5-hour / week / month caps; first hit wins) |
| List price on that day | Lite CNY 39/mo promo (60); Standard 139 (180); Pro 499 (600) | Standard seat 150 promo (198); Pro 550 (698); Max 1,398 | CNY 200/mo; the page has mentioned a 39.90 first month — checkout wins |
| Region | Beijing only | Beijing only | See that page |
| Training data | Personal **is** used to improve the service (intro "Important") | Team: no training-use commitment | Inputs and outputs **are** used to improve the service |
| Refunds | That page / the agreement | That page / the agreement | Official: **no refunds** |
| Status | Official recommendation for new buys | Multi-seat | Lite: no new buys after 2026-03-20, no renewals after 2026-04-13; Pro is limited stock |

Coding Plan Pro caps on that page: 6,000 / 5 hours, 45,000 / week, 90,000 / month. Simple tasks ~5–10 requests; hard ones ~10–30+.

PAYG realtime offset order: new-user quota > resource pack > savings plan > account balance. [Free quota](https://help.aliyun.com/zh/model-studio/new-free-quota), [Billing](https://help.aliyun.com/zh/model-studio/billing-for-model-studio)

Batch is 50% of realtime and **cannot** use free quota / savings / packs.

Wanxiang membership does not offset Model Studio API. [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

## Model Studio CLI

| Item | Official value |
|------|----------------|
| npm package | `bailian-cli` |
| Commands | `bl`, `bailian` |
| Node | ≥ 22.12.0 |
| Install | `npm install -g bailian-cli` (not pnpm / yarn for this package) |
| Login | `bl auth login --console` |
| Smoke test | `bl text chat --message "ping" --non-interactive --output json` |
| Region flag | `--region cn\|us\|intl`, default `cn` |

Not `aliyun bailian`.

## Glossary index

One line each; definitions on the glossary page.

| Term | Hook |
|------|------|
| [Model Studio](./bailian-glossary#model-studio) | Platform, not a chat window |
| [Qwen](./bailian-glossary#qwen) | Model family and another product |
| [Lingma / Qoder CN](./bailian-glossary#lingma--qoder-cn) | IDE |
| [DashScope](./bailian-glossary#dashscope) | Legacy API brand; the env var remains |
| [Workspace](./bailian-glossary#workspace) | Isolation for ACL and bills |
| [Three protocols](./bailian-glossary#three-call-protocols) | OpenAI / Anthropic / DashScope |
| [Token Plan vs Coding Plan](./bailian-glossary#token-plan-vs-coding-plan) | Two subscriptions that cannot migrate |
| [Agent 1.0 vs 2.0](./bailian-glossary#agent-10-vs-20) | No upgrade path |
| [Two CLIs](./bailian-glossary#model-studio-cli-vs-alibaba-cloud-cli) | `bl` ≠ `aliyun bailian` |

## Sources

**Last systematic pass: 2026-08-19.**

### S: official source of truth

| Source | Use |
|--------|-----|
| [What is Model Studio (ZH)](https://help.aliyun.com/zh/model-studio/what-is-model-studio) | Definition, regions, billing boundary |
| [What is Model Studio (EN)](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) | International nav and regions |
| [Models](https://help.aliyun.com/zh/model-studio/models) | IDs, regions, three base URLs |
| [First API call](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) | Activation, samples |
| [Get an API key](https://help.aliyun.com/zh/model-studio/get-api-key) | Key format, caps, env var |
| [Billing items](https://help.aliyun.com/zh/model-studio/billing-for-model-studio) | Inference / train / deploy |
| [Pricing](https://help.aliyun.com/zh/model-studio/model-pricing) | Unit prices |
| [Free quota](https://help.aliyun.com/zh/model-studio/new-free-quota) | 90 days, stop switch |
| [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview) | Credits plans |
| [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) | Request plans, dedicated URL |
| [Clients](https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/) | Third-party tools |
| [CLI install](https://bailian.aliyun.com/cli/install.md) | `bailian-cli` |
| [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio) | Activate / cannot disable / vs Qwen |

### A: official but marketing or slow

| Source | Use |
|--------|-----|
| [China product page](https://www.aliyun.com/product/bailian) | Positioning; numbers lose to the help center |
| [Console](https://bailian.console.aliyun.com/) | Real activation and quota |
| [CLI landing](https://bailian.console.aliyun.com/cli) | CLI capabilities |
| [Privacy](https://help.aliyun.com/zh/model-studio/privacy-notice) | Cross-check plan data-use text |
| [Service agreement](https://terms.alicdn.com/legal-agreement/terms/common_platform_service/20230728213935489/20230728213935489.html) | §5.2 (named by Coding Plan) |

### B: verify

Community posts. IDs and hosts rot fast. Commands come from S only.

## Related

- [Map](./index)
- [Tutorial](./bailian)
- [Cookbook](./bailian-cookbook)
- [Glossary](./bailian-glossary)
