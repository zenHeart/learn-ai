# Cloud Agents

Cloud Agents 用同一套 [agent fundamentals](https://cursor.com/learn/agents)，但跑在**隔离 VM** 里，环境接近你本机：克隆仓库、装依赖、密钥、启动命令、网络。

> 官方：[Cloud Agents](https://cursor.com/docs/cloud-agent)。**曾用名 Background Agents** — 一个产品，不是两个。
>
> 本页讲**形态**：何时用、怎么开、和本机差在哪。任务配方留在 [Cookbook](./cursor-cookbook#派-cloud-agent-干活)。

## 先决条件

- **付费** Cursor 计划
- 账号**管理员**已接源代码托管：[GitHub](https://cursor.com/docs/integrations/github)、[GitLab](https://cursor.com/docs/integrations/gitlab)、[Bitbucket Cloud](https://cursor.com/docs/integrations/bitbucket) 或 [Azure DevOps](https://cursor.com/docs/integrations/azure-devops)
- 对仓库（以及依赖仓 / 子模块）有读写权限
- 接受官方说法：Cloud 是需要 Cursor **存代码**的功能。策略禁止存储就不要开

## 学习目标

读完本页你能：

1. 在 Cloud、本机 Agent、Bugbot、CLI 之间做选择
2. 从桌面、网页、手机 / PWA、Slack、GitHub、Linear 或 `agent` + `&` 发起
3. 把**环境配置**当成主杠杆
4. 知道 VM 上 MCP / Hooks 的官方限制

---

## 为什么用 Cloud Agents

- **想开多少条并行就开多少条**
- 笔记本**不必**保持在线
- VM 可以 **build、测试、操作**改过的软件，包括桌面 / 浏览器 computer use
- 团队 [MCP](https://cursor.com/docs/mcp)（HTTP 和 stdio；需要时支持 OAuth）
- **多仓**环境：看完整工作区、协调改动、在改过的仓**各开一个 PR**。官方：**多仓暂不支持 long-running**

官方原文：不配环境就像不给工程师电脑。

## 从哪发起

| 入口 | 怎么开 |
|------|--------|
| **Cursor Desktop** | Agent 输入框下拉选 **Cloud** |
| **Cursor Web** | 任意设备打开 [cursor.com/agents](https://cursor.com/agents) |
| **Cursor for iOS** | 原生应用 — [mobile](https://cursor.com/docs/cloud-agent/mobile) |
| **Android** | Chrome 打开 [cursor.com/agents](https://cursor.com/agents) → **Install App**（PWA） |
| **Slack / Linear** | `@cursor`（管理员先装集成） |
| **GitHub / Bitbucket** | 在 PR 或（GitHub）issue 评论 `@cursor` |
| **API** | Cloud Agents API |
| **Cursor CLI** | 消息前加 `&` — 见 [CLI](./cursor-cli) |

不要把「光标旁三行」丢到这里 — 那是 Tab。不要用 Cloud 当 PR 审查 — 那是 [Bugbot](./cursor-cookbook#用-bugbot-审-pr)。

## 它怎么跑

1. Cloud 从已接的提供方克隆到**单独分支**
2. Agent 在配好的环境里干活
3. push 并交接（常见是可合并的 PR + artifacts）

环境可以用 agent-led setup、保存的 snapshot，或通过 `.cursor/environment.json` 指 Dockerfile。见 [Cloud agent setup](https://cursor.com/docs/cloud-agent/setup)。[Builds](https://cursor.com/docs/cloud-agent/builds) 在后台准备仓库和依赖。

在 agent 页把鼠标放到仓库名上，能看到这次运行用的环境和 Build。

运行时控制（官方）：密钥、出站域名白名单、Tailscale 一类的私网、受支持 SCM 路径的私有连接。全集：[Security and network](https://cursor.com/docs/cloud-agent/security-network)。

## MCP 和 Hooks（官方限制）

**MCP：** 来自 [cursor.com/agents](https://cursor.com/agents) 上的团队 MCP 下拉。HTTP 和 stdio。支持 OAuth。内置 [Cursor Cloud MCP](https://cursor.com/docs/cloud-agent/capabilities.md#cursor-cloud-mcp) 做运行诊断（transcript、事件、环境、setup 日志）。

**Hooks：** 只跑仓库 **`.cursor/hooks.json`** 里的 command-based 钩子。Enterprise 还会跑团队钩子和企业托管钩子。只读探索的早期回合**不跑**；Agent 拿到可写环境后才开始。

Cloud 上没有：

- 用户级 `~/.cursor/hooks.json`（VM 读不到你的 home）
- IDE 专用钩子（Tab hooks、`workspaceOpen`）

支持的家族包括工具 / 文件钩子（`preToolUse`、`beforeShellExecution`、`afterFileEdit`）和生命周期钩子（`beforeSubmitPrompt`、`subagentStart` / `subagentStop`、`preCompact`、`afterAgentResponse` / `afterAgentThought`、`stop`）。对照表：[Hooks · Cloud agent support](https://cursor.com/docs/hooks.md#cloud-agent-support)。

## Artifacts、桌面、分享

- **Artifacts：** 截图、录像、日志 — 改了什么、怎么验收
- **远程桌面：** 接管 Agent 桌面验收，不必本地 checkout；交还控制权让它继续
- **分享：** 发 agent URL。查看者必须在**同一个 Cursor 团队**，并且用**自己的** SCM 账号对该仓有权限。光是团队成员不够。默认只读，除非管理员打开 [team follow-ups](https://cursor.com/docs/cloud-agent/settings.md#team-follow-ups)

## 模型和计费

Cloud Agents 用一组精选模型。受支持的模型可选上下文窗口。窗口更大，token 和费用可能更高。

按所选 [模型](https://cursor.com/docs/models-and-pricing.md#model-pricing) 的 **API 定价**计费。第一次用时要设花费上限。

## 手机、JetBrains、Plugins、Automations

导航级一行，官方页，不另开教程：

| 入口 | 官方一句话 |
|------|------------|
| **iOS / PWA** | 原生 iOS（beta，iOS / iPadOS 26+）发起和审查 Cloud Agents。Android：装 PWA。[Mobile](https://cursor.com/docs/cloud-agent/mobile) |
| **JetBrains** | IntelliJ / PyCharm / WebStorm 里的 ACP agent。付费计划 + AI Assistant 2025.1+。[JetBrains](https://cursor.com/docs/integrations/jetbrains) |
| **Xcode** | Xcode 26.3+ 内置 MCP：构建、测试、SwiftUI 预览、Apple 文档。[Xcode](https://cursor.com/docs/integrations/xcode) |
| **Plugins** | 打包 rules、skills、agents、commands、MCP、hooks。[Plugins](https://cursor.com/docs/plugins) |
| **Automations** | 按日程或事件跑 Cloud Agents（GitHub、GitLab、Slack、webhook、Linear …）。该页上三个 Cursor 托管 Agent 是 Bugbot、Security Agents、PR Routing。[Automations](https://cursor.com/docs/cloud-agent/automations) |

## 什么时候用

| 派 Cloud | 留在本机 |
|----------|----------|
| 人不在、隔夜、要并行很多条 | 你要盯 diff、改计划、用 Debug Mode |
| 隔离 VM + 测试 + PR | 密钥 / 服务从没离开过你的机器 |
| 跨仓协调并分别开 PR | 单仓、你已经 checkout 好了 |

任务配方（environment.json、AGENTS.md 标题、派发清单）：[Cookbook · Cloud](./cursor-cookbook#派-cloud-agent-干活)。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 不配环境 | Agent-led setup 或 `.cursor/environment.json` + Secrets 页 |
| 指望本机 `mcp.json` / `~/.cursor/hooks.json` | 团队 MCP 在 cursor.com/agents；只跑**项目** command hooks |
| 用 Cloud 当 PR 审查 | [Bugbot](./cursor-cookbook#用-bugbot-审-pr) |
| 为三行代码起一台 VM | Tab 或 `Cmd+K` |
| 多仓还要 **long-running** | 官方：**还不能** |
| 同事打不开你的运行 | 同一团队 **并且** 他自己对该仓有 SCM 权限 |
| 把 `.env.local` 打进 snapshot 就完事 | 官方更推荐 **Secrets** 页 |
| 把 “Background Agents” 写成第二个产品 | 同一产品，新名字是 Cloud Agents |

## 下一步

- [Cookbook · Cloud](./cursor-cookbook#派-cloud-agent-干活) — 配方
- [Cursor CLI](./cursor-cli) — 终端里 `&` 交接
- [Security Agents](./security-agents) / [PR Routing](./pr-routing) — 跑在 Cloud 上的 Automations
- [Origin](./origin) — Cloud 可以对 Origin remote 干活
- 官方：[Overview](https://cursor.com/docs/cloud-agent)、[Setup](https://cursor.com/docs/cloud-agent/setup)、[Capabilities](https://cursor.com/docs/cloud-agent/capabilities)、[Security](https://cursor.com/docs/cloud-agent/security-network)
