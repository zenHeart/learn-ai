---
title: T3 Code 上手：装好它，跑通第一个线程，从手机继续
description: T3 Code 是一个开源的本地应用，自己不带模型，专门驱动你电脑上已装好并登录的 coding agent，让它们共用一个界面、一套审批和改动查看，并支持人离开电脑后从手机继续。本页带你装好它、跑通第一个线程、学会权限模式与远程访问，并讲清三条安全边界。
domain: product
tags:
  - coding-agent
  - agent-workspace
  - remote-access
role: tutorial
---

# T3 Code 上手：装好它，跑通第一个线程，从手机继续

> **一句话结论：** T3 Code 是一个开源的本地应用。它自己不带模型，而是驱动你电脑上**已经装好并登录**的 coding agent（Claude Code、Codex、Cursor、OpenCode 等），让它们共用一个界面、同一套审批和改动查看；你离开电脑后，可以从手机批准下一步、收通知。
>
> 它解决的是「agent 太多、各开各的窗口、人一走开就停」的问题。它不会再给你一个更强的 agent。

本页的命令、菜单路径和数字都核对自 2026-11-24 的官方文档与源码（仓库提交 `d00aaac8`）。T3 Code 更新很快，GitHub Releases 上几乎每天都有 nightly，细节以你所用版本自带的文档为准。官方文档放在仓库的 `docs/user/` 目录里，本页给出的文档链接固定在上述提交。

## 一、学完你能做什么

- 说清 T3 Code、Claude Code、Codex 各自负责什么，以及为什么必须先装好至少一个 agent。
- 在 macOS、Windows 或 Linux 上装好 T3 Code，并在 **Settings → Providers** 里确认它认出了你已登录的 agent。
- 开出第一个线程，用 **Supervised** 模式跑一个小任务，在对话里拒绝或批准它的操作，再查看它改了哪些文件。
- 把新线程的默认权限从 **Full access** 改成更稳的档位，并按场景切换四种模式。
- 用 T3 Connect 把手机连到这台电脑，并打开通知。
- 说出访客链接、遥测、托管策略各自意味着什么风险，以及怎么关、怎么收紧。

## 二、写给谁、先决条件与非目标

