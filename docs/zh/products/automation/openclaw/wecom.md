# 企业微信接入指南

> **前置知识**：本章节面向具备基础 TypeScript/Node.js 经验的开发者。
> **目标读者**：希望在 OpenClaw 中接入企业微信即时通讯的用户。
> **维护状态**：本文档由实战经验总结得来，当前维护版本基于 OpenClaw v2026.3+。

---

## 目录

1. [环境要求](#1-环境要求)
2. [企业微信创建机器人](#2-企业微信创建机器人)
3. [OpenClaw 配置](#3-openclaw-配置)
4. [运行与验证](#4-运行与验证)
5. [企业微信 CLI（文档能力）](#5-企业微信-cli文档能力)
6. [常见问题-faq](#6-常见问题-faq)
7. [安全注意事项](#7-安全注意事项)

---

## 1. 环境要求

| 组件 | 版本要求 | 备注 |
|------|----------|------|
| Node.js | ≥ 22.0 | 企业微信插件需要 Node 22+ |
| pnpm | 最新版 | 也支持 npm/yarn |
| OpenClaw | v2026.3+ | 包含企业微信长连接支持 |
| 企业微信 | 最新版 | 需支持长连接机器人 |

**检查本地环境：**

```bash
node --version   # 应为 v22+
pnpm --version   # 最新版
openclaw --version  # 确认已安装
```

---

## 2. 企业微信创建机器人

### 2.1 创建长连接机器人

1. 打开**企业微信** → 点击**工作台**
2. 找到**智能机器人** → 点击"创建机器人"
3. 选择 **API 模式** → 连接方式选择 **"长连接"**
4. 系统会生成 **Bot ID** 和 **Secret**，**妥善保存**
5. 配置可见成员范围，保存机器人

> ⚠️ **重要**：Bot ID 和 Secret 是敏感信息，请妥善保管，切勿泄露或提交到代码仓库。

### 2.2 获取机器人凭证

创建完成后，在机器人详情页可查看：
- **Bot ID**：格式 `xxxxxxxxxx`
- **Secret**：格式 `xxxxxxxxxx`

---

## 3. OpenClaw 配置

### 3.1 安装企业微信插件

```bash
openclaw plugins install @wecom/wecom-openclaw-plugin
```

### 3.2 配置机器人凭证

```bash
# 设置 Bot ID
openclaw config set channels.wecom.botId <YOUR_BOT_ID>

# 设置 Secret
openclaw config set channels.wecom.secret <YOUR_SECRET>
```

### 3.3 重启 Gateway

```bash
openclaw gateway restart
```

### 3.4 验证通道状态

```bash
openclaw channels status
```

预期输出：
```
- 企业微信 default: enabled, configured, running
```

---

## 4. 运行与验证

### 4.1 配对（首次使用）

1. 在企业微信中找到你的机器人
2. 给机器人发送任意消息
3. 系统会提示配对码，按提示完成配对
4. 配对成功后即可正常使用

### 4.2 测试消息收发

尝试发送：
- `你好` → 应收到回复
- `状态` → 应收到 OpenClaw 状态信息

### 4.3 常见连接问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| `not configured` | 凭证未设置 | 检查 botId 和 secret 是否正确配置 |
| `stopped` | Gateway 未重启 | 执行 `openclaw gateway restart` |
| 收不到消息 | 机器人未添加到企业 | 确认机器人可见范围包含你的账号 |

---

## 5. 企业微信 CLI（文档能力）

企业微信 CLI 是企业微信官方提供的命令行工具，可通过 npm 安装：

### 5.1 安装 CLI

```bash
npm install -g @wecom/cli
```

### 5.2 安装 Skills（推荐）

企业微信 CLI 支持 OpenClaw Skills，可一键安装所有能力：

```bash
npx skills add WeComTeam/wecom-cli -y -g
```

安装的 Skills 包含：

| Skill | 功能 |
|-------|------|
| `wecomcli-doc` | 文档读写（腾讯文档、智能表格） |
| `wecomcli-contact` | 通讯录查询 |
| `wecomcli-msg` | 消息收发 |
| `wecomcli-schedule` | 日程管理 |
| `wecomcli-meeting` | 会议管理 |
| `wecomcli-todo` | 待办管理 |
| `wecomcli-smartsheet` | 智能表格高级操作 |

### 5.3 CLI 命令一览

```bash
wecom-cli --help                    # 查看所有命令
wecom-cli doc --help               # 文档操作
wecom-cli contact --help           # 通讯录操作
wecom-cli msg --help               # 消息操作
wecom-cli schedule --help           # 日程操作
wecom-cli meeting --help           # 会议操作
wecom-cli todo --help              # 待办操作
```

### 5.4 读取腾讯文档示例

```bash
# 通过 URL 读取文档内容
wecom-cli doc get_doc_content '{"url": "https://doc.weixin.qq.com/doc/xxx", "type": 2}'

# 创建新文档
wecom-cli doc create_doc '{"doc_type": 3, "doc_name": "项目周报"}'
```

> **提示**：文档 URL 不同路径对应不同品类：
> - `/doc/` → 普通文档
> - `/smartsheet/` → 智能表格
> - `/smartpage/` → 智能文档（需使用导出接口）

---

## 6. 常见问题 FAQ

### Q: 企业微信机器人和企业微信 Channel 是什么关系？

**答**：企业微信 Channel 是 OpenClaw 接收企业微信消息的通道，企业微信 CLI 是操作企业微信数据的工具（如读写腾讯文档）。两者协同工作：
- **Channel**：让 OpenClaw 能接收和回复企业微信消息
- **CLI**：让 OpenClaw 能操作企业微信中的文档、日程等数据

### Q: 支持多个企业微信机器人吗？

**答**：支持。OpenClaw 企业微信 Channel 支持多机器人配置：

```bash
# 添加第一个机器人
openclaw channels add --channel wecom --bot-token <BOT_ID_1> --secret <SECRET_1> --name robot1

# 添加第二个机器人
openclaw channels add --channel wecom --bot-token <BOT_ID_2> --secret <SECRET_2> --name robot2
```

### Q: 企业微信和飞书可以同时使用吗？

**答**：可以。OpenClaw 支持同时配置多个 Channel，互不干扰。你可以在同一个 OpenClaw 实例中同时使用飞书和企业微信。

### Q: 机器人显示 `enabled, configured, stopped` 怎么办？

**答**：执行以下步骤：

```bash
# 1. 确认凭证正确
openclaw config get channels.wecom

# 2. 重启 Gateway
openclaw gateway restart

# 3. 再次检查状态
openclaw channels status
```

### Q: 企业微信 CLI 需要认证吗？

**答**：CLI 的部分功能需要初始化配置。初始化命令：

```bash
wecom-cli init
```

按提示选择认证方式（通常为扫码认证）。

---

## 7. 安全注意事项

1. **凭证保管**：Bot ID 和 Secret 属于敏感信息，切勿提交到代码仓库或公开分享
2. **环境变量**：建议将敏感信息存储在环境变量中，而非硬编码
3. **最小权限**：机器人的可见范围应限制在最小必要范围内
4. **定期轮换**：建议定期更换机器人 Secret
5. **日志保护**：OpenClaw 日志可能包含敏感信息，请妥善保管日志文件

### 推荐的环境变量配置方式

```bash
# 通过环境变量设置凭证（不推荐写在配置文件中）
openclaw config set channels.wecom.botId $WECOM_BOT_ID
openclaw config set channels.wecom.secret $WECOM_SECRET
```
