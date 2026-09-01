---
title: 协议观察清单
description: 尚未达到 canonical 章门槛的 Agent 协议观察卡合集——发现/目录、支付/商务、Web/交互三组；每卡记录 owner、canonical URL、状态与缺口，并声明纳入门槛与 discovery≠信任≠授权。
domain: tech
tags: [tech, action, protocols, watchlist, landscape]
navOrder: 76
topicId: protocol-watchlist
layer: "7"
status: watchlist
nodeType: resource
owner: learn-ai
externalOwners: []
prerequisites: [protocol-map]
next: []
specVersion: "多协议观察卡（各卡自带状态与 retrievedAt，统检 2026-09-01）"
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **在哪一层**：层 4 · 行动与协作 ｜ **上一层出口**：能构建可追溯的检索链和更新路径 ｜ **本层出口**：遇到清单内协议能立刻说出它解决什么、归谁、缺什么门槛
> **前置**：[协议地图](index.md) ｜ **下一步**：达到门槛的协议将升格为独立 canonical 章

## 1. 概述

**结论先讲**：Agent 协议生态的产出速度远超任何教程的改版速度。本页是**观察卡合集**，不是教程：每张卡回答「全称、归谁、canonical URL 在哪、状态如何、边界是什么、为什么还没进 canonical」。清单按三组组织——发现与目录、支付与商务、交互与 Web。

**结构声明（精简五段式）**：本页 status 为 watchlist，省略完整「使用 / 原理 / 开发」段，以观察卡代替——理由：观察对象普遍缺少可零密钥复验的公开规范成熟度与可运行 fixture；保留资料库段。各卡字段以 2026-09-01 检索为准。

### 纳入门槛（何时升格为 canonical 章）

同时满足以下五条，才从观察区升格：

1. **公开且版本化的规范**（版本化 URL 或正式标准轨道），字段级可引。
2. **独立问题边界**：与现有 canonical 章（MCP / A2A / ACP / AG-UI / A2UI-MCP Apps）不重叠，能说清「它解决的问题其他协议不解决」。
3. **可运行 fixture**：零 API key、确定性、clean checkout 可复现。
4. **成文的安全模型**：认证/授权/注入防护有规范级描述，而非博客级口号。
5. **可核验的维护路径**：治理主体、变更流程、弃用政策可查。

### 三条铁律

- **discovery ≠ 信任 ≠ 授权**：发现机制（ARD、Registry、目录、ANS）只解决「找到」；身份可信要靠签名/身份层（A2A Card 的 JWS、DID、ANS 的 PKI 方案）；能否行动要靠授权层（OAuth、权限模型）。任何一层都不能替代另一层。
- **同名≠同物**：ACP 至少四义（[Agent Client Protocol](acp-agent-client.md) / IBM 历史 ACP / AGNTCY Agent Connect Protocol / OpenClaw 私有）；ADL、OAP 也各有多个同名竞争方案（见卡）。引用永远带全称 + canonical URL。
- **快照会过期**：IETF Internet-Draft 六个月过期；Candidate/Proposal 状态随时可变。本页所有断言带 retrievedAt，引用前自查最新版。

## 2. 观察卡：发现与目录

### ARD — Agentic Resource Discovery

- **全称/owner**：Agentic Resource Discovery Specification；作者 Junjie Bu（Google）、R.V. Guha（Microsoft）、Shaun Smith（Hugging Face）。
- **canonical**：https://agenticresourcediscovery.org/spec/
- **状态**：v0.91，Status: Proposal，规范自署日期 2026-08-26（retrievedAt 2026-09-01）。
- **边界**：跨联邦网络描述/发现/检索「agentic resources」（MCP 工具、A2A agent、skills 等_callable 资源）；条目为 JSON-LD 节点；含 `/explore`、`GET /agents` 可选方法与 URN 命名附录。
- **为何在观察区**：Proposal 状态、v0.x 版本线、安全护栏（条目签名/信任）未成文完整；无独立 fixture。

### MCP Registry

- **全称/owner**：Model Context Protocol Registry；modelcontextprotocol 组织（GitHub）。
- **canonical**：https://github.com/modelcontextprotocol/registry
- **状态**：活跃仓库，「community driven registry service for MCP servers」（retrievedAt 2026-09-01）。
- **边界**：MCP server 的社区注册表——解决「上哪找可信 server」的分发问题，不定义 server 本身协议。
- **为何在观察区**：注册表是服务/基础设施而非协议契约；升格路径是并入 [MCP](mcp.md) 章的发现小节，而非独立章。

