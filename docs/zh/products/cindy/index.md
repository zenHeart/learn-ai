---
title: Cindy 学习地图
description: Cindy 是开源的桌面加手机 AI 智能体应用，把 Claude Code、Codex、Pi 三个 harness 装进同一个工作区，让任务、模型和技能跨设备可用。本页是产品全景加决策表：先回答「我要做什么、该不该用它」，再进教程和源码解读。
domain: product
tags:
  - multi-agent
  - coding-agent
  - device-link
role: map
---

# Cindy 学习地图

> **一句话结论：** Cindy 是心动（XD）运营的开源 AI 智能体应用，服务的是已经在用 Claude Code 或 Codex 的人：
> 把三个 agent 引擎装进同一个工作区，让同一个任务、同一份记忆在多个引擎和多台设备之间延续。
> **想在一台设备上把几个编码 agent 放在一起用，或者在手机上接着电脑上的活，就看本目录。**
> 只用一个 agent、也不需要多设备，直接用原工具更省事。

## 写给谁、先决条件与非目标

- **写给谁**：已经在用或准备用 Claude Code、Codex 的前端工程师，想知道要不要装 Cindy、和手上的工具是什么关系。
- **先决条件**：知道「agent 能读文件、跑命令」这个程度即可。术语在[教程](./cindy)里第一次出现时都会解释。
- **非目标**：
  - 不教 Claude Code、Codex、Pi 本身，见 [Claude](../claude/)、[Codex](../codex/)、[Pi](../pi-coding-agent)。
  - 不教自建 Cindy 后端。README 写明「服务端不在本仓库」。
  - 不覆盖团队版与企业版的采购细节，两者尚未开放。

## 产品家族

下表的「官方名称」抄自 2026-11-24 打开的官网、README 与仓库文档。带「应用内」的项没有独立官网页面。

