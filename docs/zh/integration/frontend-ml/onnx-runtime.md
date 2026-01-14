# ONNX Runtime Web

**ONNX (开放神经网络交换)** 是机器学习的“PDF”。你可以在 PyTorch 中训练模型，将其保存为 `.onnx`，然后在任何地方运行——包括浏览器。

## 为什么选择 ONNX?

- **互操作性**: 几乎适用于任何框架。
- **性能**: 针对 CPU (WASM) 和 GPU (WebGPU) 进行了高度优化。

## 用法

```bash
npm install onnxruntime-web
```

```javascript
import * as ort from 'onnxruntime-web';

async function run() {
  // 1. 加载会话
  const session = await ort.InferenceSession.create('./my-model.onnx');

  // 2. 准备输入 (Tensor)
  const dataA = Float32Array.from([1, 2, 3, 4]);
  const tensorA = new ort.Tensor('float32', dataA, [2, 2]);

  // 3. 运行
  const results = await session.run({ input_name: tensorA });
  console.log(results.output_name.data);
}
```

## 优化 (量化)

为了让模型在浏览器中快速运行，你通常需要对它们进行 **量化 (Quantization)**（将 32 位浮点数转换为 8 位整数）。这可以将大小减少 4 倍。

工具: `olive` (Microsoft) 或 `onnxruntime` python 工具。

## 何时使用？
- 当你有数据科学团队提供的 **自定义模型** 时。
- 当 `transformers.js` 不支持你的特定架构时。