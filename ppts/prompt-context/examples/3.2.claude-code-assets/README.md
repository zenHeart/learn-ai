# Claude Code 资产选择示例

本示例展示如何把一次性 Prompt 沉淀成 Claude Code 可复用资产，而不是维护未核验的自定义提示词格式。

## 资产目录

```text
3.2.claude-code-assets/
├── CLAUDE.md
├── .claude/
│   ├── commands/review.md
│   ├── rules/api.md
│   ├── settings.json
│   └── skills/fix-issue/SKILL.md
└── main.js
```

## 选择原则

| 资产 | 使用场景 | 不适合 |
|------|----------|--------|
| `CLAUDE.md` | 每个会话都需要的项目命令、风格、工作流 | 大段 API 文档、临时信息 |
| `.claude/rules/` | 只在特定路径或文件类型生效的规则 | 全局强制流程 |
| Skill | 反复执行的复杂 SOP | 一句就能说清的小任务 |
| Hook | 必须每次自动执行的动作 | 需要模型判断的建议 |
| Command | 常用轻量入口 | 复杂、多阶段调查 |

## 运行

```bash
npm run demo:3.2
```

脚本会打印每类资产适合承载的内容，以及一个从“聊天提示词”沉淀到 Claude Code 资产的示例流程。
