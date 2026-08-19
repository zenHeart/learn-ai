---
title: Kimi 对话与 Agent
description: "写给谁：在选月之暗面产品面的前端工程师。你需要浏览器或 Kimi App，不需要仓库。"
domain: product
tags:
  - chat
role: tutorial
---

# Kimi 对话与 Agent

> **Kimi** 是月之暗面的一站式 AI 工作台。官方定义（[zh-cn/products](https://www.kimi.com/zh-cn/products/)）：
> 「从深度研究、幻灯片到表格、文档与网站，Kimi 内置强大的 Agent 能力。」
>
> **Kimi Agent** 的官方定义（[Agent 概览](https://www.kimi.com/zh-hans/help/agent/agent-overview)）：
> 「Kimi Agent 是一款可端到端处理复杂任务的自主 AI 助手。它由 Kimi K3 驱动，可调用 20 多种工具来构建网站、生成文档、分析数据等。」
>
> 本页只根据 kimi.com、产品页和帮助中心写入口与步骤。它**不是** Kimi Code——编码 CLI 见 [Kimi Code](/zh/products/kimi-code/)。

## 目标与非目标

**写给谁：** 在选 Kimi 产品面的前端工程师。你需要浏览器或 Kimi App，不需要 checkout。

**目标：** 打开 kimi.com，分清对话 / Agent / Swarm / Claw，跑完第一次 Agent 任务，知道额度从哪张官方表查。

**非目标：** Kimi Code 安装；臆造人民币价；把 Moderato 写成 Go；讲解模型内部。机制见 [Learn LLM](/zh/tech/fundamentals/LLM)。

## 它是什么

一张工作台，几个官方客户端：

| 客户端 | 官方入口 |
|--------|----------|
| Web | [kimi.com](https://www.kimi.com/) |
| Agent | [kimi.com/agent](https://www.kimi.com/agent) |
| Agent Swarm | [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm) |
| Kimi Claw | [kimi.com/bot](https://www.kimi.com/bot) |
| App | [moonshot.cn](https://www.moonshot.cn/) 页脚「扫码下载 Kimi App」 |

首页侧栏抄官方标签（[kimi.com](https://www.kimi.com/)）：**Plugins、Scheduled Tasks、Slides、Swarm、Deep Research、Docs、Websites、Sheets、Design**，以及 **Kimi Work / Kimi Code / Kimi Claw**。新对话快捷键首页写的是 **⌘K**。

Agent 核心能力（[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview)）：

| 能力 | 官方说明 |
|------|----------|
| 网站（Websites） | 生成并部署响应式网站 / 应用 |
| 文档（Docs） | Word、PDF、Markdown 等 |
| 表格（Sheets） | Excel / CSV，官方写可整理 1000 行 Excel |
| 幻灯片（Slides） | 自动生成 PPT |
| 深度研究（Deep Research） | 万字级研究报告 |
| Agent Swarm | 最多 300 个子代理并行，超过 4,000 次工具调用 |
| Kimi Claw | 零部署云端自动化；帮助中心写内置 5,000+ 技能库（ClawHub） |

工作步骤（同一页）：任务规划 → 工具调用（20 多种）→ 自主执行 → 异常处理 → 成果交付。

## 第一次：打开对话

1. 打开 [kimi.com](https://www.kimi.com/)，登录。未登录时侧栏写「Log in to sync chat history」。
2. 在输入框提问。首页文案：「Ask anything, or task an agent...」
3. 聊天额度口径以会员页为准：官方原文「在聊天中，K2.6 对所有用户免费，且不消耗额度」（[会员概览](https://www.kimi.com/zh-hans/help/membership/membership-overview)）。

需要持久上下文时建 **Project**，不要每轮重贴同一批文件。见下一节。

## 第一次：跑一个 Agent 任务

官方入口（[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview)）：

- **网页：** [https://www.kimi.com/agent](https://www.kimi.com/agent)
- **手机 / 平板：** 打开 Kimi App，在对话框上方的**模型切换按钮**里选 **K3** 或 **K3 集群**

步骤（抄官方）：

1. 清晰描述任务并发送。官方例子：「帮我创建一个在线投票工具的网站代码」、「分析 2025 年 AI 芯片行业的竞争格局」。
2. 看执行过程：推理链路、工具、访问的网址、中间代码。
3. 任务完成后下载或分享：代码项目、文件夹、数据分析、Word / PDF / PPT。

适用场景（官方列表）：网站开发、内容生成、合同比对 / 长文档翻译、数据分析、PPT、文档互转。

## Agent Swarm

官方定义（[Agent Swarm](https://www.kimi.com/zh-hans/help/agent/agent-swarm)）：横向扩展，协调最多 **300** 个子 Agent，无需预设角色或手工编排。相比单 Agent，官方写任务完成速度约提升 **4.5 倍**；单任务可超过 **4,000** 次工具调用。当前由 **Kimi K3（K3 Swarm）** 驱动。

**入口：**

- Web：<https://www.kimi.com/agent-swarm>
- 移动端：Kimi App 模型切换选 **K3 Swarm**

**资格：** 面向 **Moderato、Allegretto、Allegro、Vivace** 会员。官方写：相比标准 Agent，此类任务会消耗明显更多额度。页上的 **[Beta]** 表示初期仅面向少量用户。

步骤（官方）：描述任务 → 看子 Agent 并行 → 收交付物 → 后续轮次会在对话与 Agent 之间自动调度，无需手动切换。

适合：大规模检索、批量下载、100+ 文档、超长写作、复杂编程、Office 自动化。不适合一句就能答完的闲聊。

## Kimi Claw

官方定位（[Claw overview](https://www.kimi.com/en/help/kimi-claw/overview)）：通过 Kimi Claw 在 Kimi 里和 **OpenClaw** 对话。OpenClaw 是「有鲜明个性和长期记忆」的助手。

**一键部署（云端）：**

1. 登录 [kimi.com/bot](https://www.kimi.com/bot)
2. 点 **Create** Kimi Claw
3. 等系统自动配置（官方：通常几分钟）
4. 改昵称；在 **Settings → Chat channels** 配微信 / 飞书 / 企微等

官方约束：一键部署仅 **Allegretto 及以上**。默认配置 **Kimi K2.6**，并挂到你的**会员额度**，同时打开 Kimi Web Search。可部署到飞书、企微、微博等。

**接入已有 OpenClaw：** Claw 页选 **Link existing OpenClaw**，在跑 OpenClaw 的设备上按说明装 Kimi 插件。

**Claw 群聊**（[group-chat](https://www.kimi.com/help/kimi-claw/group-chat)）：侧栏 **+** → **Start Group Chat**，填 Group Name 与 Group Goal，选已连接的 Claw。Kimi 自动指定 **Conductor**。主聊天发 `/stop` 可强制打断。群规则用自然语言让 Kimi 改。Allegretto 起；会员表写 10 个群聊。

把 Claw 默认模型切到 K3 的命令在官方 Claw 页，路径是本机 `/root/.openclaw/openclaw.json`（或你的实际安装路径）。那是 **OpenClaw 配置**，不是 kimi.com 输入框命令。需要时打开 [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) 抄原文，改前先备份。

## Projects、记忆、Skills、插件、定时任务

这些是工作台横切能力，官方分类在 [Features](https://www.kimi.com/help/features)。

### Projects

[Projects](https://www.kimi.com/help/features/project)：把参考文件、对话、项目指令放在一起。侧栏 **Projects** 旁的 **+**，或首页选择器 **+ New project**。名称 1–50 字符。

- 项目内对话可用 **项目文件、项目指令、plugins、Skills、Goal**，并可换模型。
- 单文件 ≤ **100 MB**，最多 **50** 个文件；模型按需读取，不是每轮灌全文。
- 删除项目会**永久删掉**其对话、文件和指令，不可恢复。
- 上下文：system prompt + 全局主记忆 + 项目指令 + 按需文件。
- **Kimi Work 里的 Projects 与这里不通、不共享数据。**

### 记忆

[Memory space](https://www.kimi.com/help/features/memory-space)：跨会话记偏好。官方说不会记住未授权的隐私（健康、密码、地址），除非你明确要求。管理入口：**Settings → Personalization → Memory Space**。可以说「记住… / 忘掉… / 你现在记得我什么」。官方：记忆不用于模型训练，可随时关或清。

### Skills

[What are Skills?](https://www.kimi.com/help/features/what-are-skills)：可复用知识包。输入框键入 **`/`** 选技能，或让 Kimi 自动触发。可用 **`/skill-creator`** 对话生成。官方技能例子：`docx`、`deep-research`；推荐例子：`sop-writer`、`event-etf-study`。

### 插件

[Plugins](https://www.kimi.com/help/features/plugins)：接外部服务。可用范围：模型切到 **K3** 或 **K3 Swarm**，以及 Deep Research / Websites / PPT。**Kimi Claw 和 Kimi Plus 对话尚不支持。** 入口：侧栏 **Plugins**、输入框 **+**、或 **`/`**。部分要 OAuth。未登录不能装。部分插件按实际调用扣会员额度。

### 定时任务

[Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks)：在 **Kimi** 和 **Kimi Work** 都有。侧栏「Create scheduled task」，或在对话里用自然语言让它建。周期：daily / weekly / monthly / 一次性。云端任务不用开着客户端。Kimi Work **本地**任务要桌面端开着，关掉期间错过的不会补跑。跑完可在结果对话换模型继续问，并用 `/` 调插件和 Skills。

官方提示模板：At [time], do [task], output as [format], and follow [constraints]。

## Goal

官方出现位置：

- 会员对比表有 **Goal Mode / 目标模式**：Moderato 为 —，**Allegretto / Allegro / Vivace** 为 ✅（[会员概览](https://www.kimi.com/zh-hans/help/membership/membership-overview)）。
- 项目对话「use plugins, Skills, and Goal」（[Projects](https://www.kimi.com/help/features/project)）。

帮助中心没有单独的「kimi.com Goal 产品页」。Kimi Work 另有 Goal Mode（[Work overview](https://www.kimi.com/help/kimi-work/overview)）。Kimi Code 的 `/goal` 是 CLI，**不要**在 kimi.com 输入框当命令用。

## 会员与额度

[会员概览](https://www.kimi.com/zh-hans/help/membership/membership-overview)（2026-08-19 打开）：

- 四档：**Moderato $19/月、Allegretto $39/月、Allegro $99/月、Vivace $199/月**。
- **所有会员功能共用一个额度池**（网站部署、Deep Research、幻灯片、Kimi Code、Kimi Work、Kimi Claw、K3、K3 Swarm）。按 token 计量。
- 聊天里 **K2.6 免费且不耗额度**。
- 额度每个计费周期重置。年付官方写最多可省 **$480/年**。
- Kimi Code **另外**有 5 小时 / 每周速率限制，不影响其它会员功能。

同一页第二张表还写了：Agent 并发、K3 超长对话（Allegro / Vivace，最高 100 万 tokens）、定时任务数、项目数、Swarm 并发子任务、Goal、Claw、Claw 群聊等。完整数字进 [速查表](./kimi-cheatsheet.md)。

**两套官方套餐名：** Projects / Scheduled Tasks 页使用 **Free / Go / Pro / Max / Ultra**，且数字与会员概览不完全相同。本页**不以意译对齐**。查价与会员权益以会员概览为准；查项目数 / 定时任务上限时打开对应功能页，冲突先看该功能页并链会员页。

本页**不**写人民币价。以你账号里的会员 / 用量页为准。

## 常见陷阱

- 把对话里出的网站代码当成已经改好了本地仓库。要改 checkout，去 [Kimi Code](/zh/products/kimi-code/)。
- 没开会员就进 `kimi.com/agent-swarm` 或 `kimi.com/bot`，对照会员表：Swarm 要 Moderato+，一键 Claw 要 Allegretto+。
- 把 Kimi Work 桌面项目和 kimi.com Projects 当成同步盘。
- 把 Kimi Code `/goal` 打进网页输入框。
- 用一份「应该是」的套餐对照表合并 Moderato 和 Go。
- 在 Claw / Kimi Plus 对话里找网页插件——官方写尚未支持。
- 指望 Kimi Work 本地定时任务在关机后补跑。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [kimi.com](https://www.kimi.com/) | 产品本体 |
| [zh-cn/products](https://www.kimi.com/zh-cn/products/) | 一级产品家族 |
| [Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview) | Agent 入口与步骤 |
| [Agent Swarm](https://www.kimi.com/zh-hans/help/agent/agent-swarm) | Swarm 入口与限制 |
| [会员概览](https://www.kimi.com/zh-hans/help/membership/membership-overview) | 套餐与额度池 |
| [Claw overview](https://www.kimi.com/en/help/kimi-claw/overview) | 一键部署 / 连接已有 OpenClaw |
| [Claw 群聊](https://www.kimi.com/help/kimi-claw/group-chat) | Conductor、Thread、`/stop` |
| [帮助中心](https://www.kimi.com/zh-hans/help) | 分类总入口 |
| [moonshot.cn](https://www.moonshot.cn/) | 公司站、App 下载 |

## 相关页面

- [学习地图](./index.md)
- [Cookbook](./kimi-cookbook.md)
- [速查表](./kimi-cheatsheet.md)
- [术语表](./kimi-glossary.md)
- [Kimi Code](/zh/products/kimi-code/)
