# 3.6 Sub Agents (多重分身/子智能体)

## 概念解析
当 AI 处理一个 `Context Window` 极长、包含 50 多个文件的复杂全栈需求时，如果只用一个 Prompt 强行让它输出，很容易出现“幻觉”或者“烂尾”。

优秀的 AI 原生工具（不管是底层的 Cursor Composer，还是更高维度的 Devika/AutoGPT 框架）都在引入 **[Sub-Agents 架构](https://code.claude.com/docs/en/sub-agents)**：
- **总指挥 (Architect)** 只负责拆解任务、分发派单、最终验收。
- **专职小兵 (Worker)** 比如“UI 开发 Agent”、“数据库 Agent”、“日志排查 Agent”，它们只关注被切割后的小上下文，专注度极高。

通过**树状或网状的拓扑结构编排**，极大地提升了处理复杂大型工程的正确率。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:3.6
```

## 配置步骤

### Cursor IDE
- Cursor 的 Composer 模式自动使用 Sub-Agents
- 当处理复杂任务时，会自动创建子任务
- 用户只需观察主界面的汇总结果

### Claude Code
1. 在 `~/.claude/` 目录下创建子 Agent 配置
2. 创建 `sub-agents/` 文件夹，定义子 Agent:
   - `frontend-agent.md` - 前端开发 Agent
   - `backend-agent.md` - 后端开发 Agent
   - `test-agent.md` - 测试 Agent
3. 在主对话中通过 `@frontend-agent` 等方式调用
4. 或使用 `/sub-agent` 命令进行任务分发

## 核心要点
* 分而治之 (Divide and Conquer) 同样适用于人工智能。
* 拆解任务边界，缩小单次运算的上下文窗口，是降低大模型出错率的最有效手段。
