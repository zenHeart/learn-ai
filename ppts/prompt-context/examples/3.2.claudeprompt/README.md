# .claudeprompt 文件格式

## 什么是 .claudeprompt？

.claudeprompt 是 Anthropic 推出的提示词管理文件格式，旨在解决提示词工程中的几个核心问题：

- **版本控制**：像代码一样管理提示词的版本历史
- **团队共享**：统一的提示词格式，便于团队协作
- **可复用性**：模块化设计，支持导入和组合
- **类型安全**：结构化格式，支持验证和检查

## 核心结构

一个 .claudeprompt 文件通常包含以下部分：

```yaml
name: prompt-name           # 提示词名称（唯一标识）
description: 描述           # 简要说明
version: "1.0"              # 版本号
instruction: 核心指令       # 主要任务描述
examples:                   # 示例（可选）
  - input: xxx
    output: xxx
constraints:                # 约束条件（可选）
  - xxx
output_format:              # 输出格式（可选）
  format: json
  schema: xxx
```

## .claudeprompt 的优势

### 1. 版本管理

```yaml
# 可以在文件中保留多个版本
versions:
  - version: "1.0"
    instruction: 初始版本
    date: 2024-01-01
  - version: "1.1"
    instruction: 优化了输出格式
    date: 2024-01-15
```

### 2. 模块化组合

```yaml
# 支持引用其他提示词模块
extends:
  - common-instructions
  - safety-constraints

instruction: 具体任务指令
```

### 3. 结构化验证

相比纯文本提示词，.claudeprompt 的结构化格式便于：
- IDE 插件提供自动补全
- CI 流程验证提示词格式
- 类型检查避免错误

## 实战示例

参考 `sample.claudeprompt` 文件，它展示了一个完整的 .claudeprompt 示例：

- 使用 Vue 组件定义提示词模板
- 包含 instruction、examples、output_format
- 演示如何从 .claudeprompt 中提取各个部分

## 代码演示

运行 `main.js` 查看如何解析 .claudeprompt 文件：

```bash
node main.js
```

脚本会解析示例 .claudeprompt 文件并展示其结构化内容。
