---
title: Claude Vision 能力
description: Claude 视觉能力接入案例：三种图片来源、请求限制、token 计算、提示技巧与已知限制（数字以官方文档为准）。
domain: tech
tags: [tech, multimodal, case, vision, claude]
navOrder: 92
topicId: multimodal-claude-vision
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Claude Vision 能力

> 原文: [Vision - Claude API](https://platform.claude.com/docs/en/build-with-claude/vision)
> **数字时效声明**：本页的请求限制、token 折算与成本数字来自上述官方文档的整理快照，厂商随时可能调整——实施前以官方文档实时值为准。

## 图片使用方法

### 三种图片来源

1. **Base64 编码图片**：直接嵌入请求
2. **URL 引用**：引用在线图片
3. **Files API**：上传一次，多轮引用 file_id

多轮对话每轮都发送完整历史；用 base64 则每轮重复携带图片数据，用 file_id 保持请求体积小——重复引用场景优先 Files API。

### 请求限制与 token 计算

| 平台 | 每请求图片数 | 单图大小限制 |
|------|------------|------------|
| Claude.ai | 20 张 | 10 MB |
| API | 600 张（200K context 模型为 100 张） | 5 MB |

**尺寸调整**：长边超过 1568px 或超过约 1600 tokens 时自动缩小。Token 估算：`tokens ≈ (width px × height px) / 750`。

**最佳尺寸参考**（不需调整）：1:1 → 1092×1092；3:4 → 951×1268；2:3 → 896×1344；9:16 → 819×1456；1:2 → 784×1568。

支持格式：`image/jpeg`、`image/png`、`image/gif`、`image/webp`。

### API 示例

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
                    "type": "base64",        # 或 "url" / Files API 的 "file"
                    "media_type": "image/jpeg",
                    "data": base64_image_data
                }
            },
            {"type": "text", "text": "描述这张图片"}
        ]
    }]
)
```

## 提示词技巧

**图片位置**：与长文档同理，图片放在提示词**前面**效果更好——`[Image] + "描述这张图片"` 优于 `"描述这张图片" + [Image]`。

**多图提示**：引入多张图片时用 `Image 1:`、`Image 2:` 标签：`Image 1: [图1] Image 2: [图2] 这两张图片有什么不同？`

**图片质量**：避免过度模糊或像素化；内含重要文字时确保清晰可读；不要为放大文字而裁掉关键视觉上下文。

## 已知限制

| 限制类型 | 说明 |
|---------|------|
| **人物识别** | 不可用于识别图片中的人物（违反 AUP） |
| **精确度** | 低质量、旋转、200px 以下小图可能出错 |
| **空间推理** | 难以精确描述位置关系 |
| **计数** | 只能给近似数量，大数量不精确 |
| **AI 生成图片** | 无法判断图片是否由 AI 生成 |
| **医疗影像** | 不适合解读 CT、MRI 等复杂诊断扫描 |

## 核心要点

- 多图分析用 `Image 1:` 标签引入；图片放指令之前
- 重复引用用 Files API，避免 base64 重传开销
- 大图按尺寸折算 token，是真实的成本项（成本随厂商定价变化，以官方计算器为准）
- 高风险场景（识别、计数、位置判断）必须人工复核
- 模型侧机制（图像如何变 token、跨模态对齐）见 [Learn LLM](https://llm.zenheart.site/) 多模态章节
