---
title: 提示词工程
description: "把意图写成模型可执行的指令契约：任务、约束、示例、输出格式四要素；提示是代码——进版本库、有类型、可测试。"
domain: tech
tags: [contracts, prompt]
navOrder: 31
topicId: prompt
layer: "3"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [tech-map]
next: [context-window]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 提示词工程

> **在哪一组**：Context 组 ｜ **上一组出口**：能定位问题域、受众和下一入口 ｜ **本页出口**：能把一条模糊需求改写成四要素齐全、可验收的提示，并把提示当代码管理（版本化、类型化、可回归）
> **前置**：[tech-map](../index.md) ｜ **下一步**：[上下文窗口](context-window.md)

## 1. 概述

**结论**：提示写不清楚，换模型救不了。提示是「指令契约」：**任务、约束、示例、输出格式**四要素写全，行为才有最小可复现基础。提示解决「怎么表达意图」；「这一轮给模型看什么内容」是 [context](context-engineering.md) 的事；「输出形状必须可 parse」是 [structured-output](../02-inference-interface/structured-output.md) 的事。

### 心智模型：developer 消息是函数定义，user 消息是参数

OpenAI 官方给出的类比（检索 2026-09-01）：developer / system 消息像编程语言里的**函数定义**（系统规则与业务逻辑），user 消息像**传给函数的参数**。这解释了为什么「永远成立的规则」要放 system / developer，而「这一次的数据」放 user——工单正文不该和分类规则揉在一起。

```text
┌────────────────────── 一次请求的指令契约 ──────────────────────┐
│ system / developer（函数定义，优先级高）                        │
│   # 任务      做什么、改哪个对象、期望终态                       │
│   # 约束      边界：能动什么、不能动什么                          │
│   # 示例      输入→输出对（模型会跟示例的格式跑）                 │
│   # 输出格式  要进代码 → schema；给人看 → 格式要求               │
├──────────────────────────────────────────────────────────────┤
│ user（参数，每轮变化）                                          │
│   <input>这一次的原始数据</input>                               │
└──────────────────────────────────────────────────────────────┘
```

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 用编码助手（Cursor / Claude Code / Copilot）或把模型接进产品的前端 / 全栈 |
| **何时用** | 一切「让模型按意图行为」的起点；本层其余三题都建立在提示写清之上 |
| **何时 prompt 不够** | 需要外部事实 → [context](context-engineering.md) 与 [RAG](../04-grounding/rag.md)；需要执行动作 → [tool-calling](../05-action/tool-calling.md)；输出要稳定 parse → [structured-output](../02-inference-interface/structured-output.md)；风格 / 领域知识要固化进权重 → 微调（方向见决策表） |
| **不是本页** | 注意力 / few-shot 为何有效的机制 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)；某厂商产品写法 → Products 区 |

### 决策表：改提示、改上下文还是微调

| | 改提示（prompt） | 改输入内容（context） | 微调（fine-tune） |
|---|---|---|---|
| **方向** | 改「怎么说」 | 改「给什么看」 | 改「模型本身」 |
| **控制权** | 完全在你（文本） | 完全在你（组装） | 部分交给训练过程 |
| **状态** | 每次请求携带 | 每次请求组装，可动态 | 固化进权重，难回滚 |
| **信任域** | 可版本化、可 diff | 数据新鲜度需要治理 | 需要数据集与评估门 |
| **最低复杂度** | 最低，永远先试 | 中（要管理来源与预算） | 最高，前两者失效后再考虑 |
| **典型症状** | 行为不稳、答非所问 | 答案缺私有 / 新事实 | 格式与风格始终学不会 |

**版本里程碑**：未验证（提示技术的演化时间线无一手证据，不编造；OpenAI 已宣布废弃可复用 Prompt 对象——创建自 2026-06-03 起弱化、`v1/prompts` 计划 2026-11-30 关闭，此为官方文档明示日期，检索 2026-09-01）。

## 2. 使用

### 最小实战：四要素 lint + 提示渲染器（零 key）

15 分钟，Node 22 LTS。演示两件事：四要素缺失可以被机器检出；提示由类型化规格**确定性渲染**，因此可以 diff、可以进 CI。

**setup**：存为 `prompt.ts`，运行 `npx tsx@4 prompt.ts`。

