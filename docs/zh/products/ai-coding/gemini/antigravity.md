# Google Antigravity

> Google 的 agent-first 开发平台。它不是"装了 AI 的编辑器"——交互单位是**一个任务**，而不是一次按键。
>
> **2026-06-18 起**，个人 / Google AI Pro / Ultra 的日常入口是这里（含 CLI 表面），不再是 Gemini CLI 的「Login with Google」。[过渡公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli)。

## 核心定位

Antigravity 假设 AI 能自主规划、调用工具、执行多步任务。这个前提改变了你该给它什么输入：补全式工具需要光标位置，Antigravity 需要目标、约束和验收标准。

它的能力边界由三件事决定：

| 你提供什么 | 载体 | 作用 |
|---|---|---|
| 长期不变量 | [规则](#规则-rules) | "这个项目必须这样做" |
| 可复用流程 | [技能](#技能-skills) 与 [工作流](#工作流-workflows) | "遇到这类活儿按这个套路" |
| 外部世界 | MCP | 让它能查 GitHub、驱动浏览器 |

## 多表面（Surfaces）

官方把 Antigravity 描述为构建在**同一套智能体 harness** 之上的多个表面：

| 表面 | 形态 | 适合 |
|---|---|---|
| 桌面应用 | 图形界面 | 交互式探索，边看边验证 |
| CLI | 终端 UI | 接进已有脚本与终端工作流 |
| SDK | Python | 把智能体嵌进自己的自动化 |
| IDE 集成 | 编辑器内 | 不离开现有编辑器 |

**这是最实用的一条认知**：因为共享同一套 harness，规则与技能是**跨表面生效**的。你不需要为桌面端和 CLI 各配一份，也不用重新学一套心智模型——按当下的工作方式挑入口就行。

驱动模型方面，官方模型文档标注 Gemini 3.5 Flash 驱动 Antigravity 的全部本地智能体；托管形态另有 `antigravity-preview-05-2026`，官方描述为在隔离的 Linux 沙盒里自主规划、执行代码、管理文件、浏览网页的通用托管智能体。

## 规则（Rules）

规则是长期生效的行为约束，分两级：

| 级别 | 位置 | 生效范围 |
|---|---|---|
| 全局 | `~/.gemini/GEMINI.md` | 全部工作区 |
| 工作区 | `.agents/rules` 目录 | 随仓库走，可提交 |

**官方明确每个规则文件上限 12,000 字符。** 到了上限应该拆分文件并用 `@filename` 交叉引用，而不是靠压缩措辞硬塞。

### 四种激活模式

| 模式 | 何时加载 | 适合 |
|---|---|---|
| Manual | 你手动引用时 | 偶尔才需要的约定 |
| Always On | 每次都加载 | 真正的全局铁律 |
| Model Decision | 模型判断需要时 | 场景性的建议 |
| Glob | 匹配到指定文件模式时 | 技术栈相关的规范 |

**优先用 Glob。** "React 组件规范"只在匹配 `src/**/*.tsx` 时加载，比 Always On 一直占着上下文划算得多。Always On 应该留给数量极少的真正不变量。

### 规则里该写什么

只写**智能体容易做错的**那几条：

```markdown
# 项目约束

- 包管理器只用 pnpm，禁止出现 npm install / yarn add
- 所有新增组件必须有显式的 Props 类型，不允许 any
- src/legacy/ 目录只读，任何改动需要先问
```

不要把整份编码规范粘进去。它本来就会写分号。

> ⚠️ 规则文件**不是**项目根目录的 `agents.md`。这是历史版本文档里的错误写法，路径是 `~/.gemini/GEMINI.md`（全局）与 `.agents/rules` 目录（工作区）。

## 技能（Skills）

技能是**一个目录**，里面放一个 `SKILL.md`：

```
.agents/skills/release-flow/          # 随仓库走
└── SKILL.md

~/.gemini/config/skills/release-flow/ # 全局
└── SKILL.md
```

frontmatter 里 `description` 必填，`name` 可选：

```markdown
---
description: 当需要给这个项目发版时使用，覆盖版本号、changelog、tag 的完整流程
---

# 发版流程

1. 确认 main 分支 CI 全绿
2. 更新 CHANGELOG.md
3. ...
```

**`description` 决定这个技能会不会被用上**，所以它要写成触发条件（"当需要发版时…"），不要写成标题（"发版流程"）。模型是拿它来判断当前任务是否匹配的。

**因为技能是目录**，你可以把脚本、模板、示例数据一起放进去，让 `SKILL.md` 引用它们——这是它和单个提示词文件最大的区别。

> ⚠️ `.agents/skills/xxx.md` 这种扁平单文件写法不会被识别为技能。`.agent/skills`（单数）仅为向后兼容保留，新建请用 `.agents/skills`。

## 工作流（Workflows）

工作流用 `/<workflow-name>` 显式调用。

**和技能怎么分**：触发权归属不同。

- 技能：模型看 `description` 自己决定要不要用
- 工作流：你决定什么时候跑

想让它自动匹配就写技能，想自己掐时间点就写工作流。上线前检查、生成周报这类"必须由人发起"的流程属于后者。

## 子智能体与构件

这两个机制是 Antigravity 处理大任务的关键，也是它和"一个更聪明的补全工具"的分界线。

**异步子智能体（Asynchronous Subagents）**：主智能体派出下级智能体并行干活。价值在于上下文经济——让子智能体各自读一个模块、各自返回结论，主智能体只消费结论而不消费原始文件，同样的窗口能处理大得多的任务。

**构件（Artifacts）**：智能体产出的可审查中间产物，比如计划、任务清单、验证记录。它是自主性的配套刹车：智能体越自主，"它到底打算干什么"就越不透明，构件把黑箱中间态变成你可以读、可以否决的东西。

<!-- TODO: 待核实 —— 官方是否规定了子智能体的并发数量上限。抓取到的官方文档只描述了能力，未找到官方说明给出具体数字 -->

## 典型工作流：跨模块重构

这是 Antigravity 相对其他工具优势最明显的场景，因为上面两个机制正好对上它的风险。

```
1. 描述目标与验收标准，让它先产出计划构件
       ↓
2. 读计划，否决方向不对的部分     ← 关键的人工卡点
       ↓
3. 放它执行（子智能体可并行读多个模块）
       ↓
4. 用它的验证记录判断该信多少，再自己复核关键改动
```

**开跑前确认工作区是干净的。** 并发意味着改动来自多个方向，事后你分不清哪处是谁改的。

## 常见问题

**规则明明写了它却不遵守**：先确认激活模式。Manual 模式的规则不会自动加载；Glob 模式要确认当前改的文件真的匹配上了模式。

**技能没被触发**：`description` 写成了标题而不是触发条件。改成"当…时使用"的句式。

**上下文很快就满**：Always On 的规则太多。把技术栈相关的挪到 Glob。

## 与其他产品怎么选

Antigravity（本地、你实时对话）vs Code Assist（IDE 内、编辑器触发）vs Jules（云端、异步产出 PR）的完整对比表见 [速查表](./gemini-cheatsheet#antigravity-vs-code-assist-vs-jules)，本页不重复。

一句话版本：**要边看边验证的本地大改动用 Antigravity，丢出去等 PR 用 [Jules](./jules)，编辑器里的小范围改动用 [Code Assist](./code-assist)。**

## 官方资源

- [Antigravity 文档首页](https://antigravity.google/docs/home)
- [规则与工作流](https://antigravity.google/docs/rules-workflows)
- [技能](https://antigravity.google/docs/skills)

## 相关页面

- [速查表](./gemini-cheatsheet) — 规则/技能路径速查、跨产品决策表
- [术语表](./gemini-glossary) — Surface、Rules、Skill、Subagent、Artifact 的概念定义
- [Cookbook](./gemini-cookbook#_11-跨模块重构-需要边看边验证) — 跨模块重构配方
