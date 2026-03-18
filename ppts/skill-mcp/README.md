# MCP + SKILL (第三期)

本系列旨在帮助开发者理解 MCP 协议架构，掌握 MCP Server 开发，同时学会使用 Skill 构建自动化工作流，让 AI 能够对接内部系统，将工作流自动化。

## 核心内容

### MCP 协议
1. **MCP 概述** - 什么是 MCP、解决的问题 (N × M 集成噩梦)
2. **架构设计** - Host/Client/Server 三方架构、传输层 (stdio/SSE)
3. **协议详解** - JSON-RPC 2.0、Tools/Resources/Prompts 三大件
4. **Server 开发 TypeScript** - SDK 实战
5. **Server 开发 Python** - FastMCP 最佳实践
6. **工具集成** - Claude Code / Cursor MCP 配置

### SKILL 工作流
7. **Skill 核心** - Skill 本质：从硬编码到 Tool Use
8. **Skill 构建心法** - 优质 Skill 的三大要素：边界、Schema、容错
9. **技能生态** - Claude Skills 与 Cursor Directory (.cursorrules)

### 实战与 QA
10. **实战场景** - MCP + Skill 组合工作流
11. **QA** - 常见问题解答

## 预期收获

- 深入理解 MCP 协议架构和通信机制
- 掌握 TypeScript/Python SDK 开发 MCP Server
- 能够开发生产级 MCP Server
- 掌握高阶 Skill 构建心法
- 学会将团队规范沉淀为自动化资产
- 掌握 MCP + Skill 组合工作流

## 能力等级

本系列对应 **L5** 能力等级：能力扩展 - 能够通过 MCP + Skill 构建企业级 AI 工作流

## 参考资源

### MCP
- [MCP 官方文档](https://modelcontextprotocol.io)
- [MCP SPEC](https://spec.modelcontextprotocol.io)
- [Microsoft MCP for Beginners](https://github.com/microsoft/mcp-for-beginners)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)

### SKILL
- [Anthropic Tool Use Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [Claude Code Skills](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Cursor Rules 指南](https://cursor.sh/cursorrules)
