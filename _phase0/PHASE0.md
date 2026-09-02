# Phase 0 冻结文档 — Tech 金字塔重构（Issue #116）

冻结日期：2026-09-01 ｜ 分支：`docs/tech-pyramid-restructure` ｜ 基线：`52dee51`

## 1. 已冻结的决定

### 1.1 顶层总论点（唯一）

**AI 技术的工程本质，是把人的意图在不确定性、外部状态和权限约束下，逐级转换为可验证的系统结果；教学按这条能力变换链展开，协议只是特定边界的实现选择。**

### 1.2 六层金字塔（层结构固定，层内 slug 已在 slug-map.json 冻结）

| 层 | 目录 | 回答的问题 | 出口能力 |
| --- | --- | --- | --- |
| 0 | `00-orientation/` | 我该从哪里开始、哪些不在本仓？ | 定位问题域与下一入口 |
| 1 | `01-contracts/` | 如何让输入/输出可控？ | 写并验证 schema，知道失败验收 |
| 2 | `02-integration/` | 如何让能力成为产品交互？ | 可取消、可观测的端到端交互 |
| 3 | `03-grounding/` | 如何让结果有依据？ | 可追溯检索链与更新路径 |
| 4 | `04-action/` | 如何安全做事/跨边界协作？ | 权限受限、可暂停恢复、最低复杂度 |
| 5 | `05-operations/` | 如何证明可上线？ | 可回放证据：质量/风险/回滚/责任人 |
| — | `resources/` `appendices/` | 下一步去哪 / 非主线内容 | 桥接与历史 |

### 1.3 症状驱动决策树（tech-map 首页呈现）

```text
回答不稳定/无法解析         → 层 1 交互契约
回答稳定但未进产品           → 层 2 应用接入
回答缺少私有或新事实         → 层 3 知识接地
需要调用系统或执行动作       → 层 4 行动与协作
需要跨 host/组织/Agent 边界  → 层 4 协议分支（按连接方向）
功能已跑但不可证明/不可运营   → 层 5 可靠运营
```

### 1.4 跨仓 ownership（bridge-register.md 承载明细）

| Owner | 拥有 | learn-ai 只保留 |
| --- | --- | --- |
| Learn LLM (llm.zenheart.site) | 模型内部机制、训练数学、底层 RAG/Agent 原理 | 决策影响 + 停止点 + deep-link |
| evals (evals.zenheart.site) | 评估方法、benchmark、judge、发布证据 | 何时需要证据 + 上线门接入 |
| sites-epub (epub.zenheart.site) | 厂商 docs/blog 捕获与 EPUB 索引 | 稳定概念二次加工 + 阅读路线 |
| learn-ai | 跨技术主线、五段式、决策树、最小 fixture、调试/生产经验 | — |

### 1.5 执行期默认决策（未阻塞等待人工，可随时推翻）

1. Phase 1 试点主题：`structured-output`（依赖最少、fixture 最简）；A2A 为第二篇示范。
2. `ai-coding/` 簇 → appendices/ai-coding 案例 + Products。
3. 侧栏协议区只露 `Protocol Map` 一层，协议明细页折叠，避免侧栏退化为协议清单。

## 2. Inventory 基线（scripts/pyramid-inventory.mjs 生成 inventory.json）

- 总页数 603（zh 328 / en 275）；五段式完成 0 页 —— 与 Issue §7.1 一致。
- zh/tech 81 篇 / en/tech 51 篇；竞争树：integration(19)、ai-tools(7)、zh/skills(4)。
- 已知阻塞项：`zh/products/openclaw/cli.md` 75 个 U+FFFD；`docs:audit` 16 页缺 frontmatter；`docs:order` product-docs 10 死链。

## 3. 迁移算法

1. 内容 agent 按 slug-map 的 mergeSources 读取旧页 → 提炼可保留事实 → 按 five-part-template 重写为新 canonical 页（zh + en 同构）。
2. 旧文件在对应新页验收后删除，old→new 记录进 `docs/public/redirects.json`（客户端重定向）。
3. Products moves 按 slug-map.productsMoves 执行。
4. frontmatter 是元数据 SSOT；`catalog.data.js` 扩展字段派生图谱；跨页关系（bilingual_of/supersedes/redirects）只在 `_phase0/slug-map.json` + redirects.json，不造第三套 graph。

## 4. 验收门（对齐 Issue §9）

- P0：无密钥/私密信息入正文；ACP 三义消歧；openclaw/cli.md 先恢复。
- P1：每 canonical 章中英严格五段式；Usage ≤15min 无密钥 fixture；Development ≥3 条 runbook；Resource Library 有四级路线 + retrievedAt。
- P2：`docs:audit` / `docs:order` / `docs:build` / `ppt:build` 可回读全绿。

## 5. 工件清单

| 文件 | 作用 |
| --- | --- |
| `scripts/pyramid-inventory.mjs` | 只读扫描，生成 inventory.json |
| `_phase0/inventory.json` | 全量页面事实（路径/frontmatter/五段覆盖/双语言 twin） |
| `_phase0/slug-map.json` | topicId 注册表 + 迁移映射（临时 SSOT，完成后降级为 provenance） |
| `_phase0/five-part-template.md` | 章节契约（内容 agent 必读） |
| `_phase0/bridge-register.md` | 跨仓桥接登记（canonicalUrl/retrievedAt/handoff） |
