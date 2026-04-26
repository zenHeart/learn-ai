# AGENTS.md

本文档指导 AI 编码代理（Claude Code、Cursor、Gemini CLI 等）在本仓库中的工作方式。

## 环境设置

- **安装依赖**: `pnpm install`（仅在根目录使用 pnpm）
- **不要在根目录运行 `npm install`** - 会导致版本不匹配

## 命令

```bash
# 文档
pnpm docs:dev
pnpm docs:build

# PPT
pnpm ppt:vibe      # Vibe Coding
pnpm ppt:prompt   # Prompt + Context
pnpm ppt:skill    # Skill + MCP
pnpm ppt:agent    # Agent

pnpm ppt:build    # 构建所有 PPT
```

## 内容标准 (Content Standards)

### 每个技术文档必须包含 (Must Include)
1. **先决条件 (Prerequisites)**: 所需的知识或工具。
2. **学习目标 (Learning Objectives)**: 读者将学到什么。
3. **理论部分 (Theory)**: 解释核心概念。
4. **代码示例 (Code Example)**: 完整的、可运行的代码。
5. **实际用例 (Real-World Use Case)**: 什么时候使用。
6. **常见陷阱 (Common Pitfalls)**: 需要避免的问题。
7. **下一步 (Next Steps)**: 进阶方向。

### 代码示例要求 (Code Example Requirements)
- ✅ **完整性**: 复制即用。
- ✅ **TypeScript**: 优先使用 TS 而非 JS。
- ✅ **现代化**: 使用 async/await, fetch 等。
- ✅ **注释清晰**: 解释非直观部分。
- ✅ **错误处理**: 展示正确的模式。

## 项目结构
...
| 组件 | 位置 | 技术 |
|------|------|------|
| 文档 | `/docs` | VitePress 1.6.x + Vue 3 |
| 演示 | `/ppts` | Slidev 0.52.x |
| 示例 | `/examples` | Node.js, TypeScript |

`ppts/*` 下的 PPT 是独立的 Slidev 项目，各自拥有 `package.json`；这些目录内部使用 **npm**。根目录使用 **pnpm**。

## 代码风格

- 仅使用 ES modules（`import`/`export`）。根目录有 `"type": "module"`。
- 包管理器：根目录用 pnpm；`ppts/*` 内部用 npm

## 构建与部署

- **基础路径**（关键）：
  - VitePress: `base: '/learn-ai/'` 在 `docs/.vitepress/config.mjs`
  - 各 PPT: `slidev build --base /learn-ai/ppts/<name>/`

- **部署后 URL**：
  - 文档: `https://blog.zenheart.site/learn-ai/`
  - PPT: `https://blog.zenheart.site/learn-ai/ppts/vibe-coding/`、`.../prompt-context/`、`.../skill-mcp/`、`.../agent/`

## 测试

提交前运行 `pnpm docs:build` 和 `pnpm ppt:build` 确保构建成功。
