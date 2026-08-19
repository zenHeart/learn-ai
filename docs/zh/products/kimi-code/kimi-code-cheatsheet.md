---
title: Kimi Code 速查表
description: "只查不学。命令、flag、斜杠、模型 ID 和 Base URL 抄自官方文档。完整集合以 kimi --help 与 moonshotai.github.io/kimi-code 为准。"
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# Kimi Code 速查表

只查不学。CLI 以 [kimi 命令](https://moonshotai.github.io/kimi-code/zh/reference/kimi-command) 和 `kimi --help` 为准。模型 / 会员以 [models](https://www.kimi.com/code/docs/kimi-code/models) 和 [membership](https://www.kimi.com/code/docs/kimi-code/membership) 为准。

覆盖 2026-08-19 打开的官方页。npm `@moonshot-ai/kimi-code` 当日 `latest` 为 `0.37.1`。先跑 `kimi --version` 再对 [changelog](https://moonshotai.github.io/kimi-code/zh/release-notes/changelog)。

## 安装

| 场景 | 命令 |
|------|------|
| macOS / Linux（推荐） | `curl -fsSL https://code.kimi.com/kimi-code/install.sh \| bash` |
| Windows PowerShell | `irm https://code.kimi.com/kimi-code/install.ps1 \| iex` |
| npm（Node **≥ 22.19.0**） | `npm install -g @moonshot-ai/kimi-code` |
| pnpm | `pnpm add -g @moonshot-ai/kimi-code` |
| 看版本 | `kimi --version`（`-V`） |
| 升级 | `kimi upgrade`（别名 `kimi update`） |
| npm 升级 | `npm install -g @moonshot-ai/kimi-code@latest` |
| Homebrew 升级 | `brew upgrade kimi-code`（What's New；Getting Started 无 install 原文） |
| npm 卸载 | `npm uninstall -g @moonshot-ai/kimi-code` |

Windows 先装 Git for Windows；非标准路径设 `KIMI_SHELL_PATH` 为 `bash.exe` 绝对路径。

旧脚本 `https://code.kimi.com/install.sh`（无 `kimi-code/`）和 `uv tool install … kimi-cli` 是 Python 旧线，不要用。

## 主命令 flag

来源：[kimi 命令](https://moonshotai.github.io/kimi-code/zh/reference/kimi-command)

| 选项 | 短 | 说明 |
|------|----|------|
| `--version` | `-V` | 打印版本 |
| `--help` | `-h` | 帮助 |
| `--session [id]` | `-S` | 恢复会话；无 ID 则交互选择。隐藏别名 `-r` / `--resume` |
| `--continue` | `-c` | 继续当前目录最近会话 |
| `--model <model>` | `-m` | 本次模型别名 |
| `--prompt <prompt>` | `-p` | 非交互单次 prompt，无 TUI |
| `--output-format <format>` | | `text` 或 `stream-json`，只能配 `-p` |
| `--yolo` | `-y` | 自动批准普通工具。隐藏别名 `--yes`、`--auto-approve` |
| `--auto` | | auto 权限，不再提问 |
| `--plan` | | 以 Plan 模式开新会话 |
| `--skills-dir <dir>` | | 替换自动发现的 Skills 目录，可重复 |
| `--agent <name>` | | 指定 main agent（不可与 `--session`/`--continue` 同用） |
| `--agent-file <path>` | | 从 Markdown 加载 Agent |
| `--add-dir <dir>` | | 追加工作目录，可重复 |

互斥：`--continue` × `--session`；`--yolo` × `--auto`；`-p` 不能配 `--yolo` / `--auto` / `--plan`。`-p` 固定 `auto` 权限。

## 子命令

| 命令 | 作用 |
|------|------|
| `kimi` | 无参数：当前目录新 TUI 会话 |
| `kimi login` | 非交互 OAuth device-code |
| `kimi acp` | ACP stdio，给 IDE |
| `kimi web` | 前台 REST/WS + web UI。默认端口 `58627` |
| `kimi doctor` | 校验 `config.toml` / `tui.toml` |
| `kimi export [sessionId]` | 打包会话 ZIP |
| `kimi migrate` | 从旧 `kimi-cli` 迁数据 |
| `kimi upgrade` | 检查并安装更新 |
| `kimi vis [sessionId]` | 浏览器里可视化会话 |
| `kimi provider …` | 非交互管理供应商 |

`kimi server …` 已废弃（退出码 1），改用 `kimi web`。例外：`kimi server kill` 只停 0.28.0 之前的后台服务。

## 斜杠命令（入门子集）

全集：[slash-commands](https://moonshotai.github.io/kimi-code/zh/reference/slash-commands)

| 命令 | 别名 | 作用 |
|------|------|------|
| `/login` | | OAuth 或 Platform Key |
| `/logout` | | 清当前凭证 |
| `/model` | | 切换模型 |
| `/provider` | | 供应商管理器 |
| `/new` | `/clear` | 新会话 |
| `/sessions` | `/resume` | 恢复历史 |
| `/fork` | | 派生副本 |
| `/compact [指令]` | | 压缩上下文 |
| `/init` | | 生成 `AGENTS.md` |
| `/usage` | | 用量 / 配额 |
| `/status` | | 运行时状态 |
| `/yolo [on\|off]` | `/yes` | YOLO |
| `/auto [on\|off]` | | Auto |
| `/plan [on\|off]` | | Plan |
| `/goal …` | | 目标模式 |
| `/swarm <task>` | | 多 Agent 并行 |
| `/btw [问题]` | | 旁路 subagent |
| `/mcp` | | MCP 状态 |
| `/mcp-config` | | 配置 MCP（内置 Skill） |
| `/help` | `/h` `/?` | 帮助 |
| `/exit` | `/quit` `/q` | 退出 |

## 键盘

| 键 | 作用 |
|----|------|
| `Enter` | 发送 |
| `Shift-Enter` / `Ctrl-J` | 换行 |
| `Esc` | 中断 / 关弹窗 |
| `Ctrl-C` | 中断；空闲连按两次退出 |
| `Ctrl-D` | 输入框为空时退出 |
| `Shift-Tab` | 切 Plan |
| `Ctrl-S` | 流式中插话 |
| `Ctrl-O` | 折叠工具输出 |
| `Ctrl-G` | 外部编辑器 |
| `!`（空输入框） | Shell 模式 |
| `@` | 文件引用 |
| `/` | 斜杠命令 |

粘贴媒体：macOS/Linux `Ctrl-V`，Windows `Alt-V`。

## VS Code 扩展

| 项 | 值 |
|----|-----|
| Marketplace | [moonshot-ai.kimi-code](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code) |
| 搜 | `Kimi Code`，发布者 `moonshot-ai` |
| 资格 | 产品文档：新装仅旧版 Python CLI 用户 |
| VS Code 版本（Marketplace） | `>= 1.100.0` |
| 聚焦输入 | `Ctrl+Shift+K` / `Cmd+Shift+K` |
| 插入当前文件 | `Alt+K` |
| 新对话 | `Ctrl+N` / `Cmd+N`（需 `kimi.enableNewConversationShortcut`） |

## 模型 ID

来源：[模型配置](https://www.kimi.com/code/docs/kimi-code/models)（3 个 ID）

| Model ID | 模型 | 上下文 | 档位 |
|----------|------|--------|------|
| `k3` | Kimi K3 | Moderato 256k；Allegretto+ 最高 1M | Moderato+（Andante 暂不支持） |
| `kimi-for-coding` | K2.7 Code | 256k | 全部会员 |
| `kimi-for-coding-highspeed` | 同上，高速 | 256k | Allegretto+ |

高速版填错会静默落到标准版。越权 → `401`。第三方用满 1M 时把上下文窗口写成 `1048576`。

## API

| | Kimi Code | 开放平台 |
|--|-----------|----------|
| OpenAI Base URL | `https://api.kimi.com/coding/v1` | `https://api.moonshot.cn/v1` |
| Anthropic Base URL | `https://api.kimi.com/coding/` | — |
| 计费 | 会员 + 频控 | 按量 |
| 建 Key | [控制台](https://www.kimi.com/code/console)（最多 5 个，只显示一次） | 开放平台控制台 |

Key 不通用。不要改 User-Agent。

## 路径与环境变量

| 键 / 路径 | 作用 |
|-----------|------|
| `~/.kimi-code/` | 现行数据根 |
| `~/.kimi-code/config.toml` | Agent / 权限 / provider |
| `~/.kimi-code/tui.toml` | 主题、编辑器、通知、自动更新 |
| `~/.kimi/` | **旧** Python CLI，不要手混 |
| `KIMI_CODE_HOME` | 覆盖数据根 |
| `KIMI_SHELL_PATH` | Windows 上 `bash.exe` |
| `KIMI_DISABLE_TELEMETRY=1` | 关匿名遥测（也接受 `true`/`yes`/`y`） |

`KIMI_API_KEY` **不**从 shell 读取。

## 权限模式对照

| 模式 | CLI | TUI | 行为 |
|------|-----|-----|------|
| 默认 manual | （不加 flag） | | 写文件 / Shell 先问 |
| Plan | `--plan` | `Shift-Tab` `/plan` | 先方案；退出仍要批（YOLO 也跳不过） |
| YOLO | `--yolo` `-y` | `/yolo` | 普通工具自动批 |
| Auto | `--auto` | `/auto` | 全自动且不问用户 |
| `-p` | 固定 auto | — | 不能再叠 yolo/auto/plan |

## 高质量信息源

- **[Kimi Code 产品页](https://www.kimi.com/code)** — 落地页与现行 curl 安装栏
  - 最后核实：2026-08-19
- **[产品文档总览](https://www.kimi.com/code/docs/)** — 会员权益、VS Code、API、模型入口
  - 最后核实：2026-08-19
- **[CLI 文档站（中）](https://moonshotai.github.io/kimi-code/zh/)** / **[EN](https://moonshotai.github.io/kimi-code/en/)** — Guides + Reference
  - 最后核实：2026-08-19
- **[模型配置](https://www.kimi.com/code/docs/kimi-code/models)** — 3 个 Model ID 与档位
  - 最后核实：2026-08-19
- **[会员权益](https://www.kimi.com/code/docs/kimi-code/membership)** — 7 天 / 5 小时、加油包
  - 最后核实：2026-08-19
- **[What's New](https://www.kimi.com/code/docs/kimi-code/whats-new)** — CLI 重写对照、功能发布
  - 最后核实：2026-08-19
- **[产品对照](https://www.kimi.com/zh-hans/help/others/product-comparison)** — Kimi / Work / Code / Claw
  - 最后核实：2026-08-19
- **[GitHub MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code)** — README、源码、Issues
  - 最后核实：2026-08-19
- **[npm @moonshot-ai/kimi-code](https://www.npmjs.com/package/@moonshot-ai/kimi-code)** — 版本与 `engines`
  - 最后核实：2026-08-19
- **[VS Marketplace moonshot-ai.kimi-code](https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code)** — 扩展实现说明
  - 最后核实：2026-08-19
- **[控制台](https://www.kimi.com/code/console)** — Key 与额度
  - 最后核实：2026-08-19
- **[开放平台](https://platform.moonshot.cn/)** — 按量 API，不是 Code 会员池
  - 最后核实：2026-08-19

### 待核实

- 产品总览是否仍展示第四个模型 ID `k3-256k`（2026-08-19 与 models 页不一致）
- `brew install` 的官方原文（目前只有 `brew upgrade kimi-code`）
- Kimi Claw 独立落地 URL（对照页有产品名，无单独域名）
