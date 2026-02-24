# 3.2 Rules Matching (模块化规则匹配)

## 概念解析
如果 `AGENTS.md` 是宪法，那么 `Rules` 就是地方法规。
有时候我们在某些目录下写业务代码时，不希望全局的提示词受到干扰。比如：
- 写前端 Vue 相关页面时，加载前端守则。
- 写后端 Python 时，只加载相关的数据库规范。

现代 AI IDE 比如 Cursor 提出了 `.mdc`（Cursor Rules）的解法。它其实是结合了 `YAML` 中的 `globs` 匹配与 Markdown 文本。
当 IDE 检测到当前你激活的（或者要求它编辑的）文件路径和某个 `mdc` 配置的 `glob` 表达式匹配时，它就会**悄悄地将这个模块规则提取出来追加发送给大模型**。
这样就做到了精准投递上下文，而没有给模型增加额外的无用阅读负担。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:3.2
```

## 配置步骤

### Cursor IDE
1. 在项目根目录创建 `.cursor/rules/` 文件夹
2. 创建 `.mdc` 规则文件，如 `react.mdc`:
```yaml
---
description: React组件开发规则
globs: src/components/**/*.tsx
alwaysApply: false
---
必须使用函数式组件，禁止使用 Class 组件
```
3. 创建组件时，AI 会自动应用匹配的规则

### Claude Code
1. 在项目根目录创建 `.claude/rules/` 文件夹
2. 创建规则文件，如 `typescript.md`:
```markdown
# TypeScript 规则
- 所有函数必须添加类型注解
- 禁止使用 any 类型
```
3. 使用 `claude rules add typescript.md` 激活规则

## 核心要点
* 模块化管理 Prompt。
* 通过文件系统和通配符作为触发器（Trigger），按需注入 AI 的上下文中。
