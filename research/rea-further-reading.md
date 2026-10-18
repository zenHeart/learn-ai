# REA 产品页 · 外部信源与检索日志

本页对应 `docs/zh/products/rea/index.md` 的[延伸阅读](../docs/zh/products/rea/index.md)一节。
这里保存**完整**的检索记录；产品页只放结论表，不放日志。

- 检索与访问日期：**2026-10-14**（下表所有 `access:` 均指此日）
- 层级定义：**L0** 规范 / 一手标准文本 · **L1** 厂商或项目官方文档 · **L2** 同行评审论文或预印本 ·
  **L3** 已知作者的二手分析 · **L4** 论坛、社交或聚合站（**不作为事实依据**）
- 纪律：**只把实际打开并读到原文的页面记为 VERIFIED。** 搜索结果摘要一律记为 UNVERIFIED-SNIPPET，
  不进入产品页的事实陈述。本日志末尾列出了所有被排除的条目及其原因。

## 一、已验证信源

| # | claim | url | tier | date | status |
|---|---|---|---|---|---|
| 1 | MCP 当前协议版本为 `2026-07-28`；版本号采用 `YYYY-MM-DD`，只在发生向后不兼容变更时递增 | https://modelcontextprotocol.io/specification/versioning | L0 | access:2026-10-14 | VERIFIED |
| 2 | MCP 规定 host / client / server 三层架构，基于 JSON-RPC 2.0；定义 Resources / Prompts / Tools | https://modelcontextprotocol.io/specification/latest | L0 | access:2026-10-14 | VERIFIED |
| 3 | 规范原文：「While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD …」 | https://modelcontextprotocol.io/specification/latest | L0 | access:2026-10-14 | VERIFIED |
| 4 | 规范原文：「descriptions of tool behavior such as annotations should be considered untrusted, unless obtained from a trusted server」 | https://modelcontextprotocol.io/specification/latest | L0 | access:2026-10-14 | VERIFIED |
| 5 | 安全最佳实践列出 Confused Deputy 攻击，要求代理型 MCP 服务器实现逐客户端同意流程 | https://modelcontextprotocol.io/specification/latest/basic/security_best_practices | L0 | access:2026-10-14 | VERIFIED |
| 6 | 安全最佳实践原文：「MCP servers MUST NOT accept any tokens that were not explicitly issued for the MCP server」 | https://modelcontextprotocol.io/specification/latest/basic/security_best_practices | L0 | access:2026-10-14 | VERIFIED |
| 7 | 安全最佳实践列出「Local MCP Server Compromise」，并建议本地服务器使用 `stdio` 传输以限制访问面 | https://modelcontextprotocol.io/specification/latest/basic/security_best_practices | L0 | access:2026-10-14 | VERIFIED |
| 8 | 安全最佳实践列出 SSRF、State Handle Hijacking、OAuth Authorization URL Validation 等攻击面 | https://modelcontextprotocol.io/specification/latest/basic/security_best_practices | L0 | access:2026-10-14 | VERIFIED |
| 9 | Anthropic 于 2025-12-09 将 MCP 捐赠给 Linux Foundation 下的 Agentic AI Foundation；维护者结构不变 | https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/ | L1 | 2025-12-09 | VERIFIED |
| 10 | Ghidra 由 NSA Research Directorate 开发，许可为 Apache License 2.0 | https://github.com/NationalSecurityAgency/ghidra | L1 | access:2026-10-14 | VERIFIED |
| 11 | Hopper 官方页面自述为 macOS 反汇编器，要求 macOS 12.4 或更高；反编译器输出 C 风格伪代码 | https://www.hopperapp.com/ | L1 | access:2026-10-14 | VERIFIED |
| 12 | IDA Pro 官方写明只有 IDA Pro 允许商业用途；列出 Home / Free 等档位与各平台系统要求 | https://hex-rays.com/ida-pro/ | L1 | access:2026-10-14 | VERIFIED |
| 13 | Electron 官方文档：应用源码通常被打包进 ASAR；asar 使源码不易被随意查看，但官方页面未把它定义为安全边界 | https://www.electronjs.org/docs/latest/tutorial/asar-archives | L1 | access:2026-10-14 | VERIFIED |
| 14 | 17 U.S.C. §1201(a)(1)(A) 禁止规避技术措施；§1201(f) 提供互操作例外；§1201(g)/(j)/(i) 另有加密研究、安全测试、PII 例外 | https://www.law.cornell.edu/uscode/text/17/1201 | L0 | access:2026-10-14 | VERIFIED |
| 15 | 欧盟软件指令 2009/24/EC 第 6 条允许反编译，条件为：合法持有人、信息未现成可得、限于互操作所需部分、信息不得用于无关目的 | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0024 | L0 | 指令文本 2009；access:2026-10-14 | VERIFIED |
| 16 | DecompileBench：在 130 个真实程序、23,400 个函数上比较 6 个工业级反编译器与 6 种大模型方案，大模型方案可读性更好但功能正确性低 52.2% | https://arxiv.org/abs/2505.11340 | L2 | 2025-05-16 提交 | VERIFIED |
| 17 | Kadavath et al.《Language Models (Mostly) Know What They Know》：报告较大模型在多项选择与判断题上校准良好；未声称模型普遍自知不知 | https://arxiv.org/abs/2207.05221 | L2 | 2022-07-11 提交 | VERIFIED |

