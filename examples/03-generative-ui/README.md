# Example 03: Generative UI

A demo of rendering React Components from AI tools using React Server Components (RSC).

## Features

- 🪄 Text-to-Component generation
- 📊 Dynamic Charts (Recharts)
- 🌤 Weather Cards
- ⚡️ React Server Actions

## Setup

1.  **Environment Variables**:
    ```
    OPENAI_API_KEY=sk-...
    ```

2.  **Run**:
    ```bash
    npm install
    npm run dev
    ```

## How it works

The AI model calls a `generate_ui` tool, which executes a Server Action that returns a React Component stream.

```tsx
// app/actions.tsx
const ui = await streamUI({
  text: ({ content }) => <div>{content}</div>,
  tools: {
    getWeather: {
       generate: async ({ city }) => <WeatherCard city={city} />
    }
  }
})
```
