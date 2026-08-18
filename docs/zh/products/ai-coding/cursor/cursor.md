# Cursor 教程

Cursor 是基于 VS Code 的 AI 编辑器：同一窗口里做 Tab 补全、`Cmd+K` 改选区、`Cmd+I` 让 Agent 读仓库、改文件、跑命令。

> 配置键、快捷键全集、22 项功能矩阵见 [速查表](./cursor-cheatsheet)。概念辨析见 [术语表](./cursor-glossary)。场景配方见 [Cookbook](./cursor-cookbook)。
>
> 官方文档按 changelog 连续改版。本页对齐 2026-08 的 [cursor.com/docs](https://cursor.com/docs)，不在标题里钉死编辑器小版本。

## 先决条件

- 会用 VS Code 打开文件夹、看 diff、跑终端
- 一台能登录 [cursor.com](https://cursor.com) 的机器（macOS / Windows / Linux）
- 一个**已有版本控制**的练习仓库——Agent 改文件会立刻落盘，git 是回滚手段

## 学习目标

读完你能：

1. 在 5 分钟内完成「解释仓库 → 做一个小改 → 审 diff」
2. 分清 Tab / Inline Edit / Agent / Plan / Debug
3. 用 `AGENTS.md` 或一条 `.mdc` 规则让 Agent 记住包管理器和目录约定
4. 用 `@` 精确喂上下文，并知道什么时候不要喂

---

## 安装与登录

1. 打开 [Downloads](https://cursor.com/downloads)，安装对应系统的 Cursor。
2. 打开应用并登录。
3. **File → Open Folder**，选一个 git 仓库。不要先开空窗口乱生成。

官方 Quickstart 原文路径：[Get started](https://cursor.com/docs/get-started/quickstart)。

设置入口：

| 你想改 | 快捷键 |
|--------|--------|
| Cursor 设置（模型、Tab、索引） | `Cmd+Shift+J` / `Ctrl+Shift+J` |
| VS Code 通用设置 | `Cmd+,` / `Ctrl+,` |
| 命令面板 | `Cmd+Shift+P` / `Ctrl+Shift+P` |

来源：[Keyboard Shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts)。

---

## 五分钟第一例

目标：不写新功能，只验证「Agent 能读懂仓库、你能审它的 diff」。步骤来自官方 Quickstart。

### 1. 打开 Agent

`Cmd+I` / `Ctrl+I` 打开侧栏 Agent。官方 Quickstart 和 Agent Overview 都把这个键写成入口。

### 2. 先让它解释，不要让它写

在仓库根打开 Agent，发送：

```text
解释这个代码库：技术栈、目录怎么分、我该先读哪几个文件。
不要修改任何文件。
```

Cursor 会搜仓库、读相关文件、总结结构。这是官方说的「进入陌生仓库最快的方式」。

### 3. 做一个低风险小改

官方建议第一任务要低风险：文案、小 UI、注释。指定结果，不要只说「改进一下」。

```text
在 README.md 的 Getting Started 节补一句：
本仓库根目录使用 pnpm，不要运行 npm install。
只改 README.md。改完列出 diff 摘要。
```

如果你的练习仓库是 TypeScript，可以改成下面这条（仍然只动一个文件）：

```text
在 src/utils/formatDate.ts 增加函数 formatISODate(date: Date): string，
用 date.toISOString().slice(0, 10) 返回 YYYY-MM-DD。
不要改其他文件。加上导出。改完说明如何手工验证。
```

### 4. 审 diff，跑项目已有检查

Agent 改完后：

1. 看 diff 视图，确认只动了你允许的文件
2. 让它跑仓库里**已经存在**的检查，不要发明新脚本名：

```text
运行这个项目已经在用的类型检查和 lint。不要新增配置文件。
```

3. 自己再跑一次你平时用的命令（例如 `pnpm typecheck`），不要只信 Agent 口头说 pass

### 5. 大改切换 Plan Mode

跨多文件、需要调研、或要先对齐方案时：在 Agent 输入框按 `Shift+Tab` 转到 **Plan Mode**。官方流程是：

1. 研究仓库、找出相关文件
2. 问澄清问题
3. 写出可编辑的实现计划
4. **等你批准再写代码**

计划默认存在用户主目录。点 **Save to workspace** 会放到工作区（官方 blog 写的是 `.cursor/plans/`），方便团队复用和中断后续跑。

---

## 四种模式

同一套 Agent，约束不同。用 `Cmd+.` / `Ctrl+.` 打开模式菜单；Plan 也可用 `Shift+Tab` 轮换。

| 模式 | 做什么 | 什么时候用 |
|------|--------|------------|
| **Agent** | 搜代码、改文件、跑终端 | 目标清楚的实现和重构 |
| **Ask** | 只读问答（changelog：Ask 默认带搜索工具；`@Codebase` 工具已移除） | 先理解，先别改 |
| **Plan** | 先出可编辑计划，批准后再实现 | 跨文件、需求糊、要对齐 |
| **Debug** | 多假设 → 打日志 → 你复现 → 用运行时数据修 | 能复现但找不到根因 |

官方页面：[Agent Overview](https://cursor.com/docs/agent/overview)、[Plan Mode](https://cursor.com/docs/agent/plan-mode)、[Debug Mode](https://cursor.com/docs/agent/debug-mode)。Ask 出现在 [changelog](https://cursor.com/changelog) 和论坛，2026-08 主导航没有单独的 Modes 长页。

### Agent 使用时记住这三件事

1. **Checkpoints**：大改前自动快照。走偏了在时间线 Restore，不要手工一件件撤。
2. **排队**：Agent 工作时 `Enter` 把下一条指令排队；`Cmd+Enter` / `Ctrl+Enter` 立刻插入当前轮。
3. **新开会话**：换任务、它开始循环犯错、一个逻辑单元结束——开新 Chat。需要旧上下文用 `@Chats`，不要整段粘贴。

来源：[Agent Overview](https://cursor.com/docs/agent/overview)、[Prompting](https://cursor.com/docs/agent/prompting)、[agent-best-practices](https://cursor.com/blog/agent-best-practices)。

---

## Tab 与 Inline Edit

### Tab

[Tab](https://cursor.com/docs/tab/overview) 是补全专用模型，不是 Agent。

- 新字符：半透明 ghost text；改已有代码：行右侧 diff
- `Tab` 接受，`Esc` 拒绝；`Cmd+→` / `Ctrl+→` 按词接受
- 接受一次后再按 `Tab` 可跳到预测的下一处（同文件或跨文件）
- TypeScript / Python 可自动补 import
- 状态栏可 Snooze、全局关、或按扩展名关（例如 markdown / JSON）

**不要**用 Agent 改「光标旁三行」。那是 Tab 的活。

### Inline Edit

[Inline Edit](https://cursor.com/docs/inline-edit/overview)：`Cmd+K` / `Ctrl+K`。

- 有选区：按指令改选区
- 无选区：在光标处生成，并带上周围代码（例如在函数名上触发会带整函数）
- `Opt+Enter` / `Alt+Enter`：Quick Question，先问再改；回复后说 `do it` 可落到代码
- 多文件或要长解释：把选区 `Cmd+L` / `Ctrl+L` 送到 Chat

---

## 项目上下文

LLM 不会跨补全记住你的偏好。持久指令靠 Rules / `AGENTS.md`。完整机制见 [术语表 · Rules](./cursor-glossary#rules)。

### 最小 `AGENTS.md`

放在仓库根。官方把它定位成「没有 metadata 的简单替代」。子目录也可以再放一份。

```markdown
# Agent notes

- 包管理器是 pnpm。禁止 `npm install` / `yarn`。
- 源码在 `src/`，测试在 `src/**/*.test.ts`。
- 改完跑 `pnpm typecheck` 和 `pnpm test`。
- UI 组件规范看 `src/components/Button.tsx`，不要在规则里复制整份组件。
```

### 一条按文件生效的规则

`.cursor/rules` 里必须是 **`.mdc`**。纯 `.md` 会被规则系统忽略。

```markdown
---
description: TypeScript 模块约定
globs: "**/*.ts,**/*.tsx"
alwaysApply: false
---

- 只用 ES modules（`import` / `export`），不要 `require`。
- 优先具名导出。
- 规范结构见 `src/components/Button.tsx`。
```

四种触发与 frontmatter 对照在 [速查表 · Rules](./cursor-cheatsheet#rules-frontmatter)。生成入口：Agent 里 `/create-rule`。

官方硬限制：**单条 < 500 行**，大规则拆开；少写空话；用 linter 管风格，不要把整本 style guide 塞进规则。

---

## 怎么给上下文

来源：[Prompting](https://cursor.com/docs/agent/prompting)。

在输入框打 `@`：

| 提及 | 作用 |
|------|------|
| `@auth.ts` / `@src/components/` | 文件或文件夹。选中文件夹后再打 `/` 往下走 |
| `@Terminals` | 终端输出 |
| `@Chats` | 旧对话 |
| `@Commit (Diff of Working State)` | 未提交 diff |
| `@Branch (Diff with Main)` | 相对主分支的分支 diff |
| `@Browser` | 内置浏览器上下文 |

**知道相关文件就 `@`；不确定就别堆。** 官方：Agent 自己有 grep 和语义搜索。标一堆无关文件会稀释重点。

图片：拖进输入框，或 `Cmd+V` / `Ctrl+V` 粘贴截图。适合对稿 UI、贴报错。

模型：输入框上的 picker，或 `Cmd+/` / `Ctrl+/` 循环。可中途换模型（快模型探索，强模型实现）。清单见 [Models & Pricing](https://cursor.com/docs/models-and-pricing)。

---

## 日常工作流（Tutorial 弧线）

把上面串成一条默认路径。更细的场景跳 [Cookbook](./cursor-cookbook)。

```
打开仓库
  → 新 Chat + Ask/Agent：「这仓库怎么工作」
  → 写或更新 AGENTS.md / 一条规则（只写你刚纠正过两次的事）
  → 小改：Tab 或 Cmd+K
  → 中改：Agent，写清验收（测哪条命令、不要改哪些目录）
  → 大改：Plan → 编辑计划 → 批准 → Agent 实现 → 跑已有检查
  → 走偏：Restore Checkpoint，或回计划重跑
  → 推 PR：Bugbot 或 /review-bugbot
  → 人不在 / 要并行：Cloud Agents；人在终端 / CI：`agent`
```

提示要具体。官方对比：

| 弱 | 强 |
|----|----|
| 给 auth.ts 加测试 | 按 `__tests__/` 现有模式给 `auth.ts` 的 logout 边界补测试，不要 mock |

---

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 第一句话就「重构整个目录」 | 先解释，再做一个文件的小改，再 Plan |
| 用 Agent 改光标旁三行 | 用 Tab 或 `Cmd+K` |
| 把 `.cursorrules` 单文件当唯一真相 | 新项目用 `.cursor/rules/*.mdc` 或 `AGENTS.md` |
| 规则里粘贴整份组件 | 写「见 `src/components/Button.tsx`」 |
| 把 Bugbot 当运行时调试 | 运行时用 Debug Mode；PR 用 Bugbot |
| 长对话里换题接着聊 | 新 Chat + `@Chats` |
| 只信 Agent 说 tests passed | 本地再跑你自己的命令 |
| 在没 git 的目录里开 Agent | 先 `git init` / 打开已有仓库 |

论坛补充（社区信号，不是官方保证）：有人报告 Plan 下 Agent 仍写代码（[Plan mode is not respected](https://forum.cursor.com/t/plan-mode-is-not-respected-by-the-agent/151802)）。若发生，立刻 Stop，Restore Checkpoint，把计划写得更死（「在我回复 APPROVE 之前不要改文件」）。

---

## 下一步

1. [Cookbook](./cursor-cookbook) — 修 bug、做功能、Rules、Bugbot、Cloud、CLI、MCP
2. [Design Mode](./design-mode) · [Cloud Agents](./cloud-agents) · [Cursor CLI](./cursor-cli)
3. [Origin](./origin) · [Security Agents](./security-agents) · [PR Routing](./pr-routing) · [SDK](./cursor-sdk)
4. [速查表](./cursor-cheatsheet) — 矩阵、快捷键、配置模板
5. [术语表](./cursor-glossary) — 选型为什么那样切
6. 回 [学习地图](./) 看编辑器 vs CLI vs Cloud vs Origin vs SDK
7. 官方：[Quickstart](https://cursor.com/docs/get-started/quickstart)、[Agent best practices](https://cursor.com/blog/agent-best-practices)
