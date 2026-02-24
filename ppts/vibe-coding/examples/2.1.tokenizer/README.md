# 2.1 Tokenizer (切词器) 原理

## 概念解析
在 NLP 和大预言模型中，AI 并不直接“认识”自然语言中的字母和汉字。相反，它们会将输入的句子先通过一种叫 **Tokenizer（切词库）** 的机制，拆分成一段一段的词根片段（Token），然后再将 Token 转换为内部对应的数字 ID（Token ID）。

不同语言和不同词汇导致产生的 Token 数量天差地别。比如 `Hello world!` 只需要 3 个 Token，而包含相同意思的中文则可能需要更多 Token，导致处理较费资源。这也是为什么大模型的 API 费用往往以 **1M tokens** 计价，以及模型的上下文窗口（Context Window）指的是它最多能承载多少个 Token。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:2.1
```

## 配置步骤

### Cursor IDE
1. 打开 Cursor Settings (`Cmd+,` 或 `Ctrl+,`)
2. 查看 Settings > Features > Chat
3. 了解 Token 计算方式

### Claude Code
1. 运行 `claude`
2. 输入 `/tokens` 查看当前对话 token 使用情况

## 核心要点
* 模型计算成本以 Token 颗粒度为准。
* 不同的模型使用不同版本的 Tokenizer（比如 GPT4 采用了 `cl100k_base`）。
