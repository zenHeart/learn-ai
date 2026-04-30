# Jira MCP Server · Python (FastMCP)

与 [`../typescript`](../typescript) 等价的 Python 实现，对标 FastAPI 心智模型。

## 能力

* `get_jira_issue(issue_id)` —— Tool · 查工单
* `list_my_issues(status)` —— Tool · 列我的工单
* `jira://schema` —— Resource · 字段说明
* `summarize_ticket(issue_id)` —— Prompt · 模板化工单汇报（额外演示三大原语完整覆盖）

## 运行

```bash
cp .env.example .env
# 编辑 .env

python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

python server.py                                          # 直接跑
npx @modelcontextprotocol/inspector python server.py      # Inspector 调试
```

## 注册到 Claude Code

```bash
claude mcp add jira-local-py -- python /absolute/path/to/server.py
claude mcp list
```

## 与 TypeScript 版差异

| 维度 | TypeScript | Python (FastMCP) |
|---|---|---|
| Tool description | 显式字符串 | 来自 docstring |
| inputSchema | zod schema | 类型注解 + Literal |
| 错误处理 | `isError: true` | 抛异常（FastMCP 自动包装） |
| 启动 | `server.connect(transport)` | `mcp.run()` |

FastMCP 让你把"写 MCP Server"的体验降到"写 FastAPI"的水平 —— 装饰器 + 类型注解即可。
