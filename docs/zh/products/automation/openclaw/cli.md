# OpenClaw CLI 命令参�?
> 本章节提�?OpenClaw 所�?CLI 命令的完整参考，按功能模块组织�?> **前置知识**：已完成 OpenClaw 安装并了解基本概念�?
---

## 1. 基础命令

### 1.1 帮助与版�?
```bash
# 查看全局帮助
openclaw --help

# 查看特定命令帮助
openclaw <command> --help

# 查看版本
openclaw --version
```

### 1.2 状态检�?
```bash
# 查看 Gateway 运行状�?openclaw status

# 运行诊断检�?openclaw doctor

# 自动修复诊断问题
openclaw doctor --fix
```

---

## 2. Gateway 管理

### 2.1 启动与停�?
```bash
# 启动 Gateway（默认端�?18789�?openclaw gateway

# 指定端口启动
openclaw gateway --port 18790

# 强制启动（跳过配置检查）
openclaw gateway --force

# 允许未配置模式启�?openclaw gateway --allow-unconfigured

# 带详细日志启�?openclaw gateway --verbose

# 停止 Gateway
openclaw gateway stop
```

### 2.2 Daemon 安装与管�?
```bash
# 安装为系统服务（自动后台运行�?openclaw onboard --install-daemon

# 查看 daemon 状�?openclaw gateway status

# 重启 daemon
openclaw gateway restart

# 卸载 daemon
openclaw onboard --uninstall-daemon
```

### 2.3 配置热重�?
Gateway 启动后，修改 `~/.openclaw/openclaw.json` 会自动热重载。热重载模式�?
| 模式 | 行为 |
|------|------|
| `hybrid`（默认） | 安全更改即时生效，关键更改需重启 |
| `hot` | 仅热应用安全更改 |
| `restart` | 任何更改都重�?Gateway |
| `off` | 禁用热重�?|

---

## 3. 通道管理

### 3.1 通道登录

```bash
# 登录通道（交互式二维码）
openclaw channels login --channel <channel>

# 指定账户登录
openclaw channels login --channel <channel> --account <account-name>

# 示例：WhatsApp 登录
openclaw channels login --channel whatsapp

# 示例：飞书登�?openclaw channels login --channel feishu --account default
```

### 3.2 通道状态与测试

```bash
# 查看所有通道状�?openclaw channels status

# 测试特定通道连接
openclaw channels test <channel-id>

# 查看通道详细日志
openclaw gateway --verbose | Select-String "<channel-name>"
```

### 3.3 配对管理

```bash
# 列出待处理配对请�?openclaw pairing list <channel>

# 批准配对请求
openclaw pairing approve <channel> <code>

# 拒绝配对请求
openclaw pairing reject <channel> <code>

# 示例
openclaw pairing list telegram
openclaw pairing approve telegram ABCD1234
```

> **注意**：配对码 8 位大写字母，1 小时后过期，每个通道最�?3 个待处理请求�?
---

## 4. 模型管理

### 4.1 模型列表与状�?
```bash
# 列出所有可用模�?openclaw models list

# 查看当前模型使用状�?openclaw models status
```

### 4.2 模型配置

```bash
# 设置默认主模�?openclaw models set <model-id>

# 示例
openclaw models set anthropic/claude-opus-4-6

# 添加模型别名
openclaw models aliases add <alias-name> <model-id>

# 示例
openclaw models aliases add Opus anthropic/claude-opus-4-6

# 列出所有别�?openclaw models aliases list

# 添加备用模型
openclaw models fallbacks add <model-id>

# 列出备用模型
openclaw models fallbacks list
```

---

## 5. 会话管理

### 5.1 会话列表与查�?
```bash
# 列出所有会�?openclaw sessions list

# 查看特定会话详情
openclaw sessions view <session-key>

# 搜索会话内容
openclaw sessions search <query>

# 示例会话键格�?# 私聊: agent:tars:user:ou_xxx
# 群聊: agent:tars:feishu:group:oc_xxx
# 定时任务: cron:job_xxx
```

### 5.2 会话维护

```bash
# 清理旧会话（根据 maintenance 配置�?openclaw sessions prune

# 强制清理所有会�?openclaw sessions prune --all

# 导出会话历史
openclaw sessions export --session <session-key> --output <file>
```

---

## 6. 配置管理

### 6.1 配置编辑�?
```bash
# 交互式配置向�?openclaw configure

# 引导式首次配�?openclaw onboard
```

### 6.2 配置读写

```bash
# 读取配置�?openclaw config get <key>

# 示例
openclaw config get agents.defaults.workspace
openclaw config get channels.feishu.enabled

# 写入配置�?openclaw config set <key> <value>

# 示例
openclaw config set agents.defaults.heartbeat.every "2h"
openclaw config set session.maintenance.mode "enforce"

# 删除配置�?openclaw config unset <key>

# 示例
openclaw config unset agents.defaults.subagents
```

### 6.3 配置验证

```bash
# 验证配置文件语法
openclaw config validate

# 查看当前完整配置（脱敏后�?openclaw config show
```

---

## 7. 工具管理

### 7.1 工具测试

```bash
# 测试 exec 工具
openclaw tools test exec --command "ls -la"

# 测试 browser 工具
openclaw tools test browser --url "https://example.com"

# 测试 web-fetch 工具
openclaw tools test web-fetch --url "https://example.com"
```

### 7.2 工具列表

