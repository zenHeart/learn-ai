---
title: T3 Code 源码解读：一句话怎么变成 agent 的一次执行
description: 对照 pingdotgg/t3code 的固定提交读 T3 Code 的源码：仓库地图与实测规模，一条线程从命令、落库、启动 agent 到审批回到界面的数据流，权限模式真正被执行的那几段代码，T3 Connect 的信任模型，以及 packages/tailscale 到底用 Tailscale 做什么。
domain: product
tags:
  - coding-agent
  - source-code
  - agent-workspace
role: deep-dive
source_revision: d00aaac85fc71195f133a8580c3f0f2e29ac33a2
---

# T3 Code 源码解读：一句话怎么变成 agent 的一次执行

> **一句话结论：** T3 Code 的服务器是一台「先记账、后干活」的机器。你的每个操作先被算成事件并在一个数据库事务里落库，然后才由另一段代码去启动或回应 agent 进程；四种权限模式最终落在适配器里的一个三选一判断上，而 T3 Connect 的中继只帮忙牵线，不碰你的业务流量。
>
> 本页所有结论对照 `pingdotgg/t3code` 提交 [`d00aaac8`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/README.md)；之后的变化不在本页范围。文末分「已验证 / 推断 / 未知」三张清单。

## 一、写给谁 / 不写给谁

- **写给谁**：已经会用 T3 Code 开线程、切权限模式，想知道内部怎么运作的人（还没用过，先读[教程](./t3code)）；准备给 T3 Code 提 PR，需要一张「从哪读起」的地图的人；要评估「把 agent 交给它驱动安不安全」，想看到代码而不是口号的人。
- **不写给谁**：想学 Effect（T3 Code 全栈使用的 TypeScript 框架）本身的人，本页只用到它的写法；想找完整 API 文档的人，本页只挑了和「必须讲清的内容」相关的几段代码；读完就能复刻一个 T3 Code 的人，仓库有一万多行的编排器，本页只走通一条主路径。

本页的代码摘录都来自上述提交，链接指向确切的行。摘录里标「省略」的注释是本页加的，其余逐字照抄。

## 二、仓库地图：目录、职责、从哪读起

它是一个 pnpm monorepo，根包名 `@t3tools/monorepo`。主体是 TypeScript，核心框架是 Effect，原生模块另用 Swift、C 等语言。

