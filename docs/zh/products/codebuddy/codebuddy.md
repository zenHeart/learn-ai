---
title: CodeBuddy 上手
description: "按官方步骤把 CodeBuddy IDE、插件或 CLI 装上并完成第一次登录。命令和安装原文抄自 codebuddy.cn 文档站，不自行改写。"
domain: product
tags:
  - coding-agent
role: tutorial
---

# CodeBuddy 上手

> 这是一份**教程**——按顺序读完，你会在一种形态里完成：下载或安装 → 登录 → 第一次对话。
>
> 查命令去 [Cheatsheet](./codebuddy-cheatsheet)；抄场景去 [Cookbook](./codebuddy-cookbook)；撞名去 [术语表](./codebuddy-glossary)。

本指南目标：把 CodeBuddy 从「听说腾讯也有个编码助手」变成「你知道该开 IDE、装插件，还是跑 `codebuddy`」。

## 第 0 步：先选形态

官方三种编程形态不是同一张皮。对照来自 [产品概述](https://cloud.tencent.com/document/product/1831/134343)：

| 你现在的环境 | 选 |
|-------------|----|
| 已经在用 VS Code / JetBrains / Visual Studio | **插件** |
| 要从一句话需求做到原型、设计稿、可部署应用 | **IDE** |
| 人在终端，或要无头 / CI / 批量改仓库 | **CLI（CodeBuddy Code）** |

三种形态共享同一账号额度（[故障排查](https://www.codebuddy.cn/docs/cli/troubleshooting)）。先装一种就能用。

定价页是前端渲染，本站不抄未核过的套餐数字。看 [codebuddy.cn/pricing](https://www.codebuddy.cn/pricing/)。页面描述有「限时免费个人版、限时免费企业旗舰版以及企业专享版」。

## 安装 IDE

来源：[安装和登录](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation)。

**环境要求**（官方表）：

| 操作系统 | 支持版本 |
|----------|----------|
| macOS | macOS 11 (Big Sur) 及以上 |
| Windows | Windows 10 及以上（不支持 Windows 7/8/8.1） |

官方提示：不满足上述要求的系统将无法启动 CodeBuddy IDE。

**下载**：访问 [CodeBuddy CN 官网](https://www.codebuddy.cn/) 或 [IDE 落地页](https://www.codebuddy.cn/ide/)，按处理器选择对应版本。国内版下载入口官方还写了 [copilot.tencent.com/ide](https://copilot.tencent.com/ide)；国际版 [codebuddy.ai](https://www.codebuddy.ai/)。

**macOS 安装**：把安装包拖到 Applications。

**Windows 安装**（官方步骤）：

1. 双击安装包。若提示只为当前用户安装，选**确定**。
2. 选择**我同意此协议**。
3. 选择安装位置，一直**下一步**。

**个人版登录**（官方）：打开 IDE → **登录** → 选择个人微信或手机号登录 → 回到 IDE。

企业版 / 专享版登录走「腾讯统一身份」或企业管理员下发的入口，见官方同一页。本教程不展开企业购买。

更新：点右上角**账户** → **检查更新** → 有新版本时点**立即安装**。

## 安装 插件

来源：[插件文档首页](https://www.codebuddy.cn/docs/plugin/)。

**官方最低版本**（文档总览与插件页；Visual Studio 一行插件页写 17.6，总览写 17.0，以插件页为准）：

| IDE | 最低版本要求 |
|-----|----------------|
| Visual Studio Code | 1.82 |
| Visual Studio | 17.6（VS 2022） |
| IntelliJ IDEA / PyCharm / GoLand / CLion / PhpStorm | 2022.2 |
| Android Studio | Flamingo \| 2022.2.1 |
| 微信开发者工具 IDE | 1.06.2409140 |

官方注意：其它 JetBrains IDE 看 JetBrains 插件市场；另有可低至 2020.3 的兼容包，但「无法体验最新的产品功能」。

**VS Code**（官方三种装法）：

1. 安装 VS Code 1.82+。
2. 装插件，任选其一：
   - 官方「一键安装」跳转（需本机已正确安装 VS Code）
   - 在插件市场搜索 **腾讯云代码助手**
   - 下载安装包，在 VS Code 里手动安装

**JetBrains**：设置 → **插件** → 搜索 **腾讯云代码助手** → **安装**；或「从磁盘安装插件」。

**登录**：官方 [登陆及退出](https://www.codebuddy.cn/docs/plugin/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/%E7%99%BB%E5%BD%95%E5%8F%8A%E9%80%80%E5%87%BA) 写：单击底部 icon 或登录页触发登录。

插件能力（[产品概述](https://cloud.tencent.com/document/product/1831/134343)）：行内补全、错误修复、解释、单测、本地评审、`@workspace` / `#Codebase`、技术对话、自定义指令、RAG 知识库、混元 / DeepSeek 等模型切换。

第一次建议：打开一个你熟悉的文件，用补全写下一行；再用对话问「这个文件做什么」。工程级问题用官方提供的 `@workspace` 或 `#Codebase`，不要假设它已经记住整个公司的所有仓库。

## 安装 CLI

产品名是 **CodeBuddy Code**，命令是 `codebuddy`，npm 包是 `@tencent-ai/codebuddy-code`。

来源：[CodeBuddy Code 安装指南](https://www.codebuddy.cn/docs/cli/installation)、[快速入门](https://www.codebuddy.cn/docs/cli/quickstart)。

### 包管理器（推荐先走这条）

**前置要求（安装页原文）：** Node.js **18.20** 或更高版本。

故障排查页同样写「需要 Node.js v18.20 或更高版本」。文档总览 CLI 节写过 `Node.js 18.0+`；腾讯云国际站产品 FAQ 写过 Node.js 22+。本页以安装指南为准。

官方给出的包管理器命令：

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

**Homebrew（macOS/Linux，无需 Node.js）**，安装页原文：

```bash
brew tap Tencent-CodeBuddy/tap
brew install codebuddy-code
```

或：

```bash
brew install Tencent-CodeBuddy/tap/codebuddy-code
```

验证（安装页原文）：

```bash
codebuddy --version
```

### 原生二进制（Beta）

安装页原文：原生二进制「目前处于 Beta 测试阶段」。支持 macOS（Apple Silicon 或 Intel x86_64）、Linux（arm64 或 x86_64）、Windows（x86_64）。

从 npm 迁移：

```bash
codebuddy install
```

全新安装（**安装页**）：

```bash
curl -fsSL https://www.codebuddy.cn/cli/install.sh | bash
```

```powershell
irm https://www.codebuddy.cn/cli/install.ps1 | iex
```

[快速入门](https://www.codebuddy.cn/docs/cli/quickstart) 写的是另一对官方 URL：

```bash
curl -fsSL https://copilot.tencent.com/cli/install.sh | bash
```

```powershell
irm https://copilot.tencent.com/cli/install.ps1 | iex
```

两页都是官方。不要合成一条。优先跟你正在读的那一页走。

命令找不到时，安装页要求把路径加入 `PATH`：

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Windows：`%USERPROFILE%\AppData\Local\codebuddy\bin`。

Windows 平台故障排查还要求安装 **Git Bash**（[troubleshooting](https://www.codebuddy.cn/docs/cli/troubleshooting)）。

更新：

```bash
codebuddy update
```

或再跑一遍对应的包管理器安装命令。关闭自动更新：`export DISABLE_AUTOUPDATER=1`。

配置目录默认 `~/.codebuddy`（Windows `%USERPROFILE%\.codebuddy`），可用 `CODEBUDDY_CONFIG_DIR` 改位置。安装页写：与其它使用 CodeBuddy 引擎的应用（如 WorkBuddy）共存时，用这个变量避免配置冲突。

## 登录 CLI

来源：[快速入门 · 登录认证](https://www.codebuddy.cn/docs/cli/quickstart)。

启动后选择：

```
Select login method:
› Log in via Chinese Site
  Log in via International Site
  Log in via Enterprise Domain
  Log in via iOA (Tencent only)
```

| 登录方式 | 适用场景 | 说明 |
|----------|----------|------|
| **Chinese Site** | 国内用户 | 通过腾讯云国内站 (copilot.tencent.com) 认证 |
| **International Site** | 海外用户 | 通过腾讯云国际站 (codebuddy.ai) 认证 |
| **Enterprise Domain** | 专享版 / 私有化 | 需要企业提供的服务地址 |
| **iOA** | 腾讯内部员工 | 仅限腾讯内部 |

`↑↓` 选择，`Enter` 后打开浏览器完成认证。

## 第一次跑 CLI

```bash
cd /path/to/your/project
codebuddy
```

官方强烈建议先：

```
> /init
```

[快速入门](https://www.codebuddy.cn/docs/cli/quickstart) 把 `/init` 写成「强烈推荐」：预先构建项目知识图谱，后续少重复扫描。项目结构大变时：`/clear` 再 `/init`。

然后可以问：

```
> 帮我分析这个项目的结构
```

语言：启动后 `/config` 可设 Language。

单次命令（官方示例）：

```bash
codebuddy -p "优化这个 SQL 查询的性能"
```

需要碰文件或跑命令时，官方要求带 `-y` 或 `--dangerously-skip-permissions`：

```bash
codebuddy -p "审查 src/utils.js 的代码质量" -y
```

权限模式用 `Shift+Tab` 切换（Windows 也支持 `Alt+M`）：官方快速开始写的顺序是 `default → bypass → accept → plan`。`--permission-mode` 的合法值见 [CLI 参考](https://www.codebuddy.cn/docs/cli/cli-reference)：`default`、`acceptEdits`、`auto`、`dontAsk`、`plan`、`bypassPermissions`。键位缩写和 flag 全名不要混着用错。

完整命令表见 [Cheatsheet](./codebuddy-cheatsheet)。

## 第 4 步：把重复约定写下来

CLI 故障排查把 `CLAUDE.md` → `CODEBUDDY.md` 列为可迁移的「AI 指令和记忆文档」。用户级文件在 `~/.codebuddy/CODEBUDDY.md`。项目级约定放哪、官方是否保证自动读取仓库根的 `CODEBUDDY.md`，以你本机 `/config` 和官方「记忆」页为准，不要猜路径。

从 Claude Code 迁过来的推荐做法（官方「方案一：符号链接」）见 [Cookbook](./codebuddy-cookbook#从-claude-code-迁移)。

## 护栏

- **安装命令只抄官方页**。npm 包名是 `@tencent-ai/codebuddy-code`，不是猜出来的 `@tencent/codebuddy`。
- **原生安装有两套官方 URL**（`codebuddy.cn/cli` 与 `copilot.tencent.com/cli`）。不要自行发明第三套。
- **`-p` 不是「自动允许一切」的同义词**。碰文件 / 跑命令必须另有权限策略（`-y`、`--permission-mode` 等）。
- **不要把 WorkBuddy、元宝、混元当成本教程的下一步**。它们在 [地图](./) 各占一行。
- **不要对官网「提升编码效率 90%」这类句子做二次发挥**。

## 下一步

- 场景配方：[Cookbook](./codebuddy-cookbook)
- 命令与键位：[Cheatsheet](./codebuddy-cheatsheet)
- 概念：[术语表](./codebuddy-glossary)
- 官方 CLI 进阶：[常见工作流](https://www.codebuddy.cn/docs/cli/)（文档树「入门指南」）
