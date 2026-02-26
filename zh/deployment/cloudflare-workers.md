# 部署到 Cloudflare Workers

Cloudflare 在边缘提供了完整的 AI 栈。
- **Workers**: Serverless 代码。
- **Workers AI**: 推理 (Llama 3, Whisper, Stable Diffusion)。
- **Vectorize**: 向量数据库。
- **AI Gateway**: 分析和缓存。

## Workers AI (推理)

直接在 Cloudflare 的 GPU 上运行 Llama 3。

```javascript
// worker.js
import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);

    const response = await ai.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'user', content: 'Tell me a joke about clouds' }
      ]
    });

    return new Response(JSON.stringify(response));
  }
};
```

## 设置 (Wrangler)

1.  安装 Wrangler: `npm install -g wrangler`
2.  登录: `wrangler login`
3.  初始化: `wrangler init my-ai-app`
4.  在 `wrangler.toml` 中绑定 AI:
    ```toml
    [ai]
    binding = "AI"
    ```

## 存储 (R2 & Vectorize)

- **R2**: S3 兼容存储。非常适合存储用户上传的文件 (PDF, 图像)。
- **Vectorize**: 存储用于 RAG 的 Embeddings。

```javascript
// 插入到 Vectorize
await env.VECTOR_INDEX.insert([
  { id: '1', values: [0.1, 0.2, ...], metadata: { text: 'hello' } }
]);
```

## 定价

Workers AI 有一个慷慨的 **免费层** (目前某些模型约 10k 请求/天)。
对于小型/中型模型，它通常比 OpenAI 便宜得多。