## 二、本文件与产品页自身的一处修正

初稿把 MCP 官方博客的治理公告（#9）标为 L0。独立评审指出：博客公告属于「厂商或项目官方文档」，
应为 L1。本表与产品页正文已统一改为 L1。

产品页另有一处数字口径修正：`--help` 的命令数最初写成 136，与「规范命令名 142」相减对不上。
重数 `Commands:` 段落后确认是 **127**，差集恰为 15，两处口径现已自洽。

## 三、可复现检索日志

按实际执行顺序记录。`QUERY` 为提交的检索式，`FETCH` 为实际打开并读取正文的 URL。

| # | 类型 | 内容 | 结果 |
|---|---|---|---|
| 1 | FETCH | https://modelcontextprotocol.io/specification/latest | 成功，产出 #2 #3 #4 |
| 2 | FETCH | https://modelcontextprotocol.io/specification/latest/basic/security_best_practices | 成功，产出 #5 #6 #7 #8 |
| 3 | FETCH | https://modelcontextprotocol.io/specification/versioning | 成功，产出 #1 |
| 4 | FETCH | https://www.electronjs.org/docs/latest/tutorial/asar-archives | 成功，产出 #13 |
| 5 | FETCH | https://ghidra-sre.org/ | **301 → github.com/NationalSecurityAgency/ghidra**，见 #6 |
| 6 | FETCH | https://github.com/NationalSecurityAgency/ghidra | 成功，产出 #10 |
| 7 | FETCH | https://www.hopperapp.com/ | 成功，产出 #11 |
| 8 | FETCH | https://hex-rays.com/ida-pro/ | 成功，产出 #12 |
| 9 | FETCH | https://blog.ghidra.org/2023/09/the-four-horsemen-of-the-apocalypse-or-how-to-avoid-failing-your-next-reverse-engineering-project/ | **失败**：TLS `TLSV1_ALERT_INTERNAL_ERROR`；重试时站点 301 跳转。见第五节 |
| 10 | FETCH | https://blog.ghidra.org/ | **301 → github.com/NationalSecurityAgency/ghidra**，无法取得博客索引 |
| 11 | FETCH | https://www.law.cornell.edu/uscode/text/17/1201 | 成功，产出 #14 |
| 12 | FETCH | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0024 | 成功，产出 #15 |
| 13 | QUERY | `decompiling correctness benchmark DIRTY dataset decompiler output equivalence evaluation arxiv`（限定 arxiv.org） | 返回候选清单，见第五节排除项 |
| 14 | FETCH | https://arxiv.org/abs/2505.11340 | 成功，产出 #16 |
| 15 | FETCH | https://arxiv.org/abs/2207.05221 | 成功，产出 #17 |
| 16 | QUERY | `Anthropic donates Model Context Protocol to Agentic AI Foundation Linux Foundation announcement`（限定 linuxfoundation.org / anthropic.com / modelcontextprotocol.io） | 返回候选，见第五节排除项 |
| 17 | FETCH | https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/ | 成功，产出 #9 |
| 18 | QUERY | `Ghidra team blog decompiling "solvable but difficult" impossible reverse engineering research`（限定 blog.ghidra.org / ghidra.re / github.com） | 未命中官方来源，见第五节 |

