# AGENTS.md

## 项目概述

prompt-context examples 是配合《Prompt + Context + Harness》演讲的配套代码示例仓库。

## 目录结构

```
examples/
├── AGENTS.md          # 本文件，项目意图与规则
├── CLAUDE.md          # Claude Code 命令清单
├── README.md          # 示例使用指南
├── 2.1.zero-vs-few-shot/       # Zero-Shot vs Few-Shot
├── 2.2.cot-extended-thinking/  # CoT + Extended Thinking
├── 2.3.context-window/          # Token 计算与窗口占用
├── 2.4.lost-in-the-middle/     # Lost in the Middle 复现
├── 3.1.icio-framework/         # ICIO 框架最佳实践
├── 3.2.claudeprompt/            # .claudeprompt 完整示例
├── 3.3.tool-calling/           # Tool Calling demo
├── 4.1.vue3-component/          # Vue3 组件生成
└── 4.2.bug-hunting-nn-client/  # nn-client-all Bug 调试
```

## 使用规则

1. 所有示例必须可独立运行
2. 每个示例包含 `README.md` 说明背景
3. 代码注释必须包含中文解释关键决策
4. 示例路径必须与演讲章节编号对应

## 规范

- TypeScript strict mode
- 所有工具函数必须类型标注
- 测试用例覆盖核心逻辑路径
