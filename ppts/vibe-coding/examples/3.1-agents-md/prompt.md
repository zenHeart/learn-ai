# 3.1 演示指南：AGENTS.md 隐式上下文

## 操作步骤

1. 在 Cursor 中打开 `examples/3.1-agents-md/index.ts` 文件。
2. 将光标放在函数内，按下 `Cmd+K`。
3. 输入以下 Prompt：
   > `实现倒计时功能`
4. 观察生成的代码。你并未在 Prompt 中提及任何库，但生成的代码会**强制引入并使用 `dayjs`**，而不是原生的 `Date` 对象。

## 为什么会这样？

因为 Cursor 原生支持读取目录下的 `AGENTS.md` 文件。系统会自动将其内容作为隐藏的 System Prompt 下发给大模型，从而实现无需额外指令的架构级强管控。
