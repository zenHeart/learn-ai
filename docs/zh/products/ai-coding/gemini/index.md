# Gemini 全家族

> Google 的 AI 编码与创意产品线。这一页是**产品全景 + 决策树**：先回答「我要做什么 → 用哪个」，再进各产品页。
>
> **2026-06-18 起**：个人账号、Google AI Pro / Ultra 通过「Login with Google」访问 [Gemini CLI](./gemini-cli) 与 [Code Assist](./code-assist) IDE 扩展已停服，请改用 [Antigravity](./antigravity) 家族。Standard / Enterprise 许可证与付费 API key 不受影响。官方说明见 [消费者账号弃用](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) 与 [过渡公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli)。

## 产品全景图

编码主线按「谁在驾驶」切开；影像与原型对位 Claude 家族里的 Design，不和终端抢位置。

```
Gemini 全家族
├── 编码主线（谁在驾驶）
│   ├── 你逐字敲，AI 补全              → Code Assist
│   ├── 你下指令，AI 在你终端里执行      → Gemini CLI
│   ├── 你定目标，AI 自己规划执行        → Antigravity
│   └── 你交任务，AI 在云端做完给你 PR   → Jules
├── 原型与影像（对位 Claude Design）
│   ├── 能点的交互原型                 → Canvas
│   └── 落地页 / 宣传片 / 产品演示视频   → Google Flow
├── 模型与订阅
│   ├── 调模型、走 API                 → AI Studio
│   └── 付费档与额度                   → Google AI 订阅
└── Pro 订阅还带、不必独立成页
    ├── Gemini Spark（US、个人 agent）
    ├── Gemini Notebook（研究 / 写作）
    ├── Gemini app + Deep Research
    ├── Gemini in Chrome auto browse（US）
    ├── Gemini in Android Studio
    └── Google Flow Music（flowmusic.app，积分与 Flow 分开）
```

