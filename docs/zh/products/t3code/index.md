---
title: T3 Code 学习地图
description: T3 Code 是 T3 Tools, Inc. 开源的「coding agent 控制面」：自己不带模型，驱动你电脑上已装好的 Claude Code、Codex 等 agent，并支持人离开电脑后从手机继续。本页给出产品家族表、选型决策，以及本目录三页的读法。
domain: product
tags:
  - coding-agent
  - agent-workspace
  - remote-access
role: map
pageClass: readable-tables
---

# T3 Code 学习地图

> **一句话结论：** T3 Code 是一个开源的本地应用，官方定位是 **The open-source control plane for coding agents**。它不提供模型，也不替代你的订阅；它驱动你电脑上已经装好的 coding agent，把它们放进同一个界面、同一套审批，并让你离开电脑后从手机继续。
>
> 这一组页面回答四件事：它是什么，怎么装上并跑通，日常怎么用，内部怎么运作。

## 基本信息

| 项 | 内容 |
|---|---|
| 官方名称 | T3 Code |
| 公司 | T3 Tools, Inc.（官网页脚、README 和 App Store 开发者栏的写法） |
| GitHub 组织与仓库 | `pingdotgg`，仓库 [`pingdotgg/t3code`](https://github.com/pingdotgg/t3code) |
| 许可 | 源代码 MIT。名字、标志和品牌不在 MIT 范围内 |
| 官网与下载 | [t3.codes](https://t3.codes)、[t3.codes/download](https://t3.codes/download) |
| 命令行包名 | `t3`，例如 `npx t3@latest`；仓库内部的包用 `@t3tools` 作用域 |
| 最早可见的发布记录 | `v0.0.0-alpha.3`，发布于 2026-03-02（[GitHub Releases](https://github.com/pingdotgg/t3code/releases/tag/v0.0.0-alpha.3)，截至 2026-11-24） |
| 文档位置 | 放在 GitHub 仓库里：`docs/user/` 讲使用，`docs/internals/` 讲内部设计 |

本页核对时，t3.codes 的页脚只有 GitHub、Discord、Download、iOS app、Android app、Terms、Privacy、Security 这些入口，没有看到独立的文档站。

<!-- TODO: 待核实 —— 首次公开发布的官方公告（发布文或博客）没有找到。已有的依据是 GitHub Releases 里最早的一条（v0.0.0-alpha.3，2026-03-02）和 GitHub API 返回的仓库创建时间（2026-02-08）；查过 GitHub Releases API、官网首页和一轮中英文搜索，都没有拿到一手公告链接，所以不把 2026-03-02 当作确定的「首发日」 -->

## 写给谁 / 先决条件 / 非目标

- **写给谁**：手上已有两个以上 coding agent 的前端或 AI 应用开发者，尤其是没接触过「agent 工作区」这类产品的人。
- **先决条件**：一台你控制的电脑（macOS、Windows 10 / 11、Linux）；至少一个已安装并登录的 agent，比如 Claude Code 或 Codex。
- **非目标**：
  - 不教 Claude Code 和 Codex 本身，去 [Claude Code](../claude/) 和 [Codex](../codex/)。
  - 不教本地跑模型。官方 FAQ 写明 T3 Code 不支持本地模型。
  - 不讲 Tailscale 怎么搭，去 [Tailscale](../tailscale/)。
  - 不展开 T3 Chat 这个另一款产品。

## 产品家族

官方名称抄自官方页面和仓库文档。本目录只有三页，所以多数家族成员落在教程的某一节里。

| 官方名称 | 官方 URL | 本站去向 |
|---|---|---|
| **Desktop app**（桌面应用，macOS / Windows / Linux） | [t3.codes/download](https://t3.codes/download) | 独立页：[教程](./t3code) 第六、七节 |
| **`t3` command**（命令行） | 下载页的 Terminal 区块，[Install 文档](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/install.md) | 独立页：[教程](./t3code) 第六节 |
| **Web**（托管网页应用） | [app.t3.codes](https://app.t3.codes) | 独立页：[教程](./t3code) 第八节第 2 小节 |
| **Mobile app**（iOS 与 Android） | [App Store](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824)、[Google Play](https://play.google.com/store/apps/details?id=com.t3tools.t3code) | 独立页：[教程](./t3code) 第六节第 4 步、第八节第 2 小节 |
| **Background service**（后台服务） | [Running in the background](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/background-service.md) | 独立页：[教程](./t3code) 第八节第 7 小节 |
| **T3 Connect**（含 relay 中继） | [Remote access](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/remote-access.md)、[T3 Connect 设计说明](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/06_t3-connect.md) | 独立页：[教程](./t3code) 与 [源码解读](./source) |
| **Guest links**（访客链接，beta） | [Guest links](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/guest-links.md) | 独立页：[教程](./t3code) 第十一节 |
| **Managed policy**（托管策略） | [Managed policy](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/managed-policy.md) | 独立页：[教程](./t3code) 第十一节 |
| **Outside agents**（T3 Code 的 MCP 服务器） | [Outside agents](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/outside-agents.md) | 地图一行：让你终端里的 Claude Code、Codex 或 ChatGPT 反过来驱动 T3 Code 的线程 |
| **ACP Registry agents** | [ACP providers](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/providers-acp.md) | 地图一行：概念见[教程](./t3code)第三节，添加步骤见官方页 |
| **Workflows**（早期功能，在 Labs 里） | [Workflows](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/workflows.md) | 地图一行：用 TypeScript 把 agent、定时和人工确认串成一次可恢复的运行 |
| **Device panel**（模拟器面板） | [Devices](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/devices.md) | 地图一行：在线程旁边看 iOS 模拟器或 Android 模拟器 |
| **Triage**（分诊） | [Triage an issue](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/triage.md) | 地图一行：它是什么见[教程](./t3code)第三节 |
| **T3 Chat**（另一个产品） | 见 [FAQ](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/faq.md) | 地图一行：本页核对到的用途是关联账号后提高 T3 Connect 的机器上限 |

### 容易撞名

- **T3 Code 不是 T3 Chat。** 后者是 T3 的另一款产品。本页在 T3 Code 的文档里核对到它的一个用途：关联付费的 T3 Chat 账号后，T3 Connect 能链接的机器更多。
- **T3 Code 不是 Claude Code，也不是 Codex。** 它是驱动方，那两个是被驱动的 agent。官方 FAQ 的原话是：T3 Code uses those harnesses. It is not a harness, and it does not work without one.
- **T3 Tools, Inc. 与 `pingdotgg`。** 前者是官方页面上写的公司名，后者是它的 GitHub 组织名。
- **T3 Connect 不是 Tailscale。** 前者是 T3 自家的远程连接方案；后者是第三方网络，T3 Code 把它当作另一条可选的连接路线。
- **`t3` 命令和桌面应用不是两个产品。** 它们是同一个服务器的两种启动方式，桌面应用里也自带 `t3`。
- **名字不在开源许可里。** MIT 只覆盖源代码。官方要求公开的 fork 换掉 T3 Code 的名字和图标，并声明与官方无关。

## 它解决什么问题

### 没有它和有它

左栏是很多读者的处境，本页把它当作前提，不去断言某款产品的细节。

| 事情 | 各开各的终端或应用 | 用 T3 Code |
|---|---|---|
| 同时用两个 agent | 两个窗口，各自的界面 | 同一个界面里切换。README：Every agent in one place |
| 任务中途想换模型 | 上下文要自己搬 | 在同一线程里换 provider，T3 Code 按预算带过去对话上下文 |
| 并行跑几个任务 | 自己开终端、自己管分支 | 一条线程一个 worktree，各有分支和工作目录 |
| 看改了什么、提交 | 各有各的做法 | 统一的 diff 面板和 Git 操作 |
| 人离开电脑 | 回到电脑前才能点批准 | 手机批准、收通知 |
| agent 进程崩了 | 看各工具自己的恢复能力 | 线程记录持久保存，官方术语表写明它不随 provider 进程退出而消失 |

### 与替代方案

只写能核实的内容。涉及别家产品的部分，链接到本站各自的页面。

| 方案 | 它是什么 | 依据 |
|---|---|---|
| 各 agent 自带的界面 | Claude Code、Codex 各有自己的终端和桌面应用 | 本站：[Claude Code](../claude/)、[Codex](../codex/) |
| **T3 Code** | 跨厂商的驱动方，自带订阅，驱动已装好的 agent | README、FAQ |
| Codex desktop app、Conductor、Claude Desktop、Cursor Glass | T3 Code 官方点名「启发过它」的四款产品，官方说它们都没达到自己的标准 | FAQ：Why use T3 Code instead of Claude Code or the Codex app? |
| [Cindy](../cindy/) | 同类的多 agent 工作区产品 | 对比见 Cindy 页；本页没有核实它的细节 |
| [Tailscale](../tailscale/) | 一条连接路线，解决「怎么连回你的电脑」，不驱动 agent | T3 Code 的 Remote access 文档把它列为 T3 Connect 之外的选项 |

## 快速决策：我该用哪个

| 我的情况 | 用什么 |
|---|---|
| 只用一个 agent，偶尔用 | 先用它自带的界面：[Claude Code](../claude/) 或 [Codex](../codex/) |
| 同时用两个以上 agent，想在一个窗口里切 | T3 Code 桌面应用 |
| 想并行跑多个任务，各占一个分支 | T3 Code，开线程时选 **New worktree** |
| 人常不在电脑前，要用手机点批准 | T3 Code 加 T3 Connect，加手机 App |
| 公司网络挡了 T3 Connect 的出站端口 | T3 Code 加局域网直连，或 [Tailscale](../tailscale/) |
| 想在自己的服务器上跑，平时远程连 | 用 `t3 up` 装成后台服务，再用 [app.t3.codes](https://app.t3.codes) 或手机连 |
| 不想经过 T3 的任何服务 | 不开 T3 Connect，只用局域网或 Tailscale 直连，并关掉遥测 |
| 要给团队的机器定权限上限 | T3 Code 的托管策略 |
| 想和同类产品比一比 | [Cindy](../cindy/) |

## 本目录怎么读

| 页面 | 读完能做什么 | 什么时候读 |
|---|---|---|
| [教程](./t3code) | 装好它、跑通第一个线程、按场景选权限模式、从手机继续、说出三条安全边界 | 第一次用 |
| [源码解读](./source) | 看懂一条线程的数据流、权限模式在哪段代码里被执行、T3 Connect 的信任模型 | 用顺之后，或者准备给 T3 Code 提 PR |

建议顺序：

1. **先读[教程](./t3code)。** 10 分钟的纵向切片在第七节，装好就能跑。概念看不懂时回到第三节。
2. **再读[源码解读](./source)。** 它默认你已经会开线程、切权限模式，不然「命令」「事件」「副作用」这些词没有落点。
3. **回头看本页的家族表。** 教程只展开了家族里最常用的几项，访客链接、托管策略、MCP 服务器这些按需再查。

## 官方资源（深入阅读）

仓库里的文档链接固定在提交 `d00aaac8`，想读最新版把提交号换成 `main`。

- [官网 t3.codes](https://t3.codes)：定位、下载入口，以及一句它支持的 agent 列表。
- [下载页](https://t3.codes/download)：三个桌面平台的安装包、命令行安装方式、手机商店入口。
- [app.t3.codes](https://app.t3.codes)：托管网页应用，只负责连到你自己的环境。
- [仓库 README](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/README.md)：它是什么、支持哪些 agent、怎么装、许可与品牌政策。
- [docs/README.md](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/README.md)：全部文档的目录，分使用、内部设计、运维手册三块。
- [Install T3 Code](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/install.md)：各平台安装与每个 provider 的登录方式。
- [FAQ](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/faq.md)：成本、额度、远程、封号，以及「T3 Code 是不是 harness」。
- [Architecture](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/01_architecture.md)：所有权边界、「先落库再执行副作用」的设计约束。
- [SECURITY.md](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/SECURITY.md)：谁被信任、什么算漏洞、什么是有意为之。
- [GitHub Releases](https://github.com/pingdotgg/t3code/releases)：稳定版和 nightly 的变更记录。
- [Discussions 里的 Ideas](https://github.com/pingdotgg/t3code/discussions/categories/ideas)：提功能建议的地方。README 写明功能要先有被接受的讨论。
- [Discord](https://discord.gg/jn4EGJjrvv)：README 给出的求助渠道，邀请页显示的服务器是 Theo's Typesafe Cult。
- [What is a "harness"?](https://t3.gg/blog/post/what-is-a-harness)：官方博客，讲模型、harness、agent 和 T3 Code 的分工。
- [Agent Client Protocol](https://agentclientprotocol.com/overview/introduction)：ACP 的官方介绍。

## 相关页面（站内）

- [教程](./t3code)、[源码解读](./source)：本目录的另外两页。
- [Claude Code](../claude/)、[Codex](../codex/)：被 T3 Code 驱动的两个 agent 本身。
- [Codex Dot](../codex/dot)：OpenAI 侧的常驻智能体，想比较「谁来接着推进任务」时对照着看。
- [Cindy](../cindy/)：同类的多 agent 工作区产品。
- [Tailscale](../tailscale/)：T3 Connect 之外的连接路线。
- [UU Remote](../uu-remote/)：「人不在电脑前」的另一类做法，先弄清自己要的是哪一种。
