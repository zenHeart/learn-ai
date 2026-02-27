# 2.3 Attention 机制

**一句话核心**：本示例通过运行脚本与多文件引用演示 **Self-Attention（自注意力）** 的概念，你将理解模型如何并行“观察”全句并处理指代关系。

---

## 1. 概念简述

[Transformer](https://arxiv.org/abs/1706.03762) 能取代 RNN 成为主流，核心在于 **Self-Attention**：不再顺序读文本，而是并行“观察”所有词。通过 **Query、Key、Value** 矩阵运算，模型能判断每个词与上下文中哪些部分最相关（例如“它”指代前文哪个名词），从而理解指代与长程依赖。

---

## 2. 前置条件

- 已安装 **Node.js 18+**，并在 `ppts/vibe-coding/examples` 根目录执行过 `npm install`。
- 若要在 Cursor/Claude 中体验多文件上下文，需以 `examples` 为工作区根目录打开。

---

## 3. 操作步骤

### 步骤 A：运行脚本

1. 打开终端，进入：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:2.3`
3. **预期结果**：终端输出与 Attention 或多上下文相关的演示说明。

### 步骤 B：在 Cursor 中体验多文件上下文（可选）

1. 用 Cursor 以 **`ppts/vibe-coding/examples`** 为工作区根目录打开。
2. 打开 **Composer**（`Cmd+I` 或 `Ctrl+I`），输入一个涉及多文件的任务描述（例如“总结 2.3.attention 与 2.4.tool-use 两个目录的 README 差异”）。
3. **预期结果**：AI 会并行读取多个文件并综合回答，体现“多位置同时关注”的 Attention 思想。

### 步骤 C：在 Claude Code 中（可选）

1. 在终端执行：`claude`。
2. 使用 `@` 引用多个文件（如 `@2.3.attention/README.md @2.4.tool-use/README.md`），再提问。
3. **预期结果**：Claude 基于多文件内容回答，体现跨文件关联理解。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `2.3.attention/index.ts` | 演示脚本入口 |

---

## 5. 核心要点

- 自注意力允许**并行阅读**整句或整段，而非逐词顺序。
- 每个词生成时都会动态感知上下文中不同部分的权重。
- 多文件引用（@file）与 Composer 多文件编辑都依赖“大上下文 + 注意力”机制。

---

## 6. 延伸阅读

- **概念延伸**：Attention 是 Transformer 的核心，也是长上下文、多文件理解的基础；实际工具中的“@ 引用”“Composer”都可视为 Attention 在工程中的体现。
- **官方文档**：  
  - Cursor：[Composer / Agent 模式](https://cursor.com/docs/agent/overview)、[@ 引用](https://cursor.com/docs/context/mentions)  
  - Claude Code：[多文件与上下文](https://code.claude.com/docs/en/overview)。
