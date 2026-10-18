# <Tool> 维护参考模板

> 复制为消费仓库的 `references/<tool-slug>.md`。只记该工具特有的维护事实。通用流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)。读者可见的数据源写进 cheatsheet 的「高质量信息源」（方法论见 [`sources/_template.md`](./sources/_template.md)），不要在本文件再抄一份。架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 基本信息

- 工具名：<Tool>
- 官方文档根地址：<https://...>
- 发版节奏：<观察到的频率；写不准先留空>
- 当前覆盖版本：<x.y.z>（<对应哪次 Changelog>）

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。抓页见 [`official-fetch.md`](./official-fetch.md)。

| 官方一级入口 | 官方 URL | 本站去向（独立页 / 地图一行 / 缺失） | 不拆页理由（若一行） |
|--------------|----------|--------------------------------------|----------------------|
| <product> | <url> | | |

易撞名（可执行文件名 ≠ 营销名 / Mode ≠ 同名产品）：<写「不是什么」，没有就写「无」>

## 文档文件结构（Diataxis）

```
<docs-root>/<tool-slug>/
├── index.md
├── <tool-slug>.md
├── <tool-slug>-glossary.md
├── <tool-slug>-cheatsheet.md
├── <tool-slug>-cookbook.md    # 可选
└── …
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 学习地图 + 功能速查 | 具体操作步骤 |
| `<tool-slug>.md` | Tutorial | 安装、交互、核心用法 | 参数细节、概念定义 |
| `<tool-slug>-glossary.md` | Explanation | 是什么 / 为什么 | 参数清单、操作步骤 |
| `<tool-slug>-cheatsheet.md` | Reference | 配置、决策表、数据源 | 概念解释、学习路径 |
| `<tool-slug>-cookbook.md` | How-to | 场景配方、避坑 | 基础操作、概念定义 |

## 监控页面

- What's New / Changelog：<url>
- Settings：<url>
- CLI / API Reference：<url>
- Best Practices：<url>
- Troubleshooting：<url>
- GitHub Releases（如有）：<url>

## Git 提交 scope

```
docs(<tool-slug>): ...
```

## 已知踩坑 / 特殊约定

<维护中才发现的坑。先留空，遇到再补。>
