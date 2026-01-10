# Recipe: Content Moderation

**Problem**: Users might try to make your bot say offensive things (Jailbreaking) or generate harmful content.
**Solution**: Filter inputs and outputs using a Moderation API.

## 1. Using OpenAI Moderation API

OpenAI provides a **free** endpoint to check for hate, violence, and self-harm.

```typescript
import OpenAI from 'openai';

const openai = new OpenAI();

async function checkSafety(input: string) {
  const moderation = await openai.moderations.create({ input });
  const result = moderation.results[0];

  if (result.flagged) {
    const categories = Object.keys(result.categories)
      .filter(key => result.categories[key])
      .join(', ');
      
    throw new Error(`Content violated policy: ${categories}`);
  }
  
  return true;
}
```

## 2. Implementing in API Route

Run the check *before* calling the LLM.

```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // 1. Check Input
  try {
    await checkSafety(lastMessage.content);
  } catch (e) {
    return new Response(e.message, { status: 400 });
  }

  // 2. Generate Response
  const result = await streamText({ ... });
  
  return result.toDataStreamResponse();
}
```

## 3. Structural Validation (Zod)

Prevent "Prompt Injection" attacks that try to break your JSON structure.

```typescript
import { z } from 'zod';

// Define strict schema
const UserProfileSchema = z.object({
  username: z.string().min(3).max(20),
  bio: z.string().max(100).refine(val => !val.includes('ignore previous instructions')),
});
```

## Checklist

- [ ] Check User Input with Moderation API.
- [ ] Check AI Output (optional, adds latency).
- [ ] Limit input length (max characters) to prevent token exhaustion attacks.
