---
title: 仓库上下文
description: "给编码助手的仓库说明书：AGENTS.md 的格式与惯例、全局/项目/目录分层与就近优先、宿主注入的生效机制——命令必须真实可跑，助手会照单执行。"
domain: tech
tags: [context, repo-context, agents-md, coding-assistant]
navOrder: 35
topicId: repo-context
layer: "3"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [context]
next: [acp-agent-client]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# 仓库上下文

> **在哪一组**：Context 组 ｜ **上一组出口**：能设计多来源的上下文组装与优先级 ｜ **本页出口**：能给自己的仓库落一份命令真实、分层正确的 AGENTS.md，并解释它如何进入每一轮上下文
> **前置**：[上下文工程](context-engineering.md) ｜ **下一步**：[ACP：编辑器与 Agent 的边界](../07-interoperability/acp-agent-client.md)

## 1. 概述

**结论**：换一个编码助手就装错依赖、跑错测试命令——这不是模型问题，是**仓库级上下文缺失**。`AGENTS.md` 是给编码助手看的 README：安装用哪个包管理器、测试怎么跑、哪些目录不能动。它在上下文体系里的位置很明确：**一种由宿主（编辑器 / CLI）在会话开始时注入的稳定来源**，进入 [context-engineering](context-engineering.md) 的来源分类，占用 [context-window](context-window.md) 的预算。

### 心智模型：分层覆盖链

```text
全局规则（用户级，跨仓库）            ← 个人偏好：语言、风格
   ↓ 被覆盖
仓根 AGENTS.md                       ← 团队约定：包管理器、测试命令、禁区
   ↓ 被覆盖（就近优先）
子目录 AGENTS.md（monorepo 嵌套）     ← 子项目例外：如「本包用 npm」
   ↓ 被覆盖（最高优先级）
当次对话指令                          ←「这一次」的任务细节，覆盖一切
```

规则只有一份正文，冲突时**离正在改的文件最近的 AGENTS.md 赢**；用户当次对话覆盖一切。

### 何时使用 / 何时不用

| | |
|---|---|
| **写给谁** | 用 Cursor / Claude Code / Codex / Copilot 等编码助手的开发者与团队 |
| **何时用** | 任何会被多个助手、多个人打开的仓库——尤其有特殊命令或禁区的 |
| **何时不用** | 当次任务细节（写对话里，不进 AGENTS.md）；给人看的长文档（那是 README） |
| **不是本页** | 上下文来源与优先级的整体模型 → [context-engineering](context-engineering.md)；宿主如何携带编辑器状态（打开文件、选区）→ [ACP](../07-interoperability/acp-agent-client.md) |

### 决策表：一条规则该放哪

| 放哪 | 方向 | 控制权 | 状态 | 信任域 | 最低复杂度 |
|---|---|---|---|---|---|
| 仓根 AGENTS.md | 宿主注入 | 仓库维护者 | 随仓库演进 | 版本库（可 diff、可 review） | 一个文本文件 |
| 子目录 AGENTS.md | 宿主按就近注入 | 子项目 owner | 随子树演进 | 版本库 | +分层规则 |
| README | 人读 | 仓库维护者 | 随仓库演进 | 版本库 | 通常已存在 |
| 当次对话 | 手输 | 当前用户 | 一次性 | 会话 | 零 |
| 用户级全局规则 | 宿主注入 | 个人 | 跨仓库 | 本机配置 | 不进版本库 |