### AGNTCY（OASF / DIR / SLIM + 身份与可观测）

- **全称/owner**：AGNTCY（"Internet of Agents" 开源栈）；Linux Foundation 旗下 LF Projects，Outshift（Cisco 孵化）发起。
- **canonical**：https://www.agntcy.org/
- **状态**：活跃，多语言 SDK（Go/Python/.NET/Java/Kotlin 等），Apache-2.0（retrievedAt 2026-09-01）。
- **边界**：**DIR**（Agent Directory Service）——跨框架/跨协议/跨注册表的联邦 agent 发现；**SLIM**——agent 间安全网络层消息传输；**OASF**——agent/技能描述的版本化 schema 框架（含技能/领域分类法）；另有 Identity（W3C 可验证凭据徽章）与 Observability 组件。缩写展开以官方文档为准（首页未逐一展开，未核验）。
- **为何在观察区**：栈内组件与既有 canonical 重叠度高（描述 schema vs Agent Card；发现 vs ARD/Registry；消息 vs A2A 绑定）；独立问题边界待论证。

### DNS-AID / ANS 家族（IETF 草案群）

- **全称/owner**：多个个人提交的 IETF Internet-Draft，互不隶属。
- **canonical**（均在 https://datatracker.ietf.org/，retrievedAt 2026-09-01，全部 "work in progress"）：
  - **AID**：`draft-nemethi-aid-agent-identity-discovery` —— `_agent.<domain>` TXT 记录做协议无关引导（v1.2）。
  - **ANS**：`draft-narajala-ans`（DNS 风格目录 + PKI）与 `draft-narajala-courtney-ansv2`（域名锚定 + ACME + 透明日志，铜/银/金三级）。
  - **DN-ANR**：`draft-cui-dns-native-agent-naming-resolution` —— FQDN 为 Agent ID，SVCB/HTTPS RR + DNSSEC 解析。
  - **AGTP ANS**：`draft-hood-agtp-discovery` —— DISCOVER 方法 + 治理型名字服务。
- **边界**：共同命题「Agent 的 DNS」——命名、解析、端点验证；均显式声明不做语义发现或授权。
- **为何在观察区**：全部是六个月过期的个人草案，尚无一个进入 WG/RFC 轨道；多家竞争同一位置，等收敛。

### ADL / OAP（Agent 定义与打包，同名竞争区）

- **ADL**：
  - **canonical**：https://datatracker.ietf.org/doc/html/draft-nederveld-adl-02（个人提交，Standards Track 意向；`application/adl+json`；"passport" 模型；声明可转换为 A2A Agent Card 与 MCP 配置）。retrievedAt 2026-09-01。
  - 社区另有至少两个同名方案（inference-gateway 的 ADL、nextmoca 的 ADL，均自述 "OpenAPI for AI Agents"）——同名不同 schema。
- **OAP**：
  - **canonical A**：http://openagentprotocol.eu/（七平面：身份/发现/调用/商务/治理/问责/协调；`/.well-known/oap-tool.json`；37 个 RFC 流程稿）。retrievedAt 2026-09-01。
  - **canonical B**：https://github.com/open-agentic-protocol/（白皮书 v0.2；OAPverse 注册表构想）。
- **边界**：Agent 的**定义/清单格式**（静态描述），不是通信协议。
- **为何在观察区**：同名多案、均为草案/白皮书；与 A2A Agent Card 的关系是「生成它」还是「取代它」未收敛；无独立运行面。

### ANP — Agent Network Protocol

- **全称/owner**：Agent Network Protocol（智能体网络协议）；社区项目（agentnetworkprotocol.com），另有 IETF 侧 `draft-song-anp-*` 草案套件（AIP/AITP/ANS/ADP 四件，P2P 数据报 + agent:// URI + DHT/GossipSub）。
- **canonical**：https://www.anp-protocol.com/ 与 https://datatracker.ietf.org/（草案检索）
- **状态**：社区站活跃（中英双语），IETF 套件为个人草案（均 retrievedAt 2026-09-01）。
- **边界**：去中心化身份（W3C DID，`did:wba`）+ 元协议协商 + 应用协议的三层栈，面向「数十亿智能体互联网」。
- **为何在观察区**：与 A2A 的中心化 HTTP 模型是路线之争而非补充关系，生产采用未验证；两轨（社区站 vs IETF 草案）关系需持续观察。

### AHP — Agent Host Protocol

