# Grok Build 速查表

只查不学。所有条目来自 xAI 官方文档，页面链接在每节标题旁。命令的完整集合永远以 `grok --help` / `grok <subcommand> --help` 为准。

覆盖 npm `@xai-official/grok` `1.0.5`（2026-08-16 的 `dist-tags.latest` 与 `alpha`）。2026-08-18 复核时 [changelog](https://x.ai/build/changelog) 头部仍显示 v1.0.3 / Aug 12, 2026。看到差异先跑 `grok version` 再对 changelog。

## 安装与更新

| 场景 | 命令 |
| --- | --- |
| macOS / Linux | `curl -fsSL https://x.ai/cli/install.sh \| bash` |
| Windows PowerShell | `irm https://x.ai/cli/install.ps1 \| iex` |
| npm 渠道 | `npm install -g @xai-official/grok` |
| 检查更新 | `grok update --check` |
| 装指定版本 | `grok update --version <V>` |
| 切通道 | `grok update --alpha` / `grok update --stable` |
| 看版本 | `grok version` |

npm 包要求 `node >= 20`，二进制名是 `grok`。

## 子命令

来源：[CLI Reference](https://docs.x.ai/build/cli/reference)

| 命令 | 作用 |
| --- | --- |
| `grok` | 无参数启动交互式 TUI |
| `grok login` | 登录；`--device-auth` 走设备码（无浏览器环境） |
| `grok logout` | 登出并清除缓存凭证 |
| `grok inspect [--json]` | 显示当前目录发现的配置：rules、skills、plugins、hooks、MCP servers |
| `grok models` | 列出可用模型 |
| `grok mcp <list\|add\|remove\|doctor>` | 管理 MCP server |
| `grok plugin <list\|install\|uninstall\|update\|enable\|disable\|details\|validate>` | 管理 plugin |
| `grok plugin marketplace <list\|add\|remove\|update>` | 管理 marketplace 源 |
| `grok sessions <list\|search\|delete>` | 列出、搜索、删除会话 |
| `grok export <session-id> [output]` | 导出会话为 Markdown |
| `grok import [targets...]` | 从 Claude Code 导入会话 |
| `grok memory clear [--workspace\|--global\|--all]` | 清除跨会话记忆文件 |
| `grok worktree <list\|show\|rm\|gc>` | 管理会话创建的 git worktree |
| `grok dashboard` | 打开 Agent Dashboard |
| `grok agent stdio` | 以 ACP agent 身份在 stdin/stdout 上运行 |
| `grok wrap <command...>` | 在本地 PTY 里跑命令并转发 OSC 52 剪贴板写入 |
| `grok update` | 检查或安装更新 |
| `grok version` | 打印版本信息 |
| `grok completions <shell>` | 生成 shell 补全脚本 |
| `grok setup` | 拉取并安装托管配置 |

## 常用 flag

| Flag | 作用 |
| --- | --- |
| `--cwd <PATH>` | 工作目录 |
| `-r, --resume [<ID>]` | 恢复会话，省略 ID 则用最近一个 |
| `-c, --continue` | 继续当前目录最近一个会话 |
| `-s, --session-id <UUID>` | 给**新**会话指定 UUID（不是恢复） |
| `--fork-session` | 恢复时分叉成新会话 ID |
| `-w, --worktree [<NAME>]` | 在新 git worktree 里开会话 |
| `--ref <REF>` | worktree 基于的分支/标签/提交 |
| `-m, --model <MODEL>` | 模型 ID |
| `--effort <LEVEL>` | 推理强度 |
| `--always-approve` | 自动批准所有工具调用（别名 `--yolo`） |
| `--allow <RULE>` / `--deny <RULE>` | 权限规则 |
| `--sandbox <PROFILE>` | 沙箱 profile |
| `--rules <TEXT>` | 追加到 system prompt 的额外规则 |
| `--system-prompt-override <TEXT>` | 整体替换 system prompt |
| `--tools <LIST>` / `--disallowed-tools <LIST>` | 开放或移除内置工具 |
| `--max-turns <N>` | 最大 agent turn 数 |
| `--no-plan` / `--no-subagents` / `--no-memory` / `--disable-web-search` | 本次会话关掉某特性 |
| `--experimental-memory` | 开启跨会话记忆 |
| `--oauth` | 欢迎页认证时走 OAuth |
| `--trust` | 启动时信任项目级 hook / MCP / LSP |
| `--plugin-dir <PATH>` | 额外的 plugin 目录 |

Claude Code 的 flag 名作为别名被接受：`--allowedTools`、`--disallowedTools`、`--append-system-prompt`、`--system-prompt`、`--dangerously-skip-permissions`。

### Headless 相关

| Flag | 作用 |
| --- | --- |
| `-p <PROMPT>` | 非交互执行一个 prompt |
| `--output-format plain\|json\|streaming-json` | 输出格式，默认 `plain` |
| `--permission-mode dontAsk\|acceptEdits` | CI 用权限模式 |
| `--no-alt-screen` | 不使用备用屏幕缓冲 |
| `--no-auto-update` | 本次运行不自动更新 |

## 权限与模式

来源：[Permissions](https://docs.x.ai/build/features/permissions)、[Modes and Commands](https://docs.x.ai/build/modes-and-commands)

| 模式 | 行为 | 进入方式 |
| --- | --- | --- |
| Ask（默认） | 任何未被 allow 的调用都询问 | 默认 |
| Auto | 分类器自动批准安全工具，危险的仍可能询问 | `/auto`、`Shift+Tab`（特性开启时） |
| Always-approve | 自动批准工具调用（`deny` 规则和 PreToolUse hook 仍生效） | `/always-approve`、`Ctrl+O`、`Shift+Tab`、`grok --always-approve` |
| Plan | 只能编辑会话计划文件，直到你批准 | `/plan [description]`、`Shift+Tab` |
| `dontAsk` | 静默拒绝一切没有显式 allow 的调用（headless / CI） | `--permission-mode dontAsk` |
| `acceptEdits` | 自动批准文件编辑，shell 命令仍询问 | `--permission-mode acceptEdits` |

`Shift+Tab` 的循环顺序：Normal → Plan → Auto（可用时）→ Always-approve。

规则语法（`deny` 永远赢过 `allow`）：

```toml
[permission]
rules = [
  { action = "allow", tool = "bash", pattern = "git *" },
  { action = "allow", tool = "read" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
]
```

支持的过滤器：`Bash`、`Edit`、`Read`、`Grep`、`MCPTool`、`WebFetch`、`WebSearch`。

`[ui] permission_mode` 只在**用户配置**（`~/.grok/config.toml` 或 managed / requirements）里生效，项目 `.grok/config.toml` 里写了不算。旧键 `approval_mode` 和 `yolo = true` 仍可用，同时设置时 `permission_mode` 优先。

## 沙箱 profile

来源：[Sandbox](https://docs.x.ai/build/features/sandbox)

默认关闭。Linux 用 Landlock，macOS 用 Seatbelt。

| Profile | 读 | 写 | 网络 | 定位 |
| --- | --- | --- | --- | --- |
| `off` | 无限制 | 无限制 | 允许 | 无沙箱（默认） |
| `workspace` | 任意位置 | CWD、`~/.grok/`、临时目录 | 允许 | 正常开发 |
| `devbox` | 任意位置 | 除 `/data` 外的顶层目录 | 允许 | 云开发机 |
| `read-only` | 任意位置 | 只有 `~/.grok/` 和临时目录 | 阻断 | 代码审查、审计 |
| `strict` | CWD 和系统路径 | CWD、`~/.grok/`、临时目录 | 阻断 | 不可信仓库 |

三条局限：子进程网络限制**只在 Linux 生效**，macOS 上 `read-only` / `strict` 是空操作；内置 profile **不会**永久保护 `~/.ssh` 之类路径，要自己写 `deny`；`~/.grok/` 在所有 profile 下保持可写。模型 API 和 web 工具不受子进程网络设置影响。

自定义 profile 放 `~/.grok/sandbox.toml` 或 `.grok/sandbox.toml`，内置名字不能重定义：

```toml
[profiles.my-profile]
extends = "workspace"
restrict_network = true
deny = ["/secrets", "**/.env", "**/*.pem"]
```

## 斜杠命令

来源：[Modes and Commands](https://docs.x.ai/build/modes-and-commands)

### 会话

| 命令 | 作用 |
| --- | --- |
| `/quit`（别名 `/exit`） | 退出 |
| `/help` | 浏览命令和键位 |
| `/home` | 回欢迎页 |
| `/new`（别名 `/clear`） | 新会话 |
| `/resume` | 恢复历史会话 |
| `/sessions` | 切换、重命名、关闭活动会话 |
| `/fork` | 分叉当前会话成对等 agent |
| `/rename <title>`（别名 `/title`） | 重命名当前会话 |
| `/share` | 以 URL 分享当前会话 |
| `/session-info` | 会话信息 |
| `/context` | 上下文占用 |
| `/compact [context]` | 压缩对话历史 |
| `/rewind` | 回退到之前的 turn |
| `/export` | 导出对话到文件或剪贴板 |
| `/copy [N]` | 复制最后一条（或倒数第 N 条）响应 |
| `/find` | 搜索滚动区 |
| `/transcript` | 用 `$PAGER` 查看完整记录 |

### 模型与模式

| 命令 | 作用 |
| --- | --- |
| `/model <name>`（别名 `/m`） | 切换模型 |
| `/effort` | 设置当前模型的推理强度 |
| `/always-approve` | 切换 always-approve |
| `/auto` | 切换 auto 模式 |
| `/plan [description]` | 进入计划模式 |
| `/view-plan` | 查看当前计划 |

### 任务与编排

| 命令 | 作用 |
| --- | --- |
| `/btw <question>` | 问个旁支问题不打断主线 |
| `/loop [interval] <prompt>` | 按间隔重复跑一个 prompt |
| `/tasks` | 列出后台任务、subagent、定时任务 |
| `/queue` | 列出排在当前 turn 后面的 prompt |
| `/create-workflow [description]` | 编写并保存新 workflow |
| `/workflow <name> [args]` | 启动 workflow，或 `pause` / `resume` / `stop` / `save` |
| `/workflows` | 全屏 workflow 运行看板 |
| `/deep-research <query>` | 跑内置研究工作流 |
| `/dashboard` | 打开 Agent Dashboard |
| `/imagine <prompt>` | 文本生成图片 |
| `/imagine-video <prompt>` | 文本生成视频 |

### 扩展与配置

| 命令 | 作用 |
| --- | --- |
| `/hooks` / `/plugins` / `/marketplace` / `/skills` / `/mcps` | 打开同一个扩展弹窗的不同标签页 |
| `/config-agents`（别名 `/agents`） | 管理 agent 定义 |
| `/personas` | 管理 persona |
| `/settings`（别名 `/config`） | 设置弹窗 |
| `/theme [name]`（别名 `/t`） | 切换主题 |
| `/compact-mode` | 更紧凑的 UI |
| `/multiline`（别名 `/ml`） | 切换多行输入 |
| `/vim-mode` | 切换 vim 风格滚动区键位 |
| `/timestamps` | 切换消息时间戳 |
| `/terminal-setup` | 检查终端与剪贴板配置 |
| `/hooks-trust` | 信任当前项目的 hook |
| `/import-claude` | 打开 Claude 设置导入弹窗 |

### 账号与记忆

| 命令 | 作用 |
| --- | --- |
| `/login` / `/logout` | 登录 / 登出 |
| `/usage` | 查看额度使用或管理账单 |
| `/privacy` | 查看或切换隐私与数据保留状态 |
| `/feedback [text]` | 反馈当前会话 |
| `/release-notes`（别名 `/changelog`） | 当前版本的发布说明 |
| `/remember <note>` | 存一条记忆 |
| `/flush` | 立刻把对话记忆写盘 |
| `/memory`（别名 `/mem`） | 浏览管理记忆 |
| `/dream` | 跑记忆整合 |

`/flush`、`/memory`、`/dream` 由 shell 提供，只在跨会话记忆开启时出现。user-invocable 的 skill 也会变成 `/<skill-name>`；名字冲突时用限定形式如 `/local:commit`。

## 键位

来源：[Keyboard Shortcuts](https://docs.x.ai/build/keyboard-shortcuts)。TUI 内按 `Ctrl+.`（Windows 或不支持 Kitty 键盘协议的终端用 `Ctrl+X`）看完整列表。

### 必备

| 键 | 作用 |
| --- | --- |
| `Enter` | 发送 |
| `Tab` | 在输入框和滚动区之间切焦点 |
| `Esc` | 取消运行中的 turn |
| `Esc Esc` | 清空输入框；输入框为空时打开 rewind |
| `Ctrl+C` | 取消 turn |
| `Shift+Tab` | 循环模式 |
| `Ctrl+P` 或 `?` | 命令面板 |
| `F2` 或 `Ctrl+,` | 设置 |
| `Ctrl+Q` / `Ctrl+D` | 退出（按两次） |

### 输入

| 键 | 作用 |
| --- | --- |
| `Ctrl+Enter` 或 `Ctrl+I` | turn 运行中插话 |
| `Shift+Enter` | 换行；多行模式下是发送（不支持时用 `Alt+Enter`） |
| `Ctrl+M` | 切换多行输入 |
| `Ctrl+R` | 搜索 prompt 历史 |
| `!` | 空输入框时进 shell 模式 |

### 面板与会话

| 键 | 作用 |
| --- | --- |
| `Ctrl+T` | 切换 todo 面板 |
| `Ctrl+B` | 把运行中的命令丢到后台 |
| `Ctrl+;` 或 `Ctrl+'` | 切换 prompt 队列面板 |
| `Ctrl+S` | 打开会话列表 |
| `Ctrl+L` | 打开扩展弹窗 |
| `Ctrl+G` | 切换任务面板 |
| `Ctrl+O` | 切换 always-approve |
| `Ctrl+N` | 新会话（按两次） |
| `Ctrl+M` | 输入框未聚焦时选模型 |
| `Ctrl+\` | 打开 Agent Dashboard |

### 终端差异（重要）

- VS Code 系终端（VS Code、Cursor、Windsurf、Zed）：退出只有 `Ctrl+D`，插话是 `Ctrl+L`，半页滚动是 `Shift+D`，`Ctrl+L` **不**打开扩展弹窗（用 `/plugins`），换行用 `Alt+Enter`
- Apple Terminal：`Ctrl+O` 也会插话
- WezTerm：需要 `enable_kitty_keyboard = true` 才支持 `Ctrl+Enter` 和 `Shift+Enter`

滚动区的字母键（`j`/`k`/`g`/`e`/`y`/`/` 等）需要 vim 模式（`/vim-mode` 或 `[ui] vim_mode = true`），方向键版本始终可用。

## 配置文件

| 路径 | 用途 |
| --- | --- |
| `~/.grok/config.toml` | 用户配置（Windows：`%USERPROFILE%\.grok\config.toml`） |
| `<project>/.grok/config.toml` | 项目配置，**只认** `[mcp_servers]`、`[plugins]`、`[permission]` |
| `~/.grok/sandbox.toml` / `.grok/sandbox.toml` | 自定义沙箱 profile |
| `~/.grok/hooks/*.json` / `<project>/.grok/hooks/*.json` | hook 定义 |
| `~/.grok/skills/` / `./.grok/skills/` | skill 目录 |
| `~/.grok/plugins/` / `./.grok/plugins/` | plugin 目录 |
| `~/.grok/agents/` / `.grok/agents/` | 自定义 subagent 类型 |
| `~/.grok/personas/*.toml` / `.grok/personas/*.toml` | persona 定义 |
| `~/.grok/workflows/*.rhai` / `.grok/workflows/*.rhai` | workflow |
| `~/.grok/sessions/` | 会话历史（按工作目录索引） |
| `~/.grok/worktrees/<repo>/<name>` | 会话 worktree |
| `~/.grok/mcp_credentials.json` | MCP OAuth token |
| `~/.grok/trusted_folders.toml` | 已信任的项目目录 |
| `~/.grok/logs/mcp/<server>.stderr.log` | MCP stdio server 的 stderr |
| `/etc/grok/requirements.toml` | 系统级托管策略（防篡改锁只认 root 拥有的来源） |

指令文件：`AGENTS.md` 家族（`AGENTS.md` / `Agents.md` / `AGENT.md`）和 Claude 家族（`CLAUDE.md` / `Claude.md` / `CLAUDE.local.md` / `.claude/rules/`）都会从 cwd 向上读到仓库根。

## 常用配置键

来源：[Settings Reference](https://docs.x.ai/build/settings/reference)

| 段 | 键 | 说明 |
| --- | --- | --- |
| `[models]` | `default` | 新会话使用的模型 |
| `[models]` | `allowed_models` / `hidden_models` / `disabled_models` | 限制可选模型（glob 列表 / ID 列表） |
| `[model.<id>]` | `model` / `base_url` / `name` / `env_key` / `api_backend` | 自定义或 BYOK 模型 |
| `[model.<id>]` | `context_window` | 上下文窗口大小，影响自动压缩时机 |
| `[tools]` | `respect_gitignore` | 默认 `false`；`true` 时搜索/读取工具跳过 gitignore 命中的文件 |
| `[toolset]` | `file_toolset` | `standard`（默认）或 `hashline` |
| `[toolset.bash]` | `timeout_secs` / `output_byte_limit` / `max_timeout_secs` | 默认 `120` 秒 / `20000` 字节 / `36000` 秒 |
| `[toolset.bash]` | `auto_background_on_timeout` | 默认 `true`，超时自动转后台 |
| `[toolset.web_fetch]` | `allowed_domains` / `proxy_endpoint` | `web_fetch` 域名白名单与出口代理 |
| `[sandbox]` | `profile` / `auto_allow_bash` | 沙箱 profile；沙箱激活时跳过 bash 询问 |
| `[permission]` | `rules` | allow / deny 规则 |
| `[ui]` | `permission_mode` | `"ask"` / `"auto"` / `"always-approve"`，只在用户配置生效 |
| `[ui]` | `disable_bypass_permissions_mode` | 全局锁掉 always-approve（只认 root 来源） |
| `[ui]` | `vim_mode` | 滚动区 vim 键位 |
| `[features]` | `web_fetch` / `lsp_tools` / `write_file` / `tool_search` | `lsp_tools` 默认关，`write_file` / `tool_search` 默认开 |
| `[subagents]` | `enabled` / `toggle` / `models` | 总开关 / 逐类型开关 / 逐类型模型路由 |
| `[memory]` | `enabled` | 跨会话记忆总开关，**默认关** |
| `[skills]` / `[plugins]` | `paths` / `disabled` / `enabled` | 额外目录 / 发现但不激活 / 显式启用 |
| `[compat.claude]` / `[compat.cursor]` | `skills` / `rules` / `agents` / `mcps` / `hooks` | 是否扫描对应目录，默认全 `true` |
| `[dashboard]` | `enabled` | Agent Dashboard 总开关 |
| `[workflows]` | `enabled` | workflow 总开关 |
| `[mcp_servers.<name>]` | `startup_timeout_sec` / `tool_timeout_sec` | 默认 `30` / `6000` 秒 |

## 环境变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `GROK_HOME` | `~/.grok` | 配置、认证、会话、skill、plugin、日志的家目录 |
| `XAI_API_KEY` | — | 不走浏览器登录时的 API key（CI / headless） |
| `GROK_DEFAULT_MODEL` | 目录 / 配置 | 会话默认模型 |
| `GROK_XAI_API_BASE_URL` | `https://api.x.ai/v1` | API key 认证时的 xAI API base |
| `GROK_MODELS_BASE_URL` | — | 自定义推理 base URL |
| `GROK_DISABLE_AUTOUPDATER` | 未设置 | 设了就关掉自动更新（CI / 容器） |
| `GROK_SANDBOX` | `off` | 沙箱 profile，等同 `--sandbox` |
| `GROK_SANDBOX_AUTO_ALLOW_BASH` | `0` | 沙箱激活时自动放行 bash |
| `GROK_RESPECT_GITIGNORE` | 跟随配置 | 强制搜索/读取过滤 gitignore |
| `GROK_WEB_FETCH` | `0` | 开启 `web_fetch` 工具，**默认关（安全考虑）** |
| `GROK_WEB_FETCH_PROXY` | — | `web_fetch` 的出口代理 |
| `GROK_MEMORY` | `0` | 跨会话记忆 |
| `GROK_SUBAGENTS` | `0` | 开启 subagent / task 工具（`1`/`0`）。[subagents](https://docs.x.ai/build/features/subagents) 页同时写 “Enabled by default when the setting is unset.” 两处官方说法不一致——不要猜哪个赢，以本机 `grok inspect` 为准。 |
| `GROK_WRITE_FILE` | `1` | 设 `0` 关掉 `write` 工具（只读会话） |
| `GROK_TOOL_SEARCH` | `1` | 大工具集的按需 MCP 工具发现 |
| `GROK_LSP_TOOLS` | `0` | LSP 代码智能工具 |
| `GROK_AGENT` | `grok-build` | 内置 agent 名、profile 或 agent 定义的绝对路径 |
| `GROK_AGENT_DASHBOARD` | — | 设 `0` 关掉 Agent Dashboard |
| `GROK_WORKFLOWS` | — | 设 `0` 关掉 workflow |
| `GROK_THEME` | 内置 | 配色主题 |
| `GROK_MCP_STARTUP_TIMEOUT_SECS` | `30` | 全局 MCP 启动握手超时，单位**秒** |
| `MCP_TIMEOUT` | 同一套 | Claude 兼容的 MCP 启动超时，单位**毫秒**，比上一条先被检查 |
| `GROK_LOG_FILE` | — | 日志写到这个路径 |
| `RUST_LOG` | — | 日志过滤器（如 `debug`） |
| `GROK_CRASH_HANDLER` | `0` | panic 时把报告写到 `$GROK_HOME/crash/` |
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | 系统 | 标准代理变量 |

兼容扫描器开关默认全开：`GROK_CURSOR_{SKILLS,RULES,AGENTS,MCPS,HOOKS}_ENABLED`、`GROK_CLAUDE_{SKILLS,RULES,AGENTS,MCPS,HOOKS}_ENABLED`。

UI 类变量还有 `GROK_SHOW_THINKING_BLOCKS`、`GROK_GROUP_TOOL_VERBS`、`GROK_COLLAPSED_EDIT_BLOCKS`、`GROK_PROMPT_SUGGESTIONS`、`GROK_SCROLL_SPEED`、`GROK_SCROLL_MODE`、`GROK_SCROLL_LINES`、`GROK_INVERT_SCROLL`、`GROK_DEFAULT_SELECTED_PERMISSION`、`GROK_REMEMBER_TOOL_APPROVALS`、`GROK_MOUSE_REPORTING_TOGGLE`、`GROK_DISPLAY_REFRESH_AUTO_CADENCE`，完整默认值见官方 [Settings Reference](https://docs.x.ai/build/settings/reference)。

## Hook 事件

| 事件 | 触发时机 |
| --- | --- |
| `SessionStart` / `SessionEnd` | 会话开始 / 结束 |
| `UserPromptSubmit` | 你提交 prompt |
| `PreToolUse` | 工具即将运行 —— **唯一可阻塞的事件** |
| `PostToolUse` / `PostToolUseFailure` | 工具完成 / 失败 |
| `PermissionDenied` | 权限系统拒绝了一次调用 |
| `Stop` / `StopFailure` | turn 结束 / 因 API 错误结束 |
| `Notification` | agent 发通知 |
| `SubagentStart` / `SubagentStop` | subagent 开始 / 结束 |
| `PreCompact` / `PostCompact` | 对话压缩前 / 后 |

退出码 0 放行，退出码 2 拦截，其余情况（超时、崩溃、格式错误）**全部 fail-open**。

## 模型与计费

来源：[Models](https://docs.x.ai/developers/models)。价格单位是每 100 万 token 的美元。

| 模型 | 上下文 | Input | Cached input | Output |
| --- | --- | --- | --- | --- |
| `grok-4.6`（prompt < 200k） | 500k | $2.00 | $0.50 | $6.00 |
| `grok-4.6`（prompt ≥ 200k） | 500k | $4.00 | $1.00 | $12.00 |
| `grok-build-0.1`（prompt < 200k） | 256k | $1.00 | $0.20 | $2.00 |
| `grok-build-0.1`（prompt ≥ 200k） | 256k | $2.00 | $0.40 | $4.00 |

长上下文计费规则：**prompt 达到阈值时，该请求的全部 token 都按高档价算**，不是超出部分才涨价。

官方选型建议：

> For everything else, including code, use Grok 4.6. It is the most intelligent and fastest model we've built.

`grok-4.6` 的知识截止日期是 2026 年 2 月 1 日。模型别名规则：`<modelname>` 指向最新稳定版，`<modelname>-latest` 指向最新版，`<modelname>-<date>` 锁死某次发布。

其他模型（`grok-4.5`、`grok-4.3`、`grok-4.20-*` 系列、Imagine 图像视频、Voice）的价格见官方页面。

## 高质量信息源

最后核实：2026-08-18。按可信度和时效排序。**changelog 可以比 [CLI Reference](https://docs.x.ai/build/cli/reference) 更早上新命令**（调研记录里 `grok du`、`grok trace` 就是先出现在 changelog），遇到文档没写的行为先查它。

### 一手官方

| 来源 | 用途 |
| --- | --- |
| [docs.x.ai/build/overview](https://docs.x.ai/build/overview) | Grok Build 文档入口 |
| [docs.x.ai/build/cli/reference](https://docs.x.ai/build/cli/reference) | 子命令与 flag |
| [docs.x.ai/build/cli/headless-scripting](https://docs.x.ai/build/cli/headless-scripting) | headless 与 ACP |
| [docs.x.ai/build/cli/terminal-support](https://docs.x.ai/build/cli/terminal-support) | 终端兼容与诊断 |
| [docs.x.ai/build/modes-and-commands](https://docs.x.ai/build/modes-and-commands) | 模式与斜杠命令全表 |
| [docs.x.ai/build/keyboard-shortcuts](https://docs.x.ai/build/keyboard-shortcuts) | 键位全表 |
| [docs.x.ai/build/settings](https://docs.x.ai/build/settings) | 配置层级与优先级 |
| [docs.x.ai/build/settings/reference](https://docs.x.ai/build/settings/reference) | 环境变量与 TOML 键全表 |
| [docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise) | 托管配置、SSO、ZDR、CI 权限模式 |
| [docs.x.ai/build/features/permissions](https://docs.x.ai/build/features/permissions) | 权限模型 |
| [docs.x.ai/build/features/sandbox](https://docs.x.ai/build/features/sandbox) | 沙箱 profile |
| [docs.x.ai/build/features/hooks](https://docs.x.ai/build/features/hooks) | hook 事件与脚本契约 |
| [docs.x.ai/build/features/mcp-servers](https://docs.x.ai/build/features/mcp-servers) | MCP 配置 |
| [docs.x.ai/build/features/skills-plugins-marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) | skill / plugin / marketplace |
| [docs.x.ai/build/features/sessions](https://docs.x.ai/build/features/sessions) | 会话、fork、rewind、compact |
| [docs.x.ai/build/features/worktrees](https://docs.x.ai/build/features/worktrees) | worktree |
| [docs.x.ai/build/features/subagents](https://docs.x.ai/build/features/subagents) | subagent 与 persona |
| [docs.x.ai/build/features/background-tasks](https://docs.x.ai/build/features/background-tasks) | 后台任务、`/loop`、monitor |
| [docs.x.ai/build/features/dashboard](https://docs.x.ai/build/features/dashboard) | Agent Dashboard |
| [docs.x.ai/developers/models](https://docs.x.ai/developers/models) | 模型列表与价格 |

### 效率技巧

| 技巧 | 说明 |
| --- | --- |
| [docs.x.ai/llms.txt](https://docs.x.ai/llms.txt) | 整个文档站的单文件全文镜像，适合本地 grep 或喂给模型（文件很大，别放进仓库）。最后核实 2026-08-18，HTTP 200。 |
| `https://docs.x.ai/api/mcp` | 官方文档 MCP 端点（Streamable HTTP、无状态），工具 `list_doc_pages` / `get_doc_page`。浏览器 GET/HEAD 不是文档页——2026-08-18：HEAD 405、GET/POST 406、OPTIONS 204。要用 MCP 客户端，不要当网页打开。 |
| `grok inspect --json` | 查"我这台机器上到底加载了什么"最快的手段 |

### 版本与源码

| 来源 | 用途 |
| --- | --- |
| [x.ai/build/changelog](https://x.ai/build/changelog) | 变更日志，比文档站更新快 |
| [x.ai/news/grok-build-cli](https://x.ai/news/grok-build-cli) | 发布公告（2026-05-25 early beta） |
| [x.ai/news/grok-4-6](https://x.ai/news/grok-4-6) | Grok 4.6 公告（提到 Grok Build 限时 2x included usage；没有长期配额数字） |
| [github.com/xai-org/grok-build](https://github.com/xai-org/grok-build) | 源码（Rust，Apache-2.0）；**不接受外部 PR**，反馈走 `/feedback` |
| [github.com/xai-org/plugin-marketplace](https://github.com/xai-org/plugin-marketplace) | 官方 plugin marketplace 目录 |
| [npmjs.com/package/@xai-official/grok](https://www.npmjs.com/package/@xai-official/grok) | npm 发布节奏与历史版本 |

**访问提示**（2026-08-18 复核）：`x.ai/build` 与 `x.ai/build/changelog` 对命令行 `curl` 返回 403（Cloudflare）。`x.ai/news/grok-build-cli` 与 `x.ai/cli/install.sh` 返回 200。上表 `docs.x.ai` 页面返回 200。npmjs.com HTML 返回 403；registry JSON `https://registry.npmjs.org/@xai-official/grok` 可读。

## 相关页面

- [Grok Build 学习地图](./index.md)
- [Grok Build 教程](./grok-cli.md)
- [Grok Build 实战手册](./grok-cookbook.md)
- [Grok Build 术语表](./grok-glossary.md)