## 四、REA 自身的一手证据（E / L0）

这些不属于外部信源，但同样经过逐条核对，是产品页「已验证」小节的依据。
核对对象是 `morluto/rea` 的一份本地只读克隆，HEAD 精确等于
`70611713e140a86201cdef659181012cbdd17f4d`，工作区干净。
任何人也可以改用 `git clone https://github.com/morluto/rea` 后 `git checkout` 到该提交，得到同样的核对对象。

| 论断 | 核对方式 | 结果 |
|---|---|---|
| 包名 / 版本 / bin / engines / 无 main·types·exports | 读 `package.json` | `rea-agents` 6.4.0；bin 为 `rea`、`rea-agents`；engines `^22.19.0 \|\| ^24.11.0 \|\| >=26.0.0`；三者均无 |
| 规范命令名 142 个 | 计数 `src/cliCommandNames.ts` 的 `key: "value"` | 142 |
| `--help` 的 `Commands:` 段落列出 127 个 | 实跑 `npx -y rea-agents@6.4.0 --help`，数 `Commands:` 段内的条目 | 127；142 − 127 = 15，与「规范名里没在帮助里露出的命令数」一致 |
| Windows Job Object 插件 | 读 `native/windows/src/process.cc` | `CreateJobObjectW` + `JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE`；文件中 29 处 `napi_*` 调用确认是 Node-API 插件（**未找到可据此判定 Node-API 版本号的证据，故产品页不写版本号**） |
| Ghidra 两种传输 | 读 `src/ghidra/GhidraTransport.ts` | `GhidraTransportKind = "unix-socket" \| "authenticated-loopback-tcp"`，后者 host 为 `127.0.0.1` |
| CLI 装配 35 组命令 | 计数 `src/cli.ts` 的 `register*Commands(` 调用 | 35 |
| MCP 装配 37 个模块 | 计数 `createServer.ts` 的 `from "./register*.js"` | 37（36 工具 + 1 prompts） |
| 分层行数表 | `find src/<层> -name '*.ts' -not -name '*.test.ts'` 后 `wc -l` | 见产品页第 9 节表格 |
| `PURE_LAYERS` 与 AST 扫描 | 读 `scripts/lib/module-boundaries.mjs` | 第 6 行 `new Set(["domain", "contracts"])` |
| 22 个 diagnostic code | 读 `reconstructionObligationLedgerSchemas.ts` 的 `diagnosticSchema` 枚举 | 22 |
| 8 个 obligation status | 同上 `obligationStatusSchema` | 8 |
| 状态短路顺序 | 读 `ReconstructionObligationLedgerEvaluation.ts` 的 `obligationStatus()` | out-of-scope → blocked → contradicted → unknown → unowned → verified → implemented |
| 台账级判定 | 读 `reconstructionObligationLedgerIntegrity.ts` | failed → unknown → open/ready，与产品页描述一致 |
| confidence / authority 取值 | 读 `src/domain/evidence.ts` | 三值 / 五值，与产品页一致 |
| 「Missing coverage is unknown, not absence.」 | 读 `docs/tool-design.md` | 第 55 行 |
| 10 MiB 传输预算 | 读 `src/config/mcpResponseBudget.ts` | `MINIMUM_RESPONSE_BYTES = 10 * 1024 * 1024` |
| 令牌 32 字节 / 快照 0600 / 恒定时间比较 | 读 `src/ghidra/GhidraClient.ts`、`src/hopper/HopperClient.ts`、`bridge/hopper_bridge.py` | `randomBytes(32)`；`open(..., "wx", 0o600)`；`hmac.compare_digest` |
| Hopper 桥四键请求体与固定错误串 | 读 `bridge/hopper_bridge.py` | `Invalid bridge request shape` / `Invalid bridge capability` |
| 退出码 130 | 读 `src/cli/commandCancellation.ts` | `exitCode ??= 130` |
| Windows Ghidra P0 25 个只读操作 | 读 `docs/windows-ghidra-p0.md` | 「the 25 read-only Ghidra inventory, memory, and function-analysis operations」 |
| 测试规模与 retry | `find -name '*.test.ts'` + 读 `vitest.config.ts` | 1094 个测试文件；`retry: 0`；12 条 lane |
| tsconfig 严格度 | 读 `tsconfig.json` | `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess` / `verbatimModuleSyntax` / `strict` 均开 |
| bridge 语言与文件数 | `find bridge -type f` 按扩展名统计 | 30 个文件：java 14、py 12、swift 4（**三种**语言，非五种） |
| 5 个 submodule 未检出 | `git submodule status` | 全部带 `-` 前缀，未初始化 |
| skill 的负面路由规则 | 读 `.agents/skills/reverse-engineer-anything/SKILL.md` | 第 13 行：完整源码仓库用常规仓库工具，不跑 REA |
| setup 支持的客户端 | 读 `docs/installation.md` 与 `src/cli/setupCommands.ts` | 23 个客户端；Grok Bot 走手工托管连接器 |

