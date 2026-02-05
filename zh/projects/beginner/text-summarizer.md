# 项目：智能文本摘要器

**级别**: 初级
**时间**: 1 小时
**技术栈**: Next.js, Vercel AI SDK

## 概览

构建一个工具，用户可以粘贴长文章或报告，并获得简明的要点摘要。

**核心概念**:
- **提示工程**: 如何要求特定格式。
- **Token 限制**: 处理过长的文本。
- **UI 状态**: 加载中 vs. 流式传输。

## 步骤 1: UI

创建一个简单的两列布局：输入 (Textarea) 和输出 (Markdown)。

```tsx
// app/page.tsx
'use client';
import { useCompletion } from 'ai/react';

export default function Summarizer() {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/summarize',
  });

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      <textarea
        className="p-4 border rounded"
        placeholder="在此粘贴长文本..."
        onChange={(e) => complete(e.target.value)}
      />
      <div className="p-4 bg-gray-50 rounded prose">
        {isLoading && !completion ? '摘要生成中...' : completion}
      </div>
    </div>
  );
}
```

## 步骤 2: API 路由

我们使用特定的提示词来强制结构化。

```typescript
// app/api/summarize/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // 基础 Token 检查 (大约 1 字符 = 0.25 tokens)
  if (prompt.length > 50000) {
    return new Response('文本太长', { status: 400 });
  }

  const result = await streamText({
    model: openai('gpt-4o-mini'), // 使用便宜的模型进行摘要
    system: "You are a professional editor.",
    prompt: `
      Summarize the following text.
      Format:
      1. One sentence high-level summary.
      2. Bullet points for key details.
      3. A "Conclusion" section.
      
      Text:
      ${prompt}
    `,
  });

  return result.toDataStreamResponse();
}
```

## 进阶：处理长文本 (分块)

如果文本超过上下文窗口 (GPT-4o 为 128k tokens)，你必须分割它。

**策略**:
1. 将文本分割成 10k 的块。
2. 单独摘要每个块。
3. 将摘要汇总在一起进行再次摘要。

## 扩展

- **URL 输入**: 使用像 `cheerio` 这样的库在摘要之前获取并解析 URL。
- **导出**: 添加“下载 PDF”按钮。