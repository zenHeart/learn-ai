# Claude Code 维护参考

> 这是 [`_template.md`](./_template.md) 针对 Claude Code 的具体化，配合 [`maintenance-workflow.md`](./maintenance-workflow.md) 的通用流程使用。完整的高质量数据源清单（官方 Cookbook、核心开发者账号/Blog、GitHub 仓库、Awesome List、三方 Blog）已合并到 `docs/zh/products/ai-coding/claude/claude-code-cheatsheet.md` 的「高质量信息源」章节（读者可见，同时是 Agent 的数据基础），本文件的「监控页面」只是其中日常更新追踪最常用的一个子集。

## 基本信息

- 工具名：Claude Code
- 官方文档根地址：<https://code.claude.com/docs/zh-CN/>
- 发版节奏：几乎每周一个版本
- 当前覆盖版本：v2.1.x（对应 What's New 2026 年 3 月起的日期范围）

## 官方一级导航（产品家族）

> 规则见 [`family-completeness.md`](./family-completeness.md)。对照 [code.claude.com/docs](https://code.claude.com/docs/) 一级分类维护；不要凭印象填空。

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由 |
|--------------|----------|----------|------------|
| <!-- TODO: 待核实，打开官方一级 nav 后逐项填写 --> | | | |

易撞名：Claude.ai 聊天 ≠ Claude Code CLI；Plan 模式 ≠ 独立产品。

## 文档文件结构（Diataxis 四象限）

文档按 [Diataxis 文档架构](https://diataxis.fr/) 四象限组织，每个文件有且只有一个明确的目的，避免不同象限的混搭导致"读者不知道该看哪一份"。

```
docs/zh/products/ai-coding/claude/
├── index.md                    # 🗺️ 学习地图（Tutorial 入门导航 + Reference 功能速查）
├── claude-ai.md                # 核心产品 1：Claude.ai 平台指南
├── claude-code.md              # 核心产品 2：📘 Tutorial — CLI 详解 + 界面变体 + 最佳实践
├── claude-code-cookbook.md     #   └ 🔧 How-to — 9 大日常开发场景的提示模式与决策指南
├── claude-code-cheatsheet.md   #   └ 📐 Reference — 配置/决策表/数据源速查（怎么配/怎么选/去哪查）
├── claude-code-glossary.md     #   └ 📖 Explanation — 14 个核心概念的统一解释（是什么/为什么）
├── connectors.md               # 轴 A：依赖 MCP；轴 B：消费级，紧跟核心产品
├── claude-design.md            # 轴 A：无依赖；轴 B：终端用户向，对前端工程师相关度中高
├── cowork.md                   # 轴 A：无依赖（概念上更亲近 Claude.ai）；轴 B：定位"非工程师"，相关度低
└── plugin.md                   # 轴 A：依赖 Skills/Hooks；轴 B：开发者/发布者/企业级，全篇收尾
```

排列原则（为什么是这个顺序，不是字母序/创建顺序）见 [`documentation-architecture.md`](./documentation-architecture.md) 的「跨页排列顺序」节。

**每个文件的 Diataxis 定位与边界**：

| 文件 | 象限 | 职责 | 边界（什么不该写） |
|------|------|------|------------------|
| `index.md` | Tutorial 导航 + Reference 速查 | 跨页面学习地图 + 功能速查表 | 不写具体操作步骤，链到对应文件 |
| `claude-ai.md` | Tutorial | Claude.ai 平台怎么用 | 不写 Claude Code 专属功能 |
| `claude-code.md` | Tutorial | 安装、交互、核心功能怎么用 | 不写配置参数细节（→ cheatsheet），不写概念定义（→ glossary） |
| `claude-code-cookbook.md` | How-to | 场景化最佳实践（提示模式、避坑） | 不写概念定义（→ glossary），不写基础操作（→ tutorial） |
| `claude-code-cheatsheet.md` | Reference | 配置参数、决策表、数据源链接 | 不写概念解释（→ glossary，只放一句话+链接），不写学习路径（→ index） |
| `claude-code-glossary.md` | Explanation | 是什么、为什么、与其他概念的关系 | 不写参数清单（→ cheatsheet），不写操作步骤（→ tutorial） |

**为什么这样切分**（之前踩过的坑）：
- 之前 `concepts.md`（解释型）+ `claude-code-settings.md`（参考型）+ `sources.md`（数据源）三文件职责重叠、定位不清，读者经常不知道该看哪一份
- 合并后 `glossary.md` 专门回答"是什么/为什么"，`cheatsheet.md` 专门回答"怎么配/怎么选/去哪查"，配合 `tutorial` 形成清晰的三角关系
- 关于这个切分的设计哲学和决策依据沉淀在 [`documentation-architecture.md`](./documentation-architecture.md) 里

## 监控页面（What's New 驱动更新的信息源）

- [What's New](https://code.claude.com/docs/en/whats-new/index) — 每周更新，最主要的追踪入口
- [Settings](https://code.claude.com/docs/zh-CN/settings) — 配置变更（同步更新到 cheatsheet）
- [CLI Reference](https://code.claude.com/docs/zh-CN/cli-reference) — 命令变更
- [Commands 参考](https://code.claude.com/docs/en/commands) — 内置命令 + bundled skills 完整清单（写文档前用它核实斜杠命令是否真实存在）
- [Best Practices](https://code.claude.com/docs/zh-CN/best-practices) — 最佳实践更新
- [Troubleshooting](https://code.claude.com/docs/zh-CN/troubleshooting) — 故障排除更新
- [GitHub Releases](https://github.com/anthropics/claude-code/releases) — 完整版本发布说明和迁移指南
- [@ClaudeCodeLog（X）](https://x.com/ClaudeCodeLog) — 非官方 changelog bot，按版本拆 CLI/feature flag/prompt 变化；Claude Code 现在几天一个版本，官方 What's New 发不全，这个号是低成本的补充雷达

## Git 提交 scope

```
docs(claude): ...
```

## 已知踩坑 / 特殊约定

- **权限模式命名**：官方展示名（Normal/Auto/Plan/Accept Edits/Auto-Accept）和 `settings.json` 配置值（`default`/`auto`/`plan`/`acceptEdits`/`bypassPermissions`）容易混用，教程统一在 `claude-code-glossary.md` 里给出对照表，其余文档只链接不重复列举
- **内置命令/Skills 表格容易臆造**：`/run-skill-generator` 这类命令曾被误写进教程但官方文档查无此命令；写命令清单前务必用 [Commands 参考](https://code.claude.com/docs/en/commands) 逐条核实，不要凭印象写
- **正文标题不写精确版本号**：如"（v2.1.91 新增）"这类写法会导致每次版本迭代都要逐节排查更新，统一收敛到 `claude-code.md` 末尾的"本文涉及的版本变更点"表
- **跨文档共享的表格只在一处写**：配置优先级、权限模式对照、扩展点选型这种"全站唯一权威表格"统一在 cheatsheet/glossary 里写一份，引用方只放链接，不复制表格（避免口径漂移）
