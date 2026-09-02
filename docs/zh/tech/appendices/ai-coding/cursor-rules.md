---
title: Cursor Rules 实践
description: 项目级 AI 行为规范案例：.mdc 格式与四种 Rule Type、规则内容结构、实操场景与渐进完善的最佳实践。
domain: tech
tags: [tech, ai-coding, case, cursor, rules]
navOrder: 95
topicId: ai-coding-cursor-rules
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Cursor Rules 实践

> 学习来源：[新版 Cursor Rules .mdc 格式文件使用经验](https://juejin.cn/post/7484787785887989798) ｜ [Cursor 官方文档](https://docs.cursor.com/features/rules)

## 什么是 Cursor Rules

放在项目根目录的**项目级 AI 行为规范配置文件**，为项目定制 AI 行为（强制代码风格、禁止特定 API 等）。可以理解为一份给 AI 阅读的**项目说明书**：把「衣服要叠好放衣柜」这类要求写成整理指南，AI 每次来都能按指南操作，不用重复交代。

| 版本 | 说明 |
|------|------|
| `.cursorrules` | 旧版单一文件（接近废弃） |
| `.cursor/rules/*.mdc` | 新版 Project Rules，多文件分类管理 |

> 迁移期建议保留旧文件，团队成员未全部升级到 0.46+ 前不删 `.cursorrules`。

通用化的「规则即上下文资产」视角见主线[上下文工程](/zh/tech/03-context/context-engineering)；与 Claude 系的 AGENTS.md、Skills 的对照见 [Agent Skills](/zh/tech/06-agent-systems/skills)。

## Rule Type（四种生效规则）

| 类型 | 生效规则 |
|------|----------|
| **Always** | 始终生效，包括 `cmd + K` 对话 |
| **Auto Attached** | 匹配特定文件时生效（正则匹配路径，如 `*tsx`、`src/config/*`） |
| **Agent Request** | 代理模式下可见，代理决定是否查看完整规则 |
| **Manual** | 对话中手动 `@` 才生效 |

## 规则内容结构

一份优质规则通常包含：

```markdown
# 角色        → 你是谁（Python 开发专家，特长 Flask）
# 目标        → 要干什么（高效 API、易维护、可扩展）
# 开发规范    → 项目的规矩（类型提示、封装的 request 函数）
# 目录结构    → src/components、hooks、utils、api 各归其位
```

## 实操场景

**统一包管理器**（AI 总默认 npm，项目用 pnpm）：「安装依赖用 `pnpm install`，添加包用 `pnpm add`」。

**强制代码风格**：ESLint Standard、函数式组件、TS 泛型优先于 any。

**架构约定**：API 走 `/api` 代理、组件按功能模块划分、状态管理 Zustand 避免 Redux 过度设计。

配置方式：Settings → Rules → Add new rule（自动创建 `.mdc`）；或 `/Generate Cursor Rules` 生成初稿再调整；[Cursor Directory](https://cursor.directory/generate) 可从旧 `.cursorrules` + `package.json` 生成 MDC 初稿（需再调整）。

目录示例：

```
.cursor/rules/
  project-overview.mdc   # Always
  frontend-style.mdc     # Auto Attached: *tsx, *jsx
  backend-rules.mdc      # Auto Attached: *py, *go
  testing-rules.mdc      # Auto Attached: *test.*, *spec.*
  security-rules.mdc     # Always
```

## 最佳实践

1. **渐进完善**：从通用规则起步 → 按团队实际习惯自定义 → 每当发现 AI「忘记」某要求就加入规则。没有一蹴而就的完美规则。
2. **避免规则过多**：规则太多导致上下文膨胀、难以维护。只添加「日常总需要强调，但 AI 因上下文丢失或新会话总忘记」的问题。
3. **规则分层**：User Rules（本机，如「始终用中文回复」）vs Project Rules（入库共享）。
4. **写法纪律**（承接 [Cursor IDE 架构](./cursor-ide-architecture) 的提示设计要点）：不贴身份、少负面约束、名称高辨识度、百科体正文。

## 总结

Cursor Rules = 项目的 AI 说明书：Rule Type 决定生效时机，渐进完善优于一次到位，适度原则防止规则过载，Project Rules 让团队共享统一规范。
