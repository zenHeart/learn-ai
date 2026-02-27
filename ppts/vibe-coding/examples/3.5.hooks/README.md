# 3.5 Hooks (生命周期钩子)

**一句话核心**：本示例通过 **Cursor** 与 **Claude Code** 的 Hooks 配置，在 Agent 任务结束时弹出 macOS 系统通知（带项目名、节流防重复），并可选配置 pre-commit 等护栏脚本。

---

## 1. 概念简述

当 AI 能在终端自动跑测试、安装依赖甚至 Git 提交时，需要**护栏**防止烂代码被推送。**Hooks（生命周期拦截器）** 可在关键时机插入脚本：例如在 Cursor 的 `.cursor/hooks.json` 里配置 `stop`，在每次 Agent 任务结束时弹 macOS 通知；在 Claude Code 的 `.claude/settings.json` 里配置 Stop hook，实现同样效果。本仓库已配置两套「任务结束 → macOS 通知」的示例（带项目名与 15 秒节流）；Claude 还可配置 pre-commit 等脚本，在提交前强制跑 lint/test，未通过则阻断并由 AI 自修。

---

## 2. 前置条件

- **Cursor** 或 **Claude Code** 任选其一即可体验对应 Hooks。
- 项目级 Hooks 从**工作区根目录**加载：请以本仓库根（`examples`）或上级 `learn-ai` 为工作区打开。
- 可选：安装 `jq`，便于脚本解析 payload 并显示项目名、节流防重复。

---

## 3. 操作步骤

### 步骤 A：Cursor Stop Hook（任务结束弹通知）

1. **配置位置**：`.cursor/hooks.json`（项目根或工作区根）。
2. **本仓库已配置**：
   - `stop` 事件 → 执行 `.cursor/hooks/notify-on-stop.sh`。
   - 脚本从 Cursor 传入的 JSON 读取 `workspace_roots`、`status`，标题带项目名（如「Cursor Agent — examples」），15 秒内同工作区只弹一条。
3. **如何验证**：在 Cursor 中用 Agent 执行一个简单任务，等本轮对话结束，应收到一条 macOS 通知。
4. **手动测试**：`echo '{"status":"completed","workspace_roots":["/path/to/examples"]}' | .cursor/hooks/notify-on-stop.sh`

### 步骤 B：Claude Code Stop Hook（任务结束弹通知）

1. **配置位置**：`.claude/settings.json` 中的 `hooks.Stop`，脚本路径为 `$CLAUDE_PROJECT_DIR/.claude/hooks/notify-on-stop.sh`。
2. **本仓库已配置**：
   - Stop hook → `.claude/hooks/notify-on-stop.sh`。
   - 脚本解析 `task_subject`、`cwd`，标题带项目名（如「Claude Code — examples」），15 秒节流。
3. **如何验证**：在 Claude Code 中完成一个任务，应收到一条 macOS 通知。
4. **关闭此功能**：删除或注释 `settings.json` 中的 hooks 配置，或删除 `.claude/hooks/notify-on-stop.sh`。

### 步骤 C：Claude Code pre-commit 钩子（可选）

1. 在 `.claude/hooks/` 下新增 `pre-commit.sh`，内容示例：
   ```bash
   #!/bin/bash
   if ! npm run lint; then echo "Lint failed."; exit 1; fi
   if ! npm test; then echo "Tests failed."; exit 1; fi
   ```
2. 执行 `chmod +x .claude/hooks/pre-commit.sh`。
3. 在项目说明中注明：提交前须通过 pre-commit；Claude 会在提交前执行该脚本，失败则阻断并可根据报错自修。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `.cursor/hooks.json` | Cursor stop hook 配置（任务结束时执行脚本） |
| `.cursor/hooks/notify-on-stop.sh` | Cursor stop 脚本：解析 workspace_roots/status，带项目名 + 15s 节流，调用 osascript 弹 macOS 通知 |
| `.claude/settings.json` | Claude Code hooks 配置（Stop → notify-on-stop.sh） |
| `.claude/hooks/notify-on-stop.sh` | Claude Code Stop 脚本：解析 task_subject/cwd，带项目名 + 15s 节流，弹 macOS 通知 |
| `.claude/hooks/pre-commit.sh` | （可选）Claude pre-commit 示例，提交前跑 lint/test |

---

## 5. 核心要点

- 用 **Hooks** 在关键时机插入脚本：Cursor 的 `stop`、Claude 的 Stop 均可用于「任务结束 → 通知」。
- 通知中带**项目根目录名**便于区分多项目；**节流**（如 15 秒内同工作区一条）可避免重复弹窗。
- pre-commit 等护栏可与 AI 自修能力结合，形成「校验失败 → AI 修 → 再校验」的闭环。

---

## 6. 延伸阅读

- **概念延伸**：Hooks 可与 Skills/Rules 的权限控制结合，在「只读审查」与「可写但须通过钩子」之间分层。
- **官方文档**：
  - [Cursor Hooks](https://cursor.com/docs/agent/hooks)（stop、beforeShellExecution、afterFileEdit 等）
  - [Claude Code Hooks](https://code.claude.com/docs/en/hooks)（Stop、pre-commit 等）