**本次实跑的终端行为**（`rea-agents` 6.4.0，win32 x64，Node v24.16.0，2026-10-14）：
`--help`、`doctor`、`capabilities --json`、`analyze-javascript-application <三文件最小应用> --json`。
最后一条返回 16 行 `rea_progress` NDJSON 加一行约 81 KB 的 Evidence JSON；
其 `confidence` 为 `derived`、`authority` 为 `shipped-artifact`、`limitations` 有 5 条——
产品页第 5 节逐字引用了这五条。输出中的本地绝对路径在产品页里已替换为占位符。

## 五、被排除的条目（不作为事实依据）

| 内容 | 层级 | 排除原因 |
|---|---|---|
| DecompileBench 的 Recompile Success Rate / Coverage Equivalence Rate 具体分值（如 Hex-Rays 0.583 / 0.417、GPT-4o 0.346） | — | 这些数字来自检索结果摘要，**arXiv 摘要正文里没有**；按纪律不予引用 |
| 「Ghidra 团队称反编译是 solvable but difficult / 存在不可解部分」 | — | `blog.ghidra.org` 访问时 TLS 报错，重试后 301 跳转到 GitHub 仓库，无法取得原文 |
| Linux Foundation / Anthropic 公告中的采用量数字（10,000+ 活跃公开 MCP 服务器、97M+ 月下载量等） | L4 | 来自检索摘要，未回到一手公告核对 |
| MCP 维护者结构中「SEPs 流程、LF 治理委员会不干预技术方向」的完整表述 | L0 | 一手公告中确认了「maintainer structure stays the same」，更细的分层描述只见于二手转述 |
| EAIF 的「Kubernetes 时刻」类比、各类分析师评论 | L4 | 观点，非事实 |
| DIRTY / DIRT 变量名与类型恢复数据集的指标（Name Match 66.4%、Type Match 75.8%） | L2 候选 | 数字来自检索摘要，未打开 arXiv:2108.06363 核对 |
| Ghidra 官方博客之外的「反汇编是唯一 ground truth」类中文技术博客 | L4 | 搜索结果全部为 SEO 教程站，无一手依据 |
| 关于「给智能体加义务清单是否提升正确率」的对照实验 | — | 未检索到符合条件的公开研究；这是本次的**已知空白**，已在产品页「检索边界」中写明 |
| 关于「MCP 服务器给结论打置信度与权威性标签」的对照研究 | — | 未检索到符合条件的公开研究；同上 |

## 六、复核方式

任何人想复核上面任何一条，可以：

1. 按第三节表格重放 `FETCH`（多数为一手页面，不依赖检索排序）；
2. 对 REA 相关条目，按第四节「核对方式」一列的命令，在
   `morluto/rea` 的 `70611713e140a86201cdef659181012cbdd17f4d` 提交上重跑；
3. 对产品页里的实跑输出，按第四节末尾的命令重新执行，并注意输出中的绝对路径会因机器而异。
