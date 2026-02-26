# 前端机器学习库

在浏览器中运行 ML 正在成为标准。这里是主要玩家。

| 库 | 最适合 | 大小 | 复杂度 |
| :--- | :--- | :--- | :--- |
| **Transformers.js** | NLP, LLMs, 音频 | 中 | 低 (易于使用的 API) |
| **TensorFlow.js** | 训练, 自定义模型 | 大 | 高 |
| **ONNX Runtime Web** | 生产环境, 优化 | 小 | 中 |
| **MediaPipe** | 视觉, 姿态, 人脸 | 小 | 低 |

## 决策矩阵

- **需要运行 HuggingFace 模型？** -> 使用 **Transformers.js**。
- **需要在浏览器中训练模型？** -> 使用 **TensorFlow.js**。
- **需要特定的计算机视觉（手部追踪）？** -> 使用 **MediaPipe**。
- **需要自定义模型的最大速度？** -> 使用 **ONNX Runtime + WebGPU**。

## 性能 (WebGPU vs WASM)

现代库使用 **WebAssembly (WASM)** 进行 CPU 执行，使用 **WebGPU** 进行 GPU 执行。
WebGPU 在大型矩阵乘法（如 LLM）方面快 10-100 倍。

## 下一步

- **[Transformers.js 指南](./transformersjs.md)** (推荐入门)
- **[TensorFlow.js 指南](./tensorflowjs.md)**
- **[ONNX 指南](./onnx-runtime.md)**