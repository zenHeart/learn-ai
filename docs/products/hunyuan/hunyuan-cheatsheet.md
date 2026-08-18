---
title: Tencent Hunyuan cheatsheet
description: "Lookup only. Slugs, endpoints, and prices follow the live TokenHub pages. Rechecked 2026-08-19."
domain: product
tags:
  - hunyuan
  - llm-api
role: cheatsheet
---

# Tencent Hunyuan cheatsheet

Lookup only. Slugs and prices move. Follow the official links.

## Decisions

| Job | Pick |
|-----|------|
| Language model from your app | TokenHub `hy3` |
| Browser try-out | [AI Studio](https://aistudio.tencent.com/) |
| Translation | `hy-mt2-pro` / `plus` / `lite` |
| Role-play | `hy-role` / `hunyuan-role-latest` |
| Image | `hy-image-v3.0` |
| 3D | `hy-3d-3.1` |
| Self-host | [tencent/Hy3](https://huggingface.co/tencent/Hy3), not TokenHub |
| Chat app | Yuanbao, not this table |
| Coding IDE | CodeBuddy, not this table |

## Endpoint and auth

| Item | Value | Source |
|------|-------|--------|
| Base URL | `https://tokenhub.tencentmaas.com/v1` | [Quick start](https://cloud.tencent.com/document/product/1823/130058) |
| Chat Completions | `POST /v1/chat/completions` | same + [132252](https://cloud.tencent.com/document/product/1823/132252) |
| Auth | `Authorization: Bearer <TokenHub API Key>` | same |
| Protocols | OpenAI Chat Completions, OpenAI Responses, Anthropic Messages | [132252](https://cloud.tencent.com/document/product/1823/132252) |
| Console | https://console.cloud.tencent.com/tokenhub | TokenHub product page |

Local open-weight default: `http://127.0.0.1:8000/v1`, `api_key` may be `EMPTY` (Hy3 README).

## Hy-family `model` values

Source: [model list](https://cloud.tencent.com/document/product/1823/130051) (rechecked 2026-08-19). Hy / Hunyuan rows only.

| Name | `model` | Context | Max in / out | Official capabilities |
|------|---------|---------|--------------|------------------------|
| Hy3 | `hy3` | 256k | 192k / 128k | retained thinking, structured output, function calling, cache |
| Hy3 preview | `hy3-preview` | 256k | 192k / 128k | interleaved thinking; **retires 2026-08-31** |
| Hy-MT2-Pro | `hy-mt2-pro` | 8k | 4k / 4k | translation flagship |
| Hy-MT2-Plus | `hy-mt2-plus` | 8k | 4k / 4k | translation |
| Hy-MT2-Lite | `hy-mt2-lite` | 8k | 4k / 4k | light translation |
| Hy-Role-Latest | `hunyuan-role-latest` | 32k | 28k / 4k | role-play |
| Hy-Role | `hy-role` | 32k | 28k / 4k | role-play |
| HY-Image-V3.0 | `hy-image-v3.0` | — | — | T2I, I2I |
| Hy-Image-Lite | `hy-image-lite` | — | — | T2I |
| HY-Video-1.5 | `hy-video-1.5` | — | — | T2V, I2V |
| HY-3D-3.0 | `hy-3d-3.0` | — | — | T23D, I23D |
| HY-3D-3.1 | `hy-3d-3.1` | — | — | T23D, I23D |
| HY-3D-Express | `hy-3d-express` | — | — | fast 3D |
| HY-Vision-2.0-Instruct | `hy-vision-2.0-instruct` | 44k | 24k / 16k | image-to-text |
| HY-Vision-1.5-Thinking | `hunyuan-t1-vision-20250916` | 40k | 16k / 24k | vision thinking |
| HY-Vision-Video | `hunyuan-turbos-vision-video-20250728` | 32k | 24k / 8k | video understanding |

Concurrency and task types stay on the model-list page.

## Prices (pay-as-you-go, CNY / million tokens)

Source: [pricing](https://cloud.tencent.com/document/product/1823/130055), “last updated 2026-08-14 21:58:00”. Bills win.

| Model | Input | Output | Cache hit |
|-------|-------|--------|-----------|
| Hy3 | 1 | 4 | 0.25 |
| Hy3 preview (input &lt; 16k) | 1.2 | 4 | 0.4 |
| Hy3 preview (16k–32k) | 1.6 | 6.4 | 0.6 |
| Hy3 preview (32k+) | 2 | 8 | 0.8 |
| Hy-MT2-Pro / Plus | 0.5 | 2 | — |
| Hy-MT2-Lite | 0.3 | 1.2 | — |
| Hy-Role / Latest | 2.4 | 9.6 | — |
| Hy-Image-3.0 | 10 (20,000 tokens/image → about 0.2 CNY/image) | | |

Free tier: claim it in Model Square. **The console is the source of truth.**

## Thinking fields

| Surface | Field | Values | Source |
|---------|-------|--------|--------|
| TokenHub | `thinking` | `{ "type": "enabled" }` | [132252](https://cloud.tencent.com/document/product/1823/132252) |
| TokenHub | `reasoning_effort` | default `low` on `hy3`; `high` allowed; `low`→`high` when `tools` present | same |
| tclm product page | copy | `no_think` / `think_low` / `think_high` | [tclm](https://cloud.tencent.com/product/tclm) |
| Open README | `chat_template_kwargs.reasoning_effort` | `no_think` (default) / `low` / `high` | [Hy3 README](https://github.com/Tencent-Hunyuan/Hy3) |

Recommended sampling (README): `temperature=0.9`, `top_p=1.0`. TokenHub’s basic sample also uses `temperature: 0.9`.

## Glossary index

One line each. Definitions: [glossary](./hunyuan-glossary.md).

| Term | Hook |
|------|------|
| [Hy / Hunyuan](./hunyuan-glossary.md#hy--hunyuan) | Model family, not an app |
| [Hy3](./hunyuan-glossary.md#hy3) | Current flagship LM |
| [TokenHub](./hunyuan-glossary.md#tokenhub) | Multi-vendor gateway |
| [1729](./hunyuan-glossary.md#two-cloud-doc-trees) | Older Hunyuan API tree |
| [Yuanbao](./hunyuan-glossary.md#sibling-products-are-not-hunyuan) | Consumer assistant |
| [CodeBuddy](./hunyuan-glossary.md#sibling-products-are-not-hunyuan) | Coding product |

## High-quality sources

- **[Hunyuan site](https://hunyuan.tencent.com/)** — first-level model/research nav. Use a browser (SPA). Last checked: 2026-08-19
- **[TokenHub docs](https://cloud.tencent.com/document/product/1823)** — enablement, calls, billing. Last checked: 2026-08-19
- **[Model list](https://cloud.tencent.com/document/product/1823/130051)** — slug SSOT. Last checked: 2026-08-19
- **[Hy call guide](https://cloud.tencent.com/document/product/1823/132252)** — `hy3` request samples. Last checked: 2026-08-19
- **[Pricing](https://cloud.tencent.com/document/product/1823/130055)** — pay-as-you-go table. Last checked: 2026-08-19
- **[Quick start](https://cloud.tencent.com/document/product/1823/130058)** — keys and first call. Last checked: 2026-08-19
- **[Claude Code × Hy3](https://cloud.tencent.com/document/product/1823/131903)** — official wiring. Last checked: 2026-08-19
- **[Hy3 GitHub](https://github.com/Tencent-Hunyuan/Hy3)** / **[HF tencent/Hy3](https://huggingface.co/tencent/Hy3)** — open specs and serve commands. Last checked: 2026-08-19
- **[org Tencent-Hunyuan](https://github.com/Tencent-Hunyuan)** — other modalities. Last checked: 2026-08-19
- **[Hy AI Studio](https://aistudio.tencent.com/)** — playground. Last checked: 2026-08-19
- **Unverified:** standalone Co-design landing URL (header item exists; scrape only returned the SPA shell).
