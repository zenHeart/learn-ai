---
title: TraeCode 教程
description: "从官方下载中心安装 TraeCode，完成首次设置，打开第一个项目，并在 IDE 模式与 SOLO 模式之间切换。中国站与国际站是两套表面，不要混装。"
domain: product
tags:
  - coding-agent
role: tutorial
---

# TraeCode 教程

> 本页带你把 **TraeCode** 装上并打开第一个项目。安装路径抄自国际站 [Quickstart](https://docs.trae.ai/ide/set-up-trae) 和中国站 [快速开始](https://docs.trae.cn/ide_get-started-with-trae.md)。家族边界见 [学习地图](./index.md)。OS / 设备上限 / 官方 URL 见 [速查表](./trae-cheatsheet.md)。

## 目标与非目标

**目标**

- 分清中国站（`trae.cn` / `trae.com.cn`）和国际站（`trae.ai`）
- 从官方下载页装上 TraeCode 桌面 IDE
- 打开本地文件夹，或按官方步骤克隆仓库
- 在左上角切换 **IDE 模式** 与 **SOLO 模式**

**非目标**

- 不写 TraeWork / 豆包 / 扣子 / 方舟教程
- 不编 `brew` / `npm` / curl 安装命令（官方安装是下载安装包）
- 不编 TraeCode CLI（企业页写 **coming soon**）
- 不把 Legacy 套餐次数表抄成现行价格

## 先决条件

国际站 [Quickstart](https://docs.trae.ai/ide/set-up-trae) 与中国站 [快速开始](https://docs.trae.cn/ide_get-started-with-trae.md) 列出的操作系统：

| 操作系统 | 架构 | 官方写明的版本 / 格式 |
|----------|------|------------------------|
| macOS | Apple Silicon、Intel | **12.0** 或更高 |
| Windows | 64 位（x64） | **Windows 10、Windows 11** |
| Linux | 64 位（x64）、64 位（ARM64） | `.deb`：Ubuntu 20.04、Debian 11；`.rpm`：Fedora 42、RHEL 9.x |

账号：一个 TRAE 账号。登录方式随表面不同，见第 3 节。

## 1. 选表面：中国站 vs 国际站

官方国际站顶栏有「前往中国站」。两套不是镜像。

| | 国际站 | 中国站 |
|--|--------|--------|
| 营销 / 下载 | [www.trae.ai](https://www.trae.ai/) · [www.trae.ai/download](https://www.trae.ai/download) | [www.trae.cn](https://www.trae.cn/) · 快速开始链 [www.trae.com.cn](https://www.trae.com.cn) |
| 文档 | [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) | [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code)（有 [`llms.txt`](https://docs.trae.cn/llms.txt)） |
| 设备上限 | **3** 台（[device-limit](https://docs.trae.ai/ide/device-limit)） | **10** 台（[ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md)） |
| 登录（官方已写明） | <!-- TODO: 待核实 —— 2026-08-19 国际站 Quickstart 英文正文未抓到登录列表 --> | 手机号、抖音账号、苹果账号、稀土掘金账号（[快速开始](https://docs.trae.cn/ide_get-started-with-trae.md)） |

在同一台电脑上不要混用两套安装包当「同一个产品」。账号、额度、设备计数各自独立。

## 2. 从官方下载安装

官方**没有**给出 `curl | bash` 或 npm 全局包。安装入口是下载中心。

### 国际站

1. 打开 [Download Center](https://www.trae.ai/download)。
2. 找到 **TraeCode** 区块（原文：Your 10x AI Coding Engineer；**Seamless switch between IDE and SOLO Mode**）。不要下成同页的 **TraeWork**。
3. 按本机选择 macOS（12.0+，含 Intel）、Windows 10/11，或 `.deb` / `.rpm`。
4. 装完启动。

国际站 Quickstart：前往官网，点右上角 **下载 IDE**，把安装包下到本地并安装。

macOS 低于 12：国际站中文 Quickstart 写过「下载低于 3.5.25 版本」。具体安装包链接以该页当时给出的 Apple Silicon / Intel 链为准，本页不另造 URL。

<!-- TODO: 待核实 —— 国际站旧 macOS 安装包直链 2026-08-19 未从文档正文抽出。 -->

### 中国站

中国站 [快速开始](https://docs.trae.cn/ide_get-started-with-trae.md) 原文：

1. 前往 [TRAE 官网](https://www.trae.com.cn)，点击右上角的 **下载 IDE** 按钮，将安装包下载到本地并完成安装。
2. 若 macOS 低于 12，直接下载**低于 3.3.25** 版本的 TRAE IDE：
   - [Apple Silicon 芯片](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-arm64.dmg)
   - [Intel 芯片](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-x64.dmg)

不要把中国站的 `3.3.25` 和国际站摘要里的 `3.5.25` 合成一个数字。

## 3. 首次设置与登录

启动后跟随界面指引。中国站快速开始列出的步骤：

- 选择主题和语言
- 从 **VS Code 或 Cursor** 导入已有配置
- 添加 TRAE 相关的命令行
- 登录（中国站账号类型见第 1 节）

国际站 [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) 同样把 IDE 能力写成完整编辑器 + Git + 扩展生态。首次设置的具体文案以你下载的那一站安装向导为准。

「添加 TRAE 相关的命令行」是官方向导里的一步。官方页**没有**写出可执行文件名或 `brew install` 字符串，本页不补。

中国站额外步骤（同一篇快速开始）：前往 **设置 > 开发环境**，配置 Node.js。可以添加本机已装的 SDK，或下载 TRAE IDE 内置的 Node.js SDK。

## 4. 打开第一个项目

官方提供三种入口（国际站 Quickstart / 中国站快速开始原文一致）：

**导入本地文件夹**

1. 点左侧面板中央的 **打开文件夹**，或左上角 **选择项目 > 打开文件夹**。
2. 选一个本地文件夹打开。

**从 GitHub 克隆**

1. 点 **克隆 Git 仓库**，或 **选择项目 > 克隆 Git 仓库**。
2. 在顶部面板点 **从 GitHub 克隆**。
3. 完成 GitHub 授权，把仓库克隆到本地并打开。

**从 URL 克隆**

1. 同样进入 **克隆 Git 仓库**。
2. 输入仓库 URL，点 **存储库 URL {URL}**。
3. 按提示克隆并打开。

打开之后，先在 IDE 模式里看目录和终端是否正常。再让智能体只读摸底仓库结构。改文件前看清 diff，不要一上来开自动运行。

## 5. 切换 IDE 模式与 SOLO 模式

官方：[What is TraeCode?](https://docs.trae.ai/ide/what-is-trae)、[SOLO 模式概览](https://docs.trae.ai/ide/solo-mode)、[快速开始](https://docs.trae.ai/ide/set-up-trae)。

在界面**左上角**用模式切换按钮切换。

| 模式 | 官方行为 | 适合 |
|------|----------|------|
| **IDE 模式** | 保留编辑器、终端、调试、插件、源代码管理；你控制每一步 | 精细改已有仓库 |
| **SOLO 模式** | AI 主导，自动规划并走完需求理解、代码生成、测试、成果预览（SOLO 页还写到部署） | 从自然语言推一条垂直功能 |

SOLO 怎么开：把模式切到 **SOLO**。界面从左到右是任务管理面板、AI 对话面板、工具面板（[SOLO 模式概览](https://docs.trae.ai/ide/solo-mode)）。

输入方式（SOLO 页原文）：自然语言、语音、上传本地文件。

SOLO 页还列出：SOLO Agent、多任务、工具面板（编辑器 / 文档 / 浏览器）、Figma 导入、Supabase、部署（举例 Vercel）、AI 服务、支付（举例 Stripe）、变更 diff。逐步操作跟对应官方子页，本教程不展开成第二份 How-to。

**不要**为了「SOLO」去装 TraeWork。TraeWork 是独立客户端，官方写它建立在 TraeCode SOLO 模式之上。

## 6. 智能体与 CUE

[What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) / [中国站同页](https://docs.trae.cn/ide_what-is-trae-code)：

- **智能体**：自然语言定义任务；检索代码库、多步计划、调工具。可自建智能体，并配提示词、MCP Server、工具集。
- **CUE**：代码补全、链式补全、多行修改、修改点预测与跳转；在 **Python、TypeScript、Golang** 项目里辅助导入依赖和重命名引用。
- **上下文**：文件、文件夹、代码片段、终端输出、仓库、文档集、网页。
- **模型**：内置多模型，也可用 API Key 加自定义模型（名单以 [models](https://docs.trae.ai/ide/models) 当天表格为准，本页不抄易过期名单）。

中国站 What is TraeCode 另有「速通」权益：模型排队时加速当次 Query。规则去中国站该节，国际站英文 What is TraeCode 2026-08-19 **没有**同一段。

安全（两站 What is 页一致）：

- **隐私模式**：开启后，对话、代码片段、AI 输出不用于数据分析、产品优化或模型训练。代码库文件留在本地设备。
- **沙箱**：智能体命令可在受限环境执行，带文件访问控制和高风险命令拦截。

## 7. 设备数量

计入设备的客户端（两站原文结构相同）：**TraeCode**、**TraeWork 桌面版**、**TRAE 移动端**。**TraeWork 网页版不计入**。同一台电脑同时登 TraeCode 和 TraeWork 桌面版，计 **1** 台。

上限数字不同：

- 国际站：**3** 台（[device-limit](https://docs.trae.ai/ide/device-limit)）
- 中国站：**10** 台（[ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md)）

达到上限后，登录页会进入 Device limit reached / **设备数量已达上限**。先在已登录设备上 **Sign out** / **退出登录**。若该设备同时开着 TraeCode 和 TraeWork 桌面版，登出一次会一并退出。

## 常见陷阱

1. **下载页点成 TraeWork。** TraeCode 才是本教程的 IDE。
2. **中国站包和国际站包混用、账号混登。** 设备上限和登录方式都不同。
3. **把 SOLO 模式当成要另装的 TraeWork。** SOLO 是 TraeCode 左上角的模式。
4. **编了一个 CLI 安装命令。** 官方当前是下载安装包；CLI 在企业页是 coming soon。
5. **把 Legacy 套餐次数表当成现行价格。** 跟 [pricing](https://www.trae.ai/pricing) 和现行「套餐与计费」页。
6. **旧 macOS 回退链抄错站。** 中国站官方直链版本是低于 **3.3.25** 的 Trae CN dmg；不要套到国际站。

## 下一步

- 官方 URL、OS、设备上限 → [速查表](./trae-cheatsheet.md)
- 家族边界 → [学习地图](./index.md)
- Skills / MCP / 自定义智能体 → 官方 [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) 或 [docs.trae.cn/llms.txt](https://docs.trae.cn/llms.txt)
