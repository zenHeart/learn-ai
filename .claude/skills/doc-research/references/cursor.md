# Cursor 维护参考

> 这是 [`_template.md`](./_template.md) 针对 Cursor 的具体化，配合 [`maintenance-workflow.md`](./maintenance-workflow.md) 的通用流程使用。完整的高质量数据源清单已合并到 `docs/zh/products/ai-coding/cursor/cursor-cheatsheet.md` 的「高质量信息源」章节。本文件只记录该工具特有的维护事实。

## 基本信息

- 工具名：Cursor
- 官方文档根地址：<https://cursor.com/docs>
- 发版节奏：编辑器按 changelog 连续发小版本（2026 年可见 2.x / 3.x 系列）；文档站 URL 也会整体改版
- 当前覆盖版本：2026-08 文档树（Quickstart / Agent / Rules / Skills / Hooks / MCP / Bugbot / Tab / Inline Edit / Cloud Agents / CLI）

## 文档文件结构（Diataxis 四象限）

```
docs/zh/products/ai-coding/cursor/
├── index.md                   # 🗺️ 学习地图（Tutorial 导航 + 决策）
├── cursor.md                  # 📘 Tutorial — 安装、5 分钟第一例、Rules、Agent 模式、Tab
├── cursor-cookbook.md         # 🔧 How-to — 场景化最佳实践
├── cursor-cheatsheet.md       # 📐 Reference — 功能矩阵 / 配置 / 快捷键 / 数据源
└── cursor-glossary.md         # 📖 Explanation — 核心概念是什么 / 为什么
```

英文镜像在 `docs/products/ai-coding/cursor/`，文件名相同。

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | Tutorial 导航 + Reference 速查 | 家族全景 + 补全/Agent/Cloud/Bugbot/CLI 决策 | 具体操作步骤、整张功能矩阵 |
| `cursor.md` | Tutorial | 安装、第一次改动、核心功能怎么用 | 配置参数细节、概念长文 |
| `cursor-cookbook.md` | How-to | 场景化提示模式、避坑 | 基础操作、概念定义 |
| `cursor-cheatsheet.md` | Reference | 功能矩阵、快捷键、配置、数据源 | 概念解释、学习路径 |
| `cursor-glossary.md` | Explanation | 是什么、为什么、与其他概念的关系 | 参数清单、操作步骤 |

## 监控页面（What's New 驱动更新的信息源，日常追踪用的最小子集）

- Changelog：<https://cursor.com/changelog>
- Quickstart：<https://cursor.com/docs/get-started/quickstart>
- Agent Overview：<https://cursor.com/docs/agent/overview>
- Plan Mode：<https://cursor.com/docs/agent/plan-mode>
- Debug Mode：<https://cursor.com/docs/agent/debug-mode>
- Prompting / @ mentions：<https://cursor.com/docs/agent/prompting>
- Rules + AGENTS.md：<https://cursor.com/docs/rules>
- Skills：<https://cursor.com/docs/skills>
- Commands：<https://cursor.com/docs/context/commands>
- MCP：<https://cursor.com/docs/mcp>
- Hooks：<https://cursor.com/docs/hooks>
- Subagents：<https://cursor.com/docs/subagents>
- Bugbot：<https://cursor.com/docs/bugbot>
- Cloud Agent：<https://cursor.com/docs/cloud-agent>
- Cloud setup：<https://cursor.com/docs/cloud-agent/setup>
- Cloud best practices：<https://cursor.com/docs/cloud-agent/best-practices>
- CLI Overview：<https://cursor.com/docs/cli/overview>
- CLI Installation：<https://cursor.com/docs/cli/installation>
- CLI Headless：<https://cursor.com/docs/cli/headless>
- Tab：<https://cursor.com/docs/tab/overview>
- Inline Edit：<https://cursor.com/docs/inline-edit/overview>
- Semantic search：<https://cursor.com/docs/context/semantic-search>
- Ignore files：<https://cursor.com/docs/context/ignore-files>
- Keyboard shortcuts：<https://cursor.com/docs/reference/keyboard-shortcuts>
- Models & Pricing：<https://cursor.com/docs/models-and-pricing>
- Privacy：<https://cursor.com/docs/enterprise/privacy-and-data-governance>
- Official agent best practices：<https://cursor.com/blog/agent-best-practices>
- Forum：<https://forum.cursor.com/>

