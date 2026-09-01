---
title: 资料库
description: "按问题找资源的研究索引：症状 → 金字塔章 → 章内资料库与下一问题；外部知识 owner（Learn LLM / evals / sites-epub）、通用工具与官方规范快照。"
domain: tech
tags: [resources, index, research]
navOrder: 95
topicId: resources
layer: resource
status: canonical
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# 资料库

**这是什么**：一个研究索引，不是链接清单。用法：带着**问题**来 → 在第一张表定位主线章 → 进该章的「资料库」段拿分层阅读路线 → 用「下一问题」列决定读完去哪。外部知识先看第二张表的 ownership，避免在错误的站点里找答案。

## 1. 按问题找资源

| 症状 / 问题 | 先去哪（金字塔层 · 章） | 章内资料库 | 读完的下一问题 |
| --- | --- | --- | --- |
| 不知道从哪开始、不确定问题域 | 层 0 · [技术地图](/zh/tech/) | 见该章「资料库」段 | 我的需求在复杂度阶梯第几级？→ [复杂度决策阶梯](/zh/tech/00-orientation/complexity-ladder) |
| 回答不稳定、输出无法解析 | 层 1 · [结构化输出](/zh/tech/01-contracts/structured-output) | 见该章「资料库」段 | 解析稳了但内容离谱？→ 层 3 接地 |
| 提示写不好、角色与指令混乱 | 层 1 · [提示词工程](/zh/tech/01-contracts/prompt) | 见该章「资料库」段 | 单条提示够不够，要不要项目级上下文？→ [上下文工程](/zh/tech/01-contracts/context) |
| 模型不知道我的项目/仓库约定 | 层 1 · [上下文工程](/zh/tech/01-contracts/context) | 见该章「资料库」段 | 上下文塞不下或太贵？→ [成本与性能](/zh/tech/05-operations/cost-performance) |
| 回答稳定但没进产品（怎么调 API、流式、会话） | 层 2 · [模型 API 契约](/zh/tech/02-integration/model-api)、[流式响应](/zh/tech/02-integration/streaming)、[会话与状态](/zh/tech/02-integration/session-state) | 见各章「资料库」段 | 交互想做生成式 UI？→ [生成式 UI](/zh/tech/02-integration/ui) |
| 回答缺少私有或新事实 | 层 3 · [RAG](/zh/tech/03-grounding/rag)、[嵌入与检索](/zh/tech/03-grounding/embeddings-retrieval) | 见各章「资料库」段 | 检索质量到顶了？→ [高级检索](/zh/tech/03-grounding/advanced-retrieval) |
| 需要执行动作（调用系统、改数据） | 层 4 · [工具执行工程](/zh/tech/04-action/tool-execution)（契约见层 1 [工具调用契约](/zh/tech/01-contracts/tool-calling)） | 见各章「资料库」段 | 多步、可恢复、需审批？→ [Agent 运行时](/zh/tech/04-action/agent-runtime/) |
| 需要自治循环的助手 | 层 4 · [Agent 运行时](/zh/tech/04-action/agent-runtime/) | 见该章「资料库」段 | 上下文/记忆管理失控？→ [状态与记忆](/zh/tech/04-action/agent-runtime/state-memory) |
| 跨 host / 组织 / Agent 边界协作 | 层 4 · [协议地图](/zh/tech/04-action/protocols/) | 见该章「资料库」段 | 该选哪个协议？→ 按连接方向进 MCP / A2A / ACP / AG-UI 分章 |
| 功能已跑但不可证明、不可运营 | 层 5 · [测试](/zh/tech/05-operations/testing)、[可观测性](/zh/tech/05-operations/observability) | 见各章「资料库」段 | 要不要上线门与评估证据？→ [评估（桥接）](/zh/tech/05-operations/evaluation) |
| token 成本高、延迟大 | 层 5 · [成本与性能](/zh/tech/05-operations/cost-performance) | 见该章「资料库」段 | 优化到头了要不要小模型/端侧？→ [浏览器与端侧推理](/zh/tech/02-integration/browser-edge) |
| 要上线、要能回滚 | 层 5 · [部署与发布](/zh/tech/05-operations/deployment) | 见该章「资料库」段 | 上线后谁负责盯？→ [可观测性](/zh/tech/05-operations/observability) |
| 权限、注入、数据安全 | 层 5 · [安全](/zh/tech/05-operations/security) | 见该章「资料库」段 | 模型对齐层的行为异常？→ 外部 owner Learn LLM |
| 想动模型权重（微调/对齐） | 附录 · [模型生命周期桥接](/zh/tech/appendices/model-lifecycle/) | 见各桥接页「深层推导」段 | 推导与实现 → Learn LLM |

各章「资料库」段提供四级阅读路线（Beginner → Builder → Operator → Researcher），资源均标注来源与 retrievedAt。

## 2. 外部知识 owner

