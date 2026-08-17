# GitHub Copilot 维护参考

> 这是 [`_template.md`](./_template.md) 针对 GitHub Copilot 的具体化，配合 [`maintenance-workflow.md`](./maintenance-workflow.md) 的通用流程使用。完整的高质量数据源清单发布在 `docs/zh/products/ai-coding/copilot/copilot-cheatsheet.md` 的「高质量信息源」章节（读者可见），本文件的「监控页面」只是其中日常更新追踪最常用的一个子集。

## 基本信息

- 工具名：GitHub Copilot
- 官方文档根地址：<https://docs.github.com/en/copilot>
- VS Code 侧文档根地址：<https://code.visualstudio.com/docs/copilot/overview>
- 发版节奏：GitHub 侧 changelog 每周多条；VS Code 侧跟随月度 Stable 发版（每月一个 minor）
- 当前覆盖版本：GitHub Copilot 文档 2026-08 快照 + VS Code Copilot 功能参考 2026-06-03 版本

## 文档文件结构（Diataxis 四象限）

按 [Diataxis](https://diataxis.fr/) 切分，每个文件有且只有一个明确目的：

```
docs/zh/products/ai-coding/copilot/
├── index.md                # 🗺️ 学习地图（Tutorial 导航 + Reference 功能速查）
├── copilot.md              # 📘 Tutorial — 从零上手：计划选择、四种交互界面、自定义上下文
├── copilot-cookbook.md     #   └ 🔧 How-to — 场景化提示模式与工作流（内联/终端/Chat/CLI/Cloud agent）
├── copilot-cheatsheet.md   #   └ 📐 Reference — 快捷键/斜杠命令/工具集/CLI flag/配置键/计划对照/数据源
└── copilot-glossary.md     #   └ 📖 Explanation — 核心概念统一解释（是什么/为什么/与 X 的区别）
```

英文树 `docs/products/ai-coding/copilot/` 结构完全一致。

**每个文件的 Diataxis 定位与边界**：

| 文件 | 象限 | 职责 | 边界（什么不该写） |
|------|------|------|------------------|
| `index.md` | Tutorial 导航 + Reference 速查 | 跨页面学习地图 + 功能速查表 | 不写具体操作步骤，链到对应文件 |
| `copilot.md` | Tutorial | 装什么、怎么起步、四种界面怎么用 | 不写完整参数清单（→ cheatsheet）、不写概念定义（→ glossary） |
| `copilot-cookbook.md` | How-to | 场景化提示模式、Prompt 原则、避坑 | 不写概念定义（→ glossary）、不写安装（→ tutorial） |
| `copilot-cheatsheet.md` | Reference | 快捷键、命令、工具集、配置键、计划对照、数据源 | 不写概念解释（→ glossary，只放一句话 + 链接）、不写学习路径（→ index） |
| `copilot-glossary.md` | Explanation | 是什么、为什么、与其他概念的关系、已退役概念 | 不写参数清单（→ cheatsheet）、不写操作步骤（→ tutorial） |

**为什么这样切分**：
- 拆分前 `copilot.md` 是单文件 324 行（EN）/ 308 行（ZH），同时承担"教你上手""列快捷键表""解释 participant 是什么"三种职责，读者查快捷键要滚过一大段教程
- 快捷键表 / 斜杠命令表 / 工具集表是典型 Reference——需要频繁按官方 changelog 校准，独立成 cheatsheet 后更新面收敛到一个文件
- Copilot 迭代快、退役概念多（见下方踩坑），把"这个东西还存不存在"集中收敛到 glossary 的「已退役 / 已改名的概念」章节，避免同一个过时说法散落在多处

## 监控页面（What's New 驱动更新的信息源）

- [GitHub Changelog — Copilot 分类](https://github.blog/changelog/label/copilot/) — 最主要的追踪入口，功能上线/退役都发这里
- [Copilot 计划与配额](https://docs.github.com/en/copilot/get-started/plans) — 价格、AI credits、可用性变更
- [VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features) — 快捷键、斜杠命令、工具集、settings 键的唯一权威清单
- [Copilot CLI 命令参考](https://docs.github.com/en/copilot/reference/cli-command-reference) — CLI 子命令、flag、交互快捷键、斜杠命令
- [自定义指令支持矩阵](https://docs.github.com/en/copilot/reference/custom-instructions-support) — 五类自定义指令在各 IDE 的支持情况
- [VS Code Release Notes](https://code.visualstudio.com/updates) — 月度 Stable，Copilot 相关变更集中在 "Chat" 章节

## Git 提交 scope

```
docs(copilot): ...
```

## 已知踩坑 / 特殊约定

- **URL 不要用 `docs.github.com/zh/enterprise-cloud@latest/...`**：拆分前全篇用的是这套企业云 + 中文的路径，大量已 404 或重定向。统一用 `docs.github.com/en/copilot/...`；`docs.github.com` 的中文版覆盖不全且滞后，链接一律指英文原文
- **Copilot CLI 有两套，别混**：老的 `gh copilot`（`gh` 扩展，只有 `explain`/`suggest`）和新的独立 `copilot`（`npm i -g @github/copilot`，完整 agent）。写命令前先确认在讲哪一套
- **`/copilot/reference/copilot-cli/...` 这种嵌套路径会 404**：CLI 参考的真实路径是扁平的 `/copilot/reference/cli-command-reference`
- **VS Code 侧的 participant / 变量清单变动极频繁**：`@workspace`、`@regex`、`#editor`、`#git`、`#vscodeAPI`、`/new-from`、`/runCommand` 都曾写进文档但现已不在官方清单里。写这类表格前逐条对照 [VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)，不要凭印象保留
- **"Copilot Extensions" 已于 2025-11-10 日落**：官方转向 MCP，见 [Sunset notice](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps/)。注意区分"GitHub App 形态的 Copilot Extensions"（已退役）和"VS Code 客户端侧 Chat 扩展"（仍支持）
- **不写精确版本号到正文标题**：Copilot 周更，"（v1.2.3 新增）"这类写法会让每次迭代都要全篇排查
- **跨文档共享的表格只在一处写**：快捷键、计划对照、工具集清单统一写在 cheatsheet，其他文件只放链接
