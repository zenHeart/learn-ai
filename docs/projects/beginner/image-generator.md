# Project: AI Image Generator

**Level**: Beginner
**Time**: 45 minutes
**Stack**: Next.js, OpenAI (DALL-E 3)

## Overview

Build a clone of Midjourney/DALL-E where users type a prompt and get an image.

**Key Concepts**:
- **Image Generation API**: Not streaming (usually).
- **Asset Management**: Hosting vs. Temporary URLs.
- **Prompt Enhancement**: Using an LLM to rewrite user prompts for better images.

## Step 1: The API Route

DALL-E 3 does not stream. It takes 10-15 seconds and returns a URL.

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

## Step 2: The Frontend

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
        placeholder="A futuristic city made of crystal..."
      />
      <button 
        onClick={generate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Create'}
      </button>
      
      {image && <img src={image} alt="Generated" className="rounded-lg shadow-xl" />}
    </div>
  );
}
```

## Advanced: Prompt Magic

Users write bad prompts. "A cat".
DALL-E wants: "A fluffy siamese cat sitting on a velvet sofa, cinematic lighting, 8k".

**Solution**: Use GPT-4o to rewrite the prompt *before* sending to DALL-E.

```typescript
const refinedPrompt = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: `Enhance this image prompt for DALL-E: ${prompt}` }]
});
```

## Warning: Temporary URLs

OpenAI URLs expire after 60 minutes.
**Production Fix**: Download the image buffer and upload it to your own S3/R2 bucket immediately.
