# Project: AI Design Studio (v0 clone)

**Level**: Advanced
**Time**: 1 Week
**Stack**: Next.js, OpenAI, Tailwind CSS

## Overview

Build a tool where users describe a UI ("A dark mode dashboard for crypto") and the AI renders it instantly.

## Architecture

1.  **Prompt**: User description.
2.  **Generation**: LLM outputs React/Tailwind code.
3.  **Rendering**: App renders the string as a component (Sandboxed).

## Step 1: The System Prompt

The magic is in the prompt. You must teach the LLM your design system.

```typescript
const SYSTEM_PROMPT = `
You are an expert React/Tailwind developer.
- Use lucide-react for icons.
- Use Tailwind classes for styling.
- Do not use external CSS.
- Return a single functional component named 'GeneratedComponent'.
`;
```

## Step 2: Safe Rendering

You cannot just `eval()` code from the AI. It's dangerous.
Use a sandboxed runner or a transpiler like `next-mdx-remote` or `react-live`.

**Simplest Approach (Danger: Development Only)**:
```tsx
import JsxParser from 'react-jsx-parser';

<JsxParser
  components={{ Card, Button, Icon }}
  jsx={aiGeneratedCode}
  renderInWrapper={false}
/>
```

**Production Approach**:
Run a separate microservice that compiles the code and returns a preview URL (iframe).

## Step 3: Iteration (Conversation)

Allow users to refine.
User: "Make the buttons blue."
Context: Send the *previous code* back to the LLM.

```typescript
messages: [
  { role: 'assistant', content: "```jsx ... old code ... ```" },
  { role: 'user', content: "Make the buttons blue" }
]
```

## Challenges
- ** hallucinated imports**: The AI might import `FancyButton` which you don't have. You must strictly limit the available scope in the system prompt.
