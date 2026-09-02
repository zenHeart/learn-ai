---
title: Agent Plugins（观察）
description: 把 Skills 与 MCP server 打包成一个可分发的插件包——Agent Plugins 1.0.0 是 package/conformance 规范（manifest、固定发现位置、路径包含），不含权限、沙箱、registry 与执行引擎；观察卡，未升格 canonical。
domain: tech
tags: [tech, action, plugins, watchlist]
navOrder: 68
topicId: plugins
layer: "6"
status: watchlist
nodeType: concept
owner: learn-ai
externalOwners: []
prerequisites: [skills, mcp]
next: [protocol-map]
specVersion: "Agent Plugins 1.0.0"
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **所在组**：Agent 系统 ｜ **上一组出口**：能把模型输出接入会话与状态 ｜ **本页出口**：能判断「打包分发」何时需要 Agent Plugins、它管什么与不管什么
> **前置**：[Agent Skills](skills.md)、[MCP](../07-interoperability/mcp.md) ｜ **下一步**：[协议地图](../07-interoperability/index.md)

## 1. 概述

**结论先讲**：当你需要把**一组**能力（若干 Skills + 若干 MCP server 配置）作为**一个可分发单元**交给别人安装时，Agent Plugins 1.0.0 定义了这个包的格式契约：根目录 `plugin.json` 清单、固定发现位置（`skills/` 与 `mcp.json`）、路径包含规则与 `${PLUGIN_ROOT}`/`${PLUGIN_DATA}` 变量。它是 **package/conformance 规范**——规定「包长什么样、客户端怎么校验与发现」，**不是**执行、权限或分发基础设施。本页是观察卡（watchlist）：learn-ai 尚未在生产依赖它。

### 心智模型：一个插件包

```text conceptual
my-plugin/
├── plugin.json          # 必需：封闭 schema 清单（$schema、name 必填）
├── skills/              # 固定位置①：每个直接子目录一个 Skill（内含 SKILL.md）
│   └── summarize/
│       └── SKILL.md
├── mcp.json             # 固定位置②：MCP server 连接配置（stdio / streamable-http / sse）
├── com.example.client/  # 客户端扩展目录（反向域名命名空间）
└── LICENSE
```

两层关系：**Skill 格式由 Agent Skills 规范拥有；Plugins 只定义如何在包内发现 Skill**（`skills/` 下的直接子目录，不递归深层搜索）。MCP 的线上行为由 MCP 规范拥有；Plugins 只定义 `mcp.json` 的可移植配置格式。

### 何时使用 / 何时不用

- 用：向多客户端分发「技能 + 工具连接」的组合包；内部工具链要一个安装单元。
- 不用：
  - 单个技能 → 直接用 [Skills](skills.md)，无需包；
  - 只需要工具连接 → 直接配 MCP server；
  - 需要权限/沙箱/市场审核 → Plugins 规范不提供这些（见下）。

### 决策表：分发形态怎么选

| 形态 | 方向 | 控制权 | 状态 | 信任域 | 最低复杂度 |
| --- | --- | --- | --- | --- | --- |
| 单个 Skill 目录 | 知识注入 | description 触发 | 静态文件 | 宿主进程内 | 一个文件夹 |
| Agent Plugin 包 | 组合分发 | 清单 + 固定发现位置 | 静态目录 + 安装态（PLUGIN_DATA） | 宿主进程内，跨包不隔离 | plugin.json + 组件 |
| MCP server 单独部署 | 工具连接 | 协议边界 + 授权 | server 进程/会话 | 跨进程边界 | 一个 server |

### 它管什么 / 不管什么（按核验到的规范原文）

| 管（v1.0.0 范围内） | 不管（明确不在规范内） |
| --- | --- |
| `plugin.json` 封闭清单（顶层仅 9 个许可字段；未知字段报告并忽略） | **沙箱**：规范原文明确「路径包含规则……不沙箱化插件子进程，也不限制运行期提供的路径」 |
| 固定发现位置：`skills/`、`mcp.json`，清单不能内联组件配置 | **权限模型**：无权限字段、无审批流；安全由客户端自行实现 |
| 路径包含：解析后的路径必须留在插件根内；越界按最窄失败边界处理 | **registry / 市场**：设计决策明确选择目录式包（可用 `ls`/`git` 检查），不是 registry 拉取式 |
| `${PLUGIN_ROOT}` / `${PLUGIN_DATA}` 变量与子进程环境 | **执行引擎**：客户端（plugin runtime）负责发现、安装、加载、执行 |
| 客户端一致性要求（conformance）与组件级非致命失败语义 | 治理（另行由 Technical Charter 定义） |

