# 流式 UI 模式 (Streaming UI)

流式传输不仅仅是一个技术实现；它是 **AI 用户体验**的核心部分。本指南涵盖了如何渲染流，使其感觉流畅和神奇。

## 延迟心理学

- **< 100ms**: 感觉即时。
- **< 1s**: 用户流未中断。
- **> 1s**: 用户失去注意力。

LLM 通常需要 2-10 秒才能完成。流式传输将 **首个 Token 时间 (TTFT)** 降低到 500ms 以下，保持用户参与。

## 渲染策略

### 1. 朴素追加 (抖动方式)
随着块的到达简单地添加可能会导致布局偏移和抖动。

### 2. 节流渲染 (平滑方式)
以固定的帧率（例如 60fps）更新 DOM，而不是在每个网络数据包上更新。

```typescript
// 概念
function useSmoothStream(text) {
  const [display, setDisplay] = useState('');
  
  useEffect(() => {
    let i = display.length;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text[i]);
        i++;
      }
    }, 10); // 每个字符 10ms
    return () => clearInterval(interval);
  }, [text]);
  
  return display;
}
```

## 用于流式传输的 UI 组件

### "思考中" 状态
在第一个 Token 到达之前，显示 AI 正在工作。
- **不要**: 阻塞 UI。
- **要**: 显示骨架屏或微妙的“思考中...”指示器。

### 自动滚动
随着文本流入，聊天容器会增长。你必须保持底部可见，*除非*用户向上滚动查看历史记录。

**"粘在底部" 逻辑**:
1. 如果用户在底部 -> 自动滚动。
2. 如果用户向上滚动 -> 禁用自动滚动。
3. 如果用户点击“滚动到底部” -> 重新启用。

```tsx
// 自动滚动的 React Hook
const scrollToBottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isAtBottom) {
    scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);
```

## Markdown 与语法高亮

AI 输出 Markdown。在流式传输期间高效渲染它很棘手。

**性能提示**: Memoize 你的 Markdown 渲染器。在每次字符更新时重新解析巨大的 Markdown 块是昂贵的。

```tsx
// 使用 React.memo 防止重新渲染以前的消息
const MemoizedMessage = React.memo(({ content }) => (
  <ReactMarkdown>{content}</ReactMarkdown>
));
```

## 停止生成

始终提供取消的方法。
- **原因**: 模型可能会产生幻觉或误解。
- **UX**: 在生成期间用“停止”方形图标替换“发送”图标。

## 下一步

- 查看 **[生成式 UI](./generative-ui.md)** 了解流式组件。