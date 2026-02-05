# 项目：AI 图像生成器

**级别**: 初级
**时间**: 45 分钟
**技术栈**: Next.js, OpenAI (DALL-E 3)

## 概览

构建一个 Midjourney/DALL-E 的克隆版，用户输入提示词并获取图像。

**核心概念**:
- **图像生成 API**: 非流式 (通常)。
- **资产管理**: 托管 vs. 临时 URL。
- **提示词增强**: 使用 LLM 重写用户提示词以获得更好的图像。

## 步骤 1: API 路由

DALL-E 3 不支持流式传输。它需要 10-15 秒并返回一个 URL。

```typescript
// app/api/generate/route.ts
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  return Response.json({ url: response.data[0].url });
}
```

## 步骤 2: 前端

```tsx
'use client';
import { useState } from 'react';

export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImage(data.url);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <input 
        className="border p-2 rounded w-full max-w-lg"
        value={prompt} 
        onChange={e => setPrompt(e.target.value)} 
        placeholder="一座水晶制成的未来城市..."
      />
      <button 
        onClick={generate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? '生成中...' : '创建'}
      </button>
      
      {image && <img src={image} alt="Generated" className="rounded-lg shadow-xl" />}
    </div>
  );
}
```

## 进阶：提示词魔法

用户写的提示词很糟糕。“一只猫”。
DALL-E 想要：“一只毛茸茸的暹罗猫坐在天鹅绒沙发上，电影级灯光，8k”。

**解决方案**: 在发送给 DALL-E *之前*，使用 GPT-4o 重写提示词。

```typescript
const refinedPrompt = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: `Enhance this image prompt for DALL-E: ${prompt}` }]
});
```

## 警告：临时 URL

OpenAI URL 在 60 分钟后过期。
**生产环境修复**: 下载图像 buffer 并立即将其上传到你自己的 S3/R2 存储桶。