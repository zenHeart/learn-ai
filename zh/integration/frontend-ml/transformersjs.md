# Transformers.js 指南

直接在浏览器中运行来自 Hugging Face 的最先进模型。

## 安装

```bash
npm install @xenova/transformers
```

## Pipeline API

与 Python 库类似，`pipeline()` 是主要入口点。

```javascript
import { pipeline } from '@xenova/transformers';

// 1. 图像分类
const classifier = await pipeline('image-classification');
const result = await classifier('url/to/cat.jpg');

// 2. 翻译
const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
const output = await translator('Hello world', { src_lang: 'eng_Latn', tgt_lang: 'fra_Latn' });
```

## 模型选择

并非所有模型都可以在浏览器中运行。它们必须转换为 **ONNX 格式**。
查找 Hugging Face 上由 **Xenova**（transformers.js 维护者）托管的模型，或搜索 "onnx" 标签。

## 性能提示

1.  **量化**: 使用量化模型 (q8, q4)。它们更小 (40MB vs 400MB) 且更快。
2.  **Web Workers**: 阻塞主线程会冻结 UI。始终在 Worker 中运行推理。

## 示例：Web Worker

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