| 目录 | 职责 | 从哪个文件读起 |
|---|---|---|
| `apps/desktop` | 桌面应用，Electron 外壳，自带一个服务器 | [`src/boot.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/desktop/src/boot.ts) |
| `apps/server` | 服务器：编排、provider、终端、Git、检查点、持久化。它发布的 npm 包就是 `t3` | [`src/bin.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/bin.ts)，再进 `src/orchestration-v2/Orchestrator.ts` |
| `apps/web` | 网页应用，React 加 Vite。桌面应用的界面也是它 | [`src/hostedPairing.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/web/src/hostedPairing.ts)（托管网页怎么连环境），界面从 `src/components/` 读起 |
| `apps/mobile` | 手机应用，React Native，基于 Expo | [`README.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/mobile/README.md) |
| `apps/marketing` | t3.codes 官网，用 Astro | `src/pages/index.astro` |
| `packages/client-runtime` | 网页、桌面、手机共用的连接管理和领域状态 | `src/connection/supervisor.ts`、`src/connection/registry.ts` |
| `packages/contracts` | 客户端与服务器之间类型化的线上契约 | [`src/providerPolicy.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/contracts/src/providerPolicy.ts)（权限模式的定义），另有 `src/orchestrationV2.ts`、`src/relay.ts` |
| `packages/provider-core` | 所有 provider 适配器共用的接口与工具 | [`src/server/ProviderAdapter.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts) |
| `packages/provider-*`（11 个目录） | 每个 agent 一个适配包。Claude、Codex、Antigravity 三个第一方适配不在包里，在 `apps/server/src/orchestration-v2/Adapters/` | 以 [`packages/provider-pi/src/server/adapter.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-pi/src/server/adapter.ts) 为参考（官方文档指定的范例） |
| `packages/effect-acp`、`packages/effect-codex-app-server` | 两套协议的 Effect 实现：ACP，以及 Codex App Server | 各自的 `src/client.ts` |
| `packages/secret-provider-*`（3 个） | 密钥提供方的接口、1Password 实现、注册表 | `secret-provider-core/src/server/SecretResolver.ts` |
| `packages/source-control-*`（11 个） | 各家 Git 托管方与 issue 跟踪的集成 | `source-control-core/src/server/SourceControlHost.ts` |
| `packages/ssh`、`packages/tailscale` | 经 SSH 在远端启动或复用服务器；调用本机的 `tailscale` 命令行 | `packages/ssh/src/command.ts`；[`packages/tailscale/src/tailscale.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts) |
| `infra/relay` | T3 Connect 的中继，一个 Cloudflare Worker | [`README.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/infra/relay/README.md)，再进 `src/environments/EnvironmentConnector.ts` |

三处容易走错。**`.repos/` 不是产品代码**，仓库的 AGENTS.md 把它定义为 vendored read-only references，要求不要编辑、不要从中 import。**官方文档在 `docs/`**，`docs/user/` 是使用文档，`docs/internals/` 是设计约束，`docs/operations/` 是维护者的运维手册，AGENTS.md 把「改哪块代码先读哪篇」列成了表。**安全模型单独成文**，根目录的 [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/SECURITY.md) 定义了谁被信任、什么算漏洞、什么是有意为之，并列出每条规则在哪个文件里执行。

## 三、仓库地图：规模数据（命令实测）

数字来自在该提交上运行的 `git ls-files` 及行数统计。

| 区域 | 受版本控制的文件 | 其中测试文件 | 非测试 TS / TSX 行数 |
|---|---:|---:|---:|
| `apps/desktop` | 346 | 128 | 49,310 |
| `apps/server` | 1,830 | 560 | 322,038 |
| `apps/web` | 2,220 | 671 | 361,635 |
| `apps/mobile` | 1,927 | 373 | 178,182 |
| `apps/marketing` | 105 | 2 | 1,584 |
| `packages/`（33 个包） | 1,543 | 521 | 369,895 |
| `infra/`（relay 与 task-cache） | 199 | 48 | 21,806 |

统计口径：全仓库受版本控制的文件共 33,443 个，其中 24,482 个在 `.repos/` 下（`alchemy-effect` 21,119 个，`effect` 3,369 个），所以表里没有它。测试文件按路径含 `.test.`、`.spec.`、`__tests__`、`/test/` 或 `/tests/` 计；行数只算 `.ts` 与 `.tsx`，并额外排除了 `testkit`、`testFixtures`、`testUtils`。

- **编排器是单个 17,658 行的文件**（`Orchestrator.ts`）。同目录的 `EventSink.ts` 与 `EffectWorker.ts` 分别是 1,338 行与 1,127 行，整个 `orchestration-v2/` 目录有 638 个文件（含测试与回放夹具）。
- **桌面应用最小**，约 4.9 万行非测试代码。它包着网页应用的界面，再捆一个服务器，界面和服务的逻辑分别留在 `apps/web` 与 `apps/server`。
- **共享包是最大的一块**，约 37 万行，比网页应用和服务器都多，其中 `shared`（289 个文件）和 `client-runtime`（473 个文件）占了一半。这和官方「三种界面共用一套连接与状态层」的说法对得上。
- **适配器包都很小**。`provider-core` 有 73 个文件，其余 10 个 `provider-*` 都不超过 46 个。

## 四、四个所有权边界与一条线程的数据流

官方架构文档先划了四条线，读任何一段代码前先记住它们。

| 边界 | 它拥有什么 | 它不做什么 |
|---|---|---|
| 服务器（`apps/server`） | agent 进程、终端、Git、检查点、持久状态、项目文件 | 不信任客户端送来的文件系统、凭据或机器状态 |
| 客户端运行时（`packages/client-runtime`） | 三种界面共用的连接管理与领域状态 | 不自己决定业务 |
| 契约（`packages/contracts`） | 客户端与服务器之间的类型化线上边界 | 不放重逻辑 |
| provider 适配器（`packages/provider-*` 等） | 各家 agent 的协议和怪癖 | 不让编排器知道自己叫什么名字 |

带着一个问题看下图：**桌面、网页、手机三种界面，怎么经过同一台服务器、同一套适配层，去驱动各自独立的外部 agent 进程？**

<DocDiagram src="/diagrams/t3code-architecture.svg" alt="这张分层架构图回答一个问题：桌面、网页、手机三种界面，是怎么经过同一台服务器、同一套适配层，去驱动各自独立的外部 agent 进程的。图里从上到下四层，箭头只朝一个方向。第一层是应用层，三个客户端：桌面应用、网页应用、移动应用。它们只依赖两个共享包：client-runtime 是三种界面共用的连接与状态层，contracts 是类型化的线上契约。三种界面经已认证的 HTTP 与 WebSocket RPC 连到服务器。第二层是服务器 apps/server，里面有编排器 Orchestrator、负责落库的 EventSink、在提交后执行副作用的 EffectWorker，以及终端、Git 和检查点。桌面应用自带一个服务器，但它的界面守同一条边界。服务器只读适配器声明的能力，不认 provider 的名字。第三层是 Provider 适配器。箭头由服务器指向适配器，再由适配器指向第四层的外部 agent 进程，例如 Claude Code、Codex、Cursor、OpenCode。适配器把 T3 Code 的操作翻译成各家 agent 的原生协议，agent 的事件沿同一条线翻译回来；外部 agent 进程不反向依赖 T3 Code 的界面。右侧单列的是 infra/relay，也就是 T3 Connect 中继。它与客户端、服务器之间只有一条控制关系，用虚线表示：协助环境链接与凭证签发。客户端与服务器的业务流量不经过它。本图省略了模型本身、服务器内部更多的模块，以及 Tailscale 等可选的外部网络通道；T3 Code 自己不运行模型。" :width="960" />

> **图的依据：** 分层与依赖方向来自官方架构文档 [`01_architecture.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/01_architecture.md)；中继只承担「环境链接与凭证签发协助」来自 [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/06_t3-connect.md)；「服务器只读适配器声明的能力、不认 provider 的名字」对照 [`ProviderAdapter.ts` L765–L903](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts#L765-L903)，都是提交 `d00aaac8`。图中保留了四层的对象、单向的依赖箭头，以及中继与两端之间的控制关系（灰色虚线）；省略了模型本身、服务器内部更多的模块，以及 Tailscale 这类可选的外部网络通道（`packages/tailscale` 只是调用本机的 tailscale 命令行，不是内部组件）。T3 Code 自己不运行模型。

图里要抓住的一条纵向关系是：**服务器只跟适配器打交道，适配器只跟 agent 进程打交道。** 下面沿这条线走一遍一条线程的主路径。

### 阶段一：命令进来，编排器算出事件和副作用

你在界面里的每个动作，到服务器这里都是一条**命令**（command，一个「要改变状态」的请求）。发一条消息对应 `message.dispatch`，入口是 [`Orchestrator.ts` L7281 起的 `dispatchMessage`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L7281-L7285)。它读当前状态、做校验，然后往两块草稿里添东西：一块是事件，一块是副作用。事件里最先出现的是「开了一轮」（`run.created`，[L8383-L8391](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L8383-L8391)）和「你的消息」（`message.updated`，[L8443-L8451](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L8443-L8451)），两者在同一个草稿里，所以你的消息是和「开了一轮」一起落库的，不等 agent 启动。

副作用这边只放一个意图，不带任何进程信息：

```ts
// Orchestrator.ts L8988-L8997
const pendingEffect = {
  id: `effect:${command.commandId}:provider-turn.start:${runId}`,
  commandId: command.commandId,
  threadId: command.threadId,
  request: { type: "provider-turn.start", runId },
} satisfies PendingOrchestrationEffectV2;
if (dispatchMode.type !== "defer_start") {
  yield* Ref.update(effects, (existing) => [...existing, pendingEffect]);
}
return;
```

编排器自己不启动任何东西。AGENTS.md 把编排器描述成「串行化命令、不做 I/O 地决定事件」，架构文档加了一句约束：命令被确认只代表意图已提交。

### 阶段二：一个事务落库

草稿算完后，由 [`dispatchWithReceiptEffect`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L16509-L16513) 收尾。它先查这条命令的回执，处理过了就按回执重放，保证重试不会重复执行。然后算出计划（`dispatchOnce`），并立刻拿计划里的事件对照管理员设的权限上限（[L16565-L16566](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L16565-L16566) 的 `refuseAboveRuntimeModeCeiling`），超了就拒绝。之后才交给 [`EventSink.ts` 的 `commitCommand`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EventSink.ts#L788-L872)：

```ts
// EventSink.ts L846-L872，节选
const storedEvents = yield* eventStore.append({
  commandId: input.commandId,
  events: normalized,
});
// （省略：取最后一个事件的序号，没有事件则报错）
const outcomes = yield* applyStoredEvents(storedEvents);
yield* effectOutbox.enqueue(input.effects);
const receipt: CommandReceiptStore.CommandReceiptV2 = {
  commandId: input.commandId,
  threadId: input.threadId,
  commandType: input.commandType,
  acceptedAt: input.acceptedAt,
  resultSequence: sequence,
  status: "accepted",
  error: null,
};
yield* commandReceipts.upsert(receipt);
```

四样东西写在一起：事件、投影（`applyStoredEvents`）、待执行的副作用、命令回执。这段代码跑在一个数据库事务里，提交之后才通知订阅者，界面这时已经能看到你的消息。

### 阶段三：副作用启动 agent

落库之后轮到 [`EffectWorker.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EffectWorker.ts#L239-L249)。它是一个大的 `switch`，每种副作用一个分支，`provider-turn.start` 这个分支调 `providerTurnStart.start`（[L120-L125](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EffectWorker.ts#L120-L125)），再往下才碰到适配器的入口 `session.startTurn`（[`ProviderTurnStartService.ts` L427-L431](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/ProviderTurnStartService.ts#L427-L431)）。`startTurn` 是 [`ProviderAdapterV2SessionRuntime`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts#L765-L880) 接口上的一个方法，输入里的 `runtimePolicy` 带着这条线程的权限模式，适配器再把它翻译成各家 agent 自己的开关。

### 阶段四：agent 的事件和审批请求回来

agent 进程吐出的原生事件，先被适配器翻译成统一的 `ProviderAdapterV2Event`（[`ProviderAdapter.ts` L101-L250](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts#L101-L250) 是它的完整取值），再由 [`ProviderEventIngestor.ts` L620-L628](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/ProviderEventIngestor.ts#L620-L628) 变成领域事件、作为命令送回编排器。agent 要权限，走的就是其中的 `runtime_request.updated`。

你批准或拒绝，则是另一条命令 `runtime-request.respond`。编排器先确认这条请求还在等你，不在等待就报错（[L11589-L11595](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L11589-L11595)），记为已解决，再排一个送达的副作用（[L11946-L11962](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L11946-L11962)），最后由 [`RuntimeRequestService.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/RuntimeRequestService.ts#L78-L124) 交给适配器：

```ts
// RuntimeRequestService.ts L89-L123，节选
// Dispatch persists resolution before this effect runs; pending requests are not executable.
if (request.status !== "resolved") {
  return yield* new RuntimeRequestResponseExecutionError({
    reason: "request-not-ready",
    threadId: input.threadId,
    providerSessionId: input.providerSessionId,
    requestId: input.requestId,
  });
}
// （省略：确认请求仍然可以回应，并且会话仍然活跃）
yield* session.value.respondToRuntimeRequest({
  requestId: input.requestId,
  ...(input.decision === undefined ? {} : { decision: input.decision }),
  ...(input.feedback === undefined ? {} : { feedback: input.feedback }),
  ...(input.answers === undefined ? {} : { answers: input.answers }),
});
```

注释说得很准：先落库「已解决」，才执行送达。所以同一个请求不会被批准两次，回复一条已经不在等待的请求也会被拒绝。轮次结束时适配器发出 `turn.terminal`，一轮被标记为完成；架构文档说明这之后的检查点是在之后作为副作用捕获的，捕获提交之前，读取方把它当作仍在等待。

## 五、三个关键机制深读

### 机制一：权限模式在代码里是怎么被执行的

**要解决的问题**：界面上只有四个档位，背后却是十几个各有自己权限体系的 agent，外加管理员设的上限。代码分三层，各管一件事。

第一层，**定义与排序**。四个档位和它们的宽严顺序写死在契约里（[`providerPolicy.ts` L25-L43](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/contracts/src/providerPolicy.ts#L25-L43)）：`approval-required` 是 0，`auto-accept-edits` 是 1，`auto` 是 2，`full-access` 是 3，而 `DEFAULT_RUNTIME_MODE` 的值就是 `"full-access"`，这正是教程里反复提醒的那件事。带序号之后，「超没超过上限」只是一次比较。

第二层，**入口处对照上限**。[`DispatchModeLimit.ts` L79-L92](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/DispatchModeLimit.ts#L79-L92) 不看命令的类型，而是看命令打算产生哪些事件：只要有一条 `thread.created`、`thread.runtime-mode-updated`、`run.created` 或 `run-attempt.created` 把线程的模式抬到上限之上，就拒绝。它由阶段二里那行检查调用，所以不管命令来自界面、agent 还是定时任务，都躲不过去。还有一层兜底：provider 不支持某个档位时，[`RuntimePolicy.ts` L82-L91](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/RuntimePolicy.ts#L82-L91) 的 `providerRuntimeMode` 直接退回 `approval-required`，对应官方文档里的规则 Never emulate missing permission modes，T3 Code 不靠替你点「同意」来伪造一个模式。

第三层，**翻译并拦截**。适配器先把档位翻译成 agent 自己的开关。Codex 的翻译在 [`CodexAdapterV2.ts` L856-L898](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Adapters/CodexAdapterV2.ts#L856-L898)：

| T3 Code 的档位 | Codex 的审批策略 | 审查者 | 沙箱 |
|---|---|---|---|
| `approval-required` | `untrusted` | 用户 | 只读 |
| `auto-accept-edits` | `on-request` | 用户 | 可写工作区 |
| `auto` | `on-request` | 自动审查 | 可写工作区 |
| `full-access` | 一组细分开关，其中只有 `mcp_elicitations` 保持开启 | 用户 | 完全访问 |

Claude 的翻译在 [`ClaudeAdapterV2.ts` L3682-L3691](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L3682-L3691)：四个档位依次对应 `default`、`acceptEdits`、`auto`、`bypassPermissions`。紧接着的 [L3716-L3722](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L3716-L3722) 还会检查：你的 Claude 设置禁用了跳过权限时，`bypassPermissions` 会被降级成 `auto` 或 `default`。这和官方文档里「Full access 下 Claude 仍可能来问你」说的是同一件事。

真正**在请求到来的那一刻做拦截**的代码，在通用的 ACP 适配器里。判断函数是 [`clientPolicy.ts` 的 `acpOperationDisposition`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-acp/src/server/clientPolicy.ts#L145-L188)，返回三选一：

```ts
// clientPolicy.ts L149-L187，节选
const toolKind = operation.kind ?? "other";
if (isAcpReadKind(toolKind)) {
  return acpReadDisposition(runtimePolicy);
}
if (acpPolicyRequiresApproval(runtimePolicy)) {
  return "ask";
}

const sandboxPolicy = unknownRecord(runtimePolicy.sandboxPolicy);
switch (sandboxPolicy?.type) {
  // （省略：readOnly 与 workspaceWrite 两种沙箱的判断）
  case "dangerFullAccess":
  case "externalSandbox":
    return "allow";
  case undefined:
    if (runtimePolicy.runtimeMode === "approval-required") return "deny";
    if (
      runtimePolicy.runtimeMode === "auto-accept-edits" &&
      runtimePolicy.approvalPolicy === undefined &&
      !isAcpMutationKind(toolKind)
    ) {
      return "ask";
    }
    return "allow";
  default:
    return "deny";
}
```

调用它的地方是 [`adapter.ts` 里注册的 `handleRequestPermission`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-acp/src/server/adapter.ts#L7513-L7611)：

```ts
// adapter.ts L7583-L7611，节选
if (disposition === "allow") {
  const optionId = selectAutoApprovedPermissionOption(answerableParams);
  return {
    _tag: "Immediate" as const,
    response:
      optionId === undefined
        ? ({ outcome: { outcome: "cancelled" } } as const)
        : ({ outcome: { outcome: "selected", optionId } } as const),
  };
}
// （省略：disposition 为 deny 的分支，同样立即答复，只是选拒绝那个选项）
return {
  _tag: "Pending" as const,
  pending: yield* beginApprovalRequest(
    yield* activeContext,
    params,
    handlerGeneration,
    transportRequestId,
  ),
};
```

**对使用者意味着什么。** 该问你的那一步，是在适配器里当场决定的：`allow` 和 `deny` 直接答复 agent，只有 `ask` 才变成阶段四里那条 `runtime_request.updated`，出现在你的对话里。读文件不问你，`isAcpReadKind` 把读、搜索、思考类操作单独放行，和官方文档 File reads and searches never wait for approval 一致。权限模式也不是沙箱，它决定的是 T3 Code 请 agent 用哪套规则，执行规则的是 agent 自己；SECURITY.md 开头就写明环境不是沙箱，它以你的系统用户权限运行 agent 和终端。

### 机制二：远程访问与 T3 Connect 的信任模型

**要解决的问题**：人在外面，要连回家里那台机器，又不想在路由器上开口子，也不想让自己的代码经过别人的服务器。先用一张表回答三个问题，依据是内部文档、SECURITY.md 和服务器代码。

| 问题 | 答案 |
|---|---|
| 谁持有 provider 的登录凭据 | 环境那台机器。agent 读的是它自己的配置，比如 Claude 的配置目录 |
| 谁签发客户端连服务器用的会话 | 环境自己。内部文档：A relay token is never an environment login |
| 云身份由谁管 | T3 Connect 用 Clerk。内部文档把它列在另一个信任边界里 |
| 业务流量走哪里 | 客户端直接连环境的隧道主机名。隧道是主机上的 `cloudflared` 进程，由服务器拉起 |
| 中继在业务流量里吗 | 不在。`infra/relay/README.md`：The relay is intentionally not in the hot path for normal T3 Code traffic |

中继参与的只有一件事：帮一个已登录的客户端从环境那里换到一份连接凭证。环境这边负责签发的函数是 [`CloudLink.ts` 的 `mintCredential`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/cloud/CloudLink.ts#L1585-L1688)，它先验中继转来的凭据证明的签名，再做下面这六项检查和防重放：

```ts
// CloudLink.ts L1626-L1647
if (
  Option.isNone(proofOption) ||
  proofOption.value.environmentId !== environmentId ||
  proofOption.value.sub !== linkedCloudUserId ||
  proofOption.value.cnf.jkt !== proofOption.value.clientProofKeyThumbprint ||
  !hasBoundedCloudProofLifetime({ ...proofOption.value, nowSeconds }) ||
  !hasExactScope({ scopes: proofOption.value.scope, expected: "environment:connect" })
) {
  return yield* new CloudLinkProofRejectedError({ request: "mint" });
}
const proof = proofOption.value;

const jtiSecretName = yield* replayMarkerName(CLOUD_MINT_JTI_PREFIX, proof.jti);
const nonceSecretName = yield* replayMarkerName(CLOUD_MINT_NONCE_PREFIX, proof.nonce);
const consumedReplayGuards = yield* consumeCloudReplayGuards({
  secrets,
  names: [jtiSecretName, nonceSecretName],
  value: stringToBytes(DateTime.formatIso(now)),
});
if (!consumedReplayGuards) {
  return yield* new CloudLinkProofReplayedError({ request: "mint" });
}
```

逐项读那六个条件：签名有效，目标是这台环境，账号是这台环境链接的那个账号，证明绑定的就是客户端自己的密钥指纹（`cnf.jkt`），有效期有上限，范围恰好是 `environment:connect`。过了之后还要消耗两个防重放标记，同一份证明不能用第二次。隧道进程的启动参数在 [`ManagedEndpointRuntime.ts` L785-L805](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/cloud/ManagedEndpointRuntime.ts#L785-L805)，就是一条 `cloudflared tunnel --no-autoupdate ... run`，不经过 shell。隧道只暴露服务器自己的回环地址，理由写在 [`CloudLink.ts` L586-L599](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/cloud/CloudLink.ts#L586-L599) 的注释里：隧道必须能到达这台服务器，所以签名用的源地址是服务器自己的回环地址，从不用调用方给的地址。

**中继能看到什么。** 把文档和代码放在一起：

| 中继经手 | 中继不经手 |
|---|---|
| 环境链接记录、受管隧道的分配 | 你的代码和提示词，它们从你的机器直达 provider |
| 签发凭证时的协调。内部文档：The relay never sees session tokens | 客户端与服务器之间的 HTTP 与 WebSocket 流量 |
| 你打开 Publish agent activity 后的项目与线程标题、模型名、活动状态 | 环境会话令牌 |
| 连接诊断 trace、手机崩溃报告，二者都发往 Axiom | 文件内容 |

**对使用者意味着什么。** 信任假设写在了明处：SECURITY.md 的「有意为之，不是漏洞」清单里有一条，中继的签名密钥被攻破后可以替已链接的环境签发，官方给的缓解办法就是打开 **Require approval for new devices**，让信任从「中继没被攻破」转到「你批准过的设备密钥」上。不想信任中继也有不经过它的路线，局域网直连和 Tailscale HTTPS 都不经过中继，FAQ 还提醒你可以自己托管。另外，手机推送依赖 Publish agent activity，它发的标题和模型名属于另一条数据流，关遥测关不掉它。

### 机制三：`packages/tailscale` 用 Tailscale 做什么

**要解决的问题**：用户已经有一张 Tailscale 网络，想在它上面用 `https://` 地址访问自己的 T3 Code 服务器。

**代码怎么做的**：这个包很小，5 个受版本控制的文件（含 1 个测试），主文件 `tailscale.ts` 781 行。它的依赖只有 `@t3tools/contracts`、`@t3tools/shared` 和 `effect`，**没有 Tailscale 的 SDK**。它做的事是启动本机的 `tailscale` 命令行并读输出，一共四类：

| 做什么 | 执行的命令 | 代码位置 |
|---|---|---|
| 读状态：是否在运行、MagicDNS 名、Tailscale 地址、tailnet 是否启用了 HTTPS | `tailscale status --json` | [`tailscale.ts` L307-L309](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L307-L309)、[`L215-L242`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L215-L242) |
| 读偏好：是否开了 Tailscale SSH | `tailscale debug prefs` | L381-L383 |
| 把本机端口发布成 Tailscale 上的 HTTPS 地址，以及撤销 | `tailscale serve ...` | [`L466-L485`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L466-L485) |
| 核对哪些转发路由指向这台服务器 | `tailscale serve status --json` | [`L627-L687`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L627-L687) |

核心是第三类，函数 `ensureTailscaleServe`：

```ts
// tailscale.ts L477-L484
const status = yield* Effect.option(readTailscaleStatus);
if (Option.isSome(status) && status.value.httpsServeEnabled === false) {
  return yield* new TailscaleServeHttpsDisabledError();
}
const servePort = input.servePort ?? DEFAULT_TAILSCALE_SERVE_PORT;
const localHost = input.localHost ?? "127.0.0.1";
const args = ["serve", "--bg", `--https=${servePort}`, `http://${localHost}:${input.localPort}`];
return yield* runTailscaleCommand(args, TAILSCALE_SERVE_TIMEOUT);
```

它先读状态，tailnet 没开 HTTPS 就直接报错，因为那样 `tailscale serve` 什么都没配却返回成功。然后执行一条等价于 `tailscale serve --bg --https=443 http://127.0.0.1:<端口>` 的命令。

**对使用者意味着什么。** Tailscale 不是 T3 Code 的内置组件，你要自己装 Tailscale、把设备加进同一个 tailnet、在 tailnet 上开 MagicDNS 和 HTTPS 证书，官方 Remote access 文档写的就是这些前提。配对和认证也不归 Tailscale 管，内部文档的原话是 Tailscale supplies an endpoint for normal pairing; auth remains the environment's responsibility。代码里还有一层谨慎：它会解析 `tailscale serve status`，判断某个端口上已有的转发是自己的、别人的，还是上次没退干净留下的，别人的路由不动。

## 六、从源码跑起来与跑测试

以下照[官方开发文档](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/operations/00_development.md)转述，**本页写作时没有实际运行**。

### 首次检出

T3 Code 用 Vite+ 提供锁定版本的 Node，命令是 `vp`。Windows 上克隆时要加 `-c core.longpaths=true`，否则 `.repos/` 检出不全；安装 Vite+ 的 Windows 写法是 `irm https://vite.plus/ps1 | iex`。

```sh
curl -fsSL https://vite.plus | bash
git clone https://github.com/pingdotgg/t3code.git
cd t3code
vp i
vp run dev
```

`vp run dev` 会启动服务器和网页应用，并打印一条**配对链接**。要打开这条链接，直接访问根地址不会让新浏览器通过认证。不要在开发时把服务器指向 `~/.t3/userdata`，那是你真实的数据目录；普通克隆默认用 `~/.t3/dev`。它还会注册一个叫 `Replay (dev)` 的 provider，回放录好的对话，不调用付费模型。开发时用它，除非你要改的正好是某个真实 provider 的协议。

### 常用检查

| 要做什么 | 命令 |
|---|---|
| 推送前跑和你改动相关的检查 | `vp run check:changed` |
| 跑指定的测试文件 | `vp test run <files>` |
| 对指定文件跑 lint | `vp lint <files>` |
| 只对一个包做类型检查 | `vp run --filter <pkg> typecheck` |
| 找没用的导出 | `vp run knip:check` |
| 测试中继 | 在 `infra/relay` 目录下 `vp test run` |

AGENTS.md 明确要求**不要自己跑全仓库的检查**（`vp check`、`vp run -r test`、`vp run -r typecheck`），全量测试归 CI。读测试时要知道内部文档 `15_testing.md` 的两条规矩：服务器是事件溯源的，副作用在命令提交之后才跑，所以测试里要么排空副作用执行器，要么等那个标志里程碑的事件，**不许用 sleep 或轮询**；测 adapter 要用真实 provider 录下来的回放夹具，走过真实的编排器、适配器和投影，因为手写的协议帧是在猜线路上的行为。

## 七、已验证 / 推断 / 未知

### 已验证

| 结论 | 依据 |
|---|---|
| 固定提交是 `d00aaac8`，提交说明为 `fix(antigravity): a tool's own arguments no longer mark it as a T3 MCP call (#41978)` | 本地 `git rev-parse HEAD`、`git log -1`，与 GitHub API 返回一致 |
| 第三节的全部规模数字 | 在该提交上运行 `git ls-files` 与 `wc -l` |
| 命令先算成事件和副作用，落库后才执行副作用 | `Orchestrator.ts` L16565-L16566、L16689-L16695；`EventSink.ts` L846-L872；`docs/internals/01_architecture.md` |
| 四个档位、宽严顺序、默认值是 `full-access` | `packages/contracts/src/providerPolicy.ts` L25-L43 |
| 权限上限在每次提交前按「将产生的事件」检查 | `Orchestrator.ts` L16565-L16566；`DispatchModeLimit.ts` L79-L92 |
| provider 不支持的档位退回 `approval-required` | `RuntimePolicy.ts` L82-L91 |
| ACP 适配器把每次权限请求判成 allow、ask 或 deny，读类操作不问 | `clientPolicy.ts` L145-L202；`adapter.ts` L7555-L7611 |
| Codex 与 Claude 的档位翻译 | `CodexAdapterV2.ts` L856-L898；`ClaudeAdapterV2.ts` L3682-L3691、L3716-L3722 |
| 环境签发连接凭证前校验中继证明的六项条件并防重放 | `CloudLink.ts` L1619-L1647 |
| 隧道进程由服务器拉起，源地址固定为服务器自己的回环地址 | `ManagedEndpointRuntime.ts` L785-L805；`CloudLink.ts` L586-L599 |
| 中继不在业务流量的路径上 | `docs/internals/06_t3-connect.md`；`infra/relay/README.md` |
| `packages/tailscale` 只调用 `tailscale` 命令行，不含 Tailscale SDK | `packages/tailscale/package.json`；`src/tailscale.ts` |
| 遥测开关默认为开，端点默认是 `ingest.t3.codes` | `apps/server/src/telemetry/AnalyticsService.ts` L71-L74 |
| 访客链接的签名是截断过的 HMAC | `apps/server/src/guest/GuestShareService.ts` L242-L249 |
| 网页、手机、桌面三端各有一份 `zh.json` 翻译目录 | `git ls-files` 三个 `src/i18n/translations` 目录 |

### 推断

- **在手机上批准和在电脑上批准走的是同一套流程。** 依据是两者最终都变成 `runtime-request.respond` 命令。我没有读客户端那边发命令的代码。
- **中继请求环境签发凭证的调用顺序**取自内部文档。服务器这一侧的 `mintCredential` 我读了，中继那一侧的 `EnvironmentConnector.ts` 没有逐行读。
- **「重启后能接着来」的具体恢复逻辑**在 `ProviderRuntimeRecoveryService.ts` 等文件里，本页没有读。架构文档只说明了丢失的 provider 进程对应的副作用在恢复时被作废，而不是重放。

### 未知

- `t3` 服务器的默认端口。文档里只见过示例值 `T3CODE_PORT=3773`，没有找到「默认是多少」的原文。
- `t3.json` 的完整字段清单。仓库自己的 `t3.json` 引用了 `https://t3.codes/schema/t3.json`，本页没有打开它。
- 中继的部署细节（Clerk 的配置、各环境的差异）。`docs/operations/02_connect-setup.md` 本页没有读。
- `zh.json` 的翻译覆盖到什么程度，以及界面在哪里切换语言。
- `.repos/` 是怎么更新进仓库的。AGENTS.md 只提到一条同步命令，本页没有展开。

<!-- TODO: 待核实 —— 上面「未知」五项都缺一手来源；另外，本页写作时比对发现 main 分支的 docs/user/permission-modes.md 已经和固定提交不同（例如 Antigravity 被加进了「退回到问你」的名单，fx 可用的档位也有变化），引用权限模式细节时请以读者所用版本的文档为准 -->

## 八、继续读什么

- [教程](./t3code)与[学习地图](./index)：先会用，再回来读代码。
- 官方的 [`docs/README.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/README.md)：从 Glossary 开始，按它给的顺序读 18 篇内部文档。
- [Tailscale](../tailscale/)：`packages/tailscale` 调用的对象本身。
- [Cindy](../cindy/)：同类的多 agent 工作区产品，可以拿它的架构和本页对照。
- [Claude Code](../claude/)、[Codex](../codex/)：两个最主要的被驱动方，看它们的权限体系才能读懂适配器在翻译什么。
