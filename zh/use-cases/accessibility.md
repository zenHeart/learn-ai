# 用例：AI 辅助无障碍 (A11y)

AI 可以让 13 亿残障人士能够访问网络。

## 1. 自动 Alt 文本 (图像描述)

**问题**: 内容作者忘记写 `alt` 标签。
**解决方案**: 上传时使用 GPT-4o (Vision) 生成它们。

```typescript
// app/api/upload/route.ts
const description = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Describe this image for a screen reader. Be concise." },
        { type: "image_url", image_url: { url: imageUrl } },
      ],
    },
  ],
});

await db.images.update({ id, altText: description.content });
```

## 2. 简明语言转换器

**问题**: 法律/医疗文本难以理解（认知障碍）。
**解决方案**: 一个“简化”按钮。

**Prompt**: "Rewrite this text to be understood by a 5th grader. Use active voice."

## 3. 屏幕阅读器优化

AI 可以扫描你的 HTML 并建议 ARIA 修复。

**工具**: 使用智能体爬取你的网站。
**Prompt**: "Analyze this HTML snapshot. Are there any button elements without labels? Are form inputs associated with labels?"

## 伦理
**警告**: 自动化的无障碍覆盖层 (Overlays) 存在争议。它们经常失败。
**最佳实践**: 使用 AI *辅助* 作者 (Human-in-the-loop)，而不是在运行时修补前端。