| 官方名称 | 官方 URL | 本站去向 |
|---|---|---|
| Cindy（开源客户端，Apache-2.0） | [cindy.app](https://cindy.app) · [cindy.cn](https://cindy.cn) · [GitHub](https://github.com/makecindy/cindy/releases) | 本目录：[教程](./cindy)、[源码解读](./source) |
| 中国大陆版 / 国际版 | [cindy.cn/download](https://cindy.cn/download) · [cindy.app/download](https://cindy.app/download) | [教程的安装一节](./cindy) |
| Cindy 官方模型服务（界面里叫 Cindy AI） | [中国大陆定价](https://cindy.cn/pricing) · [国际版定价](https://cindy.app/pricing) | 教程「计费」一节 |
| 移动端（iOS、iPadOS、Android） | 下载页 | 教程「连接第二台电脑和手机」 |
| Linux 桌面端 | 国际版下载页 · [安装指南](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/linux.md) | 教程「安装」 |
| Device Link | 应用内 | 教程「连接第二台电脑和手机」；源码解读 |
| 远程桌面 | 应用内（手机端） | 教程「连接第二台电脑和手机」 |
| Agent-Net (Beta) | 应用内开关，默认关 | 源码解读 |
| 伙伴（companion） | 应用内 | 教程「建一个伙伴」 |
| 自动化（automation） | 应用内 | 教程「设自动化」 |
| 聊天渠道（Slack、Telegram、飞书等） | 应用内 | 教程「接聊天渠道」 |
| Orca（协同） | 应用内 | 教程「用 Orca 让多个 agent 分工」；源码解读 |
| SkillHub | 应用内 | 教程「用记忆和 Skill」 |
| 官方插件仓库 cindy-official-plugins | [GitHub](https://github.com/makecindy/cindy-official-plugins) | 地图一行：官方插件的源码与上架流程 |
| 插件版引擎（cindy-dsh-plugin、cindy-antigravity-plugin、cindy-zcode-plugin） | [GitHub 组织](https://github.com/makecindy) | 地图一行：把 DeepSeek Harness、Antigravity CLI、ZCode 作为引擎接入的插件 |
| Cindy Host（`cindy-host`） | 无公开页；见仓库 `docs/host/README.md` | 源码解读；实验性 |
| Cindy Headless | 无公开页；见仓库 `apps/cindy-headless/README.md` | 源码解读；面向容器与评测 |
| 团队与企业版（Team & Enterprise） | 官网首页「候补名单」 | 地图一行：状态是「即将上线」「联系我们」 |
| 隐私政策、服务条款 | [cindy.cn/privacy](https://cindy.cn/privacy) · [cindy.app/privacy](https://cindy.app/privacy) · [cindy.cn/terms](https://cindy.cn/terms) | 教程「安全与隐私要点」 |

<!-- TODO: 待核实 —— 三个插件版引擎仓库的安装方式与可用范围。我只确认了组织下有这三个仓库及其描述，没有读它们的 README -->

### 容易撞名与误解

- **Cindy 要认准出处。** 仓库在 `makecindy` 组织下，官网只有 `cindy.app` 和 `cindy.cn` 两个。
- **中国大陆版不等于国际版。** 两个官网、两套账号。README 提醒开发时「中国大陆账号必须使用 `cn`，国际版账号必须使用 `global`」。
- **harness 不等于模型。** harness 是执行引擎（Claude Code、Codex、Pi），模型是另一层选择。
- **Pi 是 harness，不是订阅。** 官网原话：「Pi 是 Harness，无需另买一份订阅。」
- **界面里的「任务」就是 session。** 官方文档里任务、session、task 混用，指同一个东西。
- **Device Link 不等于 Agent-Net。** 前者是现有的设备互联，后者是标了 Beta 的新版，默认关闭。
- **伙伴不等于子代理。** 伙伴是跨任务存在的角色；子代理是某个 agent 内部一次性的子任务执行者。
- **Skill 不等于插件。** Skill 是一份操作说明；插件是 `.cindy` 安装包，能带界面和新工具。
- **「跳过登录」不等于自建服务端。** 它只是不登录 Cindy 账号，客户端仍然连着官方云服务的地址。
- **源码里有一批旧名字。** 仓库内部把产品叫 `xdt-maker`，把插件叫 Ghost，把协同叫 Orca，环境变量前缀是 `XDT_`。搜代码时要按这些名字搜。
- **`cindy-host` 与 `cindy-headless` 是两个东西。** 前者是 `apps/host` 里的通用后台服务，后者是 `apps/cindy-headless` 里面向容器和评测的运行时。
- **版本号容易看反。** GitHub 上最早的 Release 叫 `v1.0.0`（2026-07-25），之后发布的版本号却是 `v0.1.x`。`v1.0.0` 没有附带任何安装包，说明写它「标记 1.0.0 版本期的开源客户端源码快照」；截至 2026-11-24，最新的正式版是 `v0.1.144`。

## 它解决什么问题

README 对问题的描述只有一句话：「连接你的多台电脑与手机，把熟悉的 Agent、模型和已有订阅放在一起」。
落到日常，是下面这些反复出现的不顺手：

| 场景 | 没有 Cindy | 有 Cindy |
|---|---|---|
| 同时用 Claude Code 和 Codex | 换一个 agent 就要从头交代背景 | 同一个任务里换 harness 接着干，Cindy 用交接文本把上下文带过去 |
| 人离开电脑 | 活停在电脑上 | 手机或另一台电脑打开同一个任务，继续对话、访问文件 |
| 聊天搞不定，要亲手点软件 | 只能回到电脑前 | 手机端内置远程桌面 |
| 一台电脑上配好的模型 | 别的设备要再配一遍 | 开启远程调用后，其他设备可以借用 |
| 积累的工作方法 | 散落在各个工具自己的配置里 | 记忆、Skill、伙伴由 Cindy 统一管理，跨引擎共享 |
| 重复的事 | 每次手动发起 | 设成自动化，或在聊天渠道里 @ 一句 |
| 一个 agent 忙不过来 | 手动在几个工具之间搬结果 | Orca：一个 Lead 带多个 Worker，各选 harness 和模型 |

有一件事它**不**做，官网常见问题写得很清楚：电脑关机后，手机不能让任务继续跑。
远程任务由电脑执行，手机「不会把离线电脑的工作自动搬到云端执行」。

### 与替代方案对比

下表只写 Cindy 这一侧能核实的事实，其他产品的细节以各自页面为准。

| 工具 | 它管什么 | 和 Cindy 的关系 | 适合谁 |
|---|---|---|---|
| Claude Code、Codex、Pi | 各自是一个 harness | Cindy 把三者装进来，不替代它们 | 只用一个 harness、不需要多设备的人，直接用原工具 |
| [T3 Code](../t3code/) | 同类的多 agent 工作区 | 定位相近，选型时要逐项对比 | 在两者之间做选型的人 |
| [Tailscale](../tailscale/)、[UU Remote](../uu-remote/) | 远程控制与组网 | Cindy 的 Device Link 只连你账号下的 Cindy 设备，远程桌面只在手机端内置；它不是通用组网工具 | 需要连任意设备、任意服务的人 |
| [Codex 云端智能体](../codex/dot) | 任务在云端常驻运行 | Cindy 让你自己的电脑当服务器，任务和文件留在本机，电脑得在线 | 不想维护一台常开电脑的人 |
| 自己搭服务器跑 agent | 自己部署、自己维护 | README 的说法是「不用另租服务器，也不必自己搭服务」 | 有自建需求、且能接受服务端不在开源范围的人 |

<!-- TODO: 待核实 —— Cindy 与 T3 Code 的逐项差异（支持哪些 agent、多设备方式、开源范围）。本页没有调研 T3 Code，待该页成稿后回来补对比 -->

## 快速决策：我该不该用、从哪里开始

| 我的情况 | 用什么 |
|---|---|
| 只用 Claude Code，只在一台电脑上 | 不需要 Cindy |
| 同时用两个以上的编码 agent，来回复述背景很烦 | 用 Cindy，先读[教程](./cindy)的「换 harness 接着干」 |
| 经常离开电脑，想在手机上看任务 | 用 Cindy 并登录，读「连接第二台电脑和手机」 |
| 想在手机上操作电脑上的软件 | 用 Cindy 的远程桌面；先确认电脑能保持在线 |
| 一台电脑配好了模型，别的设备想借用 | 用 Cindy 的模型共享，在那台电脑上允许远程调用 |
| 只想在一台电脑上用，不想让设备保持在线 | 用「跳过登录」的本地模式，自带 API key |
| 不想自己配模型 | 登录后用 Cindy 官方模型服务，按量或包月付费 |
| 想让几个 agent 分头做一个大任务 | 用 Orca，每个 Worker 可以选不同的 harness |
| 有一台常开的电脑，想让其他设备连回它 | 用 Cindy 并登录，电脑上打开「允许同账号设备控制本机」 |
| 每天有固定的巡检、汇报 | 用自动化，把结果推到聊天渠道 |
| 要审计代码、自己改 | 客户端是 Apache-2.0，读[源码解读](./source) |
| 需要自建后端或私有部署 | 个人版不适用；企业版的 Gateway 自部署在官网上是「联系我们」 |

## 本目录怎么读

| 页面 | 读完能做什么 | 什么时候读 |
|---|---|---|
| [教程](./cindy) | 装好 Cindy，10 分钟跑通第一个任务，连上手机，设好隐私开关 | 第一次接触 |
| [源码解读](./source) | 说清一次任务的数据流、Codex 接在哪里、手机控制电脑的边界、Orca 的实现 | 想审计代码、要贡献，或教程里「为什么这样」说不清的时候 |

建议顺序：

1. **先读教程，照着做完第一个任务。** 没跑过就看源码，会被一堆名词挡住。
2. **再读教程的「安全与隐私要点」。** 它决定你选登录还是跳过登录。
3. **最后按需读源码解读。** 它回答的是「凭什么信它」，不解决「怎么用」。

## 官方资源

- [仓库中文 README](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/README.zh-CN.md)：功能、两种运行模式、隐私与遥测的官方说明，事实的第一出处。
- [官网](https://cindy.cn)：定位、Harness 与模型的区别、常见问题。
- [下载页](https://cindy.cn/download)：各平台的系统要求。
- [定价页](https://cindy.cn/pricing)：四档价格、滚存规则与八条计费规则，截至 2026-11-24。
- [隐私政策](https://cindy.cn/privacy)：每一类数据的用途、心跳与使用统计、留存期限。
- [服务条款](https://cindy.cn/terms)：自备 key 模式与官方网关模式的责任边界。
- [GitHub Releases](https://github.com/makecindy/cindy/releases)：逐版本的更新说明。
- [官方插件仓库](https://github.com/makecindy/cindy-official-plugins)：官方插件的源码、审阅标准与自动上架流程。
- [使用支持](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/SUPPORT.md)：遇到问题先查哪里、怎么提 issue。

## 相关页面

- [教程](./cindy)、[源码解读](./source)：本目录的另外两页。
- [Claude](../claude/)、[Codex](../codex/)、[Pi](../pi-coding-agent)：Cindy 装进来的三个 harness。
- [T3 Code](../t3code/)：同类的多 agent 工作区。
- [Tailscale](../tailscale/)、[UU Remote](../uu-remote/)：远程控制与组网类工具。
- [Codex 云端智能体](../codex/dot)：任务在云端常驻运行的另一种思路。
