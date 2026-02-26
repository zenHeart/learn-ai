# 3.5 Hooks (生命周期钩子)

**一句话核心**：本示例通过「运行脚本 + 在 Claude 中配置 pre-commit 钩子」演示 **Hooks** 如何在 AI 执行关键操作（如 Git 提交）前插入校验，测试不通过则阻断并让 AI 自修，实现护栏闭环。

---

## 1. 概念简述

当 AI 能在终端自动跑测试、安装依赖甚至 Git 提交时，需要**护栏**防止烂代码被推送。**Hooks（生命周期拦截器）** 可在关键操作前插入脚本：例如在 Claude 的 `.claude/hooks` 下写 `pre-commit`，规定提交前必须跑通 `npm run lint` 和 `npm run test`；若失败则 `exit 1`，Agent 会捕获报错并进入反馈环自行修 Bug，修完再尝试提交。Cursor 目前无通用全生命周期 Hook，可用 Rules 限制修改权限或依赖外部 CI 替代。

---

## 2. 前置条件

- 已安装 **Claude Code**（本示例的 Hooks 以 Claude 为主；Cursor 见步骤 B 说明）。
- 若在 Claude 中配置 Hooks，需在项目根或 `examples` 下创建 `.claude/hooks/` 并放置可执行脚本。

---

## 3. 操作步骤

### 步骤 A：运行脚本（可选）

1. 打开终端，进入：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:3.5`
3. **预期结果**：终端输出与 Hooks 或 pre-commit 流程相关的演示说明。

### 步骤 B：在 Cursor 中（可选）

- Cursor **目前不支持**原生全生命周期 Hooks。
- **替代方案**：使用 Rules 限制特定文件的修改权限；或通过外部 CI/CD（如 GitHub Actions）在 push 前执行 lint/test。
- **预期结果**：通过规则或 CI 实现“提交前校验”的类似效果。

### 步骤 C：在 Claude Code 中配置 pre-commit 钩子（可选）

1. 在项目根或 `examples` 下创建目录：`.claude/hooks/`。
2. 创建文件 `pre-commit.sh`，内容示例（可直接复制）：
   ```bash
   #!/bin/bash
   if ! npm run lint; then
     echo "Lint failed. Claude Code operation halted."
     exit 1
   fi
   if ! npm test; then
     echo "Tests failed. Please fix before committing."
     exit 1
   fi
   ```
3. 赋予执行权限：`chmod +x .claude/hooks/pre-commit.sh`。
4. 在 `CLAUDE.md` 或项目说明中注明：提交代码前必须通过 pre-commit 钩子验证。
5. **预期结果**：当 Claude 尝试执行 Git 提交时，会先运行该脚本；若 lint 或 test 失败，提交被阻断，AI 会根据报错尝试修复后再次提交。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `3.5.hooks/index.ts` | 演示脚本入口 |

---

## 5. 核心要点

- 用**程序的规则**建立安全边界护栏（Guardrails）。
- 利用模型从报错中反思并自我修复的能力，实现“校验失败 → AI 修 → 再校验”的闭环。
- Cursor 用户可通过 Rules 或 CI 达到类似效果。

---

## 6. 延伸阅读

- **概念延伸**：Hooks 可与 Skills 的权限控制结合，在“只读审查”与“可写但须通过钩子”之间分层。
- **官方文档**：  
  - Cursor：[Hooks](https://cursor.com/docs/agent/hooks)（当前能力以权限/Rules 为主）  
  - Claude Code：[Hooks](https://code.claude.com/docs/en/hooks)（前后置脚本、pre-commit 等）
- **本课程材料**：可结合 `ppts/vibe-coding/tool-feature.md` 中「Hooks」与各工具 Feature Matrix 做扩展阅读。
