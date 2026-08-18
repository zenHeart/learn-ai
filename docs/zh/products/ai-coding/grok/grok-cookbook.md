# Grok Build 实战手册

面向"已经装好、能跑起来"的读者。每个配方都是一个具体任务：先说目标，再给命令或配置，最后说坑在哪。

不清楚安装和认证的先看 [Grok Build 教程](./grok-cli.md)；只想查命令的直接去 [速查表](./grok-cheatsheet.md)。

## 1. 从 Claude Code 迁移

Grok Build 对 Claude Code 的兼容是官方承诺的能力，不是社区 hack。官方原文：

> Grok is fully compatible with Claude Code with zero configuration needed.
> Grok automatically reads Claude Code marketplaces, plugins, skills, MCPs, agents, hooks, and instruction files (`CLAUDE.md`, `Claude.md`, `CLAUDE.local.md`, and `.claude/rules/`) alongside `.grok/`.
> — [Skills, Plugins & Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)

所以迁移的正确姿势是**什么都不改，先跑一次**：

```bash
cd your-claude-code-project
grok
grok inspect          # 看它到底读到了哪些配置、skill、hook、MCP
```

`grok inspect` 是迁移期最有用的命令，它会列出配置来源、instructions、skills、plugins、hooks 和 MCP servers（`--json` 输出机器可读格式）。

配套的迁移工具：

| 手段 | 作用 |
| --- | --- |
| `/import-claude` | 打开 Claude 设置导入弹窗 |
| `[compat.claude] mcps = false` | 关掉对 Claude MCP 配置的扫描 |
| `[compat.cursor] mcps = false` | 关掉对 Cursor MCP 配置的扫描 |

`[compat.claude]` / `[compat.cursor]` 下可单独开关 `skills` / `rules` / `agents` / `mcps` / `hooks`，默认全部 `true`。

CLI flag 也保留了 Claude Code 的别名：`--allowedTools`、`--disallowedTools`、`--append-system-prompt`、`--system-prompt`、`--dangerously-skip-permissions`。

**坑**：有一条兼容是**故意不做**的。Claude Code 的 `managed-settings.json` 里 `disableBypassPermissionsMode: "disable"` 不会作用到 Grok 的 always-approve 模式——官方明确说这是为了不让 Grok 继承宿主机的 Claude Code 封锁策略。要在 Grok 侧锁掉，得在 Grok 自己的 `requirements.toml` 里写 `[ui] disable_bypass_permissions_mode = true`。

## 2. 接入 MCP 外部工具

三种传输方式一条命令搞定：

```bash
# 本地 stdio server，-- 之后是 server 的启动命令
grok mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir

# 远端 HTTP server（OAuth 自动处理）
grok mcp add --transport http linear https://mcp.linear.app/mcp

# 远端 + 静态认证头（--header 可重复）
grok mcp add --transport http api https://mcp.example.com/mcp --header "Authorization: Bearer ${API_TOKEN}"
```

日常管理：`grok mcp list`、`grok mcp remove <name>`、`grok mcp doctor [name]`（诊断配置与连通性）。`list` 和 `doctor` 支持 `--json`。

写进配置文件的等价形式：

```toml
# ~/.grok/config.toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
env = { API_KEY = "${MY_API_KEY}" }   # ${VAR} 在加载时展开
startup_timeout_sec = 30              # 默认 30
tool_timeout_sec = 6000               # 默认 6000

[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"
headers = { "x-mcp-session-id" = "{{session_id}}" }
```

`url`、`command`、`args`、`env`、`headers` 里都支持 `${VAR}` 和 `${VAR:-default}` 展开，密钥可以留在环境变量里不落盘。OAuth token 存在 `~/.grok/mcp_credentials.json`。

要让 MCP 配置跟着仓库走，加 `--scope project`，它会写进当前目录的 `.grok/config.toml`。加载时 Grok 从当前目录一路向上走到 git 根目录读每一个 `.grok/config.toml`，**同名的项目级 server 会整体替换用户级的**（不是合并）。

**坑三条**：

