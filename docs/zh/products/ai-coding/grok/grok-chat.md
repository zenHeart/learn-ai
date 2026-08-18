# Grok 聊天

> **Grok** 是 xAI 的助手。官方定义（[docs.x.ai/grok/overview](https://docs.x.ai/grok/overview)）：
> "Grok is xAI's assistant, available on the web at [grok.com](https://grok.com) and in the iOS and Android apps. Sign in once and your conversations, settings, and subscription stay in sync across every platform."
>
> 本页只根据 [docs.x.ai/grok](https://docs.x.ai/grok/overview)、[x.ai/grok](https://x.ai/grok)、[grok.com](https://grok.com) 画产品地图。对位 Claude.ai。它**不是** Grok Build——CLI 在 [grok-cli.md](./grok-cli.md)。

## 目标与非目标

**写给谁：** 在选 Grok 产品面的前端工程师。你需要浏览器或 Grok App，不需要仓库。

**目标：** 写清 grok.com / iOS / Android 实际能做什么、账号如何同步、文件 / Voice / Imagine / Connectors 分别在哪。

**非目标：** Grok Build 教程、臆造 SuperGrok 价格、三方 Arena Mode / 8 路并行，或把 Grok 4.3 写成现行旗舰。编码模型以 [developers/models](https://docs.x.ai/developers/models) 为准：`grok-4.6` 与 `grok-build-0.1`。

## 它是什么

一个助手，三个官方客户端（[overview](https://docs.x.ai/grok/overview)、[x.ai/grok](https://x.ai/grok)）：

| 客户端 | 官方入口 |
|--------|----------|
| Web | [grok.com](https://grok.com)——[FAQ](https://docs.x.ai/grok/faq) 要求用这个地址、Chrome/Chromium；`grok.x.ai` 会缺功能（例如 Projects） |
| iOS | App Store 上的 Grok（[x.ai/grok](https://x.ai/grok)） |
| Android | Google Play 上的 Grok（[x.ai/grok](https://x.ai/grok)） |
| X 内 | X.com / X App 里的 Grok（[FAQ](https://docs.x.ai/grok/faq) 把 X 产品问题转给 X Help，不是 xAI） |

这些页面上**没有**官方 Grok 桌面聊天 App。带云电脑的桌面 + iOS 产品是 [Grok Bot](./grok-bot.md)。

官方 "What you can do"（[overview](https://docs.x.ai/grok/overview)）：

- **Chat** — 提问、头脑风暴、写作、来回解决问题。
- **Create images and video** with Grok Imagine。产品页：[grok-imagine.md](./grok-imagine.md)。
- **Talk to Grok** hands-free with voice。产品 + API：[grok-voice.md](./grok-voice.md)。
- **Upload files** — PDF、图片、表格、代码、音频等，做分析、抽取、摘要。
- **Connect your tools** — 在对话里连邮箱、文件、日历。见 [Connectors](./grok-connectors.md)。

[x.ai/grok](https://x.ai/grok) 还写了实时 web + 𝕏 搜索、深度推理、SuperGrok 的 multi-agent、**对话里**写代码、跨会话记忆、长文 Canvas、自定义指令、可分享链接。这仍是聊天，不是仓库 Agent。

## 账号与订阅同步

登录一次。对话、设置、订阅在 Web 与 App 之间同步（[overview](https://docs.x.ai/grok/overview)）。

[FAQ](https://docs.x.ai/grok/faq) 写明的常见坑：

- 订阅绑在**购买时的那个账号**上。Web 上有 SuperGrok、手机 App 里没有，多半是登录身份不同，不一定是重复扣款。X Premium+ 只作用于绑了该 X 账号的那个身份。
- 在 grok.com 的 **Settings → Account → Connect your X Account** 绑定 X。登录方式在 [accounts.x.ai](https://accounts.x.ai) 管理。
- 用 Apple「隐藏邮件地址」买的订阅，必须用 **Apple 登录**，不能拿中转邮箱走 Google/邮箱登录。
- 删除 xAI 账号走 [accounts.x.ai/account](https://accounts.x.ai/account)。30 天内可恢复。同一账号上的 API 权限一并撤掉。

计费入口取决于在哪买的（[FAQ](https://docs.x.ai/grok/faq)）：

| 购买渠道 | 管理入口 |
|----------|----------|
| Web（grok.com） | [grok.com/?_s=billing](https://grok.com/?_s=billing) 或 Settings → Billing |
| Apple App Store | Apple 订阅 / 退款页 |
| Google Play | Google Play 取消；退款走 [xAI 退款表](https://accounts.x.ai/refund) |
| X Premium | X，不是 xAI（[X Help](https://help.x.com/using-x/x-premium)） |

**API credits 不可退**（[FAQ](https://docs.x.ai/grok/faq)）。

## 套餐与每周用量池

[overview](https://docs.x.ai/grok/overview)：Grok **可以免费开始**。付费 SuperGrok 提高限额、解锁更多产品，从一个**每周用量额度**里花，花在哪个产品上由你决定。

[FAQ](https://docs.x.ai/grok/faq)（2026 年 6 月起滚动上线）用每周共享池替换「每个产品各有每日上限」：

- Chat、Imagine、Voice、Build 等共用一个每周池。
- 不同产品消耗不同。一条聊天几乎不吃算力；高质量视频或长编码任务吃得多。
- 查 **Settings → Usage**（Web 与手机）：已用百分比、按产品拆分（API、Build、Chat、Imagine、Voice）、每周重置时间、Extra Usage Credits。
- 撞上每周上限后，**付费能力**暂停。免费档的 Chat 与 Voice 限额仍在，按自己的周期重置。
- Extra Usage Credits **目前只能在 Web 买**，最低 $5，默认购买后一年过期，单价高于套餐内含用量。
- Auto Top Up 是 Web 设置（金额 + 每月上限）。

本页**不**臆造 SuperGrok 美元价或 token 配额。以 Usage 页为准。

团队 / 企业工作区是另一张产品面：[Grok Business](./grok-business.md)。

## 上传文件

官方路径（[FAQ](https://docs.x.ai/grok/faq)）：任意对话里点输入框旁的 **+**（Web 也可拖放）。一条消息可多文件。Grok 确认上传成功后再回答。

| 限额 | 官方数字 |
|------|----------|
| 一次多少个 | Web：约 100。Android：最多 20。iOS：支持多个 |
| 大小 | 多数文件（文档、图片、代码、音频）：每个 **150 MB** |
| 文档 | PDF、DOCX、TXT、CSV、XLSX、PPTX、HTML、XML、JSON、MD、LaTeX、ODT、RTF、代码（`.py`、`.cpp`、`.java`、`.html`、`.css`） |
| 图片 | JPEG/JPG、PNG、WebP、HEIC、BMP。GIF / SVG 因平台而异 |
| 音频 | MP3、WAV、M4A、OGG、FLAC、AAC |
| 视频 | MP4、MOV |

Grok 能做的事（[FAQ](https://docs.x.ai/grok/faq)）：跨文件综合、改写 / 摘要、抽取表格与引文、分析图表 / 代码 / 音视频、多模态推理。

官方限制：

- 极长文件可能被摘要或分段处理。
- **非 PDF** 里嵌的图不一定会做视觉理解。
- 音视频转写质量不稳定。
- 已存资产在 [grok.com/files](https://grok.com/files) 管理。数据控制：**Profile → Settings → Data Controls**。

## 旁边那些面（别混）

| 产品面 | 是什么 | 页面 |
|--------|--------|------|
| **Grok 聊天** | 本页。对话、搜索、文件、Voice、对话里的 Imagine | grok.com / App |
| **Imagine** | 独立生图 / 视频工作室 + Imagine API | [grok-imagine.md](./grok-imagine.md) |
| **Voice** | App 里免提说话 + Voice API | [grok-voice.md](./grok-voice.md) |
| **Connectors** | 对话里连邮箱 / 文件 / 日历 / MCP | [grok-connectors.md](./grok-connectors.md) |
| **Build Mode** | 聊天模式：做出可运行预览并发布到 grok.me。SuperGrok Heavy Early Beta | [x.ai/grok/build-mode](https://x.ai/grok/build-mode)——不是 Grok Build |
| **Grok Build** | 终端编程 Agent（`grok`） | [grok-cli.md](./grok-cli.md) |
| **Grok Bot** | 持久云电脑上的具名同事 | [grok-bot.md](./grok-bot.md) |
| **Grok Business** | 团队工作区与许可证 | [grok-business.md](./grok-business.md) |

[FAQ](https://docs.x.ai/grok/faq) 还值得记住：

- **Grok Studio 已不再支持。** 改用 **Grok Build**。
- **Companions 仅 iOS。** 官方原文：没有计划做 Web / Android。

## 常见陷阱

- 手机用另一套 Google / Apple / X 身份登录，然后以为订阅丢了。
- 用 `grok.x.ai` 却奇怪 Projects 不见了——官方地址是 **grok.com**。
- 把对话里写代码当成仓库 Agent。真要改 checkout，用 [Grok Build](./grok-cli.md)。
- 每轮粘贴同一批文件，而不是用 [Connectors](./grok-connectors.md) 连邮箱 / Drive / 日历。
- 把三方「Grok 4.3 / 200 万上下文」写成聊天旗舰。[developers/models](https://docs.x.ai/developers/models) 的编码建议是 **Grok 4.6**。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | Grok 是什么、平台、下一步 |
| [docs.x.ai/grok/faq](https://docs.x.ai/grok/faq) | 计费、每周用量、文件、Imagine、账号 |
| [docs.x.ai/grok/connectors](https://docs.x.ai/grok/connectors) | 对话里连应用 |
| [docs.x.ai/grok/user-guide](https://docs.x.ai/grok/user-guide) | Business & Enterprise 工作区 |
| [x.ai/grok](https://x.ai/grok) | 营销页与商店链接 |
| [grok.com](https://grok.com) | 产品本身 |

## 相关页面

- [Grok 学习地图](./index.md) — 家族决策树
- [Imagine](./grok-imagine.md) — 生图与视频
- [Voice](./grok-voice.md) — 产品 Voice + Voice API
- [Connectors](./grok-connectors.md)
- [Grok Business](./grok-business.md)
- [Grok Build 教程](./grok-cli.md)
- [术语表](./grok-glossary.md)
