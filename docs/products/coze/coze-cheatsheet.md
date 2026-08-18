---
title: Coze cheatsheet
description: "Lookup only. Plans, channels, CLI, limits, official sources. Numbers follow the official pages; the paywall moves."
domain: product
tags:
  - agent-builder
role: cheatsheet
---

# Coze cheatsheet

Lookup only. Prices, credits, and QPM follow the console. Figures below were copied on 2026-08-19 from [plans](https://docs.coze.cn/guides_edition.md). Enterprise prices changed at **2026-07-14 00:00**.

## Entry points

| Job | URL |
|-----|-----|
| Coze workspace | https://www.coze.cn/ |
| Coze Programming | https://code.coze.cn/ |
| China docs | https://docs.coze.cn/ |
| Doc index | https://docs.coze.cn/llms.txt |
| Entitlements (console) | https://code.coze.cn/subscription-paywall |
| International | https://www.coze.com/ |
| International docs | https://docs.coze.com/ |
| OpenAPI (intl.) | https://www.coze.com/open/docs |
| Enterprise product page | https://www.volcengine.com/product/coze-pro |
| Coze Studio | https://github.com/coze-dev/coze-studio |
| Coze Loop | https://github.com/coze-dev/coze-loop |

## Decision table

| Job | Use | Skip |
|-----|-----|------|
| Visual chat bot | Programming · low-code agent | Doubao, Trae |
| Fixed multi-step job | Low-code workflow / chatflow | One giant persona |
| One sentence → full-code project | Programming · AI programming | The coze.cn agent canvas |
| Terminal / other agent | `@coze/cli` | Invented package names |
| Office + video with agents | Coze coze.cn | This tutorial track |
| Data must not leave | Coze Studio | Private Programming (unsupported) |
| Eval / traces | Coze Loop | Treating Loop as a builder |

Glossary index (one line each; details in the [glossary](./coze-glossary.md)):

| Term | Hook |
|------|------|
| [Coze](./coze-glossary.md#coze) | Workspace |
| [Coze Programming](./coze-glossary.md#coze-programming) | Builder |
| [Low-code agent](./coze-glossary.md#low-code-agent) | Formerly Bot |
| [Workflow / chatflow](./coze-glossary.md#workflow--chatflow) | Canvas |
| [Plugin](./coze-glossary.md#plugin) | API toolset |
| [Skill](./coze-glossary.md#skill) | `SKILL.md` |
| [Knowledge](./coze-glossary.md#knowledge) | Static retrieval |
| [Coze CLI](./coze-glossary.md#coze-cli) | `coze` binary |
| [Coze Studio](./coze-glossary.md#coze-studio) | OSS single-node core |

## Plans and credits

Source: [guides_edition](https://docs.coze.cn/guides_edition.md). Live entitlements: [paywall](https://code.coze.cn/subscription-paywall).

| | Personal free | Plus | Pro | Flagship | Ultra | Team Pro | Team Flagship | Team Ultra | Ent. Standard | Ent. Flagship |
|--|---------------|------|-----|----------|-------|----------|---------------|------------|---------------|---------------|
| CNY / month | 0 | 39.9 | 99 | 199 | 999 | from 198 | from 398 | from 1998 | from 980 | from 8980 |
| Credits / month | ➖ | 30k | 99k | 199k | 999k | from 198k | from 398k | from 1.998M | from 345k | from 2.07M |

Official rules:

- Personal / team: zero credits means stop.
- Enterprise: zero credits **debits cash**.
- Team plans launched **2026-06-22**.
- Personal / team support is Coze; enterprise support is Volcengine.

Builder excerpts (personal column):

| Item | Free | Plus | Pro | Flagship | Ultra |
|------|------|------|-----|----------|-------|
| Strip programming logo | ➖ | ✔️ | ✔️ | ✔️ | ✔️ |
| Change `.coze.site` prefix | ➖ | ✔️ | ✔️ | ✔️ | ✔️ |
| Custom domain + free SSL | ➖ | ➖ | ➖ | ✔️ | ✔️ |
| DDoS on web projects | ➖ | ➖ | ✔️ | ✔️ | ✔️ |
| Programming QPM | 100 | 600 | 600 | 6000 | 6000 |
| One-click OpenClaw deploy | ➖ | ➖ | ✔️ | ✔️ | ✔️ |
| Local agents | 1 (promo) | 1 | 3 | 10 | unlimited |
| Coze CLI | Limited preview, all tiers ✔️ | | | | |

SSO, VPC private link, custom content safety, customer-managed session keys: enterprise flagship only. Enterprise skill store: team ultra or enterprise flagship.

English plan nicknames above are labels for the Chinese 免费 / 进阶 / 高阶 / 旗舰 / 尊享 rows. The paywall UI may still show the Chinese names.

## Coze CLI

```bash
npm install -g @coze/cli --foreground-scripts
coze self skill install
coze self skill install --target trae
coze auth login --oauth
```

| Item | Value |
|------|--------|
| Package | `@coze/cli` |
| Binary | `coze` |
| npm `latest` 2026-08-19 | `0.3.10` |
| Docs | [developer_guides_coze_cli](https://docs.coze.cn/developer_guides_coze_cli) |
| Flag source of truth | `coze --help`, [npm](https://www.npmjs.com/package/@coze/cli) |

Official modules: accounts & spaces, AI programming, project resources, code & data, multimodal, agent automation. Subcommands move; do not copy blogs.

## Publish channels

Source: [publish overview](https://docs.coze.cn/guides_publish_overview.md).

| Class | Channel | Agent | App |
|-------|---------|-------|-----|
| Coze | Store / community | ✔️ | ✔️ |
| Coze | Template | Not open | After campaign awards |
| Chat | Feishu, Feishu Bitable | ✔️ | Feishu ✔️ |
| Chat | WeChat CS / service / subscription | ✔️ | ✔️ |
| Chat | Juejin | ✔️ | No |
| Mini program | Douyin, WeChat | ✔️ | ✔️ |
| Integrate | API, Chat SDK | ✔️ | ✔️ |
| Chat | Doubao | **Closed 2026-07-01** | — |

Also: team custom channels; public channels only if enterprise flagship publishes them.

## Limits

| Limit | Official |
|-------|----------|
| Private Programming | Not supported |
| Plugins / space | 1000 |
| IDE plugins / account | 30 |
| Tools / plugin | 100 |
| Custom plugin QPS | 50 |
| Plugin deps | 250 MB |
| Store / debug chat | 10 min → “run aborted” |
| Paid third-party plugins | No Feishu Bitable, Juejin, Doubao, some public channels |
| Workflow / image-flow store | Removed |
| Douyin avatar | Removed 2025-09-03 |
| Agents @ agents | Humans @ agents; agents @ humans; not agent-to-agent |

## Sources

Checked 2026-08-19.

| Source | Use | How |
|--------|-----|-----|
| [docs.coze.cn/llms.txt](https://docs.coze.cn/llms.txt) | Family + tree | Plain index |
| Sibling `.md` | Topic pages | e.g. `guides_quickstart.md` |
| [guides_edition](https://docs.coze.cn/guides_edition.md) | Plans | Prices change |
| [guides_FAQ](https://docs.coze.cn/guides_FAQ.md) | OSS vs cloud, retired channels | Beats blogs |
| [cozespace_coze_app_faq](https://docs.coze.cn/cozespace_coze_app_faq.md) | Coze 3.0, local/cloud agents | |
| [developer_guides_coze_cli](https://docs.coze.cn/developer_guides_coze_cli.md) | CLI | Pair with npm |
| [coze-studio](https://github.com/coze-dev/coze-studio) | OSS builder | README / wiki |
| [docs.coze.com](https://docs.coze.com/) | International | Do not mix steps |
| Community courses | Clues only | **Numbers and channels: official pages** |
