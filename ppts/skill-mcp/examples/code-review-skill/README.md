# Code Review Skill

团队 Code Review SOP 沉淀为 Skill，自动激活，按 SOP 输出结构化审查报告。

## 安装

```bash
# 复制到全局 Skill 目录
cp -r . ~/.claude/skills/code-review

# 或软链
ln -s "$(pwd)" ~/.claude/skills/code-review

# 验证
claude skill list | grep code-review
```

## 触发

Skill 通过 description 自动激活，关键词包括：

- "审查 / review / code review"
- "看看这个 PR"
- "检查这次改动"

也可显式触发：`/code-review <PR 链接>`

## 目录结构

```
code-review/
├── SKILL.md                       # Tier 1 + Tier 2 加载
└── references/                    # Tier 3 按需加载
    ├── SQL_INJECTION.md           # SQL 注入详细清单
    └── N_PLUS_ONE.md              # N+1 查询详细清单
```

`references/` 仅在 SKILL.md 中明确引用时才被加载，符合 Progressive Disclosure 原则。

## 与 GitHub MCP 配合

如果同时安装了 GitHub MCP Server，Skill 会自动调用 `get_pull_request_diff` 拉 PR；
否则会回退到本地 `git diff`。

## 版本管理

```yaml
metadata:
  version: "1.0.0"
```

每次 SKILL.md 变更需 bump 版本，建议遵循 SemVer：

- patch：修正错别字、补 edge case
- minor：新增检查项
- major：改变激活条件或输出格式