- **写给谁**：手上已有两个以上 coding agent 的前端或 AI 应用开发者，比如同时订了 Claude 和 ChatGPT；想并行跑多个任务，各占一个分支；想离开电脑后用手机看进度、点批准。没接触过「agent 工作区」这类产品、不熟悉 harness 和 provider 这些词，也适用。
- **先决条件**：一台你控制的电脑当主机，桌面应用支持 macOS、Windows 10 / 11、Linux（[官方下载页](https://t3.codes/download)）；至少一个已安装并登录的 agent，官方原文是 You need an installed, authenticated provider before starting a thread；要用 Pull Request 功能，官方要求主机上装好 Git 并配置好认证。
- **非目标**：不教 Claude Code 和 Codex 本身，去 [Claude Code](../claude/) 和 [Codex](../codex/)；不教本地跑模型，官方 FAQ 写明 T3 Code 不支持本地模型；不讲 Tailscale 怎么搭，见 [Tailscale](../tailscale/)；不是官方文档的翻译，冲突时以官方为准。

### 先确认一件事：agent 到底跑在哪

新人最容易担心的是「用了 T3 Code，代码是不是被传到 T3 的服务器上跑了」。按官方文档，不是：

- README：T3 Code runs the coding agents on your machine.
- Install 文档：Set up the machine where the agents will work first.
- ACP 文档：Registry agents always run on the machine that hosts your T3 Code server. That stays true when you connect through app.t3.codes, T3 Connect, or a relay.
- FAQ：Your agents run wherever T3 Code runs: your desktop, a server, a VPS.

所以「agent 跑在你自己的机器上」这句话成立。补三点，免得理解过头：

1. **「你的机器」可以是你的笔记本，也可以是你租的 VPS。** 本页核对过的官方文档里，没有 T3 代管机器的选项。
2. **agent 进程在本机，模型仍在各家厂商的云上。** FAQ 原文：Your code and prompts go from your machine to your provider (Anthropic, OpenAI, etc.), not to us.
3. **T3 自己运营的是三样东西**：T3 Connect 的中继（relay）、产品使用数据端点 `ingest.t3.codes`、网页端 app.t3.codes。网页端只是客户端，连接列表存在你的浏览器里，直连你的服务器，不代理流量。

## 三、核心概念

下面这些词在界面和官方文档里反复出现。先过一遍表，再逐个展开。

### 术语表

| 术语 | 一句话解释 | 为什么需要 |
|---|---|---|
| **环境**（environment） | 一台正在运行 T3 Code 服务器的机器，连同它的登录凭据、文件和状态 | 你可能有好几台机器，每一步操作都要落在其中一台上 |
| **服务器**（server） | T3 Code 的后台进程，替你启动和管理 agent 进程、终端、Git | 界面只是遥控器，真正安排干活的是它 |
| **项目**（project） | 环境里的一个工作目录，通常是一个代码仓库 | agent 得知道去哪个文件夹干活 |
| **线程**（thread） | 一次持续的对话，连同它产生的全部工作记录 | 一个任务一条，agent 进程退出了记录也还在 |
| **轮次**（turn） | 你发一句话，到 agent 把这一轮干完 | 改动、检查点都按轮次记录 |
| **provider**（提供方） | T3 Code 所控制的那个 agent 运行时，比如 Codex 或 Claude Code | T3 Code 不带模型，活是 provider 干的 |
| **provider 实例**（provider instance） | 一个配置好的 provider，同一种 agent 可以配多个 | 工作账号和个人账号分开 |
| **权限模式**（permission mode） | 规定 agent 动手之前要不要先问你 | 这是你对 agent 最主要的刹车 |
| **worktree** | Git 的一种独立检出目录，让线程在自己的分支和目录里改代码 | 并行任务互不踩文件 |
| **检查点**（checkpoint） | 保存下来的工作区快照，存成隐藏的 Git 引用 | 看改动、回退都靠它，还不会弄乱你的分支 |
| **ACP** | 客户端与 agent 之间的一套通用协议 | 一份适配代码就能接很多 agent |
| **T3 Connect** | T3 官方的远程连接方案，不用在路由器上开端口 | 人在外面也能连回自己的电脑 |
| **T3 home** | T3 Code 的数据目录，默认 `~/.t3` | 线程、设置、日志都在这里 |

### 线程、项目与 worktree

**线程**（thread，一次持续的对话，连同它产生的全部工作记录）。你说的每句话、agent 的回复、它跑过的命令、改过的文件、问过你的问题，都记在这条线程里。官方术语表强调了一点：线程 Survives provider process exits，也就是 agent 进程退出了，线程还在。用法上一个独立任务开一条，可以置顶、休眠（Snooze）、归档。**Settle**（结算）是 T3 Code 特有的状态：把做完的活移出活跃列表，但不删对话；之后你、agent 或定时任务再发消息，它自动回到活跃状态。

**项目**（project，环境里的一个工作目录，通常是一个代码仓库）。线程可以属于一个项目，也可以不带项目；不带项目时，它在 `~/.t3/scratch` 下用自己的文件夹。**worktree**（Git 的功能：同一个仓库再检出一个独立目录，各占一个分支）。开新线程时选 **New worktree**，这条线程就有了自己的分支和工作目录。同一个检出里的线程共享同一个分支，官方写明其中一条在干活时，T3 Code 会拒绝在那里切分支，所以并行任务要各开 worktree。**多仓库项目**：一个项目可以覆盖好几个仓库，T3 Code 把项目文件夹里的仓库都算进来（往下看一层，再往非仓库的文件夹里看一层），比如 `shop/api` 和 `shop/web`；文件夹之外的仓库要手动加，做法见第八节。**检查点**（checkpoint，保存下来的工作区快照）存成隐藏的 Git 引用，官方说明这样工作区快照就不会往你的分支上加提交。

### 服务器与 provider：谁在干活

**服务器**（server，T3 Code 的后台进程）。按官方架构文档，它拥有 agent 进程、终端、Git、检查点、持久状态和项目文件。桌面应用自带一个服务器；用 `t3` 命令行时，服务器单独运行。

**provider**（提供方，T3 Code 所控制的那个 agent 运行时，比如 Codex 或 Claude Code）。README 的原话是：T3 Code does not resell tokens. It drives the agents you are already signed in to. **provider 实例**（一个配置好的 provider）让同一种 agent 可以配多次，比如工作账号和个人账号各一个，每个实例有自己的环境变量。有一条边界要先讲明：**T3 Code 的环境不是沙箱**。SECURITY.md 写得很直接，它故意以你的操作系统用户权限去跑 agent 和终端。限制 agent 能做什么，靠权限模式和各 agent 自己的规则，而不是靠 T3 Code 把它关起来。

### ACP：一份适配接很多 agent

**ACP**（Agent Client Protocol，客户端与 agent 之间的一套通用协议：双方约定好怎么对话，界面换谁、agent 换谁都能接上）。官方定义见 [agentclientprotocol.com](https://agentclientprotocol.com/overview/introduction)：The Agent Client Protocol standardizes communication between code editors/IDEs and coding agents. 它的思路和 LSP（Language Server Protocol，编辑器与语言服务器之间的通用协议）一样；该页说明了没有统一协议时的麻烦，每个界面都得为每个 agent 单独写集成。对 T3 Code 来说，Claude、Codex 这些主流 agent 各有专门适配，走它们各自的原生协议；其余 agent 走通用的 ACP 适配，在 **Settings → Providers → Add provider → Show more** 里可以从 ACP Registry 添加，也可以填一条本地的 ACP 命令。

### 权限模式：四个档位

**权限模式**（permission mode，规定 agent 动手之前要不要先问你）。这是你对 agent 最主要的刹车，四个档位列在下表。

| 模式（界面原文） | 官方定义 | 适合什么场景（本站建议） |
|---|---|---|
| **Supervised** | 命令和文件改动都要你批准 | 第一次用、仓库不熟、agent 可能碰到配置和凭据 |
| **Auto-accept edits** | 改文件自动放行，其他动作仍可能要你批准 | 信它改代码，但跑什么命令要把关 |
| **Auto** | 用 provider 自带的自动审查放行常规动作，其余的才问你 | provider 支持自动审查、任务又长，不想一路点批准 |
| **Full access** | 命令和改动都不弹审批 | 一次性的、隔离的实验项目 |

三件必须知道的事：

1. **新线程的初始默认是 Full access。** 官方原文：The initial default is **Full access**。你什么都不改的话，agent 默认不问你就改文件、跑命令。第一次用请先按第七节切成 Supervised。
2. **各 provider 落实得不一样。** **Auto** 在 Codex、Claude、Cursor、Grok、Antigravity 和 fx 上走自动审查，没有对应能力的（官方点名 OpenCode）退回到「问你」。Muse Code 和 Kiro 只有 Supervised 与 Full access 两档，线程被设成别的档位时按 Supervised 跑。
3. **模式只管「动不动手前问不问」，不管「问任务本身的问题」。** 官方写明：Permission modes do not prevent the agent from asking questions about the task.

即使开 Full access，provider 仍可能来问你。官方举了 Claude 的例子：它的设置禁用了跳过权限，或者某个动作要求批准时，照样会问。

### 审查与分诊

**审查**（review，看 agent 改了什么）有两处。一是每一轮对话下面的改动和 Diff 面板，面板的来源选择器里有 **Uncommitted**、**Changes**、**Commits** 三项。二是 **Pull requests** 页面，在里面看变更、写评论、合并。**分诊**（triage，让 agent 自己去查 T3 Code 的毛病）：T3 Code 出了问题时，在命令面板里选 **Triage an issue**，它会开一条不带项目的线程，把你自己的 coding agent 叫来读日志、查那个版本的源码、找已知问题，并帮你写 GitHub issue。官方强调它先问你再动手：It asks before it applies a fix or posts anything.

### 远程访问

**远程访问**（用手机、浏览器或另一台电脑，连到跑在别处的 T3 Code 服务器）。官方文档给了三条路：

| 方式 | 你要准备什么 | 特点 |
|---|---|---|
| **T3 Connect** | 一个 T3 Connect 账号 | 官方的内置方案，不用配路由器端口转发；人在外网也能连 |
| 局域网或私有网络直连 | 两台设备网络互通，加一条配对链接 | 不经过 T3 的服务；同一网络里的人都能摸到端口，靠配对码挡住 |
| Tailscale HTTPS | 两台设备加入同一个 tailnet | 沿用你已有的 Tailscale，得到一个 `https://` 地址 |

- **配对**（pairing，用一条一次性链接授权一台新设备）。配对之后那台设备可以一直连，直到你在主机的 **Settings → Sharing & access** 里吊销它。
- **中继**（relay，T3 Connect 背后由 T3 托管的服务）。它记录哪台机器链接到了哪个账号，并协助签发连接凭证。它**不转发**你的业务流量，流量走你机器上的 Cloudflare 隧道（`cloudflared`）。细节见[源码解读](./source)。
- **通知**（手机推送）只有走 T3 Connect 才有，直连和 Tailscale 连接都不提供。

### 密钥与可移植交接

**密钥**（secrets，API key、token 这类不能明文写进配置的值）涉及两件事。一是**密钥提供方**：T3 Code 可以从 1Password 读凭据，本地只存一个引用，形如 `op://vault/item/field`。二是**密钥请求卡片**：agent 需要 token 或密码时，线程里出现一张卡片，你填值后点 **Save securely**，或者点 **Decline**，值不会出现在对话里。

**可移植交接**（portable handoff，在同一条线程里换 provider 时，把对话上下文带过去），比如一个任务先用 Claude 做了一半，想换 Codex 接着做。官方强调它不是 agent 写的摘要，而是一份按预算挑选的消息记录：A handoff is a budgeted selection, not an agent-written summary。它优先保留最近的问答、最初的需求和相关的命令结果，不复制前一个 provider 的推理过程、工具调用状态和附件。服务端可以用 `T3CODE_CONTEXT_HANDOFF_TOKEN_CAP` 调这份预算，默认 16,000。

## 四、harness、agent 与 T3 Code：谁负责什么

新人常把三样东西混在一起。按官方博客 [What is a "harness"?](https://t3.gg/blog/post/what-is-a-harness)（2026-10-22），**大语言模型**（LLM）只会生成文本，自己不能读文件、跑命令。**harness**（把模型变成能干活的 agent 的那一层：给它工具、约定调用格式、替它执行再把结果交回去）才是干活的主体：Claude Code 表面是终端界面和桌面应用，底下是 Anthropic Agent SDK；Codex 底下是 Codex App Server。**agent** 就是 harness 加上模型，博客原话是 An agent is what happens when you combine a harness and an LLM.

| | 谁提供模型 | 谁提供工具和执行 | 谁提供界面、线程、审批、Git、远程 |
|---|---|---|---|
| Claude Code | Anthropic | Claude Code 自己的 harness | Claude Code 自己 |
| Codex | OpenAI | Codex App Server | Codex 自己的界面 |
| **T3 Code 加 Claude Code** | Anthropic | Claude Code 自己的 harness | **T3 Code** |

FAQ 回答得很干脆：Is T3 Code a harness? No. ... T3 Code uses those harnesses. It is not a harness, and it does not work without one. 博客里的比喻是，厨师是模型，厨房是 harness，T3 Code 是让你自带厨房的餐厅。这有两个实际后果。第一，**额度问题就是各家 agent 的额度问题**，你为哪家付费，就在哪家的额度里跑。第二，**agent 的行为主要由 provider 决定**，代码写得好不好、会不会乱动文件，取决于 agent 本身；T3 Code 管的是把它们放进同一个界面，并替你把关审批。

T3 Code 也会反过来给 agent 一本「菜谱」：它自带一个 MCP 服务器，暴露一批 T3 工具，比如让一条用 Claude 的线程把子任务派给 Codex。FAQ 说明这是可选的，你不说，agent 不会主动去用。

## 五、它是怎么工作的

带着一个问题往下看：**你在界面里敲一句话，到 agent 真正开始干活，中间隔着什么？** T3 Code 的核心是「先记账，后干活」。服务器收到你的操作后并不直接去叫 agent，而是分三步：

1. **编排器**（Orchestrator，决定「发生了什么」的那段代码）根据当前状态，算出两样东西：要记录的事件，和之后要执行的副作用。它只做决定，不做输入输出。
2. **EventSink**（落库的那一步）在一个数据库事务里，把事件、投影（给界面看的当前状态）、命令回执和待执行的副作用一起写进数据库，提交之后才通知订阅者。所以你的消息在 agent 还没启动时就已经写进了线程记录。
3. **EffectWorker**（执行副作用的那一步）在提交之后才动手，比如「启动 provider 轮次」，再把结果作为新的命令送回编排器。

没有这套设计会怎样：agent 进程崩了或服务器重启，你就不知道哪一步做到一半。有了它，每一步的意图都已落库，重启后可以接着来。官方架构文档的原话是：A command acknowledgement therefore means intent committed, not that provider, checkpoint, or follow-up work finished.

<DocDiagram src="/diagrams/t3code-thread-lifecycle.svg" alt="这张时序图按编号回答两个问题：你在界面里发出一句话之后，它经过哪些环节才变成 agent 进程的一次执行；agent 要权限时，这个请求又是怎么回到你面前、再把你的决定送回去的。图里有六列。第一列是用户，也就是桌面、网页或手机客户端。中间三列同属 T3 Code 服务器：Orchestrator 是编排器，只算出事件和副作用，不做输入输出；EventSink 负责落库；EffectWorker 在提交之后执行副作用。第五列是 Provider 适配器，它把 T3 Code 的操作与事件翻译成各家 agent 的协议。第六列是外部 agent 进程，例如 Claude Code 或 Codex 的命令行进程。实线是命令或调用，虚线是事件、通知与返回。第一步，用户经已认证的 RPC 发出一条命令。第二步，Orchestrator 算出事件，以及一个启动 provider 轮次的副作用。第三步，EventSink 在一个数据库事务里写入事件、投影、命令回执和待执行的副作用；提交之后才通知订阅者，客户端因此显示出你的消息。第四步，EffectWorker 在提交后取出副作用，调用 Provider 适配器。第五步，适配器带着与权限模式对应的策略，调用外部 agent 进程的 startTurn，agent 开始执行。第六步，agent 进程产生事件，适配器把它翻译成统一事件，作为命令送回 Orchestrator 落库，再推送给客户端，显示文本增量和工具调用。第七步，agent 进程请求权限时，适配器先按权限模式判断：allow 或 deny 就直接答复，ask 才生成一条待处理请求，也就是 runtime_request，并显示在对话里。第八步，用户批准或拒绝，客户端再发一条回应运行时请求的命令；Orchestrator 把请求记为已解决并落库；EffectWorker 调用适配器的 respondToRuntimeRequest，把决定送回 agent 进程，agent 继续。三条要记住的关系：界面从不直接碰 agent，所有客户端都经已认证的 RPC 连到服务器；各家 provider 的差异被关在适配器后面，编排器和界面只读适配器声明的能力；审批和消息走同一条通道，两边都先落库再送达，所以在手机上点批准和在电脑上点批准是同一套流程。本图省略了具体的界面与按钮、模型推理的内部步骤、T3 Connect 中继（它不在业务数据的路径上），T3 Code 自己不运行模型。" :width="1020" />

> **图的依据：** 步骤 2、3、6 的事件与落库对照源码 [`Orchestrator.ts` L8383–L8451](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L8383-L8451)、[`EventSink.ts` L846–L873](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EventSink.ts#L846-L873)、[`EffectWorker.ts` L239–L249](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EffectWorker.ts#L239-L249)；步骤 7 的权限判断对照 ACP 适配器 [`adapter.ts` L7513–L7611](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-acp/src/server/adapter.ts#L7513-L7611)；步骤 8 的请求解决对照 [`RuntimeRequestService.ts` L78–L124](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/RuntimeRequestService.ts#L78-L124)。以上都是提交 `d00aaac8` 的行号。图中保留了六个对象、八步的先后与方向，以及实线（命令或调用）和虚线（事件、通知与返回）的区别；省略了具体界面与按钮、模型推理的内部步骤，以及 T3 Connect 中继——它只协助环境链接与凭证签发，不在业务数据的路径上。T3 Code 自己不运行模型，模型在外部 agent 进程那一侧。

图里最值得记住的三条关系。第一，**界面从不直接碰 agent**：桌面、网页、手机都只是客户端，经已认证的 RPC 连到服务器；官方架构文档特别说明，桌面应用虽然自带服务器，它的界面也守同一条边界。第二，**provider 的差异被关在适配器后面**：编排器和界面只读「这个 provider 支持什么能力」，不认 provider 的名字，换一个 agent，上面三层不用改。第三，**审批和消息走同一条通道**：agent 请求权限是一条事件，你批准或拒绝是一条命令，两边都先落库再送达，所以在手机上点批准和在电脑上点批准走的是同一套流程。

## 六、安装：把 T3 Code 装上，让它认出你的 agent

三种安装形态可以同时存在。**桌面应用**自带服务器，适合第一次用的人；**`t3` 命令行**适合把 T3 Code 放在服务器或 VPS 上，平时用浏览器或手机连；**手机 App** 只当遥控器，不单独使用。桌面应用里也带 `t3` 命令，新安装会在首次启动时配置好，没配上时在 **Settings → About** 里 **t3 command** 旁边点 **Install**。

### 装桌面应用

[下载页](https://t3.codes/download)（截至 2026-11-24）和官方 Install 文档给出的版本：

| 系统 | 下载项 | 包管理器 |
|---|---|---|
| macOS（Apple Silicon） | `.dmg`（arm64） | `brew install --cask t3-code` |
| macOS（Intel） | 页面上另给的 x64 build | 同上 |
| Windows 10、11 | `.exe` | `winget install T3Tools.T3Code` 或 `scoop install extras/t3code` |
| Debian、Ubuntu | `.deb` | `sudo apt install ./T3-Code-*.deb` |
| Linux（x86_64、arm64） | `.AppImage` | 无，手动下载运行 |
| Arch Linux | 无 | `yay -S t3code-bin` |
| Nix | 无 | `nix profile add github:NixOS/nixpkgs/nixos-unstable#t3code` |

Intel Mac 要注意：官方写明没有给 Intel Mac 提供 `t3` 可执行文件，桌面应用可用。Linux 用 `uname -m` 确认架构，`x86_64` 选 `x86_64.AppImage` 或 `amd64.deb`，`aarch64` 选 `arm64.AppImage` 或 `arm64.deb`。AppImage 要先加执行权限再运行，文件名换成你实际下载的那个：

```bash
chmod +x ./T3-Code.AppImage
./T3-Code.AppImage
```

第一次打开会出现 Welcome 页。先别急着点 **Start**，看完下面「让它认出你的 agent」。关于界面语言，网页、手机、桌面三端的仓库里各有一份 `zh.json` 翻译目录；翻译覆盖到哪里、在哪里切换语言，本页没有核实。

### 只用命令行

macOS、Linux 用 `curl -fsSL https://t3.codes/install.sh | sh`，Windows 的 PowerShell 用下面这条，它会把 `t3` 命令装到 `~/.local/bin`：

```powershell
irm https://t3.codes/install.ps1 | iex
```

官方说明：这个目录不在 `PATH` 上时，安装器会提示你，并对 zsh、Linux 上的 bash 和 fish 打印一条加路径的命令。跑 `t3` 会启动服务器并打开网页应用；`t3 serve` 只启动服务器不开浏览器；`t3 service install` 装成后台服务；`t3 update` 升级到最新版；完整参考看 `t3 help` 或 `t3 --help`。想不安装只试一次，运行 `npx t3@latest`（需要 Node.js 提供 `npx`）。把网上的脚本直接交给 shell 执行是这种安装方式的固有做法，不放心的话改用包管理器，或先把脚本下载下来读过再运行。

### 让它认出你的 agent

前提是**agent 要装在跑 T3 Code 服务器的那台机器上，并在那台机器上登录**，不是装在你用来遥控的手机上。以 Claude Code 为例运行 `claude auth login`，以 Codex 为例运行 `codex login`。其余 agent 的登录方式抄自官方 Install 文档的 Providers 表：Cursor 是 `agent login`，Grok Build 是 `grok login`，Kiro 是 `kiro-cli login`，OpenCode 是 `opencode auth login`，Muse Code 是 `muse login`，fx 是 `fx login`，Pi 是在 `pi` 里输入 `/login`。Antigravity，以及 Codex 的另一条路 **Connect with ChatGPT**，由 T3 Code 代你安装。

然后打开 **Settings → Providers**，选中环境，启用你要用的 provider。

- **会看到什么**：这个 provider 的卡片和它的状态。T3 Code 发现某个版本和你的 T3 Code 不兼容时，会在卡片上给出警告和建议的版本范围。
- **为什么**：除了上面两条代安装的路，T3 Code 不替你安装和登录，它只检测并启用。
- **找不到命令时**：provider 的命令行必须在那台机器的 `PATH` 上，找不到就在 provider 设置里填 **Binary path**。官方 FAQ 说这个坑多半出在这里，用了版本管理器时尤其常见。

Welcome 页会列出它在这台电脑上找到的 agent，就绪的排在最上面。一个都没找到时，它自动打开 **Set up an agent**；对 Claude Code，点 **Install** 或 **Sign in** 会开一个终端，并把命令准备好让你运行。**Start** 会等到至少有一个就绪的 agent。

### （可选）装手机 App

iPhone 与 iPad 用 [App Store](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824) 上的版本，商店页写明要求 iOS 18.0 或更新版本；Android 用 [Google Play](https://play.google.com/store/apps/details?id=com.t3tools.t3code) 上的版本。手机 App 是遥控器，连的是别处的服务器，连接步骤见第八节第 2 小节。

## 七、10 分钟跑通第一件事

目标：在一个一次性的练习仓库里，让 agent 新建一个文件。你在它动手前拒绝一次、再放行一次，然后看它改了什么。

### 第 1 步：准备一个练习目录

```bash
mkdir t3-demo && cd t3-demo && git init
```

用一次性的目录，出问题整个删掉就行。

### 第 2 步：打开它，开出一条新线程

装了桌面应用的话，在这个目录里运行 `t3 app`。T3 Code 会把当前目录加为项目，并直接开出一条新线程。这是官方给的「从终端打开项目」的方式，要求桌面应用已在同一台机器上运行。也可以把文件夹拖到侧边栏再点 **New thread**。只用网页应用时点 **Add project**，因为浏览器拿不到本地文件夹路径。

### 第 3 步：先把权限切成 Supervised

新线程在输入框下方标着它的模式。打开模型选择器，拉到底点 **Permissions**，或者按 `mod+shift+a`，选 **Supervised**，模式会显示在模型旁边。`mod` 是官方文档对修饰键的写法，它在别处写明 macOS 用 Cmd，Windows 和 Linux 用 Ctrl。这么做是因为初始默认是 Full access，不改就看不到审批这一步。

### 第 4 步：发一个小任务

```text
在项目根目录新建 hello.md，写一行标题「Hello from T3 Code」，不要动别的文件。
```

你的消息出现在线程里，下面开始出现 agent 的工作记录。任务小、范围清楚，出了偏差一眼能看出来。

### 第 5 步：拒绝一次，再放行一次

agent 要改文件时，对话里出现一条审批请求，选项的文字由 agent 自己给出，官方文档举过的例子是 Grok 的 **Allow all edits this session**。先选拒绝，再发一句话让它重来，这次选允许。你拒绝后，这个决定会被送回 agent，接下来它怎么做由 agent 自己决定。这是 T3 Code 最该先体会的一件事：刹车好不好使，比 agent 写得快不快重要。

### 第 6 步：看它改了什么

展开对话里的工具调用，能看到完整的命令和输出。再打开 Diff 面板，在来源选择器里选 **Uncommitted**，能看到这一轮新增或修改的文件和它们的 diff。官方说明每一轮的改动列表只显示这一轮自己的工作。

### 第 7 步：（可选）提交

线程的 Git 操作面板可以 commit、push、创建 Pull Request。练习目录没有远程仓库，本页到这里为止，源码怎么走到这一步见[源码解读](./source)。跑通之后留意一点：你全程没有打开 Claude Code 或 Codex 自己的界面。

## 八、日常用法

### 1. 权限模式怎么选

改默认值在 **Settings → Threads → New threads → Permissions**。项目可以覆盖环境的默认值；已经开着的线程和你正在草稿里选好的模式不受影响。临时切换按 `mod+shift+a`。下表后两列是本站建议，官方只定义了每个模式的行为。

| 我的情况 | 用什么 | 不要用什么 |
|---|---|---|
| 第一次跑、仓库不熟 | Supervised | Full access |
| 日常开发，信它改代码，命令要把关 | Auto-accept edits | Full access |
| 任务长，provider 支持自动审查 | Auto | 无 |
| 一次性实验目录，随时可删的 worktree | Full access | 在放着 SSH 私钥和 `.env` 的目录里开 Full access |

要给整台机器封顶，用第十一节的托管策略。

### 2. 离开电脑后从手机继续

主机用桌面应用时：打开 **Settings → Sharing & access**，登录，为这个环境打开 **T3 Connect**；同时打开 **Require approval for new devices**，之后新设备第一次连接要由一台已连接的设备批准；别关掉桌面应用的最后一个窗口，官方写明这会停掉本地服务器，想让它一直在线就用本节第 7 小节的后台服务。

主机用命令行时：

```bash
t3 up
```

它会问你其他设备怎么连（T3 Connect、本地网络，或者两者都要），然后把 T3 Code 装成后台服务。想改选择就再跑一次 `t3 up`，看当前设置用 `t3 status`。

手机上装 App，登录**同一个** T3 Connect 账号，选中这台机器。再打开 **Settings → Notifications** 里的 **Device Notifications**；主机上 **Settings → Sharing & access** 里的 **Publish agent activity** 必须开着。agent 完成、失败、需要批准或提问时手机会收到提醒，点开直达那条线程。

- **手机是遥控器。** 电脑要开机、联网。FAQ 原文：The phone is a remote. Your computer does the work and needs to stay on.
- **推送通知只有走 T3 Connect 才有。** 直连和 Tailscale 连接不提供。
- **Publish agent activity 有代价。** 它把项目和线程的标题、模型名、活动状态发到 T3 Connect 中继，见第十一节。
- **机器数有上限。** 每个 T3 Connect 账号最多链接 3 台机器，手机和浏览器不计数。关联付费的 T3 Chat 账号后，Pro 提到 10 台，Premier 提到 100 台（截至 2026-11-24 官方 FAQ）。

新设备会显示一个形如 `K7QM-2XFD` 的码，在已连接的设备上核对后批准。没有界面的主机上用命令，一次请求 10 分钟后过期：

```bash
t3 auth connect-device list
t3 auth connect-device approve K7QM-2XFD
```

不走 T3 Connect 也行：局域网直连用 `t3 up --lan` 或 `t3 pair`，Tailscale HTTPS 用 `t3 serve --tailscale-serve`，桌面应用里还能加 SSH 环境。步骤都在官方 Remote access 文档里，本页不重复。

### 3. 并行开任务：worktree 与多仓库项目

- 开新线程时选 **New worktree**，这条线程就有了自己的分支和工作目录。新分支名默认带 `t3/` 前缀，在 **Settings → Worktrees → Worktree branch naming** 里可改；worktree 默认放在 T3 home 的 `worktrees` 文件夹里。
- 磁盘告急时，在 **Settings → Worktrees → Cleanup** 里打开自动清理，或点 **Delete now** 立刻清一次。
- 多仓库项目自动覆盖项目文件夹里的所有仓库。文件夹之外的仓库，在 **Settings → Projects → Repositories** 里点 **Add folder**，或者从脚本添加：

```bash
t3 project add <path> --track <folder>
```

一个项目最多覆盖 128 个文件夹。

### 4. 终端

线程里可以开终端跑 dev server、测试，agent 也能用。三条官方说明：

- **换 shell**：在启动 T3 Code 服务器的那个环境里设 `T3CODE_TERMINAL_SHELL`。Windows 上想用 Git Bash，在 PowerShell 里执行下面这条，然后完全退出 T3 Code，从开始菜单重新打开，再新建终端。

```powershell
[Environment]::SetEnvironmentVariable('T3CODE_TERMINAL_SHELL', 'C:\Program Files\Git\bin\bash.exe', 'User')
```

- **回滚缓冲**：每个终端在服务器上最多保留 5,000 行、8 MiB 的输出。
- **远程开发服务器**：环境在别的机器上时，它上面的 `localhost` 端口可以转发到你面前的电脑。桌面应用在线程的 **Servers** 列表里为每个服务提供转发按钮。

### 5. 项目设置文件 `t3.json`

文件名 `t3.json`，放在**项目文件夹**里。官方写明只读项目文件夹下的这一份：Only the project folder's `t3.json` is read. 用户文档里逐字出现过的键：

| 键 | 作用 |
|---|---|
| `ignoreRepositories` | 把项目文件夹里的某个仓库排除出项目 |
| `worktreeLayout` 的 `create` 与 `remove` | 用自己的命令创建和移除线程的工作目录 |
| `worktreeSubmodules` | 新 worktree 怎么初始化子模块 |
| `worktreeSparsePatternsPath` | 指向一个稀疏检出规则文件，大仓库只检出匹配的文件 |
| 脚本上的 `stopOnSettle` 与 `runOnSettle` | 线程 settle 时停掉这个脚本，或者在线程的 worktree 里运行它 |

T3 Code 自己的仓库里有一份真实例子，下面是节选（原文件还有第二个脚本），它展示了 `$schema`、项目图标的路径 `iconPath`、以及一组能在界面里点着运行的 `scripts`：

```json
{
  "$schema": "https://t3.codes/schema/t3.json",
  "iconPath": "assets/dev/blueprint-web-apple-touch-180.png",
  "scripts": [
    {
      "name": "Dev",
      "command": "vp run dev",
      "icon": "play",
      "stopOnSettle": true
    }
  ]
}
```

优先级：仓库能在 `t3.json` 里声明的设置（比如新线程用的工作区），按「项目覆盖、环境设置、`t3.json`、内置默认值」的顺序取值，界面上留 **Inherit** 就交给下一层决定。

<!-- TODO: 待核实 —— t3.json 的完整字段清单。docs/user 只提到上表的键；仓库自己的 t3.json 引用了 https://t3.codes/schema/t3.json 这个 schema 地址，本页没有打开它，所以「能写什么」不是穷举 -->

### 6. 密钥管理

密钥提供方是预览功能，官方说明不是每个构建都有。做法：在跑服务器的机器上装好并登录 1Password 的命令行工具 `op`，远程或没有界面的服务器改用服务账号或 Connect server，因为桌面式登录需要有人在机器上点确认；打开 **Settings → Secrets** 点 **Add provider**，填名字和 1Password 账号；在凭据字段旁的来源选择器里，把 **Value** 换成你的密钥提供方，填入引用 `op://vault/item/field`。密钥请求卡片则在所有构建里都有：agent 要密钥时线程里出现卡片，你填值后点 **Save securely**，或点 **Decline**。官方说明这个值不会出现在对话里，多数请求连 agent 也拿不到，由 T3 Code 直接交给需要它的工具。

### 7. 后台服务与开机自启

先装 `t3`，再在当主机的那台机器上运行：

| 要做什么 | 命令 |
|---|---|
| 安装并启动 | `t3 service install` |
| 看状态和日志位置 | `t3 service status` |
| 重启 | `t3 service restart` |
| 停止并取消开机启动 | `t3 service uninstall` |

三个系统里「开机自启」的含义不一样。Linux 需要 systemd 用户服务，开机启动，注销后继续跑，装不上时按提示让管理员开 lingering。macOS 登录时启动、注销时停止，要保持登录并且不休眠。Windows 也是登录时启动、注销时停止，要锁屏而不是注销，并保持不休眠。自定义环境变量写在 `~/.t3/service.env`，一行一个 `KEY=VALUE`，改完执行 `t3 service restart`；里面有凭据的话，执行 `chmod 600 ~/.t3/service.env`。

### 8. 关掉遥测

T3 Code 默认发送产品使用事件。先看它发什么（官方 Product usage data 文档）：

| 发 | 不发 |
|---|---|
| provider、模型、推理强度、权限模式、每轮的结果与耗时、发布渠道、token 数 | 提示词、模型回复、文件内容、认证 token、对话 ID、原始 provider 事件 |

接收方是 T3 Code 自己的端点 `ingest.t3.codes`，标识用的是哈希后的账号或安装 ID。另有几类独立的数据流，关掉遥测不影响它们，见第十一节。

| 在哪 | 怎么关 |
|---|---|
| 服务器和桌面应用 | 在启动它的环境里设 `T3CODE_TELEMETRY_ENABLED=false`。macOS 和 Linux 的桌面应用从 shell 配置文件（如 `~/.zshrc`）读取，写进去后重启应用；Windows 设成用户环境变量 |
| 后台服务 | 写进 `~/.t3/service.env`，再执行 `t3 service restart` |
| 手机的崩溃报告 | 关掉 **Settings > About T3 Code > Diagnostics** 里的 **Send crash reports** |
| 整台机器统一关 | 托管策略里写 `"telemetry": false` |

两处关不掉，官方写明了：浏览器里的网页应用不读这些环境变量，它的构建里带追踪时会发自己的连接追踪，而且没有开关；手机 App 的连接追踪也不受服务器设置和托管策略控制。

## 九、真实用例

| 场景 | 做法 |
|---|---|
| 同一个 React 升级任务，想让两个 agent 各做一版 | 在一个 Git 项目里开新线程，在模型选择器里**按住 Shift 点**两个模型，再选基准分支并发送。官方说明每个选中的模型会各开一条线程、各建一个 worktree，而你还留在新线程的输入框里。跑完在 Diff 面板里对比两边 |
| 修到一半要去通勤 | 出门前确认主机上 T3 Connect 已打开，或已用 `t3 up` 装成后台服务；路上 agent 要删一个文件，手机收到提醒，点开就是那条线程的审批请求；到公司打开 [app.t3.codes](https://app.t3.codes) 登录同一个账号，接着同一条线程往下做 |
| 前端和后端在两个仓库 | 把 `shop` 整个文件夹加为项目，T3 Code 自动覆盖里面的 `shop/api` 和 `shop/web`，一条线程能同时读改两边。每轮的改动按仓库分组显示，提交和推送一次只对一个仓库做 |

第四个场景是把 T3 Code 接进脚本。主机上可以直接用命令行开线程、发消息（抄自官方 Outside agents 文档）：

```sh
id=$(t3 thread start . "Find why the tests are slow")
t3 thread send "$id" "Now fix it" --wait
t3 thread show "$id"
t3 thread list
```

`.` 表示当前文件夹所属的项目。`--wait` 会打印 agent 的回复，并在运行失败或被停止时以退出码 1 结束，在 agent 等你回答时以退出码 2 结束。下面这段 TypeScript 把它包进 Node.js，并按官方写明的退出码分支。它是本站写的，写作时没有实际运行，只包装了上面官方列出的命令：

```ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

/** 向一条线程发消息并等 agent 回复。退出码含义见官方 Outside agents 文档。 */
async function sendAndWait(threadId: string, message: string): Promise<string> {
  try {
    const { stdout } = await run("t3", ["thread", "send", threadId, message, "--wait"]);
    return stdout;
  } catch (error) {
    const code = Number((error as NodeJS.ErrnoException).code);
    if (code === 2) throw new Error("agent 正在等你回答，请到 T3 Code 应用的这条线程里作答", { cause: error });
    if (code === 1) throw new Error("这一轮运行失败或被停止", { cause: error });
    throw error; // 例如找不到 t3 命令（code 为 ENOENT），原样抛出
  }
}
```

## 十、计费、额度与限制

截至 2026-11-24 的官方 FAQ：T3 Code **本身免费**，原文是 Nothing. There's no way to pay us to use T3 Code；**模型费用照旧付给你用的 provider**，T3 Code 不转卖 token；**T3 Connect 目前免费**，原文加了 for now，同一段说明账单压力太大时政策可能变；**机器数上限**是每账号 3 台，关联 T3 Chat Pro 后 10 台，Premier 后 100 台；另外**不支持本地模型**。

<!-- TODO: 待核实 —— T3 Chat Pro 与 Premier 的价格。T3 Code 的 FAQ 只写了机器上限，没写价格；查过仓库 docs/user/faq.md 和 docs/user/remote-access.md，没有打开 T3 Chat 的定价页。价格以 T3 Chat 官方为准 -->

其他限制（官方文档）：

| 项目 | 限制 |
|---|---|
| 一条消息的长度 | 最多 120,000 个字符 |
| 一条消息的附件 | 最多 100 个文件；图片每个最多 10 MiB |
| Usage 页的用量历史 | 服务器默认保留 92 天 |
| 可移植交接的预算 | 默认 16,000 token，可调范围 1,024 到 64,000 |

想看各家账号还剩多少额度，打开 **Usage** 页。官方提醒那里的成本是按 API 价格估算的，不是你的订阅账单。关于封号，官方 FAQ 称 T3 Code 在 Claude Code、Codex 和 Google Antigravity 的服务条款之内；同一条 FAQ 也劝你别拿它囤账号，工作账号加个人账号两个没问题，成批的账号它不认为是合适的用法。

## 十一、安全与隐私要点

| 机制 | 它意味着什么风险 | 怎么关或收紧 |
|---|---|---|
| 默认权限 Full access | 新线程的 agent 默认不问就改文件、跑命令 | 在 **Settings → Threads → New threads → Permissions** 改默认值，装完第一件事就做 |
| 环境不是沙箱 | agent 和终端以你的系统用户权限运行 | 用 Supervised；任务放进 worktree；配合各 agent 自己的规则 |
| T3 Connect 账号 | 默认任何登录了你账号的设备都能打开已链接的机器 | 打开 **Require approval for new devices**；定期在 **Settings → Sharing & access** 查看并吊销 |
| 配对链接 | 官方要求把它当密码对待 | 每台设备用新链接；不放进截图、日志、报错信息 |
| 访客链接 | 没有账号的人能看到一条线程的内容 | 默认关闭；不用时点 **Stop sharing** |
| 遥测 | provider、模型、token 数、权限模式等发往 `ingest.t3.codes` | `T3CODE_TELEMETRY_ENABLED=false`，做法见第八节 |
| Publish agent activity | 线程和项目的标题、模型名发到 T3 Connect 中继 | 关掉它，代价是手机推送通知 |
| 托管策略 | 管理员可为整机设默认值、加锁、设上限 | 见下文 |

### 访客链接：没账号的人能看一条线程

访客链接是 beta 功能，默认关闭。打开它要满足两个条件：在 **Settings → Labs → Guest links** 里启用，并且这台机器已经链接 T3 Connect 并保持在线，因为链接指向的是它的 T3 Connect 地址。用法是：在侧边栏右键线程，选 **Share with guest**，把链接发给**一个人**，它只在一个浏览器里有效，24 小时后过期。对方发来的消息不会直接执行，而是在侧边栏显示 **Request**，你看过后点 **Send**，它才作为一轮正常运行；不想要就点 **Dismiss**。想立刻收回，选 **Stop sharing**；归档线程、新建链接、把机器从 T3 Connect 解除链接，也都会终止它。

对方能看到线程的近期历史和之后的全部内容，包括消息与文件、agent 的回复、推理、计划、提问和工作过程，展开命令能看到输出。对方看不到 diff，也不能替你操作线程。官方有一句提醒要照着做：Anything the agent read or printed can show, such as a value from a file. agent 读过或打印过的东西都可能显示给访客，只分享你不介意被看的线程。对方发来的内容会以线程当前的权限模式运行，点 **Send** 之前先看一遍，就像对待从聊天里粘贴来的任何东西。

### 托管策略：给整台机器定规矩

托管策略让管理员为机器上的每个用户配置 T3 Code。服务器在**启动时**读取策略，并对连上来的每一个客户端执行，不管是桌面应用、浏览器还是手机。官方文档里的示例：

```json
{
  "schemaVersion": 1,
  "organization": "Example Corp",
  "supportUrl": "https://it.example.com/t3",
  "settings": {
    "defaultRuntimeMode": { "value": "approval-required", "locked": false },
    "enableAgentBrowserAccess": { "value": false, "locked": true }
  },
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop", "local-browser"],
    "telemetry": false
  }
}
```

`settings` 设默认值和锁，`limits` 设上限。这份示例的意思是：默认权限模式为 Supervised（`approval-required`），任何线程最宽只能到 Auto-accept edits（`maxRuntimeMode`），只允许桌面应用和本机浏览器连入（`clients` 里没有 `remote`），遥测关闭。`locked: true` 的设置，用户和 agent 都改不了。流程是：写好 JSON，运行 `t3 policy check policy.json` 检查，用设备管理工具部署到官方指定的位置（三个系统的路径见官方 Managed policy 文档），重启 T3 Code，再用 `t3 policy show` 确认服务器加载的就是这一份。

它管不到什么，官方也写明了。**策略只约束 T3 Code 自己的行为**：agent 走的是各 provider 自己的命令行，读的是它们自己的配置（比如 `~/.claude`），用户在 T3 Code 之外照样能跑，要限制那些命令行得用它们各自的托管配置。**`maxRuntimeMode` 不是沙箱**：它决定 T3 Code 请 provider 用哪个模式，不负责关住 agent。另外，机器上同时有配置描述文件（或组策略）和策略文件时，T3 Code 会拒绝启动，直到你删掉其中一个。

## 十二、常见坑

| 症状 | 原因 | 解决 |
|---|---|---|
| **Settings → Providers** 里没有我的 agent | agent 的命令行没装，或者不在跑服务器那台机器的 `PATH` 上（不是手机上） | 在那台机器上先登录，如 `codex login`；仍然不行就在 provider 设置里填 **Binary path** |
| 新线程的 agent 不问我就改文件 | 新线程的初始默认是 Full access | 改默认值，或每个线程手动切到 Supervised |
| 线程设成了 Auto，行为却像 Supervised | provider 没有这一档，官方规则是退回 Supervised | 换支持的 provider，或接受它按 Supervised 跑 |
| 关掉电脑上的窗口后手机连不上 | 关掉桌面应用的最后一个窗口会停掉本地服务器 | 用 `t3 up` 装成后台服务，或别关最后一个窗口 |
| 手机的推送通知不来 | 推送只在 T3 Connect 下工作；主机的 Publish agent activity 没开；手机没开 Device Notifications | 三项都检查；Android 需要 7.0 及以上和 Google Play 服务 |
| T3 Connect 一直断 | 本机、T3 Connect、主机隧道、主机上的 T3 Code，四段里有一段断了 | 在 **Settings → Environments** 里选这台机器点 **Details**，第一个标成失败的段就是原因；主机上运行 `t3 connect status` |
| 主机在线，T3 Connect 却说隧道离线 | 主机网络挡了出站端口 7844（TCP 与 UDP），常见于 Tailscale exit node、公司 VPN、严格的防火墙 | 放行 7844，或把主机的 Tailscale 地址加成直连路由 |
| 磁盘突然满了 | 每条线程一个 worktree，越积越多 | 在 **Settings → Worktrees → Cleanup** 里打开自动清理 |
| Claude 的 5 小时额度掉得比直接用 Claude Code 快 | 旧版本的问题，官方称自 v0.1.7 起速率相同 | 在跑 agent 的那台机器上升级 T3 Code |
| 检查 Codex 状态时超时 | 检查的时间不够 | 启动服务器的环境里设 `T3CODE_CODEX_PROBE_TIMEOUT_MS=60000`，然后重启 |
| 通过 SSH 装的后台服务，一断开就停 | Linux 上没开 lingering | 按提示执行 `sudo loginctl enable-linger "$(id -un)"`，再以普通用户重试 |
| Linux 上浏览器标签页起不来 | Ubuntu 23.10 及之后的版本挡住了浏览器沙箱 | 在主机上执行 `sudo t3 browser setup` |

## 十三、故障排查

按顺序查，前一步没过不必看后一步：

| 症状 | 先查什么 | 怎么修 |
|---|---|---|
| 什么 agent 都用不了 | **Settings → Providers** 里有没有就绪的 provider | 回到第六节，在那台机器上安装并登录 |
| 连不上自己的服务器 | `t3 service status`（后台服务）或 `t3 status`（远程设置） | 按它打印的日志路径读日志，日志默认在 `~/.t3/userdata/logs` |
| T3 Connect 连不上 | 主机上的 `t3 connect status` | 它会指出主机这一侧的原因，逐条对应官方的 T3 Connect troubleshooting 文档 |
| 数据库占了太多空间 | `t3 doctor`，加 `--dry-run` 只报告不动手 | 确认后去掉 `--dry-run` 执行；修复期间服务器离线 |
| 应用本身出了毛病 | 命令面板里的 **Triage an issue** | 应用起不来时，在终端运行 `npx t3 triage` |
| 运行 `t3` 时提示已有服务器在运行 | 这台机器上已经有一个 | 按它打印的 `t3 pair` 命令配对到那个服务器；要另起一个，换一个 `--base-dir` |
| 还是解决不了 | [GitHub 仓库](https://github.com/pingdotgg/t3code)的 Issues 里有没有同样的报告 | 没有就提一个，附上 **Copy diagnostics** 的文本和 `t3 connect status` 的输出 |

报错时别把配对链接和授权码贴进去，官方要求把它们当作密码。

## 十四、下一步

1. **改掉默认权限。** 这是装完后的第一件事。
2. **把主机设成一直在线。** 用 `t3 up` 装成后台服务，并在手机上验证一次能收到通知。
3. **试一次并行。** 开两条 worktree 线程同时跑，再试试按住 Shift 点多个模型。
4. **把真实项目接进来。** 多仓库的加法和 `t3.json` 见第八节。
5. **想知道它内部怎么运作**，读[源码解读](./source)。
6. **想提升 agent 本身的表现**，回到 [Claude Code](../claude/) 和 [Codex](../codex/) 的教程。

## 十五、深入阅读

官方文档在仓库的 `docs/` 目录下，下面的链接固定在提交 `d00aaac8`。想读最新版，把地址里的提交号换成 `main`。

- [Install T3 Code](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/install.md)：各平台安装、`t3` 命令、每个 provider 的安装与登录。
- [Permission modes](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/permission-modes.md)：四种模式的行为，以及每个 provider 的差异。
- [Remote access](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/remote-access.md)：T3 Connect、局域网配对、Tailscale HTTPS、SSH、权限范围。
- [Working with threads](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/thread-sidebar.md) 与 [Source control](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/source-control.md)：开线程、worktree、置顶与结算；Diff 面板、各家 Git 托管方的登录、Pull Request 审查。
- [Running in the background](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/background-service.md)：后台服务、`service.env`、各系统的差异。
- [Product usage data](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/telemetry.md)：每类数据流的去向和开关。
- [Guest links](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/guest-links.md) 与 [Managed policy](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/managed-policy.md)：共享与管控的完整规则。
- [ACP providers](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/providers-acp.md) 与 [Workflows](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/workflows.md)：从 ACP Registry 添加 agent；用 TypeScript 把 agent、定时和人工确认串成一次可恢复的运行。
- [FAQ](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/faq.md)：成本、额度、远程、封号等最常见的问题。
- [What is a "harness"?](https://t3.gg/blog/post/what-is-a-harness)：官方博客，讲模型、harness、agent 和 T3 Code 的分工。
- [Agent Client Protocol](https://agentclientprotocol.com/overview/introduction)：ACP 的官方介绍。

## 十六、相关页面

- [学习地图](./index)：T3 Code 的产品家族、选型与本目录的读法。
- [源码解读](./source)：一个线程从创建到结束的数据流，权限模式的执行点，T3 Connect 的信任模型。
- [Claude Code](../claude/)、[Codex](../codex/)：被 T3 Code 驱动的两个 agent 本身。
- [Codex Dot](../codex/dot)：OpenAI 侧的常驻智能体，想比较「谁来接着推进任务」时对照着看。
- [Cindy](../cindy/)：同类的多 agent 工作区产品，取舍见那一页。
- [Tailscale](../tailscale/)：T3 Connect 之外的一条连接路线，也是 `packages/tailscale` 调用的对象。
- [UU Remote](../uu-remote/)：「人不在电脑前」的另一类做法，先弄清自己要的是哪一种。
