# Cursor

## 核心概念

### Symbol (符号)

使用符号来添加上下文，并让 Cursor 执行特定操作。

| 符号 | 功能 | 演示 |
| --- | --- | --- |
| **@code** | 代码片段 |  |
| **@file** | 将文件包含到上下文中 |  |
| **@Folders** | 将文件夹包含到长上下文中 | 当你希望上下文只指向特定子目录时很有用 |
| @doc | 帮助 Cursor 理解额外知识 (文档) |  |
| @git | 一些 Git 工具 |  |
| @codebase | 整个代码库上下文 |  |
| @web | 运行网络搜索 |  |
| @chat | 聊天记录作为上下文 |  |
| @link | 总结链接内容 |  |

### 配置

- ***.cursorignore***: 让 Cursor 忽略某些文件，类似于 .gitignore

## 快捷键

| 功能块 | 快捷键 | 功能 | 备注 |
| --- | --- | --- | --- |
| 配置 | **⌘⇧J** | 打开 Cursor 设置 |  |
| 交互 | **⌘L** | 在 Cursor 中触发 AI 聊天 |  |
|  | **⌘⇧K** | 触发内联聊天 (Inline Chat) |  |
|  | **⌘⌥L** | 打开聊天后，使用此快捷键选择历史聊天 |  |

## 技巧

### Cursor Rule (规则)

你可以使用 https://cursorrules.agnt.one/chat 创建规则提示词，详情参见：
https://docs.cursor.com/context/rules-for-ai#project-rules-recommended

- https://cursor.directory/ 用于创建 cursor 规则

1. 使用 Claude/o1 创建 [instruction.md](http://instruction.md) 包含项目关键信息，参考 https://x.com/FinanceYF5/status/1853790347434013065
    1. 核心功能
    2. 目标和规则
    3. 技术栈和使用的包
    4. 项目大纲
    5. 数据库设计
    6. 登录组件
    7. 登录逻辑
2. Cursor 规则生成器 https://cursorrules.agnt.one/chat

## 有用的文档

https://cursorpractice.com/en

## 工具

- 使用 https://github.com/GLips/Figma-Context-MCP 将 Figma 转换为代码

## 实践

1. 规则依赖于顺序，一些规则架构参考 https://forum.cursor.com/t/my-best-practices-for-mdc-rules-and-troubleshooting/50526/12
