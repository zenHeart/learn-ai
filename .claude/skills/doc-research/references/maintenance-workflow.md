# 文档维护工作流（通用）

> 本文件是 doc-research 技能维护"任意工具教程文档"的通用流程模板，不含具体工具信息。具体工具的路径、监控页面、commit scope 等信息记录在同目录下的 `<tool-slug>.md`（例如 [`claude-code.md`](./claude-code.md)）；要开始维护一个新工具的教程，复制 [`_template.md`](./_template.md) 填空即可，不要新建技能或修改 [`SKILL.md`](../SKILL.md)。

## 维护哲学

快速迭代的工具（几乎每周甚至更高频发版）文档维护的核心挑战是**跟上变化**而非一次性写全。三个原则：

1. **原始链接即真理源**：教程中的每个知识点都链接回官方文档，更新时只需追踪官方变化，不用维护"第二真相源"
2. **What's New / Changelog 驱动更新**：定期检查该工具的更新日志页面（记录在 `references/<tool-slug>.md` 的"监控页面"里），新功能及时补充到教程
3. **社区验证补盲区**：官方文档不覆盖踩坑经验，需通过 [SKILL.md](../SKILL.md) 的多源交叉验证补充

## 维护节奏

### 日常维护（按该工具实际发版频率，常见是每周）

```
1. 检查 references/<tool-slug>.md 里记录的 What's New / Changelog 页面
2. 对照官方一级导航 vs 本站 index 家族图（见 family-completeness.md）；缺产品先补
3. 对比上次维护记录，提取新功能和变更
4. 运行 doc-research 技能（SKILL.md）研究新功能
5. 更新教程对应章节
   —— 不要在小标题里写具体版本号（如"（v2.1.91 新增）"），
      每次迭代都要逐节排查更新成本太高；
      确需标注版本的内容集中记录到该工具主教程末尾的"版本变更记录"表
6. 更新该工具 index.md 的功能速查表（如有新功能）
```

### 深度维护（建议每月一次）

```
1. 运行 doc-quality-auditor Agent（.claude/agents/doc-quality-auditor.md）
2. 生成审计报告
3. 修复 P0 和 P1 问题
4. 记录 P2 问题到待办列表
5. 存档审计报告到 doc-research/audits/<tool-slug>-<date>.md
```

### 版本升级专项（工具发布大版本更新时）

```
1. 阅读 What's New + Migration Guide
2. 检查教程中的版本号、截图、示例是否过时
3. 使用 doc-research 技能的 Deepen 步骤验证覆盖
4. 使用 doc-quality-auditor 做完整审计
5. 更新该工具教程 index.md 中的版本相关说明
```

## 常见维护任务速查

| 任务 | 工具 | 步骤 |
|------|------|------|
| 新功能补充 | doc-research | 先对官方一级 nav → RAPID → 更新章节 → 更新 index.md |
| 版本升级 | doc-research + auditor | What's New → Deepen → 完整审计 → 修复 |
| 社区反馈处理 | doc-research | 搜索反馈 → 验证 → 补充到对应章节 |
| 完整质量审查 | doc-quality-auditor | 加载 Agent → 生成报告 → 修复 P0/P1 |
| 链接检查 | 手动/Bash | grep 所有 `]()` 链接 → WebFetch 验证 |
| 锚点验证 | Bash | 提取所有 `#` 锚点 → 读取目标文件验证 |
| 代码块围栏检查 | Bash | `grep -n '```' <file> \| wc -l` 确认为偶数 |
| 跨文档重复检查 | 人工/auditor | 同一张表格是否在多篇文档里各抄一份，应改为单一来源 + 链接 |

## Git 提交规范

文档提交使用 Conventional Commits 格式，`scope` 用该工具的目录名（记录在 `references/<tool-slug>.md`）：

```
docs(<tool-slug>): 新增配置速查手册和实战工作流 cookbook
docs(<tool-slug>): 更新主教程链接到新页面
docs(<tool-slug>): 修复配置示例错误
```

## 版本对应关系记录格式

在该工具 `index.md` 的模型参考表中记录：

```
**文档最后更新**：YYYY-MM-DD
**覆盖 <Tool> 版本**：<version>（对应 What's New / Changelog 日期范围）
```
