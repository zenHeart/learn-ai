# 2.2 Embedding (词嵌入与向量相似度)

**一句话核心**：本示例通过运行脚本演示 **Embedding 与语义相似度**，你将理解文本如何被映射为高维向量、以及为何 RAG 与代码库检索都依赖这一机制。

---

## 1. 概念简述

计算机擅长处理数字与向量。**Embedding（嵌入）** 把非结构化数据（文本、代码等）映射到高维数学空间（如 1536 维）；语义相近的句子在该空间中“距离”更近。常用 **余弦相似度** 或欧氏距离衡量，这是 RAG（检索增强生成）、代码库 AI 搜索等能力的底层基础。

---

## 2. 前置条件

- 已安装 **Node.js 18+**，并在 `ppts/vibe-coding/examples` 根目录执行过 `npm install`。
- 本示例以运行脚本为主；若需在 Cursor 中体验代码库索引，需以 `examples` 为工作区根目录打开。

---

## 3. 操作步骤

### 步骤 A：运行脚本

1. 打开终端，进入：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:2.2`
3. **预期结果**：终端输出向量相似度或 Embedding 相关演示结果（如两段文本的相似度数值）。

### 步骤 B：在 Cursor 中体验（可选）

1. 用 Cursor 以 **`ppts/vibe-coding/examples`** 为工作区根目录打开。
2. 打开 **Settings > Features > Embeddings**，配置 Embeddings API（若可用）。
3. 启用代码库索引功能。
4. **预期结果**：Cursor 可为项目建立向量索引，支持语义搜索与引用。

### 步骤 C：在 Claude Code 中（可选）

1. 在终端进入 `examples` 或本示例子目录，执行：`claude`。
2. Claude Code 会为当前项目自动创建 embeddings 索引。
3. **预期结果**：在对话中可依赖项目级语义理解进行问答或引用。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `2.2.embedding/index.ts` | 演示脚本入口，展示 Embedding / 相似度计算 |

---

## 5. 核心要点

- Embedding 把任意内容变成特定维度的**高维坐标**。
- 余弦相似度越接近 **1** 表示含义越相近。
- RAG 与代码库检索都依赖“语义相似”而非字面匹配。

---

## 6. 延伸阅读

- **概念延伸**：Embedding 质量直接影响检索与 RAG 效果；不同模型与维度（如 1536、3072）在成本与效果上需权衡。
- **官方文档**：  
  - Cursor：[Codebase Indexing / Semantic Search](https://cursor.com/docs/context/semantic-search)  
  - Claude Code：项目级索引与上下文 [Memory / 记忆](https://code.claude.com/docs/en/memory)。
- **本课程材料**：可结合 `ppts/vibe-coding/tool-feature.md` 中「Codebase Indexing」与各工具 Feature Matrix 做扩展阅读。
