---
title: 通义灵码 Cheatsheet
description: "通义灵码 / Qoder CN 安装入口、兼容版本、快捷键、会话模式、套餐与官方数据源。只抄能打开的官方页。"
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# 通义灵码 Cheatsheet

> **参考页**。只查不学。概念看 [术语表](./lingma-glossary)，上手看 [教程](./lingma)。
>
> 最后核实：2026-08-19。套餐和快捷键以打开的官方页为准；帮助中心与 [docs.qoder.cn](https://docs.qoder.cn/) 打架时，在表里同时记下，不抹平。

## 术语索引

| 术语 | 一句话 |
|------|--------|
| [通义灵码 / Qoder CN](./lingma-glossary#通义灵码--qoder-cn) | 阿里云编码助手；2026-05-20 更名 |
| [Qoder CN IDE](./lingma-glossary#qoder-cn-ide--lingma-ide) | 独立 IDE，营销站仍写 Lingma IDE |
| [IDE 插件](./lingma-glossary#ide-插件) | JetBrains / VS Code / Visual Studio |
| [智能问答 / 文件编辑 / 智能体](./lingma-glossary#智能问答--文件编辑--智能体) | 三种会话模式，不是三个产品 |
| [NES](./lingma-glossary#nes-行间建议预测) | 下一处修改预测 |
| [Credits](./lingma-glossary#credits) | 2026-05-20 起的用量单位 |
| [通义千问 / 百炼](./lingma-glossary#不是什么) | 同厂其它产品，本目录不写 |

## 安装入口

| 形态 | 官方入口 | 原文要点 |
|------|----------|----------|
| Qoder CN IDE | [qoder.com.cn/download](https://qoder.com.cn/download) | 帮助中心指定的 IDE 下载地址 |
| Lingma IDE（旧品牌页） | [lingma.aliyun.com/download](https://lingma.aliyun.com/download) | 营销站仍用此名 |
| JetBrains 市场 | IDE 插件页搜 **通义灵码（TONGYI Lingma）** 或 **Qoder CN** | 两套展示名都是官方原文 |
| JetBrains 离线包 | [tongyi-jetbrains-latest.zip](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/jetbrain/tongyi-jetbrains-latest.zip) | 帮助中心 |
| JetBrains 离线包（新品牌） | [qodercn-jetbrains-latest.zip](https://qodercn-jb.oss-cn-hangzhou.aliyuncs.com/qodercn-jetbrains-latest.zip) | qoder.com.cn |
| VS Code 市场 | `vscode:extension/Alibaba-Cloud.tongyi-lingma` | 帮助中心「立即安装」 |
| VS Code VSIX | [tongyi-lingma-latest.vsix](https://tongyi-code.oss-cn-hangzhou.aliyuncs.com/vscode/tongyi-lingma-latest.vsix) | 帮助中心 |
| 安装总入口 | [安装指南](https://help.aliyun.com/zh/lingma/installation-guide) | IDE + JetBrains + VS Code 逐步说明 |
| 登录总入口 | [安装和登录](https://help.aliyun.com/zh/lingma/installation-and-login-guide/) | 个人 / 企业标准 / 企业专属 |

逐步原文见 [教程 · 第 1 步](./lingma#第-1-步装上)。

## 兼容 IDE 和系统

来源：[兼容 IDE 和系统](https://help.aliyun.com/zh/lingma/compatible-ide-and-system)、[什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)。

| 客户端 | IDE / 系统门槛 |
|--------|----------------|
| Qoder CN IDE | Windows 10/11（x64；产品页另写 arm64）、macOS 11.0+；安装指南另列 Linux x64 `.deb`/`.rpm` |
| JetBrains IDEs | 2020.3+：IntelliJ IDEA、PyCharm、GoLand、WebStorm、Android Studio、HUAWEI DevEco Studio 等；Windows 7+ / macOS / Linux |
| Visual Studio Code | 1.68.0+；Windows 7+ / macOS / Linux |
| Visual Studio | 2022 17.3.0+ 或 2019 16.3.0+；Windows 10+ |
| 其它场景 | Remote SSH、WSL；VS Code WebIDE / Open VSX |

官方补充：迭代集中在 **Qoder CN IDE + JetBrains 插件**；VS Code 更新放缓。新文档站写 VS Code 插件已停止维护。

支持语言（产品页 / 帮助中心）：Java、Python、Go、C#、C/C++、JavaScript、TypeScript、PHP、Ruby、Rust、Scala、Kotlin 等。营销站另写「200 种语言」——本表只收录帮助中心点名的主流语言。

## 快捷键

来源：[智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)、[行间建议预测](https://help.aliyun.com/zh/lingma/next-edit-suggestion)、[插件配置](https://help.aliyun.com/zh/lingma/plug-in-configuration-guide)。未在官方表里出现的键不收录。

| 操作 | macOS | Windows |
|------|-------|---------|
| 打开 / 关闭智能会话（JetBrains、VS Code） | `⌘ ⇧ L` | `Ctrl Shift L` |
| 打开 / 关闭智能会话（Lingma IDE） | `⌘ L` | `Ctrl Shift L` |
| 接受行间代码建议 | `Tab` | `Tab` |
| 接受 NES | `Tab` | `Tab` |
| 拒绝 NES | `Esc` | `Esc` |
| 打开个人设置（开启 NES） | `⌘ ⇧ ,` | `Ctrl Shift ,` |

VS Code 新建会话还可在输入框输入 `/` 后选 `/newChat`（官方：仅 VS Code）。智能体规划可用 `/plan`。

## 会话模式

| | 智能问答 | 文件编辑 | 智能体 |
|---|----------|----------|--------|
| 改文件 | 否 | 是（你给的范围） | 是（自己拆任务） |
| 跑终端 | 否 | 否 | 是（默认先确认） |
| VS Code | 支持 | 支持 | 支持 |
| Lingma IDE / JetBrains | 支持 | **不支持** | 支持 |
| Visual Studio | 支持 | 未写支持 | 未写支持 |

## 套餐（只抄打开的官方表）

来源：[计费说明](https://help.aliyun.com/zh/lingma/billing-description)，2026-08-19 打开的「Qoder CN（全家桶）」页签。**价格会变，下单前打开官方页。**

官方前提：

- 2026-05-20 23:00:00（北京时间）起启用新定价和 Credits。
- 个人专业版限免已于 2026-05-20 18:00:00 结束。
- 2026-06-20 起，全家桶个人版 Credits 可在 Desktop、JetBrains 插件、QoderWork、CLI、Wake、Mobile 间共享。
- 该页写「VSC 插件停止演进」。

| 版本 | 单价（官方表） | Credits（官方表） |
|------|----------------|-------------------|
| 个人体验版（Free） | 免费 | 有限体验额度；2 周试用及 300 Credits |
| 个人专业版（Pro） | 59 元 / 月 | 2,000 Credits / 月 |
| 个人高级版（Pro+） | 169 元 / 月 | 6,000 Credits / 月 |
| 团队版（Teams） | 99 元 / 席位·月 | 3,000 Credits / 席位·月 |
| 企业标准版（Enterprise） | 149 元 / 席位·月 | 3,000 Credits / 席位·月，可共享；10 席位起 |
| 企业专属版（Enterprise VPC） | 199 元 / 席位·月 | 3,000 Credits / 席位·月，可共享；50 席位起 |

「Qoder CN（原灵码）」页签是 IDE / JetBrains / VS Code **单产品企业订阅**：企业标准版 99 元 / 席位·月，企业专属版 199 元 / 席位·月。存量 2026-05-20 前合同见该页第三个页签，本表不抄旧价以免和下单页打架。

资源包（原灵码个人）：40 元 / 1,000 Credits，有效期 1 个月。企业：80 元 / 2,000 Credits，有效期 3 个月。到期未用完清零。

## 高质量信息源

最后核实：2026-08-19。按可信度排序。社区评测只作线索，不进套餐和命令。

### 一手官方

| 来源 | 用途 |
|------|------|
| [lingma.aliyun.com](https://lingma.aliyun.com/) | 旧品牌营销首页，本 issue 指定起点 |
| [lingma.aliyun.com/download](https://lingma.aliyun.com/download) | Lingma IDE + JetBrains 安装原文 |
| [qoder.com.cn](https://qoder.com.cn/) | 新品牌站 |
| [qoder.com.cn/download](https://qoder.com.cn/download) | 帮助中心指定的 IDE 下载页 |
| [docs.qoder.cn](https://docs.qoder.cn/) | 官方标为最新的文档站 |
| [什么是 Qoder CN 系列](https://help.aliyun.com/zh/lingma/introduction-of-lingma) | 家族图 |
| [什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn) | 编码子产品能力 |
| [安装指南](https://help.aliyun.com/zh/lingma/installation-guide) | IDE / JetBrains / VS Code 安装 |
| [安装和登录](https://help.aliyun.com/zh/lingma/installation-and-login-guide/) | 登录分流 |
| [个人版快速入门](https://help.aliyun.com/zh/lingma/individual-edition-quick-start) | 个人账号路径 |
| [兼容 IDE 和系统](https://help.aliyun.com/zh/lingma/compatible-ide-and-system) | 版本门槛 |
| [智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat) | 三模式 + 快捷键 |
| [智能体](https://help.aliyun.com/zh/lingma/agent) | `/plan`、终端确认、Auto-Run |
| [MCP](https://help.aliyun.com/zh/lingma/guide-for-using-mcp) | MCP 配置 |
| [计费说明](https://help.aliyun.com/zh/lingma/billing-description) | 价格与 Credits |
| [VS Marketplace · Alibaba-Cloud.tongyi-lingma](https://marketplace.visualstudio.com/items?itemName=Alibaba-Cloud.tongyi-lingma) | 插件 ID 与英文产品说明 |
| [国际站帮助](https://www.alibabacloud.com/help/en/lingma/) | 英文对照 |

### 同厂但不在本目录展开

| 来源 | 用途 |
|------|------|
| [qianwen.com](https://www.qianwen.com/) | 通义千问 |
| [阿里云百炼](https://www.aliyun.com/product/bailian) | 模型平台 |
| [Qoder CN CLI](https://qoder.com.cn/cli) | 终端子产品 |
