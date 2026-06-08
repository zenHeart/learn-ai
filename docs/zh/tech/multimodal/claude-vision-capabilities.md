# Claude Vision 文档

> 原文: [Vision - Claude API](https://platform.claude.com/docs/en/build-with-claude/vision)

## 基本概念

Claude 的视觉能力使其能够理解和分析图像，开启多模态交互的可能性。

## 图片使用方法

### 三种图片来源

1. **Base64 编码图片**：直接嵌入在请求中
2. **URL 引用**：引用在线图片
3. **Files API**：上传一次，多次引用

### 请求限制

| 平台 | 每请求图片数 | 单图大小限制 |
|------|------------|------------|
| Claude.ai | 20 张 | 10 MB |
| API | 600 张（200K context 模型为 100 张） | 5 MB |

**尺寸调整**：图片长边超过 1568px 或超过约 1600 tokens 时会自动缩小。

### Token 计算

```
tokens = (width px × height px) / 750
```

### 最佳尺寸参考（不需调整）

| 宽高比 | 图片尺寸 |
|--------|---------|
| 1:1 | 1092×1092 px |
| 3:4 | 951×1268 px |
| 2:3 | 896×1344 px |
| 9:16 | 819×1456 px |
| 1:2 | 784×1568 px |

### 成本估算（基于 Claude Sonnet 4.6）

| 图片尺寸 | Tokens | 每张成本 | 1K 张成本 |
|---------|--------|---------|----------|
| 200×200 px | ~54 | $0.00016 | $0.16 |
| 1000×1000 px | ~1334 | $0.004 | $4.00 |
| 1092×1092 px | ~1590 | $0.0048 | $4.80 |

## 提示词技巧

### 图片位置

与长文档类似，**图片放在提示词前面效果更好**：

```
User: [Image] + "描述这张图片"   ✅ 推荐
User: "描述这张图片" + [Image]   ⚠️ 不推荐
```

### 多图提示

引入多张图片时，使用 `Image 1:`、`Image 2:` 等标签：

```
User: Image 1: [Image 1] Image 2: [Image 2] 这两张图片有什么不同？
```

## API 示例

### Base64 编码

```python
message = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": base64_image_data
                }
            },
            {"type": "text", "text": "描述这张图片"}
        ]
    }]
)
```

### URL 引用

```python
message = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "url",
                    "url": "https://example.com/image.jpg"
                }
            },
            {"type": "text", "text": "描述这张图片"}
        ]
    }]
)
```

### Files API（推荐重复使用）

```python
# 上传图片
file_upload = client.beta.files.upload(
    file=("image.jpg", f, "image/jpeg")
)

# 引用 file_id
message = client.beta.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    betas=["files-api-2025-04-14"],
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {"type": "file", "file_id": file_upload.id}
            },
            {"type": "text", "text": "描述这张图片"}
        ]
    }]
)
```

**Files API 优势**：多轮对话中每次请求都会发送完整对话历史，若用 base64 编码则每轮都包含图片数据；用 file_id 保持请求体积小。

## 支持的图片格式

- `image/jpeg`
- `image/png`
- `image/gif`
- `image/webp`

## 已知限制

| 限制类型 | 说明 |
|---------|------|
| **人物识别** | 不可用于识别图片中的人物（违反 AUP） |
| **精确度** | 低质量、旋转、200px 以下小图可能出错 |
| **空间推理** | 空间推理能力有限，难以精确描述位置 |
| **计数** | 可给出近似数量，大数量时不精确 |
| **AI 生成图片** | 无法判断图片是否由 AI 生成 |
| **不当内容** | 不处理违反 AUP 的不当图片 |
| **医疗影像** | 不适合解读 CT、MRI 等复杂诊断扫描 |

## 图片质量建议

- 使用支持的格式（JPEG、PNG、GIF、WebP）
- 图片清晰，避免过度模糊或像素化
- 若包含重要文字，确保文字清晰可读
- 不要裁剪关键视觉上下文来放大文字

## 核心要点

- 多图分析时用 `Image 1:`、`Image 2:` 标签引入
- 优先使用 Files API 避免 base64 重复传输开销
- 图片放在问题/指令之前效果更好
- 注意尺寸限制和成本估算
- 高风险场景需人工复核
