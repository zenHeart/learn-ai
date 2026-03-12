# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库中编写代码时提供操作指引。**项目意图、架构目标与规则**请参见 [AGENTS.md](./AGENTS.md)。

---

## 项目概述

本目录是「Vibe Coding」演讲的 **动手示例** 目录，每个示例对应演讲中的一个概念，通过可运行的 demo 和分步说明进行演示。

## 命令

```bash
cd examples
npm install          # 安装依赖（仅需一次）
npm run demo:2.1     # Tokenizer 示例
npm run demo:2.2     # Embedding 示例
npm run demo:2.3     # Attention 示例
npm run demo:2.4     # Tool Use 示例
npm run demo:3.1     # AGENTS.md 示例
npm run demo:3.2     # Rules 匹配示例
npm run demo:3.3     # Commands & Skills 示例
npm run demo:3.4     # MCP 示例
npm run demo:3.5     # Hooks 示例
npm run demo:3.6     # Sub-agents 示例
npm run demo:4.1     # 冷启动示例（意图 → 架构）
npm run demo:4.2     # 功能开发示例（PRD → PR）
npm run demo:4.3     # 热修复示例（Crash → PR）
```

## 架构

### 目录结构

示例按类别组织：

| 类别 | 主题 |
|------|------|
| 2.x | 理论 - Tokenizer、Embedding、Attention、Tool Use |
| 3.x | 功能 - AGENTS.md、Rules、Commands & Skills、MCP、Hooks、Sub-agents |
| 4.x | 实践 - 冷启动、功能开发、热修复 |

每个子目录（`X.Y.topic/`）内各有 README，提供分步操作说明。

### Claude/Cursor 配置

- **`.claude/skills/`** — Claude Code 技能（如 `security-audit.md`）
- **`.claude/hooks/`** — Claude Code 钩子（如 `notify-on-stop.sh`）
- **`.claude/settings.json`** — Claude Code 设置
- **`.cursor/rules/`** — Cursor 规则（`.mdc` 文件，如 `react-components.mdc`）
- **`.cursor/commands/`** — Cursor 斜杠命令（如 `review.md`）
- **`.cursor/skills/`** — Cursor 技能（含 `SKILL.md` 的文件夹）
- **`.cursor/hooks/`** — Cursor 钩子

**注意**：Cursor 规则要求工作区在 `examples/` 目录（或包含 `.cursor/` 的父目录）下打开，而不是在更深的子目录中打开。

### 技术栈

- **语言**：TypeScript（ESNext、严格模式）
- **运行时**：Node.js，使用 tsx 直接执行 `.ts` 文件
- **主要依赖**：`tiktoken`、`minimatch`
