---
title: Kimi Code 教程
description: "从官方安装脚本装上 Kimi Code CLI，完成 /login，跑完第一次对话；再决定 VS Code 扩展、ACP 或第三方 API。旧版 Python kimi-cli 只在附录迁移。"
domain: product
tags:
  - coding-agent
role: tutorial
---

# Kimi Code 教程

> 本页带你把 **Kimi Code** 装上并能改代码。命令与包名抄自 [产品文档 · 开始使用](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) 和 [MoonshotAI/kimi-code README](https://github.com/MoonshotAI/kimi-code)。参数全集见 [速查表](./kimi-code-cheatsheet.md)。家族边界见 [学习地图](./index.md)。

## 目标与非目标

**目标**

- 用官方脚本或 npm 装上可执行文件 `kimi`
- 用 `/login` 接到 Kimi Code 会员或开放平台 Key
- 完成一次只读摸底和一次带确认的小改动
- 知道 VS Code 扩展、`kimi acp`、第三方 API 各自怎么进

**非目标**

- 不写 Kimi 对话 / Work / Claw 教程
- 不把旧版 Python `kimi-cli` 当主安装路径
- 不编套餐价格、不编「应该能装上 VS Code 扩展」

## 先决条件

官方 [开始使用](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started) 与 [帮助中心](https://www.kimi.ai/zh-hans/help/kimi-code/cli-getting-started)：

- 操作系统：macOS、Linux，或 Windows（PowerShell）
- 账号：有效的 **Kimi 会员订阅**，或可调用的 API Key
- TUI 推荐真彩色 + 连字终端（官方举例 Kitty、Ghostty）
- Windows：**先装 [Git for Windows](https://gitforwindows.org/)**。CLI 用其中的 Git Bash 当 Shell；若 Git Bash 不在默认路径，把 `KIMI_SHELL_PATH` 设成 `bash.exe` 的绝对路径
- npm 通道额外要求：**Node.js 22.19.0 或更高**

## 1. 安装 CLI

官方提供两种方式。**推荐安装脚本**（无需预装 Node.js）。

::: code-group

```bash [macOS / Linux]
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://code.kimi.com/kimi-code/install.ps1 | iex
```

```bash [npm]
node --version
npm install -g @moonshot-ai/kimi-code
```

```bash [pnpm]
pnpm add -g @moonshot-ai/kimi-code
```

:::

来源：[开始使用](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started)、[仓库 README](https://github.com/MoonshotAI/kimi-code)。脚本会下载最新版、校验 checksum，并把 `kimi` 放进 `PATH`。

验证：

```bash
kimi --version
```

找不到命令：重开终端，或 `source ~/.bashrc` / `source ~/.zshrc`。帮助中心补充：再查 `~/.local/bin` 是否在 `PATH` 里。

macOS 首次启动可能被 Gatekeeper 拖慢。帮助中心原文：把终端 App 加到 **系统设置 → 隐私与安全性 → 开发者工具**。

**升级**：`kimi upgrade`（别名 `kimi update`），选 `Install update now`；或 `npm install -g @moonshot-ai/kimi-code@latest`。What's New 还写过 Homebrew 用户用 `brew upgrade kimi-code`。Getting Started **没有** `brew install` 原文，本页不补。

**卸载**：脚本安装则删除 `kimi` 可执行文件；npm 则 `npm uninstall -g @moonshot-ai/kimi-code`。

> **不要抄旧脚本。** 帮助中心个别旧页仍写 `curl -LsSf https://code.kimi.com/install.sh | bash` 或 `uv tool install --python 3.13 kimi-cli`。那是 Python `kimi-cli`。现行官方路径带 `/kimi-code/`，包名是 `@moonshot-ai/kimi-code`。

## 2. 登录

进入项目目录启动 TUI：

```bash
cd your-project
kimi
```

第一次在输入框执行：

```text
/login
```

平台选择器支持两种方式（[开始使用](https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started)）：

| 选项 | 官方说明 |
|------|----------|
| **Kimi Code（OAuth）** | 验证码流程：任意设备打开链接、登录、输入验证码 |
| **Kimi Platform API 密钥** | 填 `platform.kimi.com` 或 `platform.kimi.ai` 的 Key |

无 TUI 时可用非交互：`kimi login`（RFC 8628 device-code，验证地址和用户码打到 stderr）。

退出：`/logout`。

其他供应商（Anthropic / OpenAI / Google 等）要**直接编辑** `~/.kimi-code/config.toml`，见 [平台与模型](https://moonshotai.github.io/kimi-code/zh/configuration/providers.md)。

> **`export KIMI_API_KEY=…` 不会生效。** [环境变量](https://moonshotai.github.io/kimi-code/zh/configuration/env-vars) 原文：`KIMI_API_KEY`、`ANTHROPIC_API_KEY`、`OPENAI_API_KEY` **不会**从 shell 自动读取，必须写进 `config.toml` 的 `[providers.<name>]` 或 `[providers.<name>.env]`。例外是 `KIMI_MODEL_*` 临时通道。

## 3. 第一次对话

官方建议先让它摸清仓库：

```text
帮我看一下这个项目的目录结构，简单介绍一下每个目录是做什么的
```

只读工具默认自动跑。改文件或跑 Shell **默认先问你**。

再试一个具体任务（官方原文示例）：

```text
在 src/utils 里新增一个函数，用来把任意字符串转成 kebab-case，并补一个单元测试
```

项目规则：在仓库里跑 `/init`，生成 `AGENTS.md`（帮助中心：[cli-getting-started](https://www.kimi.ai/zh-hans/help/kimi-code/cli-getting-started)）。

单次、不进 TUI：

```bash
kimi -p "帮我看一下这个项目的目录结构"
```

继续**当前目录最近一次**会话：

```bash
kimi -c
```

这是 `--continue` 的短选项，来自 [kimi 命令](https://moonshotai.github.io/kimi-code/zh/reference/kimi-command) 和 Getting Started。帮助中心有的页面写成 `-C`，以 CLI 参考为准。

退出 TUI：`/exit`，或空闲时连按两次 `Ctrl-C`，或输入框为空时 `Ctrl-D`。

## 4. 交互、审批与三种权限模式

来源：[交互与输入](https://moonshotai.github.io/kimi-code/zh/guides/interaction)。

| 操作 | 做法 |
|------|------|
| 发送 | `Enter` |
| 换行 | `Shift-Enter` 或 `Ctrl-J` |
| 引用文件 | `@` 路径补全 |
| 斜杠命令 | `/` |
| 粘贴图片 / 视频 | macOS / Linux `Ctrl-V`；Windows `Alt-V` |
| 流式中插话 | `Ctrl-S` |
| 中断 | `Esc` 或 `Ctrl-C` |
| 折叠工具输出 | `Ctrl-O` |
| 外部编辑器 | `Ctrl-G` |
| 切 Plan | `Shift-Tab` 或 `/plan` |
| 进 Shell 模式 | 空输入框键入 `!` |

三种模式不要混：

| 模式 | 怎么开 | 官方行为 |
|------|--------|----------|
| **Plan** | `Shift-Tab` / `/plan` / `kimi --plan` | 先出方案，你批准才改文件。退出 Plan 仍要确认；**YOLO 也跳不过** |
| **YOLO** | `/yolo` / `kimi --yolo` | 自动批准普通工具（含写文件、Shell）。敏感文件（如 `.env`、SSH 私钥）和退出 Plan 仍会问 |
| **Auto** | `/auto` / `kimi --auto` | 所有审批自动处理，**Agent 不再向你提问** |

`-p` 非交互固定走 `auto` 权限，不能和 `--yolo` / `--auto` / `--plan` 一起用。

## 5. 常用斜杠命令

入门够用的一组，来自 Getting Started。全集在 [斜杠命令](https://moonshotai.github.io/kimi-code/zh/reference/slash-commands) 和 [速查表](./kimi-code-cheatsheet.md)。

| 命令 | 作用 |
|------|------|
| `/help` | 命令与快捷键面板 |
| `/login` / `/logout` | 登录 / 清凭证 |
| `/model` | 切换模型 |
| `/new` | 新会话 |
| `/sessions` | 恢复历史会话 |
| `/compact` | 压缩上下文 |
| `/fork` | 派生一份独立副本（你仍留在当前会话） |
| `/init` | 生成 `AGENTS.md` |
| `/usage` | 用量与配额 |
| `/yolo` `/auto` `/plan` | 权限 / 计划模式 |
| `/goal` | 跨轮次推进一个持久目标 |
| `/mcp-config` | 对话式配置 MCP |

## 6. Kimi Code for VS Code

官方页：[快速开始](https://www.kimi.com/code/docs/kimi-code-for-vscode/getting-started)。扩展市场：[moonshot-ai.kimi-code](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code)。

### 先读这句资格声明

产品文档横幅原文：

> Kimi Code for VS Code 目前仅对旧版 Python CLI 用户开放新增安装。已安装插件的老用户升级新版 CLI 后仍可继续使用，其他 TS 版本 CLI 用户暂不支持安装。

帮助中心同一句话。**新装了现行 Node CLI 的人，不要默认扩展市场一点就能用。** 编辑器需求优先走下面的 `kimi acp`，或在 VS Code 集成终端里跑 `kimi`。

Marketplace 页（2026-08-19 看到 0.7.0）另有一套更新的实现说明，和上面横幅**同时存在**：

- 需要 VS Code **1.100.0** 或更高
- 扩展在 Extension Host 里跑 **Kimi Code Node SDK**
- 与终端 App 解析到同一 `KIMI_CODE_HOME` 时，共享 `config.toml`、MCP、登录态和会话
- **不要**同时在扩展和终端打开同一个 session（跨进程锁不保证）

两份官方页打架时，**安装资格跟产品文档横幅**；共享 home / 版本要求跟 Marketplace。不要猜哪边已经作废。

### 安装与登录（官方步骤）

1. 前提：Kimi 账号订阅或 API Key
2. 在 VS Code Marketplace 搜 **Kimi Code**，认准发布者 **moonshot-ai**
3. 看不到扩展：重启，或命令面板执行 `Developer: Reload Window`（macOS `Cmd+Shift+P`，Windows/Linux `Ctrl+Shift+P`）
4. 点活动栏 Kimi 图标
5. 认证（齿轮可切换）：
   - **Kimi 账号模式**：浏览器授权
   - **API Key 模式**：已有 Key 可跳过登录

### 典型工作流

官方四个配方：

| 场景 | 做法 |
|------|------|
| 代码解读 | `@` 选文件 / 文件夹，问流程，再追问 |
| 重构 | 如 `@src/feature/`，看 diff，选择性批准，必要时回退 |
| 调试 | 粘贴报错或堆栈，引用相关文件，批准修复 |
| 项目概览 | 如 `@src/services/`，要模块图或架构摘要 |

### 快捷键

来自产品文档（比帮助中心多一条设置说明）：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+K` / `Cmd+Shift+K` | 聚焦 Kimi 输入框 |
| `Alt+K` | 插入当前文件引用 |
| `Ctrl+N` / `Cmd+N` | 新建对话（需打开 `kimi.enableNewConversationShortcut`；占用系统默认「新建文件」） |
| `↑` / `↓` | 浏览输入历史 |

命令面板搜 `Kimi Code` 可在新标签页 / 侧边栏打开、管理会话。

## 7. 在其他 IDE 里用 ACP

官方没有第一方 JetBrains / Zed 插件。CLI 暴露 `kimi acp`，IDE 用子进程 + JSON-RPC。先在终端完成 `/login`。macOS 从 GUI 拉起的子进程常常**没有**你的 shell `PATH`，`command` 要用 `which kimi` 的绝对路径。

Zed，写入 `~/.config/zed/settings.json`（[在 IDE 中使用](https://moonshotai.github.io/kimi-code/zh/guides/ides)）：

```json
{
  "agent_servers": {
    "Kimi Code CLI": {
      "type": "custom",
      "command": "kimi",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

JetBrains（IntelliJ / PyCharm / WebStorm 等）在 AI 聊天里配 ACP，`command` **必须绝对路径**。Paseo 选内置 provider 或在 `~/.paseo/config.json` 写 `["kimi", "acp"]`。

自检：终端跑 `kimi acp`。若阻塞等 stdin，CLI 正常，问题在 IDE 配置；立刻报错多半是没登录。

## 8. 把 Kimi Code 接到第三方工具

产品总览：会员可在 [控制台](https://www.kimi.com/code/console) 建最多 **5** 个 API Key（**只在创建时显示一次**）。

| 协议 | Base URL | 常用 Endpoint |
|------|----------|----------------|
| OpenAI 兼容 | `https://api.kimi.com/coding/v1` | `https://api.kimi.com/coding/v1/chat/completions` |
| Anthropic 兼容 | `https://api.kimi.com/coding/` | `https://api.kimi.com/coding/v1/messages` |

有的工具只要 Base URL（如 Claude Code），有的要完整 Endpoint（总览举例 Trae）。

官方点名的接入面：Claude Code、OpenCode、Codex、Roo Code，以及 OpenClaw、Hermes 等通用框架（[membership-guide](https://www.kimi.com/zh-cn/help/kimi-code/membership-guide)）。逐步配置跟各工具自己的文档，本页不编环境变量名。

> 总览原文：「使用时请保持工具的真实身份标识，篡改客户端标识（User-Agent）将被视为违规，可能导致会员权益暂停。」

这和开放平台不是一回事：

| | Kimi Code 平台 | Kimi 开放平台 |
|--|----------------|---------------|
| Base URL | 上表 | `https://api.moonshot.cn/v1` |
| 计费 | 会员订阅，有频控 | 按量充值 |
| 场景 | 终端 / IDE Agent | 产品集成、企业调用 |

Key **不能**混用。

## 9. 模型怎么选

以 2026-08-19 的 [模型配置](https://www.kimi.com/code/docs/kimi-code/models) 为准。该页写「共 **3** 个模型 ID」。

| Model ID | 对应模型 | 上下文 | 谁能用 |
|----------|----------|--------|--------|
| `k3` | Kimi K3 | Moderato 最高 256k；Allegretto 及以上最高 1M | Moderato 及以上。Andante：暂不支持 |
| `kimi-for-coding` | Kimi K2.7 Code | 256k | 所有会员 |
| `kimi-for-coding-highspeed` | 同一 K2.7 Code 的高速版 | 256k | Allegretto 及以上 |

官方：高速版编码能力与标准版一致；产品文档写输出约 **5–6 倍**、额度约 **3 倍**；models 页表格写「6 倍速 3 倍消耗」。填错高速版 ID **不报错**，会兜底到 `kimi-for-coding`。权限不够返回 **401**。

CLI 里 `/model` 切换。VS Code 在输入栏下拉选；没有目标模型就重启或重装扩展。切模型会使缓存失效，官方建议**新开 session**。

<!-- TODO: 待核实 —— 2026-08-19 产品总览一度列出第四个 ID `k3-256k`；同日 models 页只列 3 个。本页跟 models。 -->

## 10. 数据在哪、额度怎么查

- 默认数据根：`~/.kimi-code/`（配置、会话、日志、更新缓存）
- 搬家：环境变量 `KIMI_CODE_HOME`
- 不要手改 `sessions/` 下的文件
- 查用量：TUI `/usage`；网页 **设置 → 订阅和发票 → 我的额度**；控制台在开启加油包后也可看

额度规则只抄 [会员权益](https://www.kimi.com/code/docs/kimi-code/membership)：7 天刷新、5 小时滚动窗口、设备 / API Key 共享配额、30 天不活跃设备解绑、月额度打满会冻 Code。新会员体系即将把 Code 与 Kimi 会员拆开——档位数字去官方会员页，这里不写死。

## 常见陷阱

1. **抄了旧安装 URL 或旧包名。** 现行是 `code.kimi.com/kimi-code/install.sh` 和 `@moonshot-ai/kimi-code`。
2. **`export KIMI_API_KEY` 当登录。** 必须写进 `config.toml` 或走 `/login`。
3. **Coding Key 拿去打 `api.moonshot.cn`，或反过来。** 两套账号。
4. **YOLO 和 Auto 当成一回事。** Auto 连提问都关；YOLO 仍会问敏感文件和退出 Plan。
5. **新 Node CLI 用户默认 VS Code 扩展可用。** 产品文档说新装只对旧 Python CLI 用户开放。
6. **IDE 里 `kimi: command not found`。** GUI 子进程没有 PATH，填绝对路径。
7. **Windows 没装 Git for Windows。** 官方要求用 Git Bash；What's New：缺 Git Bash 时启动前就会报错。
8. **继续会话写成帮助中心的 `-C`。** CLI 参考是 `-c` / `--continue`。

## 附录：从 Python kimi-cli 迁移

旧版将不再维护。不要把它当主 Tutorial。

[What's New](https://www.kimi.com/code/docs/kimi-code/whats-new) 对照：

| 对比项 | 旧版 kimi-cli | 新版 Kimi Code CLI |
|--------|---------------|---------------------|
| 运行时 | Python + uv | Node.js |
| 安装 | `uv tool install` | 本页第 1 节的 curl / npm |
| 配置 | `~/.kimi/config.toml` | `~/.kimi-code/config.toml`（**格式不兼容**） |
| 界面 | 基础文本 | 全功能 TUI |
| 子 Agent | 不支持 | 内置 `coder` / `explore` / `plan` |

[迁移指南](https://www.kimi.com/code/docs/kimi-code-cli/guides/migration)：

1. 按本页装好新版。
2. 第一次跑 `kimi` 时，若检测到 `~/.kimi/`，会弹出迁移提示。
3. 随时可手动：`kimi migrate`。
4. 可选 **Config only** 或 **Config + N sessions**。

会迁移：`config.toml`、MCP 配置、输入历史、你勾选的会话。

**不会**迁移：OAuth 凭证、MCP 授权、旧版插件。迁完重新 `/login` 并重授 MCP。

迁移**不删** `~/.kimi/`。可重复跑，已导入会话带 `[imported]`。

## 下一步

- 参数、模型、Base URL → [速查表](./kimi-code-cheatsheet.md)
- 官方场景配方 → [常见使用案例](https://moonshotai.github.io/kimi-code/zh/guides/use-cases)
- Skills / MCP / Hooks → [定制化](https://moonshotai.github.io/kimi-code/zh/customization/mcp)
- 问题反馈 → [GitHub Issues](https://github.com/MoonshotAI/kimi-code/issues)
