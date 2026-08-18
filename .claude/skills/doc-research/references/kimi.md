# Kimi 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)。读者可见的数据源写在 `docs/zh/products/kimi/kimi-cheatsheet.md` 的「高质量信息源」。架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。每条都来自一手官方页，来源标在括号里。

**结论一：本 issue 的产品是 kimi.com 上的对话 / Agent 工作台，不是 Kimi Code。**

- [kimi.com/zh-cn/products](https://www.kimi.com/zh-cn/products/) 把「Kimi」写成「一站式 AI 工作台。从深度研究、幻灯片到表格、文档与网站，Kimi 内置强大的 Agent 能力」。
- 英文产品 nav 原文：「Kimi — All-in-one agentic AI workspace」。
- 帮助中心 [Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview) 把对话侧 Agent 入口写成网页 `https://www.kimi.com/agent`，手机/平板是 Kimi App 里切 **K3** 或 **K3 集群 / K3 Swarm**。
- 本目录**禁止**把 Kimi Code CLI 安装写成主教程。Kimi Code 只在家族图占一行，链到 `/zh/products/kimi-code/`（#71）。

**结论二：官方产品页一级入口是 5 个，首页 / 帮助中心还露出对话侧形态。**

产品页一级（[zh-cn/products](https://www.kimi.com/zh-cn/products/)）：

| 一级入口 | 官方一句话 |
|----------|------------|
| **Kimi** | 一站式 AI 工作台 |
| **Kimi Work** | 搭载 Agent Swarm 与预接专业数据源的 AI 桌面端 |
| **Kimi Code** | 面向开发者的 AI 编程助手；CLI 与插件 |
| **Kimi WebBridge** | 专为 AI Agent 打造的浏览器插件 |
| **Kimi Platform** | 官方 API 开放平台 |

首页侧栏（[kimi.com](https://www.kimi.com/)）另有：Plugins、Scheduled Tasks、Slides、Swarm、Deep Research、Docs、Websites、Sheets、Design，以及 **Kimi Work / Kimi Code / Kimi Claw**。帮助中心把 Agent Mode、Kimi Claw、Kimi Business、Kimi API 单独成类。

**结论三：Claw / Swarm / Goal 是 kimi.com 对话侧形态，不是 Kimi Code。**

- **Kimi Agent**：自主助手，K3 驱动，20+ 工具；入口 `kimi.com/agent`（[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview)）。
- **Agent Swarm**：最多 300 个子 Agent 并行；入口 `kimi.com/agent-swarm`；会员 Moderato 及以上（[Agent Swarm](https://www.kimi.com/zh-hans/help/agent/agent-swarm)）。
- **Kimi Claw**：一键把 OpenClaw 部署到云端；入口 `kimi.com/bot`；Allegretto 及以上（[Claw overview](https://www.kimi.com/en/help/kimi-claw/overview)）。
- **Goal**：会员表有 Goal Mode（Allegretto 起）；项目对话可「use plugins, Skills, and Goal」（[Projects](https://www.kimi.com/help/features/project)）。**不要**把 Kimi Code 的 `/goal` 写成 kimi.com 聊天命令。

**结论四：两套官方套餐名并存，禁止自行对齐。**

- [会员概览](https://www.kimi.com/help/membership/membership-overview)：**Moderato $19 / Allegretto $39 / Allegro $99 / Vivace $199**。聊天里 **K2.6 对所有用户免费且不消耗额度**。会员功能共用额度池。
- [Projects](https://www.kimi.com/help/features/project) 与 [Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks) 用 **Free / Go / Pro / Max / Ultra**，数字也不完全等于会员概览那张表。
- 教程必须并列引用、写清以哪份为准。禁止把 Moderato 写成 Go。

**结论五：适合本站「前端工程师选产品面」定位；编码仓库工作链走 Kimi Code。**

- 浏览器即可用，对位 Claude.ai / Grok 聊天。
- 对话里能出网站 / PPT / 表格 / 深度研究，仍是工作台，不是对着 checkout 改文件的 CLI。
- 真要终端 / IDE 改仓库 → 家族图一行链 Kimi Code，本目录不写安装。

**禁止当事实写：**

- Kimi Code 安装命令当本目录主路径（`curl …install.sh`、`npm i -g @moonshot-ai/kimi-code`、`kimi --version`）。
- 把 `/goal`、`kimi -p` 写成 kimi.com 输入框命令。
- 臆造人民币价、自行映射 Moderato↔Go。
- 把 Kimi Work Projects 和 kimi.com Projects 写成同一份数据（官方原文：not connected and don't share data）。
- 模型内部机制（PARL 训练细节只链官方，本站不展开）→ [Learn LLM](/zh/tech/fundamentals/LLM)。

## 基本信息

- 工具名：Kimi（kimi.com 对话与 Agent）
- 厂商：月之暗面 Moonshot AI
- 官方产品页：<https://www.kimi.com/zh-cn/products/>
- 产品本体：<https://www.kimi.com/>
- 帮助中心：<https://www.kimi.com/zh-hans/help> / <https://www.kimi.com/help>
- 公司站：<https://www.moonshot.cn/>
- 发版节奏：帮助中心 Agent 时间线到 2026-07 K3；会员与功能页会改数字
- 当前覆盖：2026-08-19 打开的官方页（见监控页面）

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| Kimi 工作台 / 对话 | https://www.kimi.com/ | 独立页 `kimi.md` | |
| Kimi Agent | https://www.kimi.com/agent | 独立页 `kimi.md` | 与对话同一产品面 |
| Agent Swarm | https://www.kimi.com/agent-swarm | Tutorial + Cookbook | 对话侧模式，官方有完整帮助 |
| Kimi Claw | https://www.kimi.com/bot | Tutorial + Cookbook | 对话侧云端 OpenClaw；帮助中心 15 篇，本 issue 不单独立 Code 式教程 |
| Goal | 会员表 + Projects 页 | 地图一行 + Tutorial 一节 | 官方没有独立 Goal 产品页；聊天侧只写 Projects / 会员原文 |
| Slides / Docs / Sheets / Deep Research / Websites / Design | 首页侧栏 | 地图一行 | 工作台能力，不是另一厂产品 |
| Plugins / Scheduled Tasks / Skills / Projects / Memory | 帮助中心 Features | Tutorial / Cookbook / Cheatsheet | 横切能力 |
| **Kimi Code** | 产品页「Kimi Code」 | **地图一行** → `/zh/products/kimi-code/` | #71；本目录不写安装 |
| Kimi Work | https://www.kimi.com/products/kimi-work | 地图一行 | 桌面知识工作 Agent；另产品 |
| Kimi WebBridge | 产品页「Kimi WebBridge」 | 地图一行 | 浏览器插件；另产品 |
| Kimi Platform / API | https://platform.moonshot.cn/ | 地图一行 | HTTP API；另产品 |
| Kimi Business | 帮助中心 Kimi Business | 地图一行 | 企业方案 |
| 研究 / Doodle / 加入我们 | https://www.moonshot.cn/ | 非本站 | 公司站，不是 AI 产品入口 |

易撞名：Kimi ≠ Kimi Code ≠ Kimi Work ≠ Kimi Claw；Agent ≠ Agent Swarm ≠ Claw 群聊；Goal（工作台）≠ Kimi Code `/goal`；kimi.com Projects ≠ Kimi Work Projects；OpenClaw ≠ Kimi Claw。

## 文档文件结构（Diataxis）

本目录只收 **kimi.com 对话与 Agent**。5 文件，不单独立 Claw / Work / Code 教程。

```
docs/zh/products/kimi/
├── index.md              # 学习地图 + 家族表
├── kimi.md               # Tutorial：打开 kimi.com，对话 / Agent / Swarm / Claw
├── kimi-cookbook.md      # How-to：场景配方
├── kimi-cheatsheet.md    # Reference：入口、额度表、信息源
└── kimi-glossary.md      # Explanation：撞名与「不是什么」

docs/products/kimi/       # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 | 家族表、决策树 | 操作步骤、Code 安装 |
| `kimi.md` | Tutorial | 入口、对话、Agent、Swarm、Claw、会员口径 | Code CLI、API 调用 |
| `kimi-cookbook.md` | How-to | 可跳读配方 | 基础「打开网站」 |
| `kimi-cheatsheet.md` | Reference | 入口、套餐原文表、信息源 | 概念散文 |
| `kimi-glossary.md` | Explanation | 是什么 / 不是什么 | 参数清单 |

跨页：`index` → `kimi` → `kimi-cookbook` → `kimi-cheatsheet` → `kimi-glossary`。

## 监控页面

- 产品家族：<https://www.kimi.com/zh-cn/products/>
- 产品本体：<https://www.kimi.com/>
- 帮助中心：<https://www.kimi.com/zh-hans/help>、<https://www.kimi.com/help>
- Agent：<https://www.kimi.com/zh-cn/help/agent/agent-overview>
- Agent Swarm：<https://www.kimi.com/zh-hans/help/agent/agent-swarm>
- 会员：<https://www.kimi.com/zh-hans/help/membership/membership-overview>
- Claw：<https://www.kimi.com/en/help/kimi-claw/overview>、<https://www.kimi.com/help/kimi-claw/group-chat>
- Features：Projects / Skills / Plugins / Scheduled Tasks / Memory
- 公司站：<https://www.moonshot.cn/>
- API：<https://platform.moonshot.cn/>、<https://platform.kimi.com/>

## Git 提交 scope

```
docs(kimi): ...
```

## 已知踩坑 / 特殊约定

1. **`www.kimi.com` 对部分抓取器会解析到 198.18.x（SSRF 拦截）**。用 web-reader / 浏览器，不要假设 `web_fetch` 能通。
2. **帮助中心 slug 不稳定**：猜路径常落到站内搜索空结果。先打开分类页抄侧栏 slug。
3. **中英帮助路径**：`/zh-cn/help`、`/zh-hans/help`、`/help` 三套并存；canonical 有时跳 `kimi.ai`。链官方时优先用打开成功的那条。
4. **套餐名两套**：会员页乐理名 + 美元；Projects / Scheduled Tasks 用 Free/Go/Pro/Max/Ultra。更新额度时两张表都要核。
5. **Kimi Code 命令不要漏进本目录**。复核时搜 `install.sh`、`@moonshot-ai/kimi-code`、`kimi --version`、`/login`。
6. **导航**：本 issue 执行时用户明确禁止改 gallery / sidebar。页能打开即可。
