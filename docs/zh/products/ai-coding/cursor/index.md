# Cursor 生态学习导航

> **Cursor 是 Anysphere 的 AI 编程产品家族**：本地编辑器、终端 CLI、云端沙箱 Agent、git forge、安全审查、视觉 UI 指挥、SDK。新手最快的入口仍是编辑器里的 Tab + Agent。本文是导航地图，不教逐步点击。

## 写给谁看

- 前端 / 全栈工程师，想从 Copilot 式补全走到「让 Agent 改仓库」
- 已经会 VS Code，第一次装 Cursor
- 需要给团队选 **编辑器 / CLI / Cloud / Bugbot / Origin / Security / Design / SDK** 的 Tech Lead

**不是**：Cursor 企业采购合同、模型逐 token 报价表、Anysphere 内部实现白皮书。架构深读见站内 [Cursor IDE 架构](/zh/tech/ai-coding/cursor-ide-architecture)。

## 产品全景图

官方主导航把 Cursor 切成几块**产品形态**（不是再抄一遍 Rules）。

```
Cursor 生态
├── Cursor 编辑器（VS Code 分支）— 本机写代码的主入口
│   ├── Tab          — 多行补全、跨文件跳转、自动 import
│   ├── Inline Edit  — Cmd+K / Ctrl+K 改当前选区
│   ├── Chat / Agent — Cmd+I / Ctrl+I；同一套 Agent，四种约束
│   │   ├── Agent    — 改文件、跑命令
│   │   ├── Ask      — 只读问答
│   │   ├── Plan     — 先出可编辑计划，批准后再写
│   │   └── Debug    — 假设 → 打日志 → 你复现 → 用运行时证据修
│   └── Design Mode  — Agents Window 浏览器：点 / 画 / 语音（Cmd+Shift+D）
├── Cursor CLI（`agent`）— 终端交互，或 `agent -p` 无头 / CI
├── Cloud Agents（曾用名 Background Agents）
│   └── 隔离 VM 克隆仓库、建分支、跑测试、开 PR
│       入口：编辑器 Cloud 下拉、cursor.com/agents、手机 / PWA、
│       Slack / GitHub `@cursor`、CLI 消息前加 `&`
├── Bugbot — PR 自动审查（bug / 安全 / 质量）
│   └── Autofix 会再拉起一个 Cloud Agent 去修；官方名是 Autofix，不是独立产品「Fixer」
├── Origin — Cursor 的 git forge（early beta）。托管 / 镜像 / PR / 浏览
├── Security Agents — Security Reviewer（PR）+ Vulnerability Scanner（cron）
├── PR Routing & Approval — 派审人；低风险 PR 可自动批
└── Cursor SDK — `@cursor/sdk` / `cursor-sdk` / Bridge。同一 Agent，进你的进程
```

官方主导航还有这些（本页一行，官方页，不另开 Tutorial）：

