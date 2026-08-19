---
title: CodeBuddy 术语表
description: "不教操作，只解释 CodeBuddy 家族里容易撞名的词：三种编程形态、WorkBuddy、混元、国内站 / 国际站、CODEBUDDY.md。"
domain: product
tags:
  - coding-agent
role: glossary
---

# CodeBuddy 术语表

不教操作，只解释「是什么 / 不是什么」。选哪个入口看 [学习地图](./)。

## 概念关系

```
腾讯 AI（与本目录相关的部分）
├── CodeBuddy — 编码产品族
│   ├── IDE
│   ├── 插件（装进 VS Code / JetBrains 等）
│   └── CodeBuddy Code（CLI，命令 codebuddy）
│       ├── 交互 REPL
│       ├── print（-p）
│       └── CLI 自己的 plugin / Skills / MCP
├── WorkBuddy — 办公工作台（不是编码主线）
├── 元宝 — 通用助手
└── 混元 — 模型（CodeBuddy 可切换的引擎之一）
```

## CodeBuddy

**是什么**：腾讯云的 AI 辅助编程产品。官方定义（[文档总览](https://www.codebuddy.cn/docs/)、[产品概述](https://cloud.tencent.com/document/product/1831/134343)）是同时支持 **IDE、插件、CLI** 三种形态。

**不是什么**：不是混元本身，也不是元宝，更不是 WorkBuddy。官网营销句「基于混元代码大模型」说的是模型来源之一；同一套官方文档还写支持 DeepSeek 等。

三种形态共享同一账号资源配额（[故障排查](https://www.codebuddy.cn/docs/cli/troubleshooting)）。

## CodeBuddy IDE

**是什么**：独立安装的编辑器。官方定位：产设研一体工作台，主打「对话即编程」。面向产品 / 设计师 / 全栈 / 编程初学者。

**为什么需要**：插件留在你现有 IDE 里打辅助；IDE 把需求、设计、代码、部署放进同一个产品。

**不是什么**：不是 VS Code 插件的皮肤。系统要求是 macOS 11+ / Windows 10+（[安装和登录](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation)）。

## CodeBuddy 插件

**是什么**：装进已有编辑器的扩展。市场搜索名官方写 **腾讯云代码助手**。宿主包括 VS Code、Visual Studio、JetBrains 系列、Android Studio，以及微信开发者工具（[插件页](https://www.codebuddy.cn/docs/plugin/)）。

**为什么需要**：你已经有编辑器和工作流，只想要补全、对话、工程问答。

**不是什么**：

- 不是 CLI 的 `codebuddy plugin`
- 本站不因此写微信或 QQ 产品教程；微信开发者工具只是官方列出的宿主之一

## CodeBuddy Code

**是什么**：面向专业工程师的 AI CLI。可执行文件 `codebuddy`，npm 包 `@tencent-ai/codebuddy-code`。官方适用：DevOps / 运维 / SRE / 资深开发者。

**三张脸**（同一产品，不是三个产品）：

| 面 | 入口 |
|----|------|
| 交互 REPL | `codebuddy` |
| 打印 / 无头 | `codebuddy -p "..."` |
| 进阶托管 | `codebuddy --serve`、`daemon`、`--bg` |

**不是什么**：不是已停更的某个「腾讯 Copilot」口头禅。国内登录域确实是 `copilot.tencent.com`，那是认证站，不是另一个产品名。

## WorkBuddy

**是什么**：官方原文（[WorkBuddy 简介](https://www.codebuddy.cn/docs/workbuddy/)）——「WorkBuddy 是腾讯出品的全场景 AI 办公工作台。」文档站把它和 CodeBuddy IDE / 插件 / CLI 并列成一级入口。

**为什么出现在这张表**：家族完备要求一级入口不能从地图消失。#78 只收 CodeBuddy 编码三形态，所以 WorkBuddy 只占一行。

**不是什么**：不是 CodeBuddy IDE 的移动版。小程序和 App 是 WorkBuddy 自己的入口。

## 元宝

**是什么**：腾讯的通用 AI 助手。[yuanbao.tencent.com](https://yuanbao.tencent.com/)。

**不是什么**：不是 CodeBuddy。本目录不写教程（#76）。

## 混元

**是什么**：腾讯自研大模型。[hunyuan.tencent.com](https://hunyuan.tencent.com/)、[云产品 tclm](https://cloud.tencent.com/product/tclm)。CodeBuddy 官方写「支持混元、DeepSeek 等多种对话大模型」。

**不是什么**：不是一个编码 IDE，也不是你要 `npm install` 的东西。本目录不写混元 API 教程（#77）。

## 国内站 / 国际站

**是什么**：两套站点与登录。

| | 国内 | 国际 |
|--|------|------|
| 文档 / 官网 | codebuddy.cn | codebuddy.ai |
| CLI 登录选项 | Chinese Site → copilot.tencent.com | International Site → codebuddy.ai |
| IDE 下载（官方表） | [copilot.tencent.com/ide](https://copilot.tencent.com/ide) | [codebuddy.ai](https://www.codebuddy.ai/) |

**为什么要分**：模型清单和认证域不同。官方快速开始写：国内站「支持国内主流模型」，国际站「支持海外主流模型」。

**不是什么**：不是「一个站过时了」。两边都会更新；若英文总览少写了「插件」这一形态，以中文总览和腾讯云 1831 文档为准。

## 企业版

**是什么**：SaaS 企业版（旗舰版）和专有云专享版。登录走腾讯统一身份或企业管理员下发的地址。

**不是什么**：不是个人版换皮。购买和专享版流程不在本教程展开。

## `CODEBUDDY.md`

**是什么**：官方从 Claude Code 迁移时对应 `CLAUDE.md` 的「AI 指令和记忆文档」。用户级路径在迁移示例里是 `~/.codebuddy/CODEBUDDY.md`。

**为什么需要**：把稳定约定从对话里抽出来，避免每次重讲。

**不是什么**：不是 CLI plugin 清单，也不是 Skills 目录。Skills 在 `~/.codebuddy/skills/`；自定义斜杠命令在 `.codebuddy/commands/`。

仓库根是否自动读 `CODEBUDDY.md`，官方故障排查没有写成一句硬规则。以本机 `/config` 和官方「记忆」页为准。

<!-- TODO: 待核实 —— 项目根 CODEBUDDY.md 的自动注入范围 -->

## 权限模式

**是什么**：CLI 决定「这次工具调用要不要问你」的档位。`--permission-mode` 官方值：`default`、`acceptEdits`、`auto`、`dontAsk`、`plan`、`bypassPermissions`。交互里 `Shift+Tab` 的文案是 `default → bypass → accept → plan`。

**为什么分两套名字**：键位提示用短名，flag 用全名。写脚本用 flag 全名。

**不是什么**：不是沙箱。沙箱（`--sandbox`，官方标 Beta）限制批准之后能碰到的文件系统 / 网络。权限过了，沙箱仍可能拦住。

## CLI plugin vs 编辑器插件

| | 编辑器插件 | CLI plugin |
|--|-----------|------------|
| 装在哪 | VS Code / JetBrains… | `codebuddy plugin install` |
| 官方文档树 | `/docs/plugin/` | `/docs/cli/` 的插件系统 / 插件市场 |
| 解决什么 | 在已有 IDE 里补全和对话 | 给终端 agent 打包 Skills / hooks / 工具 |

两者都叫「插件」，不是同一次安装。

## 已退役或易过时的说法

本站**不要**再写成事实的句子：

- 「CodeBuddy 只有插件」——官方一级是三种形态
- 「CodeBuddy 就是混元 IDE」——混元是模型
- 「`gh` 式腾讯 Copilot 扩展」——现行 CLI 是独立包 `@tencent-ai/codebuddy-code`
- 把 WorkBuddy 写成 CodeBuddy 的一种 Mode
