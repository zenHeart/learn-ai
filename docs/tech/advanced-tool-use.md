# Advanced Tool Use（Anthropic）

> 来源：https://www.anthropic.com/engineering/advanced-tool-use

## 核心要点

1. **工具定义即 Context 成本**：58 个工具定义可消耗 55K+ tokens，GitHub 35 个工具 ~26K tokens，Jira 一个 ~17K tokens
2. **三大新能力**：
   - **Tool Search**：Agent 按需搜索工具而非一次性加载全部，减少 Context 消耗
   - **Programmatic Tool Calling**：代码执行环境中调用工具，减少中间结果对 Context 的影响
   - **Tool Use Examples**：用示例而非 Schema 教会模型工具的正确用法模式
3. **适用场景**：多工具 Agent（IDE 助手连接 Git/文件/包管理/测试/部署）、企业运营助手（连接 Slack/GitHub/Jira/DB/MCP）
4. **Claude for Excel 案例**：用 Programmatic Tool Calling 处理万行表格，不压垮 Context 窗口
5. **核心洞察**：工具数量爆炸 → 按需发现 + 代码编排 + 示例学习，是 AI Agent 规模化的必由之路
