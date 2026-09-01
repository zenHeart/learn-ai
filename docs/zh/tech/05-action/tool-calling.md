---
title: 工具调用契约
description: "模型只「想调用」，执行永远在你的代码里：tool schema 定义、选择、参数验证、结果回传格式；这个分离是安全边界的基础。"
domain: tech
tags: [contracts, tool-calling, function-calling]
navOrder: 50
topicId: tool-calling
layer: "5"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [structured-output]
next: [model-api, tool-execution]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 工具调用契约

> **在哪一层**：层 1 · 交互契约 ｜ **上一层出口**：能定位问题域、受众和下一入口 ｜ **本层出口**：能定义 tool schema、画出最小消息流、在执行前校验工具名与参数、按契约格式回传结果（含错误）
> **前置**：[structured-output](../02-inference-interface/structured-output.md) ｜ **下一步**：[model-api](../02-inference-interface/model-api.md)、[tool-execution](../05-action/tool-execution.md)

## 1. 概述

**结论**：工具调用（Tool Calling，OpenAI 称 Function Calling）的工程本质是一份**动作请求契约**：模型读到工具清单后，可能产出一条结构化请求（工具名 + 参数 JSON）；**执行它的是你的代码**。「模型想调用」与「系统实际执行」的分离不是实现细节，而是安全边界的基础——所有权限控制都建立在这条缝隙上。

本页只管契约：schema 定义、选择、参数验证、结果回传格式。执行工程（幂等、超时、重试、权限、人工批准）在层 4 [tool-execution](../05-action/tool-execution.md)。

### 心智模型：最小消息流

```text
  你                          模型
  │  ① tools 清单 + user 问题   │
  │ ─────────────────────────▶ │
  │                            │ 评估：需要工具吗？哪个？参数？
  │  ② assistant 消息           │
  │    [tool_use: name/input]  │
  │ ◀───────────────────────── │   ← 模型到此为止，只产生「请求」
  │ ③ 你的代码：白名单 + 参数校验 + 执行
  │ ④ user 消息                 │
  │    [tool_result: 对应 id]   │
  │ ─────────────────────────▶ │
  │  ⑤ assistant 最终回复        │
  │ ◀───────────────────────── │   （或发起新的 tool_use —— 循环）
```

OpenAI 官方把这条流总结为五步（检索 2026-09-01）：带工具发起请求 → 收到 tool call → 应用侧执行 → 带工具输出再请求 → 收到最终回复（或更多 tool call）。Anthropic 的表述同构，用 `stop_reason: "tool_use"` 标记模型停在②。注意官方明示③④是**可选**的——有些工作流只需要模型的调用请求本身。

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 要让模型查询数据、触发动作、操作 UI 的应用与 Agent 开发者 |
| **何时用** | 回答需要训练数据之外的状态（订单、天气、私有库）；要执行动作（发邮件、建 issue） |
| **何时不用** | 只要文本 → 不用工具；只要结构化数据 → [structured-output](../02-inference-interface/structured-output.md)（OpenAI 官方分工：连接系统用 function calling，回复给用户的结构用 response_format）；知识是静态的 → 先试提示 |
| **不是本页** | 执行的安全与可靠性 → [tool-execution](../05-action/tool-execution.md)；协议化工具生态 → [MCP](../07-interoperability/mcp.md) |

### 决策表：structured-output vs tool-calling

| | structured-output | tool-calling |
|---|---|---|
| **方向** | 约束「模型说什么」（最终回复的形状） | 约束「模型想做什么」（动作请求的形状） |
| **控制权** | schema + 解码器 | schema + 你的执行闸门 |
| **状态** | 一次生成 | 多步循环（call → result → …） |
| **信任域** | 形状可信，语义仍校验 | **请求可信 ≠ 执行合理**；执行必须过白名单与权限 |
| **最低复杂度** | 低 | 中（要管理循环与配对） |
| **失败面** | 拒答 / 截断 / schema 400 | 幻觉工具名 / 参数类型错 / 配对断裂 / 执行失败 |

**版本里程碑**（官方文档明示，检索 2026-09-01）：OpenAI strict 模式「底层即 Structured Outputs」，官方建议总是开启；并行函数调用在支持的模型上默认可能一次发多条，`parallel_tool_calls: false` 可强制「零或一次」。Anthropic 的工具调用系统提示对 `auto` / `none` 模式增加约 346 token（`any` / `tool` 约 313）。其他时间线：未验证。

