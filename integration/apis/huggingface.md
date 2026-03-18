# Hugging Face Integration

Hugging Face is the "GitHub of AI," hosting over 500,000 open-source models. You can run these models via their **Serverless Inference API** or locally in the browser.

## Serverless Inference API

The easiest way to use open models (like Llama 3, Mistral, Bert) without managing servers.

### Setup

```bash
npm install @huggingface/inference
```

Get a token from [Hugging Face Settings](https://huggingface.co/settings/tokens).

### Text Generation (Llama 3)

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

### Embeddings (Feature Extraction)

Generate vector embeddings for semantic search.

```typescript
const output = await hf.featureExtraction({
  model: 'sentence-transformers/all-MiniLM-L6-v2',
  inputs: 'That is a happy person',
});
// output is a Float32Array of numbers
```

## Free vs. Pro

- **Free Tier**: Rate limited, suitable for testing and development. Models may be "cold" (slow start).
- **Pro Account ($9/mo)**: Higher rate limits, access to gated models.
- **Inference Endpoints**: Dedicated GPU instances (pay per hour) for production traffic.

## Local AI with Transformers.js

You can run models **directly in the user's browser** with no server costs.

**See detailed guide**: [Frontend ML (Transformers.js)](../frontend-ml/transformersjs.md)

### Basic Browser Example

```javascript
import { pipeline } from '@xenova/transformers';

// Downloads the model to the browser cache (only once)
const classifier = await pipeline('sentiment-analysis');

const result = await classifier('I love using open source tools!');
// [{ label: 'POSITIVE', score: 0.99 }]
```

## When to use Hugging Face?

1.  **Cost**: Many models are free to test.
2.  **Privacy**: Use Inference Endpoints for private deployments or run locally.
3.  **Specialized Tasks**: Find models for specific niches (biology, legal, code) that general LLMs might struggle with.

## Next Steps

- Learn about [**Streaming**](./streaming.md) patterns.
- Explore [**Frontend ML**](../frontend-ml/index.md) for browser-based AI.