- **全称/owner**：Agent Host Protocol；Microsoft（GitHub Pages 规范站）。
- **canonical**：https://microsoft.github.io/agent-host-protocol/specification/overview
- **状态**：**DRAFT**（规范自标；破坏性变更预期）（retrievedAt 2026-09-01）。
- **边界**：JSON-RPC 2.0、传输无关、SemVer 版本协商、channel 化的消息/命令/通知/动作；`x-` 前缀保留给实现扩展。
- **为何在观察区**：DRAFT 且破坏性变更在即；「宿主-Agent」边界与 ACP 的编辑器-Agent 边界如何区分尚不清楚。

## 3. 观察卡：支付与商务

### UCP — Universal Commerce Protocol

- **全称/owner**：Universal Commerce Protocol；行业联盟（站点列 Google、Shopify、Microsoft、OpenAI、Stripe、Walmart、Booking 等数十家，retrievedAt 2026-09-01）。
- **canonical**：https://ucp.dev/
- **状态**：规范站已上线，正扩展到住宿/餐饮（"Detailed specifications coming soon"）；版本号未在首页展示。
- **边界**：agentic commerce 的总装层——从发现到结账；REST/JSON-RPC 传输，内置 AP2（支付）、A2A、MCP 支持；OAuth 2.0 账号绑定。
- **为何在观察区**：规范主体尚未公开到字段级；上层编排与 UCP/AP2/既有电商 API 的边界待成文。

### AP2 — Agent Payments Protocol

- **全称/owner**：Agent Payments Protocol（规范页亦作 Agentic Payment Protocol）；Google 系（规范站 ap2-protocol.org）。
- **canonical**：https://ap2-protocol.org/ap2/specification/
- **状态**：v0.2（retrievedAt 2026-09-01）。
- **边界**：**支付安全层**而非商务协议——Checkout Mandate/Receipt + 关联的 Payment Mandate/Receipt，作为争议证据；五角色模型（Shopping Agent、Credential Provider、Merchant、Merchant Payment Processor 等）；显式声明与 UCP 兼容，商品目录等商务细节不在范围内。
- **为何在观察区**：v0.x；与 x402/MPP 的市场竞争未收敛；与 A2A 的 AUTH_REQUIRED 委托链如何衔接未成文。

### x402

- **全称/owner**：x402；x402 Foundation（Coinbase 起源）。
- **canonical**：https://x402.org/
- **状态**：活跃（站点自报近 30 日 75.41M 笔交易——**站点自述数，未经审计**，retrievedAt 2026-09-01）。
- **边界**：HTTP 402 原生支付——服务端一行中间件对未付费请求回 402，客户端付费重试；稳定币链上结算、零协议费、网络无关。
- **为何在观察区**：加密轨道依赖（稳定币-only）与主流企业财务流程差距大；采用数据无独立审计源。

### Agentic Commerce Protocol（OpenAI/Stripe，缩写亦为 ACP）

- **全称/owner**：Agentic Commerce Protocol；OpenAI + Stripe 共同发起（2025-09-29 宣布，Apache 2.0）。
- **canonical**：https://developers.openai.com/commerce 与 https://github.com/agentic-commerce-protocol
- **状态**：已驱动 ChatGPT Instant Checkout 上线；变更日志持续更新（retrievedAt 2026-09-01）。
- **边界**：三件套规范——Product Feed（结构化商品数据）、Agentic Checkout（对话内结账会话）、Delegated Payment（委托支付，Stripe Shared Payment Token 为首个实现）；商家保持 Merchant of Record。
- **为何在观察区**：边界是「ChatGPT 内购物」生态而非通用 agent 协作；**缩写与 [Agent Client Protocol](acp-agent-client.md) 冲突**，引用必须写全称。

### MPP — Machine Payments Protocol

- **全称/owner**：Machine Payments Protocol；Stripe + Tempo 共同作者（2026-03-18 发布）。
- **canonical**：https://mpp.dev/（IETF 侧认证方案草案：paymentauth.org）
- **状态**：开放标准，发布时百余家服务接入（媒体报道，retrievedAt 2026-09-01）。
- **边界**：HTTP 402 复活的另一支——`WWW-Authenticate: Payment` 挑战 / `Authorization: Payment` 凭据 / `Payment-Receipt` 回执；charge 与 session 两种 intent；多轨道（Tempo 稳定币、Stripe SPT 卡、Visa 扩展、Lightning）；与 x402 核心流可映射兼容。
- **为何在观察区**：与 x402 同题竞争（同用 402，头设计不同）；支付协议的采用取决于财务/合规栈，非技术单因。

### OpenSharing