## Git 提交 scope

```
docs(cursor): ...
```

## 已知踩坑 / 特殊约定

- **文档 URL 会整体搬家**：2025–2026 之间大量页面从 `/docs/context/*`、`/docs/agent/hooks` 迁到短路径（`/docs/rules`、`/docs/hooks`、`/docs/skills`、`/docs/mcp`、`/docs/subagents`）。写链接前打开目标页确认 200，不要抄旧矩阵里的路径当最终 URL。
- **Bugbot ≠ Debug Mode**：旧矩阵把 Bugbot 写成「带运行时上下文的自动调试器」。官方文档里 Bugbot 是 PR 审查 + Autofix；运行时假设/打日志是 Debug Mode。
- **Ask / Agent / Plan / Debug**：官方当前导航没有单独的 `/docs/agent/modes` 长页。模式入口是 `Cmd+.`（Mode Menu）和 Agent 输入框的 `Shift+Tab`（轮换 Plan 等）。Ask 仍出现在 changelog 与论坛，但独立文档页不要臆造。
- **Notepad**：旧矩阵有一条 Notepad，链到 mentions。2026-08 的 Prompting 页列出的是 `@` Files / Folders / Terminals / Chats / Git diffs / Browser，没有独立 Notepad 文档。保留矩阵行时要标明状态，不要补一段「怎么用 Notepad」的假教程。
- **Commands vs Skills**：`.cursor/commands/*.md` 仍是官方文档页；内置 `/create-rule`、`/review-bugbot` 等已收进 Skills。官方提供 `/migrate-to-skills` 把动态规则和 slash commands 迁到 Skills。两边都写，不要宣布 Commands 已删除。
- **规则文件格式**：`.cursor/rules` 下只有带 frontmatter 的 `.mdc` 会被规则系统读取；纯 `.md` 会被忽略。简单场景用仓库根或子目录的 `AGENTS.md`。
- **规则优先级**：Team Rules → Project Rules → User Rules。冲突时更早的源优先。
- **快捷键口径**：官方当前文档里 `Cmd+I` / `Cmd+L` 都是 Toggle Sidepanel；`Cmd+K` 是 Inline Edit；Agent 入口在 Quickstart 里也写成 `Cmd+I`。旧 stub 把 `Cmd+L` 当「打开 AI Chat」、`Cmd+Shift+K` 当 Inline Chat，不要原样抄回教程。
- **正文标题不写精确编辑器版本号**：changelog 迭代很快，版本点收敛到「本文涉及的版本变更点」或直接链 changelog。
- **旧单文件 `docs/**/ai-coding/cursor.md`**：与 `cursor/index.md` 会抢同一 VitePress 路由，必须删除，不能并存。
- **Cloud Agents = 原 Background Agents**：官方 Naming History。不要拆成两个产品，也不要为 Cloud / Bugbot / CLI 新建空 stub——密度够就加 cookbook 专节 + index 决策节点。
- **Bugbot Autofix ≠ 独立产品 Fixer**：2026 官方页功能名是 Autofix，会拉起 Cloud Agent。没有单独的 Fixer 产品页就不要写「Fixer」。
- **CLI 二进制是 `agent`**：安装脚本 `curl https://cursor.com/install -fsS | bash`；无头 `-p`，落盘加 `--force`。不要写成 `cursor` CLI。
- **不拆 Origin / SDK / Security Agents stub**：官方有页，但对前端日常 80/20 不够独立成 Tutorial；只在 index 标明「本教程不拆页」。
