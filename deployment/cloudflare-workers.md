# Deploying to Cloudflare Workers

Cloudflare offers an entire AI stack at the edge.
- **Workers**: Serverless code.
- **Workers AI**: Inference (Llama 3, Whisper, Stable Diffusion).
- **Vectorize**: Vector database.
- **AI Gateway**: Analytics and caching.

## Workers AI (Inference)

Run Llama 3 directly on Cloudflare's GPUs.

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

## Setup (Wrangler)

1.  Install Wrangler: `npm install -g wrangler`
2.  Login: `wrangler login`
3.  Init: `wrangler init my-ai-app`
4.  Bind AI in `wrangler.toml`:
    ```toml
    [ai]
    binding = "AI"
    ```

## Storage (R2 & Vectorize)

- **R2**: S3-compatible storage. Great for storing user uploads (PDFs, Images).
- **Vectorize**: Store embeddings for RAG.

```javascript
// Inserting into Vectorize
await env.VECTOR_INDEX.insert([
  { id: '1', values: [0.1, 0.2, ...], metadata: { text: 'hello' } }
]);
```

## Pricing

Workers AI has a generous **Free Tier** (currently ~10k requests/day for some models).
It is often significantly cheaper than OpenAI for small/medium models.
