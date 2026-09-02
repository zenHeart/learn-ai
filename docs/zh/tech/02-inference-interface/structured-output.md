---
title: 结构化输出
description: "输出要进代码，就用 JSON Schema 约束解码加调用方验证层；提示里吼「必须是合法 JSON」不是合同。含零 key 可运行验证循环示例。"
domain: tech
tags: [contracts, structured-output, json-schema]
navOrder: 23
topicId: structured-output
layer: "2"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [prompt]
next: [tool-calling]
specVersion: "JSON Schema (draft-07 subset per provider)"
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 结构化输出

> **在哪一组**：推理与接口组 ｜ **上一组出口**：能把一条模糊需求改写成四要素齐全、可验收的提示 ｜ **本页出口**：能写出 JSON Schema 输出合同、在调用方加验证层与失败重试，并知道两类失败（拒答与截断）的验收方式
> **前置**：[prompt](../03-context/prompt) ｜ **下一步**：[tool-calling](../05-action/tool-calling)

## 1. 概述

**结论**：只要模型输出要进 `JSON.parse` 之后的代码，就把输出形状定义成 **JSON Schema（JSON Schema，一种描述 JSON 数据结构的规范）合同**，用厂商的约束解码执行，并在调用方保留独立验证层。在提示里写「请务必输出合法 JSON」不是合同——它没有机器可判定的失败条件。

本页的验证循环可以零 API key 运行：完整闭环加全部负例（缺字段、多余字段、类型错误）都有确定性演示。

### 心智模型：两条路线，一个不变量

```text
路线 A：提示约定（软约束）
  prompt「请输出 JSON」 ──采样自由──▶ 任意文本 ──▶ JSON.parse ──▶ ❌ 可能带 ```json 围栏、缺逗号、多客套话

路线 B：Schema 约束解码（硬约束）
  json_schema + strict ──解码时按 schema 采样──▶ 必然符合 schema 的文本 ──▶ JSON.parse ──▶ ✅ 形状有保证

不变量（两条路线都成立）：
  调用方验证层永远存在 —— 厂商保证的是「形状」，语义（日期是否合理、字段是否自洽）仍归你
```

两条路线不是二选一的宗教问题，而是三档保证：提示约定（无保证）、JSON mode（只保证可 parse）、schema 约束（保证形状）。三档的工程含义见下方决策表。

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 要把模型输出接进 TypeScript / 数据库 / 下游 API 的前端与全栈工程师 |
| **何时用** | 数据抽取、分类打标、要进代码的任何字段、生成 UI 的分段数据 |
| **何时不用** | 给人看的散文回答（自由文本即可）；要执行的动作请求 → [tool-calling](../05-action/tool-calling.md)；需要外部事实先接地 → [RAG](../04-grounding/rag.md) |
| **不是本页** | 模型为何能被语法约束（采样与解码机制）→ Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)；评估输出质量 → [evaluation](../08-production/evaluation.md) |

### 决策表：三档保证怎么选

| | 提示里写「输出 JSON」 | JSON mode | Schema 约束解码 |
|---|---|---|---|
| **保证什么** | 无。常见 ```json 围栏、缺逗号、前后客套话 | 只保证能 `JSON.parse` | 保证字段、类型、必填符合 schema |
| **控制权在哪** | 完全在采样概率里 | 厂商解码器（只管括号配对） | 厂商解码器 + 你的 schema |
| **状态** | 每次请求重新赌 | 同左 | 确定性合同，可进 CI |
| **信任域** | 不可信任 | 只信任「是 JSON」 | 信任形状，不信任语义 |
| **最低复杂度** | 最低，但故障率不可控 | 低，已被官方标为旧路径（OpenAI 建议总是用 Structured Outputs 替代 JSON mode） | 略高（要维护 schema），产品默认档 |