```ts
// fixture: 提示规格（类型即契约）+ 确定性渲染 + 四要素 lint
type PromptSpec = {
  task: string
  constraints: string[]
  acceptance: string[]
  nonGoals: string[]
  example?: { input: string; output: string }
}

/** 同一规格永远产出同一提示文本（可 diff、可缓存、可回归）。 */
function renderPrompt(spec: PromptSpec): string {
  const sections: string[] = [
    '# 任务', spec.task, '',
    '# 约束', ...spec.constraints.map((c) => `- ${c}`), '',
    '# 验收', ...spec.acceptance.map((a) => `- ${a}`)
  ]
  if (spec.nonGoals.length > 0) {
    sections.push('', '# 非目标', ...spec.nonGoals.map((n) => `- ${n}`))
  }
  if (spec.example) {
    sections.push('', '# 示例',
      `<input>${spec.example.input}</input>`,
      `<output>${spec.example.output}</output>`)
  }
  return sections.join('\n')
}

// 契约 lint：四要素缺失可以被机器检出
function lintPromptSpec(spec: PromptSpec): string[] {
  const issues: string[] = []
  if (spec.task.trim().length < 12 || !spec.task.includes('：')) {
    issues.push('task: 未指明改动对象与现象（应形如「对象：现象 → 期望」），助手无法定位文件')
  }
  if (spec.constraints.length === 0) {
    issues.push('constraints: 为空 — 没有边界，助手可能重写整个模块')
  }
  if (spec.acceptance.length === 0) {
    issues.push('acceptance: 为空 — 没有「完成」的可判定标准，无法验收')
  }
  if (spec.nonGoals.length === 0) {
    issues.push('nonGoals: 为空 — 未声明非目标，默认一切皆可改')
  }
  return issues
}

const vagueSpec: PromptSpec = {
  task: '帮我改一下设置页',
  constraints: [],
  acceptance: [],
  nonGoals: []
}

const preciseSpec: PromptSpec = {
  task: '修复设置页「保存」按钮：深色模式下白底白字、可点击但不可见 → 恢复可辨识对比度',
  constraints: ['只改 src/pages/Settings.vue 及其引用的 token', '不改亮色模式', '不引入新 CSS 框架'],
  acceptance: ['深色主题下按钮对比度肉眼可辨', 'pnpm test 仍绿'],
  nonGoals: ['不重写整个设置页'],
  example: {
    input: '深色模式下点保存，什么都没看到但保存成功了。',
    output: '已定位 Settings.vue 中硬编码的 #fff 背景；替换为 --color-surface token，对比度恢复。'
  }
}

for (const [name, spec] of [
  ['vague（改前）', vagueSpec],
  ['precise（改后）', preciseSpec]
] as const) {
  console.log(`\n=== ${name} ===`)
  const issues = lintPromptSpec(spec)
  if (issues.length === 0) {
    console.log('lint: PASS（四要素齐备）')
  } else {
    console.error('lint: FAIL')
    for (const issue of issues) console.error(`  ✗ ${issue}`)
  }
}

console.log('\n=== renderPrompt(preciseSpec) 产出（进版本库的最终提示） ===')
console.log(renderPrompt(preciseSpec))
```

**正常输出**（节选）：

```text
=== precise（改后） ===
lint: PASS（四要素齐备）

=== renderPrompt(preciseSpec) 产出（进版本库的最终提示） ===
# 任务
修复设置页「保存」按钮：深色模式下白底白字、可点击但不可见 → 恢复可辨识对比度
...
```

**负例输出**（四要素缺失被检出）：

```text
=== vague（改前） ===
lint: FAIL
  ✗ task: 未指明改动对象与现象（应形如「对象：现象 → 期望」），助手无法定位文件
  ✗ constraints: 为空 — 没有边界，助手可能重写整个模块
  ✗ acceptance: 为空 — 没有「完成」的可判定标准，无法验收
  ✗ nonGoals: 为空 — 未声明非目标，默认一切皆可改
```

**验收命令**：渲染输出两次 diff 为空（确定性；stderr 的 FAIL 行不进文件，stdout 两轮一致）：

```bash
npx tsx@4 prompt.ts > a.txt && npx tsx@4 prompt.ts > b.txt && diff a.txt b.txt && echo STABLE
```

