# 触发匹配 · Dry-Run 演示

把 SKILL.md 安装到 `~/.claude/skills/code-review/` 后，下面这些自然语言输入都会自动激活：

| 用户输入 | 是否激活 | 命中关键词 |
|---|---|---|
| "帮我审一下这个 PR：https://github.com/.../pull/42" | ✅ | review PR |
| "看看这次改动有没有问题" | ✅ | 检查这次改动 |
| "code review for src/user.ts" | ✅ | code review |
| "审查我刚提交的代码" | ✅ | 审查 |
| "今天天气怎么样？" | ❌ | 无任何关键词 |
| "帮我写一个登录函数" | ❌ | 是写代码而非审查 |
| "测试一下这个 API" | ❌ | 是测试任务（不是 review） |

## 如果两个 Skill 关键词冲突？

例如同时安装了 `code-review` 和 `style-review`：

| 输入 | 行为 |
|---|---|
| "审查这次改动" | 两者都候选，agent 选 description 关键词命中度高的 |
| "审查这次改动的样式" | `style-review` 命中（含 "样式"） |
| "审查 SQL 注入" | `code-review` 命中（描述里有 "SQL 注入"） |

## 如何验证激活

```bash
# 列出所有已注册 Skill
claude skill list

# 查看某个 Skill 的元信息
claude skill info code-review

# 模拟激活（实际不执行）
claude skill match "帮我审一下这个 PR"
# → matched: code-review (confidence 0.92)
```

## 调试小窍门

description 写得不准时，用 `claude skill match "<your query>"` 反复迭代直到 confidence ≥ 0.8。