**版本里程碑**（均来自官方文档，检索日期 2026-09-01）：OpenAI Structured Outputs 自 `gpt-4o-mini-2024-07-18` 与 `gpt-4o-2024-08-06` 起支持 `response_format: json_schema`；Anthropic 结构化输出已从公开 beta 转正（参数为 `output_config.format`；早期 beta 头 `structured-outputs-2025-11-13` 与旧参数名 `output_format` 已不出现在 2026-09-01 的文档中），覆盖 Sonnet 4.5/4.6/5、Opus 4.5–4.8/5、Fable 5、Mythos 5、Haiku 4.5。除此之外的采用率与时间线：未验证。

## 2. 使用

### 最小实战：零 key 的「schema → mock 模型 → 验证 → 失败重试」循环

15 分钟，Node 22 LTS，无任何依赖与密钥。mock 模型是确定性的（固定输入固定输出）：第一次返回坏输出，收到验证错误反馈后返回好输出——演示验证层必须存在、重试如何闭合。

**setup**：新建目录，把下面代码存为 `structured-output.ts`（fixture 同源：`npx tsx@4 structured-output.ts`）。

```ts
// fixture: 与真实 API 的 json_schema 参数同构；mock 为确定性函数
type Ticket = {
  severity: 'low' | 'medium' | 'high'
  area: 'ui' | 'api' | 'auth' | 'other'
  summary: string
  nextAction: string
}

const ticketSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    severity: { type: 'string', enum: ['low', 'medium', 'high'] },
    area: { type: 'string', enum: ['ui', 'api', 'auth', 'other'] },
    summary: { type: 'string' },
    nextAction: { type: 'string' }
  },
  required: ['severity', 'area', 'summary', 'nextAction']
} as const

// 真实系统里这里换成厂商调用并传同一个 schema：
//   openai.chat.completions.create({ response_format: { type: 'json_schema',
//     json_schema: { name: 'ticket', strict: true, schema: ticketSchema } } })
//   或 Anthropic 的 output_format。mock 刻意「第一次犯错」：演示验证层必须存在。
const RAW_BAD_ATTEMPT =
  '{"severity": 2, "area": "auth", "summary": "忘记密码按钮在 Chrome 128 上无响应", "confidence": "high"}'
const RAW_GOOD_ATTEMPT =
  '{"severity": "high", "area": "auth", "summary": "忘记密码按钮在 Chrome 128 上无响应", "nextAction": "向用户要：点击后的控制台报错与网络面板截图"}'

/** 无重试反馈 → 坏输出；带验证错误反馈 → 修正输出。固定输入固定输出，可复现。 */
function mockModelCall(retryFeedback: string | null): string {
  if (retryFeedback === null) return RAW_BAD_ATTEMPT
  return RAW_GOOD_ATTEMPT
}

// 调用方验证层（最小实现；生产用 Zod / ajv）
type ValidationIssue = { path: string; problem: string }

function validateTicket(candidate: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (typeof candidate !== 'object' || candidate === null || Array.isArray(candidate)) {
    return [{ path: '$', problem: 'expected a JSON object' }]
  }
  const obj = candidate as Record<string, unknown>
  const allowedKeys = Object.keys(ticketSchema.properties)

  for (const key of Object.keys(obj)) {
    if (!allowedKeys.includes(key)) {
      issues.push({ path: `$.${key}`, problem: 'additional property not allowed by schema' })
    }
  }
  for (const key of allowedKeys) {
    if (!(key in obj)) {
      issues.push({ path: `$.${key}`, problem: 'required field is missing' })
      continue
    }
    const value = obj[key]
    if (key === 'severity' || key === 'area') {
      const enumValues = [...ticketSchema.properties[key].enum]
      if (typeof value !== 'string' || !enumValues.includes(value)) {
        issues.push({
          path: `$.${key}`,
          problem: `expected one of ${enumValues.join(' | ')}, got ${JSON.stringify(value)}`
        })
      }
    } else if (typeof value !== 'string') {
      issues.push({ path: `$.${key}`, problem: `expected string, got ${typeof value}` })
    }
  }
  return issues
}

function buildRetryFeedback(issues: ValidationIssue[]): string {
  return issues.map((i) => `- ${i.path}: ${i.problem}`).join('\n')
}

// 生成 → 验证 → 失败重试循环
function extractTicket(maxAttempts = 3): Ticket {
  let retryFeedback: string | null = null
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const raw = mockModelCall(retryFeedback)
    console.log(`[attempt ${attempt}] raw model output:`)
    console.log(raw)

    const candidate: unknown = JSON.parse(raw)
    const issues = validateTicket(candidate)
    if (issues.length === 0) {
      console.log(`[attempt ${attempt}] schema validation: PASS`)
      return candidate as Ticket
    }

    console.error(`[attempt ${attempt}] schema validation: REJECTED`)
    for (const issue of issues) console.error(`  ✗ ${issue.path}: ${issue.problem}`)

    retryFeedback = buildRetryFeedback(issues)
    console.log(`[attempt ${attempt}] retry prompt will carry:\n${retryFeedback}\n`)
  }
  throw new Error(`schema validation still failing after ${maxAttempts} attempts — escalate, do not parse`)
}

const ticket = extractTicket()
console.log('\naccepted ticket:')
console.log(JSON.stringify(ticket, null, 2))
```

