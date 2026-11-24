---
title: Cindy 源码解读：三个 harness 是怎么被接进同一个工作区的
description: 读 makecindy/cindy 的源码，讲清四件事：Codex 直接实现在 maker-core 里而不是一个独立的包；手机控制电脑靠一张默认拒绝的白名单；Orca 用 MCP 让一个 Lead 指挥多个 Worker；各种模型协议靠本地回环代理互译。附仓库地图、从源码跑起来的步骤，以及已验证、推断、未知三张清单。
domain: product
tags:
  - source-code
  - electron
  - harness
  - device-link
role: deep-dive
pageClass: wide-figures
source_revision: 6fdec7fb89b955be548c3f5cc9a42d83bf174aa3
---

# Cindy 源码解读：三个 harness 是怎么被接进同一个工作区的

> **一句话结论：** Cindy 的核心不是又一个 agent，而是一层「会话加适配器」。`packages/maker-core` 把 Claude Code、Codex、Pi 三种互不相同的进程协议翻译成同一种事件流，上面的界面、本地数据库和手机远程控制都只认这层事件流。
> **Codex 没有独立的 `maker-codex-manager` 包**，它直接实现在 `packages/maker-core/src/agents/codex/`，靠 `codex app-server` 子进程驱动。
>
> 本页所有结论对照 `makecindy/cindy` 提交 `6fdec7fb`（完整 [`6fdec7fb89b955be548c3f5cc9a42d83bf174aa3`](https://github.com/makecindy/cindy/tree/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3)）；之后的变化不在本页范围。**已验证 / 推断 / 未知**的分层见文末。

## 写给谁、不写给谁

- **写给谁**：想审计 Cindy 的人，要知道任务和文件经过了谁、手机能对电脑做什么；想提 PR 的人，要先知道代码住在哪；用过之后有疑问的人，比如为什么换 harness 会丢上下文。
- **不写给谁**：只想装上就用，请读[教程](./cindy)；想读服务端，README 写明「服务端不在本仓库」；想学 Electron 入门，本页默认你知道主进程和渲染进程是两回事。

## 仓库地图

### 规模：用命令实测

下面的数字是在固定提交上数出来的，**含测试文件**。命令与我在克隆目录里执行的等价，都是只读的：

```bash
git -C <克隆目录> rev-parse HEAD                 # 输出 6fdec7fb89b955be548c3f5cc9a42d83bf174aa3
git -C <克隆目录> ls-files | wc -l                # 输出 22991
git -C <克隆目录> ls-files | awk -F/ '{print $1}' | sort | uniq -c | sort -rn
git -C <克隆目录> ls-files apps | awk -F/ '{print $1"/"$2}' | sort | uniq -c | sort -rn
git -C <克隆目录> ls-files packages | awk -F/ '{print $1"/"$2}' | sort | uniq -c | sort -rn
```

| 顶层目录 | 文件数 | 里面是什么 |
|---|---:|---|
| `apps/` | 16,227 | 桌面端、手机端、Node 后台，以及三个很小的目录 |
| `packages/` | 5,313 | 41 个共享包 |
| `docs/` | 1,025 | 工程规则、产品规则、设计规则、法务资料 |
| `scripts/`、`tools/`、`prototypes/` | 242、31、69 | 仓库级脚本、引擎二进制的版本锁定、原型 |

| `apps/` 下 | 文件数 | 职责 | 从哪个文件读起 |
|---|---:|---|---|
| `desktop` | 12,682 | 桌面客户端（Electron）。`src/main` 是主进程，管业务逻辑、任务 IPC、本地数据库、device-link 和插件运行时；`src/renderer` 是界面；`src/preload` 是桥接层 | `src/main/maker-host/index.ts`，三个 harness 实例在这里创建 |
| `mobile` | 3,165 | 手机客户端（Expo / React Native）。纯控制端，本地没有 agent 和数据库 | `src/device-link/mobileMakerTransport.ts` |
| `host` | 294 | Node 版后台 `cindy-host`，和桌面共用一份业务主体。实验性 | `src/main.ts`、`src/agent/runtime.ts` |
| `cindy-headless` | 82 | 面向容器和评测的无界面运行时，带 CLI 和 Harbor 适配器 | `README.md`、`src/cli.ts` |
| `web` | 2 | 浏览器端用的 `shim.js` 和一个统计区域守卫，不是独立的 Web 应用 | `shim.js` |
| `android-platform-tools-bin` | 2 | Windows 打包前才下载的 adb 等工具，不入库 | 无 |

`packages/` 里文件最多的是 `opencli-vendor`（1,443 个，本页没有读，职责未核实）和 `agent-net-core`（1,032 个，其中 975 个是 `sim/results` 下的仿真结果）。
排第三的是 `maker-core`（445 个），之后是 `lizi-mcps`（428 个）、`browser-control-runtime`（419 个）、`maker-shared`（311 个）、`device-link`（161 个）。
协同的 `orca-workflow` 只有 9 个文件。

### 按职责找包

| 关注点 | 包 | 从哪个文件读起 |
|---|---|---|
| 任务编排 | `maker-core` | `src/maker.ts`、`src/session.ts`、`src/agents/` |
| 模型供应商与协议兼容 | `model-providers`、`model-compat` | `model-compat/README.md` |
| 协议互译 | `anthropic-compat-proxy`、`anthropic-responses-bridge`、`responses-anthropic-bridge`、`responses-chat-bridge` | 各自 `package.json` 的 `description` |
| 设备互联 V1 | `device-link`、`device-link-protocol`、`device-link-relay`、`device-link-sharing` | `device-link/README.md` |
| 设备互联 V2（Agent-Net） | `agent-net`、`agent-net-core`、`agent-net-relay`、`agent-net-native`、`agent-net-protocol` | `docs/product-rules/agent-net.md` |
| SSH 远端守护进程 | `maker-cc-manager`、`maker-pi-manager`、`maker-remote-ssh`、`remote-file-service` | 各自 `package.json` 的 `description` |
| 协同、定时任务 | `orca-workflow`、`maker-scheduler` | `orca-workflow/src/orca-bridge-prompt.ts` |
| 插件与工具 | `plugin-protocol`、`cindy-tools`、`lizi-mcps`、`browser-control-runtime` | `docs/dev-rules/plugin-security-and-authoring.md` |
| 聊天渠道 | `lizi-im`、`slack-hook-protocol`、`wechat-ilink` | `docs/dev-rules/im-turn-flow.md` |
| 账号、心跳、向量 | `auth-client`、`heartbeat-client`、`embedding-client` | `heartbeat-client` 的 `package.json` |

### 三个反直觉的事实

**一，最大的单文件是 Codex 适配器。** 三个适配器的非测试行数：`agents/codex/index.ts` 16,738 行，`agents/pi/index.ts` 10,437 行，`agents/claude-code/index.ts` 8,740 行。
**二，`maker-cc-manager` 不是本地 Claude Code 的驱动。** 它的包描述写明，它是一个「spawned on remote SSH machine」的 NDJSON RPC 守护进程。本地 Claude Code 的驱动在 `maker-core` 里，直接调官方 SDK。
**三，桌面主进程的 `maker-ipc/register.ts` 一个文件 23,761 行**，里面有 174 处 `ipcMain.handle` 或 `ipcMain.on` 调用。手机远程控制能复用这些处理器，靠的不是一个一个改造，见下文机制二。

## 架构与数据流：一次任务请求的完整回路

带着这个问题往下读：**界面只发了一个 IPC 调用，这句话是怎么走到一个完全不懂 Cindy 的外部进程里的？**

### 去程：从界面到子进程

渲染进程不直接碰任务。它经 preload 调一个 IPC 通道：`ipcRenderer.invoke('maker:send', sessionId, message, createOpts, sendOpts)`
（[`apps/desktop/src/preload/preload.ts` 第 7859 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/preload/preload.ts#L7859)）。
主进程一侧的入口是 `sendToSessionInternal`（[`register.ts` 第 12284 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/register.ts#L12284)），
排队和落库由同目录的 `AgentInputCoordinator` 负责。它的文件头注释说明了为什么要有这一层：

> 一条用户输入会跨过四个状态 owner：队列 projection、可见气泡、SQLite message row、maker-core dispatch 边界。
> 这个 coordinator 把状态迁移显式化，并让所有 dispatch 前失败都走可回滚路径。

出处：[`agent-input-coordinator.ts` 第 19 到 42 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/agent-input-coordinator.ts#L19-L42)。

`maker-core` 的中心是 `Maker` 和 `Session`。`Maker` 用一张表持有全部活跃任务（[`maker.ts` 第 534 到 539 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/maker.ts#L534-L539)）。
`Session.send` 把真正发送交给 `dispatchSend`。后者做了一长串守卫：等前一轮彻底结束、等权限切换落地、确认没有别的发送已经预留了名额，然后才把消息推给 harness：

```ts
          await this.handle.send(msg, bindSessionSendOwner({
            ...handleOpts,
            [AUTO_REVIEW_SOURCE_CONTENT]: autoReviewSourceContent,
            signal: reservation.abortController.signal,
          }, reservedTurnGeneration, () => {
            if (reservedTurnGeneration !== this.turnGeneration) return undefined;
            return this.terminalEventObservedGeneration === reservedTurnGeneration
              && this.unsolicitedTurnGeneration !== reservedTurnGeneration ? 'settled' : 'unsettled';
          }));
```

出处：[`packages/maker-core/src/session.ts` 第 1145 到 1153 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/session.ts#L1145-L1153)。
这里的 `handle` 是一个很薄的接口 `AgentSessionHandle`，`Session` 只认它的 `send(message, opts)`，不认任何具体的 harness（[`base-agent.ts` 第 2641 到 2642 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/base-agent.ts#L2641-L2642)）。

以 Codex 为例，`handle.send` 最终走到一条 JSON-RPC 请求：

```ts
      await host.request(Method.TurnStart, {
        threadId,
        input: [{ type: 'text', text: prompt }],
      } as TurnStartParams);
```

出处：[`packages/maker-core/src/agents/codex/index.ts` 第 3624 到 3627 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/index.ts#L3624-L3627)。
它被写进 `codex app-server` 子进程的标准输入。子进程是这样起的：

```ts
  const args = ['app-server', ...(opts.extraArgs ?? [])];
  const child: ChildProcessWithoutNullStreams = spawn(opts.binaryPath, args, {
    cwd: opts.cwd,
    env: opts.env,
    // 三路全 pipe: stdin 我们写, stdout 我们读, stderr 走 onStderr (诊断用)。
    stdio: ['pipe', 'pipe', 'pipe'],
    // Windows: 不开 shell, 直接走 binary; 走 shell 会带来 env injection 风险
    // 且 stdio piping 行为不可控。
    shell: false,
    // Windows 上 app-server 及其控制台句柄不应打断桌面端 UI。
    windowsHide: true,
    // 不创建独立进程组；close() 仍必须显式等待并确认子进程退出。
    detached: false,
  });
```

出处：[`packages/maker-core/src/agents/codex/app-server/stdioTransport.ts` 第 77 到 90 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/stdioTransport.ts#L77-L90)。
注意三处保守的选择：不开 shell，不给子进程开独立进程组，关闭时必须等到它真的退出。

<DocDiagram src="/diagrams/cindy-session-flow.svg" alt="这张时序图按编号回答一个问题：你在界面里发出一句话，中间经过哪些对象、按什么顺序到达 harness，结果又怎样回到界面。图里有六条竖向泳道，从左到右是：界面，也就是 Renderer；预加载桥，也就是 preload；主进程，泳道里写着 IPC 处理器和输入协调器两个名字；Maker 与 Session，同属 maker-core；harness 适配器；harness 子进程。本地 SQLite 数据库是第九个对象，画成主进程泳道里的一个标注框。圆标里的数字就是顺序；同一个编号下有几条箭头时，表示这一步经几个对象接力传过去。实线是命令或调用，虚线是事件、广播与返回。第一步，界面经预加载桥调用 maker:send，带着 sessionId 与消息，进入主进程里由 ipcMain.handle 注册的处理器。第二步，主进程把输入交给输入协调器：排队、落库，并检查这个任务有没有正在跑的一轮。第三步，协调器经 Maker 取到或恢复对应的 Session。第四步，Session.send 进入 dispatchSend：确认没有在跑的一轮，为本轮预留一个代号。第五步，Session 调用 handle.send，进入 harness 适配器。第六步，适配器把消息翻译成该 harness 自己的协议，发给子进程：Codex 是 turn/start，Claude Code 是 SDK query，Pi 是 RPC。第七步，子进程执行：调用模型、读写文件、跑命令。第八步，harness 的原始输出送到适配器，适配器把它翻译成统一事件，例如 text、tool_use、tool_result、turn_diff，再送给 Session。第九步，Session 把事件分发给监听者；主进程把消息写入本地 SQLite，并把事件广播回界面。第十步，需要确认的操作以 interaction_request 经 Session 和主进程回到界面，停在界面等用户决定；用户的决定再经主进程和 Session 交到适配器，由适配器回传给子进程；找不到对应订阅者时按拒绝处理。第十一步，子进程报告本轮结束，Session 收到 done，界面恢复可输入。本图省略了：服务端或云端，因为本机任务的一轮不经过 Cindy 服务；手机与 Device Link，那是另一条链路；任何耗时数字；写数据库的具体函数与表结构。" :width="1020" />

> **图的依据：** 入口 `maker:send` 对照 [`preload.ts` L7859](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/preload/preload.ts#L7859)与[`register.ts` L12284](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/register.ts#L12284)；`dispatchSend` 与「没有在跑的一轮」对照 [`session.ts` L925–L930](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/session.ts#L925-L930)与 [L1145–L1153](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/session.ts#L1145-L1153)；适配器的 `send` 对照 [`base-agent.ts` L2641–L2642](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/base-agent.ts#L2641-L2642)；Codex 的 `turn/start` 对照 [`codex/index.ts` L3624–L3627](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/index.ts#L3624-L3627)与 [`host.ts` L796–L811](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/host.ts#L796-L811)；统一事件的类型对照 [`events.ts` L30–L47](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/types/events.ts#L30-L47)，都是提交 `6fdec7fb`。图中保留了 9 个对象、11 步的先后与方向，以及实线（命令或调用）和虚线（事件、广播与返回）的区别。两点如实说明：第 10、11 步的回程只核实了两端，中间按第 1、9 步已给出的路径逐跳画出，属于推断；界面与主进程之间的箭头直接跨过预加载桥泳道，因为只有第 1 步写明经过它。本图省略了服务端与云端、手机与 Device Link、任何耗时，以及数据库函数与表结构。

### 回程：统一事件与反向的确认请求

三个适配器各自的 `translator.ts` 把 harness 的原始输出翻成统一事件。事件类型一共 17 种
（[`packages/maker-core/src/types/events.ts` 第 30 到 47 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/types/events.ts#L30-L47)），界面关心的是这几类：

| 事件类型 | 含义 |
|---|---|
| `text`、`thinking` | 流式的正文和推理文本 |
| `tool_use`、`tool_result` | 工具调用开始，以及精简后的结果 |
| `turn_diff` | harness 对本轮工作区变更的累计 unified diff |
| `interaction_request` | 需要用户决定：权限、提问、计划审阅 |
| `status` | 状态变化，附带用量快照 |
| `done`、`error` | 一轮结束，或出错 |

确认卡走的是**反向**的请求。Codex 要执行一条命令时，是 app-server 反过来向 Cindy 发请求。Cindy 的处理有一个兜底：找不到对应的订阅者，一律拒绝。

```ts
      if (!handlers?.commandExecutionApproval) {
        this.logger.warn('commandExecution approval without subscriber → decline', {
          threadId: params.threadId,
          itemId: params.itemId,
        });
        return { decision: 'decline' };
      }
```

出处：[`packages/maker-core/src/agents/codex/app-server/host.ts` 第 796 到 811 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/host.ts#L796-L811)。
紧跟其后的 `catch` 块在处理函数抛异常时同样返回拒绝。这个方向是「出错就拦住」，不是「出错就放行」。

## 关键机制一：Cindy 是怎么驱动三个 harness 的

**要解决的问题**：三个 harness 说三种话，Cindy 想让上层完全不必知道底下是谁。

| harness | 适配器 | 怎么起进程、怎么说话 | 依据 |
|---|---|---|---|
| Claude Code | `agents/claude-code/index.ts` | 经 `@anthropic-ai/claude-agent-sdk` 0.3.321 的 `query` 和 `forkSession` | [第 35 到 38 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/claude-code/index.ts#L35-L38)、[第 1124 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/claude-code/index.ts#L1124) |
| Codex | `agents/codex/index.ts` 与 `app-server/` | 起一个 `codex app-server` 子进程，stdio 上跑 NDJSON 的 JSON-RPC | 上一节的两段摘录 |
| Pi | `agents/pi/index.ts` | `pi --mode rpc`，JSONL 走 stdio | [第 9 到 28 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/pi/index.ts#L9-L28) |

**Codex 接在哪里，这是本页最常被问到的点。** 结论是：

1. `packages/` 下**没有** `maker-codex-manager`，`ls packages` 的输出里没有它。
2. Codex 的适配器在 `packages/maker-core/src/agents/codex/`，一个 `CodexAgent` 类加一个 `app-server/` 子目录。
3. 账号与登录的辅助代码在 Node 后台那一侧：`apps/host/src/agent/` 下的 `codex-runtime.ts`、`codex-credentials.ts`、`codex-system-login.ts`、`codex-thread-storage.ts`、`codex-token-reader.ts` 等八个文件。
4. 三个实例在两处被创建：桌面的 [`maker-host/index.ts` 第 1453 行与第 1768 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-host/index.ts#L1768)、[`maker-host/pi-host.ts` 第 268 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-host/pi-host.ts#L268)；Node 后台的 [`runtime.ts` 第 702、774、860 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/host/src/agent/runtime.ts#L774)。

有一处容易找错：仓库地图和 Orca 文档里提到的「`mcp-integrations` codex MCP」，是协同功能给 Codex 挂 MCP 桥的地方，**不是**驱动 Codex 的入口。

Codex 这边还有一个和别人不同的设计。`AppServerHost` 的文件头写明（[第 1 到 14 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/host.ts#L1-L14)）：
一个 `CodexAgent` 只起一个 app-server，每个任务对应服务端的一个 thread，入站通知按 `threadId` 路由回对应任务。
同一个文件还留了一句给 Windows 的提醒：「Windows 子进程不会随父进程死」，所以应用退出前必须显式关掉它。

**换 harness 时发生的事。** 桌面主进程里有一个专门的处理器，文件头把流程写得很直白：

```ts
 * send 事务(applyPendingAgentSwitchIfIdle → applyNow=true)执行一次:
 *   校验 → 查目标引擎停泊绑定(Phase 2)→ 构造交接文本(纯代码,
 *   agentHandoff.buildHandoffText:有停泊绑定 = 增量模式,否则全量)
 *   → 关旧 live session → DB 提交(agent_kind + model + provider_id + effort/fast;
 *   sdk_session_id 落迁移／停泊 id 或 null)→ 插 agent_switch 边界行(交接全文持久化
 *   于此,UI 可展开)→ 登记 pending 注入 →(resume 时)立即重建新引擎 session。
```

出处：[`apps/desktop/src/main/maker-ipc/sessionAgentSwitchHandler.ts` 第 6 到 11 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/sessionAgentSwitchHandler.ts#L6-L11)。

**对使用者意味着什么：**

- **换 harness 丢上下文，是设计如此。** 新引擎拿到的是一段交接文本加重建的会话，不是旧引擎的内部状态。这就是 README 那句「并非把不同引擎的内部状态原样搬过去」的代码出处。
- **切回原来的 harness 能少丢一点。** 同一个文件的注释写明，每个引擎的原生会话在离场时会「停泊」，切回时恢复它并只补增量。
- **Codex 的确认卡宁可错拦。** 订阅者丢了、处理函数抛错，结果都是拒绝。

## 关键机制二：设备互联，设备之间怎么找到彼此、流量走哪里

**要解决的问题**：手机上没有 agent，却要能操作电脑上的任务；同时不能让手机拿到电脑的全部能力。

**怎么互相发现。** 设备连上服务后发一帧 `hello`，带上设备名、平台、应用版本、是否允许被控、是否忙碌；服务端把同账号设备的状态变化广播成 `presence-changed`。
设备列表另有 REST 接口 `GET /api/device-link/devices`。这些写在 [`packages/device-link/README.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/README.md) 的「连接生命周期」一节。

**流量经不经过中继。** Device Link 有两条路：直连走 WebRTC，经中转走 WebSocket。线路有四种，产品规则列的是：官方中继、部署到我的服务器、这台电脑当中转、加入别人的中转。
**自建中转的内核就在这个仓库里**，`packages/device-link-relay` 的包描述说它「既可在 Cindy 内运行，也可在服务器上用 Node 独立运行」。

**中继能不能看到内容。** 分两层说。协议的信封是 `packages/device-link-protocol/src/protocol.ts` 里的 `Envelope`（[第 51 到 65 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link-protocol/src/protocol.ts#L51-L65)），
`payload` 字段的类型是 `unknown`，整个接口里**没有任何加密或签名字段**。也就是说在 V1 的线协议上，中转拿得到业务内容。仓库里的自建中转内核声明自己不去看：

```ts
 * 只理解连接层帧与路由头;隧道层 payload(invoke 的 channel/args、push 内容)原样转发,不解析。
```

出处：[`packages/device-link-relay/src/hub.ts` 第 3 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link-relay/src/hub.ts#L3)。
这是开源的那份内核的行为。**官方中转是闭源的，它是否读取或留存内容，本页无法验证。**

**谁能看到什么。** 被控的电脑不是把整个主进程交出去，而是只开放一张白名单：

```ts
 * 双层校验:控制端发送前(快速失败)+ 被控端执行前(权威)。
 * 新增 channel 不进表即天然不可远程调用(代码保证确定性)。
```

出处：[`packages/device-link/src/allowlist.ts` 第 19 到 20 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/src/allowlist.ts#L19-L20)。
全集是同文件的 `REMOTE_INVOKE_ALLOWLIST`（[第 832 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/src/allowlist.ts#L832)），默认拒绝。
文件头把「永不放行」的类别也列了出来：窗口和界面、本机对话框、shell 副作用、账号与密钥、被控端全局设置写、本地数据库裸写、更新器。
实现上有个取巧的地方：`apps/desktop/src/main/device-link/invoke-registry.ts` 在任何处理器注册之前替换掉 `ipcMain.handle`，把「通道名到处理器」的映射全记下来，
远程调用就能用一个合成的 event 去调电脑上已有的处理器，对四十多个文件里的注册点零改动。

**Agent-Net (Beta) 补上了加密。** 产品规则对它的定位是「device-link 的下一代：替换传输层和身份层」，硬性规则第一条是「端到端加密」，还要求「用户可以用自己的中继」「局域网不依赖服务器」。
它的传输核心 `packages/agent-net-core` 是一个通用的可靠 UDP 协议。规则同时写明它「默认关」，关着时行为必须与现有 Device Link 完全一致。

**远程桌面另走一套媒体通道。** 开发文档写明：Device Link 的 WebSocket 仍是信令和控制通道，画面和输入走 WebRTC 的 ICE，视频连不上时退回原有的 JPEG 图片通道；
ICE 配置（含 TURN 凭据）由被控端和观看端各自向 `GET /api/device-link/ice-servers` 申请。

**对使用者意味着什么：**

- **V1 下，你的任务内容在协议上对中转可见。** 介意的话，打开 Agent-Net (Beta)，或者自建中转，或者只用本地模式。
- **手机拿不到你的密钥，也改不了电脑的全局设置。** 这不是靠界面藏起来，是白名单里没有这些通道。
- **能远程执行的任务，权限并不小。** 白名单的注释自己写得很清楚：同账号加上显式打开被控之后，控制端本来就能在工作目录里跑 agent，也就能执行任意命令。
  所以「允许同账号设备控制本机」这个开关，等于把工作目录的 shell 交给了登录你账号的其他设备。

## 关键机制三：Orca，用 MCP 让一个 Lead 指挥多个 Worker

**要解决的问题**：一个 agent 上下文有限，也只会用自己那一种模型。大任务需要几个各有所长的 agent 并行。

**代码怎么做的。** Orca 是「Lead 任务加多个 Worker 任务」。仓库的协同架构文档定义得很准：Lead 负责拆任务、派活、验收与汇总，Worker 负责执行，「Worker 是完整会话，不是一次性 subagent」。
Lead 指挥 Worker 靠一组 MCP 工具，服务器名叫 `cindy_orca`。Lead 的系统提示词里直接列了清单：

```ts
    'Tools: get_workspace_info, create_worker, create_workers, send_to_worker, interrupt_worker, get_worker_queue_status, update_queued_message, cancel_queued_message, merge_queued_messages, steer_queued_message, move_queued_message, update_worker.',
    '(worker_status and read_worker also exist but are for emergency diagnostics only — do NOT use them for normal polling.)',
```

出处：[`packages/orca-workflow/src/orca-bridge-prompt.ts` 第 32 到 33 行](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/orca-workflow/src/orca-bridge-prompt.ts#L32-L33)。

- **派活是异步的。** 同一份提示词写明，Worker 做完会调 `send_to_lead` 回报，Lead「会被自动唤醒」，不需要轮询。
- **每个 Worker 有自己的队列。** 队列是先进先出，Lead 可以插队、合并、取消还没执行的指令。
- **Worker 和原生子代理被刻意区分。** 提示词要求 Lead 只有在用户明确说「子代理」时才用原生机制，也不要用原生的子代理生命周期工具去等 Worker。Worker 那一侧有自己的桥，服务器名是 `orca_worker_bridge`。

**对使用者意味着什么：** 每个 Worker 是一个真的任务，有自己的 harness、模型、权限和历史，在界面上能看到、能单独接管。
Lead 的 harness 可以和 Worker 不同，这就是官网那个「规划、执行、复核各用一种」示例的实现基础。文档的「当前边界」写明，团队严格绑定一个 Lead，不支持跨 Lead 共享 Worker，切换关注也只是换一个显示，不是并排。

## 附：模型协议桥接解决什么问题

每个 harness 只会说一种模型协议：Claude Code 说 Anthropic Messages，Codex 说 OpenAI Responses，Pi 走自己的 SDK。想让任意 harness 用任意供应商，就得有人翻译。
Cindy 的做法是在本机起一个只监听回环地址的代理，在代理里互译。下面第三列是该包 `package.json` 里 `description` 的开头，带省略号的只截了前半句，完整描述以源码为准：

| 包 | 做什么 | 包描述原文 |
|---|---|---|
| `anthropic-compat-proxy` | Claude Code 用非 Anthropic 模型时，剥掉 Anthropic 专有字段 | Loopback HTTP proxy that strips Anthropic-only request fields when the target model is non-Anthropic… |
| `anthropic-responses-bridge` | Anthropic Messages 与 OpenAI Responses 互译，让 Claude Code 驱动 ChatGPT 订阅或 xAI 模型 | Loopback HTTP bridge that translates Anthropic Messages API <-> OpenAI Responses API… |
| `responses-anthropic-bridge` | 把 Responses 请求翻译给 Anthropic 兼容的供应商 | In-process bridge that translates OpenAI Responses requests and events to and from Anthropic Messages compatible providers |
| `responses-chat-bridge` | 把 Responses 翻译给 Chat Completions 兼容的供应商 | In-process bridge that translates OpenAI Responses requests and streaming events to and from OpenAI Chat Completions compatible providers |

`packages/model-compat/README.md` 有一张表说明谁消费这些修正，表的最后一行是「Mobile / remote UI」：界面端使用所选的桌面执行路径，不在界面客户端里再引入第二套模型传输。

对使用者的意义有两点。第一，**「用 Claude Code 的 harness 跑国产模型」是靠翻译做到的**，翻译不到的地方会表现成兼容性问题，所以官网说可用组合「取决于所接入的服务、授权与模型能力」。
第二，**模型请求是从执行任务的那台电脑发出的**，不是从手机。

## 怎么从源码跑起来、跑测试

命令以仓库的 [`CONTRIBUTING.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/CONTRIBUTING.md) 和它指向的 [`docs/dev-rules/environment-setup.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/environment-setup.md) 为准。下面是转述，逐条对照过根 `package.json`。

### 前提

README 列了三项，根 `package.json` 里对应的值如下：

| 要求 | README 的写法 | `package.json` 里的实际值 |
|---|---|---|
| Node.js | **Node.js** >= 22.13（以根 `package.json` 的 `engines.node` 为准） | `engines.node` 是 `>=22.13`；`.nvmrc` 是 `22.22.3` |
| pnpm | **pnpm** 11.x（`>=11.25 <12`，以根 `package.json` 的 `engines.pnpm` 与 `packageManager` 为准） | `engines.pnpm` 是 `>=11.25 <12`；`packageManager` 是 `pnpm@11.28.9` |
| Git LFS | **Git LFS** | 安装步骤里的 `git lfs pull` |

编译手机端的原生部分还需要 **Rust 1.88 或更高版本**（环境文档「Mobile 原生编译」一节）。只跑桌面端用不到。

### 最短入口与启动

```bash
git clone https://github.com/makecindy/cindy.git
cd cindy
git lfs pull
pnpm install
```

**先知道 `pnpm install` 会做什么再运行。** 环境文档写明，postinstall 会按当前平台尽力自动下载 Desktop runtime 二进制：claude、codex、ripgrep、pi，都不进 git；失败只告警不阻断。它还会复核 Electron 的二进制是否装好。

```bash
pnpm restart:desktop:remote --region=cn      # 中国大陆版 Cindy 账号
pnpm restart:desktop:remote --region=global  # 国际版 Cindy 账号
```

两件事容易踩。**区域别依赖默认值**，README 的原话是「不要依赖内部默认值」。**默认是一个隔离的 dev 沙箱**，桌面开发文档说明，restart 命令默认等价于自动附加 `--isolated=dev`，不共享你正式版的账号登录态和业务数据；只有明确要复用时才加 `--shared`。
实验性的网页版用 `pnpm preview:host` 预览：它固定监听 `http://127.0.0.1:3466`，只供本机访问，使用独立的数据目录。文档写得很克制，在权限确认、停止、断线恢复和桌面回归完成之前，「只称为本地实验预览，不称为可正式发布」。

### 跑测试与提交

| 命令 | 做什么 |
|---|---|
| `pnpm test:unit` | 全仓的单元测试 |
| `pnpm test:unit:related` | 只跑和你改动相关的测试。仓库规则说默认用这个 |
| `pnpm --filter @cindy/host test` | Node 后台的测试。改了桌面和后台共用的主体之后必须跑 |
| `pnpm check:dev-docs` | 文档检查。纯文档改动跑这个 |
| `pnpm check:dco` | 本地自查提交有没有 DCO 签名 |

改动通过 pull request 进 `main`，不直接推。每个 commit 要带 DCO 签名（`git commit -s`），不需要签 CLA。PR 标题的格式是 `<type>(<scope>): <简短描述>`，PR 里要写明实际执行了哪些验证命令和结果。

## 已验证、推断、未知

### 已验证（读到原文或亲手执行过）

| 结论 | 依据 |
|---|---|
| 规模数字：总计 22,991 个跟踪文件及各目录计数 | 在固定提交上执行 `git ls-files` |
| `packages/` 下没有 `maker-codex-manager`，共 41 个包 | `ls packages` 的输出 |
| Codex 经 `codex app-server` 子进程驱动，一个实例一个进程、多个任务复用，审批找不到订阅者时拒绝 | `app-server/stdioTransport.ts` 第 77 到 90 行；`app-server/host.ts` 第 1 到 14 行、第 796 到 811 行 |
| Claude Code 经 `@anthropic-ai/claude-agent-sdk` 0.3.321 的 `query` | `claude-code/index.ts` 第 35 到 38 行；`maker-core/package.json` |
| Pi 经 `pi --mode rpc` | `pi/index.ts` 第 9 到 28 行 |
| `maker-cc-manager` 是跑在远程 SSH 机器上的守护进程 | 该包 `package.json` 的 `description` |
| 换 harness 走「意图、交接文本、停泊」流程 | `sessionAgentSwitchHandler.ts` 第 6 到 11 行及其后的注释 |
| 统一事件类型共 17 种 | `types/events.ts` 第 30 到 47 行 |
| 手机是纯控制端；可远程调用的通道是默认拒绝的白名单 | `device-link/README.md`；`allowlist.ts` 第 19 到 20 行、第 832 行 |
| V1 信封没有加密字段；仓库内的自建中转内核声明原样转发、不解析 payload | `device-link-protocol/src/protocol.ts` 第 51 到 65 行；`device-link-relay/src/hub.ts` 第 3 行 |
| Agent-Net 端到端加密、默认关 | `docs/product-rules/agent-net.md` |
| 在线心跳只在已验证的云端登录态下启动，间隔 60 秒 | `apps/desktop/src/main/heartbeatService.ts` 第 6 到 10 行、第 35 行 |
| dev 构建默认不初始化 TapDB | `docs/dev-rules/desktop-development.md`「使用统计（TapDB）在 dev 下不上报」一节 |
| Node、pnpm 的版本要求 | 根 `package.json` 的 `engines` 与 `packageManager` |
| 服务端不在本仓库 | `README.zh-CN.md`「本仓包含什么」一节 |

### 推断（有依据，但没有直接读到或验证）

| 结论 | 依据与缺口 |
|---|---|
| 事件回到界面时，主进程负责写 SQLite 并广播 | `allowlist.ts` 的 `PUSH_FORWARD_ALLOWLIST` 里有 `maker:event` 和 `local-db:messages:created`；输入协调器的文件头提到「SQLite message row」。我没有读主进程里做这件事的具体函数 |
| 本地任务的模型请求经本机回环代理发出 | `anthropic-compat-proxy` 的包描述、`pi/index.ts` 文件头里「baseUrl = Cindy 网关 / 本地 proxy」。没有逐行读桌面侧的装配代码 |
| 默认 Device Link 的业务内容对中转可见 | 信封没有加密字段；`agent-net.md` 把 V1 描述为可能「无法加密」。没有抓包验证 |
| 本地模式下没有任务相关的流量发往 Cindy 服务 | 隐私政策与 `heartbeatService.ts` 写明本地模式不发心跳。缺口：更新检查、端点清单获取等其他联网请求没有逐一核对，README 写明桌面端自动更新来自官方 CDN |

### 未知（查不到或没查）

| 问题 | 查过哪些来源 |
|---|---|
| 官方中转是否读取或留存内容 | 服务端不在仓库；仓库里只有自建中转内核 |
| Cindy Host 和基础网页版何时对外发布 | `docs/host/` 下的文档写「实验性」「尚未全部实现」；同目录的 `systemd.md` 仍写着「尚未实现 HTTP API 与 Web 前端」，与 `basic-web.md` 的验收记录不一致 |
| `apps/cindy-headless` 与 `apps/host` 的关系和各自的发布渠道 | 两份 README 没有互相说明 |
| `packages/opencli-vendor` 的职责 | 文件数最多的包，本页没有读 |
| 插件版引擎（ACP）的公开获取方式 | 源码注释指向 `docs/plans/acp-plugin-bridge.md`，未读；组织下有三个插件仓库，未核实安装方式 |
| 聊天渠道在各区域、各版本的可见范围 | README 写 Slack 和 Telegram（中文版写 Slack、飞书）；`im-turn-flow.md` 列出的渠道更多 |
| 对话与文件在本地如何加密存储 | `docs/dev-rules/credentials-and-local-storage.md` 未读 |
| 远程桌面在 macOS 与 Windows 上各需要哪些系统权限 | `docs/dev-rules/macos-system-permissions.md` 读取时编码异常，未能核对 |
| macOS 的最低系统版本 | 下载页写 macOS 13 或更高；仓库开发文档里出现「最低系统为 macOS 12」 |

## 继续读什么

- [`packages/maker-core/AGENTS.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/AGENTS.md)：改编排和提示词之前必读的规则入口。
- [`docs/dev-rules/orca-team-architecture.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/orca-team-architecture.md)：Orca 的唯一权威文档，含大量坑点与不变量。
- [`docs/dev-rules/remote-and-mobile-adaptation.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/remote-and-mobile-adaptation.md)：远程与手机版的门禁，包括恢复路径的「故障半径三问」。
- [`docs/dev-rules/protocol-compatibility.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/protocol-compatibility.md)：客户端与服务端各自维护协议实现时的兼容规则。
- [`docs/dev-rules/credentials-and-local-storage.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/credentials-and-local-storage.md)：凭证与本地数据的安全规则，上面「未知」里的一条可以从这里补。
- [`docs/host/README.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/host/README.md)：Node 后台的目标、现状与未完成项。

站内：用法见[教程](./cindy)，选型见[学习地图](./index)。三个 harness 各自的文档见 [Claude](../claude/)、[Codex](../codex/)、[Pi](../pi-coding-agent)。
