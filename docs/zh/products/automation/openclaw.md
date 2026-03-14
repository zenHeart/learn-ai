# openclaw 飞书接入

---

## 1. 基础安装阶段 (从零开始)

### 1. 环境依赖

- **Node.js**: 必须 v20 或 v24+（当前系统为 v24.14.0）。
- **包管理器**: 推荐 `pnpm`。
- **核心安装**:

  ```powershell
  pnpm add -g openclaw
  ```

### 2. 飞书开发者后台初始化

- **创建应用**: 进入 [飞书开放平台](https://open.feishu.cn/) 创建“企业自建应用”。
- **凭据提取**: 记录 `App ID` 和 `App Secret`。
- **开启机器人**: 在“应用功能”中启用机器人能力。

---

## 2. 核心配置与实战纠错史 (重点保留)

在联调过程中，我们经历了以下三个关键阶段的修复，请后来者严格对照：

### 1. 飞书长连接 (WebSocket) 的“顺序陷阱”

- **现象**: 网页配置显示“未检测到应用连接信息”，无法保存。
- **真相**: 飞书要求**本地网关必须先运行**并发出握手信号，网页端才能点击保存。
- **正确操作**: 先在本地执行 `openclaw gateway`，看到 `ws client ready` 日志后，再回网页点“保存”。

### 2. 权限拦截与“静默无响应”

- **现象**: 飞书显示消息已发送，龙虾日志显示已接收，但没有任何回复。
- **报错追踪**: `Access denied... im:message.reactions:write_only`。
- **修复**: 必须在飞书权限管理中开启 **“发送/删除消息表情回复”**。
- **原理**: 龙虾回复前会先点个“思考”表情，没权限会导致整个回复逻辑中断。

### 3. MiniMax 的“协议伪装”与 404 修复

- **现象**: 龙虾调用模型报 `HTTP 404 Not Found`。
- **原因**: MiniMax M2.5 模拟的是 Anthropic 协议，若按 `openai` 格式发包会找不到路径。
- **最终修正**: 必须将提供商设为 `anthropic`，且 `baseUrl` 设为 `https://api.minimaxi.com/anthropic`（不带 v1）。

---

## 3. 最终验证成功的配置文件 (openclaw.json)

路径: `C:\Users\用户名\.openclaw\openclaw.json`

```json
{
  "meta": { "lastTouchedVersion": "2026.3.12" },
  "agents": {
    "defaults": {
      "model": { "primary": "anthropic/minimax-m2.5" },
      "hooks": ["session-memory", "command-logger"]
    }
  },
  "models": {
    "providers": {
      "anthropic": {
        "baseUrl": "https://api.minimaxi.com/anthropic",
        "apiKey": "sk-cp-...",
        "models": [{ "id": "minimax-m2.5", "name": "MiniMax M2.5" }]
      }
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "connectionMode": "websocket",
      "accounts": {
        "default": {
          "appId": "YOUR_APP_ID",
          "appSecret": "YOUR_APP_SECRET"
        }
      },
      "allowFrom": ["ou_xxxxxxxx"],
      "dmPolicy": "allow"
    }
  },
  "gateway": { "mode": "local" }
}
```

**注意**: `allowFrom` 必须是**数组格式**，否则会报 `.map is not a function`。

---

## 4. 运行、调试与维护进阶 (V4.0 补充包)

### 1. 进程净化 (关键运维指令)

在修改配置后，若网关启动报 `already running`，请执行此精准清理脚本（防误杀 Gemini）：

```powershell
Get-WmiObject Win32_Process -Filter "name='node.exe'" | Where-Object { $_.CommandLine -notlike "*gemini-cli*" } | ForEach-Object { Stop-Process $_.ProcessId -Force }
```

### 2. 飞书权限全清单 (Checklist)

确保应用发布版本中包含以下全部权限：

- [x] `im:message` (消息基础)
- [x] `im:message.p2p_msg:readonly` (读取单聊)
- [x] `im:message.reactions:write_only` (**核心：不开启必死**)
- [x] `im:message:send_as_bot` (机器人发言)
- [x] `im:chat:readonly` (群组信息)
- [x] `im:message.group_at_msg:readonly` (接收群组@)

### 3. 配置严苛性警告 (Schema Strictness)

龙虾（OpenClaw）对配置文件实行**强校验**。请勿在 `providers` 或 `defaults` 中手动添加非文档注明的字段（如 `stream: true` 或在不正确位置加 `hooks`），这会导致网关静默启动失败。

### 4. 隐身运行模式

```powershell
Start-Process node -ArgumentList 'path/to/openclaw.mjs', 'gateway', '--force', '--allow-unconfigured' -WindowStyle Hidden
```

---

## 5. 延伸阅读与进阶资料

- **OpenClaw 官方文档**: [https://docs.openclaw.ai](https://docs.openclaw.ai)
- **ClawHub 技能广场**: [https://openclaw.ai/skills](https://openclaw.ai/skills)
- **MiniMax 接入指南**: [MiniMax 开发者文档](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools)

## 6. 性能优化尝试与回滚记录 (实战避坑)

### 1. 流式输出 (Streaming) 的尝试

- **尝试动作**: 在 openclaw.json 中开启 streaming: true 和
enderMode: "card"。
- **结果**: **失败**。表现为飞书发送消息后龙虾无任何响应，或后台出现 400/404 报错。
- **失败原因**:
  1. MiniMax 的 Anthropic 兼容接口在“交互式卡片”渲染模式下可能存在协议握手不匹配。
  2. 龙虾在开启 stream 键值时，容易触发配置文件 Schema 校验错误（Unrecognized key）。
- **最佳实践结论**: 对于 MiniMax + 飞书的组合，建议**保持默认的
enderMode: "raw"（纯文本模式）**。虽然没有逐字蹦出的打字效果，但能确保 100% 的响应成功率。

### 2. 配置修改的危险动作

- **警告**: 禁止直接在 models.providers.anthropic 下手动添加 stream 字段。
- **后果**: 会导致网关因配置非法而拒绝启动，且不会在飞书端给出任何错误提示。
