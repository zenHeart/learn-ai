# Codex IDE 扩展

> 这是一份**教程**——装扩展，把已经打开的文件带进提示词，在源码旁边审 diff。IDE 是 Codex 的一个入口，和 CLI 共用 `AGENTS.md`、沙箱、审批。
>
> 官方落地页：[learn.chatgpt.com/codex/ide](https://learn.chatgpt.com/codex/ide)。文档：[IDE extension](https://learn.chatgpt.com/docs/codex/ide)。

## 先决条件

| 需要 | 要求 |
| --- | --- |
| 账号 | 含 Codex 的 ChatGPT 套餐 |
| 编辑器 | VS Code、Cursor、Windsurf、VS Code Insiders、Xcode 或 JetBrains IDE |
| 仓库 | 一个你已经熟悉的项目目录 |

**学习目标**：在编辑器里装好 / 打开 Codex；第一次对话就带上当前文件；原地审 focused diff；长任务交给 Cloud 而不离开编辑器。

**非目标**：CLI 安装（[CLI](./codex-cli)）；Cloud 环境（[Cloud](./codex-cloud)）；桌面 Chat / Work / Codex 切换（[产品线](./codex-ai)、[Work](./chatgpt-work)）。

## IDE 扩展是什么，不是什么

扩展把 Codex 放在**代码旁边**。打开的文件、当前选区、最近会话进 composer。你在源码旁边读短摘要和 focused diff。

它**不是**：

- 另一套 Agent。还是 `~/.codex/config.toml` 和同一份 `AGENTS.md`。
- 桌面 Codex。桌面 Codex 在 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app) 里：可视化 diff、PR 侧栏、多仓库、Computer Use。地图在 [产品线](./codex-ai)，这里不重复整页。
- CI 里 `codex exec` 的替代品。

任务锚在当前文件 / 选区 → IDE。要脚本化 → CLI。合上电脑也要跑 → [Cloud](./codex-cloud)。

## 第 1 步 — 安装或启用

| 编辑器 | 怎么装 |
| --- | --- |
| Visual Studio Code | [openai.chatgpt](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) 或 `vscode:extension/openai.chatgpt` |
| Cursor | `cursor:extension/openai.chatgpt` |
| Windsurf | `windsurf:extension/openai.chatgpt` |
| VS Code Insiders | 同一个 Marketplace 项 |
| Xcode | [Setting up coding intelligence](https://developer.apple.com/documentation/Xcode/setting-up-coding-intelligence)；选 Codex |
| JetBrains IDE | [AI Assistant 里的 Codex](https://www.jetbrains.com/help/ai-assistant/codex-agent.html)；打开 AI Chat 选 Codex |

用和 CLI 同一套 ChatGPT 账号登录。

## 第 2 步 — 打开 Codex

**VS Code / Cursor / Windsurf：** 点 Codex 图标。看不见就命令面板跑 **Codex: Open Codex Sidebar**。

**Xcode：** 打开 coding assistant，新会话，选 Codex。

**JetBrains：** 打开 AI Chat，选 Codex。

## 第 3 步 — 第一次对话，带上编辑器上下文

打开熟悉的项目。让它解释或做小改动。任务前后做 Git checkpoint，方便回滚。

```text
@src/auth/session.ts Explain how session refresh works, then add a test for
the expired-token path only. Do not change the cookie format.
```

从 composer 附上打开的文件或选区，不要复述问题。官方：[Use editor context](https://learn.chatgpt.com/docs/prompting#use-editor-context)。

## 第 4 步 — 在源码旁边审

读摘要。看改动行。只留你要的。同一条会话里追问。没打开过的跨文件大改不要收。

## 第 5 步 — 任务变大就委派

短迭代留在本地。需要更长时间就接到 Codex web，送进 [Cloud](./codex-cloud)。编辑器里的会话还在，回来审结果。

官方：[从 IDE 委派](https://learn.chatgpt.com/docs/cloud#delegate-from-the-ide-extension)。

## 什么时候用 IDE

| 场景 | 为什么 |
| --- | --- |
| 小范围改动 | 相关文件和 Codex 同一视图 |
| 读陌生代码 | 问已经打开的符号 |
| 原地审 | diff 贴着源码 |
| 更大的任务 | 从 IDE 开 Cloud，回来看结果 |

命令和设置：[IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)、[IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide)。文档带 `?surface=ide`——页面像在讲 CLI 时，先看 surface。

## 常见陷阱

| 陷阱 | 结果 | 改做 |
| --- | --- | --- |
| 描述文件而不附上 | 改错模块 | 点名打开的文件或选区 |
| 当成另一套 Agent | 配置 / `AGENTS.md`「没加载」 | 和 CLI 同一套；先信任项目 |
| 长任务扔在笔记本上 | 睡眠后会话没了 | 交给 [Cloud](./codex-cloud) |
| 在这里找 PR 侧栏 | 那是桌面 Codex | [产品线](./codex-ai) · [Work 与 Codex](./chatgpt-work#桌面上-work-和-codex-怎么选) |

## 实际用例

打开着 `Button.tsx`，视觉测试红了。附上文件，要最小 CSS 修复，在组件旁边审 diff。如果变成设计系统 token 迁移，交给 Cloud，IDE 会话只用来审。

## 下一步

1. 带编辑器上下文的提示词 → [Prompting](https://learn.chatgpt.com/docs/prompting#use-editor-context)
2. 最佳实践 → [guides/best-practices](https://learn.chatgpt.com/guides/best-practices)
3. 长任务 → [Cloud](./codex-cloud)
4. flag 和斜杠命令 → [Cheatsheet](./codex-cheatsheet)

## 官方来源

- [IDE extension（落地页）](https://learn.chatgpt.com/codex/ide)
- [IDE extension（文档）](https://learn.chatgpt.com/docs/codex/ide)
- [IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)
- [IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide)
- [Prompting · editor context](https://learn.chatgpt.com/docs/prompting#use-editor-context)
- [从 IDE 委派](https://learn.chatgpt.com/docs/cloud#delegate-from-the-ide-extension)
- [VS Marketplace: openai.chatgpt](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)