1. MCP 工具在会话里的名字带命名空间：`<server>__<tool>`，写 allow / deny 规则时要用全名。
2. stdio server 启起来但连不上，去看 `~/.grok/logs/mcp/<server>.stderr.log`。
3. 冷启动要下载包的 `npx` server 经常在 30 秒默认超时内起不来，调大 `startup_timeout_sec`。

TUI 里 `/mcps` 打开 MCP 面板：`Space` 开关某个 server，`r` 改完配置后刷新，`i` 走 OAuth 认证，`a` / `x` 增删。

## 3. 用 hooks 拦住危险命令

hook 是生命周期事件触发的 shell 命令或 HTTP 端点。个人 hook 放 `~/.grok/hooks/*.json`，项目 hook 放 `<project>/.grok/hooks/*.json`。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bin/safety-check.sh", "timeout": 10 }]
      }
    ]
  }
}
```

`matcher` 是对工具名做匹配的正则（Claude 的工具名如 `Bash` / `Read` / `Edit` 会自动映射到 Grok 的），省略则匹配全部。`type` 取 `"command"` 或 `"http"`（后者要给 `url`，事件用 POST 发过去）。`timeout` 单位是秒，默认 5。

脚本契约：事件以 JSON 从 stdin 进来，含 `hookEventName`、`sessionId`、`cwd`、`workspaceRoot`，工具类事件还有 `toolName` 和 `toolInput`；环境变量里有 `GROK_HOOK_EVENT`、`GROK_HOOK_NAME`、`GROK_SESSION_ID`、`GROK_WORKSPACE_ROOT`。

要拦一个调用，`PreToolUse` 往 stdout 写：

```json
{ "decision": "deny", "reason": "Unsafe command detected" }
```

**关键行为**：退出码 0 放行，退出码 2 拦截。其余情况——超时、崩溃、输出格式不对——**全部 fail-open**，失败会记进会话但工具照样执行。只有显式 `deny` 才真拦得住。所以安全 hook 不能靠"脚本挂了就不放行"这种假设。

`PreToolUse` 是唯一的阻塞事件。全部事件：`SessionStart` / `SessionEnd`、`UserPromptSubmit`、`PreToolUse`、`PostToolUse` / `PostToolUseFailure`、`PermissionDenied`、`Stop` / `StopFailure`、`Notification`、`SubagentStart` / `SubagentStop`、`PreCompact` / `PostCompact`。

**坑**：项目 hook 要先信任才会跑。第一次打开带 hook 的仓库时用 `/hooks-trust` 授权，或者启动时加 `--trust`。决定存在 `~/.grok/trusted_folders.toml`，并且这个信任同时覆盖项目级 MCP 和 LSP server。

## 4. 收紧权限：团队仓库与不可信仓库

先记住官方那句区分：

> Permissions decide which tool calls may run. The sandbox is separate: it limits what an approved call can do on the filesystem and network.

**权限规则**写在 `[permission]`：

```toml
[permission]
rules = [
  { action = "allow", tool = "bash", pattern = "git *" },
  { action = "allow", tool = "read" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
]
```

支持的过滤器包含 `Bash`、`Edit`、`Read`、`Grep`、`MCPTool`、`WebFetch`、`WebSearch`。`deny` 永远赢过 `allow`。另外，即使你之前点过"always allow"，遇到 `rm`、`git push` 这类危险模式还是会再问一次。

**沙箱**是另一个开关，默认关闭（Linux 用 Landlock，macOS 用 Seatbelt）：

```bash
grok --sandbox workspace          # 一次性
```

```toml
[sandbox]
profile = "workspace"             # 或 GROK_SANDBOX=workspace
```

五个内置 profile 的定位：`off` 无限制（默认）、`workspace` 正常开发、`devbox` 云开发机、`read-only` 代码审查/审计、`strict` 不可信仓库。完整的读写/网络矩阵见 [速查表](./grok-cheatsheet.md#沙箱-profile)。

自定义 profile 写在 `~/.grok/sandbox.toml` 或项目 `.grok/sandbox.toml`：

```toml
[profiles.my-profile]
extends = "workspace"
restrict_network = true
deny = ["/secrets", "**/.env", "**/*.pem"]
```

内置名字（`off`、`workspace`、`read-only`、`strict`、`devbox`）不能被重定义。

**沙箱的三条局限**（官方明写，别想当然）：

1. 子进程网络限制只在 Linux 生效，macOS 上对 `read-only` / `strict` 是空操作。
2. 内置 profile **不会**永久保护 `~/.ssh` 之类路径，要自己写 `deny` 列表。
3. `~/.grok/` 在所有沙箱 profile 下都保持可写（否则会话没法持久化）；模型 API 和 web 工具不受子进程网络限制影响。

团队统一策略用 `requirements.toml`——它的优先级高于用户 `config.toml`、环境变量和远端设置。锁掉 always-approve：

```toml
[ui]
disable_bypass_permissions_mode = true
```

这条会堵住所有回退路径：`--yolo`、`--permission-mode bypassPermissions`、`Ctrl+O`、`/always-approve`、`Shift+Tab` 模式循环，以及 `*` / `**` 这类兜底 allow 规则。但注意**只有 root 拥有的来源才生效**（`/etc/grok/requirements.toml` 或系统层），用户可写的 `~/.grok/requirements.toml` 里写了不算，这是防篡改设计。

## 5. 在 CI 和脚本里跑 headless

CI 场景有两个专用权限模式：

| 模式 | 行为 | 典型场景 |
| --- | --- | --- |
| `dontAsk` | 静默拒绝一切没有显式 allow 的调用 | headless、CI |
| `acceptEdits` | 自动批准文件编辑，shell 命令仍然询问 | 半自动化流程 |

官方给的 headless 示例：

```bash
grok -p "Review the API changes" \
  --permission-mode dontAsk \
  --allow 'Bash(git *)' \
  --allow 'Bash(gh *)' \
  --allow 'Read' \
  --allow 'Grep' \
  --deny 'Bash(rm -rf *)' \
  --sandbox strict
```

要串多步自动化，把 session ID 读回来再传给 `-r`：

```bash
grok -p "Start the refactor" --output-format json | jq -r '.sessionId'
```

`--output-format` 三个取值：`plain`（默认）、`json`、`streaming-json`。

**坑**：`-s, --session-id` 是给新会话指定一个你自己生成的 UUID，**不是**用来恢复已有会话的；恢复用 `-r` / `--resume`。想在恢复的基础上分叉而不是接着写，加 `--fork-session`。

## 6. 并行开发：worktree + Dashboard

worktree 会话跑在仓库的隔离副本里，多个 agent 不会互相覆盖文件。位置在 `~/.grok/worktrees/<repo>/<name>`，从当前 HEAD 起（**包含未提交的改动**），需要是 git 仓库。

```bash
grok -w
grok --worktree=feat "refactor module X"   # = 让 prompt 不参与命名
grok -w --ref main "fix the flaky test"    # 从指定 ref 干净签出
grok -w -r <session-id>                    # 在新 worktree 里恢复会话
```

TUI 里：`/fork --worktree` 把当前会话分叉进 worktree；欢迎页 `Ctrl+W` 打开新建 worktree 对话框；Agent Dashboard 里 `Ctrl+W` 把新 agent 直接派进 worktree。

**坑**：worktree 不会自己消失。结束或删除会话都不会删掉它的 worktree，`gc` 只在你手动调用时才跑。

```bash
grok worktree list
grok worktree show <id>
grok worktree rm <ids...>          # --dry-run 先看
grok worktree gc --max-age 7d      # 清目录已消失的条目；--max-age 额外淘汰闲置的
```

多会话总览用 Dashboard：`Ctrl+\`、`/dashboard` 或 shell 里 `grok dashboard`。行按状态分组（Needs input / Working / Idle / Inactive / Completed / Failed）实时刷新，`Ctrl+G` 改成按目录分组。选中一行会开 peek 面板，直接打字就能回复——空闲的 agent 立刻收到，忙的排队；权限提示可以用数字键就地回答。分组和置顶状态存在 `[dashboard]` 段，`enabled = false` 或 `GROK_AGENT_DASHBOARD=0` 可关掉整个特性。

## 7. Subagents、Personas 和 Workflows

**Subagents** 是独立上下文的子会话，结束时把摘要交回父会话。[subagents](https://docs.x.ai/build/features/subagents) 原文：“Enabled by default when the setting is unset.” 同时 [settings/reference](https://docs.x.ai/build/settings/reference) 里 `GROK_SUBAGENTS` 的默认值是 `0`。两处官方说法不一致——不要猜哪个赢，以本机 `grok inspect` 为准。

<!-- TODO: 待核实 —— `[subagents] enabled` / `GROK_SUBAGENTS` 未设置时到底开还是关；功能页与环境变量表互相矛盾 -->

三个内置类型：

| 类型 | 角色 |
| --- | --- |
| `general-purpose` | 默认全能力子 agent |
| `explore` | 只读、列目录、搜索（无 shell、不改文件） |
| `plan` | 起草实现计划（无 shell、不改文件） |

自定义类型放 `.grok/agents/` 或 `~/.grok/agents/`，用 `/config-agents`（别名 `/agents`）管理。

**Personas** 只是行为叠加层（语气、关注点、契约），不改变能力；定义在 `[subagents.personas]` 或 `.grok/personas/*.toml` / `~/.grok/personas/*.toml`，用 `/personas` 管理。

**Workflows** 在后台编排一组有界的 subagent：扇出、验证、回传结果，默认开启。

```text
/create-workflow Review the current branch for bugs, then verify each finding
```

Grok 会问扇出方式、验证方式和范围，然后生成、冒烟测试并保存成 `.grok/workflows/<name>.rhai`（项目级）或 `~/.grok/workflows/<name>.rhai`（全局）。运行：

```text
/workflow review-changes {"target":"origin/main...HEAD"}
/workflow pause review-changes
/workflow resume review-changes
/workflow stop review-changes-2
```

`/workflows` 是全屏的实时运行看板，列的是**运行中和保留的 run，不是保存的文件**。内置研究工作流用 `/deep-research <query>`。关掉整个特性：`[workflows] enabled = false` 或 `GROK_WORKFLOWS=0`。

按类型路由模型：`[subagents.models]` 是 subagent → model id 的映射；`[subagents.toggle]` 单独开关某个类型。

## 8. 后台任务与定时巡检

`Ctrl+G` 开任务面板看当前所有运行中的东西，`/tasks` 在滚动区打一份快照；前台命令跑太久，`Ctrl+B` 把它降到后台而不是干等。滚动区里选中一个后台任务按 `x` 杀掉。

定时跑同一个 prompt：

```text
/loop 5m Check if the test suite passes and report any failures
```

间隔支持 `Ns`（最小 60）、`Nm`、`Nh`、`Nd`。**提交后立刻触发一次**，然后按间隔重复，每次触发都是一个新的 agent turn。硬限制：loop 7 天后过期，同时最多 50 个定时任务。

要的是实时事件流而不是周期检查，就让 agent 给脚本挂 monitor——脚本打的每一行都会变成会话里的一条通知。所以 monitor 脚本必须写得克制，**每一行输出都会打断对话**。

turn 运行中提交的 prompt 会进队列而不是被丢弃，`Ctrl+;` 开关队列面板，`/queue` 列出来。

区分清楚三个东西：background tasks（长跑进程和 monitor）、todos（`Ctrl+T`，多步计划的进度）、scheduled tasks（`/loop`）。

## 9. 会话管理与跨会话记忆

会话自动全量落盘在 `~/.grok/sessions/`，按工作目录索引，prompt、响应、工具调用、文件快照都在里面。TUI、headless、ACP 三种面行为一致。

| 操作 | 命令 |
| --- | --- |
| 恢复指定会话 | `grok --resume <session-id>` |
| 恢复本目录最近一个 | `grok --resume` / `grok -c` |
| TUI 里挑一个恢复 | `/resume` |
| 分叉当前会话 | `/fork [directive]`（`--worktree` / `--no-worktree`） |
| 回退到某个 turn | `/rewind` 或空闲时 `Esc Esc` |
| 压缩上下文 | `/compact [context]` |
| 查上下文占用 | `/context` 或 `/session-info` |
| 搜索历史会话 | `grok sessions search <query>` |
| 导出成 Markdown | `grok export <id> [file]`（`--clipboard` 复制） |

**坑**：`/rewind` 会**改磁盘上的文件**——它把所有文件恢复到那个时间点并截断对话，没提交 git 的改动就没了。

跨会话记忆默认关闭（`[memory] enabled` 默认 off）。开启方式：`--experimental-memory` flag、`[memory] enabled = true`，或 `GROK_MEMORY=1`。开启后多出三个 shell 提供的命令：`/flush`（立刻把对话记忆写盘）、`/memory`（别名 `/mem`，浏览管理记忆）、`/dream`（跑记忆整合）。单条记录用 `/remember <note>`。清理：`grok memory clear [--workspace|--global|--all]`。

## 10. Skills 和 Plugins

**Skill** 是一个装着 markdown 说明、脚本和资源的可复用目录。发现路径：`./.grok/skills/`（一路走到仓库根）、`~/.grok/skills/`、任何启用的 plugin 的 `skills/` 目录、`[skills] paths` 里的额外路径。user-invocable 的 skill 会同时以 `/<skill-name>` 出现在斜杠命令里。

`SKILL.md` 的 YAML frontmatter 字段（多余的 key 会被忽略）：

| 字段 | 说明 |
| --- | --- |
| `name` | 标识符，省略则用目录名 |
| `description` | 做什么、什么时候用；省略则取正文第一段 |
| `when-to-use` | 额外触发短语（别名 `when_to_use`） |
| `paths` | gitignore 风格 glob；直到碰到匹配文件才显现 |
| `allowed-tools` | **不授予也不限制工具**；接受 YAML 列表或逗号/空格分隔的字符串 |
| `argument-hint` | 斜杠命令自动补全提示 |
| `user-invocable` | 是否作为斜杠命令出现，默认 `true` |
| `disable-model-invocation` | 只做斜杠命令，不自动调用，默认 `false` |
| `metadata` | 字符串映射，`author` 和 `short-description` 会显示在 UI |

**两个反直觉点**：`allowed-tools` 名字听着像权限控制，但官方明确说它既不授权也不限制工具；`user-invocable` 只认字面量 `true`，写 `yes` 等于 `false`。另外 `model`、`effort`、`license`、`compatibility` 这四个字段 Grok 接受但**不生效**。

**Plugin** 带来额外的 skills、agents、hooks、MCP servers 和 LSP servers，从 `./.grok/plugins/`、`~/.grok/plugins/`、`~/.grok/plugins/marketplaces/`、`[plugins] paths`、`--plugin-dir <PATH>` 加载。plugin 的 hook 额外拿到 `GROK_PLUGIN_ROOT` 和 `GROK_PLUGIN_DATA` 环境变量。

`/plugins`、`/hooks`、`/skills`、`/mcps`、`/marketplace` 打开的是**同一个扩展弹窗**，只是预选了不同标签页。Marketplace 源来自 `[[marketplace.sources]]` 和 `~/.grok/plugins/known_marketplaces.json`。

`[skills] disabled` / `[plugins] disabled` 是"发现但不激活"，`[plugins] enabled` 用来显式启用（项目级 plugin 可能默认关闭）。

Grok 也会读 `AGENTS.md` 家族（`AGENTS.md`、`Agents.md`、`AGENT.md`，从 cwd 走到仓库根），以及 `~/.agents/skills/` 和 `~/.agents/commands/` 下的用户级 skill 与命令。

## 相关页面

- [Grok Build 学习地图](./index.md)
- [Grok Build 教程](./grok-cli.md) — 安装、认证、TUI、权限、headless
- [Grok Build 速查表](./grok-cheatsheet.md) — 命令、flag、配置键、环境变量
- [Grok Build 术语表](./grok-glossary.md) — 为什么这么设计
- [Grok Bot](./grok-bot.md) — 云电脑同事，不是这个 CLI
