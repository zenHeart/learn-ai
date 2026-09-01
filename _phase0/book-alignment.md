# Phase D — 行业书籍最佳实践对齐（weread 检索 2026-09-01）

> 四本高契合书目录级对照。差距项转 Phase C 深化与 Phase E 评审的核查清单。

## 书单

| 书 | 作者 | bookId | 对齐组 |
| --- | --- | --- | --- |
| 《AI工程：大模型应用开发实战》 | Chip Huyen（奇普·萱） | 3300195041 | 全图 |
| 《一本书讲透MCP：AI Agent互联网新纪元》 | 占冰强等 | 3300175429 | 07-interoperability |
| 《大模型应用开发 RAG实战课》 | 黄佳 | 3300202746 | 04-grounding |
| 《Agent Skills橙皮书》 | 花叔 | 3300200730 | 06-agent-systems/skills |

## 对照结论（✓ 已覆盖 / ⚠ 差距项）

### AI工程（Chip Huyen 10 章）
- ✓ Ch1 技术栈/规划 ↔ 00-map；Ch2 理解基础模型 ↔ 01-model-lifecycle 桥接组；Ch7 微调 ↔ post-training；Ch9 推理优化 ↔ efficient-serving
- ✓ Ch3-4 评估两章只做桥接 ↔ evaluation 页（evals 站拥有——边界正确，书的深度恰好验证不复制决策）
- ⚠ **Ch5.3 防御性提示工程**：03-context/prompt 需核查注入防御覆盖（负例/越狱/数据外泄三防线）——目前可能只散在 08-security
- ⚠ **Ch10 用户反馈闭环**：08-production 需核查"在线反馈→数据→迭代"链路（feedback → dataset → retrain/prompt 迭代）是否在 evaluation/agentops 有落点

### 一本书讲透MCP
- ✓ Ch2 与 Function Call/RAG 辨析、Ch6 框架影响（watchlist）
- ⚠ **Ch4 实战场景丰富度**：mcp 页使用段可参照补"数据库记事/邮件/代码运行器"三类真实 server 场景结构（保持零 key mock 化）

### RAG实战课
- ✓ "RAG 三问"开篇结构 ↔ rag 页概述三问吻合
- ⚠ **Ch1 数据导入多格式清单**：rag/advanced-retrieval 的 ingest 段核对 CSV/网页/PDF/图片/Markdown 结构解析的覆盖

### Agent Skills 橙皮书
- ✓ 02 本质辨析（vs System Prompt/MCP/Cursor Rules）↔ skills 页已有
- ⚠ **03 原理三 gap**：Goldilocks Zone（好 Skill 不是越详细越好）、Token 经济学、**Skill 冲突处理**——skills 页原理段核对补强
- ⚠ 05 安装后验证 ↔ skills 页使用段核对"装完怎么验证生效"

## 转执行
差距项共 6 条，全部转入 Phase C 各组深化 agent 的必查清单（prompt 防御性 / production 反馈闭环 / mcp 场景 / rag 导入 / skills 三项）。
