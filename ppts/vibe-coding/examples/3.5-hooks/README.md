# 3.5 Hooks (生命周期钩子)

## 概念解析
当 AI 聪明到可以在终端自动跑测试、安装依赖、甚至 Git Commit 的时候，我们要怎么控制它不把烂代码推送到线上？

这就需要 **Hooks (生命周期拦截器)**。例如 Claude Code 中的 `.claude/hooks` 文件夹。
- 你可以写一个 `pre-commit` 脚本，规定：在 AI 想要 `git commit` 之前，必须跑通 `npm run lint` 和 `npm run test`。
- 如果测试挂了，脚本返回 `exit 1`。Agent 会捕获这个报错，**不需要人工干预，它会自动进入 Feedback Loop（反思环）自己去修 Bug**，修完再尝试提交，直到验证通过。

这就是将“人的评审”转嫁为“自动化程序的评审”。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:3.5
```

## 核心要点
* 用程序的规则建立安全的边界护栏（Guardrails）。
* 利用大模型从报错中反思并自我修复的能力，实现闭环。
