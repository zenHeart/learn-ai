---
title: Lingma cheatsheet
description: "TONGYI Lingma / Qoder CN install URLs, compatibility, shortcuts, chat modes, plans, and official sources. Copied from pages that open."
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# Lingma cheatsheet

> **Reference.** Do not learn from this page. Concepts: [glossary](./lingma-glossary). First run: [tutorial](./lingma).
>
> Last verified: 2026-08-19. When Help Center and [docs.qoder.cn](https://docs.qoder.cn/) disagree, this table records both.

## Term index

| Term | One line |
|------|----------|
| [TONGYI Lingma / Qoder CN](./lingma-glossary#tongyi-lingma--qoder-cn) | Alibaba Cloud coding assistant; renamed 2026-05-20 |
| [Qoder CN IDE](./lingma-glossary#qoder-cn-ide--lingma-ide) | Standalone IDE; marketing still says Lingma IDE |
| [IDE plugins](./lingma-glossary#ide-plugins) | JetBrains / VS Code / Visual Studio |
| [Ask / Edit / Agent](./lingma-glossary#ask--edit--agent) | Chat modes, not products |
| [NES](./lingma-glossary#nes-next-edit-suggestion) | Next-edit prediction |
| [Credits](./lingma-glossary#credits) | Usage unit from 2026-05-20 |
| [Qwen / Model Studio](./lingma-glossary#not-this) | Sibling products, not this handbook |

## Install entry points

| Surface | Official entry | Official note |
|---------|----------------|---------------|
| Qoder CN IDE | [qoder.com.cn/download](https://qoder.com.cn/download) | URL named by Help Center |
| Lingma IDE (legacy brand page) | [lingma.aliyun.com/download](https://lingma.aliyun.com/download) | Marketing still uses this name |
| JetBrains marketplace | Search **TONGYI Lingma** or **Qoder CN** | Both strings are official |
| JetBrains offline zip | [tongyi-jetbrains-latest.zip](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/jetbrain/tongyi-jetbrains-latest.zip) | Help Center |
| JetBrains offline zip (new brand) | [qodercn-jetbrains-latest.zip](https://qodercn-jb.oss-cn-hangzhou.aliyuncs.com/qodercn-jetbrains-latest.zip) | qoder.com.cn |
| VS Code marketplace | `vscode:extension/Alibaba-Cloud.tongyi-lingma` | Help Center "Install now" |
| VS Code VSIX | [tongyi-lingma-latest.vsix](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/vscode/tongyi-lingma-latest.vsix) | Help Center |
| Install guide | [ZH](https://help.aliyun.com/zh/lingma/installation-guide) | IDE + JetBrains + VS Code |
| Sign-in guide | [ZH](https://help.aliyun.com/zh/lingma/installation-and-login-guide/) · [EN](https://www.alibabacloud.com/help/en/lingma/installation-and-login-guide/) | Individual / Business / Dedicated |

Step text: [Tutorial · Step 1](./lingma#step-1-install).

## Compatible IDEs and OS

Sources: [Compatible IDEs](https://help.aliyun.com/zh/lingma/compatible-ide-and-system), [What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn), [EN compatible IDEs](https://www.alibabacloud.com/help/en/lingma/qoder-cn/user-guide/compatible-ide-and-system).

| Client | Floor |
|--------|-------|
| Qoder CN IDE | Windows 10/11 (x64; product page also lists arm64), macOS 11.0+; install guide also lists Linux x64 `.deb`/`.rpm` |
| JetBrains IDEs | 2020.3+ IntelliJ IDEA, PyCharm, GoLand, WebStorm, Android Studio, HUAWEI DevEco Studio, …; Windows 7+ / macOS / Linux |
| Visual Studio Code | 1.68.0+; Windows 7+ / macOS / Linux |
| Visual Studio | 2022 17.3.0+ or 2019 16.3.0+; Windows 10+ |
| Other | Remote SSH, WSL; VS Code WebIDE / Open VSX |

Official addendum: iteration focuses on **Qoder CN IDE + JetBrains**. VS Code updates slowed; newer official pages say unmaintained / discontinued.

Languages named by Help Center: Java, Python, Go, C#, C/C++, JavaScript, TypeScript, PHP, Ruby, Rust, Scala, Kotlin. The marketing site also says "200 languages" — this table only lists languages the Help Center names.

## Shortcuts

Sources: [Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat), [NES](https://help.aliyun.com/zh/lingma/next-edit-suggestion), [Plugin configuration](https://help.aliyun.com/zh/lingma/plug-in-configuration-guide). Keys not on those pages are omitted.

| Action | macOS | Windows |
|--------|-------|---------|
| Toggle chat (JetBrains, VS Code) | `⌘ ⇧ L` | `Ctrl Shift L` |
| Toggle chat (Lingma IDE) | `⌘ L` | `Ctrl Shift L` |
| Accept inline suggestion | `Tab` | `Tab` |
| Accept NES | `Tab` | `Tab` |
| Reject NES | `Esc` | `Esc` |
| Open personal settings (enable NES) | `⌘ ⇧ ,` | `Ctrl Shift ,` |

VS Code can start a new chat with `/newChat`. Agent planning: `/plan`.

## Chat modes

| | Ask | Edit | Agent |
|---|-----|------|-------|
| Edits files | No | Yes (your range) | Yes (it chooses) |
| Runs terminal | No | No | Yes (confirm by default) |
| VS Code | Yes | Yes | Yes |
| Lingma IDE / JetBrains | Yes | **No** | Yes |
| Visual Studio | Yes | Not documented | Not documented |

## Plans (copied from the open official table)

Source: [Billing](https://help.aliyun.com/zh/lingma/billing-description), "Qoder CN (full suite)" tab opened 2026-08-19. **Prices change. Re-open the official page before you buy.**

Official premises:

- New price + Credits from 2026-05-20 23:00:00 (Beijing time).
- Individual Pro free promo ended 2026-05-20 18:00:00.
- From 2026-06-20, full-suite individual Credits share across Desktop, JetBrains, QoderWork, CLI, Wake, Mobile.
- That page states VS Code plugin evolution has stopped.

| Plan | Official list price | Official Credits |
|------|---------------------|------------------|
| Individual Trial (Free) | Free | Limited trial; 2-week trial and 300 Credits |
| Individual Pro | CNY 59 / month | 2,000 Credits / month |
| Individual Pro+ | CNY 169 / month | 6,000 Credits / month |
| Teams | CNY 99 / seat / month | 3,000 Credits / seat / month |
| Enterprise | CNY 149 / seat / month | 3,000 Credits / seat / month, shareable; 10 seats min |
| Enterprise VPC | CNY 199 / seat / month | 3,000 Credits / seat / month, shareable; 50 seats min |

The "Qoder CN (formerly Lingma)" tab is the **single-product** enterprise subscription for IDE / JetBrains / VS Code: Enterprise Standard CNY 99 / seat / month, Enterprise Dedicated CNY 199 / seat / month. Pre-2026-05-20 contracts use a third tab; this table does not copy legacy prices.

Add-on pack (formerly Lingma, individual): CNY 40 / 1,000 Credits, 1 month. Enterprise: CNY 80 / 2,000 Credits, 3 months. Unused Credits expire.

## High-quality sources

Last verified: 2026-08-19. Ranked by authority. Reviews are clues, not facts.

### Official

| Source | Use |
|--------|-----|
| [lingma.aliyun.com](https://lingma.aliyun.com/) | Legacy marketing home; starting URL for issue #84 |
| [lingma.aliyun.com/download](https://lingma.aliyun.com/download) | Lingma IDE + JetBrains install wording |
| [qoder.com.cn](https://qoder.com.cn/) | New brand site |
| [qoder.com.cn/download](https://qoder.com.cn/download) | IDE download named by Help Center |
| [docs.qoder.cn](https://docs.qoder.cn/) | Docs host marked current |
| [What is the Qoder CN series](https://help.aliyun.com/zh/lingma/introduction-of-lingma) | Family map |
| [What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn) | Coding sub-product |
| [Installation guide](https://help.aliyun.com/zh/lingma/installation-guide) | IDE / JetBrains / VS Code |
| [Setup and install](https://help.aliyun.com/zh/lingma/installation-and-login-guide/) | Sign-in split |
| [Individual quick start](https://help.aliyun.com/zh/lingma/individual-edition-quick-start) | Individual account |
| [Compatible IDEs](https://help.aliyun.com/zh/lingma/compatible-ide-and-system) | Version floors |
| [Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat) | Three modes + shortcuts |
| [Agent](https://help.aliyun.com/zh/lingma/agent) | `/plan`, terminal confirm, Auto-Run |
| [MCP](https://help.aliyun.com/zh/lingma/guide-for-using-mcp) | MCP setup |
| [Billing](https://help.aliyun.com/zh/lingma/billing-description) | Prices and Credits |
| [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=Alibaba-Cloud.tongyi-lingma) | Extension ID + English feature names |
| [EN Help Center](https://www.alibabacloud.com/help/en/lingma/) | English counterpart |

### Same vendor, not this handbook

| Source | Use |
|--------|-----|
| [qianwen.com](https://www.qianwen.com/) | Qwen chat |
| [Model Studio](https://www.aliyun.com/product/bailian) | Model platform |
| [Qoder CN CLI](https://qoder.com.cn/cli) | Terminal product |
