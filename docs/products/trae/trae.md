---
title: TraeCode tutorial
description: "Install TraeCode from the official download center, finish first-run setup, open a first project, and switch IDE mode and SOLO mode. The China site and the international site are separate surfaces."
domain: product
tags:
  - coding-agent
role: tutorial
---

# TraeCode tutorial

> This page gets **TraeCode** installed and a first project open. Install paths are copied from the international [Quickstart](https://docs.trae.ai/ide/set-up-trae) and the China [getting started](https://docs.trae.cn/ide_get-started-with-trae.md) page. Family boundaries: [learning map](./index.md). OS / device limits / URLs: [cheatsheet](./trae-cheatsheet.md).

## Goals and non-goals

**Goals**

- Tell the China site (`trae.cn` / `trae.com.cn`) from the international site (`trae.ai`)
- Install the TraeCode desktop IDE from the official download page
- Open a local folder, or clone a repo with the official steps
- Switch **IDE mode** and **SOLO mode** at the top left

**Non-goals**

- No TraeWork / Doubao / Coze / Ark tutorial
- No invented `brew` / `npm` / curl install commands (official install is a downloadable package)
- No TraeCode CLI (enterprise page: **coming soon**)
- No Legacy quota table presented as current pricing

## Prerequisites

OS table from the international [Quickstart](https://docs.trae.ai/ide/set-up-trae) and China [getting started](https://docs.trae.cn/ide_get-started-with-trae.md):

| OS | Arch | Official versions / formats |
|----|------|-----------------------------|
| macOS | Apple Silicon, Intel | **12.0** or later |
| Windows | 64-bit (x64) | **Windows 10, Windows 11** |
| Linux | 64-bit (x64), 64-bit (ARM64) | `.deb`: Ubuntu 20.04, Debian 11; `.rpm`: Fedora 42, RHEL 9.x |

Account: a TRAE account. Login methods differ by surface; see section 3.

## 1. Pick a surface: China vs international

The international header includes a China-site link. These are not mirrors.

| | International | China |
|--|---------------|-------|
| Marketing / download | [www.trae.ai](https://www.trae.ai/) · [www.trae.ai/download](https://www.trae.ai/download) | [www.trae.cn](https://www.trae.cn/) · Quickstart links [www.trae.com.cn](https://www.trae.com.cn) |
| Docs | [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) | [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code) ([`llms.txt`](https://docs.trae.cn/llms.txt)) |
| Device limit | **3** ([device-limit](https://docs.trae.ai/ide/device-limit)) | **10** ([ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md)) |
| Login (official text) | <!-- TODO: 待核实 —— 2026-08-19 international Quickstart English body did not yield a login-provider list --> | Phone number, Douyin, Apple, Juejin ([getting started](https://docs.trae.cn/ide_get-started-with-trae.md)) |

Do not treat the two installers as the same product on one machine. Accounts, quota, and device counts are separate.

## 2. Install from the official download

There is **no** official `curl | bash` or global npm package. The install entry is the download center.

### International

1. Open the [Download Center](https://www.trae.ai/download).
2. Use the **TraeCode** block (copy: Your 10x AI Coding Engineer; **Seamless switch between IDE and SOLO Mode**). Do not download **TraeWork** from the same page.
3. Pick macOS (12.0+, including Intel), Windows 10/11, or `.deb` / `.rpm`.
4. Install and launch.

International Quickstart: go to the official site, click **Download IDE** in the top right, download the package, install it.

macOS older than 12: the international Chinese Quickstart has said to download a build **below 3.5.25**. Use the Apple Silicon / Intel links on that page that day. This page does not invent extra URLs.

<!-- TODO: 待核实 —— international legacy-macOS package URLs were not extracted from the doc body on 2026-08-19. -->

### China site

China [getting started](https://docs.trae.cn/ide_get-started-with-trae.md):

1. Go to the [TRAE site](https://www.trae.com.cn), click **下载 IDE** in the top right, download and install.
2. If macOS is below 12, download a TRAE IDE build **below 3.3.25**:
   - [Apple Silicon](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-arm64.dmg)
   - [Intel](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-x64.dmg)

Do not merge China `3.3.25` with the international `3.5.25` note into one number.

## 3. First-run setup and login

Follow the wizard. China getting started lists:

- Theme and language
- Import settings from **VS Code or Cursor**
- Add TRAE-related command-line tools
- Sign in (China account types: section 1)

International [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) describes a full editor + Git + extension ecosystem. First-run wording follows the wizard of the build you downloaded.

「Add TRAE-related command-line tools」 is a wizard step. Official pages **do not** publish a binary name or a `brew install` string. This page does not invent one.

China extra step (same getting-started page): **Settings > Development environment**, configure Node.js. Add a local SDK, or download the Node.js SDK bundled with TRAE IDE.

## 4. Open the first project

Three official entries (international Quickstart and China getting started match):

**Import a local folder**

1. Click **Open Folder** in the center of the left panel, or **Select project > Open Folder** at the top left.
2. Choose a local folder.

**Clone from GitHub**

1. Click **Clone Git Repository**, or **Select project > Clone Git Repository**.
2. In the top panel, click **Clone from GitHub**.
3. Finish GitHub authorization, clone, and open.

**Clone from a URL**

1. Same **Clone Git Repository** entry.
2. Paste the Git URL, click **Repository URL {URL}**.
3. Follow the prompts, clone, and open.

Once it is open, confirm the tree and terminal in IDE mode. Ask the agent for a read-only repo survey before edits. Review the diff. Do not turn on auto-run on the first pass.

## 5. Switch IDE mode and SOLO mode

Official: [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae), [SOLO mode overview](https://docs.trae.ai/ide/solo-mode), [Quickstart](https://docs.trae.ai/ide/set-up-trae).

Use the mode switch at the **top left**.

| Mode | Official behavior | Use when |
|------|-------------------|----------|
| **IDE mode** | Editor, terminal, debug, extensions, source control; you control each step | Fine-grained edits in an existing repo |
| **SOLO mode** | AI leads planning through requirement understanding, generation, testing, and preview (the SOLO page also mentions deploy) | A vertical feature from natural language |

How to open SOLO: switch the mode to **SOLO**. Left to right: task panel, AI chat, tool panel ([SOLO mode overview](https://docs.trae.ai/ide/solo-mode)).

Input (SOLO page): natural language, voice, local file upload.

The SOLO page also lists SOLO Agent, multitasking, the tool panel (editor / docs / browser), Figma import, Supabase, deploy (Vercel is the example), AI services, payments (Stripe is the example), and the change diff. Follow those official child pages. This tutorial does not grow a second How-to.

**Do not** install TraeWork because you want SOLO. TraeWork is a separate client. Official copy: it builds upon TraeCode SOLO mode.

## 6. Agents and CUE

[What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) / [CN same page](https://docs.trae.cn/ide_what-is-trae-code):

- **Agents**: define tasks in natural language; search the codebase, plan steps, call tools. Custom agents can take prompts, MCP servers, and toolsets.
- **CUE**: completion, chained completion, multi-line edits, next-edit prediction and navigation; smart import and rename in **Python, TypeScript, and Golang**.
- **Context**: files, folders, snippets, terminal output, repos, document sets, web pages.
- **Models**: several built-in models; add custom models with an API key. The live list is the table on [models](https://docs.trae.ai/ide/models) that day. This page does not copy a roster that goes stale.

The China What-is page also documents a 「速通」 boost when a model is queued. That paragraph is **not** on the international English What-is page as of 2026-08-19.

Safety (both What-is pages):

- **Privacy mode**: chats, snippets, and AI outputs are not used for analysis, product optimization, or training. Codebase files stay on the local device.
- **Sandbox**: agent commands can run in a restricted environment with file-access controls and high-risk command blocking.

## 7. Device limit

Clients that count (same structure on both sites): **TraeCode**, **TraeWork Desktop**, **TRAE mobile**. **TraeWork Web does not count**. TraeCode + TraeWork Desktop on the same PC count as **1** device.

The cap differs:

- International: **3** ([device-limit](https://docs.trae.ai/ide/device-limit))
- China: **10** ([ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md))

At the cap, login shows Device limit reached / **设备数量已达上限**. **Sign out** on a device you already use. Signing out a machine that has both TraeCode and TraeWork Desktop signed in signs both out.

## Common pitfalls

1. **Downloading TraeWork from the download page.** This tutorial is TraeCode.
2. **Mixing China and international packages or accounts.** Device caps and login providers differ.
3. **Treating SOLO mode as a separate TraeWork install.** SOLO is the top-left switch inside TraeCode.
4. **Inventing a CLI install command.** Official install is a package; CLI is coming soon on the enterprise page.
5. **Copying the Legacy quota table as current pricing.** Use [pricing](https://www.trae.ai/pricing) and the current plans page.
6. **Using the other site's old-macOS fallback.** China official direct links are Trae CN dmgs **below 3.3.25**.

## Next steps

- Official URLs, OS, device limits → [cheatsheet](./trae-cheatsheet.md)
- Family boundaries → [learning map](./index.md)
- Skills / MCP / custom agents → [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) or [docs.trae.cn/llms.txt](https://docs.trae.cn/llms.txt)
