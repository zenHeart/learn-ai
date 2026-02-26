# TensorFlow.js 指南

TensorFlow.js 独特之处在于它允许在浏览器中进行 **训练**，而不仅仅是推理。

## 核心特性：迁移学习

你可以采用预训练模型（如 MobileNet），只需重新训练最后一层即可在几秒钟内识别*你的*特定图像（例如，“热狗 vs 非热狗”）。

```javascript
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// 1. 加载基础模型
const baseModel = await mobilenet.load();

// 2. 创建分类器 (KNN)
const classifier = knnClassifier.create();

// 3. 添加示例
const img0 = tf.browser.fromPixels(document.getElementById('hotdog'));
classifier.addExample(baseModel.infer(img0, true), 'hot_dog');

const img1 = tf.browser.fromPixels(document.getElementById('not_hotdog'));
classifier.addExample(baseModel.infer(img1, true), 'not_hot_dog');

// 4. 预测
const result = await classifier.predictClass(baseModel.infer(webcamElement, true));
```

## 模型转换

如果你在 Python (Keras/PyTorch) 中训练了模型，请将其转换为 Web 的 JSON 格式。

```bash
pip install tensorflowjs
tensorflowjs_converter --input_format=keras model.h5 /web_model
```

## 何时使用？
- 当你需要在用户数据上进行 **微调** 而不上传数据时。
- 当使用较旧的标准架构（CNN, LSTM）而不是 Transformers 时。