```bash
# 列出所有可用工�?openclaw tools list

# 查看工具详细信息
openclaw tools info <tool-name>
```

---

## 8. MCP 管理

### 8.1 MCP 状态与工具

```bash
# 查看 MCP 连接状�?openclaw mcp status

# 列出可用�?MCP 工具
openclaw mcp tools list

# 测试 MCP Server 连接
openclaw mcp debug <server-name>
```

### 8.2 MCP Server 管理

```bash
# 启动 MCP Server
openclaw mcp start <server-name>

# 停止 MCP Server
openclaw mcp stop <server-name>

# 重启 MCP Server
openclaw mcp restart <server-name>
```

---

## 9. 插件管理

### 9.1 插件列表与状�?
```bash
# 列出已安装插�?openclaw plugins list

# 查看插件详细状�?openclaw plugins status <plugin-id>

# 查看所有可用插件（包括未安装）
openclaw plugins search <keyword>
```

### 9.2 插件安装与卸�?
```bash
# 安装插件
openclaw plugins install <plugin-name>

# 示例
openclaw plugins install openclaw-channel-telegram

# 更新插件
openclaw plugins update <plugin-name>

# 更新所有插�?openclaw plugins update --all

# 卸载插件
openclaw plugins uninstall <plugin-name>
```

### 9.3 插件启用与禁�?
```bash
# 启用插件
openclaw plugins enable <plugin-id>

# 禁用插件
openclaw plugins disable <plugin-id>
```

---

## 10. Cron 与定时任�?
### 10.1 Cron 任务管理

```bash
# 列出所�?Cron 任务
openclaw cron list

# 查看特定任务详情
openclaw cron view <job-id>

# 手动触发任务
openclaw cron trigger <job-id>

# 暂停任务
openclaw cron pause <job-id>

# 恢复任务
openclaw cron resume <job-id>

# 删除任务
openclaw cron delete <job-id>
```

### 10.2 Cron 任务创建

```bash
# 创建一次性任务（延迟执行�?openclaw cron schedule --delay "1h" --agent <agent-id> --input <task-description>

# 创建定时任务
openclaw cron schedule --cron "0 9 * * *" --agent <agent-id> --input <task-description>
```

---

## 11. 工作区管�?
### 11.1 工作区操�?
```bash
# 初始化工作区（创建必要文件）
openclaw workspace init

# 验证工作区结�?openclaw workspace validate

# 备份工作�?openclaw workspace backup --output <path>

# 恢复工作�?openclaw workspace restore --input <path>
```

### 11.2 工作区文�?
```bash
# 打开工作区目�?openclaw workspace open

# 编辑 AGENTS.md
openclaw workspace edit agents

# 编辑 SOUL.md
openclaw workspace edit soul
```

---

## 12. 日志管理

### 12.1 日志查看

```bash
# 查看 Gateway 日志
openclaw logs gateway

# 查看通道日志
openclaw logs channel <channel-name>

# 查看会话日志
openclaw logs session <session-key>

# 实时跟踪日志
openclaw logs tail

# 按关键字过滤
openclaw logs gateway --filter <keyword>

# 示例
openclaw logs gateway --filter "error"
openclaw logs channel feishu --filter "message"
```

### 12.2 日志配置

```bash
# 设置日志级别
openclaw logs level <level>

# 级别：trace, debug, info, warn, error
openclaw logs level debug

# 导出日志
openclaw logs export --start <timestamp> --end <timestamp> --output <file>
```

---

## 13. 仪表�?
### 13.1 仪表板访�?
```bash
# 打开 Web 控制界面
openclaw dashboard

# 指定端口打开
openclaw dashboard --port 18789

# 只读模式打开
openclaw dashboard --readonly
```

### 13.2 仪表板功�?
| 功能 | 说明 |
|------|------|
| 会话监控 | 实时查看活跃会话 |
| 消息�?| 监控消息处理状�?|
| 模型状�?| 查看模型调用统计 |
| 通道状�?| 查看各通道连接状�?|
| 日志查看 | 图形化日志查看器 |
| 配置编辑 | 可视化配置编辑器 |

---

## 14. 升级与维�?
### 14.1 版本升级

```bash
# 检查更�?openclaw update check

# 执行更新
openclaw update install

# 更新到指定版�?openclaw update install --version <version>

# 查看更新历史
openclaw update changelog
```

### 14.2 备份

```bash
# 完整备份
openclaw backup create --output <path>

# 增量备份
openclaw backup create --incremental

# 列出可用备份
openclaw backup list

# 恢复备份
openclaw backup restore --input <path>
```

---

## 15. 快速命令索�?
| 命令 | 功能 |
|------|------|
| `openclaw status` | 查看运行状�?|
| `openclaw doctor` | 诊断配置问题 |
| `openclaw gateway` | 启动 Gateway |
| `openclaw dashboard` | 打开控制界面 |
| `openclaw channels login` | 登录通道 |
| `openclaw pairing approve` | 批准配对请求 |
| `openclaw models set` | 设置默认模型 |
| `openclaw sessions list` | 列出会话 |
| `openclaw config get` | 读取配置 |
| `openclaw config set` | 写入配置 |
| `openclaw logs tail` | 实时日志 |
| `openclaw update install` | 更新版本 |

---

## 延伸阅读

- [快速入门](../index)
- [配置详解](../index)
- [通道配置](../index)
- [部署指南](./deployment.md)
