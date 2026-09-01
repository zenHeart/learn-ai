---
title: 写给仓库的 AGENTS.md
description: "AGENTS.md 是给编码助手的 README。把安装、测试、约定写进仓库，而不是每次对话重说一遍。"
domain: tech
tags:
  - prompt
navOrder: 30
llm:
  - 15
prev:
  text: 稳住结构 · JSON
  link: /zh/tech/prompt/json-prompt-best-practices
next:
  text: 换模型时改什么
  link: /zh/tech/prompt/official-guide-2026
---

# 写给仓库的 AGENTS.md

**结论**：对话里反复交代的规矩，应该写进仓库根目录的 `AGENTS.md`。它是给编码助手的 README，不是另一份给人看的贡献指南。

上一页把单次提示写清楚。这一页把「对这个仓库永远成立」的部分固化下来。格式来自官方站点 [agents.md](https://agents.md/)，由 Agentic AI Foundation（Linux Foundation）托管，Cursor、Codex、GitHub Copilot、Gemini CLI、Claude Code 等都会读。

## 写给谁、不写什么

| | |
|---|---|
| **先决条件** | 已经会按 [怎么写 Prompt](/zh/tech/prompt/) 把任务 / 约束 / 输出写清 |
| **学习目标** | 能在本仓库落下一份助手真正会执行的 `AGENTS.md` |
| **不是本页** | 某个产品的完整用法 → [产品](/zh/products/)；多 Agent 编排 → [Agent](/zh/tech/patterns/agent/) |

## 它解决什么问题

`README.md` 写给人：项目是什么、怎么跑起来、怎么贡献。

`AGENTS.md` 写给助手：装依赖用哪个包管理器、测试怎么跑、哪些目录不能动、提交前必须绿哪些检查。这些话如果写进 README，人会嫌长；如果不写，每个助手都会猜。

官方原话大意：单独放这个文件，是为了给人看的 README 保持短，同时给助手一个稳定入口。没有必填字段，就是普通 Markdown。冲突时：**离正在改的文件最近的 `AGENTS.md` 优先**；用户当次对话里的话覆盖一切。

## 最小模板

把下面复制到仓库根目录，改成你的命令。本仓库自己的约定也是这一套：根目录只用 `pnpm`，不要跑 `npm install`。

```md
# AGENTS.md

## Setup commands

- 安装依赖：`pnpm install`（只在仓库根目录）
- 不要在根目录运行 `npm install`
- 文档开发：`pnpm docs:dev`
- 文档构建：`pnpm docs:build`

## Code style

- 只用 ES modules（`import` / `export`）
- 根目录有 `"type": "module"`
- 改文档用中文；代码、提交信息用英文

## Testing instructions

- 提交前运行 `pnpm docs:build`
- 改了 PPT 再跑 `pnpm ppt:build`
- 不要只改一页就声称「站点好了」：侧栏链接必须指向真实 `.md`

## Security

- 不要把 token、本机 MCP 配置、家目录路径写进文档
- 找不到的命令名、flag、URL 标成待核实，不要补「应该是」
```

对照 [agents.md](https://agents.md/) 推荐覆盖的块：项目怎么跑、怎么测、代码风格、安全。需要的话再加提交信息、PR 标题、部署步骤。

## 工程约定

1. **命令必须是仓库里真能跑的。** 写 `pnpm docs:build` 之前先跑一遍。助手会执行你列出来的检查。
2. **写「做什么」，少写人格。** 「你是世界一流的前端专家」几乎不增加可执行信息。包管理器、禁止事项、验收命令才会。
3. **大 monorepo 用嵌套文件。** 每个包放自己的 `AGENTS.md`。官方举例：撰写时 OpenAI 主仓库有 88 份。离文件近的那份生效。
4. **和 README 分工。** README 保留给人的快速开始；助手专属的长约束放到这里。
5. **迁移旧文件。** 官方建议：`mv AGENT.md AGENTS.md && ln -s AGENTS.md AGENT.md`，兼容还在读旧名的工具。

Gemini CLI 若要显式指定文件名，官方示例是 `.gemini/settings.json`：

```json
{ "context": { "fileName": "AGENTS.md" } }
```

Aider 则在 `.aider.conf.yml` 写 `read: AGENTS.md`。多数新工具会默认找根目录这份文件。

## 工具怎么读这份文件

| 工具 | 默认找哪 | 还要看什么 |
|---|---|---|
| Cursor | 根目录 / 嵌套 `AGENTS.md` | `.cursor/rules`、产品页 [Cursor](/zh/products/cursor/) |
| Claude Code | `AGENTS.md` + `CLAUDE.md` | [Claude Code](/zh/products/claude/claude-code) |
| Codex | `AGENTS.md` | [Codex](/zh/products/codex/) |
| GitHub Copilot Coding Agent | `AGENTS.md` | [Copilot](/zh/products/copilot/) |
| Gemini CLI | 默认同名；可在 `.gemini/settings.json` 指定 | 上文配置 |

本仓库自己的样本：根目录 `AGENTS.md`（跨工具）和 `Claude.md`（Claude Code 补充）。打开对照，不要另抄一份空话。

## 坏例子 vs 好例子

**坏：** 人格很长，命令是假的。

```md
你是世界一流的全栈专家，代码优雅、测试完备。
运行 npm test 后再提交。
```

本仓根目录跑 `npm test` 会装错依赖。助手会照做。

**好：** 命令真实、禁区清楚、验收可跑。

```md
- 根目录只用 pnpm。不要 npm install。
- 改文档后跑 pnpm docs:build。
- 不要把 token 和本机 MCP 配进文档。
```

## 常见陷阱

- **写成第二份 README。** 重复项目简介，却不写安装和测试命令。
- **命令是假的。** 文档里写 `npm test`，仓库实际是 `pnpm test`。助手会按错的跑。
- **和产品页抢活。** Cursor 规则、Claude Code 的 `CLAUDE.md` 仍以各产品文档为准。`AGENTS.md` 是跨工具最小公约数。
- **指望它替代当次任务。** 「把设置页对比度修掉」写在对话里。`AGENTS.md` 不管这一次改哪个文件。

## 下一步

- 换模型后提示行为飘了 → [换模型时改什么](/zh/tech/prompt/official-guide-2026)
- 提示要变成可复用技能 → [Skills](/zh/tech/skills/claude-skills-overview)
- 要助手调浏览器 / 工单 / 文档 → [MCP](/zh/tech/mcp/mcp-course-notes)

## 深读

- 官方格式与示例：[agents.md](https://agents.md/)
- 示例仓库检索：GitHub 搜索 `filename:AGENTS.md`（官方称已有 6 万+ 项目采用）
- 本仓库根目录的 `AGENTS.md` / `Claude.md`：同一套约定的实地样本
