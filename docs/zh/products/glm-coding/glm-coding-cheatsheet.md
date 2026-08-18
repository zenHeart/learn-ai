---
title: GLM Coding Plan 速查表
description: 国内端点、积分、指定工具名单、npx @z_ai/coding-helper 原文命令。只查不学。
domain: product
tags:
  - coding-plan
role: cheatsheet
---

# GLM Coding Plan 速查表

只查不学。命令与数字以能打开的官方页为准。本页默认**国内**。海外端点见 [docs.z.ai/devpack/tool/others](https://docs.z.ai/devpack/tool/others)。

最后核实：2026-08-19。

## 端点

来源：[quick-start](https://docs.bigmodel.cn/cn/coding-plan/quick-start)、[tool/others](https://docs.bigmodel.cn/cn/coding-plan/tool/others)、[FAQ](https://docs.bigmodel.cn/cn/coding-plan/faq)、[latest-model](https://docs.bigmodel.cn/cn/coding-plan/latest-model)。

| 协议 / 场景 | Base URL |
|-------------|----------|
| Anthropic Message | `https://open.bigmodel.cn/api/anthropic` |
| OpenAI Chat Completion | `https://open.bigmodel.cn/api/coding/paas/v4` |
| Cherry Studio（FAQ 单独写出带尾斜杠） | `https://open.bigmodel.cn/api/coding/paas/v4/` |
| Codex（仅 `latest-model`；国内适用工具卡未列入） | `https://open.bigmodel.cn/api/v1` |
| 套餐过期后其它工具走资源包（FAQ） | `https://open.bigmodel.cn/api/paas/v4` |

错端点 = 套餐额度用不上。

## 个人积分

来源：[overview](https://docs.bigmodel.cn/cn/coding-plan/overview)。

| 套餐 | 5 小时积分 | 每周积分 |
|------|------------|----------|
| Lite | 2,000 | 10,000 |
| Pro | 12,000 | 60,000 |
| Max | 28,000 | 140,000 |

- 5 小时：请求消耗 5 小时后动态刷新。
- 周积分：自下单起每 7 天刷新。
- 模型积分 =（输入 Token × Input 系数 + 缓存命中 Token × Cached Input 系数 + 输出 Token × Output 系数）/ 10000
- MCP 积分 = 调用次数 × Output 系数
- 非高峰模型调用按基础积分 **50%** 抵扣。高峰：周一至周五 14:00–18:00（UTC+8）。

| 产品 | Input | Cached Input | Output |
|------|-------|--------------|--------|
| GLM-5.3 | 6.9 | 1.7 | 24 |
| GLM-5-Turbo | 5.7 | 1.5 | 21 |
| GLM-4.7 | 4.6 | 1.2 | 16 |
| GLM-4.6V（视觉 MCP） | 1.2 | 0.3 | 2.7 |
| 联网搜索 / 网页读取 / 开源仓库 MCP | — | — | 1.2 |

overview 用 GLM-5.3、缓存命中 90.9% 估算每周 Token：Lite 0.43～0.87 亿；Pro 2.63～5.26 亿；Max 6.13～12.26 亿。上沿 = 全部非高峰 0.5×；下沿 = 全部高峰 1×。

团队积分见 [team](https://docs.bigmodel.cn/cn/coding-plan/team)：标准版 15,000 / 66,000；高级版 35,000 / 155,000。团队页抵扣表仍写 GLM-5.2，与 overview 的 GLM-5.3 表并存；系数数字相同，模型行名不同。

刊例价只看 [订阅页](https://bigmodel.cn/glm-coding)，本表不抄人民币。

## 指定工具（国内）

来源：[tool/others](https://docs.bigmodel.cn/cn/coding-plan/tool/others)，2026-08-19。

**Coding Agent：** Claude Code、Claude for IDE、OpenCode、ZCode、TRAE、CodeBuddy、Lingma、Qoder、Kilo、MonkeyCode、Cline、Droid、Roo、Crush、Goose、Cursor。

**通用 Agent（次级调度 / 尽力交付）：** OpenClaw、Cherry Studio、Hermes Agent。

Helper **自动装载**只有：Claude Code、OpenCode、Crush、Factory Droid（[coding-tool-helper](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper)）。

各工具配置页：`https://docs.bigmodel.cn/cn/coding-plan/tool/<slug>`。MonkeyCode 在 `https://docs.bigmodel.cn/cn/guide/develop/monkeycode`。

## Coding Tool Helper

包名：[`@z_ai/coding-helper`](https://www.npmjs.com/package/@z_ai/coding-helper)。前提：Node.js >= v18.0.0。二进制：`coding-helper` / `chelper`。

```bash
npx @z_ai/coding-helper
npm install -g @z_ai/coding-helper
coding-helper
coding-helper init
coding-helper lang show
coding-helper lang set zh_CN
coding-helper auth
coding-helper auth glm_coding_plan_china <token>
coding-helper auth revoke
coding-helper auth reload claude
coding-helper doctor
coding-helper --help
coding-helper --version
```

海外对应 auth：`coding-helper auth glm_coding_plan_global <token>`；语言：`coding-helper lang set en_US`（[docs.z.ai helper](https://docs.z.ai/devpack/extension/coding-tool-helper)）。

## Claude Code 安装与套餐环境变量

```bash
npm install -g @anthropic-ai/claude-code
claude --version
claude
claude update
```

国内脚本（仅 macOS / Linux）：

```bash
curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh
```

`settings.json` 的 `env`（[tool/claude](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)）：

| 键 | 值 |
|----|-----|
| `ANTHROPIC_AUTH_TOKEN` | 套餐 API Key |
| `ANTHROPIC_BASE_URL` | `https://open.bigmodel.cn/api/anthropic` |
| `API_TIMEOUT_MS` | `3000000` |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | `1` |

切到 GLM-5.3 的映射抄 [latest-model](https://docs.bigmodel.cn/cn/coding-plan/latest-model)，不要抄 `tool/claude` FAQ 旧表。

## Cursor

| 项 | 国内官方原文 |
|----|----------------|
| 资格 | 高级会员及以上，否则 `The model GLM does not work with your current plan or api key` |
| 协议 | OpenAI |
| Base URL | `https://open.bigmodel.cn/api/coding/paas/v4` |
| 模型名 | **大写**，官方示例 `GLM-5.2` |

## 套餐 MCP（Claude Code 一键）

```bash
claude mcp add -s user zai-mcp-server --env Z_AI_API_KEY=YOUR_API_KEY -- npx -y "@z_ai/mcp-server"
claude mcp add -s user -t http web-search-prime https://open.bigmodel.cn/api/mcp/web_search_prime/mcp --header "Authorization: Bearer YOUR_API_KEY"
claude mcp add -s user -t http zread https://open.bigmodel.cn/api/mcp/zread/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

视觉环境变量：`Z_AI_API_KEY`（必需）、`Z_AI_MODE`（`ZHIPU` 或 `ZAI`，默认 `ZHIPU`）。网页读取见 [reader](https://docs.bigmodel.cn/cn/coding-plan/mcp/reader-mcp-server)。

## 常见错误

| 症状 | 先查 |
|------|------|
| `1113 余额不足` / 扣账户余额 | 工具名单 + Base URL（FAQ） |
| Cursor 自定义模型失败 | Cursor 会员档 + 大写模型名 |
| Helper `Network Error` | `HTTP_PROXY` / `HTTPS_PROXY` |
| `EACCES` | nvm / npx / sudo |
| MCP 连不上 | Node 18+、`Z_AI_API_KEY`、`Z_AI_MODE` 与 Key 区域一致 |

## 术语索引

一行钩子，解释在 [术语表](./glm-coding-glossary.md)。

| 术语 | 钩子 |
|------|------|
| [GLM Coding Plan](./glm-coding-glossary.md#glm-coding-plan) | 指定工具订阅，不是聊天产品 |
| [指定工具](./glm-coding-glossary.md#指定工具) | 名单外调用不吃套餐 |
| [Coding 端点](./glm-coding-glossary.md#coding-端点) | 与 `/api/paas/v4` 不是同一口 |
| [积分](./glm-coding-glossary.md#积分) | 5 小时 + 每周双上限 |
| [次级调度](./glm-coding-glossary.md#次级调度) | OpenClaw 等通用 Agent 的尽力交付 |
| [团队套餐 Key](./glm-coding-glossary.md#团队套餐-key) | 与平台其它 Key 不通用 |
| [Coding Tool Helper](./glm-coding-glossary.md#coding-tool-helper) | 装载器，不是 Agent |

## 高质量信息源

最后核实：2026-08-19。只收录亲自打开过的页。

### 一手官方（国内）

| 来源 | 用途 |
|------|------|
| [套餐概览](https://docs.bigmodel.cn/cn/coding-plan/overview) | 模型、积分、边界 |
| [快速开始](https://docs.bigmodel.cn/cn/coding-plan/quick-start) | 订阅与选工具 |
| [使用须知](https://docs.bigmodel.cn/cn/coding-plan/usage-notes) | 并发、共享、退款 |
| [FAQ](https://docs.bigmodel.cn/cn/coding-plan/faq) | `1113`、升级、MCP |
| [适用工具](https://docs.bigmodel.cn/cn/coding-plan/tool/others) | 指定名单与端点 |
| [Claude Code](https://docs.bigmodel.cn/cn/coding-plan/tool/claude) | 安装与 `settings.json` |
| [Cursor](https://docs.bigmodel.cn/cn/coding-plan/tool/cursor) | 自定义模型 |
| [一键安装助手](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper) | Helper 命令 |
| [如何切换模型](https://docs.bigmodel.cn/cn/coding-plan/latest-model) | GLM-5.3 映射 |
| [团队版](https://docs.bigmodel.cn/cn/coding-plan/team) | 席位与团队积分 |
| [视觉 / 搜索 / 读取 / Zread MCP](https://docs.bigmodel.cn/cn/coding-plan/mcp/vision-mcp-server) | 套餐 MCP |
| [订阅协议](https://docs.bigmodel.cn/cn/terms/subscription-agreement) | 使用规范 |
| [llms.txt](https://docs.bigmodel.cn/llms.txt) | 文档站全文索引 |
| [npm @z_ai/coding-helper](https://www.npmjs.com/package/@z_ai/coding-helper) | 包名与 bin |

### 海外镜像

| 来源 | 用途 |
|------|------|
| [docs.z.ai/devpack/overview](https://docs.z.ai/devpack/overview) | 海外套餐总览（含 “Starting at just 18 USD per month”） |
| [docs.z.ai/devpack/tool/others](https://docs.z.ai/devpack/tool/others) | 海外工具名单与 `api.z.ai` 端点 |
| [docs.z.ai/devpack/extension/coding-tool-helper](https://docs.z.ai/devpack/extension/coding-tool-helper) | `glm_coding_plan_global` |
| [z.ai/subscribe](https://z.ai/subscribe) | 海外订阅页 |

### 控制台

| 来源 | 用途 |
|------|------|
| [个人套餐概览](https://www.bigmodel.cn/coding-plan/personal/overview) | Key、续订、风控申诉 |
| [用量统计](https://www.bigmodel.cn/coding-plan/personal/usage) | 5 小时 / 周额度 |
| [费用明细](https://www.bigmodel.cn/finance-center/bill/expensebill/list) | 是否扣的是编码套餐 |

**访问提示**：`bigmodel.cn/glm-coding` 是 SPA，无头抓取常只有 loading。事实以 `docs.bigmodel.cn` 的 `.md` 为准。

## 相关页面

- [学习地图](./index.md)
- [教程](./glm-coding.md)
- [Cookbook](./glm-coding-cookbook.md)
- [术语表](./glm-coding-glossary.md)
