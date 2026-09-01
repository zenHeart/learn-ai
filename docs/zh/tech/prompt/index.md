---
title: 怎么写 Prompt
description: "给编码助手和产品里的模型写提示。概念见 Learn LLM 第 15 章；本页只练怎么写、放哪、怎么验收。"
domain: tech
tags:
  - prompt
listed: false
outline: [2, 3]
pageClass: catalog-page
navOrder: 1
llm:
  - 15
prev: false
next:
  text: 说清楚 · Claude 官方写法
  link: /tech/prompt/claude-prompt-best-practices
---

# 怎么写 Prompt

**结论**：提示写不清楚，换模型也救不了。先写清 **任务、约束、输出、示例**，再谈 XML / JSON / Agent。

机制（四段式为何这样排、few-shot 为何会跟示例跑、JSON 三档保证、记忆四模式）见 Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)。本站只教工程师 **怎么写、放进哪个工具、怎么在仓库里验收**。

## 写给谁、不写什么

| | |
|---|---|
| **写给谁** | 已经会打开 Cursor / Claude Code / Copilot，或准备把模型接到产品里的前端 / 全栈 |
| **先决条件** | 知道 [LLM 是文本进、文本出](/zh/tech/fundamentals/LLM)，以及 [窗口有上限](/zh/tech/fundamentals/context) |
| **学习目标** | 能把「帮我改一下」改成可执行任务；产品输出走 Schema；仓库有一份助手会跑的 `AGENTS.md` |
| **不是本页** | 产品逐步点击 → [产品](/zh/products/)；注意力 / 训练 / 记忆实现 → Learn LLM；多工具编排 → [Agent](/zh/tech/patterns/agent/) |

## 概念只留这一张表

