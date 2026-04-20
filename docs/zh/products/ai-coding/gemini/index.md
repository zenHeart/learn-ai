# Google AI Pro 会员学习地图

> 你是 Google AI Pro 会员，这意味着你拥有 Google 最强大的 AI 开发者工具生态系统。本页是你的学习导航，帮助你以最短路径掌握所有核心能力，并在前端架构领域产生最大的技术杠杆。

## Google AI Pro 能给你什么

作为 Google AI Pro 会员，你解锁的不仅是一个聊天机器人，而是一套**完整的 AI 工程化平台**：

| 维度 | 产品入口 | 核心价值 |
|------|---------|---------|
| **自主智能体平台** | [Antigravity](https://antigravity.google) | Agent-first IDE，多窗口并发执行，规则引擎驱动 |
| **异步 CI/CD 智能体** | [Jules](https://jules.google) | GitHub 原生异步编码代理，自动处理 PR 和技术债务 |
| **超长上下文 API** | [AI Studio](https://aistudio.google.com) | 200 万令牌上下文，Gemini 3.1 Pro，开发者月度 $10 GCP 额度 |
| **IDE 深度集成** | [Gemini Code Assist](https://codeassist.google) | VS Code/IntelliJ 内嵌，多文件重构，自动批准模式 |
| **命令行工具** | [Gemini CLI](./gemini-cli) | 终端原生集成，每日 1500 次高频配额 |
| **交互式原型** | [Canvas](https://gemini.google/overview/canvas/) | 生成式 UI，WebGL 渲染，实时交互修改 |
| **云端开发环境** | [Firebase Studio](https://firebase.google.com/docs/studio) | 浏览器端 Agentic IDE，Data Connect 自动生成 GraphQL |
| **浏览器调试集成** | Chrome DevTools MCP | 实时 DOM 读取，网络请求监听，自动化 QA |
| **知识管理** | [NotebookLM](https://notebooklm.google) | 1500 页长文档解析，ADR 综合分析 |
| **办公套件** | Workspace (Docs/Gmail/Meet) | 邮件智能撰写，会议记录，5TB 云存储 |

---

## 核心投资回报率框架

> ⚠️ **关键洞察**：对于资深前端架构师，80% 的精力应投入 L1-L2 的工具。L3-L5 功能虽有价值，但相对于核心架构工作的 ROI 较低。

### ROI 金字塔

```
                    ┌─────────────────────┐
                    │   L1 极高 ROI       │  ← 80% 精力
                    │ Antigravity + Jules │
                    ├─────────────────────┤
                    │   L2 高 ROI         │  ← 15% 精力
                    │ AI Studio + CLI    │
                    ├─────────────────────┤
                    │   L3 中 ROI         │  ← 5% 精力
                    │ Canvas + Firebase  │
                    ├─────────────────────┤
                    │   L4 中低 ROI       │
                    │ DevTools MCP       │
                    ├─────────────────────┤
                    │   L5 低 ROI         │
                    │ Workspace 办公套件  │
                    └─────────────────────┘
```

---

## 学习路径

### 第一阶段：掌握 Antigravity 规则引擎（3-5 天）

**目标**：从"程序员"转变为"系统设计与指令编排者"，掌握 Vibe Coding 范式。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Antigravity 的 Agent-first 定位 | [→ 平台架构](./google-pro#antigravity-智能体开发平台) |
| 2 | 掌握 agents.md 和 skills.md 规则文件 | [→ 规则引擎](./google-pro#规则与技能配置) |
| 3 | 构建三层智能体架构，实现 Zustand store 规范 | [→ 最佳实践](./google-pro#vibe-coding-范式) |
| 4 | 启用严格模式与沙盒环境，控制破坏性操作 | [→ 安全策略](./google-pro#安全与沙盒) |
| 5 | 结合 MCP 服务器（GitHub MCP、Playwright MCP） | [→ MCP 集成](./google-pro#mcp-集成) |

**核心转变**：不再直接编写语法，而是定义架构边界、技术栈约束和输入输出标准。

---

### 第二阶段：上手 Jules CI/CD 自动化（2-3 天）

**目标**：将技术债务清理、依赖升级等高耗时任务交给云端智能体。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Jules 的异步工作原理 | [→ Jules 概述](./google-pro#jules-异步-cicd-编码智能体) |
| 2 | 通过 GitHub Issue @jules 触发任务 | [→ 触发方式](./google-pro#任务触发) |
| 3 | 利用 jules-tools CLI 构建自动化管线 | [→ CLI 集成](./google-pro#jules-tools-cli) |
| 4 | 批量分发技术债务清理任务 | [→ 高级用法](./google-pro#自动化技术债务清理) |
| 5 | 避免合并冲突的策略 | [→ 最佳实践](./google-pro#合并冲突处理) |

---

### 第三阶段：AI Studio 超长上下文工程（1-2 天）

**目标**：利用 200 万令牌上下文进行大规模代码库审计和内部工具构建。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 200 万令牌上下文的能力边界 | [→ 上下文机制](./google-pro#超长上下文窗口) |
| 2 | 配置 $10/月 GCP 额度并设置支出上限 | [→ 开发者权益](./google-pro#开发者高级权益) |
| 3 | 实施"大海捞针"式深度代码审计 | [→ 代码审计](./google-pro#海量单体代码库审计) |
| 4 | 微调温度参数并固化系统提示词到 SKILL.md | [→ 提示词固化](./google-pro#系统提示词固化) |
| 5 | 理解上下文衰减并优化令牌分配 | [→ 上下文优化](./google-pro#上下文衰减优化) |

---

### 第四阶段：Gemini CLI 与 Code Assist（1-2 天）

**目标**：掌握日常同步开发的高效工具组合。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | Gemini CLI 日常使用与快捷键 | [Gemini CLI 参考](./gemini-cli) |
| 2 | Code Assist 的 Agent Mode with Auto Approve | [→ Code Assist](./google-pro#gemini-code-assist) |
| 3 | Specs before code 流程 | [→ 规范驱动开发](./google-pro#规范驱动的同步开发) |
| 4 | 终端排错：Vite/Webpack 构建错误分析 | [→ 排错集成](./google-pro#终端排错集成) |
| 5 | Antigravity vs Code Assist 场景选择 | [→ 对比分析](./google-pro#对比分析) |

---

## 功能速查表

### L1 自主智能体平台

| 功能 | 核心用途 | ROI 评级 |
|------|---------|:---------:|
| [Antigravity](https://antigravity.google) | 跨组件重构、状态管理迁移、全局样式系统替换 | ⭐⭐⭐⭐⭐ |
| [Jules](https://jules.google) | 框架升级、技术债务清理、依赖更新 | ⭐⭐⭐⭐⭐ |
| Jules Tools CLI | 自动化管线构建 | ⭐⭐⭐⭐ |

### L2 深度上下文工程

| 功能 | 核心用途 | ROI 评级 |
|------|---------|:---------:|
| [AI Studio](https://aistudio.google.com) | 200 万令牌代码审计、内部工具构建 | ⭐⭐⭐⭐ |
| Gemini Code Assist | 单文件补全、局部多文件重构 | ⭐⭐⭐⭐ |
| Gemini CLI | 终端排错、构建脚本 | ⭐⭐⭐⭐ |

### L3 原型与云端开发

| 功能 | 核心用途 | ROI 评级 |
|------|---------|:---------:|
| [Canvas](https://gemini.google/overview/canvas/) | 交互式仪表盘、一次性原型设计 | ⭐⭐⭐ |
| [Firebase Studio](https://firebase.google.com/docs/studio) | BFF 层设计、GraphQL 客户端 SDK 生成 | ⭐⭐⭐ |

### L4 状态探针与知识提取

| 功能 | 核心用途 | ROI 评级 |
|------|---------|:---------:|
| Chrome DevTools MCP | UI 状态审计、WCAG 检查、自动化 QA | ⭐⭐ |
| [NotebookLM](https://notebooklm.google) | ADR 综合分析、遗留系统知识图谱 | ⭐⭐ |

### L5 办公辅助

| 功能 | 核心用途 | ROI 评级 |
|------|---------|:---------:|
| Google Workspace 集成 | 邮件起草、会议记录 | ⭐ |
| Google One 5TB 存储 | 资源托管 | ⭐ |
| Veo 3.1 视频生成 | 项目宣传素材 | ⭐ |

---

## 快速决策：我该用哪个？

```
我要做什么？
├── 重构整个模块 / 搭建新服务脚手架
│   └── → Antigravity（Agent-first，多窗口并发）
│       ├── 编写 agents.md 定义任务域
│       ├── 编写 .agents/skills/*.md 固化架构规范
│       └── 启用严格模式 + 沙盒 + 独立 Git 分支
│
├── 框架升级 / 技术债务清理 / 批量 PR
│   └── → Jules（云端异步，GitHub 原生）
│       ├── GitHub Issue @jules 触发
│       └── jules-tools CLI 构建自动化管线
│
├── 审计百万行代码库 / 构建内部工具
│   └── → AI Studio（200 万令牌上下文）
│       ├── 合并整个 Monorepo 为单一 Payload
│       ├── 微调 temperature=0.0
│       └── 固化提示词到 SKILL.md
│
├── 单文件逻辑补全 / 局部重构
│   └── → Gemini Code Assist（IDE 内嵌）
│       └── Specs before code 流程
│
├── 终端排错 / 构建脚本
│   └── → Gemini CLI（每日 1500 次配额）
│       └── STDERR 直接传递给 CLI
│
├── 一次性原型 / 内部工具快速孵化
│   └── → Canvas（生成式 UI + WebGL）
│       └── 分层渐进：DOM → 企业设计系统
│
└── 遗留系统知识梳理 / ADR 综合
    └── → NotebookLM（1500 页文档解析）
```

---

## Antigravity 规则引擎详解

### agents.md — 定义任务域

在项目根目录创建 `agents.md`，明确当前任务所属的领域：

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

### .agents/skills/*.md — 精细化技能规范

```
.agents/
├── skills/
│   ├── zustand-store.md      # Zustand 切片拆分规范
│   ├── react-components.md   # React 组件规范
│   └── testing.md            # 测试覆盖率要求
```

### 安全策略

```json
// .gemini/settings.json
{
  "security": {
    "folderTrust": { "enabled": true },
    "allowedCommands": ["npm install", "npm run build", "git"],
    "deniedCommands": ["rm -rf", "dd", ":(){ :|:& };:"],
    "sandboxMode": "strict"
  }
}
```

---

## 开发者权益详解

| 权益 | 额度 | 用途 |
|------|------|------|
| AI Studio API | $10/月 | Gemini 3.1 Pro/Flash 调用 |
| Vertex AI | 包含在 $10 内 | 企业级部署 |
| Gemini 3.1 Pro | 200 万令牌上下文 | 超大代码库审计 |
| Gemini 3.1 Flash-Lite | $0.25/百万输入令牌 | 成本优化 |

⚠️ **警告**：必须在 GCP 控制台设置**支出上限**，防止意外扣费。

---

## 订阅层级对比

| 功能 | AI Pro ($20/月) | AI Ultra |
|------|:-------------:|:--------:|
| Gemini 3.1 Pro | ✅ | ✅ |
| 200 万令牌上下文 | ✅ | ✅ |
| Jules 异步代理 | ✅ | ✅ |
| Antigravity | ✅ | ✅ |
| $10/月 GCP 额度 | ✅ | ✅ |
| Gemini 3.1 Ultra | ❌ | ✅ |
| 优先访问新功能 | ❌ | ✅ |

---

## 资源链接

- [Antigravity 官方文档](https://antigravity.google/docs/home)
- [Jules 官方文档](https://jules.google/docs/)
- [AI Studio](https://aistudio.google.com)
- [Gemini Code Assist](https://codeassist.google)
- [Gemini CLI](./gemini-cli)
- [Canvas](https://gemini.google/overview/canvas/)
- [Firebase Studio](https://firebase.google.com/docs/studio)
- [NotebookLM](https://notebooklm.google)
- [Google AI Pro 订阅管理](https://one.google.com/about/)