## 2. 使用

### 最小实战：两道闸门 + 完整一轮消息流（零 key）

15 分钟，Node 22 LTS。定义两个 tool schema，mock 模型返回固定 tool call，演示执行前的两道闸门（工具名白名单、参数 schema 校验）与结果回传格式。三个负例：合法调用、幻觉工具名、参数类型错误。

**setup**：存为 `tool-calling.ts`，运行 `npx tsx@4 tool-calling.ts`。

```ts
// fixture: 契约视角的最小消息流；字段与厂商 API 同构
type JsonSchemaProperty = {
  type: 'string' | 'number'
  enum?: string[]
  description: string
}

type ToolDefinition = {
  name: string
  description: string
  input_schema: {
    type: 'object'
    properties: Record<string, JsonSchemaProperty>
    required: string[]
    additionalProperties: false
  }
}

const tools: ToolDefinition[] = [
  {
    name: 'search_orders',
    description:
      '按客户姓名或关键词搜索订单数据库，可按状态过滤。当用户询问订单历史、订单状态时使用。',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '客户姓名或订单关键词' },
        status: {
          type: 'string',
          enum: ['pending', 'shipped', 'delivered'],
          description: '按状态过滤；不确定时省略'
        }
      },
      required: ['query'],
      additionalProperties: false
    }
  },
  {
    name: 'refund_order',
    description: '对指定订单发起退款（金额为单位货币）。仅在用户明确要求退款时使用。',
    input_schema: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: '形如 ORD-123 的订单号' },
        amount: { type: 'number', description: '退款金额，必须为数字' }
      },
      required: ['orderId', 'amount'],
      additionalProperties: false
    }
  }
]

// 确定性 mock 模型：三个场景各返回一个固定 tool_use
type ToolUseBlock = { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }

const MOCK_GOOD_CALL: ToolUseBlock = {
  type: 'tool_use', id: 'toolu_demo_001', name: 'search_orders',
  input: { query: 'Alice', status: 'shipped' }
}
const MOCK_HALLUCINATED_CALL: ToolUseBlock = {
  type: 'tool_use', id: 'toolu_demo_002', name: 'delete_all_orders',
  input: { customerId: 42 }
}
const MOCK_BAD_TYPE_CALL: ToolUseBlock = {
  type: 'tool_use', id: 'toolu_demo_003', name: 'refund_order',
  input: { orderId: 'ORD-77', amount: '9.9' } // amount 应为 number，模型给了 string
}

function mockModelTurn(scenario: 'good' | 'hallucinated-name' | 'bad-type'): ToolUseBlock {
  if (scenario === 'good') return MOCK_GOOD_CALL
  if (scenario === 'hallucinated-name') return MOCK_HALLUCINATED_CALL
  return MOCK_BAD_TYPE_CALL
}

// 执行前的两道闸门：白名单 + 参数校验
type CallIssue = string

function validateToolCall(call: ToolUseBlock, registry: ToolDefinition[]): CallIssue[] {
  const issues: CallIssue[] = []
  const tool = registry.find((t) => t.name === call.name)
  if (!tool) {
    issues.push(`unknown tool "${call.name}" — model request rejected, nothing was executed`)
    return issues
  }
  for (const key of Object.keys(call.input)) {
    if (!(key in tool.input_schema.properties)) {
      issues.push(`${call.name}.${key}: additional property not allowed`)
    }
  }
  for (const key of tool.input_schema.required) {
    if (!(key in call.input)) {
      issues.push(`${call.name}.${key}: required parameter is missing`)
    }
  }
  for (const [key, value] of Object.entries(call.input)) {
    const prop = tool.input_schema.properties[key]
    if (!prop) continue
    if (prop.enum) {
      if (typeof value !== 'string' || !prop.enum.includes(value)) {
        issues.push(`${call.name}.${key}: expected one of ${prop.enum.join(' | ')}, got ${JSON.stringify(value)}`)
      }
    } else if (typeof value !== prop.type) {
      issues.push(`${call.name}.${key}: expected ${prop.type}, got ${typeof value}`)
    }
  }
  return issues
}

// 真实执行体（mock 实现，固定返回）
const executions: Record<string, (input: Record<string, unknown>) => unknown> = {
  search_orders: (input) => ({
    matched: 1,
    orders: [{ orderId: 'ORD-101', customer: 'Alice', status: 'shipped', total: 129 }],
    echo: input
  }),
  refund_order: (input) => ({ refunded: true, orderId: input.orderId, amount: input.amount })
}

// 一轮完整消息流
function runToolTurn(scenario: 'good' | 'hallucinated-name' | 'bad-type'): void {
  const call = mockModelTurn(scenario)
  console.log(`\n=== scenario: ${scenario} ===`)
  console.log(`assistant  → tool_use   name=${call.name} input=${JSON.stringify(call.input)}`)

  const issues = validateToolCall(call, tools)
  if (issues.length > 0) {
    console.error('gate       → REJECTED before execution:')
    for (const issue of issues) console.error(`  ✗ ${issue}`)
    // 契约：拒绝不是吞掉——把错误作为 tool_result 回传，模型下一轮可自行纠正
    console.log(
      `user       → tool_result (error) tool_use_id=${call.id} content=${JSON.stringify({
        error: 'tool call rejected by contract validation',
        issues
      })}`
    )
    return
  }

  console.log('gate       → PASS (name whitelisted, params match schema)')
  const result = executions[call.name](call.input)
  console.log(`user       → tool_result tool_use_id=${call.id} content=${JSON.stringify(result)}`)
  console.log('assistant  → "Alice 有 1 笔已发货订单 ORD-101，金额 129。"（mock 最终回复）')
}

runToolTurn('good')
runToolTurn('hallucinated-name')
runToolTurn('bad-type')
```

