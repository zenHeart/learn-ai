# GLM Coding Plan 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/glm-coding/glm-coding-cheatsheet.md` 的「高质量信息源」。架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：GLM Coding Plan 是订阅套餐，不是聊天产品，也不是智谱第一方编码 Agent。**

- `docs.bigmodel.cn/cn/coding-plan/overview` 原文：「GLM Coding Plan 是专为 AI 编码打造的订阅套餐」。
- 本站正文只写：买套餐 → 拿专属 Key → 接到官方指定工具。不要写成「又一个 Claude.ai / 清言」。
- 一键装载入口是 Coding Tool Helper：`npx @z_ai/coding-helper`（[coding-tool-helper](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper)）。npm 包名必须写成 `@z_ai/coding-helper`，不要猜 `@zai/` 或 `@zhipu/`。

**结论二：额度只在官方指定工具里生效。错端点 / 自建应用走标准 API，不吃套餐。**

- overview / usage-notes / FAQ 同一口径：仅限 [指定工具与产品环境](https://docs.bigmodel.cn/cn/coding-plan/tool/others#%E4%B8%80%E3%80%81%E9%80%82%E7%94%A8%E5%B7%A5%E5%85%B7)。
- FAQ 原文：在自建应用、网站、机器人、SaaS 里调模型，用标准 API 并按协议计费。
- 额度耗尽后等下一个 5 小时周期，**不会**继续扣资源包 / 账户余额（overview、FAQ）。
- 报错 `1113 余额不足` 或扣账户余额：几乎总是工具不在名单里，或 Base URL 配成了标准 API。

**结论三：国内站与海外站是两套域名、两套端点，不要混引。**

| 区域 | 文档 | 订阅 / 控制台 | Anthropic | OpenAI Compatible |
|------|------|---------------|-----------|-------------------|
| 国内 | `docs.bigmodel.cn/cn/coding-plan/*` | `bigmodel.cn` / `open.bigmodel.cn` | `https://open.bigmodel.cn/api/anthropic` | `https://open.bigmodel.cn/api/coding/paas/v4` |
| 海外 | `docs.z.ai/devpack/*` | `z.ai` | `https://api.z.ai/api/anthropic` | `https://api.z.ai/api/coding/paas/v4` |

- Helper 国内命令：`coding-helper auth glm_coding_plan_china <token>`。
- Helper 海外命令：`coding-helper auth glm_coding_plan_global <token>`。
- 海外另有 OpenAI Responses：`https://api.z.ai/api/v1`（[docs.z.ai/devpack/tool/others](https://docs.z.ai/devpack/tool/others)）。国内 `latest-model` 给 Codex 的是 `https://open.bigmodel.cn/api/v1`；**国内适用工具卡未列入 Codex**，写正文时不要把 Codex 塞进国内指定工具名单。

**结论四：Helper 自动装载的工具 ≠ 套餐适用工具全集。**

Helper 当前只自动装：**Claude Code / OpenCode / Crush / Factory Droid**。Cursor、Cline、TRAE、ZCode 等在 `tool/others` 有接入页，但要按各工具页手配。Cursor **不在** Helper 列表里。

国内 Coding Agent 名单（[tool/others](https://docs.bigmodel.cn/cn/coding-plan/tool/others)，2026-08-19）：Claude Code、Claude for IDE、OpenCode、ZCode、TRAE、CodeBuddy、Lingma、Qoder、Kilo、MonkeyCode、Cline、Droid、Roo、Crush、Goose、Cursor。

国内通用 Agent（次级调度 / 尽力交付）：OpenClaw、Cherry Studio、Hermes Agent。

海外名单与国内不完全相同（多 Codex / Pi / Eigent / SillyTavern，少 Lingma / CodeBuddy / Cherry Studio 等）。两站各抄各的表。

**结论五：官方页之间会打架。以 overview + latest-model 为套餐事实源，工具页只当该工具的配置原文。**

| 事实 | 以谁为准 | 滞后页 |
|------|----------|--------|
| 当前可用模型 | overview / FAQ：所有套餐 **GLM-5.3**、GLM-5-Turbo、GLM-4.7；调用 GLM-5.2/5.1 自动切到 5.3 | `tool/claude` FAQ 仍写 GLM-4.7 默认映射；`tool/cursor` 示例仍是 `GLM-5.2`；海外 Cursor 页示例仍是 `GLM-4.7` |
| 个人积分与抵扣系数 | overview（模型行是 GLM-5.3） | team.md 抵扣表仍写 GLM-5.2 |
| 团队积分 | team.md：标准版 15,000 / 66,000；高级版 35,000 / 155,000 | — |
| Cursor 资格与模型写法 | 该区域的 `tool/cursor` 原文 | 不要把国内「高级会员」和海外「Cursor Pro and higher」合成一句 |

**结论六：同厂其它 AI 产品本目录不写正文。**

智谱一级产品来自 [zhipuai.cn](https://www.zhipuai.cn/) 顶栏 / 页脚「产品」：z.ai、AutoClaw、智谱清言、AutoGLM、Zread.ai、AMiner，另有智谱学习中心、智谱AI输入法。MaaS 入口是 Bigmodel。清言 / Z.ai 正文归 #74。非 AI 或非本站读者对象标「非本站」。

## 基本信息

- 工具名：GLM Coding Plan（国内亦称 GLM 编码套餐 / 编程套餐）
- 官方文档根：<https://docs.bigmodel.cn/cn/coding-plan/overview>（国内）、<https://docs.z.ai/devpack/overview>（海外）
- 订阅落地页：<https://bigmodel.cn/glm-coding>、<https://open.bigmodel.cn/glm-coding>、<https://z.ai/subscribe>
- 发版节奏：模型与积分表会改；不要写死人民币价。刊例价只链官方订阅页。海外 overview 可引用原文 “Starting at just 18 USD per month”。
- 当前覆盖：2026-08-19 打开的 overview / latest-model / tool/others / coding-tool-helper / usage-notes / faq / team / MCP 页。

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| GLM Coding Plan | https://bigmodel.cn/glm-coding 、https://docs.bigmodel.cn/cn/coding-plan/overview | 本目录独立页 | — |
| 智谱清言 | https://chatglm.cn/ | 地图一行 | 聊天 / Agent 助手，#74 |
| Z.ai | https://z.ai/ | 地图一行 | 海外聊天 / Agent，#74 |
| BigModel 开放平台 | https://bigmodel.cn/ 、https://docs.bigmodel.cn/cn/guide/start/introduction | 地图一行 | 标准按量 API，不是本套餐 |
| ZCode | https://docs.bigmodel.cn/cn/coding-plan/tool/zcode | 地图一行 | 指定工具，本目录不写 Agent 教程 |
| AutoGLM | https://www.zhipuai.cn/ | 地图一行 | 同厂 Agent，非本 issue |
| AutoClaw | https://autoglm.zhipuai.cn/autoclaw | 地图一行 | 本地 OpenClaw 客户端，非本 issue |
| Zread.ai | https://zread.ai | 地图一行 | 开源仓库产品；套餐侧只写 Zread MCP |
| AMiner | https://www.zhipuai.cn/ | 非本站 | 学术检索 |
| 智谱学习中心 | https://www.zhipuai.cn/ | 非本站 | 教育 |
| 智谱AI输入法 | https://www.zhipuai.cn/ | 非本站 | 输入法 |

易撞名：

- **GLM Coding Plan ≠ 智谱清言 / Z.ai**：前者是指定工具里的订阅额度，后者是聊天产品。
- **套餐 Key ≠ 平台其它 API Key**：团队套餐 Key 不通用。
- **Coding 端点 ≠ 标准 API**：`/api/coding/paas/v4` 与 `/api/paas/v4` 不是同一个。
- **Coding Tool Helper ≠ 智谱第一方编码 Agent**：Helper 只装载套餐。
- **ZCode ≠ GLM Coding Plan**：ZCode 是可用本套餐的工具。
- **Helper 支持的 4 个工具 ≠ 适用工具全集**。

## 文档文件结构（Diataxis）

官方编码套餐树 dense（overview / quick-start / usage-notes / faq / team / latest-model / tool/* / mcp/* / extension/*），本站收成 5 文件，不按 Claude/Grok 的 CLI 产品同构去写 TUI。

```
docs/zh/products/glm-coding/
├── index.md                    # 学习地图 + 家族图
├── glm-coding.md               # Tutorial：订阅、Helper、Claude Code、Cursor
├── glm-coding-cookbook.md      # How-to：切模型、MCP、1113、团队 Key
├── glm-coding-cheatsheet.md    # Reference：端点、积分、工具名单、命令、数据源
└── glm-coding-glossary.md      # Explanation：套餐 vs API vs 聊天、积分、次级调度

docs/products/glm-coding/       # 英文同构；端点与工具名单抄 docs.z.ai/devpack
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族表、决策树、套餐边界 | 逐步配置 |
| `glm-coding.md` | Tutorial | 订阅、取 Key、Helper、Claude Code、Cursor | 全工具清单细节、MCP 全配置 |
| `glm-coding-cookbook.md` | How-to | 切模型、MCP、报错、团队席位 | 基础安装、概念长文 |
| `glm-coding-cheatsheet.md` | Reference | 端点、积分、名单、命令、数据源 | 学习路径 |
| `glm-coding-glossary.md` | Explanation | 是什么 / 不是什么 | 参数逐步操作 |

跨页：`index` → `glm-coding` → `cookbook` → `cheatsheet` → `glossary`。

## 监控页面

- 套餐概览：<https://docs.bigmodel.cn/cn/coding-plan/overview>
- 快速开始：<https://docs.bigmodel.cn/cn/coding-plan/quick-start>
- 适用工具：<https://docs.bigmodel.cn/cn/coding-plan/tool/others>
- 一键安装助手：<https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper>
- 如何切换模型：<https://docs.bigmodel.cn/cn/coding-plan/latest-model>
- 使用须知：<https://docs.bigmodel.cn/cn/coding-plan/usage-notes>
- FAQ：<https://docs.bigmodel.cn/cn/coding-plan/faq>
- 团队版：<https://docs.bigmodel.cn/cn/coding-plan/team>
- 海外镜像：<https://docs.z.ai/devpack/overview>
- npm：<https://www.npmjs.com/package/@z_ai/coding-helper>
- 文档索引：<https://docs.bigmodel.cn/llms.txt>、<https://docs.z.ai/llms.txt>

## Git 提交 scope

```
docs(glm-coding): ...
```

## 已知踩坑 / 特殊约定

1. **不要改 gallery / sidebar**（本 issue 执行约束）。文件放扁平目录 `docs/products/glm-coding/` 与 `docs/zh/products/glm-coding/`。
2. **命令与包名只抄官方原文。** `npx @z_ai/coding-helper`、`npm install -g @anthropic-ai/claude-code`、`@z_ai/mcp-server`。
3. **Cursor 国内页**：仅「高级会员及以上」可自定义模型；模型名要**大写**，官方示例 `GLM-5.2`。海外页写 Cursor Pro and higher，示例 `GLM-4.7`。不要发明 `GLM-5.3` 的 Cursor 写法。
4. **人民币刊例价不要从营销页摘要回填。** 文档站 overview 不写人民币价；链订阅页。
5. **国内 `tool/claude` 与 `latest-model` 模型映射不一致。** 教程切模型抄 `latest-model`；安装环境变量抄 `tool/claude`。
6. **OpenClaw 是次级调度**，高负载可排队 / 限流。不要写成与 Claude Code 同等保障。
7. **`bigmodel.cn/glm-coding` 营销页是 SPA**，无头抓取经常只看到 loading。事实以 `docs.bigmodel.cn` 的 `.md` 为准。
8. 本目录禁止展开清言 / Z.ai / AutoGLM 教程。
