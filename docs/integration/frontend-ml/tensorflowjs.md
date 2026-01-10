# TensorFlow.js Guide

TensorFlow.js is unique because it allows **training** in the browser, not just inference.

## Key Feature: Transfer Learning

You can take a pre-trained model (like MobileNet) and retrain just the last layer to recognize *your* specific images (e.g., "Hot Dog vs Not Hot Dog") in seconds.

```javascript
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// 1. Load the base model
const baseModel = await mobilenet.load();

// 2. Create a classifier (KNN)
const classifier = knnClassifier.create();

// 3. Add examples
const img0 = tf.browser.fromPixels(document.getElementById('hotdog'));
classifier.addExample(baseModel.infer(img0, true), 'hot_dog');

const img1 = tf.browser.fromPixels(document.getElementById('not_hotdog'));
classifier.addExample(baseModel.infer(img1, true), 'not_hot_dog');

// 4. Predict
const result = await classifier.predictClass(baseModel.infer(webcamElement, true));
```

## Model Conversion

If you trained a model in Python (Keras/PyTorch), convert it to JSON format for the web.

```bash
pip install tensorflowjs
tensorflowjs_converter --input_format=keras model.h5 /web_model
```

## When to use?
- When you need to **fine-tune** on user data without uploading it.
- When using older, standard architectures (CNNs, LSTMs) rather than Transformers.
