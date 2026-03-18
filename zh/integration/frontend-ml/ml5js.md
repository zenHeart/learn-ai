# ml5.js 指南

**"面向 Web 的友好机器学习。"**
构建在 TensorFlow.js 之上，但 API 专为艺术家、学生和初学者设计。

## 核心特性：预训练模型

ml5 附带了开箱即用的模型。

### 1. 手势 (Hand Pose)

检测手指和手势。

```javascript
let handpose;
let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
  handpose.on('predict', gotPose);
}

function gotPose(results) {
  if (results.length > 0) {
    // 绘制骨架
  }
}
```

### 2. 风格迁移 (Style Transfer)

将照片变成梵高画作。

```javascript
const style = ml5.styleTransfer('models/wave', modelLoaded);
style.transfer(inputImg, function(err, result) {
  createImg(result.src);
});
```

## 何时使用？
- **创意编程**: 非常适合 p5.js 草图。
- **教育**: 教授基础 AI 概念。
- **原型设计**: 视觉任务的快速概念验证。