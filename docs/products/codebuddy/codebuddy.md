---
title: CodeBuddy Tutorial
description: "Install CodeBuddy IDE, the editor plugin, or the CLI from official steps and finish the first sign-in. Commands are copied from the codebuddy.cn docs, not rewritten from memory."
domain: product
tags:
  - coding-agent
role: tutorial
---

# CodeBuddy Tutorial

> This is a **tutorial** — follow it once and you will download or install one surface, sign in, and send a first prompt.
>
> Look up commands in the [Cheatsheet](./codebuddy-cheatsheet); copy recipes from the [Cookbook](./codebuddy-cookbook); untangle names in the [Glossary](./codebuddy-glossary).

Goal: stop treating CodeBuddy as "Tencent also has a coding assistant" and start knowing whether to open the IDE, install the plugin, or run `codebuddy`.

## Step 0: pick a surface

The three official coding forms are not one product with three skins. The table is from the [product overview](https://cloud.tencent.com/document/product/1831/134343):

| Your situation | Use |
|----------------|-----|
| You already live in VS Code / JetBrains / Visual Studio | **Plugin** |
| You want one sentence → prototype, mock, deployable app | **IDE** |
| You work in a terminal, or need headless / CI / bulk repo edits | **CLI (CodeBuddy Code)** |

The three forms share one account quota ([troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)). Install one to start.

The pricing page is client-rendered. This site does not invent plan numbers. See [codebuddy.cn/pricing](https://www.codebuddy.cn/pricing/). The page description mentions a limited-time free personal plan, a limited-time free enterprise flagship plan, and a dedicated enterprise edition.

## Install the IDE

Source: [Install and sign-in](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation).

**Requirements** (official table):

| OS | Supported versions |
|----|--------------------|
| macOS | macOS 11 (Big Sur) and later |
| Windows | Windows 10 and later (Windows 7/8/8.1 not supported) |

Official note: systems that miss those versions cannot start CodeBuddy IDE.

**Download**: [CodeBuddy CN](https://www.codebuddy.cn/) or the [IDE landing page](https://www.codebuddy.cn/ide/), matching your CPU. Official CN download is also listed as [copilot.tencent.com/ide](https://copilot.tencent.com/ide); intl is [codebuddy.ai](https://www.codebuddy.ai/).

**macOS**: drag the package into Applications.

**Windows** (official steps):

1. Double-click the installer. If it asks to install for the current user only, choose **OK**.
2. Accept the agreement.
3. Pick the install location and keep choosing **Next**.

**Personal sign-in** (official): open the IDE → **Sign in** → WeChat or phone number → return to the IDE.

Enterprise / dedicated editions use Tencent Unified Identity or an address from your admin. This tutorial does not cover purchase.

Update: top-right **Account** → **Check for updates** → **Install now** if a build is waiting.

## Install the plugin

Source: [Plugin docs home](https://www.codebuddy.cn/docs/plugin/).

**Official minimum versions** (plugin page; the overview lists Visual Studio as 17.0, the plugin page lists 17.6 — this table follows the plugin page):

| IDE | Minimum |
|-----|---------|
| Visual Studio Code | 1.82 |
| Visual Studio | 17.6 (VS 2022) |
| IntelliJ IDEA / PyCharm / GoLand / CLion / PhpStorm | 2022.2 |
| Android Studio | Flamingo \| 2022.2.1 |
| WeChat DevTools IDE | 1.06.2409140 |

Official notes: other JetBrains IDEs follow the JetBrains marketplace; a compatibility pack goes down to 2020.3 but "cannot use the latest product features".

**VS Code** (three official paths):

1. Install VS Code 1.82+.
2. Install the extension by any of:
   - Official one-click install (VS Code must already be installed)
   - Marketplace search **腾讯云代码助手**
   - Download the package and install it by hand

**JetBrains**: Settings → **Plugins** → search **腾讯云代码助手** → **Install**; or install from disk.

**Sign-in**: official [login page](https://www.codebuddy.cn/docs/plugin/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/%E7%99%BB%E5%BD%95%E5%8F%8A%E9%80%80%E5%87%BA) — click the status-bar icon or the plugin login page.

Plugin capabilities ([product overview](https://cloud.tencent.com/document/product/1831/134343)): inline completion, fix, explain, unit tests, local review, `@workspace` / `#Codebase`, chat, custom instructions, RAG knowledge bases, Hunyuan / DeepSeek model switching.

First session: open a file you know, accept one completion, then ask what the file does. For repo-level questions use the official `@workspace` or `#Codebase` mentions. Do not assume the plugin has ingested every repo at the company.

## Install the CLI

The product name is **CodeBuddy Code**. The binary is `codebuddy`. The npm package is `@tencent-ai/codebuddy-code`.

Sources: [Installation guide](https://www.codebuddy.cn/docs/cli/installation), [Quick start](https://www.codebuddy.cn/docs/cli/quickstart).

### Package managers (start here)

**Prerequisite (install page):** Node.js **18.20** or later.

The troubleshooting page says the same. The docs overview CLI section says `Node.js 18.0+`. Tencent Cloud intl FAQ has said Node.js 22+. This page follows the install guide.

Official package-manager commands:

```bash
npm install -g @tencent-ai/codebuddy-code
```

```bash
pnpm add -g @tencent-ai/codebuddy-code
```

```bash
yarn global add @tencent-ai/codebuddy-code
```

```bash
bun install -g @tencent-ai/codebuddy-code
```

**Homebrew (macOS/Linux, no Node.js)** from the install page:

```bash
brew tap Tencent-CodeBuddy/tap
brew install codebuddy-code
```

or:

```bash
brew install Tencent-CodeBuddy/tap/codebuddy-code
```

Verify (install page):

```bash
codebuddy --version
```

### Native binary (Beta)

The install page marks native install as **Beta**. Platforms: macOS (Apple Silicon or Intel x86_64), Linux (arm64 or x86_64), Windows (x86_64).

Migrate from npm:

```bash
codebuddy install
```

Fresh install (**install page**):

```bash
curl -fsSL https://www.codebuddy.cn/cli/install.sh | bash
```

```powershell
irm https://www.codebuddy.cn/cli/install.ps1 | iex
```

The [quick start](https://www.codebuddy.cn/docs/cli/quickstart) publishes a second official pair:

```bash
curl -fsSL https://copilot.tencent.com/cli/install.sh | bash
```

```powershell
irm https://copilot.tencent.com/cli/install.ps1 | iex
```

Both pages are official. Do not merge them. Follow the page you are reading.

If the command is missing, the install page says add:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Windows: `%USERPROFILE%\AppData\Local\codebuddy\bin`.

Windows troubleshooting also requires **Git Bash** ([troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)).

Update:

```bash
codebuddy update
```

or re-run the package-manager install. Disable auto-update with `export DISABLE_AUTOUPDATER=1`.

Default config dir: `~/.codebuddy` (Windows `%USERPROFILE%\.codebuddy`). Override with `CODEBUDDY_CONFIG_DIR`. The install page says this avoids clashes with other apps that use the CodeBuddy engine (for example WorkBuddy).

## Sign in to the CLI

Source: [Quick start · login](https://www.codebuddy.cn/docs/cli/quickstart).

On first launch:

```
Select login method:
› Log in via Chinese Site
  Log in via International Site
  Log in via Enterprise Domain
  Log in via iOA (Tencent only)
```

| Method | When | Notes |
|--------|------|-------|
| **Chinese Site** | Users in China | Auth via copilot.tencent.com |
| **International Site** | Users outside China | Auth via codebuddy.ai |
| **Enterprise Domain** | Dedicated / private deploy | Needs the address from your company |
| **iOA** | Tencent employees | Internal only |

Use `↑↓` and `Enter`; the browser finishes auth.

## First CLI session

```bash
cd /path/to/your/project
codebuddy
```

Official strong recommendation:

```
> /init
```

The [quick start](https://www.codebuddy.cn/docs/cli/quickstart) calls `/init` "strongly recommended": it builds a project knowledge graph so later turns scan less. After a large structural change: `/clear` then `/init`.

Then:

```
> Help me analyze this project's structure
```

Language: `/config` → Language after launch.

One-shot (official examples):

```bash
codebuddy -p "Optimize this SQL query"
```

When the turn needs files or shell, official docs require `-y` or `--dangerously-skip-permissions`:

```bash
codebuddy -p "Review code quality of src/utils.js" -y
```

Permission modes: `Shift+Tab` (Windows also `Alt+M`). The quick start cycle is `default → bypass → accept → plan`. `--permission-mode` values on the [CLI reference](https://www.codebuddy.cn/docs/cli/cli-reference) are `default`, `acceptEdits`, `auto`, `dontAsk`, `plan`, `bypassPermissions`. Do not mix the short key-cycle names with the flag names in scripts.

Full command table: [Cheatsheet](./codebuddy-cheatsheet).

## Step 4: write down standing rules

CLI troubleshooting maps `CLAUDE.md` → `CODEBUDDY.md` as the "AI instructions and memory" file. The user-level path in the migration sample is `~/.codebuddy/CODEBUDDY.md`. Whether a repo-root `CODEBUDDY.md` is auto-injected is not a hard sentence on that page — check `/config` and the official memory doc instead of guessing.

The official "symlink (recommended)" migration is in the [Cookbook](./codebuddy-cookbook#migrate-from-claude-code).

## Guardrails

- **Copy install commands from official pages.** The npm package is `@tencent-ai/codebuddy-code`, not a guessed `@tencent/codebuddy`.
- **Native install has two official URL pairs** (`codebuddy.cn/cli` and `copilot.tencent.com/cli`). Do not invent a third.
- **`-p` is not "allow everything".** File / shell / network turns need an explicit permission policy.
- **Do not treat WorkBuddy, Yuanbao, or Hunyuan as the next lesson.** They are one row each on the [map](./).
- **Do not amplify marketing percentages** such as "90% efficiency".

## Next

- Recipes: [Cookbook](./codebuddy-cookbook)
- Commands and keys: [Cheatsheet](./codebuddy-cheatsheet)
- Concepts: [Glossary](./codebuddy-glossary)
- Official CLI next: the "Getting started" group on [CLI docs](https://www.codebuddy.cn/docs/cli/)
