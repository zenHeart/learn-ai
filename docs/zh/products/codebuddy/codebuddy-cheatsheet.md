---
title: CodeBuddy 速查表
description: "只查不学。安装命令、CLI 子命令、斜杠命令和键位均抄自 codebuddy.cn 官方文档。完整集合以你本机 codebuddy --help 与官方页为准。"
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# CodeBuddy 速查表

只查不学。安装命令、CLI 子命令、斜杠命令和键位均抄自官方页。完整集合以你本机 `codebuddy --help` 与下列链接为准。

覆盖核对日期：**2026-08-18**。

## 安装与更新

来源：[安装指南](https://www.codebuddy.cn/docs/cli/installation)、[快速入门](https://www.codebuddy.cn/docs/cli/quickstart)、[故障排查](https://www.codebuddy.cn/docs/cli/troubleshooting)

| 场景 | 命令 / 动作 | 出处 |
|------|-------------|------|
| npm | `npm install -g @tencent-ai/codebuddy-code` | 安装页 |
| pnpm | `pnpm add -g @tencent-ai/codebuddy-code` | 安装页 |
| yarn | `yarn global add @tencent-ai/codebuddy-code` | 安装页 |
| bun | `bun install -g @tencent-ai/codebuddy-code` | 安装页 |
| Homebrew | `brew tap Tencent-CodeBuddy/tap` 然后 `brew install codebuddy-code` | 安装页 |
| 原生全新安装（安装页） | `curl -fsSL https://www.codebuddy.cn/cli/install.sh \| bash` | 安装页 |
| 原生 Windows（安装页） | `irm https://www.codebuddy.cn/cli/install.ps1 \| iex` | 安装页 |
| 原生全新安装（快速开始页） | `curl -fsSL https://copilot.tencent.com/cli/install.sh \| bash` | 快速开始 |
| 原生 Windows（快速开始页） | `irm https://copilot.tencent.com/cli/install.ps1 \| iex` | 快速开始 |
| npm → 原生 | `codebuddy install` | 安装页 |
| 验证 | `codebuddy --version` | 安装页 |
| 更新 | `codebuddy update` | 安装页 / 故障排查 |
| npm 更新备选 | `npm install -g @tencent-ai/codebuddy-code@latest` | 故障排查 |
| 查 npm 最新 | `npm view @tencent-ai/codebuddy-code version` | 故障排查 |
| 关自动更新 | `export DISABLE_AUTOUPDATER=1` | 安装页 |
| 卸载 Homebrew | `brew uninstall codebuddy-code` | 安装页 |
| 卸载 npm | `npm uninstall -g @tencent-ai/codebuddy-code` | 安装页 |
| 删原生二进制 | `rm -f ~/.local/bin/codebuddy` | 安装页 |

Node.js：**18.20+**（安装页、故障排查）。总览页写过 18.0+；不要混用。

原生 PATH：`~/.local/bin`；Windows `%USERPROFILE%\AppData\Local\codebuddy\bin`。

配置目录：`~/.codebuddy` / `%USERPROFILE%\.codebuddy`。改位置：`CODEBUDDY_CONFIG_DIR`。

IDE 下载：[codebuddy.cn/ide](https://www.codebuddy.cn/ide/) · 国内 [copilot.tencent.com/ide](https://copilot.tencent.com/ide) · 国际 [codebuddy.ai](https://www.codebuddy.ai/)。系统要求见 [IDE 安装](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation)。

插件：市场搜索 **腾讯云代码助手**。[插件页](https://www.codebuddy.cn/docs/plugin/)。

## CLI 命令

来源：[CLI 参考](https://www.codebuddy.cn/docs/cli/cli-reference)

| 命令 | 说明 | 示例 |
|------|------|------|
| `codebuddy` | 启动交互式 REPL | `codebuddy` |
| `codebuddy "查询"` | 带初始提示词启动 REPL | `codebuddy "解释这个项目"` |
| `codebuddy -p "查询"` | 打印后退出 | `codebuddy -p "解释这个函数"` |
| `cat 文件 \| codebuddy -p "查询"` | 处理管道 | `cat logs.txt \| codebuddy -p "分析日志"` |
| `codebuddy -c` | 继续最近的对话 | `codebuddy -c` |
| `codebuddy -c -p "查询"` | 继续并以打印模式提问 | `codebuddy -c -p "检查类型错误"` |
| `codebuddy -r "<id>" "查询"` | 按 ID 恢复会话 | `codebuddy -r "abc123" "完成这个 MR"` |
| `codebuddy update` | 更新到最新版本 | `codebuddy update` |
| `codebuddy mcp` | 配置 MCP 服务器 | 见 [MCP 文档](https://www.codebuddy.cn/docs/cli/mcp) |
| `codebuddy daemon start` | 启动 Daemon | `codebuddy daemon start --port 8080` |
| `codebuddy daemon stop` / `status` / `restart` | 停 / 查 / 重启 | |
| `codebuddy daemon install` / `uninstall` | 注册或移除系统服务 | `codebuddy daemon install --port 8080` |
| `codebuddy auto-mode defaults` / `config` / `critique` | 查看或审视 auto 模式规则 | |
| `codebuddy ps` | 列出活跃 Worker | `codebuddy ps` |
| `codebuddy logs <name>` | 查看 Worker 日志 | `codebuddy logs feature-x` |
| `codebuddy attach <name>` | 附加到后台 Worker | `codebuddy attach feature-x` |
| `codebuddy kill <name>` | 终止 Worker | `codebuddy kill feature-x` |
| `codebuddy plugin install <plugin>` | 从市场安装 CLI 插件 | 见 [插件参考](https://www.codebuddy.ai/docs/cli/plugins-reference) |

## 常用 flag

来源：[CLI 参考](https://www.codebuddy.cn/docs/cli/cli-reference)。下表只收教程和日常脚本会碰到的项，不是全量。

| 参数 | 说明 |
|------|------|
| `--print`, `-p` | 打印响应后退出 |
| `-y` / `--dangerously-skip-permissions` | 跳过权限提示 |
| `--permission-mode` | `default` / `acceptEdits` / `auto` / `dontAsk` / `plan` / `bypassPermissions` |
| `--continue` / `-c` | 加载当前目录最近对话 |
| `--resume` | 按 ID 恢复 |
| `--model` | 设置本次会话模型 |
| `--ide` | 启动时连 IDE |
| `--add-dir` | 额外工作目录 |
| `--sandbox` | 沙箱（Beta） |
| `--worktree [name]` | 独立 git worktree |
| `--tmux` | 与 `--worktree` 配合 |
| `--bg` / `--name` | 后台会话 |
| `--serve` | HTTP 服务 |
| `--plugin-dir` | 从本地目录加载插件 |
| `--output-format` | `text` / `json` / `stream-json`（打印模式） |
| `--max-turns` | 非交互最大轮次 |
| `--verbose` / `--debug` | 详细日志 / 调试 |
| `--system-prompt` / `--append-system-prompt` | 替换或追加系统提示 |
| `--mcp-config` | 加载 MCP JSON |

官方提示：`-p` 且需要文件 / 命令 / 网络时，必须有明确权限策略（`-y`、`--permission-mode auto` / `dontAsk`、预先 `permissions.allow`，或权限提示 MCP 工具）。

## 斜杠命令

来源：[斜杠命令](https://www.codebuddy.cn/docs/cli/slash-commands)。官方表很长，这里只列上手高频。全表看官方页。

| 命令 | 作用 |
|------|------|
| `/help` | 帮助 |
| `/clear` | 全新对话 |
| `/login` / `/logout` | 登录 / 退出 |
| `/init` | 初始化仓库上下文 |
| `/config` | 本地配置 |
| `/model` | 切换或查看模型 |
| `/status` / `/doctor` | 会话状态 / 环境检查 |
| `/mcp` | 管理 MCP |
| `/skills` | 查看已加载 Skills |
| `/plugin` | 管理 CLI 插件和市场 |
| `/compact` | 压缩上下文 |
| `/cost` / `/stats` | Token / 使用统计 |
| `/resume` / `/rewind` | 恢复会话 / 回退检查点 |
| `/permissions` | 工具与目录权限 |
| `/plan` | 预览计划模式文件 |
| `/ide` | IDE 连接 |
| `/sandbox` | Bash 沙箱 |
| `/memory` | 长期记忆 |
| `/upgrade` | 打开升级页 |

自定义命令：项目 `.codebuddy/commands/*.md`，用户 `~/.codebuddy/commands/*.md`。`test.md` → `/test`；子目录用冒号，如 `frontend/build.md` → `/frontend:build`。

## 交互键位

来源：[快速入门 · 快捷键](https://www.codebuddy.cn/docs/cli/quickstart)

| 键 | 功能 |
|----|------|
| `↑/↓` | 命令历史；有后台任务时 `↓` 看任务 |
| `Tab` | 补全 |
| `Esc` | 清空输入（按两次） / 返回上级 |
| `Ctrl+C` / `Ctrl+D` | 退出（`Ctrl+D` 需输入框空且连按两次） |
| `Shift+Tab`（Windows 也可用 `Alt+M`） | 权限模式 `default → bypass → accept → plan` |
| `Enter` | 发送 |
| `Shift+Enter` / `\Enter` / `Ctrl+J` | 换行 |
| `Ctrl+G` | 外部编辑器改提示词 |
| `Ctrl+R` | 展开 / 收起详细输出 |
| `Ctrl+O` | 思考详情面板 |

JetBrains 终端里 ESC 不生效：改用 `Ctrl+ESC` 或 `Shift+ESC`（[故障排查](https://www.codebuddy.cn/docs/cli/troubleshooting)）。

## MCP 添加（摘录）

来源：[MCP 文档](https://www.codebuddy.cn/docs/cli/mcp)

```bash
codebuddy mcp add --scope user my-tool -- /path/to/tool arg1 arg2
codebuddy mcp add --scope project python-tool -- python /path/to/script.py
codebuddy mcp add --scope user --transport sse sse-server https://example.com/mcp/sse
codebuddy mcp add --scope project --transport http http-server https://example.com/mcp/http
```

## 决策表

| 场景 | 选 |
|------|----|
| 已有 VS Code / JetBrains | 插件 |
| 一句话到原型 / 设计 / 部署 | IDE |
| 终端 / CI / 无头 | CLI |
| 办公文档 / PPT，不是仓库 | WorkBuddy（本站不教） |
| 通用聊天 | 元宝（本站不教） |
| 国内账号 | CLI 选 Chinese Site |
| 海外账号 | CLI 选 International Site |

## 术语索引

一行钩子，解释在 [术语表](./codebuddy-glossary)。

| 术语 | 一句话 | 详解 |
|------|--------|------|
| CodeBuddy IDE | 独立编辑器 | [术语表](./codebuddy-glossary#codebuddy-ide) |
| CodeBuddy 插件 | 装进已有 IDE 的扩展 | [术语表](./codebuddy-glossary#codebuddy-插件) |
| CodeBuddy Code | 终端 agent，命令 `codebuddy` | [术语表](./codebuddy-glossary#codebuddy-code) |
| WorkBuddy | 办公工作台，不是编码主线 | [术语表](./codebuddy-glossary#workbuddy) |
| 国内站 / 国际站 | 两套文档和登录域 | [术语表](./codebuddy-glossary#国内站--国际站) |
| `CODEBUDDY.md` | 可迁移的指令文件 | [术语表](./codebuddy-glossary#codebuddymd) |

## 常见错误

| 症状 | 官方原因 / 处理 |
|------|-----------------|
| `codebuddy: command not found` | PATH 未包含安装目录；`source ~/.zshrc` |
| Windows「不是内部或外部命令」 | `npm config get prefix`，把全局 npm 目录加入 PATH |
| npm 装成功但仍是旧版本 | 多个可执行文件并存（npm + Homebrew / nvm） |
| 原生命令找不到 | `export PATH="$HOME/.local/bin:$PATH"` |
| `-p` 动不了文件 | 补 `-y` 或其它权限策略 |
| 局域网访问 `--serve` 空响应 | 默认听 `127.0.0.1`；用 `--host 0.0.0.0` |

## Agent SDK（可选）

来源：[Agent SDK](https://www.codebuddy.cn/docs/cli/sdk)。文档针对 SDK v0.1.0+。

```bash
npm install @tencent-ai/agent-sdk
```

```bash
pip install codebuddy-agent-sdk
```

TypeScript/JavaScript 要求 Node.js >= 18.20。本站不把 SDK 当主学习路径。

## 高质量信息源

最后核实：2026-08-18。只收录亲自打开过的官方页。

### 一手官方

| 来源 | 用途 |
|------|------|
| [codebuddy.cn](https://www.codebuddy.cn/) | 国内官网 |
| [codebuddy.cn/docs](https://www.codebuddy.cn/docs/) | 中文文档总览（三种形态） |
| [IDE 安装](https://www.codebuddy.cn/docs/ide/Getting-Started/Installation) | IDE 系统要求与安装登录 |
| [插件文档](https://www.codebuddy.cn/docs/plugin/) | 宿主版本与安装 |
| [CLI 概述](https://www.codebuddy.cn/docs/cli/) | CLI 入口 |
| [CLI 安装](https://www.codebuddy.cn/docs/cli/installation) | 包管理器 / 原生 / 卸载 |
| [CLI 快速开始](https://www.codebuddy.cn/docs/cli/quickstart) | 登录、`/init`、键位、`-p` |
| [CLI 参考](https://www.codebuddy.cn/docs/cli/cli-reference) | 子命令与 flag |
| [斜杠命令](https://www.codebuddy.cn/docs/cli/slash-commands) | `/` 命令全表 |
| [故障排查](https://www.codebuddy.cn/docs/cli/troubleshooting) | Node 版本、Windows、迁移、额度 |
| [MCP](https://www.codebuddy.cn/docs/cli/mcp) | `codebuddy mcp add` |
| [SDK](https://www.codebuddy.cn/docs/cli/sdk) | Agent SDK |
| [定价](https://www.codebuddy.cn/pricing/) | 套餐入口（前端渲染，勿臆造数字） |
| [腾讯云 acc](https://cloud.tencent.com/product/acc) | 云产品页 |
| [产品概述 1831](https://cloud.tencent.com/document/product/1831/134343) | 三形态对照表 |
| [codebuddy.ai/docs](https://www.codebuddy.ai/docs/) | 国际站文档 |
| [codebuddy.ai/docs/zh](https://www.codebuddy.ai/docs/zh/) | 国际站中文镜像 |
| [WorkBuddy 简介](https://www.codebuddy.cn/docs/workbuddy/) | 家族图一行的出处 |
| [WorkBuddy 小程序](https://www.codebuddy.cn/docs/workbuddymini/) | 家族图一行 |
| [WorkBuddy 移动端](https://www.codebuddy.cn/docs/workbuddyapp/) | 家族图一行 |
| [元宝](https://yuanbao.tencent.com/) | 同厂助手 |
| [混元](https://hunyuan.tencent.com/) | 同厂模型 |

### 待核实

- 定价页具体套餐数字（页面前端渲染，2026-08-18 阅读器未抽出价目表）
- 仓库根 `CODEBUDDY.md` 是否与用户级 `~/.codebuddy/CODEBUDDY.md` 同样自动注入（官方故障排查只明确了迁移文件名）