**版本里程碑**：AGENTS.md 格式由 [agents.md](https://agents.md/)（Agentic AI Foundation / Linux Foundation 托管）定义，Cursor、Codex、GitHub Copilot、Gemini CLI、Claude Code 等均读取（检索 2026-09-01，站点 200）。具体某工具的读取优先级以其产品文档为准。

## 2. 使用

### 最小实战：极简 AGENTS.md 解析器（零 key）

15 分钟，Node 22 LTS。演示三件事：**推荐结构 lint**（缺 section 被检出）、**分层合并**（就近覆盖，同 key 后层赢）、负例可见**不做分层合并**时子包例外被忽略。注意：agents.md 规范本身**无必填字段**（就是 Markdown）；本 fixture lint 的是「本仓推荐结构」，不是规范要求。

**setup**：存为 `repo-context.ts`，运行 `npx tsx@4 repo-context.ts`。

```ts
// fixture: 极简 AGENTS.md 解析器——推荐结构 lint + 分层合并（就近优先）
// 注意：agents.md 规范本身无必填字段；这里 lint 的是「本仓推荐结构」，不是规范要求
interface Rule {
  key: string
  value: string
  section: string
  source: string // 哪一层文件给出的
}

function parseAgentsMd(name: string, text: string): Rule[] {
  const rules: Rule[] = []
  let section = ''
  for (const line of text.split('\n')) {
    if (line.startsWith('## ')) section = line.slice(3).trim()
    const match = /^- ([^：:]+)[：:]\s*(.+)$/.exec(line)
    if (match) rules.push({ key: match[1].trim(), value: match[2].trim(), section, source: name })
  }
  return rules
}

// 推荐结构：安装 / 测试 / 约束 三个 section 至少各出现一次
function lintAgentsMd(text: string): string[] {
  const issues: string[] = []
  for (const need of ['安装', '测试', '约束']) {
    if (!text.split('\n').some((l) => l.trim() === `## ${need}`)) {
      issues.push(`missing recommended section: ## ${need}`)
    }
  }
  return issues
}

// 分层合并：后传入的层（离你正在改的文件更近）覆盖先传入的层
function mergeLayers(...layers: Rule[][]): Rule[] {
  const merged = new Map<string, Rule>()
  for (const layer of layers) {
    for (const rule of layer) merged.set(rule.key, rule) // 同 key 就近覆盖
  }
  return [...merged.values()]
}

const repoRoot = `# AGENTS.md

## 安装
- 包管理器: pnpm（根目录禁止 npm install）
- node: >= 22 LTS

## 测试
- 单测: pnpm test
- 文档构建: pnpm docs:build

## 约束
- 提交语言: 英文
- 禁改目录: docs/.vitepress/dist
`

const webPkg = `# AGENTS.md（packages/web）

## 安装
- 包管理器: npm（本包独立发布，跟随仓库根的例外约定）

## 约束
- 框架: 仅用 React 18
`

const broken = `# AGENTS.md

## 安装
- 包管理器: pnpm

## 约束
- 提交语言: 英文
`

console.log('--- lint：仓根样本通过推荐结构 ---')
console.log('repoRoot issues:', lintAgentsMd(repoRoot))

console.log('\n--- lint：缺「测试」section 被检出 ---')
console.log('broken issues  :', lintAgentsMd(broken))

console.log('\n--- 合并：仓根 + packages/web，就近覆盖 ---')
const effective = mergeLayers(parseAgentsMd('repo-root', repoRoot), parseAgentsMd('packages/web', webPkg))
for (const r of effective) {
  console.log(`  ${r.key}: ${r.value}  <- ${r.source}`)
}

console.log('\n--- 负例：不做分层合并，助手在 web 包里跑 pnpm ---')
const flat = parseAgentsMd('repo-root', repoRoot)
const pm = flat.find((r) => r.key === '包管理器')
console.log(`  只有仓根时「包管理器」= ${pm?.value}；packages/web 的例外被忽略`)
```

**正常输出**：

```text
--- lint：仓根样本通过推荐结构 ---
repoRoot issues: []

--- lint：缺「测试」section 被检出 ---
broken issues  : [ 'missing recommended section: ## 测试' ]

--- 合并：仓根 + packages/web，就近覆盖 ---
  包管理器: npm（本包独立发布，跟随仓库根的例外约定）  <- packages/web
  node: >= 22 LTS  <- repo-root
  单测: pnpm test  <- repo-root
  文档构建: pnpm docs:build  <- repo-root
  提交语言: 英文  <- repo-root
  禁改目录: docs/.vitepress/dist  <- repo-root
  框架: 仅用 React 18  <- packages/web
```

**负例输出**（不合并分层时，子包的例外约定被忽略——助手会在 `packages/web` 里跑 `pnpm`）：

```text
--- 负例：不做分层合并，助手在 web 包里跑 pnpm ---
  只有仓根时「包管理器」= pnpm（根目录禁止 npm install）；packages/web 的例外被忽略