**清理**：删除 `a.txt` / `b.txt`。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：编码助手单任务 | 「帮我改一下设置页」 | 按四要素重写后发送 | 可验收的修改 | 日常开发 | 跨仓库长任务 |
| 常见：产品提示函数 | 用户反馈流 | `buildTicketPrompt(feedback)` + schema | 稳定工单对象 | 生产管道 | 一次性使用（直接写对话里更快） |
| 组合：仓库级约定 | 团队多条铁律 | 落 `AGENTS.md`（见 [context](context-engineering.md)），当次任务仍写对话 | 跨工具一致行为 | 团队协作 | 当次任务细节 |

## 3. 原理

### 四要素为什么是这个顺序

1. **任务**先行：模型先要定位「改哪个对象、什么现象、什么终态」。没有对象的任务产生全仓漫游。
2. **约束**划界：能动什么、不能动什么。约束是「最小爆炸半径」的声明。
3. **示例**对齐格式：模型会模仿示例的格式与风格——**示例必须与指令同一格式**，指令要 JSON 而示例是散文时，模型跟着示例跑。Anthropic 的建议（检索 2026-09-01）是精选少量多样、典型的示例（canonical examples），而不是堆砌边界案例清单；官方原话把示例称作「对 LLM 而言抵千言的图片」。
4. **输出契约**收口：给人看的写格式要求；给代码看的上 schema（[structured-output](../02-inference-interface/structured-output.md)）。

### 角色层级与「正确高度」

- 消息优先级：developer / system > user > assistant（OpenAI 模型规范与 Anthropic 文档一致）。规则放高层、数据放 user。
- **正确高度（right altitude）**是 Anthropic 给 system 提示的守则：过于具体（把 if-else 硬编码进提示）脆弱且难维护；过于抽象（含糊的高层指导）给不出行为信号。落点：足够具体以引导行为，足够通用以充当启发式——写「遇到问题时如何思考」，而不是枚举「每种情况下怎么做」。
- **最小信息集**：先拿最强模型 + 最小提示试跑，按失败模式逐步补示例与规则。最小不等于短。

### prompt-as-code：为什么提示要住在代码里

OpenAI 官方指引（检索 2026-09-01）：把生产提示存在应用代码里而不是控制台 / 可复用 Prompt 对象——代码管理的提示有类型输入、code review、测试与正常发布流程；同时官方已宣布废弃 Prompt 对象（创建自 2026-06-03 起弱化，`v1/prompts` 计划 2026-11-30 关闭）。配套要求：**pin 模型快照**并建立测试 / 评估集，模型升级时才能看到行为漂移。

### 规范要求 vs 本地实测

| 官方/规范断言 | 本仓 fixture / 实践 |
|---|---|
| developer 消息优先级高于 user | fixture 的渲染把规则放 system 段、数据放 `<input>` 段，结构一致 |
| 示例与指令同格式 | precise 规格的 example 用与输出一致的表述；lint 不检查此项（需要人工 review） |
| 生产提示进代码 | `renderPrompt(spec)` 即「提示由规格渲染」的最小实现 |

### 关键不变量

1. **一份提示一个所有者**：同一业务只有一个 `renderPrompt`；对话里手打、控制台里存的副本都会漂移。
2. **改提示 = 改代码**：走 PR、过 review、跑回归，不在线上热改。
3. **验收可判定**：提示里的「完成」必须能翻译成命令或可观察条件，否则不可验收。

## 4. 开发

### 集成要点

1. **提示构建器靠近使用它的功能**：小模块、类型化入参、动态值（用户数据、任务选项）走参数不走字符串拼接。
2. **换模型时改什么**：多数情况只调三类——主动程度（要不要多问）、啰嗦程度（输出长度）、停止条件（何时收尾）；四要素骨架不动。
3. **提示与评估成对**：改提示必须能回答「怎么证明没改坏」——最小形态是固定输入 + 期望断言的回归集（进阶 → [evaluation](../08-production/evaluation.md) 桥接）。

### 调试 runbook

#### R1 换模型后行为漂移

**症状**：模型升级后同一提示的输出风格突变：更啰嗦、爱搜索、不听格式要求。
**证据**：固定输入集在旧 / 新快照上的输出 diff；先确认漂移类别（格式 / 长度 / 工具偏好）。
**处理**：按类别调对应段——格式 → 加强示例与输出契约；长度 → 加字数 / 段落约束；行为 → 收紧任务描述。四要素骨架不动。
**完成标准**：回归集在新模型上全绿；漂移归因记录在 PR 描述里。

#### R2 同一规则出现两份，改了一份

