# Use Case: AI Analytics Dashboard

**Scenario**: Managers ask "Why are sales down?"
**Goal**: Allow them to ask in plain English and see a chart.

## Architecture: Text-to-SQL vs. Text-to-Chart

### Approach A: Text-to-SQL (Risky)
AI generates SQL -> Runs on DB -> Returns Data.
**Risk**: AI might `DROP TABLE`.

### Approach B: Text-to-Chart (Safe)
1.  **Backend**: Fetches strict, safe datasets (e.g., "Last 30 days sales").
2.  **Frontend**: AI receives the JSON data and decides how to visualize it.

## Implementation (Approach B)

**Prompt**:
"Here is the sales data: `[ {date: '2024-01', value: 100}, ... ]`.
User asked: 'Show me the trend'.
Generate a Recharts config."

**Response**:
```json
{
  "type": "LineChart",
  "xAxis": "date",
  "yAxis": "value",
  "color": "#8884d8"
}
```

## The Generative UI Component

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
