---
description: 系统化研究任意工具/框架/平台官方文档，并建成教程树。触发：官方文档研究、产品家族对账、Diataxis 教程、文档质量审计、版本升级补文档。强制先列官方一级导航再扫教程树；事实必须能在官方页找到原文。不用于源码级技术书写作（→ deep-tech-author）或发布前论断勘误（→ fact-audit）。
name: doc-research
---

# Skill: doc-research

从「搜索引擎关键词匹配」升级为「先产品家族、再文档树、再多源交叉验证」。

本技能是**方法论**。消费仓库可另放 `references/<tool-slug>.md`（监控页、commit scope、已知踩坑），不要按工具再拆一个 Skill。

## When to use

- 深入研究官方文档，构建或重构教程。
- 审计现有教程是否漏掉官方一级产品。
- 大版本升级后核对覆盖。

不要用：源码级技术书（`deep-tech-author`）；只核人物/日期/引语（`fact-audit`）；做 Slidev 课（`slidev-ppt-creator`）。

## Inputs

- 目标工具/产品名，以及官方文档根 URL（若已知）。
- 可选：消费仓库里已有的 `references/<tool-slug>.md` 和读者可见的数据源清单。
- 可选：本站教程根目录（用于对照家族图）。

## Outputs

- 两张表：产品家族（官方一级入口 → 官方 URL → 本站去向）和文档树（URL → 标题 → 层级）。
- 按 Diataxis 映射后的教程结构建议或成稿。
- 研究报告（见文末模板）。找不到原文的事实标 `<!-- TODO: 待核实 -->`。

## Dependencies

- 能抓官方页的阅读器（优先同路径 `.md` / `llms.txt`，见 [`official-fetch.md`](references/official-fetch.md)）。
- 任意网页搜索，用于社区交叉验证。GitHub 搜索可选。
- 无头 Agent CLI 可选，失败则只抓官方页（[`headless-search.md`](references/headless-search.md)）。

## Side Effects

- 可在消费仓库写教程和维护参考。不自动 commit / push。
- 不准把家目录路径、token、本机 MCP 配置写进产出。

## 硬规则：严禁臆造

教程、速查、术语、配置示例、数据源清单里的事实，必须能在高可信源里**直接找到原文**。

| 杜撰类型 | 正确做法 |
|---------|---------|
| 命令名 / flag | 写之前对官方 Commands / `--help`；找不到不写 |
| 配置值 / 枚举 | 逐字抄官方 Settings，大版本前不要改 |
| 产品声明 | 验证过再写；歧义就链官方，不要补「应该是」 |
| URL / 文章编号 | 能 HEAD 的核状态；非 200/3xx 改根目录或删除 |
| 包名 / 安装源 | `npm view` / `brew info` / 官方安装脚本；不要猜包名 |

找不到：扩大搜索 → 回溯 PR/CHANGELOG → 能跑就实测 → 放弃并标 TODO。禁止用「通常 / 一般 / 应该是」补全事实。

准确性维度的论断核查可交给 `fact-audit`。本技能负责**怎么研究、怎么立教程树**。

## Workflow（RAPID）

```
R - Retrieve（先产品家族，再文档树）
A - Acquire（逐页读取）
P - Pattern（提取模式）
I - Integrate（整合为教程树）
D - Deepen（社区交叉验证）
```

### Retrieve

规则与密度表见 [`family-completeness.md`](references/family-completeness.md)。

1. 打开官方 docs 首页 / `llms.txt` / 侧栏「产品 / Available on / 一级分类」。
2. 列出全部一级项（名称 + 官方 URL）。
3. 对照本站 `index.md`：`独立页` / `地图一行` / **缺失**。
4. **缺失 = P0**，先补地图或立页，再写技巧。

再拉文档树（[`official-fetch.md`](references/official-fetch.md)）：sitemap、侧栏、`llms.txt`、开源仓 `docs/`。输出两张表，不要合成一张。

读任意官方域名时扫首页/页脚/Resources，画出姊妹站（Blog、Cookbook、API 站、GitHub org），直到不再冒出新域名。方法论见 [`sources/_template.md`](references/sources/_template.md)。

### Acquire

一个 URL 一次读取。HTML 404 先试同路径 `.md`。保留原标题和结构。不确定的标出来。

### Pattern

从全集里抽出：功能矩阵、CLI/配置项、推荐工作流、限制、集成点。

### Integrate

默认四象限（细节见 [`documentation-architecture.md`](references/documentation-architecture.md)）：

```
<docs-root>/<tool>/
├── index.md              # 学习地图 + 决策树
├── <tool>.md             # Tutorial
├── <tool>-cookbook.md    # How-to（可选）
├── <tool>-cheatsheet.md  # Reference（含数据源）
└── <tool>-glossary.md    # Explanation
```

轴 A/B **只决定顺序，不决定删不删**。官方一级入口可以排后或只占一行。

消费仓库新建工具时：复制 [`_template.md`](references/_template.md) → `references/<tool-slug>.md`；数据源写进读者可见的 cheatsheet，不要在维护参考里再抄一份。

### Deepen

官方页仍是事实源。搜索只提供线索：

1. 中英不同角度（官方家族 / 最佳实践 / 踩坑 / 真实案例）。
2. 全文读 3–5 篇高价值文章。
3. 可选：GitHub Issues/代码、无头 CLI。失败就停。

按 P0/P1/P2 更新教程。大型审计可并行：家族图、社区、80/20、代码可运行性、中文生态。

准确性/链接核验复用 `fact-audit`，不要在本技能再写一套论断分类。

## 查询角度（不要在 Agent 里再抄）

| 角度 | 英文 | 中文 |
|------|------|------|
| 官方家族 | `<vendor> official products "available on"` | `<厂商> 产品家族 官方` |
| 最佳实践 | `<tool> best practices` | `<tool> 最佳实践 踩坑` |
| 真实案例 | `things I wish I knew about <tool>` | `<tool> 实战经验` |

无头 CLI 命令见 [`headless-search.md`](references/headless-search.md)。

## 协作

| 资产 | 分工 |
|------|------|
| `doc-quality-auditor` | 写完后审计；完整性 P0 = 家族图缺一级产品 |
| `deep-search-optimizer` | 发现阶段：官方 nav + 社区线索 |
| `fact-audit` | 发布前论断/链接核验 |
| `slidev-ppt-creator` | 把研究成果做成课 |

## Usage Example

```
研究 <Tool> 官方文档并补本站教程。
1. 打开官方一级 nav → 家族表，缺项记 P0
2. 抓 sitemap / .md / llms.txt → 文档树
3. 按 Diataxis 映射到 index / tutorial / cookbook / cheatsheet / glossary
4. 搜索只作线索；命令和额度只抄能打开的官方页
5. 交 doc-quality-auditor；论断交 fact-audit
```

## 研究报告模板

```markdown
# <Tool> 文档研究报告

**日期**：YYYY-MM-DD
**覆盖度**：产品家族 A/B 已上图；文档树 X/Y 页面

## 产品家族
| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| … | … | 独立页 / 地图一行 / **缺失** |

## 文档树
| 层级 | 页面 | URL | 状态 |
|------|------|-----|------|

## 建议
1. …
```