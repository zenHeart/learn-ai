# 五段式章节契约（canonical 章模板）

> Phase 0 冻结工件。所有新 canonical 章的中英版本必须遵循本契约。
> slug、topicId、mergeSources 见 `_phase0/slug-map.json`。省略任一段必须写"不适用及理由"。

## Frontmatter 契约（两语言相同字段值）

```yaml
---
title: <中/英文标题>
description: <一句话 BLUF：解决什么问题>
domain: tech            # catalog.data.js 依赖
tags: [<自由>]
navOrder: <层内序号>     # catalog 排序
topicId: <slug-map 中的 topicId>       # 全局唯一，中英同值
layer: "<0-5>"          # 所属层
status: canonical       # canonical | bridge | case | legacy | watchlist
nodeType: <problem|concept|contract|capability|pattern|boundary|operation|evidence|resource>
owner: learn-ai
externalOwners: []      # 如 [{ site: llm, url: "https://llm.zenheart.site/..." }]
prerequisites: [<topicId 列表>]
next: [<topicId 列表>]
specVersion: ""         # 协议/规范主题必填（如 "MCP 2025-06-18 / A2A 1.0.0"）
lastVerified: "<YYYY-MM-DD>"
bilingualParity: exact  # exact | partial（partial 必须在文首标注待办）
listed: true
---
```

## 页首固定块（frontmatter 之后、`## 1` 之前）

```markdown
> **在哪一层**：层 N · <层名> ｜ **上一层出口**：<一句话> ｜ **本层出口**：<读完你能做什么>
> **前置**：<topicId 链接列表> ｜ **下一步**：<topicId 链接列表>
```

## 一级标题顺序（严格，不可增删换序）

```markdown
## 1. 概述 (Overview)
## 2. 使用 (Usage)
## 3. 原理 (Principles)
## 4. 开发 (Development)
## 5. 资料库 (Resource Library)
```

中文版用 `## 1. 概述` 等；英文版用 `## 1. Overview` 等。段内可有二级小节。

### 1. 概述

- 首句 BLUF：解决什么问题、为什么在此层出现。
- 心智模型（一段文字 + 一张边界/组件图，mermaid 或 ascii）。
- 何时使用 / 何时不用（Goals / Non-goals）。
- **决策表**（必须）：与相邻技术按 方向/控制权/状态/信任域/最低复杂度 对比。
- 历史版本里程碑：无一手证据写 `未验证`，禁止编造时间线。

### 2. 使用

- **最小实战**：≤15 分钟、无 API key、clean checkout 可复制。固定 Node LTS + 依赖版本。优先完整 TypeScript。
- 结构：setup → 运行命令 → 正常输出 → 负例输出（错误示范）→ 验收命令 → 清理。
- fixture 放 `examples/<topic>/`，正文引用相对路径。无密钥设计：用本地 mock/echo 服务或 ollama 可选。
- 基础 → 常见 → 组合场景，每场景写输入/动作/输出/适用/不适用。

### 3. 原理

- 实现无关：核心部件、控制流/数据流（图）、关键不变量、生命周期。
- schema / wire / transport / 能力协商 / 状态与错误语义 / 失败路径。
- **规范要求 vs 本地实测分栏**（表格）。
- 不复制官方完整 schema；用最小消息示例回答"为什么这样设计"。
- 不重复 Learn LLM 的模型内部推导。

### 4. 开发

- 集成、版本 pin/升级、兼容性、测试、回滚、迁移。
- **调试 runbook（必须，固定格式）**：

```markdown
### 症状 → 证据 → 处理 → 完成标准
**症状**：<读者会看到什么>
**证据**：<看什么日志/trace/最小复现>
**处理**:<具体动作>
**完成标准**:<怎么确认修好了>
```

- 至少 3 条 runbook。覆盖（按主题取舍）：超时/重试/幂等/取消/权限/注入/SSRF/观测/成本。
- 反模式清单："看似成功但证据不足"的路径。

### 5. 资料库

- **四级阅读路线**：Beginner → Builder → Operator → Researcher（每级 2-4 条）。
- 资源表列：名称 | 层级(E/L0/L1/L2/L4) | canonical URL | 用途 | 支持的断言 | 下一步。
- `retrievedAt` 日期必填；版本/采用率断言无证据不写。
- 结尾固定小节「主动证伪与未决问题」+「learn-ai 到此为止 / 继续去哪」。

## 写作纪律

- BLUF、短句、主动语态；术语首次出现给中英全称。
- 禁止：厂商营销口径当事实、编造版本/日期/采用率、`废话/翻车`类轻佻词。
- 中文页与英文页：topicId、标题序、结论、边界、代码、图、警告、链接一一对应。
- 代码块标 `normative | conceptual | fixture | legacy` 之一（协议主题）。