### 历史版本里程碑

Agent Plugins 1.0.0，状态 Published（2026-09-01 核验）。v1 只定义两种组件类型：**skills 与 MCP servers**；commands、hooks、agents、rules、LSP server 等在规范设计决策中被明确列为「过于客户端特化，不在 v1」。

## 2. 使用

观察卡的最小实战：手工走一遍清单一致性检查（纸面 + 一个零依赖 JSON 检查，≤15 分钟，无 API key）。

### 步骤 1：写一个最小合法清单

```json fixture
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "minimal-plugin"
}
```

`$schema` 与 `name` 是仅有的必填字段。`name` 规则：1-64 字符；仅 `a-z`、`0-9`、`-`、`.`；首尾必须是字母数字；不允许 `--` 与 `..`。

### 步骤 2：零依赖检查必填字段与命名规则

```bash fixture
node --input-type=module -e '
import { readFileSync } from "node:fs";
const m = JSON.parse(readFileSync("plugin.json", "utf-8"));
const failures = [];
if (m.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json")
  failures.push("$schema must be the 1.0.0 canonical identifier");
if (!/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/.test(m.name ?? "") || (m.name ?? "").length > 64
    || /--|\.\./.test(m.name ?? ""))
  failures.push("name violates 1.64/charset/no----or-.. rules");
const allowed = ["$schema","name","version","description","author","homepage","repository","license","keywords","extensions"];
for (const k of Object.keys(m)) if (!allowed.includes(k)) failures.push(`unknown top-level field: ${k}`);
console.log(failures.length ? `FAIL ${failures.join("; ")}` : "PASS minimal manifest conforms");
process.exit(failures.length ? 1 : 0);
'
```

正常输出：`PASS minimal manifest conforms`（退出码 0）。

### 步骤 3：负例

把 `"name"` 改成 `"My-Plugin"`（大写非法）再跑：输出 `FAIL name violates 1.64/charset/no----or-.. rules`，退出码 1。

### 验收与清理

验收：正例退出 0、负例退出 1。清理：删除临时 `plugin.json`。本页无宿主接入步骤——learn-ai 未在任何生产链路消费 Agent Plugins，接入经验留空待补。

## 3. 原理

### 发现与失败边界

- 组件只从固定位置发现：`skills/`（每个**直接**子目录内含 `SKILL.md` 即一个技能，不递归）、`mcp.json`（唯一 MCP 配置入口，禁止内联进清单）。
- 失败按最窄边界隔离：单个技能不合规→跳过该技能；单个 server 条目不合规→跳过该 server；`mcp.json` 整体不合规→仅禁用该插件的 MCP；**清单本身违反 schema（必填字段错误等）→ 整包拒绝**。固定位置缺失不是错误。
- 路径包含：配置中的包内路径必须以 `./` 开头且解析后留在插件根内（`../bin/server` 非法）；`command` 是单个可执行 token，不是 shell 字符串。

### 规范要求 vs 本地实测

| 规范要求（Agent Plugins 1.0.0，2026-09-01 核验） | 本地实测（第 2 节 fixture） |
| --- | --- |
| 必填 `$schema`（canonical 标识符）与 `name` | 检查脚本第 1、2 组断言 |
| name 字符集/长度/首尾/重复规则 | 负例 `My-Plugin` 被捕获 |
| 顶层字段封闭，未知字段报告并忽略 | 检查脚本列出未知字段 |
| v1 组件类型仅 skills + MCP servers | fixture 未覆盖组件发现（无生产需求，留观察） |

### 与 Skills / MCP 的所有权分层

