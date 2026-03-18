# Transformers.js Guide

Run state-of-the-art models from Hugging Face directly in the browser.

## Installation

```bash
npm install @xenova/transformers
```

## The Pipeline API

Similar to the Python library, `pipeline()` is the main entry point.

```javascript
import { pipeline } from '@xenova/transformers';

// 1. Image Classification
const classifier = await pipeline('image-classification');
const result = await classifier('url/to/cat.jpg');

// 2. Translation
const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
const output = await translator('Hello world', { src_lang: 'eng_Latn', tgt_lang: 'fra_Latn' });
```

## Model Selection

Not all models work in the browser. They must be converted to **ONNX format**.
Look for models hosted by **Xenova** on Hugging Face (the maintainer of transformers.js) or search for "onnx" tag.

## Performance Tips

1.  **Quantization**: Use quantized models (q8, q4). They are smaller (40MB vs 400MB) and faster.
2.  **Web Workers**: Blocking the main thread freezes the UI. Always run inference in a Worker.

## Example: Web Worker

```javascript
// worker.js
import { pipeline } from '@xenova/transformers';

let pipe = null;

self.addEventListener('message', async (event) => {
  if (!pipe) pipe = await pipeline('sentiment-analysis');
  const result = await pipe(event.data);
  self.postMessage(result);
});
```
