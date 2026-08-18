---
title: MiniMax Code 教程
description: 桌面端从下载页安装；CLI 官方命令是 mcode。两条通道都只抄官方原文。
domain: product
tags:
  - coding-agent
role: tutorial
---

# MiniMax Code 教程

> 本页带你从安装走到第一次对着本地仓库干活。参数清单见 [速查表](./minimax-code-cheatsheet.md)，场景配方见 [Cookbook](./minimax-code-cookbook.md)，名字辨析见 [术语表](./minimax-code-glossary.md)。
>
> MiniMax Code 有桌面端和 CLI 两张脸。官方原文：「它与桌面客户端互为补充」（[CLI 功能介绍](https://agent.minimaxi.com/docs/cli/features)）。先选一张脸装完，再学另一张。

## 1. 先选哪张脸

| 你在哪干活 | 装什么 | 官方入口 |
|------------|--------|----------|
| 要窗口、浏览器预览、定时任务、手机遥控 | 桌面端 | [国内下载](https://agent.minimaxi.com/download) / [海外下载](https://agent.minimax.io/download) |
| 要终端、脚本、CI、编辑器 ACP | CLI（`mcode`） | [CLI 快速开始](https://agent.minimaxi.com/docs/cli/quick-start) |

两张都可以装。它们不是两个产品。

## 2. 安装桌面端

原文来自 [下载与安装](https://agent.minimaxi.com/docs/code/get-started/download)：

> MiniMax Code 支持 macOS 和 Windows。安装完成后，使用 MiniMax 账号登录即可开始创建任务。

| 平台 | 要求 |
|------|------|
| macOS | macOS 11 Big Sur 及以上 |
| Windows | Windows 10 及以上 |

官方步骤（同一页）：

1. 打开下载页，选择与设备匹配的安装包。**Apple 芯片 Mac 选 arm64，Intel Mac 选 x64。**
2. macOS 打开 `.dmg` 并拖入 Applications；Windows 运行安装程序并按提示完成。
3. 启动 MiniMax Code，使用 MiniMax 账号登录。
4. 后续有新版本时应用会提示更新；也可以在设置中手动检查。

国内版：[agent.minimaxi.com/download](https://agent.minimaxi.com/download)。海外版：[agent.minimax.io/download](https://agent.minimax.io/download)。

官方 Note：「如果 Windows 安装或启动遇到问题，请先确认系统版本、安装路径权限和企业网络代理设置。」

桌面端**没有**官方一键 `curl` 安装命令。不要把下一节的 CLI 脚本拿来装桌面应用。

## 3. 安装 CLI

原文来自 [CLI 快速开始](https://agent.minimaxi.com/docs/cli/quick-start)：

> 安装器会优先复用兼容的 Node.js；本机没有兼容版本时，会在用户目录中安装独立运行时。整个过程不需要 `sudo` 或管理员权限。

::: code-group

```bash [macOS / Linux / WSL]
curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://filecdn.minimax.chat/public/install.ps1 | iex
```

:::

安装完成后，重新打开终端：

```bash
mcode --version
mcode --help
```

官方范围：macOS、Windows、常见 Linux 发行版和 WSL。**暂不支持 Alpine / musl Linux。**

<!-- TODO: 待核实 —— 官方未给出 npm 包名。FAQ 只说安装器可能访问 npm registry，没有 `npm install -g …` 原文。 -->

找不到命令时：先关终端再开，再跑 `mcode --version`。Windows 上已经打开的 VS Code 可能保留旧 `PATH`，需要完整退出 VS Code，而不是只新建终端标签（[CLI FAQ](https://agent.minimaxi.com/docs/cli/faq)）。

更新：`mcode update`，或在 TUI 里 `/update`。

## 4. 登录

### 桌面端

启动后用 MiniMax 账号登录（[下载与安装](https://agent.minimaxi.com/docs/code/get-started/download)）。自备 Key 走设置里的 MiniMax API，见 [Cookbook](./minimax-code-cookbook.md)。

### CLI

使用官方模型或 Token Plan 前先登录（[quick-start](https://agent.minimaxi.com/docs/cli/quick-start)）：

```bash
mcode login
```

Global 账号：

```bash
mcode login --region global
```

登录在浏览器中完成。回到终端后，在 TUI 里跑 `/status` 检查账号、模型与运行状态。自定义 Provider 或 API Key 用 `mcode provider`。

中国大陆账号跑 `mcode login`，Global 账号跑 `mcode login --region global`（[CLI FAQ](https://agent.minimaxi.com/docs/cli/faq)）。登出：`mcode logout`。

WSL / SSH 回调步骤只抄 [CLI FAQ](https://agent.minimaxi.com/docs/cli/faq)，不要在本页展开。回调 URL 含临时凭证，不要发进聊天或仓库。

## 5. 第一次任务：桌面端

来源：[创建第一个任务](https://agent.minimaxi.com/docs/code/get-started/first-task)。

1. 左侧导航点新建任务，或直接在首页输入框开始。
2. 用自然语言说明要完成的事。官方举例：修复 bug、实现页面、整理报告、分析文件。
3. 可以拖入文件、选择工作区、用 `@` 引用项目文件，或用 `/` 调用技能。
4. Agent 开始执行后继续补充要求；需要权限确认时再选。

官方写任务的建议：

- 说明目标结果，而不只是说明过程。
- 对代码任务，说明期望技术栈、限制条件和验收方式。
- 还不确定方案时，先让它进入规划讨论，再决定是否执行。

需要改已有仓库时，先绑工作区。官方：「选择项目目录后，Agent 可以在该目录内读取文件、执行命令、生成产物并汇报变更。」只选与任务相关的目录（[工作区](https://agent.minimaxi.com/docs/code/workflows/workspace)）。

## 6. 第一次任务：CLI

```bash
cd /path/to/your/project
mcode
```

启动时直接提交：

```bash
mcode "检查当前项目中失败的测试，修复后运行相关测试验证"
```

第一次进仓库可以先生成项目指导（官方会写或更新 `AGENTS.md`）：

```bash
mcode init .
```

官方建议任务里同时写期望结果、修改边界和验证方式（[quick-start](https://agent.minimaxi.com/docs/cli/quick-start)）。

继续上次：

```bash
mcode --continue
mcode --session
```

TUI 内用 `/sessions [query]` 搜索和管理。已知 Session ID 时，[CLI FAQ](https://agent.minimaxi.com/docs/cli/faq) 写的是 `mcode --session` 加上该 ID。

<!-- TODO: 待核实 —— quick-start 里两条 `mcode --session` 示例都没有写出 session id；以 FAQ 的「已知 ID」表述为准，不要补造 flag。 -->

入门键位（同一页）：

| 操作 | 用途 |
|------|------|
| `Enter` | 发送；任务运行中再发会进等待队列 |
| `Shift+Enter` | 换行 |
| `@` | 引用工作区文件或目录 |
| `Shift+Tab` | Default 与 Plan Mode 之间切换 |
| `Alt+M` | Ask、Auto、Full access 之间切换 |
| `Esc` | 关面板，或中断正在跑的任务 |

常用 slash：`/help`、`/status`、`/model`、`/sessions`、`/context`、`/compact`、`/new`、`/init`、`/quit`。完整集合以 TUI 里 `/help` 为准。

## 7. Coding 模式还是 Work 模式

只存在于**桌面端**。官方原文：「它们使用同一套 Agent 能力，但界面和工具暴露程度不同。」（[Coding 与 Work 模式](https://agent.minimaxi.com/docs/code/workflows/modes)）

| 场景 | 推荐模式 |
|------|----------|
| 需要读取或修改代码仓库 | Coding |
| 需要打开终端、浏览器或文件面板 | Coding |
| 主要关注结果，不关心实现细节 | Work |
| 任务跨多个步骤但不涉及本地代码 | Work |

Coding 适合：开发新功能、修 bug、跑测试和命令、审查 diff、调试网页或 HTML。Work 适合：文档、研究、表格、内容创作、日常办公自动化。

## 8. 权限：先确认再改机器

桌面端（[权限与安全确认](https://agent.minimaxi.com/docs/code/workflows/permissions)）会在这些操作前确认：

- 读取工作区外的文件
- 修改或删除文件
- 执行命令
- 使用可能产生外部影响的工具
- 处理远程控制或 IM 入口发来的操作

官方建议：第一次用某个项目时保持较保守的授权；熟悉的低风险重复操作可以降低确认频率；对删除、覆盖、上传、发送消息保留人工确认。

CLI 里权限模式与 Plan Mode **不是同一开关**（[CLI FAQ](https://agent.minimaxi.com/docs/cli/faq)）：

- Plan Mode：下一条消息是直接执行还是先规划。`Shift+Tab` 或 `/plan`。
- 权限模式：工具操作如何确认。`Alt+M` 或 `/permission`，档位是 Ask、Auto、Full access。

`mcode exec` 可用 `--permission`，官方列出的值是 `ask`、`smart`、`full` 或 `off`（[features](https://agent.minimaxi.com/docs/cli/features)）。TUI 档名和 exec 档名不要混写成一张表的同一列。

## 9. 接下来做什么

- 复杂任务拆给多个 Agent：[Cookbook · Agent Team](./minimax-code-cookbook.md)
- 脚本 / CI：`mcode exec`
- 编辑器：`mcode acp`（官方给了 Zed 配置）
- 回查命令：[速查表](./minimax-code-cheatsheet.md)