**正常输出**（完整一轮合法消息流）：

```text
=== scenario: good ===
assistant  → tool_use   name=search_orders input={"query":"Alice","status":"shipped"}
gate       → PASS (name whitelisted, params match schema)
user       → tool_result tool_use_id=toolu_demo_001 content={"matched":1,"orders":[...],"echo":{...}}
assistant  → "Alice 有 1 笔已发货订单 ORD-101，金额 129。"（mock 最终回复）
```

**负例输出**（幻觉工具名与类型错误都在执行前被拒，且错误以 tool_result 回传）：

```text
=== scenario: hallucinated-name ===
assistant  → tool_use   name=delete_all_orders input={"customerId":42}
gate       → REJECTED before execution:
  ✗ unknown tool "delete_all_orders" — model request rejected, nothing was executed
user       → tool_result (error) tool_use_id=toolu_demo_002 content={"error":"tool call rejected by contract validation","issues":[...]}

=== scenario: bad-type ===
assistant  → tool_use   name=refund_order input={"orderId":"ORD-77","amount":"9.9"}
gate       → REJECTED before execution:
  ✗ refund_order.amount: expected number, got string
user       → tool_result (error) tool_use_id=toolu_demo_003 content={...}
```

**验收命令**：

```bash
npx tsx@4 tool-calling.ts && echo CONTRACT-OK
```

**清理**：删除临时文件。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：单工具查询 | 「Alice 的订单」 | 一轮 call/result | 文本回复 + 数据 | 查询类 | 需要多步依赖 |
| 常见：顺序链 | 先查用户邮箱再发报告 | 上一步输出作下一步参数 | 多轮循环 | 有依赖的任务（模型会逐步调用，不要催它一次全调） |
| 组合：并行调用 | 「纽约和伦敦的天气」 | 单条 assistant 多个 tool_use，结果在**同一条** user 消息里全部配对返回 | 一次多结果 | 相互独立的操作 | 有依赖的步骤（并行会猜参数） |

## 3. 原理

### 契约三要素：name / description / input_schema

- **name**：进白名单的键。描述性命名（`search_orders`，不是 `func1`）。
- **description**：给模型看的选择依据——它就是工具的「提示词」。写清楚**何时用**（「当用户询问订单历史时使用」），能显著减少误选。
- **input_schema**：JSON Schema，与 [structured-output](../02-inference-interface/structured-output.md) 同一语言。固定选项用 `enum` 强制；每个参数写 description。

Anthropic 的工具设计原则（检索 2026-09-01）：工具应自包含、对错误鲁棒、用途清晰；最常见的失败模式是**工具集臃肿**——「如果人类工程师说不清该用哪个工具，就别指望 Agent 做得更好」。