| 入口 | 什么时候选 | 官方 |
|------|------------|------|
| **Mobile / iOS / PWA** | 用手机发起或审查 Cloud Agents | [Mobile](https://cursor.com/docs/cloud-agent/mobile) |
| **JetBrains** | 留在 IntelliJ / PyCharm / WebStorm，走 ACP | [JetBrains](https://cursor.com/docs/integrations/jetbrains) |
| **Xcode** | Xcode 26.3+ 内置 MCP | [Xcode](https://cursor.com/docs/integrations/xcode) |
| **Plugins** | 打包 rules / skills / MCP / hooks | [Plugins](https://cursor.com/docs/plugins) |
| **Automations** | 按日程或事件跑 Cloud Agents。上面挂着 Bugbot、Security Agents、PR Routing | [Automations](https://cursor.com/docs/cloud-agent/automations) |

对位本站其他家族：Cloud Agents ≈ Claude 远程 / Dispatch、Gemini Jules；Design Mode ≈ [Claude Design](../claude/claude-design)（应用内叠加 vs 独立画布）；CLI ≈ Claude Code / Codex 的终端形态；Origin ≈「托管代码」，不是 Rules。

### 快速决策：我该用哪个？

```
我要做什么？
├── 打几个字、补几行、改光标旁
│   ├── 下一处编辑 → Tab（不要开 Agent）
│   └── 当前选区 / 当前函数 → Inline Edit（Cmd+K / Ctrl+K）
├── 在本机仓库里问、改、计划、调试
│   └── 编辑器里的同一套 Agent（Cmd+I；Cmd+. 开模式菜单）
│       ├── 先理解、先别改文件 → Ask
│       ├── 目标清楚、跨文件实现 / 跑测试 → Agent
│       ├── 跨很多文件、需求还糊 → Plan（输入框 Shift+Tab）
│       ├── 能复现但找不到根因 → Debug
│       └── 对着正在跑的 UI 指点 → Design Mode（Cmd+Shift+D）
├── 人在终端，或脚本 / CI 要无头跑
│   └── Cursor CLI（`agent`）
│       ├── 交互会话 → `agent`
│       ├── 只读探索 → `agent --mode=ask`
│       ├── 先计划 → `agent --mode=plan` / `--plan`
│       └── 脚本 / CI → `agent -p`；要落盘再加 `--force`
├── 人不在电脑旁、要并行、要在隔离环境开 PR
│   └── Cloud Agents
│       ├── 从编辑器 / 网页 / iOS / Android PWA 发起
│       ├── Slack、GitHub、Linear 里 `@cursor`
│       └── CLI 会话里消息前加 `&`，交给云端接着跑
├── 要托管代码本身（不只是审 GitHub PR）
│   └── Origin（Pro / Teams / Enterprise；先占用 codebase 名）
├── 安全扫描或 PR 安全门禁
│   └── Security Agents（`/review-security`；Automations）
├── 派审人 / 自动批低风险 PR
│   └── PR Routing & Approval（`APPROVAL_POLICY.md`）
├── 从自己的 TypeScript / Python / 其他运行时调用同一套 Agent
│   └── Cursor SDK（`@cursor/sdk` / `cursor-sdk` / Bridge）
└── PR 已经推上去（或推之前想先审 diff）
    └── Bugbot
        ├── 云端自动审 / 评论 `cursor review`
        ├── 推之前本地 `/review-bugbot`
        └── 要机器接着改 → Autofix（Cloud Agent），不是 Debug Mode
```

**和本站其他工具怎么选**（决策摘要，不是功能表）：

| 你更在乎 | 选 | 下一步 |
|----------|----|--------|
| IDE 里一站式补全 + Agent | **Cursor 编辑器** | [教程](./cursor) |
| 对着正在跑的 UI 点 / 画 / 说 | **Design Mode** | [Design Mode](./design-mode) |
| 终端交互或无头 CI，但仍要 Cursor 规则 / MCP | **Cursor CLI** | [CLI](./cursor-cli) |
| 人不在、要并行、要隔离 VM 开 PR | **Cloud Agents** | [Cloud Agents](./cloud-agents) |
| PR 先让机器审一遍 | **Bugbot** | [Cookbook · Bugbot](./cursor-cookbook#用-bugbot-审-pr) |
| 托管 / 镜像 / 浏览仓库 | **Origin** | [Origin](./origin) |
| PR 上或定时扫安全问题 | **Security Agents** | [Security Agents](./security-agents) |
| 派审人 / 批低风险 PR | **PR Routing** | [PR Routing](./pr-routing) |
| 同一 Agent 进自己的进程 | **SDK** | [Cursor SDK](./cursor-sdk) |
| 手机 | **iOS 应用 / Android PWA** | [Mobile](https://cursor.com/docs/cloud-agent/mobile) |
| JetBrains / Xcode | **ACP / Xcode MCP** | [JetBrains](https://cursor.com/docs/integrations/jetbrains) · [Xcode](https://cursor.com/docs/integrations/xcode) |
| 打包 skills + MCP | **Plugins** | [Plugins](https://cursor.com/docs/plugins) |
| 按日程或事件跑 Cloud | **Automations** | [Automations](https://cursor.com/docs/cloud-agent/automations) |
| 终端里精细权限 / Hook / 无头 CI（Anthropic 生态） | [Claude Code](../claude/claude-code) | Claude 学习地图 |
| 已经把工作流焊在 VS Code + GitHub | [GitHub Copilot](../copilot) | Copilot 页 |

22 项功能对照、快捷键、配置模板见 [速查表](./cursor-cheatsheet)。不要在本页找那张大表。

## 核心概念速览

完整「是什么 / 为什么」在 [术语表](./cursor-glossary)。

| 概念 | 一句话 | 出现位置 |
|------|--------|----------|
| **Tab** | 补全专用模型；接受 / 拒绝会反馈到后续建议 | 编辑器 |
| **Modes** | Agent / Ask / Plan / Debug，同一套 Agent 的不同约束 | 编辑器 / CLI |
| **Design Mode** | Agents Window 浏览器里的视觉提示 | 编辑器 |
| **Rules / AGENTS.md** | 写进模型上下文的持久指令 | 编辑器 / CLI / Cloud |
| **Skills / Commands** | 按需工作流；`/` 手动调 | 编辑器 / Cloud |
| **MCP / Hooks / Subagents** | 外接工具、生命周期脚本、隔离上下文的子代理 | 编辑器 / CLI / Cloud（约束不同） |
| **Cloud Agents** | 隔离 VM 上的 Agent；曾用名 Background Agents | 云端 |
| **Bugbot** | PR 审查；Autofix 再拉 Cloud Agent | PR / `/review-bugbot` |
| **CLI `agent`** | 官方终端入口；无头用 `-p` | 终端 / CI |
| **Origin** | Cursor 的 git forge；二进制 `origin` | 托管代码 |
| **Security Agents** | Automations 上的 PR 审查 + cron 扫描 | 云端 / `/review-security` |
| **PR Routing** | 派审人；可能自动批 | Automations |
| **SDK** | 用 `@cursor/sdk` / `cursor-sdk` / Bridge 调同一 Agent | 你的进程 |

## 功能速查

### 编辑器

| 功能 | 用途 | 文档链接 |
|------|------|----------|
| Tab | 低延迟补全，不占 Agent 回合 | [教程 · Tab](./cursor#tab-与-inline-edit) |
| Inline Edit | `Cmd+K` 改选区 | 同上 |
| Agent / Ask / Plan / Debug | 本机改仓库的四种约束 | [教程 · 四种模式](./cursor#四种模式) |
| Design Mode | Agents Window 浏览器里点 / 画 / 说 | [Design Mode](./design-mode) |
| Rules / `AGENTS.md` | 记住包管理器和目录约定 | [教程 · 项目上下文](./cursor#项目上下文) |

### CLI / Cloud / 审查 / 托管 / SDK

| 功能 | 用途 | 文档链接 |
|------|------|----------|
| `agent` | 终端里同一套 Agent | [CLI](./cursor-cli) |
| `agent -p` / `--force` | 脚本与 CI；要改文件再加 `--force` | 同上 |
| Cloud Agents | 远程 VM 干活、开 PR | [Cloud Agents](./cloud-agents) |
| Bugbot | 审 PR diff；默认 check 是 `neutral` | [Cookbook · Bugbot](./cursor-cookbook#用-bugbot-审-pr) |
| Autofix | Bugbot 拉起 Cloud Agent 修 finding | 同上 |
| Origin | 托管、镜像、浏览、PR | [Origin](./origin) |
| Security Agents | PR + cron 安全 | [Security Agents](./security-agents) |
| PR Routing | 派审 / 批准 | [PR Routing](./pr-routing) |
| SDK | 进程内 Agent | [Cursor SDK](./cursor-sdk) |

## 学习路径

### 第一阶段：5 分钟跑通第一次改动

**目标**：装上、登录、让 Agent 解释仓库并做一个可回滚的小改。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 下载、登录、打开文件夹 | [教程 · 安装](./cursor#安装与登录) |
| 2 | `Cmd+I` 问「解释这个代码库」 | [教程 · 五分钟第一例](./cursor#五分钟第一例) |
| 3 | 做一个低风险小改，审 diff，跑已有检查 | 同上 |
| 4 | 分清 Tab / Inline Edit / Ask / Agent / Plan / Debug | [教程 · 模式](./cursor#四种模式) |

### 第二阶段：把项目教给 Cursor

**目标**：Agent 不再每次问包管理器和目录约定。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 根目录 `AGENTS.md` | [教程 · 项目上下文](./cursor#项目上下文) |
| 2 | `.cursor/rules/*.mdc` 按 glob 拆分 | [Cookbook · 写好 Rules](./cursor-cookbook#写好-rules) |
| 3 | `.cursorignore` 挡住密钥 | [速查表 · 忽略文件](./cursor-cheatsheet#忽略文件) |

### 第三阶段：接到真实工作流

**目标**：修 bug、开功能、审 PR，各有一条可跳读的配方。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 修 bug / Debug Mode | [Cookbook · 修 Bug](./cursor-cookbook#高效修-bug) |
| 2 | Plan → 实现 → 验证 | [Cookbook · 做功能](./cursor-cookbook#做跨文件功能) |
| 3 | Bugbot 审 PR | [Cookbook · Bugbot](./cursor-cookbook#用-bugbot-审-pr) |
| 4 | MCP / Hooks / 并行 Agent | [Cookbook](./cursor-cookbook) |
| 5 | 视觉改 UI | [Design Mode](./design-mode) |
| 6 | 参数与信源随手查 | [速查表](./cursor-cheatsheet) |
| 7 | 概念记混了 | [术语表](./cursor-glossary) |

### 第四阶段：离开本机窗口

**目标**：会判断任务该留在编辑器、丢给 CLI，还是派到 Cloud。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 装 `agent`，交互跑一轮 | [CLI](./cursor-cli) |
| 2 | 派一个不占窗口的 Cloud 任务 | [Cloud Agents](./cloud-agents) |
| 3 | 分清 Cloud ≠ Bugbot ≠ Debug | [术语表 · Cloud](./cursor-glossary#cloud-agents) · [Bugbot](./cursor-glossary#bugbot) |
| 4 | 代码放到 Origin，或扫 / 路由 PR | [Origin](./origin) · [Security Agents](./security-agents) · [PR Routing](./pr-routing) |
| 5 | 把 Agent 嵌进自己的程序 | [SDK](./cursor-sdk) |

## 相关页面

- [Cursor 教程](./cursor) — 安装到日常用法
- [实战 Cookbook](./cursor-cookbook) — 按任务跳读
- [Design Mode](./design-mode)
- [Cloud Agents](./cloud-agents)
- [Cursor CLI](./cursor-cli)
- [Origin](./origin)
- [Security Agents](./security-agents)
- [PR Routing](./pr-routing)
- [Cursor SDK](./cursor-sdk)
- [速查表](./cursor-cheatsheet) — 矩阵 / 快捷键 / 配置 / 信息源
- [术语表](./cursor-glossary) — 是什么、为什么
- 站内专题：[Cursor Rules](/zh/tech/ai-coding/cursor-rules)、[Cursor IDE 架构](/zh/tech/ai-coding/cursor-ide-architecture)
- [AI 编程工具总览](../)
