# Jira MCP Server · TypeScript

最小可运行的 Jira MCP Server，用 `@modelcontextprotocol/sdk` 实现。

## 能力

* `get_jira_issue(issueId)` —— Tool · 查工单详情
* `list_my_issues(status)` —— Tool · 列我的工单
* `jira://schema` —— Resource · 工单字段说明

## 运行

```bash
cp .env.example .env
# 编辑 .env，填入 JIRA_BASE 和 JIRA_TOKEN

npm install
npm run dev      # 开发模式（tsx 直接运行）
npm run inspect  # 用 MCP Inspector 调试
npm run build    # 编译到 dist/
```

## 注册到 Claude Code

```bash
# 开发模式
claude mcp add jira-local -- npx tsx /absolute/path/to/server.ts

# 或编译后
npm run build
claude mcp add jira-local -- node /absolute/path/to/dist/server.js

# 验证
claude mcp list
```

## 现场使用

```
> 帮我看下 PROJ-1024 现在啥状态？

[Claude 自动调用 get_jira_issue]
{
  "id": "PROJ-1024",
  "status": "In Progress",
  "assignee": "张三",
  "summary": "修复登录页空指针",
  "labels": ["bugfix", "P1"],
  "priority": "High"
}
```

## 错误处理

* Jira API 失败 → Tool 返回 `isError: true` + 错误文本（不抛出）
* 超时 10s → AbortSignal 自动取消
* 工单 ID 格式错 → zod schema 拒绝（在调用前）
