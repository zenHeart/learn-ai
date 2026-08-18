---
title: Lingma tutorial
description: "Install TONGYI Lingma / Qoder CN as a standalone IDE or IDE plugin, sign in with an Alibaba Cloud account, then use completion and the three chat modes."
domain: product
tags:
  - coding-agent
role: tutorial
---

# Lingma tutorial

> This is a **tutorial**. Do it in order: pick a surface → copy the official install text → sign in → complete → three chat modes.
>
> Names: [glossary](./lingma-glossary). Keys and plans: [cheatsheet](./lingma-cheatsheet). Recipes: [cookbook](./lingma-cookbook).

Goal: go from "the Chinese Copilot" to "it completes, answers, and edits in my IDE".

## Step 0: Name what you are installing

The Help Center calls the coding sub-product **Qoder CN** (formerly TONGYI Lingma) and offers two ways to use it ([Installation guide](https://help.aliyun.com/zh/lingma/installation-guide)):

> Qoder CN 为您提供两种使用方式。您可以选择下载开箱即用的 Qoder CN IDE，也可以选择在您现有的开发工具中直接安装 Qoder CN 插件。安装后登录账号即可开始使用。

EN Help Center equivalent: install Qoder CN IDE, or install the plugin in an existing IDE, then sign in ([Setup and install](https://www.alibabacloud.com/help/en/lingma/installation-and-login-guide/)).

| You already have | Install | Official stance |
|------------------|---------|-----------------|
| No preference / want an AI-native IDE | **Qoder CN IDE** (marketing still says Lingma IDE) | Current default |
| IntelliJ IDEA / WebStorm / PyCharm | **JetBrains plugin** | Current iteration surface |
| VS Code | **VS Code plugin** | Still installable; official text says updates slowed / discontinued |
| Visual Studio 2022 / 2019 | **Visual Studio plugin** | Chat is Ask-only for now |

Individual edition prerequisite: an Alibaba Cloud account; sign in with the primary account ([Individual quick start](https://help.aliyun.com/zh/lingma/individual-edition-quick-start), [EN](https://www.alibabacloud.com/help/en/lingma/getting-started/individual-edition-quick-start)).

## Step 1: Install

The steps below are **copied from official pages**. Do not merge the old and new search strings. Use the wording on the page you opened.

### 1.1 Standalone IDE

Marketing site [lingma.aliyun.com/download](https://lingma.aliyun.com/download):

> Lingma IDE 将增强上下文工程与智能体无缝集成，全面理解代码库，轻松处理复杂任务，同时兼容 JetBrains IDEs 等主流编程工具，开发者可以自由选择。
>
> 全面集成智能编码助手的能力，开箱即用更简单，无需安装插件即可享受高效、智能的编程体验。

OS lines on that page:

- **macOS** 11.0+
- **Windows** 10/11
- **Linux** `.deb` / `.rpm`

The Help Center names the same client **Qoder CN IDE**, points downloads at [https://qoder.com.cn/download](https://qoder.com.cn/download), and writes:

> 适用操作系统：Windows 10/11（x64）、macOS 11.0 、Linux x64 (.deb/.rpm) 或更新版本。

Both URLs are official. New-brand downloads go through `qoder.com.cn/download`. Official upgrade path: uninstall the original Lingma IDE, then install Qoder CN IDE ([Billing](https://help.aliyun.com/zh/lingma/billing-description)).

### 1.2 JetBrains plugin

Marketing download page, IntelliJ IDEA example:

> **方式一：从插件市场安装**
>
> 点击导航-插件，打开应用市场，搜索通义灵码（TONGYI Lingma），找到通义灵码后点击安装。
>
> **方式二：下载离线包安装**
>
> 1. 下载 JetBrains IDEs 的 zip 安装包；
> 2. 点击导航-插件，点击设置图标，下拉菜单中单击从本地安装插件，选择下载的 zip 文件后安装。
>
> 重启 IntelliJ IDEA，重启成功后登录阿里云账号，即刻开启智能编码之旅。

Help Center (new display name):

> 打开 IntelliJ IDEA 设置窗口，在插件市场中搜索 Qoder CN，找到 Qoder CN 后单击安装。
>
> 安装完成后，请重启 IntelliJ IDEA。

Offline zip from Help Center: [tongyi-jetbrains-latest.zip](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/jetbrain/tongyi-jetbrains-latest.zip). New-brand zip: [qodercn-jetbrains-latest.zip](https://qodercn-jb.oss-cn-hangzhou.aliyuncs.com/qodercn-jetbrains-latest.zip).

Compatibility: JetBrains IDEs **2020.3+**. Full matrix: [Cheatsheet](./lingma-cheatsheet#compatible-ides-and-os).

### 1.3 Visual Studio Code plugin

Read the official stance first:

> 产品功能迭代将主要集中在 Qoder CN IDE 和 Qoder CN JetBrains 插件中，VSCode 插件更新节奏将会放缓。如果您在使用 VSCode 插件过程中遇到问题或不便，建议切换到 Qoder CN IDE. ([Installation guide](https://help.aliyun.com/zh/lingma/installation-guide))

EN update log: "VS Code plugin support discontinued … no longer part of the product suite." ([Update log](https://www.alibabacloud.com/help/en/lingma/product-overview/qoder-cn-update-log))

Help Center install text:

> 下载并安装 Visual Studio Code **1.68.0 及以上版本**。
>
> **方法 1：从插件市场安装**
>
> 单击 [立即安装](vscode:extension/Alibaba-Cloud.tongyi-lingma) ，唤起 Visual Studio Code 插件市场直接安装，安装后请重启 IDE，即可开启智能编码之旅。
>
> 打开 Visual Studio Code 扩展窗口，搜索 Qoder CN，找到 Qoder CN 后单击安装。
>
> **方法 2：下载安装包安装**
>
> 单击下方链接，下载 Visual Studio Code 的 VSIX 安装包：[Qoder CN-VS Code](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/vscode/tongyi-lingma-latest.vsix)
>
> 打开 Visual Studio Code 后，单击扩展，单击更多按钮，在下拉菜单中单击 **从 VSIX 安装** ，选择下载的 VSIX 文件后安装。
>
> 安装完成后，请重启 Visual Studio Code。

Marketplace ID remains `Alibaba-Cloud.tongyi-lingma`. Display name: **Qoder CN (Formerly Lingma)**.

If the sidebar icon is missing:

> 如果安装后在侧边导航上找不到 Qoder CN 入口，可鼠标聚焦在侧边导航后右键查看，勾选 Qoder CN 后即可将插件入口配置在侧边导航上。

### 1.4 Visual Studio

Help Center does not publish a click-by-click Visual Studio walkthrough. It only says: install from the marketplace or an install package ([Setup and install](https://help.aliyun.com/zh/lingma/installation-and-login-guide/)). Compatible versions: Visual Studio **2022 17.3.0+** or **2019 16.3.0+**, Windows 10+ ([Compatible IDEs](https://help.aliyun.com/zh/lingma/compatible-ide-and-system)). Chat on Visual Studio is **Ask-only** for now ([Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat)). This page does not invent the missing clicks.

## Step 2: Sign in

Individual edition ([Individual quick start](https://help.aliyun.com/zh/lingma/individual-edition-quick-start)):

> 1. 安装完成后，选择 阿里云中国站账号登录 ，前往阿里云登录页完成登录。
> 2. 在阿里云登录页面完成登录，后续即可看到登录成功页面。
> 3. 回到 IDE 端即可开始使用 Qoder CN 。
>
> 登录成功页面将展示账号名称和 Account ID 等信息。在 IDE 中，可通过 TONGYI Lingma 插件面板右上角的账号名称确认登录状态。

EN Help Center: you can log on with an Alibaba Cloud account. Help Center also documents **AK/SK** login (common for remote SSH). Business / Dedicated login is a different path ([Setup and install](https://help.aliyun.com/zh/lingma/installation-and-login-guide/)); this tutorial does not cover the enterprise console.

## Step 3: Inline completion

Open a real frontend file and type. Official definition ([What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)):

> 根据当前语法和跨文件的代码上下文，自动感知当前工程，实时生成行、函数级代码。
>
> 通过注释描述您想要的功能，可直接在编辑器区生成代码。

Marketplace English: "generate line-level or function-level code … based on the context of your current or related files." Accept with **Tab** ([Plugin configuration](https://help.aliyun.com/zh/lingma/plug-in-configuration-guide)). Write the intent in a comment.

Next Edit Suggestion (NES) is a different feature. See [Cookbook](./lingma-cookbook#turn-on-next-edit-suggestion-nes).

## Step 4: Pick a chat mode

Open chat ([Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat)):

| Action | macOS | Windows |
|--------|-------|---------|
| Toggle chat | `⌘ ⇧ L` (JetBrains, VS Code); `⌘ L` (Lingma IDE) | `Ctrl Shift L` |

Three official modes in one thread — you can switch without starting a new chat:

| Mode | Official meaning | Use it when |
|------|------------------|-------------|
| **Ask** | R&D Q&A; **does not edit project files** | You need to understand first |
| **Edit** | Precise multi-file edits, reviewable | You know which files |
| **Agent** | Plans, uses tools (terminal, MCP), end-to-end | You give the goal |

Support matrix is official, not inferred:

- **Visual Studio Code:** all three
- **Lingma IDE / JetBrains plugin:** Ask + Agent; **no Edit**
- **Visual Studio:** Ask only for now
- Latest chat features: upgrade VS Code / JetBrains plugins to **2.5.0 or later**

Official prompt advice (do not rewrite as "usually"):

> - Describe the task as a structured goal plus steps.
> - Attach context: files, images, codebase, codeChanges.
> - State language, style, format, and change targets.
> - Iterate.

Accept or reject file diffs before they merge into the original files.

## Step 5: Watch terminal confirms in Agent mode

Agent mode can edit many files and run the terminal. Official default ([Agent](https://help.aliyun.com/zh/lingma/agent)):

> 默认每次执行命令前需要开发者进行确认：单击 **运行** 发送到 IDE Terminal；单击 **取消** 跳过此次命令。

Do not enable the auto-run allowlist on day one. MCP calls also ask before they run. Recipes: [Cookbook](./lingma-cookbook).

## Step 6: Safety habits

- **Review generated code**, especially auth, payments, and SQL.
- In Agent mode, **do not click Run** on a command you cannot read.
- Enterprise knowledge bases are enterprise features. Do not assume they exist on an individual account.
- This site does not document model internals. See [Learn LLM](/tech/fundamentals/LLM).

## Next

- Wrong mode, weak prompts, MCP → [Cookbook](./lingma-cookbook)
- URLs / shortcuts / plans → [Cheatsheet](./lingma-cheatsheet)
- Rename and "not this" → [Glossary](./lingma-glossary)

## References

- [Installation guide](https://help.aliyun.com/zh/lingma/installation-guide)
- [Marketing download page](https://lingma.aliyun.com/download)
- [Individual quick start](https://help.aliyun.com/zh/lingma/individual-edition-quick-start)
- [Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat)
- [What is Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)
- [EN Help Center](https://www.alibabacloud.com/help/en/lingma/)
