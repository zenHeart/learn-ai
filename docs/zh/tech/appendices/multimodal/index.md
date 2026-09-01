---
title: 多模态（桥接）
description: 多模态能力的模型侧机制桥接 Learn LLM；本仓只保留应用侧的最小用法与一个视觉能力案例。
domain: tech
tags: [tech, multimodal, bridge, vision]
navOrder: 91
topicId: multimodal-bridge
layer: appendix
status: bridge
nodeType: boundary
owner: learn-ai
externalOwners:
  - site: llm
    url: https://llm.zenheart.site/
lastVerified: "2026-09-01"
listed: true
---

# 多模态（桥接）

> **桥接页**：多模态 tokenization（图像如何变成 token）、跨模态对齐机制、视觉编码器的推导在 [Learn LLM](https://llm.zenheart.site/)（多模态章节）。本仓只保留应用工程师需要的最小用法。

## 应用侧最小用法

在应用里用好多模态（以视觉为例）只需要四件事：

1. **消息结构**：图片作为 content block（base64 / URL / Files API 三种来源）与文本并列，见 [模型 API 契约](../../02-integration/model-api)。
2. **成本意识**：图片按尺寸折算 token，进入上下文预算——大图是真实的成本项。
3. **位置技巧**：图片放在指令/问题**之前**效果好；多图用 `Image 1:`、`Image 2:` 标签区分。
4. **能力边界**：空间推理、精确计数、人物识别是已知弱项；高风险场景必须人工复核（见 [安全](../../05-operations/security)）。

产品化要点：多轮对话中重复引用同一图片时用 Files API 的 file_id，避免每轮重传 base64。

## 本区页面

| 页面 | 状态 | 内容 |
| --- | --- | --- |
| [Claude Vision 能力](./claude-vision-capabilities) | case | Claude 视觉能力的接入细节：图片来源、限制、token 计算、提示技巧（数字以官方文档为准） |

## 何时去 Learn LLM

- 想知道图像/音频如何被切分成 token、为什么有尺寸上限 → Learn LLM 多模态 tokenization 章
- 想理解视觉-语言对齐训练、多模态模型的能力从哪来 → Learn LLM 跨模态机制章

厂商侧的具体参数（图片张数上限、文件大小、支持格式）以[官方文档](https://platform.claude.com/docs/en/build-with-claude/vision)实时为准，本仓不维护快照数字。
