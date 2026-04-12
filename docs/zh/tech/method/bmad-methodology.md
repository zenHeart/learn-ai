# BMAD Method

> 原文: https://github.com/bmad-code-org/BMAD-METHOD  
> 文档: https://docs.bmad-method.org

## 概述

**BMad Method** (Build More Architect Dreams) 是一个 AI 驱动的敏捷开发框架，隶属于 BMad Method Ecosystem。它帮助你从创意构思、规划一直到 Agent 实现，完成整个软件开发流程。

**100% 免费开源**，无付费墙，无 gated 内容。

## 核心理念

传统 AI 工具替你思考，产生平均水平的成果。BMad agents 和引导式工作流扮演专家协作者的角色，引导你通过结构化流程，在与 AI 的协作中发挥最佳思维。

## 核心特性

| 特性 | 说明 |
|------|------|
| **AI Intelligent Help** | 随时调用 `bmad-help` 技能，获得下一步指导 |
| **Scale-Domain-Adaptive** | 根据项目复杂度自动调整规划深度 |
| **Structured Workflows** | 基于敏捷最佳实践，涵盖分析、规划、架构和实现 |
| **Specialized Agents** | 12+ 领域专家（PM、架构师、开发者、UX 等） |
| **Party Mode** | 多个 agent 角色同堂协作讨论 |
| **Complete Lifecycle** | 从头脑风暴到部署的全生命周期 |

## 四阶段流程

BMad 通过引导式工作流与专业 AI agents 帮助构建软件，流程分四个阶段：

| 阶段 | 名称 | 内容 |
|------|------|------|
| 1 | Analysis | 头脑风暴、研究、产品简报或 PRFAQ（可选） |
| 2 | Planning | 创建需求文档（PRD 或 spec） |
| 3 | Solutioning | 设计架构（BMad Method/Enterprise 专用） |
| 4 | Implementation | 按 epic 逐个构建，story 逐个实施 |

## 三种规划路径

| 路径 | 适用场景 | 产出文档 |
|------|----------|----------|
| **Quick Flow** | Bug 修复、简单 feature、明确范围（1-15 stories） | 仅 Tech-spec |
| **BMad Method** | 产品、平台、复杂 feature（10-50+ stories） | PRD + Architecture + UX |
| **Enterprise** | 合规、多租户系统（30+ stories） | PRD + Architecture + Security + DevOps |

## BMad-Help

BMad-Help 是最快上手的方式。无需记忆工作流或阶段——只需提问，BMad-Help 会：

- 检查你的项目，看已完成的部分
- 根据已安装的模块展示选项
- 推荐下一步——包括第一个必做任务
- 回答 "我有个 SaaS 想法，从哪开始？" 这类问题

在 AI IDE 中调用：
```
bmad-help
```
或结合问题：
```
bmad-help I have a SaaS idea, where do I get started?
```

## 快速开始

### 环境要求

- Node.js v20+
- Python 3.10+
- uv 包管理器

### 安装

```bash
npx bmad-method install
```

按安装程序提示操作，然后在你偏好的 AI IDE（Claude Code、Cursor 等）中打开项目目录。

安装程序创建两个文件夹：
- `_bmad/` — agents、工作流、任务和配置
- `_bmad-output/` — 用于存放产出物

### 非交互式安装（CI/CD）

```bash
npx bmad-method install --directory /path/to/project --modules bmm --tools claude-code --yes
```

## 完整工作流

### Phase 1: Analysis（可选）

- `bmad-brainstorming` — 引导式头脑风暴
- `bmad-market-research` / `bmad-domain-research` / `bmad-technical-research` — 市场、领域和技术研究
- `bmad-product-brief` — 产品简报（推荐）
- `bmad-prfaq` — Working Backwards 挑战

### Phase 2: Planning

**BMad Method / Enterprise 路径：**
- 调用 PM agent → 运行 `bmad-create-prd` → 输出 PRD.md

**Quick Flow 路径：**
- 运行 `bmad-quick-dev`（一站式规划+实施）

### Phase 3: Solutioning（BMad Method / Enterprise）

- 调用 Architect agent → 运行 `bmad-create-architecture` → 输出架构文档
- 调用 PM agent → 运行 `bmad-create-epics-and-stories` → 基于 PRD 和 Architecture 创建 stories

### Phase 4: Implementation

每个 story 重复此循环（每次使用新 chat）：

| 步骤 | Agent | 工作流 | 用途 |
|------|-------|--------|------|
| 1 | DEV | `bmad-create-story` | 从 epic 创建 story 文件 |
| 2 | DEV | `bmad-dev-story` | 实施 story |
| 3 | DEV | `bmad-code-review` | 质量验证（推荐）|

完成后：调用 DEV agent → 运行 `bmad-retrospective`

## 完整工作流速查表

| 工作流 | Agent | 用途 |
|--------|-------|------|
| `bmad-help` ⭐ | Any | 你的智能指南 |
| `bmad-create-prd` | PM | 创建产品需求文档 |
| `bmad-create-architecture` | Architect | 创建架构文档 |
| `bmad-generate-project-context` | Analyst | 创建项目上下文文件 |
| `bmad-create-epics-and-stories` | PM | 将 PRD 分解为 epics |
| `bmad-check-implementation-readiness` | Architect | 验证规划一致性 |
| `bmad-sprint-planning` | DEV | 初始化 sprint 跟踪 |
| `bmad-create-story` | DEV | 从 epic 创建 story |
| `bmad-dev-story` | DEV | 实施 story |
| `bmad-code-review` | DEV | 审查实施代码 |

## 项目结构

安装后你的项目结构：
```
your-project/
├── _bmad/                        # BMad 配置
├── _bmad-output/
│   ├── planning-artifacts/
│   │   ├── PRD.md                # 需求文档
│   │   ├── architecture.md        # 技术决策
│   │   └── epics/                # Epic 和 story 文件
│   ├── implementation-artifacts/
│   │   └── sprint-status.yaml    # Sprint 跟踪
│   └── project-context.md         # 实施规则（可选）
└── ...
```

## 官方模块

| 模块 | 用途 |
|------|------|
| **BMad Method (BMM)** | 核心框架，34+ 工作流 |
| **BMad Builder (BMB)** | 创建自定义 BMad agents 和工作流 |
| **Test Architect (TEA)** | 基于风险的测试策略和自动化 |
| **Game Dev Studio (BMGD)** | 游戏开发工作流（Unity, Unreal, Godot） |
| **Creative Intelligence Suite (CIS)** | 创新、脑暴、设计思维 |

## V6 新特性

V6 带来了大量优化：
- 跨平台 Agent Team 和 Sub Agent 集成
- Skills 架构
- BMad Builder v1
- Dev Loop 自动化
- 等

## 与 AI IDE 集成

BMad 可与任何支持自定义系统提示或项目上下文的 AI 编码助手配合使用：
- **Claude Code** (推荐) — Anthropic 的 CLI 工具
- **Cursor** — AI-first 代码编辑器
- **Codex CLI** — OpenAI 的终端编码 agent

## 文档资源

- [官方文档](https://docs.bmad-method.org)
- [入门教程](https://docs.bmad-method.org/tutorials/getting-started/)
- [工作流地图](https://docs.bmad-method.org/reference/workflow-map/)
- [Roadmap](https://docs.bmad-method.org/roadmap/)

## 社区

- Discord — 提问、分享想法
- YouTube — 视频教程
- GitHub — 源码、Issue、贡献
- X/Twitter

## License

MIT License
