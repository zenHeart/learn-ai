# CLAUDE.md

本文档为 Claude Code 在本项目中工作时提供指导。

## 项目概述

**Learn AI** 是一个面向前端工程师的 AI 学习平台，包含以下核心组件：

- **文档**: VitePress 站点 (`/docs`)
- **演示文稿**: Slidev PPT (`/ppts`)
- **示例代码**: AI 集成示例 (`/examples`)

## 命令

```bash
# 安装依赖（根目录 - 仅使用 pnpm）
pnpm install

# 文档开发
pnpm docs:dev      # 启动开发服务器 http://localhost:5173
pnpm docs:build   # 构建到 docs/.vitepress/dist
pnpm docs:preview # 预览构建结果

# PPT 开发（各自独立）
pnpm ppt:vibe     # Vibe Coding PPT
pnpm ppt:prompt   # Prompt + Context PPT
pnpm ppt:skill    # Skill + MCP PPT
pnpm ppt:agent    # Agent PPT

# PPT 构建
pnpm ppt:build          # 构建所有 PPT
pnpm ppt:build:vibe    # 构建指定 PPT
pnpm ppt:build:prompt
pnpm ppt:build:skill
pnpm ppt:build:agent
```

## 架构

### 多组件构建系统

项目使用统一部署架构，三个独立组件分别构建后合并：

1. **VitePress 文档** (`/docs`) - 主文档站点
2. **Slidev PPT** (`/ppts/*`) - 每个 PPT 都是独立的 Slidev 项目，有自己的 `package.json`

### PPT 结构规范

每个 PPT 遵循一致的命名模式：

```
ppts/<name>/
├── slides.md           # 入口文件
├── 01.overview.md     # 课程目标与大纲
├── 02.principle.md    # 核心原理
├── 03.features.md    # 特性与最佳实践
├── 04.practice.md    # 实战演练
├── 05.QA.md         # 问答
└── package.json      # 独立 npm 项目
```

多主题 PPT（如 skill-mcp）使用 Pattern B：

- `02.1.<主题A>.md`
- `02.2.<主题B>.md`
- `03.integration.md`（必选 - 讲解主题组合）

### 部署

- **CI**: GitHub Actions (`.github/workflows/deploy.yml`)
- **基础路径**（关键）：
  - VitePress: `base: '/learn-ai/'`（在 `docs/.vitepress/config.mjs` 中）
  - 各 PPT: `slidev build --base /learn-ai/ppts/<name>/`

## 重要约定

- **包管理器**: 根目录使用 pnpm（通过 `packageManager` 字段强制），`ppts/*` 内使用 npm
- **ES Modules**: 根目录有 `"type": "module"` - 使用 `import`/`export`，不用 `require()`
- **语言**: 所有代码、文档、提交信息使用英文
- **PPT 使用 setext 标题**: Slidev 需要用 `---` 分隔幻灯片，非标准 markdown 标题

## 关键文件

- 入口: `ppts/*/slides.md`
- 配置: `docs/.vitepress/config.mjs`
- 部署: `.github/workflows/deploy.yml`
