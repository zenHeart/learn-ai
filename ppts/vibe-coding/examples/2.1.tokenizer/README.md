# 2.1 Tokenizer (切词器) 原理

**一句话核心**：本示例通过运行脚本演示 **Token 切分与计数**，你将了解模型如何把文本变成 Token、以及为何计费与上下文窗口都以 Token 为单位。

---

## 1. 概念简述

AI 不直接“认识”自然语言中的字词，而是先把输入通过 **Tokenizer（切词库）** 拆成 **Token** 再转为数字 ID。不同语言与词汇产生的 Token 数量差异很大（如英文 `Hello world!` 约 3 个 Token，等义中文可能更多），因此大模型 API 按 **1M tokens** 计费，上下文窗口（Context Window）指的也是可承载的 Token 数量上限。

---

## 2. 前置条件

- 已安装 **Node.js 18+**，并在本仓库下执行过 `npm install`（在 `ppts/vibe-coding/examples` 根目录）。
- 本示例只需运行脚本，无需打开 Cursor 或 Claude Code。

---

## 3. 操作步骤

### 步骤 A：运行脚本

1. 打开终端，进入示例根目录：`cd /path/to/learn-ai/ppts/vibe-coding/examples`（将路径替换为你本地的 learn-ai 仓库位置）。
2. 执行：`npm run demo:2.1`
3. **预期结果**：终端输出示例文本的 Token 切分结果或数量说明，便于理解「一段话对应多少 Token」。

### 步骤 B：在 Cursor 中查看 Token（可选）

1. 打开 Cursor，进入 **Settings**（`Cmd+,` 或 `Ctrl+,`）。
2. 打开 **Features > Chat**，查看与 Token 计算相关的说明。
3. **预期结果**：了解 Cursor 如何统计对话中的 Token 使用。

### 步骤 C：在 Claude Code 中查看 Token（可选）

1. 在终端执行：`claude`。
2. 在对话中输入：`/tokens`
3. **预期结果**：查看当前对话的 Token 使用情况。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `2.1.tokenizer/index.ts` | 演示脚本入口，展示 Tokenizer 的切分与计数 |

---

## 5. 核心要点

- 模型计算成本以 **Token** 为颗粒度。
- 不同模型使用不同 Tokenizer（如 GPT-4 采用 `cl100k_base`）。
- 上下文窗口与 API 计费都基于 Token 数量。

---

## 6. 延伸阅读

- **概念延伸**：Token 数直接影响单次请求成本与可塞入的上下文长度；中英文混排、代码、表格都会改变 Token 数量，可在实际项目中用类似脚本做粗算。
- **官方文档**：  
  - Cursor：[Chat / 对话界面](https://cursor.com/docs/context/mentions)（可了解 Token 与上下文）  
  - Claude Code：在对话中输入 `/tokens` 查看使用情况；[Claude 文档](https://code.claude.com/docs/en/overview) 中有上下文与用量说明。
