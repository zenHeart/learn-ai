# ChatGPT 套餐与 Codex 访问

> Codex 访问权如何挂在 ChatGPT 套餐上、套餐之间真正差在哪、数字该去哪查。
>
> **本页故意不写价格和配额数字。** 那些数字会变，教程里留一个过期数字比没有更糟。唯一权威来源是[官方定价页](https://learn.chatgpt.com/docs/pricing)。

## Codex 包含在 ChatGPT 套餐里

官方产品落地页原文：

> ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex.

对 CLI 来说，关键事实是：**不用单独买 Codex，日常使用也不用先配 API Key。** 用 ChatGPT 账号登录即可。

[定价页](https://learn.chatgpt.com/docs/pricing)另外列出 **Free** 和 **Go** 也包含部分 Codex 能力。明确写出「网页 / CLI / IDE 扩展 / iOS」的是 Plus 卡片。入口和额度按套餐不同——去定价页看，不要信教程里的表。

```bash
codex login
codex login status    # 已保存凭证时退出码为 0
codex doctor          # 本地诊断报告
```

官方 CLI 参考里**没有** `codex status` 子命令。当前会话的账号、模型、配置，用 TUI 里的 `/status`。

## 套餐差在哪

与其复制一张下个月就会过期的表，不如知道读定价页时该盯哪些维度：

| 会变的东西 | 为什么在乎 |
| --- | --- |
| 触顶之前的包含用量 | 重度 Agent 工作一天能撑多久 |
| 模型访问 | 最新或最快的模型你能不能用 |
| Cloud 执行容量 | 能往 `codex cloud` 丢多少 |
| 管理与治理 | 能不能用 `requirements.toml` 在团队里强制策略 |
| 席位管理 | 按人还是按组织 |

两件有出处、值得记住的事：

- **ChatGPT Pro** 包含研究预览模型 `GPT-5.3-Codex-Spark`。
- **Business / Edu / Enterprise** 才是托管配置真正有意义的套餐——管理员能钉住什么，见 [requirements.toml](./codex-glossary#requirementstoml-managed-policy)。

任何数字都去 [learn.chatgpt.com/docs/pricing](https://learn.chatgpt.com/docs/pricing) 查。

## 看自己的消耗

会话内查询比事后翻仪表盘有用：

```
/usage              # 当前会话
/usage daily
/usage weekly
/usage cumulative
```

`/status` 显示当前会话的账号、模型、配置。

两个习惯能让消耗可预期：

**推理强度匹配任务。** `model_reasoning_effort` 从 `minimal` 到 `xhigh`。一行重命名开 high 是浪费；隐蔽的并发 bug 开 low 是假节约。

```toml
model_reasoning_effort = "medium"
```

**别扛着死上下文。** 跑偏的长会话会把预算花在重读已经无关的历史。不相关任务之间 `/clear`，是最便宜的优化。

## API 计费是另一条线

下面两件事走 OpenAI API 账单，而不是 ChatGPT 套餐，而且都是**选择加入**：

- **自定义 model provider。** `model_providers` 指到你自己的端点时，按那个端点计费。
- **大批量图像生成。** 图像生成默认吃包含额度，文档写消耗大约是文本的 3 到 5 倍。设置 `OPENAI_API_KEY` 会把大批量切到 API 定价。

用 `codex login` 的日常 CLI 使用，这两条都不适用。从没设过 `OPENAI_API_KEY`、没碰过 `model_providers`，用量就在 ChatGPT 套餐上。

> 当前配置参考里没有 `api_key` 这个键。认证是 `codex login`，或在 provider 条目里用 `env_key` 指向环境变量。<!-- TODO: 待核实 --> 更老的教程有时会在 `config.toml` 里写 `api_key`；现行官方参考里没有这一项。

## 企业与团队部署

团队落地时，真正相关的不是套餐页，而是托管策略层：

| 关注点 | 机制 |
| --- | --- |
| 限制可选审批策略 | `requirements.toml` 的 `allowed_approval_policies` |
| 限制沙箱模式 | `allowed_sandbox_modes` |
| 限制网页搜索 | `allowed_web_search_modes`（`disabled` 始终允许） |
| MCP 服务器白名单 | 带 `identity` 块的 `mcp_servers` 条目 |
| 钉死 feature flag | `requirements.toml` 的 `[features]` |
| 数据驻留 | `enforce_residency` |

托管 permission-profile 白名单需要 **Codex 0.138.0 或更高**。0.137.0 及更早的客户端会静默忽略 `allowed_permission_profiles` 和托管 `default_permissions`——没核对客户端版本的「强制策略」等于没强制。

完整 `requirements.toml` 表面见 [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference)。

## ChatGPT 和 Codex 怎么配合

它们强项不同，配对是真的有用：

| 任务 | 更合适的地方 |
| --- | --- |
| 代码还不存在时把思路谈清楚 | ChatGPT |
| 比库、比架构 | ChatGPT |
| 在真实仓库里读改文件 | Codex |
| 跑测试并迭代到绿 | Codex |
| 给同事解释一份 diff | ChatGPT |
| CI 里自动化一项任务 | Codex（`codex exec`） |

可用工作流：在 ChatGPT 里把设计谈定，写成 `AGENTS.md` 条目或任务说明，再把实现交给 Codex 并写上验收命令。设计对话和实现会话的上下文需求完全不同，拆开两边都更好。

## 相关页面

- [Codex CLI](./codex-cli) — 安装与核心功能
- [Codex 产品线](./codex-ai) — CLI、IDE、应用、云端
- [Codex Cookbook](./codex-cookbook) — 任务配方
- [Codex 速查表](./codex-cheatsheet) — 命令和配置键
- [学习地图](./) — 完整路径

## 官方来源

- [Pricing](https://learn.chatgpt.com/docs/pricing) — 套餐和配额的唯一权威
- [Models](https://learn.chatgpt.com/docs/models) — 模型列表和推理强度
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) — `requirements.toml` 和每个配置键
