# 成本优化

AI 是昂贵的。一个 GPT-4 请求可能花费 0.03 美元。如果你有 10,000 个用户，那就是每天 300 美元。

## 策略

### 1. 模型路由 (80/20 法则)
80% 的用户查询都很简单 ("嗨", "谢谢", "总结这个短文本")。
**不要对所有事情都使用 GPT-4。**

```typescript
const isComplex = await classifier.classify(prompt); // 便宜的 BERT 模型
const model = isComplex ? 'gpt-4o' : 'gpt-4o-mini';
```

**节省**: 便宜 20 倍。

### 2. 语义缓存
如果用户 A 问 "谁是总统？"，用户 B 问 "现在的总统是谁？"，他们应该得到相同的缓存答案。
使用 **Redis** 或专门的缓存 (GPTCache) 存储 `(embedding(prompt), response)`。

**节省**: 100% (免费)。

### 3. 提示词压缩
更短的提示词 = 更低的成本。
- 删除礼貌用语 ("Please", "Thank you")。
- 使用专门的语法代替冗长的英语。

### 4. 自托管 (针对高用量)
如果你每月花费 > $5k，考虑在你自己的 GPU 服务器 (AWS EC2 / RunPod) 上托管 Llama 3。

## 预算

**公式**:
`成本 = (输入 Tokens * 价格_In) + (输出 Tokens * 价格_Out)`

**经验法则**:
- 1,000 tokens ≈ 750 个单词。
- 输出通常比输入贵 3 倍。
- RAG 应用有巨大的输入（上下文）和小的输出。

## 警报

在 OpenAI 中设置一个 **硬限制 (Hard Limit)**。如果你不这样做，代码中的 `while(true)` 循环可能会在一夜之间花费你 10,000 美元。