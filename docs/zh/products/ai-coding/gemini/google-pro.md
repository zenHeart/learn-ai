# Google AI Pro 工具详解

> 本文档深入解析 Google AI Pro 生态中所有工具的技术细节、底层机制、最佳实践和架构价值评估。

## L1：自主智能体编排（极高 ROI）

### Antigravity 智能体开发平台

**定位**：从标准代码补全工具向"智能体优先（Agent-first）"开发平台的范式转变。它是一个完整的任务控制中心，假设 AI 是自主的行动者，能够规划、执行、验证并极少人工干预地迭代复杂的工程任务。

#### 平台架构

Antigravity 的核心由多个表面（Surfaces）组成：

| 组件 | 功能 |
|------|------|
| **Editor** | 标准代码高亮与实时检查 |
| **Agent Manager** | 无代码编排视图，对话式交互，规划模式 |
| **Artifacts** | 代码/文档构件审查 |
| **Browser Subagent** | AI 驱动真实 Chrome，执行 E2E UI 测试 |

#### 规则与技能配置

**agents.md** — 定义智能体团队的任务域：

```markdown
# agents.md

## 当前任务域
微前端状态管理重构

## 全局约束
- 框架：Aura Micro-frontend
- 状态管理：Zustand（切片模式）
- 禁止：Redux、Context API
- 必须：TypeScript 严格模式
```

