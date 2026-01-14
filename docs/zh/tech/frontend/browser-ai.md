# 浏览器 AI (客户端)

在**浏览器中直接**运行 AI (客户端推理) 是终极的隐私和零延迟解决方案。无需服务器，无 API 成本。

## 工具：Transformers.js

**Transformers.js** 允许你使用 ONNX Runtime 在 JavaScript 中运行 Hugging Face 模型。

```bash
npm install @xenova/transformers
```

## 工作原理

1.  **下载**: 浏览器下载模型权重（缓存在 IndexedDB 中）。
2.  **初始化**: ONNX Runtime 启动会话。
3.  **推理**: 输入 -> 模型 -> 输出。

## 代码示例：情感分析

```javascript
import { pipeline } from '@xenova/transformers';

async function analyze() {
  // 下载 'Xenova/distilbert-base-uncased-finetuned-sst-2-english' (~40MB)
  const classifier = await pipeline('sentiment-analysis');
  
  const result = await classifier('This app is amazing!');
  // [{ label: 'POSITIVE', score: 0.99 }]
}
```

## WebGPU 加速

默认情况下，它使用 WASM (CPU)。为了获得更快的性能（特别是对于生成模型如 Whisper 或微型 LLM），请使用 WebGPU。

```javascript
import { pipeline, env } from '@xenova/transformers';

// 跳过本地检查
env.allowLocalModels = false;
env.useBrowserCache = true;

const generator = await pipeline('text-generation', 'Xenova/llama2-7b-int4', {
  device: 'webgpu', // 使用 GPU!
});
```

## 用例

1.  **隐私优先的应用**: 分析医疗/法律文本而不将其发送到云端。
2.  **离线能力**: 在飞机上也能工作的 AI 功能。
3.  **实时音频**: 在浏览器中使用 **Whisper** 进行听写。
4.  **图像处理**: 用户照片的背景移除或对象检测。

## 性能与权衡

| 特性 | 服务端 (API) | 客户端 (浏览器) |
| :--- | :--- | :--- |
| **模型大小** | 巨大 (GPT-4) | 微型 (DistilBERT, Phi-2) |
| **质量** | 优秀 | 特定任务良好 |
| **延迟** | 依赖网络 | 零 (加载后) |
| **隐私** | 数据离开设备 | 数据留在设备上 |
| **电池** | 低影响 | 高影响 (GPU 使用) |

## 下一步

- 查看 **[ONNX Runtime](https://onnxruntime.ai/)** 文档。
- 查看 **[示例项目](../../examples/04-browser-ai/README.md)** (即将推出)。