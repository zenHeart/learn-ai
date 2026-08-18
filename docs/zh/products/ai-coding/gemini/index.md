# Gemini 全家族

> Google 的 AI 编码产品线。这一页告诉你**七个产品分别解决什么问题、该按什么顺序学**。
>
> **2026-06-18 起**：个人账号、Google AI Pro / Ultra 通过「Login with Google」访问 [Gemini CLI](./gemini-cli) 与 [Code Assist](./code-assist) IDE 扩展已停服，请改用 [Antigravity](./antigravity) 家族。Standard / Enterprise 许可证与付费 API key 不受影响。官方说明见 [消费者账号弃用](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) 与 [过渡公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli)。

## 为什么需要这一页

Gemini 家族的产品数量多、命名相似、能力有重叠，最常见的困惑不是"某个产品怎么用"，而是"我这个活该用哪个"。

先记住一条主线：**它们的分界线是"谁在驾驶"。**

```
你逐字敲，AI 补全            → Code Assist
你下指令，AI 在你终端里执行    → Gemini CLI
你定目标，AI 自己规划执行      → Antigravity
你交任务，AI 在云端做完给你 PR  → Jules
```

剩下三个不在这条主线上：AI Studio 控制模型本身，Canvas 做原型，Google AI 订阅决定你能用多少。

## 七个产品

### 核心产品

| 产品 | 一句话 | 什么时候用 |
|---|---|---|
| [Gemini CLI](./gemini-cli) | 终端里的 AI 智能体 | 想把 AI 接进管道和脚本；家族的入门首选 |
| [Antigravity](./antigravity) | agent-first 开发平台 | 跨模块大改动，需要边看边验证 |
| [Jules](./jules) | 云端异步编码智能体 | 边界清晰的耗时任务，丢出去等 PR |

### 更多产品与扩展

| 产品 | 一句话 | 什么时候用 |
|---|---|---|
| [Canvas](./canvas) | 对话旁边的交互式工作区 | 快速做能点的原型 |
| [Code Assist](./code-assist) | IDE 集成扩展 | 不想换编辑器；团队有合规硬要求 |
| [AI Studio](./ai-studio) | 模型与参数控制台 | 调温度、固化系统提示词、大规模上下文审计、接 API |
| [Google AI 订阅](./google-pro) | 付费层级与额度 | 决定要为哪一档付费 |

### 速查与参考

| 页面 | 用途 |
|---|---|
| [Cookbook](./gemini-cookbook) | 按"我想做什么"查配方 |
| [速查表](./gemini-cheatsheet) | 决策表、模型现状、订阅层级、配置路径 |
| [术语表](./gemini-glossary) | Rules / Skill / Subagent / Artifact 等概念到底指什么 |

## 建议学习顺序

上面的排列顺序不是按字母，也不是按热度，而是按**概念依赖**加**受众复杂度**：

1. **先学 [Gemini CLI](./gemini-cli)**。它是家族里唯一零前置的完整工具，而且首次引入了 `.gemini/settings.json`、`gemini extensions install`、`GEMINI.md` 这三样后面反复复用的东西。个人 / Pro / Ultra 账号日常请走 [Antigravity CLI](./antigravity)，本页仍从 CLI 开讲，是因为它是概念入口，不是因为消费者还能用「Login with Google」。
2. **再学 [Antigravity](./antigravity)**。它复用上面三个概念，再加上规则、技能、子智能体。2026-06-18 之后，这是个人开发者的日常入口。跳过 CLI 直接看它，你会在"这个配置文件是什么"上卡住。
3. **然后 [Jules](./jules)**。它在"自主智能体"之上再叠一层 GitHub 仓库与 PR 工作流。
4. 之后按需要看 Canvas / Code Assist / AI Studio / 订阅层级——它们互相独立，不构成链条。

**[Code Assist](./code-assist) 排在后面不是因为它难**，而是因为它的官方定位就是面向"有严格数据安全与合规要求的组织"，个人开发者通常不是第一需求。**[订阅层级](./google-pro)** 放最后，因为它回答的是"我该为哪一档付钱"，等你知道自己要用哪个工具之后再看才有意义。

## 快速决策

| 我的情况 | 用 |
|---|---|
| 想在终端里试试 AI 编码 | [Gemini CLI](./gemini-cli) |
| 要改一个跨了五个模块的东西 | [Antigravity](./antigravity) |
| 要把 React 从 18 升到 19 | [Jules](./jules) |
| 不想离开 VS Code | [Code Assist](./code-assist) |
| 想让 AI 通读整个仓库做审计 | [AI Studio](./ai-studio) |
| 半小时内要给产品经理看个原型 | [Canvas](./canvas) |
| 想知道免费额度够不够用 | [订阅层级](./google-pro) |

完整决策表见[速查表](./gemini-cheatsheet#选哪个工具)。

## 共享的概念

家族内部有几样东西是跨产品复用的，先认识它们能省很多重复学习：

| 概念 | 跨哪些产品 |
|---|---|
| `GEMINI.md` | Gemini CLI、Antigravity（全局规则） |
| `AGENTS.md` | Jules |
| MCP | Gemini CLI、Antigravity、Code Assist |
| 订阅额度 | 一份订阅同时影响多个产品的可用量 |

各自的准确路径与区别见[术语表](./gemini-glossary)和[速查表的配置速查](./gemini-cheatsheet#配置速查)。

## 订阅与额度

订阅分为 AI Plus / AI Pro / AI Ultra 5x / AI Ultra 20x 四档，**不是两档**。各档的模型倍数、存储、Google Cloud 额度见[速查表的订阅层级](./gemini-cheatsheet#订阅层级)，本页不重复。

<!-- TODO: 待核实 —— 各档订阅的具体价格。官方对比页会按地区返回本地化内容并且吞掉货币金额，未找到可稳定引用的官方标价，请以你所在地区的官方页面为准 -->

## 官方资源

- [Gemini CLI 文档](https://geminicli.com/docs/)
- [Antigravity 文档](https://antigravity.google/docs/home)
- [Jules 文档](https://jules.google/docs/)
- [Code Assist 文档](https://developers.google.com/gemini-code-assist/docs/overview)
- [Gemini API 模型清单](https://ai.google.dev/gemini-api/docs/models)
- [Google AI 订阅对比](https://one.google.com/about/google-ai-plans/)
