# CLAUDE.md

此文件为 Claude Code 在本项目中工作时提供指导。

## 项目概述

**Learn AI** 是一个面向前端工程师的 AI 学习平台，包含以下核心组件：

- **文档站点**: VitePress 构建 (`/docs`)，支持中英文双语
- **交互式演示**: Slidev 构建的 PPT (`/ppts`)
- **实战示例**: MCP 服务器、本地 LLM 集成 (`/examples`)

## 技术栈

- **文档**: VitePress 1.6.4 + Vue 3
- **演示**: Slidev 0.52.12 (主题: Seriph)
- **运行时**: Node.js (ES Modules)
- **包管理器**:
  - `pnpm` (根目录) - 通过 `packageManager` 字段强制使用
  - `npm` (PPTs 目录内) - 独立构建流程

## 常用命令

### 文档开发 (VitePress)

在项目根目录运行：

```bash
# 启动开发服务器
pnpm docs:dev

# 构建文档到 docs/.vitepress/dist
pnpm docs:build

# 预览构建后的文档
pnpm docs:preview
```

### 演示文稿开发 (Slidev)

PPT 是独立包，位于 `ppts/` 目录：

```bash
# 开发模式
pnpm ppt:vibe      # Vibe Coding PPT
pnpm ppt:prompt    # Prompt Engineering PPT
pnpm ppt:mcp        # MCP Protocol PPT
pnpm ppt:skill     # SKILL PPT
pnpm ppt:agent     # AGENT PPT

# 生产构建
pnpm ppt:build           # 构建所有 PPT
pnpm ppt:build:vibe
pnpm ppt:build:prompt
pnpm ppt:build:mcp
pnpm ppt:build:skill
pnpm ppt:build:agent
```

### 示例代码

```bash
# MCP Lab 示例
cd examples/mcp-lab
npm install
npm start

# Ollama Node 示例
cd examples/ollama-node
node api.js
```

## 文档结构

```
docs/
├── tech/                    # 技术概念
│   ├── fundamentals/       # 基础 (LLM, Context, Embeddings, Prompt)
│   ├── frontend/           # 前端 AI (Streaming, Generative UI, Browser AI)
│   ├── engineering/        # 工程化 (Testing, Evals, Observability, Security)
│   ├── patterns/           # 模式 (RAG, Agents)
│   └── training/           # 训练 (SFT, RLHF, PEFT)
├── integration/            # 集成指南
│   ├── apis/              # API (OpenAI, Anthropic, HuggingFace, Streaming)
│   ├── frameworks/         # 框架 (Vercel AI SDK, LangChain, LlamaIndex, Next.js)
│   ├── protocols/          # 协议 (MCP, Tool Calling)
│   └── frontend-ml/        # 前端 ML (Transformers.js, TensorFlow.js, ml5.js)
├── projects/               # 实战项目
│   ├── beginner/          # 初级 (AI Chatbot, Text Summarizer, Image Generator)
│   ├── intermediate/      # 中级 (RAG Search, Code Completion, AI Form Builder)
│   └── advanced/          # 高级 (Full Stack SaaS, Multi-Agent App, AI Design Tool)
├── cookbook/               # 烹饪书 (Chat UI, API Proxy, Embeddings, etc.)
├── deployment/             # 部署 (Vercel Edge, Cloudflare Workers, Caching, etc.)
├── use-cases/              # 应用场景 (AI Search, Recommendations, Accessibility)
├── products/               # AI 工具与产品
│   ├── ai-coding/          # AI 编程工具 (Cursor, Copilot, Claude CLI, Gemini CLI)
│   └── tools/              # 工具 (Ollama, Figma AI, Testing AI)
├── paths/                  # 学习路径
│   ├── productivity/       # 路径一: 生产力提升
│   ├── integration/        # 路径二: AI 集成
│   └── mastery/            # 路径三: 精通
└── zh/                     # 中文文档 (完整翻译)
```

### PPT 演示文稿

```
ppts/
├── vibe-coding/            # Vibe Coding 入门
├── prompt/                 # Prompt Engineering
├── mcp/                   # MCP Protocol 深度解析
├── skill/                 # AI 技能
└── agent/                 # AI Agent 原理与实践
```

