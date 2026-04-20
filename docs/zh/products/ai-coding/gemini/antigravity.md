# Google Antigravity

> Google Antigravity 代表了从标准代码补全工具向"智能体优先（Agent-first）"开发平台的范式转变，是一个完整的任务控制中心。

## 核心定位

对于前端架构师而言，Antigravity 是处理**跨组件重构、状态管理迁移以及全局样式系统替换**的最强力武器。它假设 AI 是一个自主的行动者，能够规划、执行、验证并在极少人工干预的情况下迭代复杂的工程任务。

## 平台架构

Antigravity 的架构由多个核心表面（Surfaces）组成：

| 组件 | 功能 |
|------|------|
| **Editor** | 编辑器视图映射到单个工作区，提供标准的代码高亮与实时检查 |
| **Agent Manager** | 无代码（no-code）的编排视图，专注于对话式交互、规划模式（Planning Mode）以及构件（Artifacts）的审查 |
| **Artifacts** | 代码/文档构件审查 |
| **Browser Subagent** | AI 驱动真实 Chrome 浏览器来读取内部仪表盘、执行端到端（E2E）UI 测试以及验证界面渲染效果 |

## 规则与技能配置

### agents.md — 定义任务域

在项目根目录下创建 `agents.md`，明确当前正在处理的任务属于哪个领域：

```markdown
# agents.md

## 当前领域
UI 组件库开发

## 约束
- 技术栈：React 18 + TypeScript + Zustand
- 禁止：jQuery、Redux（非 zustand）、CSS-in-JS 方案
- 必须：组件必须有 Storybook 故事

## 技能要求
- 读取 .agents/skills/zustand-store.md
- 读取 .agents/skills/react-components.md
```

### .agents/skills/*.md — 专一技能文件

**避免"工具膨胀"（Tool Bloat）**：赋予智能体过多工具会导致上下文腐烂和高延迟。应当编写**极其专一的技能文件**。

```
.agents/
├── skills/
│   ├── zustand-store.md      # Zustand 切片拆分规范
│   ├── react-components.md   # React 组件规范
│   └── testing.md            # 测试覆盖率要求
```

**Zustand Store 技能文件示例** (`zustand-store.md`)：

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

## Vibe Coding 范式

架构师不再直接编写语法，而是负责定义**架构边界、技术栈约束以及输入输出的标准**，将语法实现完全交托给智能体。

### 先规划后执行

智能体在修改任何文件前，必须输出一份架构设计规范文档（`spec.md`）：

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

在架构师审查并批准该计划后，智能体方可进入执行阶段。

### 交付凭证

执行完毕后，智能体必须提供：
- 统一差异（Unified Diffs）
- 测试通过的日志截图
- 浏览器录屏

## MCP 集成

Antigravity 通过 Model Context Protocol（MCP）集成其他工具：

```bash
# 安装 GitHub MCP
gemini extensions install https://github.com/github-mcp-server

# 安装 Playwright MCP（浏览器自动化测试）
gemini extensions install https://github.com/mcp/playwright-mcp
```

**架构价值**：宏观编排（Antigravity）+ 微观精确（MCP）= 减少令牌消耗 + 避免速率限制

## 安全与沙盒

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

**关键策略**：
- 启用严格模式（Strict Mode）与沙盒环境（Sandboxing）
- 所有智能体操作必须在一个独立隔离的 Git 分支上进行
- 建立详尽的终端命令允许列表（Allowlist）和拒绝列表（Denylist）

## 官方资源

- [Antigravity 官方文档](https://antigravity.google/docs/home)
- [Antigravity Skills](https://antigravity.google/docs/skills)
- [Antigravity Rules/Workflows](https://antigravity.google/docs/rules-workflows)