**运行命令**：

```bash
npx tsx@4 structured-output.ts
```

**正常输出**（节选；负例输出同场演示——第一次尝试被拒）：

```text
[attempt 1] raw model output:
{"severity": 2, "area": "auth", "summary": "忘记密码按钮在 Chrome 128 上无响应", "confidence": "high"}
[attempt 1] schema validation: REJECTED
  ✗ $.confidence: additional property not allowed by schema
  ✗ $.severity: expected one of low | medium | high, got 2
  ✗ $.nextAction: required field is missing
[attempt 1] retry prompt will carry:
- $.confidence: additional property not allowed by schema
...

[attempt 2] raw model output:
{"severity": "high", "area": "auth", "summary": "忘记密码按钮在 Chrome 128 上无响应", "nextAction": "向用户要：..."}
[attempt 2] schema validation: PASS

accepted ticket:
{
  "severity": "high",
  "area": "auth",
  "summary": "忘记密码按钮在 Chrome 128 上无响应",
  "nextAction": "向用户要：点击后的控制台报错与网络面板截图"
}
```

三类负例在同一输出里可见：**多余字段**（`confidence`）、**类型错误**（`severity` 是数字不是枚举字符串）、**缺字段**（`nextAction`）。三者都被验证层拒收并进入重试。

**验收命令**：连续运行两次，输出逐字节一致（mock 确定性）——这就是把「输出可控」变成回归测试的最小形态：

```bash
npx tsx@4 structured-output.ts > run1.txt && npx tsx@4 structured-output.ts > run2.txt && diff run1.txt run2.txt && echo DETERMINISTIC
```

**清理**：删除临时目录与 `run1.txt` / `run2.txt`。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：抽取工单 | 用户反馈文本 | schema + 系统提示 | `Ticket` 对象 | 表单、打标、分单 | 长篇散文回答 |
| 常见：嵌套结构 | 多步推理任务 | `steps[]` + `final_answer` 的嵌套 schema | 分步结构 | 教学讲解、链路说明 | 键极多（>100）的宽表 |
| 组合：抽取 + 动作 | 既抽工单又要建 issue | 本页 schema + [tool-calling](../05-action/tool-calling.md) 工具 schema | 结构化回复 + 工具调用 | Agent 工作流（Anthropic 官方明确两者可同请求并用） | 只需其中之一时不要都开 |

## 3. 原理

### 约束解码是什么

厂商在**解码阶段**把你的 schema 编译成语法约束，逐 token 采样时只允许产生符合语法的 token 序列。OpenAI 的表述是「确保模型始终生成符合你提供的 JSON Schema 的响应」；Anthropic 的表述是「带已编译语法产物的约束采样（constrained sampling with compiled grammar artifacts）」。所以这不是「提示得更凶」，而是把合同下沉到了采样器。

