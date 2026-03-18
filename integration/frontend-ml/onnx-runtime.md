# ONNX Runtime Web

**ONNX (Open Neural Network Exchange)** is the "PDF" of machine learning. You can train a model in PyTorch, save it as `.onnx`, and run it anywhere—including the browser.

## Why ONNX?

- **Interoperability**: Works with almost any framework.
- **Performance**: Highly optimized for CPU (WASM) and GPU (WebGPU).

## Usage

```bash
npm install onnxruntime-web
```

```javascript
import * as ort from 'onnxruntime-web';

async function run() {
  // 1. Load Session
  const session = await ort.InferenceSession.create('./my-model.onnx');

  // 2. Prepare Input (Tensor)
  const dataA = Float32Array.from([1, 2, 3, 4]);
  const tensorA = new ort.Tensor('float32', dataA, [2, 2]);

  // 3. Run
  const results = await session.run({ input_name: tensorA });
  console.log(results.output_name.data);
}
```

## Optimization (Quantization)

To make models run fast in the browser, you often need to **Quantize** them (convert 32-bit floats to 8-bit integers). This reduces size by 4x.

Tool: `olive` (Microsoft) or `onnxruntime` python tools.

## When to use?
- When you have a **custom model** from a data science team.
- When `transformers.js` doesn't support your specific architecture.
