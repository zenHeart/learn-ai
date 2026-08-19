---
title: Trae 学习地图
description: "TraeCode 是字节跳动面向开发者的 AI 编程 IDE（IDE 模式 + SOLO 模式）。同厂的 TraeWork、豆包、扣子、火山方舟不是这个产品。本目录只教你从官方下载装上 TraeCode，打开第一个项目。"
domain: product
tags:
  - coding-agent
role: map
---

# Trae 学习地图

> **TraeCode** 是 TRAE 品牌下的 AI 编程 IDE。官方原文（[What is TraeCode?](https://docs.trae.ai/ide/what-is-trae)）：深度融合 AI 的开发工具，覆盖编码、项目理解、调试运行和变更管理。你可以像传统 IDE 一样掌控每一步，也可以把复杂任务交给智能体。
>
> 营销首页（[www.trae.ai](https://www.trae.ai/)）把它和 **TraeWork** 并排：**TraeCode: Your 10x AI Coding Engineer**；**TraeWork: Your Professional AI Work Assistant**。本目录只展开 TraeCode。

## 写给谁 / 先决条件

- **写给谁**：已经会用桌面 IDE 的前端工程师，想对位 Cursor 的字节跳动 AI IDE。
- **先决条件**：官方 [快速开始](https://docs.trae.ai/ide/set-up-trae) / [中国站快速开始](https://docs.trae.cn/ide_get-started-with-trae.md) 列出的操作系统（见下表）；一个 TRAE 账号。
- **非目标**：不教 TraeWork 办公工作台；不教豆包 / 扣子 / 火山方舟；不教模型内部机制（去 Learn LLM）；不编 TraeCode CLI 命令（企业页写 **coming soon**）。

## 产品家族

字节跳动 TRAE 官方一级入口必须先对账。本目录**只展开 TraeCode**。其余各占一行。下表「官方名称」抄自 2026-08-19 打开的官方页，不是本站自造名。

| 官方名称 | 官方 URL | 本站去向 |
|----------|----------|----------|
| **TraeCode**（AI 编程 IDE） | [www.trae.ai](https://www.trae.ai/) · [Download Center](https://www.trae.ai/download) | 本目录主路径 |
| **TraeCode 文档** | [docs.trae.ai · What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) · [快速开始](https://docs.trae.ai/ide/set-up-trae) | 本页 · [教程](./trae.md) |
| **TraeWork** | [www.trae.ai/work](https://www.trae.ai/work) · [What is TRAE Work?](https://docs.trae.ai/solo/what-is-trae-solo) | 地图一行：办公工作台，不拆教程 |
| **TraeCode Plugin** | [企业页](https://www.trae.ai/enterprise)（原文：VS Code、JetBrains and other mainstream editors） | 地图一行：嵌进已有编辑器，不是本 IDE 教程 |
| **TRAE Enterprise** | [www.trae.ai/enterprise](https://www.trae.ai/enterprise) | 地图一行：团队采购 |
| **TraeCode CLI** | 企业页原文 **coming soon** | 地图一行：未上线，禁止编命令 |
| **TRAE Editor for Unity** | [中国站教程](https://docs.trae.cn/ide_trae-editor-for-unity-tutorial.md) | 地图一行：Unity 插件 |
| **中国站 TraeCode / TraeWork** | [www.trae.cn](https://www.trae.cn/) · 快速开始链 [www.trae.com.cn](https://www.trae.com.cn) · [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code) | [教程 · 分表面安装](./trae.md#1-选表面中国站-vs-国际站) |
| **火山引擎 TRAE** | [volcengine.com/product/trae](https://www.volcengine.com/product/trae) | 地图一行：CN 云产品位 |
| **豆包** | 另 issue #79 | 一行 → 将有的 [豆包家族](/zh/products/doubao/) |
| **扣子 Coze** | 另 issue #81 | 一行 → 将有的 [扣子家族](/zh/products/coze/) |
| **火山方舟 Ark** | 另 issue #82 | 一行 → [火山方舟](/zh/products/volcengine-ark/) |

来源：[www.trae.ai](https://www.trae.ai/)、[docs.trae.ai 顶栏](https://docs.trae.ai/ide/what-is-trae)、[企业页](https://www.trae.ai/enterprise)、[www.trae.cn](https://www.trae.cn/)、[docs.trae.cn/llms.txt](https://docs.trae.cn/llms.txt)。

```
TRAE（品牌）
├── TraeCode — 桌面 AI 编程 IDE（本目录）
│   ├── IDE 模式（编辑器 / 终端 / 调试 / 插件 / Git）
│   ├── SOLO 模式（AI 主导：规划 → 生成 → 测试 → 预览）
│   ├── CUE / Agent / Skills / Rules / MCP
│   ├── TraeCode Plugin（嵌进 VS Code / JetBrains，地图一行）
│   └── TraeCode CLI（官方 coming soon）
├── TraeWork — 独立办公工作台（Web / Desktop / Mobile）
│   └── Work / Code（营销页另写 Design）
├── TRAE Enterprise — 团队
└── 同厂其它 AI（本目录不展开）
    ├── 豆包 #79
    ├── 扣子 #81
    └── 火山方舟 #82
```

**容易撞名：**

- **TraeCode ≠ TraeWork。** 前者是编程 IDE；后者是办公工作台。官方：[TraeWork builds upon TraeCode's SOLO mode](https://docs.trae.ai/ide/what-is-trae)。
- **TraeCode 里的 SOLO 模式 ≠ TraeWork。** SOLO 是 IDE 左上角的模式开关；TraeWork 是独立客户端（Web / Desktop / Mobile）。
- **旧名 TRAE IDE / TRAE SOLO 独立端** 已收进 TraeCode / TraeWork，不要再当第三个产品装。
- **CUE ≠ Cursor。** CUE 是 TraeCode 的补全 / 多行修改 / 修改点预测。
- **TraeCode Plugin ≠ TraeCode 扩展市场。** Plugin 把能力嵌进 VS Code / JetBrains；扩展市场是 IDE 里装语言/调试插件。
- **`trae.ai` ≠ `trae.cn` / `trae.com.cn`。** 国际站顶栏有「前往中国站」。两套登录、额度、设备上限。不要混用账号。

### 快速决策：我该用哪个？

```
我要做什么？
├── 在本机仓库里写代码 / 改代码 / 调试 / 补全
│   └── → TraeCode
│       ├── 要精细控制每一步？ → IDE 模式
│       ├── 用自然语言从需求推到预览？ → SOLO 模式
│       └── 人已经在 VS Code / JetBrains？ → TraeCode Plugin（地图一行，跟企业页）
├── 做 PPT / 文档 / 数据分析 / 跨端派任务
│   └── → TraeWork（不在本目录）
├── 团队采购、仓库索引上限、SOC 2
│   └── → TRAE Enterprise
├── 聊天 / 通用助手
│   └── → 豆包（#79）
├── 搭 Bot / 工作流
│   └── → 扣子（#81）
└── 在自己的服务里调模型 API
    └── → 火山方舟（#82）
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 选对表面 | [教程 · 中国站 vs 国际站](./trae.md#1-选表面中国站-vs-国际站) | 不要装错站、登错号 |
| 2. 装上能开项目 | [教程 · 安装与第一项目](./trae.md) | 从官方下载页装上，打开本地文件夹或克隆仓库 |
| 3. 分清两种模式 | [教程 · IDE / SOLO](./trae.md#5-切换-ide-模式与-solo-模式) | 左上角切换，不要把 SOLO 当成 TraeWork |
| 4. 回查入口 | [速查表](./trae-cheatsheet.md) | OS、设备上限、官方 URL |

## 功能速查

只列官方文档已经写明的能力。细节进教程或官方页。

| 能力 | 一句话 | 官方页 |
|------|--------|--------|
| IDE 模式 | 保留编辑器、终端、调试、插件、源代码管理 | [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) |
| SOLO 模式 | AI 主导：需求 → 生成 → 测试 → 预览；左上角切换 | [SOLO 模式概览](https://docs.trae.ai/ide/solo-mode) |
| 打开项目 | 导入本地文件夹 / 从 GitHub 克隆 / 从 URL 克隆 | [快速开始](https://docs.trae.ai/ide/set-up-trae) |
| CUE | 补全、链式补全、多行修改、修改点预测；Py / TS / Go 智能导入与重命名 | [What is TraeCode?](https://docs.trae.ai/ide/what-is-trae) |
| 智能体 | 自然语言拆任务、检索仓库、调工具；可自定义 + MCP | 同上 |
| 上下文 | 文件、文件夹、片段、终端、仓库、文档集、网页 | 同上 |
| 隐私模式 | 开启后对话 / 代码 / 生成结果不用于分析、优化或训练；代码文件留在本地 | 同上 |
| 沙箱 | 智能体命令在受限环境执行 | 同上 |
| 远程 | Remote SSH、WSL | 同上 |
| 设备上限 | 国际站 **3** 台；中国站 **10** 台。Web 版 TraeWork 不计入 | [intl](https://docs.trae.ai/ide/device-limit) · [CN](https://docs.trae.cn/ide_device-limit.md) |

## 套餐（只抄官方，不猜价格）

- 国际站现行档位在 [www.trae.ai/pricing](https://www.trae.ai/pricing)：**Lite / Pro / Pro+ / Ultra**。该页写 Pro **Free for 7 days. Then $10/month.**；AI 请求按 token 折成 Dollar Usage 从月度余额扣。Lite / Pro+ / Ultra 的完整月费以该页为准，本站不补未抓全的数字。
- 文档站另有 [(Legacy) Plans & billing](https://docs.trae.ai/ide/billing)。官方已标 Legacy，不要把旧免费/Pro 次数表当现行。
- 中国站 [llms.txt](https://docs.trae.cn/llms.txt) 有「以积分为核心的计费模式」条目。金额与折算去中国站文档，这里不写死。
- 企业方案：定价页写 Contact us via BytePlus；产品页 [Enterprise](https://www.trae.ai/enterprise)。

## 下一步

1. 打开 [TraeCode 教程](./trae.md)，先选中国站或国际站，再从官方下载页安装。
2. OS、设备上限、官方 URL 去 [速查表](./trae-cheatsheet.md)。
3. 官方深读从 [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) 或 [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code) 进。
