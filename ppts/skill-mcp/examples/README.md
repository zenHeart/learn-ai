# skill-mcp Examples

第三期 PPT「MCP + Skill」配套的可运行示例。

## 目录

| Demo | 目录 | 类型 | 说明 |
|---|---|---|---|
| **A · Jira MCP Server** | [`jira-mcp-server/typescript/`](./jira-mcp-server/typescript) | TypeScript SDK | 把 Jira 包成 MCP Server，提供 Tool + Resource |
| **A · Jira MCP Server** | [`jira-mcp-server/python/`](./jira-mcp-server/python) | Python FastMCP | 等价 Python 实现，对标 FastAPI 心智模型 |
| **B · Code Review Skill** | [`code-review-skill/`](./code-review-skill) | SKILL.md | 团队 Code Review SOP 沉淀 |
| **C · Release Orchestration** | [`release-orchestration/`](./release-orchestration) | SKILL.md | Skill 编排多个 MCP Server 完成发版 |

## 运行前提

* Node.js ≥ 20（Demo A TS 版）
* Python ≥ 3.11（Demo A Python 版）
* 一台支持 MCP 的 Host：Claude Code / Claude Desktop / Cursor / VS Code

## 快速开始

```bash
# Demo A · TypeScript
cd jira-mcp-server/typescript
cp .env.example .env  # 填入你的 JIRA_BASE 和 JIRA_TOKEN
npm install
npm run build
npx @modelcontextprotocol/inspector node dist/server.js  # 用 Inspector 调试

# Demo A · Python
cd jira-mcp-server/python
cp .env.example .env
pip install -r requirements.txt
python server.py

# Demo B · 安装 Skill
cp -r code-review-skill ~/.claude/skills/code-review

# Demo C · 安装 Skill
cp -r release-orchestration ~/.claude/skills/release-staging
```

## 参考资源

* MCP 官方文档：<https://modelcontextprotocol.io>
* Skill 规范：<https://agentskills.io/specification>
* Inspector：<https://github.com/modelcontextprotocol/inspector>
* awesome-mcp-servers：<https://github.com/punkpeye/awesome-mcp-servers>
* anthropics/skills：<https://github.com/anthropics/skills>