**症状**：线上行为只部分变化，或时而正常时而反常。
**证据**：全仓搜索该规则的关键句（grep 规则文本）；发现第二份副本（手打对话模板 / 旧脚本 / 控制台存量）。
**处理**：合并回唯一 `renderPrompt`；第二份删除或改为引用；CI 加 lint（fixture 的 `lintPromptSpec` 思路）防止规格字段退化为空。
**完成标准**：规则文本全仓唯一；删除副本后行为稳定复现。

#### R3 few-shot 示例过时，格式跟着跑偏

**症状**：输出格式慢慢变成示例的老格式，而指令早已更新。
**证据**：diff 当前输出与示例格式——高度相似即「跟示例不跟指令」。
**处理**：更新示例到与指令同格式；示例数量控制在少数典型对；把「示例必须与指令同格式」写进 review 清单。
**完成标准**：输出回到指令规定的格式；回归断言覆盖格式检查。

### 反模式清单

- **技巧名当主食**：CoT / ToT / ReAct 是论文目录。任务都写不清时，技巧不救场。
- **只写禁止不写正向**：`Do not use markdown` 之外要写「用连贯段落作答」。
- **用自然语言硬拧 JSON**：三档保证见 [structured-output](../02-inference-interface/structured-output.md)。
- **把泄露的系统提示当教材**：那是附录样本，不是你的契约。
- **一换模型整页重写**：先跑回归集定性漂移，多数只需微调三处（见 R1）。
- **在控制台改生产提示**：无版本、无 review、无回归——正是 Prompt 对象被废弃的原因。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [Anthropic 提示工程总览](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) ｜ [OpenAI 提示工程指南](https://developers.openai.com/api/docs/guides/prompt-engineering) | 两家官方的第一入口：清晰直接、示例、角色层级 |
| Builder | [Anthropic 交互式教程](https://github.com/anthropics/prompt-eng-interactive-tutorial)（官方顺序：先说清楚，第 4 章才 XML） ｜ [OpenAI Cookbook](https://github.com/openai/openai-cookbook) | 按章动手；官方说先练「说清楚」再练格式技巧 |
| Operator | OpenAI 指南的「prompt as code」与模型 pin 节 ｜ Learn LLM [第 15 章 A4](https://llm.zenheart.site/chapters/15-prompt-memory) | 版本化 / 回归 / 换模型操作面 |
| Researcher | [OpenAI Model Spec](https://model-spec.openai.com/)（消息优先级的规范来源） ｜ Anthropic「正确高度」论述（[context engineering 文章](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)） | 行为优先级与提示设计的原理层 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| Anthropic 提示工程总览 | L1 | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | 官方技巧入口 | 清晰直接 / 示例 / XML / 角色 | 按需下钻单篇 |
| OpenAI 提示工程指南 | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | 官方技巧入口 | developer-user 类比、prompt-as-code、pin 快照、Prompt 对象废弃时间表 | 读 Structured Outputs |
| Anthropic 交互式教程 | L1 | https://github.com/anthropics/prompt-eng-interactive-tutorial | 动手练习 | 官方教学顺序 | 每章做完再进下一章 |
| OpenAI Cookbook | L1 | https://github.com/openai/openai-cookbook | 示例库 | 官方示例存在 | 查具体模式 |
| OpenAI Model Spec | L4 | https://model-spec.openai.com/ | 消息优先级规范 | developer > user 优先级 | 争行为优先级时回这里 |
| Learn LLM 第 15 章 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | 机制层 | 四段式 / few-shot / JSON 三档 / 记忆 | 要「为什么」时读 |

（retrievedAt: 2026-09-01；OpenAI 两个 URL 为 platform.openai.com 301 后的新域。）

### 主动证伪与未决问题

- 本页 lint 是「检查你自己的约定」的示范，启发式（如任务须含冒号）不是普适标准——换语言 / 换团队要重定规则，别当通用门禁。
- 「换模型只改三处」来自本仓维护经验，非官方断言；遇到大版本模型范式变化时应重估。
- 未决：XML 标签的收益随模型能力提升是否持续减弱（Anthropic 文档已有「格式重要性在下降」的表述，无量化证据）。

### learn-ai 到此为止 / 继续去哪

- 提示管「怎么说」；下一题是「这一轮给模型看什么」→ [context](context-engineering.md)。
- 输出要进代码 → [structured-output](../02-inference-interface/structured-output.md)。
- 提示回归如何升级成发布证据 → [evaluation](../08-production/evaluation.md)（桥接 evals.zenheart.site）。
- 注意力与 few-shot 机制 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。
