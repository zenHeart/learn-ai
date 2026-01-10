# Project: AI Code Autocomplete

**Level**: Intermediate
**Time**: 1.5 hours
**Stack**: Next.js, Monaco Editor

## Overview

Build a web-based code editor (like VS Code) that offers AI code completions.

## Step 1: Setup Editor

Install Monaco:
```bash
npm install @monaco-editor/react
```

```tsx
'use client';
import Editor from '@monaco-editor/react';
import { useCompletion } from 'ai/react';

export default function CodeEditor() {
  const { complete, completion } = useCompletion({ api: '/api/autocomplete' });

  function handleEditorChange(value) {
    // Debounce this in production!
    if (value.endsWith('// generate')) {
       complete(value);
    }
  }

  return (
    <div className="flex h-screen">
      <Editor 
        height="100%" 
        defaultLanguage="javascript" 
        defaultValue="// Type '// generate' to trigger AI"
        onChange={handleEditorChange}
      />
      <div className="w-1/3 bg-gray-900 text-green-400 p-4 font-mono whitespace-pre-wrap">
        {completion}
      </div>
    </div>
  );
}
```

## Step 2: The API (FIM - Fill In Middle)

Standard models are "Chat" models. For code, specialized models like **Codestral** or **DeepSeek Coder** are better, but GPT-4o works for general tasks.

```typescript
// app/api/autocomplete/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: "You are a code completion engine. Output ONLY code. No markdown. No explanations.",
    prompt: `Complete the following code:\n${prompt}`,
  });

  return result.toDataStreamResponse();
}
```

## Advanced: Inline Ghost Text

Real Copilot uses "Ghost Text" (gray text inside the editor).
To do this in Monaco, you need `monaco.editor.addContentWidget` or `deltaDecorations`.

1.  Listen to `onDidChangeModelContent`.
2.  Send context (cursor position - 50 lines, cursor position + 50 lines).
3.  Receive completion.
4.  Render as a "Ghost" decoration.
5.  On `Tab`, insert the text.

## Models to use

For production code completion, use **low latency** models:
- **Groq (Llama 3 70b)**: Extremely fast.
- **Anthropic Haiku**: Fast and smart.
- **GPT-4o-mini**: Good balance.

```