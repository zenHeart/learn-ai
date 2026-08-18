---
title: 通义灵码上手
description: "从零装上通义灵码 / Qoder CN：独立 IDE 或 IDE 插件，登录阿里云账号，用上补全和三种智能会话。"
domain: product
tags:
  - coding-agent
role: tutorial
---

# 通义灵码上手

> 这是一份**教程**。按顺序做完：分清形态 → 抄官方安装 → 登录 → 行间补全 → 三种会话。
>
> 名词看 [术语表](./lingma-glossary)；快捷键和套餐看 [Cheatsheet](./lingma-cheatsheet)；场景配方看 [Cookbook](./lingma-cookbook)。

本指南目标：把通义灵码从「听说过国内 Copilot」用成「在 IDE 里能补全、能问、能改」。

## 第 0 步：先确认你在装哪一个

官方帮助中心把编码子产品叫 **Qoder CN**（原通义灵码），并提供两种使用方式（[安装指南](https://help.aliyun.com/zh/lingma/installation-guide)）：

> Qoder CN 为您提供两种使用方式。您可以选择下载开箱即用的 Qoder CN IDE，也可以选择在您现有的开发工具中直接安装 Qoder CN 插件。安装后登录账号即可开始使用。

| 你已有的环境 | 装什么 | 官方态度 |
|--------------|--------|----------|
| 没有偏好 / 想要 AI 原生 IDE | **Qoder CN IDE**（营销站仍写 Lingma IDE） | 现行主推 |
| IntelliJ IDEA / WebStorm / PyCharm 等 | **JetBrains 插件** | 现行迭代面 |
| VS Code | **VS Code 插件** | 仍可装，但官方已写更新放缓 / 停止维护 |
| Visual Studio 2022 / 2019 | **Visual Studio 插件** | 智能会话暂仅问答 |

个人版前提：已注册阿里云账号，用主账号登录个人版（[个人版快速入门](https://help.aliyun.com/zh/lingma/individual-edition-quick-start)）。

## 第 1 步：装上

下面安装步骤**逐字抄官方**，不改搜索词、不合成新旧品牌名。打开哪一页，就按那一页搜。

### 1.1 独立 IDE

营销站 [lingma.aliyun.com/download](https://lingma.aliyun.com/download) 原文：

> Lingma IDE 将增强上下文工程与智能体无缝集成，全面理解代码库，轻松处理复杂任务，同时兼容 JetBrains IDEs 等主流编程工具，开发者可以自由选择。
>
> 全面集成智能编码助手的能力，开箱即用更简单，无需安装插件即可享受高效、智能的编程体验。

该页列出的系统门槛：

- **macOS** 11.0+
- **Windows** 10/11
- **Linux** `.deb` / `.rpm`

帮助中心安装指南把同一产品写成 **Qoder CN IDE**，下载地址指向 [https://qoder.com.cn/download](https://qoder.com.cn/download)，并写：

> 适用操作系统：Windows 10/11（x64）、macOS 11.0 、Linux x64 (.deb/.rpm) 或更新版本。

两站都是官方入口。新品牌下载走 `qoder.com.cn/download`；旧品牌页仍挂 Lingma IDE 安装包。升级路径官方写过：卸载原 Lingma IDE，再安装 Qoder CN IDE（[计费说明](https://help.aliyun.com/zh/lingma/billing-description)）。

### 1.2 JetBrains 插件

营销站 [下载和安装](https://lingma.aliyun.com/download) 以 IntelliJ IDEA 为例，原文：

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

帮助中心同一流程改用新名，原文：

> 打开 IntelliJ IDEA 设置窗口，在插件市场中搜索 Qoder CN，找到 Qoder CN 后单击安装。
>
> 安装完成后，请重启 IntelliJ IDEA。

离线包官方链接（帮助中心）：[Qoder CN - JetBrains](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/jetbrain/tongyi-jetbrains-latest.zip)。新品牌下载页另给：[qodercn-jetbrains-latest.zip](https://qodercn-jb.oss-cn-hangzhou.aliyuncs.com/qodercn-jetbrains-latest.zip)。

兼容范围见 [Cheatsheet · 兼容](./lingma-cheatsheet#兼容-ide-和系统)。帮助中心写 JetBrains IDEs **2020.3 及以上**。

### 1.3 Visual Studio Code 插件

先读官方态度，再决定要不要装：

> 产品功能迭代将主要集中在 Qoder CN IDE 和 Qoder CN JetBrains 插件中，VSCode 插件更新节奏将会放缓。如果您在使用 VSCode 插件过程中遇到问题或不便，建议切换到 Qoder CN IDE。（[安装指南](https://help.aliyun.com/zh/lingma/installation-guide)）

帮助中心安装原文：

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

市场扩展 ID 仍是 `Alibaba-Cloud.tongyi-lingma`，展示名 **Qoder CN (Formerly Lingma)**。

侧栏找不到入口时，官方原文：

> 如果安装后在侧边导航上找不到 Qoder CN 入口，可鼠标聚焦在侧边导航后右键查看，勾选 Qoder CN 后即可将插件入口配置在侧边导航上。

### 1.4 Visual Studio

帮助中心没有单独逐步截图，只写「通过插件市场或下载安装包进行安装」（[安装和登录](https://help.aliyun.com/zh/lingma/installation-and-login-guide/)）。兼容版本：Visual Studio **2022 17.3.0 及以上**，或 **2019 16.3.0 及以上**；操作系统 Windows 10 及以上（[兼容 IDE 和系统](https://help.aliyun.com/zh/lingma/compatible-ide-and-system)）。智能会话在 Visual Studio 上**暂仅支持智能问答**（[智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)）。

逐步点选找不到官方原文，这里不编。以 [安装指南](https://help.aliyun.com/zh/lingma/installation-guide) 为准。

## 第 2 步：登录

个人版官方步骤（[个人版快速入门](https://help.aliyun.com/zh/lingma/individual-edition-quick-start)）：

> 1. 安装完成后，选择 阿里云中国站账号登录 ，前往阿里云登录页完成登录。
> 2. 在阿里云登录页面完成登录，后续即可看到登录成功页面。
> 3. 回到 IDE 端即可开始使用 Qoder CN 。
>
> 登录成功页面将展示账号名称和 Account ID 等信息。在 IDE 中，可通过 TONGYI Lingma 插件面板右上角的账号名称确认登录状态。

帮助中心还写：可通过阿里云登录页或 **AK/SK** 登录（远程开发常见）。企业标准版 / 专属版登录入口不同，见 [安装和登录](https://help.aliyun.com/zh/lingma/installation-and-login-guide/)，本教程不展开企业控制台。

## 第 3 步：行间代码补全

打开一个真实前端文件，开始打字。官方定义（[什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)）：

> 根据当前语法和跨文件的代码上下文，自动感知当前工程，实时生成行、函数级代码。
>
> 通过注释描述您想要的功能，可直接在编辑器区生成代码。

接受建议用 **Tab**（[插件配置](https://help.aliyun.com/zh/lingma/plug-in-configuration-guide)）。想让补全对准意图，把目标写进注释，而不是写「处理一下」。

行间建议预测（NES）是下一处修改的预测，不是同一件事，见 [Cookbook](./lingma-cookbook#打开行间建议预测-nes)。

## 第 4 步：智能会话，先学会选模式

唤起会话（[智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)）：

| 操作 | macOS | Windows |
|------|-------|---------|
| 打开 / 关闭智能会话 | `⌘ ⇧ L`（JetBrains、VS Code）；`⌘ L`（Lingma IDE） | `Ctrl Shift L` |

官方三种模式，一次会话里可切换，**不必新建会话**：

| 模式 | 官方定义 | 选它的信号 |
|------|----------|-----------|
| **智能问答** | 纯研发问答；结合上下文给方案，**不会直接改工程文件** | 我要先搞懂 |
| **文件编辑** | 精准多文件修改，可迭代、可审查 | 我知道改哪，要看 diff |
| **智能体** | 自主决策、感知工程、用工具（含终端、MCP），端到端完成任务 | 我只给目标，过程交给它 |

支持矩阵也是官方写死的，不要假设全家都能用三种模式：

- **Visual Studio Code**：三种都支持
- **Lingma IDE / JetBrains 插件**：智能问答 + 智能体；**不支持文件编辑**
- **Visual Studio**：智能会话暂仅智能问答
- 体验最新能力：VS Code / JetBrains 需升到 **2.5.0 或以上**

输入需求的官方建议（不要改写成「一般可以」）：

> - 结构化地描述需求：包含一个明确的目标，并通过步骤式的结构化描述。
> - 给出相关的上下文：代码文件、图片、codebase、codeChanges 等。
> - 明确生成要求：语言、规范、格式、变更目标。
> - 多多互动，逐步迭代。

文件编辑 / 智能体产生的改动要在 diff 里接受或拒绝。接受后才合并进原文件。

## 第 5 步：让智能体干活时盯住终端确认

智能体模式会自己拆任务、改多文件、跑终端。官方默认（[智能体](https://help.aliyun.com/zh/lingma/agent)）：

> 默认每次执行命令前需要开发者进行确认：单击 **运行** 发送到 IDE Terminal；单击 **取消** 跳过此次命令。

不要第一天就打开自动执行白名单。MCP 也是每次执行前询问。配方见 [Cookbook](./lingma-cookbook)。

## 第 6 步：安全习惯

- **审查生成代码**，尤其是权限、鉴权、支付、SQL 拼接。
- 智能体跑终端时，**看不懂的命令不要点运行**。
- 企业知识库 / 私域代码增强是企业版能力，个人版不要假设已经接上。
- 本站不写模型内部机制；模型原理见 [Learn LLM](/zh/tech/fundamentals/LLM)。

## 接下来

- 选错模式、提示写不明白、要接 MCP → [Cookbook](./lingma-cookbook)
- 查安装 URL / 快捷键 / 套餐 → [Cheatsheet](./lingma-cheatsheet)
- 搞不清更名和「不是什么」 → [术语表](./lingma-glossary)

## 参考资料

- [安装指南](https://help.aliyun.com/zh/lingma/installation-guide)
- [下载和安装（营销站）](https://lingma.aliyun.com/download)
- [个人版快速入门](https://help.aliyun.com/zh/lingma/individual-edition-quick-start)
- [智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)
- [什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)
