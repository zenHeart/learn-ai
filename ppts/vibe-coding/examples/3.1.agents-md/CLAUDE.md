# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本项目中工作时提供指导。

## 项目概述

这是 "3.1 AGENTS.md" 示例的演示项目，用于展示 AGENTS.md 文件如何作为项目级规则被自动注入到 AI 上下文中。项目包含故意不符合规范的代码 (`countdown.ts`)，需要按 `AGENTS.md` 中定义的规则进行重构。

## 项目规则

本项目有一个 `AGENTS.md` 文件，定义了核心规则：
- 代码必须使用 TypeScript 编写
- 所有日期/时间逻辑必须使用 `dayjs` 库（禁止使用原生 `Date`）
- 所有工具函数必须使用 vitest 编写单元测试

在本项目中工作时，引用 `@AGENTS.md` 以确保符合这些规则。

## 运行示例

该演示应在 Cursor 或 Claude Code 中运行，而非直接执行。测试重构流程：

1. 在 Cursor 或 Claude Code 中打开项目
2. 要求重构 `countdown.ts` 使其符合项目规则
3. AI 应该：使用 dayjs、添加 TypeScript 类型、创建测试文件

或者通过父级 examples 目录运行：
```bash
cd /Users/zenheart/code/github/learn-ai/ppts/vibe-coding/examples
npm run demo:3.1
```

## 项目结构

```
3.1.agents-md/
├── AGENTS.md      # 项目核心规则 (TypeScript + dayjs + vitest)
├── README.md      # 示例教程文档
├── countdown.ts   # 违反 AGENTS.md 规则的示例代码
└── index.ts       # 入口文件（占位消息）
```

本目录是父级 `../` 中更大示例集合的一部分。父目录包含关于规则匹配、命令/技能、MCP 协议和子代理的相关演示。

## 依赖项

父级 `package.json` 管理依赖项。主要包包括：
- `typescript` - 编程语言
- `tsx` - TypeScript 执行器，用于直接运行 .ts 文件
- `dayjs` - 日期库（重构时应添加）
- `vitest` - 测试框架（创建测试时应添加）