跨仓分工的完整论述见[站点边界与知识 ownership](/zh/tech/00-orientation/site-boundaries)；下表是检索视角的速查（retrievedAt: 2026-09-01）：

| Owner | 拥有（scope） | canonical URL | 何时去 |
| --- | --- | --- | --- |
| **Learn LLM** | 模型内部机制、训练数学（SFT/DPO/LoRA 推导）、底层 RAG/Agent 原理、多模态与量化机制 | https://llm.zenheart.site/ | 需要「为什么」的推导、内部机制或数学时；本仓所有 bridge 页的深层指向 |
| **evals** | 评估方法、benchmark、judge、Golden Dataset、发布证据与 CI 接入 | https://evals.zenheart.site/ | 需要证据支撑上线决策、构建评估集或接上线门时 |
| **sites-epub** | 厂商 docs/blog 原文捕获与离线 EPUB 索引 | https://epub.zenheart.site/ | 需要厂商原文、离线阅读或核对版本细节时 |
| **learn-ai**（本站） | 跨技术主线、五段式教学、决策树、最小 fixture、调试/生产经验 | https://ai.zenheart.site/ | 需要工程决策视角与端到端练习时 |

站点动态数字（章节数、价格、可用性）不在本页静态复制——只记 URL 与 retrievedAt，访问时以对方站点为准。

## 3. 通用工具与社区

精选的通用工具与服务（按用途分组；厂商命令与参数细节归 sites-epub / 厂商文档，此处只回答「什么时候选它」）：

**UI 组件库**（层 2 交互落地）：

- [Shadcn UI](https://ui.shadcn.com/) — 复制/粘贴式 React 组件，做聊天界面的默认起点
- [Vercel AI SDK UI](https://sdk.vercel.ai/docs/guides/ui) — 官方无头 Hooks：流式渲染、消息状态、生成式 UI 配套
- [NextUI](https://nextui.org/) — 美观快速的 React 组件库，通用 UI 补充

**AI 库（TypeScript）**（层 2/3 编排）：

- [LangChain.js](https://js.langchain.com/) — 链/Agent 编排，生态最全
- [LlamaIndex.ts](https://ts.llamaindex.ai/) — RAG 与数据接入特化
- [Transformers.js](https://huggingface.co/docs/transformers.js) — 浏览器内机器学习（配合层 2 [端侧推理](/zh/tech/02-integration/browser-edge)）

**向量数据库**（层 3 检索落地）：

- [Supabase (pgvector)](https://supabase.com/vector) — 已有 Postgres 时的最低复杂度选项
- [Pinecone](https://www.pinecone.io/) — 专用向量 DB（Serverless）
- [Upstash Vector](https://upstash.com/vector) — 边缘部署友好

**学习资源**：

- [DeepLearning.AI](https://www.deeplearning.ai/) — 概念重的系统课程
- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs) — 实战向最佳文档之一
- [Hugging Face 课程](https://huggingface.co/course) — 理解模型内部机制（与 Learn LLM 互补）

**社区**：

- [Vercel Community](https://github.com/vercel/ai/discussions) — AI SDK 问题与动向
- [LangChain Discord](https://discord.gg/langchain) — 编排框架生态
- [/r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) — 本地模型运行经验最密集的地方

## 4. 官方规范快照

协议章引用的 canonical 规范地址（本仓协议内容的 SSOT 指向；retrievedAt: 2026-09-01，版本断言以规范原文为准）：

| 主题 | canonical URL |
| --- | --- |
| Agent Skills | https://agentskills.io/specification |
| Agent Plugins | https://agent-plugins.org/specification |
| MCP | https://modelcontextprotocol.io/specification/latest |
| A2A | https://a2a-protocol.org/v1.0.0/specification/ |
| Agent Client Protocol | https://agentclientprotocol.com/ |
| AG-UI | https://docs.ag-ui.com/introduction |
| A2UI / MCP Apps | https://a2ui.org/ ｜ https://modelcontextprotocol.io/extensions/apps/overview |
| ARD / MCP Registry | https://agenticresourcediscovery.org/spec/ ｜ https://github.com/modelcontextprotocol/registry |
| JSON Schema / OpenAPI / JSON-RPC | https://json-schema.org/specification ｜ https://spec.openapis.org/oas/ ｜ https://www.json-rpc.org/specification |
| OAuth 2.1（**draft，不得写成 final**）/ OIDC / AuthZEN | https://datatracker.ietf.org/doc/rfc9700/ ｜ https://openid.net/specs/openid-connect-core-1_0.html ｜ https://openid.net/specs/authorization-api-1_0.html |

各协议章的「规范要求 vs 本地实测」分栏以这些地址为规范侧来源；快照日期之后规范若更新，先改对应章的 specVersion 再改本表。

## 附：附录区

非主线内容（训练桥接、案例、课程笔记、方法论存档）在[附录区](/zh/tech/appendices/)，不参与本索引的问题驱动顺序。