一条事实只有一个 owner：Skill 格式 → agentskills.io；MCP 线上行为 → MCP 规范；**Plugins 只拥有「包与发现」这一层**。读文档时用这个分层判断「某字段去哪查」。

## 4. 开发

观察卡：以下 runbook 是「若你决定试点」的预习，不是本仓已验证经验。

### 症状 → 证据 → 处理 → 完成标准

**症状**：客户端加载插件时整包被拒。
**证据**：客户端报告的无效字段指向 `plugin.json`；对照发现必填字段缺失或类型错误（未知顶层字段不会导致拒绝——只有其他 schema 违反才会）。
**处理**：修复清单本身；未知字段移到 `extensions.<反向域名>` 命名空间下。
**完成标准**：客户端日志只余组件级警告（若有），包被加载。

### 症状 → 证据 → 处理 → 完成标准

**症状**：插件里的 MCP server 起不来，但技能正常。
**证据**：`mcp.json` 的 server 条目不合规（如 `command` 写成 shell 串、`cwd` 越界）或与 `plugin.json` 的 `$schema` 版本不一致。
**处理**：按 7.2 节修复该条目（`command` 单 token、`./` 相对路径、占位符仅 `${PLUGIN_ROOT}`/`${PLUGIN_DATA}`）；版本对齐。
**完成标准**：该 server 能完成 MCP 握手；其余组件不受影响。

### 症状 → 证据 → 处理 → 完成标准

**症状**：升级插件后数据/依赖丢失。
**证据**：把可写状态放在了包目录内——更新时包内容会被整体替换。
**处理**：可写状态全部迁到 `${PLUGIN_DATA}`（规范要求客户端跨更新保留该目录）。
**完成标准**：升级插件后缓存、依赖、生成物仍在。

### 升格 canonical 的门槛

满足以下任一条件时本页升格为 canonical：learn-ai 或 sibling 站在真实链路消费 Agent Plugins 包；或生态出现≥2 个独立客户端实现一致性声明。在此之前，包格式事实仍以 git 仓库/产品文档为准。

## 5. 资料库

四级阅读路线：

- **Beginner**：读本页，能复述「管什么/不管什么」表。
- **Builder**：读规范 §4–§7，手工搭一个最小包并跑第 2 节检查。
- **Operator**：若试点，把清单检查接进发布流水线；跟踪 schema 版本变更。
- **Researcher**：读规范 Design Decisions 与 Conformance Checklist，理解「为何 v1 只有两种组件」。

### 资源表

| 名称 | 证据层级 | canonical URL | 用途 | 支持的断言 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| Agent Plugins 规范 1.0.0 | L0（官方规范） | https://agent-plugins.org/specification | 包格式契约唯一来源 | 清单 schema、固定位置、包含规则、无沙箱/registry（retrievedAt 2026-09-01） | 对照第 1、3 节 |
| 官方 schema（1.0.0） | L0（官方工件） | https://agent-plugins.org/schemas/1.0.0/plugin.schema.json | 机器可读校验 | `$schema` canonical 标识符（retrievedAt 2026-09-01） | 接入 JSON Schema 校验 |
| Agent Skills 规范 | L0（官方规范） | https://agentskills.io/specification | 组件①格式 owner | Skill 格式归 Skills 规范（retrievedAt 2026-09-01） | [Agent Skills](skills.md) |
| MCP 规范 | L0（官方规范） | https://modelcontextprotocol.io/specification/latest | 组件②行为 owner | MCP 线上行为归 MCP 规范（retrievedAt 2026-09-01） | [MCP](../07-interoperability/mcp.md) |

### 主动证伪与未决问题

- 证伪入口：若你发现某客户端对同一 `plugin.json` 的处理与「规范要求 vs 本地实测」表相矛盾，以规范与该客户端文档为准并修订本页。
- 未决：生态采用率（无证据不写）；v1 之外组件类型（commands/hooks/agents/rules/LSP）的演进；`mcp.json` `sse` 类型随 MCP HTTP+SSE 弃用后的去留。

### learn-ai 到此为止 / 继续去哪

- 组件格式与行为：[Agent Skills](skills.md)、[MCP](../07-interoperability/mcp.md)。
- 层 4 协议全景：[协议地图](../07-interoperability/index.md)。
