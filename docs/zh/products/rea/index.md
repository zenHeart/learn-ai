---
title: REA 源码级解读
description: REA 是一个把 Hopper、Ghidra、IDA、JADX 和浏览器检查收进本地 MCP 工具的逆向工程工具。本页读它的源码，讲清它凭什么敢下结论，以及它在哪里拒绝下结论。
domain: product
tags:
  - reverse-engineering
  - mcp
  - static-analysis
  - evidence
role: deep-dive
source_revision: 70611713e140a86201cdef659181012cbdd17f4d
---

# REA 源码级解读：它凭什么敢下结论

> **一句话结论：** REA 的独到之处不在于它能调用 Hopper，而在于它给每一次调用打上**置信度**与**权威性**两个字段，
> 并且在动手重建一个功能之前，先逼你把「我到底需要证明什么」写成一份可判定的清单。
>
> 本页所有结论都对照 `morluto/rea` 的提交 [`70611713e`](https://github.com/morluto/rea/tree/70611713e140a86201cdef659181012cbdd17f4d)（npm 包 `rea-agents` 6.4.0）。
> 提交之后的变化不在本页范围内。**已验证事实 / 推断 / 未知**的分层见文末。

## 一、先说清楚它是什么

README 的标题是 **REA: Reverse Engineer Anything**，一句话定位是「一套横跨二进制、应用与运行时行为的逆向工程 MCP」。

它的使用姿势只有一种：**你问，它去查**。

```text
Understand how search works in the Notes app, show me the evidence, and build a
similar feature for my project.
```

换成你自己的目标应用即可。装完之后它同时是三样东西：

| 形态 | 入口 | 面向 |
|------|------|------|
| MCP 服务器 | `rea --mcp`（stdio） | 你的智能体 |
| CLI | `rea <command>` | 你的终端 |
| 智能体技能 | `npx rea-agents setup` 安装的 skill | 约束智能体怎么提问、怎么用证据 |

三者共用同一批工作流函数。这一点在源码里是硬约束：CLI 和 MCP 都汇进 `src/application/`，而不是各写一套。

### 写给谁

- 想在动手复刻之前，先弄清某个**已发布功能**到底怎么实现的前端工程师；
- 需要结论**可追溯**到一行伪代码、一次真实抓包或一个具体文件偏移，而不是靠模型猜的人；
- 愿意自己在本地装 Hopper / Ghidra / IDA，并接受「这些引擎不在 REA 的信任范围内」这件事。

### 不写给谁（这一节比上一节重要）

- **有完整源码的项目，用普通仓库工具就行，不要跑 REA。** REA 自带的智能体 skill 第一条就是这么写的：
  「对于完整源码仓库的常规分析，使用常规仓库工具，不要运行 REA 的 readiness 或 provider 命令。」这是它自己划的边界。
- **不要拿它当反外挂或越权分析工具。** 它的免责文件明确限定用途是合法研究、教育、互操作、软件保全，以及分析你拥有或被授权检查的软件。
- **不要期待它替你决定重建什么。** 它负责把「你声称重建了什么」变成一份可判定的义务清单，划不划范围是你的判断。

---

## 二、一次调查到底发生了什么

先看完整数据流。**编号即执行顺序**，每一步落地产出的东西写在箭头上。

<ReaDiagram src="/diagrams/rea-evidence-flow.svg" alt="一次 REA 调查从提问到闭包的完整数据流：智能体提问、应用层选定唯一提供方、REA 在私有临时根目录生成令牌与套接字并启动自有进程组、外部引擎加载桥接代码并做令牌校验、桥接代码调用引擎 API 取原始结果、结果被包装成带置信度与权威性的证据记录、静态应用图派生候选义务、闭包求值判定每条义务，最后带着证据与未知项回到智能体。分析全程在本地完成，未知是一等值而不是错误。" />

> **图的依据：** 依赖方向来自仓库自带的 [`docs/architecture.mermaid`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/architecture.mermaid)（156 行）；
> 令牌与进程组的行为约束来自 `src/process/` 及其单元测试。图中每一步的产出物都能在源码里找到对应文件。

有几个步骤值得停下来看：

**第 3 步，REA 启动的是自己拥有的进程组。** 它在私有临时根目录里生成 32 字节随机令牌和一条私有套接字路径，把启动脚本写进磁盘并设成 `0600`，然后 spawn 之后**校验属主 PID**——你没法伪装成那个进程。Windows 上这层落到一个自带的 Node-API 8 插件，用 Job Object 的 kill-on-close 保证「即使属主被 SIGKILL，进程也一定死」。

**第 4 步，桥接代码的请求体只允许四个键。** Hopper 那条桥的解析逻辑是：不是恰好 `{id, token, method, params}` 就直接抛 `Invalid bridge request shape`。令牌用 `hmac.compare_digest` 比；校验失败时返回的文案被刻意抹成固定字符串 `"Invalid bridge capability"`，令牌不会泄进错误信息。传输是 NDJSON over `AF_UNIX`；Windows 上的 Ghidra 改走认证回环 TCP。

**第 6 步，证据有两个正交的标记。** `confidence` 是 `observed / derived / inferred`——这条结论是直接看到的、推导出来的，还是推断的。`authority` 是谁认证的：`shipped-artifact / controlled-replay / historical-reference / external-service / analyst-inference`。这两个字段互相不能替代，后面所有判定都同时看它们。

---

## 三、架构：为什么它能同时挂两个前端

<ReaDiagram src="/diagrams/rea-architecture.svg" alt="REA 的分层结构与依赖方向：入口层包含一次性 CLI 与 MCP stdio 服务器；应用层承载两者共用的工作流、二进制会话路由与调查记录；提供方层是 Hopper、Ghidra、IDA、浏览器、.NET、Android、固件、WASM、EVM 等适配器，共同底座是拥有进程组、私有临时根目录与期限约束的 src/process；最底层是纯粹无副作用的领域层。右侧贯穿 src/contracts 契约层，底部单列桥接事实：真正的反编译逻辑在 bridge/hopper_bridge.py 与 bridge/ghidra/ReaGhidraBridge.java 里。" />

四层，箭头只向下：

1. **入口层** — `src/cli` 与 `src/main` + `src/server`。真正的进程入口是 `scripts/rea.mjs`（121 行手写 `.mjs`，不经编译）：它把 `REA_PACKAGE_VERSION` 注入环境变量、修掉 Windows 空 `USERPROFILE` 和 Termux 的浏览器缓存路径，然后做一次分派——带 `--mcp` 走 MCP 服务器，否则走 CLI 运行时。
2. **应用层** — `src/application/`。CLI 与 MCP 调的是同一批函数，所以两条路径的行为天然一致。`src/cli.ts` 里按顺序注册了 **36 个 `register*Commands`**，`src/server/createServer.ts` 则装配了 44 个工具注册模块——两边能力是对齐的。
3. **提供方层** — 每个引擎一个适配器，外加共享的 `src/process/` 底座。
4. **领域层** — `src/domain/`，纯粹、无副作用。证据模型、比较语义、闭包判定的全部纯函数都在这里。

中间还有一层薄薄的 `src/composition/`：**29 个文件、总共 666 行**，最大的一个不到 30 行，全是「造一个已绑定依赖的工厂函数」。

### 两条反直觉的事实

**第一，领域层是最大的层，不是适配器层。** 按非测试代码行数排：

| 层 | 文件数 | 行数 |
|---|---:|---:|
| `src/domain/` | 379 | **121,626** |
| `src/application/` | 235 | 63,789 |
| `src/browser/` | 92 | 27,537 |
| `src/ghidra/` | 40 | 18,332 |
| `src/process/` | 40 | 15,227 |
| `src/artifacts/` | 43 | 14,502 |
| `src/native/` | 44 | 15,035 |

你可能会以为「一堆引擎适配器」才是主体。实际相反：六成的代码在纯函数里。`src/domain/javascript/` 一个子树就有 182 个文件。

**第二，这个分层不是靠自觉，是被 lint 卡住的。** `scripts/lib/module-boundaries.mjs` 里写着：

```js
const PURE_LAYERS = new Set(["domain", "contracts"])
```

`npm run lint` 会跑 `verify:module-boundaries`，用 `@babel/parser` 做 AST 扫描：**任何引擎协议或提供方专有代码出现在 `domain` / `contracts` 里都直接失败**。仓库自己的 `AGENTS.md` 把这条写成一句话：「依赖向内流：先是领域语义与契约，然后提供方适配器，再是共享应用工作流，最后是 CLI / MCP 适配器。」

**领域层不碰文件系统与进程，是这套设计里最值钱的一条。** 同一份闭包判定因此在 CLI、MCP 和单元测试里给出同一个答案——不需要为了测它而起一个真引擎。

### 一个容易误解的点：`bridge/` 不是「一个桥」

`bridge/` 目录里有 30 个文件，横跨五种语言，接的是**七种不同的第三方运行时**，而且**全部是调用方自备（BYO）**：

| 桥接文件 | 接进谁 |
|---|---|
| `bridge/hopper_bridge.py` | Hopper 内嵌的 CPython，跑在 Hopper 自己的 Python 线程上 |
| `bridge/ghidra/ReaGhidraBridge.java` | Ghidra headless 分析器，打包成 HeadlessScript |
| `bridge/android/ReaJadxBridge.java` | `jadx-headless-mcp` 的 JAR |
| `bridge/mitmproxy/capture.py` | `mitmproxy` 12.2.3 的 addon |
| `bridge/native/rea_lldb_tracer.py` | `lldb --batch` 的内嵌 Python |
| `bridge/nativeaot/*.java` | `ghidra-nativeaot` 的上游类，反射加载 |
| `bridge/pwndbg/*`、`bridge/pwntools/*` | GDB / pwndbg、pwntools |

每一个桥的头部文档都写着同一句话的变体：**上游引擎保持未修改**。REA 自己的代码是边界与权威层，不是分析引擎的分叉。

这带来一个必须讲明的后果：**本机被篡改的 Hopper / Ghidra 安装就在 REA 的信任边界之内**。REA 的缓解手段是自己只发 `bridge/` 下的文件并校验打包产物，但它无法校验你本机装的那个引擎。

---

## 四、核心机制一：证据是分级的

REA 的世界里，最重要的名词是 **Evidence**。每条证据除了结果本身，还带着：

- **`confidence`**：`observed`（看到了）/ `derived`（推出来的）/ `inferred`（推断的）
- **`authority`**：`shipped-artifact`（出货产物）/ `controlled-replay`（受控重放）/ `historical-reference`（历史参考）/ `external-service`（外部服务）/ `analyst-inference`（分析师推断）
- **位置**（`locations`）、**限制**（`limitations`）、**关系覆盖度**（`relationship_coverage`）

与之配套的一条原则，源码里反复出现：

> **缺失的覆盖度是 unknown，不是 absence。**（Missing coverage is unknown, not absence.）

这句话决定了 REA 面对「我查不到」时的行为：它不会说「没有这个东西」，它会说「我没覆盖到，原因是 X」。

---

## 五、核心机制二：重建义务台账

这是 REA 最值得学的设计，也是本页交互式组件要展开的部分。

### 问题从哪来

你让智能体「照着 Notes 的搜索功能做一个」，它写完了。**你怎么知道它重建的东西和原来一样？**

REA 的答案是：不靠感觉，先逼出一份**清单**。

`build_reconstruction_obligation_ledger` 把已认证的证据变成一份确定性的「重建义务」列表。每条义务是一句可以被判真假的话，比如：

```json
{
  "obligation_id": "protocol.rpc.cancel",
  "title": "取消在途请求并只发一个终态响应",
  "required_case_kinds": ["positive", "negative", "malformed", "cancellation"],
  "required_original_authority": "external",
  "required_fixture_authority": "protocol",
  "required_verifier_authority": "protocol",
  "requires_parser_type": true
}
```

### 判定规则

一条 required 义务要变成 `verified`，必须同时满足：

| 条件 | 不满足时的 diagnostic code |
|---|---|
| 恰好一个 manifest binding 认领它 | `missing-owner` / `ambiguous-owner` |
| `requires_parser_type` 为真时提供 parser + schema + domain type | `missing-parser-type` |
| 每一种 `required_case_kinds` 都有 fixture | `missing-case` |
| fixture 的权威性达标且 Evidence 可认证 | `weak-fixture-authority` |
| 有 verifier 绑定，且它枚举了这条义务 ID | `missing-verifier` / `verifier-does-not-enumerate` |
| verifier 的结果 Evidence 在 bundle 里 | `missing-verifier-result` |
| verifier 权威性满足要求 | `weak-verifier-authority` |
| verifier 状态是 `pass` | `verifier-failed` |
| 原始行为有被观测到的权威性刻画 | `static-only` |
| 没有残留未知项、没有不可用权威性、没有重复定义 | `residual-unknown` / `unavailable-authority` / `duplicate-definition` |
| 没有矛盾 | `contradiction` |

**最关键的一条：`verified` 的唯一途径是零 diagnostic。** 不是「重要条件都满足了」，是**一条 diagnostic 都没有**。

状态判定是严格按 `if` 短路顺序走的：

```text
out-of-scope → blocked → contradicted → unknown → unowned → verified → implemented
```

再往上一层，义务之间可以声明依赖。依赖判定是一个**有界不动点**：反复迭代，每轮把「依赖不存在」或「依赖未验证」的义务降级为 `blocked`，直到某一轮状态不再变化。最多跑「义务总数」轮。

最后汇总成台账级判定：`failed`（有 required 义务矛盾或 verifier 失败）→ `unknown`（有 limitations）→ `unknown`（有 required 义务为 unknown）→ `ready`（required 义务全部 verified）→ `open`。

### 动手改一改

下面这个组件就是上面这套规则的忠实移植。关掉某个条件，对应的 diagnostic 立刻出现在同一条义务上；改变一条义务的状态，它的依赖者会在同一轮迭代里被改写。

<ReaClosureLedger />

<ReaAuthorityLattice />

### 为什么这套设计值得学

它把一个通常靠人自觉的问题——「我是不是真的重建对了」——变成了**一份机器可判定的清单**。你不能靠说「我觉得应该对了」通过，必须给出一条能被认证的 verifier 结果，而且这个 verifier 的权威性还得配得上这条义务的要求。

它同时给了失败一个体面的位置：`blocked` 和 `out-of-scope` 都是合法的终态，**但都不算已验证**。这比「悄悄把它从清单里删掉」诚实得多。

---

## 六、它能分析什么

README 里的目标矩阵覆盖 20 类目标。挑几类有代表性的：

| 目标 | 返回什么 | 需要什么 |
|---|---|---|
| 原生二进制 | 伪代码、汇编、字符串、符号、调用与引用 | Hopper / Ghidra / IDA |
| Go 二进制 | 内嵌编译器版本、模块、替换项、构建设置 | 无（自带静态 ELF/PE/Mach-O 检查） |
| .NET 程序集 | 元数据、CIL 指令、声明的原生依赖 | 无（纯静态） |
| JavaScript / Electron | 模块、import、source map、路由、IPC、原生插件关系 | Node.js 和 npm |
| 网站 | 页面结构、脚本、网络观测、按需截图 | 一个 Chrome 系浏览器 |
| Android APK | Manifest 声明、类、反编译方法与引用 | Headless JADX + 完整 JDK |
| SQLite 数据库 | 表、列、索引、视图、触发器、部分行 | 本地数据库/WAL 快照 |
| 录制的 Linux 崩溃 | 原始笔记、每个线程的寄存器与信号、映射候选 | 调用方自备 pwntools |
| 固件 | 区域、提取结果、原生分析交接 | Linux 上的 Binwalk / Unblob |

注意「需要什么」这一列的规律：**静态检视往往零依赖，深度原生分析必须自带引擎。** 这不是疏忽，是它把「REA 信任什么」划清楚了。

运行时捕获类工具（跑进程、点页面、抓流量）会以**你的用户权限**执行目标动作，每个运行时指南都单独描述其副作用。这是它的设计选择，不是漏洞——但你在授权别人跑 REA 之前应该知道。

---

## 七、失败边界：它在哪里拒绝下结论

这一节比功能列表更能说明一个工具是否可靠。

**1. 依赖缺失不是回退，是显式不可用。** 提供方注册表的设计是「排序后的深候选，确定性选择，不回退」。选不到就报不可用，不会悄悄降级到弱一点的分析器然后假装结果一样。

**2. 传输预算是硬边界。** REA 按 MCP 标准输入输出客户端的 10 MiB 接收缓冲预算准备结果；装不下就返回 `resource_constraint` 并标 `details.resource: "transport"`，而不是截断。

**3. 时间与取消是一等契约。** 引擎启动有期限（可用 `REA_GHIDRA_STARTUP_TIMEOUT_MS` / `REA_HOPPER_STARTUP_TIMEOUT_MS` 调）。取消会返回 `exit 130` 和 `{"code":"cancelled"}`，**同时保留已观测到的部分结果**——中断不等于丢弃。

**4. 崩溃不等于分析失败。** 源码里区分了「运行时坏了」和「分析失败」两种诊断，并有测试专门断言版本偏移在恢复后被检出。

**5. Windows 上的 Ghidra 是 P0 实验态。** 它只承认 25 个只读操作，**明确拒绝数据库变更与元数据恢复**。

**6. 引擎崩溃了，不能算干净收尾。** Hopper 那条桥的 `should_stop` 条件要求：结果本身必须证明文档已关闭或已保留，分析已停止，才停循环。连接断开不算数。

**7. 许可不随工具转移。** IDA / Hopper / JEB 各自需要你合法取得并授权使用。REA 授予不了任何工具许可、密钥或激活权益。

---

## 八、想读它的源码，从哪里进

按「想理解什么」而不是「按目录顺序」：

| 你想搞懂的 | 从这里开始 |
|---|---|
| 整体依赖方向 | [`docs/architecture.mermaid`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/architecture.mermaid) —— 156 行，一张图说完 |
| 工具应该怎么设计 | [`docs/tool-design.md`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/tool-design.md) —— 94 行，工具形状表 + 契约规则 |
| 闭包判定（本页重点） | [`ReconstructionObligationLedgerEvaluation.ts`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/application/ReconstructionObligationLedgerEvaluation.ts) 与 [`reconstructionObligationLedgerIntegrity.ts`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/domain/reconstructionObligationLedgerIntegrity.ts) |
| 权威性为什么这么定 | [`ReconstructionObligationAuthority.ts`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/application/ReconstructionObligationAuthority.ts) —— 130 行，两张手写表 |
| 桥接协议的真实形状 | [`bridge/hopper_bridge.py`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/bridge/hopper_bridge.py) 的 `_bind_session_document` 与 `_run` |
| 失败行为 | `tests/` 里名字带 `rejects` / `refuses` / `timeout` / `cancellation` 的用例，比功能用例更能说明它的性格 |
| 项目自己怎么保证不作弊 | [`docs/reconstruction-readiness.md`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/reconstruction-readiness.md) —— 九个阶段，`fail`/`unknown`/`unsupported`/`truncated`/`skipped` **永远不汇总成 `pass`** |

### 一个值得学的工程约定

它的测试配置里写着 `retry: 0`，并且在注释里说清楚为什么不重试：**掩盖偶发通过比重现它更糟**。所以它把随机性问题解决在产品层——比如清理失败会重试，而且断言的是「重试后到底释放没释放」这个确定事实，而不是「重试几次算成功」。

---

## 九、事实分层

按本页的写作纪律，把结论分成三类：

### 已验证（逐条对照上面的源码链接读过）

- npm 包名 `rea-agents`，6.4.0；`bin` 为 `rea` 与 `rea-agents`，都指向 `scripts/rea.mjs`。
- Node 要求 `^22.19.0 || ^24.11.0 || >=26.0.0`；MIT 许可。
- 四层依赖方向、`bridge/` 的五种语言与七种 BYO 运行时、Hopper 桥的四键请求体与恒定时间令牌比较。
- 22 个 diagnostic code、8 个 obligation status 及其 `if` 短路顺序、依赖不动点上限为义务总数。
- 权威性接受表不是全序（`unit` 接受 `native-abi`，反向不接受；`integration` 既不接受 `unit` 也不接受 `external`）。
- 证据的 `confidence` 三值与 `authority` 五值。
- 分层由 `npm run lint` 的 AST 扫描强制：`PURE_LAYERS = {domain, contracts}` 里出现引擎协议代码即失败。领域层 379 个文件、121,626 行，是最大的层。
- `src/composition/` 是 29 文件 666 行的纯装配层；`src/cli.ts` 注册 36 组命令，`createServer.ts` 装配 44 个工具注册模块。
- 测试规模约 1094 个 `.test.ts`，`retry: 0`，Vitest 多项目分道（12 条 lane，按层与是否触碰进程/文件系统划分）。
- tsconfig 是最大严格度：`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`verbatimModuleSyntax` 全开，这也是每个相对 import 都带 `.js` 后缀的原因。
- 这个包**没有** `main` / `types` / `exports` 字段——它只作为可执行文件与 MCP 服务器被消费，不作为库。
- 自带 skill 的负面路由规则、10 MiB 传输预算、SIGINT → `exit 130` + 保留部分观测。

### 推断（从代码合理推出，但源码没直说）

- 「为什么它不内置 Hopper」——许可证与信任边界是合理解释，但仓库里没有一份 ADR 明确这么写。
- 闭包机制与成熟的形式化验证实践同源（义务 → 验证器 → 证据），但仓库里没有把它和任何具体方法论对齐的声明。

### 未知（本次没有能力确定）

- `experiments/analysis-efficiency/` 里那组效率实验的设计意图与可推广性；它自己的 README 已声明「不构成统计意义上的加速」。
- 本机五个 git submodule 在该提交下全部未检出，因此 NativeAOT 那条路径无法在本地编译验证。
- 它在真实世界项目上的**长期**可靠性。本页只能告诉你它的自我约束有多严，不能替你判断它在你手上的项目里会不会好用。

---

## 十、给你的判断建议

如果满足下面几条，REA 值得试：

- 你要复刻的东西**只有二进制或已发布包**可参考；
- 你能接受在本地装一个逆向引擎；
- 你更怕「结论错得离谱」，而不是「结论来得慢」。

如果只是「想知道某个开源库怎么用的」，它的启动成本大概率不划算——直接读源码更快。

不管用不用，它有两件事值得单独抄走：**给每条结论打置信度与权威性两个正交标签**，以及**在动手重建之前先写一份可判定的义务清单**。这两件事跟逆向工程没关系，跟任何「照着别人做的东西」的场景都有关。

---

### 来源与版本

| 项 | 值 |
|---|---|
| 源码 | [`morluto/rea`](https://github.com/morluto/rea) @ `70611713e140a86201cdef659181012cbdd17f4d` |
| npm | `rea-agents` 6.4.0 |
| 产品站 | [rea.tools](https://rea.tools/) |
| 许可 | MIT（第三方引擎各自保留） |
| 本页核对日期 | 2026-10-14 |

### 图解的可编辑源

本站两张图都是手写 SVG，源文件在 [`docs/public/diagrams/`](https://github.com/zenheart/learn-ai/tree/master/docs/public/diagrams)：

| 文件 | 依据的 REA 源码 |
|---|---|
| `rea-architecture.svg` | [`docs/architecture.mermaid`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/architecture.mermaid)、`scripts/lib/module-boundaries.mjs`、`AGENTS.md` |
| `rea-evidence-flow.svg` | [`docs/reconstruction-obligation-ledgers.md`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/reconstruction-obligation-ledgers.md)、`bridge/hopper_bridge.py`、`src/process/` |

两张图都在 SVG 内部用 `<title>` / `<desc>` 内嵌了完整长描述——即使图片没加载出来，读屏与全文检索仍然能拿到每一步与每条结论。