### 为什么「想调用」与「执行」必须分离

模型输出的只是文本（恰好是 JSON 形状的请求）。厂商 API 不执行你的函数——执行发生在你的进程里。这个分离带来三个可控点：

1. **白名单**：清单之外的工具名一律拒绝（负例二）。这是幻觉调用的唯一硬防线。
2. **参数验证**：即使工具名对，参数仍可能类型错误或缺失（负例三）。strict 模式（OpenAI `strict: true` / Anthropic 工具 `strict: true` beta）把这类保证前移到解码器，但调用方验证仍是最后防线。
3. **权限与副作用审查**：执行前的钩子位。退款类工具在这里接权限检查与人工批准——那是 [tool-execution](../05-action/tool-execution.md) 的主题。

### 配对不变量与并行语义

- 每个 `tool_use` 有唯一 `id`（Anthropic `toolu_*` / OpenAI `call_id`）；回传的 `tool_result` 必须带对应 id。**配对断裂 → 下一轮 400**。
- 并行调用：同一 assistant 消息可含多个 `tool_use` 块；**全部结果必须在同一条 user 消息里、各带自己 id 返回**（Anthropic 明示）。OpenAI 可用 `parallel_tool_calls: false` 关掉并行（「确保零或一次调用」）。
- 工具定义本身计入输入 token：Anthropic 对开启工具的系统提示额外计约 313-346 token，工具 schema 与 tool_result 同样计费——工具越多越贵，也越难选。

### 错误处理契约

工具执行失败（API 宕机、订单号无效）**不要抛异常终止对话**：把错误作为 `tool_result` 的内容回传，模型通常能自行纠正或向用户解释。回传要语义化（`{"error": "...", "hint": "..."}`），不要吞成空字符串——模型看到空结果会自行脑补。

### 规范要求 vs 本地实测

| 官方/规范断言 | 本仓 fixture / 实践 |
|---|---|
| 五步流（请求→call→执行→回传→回复） | `runToolTurn` 按同构顺序打印每步 |
| stop_reason: tool_use 标记模型停在调用 | mock 直接返回 tool_use 块；真实 API 下应检查 stop_reason 再进执行分支 |
| 并行结果须同消息全配对 | fixture 为单调用；配对检查在 [context](../03-context/context-engineering.md) 的 fixture 中演示 |
| 工具失败应作为结果回传 | 拒绝路径以 `(error) tool_result` 回传即是该模式 |

### 关键不变量

1. **执行前必过两道闸门**：白名单 + 参数 schema 校验。没有例外。
2. **配对完整**：tool_use 与 tool_result 一一对应，历史裁剪不得切断（见 [context](../03-context/context-engineering.md) I2）。
3. **拒绝可回传**：校验失败不是终点，错误信息进 tool_result 让模型有机会纠正。
4. **最小工具集**：只挂本任务需要的工具；选择模糊本身就是故障信号。

## 4. 开发

### 集成要点

1. **schema 与实现同仓**：`ToolDefinition` 的 TypeScript 类型即执行的入参类型，改参数 = breaking change。
2. **strict 优先**：OpenAI 官方建议总是开 `strict: true`；Anthropic 用工具 `strict: true`（beta）。开了也要保留调用方验证（最后一道）。
3. **循环要有界**：call → result 循环设最大轮数；到达上限要么降级要么升级人工，不允许无限打转。
4. **缺信息的行为差异**：官方明示能力较弱的模型可能对缺失参数「猜一个合理值」（如把位置猜成 New York）；能力强的更倾向反问。对易猜错的参数，用 CoT 提示引导「先检查必填参数是否可推断，缺就问用户」。

### 调试 runbook

#### R1 模型调用了不存在的工具

**症状**：日志里出现清单外的工具名，或参数字段对不上任何定义。
**证据**：请求里的 tools 清单 + 响应的 tool_use 块 diff；确认是清单漂移（两处定义不同步）还是模型幻觉。
**处理**：闸门拒绝并回传错误结果（fixture 负例二）；若是漂移，收敛工具定义为单一来源；若是幻觉，改工具 description 把「何时用 / 何时不用」写清。
**完成标准**：未知工具执行次数为 0；拒绝计数可观测且趋零。

#### R2 下一轮 400：配对断裂

