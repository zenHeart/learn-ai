# Generative Benchmarking

> 原文: [Generative Benchmarking - Chroma](https://research.trychroma.com/generative-benchmarking)

## 背景问题

当前 benchmark 的核心局限：**公开 benchmark 上的强性能并不能直接泛化到真实生产环境**。

### 现有 Benchmark 的问题

| 问题 | 说明 |
|------|------|
| **数据集通用性** | 泛化数据集无法捕获特定领域的真实用例 |
| **数据过于干净** | 与真实数据的混乱性形成对比 |
| **记忆效应** | 模型在训练数据中见过 benchmark，导致性能虚高 |

这导致一个常见误解：公开 benchmark 上的好成绩 = 生产环境的好表现。

## 核心方案：生成式 Benchmark

生成式 Benchmark 针对用户私有数据定制，更准确、更代表真实场景：

- 数据集定制到用户文档 → 确保与用例相关
- 使用真实混乱数据 → 包含模糊查询
- 真正未见过的数据 → 基于用户文档生成，消除记忆可能

## 方法论

### 两步流程

```
文档过滤 → 使用对齐的 LLM judge + 用户上下文识别相关文档
    ↓
查询生成 → 使用上下文和示例查询引导生成
```

### 第一步：文档过滤

使用对齐的 LLM judge 评估每个文档是否适合生成查询：

**判断标准**：
- **相关性**：文档是否与用例相关
- **完整性**：文档是否包含有用信息
- **意图**：文档是否适合 ML 用户的使用场景

通过 5 轮迭代，LLM judge 与人类判断的对齐率从 46% 提升到 75.2%。

### 第二步：Distinct Query Generation

**核心创新**：将目标文档和 ground truth 查询同时给 LLM，ground truth 作为负面示例，要求生成与之不同的查询。

```markdown
基于以下信息：
<document>...</document>

这是一个示例查询：
<query>ground truth query</query>

请生成一个与示例不同但相关的查询。
```

**效果**：显著降低 query-query 相似度（从 0.716 → 0.628），同时保持 query-document 相关性分布相似。

## 实验验证

### 公开数据集实验（9 个数据集，5 个 embedding 模型）

**关键发现：Naive 生成大量复制了 ground truth**

```
Wikipedia Multilingual (en):
- 11.91% 的生成查询与 ground truth 相似度 > 0.9（几乎相同）
- 65.89% 介于 0.6-0.9（轻微改写）
```

### Distinct 生成验证

**生成的查询是独特的**：
- 平均 query-query 相似度显著降低
- 在所有数据集和模型上保持一致

**生成的查询具有代表性**：

| 指标 | 验证方式 |
|------|---------|
| 相对 embedding 模型排名 | Recall@k 排名一致 |
| Query-Document 分布 | KL 散度低（~0.05-0.2） |

## 生产环境验证（Weights & Biases）

### 实验设置

- 数据：WandBot（技术文档支持机器人）的生产查询
- 2003 个唯一查询
- 13,319 → 8,490 个过滤后的文档

### 查询生成方法

```
提供上下文 + 示例查询 → Claude 生成 → 与 ground truth 对比
```

### 关键结果

| Embedding 模型 | Ground Truth Recall@10 | Generated Recall@10 |
|---------------|----------------------|-------------------|
| text-embedding-3-small | 0.439 | 0.530 |
| text-embedding-3-large | 0.552 | 0.602 |
| jina-embeddings-v3 | 0.511 | 0.532 |
| voyage-3-large | 0.670 | 0.679 |

**重要发现**：
- 生成查询保持了模型间相对排名
- MTEB 表现与生产环境表现存在差异：jina-embeddings-v3 在 MTEB 上优于 text-embedding-3-large，但在 WandBot 上相反

**这验证了核心论点：公开 benchmark 性能不能直接泛化到真实生产环境。**

### 消融实验

| 方法 | KL 散度（与 ground truth） |
|------|------------------------|
| Naive 生成（无上下文） | 0.207 |
| 带上下文和示例生成 | **0.159** |

上下文和示例对于生成代表性查询至关重要。

## 局限性

1. **生产数据集多样性有限**：目前只在 Weights & Biases 数据集上验证
2. **无匹配文档的查询**：生产中常见的 no-match 场景未被当前指标覆盖

## 核心要点

- 公开 benchmark 性能与生产性能存在偏差，需要针对性评估
- 生成查询时，提供上下文和示例比 naive 生成更能代表真实查询
- 通过 document filtering + distinct query generation 流程可生成高质量 benchmark
- Embedding 模型排名在公开 benchmark 和生产环境可能不同
- 代码已开源：github.com/chroma-core/generative-benchmarking
