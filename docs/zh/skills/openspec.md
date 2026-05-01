---
name: openspec
description: 规格驱动开发框架。在写代码之前，让人和 AI 在"规格"上达成一致，解决 AI 编程的不可预测性。当需要管理需求变更、定义行为契约、或进行增量式规格管理时使用。触发场景：「定义需求规格」「管理需求变更」「用规格驱动开发」「Delta Spec」。
---

# OpenSpec：规格驱动开发框架

## 目标

用规格（Spec）驱动 AI 编程，在写代码之前先让人和 AI 对"做什么"达成一致，消除聊天记录中的需求漂移。

## 核心机制

| 机制 | 说明 | 关键点 |
|------|------|--------|
| 🎯 意图锚定（Artifact Graph） | 用 proposal.md 固化"为什么做"和"做什么" | 所有后续制品都引用此文件，意图不漂移 |
| 📜 行为契约（RFC 2119） | 每个需求用 RFC 2119 关键字明确强制程度 | MUST(100%) / SHOULD(~90%) / MAY(~50%) |
| 🔄 Delta Specs（增量规格） | 用四种操作描述变更：ADDED / MODIFIED / REMOVED / RENAMED | 归档时按固定顺序自动合并到主规格 |
| ✅ 渐进式验证 | 分级验证：ERROR(阻塞) / WARNING(提醒) / INFO(提示) | 平衡严格和实用 |

### 制品依赖关系

```
proposal（无依赖，最先创建）
    ↓
specs（依赖 proposal）  ←→  design（依赖 proposal，可并行）
    ↓
tasks（依赖 specs 和 design）
```

> 依赖是"使能"不是"门控"，灵活但有序。

## 工作流程

### 快速路径（推荐，core profile）

#### Step 1: 创建变更

```bash
/opsx:propose add-dark-mode
```

AI 执行：
1. 创建 `openspec/changes/add-dark-mode/proposal.md`（为什么做、做什么）
2. 创建 `openspec/changes/add-dark-mode/specs/ui/spec.md`（Delta 格式增量规格）
3. 创建 `openspec/changes/add-dark-mode/design.md`（怎么做，技术方案）
4. 创建 `openspec/changes/add-dark-mode/tasks.md`（实现清单）

#### Step 2: 实现任务

```bash
/opsx:apply
```

AI 执行：
1. 读取 `tasks.md`
2. 逐个实现任务
3. 更新 `tasks.md` 中的完成状态

#### Step 3: 归档

```bash
/opsx:archive
```

AI 执行：
1. 验证 Delta Specs 格式
2. 按 RENAMED → REMOVED → MODIFIED → ADDED 顺序合并到主规格
3. 移动到 `openspec/changes/archive/`

### 完整路径（expanded profile）

| 命令 | 用途 |
|------|------|
| `/opsx:new change-name` | 创建变更骨架 |
| `/opsx:continue` | 逐步创建下一个制品 |
| `/opsx:ff` | 一次性快速创建所有制品 |
| `/opsx:verify` | 验证实现是否匹配规格 |
| `/opsx:sync` | 合并 Delta Specs 到主规格 |
| `/opsx:bulk-archive` | 批量归档多个变更 |
| `/opsx:onboard` | 引导式教程 |

### 探索路径

| 命令 | 用途 |
|------|------|
| `/opsx:explore` | 调查问题、比较方案，澄清需求后转入 propose 或 new |

## 命令速查

### Core Profile（核心）

| 命令 | 用途 | 产出 |
|------|------|------|
| `/opsx:propose` | 创建变更并生成所有规划制品 | proposal + specs + design + tasks |
| `/opsx:explore` | 探索问题、比较方案 | 调研报告 |
| `/opsx:apply` | 实现任务 | 代码变更 |
| `/opsx:archive` | 归档完成的变更 | 合并到主规格 + 归档 |

### Expanded Profile（扩展）

| 命令 | 用途 |
|------|------|
| `/opsx:new` | 创建变更骨架 |
| `/opsx:continue` | 逐步创建制品 |
| `/opsx:ff` | 快速创建所有制品 |
| `/opsx:verify` | 验证实现 |
| `/opsx:sync` | 同步规格 |
| `/opsx:bulk-archive` | 批量归档 |

