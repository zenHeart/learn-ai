# Browser AI (Client-Side)

Running AI **directly in the browser** (Client-Side Inference) is the ultimate privacy and zero-latency solution. No servers, no API costs.

## The Tool: Transformers.js

**Transformers.js** allows you to run Hugging Face models in JavaScript using ONNX Runtime.

```bash
npm install @xenova/transformers
```

## How it Works

1.  **Download**: The browser downloads the model weights (cached in IndexedDB).
2.  **Initialize**: ONNX Runtime spins up a session.
3.  **Inference**: Input -> Model -> Output.

## Code Example: Sentiment Analysis

```javascript
import { pipeline } from '@xenova/transformers';

async function analyze() {
  // Downloads 'Xenova/distilbert-base-uncased-finetuned-sst-2-english' (~40MB)
  const classifier = await pipeline('sentiment-analysis');
  
  const result = await classifier('This app is amazing!');
  // [{ label: 'POSITIVE', score: 0.99 }]
}
```

## WebGPU Acceleration

By default, it uses WASM (CPU). For faster performance (especially for generative models like Whisper or tiny LLMs), use WebGPU.

```javascript
import { pipeline, env } from '@xenova/transformers';

// Skip local check
env.allowLocalModels = false;
env.useBrowserCache = true;

const generator = await pipeline('text-generation', 'Xenova/llama2-7b-int4', {
  device: 'webgpu', // Use the GPU!
});
```

## Use Cases

1.  **Privacy-First Apps**: Analyze medical/legal text without sending it to a cloud.
2.  **Offline Capability**: AI features that work on airplanes.
3.  **Real-time Audio**: Use **Whisper** in the browser for dictation.
4.  **Image Processing**: Background removal or object detection on user photos.

## Performance & Trade-offs

| Feature | Server-Side (API) | Client-Side (Browser) |
| :--- | :--- | :--- |
| **Model Size** | Massive (GPT-4) | Tiny (DistilBERT, Phi-2) |
| **Quality** | Excellent | Good for specific tasks |
| **Latency** | Network dependent | Zero (after load) |
| **Privacy** | Data leaves device | Data stays on device |
| **Battery** | Low impact | High impact (GPU usage) |

## Next Steps

- Check out **[ONNX Runtime](https://onnxruntime.ai/)** docs.
- See the **[Example Project](../../examples/04-browser-ai/README.md)** (Coming Soon).
