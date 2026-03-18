# Frontend Machine Learning Libraries

Running ML in the browser is becoming standard. Here are the major players.

| Library | Best For | Size | Complexity |
| :--- | :--- | :--- | :--- |
| **Transformers.js** | NLP, LLMs, Audio | Medium | Low (Easy API) |
| **TensorFlow.js** | Training, Custom Models | Large | High |
| **ONNX Runtime Web** | Production, Optimization | Small | Medium |
| **MediaPipe** | Vision, Pose, Face | Small | Low |

## Decision Matrix

- **Need to run a HuggingFace model?** -> Use **Transformers.js**.
- **Need to train a model in the browser?** -> Use **TensorFlow.js**.
- **Need specific computer vision (Hand tracking)?** -> Use **MediaPipe**.
- **Need maximum speed for a custom model?** -> Use **ONNX Runtime + WebGPU**.

## Performance (WebGPU vs WASM)

Modern libraries use **WebAssembly (WASM)** for CPU execution and **WebGPU** for GPU execution.
WebGPU is 10-100x faster for large matrix multiplications (like LLMs).

## Next Steps

- **[Transformers.js Guide](./transformersjs.md)** (Recommended start)
- **[TensorFlow.js Guide](./tensorflowjs.md)**
- **[ONNX Guide](./onnx-runtime.md)**
