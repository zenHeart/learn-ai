---
title: REA：让智能体读懂已发布的软件
description: REA 是跑在本机的 CLI 与 MCP 服务器，把 Hopper、Ghidra、IDA、JADX 和浏览器检查收进给智能体用的工具。本页先讲怎么装、怎么走完一次分析、常见场景怎么查，再讲它的证据分级、重建义务闭包、分层架构和边界。
domain: product
tags:
  - reverse-engineering
  - mcp
  - static-analysis
  - evidence
role: deep-dive
source_revision: 70611713e140a86201cdef659181012cbdd17f4d
---

# REA：让智能体读懂已发布的软件

> **一句话：** REA 是一套装在你自己机器上的 CLI 和 MCP 服务器。它把 Hopper、Ghidra、IDA、JADX 和浏览器检查收成智能体会调用的工具，
> 并且给每条结论附上**它凭什么这么说**——一段伪代码、一次抓包，或者一句明确的「这里我没覆盖到」。
>
> **本页分两半。** 第 1–6 节回答「我该不该用、怎么用、用来干什么」；第 7–12 节回答「它凭什么敢下结论、
> 怎么组织这些能力、又是怎么拒绝下结论的」。只关心上手，读到第 6 节就够了。
>
> 源码核对基于 [`morluto/rea`](https://github.com/morluto/rea) 的提交
> [`70611713e`](https://github.com/morluto/rea/tree/70611713e140a86201cdef659181012cbdd17f4d)（npm 包 `rea-agents` 6.4.0）。
> 提交之后的变化不在本页范围内。**已验证事实 / 推断 / 未知**的分层见第 11 节。

---

## 一、三十秒版：它是什么

装完之后，REA 同时是三样东西，但只有一套底层：

| 形态 | 入口 | 谁在用 |
|---|---|---|
| MCP 服务器 | `rea --mcp`（stdio） | 你的智能体 |
| CLI | `rea <命令>` | 你的终端 |
| 智能体技能 | `npx rea-agents setup` 一并装上的 skill | 约束智能体怎么提问、怎么用证据 |

三者共用同一批工作流函数：CLI 和 MCP 都汇进 `src/application/`，不是各写一套。
所以同一次分析，终端和智能体走的是同一段代码。两个入口仍然各有各的规则——暴露出来的命令面不同，
MCP 侧还额外受协议的传输预算约束（第 10 节）。

上手只需要两件事：

```bash
# 1. 装：注册到你的智能体，并写入配套的工作流说明
npx rea-agents setup

# 2. 问：换成你自己的目标应用
#    "搞清楚 <某个应用> 的搜索是怎么实现的，给我看证据，然后在我的项目里做一个类似的。"
```

## 二、它解决什么问题

问题是两个，一个关于**能不能看见**，一个关于**敢不敢信**。

**看得见：源码给你，发布物不给你。** 智能体可以读你给的仓库，但下面这些东西没有源码：

| 你手上有什么 | 直接读源码 | 只能读发布物 |
|---|---|---|
| 自己的项目 | 可以 | |
| 开源库 | 可以 | |
| Electron 应用 | | 只能读打包后的 JS 与 asar |
| 闭源桌面 / 移动应用 | | 只能读二进制 |
| 你想复刻的某个竞品功能 | | 只能读它的安装包 |

**不敢信：结论听起来对，但你没法回查。** 大模型说「它的搜索是先用 SQLite 建索引再回表」——这句话可能是对的，也可能是它顺着你说的。
没有出处，你就只能选择信或不信。REA 的做法是逼每条结论带上 `locations`（在哪看到的）、`limitations`（这次没覆盖到什么），
以及**置信度**（`confidence`：看到的 / 推出来的 / 推断的）和**权威性**（`authority`：谁认证的）两个不能互相替代的标签（第 7 节）。

这两件事都不容易：前者需要真的把引擎接进来，后者要求工具在拿不到证据时闭嘴。

### 不解决什么

- **它不替你决定重建什么。** REA 负责把「你声称重建了什么」变成一份可判定的义务清单（第 9 节）；划不划范围是你的判断。
- **它不恢复原始源码。** 反编译产出的是伪代码与汇编。变量名、注释、原始目录结构在编译时就已经不在了。
- **它不保证反编译正确。** 有基准研究在 130 个真实程序、23,400 个函数上比较了 6 个工业级反编译器与 6 种大模型方案：
  大模型方案在**可读性**上更好，**功能正确性却低了 52.2%**
  （[DecompileBench, arXiv:2505.11340](https://arxiv.org/abs/2505.11340)）。「更好读」和「更对」是两件事。
- **它不保证结论正确。** 它做的是：结论可回查，**并且在它察觉到的盲区上显式输出限制说明**，而不是隐蔽推测。
  这不等于「它漏掉的地方都会说明」——静态分析面对动态或混淆表达式时只能给出通用措辞的 limitation，
  它无法证明自己漏掉的是什么。
  顺带一提，模型**自报**的置信度也不等于正确率——Anthropic 自己的大规模校准研究
  （[arXiv:2207.05221](https://arxiv.org/abs/2207.05221)）标题里的那个「Mostly」是认真的：
  论文只报告说「较大的模型在多项选择与判断题上校准良好」，并没有说模型普遍知道自己不知道。


## 三、适合谁

- 要在动手复刻之前，先弄清某个**已发布功能**到底怎么实现的前端工程师；
- 需要结论能追到**一行伪代码、一次真实抓包或一个具体文件偏移**，而不是靠模型说「大概是这样」的人；
- 愿意在本地装一个逆向引擎，并接受「你本机装的那个引擎不在 REA 的信任范围内」这件事。

## 四、怎么装起来

### 4.1 前置条件

| 项 | 要求 |
|---|---|
| Node.js | `^22.19.0 \|\| ^24.11.0 \|\| >=26.0.0`，并带 npm |
| 深度原生分析（可选） | Hopper、Ghidra 或 IDA **三选一**，你自己安装并合法授权 |
| 静态 JS / .NET 检视（可选） | 无额外依赖 |

装 Hopper / Ghidra / IDA 不是必选项。不装引擎，JavaScript 与 .NET 的静态检视照样能跑。

三个引擎的授权方式差别很大，选之前值得看一眼：

| 引擎 | 许可 / 成本 | 官方页面的主机要求 |
|---|---|---|
| Ghidra | Apache License 2.0，免费开源，由 NSA Research Directorate 开发 | 见官方仓库与发布说明 |
| Hopper | 商业产品，提供试用 | 官方页面标注 **macOS 12.4 或更高** |
| IDA Pro | Hex-Rays 商业产品；官方写明**只有 IDA Pro 允许商业用途**，另有 Home / Free 等档位 | Windows / Linux / macOS 均列出 |

**在 Windows 上做原生分析，先考虑 Ghidra 或 IDA**：Hopper 官方页面的主机要求是 macOS。

### 4.2 两种安装方式

**临时用（不装到全局）**——适合先试一次：

```bash
npx rea-agents setup
```

**长期用（推荐）**——装一个 `rea` 命令，之后每条命令都能直接敲 `rea`：

```bash
npm install --global rea-agents
rea setup
```

本页后面统一写 `npx -y rea-agents@6.4.0 <命令>`，是为了让你能一字不差地复现第 5 节的实测。
**如果你全局装了，把前缀换成 `rea` 即可，语义完全一样。**

`setup` 会：选智能体 → 展示将要做的改动 → 等你批准 → 注册 MCP 服务器、写入配套 skill，并**备份你原有的配置**。批准之后**重启你的智能体**。

不想交互式跑，可以先看计划：

```bash
rea setup --dry-run
```

常用开关（`rea setup --help` 有完整列表）：

| 开关 | 作用 |
|---|---|
| `--all-detected` | 配置所有检测到的受支持智能体 |
| `--client <ID>` | 指定一个智能体，可重复 |
| `--install-hopper` | 连 Hopper 一起装（需配合 `--yes`） |
| `--dry-run` | 只打印将要执行的改动，不落盘 |
| `--accessible` | 改用顺序式无障碍提示 |

### 4.3 支持哪些智能体

`setup` 认得这 23 个客户端：

Claude Code、Claude Desktop、Codex、Cursor、Gemini CLI、Windsurf、Devin、OpenCode、Antigravity、
GitHub Copilot CLI、Command Code、Qwen Code、Kimi Code、VS Code、Grok Build、OMP、Pi、Hermes、
Qoder、Factory Droid、Trae、ZCode、DeepSeek Harness。

注意两件事是分开的：**注册 MCP 服务器**（`--client`）和**安装配套 skill**（`--skill-client`）是两个独立步骤。
所有列出的客户端都能注册本地 stdio MCP 服务器；skill 只对支持自定义文件目录 skill 的客户端有意义，
其余客户端拿到 MCP 服务器但没有 skill——那时工具照样能用，只是少了那套工作流说明。

Grok Bot 走手工托管连接器，不在 `setup` 里。其余客户端可以按 [MCP 注册](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/installation.md#mcp-registry) 手工接入——任何支持本地 stdio MCP 服务器的客户端都可以用。

### 4.4 日常维护

```bash
# 更新
rea update                    # 更新全局安装本身
npx rea-agents@latest setup   # 刷新智能体注册与 skill

# 卸载（只删 REA 自己写的配置）
rea uninstall
```

`rea update` 之后，README 建议**再跑一次它打印出来的 setup 命令**刷新智能体侧，然后重启智能体。

## 五、走完一次最小任务

本节全部命令和输出都是**在 2026-10-14 用 `rea-agents` 6.4.0 实测的**（Windows x64、Node v24.16.0）。
输出里的路径已被替换成占位符，其余是原样摘录。

### 5.1 先确认环境

```bash
npx -y rea-agents@6.4.0 doctor
```

它会逐项列出 Node、宿主、以及每个引擎和每个客户端注册的状态。实测输出（节选）：

```text
healthy: false
environment_healthy: false
scope:
  mode: audit-wide
  clients: []
  providers: []
  skill: false
  target: null
scope_checks[20]:
  - name: node
    ok: true
    classification: healthy
    detail: 24.16.0
  - name: host
    ok: true
    classification: healthy
    detail: win32 x64
  - name: hopper
    ok: false
    classification: missing_analysis_engine
    remediation: "Run rea setup to install Hopper, or set HOPPER_LAUNCHER_PATH."
  - name: ghidra
    ok: false
    classification: missing_analysis_engine
    detail: GHIDRA_INSTALL_DIR is not set
    remediation: Set GHIDRA_INSTALL_DIR to an extracted Ghidra 12.1.x release directory.
  - name: "registration:claude_code"
    ok: false
    classification: config_drift
    detail: "<你的用户目录>/.claude.json"
    remediation: "Run rea setup to refresh this registration, then restart the client."
```

`healthy: false` 在这里是**正常且正确**的：你还没装引擎、也还没跑过 setup。
每一条 `false` 都带着 `classification` 和一句 `remediation`——它告诉你缺什么、怎么补，而不是笼统地报一个失败。
想针对某一项诊断：

```bash
rea doctor --provider ghidra --json
rea doctor --client claude_code
```

### 5.2 分析一个 JavaScript 应用

这是**零引擎依赖**的一条路：只需要 Node.js 和 npm。为了让你有个能立刻跑的目标，先造一个三文件的小应用。

在终端里建目录。**Windows PowerShell 请用下面 PowerShell 那一行**——`mkdir` 在 PowerShell 里是 `New-Item` 的别名，
传 `-p` 会直接报 `A parameter cannot be found that matches parameter name 'p'`：

```powershell
# PowerShell（Windows）
New-Item -ItemType Directory -Force notes-app\src
```

```bash
# Bash / macOS / Linux / Git Bash
mkdir -p notes-app/src
```

然后建三个文件，内容如下（`notes-app/package.json`）：

```json
{ "name": "notes-app", "version": "1.0.0", "main": "src/index.js" }
```

`notes-app/src/index.js`：

```js
import { search } from "./search.js";

export function start() {
  return search("hello");
}
```

`notes-app/src/search.js`：

```js
export function search(query) {
  return query.trim();
}
```

然后对它跑分析。注意参数要的是 **`notes-app` 这个目录本身**，不是它的父目录：

```bash
# Linux / macOS
npx -y rea-agents@6.4.0 analyze-javascript-application "/绝对路径/notes-app" --json

# Windows PowerShell
npx -y rea-agents@6.4.0 analyze-javascript-application "D:\绝对路径\notes-app" --json
```

填成父目录**不会报错**。实测把参数指向 `notes-app` 的上一级，REA 照常返回一条 Evidence——
它只是从你给的位置开始向下扫描，于是兄弟目录的内容也混进了结果。
所以这里错了不会失败，只会让结果变杂：宁可多看一眼路径对不对。

**它先吐 16 行 NDJSON 进度，再吐一行结果 JSON。** 进度行长这样：

```json
{"rea_progress":{"phase":"analyze_javascript_application","completed":0,"total":1,"message":"Inventorying and parsing application artifacts","sequence":1}}
{"rea_progress":{"phase":"parse_javascript_source","completed":0,"total":1,"message":"Parsing and projecting package.json (1/3)","sequence":4}}
{"rea_progress":{"phase":"parse_javascript_source","completed":0,"total":1,"message":"Parsing and projecting src/index.js (2/3)","sequence":5}}
{"rea_progress":{"phase":"parse_javascript_source","completed":0,"total":1,"message":"Parsing and projecting src/search.js (3/3)","sequence":6}}
{"rea_progress":{"phase":"seal_javascript_semantic_graph","completed":0,"total":1,"message":"Validating and sealing the semantic graph","sequence":10}}
```

最后一行是一条 **Evidence 对象**，实测约 81 KB。它最外层的字段是：

```json
{
  "evidence_id": "ev_c53f7b00120ae199aa464a7e1b2a802424e8fe0125cc2bf02e833a1b97639dfe",
  "subject": { "format": "directory", "digest": { "sha256": "68a30cce…" } },
  "provider": { "id": "rea-javascript-application", "name": "REA JavaScript application analyzer", "version": "1" },
  "predicate_type": "rea.javascript-application-analysis",
  "operation": "analyze_javascript_application",
  "parameters": { "format": "auto", "integrity_policy": "fail" },
  "confidence": "derived",
  "authority": "shipped-artifact",
  "limitations": [ "…见下…" ],
  "locations": [ { "kind": "artifact-path", "path": "artifact-root" } ],
  "normalized_result": { "input_path": "…", "summary": { "…": "…" }, "statistics": { "…": "…" }, "graph": { "…": "…" }, "semantic_graph": { "…": "…" } }
}
```

`normalized_result.statistics` 告诉你它到底做了什么，而不是让你猜：

```json
{
  "relevant_files": 3,
  "parsed_javascript_files": 2,
  "text_bytes_read": 224,
  "visited_ast_nodes": 27,
  "findings": 4,
  "modules": 0,
  "parse_failures": 0
}
```

这些数字对应的是上面那个三文件小应用。换成真正的 Electron 安装包，`relevant_files` 会大几个数量级，
`modules` 也会不再是 0。`parse_failures: 0` 是值得单独看一眼的字段——它告诉你这次解析没有一个文件失败。

### 5.3 先读这五条限制

这是这次运行的 `limitations`，**逐字摘录，未改写**：

1. CommonJS and ESM binding relationships were recovered from inert syntax and resolved only within the inventoried artifact container.
2. JavaScript and HTML were parsed as inert text; bundle bootstrap code was never executed.
3. Static imports, entrypoints, workers, endpoints, and storage relationships do not prove runtime execution.
4. Static paths and relationships may remain unresolved when expressions are dynamic or obfuscated.
5. Webpack/Rspack factories were recovered from AST literals; REA did not invoke push handlers or bundle bootstrap code.

对照第 2、3 条和 `confidence: "derived"` 你就能读懂这条结果的边界：
**它说清了「模块之间看起来怎么连」，没有说「运行时确实怎么走」。**
这句话不是免责声明，是这条 Evidence 的组成部分——它和结论一起被返回、被存储、被引用。

### 5.4 换成让智能体去问

装完之后，同一件事用自然语言交给智能体即可。注意**把路径写进提问里**——这些工具都从本地文件读起，
不给出目标位置，智能体无从下手：

```text
Understand how search works in the app at /absolute/path/to/notes-app, show me the
evidence, and build a similar feature for my project.
```

随 skill 一起装下去的工作流说明会约束智能体：拿不到证据时要说明，而不是把推测说成事实。
没装 skill 也能用，只是少了这层约束（第 4.3 节）。

## 六、常见场景与具体做法

下表的命令名与说明摘自 `rea --help`（6.4.0 实测）。“需要什么”一列决定了你是否必须先装引擎。

| 目标 | 命令 | 需要什么 | 返回什么 |
|---|---|---|---|
| JavaScript / Electron 应用 | `analyze-javascript-application` | Node.js 和 npm | 模块、import、Electron 边界及其证据 |
| Electron 单页 | `inspect-electron-page` | 目标应用在跑 | 该页面的静态结构 |
| 页面 bundle | `analyze-web-bundle` | Chrome 系浏览器 | 抓到的脚本与静态分析结果 |
| 网站某页 | `inspect-web-page` | Chrome 系浏览器 | 页面结构、脚本、网络观测 |
| 录好的网络抓包 | `inspect-web-network-capture` | HAR 或 Fiddler SAZ | 请求、响应、暴露的载荷及其来源位置 |
| .NET 程序集 | `inspect-managed-artifact` | 无（纯静态） | PE/CLI 身份、声明的原生依赖 |
| APK | `inspect-android-package` | Headless JADX 与完整 JDK | 声明、解码后的 manifest（不执行） |
| Mach-O / Swift | `inspect-macho`、`demangle-swift` | 无（不启动 Hopper） | 段布局、Swift 符号还原 |
| 二进制文件布局 | `inspect-binary-layout` | 无（不执行目标） | 段、重定位、原始符号 |
| Linux 崩溃转储 | `inspect-recorded-crash` | 自备 pwntools | 各线程寄存器、信号、可选映射候选 |
| 固件 | `inspect-firmware-regions` | Linux 上的 Binwalk / Unblob | 区域与提取候选（不提取） |
| 原生二进制 | `decompile`、`function`、`xrefs` | Hopper / Ghidra / IDA | 伪代码、汇编、调用与引用 |
| 重建义务台账 | `build-reconstruction-obligation-ledger` | 无 | 一份确定性的、可判定的义务清单（怎么判定见第 9 节） |

`rea --help` 的 `Commands:` 段落列出 **127** 个命令；[`src/cliCommandNames.ts`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/cliCommandNames.ts)
定义 **142** 个规范命令名。142 − 127 = 15，差的正是 15 个不在顶层帮助里露出的低层命令
（`inspect-sqlite-database`、`inspect-packet-capture`、`inspect-go-binary`、`identify-flutter-build` 等）。

### 动手前先看副作用

运行态工具（跑进程、点页面、抓流量）会以**你的用户权限**执行动作。REA 把这件事做成了机器可读的：
每个工具都自带一份副作用声明。

```bash
rea capabilities --json
```

实测输出里的每一条工具声明都带这几个字段：

```json
{ "name": "uninstall_adb_package", "surface": "adb-provider",
  "effects": { "mutatesTarget": true, "mutatesSession": true, "writesFilesystem": false,
               "launchesProcess": true, "accessesNetwork": true, "changesUiState": false,
               "mayDiscardData": false, "idempotent": false },
  "annotations": { "read_only": false, "destructive": false, "idempotent": false, "open_world": true } }
```

同一份输出里还有 `protocol_features`（本版本声明支持 `progress` 与 `cancellation`）。

**但请把它当成一份声明，不当成一份保证。** MCP 规范在「安全与信任」一节里明确写着：

> descriptions of tool behavior such as annotations should be considered **untrusted**, unless obtained from a trusted server.

也就是说：工具自报「我不会写文件」这句话，本身就是要被核对的东西，不是免检的凭据。
REA 自己也是「以你的用户权限运行的本地 MCP 服务器」——规范把这一类明确列为需要沙箱与授权确认的高风险形态。
把它交给别人用之前，先跑一次 `capabilities` 读一遍，再对真正要放行的那几个工具单独确认。


---

## 七、核心机制一：每条结论都带两个标签

REA 的世界里最重要的名词是 **Evidence**。上面那次分析返回的就是一条 Evidence。
除了结果本身，每条还带两个**互相不能替代**的标签：

| 字段 | 取值 | 回答的问题 |
|---|---|---|
| `confidence` | `observed` / `derived` / `inferred` | 这条结论是**看到的**、**推出来的**，还是**推断的**？ |
| `authority` | `shipped-artifact` / `controlled-replay` / `historical-reference` / `external-service` / `analyst-inference` | **谁**认证了它？ |

再加上 `locations`（在哪看到）、`limitations`（没覆盖到什么）、`relationship_coverage`（关系覆盖度）。
你上面那条结果的组合是 `confidence: "derived"` + `authority: "shipped-artifact"`：
**模块关系是从出货产物推导出来的，不是运行时观测到的。**

与之配套的一条原则写在 REA 自己的
[`docs/tool-design.md`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/tool-design.md)：

> **Missing coverage is unknown, not absence.**

这句话决定了 REA 面对「我查不到」时的行为：它不会说「没有这个东西」，它会说「我没覆盖到，原因是 X」。
第 5.3 节那五条限制就是这条原则的产物。


## 八、架构：一次调查到底发生了什么

<ReaDiagram src="/diagrams/rea-evidence-flow.svg" alt="一次 REA 调查从提问到闭包的完整数据流：智能体提问、应用层选定唯一提供方、REA 在私有临时根目录生成令牌与套接字并启动自有进程组、外部引擎加载桥接代码并做令牌校验、桥接代码调用引擎 API 取原始结果、结果被包装成带置信度与权威性的证据记录、静态应用图派生候选义务、闭包求值判定每条义务，最后带着证据与未知项回到智能体。分析全程在本地完成，未知是一等值而不是错误。" />

**编号即执行顺序**，每一步落地产出的东西写在箭头上。有三步值得停下来看：

**REA 启动的是自己拥有的进程组。** 它在私有临时根目录里生成 32 字节随机令牌和一条私有套接字路径，
把启动脚本写进磁盘并设成 `0600`，然后 spawn 之后**校验属主 PID**——你没法伪装成那个进程。
Windows 上这层落到 `native/windows/src/process.cc` 这个 Node-API（`napi_*`）插件里，
它 `CreateJobObjectW` 后设上 `JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE`，
保证「即使属主被 SIGKILL，进程也一定死」。

**桥接代码的请求体只允许四个键。** Hopper 那条桥的解析逻辑是：不是恰好 `{id, token, method, params}`
就直接抛 `Invalid bridge request shape`。令牌用 `hmac.compare_digest` 比；校验失败时返回的文案被刻意抹成
固定字符串 `"Invalid bridge capability"`，令牌不会泄进错误信息。
传输在 `src/ghidra/GhidraTransport.ts` 里被定义成两种：`"unix-socket"` 与 `"authenticated-loopback-tcp"`，
后者绑定 `127.0.0.1`——Windows 上的 Ghidra 走的就是这一条。

**缺失的覆盖度是 unknown，不是 absence。** 第 7 节讲过。这里只需要记住它落在数据流上的位置：
未知项和证据一起回到智能体，而不是被丢掉。

### 分层结构与依赖方向

<ReaDiagram src="/diagrams/rea-architecture.svg" alt="REA 的分层结构与依赖方向：入口层包含一次性 CLI 与 MCP stdio 服务器；应用层承载两者共用的工作流、二进制会话路由与调查记录；提供方层是 Hopper、Ghidra、IDA、浏览器、.NET、Android、固件、WASM、EVM 等适配器，共同底座是拥有进程组、私有临时根目录与期限约束的 src/process；最底层是纯粹无副作用的领域层。右侧贯穿 src/contracts 契约层，底部单列桥接事实：真正的反编译逻辑在 bridge/hopper_bridge.py 与 bridge/ghidra/ReaGhidraBridge.java 里。" />

> **图的依据：** 依赖方向来自仓库自带的
> [`docs/architecture.mermaid`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/docs/architecture.mermaid)（156 行）；
> 令牌与进程组的行为约束来自 `src/process/` 及其单元测试。

四层，箭头只向下：

1. **入口层** — `src/cli` 与 `src/main` + `src/server`。真正的进程入口是 `scripts/rea.mjs`（121 行手写 `.mjs`，不经编译）：
   它把 `REA_PACKAGE_VERSION` 注入环境变量、修掉 Windows 空 `USERPROFILE` 和 Termux 的浏览器缓存路径，然后做一次分派。
2. **应用层** — `src/application/`。CLI 与 MCP 调的是同一批函数，所以两条路径的行为天然一致。
   `src/cli.ts` 按顺序调用 **35 组 `register*Commands`**；`src/server/createServer.ts` 导入 **37 个 `register*.js` 模块**
   （36 个工具注册 + 1 个 prompts）。
3. **提供方层** — 每个引擎一个适配器，外加共享的 `src/process/` 底座。
4. **领域层** — `src/domain/`，纯粹、无副作用。

中间还有一层薄薄的 `src/composition/`：**29 个文件、总共 666 行**，最大的一个不到 30 行，全是「造一个已绑定依赖的工厂函数」。

### 两条反直觉的事实

**第一，领域层是最大的层，不是适配器层。** 下表是**非测试** TypeScript 源码（`find src/<层> -name '*.ts' -not -name '*.test.ts'`，按该提交实测）：

| 层 | 文件数 | 行数 |
|---|---:|---:|
| `src/domain/` | 390 | 84,574 |
| `src/application/` | 239 | 45,208 |
| `src/browser/` | 92 | 19,501 |
| `src/artifacts/` | 45 | 11,702 |
| `src/native/` | 45 | 11,306 |
| `src/ghidra/` | 42 | 10,324 |
| `src/process/` | 41 | 8,919 |
| `src/contracts/` | 70 | 9,825 |
| `src/composition/` | 29 | 666 |

你可能会以为「一堆引擎适配器」才是主体。实际相反：六成的代码在纯函数里。
`src/domain/javascript/` 一个子树就有 182 个文件。

**第二，这个分层不是靠自觉，是被 lint 卡住的。**
[`scripts/lib/module-boundaries.mjs`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/scripts/lib/module-boundaries.mjs)（135 行）里写着：

```js
const PURE_LAYERS = new Set(["domain", "contracts"])
```

`npm run lint` 会跑 `verify:module-boundaries`，用 `@babel/parser` 做 AST 扫描：
**任何引擎协议或提供方专有代码出现在 `domain` / `contracts` 里都直接失败。**

**领域层不碰文件系统与进程，是这套设计里最值钱的一条。** 同一份闭包判定因此在 CLI、MCP 和单元测试里
给出同一个答案——不需要为了测它而起一个真引擎。

### 一个容易误解的点：`bridge/` 不是「一个桥」

`bridge/` 目录里有 30 个文件，横跨**三种语言**（Java、Python、Swift），
接的是七种不同的第三方运行时，而且**全部是调用方自备（BYO）**：

| 桥接文件 | 接进谁 |
|---|---|
| `bridge/hopper_bridge.py` | Hopper 内嵌的 CPython，跑在 Hopper 自己的 Python 线程上 |
| `bridge/ghidra/ReaGhidraBridge.java` | Ghidra headless 分析器，打包成 HeadlessScript |
| `bridge/android/ReaJadxBridge.java` | `jadx-headless-mcp` 的 JAR |
| `bridge/mitmproxy/capture.py` | `mitmproxy` 的 addon |
| `bridge/native/rea_lldb_tracer.py` | `lldb --batch` 的内嵌 Python |
| `bridge/nativeaot/*.java` | `ghidra-nativeaot` 的上游类，反射加载 |
| `bridge/process/*.swift` | 进程组令牌读取的原生实现 |

每一个桥的头部文档都写着同一句话的变体：**上游引擎保持未修改**。
REA 自己的代码是边界与权威层，不是分析引擎的分叉。

这带来一个必须讲明的后果：**本机被篡改的 Hopper / Ghidra 安装就在 REA 的信任边界之内**。
REA 的缓解手段是自己只发 `bridge/` 下的文件并校验打包产物，但它无法校验你本机装的那个引擎。


## 九、核心机制二：重建义务闭包

这是 REA 的第二套核心机制，也是本页交互式组件要展开的部分。

### 问题从哪来

你让智能体「照着 Notes 的搜索功能做一个」，它写完了。**你怎么知道它重建的东西和原来一样？**

REA 的答案是：不靠感觉，先逼出一份**清单**。
`build-reconstruction-obligation-ledger` 把已认证的证据变成一份确定性的「重建义务」列表，每条义务是一句可以被判真假的话：

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

一条 required 义务要变成 `verified`，必须**一条 diagnostic 都没有**——不是「重要条件都满足了」。
下面是最常命中的几条（完整 22 个 diagnostic code 见
[`reconstructionObligationLedgerSchemas.ts`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/src/domain/reconstructionObligationLedgerSchemas.ts)）：

| 条件 | 不满足时的 diagnostic code |
|---|---|
| 恰好一个 manifest binding 认领它 | `missing-owner` / `ambiguous-owner` |
| `requires_parser_type` 为真时提供 parser + schema + domain type | `missing-parser-type` |
| 每一种 `required_case_kinds` 都有 fixture | `missing-case` |
| fixture 的权威性达标且 Evidence 可认证 | `weak-fixture-authority` |
| verifier 绑定且枚举了这条义务，结果 Evidence 在 bundle 里，状态 `pass` | `missing-verifier` / `verifier-does-not-enumerate` / `missing-verifier-result` / `verifier-failed` |
| 原始行为有被观测到的权威性刻画 | `static-only` |
| 没有残留未知、没有不可用权威性、没有重复定义、没有矛盾 | `residual-unknown` / `unavailable-authority` / `duplicate-definition` / `contradiction` |

状态判定严格按 `if` 短路顺序走：

```text
out-of-scope → blocked → contradicted → unknown → unowned → verified → implemented
```

再往上一层，义务之间可以声明依赖。依赖判定是一个**有界不动点**：反复迭代，每轮把「依赖不存在」或
「依赖未验证」的义务降级为 `blocked`，直到某一轮状态不再变化。最多跑「义务总数」轮。
台账级判定是 `failed`（有 required 义务矛盾或 verifier 失败）→ `unknown`（有 limitations）→
`unknown`（有 required 义务为 unknown）→ `ready`（required 义务全部 verified）→ `open`。

### 动手改一改

下面两个组件是上面这套规则的忠实移植。关掉某个条件，对应的 diagnostic 立刻出现在同一条义务上；
改变一条义务的状态，它的依赖者会在同一轮迭代里被改写。

<ReaClosureLedger />

<ReaAuthorityLattice />

### 这套设计解决了什么

它把一个通常靠人自觉的问题——「我是不是真的重建对了」——变成了**一份机器可判定的清单**。
你不能靠说「我觉得应该对了」通过，必须给出一条能被认证的 verifier 结果，而且这个 verifier 的权威性
还得配得上这条义务的要求（第二张矩阵讲的就是这个）。

它同时给了失败一个体面的位置：`blocked` 和 `out-of-scope` 都是合法的终态，**但都不算已验证**，
而不是把没做完的那条从清单里悄悄划掉。

需要留一句边界：这是一套**判定机制**，不是效果的证明。本次没有找到评估「给智能体加一份可判定的义务清单
是否真的提升重建正确率」的对照研究（第 12 节）。上面说的都是这套规则本身如何运作，不是它已经被证明更准。


## 十、它在哪里拒绝下结论

这一节比功能列表更能说明一个工具是否可靠。

1. **依赖缺失不是回退，是显式不可用。** 提供方注册表的设计是「排序后的深候选，确定性选择，不回退」。
   选不到就报不可用，不会悄悄降级到弱一点的分析器然后假装结果一样。
2. **传输预算是硬边界。** REA 按 MCP 标准输入输出客户端的 10 MiB 接收缓冲预算准备结果
   （`src/config/mcpResponseBudget.ts` 里的 `MINIMUM_RESPONSE_BYTES`）；装不下就返回
   `resource_constraint` 并标 `details.resource: "transport"`，而不是截断。
3. **时间与取消是一等契约。** 引擎启动有期限，可用 `REA_GHIDRA_STARTUP_TIMEOUT_MS` /
   `REA_HOPPER_STARTUP_TIMEOUT_MS` 调。取消会返回 `exit 130` 和 `{"code":"cancelled"}`，
   **同时保留已观测到的部分结果**——中断不等于丢弃。
4. **崩溃不等于分析失败。** 源码区分了「运行时坏了」和「分析失败」两种诊断，并有测试专门断言版本偏移在恢复后被检出。
5. **Windows 上的 Ghidra 是 P0 实验态。** 它只承认 25 个只读操作，**明确拒绝数据库变更与元数据恢复**。
6. **引擎崩溃了，不能算干净收尾。** Hopper 那条桥的 `should_stop` 条件要求：结果本身必须证明文档已关闭或已保留，
   分析已停止，才停循环。连接断开不算数。
7. **许可不随工具转移。** IDA / Hopper / JEB 各自需要你合法取得并授权使用。REA 授予不了任何工具许可、密钥或激活权益。

### 使用边界

项目自己的 [`DISCLAIMER.md`](https://github.com/morluto/rea/blob/70611713e140a86201cdef659181012cbdd17f4d/DISCLAIMER.md)
把用途限定为合法研究、教育、互操作、软件保全，以及分析你拥有或被授权检查的软件；
并明确不支持规避 DRM / 授权校验 / 反作弊、不做外挂、不绕过未授权的访问控制。

**合法性不由工具决定。** 同一个行为在不同法域、不同许可条款下的答案并不一样：

- 美国：[17 U.S.C. §1201(a)(1)(A)](https://www.law.cornell.edu/uscode/text/17/1201) 禁止规避「有效控制受版权保护作品访问」的技术措施；
  但 §1201(f) 为**互操作**留了例外——允许为识别和分析互操作所必需的程序元素而规避，也允许为此类目的制作工具。
  这是有条件的例外，不是通行证。
- 欧盟：软件指令 [2009/24/EC 第 6 条](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0024)
  允许反编译，但设了四个条件：由合法持有人进行、所需信息尚未「现成可得」、只限于互操作所必需的部分、
  且取得的信息不得用于无关目的（例如开发竞品）。
- 被分析软件自身的许可条款，仍然可以单方面禁止逆向。

结论：**先确认你所在法域与该软件许可条款允许，再动手。** REA 无法替你判断这一点。


## 十一、事实分层

### 已验证（逐条对照源码链接或本次实测读过）

- npm 包名 `rea-agents`，6.4.0；`bin` 为 `rea` 与 `rea-agents`，都指向 `scripts/rea.mjs`（121 行）。
- Node 要求 `^22.19.0 || ^24.11.0 || >=26.0.0`；MIT 许可；`mcpName` 为 `io.github.morluto/rea`。
- **这个包没有 `main` / `types` / `exports` 字段**——它只作为可执行文件与 MCP 服务器被消费，不作为库。
- `rea --help` 的 `Commands:` 段落列出 127 个命令；`src/cliCommandNames.ts` 定义 142 个规范命令名；差 15 个低层命令。
- `src/cli.ts` 调用 35 组 `register*Commands`；`src/server/createServer.ts` 导入 37 个 `register*.js` 模块。
- 四层依赖方向；`bridge/` 的 30 个文件横跨 Java / Python / Swift 三种语言、接七种 BYO 运行时。
- Hopper 桥的四键请求体与恒定时间令牌比较（`hmac.compare_digest`）；令牌为 `randomBytes(32)`；快照文件 `0o600`。
- 22 个 diagnostic code、8 个 obligation status 及其 `if` 短路顺序、依赖不动点上限为义务总数。
- 权威性接受表**不是全序**（`unit` 接受 `native-abi`，反向不接受）。
- 证据的 `confidence` 三值与 `authority` 五值；Evidence 最外层字段如第 5.2 节实测所示。
- 「Missing coverage is unknown, not absence.」出自 `docs/tool-design.md` 第 55 行。
- 分层由 `npm run lint` 的 AST 扫描强制：`PURE_LAYERS = {domain, contracts}` 里出现引擎协议代码即失败。
- 10 MiB 传输预算、SIGINT → `exit 130` + 保留部分观测。
- Windows Ghidra P0 只承认 25 个只读操作。
- 测试规模约 1094 个 `.test.ts`，`retry: 0`，Vitest 多项目分 12 条 lane。
- tsconfig 是最大严格度：`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`verbatimModuleSyntax` 全开——
  这也是每个相对 import 都带 `.js` 后缀的原因。
- 自带 skill 的负面路由规则（完整源码仓库用常规仓库工具，不跑 REA）。
- `setup` 支持 23 个客户端；`doctor` 对每个引擎与注册给出 `classification` + `remediation`。
- 本节第 5 节的命令与输出为 2026-10-14 在 win32 x64 / Node v24.16.0 上的实测。

### 推断（从代码合理推出，但源码没直说）

- 「为什么它不内置 Hopper」——许可证与信任边界是合理解释，但仓库里没有一份 ADR 明确这么写。
- 闭包机制与成熟的形式化验证实践同源（义务 → 验证器 → 证据），但仓库里没有把它和任何具体方法论对齐的声明。

### 未知（本次没有能力确定）

- `experiments/analysis-efficiency/` 里那组效率实验的设计意图与可推广性；它自己的 README 已声明
  「不构成统计意义上的加速」。
- 本机五个 git submodule 在该提交下全部未检出，因此 NativeAOT 那条路径无法在本地编译验证。
- 它在真实世界项目上的**长期**可靠性。本页能告诉你它的自我约束有多严，
  但不能替你判断它在你手上的项目里会不会好用。


## 十二、延伸阅读

下面的外部材料用于说明 REA 所处的技术环境，不用于证明 REA 自身的任何行为。
每条都给了**可回查的 URL、信源层级与日期**；完整的检索日志见
[`research/rea-further-reading.md`](https://github.com/zenheart/learn-ai/blob/master/research/rea-further-reading.md)，
其中逐条记录了检索式与实际打开的页面。

信源层级：**L0** 规范 / 一手标准文本；**L1** 厂商或项目官方文档；**L2** 同行评审论文或预印本；
**L3** 已知作者的二手分析；**L4** 论坛、社交或聚合站（不作为事实依据）。

下面每条都**实际打开过**，并标了层级与日期。`层级` 按 **L0** 规范/一手标准文本 · **L1** 厂商或项目官方文档 ·
**L2** 同行评审论文或预印本 · **L3** 已知作者的二手分析 · **L4** 论坛、社交或聚合站（不作为事实依据）划分。
「用在哪」一列把每条反查回本页对应的小节——从结论找来源，或从来源找结论，都只需要看这一列。

### 支持性证据

| 结论 | 来源 | 层级 | 日期 | 用在哪 |
|---|---|---|---|---|
| MCP 当前协议版本是 `2026-07-28`；版本号用 `YYYY-MM-DD`，向后不兼容才递增 | [specification/versioning](https://modelcontextprotocol.io/specification/versioning) | L0 | access:2026-10-14 | 第 4 节、MCP 背景 |
| MCP 明确写了「协议层面无法强制执行这些安全原则」，只对实现方提出 SHOULD | [specification/latest](https://modelcontextprotocol.io/specification/latest) | L0 | access:2026-10-14 | 第 6 节「当成声明而非保证」 |
| 工具行为注解（如 annotations）应当被视为**不可信**，除非来自可信服务器 | [specification/latest](https://modelcontextprotocol.io/specification/latest) | L0 | access:2026-10-14 | 第 6 节 |
| 规范专门列出「Confused Deputy」攻击，并要求代理型服务器实现逐客户端同意 | [security_best_practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) | L0 | access:2026-10-14 | 第 6 节风险面 |
| 「MCP servers MUST NOT accept any tokens that were not explicitly issued for the MCP server」 | [security_best_practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) | L0 | access:2026-10-14 | 第 6 节风险面 |
| 规范把「本地 MCP 服务器」单列为攻击面，并建议用 `stdio` 传输把访问面限制到客户端 | [security_best_practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) | L0 | access:2026-10-14 | 第 6 节 |
| Ghidra 由 NSA Research Directorate 开发，许可为 Apache License 2.0 | [NationalSecurityAgency/ghidra](https://github.com/NationalSecurityAgency/ghidra) | L1 | access:2026-10-14 | 第 4.1 节引擎对照表 |
| Hopper 官方页面把产品定位为 macOS 反汇编器，并标注需要 macOS 12.4 或更高 | [hopperapp.com](https://www.hopperapp.com/) | L1 | access:2026-10-14 | 第 4.1 节引擎对照表 |
| IDA Pro 官方写明只有 IDA Pro 允许商业用途，另有 Home / Free 等档位 | [hex-rays.com/ida-pro](https://hex-rays.com/ida-pro/) | L1 | access:2026-10-14 | 第 4.1 节引擎对照表 |
| Electron 官方文档说 asar 只是让源码不易被随意查看，应用源码通常被打包进 asar | [electronjs.org asar-archives](https://www.electronjs.org/docs/latest/tutorial/asar-archives) | L1 | access:2026-10-14 | 第 2 节「看得见」那张表 |
| 美国 DMCA §1201(a)(1)(A) 禁止规避技术措施；§1201(f) 为互操作留了例外 | [17 U.S.C. §1201](https://www.law.cornell.edu/uscode/text/17/1201) | L0 | access:2026-10-14 | 第 10 节使用边界 |
| 欧盟软件指令 2009/24/EC 第 6 条允许反编译，但设四项限制条件 | [EUR-Lex 32009L0024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0024) | L0 | 2009-04-23（指令文本） | 第 10 节使用边界 |

### 反向证据（这些是给 REA 的设计降温的）

| 结论 | 来源 | 层级 | 日期 | 用在哪 |
|---|---|---|---|---|
| 在 130 个真实程序、23,400 个函数上，大模型反编译方案可读性更好但**功能正确性低 52.2%** | [DecompileBench, arXiv:2505.11340](https://arxiv.org/abs/2505.11340) | L2 | 2025-05-16 提交 | 第 2 节「不解决什么」 |
| 模型自评的置信度并非普遍可靠：论文只报告较大模型在选择/判断题上校准良好，标题中的「Mostly」是限定 | [Language Models (Mostly) Know What They Know, arXiv:2207.05221](https://arxiv.org/abs/2207.05221) | L2 | 2022-07-11 提交 | 第 2 节「不解决什么」 |
| MCP 的安全模型本身仍有未完成的部分：规范同时列出 SSRF、状态句柄劫持、OAuth URL 注入等攻击面 | [security_best_practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) | L0 | access:2026-10-14 | 第 6 节风险面 |
| 本地 MCP 服务器「没有可见性」：用户看不到实际执行了哪些命令 | [security_best_practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) | L0 | access:2026-10-14 | 第 6 节 |

### 关于 MCP 的治理状态

MCP 已经不是单一厂商的私有协议：2025-12-09，Anthropic 将其捐赠给 Linux Foundation 下的
Agentic AI Foundation，该基金会由 Anthropic、Block、OpenAI 共同发起，并有 Google、Microsoft、AWS 等参与；
官方同时说明 **MCP 的维护者结构不变**，技术方向仍由原维护者通过 SEP 流程决定
（[MCP 官方博客](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)，L1，2025-12-09）。
这一点值得记住：**治理中立**解决的是长期归属问题，不解决版本还在演进的问题——
`2026-07-28` 距今不到一年，而 `2025-11-25` 已经是上一版。

### 检索边界（本次没查到的）

- 没有找到**同行评审**的、专门评估「MCP 服务器给结论打置信度与权威性标签」这类设计的对照研究。
  第 7、8 节讲的是 REA 自己的做法与源码约束，本页没有用外部研究为它背书。
- 没有找到关于「给智能体加一份可判定的义务清单是否提升正确率」的对照实验。
  第 9 节的机制来自 REA 源码本身；**它是否真的提升正确率，本次没有证据。**
- 未验证 Ghidra 官方博客关于「反编译可解性」的研究文章：`blog.ghidra.org` 与 `ghidra-sre.org` 在访问时均 301 跳转到 GitHub 仓库，
  因此本页不引用该处内容。


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

两张图各自都在 SVG 文件内部用 `<title>` / `<desc>` 内嵌了完整长描述。
需要说明它怎么起作用：图是以 `<img>` 方式嵌入的，所以**读屏软件拿到的是 `<img>` 上的 `alt` 文本**——
本页图注就是一份 200 字以上的完整描述，不是「一张叫架构图的图片」。
SVG 内部那份 `<title>` / `<desc>` 服务于直接打开 `.svg` 文件、以及站内全文检索的场景；
它在 `<img>` 失效时不会被读屏读到，所以不要把它当成图片加载失败的兜底。
窄屏下图解容器保留接近原始尺寸并允许横向平移，而不是缩成不可读的缩略图。
