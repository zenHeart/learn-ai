---
name: release-staging
description: 执行 staging 环境发版的完整流程：跑测试、检查覆盖率、写 changelog、打 tag、推送、Slack 通知。当用户输入 /release-staging 或说"发个 staging / 部署预发 / 上 staging"时调用。
license: MIT
metadata:
  team: backend-platform
  version: "2.1.0"
  changelog: "https://intra.company.com/skills/release-staging"
allowed-tools: Bash(npm:*) Bash(git:*) Read Edit Write
---

## When to use

- 用户输入 `/release-staging`
- 用户说"发个 staging / 部署预发 / 上 staging / staging 发版"

## Pre-flight checks

执行前先确认环境：

1. 工作区无未提交改动 → `git status --porcelain` 必须为空
2. 当前分支为 `main` 或 `release/*` → 否则停止并询问
3. 远程已同步 → `git fetch && git status` 不能落后

任一失败 → **停止并报告**，不要尝试修复。

## 执行步骤

### Step 1 · 跑单元测试

```
npm test
```

- 失败 → **stop**，报告失败的 test case
- 超时 5 分钟 → 标记并询问用户是否继续

### Step 2 · 检查覆盖率

```
npm run test:coverage
```

- 解析输出，提取 statements / branches / functions / lines 四项
- 任一 < 80% → 询问用户是否强制继续；用户回 "yes" 才继续

### Step 3 · 生成 changelog

调用 git MCP 拉 commit：

```
git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h %s"
```

按 conventional commit 分类：

- `feat:` → ✨ 新功能
- `fix:` → 🐛 Bug 修复
- `refactor:` → 🔧 重构
- `perf:` → ⚡ 性能
- `docs:` / `chore:` / `test:` → 折叠到"其他"

写入 `CHANGELOG.md` 顶部，格式：

```markdown
## [v$VERSION] - YYYY-MM-DD

### ✨ 新功能
- ...

### 🐛 Bug 修复
- ...

<details><summary>其他改动</summary>

- ...
</details>
```

### Step 4 · 打 tag

读 `package.json` 的 version 字段：

```
git tag v$VERSION
```

如果 tag 已存在 → 询问用户是 bump 还是 force。

### Step 5 · 推送

```
git push origin v$VERSION
git push origin HEAD
```

任何 push 失败 → **stop**，让用户检查权限。

### Step 6 · Slack 通知

调用 slack MCP `send_message`：

```yaml
channel: "#release"
message: |
  🚀 Staging 发版 v$VERSION
  分支：$BRANCH
  测试覆盖率：$COVERAGE%
  改动：$COMMIT_COUNT 个 commits
  Changelog：<https://github.com/.../blob/v$VERSION/CHANGELOG.md|查看>
```

Slack 通知失败 **不阻断** —— 记录到 `~/.claude/logs/release-$VERSION.log`，让用户手动转发。

## Common edge cases

- **没装 git MCP** → 退化为本地 `git log`
- **没装 slack MCP** → 跳过 Step 6，提示用户手动通知
- **CI 已经在跑同一个 tag** → 检测到后停止，避免双倍发版
- **Hotfix 分支** → 跳过覆盖率阈值检查（紧急修复优先）
- **依赖更新引发的发版** → 在 changelog 加显眼提示

## 不要做

- 不要发到生产 → 这是 staging 流程，生产由 `release-production` Skill 接管
- 不要自动 bump 版本号 → 版本由人来决定
- 不要静默跳过失败步骤 → 出错必须停下来问

## 失败回滚

如果 Step 4 或 5 之后某步失败，按以下顺序回滚：

1. `git push --delete origin v$VERSION`
2. `git tag -d v$VERSION`
3. 撤销 CHANGELOG.md 改动：`git checkout CHANGELOG.md`
4. Slack 发"⚠️ 发版回滚"通知

回滚操作必须在每一步前征得用户确认（破坏性操作）。