| 你只要记住 | 工程上怎么用 | 为什么（去 Learn LLM） |
|---|---|---|
| 规则写在 system / developer，这一次的数据写在 user | 工单正文不要和「永远怎么分类」揉在一段 | [第 15 章 A1](https://llm.zenheart.site/chapters/15-prompt-memory) 四段式与角色层级 |
| 示例必须和指令同一格式 | 指令写 JSON、示例却是散文 → 模型跟示例 | [第 15 章 A2](https://llm.zenheart.site/chapters/15-prompt-memory) |
| 要进代码的 JSON 走 API Schema | 不要只靠「请输出合法 JSON」 | [第 15 章 A3](https://llm.zenheart.site/chapters/15-prompt-memory) |
| 生产提示放在代码里 | 有类型、有 review、有回归 | [第 15 章 A4](https://llm.zenheart.site/chapters/15-prompt-memory) |
| 对话超窗要主动裁 | 乱截会切断 tool 配对 | [第 15 章 A5](https://llm.zenheart.site/chapters/15-prompt-memory) |

## 这一栏怎么读

```
本页（20 分钟，先练助手再练产品）
  → 1. Claude 官方原文          补 XML / few-shot
  → 2. 稳住结构 · JSON          产品里要 parse
  → 3. 写给仓库 · AGENTS.md     每个助手读同一份
  → 4. 换模型时改什么           检查清单，不是入门
  → 附录                       查阅别人的系统提示
```

| 你卡在哪 | 读什么 |
|---|---|
| 还在对助手说「帮我改一下」 | **先读完本页「编码助手」** |
| 要看官方 XML 示例 | [说清楚 · Claude 官方](/tech/prompt/claude-prompt-best-practices) |
| 输出必须 `JSON.parse` | [稳住结构 · JSON](/zh/tech/prompt/json-prompt-best-practices) |
| 每个助手都猜包管理器 | [写给仓库 · AGENTS.md](/zh/tech/prompt/agents-doc) |
| 换了模型突然又啰嗦又爱搜 | [换模型时改什么](/zh/tech/prompt/official-guide-2026) |
| 想对照主流产品怎么写系统提示 | [附录 · System Prompts](/zh/tech/prompt/system-prompts-collection) |

## 编码助手：今天就能改的写法

场景：设置页深色模式下保存按钮看不清。

**不要这样发：**

```text
帮我改一下设置页
```

助手不知道改哪个文件、什么叫「好了」、能不能动样式系统。

**这样发：**

```text
任务：修好设置页「保存」在深色模式下白底白字、点得到但看不见。
文件：先读 src/pages/Settings.vue，只改这个文件和它用到的 token。
约束：不要改亮色模式；不要引入新的 CSS 框架。
验收：深色主题下按钮对比度肉眼可辨；pnpm test 仍绿。
不要：重写整个设置页。
```

对照四块：任务（对比度）、约束（文件范围）、输出/验收（测绿）、非目标（不重写）。

产品差异：

| 工具 | 提示放哪 | 本站产品页 |
|---|---|---|
| Cursor | 当次 Chat / Agent；反复出现的规矩进 `.cursor/rules` 或根目录 `AGENTS.md` | [Cursor](/zh/products/cursor/) |
| Claude Code | 当次对话；仓库级进 `CLAUDE.md` + `AGENTS.md` | [Claude Code](/zh/products/claude/claude-code) |
| Codex / Copilot Agent | 当次对话；跨工具公约数是 `AGENTS.md` | [Codex](/zh/products/codex/) · [Copilot](/zh/products/copilot/) |

当次任务永远写在对话里。`AGENTS.md` 只管「对这个仓库永远成立」的命令和禁区。

## 产品里的模型：提示是代码

把用户反馈收成工单。复制后只改 `feedback`。生产环境用下一页的 Schema，不要靠这段字符串保证 JSON。

```ts
type Ticket = {
  severity: 'low' | 'medium' | 'high'
  area: 'ui' | 'api' | 'auth' | 'other'
  summary: string
  nextAction: string
}

const system = `# Identity
你把用户反馈收成一张工单，供值班工程师直接开 issue。

# Instructions
- 只根据用户原文判断，不要编造未出现的复现步骤。
- 复现步骤不足时，nextAction 必须先写「向用户要：」。
- 字段：severity、area、summary、nextAction。

# Examples
<example>
<input>登录页的「忘记密码」点了没反应，Chrome 128。</input>
<output>
{"severity":"high","area":"auth","summary":"忘记密码按钮无响应（Chrome 128）","nextAction":"向用户要：点击后控制台报错与网络面板截图"}
</output>
</example>`

const feedback = '深色模式下设置页的保存按钮是白底白字，点得到但看不见。'

const user = `<input>
${feedback}
</input>`
```

工程落点：

1. 把 `system` 放进 `buildTicketPrompt(feedback)`，和功能同一 PR。
2. OpenAI 已把可复用 Prompt 对象标下线（`v1/prompts` 计划 2026-11-30 关闭）。不要把控制台里的提示当唯一真源。
3. 要稳定 parse → [稳住结构](/zh/tech/prompt/json-prompt-best-practices)。要助手改仓库 → [AGENTS.md](/zh/tech/prompt/agents-doc)。

## 实战：本仓库在用的约定

打开本仓根目录的 `AGENTS.md` / `Claude.md`：根目录只用 `pnpm`、文档用中文、提交信息用英文、提交前 `pnpm docs:build`。这就是「提示落到仓库」的最小样本，不是另一套理论。

自己练一遍：

1. 把今天真实的一条需求按上面的助手模板重写，对比两次结果。
2. 若输出要进代码，走 JSON 页的 Schema，不要再加一句「必须合法」。
3. 把反复说的包管理器和禁区写进 `AGENTS.md`，换一个助手再试同一任务。

## 常见陷阱

- **技巧名当主食**。CoT / ToT / ReAct 是论文目录。先把任务写清。
- **只写禁止**。写成「用连贯段落作答」，不要只写 `Do not use markdown`。
- **用自然语言硬拧 JSON**。走 Schema。三档保证的差异见第 15 章，本站不重复。
- **把泄露的 System Prompts 当教材**。那是附录。
- **一换模型就整页重写**。多数时候只改主动程度、啰嗦程度、停止条件，见第 4 步。

## 下一步

1. [Anthropic Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)（官方强制：先说清楚，第 4 章才 XML）。
2. [Claude 官方写法](/tech/prompt/claude-prompt-best-practices) → [JSON](/zh/tech/prompt/json-prompt-best-practices) → [AGENTS.md](/zh/tech/prompt/agents-doc)。
3. 接到 React / Vue → [集成](/zh/integration/apis/)。

## 深读

| 类型 | 资源 | 用途 |
|---|---|---|
| 机制 | Learn LLM [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory) | 为什么这些写法有效 |
| 官方 | [Anthropic Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | XML、示例、工具触发 |
| 官方 | [OpenAI Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | 提示放进代码 |
| 官方 | [Gemini Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | few-shot + Structured Output |
| 官方 | [AGENTS.md](https://agents.md/) | 仓库级 README |
| 官方 | [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) · [Gemini](https://ai.google.dev/gemini-api/docs/structured-output) | 产品 JSON |
| 动手 | [Anthropic Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | 按章练 |
| 课 | [Anthropic Academy](https://www.anthropic.com/learn) · [OpenAI Academy](https://academy.openai.com/) · [Cookbook](https://developers.openai.com/cookbook) | 本站不复制 |
| 工程笔记 | [brexhq/prompt-engineering](https://github.com/brexhq/prompt-engineering) | 短原则 |
| 查阅 | [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 附录样本 |

不要从 [Awesome ChatGPT Prompts](https://github.com/f/prompts.chat) 入门。那是角色扮演清单。