Dreambeans、Health Premium、Home Premium、TV Create Hub、Earth、Photos Remix 也在同一份订阅里，**与编码无关**，本站不写。一行说明见 [订阅页](./google-pro#订阅还带什么)。

### 快速决策：我该用哪个？

```
我要做什么？
├── 写代码 / 调试 / 重构 / 提 PR
│   ├── 在终端、要进管道？
│   │   ├── 个人账号 → Antigravity CLI
│   │   └── Standard / Enterprise 或 API key → Gemini CLI
│   ├── 跨模块、要边看边验证？ → Antigravity
│   ├── 边界清晰、丢出去等 PR？ → Jules
│   └── 不想离开 IDE、或团队有合规硬要求？ → Code Assist
├── 交互原型 / 能点的页面
│   └── → Canvas
│       └── 选定方向之后 → Antigravity 写进仓库
├── 落地页宣传片 / 产品演示视频 / 分镜
│   └── → Google Flow
│       └── 歌曲 / MV → Flow Music（积分分开，不必单独学）
├── 调温度、固化系统提示、大规模上下文、接 API
│   └── → AI Studio
└── 决定订哪一档、额度够不够
    └── → Google AI 订阅（表只在速查表）
```

完整对照表见[速查表](./gemini-cheatsheet#选哪个工具)。

## 核心产品

Tutorial 默认展开。Cookbook 紧跟核心产品，也默认展开。

| 产品 | 一句话 | 什么时候用 |
|---|---|---|
| [Gemini CLI](./gemini-cli) | 终端里的 AI 智能体 | 想把 AI 接进管道和脚本；家族的概念入口 |
| [Antigravity](./antigravity) | agent-first 开发平台 | 跨模块大改动，需要边看边验证 |
| [Jules](./jules) | 云端异步编码智能体 | 边界清晰的耗时任务，丢出去等 PR |
| [Cookbook](./gemini-cookbook) | 按「我想做什么」查配方 | 学完主教程之后动手 |

## 更多产品与扩展

默认折叠。轴 A 不依赖前面概念；轴 B 按前端工程师相关度排——[Flow](./flow) 对位 Claude Design，和 [Canvas](./canvas) 放在一起。

| 产品 | 一句话 | 什么时候用 |
|---|---|---|
| [Canvas](./canvas) | 对话旁边的交互式工作区 | 快速做能点的原型 |
| [Google Flow](./flow) | AI 创意工作室（Veo 3.1 / Nano Banana / Gemini Omni） | 落地页、宣传片、产品演示视频 |
| [Code Assist](./code-assist) | IDE 集成扩展 | 不想换编辑器；团队有合规硬要求 |
| [AI Studio](./ai-studio) | 模型与参数控制台 | 调温度、固化系统提示词、大规模上下文审计、接 API |
| [Google AI 订阅](./google-pro) | 付费层级与额度 | 决定要为哪一档付费；Pro 权益画进家族图 |

## 速查与参考

Cheatsheet / Glossary 默认展开。共享表只写一份，其他页只链过来。

| 页面 | 用途 |
|---|---|
| [速查表](./gemini-cheatsheet) | 决策表、模型现状、订阅层级、配置路径 |
| [术语表](./gemini-glossary) | Rules / Skill / Subagent / Artifact / Flow 等概念到底指什么 |

## 建议学习顺序

排列按**概念依赖（轴 A）**加**受众复杂度（轴 B）**，不是字母序，也不是热度：

1. **先学 [Gemini CLI](./gemini-cli)**。它是家族里唯一零前置的完整工具，而且首次引入了 `.gemini/settings.json`、`gemini extensions install`、`GEMINI.md` 这三样后面反复复用的东西。个人 / Pro / Ultra 账号日常请走 [Antigravity CLI](./antigravity)，本页仍从 CLI 开讲，是因为它是概念入口，不是因为消费者还能用「Login with Google」。
2. **再学 [Antigravity](./antigravity)**。它复用上面三个概念，再加上规则、技能、子智能体。2026-06-18 之后，这是个人开发者的日常入口。跳过 CLI 直接看它，你会在「这个配置文件是什么」上卡住。
3. **然后 [Jules](./jules)**。它在「自主智能体」之上再叠一层 GitHub 仓库与 PR 工作流。
4. **动手时翻 [Cookbook](./gemini-cookbook)**，查参数去 [速查表](./gemini-cheatsheet)，概念记混了翻 [术语表](./gemini-glossary)。
5. 之后按需要看 Canvas / Flow / Code Assist / AI Studio / 订阅层级——它们互相独立，不构成链条。Flow 轴 A 零依赖，轴 B 对前端工程师相关度中高（对外讲功能时会用到），所以进「更多产品」，不进核心组。

**[Code Assist](./code-assist) 排在后面不是因为它难**，而是因为它的官方定位就是面向「有严格数据安全与合规要求的组织」，个人开发者通常不是第一需求。**[订阅层级](./google-pro)** 放最后，因为它回答的是「我该为哪一档付钱」，等你知道自己要用哪个工具之后再看才有意义。

## 快速决策

| 我的情况 | 用 |
|---|---|
| 想在终端里试试 AI 编码 | [Gemini CLI](./gemini-cli)（企业 / API key）或 [Antigravity](./antigravity)（个人） |
| 要改一个跨了五个模块的东西 | [Antigravity](./antigravity) |
| 要把 React 从 18 升到 19 | [Jules](./jules) |
| 不想离开 VS Code | [Code Assist](./code-assist) |
| 想让 AI 通读整个仓库做审计 | [AI Studio](./ai-studio) |
| 半小时内要给产品经理看个原型 | [Canvas](./canvas) |
| 落地页 / 宣传片 / 产品演示要出视频 | [Google Flow](./flow) |
| 想知道免费额度够不够用 | [订阅层级](./google-pro) |

## 共享的概念

家族内部有几样东西是跨产品复用的，先认识它们能省很多重复学习：

| 概念 | 跨哪些产品 |
|---|---|
| `GEMINI.md` | Gemini CLI、Antigravity（全局规则） |
| `AGENTS.md` | Jules |
| MCP | Gemini CLI、Antigravity、Code Assist |
| 订阅额度 | 一份订阅同时影响多个产品的可用量 |
| Flow 积分 | 只用于 [Google Flow](./flow)；与 Flow Music、Antigravity 的 AI credits 不是同一本账 |

各自的准确路径与区别见[术语表](./gemini-glossary)和[速查表的配置速查](./gemini-cheatsheet#配置速查)。

## 订阅与额度

订阅分为 AI Plus / AI Pro / AI Ultra 5x / AI Ultra 20x 四档，**不是两档**。各档的模型倍数、存储、Google Cloud 额度见[速查表的订阅层级](./gemini-cheatsheet#订阅层级)，本页不重复。Flow 的日 / 月积分见 [Flow](./flow#额度)。Pro 里和编码相关的权益清单见 [订阅页](./google-pro)。

<!-- TODO: 待核实 —— 各档订阅的具体价格。官方对比页会按地区返回本地化内容并且吞掉货币金额，未找到可稳定引用的官方标价，请以你所在地区的官方页面为准 -->

## 官方资源

- [Gemini CLI 文档](https://geminicli.com/docs/)
- [Antigravity 文档](https://antigravity.google/docs/home)
- [Jules 文档](https://jules.google/docs/)
- [Code Assist 文档](https://developers.google.com/gemini-code-assist/docs/overview)
- [Gemini API 模型清单](https://ai.google.dev/gemini-api/docs/models)
- [Google Flow](https://labs.google/fx/tools/flow)
- [Google AI Pro 权益](https://support.google.com/googleone/answer/14534406)
- [Google AI 订阅对比](https://one.google.com/about/google-ai-plans/)
