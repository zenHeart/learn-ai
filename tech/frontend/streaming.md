# Streaming UI Patterns

Streaming isn't just a technical implementation; it's a core part of the **AI User Experience**. This guide covers how to render streams so they feel smooth and magical.

## The Psychology of Latency

- **< 100ms**: Feels instant.
- **< 1s**: User flow is uninterrupted.
- **> 1s**: User loses focus.

LLMs often take 2-10 seconds to finish. Streaming brings the **Time to First Token (TTFT)** under 500ms, keeping the user engaged.

## Rendering Strategies

### 1. Naive Appending (The Jittery Way)
Simply adding chunks as they arrive can cause layout shifts and jitter.

### 2. Throttled Rendering (The Smooth Way)
Update the DOM at a fixed frame rate (e.g., 60fps) rather than on every network packet.

```typescript
// Concept
function useSmoothStream(text) {
  const [display, setDisplay] = useState('');
  
  useEffect(() => {
    let i = display.length;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text[i]);
        i++;
      }
    }, 10); // 10ms per character
    return () => clearInterval(interval);
  }, [text]);
  
  return display;
}
```

## UI Components for Streaming

### The "Thinking" State
Before the first token arrives, show that the AI is working.
- **Don't**: Block the UI.
- **Do**: Show a skeleton or a subtle "Thinking..." indicator.

### Auto-Scrolling
As text streams in, the chat container grows. You must keep the bottom visible, *unless* the user has scrolled up to read history.

**The "Stick to Bottom" Logic**:
1. If user is at bottom -> Auto-scroll.
2. If user scrolls up -> Disable auto-scroll.
3. If user clicks "Scroll to bottom" -> Re-enable.

```tsx
// React Hook for Auto-Scroll
const scrollToBottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isAtBottom) {
    scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);
```

## Markdown & Syntax Highlighting

AI outputs Markdown. Rendering it efficiently during a stream is tricky.

**Performance Tip**: Memoize your Markdown renderer. Re-parsing a huge Markdown block on every single character update is expensive.

```tsx
// Use React.memo to prevent re-renders of previous messages
const MemoizedMessage = React.memo(({ content }) => (
  <ReactMarkdown>{content}</ReactMarkdown>
));
```

## Stop Generation

Always provide a way to cancel.
- **Why**: The model might hallucinate or misunderstand.
- **UX**: A "Stop" square icon that replaces the "Send" icon during generation.

## Next Steps

- See **[Generative UI](./generative-ui.md)** for streaming components.
