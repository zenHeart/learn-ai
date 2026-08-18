# Gemini 全家族 维护参考

> 本文件只记录 Gemini 全家族文档特有的维护事实。通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)，Diataxis 四象限设计见 [`documentation-architecture.md`](./documentation-architecture.md)，读者可见的完整数据源清单在 `docs/zh/products/ai-coding/gemini/gemini-cheatsheet.md` 的「高质量信息源」章节。

## 基本信息

- 工具名：Gemini 全家族（Gemini CLI / Antigravity / Jules / Canvas / Code Assist / AI Studio / Google AI 订阅）
- 这是一个**产品族**而非单一工具，7 个子产品分属不同团队、不同文档站、不同发版节奏
- 官方文档根地址（按子产品分散，没有统一入口）：
  - Gemini CLI：<https://geminicli.com/docs/>
  - Antigravity：<https://antigravity.google/docs/home>
  - Jules：<https://jules.google/docs/>
  - Gemini Code Assist：<https://developers.google.com/gemini-code-assist/docs/overview>
  - Gemini API / 模型清单：<https://ai.google.dev/gemini-api/docs/models>
  - Google AI 订阅：<https://one.google.com/about/google-ai-plans/>
  - Canvas：<https://gemini.google/overview/canvas/>
- 发版节奏：Gemini CLI 有 nightly / preview / stable 三条发布通道，模型清单页近乎每周更新；Antigravity 与 Jules 迭代极快且**会静默改命令名**
- 当前覆盖版本：以 2026-08-18 一轮系统性核实为基准（模型清单页 Last updated 2026-08-14，Code Assist 概览页 2026-08-13）

## 文档文件结构（Diataxis 四象限）

```
docs/zh/products/ai-coding/gemini/       # 英文版同构于 docs/products/ai-coding/gemini/
├── index.md                 # 🗺️ 学习地图
├── gemini-cli.md            # 📘 Tutorial/How-to — 主教程（族内唯一零前置依赖的完整工具）
├── antigravity.md           # 📘 智能体开发平台
├── jules.md                 # 📘 云端异步智能体
├── canvas.md                # 📘 对话内原型
├── code-assist.md           # 📘 IDE 扩展（Standard / Enterprise）
├── ai-studio.md             # 📘 模型与 API 控制台
├── google-pro.md            # 📘 订阅层级与配额
├── gemini-cookbook.md       # 🔧 How-to — 跨子产品场景化配方
├── gemini-cheatsheet.md     # 📐 Reference — 决策表/配置/信息源（全站唯一权威版本）
└── gemini-glossary.md       # 📖 Explanation — 核心概念
```

## 子产品跨页排列顺序（轴 A / 轴 B 结论）

**核心产品**：`gemini-cli` → `antigravity` → `jules`
**更多产品与扩展**：`canvas` → `code-assist` → `ai-studio` → `google-pro`

- 轴 A（概念依赖）：`gemini-cli` 是族内唯一零前置依赖的完整工具，`.gemini/settings.json`、`gemini extensions install`、GEMINI.md 三个概念都在这里首次出现并被后续页面复用，所以必须最先；`antigravity` 复用这三个概念再叠加 rules/skills/subagents；`jules` 在自主智能体之上再叠加 GitHub 仓库与 PR 工作流。
- 轴 B（受众复杂度）：`code-assist` 官方开场即 "organizations with strict data security and compliance requirements"、VPC-SC、IP indemnification，是**企业级强信号**；2026-06-18 后又叠加"个人 free 档停服、只剩 Standard / Enterprise"，因此即使它的概念依赖很浅（IDE 插件），也要往后压；`google-pro` 同理——订阅层级本身概念独立（轴 A 允许很前），但它回答的是"我该为团队掏哪一档钱"，属于付费决策受众，压到最后。
- `canvas` 轴 A 零依赖、轴 B 最轻（Gemini App 内即可用），但它不在工程化主线上，所以放在"更多产品"组首位而非核心组。
- 2026-06-18 消费者停服**不推翻**轴 A：Gemini CLI 仍是概念入口（settings / extensions / GEMINI.md），企业与 API key 用户仍在用；它只强化轴 B——个人日常入口变成 Antigravity，Code Assist 更该留在"更多产品"。

