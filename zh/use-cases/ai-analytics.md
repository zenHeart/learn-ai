# 用例：AI 分析仪表板

**场景**: 经理问“为什么销售额下降了？”
**目标**: 允许他们用简单的英语提问并看到图表。

## 架构：Text-to-SQL vs. Text-to-Chart

### 方法 A: Text-to-SQL (有风险)
AI 生成 SQL -> 在 DB 上运行 -> 返回数据。
**风险**: AI 可能会 `DROP TABLE`。

### 方法 B: Text-to-Chart (安全)
1.  **后端**: 获取严格、安全的数据集（例如，“过去 30 天的销售额”）。
2.  **前端**: AI 接收 JSON 数据并决定如何可视化。

## 实现 (方法 B)

**Prompt**:
"Here is the sales data: `[ {date: '2024-01', value: 100}, ... ]`.
User asked: 'Show me the trend'.
Generate a Recharts config."

**响应**:
```json
{
  "type": "LineChart",
  "xAxis": "date",
  "yAxis": "value",
  "color": "#8884d8"
}
```

## 生成式 UI 组件

```tsx
function ChartResult({ data, config }) {
  const ChartComponent = Recharts[config.type]; // LineChart, BarChart...
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ChartComponent data={data}>
        <XAxis dataKey={config.xAxis} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={config.yAxis} stroke={config.color} />
      </ChartComponent>
    </ResponsiveContainer>
  );
}
```