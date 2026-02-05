# Use Case: AI for Accessibility (A11y)

AI can make the web accessible to the 1.3 billion people with disabilities.

## 1. Auto-Alt Text (Image Description)

**Problem**: Content authors forget `alt` tags.
**Solution**: Use GPT-4o (Vision) to generate them on upload.

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

## 2. Plain Language Converter

**Problem**: Legal/Medical text is hard to understand (Cognitive disabilities).
**Solution**: A "Simplify" button.

**Prompt**: "Rewrite this text to be understood by a 5th grader. Use active voice."

## 3. Screen Reader Optimization

AI can scan your HTML and suggest ARIA fixes.

**Tool**: Use an agent to crawl your site.
**Prompt**: "Analyze this HTML snapshot. Are there any button elements without labels? Are form inputs associated with labels?"

## Ethics
**Warning**: Automated accessibility overlays are controversial. They often fail.
**Best Practice**: Use AI to *assist* the author (Human-in-the-loop), not to patch the frontend at runtime.