- **全称/owner**：OpenSharing；Linux Foundation 项目（Databricks 发起，Delta Sharing 的演进）。
- **canonical**：https://opensharing.io/（注意：**opensharing.org 是无关站点**，勿混淆）
- **状态**：2026-06-10 宣布立项（新闻稿 + 社区报道，retrievedAt 2026-09-01）。
- **边界**：AI 资产（agent skills、模型、非结构化数据）的零拷贝共享协议——凭证自动售货（STS/SAS/OAuth 短时令牌），接收方直连提供方存储，共享服务器不在数据路径上。
- **为何在观察区**：刚立项；与 MCP 的资源分发、与 Skills 的资产打包边界待规范成文。

## 4. 观察卡：交互与 Web

### WebMCP

- **全称/owner**：WebMCP；W3C Web Machine Learning Community Group（Google/Microsoft 工程师贡献）。
- **canonical**：W3C WebML CG 草案（二手来源指向 webmachinelearning.github.io/webmcp；**本轮直接核验失败**——w3c.github.io/webmcp 为 404，retrievedAt 2026-09-01）。
- **状态**：**Draft Community Group Report——不是 W3C 标准、不在标准轨道上**；Chrome origin trial（2026-06 报道，Chrome 149）。
- **边界**：浏览器原生 API——页面通过 `document.modelContext.registerTool()`（早期 `navigator.modelContext`）向页内 agent 暴露带 JSON Schema 的工具；另有把 HTML 表单注解成工具的声明式路径（规范中该节尚标 TODO）。非目标：无头/完全自治浏览。
- **为何在观察区**：CG 草案 + origin trial 阶段；安全节未完成；跨浏览器支持为零时不可作为产品依赖。

### NLIP — Natural Language Interaction Protocol

- **全称/owner**：Natural Language Interaction Protocol；Ecma International TC56。
- **canonical**：https://ecma-international.org/publications-and-standards/standards/ecma-430/
- **状态**：**ECMA-430，已发布的 Ecma 标准**（正式标准，非草案；发布日期未在检索页展示，未验证）（retrievedAt 2026-09-01）。
- **边界**：「AI Agent 之间、或人与 AI agent 之间」的应用层通信协议；动机与设计哲学明确排除在标准文本之外。
- **为何在观察区**：正式标准但生态采用度未知（无独立采用数据）；与 A2A/ACP 的问题边界重叠度高，独立性待证。

## 5. 资料库

### 四级阅读路线

- **Beginner**：本页三组卡片按需查（先看组再看卡）→ 回 [协议地图](index.md) 复位。
- **Builder**：对某卡动心时，先做门槛自检（§1 五条）——尤其是「零密钥 fixture 你能写出吗」。
- **Operator**：把本页当选型禁区清单：任何清单内协议进生产前，先补身份与授权两层设计。
- **Researcher**：IETF datatracker 订阅相关草案邮件列表；跟踪 A2A/MCP/ACP 官方 changelog 观察收敛信号。

### 资源表

| 名称 | 层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 本页各观察卡 | L0/L2 混合 | 见各卡 | 快速定位协议归属与状态 | 各卡内断言（均带 retrievedAt） | 点 canonical 自查最新态 |
| IETF Datatracker | L0 | https://datatracker.ietf.org/ | 草案状态与过期检查 | DNS-AID/ANS、ADL、ANP 套件均为 "work in progress" | 订阅邮件列表 |
| a2a-protocol.org / agentclientprotocol.com | L0 | 见对应 canonical 章 | 收敛参照系 | A2A/ACP 的版本化规范 | 对比观察卡缺口 |

### 主动证伪与未决问题

- **证伪入口**：每张卡的第一手断言都应能在其 canonical URL 找到原文；找不到即降级为传闻并修卡。
- 未决 1：发现层（ARD / Registry / ANS / DIR）最终收敛形态——是并存互补还是一个赢家，2026 内难有定论。
- 未决 2：支付层（x402 vs MPP vs AP2+UCP vs Agentic Commerce Protocol）的头设计与轨道之争；MPP↔x402 的兼容映射实际互操作性未验证。
- 未决 3：WebMCP 的 W3C 轨道走向与跨浏览器支持；NLIP 的实际采用度。
- 未决 4：AGNTCY OASF 与 A2A Agent Card、ADL 与两者的转换关系（「生成」还是「取代」）。

**learn-ai 到此为止**：观察卡与门槛判断。**继续去哪**：已收敛协议的深度章 → [A2A](a2a.md) / [ACP](acp-agent-client.md) / [AG-UI](ag-ui.md) / [A2UI 与 MCP Apps](a2ui-mcp-apps.md)；升格请求 → 给本仓提 issue 并附五条门槛的证据。
