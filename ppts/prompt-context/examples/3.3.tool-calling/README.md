# Tool Calling 工具调用

## 什么是 Tool Calling？

Tool Calling 允许模型在生成响应时调用外部工具（函数）。工作流程：

1. **定义工具 Schema** - 在请求中声明工具的名称、描述和参数
2. **模型决定调用** - 根据用户输入，模型判断何时需要调用工具
3. **返回结构化结果** - 工具执行后，结果以结构化格式返回给模型
4. **模型生成最终响应** - 结合工具结果生成回答

## 核心优势

- **准确性** - 模型可以获取实时信息，而非依赖训练数据
- **可执行性** - 模型可以执行实际操作（查询、计算、API调用）
- **结构化** - 工具参数和结果都有明确schema，避免模糊性

## 示例：天气查询

```javascript
// 定义工具
const tools = [{
  name: "get_weather",
  description: "获取指定城市的天气信息",
  input_schema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "城市名称，如 北京、Shanghai"
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
        description: "温度单位"
      }
    },
    required: ["city"]
  }
}];

// 对话示例
const messages = [
  { role: "user", content: "北京今天多少度？" }
];

// 模型可能返回：
// {
//   type: "tool_call",
//   name: "get_weather",
//   input: { city: "北京", unit: "celsius" }
// }
```

## 工具定义要点

| 字段 | 作用 |
|------|------|
| `name` | 工具唯一标识，模型通过名称调用 |
| `description` | 关键！描述工具用途，帮助模型判断何时使用 |
| `input_schema` | 参数规范，确保模型传递正确的参数 |

## 最佳实践

1. **描述要清晰准确** - 让模型能判断何时该用这个工具
2. **参数尽量可选** - 必填参数过多会限制工具调用灵活性
3. **结果结构化** - 返回 JSON 格式，方便模型解析
4. **错误处理** - 工具执行失败时返回有意义的错误信息
