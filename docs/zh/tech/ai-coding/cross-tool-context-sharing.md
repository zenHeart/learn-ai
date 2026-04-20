# 跨工具 Context 共享策略

本文总结主流 AI Coding 工具（Cursor、Copilot 等）在跨工具场景下的 Context 共享机制，包括 prompts 仓库、Cursor @ 引用、Copilot ./ 引用等策略。

## 问题背景

在 AI Coding 工作流中，开发者经常需要在多个工具间切换，或希望同一个 context 能被多个工具复用。跨工具 Context 共享解决的核心问题：

1. **重复注入**：同一份代码上下文需要在不同工具中重复输入
2. **一致性**：确保不同工具对项目规则的理解一致
3. **效率**：减少手动复制粘贴 context 的成本

## 一、Prompts 仓库（Shared Prompts Repository）

### 核心思想

将常用的 prompts（提示词）、规则定义、项目上下文结构化存储在仓库中，各工具按需引用。

### 典型结构

```
prompts-repo/
├── README.md
├── agents/
│   ├── code-reviewer.md
│   ├── bug-fixer.md
│   └── doc-writer.md
├── rules/
│   ├── coding-style.yaml
│   ├── api-design.md
│   └── testing-policy.md
├── contexts/
│   ├── project-overview.md
│   └── architecture.md
└── scripts/
    └── generate-context.sh
```

### 工作流程

```
Prompts 仓库 → 各工具按需引用 → 统一 context 来源
     ↑
     └── 开发者维护单一来源
```

### 优势与局限

| 优势 | 局限 |
|------|------|
| 单一事实来源 | 需要维护仓库 |
| 团队共享一致 | 同步成本 |
| 版本控制 | 工具原生集成度低 |

## 二、Cursor @ 引用机制

### 工作原理

Cursor 的 `@` 引用允许在对话中动态引用项目内的文件、文件夹、文档或 Git 提交，作为 context 注入到当前对话。

### 引用类型

```
@filename          # 引用单个文件
@folder/           # 引用整个目录
@doc:README        # 引用文档
@git:abc123        # 引用特定 Git 提交
@search:keyword    # 搜索结果引用
```

### 跨对话 Context 持久化

- `@` 引用在对话内持久有效
- 可通过 `.cursor/rules` 将常用引用配置为自动加载
- 支持引用 Git 历史版本，适合理解代码演进

### 局限性

- Context 仅在当前工具（Cursor）内有效
- 无法直接共享给其他 AI 工具
- 引用过多时容易产生 context 膨胀

## 三、Copilot ./ 引用机制

### 工作原理

GitHub Copilot 通过 `./context` 文件夹或显式引用路径来加载额外 context。

### 常用方式

```bash
# 在仓库根目录创建 .github/copilot/
# 添加自定义指令和上下文
```

### 文件组织

```
.github/copilot/
├── instructions.md      # 全局指令
├── context/
│   ├── project.md        # 项目概述
│   ├── architecture.md  # 架构文档
│   └── rules.md          # 开发规则
```

### 与 Cursor 的对比

| 特性 | Cursor @ | Copilot ./ |
|------|---------|------------|
| 引用语法 | @引用符 | ./路径 |
| 文件夹支持 | ✅ | ❌ |
| Git 引用 | ✅ | ❌ |
| 搜索引用 | ✅ | ❌ |
| 自定义规则格式 | YAML/DSL | Markdown |

## 四、跨工具 Context 桥接策略

### 策略一：中间格式转换

```
Prompts 仓库 (Markdown)
    ↓ 转换脚本
.cursor/rules / .github/copilot/instructions
```

### 策略二：统一规则语言

设计一套跨工具的规则 DSL，通过适配器转换为各工具格式：

```
规则定义 (DSL)
    ├── Cursor 适配器 → .cursor/rules
    ├── Copilot 适配器 → .github/copilot/
    └── Claude 适配器 → claude_desktop_config
```

### 策略三：Clipboard + API 集成

通过系统剪贴板或 API 在工具间传递 context：

```
工具 A 提取 context
    ↓ 剪贴板/API
工具 B 注入 context
```

## 五、最佳实践

### 1. 建立 Prompts 仓库作为单一来源

```bash
prompts/
├── base/
│   └── system-prompt.md
├── rules/
│   └── coding-conventions.md
└── templates/
    └── pr-review.md
```

### 2. 工具特定适配层

每个工具保留其格式的适配文件，但内容从统一来源派生：

```
prompts/main/rules.md (源)
    ├──→ .cursor/rules.yaml (Cursor 格式)
    ├──→ .github/copilot/rules.md (Copilot 格式)
    └──→ CLAUDE.md (Claude Code 格式)
```

### 3. CI 自动同步

```yaml
# .github/workflows/sync-context.yml
- name: Sync context to tools
  run: |
    ./scripts/sync-to-cursor.sh
    ./scripts/sync-to-copilot.sh
```

## 核心要点

- 跨工具 Context 共享的核心是建立单一事实来源
- 各工具的原生引用机制适合单工具内使用
- 组合使用仓库存储 + 工具适配器 + CI 同步是最可靠的方案
- 注意不要让 context 过度膨胀，保持精炼和相关性
