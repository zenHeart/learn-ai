# Grok Bot

> **Grok Bot** 是 xAI 的常驻同事产品。官方定义（[docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview)）：
> "Bots are AI teammates you can give real work to. Bots can sign and use apps and websites just like you do on a persistent cloud computer."
>
> 本页只根据 [docs.x.ai/grok-bot](https://docs.x.ai/grok-bot/overview)、[x.ai/bot](https://x.ai/bot)、[x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot) 画产品地图。它**不是** Grok Build CLI 教程——CLI 在 [grok-cli.md](./grok-cli.md)。

## 目标与非目标

**目标：** 把 Grok Bot 和 Grok Build / grok.com 聊天 / Imagine / Build Mode 分开，并指向官方文档里的安装、共享电脑和审批。

**非目标：** 再抄一遍官方 get-started、臆造配额，或把三方博客里 docs.x.ai / x.ai / grok.com 没有的说法写成事实。

## 它是什么

文档和 App 里，**一个 Bot = 一个持久的、有名字的 agent**（[overview](https://docs.x.ai/grok-bot/overview)）。你像给同事发消息那样派活。合上笔记本之后，云电脑上的工作继续跑（[faq](https://docs.x.ai/grok-bot/faq)）。

官方相对聊天助手的差异（[overview](https://docs.x.ai/grok-bot/overview)、[faq](https://docs.x.ai/grok-bot/faq)）：

- 每个 Bot 跑在一台带浏览器、文件系统和终端的**持久云 VM** 上。
- 有 connector / MCP 就用；没有干净 API 的网站走 computer use。
- 多个 Bot **共用一台按用户划分的电脑**，可以并行、互相发消息、交接。
- 可以跟着你演示一遍工作流，存成 **routine**。
- 具名 Bot 跨轮次保留记忆、文件、浏览器会话和偏好。

| | Grok（聊天） | Grok Build | Grok Bot |
|---|-------------|------------|----------|
| 干什么 | 对话、搜索、语音、Imagine | 改本地 / CI 里的真实仓库 | 在 App 和网站里把活干完 |
| 电脑 | 没有自己的电脑 | 你的机器（可选沙箱） | 每个用户一台持久**云**电脑 |
| 合上笔记本就停？ | 是（它是聊天） | 是（进程在本地） | 否——云上继续 |
| 官方入口 | [grok.com](https://grok.com) | `grok` | 桌面 + iOS（[x.ai/bot](https://x.ai/bot)） |

发布公告（[2026-08-11](https://x.ai/news/introducing-grok-bot)）写明 Grok Bot 处于 **beta**。

## 谁能用

[get-started](https://docs.x.ai/grok-bot/get-started) 列出的资格：

- SuperGrok Heavy
- Cursor Ultra
- Cursor Teams Premium（用 Cursor 账号登录）

[x.ai/bot](https://x.ai/bot) 补充："Already on Cursor Ultra or SuperGrok Heavy? Grok Bot is included." [发布公告](https://x.ai/news/introducing-grok-bot) 里企业用户走 waitlist；[faq](https://docs.x.ai/grok-bot/faq) 说团队 / 企业放量因组织而异。

**认证走 Cursor**，不是 `grok login`。Grok Bot 要求云端数据存储，不支持 Legacy Privacy Mode（[get-started](https://docs.x.ai/grok-bot/get-started)、[faq](https://docs.x.ai/grok-bot/faq)）。

### 平台（[faq](https://docs.x.ai/grok-bot/faq)）

| 发布时支持 | 发布时不支持 |
|------------|--------------|
| macOS（Apple silicon 与 Intel） | Linux 桌面 |
| Windows（x64 与 Arm64） | Android |
| iOS 18 及以上的 iPhone | iPad |

同一套 Bot 和对话在已登录设备之间同步。

## 共享的云电脑

账号下每个 Bot 用的是**同一台**电脑（[computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps)）：

- 浏览器 cookie 和登录会话共享
- 文件对每个 Bot 可见
- 命令行凭证共享
- 一个 Bot 可以从另一个 Bot 留下的工作接着做

电脑挂在**用户账号**上，不挂在单个 Bot 上。官方警告写了两遍：**不要把不同 Bot 当成安全边界**。

每个 Bot 在这台共享电脑上有自己的屏幕，所以多个 Bot 可以并行用浏览器和桌面工具。一个 Bot 在自己的屏幕上同一时刻只能跑一个 computer-use 任务。屏幕是工作面，**不是**独立安全域。

持久项目文件放在共享工作区 `/workspace`。临时目录、手工装的包、未提交的应用状态都按可丢弃处理。

云电脑和你面前的 Mac / Windows **是分开的**。本机命令策略在 **Settings → General → Agent → Execution on Local Computer**，默认 **Ask every time**（[approvals](https://docs.x.ai/grok-bot/approvals-security-and-privacy)）。这些设置挡不住 Bot 用它自己的云电脑。

## 上手（官方顺序）

按 [get-started](https://docs.x.ai/grok-bot/get-started) 走。压缩如下：

1. 从 [Grok Bot 入口页](https://x.ai/bot) 装桌面 App（macOS：拖进 Applications；Windows：跑安装器）。
2. 在 App 打开的浏览器窗口里用 Cursor 账号登录。
3. 创建一个 Bot：短名字、一个主职、它该怎么干活。官方建议：职责收窄的 Bot 好过一个万能 Bot。
4. 第一次派活要写清结果、来源、约束、交付物、何时停下来给你看。
5. 网站要密码、passkey、二次验证或 CAPTCHA 时，打开 **Agent Computer**，自己接管、只做这一步，再交还控制权。**不要把密码或一次性验证码贴进聊天。**

当前 App 里 connector 显示为 **Plugins**： **Settings → Plugins**。聊天里用 `@` 挂上 connector，用 `/` 引用已存 skill。有 connector 优先用 connector；没有的服务再用浏览器。

## Skill 和 routine

官方分法（[faq](https://docs.x.ai/grok-bot/faq)）：

- **skill** 描述「这件事怎么做」。
- **routine** 把一条工作流派给某个 Bot，并告诉它何时跑——按日程，或（若支持）按事件。

先在一次性真实任务上试过 skill，再做成 routine。

**Teach a task**（若该账号已开放）从电脑视图录一段浏览器流程，上限十分钟。放量可能是逐步的。

删除 Bot 会去掉它的档案、对话和 routine。共享电脑上的文件和登录可能还在。

## 该设的审批

[approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) 要求把常驻边界写进 Bot 描述，并把这些动作留在审批后面：

- 发消息或邀请
- 发布内容
- 购买和资金划转
- 删除或覆盖数据
- 改权限
- 改生产
- 接受法律条款

Auto Review 可用时：**Require Approval** 永远压过 **Always Allow**。不要写「浏览器里什么都允许」这种宽规则。

## 费用（只写官方页上的话）

[faq](https://docs.x.ai/grok-bot/faq) 说能否用、怎么计费取决于账号和套餐；Grok Bot 订阅含每周用量，符合条件的账号可以按模型和 token 成本加购按需用量。[x.ai/bot](https://x.ai/bot) 当前列出 Cursor Ultra $200 / 月、Cursor Premium Teams $120 / 席 / 月，并写 SuperGrok Heavy / Cursor Ultra 已包含 Grok Bot。本页**不**臆造 SuperGrok Heavy 的价格或 token 配额。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) | Bot 是什么 |
| [docs.x.ai/grok-bot/get-started](https://docs.x.ai/grok-bot/get-started) | 安装、登录、第一次派活 |
| [docs.x.ai/grok-bot/files-and-results](https://docs.x.ai/grok-bot/files-and-results) | 附件与结果 |
| [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) | 共享电脑、connector、`/workspace` |
| [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) | 审批、本机、隐私 |
| [docs.x.ai/grok-bot/faq](https://docs.x.ai/grok-bot/faq) | 平台、记忆、费用、删除 |
| [docs.x.ai/grok-bot/teams-and-enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises) | 每人一台电脑、组织控制 |
| [x.ai/bot](https://x.ai/bot) | 营销页和下载 |
| [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot) | 发布公告（2026-08-11，beta） |

## 相关页面

- [Grok 学习地图](./index.md) — 家族决策树
- [Grok Build 教程](./grok-cli.md) — 终端编程 Agent
- [术语表](./grok-glossary.md) — 名字怎么撞车
