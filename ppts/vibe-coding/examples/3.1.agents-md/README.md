# 3.1 AGENTS.md (项目上下文注入)

**一句话核心**：本示例通过「让 AI 重构不符合规范的代码」演示 **AGENTS.md 如何作为项目级规则被自动注入**，你将学会在 Cursor/Claude 中依赖 AGENTS.md 统一技术栈与规范。

---

## 1. 概念简述

在大型项目中，如何让 AI 与团队成员都遵守同一套架构与规范？**AGENTS.md**（或 Claude 的 CLAUDE.md）放在项目根目录后，会被工具**静默作为 System Prompt 的一部分**发给模型。这样无需每次在对话里重复“用 TypeScript、用 dayjs、要单测”，AI 会优先遵守文件中的约定，相当于给 AI 置入项目级“潜意识”。

---

## 2. 前置条件

- 已安装 **Cursor** 或 **Claude Code**。
- 请以 **`ppts/vibe-coding/examples`** 或 **`examples/3.1.agents-md`** 为工作区根目录打开，确保能读到本目录下的 `AGENTS.md`。

---

## 3. 操作步骤

### 步骤 A：了解本示例场景

本目录中的 `countdown.ts`  deliberately 违反 `AGENTS.md` 的约定（使用原生 `Date`、缺少类型、无单测）。下面通过 Cursor 或 Claude 让 AI 按 AGENTS.md 重构。

### 步骤 B：在 Cursor 中操作

1. 用 Cursor 打开工作区：**`ppts/vibe-coding/examples`** 或 **`examples/3.1.agents-md`**。
2. 打开文件：`3.1.agents-md/countdown.ts`（若以 examples 为根，路径为 `3.1.agents-md/countdown.ts`）。
3. 选中**全部代码**，按 `Cmd+K`（Windows/Linux：`Ctrl+K`），在输入框中粘贴以下 Prompt（可直接复制）：
   ```text
   重构此代码，使其符合项目规范
   ```
4. **预期结果**：
   - AI 会引入 `dayjs` 替换原生 `Date`；
   - 为函数与参数添加 TypeScript 类型；
   - 可能生成对应的 `.test.ts` 单测文件。

### 步骤 C：在 Claude Code 中操作

1. 终端进入本示例子目录或 `examples`：`cd /path/to/learn-ai/ppts/vibe-coding/examples/3.1.agents-md`（或 `examples`）。
2. 执行：`claude`。
3. 在对话中输入（可直接复制）：
   ```text
   重构 countdown.ts 使其符合项目规范，包括添加单元测试
   ```
4. **预期结果**：
   - Claude 会读取 `AGENTS.md`，使用 dayjs、补全类型，并创建如 `countdown.test.ts` 的测试文件。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `AGENTS.md` | 项目核心规约（TypeScript + dayjs + vitest） |
| `countdown.ts` | 示例代码：故意使用原生 Date、缺类型与单测，供 AI 重构 |

---

## 5. 核心要点

- **Context Engineering 大于纯 Prompt 技巧**：把基调写在 AGENTS.md 里，让每次对话都自带项目规范。
- 不要指望 AI 每次都猜对架构与库选型；**明确写在文件里**，成为工作流第一关。
- Claude 用户可用 `/init` 生成 CLAUDE.md，并在其中通过 `@AGENTS.md` 引用本项目的 AGENTS.md。

---

## 6. 延伸阅读

- **概念延伸**：AGENTS.md 与 .cursor/rules、.claude/rules 配合，可实现“宪法 + 地方法规”的分层规则；参见 3.2 Rules Matching。
- **官方文档**：  
  - Cursor：[AGENTS.md](https://cursor.com/docs/context/rules#agentsmd)  
  - Claude Code：[CLAUDE.md](https://code.claude.com/docs/en/best-practices#write-an-effective-claude-md)、[通过 @AGENTS.md 引用](https://github.com/anthropics/claude-code/issues/6235)
- **本课程材料**：可结合 `ppts/vibe-coding/tool-feature.md` 中「AGENTS.md」与各工具 Feature Matrix 做扩展阅读。
