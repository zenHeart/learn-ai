# Example 04: Browser AI (Transformers.js)

Run Hugging Face models directly in the browser using WebAssembly. No backend required.

## Features

- 🧠 Client-side Inference
- 🚀 WebWorker support
- 📉 Quantized models (fast loading)
- 🔒 Privacy-first (data stays on device)

## Setup

1.  **Run**:
    ```bash
    npm install
    npm run dev
    ```

## Models Used

- `Xenova/distilbert-base-uncased-finetuned-sst-2-english` (Sentiment Analysis)
- `Xenova/all-MiniLM-L6-v2` (Feature Extraction)

## Code Highlights

### Web Worker (`src/worker.js`)
We run the heavy AI model in a separate thread to keep the UI smooth.

```javascript
import { pipeline } from '@xenova/transformers';

let classifier;

self.addEventListener('message', async (event) => {
  if (!classifier) {
    classifier = await pipeline('sentiment-analysis');
  }
  const output = await classifier(event.data.text);
  self.postMessage(output);
});
```
