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
pnpm ppt:ai-native # 从提效到复利（第三期）
pnpm ppt:skill    # Skill + MCP（第四期）
pnpm ppt:agent    # Agent（第五期）

# PPT 构建
pnpm ppt:build          # 构建所有 PPT
pnpm ppt:build:vibe    # 构建指定 PPT
pnpm ppt:build:prompt
pnpm ppt:build:ai-native
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

多主题 PPT（如 `prompt-context`、`ai-native-work`）使用 Pattern B：

- `02.1.<主题A>.md`
- `02.2.<主题B>.md`
- `03.integration.md`（必选 - 讲解主题组合）

`skill-mcp`（第四期）按资产叙事拆为 `01.overview` → `02.principle` → `03.workflow` → `04.build` → `05.practice` → `06.QA` → `07.appendix`。

### 部署

- **CI**: GitHub Actions (`.github/workflows/deploy.yml`)
- **基础路径**（关键）：
  - VitePress: `base: '/'`（在 `docs/.vitepress/config.mjs` 中）
  - 各 PPT: `slidev build --base /ppts/<name>/`

## 重要约定

- **包管理器**: 根目录使用 pnpm（通过 `packageManager` 字段强制），`ppts/*` 内使用 npm
- **ES Modules**: 根目录有 `"type": "module"` - 使用 `import`/`export`，不用 `require()`
- **语言**: 所有代码、文档、提交信息使用英文
- **PPT 使用 setext 标题**: Slidev 需要用 `---` 分隔幻灯片，非标准 markdown 标题
- **`.claude/` 目录下 Skill/Agent 必须放在规定子路径**: Skill 只能放在 `.claude/skills/<name>/SKILL.md`，Agent 只能放在 `.claude/agents/<name>.md`；直接放在 `.claude/` 根目录（如 `.claude/SKILL.md`）不会被发现，属于无效死文件，曾经误提交过，新增时注意路径

## 关键文件

- 入口: `ppts/*/slides.md`
- 配置: `docs/.vitepress/config.mjs`
- 部署: `.github/workflows/deploy.yml`

文档研究技能由 Jue 从 ai-assets content preset 同步。本仓只维护 `references/<tool-slug>.md`（见 `learn-ai-bindings.md`）。生成块在下方 `AI-JUE` 标记内，不要手改。

<!-- AI-JUE:START -->
# Content Preset

写作、演讲、Slidev、流程图、视频摘要、**官方文档研究**等产出向 Capability。

- 产品/工具教程研究：`skills/doc-research`（先官方一级导航，再文档树）。配套 Agent：`doc-quality-auditor`（审计）、`deep-search-optimizer`（发现）。
- 发布前论断核验：`skills/fact-audit`，不要和 doc-research 再拆第三套反杜撰。
- 技术课 PPT：`skills/slidev-ppt-creator`（含 `assets/lessons-learned.md`）。

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
pnpm ppt:skill    # Skill + MCP（技术附录）
pnpm ppt:agent    # Agent（技术附录）
pnpm ppt:ai-native # 从提效到复利：AI Agent 工作模式（第三期）

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

## 写作风格与逻辑 (Writing Style & Logic)

为了保持仓库内容的一致性，所有文档必须遵循以下“技术负责人（Tech Lead）”风格及 Google Technical Writing 最佳实践：

1. **结论先行 (BLUF)**：在文章或章节开头直接抛出核心结论、摘要或 CEO/CTO 关注的问题。
2. **强结构化与可扫读性**：
   - 复杂信息必须使用**表格**降维对比。
   - 核心关键词或动作必须使用**加粗（Bold）**。
   - 善用列表（有序/无序）和引用块（`> `）进行补充。
3. **受众与预期前置**：明确指出“写给谁看”以及“需要什么前置知识”，并提供扩展阅读。
4. **目标与非目标 (Goals & Non-goals)**：不仅说明“是什么”，还要明确强调“它不是什么”。
5. **防御性写作**：预判读者或系统的错误路径，提前设置“护栏（Guardrails）”和否定约束（如：NEVER...）。
6. **简洁准确 (Google Style)**：
   - 使用主动语态（Active Voice）。
   - 句子要短（短句 > 复合长句）。
   - 标题必须以任务或目的为导向（Task-based）。
   - 术语一致性：第一次出现专业术语（如 RAG, Token）必须给出通俗解释。

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
  - VitePress: `base: '/'` 在 `docs/.vitepress/config.mjs`
  - 各 PPT: `slidev build --base /ppts/<name>/`

- **部署后 URL**：
  - 文档: `https://ai.zenheart.site/`
  - PPT: `https://ai.zenheart.site/ppts/vibe-coding/`、`.../prompt-context/`、`.../ai-native-work/`、`.../skill-mcp/`、`.../agent/`

## 测试

提交前运行 `pnpm docs:build` 和 `pnpm ppt:build` 确保构建成功。
<!-- AI-JUE:END -->