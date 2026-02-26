# Hugging Face 集成

Hugging Face 是 "AI 界的 GitHub"，托管着超过 50 万个开源模型。你可以通过其 **Serverless Inference API** 运行这些模型，或者在浏览器中本地运行。

## Serverless Inference API

使用开源模型（如 Llama 3, Mistral, Bert）而不管理服务器的最简单方法。

### 设置

```bash
npm install @huggingface/inference
```

从 [Hugging Face 设置](https://huggingface.co/settings/tokens) 获取 token。

### 文本生成 (Llama 3)

```typescript
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN);

async function main() {
  const stream = hf.textGenerationStream({
    model: 'meta-llama/Meta-Llama-3-8B-Instruct',
    inputs: 'Explain why the sky is blue.',
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
    },
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.token.text);
  }
}
```

### Embeddings (特征提取)

生成用于语义搜索的向量嵌入。

```typescript
const output = await hf.featureExtraction({
  model: 'sentence-transformers/all-MiniLM-L6-v2',
  inputs: 'That is a happy person',
});
// output 是一个数字的 Float32Array
```

## Free vs. Pro

- **免费层**: 有速率限制，适合测试和开发。模型可能是“冷”的（启动慢）。
- **Pro 账户 ($9/月)**: 更高的速率限制，访问受限模型。
- **推理端点 (Inference Endpoints)**: 专用 GPU 实例（按小时付费），用于生产流量。

## 使用 Transformers.js 进行本地 AI

你可以在**用户浏览器中直接**运行模型，无需服务器成本。

**查看详细指南**: [前端 ML (Transformers.js)](../frontend-ml/transformersjs.md)

### 基础浏览器示例

```javascript
import { pipeline } from '@xenova/transformers';

// 下载模型到浏览器缓存（仅一次）
const classifier = await pipeline('sentiment-analysis');

const result = await classifier('I love using open source tools!');
// [{ label: 'POSITIVE', score: 0.99 }]
```

## 何时使用 Hugging Face？

1.  **成本**: 许多模型可以免费测试。
2.  **隐私**: 使用推理端点进行私有部署或在本地运行。
3.  **专业任务**: 寻找针对特定领域（生物学、法律、代码）的模型，通用 LLM 可能在这些领域表现不佳。

## 下一步

- 了解 [**流式传输**](./streaming.md) 模式。
- 探索 [**前端 ML**](../frontend-ml/index.md) 以进行基于浏览器的 AI。