## 目录规范

```
openspec/
├── specs/              # 系统当前行为的"事实来源"
│   ├── auth/
│   │   └── spec.md
│   └── ui/
│       └── spec.md
│
├── changes/            # 提出的修改
│   ├── add-dark-mode/
│   │   ├── proposal.md     # 为什么做、做什么
│   │   ├── specs/          # 增量规格（Delta Specs）
│   │   │   └── ui/
│   │   │       └── spec.md
│   │   ├── design.md       # 怎么做（技术方案）
│   │   └── tasks.md        # 实现清单
│   └── archive/            # 已归档的变更
│       └── 2025-01-24-add-dark-mode/
│
├── schemas/            # 工作流定义
└── config.yaml         # 项目配置（可选）
```

| 目录 | 用途 | 文件命名 |
|------|------|---------|
| `specs/` | 系统当前行为的事实来源 | 按功能域分目录，文件名 `spec.md` |
| `changes/` | 提出的修改 | 目录名用 kebab-case（如 `add-dark-mode`） |
| `changes/archive/` | 已归档的变更 | 格式：`YYYY-MM-DD-change-name` |
| `schemas/` | 工作流定义 | 固定文件名 |

## Delta Spec 格式

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST support TOTP-based two-factor authentication.

#### Scenario: 2FA enrollment
- GIVEN a user without 2FA enabled
- WHEN the user enables 2FA in settings
- THEN a QR code is displayed for authenticator app setup

#### Scenario: 2FA login
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented
- AND login completes only after valid OTP

## MODIFIED Requirements

### Requirement: Session Expiration
The system MUST expire sessions after 15 minutes of inactivity.
(Previously: 30 minutes)

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA)

## RENAMED Requirements

- FROM: `### Requirement: User Login`
- TO: `### Requirement: User Authentication`
```

### 格式规则

| 操作 | 说明 |
|------|------|
| `ADDED` | 新增需求 |
| `MODIFIED` | 修改现有需求（需注明之前的值） |
| `REMOVED` | 删除需求（需注明原因） |
| `RENAMED` | 重命名需求（OpenSpec 独创，Git 无原生支持） |

归档合并顺序：`RENAMED → REMOVED → MODIFIED → ADDED`

## 适用场景

| 场景 | 适用度 | 说明 |
|------|--------|------|
| AI 编程（Cursor、Claude Code、Copilot） | ⭐⭐⭐ | 核心设计目标 |
| 需求管理 | ⭐⭐⭐ | Delta Specs 适合迭代 |
| 代码重构 | ⭐⭐ | 需要明确变更边界 |
| 团队协作 | ⭐⭐ | 规格作为沟通媒介 |
| 项目文档化 | ⭐ | 可以但非最佳用途 |

## 安装与集成

### 安装

```bash
npm install -g @fission-ai/openspec

cd your-project
openspec init
# 选择 AI 工具（Claude Code、Cursor 等）
# OpenSpec 会生成对应的 skills 和 commands
```

### 工具集成

| 工具 | 命令格式 |
|------|---------|
| Claude Code | `/opsx:propose` |
| Cursor | `/opsx-propose` |
| Windsurf | `/opsx-propose` |
| GitHub Copilot | `/opsx-propose` |
| Kimi CLI | `/skill:openspec-propose` |

## 最佳实践

1. **保持变更聚焦** — 一个逻辑单元一个变更
2. **用 `/opsx:explore` 探索** — 需求不明确时先调查
3. **归档前验证** — 用 `/opsx:verify` 检查实现
4. **命名清晰** — `add-dark-mode`、`fix-login-bug`、`refactor-auth`
5. **渐进式使用** — 从小功能开始，逐步扩展

## 参考链接

- GitHub：https://github.com/Fission-AI/OpenSpec
- 文档：https://github.com/Fission-AI/OpenSpec/tree/main/docs
- Discord：https://discord.gg/YctCnvvshC
