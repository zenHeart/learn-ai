# AI 工程化实战手册 (Cookbook)

欢迎来到实战手册。这里收集了一系列用于常见 AI 工程任务的**即拷即用**的代码片段和模式。

## 如何使用
1.  找到你需要的食谱。
2.  将代码复制到你的项目中。
3.  调整导入（我们使用 `ai`、`openai`、`zod` 等标准库）。

## 🧩 UI 模式
- **[聊天 UI 组件](./chat-ui.md)**: 一个可复用、带样式的支持流式传输的聊天界面。
- **[表单自动补全](./form-autocomplete.md)**: 为你的表单添加“魔法填充”按钮。

## 🛡️ 安全与可靠性
- **[API 代理](./api-proxy.md)**: 从后端安全地调用 LLM。
- **[内容审查](./content-moderation.md)**: 过滤输入/输出。
- **[错误处理](./error-handling.md)**: 重试、超时和回退。

## 🚀 性能
- **[本地 Embeddings](./local-embedding.md)**: 在浏览器中进行语义搜索 (Transformers.js)。

## 贡献
有很酷的模式？
1.  Fork 仓库。
2.  在 `docs/cookbook/` 中添加一个 markdown 文件。
3.  提交 PR。