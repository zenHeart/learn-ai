---
title: Lingma cookbook
description: "After Lingma / Qoder CN is installed: pick a chat mode, write a structured task, let Agent run the terminal, and attach MCP."
domain: product
tags:
  - coding-agent
role: cookbook
---

# Lingma cookbook

For readers who can already sign in and accept a completion. Install is in the [tutorial](./lingma). Keys are in the [cheatsheet](./lingma-cheatsheet).

## Pick the chat mode

| Job | Mode | Official reason |
|-----|------|-----------------|
| Explain this React component | **Ask** | "Does not edit project files" |
| Change a named set of files and review the diff | **Edit** | Precise, faster than Agent |
| Add a feature: edit + install + test | **Agent** | Can plan, use the terminal, call MCP |
| Multi-file edits in Lingma IDE / JetBrains | **Agent** (there is no Edit) | Official: those clients do not support Edit |
| Visual Studio | **Ask** | Official: Ask-only for now |

If you can spot a wrong edit at a glance, use Agent. Otherwise start in Ask.

Sources: [Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat), [Edit](https://help.aliyun.com/zh/lingma/edit), [Agent](https://help.aliyun.com/zh/lingma/agent).

## Write the task the way the docs ask

Official text ([Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat)):

> 结构化地描述需求：首先需要澄清我们需要通义灵码帮我们做什么，建议包含一个明确的目标，并通过步骤式的结构化描述，详细地描述您期望完成的编码任务和要求。
>
> 给出相关的上下文：可以选择代码文件、图片、codebase、codeChanges 等上下文。
>
> 明确生成要求：告诉通义灵码您期望它遵循的要求，比如语言、规范、格式、变更目标等，如“生成变更时，同时为每个方法生成英文注释”。
>
> 多多互动，逐步迭代。

Template (structure from those four bullets):

```text
Goal: add lastActiveAt sorting to src/components/UserTable.tsx.

Steps:
1. Change the existing component only
2. Default descending; click the header to toggle
3. Add TypeScript types; no any

Requirements:
- Add English comments for every method you change
- Do not touch the API layer
```

Then attach files / images / codebase. Lingma IDE context **does not support the knowledge base** yet (same official page).

Agent mode can expand a draft prompt via the optimize-input control ([Agent](https://help.aliyun.com/zh/lingma/agent)). Read the expanded prompt before you send it.

## Run an Agent task that has side effects

1. Switch to **Agent**.
2. State the goal and the hard boundary.
3. For a complex task, wait for a plan or send `/plan`.
4. When a terminal command appears, click **Run** only if you understand it.
5. Accept or reject each file in the diff.

Official auto-run allowlist ([Agent](https://help.aliyun.com/zh/lingma/agent)):

> 具体配置路径为插件 **Chat** 设置页面的 **Auto-Run** 区域，在 **Terminal in Agent Mode** 下方的输入框中添加允许自动运行的命令。如需添加多个命令，可以使用英文逗号分隔。

Do not put `rm`, `git push`, or `npm publish` on that list in week one.

If Agent cannot start a terminal in VS Code, read [Terminal exceptions](https://help.aliyun.com/zh/lingma/description-of-terminal-execution-exception): the VS Code plugin needs the Shell Integration API, **VS Code > 1.93**, and a supported default shell. That is a different floor from the 1.68.0 install requirement.

## Attach MCP

Official boundary ([MCP guide](https://help.aliyun.com/zh/lingma/guide-for-using-mcp)):

> MCP（Model Context Protocol）是一种开放标准协议，使其智能体的能力和场景得到拓展。
>
> Markets: [ModelScope MCP](https://www.modelscope.cn/mcp), [Higress MCP](https://mcp.higress.ai/).
>
> Example jobs: database schemas / DAO, online docs, design-to-code.

Official path into the MCP page in IntelliJ ([MasterGo recipe](https://help.aliyun.com/zh/lingma/use-lingma-mastergo-mcp-to-transforming-mastergo-design-draft-into-front-end-code)):

1. Open **chat** from the sidebar icon.
2. Open **MCP**: the **MCP tools** link on the welcome line, or avatar → **Personal settings** → **MCP**.
3. Switch to **Agent**, then write the prompt.
4. Confirm each MCP call. The result becomes later context.

Do not paste third-party JSON from blog posts as if it were official config. Copy only what the [MCP guide](https://help.aliyun.com/zh/lingma/guide-for-using-mcp) shows.

## Turn on Next Edit Suggestion (NES)

Official definition ([NES](https://help.aliyun.com/zh/lingma/next-edit-suggestion)): predict the next change from full-file context, recent edits, and the caret. **Tab** accepts, **Esc** rejects.

Same page: open personal settings with `⌘ ⇧ ,` (macOS) or `Ctrl Shift ,` (Windows) and enable **NES**. **Qoder CN IDE only supports Auto mode.**

IDE changelogs later rename NES to **NEXT**. Trust the label in your installed client.

## Pitfalls

| Symptom | Check | Source |
|---------|-------|--------|
| Marketplace search misses the plugin | Old page says TONGYI Lingma; Help Center says Qoder CN | [Download](https://lingma.aliyun.com/download), [Install](https://help.aliyun.com/zh/lingma/installation-guide) |
| No VS Code sidebar icon | Right-click the activity bar, enable Qoder CN | [Install](https://help.aliyun.com/zh/lingma/installation-guide) |
| No Edit mode in JetBrains / Lingma IDE | Use Agent | [Chat overview](https://help.aliyun.com/zh/lingma/overview-of-chat) |
| Agent cannot run the terminal in VS Code | VS Code > 1.93 + supported shell integration | [Terminal exceptions](https://help.aliyun.com/zh/lingma/description-of-terminal-execution-exception) |
| Old Lingma IDE missing new features | Uninstall Lingma IDE, install Qoder CN IDE | [Billing](https://help.aliyun.com/zh/lingma/billing-description) |
| Using it as Qwen chat | Wrong product. See the [map](./) | [qianwen.com](https://www.qianwen.com/) |
