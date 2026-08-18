---
title: Trae cheatsheet
description: "Lookup only. OS, device limits, mode decisions, and official URLs copied from docs.trae.ai / docs.trae.cn. Plan prices follow the live pricing page, not the Legacy table."
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# Trae cheatsheet

Lookup only. Install steps: [tutorial](./trae.md). Family boundaries: [learning map](./index.md). Coverage: official pages opened 2026-08-19.

## Which surface

| Job | Go here |
|-----|---------|
| Local coding, repo edits, CUE | **TraeCode** desktop IDE |
| Fine-grained control | TraeCode **IDE mode** |
| Natural language through preview / deploy | TraeCode **SOLO mode** (top-left switch) |
| Slides / docs / data / cross-device dispatch | **TraeWork** (not this directory) |
| Stay in VS Code / JetBrains | **TraeCode Plugin** (enterprise page; no tutorial here) |
| Terminal batch / CI | **TraeCode CLI** (official coming soon; do not invent commands) |
| Mainland China account, Juejin / Douyin login | **China site** `trae.cn` / `trae.com.cn` |
| International pricing, English docs | **International** `trae.ai` |

## Install entries (no official CLI install string)

| Surface | Entry |
|---------|-------|
| International TraeCode | [www.trae.ai/download](https://www.trae.ai/download) → **TraeCode** block |
| China | [www.trae.com.cn](https://www.trae.com.cn) top-right **下载 IDE** (marketing homepage also at [www.trae.cn](https://www.trae.cn/)) |
| China macOS &lt; 12 | Below **3.3.25**: [arm64 dmg](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-arm64.dmg) · [x64 dmg](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-x64.dmg) |

## Operating systems

Sources: [Quickstart](https://docs.trae.ai/ide/set-up-trae), [ide_get-started-with-trae.md](https://docs.trae.cn/ide_get-started-with-trae.md)

| OS | Arch | Version / format |
|----|------|------------------|
| macOS | Apple Silicon, Intel | 12.0+ |
| Windows | x64 | 10, 11 |
| Linux | x64, ARM64 | `.deb` Ubuntu 20.04 / Debian 11; `.rpm` Fedora 42 / RHEL 9.x |

## Device limit

| | International | China |
|--|---------------|-------|
| Cap | **3** | **10** |
| Counts | TraeCode, TraeWork Desktop, TRAE mobile | Same |
| Does not count | TraeWork Web | Same |
| Same PC | TraeCode + TraeWork Desktop = 1 device | Same |

Sources: [docs.trae.ai/ide/device-limit](https://docs.trae.ai/ide/device-limit), [docs.trae.cn/ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md)

## Open a project

| Action | Official entry |
|--------|----------------|
| Local folder | **Open Folder** or **Select project > Open Folder** |
| GitHub | **Clone Git Repository** → **Clone from GitHub** |
| Any Git URL | **Clone Git Repository** → paste URL → **Repository URL {URL}** |

## Plan pointer

- Live international: [www.trae.ai/pricing](https://www.trae.ai/pricing) — Lite / Pro / Pro+ / Ultra. Pro copy: **Free for 7 days. Then $10/month.**
- Do not treat [Legacy billing](https://docs.trae.ai/ide/billing) as current
- China credits: follow [docs.trae.cn](https://docs.trae.cn/llms.txt); this table does not invent amounts

## High-quality sources

| Source | URL | Use for |
|--------|-----|---------|
| International homepage | <https://www.trae.ai/> | TraeCode / TraeWork split |
| Download Center | <https://www.trae.ai/download> | Packages; do not grab TraeWork |
| Pricing | <https://www.trae.ai/pricing> | Current tiers |
| Enterprise | <https://www.trae.ai/enterprise> | Plugin / CLI coming soon / teams |
| TraeWork marketing | <https://www.trae.ai/work> | Office-workspace job |
| What is TraeCode? | <https://docs.trae.ai/ide/what-is-trae> | IDE / SOLO / CUE / privacy |
| Quickstart | <https://docs.trae.ai/ide/set-up-trae> | Install, open project, switch modes |
| SOLO | <https://docs.trae.ai/ide/solo-mode> | SOLO UI and capabilities |
| Device limit | <https://docs.trae.ai/ide/device-limit> | International cap of 3 |
| Changelog (docs) | <https://docs.trae.ai/ide/changelog> | Versions |
| Models | <https://docs.trae.ai/ide/models> | Built-in model table |
| What is TRAE Work? | <https://docs.trae.ai/solo/what-is-trae-solo> | TraeWork three clients |
| China homepage | <https://www.trae.cn/> | CN marketing |
| China Quickstart download link | <https://www.trae.com.cn> | CN download entry |
| China docs | <https://docs.trae.cn/ide_what-is-trae-code> | CN What is |
| China llms.txt | <https://docs.trae.cn/llms.txt> | CN doc tree |
| China getting started .md | <https://docs.trae.cn/ide_get-started-with-trae.md> | CN install source |
| Volcengine listing | <https://www.volcengine.com/product/trae> | CN cloud catalog |