推导为何可行的部分（语法 → 自动机 → 掩码）属于模型内部机制，本仓停止于此，继续去 [Learn LLM 第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。

### 厂商差异表（以 2026-09-01 检索到的官方文档为准）

| 维度 | OpenAI | Anthropic |
|---|---|---|
| 输出格式参数 | `response_format: { type: 'json_schema', json_schema: { name, strict: true, schema } }`（Chat Completions）；`text.format`（Responses API） | `output_config.format: { type: 'json_schema', schema }`（2026-09-01 文档；旧参数名 `output_format` 与 beta 头已不再出现） |
| 工具参数约束 | function 定义上 `strict: true`（官方建议总是开启） | tool 定义上 `strict: true`（同一 beta） |
| 支持的关键字 | 类型 + `enum` + `anyOf`；string 的 `pattern` / `format`（date-time、email、uuid 等）；number 的 `minimum` / `maximum` 等；array 的 `minItems` / `maxItems` | JSON Schema 子集；Python/TS SDK 会自动剥离不支持的关键字（如 `minimum`、`maxLength`），把约束改写进字段 description，再由 SDK 按你的原始 schema 做客户端校验 |
| 硬性限制 | 根必须是 object（不能 `anyOf`）；所有字段必须 `required`（可选字段用 `type: ['string', 'null']` 模拟）；对象必须 `additionalProperties: false`；≤5000 个属性、≤10 层嵌套、≤1000 个枚举值 | 显式复杂度上限：strict 工具 ≤20、可选参数 ≤24、union 类型参数 ≤16；超出或编译语法过大 → 400（`Schema is too complex for compilation`，编译超时上限 180 秒） |
| 明确不支持 | `allOf` / `not` / `if` / `then` / `else` / `dependentRequired` / `dependentSchemas`；微调模型暂不支持 `pattern` / `format` / 数值与数组约束 | 与 Citations 同用会 400；与 assistant 消息预填充（prefill）不兼容 |
| 失败语义 | 安全拒答可编程检测（refusal）；`max_tokens` 截断时输出可能不完整 | `stop_reason: 'refusal'`（HTTP 200、照常计费、输出可不符 schema）；`stop_reason: 'max_tokens'` 截断；枚举值大小写不保证精确匹配（官方建议枚举比较用大小写不敏感） |
| 其他特性 | 首次请求需处理 schema（额外延迟），同 schema 后续请求无额外延迟；输出键顺序与 schema 一致 | 首次请求需编译语法（额外延迟），编译缓存 24 小时；仅改 `name` / `description` 不失效缓存 |

开放模型生态同样有约束解码实现（[outlines](https://dottxt-ai.github.io/outlines/)、[xgrammar](https://github.com/mlc-ai/xgrammar)，检索 2026-09-01 均 200）；框架层（如 [Vercel AI SDK `generateObject`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)）把多厂商差异抽象成统一的 schema 入参。**逐家的支持子集会漂移**——上表的某一行可能在几个月后变化，接入前以官方文档当日为准。

### 规范要求 vs 本地实测

| 规范/官方断言 | 本仓 fixture 实测（零 key mock） |
|---|---|
| 约束解码保证形状 | mock 不接真厂商；验证层逻辑与真实响应同构（缺/多/类型错三类拒绝均触发） |
| OpenAI：所有字段必须 required、可选字段用 null 联合 | fixture 的 schema 全字段 required，与该约束一致 |
| Anthropic：refusal 返回 200 且照常计费 | 未实测（需真实 API）；工程含义已写进 runbook R1 的证据采集步骤 |
| 失败重试应携带机器可读的错误反馈 | fixture 的 `buildRetryFeedback` 即该模式的最小实现 |

### 关键不变量

1. **形状合同在 API 参数里，不在提示里**。提示只写行为（「缺信息就去要」），字段合同以 schema 为准。在提示里再画一遍 schema 会造成第二事实源。
2. **验证层永远在调用方**。厂商保证形状；跨字段语义（`startDate < endDate`）、业务约束（金额为正）仍要本地校验。
3. **失败必须显式**。拒绝路径有三种出口：重试（带错误反馈）、升级（日志 + 人工）、终止（明确报错）。禁止「解析失败就当空对象继续跑」。

## 4. 开发

### 集成要点

1. **schema 是代码**：与消费它的 TypeScript 类型同仓库、同 PR、同 review。改字段名 = breaking change，测试必须红。
2. **模型 pin 快照**：能力与支持的关键字集跟模型走，生产环境 pin 具体快照号，不写浮动别名。
3. **兼容矩阵**：跨厂商时把上表收敛成你自己的适配层——同一份业务 schema，按厂商剥离不支持关键字（Anthropic SDK 已内置此行为，OpenAI 需自查支持表）。
4. **回滚**：schema 变更走双写（新旧字段并存一个版本）+ 下游兼容读取，比直接删字段安全。

### 调试 runbook

#### R1 生产偶发解析失败

**症状**：监控里 `JSON.parse` 异常或字段缺失告警零星出现，多数请求正常。
**证据**：采样失败请求的原始响应体 + `stop_reason` / `finish_reason`。三种根因要分开：输出带围栏或前后缀（走了提示约定路线或旧 JSON mode）；`refusal`（Anthropic 返回 200 且计费，OpenAI 有可编程检测的 refusal 字段）；`max_tokens` 截断（输出不完整）。
**处理**：围栏问题 → 切到 strict `json_schema` 路线；refusal → 按业务决定人工复核或改写触发输入，不要重试同样内容；截断 → 提高输出 token 预算或拆小输出。
**完成标准**：解析失败率归零或归因到可解释类别；CI 里保留一条「坏输出必被拒」的 fixture 回归。

#### R2 请求直接 400：schema 被拒

**症状**：换 schema 后所有请求 400，模型一个 token 都没出。
**证据**：错误体。OpenAI 会指明不支持的关键字（如 `allOf`）；Anthropic 报 `Schema is too complex for compilation`（显式上限：strict 工具 20、可选参数 24、union 参数 16）。
**处理**：去掉 `allOf` / `not` / `if-then`，改写为扁平结构或 `anyOf`；拆小 schema；减少严格模式的工具数量（Anthropic 明示此解法）。
**完成标准**：同一业务字段下 200 恢复；把被拒关键字记入团队 schema 约定。

#### R3 形状对、语义错

**症状**：schema 验证全绿，但下游发现 `endDate` 早于 `startDate`、金额为负。
**证据**：本地语义校验的失败样本（这一步证明验证层只管形状）。
**处理**：在调用方加语义断言；失败时带语义错误重试（复用 fixture 的 retry feedback 模式），仍失败则升级。
**完成标准**：语义校验失败率可观测；重试后通过率回升；同类问题进入回归集。

#### R4 首请求延迟异常高

**症状**：新 schema 上线后 p99 延迟尖刺，只出现在首次请求。
**证据**：按 schema 维度分组的延迟分布（Anthropic：首次需编译语法，之后缓存 24 小时）。
**处理**：保持 schema 与工具集稳定复用缓存；仅改 `name` / `description` 不触发重编译；预热（上线后主动打一次请求）。
**完成标准**：p99 恢复到稳态区间；告警关闭。

### 反模式清单

- **把 JSON mode 当 schema**：能 parse ≠ 有 `area` 字段。OpenAI 官方建议总是用 Structured Outputs 替代 JSON mode。
- **提示里再画一遍 schema**：第二事实源，漂移只是时间问题。
- **假设两家对所有 JSON Schema 关键字行为一致**：`pattern` 在 OpenAI 已支持、Anthropic 靠 SDK 剥离后本地兜底——逐家核对，别凭记忆。
- **用 assistant prefill 卡 `{`**：Anthropic 明确 prefill 与 JSON outputs 不兼容。
- **解析失败静默吞掉返回空对象**：把「输出可控」退化成「错误不可见」。
- **把「测试一次通过」当合同**：单次通过是采样运气；确定性 fixture + CI 回归才是。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [JSON Schema 入门](https://json-schema.org/learn/getting-started-step-by-step) ｜ [OpenAI Structured Outputs 指南](https://developers.openai.com/api/docs/guides/structured-outputs) | 先会说 schema 的语言（type/properties/required），再看厂商怎么执行它 |
| Builder | [Anthropic Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) ｜ [Vercel AI SDK 结构化数据](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) ｜ 本页 fixture 跑通后接真厂商 | 两家参数差异 + 框架抽象层的统一入口 |
| Operator | [OpenAI 支持的 schema 子集全表](https://developers.openai.com/api/docs/guides/structured-outputs)（Supported schemas 节） ｜ [Anthropic beta 说明与兼容性](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)（Important considerations 节） | 上线前逐关键字核对的清单；refusal / 截断 / 400 的官方语义 |
| Researcher | [JSON Schema 规范](https://json-schema.org/specification) ｜ [outlines](https://dottxt-ai.github.io/outlines/) ｜ [xgrammar](https://github.com/mlc-ai/xgrammar) ｜ Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) | 约束解码的规范源头与开放实现；采样器为何能被语法约束 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| OpenAI Structured Outputs | L1 | https://developers.openai.com/api/docs/guides/structured-outputs | 官方路线 B 参数与支持子集 | strict json_schema、三档对比、refusal、键顺序 | 接真 API 替换 fixture 的 mock |
| Anthropic Structured outputs | L1 | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | output_format + strict tool use 双轨 | beta 头、SDK 剥离策略、400 语义、24h 语法缓存 | 同上 |
| JSON Schema 入门 | E | https://json-schema.org/learn/getting-started-step-by-step | schema 语言速成 | type / properties / required 基础 | 写第一个业务 schema |
| JSON Schema 规范 | L4 | https://json-schema.org/specification | 关键字权威定义 | 各关键字语义 | 争关键字行为时回这里 |
| Vercel AI SDK 结构化数据 | L1 | https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data | 框架层统一抽象 | generateObject / schema 入参 | 多厂商切换时引入 |
| outlines | L2 | https://dottxt-ai.github.io/outlines/ | 开放模型约束解码 | 开源实现存在且活跃 | 自托管模型时评估 |
| xgrammar | L2 | https://github.com/mlc-ai/xgrammar | 高性能语法约束 | 开源实现存在且活跃 | 同上 |

（以上 URL 检索日期均为 **retrievedAt: 2026-09-01**，当日全部 200。）

### 主动证伪与未决问题

- Anthropic 参数名与 beta 状态已按 2026-09-01 复核更新（`output_format` → `output_config.format`，beta 头移除，模型面扩展到 Fable 5 / Mythos 5）；若你的代码仍用旧参数，以官方迁移说明为准。
- 本页 mock 未接真实厂商。refusal 的 200-计费行为、语法编译首延迟只有官方文档佐证，未实测——接真 key 后先各跑一条拒答与截断样本再信。
- OpenAI 对 `pattern` / `minimum` 的支持是后加的；旧资料（含本仓被本页取代的旧页）仍写着「收下但不强制」，已按 2026-09-01 文档更正。子集会继续漂移，复核周期建议 ≤ 6 个月。
- 未决：嵌套 anyOf 根对象的官方推荐改写方式（两家文档都禁止根 anyOf，等价写法没有单一标准答案）。

### learn-ai 到此为止 / 继续去哪

- 输出合同解决了「形状」；下一步让模型发起**动作请求** → [tool-calling](../05-action/tool-calling.md)。
- 输出需要引用私有/新鲜事实 → [RAG](../04-grounding/rag.md)。
- 把 schema 回归纳入发布证据 → [evaluation](../08-production/evaluation.md)（桥接 evals.zenheart.site）。
- 约束解码的采样机制 → Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。
