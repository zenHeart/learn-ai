# Claude Code 教程学习

> 学习来源: Colab 教程 + 社区整理

## 概述

Claude Code 是 Anthropic 官方提供的 CLI 编程工具，通过终端与 AI 交互完成代码开发任务。

## 核心功能

### 1. 工作模式

| 模式 | 用途 |
|------|------|
| Chat | 轻量问答 |
| Projects | 团队项目 |
| Cowork | 深度协作 |
| Code | 开发任务 |

### 2. 斜杠命令 (Slash Commands)

快速调用预设功能：
- `/pr` - PR 准备清单
- `/optimize` - 性能分析
- `/help` - 帮助

### 3. 记忆系统 (Memory)

Claude Code 可以记住项目上下文，包括：
- 项目结构和编码约定
- 团队规范
- 自定义规则

### 4. Skills 自定义命令

用户可自定义专属命令，写一次到处用。

### 5. Hooks 自动化

事件驱动的自动化能力，例如：
- 每次提交自动运行安全扫描
- 每次保存自动格式化

### 6. Subagents 子代理

将复杂任务分解给多个子代理并行处理。

### 7. MCP (Model Context Protocol)

扩展 AI 能力的协议，支持连接外部工具和服务。

## 入门路径

### Level 1: 基础层 (15分钟)
- 掌握斜杠命令
- 学会使用 Memory

### Level 2: 自动化层 (2-3小时)
- 自定义 Skills
- 配置 Hooks

### Level 3: 架构层 (3-4小时)
- Subagents 并行处理
- MCP 工具扩展
- Plugins 插件

## 常见工作流

### 理解新代码库
```bash
cd /path/to/project
claude
> give me an overview of this codebase
```

### 修复错误
```bash
> 粘贴错误信息
> 帮我找到问题源头
```

### 代码审查
```bash
> review this PR
```

## 安装要求

- Node.js ≥ 18.0
- 支持系统: macOS, Linux, Windows (WSL)

## 参考资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [claude-howto GitHub 教程](https://github.com/kobayashi-kei/claude-howto)

## 更新日志

- 2026-04-12: 初始化文档
