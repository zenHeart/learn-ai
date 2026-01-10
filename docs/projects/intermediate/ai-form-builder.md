# Project: AI Form Builder

**Level**: Intermediate
**Time**: 1 hour
**Stack**: Next.js, React Hook Form, Zod

## Overview

User says: "I need a registration form for a Hackathon with team size and dietary restrictions."
App generates: A working React form with validation.

## Step 1: Define the Schema Structure

We want the AI to output a JSON definition of the form.

```typescript
type FormField = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'checkbox';
  options?: string[]; // For select
  required: boolean;
};

type FormSchema = {
  title: string;
  fields: FormField[];
};
```

## Step 2: The Generator (Object Generation)

Use `streamObject` (or `generateObject`) from Vercel AI SDK to guarantee the structure.

```typescript
// app/actions.ts
'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function generateForm(prompt: string) {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      title: z.string(),
      fields: z.array(z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(['text', 'number', 'email', 'select', 'checkbox']),
        options: z.array(z.string()).optional(),
        required: z.boolean(),
      })),
    }),
    prompt: `Create a form for: ${prompt}`,
  });

  return object;
}
```

## Step 3: The Renderer

A component that takes the JSON and renders `input`, `select`, etc.

```tsx
// components/FormRenderer.tsx
export function FormRenderer({ schema }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <h1>{schema.title}</h1>
      {schema.fields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          
          {field.type === 'select' ? (
            <select {...register(field.name)}>
              {field.options?.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          ) : (
            <input type={field.type} {...register(field.name)} />
          )}
        </div>
      ))}
      <button>Submit</button>
    </form>
  );
}
```

## Use Case
This is perfect for "Internal Tool" builders or admin dashboards where you need to spin up data collection forms instantly.