## 架构

### 多组件构建系统

项目使用**统一部署架构**，三个独立组件分别构建后合并：

1. **VitePress 文档** (`/docs`) - 主文档站点
2. **Vibe Coding PPT** (`/ppts/vibe-coding`)
3. **Prompt Engineering PPT** (`/ppts/prompt`)
4. **MCP Protocol PPT** (`/ppts/mcp`)
5. **SKILL PPT** (`/ppts/skill`)
6. **AGENT PPT** (`/ppts/agent`)

**关键构建细节**: 每个演示都有独立的 `package.json`，运行 `slidev build --base /learn-ai/ppts/[name]/` 确保部署时路径正确。

### GitHub Actions 部署流程

工作流位置: `.github/workflows/deploy.yml`

**部署步骤**:
1. 构建 VitePress 文档 → `docs/.vitepress/dist`
2. 构建每个 PPT → `ppts/*/dist`
3. 合并所有内容到 `final_dist/`
4. 添加 `.nojekyll` 防止 GitHub Pages Jekyll 处理
5. 部署 `final_dist/` 到 gh-pages 分支

**部署后的 URL**:
- 文档: `https://blog.zenheart.site/learn-ai/`
- Vibe Coding PPT: `https://blog.zenheart.site/learn-ai/ppts/vibe-coding/`
- Prompt PPT: `https://blog.zenheart.site/learn-ai/ppts/prompt/`
- MCP PPT: `https://blog.zenheart.site/learn-ai/ppts/mcp/`
- SKILL PPT: `https://blog.zenheart.site/learn-ai/ppts/skill/`
- AGENT PPT: `https://blog.zenheart.site/learn-ai/ppts/agent/`

## 开发工作流

### 添加文档

1. 在 `docs/` 的适当子目录创建 `.md` 文件
2. 手动更新 `docs/.vitepress/config.mjs` 侧边栏配置:
   - 侧边栏结构在配置中显式定义，非自动生成
   - 在相应部分添加新条目 (`Tech Stack` 或 `Products`)
   - 使用嵌套 `items` 数组实现层级导航
3. 本地测试: `pnpm docs:dev`，访问 <http://localhost:5173>
4. 提交后自动通过 GitHub Actions 部署到 gh-pages

### 添加演示文稿

各 PPT 的主要入口文件：
- Vibe Coding: `ppts/vibe-coding/slides.md`
- Prompt: `ppts/prompt/slides.md`
- MCP: `ppts/mcp/slides.md`
- SKILL: `ppts/skill/slides.md`
- AGENT: `ppts/agent/slides.md`

## 重要实现注意事项

### 路径解析

所有构建必须使用正确的 `--base` 参数：

- VitePress: `base: '/learn-ai/'` (在 config.mjs 中)
- Vibe Coding PPT: `slidev build --base /learn-ai/ppts/vibe-coding/`
- Prompt PPT: `slidev build --base /learn-ai/ppts/prompt/`
- MCP PPT: `slidev build --base /learn-ai/ppts/mcp/`
- SKILL PPT: `slidev build --base /learn-ai/ppts/skill/`
- AGENT PPT: `slidev build --base /learn-ai/ppts/agent/`

错误的 base 路径会导致 GitHub Pages 上 CSS/JS 加载失败。

### 死链检查

VitePress 死链检查器忽略 `/learn-ai/ppts/` 路径，因为 PPT 在外部构建。在文档和 PPT 之间添加交叉引用时，部署后需手动验证链接。

### ES Module 配置

根 `package.json` 有 `"type": "module"`。所有 JavaScript 文件使用 ES module 语法 (`import`/`export`，不用 `require`)。

### 包管理器强制

根目录必须使用 `pnpm`。在根目录运行 `npm install` 可能导致版本不匹配。

**例外**: PPT 子目录 (`ppts/vibe-coding/`, `ppts/prompt/` 等) 直接使用 `npm`，因为它们是独立的 Slidev 项目。这是设计如此，是构建流程必需的。
