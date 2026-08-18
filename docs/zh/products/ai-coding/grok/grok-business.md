# Grok Business & Enterprise

> 官方定位（[docs.x.ai/grok/user-guide](https://docs.x.ai/grok/user-guide)）：
> "**Grok Business provides dedicated workspaces for personal and team use, with enhanced privacy and sharing controls.**"
>
> [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) 把 **Business & Enterprise** 列为一级下一步："team workspaces, licenses, and organization controls."
>
> 本页给这个官方入口画产品地图。在本站复杂度轴上它比 Grok Build 靠后。仍然立页，因为 xAI 把它放在 Grok 文档首页。

## 目标与非目标

**写给谁：** 公司已经有（或正在买）Grok Business / Enterprise 的人，不是个人 SuperGrok 订阅者。

**目标：** 讲清个人 / 团队工作区、许可证、分享、管理控制台。指向官方页。

**非目标：** 臆造席位价格、再抄一遍企业法律条款，或 Grok Build 的 `/etc/grok/requirements.toml` 策略（那是 [CLI 企业策略](https://docs.x.ai/build/enterprise)，另一个产品）。

## 你得到什么

一个**团队工作区**（[user-guide](https://docs.x.ai/grok/user-guide)）：

- 隐私保证见 xAI 的 [企业条款](https://x.ai/legal/terms-of-service-enterprise)。
- 完整 **SuperGrok** 能力（升级许可证则是 **SuperGrok Heavy**）。
- 对话只能安全分享给**有有效许可证**的团队成员。

两种工作区：

| 工作区 | 给谁 | 门槛 |
|--------|------|------|
| **Personal** | 个人使用 | 默认有；组织可在 Enterprise 许可证上关掉 |
| **Team** | 团队协作 | 必须有**有效许可证** |

在 grok.com **左下角**导航切换工作区。开新对话前先确认你在正确的工作区。

打不开团队工作区 = 没有有效许可证，找团队管理员。**看不见个人工作区** = 组织关掉了；开关这件事走 Enterprise / 销售（[user-guide](https://docs.x.ai/grok/user-guide)）。

Enterprise 另有自定义保留策略。本页不转述法律条文——读 [x.ai/legal/terms-of-service-enterprise](https://x.ai/legal/terms-of-service-enterprise)。

## 许可证与用户

枢纽： [console.x.ai](https://console.x.ai) 的 Grok Business 总览（[management](https://docs.x.ai/grok/management)、[user-guide](https://docs.x.ai/grok/user-guide)）。

官方许可证类型（[management](https://docs.x.ai/grok/management)）：

- **SuperGrok** — 标准商务访问，更高配额与功能。
- **SuperGrok Heavy** — 面向更重负载的升级性能。

本页**不**臆造每席美元价。

管理员流程（压缩自 [management](https://docs.x.ai/grok/management) 与 [user-guide](https://docs.x.ai/grok/user-guide)）：

1. 在总览页购买许可证（类型 + 数量）。需要 **Billing Read-Write**。
2. 用邮箱邀请用户；可选在接受时自动配发许可证。需要 **Team Read-Write**。被邀请者获得团队工作区访问与基础 team read（这样才能分享对话）。
3. 在用户列表里分配 / 收回许可证。收回后许可证回池，**团队**工作区权限取消；**个人**工作区仍在。
4. 在总览页取消未用许可证。取消可能要几天；符合条件的退款回到原支付方式。

终端用户开通（[user-guide](https://docs.x.ai/grok/user-guide)）：console.x.ai → **Assign license** → 选类型。然后 grok.com 上会出现团队工作区。

## 分享

团队对话分享（[user-guide](https://docs.x.ai/grok/user-guide)）：

1. 在**团队工作区**打开对话。
2. 分享按钮 → 选择团队成员 → 生成链接。
3. 链接只对**有许可证**的团队成员可开。非成员、未授权队友打不开。
4. 收件箱：[grok.com/history?tab=shared-with-me](https://grok.com/history?tab=shared-with-me)。

组织级分享策略是**上限**，不是默认全员分享（[management](https://docs.x.ai/grok/management)）。管理员在 console.x.ai → **Sharing & Retention** → **Product Sharing** 设置。每种资源单独一条：conversations、projects、skills。

| 级别 | 成员能做什么 |
|------|----------------|
| **Private** | 该资源关闭分享 |
| **Team** | 个别队友与成员自己的团队。不能全组织 / 跨团队 |
| **Organization** | Team，再加上其他团队和全组织 |
| **Public** | Organization，再加上任何人都能打开的公开链接 |

公开链接**只适用于对话**。projects 与 skills 最高到 Organization。默认：对话和项目可组织范围分享；**skills 默认 Private**。收紧策略立即生效，已经超出新上限的旧分享也会被压下来。

## 团队里的 Connectors

Business / Enterprise 成员**不能**自己先加 connector。必须由团队管理员在控制台开通，然后成员在 [grok.com/connectors](https://grok.com/connectors) 连接自己的账号。细节见 [Connectors](./grok-connectors.md) 与 [connector-management](https://docs.x.ai/grok/connector-management)。

## 不是本页

| 产品 | 为什么不同 |
|------|------------|
| grok.com 上的个人 SuperGrok | 没有团队工作区，没有许可证池。见 [Grok 聊天](./grok-chat.md) |
| 消费端 [FAQ](https://docs.x.ai/grok/faq) 里的 xAI API「teams」 | 控制台里给 **API 用量 / 发票** 用的团队，不是 Grok Business 工作区 |
| Grok Build 企业策略 | CLI 上的五层配置、OIDC、MDM（[docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise)） |
| Grok Bot 团队 | 每人一台云电脑（[docs.x.ai/grok-bot/teams-and-enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises)） |

## 常见陷阱

- 机密对话开在**个人**工作区，然后奇怪团队分享链接不生效。
- 指望没许可证的队友能打开分享链接。官方写明不能。
- 把 Grok Business 许可证和 `XAI_API_KEY` 的 API credit 当成同一口池。
- 在本页找席位价格。官方文档列的是**许可证类型**，没有消费级美元数字。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [docs.x.ai/grok/user-guide](https://docs.x.ai/grok/user-guide) | 工作区、隐私、对话分享、激活许可证 |
| [docs.x.ai/grok/management](https://docs.x.ai/grok/management) | 购买 / 邀请 / 分配 / 收回 / 取消，分享策略 |
| [docs.x.ai/grok/connector-management](https://docs.x.ai/grok/connector-management) | 管理员开通 connectors |
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | 一级「Business & Enterprise」入口 |
| [console.x.ai](https://console.x.ai) | 管理枢纽 |
| [企业条款](https://x.ai/legal/terms-of-service-enterprise) | 隐私 / 数据处理 |

白手套 / Enterprise 升级：联系 xAI 销售（文档页把地址做成站点控件）。

## 相关页面

- [Grok 聊天](./grok-chat.md) — 成员在工作区里用的东西
- [Connectors](./grok-connectors.md) — 管理员开通 + 成员 OAuth
- [Grok Bot](./grok-bot.md) — 另一套团队产品
- [Grok Build 教程](./grok-cli.md) — CLI 企业策略在别处
- [Grok 学习地图](./index.md)
