# OpenSpec：规格驱动开发框架

## 技能描述

OpenSpec 是一个面向 AI 编程助手的规格驱动开发框架，核心理念是在写代码之前，先让人和 AI 在"规格"上达成一致。

**解决的核心问题：** AI 编程的不可预测性——当需求只存在于聊天记录中时，AI 会产生模糊的理解和不可预测的输出。

**核心创新：** 用 Delta Specs（增量规格）管理需求变更，类似 Git 的 diff 思维应用到规格管理。

## 核心机制

### 1. 意图锚定（Artifact Graph）

用 proposal.md 固化"为什么做"和"做什么"，后续所有制品都引用这个文件，意图不会在聊天记录中漂移。

制品依赖关系：
- proposal（无依赖，最先创建）
- specs（依赖 proposal）
- design（依赖 proposal，可与 specs 并行）
- tasks（依赖 specs 和 design）

依赖关系是"使能"不是"门控"，灵活但有序。

### 2. 行为契约（RFC 2119 关键字）

每个需求必须用 RFC 2119 关键字明确强制程度：
- MUST/SHALL：绝对要求（100%）
- SHOULD：推荐，有例外（~90%）
- MAY：可选（~50%）

每个需求必须包含至少一个 Given/When/Then 场景，消除"应该"、"尽量"这类模糊词汇。

### 3. Delta Specs（增量规格）

用四种操作描述变更：
- ADDED：新增需求
- MODIFIED：修改现有需求
- REMOVED：删除需求
- RENAMED：重命名需求（OpenSpec 独创，Git 没有原生支持）

归档时按 RENAMED → REMOVED → MODIFIED → ADDED 顺序自动合并到主规格。

### 4. 渐进式验证

验证分级：
- ERROR：阻塞（格式错误，必须修复）
- WARNING：提醒（未完成任务，建议修复）
- INFO：提示（文本过长，可选修复）

平衡严格和实用，不追求和代码约束一样强。

## 文件结构

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

## 工作流程

### 快速路径（推荐，core profile）

```
/opsx:propose add-dark-mode
→ 创建 proposal.md、specs/、design.md、tasks.md

/opsx:apply
→ 实现 tasks.md 中的任务

/opsx:archive
→ 归档变更，Delta Specs 合并到主规格
```

### 完整路径（expanded profile）

```
/opsx:new change-name      → 创建骨架
/opsx:continue             → 逐步创建制品
/opsx:ff                   → 一次性创建所有制品
/opsx:verify               → 验证实现
/opsx:sync                 → 同步规格
/opsx:bulk-archive         → 批量归档
```

### 探索路径

```
/opsx:explore              → 调查问题、比较方案
→ 澄清需求后转入 propose 或 new
```

## 命令参考

### 核心命令（core profile）

| 命令 | 用途 |
|------|------|
| /opsx:propose | 创建变更并生成所有规划制品 |
| /opsx:explore | 探索问题、比较方案 |
| /opsx:apply | 实现任务 |
| /opsx:archive | 归档完成的变更 |

### 扩展命令（expanded profile）

| 命令 | 用途 |
|------|------|
| /opsx:new | 创建变更骨架 |
| /opsx:continue | 逐步创建下一个制品 |
| /opsx:ff | 快速创建所有制品 |
| /opsx:verify | 验证实现是否匹配规格 |
| /opsx:sync | 合并 Delta Specs 到主规格 |
| /opsx:bulk-archive | 批量归档多个变更 |
| /opsx:onboard | 引导式教程 |

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

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 15 minutes pass without activity
- THEN the session is invalidated

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA)

## RENAMED Requirements

- FROM: `### Requirement: User Login`
- TO: `### Requirement: User Authentication`
```

## 使用示例

### 场景：添加暗黑模式

**步骤 1：创建变更**

用户：/opsx:propose add-dark-mode

AI 执行：
1. 创建 openspec/changes/add-dark-mode/proposal.md
2. 创建 openspec/changes/add-dark-mode/specs/ui/spec.md（Delta 格式）
3. 创建 openspec/changes/add-dark-mode/design.md
4. 创建 openspec/changes/add-dark-mode/tasks.md

**步骤 2：实现任务**

用户：/opsx:apply

AI 执行：
1. 读取 tasks.md
2. 逐个实现任务
3. 更新 tasks.md 中的完成状态

**步骤 3：归档**

用户：/opsx:archive

AI 执行：
1. 验证 Delta Specs 格式
2. 合并到 openspec/specs/ui/spec.md
3. 移动到 openspec/changes/archive/

## 适用场景

- AI 编程（Cursor、Claude Code、Copilot 等）
- 需求管理
- 代码重构
- 团队协作
- 项目文档化

## 安装

```bash
# 全局安装
npm install -g @fission-ai/openspec

# 初始化项目
cd your-project
openspec init

# 选择 AI 工具（如 Claude Code、Cursor 等）
# OpenSpec 会生成对应的 skills 和 commands
```

## 工具集成

OpenSpec 支持 25+ AI 编程工具：

| 工具 | 命令格式 |
|------|---------|
| Claude Code | /opsx:propose |
| Cursor | /opsx-propose |
| Windsurf | /opsx-propose |
| GitHub Copilot | /opsx-propose |
| Kimi CLI | /skill:openspec-propose |

## 最佳实践

1. **保持变更聚焦** — 一个逻辑单元一个变更
2. **用 /opsx:explore 探索** — 需求不明确时先调查
3. **归档前验证** — 用 /opsx:verify 检查实现
4. **命名清晰** — add-dark-mode、fix-login-bug、refactor-auth
5. **渐进式使用** — 从小功能开始，逐步扩展

## 参考链接

- GitHub：https://github.com/Fission-AI/OpenSpec
- 文档：https://github.com/Fission-AI/OpenSpec/tree/main/docs
- Discord：https://discord.gg/YctCnvvshC
