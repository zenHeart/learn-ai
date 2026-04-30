---
name: code-review
description: 审查 PR diff，重点检查 SQL 注入、N+1 查询、敏感日志泄露与异常处理覆盖率。当用户要求"代码审查 / review PR / 检查这次改动 / code review / 看看这个 PR"时调用。输出结构化报告，含风险等级、行号定位、建议修改。
license: MIT
metadata:
  team: backend-platform
  version: "1.0.0"
allowed-tools: Bash(git:diff) Bash(git:log) Read
---

## When to use

当符合以下任一条件时激活：

- 用户传入 PR 链接或编号（如 `https://github.com/.../pull/42`、`#42`）
- 用户贴出 diff 文本（含 `+++`/`---` 标记）
- 用户说"审查这次改动 / code review / 看看 PR / 检查我刚提交的"

## How to do

按以下顺序，每一步都要执行：

### 1. 拉到改动

- 如果用户给了 PR 链接 → 调用 GitHub MCP `get_pull_request_diff`
- 如果是本地分支 → `git diff main...HEAD`
- 如果用户贴了 diff → 直接用

**diff 超过 500 行时**：先按文件分批，避免一次塞爆 Context（Tier 3 资源按需读 `references/LARGE_DIFF.md`）

### 2. 风险扫描（按优先级）

**P0 · SQL 注入**：参考 `references/SQL_INJECTION.md`
- 字符串拼接构造 SQL（`"SELECT * FROM users WHERE id=" + id`）
- ORM 原生查询拼接
- 动态表名 / 列名

**P0 · 敏感日志**：搜以下关键词在日志输出附近：
- `password` / `token` / `secret` / `cookie` / `apikey`
- 整个 request body / response body 直接 log

**P1 · N+1 查询**：参考 `references/N_PLUS_ONE.md`
- 循环里有 ORM 查询调用
- `await` 在 for 循环里

**P1 · 异常处理覆盖率**：
- 每个 `try` 是否吃掉了关键错误（`except: pass`）
- 异步操作是否设了超时

### 3. 输出报告

按以下格式输出（不要冗长解释）：

```
## Code Review · <PR 标题或分支名>

### 🔴 P0 风险（必须修复）
- src/user.ts:45 · SQL 注入
  原因：字符串拼接构造 SQL
  建议：改用参数化查询 db.query('SELECT ... WHERE id=?', [id])

### 🟡 P1 风险（建议修复）
- src/order.ts:120 · N+1 查询
  原因：循环里查 user
  建议：批量 IN 查询 + Map 关联

### ✅ 通过
- 敏感日志：未发现
- 异常处理：覆盖率良好
```

## Common edge cases

- **diff 为空**：报告"无代码改动"并停止
- **二进制文件**：跳过（不要尝试读 binary）
- **测试代码**：放宽 SQL 注入要求（mock 数据可接受）
- **生成的代码**（如 protobuf、`__pycache__`）：跳过
- **GitHub MCP 未配置**：提示用户先 `claude mcp add github`

## 不要做

- 不要泛泛评价"可读性 / 命名风格"（另有 `style-review` Skill 负责）
- 不要修改代码（只审查、不改动 —— 改动需要用户明确指示）
- 不要超过 500 字总结（精简才有用）
