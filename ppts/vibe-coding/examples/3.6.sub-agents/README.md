# 3.6 Sub Agents (多重分身 / 子智能体)

**一句话核心**：本示例通过「运行脚本 + 在 Cursor/Claude 中体验多任务拆解」演示 **Sub-Agents** 如何把复杂需求拆成多个专注子任务，缩小单次上下文、提升正确率。

---

## 1. 概念简述

当需求涉及几十个文件、上下文极长时，单一大 Prompt 容易“幻觉”或烂尾。**Sub-Agents** 架构让**总指挥**只负责拆任务、分发、验收，**专职小兵**（如“UI Agent”“数据库 Agent”“日志排查 Agent”）只处理被切分后的小上下文，专注度更高。通过树状或网状编排，大幅提升复杂工程的正确率。Cursor 的 Composer 会在复杂任务时自动启用子任务；Claude 支持在配置中显式定义 Sub-Agents。

---

## 2. 前置条件

- 已安装 **Cursor** 或 **Claude Code**。
- 本示例以运行脚本建立概念为主；真实体验可在 Cursor Composer 或 Claude 中发起一个多文件/多步骤任务并观察拆解行为。

---

## 3. 操作步骤

### 步骤 A：运行脚本（可选）

1. 打开终端，进入：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:3.6`
3. **预期结果**：终端输出与 Sub-Agents、任务拆解或编排相关的演示说明。

### 步骤 B：在 Cursor 中体验（可选）

1. 用 Cursor 以 **`ppts/vibe-coding/examples`** 为工作区根目录打开。
2. 打开 **Composer**（`Cmd+I`），输入一个较复杂的多步骤任务，例如（可直接复制）：
   ```text
   请先列出 examples 下 2.x 和 3.x 目录的 README 标题，再总结它们分别讲了哪些概念，最后用一句话概括 2.x 与 3.x 的区别。
   ```
3. **预期结果**：Composer 可能会自动拆成“列出文件”“读取内容”“总结对比”等子任务，你在主界面看到汇总结果。

### 步骤 C：在 Claude Code 中配置 Sub-Agents（可选）

1. 在 `~/.claude/` 下创建或编辑配置，定义子 Agent（具体路径与格式以 [Claude 文档](https://code.claude.com/docs/en/sub-agents) 为准），例如创建 `sub-agents/` 目录及 `frontend-agent.md`、`backend-agent.md` 等描述文件。
2. 在主对话中通过 `@frontend-agent` 等方式调用，或使用 `/sub-agent` 类命令进行任务分发。
3. **预期结果**：不同子 Agent 专注不同领域，主会话负责协调与汇总。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `3.6.sub-agents/index.ts` | 演示脚本入口 |

---

## 5. 核心要点

- **分而治之**同样适用于 AI：拆解任务边界、缩小单次上下文，是降低大模型出错率的有效手段。
- Cursor 的 Sub-Agents 多为底层自动调度；Claude 支持显式编排与命名子 Agent。
- 总指挥负责“拆单 + 验收”，子 Agent 负责“专注执行”。

---

## 6. 延伸阅读

- **官方文档**：  
  - Cursor：[Sub-agents](https://cursor.com/docs/context/subagents)、[Composer / Agent 模式](https://cursor.com/docs/agent/overview)  
  - Claude Code：[Sub-Agents](https://code.claude.com/docs/en/sub-agents)、[Agent Teams](https://code.claude.com/docs/en/agent-teams)
