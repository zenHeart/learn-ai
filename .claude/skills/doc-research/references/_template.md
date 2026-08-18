# <Tool> 维护参考模板

> 复制本文件为 `references/<tool-slug>.md`（如 `references/codex.md`、`references/gemini-cli.md`），填写下面每个占位符。通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；完整的高质量数据源清单（官方 Cookbook、核心开发者账号/Blog、GitHub 仓库、Awesome List、三方 Blog）发布成读者可见的 `docs/zh/products/ai-coding/<tool-slug>/<tool-slug>-cheatsheet.md` 的「高质量信息源」章节（方法论和条目格式见 [`sources/_template.md`](./sources/_template.md)），不要在这份文件里重复流程性内容或塞进完整数据源，只记录该工具特有的维护事实。文档架构的 Diataxis 四象限设计与边界划分见 [`documentation-architecture.md`](./documentation-architecture.md)，新建或重构某个工具的文档目录时先读。

## 基本信息

- 工具名：<Tool>
- 官方文档根地址：<https://...>
- 发版节奏：<例如"几乎每周一个版本" / "月度发版"，写实际观察到的频率，写不准就先留空，观察几周后再补>
- 当前覆盖版本：<x.y.z>（<对应哪次 What's New / Changelog>）

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。怎么抓官方页见 [`official-fetch.md`](./official-fetch.md)。

| 官方一级入口 | 官方 URL | 本站去向（独立页 / 地图一行 / 缺失） | 不拆页理由（若一行） |
|--------------|----------|--------------------------------------|----------------------|
| <product> | <url> | | |

易撞名（可执行文件名 ≠ 营销名 / Mode ≠ 同名产品）：<写「不是什么」，没有就写「无」>

## 文档文件结构（Diataxis 四象限）

按 [Diataxis](https://diataxis.fr/) 切分，每个文件有且只有一个明确目的，避免"读者不知道该看哪一份"：

```
docs/zh/products/ai-coding/<tool-slug>/
├── index.md                   # 🗺️ 学习地图（Tutorial 导航 + Reference 功能速查）
├── <tool-slug>.md             # 📘 Tutorial/How-to — 主教程
├── <tool-slug>-glossary.md    # 📖 Explanation — 核心概念统一解释（是什么/为什么）
├── <tool-slug>-cheatsheet.md  # 📐 Reference — 配置/决策表/数据源速查（怎么配/怎么选/去哪查）
├── <tool-slug>-cookbook.md    # 🔧 How-to — 场景化最佳实践（可选；如该工具场景化工作经验多则拆出）
└── ...                        # 其他深度专题文档（按 Diataxis 原则判断是否需要独立成章）
```

**模版：每个文件的职责边界**

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | Tutorial 导航 + Reference 速查 | 跨页面学习地图 + 功能速查表 | 具体操作步骤 |
| `<tool-slug>.md` | Tutorial + How-to | 安装、交互、核心功能怎么用 | 配置参数细节（→ cheatsheet）、概念定义（→ glossary） |
| `<tool-slug>-glossary.md` | Explanation | 是什么、为什么、与其他概念的关系 | 参数清单（→ cheatsheet）、操作步骤 |
| `<tool-slug>-cheatsheet.md` | Reference | 配置参数、决策表、数据源链接 | 概念解释、学习路径 |
| `<tool-slug>-cookbook.md` | How-to | 场景化提示模式、避坑 | 基础操作（→ tutorial）、概念定义（→ glossary） |
```

## 监控页面（What's New 驱动更新的信息源，日常追踪用的最小子集）

- What's New / Changelog：<url>
- 配置 / Settings 参考：<url>
- CLI / API Reference：<url>
- Best Practices：<url>
- Troubleshooting：<url>
- GitHub Releases（如有）：<url>

## Git 提交 scope

```
docs(<tool-slug>): ...
```

## 已知踩坑 / 特殊约定

<记录维护这个工具文档时踩过的坑或团队约定，例如："该工具的权限模式命名在官方文档里前后不一致，教程统一用 XXX 命名" —— 这类信息只有维护过程中才会发现，先留空，遇到了再补>
