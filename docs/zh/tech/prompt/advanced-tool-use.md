# Advanced Tool Use (Anthropic)

> 原文: [Introducing advanced tool use on the Claude Developer Platform](https://www.anthropic.com/engineering/advanced-tool-use)

## 背景与动机

AI agents 的未来是模型能无缝跨数百乃至数千个工具工作。但传统工具使用面临三个根本问题：

1. **Context 污染**：工具定义随连接的工具服务器增加而膨胀，如 5 个服务器配置就消耗 55K+ tokens
2. **推理开销**：每个工具调用都需要一次完整推理 pass，累积延迟
3. **使用模式表达不足**：JSON Schema 能定义结构，但无法表达使用模式（何时用哪个参数、参数组合惯例等）

## 三大新特性

### 1. Tool Search Tool（工具搜索工具）

#### 问题

MCP 工具定义消耗大量 tokens：
- GitHub: 35 工具 ~26K tokens
- Slack: 11 工具 ~21K tokens
- Sentry/Grafana/Splunk: ~8K tokens
- 总计约 55K tokens

#### 解决方案

按需发现工具，而非预先全部加载：

```
传统方式：所有工具定义 → 72K tokens 初始消耗
Tool Search：仅 Tool Search Tool → 500 tokens
            工具发现后按需加载 → 3K tokens
            总计约 8.7K tokens（节省 85%）
```

#### 工作原理

```json
{
  "tools": [
    {"type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex"},
    {
      "name": "github.createPullRequest",
      "input_schema": {...},
      "defer_loading": true  // 延迟加载
    }
  ]
}
```

- 标记 `defer_loading: true` 的工具初始不加载
- Claude 需要时通过搜索找到相关工具
- 仅相关工具的完整定义被加载进 context

#### 效果

- Opus 4 在 MCP 评估上：49% → 74%
- Opus 4.5：79.5% → 88.1%

### 2. Programmatic Tool Calling（编程式工具调用）

#### 问题

- 中间结果污染 context：如分析 10MB 日志文件，全部内容进入 context
- 每个工具调用一次推理 pass，累积延迟

#### 解决方案

让 Claude 在代码执行环境中编排工具，而非逐个 API 调用：

```python
team = await get_team_members("engineering")
budgets = {level: budget for level, budget in zip(levels, budget_results)}
expenses = await asyncio.gather(*[
    get_expenses(m["id"], "Q3") for m in team
])
# 仅最终结果进入 Claude context
```

#### 工作原理

```json
{
  "tools": [
    {"type": "code_execution_20250825", "name": "code_execution"},
    {
      "name": "get_expenses",
      "input_schema": {...},
      "allowed_callers": ["code_execution_20250825"]  // 允许代码调用
    }
  ]
}
```

#### 效果

- Token 消耗：43,588 → 27,297（降低 37%）
- 知识检索提升：25.6% → 28.5%
- GIA 基准：46.5% → 51.2%

### 3. Tool Use Examples（工具使用示例）

#### 问题

JSON Schema 定义了什么是合法的，但无法表达：
- 日期格式：`2024-11-06` vs `Nov 6, 2024`?
- ID 格式：`UUID` vs `USR-12345`?
- 何时填充嵌套对象？
- 参数间的关系？

#### 解决方案

在工具定义中直接提供示例：

```json
{
  "name": "create_ticket",
  "input_schema": {...},
  "input_examples": [
    {
      "title": "Login page returns 500 error",
      "priority": "critical",
      "labels": ["bug", "authentication", "production"],
      "reporter": {"id": "USR-12345", "name": "Jane Smith"},
      "due_date": "2024-11-06",
      "escalation": {"level": 2, "notify_manager": true, "sla_hours": 4}
    },
    {
      "title": "Add dark mode support",
      "labels": ["feature-request", "ui"],
      "reporter": {"id": "USR-67890", "name": "Alex Chen"}
    }
  ]
}
```

#### 效果

复杂参数处理准确率：72% → 90%

## 三者组合策略

```
Context 膨胀 → Tool Search Tool
中间结果污染 → Programmatic Tool Calling
参数错误 → Tool Use Examples
```

并非所有 agent 都需要同时用三者，从最大瓶颈开始，逐层叠加。

## 最佳实践

### Tool Search Tool

- 保持 3-5 个最常用工具始终加载
- 清晰描述工具名称和功能
- 添加 system prompt 说明可用工具类别

### Programmatic Tool Calling

- 清楚记录返回格式
- 适合可并行运行、独立操作、可重试的工具
- 文档化解析逻辑

### Tool Use Examples

- 使用真实数据（真实城市名、可信价格）
- 展示 minimal、partial、full 规范模式
- 每个工具 1-5 个示例
- 聚焦歧义点

## 核心要点

- 三大特性解决工具使用的不同瓶颈：发现效率、执行效率、调用准确性
- 按需组合使用，而非一股脑全开
- 工具搜索不破坏 prompt caching（延迟工具排除在初始 prompt 外）
- 这些特性将工具使用从简单函数调用推向智能编排
