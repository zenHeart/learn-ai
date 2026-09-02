---
title: 案例研究
description: 真实世界的 AI 落地案例索引：得物 Spec Coding、语义搜索、阿里故障复盘 Agent、AIOps 探索等，按金字塔层标注每篇回答的问题。
domain: tech
tags: [tech, cases, index]
navOrder: 74
topicId: cases-index
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# 案例研究

**本区是什么**：真实世界的 AI 落地案例与复盘，供主线章节引用为证据。案例的数字与结论均归属于文首标注的原始来源；阅读时先看「它回答什么问题」，再对照你所在的层取用。

## 中文侧案例

| 案例 | 主要领域 | 回答的问题 | 关联主线层 |
| --- | --- | --- | --- |
| [得物：Claude Code Spec Coding 实战](./dewu-ai-implementation) | AI 编码 | 规范体系如何消除 AI 编码的不确定性；AI 能力边界在哪 | Context 组 · Agent 系统组 |
| [Building Semantic Search](./building-semantic-search) | 检索 | 个人内容站如何落地分块、增量索引与向量检索 | 知识接地组 |
| [阿里故障复盘 Agent 系统](./alibaba-incident-review-agent) | Agent 工程 | Multi-Agent + Memory 管理 + 评测如何在生产复盘场景落地 | Agent 系统组 · Production 组 |
| [AIOps 通用 Agent 探索](./aiops-agent-exploration) | DevOps Agent | 用 Prompt + ReAct + Docker 沙箱把 IDE 内 AI 云端化 | Agent 系统组 |

## 英文侧案例（EN only）

以下案例只在英文区收录（正文为中文摘要，源自外部来源）：

| 案例 | 主要领域 | 回答的问题 | 关联主线层 |
| --- | --- | --- | --- |
| [SLS 日志分析助手](/tech/appendices/cases/sls-log-analysis-assistant) | 日志运维 | 飞书 Aily + SLS MCP 如何自动生成日志分析报告 | Agent 系统组 |
| [TestHub 测试平台](/tech/appendices/cases/testhub-platform) | 测试 | 测试平台产品形态（原文无法抓取，仅存条目） | Production 组 |
| [阿里 AI 自动化测试](/tech/appendices/cases/alibaba-ai-testing) | 测试 | 阿里的 AI 测试实践（原文无法抓取，仅存条目） | Production 组 |
| [美团 AI 自动化测试](/tech/appendices/cases/meituan-ai-testing) | 测试 | 美团的 AI 测试实践（视频源，仅存条目） | Production 组 |
| [黄金数据集生成方法](/tech/appendices/cases/golden-dataset-generation) | 评估数据 | 如何构建覆盖真实与边界 case 的评估数据集 | Production 组 |

## 阅读建议

- 主线学到哪一层，回来找对应层的案例做交叉验证；不要按本区顺序通读。
- 案例中的效果数字是**单案例证据**，不是可外推的基准；对比验证方法见[评估（桥接）](/zh/tech/08-production/evaluation)。
