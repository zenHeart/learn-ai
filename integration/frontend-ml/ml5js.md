# ml5.js Guide

**"Friendly Machine Learning for the Web."**
Built on top of TensorFlow.js, but with an API designed for artists, students, and beginners.

## Key Feature: Pre-trained Models

ml5 comes with ready-to-use models.

### 1. Hand Pose

Detect fingers and gestures.

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
    // Draw skeleton
  }
}
```

### 2. Style Transfer

Turn a photo into a Van Gogh painting.

```javascript
const style = ml5.styleTransfer('models/wave', modelLoaded);
style.transfer(inputImg, function(err, result) {
  createImg(result.src);
});
```

## When to use?
- **Creative Coding**: Perfect for p5.js sketches.
- **Education**: Teaching basic AI concepts.
- **Prototyping**: Fast proof-of-concept for vision tasks.
