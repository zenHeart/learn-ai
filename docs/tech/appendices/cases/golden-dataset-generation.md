---
title: 黄金数据集生成方法
description: 案例叙事：黄金数据集的核心特征、LLM 生成 + 人工验证流程与对抗性挖掘；数据集构建方法论的 canonical 在 evals 站点。
domain: tech
tags: [tech, case, eval, golden-dataset]
navOrder: 79
topicId: cases-golden-dataset
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
externalOwners:
  - site: evals
    url: https://evals.zenheart.site/
lastVerified: "2026-09-01"
listed: true
---

# 黄金数据集生成方法

> **桥接说明**：黄金数据集构建的**方法论**（评估设计、judge 校准、CI 接入）canonical 在 [evals.zenheart.site](https://evals.zenheart.site/) 的 Golden Dataset 章节；本页只保留案例级叙事。

## 核心要点

1. **黄金数据集的核心特征**：覆盖真实场景的高频 case、包含边界和异常 case、质量高于数量
2. **LLM 生成 + 人工验证**：用 LLM 批量生成候选数据集，人工标注或 Review 筛选高质量样本
3. **对抗性挖掘**：主动构造模型容易出错的 case（如：歧义词、复杂逻辑、罕见边界条件）补充数据集
4. **数据增强**：对已有高质量样本做同义词替换、结构变换等扩增，以少量人工标注获得大量训练数据
5. **质量评估**：用黄金数据集评估模型，通过错例分析反向指导 Prompt 优化和模型选择

> 整理自任务"整理黄金数据集生成方法"

主线关联：何时需要评估证据、如何接入上线门，见[评估（桥接）](/tech/08-production/evaluation)。
