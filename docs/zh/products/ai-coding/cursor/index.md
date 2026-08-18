# Cursor 学习地图

> **Cursor 是面向写代码的 AI 编辑器 + Agent。** 新手用它最快：Tab 补全、Inline Edit、Agent 改多文件在同一个 VS Code 系界面里完成。本文是导航，不教逐步操作。

## 写给谁看

- 前端 / 全栈工程师，想从 Copilot 式补全走到「让 Agent 改仓库」
- 已经会 VS Code，第一次装 Cursor
- 需要给团队选 Rules / Skills / Bugbot 的 Tech Lead

**不是**：Cursor 企业采购合同、模型逐 token 报价表、或 Anysphere 内部实现白皮书。架构深读见站内 [Cursor IDE 架构](/zh/tech/ai-coding/cursor-ide-architecture)。

## 产品全景

```
Cursor
├── 编辑器（VS Code 分支）
│   ├── Tab          — 多行补全、跨文件跳转、自动 import
│   ├── Inline Edit  — Cmd+K / Ctrl+K 改当前选区
│   └── Chat / Agent — Cmd+I / Ctrl+I 侧栏，读仓库、改文件、跑命令
├── 项目上下文
│   ├── AGENTS.md / .cursor/rules  — 持久指令
│   ├── Skills / Commands          — 可复用工作流
│   ├── MCP / Hooks / Subagents    — 外接工具与生命周期
│   └── 代码库索引                 — 语义搜索
└── 云端与审查
    ├── Cloud Agents — 远程 VM 上跑任务、开 PR
    └── Bugbot       — PR 自动审查（不是运行时调试器）
```

### 快速决策：我该用哪个入口？

```
我要做什么？
├── 打几个字、补几行
│   └── Tab（不要开 Agent）
├── 改当前函数 / 当前选区
│   └── Inline Edit（Cmd+K / Ctrl+K）
├── 问「这段在干什么」，先别改文件
│   └── Ask 模式（Cmd+. 打开模式菜单）
├── 跨文件实现、跑测试、提交前收拾
│   └── Agent（Cmd+I）
├── 任务跨很多文件、需求还糊
│   └── Plan Mode（Agent 输入框 Shift+Tab）
├── 能复现但找不到根因
│   └── Debug Mode
└── PR 已经推上去，要机器先审一遍
    └── Bugbot（Dashboard Automations）
```

**和本站其他工具怎么选**（决策摘要，不是功能表）：

| 你更在乎 | 选 | 下一步 |
|----------|----|--------|
| IDE 里一站式补全 + Agent | **Cursor** | [教程](./cursor) |
| 终端里精细权限 / Hook / 无头 CI | [Claude Code](../claude/claude-code) | Claude 学习地图 |
| 已经把工作流焊在 VS Code + GitHub | [GitHub Copilot](../copilot) | Copilot 页 |

22 项功能对照、快捷键、配置模板见 [速查表](./cursor-cheatsheet)。不要在本页找那张大表。

## 核心概念（一句话）

完整「是什么 / 为什么」在 [术语表](./cursor-glossary)。

| 概念 | 一句话 |
|------|--------|
| **Rules** | 写进模型上下文开头的持久指令，按 Always / glob / 智能 / 手动触发 |
| **AGENTS.md** | 无 frontmatter 的纯 Markdown 项目说明书，跨工具更通用 |
| **Skills** | 按需加载的工作流包（`SKILL.md`），也能用 `/name` 手动调 |
| **Commands** | `.cursor/commands/*.md`，输入 `/` 触发的可复用提示 |
| **MCP** | 让 Agent 连外部工具 / 数据源的协议 |
| **Hooks** | Agent / Tab 生命周期上跑的脚本，可观察、拦截、改行为 |
| **Subagents** | 独立上下文窗口的子代理，适合探索、长命令、并行 |
| **Bugbot** | PR 审查机器人，不是 Debug Mode |
| **Modes** | Agent / Ask / Plan / Debug，同一套 Agent 的不同约束 |
| **Tab** | 补全专用模型，接受/拒绝会反馈到后续建议 |

## 学习路径

### 第一阶段：5 分钟跑通第一次改动

**目标**：装上、登录、让 Agent 解释仓库并做一个可回滚的小改。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 下载、登录、打开文件夹 | [教程 · 安装](./cursor#安装与登录) |
| 2 | `Cmd+I` 问「解释这个代码库」 | [教程 · 五分钟第一例](./cursor#五分钟第一例) |
| 3 | 做一个低风险小改，审 diff，跑已有检查 | 同上 |
| 4 | 大改切换 Plan Mode | [教程 · 模式](./cursor#四种模式) |

### 第二阶段：把项目教给 Cursor

**目标**：Agent 不再每次问包管理器和目录约定。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 根目录 `AGENTS.md` | [教程 · 项目上下文](./cursor#项目上下文) |
| 2 | `.cursor/rules/*.mdc` 按 glob 拆分 | [Cookbook · 写好 Rules](./cursor-cookbook#写好-rules) |
| 3 | `.cursorignore` 挡住密钥 | [速查表 · 忽略文件](./cursor-cheatsheet#忽略文件) |

### 第三阶段：接到真实工作流

**目标**：修 bug、开功能、审 PR，各有一条可跳读的配方。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 修 bug / Debug Mode | [Cookbook · 修 Bug](./cursor-cookbook#高效修-bug) |
| 2 | Plan → 实现 → 验证 | [Cookbook · 做功能](./cursor-cookbook#做跨文件功能) |
| 3 | Bugbot 审 PR | [Cookbook · Bugbot](./cursor-cookbook#用-bugbot-审-pr) |
| 4 | MCP / Hooks / 并行 Agent | [Cookbook](./cursor-cookbook) |
| 5 | 参数与信源随手查 | [速查表](./cursor-cheatsheet) |
| 6 | 概念记混了 | [术语表](./cursor-glossary) |

## 相关页面

- [Cursor 教程](./cursor) — 安装到日常用法
- [实战 Cookbook](./cursor-cookbook) — 按任务跳读
- [速查表](./cursor-cheatsheet) — 矩阵 / 快捷键 / 配置 / 信息源
- [术语表](./cursor-glossary) — 是什么、为什么
- 站内专题：[Cursor Rules](/zh/tech/ai-coding/cursor-rules)、[Cursor IDE 架构](/zh/tech/ai-coding/cursor-ide-architecture)
- [AI 编程工具总览](../)