**.agents/skills/*.md** — 专一技能文件（避免工具膨胀）：

```markdown
---
name: zustand-store
description: Zustand Store 切片规范
---

# Zustand Store 切片规范

## 切片拆分模式
每个 store 使用独立切片（slice），遵循：
- 领域驱动：一个切片 = 一个领域概念
- 不可变更新：必须使用 Immer 或不可变模式
- 持久化：使用 persist 中间件，storage: localStorage

## 导出结构
```typescript
export const useCounterSlice = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## 禁止模式
- ❌ 直接修改 state: `state.count = 1`
- ❌ 在 slice 外定义共享状态
- ❌ 使用 redux-thunk 或 redux-saga
```

#### Vibe Coding 范式

架构师不再直接编写语法，而是：

1. **定义架构边界**：技术栈约束、输入输出标准
2. **固化规范**：SKILL.md 文件确保代码符合架构
3. **先规划后执行**：智能体必须输出 `spec.md` 并获批后才能执行

```markdown
# spec.md 示例

## 数据流分析
- 当前组件：A -> B -> C（Prop Drilling）
- 目标：重构为 Zustand Store 共享状态

## 组件层级变更
1. 创建 `useUserStore.ts`
2. 移除 A/B/C 间的 props 传递
3. 更新 TypeScript 类型定义

## API 变更
- 删除：`UserContext.tsx`
- 新增：`stores/userStore.ts`
```

#### 安全与沙盒

```json
// .gemini/settings.json
{
  "security": {
    "folderTrust": { "enabled": true },
    "allowedCommands": [
      "npm install",
      "npm run build",
      "npm run test",
      "git checkout -b",
      "git add .",
      "git commit"
    ],
    "deniedCommands": [
      "rm -rf node_modules",
      "sudo",
      "chmod 777"
    ],
    "sandboxMode": "strict",
    "requireBranch": true,
    "allowedBranchPattern": "feature/*|refactor/*"
  }
}
```

#### MCP 集成

Antigravity 支持通过 Model Context Protocol 集成外部工具：

```bash
# 安装 GitHub MCP
gemini extensions install https://github.com/github-mcp-server

# 安装 Playwright MCP（浏览器自动化测试）
gemini extensions install https://github.com/mcp/playwright-mcp
```

**架构价值**：宏观编排（Antigravity）+ 微观精确（MCP）= 减少令牌消耗 + 避免速率限制

---

### Jules 异步 CI/CD 编码智能体

**定位**：代码仓库云端维护的基石。通过克隆代码库到云端虚拟机中自主执行开发与测试，无需本地环境。

#### 核心机制

- **驱动**：Gemini 3 Pro（基础计划 Gemini 2.5 Pro）
- **触发方式**：GitHub Issue 中使用 `@jules` 标签或分配 `jules` 标签
- **工作流**：克隆分支 → 安装依赖 → 分析代码 → 制定修改计划 → 提交 PR

#### 任务触发

```markdown
# GitHub Issue 示例

## Title: 升级 Next.js 至 v15 并迁移 App Router

## Labels: jules, enhancement

## Body:
请将本项目中 Next.js 依赖升级至 v15，并将 `/pages` 目录下的所有文件迁移至新的 App Router 结构，确保：
- 服务端组件与客户端组件的 `"use client"` 指令划分正确
- 所有 API Route 迁移至 `app/api/` 目录
- 保留原有的动态路由参数和行为
```

#### jules-tools CLI

```bash
# 安装
npm install -g @google/jules-tools

# 查看状态
jules status

# 启动远程任务
jules remote new "Upgrade React to v19"

# 查看任务列表
jules task list

# 应用生成的 PR
jules pr apply
```

#### 自动化技术债务清理管线

```bash
#!/bin/bash
# tech-debt-pipeline.sh

# 获取标记为"技术债务"的 Issue
gh issue list --label="tech-debt" --state=open --limit=10 | \
  while read issue; do
    id=$(echo "$issue" | awk '{print $1}')
    title=$(echo "$issue" | cut -d$'\t' -f2)
    
    # 解析标题并触发 Jules
    jules remote new "Fix: $title" --issue="$id"
  done
```

#### 合并冲突处理

| 策略 | 适用场景 |
|------|---------|
| 限制在模块化程度高的功能票 | 跨模块全局变更 |
| 业务低峰期（周末）集中运行 | 大规模重构 |
| 本地 Antigravity 同步高强度监督 | 核心域变更 |

---

## L2：深度上下文工程（高 ROI）

### AI Studio 与开发者高级权益

**核心价值**：消除界面抽象，提供对 Gemini 1.5/3.1 Pro 模型的完整控制权。

#### 超长上下文窗口

| 模型 | 上下文窗口 | 适用场景 |
|------|----------|---------|
| Gemini 3.1 Flash-Lite | 100 万令牌 | 成本敏感的日常任务 |
| Gemini 3.1 Flash | 100 万令牌 | 快速原型 |
| Gemini 1.5 Pro | 200 万令牌 | 超大代码库审计 |
| Gemini 3.1 Pro Preview | 200 万令牌 | 最强推理能力 |

#### 开发者高级权益

| 权益 | 额度 |
|------|------|
| GCP 月度额度 | $10/月 |
| AI Studio 计费 | 输入 $0.25/百万令牌 |
| Vertex AI | 包含在 $10 内 |

⚠️ **必须设置支出上限**：在 GCP 控制台 → 计费 → 预算和警报 → 设置 $10 硬性上限

#### 海量单体代码库审计

```python
# 审计脚本示例：将整个 Monorepo 合并为 Payload
import os
import json

def build_audit_payload(repo_path: str, error_log: str) -> dict:
    """将整个代码库构建为 AI Studio 可摄入的 Payload"""
    files_content = []
    
    for root, dirs, files in os.walk(repo_path):
        # 跳过 node_modules 和 .git
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist']]
        
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    relative_path = os.path.relpath(path, repo_path)
                    files_content.append({
                        "path": relative_path,
                        "content": f.read()
                    })
    
    return {
        "codebase": files_content,
        "error_log": error_log,
        "task": "分析以下状态更新异常的根本原因，并给出跨越多个系统边界的重构建议"
    }
```

#### 上下文衰减优化

```
┌─────────────────────────────────────────────┐
│ [头部] 核心架构原则、系统指令、目标文件路径  │  ← 高注意力
│─────────────────────────────────────────────│
│                                             │
│ [中间] 海量背景参考代码                      │  ← 注意力衰减
│                                             │
│─────────────────────────────────────────────│
│ [尾部] 具体的修改指令、输出格式要求          │  ← 高注意力
└─────────────────────────────────────────────┘
```

**策略**：将最关键的信息放在头尾，中间放置大量参考代码。

#### 系统提示词固化

```markdown
<!-- AI Studio 中微调验证后，固化到 SKILL.md -->

# React 组件规范

## 温度参数
temperature: 0.0（确定性代码生成）

## 必须包含
- Props 类型定义（TypeScript）
- JSDoc 注释
- Storybook story
- 单元测试

## 禁止模式
- any 类型（除非显式声明）
- 内联样式（必须使用 CSS Modules 或 Tailwind）
- 未处理的 Promise（必须 .catch() 或 try/catch）
```

---

### Gemini Code Assist

**定位**：IDE 深度集成扩展，优化编写和审查代码的核心流程。

#### Agent Mode with Auto Approve

```json
// settings.json
{
  "codeAssist": {
    "agentMode": {
      "enabled": true,
      "autoApprove": true,
      "requireSpecConfirmation": false
    }
  }
}
```

#### 规范驱动的同步开发

**反模式**：直接抛出模糊想法，期望生成完美应用

**最佳实践**：
```
1. 通过 Code Assist 对话生成 spec.md
   → 接口约束、Props 定义、状态管理策略、边缘情况

2. 将 spec.md 作为上下文输入
   → Code Assist 按规范逐步生成组件代码

3. 避免 LLM 在长对话中偏离架构基准
```

#### 终端排错集成

```bash
# Vite 构建错误 → Gemini CLI
npm run build 2>&1 | gemini -p "分析以下构建错误，给出修复命令"

# TypeScript 类型检查爆炸
npx tsc --noEmit 2>&1 | gemini -p "分析以下类型错误"

# Webpack 模块解析失败
npm run build 2>&1 | gemini -p "分析模块解析失败的根因"
```

#### 对比分析

| 维度 | Antigravity | Code Assist |
|------|-------------|------------|
| 核心定位 | Agent-first 独立开发平台 | IDE 扩展插件 |
| 多智能体支持 | 原生支持（规则文件驱动） | 不支持 |
| 系统侵入性 | 高（需迁移至新 IDE） | 低（无缝集成现有 IDE） |
| 适用场景 | 跨模块全栈系统生成 | 单文件逻辑补全、局部多文件重构 |

---

## L3：原型设计与云原生生成（中等 ROI）

### Gemini Canvas

**定位**：动态工作区，支持生成式 UI 和实时交互修改。

#### 核心特性

| 特性 | 说明 |
|------|------|
| **Generative UI** | 直接渲染动态布局、可交互图表、3D 模型 |
| **局部重绘** | 高亮选中部分进行重构，无需重新生成整个文件 |
| **WebGL 渲染** | 实时响应用户交互（滑块、按钮切换） |

#### 极速原型流程

```
1. 输入提示词 → Canvas 渲染微应用
2. 审查交互逻辑 → 后续提示词精炼 UI
3. 复制代码片段 → 企业主代码库工程化封装
```

```markdown
# 示例提示词

根据以下 JSON 结构，构建一个包含实时收入折线图和客户流失率饼图的自由职业者业务仪表盘，要求：
- 支持暗黑模式切换
- 使用 Recharts 库
- 响应式布局
```

#### 分层渐进策略

```
第一层：DOM 结构 + 基础 JavaScript 交互
    ↓ 确认逻辑无误
第二层：应用企业设计系统（Tailwind CSS / CSS 变量）
    ↓ 保持代码整洁
第三层：工程化封装（TypeScript / 测试 / 文档）
```

---

### Firebase Studio

**定位**：基于浏览器的 Agentic IDE，与 Google Cloud 深度绑定。

#### 核心功能

| 功能 | 说明 |
|------|------|
| **Gemini AI Logic SDK** | 客户端安全调用 AI 服务 |
| **Data Connect** | 自然语言生成数据库 Schema + GraphQL + 强类型 SDK |
| **一键部署** | Cloud Run 等云端服务 |

#### BFF 层数据契约生成

```
架构师描述数据结构
    ↓
Data Connect 自动生成
    ├── PostgreSQL/Firestore Schema
    ├── GraphQL Queries/Mutations
    └── TypeScript Client SDK
    ↓
前端直接导入使用（端到端类型安全）
```

---

## L4：状态探针与知识提取（中低 ROI）

### Chrome DevTools MCP

**定位**：实时浏览器状态读取，自动化 QA。

#### 能力矩阵

| 能力 | 说明 |
|------|------|
| DOM 树读取 | 实时读取渲染后的页面结构 |
| 网络请求监听 | 分析 Network 面板请求 |
| 控制台监听 | 捕获警告和错误信息 |
| 元素交互 | AI 与页面元素交互 |

#### 自动化 QA 流程

```bash
# 启动 Chrome DevTools MCP
gemini extensions install https://github.com/ChromeDevTools/chrome-devtools-mcp

# 连接并执行审计
gemini connect chrome --mcp chrome-devtools

# 预设审计脚本
gemini run audit --script=wcag-checklist
# → AI 自动检查 ARIA 属性、色彩对比度、控制台错误
```

---

### NotebookLM

**定位**：基于信源锚定的高级研究助手，1500 页文档解析。

#### 核心场景

| 场景 | 说明 |
|------|------|
| **ADR 综合分析** | 上传架构决策记录，询问历史技术选型原因 |
| **遗留系统知识图谱** | 将五年积累的技术文档整体打包查询 |

#### 使用示例

```
上传文档：
├── adr-001-trpc-vs-apollo-2023.md
├── jira-export-2023-q3.md
└── confluence-tech-spec-2023.md

询问：
"在 2023 年的核心重构中，团队为何放弃了 tRPC 而最终选择了 Apollo GraphQL？当时主要考量的性能瓶颈是什么？"

→ NotebookLM 迅速提取关键洞察并标注引用的原始文档
```

---

## MCP 集成概览

### 核心 MCP 服务器

| MCP 服务器 | 用途 |
|-----------|------|
| [github-mcp-server](https://github.com/github/github-mcp-server) | GitHub API、PR/Issue 管理 |
| [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | 浏览器自动化、DOM 读取 |
| [playwright-mcp](https://github.com/mcp/playwright-mcp) | E2E 测试、UI 验证 |
| [filesystem-mcp](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) | 本地文件读写 |

### 在 Antigravity/CLI 中安装 MCP

```bash
# 通过 URL 安装
gemini extensions install https://github.com/github/github-mcp-server

# 通过 npm 安装
npm install -g @modelcontextprotocol/server-filesystem

# 列出已安装的 MCP
/mcp list

# 配置 MCP 服务器
gemini mcp add github --token $GITHUB_TOKEN
```

---

## 订阅管理与安全

### 支出上限配置（必做！）

```
GCP 控制台 → IAM 与管理 → 计费 → 预算和警报
    ↓
创建预算 → 类型：费用 → 金额：$10
    ↓
警报触发器 → 达到 80%/100% 时通知
    ↓
硬性上限 → 启用 → 设置 $10 硬性上限
```

### 安全最佳实践

| 实践 | 说明 |
|------|------|
| 启用严格模式 | 控制文件系统和终端访问 |
| 沙盒隔离 | 独立 Git 分支接收智能体操作 |
| 命令允许列表 | 仅允许安全的构建/测试命令 |
| 定期审计 | 检查智能体操作的代码差异 |
| 人工审批 | 关键变更必须人工确认 |
