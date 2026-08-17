# Grok Build 教程

> 本页覆盖 Grok Build（可执行文件 `grok`）从安装到日常使用的完整链路。参数清单见 [速查表](./grok-cheatsheet.md)，概念辨析见 [术语表](./grok-glossary.md)，场景化配方见 [Cookbook](./grok-cookbook.md)。
>
> Grok Build 处于 beta 阶段且发版极快（npm 上近期约 1-3 天一个版本），本页刻意不写具体版本号；命令与配置若与你机器上的实际行为不符，先看 [x.ai/build/changelog](https://x.ai/build/changelog)。

## 1. 安装

官方提供三条安装通道。

::: code-group

```bash [macOS / Linux]
curl -fsSL https://x.ai/cli/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://x.ai/cli/install.ps1 | iex
```

```bash [npm（跨平台）]
npm install -g @xai-official/grok
```

:::

- 前两条来自 [docs.x.ai/build/overview](https://docs.x.ai/build/overview) 与 [仓库 README](https://github.com/xai-org/grok-build)。
- npm 通道由 [docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise) 给出，原文把它列为在网络策略禁止 `curl | bash` 时的替代方案。npm 包要求 Node.js `>= 20`，支持 macOS / Linux / Windows 的 x64 与 arm64。

验证安装：

```bash
grok --version
```

> **命名提示**：从源码自行编译得到的二进制叫 `xai-grok-pager`，官方安装包把它作为 `grok` 分发（[README](https://github.com/xai-org/grok-build) 原文："The binary artifact is named `xai-grok-pager`; official installs ship it as `grok`."）。

## 2. 认证

四种方式，来自 [docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise)：

| 方式 | 怎么做 | 适用场景 |
|------|--------|----------|
| 浏览器 OIDC | `grok login`（首次启动会自动打开浏览器） | 本机开发 |
| 设备码 | `grok login --device-auth`（RFC 8628） | SSH / 远程机器 / 无浏览器 |
| API Key | `export XAI_API_KEY="xai-..."` 后再运行 `grok` | CI、容器 |
| 外部认证提供方 | 配置 `auth_provider_command` | 企业统一身份 |

凭证解析优先级（高 → 低）：`model.api_key` > `model.env_key` > 当前会话 token > `XAI_API_KEY`。

订阅要求：[发布公告](https://x.ai/news/grok-build-cli)（2026-05-25）写的是 "Available now to all SuperGrok and X Premium Plus subscribers."，而营销页 [x.ai/build](https://x.ai/build) 当前挂着 "Available to try for Free"。两处口径不同，以你账号登录后实际看到的额度为准；官方没有给出免费额度的具体数值。

<!-- TODO: 待核实 —— 免费额度的具体数值、SuperGrok/X Premium Plus 与 Grok Build 用量的换算关系，官方文档与营销页均未给出说明 -->

退出登录：`grok logout`。

## 3. 第一次运行

```bash
cd your-project
grok
```

无参数启动即进入交互式 TUI（[cli/reference](https://docs.x.ai/build/cli/reference) 原文："Running `grok` with no arguments starts the interactive TUI."）。

官方建议的第一批提示词（[overview](https://docs.x.ai/build/overview)）：

```text
Explain this repo.
@src/main.rs Walk me through this file.
```

`@` 引用文件。**装完先跑一次 `grok inspect`**——它会打印 Grok 在当前目录发现的一切：配置来源、指令文件（含 token 数）、skills、plugins、hooks、MCP 服务器。配置没生效时这是第一诊断命令。

```bash
grok inspect
grok inspect --json
```

## 4. TUI 必备键位

完整键位表在 TUI 里按 `Ctrl+.`（Windows 或不支持 Kitty 键盘协议的终端用 `Ctrl+X`）查看。下表是入门够用的一组，来自 [keyboard-shortcuts](https://docs.x.ai/build/keyboard-shortcuts)：

| 键位 | 作用 |
|------|------|
| `Enter` | 发送 |
| `Shift+Enter` | 换行（VS Code / Cursor / Windsurf / Zed 的内置终端识别不了，改用 `Alt+Enter`） |
| `Shift+Tab` | 循环切换 Normal → Plan → Auto → Always-approve |
| `Esc` | 中断当前动作 |
| `Esc Esc` | 触发 `/rewind`（回退会话） |
| `Ctrl+Enter` / `Ctrl+I` | 插话（interject，在 VS Code 系终端里是 `Ctrl+L`） |
| `Ctrl+P` 或 `?` | 命令面板 |
| `Ctrl+T` | 待办面板 |
| `Ctrl+B` | 后台任务面板 |
| `Ctrl+G` | 任务面板 |
| `Ctrl+S` | 会话面板 |
| `Ctrl+M` | 模型选择器 |
| `Ctrl+\` | Dashboard |
| `Ctrl+O` | 切到 always-approve |
| `F2` / `Ctrl+,` | 设置 |
| `Ctrl+Q` / `Ctrl+D` | 退出（VS Code 系终端里只有 `Ctrl+D`） |

终端不兼容时（复制粘贴失效、按键错乱），先在 TUI 里跑 `/terminal-setup` 自检，详见 [terminal-support](https://docs.x.ai/build/cli/terminal-support)。

## 5. 权限：先搞懂这两件事是分开的

这是 Grok Build 最容易用错的地方。官方 [permissions](https://docs.x.ai/build/features/permissions) 原文：

> "Permissions decide which tool calls may run. The sandbox is separate: it limits what an approved call can do on the filesystem and network."

**权限决定「这次工具调用能不能跑」，沙箱决定「跑起来能碰到什么」**，两者正交，可以同时开。

三档权限模式：

| 模式 | 行为 | 怎么进 |
|------|------|--------|
| Ask（默认） | 未被 allow 规则覆盖的一律弹确认 | — |
| Auto | 分类器自动放行安全工具，危险的仍可能弹确认（`deny` 规则与 hooks 依然生效） | `/auto`、`Shift+Tab`（该特性开启时） |
| Always-approve | 自动放行工具调用（`deny` 规则与 `PreToolUse` hooks 依然生效） | `/always-approve`、`Ctrl+O`、`Shift+Tab`、`grok --always-approve` |

默认模式只能写在**用户级** `~/.grok/config.toml`（项目级 `.grok/config.toml` 不生效）：

```toml
[ui]
permission_mode = "auto"  # 或 "ask" | "always-approve"
```

规则写法（`--allow` / `--deny` 接受同样的 pattern）：

```toml
[permission]
rules = [
  { action = "allow", tool = "bash", pattern = "git *" },
  { action = "allow", tool = "read" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
]
```

三条必须记住的规则：

1. **`deny` 永远赢过 `allow`**，完整优先级是 deny > ask > allow（[settings/reference](https://docs.x.ai/build/settings/reference)），不是「后写覆盖先写」。
2. 支持的过滤器：`Bash`、`Edit`、`Read`、`Grep`、`MCPTool`、`WebFetch`、`WebSearch`。
3. 交互里点的「always allow」对 `rm`、`git push` 这类危险 pattern 仍会再次弹确认；只有配置文件或 CLI 里的显式 allow 规则才会真正自动放行。

## 6. 沙箱：默认是关的

[sandbox](https://docs.x.ai/build/features/sandbox)：Linux 用 Landlock，macOS 用 Seatbelt，**默认 `off`**。

| Profile | 可读 | 可写 | 子进程联网 | 场景 |
|---------|------|------|-----------|------|
| `off` | 不限 | 不限 | 允许 | 默认，无沙箱 |
| `workspace` | 全部 | CWD、`~/.grok/`、临时目录 | 允许 | 常规开发 |
| `devbox` | 全部 | 除 `/data` 外的顶层目录 | 允许 | 云端 devbox |
| `read-only` | 全部 | 仅 `~/.grok/` 与临时目录 | 阻止 | 代码审查、审计 |
| `strict` | CWD 与系统路径 | CWD、`~/.grok/`、临时目录 | 阻止 | 不可信仓库 |

三种开启方式：`grok --sandbox workspace`、`[sandbox] profile = "workspace"`、`GROK_SANDBOX=workspace`。

两个必须知道的限制（官方明确列出）：

- **子进程网络限制只在 Linux 生效**，macOS 上 `read-only` / `strict` 的网络阻断是 no-op。
- 内置 profile **不会**永久保护 `~/.ssh` 这类敏感路径，要自己写 deny 列表：

```toml
# ~/.grok/sandbox.toml
[profiles.my-profile]
extends = "workspace"
restrict_network = true
deny = ["/secrets", "**/.env", "**/*.pem"]
```

Linux 上要用「可读但拒绝某些路径」的能力需要系统装 `bubblewrap`。

## 7. 计划模式

`/plan [描述]` 进入计划模式，`/view-plan`（别名 `/show-plan`、`/plan-view`）查看。计划评审界面里的按键：`a` 批准、`s` 要求修改、`c` 评论、`q` 退出、`Tab` 切换焦点。

两个要点（[plan-mode](https://docs.x.ai/build/features/plan-mode)）：

- 计划模式与权限模式**互相独立**：即使处于 auto 或 always-approve，计划评审界面也不会被跳过。
- 计划模式下只有会话计划文件可编辑，但 **bash 仍可通过重定向写文件**——它不是硬隔离，需要硬隔离请配沙箱。

## 8. 会话管理

会话按工作目录存放在 `~/.grok/sessions/`（[sessions](https://docs.x.ai/build/features/sessions)）。

| 目的 | 做法 |
|------|------|
| 恢复上一个会话 | `grok -c`（或 `--continue`） |
| 选择恢复 | `grok --resume`（不带 ID 时列出可选） |
| 恢复指定会话 | `grok --resume <id>` |
| TUI 内恢复 | `/resume` |
| 从当前会话分叉 | `/fork [指令]`，可加 `--worktree` / `--no-worktree` |
| 回退历史 | `/rewind` 或 `Esc Esc` |
| 压缩上下文 | `/compact [重点]`；也会自动压缩 |
| 看上下文占用 | `/context`、`/session-info` |
| 列出 / 搜索 / 删除 | `grok sessions list` / `search` / `delete` |
| 导出 | `grok export <session-id> [output]`，`--clipboard` 进剪贴板 |
| 改标题 | `/rename`（别名 `/title`） |

headless 里拿会话 ID：

```bash
grok -p "Start the refactor" --output-format json | jq -r '.sessionId'
```

## 9. 项目规则：AGENTS.md

Grok Build 的项目规则主文件是 `AGENTS.md`。加载顺序是先 `~/.grok/` 全局，再从仓库根目录逐级向下到当前目录（[project-rules](https://docs.x.ai/build/features/project-rules)）。

它会读的文件：

- `AGENTS.md`、`Agents.md`、`AGENT.md`
- `CLAUDE.md`、`Claude.md`、`CLAUDE.local.md`
- `.grok/rules/` 下的 `*.md`，以及 `.claude/rules/`、`.cursor/rules/`

被 gitignore 的文件会跳过。单次覆盖用 `--rules <TEXT>`，整体替换系统提示词用 `--system-prompt-override <TEXT>`。`grok inspect` 会列出实际加载了哪些规则文件以及各自的 token 数——规则没生效时先看这里。

## 10. 切换模型

```bash
grok -m grok-build-0.1 -p "重构这个模块"
```

TUI 内用 `/model`（别名 `/m`）或 `Ctrl+M`。推理强度用 `/effort` 或 `--effort <LEVEL>`。

接自建 / 第三方 OpenAI 兼容端点（[overview](https://docs.x.ai/build/overview)）：

```toml
# ~/.grok/config.toml（Windows: %USERPROFILE%\.grok\config.toml）
[model.my-model]
model = "model-id"
base_url = "https://api.example.com/v1"
name = "Display Name"
env_key = "API_KEY"

[models]
default = "my-model"
```

改完用 `grok inspect` 确认被识别，再 `grok -p "Hello" -m my-model` 验证。

## 11. Headless 模式

```bash
grok -p "Explain this codebase"
grok -p "Explain the architecture" --output-format streaming-json
```

常用参数（[headless-scripting](https://docs.x.ai/build/cli/headless-scripting)）：

| 参数 | 作用 |
|------|------|
| `-p, --single <PROMPT>` | 发送单次提示 |
| `-s, --session-id <ID>` | 创建或复用一个命名的 headless 会话 |
| `-r, --resume <ID>` / `-c, --continue` | 恢复会话 |
| `--cwd <PATH>` | 指定工作目录 |
| `--output-format <FMT>` | `plain`（人读）/ `json`（结束时一个对象）/ `streaming-json`（逐行 JSON 事件） |
| `--always-approve` | 免确认 |
| `--no-alt-screen` | 内联输出，不接管整屏 |

headless 会话存在 `~/.grok/sessions`。

**CI 里务必禁用自动更新**：加 `--no-auto-update`，或在 `~/.grok/config.toml` 里持久化：

```toml
[cli]
auto_update = false
```

## 12. ACP：嵌进编辑器或自建编排器

```bash
grok agent stdio
```

以 ACP（Agent Client Protocol）agent 身份在 stdin/stdout 上跑 JSON-RPC。官方示例的握手顺序（[headless-scripting](https://docs.x.ai/build/cli/headless-scripting)）：

1. `initialize`，传 `protocolVersion: 1` 和 `clientCapabilities`（`fs.readTextFile` / `fs.writeTextFile` / `terminal`）
2. `authenticate`：设了 `XAI_API_KEY` 就选 `xai.api_key`，否则用 `cached_token`（都没有时官方报错文案是 "Run `grok login` first, or set XAI_API_KEY."）
3. `session/new`，传 `{ cwd, mcpServers: [] }`
4. `session/prompt`，传 `prompt: [{ type: "text", text: "..." }]`

关键细节：**`session/prompt` 的返回值只是完成元数据，助手正文是通过 `session/update` 的 `agent_message_chunk` 事件流式送达的**——只看返回值会以为没输出。

## 13. 更新与排错

```bash
grok update --check        # 只检查
grok update                # 更新
grok update --version <V>  # 指定版本
grok update --alpha        # 切 alpha 通道
grok update --stable       # 切回 stable
```

| 症状 | 先查什么 |
|------|----------|
| 配置 / 规则 / MCP 没生效 | `grok inspect`（看它到底读到了什么） |
| 项目级配置项没生效 | 项目 `.grok/config.toml` **只支持 `[mcp_servers]`、`[plugins]`、`[permission]` 三段**，其余键必须写在 `~/.grok/config.toml` |
| MCP 服务器起不来 | `grok mcp doctor [name]`，日志在 `~/.grok/logs/mcp/<server>.stderr.log` |
| 复制粘贴 / 按键异常 | `/terminal-setup` |
| 网页抓取工具不工作 | `GROK_WEB_FETCH` 默认是 `0`（官方出于安全默认关闭），需显式开启 |
| 企业网络连不上 | 必须放行 `cli-chat-proxy.grok.com` 与 `auth.x.ai`（[enterprise](https://docs.x.ai/build/enterprise)） |

反馈渠道是 TUI 里的 `/feedback`。**不要给 [xai-org/grok-build](https://github.com/xai-org/grok-build) 提 PR**——README 明确写了 "External contributions are not accepted."

## 相关页面

- [Grok 学习地图](./index.md)
- [实战 Cookbook](./grok-cookbook.md) — hooks、MCP、skills、subagent、CI 配方
- [速查表](./grok-cheatsheet.md) — 完整命令 / flag / 配置键 / 环境变量
- [术语表](./grok-glossary.md) — 权限 vs 沙箱、skill vs plugin 等概念辨析