## 监控页面（What's New 驱动更新的最小子集）

- Gemini CLI 发布通道与变更：<https://geminicli.com/docs/changelogs/>（页顶横幅会提示消费者迁 Antigravity CLI）
- 消费者账号弃用：<https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals>
- Gemini CLI 配置项唯一真相源（JSON Schema）：<https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json>
- 模型清单 + 停用清单：<https://ai.google.dev/gemini-api/docs/models>
- Jules CLI 命令参考：<https://jules.google/docs/cli/reference/>
- Antigravity 规则与工作流：<https://antigravity.google/docs/rules-workflows>
- Antigravity 技能：<https://antigravity.google/docs/skills>
- 订阅层级对比表：<https://one.google.com/about/google-ai-plans/>

## Git 提交 scope

```
docs(gemini): ...
```

## 已知踩坑 / 特殊约定

- **这一族是全站杜撰风险最高的文档**。2026-08 的一轮核实发现历史版本里存在整段虚构的 CLI（`@google/jules-tools`、`jules status`、`jules task list`、`jules pr apply`）、虚构的配置键（`codeAssist.agentMode`、`security.allowedCommands`、`security.sandboxMode`、`requireBranch`）、虚构的命令（`gemini connect chrome`、`gemini run audit`、`gemini mcp add`）。**新增任何命令或配置键前必须回官方页面逐条对照。**
- **Jules CLI 的 npm 包名是 `@google/jules`，不是 `@google/jules-tools`**；命令是 `jules remote new --repo <owner/repo> --session "<desc>"`，不是 `jules remote new "<desc>"`。
- **Antigravity 的规则文件不是项目根目录的 `agents.md`**：全局规则在 `~/.gemini/GEMINI.md`，工作区规则在 `.agents/rules` 目录；技能是**目录**，内含 `SKILL.md`，位于 `.agents/skills/<folder>/` 或 `~/.gemini/config/skills/<folder>/`。
- **Google AI 订阅是 4 档不是 2 档**：Plus / Pro / Ultra 5x / Ultra 20x。官方对比表里 Antigravity 与 Jules 的额度只有定性描述（"Terbatas / Diperluas / 更高 / 最高"），**没有任何数字配额**，不要写"每日 1500 次"这类具体数字。
- **上下文窗口只有一个可引用数字**：官方订阅对比表写 Pro 及以上是 100 万令牌。模型清单页**不列每个模型的上下文窗口**，所以"某模型 200 万令牌"这类说法当前无出处。
- 模型名极易过期：`gemini-3-pro-preview`、`gemini-2.0-flash`、`gemini-2.0-flash-lite`、`gemini-3.1-flash-lite-preview` 已标记 Shut down。示例输出（如 `/stats` 截图）里的模型名也要跟着换。
- `one.google.com/about/google-ai-plans/` 抓取时经常返回本地化版本（如印尼语）并**吞掉货币金额**，价格类信息拿不到就留 TODO，别照抄旧文档里的 `$20/月`。
- **2026-06-18 消费者停服**：个人账号、Google AI Pro / Ultra 通过 Login with Google 访问 Gemini CLI 与 Code Assist IDE 扩展已停服，官方要求迁到 Antigravity / Antigravity CLI。Standard / Enterprise 与付费 API key 不受影响。原文：[消费者账号弃用](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals)、[过渡公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli)。教程里凡写「个人用 Gemini CLI / Code Assist free」必须同时写这条边界。
- 中文页与英文页必须技术事实一致；`docs/zh/products/ai-coding/gemini-cli.md` 这个根目录孤儿文件已在 2026-08 删除（与 `gemini/gemini-cli.md` 除 BOM 外完全相同），不要再建。