**症状**：带工具结果的请求被拒，错误指向消息结构。
**证据**：dump 完整 messages；对 id 做配对检查。并行场景常见根因：多个 tool_use 只回了一条 result，或结果分多条 user 消息发送。
**处理**：全部结果合并进同一条 user 消息、各带 id；历史裁剪换成保配对实现。
**完成标准**：连续无 400；配对检查进 CI。

#### R3 工具执行失败后对话死循环

**症状**：同一工具被反复调用，错误重复出现，任务不收敛。
**证据**：trace 里同一工具名 + 相似参数的连续调用；tool_result 内容确认错误已回传但模型未纠正。
**处理**：错误回传加可行动的 hint（「订单号无效，请向用户确认」）；设最大轮数熔断；必要时把「失败 N 次后改为向用户说明」写进 system。
**完成标准**：循环长度有上界；失败路径以明确终止或升级收尾，不再打转。

### 反模式清单

- **把执行塞进「模型回调」**：混淆请求与执行，闸门无处安放。
- **白名单只匹配前缀或模糊匹配**：`delete_*` 一律放行等于没有白名单。
- **错误吞成空字符串回传**：模型会脑补结果，错误被放大成幻觉。
- **工具结果塞整页原文**：HTML / 全量 JSON 直接进窗口——预算与腐烂双输（见 [context](../03-context/context-engineering.md)）。
- **几十个工具全挂**：选择模糊、token 翻倍；按任务开最小集。
- **并行调用催模型「一次全调」有依赖的步骤**：模型会对上游结果未知的下游参数进行猜测。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [Anthropic Tool use 总览](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) ｜ [OpenAI Function calling 指南](https://developers.openai.com/api/docs/guides/function-calling) | 两家的五步流与术语（tools / tool calls / outputs） |
| Builder | 本页 fixture 接真厂商 ｜ [Anthropic：Writing tools for AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | 先跑通契约循环，再学工具设计原则 |
| Operator | Anthropic 工具 token 成本表（Tool use 总览 Pricing 节） ｜ 并行调用实现指南 | 工具的计量口径与并行回传格式 |
| Researcher | [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) ｜ [MCP](https://modelcontextprotocol.io/specification/latest) | 工具循环之上是什么（Agent 形态与协议化工具生态） |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| Anthropic Tool use 总览 | L1 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | 契约字段与流程 | input_schema、stop_reason、并行配对、313-346 token 系统提示 | 读实现指南 |
| OpenAI Function calling | L1 | https://developers.openai.com/api/docs/guides/function-calling | 五步流与 strict | strict 底层即 Structured Outputs、parallel_tool_calls 开关、tool_search（gpt-5.4+） | 跑官方示例 |
| Writing tools for AI agents | L1 | https://www.anthropic.com/engineering/writing-tools-for-agents | 工具设计原则 | 自包含 / 最小集 / 描述即提示 | 重写自己的工具描述 |
| Building effective agents | L1 | https://www.anthropic.com/engineering/building-effective-agents | Agent 形态总览 | 工具循环上的工作流 vs Agent 边界 | 进层 4 |
| MCP 规范 | L4 | https://modelcontextprotocol.io/specification/latest | 工具生态协议 | 标准化工具接入 | 层 4 [mcp](../07-interoperability/mcp.md) |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- fixture 的 mock 不产生真实 stop_reason；接真厂商后应先验证「检查 stop_reason 再进执行分支」在两家 SDK 里的实际字段名（Anthropic `stop_reason` / OpenAI `finish_reason`）。
- 「描述即提示」的量化收益（好 description 降低多少误选率）无公开基准，属官方定性建议。
- 未决：`tool_search`（OpenAI，gpt-5.4+）把工具发现也交给模型后，「最小工具集」原则如何与之配合——观察中。

### learn-ai 到此为止 / 继续去哪

- 契约之上，执行的安全工程（幂等 / 权限 / 批准）→ [tool-execution](../05-action/tool-execution.md)。
- 把工具循环接进产品 API → [model-api](../02-inference-interface/model-api.md)。
- 工具生态协议化 → [mcp](../07-interoperability/mcp.md)。
- Agent = 模型 + 上下文 + 工具 + 状态 + 循环 → [agent-runtime](../06-agent-systems/agent-runtime.md)。