```

**验收命令**：

```bash
npx tsx@4 repo-context.ts && echo AGENTS-MD-OK
```

**清理**：删除临时文件。

### 场景表

| 场景 | 输入 | 动作 | 输出 | 适用 | 不适用 |
|---|---|---|---|---|---|
| 基础：单仓 lint | 仓根 AGENTS.md | `lintAgentsMd` | 推荐 section 齐全 | 任何接入助手的仓库 | 无特殊命令的玩具仓 |
| 常见：monorepo 嵌套 | 仓根 + 子包两份 | `mergeLayers`（就近覆盖） | 生效规则集 | pnpm/npm 混用、多框架仓 | 单包仓 |
| 组合：CI 校验 | AGENTS.md 变更 | fixture 进 CI：lint + 命令试跑 | 假命令进不了主干 | 团队协作 | 个人仓（可选） |

## 3. 原理

### 生效机制：宿主注入，不是模型魔法

AGENTS.md 不被模型「自动知道」：是**宿主**（Cursor、Claude Code 等）在会话启动时读取文件、拼进 system / 开场上下文。因此在来源模型里它是**稳定来源**：会话内不变、跨会话随仓库演进。两个直接推论：

1. 它占用窗口预算——写得越长，留给任务的空间越小（见 [context-window](context-window.md)）。
2. 它是稳定前缀的一部分——不该把当次任务细节写进去，否则破坏前缀稳定性、拖累缓存（见 [context-engineering](context-engineering.md) 的 I3）。

### 就近优先与覆盖链

冲突解析规则（agents.md 惯例，检索 2026-09-01）：**离正在改的文件最近的 AGENTS.md 优先**；用户当次对话指令覆盖一切。这本质是「一条规则一个所有者」：仓根声明默认，子目录声明例外，例外不复制默认的正文。各工具的读取深度与优先级实现以其产品文档为准。

### 命令真实性：助手会照单执行

AGENTS.md 里的命令不是文档装饰——助手会**如实执行**你列出的安装与检查命令。假命令的代价是真实的（在本仓根目录跑 `npm install` 就是这类错误：版本错乱、锁文件冲突）。所以纪律是：**写进去的每条命令，自己先跑一遍**。本仓根目录的 `AGENTS.md` / `CLAUDE.md` 即实地样本。

### 与编辑器边界

宿主注入的不只是 AGENTS.md：打开的文件、选区、终端状态都在「编辑器 → 模型」的携带范围内——这条边界如何标准化 → [ACP：编辑器与 Agent 的边界](../07-interoperability/acp-agent-client.md)。

### 规范要求 vs 本地实测

| 官方/规范断言 | 本仓 fixture / 实践 |
|---|---|
| 格式无必填字段（纯 Markdown） | fixture 的 lint 是本仓推荐结构，不是规范校验 |
| 冲突时就近优先 | `mergeLayers` 后传层覆盖先传层，同 key 就近赢 |
| 用户当次对话覆盖一切 | 不在 fixture 内（宿主行为）；本仓实践一致 |
| 工具支持面广（Cursor / Codex / Copilot / Gemini CLI / Claude Code） | 检索 2026-09-01 站点 200；各工具行为以其产品文档为准 |

### 关键不变量

1. **命令必须可执行**：写进去的命令助手会真跑；没跑过的命令不写。
2. **一条规则一个所有者**：默认在仓根，例外在子目录；就近覆盖，不复制正文。
3. **README 给人，AGENTS.md 给助手**：内容按读者分流，不写第二份 README。
4. **当次任务进对话，不进 AGENTS.md**：保持稳定前缀稳定。

## 4. 开发

### 集成要点

1. **落一份 AGENTS.md 的最小清单**：安装（包管理器 / node 版本）、测试（怎么跑）、约束（禁区 / 语言惯例）三个 section 起步。
2. **monorepo 用嵌套文件**：仓根写默认，子包只写例外；不要在仓根枚举所有子包的细节。
3. **命令进 CI 校验**：fixture 的 lint 思路 + 定期试跑列出的命令，防止文档与 reality 漂移。
4. **个人偏好放用户级全局**：主题、语言偏好不进仓库的 AGENTS.md（那是团队契约）。

### 调试 runbook

#### R1 助手在每个工具里都猜错项目约定

**症状**：换一个编码助手，又装错依赖、跑错测试命令。
**证据**：仓库根目录没有 AGENTS.md，或其中的命令与实际不符（在本仓跑 `npm install` 就是这类错误）。
**处理**：落一份命令真实、禁区明确的 AGENTS.md；人看的长内容留 README。
**完成标准**：新会话首轮即用对包管理器与测试命令；跨工具行为一致。

#### R2 monorepo 子包里助手用了错误约定

**症状**：仓根写 pnpm，某个子包实际要 npm；助手在子包里跑错。
**证据**：子包目录没有自己的 AGENTS.md；或宿主未实现就近读取（查其产品文档）。
**处理**：在子包落一份只写例外的 AGENTS.md（fixture 的 `mergeLayers` 思路）。
**完成标准**：在子包内发起会话，助手使用子包例外命令；仓根行为不变。

#### R3 AGENTS.md 过时，命令跑不通

**症状**：助手按 AGENTS.md 执行却报错——命令已被改名、脚本已被删除。
**证据**：CI 校验（命令试跑）红灯；`git log` 显示相关脚本变更时未同步文档。
**处理**：修命令并跑通；把「改脚本必须同步 AGENTS.md」写进 PR 检查单。
**完成标准**：CI 校验常绿；连续一个迭代无「文档命令失效」类中断。

### 反模式清单

- **写成第二份 README**：重复项目简介却不写安装 / 测试命令。
- **假命令**：想当然写 `npm test`，实际是 `pnpm test`——助手会如实执行。
- **当次任务写进 AGENTS.md**：破坏稳定前缀，还污染所有后续会话。
- **仓根枚举一切**：把每个子包的细节堆进仓根，子包例外无处安放。
- **个人偏好进团队契约**：语言风格类偏好放用户级全局，不放仓库文件。

## 5. 资料库

### 四级阅读路线

| 级 | 读什么 | 为什么是这个顺序 |
|---|---|---|
| Beginner | [agents.md](https://agents.md/) 官网（格式与惯例） ｜ 本仓根 `AGENTS.md` / `CLAUDE.md`（实地样本） | 五分钟看懂格式：就是带惯例的 Markdown |
| Builder | 给自己的仓库落一份 + 本页 fixture 跑 lint | 手上有可回归的校验，再谈团队推广 |
| Operator | 所用工具产品文档的「读取优先级 / 记忆」章节 ｜ CI 命令校验 | 各工具行为有差异，以其文档为准 |
| Researcher | [Anthropic：Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)（CLAUDE.md 混合案例） | 仓库上下文在整体组装策略中的位置 |

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
|---|---|---|---|---|---|
| agents.md | L1 | https://agents.md/ | 仓库级上下文约定 | 格式、就近优先、工具支持面 | 给自己的仓库落一份 |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 心智模型 | CLAUDE.md 预置 + JIT 混合案例 | 配合 [context-engineering](context-engineering.md) 读 |
| 本仓根 AGENTS.md / CLAUDE.md | E | 仓库根目录 | 实地样本 | 命令真实、禁区明确 | 对照自己的仓库 |
| 本页 fixture | E | repo-context.ts（正文内联） | 零 key 验证 | lint / 就近合并行为 | 进 CI 校验 |

（retrievedAt: 2026-09-01。）

### 主动证伪与未决问题

- 「就近优先」在 agents.md 是惯例级指引；各宿主的实际读取深度与覆盖行为有差异，以其产品文档为准（本仓未逐一实测各工具）。
- 工具支持面（哪些工具读 AGENTS.md）随版本变化快，检索时间点见上；引入新工具前自行验证。
- 未决：AGENTS.md 长度对任务质量的量化影响（占预算 vs 给信号）无公开数据；经验起点是「一屏以内、命令优先」。

### learn-ai 到此为止 / 继续去哪

- 仓库上下文在整体组装策略中的位置 → [context-engineering](context-engineering.md)。
- 编辑器如何把状态与规则带给 Agent → [ACP：编辑器与 Agent 的边界](../07-interoperability/acp-agent-client.md)。
- 能力分发（skills / MCP）的互操作 → [MCP](../07-interoperability/mcp.md)。
