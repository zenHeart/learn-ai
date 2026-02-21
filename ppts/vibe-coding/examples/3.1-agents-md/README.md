# 3.1 AGENTS.md (项目上下文注入)

## 概念解析
在大型项目中，如何保证团队成员（尤其是新人和 AI）遵守核心架构规约？

传统的做法是在文档中心写一堆开发规范，指望新人去背。在 AI 辅助编程时代，各大工具（如 Cursor、Claude Code）原生支持读取根目录的 `AGENTS.md`、`.cursorrules` 或 `CLAUDE.md`。

只要该文件存在，不管你当前要求 AI 帮你写什么功能，AI 的底层代理机制都会**静默地将这些项目级规则作为 System Prompt 的一部分优先发给大模型**。它相当于给 AI 置入了一个深层的潜意识。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:3.1
```

## 核心要点
* **Context Engineering（上下文工程）大于纯 Prompt 技巧。**
* 不要指望 AI 每一次都猜对你的架构和库选型，把基调写在文件里，让它成为工作流的第一关。
