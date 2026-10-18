# 文档维护工作流（通用）

> 不含具体工具信息。工具路径、监控页面、commit scope 记在消费仓库的 `references/<tool-slug>.md`。新工具复制 [`_template.md`](./_template.md)，不要新建 Skill。

## 维护哲学

1. **原始链接即真理源**：每个知识点链回官方文档
2. **Changelog 驱动更新**：追踪 `references/<tool-slug>.md` 里的监控页
3. **社区只补盲区**：踩坑经验走 SKILL 的 Deepen，不能当命令/额度的出处

## 节奏

**日常**（按发版频率）：Changelog → 官方一级 nav vs 家族图 → RAPID 研究新功能 → 更新章节。不要在小标题里写精确版本号，版本点集中到主教程文末表。

**深度**（建议每月）：跑 `doc-quality-auditor`，修 P0/P1，P2 进待办。

**大版本**：What's New + Migration Guide → Deepen → 完整审计 → 更新 index 版本说明。

## 任务速查

| 任务 | 用什么 |
|------|--------|
| 新功能 | 先对官方一级 nav → RAPID |
| 版本升级 | Changelog → Deepen → auditor |
| 论断/死链 | `fact-audit` |
| 围栏配对 | `grep -n '```' <file> \| wc -l` 必须为偶数 |
| 跨文档重复 | 单一来源 + 链接，禁止抄表 |

## Git

```
docs(<tool-slug>): …
```

`index.md` 记录：文档最后更新日期、覆盖的上游版本（对应 Changelog 日期范围）。
