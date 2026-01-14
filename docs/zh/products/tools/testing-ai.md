# AI 测试工具

测试很枯燥。AI 可以为你编写测试。

## 1. ZeroStep (Playwright)

ZeroStep 允许你用简单的英语编写测试。

```typescript
test('book a flight', async ({ page }) => {
  await ai('Navigate to booking page', { page });
  await ai('Select flight to NY', { page });
  await ai('Verify price is under $500', { page });
});
```

**优点**: 不脆弱（选择器会变，但英语描述不会）。
**缺点**: 执行速度较慢。

## 2. CodiumAI

专注于单元测试。
- 分析你的代码。
- 建议你遗漏的边缘情况。
- 自动生成 Jest/Vitest 套件。

## 3. Reflect

无代码端到端测试，使用 AI 修复损坏的测试。
如果按钮 ID 变了，AI 会寻找 "Submit" 文本并自动修复选择器。

## 未来: 自主 QA

我们正在迈向 "自主 QA 智能体"，它们每天爬取你的网站并报告 Bug，而无需编写任何代码。